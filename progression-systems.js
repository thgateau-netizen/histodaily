/* HistoDaily beta 181 — parcours guidé, objectifs hebdomadaires et mémorisation espacée. */
(function histodailyBeta181Progression(){
  "use strict";

  const VERSION = "1.0.0-beta.181";
  const SYNTHESIS_SIZE = 10;
  const SYNTHESIS_PASS = 8;
  const SYNTHESIS_XP = 100;
  const REVIEW_XP = 5;
  const DAILY_PLAN_XP = 25;
  const WEEKLY_REWARD_XP = 80;
  const WEEKLY_TARGETS = Object.freeze({ activeDays: 3, courses: 5, consolidation: 3 });
  const DAY_MS = 24 * 60 * 60 * 1000;
  const REVIEW_INTERVALS = [DAY_MS, 3 * DAY_MS];
  const REVIEW_MASTERY_STAGE = 3;

  if (typeof state !== "object" || typeof lessonById !== "function") return;

  state.reviewQueue = state.reviewQueue && typeof state.reviewQueue === "object" ? state.reviewQueue : {};
  state.reviewStats = state.reviewStats && typeof state.reviewStats === "object" ? state.reviewStats : { wrong: 0, corrected: 0 };
  state.synthesisPassed = state.synthesisPassed && typeof state.synthesisPassed === "object" ? state.synthesisPassed : {};
  state.synthesisAttempts = state.synthesisAttempts && typeof state.synthesisAttempts === "object" ? state.synthesisAttempts : {};
  state.collectionUnlocks = state.collectionUnlocks && typeof state.collectionUnlocks === "object" ? state.collectionUnlocks : {};
  state.dailyLearningLog = state.dailyLearningLog && typeof state.dailyLearningLog === "object" ? state.dailyLearningLog : {};
  state.weeklyLearningRewards = state.weeklyLearningRewards && typeof state.weeklyLearningRewards === "object" ? state.weeklyLearningRewards : {};
  state.progressionSystemsVersion = VERSION;

  const esc = value => typeof escapeHtml === "function" ? escapeHtml(String(value ?? "")) : String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const pct = (value, total) => total > 0 ? Math.max(0, Math.min(100, Math.round((Number(value) || 0) * 100 / total))) : 0;
  const now = () => Date.now();

  function currentDayKey() {
    try { return localDayKey(); }
    catch {
      const date = new Date();
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    }
  }

  function timestampDayKey(value) {
    const date = new Date(Number(value || 0));
    if (!Number.isFinite(date.getTime())) return "";
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function startOfLocalDay(value = now()) {
    const date = new Date(Number(value || now()));
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }

  function startOfWeek(value = now()) {
    try { return HISTODAILY_CORE.date.weekStart(value); }
    catch {
      const date = new Date(startOfLocalDay(value));
      const weekday = date.getDay() || 7;
      date.setDate(date.getDate() - weekday + 1);
      return date.getTime();
    }
  }

  function weekKey(value = now()) {
    return timestampDayKey(startOfWeek(value));
  }

  function weekDayKeys(value = now()) {
    const start = startOfWeek(value);
    return Array.from({ length: 7 }, (_, index) => timestampDayKey(start + index * DAY_MS));
  }

  function pruneWeeklyRewards(limit = 20) {
    const source = state.weeklyLearningRewards || {};
    const keys = Object.keys(source).sort().reverse();
    if (keys.length <= limit) return false;
    const keep = new Set(keys.slice(0, limit));
    state.weeklyLearningRewards = Object.fromEntries(Object.entries(source).filter(([key]) => keep.has(key)));
    return true;
  }

  function pruneDailyLearningLogs(limit = 45) {
    const source = state.dailyLearningLog || {};
    const keys = Object.keys(source).sort().reverse();
    if (keys.length <= limit) return false;
    const keep = new Set(keys.slice(0, limit));
    state.dailyLearningLog = Object.fromEntries(Object.entries(source).filter(([key]) => keep.has(key)));
    return true;
  }

  function todayLearningLog() {
    const key = currentDayKey();
    const existing = state.dailyLearningLog?.[key];
    const log = existing && typeof existing === "object" ? { ...existing } : {};
    log.courses = Array.isArray(log.courses) ? [...new Set(log.courses.map(String))] : [];
    log.reviewKeys = Array.isArray(log.reviewKeys) ? [...new Set(log.reviewKeys.map(String))] : [];
    log.syntheses = Array.isArray(log.syntheses) ? [...new Set(log.syntheses.map(String))] : [];
    if (!log.planType) {
      const due = validReviewEntries("").length;
      log.planType = due > 0 ? "review" : "course";
      log.reviewTarget = due > 0 ? Math.min(3, due) : 0;
      log.courseTarget = due > 0 ? 1 : 2;
      log.createdAt = now();
    }
    state.dailyLearningLog = { ...(state.dailyLearningLog || {}), [key]: log };
    return log;
  }

  function updateTodayLearningLog(patch = {}) {
    const key = currentDayKey();
    const log = { ...todayLearningLog(), ...patch };
    state.dailyLearningLog = { ...(state.dailyLearningLog || {}), [key]: log };
    persistSoon();
    return log;
  }

  function trackDailyActivity(type, payload = {}) {
    const log = todayLearningLog();
    if (type === "course" && payload.lessonId) {
      log.courses = [...new Set([...(log.courses || []), String(payload.lessonId)])];
    } else if (type === "review" && payload.key) {
      log.reviewKeys = [...new Set([...(log.reviewKeys || []), String(payload.key)])];
    } else if (type === "synthesis" && payload.key) {
      log.syntheses = [...new Set([...(log.syntheses || []), String(payload.key)])];
    }
    updateTodayLearningLog(log);
    reconcileDailyPlanBonus({ notify: true });
    reconcileWeeklyReward({ notify: true });
  }

  function mysteryCompletedToday() {
    const key = currentDayKey();
    if (state.dailyClaims?.[key] || state.dailyHistory?.[key]) return true;
    return Object.values(state.solvedMysteries || {}).some(entry => Boolean(entry?.daily) && timestampDayKey(entry?.at) === key);
  }

  function dailyPlanStatus() {
    const log = todayLearningLog();
    const mysteryDone = mysteryCompletedToday();
    const courseDone = (log.courses || []).length >= 1;
    const practiceDone = log.planType === "review"
      ? (log.reviewKeys || []).length >= Math.max(1, Number(log.reviewTarget || 1))
      : (log.courses || []).length >= Math.max(2, Number(log.courseTarget || 2));
    const done = [mysteryDone, courseDone, practiceDone].filter(Boolean).length;
    return { log, mysteryDone, courseDone, practiceDone, done, complete: done === 3 };
  }

  function reconcileDailyPlanBonus({ notify = false } = {}) {
    const status = dailyPlanStatus();
    if (!status.complete || status.log.bonusClaimed) return false;
    status.log.bonusClaimed = true;
    status.log.bonusAt = now();
    state.xp = Number(state.xp || 0) + DAILY_PLAN_XP;
    updateTodayLearningLog(status.log);
    if (notify) showProgressionToast(`Programme du jour terminé · +${DAILY_PLAN_XP} XP`);
    return true;
  }

  function mysteryCompletedOn(dayKey) {
    if (state.dailyClaims?.[dayKey] || state.dailyHistory?.[dayKey]) return true;
    return Object.values(state.solvedMysteries || {}).some(entry => Boolean(entry?.daily) && timestampDayKey(entry?.at) === dayKey);
  }

  function weeklyStatus(value = now()) {
    const days = weekDayKeys(value);
    const courseIds = new Set();
    const activeDays = new Set();
    let mysteryDays = 0;
    let consolidation = 0;
    days.forEach(day => {
      const log = state.dailyLearningLog?.[day];
      const courses = Array.isArray(log?.courses) ? log.courses.map(String) : [];
      const reviews = Array.isArray(log?.reviewKeys) ? log.reviewKeys.map(String) : [];
      const syntheses = Array.isArray(log?.syntheses) ? log.syntheses.map(String) : [];
      courses.forEach(id => courseIds.add(id));
      consolidation += reviews.length + syntheses.length * 2 + (log?.bonusClaimed ? 1 : 0);
      const mystery = mysteryCompletedOn(day);
      if (mystery) mysteryDays += 1;
      if (mystery || courses.length || reviews.length || syntheses.length || log?.bonusClaimed) activeDays.add(day);
    });
    const key = weekKey(value);
    const claimed = Boolean(state.weeklyLearningRewards?.[key]);
    const goals = {
      activeDays: { value: activeDays.size, target: WEEKLY_TARGETS.activeDays },
      courses: { value: courseIds.size, target: WEEKLY_TARGETS.courses },
      consolidation: { value: consolidation, target: WEEKLY_TARGETS.consolidation }
    };
    const complete = Object.values(goals).every(goal => goal.value >= goal.target);
    return { key, days, activeDays: activeDays.size, mysteryDays, courseIds: [...courseIds], consolidation, goals, complete, claimed };
  }

  function reconcileWeeklyReward({ notify = false } = {}) {
    const status = weeklyStatus();
    if (!status.complete || status.claimed) return false;
    state.weeklyLearningRewards = {
      ...(state.weeklyLearningRewards || {}),
      [status.key]: { at: now(), xp: WEEKLY_REWARD_XP, activeDays: status.activeDays, courses: status.courseIds.length, consolidation: status.consolidation }
    };
    state.xp = Number(state.xp || 0) + WEEKLY_REWARD_XP;
    persistSoon();
    if (notify) showProgressionToast(`Objectif hebdomadaire terminé · +${WEEKLY_REWARD_XP} XP`);
    return true;
  }

  function persistSoon() {
    try { queueSaveState?.(80); } catch { try { saveState?.(); } catch {} }
  }

  function disciplineLessons(disciplineId) {
    try { return (lessonsForDiscipline?.(disciplineId) || []).filter(isCuratedLesson); }
    catch { return []; }
  }

  function lessonDisciplineId(lesson) {
    try { return worldDisciplineId(lessonWorld(lesson)); }
    catch { return "history"; }
  }

  function reviewKey(lessonId, questionIndex) {
    return `${String(lessonId)}::${Number(questionIndex)}`;
  }

  function validReviewEntries(disciplineId = "", { includeScheduled = false } = {}) {
    const queue = state.reviewQueue || {};
    const valid = [];
    let cleaned = false;
    Object.entries(queue).forEach(([key, rawEntry]) => {
      const entry = rawEntry && typeof rawEntry === "object" ? rawEntry : {};
      const lesson = lessonById(entry?.lessonId);
      if (!lesson || !Number.isInteger(Number(entry?.questionIndex))) {
        delete queue[key];
        cleaned = true;
        return;
      }
      if (disciplineId && lessonDisciplineId(lesson) !== disciplineId) return;
      const dueAt = Number(entry.dueAt || 0);
      if (!includeScheduled && dueAt > now()) return;
      valid.push({ key, ...entry, stage: Math.max(0, Number(entry.stage || 0)), dueAt, lesson });
    });
    if (cleaned) persistSoon();
    return valid.sort((a, b) => Number(a.dueAt || 0) - Number(b.dueAt || 0) || Number(b.wrongCount || 1) - Number(a.wrongCount || 1) || Number(a.lastWrongAt || 0) - Number(b.lastWrongAt || 0));
  }

  function allReviewEntries(disciplineId = "") {
    return validReviewEntries(disciplineId, { includeScheduled: true });
  }

  function nextScheduledReview(disciplineId = "") {
    return allReviewEntries(disciplineId).filter(entry => Number(entry.dueAt || 0) > now()).sort((a, b) => Number(a.dueAt || 0) - Number(b.dueAt || 0))[0] || null;
  }

  function dueLabel(timestamp) {
    const diff = Math.max(0, Number(timestamp || 0) - now());
    if (diff < 60 * 60 * 1000) return "dans moins d’une heure";
    const days = Math.ceil(diff / DAY_MS);
    return days <= 1 ? "demain" : `dans ${days} jours`;
  }

  function applyReviewAnswer(entryKey, correct) {
    const current = state.reviewQueue?.[entryKey];
    if (!current) return { ok: false, correct: Boolean(correct), mastered: false, nextDueAt: 0, memoryText: "" };
    if (!correct) {
      state.reviewQueue[entryKey] = { ...current, stage: 0, dueAt: now(), wrongCount: Number(current.wrongCount || 1) + 1, lastWrongAt: now(), lastResult: "wrong" };
      persistSoon();
      return { ok: true, correct: false, mastered: false, nextDueAt: now(), memoryText: "" };
    }
    const nextStage = Math.max(0, Number(current.stage || 0)) + 1;
    let mastered = false;
    let nextDueAt = 0;
    let memoryText = "";
    if (nextStage >= REVIEW_MASTERY_STAGE) {
      delete state.reviewQueue[entryKey];
      mastered = true;
      memoryText = "Cette notion est maintenant considérée comme maîtrisée.";
    } else {
      const interval = REVIEW_INTERVALS[Math.min(REVIEW_INTERVALS.length - 1, nextStage - 1)];
      nextDueAt = now() + interval;
      state.reviewQueue[entryKey] = { ...current, stage: nextStage, dueAt: nextDueAt, lastCorrectAt: now(), lastResult: "correct" };
      memoryText = `Elle reviendra ${dueLabel(nextDueAt)} pour confirmer la mémorisation.`;
    }
    state.reviewStats = { ...(state.reviewStats || {}), corrected: Number(state.reviewStats?.corrected || 0) + 1 };
    state.xp = Number(state.xp || 0) + REVIEW_XP;
    trackDailyActivity("review", { key: entryKey });
    persistSoon();
    return { ok: true, correct: true, mastered, nextDueAt, memoryText, xp: REVIEW_XP };
  }

  function queueWrongAnswer(lesson, questionIndex, item) {
    if (!lesson?.id || !Number.isInteger(Number(questionIndex))) return;
    const key = reviewKey(lesson.id, questionIndex);
    const previous = state.reviewQueue[key] || {};
    state.reviewQueue[key] = {
      lessonId: lesson.id,
      questionIndex: Number(questionIndex),
      question: item?.q || previous.question || "Question à revoir",
      wrongCount: Number(previous.wrongCount || 0) + 1,
      firstWrongAt: Number(previous.firstWrongAt || now()),
      lastWrongAt: now(),
      stage: 0,
      dueAt: now(),
      lastResult: "wrong"
    };
    state.reviewStats = {
      ...(state.reviewStats || {}),
      wrong: Number(state.reviewStats?.wrong || 0) + 1,
      corrected: Number(state.reviewStats?.corrected || 0)
    };
    persistSoon();
  }

  function unresolvedForLesson(lessonId) {
    return allReviewEntries().filter(entry => entry?.lessonId === lessonId).length;
  }

  function lessonMastery(lesson) {
    if (!lessonDone(lesson.id)) return 0;
    const unresolved = unresolvedForLesson(lesson.id);
    return Math.max(60, 100 - Math.min(40, unresolved * 10));
  }

  function disciplineMastery(disciplineId) {
    const lessons = disciplineLessons(disciplineId);
    const done = lessons.filter(lesson => lessonDone(lesson.id)).length;
    const mastered = lessons.filter(lesson => lessonDone(lesson.id) && unresolvedForLesson(lesson.id) === 0).length;
    const score = lessons.length ? Math.round(lessons.reduce((sum, lesson) => sum + lessonMastery(lesson), 0) / lessons.length) : 0;
    return {
      disciplineId,
      total: lessons.length,
      done,
      mastered,
      score,
      reviews: validReviewEntries(disciplineId).length,
      memory: allReviewEntries(disciplineId).length
    };
  }

  const COLLECTION_NAMES = {
    "art-avantgardes": ["spark", "Avant-gardiste"],
    "art-renaissance": ["art", "Humaniste"],
    "cinema-early": ["cinema", "Pionnier du cinéma"],
    "cinema-hollywood": ["trophy", "Cinéphile classique"],
    "sci-astronomy": ["astronomy", "Astronome amateur"],
    "sci-evolution": ["science", "Naturaliste"],
    "sci-vaccines-microbes": ["science", "Chasseur de microbes"],
    "sci-computers-space": ["astronomy", "Explorateur numérique"],
    "eco-money-banks": ["economy", "Apprenti banquier"],
    "eco-crises": ["ranking", "Analyste des crises"],
    "geo-maps": ["map", "Cartographe"],
    "geo-cities": ["geography", "Urbaniste"],
    "geo-risks": ["warning", "Expert des risques"],
    "music-baroque": ["music", "Maître du baroque"],
    "music-jazz-blues": ["music", "Oreille jazz"],
    "music-rap-electronic": ["music", "Beatmaker curieux"],
    "astro-scales": ["science", "Mesureur du cosmos"],
    "astro-cosmology": ["astronomy", "Cosmologiste curieux"],
    "astro-stellar-life": ["astronomy", "Explorateur des étoiles"],
    "astro-sun": ["astronomy", "Veilleur solaire"],
    "astro-formation-rocky": ["science", "Architecte des planètes"],
    "astro-giants-moons": ["astronomy", "Voyageur des mondes géants"],
    "astro-small-bodies": ["astronomy", "Chasseur de comètes"],
    "astro-exoplanets-life": ["astronomy", "Chercheur d’autres mondes"],
    "astro-observation": ["astronomy", "Observateur du ciel"],
    "astro-spaceflight": ["astronomy", "Navigateur spatial"]
  };

  const DISCIPLINE_MEDALS = {
    history: ["history", "Grand historien"],
    art: ["art", "Œil de critique"],
    cinema: ["cinema", "Cinéphile accompli"],
    "science-inventions": ["science", "Esprit scientifique"],
    economy: ["economy", "Économiste en herbe"],
    geography: ["geography", "Géographe du monde"],
    music: ["music", "Mélomane accompli"],
    astronomy: ["astronomy", "Astronome accompli"]
  };



  function progressionIcon(iconToken) {
    if (!iconToken) return HD_ICONS.action("medal");
    if (String(iconToken).includes('<span class="hd-icon')) return iconToken;
    return HD_ICONS.action(String(iconToken));
  }

  function collectionDefinitions() {
    const definitions = [];
    let worlds = [];
    try { worlds = allDisciplineWorlds?.() || []; } catch {}
    worlds.forEach(world => {
      let lessons = [];
      try { lessons = (treeLessonsForWorld?.(world.id) || []).filter(isCuratedLesson); } catch {}
      if (lessons.length < 2) return;
      const disciplineId = worldDisciplineId(world);
      const custom = COLLECTION_NAMES[world.id] || [HD_ICONS.world(world, disciplineById(disciplineId)), world.title || "Thème maîtrisé"];
      definitions.push({
        id: `theme:${world.id}`,
        type: "theme",
        worldId: world.id,
        disciplineId,
        icon: progressionIcon(custom[0]),
        title: custom[1],
        description: `Terminer tous les cours du thème « ${world.title} ».`,
        lessonIds: lessons.map(lesson => lesson.id)
      });
    });
    DISCIPLINES.forEach(discipline => {
      const lessons = disciplineLessons(discipline.id);
      if (lessons.length < 4) return;
      const custom = DISCIPLINE_MEDALS[discipline.id] || [HD_ICONS.discipline(discipline), `${discipline.title} accompli`];
      definitions.push({
        id: `discipline:${discipline.id}`,
        type: "discipline",
        disciplineId: discipline.id,
        icon: progressionIcon(custom[0]),
        title: custom[1],
        description: `Valider tous les cours disponibles en ${discipline.title}.`,
        lessonIds: lessons.map(lesson => lesson.id)
      });
    });
    return definitions;
  }

  function collectionProgress(definition) {
    const total = definition.lessonIds.length;
    const done = definition.lessonIds.filter(id => lessonDone(id)).length;
    return { done, total, progress: pct(done, total), complete: total > 0 && done >= total };
  }

  function showProgressionToast(message) {
    const old = document.querySelector(".beta179-progression-toast");
    old?.remove();
    const node = document.createElement("div");
    node.className = "beta179-progression-toast";
    node.setAttribute("role", "status");
    node.textContent = message;
    document.body.appendChild(node);
    requestAnimationFrame(() => node.classList.add("show"));
    window.setTimeout(() => { node.classList.remove("show"); window.setTimeout(() => node.remove(), 250); }, 2800);
  }

  function reconcileCollections({ notify = false } = {}) {
    const unlocked = state.collectionUnlocks || {};
    const newlyUnlocked = [];
    collectionDefinitions().forEach(definition => {
      const progress = collectionProgress(definition);
      if (!progress.complete || unlocked[definition.id]) return;
      unlocked[definition.id] = { at: now(), title: definition.title, icon: definition.icon };
      newlyUnlocked.push(definition);
    });
    if (!newlyUnlocked.length) return [];
    state.collectionUnlocks = unlocked;
    persistSoon();
    if (notify) {
      const first = newlyUnlocked[0];
      showProgressionToast(`${first.icon} Médaille débloquée : ${first.title}${newlyUnlocked.length > 1 ? ` (+${newlyUnlocked.length - 1})` : ""}`);
    }
    return newlyUnlocked;
  }

  function synthesisKey(disciplineId, stage) {
    return `${disciplineId}:${Number(stage)}`;
  }

  function completedLessonsForDiscipline(disciplineId) {
    return disciplineLessons(disciplineId).filter(lesson => lessonDone(lesson.id));
  }

  function synthesisStatus(disciplineId) {
    const all = disciplineLessons(disciplineId);
    const completed = completedLessonsForDiscipline(disciplineId);
    const availableStages = Math.floor(all.length / SYNTHESIS_SIZE);
    const unlockedStages = Math.floor(completed.length / SYNTHESIS_SIZE);
    let nextUnlocked = null;
    for (let stage = 1; stage <= unlockedStages; stage += 1) {
      if (!state.synthesisPassed?.[synthesisKey(disciplineId, stage)]) { nextUnlocked = stage; break; }
    }
    const passed = Array.from({ length: availableStages }, (_, index) => index + 1).filter(stage => state.synthesisPassed?.[synthesisKey(disciplineId, stage)]).length;
    const nextTarget = Math.min(all.length || SYNTHESIS_SIZE, (passed + 1) * SYNTHESIS_SIZE);
    const checkpointProgress = nextUnlocked
      ? SYNTHESIS_SIZE
      : Math.max(0, Math.min(SYNTHESIS_SIZE, completed.length - passed * SYNTHESIS_SIZE));
    return { all, completed, availableStages, unlockedStages, nextUnlocked, passed, nextTarget, checkpointProgress };
  }

  function synthesisLessons(disciplineId, stage) {
    const key = synthesisKey(disciplineId, stage);
    const saved = state.synthesisPassed?.[key]?.lessonIds;
    if (Array.isArray(saved) && saved.length === SYNTHESIS_SIZE) return saved.map(lessonById).filter(Boolean);
    return completedLessonsForDiscipline(disciplineId).slice((stage - 1) * SYNTHESIS_SIZE, stage * SYNTHESIS_SIZE);
  }

  function questionRecord(lesson, questionIndex) {
    if (!lesson) return null;
    const content = buildLessonContent(lesson);
    const quizItems = normalizeQuizPack(content.quiz, lesson, content);
    if (!quizItems.length) return null;
    const index = Math.max(0, Math.min(quizItems.length - 1, Number(questionIndex) || 0));
    const item = quizItems[index];
    const choices = quizChoicesFor(item, quizItems, lesson, content, index);
    return { lesson, content, quizItems, index, item, choices };
  }

  function deterministicQuestionIndex(lesson, stage) {
    const content = buildLessonContent(lesson);
    const quizItems = normalizeQuizPack(content.quiz, lesson, content);
    if (!quizItems.length) return 0;
    return quizSeed(`${lesson.id}-synthese-${stage}`) % quizItems.length;
  }

  function closeProgressionModal({ rerender = false } = {}) {
    document.querySelector(".beta179-modal")?.remove();
    document.documentElement.classList.remove("beta179-modal-open");
    if (rerender) try { render({ immediate: true }); } catch { try { render(); } catch {} }
  }

  function createProgressionModal(label, title) {
    closeProgressionModal();
    const modal = document.createElement("div");
    modal.className = "beta179-modal";
    modal.innerHTML = `<div class="beta179-modal-backdrop" data-beta179-close></div><section class="beta179-modal-panel" role="dialog" aria-modal="true" aria-labelledby="beta179-modal-title"><header><div><span class="card-label">${esc(label)}</span><h2 id="beta179-modal-title">${esc(title)}</h2></div><button type="button" class="ghost beta179-modal-close" data-beta179-close aria-label="Fermer">✕</button></header><div class="beta179-modal-content"></div></section>`;
    document.body.appendChild(modal);
    document.documentElement.classList.add("beta179-modal-open");
    modal.querySelectorAll("[data-beta179-close]").forEach(button => button.addEventListener("click", () => closeProgressionModal({ rerender: true })));
    return { modal, content: modal.querySelector(".beta179-modal-content") };
  }

  function openReviewSession(disciplineId = "") {
    const entries = validReviewEntries(disciplineId).slice(0, 10);
    const discipline = disciplineId ? disciplineById(disciplineId) : null;
    const dialog = createProgressionModal("Révisions intelligentes", discipline ? `Consolider ta mémoire en ${discipline.title}` : "Consolider ta mémoire");
    if (!entries.length) {
      const scheduled = allReviewEntries(disciplineId);
      const next = nextScheduledReview(disciplineId);
      dialog.content.innerHTML = scheduled.length
        ? `<div class="beta179-empty-state"><b>Rien à revoir maintenant</b><p>${scheduled.length} question${scheduled.length > 1 ? "s sont programmées" : " est programmée"}. La prochaine reviendra ${next ? dueLabel(next.dueAt) : "plus tard"} afin de vérifier que l’idée reste en mémoire.</p><button type="button" data-beta179-finish>Fermer</button></div>`
        : `<div class="beta179-empty-state"><b>Mémoire à jour</b><p>Les questions ratées seront ajoutées ici. Elles reviendront ensuite à intervalles espacés jusqu’à être réellement maîtrisées.</p><button type="button" data-beta179-finish>Fermer</button></div>`;
      dialog.content.querySelector("[data-beta179-finish]")?.addEventListener("click", () => closeProgressionModal({ rerender: true }));
      return;
    }

    let cursor = 0;
    let reinforced = 0;
    let mastered = 0;
    let answered = false;

    function renderQuestion() {
      if (cursor >= entries.length) return renderSummary();
      const entry = entries[cursor];
      const record = questionRecord(entry.lesson, Number(entry.questionIndex));
      if (!record) {
        delete state.reviewQueue[entry.key];
        persistSoon();
        cursor += 1;
        return renderQuestion();
      }
      answered = false;
      const stageLabel = Number(entry.stage || 0) === 0 ? "à corriger" : `niveau mémoire ${Number(entry.stage || 0)}/3`;
      dialog.content.innerHTML = `<div class="beta179-session-progress"><span>Question ${cursor + 1}/${entries.length}</span><div><i style="width:${pct(cursor, entries.length)}%"></i></div><b>${validReviewEntries(disciplineId).length} dues</b></div>
        <article class="beta179-question-card">
          <small>${HD_ICONS.lesson(entry.lesson)} ${esc(entry.lesson.title)} · ${stageLabel}</small>
          <h3>${esc(record.item.q)}</h3>
          <div class="beta179-answer-grid">${record.choices.map((choice, index) => `<button type="button" data-beta179-answer="${index}"><span>${String.fromCharCode(65 + index)}</span>${esc(choice.text)}</button>`).join("")}</div>
          <div class="beta179-answer-feedback" aria-live="polite"></div>
        </article>`;
      dialog.content.querySelectorAll("[data-beta179-answer]").forEach(button => button.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const choice = record.choices[Number(button.dataset.beta179Answer)];
        const feedback = dialog.content.querySelector(".beta179-answer-feedback");
        dialog.content.querySelectorAll("[data-beta179-answer]").forEach(item => item.disabled = true);
        const outcome = applyReviewAnswer(entry.key, Boolean(choice?.correct));
        if (outcome.correct) {
          if (outcome.mastered) mastered += 1;
          reinforced += 1;
          button.classList.add("correct");
          feedback.innerHTML = `<p class="good"><b>Bonne réponse.</b> ${esc(record.item.why || record.item.a)} ${esc(outcome.memoryText)} <span>+${REVIEW_XP} XP</span></p><button type="button" data-beta179-next>Question suivante</button>`;
        } else {
          button.classList.add("wrong");
          feedback.innerHTML = `<p class="bad"><b>À reprendre.</b> La bonne réponse est : ${esc(record.item.a)}. ${esc(record.item.why || "La correction reprend l’idée expliquée dans le cours.")}</p><button type="button" data-beta179-next>Continuer</button>`;
        }
        feedback.querySelector("[data-beta179-next]")?.addEventListener("click", () => { cursor += 1; renderQuestion(); });
      }));
    }

    function renderSummary() {
      const due = validReviewEntries(disciplineId).length;
      const memory = allReviewEntries(disciplineId).length;
      const scheduled = Math.max(0, memory - due);
      dialog.content.innerHTML = `<div class="beta179-session-summary"><div class="beta179-summary-icon">${due ? HD_ICONS.action("review") : HD_ICONS.action("check")}</div><h3>${reinforced ? `${reinforced} notion${reinforced > 1 ? "s" : ""} consolidée${reinforced > 1 ? "s" : ""}` : "Session terminée"}</h3><p>${mastered ? `${mastered} question${mastered > 1 ? "s sont désormais maîtrisées" : " est désormais maîtrisée"}. ` : ""}${due ? `${due} question${due > 1 ? "s restent à revoir maintenant" : " reste à revoir maintenant"}.` : scheduled ? `${scheduled} question${scheduled > 1 ? "s reviendront" : " reviendra"} dans les prochains jours.` : "Ta mémoire est à jour."}</p><div class="beta179-summary-stats"><span>+${reinforced * REVIEW_XP} XP</span><span>${due} due${due > 1 ? "s" : ""} · ${scheduled} programmée${scheduled > 1 ? "s" : ""}</span></div><button type="button" data-beta179-finish>Retour au parcours</button></div>`;
      dialog.content.querySelector("[data-beta179-finish]")?.addEventListener("click", () => closeProgressionModal({ rerender: true }));
    }

    renderQuestion();
  }

  function openSynthesisQuiz(disciplineId, stage) {
    const discipline = disciplineById(disciplineId);
    const lessons = synthesisLessons(disciplineId, stage);
    if (lessons.length < SYNTHESIS_SIZE) return;
    const questions = lessons.map(lesson => questionRecord(lesson, deterministicQuestionIndex(lesson, stage))).filter(Boolean);
    if (questions.length < SYNTHESIS_SIZE) return;
    const dialog = createProgressionModal(`${HD_ICONS.discipline(discipline)} Quiz de synthèse`, `Bilan ${stage} · ${discipline.title}`);
    let cursor = 0;
    let score = 0;
    let answered = false;

    function renderQuestion() {
      if (cursor >= questions.length) return renderSummary();
      const record = questions[cursor];
      answered = false;
      dialog.content.innerHTML = `<div class="beta179-session-progress"><span>Question ${cursor + 1}/${questions.length}</span><div><i style="width:${pct(cursor, questions.length)}%"></i></div><b>${score} juste${score > 1 ? "s" : ""}</b></div>
        <article class="beta179-question-card synthesis">
          <small>${HD_ICONS.lesson(record.lesson)} ${esc(record.lesson.title)}</small>
          <h3>${esc(record.item.q)}</h3>
          <div class="beta179-answer-grid">${record.choices.map((choice, index) => `<button type="button" data-beta179-answer="${index}"><span>${String.fromCharCode(65 + index)}</span>${esc(choice.text)}</button>`).join("")}</div>
          <div class="beta179-answer-feedback" aria-live="polite"></div>
        </article>`;
      dialog.content.querySelectorAll("[data-beta179-answer]").forEach(button => button.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const choice = record.choices[Number(button.dataset.beta179Answer)];
        const feedback = dialog.content.querySelector(".beta179-answer-feedback");
        dialog.content.querySelectorAll("[data-beta179-answer]").forEach(item => item.disabled = true);
        if (choice?.correct) {
          score += 1;
          button.classList.add("correct");
          feedback.innerHTML = `<p class="good"><b>Correct.</b> ${esc(record.item.why || record.item.a)}</p><button type="button" data-beta179-next>Question suivante</button>`;
        } else {
          queueWrongAnswer(record.lesson, record.index, record.item);
          button.classList.add("wrong");
          feedback.innerHTML = `<p class="bad"><b>Non.</b> La bonne réponse est : ${esc(record.item.a)}. ${esc(record.item.why || "Cette idée était expliquée dans le cours.")} Cette question rejoint tes révisions.</p><button type="button" data-beta179-next>Continuer</button>`;
        }
        feedback.querySelector("[data-beta179-next]")?.addEventListener("click", () => { cursor += 1; renderQuestion(); });
      }));
    }

    function renderSummary() {
      const key = synthesisKey(disciplineId, stage);
      const passed = score >= SYNTHESIS_PASS;
      const alreadyPassed = Boolean(state.synthesisPassed?.[key]);
      state.synthesisAttempts = { ...(state.synthesisAttempts || {}), [key]: Number(state.synthesisAttempts?.[key] || 0) + 1 };
      if (passed && !alreadyPassed) {
        state.synthesisPassed = {
          ...(state.synthesisPassed || {}),
          [key]: { at: now(), score, total: questions.length, lessonIds: lessons.map(lesson => lesson.id) }
        };
        state.xp = Number(state.xp || 0) + SYNTHESIS_XP;
        trackDailyActivity("synthesis", { key });
      }
      persistSoon();
      dialog.content.innerHTML = `<div class="beta179-session-summary ${passed ? "passed" : "failed"}"><div class="beta179-summary-icon">${passed ? HD_ICONS.action("trophy") : HD_ICONS.action("review")}</div><h3>${passed ? "Bilan validé" : "Encore un effort"}</h3><p>Tu obtiens ${score}/${questions.length}. Il faut ${SYNTHESIS_PASS}/${questions.length} pour valider ce quiz de synthèse.</p><div class="beta179-summary-stats"><span>${passed && !alreadyPassed ? `+${SYNTHESIS_XP} XP` : `${score}/${questions.length}`}</span><span>${passed ? "Maîtrise confirmée" : "Tu peux recommencer"}</span></div><div class="beta179-summary-actions">${passed ? `<button type="button" data-beta179-finish>Retour au parcours</button>` : `<button type="button" data-beta179-retry>Recommencer</button><button type="button" class="ghost" data-beta179-finish>Plus tard</button>`}</div></div>`;
      dialog.content.querySelector("[data-beta179-finish]")?.addEventListener("click", () => closeProgressionModal({ rerender: true }));
      dialog.content.querySelector("[data-beta179-retry]")?.addEventListener("click", () => { closeProgressionModal(); openSynthesisQuiz(disciplineId, stage); });
      if (passed && !alreadyPassed) showProgressionToast(`Bilan ${stage} validé · +${SYNTHESIS_XP} XP`);
    }

    renderQuestion();
  }

  function collectionCardsMarkup(definitions, limit = 8, { interactive = false } = {}) {
    return definitions.slice(0, limit).map(definition => {
      const progress = collectionProgress(definition);
      const unlocked = Boolean(state.collectionUnlocks?.[definition.id] || progress.complete);
      const action = interactive ? `<button type="button" class="ghost beta180-collection-open" data-beta180-open-collection="${esc(definition.id)}">${definition.type === "theme" ? "Ouvrir le thème" : "Voir le domaine"}</button>` : "";
      return `<article class="beta179-collection-card ${unlocked ? "unlocked" : ""}" style="--collection-accent:${esc(disciplineById(definition.disciplineId).accent)}"><div class="beta179-medal">${unlocked ? definition.icon : HD_ICONS.action("lock")}</div><div><h3>${esc(definition.title)}</h3><p>${esc(definition.description)}</p><div class="beta179-mini-progress"><i style="width:${progress.progress}%"></i></div><small>${unlocked ? "Médaille débloquée" : `${progress.done}/${progress.total} cours · ${progress.progress}%`}</small>${action}</div></article>`;
    }).join("");
  }

  function openCollectionPath(definition) {
    if (!definition) return;
    closeProgressionModal();
    if (definition.type === "theme" && definition.worldId) {
      const world = allDisciplineWorlds().find(item => item.id === definition.worldId) || {};
      setState({ tab: "learn", currentDiscipline: definition.disciplineId, currentGroup: world.group || state.currentGroup, currentWorld: definition.worldId, learnDrill: "courses", learnFilter: "all", learnSearch: "" });
      return;
    }
    setState({ tab: "learn", currentDiscipline: definition.disciplineId, learnDrill: "chapters", learnFilter: "all", learnSearch: "" });
  }

  function openCollectionsModal(initialFilter = "all") {
    const dialog = createProgressionModal("Collections", "Toutes tes médailles");
    let filter = initialFilter;
    function paint() {
      const definitions = prioritizedCollections();
      const filtered = definitions.filter(definition => {
        const complete = collectionProgress(definition).complete;
        return filter === "all" || (filter === "unlocked" ? complete : !complete);
      });
      dialog.content.innerHTML = `<div class="beta180-collection-filters"><button type="button" data-beta180-collection-filter="all" class="${filter === "all" ? "active" : ""}">Toutes</button><button type="button" data-beta180-collection-filter="unlocked" class="${filter === "unlocked" ? "active" : ""}">Débloquées</button><button type="button" data-beta180-collection-filter="locked" class="${filter === "locked" ? "active" : ""}">À terminer</button></div><div class="beta179-collection-grid beta180-all-collections">${collectionCardsMarkup(filtered, filtered.length, { interactive: true }) || `<div class="beta179-empty-state"><b>Aucune collection ici</b><p>Change de filtre pour voir les autres médailles.</p></div>`}</div>`;
      dialog.content.querySelectorAll("[data-beta180-collection-filter]").forEach(button => button.addEventListener("click", () => { filter = button.dataset.beta180CollectionFilter || "all"; paint(); }));
      dialog.content.querySelectorAll("[data-beta180-open-collection]").forEach(button => button.addEventListener("click", () => openCollectionPath(collectionDefinitions().find(item => item.id === button.dataset.beta180OpenCollection))));
    }
    paint();
  }

  function prioritizedCollections(disciplineId = "") {
    return collectionDefinitions()
      .filter(definition => !disciplineId || definition.disciplineId === disciplineId)
      .map(definition => ({ definition, progress: collectionProgress(definition), unlocked: Boolean(state.collectionUnlocks?.[definition.id]) }))
      .sort((a, b) => Number(b.unlocked) - Number(a.unlocked) || Number(b.progress.progress) - Number(a.progress.progress) || a.definition.title.localeCompare(b.definition.title, "fr"))
      .map(item => item.definition);
  }

  function masteryBarsMarkup() {
    return DISCIPLINES.map(discipline => {
      const stats = disciplineMastery(discipline.id);
      return `<div class="beta179-mastery-row" style="--mastery-accent:${esc(discipline.accent)}"><span>${HD_ICONS.discipline(discipline)}</span><div><div><strong>${esc(discipline.title)}</strong><b>${stats.score}%</b></div><div class="beta179-mastery-bar"><i style="width:${stats.score}%"></i></div><small>${stats.mastered}/${stats.total} cours pleinement maîtrisés${stats.reviews ? ` · ${stats.reviews} à revoir maintenant` : stats.memory ? ` · ${stats.memory} en mémorisation` : ""}</small></div></div>`;
    }).join("");
  }

  function activePathProgress(disciplineId) {
    let world = null;
    try {
      const selected = allDisciplineWorlds?.().find(item => item.id === state.currentWorld);
      if (selected && worldDisciplineId(selected) === disciplineId && (curatedLessonsFor(selected.id) || []).filter(isCuratedLesson).length) world = selected;
      if (!world && typeof treeActiveWorld === "function") world = treeActiveWorld(treeActiveGroupId(disciplineId), disciplineId);
      if (!world) world = activeWorld();
    } catch { try { world = activeWorld(); } catch {} }
    let lessons = [];
    try { lessons = world ? (curatedLessonsFor(world.id) || []).filter(isCuratedLesson) : []; } catch {}
    if (!lessons.length) lessons = disciplineLessons(disciplineId);
    const current = lessonById(state.currentLessonId);
    const currentInPath = current && lessons.some(lesson => String(lesson.id) === String(current.id));
    let nextLesson = currentInPath && !lessonDone(current.id) && !lessonLockedByDailyMystery(current) ? current : null;
    if (!nextLesson) nextLesson = lessons.find(lesson => !lessonDone(lesson.id) && !lessonLockedByDailyMystery(lesson)) || null;
    const done = lessons.filter(lesson => lessonDone(lesson.id)).length;
    return { world, lessons, done, total: lessons.length, progress: pct(done, lessons.length), nextLesson, complete: lessons.length > 0 && done >= lessons.length };
  }

  function pathCardMarkup(disciplineId) {
    const path = activePathProgress(disciplineId);
    const title = path.world?.title || disciplineById(disciplineId).title;
    if (!path.total) return "";
    if (path.complete) {
      return `<div class="beta181-path-card complete"><div class="beta181-path-icon">${HD_ICONS.action("check")}</div><div><span>Chapitre terminé</span><h3>${esc(title)}</h3><p>${path.done}/${path.total} cours validés · la collection associée peut être débloquée.</p></div><button type="button" class="ghost" data-beta180-collections-all>Voir les médailles</button></div>`;
    }
    const lesson = path.nextLesson;
    if (!lesson) return `<div class="beta181-path-card"><div class="beta181-path-icon">${HD_ICONS.action("lock")}</div><div><span>Suite du chapitre</span><h3>${esc(title)}</h3><p>Le prochain cours est temporairement masqué pour protéger le mystère du jour.</p></div><button type="button" data-beta181-path="mystery">Jouer le mystère</button></div>`;
    return `<div class="beta181-path-card"><div class="beta181-path-icon">${HD_ICONS.lesson(lesson, path.world, disciplineById(path.disciplineId || path.world?.disciplineId))}</div><div><span>Suite recommandée · ${path.done}/${path.total}</span><h3>${esc(lesson.title)}</h3><p>${esc(lesson.period || lesson.location || title)} · ${path.progress}% du chapitre validé</p></div><button type="button" data-beta181-path="${esc(lesson.id)}">Continuer</button></div>`;
  }

  function activeProgressionMarkup(disciplineId) {
    const discipline = disciplineById(disciplineId);
    const mastery = disciplineMastery(disciplineId);
    const synth = synthesisStatus(disciplineId);
    const collections = prioritizedCollections(disciplineId);
    const nextCollection = collections.find(definition => !collectionProgress(definition).complete) || collections[0];
    const nextCollectionProgress = nextCollection ? collectionProgress(nextCollection) : null;
    const nextReview = nextScheduledReview(disciplineId);
    const synthesisText = synth.nextUnlocked
      ? `Bilan ${synth.nextUnlocked} prêt`
      : synth.all.length < SYNTHESIS_SIZE
        ? `${synth.completed.length} cours validés`
        : `${synth.checkpointProgress}/${SYNTHESIS_SIZE} vers le prochain bilan`;
    return `<section class="card beta179-learning-hub beta181-learning-hub" style="--progression-accent:${esc(discipline.accent)}">
      <div class="section-title-row"><div><span class="card-label">Parcours guidé</span><h2>${HD_ICONS.discipline(discipline)} Maîtrise ${esc(discipline.title)}</h2><p>Une prochaine étape claire, puis des rappels courts pour consolider.</p></div><strong class="beta179-big-percent">${mastery.score}%</strong></div>
      <div class="beta179-master-bar"><i style="width:${mastery.score}%"></i></div>
      ${pathCardMarkup(disciplineId)}
      <div class="beta181-progress-actions">
        <button type="button" data-beta179-review="${esc(disciplineId)}" class="${mastery.reviews ? "urgent" : ""}"><b>${HD_ICONS.action("review")} ${mastery.reviews ? `${mastery.reviews} à revoir` : "Mémoire à jour"}</b><span>${mastery.reviews ? "Réviser maintenant" : mastery.memory && nextReview ? `Prochaine ${dueLabel(nextReview.dueAt)}` : "Les erreurs reviendront ici"}</span></button>
        <button type="button" ${synth.nextUnlocked ? `data-beta179-synthesis="${esc(disciplineId)}" data-beta179-stage="${synth.nextUnlocked}"` : "disabled"}><b>${HD_ICONS.action("trophy")} ${synthesisText}</b><span>${synth.nextUnlocked ? "Lancer le quiz de synthèse" : `${synth.passed} bilan${synth.passed > 1 ? "s" : ""} validé${synth.passed > 1 ? "s" : ""}`}</span></button>
        <button type="button" data-beta180-collections-all><b>${HD_ICONS.action("medal")} ${nextCollection ? esc(nextCollection.title) : "Collections"}</b><span>${nextCollectionProgress ? `${nextCollectionProgress.done}/${nextCollectionProgress.total} cours · ${nextCollectionProgress.progress}%` : "Voir les médailles"}</span></button>
      </div>
    </section>`;
  }

  function recommendedDailyLesson(excludedIds = []) {
    const excluded = new Set((excludedIds || []).map(String));
    const current = lessonById(state.currentLessonId);
    if (current && !lessonDone(current.id) && !excluded.has(String(current.id))) return current;
    const disciplineId = activeDisciplineId();
    const candidates = disciplineLessons(disciplineId).filter(lesson => !lessonDone(lesson.id) && !excluded.has(String(lesson.id)) && !lessonLockedByDailyMystery(lesson));
    if (candidates.length) return candidates[0];
    return curatedLessons().find(lesson => !lessonDone(lesson.id) && !excluded.has(String(lesson.id)) && !lessonLockedByDailyMystery(lesson)) || null;
  }

  function openDailyCourse() {
    const status = dailyPlanStatus();
    const lesson = recommendedDailyLesson(status.log.courses || []);
    if (!lesson) return setState({ tab: "learn", currentDiscipline: activeDisciplineId(), learnDrill: "chapters" });
    const world = lessonWorld(lesson);
    setState({ tab: "lesson", currentLessonId: lesson.id, currentDiscipline: lessonDisciplineId(lesson), currentWorld: world.id, currentGroup: world.group, lessonView: "express", lessonFocus: "express" });
  }

  function weeklyGoalLine(label, icon, goal) {
    const value = Math.min(Number(goal.value || 0), Number(goal.target || 1));
    return `<div class="beta181-week-goal ${goal.value >= goal.target ? "done" : ""}"><span>${icon}</span><div><b>${esc(label)}</b><i><em style="width:${pct(value, goal.target)}%"></em></i></div><strong>${value}/${goal.target}</strong></div>`;
  }

  function weeklyProgressMarkup({ compact = false } = {}) {
    const status = weeklyStatus();
    const done = Object.values(status.goals).filter(goal => goal.value >= goal.target).length;
    const unmet = status.goals.activeDays.value < status.goals.activeDays.target
      ? `${status.goals.activeDays.target - status.goals.activeDays.value} jour${status.goals.activeDays.target - status.goals.activeDays.value > 1 ? "s" : ""} actif${status.goals.activeDays.target - status.goals.activeDays.value > 1 ? "s" : ""} à faire`
      : status.goals.courses.value < status.goals.courses.target
        ? `${status.goals.courses.target - status.goals.courses.value} cours à valider`
        : status.goals.consolidation.value < status.goals.consolidation.target
          ? `${status.goals.consolidation.target - status.goals.consolidation.value} consolidation${status.goals.consolidation.target - status.goals.consolidation.value > 1 ? "s" : ""} à faire`
          : "Objectif terminé";
    if (compact) {
      return `<div class="beta181-week-strip"><span>${HD_ICONS.action("trophy")} Semaine</span><div><i style="width:${pct(done, 3)}%"></i></div><b>${done}/3 objectifs</b><small>${status.claimed ? `+${WEEKLY_REWARD_XP} XP récupérés` : status.complete ? "Récompense prête" : unmet}</small></div>`;
    }
    return `<section class="card beta181-weekly-card"><div class="section-title-row"><div><span class="card-label">Objectif hebdomadaire</span><h2>${HD_ICONS.action("trophy")} ${done}/3 missions accomplies</h2><p>Le défi s’adapte aux activités utiles : apprendre, revenir plusieurs jours et consolider.</p></div><strong>+${WEEKLY_REWARD_XP} XP</strong></div><div class="beta181-week-goals">${weeklyGoalLine("Jours actifs", HD_ICONS.action("spark"), status.goals.activeDays)}${weeklyGoalLine("Cours validés", HD_ICONS.action("lesson"), status.goals.courses)}${weeklyGoalLine("Consolidations", HD_ICONS.action("review"), status.goals.consolidation)}</div><p class="beta181-week-note">${status.claimed ? "Objectif de la semaine déjà récompensé." : status.complete ? "Les trois missions sont terminées : la récompense est attribuée automatiquement." : "Une consolidation correspond à une révision, un bilan réussi ou un programme quotidien terminé."}</p></section>`;
  }

  function dailyPlanMarkup() {
    const status = dailyPlanStatus();
    const log = status.log;
    const courseCount = (log.courses || []).length;
    const reviewCount = (log.reviewKeys || []).length;
    const courseTarget = 1;
    const reviewTarget = Math.max(1, Number(log.reviewTarget || 1));
    const practiceLabel = log.planType === "review" ? `Consolider ${reviewTarget} erreur${reviewTarget > 1 ? "s" : ""}` : "Valider un deuxième cours";
    const practiceMeta = log.planType === "review" ? `${Math.min(reviewCount, reviewTarget)}/${reviewTarget} bonne${reviewTarget > 1 ? "s" : ""} réponse${reviewTarget > 1 ? "s" : ""}` : `${Math.min(courseCount, 2)}/2 cours`;
    const nextTask = !status.mysteryDone ? "mystery" : !status.courseDone ? "course" : !status.practiceDone ? (log.planType === "review" ? "review" : "course") : "done";
    return `<section class="card beta179-home-progress beta180-daily-plan"><div class="beta180-plan-head"><div><span class="card-label">Programme du jour</span><h2>${status.done}/3 étapes accomplies</h2><p>Une courte boucle pour jouer, apprendre puis consolider.</p></div><strong>+${DAILY_PLAN_XP} XP</strong></div><div class="beta180-plan-meter"><i style="width:${pct(status.done, 3)}%"></i></div><div class="beta180-plan-steps"><button type="button" data-beta180-task="mystery" class="${status.mysteryDone ? "done" : nextTask === "mystery" ? "current" : ""}"><b>${status.mysteryDone ? HD_ICONS.action("check") : "1"}</b><span>Résoudre le mystère<small>${status.mysteryDone ? "Rendez-vous quotidien validé" : "Jouer le dossier du jour"}</small></span></button><button type="button" data-beta180-task="course" class="${status.courseDone ? "done" : nextTask === "course" ? "current" : ""}"><b>${status.courseDone ? HD_ICONS.action("check") : "2"}</b><span>Valider un cours<small>${Math.min(courseCount, courseTarget)}/${courseTarget} cours aujourd’hui</small></span></button><button type="button" data-beta180-task="${log.planType === "review" ? "review" : "course"}" class="${status.practiceDone ? "done" : nextTask === (log.planType === "review" ? "review" : "course") ? "current" : ""}"><b>${status.practiceDone ? HD_ICONS.action("check") : "3"}</b><span>${practiceLabel}<small>${practiceMeta}</small></span></button></div><div class="beta180-plan-footer">${status.complete ? `<span>${log.bonusClaimed ? "Bonus quotidien récupéré" : "Bonus prêt"}</span>` : `<span>Prochaine étape : ${nextTask === "mystery" ? "le mystère" : nextTask === "review" ? "une révision" : "un cours"}</span>`}<button type="button" data-beta180-task="${nextTask}" ${nextTask === "done" ? "disabled" : ""}>${nextTask === "mystery" ? "Jouer" : nextTask === "review" ? "Réviser" : nextTask === "course" ? "Continuer" : "Terminé"}</button></div>${weeklyProgressMarkup({ compact: true })}</section>`;
  }

  function bindProgressionActions(root = document) {
    root.querySelectorAll("[data-beta181-path]").forEach(button => {
      button.onclick = event => {
        event.preventDefault();
        event.stopPropagation();
        const id = button.dataset.beta181Path;
        if (id === "mystery") return setState({ tab: "mystery", currentMysteryId: dailyMystery()?.id || null, currentMysteryDiscipline: activeDisciplineId() });
        const lesson = lessonById(id);
        if (!lesson) return;
        const world = lessonWorld(lesson);
        setState({ tab: "lesson", currentLessonId: lesson.id, currentDiscipline: lessonDisciplineId(lesson), currentWorld: world.id, currentGroup: world.group, lessonView: "express", lessonFocus: "express" });
      };
    });
    root.querySelectorAll("[data-beta180-task]").forEach(button => {
      button.onclick = event => {
        event.preventDefault();
        event.stopPropagation();
        const task = button.dataset.beta180Task;
        if (task === "mystery") return setState({ tab: "mystery", currentMysteryId: dailyMystery()?.id || null, currentMysteryDiscipline: activeDisciplineId() });
        if (task === "review") return openReviewSession("");
        if (task === "course") return openDailyCourse();
      };
    });
    root.querySelectorAll("[data-beta180-collections-all]").forEach(button => {
      button.onclick = event => { event.preventDefault(); event.stopPropagation(); openCollectionsModal("all"); };
    });
    root.querySelectorAll("[data-beta179-review]").forEach(button => {
      button.onclick = event => { event.preventDefault(); event.stopPropagation(); openReviewSession(button.dataset.beta179Review || ""); };
    });
    root.querySelectorAll("[data-beta179-synthesis]").forEach(button => {
      button.onclick = event => { event.preventDefault(); event.stopPropagation(); openSynthesisQuiz(button.dataset.beta179Synthesis, Number(button.dataset.beta179Stage)); };
    });
    root.querySelectorAll("[data-beta179-related]").forEach(button => {
      button.onclick = event => {
        event.preventDefault();
        event.stopPropagation();
        const lesson = lessonById(button.dataset.beta179Related);
        if (!lesson) return;
        const world = lessonWorld(lesson);
        const disciplineId = worldDisciplineId(world);
        setState({ tab: "lesson", currentLessonId: lesson.id, currentDiscipline: disciplineId, currentWorld: world.id, currentGroup: world.group, lessonView: "express", lessonFocus: null });
      };
    });
  }

  function injectLearnProgression() {
    const root = document.getElementById("app");
    if (!root || root.querySelector(".beta179-learning-hub")) return;
    const target = root.querySelector(".discipline-picker") || root.querySelector(".tree-topbar");
    if (!target) return;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = activeProgressionMarkup(activeDisciplineId());
    const node = wrapper.firstElementChild;
    if (target.classList.contains("discipline-picker")) target.insertAdjacentElement("beforebegin", node);
    else target.insertAdjacentElement("afterend", node);
    bindProgressionActions(node);
  }

  function injectHomeProgression() {
    const root = document.getElementById("app");
    if (!root || root.querySelector(".beta180-daily-plan")) return;
    reconcileDailyPlanBonus({ notify: false });
    const wrapper = document.createElement("div");
    wrapper.innerHTML = dailyPlanMarkup();
    const node = wrapper.firstElementChild;
    const target = root.querySelector(".beta117-home-mystery-card") || root.querySelector(".home-mystery-card") || root.querySelector(".home-mode-card") || root.querySelector(".home-clean-hero");
    target?.insertAdjacentElement("afterend", node);
    bindProgressionActions(node);
  }

  function injectProfileProgression() {
    const root = document.getElementById("app");
    if (!root || root.querySelector(".beta179-profile-mastery")) return;
    const masterySection = document.createElement("section");
    masterySection.className = "card beta179-profile-mastery";
    const dueReviews = validReviewEntries().length;
    const memoryReviews = allReviewEntries().length;
    masterySection.innerHTML = `<div class="section-title-row"><div><span class="card-label">Maîtrise par domaine</span><h2>Ce que tu sais vraiment</h2><p>Une erreur revient demain, puis quelques jours plus tard : la maîtrise mesure désormais la mémorisation, pas seulement le quiz réussi une fois.</p></div><button type="button" class="ghost" data-beta179-review="">${dueReviews ? `Réviser (${dueReviews})` : memoryReviews ? `${memoryReviews} programmée${memoryReviews > 1 ? "s" : ""}` : "Mémoire à jour"}</button></div><div class="beta179-mastery-list">${masteryBarsMarkup()}</div>`;

    const collections = prioritizedCollections();
    const unlockedCount = collections.filter(definition => state.collectionUnlocks?.[definition.id] || collectionProgress(definition).complete).length;
    const collectionSection = document.createElement("section");
    collectionSection.className = "card beta179-profile-collections";
    collectionSection.innerHTML = `<div class="section-title-row"><div><span class="card-label">Collections</span><h2>${HD_ICONS.action("medal")} ${unlockedCount} médaille${unlockedCount > 1 ? "s" : ""} débloquée${unlockedCount > 1 ? "s" : ""}</h2><p>Chaque médaille correspond à un thème réellement terminé, pas à un achat ni à un simple niveau.</p></div><button type="button" class="ghost" data-beta180-collections-all>Voir les ${collections.length}</button></div><div class="beta179-collection-grid">${collectionCardsMarkup(collections, 4)}</div>`;

    const weeklyWrapper = document.createElement("div");
    weeklyWrapper.innerHTML = weeklyProgressMarkup();
    const weeklySection = weeklyWrapper.firstElementChild;
    const cultureCard = root.querySelector(".culture-profile-card");
    const profileCard = root.querySelector(".public-profile-card") || root.querySelector(".topbar");
    if (cultureCard) {
      cultureCard.insertAdjacentElement("beforebegin", weeklySection);
      weeklySection.insertAdjacentElement("afterend", masterySection);
      cultureCard.insertAdjacentElement("afterend", collectionSection);
    } else if (profileCard) {
      profileCard.insertAdjacentElement("afterend", weeklySection);
      weeklySection.insertAdjacentElement("afterend", masterySection);
      masterySection.insertAdjacentElement("afterend", collectionSection);
    } else return;
    bindProgressionActions(weeklySection);
    bindProgressionActions(masterySection);
    bindProgressionActions(collectionSection);
  }

  function relatedLessonsFor(lesson, limit = 3) {
    if (!lesson) return [];
    const world = lessonWorld(lesson);
    const disciplineId = worldDisciplineId(world);
    const tokens = new Set(String(lesson.title || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/[^a-z0-9]+/).filter(token => token.length > 4));
    return curatedLessons()
      .filter(candidate => candidate.id !== lesson.id && !lessonLockedByDailyMystery(candidate) && lessonDisciplineId(candidate) === disciplineId)
      .map(candidate => {
        const candidateWorld = lessonWorld(candidate);
        const candidateTokens = String(candidate.title || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/[^a-z0-9]+/).filter(token => token.length > 4);
        const shared = candidateTokens.filter(token => tokens.has(token)).length;
        let score = 0;
        if (candidateWorld.id === world.id) score += 100;
        if (candidateWorld.group && candidateWorld.group === world.group) score += 35;
        if (!lessonDone(candidate.id)) score += 18;
        score += shared * 8;
        return { candidate, score };
      })
      .sort((a, b) => b.score - a.score || Number(lessonDone(a.candidate.id)) - Number(lessonDone(b.candidate.id)) || String(a.candidate.title).localeCompare(String(b.candidate.title), "fr"))
      .slice(0, limit)
      .map(item => item.candidate);
  }

  function injectRelatedCourses() {
    const root = document.getElementById("app");
    if (!root || root.querySelector(".beta179-related-courses")) return;
    const lesson = lessonById(state.currentLessonId);
    if (!lesson || !(lessonDone(lesson.id) || lessonQuizPassed(lesson.id))) return;
    const related = relatedLessonsFor(lesson);
    if (!related.length) return;
    const section = document.createElement("section");
    section.className = "card beta179-related-courses";
    section.innerHTML = `<div class="section-title-row"><div><span class="card-label">Cours connexes</span><h2>Tu as aimé ce sujet ?</h2><p>Poursuis avec une notion proche, dans le même thème ou le même grand chapitre.</p></div><small>${related.length} suggestions</small></div><div class="beta179-related-grid">${related.map(candidate => { const world = lessonWorld(candidate); return `<button type="button" data-beta179-related="${esc(candidate.id)}" class="${lessonDone(candidate.id) ? "done" : ""}"><span>${HD_ICONS.lesson(candidate, world, null)}</span><strong>${esc(candidate.title)}</strong><small>${esc(world.title)} · ${lessonDone(candidate.id) ? "validé" : "à découvrir"}</small></button>`; }).join("")}</div>`;
    const target = root.querySelector(".reading-card");
    target?.insertAdjacentElement("afterend", section);
    bindProgressionActions(section);
  }

  const previousHandleQuizChoice = handleQuizChoice;
  handleQuizChoice = function beta180HandleQuizChoice(lessonId, questionIndex, choiceIndex) {
    const wasCompleted = Boolean(lessonDone(lessonId));
    const rescueValidation = Object.values(state.mysteryCourseRescue || {}).some(entry => Boolean(entry?.active) && String(entry?.lessonId || "") === String(lessonId));
    let tracking = null;
    try {
      const lesson = lessonById(lessonId);
      const progress = lessonQuizState(String(lessonId));
      if (lesson && !Number.isInteger(progress.answers?.[questionIndex]) && !progress.passed && !lessonDone(lesson.id)) {
        const record = questionRecord(lesson, questionIndex);
        const choice = record?.choices?.[Number(choiceIndex)];
        tracking = { lesson, item: record?.item, correct: Boolean(choice?.correct), questionIndex: Number(questionIndex) };
      }
    } catch {}
    const result = previousHandleQuizChoice(lessonId, questionIndex, choiceIndex);
    if (tracking && !tracking.correct) queueWrongAnswer(tracking.lesson, tracking.questionIndex, tracking.item);
    if ((!wasCompleted && lessonDone(lessonId)) || (rescueValidation && lessonQuizPassed(lessonId))) trackDailyActivity("course", { lessonId });
    window.setTimeout(() => { reconcileCollections({ notify: true }); reconcileDailyPlanBonus({ notify: true }); reconcileWeeklyReward({ notify: true }); }, 0);
    return result;
  };

  const previousCompleteLesson = completeLesson;
  completeLesson = function beta180CompleteLesson(lessonId) {
    const wasCompleted = Boolean(lessonDone(lessonId));
    const result = previousCompleteLesson(lessonId);
    if (!wasCompleted && lessonDone(lessonId)) trackDailyActivity("course", { lessonId });
    window.setTimeout(() => { reconcileCollections({ notify: true }); reconcileDailyPlanBonus({ notify: true }); reconcileWeeklyReward({ notify: true }); }, 0);
    return result;
  };

  if (typeof submitGuess === "function") {
    const previousSubmitGuess = submitGuess;
    submitGuess = function beta180SubmitGuess(...args) {
      const result = previousSubmitGuess.apply(this, args);
      window.setTimeout(() => { reconcileDailyPlanBonus({ notify: true }); reconcileWeeklyReward({ notify: true }); }, 0);
      return result;
    };
  }

  const previousRenderLearn = renderLearn;
  renderLearn = function beta179RenderLearn() {
    previousRenderLearn();
    try { injectLearnProgression(); } catch (error) { try { console.warn("beta179 learn progression", error); } catch {} }
  };

  const previousRenderHome = renderHome;
  renderHome = function beta179RenderHome() {
    previousRenderHome();
    try { injectHomeProgression(); } catch (error) { try { console.warn("beta179 home progression", error); } catch {} }
  };

  const previousRenderProfile = renderProfile;
  renderProfile = function beta179RenderProfile() {
    previousRenderProfile();
    try { injectProfileProgression(); } catch (error) { try { console.warn("beta179 profile progression", error); } catch {} }
  };

  const previousRenderLesson = renderLesson;
  renderLesson = function beta179RenderLesson() {
    previousRenderLesson();
    try { injectRelatedCourses(); } catch (error) { try { console.warn("beta179 related courses", error); } catch {} }
  };

  const style = document.createElement("style");
  style.id = "beta179-progression-style";
  style.textContent = `
    .beta179-learning-hub,.beta179-home-progress,.beta179-profile-mastery,.beta179-profile-collections,.beta179-related-courses{border-color:color-mix(in srgb,var(--progression-accent,var(--accent)) 35%,rgba(255,255,255,.12));background:linear-gradient(180deg,color-mix(in srgb,var(--progression-accent,var(--accent)) 10%,rgba(255,255,255,.045)),rgba(255,255,255,.035));}
    .beta179-big-percent{font-size:1.55rem;color:var(--progression-accent,var(--accent));white-space:nowrap}.beta179-master-bar,.beta179-mastery-bar,.beta179-mini-progress{height:8px;border-radius:999px;overflow:hidden;background:rgba(255,255,255,.08)}.beta179-master-bar{height:11px;margin:14px 0}.beta179-master-bar i,.beta179-mastery-bar i,.beta179-mini-progress i{display:block;height:100%;border-radius:inherit;background:var(--progression-accent,var(--mastery-accent,var(--collection-accent,var(--accent))));transition:width .35s ease}
    .beta179-hub-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.beta179-hub-grid>div{display:grid;align-content:start;gap:7px;min-height:145px;padding:14px;border:1px solid rgba(255,255,255,.08);border-radius:17px;background:rgba(3,8,18,.28)}.beta179-hub-grid b{font-size:.92rem}.beta179-hub-grid span{font-size:.88rem;line-height:1.4;opacity:.88}.beta179-hub-grid em{font-size:.77rem;line-height:1.35;opacity:.62;font-style:normal}.beta179-hub-grid button{margin-top:auto;background:rgba(255,255,255,.09);color:#f8fafc;border:1px solid rgba(255,255,255,.14);font-weight:850}
    .beta179-home-progress-actions{display:flex;gap:12px;align-items:center;justify-content:space-between}.beta179-home-progress-actions span{font-size:.9rem;opacity:.86}.beta179-home-progress-actions button{flex:0 0 auto}
    .beta179-mastery-list{display:grid;gap:13px}.beta179-mastery-row{display:grid;grid-template-columns:34px minmax(0,1fr);gap:11px;align-items:center}.beta179-mastery-row>span{font-size:1.35rem;text-align:center}.beta179-mastery-row>div>div:first-child{display:flex;justify-content:space-between;gap:12px;margin-bottom:6px}.beta179-mastery-row b{color:var(--mastery-accent)}.beta179-mastery-row small{display:block;margin-top:5px;opacity:.65}
    .beta179-collection-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.beta179-collection-card{display:grid;grid-template-columns:48px minmax(0,1fr);gap:12px;padding:14px;border:1px solid rgba(255,255,255,.08);border-radius:18px;background:rgba(3,8,18,.3);opacity:.76}.beta179-collection-card.unlocked{opacity:1;border-color:color-mix(in srgb,var(--collection-accent) 42%,rgba(255,255,255,.12));background:linear-gradient(145deg,color-mix(in srgb,var(--collection-accent) 12%,rgba(3,8,18,.38)),rgba(3,8,18,.32))}.beta179-medal{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;font-size:1.5rem;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}.beta179-collection-card h3{margin:0 0 4px;font-size:.96rem}.beta179-collection-card p{margin:0 0 8px;font-size:.79rem;line-height:1.38;opacity:.68}.beta179-collection-card small{display:block;margin-top:6px;opacity:.72}
    .beta179-related-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.beta179-related-grid button{display:grid;grid-template-columns:36px minmax(0,1fr);grid-template-areas:"icon title" "icon meta";gap:3px 9px;text-align:left;align-items:center;padding:14px;border-radius:17px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09)}.beta179-related-grid button:hover{transform:translateY(-1px);border-color:rgba(255,255,255,.22)}.beta179-related-grid button>span{grid-area:icon;font-size:1.45rem}.beta179-related-grid strong{grid-area:title;font-size:.9rem;line-height:1.3}.beta179-related-grid small{grid-area:meta;opacity:.62}.beta179-related-grid button.done{border-color:rgba(72,213,151,.3)}
    .beta179-modal-open{overflow:hidden}.beta179-modal{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:18px}.beta179-modal-backdrop{position:absolute;inset:0;background:rgba(1,4,10,.76);backdrop-filter:blur(9px)}.beta179-modal-panel{position:relative;z-index:1;width:min(720px,100%);max-height:min(850px,calc(100dvh - 36px));overflow:auto;border:1px solid rgba(255,255,255,.13);border-radius:24px;background:linear-gradient(180deg,#101b2b,#070d18);box-shadow:0 30px 90px rgba(0,0,0,.55)}.beta179-modal-panel>header{position:sticky;top:0;z-index:2;display:flex;justify-content:space-between;gap:18px;align-items:flex-start;padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(9,15,26,.92);backdrop-filter:blur(12px)}.beta179-modal-panel h2{margin:4px 0 0}.beta179-modal-close{min-width:42px}.beta179-modal-content{padding:20px}
    .beta179-session-progress{display:grid;grid-template-columns:auto minmax(100px,1fr) auto;gap:12px;align-items:center;margin-bottom:16px;font-size:.82rem}.beta179-session-progress>div{height:7px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden}.beta179-session-progress i{display:block;height:100%;background:var(--accent);border-radius:inherit}.beta179-question-card{padding:18px;border:1px solid rgba(255,255,255,.09);border-radius:20px;background:rgba(255,255,255,.035)}.beta179-question-card>small{opacity:.68}.beta179-question-card h3{font-size:1.25rem;line-height:1.4;margin:12px 0 17px}.beta179-answer-grid{display:grid;gap:9px}.beta179-answer-grid button{display:grid;grid-template-columns:32px minmax(0,1fr);gap:9px;text-align:left;align-items:center;padding:12px;border-radius:14px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09)}.beta179-answer-grid button span{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,.08);font-weight:900}.beta179-answer-grid button.correct{border-color:rgba(72,213,151,.65);background:rgba(72,213,151,.12)}.beta179-answer-grid button.wrong{border-color:rgba(248,113,113,.62);background:rgba(248,113,113,.1)}.beta179-answer-feedback{margin-top:15px}.beta179-answer-feedback p{padding:12px 14px;border-radius:14px;line-height:1.45}.beta179-answer-feedback p.good{background:rgba(72,213,151,.1);border:1px solid rgba(72,213,151,.28)}.beta179-answer-feedback p.bad{background:rgba(248,113,113,.09);border:1px solid rgba(248,113,113,.25)}.beta179-answer-feedback p span{float:right;color:#48d597;font-weight:900}.beta179-answer-feedback button{width:100%;margin-top:8px}
    .beta179-session-summary,.beta179-empty-state{text-align:center;padding:22px 8px}.beta179-summary-icon{font-size:3rem}.beta179-session-summary h3,.beta179-empty-state b{display:block;font-size:1.45rem;margin:10px 0}.beta179-session-summary p,.beta179-empty-state p{max-width:520px;margin:0 auto 18px;line-height:1.55;opacity:.8}.beta179-summary-stats{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin:16px 0}.beta179-summary-stats span{padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.06);font-weight:800}.beta179-summary-actions{display:flex;gap:10px;justify-content:center}.beta179-summary-actions button{min-width:150px}
    .beta179-progression-toast{position:fixed;left:50%;bottom:calc(92px + env(safe-area-inset-bottom));z-index:11000;max-width:min(440px,calc(100vw - 30px));padding:13px 17px;border:1px solid rgba(246,196,83,.4);border-radius:999px;background:rgba(10,18,30,.96);box-shadow:0 16px 45px rgba(0,0,0,.38);font-weight:850;text-align:center;transform:translate(-50%,18px);opacity:0;transition:.22s ease}.beta179-progression-toast.show{transform:translate(-50%,0);opacity:1}

    .beta180-daily-plan{--progression-accent:var(--discipline-accent,var(--accent));padding:17px}.beta180-plan-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.beta180-plan-head h2{margin:.2rem 0 .25rem}.beta180-plan-head p{margin:0;opacity:.72}.beta180-plan-head>strong{padding:7px 10px;border-radius:999px;background:color-mix(in srgb,var(--progression-accent) 16%,transparent);color:color-mix(in srgb,var(--progression-accent) 80%,white);white-space:nowrap}.beta180-plan-meter{height:8px;margin:13px 0;border-radius:999px;overflow:hidden;background:rgba(255,255,255,.08)}.beta180-plan-meter i{display:block;height:100%;border-radius:inherit;background:var(--progression-accent);transition:width .3s ease}.beta180-plan-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.beta180-plan-steps button{display:grid;grid-template-columns:28px minmax(0,1fr);gap:8px;align-items:center;text-align:left;padding:10px;border-radius:14px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.075);color:inherit}.beta180-plan-steps button>b{display:grid;place-items:center;width:27px;height:27px;border-radius:50%;background:rgba(255,255,255,.08);font-size:.78rem}.beta180-plan-steps button span{font-size:.82rem;font-weight:850;line-height:1.25}.beta180-plan-steps button small{display:block;margin-top:3px;font-size:.69rem;font-weight:600;opacity:.6}.beta180-plan-steps button.current{border-color:color-mix(in srgb,var(--progression-accent) 55%,rgba(255,255,255,.1));background:color-mix(in srgb,var(--progression-accent) 10%,rgba(255,255,255,.025))}.beta180-plan-steps button.done{opacity:.72}.beta180-plan-steps button.done>b{background:rgba(72,213,151,.16);color:#72e5ad}.beta180-plan-footer{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:11px}.beta180-plan-footer span{font-size:.8rem;opacity:.72}.beta180-plan-footer button{padding:9px 14px}.beta180-collection-filters{display:flex;gap:8px;overflow:auto;margin-bottom:15px;padding-bottom:3px}.beta180-collection-filters button{flex:0 0 auto;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.09)}.beta180-collection-filters button.active{background:var(--accent);color:#06101d}.beta180-collection-open{margin-top:9px;padding:7px 10px;font-size:.75rem}.beta180-all-collections .beta179-collection-card{opacity:.9}
    .beta181-learning-hub .beta179-master-bar{margin-bottom:12px}.beta181-path-card{display:grid;grid-template-columns:48px minmax(0,1fr) auto;gap:12px;align-items:center;padding:14px;border:1px solid color-mix(in srgb,var(--progression-accent) 32%,rgba(255,255,255,.09));border-radius:18px;background:color-mix(in srgb,var(--progression-accent) 8%,rgba(255,255,255,.025))}.beta181-path-card.complete{border-color:rgba(72,213,151,.28);background:rgba(72,213,151,.06)}.beta181-path-icon{display:grid;place-items:center;width:46px;height:46px;border-radius:15px;background:rgba(255,255,255,.07);font-size:1.45rem}.beta181-path-card span{font-size:.7rem;font-weight:900;letter-spacing:.04em;text-transform:uppercase;opacity:.62}.beta181-path-card h3{margin:2px 0 3px;font-size:1.03rem}.beta181-path-card p{margin:0;font-size:.78rem;opacity:.68}.beta181-path-card button{padding:10px 14px;white-space:nowrap}.beta181-progress-actions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:9px}.beta181-progress-actions button{display:flex;flex-direction:column;align-items:flex-start;gap:3px;padding:11px 12px;text-align:left;border:1px solid rgba(255,255,255,.075);border-radius:14px;background:rgba(255,255,255,.03);color:inherit}.beta181-progress-actions button b{font-size:.78rem}.beta181-progress-actions button span{font-size:.67rem;line-height:1.35;opacity:.62}.beta181-progress-actions button.urgent{border-color:rgba(246,196,83,.32);background:rgba(246,196,83,.055)}.beta181-progress-actions button:disabled{opacity:.68;cursor:default}.beta181-week-strip{display:grid;grid-template-columns:auto minmax(70px,1fr) auto;gap:7px 10px;align-items:center;margin-top:12px;padding-top:11px;border-top:1px solid rgba(255,255,255,.075);font-size:.72rem}.beta181-week-strip>span{font-weight:900}.beta181-week-strip>div{height:6px;border-radius:999px;overflow:hidden;background:rgba(255,255,255,.08)}.beta181-week-strip>div i{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--progression-accent),#f6c453)}.beta181-week-strip>b{font-size:.7rem}.beta181-week-strip>small{grid-column:2/-1;opacity:.6}.beta181-weekly-card{border-color:rgba(246,196,83,.25);background:linear-gradient(180deg,rgba(246,196,83,.07),rgba(255,255,255,.03))}.beta181-weekly-card>.section-title-row>strong{padding:8px 11px;border-radius:999px;background:rgba(246,196,83,.12);color:#f8d977;white-space:nowrap}.beta181-week-goals{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.beta181-week-goal{display:grid;grid-template-columns:30px minmax(0,1fr) auto;gap:9px;align-items:center;padding:11px;border:1px solid rgba(255,255,255,.075);border-radius:15px;background:rgba(255,255,255,.025)}.beta181-week-goal>span{font-size:1.15rem}.beta181-week-goal b{display:block;font-size:.76rem}.beta181-week-goal i{display:block;height:5px;margin-top:6px;border-radius:999px;overflow:hidden;background:rgba(255,255,255,.08)}.beta181-week-goal i em{display:block;height:100%;background:#f6c453;border-radius:inherit}.beta181-week-goal strong{font-size:.75rem}.beta181-week-goal.done{border-color:rgba(72,213,151,.25)}.beta181-week-goal.done i em{background:#48d597}.beta181-week-note{margin:10px 0 0;font-size:.76rem;opacity:.65}.beta181-learning-hub~.ready-strip{display:none}
    @media(max-width:700px){.beta181-path-card{grid-template-columns:42px minmax(0,1fr)}.beta181-path-card button{grid-column:1/-1;width:100%}.beta181-progress-actions{grid-template-columns:1fr 1fr}.beta181-progress-actions button:last-child{grid-column:1/-1}.beta181-week-goals{grid-template-columns:1fr}.beta181-weekly-card>.section-title-row>strong{font-size:.75rem}.beta180-plan-steps{grid-template-columns:1fr}.beta180-plan-steps button{padding:9px}.beta180-plan-head p{display:none}.beta180-plan-footer{align-items:stretch}.beta180-plan-footer button{flex:0 0 auto}.beta179-hub-grid,.beta179-related-grid{grid-template-columns:1fr}.beta179-hub-grid>div{min-height:0}.beta179-collection-grid{grid-template-columns:1fr}.beta179-home-progress-actions{align-items:stretch;flex-direction:column}.beta179-home-progress-actions button{width:100%}.beta179-modal{padding:0;align-items:end}.beta179-modal-panel{width:100%;max-height:94dvh;border-radius:24px 24px 0 0}.beta179-modal-content{padding:16px}.beta179-session-progress{grid-template-columns:auto 1fr}.beta179-session-progress b{grid-column:1/-1;text-align:right}.beta179-summary-actions{flex-direction:column}.beta179-summary-actions button{width:100%}}
  `;
  if (!document.getElementById(style.id)) document.head.appendChild(style);

  pruneDailyLearningLogs();
  pruneWeeklyRewards();
  reconcileCollections({ notify: false });
  reconcileDailyPlanBonus({ notify: false });
  reconcileWeeklyReward({ notify: false });
  persistSoon();

  // Les extensions sont chargées après le premier rendu de l’app : repeindre une fois
  // garantit que les nouveaux blocs apparaissent dès l’ouverture, sans navigation préalable.
  try {
    if (typeof renderSoon === "function") renderSoon();
    else if (typeof render === "function") render({ immediate: true });
  } catch {}

  try {
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      progressionSystems: true,
      dailyPlan: true,
      weeklyGoals: true,
      guidedPath: true,
      spacedReview: true,
      collections: collectionDefinitions().length,
      reviews: validReviewEntries().length,
      synthesisSize: SYNTHESIS_SIZE,
      progressionDebug: {
        applyReviewAnswer,
        dailyPlanStatus,
        weeklyStatus,
        reconcileWeeklyReward,
        activePathProgress,
        allReviewEntries,
        openReviewSession,
        openDailyCourse,
        relatedLessonsFor
      },
      auditProgression() {
        return {
          version: VERSION,
          lessons: curatedLessons().length,
          collections: collectionDefinitions().length,
          unlockedCollections: Object.keys(state.collectionUnlocks || {}).length,
          reviewDue: validReviewEntries().length,
          reviewMemory: allReviewEntries().length,
          dailyPlan: dailyPlanStatus(),
          weekly: weeklyStatus(),
          path: activePathProgress(activeDisciplineId()),
          synthesisPassed: Object.keys(state.synthesisPassed || {}).length,
          mastery: Object.fromEntries(DISCIPLINES.map(discipline => [discipline.id, disciplineMastery(discipline.id)]))
        };
      }
    };
  } catch {}
})();
