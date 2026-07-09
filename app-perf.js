/* HistoDaily beta157 — couche performance mobile.
   But : garder un rendu animé, mais éviter les doubles rendus, les recalculs lourds
   et les effets CSS coûteux sur iPhone/Android. Charge après app.js. */
(function histoDailyPerfLayer(){
  "use strict";
  const PERF_VERSION = "1.0.0-beta.157-perf";
  const perfNow = () => (typeof performance !== "undefined" && performance.now ? performance.now() : Date.now());

  function safe(fn, fallback) {
    try { return fn(); } catch { return fallback; }
  }

  // 1) Cache des données dérivées : les cours et contenus ne changent pas pendant une session.
  const lessonContentCache = new Map();
  const lessonsByWorldCache = new Map();
  const curatedLessonsByWorldCache = new Map();
  const expandedBlocksCache = new Map();
  const quizPackCache = new Map();

  if (typeof allLessons === "function") {
    const originalAllLessons = allLessons;
    let cachedAllLessons = null;
    allLessons = function hdPerfAllLessons(){
      if (!cachedAllLessons) cachedAllLessons = Object.freeze(originalAllLessons().slice());
      return cachedAllLessons;
    };
  }

  if (typeof curatedLessons === "function") {
    const originalCuratedLessons = curatedLessons;
    let cachedCuratedLessons = null;
    curatedLessons = function hdPerfCuratedLessons(){
      if (!cachedCuratedLessons) cachedCuratedLessons = Object.freeze(originalCuratedLessons().slice());
      return cachedCuratedLessons;
    };
  }

  if (typeof curatedLessonsFor === "function") {
    const originalCuratedLessonsFor = curatedLessonsFor;
    curatedLessonsFor = function hdPerfCuratedLessonsFor(worldId){
      const key = String(worldId || "");
      if (!curatedLessonsByWorldCache.has(key)) {
        curatedLessonsByWorldCache.set(key, Object.freeze(originalCuratedLessonsFor(worldId).slice()));
      }
      return curatedLessonsByWorldCache.get(key);
    };
  }

  if (typeof treeLessonsForWorld === "function") {
    const originalTreeLessonsForWorld = treeLessonsForWorld;
    treeLessonsForWorld = function hdPerfTreeLessonsForWorld(worldId){
      const key = String(worldId || "");
      if (!lessonsByWorldCache.has(key)) {
        lessonsByWorldCache.set(key, Object.freeze(originalTreeLessonsForWorld(worldId).slice()));
      }
      return lessonsByWorldCache.get(key);
    };
  }

  if (typeof buildLessonContent === "function") {
    const originalBuildLessonContent = buildLessonContent;
    buildLessonContent = function hdPerfBuildLessonContent(lesson){
      const key = String(lesson?.id || lesson?.title || "");
      if (!key) return originalBuildLessonContent(lesson);
      if (!lessonContentCache.has(key)) lessonContentCache.set(key, originalBuildLessonContent(lesson));
      return lessonContentCache.get(key);
    };
  }

  if (typeof expandedCompleteBlocks === "function") {
    const originalExpandedCompleteBlocks = expandedCompleteBlocks;
    expandedCompleteBlocks = function hdPerfExpandedCompleteBlocks(lesson = {}, content = {}){
      const key = String(lesson?.id || content?.title || "");
      if (!key) return originalExpandedCompleteBlocks(lesson, content);
      if (!expandedBlocksCache.has(key)) expandedBlocksCache.set(key, Object.freeze(originalExpandedCompleteBlocks(lesson, content).slice()));
      return expandedBlocksCache.get(key);
    };
  }

  if (typeof normalizeQuizPack === "function") {
    const originalNormalizeQuizPack = normalizeQuizPack;
    normalizeQuizPack = function hdPerfNormalizeQuizPack(quiz = [], lesson = {}, content = {}){
      const key = String(lesson?.id || content?.title || "") + "|" + String(Array.isArray(quiz) ? quiz.length : 0);
      if (!key.trim()) return originalNormalizeQuizPack(quiz, lesson, content);
      if (!quizPackCache.has(key)) quizPackCache.set(key, Object.freeze(originalNormalizeQuizPack(quiz, lesson, content).slice()));
      return quizPackCache.get(key);
    };
  }

  // 2) Rendus regroupés : plusieurs setState/taps réseau dans la même frame = un seul vrai render.
  if (typeof render === "function") {
    const originalRender = render;
    let renderFrame = 0;
    let pendingOptions = null;
    let lastRealRenderAt = 0;

    render = function hdPerfRender(options = {}){
      const immediate = Boolean(options?.immediate || options?.renderImmediate);
      if (immediate || typeof requestAnimationFrame !== "function") {
        if (renderFrame && typeof cancelAnimationFrame === "function") cancelAnimationFrame(renderFrame);
        renderFrame = 0;
        pendingOptions = null;
        lastRealRenderAt = perfNow();
        return originalRender({ ...(options || {}), immediate: true });
      }
      pendingOptions = { ...(pendingOptions || {}), ...(options || {}) };
      if (renderFrame) return;
      renderFrame = requestAnimationFrame(() => {
        renderFrame = 0;
        const opts = pendingOptions || {};
        pendingOptions = null;
        lastRealRenderAt = perfNow();
        originalRender({ ...opts, immediate: true });
      });
    };

    window.HistoDailyRenderNow = () => originalRender({ immediate: true });
    window.HistoDailyLastRenderAt = () => lastRealRenderAt;
  }

  // 3) setState intelligent : pas de rendu si le patch ne change rien.
  if (typeof setState === "function") {
    const originalSetState = setState;
    setState = function hdPerfSetState(patch, options = {}){
      if (!patch || typeof patch !== "object") return;
      const keys = Object.keys(patch);
      const changed = keys.some(key => !Object.is(state?.[key], patch[key]));
      if (!changed && !options?.renderImmediate && !options?.immediate) {
        if (options?.save !== false && typeof patchNeedsPersistentSave === "function" && patchNeedsPersistentSave(patch) && typeof queueSaveState === "function") {
          queueSaveState(120);
        }
        return;
      }
      return originalSetState(patch, options);
    };
  }

  // 4) Score / leaderboard : limiter les rafraîchissements agressifs après retour onglet.
  if (typeof beta128RefreshLive === "function") {
    const originalRefreshLive = beta128RefreshLive;
    let lastRefreshAt = 0;
    beta128RefreshLive = function hdPerfRefreshLive(options = {}){
      const now = Date.now();
      const force = Boolean(options?.force);
      if (!force && now - lastRefreshAt < 45000) return;
      lastRefreshAt = now;
      return originalRefreshLive(options);
    };
  }

  // 5) Passage automatique en mode fluide : le mode visuel reste accessible, mais pas par défaut.
  safe(() => {
    const allowed = new Set(["smart", "static", "balanced"]);
    if (!allowed.has(state.performanceMode) || state.performanceMode === "balanced") {
      state.performanceMode = "smart";
      if (typeof queueSaveState === "function") queueSaveState(150);
    }
    if (typeof applyPerformanceMode === "function") applyPerformanceMode();
  });

  // 6) Mini instrumentation visible uniquement depuis la console si besoin.
  window.HistoDailyPerf = {
    version: PERF_VERSION,
    caches: () => ({
      lessonContent: lessonContentCache.size,
      lessonsByWorld: lessonsByWorldCache.size,
      curatedLessonsByWorld: curatedLessonsByWorldCache.size,
      expandedBlocks: expandedBlocksCache.size,
      quizPack: quizPackCache.size
    }),
    clearCaches: () => {
      lessonContentCache.clear();
      lessonsByWorldCache.clear();
      curatedLessonsByWorldCache.clear();
      expandedBlocksCache.clear();
      quizPackCache.clear();
    }
  };

  safe(() => {
    document.documentElement.dataset.hdPerf = "beta157";
    window.HistoDaily = { ...(window.HistoDaily || {}), perf: true, perfVersion: PERF_VERSION };
  });
})();
