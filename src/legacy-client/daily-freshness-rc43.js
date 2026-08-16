/* HistoDaily RC43 — daily freshness.
   Keeps the daily expedition stable for the day while avoiding recent thematic repeats.
   Selection remains constrained by the RC40/41 per-discipline difficulty ramp.
*/
(function histodailyRc43DailyFreshness(){
  "use strict";
  const VERSION = "1.0.0-rc.50.0";
  const RECENT_DAYS = 10;
  const HARD_RECENT_ID_DAYS = 7;
  const previousForDiscipline = typeof mysteryForDisciplineDayOffset === "function" ? mysteryForDisciplineDayOffset : null;

  const safe = (fn, fallback = null) => { try { const value = fn(); return value == null ? fallback : value; } catch { return fallback; } };
  const normalize = value => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

  function stableHash(value = "") {
    let hash = 2166136261;
    for (const char of String(value || "")) { hash ^= char.charCodeAt(0); hash = Math.imul(hash, 16777619); }
    return hash >>> 0;
  }
  function dayKey(offset = 0) {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - Math.max(0, Number(offset || 0)));
    return localDayKey(date.getTime());
  }
  function disciplineId(raw) { return safe(() => disciplineById(raw || "history").id, String(raw || "history")); }
  function assignmentMap() {
    if (!state.dailyMysteryAssignments || typeof state.dailyMysteryAssignments !== "object" || Array.isArray(state.dailyMysteryAssignments)) state.dailyMysteryAssignments = {};
    return state.dailyMysteryAssignments;
  }
  function assignmentKey(id, offset = 0) { return `${dayKey(offset)}|${id}`; }
  function assignedMystery(pool, id, offset = 0) {
    const value = assignmentMap()[assignmentKey(id, offset)];
    return pool.find(item => item?.id === value) || null;
  }
  function solved(item) { return Boolean(item?.id && safe(() => mysterySolved(item.id), Boolean(state?.solvedMysteries?.[item.id]))); }
  function recentMysteries(pool, id, days = RECENT_DAYS) {
    const list = [];
    for (let offset = 1; offset <= days; offset += 1) {
      const item = assignedMystery(pool, id, offset);
      if (item) list.push({ item, offset });
    }
    return list;
  }
  function sameLesson(a, b) { return Boolean(a?.lessonId && b?.lessonId && String(a.lessonId) === String(b.lessonId)); }
  function sameSubject(a, b) {
    const left = normalize(a?.subjectType); const right = normalize(b?.subjectType);
    return Boolean(left && right && left === right && !["usage reel", "probleme philosophique"].includes(left));
  }
  function samePeriod(a, b) {
    const left = normalize(a?.periodHint); const right = normalize(b?.periodHint);
    return Boolean(left && right && left === right && left.length >= 5 && !["anglais en contexte", "raisonnement applique"].includes(left));
  }
  function noveltyPenalty(candidate, recent) {
    let penalty = 0;
    for (const { item, offset } of recent) {
      if (candidate.id === item.id) penalty += offset <= HARD_RECENT_ID_DAYS ? 1000 : 120;
      if (sameLesson(candidate, item)) penalty += offset === 1 ? 180 : offset <= 4 ? 65 : 18;
      if (sameSubject(candidate, item)) penalty += offset === 1 ? 48 : offset <= 3 ? 18 : 4;
      if (samePeriod(candidate, item)) penalty += offset === 1 ? 38 : offset <= 3 ? 14 : 3;
    }
    return penalty;
  }
  function rampSelection(id, rawPool) {
    const api = window.HistoDailyDifficultyRC40 || null;
    const stage = safe(() => api?.stageFor?.(id), "discovery") || "discovery";
    const allowed = new Set(safe(() => api?.allowedFor?.(id), ["facile"]) || ["facile"]);
    let preferred = rawPool.filter(item => allowed.has(item?.difficulty || "moyen"));
    if (stage === "discovery") {
      const starters = new Set(safe(() => api?.starterMysteries?.(id), []) || []);
      const starterPool = rawPool.filter(item => starters.has(item.id));
      if (starterPool.length) preferred = starterPool;
    }
    const nonExpert = rawPool.filter(item => (item?.difficulty || "moyen") !== "expert");
    return { stage, allowed, preferred: preferred.length ? preferred : (nonExpert.length ? nonExpert : rawPool), nonExpert };
  }
  function chooseCandidates(id, rawPool) {
    const selection = rampSelection(id, rawPool);
    const unseenPreferred = selection.preferred.filter(item => !solved(item));
    const unseenAllowed = rawPool.filter(item => selection.allowed.has(item?.difficulty || "moyen") && !solved(item));
    const unseenNonExpert = selection.nonExpert.filter(item => !solved(item));
    const unseenAll = rawPool.filter(item => !solved(item));
    return {
      selection,
      pool: unseenPreferred.length ? unseenPreferred : unseenAllowed.length ? unseenAllowed : unseenNonExpert.length ? unseenNonExpert : unseenAll.length ? unseenAll : selection.preferred
    };
  }
  function chooseToday(id, rawPool) {
    const map = assignmentMap();
    const current = assignedMystery(rawPool, id, 0);
    if (current) return current; // stable until local midnight, even after solving.

    const { pool: initialPool } = chooseCandidates(id, rawPool);
    let candidates = [...initialPool];
    const recent = recentMysteries(rawPool, id);
    const yesterday = recent.find(row => row.offset === 1)?.item || null;

    // The daily dossier must change whenever there is any viable alternative.
    if (yesterday && candidates.length > 1) {
      const changed = candidates.filter(item => item.id !== yesterday.id);
      if (changed.length) candidates = changed;
    }

    // When all unseen content is exhausted, do not fall straight back onto something just seen.
    if (candidates.length && candidates.every(item => recent.some(row => row.offset <= HARD_RECENT_ID_DAYS && row.item.id === item.id))) {
      const broader = rawPool.filter(item => !recent.some(row => row.offset <= HARD_RECENT_ID_DAYS && row.item.id === item.id));
      const safeBroader = broader.filter(item => (item?.difficulty || "moyen") !== "expert");
      if (safeBroader.length) candidates = safeBroader;
      else if (broader.length) candidates = broader;
    }

    if (!candidates.length) return null;
    const scored = candidates.map(item => ({
      item,
      penalty: noveltyPenalty(item, recent),
      tie: stableHash(`${dayKey(0)}|${id}|${item.id}|rc43`)
    })).sort((a, b) => a.penalty - b.penalty || a.tie - b.tie);
    const chosen = scored[0]?.item || candidates[0] || null;
    if (chosen?.id) {
      map[assignmentKey(id, 0)] = chosen.id;
      const keys = Object.keys(map).sort();
      if (keys.length > 240) keys.slice(0, keys.length - 240).forEach(oldKey => delete map[oldKey]);
      state.dailyMysteryAssignments = map;
      try { queueSaveState?.(80); } catch {}
    }
    return chosen;
  }

  mysteryForDisciplineDayOffset = function rc43MysteryForDisciplineDayOffset(rawId = activeDisciplineId(), offset = 0) {
    const id = disciplineId(rawId);
    const rawPool = safe(() => publicMysteries(id), []) || [];
    if (!rawPool.length) return id === "history" ? null : (safe(() => publicMysteries("history")?.[0], null));
    const safeOffset = Math.max(0, Number(offset || 0));
    const historical = assignedMystery(rawPool, id, safeOffset);
    if (historical) return historical;
    if (safeOffset === 0) return chooseToday(id, rawPool);
    // Archives predating the assignment map keep the historic deterministic fallback.
    const previous = previousForDiscipline ? safe(() => previousForDiscipline(id, safeOffset), null) : null;
    return previous || rawPool[(todayIndex() - safeOffset + rawPool.length * 100) % rawPool.length] || null;
  };
  mysteryForDayOffset = function rc43MysteryForDayOffset(offset = 0) { return mysteryForDisciplineDayOffset(activeDisciplineId(), offset); };
  dailyMystery = function rc43DailyMystery() { return mysteryForDayOffset(0); };
  isTodayMystery = function rc43IsTodayMystery(id) { return Boolean(id && dailyMystery()?.id === id); };

  const api = Object.freeze({
    version: VERSION,
    recentDays: RECENT_DAYS,
    noveltyPenalty,
    recentFor: (id) => recentMysteries(safe(() => publicMysteries(disciplineId(id)), []) || [], disciplineId(id)).map(row => row.item.id)
  });
  window.HistoDailyFreshnessRC43 = api;
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version:VERSION, dailyFreshnessRC43: true, dailyFreshness: api }; } catch {}
})();
