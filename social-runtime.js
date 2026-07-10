/* HistoDaily beta 178 — runtime multijoueur isolé.
   Le moteur solo reste inchangé. Ce module corrige uniquement les appels API,
   les demandes par code et la sémantique des classements. */
(() => {
  "use strict";
  const VERSION = "1.0.0-beta.178";
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
      currentMe.score = Math.max(Number(currentMe.score || 0), myScore);
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

  renderRank = function beta176RenderRank() {
    const scope = VALID_SCOPES.has(state.rankScope) ? state.rankScope : "daily";
    state.rankScope = scope;
    ensureServerLeaderboard(scope);
    if (scope === "friends") ensureServerFriends();
    const rows = leaderboardRows(scope);
    const me = rows.find(row => row.me);
    const localScope = scope === "friends" ? "daily" : scope;
    const myScore = scoreForScope(localScope);
    const mySolved = solvedCountForScope(localScope);
    const friendsOnly = scope === "friends";
    renderShell(`<header class="topbar"><button type="button" data-home>←</button><div><p class="eyebrow">Classements</p><h1>${esc(scopeLabel(scope))}</h1></div></header>
      <section class="tabs-clean rank-tabs"><button type="button" data-rank-scope="daily" class="${scope === "daily" ? "active" : ""}">Aujourd’hui</button><button type="button" data-rank-scope="week" class="${scope === "week" ? "active" : ""}">Semaine</button><button type="button" data-rank-scope="year" class="${scope === "year" ? "active" : ""}">Année</button><button type="button" data-rank-scope="friends" class="${scope === "friends" ? "active" : ""}">Amis</button></section>
      <section class="card social-rank-hero"><div><span class="card-label">Classement des mystères</span><h2>${friendsOnly ? "Toi et tes amis" : "Classement général"}</h2><p>Le score dépend des indices utilisés et du nombre d’essais. L’XP totale du profil est affichée séparément.</p></div><button type="button" data-open-profile>${esc(state.pseudo || "Profil")}</button></section>
      ${typeof socialBackendMarkup === "function" ? socialBackendMarkup() : ""}
      <section class="card rank-summary beta165-rank-summary beta167-rank-summary"><div><span>${esc(scoreLabel(localScope))}</span><strong>${myScore} pts</strong></div><div><span>XP totale</span><strong>${Number(state.xp || 0)} XP</strong></div><div><span>Mystères résolus</span><strong>${mySolved}</strong></div><div><span>Ta place</span><strong>#${me?.rank || "—"}</strong></div></section>
      <section class="card leaderboard leaderboard-modern beta165-leaderboard beta167-leaderboard">${rows.length ? rankRowsMarkup(rows) : emptyRankMarkup(scope)}</section>
      <p class="rank-note muted-note">Seul le bouton « Profil » ouvre une fiche, pour ne pas gêner le défilement.</p>
      ${friendsOnly ? `${addFriendMarkup()}${friendListMarkup()}` : ""}`);
    bindRankActions();
  };

  ensureServerLeaderboard = function beta176EnsureServerLeaderboard(scope = "daily") {
    return fetchServerLeaderboard(VALID_SCOPES.has(scope) ? scope : "daily").catch(() => null);
  };

  try {
    state.beta176SocialRuntimeVersion = VERSION;
    queueSaveState(100);
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, multiplayerRuntime: true, mysteryScoreRanking: true, apiTimeout: true };
  } catch {}
})();
