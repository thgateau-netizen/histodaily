(() => {
  "use strict";
  const VERSION = "1.0.0-rc.13.1";
  const ERROR_KEY = "histodaily_release_errors_v1";

  function safeStateSummary() {
    try {
      return {
        xp: Math.max(0, Number(state?.xp || 0)),
        level: typeof level === "function" ? Number(level() || 1) : 1,
        completedLessons: Object.keys(state?.completedLessons || {}).length,
        solvedMysteries: Object.keys(state?.solvedMysteries || {}).length,
        pendingScores: Object.values(state?.lastScoreSubmit || {}).filter(item => item?.pending || ["offline","error","sending"].includes(item?.mode)).length,
        friendsLocal: Object.keys(state?.friends || {}).length,
        tab: String(state?.tab || "unknown")
      };
    } catch { return { unavailable: true }; }
  }

  function recordError(kind, value) {
    try {
      const previous = JSON.parse(localStorage.getItem(ERROR_KEY) || "[]");
      const message = String(value?.message || value || "Erreur inconnue").slice(0, 300);
      const row = { at: new Date().toISOString(), version: VERSION, kind, message };
      localStorage.setItem(ERROR_KEY, JSON.stringify([...previous.slice(-7), row]));
    } catch {}
  }

  async function diagnostics() {
    let cacheNames = [];
    let registration = null;
    try { cacheNames = "caches" in window ? await caches.keys() : []; } catch {}
    try {
      const reg = await navigator.serviceWorker?.getRegistration?.();
      registration = reg ? { active: Boolean(reg.active), waiting: Boolean(reg.waiting), installing: Boolean(reg.installing), scope: reg.scope } : null;
    } catch {}
    let storedErrors = [];
    try { storedErrors = JSON.parse(localStorage.getItem(ERROR_KEY) || "[]"); } catch {}
    return {
      app: "HistoDaily",
      version: VERSION,
      generatedAt: new Date().toISOString(),
      environment: {
        online: navigator.onLine !== false,
        standalone: matchMedia?.("(display-mode: standalone)")?.matches || Boolean(navigator.standalone),
        language: navigator.language,
        platform: navigator.userAgentData?.platform || navigator.platform || "unknown",
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        reducedMotion: matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || false
      },
      serviceWorker: registration,
      cacheNames,
      state: safeStateSummary(),
      recentErrors: storedErrors
    };
  }

  async function downloadDiagnostics() {
    const report = await diagnostics();
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `histodaily-diagnostic-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function repairCache() {
    if (!window.confirm("Réparer le cache de l’application ? Ta progression locale sera conservée.")) return false;
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.filter(key => key.startsWith("histodaily-")).map(key => caches.delete(key)));
    }
    try {
      const registrations = await navigator.serviceWorker?.getRegistrations?.();
      await Promise.all((registrations || []).map(reg => reg.update().catch(() => null)));
    } catch {}
    location.reload();
    return true;
  }

  async function verifyReleaseFiles() {
    try {
      const manifest = await fetch("manifest.webmanifest", { cache: "no-store" }).then(r => r.ok ? r.json() : null);
      if (manifest?.version && manifest.version !== VERSION) recordError("version", `Manifest ${manifest.version} / app ${VERSION}`);
    } catch {}
  }

  function boot() {
    document.documentElement.dataset.release = VERSION;
    window.addEventListener("error", event => recordError("error", event.error || event.message));
    window.addEventListener("unhandledrejection", event => recordError("promise", event.reason));
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      releaseVersion: VERSION,
      releaseCandidate: true,
      diagnostics,
      downloadDiagnostics,
      repairCache
    };
    verifyReleaseFiles();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
