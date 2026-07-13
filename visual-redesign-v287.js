/* HistoDaily RC14 — refonte visuelle visible, sans modifier le moteur */
(() => {
  "use strict";
  const VERSION = "1.0.0-rc.15";

  const safe = (fn, fallback = null) => { try { const value = fn(); return value == null ? fallback : value; } catch { return fallback; } };

  function dayStamp(){
    try {
      const parts = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short" }).formatToParts(new Date());
      const day = parts.find(p => p.type === "day")?.value || "";
      const month = (parts.find(p => p.type === "month")?.value || "").replace(".", "").toUpperCase();
      return `<span class="hd287-date-day">${day}</span><span class="hd287-date-month">${month}</span>`;
    } catch { return `<span class="hd287-date-day">•</span><span class="hd287-date-month">AUJ.</span>`; }
  }

  function enhanceHome(){
    const shell = document.querySelector(".app-shell.tab-home");
    const home = shell?.querySelector(".hd222-home, .hd219-home");
    if (!shell || !home || home.dataset.hd287 === "1") return;
    home.dataset.hd287 = "1";
    shell.classList.add("hd287-home-shell");
    home.classList.add("hd287-home");

    const appbar = home.querySelector(".hd222-home-head, .hd219-appbar");
    if (appbar) {
      appbar.classList.add("hd287-appbar");
      const brand = appbar.querySelector(".hd220-brand") || appbar.firstElementChild;
      if (brand && !brand.querySelector(".hd287-brand-mark")) {
        const eyebrow = brand.querySelector("span")?.textContent?.trim() || "HistoDaily";
        const title = brand.querySelector("h1")?.textContent?.trim() || "Bonjour";
        brand.innerHTML = `<div class="hd287-brand-mark" aria-hidden="true"><i></i><b>H</b></div><div class="hd287-brand-copy"><span>${eyebrow}</span><h1>${title}</h1></div>`;
      }
      const stats = appbar.querySelector(".hd220-head-metrics, .hd219-quick-stats");
      if (stats && !stats.querySelector(".hd287-date")) {
        const date = document.createElement("div");
        date.className = "hd287-date";
        date.setAttribute("aria-label", "Date du jour");
        date.innerHTML = dayStamp();
        stats.prepend(date);
      }
    }

    const zone = home.querySelector(".hd222-worlds, .hd219-domain-zone");
    if (zone) {
      zone.classList.add("hd287-domain-zone");
      const zoneTitle = zone.querySelector(".hd222-section-cap, .hd219-zone-title");
      if (zoneTitle) {
        const active = safe(() => activeDisciplineId(), "history");
        const label = safe(() => disciplineById(active)?.title, "Univers");
        zoneTitle.innerHTML = `<span>Changer d’univers</span><b>${label}</b>`;
      }
      zone.querySelector(".hd222-world-switcher, .hd219-disciplines")?.classList.add("hd287-disciplines");
    }

    const expedition = home.querySelector(".hd222-expedition, .hd219-expedition");
    if (expedition) {
      expedition.classList.add("hd287-expedition");
      const stageText = expedition.querySelector(".hd220-expedition-top > b, :scope > header > b")?.textContent?.trim() || "1/3";
      const stage = Number(stageText.match(/\d+/)?.[0]) || 1;
      expedition.dataset.hd287Stage = String(stage);
      if (!expedition.querySelector(".hd287-atmosphere")) {
        expedition.insertAdjacentHTML("afterbegin", `<div class="hd287-atmosphere" aria-hidden="true"><i></i><i></i><i></i></div>`);
      }
      expedition.querySelector(".hd222-expedition-art, .hd219-expedition-art")?.classList.add("hd287-expedition-art");
      expedition.querySelector(".hd222-expedition-copy, .hd219-expedition-copy")?.classList.add("hd287-expedition-copy");
      const primary = expedition.querySelector(".hd222-expedition-action > button, .hd219-primary");
      if (primary) {
        primary.classList.add("hd287-primary");
        const arrow = primary.querySelector("b");
        if (arrow) arrow.textContent = "↗";
      }
      const track = expedition.querySelector(".hd220-route, .hd219-track");
      const action = expedition.querySelector(".hd222-expedition-action, .hd219-expedition-meta");
      track?.classList.add("hd287-track");
      action?.classList.add("hd287-expedition-meta");
      if (track && action && track.nextElementSibling === action) track.before(action);
    }

    const progress = home.querySelector(".hd222-progress-strip, .hd219-progress-card");
    if (progress) {
      progress.classList.add("hd287-progress-card");
      const ratio = progress.querySelector(".hd222-progress-title em")?.textContent?.trim() || "0/0";
      const [done, total] = ratio.split("/").map(Number);
      const widthText = progress.querySelector(":scope > i > em")?.style?.width || progress.querySelector(".hd219-progress-head > b")?.textContent || "0%";
      const percent = Math.max(0, Math.min(100, Number(String(widthText).replace(/\D/g, "")) || (total ? Math.round(done / total * 100) : 0)));
      progress.style.setProperty("--hd287-progress", `${percent * 3.6}deg`);
      if (!progress.querySelector(".hd287-progress-ring")) {
        progress.insertAdjacentHTML("afterbegin", `<div class="hd287-progress-ring" aria-hidden="true"><span>${percent}<small>%</small></span></div>`);
      }
    }

    const nextSection = home.querySelector(".hd222-next, .hd219-home-cards");
    const cards = nextSection?.querySelector(".hd222-next-grid") || nextSection;
    if (nextSection) {
      nextSection.classList.add("hd287-next-section");
      const cap = nextSection.querySelector(".hd222-section-cap");
      if (cap) cap.innerHTML = `<div><span>Après l’expédition</span><h2>Continue à ton rythme</h2></div><i aria-hidden="true"></i>`;
    }
    if (cards) {
      cards.classList.add("hd287-home-cards");
      [...cards.querySelectorAll(".hd220-next-card, .hd219-learning-card")].forEach((card, index) => {
        card.classList.add("hd287-learning-card");
        card.style.setProperty("--hd287-order", index);
        if (!card.querySelector(".hd287-card-number")) card.insertAdjacentHTML("afterbegin", `<span class="hd287-card-number">0${index + 1}</span>`);
      });
    }

    shell.querySelector(".bottom-nav")?.classList.add("hd287-bottom-nav");
  }

  function enhanceMystery(){
    const shell = document.querySelector(".app-shell.tab-mystery");
    const card = shell?.querySelector(".mystery-card");
    if (!shell || !card || card.dataset.hd287 === "1") return;
    card.dataset.hd287 = "1";
    shell.classList.add("hd287-mystery-shell");
    card.classList.add("hd287-mystery-card");
    if (!card.querySelector(".hd287-case-rule")) card.insertAdjacentHTML("afterbegin", `<div class="hd287-case-rule" aria-hidden="true"><span>DOSSIER</span><i></i><b>CONFIDENTIEL</b></div>`);
    card.querySelector(".hd264-dashboard")?.classList.add("hd287-dashboard");
    card.querySelector(".hd264-clue-board")?.classList.add("hd287-clue-board");
    card.querySelector(".hd264-answer-zone")?.classList.add("hd287-answer-zone");
    shell.querySelector(".topbar")?.classList.add("hd287-mystery-topbar");
    shell.querySelector(".bottom-nav")?.classList.add("hd287-bottom-nav");
  }

  function enhanceCurrent(){
    enhanceHome();
    enhanceMystery();
  }

  try {
    const previousHome = typeof renderHome === "function" ? renderHome : null;
    if (previousHome) renderHome = function rc14RenderHome(){ const out = previousHome(); requestAnimationFrame(enhanceHome); return out; };
  } catch {}

  try {
    const previousMystery = typeof renderMystery === "function" ? renderMystery : null;
    if (previousMystery) renderMystery = function rc14RenderMystery(){ const out = previousMystery(); requestAnimationFrame(enhanceMystery); setTimeout(enhanceMystery, 70); return out; };
  } catch {}

  const app = document.getElementById("app");
  if (app && typeof MutationObserver === "function") {
    new MutationObserver(() => requestAnimationFrame(enhanceCurrent)).observe(app, { childList: true, subtree: true });
  }

  document.documentElement.classList.add("hd287-redesign");
  window.HistoDaily = { ...(window.HistoDaily || {}), visualVersion: VERSION };
  requestAnimationFrame(enhanceCurrent);
})();
