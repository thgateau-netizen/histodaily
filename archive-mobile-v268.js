/* HistoDaily beta 268 — Android archive scroll repair.
   Keeps the document as the vertical scroll container, removes stale overlay locks,
   and keeps the archive answer field reachable when the virtual keyboard opens. */
(function histodailyArchiveMobile268(){
  "use strict";

  const VERSION = "1.0.0-beta.268.0";
  const PENDING_KEY = "histodaily.archive.pending.v268";
  let scheduled = false;
  let lastMysteryId = "";
  let viewportTimer = 0;

  const safe = (fn, fallback = null) => {
    try {
      const value = fn();
      return value == null ? fallback : value;
    } catch {
      return fallback;
    }
  };

  document.documentElement.classList.add("hd268-archive-scroll");

  function overlayActuallyOpen(){
    return Boolean(document.querySelector(".hd187-layer,[role='dialog'][aria-modal='true']"));
  }

  function clearStaleScrollLock(){
    if (overlayActuallyOpen()) return;
    document.body.classList.remove("hd187-layer-open");
    [document.documentElement, document.body, document.getElementById("app")].forEach(node => {
      if (!node) return;
      const style = node.style;
      if (style.position === "fixed") style.removeProperty("position");
      if (style.overflow === "hidden") style.removeProperty("overflow");
      if (style.overflowY === "hidden") style.removeProperty("overflow-y");
      if (style.height && /(?:100vh|100dvh|100svh|100%)/.test(style.height)) style.removeProperty("height");
      if (style.maxHeight && /(?:100vh|100dvh|100svh|100%)/.test(style.maxHeight)) style.removeProperty("max-height");
    });
  }

  function currentArchive(){
    const mystery = safe(() => currentMystery(), null);
    if (!mystery?.id) return { mystery:null, archive:false };
    const archive = !Boolean(safe(() => isTodayMystery(mystery.id), false));
    return { mystery, archive };
  }

  function moveArchiveAnswerHigher(shell){
    const answer = shell.querySelector(".hd264-answer-zone");
    const clueBoard = shell.querySelector(".hd264-clue-board");
    const prompt = shell.querySelector(".hd264-prompt,.prompt");
    if (!answer || !prompt) return;
    if (prompt.nextElementSibling !== answer) prompt.insertAdjacentElement("afterend", answer);
  }

  function restoreArchiveTop(mysteryId){
    let pending = "";
    try { pending = sessionStorage.getItem(PENDING_KEY) || ""; } catch {}
    if (!pending || pending !== String(mysteryId || "")) return;
    try { sessionStorage.removeItem(PENDING_KEY); } catch {}
    window.requestAnimationFrame(() => {
      try { window.scrollTo({ top:0, left:0, behavior:"auto" }); }
      catch { window.scrollTo(0, 0); }
    });
  }

  function ensureAnswerVisible(input){
    if (!input || !document.body.contains(input)) return;
    window.clearTimeout(viewportTimer);
    viewportTimer = window.setTimeout(() => {
      try { input.scrollIntoView({ block:"center", inline:"nearest", behavior:"smooth" }); }
      catch {
        const top = Math.max(0, input.getBoundingClientRect().top + window.scrollY - Math.max(70, window.innerHeight * .28));
        try { window.scrollTo({ top, behavior:"auto" }); } catch { window.scrollTo(0, top); }
      }
    }, 180);
  }

  function apply(){
    scheduled = false;
    clearStaleScrollLock();
    const shell = document.querySelector(".app-shell.tab-mystery");
    if (!shell) return;

    shell.classList.add("hd268-scroll-safe");
    const { mystery, archive } = currentArchive();
    shell.classList.toggle("hd268-archive-open", archive);
    if (!mystery?.id) return;

    if (archive) moveArchiveAnswerHigher(shell);
    if (String(mystery.id) !== lastMysteryId) {
      lastMysteryId = String(mystery.id);
      restoreArchiveTop(mystery.id);
    }
  }

  function schedule(){
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(apply);
  }

  document.addEventListener("click", event => {
    const open = event.target.closest?.("[data-open-mystery-id]");
    if (!open) return;
    try { sessionStorage.setItem(PENDING_KEY, String(open.dataset.openMysteryId || "")); } catch {}
  }, true);

  document.addEventListener("focusin", event => {
    const input = event.target?.closest?.(".app-shell.tab-mystery [data-guess-input]");
    if (!input) return;
    clearStaleScrollLock();
    ensureAnswerVisible(input);
  }, true);

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => {
      const input = document.activeElement?.matches?.(".app-shell.tab-mystery [data-guess-input]") ? document.activeElement : null;
      if (input) ensureAnswerVisible(input);
    }, { passive:true });
  }

  window.addEventListener("pageshow", schedule, { passive:true });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) schedule(); });

  const observer = new MutationObserver(schedule);
  observer.observe(document.getElementById("app") || document.body, { childList:true, subtree:true });

  window.HistoDaily = { ...(window.HistoDaily || {}), archiveMobileVersion:VERSION };
  schedule();
})();
