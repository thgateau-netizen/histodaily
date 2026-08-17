/* HistoDaily RC52 — Product loop: make learning progress visible, welcome returning users without debt,
   and expose a compact funnel snapshot for real retention diagnosis. */
(function histodailyRc52ProductLoop(){
  "use strict";
  const VERSION = "1.0.0-rc.54.0";
  const ANALYTICS_KEY = "histodaily_retention_rc47";
  const safe = (fn, fallback = null) => { try { const value = fn(); return value == null ? fallback : value; } catch { return fallback; } };
  const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));

  function todayKey(){ return safe(() => localDayKey(Date.now()), new Date().toISOString().slice(0,10)); }
  function dayNumber(key){
    const match = String(key || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if(!match) return NaN;
    return Math.floor(new Date(Number(match[1]), Number(match[2])-1, Number(match[3]), 12).getTime()/86400000);
  }
  function analytics(){
    try { const data = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || "null"); return data && typeof data === "object" ? data : {}; }
    catch { return {}; }
  }
  function activeDays(){ return Object.keys(analytics().activeDays || {}).sort(); }
  function priorActiveDay(){
    const today = todayKey();
    return activeDays().filter(day => day < today).at(-1) || null;
  }
  function returnGapDays(){
    const previous = priorActiveDay();
    if(!previous) return null;
    const gap = dayNumber(todayKey()) - dayNumber(previous);
    return Number.isFinite(gap) ? Math.max(0, gap) : null;
  }
  function currentDiscipline(){ return safe(() => disciplineById(activeDisciplineId()), null); }
  function disciplineName(id){ return safe(() => disciplineById(id)?.name, String(id || "ce domaine")); }
  function lessons(id){ return safe(() => lessonsForDiscipline(id), []) || []; }
  function mysteries(id){ return safe(() => publicMysteries(id), []) || []; }
  function doneLessons(id){ return lessons(id).filter(item => safe(() => lessonDone(item.id), false)).length; }
  function solvedMysteries(id){ return mysteries(id).filter(item => safe(() => mysterySolved(item.id), Boolean(state?.solvedMysteries?.[item.id]))).length; }
  function dueReviews(id){ return (safe(() => window.HistoDaily?.memory?.validReviewEntries?.(id), []) || []).length; }
  function lastSevenActive(){
    const now = dayNumber(todayKey());
    return activeDays().filter(day => { const n = dayNumber(day); return Number.isFinite(n) && now - n >= 0 && now - n <= 6; }).length;
  }
  function totalLearning(){
    return {
      lessons: Object.keys(state?.completedLessons || {}).length,
      mysteries: Object.keys(state?.solvedMysteries || {}).length,
      active7: lastSevenActive()
    };
  }
  function progressSnapshot(rawId){
    const id = safe(() => disciplineById(rawId || activeDisciplineId()).id, rawId || activeDisciplineId());
    const lessonTotal = lessons(id).length;
    const mysteryTotal = mysteries(id).length;
    const lessonDoneCount = doneLessons(id);
    const mysterySolvedCount = solvedMysteries(id);
    return {
      disciplineId: id,
      discipline: disciplineName(id),
      lessonsDone: lessonDoneCount,
      lessonsTotal: lessonTotal,
      mysteriesSolved: mysterySolvedCount,
      mysteriesTotal: mysteryTotal,
      dueReviews: dueReviews(id),
      total: totalLearning()
    };
  }
  function record(type, meta={}){ safe(() => window.HistoDailyDailyHookRC49?.record?.(type, meta)); }

  function progressMarkup(snapshot, {solvedToday=false, compact=false, hideDue=false}={}){
    const discoveryLabel = snapshot.mysteriesSolved === 1 ? "dossier exploré" : "dossiers explorés";
    const courseLabel = snapshot.lessonsDone === 1 ? "cours maîtrisé" : "cours maîtrisés";
    const streakFree = snapshot.total.active7 > 0 ? `${snapshot.total.active7}/7 jours actifs récemment` : "ta progression commence ici";
    return `<div class="rc52-progress ${compact ? "is-compact" : ""}" data-rc52-progress>
      <div class="rc52-progress-head"><small>${solvedToday ? "Ce que tu construis" : "Ta progression"}</small><strong>${esc(snapshot.discipline)}</strong></div>
      <div class="rc52-progress-values">
        <span><b>${snapshot.mysteriesSolved}</b> ${discoveryLabel}</span>
        <span><b>${snapshot.lessonsDone}</b> ${courseLabel}</span>
      </div>
      <p>${solvedToday ? "Aujourd’hui : +1 découverte qui reste dans ton parcours." : esc(streakFree)}${!hideDue && snapshot.dueReviews ? ` · ${snapshot.dueReviews} à consolider` : ""}</p>
    </div>`;
  }

  function welcomeBackMarkup(gap){
    const missed = Math.max(1, Number(gap || 0) - 1);
    const absence = missed === 1 ? "une journée" : `${missed} jours`;
    return `<section class="rc52-welcome" data-rc52-welcome aria-label="Retour dans HistoDaily">
      <span aria-hidden="true">↩</span><div><small>Content de te revoir</small><strong>Rien à rattraper.</strong><p>Après ${esc(absence)} sans ouvrir l’app, le dossier du jour suffit. Tu reprends exactement ici.</p></div>
    </section>`;
  }

  function enhanceHome(){
    const home = document.querySelector(".rc24-home");
    const hero = home?.querySelector(".rc24-hero");
    if(!home || !hero) return;
    home.querySelectorAll("[data-rc52-progress],[data-rc52-welcome]").forEach(node => node.remove());
    const discipline = currentDiscipline();
    const id = discipline?.id || safe(() => activeDisciplineId(), "history");
    const snapshot = progressSnapshot(id);
    const mystery = safe(() => window.HistoDailyDailyHookRC49?.dailyMysteryFor?.(id), null);
    const solved = Boolean(mystery?.id && safe(() => mysterySolved(mystery.id), Boolean(state?.solvedMysteries?.[mystery.id])));
    const gap = returnGapDays();

    if(!solved && Number(gap) >= 2){
      hero.insertAdjacentHTML("afterend", welcomeBackMarkup(gap));
      record("comeback_message_seen", { gapDays: gap, disciplineId: id, source: "home" });
    }

    const anchor = home.querySelector(".rc47-deep-dive") || home.querySelector(".rc44-optional-next") || home.querySelector("[data-rc52-welcome]") || hero;
    anchor.insertAdjacentHTML("afterend", progressMarkup(snapshot, {solvedToday: solved, hideDue: !solved && Number(gap) >= 2}));
    record("progress_visible", { disciplineId: id, solvedToday: solved, mysteriesSolved: snapshot.mysteriesSolved, lessonsDone: snapshot.lessonsDone, source: "home" });
  }

  function enhanceSolvedMystery(){
    const solution = document.querySelector(".hd300-solution");
    if(!solution || solution.querySelector("[data-rc52-progress]")) return;
    const mystery = safe(() => currentMystery(), null);
    if(!mystery?.id || !safe(() => mysterySolved(mystery.id), false)) return;
    const id = safe(() => mysteryDisciplineId(mystery), safe(() => activeDisciplineId(), "history"));
    const snapshot = progressSnapshot(id);
    const actions = solution.querySelector(".hd34-solved-next");
    const wrap = document.createElement("div");
    wrap.innerHTML = progressMarkup(snapshot, {solvedToday:true, compact:true});
    const block = wrap.firstElementChild;
    if(actions) actions.insertAdjacentElement("beforebegin", block); else solution.append(block);
    record("progress_visible", { disciplineId:id, solvedToday:true, mysteriesSolved:snapshot.mysteriesSolved, lessonsDone:snapshot.lessonsDone, source:"solution" });
  }

  function funnelSnapshot(){
    const data = analytics();
    const events = Array.isArray(data.events) ? data.events : [];
    const days = Object.keys(data.activeDays || {}).sort();
    const has = type => events.some(event => event?.type === type);
    const firstDay = data.firstSeenDay || days[0] || null;
    const firstDayEvents = events.filter(event => event?.day === firstDay).map(event => event.type);
    return {
      version: VERSION,
      firstSeenDay: firstDay,
      activeDays: days.length,
      activeLast7: lastSevenActive(),
      returnGapDays: returnGapDays(),
      firstSession: {
        opened: firstDayEvents.includes("app_open"),
        started: firstDayEvents.includes("mystery_start"),
        solved: firstDayEvents.includes("mystery_solved"),
        deepDive: firstDayEvents.includes("deep_dive")
      },
      ever: {
        started: has("mystery_start"),
        solved: has("mystery_solved"),
        sawTomorrow: has("teaser_seen"),
        deepDive: has("deep_dive"),
        returnedAfterGap: has("comeback_message_seen")
      },
      retention: {
        D1: Boolean(data.milestones?.D1),
        D3: Boolean(data.milestones?.D3),
        D7: Boolean(data.milestones?.D7)
      },
      learning: totalLearning()
    };
  }

  const previousRenderHome = typeof renderHome === "function" ? renderHome : null;
  if(previousRenderHome) renderHome = function rc52RenderHome(){ const out = previousRenderHome(); window.setTimeout(enhanceHome, 0); return out; };
  const previousRenderMystery = typeof renderMystery === "function" ? renderMystery : null;
  if(previousRenderMystery) renderMystery = function rc52RenderMystery(){ const out = previousRenderMystery(); window.setTimeout(enhanceSolvedMystery, 0); return out; };

  const api = Object.freeze({ version: VERSION, progressSnapshot, returnGapDays, funnelSnapshot, enhanceHome, enhanceSolvedMystery });
  window.HistoDailyProductLoopRC52 = api;
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, productLoopRC52: api }; } catch {}
  try { if(state?.tab === "home") window.setTimeout(enhanceHome, 0); else if(state?.tab === "mystery") window.setTimeout(enhanceSolvedMystery, 0); } catch {}
})();
