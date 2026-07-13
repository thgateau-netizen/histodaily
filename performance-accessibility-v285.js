/* HistoDaily 1.0 RC9 — performance sûre et accessibilité mobile. */
(function histodailyRc9PerformanceAccessibility(){
  "use strict";
  const VERSION = "1.0.0-rc.15.1";
  const startedAt = performance.now();
  const longTasks = [];
  let scheduled = false;
  let lastRoute = "";

  const safe = (fn, fallback = null) => { try { const value = fn(); return value == null ? fallback : value; } catch { return fallback; } };
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
  const reducedMotion = safe(() => matchMedia("(prefers-reduced-motion: reduce)").matches, false);
  const lowPower = Boolean(
    reducedMotion ||
    connection?.saveData ||
    (Number(navigator.deviceMemory || 8) <= 4) ||
    (Number(navigator.hardwareConcurrency || 8) <= 4)
  );

  document.documentElement.classList.toggle("hd-rc9-low-power", lowPower);
  document.documentElement.classList.toggle("hd-rc9-reduced-motion", reducedMotion);
  if (document.body) document.body.classList.toggle("hd-rc9-low-power", lowPower);

  function announce(message){
    const node = document.getElementById("app-announcer");
    if (!node || !message) return;
    node.textContent = "";
    requestAnimationFrame(() => { node.textContent = String(message); });
  }

  function optimizeImages(root = document){
    root.querySelectorAll?.("img").forEach((image, index) => {
      if (!image.hasAttribute("alt")) image.alt = "";
      image.decoding = "async";
      const rect = safe(() => image.getBoundingClientRect(), null);
      const aboveFold = rect && rect.top < innerHeight * 1.25;
      if (!aboveFold && !image.hasAttribute("loading")) image.loading = "lazy";
      if (aboveFold && index === 0) image.fetchPriority = "high";
    });
  }

  function improveSemantics(root = document){
    const main = root.querySelector?.("#main-content") || document.querySelector("#main-content");
    if (main) {
      main.setAttribute("role", "main");
      main.setAttribute("aria-busy", "false");
      if (!main.hasAttribute("tabindex")) main.tabIndex = -1;
    }

    root.querySelectorAll?.("[role='button']:not(button):not(a)").forEach(node => {
      if (!node.hasAttribute("tabindex")) node.tabIndex = 0;
    });

    root.querySelectorAll?.("input, textarea").forEach(field => {
      if (!field.hasAttribute("enterkeyhint")) {
        const guess = field.matches("[data-guess-input], [name='guess']");
        const search = field.type === "search" || /search|recherch/i.test(field.name || field.placeholder || "");
        field.setAttribute("enterkeyhint", guess ? "send" : search ? "search" : "done");
      }
    });

    optimizeImages(root);
  }

  function routeName(){
    const shell = document.querySelector("#main-content");
    const tabClass = [...(shell?.classList || [])].find(name => name.startsWith("tab-")) || "";
    const heading = shell?.querySelector("h1")?.textContent?.trim() || shell?.querySelector("h2")?.textContent?.trim() || "";
    return `${tabClass}|${heading}`;
  }

  function processRender(){
    scheduled = false;
    improveSemantics(document.getElementById("app") || document);
    const current = routeName();
    if (current && current !== lastRoute) {
      const wasKnown = Boolean(lastRoute);
      lastRoute = current;
      if (wasKnown) {
        const heading = current.split("|").slice(1).join("|");
        if (heading) announce(heading);
      }
    }
  }

  function scheduleRenderProcessing(){
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(processRender);
  }

  document.addEventListener("keydown", event => {
    if (event.defaultPrevented || event.repeat || !["Enter", " "].includes(event.key)) return;
    const target = event.target?.closest?.("[role='button']");
    if (!target || /^(BUTTON|A|INPUT|SELECT|TEXTAREA)$/.test(target.tagName)) return;
    event.preventDefault();
    target.click();
  }, true);

  const appRoot = document.getElementById("app");
  if (appRoot && typeof MutationObserver === "function") {
    new MutationObserver(scheduleRenderProcessing).observe(appRoot, { childList: true, subtree: true });
  }

  if (typeof PerformanceObserver === "function") {
    try {
      const observer = new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
          longTasks.push({ start: Math.round(entry.startTime), duration: Math.round(entry.duration) });
          if (longTasks.length > 20) longTasks.shift();
        });
      });
      observer.observe({ type: "longtask", buffered: true });
    } catch {}
  }

  function snapshot(){
    const nav = performance.getEntriesByType?.("navigation")?.[0];
    return {
      version: VERSION,
      lowPower,
      reducedMotion,
      saveData: Boolean(connection?.saveData),
      effectiveType: connection?.effectiveType || null,
      deviceMemory: Number(navigator.deviceMemory || 0) || null,
      hardwareConcurrency: Number(navigator.hardwareConcurrency || 0) || null,
      readyAfterMs: Math.round(performance.now() - startedAt),
      domInteractiveMs: nav ? Math.round(nav.domInteractive) : null,
      loadMs: nav ? Math.round(nav.loadEventEnd || nav.duration) : null,
      longTasks: longTasks.slice(),
      catalogCache: safe(() => ({ lessons: curatedLessons().length, worlds: curatedWorlds().length }), null)
    };
  }

  scheduleRenderProcessing();
  addEventListener("pageshow", scheduleRenderProcessing, { passive: true });
  addEventListener("online", () => announce("Connexion retrouvée."), { passive: true });

  try {
    window.HistoDailyPerformance = { version: VERSION, snapshot, optimizeImages, improveSemantics };
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      performancePass: true,
      accessibilityPassRc9: true,
      lowPowerMode: lowPower
    };
  } catch {}
})();
