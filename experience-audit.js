/* HistoDaily beta 183 — audit UX, accessibilité et fluidité. */
(function histodailyBeta183Audit(){
  "use strict";

  const VERSION = "1.0.0-beta.187";
  const FOLD_KEY = "histodaily_ui_profile_fold_beta183";
  const PLAN_KEY = "histodaily_ui_plan_expanded_beta183";
  const appRoot = document.getElementById("app");
  const announcer = document.getElementById("app-announcer");
  if (!appRoot) return;

  let scheduled = false;
  let lastRouteKey = "";
  let lastTab = "";
  let firstPass = true;
  let scrollSaveFrame = 0;

  const safeText = value => String(value ?? "").replace(/\s+/g, " ").trim();
  const readLocal = key => { try { return localStorage.getItem(key) || ""; } catch { return ""; } };
  const writeLocal = (key, value) => { try { localStorage.setItem(key, String(value)); } catch {} };


  function learnScrollKey() {
    try { return `histodaily_scroll_learn_${state?.currentDiscipline || "history"}_${state?.currentWorld || "all"}`; }
    catch { return "histodaily_scroll_learn"; }
  }

  function saveLearnScroll() {
    try {
      if (state?.tab !== "learn") return;
      sessionStorage.setItem(learnScrollKey(), String(Math.max(0, Math.round(window.scrollY || 0))));
    } catch {}
  }

  function restoreLearnScroll() {
    let top = 0;
    try { top = Math.max(0, Number(sessionStorage.getItem(learnScrollKey()) || 0)); } catch {}
    window.setTimeout(() => {
      try { window.scrollTo({ top, behavior: "auto" }); } catch { window.scrollTo(0, top); }
    }, 25);
    return top;
  }

  function mysteryDraftKey() {
    try { return `histodaily_mystery_draft_${state?.currentMysteryId || "daily"}`; }
    catch { return "histodaily_mystery_draft_daily"; }
  }

  function polishMystery(shell) {
    if (!shell?.classList.contains("tab-mystery")) return;
    const input = shell.querySelector("[data-guess-input]");
    if (!input) {
      try {
        const solved = state?.currentMysteryId && typeof mysterySolved === "function" && mysterySolved(state.currentMysteryId);
        if (solved) sessionStorage.removeItem(mysteryDraftKey());
      } catch {}
    } else {
      try {
        const draft = sessionStorage.getItem(mysteryDraftKey()) || "";
        if (!input.value && draft) {
          input.value = draft;
          input.setSelectionRange?.(draft.length, draft.length);
        }
      } catch {}
    }

    const card = shell.querySelector(".mystery-card");
    if (card) {
      const scoreExplain = card.querySelector(":scope > .score-explain");
      const scoreBreakdown = card.querySelector(":scope > .score-breakdown");
      if (scoreExplain && scoreBreakdown && !card.querySelector(":scope > .hd183-score-details")) {
        const details = document.createElement("details");
        details.className = "hd183-score-details";
        const max = safeText(scoreBreakdown.querySelector("strong")?.textContent || "barème");
        details.innerHTML = `<summary><span>Barème du score</span><b>${max}</b></summary><div class="hd183-score-content"></div>`;
        scoreExplain.insertAdjacentElement("beforebegin", details);
        const content = details.querySelector(".hd183-score-content");
        content.append(scoreExplain, scoreBreakdown);
      }
      const microcopy = card.querySelector(":scope > .microcopy");
      if (microcopy && !card.querySelector(":scope > .hd183-rules-details")) {
        const details = document.createElement("details");
        details.className = "hd183-rules-details";
        details.innerHTML = `<summary>Règles et récompenses</summary><div></div>`;
        microcopy.insertAdjacentElement("beforebegin", details);
        details.querySelector("div")?.appendChild(microcopy);
      }
    }

    const shelf = shell.querySelector(".archive-shelf");
    if (shelf) {
      const cards = Array.from(shelf.querySelectorAll(":scope > .mystery-mini"));
      const expanded = shelf.classList.contains("is-expanded");
      cards.forEach((archive, index) => archive.classList.toggle("hd183-archive-hidden", !expanded && index >= 3));
      if (cards.length > 3 && !shelf.querySelector("[data-hd183-archives-toggle]")) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "ghost wide hd183-archives-toggle";
        button.dataset.hd183ArchivesToggle = "1";
        button.setAttribute("aria-expanded", expanded ? "true" : "false");
        button.textContent = expanded ? "Réduire les archives" : `Voir les ${cards.length} archives`;
        shelf.appendChild(button);
      }
    }
  }

  function routeKey() {
    try {
      return [
        state?.tab || "home",
        state?.currentDiscipline || "",
        state?.currentWorld || "",
        state?.currentLessonId || "",
        state?.lessonView || "",
        state?.currentMysteryId || "",
        state?.rankScope || ""
      ].join("|");
    } catch { return document.querySelector(".app-shell")?.className || "screen"; }
  }

  function screenLabel() {
    let tab = "home";
    try { tab = state?.tab || "home"; } catch {}
    try {
      if (tab === "lesson") {
        const lesson = typeof lessonById === "function" ? lessonById(state?.currentLessonId) : null;
        return lesson?.title ? `Cours — ${safeText(lesson.title)}` : "Cours";
      }
      if (tab === "learn") {
        const discipline = typeof disciplineById === "function" ? disciplineById(state?.currentDiscipline) : null;
        return discipline?.title ? `Cours — ${safeText(discipline.title)}` : "Cours";
      }
      if (tab === "mystery") {
        const mystery = (typeof mysteryById === "function" && state?.currentMysteryId ? mysteryById(state.currentMysteryId) : null)
          || (typeof currentMystery === "function" ? currentMystery() : null);
        const title = mystery && typeof mysteryDisplayTitle === "function" ? mysteryDisplayTitle(mystery) : "Dossier du jour";
        return `Mystère — ${safeText(title || "Dossier du jour")}`;
      }
      if (tab === "rank") return "Classement";
      if (tab === "profile") return state?.pseudo ? `Profil — ${safeText(state.pseudo)}` : "Profil";
      if (tab === "publicProfile") return "Profil public";
      return "Accueil";
    } catch {
      return ({ home: "Accueil", learn: "Cours", lesson: "Cours", mystery: "Mystère", rank: "Classement", profile: "Profil", publicProfile: "Profil public" })[tab] || "HistoDaily";
    }
  }

  function announce(message) {
    if (!announcer || !message) return;
    announcer.textContent = "";
    window.setTimeout(() => { announcer.textContent = message; }, 20);
  }

  function updateDocumentTitle() {
    const label = screenLabel();
    document.title = label === "Accueil" ? "HistoDaily" : `${label} · HistoDaily`;
  }

  function polishNavigation(shell) {
    const nav = shell?.querySelector(".bottom-nav");
    if (!nav) return;

    // Le mystère reste le cœur de l’accueil : un cinquième onglet répétait la même entrée.
    nav.querySelector('[data-tab="mystery"]')?.remove();
    nav.classList.add("hd183-bottom-nav");

    const currentTab = (() => { try { return state?.tab || "home"; } catch { return "home"; } })();
    nav.querySelectorAll("[data-tab]").forEach(button => {
      const active = button.dataset.tab === currentTab || (currentTab === "mystery" && button.dataset.tab === "home");
      button.classList.toggle("active", active);
      button.setAttribute("aria-current", active ? "page" : "false");
      button.setAttribute("type", "button");
    });
  }

  function lessonProgress() {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    return Math.max(0, Math.min(1, window.scrollY / max));
  }

  function updateLessonProgress() {
    const bar = document.querySelector(".hd183-reading-progress > i");
    if (bar) bar.style.transform = `scaleX(${lessonProgress()})`;
    const topbar = document.querySelector(".lesson-full-topbar");
    if (topbar) topbar.classList.toggle("is-compact", window.scrollY > 70);
  }

  function polishLesson(shell) {
    if (!shell?.classList.contains("tab-lesson")) return;
    const topbar = shell.querySelector(".lesson-full-topbar");
    const panel = shell.querySelector(".lesson-choice-panel");
    if (!topbar || !panel) return;

    const back = topbar.querySelector("button[data-back-learn]");
    back?.setAttribute("aria-label", "Retour au parcours");
    back?.setAttribute("title", "Retour au parcours");

    // Les onglets sont déplacés dans l’en-tête : ils restent accessibles sans répéter une grosse carte.
    const tabs = panel.querySelector(".lesson-view-tabs");
    if (tabs && !topbar.querySelector(".hd183-lesson-tabs")) {
      tabs.classList.add("hd183-lesson-tabs");
      topbar.appendChild(tabs);
    }
    topbar.querySelectorAll("[data-lesson-view]").forEach(button => {
      const active = button.classList.contains("active");
      button.setAttribute("aria-current", active ? "step" : "false");
      button.setAttribute("type", "button");
    });
    panel.classList.add("hd183-format-summary");

    if (!topbar.querySelector(".hd183-reading-progress")) {
      const progress = document.createElement("span");
      progress.className = "hd183-reading-progress";
      progress.setAttribute("aria-hidden", "true");
      progress.innerHTML = "<i></i>";
      topbar.appendChild(progress);
    }
    updateLessonProgress();
  }

  function planIsComplete(plan) {
    if (!plan) return false;
    const title = safeText(plan.querySelector(".beta180-plan-head h2")?.textContent);
    return /^3\s*\/\s*3/.test(title) || plan.querySelectorAll(".beta180-plan-steps .done").length >= 3;
  }

  function polishHome(shell) {
    if (!shell?.classList.contains("tab-home")) return;
    const plan = shell.querySelector(".beta180-daily-plan");
    if (plan) {
      const steps = Array.from(plan.querySelectorAll(".beta180-plan-steps button span"));
      const compactLabels = ["Mystère", "Un cours", safeText(steps[2]?.textContent).toLowerCase().includes("erreur") ? "Réviser" : "2e cours"];
      steps.forEach((span, index) => {
        const textNode = Array.from(span.childNodes).find(node => node.nodeType === Node.TEXT_NODE && safeText(node.textContent));
        if (textNode && compactLabels[index]) textNode.textContent = compactLabels[index];
      });
    }
    if (plan && planIsComplete(plan)) {
      plan.classList.add("hd183-plan-complete");
      const expanded = readLocal(PLAN_KEY) === "1";
      plan.classList.toggle("is-expanded", expanded);
      if (!plan.querySelector("[data-hd183-plan-toggle]")) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "ghost mini-button hd183-plan-toggle";
        button.dataset.hd183PlanToggle = "1";
        button.setAttribute("aria-expanded", expanded ? "true" : "false");
        button.textContent = expanded ? "Réduire" : "Détails";
        plan.querySelector(".beta180-plan-head")?.appendChild(button);
      }
    }

    shell.querySelectorAll("[role='button'][tabindex='0']").forEach(card => {
      if (!card.hasAttribute("aria-label")) {
        const label = safeText(card.querySelector("h2,strong")?.textContent);
        if (label) card.setAttribute("aria-label", label);
      }
    });
  }

  function bindProfileFold(fold) {
    if (!fold || fold.dataset.hd183Bound === "1") return;
    fold.dataset.hd183Bound = "1";
    fold.setAttribute("name", "histodaily-profile-sections");
    const id = fold.dataset.beta182Fold || "";
    const saved = readLocal(FOLD_KEY);
    fold.open = Boolean(saved && saved === id);
    fold.addEventListener("toggle", () => {
      if (!fold.open) {
        if (readLocal(FOLD_KEY) === id) writeLocal(FOLD_KEY, "");
        return;
      }
      document.querySelectorAll(".beta182-profile-fold[open]").forEach(other => {
        if (other !== fold) other.open = false;
      });
      writeLocal(FOLD_KEY, id);
    });
  }

  function polishLearn(shell) {
    if (!shell?.classList.contains("tab-learn")) return;
    const hubTitle = shell.querySelector(".beta181-learning-hub > .section-title-row h2");
    if (hubTitle) hubTitle.textContent = "Progression";
    shell.querySelector(".beta181-learning-hub > .section-title-row .card-label")?.classList.add("hd183-visually-redundant");
  }

  function polishProfile(shell) {
    if (!shell?.classList.contains("tab-profile")) return;
    shell.querySelectorAll(".beta182-profile-fold").forEach(bindProfileFold);

    const settingsFold = shell.querySelector('[data-beta182-fold="settings"] .beta182-fold-content');
    const support = shell.querySelector(":scope > .beta148-support-card");
    if (settingsFold && support) settingsFold.appendChild(support);

    const achievements = shell.querySelector(":scope > .achievement-grid");
    if (achievements && !shell.querySelector(":scope > .hd183-achievement-card")) {
      const wrapper = document.createElement("section");
      wrapper.className = "card hd183-achievement-card";
      wrapper.innerHTML = `<div class="section-title-row"><div><span class="card-label">Succès</span><h2>Étapes marquantes</h2></div><small>${achievements.querySelectorAll(".achievement").length}</small></div>`;
      wrapper.appendChild(achievements);
      const collections = shell.querySelector(":scope > .beta179-profile-collections");
      if (collections) collections.insertAdjacentElement("afterend", wrapper);
      else shell.querySelector(".bottom-nav")?.insertAdjacentElement("beforebegin", wrapper);
    }
  }

  function polishRank(shell) {
    if (!shell?.classList.contains("tab-rank")) return;
    shell.querySelectorAll("[data-rank-scope]").forEach(button => {
      button.setAttribute("aria-pressed", button.classList.contains("active") ? "true" : "false");
      button.setAttribute("type", "button");
    });
    const backend = shell.querySelector(":scope > .social-backend");
    if (backend && !shell.querySelector(":scope > .hd183-rank-sync")) {
      const details = document.createElement("details");
      details.className = "card hd183-rank-sync";
      details.innerHTML = `<summary><span>Multijoueur et synchronisation</span><small>Voir l’état</small></summary><div class="hd183-rank-sync-content"></div>`;
      const leaderboard = shell.querySelector(":scope > .leaderboard");
      if (leaderboard) leaderboard.insertAdjacentElement("afterend", details);
      else backend.insertAdjacentElement("beforebegin", details);
      backend.classList.remove("card");
      details.querySelector(".hd183-rank-sync-content")?.appendChild(backend);
    }
  }

  function polishSemantics(shell) {
    if (!shell) return;
    shell.id = "main-content";
    shell.setAttribute("role", "main");
    shell.setAttribute("tabindex", "-1");
    shell.querySelectorAll("button:not([type])").forEach(button => { if (!button.closest("form")) button.setAttribute("type", "button"); });
    shell.querySelectorAll("details > summary").forEach(summary => {
      summary.setAttribute("aria-label", safeText(summary.textContent));
    });
  }

  function manageRouteChange(shell) {
    const key = routeKey();
    updateDocumentTitle();
    if (key === lastRouteKey) return;
    const previousTab = lastTab;
    let currentTab = "home";
    try { currentTab = state?.tab || "home"; } catch {}
    lastRouteKey = key;
    lastTab = currentTab;

    if (!firstPass) {
      const isTyping = document.activeElement?.matches?.("input,textarea,select,[contenteditable='true']");
      if (!isTyping) {
        const restoringCourseList = currentTab === "learn" && previousTab === "lesson";
        if (restoringCourseList) restoreLearnScroll();
        else { try { window.scrollTo({ top: 0, behavior: "auto" }); } catch { window.scrollTo(0, 0); } }
        const heading = shell?.querySelector("h1") || shell?.querySelector("h2");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
          window.setTimeout(() => { try { heading.focus({ preventScroll: true }); } catch {} }, restoringCourseList ? 55 : 20);
        }
      }
      announce(screenLabel());
    }
    firstPass = false;
  }

  function polish() {
    scheduled = false;
    const shell = appRoot.querySelector(".app-shell");
    if (!shell) return;
    document.body.classList.add("hd183-audited");
    try { window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, interfaceAudit: true, accessibilityPass: true, compactNavigation: true }; } catch {}
    polishSemantics(shell);
    polishNavigation(shell);
    polishHome(shell);
    polishLearn(shell);
    polishLesson(shell);
    polishMystery(shell);
    polishProfile(shell);
    polishRank(shell);
    manageRouteChange(shell);
  }

  function schedulePolish() {
    if (scheduled) return;
    scheduled = true;
    if (typeof requestAnimationFrame === "function") requestAnimationFrame(polish);
    else setTimeout(polish, 0);
  }

  appRoot.addEventListener("click", event => {
    const archiveToggle = event.target.closest?.("[data-hd183-archives-toggle]");
    if (archiveToggle) {
      event.preventDefault();
      event.stopPropagation();
      const shelf = archiveToggle.closest(".archive-shelf");
      if (!shelf) return;
      const expanded = !shelf.classList.contains("is-expanded");
      shelf.classList.toggle("is-expanded", expanded);
      shelf.querySelectorAll(".mystery-mini").forEach((card, index) => card.classList.toggle("hd183-archive-hidden", !expanded && index >= 3));
      archiveToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      archiveToggle.textContent = expanded ? "Réduire les archives" : `Voir les ${shelf.querySelectorAll(".mystery-mini").length} archives`;
      return;
    }

    const toggle = event.target.closest?.("[data-hd183-plan-toggle]");
    if (!toggle) return;
    event.preventDefault();
    event.stopPropagation();
    const plan = toggle.closest(".beta180-daily-plan");
    if (!plan) return;
    const expanded = !plan.classList.contains("is-expanded");
    plan.classList.toggle("is-expanded", expanded);
    toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    toggle.textContent = expanded ? "Réduire" : "Détails";
    writeLocal(PLAN_KEY, expanded ? "1" : "0");
  }, true);

  appRoot.addEventListener("input", event => {
    const input = event.target?.closest?.("[data-guess-input]");
    if (!input) return;
    try { sessionStorage.setItem(mysteryDraftKey(), input.value || ""); } catch {}
  }, true);

  window.addEventListener("scroll", () => {
    updateLessonProgress();
    if (scrollSaveFrame) return;
    scrollSaveFrame = requestAnimationFrame(() => { scrollSaveFrame = 0; saveLearnScroll(); });
  }, { passive: true });
  window.addEventListener("resize", updateLessonProgress, { passive: true });

  const observer = new MutationObserver(schedulePolish);
  observer.observe(appRoot, { childList: true, subtree: true });
  schedulePolish();

  try {
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      interfaceAudit: true,
      accessibilityPass: true,
      compactNavigation: true
    };
  } catch {}
})();
