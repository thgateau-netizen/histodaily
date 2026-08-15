/* HistoDaily RC22 — adaptive next action + visible mastery states. */
(function histodailyRC22AdaptivePath(){
  "use strict";

  const VERSION = "1.0.0-rc.22.0";
  const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));

  function memoryApi(){ return window.HistoDaily?.memory || null; }
  function activeId(){
    try { return activeDisciplineId(); }
    catch { return String(state?.currentDiscipline || "history"); }
  }
  function reviewsFor(disciplineId, scheduled = false){
    const api = memoryApi();
    try { return scheduled ? (api?.allReviewEntries?.(disciplineId) || []) : (api?.validReviewEntries?.(disciplineId) || []); }
    catch { return []; }
  }
  function lessonReviewCounts(lessonId){
    const id = String(lessonId || "");
    const all = reviewsFor("", true).filter(entry => String(entry?.lessonId || "") === id);
    const due = all.filter(entry => Number(entry?.dueAt || 0) <= Date.now());
    return { due: due.length, all: all.length };
  }
  function lessonState(lessonId){
    const id = String(lessonId || "");
    const counts = lessonReviewCounts(id);
    let done = false;
    try { done = Boolean(lessonDone(id)); } catch {}
    const answers = state?.quizProgress?.[id]?.answers || {};
    const started = !done && Object.keys(answers).length > 0;
    const seeded = Boolean(state?.reviewSeededLessons?.[id]);
    if (counts.due > 0) return { key:"due", label: counts.due > 1 ? `${counts.due} à revoir` : "À revoir", counts };
    if (done && counts.all > 0) return { key:"consolidating", label:"En consolidation", counts };
    if (done && seeded && counts.all === 0) return { key:"mastered", label:"Maîtrisé", counts };
    if (done) return { key:"validated", label:"Validé", counts };
    if (started) return { key:"started", label:"En cours", counts };
    return { key:"new", label:"À découvrir", counts };
  }
  function dueLabel(timestamp){
    try { return memoryApi()?.dueLabel?.(timestamp) || "plus tard"; }
    catch { return "plus tard"; }
  }

  function enhanceDisciplineButtons(root){
    root?.querySelectorAll?.("[data-home-discipline],[data-hd214-discipline]").forEach(button => {
      const id = button.dataset.homeDiscipline || button.dataset.hd214Discipline;
      if (!id) return;
      const due = reviewsFor(id).length;
      if (!due) return;
      const small = button.querySelector("small");
      if (small) {
        small.textContent = `${due} à revoir`;
        small.classList.add("hd22-due-count");
      }
      button.classList.add("hd22-has-review");
      button.setAttribute("aria-label", `${button.querySelector("b")?.textContent || id}, ${due} notion${due > 1 ? "s" : ""} à revoir`);
    });
  }

  function masteryFor(disciplineId){
    try { return memoryApi()?.disciplineMastery?.(disciplineId) || null; }
    catch { return null; }
  }

  function enhanceHome(){
    const root = document.querySelector(".app-shell.tab-home .hd219-home");
    if (!root || root.dataset.hd22Adaptive === "1") return;
    root.dataset.hd22Adaptive = "1";
    root.classList.add("hd22-home");
    const disciplineId = activeId();
    const discipline = (() => { try { return disciplineById(disciplineId); } catch { return { id:disciplineId, title:"ce domaine", accent:"#66d9ff" }; } })();
    const due = reviewsFor(disciplineId);
    const scheduled = reviewsFor(disciplineId, true);
    const mastery = masteryFor(disciplineId);

    enhanceDisciplineButtons(root);

    // One progress language: learned versus truly consolidated.
    const progressCard = root.querySelector(".hd219-progress-card");
    if (progressCard && mastery) {
      const label = progressCard.querySelector(".hd219-progress-head span");
      const percent = progressCard.querySelector(".hd219-progress-head>b");
      const bar = progressCard.querySelector(".hd219-progress-bar i");
      const foot = progressCard.querySelector(".hd219-progress-foot>span");
      if (label) label.textContent = "Maîtrise du domaine";
      if (percent) percent.textContent = `${mastery.score}%`;
      if (bar) bar.style.width = `${Math.max(3, Number(mastery.score || 0))}%`;
      if (foot) foot.textContent = `${mastery.done}/${mastery.total || 0} validés · ${mastery.mastered} maîtrisés`;
    }

    // Replace two competing cards with one adaptive action.
    const cards = root.querySelector(".hd219-home-cards");
    if (!cards) return;
    cards.classList.add("hd22-next-wrap");
    const resume = cards.querySelector(".hd219-resume");
    const discovery = cards.querySelector(".hd219-discovery");

    if (due.length) {
      cards.innerHTML = `<article class="hd219-learning-card hd22-memory-action" role="region" aria-label="Prochaine meilleure action">
        <div class="hd219-card-icon">↻</div>
        <div class="hd219-card-copy"><small>Prochaine meilleure action · mémoire</small><h3>${due.length} notion${due.length > 1 ? "s" : ""} à revoir</h3><p>Une séance courte maintenant évite de laisser retomber ce que tu viens d’apprendre.</p></div>
        <button type="button" data-hd22-review>Réviser · ${Math.min(5, due.length)} max</button>
      </article>`;
      cards.querySelector("[data-hd22-review]")?.addEventListener("click", () => {
        try { memoryApi()?.openReviewSession?.(disciplineId); } catch {}
      });
    } else {
      discovery?.remove();
      if (resume) {
        resume.classList.add("hd22-next-action");
        const small = resume.querySelector(".hd219-card-copy small");
        if (small) small.textContent = "Prochaine meilleure action";
      }
    }

    const progressButton = progressCard?.querySelector("[data-hd219-catalog]");
    if (progressButton) progressButton.textContent = "Voir le parcours";

    try {
      window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, adaptivePathRC22: true };
    } catch {}
  }

  function enhanceLearn(){
    const shell = document.querySelector(".app-shell.tab-learn");
    if (!shell || shell.dataset.hd22Adaptive === "1") return;
    shell.dataset.hd22Adaptive = "1";
    shell.classList.add("hd22-learn");
    const disciplineId = activeId();
    enhanceDisciplineButtons(shell);

    const mastery = masteryFor(disciplineId);
    const stats = shell.querySelector(".hd214-hero-stats");
    if (stats && mastery && !stats.querySelector(".hd22-mastered-stat")) {
      stats.insertAdjacentHTML("beforeend", `<span class="hd22-mastered-stat"><b>${Number(mastery.mastered || 0)}</b> maîtrisés</span>`);
    }

    shell.querySelectorAll(".hd214-lesson-row[data-hd214-open-lesson]").forEach(row => {
      const lessonId = row.dataset.hd214OpenLesson;
      const status = lessonState(lessonId);
      row.classList.add(`hd22-${status.key}`);
      const label = row.querySelector(".hd214-lesson-state b");
      if (label) label.textContent = status.label;
      const stateWrap = row.querySelector(".hd214-lesson-state");
      if (stateWrap) stateWrap.setAttribute("title", status.label);
      row.setAttribute("data-hd22-memory-state", status.key);
    });

    const filters = shell.querySelector(".hd214-lesson-filters");
    const visibleDue = shell.querySelectorAll(".hd214-lesson-row.hd22-due").length;
    if (filters && visibleDue && !filters.querySelector("[data-hd22-review-filter]")) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.hd22ReviewFilter = "1";
      button.textContent = `À revoir (${visibleDue})`;
      button.addEventListener("click", () => {
        const rows = [...shell.querySelectorAll(".hd214-lesson-row")];
        const active = button.classList.toggle("active");
        filters.querySelectorAll("button:not([data-hd22-review-filter])").forEach(item => item.classList.toggle("hd22-muted-filter", active));
        rows.forEach(row => { row.hidden = active && !row.classList.contains("hd22-due"); });
        button.textContent = active ? "Voir tous" : `À revoir (${visibleDue})`;
      });
      filters.appendChild(button);
    }
  }

  function enhanceProfile(){
    const shell = document.querySelector(".app-shell.tab-profile");
    if (!shell || shell.dataset.hd22Adaptive === "1") return;
    shell.dataset.hd22Adaptive = "1";
    const rows = shell.querySelectorAll(".beta179-mastery-row");
    rows.forEach(row => row.classList.add("hd22-mastery-row"));
  }

  const previousRenderHome = typeof renderHome === "function" ? renderHome : null;
  if (previousRenderHome) renderHome = function rc22RenderHome(){ const out = previousRenderHome(); enhanceHome(); return out; };
  const previousRenderLearn = typeof renderLearn === "function" ? renderLearn : null;
  if (previousRenderLearn) renderLearn = function rc22RenderLearn(){ const out = previousRenderLearn(); enhanceLearn(); return out; };
  const previousRenderProfile = typeof renderProfile === "function" ? renderProfile : null;
  if (previousRenderProfile) renderProfile = function rc22RenderProfile(){ const out = previousRenderProfile(); enhanceProfile(); return out; };

  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, adaptivePathRC22: true, lessonMemoryState: lessonState };
    window.setTimeout(() => {
      if (state?.tab === "home") enhanceHome();
      else if (state?.tab === "learn") enhanceLearn();
      else if (state?.tab === "profile") enhanceProfile();
    }, 0);
  } catch {}
})();
