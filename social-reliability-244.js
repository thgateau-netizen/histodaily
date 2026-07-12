/* =========================================================
   Beta 244 — classement partagé et amis fiables
   Le serveur devient l'unique vérité dès qu'il a répondu.
   ========================================================= */
(function beta244SocialAndRankingTruth(){
  const BETA244_VERSION = "1.0.0-beta.245";
  const RESYNC_KEY = `${STORAGE_KEY}_beta244_exact_score_resync`;
  const previousLocalScoreForScope = typeof scoreForScope === "function" ? scoreForScope : () => 0;
  const previousMyPlayerProfile = typeof myPlayerProfile === "function" ? myPlayerProfile : null;
  let friendTruthInFlight = false;
  let socialTimer = null;

  function normCode(value = "") {
    try { return normalizeFriendCode(value); }
    catch { return String(value || "").trim().toUpperCase().replace(/\s+/g, "").replace(/[^A-Z0-9-]/g, ""); }
  }
  function isServerAuthoritative(scope = "daily") {
    const status = state.serverLeaderboardStatus?.[scope] || {};
    return Boolean(status.loadedAt && status.mode === "supabase" && status.authoritative !== false && Array.isArray(state.serverLeaderboards?.[scope]));
  }
  function selfMatches(row = {}) {
    const id = String(playerIdMe());
    const code = normCode(friendCode());
    return Boolean(
      row.me ||
      String(row.playerId || row.player_id || row.id || "") === id ||
      (code && normCode(row.friendCode || row.friend_code || row.code || "") === code)
    );
  }
  function rankRows(rows = []) {
    const sorted = [...rows].sort((a, b) => Number(b.score || 0) - Number(a.score || 0) || String(a.name || a.pseudo || "").localeCompare(String(b.name || b.pseudo || ""), "fr"));
    let previousScore = null;
    let previousRank = 0;
    return sorted.map((row, index) => {
      const score = Number(row.score || 0);
      const rank = previousScore !== null && score === previousScore ? previousRank : index + 1;
      previousScore = score;
      previousRank = rank;
      return { ...row, score, rank, me: selfMatches(row) };
    });
  }

  scoreForScope = function beta244ScoreForScope(scope = "daily") {
    if (isServerAuthoritative(scope)) {
      const me = remoteLeaderboardRows(scope).find(selfMatches);
      return Number(me?.score || 0);
    }
    return Number(previousLocalScoreForScope(scope) || 0);
  };

  myPlayerProfile = function beta244MyPlayerProfile() {
    const base = previousMyPlayerProfile ? previousMyPlayerProfile() : {
      id: playerIdMe(),
      playerId: playerIdMe(),
      name: state.pseudo || "Invité",
      me: true
    };
    return {
      ...base,
      id: playerIdMe(),
      playerId: playerIdMe(),
      friendCode: normCode(friendCode()),
      code: normCode(friendCode()),
      name: state.pseudo || base.name || "Invité",
      xp: Number(state.xp || base.xp || 0),
      score: scoreForScope(state.rankScope || "daily"),
      daily: scoreForScope("daily"),
      week: scoreForScope("week"),
      year: scoreForScope("year"),
      me: true
    };
  };

  scoreOfPlayer = function beta244ScoreOfPlayer(player = {}, scope = "daily") {
    if (player.me || selfMatches(player)) return scoreForScope(scope);
    if (scope === "week") return Number(player.week ?? player.score ?? 0);
    if (scope === "year") return Number(player.year ?? player.score ?? 0);
    return Number(player.daily ?? player.score ?? 0);
  };

  leaderboardRows = function beta244LeaderboardRows(scope = state.rankScope || "daily") {
    if (isServerAuthoritative(scope)) return rankRows(remoteLeaderboardRows(scope));
    const localRows = [myPlayerProfile(), ...friendProfiles()].map(player => ({
      ...player,
      score: scoreOfPlayer(player, scope),
      me: selfMatches(player)
    })).filter(row => Number(row.score || 0) > 0 || row.me);
    return rankRows(localRows);
  };

  scorePayloadForMystery = function beta244ScorePayloadForMystery(mysteryId) {
    const mystery = data.mysteries.find(item => item.id === mysteryId) || {};
    const solved = state.solvedMysteries?.[mysteryId] || {};
    const exactScore = Math.max(0, Number(solved.score ?? mysteryScore(mysteryId) ?? 0));
    return {
      playerId: playerIdMe(),
      pseudo: currentPseudo(),
      friendCode: friendCode(),
      mysteryId,
      dayKey: localDayKey(solved.at || Date.now()),
      score: exactScore,
      hints: Number(solved.hints || 0),
      tries: Math.max(1, Number(solved.tries || 1)),
      difficulty: mystery.difficulty || "moyen",
      solvedAt: Number(solved.at || Date.now()),
      level: level(),
      xp: Number(state.xp || 0),
      solvedCount: Object.keys(state.solvedMysteries || {}).length,
      streak: Number(state.streak || 0),
      scoreMode: "mystery_score"
    };
  };

  fetchServerLeaderboard = async function beta244FetchServerLeaderboard(scope = "daily", { force = false } = {}) {
    if (!isOnline) return;
    const now = Date.now();
    const status = state.serverLeaderboardStatus?.[scope] || {};
    if (!force && status.loadedAt && now - Number(status.loadedAt || 0) < 25000) return;
    if (leaderboardFetchInFlight.has(scope)) return;
    leaderboardFetchInFlight.add(scope);
    state.serverLeaderboardStatus = { ...(state.serverLeaderboardStatus || {}), [scope]: { ...status, loading: true } };
    queueSaveState(100);
    try {
      if (typeof beta128FlushScoreOutbox === "function") await beta128FlushScoreOutbox({ force, reason: `beta244:${scope}` }).catch(() => {});
      await syncMyProfileToServer({ source: `leaderboard-${scope}-beta244` }).catch(() => null);
      const range = rangeForScope(scope === "friends" ? "daily" : scope);
      const params = new URLSearchParams({
        scope,
        periodKey: localDayKey(),
        playerId: playerIdMe(),
        myFriendCode: friendCode(),
        rangeStart: new Date(range.start).toISOString(),
        rangeEnd: new Date(range.end).toISOString(),
        _: String(Date.now())
      });
      const response = await fetch(`/api/v1/leaderboard/daily?${params.toString()}`, { cache: "no-store" });
      const json = await response.json().catch(() => ({}));
      const success = response.ok && json?.ok !== false && json?.mode === "supabase" && json?.authoritative === true;
      if (success) {
        if (json.canonicalPlayerId || json.canonicalFriendCode) {
          try { beta142AdoptServerIdentity(json); } catch {}
        }
        state.serverLeaderboards = { ...(state.serverLeaderboards || {}), [scope]: Array.isArray(json.rows) ? json.rows : [] };
      }
      state.serverLeaderboardStatus = {
        ...(state.serverLeaderboardStatus || {}),
        [scope]: {
          loading: false,
          loadedAt: Date.now(),
          mode: success ? "supabase" : "error",
          authoritative: success,
          generatedAt: json.generatedAt || "",
          note: success ? "Classement partagé actualisé." : (json.note || "Classement partagé indisponible.")
        }
      };
      queueSaveState(100);
      if (state.tab === "rank" && (state.rankScope || "daily") === scope) render({ immediate: true });
    } catch {
      state.serverLeaderboardStatus = {
        ...(state.serverLeaderboardStatus || {}),
        [scope]: { loading: false, loadedAt: Date.now(), mode: "error", authoritative: false, note: "Classement partagé indisponible." }
      };
      queueSaveState(100);
    } finally {
      leaderboardFetchInFlight.delete(scope);
    }
  };

  fetchServerFriends = async function beta244FetchServerFriends({ force = false } = {}) {
    if (!isOnline || friendTruthInFlight) return;
    const status = state.serverFriendsStatus || {};
    if (!force && status.loadedAt && Date.now() - Number(status.loadedAt || 0) < 20000) return;
    friendTruthInFlight = true;
    state.serverFriendsStatus = { ...status, loading: true };
    queueSaveState(100);
    try {
      await syncMyProfileToServer({ source: "social-state-beta244" }).catch(() => null);
      const params = new URLSearchParams({
        playerId: playerIdMe(),
        friendCode: friendCode(),
        pseudo: currentPseudo(),
        _: String(Date.now())
      });
      const response = await fetch(`/api/v1/friends/sync?${params.toString()}`, { cache: "no-store" });
      const json = await response.json().catch(() => ({}));
      const success = response.ok && json?.ok !== false && json?.mode === "supabase";
      if (success) {
        try { beta142ApplyServerSocialSnapshot(json); }
        catch {
          if (Array.isArray(json.friends) && typeof beta141FriendMapFromServer === "function") state.friends = beta141FriendMapFromServer(json.friends);
          if (json.requests && typeof beta125SetFriendRequests === "function") beta125SetFriendRequests(json.requests);
        }
        state.serverLeaderboards = { ...(state.serverLeaderboards || {}), friends: [] };
        state.serverLeaderboardStatus = { ...(state.serverLeaderboardStatus || {}), friends: { loadedAt: 0, mode: "refresh", authoritative: false, note: "Amis actualisés." } };
      }
      state.serverFriendsStatus = {
        loading: false,
        loadedAt: Date.now(),
        mode: success ? "supabase" : "error",
        authoritative: success,
        message: success ? "Amis et demandes actualisés." : (json.message || "Amis indisponibles.")
      };
      queueSaveState(100);
      if (success) fetchServerLeaderboard("friends", { force: true }).catch(() => {});
      if (["profile", "rank", "publicProfile"].includes(state.tab)) render({ immediate: true });
    } catch {
      state.serverFriendsStatus = { loading: false, loadedAt: Date.now(), mode: "error", authoritative: false, message: "Amis indisponibles." };
      queueSaveState(100);
    } finally {
      friendTruthInFlight = false;
    }
  };


  function requestSnapshot() {
    try { return typeof beta125FriendRequestsState === "function" ? beta125FriendRequestsState() : { incoming: [], outgoing: [], history: [] }; }
    catch { return { incoming: [], outgoing: [], history: [] }; }
  }
  function authoritativeSyncLine(scope) {
    const status = state.serverLeaderboardStatus?.[scope] || {};
    if (!isOnline) return "Hors ligne : affichage local provisoire.";
    if (status.loading) return "Actualisation du classement partagé…";
    if (status.mode === "supabase" && status.authoritative) {
      const seconds = Math.max(0, Math.round((Date.now() - Number(status.loadedAt || 0)) / 1000));
      return `Même classement pour tous · actualisé ${seconds < 5 ? "à l’instant" : `il y a ${seconds} s`}`;
    }
    return status.note || "Connexion au classement partagé en attente.";
  }
  function friendRequestsMarkup243() {
    try { return typeof beta125RequestCardMarkup === "function" ? beta125RequestCardMarkup({ compact: false }) : ""; }
    catch { return ""; }
  }
  function rowsMarkup244(rows = [], scope = "daily") {
    if (!rows.length) return `<div class="hd242-empty"><strong>Aucun score reçu</strong><p>Le classement se remplira après la résolution du dossier du jour.</p></div>`;
    return rows.map(row => {
      const score = Number(row.score || 0);
      const xp = Number(row.xp || 0);
      const noScoreYet = scope === "friends" && score === 0;
      const detail = row.me
        ? `${score > 0 ? "score confirmé par le serveur" : "pas encore joué aujourd’hui"}${xp ? ` · ${xp} XP au total` : ""}`
        : noScoreYet
          ? `pas encore joué aujourd’hui${xp ? ` · ${xp} XP au total` : ""}`
          : `score partagé${xp ? ` · ${xp} XP au total` : ""}`;
      return `<div class="hd242-rank-row${row.me ? " me" : ""}${noScoreYet ? " zero-score" : ""}"><span class="hd242-position">${row.rank}</span><button type="button" class="hd242-player" ${row.me ? "disabled" : `data-view-profile="${escapeHtml(row.id)}"`}><strong>${escapeHtml(row.name || row.pseudo || "Joueur")}${row.me ? " · toi" : ""}</strong><small>${escapeHtml(detail)}</small></button><b>${score} pt</b></div>`;
    }).join("");
  }

  renderRank = function beta244RenderRank() {
    const scope = ["daily", "week", "year", "friends"].includes(state.rankScope) ? state.rankScope : "daily";
    state.rankScope = scope;
    const rows = leaderboardRows(scope);
    const me = rows.find(row => row.me);
    const score = scoreForScope(scope);
    const solved = solvedCountForScope(scope === "friends" ? "daily" : scope);
    const requests = requestSnapshot();
    const incomingCount = Array.isArray(requests.incoming) ? requests.incoming.length : 0;
    const friendCount = Object.keys(state.friends || {}).length;
    const periodLabel = ({ daily: "Aujourd’hui", week: "Semaine", year: "Année", friends: "Amis" })[scope];
    const help = scope === "week" ? "Somme des scores obtenus depuis lundi."
      : scope === "year" ? "Somme des scores obtenus depuis le 1er janvier."
      : scope === "friends" ? "Tous les amis acceptés apparaissent. Le classement utilise le score du jour ; l’XP totale reste indiquée sous le profil."
      : "Score du jour : les indices et essais supplémentaires réduisent le résultat.";

    renderShell(`<header class="topbar hd242-rank-topbar"><button type="button" data-home aria-label="Retour">←</button><div><p class="eyebrow">Classement</p><h1>${escapeHtml(periodLabel)}</h1></div><button type="button" class="hd242-profile-button" data-open-profile>${escapeHtml((state.pseudo || "P").charAt(0).toUpperCase())}</button></header>
      <nav class="hd242-rank-tabs" aria-label="Choisir un classement">
        ${["daily","week","year","friends"].map(key => `<button type="button" data-rank-scope="${key}" class="${scope === key ? "active" : ""}" aria-current="${scope === key ? "page" : "false"}">${key === "friends" && incomingCount ? `Amis <span>${incomingCount}</span>` : escapeHtml(({ daily: "Aujourd’hui", week: "Semaine", year: "Année", friends: "Amis" })[key])}</button>`).join("")}
      </nav>
      <section class="card hd242-score-card"><div class="hd242-score-head"><div><span class="card-label">Ton résultat partagé</span><h2>${score} points</h2><p>${escapeHtml(help)}</p></div><button type="button" data-refresh-ranking>Actualiser</button></div><div class="hd242-kpis"><div><b>#${me?.rank || "—"}</b><span>ta place</span></div><div><b>${solved}</b><span>dossier${solved > 1 ? "s" : ""} compté${solved > 1 ? "s" : ""}</span></div>${scope === "friends" ? `<div><b>${friendCount}</b><span>ami${friendCount > 1 ? "s" : ""} accepté${friendCount > 1 ? "s" : ""}</span></div>` : ""}</div><small class="hd242-sync-line">${escapeHtml(authoritativeSyncLine(scope))}</small></section>
      ${scope === "friends" ? friendRequestsMarkup243() : ""}
      <section class="card hd242-leaderboard"><div class="section-title-row"><div><span class="card-label">${scope === "friends" ? "Entre amis" : "Classement général"}</span><h2>${rows.length} joueur${rows.length > 1 ? "s" : ""}</h2></div></div><div class="hd242-rank-list">${rowsMarkup244(rows, scope)}</div></section>
      ${scope === "friends" ? `${addFriendMarkup()}${friendListMarkup()}` : ""}`);

    document.querySelectorAll("[data-rank-scope]").forEach(button => button.onclick = event => {
      event.preventDefault();
      setState({ tab: "rank", rankScope: button.dataset.rankScope || "daily" }, { save: true, renderImmediate: true });
    });
    document.querySelectorAll("[data-view-profile]").forEach(button => button.onclick = event => { event.preventDefault(); viewProfile(button.dataset.viewProfile || ""); });
    document.querySelectorAll("[data-remove-friend]").forEach(button => button.onclick = event => { event.preventDefault(); event.stopPropagation(); removeFriend(button.dataset.removeFriend); });
    document.querySelector("[data-add-friend]")?.addEventListener("submit", addFriend);
    document.querySelector("[data-friend-code-input]")?.addEventListener("input", event => { state.friendCodeDraft = event.currentTarget.value || ""; queueSaveState(200); });
    document.querySelector("[data-share-invite]")?.addEventListener("click", shareInviteCode);
    document.querySelector("[data-home]")?.addEventListener("click", () => setState({ tab: "home" }));
    document.querySelector("[data-open-profile]")?.addEventListener("click", () => setState({ tab: "profile" }));
    document.querySelector("[data-refresh-ranking]")?.addEventListener("click", async event => {
      const button = event.currentTarget;
      button.disabled = true;
      button.textContent = "Actualisation…";
      await fetchServerFriends({ force: true }).catch(() => {});
      await fetchServerLeaderboard(scope, { force: true }).catch(() => {});
      render({ immediate: true });
    });

    fetchServerFriends({ force: false }).catch(() => {});
    fetchServerLeaderboard(scope, { force: false }).catch(() => {});
  };

  function resyncExactScoresOnce() {
    let already = "";
    try { already = localStorage.getItem(RESYNC_KEY) || ""; } catch {}
    if (already === BETA244_VERSION) return;
    try {
      Object.keys(state.solvedMysteries || {}).forEach(mysteryId => {
        if (typeof beta128QueueScorePayload === "function") beta128QueueScorePayload(scorePayloadForMystery(mysteryId), "beta244-exact-score-repair");
      });
      localStorage.setItem(RESYNC_KEY, BETA244_VERSION);
      if (typeof beta128FlushScoreOutbox === "function") beta128FlushScoreOutbox({ force: true, reason: "beta244-repair" }).catch(() => {});
    } catch {}
  }

  function refreshVisibleSocial(force = false) {
    if (!isOnline || document.visibilityState === "hidden") return;
    fetchServerFriends({ force }).catch(() => {});
    if (state.tab === "rank") fetchServerLeaderboard(state.rankScope || "daily", { force }).catch(() => {});
  }
  function scheduleSocialRefresh() {
    try { clearInterval(socialTimer); } catch {}
    socialTimer = setInterval(() => {
      if (["profile", "rank", "publicProfile"].includes(state.tab)) refreshVisibleSocial(true);
    }, 15000);
  }

  try {
    state.serverLeaderboards = {};
    state.serverLeaderboardStatus = {};
    state.rankSemanticsVersion = BETA244_VERSION;
    state.beta244SocialTruth = true;
    queueSaveState(100);
    resyncExactScoresOnce();
    setTimeout(() => refreshVisibleSocial(true), 700);
    scheduleSocialRefresh();
    window.addEventListener("online", () => refreshVisibleSocial(true));
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") refreshVisibleSocial(true);
    });
    window.HistoDaily = { ...(window.HistoDaily || {}), version: BETA244_VERSION, serverScoreAuthority: true, canonicalFriends: true };
  } catch (error) {
    try { console.warn("beta244 social truth", error); } catch {}
  }
})();
