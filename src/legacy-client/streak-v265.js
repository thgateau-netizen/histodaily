/* HistoDaily beta 265 — canonical daily streak repair
   Fixes daily streaks that stayed at 0 when a valid daily mystery was solved
   while another discipline was considered active. Repairs today's existing
   completion without granting duplicate gems or duplicate scores. */
(function histodailyBeta265StreakRepair(){
  "use strict";
  const VERSION = "1.0.0-beta.271.0";
  const DAY_MS = 86400000;

  const safe = (fn, fallback = null) => {
    try { const value = fn(); return value == null ? fallback : value; }
    catch { return fallback; }
  };
  const number = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const keyFor = (timestamp = Date.now()) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };
  const timeForKey = key => {
    const parts = String(key || "").split("-").map(Number);
    if (parts.length !== 3 || parts.some(part => !Number.isFinite(part))) return 0;
    return new Date(parts[0], parts[1] - 1, parts[2]).getTime();
  };
  const shiftKey = (key, delta) => {
    const time = timeForKey(key);
    if (!time) return "";
    const date = new Date(time);
    date.setDate(date.getDate() + delta);
    return keyFor(date.getTime());
  };

  function progressSnapshotStreak(){
    try {
      const storageKey = typeof STORAGE_KEY === "string" ? STORAGE_KEY : "histodaily_state";
      const snapshot = JSON.parse(localStorage.getItem(`${storageKey}_progress_v3`) || "null");
      return Math.max(0, number(snapshot?.streak, 0));
    } catch { return 0; }
  }

  function latestRecordedStreak(){
    const records = { ...(state?.dailyHistory || {}), ...(state?.dailyClaims || {}) };
    const latestKey = Object.keys(records).filter(Boolean).sort().pop();
    return latestKey ? Math.max(0, number(records[latestKey]?.streak, 0)) : 0;
  }

  function canonicalStreakValue(){
    return Math.max(
      0,
      number(state?.streak, 0),
      number(state?.socialV2?.profile?.streak, 0),
      latestRecordedStreak(),
      progressSnapshotStreak()
    );
  }

  function adoptCanonicalStreak(){
    const value = canonicalStreakValue();
    if (number(state?.streak, 0) >= value) return false;
    state.streak = value;
    return true;
  }

  function mysteryEverywhere(id){
    if (!id) return null;
    const direct = safe(() => (data.mysteries || []).find(item => String(item?.id) === String(id)), null);
    if (direct) return direct;
    return safe(() => mysteryById(id), null);
  }

  function disciplineForMystery(mystery){
    if (!mystery) return null;
    return safe(() => mysteryDisciplineId(mystery), mystery.discipline || null);
  }

  function canonicalDailyForMystery(id){
    const mystery = mysteryEverywhere(id);
    const disciplineId = disciplineForMystery(mystery);
    if (!mystery || !disciplineId) return null;
    return safe(() => mysteryForDisciplineDayOffset(disciplineId, 0), null);
  }

  function canonicalIsToday(id){
    const daily = canonicalDailyForMystery(id);
    return Boolean(id && daily?.id && String(daily.id) === String(id));
  }

  // The old implementation compared against dailyMystery(), which depends on
  // the currently active discipline. A valid daily dossier from another
  // discipline could therefore be treated as an archive and miss its streak.
  try { isTodayMystery = canonicalIsToday; } catch {}

  function recordForDay(dayKey){
    const claim = state.dailyClaims?.[dayKey];
    const history = state.dailyHistory?.[dayKey];
    return claim || history || null;
  }

  function solvedTodayCandidate(dayKey){
    const solved = state.solvedMysteries || {};
    const candidates = Object.entries(solved)
      .map(([id, entry]) => ({ id, entry: entry || {} }))
      .filter(({ entry }) => keyFor(number(entry.at, 0)) === dayKey)
      .filter(({ id }) => canonicalIsToday(id))
      .sort((a, b) => number(b.entry.at, 0) - number(a.entry.at, 0));
    return candidates[0] || null;
  }

  function consecutiveRecordedDays(endKey){
    let count = 0;
    let cursor = endKey;
    for (let i = 0; i < 3660; i += 1) {
      if (!recordForDay(cursor)) break;
      count += 1;
      cursor = shiftKey(cursor, -1);
      if (!cursor) break;
    }
    return count;
  }

  function previousRecordedStreak(todayKey){
    const yesterday = shiftKey(todayKey, -1);
    const yesterdayRecord = recordForDay(yesterday);
    const explicit = Math.max(
      0,
      number(yesterdayRecord?.streak, 0),
      state.lastDailySolvedKey === yesterday ? number(state.streak, 0) : 0
    );
    return Math.max(explicit, consecutiveRecordedDays(yesterday));
  }

  function desiredTodayStreak(todayKey, existingRecord = null){
    const existing = Math.max(0, number(existingRecord?.streak, 0));
    if (state.lastDailySolvedKey === todayKey) {
      return Math.max(1, existing, number(state.streak, 0), consecutiveRecordedDays(todayKey));
    }
    return Math.max(1, existing, previousRecordedStreak(todayKey) + 1);
  }

  function normalizeTodayRecord(record, mysteryId, todayKey, streak){
    return {
      ...(record && typeof record === "object" ? record : {}),
      mysteryId: record?.mysteryId || mysteryId,
      score: Math.max(0, number(record?.score, number(state.solvedMysteries?.[mysteryId]?.score, 0))),
      gems: Math.max(0, number(record?.gems, 0)),
      streak,
      at: number(record?.at, number(state.solvedMysteries?.[mysteryId]?.at, Date.now())),
      repairedStreak: true,
      repairedAt: number(record?.repairedAt, Date.now())
    };
  }

  function repairTodayStreak({ persist = true, rerender = true } = {}) {
    if (!state || typeof state !== "object") return false;
    let changed = adoptCanonicalStreak();
    const todayKey = safe(() => localDayKey(), keyFor());
    state.dailyClaims = state.dailyClaims && typeof state.dailyClaims === "object" ? state.dailyClaims : {};
    state.dailyHistory = state.dailyHistory && typeof state.dailyHistory === "object" ? state.dailyHistory : {};
    state.solvedMysteries = state.solvedMysteries && typeof state.solvedMysteries === "object" ? state.solvedMysteries : {};
    state.achievements = state.achievements && typeof state.achievements === "object" ? state.achievements : {};

    const existing = recordForDay(todayKey);
    const solved = solvedTodayCandidate(todayKey);
    if (!existing && !solved) {
      if (changed && persist) { try { saveState(); } catch {} }
      if (changed && rerender) { try { render({ immediate: true }); } catch { try { render(); } catch {} } }
      return changed;
    }

    const mysteryId = existing?.mysteryId || solved?.id;
    if (!mysteryId) return changed;
    const streak = desiredTodayStreak(todayKey, existing);

    const claim = normalizeTodayRecord(state.dailyClaims[todayKey] || existing, mysteryId, todayKey, streak);
    const history = normalizeTodayRecord(state.dailyHistory[todayKey] || existing, mysteryId, todayKey, streak);
    if (JSON.stringify(state.dailyClaims[todayKey] || null) !== JSON.stringify(claim)) {
      state.dailyClaims = { ...state.dailyClaims, [todayKey]: claim };
      changed = true;
    }
    if (JSON.stringify(state.dailyHistory[todayKey] || null) !== JSON.stringify(history)) {
      state.dailyHistory = { ...state.dailyHistory, [todayKey]: history };
      changed = true;
    }
    if (number(state.streak, 0) < streak) { state.streak = streak; changed = true; }
    if (state.lastDailySolvedKey !== todayKey) { state.lastDailySolvedKey = todayKey; changed = true; }
    if (streak >= 3 && !state.achievements.streak3) { state.achievements.streak3 = true; changed = true; }
    if (streak >= 7 && !state.achievements.streak7) { state.achievements.streak7 = true; changed = true; }

    if (changed && persist) {
      try { saveState(); } catch {}
    }
    if (changed && rerender) {
      try { render({ immediate: true }); } catch { try { render(); } catch {} }
    }
    return changed;
  }

  const previousApplyDailyReward = safe(() => applyDailyReward, null);
  if (typeof previousApplyDailyReward === "function") {
    try {
      applyDailyReward = function beta265ApplyDailyReward(mysteryId, score){
        const todayKey = safe(() => localDayKey(), keyFor());
        const existing = state.dailyClaims?.[todayKey] || state.dailyHistory?.[todayKey] || null;
        if (existing && canonicalIsToday(mysteryId)) {
          repairTodayStreak({ persist: false, rerender: false });
          const streak = Math.max(1, number(state.streak, 1));
          return `Série ${streak} jour${streak > 1 ? "s" : ""} validée`;
        }
        const reward = previousApplyDailyReward(mysteryId, score);
        repairTodayStreak({ persist: false, rerender: false });
        return reward;
      };
    } catch {}
  }

  function runRepair(){
    const changed = repairTodayStreak({ persist: true, rerender: false });
    if (changed) {
      try { render({ immediate: true }); } catch { try { render(); } catch {} }
    }
  }

  try { runRepair(); } catch {}
  window.setTimeout(runRepair, 0);
  window.addEventListener("pageshow", runRepair);
  window.addEventListener("focus", runRepair);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") runRepair();
  });

  window.HistoDailyStreakRepair = {
    version: VERSION,
    repair: runRepair,
    value: canonicalStreakValue,
    isTodayMystery: canonicalIsToday,
    diagnostics: () => {
      const todayKey = safe(() => localDayKey(), keyFor());
      return {
        version: VERSION,
        todayKey,
        streak: number(state?.streak, 0),
        lastDailySolvedKey: state?.lastDailySolvedKey || null,
        todayClaim: state?.dailyClaims?.[todayKey] || null,
        todayHistory: state?.dailyHistory?.[todayKey] || null,
        solvedCandidate: solvedTodayCandidate(todayKey)?.id || null
      };
    }
  };
})();
