/* HistoDaily RC36 — lean learning flow. Express remains in data/code, dormant in the current UI. */
(() => {
  "use strict";
  const VERSION = "1.0.0-rc.39.0";
  document.documentElement.classList.add("hd36-lean-flow");
  try {
    if (typeof state === "object" && state) {
      if (state.lessonView === "express") state.lessonView = "complete";
      if (state.lessonFocus === "express") state.lessonFocus = "complete";
    }
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, expressDormant: true, leanLearningFlow: true };
  } catch {}
})();
