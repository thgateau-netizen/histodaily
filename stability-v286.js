/* HistoDaily 1.0 — stabilité, raccourcis PWA et version canonique. */
(() => {
  "use strict";
  const VERSION = "1.0.0-rc.13.1";
  const installedAt = performance.now();
  let versionRepairs = 0;
  let shortcutApplied = "";

  let registry = window.HistoDaily && typeof window.HistoDaily === "object" ? { ...window.HistoDaily } : {};

  // Les anciennes couches attribuent encore window.HistoDaily avec leur numéro
  // de schéma. Intercepter ces attributions garde une version publique unique
  // sans toucher aux versions internes de migration.
  try {
    Object.defineProperty(window, "HistoDaily", {
      configurable: true,
      enumerable: true,
      get() { return registry; },
      set(value) {
        const next = value && typeof value === "object" ? value : {};
        registry = { ...next, version: VERSION, releaseVersion: VERSION, releaseCandidate: true, stabilityPassRc10: true };
      }
    });
  } catch {}

  function stampVersion() {
    try {
      window.HD_RELEASE_VERSION = VERSION;
      if (window.HISTODAILY_CORE) {
        HISTODAILY_CORE.version = VERSION;
        HISTODAILY_CORE.assetsVersion = VERSION;
        if (HISTODAILY_CORE.ui) HISTODAILY_CORE.ui.versionLabel = "1.0";
      }
      const current = window.HistoDaily && typeof window.HistoDaily === "object" ? window.HistoDaily : {};
      if (current.version !== VERSION || current.releaseVersion !== VERSION) versionRepairs += 1;
      window.HistoDaily = {
        ...current,
        version: VERSION,
        releaseVersion: VERSION,
        releaseCandidate: true,
        stabilityPassRc10: true
      };
      document.documentElement.dataset.release = VERSION;
    } catch {}
  }

  function normalizeShortcut(value = "") {
    const view = String(value || "").trim().toLowerCase();
    if (["daily", "mystery", "today"].includes(view)) return "daily";
    if (["courses", "course", "learn", "lessons"].includes(view)) return "courses";
    if (["rank", "ranking", "leaderboard"].includes(view)) return "rank";
    if (["profile", "me"].includes(view)) return "profile";
    return "";
  }

  function applyShortcut(explicitView = "") {
    let params = null;
    let view = normalizeShortcut(explicitView);
    try {
      params = new URLSearchParams(location.search || "");
      view ||= normalizeShortcut(params.get("view") || params.get("open") || "");
    } catch {}
    if (!view || typeof state !== "object" || !state) return false;

    try {
      if (view === "daily") {
        const mystery = typeof dailyMystery === "function" ? dailyMystery() : null;
        if (mystery?.id) {
          state.currentMysteryId = mystery.id;
          state.currentMysteryDiscipline = typeof mysteryDisciplineId === "function" ? mysteryDisciplineId(mystery) : (mystery.discipline || state.currentDiscipline || "history");
          state.currentDiscipline = state.currentMysteryDiscipline;
          state.tab = "mystery";
        } else state.tab = "home";
      } else if (view === "courses") {
        state.tab = "learn";
        state.learnDrill = state.learnDrill || "chapters";
      } else if (view === "rank") state.tab = "rank";
      else if (view === "profile") state.tab = "profile";
      shortcutApplied = view;
      try { saveState?.(); } catch {}

      if (params) {
        params.delete("view"); params.delete("open");
        const query = params.toString();
        const clean = `${location.pathname || "/"}${query ? `?${query}` : ""}${location.hash || ""}`;
        try { history.replaceState(null, "", clean); } catch {}
      }
      return true;
    } catch { return false; }
  }

  // Les scripts sont différés : l'état existe ici, mais le premier rendu n'a
  // pas encore eu lieu. Le raccourci peut donc choisir la bonne route sans flash.
  applyShortcut();
  stampVersion();

  try {
    if (typeof render === "function" && !render.__hdRc10Wrapped) {
      const previousRender = render;
      render = function histodailyRc10Render(...args) {
        const result = previousRender.apply(this, args);
        stampVersion();
        return result;
      };
      render.__hdRc10Wrapped = true;
    }
  } catch {}

  const app = document.getElementById("app");
  if (app && typeof MutationObserver === "function") {
    let scheduled = false;
    new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      queueMicrotask(() => {
        scheduled = false;
        if (window.HistoDaily?.version !== VERSION) stampVersion();
      });
    }).observe(app, { childList: true, subtree: false });
  }

  addEventListener("pageshow", stampVersion, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") stampVersion();
  }, { passive: true });

  function snapshot() {
    let primary = null;
    try { primary = JSON.parse(localStorage.getItem("histodaily_state") || "null"); } catch {}
    return {
      version: VERSION,
      installedAfterMs: Math.round(performance.now() - installedAt),
      versionRepairs,
      shortcutApplied,
      storedRevision: Number(primary?._hdRevision || 0),
      storedAt: Number(primary?._hdSavedAt || 0),
      route: String(state?.tab || "unknown")
    };
  }

  try {
    window.HistoDailyStability = { version: VERSION, stampVersion, applyShortcut, snapshot };
  } catch {}
  queueMicrotask(stampVersion);
})();
