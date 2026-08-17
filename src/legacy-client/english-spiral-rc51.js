/* HistoDaily RC51 — English spiral: useful chunks come back through spaced recognition and active recall. */
(function histodailyRc51EnglishSpiral(){
  "use strict";
  const VERSION = "1.0.0-rc.54.0";
  try {
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      englishSpiralRC51: {
        version: VERSION,
        courseAnchors: 3,
        initialDays: [1, 3, 7],
        dailyPackReturns: true,
        progression: ["recognition", "active-recall", "spaced-recall"],
        openPractice(){ try { return window.HistoDaily?.memory?.openReviewSession?.("english"); } catch { return null; } }
      }
    };
  } catch {}
})();
