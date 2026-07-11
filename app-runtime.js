/* HistoDaily LTS — comportements métier et expérience active */

/* ===== mystery-rescue.js ===== */

/* HistoDaily beta 178 — dernier indice = cours correspondant. */
(function histodailyBeta178CourseRescue(){
  const VERSION = "1.0.0-beta.213.0";
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
      .filter(row => row.me || Number(row.score || 0) > 0)
      .sort((a, b) => Number(b.score || 0) - Number(a.score || 0) || String(a.name || "").localeCompare(String(b.name || ""), "fr"))
      .slice(0, 50)
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

  // Styles consolidés dans app.css.


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
        <div class="section-title-row"><div><span class="card-label">À découvrir</span><h2>Trois cours, sans surcharge</h2></div><button type="button" class="ghost mini-button" data-open-mode-learn="${esc(discipline.id)}">Tout voir</button></div>
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

  const previousReleaseNotesMarkup = typeof releaseNotesMarkup === "function" ? releaseNotesMarkup : null;
  if (previousReleaseNotesMarkup) {
    releaseNotesMarkup = function beta182ReleaseNotesMarkup({ home = false } = {}) {
      if (!home) return previousReleaseNotesMarkup({ home });
      const notes = HISTODAILY_CORE.ui?.releaseNotes || [];
      if (!notes.length || state.dismissedReleaseVersion === APP_VERSION) return "";
      return `<section class="card beta182-update-card"><details><summary><span>Nouveautés de la ${esc(HISTODAILY_CORE.ui?.versionLabel || "mise à jour")}</span><small>Voir</small></summary><div><ul>${notes.map(note => `<li>${esc(note)}</li>`).join("")}</ul><button type="button" class="ghost wide" data-dismiss-release>J’ai compris</button></div></details></section>`;
    };
  }

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
      lessonView: "express",
      lessonFocus: "express",
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
    const info = expeditionData();
    const reward = rewardData(info);
    const performance = expeditionPerformance(info);
    const elapsed = expeditionElapsedMinutes();
    const overlay = layer("Expédition terminée", "Tu as résolu, compris, relié et retenu.", `<section class="hd213-celebration">
      <div class="hd213-celebration-burst" aria-hidden="true"><i></i><i></i><i></i><i></i><span>${HD_ICONS.action("trophy")}</span></div>
      <small>${esc(todayLabel())} · dossier #${dossierNumber()}</small>
      <h3>La boucle est fermée.</h3>
      <p>Tu as relié <b>${esc(info.lesson?.title || "le cours du jour")}</b> à <b>${esc(info.connection?.title || "une nouvelle notion")}</b>.</p>
      <div class="hd213-celebration-stats"><span><b>${elapsed || 1} min</b><small>durée</small></span><span><b>${performance.precision ? "0 indice" : `${performance.hints} indice${performance.hints > 1 ? "s" : ""}`}</b><small>enquête</small></span><span><b>+10 XP</b><small>mémoire</small></span><span><b>+${reward.gems}</b><small>gemme</small></span></div>
      <div class="hd213-celebration-actions"><button type="button" data-hd213-share-expedition>Partager mon résultat</button><button type="button" class="primary" data-hd187-action="surprise">Continuer avec un bonus →</button><button type="button" class="ghost" data-hd187-close>Retour à l’accueil</button></div>
    </section>`, "hd213-complete-layer");
    bindShellActions(overlay);
    try { navigator.vibrate?.([20, 45, 28, 45, 40]); } catch {}
    return overlay;
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
    if (!shell || shell.dataset.hd187Enhanced === "1") return;
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
        <div class="section-title-row"><div><span class="card-label">${esc(leaderboardTitle(scope))}</span><h2>${rows.length} joueur${rows.length > 1 ? "s" : ""} classé${rows.length > 1 ? "s" : ""}</h2></div><button type="button" class="ghost" data-open-profile>Mon profil</button></div>
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
    return `<nav class="hd214-discipline-rail" aria-label="Disciplines">${DISCIPLINES.map(discipline => {
      const progress = disciplineProgress(discipline.id);
      const active = discipline.id === selectedId;
      return `<button type="button" data-hd214-discipline="${esc(discipline.id)}" class="${active ? "active" : ""}" style="--hd214-accent:${esc(discipline.accent)}" aria-current="${active ? "true" : "false"}"><span>${HD_ICONS.discipline(discipline)}</span><b>${esc(discipline.title)}</b><small>${progress.ready ? `${progress.progress}%` : "bientôt"}</small></button>`;
    }).join("")}</nav>`;
  }
  function learnTopbarMarkup({ back = "home", title = "Cours", eyebrow = "Bibliothèque" } = {}){
    return `<header class="hd214-learn-topbar"><button type="button" data-hd214-back="${esc(back)}" aria-label="Retour">←</button><div><p>${esc(eyebrow)}</p><h1>${esc(title)}</h1></div><button type="button" class="hd214-search-button" data-hd187-open-search aria-label="Rechercher dans les cours">⌕</button></header>`;
  }
  function disciplineHeroMarkup(disciplineId){
    const discipline = disciplineById(disciplineId);
    const progress = disciplineProgress(disciplineId);
    return `<section class="hd214-library-hero" style="--hd214-accent:${esc(discipline.accent)}">
      <div class="hd214-hero-icon">${HD_ICONS.discipline(discipline)}</div>
      <div class="hd214-hero-copy"><span>PARCOURS · ${esc(discipline.title)}</span><h2>${progress.total ? `${progress.total} cours, rangés sans surcharge` : "Une nouvelle discipline se prépare"}</h2><p>${esc(discipline.description || "Progresse par périodes, thèmes et cours courts ou complets.")}</p></div>
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
    return `<section class="hd214-chapters"><div class="hd214-section-heading"><div><span>GRANDS CHAPITRES</span><h2>Choisis une période</h2></div><small>${groups.length} étapes</small></div><div class="hd214-chapter-list">${groups.map((group, index) => {
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
    renderShell(`${learnTopbarMarkup({ back: "home", title: "Cours", eyebrow: "Bibliothèque" })}${disciplineRailMarkup(disciplineId)}${disciplineHeroMarkup(disciplineId)}${continueMarkup(disciplineId)}${chapterRowsMarkup(groups, disciplineId)}`);
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
        <span class="hd214-lesson-copy"><small>${esc(content.period || lesson.period || world.timeframe || "Repère historique")}</small><strong>${esc(lessonLabel(lesson))}</strong><em>${lessonMinutes(lesson)} min · Express, complet et quiz</em></span>
        <span class="hd214-lesson-state"><i></i><b>${status}</b><em>›</em></span>
      </button>`;
    }).join("")}</div>`;
  }
  function renderChapterCourses(disciplineId, discipline, group, worlds, activeWorld){
    const lessons = filteredWorldLessons(activeWorld);
    const all = activeWorld ? treeLessonsForWorld(activeWorld.id) : [];
    const done = all.filter(lesson => lessonDone(lesson.id)).length;
    const progress = pct(done, all.length);
    renderShell(`${learnTopbarMarkup({ back: "chapters", title: "Chapitre", eyebrow: discipline.title })}
      <section class="hd214-chapter-header" style="--hd214-accent:${esc(discipline.accent)}"><div><span>${esc(group.range || "Période")}</span><h2>${esc(chapterDisplayTitle(group.title, "Chapitre"))}</h2><p>${esc(group.description || "Choisis ensuite un thème pour afficher uniquement ses cours.")}</p></div><div><strong>${treeDoneCountForGroup(group.id, disciplineId)}/${treeLessonCountForGroup(group.id, disciplineId) || 0}</strong><small>cours validés</small></div></section>
      ${themeRailMarkup(worlds, activeWorld)}
      ${activeWorld ? `<section class="hd214-world-hero" style="--hd214-world-accent:${esc(activeWorld.accent || discipline.accent)}"><div class="hd214-world-icon">${HD_ICONS.world(activeWorld, discipline)}</div><div><span>${esc(activeWorld.timeframe || "Thème")}</span><h2>${esc(activeWorld.title)}</h2><p>${esc(activeWorld.subtitle || "Cours regroupés par sujet pour garder une navigation claire.")}</p></div><div class="hd214-world-progress"><strong>${progress}%</strong><small>${done}/${all.length || 0}</small></div><i><b style="width:${progress}%"></b></i></section>` : ""}
      <section class="hd214-lessons-section"><div class="hd214-section-heading"><div><span>COURS DU THÈME</span><h2>${activeWorld ? esc(activeWorld.title) : "À venir"}</h2></div><small>${lessons.length}/${all.length || 0}</small></div>${lessonFilterMarkup()}${lessonCardsMarkup(activeWorld, lessons)}</section>`);
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
      else setState({ tab: "lesson", currentLessonId: lessonId, lessonView: "express", lessonFocus: "express" });
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
    if (view === "complete") return { label: "Cours complet", meta: "Lecture approfondie", progress: 67, stage: "2/3" };
    if (view === "quiz") {
      const quiz = readerQuizStatus(lesson);
      const progress = quiz.total ? Math.round(67 + 33 * (quiz.answered / quiz.total)) : 67;
      const meta = quiz.finished ? `Bilan ${quiz.correct}/${quiz.total}` : `${quiz.answered}/${quiz.total} réponse${quiz.answered > 1 ? "s" : ""}`;
      const stage = quiz.finished ? "Terminé" : `Quiz ${quiz.answered}/${quiz.total}`;
      return { label: "Quiz final", meta, progress: Math.min(100, progress), stage };
    }
    return { label: "Cours express", meta: "L’essentiel en 90 secondes", progress: 34, stage: "1/3" };
  }
  function readerTabsMarkup(view){
    return `<nav class="hd214-reader-tabs" aria-label="Format du cours"><button type="button" data-hd214-reader-view="express" class="${view === "express" ? "active" : ""}"><span>1</span><b>Express</b></button><button type="button" data-hd214-reader-view="complete" class="${view === "complete" ? "active" : ""}"><span>2</span><b>Complet</b></button><button type="button" data-hd214-reader-view="quiz" class="${view === "quiz" ? "active" : ""}"><span>3</span><b>Quiz</b></button></nav>`;
  }
  function readerFooterMarkup(lesson, view){
    const world = lessonWorld(lesson) || {};
    const lessons = treeLessonsForWorld(world.id);
    const index = lessons.findIndex(item => String(item.id) === String(lesson.id));
    const quiz = readerQuizStatus(lesson);
    const back = `<button type="button" class="ghost" data-hd214-back-theme>← Retour au thème</button>`;

    if (view === "express") {
      return `<footer class="hd214-reader-footer hd215-reader-footer is-reading">${back}<button type="button" data-hd214-footer-view="complete"><span>Étape suivante</span><b>Lire le cours complet</b><em>→</em></button></footer>`;
    }
    if (view === "complete") {
      return `<footer class="hd214-reader-footer hd215-reader-footer is-reading">${back}<button type="button" data-hd214-footer-view="quiz"><span>Dernière étape</span><b>Commencer le quiz</b><em>→</em></button></footer>`;
    }
    if (!quiz.finished) {
      const remainingLabel = `${quiz.remaining} question${quiz.remaining > 1 ? "s" : ""} restante${quiz.remaining > 1 ? "s" : ""}`;
      return `<footer class="hd214-reader-footer hd215-reader-footer is-quiz-running">${back}<button type="button" data-hd214-focus-quiz><span>Quiz en cours · ${quiz.answered}/${quiz.total}</span><b>${remainingLabel}</b><em>↓</em></button></footer>`;
    }
    if (!quiz.passed) {
      return `<footer class="hd214-reader-footer hd215-reader-footer is-quiz-failed">${back}<button type="button" data-hd214-footer-reset><span>Score ${quiz.correct}/${quiz.total}</span><b>Recommencer le quiz</b><em>↻</em></button></footer>`;
    }

    const next = index >= 0
      ? (lessons.slice(index + 1).find(item => !lessonDone(item.id)) || lessons.find(item => String(item.id) !== String(lesson.id) && !lessonDone(item.id)))
      : lessons.find(item => !lessonDone(item.id));
    const themeComplete = lessons.length > 0 && lessons.every(item => lessonDone(item.id));
    if (next) {
      return `<footer class="hd214-reader-footer hd215-reader-footer is-course-complete">${back}<button type="button" data-hd214-next-lesson="${esc(next.id)}"><span>Cours validé · suivant</span><b>${esc(lessonLabel(next))}</b><em>→</em></button></footer>`;
    }
    return `<footer class="hd214-reader-footer hd215-reader-footer is-course-complete">${back}<button type="button" data-hd214-back-theme><span>${themeComplete ? "Thème terminé" : "Cours validé"}</span><b>${themeComplete ? "Voir les autres thèmes" : "Voir les cours à terminer"}</b><em>→</em></button></footer>`;
  }
  function buildReaderToc(article){
    const panel = article.querySelector(".complete-course-panel");
    if (!panel || article.querySelector(".hd214-reader-toc")) return;
    const sections = Array.from(panel.querySelectorAll(".deep-reading-block"));
    if (sections.length < 2) return;
    sections.forEach((section, index) => {
      section.dataset.hd214Section = String(index + 1);
      section.id = section.id || `hd214-section-${index + 1}`;
    });
    const toc = document.createElement("nav");
    toc.className = "hd214-reader-toc";
    toc.setAttribute("aria-label", "Sommaire du cours");
    toc.innerHTML = sections.map((section, index) => `<button type="button" data-hd214-jump="${esc(section.id)}"><span>${String(index + 1).padStart(2, "0")}</span>${esc(section.querySelector("h2")?.textContent || `Partie ${index + 1}`)}</button>`).join("");
    panel.insertAdjacentElement("beforebegin", toc);
    toc.querySelectorAll("[data-hd214-jump]").forEach(button => button.addEventListener("click", () => document.getElementById(button.dataset.hd214Jump)?.scrollIntoView({ behavior: "smooth", block: "start" })));
  }
  function enhanceLesson(){
    const shell = document.querySelector(".app-shell.tab-lesson");
    if (!shell || shell.dataset.hd214Reader === "1") return;
    const lesson = lessonById(state.currentLessonId);
    if (!lesson) return;
    shell.dataset.hd214Reader = "1";
    shell.classList.add("hd214-reader-shell");
    const view = ["express", "complete", "quiz"].includes(state.lessonView) ? state.lessonView : "express";
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
      if (copy) copy.innerHTML = `<p class="hd214-reader-path">${esc(chapterDisplayTitle(group?.title, discipline?.title || "Cours"))} · ${esc(world.title || "Parcours")}</p><h1>${esc(content.title || lesson.title)}</h1><div class="hd214-reader-meta"><span>${esc(mode.label)}</span><span>${esc(mode.meta)}</span>${lessonDone(lesson.id) ? `<span>✓ Validé</span>` : ""}</div>`;
      topbar.querySelectorAll(".lesson-view-tabs,.hd183-lesson-tabs,.hd214-reader-tabs,.hd214-reader-stage").forEach(node => node.remove());
      topbar.insertAdjacentHTML("beforeend", `${readerTabsMarkup(view)}<div class="hd214-reader-stage"><span>${esc(mode.meta)}</span><i><b style="width:${mode.progress}%"></b></i><strong>${esc(mode.stage)}</strong></div>`);
      topbar.querySelectorAll("[data-hd214-reader-view]").forEach(button => button.addEventListener("click", () => {
        const nextView = button.dataset.hd214ReaderView;
        if (nextView === view) return;
        setState({ lessonView: nextView, lessonFocus: null });
        window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
      }));
    }
    const article = shell.querySelector(".lesson-full-page,.reading-card");
    if (article) {
      article.classList.add("hd214-reader-page");
      article.querySelectorAll(".lesson-choice-panel").forEach(node => node.remove());
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
      article.insertAdjacentHTML("afterend", readerFooterMarkup(lesson, view));
    }
    shell.querySelectorAll("[data-hd214-footer-view]").forEach(button => button.addEventListener("click", () => {
      const nextView = button.dataset.hd214FooterView;
      if (!["express", "complete", "quiz"].includes(nextView)) return;
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
    shell.querySelectorAll("[data-hd214-back-theme]").forEach(button => button.addEventListener("click", () => setState({ tab: "learn", learnDrill: "courses", currentGroup: world.group || state.currentGroup, currentWorld: world.id || state.currentWorld, lessonView: "express", lessonFocus: null })));
    shell.querySelectorAll("[data-hd214-next-lesson]").forEach(button => button.addEventListener("click", () => {
      const id = button.dataset.hd214NextLesson;
      if (typeof beta118OpenLessonById === "function") beta118OpenLessonById(id, { source: "beta214-reader-next" });
      else setState({ tab: "lesson", currentLessonId: id, lessonView: "express", lessonFocus: "express" });
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

  function closeDiagnostic(){ document.querySelector?.(".hd216-diagnostic")?.remove?.(); document.documentElement?.classList?.remove?.("hd216-diagnostic-open"); }
  function downloadReport(report){
    try {
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a"); anchor.href = url; anchor.download = `histodaily-audit-${localDayKey?.() || "beta216"}.json`; anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {}
  }
  function openDiagnostic(){
    closeDiagnostic();
    const report = runAudit({ includeRows: true });
    const modal = document.createElement("div");
    modal.className = "hd216-diagnostic";
    const worst = report.rows.filter(row => row.issues.some(entry => entry.severity !== "info")).sort((a, b) => b.issues.filter(i => i.severity === "critical").length - a.issues.filter(i => i.severity === "critical").length || b.issues.length - a.issues.length).slice(0, 30);
    modal.innerHTML = `<div class="hd216-diagnostic-backdrop" data-hd216-close></div><section class="hd216-diagnostic-panel" role="dialog" aria-modal="true" aria-label="Diagnostic HistoDaily"><header><div><span>Mode interne · beta 216</span><h1>Qualité des contenus</h1><p>Audit de la structure, des cours, des quiz, des révisions et de l’expédition enregistrée.</p></div><button type="button" data-hd216-close aria-label="Fermer">✕</button></header><div class="hd216-audit-kpis"><div><b>${report.summary.lessons}</b><span>cours</span></div><div><b>${report.summary.valid}</b><span>sans alerte</span></div><div class="bad"><b>${report.summary.severity.critical}</b><span>critiques</span></div><div><b>${report.summary.severity.warning}</b><span>avertissements</span></div></div><section class="hd216-viking-audit"><span>Chapitre pilote</span><h2>Vikings · ${report.summary.vikingFinal}/${report.summary.vikingLessons} cours finalisés</h2><p>${report.summary.vikingAverageWords} mots en moyenne · ${report.summary.vikingBlockingIssues ? `${report.summary.vikingBlockingIssues} alerte(s) restante(s)` : "aucune alerte bloquante"}</p></section><div class="hd216-audit-actions"><button type="button" data-hd216-download>Exporter le JSON</button><button type="button" class="ghost" data-hd216-refresh>Relancer</button></div><section class="hd216-audit-list"><h2>Cours à reprendre en priorité</h2>${worst.length ? worst.map(row => `<article><div><b>${esc(row.title)}</b><small>${esc(row.id)} · ${row.completeWords} mots</small></div><ul>${row.issues.filter(entry => entry.severity !== "info").slice(0, 4).map(entry => `<li class="${entry.severity}">${esc(entry.message)}</li>`).join("")}</ul></article>`).join("") : `<p class="good">Aucune alerte éditoriale importante.</p>`}</section></section>`;
    document.body.appendChild(modal); document.documentElement.classList.add("hd216-diagnostic-open");
    modal.querySelectorAll("[data-hd216-close]").forEach(button => button.addEventListener("click", closeDiagnostic));
    modal.querySelector("[data-hd216-download]")?.addEventListener("click", () => downloadReport(report));
    modal.querySelector("[data-hd216-refresh]")?.addEventListener("click", () => { closeDiagnostic(); openDiagnostic(); });
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
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, contentAuditV2: true, vikingChapterFinal: true, diagnosticMode: true, reviewQueueIntegrity: true };
    window.HistoDailyContentAudit = { run: runAudit };
    window.HistoDailyQuality = { version: VERSION, run: runAudit, open: openDiagnostic, close: closeDiagnostic, repairReviewQueue, reviewRepair, vikingIds: VIKING_IDS };
  } catch {}

  try {
    const params = new URLSearchParams(location.search || "");
    if (params.get("diagnostic") === "1" || String(location.hash || "").toLowerCase() === "#diagnostic") setTimeout(openDiagnostic, 120);
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
        view: "express",
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
        <div class="hd218-head-stats" aria-label="Statistiques"><b title="Série">🔥 ${state.streak || 0}</b><b title="Gemmes">◆ ${state.gems || 0}</b><b title="Niveau">Niv. ${level()}</b></div>
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
          <div><small>${esc(lessonMeta(discovery))}</small><h3>${esc(discoveryContent?.title || discovery.title)}</h3><span>Express · cours complet · quiz</span></div>
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
      if (stage.kind === "lesson" && linkedLesson) return openLessonFromHome(linkedLesson.id, stage.view || "express");
      openModeLearn(disciplineId);
    });

    const openResume = () => resume ? openLessonFromHome(resume.id, "express") : openModeLearn(disciplineId);
    document.querySelector("[data-hd218-resume]")?.addEventListener("click", event => { event.stopPropagation(); openResume(); });
    document.querySelector("[data-hd218-resume-card]")?.addEventListener("click", openResume);
    document.querySelector("[data-hd218-resume-card]")?.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openResume(); } });

    const openDiscovery = () => discovery ? openLessonFromHome(discovery.id, "express") : openModeLearn(disciplineId);
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

  const VERSION = "1.0.0-beta.229.0";
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
        <div class="hd219-quick-stats"><b title="Série">🔥 ${state.streak || 0}</b><b title="Niveau">Niv. ${level()}</b></div>
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
      if (stage.kind === "lesson" && linkedLesson) return openLessonFromHome(linkedLesson.id, stage.view || "express");
      openModeLearn(disciplineId);
    });

    const openResume = () => resume ? openLessonFromHome(resume.id, "express") : openModeLearn(disciplineId);
    document.querySelector("[data-hd219-resume]")?.addEventListener("click", event => { event.stopPropagation(); openResume(); });
    document.querySelector("[data-hd219-resume-card]")?.addEventListener("click", openResume);
    document.querySelector("[data-hd219-resume-card]")?.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openResume(); } });

    const openDiscovery = () => discovery ? openLessonFromHome(discovery.id, "express") : openModeLearn(disciplineId);
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
