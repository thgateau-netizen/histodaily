/* HistoDaily beta 178 — dernier indice = cours correspondant. */
(function histodailyBeta178CourseRescue(){
  const VERSION = "1.0.0-beta.178";
  const RESCUE_SCORE = 12;
  state.mysteryCourseRescue = (state.mysteryCourseRescue && typeof state.mysteryCourseRescue === "object") ? state.mysteryCourseRescue : {};

  function rescueEntry(mysteryId) {
    return state.mysteryCourseRescue?.[mysteryId] || null;
  }
  function rescueLesson(mystery) {
    const direct = relatedLessonForMystery(mystery);
    return direct && isCuratedLesson(direct) ? direct : null;
  }
  function pendingForLesson(lessonId) {
    return Object.entries(state.mysteryCourseRescue || {}).find(([mysteryId, entry]) =>
      entry?.active && !entry?.completed && String(entry.lessonId) === String(lessonId) && !mysterySolved(mysteryId)
    ) || null;
  }

  function applyCourseRescueDailyReward(mysteryId, score) {
    const dayKey = localDayKey();
    if (!isTodayMystery(mysteryId) || state.dailyClaims?.[dayKey]) return null;
    const previousKey = state.lastDailySolvedKey;
    const diff = dayDiff(previousKey, dayKey);
    const nextStreak = previousKey ? (diff === 1 ? (state.streak || 0) + 1 : diff === 0 ? (state.streak || 1) : 1) : 1;
    state.streak = nextStreak;
    state.lastDailySolvedKey = dayKey;
    const claim = { mysteryId, score, gems: 0, streak: nextStreak, courseRescue: true, at: Date.now() };
    state.dailyClaims = { ...(state.dailyClaims || {}), [dayKey]: claim };
    state.dailyHistory = { ...(state.dailyHistory || {}), [dayKey]: claim };
    state.achievements = { ...(state.achievements || {}) };
    if (nextStreak >= 3) state.achievements.streak3 = true;
    if (nextStreak >= 7) state.achievements.streak7 = true;
    return `Série ${nextStreak} jour${nextStreak > 1 ? "s" : ""} préservée · aucune gemme de résolution`;
  }

  const previousLessonLocked = lessonLockedByDailyMystery;
  lessonLockedByDailyMystery = function beta178LessonLockedByDailyMystery(lesson) {
    if (lesson?.id && pendingForLesson(lesson.id)) return false;
    return previousLessonLocked ? previousLessonLocked(lesson) : false;
  };

  const previousScoreBreakdown = mysteryScoreBreakdown;
  mysteryScoreBreakdown = function beta178MysteryScoreBreakdown(mysteryId) {
    const base = previousScoreBreakdown(mysteryId);
    const solved = state.solvedMysteries?.[mysteryId];
    const active = Boolean(rescueEntry(mysteryId)?.active);
    const throughCourse = Boolean(solved?.courseRescue || active);
    if (!throughCourse) return { ...base, courseRescue: false };
    return {
      ...base,
      courseRescue: true,
      rescue: true,
      rescuePenalty: Math.max(0, Number(base.score || 0) - RESCUE_SCORE),
      score: RESCUE_SCORE
    };
  };

  scoreBreakdownMarkup = function beta178ScoreBreakdownMarkup(mysteryId) {
    const b = mysteryScoreBreakdown(mysteryId);
    if (b.courseRescue) {
      return `<div class="score-breakdown beta178-rescue-breakdown"><span>3 indices utilisés</span><span>Cours de secours validé</span><strong>${RESCUE_SCORE} XP</strong></div>`;
    }
    return `<div class="score-breakdown"><span>Base ${b.base}</span><span>Indices -${b.hintPenalty}</span><span>Essais -${b.tryPenalty}</span><strong>${b.score} XP</strong></div>`;
  };

  function solveThroughCourse(mystery, lesson) {
    if (!mystery?.id || mysterySolved(mystery.id)) return;
    if (!lessonQuizState(lesson.id).passed) return;
    const isArchive = !isTodayMystery(mystery.id);
    const dailyReward = applyCourseRescueDailyReward(mystery.id, RESCUE_SCORE);
    state.solvedMysteries = {
      ...(state.solvedMysteries || {}),
      [mystery.id]: {
        at: Date.now(),
        tries: state.mysteryTries?.[mystery.id] || 0,
        hints: Math.max(3, state.seenHints?.[mystery.id] || 0),
        score: RESCUE_SCORE,
        difficulty: mystery.difficulty,
        daily: isTodayMystery(mystery.id),
        archive: isArchive,
        rescue: true,
        courseRescue: true,
        lessonId: lesson.id
      }
    };
    state.mysteryCourseRescue = {
      ...(state.mysteryCourseRescue || {}),
      [mystery.id]: {
        ...(rescueEntry(mystery.id) || {}),
        active: false,
        completed: true,
        lessonId: lesson.id,
        completedAt: Date.now()
      }
    };
    state.achievements = { ...(state.achievements || {}), firstMystery: true };
    if (mystery.difficulty === "expert") state.achievements.expertMystery = true;
    if (isArchive) state.achievements.firstArchive = true;
    state.rewardFeedback = {
      ...(state.rewardFeedback || {}),
      [mystery.id]: `${dailyReward || (isArchive ? "Archive terminée." : "Mystère terminé.")} · Sauvetage par le cours : ${RESCUE_SCORE} XP.`
    };
    if (state.mysteryFeedback) delete state.mysteryFeedback[mystery.id];
    awardXP(RESCUE_SCORE, "mystère sauvé par le cours");
    try { queueScoreSubmit(mystery.id); } catch {}
    setState({
      tab: "mystery",
      currentMysteryId: mystery.id,
      currentMysteryDiscipline: mysteryDisciplineId(mystery),
      currentDiscipline: mysteryDisciplineId(mystery)
    });
  }

  function startCourseRescue(mystery) {
    const lesson = rescueLesson(mystery);
    if (!lesson) {
      state.mysteryFeedback = {
        ...(state.mysteryFeedback || {}),
        [mystery.id]: "Le cours correspondant n’est pas encore publié. Le dernier recours reste indisponible pour ce dossier."
      };
      saveState();
      render();
      return;
    }
    const world = lessonWorld(lesson);
    const quizKey = String(lesson.id);
    const quizProgress = { ...(state.quizProgress || {}) };
    const quizFeedback = { ...(state.quizFeedback || {}) };
    const quizStep = { ...(state.quizStep || {}) };
    delete quizProgress[quizKey];
    delete quizFeedback[quizKey];
    delete quizStep[quizKey];
    state.mysteryCourseRescue = {
      ...(state.mysteryCourseRescue || {}),
      [mystery.id]: {
        active: true,
        completed: false,
        lessonId: lesson.id,
        requiresFreshQuiz: true,
        previouslyCompleted: lessonDone(lesson.id),
        startedAt: Date.now()
      }
    };
    state.mysteryFeedback = {
      ...(state.mysteryFeedback || {}),
      [mystery.id]: "Cours de secours ouvert. La série ne sera sauvée qu’après un nouveau quiz réussi."
    };
    setState({
      tab: "lesson",
      currentLessonId: lesson.id,
      currentDiscipline: mysteryDisciplineId(mystery),
      currentGroup: world.group || state.currentGroup,
      currentWorld: lessonWorldId(lesson.id),
      lessonView: "complete",
      lessonFocus: null,
      quizProgress,
      quizFeedback,
      quizStep
    });
  }

  function resumeCourseRescue(mystery) {
    const lesson = rescueLesson(mystery);
    if (!lesson) return;
    const world = lessonWorld(lesson);
    setState({
      tab: "lesson",
      currentLessonId: lesson.id,
      currentDiscipline: mysteryDisciplineId(mystery),
      currentGroup: world.group || state.currentGroup,
      currentWorld: lessonWorldId(lesson.id),
      lessonView: lessonDone(lesson.id) ? "complete" : "complete",
      lessonFocus: null
    });
  }

  function mysteryRescueMarkup(mystery) {
    const lesson = rescueLesson(mystery);
    const entry = rescueEntry(mystery.id);
    if (!lesson) {
      return `<section class="mystery-rescue-panel beta178-course-rescue unavailable"><div class="mystery-rescue-head"><span>📚 Dernier recours</span><strong>Cours en préparation</strong></div><p>Le cours correspondant n’est pas encore publié pour ce dossier.</p></section>`;
    }
    if (!entry?.active) {
      return `<section class="mystery-rescue-panel beta178-course-rescue">
        <div class="mystery-rescue-head"><span>📚 Dernier indice</span><strong>Apprendre plutôt que révéler</strong></div>
        <p>Ouvre le cours correspondant : <b>${escapeHtml(lesson.title)}</b>. La solution deviendra évidente, mais le mystère ne sera validé qu’après le quiz du cours.</p>
        <button type="button" class="wide mystery-rescue-open" data-start-course-rescue>Étudier le cours et sauver ma série</button>
        <p class="microcopy rescue-note">Récompense réduite à ${RESCUE_SCORE} XP. La série quotidienne peut être prolongée, mais le classement distingue clairement ce sauvetage d’une résolution normale.</p>
      </section>`;
    }
    return `<section class="mystery-rescue-panel beta178-course-rescue active">
      <div class="mystery-rescue-head"><span>📖 Cours de secours en cours</span><strong>${escapeHtml(lesson.title)}</strong></div>
      <p>Lis le cours complet puis réussis à nouveau son quiz, même si tu l’avais déjà validé auparavant. Le mystère sera alors sauvé automatiquement.</p>
      <button type="button" class="wide" data-resume-course-rescue>Reprendre le cours</button>
      <p class="microcopy rescue-note">Tant que ce nouveau quiz n’est pas réussi, la réponse directe est désactivée.</p>
    </section>`;
  }

  function injectMysteryCourseRescue() {
    const mystery = currentMystery();
    if (!mystery?.id || mysterySolved(mystery.id)) return;
    const maxHints = Math.min(3, (mystery.clues || []).length);
    const hints = Math.min(state.seenHints?.[mystery.id] || 0, maxHints);
    if (!maxHints || hints < maxHints) return;
    const card = document.querySelector(".mystery-card");
    if (!card || card.querySelector(".beta178-course-rescue")) return;
    card.querySelector("[data-hint]")?.setAttribute("hidden", "");
    const anchor = card.querySelector(".microcopy");
    if (!anchor) return;
    const wrapper = document.createElement("div");
    wrapper.className = "mystery-rescue-slot beta178-rescue-slot";
    wrapper.innerHTML = mysteryRescueMarkup(mystery);
    anchor.before(wrapper);

    const entry = rescueEntry(mystery.id);
    if (entry?.active) {
      const form = card.querySelector("[data-guess]");
      if (form) {
        form.hidden = true;
        form.setAttribute("aria-hidden", "true");
      }
    }
    wrapper.querySelector("[data-start-course-rescue]")?.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      startCourseRescue(mystery);
    });
    wrapper.querySelector("[data-resume-course-rescue]")?.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      resumeCourseRescue(mystery);
    });
  }

  function injectLessonRescueBanner() {
    const lesson = state.currentLessonId ? lessonById(state.currentLessonId) : null;
    if (!lesson?.id) return;
    const pending = pendingForLesson(lesson.id);
    if (!pending) return;
    const [mysteryId] = pending;
    const mystery = mysteryById(mysteryId);
    if (!mystery) return;
    const appRoot = document.getElementById("app");
    if (!appRoot || appRoot.querySelector(".beta178-lesson-rescue-banner")) return;
    const banner = document.createElement("section");
    banner.className = "card beta178-lesson-rescue-banner";
    banner.innerHTML = `<span class="card-label">📚 Cours de secours</span><h2>Ce cours remplace le dernier indice</h2><p>Lis le contenu puis réussis le quiz complet pour sauver le mystère <b>${escapeHtml(mystery.caseTitle || "du jour")}</b>. Récompense du mystère : ${RESCUE_SCORE} XP, sans gemme.</p><small>Le simple fait d’ouvrir ou de relire le cours ne valide rien, même si tu l’avais déjà terminé.</small>`;
    const header = appRoot.querySelector(".topbar");
    if (header) header.insertAdjacentElement("afterend", banner);
    else appRoot.prepend(banner);
  }

  const previousRenderMystery = renderMystery;
  renderMystery = function beta178RenderMystery() {
    previousRenderMystery();
    try { injectMysteryCourseRescue(); } catch (error) { try { console.warn("course rescue mystery", error); } catch {} }
  };

  const previousRenderLesson = renderLesson;
  renderLesson = function beta178RenderLesson() {
    previousRenderLesson();
    try { injectLessonRescueBanner(); } catch (error) { try { console.warn("course rescue lesson", error); } catch {} }
  };

  const previousHandleQuizChoice = handleQuizChoice;
  handleQuizChoice = function beta178HandleQuizChoice(lessonId, questionIndex, choiceIndex) {
    const result = previousHandleQuizChoice(lessonId, questionIndex, choiceIndex);
    setTimeout(() => {
      const pending = pendingForLesson(lessonId);
      if (!pending || !lessonQuizState(lessonId).passed) return;
      const [mysteryId] = pending;
      const mystery = mysteryById(mysteryId);
      const lesson = lessonById(lessonId);
      if (mystery && lesson) solveThroughCourse(mystery, lesson);
    }, 0);
    return result;
  };

  const previousCompleteLesson = completeLesson;
  completeLesson = function beta178CompleteLesson(lessonId) {
    const result = previousCompleteLesson(lessonId);
    setTimeout(() => {
      const pending = pendingForLesson(lessonId);
      if (!pending || !lessonQuizState(lessonId).passed) return;
      const [mysteryId] = pending;
      const mystery = mysteryById(mysteryId);
      const lesson = lessonById(lessonId);
      if (mystery && lesson) solveThroughCourse(mystery, lesson);
    }, 0);
    return result;
  };

  const style = document.createElement("style");
  style.id = "beta178-course-rescue-style";
  style.textContent = `
    .beta178-course-rescue{border:1px solid rgba(86,214,255,.35);background:linear-gradient(180deg,rgba(86,214,255,.12),rgba(255,255,255,.045));}
    .beta178-course-rescue.active,.beta178-lesson-rescue-banner{border-color:rgba(72,213,151,.42);background:linear-gradient(180deg,rgba(72,213,151,.14),rgba(255,255,255,.045));}
    .beta178-course-rescue button+button{margin-top:9px;}
    .beta178-lesson-rescue-banner{margin-bottom:14px;}
    .beta178-rescue-breakdown strong{color:#48d597;}
  `;
  if (!document.getElementById(style.id)) document.head.appendChild(style);

  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, mysteryCourseRescue: true, rescueScore: RESCUE_SCORE };
  } catch {}
})();
