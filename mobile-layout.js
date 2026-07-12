/* HistoDaily beta 254 — réparations de mise en page uniquement, sans logique sociale */
(function histoDailyMobileLayout() {
  "use strict";
  const VERSION = "1.0.0-beta.254.0";

  function activeState() {
    try { return state; } catch { return null; }
  }

  function repairHomeRail() {
    if (activeState()?.tab !== "home") return;
    const rail = document.querySelector(".hd222-world-switcher");
    const active = rail?.querySelector(".hd222-world.active");
    if (!rail || !active) return;
    const worlds = [...rail.querySelectorAll(".hd222-world")];
    const index = Math.max(0, worlds.indexOf(active));
    const left = index === 0 ? 0 : Math.max(0, Number(active.offsetLeft || 0));
    const apply = () => {
      if (!rail.isConnected) return;
      try { rail.scrollTo({ left, behavior: "auto" }); }
      catch { rail.scrollLeft = left; }
    };
    apply();
    requestAnimationFrame(apply);
    setTimeout(apply, 80);
  }

  const previousRender = typeof render === "function" ? render : null;
  if (previousRender) {
    render = function beta254LayoutRender(options = {}) {
      const result = previousRender(options);
      repairHomeRail();
      return result;
    };
  }

  window.addEventListener("resize", repairHomeRail, { passive: true });
  window.addEventListener("orientationchange", () => setTimeout(repairHomeRail, 120), { passive: true });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistration().then(registration => registration?.update?.()).catch(() => {});
  }

  document.documentElement.dataset.layoutVersion = VERSION;
  window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, mobileLayout: "isolated" };
})();
