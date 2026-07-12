/* HistoDaily beta 270 — Android course/library scroll repair.
   Generalises the archive fix to course readers and course catalogues. */
(function histodailyCourseMobile269(){
  "use strict";

  const VERSION = "1.0.0-beta.271.0";
  let scheduled = false;
  let lastScreenKey = "";

  const root = document.documentElement;
  root.classList.add("hd269-course-scroll");
  if (/Android/i.test(navigator.userAgent || "")) root.classList.add("hd269-android");

  function visibleModalOpen(){
    return [...document.querySelectorAll(".hd187-layer,[role='dialog'][aria-modal='true']")].some(node => {
      if (!node.isConnected) return false;
      const style = window.getComputedStyle(node);
      return style.display !== "none" && style.visibility !== "hidden" && style.pointerEvents !== "none";
    });
  }

  function removeViewportLock(node){
    if (!node) return;
    const style = node.style;
    if (["fixed","absolute"].includes(style.position) && node !== document.querySelector(".hd187-layer")) style.removeProperty("position");
    if (style.overflow === "hidden") style.removeProperty("overflow");
    if (style.overflowY === "hidden" || style.overflowY === "clip") style.removeProperty("overflow-y");
    if (style.touchAction === "none") style.removeProperty("touch-action");
    if (style.height && /^(?:100(?:d|s|l)?vh|100%|calc\(100)/i.test(style.height.trim())) style.removeProperty("height");
    if (style.maxHeight && /^(?:100(?:d|s|l)?vh|100%|calc\(100)/i.test(style.maxHeight.trim())) style.removeProperty("max-height");
  }

  function clearStaleLock(){
    if (visibleModalOpen()) return;
    document.body.classList.remove("hd187-layer-open");
    [document.documentElement, document.body, document.getElementById("app")].forEach(removeViewportLock);
  }

  function makeScreenScrollable(shell){
    if (!shell) return;
    shell.classList.add("hd269-scroll-safe");
    removeViewportLock(shell);
    shell.querySelectorAll(".reading-card,.lesson-full-page,.hd214-reader-page,.complete-course-panel,.express-coach-card,.quiz-section,.tree-section,.hd214-library-page").forEach(removeViewportLock);

    const screenKey = [shell.classList.contains("tab-lesson") ? "lesson" : "learn", shell.querySelector("h1")?.textContent || ""].join(":");
    if (screenKey !== lastScreenKey) {
      lastScreenKey = screenKey;
      window.requestAnimationFrame(() => {
        const scrolling = document.scrollingElement || document.documentElement;
        if (scrolling && scrolling.scrollTop < 0) scrolling.scrollTop = 0;
      });
    }
  }

  function apply(){
    scheduled = false;
    clearStaleLock();
    makeScreenScrollable(document.querySelector(".app-shell.tab-lesson"));
    makeScreenScrollable(document.querySelector(".app-shell.tab-learn"));
  }

  function schedule(){
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(apply);
  }

  document.addEventListener("touchstart", event => {
    if (!event.target.closest?.(".app-shell.tab-lesson,.app-shell.tab-learn")) return;
    clearStaleLock();
  }, { capture:true, passive:true });

  document.addEventListener("click", event => {
    if (!event.target.closest?.("[data-lesson-view],[data-hd214-reader-view],[data-hd214-footer-view],[data-open-lesson],[data-lesson-id]")) return;
    window.setTimeout(schedule, 0);
  }, true);

  window.addEventListener("pageshow", schedule, { passive:true });
  window.addEventListener("resize", schedule, { passive:true });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) schedule(); });

  const observer = new MutationObserver(schedule);
  observer.observe(document.getElementById("app") || document.body, { childList:true, subtree:true });

  window.HistoDaily = { ...(window.HistoDaily || {}), courseMobileVersion:VERSION };
  schedule();
})();
