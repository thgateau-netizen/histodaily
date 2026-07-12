/* HistoDaily beta 250 — correctifs de régression mobile et synchronisation */
(() => {
  "use strict";
  const VERSION = "1.0.0-beta.250.0";
  document.documentElement.classList.add("hd250-mobile-fixes");

  function resetHomeDisciplineRail(){
    if (state?.tab !== "home") return;
    const rail = document.querySelector(".hd219-disciplines");
    if (!rail) return;
    // L'accueil doit toujours commencer sur Histoire, sans décalage hérité.
    requestAnimationFrame(() => {
      try { rail.scrollTo({ left: 0, behavior: "instant" }); }
      catch { rail.scrollLeft = 0; }
    });
  }

  // Les modes supabase-atomic / supabase-cas / supabase-aggregate sont des succès.
  function normalizeSuccessfulStatuses(){
    const statuses = state?.serverLeaderboardStatus || {};
    let changed = false;
    for (const [key, status] of Object.entries(statuses)) {
      if (status?.authoritative === true && String(status.mode || "").startsWith("supabase")) {
        if (status.mode !== "supabase") {
          statuses[key] = { ...status, mode: "supabase", note: "Classement partagé actualisé." };
          changed = true;
        }
      }
    }
    if (changed) {
      state.serverLeaderboardStatus = { ...statuses };
      try { queueSaveState?.(80); } catch {}
    }
  }

  // Une ancienne file peut contenir plusieurs copies du même score. On la compacte
  // avant affichage et avant chaque renvoi pour éviter les compteurs fantômes.
  function compactScoreOutbox(){
    try {
      if (typeof beta128ReadScoreOutbox !== "function" || typeof beta128SaveScoreOutbox !== "function") return;
      const rows = beta128ReadScoreOutbox();
      const map = new Map();
      for (const row of rows) {
        const key = typeof beta128ScoreKey === "function" ? beta128ScoreKey(row) : `${row.playerId||""}|${row.mysteryId||""}|${row.periodKey||row.dayKey||""}`;
        const previous = map.get(key);
        if (!previous || Number(row.score||0) >= Number(previous.score||0)) map.set(key, row);
      }
      if (map.size !== rows.length) beta128SaveScoreOutbox([...map.values()]);
    } catch {}
  }

  const previousRender = typeof render === "function" ? render : null;
  if (previousRender) {
    render = function beta250Render(options = {}) {
      normalizeSuccessfulStatuses();
      compactScoreOutbox();
      const result = previousRender(options);
      resetHomeDisciplineRail();
      return result;
    };
  }

  window.addEventListener("online", () => {
    compactScoreOutbox();
    try { beta128FlushScoreOutbox?.({ force: true, reason: "beta250-online" }); } catch {}
  });

  try {
    state.beta250Version = VERSION;
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, mobileLayoutRepair: true, aggregateRankingAccepted: true, legacyScoreSchemaCompatible: true };
    queueSaveState?.(50);
  } catch {}
})();
