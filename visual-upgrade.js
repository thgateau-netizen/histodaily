/* HistoDaily beta 186 — finition graphique premium stabilisée, sans dépendance. */
(function histodailyBeta185VisualUpgrade(){
  "use strict";

  const VERSION = "1.0.0-beta.187";
  const appRoot = document.getElementById("app");
  if (!appRoot) return;

  const icons = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 10.8 12 3.7l8.5 7.1v8.1a1.6 1.6 0 0 1-1.6 1.6h-4.5v-5.7H9.6v5.7H5.1a1.6 1.6 0 0 1-1.6-1.6z"/></svg>',
    learn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4.8c2.8-.8 5.4-.3 8 1.3v13.1c-2.6-1.6-5.2-2.1-8-1.3zm16 0c-2.8-.8-5.4-.3-8 1.3v13.1c2.6-1.6 5.2-2.1 8-1.3z"/></svg>',
    rank: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h8v3.2c0 2.7-1.4 4.8-4 5.8-2.6-1-4-3.1-4-5.8zM7.8 6H4.5v1.6c0 2.3 1.5 3.9 4 4.4M16.2 6h3.3v1.6c0 2.3-1.5 3.9-4 4.4M12 13v3.2M8.5 20h7M9.5 16.2h5v3.8h-5z"/></svg>',
    profile: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 20c.6-4.1 3.1-6.2 7.5-6.2s6.9 2.1 7.5 6.2z"/></svg>'
  };

  let scheduled = false;

  function enhanceNavigation(shell){
    const nav = shell?.querySelector(".bottom-nav");
    if (!nav) return;
    nav.classList.add("hd184-nav");
    nav.querySelectorAll("[data-tab]").forEach(button => {
      const tab = button.dataset.tab;
      button.classList.add("hd184-nav-item");
      const icon = button.querySelector("span");
      if (icon && icons[tab] && icon.dataset.hd184Icon !== "1") {
        icon.innerHTML = icons[tab];
        icon.dataset.hd184Icon = "1";
      }
    });
  }

  function enhanceCards(shell){
    shell?.querySelectorAll(".card").forEach(card => card.classList.add("hd184-surface"));
    shell?.querySelector(".home-main-card")?.classList.add("hd184-feature-card");
    shell?.querySelector(".beta181-learning-hub")?.classList.add("hd184-feature-card");
    shell?.querySelector(".social-rank-hero")?.classList.add("hd184-feature-card");
    shell?.querySelector(".public-profile-card.me")?.classList.add("hd184-profile-hero");
    shell?.querySelectorAll(".tree-card,.tree-lesson,.lesson-card,.rank-row,.beta179-collection-card,.achievement")
      .forEach(item => item.classList.add("hd184-interactive-surface"));
  }

  function enhanceHeaders(shell){
    shell?.querySelector(".hero")?.classList.add("hd184-hero");
    shell?.querySelector(".topbar")?.classList.add("hd184-topbar");
    shell?.querySelectorAll(".section-title-row").forEach(row => row.classList.add("hd184-section-head"));
  }

  function enhanceControls(shell){
    shell?.querySelectorAll(".card-label").forEach(label => label.classList.add("hd184-label"));
    shell?.querySelectorAll(".progress,.mini-progress,.beta179-master-bar,.beta179-mastery-bar,.beta179-mini-progress")
      .forEach(bar => bar.classList.add("hd184-progress"));
    shell?.querySelectorAll("input,textarea,select").forEach(control => control.classList.add("hd184-control"));
  }

  function polish(){
    scheduled = false;
    document.body.classList.add("hd184-premium");
    const shell = appRoot.querySelector(".app-shell");
    if (!shell) return;
    shell.classList.add("hd184-premium-shell");
    enhanceNavigation(shell);
    enhanceCards(shell);
    enhanceHeaders(shell);
    enhanceControls(shell);
  }

  function schedule(){
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(polish);
  }

  const observer = new MutationObserver(schedule);
  observer.observe(appRoot, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", schedule, { once: true });
  window.addEventListener("pageshow", schedule, { passive: true });
  schedule();

  try {
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      premiumVisuals: true,
      dependencyFreeVisualUpgrade: true
    };
  } catch {}
})();
