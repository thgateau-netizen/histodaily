/* HistoDaily beta 251 — réparation PWA, classement et synchronisation */
(() => {
  "use strict";
  const VERSION = "1.0.0-beta.251.0";
  document.documentElement.classList.add("hd251-real-repair");

  function forceHomeRail(){
    if (window.state?.tab !== "home") return;
    const rail = document.querySelector(".hd219-disciplines");
    if (!rail) return;
    rail.scrollLeft = 0;
    requestAnimationFrame(() => { rail.scrollLeft = 0; });
    setTimeout(() => { if (rail.isConnected) rail.scrollLeft = 0; }, 120);
  }

  function isSuccessfulLeaderboardStatus(status){
    const mode = String(status?.mode || "").toLowerCase();
    return status?.authoritative === true || mode === "supabase" || mode.startsWith("supabase-") || mode === "remote";
  }

  function repairLeaderboardStatuses(){
    const statuses = window.state?.serverLeaderboardStatus;
    if (!statuses || typeof statuses !== "object") return;
    let changed = false;
    for (const key of Object.keys(statuses)) {
      const status = statuses[key];
      if (isSuccessfulLeaderboardStatus(status) && status?.mode !== "supabase") {
        statuses[key] = { ...status, authoritative: true, mode: "supabase", note: "Classement partagé actualisé." };
        changed = true;
      }
    }
    if (changed) try { window.queueSaveState?.(50); } catch {}
  }

  function compactOutbox(){
    try {
      if (typeof window.beta128ReadScoreOutbox !== "function" || typeof window.beta128SaveScoreOutbox !== "function") return;
      const rows = window.beta128ReadScoreOutbox() || [];
      const best = new Map();
      for (const row of rows) {
        const key = typeof window.beta128ScoreKey === "function"
          ? window.beta128ScoreKey(row)
          : `${row?.playerId||""}|${row?.mysteryId||""}|${row?.periodKey||row?.dayKey||""}`;
        const old = best.get(key);
        if (!old || Number(row?.score||0) >= Number(old?.score||0)) best.set(key,row);
      }
      if (best.size !== rows.length) window.beta128SaveScoreOutbox([...best.values()]);
    } catch {}
  }

  const oldRender = typeof window.render === "function" ? window.render : null;
  if (oldRender) window.render = function hd251Render(options={}){
    repairLeaderboardStatuses();
    compactOutbox();
    const result = oldRender(options);
    forceHomeRail();
    return result;
  };

  window.addEventListener("online", () => {
    compactOutbox();
    try { window.beta128FlushScoreOutbox?.({force:true,reason:"beta251-online"}); } catch {}
  });

  // Déclenche immédiatement la prise de contrôle du nouveau service worker.
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistration().then(reg => {
      reg?.update?.();
      reg?.waiting?.postMessage?.({type:"HISTODAILY_SKIP_WAITING"});
    }).catch(()=>{});
  }

  try {
    window.state.beta251Version = VERSION;
    window.HistoDaily = {...(window.HistoDaily||{}),version:VERSION,realMobileRepair:true};
    window.queueSaveState?.(30);
  } catch {}
})();
