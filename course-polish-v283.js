/* HistoDaily 1.0 RC8 — course reader and quiz-result polish */
(() => {
  'use strict';

  const VERSION = '1.0.0-rc.15.1';
  let activeShell = null;
  let sectionObserver = null;
  let scrollFrame = 0;

  const esc = value => {
    if (typeof escapeHtml === 'function') return escapeHtml(String(value ?? ''));
    return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  };
  const clean = value => String(value ?? '').replace(/\s+/g, ' ').trim();

  function takeawayText(lesson, content) {
    const candidates = [];
    if (Array.isArray(content?.takeaways)) candidates.push(...content.takeaways);
    try {
      const generated = typeof lessonTakeaways === 'function' ? lessonTakeaways(lesson, content) : [];
      if (Array.isArray(generated)) candidates.push(...generated);
    } catch {}
    try {
      const facts = typeof lessonKeyFacts === 'function' ? lessonKeyFacts(lesson, content) : [];
      if (Array.isArray(facts)) candidates.push(...facts);
    } catch {}
    candidates.push(content?.hook, content?.express?.[0]);

    for (const item of candidates) {
      const label = clean(typeof item === 'object' && item ? item.label : '');
      const text = clean(typeof item === 'object' && item ? (item.text || item.value || '') : item);
      if (text.length >= 45) return `${label ? `${label} — ` : ''}${text}`;
    }
    return 'Le cours construit une réponse précise : retiens le mécanisme, pas seulement une date ou un nom.';
  }

  function quizSnapshot(lesson, content) {
    try {
      const items = typeof normalizeQuizPack === 'function' ? normalizeQuizPack(content?.quiz, lesson, content) : [];
      const progress = typeof quizProgressForLesson === 'function'
        ? quizProgressForLesson(lesson?.id, items.length)
        : { answeredCount: 0, correctCount: 0, threshold: Math.ceil(items.length * .8), passed: false };
      const total = Math.max(0, items.length);
      const answered = Number(progress?.answeredCount || 0);
      const correct = Number(progress?.correctCount || 0);
      const threshold = Number(progress?.threshold || Math.ceil(total * .8));
      return { total, answered, correct, threshold, passed: Boolean(progress?.passed), finished: total > 0 && answered >= total };
    } catch {
      return { total: 0, answered: 0, correct: 0, threshold: 0, passed: false, finished: false };
    }
  }

  function resultHeroMarkup(lesson, snapshot) {
    const percent = snapshot.total ? Math.round((snapshot.correct / snapshot.total) * 100) : 0;
    const wrong = Math.max(0, snapshot.total - snapshot.correct);
    const perfect = snapshot.passed && snapshot.correct === snapshot.total;
    const title = perfect ? 'Maîtrise parfaite' : snapshot.passed ? 'Cours validé' : 'Encore un passage';
    const copy = perfect
      ? 'Tu as relié toutes les idées sans erreur. Cette connaissance rejoint ton parcours.'
      : snapshot.passed
        ? 'Le raisonnement essentiel est acquis. Les corrections restent disponibles pour consolider les détails.'
        : `Il manque ${Math.max(1, snapshot.threshold - snapshot.correct)} bonne réponse pour valider. Relis uniquement les points signalés, puis retente.`;
    const seal = perfect ? '★★★' : snapshot.passed ? '★★☆' : '★☆☆';
    return `<section class="hd283-quiz-result-hero ${snapshot.passed ? 'good' : 'retry'}" aria-label="Résultat du quiz">
      <div class="hd283-result-seal" aria-label="${percent} pour cent"><strong>${percent}%</strong><span>${seal}</span></div>
      <div class="hd283-result-copy"><span class="card-label">Bilan de la révision</span><h2>${esc(title)}</h2><p>${esc(copy)}</p></div>
      <div class="hd283-result-metrics"><span><b>${snapshot.correct}/${snapshot.total}</b> bonnes réponses</span><span><b>${wrong}</b> point${wrong > 1 ? 's' : ''} à revoir</span><span><b>${snapshot.threshold}/${snapshot.total}</b> seuil de validation</span></div>
    </section>`;
  }

  const previousRenderLessonText = typeof renderLessonText === 'function' ? renderLessonText : null;
  if (previousRenderLessonText) {
    renderLessonText = function hd283RenderLessonText(lesson, content) {
      const view = typeof lessonView === 'function' ? lessonView() : 'express';
      let html = String(previousRenderLessonText(lesson, content) || '');
      const memory = takeawayText(lesson, content);

      if (view === 'express') {
        const card = `<aside class="hd283-memory-card"><span>La phrase à garder</span><p>${esc(memory)}</p></aside>`;
        if (!html.includes('hd283-memory-card')) {
          html = html.replace(/<section class="lesson-next-choice"/, `${card}<section class="lesson-next-choice"`);
        }
      }

      if (view === 'complete') {
        const blocks = Array.isArray(content?.complete) ? content.complete.filter(Boolean).length : 0;
        const guide = `<div class="hd283-reading-guide"><span>Lecture guidée</span><p>${blocks || 'Plusieurs'} parties courtes : avance à ton rythme, le sommaire reste accessible en haut du cours.</p></div>`;
        if (!html.includes('hd283-reading-guide')) {
          html = html.replace(/(<section class="complete-course-panel"[^>]*>)/, `$1${guide}`);
        }
      }

      if (view === 'quiz') {
        const snapshot = quizSnapshot(lesson, content);
        html = html.replace(/class="quiz-section isolated-quiz final-quiz/, `class="quiz-section isolated-quiz final-quiz hd283-quiz-surface${snapshot.finished ? ' hd283-quiz-complete' : ''}`);
        if (snapshot.finished && !html.includes('hd283-quiz-result-hero')) {
          html = html.replace(/<section class="quiz-section/, `${resultHeroMarkup(lesson, snapshot)}<section class="quiz-section`);
        }
        html = html
          .replace(/<h2>Quiz terminé<\/h2>/g, '<h2>Corrections détaillées</h2>')
          .replace(/Réponds pour continuer\./g, 'Choisis une réponse pour afficher l’explication.')
          .replace(/Voir le bilan/g, 'Découvrir mon bilan');
      }
      return html;
    };
  }

  function progressValue(shell) {
    const article = shell?.querySelector('.hd214-reader-page,.lesson-full-page,.reading-card');
    if (!article) return 0;
    const rect = article.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const height = Math.max(article.scrollHeight, rect.height);
    const range = Math.max(1, height - window.innerHeight * .62);
    return Math.max(0, Math.min(100, ((window.scrollY - top + window.innerHeight * .22) / range) * 100));
  }

  function updateReadingProgress() {
    scrollFrame = 0;
    const shell = activeShell;
    const bar = shell?.querySelector('.hd283-reader-progress i');
    const root = shell?.querySelector('.hd283-reader-progress');
    if (!bar || !root) return;
    const value = Math.round(progressValue(shell));
    bar.style.width = `${value}%`;
    root.setAttribute('aria-valuenow', String(value));
    const valueNode = root.querySelector('b');
    if (valueNode) valueNode.textContent = `${value}%`;
  }

  function scheduleProgress() {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateReadingProgress);
  }

  function installSectionObserver(shell) {
    sectionObserver?.disconnect?.();
    sectionObserver = null;
    const sections = Array.from(shell.querySelectorAll('.deep-reading-block'));
    if (!sections.length || typeof IntersectionObserver !== 'function') return;
    sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sections.forEach(section => section.classList.toggle('hd283-current-section', section === entry.target));
          const current = Number(entry.target.dataset.hd214Section || sections.indexOf(entry.target) + 1);
          const label = shell.querySelector('.hd283-reader-progress small');
          if (label) label.textContent = `Partie ${current}/${sections.length}`;
        }
      });
    }, { rootMargin: '-28% 0px -58% 0px', threshold: .01 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  function enhanceLesson(root = document) {
    const shell = root.querySelector?.('.app-shell.tab-lesson');
    if (!shell) {
      activeShell = null;
      sectionObserver?.disconnect?.();
      return;
    }
    activeShell = shell;
    shell.classList.add('hd283-course-shell');
    const view = ['express', 'complete', 'quiz'].includes(state?.lessonView) ? state.lessonView : 'express';
    shell.dataset.hd283View = view;

    const header = shell.querySelector('.hd214-reader-header,.lesson-full-topbar');
    if (header && view !== 'quiz' && !header.querySelector('.hd283-reader-progress')) {
      header.insertAdjacentHTML('beforeend', `<div class="hd283-reader-progress" role="progressbar" aria-label="Progression dans la lecture" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span><i></i></span><small>${view === 'complete' ? 'Début du cours' : 'Lecture express'}</small><b>0%</b></div>`);
    }

    shell.querySelectorAll('.deep-reading-block').forEach((section, index) => {
      section.style.setProperty('--hd283-section-order', String(index));
    });
    shell.querySelectorAll('.quiz-choice').forEach(button => button.setAttribute('aria-live', 'off'));
    const result = shell.querySelector('.hd283-quiz-result-hero');
    if (result) result.setAttribute('tabindex', '-1');

    installSectionObserver(shell);
    scheduleProgress();
  }

  function run() {
    try { enhanceLesson(); } catch (error) { try { console.warn('HistoDaily RC8 course polish', error); } catch {} }
  }

  window.addEventListener('scroll', scheduleProgress, { passive: true });
  window.addEventListener('resize', scheduleProgress, { passive: true });
  const observer = new MutationObserver(() => window.requestAnimationFrame(run));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('DOMContentLoaded', run, { once: true });
  window.setTimeout(run, 0);

  window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, coursePolish283: true };
})();
