/* HistoDaily 1.0.0-rc.22.0 — cours interactifs Anglais & Philosophie. */
(() => {
  'use strict';

  const VERSION = '1.0.0-rc.22.0';
  const STORAGE_KEY = 'histodaily_rc20_course_interactions_v1';

  const LAB_BY_LESSON = {
    // Anglais — parcours initial
    'eng-context-inference': 'eng-lab-context',
    'eng-false-friends-core': 'eng-lab-actually',
    'eng-still-yet-already-even': 'eng-lab-yet',
    'eng-polite-register': 'eng-lab-register',
    'eng-phrasal-context': 'eng-lab-getby',
    'eng-paraphrase-repair': 'eng-lab-paraphrase',
    'eng-connectors-logic': 'eng-lab-concession',
    'eng-implicit-meaning': 'eng-lab-understatement',
    // Anglais — approfondissement RC19
    'eng-context-reference': 'eng-lab-reference',
    'eng-false-friends-second-wave': 'eng-lab-actually',
    'eng-small-words-just-quite': 'eng-lab-audio-barely',
    'eng-register-email-directness': 'eng-lab-audio-wondering',
    'eng-phrasal-get': 'eng-lab-audio-endedup',
    'eng-paraphrase-clarify': 'eng-lab-clarify',
    'eng-connectors-concession': 'eng-lab-concession',
    'eng-implicit-understatement': 'eng-lab-audio-mind',

    // Philosophie — parcours initial
    'philo-argument-thesis-objection': 'philo-lab-objection',
    'philo-fact-opinion-value': 'philo-lab-factvalue',
    'philo-socrates-questioning': 'philo-lab-counterexample',
    'philo-stoic-control': 'philo-lab-influence',
    'philo-descartes-doubt': 'philo-lab-cogito',
    'philo-hume-causality': 'philo-lab-induction',
    'philo-ethics-principles-consequences': 'philo-lab-ethics',
    'philo-social-contract-liberty': 'philo-lab-contract',
    // Philosophie — approfondissement RC19
    'philo-argument-validity': 'philo-lab-validity',
    'philo-distinction-necessary-sufficient': 'philo-lab-necessary',
    'philo-socrates-definition': 'philo-lab-counterexample',
    'philo-stoic-impressions': 'philo-lab-stoic',
    'philo-descartes-cogito': 'philo-lab-cogito',
    'philo-hume-induction': 'philo-lab-induction',
    'philo-ethics-frameworks': 'philo-lab-consequences',
    'philo-social-contract-comparison': 'philo-lab-generalwill'
  };

  const esc = value => {
    if (typeof escapeHtml === 'function') return escapeHtml(String(value ?? ''));
    return String(value ?? '').replace(/[&<>'"]/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[ch]));
  };
  const clean = value => String(value ?? '').replace(/\s+/g, ' ').trim();

  function readProgress() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch { return {}; }
  }

  function writeProgress(progress) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress || {})); } catch {}
  }

  function lessonProgress(lessonId) {
    const all = readProgress();
    return all[String(lessonId)] || { challenge: false, recall: false };
  }

  function markProgress(lessonId, field) {
    const all = readProgress();
    const key = String(lessonId);
    all[key] = { challenge: false, recall: false, ...(all[key] || {}), [field]: true };
    writeProgress(all);
    return all[key];
  }

  function disciplineIdFor(lesson) {
    try { return String(disciplineForLessonObject(lesson)?.id || ''); }
    catch { return ''; }
  }

  function labFor(lesson, disciplineId) {
    const labId = LAB_BY_LESSON[String(lesson?.id || '')];
    const labs = window.HD_DISCIPLINE_LABS?.[disciplineId];
    return Array.isArray(labs) ? labs.find(item => item.id === labId) || null : null;
  }

  function modelAnswer(lesson, content, lab, disciplineId) {
    const fromLab = clean(lab?.takeaway);
    if (fromLab) return fromLab;
    try {
      const values = typeof lessonTakeaways === 'function' ? lessonTakeaways(lesson, content) : [];
      const first = Array.isArray(values) ? values.find(Boolean) : null;
      const value = clean(typeof first === 'object' && first ? (first.text || first.value || first.label) : first);
      if (value) return value;
    } catch {}
    const express = Array.isArray(content?.express) ? clean(content.express[0]) : '';
    if (express) return express;
    return disciplineId === 'english'
      ? 'Le bon réflexe est de reconstruire le sens de la scène avant de traduire mot à mot.'
      : 'Le bon réflexe est de reformuler précisément le problème, puis de tester l’argument ou la distinction.';
  }

  function progressMarkup(lessonId, compact = false) {
    const p = lessonProgress(lessonId);
    const done = Number(Boolean(p.challenge)) + Number(Boolean(p.recall));
    return `<div class="hd20-active-progress${compact ? ' compact' : ''}" data-hd20-progress="${esc(lessonId)}" role="status" aria-label="${done} pause${done > 1 ? 's' : ''} active${done > 1 ? 's' : ''} terminée${done > 1 ? 's' : ''} sur 2">
      <span><i class="${p.challenge ? 'done' : ''}"></i><i class="${p.recall ? 'done' : ''}"></i></span>
      <b>${done}/2</b><small>pauses actives</small>
    </div>`;
  }

  function challengeMarkup(lesson, lab, disciplineId, placement = 'complete') {
    if (!lab) return '';
    const p = lessonProgress(lesson.id);
    const done = Boolean(p.challenge);
    const audio = disciplineId === 'english' && clean(lab.speak)
      ? `<button type="button" class="hd20-listen" data-hd20-speak="${esc(lab.speak)}" aria-label="Écouter la phrase en anglais">▶ Écouter</button>`
      : '';
    const choices = Array.isArray(lab.choices) ? lab.choices : [];
    return `<section class="hd20-checkpoint hd20-${esc(disciplineId)} ${done ? 'done' : ''}" data-hd20-card="challenge" data-hd20-lesson="${esc(lesson.id)}" data-hd20-lab="${esc(lab.id)}">
      <div class="hd20-checkpoint-head">
        <div><span class="hd20-kicker">${placement === 'express' ? 'Défi express' : 'Pause active · 1/2'}</span><h3>${esc(lab.title || 'Mets l’idée en pratique')}</h3></div>
        ${audio}
      </div>
      ${lab.context ? `<p class="hd20-context">${esc(lab.context)}</p>` : ''}
      <p class="hd20-prompt">${esc(lab.prompt || '')}</p>
      ${done
        ? `<div class="hd20-complete"><b>✓ Acquis</b><span>${esc(lab.takeaway || 'Tu as identifié le bon réflexe.')}</span></div>`
        : `<div class="hd20-choices" role="group" aria-label="Mini-défi">${choices.map((choice, index) => `<button type="button" data-hd20-choice="${index}" aria-pressed="false"><span>${String.fromCharCode(65 + index)}</span>${esc(choice.text)}</button>`).join('')}</div>
           <div class="hd20-feedback" data-hd20-feedback aria-live="polite"></div>`}
      <small class="hd20-no-grade">Sans note · tu peux essayer jusqu’à comprendre.</small>
    </section>`;
  }

  function recallMarkup(lesson, content, lab, disciplineId) {
    const p = lessonProgress(lesson.id);
    const done = Boolean(p.recall);
    const answer = modelAnswer(lesson, content, lab, disciplineId);
    const prompt = disciplineId === 'english'
      ? 'Sans revenir au paragraphe précédent, explique avec tes mots ce que tu dois comprendre ou faire dans ce type de situation. Tu peux écrire en français ou en anglais.'
      : 'Sans citer l’auteur, reformule avec tes mots la distinction, l’objection ou le mécanisme que tu viens de lire.';
    return `<section class="hd20-checkpoint hd20-recall hd20-${esc(disciplineId)} ${done ? 'done' : ''}" data-hd20-card="recall" data-hd20-lesson="${esc(lesson.id)}">
      <div class="hd20-checkpoint-head"><div><span class="hd20-kicker">Rappel actif · 2/2</span><h3>Dis-le avec tes mots</h3></div><span class="hd20-selfcheck">auto-vérification</span></div>
      <p class="hd20-prompt">${esc(prompt)}</p>
      ${done
        ? `<div class="hd20-model-answer"><b>Une formulation possible</b><p>${esc(answer)}</p><small>La tienne n’avait pas besoin d’être identique : vérifie surtout que l’idée centrale y était.</small></div>`
        : `<label class="hd20-recall-field"><span>Ta formulation</span><textarea rows="3" data-hd20-recall-input placeholder="Écris une phrase avant de comparer…"></textarea></label>
           <button type="button" class="hd20-reveal" data-hd20-reveal disabled>Comparer avec une formulation possible</button>
           <div class="hd20-model-answer" data-hd20-model hidden><b>Une formulation possible</b><p>${esc(answer)}</p><small>Ce n’est pas une correction mot à mot : compare le raisonnement, pas la formulation.</small></div>`}
    </section>`;
  }

  function injectAfter(node, html) {
    if (!node || !html) return;
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    node.after(template.content);
  }

  const previousRenderLessonText = typeof renderLessonText === 'function' ? renderLessonText : null;
  if (previousRenderLessonText) {
    renderLessonText = function hd20RenderInteractiveLesson(lesson, content) {
      let html = String(previousRenderLessonText(lesson, content) || '');
      const disciplineId = disciplineIdFor(lesson);
      if (!['english', 'philosophy'].includes(disciplineId)) return html;
      const lab = labFor(lesson, disciplineId);
      if (!lab) return html;
      const view = typeof lessonView === 'function' ? lessonView() : 'express';
      if (view === 'quiz') return html;

      const template = document.createElement('template');
      template.innerHTML = html;
      const root = template.content;

      if (view === 'express') {
        const next = root.querySelector('.lesson-next-choice');
        if (next) {
          const holder = document.createElement('div');
          holder.innerHTML = `${progressMarkup(lesson.id, true)}${challengeMarkup(lesson, lab, disciplineId, 'express')}`;
          while (holder.firstChild) next.before(holder.firstChild);
        }
      }

      if (view === 'complete') {
        const panel = root.querySelector('.complete-course-panel');
        const blocks = panel ? Array.from(panel.querySelectorAll(':scope > .deep-reading-block')) : [];
        if (panel && !panel.querySelector('.hd20-course-banner')) {
          const banner = document.createElement('div');
          banner.className = `hd20-course-banner hd20-${disciplineId}`;
          banner.innerHTML = `<div><span>Cours interactif</span><b>${disciplineId === 'english' ? 'Comprendre, essayer, reformuler' : 'Lire, tester, reformuler'}</b></div>${progressMarkup(lesson.id)}`;
          panel.prepend(banner);
        }
        const firstAnchor = blocks[Math.min(1, Math.max(0, blocks.length - 1))];
        const secondAnchor = blocks[Math.min(3, Math.max(0, blocks.length - 1))];
        if (firstAnchor) injectAfter(firstAnchor, challengeMarkup(lesson, lab, disciplineId, 'complete'));
        if (secondAnchor) injectAfter(secondAnchor, recallMarkup(lesson, content, lab, disciplineId));
      }

      return template.innerHTML;
    };
  }

  function updateProgressInCard(card, progress) {
    const lessonId = card?.dataset?.hd20Lesson;
    if (!lessonId) return;
    document.querySelectorAll('[data-hd20-progress]').forEach(root => {
      if (root.dataset.hd20Progress !== String(lessonId)) return;
      const done = Number(Boolean(progress.challenge)) + Number(Boolean(progress.recall));
      const dots = root.querySelectorAll('i');
      if (dots[0]) dots[0].classList.toggle('done', Boolean(progress.challenge));
      if (dots[1]) dots[1].classList.toggle('done', Boolean(progress.recall));
      const b = root.querySelector('b'); if (b) b.textContent = `${done}/2`;
      root.setAttribute('aria-label', `${done} pause${done > 1 ? 's' : ''} active${done > 1 ? 's' : ''} terminée${done > 1 ? 's' : ''} sur 2`);
    });
  }

  function speakEnglish(text, button) {
    const sentence = clean(text);
    if (!sentence) return;
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      const card = button?.closest('.hd20-checkpoint');
      const feedback = card?.querySelector('[data-hd20-feedback]');
      if (feedback) {
        feedback.className = 'hd20-feedback neutral';
        feedback.textContent = `Phrase : ${sentence}`;
      }
      return;
    }
    try {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = 'en-GB';
      utterance.rate = 0.9;
      const voices = speechSynthesis.getVoices?.() || [];
      const voice = voices.find(v => /^en-GB/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang));
      if (voice) utterance.voice = voice;
      button?.classList.add('speaking');
      utterance.onend = () => button?.classList.remove('speaking');
      utterance.onerror = () => button?.classList.remove('speaking');
      speechSynthesis.speak(utterance);
    } catch {}
  }

  document.addEventListener('click', event => {
    const listen = event.target.closest?.('[data-hd20-speak]');
    if (listen) {
      event.preventDefault();
      speakEnglish(listen.dataset.hd20Speak, listen);
      return;
    }

    const choiceButton = event.target.closest?.('[data-hd20-choice]');
    if (choiceButton) {
      event.preventDefault();
      const card = choiceButton.closest('.hd20-checkpoint');
      const disciplineId = card?.classList.contains('hd20-english') ? 'english' : 'philosophy';
      const lessonId = card?.dataset?.hd20Lesson;
      const labId = card?.dataset?.hd20Lab;
      const labs = window.HD_DISCIPLINE_LABS?.[disciplineId] || [];
      const lab = labs.find(item => item.id === labId);
      const index = Number(choiceButton.dataset.hd20Choice);
      const selected = lab?.choices?.[index];
      if (!card || !lessonId || !selected) return;
      card.querySelectorAll('[data-hd20-choice]').forEach(btn => {
        btn.classList.remove('wrong', 'correct');
        btn.setAttribute('aria-pressed', 'false');
      });
      choiceButton.classList.add(selected.correct ? 'correct' : 'wrong');
      choiceButton.setAttribute('aria-pressed', 'true');
      const feedback = card.querySelector('[data-hd20-feedback]');
      if (feedback) {
        feedback.className = `hd20-feedback ${selected.correct ? 'good' : 'bad'}`;
        feedback.innerHTML = `<b>${selected.correct ? 'Oui.' : 'Pas encore.'}</b> ${esc(selected.feedback || '')}`;
      }
      if (selected.correct) {
        const progress = markProgress(lessonId, 'challenge');
        card.classList.add('done');
        updateProgressInCard(card, progress);
        window.setTimeout(() => {
          const choices = card.querySelector('.hd20-choices');
          if (choices) choices.setAttribute('aria-label', 'Mini-défi réussi');
        }, 0);
      }
      return;
    }

    const reveal = event.target.closest?.('[data-hd20-reveal]');
    if (reveal) {
      event.preventDefault();
      const card = reveal.closest('.hd20-checkpoint');
      const lessonId = card?.dataset?.hd20Lesson;
      if (!card || !lessonId || reveal.disabled) return;
      const model = card.querySelector('[data-hd20-model]');
      if (model) model.hidden = false;
      reveal.textContent = 'Formulation affichée';
      reveal.disabled = true;
      card.classList.add('done');
      const progress = markProgress(lessonId, 'recall');
      updateProgressInCard(card, progress);
      model?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
    }
  });

  document.addEventListener('input', event => {
    const input = event.target.closest?.('[data-hd20-recall-input]');
    if (!input) return;
    const card = input.closest('.hd20-checkpoint');
    const button = card?.querySelector('[data-hd20-reveal]');
    if (button) button.disabled = clean(input.value).length < 8;
  });

  try {
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      courseInteractionsRC20: {
        enabled: true,
        disciplines: ['english', 'philosophy'],
        mappedLessons: Object.keys(LAB_BY_LESSON).length,
        interactionsPerCompleteCourse: 2,
        labForLesson(lessonId, disciplineId = '') {
          const labId = LAB_BY_LESSON[String(lessonId || '')];
          const discipline = disciplineId || (String(lessonId || '').startsWith('eng-') ? 'english' : String(lessonId || '').startsWith('philo-') ? 'philosophy' : '');
          const labs = window.HD_DISCIPLINE_LABS?.[discipline];
          return Array.isArray(labs) ? labs.find(item => item.id === labId) || null : null;
        },
        speakEnglish
      }
    };
  } catch {}
})();
