/* HistoDaily 1.0.0-rc.36.0 — generated bundle. Source order is intentional. */

/* ===== SOURCE: app-runtime.js ===== */
/* HistoDaily LTS — comportements métier et expérience active */

/* ===== mystery-rescue.js ===== */

/* HistoDaily beta 178 — dernier indice = cours correspondant. */
(function histodailyBeta178CourseRescue(){
  const VERSION = "1.0.0-rc.22.0";
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
      return `<section class="mystery-rescue-panel beta178-course-rescue unavailable"><div class="mystery-rescue-head"><span>Dernier recours</span><strong>Cours en préparation</strong></div><p>Le cours correspondant n’est pas encore publié pour ce dossier.</p></section>`;
    }
    if (!entry?.active) {
      return `<section class="mystery-rescue-panel beta178-course-rescue">
        <div class="mystery-rescue-head"><span>Dernier indice</span><strong>Apprendre plutôt que révéler</strong></div>
        <p>Ouvre le cours correspondant : <b>${escapeHtml(lesson.title)}</b>. La solution deviendra évidente, mais le mystère ne sera validé qu’après le quiz du cours.</p>
        <button type="button" class="wide mystery-rescue-open" data-start-course-rescue>Étudier le cours et sauver ma série</button>
        <p class="microcopy rescue-note">Récompense réduite à ${RESCUE_SCORE} XP. La série quotidienne peut être prolongée, mais le classement distingue clairement ce sauvetage d’une résolution normale.</p>
      </section>`;
    }
    return `<section class="mystery-rescue-panel beta178-course-rescue active">
      <div class="mystery-rescue-head"><span>Cours de secours en cours</span><strong>${escapeHtml(lesson.title)}</strong></div>
      <p>Lis le cours puis réussis à nouveau son quiz, même si tu l’avais déjà validé auparavant. Le mystère sera alors sauvé automatiquement.</p>
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
    banner.innerHTML = `<span class="card-label">Cours de secours</span><h2>Ce cours remplace le dernier indice</h2><p>Lis le contenu puis réussis le quiz complet pour sauver le mystère <b>${escapeHtml(mystery.caseTitle || "du jour")}</b>. Récompense du mystère : ${RESCUE_SCORE} XP, sans gemme.</p><small>Le simple fait d’ouvrir ou de relire le cours ne valide rien, même si tu l’avais déjà terminé.</small>`;
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

  // Styles consolidés dans app.css.


  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, mysteryCourseRescue: true, rescueScore: RESCUE_SCORE };
  } catch {}
})();


/* ===== social-runtime.js ===== */

/* HistoDaily beta 178 — runtime multijoueur isolé.
   Le moteur solo reste inchangé. Ce module corrige uniquement les appels API,
   les demandes par code et la sémantique des classements. */
(() => {
  "use strict";
  const VERSION = "1.0.0-beta.213.0";
  const API_TIMEOUT_MS = 8000;
  const VALID_SCOPES = new Set(["daily", "week", "year", "friends"]);

  function esc(value) {
    try { return escapeHtml(String(value ?? "")); }
    catch { return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[ch])); }
  }
  function code(value = "") {
    try { return normalizeFriendCode(value); }
    catch { return String(value || "").trim().toUpperCase().replace(/\s+/g, "").replace(/[^A-Z0-9-]/g, ""); }
  }
  function sameIdentity(row = {}, mine = {}) {
    const rowId = String(row.playerId || row.player_id || row.id || "");
    const myId = String(mine.playerId || mine.player_id || mine.id || "");
    const rowCode = code(row.friendCode || row.friend_code || row.code || "");
    const myCode = code(mine.friendCode || mine.friend_code || mine.code || "");
    return Boolean((rowId && myId && rowId === myId) || (rowCode && myCode && rowCode === myCode));
  }

  /* Tous les appels /api/v1 ont désormais une fin déterministe : aucun écran social
     ne peut rester bloqué indéfiniment sur une requête réseau. */
  if (!window.__HISTODAILY_API_TIMEOUT_V176__) {
    const nativeFetch = window.fetch.bind(window);
    window.fetch = function histodailyFetch(input, options = {}) {
      let pathname = "";
      try { pathname = new URL(typeof input === "string" ? input : input.url, location.href).pathname; } catch {}
      if (!pathname.startsWith("/api/v1/") || options.signal || typeof AbortController !== "function") {
        return nativeFetch(input, options);
      }
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), API_TIMEOUT_MS);
      return nativeFetch(input, { ...options, signal: controller.signal }).finally(() => window.clearTimeout(timer));
    };
    window.__HISTODAILY_API_TIMEOUT_V176__ = true;
  }

  /* Un score de classement correspond au mystère résolu, pas à l'XP totale du compte. */
  scorePayloadForMystery = function beta176ScorePayloadForMystery(mysteryId) {
    const mystery = data.mysteries.find(item => item.id === mysteryId) || {};
    const solved = state.solvedMysteries?.[mysteryId] || {};
    const score = Math.max(0, Number(solved.score || mysteryScore(mysteryId) || 0));
    return {
      playerId: playerIdMe(),
      pseudo: currentPseudo(),
      friendCode: friendCode(),
      mysteryId,
      dayKey: localDayKey(solved.at || Date.now()),
      score,
      hints: Math.max(0, Number(solved.hints || 0)),
      tries: Math.max(1, Number(solved.tries || 1)),
      difficulty: mystery.difficulty || "moyen",
      solvedAt: solved.at || Date.now(),
      level: level(),
      xp: Math.max(0, Number(state.xp || 0)),
      solvedCount: Object.keys(state.solvedMysteries || {}).length,
      streak: Math.max(0, Number(state.streak || 0))
    };
  };

  myPlayerProfile = function beta176MyPlayerProfile() {
    return {
      id: playerIdMe(),
      playerId: playerIdMe(),
      friendCode: code(friendCode()),
      name: state.pseudo || "Invité",
      avatar: String(state.pseudo || "I").trim().charAt(0).toUpperCase() || "I",
      bio: "Ton profil HistoDaily.",
      level: level(),
      xp: Math.max(0, Number(state.xp || 0)),
      solved: Object.keys(state.solvedMysteries || {}).length,
      streak: Math.max(0, Number(state.streak || 0)),
      badges: myBadges(),
      daily: scoreForScope("daily"),
      week: scoreForScope("week"),
      year: scoreForScope("year"),
      me: true,
      friend: true
    };
  };

  scoreOfPlayer = function beta176ScoreOfPlayer(player = {}, scope = "daily") {
    const safeScope = VALID_SCOPES.has(scope) ? scope : "daily";
    if (player.me) return scoreForScope(safeScope === "friends" ? "daily" : safeScope);
    if (safeScope === "week") return Math.max(0, Number(player.week || player.score || 0));
    if (safeScope === "year") return Math.max(0, Number(player.year || player.score || 0));
    return Math.max(0, Number(player.daily || player.score || 0));
  };

  leaderboardRows = function beta176LeaderboardRows(scope = state.rankScope || "daily") {
    const safeScope = VALID_SCOPES.has(scope) ? scope : "daily";
    const localScope = safeScope === "friends" ? "daily" : safeScope;
    const mine = myPlayerProfile();
    const myScore = scoreForScope(localScope);
    let rows = [];
    try { rows = remoteLeaderboardRows(safeScope) || []; } catch { rows = []; }

    const map = new Map();
    for (const raw of rows) {
      const id = code(raw.friendCode || raw.friend_code || raw.code || "") || String(raw.playerId || raw.player_id || raw.id || raw.name || "");
      if (!id) continue;
      const me = sameIdentity(raw, mine);
      const normalized = {
        ...raw,
        id: raw.id || raw.playerId || raw.player_id || id,
        playerId: raw.playerId || raw.player_id || raw.id || "",
        friendCode: code(raw.friendCode || raw.friend_code || raw.code || ""),
        name: raw.name || raw.pseudo || "Joueur",
        score: Math.max(0, Number(raw.score || 0)),
        me
      };
      const previous = map.get(id);
      if (!previous || normalized.score > previous.score || me) map.set(id, normalized);
    }

    const mineKey = code(mine.friendCode) || mine.playerId;
    const currentMe = Array.from(map.values()).find(row => row.me || sameIdentity(row, mine));
    if (currentMe) {
      currentMe.me = true;
      // La ligne personnelle doit refléter exactement le même total local que le résumé.
      // Un ancien score serveur corrompu (ex. XP totale envoyée comme score de mystère)
      // ne doit plus prendre le dessus avec Math.max().
      currentMe.score = myScore;
      currentMe.daily = localScope === "daily" ? myScore : Number(currentMe.daily || 0);
      currentMe.week = localScope === "week" ? myScore : Number(currentMe.week || 0);
      currentMe.year = localScope === "year" ? myScore : Number(currentMe.year || 0);
      currentMe.xp = Math.max(Number(currentMe.xp || 0), Number(mine.xp || 0));
      map.set(code(currentMe.friendCode) || currentMe.playerId || mineKey, currentMe);
    } else if (myScore > 0 || !rows.length) {
      map.set(mineKey, { ...mine, score: myScore, me: true, localOnly: true });
    }

    return Array.from(map.values())
      .filter(Boolean)
      .sort((a, b) => Number(b.score || 0) - Number(a.score || 0) || String(a.name || "").localeCompare(String(b.name || ""), "fr"))
      .map((row, index) => ({ ...row, rank: index + 1 }));
  };

  /* Vérification du code auprès du serveur avant de créer une demande locale.
     Un code inexistant ne devient plus une demande fantôme impossible à accepter. */
  addFriend = async function beta176AddFriend(event) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    const form = event?.target?.closest?.("[data-add-friend]") || document.querySelector("[data-add-friend]");
    const input = form?.querySelector?.("[data-friend-code-input],input[name='friendCode'],input");
    const raw = String(input?.value || state.friendCodeDraft || "").trim();
    const parsed = parseFriendCode(raw);
    if (!parsed) return setState({ friendFeedback: "Code ami invalide. Format attendu : PSEUDO-ABC123.", friendCodeDraft: raw.toUpperCase() });
    const targetCode = code(parsed.code || parsed.id || raw);
    if (targetCode === code(friendCode())) return setState({ friendFeedback: "C’est ton propre code ami.", friendCodeDraft: raw.toUpperCase() });
    if (knownFriendByCode(targetCode)) return setState({ friendFeedback: `${parsed.pseudo || "Ce joueur"} est déjà dans tes amis.`, friendCodeDraft: "" });
    if (!isOnline) {
      state.friendCodeDraft = raw.toUpperCase();
      state.friendFeedback = "Connexion nécessaire pour vérifier ce code et envoyer la demande.";
      queueSaveState(100);
      return render({ immediate: true });
    }
    state.friendFeedback = "Vérification du code ami…";
    render({ immediate: true });
    try {
      const response = await fetch(`/api/v1/friends/profile?friendCode=${encodeURIComponent(targetCode)}&viewerPlayerId=${encodeURIComponent(playerIdMe())}&viewerFriendCode=${encodeURIComponent(friendCode())}&_=${Date.now()}`, { cache: "no-store" });
      const json = await response.json().catch(() => ({}));
      if (!response.ok || json?.ok === false || !json.profile) {
        state.friendFeedback = json?.message || "Aucun profil ne correspond à ce code ami.";
        state.friendCodeDraft = raw.toUpperCase();
        queueSaveState(100);
        return render({ immediate: true });
      }
      if (input) input.value = "";
      state.friendCodeDraft = "";
      const profile = json.profile;
      return beta125SendFriendRequest({
        id: profile.playerId || profile.id || targetCode,
        playerId: profile.playerId || profile.id || "",
        code: code(profile.friendCode || profile.code || targetCode),
        friendCode: code(profile.friendCode || profile.code || targetCode),
        name: profile.name || profile.pseudo || parsed.pseudo || "Joueur",
        pseudo: profile.name || profile.pseudo || parsed.pseudo || "Joueur",
        avatar: String(profile.name || profile.pseudo || parsed.pseudo || "J").charAt(0).toUpperCase(),
        level: Number(profile.level || 1),
        xp: Number(profile.xp || 0),
        solved: Number(profile.solved || profile.solved_count || 0),
        streak: Number(profile.streak || 0),
        server: true
      });
    } catch (error) {
      state.friendFeedback = error?.name === "AbortError" ? "Le serveur social ne répond pas. Réessaie." : "Impossible de vérifier ce code pour le moment.";
      state.friendCodeDraft = raw.toUpperCase();
      queueSaveState(100);
      return render({ immediate: true });
    }
  };

  const repairedScopeKeys = new Set();
  function repairOwnScoresForScope(scope = "daily") {
    const safeScope = VALID_SCOPES.has(scope) ? scope : "daily";
    const localScope = safeScope === "friends" ? "daily" : safeScope;
    if (!isOnline || typeof submitScoreToServer !== "function" || typeof scorePayloadForMystery !== "function") return;
    const key = `${localScope}:${localDayKey()}:${playerIdMe()}`;
    if (repairedScopeKeys.has(key)) return;
    repairedScopeKeys.add(key);
    const range = rangeForScope(localScope);
    const ids = Object.entries(state.solvedMysteries || {})
      .filter(([, solved]) => {
        const at = Number(solved?.at || 0);
        return at >= range.start && at < range.end;
      })
      .map(([id]) => id)
      .filter(Boolean);
    if (!ids.length) return;
    Promise.all(ids.map(id => submitScoreToServer(scorePayloadForMystery(id)).catch(() => null)))
      .then(() => fetchServerLeaderboard(safeScope, { force: true }).catch(() => null))
      .then(() => {
        if (state.tab === "rank" && state.rankScope === safeScope) render({ immediate: true });
      })
      .catch(() => {});
  }

  function scoreLabel(scope) {
    if (scope === "week") return "Score de la semaine";
    if (scope === "year") return "Score de l’année";
    return "Score du jour";
  }
  function rankRowsMarkup(rows) {
    return rows.map(row => {
      const id = String(row.id || row.playerId || row.player_id || row.friendCode || row.friend_code || "");
      const name = row.name || row.pseudo || "Joueur";
      return `<div class="rank-row${row.me ? " me" : ""} beta167-rank-row"><span>${row.rank || "—"}</span><strong>${esc(name)}</strong><em>${Number(row.score || 0)} pts</em>${id ? `<button type="button" class="rank-profile-btn" data-view-profile="${esc(id)}">Profil</button>` : `<span class="rank-profile-spacer"></span>`}</div>`;
    }).join("");
  }
  function bindRankActions() {
    document.querySelectorAll("[data-rank-scope]").forEach(button => {
      button.onclick = event => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        const scope = VALID_SCOPES.has(button.dataset.rankScope) ? button.dataset.rankScope : "daily";
        setState({ tab: "rank", rankScope: scope }, { save: true });
        try { window.scrollTo({ top: 0, behavior: "auto" }); } catch {}
      };
    });
    document.querySelectorAll(".rank-profile-btn[data-view-profile]").forEach(button => {
      button.onclick = event => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        viewProfile(button.dataset.viewProfile || "");
      };
    });
    document.querySelectorAll("[data-home]").forEach(button => button.onclick = () => setState({ tab: "home" }, { save: true }));
    document.querySelectorAll("[data-open-profile]").forEach(button => button.onclick = () => setState({ tab: "profile" }, { save: true }));
    const form = document.querySelector("[data-add-friend]");
    if (form) form.onsubmit = addFriend;
    const share = document.querySelector("[data-share-invite]");
    if (share) share.onclick = event => { event?.preventDefault?.(); shareInviteCode(); };
  }

  /* LTS: surcharge historique de renderRank supprimée. */

  ensureServerLeaderboard = function beta176EnsureServerLeaderboard(scope = "daily") {
    return fetchServerLeaderboard(VALID_SCOPES.has(scope) ? scope : "daily").catch(() => null);
  };

  try {
    state.beta176SocialRuntimeVersion = VERSION;
    queueSaveState(100);
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, multiplayerRuntime: true, mysteryScoreRanking: true, apiTimeout: true };
  } catch {}
})();


/* ===== progression-systems.js ===== */

/* HistoDaily beta 181 — parcours guidé, objectifs hebdomadaires et mémorisation espacée. */
(function histodailyBeta181Progression(){
  "use strict";

  const VERSION = "1.0.0-beta.213.0";
  const SYNTHESIS_SIZE = 10;
  const SYNTHESIS_PASS = 8;
  const SYNTHESIS_XP = 100;
  const REVIEW_XP = 5;
  const DAILY_PLAN_XP = 25;
  const WEEKLY_REWARD_XP = 80;
  const WEEKLY_TARGETS = Object.freeze({ activeDays: 3, courses: 5, consolidation: 3 });
  const DAY_MS = 24 * 60 * 60 * 1000;
  const REVIEW_INTERVALS = [DAY_MS, 3 * DAY_MS, 7 * DAY_MS, 21 * DAY_MS];
  const REVIEW_MASTERY_STAGE = 5;

  if (typeof state !== "object" || typeof lessonById !== "function") return;

  state.reviewQueue = state.reviewQueue && typeof state.reviewQueue === "object" ? state.reviewQueue : {};
  state.reviewStats = state.reviewStats && typeof state.reviewStats === "object" ? state.reviewStats : { wrong: 0, corrected: 0 };
  state.reviewSeededLessons = state.reviewSeededLessons && typeof state.reviewSeededLessons === "object" ? state.reviewSeededLessons : {};
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
      ...previous,
      lessonId: lesson.id,
      questionIndex: Number(questionIndex),
      question: item?.q || previous.question || "Question à revoir",
      wrongCount: Number(previous.wrongCount || 0) + 1,
      firstWrongAt: Number(previous.firstWrongAt || now()),
      lastWrongAt: now(),
      stage: 0,
      dueAt: now(),
      lastResult: "wrong",
      source: "mistake",
      anchorKind: "quiz"
    };
    state.reviewStats = {
      ...(state.reviewStats || {}),
      wrong: Number(state.reviewStats?.wrong || 0) + 1,
      corrected: Number(state.reviewStats?.corrected || 0)
    };
    persistSoon();
  }

  function reviewDueAtAfterDays(days = 1) {
    const date = new Date(now());
    date.setDate(date.getDate() + Math.max(1, Number(days) || 1));
    date.setHours(9, 0, 0, 0);
    return date.getTime();
  }

  function scheduleLessonReviewAnchors(lessonId) {
    const id = String(lessonId || "");
    if (!id || state.reviewSeededLessons?.[id]) return 0;
    const lesson = lessonById(id);
    if (!lesson) return 0;
    const content = buildLessonContent(lesson);
    const quizItems = normalizeQuizPack(content.quiz, lesson, content);
    if (!quizItems.length) return 0;
    const disciplineId = lessonDisciplineId(lesson);
    const first = quizSeed(`${id}-memory-anchor-a`) % quizItems.length;
    let second = quizSeed(`${id}-memory-anchor-b`) % quizItems.length;
    if (quizItems.length > 1 && second === first) second = (first + 1) % quizItems.length;
    const indexes = [...new Set([first, second])].slice(0, 2);
    let added = 0;
    indexes.forEach((questionIndex, slot) => {
      const key = reviewKey(id, questionIndex);
      const previous = state.reviewQueue?.[key];
      if (previous?.source === "mistake" || Number(previous?.dueAt || 0) > 0) return;
      const item = quizItems[questionIndex];
      state.reviewQueue[key] = {
        lessonId: id,
        questionIndex,
        question: item?.q || "Notion à consolider",
        wrongCount: 0,
        stage: 0,
        dueAt: reviewDueAtAfterDays(slot === 0 ? 1 : 3),
        lastResult: "scheduled",
        source: "course-anchor",
        anchorKind: slot === 0 && ["english", "philosophy"].includes(disciplineId) ? "lab" : "quiz",
        firstScheduledAt: now()
      };
      added += 1;
    });
    state.reviewSeededLessons = { ...(state.reviewSeededLessons || {}), [id]: { at: now(), anchors: added } };
    persistSoon();
    return added;
  }

  function backfillReviewAnchors({ lessonLimit = 2, memoryCap = 12 } = {}) {
    if (allReviewEntries().length >= memoryCap) return 0;
    const completed = Object.keys(state.completedLessons || {}).reverse();
    let seeded = 0;
    for (const lessonId of completed) {
      if (seeded >= lessonLimit || allReviewEntries().length >= memoryCap) break;
      if (state.reviewSeededLessons?.[lessonId]) continue;
      if (scheduleLessonReviewAnchors(lessonId) > 0) seeded += 1;
    }
    return seeded;
  }

  function unresolvedForLesson(lessonId) {
    return allReviewEntries().filter(entry => entry?.lessonId === lessonId).length;
  }

  function lessonMastery(lesson) {
    if (!lessonDone(lesson.id)) return 0;
    const seed = state.reviewSeededLessons?.[lesson.id];
    // A course read and quizzed is learned, not automatically mastered.
    if (!seed) return 60;
    const entries = allReviewEntries().filter(entry => String(entry?.lessonId || "") === String(lesson.id));
    if (!entries.length) return 100;
    const anchorCount = Math.max(1, Number(seed?.anchors || 2));
    const resolved = Math.max(0, anchorCount - entries.length);
    const stageCredit = entries.reduce((sum, entry) => sum + Math.min(REVIEW_MASTERY_STAGE, Math.max(0, Number(entry.stage || 0))) / REVIEW_MASTERY_STAGE, 0);
    const memoryProgress = Math.max(0, Math.min(1, (resolved + stageCredit) / anchorCount));
    return Math.round(60 + 40 * memoryProgress);
  }

  function disciplineMastery(disciplineId) {
    const lessons = disciplineLessons(disciplineId);
    const done = lessons.filter(lesson => lessonDone(lesson.id)).length;
    const mastered = lessons.filter(lesson => lessonDone(lesson.id) && state.reviewSeededLessons?.[lesson.id] && unresolvedForLesson(lesson.id) === 0).length;
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

  function adaptiveReviewRecord(entry) {
    const base = questionRecord(entry?.lesson, Number(entry?.questionIndex));
    if (!base || entry?.source !== "course-anchor" || entry?.anchorKind !== "lab") return base ? { ...base, reviewMode: "quiz" } : null;
    const disciplineId = lessonDisciplineId(entry.lesson);
    if (!["english", "philosophy"].includes(disciplineId)) return { ...base, reviewMode: "quiz" };
    try {
      const api = window.HistoDaily?.courseInteractionsRC20;
      const lab = api?.labForLesson?.(entry.lesson.id, disciplineId);
      if (!lab || !Array.isArray(lab.choices) || !lab.choices.length) return { ...base, reviewMode: "quiz" };
      const correct = lab.choices.find(choice => choice?.correct);
      return {
        ...base,
        reviewMode: "lab",
        lab,
        context: lab.context || "",
        speak: disciplineId === "english" ? (lab.speak || "") : "",
        item: { q: lab.prompt || base.item.q, a: correct?.text || base.item.a, why: lab.takeaway || base.item.why },
        choices: lab.choices.map(choice => ({ text: choice.text, correct: Boolean(choice.correct), feedback: choice.feedback || "" }))
      };
    } catch { return { ...base, reviewMode: "quiz" }; }
  }

  function openReviewSession(disciplineId = "") {
    const entries = validReviewEntries(disciplineId).slice(0, 5);
    const discipline = disciplineId ? disciplineById(disciplineId) : null;
    const dialog = createProgressionModal("Révisions intelligentes", discipline ? `Consolider ta mémoire en ${discipline.title}` : "Consolider ta mémoire");
    if (!entries.length) {
      const scheduled = allReviewEntries(disciplineId);
      const next = nextScheduledReview(disciplineId);
      dialog.content.innerHTML = scheduled.length
        ? `<div class="beta179-empty-state"><b>Rien à revoir maintenant</b><p>${scheduled.length} question${scheduled.length > 1 ? "s sont programmées" : " est programmée"}. La prochaine reviendra ${next ? dueLabel(next.dueAt) : "plus tard"} afin de vérifier que l’idée reste en mémoire.</p><button type="button" data-beta179-finish>Fermer</button></div>`
        : `<div class="beta179-empty-state"><b>Mémoire à jour</b><p>Les notions importantes et les questions ratées sont ajoutées ici. Elles reviennent ensuite à intervalles espacés jusqu’à être réellement maîtrisées.</p><button type="button" data-beta179-finish>Fermer</button></div>`;
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
      const record = adaptiveReviewRecord(entry);
      if (!record) {
        delete state.reviewQueue[entry.key];
        persistSoon();
        cursor += 1;
        return renderQuestion();
      }
      answered = false;
      const stageLabel = Number(entry.stage || 0) === 0 ? (entry.source === "course-anchor" ? "premier rappel" : "à corriger") : `niveau mémoire ${Number(entry.stage || 0)}/${REVIEW_MASTERY_STAGE}`;
      dialog.content.innerHTML = `<div class="beta179-session-progress"><span>Question ${cursor + 1}/${entries.length}</span><div><i style="width:${pct(cursor, entries.length)}%"></i></div><b>${validReviewEntries(disciplineId).length} dues</b></div>
        <article class="beta179-question-card">
          <small>${HD_ICONS.lesson(entry.lesson)} ${esc(entry.lesson.title)} · ${stageLabel}</small>
          ${record.context ? `<p class="hd21-review-context">${esc(record.context)}</p>` : ""}
          <div class="hd21-review-prompt"><h3>${esc(record.item.q)}</h3>${record.speak ? `<button type="button" class="hd21-review-listen" data-hd21-review-speak="${esc(record.speak)}">▶ Écouter</button>` : ""}</div>
          <div class="beta179-answer-grid">${record.choices.map((choice, index) => `<button type="button" data-beta179-answer="${index}"><span>${String.fromCharCode(65 + index)}</span>${esc(choice.text)}</button>`).join("")}</div>
          <div class="beta179-answer-feedback" aria-live="polite"></div>
        </article>`;
      const reviewListen = dialog.content.querySelector("[data-hd21-review-speak]");
      if (reviewListen) reviewListen.addEventListener("click", () => {
        try { window.HistoDaily?.courseInteractionsRC20?.speakEnglish?.(reviewListen.dataset.hd21ReviewSpeak || "", reviewListen); } catch {}
      });
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
          feedback.innerHTML = `<p class="good"><b>Bonne réponse.</b> ${esc(choice?.feedback || record.item.why || record.item.a)} ${esc(outcome.memoryText)} <span>+${REVIEW_XP} XP</span></p><button type="button" data-beta179-next>Question suivante</button>`;
        } else {
          button.classList.add("wrong");
          feedback.innerHTML = `<p class="bad"><b>À reprendre.</b> La bonne réponse est : ${esc(record.item.a)}. ${esc(choice?.feedback || record.item.why || "La correction reprend l’idée expliquée dans le cours.")}</p><button type="button" data-beta179-next>Continuer</button>`;
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
    setState({ tab: "lesson", currentLessonId: lesson.id, currentDiscipline: lessonDisciplineId(lesson), currentWorld: world.id, currentGroup: world.group, lessonView: "complete", lessonFocus: "complete" });
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
    const practiceLabel = log.planType === "review" ? `Consolider ${reviewTarget} notion${reviewTarget > 1 ? "s" : ""}` : "Valider un deuxième cours";
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
        setState({ tab: "lesson", currentLessonId: lesson.id, currentDiscipline: lessonDisciplineId(lesson), currentWorld: world.id, currentGroup: world.group, lessonView: "complete", lessonFocus: "complete" });
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
        setState({ tab: "lesson", currentLessonId: lesson.id, currentDiscipline: disciplineId, currentWorld: world.id, currentGroup: world.group, lessonView: "complete", lessonFocus: null });
      };
    });
  }

  // RC22 public bridge: expose the memory engine to late UI modules without duplicating logic.
  try {
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      memory: {
        validReviewEntries,
        allReviewEntries,
        nextScheduledReview,
        dueLabel,
        disciplineMastery,
        lessonMastery,
        unresolvedForLesson,
        openReviewSession
      }
    };
  } catch {}

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
    masterySection.innerHTML = `<div class="section-title-row"><div><span class="card-label">Maîtrise par domaine</span><h2>Ce que tu sais vraiment</h2><p>Les notions importantes et les erreurs reviennent à intervalles espacés : la maîtrise mesure ce qui tient vraiment en mémoire, pas seulement un quiz réussi une fois.</p></div><button type="button" class="ghost" data-beta179-review="">${dueReviews ? `Réviser (${dueReviews})` : memoryReviews ? `${memoryReviews} programmée${memoryReviews > 1 ? "s" : ""}` : "Mémoire à jour"}</button></div><div class="beta179-mastery-list">${masteryBarsMarkup()}</div>`;

    const collections = prioritizedCollections();
    const unlockedCount = collections.filter(definition => state.collectionUnlocks?.[definition.id] || collectionProgress(definition).complete).length;
    const collectionSection = document.createElement("section");
    collectionSection.className = "card beta179-profile-collections hd217-profile-collections";
    collectionSection.innerHTML = `<header class="hd217-collections-head"><div><span class="card-label">Collections</span><h2>Tes médailles</h2><p>Termine un thème pour transformer sa progression en médaille.</p></div><div class="hd217-collections-actions"><strong>${unlockedCount}/${collections.length}</strong><button type="button" class="ghost" data-beta180-collections-all>Tout voir</button></div></header><div class="beta179-collection-grid">${collectionCardsMarkup(collections, 4)}</div>`;

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
    if ((!wasCompleted && lessonDone(lessonId)) || (rescueValidation && lessonQuizPassed(lessonId))) { trackDailyActivity("course", { lessonId }); scheduleLessonReviewAnchors(lessonId); }
    window.setTimeout(() => { reconcileCollections({ notify: true }); reconcileDailyPlanBonus({ notify: true }); reconcileWeeklyReward({ notify: true }); }, 0);
    return result;
  };

  const previousCompleteLesson = completeLesson;
  completeLesson = function beta180CompleteLesson(lessonId) {
    const wasCompleted = Boolean(lessonDone(lessonId));
    const result = previousCompleteLesson(lessonId);
    if (!wasCompleted && lessonDone(lessonId)) { trackDailyActivity("course", { lessonId }); scheduleLessonReviewAnchors(lessonId); }
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

  // Styles consolidés dans app.css.


  pruneDailyLearningLogs();
  pruneWeeklyRewards();
  persistSoon();

  // RC9 : les calculs de collections et de récompenses parcourent tout le catalogue.
  // Ils ne doivent plus bloquer le premier affichage. Les enveloppes de rendu sont déjà
  // installées avant DOMContentLoaded, donc aucun second rendu synchrone n’est nécessaire.
  const runStartupReconciliation = () => {
    let changed = false;
    try { changed = reconcileCollections({ notify: false }).length > 0 || changed; } catch {}
    try { changed = Boolean(reconcileDailyPlanBonus({ notify: false })) || changed; } catch {}
    try { changed = Boolean(reconcileWeeklyReward({ notify: false })) || changed; } catch {}
    try { persistSoon(); } catch {}
    if (changed) {
      try {
        if (typeof renderSoon === "function") renderSoon();
        else if (typeof render === "function") render({ immediate: true });
      } catch {}
    }
  };
  const runMemoryBackfill = () => { try { backfillReviewAnchors({ lessonLimit: 2, memoryCap: 12 }); } catch {} };
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(runStartupReconciliation, { timeout: 2200 });
    requestIdleCallback(runMemoryBackfill, { timeout: 2800 });
  } else {
    window.setTimeout(runStartupReconciliation, 900);
    window.setTimeout(runMemoryBackfill, 1400);
  }

  try {
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      progressionSystems: true,
      dailyPlan: true,
      weeklyGoals: true,
      guidedPath: true,
      spacedReview: true,
      startupReconciliation: "idle",
      synthesisSize: SYNTHESIS_SIZE,
      progressionDebug: {
        applyReviewAnswer,
        dailyPlanStatus,
        weeklyStatus,
        reconcileWeeklyReward,
        activePathProgress,
        allReviewEntries,
        openReviewSession,
        scheduleLessonReviewAnchors,
        backfillReviewAnchors,
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


/* ===== interface-polish.js ===== */

/* HistoDaily — structure d’interface consolidée. */
(function histodailyBeta182Interface(){
  "use strict";

  const VERSION = "1.0.0-beta.213.0";
  const esc = value => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function lessonTitle(lesson) {
    try { return buildLessonContent(lesson)?.title || lesson?.title || "Cours"; }
    catch { return lesson?.title || "Cours"; }
  }

  function availableDisciplineLessons(disciplineId) {
    try {
      return (lessonsForDiscipline(disciplineId) || [])
        .filter(lesson => typeof isCuratedLesson !== "function" || isCuratedLesson(lesson))
        .filter(lesson => typeof lessonLockedByDailyMystery !== "function" || !lessonLockedByDailyMystery(lesson));
    } catch { return []; }
  }

  function lessonIsDone(lesson) {
    try { return Boolean(lesson && lessonDone(lesson.id)); }
    catch { return false; }
  }

  function activeNextLesson(disciplineId) {
    const lessons = availableDisciplineLessons(disciplineId);
    const current = lessons.find(lesson => String(lesson.id) === String(state.currentLessonId || ""));
    if (current && !lessonIsDone(current)) return current;
    try {
      const started = lessons.find(lesson => {
        const progress = state.quizProgress?.[lesson.id];
        return !lessonIsDone(lesson) && Number(progress?.answeredCount || 0) > 0;
      });
      if (started) return started;
    } catch {}
    return lessons.find(lesson => !lessonIsDone(lesson)) || lessons[0] || null;
  }

  // La progression est déjà visible dans les pastilles de discipline et dans le parcours.
  // Supprimer la grosse carte évite de raconter trois fois la même chose sur l’accueil.
  try { modeSnapshotMarkup = function beta182ModeSnapshotMarkup(){ return ""; }; } catch {}

  try {
    modeContinueMarkup = function beta182ModeContinueMarkup(disciplineId = activeDisciplineId()) {
      const discipline = disciplineById(disciplineId);
      let totalLessons = [];
      try {
        totalLessons = (lessonsForDiscipline(discipline.id) || []).filter(lesson => typeof isCuratedLesson !== "function" || isCuratedLesson(lesson));
      } catch { totalLessons = availableDisciplineLessons(discipline.id); }
      const done = totalLessons.filter(lessonIsDone).length;
      const next = activeNextLesson(discipline.id);
      const progress = totalLessons.length ? Math.round((done / totalLessons.length) * 100) : 0;

      if (!next) {
        return `<section class="card beta182-next-card complete" style="--discipline-accent:${esc(discipline.accent)}">
          <div class="beta182-next-icon">${HD_ICONS.action("check")}</div>
          <div><span class="card-label">Parcours</span><h2>${esc(discipline.title)} terminé</h2><p>Tout le contenu disponible est validé.</p></div>
          <button type="button" data-open-mode-learn="${esc(discipline.id)}">Revoir</button>
        </section>`;
      }

      let world = {};
      try { world = lessonWorld(next) || {}; } catch {}
      const started = Number(state.quizProgress?.[next.id]?.answeredCount || 0) > 0;
      return `<section class="card beta182-next-card" style="--discipline-accent:${esc(discipline.accent)}">
        <div class="beta182-next-icon">${HD_ICONS.lesson(next, world, discipline)}</div>
        <div class="beta182-next-copy"><span class="card-label">À continuer · ${done}/${totalLessons.length || 0}</span><h2>${esc(lessonTitle(next))}</h2><p>${esc(world.title || discipline.title)} · ${progress}% du domaine validé</p></div>
        <button type="button" data-home-continue="${esc(next.id)}" data-home-continue-view="${started ? "quiz" : "express"}">${started ? "Reprendre" : "Commencer"}</button>
      </section>`;
    };
  } catch {}

  try {
    modeRecommendationsMarkup = function beta182ModeRecommendationsMarkup(disciplineId = activeDisciplineId()) {
      const discipline = disciplineById(disciplineId);
      const all = availableDisciplineLessons(discipline.id);
      const unfinished = all.filter(lesson => !lessonIsDone(lesson));
      const pool = unfinished.length ? unfinished : all;
      if (!pool.length) return "";
      const offset = Math.max(0, Number(state.discoverOffset || 0)) % pool.length;
      const choices = [];
      for (let i = 0; i < pool.length && choices.length < 3; i += 1) {
        const lesson = pool[(offset + i) % pool.length];
        if (lesson && !choices.some(item => item.id === lesson.id)) choices.push(lesson);
      }
      return `<section class="card beta182-discovery-card" style="--discipline-accent:${esc(discipline.accent)}">
        <div class="section-title-row"><div><span class="card-label">À découvrir</span><h2>Trois cours à découvrir</h2></div><button type="button" class="ghost mini-button" data-open-mode-learn="${esc(discipline.id)}">Tout voir</button></div>
        <div class="beta182-discovery-row">${choices.map(lesson => {
          let world = {};
          try { world = lessonWorld(lesson) || {}; } catch {}
          return `<article class="beta182-discovery-item ${lessonIsDone(lesson) ? "done" : ""}" data-home-discovery="${esc(lesson.id)}" tabindex="0" role="button">
            <span>${HD_ICONS.lesson(lesson, world, discipline)}</span>
            <strong>${esc(lessonTitle(lesson))}</strong>
            <small>${lessonIsDone(lesson) ? "Déjà validé" : esc(world.title || discipline.title)}</small>
          </article>`;
        }).join("")}</div>
      </section>`;
    };
  } catch {}

  try {
    disciplineSelectorMarkup = function beta182DisciplineSelectorMarkup(selectedId = activeDisciplineId()) {
      const selected = disciplineById(selectedId);
      return `<section class="discipline-picker card beta182-discipline-picker" style="--discipline-accent:${esc(selected.accent)}">
        <div class="beta182-picker-heading"><div><span class="card-label">Discipline</span><h2>${HD_ICONS.discipline(selected)} ${esc(selected.title)}</h2></div><small>Glisse pour changer</small></div>
        <div class="beta182-discipline-tabs" role="list" aria-label="Disciplines">${DISCIPLINES.map(item => {
          const stats = disciplineProgress(item.id);
          const active = item.id === selected.id;
          return `<button type="button" role="listitem" class="${active ? "active" : ""}" data-discipline="${esc(item.id)}" style="--discipline-accent:${esc(item.accent)}" aria-pressed="${active ? "true" : "false"}"><span class="mode-pill-icon">${HD_ICONS.rawDiscipline ? HD_ICONS.rawDiscipline(item) : HD_ICONS.discipline(item)}</span><strong>${esc(disciplineModeCopy(item.id).shortLabel || item.title)}</strong><small>${stats.progress}%</small></button>`;
        }).join("")}</div>
      </section>`;
    };
  } catch {}

  releaseNotesMarkup = function beta182ReleaseNotesMarkup() { return ""; };

  function directShellChildren(shell, selectors) {
    const selector = selectors.join(",");
    return Array.from(shell?.children || []).filter(node => node.matches?.(selector));
  }

  function makeFold(shell, nodes, { id, icon, title, subtitle, open = false } = {}) {
    const unique = [...new Set(nodes)].filter(node => node?.parentElement === shell);
    if (!unique.length || shell.querySelector(`[data-beta182-fold="${id}"]`)) return null;
    const fold = document.createElement("details");
    fold.className = "card beta182-profile-fold";
    fold.dataset.beta182Fold = id;
    fold.open = open;
    fold.innerHTML = `<summary><span class="beta182-fold-icon">${icon}</span><span><strong>${esc(title)}</strong><small>${esc(subtitle)}</small></span><b aria-hidden="true">⌄</b></summary><div class="beta182-fold-content"></div>`;
    unique[0].insertAdjacentElement("beforebegin", fold);
    const content = fold.querySelector(".beta182-fold-content");
    unique.forEach(node => content.appendChild(node));
    return fold;
  }

  function revealActiveHorizontal(containerSelector, activeSelector) {
    window.requestAnimationFrame(() => {
      const container = document.querySelector(containerSelector);
      const active = container?.querySelector(activeSelector);
      if (!container || !active) return;
      const target = active.offsetLeft - Math.max(0, (container.clientWidth - active.offsetWidth) / 2);
      container.scrollLeft = Math.max(0, target);
    });
  }

  function polishHome() {
    const shell = document.querySelector(".app-shell.tab-home");
    if (!shell) return;
    shell.classList.add("beta182-home-shell");
    shell.querySelector(".home-secondary-actions")?.remove();
    shell.querySelector(".home-mode-card")?.remove();
    shell.querySelector(".home-clean-hero h1")?.setAttribute("aria-label", "HistoDaily, un rendez-vous quotidien de culture générale");
    revealActiveHorizontal(".beta182-home-shell .home-mode-switcher", ".mode-pill.active");
    const plan = shell.querySelector(".beta180-daily-plan");
    if (plan) {
      plan.classList.add("beta182-daily-plan");
      plan.querySelectorAll(".beta180-plan-steps button small").forEach(node => node.setAttribute("aria-hidden", "true"));
    }
  }

  function polishLearn() {
    const shell = document.querySelector(".app-shell.tab-learn");
    if (!shell) return;
    shell.classList.add("beta182-learn-shell");
    const picker = shell.querySelector(".beta182-discipline-picker");
    const hub = shell.querySelector(".beta181-learning-hub");
    if (picker && hub && hub.nextElementSibling === picker) hub.insertAdjacentElement("beforebegin", picker);
    shell.querySelectorAll(".tree-card").forEach(card => card.classList.add("beta182-tree-card"));
    revealActiveHorizontal(".beta182-learn-shell .beta182-discipline-tabs", "button.active");
  }

  function polishProfile() {
    const shell = document.querySelector(".app-shell.tab-profile");
    if (!shell) return;
    shell.classList.add("beta182-profile-shell");

    const culture = directShellChildren(shell, [".culture-profile-card"]);
    makeFold(shell, culture, {
      id: "culture",
      icon: HD_ICONS.action("ranking"),
      title: "Progression détaillée",
      subtitle: "Voir le jeton et les pourcentages par discipline"
    });

    const social = directShellChildren(shell, [
      ".pseudo-card", ".beta125-requests-card", ".add-friend-card", ".invite-link-card",
      ".invite-card", ".friends-list-card", ".empty-friends-card", ".social-shortcuts", ".social-backend"
    ]);
    makeFold(shell, social, {
      id: "social",
      icon: HD_ICONS.action("users"),
      title: "Social et classements",
      subtitle: "Pseudo, amis, invitations et comparaison des scores"
    });

    const settings = directShellChildren(shell, [
      ".backup-card", ".install-card", ".profile-settings-card", ".beta115-health-card"
    ]);
    makeFold(shell, settings, {
      id: "settings",
      icon: HD_ICONS.action("settings"),
      title: "Réglages et données",
      subtitle: "Affichage, installation, sauvegarde et réparation"
    });
  }

  function polishGenericScreen(tab) {
    const shell = document.querySelector(`.app-shell.tab-${tab}`);
    if (!shell) return;
    shell.classList.add("beta182-clean-shell");
  }

  const previousRenderHome = typeof renderHome === "function" ? renderHome : null;
  if (previousRenderHome) renderHome = function beta182RenderHome(){ const out = previousRenderHome(); polishHome(); return out; };

  const previousRenderLearn = typeof renderLearn === "function" ? renderLearn : null;
  if (previousRenderLearn) renderLearn = function beta182RenderLearn(){ const out = previousRenderLearn(); polishLearn(); return out; };

  const previousRenderProfile = typeof renderProfile === "function" ? renderProfile : null;
  if (previousRenderProfile) renderProfile = function beta182RenderProfile(){ const out = previousRenderProfile(); polishProfile(); return out; };

  try {
    const previousRenderMystery = renderMystery;
    renderMystery = function beta182RenderMystery(){ const out = previousRenderMystery(); polishGenericScreen("mystery"); return out; };
  } catch {}
  try {
    const previousRenderRank = renderRank;
    /* LTS: surcharge historique de renderRank supprimée. */
  } catch {}
  try {
    const previousRenderPublicProfile = renderPublicProfile;
    renderPublicProfile = function beta182RenderPublicProfile(){ const out = previousRenderPublicProfile(); polishGenericScreen("publicProfile"); return out; };
  } catch {}

  // Styles consolidés dans app.css.


  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, interfacePolish: true };
    state.beta182InterfaceVersion = VERSION;
    if (typeof queueSaveState === "function") queueSaveState(100);
    if (typeof renderSoon === "function") renderSoon();
    else if (typeof render === "function") render({ immediate: true });
  } catch {}
})();


/* ===== experience-audit.js ===== */

/* HistoDaily beta 183 — audit UX, accessibilité et fluidité. */
(function histodailyBeta183Audit(){
  "use strict";

  const VERSION = "1.0.0-beta.213.0";
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


/* ===== concept-expedition.js ===== */

/* HistoDaily beta 215 — expédition quotidienne figée, recherche libre, saisons et carte du savoir. */
(function histodailyBeta187Concept(){
  "use strict";

  const VERSION = "1.0.0-beta.216.0";
  const ROOT_ID = "hd187-layer";
  const SEARCH_LIMIT = 24;
  const appRoot = document.getElementById("app");
  if (!appRoot || typeof state !== "object" || typeof curatedLessons !== "function") return;

  const esc = value => typeof escapeHtml === "function"
    ? escapeHtml(String(value ?? ""))
    : String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const norm = value => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const pct = (value, total) => total > 0 ? Math.max(0, Math.min(100, Math.round((Number(value) || 0) * 100 / total))) : 0;
  const safeArray = value => Array.isArray(value) ? value : [];
  const unique = items => [...new Map(items.filter(Boolean).map(item => [String(item.id), item])).values()];

  state.expeditionPreferences = state.expeditionPreferences && typeof state.expeditionPreferences === "object"
    ? state.expeditionPreferences
    : {};
  state.expeditionPreferences.version = VERSION;

  // L'accès libre est une règle produit : le cours peut prévenir du spoil, mais ne se verrouille jamais.
  try {
    lessonLockedByDailyMystery = function beta187NoCourseLock(){ return false; };
  } catch {}

  function allLessonsIndex(){
    return unique(curatedLessons()).map(lesson => {
      const world = typeof lessonWorld === "function" ? lessonWorld(lesson) : {};
      const disciplineId = typeof lessonDisciplineId === "function" ? lessonDisciplineId(lesson) : (world?.discipline || "history");
      const discipline = typeof disciplineById === "function" ? disciplineById(disciplineId) : (DISCIPLINES.find(item => item.id === disciplineId) || DISCIPLINES[0]);
      let pack = {};
      try { pack = (typeof READY_LESSON_PACKS === "object" && READY_LESSON_PACKS?.[lesson.id]) || {}; } catch {}
      const searchable = norm([
        lesson.title, pack?.title, pack?.hook,
        safeArray(pack?.express).join(" "),
        world?.title, world?.subtitle, discipline?.title,
        lesson?.period, lesson?.location
      ].filter(Boolean).join(" "));
      return { lesson, world, discipline, disciplineId, searchable };
    });
  }

  let searchIndexCache = null;
  function searchIndex(){
    const expected = curatedLessons().length;
    if (!searchIndexCache || searchIndexCache.length !== expected) searchIndexCache = allLessonsIndex();
    return searchIndexCache;
  }

  function openCourse(lessonId, source = "beta187"){
    const lesson = typeof lessonById === "function" ? lessonById(lessonId) : null;
    if (!lesson) return false;
    closeLayer();
    try {
      if (typeof beta118OpenLessonById === "function") return beta118OpenLessonById(lesson.id, { source });
    } catch {}
    const world = typeof lessonWorld === "function" ? lessonWorld(lesson) : {};
    const disciplineId = typeof lessonDisciplineId === "function" ? lessonDisciplineId(lesson) : (world?.discipline || "history");
    setState({
      tab: "lesson",
      currentLessonId: lesson.id,
      currentDiscipline: disciplineId,
      currentWorld: world?.id || state.currentWorld,
      currentGroup: world?.group || state.currentGroup,
      lessonView: "complete",
      lessonFocus: "complete",
      learnDrill: "courses"
    }, { renderImmediate: true });
    return true;
  }

  function openDiscipline(disciplineId){
    closeLayer();
    const discipline = DISCIPLINES.find(item => item.id === disciplineId) || DISCIPLINES[0];
    const worlds = typeof treeAvailableWorlds === "function" ? treeAvailableWorlds(discipline.id) : [];
    const first = worlds[0] || {};
    setState({
      tab: "learn",
      currentDiscipline: discipline.id,
      currentGroup: first.group || state.currentGroup,
      currentWorld: first.id || state.currentWorld,
      learnDrill: "chapters",
      learnFilter: "all",
      learnSearch: ""
    }, { renderImmediate: true });
  }

  function currentMysterySafe(){
    try { return typeof dailyMystery === "function" ? dailyMystery() : null; }
    catch { return null; }
  }

  function progressDebug(){
    try { return window.HistoDaily?.progressionDebug || null; }
    catch { return null; }
  }

  function dailyStatus(){
    try { return progressDebug()?.dailyPlanStatus?.() || null; }
    catch { return null; }
  }

  function expeditionDayKey(){
    try { return typeof localDayKey === "function" ? localDayKey() : dateKeyFor(new Date()); }
    catch { return dateKeyFor(new Date()); }
  }

  function recallCompletedToday(){
    const preferences = state.expeditionPreferences && typeof state.expeditionPreferences === "object" ? state.expeditionPreferences : {};
    return Boolean(preferences.recallByDay?.[expeditionDayKey()]);
  }

  function markRecallCompleted(){
    if (recallCompletedToday()) return false;
    const key = expeditionDayKey();
    const preferences = state.expeditionPreferences && typeof state.expeditionPreferences === "object" ? state.expeditionPreferences : {};
    const recallByDay = preferences.recallByDay && typeof preferences.recallByDay === "object" ? { ...preferences.recallByDay } : {};
    recallByDay[key] = { at: Date.now(), xp: 10 };
    const keep = Object.keys(recallByDay).sort().slice(-31);
    state.expeditionPreferences = { ...preferences, version: VERSION, recallByDay: Object.fromEntries(keep.map(day => [day, recallByDay[day]])) };
    state.xp = Number(state.xp || 0) + 10;

    // Le dernier geste compte aussi comme consolidation dans le rythme hebdomadaire.
    const dailyLogs = state.dailyLearningLog && typeof state.dailyLearningLog === "object" ? { ...state.dailyLearningLog } : {};
    const log = dailyLogs[key] && typeof dailyLogs[key] === "object" ? { ...dailyLogs[key] } : {};
    log.syntheses = [...new Set([...(Array.isArray(log.syntheses) ? log.syntheses : []), `expedition-recall-${key}`])];
    dailyLogs[key] = log;
    state.dailyLearningLog = dailyLogs;
    markExpeditionFinished();
    try { if (typeof saveState === "function") saveState(); } catch {}
    return true;
  }

  function relatedFor(lesson, limit = 3){
    if (!lesson) return [];
    const index = searchIndex();
    const current = index.find(item => item.lesson.id === lesson.id);
    if (!current) return [];
    const titleTokens = new Set(norm(current.lesson.title).split(" ").filter(token => token.length > 4));
    return index
      .filter(item => item.lesson.id !== lesson.id)
      .map(item => {
        let score = 0;
        if (item.disciplineId === current.disciplineId) score += 24;
        if (item.world?.id && item.world.id === current.world?.id) score += 90;
        if (item.world?.group && item.world.group === current.world?.group) score += 42;
        const candidateTokens = norm(item.lesson.title).split(" ").filter(token => token.length > 4);
        score += candidateTokens.filter(token => titleTokens.has(token)).length * 9;
        if (!lessonDone(item.lesson.id)) score += 12;
        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score || Number(lessonDone(a.lesson.id)) - Number(lessonDone(b.lesson.id)) || a.lesson.title.localeCompare(b.lesson.title, "fr"))
      .slice(0, limit)
      .map(item => item.lesson);
  }

  function dailyConnectionFor(lesson){
    if (!lesson) return null;
    const dayKey = (() => {
      try { return typeof localDayKey === "function" ? localDayKey() : dateKeyFor(new Date()); }
      catch { return dateKeyFor(new Date()); }
    })();
    const preferences = state.expeditionPreferences && typeof state.expeditionPreferences === "object" ? state.expeditionPreferences : {};
    const connections = preferences.connectionsByDay && typeof preferences.connectionsByDay === "object" ? { ...preferences.connectionsByDay } : {};
    const remembered = connections[dayKey];
    const rememberedId = remembered && typeof remembered === "object" ? remembered.connectionLessonId : remembered;
    const rememberedPrimaryId = remembered && typeof remembered === "object" ? remembered.primaryLessonId : null;
    const rememberedLesson = rememberedId ? lessonById(rememberedId) : null;
    const samePrimary = !rememberedPrimaryId || String(rememberedPrimaryId) === String(lesson.id);
    if (samePrimary && rememberedLesson && String(rememberedLesson.id) !== String(lesson.id)) return rememberedLesson;

    const candidates = relatedFor(lesson, 6);
    const selected = candidates.find(candidate => !lessonDone(candidate.id)) || candidates[0] || null;
    if (!selected) return null;
    // La connexion est liée au cours principal du jour. Un changement de discipline
    // ou l'ouverture d'un autre cours ne doit jamais recycler une ancienne connexion.
    connections[dayKey] = { primaryLessonId: lesson.id, connectionLessonId: selected.id, at: Date.now() };
    const keep = Object.keys(connections).sort().slice(-21);
    state.expeditionPreferences = { ...preferences, version: VERSION, connectionsByDay: Object.fromEntries(keep.map(key => [key, connections[key]])) };
    try { if (typeof saveState === "function") saveState(); } catch {}
    return selected;
  }

  function expeditionData(){
    // Fige le dossier, le cours principal et le cours de connexion pour toute la journée.
    // Avant ce correctif, ouvrir un cours d'une autre discipline modifiait activeDisciplineId(),
    // donc dailyMystery() pouvait renvoyer un autre dossier au retour sur l'accueil.
    const session = expeditionSessionForDay() || {};
    const isPinned = Boolean(session.startedAt || session.snapshotAt || session.finishedAt);
    const pinnedMystery = isPinned && session.mysteryId ? mysteryById(session.mysteryId) : null;
    const mystery = pinnedMystery || currentMysterySafe();
    const pinnedPrimary = isPinned && session.primaryLessonId ? lessonById(session.primaryLessonId) : null;
    const primary = pinnedPrimary || (mystery?.lessonId ? lessonById(mystery.lessonId) : null);
    const fallback = searchIndex().find(item => !lessonDone(item.lesson.id))?.lesson || searchIndex()[0]?.lesson || null;
    const lesson = primary || fallback;
    const pinnedConnection = isPinned && session.connectionLessonId ? lessonById(session.connectionLessonId) : null;
    const connection = pinnedConnection && String(pinnedConnection.id) !== String(lesson?.id)
      ? pinnedConnection
      : dailyConnectionFor(lesson);

    const snapshotPatch = {};
    if (mystery?.id && String(session.mysteryId || "") !== String(mystery.id)) snapshotPatch.mysteryId = mystery.id;
    if (lesson?.id && String(session.primaryLessonId || "") !== String(lesson.id)) snapshotPatch.primaryLessonId = lesson.id;
    if (connection?.id && String(session.connectionLessonId || "") !== String(connection.id)) snapshotPatch.connectionLessonId = connection.id;
    const disciplineId = mystery ? mysteryDisciplineId(mystery) : (lesson ? lessonDisciplineId(lesson) : activeDisciplineId());
    if (disciplineId && String(session.disciplineId || "") !== String(disciplineId)) snapshotPatch.disciplineId = disciplineId;
    if (isPinned && Object.keys(snapshotPatch).length) writeExpeditionSession({ ...snapshotPatch, snapshotAt: session.snapshotAt || Date.now() });

    const daily = dailyStatus();
    const loggedCourses = new Set((daily?.log?.courses || []).map(value => String(value)));
    const mysteryDone = Boolean(mystery?.id && mysterySolved(mystery.id));
    // L'expédition est un parcours du jour, pas un reflet des validations historiques.
    // Une étape ne devient visible comme accomplie que si la précédente l'est déjà.
    const lessonDoneToday = Boolean(lesson?.id && loggedCourses.has(String(lesson.id)));
    const connectionDoneToday = Boolean(connection?.id && loggedCourses.has(String(connection.id)));
    const lessonDoneNow = Boolean(mysteryDone && lessonDoneToday);
    const connectionDone = Boolean(lessonDoneNow && connectionDoneToday);
    const recallDone = Boolean(connectionDone && recallCompletedToday());
    const done = [mysteryDone, lessonDoneNow, connectionDone, recallDone].filter(Boolean).length;
    return { mystery, lesson, connection, daily, mysteryDone, lessonDoneNow, connectionDone, recallDone, done };
  }

  function clip(value, max = 160){
    const clean = String(value || "").replace(/\s+/g, " ").trim();
    if (clean.length <= max) return clean;
    return `${clean.slice(0, Math.max(0, max - 1)).replace(/\s+\S*$/, "")}…`;
  }

  function dateKeyFor(date){
    const d = date instanceof Date ? date : new Date(date || Date.now());
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function todayLabel(){
    try {
      const text = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
      return text.charAt(0).toUpperCase() + text.slice(1);
    } catch { return "Aujourd’hui"; }
  }

  function dossierNumber(){
    try { return String((typeof todayIndex === "function" ? todayIndex() : Math.floor(Date.now() / 86400000)) % 1000).padStart(3, "0"); }
    catch { return "001"; }
  }

  function mysteryTeaserSafe(mystery){
    if (!mystery) return "Un nouveau dossier t’attend aujourd’hui.";
    try {
      if (typeof mysteryTeaser === "function") return clip(mysteryTeaser(mystery), 190);
    } catch {}
    return clip(mystery.prompt || mystery.intro || mystery.explanation || "Observe les indices et retrouve le fil commun.", 190);
  }

  const EXPEDITION_STAGE_MINUTES = Object.freeze({ mystery: 3, lesson: 3, connection: 2, recall: 1, done: 0 });

  function expeditionRemainingMinutes(info){
    if (!info || info.done >= 4) return 0;
    let total = 0;
    if (!info.mysteryDone) total += EXPEDITION_STAGE_MINUTES.mystery;
    if (!info.lessonDoneNow) total += EXPEDITION_STAGE_MINUTES.lesson;
    if (!info.connectionDone) total += EXPEDITION_STAGE_MINUTES.connection;
    if (!info.recallDone) total += EXPEDITION_STAGE_MINUTES.recall;
    return Math.max(1, total);
  }

  function expeditionNext(info){
    const mysteryTitle = info.mystery ? (typeof mysteryDisplayTitle === "function" ? mysteryDisplayTitle(info.mystery) : info.mystery.title) : "Mystère du jour";
    const lessonTitle = info.lesson?.title || "Cours associé";
    const connectionTitle = info.connection?.title || "Connexion à découvrir";
    if (!info.mysteryDone) return { key: "mystery", action: "mystery", kicker: "Étape 1 sur 4 · Enquête", title: "Lancer l’enquête", text: "Résous l’énigme avant de lire le cours.", cta: "Ouvrir le dossier", shortCta: "Ouvrir", icon: "?", minutes: EXPEDITION_STAGE_MINUTES.mystery };
    if (!info.lessonDoneNow) return { key: "lesson", action: info.lesson ? `lesson:${info.lesson.id}` : "catalog", kicker: "Étape 2 sur 4 · Comprendre", title: "Lire le cours associé", text: lessonTitle, cta: "Lire le cours", shortCta: "Lire", icon: "↗", minutes: EXPEDITION_STAGE_MINUTES.lesson };
    if (!info.connectionDone) return { key: "connection", action: info.connection ? `lesson:${info.connection.id}` : "map", kicker: "Étape 3 sur 4 · Relier", title: "Faire la connexion", text: connectionTitle, cta: "Explorer le lien", shortCta: "Relier", icon: "∞", minutes: EXPEDITION_STAGE_MINUTES.connection };
    if (!info.recallDone) return { key: "recall", action: "recall", kicker: "Étape 4 sur 4 · Retenir", title: "Ancrer l’idée", text: info.daily?.log?.planType === "review" ? "Une notion ancienne revient pour consolider ta mémoire." : "Un rappel très court pour fixer ce que tu viens de voir.", cta: "Consolider", shortCta: "Réviser", icon: "↻", minutes: EXPEDITION_STAGE_MINUTES.recall };
    return { key: "done", action: "surprise", kicker: "Expédition terminée", title: "Mission accomplie", text: `Nouveau dossier dans ${typeof timeToNextDaily === "function" ? timeToNextDaily() : "quelques heures"}.`, cta: "Sujet surprise", shortCta: "Surprise", icon: "✓", minutes: 0 };
  }

  function rewardData(info){
    let claim = null;
    try {
      const key = typeof localDayKey === "function" ? localDayKey() : dateKeyFor(new Date());
      claim = state.dailyClaims?.[key] || null;
    } catch {}
    if (claim) return { earned: true, gems: Number(claim.gems || 1), streak: Number(claim.streak || state.streak || 0) };
    let preview = { gems: 1, nextStreak: Math.max(1, Number(state.streak || 0) + 1), bonus: 0 };
    try { if (typeof dailyRewardPreview === "function") preview = dailyRewardPreview(); } catch {}
    return { earned: Boolean(info.mysteryDone), gems: Number(preview.gems || 1), streak: Number(preview.nextStreak || state.streak || 1), bonus: Number(preview.bonus || 0) };
  }

  function expeditionPerformance(info){
    const solved = info?.mystery?.id ? (state.solvedMysteries?.[info.mystery.id] || {}) : {};
    const hints = Math.max(0, Number(solved.hints || 0));
    const tries = Math.max(0, Number(solved.tries || 0));
    const score = Math.max(0, Number(solved.score || 0));
    return {
      hints,
      tries,
      score,
      precision: Boolean(info?.mysteryDone && hints === 0),
      firstTry: Boolean(info?.mysteryDone && tries <= 1)
    };
  }

  function expeditionSessionForDay(){
    const preferences = state.expeditionPreferences && typeof state.expeditionPreferences === "object" ? state.expeditionPreferences : {};
    const sessions = preferences.sessionsByDay && typeof preferences.sessionsByDay === "object" ? preferences.sessionsByDay : {};
    return sessions[expeditionDayKey()] || null;
  }

  function writeExpeditionSession(patch = {}){
    const key = expeditionDayKey();
    const preferences = state.expeditionPreferences && typeof state.expeditionPreferences === "object" ? state.expeditionPreferences : {};
    const sessions = preferences.sessionsByDay && typeof preferences.sessionsByDay === "object" ? { ...preferences.sessionsByDay } : {};
    sessions[key] = { ...(sessions[key] || {}), ...patch };
    const keep = Object.keys(sessions).sort().slice(-31);
    state.expeditionPreferences = { ...preferences, version: VERSION, sessionsByDay: Object.fromEntries(keep.map(day => [day, sessions[day]])) };
    try { if (typeof saveState === "function") saveState(); } catch {}
    return sessions[key];
  }

  function ensureExpeditionStarted(){
    const current = expeditionSessionForDay();
    if (current?.startedAt) return current;
    // Le choix reste libre tant que l'utilisateur n'a pas lancé l'expédition.
    // Au premier geste, on capture exactement le dossier et les deux cours affichés.
    const draft = expeditionData();
    const disciplineId = draft.mystery ? mysteryDisciplineId(draft.mystery) : (draft.lesson ? lessonDisciplineId(draft.lesson) : activeDisciplineId());
    return writeExpeditionSession({
      startedAt: Date.now(),
      snapshotAt: Date.now(),
      mysteryId: draft.mystery?.id || null,
      primaryLessonId: draft.lesson?.id || null,
      connectionLessonId: draft.connection?.id || null,
      disciplineId
    });
  }

  function markExpeditionFinished(){
    const current = expeditionSessionForDay();
    return writeExpeditionSession({ startedAt: current?.startedAt || Date.now(), completedAt: Date.now() });
  }

  function expeditionElapsedMinutes(){
    const session = expeditionSessionForDay();
    if (!session?.startedAt) return 0;
    const end = session.completedAt || Date.now();
    return Math.max(1, Math.round((end - session.startedAt) / 60000));
  }

  function expeditionChallengeLabel(info){
    const performance = expeditionPerformance(info);
    if (!info?.mysteryDone) return { tone: "open", icon: "◎", text: "Défi : résoudre sans indice" };
    if (performance.precision && performance.firstTry) return { tone: "success", icon: "✓", text: "Premier essai, zéro indice" };
    if (performance.precision) return { tone: "success", icon: "✓", text: "Résolu sans indice" };
    return { tone: "done", icon: "✓", text: `Dossier résolu · ${performance.hints} indice${performance.hints > 1 ? "s" : ""}` };
  }

  function stageToast(message, detail = ""){
    document.querySelector(".hd213-stage-toast")?.remove();
    const toast = document.createElement("div");
    toast.className = "hd213-stage-toast";
    toast.setAttribute("role", "status");
    toast.innerHTML = `<span>${HD_ICONS.action("check")}</span><div><b>${esc(message)}</b>${detail ? `<small>${esc(detail)}</small>` : ""}</div>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    window.setTimeout(() => { toast.classList.remove("show"); window.setTimeout(() => toast.remove(), 260); }, 2300);
  }

  function acknowledgeExpeditionProgress(info){
    const key = expeditionDayKey();
    const preferences = state.expeditionPreferences && typeof state.expeditionPreferences === "object" ? state.expeditionPreferences : {};
    const seen = preferences.seenProgressByDay && typeof preferences.seenProgressByDay === "object" ? { ...preferences.seenProgressByDay } : {};
    const previous = Number(seen[key]);
    seen[key] = Number(info?.done || 0);
    const keep = Object.keys(seen).sort().slice(-31);
    state.expeditionPreferences = { ...preferences, version: VERSION, seenProgressByDay: Object.fromEntries(keep.map(day => [day, seen[day]])) };
    try { if (typeof saveState === "function") saveState(); } catch {}
    if (!Number.isFinite(previous) || info.done <= previous || info.done >= 4) return;
    const labels = ["", "Enquête résolue", "Cours compris", "Connexion créée", "Expédition terminée"];
    const next = expeditionNext(info);
    stageToast(labels[info.done] || "Étape validée", info.done < 4 ? `Prochaine étape : ${next.title}` : "+10 XP");
    try { navigator.vibrate?.([12, 35, 18]); } catch {}
  }

  function weekTrail(){
    const labels = [];
    const today = new Date();
    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - offset);
      const key = dateKeyFor(date);
      const weekday = new Intl.DateTimeFormat("fr-FR", { weekday: "narrow" }).format(date).toUpperCase();
      labels.push({ key, weekday, day: date.getDate(), done: Boolean(state.dailyClaims?.[key]), today: offset === 0 });
    }
    return labels;
  }

  function weekTrailMarkup(){
    const days = weekTrail();
    const completed = days.filter(day => day.done).length;
    return `<div class="hd210-week-card" aria-label="Rendez-vous des sept derniers jours">
      <div class="hd210-mini-head"><span>Rythme sur 7 jours</span><strong>${completed}/7</strong></div>
      <div class="hd210-week-days">${days.map(day => `<span class="${day.done ? "done" : ""} ${day.today ? "today" : ""}" title="${esc(day.key)}"><b>${esc(day.weekday)}</b><i>${day.done ? "✓" : day.day}</i></span>`).join("")}</div>
    </div>`;
  }

  function rewardMarkup(info){
    const reward = rewardData(info);
    const label = reward.earned ? "Récompense récupérée" : "Récompense du jour";
    const detail = reward.earned
      ? `Série portée à ${reward.streak} jour${reward.streak > 1 ? "s" : ""}`
      : `Série ${reward.streak} si tu résous le dossier`;
    return `<div class="hd210-reward-card ${reward.earned ? "earned" : ""}">
      <span aria-hidden="true">${reward.earned ? "✓" : "◆"}</span>
      <div><small>${label}</small><strong>+${reward.gems} gemme${reward.gems > 1 ? "s" : ""}</strong><em>${esc(detail)}</em></div>
    </div>`;
  }

  function stageMarkup({ number, icon, title, text, done, current, action, disabled = false, minutes = 1 }){
    const stateLabel = done ? "Fait" : current ? `${minutes} min` : "Verrouillé";
    return `<button type="button" class="hd208-expedition-step hd212-route-step ${done ? "done" : ""} ${current ? "current" : ""} ${disabled ? "locked" : ""}" ${action && !disabled ? `data-hd187-action="${esc(action)}"` : ""} ${disabled ? 'disabled aria-disabled="true"' : ""} aria-label="Étape ${number} : ${esc(title)}${disabled ? ", verrouillée" : ""}">
      <span class="hd212-step-node" aria-hidden="true">${done ? HD_ICONS.action("check") : disabled ? "·" : icon || number}</span>
      <span class="hd212-step-title">${esc(title)}</span>
      <span class="hd212-step-status">${esc(stateLabel)}</span>
      ${current && text ? `<span class="sr-only">${esc(text)}</span>` : ""}
    </button>`;
  }

  function heroPulseMarkup(info){
    const reward = rewardData(info);
    const remaining = expeditionRemainingMinutes(info);
    const next = expeditionNext(info);
    const stage = info.done >= 4 ? "4/4" : `${Math.min(4, info.done + 1)}/4`;
    const summary = info.done >= 4
      ? `Mission terminée · série ${state.streak || 0}`
      : `${next.kicker.replace(/Étape\s+\d+\s+sur\s+4\s+·\s*/i, "")} · ${remaining} min`;
    const headline = info.done >= 4 ? "Expédition terminée" : info.done > 0 ? "Reprendre ton parcours" : "Dossier du jour prêt";
    return `<button type="button" class="hd212-daily-glance hd213-daily-glance" data-hd212-jump-expedition aria-label="Voir l’expédition du jour, étape ${stage} : ${esc(next.title)}">
      <span class="hd212-glance-copy"><small>${esc(todayLabel())} · dossier #${dossierNumber()}</small><strong>${headline}</strong></span>
      <span class="hd212-glance-meta"><b>${stage}</b><small>${esc(summary)}</small></span>
      <span class="hd212-glance-progress" aria-hidden="true">${[0,1,2,3].map(index => `<i class="${index < info.done ? "done" : index === info.done && info.done < 4 ? "current" : ""}"></i>`).join("")}</span>
      <span class="hd212-glance-arrow" aria-hidden="true">↓</span>
    </button>`;
  }

  function enhanceHomeHero(shell){
    const hero = shell?.querySelector(".home-mode-hero");
    if (!hero || hero.querySelector(".hd212-daily-glance")) return;
    hero.classList.add("hd212-home-hero");
    const copy = hero.querySelector(".premium-header-copy");
    if (copy) copy.insertAdjacentHTML("beforeend", heroPulseMarkup(expeditionData()));
    else hero.insertAdjacentHTML("beforeend", heroPulseMarkup(expeditionData()));
  }

  function completedJourneyMarkup(info, reward){
    const performance = expeditionPerformance(info);
    const elapsed = expeditionElapsedMinutes();
    const answer = clip(info?.mystery?.answer || info?.mystery?.title || "Dossier résolu", 70);
    return `<div class="hd213-complete-card">
      <div class="hd213-complete-mark" aria-hidden="true">${HD_ICONS.action("check")}</div>
      <div class="hd213-complete-copy"><small>Expédition bouclée</small><h3>${esc(answer)}</h3><p>${esc(info.lesson?.title || "Cours associé")} <span>→</span> ${esc(info.connection?.title || "Connexion explorée")}</p></div>
      <div class="hd213-complete-stats"><span><b>${elapsed || 1}</b><small>min</small></span><span><b>${performance.score || "+10"}</b><small>${performance.score ? "score" : "XP"}</small></span><span><b>+${reward.gems}</b><small>gemme</small></span></div>
      <div class="hd213-complete-actions"><button type="button" data-hd213-share-expedition>${HD_ICONS.action("spark")} Partager</button><button type="button" class="primary" data-hd187-action="surprise">Sujet bonus <b aria-hidden="true">→</b></button></div>
    </div>`;
  }

  function expeditionStageLead(info, next){
    if (info.done >= 4) return "Quatre gestes, deux cours reliés, une notion retenue.";
    if (!info.mysteryDone) return "Commence par l’énigme : le cours reste volontairement caché.";
    if (!info.lessonDoneNow) return `Sujet révélé : ${info.lesson?.title || "le cours associé"}.`;
    if (!info.connectionDone) return `${info.lesson?.title || "Le premier cours"} mène maintenant vers ${info.connection?.title || "une nouvelle idée"}.`;
    return "Une seule question suffit pour ancrer l’idée et fermer la boucle.";
  }

  function shareExpedition(){
    const info = expeditionData();
    const performance = expeditionPerformance(info);
    const elapsed = expeditionElapsedMinutes();
    const text = `HistoDaily · expédition du jour terminée en ${elapsed || 1} min${performance.score ? ` · ${performance.score} XP au mystère` : ""}. ${info.lesson?.title || "Un cours"} → ${info.connection?.title || "une connexion"}.`;
    const url = window.HISTODAILY_CORE?.ui?.shareBaseUrl || window.location.href;
    if (navigator.share) return navigator.share({ title: "Mon expédition HistoDaily", text, url }).catch(() => {});
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(`${text} ${url}`).then(() => stageToast("Résultat copié", "Prêt à être partagé")).catch(() => stageToast("Expédition terminée", text));
    stageToast("Expédition terminée", text);
    return Promise.resolve();
  }

  function openCompletionCelebration(){
    // RC16: no forced multi-screen delivery. Completion is acknowledged inline/toast only.
    const info = expeditionData();
    const reward = rewardData(info);
    const performance = expeditionPerformance(info);
    const detail = `${performance.score ? `${performance.score} XP · ` : ""}+${reward.gems} gemme${reward.gems > 1 ? "s" : ""}`;
    stageToast("Expédition terminée", detail);
    try { navigator.vibrate?.([18, 35, 24]); } catch {}
    return null;
  }

  function expeditionMarkup(){
    const info = expeditionData();
    const mysteryTitle = info.mystery ? (typeof mysteryDisplayTitle === "function" ? mysteryDisplayTitle(info.mystery) : info.mystery.title) : "Mystère du jour";
    const lessonTitle = info.lesson?.title || "Cours associé";
    const connectionTitle = info.connection?.title || "Connexion à découvrir";
    const next = expeditionNext(info);
    const discipline = disciplineById(activeDisciplineId());
    const completionPct = pct(info.done, 4);
    const reward = rewardData(info);
    const challenge = expeditionChallengeLabel(info);
    const weekDays = weekTrail();
    const weekDone = weekDays.filter(day => day.done).length;
    const stageLabel = info.done === 4 ? "4/4" : `${Math.min(4, info.done + 1)}/4`;
    const remaining = expeditionRemainingMinutes(info);
    const stageLead = expeditionStageLead(info, next);
    const actionDetail = next.key === "connection"
      ? `${lessonTitle} → ${connectionTitle}`
      : next.key === "lesson"
        ? lessonTitle
        : next.text;
    const unlockHint = !info.mysteryDone
      ? "Le sujet du cours apparaît après la résolution."
      : !info.lessonDoneNow
        ? "Valide le cours pour ouvrir la connexion."
        : !info.connectionDone
          ? "Le second cours transforme l’information en lien durable."
          : !info.recallDone
            ? "Une question éclair clôt l’expédition."
            : "Reviens demain pour un nouveau dossier.";

    return `<section tabindex="-1" class="card hd187-expedition-card hd208-expedition-card hd210-expedition-card hd211-expedition-card hd212-expedition-card hd213-expedition-card ${info.done === 4 ? "is-complete" : ""}" data-hd210-stage="${esc(next.key)}" style="--discipline-accent:${esc(discipline.accent)};--journey-progress:${completionPct}%;--hd212-progress:${completionPct * 3.6}deg">
      <div class="hd208-expedition-orbit hd212-orbit" aria-hidden="true"><i></i><i></i><i></i></div>

      <header class="hd212-expedition-head hd213-expedition-head">
        <div><span class="card-label"><span class="hd208-live-dot" aria-hidden="true"></span> Expédition du jour</span><h2>${info.done === 4 ? "Mission accomplie" : next.title}</h2><p>${esc(stageLead)}</p></div>
        <span class="hd212-progress-ring" aria-label="${completionPct}% terminé"><b>${stageLabel}</b><small>${info.done === 4 ? "fini" : "étape"}</small></span>
      </header>

      <div class="hd212-mission-brief hd213-mission-brief">
        <div class="hd212-brief-meta"><span>${esc(todayLabel())} · dossier #${dossierNumber()}</span><em>${HD_ICONS.discipline(discipline)} ${esc(discipline.title)}</em></div>
        <div class="hd213-title-row"><div><small>${info.mysteryDone ? "Dossier résolu" : "Briefing sans spoiler"}</small><h3>${esc(mysteryTitle)}</h3></div><span class="hd213-challenge ${challenge.tone}"><b>${challenge.icon}</b>${esc(challenge.text)}</span></div>
        <p>${esc(mysteryTeaserSafe(info.mystery))}</p>

        ${info.done === 4 ? completedJourneyMarkup(info, reward) : `<button type="button" class="hd212-main-cta hd213-main-cta" data-hd187-action="${esc(next.action)}">
          <span class="hd212-cta-icon" aria-hidden="true">${next.icon}</span>
          <span class="hd212-cta-copy"><small>${esc(next.kicker)}</small><strong>${esc(next.title)}</strong><em>${esc(actionDetail)}</em></span>
          <span class="hd212-cta-tail"><small>${next.minutes ? `${next.minutes} min` : "Bonus"}</small><b aria-hidden="true">→</b></span>
        </button>`}
      </div>

      <div class="hd212-route hd213-route" aria-label="Parcours quotidien">
        <div class="hd212-route-head"><span>Ton chemin</span><strong>${info.done}/4</strong></div>
        <div class="hd212-route-line" aria-hidden="true"><i></i></div>
        <div class="hd212-route-steps">
          ${stageMarkup({ number: 1, icon: "?", title: "Résoudre", text: mysteryTitle, done: info.mysteryDone, current: next.key === "mystery", action: "mystery", disabled: !info.mystery, minutes: 3 })}
          ${stageMarkup({ number: 2, icon: "↗", title: "Comprendre", text: lessonTitle, done: info.lessonDoneNow, current: next.key === "lesson", action: info.lesson ? `lesson:${info.lesson.id}` : "catalog", disabled: !info.lesson || !info.mysteryDone, minutes: 3 })}
          ${stageMarkup({ number: 3, icon: "∞", title: "Relier", text: connectionTitle, done: info.connectionDone, current: next.key === "connection", action: info.connection ? `lesson:${info.connection.id}` : "map", disabled: !info.connection || !info.lessonDoneNow, minutes: 2 })}
          ${stageMarkup({ number: 4, icon: "↻", title: "Retenir", text: info.daily?.log?.planType === "review" ? "Une notion ancienne à consolider" : "Un rappel rapide", done: info.recallDone, current: next.key === "recall", action: "recall", disabled: !info.connectionDone, minutes: 1 })}
        </div>
        <p class="hd212-unlock-hint">${esc(unlockHint)}</p>
      </div>

      ${info.done === 4 ? "" : `<footer class="hd212-momentum hd213-momentum ${reward.earned ? "earned" : ""}">
        <div class="hd212-reward"><span aria-hidden="true">${reward.earned ? "✓" : "◆"}</span><div><small>${reward.earned ? "Récompense obtenue" : "À gagner aujourd’hui"}</small><strong>+${reward.gems} gemme${reward.gems > 1 ? "s" : ""}</strong><em>Série visée : ${reward.streak}</em></div></div>
        <div class="hd212-week" aria-label="${weekDone} jours actifs sur les sept derniers jours"><div><small>Rythme</small><b>${weekDone}/7</b></div><span>${weekDays.map(day => `<i class="${day.done ? "done" : ""} ${day.today ? "today" : ""}" title="${esc(day.key)}"></i>`).join("")}</span></div>
      </footer>`}
    </section>`;
  }

  function seasonDefinitions(){
    const index = searchIndex();
    const byIds = ids => ids.map(id => index.find(item => item.lesson.id === id)?.lesson).filter(Boolean);
    const byTerms = (terms, max = 8) => index.filter(item => terms.some(term => item.searchable.includes(norm(term)))).map(item => item.lesson).slice(0, max);
    return [
      {
        id: "solar-frontiers",
        title: "Aux frontières du Système solaire",
        icon: "astronomy",
        description: "Planètes géantes, lunes océaniques, comètes et exploration des mondes lointains.",
        lessons: byIds(["astro-solar-system-formation", "astro-rocky-planets", "astro-giant-planets", "astro-ocean-moons", "astro-asteroids-comets", "astro-meteors-impacts", "astro-rockets-orbits", "astro-moon-mars-exploration"])
      },
      {
        id: "change-the-world",
        title: "Les idées qui ont changé le monde",
        icon: "science",
        description: "Découvertes, techniques et ruptures intellectuelles qui transforment notre façon de comprendre.",
        lessons: byTerms(["imprimerie", "radioactiv", "ordinateur", "galilee", "vaccin", "monnaie", "perspective"], 8)
      },
      {
        id: "images-and-power",
        title: "Images, récits et pouvoir",
        icon: "art",
        description: "Art, cinéma, symboles et récits collectifs : comment les images façonnent une société.",
        lessons: byTerms(["cinema", "film", "art", "image", "propagande", "architecture", "cubisme", "street art"], 8)
      }
    ].map(season => ({ ...season, lessons: unique(season.lessons) })).filter(season => season.lessons.length);
  }

  function seasonProgress(season){
    const done = season.lessons.filter(lesson => lessonDone(lesson.id)).length;
    return { done, total: season.lessons.length, progress: pct(done, season.lessons.length), next: season.lessons.find(lesson => !lessonDone(lesson.id)) || season.lessons[0] };
  }

  function currentSeason(){ return seasonDefinitions()[0] || null; }

  function seasonMarkup(){
    const season = currentSeason();
    if (!season) return "";
    const progress = seasonProgress(season);
    return `<section class="card hd187-season-card hd192-season-card hd212-season-card">
      <span class="hd212-season-icon">${HD_ICONS.action(season.icon || HD_ICONS.fromText(season.title, "spark"))}</span>
      <div class="hd212-season-copy"><small>Saison éditoriale</small><h2>${esc(season.title)}</h2><p>${esc(season.description)}</p><div><i><em style="width:${progress.progress}%"></em></i><span>${progress.done}/${progress.total}</span></div></div>
      <button type="button" data-hd187-season-next="${esc(progress.next?.id || "")}">${progress.done >= progress.total ? "Revoir" : "Explorer"}<b aria-hidden="true">→</b></button>
    </section>`;
  }

  function freeExploreMarkup(){
    const lessons = searchIndex();
    return `<section class="card hd187-free-card">
      <div class="section-title-row"><div><span class="card-label">Explorer librement</span><h2>Tu cherches un sujet précis ?</h2><p>${lessons.length} cours restent disponibles à tout moment, indépendamment de l’expédition et de la saison.</p></div><small>Accès libre</small></div>
      <div class="hd187-free-actions">
        <button type="button" data-hd187-open-search><span>${HD_ICONS.action("search")}</span><b>Rechercher un cours</b><small>Titre, thème, discipline ou mot-clé</small></button>
        <button type="button" data-hd187-open-map><span>${HD_ICONS.action("map")}</span><b>Carte du savoir</b><small>Voir les domaines et leurs connexions</small></button>
        <button type="button" data-hd187-open-catalog><span>${HD_ICONS.action("catalog")}</span><b>Catalogue complet</b><small>Parcourir librement les chapitres</small></button>
      </div>
    </section>`;
  }

  function removeOldHomeBlocks(shell){
    shell.querySelectorAll(".beta180-daily-plan,.home-continue-card,.home-discovery-card,.home-secondary-actions").forEach(node => node.remove());
  }

  function enhanceHome(){
    const shell = document.querySelector(".app-shell.tab-home");
    if (!shell || shell.dataset.hd187Enhanced === "1") return;
    shell.dataset.hd187Enhanced = "1";
    shell.classList.add("hd212-home-shell");
    removeOldHomeBlocks(shell);
    shell.querySelectorAll(".release-notes-card,.release-card,.beta182-update-card").forEach(node => node.remove());
    enhanceHomeHero(shell);
    const mysteryCard = shell.querySelector(".home-mystery-card") || shell.querySelector(".home-main-card");
    if (mysteryCard) {
      mysteryCard.insertAdjacentHTML("beforebegin", expeditionMarkup());
      if (mysteryCard.classList.contains("home-mystery-card")) mysteryCard.remove();
    } else {
      shell.querySelector(".hero")?.insertAdjacentHTML("afterend", expeditionMarkup());
    }
    const nextCard = shell.querySelector(".beta182-next-card");
    const discovery = shell.querySelector(".beta182-discovery-card");
    nextCard?.classList.add("hd212-next-card");
    discovery?.classList.add("hd212-discovery-card");

    // Évite de proposer exactement le même cours dans « À continuer » et « À découvrir ».
    const nextButton = nextCard?.querySelector("[data-home-continue]");
    if (nextButton) {
      nextButton.textContent = "Ouvrir";
      const nextId = String(nextButton.dataset.homeContinue || "");
      const duplicate = Array.from(discovery?.querySelectorAll("[data-home-discovery]") || []).find(node => String(node.dataset.homeDiscovery || "") === nextId);
      duplicate?.remove();
    }
    const discoveryItems = discovery?.querySelectorAll("[data-home-discovery]")?.length || 0;
    const discoveryTitle = discovery?.querySelector(".section-title-row h2");
    if (discoveryTitle && discoveryItems) discoveryTitle.textContent = discoveryItems === 1 ? "Une autre piste à explorer" : `${discoveryItems} autres pistes à explorer`;

    const anchor = discovery || nextCard || shell.querySelector(".bottom-nav");
    if (anchor) anchor.insertAdjacentHTML(anchor.matches(".bottom-nav") ? "beforebegin" : "afterend", seasonMarkup());
    else shell.insertAdjacentHTML("beforeend", seasonMarkup());
    bindShellActions(shell);
    window.setTimeout(() => acknowledgeExpeditionProgress(expeditionData()), 80);
  }

  function globalSearchBarMarkup(){
    return `<section class="card hd187-search-entry">
      <button type="button" data-hd187-open-search><span>⌕</span><div><b>Rechercher dans tous les cours</b><small>Ouvre directement n’importe quel sujet, quelle que soit la discipline.</small></div><em>${searchIndex().length}</em></button>
    </section>`;
  }

  function enhanceLearn(){
    const shell = document.querySelector(".app-shell.tab-learn");
    if (!shell || shell.dataset.hd187Enhanced === "1") return;
    shell.dataset.hd187Enhanced = "1";
    const picker = shell.querySelector(".beta182-discipline-picker,.discipline-picker,.topbar");
    if (picker) picker.insertAdjacentHTML("beforebegin", globalSearchBarMarkup());
    else shell.insertAdjacentHTML("afterbegin", globalSearchBarMarkup());
    bindShellActions(shell);
  }

  function curiosityData(){
    const rows = DISCIPLINES.map(discipline => {
      const lessons = searchIndex().filter(item => item.disciplineId === discipline.id).map(item => item.lesson);
      const completed = lessons.filter(lesson => lessonDone(lesson.id)).length;
      const attempts = lessons.reduce((sum, lesson) => {
        const progress = state.quizProgress?.[lesson.id] || {};
        return sum + Object.keys(progress.answers || {}).length;
      }, 0);
      const reviews = Object.values(state.reviewQueue || {}).filter(entry => {
        const lesson = lessonById(entry?.lessonId);
        return lesson && lessonDisciplineId(lesson) === discipline.id;
      }).length;
      return { discipline, total: lessons.length, completed, attempts, reviews, interest: completed * 5 + attempts };
    }).filter(row => row.total);
    const favorites = rows.slice().sort((a, b) => b.interest - a.interest || b.completed - a.completed).slice(0, 3);
    const weak = rows.filter(row => row.reviews > 0).sort((a, b) => b.reviews - a.reviews)[0] || rows.slice().sort((a, b) => pct(a.completed, a.total) - pct(b.completed, b.total))[0];
    const unexplored = rows.filter(row => row.completed === 0).sort((a, b) => b.total - a.total)[0] || null;
    return { rows, favorites, weak, unexplored };
  }

  function curiosityMarkup(){
    const data = curiosityData();
    const favorite = data.favorites[0];
    const affinityChips = data.favorites.length
      ? data.favorites.map(row => `<span class="hd217-affinity-chip">${HD_ICONS.discipline(row.discipline)}<b>${esc(row.discipline.title)}</b></span>`).join("")
      : `<span class="hd217-empty-value">Explore quelques cours pour faire apparaître tes affinités.</span>`;
    const weakTitle = data.weak ? esc(data.weak.discipline.title) : "Mémoire à jour";
    const weakMeta = data.weak?.reviews ? `${data.weak.reviews} rappel${data.weak.reviews > 1 ? "s" : ""} prévu${data.weak.reviews > 1 ? "s" : ""}` : "Aucun rappel urgent";
    const discoveryTitle = data.unexplored ? esc(data.unexplored.discipline.title) : "Connexion inattendue";
    const discoveryMeta = data.unexplored ? "Un domaine encore peu exploré" : "Une nouvelle piste sera proposée bientôt";
    return `<section class="card hd187-curiosity-card hd217-curiosity-card">
      <header class="hd217-curiosity-head">
        <div><span class="card-label">Profil de curiosité</span><h2>${favorite ? "Ta curiosité prend forme" : "Construis ta carte personnelle"}</h2><p>Un aperçu simple de ce que tu explores, de ce qui mérite un rappel et de ta prochaine découverte.</p></div>
        <button type="button" class="ghost hd217-curiosity-map" data-hd187-open-map><span>${HD_ICONS.action("map")}</span><b>Voir la carte</b></button>
      </header>
      <div class="hd217-curiosity-list">
        <article class="hd217-curiosity-row affinity"><span class="hd217-curiosity-icon">${favorite ? HD_ICONS.discipline(favorite.discipline) : HD_ICONS.action("spark")}</span><div><small>Tes affinités</small><div class="hd217-affinity-list">${affinityChips}</div></div></article>
        <article class="hd217-curiosity-row memory"><span class="hd217-curiosity-icon">${data.weak ? HD_ICONS.discipline(data.weak.discipline) : HD_ICONS.action("check")}</span><div><small>À renforcer</small><strong>${weakTitle}</strong><em>${esc(weakMeta)}</em></div></article>
        <article class="hd217-curiosity-row discovery"><span class="hd217-curiosity-icon">${data.unexplored ? HD_ICONS.discipline(data.unexplored.discipline) : HD_ICONS.action("mystery")}</span><div><small>Prochaine découverte</small><strong>${discoveryTitle}</strong><em>${esc(discoveryMeta)}</em></div></article>
      </div>
    </section>`;
  }

  function enhanceProfile(){
    const shell = document.querySelector(".app-shell.tab-profile");
    if (!shell) return;
    if (window.HD_SOCIAL_V2_ONLY === true && shell.querySelector(".hdsv2-profile-screen")) {
      shell.dataset.hd187Enhanced = "1";
      shell.querySelectorAll(":scope > .hd187-curiosity-card, :scope > .hd217-curiosity-card").forEach(node => node.remove());
      return;
    }
    if (shell.dataset.hd187Enhanced === "1") return;
    shell.dataset.hd187Enhanced = "1";
    const target = shell.querySelector(".beta181-weekly-card,.beta179-profile-mastery,.public-profile-card,.topbar");
    if (target) target.insertAdjacentHTML("beforebegin", curiosityMarkup());
    else shell.insertAdjacentHTML("afterbegin", curiosityMarkup());
    bindShellActions(shell);
  }

  function injectSpoilerChoice(){
    const shell = document.querySelector(".app-shell.tab-lesson");
    if (!shell || shell.querySelector(".hd187-spoiler-note")) return;
    const mystery = currentMysterySafe();
    if (!mystery?.lessonId || mysterySolved(mystery.id) || String(mystery.lessonId) !== String(state.currentLessonId)) return;
    const note = document.createElement("aside");
    note.className = "hd187-spoiler-note";
    note.innerHTML = `<span>!</span><div><b>Ce cours peut révéler le mystère du jour.</b><p>Tu as demandé un accès totalement libre : le cours reste ouvert. Tu peux aussi revenir au mystère avant de poursuivre.</p></div><button type="button" data-hd187-action="mystery">Voir le mystère</button>`;
    const reading = shell.querySelector(".reading-card,.lesson-full-page");
    reading?.insertAdjacentElement("beforebegin", note);
    bindShellActions(shell);
  }

  function closeLayer(){
    document.getElementById(ROOT_ID)?.remove();
    document.body.classList.remove("hd187-layer-open");
  }

  function layer(title, subtitle, body, extraClass = ""){
    closeLayer();
    const overlay = document.createElement("div");
    overlay.id = ROOT_ID;
    overlay.className = `hd187-layer ${extraClass}`;
    overlay.innerHTML = `<div class="hd187-layer-backdrop" data-hd187-close></div><section class="hd187-layer-panel" role="dialog" aria-modal="true" aria-labelledby="hd187-layer-title"><header><div><span>HistoDaily</span><h2 id="hd187-layer-title">${esc(title)}</h2><p>${esc(subtitle)}</p></div><button type="button" class="ghost" data-hd187-close aria-label="Fermer">×</button></header><div class="hd187-layer-body">${body}</div></section>`;
    document.body.appendChild(overlay);
    document.body.classList.add("hd187-layer-open");
    overlay.querySelectorAll("[data-hd187-close]").forEach(node => node.addEventListener("click", closeLayer));
    overlay.addEventListener("keydown", event => { if (event.key === "Escape") closeLayer(); });
    window.setTimeout(() => overlay.querySelector("input,button")?.focus(), 0);
    return overlay;
  }

  let searchDiscipline = "all";
  function searchResults(query = "", disciplineId = searchDiscipline){
    const q = norm(query);
    const terms = q.split(" ").filter(Boolean);
    return searchIndex()
      .filter(item => disciplineId === "all" || item.disciplineId === disciplineId)
      .map(item => {
        if (!terms.length) return { ...item, score: lessonDone(item.lesson.id) ? 0 : 1 };
        let score = 0;
        const title = norm(item.lesson.title);
        terms.forEach(term => {
          if (title === term) score += 100;
          else if (title.startsWith(term)) score += 45;
          else if (title.includes(term)) score += 25;
          if (norm(item.world?.title).includes(term)) score += 12;
          if (norm(item.discipline?.title).includes(term)) score += 9;
          if (item.searchable.includes(term)) score += 4;
        });
        return { ...item, score };
      })
      .filter(item => !terms.length || item.score > 0)
      .sort((a, b) => b.score - a.score || Number(lessonDone(a.lesson.id)) - Number(lessonDone(b.lesson.id)) || a.lesson.title.localeCompare(b.lesson.title, "fr"))
      .slice(0, SEARCH_LIMIT);
  }

  function searchResultsMarkup(query = "", disciplineId = searchDiscipline){
    const results = searchResults(query, disciplineId);
    if (!results.length) return `<div class="hd187-empty"><b>Aucun cours trouvé</b><p>Essaie un mot plus large, comme « étoile », « Rome », « inflation » ou « cubisme ».</p></div>`;
    return `<div class="hd187-search-results">${results.map(item => `<button type="button" data-hd187-course="${esc(item.lesson.id)}" class="${lessonDone(item.lesson.id) ? "done" : ""}"><span>${HD_ICONS.lesson(item.lesson, item.world, item.discipline)}</span><div><b>${esc(item.lesson.title)}</b><small>${esc(item.discipline?.title || "Cours")} · ${esc(item.world?.title || "Parcours")}</small></div><em>${lessonDone(item.lesson.id) ? "Validé" : "Ouvrir"}</em></button>`).join("")}</div>`;
  }

  function openSearch(initial = ""){
    searchDiscipline = "all";
    const filters = [`<button type="button" data-hd187-search-discipline="all" class="active">Tout</button>`]
      .concat(DISCIPLINES.map(d => `<button type="button" data-hd187-search-discipline="${esc(d.id)}">${HD_ICONS.discipline(d)} ${esc(d.title)}</button>`)).join("");
    const overlay = layer("Rechercher un cours", "Tous les sujets restent accessibles librement.", `<div class="hd187-search-box"><span>⌕</span><input type="search" data-hd187-search-input value="${esc(initial)}" placeholder="Ex. trous noirs, Vikings, inflation…" autocomplete="off" /></div><div class="hd187-search-filters">${filters}</div><div data-hd187-search-output>${searchResultsMarkup(initial)}</div>`, "hd187-search-layer");
    const input = overlay.querySelector("[data-hd187-search-input]");
    const output = overlay.querySelector("[data-hd187-search-output]");
    const redraw = () => {
      output.innerHTML = searchResultsMarkup(input.value, searchDiscipline);
      output.querySelectorAll("[data-hd187-course]").forEach(button => button.addEventListener("click", () => openCourse(button.dataset.hd187Course, "global-search")));
    };
    overlay.querySelectorAll("[data-hd187-search-discipline]").forEach(button => button.addEventListener("click", () => {
      searchDiscipline = button.dataset.hd187SearchDiscipline;
      overlay.querySelectorAll("[data-hd187-search-discipline]").forEach(item => item.classList.toggle("active", item === button));
      redraw();
    }));
    input.addEventListener("input", redraw);
    redraw();
    input.focus();
  }

  function knowledgeMapMarkup(){
    const rows = curiosityData().rows;
    const activeId = typeof activeDisciplineId === "function" ? activeDisciplineId() : state.currentDiscipline;
    const active = rows.find(row => row.discipline.id === activeId) || rows[0];
    const activeLessons = searchIndex().filter(item => item.disciplineId === active?.discipline.id);
    const nodes = activeLessons.filter(item => lessonDone(item.lesson.id)).slice(-3).concat(activeLessons.filter(item => !lessonDone(item.lesson.id)).slice(0, 4));
    return `<div class="hd187-map-intro"><b>Ta carte grandit avec chaque cours validé.</b><p>Les domaines restent des portes d’entrée libres ; les connexions servent seulement à te proposer le chemin suivant.</p></div>
      <div class="hd187-map-domains">${rows.map(row => `<button type="button" data-hd187-map-discipline="${esc(row.discipline.id)}" class="${row.discipline.id === active?.discipline.id ? "active" : ""}" style="--node-accent:${esc(row.discipline.accent)}"><span class="mini-discipline-icon">${HD_ICONS.rawDiscipline ? HD_ICONS.rawDiscipline(row.discipline) : HD_ICONS.discipline(row.discipline)}</span><b>${esc(row.discipline.title)}</b><small>${row.completed}/${row.total} · ${pct(row.completed, row.total)}%</small></button>`).join("")}</div>
      ${active ? `<section class="hd187-constellation" style="--node-accent:${esc(active.discipline.accent)}"><div class="hd187-constellation-core"><span>${HD_ICONS.discipline(active.discipline)}</span><b>${esc(active.discipline.title)}</b></div><div class="hd187-constellation-nodes">${nodes.map((item, index) => `<button type="button" data-hd187-course="${esc(item.lesson.id)}" class="${lessonDone(item.lesson.id) ? "done" : ""}" style="--orbit:${index}"><span>${HD_ICONS.lesson(item.lesson, item.world, active.discipline)}</span><b>${esc(item.lesson.title)}</b><small>${lessonDone(item.lesson.id) ? "Acquis" : "À explorer"}</small></button>`).join("")}</div></section>` : ""}`;
  }

  function openKnowledgeMap(){
    const overlay = layer("Carte du savoir", "Une navigation visuelle entre les domaines et les notions.", knowledgeMapMarkup(), "hd187-map-layer");
    overlay.querySelectorAll("[data-hd187-course]").forEach(button => button.addEventListener("click", () => openCourse(button.dataset.hd187Course, "knowledge-map")));
    overlay.querySelectorAll("[data-hd187-map-discipline]").forEach(button => button.addEventListener("click", () => openDiscipline(button.dataset.hd187MapDiscipline)));
  }

  function seasonsMarkup(){
    return `<div class="hd187-season-list">${seasonDefinitions().map((season, index) => {
      const progress = seasonProgress(season);
      return `<section class="hd187-season-detail hd192-season-detail ${index === 0 ? "current" : ""}"><div class="hd192-season-banner compact">${HD_ART.season(season.icon || HD_ICONS.fromText(season.title, "spark"))}</div><div><span>${HD_ICONS.action(season.icon || HD_ICONS.fromText(season.title, "spark"))}</span><div><small>${index === 0 ? "Saison actuelle" : "Collection éditoriale"}</small><h3>${esc(season.title)}</h3><p>${esc(season.description)}</p></div><strong>${progress.progress}%</strong></div><i><em style="width:${progress.progress}%"></em></i><div class="hd187-season-lessons">${season.lessons.map(lesson => `<button type="button" data-hd187-course="${esc(lesson.id)}" class="${lessonDone(lesson.id) ? "done" : ""}"><span>${lessonDone(lesson.id) ? HD_ICONS.action("check") : HD_ICONS.lesson(lesson, null, null)}</span><b>${esc(lesson.title)}</b></button>`).join("")}</div></section>`;
    }).join("")}</div>`;
  }

  function openSeasons(){
    const overlay = layer("Saisons éditoriales", "Des sélections pour donner un fil conducteur, jamais pour fermer le catalogue.", seasonsMarkup(), "hd187-seasons-layer");
    overlay.querySelectorAll("[data-hd187-course]").forEach(button => button.addEventListener("click", () => openCourse(button.dataset.hd187Course, "season")));
  }

  function recallQuestionFor(info){
    if (!info?.lesson) return null;
    let content = null;
    try { content = typeof buildLessonContent === "function" ? buildLessonContent(info.lesson) : null; } catch {}
    const quiz = safeArray(content?.quiz).filter(item => item?.q && item?.a);
    if (!quiz.length) return null;
    const seed = (() => { try { return typeof todayIndex === "function" ? todayIndex() : Math.floor(Date.now() / 86400000); } catch { return 0; } })();
    const item = quiz[Math.abs(seed) % quiz.length];
    const options = [...new Set([item.a, ...safeArray(item.choices)].filter(Boolean).map(String))];
    const shift = options.length ? Math.abs(seed + String(info.lesson.id).length) % options.length : 0;
    return { ...item, options: options.slice(shift).concat(options.slice(0, shift)) };
  }

  function openRecallChallenge(){
    const info = expeditionData();
    if (!info.connectionDone) return;
    if (info.recallDone) {
      closeLayer();
      try { setState({ tab: "home" }, { renderImmediate: true, save: true }); } catch {}
      return;
    }
    const question = recallQuestionFor(info);
    if (!question) {
      const overlay = layer("Dernier geste : retenir", "Rappelle-toi l’idée centrale sans rouvrir le cours.", `<section class="hd212-recall-card"><span class="hd212-recall-kicker">Rappel actif · sans pénalité</span><h3>Quelle idée principale veux-tu garder de ce parcours ?</h3><p>Prends quelques secondes pour la reformuler mentalement, puis valide lorsque tu l’as en tête.</p><button type="button" class="hd212-recall-validate">Je l’ai en tête · +10 XP</button></section>`, "hd212-recall-layer");
      overlay.querySelector(".hd212-recall-validate")?.addEventListener("click", () => {
        const fresh = markRecallCompleted();
        closeLayer();
        if (fresh && typeof showXPToast === "function") showXPToast(10, "Expédition terminée");
        try { setState({ tab: "home" }, { renderImmediate: true, save: true }); } catch {}
        window.setTimeout(openCompletionCelebration, 120);
      });
      return;
    }

    const overlay = layer("Dernier geste : retenir", "Une question, sans pénalité. Une bonne réponse boucle l’expédition.", `<section class="hd212-recall-card"><div class="hd212-recall-top"><span class="hd212-recall-kicker">Question éclair</span><em>${HD_ICONS.action("review")} 1 question</em></div><h3>${esc(question.q)}</h3><div class="hd212-recall-options">${question.options.map((option, index) => `<button type="button" data-hd212-recall-choice="${index}"><span>${String.fromCharCode(65 + index)}</span><b>${esc(option)}</b></button>`).join("")}</div><div class="hd212-recall-feedback" aria-live="polite"></div><div class="hd212-recall-actions"><button type="button" class="ghost" data-hd187-action="lesson:${esc(info.lesson.id)}">Revoir le cours</button><button type="button" class="hd212-recall-validate" hidden>Valider l’expédition · +10 XP</button></div></section>`, "hd212-recall-layer");
    const feedback = overlay.querySelector(".hd212-recall-feedback");
    const validate = overlay.querySelector(".hd212-recall-validate");
    overlay.querySelectorAll("[data-hd212-recall-choice]").forEach(button => button.addEventListener("click", () => {
      const choice = question.options[Number(button.dataset.hd212RecallChoice)] || "";
      if (choice === String(question.a)) {
        overlay.querySelectorAll("[data-hd212-recall-choice]").forEach(item => { item.disabled = true; item.classList.toggle("correct", item === button); });
        button.classList.add("correct");
        feedback.className = "hd212-recall-feedback success";
        feedback.innerHTML = `<b>Exact.</b><span>${esc(question.why || question.a)}</span>`;
        validate.hidden = false;
        validate.focus();
      } else {
        button.classList.add("wrong");
        button.disabled = true;
        feedback.className = "hd212-recall-feedback retry";
        feedback.innerHTML = `<b>Pas tout à fait.</b><span>Essaie encore : aucune pénalité.</span>`;
      }
    }));
    validate?.addEventListener("click", () => {
      const fresh = markRecallCompleted();
      closeLayer();
      if (fresh && typeof showXPToast === "function") showXPToast(10, "Expédition terminée");
      try { setState({ tab: "home" }, { renderImmediate: true, save: true }); } catch {}
        window.setTimeout(openCompletionCelebration, 120);
    });
    bindShellActions(overlay);
  }

  function runAction(action){
    if (!action || action === "done") return;
    if (action === "mystery" || action === "recall" || action.startsWith("lesson:")) ensureExpeditionStarted();
    if (action === "mystery") {
      const info = expeditionData();
      const mystery = info.mystery;
      const disciplineId = mystery ? mysteryDisciplineId(mystery) : (expeditionSessionForDay()?.disciplineId || activeDisciplineId());
      if (mystery) setState({ tab: "mystery", currentMysteryId: mystery.id, currentMysteryDiscipline: disciplineId, currentDiscipline: disciplineId }, { renderImmediate: true });
      return;
    }
    if (action.startsWith("lesson:")) return openCourse(action.slice(7), "daily-expedition");
    if (action === "surprise") {
      const info = expeditionData();
      const excluded = new Set([info.lesson?.id, info.connection?.id].filter(Boolean).map(String));
      let candidates = searchIndex().filter(item => !excluded.has(String(item.lesson.id)) && !lessonDone(item.lesson.id));
      if (!candidates.length) candidates = searchIndex().filter(item => !excluded.has(String(item.lesson.id)));
      const seed = (() => { try { return typeof todayIndex === "function" ? todayIndex() : Math.floor(Date.now() / 86400000); } catch { return 0; } })();
      const picked = candidates.length ? candidates[Math.abs(seed + Number(state.xp || 0)) % candidates.length] : null;
      if (picked) return openCourse(picked.lesson.id, "daily-surprise");
      return openDiscipline(activeDisciplineId());
    }
    if (action === "recall") return openRecallChallenge();
    if (action === "search") return openSearch();
    if (action === "map") return openKnowledgeMap();
    if (action === "catalog") return openDiscipline(activeDisciplineId());
  }

  function bindShellActions(root = document){
    root.querySelectorAll("[data-hd187-action]").forEach(button => {
      if (button.dataset.hd187Bound === "1") return;
      button.dataset.hd187Bound = "1";
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        try { navigator.vibrate?.(10); } catch {}
        runAction(button.dataset.hd187Action);
      });
    });
    root.querySelectorAll("[data-hd213-share-expedition]").forEach(button => {
      if (button.dataset.hd213Bound === "1") return;
      button.dataset.hd213Bound = "1";
      button.addEventListener("click", event => { event.preventDefault(); event.stopPropagation(); shareExpedition(); });
    });
    root.querySelectorAll("[data-hd212-jump-expedition]").forEach(button => {
      if (button.dataset.hd212Bound === "1") return;
      button.dataset.hd212Bound = "1";
      button.addEventListener("click", () => {
        const target = document.querySelector(".hd212-expedition-card");
        if (!target) return;
        const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        target.classList.remove("hd213-focus-pulse");
        requestAnimationFrame(() => target.classList.add("hd213-focus-pulse"));
        window.setTimeout(() => target.classList.remove("hd213-focus-pulse"), 1150);
        try { target.focus?.({ preventScroll: true }); } catch {}
      });
    });
    root.querySelectorAll("[data-hd187-open-search]").forEach(button => {
      if (button.dataset.hd187Bound === "1") return;
      button.dataset.hd187Bound = "1";
      button.addEventListener("click", () => openSearch());
    });
    root.querySelectorAll("[data-hd187-open-map]").forEach(button => {
      if (button.dataset.hd187Bound === "1") return;
      button.dataset.hd187Bound = "1";
      button.addEventListener("click", openKnowledgeMap);
    });
    root.querySelectorAll("[data-hd187-open-catalog]").forEach(button => {
      if (button.dataset.hd187Bound === "1") return;
      button.dataset.hd187Bound = "1";
      button.addEventListener("click", () => openDiscipline(activeDisciplineId()));
    });
    root.querySelectorAll("[data-hd187-open-seasons]").forEach(button => {
      if (button.dataset.hd187Bound === "1") return;
      button.dataset.hd187Bound = "1";
      button.addEventListener("click", openSeasons);
    });
    root.querySelectorAll("[data-hd187-season-next]").forEach(button => {
      if (button.dataset.hd187Bound === "1") return;
      button.dataset.hd187Bound = "1";
      button.addEventListener("click", () => openCourse(button.dataset.hd187SeasonNext, "season-home"));
    });
  }

  function enhanceCurrentScreen(){
    const shell = document.querySelector(".app-shell");
    if (!shell) return;
    if (shell.classList.contains("tab-home")) enhanceHome();
    else if (shell.classList.contains("tab-learn")) enhanceLearn();
    else if (shell.classList.contains("tab-profile")) enhanceProfile();
    else if (shell.classList.contains("tab-lesson")) injectSpoilerChoice();
    bindShellActions(shell);
  }

  let scheduled = false;
  function schedule(){
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; enhanceCurrentScreen(); });
  }

  const previousRenderHome = typeof renderHome === "function" ? renderHome : null;
  if (previousRenderHome) renderHome = function beta187RenderHome(){ const out = previousRenderHome(); schedule(); return out; };
  const previousRenderLearn = typeof renderLearn === "function" ? renderLearn : null;
  if (previousRenderLearn) renderLearn = function beta187RenderLearn(){ const out = previousRenderLearn(); schedule(); return out; };
  const previousRenderProfile = typeof renderProfile === "function" ? renderProfile : null;
  if (previousRenderProfile) renderProfile = function beta187RenderProfile(){ const out = previousRenderProfile(); schedule(); return out; };
  try {
    const previousRenderLesson = renderLesson;
    renderLesson = function beta187RenderLesson(){ const out = previousRenderLesson(); schedule(); return out; };
  } catch {}

  const observer = new MutationObserver(schedule);
  observer.observe(appRoot, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", schedule, { once: true });
  window.addEventListener("pageshow", schedule, { passive: true });
  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); }
    if (event.key === "Escape") closeLayer();
  });

  window.setInterval(() => {
    const value = typeof timeToNextDaily === "function" ? timeToNextDaily() : "quelques heures";
    document.querySelectorAll("[data-hd210-countdown]").forEach(node => { node.textContent = value; });
  }, 60000);

  try {
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      dailyExpedition: true,
      dailyJourneyV2: true,
      dailyJourneyV3: true,
      focusedHomeV2: true,
      freeCourseAccess: true,
      globalCourseSearch: true,
      knowledgeMap: true,
      editorialSeasons: true,
      curiosityProfile: true,
      conceptDebug: {
        searchIndex,
        expeditionData,
        seasonDefinitions,
        curiosityData,
        openSearch,
        openKnowledgeMap,
        openRecallChallenge,
        openCompletionCelebration,
        expeditionElapsedMinutes,
        recallCompletedToday
      }
    };
  } catch {}

  try {
    if (typeof renderSoon === "function") renderSoon();
    else if (typeof render === "function") render({ immediate: true });
  } catch {}
  schedule();
})();


/* ===== ranking-redesign.js ===== */

/* HistoDaily beta 198 — classement simplifié et score canonique. */
(() => {
  "use strict";

  const VERSION = "1.0.0-beta.213.0";
  const VALID_SCOPES = new Set(["daily", "week", "year", "friends"]);

  const esc = value => {
    try { return escapeHtml(String(value ?? "")); }
    catch { return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[ch])); }
  };
  const norm = value => String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  const cleanCode = value => {
    try { return normalizeFriendCode(value); }
    catch { return String(value || "").trim().toUpperCase().replace(/\s+/g, "").replace(/[^A-Z0-9-]/g, ""); }
  };

  function safeScope(scope = state.rankScope || "daily") {
    return VALID_SCOPES.has(scope) ? scope : "daily";
  }
  function localScope(scope) {
    return safeScope(scope) === "friends" ? "daily" : safeScope(scope);
  }
  function scoreCap(difficulty = "moyen") {
    if (difficulty === "facile") return 95;
    if (difficulty === "difficile") return 150;
    if (difficulty === "expert") return 180;
    return 120;
  }
  function scopeRange(scope = "daily") {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    if (scope === "week") {
      const start = new Date(today);
      const day = start.getDay() || 7;
      start.setDate(start.getDate() - day + 1);
      return { start: start.getTime(), end: today + 86400000 };
    }
    if (scope === "year") return { start: new Date(now.getFullYear(), 0, 1).getTime(), end: today + 86400000 };
    return { start: today, end: today + 86400000 };
  }
  function localEntries(scope = "daily") {
    const { start, end } = scopeRange(localScope(scope));
    const mysteryById = new Map((data?.mysteries || []).map(item => [String(item.id), item]));
    return Object.entries(state.solvedMysteries || {})
      .filter(([, solved]) => {
        const at = Number(solved?.at || 0);
        return at >= start && at < end;
      })
      .map(([id, solved]) => {
        const mystery = mysteryById.get(String(id)) || {};
        const cap = scoreCap(solved?.difficulty || mystery?.difficulty || "moyen");
        return { id, score: Math.max(0, Math.min(cap, Number(solved?.score || 0))), at: Number(solved?.at || 0) };
      });
  }
  function canonicalLocalScore(scope = "daily") {
    return localEntries(scope).reduce((sum, item) => sum + item.score, 0);
  }
  function canonicalLocalSolved(scope = "daily") {
    return localEntries(scope).length;
  }

  function mine() {
    return {
      playerId: String(typeof playerIdMe === "function" ? playerIdMe() : ""),
      friendCode: cleanCode(typeof friendCode === "function" ? friendCode() : ""),
      name: String(state.pseudo || "Invité"),
      avatar: String(state.pseudo || "I").trim().charAt(0).toUpperCase() || "I"
    };
  }
  function rowIdentity(row = {}) {
    return {
      playerId: String(row.playerId || row.player_id || row.id || ""),
      friendCode: cleanCode(row.friendCode || row.friend_code || row.code || ""),
      name: String(row.name || row.pseudo || "Joueur")
    };
  }
  function isMine(row = {}, self = mine()) {
    const identity = rowIdentity(row);
    if (identity.playerId && self.playerId && identity.playerId === self.playerId) return true;
    if (identity.friendCode && self.friendCode && identity.friendCode === self.friendCode) return true;
    const sameName = norm(identity.name) && norm(identity.name) === norm(self.name) && !["invite", "invité", "joueur"].includes(norm(self.name));
    // Les anciennes versions ont parfois créé une seconde identité serveur avec le même pseudo
    // mais un autre player_id / code. Pour l'affichage personnel, le pseudo exact sert donc de
    // dernier recours afin de supprimer la ligne fantôme et de garder une seule ligne « Toi ».
    return Boolean(sameName);
  }
  function remoteRows(scope = "daily") {
    try { return Array.isArray(remoteLeaderboardRows(safeScope(scope))) ? remoteLeaderboardRows(safeScope(scope)) : []; }
    catch { return []; }
  }
  function canonicalRows(scope = "daily") {
    const selectedScope = safeScope(scope);
    const self = mine();
    const myScore = canonicalLocalScore(selectedScope);
    const map = new Map();

    for (const raw of remoteRows(selectedScope)) {
      if (!raw || isMine(raw, self)) continue;
      const identity = rowIdentity(raw);
      const key = identity.friendCode || identity.playerId || norm(identity.name);
      if (!key) continue;
      const row = {
        ...raw,
        id: raw.id || identity.playerId || identity.friendCode || key,
        playerId: identity.playerId,
        friendCode: identity.friendCode,
        name: identity.name,
        score: Math.max(0, Number(raw.score || 0)),
        me: false
      };
      const previous = map.get(key);
      if (!previous || row.score > previous.score) map.set(key, row);
    }

    const selfKey = self.friendCode || self.playerId || `self:${norm(self.name)}`;
    map.set(selfKey, {
      id: self.playerId || selfKey,
      playerId: self.playerId,
      friendCode: self.friendCode,
      name: self.name,
      avatar: self.avatar,
      score: myScore,
      me: true,
      localOnly: true
    });

    return Array.from(map.values())
      .filter(row => row.me || Number(row.score || 0) > 0)
      .sort((a, b) => Number(b.score || 0) - Number(a.score || 0) || String(a.name || "").localeCompare(String(b.name || ""), "fr"))
      .slice(0, 50)
      .map((row, index) => ({ ...row, rank: index + 1 }));
  }


  const repairedKeys = new Set();
  function repairScores(scope = "daily", { force = false } = {}) {
    const selectedScope = safeScope(scope);
    const ids = localEntries(selectedScope).map(item => item.id).filter(Boolean);
    const key = `${selectedScope}:${new Date().toISOString().slice(0, 10)}:${mine().playerId}:${ids.join(",")}`;
    if (!force && repairedKeys.has(key)) return Promise.resolve([]);
    if (!ids.length || typeof submitScoreToServer !== "function" || typeof scorePayloadForMystery !== "function") return Promise.resolve([]);
    repairedKeys.add(key);
    return Promise.all(ids.map(id => Promise.resolve(submitScoreToServer(scorePayloadForMystery(id))).catch(() => null)));
  }

  function scopeTitle(scope) {
    return ({ daily: "Aujourd’hui", week: "Cette semaine", year: "Cette année", friends: "Entre amis aujourd’hui" })[safeScope(scope)];
  }
  function leaderboardTitle(scope) {
    return ({ daily: "Classement du jour", week: "Classement de la semaine", year: "Classement de l’année", friends: "Classement de tes amis" })[safeScope(scope)];
  }
  function scoreExplanation(scope) {
    if (scope === "week") return "Somme des points obtenus depuis lundi sur les mystères résolus.";
    if (scope === "year") return "Somme des points obtenus cette année sur les mystères résolus.";
    if (scope === "friends") return "Même score que le classement du jour, limité à toi et tes amis.";
    return "Le score additionne uniquement les mystères résolus aujourd’hui. Les cours et l’XP du profil ne comptent pas ici.";
  }
  function emptyMarkup(scope) {
    return `<div class="hd198-rank-empty"><strong>Aucun score reçu pour le moment</strong><p>${esc(scoreExplanation(scope))}</p></div>`;
  }
  function rowsMarkup(rows) {
    return rows.map(row => {
      const id = String(row.id || row.playerId || row.friendCode || "");
      return `<div class="hd198-rank-row${row.me ? " me" : ""}">
        <span class="hd198-rank-position">${row.rank}</span>
        <div class="hd198-rank-player"><strong>${esc(row.name || "Joueur")}${row.me ? `<small>Toi</small>` : ""}</strong><span>${Number(row.score || 0)} points</span></div>
        ${row.me ? `<span class="hd198-rank-current">Ton score</span>` : (id ? `<button type="button" data-view-profile="${esc(id)}">Profil</button>` : "")}
      </div>`;
    }).join("");
  }
  function compactSyncMarkup() {
    let backend = "";
    try { backend = typeof socialBackendMarkup === "function" ? socialBackendMarkup() : ""; } catch {}
    if (!backend) return "";
    return `<details class="hd198-sync"><summary>État de la synchronisation</summary>${backend}</details>`;
  }
  function bind() {
    document.querySelectorAll("[data-rank-scope]").forEach(button => {
      button.onclick = event => {
        event?.preventDefault?.();
        const scope = safeScope(button.dataset.rankScope || "daily");
        setState({ tab: "rank", rankScope: scope }, { save: true });
        try { window.scrollTo({ top: 0, behavior: "auto" }); } catch {}
      };
    });
    document.querySelectorAll("[data-view-profile]").forEach(button => {
      button.onclick = event => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        try { viewProfile(button.dataset.viewProfile || ""); } catch {}
      };
    });
    document.querySelectorAll("[data-home]").forEach(button => button.onclick = () => setState({ tab: "home" }, { save: true }));
    document.querySelectorAll("[data-open-profile]").forEach(button => button.onclick = () => setState({ tab: "profile" }, { save: true }));
    document.querySelectorAll("[data-refresh-ranking]").forEach(button => button.onclick = () => {
      const scope = safeScope(state.rankScope);
      button.disabled = true;
      button.textContent = "Actualisation…";
      repairScores(scope, { force: true })
        .then(() => typeof fetchServerLeaderboard === "function" ? fetchServerLeaderboard(scope, { force: true }) : null)
        .catch(() => null)
        .finally(() => { try { render({ immediate: true }); } catch {} });
    });
  }

  scoreForScope = function beta198ScoreForScope(scope = "daily") { return canonicalLocalScore(scope); };
  solvedCountForScope = function beta198SolvedCountForScope(scope = "daily") { return canonicalLocalSolved(scope); };
  leaderboardRows = function beta198LeaderboardRows(scope = state.rankScope || "daily") { return canonicalRows(scope); };
  scoreOfPlayer = function beta198ScoreOfPlayer(player = {}, scope = state.rankScope || "daily") {
    return player?.me ? canonicalLocalScore(scope) : Math.max(0, Number(player?.score || 0));
  };

  renderRank = function beta198RenderRank() {
    const scope = safeScope(state.rankScope || "daily");
    state.rankScope = scope;
    try { ensureServerLeaderboard?.(scope); } catch {}
    repairScores(scope).then(() => {
      try { if (typeof fetchServerLeaderboard === "function") fetchServerLeaderboard(scope, { force: true }); } catch {}
    }).catch(() => {});
    if (scope === "friends") try { if (typeof ensureServerFriends === "function") ensureServerFriends(); } catch {}

    const rows = canonicalRows(scope);
    const me = rows.find(row => row.me);
    const myScore = canonicalLocalScore(scope);
    const mySolved = canonicalLocalSolved(scope);
    const generalScope = scope === "friends" ? "daily" : scope;
    const scoredPlayers = rows.filter(row => Number(row.score || 0) > 0).length;

    renderShell(`<header class="topbar hd198-rank-topbar"><button type="button" data-home>←</button><div><p class="eyebrow">Classement</p><h1>${esc(scopeTitle(scope))}</h1></div></header>
      <section class="hd198-rank-tabs" aria-label="Période du classement">
        <button type="button" data-rank-scope="daily" class="${scope === "daily" ? "active" : ""}">Aujourd’hui</button>
        <button type="button" data-rank-scope="week" class="${scope === "week" ? "active" : ""}">Semaine</button>
        <button type="button" data-rank-scope="year" class="${scope === "year" ? "active" : ""}">Année</button>
      </section>
      <section class="card hd198-rank-overview">
        <div class="hd198-overview-head"><div><span class="card-label">${scope === "friends" ? "Amis" : "Général"}</span><h2>Ton score ${scope === "week" ? "cette semaine" : scope === "year" ? "cette année" : "aujourd’hui"}</h2></div><button type="button" data-refresh-ranking>Actualiser</button></div>
        <div class="hd198-score-line"><strong>${myScore}</strong><span>points</span></div>
        <div class="hd198-rank-kpis"><div><b>#${me?.rank || "—"}</b><span>ta place</span></div><div><b>${mySolved}</b><span>mystère${mySolved > 1 ? "s" : ""} compté${mySolved > 1 ? "s" : ""}</span></div></div>
        <p>${esc(scoreExplanation(scope))}</p>
      </section>
      <section class="hd198-audience-switch">
        <button type="button" data-rank-scope="${generalScope}" class="${scope !== "friends" ? "active" : ""}">Classement général</button>
        <button type="button" data-rank-scope="friends" class="${scope === "friends" ? "active" : ""}">Entre amis</button>
      </section>
      <section class="card hd198-leaderboard-card">
        <div class="section-title-row"><div><span class="card-label">${esc(leaderboardTitle(scope))}</span><h2>${rows.length} joueur${rows.length > 1 ? "s" : ""} inscrit${rows.length > 1 ? "s" : ""}</h2><small>${scoredPlayers} avec un score sur cette période</small></div><button type="button" class="ghost" data-open-profile>Mon profil</button></div>
        <div class="hd198-rank-list">${rows.length ? rowsMarkup(rows) : emptyMarkup(scope)}</div>
      </section>
      ${scope === "friends" ? `${typeof addFriendMarkup === "function" ? addFriendMarkup() : ""}${typeof friendListMarkup === "function" ? friendListMarkup() : ""}` : ""}
      ${compactSyncMarkup()}`);
    bind();
  };

  try {
    state.beta198RankingVersion = VERSION;
    queueSaveState?.(80);
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, rankingRedesign: true, canonicalMysteryScore: true };
  } catch {}

  window.HD_RANKING_DEBUG = { canonicalLocalScore, canonicalLocalSolved, canonicalRows, isMine, scopeRange, repairScores };
})();

/* ===== HistoDaily beta 215 — bibliothèque structurée, lecteur immersif et navigation sûre ===== */
(function histodailyBeta214CourseExperience(){
  "use strict";

  const VERSION = "1.0.0-beta.216.0";
  const esc = value => {
    try { return escapeHtml(String(value ?? "")); }
    catch { return String(value ?? "").replace(/[&<>\"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char])); }
  };
  const pct = (done, total) => total > 0 ? Math.max(0, Math.min(100, Math.round((done / total) * 100))) : 0;
  const unique = values => [...new Set((values || []).filter(Boolean))];

  function contentFor(lesson){
    try { return buildLessonContent(lesson); }
    catch { return { title: lesson?.title || "Cours", period: lesson?.period || "", complete: [], express: [], quiz: [], unavailable: true }; }
  }
  function lessonLabel(lesson){
    const content = contentFor(lesson);
    return content.title || lesson?.title || "Cours";
  }
  function lessonMinutes(lesson){
    const content = contentFor(lesson);
    const words = (content.complete || []).map(block => block?.text || "").join(" ").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(3, Math.min(8, Math.round(words / 180) || 4));
  }
  function activeWorldForGroup(groupId, disciplineId){
    const worlds = treeWorldsForGroup(groupId, disciplineId);
    return worlds.find(world => String(world.id) === String(state.currentWorld || "")) || worlds.find(world => treeLessonsForWorld(world.id).length) || worlds[0] || null;
  }
  function nextLessonForDiscipline(disciplineId){
    const lessons = lessonsForDiscipline(disciplineId).filter(lesson => !lessonLockedByDailyMystery?.(lesson));
    const current = lessons.find(lesson => String(lesson.id) === String(state.currentLessonId || ""));
    if (current && !lessonDone(current.id)) return current;
    const started = lessons.find(lesson => !lessonDone(lesson.id) && Object.keys(state.quizProgress?.[lesson.id]?.answers || {}).length > 0);
    return started || lessons.find(lesson => !lessonDone(lesson.id)) || lessons[0] || null;
  }
  function disciplineRailMarkup(selectedId){
    const current = disciplineById(selectedId);
    const currentProgress = disciplineProgress(selectedId);
    return `<details class="hd34-discipline-picker">
      <summary><span>${HD_ICONS.discipline(current)} <b>${esc(current.title)}</b><small>${currentProgress.ready ? `${currentProgress.progress}%` : "bientôt"}</small></span><em>Changer</em></summary>
      <div class="hd34-discipline-grid" aria-label="Changer de discipline">${DISCIPLINES.map(discipline => {
        const progress = disciplineProgress(discipline.id);
        const active = discipline.id === selectedId;
        return `<button type="button" data-hd214-discipline="${esc(discipline.id)}" class="${active ? "active" : ""}" style="--hd214-accent:${esc(discipline.accent)}" aria-current="${active ? "true" : "false"}"><span>${HD_ICONS.discipline(discipline)}</span><b>${esc(discipline.title)}</b><small>${progress.ready ? `${progress.progress}%` : "bientôt"}</small></button>`;
      }).join("")}</div>
    </details>`;
  }
  function learnTopbarMarkup({ back = "home", title = "Cours", eyebrow = "Bibliothèque" } = {}){
    return `<header class="hd214-learn-topbar"><button type="button" data-hd214-back="${esc(back)}" aria-label="Retour">←</button><div><p>${esc(eyebrow)}</p><h1>${esc(title)}</h1></div><button type="button" class="hd214-search-button" data-hd187-open-search aria-label="Rechercher dans les cours">⌕</button></header>`;
  }
  function disciplineHeroMarkup(disciplineId){
    const discipline = disciplineById(disciplineId);
    const progress = disciplineProgress(disciplineId);
    return `<section class="hd214-library-hero" style="--hd214-accent:${esc(discipline.accent)}">
      <div class="hd214-hero-icon">${HD_ICONS.discipline(discipline)}</div>
      <div class="hd214-hero-copy"><span>PARCOURS · ${esc(discipline.title)}</span><h2>${progress.total ? `${progress.total} cours disponibles` : "Une nouvelle discipline se prépare"}</h2><p>${esc(discipline.description || "Progresse par périodes, thèmes et cours courts ou complets.")}</p></div>
      <div class="hd214-progress-ring" style="--hd214-progress:${progress.progress}"><strong>${progress.progress}%</strong><small>${progress.done}/${progress.total || 0}</small></div>
      <div class="hd214-hero-stats"><span><b>${progress.chapters}</b> chapitres</span><span><b>${progress.themes}</b> thèmes</span><span><b>${progress.done}</b> validés</span></div>
    </section>`;
  }
  function continueMarkup(disciplineId){
    const lesson = nextLessonForDiscipline(disciplineId);
    if (!lesson) return "";
    const world = lessonWorld(lesson) || {};
    const started = Object.keys(state.quizProgress?.[lesson.id]?.answers || {}).length > 0;
    return `<button type="button" class="hd214-continue-card" data-hd214-open-lesson="${esc(lesson.id)}">
      <span class="hd214-continue-icon">${HD_ICONS.lesson(lesson, world, disciplineById(disciplineId))}</span>
      <span class="hd214-continue-copy"><small>${started ? "À REPRENDRE" : "PROCHAINE ÉTAPE"}</small><strong>${esc(lessonLabel(lesson))}</strong><em>${esc(world.title || disciplineById(disciplineId).title)} · ${lessonMinutes(lesson)} min</em></span>
      <span class="hd214-continue-action">${started ? "Reprendre" : "Commencer"} →</span>
    </button>`;
  }
  function chapterRowsMarkup(groups, disciplineId){
    return `<section class="hd214-chapters"><div class="hd214-section-heading"><div><span>PARCOURS</span><h2>Chapitres</h2></div><small>${groups.length}</small></div><div class="hd214-chapter-list">${groups.map((group, index) => {
      const worlds = treeWorldsForGroup(group.id, disciplineId);
      const total = treeLessonCountForGroup(group.id, disciplineId);
      const done = treeDoneCountForGroup(group.id, disciplineId);
      const progress = pct(done, total);
      const themes = worlds.slice(0, 3).map(world => world.title).join(" · ");
      return `<button type="button" class="hd214-chapter-row ${done && done < total ? "in-progress" : ""} ${progress === 100 && total ? "done" : ""}" data-hd214-group="${esc(group.id)}">
        <span class="hd214-chapter-index">${String(index + 1).padStart(2, "0")}</span>
        <span class="hd214-chapter-copy"><small>${esc(group.range || "Période")}</small><strong>${esc(chapterDisplayTitle(group.title, "Chapitre"))}</strong><em>${esc(themes || group.description || "Thèmes en préparation")}</em><i><b style="width:${progress}%"></b></i></span>
        <span class="hd214-chapter-status"><b>${progress}%</b><small>${worlds.length} thème${worlds.length > 1 ? "s" : ""}<br>${done}/${total || 0} cours</small><em>›</em></span>
      </button>`;
    }).join("")}</div></section>`;
  }
  function renderChapterIndex(disciplineId, discipline, groups){
    renderShell(`${learnTopbarMarkup({ back: "home", title: discipline.title, eyebrow: "Cours" })}${disciplineRailMarkup(disciplineId)}${continueMarkup(disciplineId)}${chapterRowsMarkup(groups, disciplineId)}`);
    const shell = document.querySelector(".app-shell.tab-learn");
    if (shell) { shell.classList.add("hd214-course-library", "hd214-chapter-index-screen"); shell.dataset.hd187Enhanced = "1"; }
    bindLearnActions(disciplineId);
  }
  function themeRailMarkup(worlds, activeWorld){
    return `<nav class="hd214-theme-rail" aria-label="Thèmes du chapitre">${worlds.map(world => {
      const lessons = treeLessonsForWorld(world.id);
      const done = lessons.filter(lesson => lessonDone(lesson.id)).length;
      const active = activeWorld?.id === world.id;
      return `<button type="button" data-hd214-world="${esc(world.id)}" class="${active ? "active" : ""}" style="--hd214-world-accent:${esc(world.accent || "#f6c453")}" aria-current="${active ? "true" : "false"}"><span>${HD_ICONS.world(world, disciplineById(activeDisciplineId()))}</span><b>${esc(world.title)}</b><small>${lessons.length ? `${done}/${lessons.length}` : "bientôt"}</small></button>`;
    }).join("")}</nav>`;
  }
  function lessonFilterMarkup(){
    const filter = ["all", "todo", "done"].includes(state.learnFilter) ? state.learnFilter : "all";
    return `<div class="hd214-lesson-filters" role="group" aria-label="Filtrer les cours"><button type="button" data-hd214-filter="all" class="${filter === "all" ? "active" : ""}">Tous</button><button type="button" data-hd214-filter="todo" class="${filter === "todo" ? "active" : ""}">À faire</button><button type="button" data-hd214-filter="done" class="${filter === "done" ? "active" : ""}">Terminés</button></div>`;
  }
  function filteredWorldLessons(world){
    const lessons = treeLessonsForWorld(world?.id);
    const filter = ["all", "todo", "done"].includes(state.learnFilter) ? state.learnFilter : "all";
    if (filter === "done") return lessons.filter(lesson => lessonDone(lesson.id));
    if (filter === "todo") return lessons.filter(lesson => !lessonDone(lesson.id));
    return lessons;
  }
  function lessonCardsMarkup(world, lessons){
    if (!world) return `<section class="hd214-empty-state"><h2>Aucun thème disponible</h2><p>Ce chapitre sera complété prochainement.</p></section>`;
    const all = treeLessonsForWorld(world.id);
    if (!all.length) return `<section class="hd214-empty-state"><span>${HD_ICONS.world(world, disciplineById(activeDisciplineId()))}</span><h2>${esc(world.title)} arrive bientôt</h2><p>Le thème est déjà placé dans le parcours. Les cours seront publiés lorsqu’ils seront suffisamment complets.</p></section>`;
    if (!lessons.length) return `<section class="hd214-empty-state"><h2>Aucun cours dans ce filtre</h2><p>Change le filtre pour retrouver les autres cours du thème.</p><button type="button" data-hd214-filter="all">Voir tous les cours</button></section>`;
    return `<div class="hd214-lesson-list">${lessons.map((lesson, index) => {
      const done = lessonDone(lesson.id);
      const progress = state.quizProgress?.[lesson.id] || {};
      const started = !done && Object.keys(progress.answers || {}).length > 0;
      const content = contentFor(lesson);
      const status = done ? "Validé" : started ? "En cours" : "À découvrir";
      return `<button type="button" class="hd214-lesson-row ${done ? "done" : ""} ${started ? "started" : ""}" data-hd214-open-lesson="${esc(lesson.id)}">
        <span class="hd214-lesson-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="hd214-lesson-copy"><small>${esc(content.period || lesson.period || world.timeframe || "Repère historique")}</small><strong>${esc(lessonLabel(lesson))}</strong><em>${lessonMinutes(lesson)} min</em></span>
        <span class="hd214-lesson-state"><i></i><b>${status}</b><em>›</em></span>
      </button>`;
    }).join("")}</div>`;
  }
  function renderChapterCourses(disciplineId, discipline, group, worlds, activeWorld){
    const lessons = filteredWorldLessons(activeWorld);
    const all = activeWorld ? treeLessonsForWorld(activeWorld.id) : [];
    const done = all.filter(lesson => lessonDone(lesson.id)).length;
    const progress = pct(done, all.length);
    renderShell(`${learnTopbarMarkup({ back: "chapters", title: chapterDisplayTitle(group.title, "Chapitre"), eyebrow: discipline.title })}
      ${themeRailMarkup(worlds, activeWorld)}
      ${activeWorld ? `<section class="hd34-theme-context" style="--hd214-world-accent:${esc(activeWorld.accent || discipline.accent)}"><div><span>${esc(activeWorld.timeframe || group.range || "Thème")}</span><h2>${esc(activeWorld.title)}</h2></div><div class="hd34-theme-progress"><strong>${done}/${all.length || 0}</strong><small>cours validés</small><i><b style="width:${progress}%"></b></i></div></section>` : ""}
      <section class="hd214-lessons-section hd34-lessons-section">${lessonFilterMarkup()}${lessonCardsMarkup(activeWorld, lessons)}</section>`);
    const shell = document.querySelector(".app-shell.tab-learn");
    if (shell) { shell.classList.add("hd214-course-library", "hd214-theme-screen"); shell.dataset.hd187Enhanced = "1"; }
    bindLearnActions(disciplineId);
  }
  function bindLearnActions(disciplineId){
    document.querySelectorAll("[data-hd214-back]").forEach(button => button.addEventListener("click", () => {
      if (button.dataset.hd214Back === "chapters") setState({ learnDrill: "chapters", learnFilter: "all", learnSearch: "" });
      else setState({ tab: "home" });
    }));
    document.querySelectorAll("[data-hd214-discipline]").forEach(button => button.addEventListener("click", () => {
      const next = disciplineById(button.dataset.hd214Discipline).id;
      const groups = treeGroups(next);
      const firstWorld = groups.length ? treeWorldsForGroup(groups[0].id, next)[0] : null;
      setState({ currentDiscipline: next, currentGroup: groups[0]?.id || state.currentGroup, currentWorld: firstWorld?.id || state.currentWorld, learnDrill: "chapters", learnFilter: "all", learnSearch: "" });
    }));
    document.querySelectorAll("[data-hd214-group]").forEach(button => button.addEventListener("click", () => {
      const groupId = button.dataset.hd214Group;
      const firstWorld = treeWorldsForGroup(groupId, disciplineId).find(world => treeLessonsForWorld(world.id).length) || treeWorldsForGroup(groupId, disciplineId)[0];
      setState({ currentGroup: groupId, currentWorld: firstWorld?.id || state.currentWorld, learnDrill: "courses", learnFilter: "all", learnSearch: "" });
    }));
    document.querySelectorAll("[data-hd214-world]").forEach(button => button.addEventListener("click", () => setState({ currentWorld: button.dataset.hd214World, learnFilter: "all" })));
    document.querySelectorAll("[data-hd214-filter]").forEach(button => button.addEventListener("click", () => setState({ learnFilter: button.dataset.hd214Filter || "all" })));
    document.querySelectorAll("[data-hd214-open-lesson]").forEach(button => button.addEventListener("click", () => {
      const lessonId = button.dataset.hd214OpenLesson;
      if (typeof beta118OpenLessonById === "function") beta118OpenLessonById(lessonId, { source: "beta214-library" });
      else setState({ tab: "lesson", currentLessonId: lessonId, lessonView: "complete", lessonFocus: "complete" });
    }));
  }

  const previousRenderLearn = typeof renderLearn === "function" ? renderLearn : null;
  renderLearn = function beta214RenderLearn(){
    const disciplineId = activeDisciplineId();
    const discipline = disciplineById(disciplineId);
    const groups = treeGroups(disciplineId);
    if (!groups.length) {
      if (previousRenderLearn) return previousRenderLearn();
      return;
    }
    const groupId = treeActiveGroupId(disciplineId);
    const group = groups.find(item => item.id === groupId) || groups[0];
    if (state.learnDrill === "courses") {
      const worlds = treeWorldsForGroup(group.id, disciplineId);
      const world = activeWorldForGroup(group.id, disciplineId);
      if (world && world.id !== state.currentWorld) state.currentWorld = world.id;
      return renderChapterCourses(disciplineId, discipline, group, worlds, world);
    }
    return renderChapterIndex(disciplineId, discipline, groups);
  };

  function readerQuizStatus(lesson){
    const content = contentFor(lesson);
    let items = [];
    try { items = normalizeQuizPack(content.quiz, lesson, content); }
    catch { items = Array.isArray(content.quiz) ? content.quiz : []; }
    const total = items.length;
    let progress = { answers: {}, correct: {}, passed: false };
    try { progress = lessonQuizState(lesson.id); } catch {}
    const answeredIndexes = new Set(Object.keys(progress.answers || {}).map(Number).filter(index => Number.isInteger(index) && index >= 0 && index < total));
    const answered = answeredIndexes.size;
    const correct = Array.from(answeredIndexes).filter(index => Boolean(progress.correct?.[index] || progress.correct?.[String(index)])).length;
    let passed = Boolean(progress.passed || lessonDone(lesson.id));
    try { passed = Boolean(passed || lessonQuizPassed(lesson.id)); } catch {}
    const finished = total > 0 && answered >= total;
    return { total, answered, correct, remaining: Math.max(0, total - answered), passed, finished };
  }
  function readerModeCopy(view, lesson){
    if (view === "complete") return { label: "Cours", meta: "Lecture", progress: 50, stage: "1/2" };
    if (view === "quiz") {
      const quiz = readerQuizStatus(lesson);
      const progress = quiz.total ? Math.round(50 + 50 * (quiz.answered / quiz.total)) : 50;
      const meta = quiz.finished ? `Bilan ${quiz.correct}/${quiz.total}` : `${quiz.answered}/${quiz.total} réponse${quiz.answered > 1 ? "s" : ""}`;
      const stage = quiz.finished ? "Terminé" : `Quiz ${quiz.answered}/${quiz.total}`;
      return { label: "Quiz final", meta, progress: Math.min(100, progress), stage };
    }
    return { label: "Cours", meta: "Lecture", progress: 50, stage: "1/2" };
  }
  function readerTabsMarkup(view){
    return `<nav class="hd214-reader-tabs hd34-reader-tabs" aria-label="Cours et quiz"><button type="button" data-hd214-reader-view="complete" class="${view === "complete" ? "active" : ""}"><b>Cours</b><small>5 min</small></button><button type="button" data-hd214-reader-view="quiz" class="${view === "quiz" ? "active" : ""}"><b>Quiz</b><small>5 questions</small></button></nav>`;
  }
  function readerFooterMarkup(lesson, view){
    const world = lessonWorld(lesson) || {};
    const lessons = treeLessonsForWorld(world.id);
    const index = lessons.findIndex(item => String(item.id) === String(lesson.id));
    const quiz = readerQuizStatus(lesson);

    if (view === "express") {
      return `<footer class="hd214-reader-footer hd215-reader-footer hd34-reader-footer is-reading"><button type="button" data-hd214-footer-view="complete"><span>Continuer</span><b>Lire le cours</b><em>→</em></button></footer>`;
    }
    if (view === "complete") {
      return `<footer class="hd214-reader-footer hd215-reader-footer hd34-reader-footer is-reading"><button type="button" data-hd214-footer-view="quiz"><span>Continuer</span><b>Passer au quiz</b><em>→</em></button></footer>`;
    }
    if (!quiz.finished) {
      const remainingLabel = `${quiz.remaining} question${quiz.remaining > 1 ? "s" : ""} restante${quiz.remaining > 1 ? "s" : ""}`;
      return `<footer class="hd214-reader-footer hd215-reader-footer hd34-reader-footer is-quiz-running"><button type="button" data-hd214-focus-quiz><span>Quiz ${quiz.answered}/${quiz.total}</span><b>${remainingLabel}</b><em>↓</em></button></footer>`;
    }
    if (!quiz.passed) {
      return `<footer class="hd214-reader-footer hd215-reader-footer hd34-reader-footer is-quiz-failed"><button type="button" data-hd214-footer-reset><span>Score ${quiz.correct}/${quiz.total}</span><b>Recommencer</b><em>↻</em></button></footer>`;
    }

    const next = index >= 0
      ? (lessons.slice(index + 1).find(item => !lessonDone(item.id)) || lessons.find(item => String(item.id) !== String(lesson.id) && !lessonDone(item.id)))
      : lessons.find(item => !lessonDone(item.id));
    const themeComplete = lessons.length > 0 && lessons.every(item => lessonDone(item.id));
    if (next) {
      return `<footer class="hd214-reader-footer hd215-reader-footer hd34-reader-footer is-course-complete"><button type="button" data-hd214-next-lesson="${esc(next.id)}"><span>Cours suivant</span><b>${esc(lessonLabel(next))}</b><em>→</em></button></footer>`;
    }
    return `<footer class="hd214-reader-footer hd215-reader-footer hd34-reader-footer is-course-complete"><button type="button" data-hd214-back-theme><span>${themeComplete ? "Thème terminé" : "Cours validé"}</span><b>${themeComplete ? "Choisir un autre thème" : "Voir les cours à terminer"}</b><em>→</em></button></footer>`;
  }
  function buildReaderToc(article){
    const panel = article.querySelector(".complete-course-panel");
    if (!panel || article.querySelector(".hd214-reader-toc")) return;
    const sections = Array.from(panel.querySelectorAll(".deep-reading-block"));
    if (sections.length < 3) return;
    sections.forEach((section, index) => {
      section.dataset.hd214Section = String(index + 1);
      section.id = section.id || `hd214-section-${index + 1}`;
    });
    const toc = document.createElement("details");
    toc.className = "hd214-reader-toc hd34-reader-toc";
    toc.innerHTML = `<summary><span>Sommaire</span><small>${sections.length} parties</small></summary><nav aria-label="Sommaire du cours">${sections.map((section, index) => `<button type="button" data-hd214-jump="${esc(section.id)}"><span>${String(index + 1).padStart(2, "0")}</span>${esc(section.querySelector("h2")?.textContent || `Partie ${index + 1}`)}</button>`).join("")}</nav>`;
    panel.insertAdjacentElement("beforebegin", toc);
    toc.querySelectorAll("[data-hd214-jump]").forEach(button => button.addEventListener("click", () => {
      document.getElementById(button.dataset.hd214Jump)?.scrollIntoView({ behavior: "smooth", block: "start" });
      toc.open = false;
    }));
  }
  function enhanceLesson(){
    const shell = document.querySelector(".app-shell.tab-lesson");
    if (!shell || shell.dataset.hd214Reader === "1") return;
    const lesson = lessonById(state.currentLessonId);
    if (!lesson) return;
    shell.dataset.hd214Reader = "1";
    shell.classList.add("hd214-reader-shell");
    const view = ["complete", "quiz"].includes(state.lessonView) ? state.lessonView : "complete";
    const mode = readerModeCopy(view, lesson);
    const content = contentFor(lesson);
    const world = lessonWorld(lesson) || {};
    const discipline = disciplineForLessonObject?.(lesson) || disciplineById(activeDisciplineId());
    const group = (typeof HISTO_WORLD_GROUPS !== "undefined" ? HISTO_WORLD_GROUPS : []).find(item => item.id === world.group);
    const topbar = shell.querySelector(".lesson-full-topbar");
    if (topbar) {
      topbar.classList.add("hd214-reader-header");
      const back = topbar.querySelector("[data-back-learn]");
      if (back) { back.textContent = "←"; back.setAttribute("aria-label", "Retour au thème"); }
      const copy = topbar.querySelector(":scope > div");
      if (copy) copy.innerHTML = `<p class="hd214-reader-path">${esc(chapterDisplayTitle(group?.title, discipline?.title || "Cours"))} · ${esc(world.title || "Parcours")}</p><h1>${esc(content.title || lesson.title)}</h1><div class="hd214-reader-meta"><span>${esc(mode.meta)}</span>${lessonDone(lesson.id) ? `<span>✓ Validé</span>` : ""}</div>`;
      topbar.querySelectorAll(".lesson-view-tabs,.hd183-lesson-tabs,.hd214-reader-tabs,.hd214-reader-stage").forEach(node => node.remove());
      topbar.insertAdjacentHTML("beforeend", readerTabsMarkup(view));
      topbar.querySelectorAll("[data-hd214-reader-view]").forEach(button => button.addEventListener("click", () => {
        const nextView = button.dataset.hd214ReaderView;
        if (nextView === view) return;
        setState({ lessonView: nextView, lessonFocus: null });
        window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
      }));
    }
    const article = shell.querySelector(".lesson-full-page,.reading-card");
    if (article) {
      article.classList.add("hd214-reader-page", "hd34-reader-page");
      article.querySelectorAll(".lesson-choice-panel,.rc26-course-toolbar,.lesson-next-choice").forEach(node => node.remove());
      if (view === "quiz") article.querySelectorAll(".beta165-quiz-facts,.key-facts").forEach(node => node.remove());
      const hook = article.querySelector(".lesson-hook");
      if (hook) {
        hook.classList.add("hd214-reader-hook");
        const label = hook.querySelector(".card-label");
        if (label) label.textContent = view === "express" ? "L’idée centrale" : view === "complete" ? "Avant de commencer" : "Dernier contrôle";
      }
      const express = article.querySelector(".express-coach-card");
      if (express) {
        express.classList.add("hd214-express-flow");
        express.querySelector(":scope > .section-title-row")?.remove();
      }
      article.querySelectorAll(".express-steps.clean-express > div").forEach((node, index) => { node.dataset.hd214Step = String(index + 1); const title = node.querySelector("b"); if (title) title.textContent = String(title.textContent || "").replace(/^\s*\d+\s*[·.:-]\s*/, ""); });
      if (view === "complete") buildReaderToc(article);
      article.querySelectorAll(".deep-reading-block").forEach((node, index) => node.dataset.hd214Section = String(index + 1));
      if (view !== "quiz") article.insertAdjacentHTML("afterend", readerFooterMarkup(lesson, view));
    }
    shell.querySelectorAll("[data-hd214-footer-view]").forEach(button => button.addEventListener("click", () => {
      const nextView = button.dataset.hd214FooterView;
      if (!["complete", "quiz"].includes(nextView)) return;
      setState({ lessonView: nextView, lessonFocus: null });
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
    }));
    shell.querySelectorAll("[data-hd214-focus-quiz]").forEach(button => button.addEventListener("click", () => {
      const target = shell.querySelector("[data-beta165-current-question],.quiz-section");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }));
    shell.querySelectorAll("[data-hd214-footer-reset]").forEach(button => button.addEventListener("click", () => {
      try { resetLessonQuiz(lesson.id); } catch {}
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
    }));
    shell.querySelectorAll("[data-hd214-back-theme]").forEach(button => button.addEventListener("click", () => setState({ tab: "learn", learnDrill: "courses", currentGroup: world.group || state.currentGroup, currentWorld: world.id || state.currentWorld, lessonView: "complete", lessonFocus: null })));
    shell.querySelectorAll("[data-hd214-next-lesson]").forEach(button => button.addEventListener("click", () => {
      const id = button.dataset.hd214NextLesson;
      if (typeof beta118OpenLessonById === "function") beta118OpenLessonById(id, { source: "beta214-reader-next" });
      else setState({ tab: "lesson", currentLessonId: id, lessonView: "complete", lessonFocus: "complete" });
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
    }));
  }

  const previousRenderLesson = typeof renderLesson === "function" ? renderLesson : null;
  if (previousRenderLesson) renderLesson = function beta214RenderLesson(){
    const out = previousRenderLesson();
    try { enhanceLesson(); } catch (error) { try { console.warn("beta214 reader", error); } catch {} }
    requestAnimationFrame(() => { try { enhanceLesson(); } catch {} });
    return out;
  };

  function runContentAudit(){
    const lessons = curatedLessons();
    const rows = lessons.map(lesson => {
      const content = contentFor(lesson);
      const completeText = (content.complete || []).map(block => block?.text || "").join(" ");
      const completeWords = completeText.split(/\s+/).filter(Boolean).length;
      const expressCount = Array.isArray(content.express) ? content.express.filter(Boolean).length : 0;
      const quizCount = Array.isArray(content.quiz) ? content.quiz.length : 0;
      const issues = [];
      if (content.unavailable) issues.push("indisponible");
      if (!content.hook || String(content.hook).length < 50) issues.push("accroche faible");
      if (expressCount < 3) issues.push("express incomplet");
      if (completeWords < 450) issues.push(`cours court (${completeWords} mots)`);
      if (quizCount !== 5) issues.push(`quiz ${quizCount}/5`);
      return { id: lesson.id, title: lessonLabel(lesson), completeWords, expressCount, quizCount, issues };
    });
    return { version: VERSION, generatedAt: new Date().toISOString(), total: rows.length, valid: rows.filter(row => row.issues.length === 0).length, issues: rows.filter(row => row.issues.length), rows };
  }

  try {
    state.beta214CourseExperienceVersion = VERSION;
    if (!["chapters", "courses"].includes(state.learnDrill)) state.learnDrill = "chapters";
    queueSaveState?.(80);
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, courseLibraryV2: true, immersiveReaderV2: true };
    window.HistoDailyContentAudit = { run: runContentAudit };
    if (state.tab === "learn" || state.tab === "lesson") render({ immediate: true });
  } catch {}
})();

/* ===== HistoDaily beta 215 — intégrité de navigation ===== */
(function histodailyBeta215NavigationIntegrity(){
  "use strict";
  const VERSION = "1.0.0-beta.216.0";

  function stampVersion(){
    try {
      state.beta215NavigationIntegrityVersion = VERSION;
      window.HistoDaily = {
        ...(window.HistoDaily || {}),
        version: VERSION,
        stableDailyExpedition: true,
        guardedCourseFooter: true,
        honestQuizProgress: true
      };
    } catch {}
  }

  function runAudit(){
    const lessons = typeof curatedLessons === "function" ? curatedLessons() : [];
    const counts = new Map();
    lessons.forEach(lesson => counts.set(String(lesson.id), (counts.get(String(lesson.id)) || 0) + 1));
    const duplicateLessonIds = Array.from(counts.entries()).filter(([, count]) => count > 1).map(([id, count]) => ({ id, count }));
    const stored = (() => {
      try { return state.expeditionPreferences?.sessionsByDay?.[localDayKey()] || null; }
      catch { return null; }
    })();
    const invalidSessionLinks = [];
    if (stored?.mysteryId && !mysteryById(stored.mysteryId)) invalidSessionLinks.push({ type: "mystery", id: stored.mysteryId });
    if (stored?.primaryLessonId && !lessonById(stored.primaryLessonId)) invalidSessionLinks.push({ type: "primary", id: stored.primaryLessonId });
    if (stored?.connectionLessonId && !lessonById(stored.connectionLessonId)) invalidSessionLinks.push({ type: "connection", id: stored.connectionLessonId });
    return {
      version: VERSION,
      lessons: lessons.length,
      duplicateLessonIds,
      invalidSessionLinks,
      ok: duplicateLessonIds.length === 0 && invalidSessionLinks.length === 0
    };
  }

  stampVersion();
  try { queueMicrotask(stampVersion); } catch {}
  try { window.setTimeout(stampVersion, 0); window.setTimeout(stampVersion, 250); } catch {}
  window.HistoDailyNavigationAudit = { run: runAudit };
})();


/* ===== HistoDaily beta 216 — audit éditorial complet et chapitre Vikings final ===== */
(function histodailyBeta216Quality(){
  "use strict";
  const VERSION = "1.0.0-beta.216.0";
  const VIKING_IDS = Object.freeze([
    "northern-viking-worlds-scandinavie",
    "northern-viking-worlds-raids-vikings",
    "northern-viking-worlds-navires-vikings",
    "northern-viking-worlds-colonisation-atlantique",
    "northern-viking-worlds-viking-commerce",
    "northern-viking-worlds-christianisation-nord",
    "northern-viking-worlds-vie-quotidienne",
    "northern-viking-worlds-societe-droit-femmes",
    "northern-viking-worlds-croyances-sagas-runes",
    "northern-viking-worlds-kings-kingdoms",
    "northern-viking-worlds-normandy-england-kiev"
  ]);
  const PATCHES = {
  "northern-viking-worlds-raids-vikings": {},
  "northern-viking-worlds-scandinavie": {
    "appendComplete": [
      {
        "title": "8. Comment l’archéologie reconstitue ce monde",
        "text": "Les textes écrits au moment même sont rares en Scandinavie avant le IXe siècle. Pour comprendre la vie avant les raids, les historiens croisent donc plusieurs traces : plans de maisons longues, fosses de stockage, ossements animaux, graines carbonisées, outils, déchets d’ateliers, tombes, inscriptions et objets importés. Une perle venue de loin ou une monnaie étrangère ne prouve pas qu’un habitant a lui-même parcouru toute la route ; elle prouve en revanche qu’il appartient à une chaîne d’échanges. Les grands halls et les dépôts précieux renseignent surtout sur les élites, tandis que les fermes ordinaires montrent la base rurale de la société. Cette méthode évite deux caricatures : une Scandinavie isolée et primitive, ou au contraire un peuple entier déjà tourné vers la conquête. Avant l’âge viking, les savoir-faire maritimes, les hiérarchies sociales et les réseaux existent déjà ; les raids vont les mobiliser à une échelle nouvelle."
      }
    ],
    "deeper": [
      {
        "title": "Mot important",
        "text": "Viking désigne d’abord une activité d’expédition, pas l’identité permanente de tous les Scandinaves."
      },
      {
        "title": "Trace à observer",
        "text": "Ribe, Kaupang et Birka révèlent des lieux d’artisanat et d’échange, mais ils ne représentent pas toute la population rurale."
      },
      {
        "title": "Piège à éviter",
        "text": "Une tombe riche renseigne surtout sur un statut et une mise en scène funéraire, pas sur le quotidien de chaque habitant."
      }
    ]
  },
  "northern-viking-worlds-navires-vikings": {
    "express": [
      "Les Scandinaves construisent plusieurs types de bateaux : navires de guerre longs et rapides, cargos plus larges, petites embarcations de pêche et de transport local. Il n’existe donc pas un modèle unique appelé simplement « drakkar ».",
      "Les coques à clin sont légères et souples. La voile carrée donne la vitesse en mer ; les avirons permettent de manœuvrer et d’avancer sans vent. Le faible tirant d’eau facilite plages et fleuves.",
      "Un navire exige bois sélectionné, fer, cordages, une grande voile de laine, des artisans, des vivres et un équipage discipliné. Il représente une capacité collective et le prestige du chef qui le finance.",
      "À retenir : Oseberg, Gokstad et Skuldelev prouvent la diversité des constructions. Le bateau rend raid, commerce et colonisation possibles, mais les décisions politiques et sociales expliquent l’usage qui en est fait."
    ],
    "quizQuestionPatches": {
      "4": {
        "q": "Pourquoi le navire ne suffit-il pas à expliquer l’expansion scandinave ?"
      }
    },
    "complete": [
      {
        "title": "1. Il n’existe pas un seul « bateau viking »",
        "text": "L’expression « navire viking » rassemble des embarcations très différentes. Certains bâtiments sont longs, étroits et rapides, adaptés à la guerre, au transport d’un équipage nombreux et aux débarquements. D’autres sont plus larges et plus profonds afin d’emporter des marchandises, des animaux, du bois ou des réserves sur de longues distances. Des bateaux plus petits servent à la pêche, aux traversées locales et aux déplacements dans les fjords. Cette diversité est essentielle : la même civilisation maritime ne résout pas le raid, le commerce atlantique et la navigation côtière avec un modèle unique."
      },
      {
        "title": "2. Une coque légère construite à clin",
        "text": "Les bordés sont souvent assemblés à clin : chaque planche chevauche légèrement la précédente et est fixée par des rivets. La coque obtenue reste relativement légère et souple, capable d’absorber une partie des contraintes de la mer. Le bois doit être choisi, fendu et façonné avec précision ; la construction mobilise des charpentiers expérimentés, du fer, des cordages, de la laine pour la voile et beaucoup de travail collectif. Posséder un grand navire suppose donc des ressources et un pouvoir d’organisation. C’est un outil technique, mais aussi une démonstration de richesse et de prestige."
      },
      {
        "title": "3. Voile, avirons et faible tirant d’eau",
        "text": "La voile carrée fournit l’essentiel de la propulsion lorsque le vent est favorable. Les avirons permettent de manœuvrer, de quitter un rivage, d’avancer sans vent ou de progresser dans un passage étroit. Le faible tirant d’eau de nombreux navires facilite l’approche des plages, le débarquement et la remontée de certains fleuves. Une troupe peut ainsi éviter les ports fortifiés, choisir un point d’arrivée et repartir rapidement. Cette mobilité explique une partie de l’effet de surprise des raids, mais elle sert aussi aux échanges et aux migrations."
      },
      {
        "title": "4. Naviguer sans carte moderne",
        "text": "Les marins utilisent l’expérience des côtes, la position du Soleil, les étoiles lorsque le ciel le permet, les vents, les courants, la couleur de l’eau, les oiseaux et la connaissance transmise des routes. Les traversées atlantiques demandent de planifier les saisons et d’accepter une forte incertitude. Il faut rester prudent avec les récits de « pierre de soleil » présentée comme un instrument universel : certaines hypothèses sont discutées et ne remplacent pas l’ensemble des savoirs pratiques. La navigation est d’abord une compétence collective acquise par l’observation et l’expérience."
      },
      {
        "title": "5. Un équipage, des vivres et une discipline",
        "text": "Le navire ne fonctionne pas seul. Il faut réunir un équipage, répartir les tâches, entretenir la coque et la voile, embarquer de l’eau, de la nourriture, des armes ou une cargaison, puis décider quand prendre la mer. La vitesse dépend du vent, du chargement, de l’état du bateau et de la fatigue. Les longues traversées exposent au froid, à l’humidité, au mal de mer et au manque de place. La réussite d’une expédition révèle donc une organisation sociale autant qu’une prouesse de charpenterie."
      },
      {
        "title": "6. Oseberg, Gokstad et Skuldelev : les preuves matérielles",
        "text": "Les navires funéraires d’Oseberg et de Gokstad, en Norvège, montrent la qualité des constructions et la place symbolique du bateau auprès des élites. Les cinq épaves de Skuldelev, retrouvées dans le fjord de Roskilde, représentent plusieurs usages, du navire de guerre au cargo. Elles avaient été coulées pour barrer un chenal vers le XIe siècle. Les archéologues étudient les bois, les réparations et les dimensions ; des répliques grandeur nature permettent ensuite de tester vitesse, tenue à la mer et besoins d’équipage. L’archéologie expérimentale ne reconstitue pas parfaitement le passé, mais elle vérifie ce qui est techniquement plausible."
      },
      {
        "title": "7. Ce que le navire explique — et ce qu’il n’explique pas",
        "text": "Le navire ouvre des possibilités : frapper vite, transporter de l’argent, relier des marchés, atteindre l’Islande ou le Groenland. Il ne décide pourtant ni de partir en raid, ni de coloniser, ni de commercer. Ces choix dépendent de chefs, de familles, de rivalités, de demandes économiques et de situations politiques. Réduire l’expansion scandinave à une invention navale serait donc insuffisant. La bonne synthèse associe une technologie efficace à des sociétés capables de financer, construire, équiper et employer ces bateaux de plusieurs façons."
      }
    ],
    "deeper": [
      {
        "title": "Technique",
        "text": "Construction à clin : les planches de la coque se chevauchent, ce qui permet une structure légère et flexible."
      },
      {
        "title": "Méthode",
        "text": "Les répliques navigantes testent des hypothèses, mais leurs performances dépendent aussi des matériaux, des équipages et des choix de reconstruction."
      },
      {
        "title": "Nuance",
        "text": "Le mot drakkar est moderne et ne désigne pas dans les sources médiévales une catégorie précise de tous les navires vikings."
      }
    ]
  },
  "northern-viking-worlds-colonisation-atlantique": {
    "express": [
      "À partir de la fin du IXe siècle, des familles scandinaves progressent vers l’ouest par étapes : archipels du nord de l’Écosse, Féroé, Islande puis Groenland. Elles transportent bétail, outils et semences afin de créer des fermes.",
      "L’Islande devient une société durable avec des exploitations, des chefs et l’Althing vers 930. Au Groenland, les établissements vivent plusieurs siècles grâce à l’élevage, la chasse et l’exportation d’ivoire de morse.",
      "Vers l’an 1000, L’Anse aux Meadows prouve une présence nordique à Terre-Neuve. Le site confirme l’arrivée en Amérique du Nord, mais pas une vaste colonie permanente ni une terre jusque-là inhabitée.",
      "À retenir : atteindre, explorer, exploiter et coloniser sont quatre réalités différentes. L’Islande est durablement colonisée ; le Groenland reste fragile ; Vinland correspond surtout à des voyages et à une base limitée."
    ],
    "complete": [
      {
        "title": "1. Une progression d’île en île",
        "text": "L’expansion vers l’Atlantique Nord ne se fait pas d’un seul bond. Des navigateurs scandinaves fréquentent d’abord les archipels proches de l’Écosse, les Féroé et les routes de la mer du Nord. À partir de la fin du IXe siècle, des familles s’installent en Islande. Ces déplacements mélangent recherche de terres, rivalités politiques, commerce, aventure et stratégies familiales. Les navires transportent des personnes, mais aussi du bétail, des outils, des semences et les éléments nécessaires à une ferme. Une colonisation demande donc beaucoup plus qu’un équipage de guerriers."
      },
      {
        "title": "2. L’Islande : construire une société",
        "text": "L’Islande est peuplée durablement par des colons venus surtout de Norvège et des régions déjà scandinavisées des îles Britanniques. Ils occupent des terres, fondent des fermes et créent des réseaux locaux. Vers 930, l’Althing devient une assemblée générale où des chefs et des hommes libres se rencontrent pour proclamer le droit et régler des conflits. Ce n’est pas une démocratie moderne : le pouvoir reste inégal et les dépendants ou esclaves ne participent pas de la même manière. L’exemple islandais montre néanmoins que la migration produit des institutions, pas seulement des campements temporaires."
      },
      {
        "title": "3. Le Groenland : vivre à la limite",
        "text": "Selon la tradition, Érik le Rouge conduit des colons vers le Groenland à la fin du Xe siècle. Ils établissent surtout deux ensembles de fermes dans les zones du sud-ouest où l’élevage est possible. Les habitants élèvent des animaux, chassent, pêchent et exportent notamment de l’ivoire de morse vers l’Europe. Leur survie dépend d’un équilibre fragile : climat, pâturages, accès au bois, navigation saisonnière et demande commerciale. Les établissements durent plusieurs siècles, ce qui interdit de les décrire comme un échec immédiat."
      },
      {
        "title": "4. Vinland et L’Anse aux Meadows",
        "text": "Les sagas islandaises racontent des voyages plus à l’ouest, vers des régions appelées Helluland, Markland et Vinland. Elles ont été écrites longtemps après les événements et mélangent mémoire, littérature et traditions familiales. L’archéologie apporte une preuve indépendante : à L’Anse aux Meadows, à Terre-Neuve, des bâtiments et objets d’inspiration nordique attestent une présence autour de l’an 1000. Le site montre que des Scandinaves ont atteint l’Amérique du Nord plusieurs siècles avant Christophe Colomb. Il ne prouve pas l’existence d’une vaste colonie permanente."
      },
      {
        "title": "5. Rencontres et limites de l’installation",
        "text": "Les sagas évoquent des rencontres, des échanges et des affrontements avec les populations autochtones, désignées par un terme ancien qu’il faut manier avec prudence. Les Scandinaves arrivent dans des territoires déjà habités et connus par d’autres sociétés. Leur petit nombre, la distance avec le Groenland, les difficultés d’approvisionnement et les conflits possibles limitent la durée de leur présence. Distinguer la capacité d’atteindre un rivage de celle d’y maintenir une société sur plusieurs générations est l’une des clés du cours."
      },
      {
        "title": "6. Pourquoi les colonies groenlandaises disparaissent",
        "text": "Les établissements nordiques du Groenland disparaissent à la fin du Moyen Âge. Les historiens évitent aujourd’hui une explication unique. Le refroidissement climatique, l’évolution des marchés de l’ivoire, l’isolement, la baisse des liaisons maritimes, la fragilité démographique et les choix économiques ont pu se combiner. Les contacts avec les populations inuit doivent aussi être étudiés sans inventer un scénario simple de guerre finale. Une colonie peut durer longtemps puis devenir non viable lorsque plusieurs équilibres se dégradent à la fois."
      },
      {
        "title": "7. Découvrir, explorer, exploiter, coloniser",
        "text": "Atteindre un lieu signifie qu’un voyage a réussi. L’explorer suppose d’en reconnaître une partie. L’exploiter consiste à y prélever des ressources, parfois de manière saisonnière. Le coloniser implique des installations durables, des familles, une production, des règles et une transmission entre générations. L’Islande devient une société de colons ; le Groenland accueille des établissements durables mais fragiles ; L’Anse aux Meadows témoigne plutôt d’une base nordique limitée. Cette distinction empêche de transformer chaque trace de passage en « découverte » suivie d’un peuplement permanent."
      }
    ],
    "deeper": [
      {
        "title": "Date repère",
        "text": "Vers 930 : mise en place de l’Althing islandais ; vers l’an 1000 : présence nordique attestée à Terre-Neuve."
      },
      {
        "title": "Source",
        "text": "Les sagas sont précieuses pour les traditions de voyage, mais l’archéologie est indispensable pour vérifier les lieux et les chronologies."
      },
      {
        "title": "Nuance",
        "text": "Dire que les Vikings « découvrent l’Amérique » efface les populations qui y vivent déjà et confond arrivée européenne et première occupation humaine."
      }
    ]
  },
  "northern-viking-worlds-viking-commerce": {
    "express": [
      "Ribe, Hedeby, Birka et Kaupang relient la Scandinavie à de grands réseaux. Fourrures, ambre, fer, ivoire et esclaves circulent ; argent, verre, soieries, vin et objets de prestige arrivent de régions lointaines.",
      "Les dirhams islamiques trouvés au Nord prouvent des connexions jusqu’aux réseaux du califat. Ils passent souvent par de nombreux intermédiaires et peuvent être découpés puis pesés pour leur valeur en argent.",
      "À l’Est, les voyageurs suivent la Baltique, la Volga et le Dniepr vers les mondes slaves, Byzance et le monde musulman. Ils commercent, servent comme guerriers, prélèvent parfois des tributs et transportent des captifs.",
      "À retenir : raid et commerce ne sont pas deux univers étanches. Les mêmes routes et parfois les mêmes hommes relient échanges, esclavage, violence, redistribution des richesses et construction du pouvoir local."
    ],
    "quizQuestionPatches": {
      "4": {
        "q": "Comment résumer la relation entre commerce, violence et pouvoir dans les mondes vikings ?"
      }
    },
    "complete": [
      {
        "title": "1. Des places d’échange au cœur des réseaux",
        "text": "Ribe, Hedeby, Birka ou Kaupang ne sont pas de simples villages agricoles. Ce sont des lieux où se rencontrent artisans, navigateurs, chefs, marchands et voyageurs. On y travaille le métal, l’os, l’ambre, le verre ou les textiles ; on y répare des bateaux et on échange des produits locaux contre des objets venus de loin. Leur importance varie selon les périodes et les pouvoirs qui les protègent. Ces ports montrent que les mondes scandinaves sont intégrés à des réseaux européens avant même que les grands raids dominent les chroniques occidentales."
      },
      {
        "title": "2. Ce qui circule",
        "text": "Les Scandinaves exportent notamment fourrures, peaux, ambre, fer, pierre à aiguiser, bois, ivoire de morse et parfois des produits issus de la chasse. Ils importent argent, verrerie, soieries, bijoux, vin, armes ou objets de prestige. Les cargaisons dépendent des routes et des opportunités ; il n’existe pas un commerce uniforme. Un objet trouvé dans une tombe peut avoir parcouru plusieurs étapes et changé plusieurs fois de propriétaire. L’archéologie renseigne donc sur la circulation, mais pas toujours sur l’identité du voyageur qui l’a transporté."
      },
      {
        "title": "3. L’argent pesé et les dirhams",
        "text": "De nombreux trésors contiennent des pièces d’argent islamiques, appelées dirhams, frappées très loin de la Scandinavie. Elles peuvent être conservées comme monnaies, mais aussi découpées et pesées selon la valeur du métal. Des fragments de bijoux et des lingots forment ce que les archéologues appellent parfois le hacksilver, l’argent fractionné. Ces découvertes prouvent l’existence de connexions avec les marchés du monde musulman, souvent par de multiples intermédiaires. Elles ne signifient pas que chaque possesseur scandinave a voyagé jusqu’à Bagdad."
      },
      {
        "title": "4. Les routes de l’Est",
        "text": "Depuis la Baltique, des groupes scandinaves suivent les fleuves et utilisent des portages pour rejoindre les bassins de la Volga et du Dniepr. Ces itinéraires conduisent vers les mondes slaves, la mer Noire, Byzance et les réseaux du califat. Les voyageurs transportent parfois leurs bateaux ou leurs marchandises d’un cours d’eau à l’autre. Ils commercent, servent comme guerriers, prélèvent des tributs ou s’intègrent à des pouvoirs locaux. Les routes de l’Est rappellent que l’âge viking ne se résume pas aux côtes de France et d’Angleterre."
      },
      {
        "title": "5. Captifs et esclavage",
        "text": "Les êtres humains font aussi partie des circulations. Des captifs pris lors de raids ou de guerres peuvent être rançonnés, gardés comme dépendants ou vendus. Les marchés d’Irlande, de la Baltique et des routes orientales participent à cette économie. Les sources écrites sont incomplètes et les traces archéologiques difficiles à interpréter, mais l’esclavage est suffisamment présent pour interdire une image romantique du marchand aventureux. Guerre et commerce ne sont pas deux mondes séparés : la violence peut fournir une partie des biens et des personnes échangés."
      },
      {
        "title": "6. Redistribuer pour gouverner",
        "text": "Un chef ne renforce pas son pouvoir en accumulant silencieusement toute sa richesse. Il offre des armes, des bijoux, de l’argent, des vêtements ou des festins afin d’attirer des fidèles et de récompenser des services. Les objets importés ont une valeur matérielle, mais aussi sociale : ils prouvent l’accès à des réseaux lointains. Contrôler un port, protéger une route ou prélever une taxe peut donc consolider une autorité politique. Le commerce nourrit les hiérarchies autant que la consommation quotidienne."
      },
      {
        "title": "7. Commerce et raid : une même mobilité",
        "text": "Un même équipage peut commercer dans un port, louer ses armes, exiger un tribut ou profiter d’une faiblesse pour piller. Les catégories modernes de marchand, pirate, colon ou mercenaire ne correspondent pas toujours à des identités fixes. Cela ne signifie pas que toutes les activités se valent moralement : le pillage et l’esclavage restent des violences. La bonne synthèse est historique : les routes, les navires, l’argent, les captifs et les alliances relient économie et pouvoir dans un système où échange pacifique et contrainte peuvent alterner."
      }
    ],
    "deeper": [
      {
        "title": "Objet repère",
        "text": "Les dirhams trouvés en Scandinavie sont des indices de réseaux à très longue distance, souvent composés de nombreuses étapes."
      },
      {
        "title": "Notion",
        "text": "Hacksilver : argent découpé ou fragmenté, utilisé selon son poids plutôt que seulement selon la valeur faciale d’une monnaie."
      },
      {
        "title": "Piège",
        "text": "Remplacer le cliché du pillard par celui du commerçant pacifique masque l’esclavage, les tributs et les rapports de force."
      }
    ]
  },
  "northern-viking-worlds-christianisation-nord": {
    "quizQuestionPatches": {
      "3": {
        "q": "Pourquoi les sagas ne décrivent-elles pas directement les conversions du Xe siècle ?"
      },
      "4": {
        "q": "Que devient le monde viking avec la christianisation des royaumes nordiques ?"
      }
    },
    "complete": [
      {
        "title": "1. Une conversion qui dure plusieurs générations",
        "text": "Le christianisme ne surgit pas brutalement dans une Scandinavie isolée. Marchands, captifs, missionnaires et Scandinaves ayant voyagé dans les îles Britanniques ou le monde franc mettent depuis longtemps les croyances en contact. Des individus peuvent adopter une croix sans abandonner immédiatement tous les rites anciens. Les régions, les familles et les élites évoluent à des rythmes différents. Parler de christianisation désigne donc un processus social et politique, pas la date unique où un peuple entier change de religion."
      },
      {
        "title": "2. Pourquoi les rois soutiennent la nouvelle religion",
        "text": "Pour un roi, le christianisme apporte des alliances avec d’autres souverains, des spécialistes de l’écriture, des évêques et une idéologie qui peut présenter le pouvoir comme voulu par Dieu. La pierre de Jelling, élevée au Xe siècle par Harald à la Dent bleue, affirme qu’il a gagné le Danemark et la Norvège et « fait chrétiens les Danois » : c’est autant un programme royal qu’un constat sur chaque habitant. La conversion aide à construire une image d’unité, même lorsque l’autorité reste négociée et incomplète."
      },
      {
        "title": "3. Églises, missionnaires et nouvelles institutions",
        "text": "La christianisation suppose de bâtir des églises, former un clergé, créer des diocèses, organiser les rites et relier les communautés nordiques à l’Église occidentale. Les missionnaires dépendent souvent de la protection des élites. Les cimetières, les croix, les inscriptions et l’évolution des pratiques funéraires permettent de suivre ces transformations. Le changement ne concerne pas seulement la foi personnelle : il modifie le calendrier, le mariage, la mémoire des morts, l’écrit et les relations avec les pouvoirs étrangers."
      },
      {
        "title": "4. Coexistence, adaptation et résistance",
        "text": "Pendant une longue période, symboles chrétiens et références anciennes coexistent. Des pendentifs en forme de marteau de Thor peuvent affirmer une tradition locale face à la croix ; d’autres objets mélangent les signes. Certains chefs se convertissent pour des raisons diplomatiques, tandis que des communautés conservent des rites antérieurs. Les récits de conversion forcée existent, notamment autour de certains rois norvégiens, mais ils ont souvent été rédigés plus tard et servent aussi à exalter leur autorité. Il faut donc croiser textes et archéologie."
      },
      {
        "title": "5. Le compromis islandais autour de l’an 1000",
        "text": "Les traditions islandaises racontent qu’une décision de l’Althing adopte officiellement le christianisme afin d’éviter la division de la société. Le récit met en scène un compromis : une religion commune dans l’espace public, avec une tolérance provisoire de certaines pratiques privées. Les détails sont discutés, car les textes sont tardifs, mais l’épisode illustre une réalité importante : la religion touche au droit, aux alliances et à la paix civile. La conversion peut résulter d’une négociation politique autant que d’une prédication."
      },
      {
        "title": "6. Ce que la christianisation change pour les royaumes",
        "text": "L’Église fournit des réseaux internationaux, des lieux de pouvoir, une culture écrite latine et des modèles de royauté. Les rois soutiennent des évêchés, frappent des monnaies, fondent des églises et utilisent de nouveaux rituels. En retour, ils doivent composer avec des autorités religieuses et des normes qui dépassent leur royaume. La transformation rapproche le Danemark, la Norvège et la Suède des autres monarchies européennes. Elle accompagne le passage de pouvoirs locaux concurrents à des royaumes médiévaux plus durables."
      },
      {
        "title": "7. Fin des Vikings ou transformation du Nord ?",
        "text": "La christianisation ne fait pas disparaître soudain les navires, le commerce ou les ambitions guerrières. Des rois chrétiens comme Knut dirigent encore de vastes conquêtes. Ce qui change progressivement, ce sont les institutions, les identités politiques, l’écriture et l’intégration diplomatique. L’expression « fin de l’âge viking » sert de repère, souvent associé au XIe siècle, mais elle décrit une transformation plus qu’un arrêt net. Les sociétés scandinaves deviennent des royaumes chrétiens tout en conservant et réinterprétant une partie de leur héritage."
      }
    ],
    "deeper": [
      {
        "title": "Monument",
        "text": "La grande pierre de Jelling associe mémoire dynastique, affirmation royale et christianisation du Danemark."
      },
      {
        "title": "Méthode",
        "text": "Les récits de conversions spectaculaires doivent être comparés aux tombes, aux églises et aux inscriptions, qui montrent des rythmes régionaux."
      },
      {
        "title": "Nuance",
        "text": "Conversion officielle d’un roi ou d’une assemblée ne signifie pas disparition immédiate de toutes les anciennes pratiques."
      }
    ]
  },
  "northern-viking-worlds-vie-quotidienne": {
    "quizQuestionPatches": {
      "4": {
        "q": "Sur quoi reposent concrètement les voyages et expéditions vikings ?"
      }
    },
    "complete": [
      {
        "title": "1. La maisonnée au centre de la vie",
        "text": "La majorité des habitants vit dans des exploitations rurales. La maison longue abrite des personnes de statuts différents et parfois des animaux dans des espaces organisés autour du feu, du stockage et du travail. La maisonnée comprend la famille, mais aussi des dépendants, des ouvriers et des esclaves. Elle produit une grande partie de ce qu’elle consomme, tout en restant reliée aux voisins, aux marchés et aux chefs locaux. La ferme est à la fois un lieu de vie, une unité économique et une base du rang social."
      },
      {
        "title": "2. Produire au rythme des saisons",
        "text": "Les tâches changent au fil de l’année : labourer, semer, récolter, couper le foin, surveiller les troupeaux, pêcher, réparer les bâtiments, préparer le bois et conserver les aliments. L’hiver rend les réserves décisives. Les réserves, les récoltes et l’élevage conditionnent directement la survie de la maisonnée. Une mauvaise récolte, une maladie animale ou un printemps tardif peuvent fragiliser tout le groupe. Les céréales, les produits laitiers, la viande, le poisson, les légumes et les plantes cueillies composent des régimes variables selon les régions et le statut. Le quotidien est donc dominé par le travail et l’incertitude bien plus que par l’aventure."
      },
      {
        "title": "3. Textiles, vêtements et travail invisible",
        "text": "La fabrication textile exige énormément de temps : préparer la laine ou le lin, filer, tisser, teindre, couper et réparer. Les vêtements protègent du climat, mais indiquent aussi le statut par la qualité des tissus, les couleurs, les broches et les ornements. Les métiers à tisser, pesons, fuseaux et fragments de tissus sont des sources majeures. Une voile de laine représente elle aussi une quantité considérable de matière et de travail. Les expéditions maritimes reposent donc en partie sur une production domestique souvent moins visible dans les récits guerriers."
      },
      {
        "title": "4. Artisans et lieux spécialisés",
        "text": "Les fermes pratiquent de nombreux travaux, mais certains artisans se spécialisent : forgerons, charpentiers, fabricants de peignes, bijoutiers ou constructeurs de bateaux. Dans des places comme Ribe, Birka ou Hedeby, les archéologues retrouvent moules, scories, chutes d’os et déchets de production. Les objets ordinaires — couteaux, serrures, pots, peignes, aiguilles — montrent une culture matérielle élaborée. Tous les habitants ne possèdent pas les mêmes biens : la qualité et l’origine des objets révèlent les écarts de richesse et l’accès aux réseaux."
      },
      {
        "title": "5. Corps, santé et hygiène",
        "text": "Les squelettes indiquent traumatismes, usure liée au travail, infections, carences et différences d’alimentation. Les peignes, pinces et objets de toilette montrent un soin du corps, sans autoriser à imaginer les normes sanitaires modernes. La fumée des foyers, le froid, les accidents et les maladies rendent la vie difficile. L’espérance de vie moyenne est abaissée par une forte mortalité infantile, mais certains adultes atteignent un âge avancé. L’archéologie rappelle que la vie viking concerne des enfants, des personnes âgées et des travailleurs, pas seulement des hommes armés."
      },
      {
        "title": "6. Des rôles sociaux inégaux",
        "text": "Les hommes et femmes libres peuvent gérer des biens et participer à la production, mais leurs droits et attentes diffèrent. Les femmes de certaines maisonnées dirigent l’exploitation en l’absence d’un conjoint et contrôlent des tâches essentielles ; cela ne crée pas une égalité générale. Les enfants travaillent progressivement selon leur âge. Les dépendants et esclaves accomplissent une partie des tâches agricoles et domestiques sans disposer de la même liberté. Le quotidien révèle donc une société hiérarchisée où le confort des uns peut reposer sur la contrainte imposée aux autres."
      },
      {
        "title": "7. Le quotidien rend les expéditions possibles",
        "text": "Un navire doit être construit, une voile tissée, des vivres préparés et un équipage libéré temporairement de certaines tâches. Les richesses rapportées peuvent ensuite acheter des terres, financer un mariage, récompenser des fidèles ou améliorer une ferme. Le raid et le commerce ne sont pas séparés de la vie ordinaire : ils s’appuient sur elle et la transforment. La formule à retenir est simple : derrière chaque voyage se trouvent des maisonnées rurales, du travail artisanal, des hiérarchies et une organisation saisonnière."
      }
    ],
    "deeper": [
      {
        "title": "Trace",
        "text": "Foyers, graines, ossements, outils et déchets d’atelier racontent souvent mieux le quotidien que les grandes sagas."
      },
      {
        "title": "Idée forte",
        "text": "La voile de laine relie directement travail textile domestique et mobilité maritime."
      },
      {
        "title": "Piège",
        "text": "Des peignes et objets de toilette prouvent des pratiques de soin, pas une hygiène identique à la nôtre."
      }
    ]
  },
  "northern-viking-worlds-societe-droit-femmes": {
    "complete": [
      {
        "title": "1. Une société de statuts",
        "text": "Le monde viking n’est pas composé d’individus égaux. Les chefs et grandes familles possèdent terres, clientèles et objets de prestige. Les hommes et femmes libres disposent de droits variables selon la région, la richesse et la famille. D’autres personnes vivent dans la dépendance, et les esclaves — souvent appelés thralls dans les sources nordiques — peuvent être vendus, transmis ou exploités. La frontière entre catégories n’est pas toujours simple, mais la liberté juridique constitue une différence fondamentale. Parler d’assemblées ne doit donc jamais faire oublier cette hiérarchie."
      },
      {
        "title": "2. La parenté et la maisonnée",
        "text": "L’individu appartient à une famille élargie qui protège ses intérêts, organise mariages et héritages et intervient dans les conflits. La maisonnée réunit production, autorité domestique et réputation. Une personne isolée possède moins de moyens pour défendre ses droits. Les alliances entre lignages structurent le pouvoir local, tandis que les dons et les festins entretiennent les fidélités. Cette importance de la parenté explique pourquoi les querelles peuvent se prolonger sur plusieurs générations et pourquoi une compensation doit souvent être acceptée par tout un groupe."
      },
      {
        "title": "3. Le thing : une assemblée, pas une démocratie moderne",
        "text": "Le thing est une assemblée où des hommes libres se réunissent pour proclamer le droit, entendre des accusations, reconnaître des accords et négocier des décisions. Certains espaces ont des assemblées locales et d’autres de plus grande échelle. Il n’existe pas partout le même règlement, et les chefs riches influencent fortement les débats. Les femmes, esclaves et dépendants ne participent pas à égalité. Le thing montre néanmoins que la société possède des procédures publiques : la force privée n’est pas la seule manière de régler un conflit."
      },
      {
        "title": "4. Honneur, compensation et vengeance",
        "text": "La réputation est une ressource politique. Protéger les siens, tenir une promesse, se montrer généreux ou courageux renforce l’honneur ; subir une offense sans réponse peut l’affaiblir. Les lois prévoient souvent des compensations selon le dommage et le statut de la victime. Accepter un paiement peut arrêter l’escalade, mais une famille peut aussi choisir la vengeance. Les sagas dramatisent ces conflits et ne sont pas des comptes rendus neutres ; elles révèlent toutefois combien droit, honneur et rapports de force sont liés."
      },
      {
        "title": "5. Les femmes : capacités réelles, limites fortes",
        "text": "Selon les régions et les périodes, une femme libre peut posséder ou gérer des biens, recevoir un héritage, diriger une ferme et parfois demander une séparation. Les veuves de familles puissantes disposent souvent d’une marge d’action importante. Les tombes riches montrent que certaines femmes occupent un rang élevé, mais le mobilier funéraire ne décrit pas automatiquement leur fonction politique. La société reste dominée par les lignages et les hommes libres dans la guerre et les assemblées. Il faut donc éviter à la fois l’image de femmes sans aucun pouvoir et celle d’une égalité moderne."
      },
      {
        "title": "6. Esclavage, captifs et domination",
        "text": "Les esclaves travaillent dans les fermes, les maisons et les ateliers. Certains viennent de raids ou de commerce à longue distance ; d’autres naissent dans la dépendance. Leur présence augmente la capacité de production et le prestige des propriétaires. Les sources parlent peu de leur propre expérience, car elles sont surtout produites par les groupes dominants. L’archéologie et les textes permettent néanmoins d’affirmer que l’esclavage n’est pas marginal. Oublier cette dimension transforme abusivement la société viking en communauté libre de paysans-guerriers."
      },
      {
        "title": "7. Comment connaître le droit viking",
        "text": "Les grands codes de lois scandinaves ont souvent été écrits après l’âge viking, lorsque les royaumes sont christianisés. Ils conservent des éléments plus anciens, mais ils ne peuvent pas être projetés tels quels deux siècles en arrière. Les pierres runiques, les lieux d’assemblée, les sagas et les comparaisons régionales complètent le dossier. L’historien doit distinguer une pratique attestée, une tradition racontée plus tard et une reconstruction moderne. La synthèse juste est celle d’une société réglée mais inégale, où coutumes et assemblées limitent sans supprimer la violence."
      }
    ],
    "deeper": [
      {
        "title": "Institution",
        "text": "Thing : assemblée publique de groupes libres, influencée par les hiérarchies et non équivalente au suffrage universel."
      },
      {
        "title": "Nuance",
        "text": "Les droits des femmes varient selon le statut, la région et la situation familiale ; aucun slogan unique ne résume toute la période."
      },
      {
        "title": "Angle mort",
        "text": "Les esclaves ont laissé peu de récits personnels : l’absence de voix écrite ne signifie pas absence sociale."
      }
    ]
  },
  "northern-viking-worlds-croyances-sagas-runes": {
    "quizQuestionPatches": {
      "4": {
        "q": "Pourquoi les sagas et les Eddas ne sont-elles pas des témoignages contemporains de l’âge viking ?"
      }
    },
    "complete": [
      {
        "title": "1. Des croyances sans autorité centrale",
        "text": "Les religions nordiques anciennes ne possèdent ni livre sacré unique, ni Église centralisée, ni dogme fixé partout de la même manière. Les rites varient selon les régions, les familles et les circonstances. Des chefs peuvent présider des sacrifices et des fêtes, tandis que la pratique quotidienne se déroule aussi dans les fermes et les lieux naturels. Les textes disponibles ont souvent été écrits après la christianisation. Il faut donc parler de traditions religieuses multiples plutôt que d’un système parfaitement uniforme connu dans tous ses détails."
      },
      {
        "title": "2. Odin, Thor, Freyja et les autres dieux",
        "text": "Odin est associé à la souveraineté, à la poésie, à la connaissance et à la guerre ; Thor au tonnerre, à la force et à la protection ; Freyja à la fertilité, au désir et à certains morts guerriers. Loki joue un rôle ambigu dans de nombreux récits. Ces fonctions se chevauchent et les cultes locaux ne suivent pas forcément la hiérarchie des manuels modernes. Les noms de lieux, les pendentifs et les poèmes suggèrent que Thor est particulièrement populaire dans certaines régions, tandis qu’Odin apparaît fortement dans les traditions des élites guerrières et poétiques."
      },
      {
        "title": "3. Un cosmos raconté par des mythes",
        "text": "Les Eddas décrivent Midgard, le monde des humains, Asgard, les géants, l’arbre Yggdrasil et le Ragnarök. Ces récits donnent une vision puissante du destin, des alliances et de la fin du monde. Mais ils sont conservés dans des manuscrits médiévaux rédigés dans une Islande chrétienne. Les auteurs ont pu organiser des traditions orales diverses et les présenter de façon plus cohérente qu’elles ne l’étaient auparavant. Le mythe est donc une source, à condition de toujours demander quand et pourquoi il a été mis par écrit."
      },
      {
        "title": "4. Mourir : plusieurs destins possibles",
        "text": "Le Valhalla, où Odin accueille une partie des guerriers morts, est célèbre, mais il ne représente pas le destin de tous. Les textes évoquent aussi le domaine de Freyja, Hel et d’autres formes de séjour des morts. Les pratiques funéraires sont très variées : crémation ou inhumation, tombe simple ou monumentale, bateau entier ou symbolique, objets, animaux et parfois sacrifices. Ces différences peuvent exprimer statut, région, époque et choix familial. Une tombe ne livre pas une doctrine complète de l’au-delà, mais elle montre comment les vivants construisent la mémoire du défunt."
      },
      {
        "title": "5. Les runes sont d’abord une écriture",
        "text": "Le futhark est un alphabet utilisé pour inscrire des noms, des marques de propriété, des mémoires, des messages et des dédicaces. Les pierres runiques du Xe et du XIe siècle commémorent souvent un parent, un voyage ou une construction. Certaines inscriptions ont une fonction magique ou protectrice, mais cela ne transforme pas chaque rune en symbole ésotérique. Beaucoup de textes sont courts parce que graver demande du temps et de l’espace. Les runes témoignent aussi de la christianisation lorsque croix et prières apparaissent sur les monuments."
      },
      {
        "title": "6. Sagas et Eddas : tardives mais irremplaçables",
        "text": "Les sagas islandaises sont écrites surtout aux XIIe et XIIIe siècles, bien après les événements qu’elles racontent. Elles préservent des noms, des généalogies, des souvenirs de colonisation et une connaissance fine des conflits sociaux, mais elles sont aussi des œuvres littéraires. L’Edda poétique rassemble des poèmes de dates diverses ; l’Edda de Snorri explique les mythes aux poètes chrétiens. Ces textes ne doivent être ni crus mot à mot ni rejetés en bloc. Ils gagnent en valeur lorsqu’ils sont croisés avec les inscriptions, les objets et les tombes."
      },
      {
        "title": "7. Une religion transformée par la conversion",
        "text": "Pendant la christianisation, anciennes et nouvelles références coexistent. Un marteau de Thor peut répondre symboliquement à une croix ; une pierre runique peut utiliser l’alphabet traditionnel pour une prière chrétienne. Les mythes continuent d’être racontés après la conversion, parfois comme héritage poétique plutôt que comme culte vivant. C’est grâce à des auteurs chrétiens que beaucoup de récits ont été conservés, mais leur regard modifie aussi ce qu’ils transmettent. La prudence sur les sources n’appauvrit pas le sujet : elle permet de distinguer croyance ancienne, mémoire médiévale et réinvention moderne."
      }
    ],
    "deeper": [
      {
        "title": "Alphabet",
        "text": "Le futhark récent comporte seize signes durant une grande partie de l’âge viking ; les runes servent à écrire des sons, pas uniquement à pratiquer la magie."
      },
      {
        "title": "Source",
        "text": "Snorri Sturluson écrit au XIIIe siècle dans une société chrétienne : son Edda est capitale, mais postérieure de plusieurs générations."
      },
      {
        "title": "Piège",
        "text": "Le Valhalla ne résume ni toutes les croyances sur la mort ni l’expérience religieuse de toute la population."
      }
    ]
  },
  "northern-viking-worlds-kings-kingdoms": {
    "express": [
      "Entre le IXe et le XIe siècle, la Scandinavie passe progressivement d’un paysage de chefs et de petits pouvoirs concurrents à des royaumes plus durables. Cette évolution n’est ni linéaire ni identique au Danemark, en Norvège et en Suède.",
      "Les rois s’appuient sur la guerre, les tributs, les ports, les fidèles armés et les alliances familiales. Forteresses, monnaies, grands halls et monuments comme Jelling rendent leur autorité visible, sans supprimer les assemblées ni les élites locales.",
      "La christianisation renforce la légitimité royale et fournit écriture, évêques et relations diplomatiques. En retour, le roi protège l’Église et tente d’imposer une organisation plus stable du territoire.",
      "À retenir : l’âge viking ne se termine pas parce que les Scandinaves disparaissent. Les chefs, réseaux et conquêtes se transforment en monarchies chrétiennes intégrées à l’Europe médiévale."
    ],
    "complete": [
      {
        "title": "1. Avant les royaumes : une mosaïque de pouvoirs",
        "text": "Au début de l’âge viking, les régions scandinaves sont dominées par des chefs, des familles puissantes et des rois dont l’autorité peut être limitée. Leur pouvoir repose sur les terres, les halls, les fidèles armés, la réputation et la capacité à redistribuer des richesses. Une victoire ou une expédition réussie attire des partisans ; une défaite peut les disperser. Les assemblées locales et les lignages conservent une grande importance. Il ne faut donc pas imaginer dès 800 trois États correspondant exactement au Danemark, à la Norvège et à la Suède modernes."
      },
      {
        "title": "2. Guerre, tributs et fidélités",
        "text": "Pour élargir son autorité, un roi doit contrôler des routes, obtenir des tributs, conclure des mariages et vaincre ou rallier des rivaux. Les richesses tirées du commerce et des expéditions servent à nourrir une suite, offrir des armes et financer des constructions. Cette logique rend la monarchie dynamique mais fragile : le pouvoir dépend encore fortement de la personne du souverain. Les successions provoquent des conflits, et plusieurs prétendants peuvent gouverner des régions différentes ou revendiquer le même titre."
      },
      {
        "title": "3. Des trajectoires différentes",
        "text": "Le Danemark paraît se structurer relativement tôt autour de lieux comme Jelling et d’un contrôle des détroits. En Norvège, les récits attribuent à Harald à la Belle Chevelure une grande unification, mais cette tradition tardive simplifie probablement un processus plus long. En Suède, les pouvoirs autour du lac Mälar et d’Uppsala évoluent selon d’autres rythmes. Le mot « unification » doit donc être manié avec prudence : il peut signifier domination militaire, fidélité de chefs locaux ou capacité à prélever des ressources, pas administration uniforme de tout le territoire."
      },
      {
        "title": "4. Montrer et organiser le pouvoir",
        "text": "Les grands halls accueillent banquets, alliances et cérémonies. Les forteresses circulaires danoises, souvent associées au règne de Harald à la Dent bleue, révèlent une capacité à mobiliser beaucoup de travail et à planifier des sites. Les monnaies portant un nom royal, les routes, les ports et les monuments dynastiques rendent l’autorité visible. La pierre de Jelling associe le roi, la mémoire de ses parents, le territoire et le christianisme. Ces traces montrent un pouvoir plus structuré, même si elles expriment aussi une ambition et non un contrôle absolu."
      },
      {
        "title": "5. Christianisation et légitimité royale",
        "text": "La nouvelle religion aide les souverains à rejoindre le monde diplomatique chrétien. Les évêques et clercs maîtrisent l’écriture, les chartes et les modèles de gouvernement. Le roi peut se présenter comme protecteur de l’Église et responsable de l’unité religieuse. La conversion n’est pourtant pas un simple outil cynique : les convictions personnelles et les dynamiques sociales comptent aussi. Surtout, l’alliance entre monarchie et Église crée des institutions capables de survivre davantage à la mort d’un chef."
      },
      {
        "title": "6. Dynasties, mémoire et sources",
        "text": "Les rois font construire des monuments et entretenir des généalogies pour présenter leur domination comme légitime et ancienne. Les sagas rédigées plus tard organisent les règnes en récits cohérents, avec héros fondateurs et batailles décisives. Elles conservent des traditions utiles mais projettent parfois les monarchies médiévales sur une époque où le pouvoir est plus fragmenté. L’archéologie, les monnaies, les inscriptions et les sources étrangères permettent de contrôler ces récits. Une dynastie n’existe pas seulement par le sang : elle doit convaincre les élites de reconnaître sa continuité."
      },
      {
        "title": "7. De l’âge viking aux monarchies médiévales",
        "text": "Au XIe siècle, les royaumes nordiques possèdent davantage d’institutions chrétiennes, de centres royaux et de liens européens. Les expéditions ne cessent pas immédiatement : Knut règne sur un vaste ensemble autour de la mer du Nord, et des Scandinaves servent encore à l’étranger. Mais les conquérants agissent désormais de plus en plus comme des rois chrétiens, avec des territoires et des successions. Le fil chronologique à retenir est donc : pouvoirs locaux, enrichissement et guerre, affirmation dynastique, christianisation, puis consolidation progressive de monarchies médiévales."
      }
    ],
    "deeper": [
      {
        "title": "Monument",
        "text": "Jelling combine tombeaux, pierres runiques, église et affirmation dynastique : c’est un observatoire privilégié de la formation du royaume danois."
      },
      {
        "title": "Nuance",
        "text": "« Unifier » ne signifie pas administrer partout comme un État moderne ; l’obéissance reste souvent négociée avec les chefs locaux."
      },
      {
        "title": "Méthode",
        "text": "Les sagas royales doivent être croisées avec monnaies, forteresses, inscriptions et sources étrangères."
      }
    ]
  },
  "northern-viking-worlds-normandy-england-kiev": {
    "express": [
      "Les raids peuvent devenir des installations. Quand un groupe contrôle durablement un territoire, il doit prélever des ressources, gouverner une population, négocier avec ses voisins et transmettre le pouvoir.",
      "En Normandie, Rollon et ses hommes reçoivent au début du Xe siècle un territoire du roi franc. Leurs descendants deviennent des princes chrétiens et francophones. En Angleterre, les installations du Danelaw puis le règne de Knut montrent d’autres formes d’intégration et de conquête.",
      "À l’Est, des Scandinaves empruntent les fleuves vers Byzance et participent aux réseaux qui entourent la formation de la Rus’. Ils se mêlent aux populations slaves et finno-ougriennes ; l’État de Kiev ne peut pas être décrit comme une simple colonie viking.",
      "À retenir : Normandie, Angleterre et Rus’ montrent comment mobilité scandinave, adaptation locale et pouvoir dynastique transforment des expéditions en principautés médiévales."
    ],
    "complete": [
      {
        "title": "1. S’installer change la nature du pouvoir",
        "text": "Un raid peut être mené rapidement par un équipage qui repart avec du butin. Une installation durable exige autre chose : tenir des terres, nourrir des hommes, lever des ressources, rendre la justice, négocier avec les élites locales et organiser une succession. Les nouveaux venus sont presque toujours moins nombreux que les populations qu’ils dominent ou côtoient. Pour durer, ils doivent donc s’adapter, conclure des mariages, adopter des langues et utiliser des institutions existantes. La conquête devient progressivement un gouvernement."
      },
      {
        "title": "2. La Normandie : du chef scandinave au prince franc",
        "text": "Au début du Xe siècle, le roi franc Charles le Simple reconnaît à Rollon un territoire autour de la basse Seine, traditionnellement associé à l’accord de 911. En échange, Rollon doit protéger la région et entrer dans l’ordre politique chrétien. Les groupes scandinaves ne remplacent pas toute la population. Leurs descendants adoptent rapidement le christianisme, une langue romane et les formes de pouvoir franques. Le nom de Normandie conserve la mémoire des « hommes du Nord », mais le duché devient une principauté profondément intégrée à l’Occident."
      },
      {
        "title": "3. Le Danelaw et les sociétés anglo-scandinaves",
        "text": "À partir de l’arrivée de la Grande Armée en 865, des groupes scandinaves conquièrent et occupent une partie de l’Angleterre. La zone appelée plus tard Danelaw connaît des implantations, des villes dynamiques comme York et des formes de droit influencées par les nouveaux venus. Les noms de lieux et l’archéologie montrent des contacts durables. Il ne s’agit pas d’un territoire culturellement pur : Scandinaves et Anglo-Saxons échangent, se marient et adoptent des pratiques communes. Les rois du Wessex reconquièrent progressivement ces régions, mais l’héritage demeure."
      },
      {
        "title": "4. Knut et l’empire de la mer du Nord",
        "text": "En 1016, Knut devient roi d’Angleterre puis règne aussi sur le Danemark et la Norvège. Son ensemble politique repose sur des flottes, des élites locales et une royauté chrétienne. Knut se présente comme un souverain légitime, soutient l’Église et utilise les institutions anglaises plutôt que de gouverner seulement comme chef d’une armée étrangère. Son empire ne survit pas longtemps à sa mort en 1035, ce qui montre à la fois l’ampleur atteinte par les dynasties scandinaves et la fragilité d’une construction dépendante d’un souverain."
      },
      {
        "title": "5. Les routes de l’Est et la formation de la Rus’",
        "text": "Des Scandinaves appelés Varègues dans certaines sources parcourent la Baltique et les fleuves vers la mer Noire et la Volga. Ils commercent, servent comme guerriers et participent à des réseaux de tribut. Les traditions médiévales associent des figures nordiques aux débuts des pouvoirs de Novgorod et de Kiev. Les historiens débattent depuis longtemps de leur rôle exact. La Rus’ se forme dans un espace peuplé de groupes slaves, finno-ougriens et autres ; elle résulte d’interactions et ne peut pas être réduite à l’importation d’un État tout fait par quelques Vikings."
      },
      {
        "title": "6. Byzance, conversion et adaptation",
        "text": "Les routes orientales conduisent jusqu’à Constantinople, où des Scandinaves servent notamment dans la garde varangienne. La Rus’ de Kiev développe des relations commerciales et diplomatiques avec Byzance. Le baptême du prince Vladimir à la fin du Xe siècle et l’adoption du christianisme byzantin inscrivent le pouvoir kiévien dans un autre univers religieux que les royaumes scandinaves occidentaux. Cet exemple confirme qu’une élite mobile change d’identité politique au contact des sociétés locales au lieu de conserver indéfiniment une culture intacte."
      },
      {
        "title": "7. Trois régions, une même leçon",
        "text": "Normandie, Angleterre et Rus’ ne suivent pas le même chemin. La première naît d’un compromis avec un roi franc ; la deuxième combine conquêtes, colonies et reconquêtes ; la troisième se développe sur des routes fluviales et dans un monde slave et byzantin. Le point commun est la transformation : des Scandinaves deviennent ducs, rois, marchands, soldats ou membres de nouvelles élites. Leurs descendants gouvernent avec des langues, religions et institutions locales. L’âge viking produit ainsi des dynasties médiévales plutôt qu’une diaspora restée partout identique."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "911 est la date traditionnellement associée à l’accord entre Rollon et Charles le Simple ; 1016 marque l’accession de Knut au trône d’Angleterre."
      },
      {
        "title": "Nuance",
        "text": "Le rôle scandinave dans la formation de la Rus’ est réel mais débattu ; il ne faut ni l’effacer ni réduire Kiev à une colonie nordique."
      },
      {
        "title": "Idée forte",
        "text": "Une conquête durable transforme aussi les conquérants, qui adoptent souvent la langue, la religion et les institutions du territoire."
      }
    ]
  }
};
  const SOURCE_NOTE = Object.freeze([
    "Musée des navires vikings de Roskilde — épaves de Skuldelev et archéologie expérimentale",
    "National Museum of Denmark — société, monuments de Jelling et culture matérielle",
    "British Museum — échanges, argent, objets et réseaux vikings",
    "L’Anse aux Meadows / Parks Canada — présence nordique à Terre-Neuve",
    "Sources médiévales croisées avec l’archéologie : Eddas, sagas, pierres runiques et chroniques"
  ]);

  function applyVikingPatches(){
    if (typeof READY_LESSON_PACKS !== "object" || !READY_LESSON_PACKS) return false;
    Object.entries(PATCHES).forEach(([id, patch]) => {
      const current = READY_LESSON_PACKS[id] && typeof READY_LESSON_PACKS[id] === "object" ? READY_LESSON_PACKS[id] : {};
      const next = { ...current, ...patch };
      if (Array.isArray(patch.appendComplete)) next.complete = [...(Array.isArray(current.complete) ? current.complete : []), ...patch.appendComplete];
      if (patch.quizQuestionPatches && Array.isArray(current.quiz)) {
        next.quiz = current.quiz.map((item, index) => ({ ...item, ...(patch.quizQuestionPatches[String(index)] || {}) }));
      }
      delete next.appendComplete;
      delete next.quizQuestionPatches;
      next.editorialStatus = "published-final";
      next.contentRevision = "beta216-viking-final";
      next.sources = SOURCE_NOTE;
      READY_LESSON_PACKS[id] = next;
      try { PUBLISHED_LESSON_IDS?.add?.(id); } catch {}
    });
    return true;
  }

  applyVikingPatches();
  try { if (typeof invalidateCatalogCaches === "function") invalidateCatalogCaches(); } catch {}

  const STOP = new Set("alors au aux avec ce ces dans de des du elle elles en est et eux il ils je la le les leur lui mais ne nos notre nous on ou par pas pour que qui sa se ses son sur tu un une vos votre vous y être avoir comme plus moins très cette ces cela celui celle entre vers sans sous chez dont où quand pourquoi parce afin peut peuvent fait font aussi tout toute tous toutes même ainsi chaque après avant depuis lors pendant tandis soit sont était étaient été étant".split(/\s+/));
  const normalize = value => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr-FR").replace(/[^a-z0-9]+/g, " ").trim();
  const words = value => String(value ?? "").trim().split(/\s+/).filter(Boolean);
  const tokens = value => [...new Set(normalize(value).split(/\s+/).filter(token => token.length >= 4 && !STOP.has(token)))];
  const esc = value => { try { return escapeHtml(String(value ?? "")); } catch { return String(value ?? "").replace(/[&<>\"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'\"':"&quot;","'":"&#39;"}[char])); } };
  const issue = (code, severity, message, detail = {}) => ({ code, severity, message, ...detail });

  function lessonBody(content){
    return [content?.hook, ...(content?.keyFacts || []), ...(content?.express || []), ...(content?.complete || []).map(block => block?.text || ""), ...(content?.takeaways || []).map(item => typeof item === "string" ? item : item?.text || ""), ...(content?.deeper || []).map(item => item?.text || "")].join(" ");
  }
  function supportScore(answer, body){
    const wanted = tokens(answer);
    if (!wanted.length) return { ratio: 1, matched: [], missing: [] };
    const haystack = new Set(tokens(body));
    const matched = wanted.filter(token => haystack.has(token));
    return { ratio: matched.length / wanted.length, matched, missing: wanted.filter(token => !haystack.has(token)) };
  }
  function disciplineIdForLesson(lesson){
    try { return worldDisciplineId(lessonWorld(lesson)); } catch { return "history"; }
  }
  function rawPackFor(id){
    try { return READY_LESSON_PACKS?.[id] || null; } catch { return null; }
  }
  function auditLesson(lesson, duplicateQuestions){
    let content;
    try { content = buildLessonContent(lesson); } catch (error) { content = { unavailable: true, error: String(error?.message || error) }; }
    const pack = rawPackFor(lesson.id);
    const rowIssues = [];
    const complete = Array.isArray(content?.complete) ? content.complete : [];
    const express = Array.isArray(content?.express) ? content.express.filter(Boolean) : [];
    const quiz = Array.isArray(content?.quiz) ? content.quiz : [];
    const completeWords = words(complete.map(block => block?.text || "").join(" ")).length;
    const expressWords = words(express.join(" ")).length;
    const body = lessonBody(content);
    if (content?.unavailable) rowIssues.push(issue("lesson-unavailable", "critical", "Cours indisponible"));
    if (!lesson?.id) rowIssues.push(issue("missing-id", "critical", "Identifiant manquant"));
    if (!content?.hook || words(content.hook).length < 12) rowIssues.push(issue("weak-hook", "warning", "Accroche trop faible"));
    if (express.length < 4) rowIssues.push(issue("express-count", "warning", `Express ${express.length}/4`));
    if (expressWords < 120) rowIssues.push(issue("express-short", "warning", `Express court (${expressWords} mots)`));
    if (complete.length < 5) rowIssues.push(issue("section-count", "warning", `Seulement ${complete.length} sections`));
    if (completeWords < 300) rowIssues.push(issue("course-very-short", "critical", `Cours très court (${completeWords} mots)`));
    else if (completeWords < 450) rowIssues.push(issue("course-short", "warning", `Cours court (${completeWords} mots)`));
    if (quiz.length !== 5) rowIssues.push(issue("quiz-count", "critical", `Quiz ${quiz.length}/5`));
    const seenLocal = new Set();
    quiz.forEach((item, index) => {
      const prefix = `Question ${index + 1}`;
      const q = normalize(item?.q);
      const answer = normalize(item?.a);
      const choices = Array.isArray(item?.choices) ? item.choices.filter(Boolean) : [];
      if (!q || !answer) rowIssues.push(issue("quiz-missing-field", "critical", `${prefix} incomplète`, { questionIndex: index }));
      if (choices.length !== 3) rowIssues.push(issue("distractor-count", "warning", `${prefix} : ${choices.length} distracteur(s)`, { questionIndex: index }));
      const normalizedChoices = choices.map(normalize);
      if (new Set(normalizedChoices).size !== normalizedChoices.length) rowIssues.push(issue("duplicate-distractor", "critical", `${prefix} contient deux distracteurs identiques`, { questionIndex: index }));
      if (normalizedChoices.includes(answer)) rowIssues.push(issue("answer-in-distractors", "critical", `${prefix} répète la bonne réponse parmi les distracteurs`, { questionIndex: index }));
      if (q && seenLocal.has(q)) rowIssues.push(issue("duplicate-question-local", "critical", `${prefix} duplique une autre question du cours`, { questionIndex: index }));
      seenLocal.add(q);
      const support = supportScore(item?.a, body);
      if (support.ratio < 0.45 && support.matched.length < 3) rowIssues.push(issue("answer-weakly-supported", "warning", `${prefix} : réponse difficile à retrouver dans le cours`, { questionIndex: index, support: Math.round(support.ratio * 100), missingTokens: support.missing.slice(0, 8) }));
      if (q && duplicateQuestions.get(q) > 1) rowIssues.push(issue("duplicate-question-global", "warning", `${prefix} existe dans plusieurs cours`, { questionIndex: index }));
      if (!item?.why || words(item.why).length < 3) rowIssues.push(issue("missing-explanation", "warning", `${prefix} sans explication utile`, { questionIndex: index }));
    });
    if (!Array.isArray(content?.takeaways) || content.takeaways.length < 2) rowIssues.push(issue("takeaways", "info", "Moins de deux idées à retenir"));
    if (!pack?.contentRevision) rowIssues.push(issue("revision-tag", "info", "Révision éditoriale non datée"));
    return {
      id: String(lesson?.id || ""),
      title: content?.title || lesson?.title || "Cours",
      discipline: disciplineIdForLesson(lesson),
      worldId: (() => { try { return lessonWorldId(lesson.id); } catch { return ""; } })(),
      completeWords,
      completeSections: complete.length,
      expressWords,
      expressCount: express.length,
      quizCount: quiz.length,
      editorialStatus: pack?.editorialStatus || content?.editorialStatus || "",
      revision: pack?.contentRevision || "",
      vikingFinal: VIKING_IDS.includes(String(lesson?.id)) && pack?.contentRevision === "beta216-viking-final",
      issues: rowIssues
    };
  }

  function auditStructure(lessons, worlds){
    const issues = [];
    const lessonIds = new Set(lessons.map(lesson => String(lesson.id)));
    const worldIds = new Set(worlds.map(world => String(world.id)));
    const counts = new Map();
    lessons.forEach(lesson => counts.set(String(lesson.id), (counts.get(String(lesson.id)) || 0) + 1));
    for (const [id, count] of counts) if (count > 1) issues.push(issue("duplicate-lesson-id", "critical", `Identifiant de cours dupliqué : ${id} ×${count}`));
    lessons.forEach(lesson => {
      let worldId = "";
      try { worldId = String(lessonIndex()?.worldByLessonId?.get?.(lesson.id) || ""); } catch {}
      if (!worldId || !worldIds.has(worldId)) issues.push(issue("invalid-world-link", "critical", `Cours sans chapitre valide : ${lesson.id}`, { lessonId: lesson.id, worldId }));
    });
    worlds.forEach(world => {
      let count = 0;
      try { count = treeLessonsForWorld(world.id).length; } catch {}
      if (!count && !world?.planned) issues.push(issue("orphan-world", "warning", `Chapitre sans cours : ${world.id}`, { worldId: world.id }));
    });
    (Array.isArray(data?.mysteries) ? data.mysteries : []).forEach(mystery => {
      if (mystery?.lessonId && !lessonIds.has(String(mystery.lessonId))) issues.push(issue("mystery-broken-lesson", "critical", `Mystère relié à un cours absent : ${mystery.id} → ${mystery.lessonId}`, { mysteryId: mystery.id, lessonId: mystery.lessonId }));
    });
    const stored = (() => { try { return state.expeditionPreferences?.sessionsByDay?.[localDayKey()] || null; } catch { return null; } })();
    if (stored) {
      if (stored.mysteryId && !mysteryById(stored.mysteryId)) issues.push(issue("expedition-mystery", "critical", `Expédition : mystère absent ${stored.mysteryId}`));
      for (const field of ["primaryLessonId", "connectionLessonId"]) if (stored[field] && !lessonIds.has(String(stored[field]))) issues.push(issue("expedition-lesson", "critical", `Expédition : cours absent ${stored[field]}`, { field }));
    }
    Object.entries(state?.reviewQueue || {}).forEach(([key, entry]) => {
      const lesson = lessonById(entry?.lessonId);
      if (!lesson) return issues.push(issue("review-orphan", "critical", `Révision orpheline : ${key}`, { key }));
      const quizCount = (() => { try { return buildLessonContent(lesson)?.quiz?.length || 0; } catch { return 0; } })();
      const index = Number(entry?.questionIndex);
      if (!Number.isInteger(index) || index < 0 || index >= quizCount) issues.push(issue("review-index", "critical", `Révision hors quiz : ${key}`, { key, quizCount }));
      if (!Number.isFinite(Number(entry?.dueAt))) issues.push(issue("review-date", "warning", `Révision sans date valide : ${key}`, { key }));
    });
    Object.keys(state?.completedLessons || {}).forEach(id => { if (!lessonIds.has(String(id))) issues.push(issue("progress-orphan", "warning", `Progression liée à un ancien cours : ${id}`, { lessonId: id })); });
    return issues;
  }

  function runAudit(options = {}){
    const lessons = typeof curatedLessons === "function" ? curatedLessons() : [];
    const worlds = typeof curatedWorlds === "function" ? curatedWorlds() : [];
    const duplicateQuestions = new Map();
    lessons.forEach(lesson => {
      let quiz = [];
      try { quiz = buildLessonContent(lesson)?.quiz || []; } catch {}
      quiz.forEach(item => { const key = normalize(item?.q); if (key) duplicateQuestions.set(key, (duplicateQuestions.get(key) || 0) + 1); });
    });
    const rows = lessons.map(lesson => auditLesson(lesson, duplicateQuestions));
    const structure = auditStructure(lessons, worlds);
    const allIssues = [...structure, ...rows.flatMap(row => row.issues.map(entry => ({ ...entry, lessonId: row.id, lessonTitle: row.title, discipline: row.discipline })))];
    const severity = { critical: 0, warning: 0, info: 0 };
    allIssues.forEach(entry => { severity[entry.severity] = Number(severity[entry.severity] || 0) + 1; });
    const byDiscipline = {};
    rows.forEach(row => {
      const bucket = byDiscipline[row.discipline] || (byDiscipline[row.discipline] = { lessons: 0, valid: 0, issues: 0, averageWords: 0, totalWords: 0 });
      bucket.lessons += 1; bucket.totalWords += row.completeWords; bucket.issues += row.issues.length;
      if (!row.issues.some(entry => entry.severity === "critical" || entry.severity === "warning")) bucket.valid += 1;
    });
    Object.values(byDiscipline).forEach(bucket => { bucket.averageWords = bucket.lessons ? Math.round(bucket.totalWords / bucket.lessons) : 0; delete bucket.totalWords; });
    const vikings = rows.filter(row => VIKING_IDS.includes(row.id));
    const summary = {
      version: VERSION,
      generatedAt: new Date().toISOString(),
      lessons: rows.length,
      worlds: worlds.length,
      valid: rows.filter(row => !row.issues.some(entry => entry.severity === "critical" || entry.severity === "warning")).length,
      severity,
      structureIssues: structure.length,
      vikingLessons: vikings.length,
      vikingFinal: vikings.filter(row => row.vikingFinal).length,
      vikingAverageWords: vikings.length ? Math.round(vikings.reduce((sum, row) => sum + row.completeWords, 0) / vikings.length) : 0,
      vikingBlockingIssues: vikings.reduce((sum, row) => sum + row.issues.filter(entry => entry.severity === "critical" || entry.severity === "warning").length, 0)
    };
    const report = { summary, byDiscipline, structure, vikings, issues: allIssues };
    if (options.includeRows !== false) report.rows = rows;
    return report;
  }

  function repairReviewQueue(){
    const queue = state?.reviewQueue && typeof state.reviewQueue === "object" ? state.reviewQueue : {};
    let removed = 0, repaired = 0;
    Object.entries(queue).forEach(([key, raw]) => {
      const entry = raw && typeof raw === "object" ? { ...raw } : null;
      const lesson = entry ? lessonById(entry.lessonId) : null;
      const count = lesson ? (buildLessonContent(lesson)?.quiz?.length || 0) : 0;
      const index = Number(entry?.questionIndex);
      if (!entry || !lesson || !Number.isInteger(index) || index < 0 || index >= count) { delete queue[key]; removed += 1; return; }
      const stage = Math.max(0, Math.min(4, Number(entry.stage || 0)));
      const dueAt = Number.isFinite(Number(entry.dueAt)) ? Number(entry.dueAt) : Date.now();
      if (stage !== Number(entry.stage || 0) || dueAt !== Number(entry.dueAt)) repaired += 1;
      queue[key] = { ...entry, lessonId: String(entry.lessonId), questionIndex: index, stage, dueAt, source: entry.source || "quiz-error" };
    });
    state.reviewQueue = queue;
    if (removed || repaired) try { queueSaveState?.(80); } catch {}
    return { removed, repaired, remaining: Object.keys(queue).length };
  }

  const reviewRepair = repairReviewQueue();
  try {
    state.beta216QualityVersion = VERSION;
    queueSaveState?.(80);
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, vikingChapterFinal: true, reviewQueueIntegrity: true };
  } catch {}

  try {
    if (state?.tab === "lesson" && VIKING_IDS.includes(String(state.currentLessonId || ""))) render({ immediate: true });
  } catch {}
})();

/* =========================================================
   Beta 218 — vraie refonte de l’accueil
   Une seule mission centrale, une reprise compacte et une découverte.
   Les anciens empilements (snapshot, grande saison, recommandations multiples,
   notes de version) ne sont plus rendus sur l’accueil.
   ========================================================= */
(function beta218HomeRefactor(){
  const VERSION = "1.0.0-beta.218.0";

  function esc(value){
    try { return escapeHtml(String(value ?? "")); }
    catch { return String(value ?? "").replace(/[&<>\"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[char]); }
  }
  function linkedLessonFor(mystery){
    if (!mystery?.lessonId) return null;
    try { return curatedLessonById(mystery.lessonId) || allLessons().find(item => item.id === mystery.lessonId) || null; }
    catch { return null; }
  }
  function safeContent(lesson){
    if (!lesson) return null;
    try { return buildLessonContent(lesson); }
    catch { return { title: lesson.title || "Cours associé", hook: "Comprendre le sujet et retenir l’idée essentielle." }; }
  }
  function stageData(mystery, lesson){
    const solved = Boolean(mystery && mysterySolved(mystery.id));
    const courseDone = Boolean(lesson && lessonDone(lesson.id));
    const quizDone = Boolean(lesson && lessonQuizPassed(lesson.id));
    const content = safeContent(lesson);
    const solvedMeta = mystery ? (state.solvedMysteries?.[mystery.id] || {}) : {};

    if (!mystery) {
      return { stage: 1, kind: "catalog", title: "Choisis un parcours", subtitle: "Le dossier quotidien n’est pas disponible. Tous les cours restent accessibles.", button: "Voir les cours", meta: "Accès libre" };
    }
    if (!solved) {
      return {
        stage: 1,
        kind: "mystery",
        title: mysteryDisplayTitle(mystery),
        subtitle: short(mysteryTeaser(mystery), 126),
        button: "Résoudre le mystère",
        meta: `+${dailyRewardPreview().gems} gemme${dailyRewardPreview().gems > 1 ? "s" : ""} aujourd’hui`
      };
    }
    if (lesson && !courseDone) {
      return {
        stage: 2,
        kind: "lesson",
        view: "complete",
        title: content?.title || lesson.title,
        subtitle: "Le mystère est résolu. Lis maintenant le cours associé pour comprendre pourquoi la réponse était juste.",
        button: "Lire le cours",
        meta: `${Number(solvedMeta.score || 0)} XP · mystère résolu`
      };
    }
    if (lesson && !quizDone) {
      return {
        stage: 3,
        kind: "lesson",
        view: "quiz",
        title: "Relier les idées",
        subtitle: `Vérifie que tu as compris « ${content?.title || lesson.title} » avec le quiz du cours.`,
        button: "Faire le quiz",
        meta: "Étape de validation"
      };
    }
    return {
      stage: 4,
      kind: lesson ? "lesson" : "mystery",
      view: "complete",
      title: "Expédition terminée",
      subtitle: lesson ? `Le dossier et le cours « ${content?.title || lesson.title} » sont terminés.` : "Le dossier du jour est terminé.",
      button: lesson ? "Revoir le cours" : "Revoir le dossier",
      meta: `Nouveau dossier dans ${timeToNextDaily()}`
    };
  }
  function routeMarkup(stage){
    const steps = ["Résoudre", "Comprendre", "Relier", "Retenir"];
    return `<ol class="hd218-route" aria-label="Progression de l’expédition">${steps.map((label, index) => {
      const number = index + 1;
      const status = number < stage ? "done" : (number === stage ? "current" : "locked");
      return `<li class="${status}"><span>${number < stage ? "✓" : number}</span><b>${label}</b></li>`;
    }).join("")}</ol>`;
  }
  function resumeLesson(disciplineId, excludedIds = []){
    const excluded = new Set(excludedIds.filter(Boolean));
    let lesson = null;
    try { lesson = disciplineId === "history" ? homeContinueLesson() : pickModeLesson(disciplineId); } catch {}
    if (lesson && excluded.has(lesson.id)) lesson = null;
    if (!lesson) {
      try { lesson = readyLessonsForDiscipline(disciplineId).find(item => !excluded.has(item.id) && !lessonDone(item.id) && !lessonLockedByDailyMystery(item)) || null; }
      catch {}
    }
    return lesson;
  }
  function discoveryLesson(disciplineId, excludedIds = []){
    const excluded = new Set(excludedIds.filter(Boolean));
    try {
      const suggestions = disciplineId === "history" ? homeDiscoveryLessons() : rotatedModeLessons(disciplineId, 3);
      return suggestions.find(item => !excluded.has(item.id))
        || readyLessonsForDiscipline(disciplineId).find(item => !excluded.has(item.id) && !lessonLockedByDailyMystery(item))
        || null;
    } catch { return null; }
  }
  function lessonMeta(lesson){
    if (!lesson) return "";
    try {
      const world = lessonWorld(lesson);
      return `${lessonEpochLabel(world)} · ${world.title || "Parcours"}`;
    } catch { return "Cours"; }
  }
  function openMystery(mystery, disciplineId){
    if (!mystery) return;
    setState({ tab: "mystery", currentMysteryId: mystery.id, currentMysteryDiscipline: disciplineId, currentDiscipline: disciplineId });
  }

  renderHome = function beta218RenderHome(){
    const disciplineId = activeDisciplineId();
    const discipline = disciplineById(disciplineId);
    const mystery = dailyMystery();
    const linkedLesson = linkedLessonFor(mystery);
    const stage = stageData(mystery, linkedLesson);
    const resume = resumeLesson(disciplineId, [stage.kind === "lesson" ? linkedLesson?.id : null]);
    const discovery = discoveryLesson(disciplineId, [linkedLesson?.id, resume?.id]);
    const resumeContent = safeContent(resume);
    const discoveryContent = safeContent(discovery);
    const disciplineLessons = (() => { try { return readyLessonsForDiscipline(disciplineId); } catch { return []; } })();
    const completed = disciplineLessons.filter(item => lessonDone(item.id)).length;
    const total = disciplineLessons.length;
    const progress = total ? Math.round((completed / total) * 100) : 0;

    renderShell(`<div class="hd218-home" style="--discipline-accent:${esc(discipline.accent)}">
      <header class="hd218-home-head">
        <div><span>HistoDaily</span><h1>Ton parcours</h1></div>
        <div class="hd218-head-stats" aria-label="Statistiques"><b title="Série">🔥 ${typeof currentStreakValue === "function" ? currentStreakValue() : (state.streak || 0)}</b><b title="Gemmes">◆ ${state.gems || 0}</b><b title="Niveau">Niv. ${level()}</b></div>
      </header>

      ${modeSwitcherMarkup()}

      <section class="hd218-expedition">
        <header><span class="hd218-label">Expédition du jour</span><strong>${stage.stage}/4</strong></header>
        <div class="hd218-expedition-copy">
          <small>${stage.stage === 1 ? "Dossier à résoudre" : stage.stage === 4 ? "Terminé aujourd’hui" : `Étape ${stage.stage} · ${["", "Résoudre", "Comprendre", "Relier", "Retenir"][stage.stage]}`}</small>
          <h2>${esc(stage.title)}</h2>
          <p>${esc(stage.subtitle)}</p>
        </div>
        <div class="hd218-expedition-action"><button type="button" data-hd218-expedition>${esc(stage.button)} <span>→</span></button><em>${esc(stage.meta)}</em></div>
        ${routeMarkup(stage.stage)}
      </section>

      <section class="hd218-section">
        <header><div><span>À continuer</span><h2>Reprendre sans chercher</h2></div><b>${progress}%</b></header>
        ${resume ? `<article class="hd218-compact-card" data-hd218-resume-card tabindex="0" role="button">
          <div class="hd218-card-icon">${HD_ICONS.lesson(resume, lessonWorld(resume), disciplineForLessonObject(resume))}</div>
          <div><small>${esc(lessonMeta(resume))}</small><h3>${esc(resumeContent?.title || resume.title)}</h3><span>${completed}/${total} cours validés</span></div>
          <button type="button" data-hd218-resume>Ouvrir</button>
        </article>` : `<article class="hd218-compact-card hd218-empty-card"><div class="hd218-card-icon">${HD_ICONS.action("check")}</div><div><small>Parcours à jour</small><h3>Choisis librement le prochain cours</h3><span>${completed}/${total} cours validés</span></div><button type="button" data-hd218-catalog>Voir</button></article>`}
      </section>

      <section class="hd218-section hd218-discovery">
        <header><div><span>À découvrir</span><h2>Une seule suggestion, pas une liste</h2></div><button type="button" class="ghost" data-hd218-catalog>Tout voir</button></header>
        ${discovery ? `<article class="hd218-compact-card" data-hd218-discovery-card tabindex="0" role="button">
          <div class="hd218-card-icon">${HD_ICONS.lesson(discovery, lessonWorld(discovery), disciplineForLessonObject(discovery))}</div>
          <div><small>${esc(lessonMeta(discovery))}</small><h3>${esc(discoveryContent?.title || discovery.title)}</h3><span>Cours · quiz</span></div>
          <button type="button" data-hd218-discovery>Découvrir</button>
        </article>` : `<article class="hd218-compact-card hd218-empty-card"><div class="hd218-card-icon">${HD_ICONS.action("courses")}</div><div><small>Catalogue</small><h3>Explore les chapitres disponibles</h3><span>Choisis une époque ou un thème</span></div><button type="button" data-hd218-catalog>Ouvrir</button></article>`}
      </section>
    </div>`);

    const homeShell = document.querySelector(".app-shell.tab-home");
    if (homeShell) {
      homeShell.classList.add("hd218-home-shell");
      homeShell.dataset.hd187Enhanced = "1";
    }
    document.querySelectorAll("[data-home-discipline]").forEach(button => button.addEventListener("click", () => switchHomeDiscipline(button.dataset.homeDiscipline)));

    document.querySelector("[data-hd218-expedition]")?.addEventListener("click", () => {
      if (stage.kind === "mystery") return openMystery(mystery, disciplineId);
      if (stage.kind === "lesson" && linkedLesson) return openLessonFromHome(linkedLesson.id, stage.view || "complete");
      openModeLearn(disciplineId);
    });

    const openResume = () => resume ? openLessonFromHome(resume.id, "complete") : openModeLearn(disciplineId);
    document.querySelector("[data-hd218-resume]")?.addEventListener("click", event => { event.stopPropagation(); openResume(); });
    document.querySelector("[data-hd218-resume-card]")?.addEventListener("click", openResume);
    document.querySelector("[data-hd218-resume-card]")?.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openResume(); } });

    const openDiscovery = () => discovery ? openLessonFromHome(discovery.id, "complete") : openModeLearn(disciplineId);
    document.querySelector("[data-hd218-discovery]")?.addEventListener("click", event => { event.stopPropagation(); openDiscovery(); });
    document.querySelector("[data-hd218-discovery-card]")?.addEventListener("click", openDiscovery);
    document.querySelector("[data-hd218-discovery-card]")?.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openDiscovery(); } });
    document.querySelectorAll("[data-hd218-catalog]").forEach(button => button.addEventListener("click", () => openModeLearn(disciplineId)));
  };

  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, homeRefactor218: true };
  } catch {}
  try {
    window.setTimeout(() => { if (state?.tab === "home") render({ immediate: true }); }, 0);
  } catch {}
})();

/* ===== beta 219 · V2 visuelle claire et légère ===== */
(function histodailyBeta219VisualV2(){
  "use strict";

  const VERSION = "1.0.0-beta.249.0";
  const esc = value => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function safeLessonById(id){
    if (!id) return null;
    try { return lessonById(id) || allLessons().find(item => String(item.id) === String(id)) || null; }
    catch { return null; }
  }

  function safeLessonContent(lesson){
    if (!lesson) return null;
    try { return buildLessonContent(lesson); }
    catch { return { title: lesson.title || "Cours", hook: "Comprendre l’idée essentielle et la retenir." }; }
  }

  function safeWorld(lesson){
    try { return lessonWorld(lesson); }
    catch { return {}; }
  }

  function safeLessonMeta(lesson){
    if (!lesson) return "Cours";
    const world = safeWorld(lesson);
    const group = (() => {
      try { return treeGroups(worldDisciplineId(world)).find(item => item.id === world.group); }
      catch { return null; }
    })();
    return [group?.title, world?.title].filter(Boolean).map(value => String(value).replace(/^\d+\.\s*/, "")).join(" · ") || "Cours";
  }

  function currentDisciplineLessons(disciplineId){
    try { return readyLessonsForDiscipline(disciplineId).filter(item => !lessonLockedByDailyMystery(item)); }
    catch { return []; }
  }

  function homeResumeLesson(disciplineId, excluded = []){
    const excludedSet = new Set(excluded.filter(Boolean).map(String));
    let candidate = null;
    try { candidate = disciplineId === "history" ? homeContinueLesson() : pickModeLesson(disciplineId); }
    catch {}
    if (candidate && excludedSet.has(String(candidate.id))) candidate = null;
    if (!candidate) {
      candidate = currentDisciplineLessons(disciplineId)
        .find(item => !excludedSet.has(String(item.id)) && !lessonDone(item.id)) || null;
    }
    return candidate;
  }

  function homeDiscoveryLesson(disciplineId, excluded = []){
    const excludedSet = new Set(excluded.filter(Boolean).map(String));
    try {
      const preferred = disciplineId === "history" ? homeDiscoveryLessons() : rotatedModeLessons(disciplineId, 4);
      return preferred.find(item => !excludedSet.has(String(item.id)) && !lessonLockedByDailyMystery(item))
        || currentDisciplineLessons(disciplineId).find(item => !excludedSet.has(String(item.id)))
        || null;
    } catch { return null; }
  }

  function dailyStage(mystery, lesson){
    const solved = Boolean(mystery?.id && mysterySolved(mystery.id));
    const courseDone = Boolean(lesson?.id && lessonDone(lesson.id));
    const quizDone = Boolean(lesson?.id && lessonQuizPassed(lesson.id));
    const content = safeLessonContent(lesson);
    if (!mystery) {
      return { index: 1, kind: "catalog", eyebrow: "Parcours libre", title: "Choisis ta prochaine exploration", text: "Le dossier quotidien n’est pas disponible, mais tous les cours restent ouverts.", button: "Explorer les cours", meta: "Accès libre" };
    }
    if (!solved) {
      return {
        index: 1,
        kind: "mystery",
        eyebrow: "Dossier à résoudre",
        title: mysteryDisplayTitle(mystery),
        text: short(mysteryTeaser(mystery), 150),
        button: "Résoudre le mystère",
        meta: `+${dailyRewardPreview().gems} gemme${dailyRewardPreview().gems > 1 ? "s" : ""} aujourd’hui`
      };
    }
    if (lesson && !courseDone) {
      return {
        index: 2,
        kind: "lesson",
        view: "express",
        eyebrow: "Comprendre la réponse",
        title: content?.title || lesson.title,
        text: "Le dossier est résolu. Le cours associé replace maintenant la réponse dans son contexte.",
        button: "Lire le cours",
        meta: "3 min environ"
      };
    }
    if (lesson && !quizDone) {
      return {
        index: 3,
        kind: "lesson",
        view: "quiz",
        eyebrow: "Relier les idées",
        title: "Vérifie ce que tu as compris",
        text: `Un quiz court pour consolider « ${content?.title || lesson.title} » sans repartir de zéro.`,
        button: "Faire le quiz",
        meta: "5 questions"
      };
    }
    return {
      index: 4,
      kind: lesson ? "lesson" : "mystery",
      view: "complete",
      eyebrow: "Expédition terminée",
      title: "Mission accomplie",
      text: lesson ? `Le dossier et le cours « ${content?.title || lesson.title} » sont validés.` : "Le dossier du jour est validé.",
      button: lesson ? "Revoir le cours" : "Revoir le dossier",
      meta: `Nouveau dossier dans ${timeToNextDaily()}`
    };
  }

  function disciplineTabsMarkup(activeId){
    return `<nav class="hd219-disciplines" aria-label="Choisir une discipline">
      ${DISCIPLINES.map(item => {
        const active = item.id === activeId;
        const stats = (() => { try { return disciplineProgress(item.id); } catch { return { progress: 0 }; } })();
        const label = disciplineModeCopy(item.id).shortLabel || item.title;
        return `<button type="button" class="hd219-discipline ${active ? "active" : ""}" data-home-discipline="${esc(item.id)}" style="--discipline-accent:${esc(item.accent)}" aria-pressed="${active}">
          <span>${HD_ICONS.rawDiscipline ? HD_ICONS.rawDiscipline(item) : HD_ICONS.discipline(item)}</span>
          <b>${esc(label)}</b>
          <small>${stats.progress}%</small>
        </button>`;
      }).join("")}
    </nav>`;
  }

  function expeditionTrackMarkup(index){
    const labels = ["Résoudre", "Comprendre", "Relier", "Retenir"];
    return `<div class="hd219-track" aria-label="Progression de l’expédition">
      ${labels.map((label, position) => {
        const step = position + 1;
        const status = step < index ? "done" : step === index ? "current" : "locked";
        return `<div class="${status}"><span>${step < index ? "✓" : step}</span><b>${label}</b></div>`;
      }).join("")}
    </div>`;
  }

  function lessonIcon(lesson, discipline){
    if (!lesson) return HD_ICONS.action("courses");
    try { return HD_ICONS.lesson(lesson, safeWorld(lesson), disciplineForLessonObject(lesson)); }
    catch { return HD_ICONS.discipline(discipline); }
  }

  function levelProgress(){
    const xp = Number(state.xp || 0);
    const base = Math.max(0, (level() - 1) * 250);
    const next = Math.max(base + 250, level() * 250);
    return Math.max(4, Math.min(100, Math.round(((xp - base) / Math.max(1, next - base)) * 100)));
  }

  renderHome = function beta219RenderHome(){
    const disciplineId = activeDisciplineId();
    const discipline = disciplineById(disciplineId);
    const mode = disciplineModeCopy(disciplineId);
    const mystery = dailyMystery();
    const linkedLesson = safeLessonById(mystery?.lessonId);
    const stage = dailyStage(mystery, linkedLesson);
    const resume = homeResumeLesson(disciplineId, [stage.kind === "lesson" ? linkedLesson?.id : null]);
    const discovery = homeDiscoveryLesson(disciplineId, [linkedLesson?.id, resume?.id]);
    const resumeContent = safeLessonContent(resume);
    const discoveryContent = safeLessonContent(discovery);
    const lessons = currentDisciplineLessons(disciplineId);
    const completed = lessons.filter(item => lessonDone(item.id)).length;
    const total = lessons.length;
    const progress = total ? Math.round((completed / total) * 100) : 0;
    const pseudo = String(state.pseudo || "").trim();
    const greeting = pseudo && !/^invité$/i.test(pseudo) ? `Bonjour ${pseudo}` : "Bonjour";

    renderShell(`<div class="hd219-home" style="--discipline-accent:${esc(discipline.accent)}">
      <header class="hd219-appbar">
        <div><span>${esc(greeting)}</span><h1>Continue ton exploration</h1></div>
        <div class="hd219-quick-stats"><b title="Série">🔥 ${typeof currentStreakValue === "function" ? currentStreakValue() : (state.streak || 0)}</b><b title="Niveau">Niv. ${level()}</b></div>
      </header>

      <section class="hd219-domain-zone">
        <div class="hd219-zone-title"><span>Ton univers</span><b>${esc(discipline.title)}</b></div>
        ${disciplineTabsMarkup(disciplineId)}
      </section>

      <section class="hd219-expedition" aria-labelledby="hd219-expedition-title">
        <div class="hd219-expedition-deco" aria-hidden="true"></div>
        <header><span>Expédition du jour</span><b>${stage.index}/4</b></header>
        <div class="hd219-expedition-main">
          <div class="hd219-expedition-art" aria-hidden="true">${HD_ART.hero(discipline.id)}</div>
          <div class="hd219-expedition-copy">
            <small>${esc(stage.eyebrow)}</small>
            <h2 id="hd219-expedition-title">${esc(stage.title)}</h2>
            <p>${esc(stage.text)}</p>
          </div>
        </div>
        <button type="button" class="hd219-primary" data-hd219-expedition><span>${esc(stage.button)}</span><b>→</b></button>
        <div class="hd219-expedition-meta"><span>${esc(stage.meta)}</span><em>${esc(mode.shortLabel || discipline.title)}</em></div>
        ${expeditionTrackMarkup(stage.index)}
      </section>

      <section class="hd219-progress-card">
        <div class="hd219-progress-head"><div><span>Ta progression</span><h2>${esc(discipline.title)}</h2></div><b>${progress}%</b></div>
        <div class="hd219-progress-bar"><i style="width:${Math.max(3, progress)}%"></i></div>
        <div class="hd219-progress-foot"><span>${completed}/${total || 0} cours validés</span><button type="button" data-hd219-catalog>Voir le parcours</button></div>
      </section>

      <section class="hd219-home-cards">
        <article class="hd219-learning-card hd219-resume" data-hd219-resume-card role="button" tabindex="0">
          <div class="hd219-card-icon">${lessonIcon(resume, discipline)}</div>
          <div class="hd219-card-copy"><small>À continuer</small><h3>${esc(resumeContent?.title || resume?.title || "Choisis ton prochain cours")}</h3><p>${esc(resume ? safeLessonMeta(resume) : "Tout le catalogue est accessible")}</p></div>
          <button type="button" data-hd219-resume>${resume ? "Reprendre" : "Choisir"}</button>
        </article>

        <article class="hd219-learning-card hd219-discovery" data-hd219-discovery-card role="button" tabindex="0">
          <div class="hd219-card-icon">${lessonIcon(discovery, discipline)}</div>
          <div class="hd219-card-copy"><small>À découvrir</small><h3>${esc(discoveryContent?.title || discovery?.title || "Explore un nouveau chapitre")}</h3><p>${esc(discovery ? safeLessonMeta(discovery) : "Une suggestion liée à ton univers")}</p></div>
          <button type="button" data-hd219-discovery>${discovery ? "Découvrir" : "Explorer"}</button>
        </article>
      </section>
    </div>`);

    const shell = document.querySelector(".app-shell.tab-home");
    if (shell) {
      shell.classList.add("hd219-home-shell");
      shell.dataset.hd187Enhanced = "1";
    }

    document.querySelectorAll("[data-home-discipline]").forEach(button => button.addEventListener("click", () => switchHomeDiscipline(button.dataset.homeDiscipline)));

    document.querySelector("[data-hd219-expedition]")?.addEventListener("click", () => {
      if (stage.kind === "mystery") return setState({ tab: "mystery", currentMysteryId: mystery?.id || null, currentMysteryDiscipline: disciplineId, currentDiscipline: disciplineId });
      if (stage.kind === "lesson" && linkedLesson) return openLessonFromHome(linkedLesson.id, stage.view || "complete");
      openModeLearn(disciplineId);
    });

    const openResume = () => resume ? openLessonFromHome(resume.id, "complete") : openModeLearn(disciplineId);
    document.querySelector("[data-hd219-resume]")?.addEventListener("click", event => { event.stopPropagation(); openResume(); });
    document.querySelector("[data-hd219-resume-card]")?.addEventListener("click", openResume);
    document.querySelector("[data-hd219-resume-card]")?.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openResume(); } });

    const openDiscovery = () => discovery ? openLessonFromHome(discovery.id, "complete") : openModeLearn(disciplineId);
    document.querySelector("[data-hd219-discovery]")?.addEventListener("click", event => { event.stopPropagation(); openDiscovery(); });
    document.querySelector("[data-hd219-discovery-card]")?.addEventListener("click", openDiscovery);
    document.querySelector("[data-hd219-discovery-card]")?.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openDiscovery(); } });
    document.querySelectorAll("[data-hd219-catalog]").forEach(button => button.addEventListener("click", () => openModeLearn(disciplineId)));
  };

  function bindMasteryToggle(shell){
    const card = shell.querySelector(".beta179-profile-mastery");
    const list = card?.querySelector(".beta179-mastery-list");
    if (!card || !list || card.querySelector("[data-hd219-mastery-toggle]")) return;
    list.classList.add("hd219-collapsed");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ghost hd219-mastery-toggle";
    button.dataset.hd219MasteryToggle = "1";
    button.textContent = "Voir tous les domaines";
    button.addEventListener("click", () => {
      const collapsed = list.classList.toggle("hd219-collapsed");
      button.textContent = collapsed ? "Voir tous les domaines" : "Réduire";
    });
    card.appendChild(button);
  }

  function upgradeProfile(){
    // La V3 reconstruit le profil après le rendu historique. Ne pas relancer
    // l’ancien relooking asynchrone : il provoquait des déplacements et
    // superpositions visibles quelques millisecondes après l’ouverture.
    if (document.documentElement.classList.contains("hd220-visual")) return;
    const shell = document.querySelector(".app-shell.tab-profile");
    if (!shell) return;
    if (window.HD_SOCIAL_V2_ONLY === true && shell.querySelector(".hdsv2-profile-screen")) return;
    shell.classList.add("hd219-profile-shell");

    const topbar = shell.querySelector(":scope > .topbar");
    if (topbar) {
      const eyebrow = topbar.querySelector(".eyebrow");
      const title = topbar.querySelector("h1");
      if (eyebrow) eyebrow.textContent = "Espace joueur";
      if (title) title.textContent = "Ton profil";
    }

    const profile = shell.querySelector(".public-profile-card");
    const curiosity = shell.querySelector(".hd217-curiosity-card,.hd187-curiosity-card");
    const weekly = shell.querySelector(".beta181-weekly-card");
    const collections = shell.querySelector(".beta179-profile-collections");
    const mastery = shell.querySelector(".beta179-profile-mastery");
    const culture = shell.querySelector(".culture-profile-card");
    const achievements = shell.querySelector(".achievement-grid");

    if (profile) profile.classList.add("hd219-player-card");
    if (curiosity) curiosity.classList.add("hd219-curiosity");
    if (weekly) weekly.classList.add("hd219-weekly");
    if (collections) collections.classList.add("hd219-collections");
    if (mastery) mastery.classList.add("hd219-mastery");
    if (culture) culture.classList.add("hd219-culture");
    if (achievements) achievements.classList.add("hd219-achievements");

    if (profile && curiosity && profile.nextElementSibling !== curiosity) profile.insertAdjacentElement("afterend", curiosity);
    if (curiosity && collections && curiosity.nextElementSibling !== collections) curiosity.insertAdjacentElement("afterend", collections);
    if (collections && weekly && collections.nextElementSibling !== weekly) collections.insertAdjacentElement("afterend", weekly);
    if (weekly && mastery && weekly.nextElementSibling !== mastery) weekly.insertAdjacentElement("afterend", mastery);

    const profileStats = profile?.querySelector(".public-stats-grid");
    if (profile && profileStats && !profile.querySelector(".hd219-level-meter")) {
      const meter = document.createElement("div");
      meter.className = "hd219-level-meter";
      meter.innerHTML = `<div><span>Niveau ${level()}</span><b>${state.xp || 0} XP</b></div><i><em style="width:${levelProgress()}%"></em></i>`;
      profileStats.insertAdjacentElement("beforebegin", meter);
    }

    bindMasteryToggle(shell);
  }

  const previousRenderProfile = typeof renderProfile === "function" ? renderProfile : null;
  if (previousRenderProfile) {
    renderProfile = function beta219RenderProfile(){
      const result = previousRenderProfile();
      [0, 60, 180].forEach(delay => window.setTimeout(upgradeProfile, delay));
      return result;
    };
  }

  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, visualV2: true, visualV2Home: true, visualV2Profile: true };
  } catch {}

  try {
    window.setTimeout(() => {
      if (state?.tab === "home") render({ immediate: true });
      else if (state?.tab === "profile") upgradeProfile();
    }, 0);
  } catch {}
})();

/* Beta 260 — rotation quotidienne canonique et changement de jour à chaud.
   Le dossier du jour est recalculé au démarrage, au retour dans l’application
   et lorsqu’un onglet reste ouvert au passage de minuit. */
(function histodailyBeta260DailyRotationIntegrity(){
  "use strict";
  const ENGINE_VERSION = "1.0.0-beta.271.0";
  let lastObservedDay = "";

  function currentDayKey(){
    try { return typeof localDayKey === "function" ? localDayKey() : new Date().toISOString().slice(0, 10); }
    catch { return new Date().toISOString().slice(0, 10); }
  }

  function reconcileDailyMystery({ renderAfter = false } = {}){
    try {
      const today = currentDayKey();
      const previousDay = lastObservedDay || state.dailyRuntimeDay || today;
      const dayChanged = previousDay !== today;
      lastObservedDay = today;
      state.dailyRuntimeDay = today;

      const activeId = typeof activeDisciplineId === "function" ? activeDisciplineId() : (state.currentDiscipline || "history");
      const selected = state.currentMysteryId && typeof mysteryById === "function" ? mysteryById(state.currentMysteryId) : null;
      const selectedId = selected?.id || null;
      const selectedDiscipline = selected && typeof mysteryDisciplineId === "function" ? mysteryDisciplineId(selected) : null;
      const selectedDaily = selectedDiscipline && typeof mysteryForDisciplineDayOffset === "function"
        ? mysteryForDisciplineDayOffset(selectedDiscipline, 0)
        : null;
      const activeDaily = typeof mysteryForDisciplineDayOffset === "function"
        ? mysteryForDisciplineDayOffset(activeId, 0)
        : null;
      const permanent = Boolean(selectedId && ((typeof mysterySolved === "function" && mysterySolved(selectedId)) || state.unlockedMysteries?.[selectedId]));
      const validDaily = Boolean(selectedId && selectedDaily?.id === selectedId && selectedDiscipline === activeId);
      const validSameDayManual = Boolean(selectedId && state.currentMysteryOpenedDay === today && state.tab === "mystery");
      const keepPermanentOpen = Boolean(permanent && state.tab === "mystery");
      const mustReturnToDaily = Boolean(dayChanged && state.tab !== "mystery");

      let changed = false;
      if (mustReturnToDaily || (!keepPermanentOpen && !validDaily && !validSameDayManual)) {
        const nextId = activeDaily?.id || null;
        if (state.currentMysteryId !== nextId || state.currentMysteryDiscipline !== activeId || state.currentMysteryOpenedDay !== (nextId ? today : null)) {
          state.currentMysteryId = nextId;
          state.currentMysteryDiscipline = activeId;
          state.currentMysteryOpenedDay = nextId ? today : null;
          changed = true;
        }
      } else if (selectedId && !state.currentMysteryOpenedDay && validDaily) {
        state.currentMysteryOpenedDay = today;
        changed = true;
      }

      delete state.beta231AstroDossierReady;
      state.dailyMysteryEngineVersion = ENGINE_VERSION;
      if (changed || dayChanged) {
        try { if (typeof queueSaveState === "function") queueSaveState(60); else saveState?.(); } catch {}
        if (renderAfter) {
          try { if (typeof render === "function") render({ immediate: true }); } catch {}
        }
      }
      return changed || dayChanged;
    } catch (error) {
      try { console.warn("daily mystery rotation integrity", error); } catch {}
      return false;
    }
  }

  reconcileDailyMystery({ renderAfter: true });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") reconcileDailyMystery({ renderAfter: true });
  });
  window.addEventListener("focus", () => reconcileDailyMystery({ renderAfter: true }));
  window.setInterval(() => reconcileDailyMystery({ renderAfter: true }), 60_000);
  window.HistoDailyDailyRotation = { version: ENGINE_VERSION, reconcile: reconcileDailyMystery, dayKey: currentDayKey };
})();

/* ===== HistoDaily beta 244 — fiabilité, classement et amis ===== */
(() => {
  "use strict";
  const VERSION = "1.0.0-beta.249.0";
  const SOCIAL_SNAPSHOT_KEY = `${HISTODAILY_CORE?.storageKey || "histodaily_state"}_social_snapshot_v3`;
  const VALID_SCOPES = new Set(["daily", "week", "year", "friends"]);
  const leaderboardInFlight = new Map();
  let friendsInFlight = null;
  let fullRefreshInFlight = null;

  const esc = value => {
    try { return escapeHtml(String(value ?? "")); }
    catch { return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c])); }
  };
  const safeScope = value => VALID_SCOPES.has(value) ? value : "daily";
  const code = value => {
    try { return normalizeFriendCode(value || ""); }
    catch { return String(value || "").trim().toUpperCase().replace(/\s+/g, "").replace(/[^A-Z0-9-]/g, ""); }
  };
  const identityKey = row => code(row?.friendCode || row?.friend_code || row?.code || "") || String(row?.playerId || row?.player_id || row?.id || "");
  const isAcceptedFriend = row => {
    const key = identityKey(row);
    if (!key) return false;
    return Object.values(state.friends || {}).some(friend => {
      const friendKey = identityKey(friend);
      if (friendKey && friendKey === key) return true;
      const a = code(friend?.code || friend?.friendCode || "");
      const b = code(row?.friendCode || row?.friend_code || row?.code || "");
      return Boolean(a && b && friendCodeSuffix?.(a) === friendCodeSuffix?.(b));
    });
  };
  function localWindow(scope = "daily") {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let start = new Date(today);
    if (scope === "week") {
      const day = start.getDay() || 7;
      start.setDate(start.getDate() - day + 1);
    } else if (scope === "year") {
      start = new Date(now.getFullYear(), 0, 1);
    }
    const end = new Date(today);
    end.setDate(end.getDate() + 1);
    return { start: start.toISOString(), end: end.toISOString(), periodKey: localDayKey() };
  }
  async function requestJson(url, options = {}, timeoutMs = 9000) {
    const controller = typeof AbortController === "function" ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
    try {
      const response = await fetch(url, { cache: "no-store", ...options, signal: controller?.signal });
      const json = await response.json().catch(() => ({}));
      if (!response.ok || json?.ok === false || json?.mode === "supabase-error") {
        const error = new Error(json?.message || json?.note || `HTTP ${response.status}`);
        error.status = response.status;
        error.payload = json;
        throw error;
      }
      return json;
    } catch (error) {
      if (error?.name === "AbortError") throw new Error("Délai réseau dépassé");
      throw error;
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  function socialSnapshot() {
    return {
      version: VERSION,
      savedAt: Date.now(),
      playerId: typeof playerIdMe === "function" ? playerIdMe() : "",
      friendCode: typeof friendCode === "function" ? friendCode() : "",
      pseudo: state.pseudo || "Invité",
      friends: cleanStoredFriendsMap?.(state.friends || {}) || state.friends || {},
      friendRequests: state.friendRequests || { incoming: [], outgoing: [], history: [] },
      friendRequestOutbox: Array.isArray(state.friendRequestOutbox) ? state.friendRequestOutbox.slice(0, 40) : [],
      lastScoreSubmit: state.lastScoreSubmit || {},
      serverFriendsStatus: state.serverFriendsStatus || {},
      serverFriendRequestsStatus: state.serverFriendRequestsStatus || {}
    };
  }
  function writeSocialSnapshot() {
    try { localStorage.setItem(SOCIAL_SNAPSHOT_KEY, JSON.stringify(socialSnapshot())); return true; }
    catch { return false; }
  }
  function recoverSocialSnapshot() {
    try {
      const raw = JSON.parse(localStorage.getItem(SOCIAL_SNAPSHOT_KEY) || "null");
      if (!raw || typeof raw !== "object") return false;
      let changed = false;
      const recoveredFriends = cleanStoredFriendsMap?.(raw.friends || {}) || raw.friends || {};
      if (Object.keys(recoveredFriends).length > Object.keys(state.friends || {}).length) {
        state.friends = { ...(state.friends || {}), ...recoveredFriends };
        changed = true;
      }
      const currentRequests = state.friendRequests || {};
      const recoveredRequests = raw.friendRequests || {};
      const count = value => Array.isArray(value) ? value.length : 0;
      if (count(recoveredRequests.incoming) + count(recoveredRequests.outgoing) > count(currentRequests.incoming) + count(currentRequests.outgoing)) {
        state.friendRequests = {
          incoming: Array.isArray(recoveredRequests.incoming) ? recoveredRequests.incoming : [],
          outgoing: Array.isArray(recoveredRequests.outgoing) ? recoveredRequests.outgoing : [],
          history: Array.isArray(recoveredRequests.history) ? recoveredRequests.history : []
        };
        changed = true;
      }
      if ((!Array.isArray(state.friendRequestOutbox) || !state.friendRequestOutbox.length) && Array.isArray(raw.friendRequestOutbox) && raw.friendRequestOutbox.length) {
        state.friendRequestOutbox = raw.friendRequestOutbox.slice(0, 40);
        changed = true;
      }
      if (changed) queueSaveState?.(20);
      return changed;
    } catch { return false; }
  }

  const previousSaveState = typeof saveState === "function" ? saveState : null;
  if (previousSaveState) {
    saveState = function beta242SaveState() {
      const result = previousSaveState();
      writeSocialSnapshot();
      return result;
    };
  }
  recoverSocialSnapshot();
  writeSocialSnapshot();

  const previousSubmitScore = typeof submitScoreToServer === "function" ? submitScoreToServer : null;
  submitScoreToServer = async function beta242SubmitScore(payload = {}) {
    const stablePayload = {
      ...payload,
      playerId: playerIdMe(),
      pseudo: currentPseudo(),
      friendCode: friendCode(),
      clientVersion: VERSION,
      requestId: `${playerIdMe()}|${payload.mysteryId || "mystery"}|${payload.dayKey || localDayKey()}`
    };
    try {
      return await requestJson("/api/v1/leaderboard/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-HistoDaily-Request": stablePayload.requestId },
        body: JSON.stringify(stablePayload)
      }, 10000);
    } catch (error) {
      if (previousSubmitScore && error?.status === 404) return previousSubmitScore(stablePayload);
      throw error;
    }
  };

  fetchServerLeaderboard = async function beta242FetchServerLeaderboard(scope = "daily", { force = false } = {}) {
    scope = safeScope(scope);
    const status = state.serverLeaderboardStatus?.[scope] || {};
    if (!force && status.loadedAt && Date.now() - Number(status.loadedAt) < 30000) return state.serverLeaderboards?.[scope] || [];
    if (leaderboardInFlight.has(scope)) return leaderboardInFlight.get(scope);
    const task = (async () => {
      state.serverLeaderboardStatus = { ...(state.serverLeaderboardStatus || {}), [scope]: { ...status, loading: true, startedAt: Date.now() } };
      try {
        const friends = Object.values(state.friends || {});
        const friendCodes = friends.map(friend => friend.code || friend.friendCode || friend.id).filter(Boolean).join(",");
        const friendIds = friends.map(friend => friend.playerId || friend.friend_player_id).filter(Boolean).join(",");
        const range = localWindow(scope);
        const params = new URLSearchParams({
          scope,
          periodKey: range.periodKey,
          rangeStart: range.start,
          rangeEnd: range.end,
          playerId: playerIdMe(),
          friendCodes,
          friendIds,
          _: String(Date.now())
        });
        const json = await requestJson(`/api/v1/leaderboard/daily?${params}`);
        const rows = Array.isArray(json.rows) ? json.rows : [];
        state.serverLeaderboards = { ...(state.serverLeaderboards || {}), [scope]: rows };
        state.serverLeaderboardStatus = { ...(state.serverLeaderboardStatus || {}), [scope]: { loading: false, loadedAt: Date.now(), mode: json.mode || "unknown", note: json.note || "", error: "" } };
        queueSaveState?.(80);
        return rows;
      } catch (error) {
        const friendly = navigator.onLine === false ? "Hors ligne : dernières données conservées." : "Connexion au classement indisponible. Dernières données conservées.";
        state.serverLeaderboardStatus = { ...(state.serverLeaderboardStatus || {}), [scope]: { loading: false, loadedAt: Date.now(), mode: navigator.onLine === false ? "offline" : "error", note: friendly, error: String(error?.message || "Erreur réseau").slice(0, 160) } };
        queueSaveState?.(80);
        return state.serverLeaderboards?.[scope] || [];
      } finally {
        leaderboardInFlight.delete(scope);
        if (state.tab === "rank" && safeScope(state.rankScope) === scope) render?.({ immediate: true });
      }
    })();
    leaderboardInFlight.set(scope, task);
    return task;
  };
  ensureServerLeaderboard = function beta242EnsureServerLeaderboard(scope = "daily") { return fetchServerLeaderboard(scope).catch(() => []); };

  const previousFetchServerFriends = typeof fetchServerFriends === "function" ? fetchServerFriends : null;
  fetchServerFriends = async function beta242FetchServerFriends({ force = false } = {}) {
    const status = state.serverFriendsStatus || {};
    if (!force && status.loadedAt && Date.now() - Number(status.loadedAt) < 30000) return state.friends || {};
    if (friendsInFlight) return friendsInFlight;
    friendsInFlight = (async () => {
      state.serverFriendsStatus = { ...status, loading: true, startedAt: Date.now() };
      try {
        const params = new URLSearchParams({ playerId: playerIdMe(), friendCode: friendCode(), _: String(Date.now()) });
        const json = await requestJson(`/api/v1/friends/sync?${params}`);
        mergeServerFriends?.(json.friends || []);
        state.serverFriendsStatus = { loading: false, loadedAt: Date.now(), mode: json.mode || "unknown", message: json.message || "", error: "" };
        if (typeof beta125FetchFriendRequests === "function") await beta125FetchFriendRequests({ force: true }).catch(() => {});
        writeSocialSnapshot();
        queueSaveState?.(80);
        return state.friends || {};
      } catch (error) {
        if (previousFetchServerFriends && error?.status === 404) return previousFetchServerFriends({ force });
        const friendly = navigator.onLine === false ? "Hors ligne : liste d’amis conservée." : "Connexion aux amis indisponible. Liste locale conservée.";
        state.serverFriendsStatus = { loading: false, loadedAt: Date.now(), mode: navigator.onLine === false ? "offline" : "error", message: friendly, error: String(error?.message || "Erreur réseau").slice(0, 160) };
        queueSaveState?.(80);
        return state.friends || {};
      } finally {
        friendsInFlight = null;
        if (["rank", "profile", "publicProfile"].includes(state.tab)) render?.({ immediate: true });
      }
    })();
    return friendsInFlight;
  };
  ensureServerFriends = function beta242EnsureServerFriends() { return fetchServerFriends().catch(() => state.friends || {}); };

  async function refreshSocial({ force = true, scope = safeScope(state.rankScope || "daily") } = {}) {
    // beta255 : les listeners historiques gardent cette closure. On les rend
    // explicitement muets lorsque le moteur social v2 est actif.
    if (window.HD_SOCIAL_V2_ONLY === true) return null;
    if (fullRefreshInFlight) return fullRefreshInFlight;
    fullRefreshInFlight = (async () => {
      try { await syncMyProfileToServer?.({ source: "beta242-refresh" }); } catch {}
      try { await beta128FlushScoreOutbox?.({ force: true, reason: "beta242-refresh" }); } catch {}
      try { await beta128FlushOutgoingRequests?.({ force: true }); } catch {}
      await Promise.all([
        fetchServerFriends({ force }).catch(() => null),
        fetchServerLeaderboard(scope, { force }).catch(() => null)
      ]);
      if (scope === "friends") await fetchServerLeaderboard("friends", { force: true }).catch(() => null);
      writeSocialSnapshot();
    })().finally(() => { fullRefreshInFlight = null; });
    return fullRefreshInFlight;
  }

  function requestState() {
    try { return beta125FriendRequestsState?.() || { incoming: [], outgoing: [], history: [] }; }
    catch { return { incoming: [], outgoing: [], history: [] }; }
  }
  function requestCount() { return requestState().incoming.length; }
  function outboxCount() {
    let scores = 0, requests = 0;
    try { scores = beta128PendingScoreCount?.() || 0; } catch {}
    try { requests = beta128Outbox?.().length || 0; } catch {}
    return { scores, requests, total: scores + requests };
  }
  function friendRequestMarkup() {
    const requests = requestState();
    const incoming = requests.incoming || [];
    const outgoing = requests.outgoing || [];
    if (!incoming.length && !outgoing.length) return "";
    const incomingHtml = incoming.map(req => `<div class="hd242-request-row"><div><strong>${esc(req.requesterPseudo || req.otherPseudo || "Joueur")}</strong><span>veut t’ajouter</span></div><div><button type="button" data-respond-friend-request="accept" data-request-player="${esc(req.requesterPlayerId || req.otherPlayerId || "")}" data-request-code="${esc(req.requesterFriendCode || req.otherFriendCode || "")}">Accepter</button><button type="button" class="ghost" data-respond-friend-request="decline" data-request-player="${esc(req.requesterPlayerId || req.otherPlayerId || "")}" data-request-code="${esc(req.requesterFriendCode || req.otherFriendCode || "")}">Refuser</button></div></div>`).join("");
    const outgoingHtml = outgoing.map(req => `<div class="hd242-request-row pending"><div><strong>${esc(req.targetPseudo || req.otherPseudo || "Joueur")}</strong><span>demande en attente</span></div><button type="button" class="ghost" data-cancel-friend-request="${esc(req.requestId || req.id || req.targetFriendCode || req.otherFriendCode || "")}" data-request-id="${esc(req.requestId || (/^\d+$/.test(String(req.id || "")) ? req.id : ""))}" data-request-player="${esc(req.targetPlayerId || req.otherPlayerId || "")}" data-request-code="${esc(req.targetFriendCode || req.otherFriendCode || "")}" data-request-pseudo="${esc(req.targetPseudo || req.otherPseudo || "Joueur")}">Annuler</button></div>`).join("");
    return `<section class="card hd242-requests"><div class="section-title-row"><div><span class="card-label">Demandes d’amis</span><h2>${incoming.length ? `${incoming.length} à valider` : `${outgoing.length} en attente`}</h2></div><button type="button" class="ghost mini-button" data-refresh-requests>Actualiser</button></div>${incomingHtml}${outgoingHtml}</section>`;
  }

  addFriendMarkup = function beta242AddFriendMarkup() {
    const draft = esc(state.friendCodeDraft || "");
    return `<section class="card hd242-add-friend"><div><span class="card-label">Ajouter quelqu’un</span><h2>Envoyer une demande d’ami</h2><p>Colle son code. Il devra accepter avant d’apparaître dans ton classement amis.</p></div><form data-add-friend class="friend-add-form beta165-friend-add-form"><input data-friend-code-input name="friendCode" value="${draft}" placeholder="PSEUDO-ABC123" autocapitalize="characters" autocomplete="off" spellcheck="false"/><button type="submit">Envoyer</button></form><div class="friend-code"><strong>${esc(friendCode())}</strong><button type="button" data-share-invite>Partager mon code</button></div>${state.friendFeedback ? `<p class="profile-feedback">${esc(state.friendFeedback)}</p>` : ""}</section>`;
  };
  friendListMarkup = function beta242FriendListMarkup({ compact = false } = {}) {
    const friends = friendProfiles?.() || [];
    if (!friends.length) return `<section class="card empty-friends-card"><span class="card-label">Amis acceptés</span><h2>Personne pour le moment</h2><p>Une demande acceptée apparaîtra ici et dans le classement entre amis.</p></section>`;
    return `<section class="card friends-list-card hd242-friends-list"><div class="section-title-row"><div><span class="card-label">Amis acceptés</span><h2>${friends.length} ami${friends.length > 1 ? "s" : ""}</h2></div><small>profils réels</small></div>${friends.slice(0, compact ? 3 : 30).map(friend => `<div class="friend-row"><button type="button" class="friend-main" data-view-profile="${esc(friend.id)}"><span class="avatar tiny">${esc(friend.avatar)}</span><span><strong>${esc(friend.name)}</strong><em>${Number(friend.daily || 0)} pt aujourd’hui · niv. ${Number(friend.level || 1)}</em></span></button><button type="button" class="ghost mini-button" data-remove-friend="${esc(friend.id)}">Retirer</button></div>`).join("")}</section>`;
  };

  function localScore(scope = "daily") {
    try { return Number(scoreForScope(scope === "friends" ? "daily" : scope) || 0); }
    catch { return 0; }
  }
  function localSolved(scope = "daily") {
    try { return Number(solvedCountForScope(scope === "friends" ? "daily" : scope) || 0); }
    catch { return 0; }
  }
  function selfIdentity() { return { playerId: String(playerIdMe()), friendCode: code(friendCode()), name: state.pseudo || "Invité" }; }
  function isSelf(row, self = selfIdentity()) {
    const pid = String(row?.playerId || row?.player_id || row?.id || "");
    const fcode = code(row?.friendCode || row?.friend_code || row?.code || "");
    return Boolean((pid && self.playerId && pid === self.playerId) || (fcode && self.friendCode && fcode === self.friendCode));
  }
  function normalizedRemoteRows(scope) {
    try { return remoteLeaderboardRows?.(scope) || []; }
    catch { return []; }
  }
  function rankRows(scope = "daily") {
    scope = safeScope(scope);
    const self = selfIdentity();
    const rows = [];
    const map = new Map();
    for (const raw of normalizedRemoteRows(scope)) {
      if (!raw || isSelf(raw, self)) continue;
      if (scope === "friends" && !isAcceptedFriend(raw)) continue;
      const key = identityKey(raw);
      if (!key) continue;
      const row = { ...raw, id: raw.id || raw.playerId || raw.friendCode || key, playerId: raw.playerId || raw.player_id || "", friendCode: code(raw.friendCode || raw.friend_code || ""), name: raw.name || raw.pseudo || "Joueur", score: Math.max(0, Number(raw.score || 0)), me: false };
      const previous = map.get(key);
      if (!previous || row.score > previous.score) map.set(key, row);
    }
    if (scope === "friends") {
      for (const friend of friendProfiles?.() || []) {
        const key = identityKey(friend);
        if (!key || map.has(key)) continue;
        map.set(key, { ...friend, id: friend.id || key, playerId: friend.playerId || "", friendCode: code(friend.code || ""), name: friend.name || "Ami", score: Math.max(0, Number(friend.daily || 0)), me: false, acceptedFriend: true });
      }
    }
    rows.push(...map.values());
    rows.push({ id: self.playerId, playerId: self.playerId, friendCode: self.friendCode, name: self.name, score: localScore(scope), me: true });
    rows.sort((a, b) => Number(b.score) - Number(a.score) || String(a.name).localeCompare(String(b.name), "fr"));
    let lastScore = null, lastRank = 0;
    return rows.filter(row => row.me || Number(row.score) > 0).slice(0, 100).map((row, index) => {
      const score = Number(row.score || 0);
      const rank = lastScore === score ? lastRank : index + 1;
      lastScore = score; lastRank = rank;
      return { ...row, rank };
    });
  }
  leaderboardRows = function beta242LeaderboardRows(scope = state.rankScope || "daily") { return rankRows(scope); };

  function periodLabel(scope) { return ({ daily: "Aujourd’hui", week: "Semaine", year: "Année", friends: "Amis" })[safeScope(scope)]; }
  function scoreHelp(scope) {
    if (scope === "week") return "Somme des scores obtenus depuis lundi.";
    if (scope === "year") return "Somme des scores obtenus depuis le 1er janvier.";
    if (scope === "friends") return "Score du jour, limité aux amis que vous avez acceptés.";
    return "Score du jour : indices et essais supplémentaires réduisent le résultat.";
  }
  function syncLine(scope) {
    const status = state.serverLeaderboardStatus?.[scope] || {};
    const pending = outboxCount();
    if (navigator.onLine === false) return `Hors ligne${pending.total ? ` · ${pending.total} envoi${pending.total > 1 ? "s" : ""} en attente` : ""}`;
    if (status.loading) return "Actualisation en cours…";
    if (status.mode === "error") return status.note || "Connexion instable : dernières données conservées.";
    if (status.loadedAt) {
      const seconds = Math.max(0, Math.round((Date.now() - Number(status.loadedAt)) / 1000));
      return `Actualisé ${seconds < 5 ? "à l’instant" : `il y a ${seconds} s`}${pending.total ? ` · ${pending.total} en attente` : ""}`;
    }
    return pending.total ? `${pending.total} envoi${pending.total > 1 ? "s" : ""} en attente` : "Prêt à synchroniser";
  }
  function rowsMarkup(rows) {
    if (!rows.length) return `<div class="hd242-empty"><strong>Aucun score reçu</strong><p>Le classement se remplira après la résolution du dossier du jour.</p></div>`;
    return rows.map(row => `<div class="hd242-rank-row${row.me ? " me" : ""}"><span class="hd242-position">${row.rank}</span><button type="button" class="hd242-player" ${row.me ? "disabled" : `data-view-profile="${esc(row.id)}"`}><strong>${esc(row.name)}${row.me ? " · toi" : ""}</strong><small>${row.me ? "score local fiable" : row.acceptedFriend || isAcceptedFriend(row) ? "ami accepté" : "profil en ligne"}</small></button><b>${Number(row.score || 0)} pt</b></div>`).join("");
  }
  function bindRank() {
    document.querySelectorAll("[data-rank-scope]").forEach(button => button.onclick = event => {
      event.preventDefault();
      const scope = safeScope(button.dataset.rankScope || "daily");
      setState({ tab: "rank", rankScope: scope }, { save: true, renderImmediate: true });
      refreshSocial({ force: false, scope }).catch(() => {});
    });
    document.querySelectorAll("[data-view-profile]").forEach(button => button.onclick = event => { event.preventDefault(); viewProfile?.(button.dataset.viewProfile || ""); });
    document.querySelectorAll("[data-remove-friend]").forEach(button => button.onclick = event => { event.preventDefault(); event.stopPropagation(); removeFriend?.(button.dataset.removeFriend); });
    document.querySelector("[data-add-friend]")?.addEventListener("submit", addFriend);
    document.querySelector("[data-friend-code-input]")?.addEventListener("input", event => {
      state.friendCodeDraft = event.currentTarget.value || "";
      queueSaveState?.(250);
    });
    document.querySelector("[data-share-invite]")?.addEventListener("click", shareInviteCode);
    document.querySelector("[data-copy-invite-link]")?.addEventListener("click", copyInviteLink);
    document.querySelector("[data-home]")?.addEventListener("click", () => setState({ tab: "home" }, { save: true }));
    document.querySelector("[data-open-profile]")?.addEventListener("click", () => setState({ tab: "profile" }, { save: true }));
    document.querySelector("[data-refresh-ranking]")?.addEventListener("click", event => {
      const button = event.currentTarget;
      button.disabled = true;
      button.textContent = "Actualisation…";
      refreshSocial({ force: true, scope: safeScope(state.rankScope) }).finally(() => render?.({ immediate: true }));
    });
  }

  renderRank = function beta242RenderRank() {
    const scope = safeScope(state.rankScope || "daily");
    state.rankScope = scope;
    const rows = rankRows(scope);
    const me = rows.find(row => row.me);
    const score = localScore(scope);
    const solved = localSolved(scope);
    const accepted = friendProfiles?.().length || 0;
    const requests = requestCount();
    renderShell(`<header class="topbar hd242-rank-topbar"><button type="button" data-home aria-label="Retour">←</button><div><p class="eyebrow">Classement</p><h1>${esc(periodLabel(scope))}</h1></div><button type="button" class="hd242-profile-button" data-open-profile>${esc((state.pseudo || "P").charAt(0).toUpperCase())}</button></header>
      <nav class="hd242-rank-tabs" aria-label="Choisir un classement">
        ${["daily","week","year","friends"].map(key => `<button type="button" data-rank-scope="${key}" class="${scope === key ? "active" : ""}" aria-current="${scope === key ? "page" : "false"}">${key === "friends" && requests ? `Amis <span>${requests}</span>` : esc(periodLabel(key))}</button>`).join("")}
      </nav>
      <section class="card hd242-score-card"><div class="hd242-score-head"><div><span class="card-label">Ton résultat</span><h2>${score} points</h2><p>${esc(scoreHelp(scope))}</p></div><button type="button" data-refresh-ranking>Actualiser</button></div><div class="hd242-kpis"><div><b>#${me?.rank || "—"}</b><span>ta place</span></div><div><b>${solved}</b><span>dossier${solved > 1 ? "s" : ""} compté${solved > 1 ? "s" : ""}</span></div>${scope === "friends" ? `<div><b>${accepted}</b><span>ami${accepted > 1 ? "s" : ""} accepté${accepted > 1 ? "s" : ""}</span></div>` : ""}</div><small class="hd242-sync-line">${esc(syncLine(scope))}</small></section>
      ${scope === "friends" ? friendRequestMarkup() : ""}
      <section class="card hd242-leaderboard"><div class="section-title-row"><div><span class="card-label">${scope === "friends" ? "Entre amis" : "Classement général"}</span><h2>${rows.length} joueur${rows.length > 1 ? "s" : ""}</h2></div></div><div class="hd242-rank-list">${rowsMarkup(rows)}</div></section>
      ${scope === "friends" ? `${addFriendMarkup()}${friendListMarkup()}` : ""}`);
    bindRank();
    refreshSocial({ force: false, scope }).catch(() => {});
  };

  function flushDurableSocial(reason = "lifecycle") {
    try { writeSocialSnapshot(); } catch {}
    try { saveState?.(); } catch {}
    if (navigator.onLine !== false) {
      try { beta128FlushScoreOutbox?.({ force: reason === "online", reason }); } catch {}
      try { beta128FlushOutgoingRequests?.({ force: reason === "online" }); } catch {}
    }
  }
  window.addEventListener("online", () => { isOnline = true; flushDurableSocial("online"); refreshSocial({ force: true }).catch(() => {}); });
  window.addEventListener("pagehide", () => flushDurableSocial("pagehide"));
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushDurableSocial("hidden");
    else if (["rank","profile","publicProfile"].includes(state.tab)) refreshSocial({ force: false }).catch(() => {});
  });

  try {
    document.documentElement.classList.add("hd242-reliability");
    state.beta242ReliabilityVersion = VERSION;
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, storageTransactions: true, socialSnapshot: true, stableRanking: true, friendRequests: true };
    queueSaveState?.(40);
  } catch {}
  window.HD242 = { refreshSocial, rankRows, socialSnapshot, recoverSocialSnapshot, localWindow };
})();

/* beta 244 — profils amis avec les mêmes bornes locales que le classement */
(() => {
  "use strict";
  if (typeof beta126FetchPublicProfile !== "function") return;
  const previous = beta126FetchPublicProfile;
  beta126FetchPublicProfile = async function beta242FetchPublicProfile(player = {}, options = {}) {
    const playerId = String(player.playerId || (String(player.id || "").startsWith("me-") ? "" : player.id || ""));
    const fcode = typeof normalizeFriendCode === "function" ? normalizeFriendCode(player.friendCode || player.code || "") : String(player.friendCode || player.code || "");
    if (navigator.onLine !== false && (playerId || fcode)) {
      try {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const week = new Date(today);
        const day = week.getDay() || 7;
        week.setDate(week.getDate() - day + 1);
        const year = new Date(now.getFullYear(), 0, 1);
        const end = new Date(today); end.setDate(end.getDate() + 1);
        const params = new URLSearchParams({
          playerId,
          friendCode: fcode,
          viewerPlayerId: playerIdMe(),
          viewerFriendCode: friendCode(),
          dayKey: localDayKey(),
          weekStart: week.toISOString(),
          yearStart: year.toISOString(),
          rangeEnd: end.toISOString(),
          _: String(Date.now())
        });
        const controller = typeof AbortController === "function" ? new AbortController() : null;
        const timer = controller ? setTimeout(() => controller.abort(), 9000) : null;
        const response = await fetch(`/api/v1/friends/profile?${params}`, { cache: "no-store", signal: controller?.signal });
        if (timer) clearTimeout(timer);
        const json = await response.json().catch(() => ({}));
        if (response.ok && json?.ok !== false && json.profile) {
          const normalized = typeof beta126NormalizeRemoteProfile === "function" ? beta126NormalizeRemoteProfile(json.profile) : json.profile;
          normalized.relationship = json.relationship || null;
          if (typeof beta126ProfileCache === "function" && typeof beta126ProfileKey === "function") beta126ProfileCache()[beta126ProfileKey(normalized)] = normalized;
          queueSaveState?.(80);
          if (state.tab === "publicProfile") render?.({ immediate: true });
          return normalized;
        }
      } catch {}
    }
    return previous(player, options);
  };
})();

;

/* ===== SOURCE: visual-v4.js ===== */
/* HistoDaily beta 222 — Visual V4
   Accueil premium : univers actif toujours visible, illustrations contenues,
   composition plus proche d'une application native et aucun effet permanent. */
(function histodailyBeta222VisualV4(){
  "use strict";
  const VERSION = "1.0.0-rc.23.0";
  const esc = value => {
    try { return escapeHtml(String(value ?? "")); }
    catch { return String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[char]); }
  };
  const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
  const safe = (fn, fallback = null) => { try { const value = fn(); return value ?? fallback; } catch { return fallback; } };
  let profileMountGeneration = 0;

  document.documentElement.classList.add("hd220-visual", "hd222-visual", "hd223-visual", "hd224-visual", "hd225-visual", "hd226-visual", "hd227-visual", "hd228-visual", "hd229-visual", "hd230-visual", "hd231-visual", "hd261-visual", "hd266-home", "hd323-visual");

  function disciplineLabel(discipline){
    const labels = { history:"Histoire", art:"Art", cinema:"Cinéma", "science-inventions":"Sciences & inventions", astronomy:"Astronomie", economy:"Économie", geography:"Géographie", music:"Musique", literature:"Littérature", philosophy:"Philosophie", english:"Anglais" };
    return labels[discipline?.id] || discipline?.title || "Explorer";
  }

  function disciplineLessons(id){
    const lessons = safe(() => curatedLessons(), []) || [];
    return lessons.filter(lesson => safe(() => lessonDisciplineId(lesson), "history") === id);
  }

  function lessonTitle(lesson){
    if (!lesson) return "Choisis ton prochain cours";
    const content = safe(() => buildLessonContent(lesson), null);
    return content?.title || lesson.title || "Nouveau cours";
  }

  function lessonMeta(lesson){
    if (!lesson) return "Tout le catalogue reste accessible";
    const world = safe(() => lessonWorld(lesson), null);
    return [world?.title, lesson.period || lesson.location].filter(Boolean).slice(0, 2).join(" · ") || "3 min de lecture";
  }

  function openLesson(lesson, view = "complete"){
    if (!lesson) return;
    const world = safe(() => lessonWorld(lesson), {}) || {};
    const disciplineId = safe(() => lessonDisciplineId(lesson), activeDisciplineId()) || activeDisciplineId();
    setState({
      tab: "lesson",
      currentLessonId: lesson.id,
      currentDiscipline: disciplineId,
      currentWorld: world.id || state.currentWorld,
      currentGroup: world.group || state.currentGroup,
      lessonView: view,
      lessonFocus: null
    });
  }

  function openCatalog(disciplineId){
    const lessons = disciplineLessons(disciplineId);
    const first = lessons[0];
    const world = first ? safe(() => lessonWorld(first), {}) : {};
    setState({
      tab: "learn",
      currentDiscipline: disciplineId,
      currentWorld: world?.id || state.currentWorld,
      currentGroup: world?.group || state.currentGroup,
      learnDrill: "chapters",
      learnFilter: "all",
      learnSearch: ""
    });
  }

  function homeStage(mystery, lesson){
    const solved = Boolean(mystery?.id && safe(() => mysterySolved(mystery.id), false));
    const courseDone = Boolean(lesson?.id && safe(() => lessonRead(lesson.id), false));
    const quizDone = Boolean(lesson?.id && safe(() => lessonQuizPassed(lesson.id), false));
    if (!mystery) return { index:1, type:"catalog", eyebrow:"Exploration libre", title:"Choisis une nouvelle destination", text:"Tous les parcours restent ouverts, même sans dossier quotidien.", action:"Explorer les cours", meta:"Accès libre" };
    if (!solved) return {
      index:1,
      type:"mystery",
      eyebrow:"Problème du jour",
      title:safe(() => mysteryDisplayTitle(mystery), mystery.title || "Le mystère du jour"),
      text:safe(() => mysteryTeaser(mystery), mystery.teaser || mystery.prompt || "Observe les indices et trouve la réponse."),
      action:"Ouvrir l’expédition",
      meta:`+${safe(() => dailyRewardPreview().gems, 1)} gemme aujourd’hui`
    };
    if (lesson && !courseDone) return { index:2, type:"lesson", view:"express", eyebrow:"Cours", title:lessonTitle(lesson), text:"Le problème est résolu. Passe au cours pour comprendre pourquoi cette réponse est juste.", action:"Lire le cours", meta:"Express ou complet" };
    if (lesson && !quizDone) return { index:3, type:"lesson", view:"quiz", eyebrow:"Révision", title:"Vérifie que le raisonnement tient", text:`Cinq questions directement reliées au cours « ${lessonTitle(lesson)} ».`, action:"Commencer la révision", meta:"5 questions" };
    return { index:4, type:lesson ? "lesson" : "mystery", view:"complete", eyebrow:"Parcours terminé", title:"Problème, cours et révision validés", text:lesson ? `Tu as résolu le problème puis validé « ${lessonTitle(lesson)} » par la révision.` : "Le problème du jour est résolu.", action:lesson ? "Revoir le cours" : "Revoir le problème", meta:`Nouveau problème dans ${safe(() => timeToNextDaily(), "quelques heures")}` };
  }

  function cleanDossierTitle(value){
    const cleaned = String(value || "")
      .replace(/\s+à identifier$/i, "")
      .replace(/^Sujet du jour$/i, "Dossier du jour")
      .trim();
    return cleaned || "Dossier du jour";
  }

  function stageForDiscipline(stage){
    return {
      ...stage,
      title: cleanDossierTitle(stage?.title)
    };
  }

  function astronomyJourneyData(resume, discovery){
    return {
      total: 6,
      resumeTitle: resume ? lessonTitle(resume) : "Regarder loin, voir le passé",
      resumeMeta: resume ? lessonMeta(resume) : "Lumière, distance et temps cosmique",
      discoveryTitle: discovery ? lessonTitle(discovery) : "Étoiles, galaxies et trous noirs",
      discoveryMeta: discovery ? lessonMeta(discovery) : "Exploration spatiale",
      progressLabel: "0% exploré"
    };
  }

  function disciplineSelector(activeId){
    return `<nav class="hd220-world-switcher hd222-world-switcher" aria-label="Choisir une discipline">
      ${DISCIPLINES.map(discipline => {
        const active = discipline.id === activeId;
        const lessons = disciplineLessons(discipline.id);
        const done = lessons.filter(lesson => safe(() => lessonDone(lesson.id), false)).length;
        const progress = lessons.length ? Math.round(done / lessons.length * 100) : 0;
        const icon = safe(() => HD_ICONS.rawDiscipline(discipline), "") || safe(() => HD_ICONS.discipline(discipline), discipline.emoji || "•");
        return `<button type="button" class="hd220-world hd222-world ${active ? "active" : ""}" data-hd220-discipline="${esc(discipline.id)}" style="--world:${esc(discipline.accent)}" aria-pressed="${active}" ${active ? 'aria-current="true"' : ""}>
          <span>${icon}</span><b>${esc(disciplineLabel(discipline))}</b><i>${progress}%</i>
        </button>`;
      }).join("")}
    </nav>`;
  }

  function heroArtwork(disciplineId, title = ""){
    if (disciplineId === "astronomy") {
      return `<div class="hd261-discipline-hero hd261-hero-astronomy hd225-astro-hero" role="img" aria-label="Illustration d’un trou noir stylisé">
        <div class="hd261-hero-backdrop"></div>
        <div class="hd225-astro-visual"></div>
        <div class="hd225-astro-overlay"></div>
        <div class="hd225-astro-dust"></div>
      </div>`;
    }
    const uid = `hd222-${String(disciplineId || "world").replace(/[^a-z0-9-]/gi, "")}`;
    const commonStart = `<svg class="hd222-hero-svg" viewBox="0 0 420 320" role="img" aria-label="Illustration ${esc(disciplineLabel(disciplineById(disciplineId)))}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${uid}-stroke" x1="40" y1="40" x2="370" y2="280" gradientUnits="userSpaceOnUse">
          <stop stop-color="#ffffff" stop-opacity=".96"/>
          <stop offset=".34" stop-color="var(--world)" stop-opacity=".98"/>
          <stop offset="1" stop-color="var(--world)" stop-opacity=".42"/>
        </linearGradient>
        <radialGradient id="${uid}-halo" cx="50%" cy="50%" r="50%">
          <stop stop-color="var(--world)" stop-opacity=".22"/>
          <stop offset="1" stop-color="var(--world)" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <g fill="none" stroke="url(#${uid}-stroke)" stroke-linecap="round" stroke-linejoin="round">`;
    const commonEnd = `</g>
      <g fill="var(--world)">
        <circle cx="349" cy="59" r="3" opacity=".78"/>
        <circle cx="373" cy="99" r="2" opacity=".52"/>
        <circle cx="306" cy="44" r="2.5" opacity=".66"/>
      </g>
    </svg>`;

    let drawing = "";
    switch (disciplineId) {
      case "cinema":
        drawing = `
          <circle cx="210" cy="104" r="46" stroke-width="7"/>
          <circle cx="210" cy="104" r="11" stroke-width="6"/>
          <circle cx="195" cy="88" r="7" stroke-width="5"/><circle cx="226" cy="88" r="7" stroke-width="5"/>
          <circle cx="195" cy="120" r="7" stroke-width="5"/><circle cx="226" cy="120" r="7" stroke-width="5"/>
          <circle cx="304" cy="94" r="39" stroke-width="7"/>
          <circle cx="304" cy="94" r="9" stroke-width="6"/>
          <circle cx="291" cy="81" r="6" stroke-width="4.5"/><circle cx="317" cy="81" r="6" stroke-width="4.5"/>
          <circle cx="291" cy="107" r="6" stroke-width="4.5"/><circle cx="317" cy="107" r="6" stroke-width="4.5"/>
          <path d="M175 147h155a18 18 0 0 1 18 18v62a18 18 0 0 1-18 18H175a18 18 0 0 1-18-18v-62a18 18 0 0 1 18-18Z" stroke-width="8"/>
          <path d="M348 170l53-27v83l-53-25" stroke-width="8"/>
          <path d="M226 245v40m-38 0h78" stroke-width="8"/>
          <path d="M76 221h125l12 57H88Z" stroke-width="7"/>
          <path d="M87 221l16-28h104l-6 28M107 193l22 28m21-28l22 28" stroke-width="6"/>
          <path d="M100 247h92" stroke-width="6"/>
          <path d="M355 254c19-5 32-2 42 8" stroke-width="5" opacity=".55"/>`;
        break;
      case "science-inventions":
        drawing = `
          <path d="M231 57h76m-56 0v77l-61 102a25 25 0 0 0 21 38h136a25 25 0 0 0 21-38l-61-102V57" stroke-width="9"/>
          <path d="M211 220c30 14 66-12 96 3 20 10 39 9 58 1" stroke-width="7"/>
          <path d="M244 134h64" stroke-width="7" opacity=".7"/>
          <path d="M85 112v133m40-133v133m40-133v133" stroke-width="8"/>
          <path d="M70 112h110M62 245h127" stroke-width="8"/>
          <path d="M85 201c13 7 27-7 40 0 13 7 27-7 40 0" stroke-width="6"/>
          <ellipse cx="136" cy="71" rx="52" ry="20" stroke-width="5" opacity=".72"/>
          <ellipse cx="136" cy="71" rx="20" ry="52" stroke-width="5" opacity=".72" transform="rotate(55 136 71)"/>
          <ellipse cx="136" cy="71" rx="20" ry="52" stroke-width="5" opacity=".72" transform="rotate(-55 136 71)"/>
          <circle cx="136" cy="71" r="7" fill="var(--world)" stroke="none"/>
          <path d="M330 154c29-8 43-24 47-50M337 173c23 3 40 15 51 36" stroke-width="5" opacity=".52"/>`;
        break;
      case "economy":
        drawing = `
          <path d="M112 127l105-65 105 65" stroke-width="9"/>
          <path d="M130 133h175M143 145v93m42-93v93m64-93v93m42-93v93M122 245h204" stroke-width="8"/>
          <circle cx="105" cy="222" r="58" stroke-width="8"/>
          <path d="M119 192c-23-14-47-2-47 24 0 28 30 40 54 24M70 210h54M70 226h46" stroke-width="7"/>
          <path d="M254 202l32-32 25 18 55-68" stroke-width="9"/>
          <path d="M346 121h29v29" stroke-width="8"/>
          <path d="M244 274h130" stroke-width="6" opacity=".45"/>
          <path d="M275 257v17m30-31v31m30-48v48m30-76v76" stroke-width="8" opacity=".72"/>`;
        break;
      case "art":
        drawing = `
          <path d="M202 53c-82 0-143 54-143 126 0 61 47 108 110 108h28c24 0 38-24 25-43-11-17 1-37 22-37h42c52 0 89-35 89-82 0-59-74-72-173-72Z" stroke-width="9"/>
          <circle cx="132" cy="137" r="14" stroke-width="7"/>
          <circle cx="186" cy="101" r="14" stroke-width="7"/>
          <circle cx="247" cy="116" r="14" stroke-width="7"/>
          <circle cx="295" cy="157" r="14" stroke-width="7"/>
          <path d="M286 270c18-52 44-94 86-137" stroke-width="11"/>
          <path d="M337 183l38 33" stroke-width="14"/>
          <path d="M89 252c41-26 87-25 133 3" stroke-width="5" opacity=".48"/>`;
        break;
      case "geography":
        drawing = `
          <circle cx="224" cy="163" r="112" stroke-width="8"/>
          <path d="M112 163h224M224 51c45 53 45 171 0 224M224 51c-45 53-45 171 0 224" stroke-width="6" opacity=".76"/>
          <path d="M137 104c48 27 126 27 174 0M137 222c48-27 126-27 174 0" stroke-width="5" opacity=".54"/>
          <path d="M339 77c38 0 69 31 69 69 0 51-69 111-69 111s-69-60-69-111c0-38 31-69 69-69Z" stroke-width="8"/>
          <circle cx="339" cy="146" r="24" stroke-width="7"/>
          <path d="M74 271c74-30 151-31 230-4" stroke-width="5" opacity=".42"/>`;
        break;
      case "music":
        drawing = `
          <circle cx="157" cy="169" r="94" stroke-width="8"/>
          <circle cx="157" cy="169" r="23" stroke-width="8"/>
          <circle cx="157" cy="169" r="58" stroke-width="4" opacity=".42"/>
          <path d="M277 73v130a34 34 0 1 1-22-32V97l94-24v106a34 34 0 1 1-22-32V91" stroke-width="9"/>
          <path d="M63 280c68-22 136-22 204 0" stroke-width="5" opacity=".42"/>`;
        break;
      case "literature":
        drawing = `
          <path d="M82 86c54-18 100-8 140 25v145c-40-29-86-39-140-21Z" stroke-width="8"/>
          <path d="M362 86c-54-18-100-8-140 25v145c40-29 86-39 140-21Z" stroke-width="8"/>
          <path d="M222 111v145" stroke-width="6" opacity=".72"/>
          <path d="M105 126c31-8 61-3 91 14M105 156c31-8 61-3 91 14M105 186c31-8 61-3 91 14" stroke-width="5" opacity=".55"/>
          <path d="M338 126c-31-8-61-3-91 14M338 156c-31-8-61-3-91 14" stroke-width="5" opacity=".55"/>
          <path d="M305 46c-37 16-58 47-63 92 30-9 57-28 76-59 8-13 4-26-13-33Z" stroke-width="7"/>
          <path d="M248 137c16-27 36-48 61-64" stroke-width="6"/>
          <path d="M75 273c92-24 190-24 294 0" stroke-width="5" opacity=".42"/>`;
        break;
      case "history":
      default: {
        const nautical = /navire|bateau|viking|drakkar|mer|frontière/i.test(String(title));
        drawing = nautical ? `
          <path d="M72 214c58 31 176 36 273 4-17 44-71 72-143 72-69 0-113-27-130-76Z" stroke-width="9"/>
          <path d="M202 58v157M202 67l107 75H202" stroke-width="8"/>
          <path d="M202 82l-86 68h86" stroke-width="8" opacity=".78"/>
          <path d="M95 220V113l-24-27M309 220V113l24-27" stroke-width="7"/>
          <path d="M70 214h284" stroke-width="7"/>
          <path d="M105 247c29 13 56 13 84 0 29 13 57 13 85 0 29 13 57 13 85 0" stroke-width="5" opacity=".55"/>`
        : `
          <path d="M92 259h245M111 241h207M127 224V122m48 102V122m68 102V122m48 102V122" stroke-width="9"/>
          <path d="M111 110h207M126 91l88-46 89 46" stroke-width="9"/>
          <path d="M88 276h253" stroke-width="7" opacity=".54"/>
          <circle cx="345" cy="79" r="28" stroke-width="5" opacity=".55"/>`;
      }
    }
    return `<div class="hd261-discipline-hero hd261-hero-${esc(String(disciplineId || "history"))}" role="img" aria-label="Illustration ${esc(disciplineLabel(disciplineById(disciplineId)))}"><div class="hd261-hero-backdrop"></div>${commonStart}${drawing}${commonEnd}<div class="hd261-hero-shine"></div></div>`;
  }

  function expeditionRoute(index){
    const labels = ["Problème", "Cours", "Révision"];
    return `<div class="hd220-route" aria-label="Parcours du jour">
      ${labels.map((label, i) => {
        const step = i + 1;
        const status = step < index ? "done" : step === index ? "current" : "future";
        return `<div class="${status}" ${status === "current" ? 'aria-current="step"' : ""}><span>${step < index ? "✓" : step}</span><b>${esc(label)}</b></div>`;
      }).join("")}
    </div>`;
  }

  function renderHomeV3(){
    const disciplineId = activeDisciplineId();
    const discipline = disciplineById(disciplineId);
    const mystery = safe(() => dailyMystery(), null);
    const linkedLesson = mystery?.lessonId ? safe(() => lessonById(mystery.lessonId), null) : null;
    const stage = homeStage(mystery, linkedLesson);
    const stageView = stageForDiscipline(stage, disciplineId);
    const lessons = disciplineLessons(disciplineId);
    const completed = lessons.filter(lesson => safe(() => lessonDone(lesson.id), false)).length;
    const progress = lessons.length ? Math.round(completed / lessons.length * 100) : 0;
    const unfinished = lessons.filter(lesson => !safe(() => lessonDone(lesson.id), false) && String(lesson.id) !== String(linkedLesson?.id || ""));
    const resume = unfinished[0] || lessons[0] || null;
    const pseudo = String(state.pseudo || "").trim();
    const greeting = pseudo && !/^invité$/i.test(pseudo) ? `Salut ${pseudo}` : "Bonjour";
    const homeStreak = Math.max(0, Number(safe(() => currentStreakValue(), state.streak || 0)) || 0);
    const heroIcon = safe(() => HD_ICONS.discipline(discipline), discipline.emoji || "✦");
    const routeIndex = Math.min(3, Math.max(1, Number(stageView.index || 1)));
    const routeLabels = ["Expédition", "Cours", "Quiz"];
    const actionLabel = stageView.type === "mystery" ? "Continuer l’expédition" : stageView.action;

    document.documentElement.classList.add("hd300-clarity");
    renderShell(`<div class="hd220-home hd222-home hd300-home" style="--world:${esc(discipline.accent)}">
      <header class="hd220-home-head hd222-home-head hd300-home-head">
        <div class="hd220-brand"><span>HistoDaily</span><h1>${esc(greeting)}</h1></div>
        <div class="hd220-head-metrics"><button type="button" data-hd220-profile aria-label="Ouvrir le profil"><span>🔥</span><b>${homeStreak}</b></button><button type="button" data-hd220-profile aria-label="Ouvrir le profil, niveau ${level()}"><span>Niv.</span><b>${level()}</b></button></div>
      </header>

      <section class="hd300-today" aria-labelledby="hd300-today-title">
        <div class="hd300-today-head"><span>Aujourd’hui · 3 à 5 min</span><small>${routeIndex}/3</small></div>
        <div class="hd300-today-copy">
          <div class="hd300-today-icon">${heroIcon}</div>
          <div><p>${esc(stageView.eyebrow)}</p><h2 id="hd300-today-title">${esc(stageView.title)}</h2><span>${esc(stageView.text)}</span></div>
        </div>
        <button type="button" class="hd300-primary" data-hd220-expedition><span>${esc(actionLabel)}</span><b>→</b></button>
        <div class="hd300-daily-route" aria-label="Parcours du jour">
          ${routeLabels.map((label, index) => { const step = index + 1; const status = step < routeIndex || stageView.index > 3 ? "done" : step === routeIndex ? "current" : "future"; return `<div class="${status}"><i>${status === "done" ? "✓" : step}</i><span>${label}</span></div>`; }).join("")}
        </div>
        ${linkedLesson && routeIndex === 1 ? `<p class="hd310-after-today"><span>Ensuite</span>${esc(lessonTitle(linkedLesson))}</p>` : ""}
      </section>

      <button type="button" class="hd310-path-card" data-hd220-catalog>
        <div><small>Parcours ${esc(disciplineLabel(discipline))}</small><strong>${completed}/${lessons.length || 0} cours terminés</strong></div>
        <div class="hd310-path-progress" aria-label="${progress}% du parcours"><i style="width:${clamp(progress,0,100)}%"></i></div>
        <span aria-hidden="true">→</span>
      </button>

      <details class="hd300-universes hd310-universes">
        <summary><span>Univers</span><b>${esc(disciplineLabel(discipline))}</b><em>Changer</em></summary>
        ${disciplineSelector(disciplineId)}
      </details>
    </div>`);

    const shell = document.querySelector(".app-shell.tab-home");
    shell?.classList.add("hd220-home-shell", "hd222-home-shell", "hd300-home-shell");
    if (shell) shell.dataset.hd187Enhanced = "1";

    shell?.querySelectorAll("[data-hd220-discipline]").forEach(button => button.addEventListener("click", () => {
      const nextId = button.dataset.hd220Discipline;
      if (typeof switchHomeDiscipline === "function") return switchHomeDiscipline(nextId);
      const first = disciplineLessons(nextId)[0];
      const world = first ? safe(() => lessonWorld(first), {}) : {};
      const nextMystery = typeof mysteryForDisciplineDayOffset === "function" ? mysteryForDisciplineDayOffset(nextId, 0) : null;
      setState({ currentDiscipline: nextId, currentWorld: world?.id || state.currentWorld, currentGroup: world?.group || state.currentGroup, currentMysteryId: nextMystery?.id || null, currentMysteryDiscipline: nextId });
    }));
    shell?.querySelectorAll("[data-hd220-profile]").forEach(button => button.addEventListener("click", () => setState({ tab:"profile" })));
    shell?.querySelector("[data-hd220-catalog]")?.addEventListener("click", () => openCatalog(disciplineId));
    shell?.querySelector("[data-hd220-expedition]")?.addEventListener("click", () => {
      if (stageView.type === "mystery") return setState({ tab:"mystery", currentMysteryId:mystery?.id || null, currentMysteryDiscipline:disciplineId, currentDiscipline:disciplineId });
      if (stageView.type === "lesson" && linkedLesson) return openLesson(linkedLesson, stageView.view || "complete");
      if (stageView.type === "catalog") return openCatalog(disciplineId);
      if (linkedLesson) return openLesson(linkedLesson, stageView.view || "complete");
      return setState({ tab:"mystery" });
    });
    shell?.querySelectorAll("[data-hd220-open-lesson]").forEach(card => {
      const launch = () => {
        const id = card.dataset.hd220OpenLesson;
        const lesson = id ? safe(() => lessonById(id), null) : null;
        lesson ? openLesson(lesson, "complete") : openCatalog(disciplineId);
      };
      card.addEventListener("click", launch);
      card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); launch(); } });
    });
  }

  function initials(name){
    const parts = String(name || "Invité").trim().split(/\s+/).filter(Boolean);
    return (parts.slice(0,2).map(part => part[0]).join("") || "H").toUpperCase();
  }

  function extractCollections(shell){
    return [...shell.querySelectorAll(".beta179-profile-collections .beta179-collection-card")].slice(0, 6).map(card => ({
      icon: card.querySelector(".beta179-medal")?.innerHTML || safe(() => HD_ICONS.action("lock"), "◆"),
      title: card.querySelector("h3")?.textContent?.trim() || "Collection",
      meta: card.querySelector("small")?.textContent?.trim() || "À explorer",
      progress: parseFloat(card.querySelector(".beta179-mini-progress i")?.style?.width || "0") || 0,
      unlocked: card.classList.contains("unlocked"),
      accent: card.style.getPropertyValue("--collection-accent") || "#f6c453"
    }));
  }

  function extractAchievements(shell){
    return [...shell.querySelectorAll(".achievement-grid .achievement")].slice(0, 8).map(card => ({
      icon: card.querySelector("b")?.innerHTML || "✦",
      label: card.querySelector("span")?.textContent?.trim() || "Succès",
      unlocked: card.classList.contains("on")
    }));
  }

  function extractMastery(shell){
    return [...shell.querySelectorAll(".beta179-profile-mastery .beta179-mastery-row")].slice(0, 4).map(row => ({
      icon: row.querySelector(":scope > span")?.innerHTML || "•",
      title: row.querySelector("strong")?.textContent?.trim() || "Domaine",
      score: parseFloat(row.querySelector("b")?.textContent || "0") || 0,
      accent: row.style.getPropertyValue("--mastery-accent") || "#56d6ff"
    }));
  }

  function curiosityModel(){
    const data = safe(() => window.HistoDaily?.conceptDebug?.curiosityData?.(), null) || {};
    const favorites = (data.favorites || []).slice(0, 3);
    const fallback = DISCIPLINES.slice(0, 3).map(discipline => ({ discipline, completed:0, reviews:0 }));
    return {
      favorites: favorites.length ? favorites : fallback,
      weak: data.weak || null,
      unexplored: data.unexplored || null
    };
  }

  function mountProfileV3(){
    const shell = document.querySelector(".app-shell.tab-profile");
    if (!shell) return;
    shell.classList.add("hd220-profile-shell");
    const collections = extractCollections(shell);
    const achievements = extractAchievements(shell);
    const mastery = extractMastery(shell);
    const curiosity = curiosityModel();
    const name = String(state.pseudo || "Invité").trim() || "Invité";
    const xp = Number(state.xp || 0);
    const currentLevel = level();
    const base = Math.max(0, (currentLevel - 1) * 250);
    const next = Math.max(base + 250, currentLevel * 250);
    const levelPct = clamp(Math.round((xp - base) / Math.max(1, next - base) * 100), 3, 100);
    const solved = Object.keys(state.solvedMysteries || {}).length;
    const completed = safe(() => curatedLessons().filter(lesson => lessonDone(lesson.id)).length, 0);
    const fav = curiosity.favorites[0]?.discipline || disciplineById(activeDisciplineId());
    const weak = curiosity.weak?.discipline || fav;
    const nextDisc = curiosity.unexplored?.discipline || curiosity.favorites[1]?.discipline || DISCIPLINES.find(item => item.id !== fav.id) || fav;
    let root = shell.querySelector(".hd220-profile");
    if (!root) {
      root = document.createElement("div");
      root.className = "hd220-profile";
      const status = shell.querySelector(":scope > .system-status, :scope > .beta115-status");
      if (status) status.insertAdjacentElement("afterend", root); else shell.insertAdjacentElement("afterbegin", root);
    }
    root.style.setProperty("--world", fav.accent || "#f6c453");
    root.innerHTML = `
      <header class="hd220-profile-head"><div><span>Espace joueur</span><h1>Ton profil</h1></div><button type="button" data-hd220-edit-profile>Modifier</button></header>
      <section class="hd220-player-hero">
        <div class="hd220-avatar-ring" style="--level:${levelPct * 3.6}deg"><div>${esc(initials(name))}</div></div>
        <div class="hd220-player-copy"><span>Explorateur · Niveau ${currentLevel}</span><h2>${esc(name)}</h2><p>Ton parcours de curiosité se construit à chaque cours.</p></div>
        <div class="hd220-player-stats"><div><b>${xp}</b><span>XP</span></div><div><b>${state.streak || 0}</b><span>Série</span></div><div><b>${solved}</b><span>Mystères</span></div></div>
        <div class="hd220-xp"><div><span>Niveau ${currentLevel}</span><b>${levelPct}%</b></div><i><em style="width:${levelPct}%"></em></i></div>
      </section>

      <section class="hd220-curiosity-v3">
        <div class="hd220-section-cap"><span>Carte de curiosité</span><button type="button" data-hd220-map>Ouvrir la carte</button></div>
        <div class="hd220-constellation">
          <div class="hd220-orbit one"></div><div class="hd220-orbit two"></div>
          <div class="hd220-you"><b>${esc(initials(name))}</b><span>Toi</span></div>
          <article class="hd220-star favorite" style="--star:${esc(fav.accent)}"><span>${safe(() => HD_ICONS.discipline(fav), fav.emoji || "✦")}</span><small>Affinité</small><b>${esc(disciplineLabel(fav))}</b></article>
          <article class="hd220-star memory" style="--star:${esc(weak.accent)}"><span>${safe(() => HD_ICONS.discipline(weak), weak.emoji || "↻")}</span><small>À renforcer</small><b>${esc(disciplineLabel(weak))}</b></article>
          <article class="hd220-star discovery" style="--star:${esc(nextDisc.accent)}"><span>${safe(() => HD_ICONS.discipline(nextDisc), nextDisc.emoji || "◇")}</span><small>Prochaine piste</small><b>${esc(disciplineLabel(nextDisc))}</b></article>
        </div>
      </section>

      <section class="hd220-collection-v3">
        <div class="hd220-section-cap"><div><span>Collections</span><h2>Tes trophées d’exploration</h2></div><button type="button" data-hd220-all-collections>Tout voir</button></div>
        <div class="hd220-collection-rail">
          ${(collections.length ? collections : [{icon:"◇",title:"Première collection",meta:"Commence un parcours",progress:0,unlocked:false,accent:"#f6c453"}]).map(item => `<article class="hd220-medal-card ${item.unlocked ? "unlocked" : ""}" style="--medal:${esc(item.accent)}">
            <div class="hd220-medal-icon">${item.icon}</div><small>${item.unlocked ? "Débloquée" : "En progression"}</small><h3>${esc(item.title)}</h3><i><em style="width:${clamp(item.progress, 0, 100)}%"></em></i><p>${esc(item.meta)}</p>
          </article>`).join("")}
        </div>
      </section>

      <section class="hd220-progress-v3">
        <div class="hd220-section-cap"><div><span>Maîtrise</span><h2>Ce qui devient solide</h2></div><button type="button" data-hd220-review>Réviser</button></div>
        <div class="hd220-mastery-grid">
          ${(mastery.length ? mastery : DISCIPLINES.slice(0,4).map(discipline => ({icon:HD_ICONS.discipline(discipline),title:disciplineLabel(discipline),score:0,accent:discipline.accent}))).map(item => `<article style="--mastery:${esc(item.accent)}"><div class="hd220-score-ring" style="--score:${clamp(item.score,0,100) * 3.6}deg"><span>${item.icon}</span></div><div><b>${esc(item.title)}</b><small>${Math.round(item.score)}% maîtrisé</small></div></article>`).join("")}
        </div>
      </section>

      <section class="hd220-achievements-v3">
        <div class="hd220-section-cap"><div><span>Succès</span><h2>Étapes marquantes</h2></div><b>${achievements.filter(item => item.unlocked).length}/${achievements.length || 6}</b></div>
        <div class="hd220-badge-rail">${(achievements.length ? achievements : [{icon:"✦",label:"Première victoire",unlocked:false}]).map(item => `<article class="${item.unlocked ? "on" : "off"}"><div>${item.icon}</div><span>${esc(item.label)}</span></article>`).join("")}</div>
      </section>

      <section class="hd220-profile-summary"><div><b>${completed}</b><span>Cours validés</span></div><div><b>${collections.filter(item => item.unlocked).length}</b><span>Collections</span></div><div><b>${Object.values(state.achievements || {}).filter(Boolean).length}</b><span>Succès</span></div></section>
    `;

    // Tout l’ancien profil reste disponible dans les volets utiles, mais les
    // anciennes cartes de premier niveau ne doivent jamais apparaître derrière
    // la V3. Le marquage JS complète la règle CSS générique.
    [...shell.children].forEach(node => {
      if (node === root || node.matches?.(".system-status,.beta115-status,.beta182-profile-fold,.bottom-nav")) return;
      node.classList.add("hd220-legacy-hidden");
    });
    shell.dataset.hd220ProfileReady = "1";

    const legacySelectors = [
      ":scope > .topbar", ":scope > .public-profile-card", ":scope > .discipline-wheel", ":scope > .hd187-curiosity-card", ":scope > .hd217-curiosity-card",
      ":scope > .beta179-profile-collections", ":scope > .beta181-weekly-card", ":scope > .beta179-profile-mastery", ":scope > .culture-profile-card", ":scope > .achievement-grid"
    ];
    legacySelectors.forEach(selector => shell.querySelectorAll(selector).forEach(node => node.classList.add("hd220-legacy-hidden")));

    const openFold = id => {
      const fold = shell.querySelector(`[data-beta182-fold="${id}"]`);
      if (!fold) return;
      fold.open = true;
      fold.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    root.querySelector("[data-hd220-edit-profile]")?.addEventListener("click", () => openFold("social"));
    root.querySelector("[data-hd220-map]")?.addEventListener("click", () => {
      const action = window.HistoDaily?.conceptDebug?.openKnowledgeMap;
      if (typeof action === "function") action(); else openCatalog(activeDisciplineId());
    });
    root.querySelector("[data-hd220-all-collections]")?.addEventListener("click", () => {
      const old = shell.querySelector("[data-beta180-collections-all]");
      old ? old.click() : openCatalog(activeDisciplineId());
    });
    root.querySelector("[data-hd220-review]")?.addEventListener("click", () => {
      const old = shell.querySelector("[data-beta179-review]");
      old ? old.click() : openCatalog(activeDisciplineId());
    });
  }

  const previousRenderProfile = typeof renderProfile === "function" ? renderProfile : null;
  if (previousRenderProfile) {
    renderProfile = function beta221RenderProfile(){
      const generation = ++profileMountGeneration;
      const result = previousRenderProfile();
      // Montage immédiat, puis une seule vérification au prochain frame.
      // L’ancienne triple temporisation reconstruisait le DOM plusieurs fois.
      mountProfileV3();
      window.requestAnimationFrame?.(() => {
        if (generation === profileMountGeneration && state?.tab === "profile") mountProfileV3();
      });
      return result;
    };
  }

  renderHome = renderHomeV3;

  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version:VERSION, visualV3:true, visualV3Home:true, visualV3Profile:true, visualV4:true, visualV4Home:true };
  } catch {}

  try {
    window.setTimeout(() => {
      if (state?.tab === "home") render({ immediate:true });
      else if (state?.tab === "profile") mountProfileV3();
    }, 0);
  } catch {}
})();

;

/* ===== SOURCE: engagement-v263.js ===== */
/* HistoDaily beta 264 — finite daily engagement loop
   A clear daily objective, weekly rhythm and a small collectible reward.
   No infinite feed, no autoplay and no social engine changes. */
(function histodailyEngagement263(){
  "use strict";

  const VERSION = "1.0.0-beta.271.0";
  const STORAGE_KEY = "histodaily.engagement.v263";
  let mountTimer = null;
  let previousSignature = "";

  const safe = (fn, fallback = null) => {
    try {
      const value = fn();
      return value == null ? fallback : value;
    } catch {
      return fallback;
    }
  };
  const esc = value => {
    try { return escapeHtml(String(value ?? "")); }
    catch { return String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[char]); }
  };
  const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));

  function dateKey(date = new Date()){
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function offsetDateKey(offset){
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + offset);
    return dateKey(date);
  }

  function readStore(){
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {
        capsules: parsed && typeof parsed.capsules === "object" ? parsed.capsules : {},
        lastCelebrated: String(parsed?.lastCelebrated || "")
      };
    } catch {
      return { capsules: {}, lastCelebrated: "" };
    }
  }

  function writeStore(store){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(store)); } catch {}
  }

  function disciplineName(id){
    const map = {
      history: "Histoire",
      art: "Art",
      cinema: "Cinéma",
      "science-inventions": "Sciences",
      astronomy: "Astronomie",
      economy: "Économie",
      geography: "Géographie",
      music: "Musique",
      literature: "Littérature",
      philosophy: "Philosophie",
      english: "Anglais"
    };
    return map[id] || "Culture";
  }

  function capsuleName(id){
    const map = {
      history: "Fragment de chronologie",
      art: "Éclat de palette",
      cinema: "Photogramme rare",
      "science-inventions": "Étincelle d’invention",
      astronomy: "Poussière d’étoile",
      economy: "Jeton d’échange",
      geography: "Éclat de carte",
      music: "Note suspendue",
      philosophy: "Éclat d’argument",
      english: "Éclat de nuance",
      literature: "Page enluminée"
    };
    return map[id] || "Éclat de curiosité";
  }

  function capsuleIcon(id){
    const map = {
      history: "⌛",
      art: "✦",
      cinema: "◫",
      "science-inventions": "⚡",
      astronomy: "✺",
      economy: "◇",
      geography: "⌖",
      music: "♪",
      literature: "▤"
    };
    return map[id] || "✦";
  }

  function hash(text){
    let value = 2166136261;
    for (const char of String(text || "")) {
      value ^= char.charCodeAt(0);
      value = Math.imul(value, 16777619);
    }
    return Math.abs(value >>> 0);
  }

  function lessonInfo(lesson){
    if (!lesson) return null;
    const disciplineId = safe(() => lessonDisciplineId(lesson), safe(() => activeDisciplineId(), "history"));
    const world = safe(() => lessonWorld(lesson), {}) || {};
    const content = safe(() => buildLessonContent(lesson), null);
    return {
      id: String(lesson.id || ""),
      title: content?.title || lesson.title || "Cours du jour",
      disciplineId,
      worldId: world.id || "",
      groupId: world.group || ""
    };
  }

  function bonusLesson(disciplineId, linkedLessonId){
    const lessons = safe(() => curatedLessons(), []) || [];
    const candidates = lessons.filter(lesson => {
      const sameDiscipline = safe(() => lessonDisciplineId(lesson), "history") === disciplineId;
      const notLinked = String(lesson.id || "") !== String(linkedLessonId || "");
      const notDone = !safe(() => lessonDone(lesson.id), false);
      return sameDiscipline && notLinked && notDone;
    });
    const fallback = lessons.filter(lesson => safe(() => lessonDisciplineId(lesson), "history") === disciplineId && String(lesson.id || "") !== String(linkedLessonId || ""));
    const pool = candidates.length ? candidates : fallback;
    if (!pool.length) return null;
    return pool[hash(`${dateKey()}-${disciplineId}`) % pool.length];
  }

  function missionData(){
    const disciplineId = safe(() => activeDisciplineId(), safe(() => state.currentDiscipline, "history")) || "history";
    const mystery = safe(() => dailyMystery(), null);
    const lesson = mystery?.lessonId ? safe(() => lessonById(mystery.lessonId), null) : null;
    const problemDone = Boolean(mystery?.id && safe(() => mysterySolved(mystery.id), false));
    const lessonDoneNow = Boolean(lesson?.id && safe(() => lessonRead(lesson.id), false));
    const quizDone = Boolean(lesson?.id && safe(() => lessonQuizPassed(lesson.id), false));
    const steps = [
      { key: "mystery", label: "Résoudre", detail: mystery ? "Le dossier du jour" : "Choisir un dossier", done: problemDone, unlocked: Boolean(mystery) },
      { key: "lesson", label: "Comprendre", detail: lesson ? "Lire le cours lié" : "Explorer un cours", done: lessonDoneNow, unlocked: Boolean(lesson && problemDone) },
      { key: "quiz", label: "Retenir", detail: lesson ? "Révision en 5 questions" : "Valider les acquis", done: quizDone, unlocked: Boolean(lesson && lessonDoneNow) }
    ];
    const done = steps.filter(step => step.done).length;
    const next = steps.find(step => !step.done) || null;
    const linked = lessonInfo(lesson);
    const bonus = lessonInfo(bonusLesson(disciplineId, lesson?.id));
    return { disciplineId, mystery, lesson, linked, bonus, steps, done, complete: done === steps.length, next };
  }

  function weeklyData(){
    const labels = ["L", "M", "M", "J", "V", "S", "D"];
    return Array.from({ length: 7 }, (_, index) => {
      const offset = index - 6;
      const key = offsetDateKey(offset);
      const date = new Date();
      date.setHours(12, 0, 0, 0);
      date.setDate(date.getDate() + offset);
      const claim = safe(() => state.dailyHistory?.[key] || state.dailyClaims?.[key], null);
      return {
        key,
        label: labels[(date.getDay() + 6) % 7],
        done: Boolean(claim),
        today: offset === 0
      };
    });
  }

  function nextMilestone(){
    const streak = Math.max(0, Number(safe(() => currentStreakValue(), state.streak || 0)) || 0);
    const milestones = [3, 7, 14, 30, 60, 100, 180, 365];
    const target = milestones.find(value => value > streak) || (Math.ceil((streak + 1) / 100) * 100);
    const previous = [...milestones].reverse().find(value => value <= streak) || 0;
    const progress = target > previous ? ((streak - previous) / (target - previous)) * 100 : 100;
    return { streak, target, remaining: Math.max(0, target - streak), progress: clamp(progress, 0, 100) };
  }

  function maybeUnlockCapsule(data){
    if (!data.complete) return { unlocked: false, count: Object.keys(readStore().capsules).length };
    const key = dateKey();
    const store = readStore();
    let unlocked = false;
    if (!store.capsules[key]) {
      store.capsules[key] = {
        disciplineId: data.disciplineId,
        name: capsuleName(data.disciplineId),
        at: Date.now()
      };
      unlocked = true;
    }
    const celebrate = unlocked || store.lastCelebrated !== key;
    if (celebrate) store.lastCelebrated = key;
    writeStore(store);
    return { unlocked: celebrate, count: Object.keys(store.capsules).length };
  }

  function nextAction(data){
    if (!data.next) return data.bonus ? { action: "bonus", label: "Prolonger 3 minutes", detail: data.bonus.title } : { action: "catalog", label: "Explorer librement", detail: "Choisir un nouveau sujet" };
    if (data.next.key === "mystery") return { action: "mystery", label: "Commencer maintenant", detail: "Résoudre le dossier du jour" };
    if (data.next.key === "lesson") return { action: "lesson", label: "Continuer l’expédition", detail: data.linked?.title || "Lire le cours associé" };
    return { action: "quiz", label: "Boucler l’expédition", detail: "Faire la révision finale" };
  }

  function stepMarkup(step, index){
    const stateClass = step.done ? "done" : step.unlocked ? "current" : "locked";
    const icon = step.done ? "✓" : index + 1;
    return `<button type="button" class="hd263-step ${stateClass}" data-hd263-action="${esc(step.key)}" ${step.unlocked || step.done ? "" : "disabled"} aria-label="${esc(step.label)} : ${step.done ? "terminé" : step.unlocked ? "disponible" : "verrouillé"}">
      <span>${icon}</span><div><b>${esc(step.label)}</b><small>${esc(step.detail)}</small></div>
    </button>`;
  }

  function renderMarkup(data, reward){
    const week = weeklyData();
    const weekDone = week.filter(day => day.done).length;
    const milestone = nextMilestone();
    const pct = Math.round(data.done / data.steps.length * 100);
    const capsuleLabel = capsuleName(data.disciplineId);
    const remaining = data.steps.length - data.done;
    const completeCopy = data.complete
      ? `Mission terminée. Ton ${capsuleLabel.toLowerCase()} rejoint ta collection.`
      : data.done === 0
        ? "Le dossier, le cours, puis cinq questions : environ dix minutes."
        : `Encore ${remaining} étape${remaining > 1 ? "s" : ""} pour fermer la boucle du jour.`;

    return `<section class="hd263-engagement ${data.complete ? "is-complete" : ""}" style="--hd263-progress:${pct}%" aria-label="Rythme quotidien">
      <header class="hd263-head">
        <div><span class="card-label">Ton rythme</span><h2>${data.complete ? "Boucle du jour terminée" : "Garde l’élan"}</h2><p>${esc(completeCopy)}</p></div>
        <div class="hd263-score" aria-label="${data.done} étapes sur ${data.steps.length}"><strong>${data.done}/${data.steps.length}</strong><small>étapes</small></div>
      </header>

      <div class="hd263-progress" aria-hidden="true"><i></i></div>

      <div class="hd263-footer">
        <div class="hd263-week"><div><small>7 derniers jours</small><b>${weekDone}/7</b></div><span>${week.map(day => `<i class="${day.done ? "done" : ""} ${day.today ? "today" : ""}" title="${esc(day.key)}"><em>${day.label}</em></i>`).join("")}</span></div>
        <div class="hd263-milestone"><div><small>Prochain palier</small><b>${milestone.target} jours</b></div><span><i style="width:${milestone.progress}%"></i></span><em>${milestone.remaining} jour${milestone.remaining > 1 ? "s" : ""} à tenir</em></div>
        <div class="hd263-capsule ${data.complete ? "earned" : ""}"><span>${capsuleIcon(data.disciplineId)}</span><div><small>${data.complete ? "Capsule obtenue" : "À débloquer aujourd’hui"}</small><b>${esc(capsuleLabel)}</b><em>${reward.count} collectionnée${reward.count > 1 ? "s" : ""}</em></div></div>
      </div>

      ${data.complete ? `<button type="button" class="hd263-main-action" data-hd263-action="${data.bonus ? "bonus" : "catalog"}">
        <span>${capsuleIcon(data.disciplineId)}</span>
        <div><small>Bonus facultatif</small><b>${data.bonus ? "Une dernière découverte" : "Explorer librement"}</b><em>${esc(data.bonus?.title || "Choisir un nouveau sujet")}</em></div>
        <strong>3 min</strong>
      </button>` : ""}
    </section>`;
  }

  function openLessonByInfo(info, view){
    if (!info?.id) return false;
    setState({
      tab: "lesson",
      currentLessonId: info.id,
      currentDiscipline: info.disciplineId || safe(() => activeDisciplineId(), "history"),
      currentWorld: info.worldId || safe(() => state.currentWorld, ""),
      currentGroup: info.groupId || safe(() => state.currentGroup, ""),
      lessonView: view,
      lessonFocus: null
    });
    return true;
  }

  function celebrate(root, data){
    root.classList.add("just-completed");
    safe(() => window.HDSound?.play?.("complete", { force: true }));
    const toast = document.createElement("div");
    toast.className = "hd263-toast";
    toast.innerHTML = `<span>${capsuleIcon(data.disciplineId)}</span><div><b>Mission du jour terminée</b><small>${esc(capsuleName(data.disciplineId))} ajouté à ta collection</small></div>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    window.setTimeout(() => {
      toast.classList.remove("show");
      window.setTimeout(() => toast.remove(), 260);
    }, 2900);
  }

  function mount(){
    const expedition = document.querySelector(".app-shell.tab-home .hd222-expedition");
    if (!expedition) return;
    const data = missionData();
    const reward = maybeUnlockCapsule(data);
    const signature = JSON.stringify({
      mystery: data.mystery?.id || "",
      discipline: data.disciplineId,
      done: data.done,
      streak: safe(() => currentStreakValue(), state.streak || 0),
      day: dateKey(),
      capsuleCount: reward.count
    });
    let root = expedition.parentElement?.querySelector(":scope > .hd263-engagement");
    if (root && signature === previousSignature) return;
    const holder = document.createElement("div");
    holder.innerHTML = renderMarkup(data, reward).trim();
    const nextRoot = holder.firstElementChild;
    if (!nextRoot) return;
    if (root) root.replaceWith(nextRoot);
    else expedition.insertAdjacentElement("afterend", nextRoot);
    previousSignature = signature;
    if (reward.unlocked) window.setTimeout(() => celebrate(nextRoot, data), 120);
  }

  function scheduleMount(){
    if (mountTimer) return;
    mountTimer = window.setTimeout(() => {
      mountTimer = null;
      mount();
    }, 32);
  }

  document.addEventListener("click", event => {
    const button = event.target.closest?.("[data-hd263-action]");
    if (!button || button.disabled) return;
    const data = missionData();
    const action = button.dataset.hd263Action;
    safe(() => window.HDSound?.play?.(action === "mystery" ? "launch" : "nav"));
    if (action === "mystery") {
      setState({ tab: "mystery", currentMysteryId: data.mystery?.id || null, currentMysteryDiscipline: data.disciplineId, currentDiscipline: data.disciplineId });
      return;
    }
    if (action === "lesson") {
      if (!openLessonByInfo(data.linked, "express")) setState({ tab: "learn", currentDiscipline: data.disciplineId });
      return;
    }
    if (action === "quiz") {
      if (!openLessonByInfo(data.linked, "quiz")) setState({ tab: "learn", currentDiscipline: data.disciplineId });
      return;
    }
    if (action === "bonus") {
      if (!openLessonByInfo(data.bonus, "express")) setState({ tab: "learn", currentDiscipline: data.disciplineId });
      return;
    }
    if (action === "catalog") setState({ tab: "learn", currentDiscipline: data.disciplineId, learnDrill: "chapters", learnFilter: "all", learnSearch: "" });
  }, true);

  const observer = new MutationObserver(scheduleMount);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) scheduleMount(); });
  window.addEventListener("focus", scheduleMount);
  window.setInterval(() => {
    const current = document.querySelector(".app-shell.tab-home .hd263-engagement");
    if (current) scheduleMount();
  }, 60000);

  document.documentElement.classList.add("hd263-engagement-ready");
  window.HDEngagement = Object.freeze({ VERSION, mount, missionData, weeklyData, readStore });
  scheduleMount();
})();

;

/* ===== SOURCE: mobile-layout.js ===== */
/* HistoDaily beta 254 — réparations de mise en page uniquement, sans logique sociale */
(function histoDailyMobileLayout() {
  "use strict";
  const VERSION = "1.0.0-beta.254.0";

  function activeState() {
    try { return state; } catch { return null; }
  }

  function repairHomeRail() {
    if (activeState()?.tab !== "home") return;
    const rail = document.querySelector(".hd222-world-switcher");
    const active = rail?.querySelector(".hd222-world.active");
    if (!rail || !active) return;
    const worlds = [...rail.querySelectorAll(".hd222-world")];
    const index = Math.max(0, worlds.indexOf(active));
    const left = index === 0 ? 0 : Math.max(0, Number(active.offsetLeft || 0));
    const apply = () => {
      if (!rail.isConnected) return;
      try { rail.scrollTo({ left, behavior: "auto" }); }
      catch { rail.scrollLeft = left; }
    };
    apply();
    requestAnimationFrame(apply);
    setTimeout(apply, 80);
  }

  const previousRender = typeof render === "function" ? render : null;
  if (previousRender) {
    render = function beta254LayoutRender(options = {}) {
      const result = previousRender(options);
      repairHomeRail();
      return result;
    };
  }

  window.addEventListener("resize", repairHomeRail, { passive: true });
  window.addEventListener("orientationchange", () => setTimeout(repairHomeRail, 120), { passive: true });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistration().then(registration => registration?.update?.()).catch(() => {});
  }

  document.documentElement.dataset.layoutVersion = VERSION;
  window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, mobileLayout: "isolated" };
})();

;

/* ===== SOURCE: social-v2.js ===== */
/* =========================================================
   HistoDaily RC5 — classements, communauté et intégrité sociale
   Une seule couche client, Supabase comme seule vérité partagée.
   ========================================================= */
(function histoDailySocialV2() {
  "use strict";

  const VERSION = "1.0.0-rc.32.0";
  const API_ROOT = "/api/v1/social-v2";
  const STALE_MS = 30_000;
  const LOADING_TIMEOUT_MS = 15_000;
  const BACKGROUND_REFRESH_MS = 120_000;
  const requestFlights = new Map();
  const refreshFlights = new Map();
  const publicProfileFlights = new Map();
  const profileFriendFlights = new Map();
  let bootstrapFlight = null;
  let legacyBridgeMutedUntil = 0;
  let scoreFlushFlight = null;
  let refreshTimer = 0;
  let lastObservedDay = "";

  const esc = value => {
    try { return escapeHtml(String(value ?? "")); }
    catch {
      return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
    }
  };

  function now() { return Date.now(); }
  function dayKey() {
    try { return typeof localDayKey === "function" ? localDayKey() : new Date().toISOString().slice(0, 10); }
    catch { return new Date().toISOString().slice(0, 10); }
  }
  function visible() { return typeof document === "undefined" || document.visibilityState !== "hidden"; }
  function legacyBridgeMuted() { return now() < legacyBridgeMutedUntil; }
  function online() { return typeof navigator === "undefined" || navigator.onLine !== false; }
  function safePeriod(value) { return ["daily", "week", "year"].includes(value) ? value : "daily"; }
  function safeAudience(value) { return value === "friends" ? "friends" : "general"; }
  function periodLabel(period) { return ({ daily: "Aujourd’hui", week: "Cette semaine", year: "Cette année" })[safePeriod(period)]; }
  function periodShort(period) { return ({ daily: "aujourd’hui", week: "cette semaine", year: "cette année" })[safePeriod(period)]; }
  function code(value = "") {
    try { return normalizeFriendCode(value); }
    catch { return String(value || "").trim().toUpperCase().replace(/\s+/g, "").replace(/[^A-Z0-9-]/g, ""); }
  }
  function pseudo() {
    try { return currentPseudo(); }
    catch { return String(state?.pseudo || "Invité"); }
  }
  function meId() {
    try { return playerIdMe(); }
    catch { return ""; }
  }
  function meCode() {
    try { return friendCode(); }
    catch { return ""; }
  }
  function levelValue() {
    try { return Number(level() || 1); }
    catch { return 1; }
  }
  function solvedTotal() { return Object.values(state?.solvedMysteries || {}).filter(Boolean).length; }

  function solvedEntry(mysteryId = "") {
    const entry = state?.solvedMysteries?.[mysteryId];
    return entry && typeof entry === "object" ? entry : {};
  }

  function scoreEligibleForRanking(mysteryId = "", payload = {}) {
    const solved = solvedEntry(mysteryId || payload.mysteryId);
    return !(payload.rankingEligible === false || payload.daily === false || payload.archive === true || solved.daily === false || solved.archive === true);
  }

  function scorePayloadWithEligibility(payload = {}) {
    const mysteryId = String(payload.mysteryId || "");
    const solved = solvedEntry(mysteryId);
    const eligible = scoreEligibleForRanking(mysteryId, payload);
    return {
      ...payload,
      daily: solved.daily !== undefined ? Boolean(solved.daily) : payload.daily,
      archive: solved.archive !== undefined ? Boolean(solved.archive) : Boolean(payload.archive),
      rankingEligible: eligible
    };
  }

  function localPeriodRange(period = "daily") {
    const nowDate = new Date();
    const today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()).getTime();
    if (period === "week") {
      const start = new Date(today);
      const weekday = start.getDay() || 7;
      start.setDate(start.getDate() - weekday + 1);
      return { start: start.getTime(), end: today + 86_400_000 };
    }
    if (period === "year") return { start: new Date(nowDate.getFullYear(), 0, 1).getTime(), end: today + 86_400_000 };
    return { start: today, end: today + 86_400_000 };
  }

  function localScoreCap(difficulty = "moyen") {
    if (difficulty === "facile") return 95;
    if (difficulty === "difficile") return 150;
    if (difficulty === "expert") return 180;
    return 120;
  }

  function localRankedEntries(period = "daily") {
    const range = localPeriodRange(safePeriod(period));
    return Object.entries(state?.solvedMysteries || {}).flatMap(([mysteryId, solved]) => {
      const at = Number(solved?.at || 0);
      if (!(at >= range.start && at < range.end)) return [];
      if (!scoreEligibleForRanking(mysteryId, solved || {})) return [];
      let difficulty = String(solved?.difficulty || "moyen");
      try { difficulty = String(data?.mysteries?.find?.(item => String(item.id) === String(mysteryId))?.difficulty || difficulty); } catch {}
      return [{ mysteryId, score: Math.max(0, Math.min(localScoreCap(difficulty), Number(solved?.score || 0))), at }];
    });
  }

  function localSelfRow(period = "daily") {
    const entries = localRankedEntries(period);
    const annual = safePeriod(period) === "year";
    return {
      id: meId(), playerId: meId(), friendCode: meCode(), code: meCode(),
      name: pseudo(), pseudo: pseudo(), me: true, rank: 0,
      score: annual ? Number(state?.xp || 0) : entries.reduce((sum, item) => sum + item.score, 0),
      scoreMetric: annual ? "xp" : "mystery-points",
      solvedInPeriod: annual ? solvedTotal() : entries.length,
      level: levelValue(), xp: Number(state?.xp || 0), solved: solvedTotal(), solvedCount: solvedTotal(),
      streak: Number(state?.streak || 0), localFallback: true
    };
  }

  function markScoreNotRanked(mysteryId = "") {
    if (!mysteryId) return;
    state.lastScoreSubmit = {
      ...(state.lastScoreSubmit || {}),
      [mysteryId]: {
        pending: false,
        stored: false,
        skipped: true,
        mode: "not-ranked",
        message: "Archive résolue : progression conservée, hors classement."
      }
    };
  }

  function purgeIneligibleScoreOutbox() {
    if (typeof beta128ReadScoreOutbox !== "function" || typeof beta128SaveScoreOutbox !== "function") return [];
    const current = beta128ReadScoreOutbox();
    const kept = [];
    let changed = false;
    current.forEach(item => {
      if (scoreEligibleForRanking(item.mysteryId, item)) kept.push(item);
      else {
        changed = true;
        markScoreNotRanked(item.mysteryId);
      }
    });
    if (changed) beta128SaveScoreOutbox(kept);
    return kept;
  }

  function defaultSocial() {
    return {
      version: VERSION,
      phase: "idle",
      message: "Connexion au classement…",
      startedAt: 0,
      lastAttemptAt: 0,
      loadedAt: 0,
      profile: null,
      friends: [],
      requests: { incoming: [], outgoing: [] },
      leaderboards: {},
      leaderboardStatus: {},
      publicProfiles: {},
      feedback: "",
      lastError: ""
    };
  }

  function social() {
    const current = state.socialV2 && typeof state.socialV2 === "object" ? state.socialV2 : {};
    const versionChanged = Boolean(current.version && current.version !== VERSION);
    const next = {
      ...defaultSocial(),
      ...current,
      version: VERSION,
      requests: {
        incoming: Array.isArray(current.requests?.incoming) ? current.requests.incoming : [],
        outgoing: Array.isArray(current.requests?.outgoing) ? current.requests.outgoing : []
      },
      friends: Array.isArray(current.friends) ? current.friends : [],
      leaderboards: !versionChanged && current.leaderboards && typeof current.leaderboards === "object" ? current.leaderboards : {},
      leaderboardStatus: current.leaderboardStatus && typeof current.leaderboardStatus === "object" ? current.leaderboardStatus : {},
      publicProfiles: !versionChanged && current.publicProfiles && typeof current.publicProfiles === "object" ? current.publicProfiles : {}
    };
    if (versionChanged) {
      next.loadedAt = 0;
      next.startedAt = 0;
      next.phase = "idle";
      Object.keys(next.leaderboardStatus || {}).forEach(key => {
        next.leaderboardStatus[key] = {
          ...next.leaderboardStatus[key],
          loadedAt: 0,
          startedAt: 0,
          phase: Array.isArray(next.leaderboards?.[key]) ? "stale" : "idle",
          message: "Nouvelle version : données partagées à resynchroniser."
        };
      });
    }
    state.socialV2 = next;
    return state.socialV2;
  }

  function saveSoon() {
    try { queueSaveState?.(80); }
    catch { try { saveState?.(); } catch {} }
  }

  function renderNow() {
    try { render({ immediate: true }); }
    catch { try { render(); } catch {} }
  }

  function identityPayload(extra = {}) {
    const canonical = state?.socialV2?.profile || {};
    const canonicalCode = code(canonical.friendCode || canonical.friend_code || "");
    return {
      playerId: canonical.playerId || canonical.player_id || meId(),
      pseudo: extra.allowPseudoChange ? pseudo() : (canonical.pseudo || pseudo()),
      friendCode: canonicalCode || meCode(),
      myFriendCode: canonicalCode || meCode(),
      level: Math.max(levelValue(), Number(canonical.level || 1)),
      xp: Math.max(Number(state?.xp || 0), Number(canonical.xp || 0)),
      solvedCount: Math.max(solvedTotal(), Number(canonical.solvedCount || canonical.solved_count || 0)),
      streak: Math.max(Number(state?.streak || 0), Number(canonical.streak || 0)),
      ...extra
    };
  }

  async function api(path, { method = "GET", body, query, timeout = 9000 } = {}) {
    const params = new URLSearchParams();
    Object.entries(query || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") params.set(key, String(value));
    });
    const url = `${API_ROOT}/${path}${params.size ? `?${params.toString()}` : ""}`;
    const controller = typeof AbortController === "function" ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), timeout) : 0;
    try {
      const response = await fetch(url, {
        method,
        cache: "no-store",
        headers: body === undefined ? undefined : { "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: controller?.signal
      });
      const json = await response.json().catch(() => ({}));
      if (!response.ok || json?.ok === false) {
        const error = new Error(json?.message || `Erreur HTTP ${response.status}`);
        error.status = response.status;
        error.payload = json;
        throw error;
      }
      return json;
    } catch (error) {
      if (error?.name === "AbortError") throw new Error("Le serveur met trop de temps à répondre.");
      throw error;
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  function adoptIdentity(json = {}) {
    if (!json.canonicalPlayerId && !json.canonicalFriendCode) return;
    try {
      if (typeof beta142AdoptServerIdentity === "function") {
        beta142AdoptServerIdentity(json);
        return;
      }
    } catch {}
  }

  function friendMap(friends = []) {
    const map = {};
    for (const friend of friends) {
      const key = friend.playerId || friend.friendCode || friend.id;
      if (!key) continue;
      map[key] = {
        id: friend.playerId || friend.id || key,
        playerId: friend.playerId || "",
        code: code(friend.friendCode || friend.code || ""),
        friendCode: code(friend.friendCode || friend.code || ""),
        name: friend.pseudo || friend.name || "Ami",
        pseudo: friend.pseudo || friend.name || "Ami",
        level: Number(friend.level || 1),
        xp: Number(friend.xp || 0),
        solved: Number(friend.solvedCount || friend.solved_count || 0),
        solved_count: Number(friend.solvedCount || friend.solved_count || 0),
        streak: Number(friend.streak || 0),
        server: true,
        acceptedFriend: true
      };
    }
    return map;
  }

  function applySnapshot(json = {}, { quiet = false } = {}) {
    const s = social();
    let streakRaised = false;
    adoptIdentity(json);
    if (json.profile) {
      s.profile = { ...json.profile };
      const serverStreak = Math.max(0, Number(json.profile.streak || 0));
      const localStreak = Math.max(0, Number(state.streak || 0));
      if (serverStreak > localStreak) {
        state.streak = serverStreak;
        streakRaised = true;
      }
    }
    if (Array.isArray(json.friends)) {
      s.friends = json.friends.map(friend => ({ ...friend }));
      // Ce miroir ne sert qu'aux écrans historiques. Il n'est jamais utilisé
      // comme vérité pour décider si une relation existe.
      state.friends = friendMap(s.friends);
    }
    if (json.requests) {
      s.requests = {
        incoming: Array.isArray(json.requests.incoming) ? json.requests.incoming : [],
        outgoing: Array.isArray(json.requests.outgoing) ? json.requests.outgoing : []
      };
    }
    s.phase = "ready";
    s.startedAt = 0;
    s.loadedAt = now();
    s.lastError = "";
    // quiet empêche uniquement un rendu intermédiaire ; il ne doit jamais
    // laisser le texte « Synchronisation… » après une réponse réussie.
    s.message = json.message || "Profil et amis synchronisés.";
    saveSoon();
    if (streakRaised) {
      queueMicrotask(() => {
        try { window.HistoDailyStreakRepair?.repair?.(); } catch {}
        if (state.tab === "home") renderNow();
      });
    }
  }

  async function bootstrap({ force = false, allowPseudoChange = false, quiet = false } = {}) {
    const s = social();
    if (!online()) {
      s.lastAttemptAt = now();
      s.phase = s.loadedAt ? "offline" : "error";
      s.message = s.loadedAt ? "Hors ligne : dernière copie affichée." : "Connexion nécessaire pour charger le multi.";
      saveSoon();
      return null;
    }
    if (!force && s.loadedAt && now() - s.loadedAt < STALE_MS && s.phase === "ready") return s;
    if (!force && s.phase !== "ready" && Number(s.lastAttemptAt || 0) && now() - Number(s.lastAttemptAt || 0) < STALE_MS) return s.loadedAt ? s : null;
    if (bootstrapFlight) return bootstrapFlight;
    s.phase = "loading";
    s.startedAt = now();
    s.lastAttemptAt = s.startedAt;
    s.message = "Synchronisation du profil et des amis…";
    if (!quiet && ["rank", "profile", "publicProfile"].includes(state.tab)) renderNow();
    bootstrapFlight = api("bootstrap", {
      method: "POST",
      body: identityPayload({ allowPseudoChange })
    }).then(json => {
      applySnapshot(json, { quiet });
      return json;
    }).catch(error => {
      s.phase = s.loadedAt ? "stale" : "error";
      s.startedAt = 0;
      s.lastError = "Service social indisponible.";
      s.message = s.loadedAt ? "Dernière copie affichée : actualisation impossible." : "Le service social est indisponible pour le moment.";
      saveSoon();
      return null;
    }).finally(() => {
      bootstrapFlight = null;
      if (!quiet && ["rank", "profile", "publicProfile"].includes(state.tab)) renderNow();
    });
    return bootstrapFlight;
  }

  function leaderboardKey(period, audience) { return `${safeAudience(audience)}:${safePeriod(period)}`; }

  function clientRange(period) {
    try {
      const range = rangeForScope(safePeriod(period));
      return { rangeStart: new Date(range.start).toISOString(), rangeEnd: new Date(range.end).toISOString() };
    } catch {
      return {};
    }
  }

  async function loadLeaderboard(period = "daily", audience = "general", { force = false, quiet = false } = {}) {
    period = safePeriod(period);
    audience = safeAudience(audience);
    const s = social();
    const key = leaderboardKey(period, audience);
    const status = s.leaderboardStatus[key] || {};
    if (period === "daily" && status.periodKey && status.periodKey !== dayKey()) force = true;
    if (!online()) {
      s.leaderboardStatus[key] = { ...status, attemptedAt: now(), phase: status.loadedAt ? "offline" : "error", message: status.loadedAt ? "Hors ligne : dernière copie." : "Connexion nécessaire." };
      saveSoon();
      return s.leaderboards[key] || [];
    }
    if (!force && status.loadedAt && now() - status.loadedAt < STALE_MS && status.phase === "ready") return s.leaderboards[key] || [];
    if (!force && status.phase !== "ready" && Number(status.attemptedAt || 0) && now() - Number(status.attemptedAt || 0) < STALE_MS) return s.leaderboards[key] || [];
    if (requestFlights.has(key)) return requestFlights.get(key);

    const attemptedAt = now();
    s.leaderboardStatus[key] = { ...status, phase: "loading", startedAt: attemptedAt, attemptedAt, message: "Actualisation du classement…" };
    if (!quiet && state.tab === "rank") renderNow();
    const flight = api("leaderboard", {
      query: {
        ...identityPayload(),
        ...clientRange(period),
        period,
        audience,
        periodKey: typeof localDayKey === "function" ? localDayKey() : new Date().toISOString().slice(0, 10),
        _: now()
      }
    }).then(json => {
      adoptIdentity(json);
      const rows = Array.isArray(json.rows) ? json.rows.map(row => ({
        ...row,
        id: row.playerId || row.id,
        playerId: row.playerId || row.player_id || row.id,
        name: row.name || row.pseudo || "Joueur",
        pseudo: row.pseudo || row.name || "Joueur",
        friendCode: code(row.friendCode || row.friend_code || ""),
        code: code(row.friendCode || row.friend_code || ""),
        score: Number(row.score || 0),
        scoreMetric: row.scoreMetric || json.scoreMetric || (period === "year" ? "xp" : "mystery-points"),
        rank: Number(row.rank || 0),
        solvedInPeriod: Number(row.solvedInPeriod || 0),
        solved: Number(row.solvedCount || row.solved_count || 0),
        solvedCount: Number(row.solvedCount || row.solved_count || 0),
        xp: Number(row.xp || 0),
        level: Number(row.level || 1),
        streak: Number(row.streak || 0),
        me: Boolean(row.me || (row.playerId || row.player_id) === meId())
      })) : [];
      s.leaderboards[key] = rows;
      s.leaderboardStatus[key] = {
        phase: "ready",
        startedAt: 0,
        attemptedAt: now(),
        loadedAt: now(),
        generatedAt: json.generatedAt || "",
        periodKey: json.periodKey || (period === "daily" ? dayKey() : ""),
        message: "Classement partagé à jour.",
        authoritative: true,
        friendCount: Number(json.friendCount || 0),
        zeroScoreFriendCount: Number(json.zeroScoreFriendCount || 0)
      };
      // Miroirs limités pour l'accueil et les composants non sociaux hérités.
      const legacyScope = audience === "friends" ? "friends" : period;
      state.serverLeaderboards = { ...(state.serverLeaderboards || {}), [legacyScope]: rows };
      state.serverLeaderboardStatus = {
        ...(state.serverLeaderboardStatus || {}),
        [legacyScope]: { loadedAt: now(), loading: false, mode: "supabase", authoritative: true, note: "Classement partagé à jour." }
      };
      saveSoon();
      return rows;
    }).catch(error => {
      const hadCache = Array.isArray(s.leaderboards[key]);
      s.leaderboardStatus[key] = {
        ...status,
        phase: hadCache ? "stale" : "error",
        startedAt: 0,
        attemptedAt: now(),
        loadedAt: status.loadedAt || 0,
        message: hadCache ? "Dernière copie affichée : serveur indisponible." : "Classement indisponible pour le moment.",
        authoritative: false
      };
      saveSoon();
      return s.leaderboards[key] || [];
    }).finally(() => {
      requestFlights.delete(key);
      if (!quiet && state.tab === "rank") renderNow();
    });
    requestFlights.set(key, flight);
    return flight;
  }

  function repairStuckStates() {
    const s = social();
    const cutoff = now() - LOADING_TIMEOUT_MS;
    if (s.phase === "loading" && (!Number(s.startedAt || 0) || Number(s.startedAt) < cutoff) && !bootstrapFlight) {
      s.phase = s.loadedAt ? "stale" : "error";
      s.startedAt = 0;
      s.message = s.loadedAt ? "Dernière copie affichée : la synchronisation a expiré." : "La synchronisation a expiré. Réessaie.";
    }
    Object.entries(s.leaderboardStatus || {}).forEach(([key, status]) => {
      if (status?.phase !== "loading" || (Number(status.startedAt || 0) && Number(status.startedAt) >= cutoff) || requestFlights.has(key)) return;
      s.leaderboardStatus[key] = {
        ...status,
        phase: Array.isArray(s.leaderboards?.[key]) ? "stale" : "error",
        startedAt: 0,
        message: Array.isArray(s.leaderboards?.[key]) ? "Dernière copie affichée : actualisation expirée." : "Le classement a mis trop de temps à répondre."
      };
    });
  }

  function invalidateDailyLeaderboards(message = "Nouveau jour : classement à actualiser.") {
    const s = social();
    ["general:daily", "friends:daily"].forEach(key => {
      const status = s.leaderboardStatus[key] || {};
      s.leaderboardStatus[key] = { ...status, loadedAt: 0, startedAt: 0, phase: Array.isArray(s.leaderboards?.[key]) ? "stale" : "idle", message };
    });
    try {
      state.serverLeaderboardStatus = {
        ...(state.serverLeaderboardStatus || {}),
        daily: { ...(state.serverLeaderboardStatus?.daily || {}), loadedAt: 0, loading: false, note: message },
        friends: { ...(state.serverLeaderboardStatus?.friends || {}), loadedAt: 0, loading: false, note: message }
      };
    } catch {}
    saveSoon();
  }

  function reconcileDayBoundary() {
    const current = dayKey();
    if (!lastObservedDay) { lastObservedDay = current; return false; }
    if (lastObservedDay === current) return false;
    lastObservedDay = current;
    invalidateDailyLeaderboards();
    try { window.HistoDailyDailyRotation?.reconcile?.({ renderAfter: false }); } catch {}
    return true;
  }

  function activeContext() {
    const legacy = state.rankScope || "daily";
    const period = safePeriod(state.rankPeriod || state.rankFriendPeriod || (legacy === "friends" ? "daily" : legacy));
    const audience = safeAudience(state.rankAudience || (legacy === "friends" ? "friends" : "general"));
    return { period, audience, key: leaderboardKey(period, audience) };
  }

  function rowsFor(period, audience) {
    const shared = social().leaderboards[leaderboardKey(period, audience)] || [];
    const local = localSelfRow(period);
    const index = shared.findIndex(row => row.me || row.playerId === meId() || (meCode() && code(row.friendCode) === code(meCode())));
    if (index >= 0) {
      return shared.map((row, rowIndex) => rowIndex === index ? {
        ...row,
        me: true,
        score: Math.max(Number(row.score || 0), Number(local.score || 0)),
        solvedInPeriod: Math.max(Number(row.solvedInPeriod || 0), Number(local.solvedInPeriod || 0)),
        optimistic: Number(local.score || 0) > Number(row.score || 0)
      } : row);
    }
    // Hors ligne, au premier démarrage du classement ou pendant l'envoi d'un
    // score, la position reste visible au lieu d'afficher artificiellement 0.
    if (!shared.length || local.score > 0 || audience === "friends") return [local, ...shared];
    return shared;
  }

  function myRow(period, audience) {
    return rowsFor(period, audience).find(row => row.me || row.playerId === meId() || (meCode() && code(row.friendCode) === code(meCode()))) || localSelfRow(period);
  }

  function statusText(status = {}) {
    if (!online()) return status.loadedAt ? "Hors connexion · dernière version disponible" : "Connexion nécessaire pour charger le classement";
    if (status.phase === "loading") return "Mise à jour du classement…";
    if (status.phase === "ready") {
      const seconds = Math.max(0, Math.round((now() - Number(status.loadedAt || 0)) / 1000));
      return seconds < 5 ? "À jour à l’instant" : seconds < 60 ? `À jour il y a ${seconds} s` : "Classement à jour";
    }
    if (status.phase === "stale" || status.phase === "offline") return "Dernière version disponible affichée";
    return status.message || "Le classement sera chargé dès que possible.";
  }

  function pendingScoreCount() {
    try {
      purgeIneligibleScoreOutbox();
      return typeof beta128ReadScoreOutbox === "function" ? beta128ReadScoreOutbox().length : 0;
    } catch { return 0; }
  }

  function requestMarkup() {
    const requests = social().requests;
    const incoming = requests.incoming || [];
    const outgoing = requests.outgoing || [];
    if (!incoming.length && !outgoing.length) return "";
    const incomingBlock = incoming.length ? `<div class="hdsv2-request-group"><div class="hdsv2-request-group-title"><strong>À répondre</strong><span>${incoming.length}</span></div>${incoming.map(item => `<div class="hdsv2-request-row"><div class="hdsv2-avatar">${esc((item.otherPseudo || item.requesterPseudo || "A").charAt(0).toUpperCase())}</div><div><strong>${esc(item.otherPseudo || item.requesterPseudo || "Joueur")}</strong><small>Souhaite rejoindre ton cercle · ${esc(item.otherFriendCode || item.requesterFriendCode || "")}</small></div><div class="hdsv2-request-actions"><button type="button" data-social-respond="accept" data-request-id="${esc(item.requestId || item.id)}">Accepter</button><button type="button" class="ghost" data-social-respond="decline" data-request-id="${esc(item.requestId || item.id)}">Refuser</button></div></div>`).join("")}</div>` : "";
    const outgoingBlock = outgoing.length ? `<div class="hdsv2-request-group is-outgoing"><div class="hdsv2-request-group-title"><strong>Envoyées</strong><span>${outgoing.length}</span></div>${outgoing.map(item => `<div class="hdsv2-request-row pending"><div class="hdsv2-avatar">${esc((item.otherPseudo || "A").charAt(0).toUpperCase())}</div><div><strong>${esc(item.otherPseudo || "Joueur")}</strong><small>La demande apparaîtra après sa prochaine synchronisation · ${esc(item.otherFriendCode || "")}</small></div><span class="hdsv2-pending-pill">En attente</span></div>`).join("")}</div>` : "";
    return `<section class="card hdsv2-card hdsv2-requests">
      <div class="hdsv2-section-head"><div><span class="card-label">Invitations</span><h2>${incoming.length ? `${incoming.length} demande${incoming.length > 1 ? "s" : ""} à traiter` : "Demandes envoyées"}</h2><p>${incoming.length ? "Réponds ici : le classement Amis se mettra ensuite à jour automatiquement." : "Tu seras prévenu dès qu’une demande sera acceptée."}</p></div></div>
      ${incomingBlock}${outgoingBlock}
    </section>`;
  }

  function friendPeriodRow(friend, context) {
    if (!context) return null;
    const friendId = String(friend.playerId || friend.id || "");
    const friendCode = code(friend.friendCode || friend.code || "");
    return rowsFor(context.period, "friends").find(row =>
      Boolean(friendId && String(row.playerId || row.id || "") === friendId) ||
      Boolean(friendCode && code(row.friendCode || row.code || "") === friendCode)
    ) || null;
  }

  function friendsMarkup({ includeAdd = true, context = null } = {}) {
    const s = social();
    const addCard = includeAdd ? `<section class="card hdsv2-card hdsv2-add-card"><div><span class="card-label">Agrandir ton cercle</span><h2>Inviter avec un code ami</h2><p>Entre le code affiché sur le profil de ton ami. La relation n’apparaît qu’après son acceptation.</p></div><form data-social-add-friend><input type="text" name="friendCode" value="${esc(state.friendCodeDraft || "")}" placeholder="MANON-ABC123" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="Code ami"/><button type="submit">Envoyer la demande</button></form>${s.feedback ? `<p class="hdsv2-feedback" role="status">${esc(s.feedback)}</p>` : ""}</section>` : "";
    const list = s.friends.length ? `<div class="hdsv2-friend-list">${s.friends.map(friend => {
      const periodRow = friendPeriodRow(friend, context);
      const name = friend.pseudo || friend.name || "Ami";
      const details = [`Niveau ${Number(friend.level || 1)}`, `${Number(friend.solvedCount || friend.solved || friend.solved_count || 0)} dossiers`];
      if (Number(friend.streak || 0) > 0) details.push(`${Number(friend.streak)} j de série`);
      return `<div class="hdsv2-friend-row"><button type="button" class="hdsv2-friend-main" data-social-profile="${esc(friend.playerId || friend.id || friend.friendCode)}"><span class="hdsv2-avatar">${esc(name.charAt(0).toUpperCase())}</span><span><strong>${esc(name)}</strong><small>${esc(details.join(" · "))}</small></span></button><div class="hdsv2-friend-period">${periodRow ? `<b>${Number(periodRow.score || 0)} ${scoreUnit(periodRow)}</b><small>${periodRow.rank ? `#${Number(periodRow.rank)} entre amis` : "Pas encore classé"}</small>` : `<b>—</b><small>${context ? `Aucun score ${periodShort(context.period)}` : esc(friend.friendCode || friend.code || "")}</small>`}</div><button type="button" class="ghost hdsv2-remove" data-social-remove="${esc(friend.playerId || friend.id || "")}" aria-label="Retirer ${esc(name)}">Retirer</button></div>`;
    }).join("")}</div>` : `<div class="hdsv2-empty hdsv2-empty-friends"><span class="hdsv2-empty-icon" aria-hidden="true">◎</span><strong>Ton cercle est prêt à grandir</strong><p>Ajoute un proche pour comparer vos expéditions, même lorsqu’il n’a encore aucun point.</p>${includeAdd ? `<button type="button" class="ghost" data-focus-add-friend>Entrer un code ami</button>` : ""}</div>`;
    return `${addCard}<section class="card hdsv2-card hdsv2-friends-card"><div class="hdsv2-section-head"><div><span class="card-label">Ton cercle</span><h2>${s.friends.length} ami${s.friends.length > 1 ? "s" : ""} confirmé${s.friends.length > 1 ? "s" : ""}</h2><p>${s.friends.length ? "Ouvre un profil pour découvrir sa progression complète." : "Les relations confirmées apparaîtront ici."}</p></div></div>${list}</section>`;
  }

  function rowName(row = {}) { return row.name || row.pseudo || "Joueur"; }
  function rowTarget(row = {}) { return row.playerId || row.id || row.friendCode || row.code || ""; }
  function isXpRanking(row = {}) { return row.scoreMetric === "xp"; }
  function scoreUnit(row = {}) { return isXpRanking(row) ? "XP" : "pts"; }
  function rowMeta(row = {}) {
    if (isXpRanking(row)) {
      const solved = Number(row.solvedCount || row.solved || 0);
      return `Niveau ${Number(row.level || 1)} · ${solved} dossier${solved > 1 ? "s" : ""} résolu${solved > 1 ? "s" : ""}`;
    }
    const solved = Number(row.solvedInPeriod || 0);
    return `${solved} dossier${solved > 1 ? "s" : ""} compté${solved > 1 ? "s" : ""}`;
  }
  function rankRowMarkup(row, { selfCard = false } = {}) {
    const name = rowName(row);
    return `<button type="button" class="hdsv2-rank-row${row.me ? " me" : ""}${selfCard ? " hdsv2-self-row" : ""}" data-social-profile="${esc(rowTarget(row))}" aria-label="Ouvrir le profil de ${esc(name)}"><span class="hdsv2-rank-number">${row.rank ? `#${Number(row.rank)}` : "—"}</span><span class="hdsv2-avatar">${esc(name.charAt(0).toUpperCase())}</span><span class="hdsv2-rank-player"><strong>${esc(name)}${row.me ? " · toi" : ""}</strong><small>${esc(rowMeta(row))} · voir le profil</small></span><b>${Number(row.score || 0)}<small> ${scoreUnit(row)}</small></b></button>`;
  }

  function podiumMarkup(rows = []) {
    const podium = rows.filter(row => Number(row.rank || 0) >= 1 && Number(row.rank || 0) <= 3).sort((a, b) => Number(a.rank) - Number(b.rank));
    if (podium.length < 3 || !podium.some(row => Number(row.score || 0) > 0)) return "";
    const order = [podium.find(row => Number(row.rank) === 2), podium.find(row => Number(row.rank) === 1), podium.find(row => Number(row.rank) === 3)].filter(Boolean);
    return `<div class="hdsv2-podium" aria-label="Podium du classement">${order.map(row => {
      const rank = Number(row.rank || 0);
      const name = rowName(row);
      const medal = rank === 1 ? "1" : rank === 2 ? "2" : "3";
      return `<button type="button" class="hdsv2-podium-card rank-${rank}${row.me ? " me" : ""}" data-social-profile="${esc(rowTarget(row))}" aria-label="${esc(name)}, ${rank}${rank === 1 ? "er" : "e"} du classement"><span class="hdsv2-podium-medal">${medal}</span><span class="hdsv2-podium-avatar">${esc(name.charAt(0).toUpperCase())}</span><strong>${esc(name)}${row.me ? " · toi" : ""}</strong><b>${Number(row.score || 0)} ${scoreUnit(row)}</b><small>${esc(rowMeta(row))}</small></button>`;
    }).join("")}</div>`;
  }

  function leaderboardMarkup(rows, context, status) {
    if (status.phase === "loading" && !rows.length) {
      return `<div class="hdsv2-loading" aria-live="polite"><span></span><span></span><span></span><p>Le classement se met en place…</p></div>`;
    }
    if (status.phase === "error" && !rows.length) {
      return `<div class="hdsv2-empty error"><span class="hdsv2-empty-icon" aria-hidden="true">↻</span><strong>Impossible d’actualiser pour le moment</strong><p>Tes résultats restent enregistrés. Réessaie lorsque la connexion est revenue.</p><button type="button" data-social-refresh>Réessayer</button></div>`;
    }
    if (!rows.length) {
      return `<div class="hdsv2-empty"><span class="hdsv2-empty-icon" aria-hidden="true">◇</span><strong>${context.audience === "friends" ? "Le terrain est encore libre" : "Sois le premier à ouvrir le classement"}</strong><p>${context.audience === "friends" ? `Aucun de vous n’a encore marqué de point ${periodShort(context.period)}.` : `Le premier dossier résolu ${periodShort(context.period)} fera apparaître le classement.`}</p></div>`;
    }
    const me = rows.find(row => row.me || row.playerId === meId() || (meCode() && code(row.friendCode) === code(meCode()))) || null;
    const podium = podiumMarkup(rows);
    const podiumShown = Boolean(podium);
    const remaining = rows.filter(row => row !== me && !(podiumShown && Number(row.rank || 0) <= 3));
    const showSelfPosition = Boolean(me && (!podiumShown || Number(me.rank || 0) > 3));
    return `${showSelfPosition ? `<div class="hdsv2-self-position"><span>Ta position</span>${rankRowMarkup(me, { selfCard: true })}</div>` : ""}${podium}${remaining.length ? `<div class="hdsv2-rank-list">${remaining.map(row => rankRowMarkup(row)).join("")}</div>` : `<div class="hdsv2-ranking-complete"><span>✓</span><p>Tout le classement est déjà visible ci-dessus.</p></div>`}`;
  }

  async function refreshContext(context, button = null) {
    context = context || activeContext();
    const key = leaderboardKey(context.period, context.audience);
    if (button) {
      button.disabled = true;
      button.textContent = "Actualisation…";
    }
    if (refreshFlights.has(key)) return refreshFlights.get(key);
    const flight = (async () => {
      await bootstrap({ force: true, quiet: true });
      await socialV2FlushScoreOutbox({ force: true, reason: "refresh" });
      await loadLeaderboard(context.period, context.audience, { force: true, quiet: true });
      renderNow();
      return social().leaderboards[key] || [];
    })().finally(() => refreshFlights.delete(key));
    refreshFlights.set(key, flight);
    return flight;
  }

  function bindCommonSocialHandlers(context = null) {
    document.querySelectorAll("[data-social-refresh]").forEach(button => button.addEventListener("click", () => refreshContext(context || activeContext(), button)));
    document.querySelectorAll("[data-social-profile]").forEach(button => button.addEventListener("click", () => viewProfile(button.dataset.socialProfile || "")));
    document.querySelectorAll("[data-social-remove]").forEach(button => button.addEventListener("click", () => removeFriend(button.dataset.socialRemove || "")));
    document.querySelectorAll("[data-social-respond]").forEach(button => button.addEventListener("click", () => respondFriendRequest(button.dataset.requestId || "", button.dataset.socialRespond || "")));
    const form = document.querySelector("[data-social-add-friend]");
    form?.addEventListener("submit", addFriend);
    form?.querySelector("input")?.addEventListener("input", event => {
      state.friendCodeDraft = event.currentTarget.value || "";
      saveSoon();
    });
    document.querySelector("[data-focus-add-friend]")?.addEventListener("click", () => {
      const input = document.querySelector("[data-social-add-friend] input");
      input?.focus({ preventScroll: false });
      document.querySelector("[data-social-add-friend]")?.scrollIntoView({
        behavior: globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ? "auto" : "smooth",
        block: "center"
      });
    });
  }

  renderRank = function socialV2RenderRank() {
    const context = activeContext();
    state.rankPeriod = context.period;
    state.rankFriendPeriod = context.period;
    state.rankAudience = context.audience;
    state.rankScope = context.audience === "friends" ? "friends" : context.period;
    const s = social();
    const rows = rowsFor(context.period, context.audience);
    const status = s.leaderboardStatus[context.key] || { phase: "idle", loadedAt: 0 };
    const me = myRow(context.period, context.audience);
    const incoming = s.requests.incoming.length;
    const pending = pendingScoreCount();
    const audienceLabel = context.audience === "friends" ? "Ton cercle" : "Tous les joueurs";

    renderShell(`<div class="hdsv2-screen hdsv2-rank-screen hd34-rank-screen">
      <header class="hdsv2-topbar hd34-rank-topbar"><div><p class="eyebrow">Classement</p><h1>${esc(audienceLabel)}</h1></div></header>
      <div class="hd34-rank-controls">
        <nav class="hdsv2-period-tabs" aria-label="Période">${[["daily", "Jour", "Aujourd’hui"], ["week", "Semaine", "Cette semaine"], ["year", "Année", "Cette année"]].map(([period, shortLabel, fullLabel]) => `<button type="button" data-social-period="${period}" class="${context.period === period ? "active" : ""}" aria-label="${fullLabel}" aria-current="${context.period === period ? "page" : "false"}">${shortLabel}</button>`).join("")}</nav>
        <nav class="hdsv2-audience-tabs" aria-label="Joueurs affichés"><button type="button" data-social-audience="general" class="${context.audience === "general" ? "active" : ""}">Tous</button><button type="button" data-social-audience="friends" class="${context.audience === "friends" ? "active" : ""}">Amis${incoming ? `<span>${incoming}</span>` : ""}</button></nav>
      </div>
      <section class="hd34-my-rank" aria-label="Ta position"><div><span>Toi · ${esc(periodLabel(context.period))}</span><strong>${me?.rank ? `#${me.rank} · ` : ""}${Number(me?.score || 0)} ${context.period === "year" ? "XP" : "pts"}</strong></div><button type="button" class="ghost" data-social-refresh aria-label="Actualiser le classement">↻</button>${pending ? `<small>${pending} score${pending > 1 ? "s" : ""} à envoyer</small>` : status.phase === "error" ? `<small>Actualisation indisponible</small>` : ""}</section>
      ${context.audience === "friends" ? requestMarkup() : ""}
      <section class="hdsv2-leaderboard hd34-leaderboard"><div class="hd34-leaderboard-head"><h2>${rows.length} joueur${rows.length > 1 ? "s" : ""}</h2><small>${context.period === "year" ? "classés par XP" : context.audience === "friends" ? "dans ton cercle" : "classement général"}</small></div>${leaderboardMarkup(rows, context, status)}</section>
      ${context.audience === "friends" ? friendsMarkup({ includeAdd: true, context }) : ""}
    </div>`);

    document.querySelector("[data-open-profile]")?.addEventListener("click", () => setState({ tab: "profile" }));
    document.querySelectorAll("[data-social-period]").forEach(button => button.addEventListener("click", () => setState({ rankPeriod: safePeriod(button.dataset.socialPeriod), rankFriendPeriod: safePeriod(button.dataset.socialPeriod) }, { save: true, renderImmediate: true })));
    document.querySelectorAll("[data-social-audience]").forEach(button => button.addEventListener("click", () => setState({ rankAudience: safeAudience(button.dataset.socialAudience), rankScope: button.dataset.socialAudience === "friends" ? "friends" : context.period }, { save: true, renderImmediate: true })));
    bindCommonSocialHandlers(context);

    const leaderboardRetryReady = !Number(status.attemptedAt || 0) || now() - Number(status.attemptedAt || 0) >= STALE_MS;
    const bootstrapRetryReady = !Number(s.lastAttemptAt || 0) || now() - Number(s.lastAttemptAt || 0) >= STALE_MS;
    const needsLeaderboard = (!status.loadedAt || now() - Number(status.loadedAt) > STALE_MS) && status.phase !== "loading" && leaderboardRetryReady;
    if (!s.loadedAt) {
      if (s.phase === "loading") {
        bootstrapFlight?.then(result => result && needsLeaderboard ? loadLeaderboard(context.period, context.audience, { quiet: true }) : null).then(() => { if (state.tab === "rank") renderNow(); });
      } else if (bootstrapRetryReady) {
        bootstrap({ quiet: true }).then(result => result && needsLeaderboard ? loadLeaderboard(context.period, context.audience, { quiet: true }) : null).then(() => { if (state.tab === "rank") renderNow(); });
      }
    } else if (needsLeaderboard) {
      loadLeaderboard(context.period, context.audience, { quiet: true }).then(() => { if (state.tab === "rank") renderNow(); });
    }
  };

  function sealSocialProfileShell() {
    const shell = document.querySelector(".app-shell.tab-profile");
    if (!shell || !shell.querySelector(".hdsv2-profile-screen")) return;
    shell.dataset.hd187Enhanced = "1";
    shell.classList.remove("hd219-profile-shell");
    shell.querySelectorAll(":scope > .hd187-curiosity-card, :scope > .hd217-curiosity-card").forEach(node => node.remove());
  }

  function profileInitials(value = pseudo()) {
    const parts = String(value || "P").trim().split(/\s+/).filter(Boolean);
    return (parts.slice(0, 2).map(part => part.charAt(0)).join("") || "P").toUpperCase();
  }

  function profileDisciplineRows() {
    const disciplines = typeof DISCIPLINES !== "undefined" && Array.isArray(DISCIPLINES) ? DISCIPLINES : [];
    return disciplines.map((discipline, index) => {
      let stats = { progress: 0, done: 0, total: 0 };
      try { if (typeof disciplineProgress === "function") stats = disciplineProgress(discipline.id) || stats; } catch {}
      const progress = Math.max(0, Math.min(100, Number(stats.progress || 0)));
      return {
        discipline,
        index,
        progress,
        done: Math.max(0, Number(stats.done || 0)),
        total: Math.max(0, Number(stats.total || 0))
      };
    });
  }

  function profileDisciplineIcon(item) {
    try { return typeof HD_ICONS !== "undefined" && HD_ICONS.discipline ? HD_ICONS.discipline(item.discipline) : esc(item.discipline.emoji || "✦"); }
    catch { return esc(item.discipline.emoji || "✦"); }
  }

  function profileCuriosityModel() {
    const rows = profileDisciplineRows();
    const byId = new Map(rows.map(item => [item.discipline.id, item]));
    let concept = {};
    try { concept = window.HistoDaily?.conceptDebug?.curiosityData?.() || {}; } catch {}
    const favorites = Array.isArray(concept.favorites)
      ? concept.favorites.map(item => byId.get(item?.discipline?.id)).filter(Boolean)
      : [];
    const ranked = [...rows].sort((a, b) => b.progress - a.progress || b.done - a.done || a.index - b.index);
    const selected = [];
    [...favorites, ...ranked].forEach(item => {
      if (item && !selected.some(existing => existing.discipline.id === item.discipline.id)) selected.push(item);
    });
    const fallback = { discipline: { id: "history", title: "Histoire", emoji: "🏛️", accent: "#f6c453" }, progress: 0, done: 0, total: 0, index: 0 };
    const favorite = selected[0] || fallback;
    const second = selected[1] || rows.find(item => item.discipline.id !== favorite.discipline.id) || favorite;
    const third = selected[2] || rows.find(item => ![favorite.discipline.id, second.discipline.id].includes(item.discipline.id)) || second;
    const unexplored = rows.find(item => item.progress === 0 && ![favorite.discipline.id, second.discipline.id, third.discipline.id].includes(item.discipline.id)) || rows.find(item => item.progress === 0) || third;
    const average = rows.length ? Math.round(rows.reduce((sum, item) => sum + item.progress, 0) / rows.length) : 0;
    return { rows, favorite, second, third, unexplored, average };
  }

  function profileCompletedLessons() {
    try { return typeof curatedLessons === "function" ? curatedLessons().filter(lesson => lessonDone(lesson.id)).length : 0; }
    catch { return 0; }
  }

  function profileUnlockedCollections() {
    const values = Object.values(state.collectionUnlocks || {}).filter(Boolean).map((item, index) => ({
      title: String(item.title || `Collection ${index + 1}`),
      icon: item.icon || "✦",
      at: Number(item.at || 0)
    }));
    return values.sort((a, b) => b.at - a.at);
  }

  function profileCollectionIcon(value) {
    const raw = String(value || "");
    if (raw.includes('class="hd-icon')) return raw;
    return `<span class="hd257-medal-symbol">${esc(raw || "✦")}</span>`;
  }

  function profileAchievements(s = social()) {
    const source = state.achievements || {};
    const completed = profileCompletedLessons();
    const solved = solvedTotal();
    const streak = Math.max(0, Number(state.streak || 0));
    const friends = Array.isArray(s?.friends) ? s.friends.length : 0;
    const definitions = [
      { key: "firstLesson", group: "Premiers pas", label: "Premier cours", description: "Valider un cours et son quiz.", icon: "lesson", current: completed, goal: 1, on: Boolean(source.firstLesson || completed > 0), unit: "cours" },
      { key: "firstMystery", group: "Premiers pas", label: "Premier mystère", description: "Résoudre une expédition quotidienne.", icon: "mystery", current: solved, goal: 1, on: Boolean(source.firstMystery || solved > 0), unit: "dossier" },
      { key: "firstArchive", group: "Exploration", label: "Mémoire retrouvée", description: "Résoudre un mystère depuis les archives.", icon: "catalog", current: source.firstArchive ? 1 : 0, goal: 1, on: Boolean(source.firstArchive), unit: "archive" },
      { key: "streak3", group: "Régularité", label: "Élan de curiosité", description: "Revenir trois jours de suite.", icon: "spark", current: streak, goal: 3, on: Boolean(source.streak3 || streak >= 3), unit: "jours" },
      { key: "streak7", group: "Régularité", label: "Une semaine d’exploration", description: "Maintenir une série de sept jours.", icon: "trophy", current: streak, goal: 7, on: Boolean(source.streak7 || streak >= 7), unit: "jours" },
      { key: "noHint", group: "Maîtrise", label: "Instinct sûr", description: "Résoudre un mystère sans demander d’indice.", icon: "check", current: source.noHint ? 1 : 0, goal: 1, on: Boolean(source.noHint), unit: "défi" },
      { key: "expertMystery", group: "Maîtrise", label: "Dossier expert", description: "Venir à bout d’un mystère expert.", icon: "review", current: source.expertMystery ? 1 : 0, goal: 1, on: Boolean(source.expertMystery), unit: "défi" },
      { key: "tenMysteries", group: "Exploration", label: "Chasseur de mystères", description: "Résoudre dix dossiers différents.", icon: "search", current: solved, goal: 10, on: solved >= 10, unit: "dossiers" },
      { key: "fiveLessons", group: "Apprentissage", label: "Carnet bien rempli", description: "Valider cinq cours complets.", icon: "courses", current: completed, goal: 5, on: completed >= 5, unit: "cours" },
      { key: "threeFriends", group: "Communauté", label: "Cercle de curieux", description: "Rassembler trois amis dans HistoDaily.", icon: "users", current: friends, goal: 3, on: friends >= 3, unit: "amis" }
    ];
    return definitions.map((item, index) => {
      const current = Math.max(0, Number(item.current || 0));
      const goal = Math.max(1, Number(item.goal || 1));
      const on = Boolean(item.on || current >= goal);
      const progress = on ? 100 : Math.max(0, Math.min(99, Math.round(current / goal * 100)));
      const progressLabel = on ? "Débloqué" : goal === 1 ? "À accomplir" : `${Math.min(current, goal)}/${goal} ${item.unit}`;
      return { ...item, current, goal, on, progress, progressLabel, order: index };
    });
  }

  function profileActionIcon(name, fallback = "✦") {
    try { return typeof HD_ICONS !== "undefined" && HD_ICONS.action ? HD_ICONS.action(name) : fallback; }
    catch { return fallback; }
  }

  function profileActivityDays() {
    const days = [];
    const dayMs = 86_400_000;
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = new Date(today.getTime() - offset * dayMs);
      let key = date.toISOString().slice(0, 10);
      try { if (typeof localDayKey === "function") key = localDayKey(date.getTime()); } catch {}
      const entry = state.dailyHistory?.[key] || state.dailyClaims?.[key] || null;
      days.push({
        key,
        active: Boolean(entry),
        score: Number(entry?.score || 0),
        label: offset === 0 ? "Auj." : date.toLocaleDateString("fr-FR", { weekday: "short" }).replace(".", "")
      });
    }
    return days;
  }

  function profileBestRank(s) {
    const rows = [];
    Object.values(s.leaderboards || {}).forEach(list => {
      if (!Array.isArray(list)) return;
      const me = list.find(item => item.me || String(item.playerId || item.id || "") === String(meId()));
      if (me?.rank) rows.push(Number(me.rank));
    });
    return rows.length ? Math.min(...rows) : null;
  }

  function profileTitleFor(discipline) {
    const labels = {
      history: "Explorateur du temps",
      art: "Œil de collectionneur",
      cinema: "Cinéphile curieux",
      "science-inventions": "Esprit scientifique",
      economy: "Décrypteur du monde",
      geography: "Voyageur des cartes",
      music: "Oreille exploratrice",
      astronomy: "Voyageur cosmique"
    };
    return labels[discipline?.id] || "Explorateur de savoirs";
  }

  function profileLevelTitle(level) {
    const value = Math.max(1, Number(level || 1));
    if (value >= 12) return "Maître des savoirs";
    if (value >= 8) return "Érudit confirmé";
    if (value >= 5) return "Connaisseur";
    if (value >= 3) return "Explorateur";
    return "Curieux en éveil";
  }

  function profileHeroMarkup(model) {
    const s = social();
    const profile = s.profile || identityPayload();
    const xp = Math.max(Number(state.xp || 0), Number(profile.xp || 0));
    const levelNumber = Math.max(1, Number(profile.level || levelValue()));
    const levelBase = Math.max(0, (levelNumber - 1) * 250);
    const levelXp = Math.max(0, Math.min(250, xp - levelBase));
    const levelPct = Math.max(3, Math.min(100, Math.round(levelXp / 250 * 100)));
    const xpRemaining = Math.max(0, 250 - levelXp);
    const solved = Math.max(solvedTotal(), Number(profile.solvedCount || profile.solved_count || 0));
    const streak = Math.max(Number(state.streak || 0), Number(profile.streak || 0));
    const accent = model.favorite.discipline.accent || "#f6c453";
    const levelTitle = profileLevelTitle(levelNumber);
    return `<section class="hd257-hero hd281-hero" style="--profile-accent:${esc(accent)};--level-progress:${levelPct * 3.6}deg">
      <div class="hd257-hero-glow" aria-hidden="true"></div>
      <div class="hd257-avatar hd281-avatar"><div>${esc(profileInitials())}</div><span>Niveau ${levelNumber}</span></div>
      <div class="hd257-hero-copy hd281-hero-copy"><span class="hd281-rank-label">Rang · ${esc(levelTitle)}</span><h2>${esc(pseudo())}</h2><p>${profileDisciplineIcon(model.favorite)} ${esc(profileTitleFor(model.favorite.discipline))} · ${esc(model.favorite.discipline.title || "Culture générale")} est ton univers le plus exploré.</p></div>
      <div class="hd257-hero-numbers hd281-hero-numbers"><div><b>${xp.toLocaleString("fr-FR")}</b><small>XP accumulés</small></div><div><b>${streak}</b><small>${streak === 1 ? "jour de série" : "jours de série"}</small></div><div><b>${solved}</b><small>${solved === 1 ? "dossier résolu" : "dossiers résolus"}</small></div></div>
      <div class="hd257-level-line hd281-level-line"><div><span>Niveau ${levelNumber} · ${levelXp}/250 XP</span><b>${xpRemaining ? `${xpRemaining} XP avant le niveau ${levelNumber + 1}` : "Niveau suivant atteint"}</b></div><i role="progressbar" aria-label="Progression vers le niveau suivant" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${levelPct}"><em style="width:${levelPct}%"></em></i></div>
    </section>`;
  }

  function profilePlanetMarkup(item, className, role) {
    const accent = item.discipline.accent || "#f6c453";
    return `<article class="hd257-planet ${className}" style="--planet-accent:${esc(accent)}">
      <span>${profileDisciplineIcon(item)}</span><div><small>${esc(role)}</small><b>${esc(item.discipline.title || "Culture")}</b><em>${item.progress}% exploré</em></div>
    </article>`;
  }

  function profileOrbitMarkup(model) {
    return `<section class="hd257-orbit-card" style="--profile-accent:${esc(model.favorite.discipline.accent || "#f6c453")}">
      <header class="hd257-section-head"><div><span>Carte de curiosité</span><h2>Ton système solaire</h2><p>Tes domaines les plus explorés prennent de la place autour de toi. La carte évolue avec tes cours validés.</p></div><button type="button" class="ghost" data-profile-map>Voir la carte</button></header>
      <div class="hd257-orbit-stage" aria-label="Système de curiosité de ${esc(pseudo())}">
        <div class="hd257-starfield" aria-hidden="true"></div>
        <i class="hd257-orbit orbit-one" aria-hidden="true"></i><i class="hd257-orbit orbit-two" aria-hidden="true"></i><i class="hd257-orbit orbit-three" aria-hidden="true"></i>
        <div class="hd257-sun"><strong>${esc(profileInitials())}</strong><span>Toi</span></div>
        ${profilePlanetMarkup(model.favorite, "planet-favorite", "Affinité principale")}
        ${profilePlanetMarkup(model.second, "planet-second", "Deuxième univers")}
        ${profilePlanetMarkup(model.third, "planet-third", "Autre affinité")}
        ${profilePlanetMarkup(model.unexplored, "planet-next", "À découvrir")}
      </div>
      <div class="hd257-affinity-strip">${[model.favorite, model.second, model.third].map((item, index) => `<button type="button" data-profile-discipline="${esc(item.discipline.id)}" style="--domain-accent:${esc(item.discipline.accent || "#f6c453")}"><span>${profileDisciplineIcon(item)}</span><div><small>${index === 0 ? "Domaine favori" : "Affinité"}</small><b>${esc(item.discipline.title)}</b></div><em>${item.done}/${item.total || 0}</em></button>`).join("")}</div>
    </section>`;
  }

  function profileRhythmMarkup() {
    const days = profileActivityDays();
    const active = days.filter(day => day.active).length;
    return `<article class="hd257-rhythm-card"><header><div><span>Rythme</span><h3>7 derniers jours</h3></div><b>${active}/7</b></header><div class="hd257-week-dots">${days.map(day => `<div class="${day.active ? "active" : ""}${day.label === "Auj." ? " today" : ""}"><span>${day.active ? "✓" : "·"}</span><small>${esc(day.label)}</small></div>`).join("")}</div><p>${active >= 5 ? "Très belle régularité cette semaine." : active >= 2 ? "La série prend forme : garde le rythme." : "Un petit passage quotidien suffit pour relancer la série."}</p></article>`;
  }

  function profileCommunityMarkup(s) {
    const incoming = s.requests?.incoming?.length || 0;
    const bestRank = profileBestRank(s);
    const ready = s.phase === "ready";
    return `<article class="hd257-community-card"><header><div><span>Communauté</span><h3>Ta place parmi les joueurs</h3></div><i class="${ready ? "online" : ""}" title="${esc(s.message || "État du multi")}"></i></header><div class="hd257-community-stats"><div><b>${s.friends.length}</b><small>amis</small></div><div><b>${incoming || "0"}</b><small>demandes</small></div><div><b>${bestRank ? `#${bestRank}` : "—"}</b><small>meilleur rang</small></div></div><div class="hd257-community-actions"><button type="button" data-profile-rank="daily">Classement</button><button type="button" class="ghost" data-profile-rank="friends">Entre amis</button></div>${incoming ? `<p class="hd257-community-alert">${incoming} demande${incoming > 1 ? "s" : ""} à traiter plus bas.</p>` : ""}</article>`;
  }

  function profileProgressMarkup(model) {
    return `<section class="hd257-progress-card"><header class="hd257-section-head"><div><span>Progression</span><h2>Tes domaines</h2><p>Un aperçu concret des cours terminés dans chaque univers.</p></div><b>${model.average}%<small>moyenne</small></b></header><div class="hd257-progress-grid">${model.rows.map(item => `<button type="button" data-profile-discipline="${esc(item.discipline.id)}" style="--domain-accent:${esc(item.discipline.accent || "#f6c453")}"><span>${profileDisciplineIcon(item)}</span><div><strong>${esc(item.discipline.title)}</strong><small>${item.done}/${item.total || 0} cours</small><i><em style="width:${item.progress}%"></em></i></div><b>${item.progress}%</b></button>`).join("")}</div></section>`;
  }

  function profileCollectionsMarkup() {
    const unlocked = profileUnlockedCollections();
    const completed = profileCompletedLessons();
    const derived = [
      { title: "Premier parcours", icon: profileActionIcon("lesson"), unlocked: completed >= 3 },
      { title: "Explorateur régulier", icon: profileActionIcon("spark"), unlocked: Number(state.streak || 0) >= 7 },
      { title: "Chasseur de mystères", icon: profileActionIcon("mystery"), unlocked: solvedTotal() >= 10 }
    ];
    const cards = unlocked.slice(0, 5).map(item => ({ ...item, unlocked: true }));
    derived.forEach(item => { if (cards.length < 6 && !cards.some(card => card.title === item.title)) cards.push(item); });
    while (cards.length < 6) cards.push({ title: "Prochaine collection", icon: profileActionIcon("lock"), unlocked: false });
    const displayedUnlocked = cards.filter(card => card.unlocked).length;
    return `<section class="hd257-collections-card"><header class="hd257-section-head"><div><span>Collections</span><h2>Trophées d’exploration</h2><p>Les médailles gardent la trace des parcours que tu as vraiment terminés.</p></div><b>${displayedUnlocked}<small>sur ${cards.length}</small></b></header><div class="hd257-medal-rail">${cards.map(card => `<article class="${card.unlocked ? "unlocked" : "locked"}"><div>${profileCollectionIcon(card.icon)}</div><span>${card.unlocked ? "Débloquée" : "À découvrir"}</span><b>${esc(card.title)}</b></article>`).join("")}</div></section>`;
  }

  function profileAchievementsMarkup(s) {
    const achievements = profileAchievements(s);
    const count = achievements.filter(item => item.on).length;
    const completion = Math.round(count / Math.max(1, achievements.length) * 100);
    const next = achievements.filter(item => !item.on).sort((a, b) => b.progress - a.progress || a.order - b.order)[0] || null;
    const nextMarkup = next
      ? `<div class="hd281-next-success"><div class="hd281-next-icon">${profileActionIcon(next.icon)}</div><div><span>Prochain succès</span><h3>${esc(next.label)}</h3><p>${esc(next.description)}</p><div class="hd281-next-progress"><i><em style="width:${next.progress}%"></em></i><b>${esc(next.progressLabel)}</b></div></div></div>`
      : `<div class="hd281-next-success complete"><div class="hd281-next-icon">${profileActionIcon("trophy")}</div><div><span>Collection complète</span><h3>Tous les succès sont débloqués</h3><p>Ton profil raconte déjà un parcours remarquable.</p></div></div>`;
    return `<section class="hd257-achievements-card hd281-achievements-card"><header class="hd257-section-head"><div><span>Succès</span><h2>Ton carnet d’exploits</h2><p>Chaque succès correspond à une action réelle dans HistoDaily. Les objectifs verrouillés indiquent exactement ce qu’il reste à accomplir.</p></div><b>${count}/${achievements.length}<small>${completion}%</small></b></header>${nextMarkup}<div class="hd281-achievement-grid">${achievements.map(item => `<article class="hd281-achievement ${item.on ? "on" : "off"}" aria-label="${esc(item.label)} — ${esc(item.progressLabel)}"><div class="hd281-achievement-icon">${profileActionIcon(item.icon)}</div><div class="hd281-achievement-copy"><span>${esc(item.group)}</span><h3>${esc(item.label)}</h3><p>${esc(item.description)}</p></div><div class="hd281-achievement-status"><i><em style="width:${item.progress}%"></em></i><b>${esc(item.progressLabel)}</b></div></article>`).join("")}</div></section>`;
  }

  function profileIdentityMarkup(s) {
    return `<section class="card hdsv2-card hdsv2-identity-card"><div><span class="card-label">Identité</span><h2>Pseudo et code ami</h2><p>Cette identité est commune au profil, aux amis et aux classements.</p></div><form data-social-pseudo><input type="text" name="pseudo" value="${esc(pseudo())}" maxlength="18" autocomplete="nickname"/><button type="submit">Enregistrer</button></form><div class="hdsv2-code-box"><span>${esc(meCode())}</span><button type="button" class="ghost" data-copy-social-code>Copier</button></div>${s.feedback ? `<p class="hdsv2-feedback">${esc(s.feedback)}</p>` : ""}</section>`;
  }

  function profileDetailsMarkup(s) {
    const incoming = s.requests?.incoming?.length || 0;
    return `<details class="hd257-fold hd257-community-fold"><summary><span>${profileActionIcon("users")}</span><div><b>Amis et demandes</b><small>${s.friends.length} ami${s.friends.length > 1 ? "s" : ""}${incoming ? ` · ${incoming} à traiter` : " · gérer la communauté"}</small></div><em>›</em></summary><div class="hd257-fold-body">${requestMarkup()}${friendsMarkup({ includeAdd: true })}</div></details>
      <details class="hd257-fold"><summary><span>${profileActionIcon("settings")}</span><div><b>Compte et réglages</b><small>Pseudo, sauvegarde et préférences</small></div><em>›</em></summary><div class="hd257-fold-body">${profileIdentityMarkup(s)}${typeof backupToolsMarkup === "function" ? backupToolsMarkup() : ""}${typeof profileSettingsMarkup === "function" ? profileSettingsMarkup() : ""}</div></details>`;
  }

  renderProfile = function socialV2RenderProfile() {
    const s = social();
    const model = profileCuriosityModel();
    renderShell(`<div class="hdsv2-screen hdsv2-profile-screen hd257-profile-root hd34-profile-root">
      <header class="hd257-page-head hd34-profile-head"><div><p class="eyebrow">Profil</p><h1>${esc(pseudo())}</h1></div></header>
      ${profileHeroMarkup(model)}
      <section class="hd257-dashboard">${profileRhythmMarkup()}${profileCommunityMarkup(s)}</section>
      ${profileProgressMarkup(model)}
      <details class="hd257-fold hd34-profile-fold"><summary><span>${profileActionIcon("spark")}</span><div><b>Carte de curiosité et collections</b><small>Affinités, univers explorés et trophées</small></div><em>›</em></summary><div class="hd257-fold-body hd34-profile-fold-body">${profileOrbitMarkup(model)}${profileCollectionsMarkup()}</div></details>
      <details class="hd257-fold hd34-profile-fold"><summary><span>${profileActionIcon("trophy")}</span><div><b>Succès</b><small>Objectifs débloqués et prochain défi</small></div><em>›</em></summary><div class="hd257-fold-body hd34-profile-fold-body">${profileAchievementsMarkup(s)}</div></details>
      ${profileDetailsMarkup(s)}
    </div>`);
    sealSocialProfileShell();
    requestAnimationFrame(sealSocialProfileShell);

    document.querySelector("[data-home]")?.addEventListener("click", () => setState({ tab: "home" }));
    document.querySelector("[data-profile-map]")?.addEventListener("click", () => {
      const openMap = window.HistoDaily?.conceptDebug?.openKnowledgeMap;
      if (typeof openMap === "function") openMap();
      else setState({ tab: "learn", currentDiscipline: model.favorite.discipline.id }, { save: true });
    });
    document.querySelectorAll("[data-profile-discipline]").forEach(button => button.addEventListener("click", () => setState({ tab: "learn", currentDiscipline: button.dataset.profileDiscipline, learnDrill: "chapters" }, { save: true })));
    document.querySelector("[data-social-pseudo]")?.addEventListener("submit", async event => {
      event.preventDefault();
      const value = String(new FormData(event.currentTarget).get("pseudo") || "").trim();
      if (!value) return;
      try {
        legacyBridgeMutedUntil = now() + 750;
        if (typeof savePseudoValue === "function") savePseudoValue(value, { source: "social-v2" });
        else state.pseudo = value;
        social().feedback = "Enregistrement du pseudo…";
        renderNow();
        if (bootstrapFlight) await bootstrapFlight.catch(() => null);
        const json = await bootstrap({ force: true, allowPseudoChange: true, quiet: true });
        const canonicalPseudo = String(json?.profile?.pseudo || "").trim();
        social().feedback = !json
          ? "Pseudo conservé localement : synchronisation impossible."
          : canonicalPseudo && canonicalPseudo.localeCompare(value, undefined, { sensitivity: "accent" }) !== 0
            ? `Le serveur a conservé le pseudo ${canonicalPseudo}.`
            : "Pseudo synchronisé.";
      } catch (error) {
        social().feedback = error.message || "Pseudo non synchronisé.";
      }
      saveSoon();
      renderNow();
    });
    document.querySelector("[data-copy-social-code]")?.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(meCode()); social().feedback = "Code ami copié."; }
      catch { social().feedback = meCode(); }
      saveSoon();
      renderNow();
    });
    document.querySelectorAll("[data-profile-rank]").forEach(button => button.addEventListener("click", () => setState({ tab: "rank", rankPeriod: "daily", rankAudience: button.dataset.profileRank === "friends" ? "friends" : "general", rankScope: button.dataset.profileRank }, { save: true })));
    bindCommonSocialHandlers(activeContext());
    document.querySelectorAll("button[data-performance-mode]").forEach(button => button.addEventListener("click", () => setPerformanceMode(button.dataset.performanceMode)));
    document.querySelector("[data-export-save]")?.addEventListener("click", exportLocalSave);
    document.querySelector("[data-download-save]")?.addEventListener("click", downloadLocalSave);
    document.querySelector("[data-import-save]")?.addEventListener("click", importLocalSave);

    const profileRetryReady = !Number(s.lastAttemptAt || 0) || now() - Number(s.lastAttemptAt || 0) >= STALE_MS;
    if ((!s.loadedAt || now() - s.loadedAt > STALE_MS) && s.phase !== "loading" && profileRetryReady) bootstrap({ quiet: true }).then(() => { if (state.tab === "profile") renderNow(); });
  };

  function fallbackPublicProfile(id) {
    const s = social();
    const friend = s.friends.find(item => sameSocialPlayer(item, String(id || ""), code(id || ""))) || null;
    const rows = Object.values(s.leaderboards || {}).flatMap(list => Array.isArray(list) ? list : []);
    const match = rows.find(item => sameSocialPlayer(item, String(id || ""), code(id || ""))) || null;
    const base = friend || match;
    if (!base) return null;
    const scores = {};
    const ranks = {};
    ["daily", "week", "year"].forEach(period => {
      const row = rowsFor(period, "general").find(item => sameSocialPlayer(item, base.playerId || id, base.friendCode || base.code || ""))
        || rowsFor(period, "friends").find(item => sameSocialPlayer(item, base.playerId || id, base.friendCode || base.code || ""));
      scores[period] = Number(row?.score || 0);
      ranks[period] = Number(row?.rank || 0);
    });
    return {
      playerId: base.playerId || base.id || String(id || ""),
      friendCode: code(base.friendCode || base.code || ""),
      pseudo: base.pseudo || base.name || "Joueur",
      level: Number(base.level || 1),
      xp: Number(base.xp || 0),
      solvedCount: Number(base.solvedCount || base.solved_count || base.solved || 0),
      streak: Number(base.streak || 0),
      scores,
      ranks,
      partial: true
    };
  }

  async function loadPublicProfile(id, { force = false } = {}) {
    if (!id) return null;
    const s = social();
    const cached = s.publicProfiles[id] || {};
    if (!force && cached.loadedAt && now() - cached.loadedAt < STALE_MS && cached.profile) return cached.profile;
    if (publicProfileFlights.has(id)) return publicProfileFlights.get(id);

    s.publicProfiles[id] = { ...cached, phase: "loading", message: "Chargement du profil partagé…" };
    saveSoon();
    const linkedFriend = s.friends.find(friend =>
      String(friend.playerId || friend.id || "") === String(id) ||
      Boolean(code(friend.friendCode || friend.code || "") && code(friend.friendCode || friend.code || "") === code(id))
    );
    const targetPlayerId = linkedFriend?.playerId || (linkedFriend ? "" : id);
    const targetFriendCode = code(linkedFriend?.friendCode || linkedFriend?.code || "");
    const flight = api("profile", {
      timeout: 12_000,
      query: {
        playerId: targetPlayerId,
        friendCode: targetFriendCode,
        myPlayerId: meId(),
        myFriendCode: meCode(),
        myPseudo: pseudo(),
        periodKey: typeof localDayKey === "function" ? localDayKey() : new Date().toISOString().slice(0, 10)
      }
    }).then(json => {
      s.publicProfiles[id] = { profile: json.profile, loadedAt: now(), phase: "ready", message: "Profil partagé à jour." };
      saveSoon();
      return json.profile;
    }).catch(error => {
      const fallback = cached.profile || fallbackPublicProfile(id);
      s.publicProfiles[id] = {
        ...cached,
        profile: fallback || null,
        loadedAt: cached.loadedAt || (fallback ? now() : 0),
        phase: fallback ? "stale" : "error",
        message: fallback ? "Profil partiel affiché depuis les données déjà synchronisées." : (error.message || "Profil partagé indisponible.")
      };
      saveSoon();
      return fallback || null;
    }).finally(() => publicProfileFlights.delete(id));
    publicProfileFlights.set(id, flight);
    return flight;
  }

  function sameSocialPlayer(item = {}, targetId = "", targetCode = "") {
    const ids = [item.playerId, item.id, item.otherPlayerId, item.requesterPlayerId, item.targetPlayerId]
      .map(value => String(value || "")).filter(Boolean);
    const codes = [item.friendCode, item.code, item.otherFriendCode, item.requesterFriendCode, item.targetFriendCode]
      .map(value => code(value || "")).filter(Boolean);
    return Boolean((targetId && ids.includes(String(targetId))) || (targetCode && codes.includes(code(targetCode))));
  }

  function relationForPlayer(id, player = null) {
    const targetId = String(player?.playerId || player?.id || id || "");
    const targetCode = code(player?.friendCode || player?.code || "");
    if ((targetId && targetId === String(meId() || "")) || (targetCode && targetCode === code(meCode()))) {
      return { status: "self", targetId, targetCode };
    }
    const s = social();
    const friend = s.friends.find(item => sameSocialPlayer(item, targetId, targetCode));
    if (friend) return { status: "friend", targetId, targetCode, friend };
    const incoming = (s.requests.incoming || []).find(item => sameSocialPlayer(item, targetId, targetCode));
    if (incoming) return { status: "incoming", targetId, targetCode, request: incoming };
    const outgoing = (s.requests.outgoing || []).find(item => sameSocialPlayer(item, targetId, targetCode));
    if (outgoing) return { status: "outgoing", targetId, targetCode, request: outgoing };
    return { status: "none", targetId, targetCode };
  }

  function acceptedFriend(id, player = null) {
    return relationForPlayer(id, player).status === "friend";
  }

  function publicProfileActionMarkup(player, id) {
    const relation = relationForPlayer(id, player);
    const flightKey = relation.targetId || relation.targetCode || id;
    const busy = profileFriendFlights.has(flightKey);
    if (relation.status === "self") return "";
    if (relation.status === "friend") {
      return `<section class="card hdsv2-card hd273-relation-card is-friend"><div><span class="card-label">Relation</span><h2>Vous êtes amis</h2><p>Ce joueur apparaît dans ton classement Amis, même sans point sur la période.</p></div><button type="button" class="ghost wide" data-social-remove="${esc(player.playerId || id)}">Retirer des amis</button></section>`;
    }
    if (relation.status === "incoming") {
      return `<section class="card hdsv2-card hd273-relation-card is-incoming"><div><span class="card-label">Demande reçue</span><h2>${esc(player.pseudo || "Ce joueur")} veut t’ajouter</h2><p>Accepte ici sans avoir à recopier son code ami.</p></div><button type="button" class="wide" data-social-respond="accept" data-request-id="${esc(relation.request?.requestId || relation.request?.id || "")}">${busy ? "Acceptation…" : "Accepter la demande"}</button></section>`;
    }
    if (relation.status === "outgoing") {
      return `<section class="card hdsv2-card hd273-relation-card is-pending"><div><span class="card-label">Demande envoyée</span><h2>En attente de réponse</h2><p>La demande est déjà enregistrée. Elle sera visible sur l’autre téléphone après actualisation.</p></div><button type="button" class="wide" disabled>Demande envoyée</button></section>`;
    }
    return `<section class="card hdsv2-card hd273-relation-card"><div><span class="card-label">Communauté</span><h2>Ajouter ${esc(player.pseudo || "ce joueur")}</h2><p>La demande utilise directement son profil : aucun code à recopier.</p></div><button type="button" class="wide" data-social-add-profile data-target-player-id="${esc(player.playerId || id)}" data-target-friend-code="${esc(player.friendCode || "")}" data-target-pseudo="${esc(player.pseudo || "Joueur")}" ${busy ? "disabled" : ""}>${busy ? "Envoi…" : "Ajouter en ami"}</button></section>`;
  }

  viewProfile = function socialV2ViewProfile(id) {
    if (!id || id === meId()) return setState({ tab: "profile" });
    social().feedback = "";
    setState({ tab: "publicProfile", selectedProfileId: id }, { save: true });
    loadPublicProfile(id).then(() => {
      if (state.tab === "publicProfile" && state.selectedProfileId === id) renderNow();
    });
  };

  renderPublicProfile = function socialV2RenderPublicProfile() {
    const id = state.selectedProfileId || "";
    const record = social().publicProfiles[id] || {};
    const player = record.profile;
    const body = player
      ? `<section class="card hdsv2-card hdsv2-profile-summary hd273-public-card"><div class="hdsv2-profile-hero"><div class="hdsv2-profile-avatar">${esc((player.pseudo || "J").charAt(0).toUpperCase())}</div><div><span class="card-label">Profil public</span><h2>${esc(player.pseudo || "Joueur")}</h2><p>Niveau ${Number(player.level || 1)} · ${Number(player.xp || 0)} XP</p></div></div><div class="hd273-public-stats"><div><b>${Number(player.streak || 0)}</b><span>jours de série</span></div><div><b>${Number(player.solvedCount || 0)}</b><span>dossiers résolus</span></div></div><div class="hd273-score-grid">${[['daily', 'Aujourd’hui'], ['week', 'Semaine'], ['year', 'Année']].map(([period, label]) => `<div><span>${label}</span><b>${Number(player.scores?.[period] || 0)} ${period === 'year' ? 'XP' : 'pts'}</b><small>${Number(player.ranks?.[period] || 0) ? `#${Number(player.ranks[period])} au général` : "Pas encore classé"}</small></div>`).join("")}</div>${player.partial ? `<p class="hd274-partial-profile">Données partielles : une actualisation complétera ce profil dès que le serveur répondra.</p>` : ""}</section>${publicProfileActionMarkup(player, id)}${social().feedback ? `<p class="hdsv2-feedback hd273-profile-feedback" role="status">${esc(social().feedback)}</p>` : ""}`
      : record.phase === "error"
        ? `<section class="card hdsv2-card"><div class="hdsv2-empty error"><strong>Profil indisponible</strong><p>${esc(record.message || "Le serveur n’a pas répondu.")}</p><button type="button" data-public-profile-retry>Réessayer</button></div></section>`
        : `<section class="card hdsv2-card"><div class="hdsv2-loading"><span></span><span></span><span></span><p>${esc(record.message || "Chargement du profil partagé…")}</p></div></section>`;

    renderShell(`<div class="hdsv2-screen hdsv2-public-profile"><header class="hdsv2-topbar"><div><p class="eyebrow">Profil joueur</p><h1>${esc(player?.pseudo || (record.phase === "error" ? "Profil indisponible" : "Chargement…"))}</h1></div><button type="button" class="ghost" data-back-social>Retour</button></header>${body}</div>`);
    document.querySelector("[data-back-social]")?.addEventListener("click", () => setState({ tab: "rank" }));
    document.querySelector("[data-public-profile-retry]")?.addEventListener("click", () => {
      loadPublicProfile(id, { force: true }).then(() => { if (state.tab === "publicProfile") renderNow(); });
      renderNow();
    });
    document.querySelector("[data-social-add-profile]")?.addEventListener("click", event => {
      const button = event.currentTarget;
      requestFriendFromProfile({
        playerId: button.dataset.targetPlayerId || player?.playerId || id,
        friendCode: button.dataset.targetFriendCode || player?.friendCode || "",
        pseudo: button.dataset.targetPseudo || player?.pseudo || "Joueur"
      });
    });
    bindCommonSocialHandlers(activeContext());
    // Une erreur reste stable jusqu'à une action explicite : pas de boucle réseau.
    if (!player && (!record.phase || record.phase === "idle")) {
      loadPublicProfile(id).then(() => { if (state.tab === "publicProfile") renderNow(); });
    }
  };

  async function requestFriendFromProfile(target = {}) {
    const s = social();
    const targetPlayerId = String(target.playerId || "");
    const targetFriendCode = code(target.friendCode || "");
    const key = targetPlayerId || targetFriendCode;
    if (!key || profileFriendFlights.has(key)) return profileFriendFlights.get(key) || null;
    profileFriendFlights.set(key, null);
    const flight = (async () => {
      s.feedback = `Envoi de la demande à ${target.pseudo || "ce joueur"}…`;
      saveSoon();
      renderNow();
      try {
        const json = await api("friends/request", {
          method: "POST",
          body: identityPayload({ targetPlayerId, targetFriendCode })
        });
        applySnapshot(json, { quiet: true });
        s.feedback = json.message || "Demande envoyée.";
        await loadLeaderboard(activeContext().period, "friends", { force: true, quiet: true });
        return json;
      } catch (error) {
        s.feedback = error.message || "Demande non envoyée.";
        return null;
      } finally {
        profileFriendFlights.delete(key);
        saveSoon();
        renderNow();
      }
    })();
    profileFriendFlights.set(key, flight);
    return flight;
  }

  addFriend = async function socialV2AddFriend(event) {
    event?.preventDefault?.();
    const s = social();
    const form = event?.currentTarget || event?.target;
    const input = form?.querySelector?.("input[name='friendCode'], input");
    const target = code(input?.value || state.friendCodeDraft || "");
    if (!target) {
      s.feedback = "Entre un code ami complet.";
      saveSoon();
      return renderNow();
    }
    if (target === code(meCode())) {
      s.feedback = "C’est ton propre code ami.";
      saveSoon();
      return renderNow();
    }
    s.feedback = "Envoi de la demande…";
    renderNow();
    try {
      const json = await api("friends/request", { method: "POST", body: identityPayload({ targetFriendCode: target }) });
      applySnapshot(json, { quiet: true });
      s.feedback = json.message || "Demande envoyée.";
      state.friendCodeDraft = "";
      if (input) input.value = "";
      await loadLeaderboard(activeContext().period, "friends", { force: true, quiet: true });
    } catch (error) {
      s.feedback = error.message || "Demande non envoyée.";
    }
    saveSoon();
    renderNow();
  };

  async function respondFriendRequest(requestId, response) {
    const s = social();
    s.feedback = response === "accept" ? "Acceptation…" : "Refus…";
    renderNow();
    try {
      const json = await api("friends/respond", { method: "POST", body: identityPayload({ requestId, response }) });
      applySnapshot(json, { quiet: true });
      s.feedback = json.message || "Demande traitée.";
      await loadLeaderboard(activeContext().period, "friends", { force: true, quiet: true });
    } catch (error) {
      s.feedback = error.message || "Impossible de traiter la demande.";
    }
    saveSoon();
    renderNow();
  }

  removeFriend = async function socialV2RemoveFriend(id) {
    const s = social();
    const friend = s.friends.find(item => item.playerId === id || item.id === id || code(item.friendCode) === code(id));
    if (!friend) return;
    const friendName = friend.pseudo || friend.name || "cet ami";
    if (typeof window.confirm === "function" && !window.confirm(`Retirer ${friendName} de tes amis ? Vos profils resteront intacts, mais il disparaîtra du classement Amis.`)) return;
    s.feedback = `Suppression de ${friendName}…`;
    renderNow();
    try {
      const json = await api("friends/remove", { method: "DELETE", body: identityPayload({ friendPlayerId: friend.playerId, friendCodeTarget: friend.friendCode }) });
      applySnapshot(json, { quiet: true });
      s.feedback = json.message || "Ami retiré.";
      await loadLeaderboard(activeContext().period, "friends", { force: true, quiet: true });
    } catch (error) {
      s.feedback = error.message || "Suppression impossible.";
    }
    saveSoon();
    renderNow();
  };

  function invalidateLeaderboards() {
    const s = social();
    Object.keys(s.leaderboardStatus).forEach(key => {
      s.leaderboardStatus[key] = {
        ...s.leaderboardStatus[key],
        phase: Array.isArray(s.leaderboards[key]) ? "stale" : "idle",
        loadedAt: 0,
        message: "Nouveau score à intégrer."
      };
    });
  }

  async function sendScorePayload(payload) {
    const prepared = scorePayloadWithEligibility(payload || {});
    if (!prepared.rankingEligible) {
      markScoreNotRanked(prepared.mysteryId);
      return { ok: true, stored: false, skipped: true, mode: "not-ranked", message: "Archive conservée dans la progression, hors classement." };
    }
    // L'identité canonique gagne toujours sur l'identité ancienne éventuellement
    // conservée dans une file locale après changement d'appareil ou réconciliation.
    const json = await api("score", { method: "POST", body: { ...prepared, ...identityPayload() } });
    if (!json.stored && !json.skipped) throw new Error(json.message || "Score non enregistré.");
    adoptIdentity(json);
    return json;
  }

  submitScoreToServer = async function socialV2SubmitScore(payload) {
    const json = await sendScorePayload(payload);
    if (json.skipped) return json;
    invalidateLeaderboards();
    const context = activeContext();
    setTimeout(() => {
      loadLeaderboard(context.period, context.audience, { force: true, quiet: true }).catch(() => {});
      if (context.audience !== "friends") loadLeaderboard(context.period, "friends", { force: true, quiet: true }).catch(() => {});
    }, 0);
    return json;
  };

  async function socialV2FlushScoreOutbox({ force = false, reason = "auto" } = {}) {
    if (scoreFlushFlight) return scoreFlushFlight;
    if (typeof beta128ReadScoreOutbox !== "function" || typeof beta128SaveScoreOutbox !== "function") return null;
    let outbox = purgeIneligibleScoreOutbox();
    if (!outbox.length) return { storedCount: 0, pendingCount: 0 };
    if (!online()) {
      outbox.forEach(item => {
        item.lastMode = "offline";
        item.lastMessage = "Hors ligne : renvoi prévu au retour du réseau.";
      });
      beta128SaveScoreOutbox(outbox);
      return { storedCount: 0, pendingCount: outbox.length };
    }

    const startedAt = now();
    const due = outbox.filter(item => force || !item.nextTryAt || Number(item.nextTryAt) <= startedAt).slice(0, 18);
    if (!due.length) return { storedCount: 0, pendingCount: outbox.length };

    scoreFlushFlight = (async () => {
      let storedCount = 0;
      for (const rawItem of due) {
        const payload = typeof beta128CleanScorePayload === "function" ? beta128CleanScorePayload(rawItem) : rawItem;
        const key = typeof beta128ScoreKey === "function" ? beta128ScoreKey(payload) : `${payload.mysteryId}|${payload.periodKey || payload.dayKey}`;
        try {
          state.lastScoreSubmit = { ...(state.lastScoreSubmit || {}), [payload.mysteryId]: { pending: true, stored: false, mode: "social-v2", message: "Envoi vers le classement partagé…" } };
          const result = await sendScorePayload(payload);
          if (typeof beta128RemoveScorePayload === "function") beta128RemoveScorePayload(payload);
          else beta128SaveScoreOutbox(beta128ReadScoreOutbox().filter(item => (typeof beta128ScoreKey === "function" ? beta128ScoreKey(item) : `${item.mysteryId}|${item.periodKey || item.dayKey}`) !== key));
          if (result.skipped) {
            markScoreNotRanked(payload.mysteryId);
          } else {
            storedCount += 1;
            state.lastScoreSubmit = { ...(state.lastScoreSubmit || {}), [payload.mysteryId]: { pending: false, stored: true, mode: result.mode || "supabase-atomic", message: result.message || "Score synchronisé.", syncedAt: now() } };
          }
        } catch (error) {
          const permanent = [400, 422].includes(Number(error?.status || 0));
          const current = beta128ReadScoreOutbox();
          if (permanent) {
            beta128SaveScoreOutbox(current.filter(item => {
              const itemKey = typeof beta128ScoreKey === "function" ? beta128ScoreKey(item) : `${item.mysteryId}|${item.periodKey || item.dayKey}`;
              return itemKey !== key;
            }));
          } else {
            beta128SaveScoreOutbox(current.map(item => {
              const itemKey = typeof beta128ScoreKey === "function" ? beta128ScoreKey(item) : `${item.mysteryId}|${item.periodKey || item.dayKey}`;
              if (itemKey !== key) return item;
              const retryCount = Number(item.retryCount || 0) + 1;
              const delay = typeof beta128RetryDelayMs === "function" ? beta128RetryDelayMs({ ...item, retryCount, lastMode: "error" }) : Math.min(600000, 15000 * Math.pow(1.7, retryCount));
              return { ...item, retryCount, lastMode: "error", lastMessage: error.message || "Connexion instable : renvoi automatique prévu.", nextTryAt: now() + delay, updatedAt: now(), lastAttemptAt: now() };
            }));
          }
          state.lastScoreSubmit = { ...(state.lastScoreSubmit || {}), [payload.mysteryId]: { pending: false, stored: false, mode: permanent ? "rejected" : "error", message: permanent ? "Score refusé car les données locales sont invalides." : (error.message || "Score gardé localement pour un nouveau renvoi.") } };
        }
      }
      if (storedCount) {
        invalidateLeaderboards();
        const context = activeContext();
        await loadLeaderboard(context.period, context.audience, { force: true, quiet: true }).catch(() => []);
      }
      saveSoon();
      const pendingCount = purgeIneligibleScoreOutbox().length;
      if (pendingCount && online()) {
        setTimeout(() => socialV2FlushScoreOutbox({ force: false, reason: "continue-drain" }).catch(() => {}), 750);
      }
      return { storedCount, pendingCount, reason };
    })().finally(() => {
      scoreFlushFlight = null;
      if (["home", "rank", "profile", "mystery"].includes(state.tab)) renderNow();
    });
    return scoreFlushFlight;
  }

  function queueRecoveredScores() {
    if (typeof beta128QueueScorePayload !== "function" || typeof scorePayloadForMystery !== "function") return;
    Object.entries(state.solvedMysteries || {}).forEach(([mysteryId, solved]) => {
      if (!solved) return;
      if (!scoreEligibleForRanking(mysteryId, solved)) {
        markScoreNotRanked(mysteryId);
        return;
      }
      const status = state.lastScoreSubmit?.[mysteryId];
      if (["rejected", "not-ranked"].includes(status?.mode) || status?.stored) return;
      const solvedAt = Number(solved?.at || 0);
      // Évite de reconstruire indéfiniment une file de scores très anciens après
      // restauration d'une sauvegarde. Les 31 derniers jours couvrent largement
      // une coupure réseau ou un changement d'appareil normal.
      if (!solvedAt || now() - solvedAt > 31 * 86_400_000 || solvedAt > now() + 86_400_000) return;
      beta128QueueScorePayload(scorePayloadWithEligibility(scorePayloadForMystery(mysteryId)), "social-v2-recovery");
    });
  }

  queueScoreSubmit = function socialV2QueueScoreSubmit(mysteryId) {
    if (!mysteryId || typeof scorePayloadForMystery !== "function" || typeof beta128QueueScorePayload !== "function") return;
    const payload = scorePayloadWithEligibility(scorePayloadForMystery(mysteryId));
    if (!payload.rankingEligible) {
      markScoreNotRanked(mysteryId);
      if (typeof beta128RemoveScorePayload === "function") beta128RemoveScorePayload(payload);
      saveSoon();
      if (state.tab === "mystery") renderNow();
      return;
    }
    beta128QueueScorePayload(payload, "solve-social-v2");
    state.lastScoreSubmit = { ...(state.lastScoreSubmit || {}), [mysteryId]: {
      pending: online(), stored: false, mode: online() ? "social-v2-outbox" : "offline",
      message: online() ? "Score en file d’envoi vers le classement partagé…" : "Hors ligne : score gardé et renvoyé automatiquement."
    } };
    saveSoon();
    socialV2FlushScoreOutbox({ force: true, reason: "solve" }).catch(() => {});
    if (state.tab === "mystery") renderNow();
  };

  syncMyProfileToServer = async function socialV2SyncProfile({ source = "profile", allowPseudoChange = false } = {}) {
    if (legacyBridgeMuted() && !allowPseudoChange) return social();
    return bootstrap({ force: true, allowPseudoChange, quiet: source !== "profile" });
  };

  fetchServerFriends = async function socialV2FetchFriends({ force = false } = {}) {
    if (legacyBridgeMuted()) return social().friends;
    return bootstrap({ force, quiet: true });
  };

  fetchServerLeaderboard = async function socialV2FetchLeaderboard(scope = "daily", { force = false } = {}) {
    const context = activeContext();
    if (legacyBridgeMuted()) return scope === "friends" ? rowsFor(context.period, "friends") : rowsFor(safePeriod(scope), "general");
    if (scope === "friends") return loadLeaderboard(context.period, "friends", { force, quiet: true });
    return loadLeaderboard(safePeriod(scope), "general", { force, quiet: true });
  };

  remoteLeaderboardRows = function socialV2RemoteRows(scope = "daily") {
    const context = activeContext();
    return scope === "friends" ? rowsFor(context.period, "friends") : rowsFor(safePeriod(scope), "general");
  };

  leaderboardRows = function socialV2LeaderboardRows(scope = "daily") {
    return remoteLeaderboardRows(scope);
  };

  scoreForScope = function socialV2ScoreForScope(scope = "daily") {
    const context = activeContext();
    const period = scope === "friends" ? context.period : safePeriod(scope);
    const row = scope === "friends" ? myRow(period, "friends") : myRow(period, "general");
    return Math.max(Number(row?.score || 0), Number(localSelfRow(period).score || 0));
  };

  friendProfiles = function socialV2FriendProfiles() {
    return social().friends.map(friend => ({
      id: friend.playerId || friend.id,
      playerId: friend.playerId || "",
      code: code(friend.friendCode || friend.code || ""),
      friendCode: code(friend.friendCode || friend.code || ""),
      name: friend.pseudo || friend.name || "Ami",
      pseudo: friend.pseudo || friend.name || "Ami",
      level: Number(friend.level || 1),
      xp: Number(friend.xp || 0),
      solved: Number(friend.solvedCount || 0),
      streak: Number(friend.streak || 0),
      friend: true,
      server: true
    }));
  };

  const previousMyPlayerProfile = typeof myPlayerProfile === "function" ? myPlayerProfile : null;
  myPlayerProfile = function socialV2MyProfile() {
    const base = previousMyPlayerProfile ? previousMyPlayerProfile() : {};
    return {
      ...base,
      id: meId(),
      playerId: meId(),
      code: meCode(),
      friendCode: meCode(),
      name: pseudo(),
      pseudo: pseudo(),
      daily: scoreForScope("daily"),
      week: scoreForScope("week"),
      year: scoreForScope("year"),
      me: true,
      friend: true
    };
  };

  // Neutralise les anciens sous-moteurs et leurs files locales. Toutes les
  // entrées historiques sont redirigées vers le moteur v2, jamais vers /leaderboard.
  try { beta128FlushScoreOutbox = socialV2FlushScoreOutbox; } catch {}
  try { beta128RefreshLive = () => legacyBridgeMuted() ? null : refreshContext(activeContext()); } catch {}
  try { if (typeof beta125FetchFriendRequests === "function") beta125FetchFriendRequests = async () => legacyBridgeMuted() ? social().requests : bootstrap({ quiet: true }); } catch {}
  try { if (typeof beta128FlushOutgoingRequests === "function") beta128FlushOutgoingRequests = async () => []; } catch {}
  try { if (typeof beta124RefreshSocialData === "function") beta124RefreshSocialData = async () => legacyBridgeMuted() ? null : refreshContext(activeContext()); } catch {}
  try { if (typeof beta141HardSocialRefresh === "function") beta141HardSocialRefresh = async () => refreshContext(activeContext()); } catch {}
  try { if (typeof beta142RepairOnlineSync === "function") beta142RepairOnlineSync = async () => refreshContext(activeContext()); } catch {}

  function scheduleBackgroundRefresh() {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(async () => {
      try {
        repairStuckStates();
        const dayChanged = reconcileDayBoundary();
        if (!online() || !visible()) return;
        await bootstrap({ quiet: true });
        queueRecoveredScores();
        await socialV2FlushScoreOutbox({ force: false, reason: "background-refresh" }).catch(() => null);
        const context = activeContext();
        if (["rank", "profile"].includes(state.tab)) await loadLeaderboard(context.period, context.audience, { force: dayChanged, quiet: true });
        else if (state.tab === "home" && dayChanged) await loadLeaderboard("daily", "general", { force: true, quiet: true });
      } catch {} finally {
        scheduleBackgroundRefresh();
      }
    }, BACKGROUND_REFRESH_MS);
  }

  async function refreshVisibleState({ force = false } = {}) {
    repairStuckStates();
    const dayChanged = reconcileDayBoundary();
    if (!online() || !visible()) return null;
    await bootstrap({ force: force || dayChanged, quiet: true });
    queueRecoveredScores();
    await socialV2FlushScoreOutbox({ force, reason: "visible-refresh" }).catch(() => null);
    const context = activeContext();
    if (["rank", "profile"].includes(state.tab)) await loadLeaderboard(context.period, context.audience, { force: force || dayChanged, quiet: true });
    else if (state.tab === "home" && dayChanged) await loadLeaderboard("daily", "general", { force: true, quiet: true });
    if (["home", "rank", "profile", "publicProfile"].includes(state.tab)) renderNow();
    return social();
  }

  function init() {
    const s = social();
    lastObservedDay = dayKey();
    repairStuckStates();
    // social() applique déjà la migration de version avant de rendre l’état.
    s.version = VERSION;
    window.HD_SOCIAL_V2_ONLY = true;
    state.rankPeriod = safePeriod(state.rankPeriod || state.rankFriendPeriod || (state.rankScope === "friends" ? "daily" : state.rankScope));
    state.rankAudience = safeAudience(state.rankAudience || (state.rankScope === "friends" ? "friends" : "general"));
    purgeIneligibleScoreOutbox();
    saveSoon();

    // Remplace immédiatement l'écran social hérité avant toute requête.
    if (["rank", "profile", "publicProfile"].includes(state.tab)) renderNow();
    const initialContext = activeContext();
    bootstrap({ quiet: true }).then(() => {
      queueRecoveredScores();
      return socialV2FlushScoreOutbox({ force: false, reason: "startup" });
    }).then(() => {
      if (state.tab === "rank") return loadLeaderboard(initialContext.period, initialContext.audience, { quiet: true });
      if (state.tab === "home") return loadLeaderboard("daily", "general", { quiet: true });
      return null;
    }).finally(() => {
      if (["home", "rank", "profile"].includes(state.tab)) renderNow();
    });

    scheduleBackgroundRefresh();
    window.addEventListener("online", () => {
      refreshVisibleState({ force: true }).finally(renderNow);
    });
    window.addEventListener("offline", () => {
      const current = social();
      current.phase = current.loadedAt ? "offline" : "error";
      current.startedAt = 0;
      current.message = current.loadedAt ? "Hors ligne : dernière copie affichée." : "Connexion nécessaire pour charger le multi.";
      Object.keys(current.leaderboardStatus || {}).forEach(key => {
        const status = current.leaderboardStatus[key] || {};
        current.leaderboardStatus[key] = { ...status, startedAt: 0, phase: status.loadedAt ? "offline" : "error", message: status.loadedAt ? "Hors ligne : dernière copie." : "Connexion nécessaire." };
      });
      saveSoon();
      if (["home", "rank", "profile", "publicProfile"].includes(state.tab)) renderNow();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") refreshVisibleState({ force: false }).catch(() => {});
      else saveSoon();
    });
    window.addEventListener("focus", () => refreshVisibleState({ force: false }).catch(() => {}));
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      socialEngine: "v2",
      socialSourceOfTruth: "supabase",
      legacySocialPatches: false,
      legacySocialNetworkDisabled: true
    };
    window.HistoDailySocialV2 = {
      version: VERSION,
      refresh: () => refreshContext(activeContext()),
      flushScores: options => socialV2FlushScoreOutbox(options),
      snapshot: () => JSON.parse(JSON.stringify(social())),
      diagnostics: () => ({
        version: VERSION,
        activeContext: activeContext(),
        pendingScores: typeof beta128PendingScoreCount === "function" ? beta128PendingScoreCount() : 0,
        bootstrapInFlight: Boolean(bootstrapFlight),
        scoreFlushInFlight: Boolean(scoreFlushFlight),
        dayKey: lastObservedDay || dayKey(),
        visible: visible(),
        online: online(),
        legacySocialNetworkDisabled: window.HD_SOCIAL_V2_ONLY === true
      })
    };
  }

  init();
})();

;

/* ===== SOURCE: streak-v265.js ===== */
/* HistoDaily beta 265 — canonical daily streak repair
   Fixes daily streaks that stayed at 0 when a valid daily mystery was solved
   while another discipline was considered active. Repairs today's existing
   completion without granting duplicate gems or duplicate scores. */
(function histodailyBeta265StreakRepair(){
  "use strict";
  const VERSION = "1.0.0-beta.271.0";
  const DAY_MS = 86400000;

  const safe = (fn, fallback = null) => {
    try { const value = fn(); return value == null ? fallback : value; }
    catch { return fallback; }
  };
  const number = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const keyFor = (timestamp = Date.now()) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };
  const timeForKey = key => {
    const parts = String(key || "").split("-").map(Number);
    if (parts.length !== 3 || parts.some(part => !Number.isFinite(part))) return 0;
    return new Date(parts[0], parts[1] - 1, parts[2]).getTime();
  };
  const shiftKey = (key, delta) => {
    const time = timeForKey(key);
    if (!time) return "";
    const date = new Date(time);
    date.setDate(date.getDate() + delta);
    return keyFor(date.getTime());
  };

  function progressSnapshotStreak(){
    try {
      const storageKey = typeof STORAGE_KEY === "string" ? STORAGE_KEY : "histodaily_state";
      const snapshot = JSON.parse(localStorage.getItem(`${storageKey}_progress_v3`) || "null");
      return Math.max(0, number(snapshot?.streak, 0));
    } catch { return 0; }
  }

  function latestRecordedStreak(){
    const records = { ...(state?.dailyHistory || {}), ...(state?.dailyClaims || {}) };
    const latestKey = Object.keys(records).filter(Boolean).sort().pop();
    return latestKey ? Math.max(0, number(records[latestKey]?.streak, 0)) : 0;
  }

  function canonicalStreakValue(){
    return Math.max(
      0,
      number(state?.streak, 0),
      number(state?.socialV2?.profile?.streak, 0),
      latestRecordedStreak(),
      progressSnapshotStreak()
    );
  }

  function adoptCanonicalStreak(){
    const value = canonicalStreakValue();
    if (number(state?.streak, 0) >= value) return false;
    state.streak = value;
    return true;
  }

  function mysteryEverywhere(id){
    if (!id) return null;
    const direct = safe(() => (data.mysteries || []).find(item => String(item?.id) === String(id)), null);
    if (direct) return direct;
    return safe(() => mysteryById(id), null);
  }

  function disciplineForMystery(mystery){
    if (!mystery) return null;
    return safe(() => mysteryDisciplineId(mystery), mystery.discipline || null);
  }

  function canonicalDailyForMystery(id){
    const mystery = mysteryEverywhere(id);
    const disciplineId = disciplineForMystery(mystery);
    if (!mystery || !disciplineId) return null;
    return safe(() => mysteryForDisciplineDayOffset(disciplineId, 0), null);
  }

  function canonicalIsToday(id){
    const daily = canonicalDailyForMystery(id);
    return Boolean(id && daily?.id && String(daily.id) === String(id));
  }

  // The old implementation compared against dailyMystery(), which depends on
  // the currently active discipline. A valid daily dossier from another
  // discipline could therefore be treated as an archive and miss its streak.
  try { isTodayMystery = canonicalIsToday; } catch {}

  function recordForDay(dayKey){
    const claim = state.dailyClaims?.[dayKey];
    const history = state.dailyHistory?.[dayKey];
    return claim || history || null;
  }

  function solvedTodayCandidate(dayKey){
    const solved = state.solvedMysteries || {};
    const candidates = Object.entries(solved)
      .map(([id, entry]) => ({ id, entry: entry || {} }))
      .filter(({ entry }) => keyFor(number(entry.at, 0)) === dayKey)
      .filter(({ id }) => canonicalIsToday(id))
      .sort((a, b) => number(b.entry.at, 0) - number(a.entry.at, 0));
    return candidates[0] || null;
  }

  function consecutiveRecordedDays(endKey){
    let count = 0;
    let cursor = endKey;
    for (let i = 0; i < 3660; i += 1) {
      if (!recordForDay(cursor)) break;
      count += 1;
      cursor = shiftKey(cursor, -1);
      if (!cursor) break;
    }
    return count;
  }

  function previousRecordedStreak(todayKey){
    const yesterday = shiftKey(todayKey, -1);
    const yesterdayRecord = recordForDay(yesterday);
    const explicit = Math.max(
      0,
      number(yesterdayRecord?.streak, 0),
      state.lastDailySolvedKey === yesterday ? number(state.streak, 0) : 0
    );
    return Math.max(explicit, consecutiveRecordedDays(yesterday));
  }

  function desiredTodayStreak(todayKey, existingRecord = null){
    const existing = Math.max(0, number(existingRecord?.streak, 0));
    if (state.lastDailySolvedKey === todayKey) {
      return Math.max(1, existing, number(state.streak, 0), consecutiveRecordedDays(todayKey));
    }
    return Math.max(1, existing, previousRecordedStreak(todayKey) + 1);
  }

  function normalizeTodayRecord(record, mysteryId, todayKey, streak){
    return {
      ...(record && typeof record === "object" ? record : {}),
      mysteryId: record?.mysteryId || mysteryId,
      score: Math.max(0, number(record?.score, number(state.solvedMysteries?.[mysteryId]?.score, 0))),
      gems: Math.max(0, number(record?.gems, 0)),
      streak,
      at: number(record?.at, number(state.solvedMysteries?.[mysteryId]?.at, Date.now())),
      repairedStreak: true,
      repairedAt: number(record?.repairedAt, Date.now())
    };
  }

  function repairTodayStreak({ persist = true, rerender = true } = {}) {
    if (!state || typeof state !== "object") return false;
    let changed = adoptCanonicalStreak();
    const todayKey = safe(() => localDayKey(), keyFor());
    state.dailyClaims = state.dailyClaims && typeof state.dailyClaims === "object" ? state.dailyClaims : {};
    state.dailyHistory = state.dailyHistory && typeof state.dailyHistory === "object" ? state.dailyHistory : {};
    state.solvedMysteries = state.solvedMysteries && typeof state.solvedMysteries === "object" ? state.solvedMysteries : {};
    state.achievements = state.achievements && typeof state.achievements === "object" ? state.achievements : {};

    const existing = recordForDay(todayKey);
    const solved = solvedTodayCandidate(todayKey);
    if (!existing && !solved) {
      if (changed && persist) { try { saveState(); } catch {} }
      if (changed && rerender) { try { render({ immediate: true }); } catch { try { render(); } catch {} } }
      return changed;
    }

    const mysteryId = existing?.mysteryId || solved?.id;
    if (!mysteryId) return changed;
    const streak = desiredTodayStreak(todayKey, existing);

    const claim = normalizeTodayRecord(state.dailyClaims[todayKey] || existing, mysteryId, todayKey, streak);
    const history = normalizeTodayRecord(state.dailyHistory[todayKey] || existing, mysteryId, todayKey, streak);
    if (JSON.stringify(state.dailyClaims[todayKey] || null) !== JSON.stringify(claim)) {
      state.dailyClaims = { ...state.dailyClaims, [todayKey]: claim };
      changed = true;
    }
    if (JSON.stringify(state.dailyHistory[todayKey] || null) !== JSON.stringify(history)) {
      state.dailyHistory = { ...state.dailyHistory, [todayKey]: history };
      changed = true;
    }
    if (number(state.streak, 0) < streak) { state.streak = streak; changed = true; }
    if (state.lastDailySolvedKey !== todayKey) { state.lastDailySolvedKey = todayKey; changed = true; }
    if (streak >= 3 && !state.achievements.streak3) { state.achievements.streak3 = true; changed = true; }
    if (streak >= 7 && !state.achievements.streak7) { state.achievements.streak7 = true; changed = true; }

    if (changed && persist) {
      try { saveState(); } catch {}
    }
    if (changed && rerender) {
      try { render({ immediate: true }); } catch { try { render(); } catch {} }
    }
    return changed;
  }

  const previousApplyDailyReward = safe(() => applyDailyReward, null);
  if (typeof previousApplyDailyReward === "function") {
    try {
      applyDailyReward = function beta265ApplyDailyReward(mysteryId, score){
        const todayKey = safe(() => localDayKey(), keyFor());
        const existing = state.dailyClaims?.[todayKey] || state.dailyHistory?.[todayKey] || null;
        if (existing && canonicalIsToday(mysteryId)) {
          repairTodayStreak({ persist: false, rerender: false });
          const streak = Math.max(1, number(state.streak, 1));
          return `Série ${streak} jour${streak > 1 ? "s" : ""} validée`;
        }
        const reward = previousApplyDailyReward(mysteryId, score);
        repairTodayStreak({ persist: false, rerender: false });
        return reward;
      };
    } catch {}
  }

  function runRepair(){
    const changed = repairTodayStreak({ persist: true, rerender: false });
    if (changed) {
      try { render({ immediate: true }); } catch { try { render(); } catch {} }
    }
  }

  try { runRepair(); } catch {}
  window.setTimeout(runRepair, 0);
  window.addEventListener("pageshow", runRepair);
  window.addEventListener("focus", runRepair);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") runRepair();
  });

  window.HistoDailyStreakRepair = {
    version: VERSION,
    repair: runRepair,
    value: canonicalStreakValue,
    isTodayMystery: canonicalIsToday,
    diagnostics: () => {
      const todayKey = safe(() => localDayKey(), keyFor());
      return {
        version: VERSION,
        todayKey,
        streak: number(state?.streak, 0),
        lastDailySolvedKey: state?.lastDailySolvedKey || null,
        todayClaim: state?.dailyClaims?.[todayKey] || null,
        todayHistory: state?.dailyHistory?.[todayKey] || null,
        solvedCandidate: solvedTodayCandidate(todayKey)?.id || null
      };
    }
  };
})();

;

/* ===== SOURCE: archive-mobile-v268.js ===== */
/* HistoDaily beta 268 — Android archive scroll repair.
   Keeps the document as the vertical scroll container, removes stale overlay locks,
   and keeps the archive answer field reachable when the virtual keyboard opens. */
(function histodailyArchiveMobile268(){
  "use strict";

  const VERSION = "1.0.0-beta.271.0";
  const PENDING_KEY = "histodaily.archive.pending.v268";
  let scheduled = false;
  let lastMysteryId = "";
  let viewportTimer = 0;

  const safe = (fn, fallback = null) => {
    try {
      const value = fn();
      return value == null ? fallback : value;
    } catch {
      return fallback;
    }
  };

  document.documentElement.classList.add("hd268-archive-scroll");

  function overlayActuallyOpen(){
    return Boolean(document.querySelector(".hd187-layer,[role='dialog'][aria-modal='true']"));
  }

  function clearStaleScrollLock(){
    if (overlayActuallyOpen()) return;
    document.body.classList.remove("hd187-layer-open");
    [document.documentElement, document.body, document.getElementById("app")].forEach(node => {
      if (!node) return;
      const style = node.style;
      if (style.position === "fixed") style.removeProperty("position");
      if (style.overflow === "hidden") style.removeProperty("overflow");
      if (style.overflowY === "hidden") style.removeProperty("overflow-y");
      if (style.height && /(?:100vh|100dvh|100svh|100%)/.test(style.height)) style.removeProperty("height");
      if (style.maxHeight && /(?:100vh|100dvh|100svh|100%)/.test(style.maxHeight)) style.removeProperty("max-height");
    });
  }

  function currentArchive(){
    const mystery = safe(() => currentMystery(), null);
    if (!mystery?.id) return { mystery:null, archive:false };
    const archive = !Boolean(safe(() => isTodayMystery(mystery.id), false));
    return { mystery, archive };
  }

  function moveArchiveAnswerHigher(shell){
    const answer = shell.querySelector(".hd264-answer-zone");
    const clueBoard = shell.querySelector(".hd264-clue-board");
    const prompt = shell.querySelector(".hd264-prompt,.prompt");
    if (!answer || !prompt) return;
    if (prompt.nextElementSibling !== answer) prompt.insertAdjacentElement("afterend", answer);
  }

  function restoreArchiveTop(mysteryId){
    let pending = "";
    try { pending = sessionStorage.getItem(PENDING_KEY) || ""; } catch {}
    if (!pending || pending !== String(mysteryId || "")) return;
    try { sessionStorage.removeItem(PENDING_KEY); } catch {}
    window.requestAnimationFrame(() => {
      try { window.scrollTo({ top:0, left:0, behavior:"auto" }); }
      catch { window.scrollTo(0, 0); }
    });
  }

  function ensureAnswerVisible(input){
    if (!input || !document.body.contains(input)) return;
    window.clearTimeout(viewportTimer);
    viewportTimer = window.setTimeout(() => {
      try { input.scrollIntoView({ block:"center", inline:"nearest", behavior:"smooth" }); }
      catch {
        const top = Math.max(0, input.getBoundingClientRect().top + window.scrollY - Math.max(70, window.innerHeight * .28));
        try { window.scrollTo({ top, behavior:"auto" }); } catch { window.scrollTo(0, top); }
      }
    }, 180);
  }

  function apply(){
    scheduled = false;
    clearStaleScrollLock();
    const shell = document.querySelector(".app-shell.tab-mystery");
    if (!shell) return;

    shell.classList.add("hd268-scroll-safe");
    const { mystery, archive } = currentArchive();
    shell.classList.toggle("hd268-archive-open", archive);
    if (!mystery?.id) return;

    if (archive) moveArchiveAnswerHigher(shell);
    if (String(mystery.id) !== lastMysteryId) {
      lastMysteryId = String(mystery.id);
      restoreArchiveTop(mystery.id);
    }
  }

  function schedule(){
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(apply);
  }

  document.addEventListener("click", event => {
    const open = event.target.closest?.("[data-open-mystery-id]");
    if (!open) return;
    try { sessionStorage.setItem(PENDING_KEY, String(open.dataset.openMysteryId || "")); } catch {}
  }, true);

  document.addEventListener("focusin", event => {
    const input = event.target?.closest?.(".app-shell.tab-mystery [data-guess-input]");
    if (!input) return;
    clearStaleScrollLock();
    ensureAnswerVisible(input);
  }, true);

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => {
      const input = document.activeElement?.matches?.(".app-shell.tab-mystery [data-guess-input]") ? document.activeElement : null;
      if (input) ensureAnswerVisible(input);
    }, { passive:true });
  }

  window.addEventListener("pageshow", schedule, { passive:true });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) schedule(); });

  const observer = new MutationObserver(schedule);
  observer.observe(document.getElementById("app") || document.body, { childList:true, subtree:true });

  window.HistoDaily = { ...(window.HistoDaily || {}), archiveMobileVersion:VERSION };
  schedule();
})();

;

/* ===== SOURCE: course-mobile-v269.js ===== */
/* HistoDaily beta 270 — Android course/library scroll repair.
   Generalises the archive fix to course readers and course catalogues. */
(function histodailyCourseMobile269(){
  "use strict";

  const VERSION = "1.0.0-beta.271.0";
  let scheduled = false;
  let lastScreenKey = "";

  const root = document.documentElement;
  root.classList.add("hd269-course-scroll");
  if (/Android/i.test(navigator.userAgent || "")) root.classList.add("hd269-android");

  function visibleModalOpen(){
    return [...document.querySelectorAll(".hd187-layer,[role='dialog'][aria-modal='true']")].some(node => {
      if (!node.isConnected) return false;
      const style = window.getComputedStyle(node);
      return style.display !== "none" && style.visibility !== "hidden" && style.pointerEvents !== "none";
    });
  }

  function removeViewportLock(node){
    if (!node) return;
    const style = node.style;
    if (["fixed","absolute"].includes(style.position) && node !== document.querySelector(".hd187-layer")) style.removeProperty("position");
    if (style.overflow === "hidden") style.removeProperty("overflow");
    if (style.overflowY === "hidden" || style.overflowY === "clip") style.removeProperty("overflow-y");
    if (style.touchAction === "none") style.removeProperty("touch-action");
    if (style.height && /^(?:100(?:d|s|l)?vh|100%|calc\(100)/i.test(style.height.trim())) style.removeProperty("height");
    if (style.maxHeight && /^(?:100(?:d|s|l)?vh|100%|calc\(100)/i.test(style.maxHeight.trim())) style.removeProperty("max-height");
  }

  function clearStaleLock(){
    if (visibleModalOpen()) return;
    document.body.classList.remove("hd187-layer-open");
    [document.documentElement, document.body, document.getElementById("app")].forEach(removeViewportLock);
  }

  function makeScreenScrollable(shell){
    if (!shell) return;
    shell.classList.add("hd269-scroll-safe");
    removeViewportLock(shell);
    shell.querySelectorAll(".reading-card,.lesson-full-page,.hd214-reader-page,.complete-course-panel,.express-coach-card,.quiz-section,.tree-section,.hd214-library-page").forEach(removeViewportLock);

    const screenKey = [shell.classList.contains("tab-lesson") ? "lesson" : "learn", shell.querySelector("h1")?.textContent || ""].join(":");
    if (screenKey !== lastScreenKey) {
      lastScreenKey = screenKey;
      window.requestAnimationFrame(() => {
        const scrolling = document.scrollingElement || document.documentElement;
        if (scrolling && scrolling.scrollTop < 0) scrolling.scrollTop = 0;
      });
    }
  }

  function apply(){
    scheduled = false;
    clearStaleLock();
    makeScreenScrollable(document.querySelector(".app-shell.tab-lesson"));
    makeScreenScrollable(document.querySelector(".app-shell.tab-learn"));
  }

  function schedule(){
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(apply);
  }

  document.addEventListener("touchstart", event => {
    if (!event.target.closest?.(".app-shell.tab-lesson,.app-shell.tab-learn")) return;
    clearStaleLock();
  }, { capture:true, passive:true });

  document.addEventListener("click", event => {
    if (!event.target.closest?.("[data-lesson-view],[data-hd214-reader-view],[data-hd214-footer-view],[data-open-lesson],[data-lesson-id]")) return;
    window.setTimeout(schedule, 0);
  }, true);

  window.addEventListener("pageshow", schedule, { passive:true });
  window.addEventListener("resize", schedule, { passive:true });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) schedule(); });

  const observer = new MutationObserver(schedule);
  observer.observe(document.getElementById("app") || document.body, { childList:true, subtree:true });

  window.HistoDaily = { ...(window.HistoDaily || {}), courseMobileVersion:VERSION };
  schedule();
})();

;

/* ===== SOURCE: onboarding-v275.js ===== */
/* HistoDaily beta 275 — vraie première ouverture, sans gêner les joueurs existants. */
(function histodailyBeta275FirstRun(){
  "use strict";
  const VERSION = "1.0.0-beta.275.0";
  const GUIDE_VERSION = "first-mystery-v1";
  let overlay = null;
  let step = 0;
  let selectedDiscipline = "history";
  let lastFocused = null;
  let replayMode = false;
  let backgroundState = [];

  const safe = (fn, fallback = null) => { try { const value = fn(); return value == null ? fallback : value; } catch { return fallback; } };
  const esc = value => String(value ?? "").replace(/[&<>\"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));

  function meaningfulActivity(){
    const maps = [state?.solvedMysteries, state?.completedLessons, state?.readLessons, state?.quizProgress, state?.friends];
    if (maps.some(map => map && Object.keys(map).length > 0)) return true;
    if (String(state?.pseudo || "").trim() && !/^invité$/i.test(String(state.pseudo).trim())) return true;
    if (state?.playerId || state?.friendCode || state?.socialIdentity?.playerId) return true;
    return false;
  }

  function shouldOpenAutomatically(){
    if (!state || state.onboardingCompletedAt || state.onboardingVersion) return false;
    if (meaningfulActivity()) return false;
    return true;
  }

  function readyDisciplines(){
    const list = safe(() => DISCIPLINES.filter(item => {
      const worlds = typeof treeAvailableWorlds === "function" ? treeAvailableWorlds(item.id) : [];
      return worlds.some(world => (typeof treeLessonsForWorld === "function" ? treeLessonsForWorld(world.id) : []).length > 0);
    }), []) || [];
    const preferred = ["history", "english", "philosophy", "astronomy", "art", "science-inventions"];
    const priority = id => {
      const index = preferred.indexOf(id);
      return index >= 0 ? index : preferred.length;
    };
    return list.sort((a, b) => priority(a.id) - priority(b.id) || String(a.title || "").localeCompare(String(b.title || ""), "fr")).slice(0, 6);
  }

  function disciplineInfo(item){
    const lessons = safe(() => lessonsForDiscipline(item.id), []) || [];
    const icon = safe(() => HD_ICONS.rawDiscipline(item), item.emoji || "✦");
    return { ...item, lessons: lessons.length, icon };
  }

  function viewMarkup(){
    const disciplines = readyDisciplines().map(disciplineInfo);
    const selected = disciplines.find(item => item.id === selectedDiscipline) || disciplines[0];
    if (selected) selectedDiscipline = selected.id;
    return `<div class="hd275-onboarding-inner hd35-onboarding-one" style="--hd275-accent:${esc(selected?.accent || "#f6c453")}">
      <div class="hd275-onboarding-top"><div class="hd275-logo"><i>⌛</i><span>HistoDaily</span></div></div>
      <p class="hd275-kicker">Ta dose quotidienne de culture</p>
      <h1>Un dossier.<br>Quelques minutes.<br>Une chose retenue.</h1>
      <p class="hd275-lead">Lis le contexte, choisis la réponse qui te paraît la plus logique, puis comprends pourquoi. Commence simplement par l’univers qui t’attire.</p>
      <div class="hd275-disciplines">${disciplines.map(item => `<button type="button" class="hd275-discipline ${item.id === selectedDiscipline ? "is-selected" : ""}" data-hd275-discipline="${esc(item.id)}" style="--discipline-accent:${esc(item.accent || "#f6c453")}"><span>${item.icon}</span><div><b>${esc(item.title)}</b><small>${item.lessons} cours</small></div></button>`).join("")}</div>
      ${selected?.id === "english" ? '<div class="hd275-selected-note"><b>Anglais</b><span>Comprendre le sens, le registre et l’implicite — pas réciter des listes de mots.</span></div>' : selected?.id === "philosophy" ? '<div class="hd275-selected-note"><b>Philosophie</b><span>Raisonner, distinguer et objecter avant de réciter des auteurs.</span></div>' : ""}
      <div class="hd275-actions"><button type="button" class="hd275-next" data-hd275-next>${replayMode ? "Fermer" : "Lancer mon expédition"}</button></div>
      ${!replayMode ? '<button type="button" class="hd275-skip" data-hd275-home>Voir d’abord l’accueil</button>' : ""}
    </div>`;
  }

  function bindOverlay(){
    overlay?.querySelector("[data-hd275-next]")?.addEventListener("click", () => {
      if (replayMode) close();
      else complete("mystery");
    });
    overlay?.querySelector("[data-hd275-home]")?.addEventListener("click", () => complete("home"));
    overlay?.querySelectorAll("[data-hd275-discipline]").forEach(button => button.addEventListener("click", () => {
      selectedDiscipline = button.dataset.hd275Discipline || "history";
      draw();
    }));
  }

  function draw(){
    if (!overlay) return;
    const panel = overlay.querySelector(".hd275-onboarding");
    panel.innerHTML = viewMarkup();
    bindOverlay();
    panel.scrollTop = 0;
    window.requestAnimationFrame?.(() => panel.querySelector("[data-hd275-next]")?.focus({ preventScroll:true }));
  }

  function isolateBackground(){
    const nodes = [document.getElementById("app"), document.querySelector(".skip-link")].filter(Boolean);
    backgroundState = nodes.map(node => ({
      node,
      inert: Boolean(node.inert),
      ariaHidden: node.getAttribute("aria-hidden")
    }));
    try { lastFocused?.blur?.(); } catch {}
    nodes.forEach(node => {
      try { node.inert = true; } catch {}
      node.setAttribute("aria-hidden", "true");
    });
  }

  function restoreBackground(){
    backgroundState.forEach(({ node, inert, ariaHidden }) => {
      if (!node?.isConnected) return;
      try { node.inert = inert; } catch {}
      if (ariaHidden === null) node.removeAttribute("aria-hidden");
      else node.setAttribute("aria-hidden", ariaHidden);
    });
    backgroundState = [];
  }

  function trapFocus(event){
    if (!overlay || event.key !== "Tab") return;
    const focusable = [...overlay.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter(node => node.getClientRects().length > 0);
    if (!focusable.length) { event.preventDefault(); return; }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function close(){
    if (!overlay) return;
    overlay.remove();
    overlay = null;
    document.body.classList.remove("hd275-onboarding-open");
    restoreBackground();
    try { lastFocused?.focus?.({ preventScroll:true }); } catch {}
  }

  function selectedContext(){
    const worlds = safe(() => treeAvailableWorlds(selectedDiscipline), []) || [];
    const firstWorld = worlds.find(world => safe(() => treeLessonsForWorld(world.id).length, 0) > 0) || worlds[0] || null;
    const mystery = safe(() => mysteryForDisciplineDayOffset(selectedDiscipline, 0), null) || safe(() => dailyMystery(), null);
    return { firstWorld, mystery };
  }

  function complete(destination){
    const { firstWorld, mystery } = selectedContext();
    const patch = {
      onboardingVersion: VERSION,
      onboardingCompletedAt: new Date().toISOString(),
      currentDiscipline: selectedDiscipline,
      currentGroup: firstWorld?.group || state.currentGroup,
      currentWorld: firstWorld?.id || state.currentWorld,
      firstMysteryGuideVersion: GUIDE_VERSION,
      firstMysteryGuideDismissed: true,
      tab: destination === "mystery" && mystery ? "mystery" : "home",
      currentMysteryId: destination === "mystery" && mystery ? mystery.id : state.currentMysteryId,
      currentMysteryDiscipline: destination === "mystery" && mystery ? selectedDiscipline : state.currentMysteryDiscipline
    };
    close();
    try { setState(patch); } catch { Object.assign(state, patch); safe(() => saveState()); safe(() => render({ immediate:true })); }
  }

  function open({ replay = false } = {}){
    if (overlay) return;
    lastFocused = document.activeElement;
    step = 0;
    replayMode = Boolean(replay);
    selectedDiscipline = activeDisciplineId?.() || state?.currentDiscipline || "history";
    overlay = document.createElement("div");
    overlay.className = "hd275-onboarding-layer";
    overlay.setAttribute("role", "presentation");
    overlay.innerHTML = `<section class="hd275-onboarding" role="dialog" aria-modal="true" aria-label="Découvrir HistoDaily"></section>`;
    document.body.appendChild(overlay);
    document.body.classList.add("hd275-onboarding-open");
    isolateBackground();
    overlay.addEventListener("keydown", trapFocus);
    draw();
  }

  function maybeOpen(){
    if (!shouldOpenAutomatically()) return;
    window.requestAnimationFrame?.(() => open());
  }

  function mountFirstMysteryGuide(){
    // RC17 : supprimé. Le jeu lui-même enseigne maintenant son fonctionnement, sans panneau supplémentaire.
    return;
  }

  function mountReplayControl(){
    const shell = document.querySelector(".app-shell.tab-profile");
    if (!shell || shell.querySelector("[data-hd275-replay]")) return;
    const target = shell.querySelector('[data-beta182-fold="settings"] .beta182-fold-content') || shell.querySelector(".profile-settings-card") || shell.querySelector(".hd220-profile");
    if (!target) return;
    const block = document.createElement("div");
    block.className = "hd275-replay-card";
    block.innerHTML = `<div><b>Introduction</b><small>Revoir le fonctionnement du rituel quotidien.</small></div><button type="button" class="ghost" data-hd275-replay>Revoir</button>`;
    target.appendChild(block);
    block.querySelector("[data-hd275-replay]")?.addEventListener("click", () => open({ replay:true }));
  }

  const previousHome = typeof renderHome === "function" ? renderHome : null;
  if (previousHome) renderHome = function beta275RenderHome(){ const result = previousHome(); maybeOpen(); return result; };
  const previousMystery = typeof renderMystery === "function" ? renderMystery : null;
  if (previousMystery) renderMystery = function beta275RenderMystery(){ const result = previousMystery(); mountFirstMysteryGuide(); return result; };
  const previousProfile = typeof renderProfile === "function" ? renderProfile : null;
  if (previousProfile) renderProfile = function beta275RenderProfile(){ const result = previousProfile(); window.requestAnimationFrame?.(mountReplayControl); return result; };

  window.HistoDailyOnboarding = { version: VERSION, open: () => open({ replay:true }), shouldOpenAutomatically };
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version:VERSION, firstRunV1:true, guidedFirstMystery:false }; } catch {}
})();

;

/* ===== SOURCE: release-polish-v278.js ===== */
(() => {
  "use strict";
  const VERSION = "1.0.0-rc.18.0";
  const ID = "hd-release-status";
  let hideTimer = 0;

  function statusNode() {
    let node = document.getElementById(ID);
    if (node) return node;
    node = document.createElement("div");
    node.id = ID;
    node.className = "hd-release-status";
    node.setAttribute("role", "status");
    node.setAttribute("aria-live", "polite");
    node.hidden = true;
    document.body.appendChild(node);
    return node;
  }

  function announce(message, mode = "info", persistent = false) {
    const node = statusNode();
    window.clearTimeout(hideTimer);
    node.className = `hd-release-status is-${mode}`;
    node.textContent = message;
    node.hidden = false;
    requestAnimationFrame(() => node.classList.add("is-visible"));
    if (!persistent) hideTimer = window.setTimeout(() => {
      node.classList.remove("is-visible");
      window.setTimeout(() => { node.hidden = true; }, 220);
    }, 3200);
  }

  function updateConnectivity(initial = false) {
    if (navigator.onLine === false) {
      document.documentElement.dataset.connection = "offline";
      announce("Mode hors connexion — ta progression reste enregistrée sur cet appareil.", "offline", true);
      return;
    }
    delete document.documentElement.dataset.connection;
    const node = document.getElementById(ID);
    if (!initial || node?.classList.contains("is-offline")) announce("Connexion rétablie — synchronisation en cours.", "online");
  }

  function markInteractiveState(root = document) {
    root.querySelectorAll("button[disabled], [role='button'][aria-disabled='true']").forEach(el => el.setAttribute("aria-busy", el.classList.contains("loading") ? "true" : "false"));
    root.querySelectorAll("img:not([alt])").forEach(img => img.alt = "");
  }

  function installBootGuard() {
    window.setTimeout(() => {
      const app = document.getElementById("app");
      if (!app || !app.querySelector(".boot-shell")) return;
      app.innerHTML = `<main class="hd-startup-fallback" id="main-content">
        <span aria-hidden="true">🧭</span><h1>HistoDaily n’a pas pu démarrer</h1>
        <p>Ta progression n’est pas perdue. Recharge simplement l’application.</p>
        <button type="button" class="primary" id="hd-reload-app">Recharger</button>
      </main>`;
      document.getElementById("hd-reload-app")?.addEventListener("click", () => location.reload());
    }, 12000);
  }

  function installServiceWorkerFeedback() {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.addEventListener("controllerchange", () => announce("HistoDaily vient d’être mis à jour.", "online"));
  }

  function boot() {
    document.documentElement.dataset.release = VERSION;
    updateConnectivity(true);
    window.addEventListener("online", () => updateConnectivity(false));
    window.addEventListener("offline", () => updateConnectivity(false));
    installBootGuard();
    installServiceWorkerFeedback();
    markInteractiveState();
    const observer = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === 1) markInteractiveState(node);
      }));
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.HistoDaily = { ...(window.HistoDaily || {}), releaseCandidate: true, releaseVersion: VERSION };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();

;

/* ===== SOURCE: release-center-v279.js ===== */
(() => {
  "use strict";
  const VERSION = "1.0.0-rc.18.0";
  const MODAL_ID = "hd-release-center-modal";
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  function closeModal() {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) return;
    const returnTo = modal._returnFocus;
    modal.remove();
    document.documentElement.classList.remove("hd-modal-open");
    document.body.classList.remove("hd-modal-open");
    try { returnTo?.focus?.(); } catch {}
  }

  function modalMarkup(section = "help") {
    const online = navigator.onLine !== false;
    return `<div class="hd-release-center-backdrop" id="${MODAL_ID}" role="presentation">
      <section class="hd-release-center" role="dialog" aria-modal="true" aria-labelledby="hd-release-center-title" tabindex="-1">
        <header><div><span class="card-label">HistoDaily</span><h2 id="hd-release-center-title">Aide et données</h2></div><button type="button" class="ghost hd-release-center-close" aria-label="Fermer">×</button></header>
        <nav aria-label="Rubriques"><button type="button" data-hd-center-tab="help" class="${section === "help" ? "active" : ""}">Aide</button><button type="button" data-hd-center-tab="data" class="${section === "data" ? "active" : ""}">Mes données</button><button type="button" data-hd-center-tab="privacy" class="${section === "privacy" ? "active" : ""}">Confidentialité</button></nav>
        <div class="hd-release-center-body">
          ${section === "help" ? `<article><h3>Comment fonctionne HistoDaily ?</h3><p>Chaque jour, résous un mystère, découvre sa révélation puis poursuis avec un cours ou un quiz. Les archives servent à réviser et restent hors du classement quotidien.</p><h3>Le score reste en attente ?</h3><p>Ta partie reste enregistrée sur cet appareil. Vérifie ta connexion puis ouvre le profil ou le classement pour relancer la synchronisation.</p><h3>Installer l’application</h3><p>Sur Android, ouvre le menu du navigateur puis choisis « Installer l’application » ou « Ajouter à l’écran d’accueil ».</p></article>` : ""}
          ${section === "data" ? `<article><h3>Une sauvegarde vraiment complète</h3><p>Le fichier contient la progression, le pseudo et l’identité sociale nécessaires pour conserver ton code ami lors d’un changement d’appareil.</p><div class="hd-release-data-actions"><button type="button" data-hd-data-action="download">Télécharger ma sauvegarde</button><button type="button" class="ghost" data-hd-data-action="repair">Réparer le cache</button></div><p class="hd-release-data-note" data-hd-data-feedback>Réparer le cache ne supprime pas ta progression locale.</p></article>` : ""}
          ${section === "privacy" ? `<article><h3>Données utilisées</h3><p>HistoDaily utilise ton pseudo, un identifiant technique, ton code ami, tes scores et ta progression nécessaires au fonctionnement de l’application. Si tu actives les rappels, un abonnement Web Push propre à cet appareil est aussi conservé.</p><h3>Ce qui n’est pas demandé</h3><p>L’application ne demande ni caméra, ni microphone, ni géolocalisation. Elle ne comporte pas de messagerie privée. Les notifications restent facultatives et peuvent être désactivées depuis le profil.</p><p><a class="hd-release-legal-link" href="privacy.html" target="_blank" rel="noopener">Lire la notice de confidentialité complète</a></p></article>` : ""}
        </div>
        <footer><span>${online ? "Connecté" : "Hors connexion"}</span></footer>
      </section>
    </div>`;
  }

  function bindDataActions(modal) {
    modal.querySelectorAll("[data-hd-data-action]").forEach(button => button.addEventListener("click", async () => {
      const action = button.dataset.hdDataAction;
      const feedback = modal.querySelector("[data-hd-data-feedback]");
      button.disabled = true;
      try {
        if (action === "download") {
          if (typeof window.downloadLocalSave === "function") window.downloadLocalSave();
          else if (typeof downloadLocalSave === "function") downloadLocalSave();
          if (feedback) feedback.textContent = "Sauvegarde téléchargée.";
        } else if (action === "repair") {
          if (feedback) feedback.textContent = "Nettoyage du cache en cours…";
          await window.HistoDaily?.repairCache?.();
        }
      } catch {
        if (feedback) feedback.textContent = "Cette action n’a pas abouti. Ta progression n’a pas été modifiée.";
      } finally { button.disabled = false; }
    }));
  }

  function openModal(section = "help", trigger = document.activeElement) {
    closeModal();
    document.body.insertAdjacentHTML("beforeend", modalMarkup(section));
    const modal = document.getElementById(MODAL_ID);
    const dialog = modal?.querySelector(".hd-release-center");
    if (!modal || !dialog) return;
    modal._returnFocus = trigger;
    document.documentElement.classList.add("hd-modal-open");
    document.body.classList.add("hd-modal-open");
    modal.querySelector(".hd-release-center-close")?.addEventListener("click", closeModal);
    modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
    modal.querySelectorAll("[data-hd-center-tab]").forEach(button => button.addEventListener("click", () => openModal(button.dataset.hdCenterTab, trigger)));
    bindDataActions(modal);
    dialog.addEventListener("keydown", event => {
      if (event.key === "Escape") { event.preventDefault(); closeModal(); return; }
      if (event.key !== "Tab") return;
      const focusable = [...dialog.querySelectorAll("button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])")].filter(el => !el.disabled && !el.hidden);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    dialog.focus();
  }

  function mountProfileCard() {
    const app = document.getElementById("app");
    if (!app || app.querySelector("[data-hd-release-center-card]")) return;
    const target = app.querySelector('[data-beta182-fold="settings"] .beta182-fold-content') || app.querySelector(".profile-settings-card") || app.querySelector(".hd257-fold-body");
    if (!target) return;
    const card = document.createElement("section");
    card.className = "card hd-release-center-card";
    card.dataset.hdReleaseCenterCard = "true";
    card.innerHTML = `<div><span class="card-label">À propos</span><h2>Aide, sauvegarde et confidentialité</h2><p>Retrouve les réponses utiles, ta sauvegarde et les options de récupération.</p></div><div class="hd-release-center-actions"><button type="button" data-hd-open-center="help">Ouvrir l’aide</button><button type="button" class="ghost" data-hd-open-center="data">Mes données</button></div>`;
    target.appendChild(card);
    card.querySelectorAll("[data-hd-open-center]").forEach(button => button.addEventListener("click", () => openModal(button.dataset.hdOpenCenter, button)));
  }

  function boot() {
    document.documentElement.dataset.appVersion = VERSION;
    const observer = new MutationObserver(() => mountProfileCard());
    observer.observe(document.getElementById("app") || document.body, { childList: true, subtree: true });
    mountProfileCard();
    window.addEventListener("keydown", event => { if (event.key === "Escape" && document.getElementById(MODAL_ID)) closeModal(); });
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, releaseVersion: VERSION, openHelp: openModal };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();

;

/* ===== SOURCE: polish-v280.js ===== */
/* HistoDaily 1.0 RC3 — interface polish pass */
(() => {
  'use strict';
  const VERSION = '1.0.0-rc.18.0';

  const TEXT_REPLACEMENTS = new Map([
    ['Reprendre', 'Poursuivre'],
    ['Ouvrir', 'Découvrir'],
    ['Voir', 'Explorer'],
    ['Jouer', 'Ouvrir le dossier'],
    ['Terminé', 'Mission accomplie'],
    ['Aucun score reçu', 'Le terrain est encore libre'],
    ['Personne pour le moment', 'Ton cercle est prêt à grandir']
  ]);

  function polishButtons(root = document) {
    root.querySelectorAll('button').forEach(button => {
      const text = String(button.textContent || '').trim();
      if (TEXT_REPLACEMENTS.has(text)) button.textContent = TEXT_REPLACEMENTS.get(text);
    });
  }

  function polishEmptyStates(root = document) {
    root.querySelectorAll('.hd242-empty').forEach(card => {
      const strong = card.querySelector('strong');
      const paragraph = card.querySelector('p');
      if (strong?.textContent.trim() === 'Aucun score reçu') {
        strong.textContent = 'Le terrain est encore libre';
        if (paragraph) paragraph.textContent = 'Résous le dossier du jour pour poser le premier score du classement.';
        card.classList.add('hd280-empty-state');
      }
    });
    root.querySelectorAll('.empty-friends-card').forEach(card => {
      const title = card.querySelector('h2');
      const paragraph = card.querySelector('p');
      if (title?.textContent.trim() === 'Personne pour le moment') {
        title.textContent = 'Ton cercle est prêt à grandir';
        if (paragraph) paragraph.textContent = 'Partage ton code avec une personne, puis retrouve-la ici dès qu’elle accepte.';
        card.classList.add('hd280-empty-state');
      }
    });
  }

  function polishHome(root = document) {
    const home = root.querySelector('.hd219-home');
    if (!home) return;
    home.classList.add('hd280-home');
    const expedition = home.querySelector('.hd219-expedition');
    expedition?.classList.add('hd280-expedition-focus');

    const appbarTitle = home.querySelector('.hd219-appbar h1');
    if (appbarTitle && /Continue ton exploration/i.test(appbarTitle.textContent)) {
      appbarTitle.textContent = 'Une découverte à la fois';
    }

    const expeditionButton = home.querySelector('[data-hd219-expedition] span');
    if (expeditionButton) {
      const label = expeditionButton.textContent.trim();
      if (label === 'Résoudre le mystère') expeditionButton.textContent = 'Ouvrir le dossier';
      if (label === 'Lire le cours') expeditionButton.textContent = 'Comprendre la réponse';
      if (label === 'Faire le quiz') expeditionButton.textContent = 'Relier les idées';
      if (label === 'Revoir le cours') expeditionButton.textContent = 'Reparcourir l’expédition';
    }

    const secondaryCards = home.querySelector('.hd219-home-cards');
    secondaryCards?.setAttribute('aria-label', 'Pour aller plus loin');
    home.querySelectorAll('.hd219-learning-card').forEach((card, index) => {
      card.style.setProperty('--hd280-order', String(index));
    });
  }

  function polishProfile(root = document) {
    const shell = root.querySelector('.app-shell.tab-profile');
    if (!shell) return;
    shell.classList.add('hd280-profile');
    const achievements = shell.querySelector('.achievement-grid');
    achievements?.setAttribute('aria-label', 'Tes réussites');
  }

  function run() {
    polishButtons();
    polishEmptyStates();
    polishHome();
    polishProfile();
  }

  const observer = new MutationObserver(() => window.requestAnimationFrame(run));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('DOMContentLoaded', run, { once: true });
  window.setTimeout(run, 0);

  window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, polish280: true };
})();

;

/* ===== SOURCE: course-polish-v283.js ===== */
/* HistoDaily 1.0 RC8 — course reader and quiz-result polish */
(() => {
  'use strict';

  const VERSION = '1.0.0-rc.18.0';
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
      <div class="hd283-result-copy"><span class="card-label">Bilan du cours</span><h2>${esc(title)}</h2><p>${esc(copy)}</p></div>
      <div class="hd283-result-metrics"><span><b>${snapshot.correct}/${snapshot.total}</b> bonnes réponses</span><span><b>${wrong}</b> point${wrong > 1 ? 's' : ''} à revoir</span><span><b>${snapshot.threshold}/${snapshot.total}</b> seuil de validation</span></div>
    </section>`;
  }

  const previousRenderLessonText = typeof renderLessonText === 'function' ? renderLessonText : null;
  if (previousRenderLessonText) {
    renderLessonText = function hd283RenderLessonText(lesson, content) {
      const view = typeof lessonView === 'function' ? lessonView() : 'express';
      let html = String(previousRenderLessonText(lesson, content) || '');
      const memory = takeawayText(lesson, content);

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

    shell.querySelectorAll('.deep-reading-block').forEach((section, index) => {
      section.style.setProperty('--hd283-section-order', String(index));
    });
    shell.querySelectorAll('.quiz-choice').forEach(button => button.setAttribute('aria-live', 'off'));
    const result = shell.querySelector('.hd283-quiz-result-hero');
    if (result) result.setAttribute('tabindex', '-1');

    installSectionObserver(shell);
  }

  function run() {
    try { enhanceLesson(); } catch (error) { try { console.warn('HistoDaily RC8 course polish', error); } catch {} }
  }

  const observer = new MutationObserver(() => window.requestAnimationFrame(run));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('DOMContentLoaded', run, { once: true });
  window.setTimeout(run, 0);

  window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, coursePolish283: true };
})();

;

/* ===== SOURCE: course-interactions-rc20.js ===== */
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

;

/* ===== SOURCE: launch-readiness-v284.js ===== */
(() => {
  "use strict";
  const VERSION = "1.0.0-rc.18.0";
  const ERROR_KEY = "histodaily_release_errors_v1";

  function safeStateSummary() {
    try {
      return {
        xp: Math.max(0, Number(state?.xp || 0)),
        level: typeof level === "function" ? Number(level() || 1) : 1,
        completedLessons: Object.keys(state?.completedLessons || {}).length,
        solvedMysteries: Object.keys(state?.solvedMysteries || {}).length,
        pendingScores: Object.values(state?.lastScoreSubmit || {}).filter(item => item?.pending || ["offline","error","sending"].includes(item?.mode)).length,
        friendsLocal: Object.keys(state?.friends || {}).length,
        tab: String(state?.tab || "unknown")
      };
    } catch { return { unavailable: true }; }
  }

  function recordError(kind, value) {
    try {
      const previous = JSON.parse(localStorage.getItem(ERROR_KEY) || "[]");
      const message = String(value?.message || value || "Erreur inconnue").slice(0, 300);
      const row = { at: new Date().toISOString(), version: VERSION, kind, message };
      localStorage.setItem(ERROR_KEY, JSON.stringify([...previous.slice(-7), row]));
    } catch {}
  }

  async function diagnostics() {
    let cacheNames = [];
    let registration = null;
    try { cacheNames = "caches" in window ? await caches.keys() : []; } catch {}
    try {
      const reg = await navigator.serviceWorker?.getRegistration?.();
      registration = reg ? { active: Boolean(reg.active), waiting: Boolean(reg.waiting), installing: Boolean(reg.installing), scope: reg.scope } : null;
    } catch {}
    let storedErrors = [];
    try { storedErrors = JSON.parse(localStorage.getItem(ERROR_KEY) || "[]"); } catch {}
    return {
      app: "HistoDaily",
      version: VERSION,
      generatedAt: new Date().toISOString(),
      environment: {
        online: navigator.onLine !== false,
        standalone: matchMedia?.("(display-mode: standalone)")?.matches || Boolean(navigator.standalone),
        language: navigator.language,
        platform: navigator.userAgentData?.platform || navigator.platform || "unknown",
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        reducedMotion: matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || false
      },
      serviceWorker: registration,
      cacheNames,
      state: safeStateSummary(),
      recentErrors: storedErrors
    };
  }

  async function downloadDiagnostics() {
    const report = await diagnostics();
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `histodaily-diagnostic-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function repairCache() {
    if (!window.confirm("Réparer le cache de l’application ? Ta progression locale sera conservée.")) return false;
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.filter(key => key.startsWith("histodaily-")).map(key => caches.delete(key)));
    }
    try {
      const registrations = await navigator.serviceWorker?.getRegistrations?.();
      await Promise.all((registrations || []).map(reg => reg.update().catch(() => null)));
    } catch {}
    location.reload();
    return true;
  }

  async function verifyReleaseFiles() {
    try {
      const manifest = await fetch("manifest.webmanifest", { cache: "no-store" }).then(r => r.ok ? r.json() : null);
      if (manifest?.version && manifest.version !== VERSION) recordError("version", `Manifest ${manifest.version} / app ${VERSION}`);
    } catch {}
  }

  function boot() {
    document.documentElement.dataset.release = VERSION;
    window.addEventListener("error", event => recordError("error", event.error || event.message));
    window.addEventListener("unhandledrejection", event => recordError("promise", event.reason));
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      releaseVersion: VERSION,
      releaseCandidate: true,
      diagnostics,
      downloadDiagnostics,
      repairCache
    };
    verifyReleaseFiles();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();

;

/* ===== SOURCE: performance-accessibility-v285.js ===== */
/* HistoDaily 1.0 RC9 — performance sûre et accessibilité mobile. */
(function histodailyRc9PerformanceAccessibility(){
  "use strict";
  const VERSION = "1.0.0-rc.18.0";
  const startedAt = performance.now();
  const longTasks = [];
  let scheduled = false;
  let lastRoute = "";

  const safe = (fn, fallback = null) => { try { const value = fn(); return value == null ? fallback : value; } catch { return fallback; } };
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
  const reducedMotion = safe(() => matchMedia("(prefers-reduced-motion: reduce)").matches, false);
  const lowPower = Boolean(
    reducedMotion ||
    connection?.saveData ||
    (Number(navigator.deviceMemory || 8) <= 4) ||
    (Number(navigator.hardwareConcurrency || 8) <= 4)
  );

  document.documentElement.classList.toggle("hd-rc9-low-power", lowPower);
  document.documentElement.classList.toggle("hd-rc9-reduced-motion", reducedMotion);
  if (document.body) document.body.classList.toggle("hd-rc9-low-power", lowPower);

  function announce(message){
    const node = document.getElementById("app-announcer");
    if (!node || !message) return;
    node.textContent = "";
    requestAnimationFrame(() => { node.textContent = String(message); });
  }

  function optimizeImages(root = document){
    root.querySelectorAll?.("img").forEach((image, index) => {
      if (!image.hasAttribute("alt")) image.alt = "";
      image.decoding = "async";
      const rect = safe(() => image.getBoundingClientRect(), null);
      const aboveFold = rect && rect.top < innerHeight * 1.25;
      if (!aboveFold && !image.hasAttribute("loading")) image.loading = "lazy";
      if (aboveFold && index === 0) image.fetchPriority = "high";
    });
  }

  function improveSemantics(root = document){
    const main = root.querySelector?.("#main-content") || document.querySelector("#main-content");
    if (main) {
      main.setAttribute("role", "main");
      main.setAttribute("aria-busy", "false");
      if (!main.hasAttribute("tabindex")) main.tabIndex = -1;
    }

    root.querySelectorAll?.("[role='button']:not(button):not(a)").forEach(node => {
      if (!node.hasAttribute("tabindex")) node.tabIndex = 0;
    });

    root.querySelectorAll?.("input, textarea").forEach(field => {
      if (!field.hasAttribute("enterkeyhint")) {
        const guess = field.matches("[data-guess-input], [name='guess']");
        const search = field.type === "search" || /search|recherch/i.test(field.name || field.placeholder || "");
        field.setAttribute("enterkeyhint", guess ? "send" : search ? "search" : "done");
      }
    });

    optimizeImages(root);
  }

  function routeName(){
    const shell = document.querySelector("#main-content");
    const tabClass = [...(shell?.classList || [])].find(name => name.startsWith("tab-")) || "";
    const heading = shell?.querySelector("h1")?.textContent?.trim() || shell?.querySelector("h2")?.textContent?.trim() || "";
    return `${tabClass}|${heading}`;
  }

  function processRender(){
    scheduled = false;
    improveSemantics(document.getElementById("app") || document);
    const current = routeName();
    if (current && current !== lastRoute) {
      const wasKnown = Boolean(lastRoute);
      lastRoute = current;
      if (wasKnown) {
        const heading = current.split("|").slice(1).join("|");
        if (heading) announce(heading);
      }
    }
  }

  function scheduleRenderProcessing(){
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(processRender);
  }

  document.addEventListener("keydown", event => {
    if (event.defaultPrevented || event.repeat || !["Enter", " "].includes(event.key)) return;
    const target = event.target?.closest?.("[role='button']");
    if (!target || /^(BUTTON|A|INPUT|SELECT|TEXTAREA)$/.test(target.tagName)) return;
    event.preventDefault();
    target.click();
  }, true);

  const appRoot = document.getElementById("app");
  if (appRoot && typeof MutationObserver === "function") {
    new MutationObserver(scheduleRenderProcessing).observe(appRoot, { childList: true, subtree: true });
  }

  if (typeof PerformanceObserver === "function") {
    try {
      const observer = new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
          longTasks.push({ start: Math.round(entry.startTime), duration: Math.round(entry.duration) });
          if (longTasks.length > 20) longTasks.shift();
        });
      });
      observer.observe({ type: "longtask", buffered: true });
    } catch {}
  }

  function snapshot(){
    const nav = performance.getEntriesByType?.("navigation")?.[0];
    return {
      version: VERSION,
      lowPower,
      reducedMotion,
      saveData: Boolean(connection?.saveData),
      effectiveType: connection?.effectiveType || null,
      deviceMemory: Number(navigator.deviceMemory || 0) || null,
      hardwareConcurrency: Number(navigator.hardwareConcurrency || 0) || null,
      readyAfterMs: Math.round(performance.now() - startedAt),
      domInteractiveMs: nav ? Math.round(nav.domInteractive) : null,
      loadMs: nav ? Math.round(nav.loadEventEnd || nav.duration) : null,
      longTasks: longTasks.slice(),
      catalogCache: safe(() => ({ lessons: curatedLessons().length, worlds: curatedWorlds().length }), null)
    };
  }

  scheduleRenderProcessing();
  addEventListener("pageshow", scheduleRenderProcessing, { passive: true });
  addEventListener("online", () => announce("Connexion retrouvée."), { passive: true });

  try {
    window.HistoDailyPerformance = { version: VERSION, snapshot, optimizeImages, improveSemantics };
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      performancePass: true,
      accessibilityPassRc9: true,
      lowPowerMode: lowPower
    };
  } catch {}
})();

;

/* ===== SOURCE: stability-v286.js ===== */
/* HistoDaily 1.0 — stabilité, raccourcis PWA et version canonique. */
(() => {
  "use strict";
  const VERSION = "1.0.0-rc.18.0";
  const installedAt = performance.now();
  let versionRepairs = 0;
  let shortcutApplied = "";

  let registry = window.HistoDaily && typeof window.HistoDaily === "object" ? { ...window.HistoDaily } : {};

  // Les anciennes couches attribuent encore window.HistoDaily avec leur numéro
  // de schéma. Intercepter ces attributions garde une version publique unique
  // sans toucher aux versions internes de migration.
  try {
    Object.defineProperty(window, "HistoDaily", {
      configurable: true,
      enumerable: true,
      get() { return registry; },
      set(value) {
        const next = value && typeof value === "object" ? value : {};
        registry = { ...next, version: VERSION, releaseVersion: VERSION, releaseCandidate: true, stabilityPassRc10: true };
      }
    });
  } catch {}

  function stampVersion() {
    try {
      window.HD_RELEASE_VERSION = VERSION;
      if (window.HISTODAILY_CORE) {
        HISTODAILY_CORE.version = VERSION;
        HISTODAILY_CORE.assetsVersion = VERSION;
        if (HISTODAILY_CORE.ui) HISTODAILY_CORE.ui.versionLabel = "1.0";
      }
      const current = window.HistoDaily && typeof window.HistoDaily === "object" ? window.HistoDaily : {};
      if (current.version !== VERSION || current.releaseVersion !== VERSION) versionRepairs += 1;
      window.HistoDaily = {
        ...current,
        version: VERSION,
        releaseVersion: VERSION,
        releaseCandidate: true,
        stabilityPassRc10: true
      };
      document.documentElement.dataset.release = VERSION;
    } catch {}
  }

  function normalizeShortcut(value = "") {
    const view = String(value || "").trim().toLowerCase();
    if (["daily", "mystery", "today"].includes(view)) return "daily";
    if (["courses", "course", "learn", "lessons"].includes(view)) return "courses";
    if (["rank", "ranking", "leaderboard"].includes(view)) return "rank";
    if (["profile", "me"].includes(view)) return "profile";
    return "";
  }

  function applyShortcut(explicitView = "") {
    let params = null;
    let view = normalizeShortcut(explicitView);
    try {
      params = new URLSearchParams(location.search || "");
      view ||= normalizeShortcut(params.get("view") || params.get("open") || "");
    } catch {}
    if (!view || typeof state !== "object" || !state) return false;

    try {
      if (view === "daily") {
        const mystery = typeof dailyMystery === "function" ? dailyMystery() : null;
        if (mystery?.id) {
          state.currentMysteryId = mystery.id;
          state.currentMysteryDiscipline = typeof mysteryDisciplineId === "function" ? mysteryDisciplineId(mystery) : (mystery.discipline || state.currentDiscipline || "history");
          state.currentDiscipline = state.currentMysteryDiscipline;
          state.tab = "mystery";
        } else state.tab = "home";
      } else if (view === "courses") {
        state.tab = "learn";
        state.learnDrill = state.learnDrill || "chapters";
      } else if (view === "rank") state.tab = "rank";
      else if (view === "profile") state.tab = "profile";
      shortcutApplied = view;
      try { saveState?.(); } catch {}

      if (params) {
        params.delete("view"); params.delete("open");
        const query = params.toString();
        const clean = `${location.pathname || "/"}${query ? `?${query}` : ""}${location.hash || ""}`;
        try { history.replaceState(null, "", clean); } catch {}
      }
      return true;
    } catch { return false; }
  }

  // Les scripts sont différés : l'état existe ici, mais le premier rendu n'a
  // pas encore eu lieu. Le raccourci peut donc choisir la bonne route sans flash.
  applyShortcut();
  stampVersion();

  try {
    if (typeof render === "function" && !render.__hdRc10Wrapped) {
      const previousRender = render;
      render = function histodailyRc10Render(...args) {
        const result = previousRender.apply(this, args);
        stampVersion();
        return result;
      };
      render.__hdRc10Wrapped = true;
    }
  } catch {}

  const app = document.getElementById("app");
  if (app && typeof MutationObserver === "function") {
    let scheduled = false;
    new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      queueMicrotask(() => {
        scheduled = false;
        if (window.HistoDaily?.version !== VERSION) stampVersion();
      });
    }).observe(app, { childList: true, subtree: false });
  }

  addEventListener("pageshow", stampVersion, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") stampVersion();
  }, { passive: true });

  function snapshot() {
    let primary = null;
    try { primary = JSON.parse(localStorage.getItem("histodaily_state") || "null"); } catch {}
    return {
      version: VERSION,
      installedAfterMs: Math.round(performance.now() - installedAt),
      versionRepairs,
      shortcutApplied,
      storedRevision: Number(primary?._hdRevision || 0),
      storedAt: Number(primary?._hdSavedAt || 0),
      route: String(state?.tab || "unknown")
    };
  }

  try {
    window.HistoDailyStability = { version: VERSION, stampVersion, applyShortcut, snapshot };
  } catch {}
  queueMicrotask(stampVersion);
})();

;

/* ===== SOURCE: notifications-v288.js ===== */
(() => {
  'use strict';

  const VERSION = '1.0.0-rc.18.0';
  const CARD_ATTR = 'data-hd-push-card';
  const DEVICE_TOKEN_KEY = 'histodaily_push_device_token_v1';
  const SYNC_KEY = 'histodaily_push_last_sync_v1';
  let busy = false;
  let feedback = '';

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));

  function supportsPush() {
    return Boolean('serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window);
  }

  function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent || '') || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  function isStandalone() {
    return Boolean(window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true);
  }

  function randomToken() {
    try {
      const bytes = new Uint8Array(24);
      crypto.getRandomValues(bytes);
      return Array.from(bytes, n => n.toString(36).padStart(2, '0')).join('');
    } catch {
      return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
    }
  }

  function deviceToken() {
    try {
      let token = localStorage.getItem(DEVICE_TOKEN_KEY) || '';
      if (!/^[A-Za-z0-9_-]{16,160}$/.test(token)) {
        token = randomToken();
        localStorage.setItem(DEVICE_TOKEN_KEY, token);
      }
      return token;
    } catch {
      return randomToken();
    }
  }

  function safeGlobal(name, fallback = '') {
    try {
      const candidate = window[name];
      return typeof candidate === 'function' ? candidate() : (candidate ?? fallback);
    } catch {
      return fallback;
    }
  }

  function safeLocalGet(key) {
    try { return localStorage.getItem(key) || ''; } catch { return ''; }
  }

  function identity() {
    let state = {};
    try { state = JSON.parse(safeLocalGet('histodaily_state') || '{}') || {}; } catch {}
    return {
      playerId: String(safeGlobal('playerIdMe', '') || safeGlobal('localUserId', '') || safeLocalGet('histodaily_state_local_user_id') || '').slice(0, 90),
      friendCode: String(safeGlobal('friendCode', '') || safeLocalGet('histodaily_state_friend_code') || '').slice(0, 48),
      pseudo: String(safeGlobal('currentPseudo', '') || state.pseudo || 'Joueur').slice(0, 32)
    };
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
  }

  async function api(path, options = {}) {
    const response = await fetch(`/api/v1/${path}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.ok === false) {
      const error = new Error(payload.message || 'Action impossible pour le moment.');
      error.status = response.status;
      error.payload = payload;
      throw error;
    }
    return payload;
  }

  async function getRegistration() {
    if (!supportsPush()) throw new Error('Les notifications ne sont pas disponibles sur ce navigateur.');
    return navigator.serviceWorker.ready;
  }

  async function getSubscription() {
    if (!supportsPush()) return null;
    const registration = await getRegistration();
    return registration.pushManager.getSubscription();
  }

  async function serverSubscribe(subscription) {
    const who = identity();
    return api('push/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        subscription: subscription.toJSON ? subscription.toJSON() : subscription,
        deviceToken: deviceToken(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Paris',
        dailyEnabled: true,
        ...who
      })
    });
  }

  async function enablePush() {
    if (busy) return;
    busy = true;
    feedback = 'Activation en cours…';
    renderAll();
    try {
      if (!supportsPush()) throw new Error('Ce navigateur ne prend pas en charge les notifications Web Push.');
      if (isIOS() && !isStandalone()) throw new Error('Sur iPhone, ajoute d’abord HistoDaily à l’écran d’accueil puis ouvre l’application installée.');
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') throw new Error(permission === 'denied' ? 'Les notifications sont bloquées dans les réglages du téléphone.' : 'Autorisation non accordée.');
      const key = await api('push/public-key');
      if (!key.publicKey) throw new Error('La clé de notification du serveur est absente.');
      const registration = await getRegistration();
      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(key.publicKey)
        });
      }
      await serverSubscribe(subscription);
      try { localStorage.setItem(SYNC_KEY, String(Date.now())); } catch {}
      feedback = 'Rappel quotidien activé. Tu peux maintenant envoyer un test.';
    } catch (error) {
      feedback = error?.message || 'L’activation n’a pas abouti.';
    } finally {
      busy = false;
      await renderAll();
    }
  }

  async function disablePush() {
    if (busy) return;
    busy = true;
    feedback = 'Désactivation en cours…';
    renderAll();
    try {
      const subscription = await getSubscription();
      await api('push/unsubscribe', {
        method: 'POST',
        body: JSON.stringify({ deviceToken: deviceToken(), endpoint: subscription?.endpoint || '' })
      }).catch(() => null);
      if (subscription) await subscription.unsubscribe().catch(() => false);
      try { await navigator.clearAppBadge?.(); } catch {}
      feedback = 'Notifications désactivées sur cet appareil.';
    } catch {
      feedback = 'Impossible de terminer la désactivation. Réessaie plus tard.';
    } finally {
      busy = false;
      await renderAll();
    }
  }

  async function sendTest() {
    if (busy) return;
    busy = true;
    feedback = 'Envoi du test…';
    renderAll();
    try {
      await api('push/test', { method: 'POST', body: JSON.stringify({ deviceToken: deviceToken() }) });
      feedback = 'Notification envoyée. Elle devrait apparaître dans quelques secondes.';
    } catch (error) {
      feedback = error?.message || 'Le test n’a pas abouti.';
    } finally {
      busy = false;
      renderAll();
    }
  }

  async function currentState() {
    const base = {
      supported: supportsPush(),
      iosNeedsInstall: isIOS() && !isStandalone(),
      permission: typeof Notification !== 'undefined' ? Notification.permission : 'unsupported',
      subscribed: false
    };
    if (!base.supported) return base;
    try {
      base.subscribed = Boolean(await getSubscription());
    } catch {}
    return base;
  }

  function cardMarkup(state) {
    let title = 'Rappel quotidien';
    let description = 'Reçois un rappel discret en soirée si tu n’as pas encore résolu l’expédition du jour.';
    let status = 'Désactivé';
    let actions = `<button type="button" data-hd-push-action="enable" ${busy ? 'disabled' : ''}>Activer les rappels</button>`;

    if (!state.supported) {
      status = 'Non disponible';
      description = 'Ce navigateur ne prend pas en charge les notifications Web Push.';
      actions = '';
    } else if (state.iosNeedsInstall) {
      status = 'Installation nécessaire';
      description = 'Sur iPhone, ajoute HistoDaily à l’écran d’accueil, puis active les notifications depuis l’application installée.';
      actions = '';
    } else if (state.permission === 'denied') {
      status = 'Bloqué par le téléphone';
      description = 'Réactive les notifications de HistoDaily dans les réglages du navigateur ou du téléphone.';
      actions = '';
    } else if (state.subscribed && state.permission === 'granted') {
      status = 'Activé';
      actions = `<button type="button" data-hd-push-action="test" ${busy ? 'disabled' : ''}>Envoyer un test</button><button type="button" class="ghost" data-hd-push-action="disable" ${busy ? 'disabled' : ''}>Désactiver</button>`;
    }

    return `<section class="card hd-push-card" ${CARD_ATTR}="true">
      <div class="hd-push-card-icon" aria-hidden="true">🔔</div>
      <div class="hd-push-card-copy">
        <span class="card-label">Notifications</span>
        <div class="hd-push-title-row"><h2>${esc(title)}</h2><span class="hd-push-status ${state.subscribed ? 'is-active' : ''}">${esc(status)}</span></div>
        <p>${esc(description)}</p>
        <div class="hd-push-actions">${actions}</div>
        ${feedback ? `<p class="hd-push-feedback" role="status" aria-live="polite">${esc(feedback)}</p>` : ''}
      </div>
    </section>`;
  }

  async function mountCard() {
    const app = document.getElementById('app');
    if (!app || app.querySelector(`[${CARD_ATTR}]`)) return;
    const target = app.querySelector('[data-beta182-fold="settings"] .beta182-fold-content') || app.querySelector('.profile-settings-card') || app.querySelector('.hd257-fold-body');
    if (!target) return;
    const state = await currentState();
    const holder = document.createElement('div');
    holder.innerHTML = cardMarkup(state);
    const card = holder.firstElementChild;
    if (!card) return;
    target.prepend(card);
    bindCard(card);
  }

  async function renderAll() {
    const cards = [...document.querySelectorAll(`[${CARD_ATTR}]`)];
    if (!cards.length) return mountCard();
    const state = await currentState();
    cards.forEach(card => {
      const holder = document.createElement('div');
      holder.innerHTML = cardMarkup(state);
      const next = holder.firstElementChild;
      card.replaceWith(next);
      bindCard(next);
    });
  }

  function bindCard(card) {
    card?.querySelectorAll('[data-hd-push-action]').forEach(button => button.addEventListener('click', () => {
      const action = button.dataset.hdPushAction;
      if (action === 'enable') enablePush();
      else if (action === 'disable') disablePush();
      else if (action === 'test') sendTest();
    }));
  }

  async function silentResync() {
    if (!supportsPush() || Notification.permission !== 'granted') return;
    try {
      const last = Number(localStorage.getItem(SYNC_KEY) || 0);
      if (Date.now() - last < 12 * 60 * 60 * 1000) return;
      const subscription = await getSubscription();
      if (!subscription) return;
      await serverSubscribe(subscription);
      localStorage.setItem(SYNC_KEY, String(Date.now()));
    } catch {}
  }

  function clearBadgeOnOpen() {
    try { navigator.clearAppBadge?.(); } catch {}
  }

  function boot() {
    const app = document.getElementById('app') || document.body;
    const observer = new MutationObserver(() => mountCard());
    observer.observe(app, { childList: true, subtree: true });
    mountCard();
    silentResync();
    clearBadgeOnOpen();
    window.addEventListener('focus', clearBadgeOnOpen);
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      push: { enable: enablePush, disable: disablePush, test: sendTest, refresh: renderAll, supported: supportsPush }
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();

;

/* ===== SOURCE: adaptive-path-rc22.js ===== */
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

;

/* ===== SOURCE: home-premium-rc24.js ===== */
/* HistoDaily RC24 — premium editorial home. */
(function histodailyRC24PremiumHome(){
  "use strict";
  const VERSION = "1.0.0-rc.36.0";
  const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const safe = (fn, fallback = null) => { try { const v = fn(); return v == null ? fallback : v; } catch { return fallback; } };
  const clamp = (value,min,max) => Math.max(min,Math.min(max,Number(value)||0));
  const labels = {history:"Histoire",art:"Art",cinema:"Cinéma","science-inventions":"Sciences",astronomy:"Astronomie",economy:"Économie",geography:"Géographie",music:"Musique",literature:"Littérature",philosophy:"Philosophie",english:"Anglais"};
  const artIds = new Set(["history","art","cinema","science-inventions","astronomy","economy","geography","music","literature","philosophy","english"]);

  function activeId(){ return safe(() => activeDisciplineId(), String(state?.currentDiscipline || "history")); }
  function discipline(id){ return safe(() => disciplineById(id), {id,title:labels[id]||id,accent:"#f5c451",emoji:"✦"}); }
  function disciplineName(item){ return labels[item?.id] || item?.title || "Explorer"; }
  function lessonsFor(id){
    const all = safe(() => curatedLessons(), []) || [];
    return all.filter(l => safe(() => lessonDisciplineId(l), "history") === id);
  }
  function titleOf(lesson){
    if (!lesson) return "Nouveau cours";
    const content = safe(() => buildLessonContent(lesson), null);
    return content?.title || lesson.title || "Nouveau cours";
  }
  function metaOf(lesson){
    if (!lesson) return "3 min";
    const world = safe(() => lessonWorld(lesson), null);
    return [world?.title, lesson.period || lesson.location || "3 min"].filter(Boolean).slice(0,2).join(" · ");
  }
  function openLesson(lesson, view="complete"){
    if (!lesson) return;
    const world = safe(() => lessonWorld(lesson), {}) || {};
    const did = safe(() => lessonDisciplineId(lesson), activeId());
    setState({tab:"lesson",currentLessonId:lesson.id,currentDiscipline:did,currentWorld:world.id||state.currentWorld,currentGroup:world.group||state.currentGroup,lessonView:view,lessonFocus:null});
  }
  function openCatalog(id){
    const first = lessonsFor(id)[0];
    const world = first ? safe(() => lessonWorld(first), {}) : {};
    setState({tab:"learn",currentDiscipline:id,currentWorld:world?.id||state.currentWorld,currentGroup:world?.group||state.currentGroup,learnDrill:"chapters",learnFilter:"all",learnSearch:""});
  }
  function currentMystery(){ return safe(() => dailyMystery(), null); }
  function mysteryTitle(m){
    const raw = safe(() => mysteryDisplayTitle(m), m?.title || "Le problème du jour");
    return String(raw || "Le problème du jour").replace(/\s+à identifier$/i,"").replace(/^Sujet du jour$/i,"Dossier du jour").trim();
  }
  function mysteryTeaserText(m){
    return safe(() => mysteryTeaser(m), m?.teaser || m?.prompt || "Observe les indices, formule une hypothèse et trouve la réponse.");
  }
  function stage(mystery, lesson){
    const solved = Boolean(mystery?.id && safe(() => mysterySolved(mystery.id), false));
    const read = Boolean(lesson?.id && safe(() => lessonRead(lesson.id), false));
    const quiz = Boolean(lesson?.id && safe(() => lessonQuizPassed(lesson.id), false));
    if (!mystery) return {index:1,type:"catalog",kicker:"Exploration libre",title:"Choisis ta prochaine destination",text:"Le catalogue est ouvert : pioche un cours qui t’attire.",action:"Explorer les cours"};
    if (!solved) return {index:1,type:"mystery",kicker:"Expédition du jour",title:mysteryTitle(mystery),text:mysteryTeaserText(mystery),action:"Commencer l’expédition"};
    if (lesson && !read) return {index:2,type:"lesson",view:"complete",kicker:"Étape 2 · Comprendre",title:titleOf(lesson),text:"Trouvé. Comprends maintenant pourquoi cette réponse tient.",action:"Comprendre"};
    if (lesson && !quiz) return {index:3,type:"lesson",view:"quiz",kicker:"Étape 3 · Vérifier",title:"Ancre ce que tu viens d’apprendre",text:`5 questions pour ancrer l’essentiel de « ${titleOf(lesson)} ».`,action:"Faire le quiz"};
    return {index:4,type:lesson?"lesson":"mystery",view:"complete",kicker:"Parcours du jour terminé",title:"Bien joué — la boucle est complète",text:"Expédition, cours et quiz : rituel terminé.",action:lesson?"Revoir le cours":"Revoir l’expédition"};
  }
  function memoryApi(){ return window.HistoDaily?.memory || null; }
  function nextAction(id, linkedLesson){
    const mem = memoryApi();
    const due = safe(() => mem?.validReviewEntries?.(id), []) || [];
    if (due.length) return {kind:"review",eyebrow:"À faire maintenant",title:`${due.length} notion${due.length>1?"s":""} à revoir`,meta:`Séance courte · ${Math.min(5,due.length)} rappel${Math.min(5,due.length)>1?"s":""} max`,action:"Réviser",count:due.length};
    const lessons = lessonsFor(id);
    let resume = null;
    const current = state?.currentLessonId ? safe(() => lessonById(state.currentLessonId), null) : null;
    if (current && safe(() => lessonDisciplineId(current), "") === id && !safe(() => lessonDone(current.id), false)) resume = current;
    if (!resume) resume = lessons.find(l => !safe(() => lessonDone(l.id), false) && String(l.id)!==String(linkedLesson?.id||"")) || lessons.find(l => !safe(() => lessonDone(l.id), false)) || lessons[0] || null;
    if (!resume) return {kind:"catalog",eyebrow:"À explorer",title:"Choisis un nouveau parcours",meta:"Tous les cours sont accessibles",action:"Voir les cours"};
    return {kind:"lesson",lesson:resume,eyebrow:"Prochaine étape",title:titleOf(resume),meta:metaOf(resume),action:safe(() => lessonDone(resume.id), false)?"Revoir":"Continuer"};
  }
  function mastery(id){
    const mem = memoryApi();
    const m = safe(() => mem?.disciplineMastery?.(id), null);
    if (m) return m;
    const lessons = lessonsFor(id); const done = lessons.filter(l => safe(() => lessonDone(l.id), false)).length;
    return {score:lessons.length?Math.round(done/lessons.length*100):0,total:lessons.length,done,mastered:0,reviews:0};
  }
  function icon(item){ return safe(() => HD_ICONS.rawDiscipline(item), "") || safe(() => HD_ICONS.discipline(item), item?.emoji || "✦"); }
  function universeMarkup(active){
    const list = (typeof DISCIPLINES !== "undefined" ? DISCIPLINES : []).map(item => {
      const isActive = item.id === active;
      const m = mastery(item.id);
      const art = artIds.has(item.id) ? " has-art" : "";
      return `<button type="button" class="rc24-world${isActive?" active":""}${art}" data-rc24-world="${esc(item.id)}" style="--world:${esc(item.accent||"#f5c451")}" aria-pressed="${isActive}">
        <span class="rc24-world-art" aria-hidden="true"></span><span class="rc24-world-icon">${icon(item)}</span>
        <span class="rc24-world-copy"><b>${esc(disciplineName(item))}</b><small>${Number(m.total||0)} cours disponibles</small></span>
      </button>`;
    }).join("");
    return `<div class="rc24-world-grid">${list}</div>`;
  }

  function renderPremiumHome(){
    const id = activeId();
    const d = discipline(id);
    const mystery = currentMystery();
    const linked = mystery?.lessonId ? safe(() => lessonById(mystery.lessonId), null) : null;
    const s = stage(mystery, linked);
    const next = nextAction(id, linked);
    const streak = Math.max(0, Number(safe(() => currentStreakValue(), state?.streak || 0)) || 0);
    const lvl = Number(safe(() => level(), 1)) || 1;
    const greeting = String(state?.pseudo||"").trim() && !/^invité$/i.test(String(state.pseudo)) ? `Bonjour ${String(state.pseudo).trim()}` : "Bonjour";
    const routeIndex = clamp(s.index,1,3);
    const steps = ["Expédition","Cours","Quiz"];
    const heroClass = artIds.has(id) ? ` has-art art-${esc(id)}` : "";
    const nextThumbClass = artIds.has(id) ? ` art-${esc(id)}` : "";

    document.documentElement.classList.add("hd324-premium-home");
    renderShell(`<div class="rc24-home" style="--world:${esc(d.accent||"#f5c451")}" data-rc24-discipline="${esc(id)}">
      <header class="rc24-head">
        <div class="rc24-brand"><span>✦ HISTODAILY</span><h1>${esc(greeting)}</h1></div>
        <div class="rc24-metrics"><button type="button" data-rc24-profile><span>🔥</span><b>${streak}</b></button><button type="button" data-rc24-profile><span>♛</span><b>Niv. ${lvl}</b></button></div>
      </header>

      <section class="rc24-hero${heroClass}" aria-labelledby="rc24-hero-title">
        <div class="rc24-hero-image" aria-hidden="true"></div>
        <div class="rc24-hero-vignette" aria-hidden="true"></div>
        <div class="rc24-hero-top"><span>Aujourd’hui · ${esc(disciplineName(d))}</span></div>
        <div class="rc24-hero-content">
          <p>${esc(s.kicker)}</p>
          <h2 id="rc24-hero-title">${esc(s.title)}</h2>
          <span>${esc(s.text)}</span>
          <button type="button" class="rc24-hero-cta" data-rc24-primary><b>${esc(s.action)}</b><i>→</i></button>
        </div>
        <div class="rc24-route" aria-label="Parcours du jour">${steps.map((label,i)=>{const step=i+1;const status=s.index>3||step<routeIndex?"done":step===routeIndex?"current":"future";return `<div class="${status}"><i>${status==="done"?"✓":step}</i><span>${label}</span></div>`;}).join("")}</div>
      </section>

      <section class="rc24-dashboard" aria-label="Ta progression">
        <button type="button" class="rc24-next" data-rc24-next>
          <span class="rc24-next-thumb${nextThumbClass}" aria-hidden="true">${next.kind==="review"?"↻":icon(d)}</span>
          <span class="rc24-next-copy"><small>${esc(next.eyebrow)}</small><b>${esc(next.title)}</b><em>${esc(next.meta)}</em></span>
          <span class="rc24-next-arrow">→</span>
        </button>
      </section>

      <details class="rc24-universes">
        <summary><span>Univers</span><b>${esc(disciplineName(d))}</b><em>Changer</em></summary>
        ${universeMarkup(id)}
      </details>
    </div>`);

    const shell = document.querySelector(".app-shell.tab-home");
    shell?.classList.add("rc24-home-shell");
    shell?.querySelectorAll("[data-rc24-profile]").forEach(b => b.addEventListener("click",()=>setState({tab:"profile"})));
    shell?.querySelector("[data-rc24-catalog]")?.addEventListener("click",()=>openCatalog(id));
    shell?.querySelector("[data-rc24-primary]")?.addEventListener("click",()=>{
      if (s.type==="mystery") return setState({tab:"mystery",currentMysteryId:mystery?.id||null,currentMysteryDiscipline:id,currentDiscipline:id});
      if (s.type==="lesson" && linked) return openLesson(linked,s.view||"complete");
      if (s.type==="catalog") return openCatalog(id);
      if (linked) return openLesson(linked,s.view||"complete");
      return setState({tab:"mystery"});
    });
    shell?.querySelector("[data-rc24-next]")?.addEventListener("click",()=>{
      if (next.kind==="review") return safe(()=>memoryApi()?.openReviewSession?.(id),null);
      if (next.kind==="lesson" && next.lesson) return openLesson(next.lesson,"complete");
      return openCatalog(id);
    });
    shell?.querySelectorAll("[data-rc24-world]").forEach(button=>button.addEventListener("click",()=>{
      const nextId=button.dataset.rc24World;
      if (!nextId || nextId===id) return;
      if (typeof switchHomeDiscipline === "function") return switchHomeDiscipline(nextId);
      const first=lessonsFor(nextId)[0]; const world=first?safe(()=>lessonWorld(first),{}):{};
      const nextMystery=typeof mysteryForDisciplineDayOffset==="function"?safe(()=>mysteryForDisciplineDayOffset(nextId,0),null):null;
      setState({currentDiscipline:nextId,currentWorld:world?.id||state.currentWorld,currentGroup:world?.group||state.currentGroup,currentMysteryId:nextMystery?.id||null,currentMysteryDiscipline:nextId,tab:"home"});
    }));
    try { window.HistoDaily={...(window.HistoDaily||{}),version:VERSION,premiumHomeRC24:true}; } catch {}
  }

  renderHome = renderPremiumHome;
  try { if (state?.tab === "home") window.setTimeout(renderPremiumHome,0); } catch {}
})();

;

/* ===== SOURCE: daily-rotation-rc29.js ===== */
/* HistoDaily RC29 — rotation quotidienne stricte des expéditions.
   - une expédition assignée reste stable pendant la journée
   - elle change le lendemain, même si elle n'a pas été jouée
   - un mystère déjà réussi sort de la rotation tant qu'il reste du contenu inédit
*/
(function histodailyRc29DailyRotation(){
  "use strict";

  const VERSION = "1.0.0-rc.32.0";
  const previousForDiscipline = typeof mysteryForDisciplineDayOffset === "function" ? mysteryForDisciplineDayOffset : null;
  const STARTER_HISTORY = new Set([
    "mystery-fire", "mystery-pyramids", "mystery-athens", "mystery-napoleon",
    "mystery-neolithic-agriculture", "mystery-nile", "mystery-minoens", "mystery-1789-rc39"
  ]);

  function assignmentMap(){
    if (!state.dailyMysteryAssignments || typeof state.dailyMysteryAssignments !== "object" || Array.isArray(state.dailyMysteryAssignments)) {
      state.dailyMysteryAssignments = {};
    }
    return state.dailyMysteryAssignments;
  }

  function dayKeyForOffset(offset = 0){
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - Math.max(0, Number(offset || 0)));
    return localDayKey(date.getTime());
  }

  function assignmentKey(disciplineId, offset = 0){
    return `${dayKeyForOffset(offset)}|${disciplineById(disciplineId || "history").id}`;
  }

  function stableHash(value = ""){
    let hash = 2166136261;
    const text = String(value || "");
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function mysteryFromAssigned(rawPool, assignedId){
    return rawPool.find(item => item?.id === assignedId) || null;
  }

  function preferredPool(id, rawPool){
    const solvedCount = typeof rc17SolvedMysteryCount === "function" ? rc17SolvedMysteryCount(id) : 0;
    const starter = solvedCount < 8 && id === "history" ? rawPool.filter(item => STARTER_HISTORY.has(item.id)) : [];
    const allowed = solvedCount < 4
      ? new Set(["facile"])
      : solvedCount < 30
        ? new Set(["facile", "moyen"])
        : new Set(["facile", "moyen", "difficile"]);
    const adapted = rawPool.filter(item => allowed.has(item.difficulty || "moyen"));
    const nonExpert = rawPool.filter(item => (item.difficulty || "moyen") !== "expert");
    return starter.length ? starter : (adapted.length ? adapted : (nonExpert.length ? nonExpert : rawPool));
  }

  function unsolved(items){
    return items.filter(item => item?.id && !mysterySolved(item.id));
  }

  function chooseDaily(id, rawPool){
    const assignments = assignmentMap();
    const key = assignmentKey(id, 0);
    const existing = mysteryFromAssigned(rawPool, assignments[key]);
    // Une fois le dossier du jour choisi, il ne change plus avant minuit,
    // même si le joueur le résout ensuite.
    if (existing) return existing;

    const preferred = preferredPool(id, rawPool);
    const unseenPreferred = unsolved(preferred);
    const unseenAll = unsolved(rawPool);
    let candidates = unseenPreferred.length ? unseenPreferred : (unseenAll.length ? unseenAll : preferred.length ? preferred : rawPool);

    // Le dossier doit changer d'un jour sur l'autre même si celui d'hier n'a pas été joué.
    const yesterdayId = assignments[assignmentKey(id, 1)] || "";
    if (yesterdayId && candidates.length > 1) {
      const withoutYesterday = candidates.filter(item => item.id !== yesterdayId);
      if (withoutYesterday.length) candidates = withoutYesterday;
    } else if (yesterdayId && candidates.length === 1 && candidates[0]?.id === yesterdayId) {
      // Si le filtre de difficulté est trop étroit, on élargit d'abord aux mystères inédits
      // plutôt que de recycler le même dossier deux jours de suite.
      const broader = unseenAll.filter(item => item.id !== yesterdayId);
      if (broader.length) candidates = broader;
    }

    if (!candidates.length) return null;
    const index = stableHash(`${dayKeyForOffset(0)}|${id}|histodaily-rc29`) % candidates.length;
    const chosen = candidates[index] || candidates[0];
    if (chosen?.id) {
      assignments[key] = chosen.id;
      // Garder l'historique utile sans laisser grossir le stockage indéfiniment.
      const keys = Object.keys(assignments).sort();
      if (keys.length > 180) keys.slice(0, keys.length - 180).forEach(oldKey => delete assignments[oldKey]);
      state.dailyMysteryAssignments = assignments;
      try { queueSaveState?.(80); } catch {}
    }
    return chosen || null;
  }

  mysteryForDisciplineDayOffset = function rc29MysteryForDisciplineDayOffset(disciplineId = activeDisciplineId(), offset = 0){
    const id = disciplineById(disciplineId || "history").id;
    const rawPool = publicMysteries(id) || [];
    if (!rawPool.length) return id === "history" ? null : (publicMysteries("history")?.[0] || null);

    const safeOffset = Math.max(0, Number(offset || 0));
    const assignments = assignmentMap();
    const historical = mysteryFromAssigned(rawPool, assignments[assignmentKey(id, safeOffset)]);
    if (historical) return historical;
    if (safeOffset === 0) return chooseDaily(id, rawPool);

    // Pour les jours antérieurs non enregistrés avant RC29, on conserve le comportement
    // d'archive historique afin de ne pas casser les sept jours déjà affichables.
    return previousForDiscipline ? previousForDiscipline(id, safeOffset) : rawPool[(todayIndex() - safeOffset + rawPool.length) % rawPool.length];
  };

  mysteryForDayOffset = function rc29MysteryForDayOffset(offset = 0){
    return mysteryForDisciplineDayOffset(activeDisciplineId(), offset);
  };
  dailyMystery = function rc29DailyMystery(){ return mysteryForDayOffset(0); };
  isTodayMystery = function rc29IsTodayMystery(id){ return Boolean(id && dailyMystery()?.id === id); };

  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, strictDailyRotation: true, noSolvedMysteryReplay: true };
    queueMicrotask(() => {
      try { window.HistoDailyDailyRotation?.reconcile?.({ renderAfter: true }); } catch {}
    });
  } catch {}
})();

;

/* ===== SOURCE: quality-pass-rc31.js ===== */
/* HistoDaily RC31 — product quality pass: concise completion, mastery, next action. */
(function histodailyRC31QualityPass(){
  "use strict";

  const VERSION = "1.0.0-rc.36.0";
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
      const view = safe(() => lessonView(), String(state?.lessonView || "complete"));
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
          quiz.innerHTML = `<section class="rc31-retry"><span class="card-label">À consolider</span><h3>${snapshot.correct}/${snapshot.total} bonnes réponses</h3><p>Il en faut ${snapshot.threshold}. Relis seulement les points qui t’ont posé problème, puis retente : inutile de repartir de zéro.</p><div class="rc31-completion-actions"><button type="button" data-lesson-view="complete">Relire le cours</button><button type="button" class="ghost" data-reset-quiz>Retenter le quiz</button></div></section>`;
        }
      }
      return template.innerHTML;
    };
  }

  function openLesson(id){
    const lesson = safe(() => lessonById(id), null);
    if (!lesson) return;
    const world = safe(() => lessonWorld(lesson), {}) || {};
    setState({ tab:"lesson", currentLessonId:lesson.id, currentDiscipline:lessonDiscipline(lesson), currentWorld:world.id || state.currentWorld, currentGroup:world.group || state.currentGroup, lessonView:"complete", lessonFocus:null });
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

;

/* ===== SOURCE: product-polish-rc35.js ===== */
/* HistoDaily RC35 — product polish: coherent mobile interaction without new feature layers. */
(() => {
  "use strict";
  const VERSION = "1.0.0-rc.36.0";
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

;

/* ===== SOURCE: lean-flow-rc36.js ===== */
/* HistoDaily RC36 — lean learning flow. Express remains in data/code, dormant in the current UI. */
(() => {
  "use strict";
  const VERSION = "1.0.0-rc.36.0";
  document.documentElement.classList.add("hd36-lean-flow");
  try {
    if (typeof state === "object" && state) {
      if (state.lessonView === "express") state.lessonView = "complete";
      if (state.lessonFocus === "express") state.lessonFocus = "complete";
    }
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, expressDormant: true, leanLearningFlow: true };
  } catch {}
})();

;
