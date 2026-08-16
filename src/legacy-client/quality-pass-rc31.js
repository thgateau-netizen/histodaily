/* HistoDaily RC31 — product quality pass: concise completion, mastery, next action. */
(function histodailyRC31QualityPass(){
  "use strict";

  const VERSION = "1.0.0-rc.35.0";
  const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const safe = (fn, fallback = null) => { try { const value = fn(); return value == null ? fallback : value; } catch { return fallback; } };

  function lessonDiscipline(lesson){
    return safe(() => lessonDisciplineId(lesson), safe(() => worldDisciplineId(lessonWorld(lesson)), String(state?.currentDiscipline || "history")));
  }

  function lessonList(disciplineId){
    const list = safe(() => curatedLessons(), []) || [];
    return list.filter(lesson => lessonDiscipline(lesson) === disciplineId);
  }

  function nextLesson(current){
    const disciplineId = lessonDiscipline(current);
    const list = lessonList(disciplineId);
    if (!list.length) return null;
    const currentIndex = list.findIndex(item => String(item.id) === String(current?.id));
    const after = currentIndex >= 0 ? list.slice(currentIndex + 1) : [];
    return after.find(item => !safe(() => lessonDone(item.id), false))
      || list.find(item => String(item.id) !== String(current?.id) && !safe(() => lessonDone(item.id), false))
      || null;
  }

  function quizSnapshot(lesson, content){
    const items = safe(() => normalizeQuizPack(content?.quiz, lesson, content), []) || [];
    const progress = safe(() => quizProgressForLesson(lesson.id, items.length), null)
      || safe(() => {
        const raw = lessonQuizState(lesson.id);
        const answeredCount = Object.keys(raw?.answers || {}).length;
        const correctCount = Object.values(raw?.correct || {}).filter(Boolean).length;
        const threshold = lessonQuizPassThreshold(items.length);
        return { ...raw, answeredCount, correctCount, threshold, passed: Boolean(raw?.passed || (answeredCount >= items.length && correctCount >= threshold)) };
      }, {});
    const total = items.length;
    const answered = Number(progress?.answeredCount ?? Object.keys(progress?.answers || {}).length ?? 0);
    const correct = Number(progress?.correctCount ?? Object.values(progress?.correct || {}).filter(Boolean).length ?? 0);
    const threshold = Number(progress?.threshold || Math.ceil(total * .8));
    const passed = Boolean(progress?.passed || (total > 0 && answered >= total && correct >= threshold));
    return { total, answered, correct, threshold, passed, finished: total > 0 && answered >= total };
  }

  function memoryStatus(lesson){
    const api = window.HistoDaily?.memory;
    const mastery = Number(safe(() => api?.lessonMastery?.(lesson), safe(() => lessonDone(lesson.id), false) ? 60 : 0)) || 0;
    const disciplineId = lessonDiscipline(lesson);
    const all = safe(() => api?.allReviewEntries?.(disciplineId), []) || [];
    const entries = all.filter(entry => String(entry?.lessonId || "") === String(lesson.id));
    const due = entries.filter(entry => Number(entry?.dueAt || 0) <= Date.now());
    const future = entries.filter(entry => Number(entry?.dueAt || 0) > Date.now()).sort((a,b) => Number(a.dueAt||0)-Number(b.dueAt||0));
    let label = "Mémoire en consolidation";
    let detail = "Les rappels espacés feront monter cette maîtrise dans le temps.";
    if (due.length) {
      label = `${due.length} rappel${due.length > 1 ? "s" : ""} disponible${due.length > 1 ? "s" : ""}`;
      detail = "Une courte révision suffit pour consolider ce cours.";
    } else if (future.length) {
      const when = safe(() => api?.dueLabel?.(future[0].dueAt), "plus tard");
      label = `Prochain rappel ${when}`;
      detail = "Pas besoin de relire maintenant : l’app te le reproposera au bon moment.";
    } else if (safe(() => state?.reviewSeededLessons?.[lesson.id], null)) {
      label = "Cours maîtrisé";
      detail = "Les rappels programmés pour ce cours sont tous validés.";
    }
    return { mastery: Math.max(0, Math.min(100, Math.round(mastery))), label, detail, due: due.length };
  }

  function completionMarkup(lesson, snapshot){
    const memory = memoryStatus(lesson);
    const next = nextLesson(lesson);
    const nextTitle = next ? String(next.title || "Cours suivant") : "";
    return `<section class="rc31-completion hd34-course-result" aria-label="Bilan et suite du parcours">
      <div class="rc31-completion-memory">
        <div class="rc31-mastery-ring" style="--rc31-mastery:${memory.mastery}" aria-label="Maîtrise ${memory.mastery} pour cent"><strong>${memory.mastery}%</strong><span>maîtrise</span></div>
        <div><span class="card-label">Bilan · ${snapshot.correct}/${snapshot.total}</span><h3>${snapshot.correct === snapshot.total ? "Parfaitement validé" : "Cours validé"}</h3><p><strong>${esc(memory.label)}.</strong> ${esc(memory.detail)}</p></div>
      </div>
      <div class="rc31-completion-actions">
        ${memory.due ? `<button type="button" data-rc31-review="${esc(lessonDiscipline(lesson))}">Réviser maintenant</button>` : ""}
        ${next ? `<button type="button" data-rc31-next="${esc(next.id)}">Continuer · ${esc(nextTitle)}</button>` : `<button type="button" data-rc31-home>Retour à l’accueil</button>`}
        ${next ? `<button type="button" class="ghost" data-rc31-home>Retour à l’accueil</button>` : ""}
        <button type="button" class="ghost rc31-secondary" data-reset-quiz>Refaire le quiz</button>
      </div>
    </section>`;
  }

  const previousRenderLessonText = typeof renderLessonText === "function" ? renderLessonText : null;
  if (previousRenderLessonText) {
    renderLessonText = function rc31RenderLessonText(lesson, content){
      let html = String(previousRenderLessonText(lesson, content) || "");
      const view = safe(() => lessonView(), String(state?.lessonView || "express"));
      if (view !== "quiz") return html;
      const snapshot = quizSnapshot(lesson, content);
      if (!snapshot.finished) return html;

      const template = document.createElement("template");
      template.innerHTML = html;
      const fragment = template.content;
      const hero = fragment.querySelector(".hd283-quiz-result-hero");
      const quiz = fragment.querySelector(".beta165-quiz-runner,.final-quiz");

      hero?.remove();

      if (quiz) {
        quiz.classList.add("rc31-quiz-finish");
        quiz.querySelector(".beta165-score-panel")?.remove();
        quiz.querySelector(".quiz-global-feedback")?.remove();
        const head = quiz.querySelector(".section-title-row");
        if (head) head.remove();
        const footer = quiz.querySelector(".quiz-footer");
        if (footer) footer.remove();
        if (snapshot.passed) {
          quiz.innerHTML = completionMarkup(lesson, snapshot);
        } else {
          quiz.innerHTML = `<section class="rc31-retry"><span class="card-label">À consolider</span><h3>${snapshot.correct}/${snapshot.total} bonnes réponses</h3><p>Il en faut ${snapshot.threshold}. Relis seulement les points qui t’ont posé problème, puis retente : inutile de repartir de zéro.</p><div class="rc31-completion-actions"><button type="button" data-lesson-view="express">Relire l’essentiel</button><button type="button" class="ghost" data-reset-quiz>Retenter le quiz</button></div></section>`;
        }
      }
      return template.innerHTML;
    };
  }

  function openLesson(id){
    const lesson = safe(() => lessonById(id), null);
    if (!lesson) return;
    const world = safe(() => lessonWorld(lesson), {}) || {};
    setState({ tab:"lesson", currentLessonId:lesson.id, currentDiscipline:lessonDiscipline(lesson), currentWorld:world.id || state.currentWorld, currentGroup:world.group || state.currentGroup, lessonView:"express", lessonFocus:null });
    window.scrollTo?.({ top:0, behavior:"smooth" });
  }

  function bind(root = document){
    root.querySelectorAll?.("[data-rc31-home]:not([data-rc31-bound])").forEach(button => {
      button.dataset.rc31Bound = "1";
      button.addEventListener("click", () => setState({ tab:"home", lessonFocus:null }));
    });
    root.querySelectorAll?.("[data-rc31-next]:not([data-rc31-bound])").forEach(button => {
      button.dataset.rc31Bound = "1";
      button.addEventListener("click", () => openLesson(button.dataset.rc31Next));
    });
    root.querySelectorAll?.("[data-rc31-review]:not([data-rc31-bound])").forEach(button => {
      button.dataset.rc31Bound = "1";
      button.addEventListener("click", () => safe(() => window.HistoDaily?.memory?.openReviewSession?.(button.dataset.rc31Review), null));
    });
  }

  const observer = new MutationObserver(() => window.requestAnimationFrame(() => bind(document)));
  observer.observe(document.documentElement, { childList:true, subtree:true });
  window.addEventListener("DOMContentLoaded", () => bind(document), { once:true });
  window.setTimeout(() => bind(document), 0);

  window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, qualityPassRC31: true };
})();
