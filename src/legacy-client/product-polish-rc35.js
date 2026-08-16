/* HistoDaily RC35 — product polish: coherent mobile interaction without new feature layers. */
(() => {
  "use strict";
  const VERSION = "1.0.0-rc.35.0";
  const root = document.documentElement;
  const app = document.getElementById("app");
  let scheduled = false;

  root.classList.add("hd35-polish");
  root.dataset.productPolish = "rc35";

  function syncDetails(details) {
    const summary = details.querySelector(":scope > summary");
    if (!summary) return;
    summary.setAttribute("aria-expanded", details.open ? "true" : "false");
    if (details.dataset.hd35ToggleBound === "1") return;
    details.dataset.hd35ToggleBound = "1";
    details.addEventListener("toggle", () => summary.setAttribute("aria-expanded", details.open ? "true" : "false"), { passive: true });
  }

  function decorateNav(shell) {
    shell.querySelectorAll(".bottom-nav .nav-item").forEach(button => {
      if (button.classList.contains("active")) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
  }

  function decoratePrimaryActions(shell) {
    shell.querySelectorAll(".hd35-primary-action").forEach(node => node.classList.remove("hd35-primary-action"));
    const candidate =
      shell.querySelector(".rc24-hero-cta") ||
      shell.querySelector(".hd214-continue-card") ||
      shell.querySelector(".hd34-reader-footer > button") ||
      shell.querySelector(".hd300-guess button[type='submit']") ||
      shell.querySelector(".rc31-completion-actions button:not(.rc31-secondary)");
    candidate?.classList.add("hd35-primary-action");
  }

  function decorateLongLists(shell) {
    shell.querySelectorAll(".hd214-chapter-row,.hd214-lesson-row,.hdsv2-rank-row").forEach(row => row.classList.add("hd35-list-row"));
  }

  function decorateRefresh(shell) {
    shell.querySelectorAll("[data-social-refresh]").forEach(button => {
      if (button.dataset.hd35PendingBound === "1") return;
      button.dataset.hd35PendingBound = "1";
      button.addEventListener("click", () => {
        button.classList.add("hd35-pending");
        button.setAttribute("aria-busy", "true");
        window.setTimeout(() => {
          if (!button.isConnected) return;
          button.classList.remove("hd35-pending");
          button.removeAttribute("aria-busy");
        }, 650);
      }, { passive: true });
    });
  }

  function polish() {
    scheduled = false;
    const shell = app?.querySelector(".app-shell");
    if (!shell) return;
    shell.classList.add("hd35-screen");
    shell.querySelectorAll("details").forEach(syncDetails);
    decorateNav(shell);
    decoratePrimaryActions(shell);
    decorateLongLists(shell);
    decorateRefresh(shell);
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(polish);
  }

  if (app && typeof MutationObserver === "function") {
    new MutationObserver(schedule).observe(app, { childList: true, subtree: true });
  }
  schedule();

  try {
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      productPolishVersion: VERSION,
      productPolish: true
    };
  } catch {}
})();
