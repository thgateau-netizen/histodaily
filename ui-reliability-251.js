/* =========================================================
   HistoDaily beta 250 — stabilité mobile, profil compact et
   récupération prudente des relations locales historiques.
   ========================================================= */
(function beta251UiReliability(){
  "use strict";

  const VERSION = "1.0.0-beta.251";
  const BASE_KEY = typeof STORAGE_KEY === "string" ? STORAGE_KEY : "histodaily_state";
  const LEGACY_FRIENDS_KEY = `${BASE_KEY}_beta250_legacy_friends`;
  const REMOVED_FRIENDS_KEY = `${BASE_KEY}_beta250_removed_friends`;
  const REPAIR_ATTEMPTS_KEY = `${BASE_KEY}_beta250_friend_repair_attempts`;
  const SOCIAL_OPS_KEY = `${BASE_KEY}_social_mutations_v2`;
  let repairPromise = null;
  let lastRenderedTab = "";

  function resetScrollOnEntry(tab = "") {
    const entering = lastRenderedTab !== tab;
    lastRenderedTab = tab;
    if (!entering) return;
    window.requestAnimationFrame?.(() => {
      try { window.scrollTo({ top: 0, left: 0, behavior: "auto" }); } catch { window.scrollTo(0, 0); }
      try { document.documentElement.scrollTop = 0; document.body.scrollTop = 0; } catch {}
      try { document.querySelector(`.app-shell.tab-${tab}`)?.scrollTo?.({ top: 0, left: 0, behavior: "auto" }); } catch {}
    });
  }

  function esc(value = "") {
    try { return escapeHtml(String(value ?? "")); }
    catch { return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c])); }
  }
  function jsonRead(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "null");
      return parsed == null ? fallback : parsed;
    } catch { return fallback; }
  }
  function jsonWrite(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { return false; }
  }
  function norm(value = "") {
    try { return normalizeFriendCode(value); }
    catch { return String(value || "").trim().toUpperCase().replace(/\s+/g, "").replace(/[^A-Z0-9-]/g, ""); }
  }
  function friendCodeOf(friend = {}, fallback = "") {
    return norm(friend.code || friend.friendCode || friend.friend_code || friend.id || fallback || "");
  }
  function friendPlayerId(friend = {}) {
    return String(friend.playerId || friend.player_id || friend.friend_player_id || "").trim();
  }
  function friendStableKey(friend = {}, fallback = "") {
    const code = friendCodeOf(friend, fallback);
    const id = friendPlayerId(friend);
    return code ? `code:${code}` : id ? `id:${id}` : "";
  }
  function selfMatches(friend = {}) {
    const code = friendCodeOf(friend);
    const id = friendPlayerId(friend);
    const mineCode = norm(typeof friendCode === "function" ? friendCode() : "");
    const mineId = String(typeof playerIdMe === "function" ? playerIdMe() : "");
    return Boolean((code && mineCode && code === mineCode) || (id && mineId && id === mineId));
  }
  function pendingRemovalSet() {
    const result = new Set();
    const removed = jsonRead(REMOVED_FRIENDS_KEY, {});
    Object.keys(removed && typeof removed === "object" ? removed : {}).forEach(key => result.add(key));
    const ops = jsonRead(SOCIAL_OPS_KEY, []);
    (Array.isArray(ops) ? ops : []).filter(op => op?.type === "removeFriend").forEach(op => {
      if (op.targetKey) result.add(String(op.targetKey));
      const key = friendStableKey(op.backup || op.payload || {}, op.backupKey || "");
      if (key) result.add(key);
    });
    return result;
  }
  function cleanFriend(friend = {}, fallback = "") {
    const code = friendCodeOf(friend, fallback);
    const playerId = friendPlayerId(friend);
    const name = String(friend.name || friend.pseudo || friend.friend_pseudo || "Ami").trim().slice(0, 32) || "Ami";
    if (!code && !playerId) return null;
    return {
      ...friend,
      id: code || friend.id || playerId,
      code,
      playerId,
      name,
      avatar: String(friend.avatar || name.charAt(0) || "A").charAt(0).toUpperCase(),
      level: Math.max(1, Number(friend.level || 1)),
      xp: Math.max(0, Number(friend.xp || 0)),
      solved: Math.max(0, Number(friend.solved || friend.solved_count || 0)),
      streak: Math.max(0, Number(friend.streak || 0)),
      daily: Math.max(0, Number(friend.daily || friend.score || 0)),
      week: Math.max(0, Number(friend.week || 0)),
      year: Math.max(0, Number(friend.year || 0))
    };
  }
  function mapByStableKey(source = {}) {
    const map = new Map();
    for (const [fallback, raw] of Object.entries(source && typeof source === "object" ? source : {})) {
      const friend = cleanFriend(raw, fallback);
      if (!friend || selfMatches(friend)) continue;
      const key = friendStableKey(friend, fallback);
      if (key) map.set(key, friend);
    }
    return map;
  }
  function preservedFriends() {
    return mapByStableKey(jsonRead(LEGACY_FRIENDS_KEY, {}));
  }
  function savePreserved(map) {
    const object = {};
    for (const [key, friend] of map.entries()) object[friend.code || friend.id || key] = friend;
    jsonWrite(LEGACY_FRIENDS_KEY, object);
  }
  function recoverFriendsFromStorage() {
    const removed = pendingRemovalSet();
    const recovered = preservedFriends();
    const allowedKeys = new Set([
      BASE_KEY, `${BASE_KEY}_backup`, `${BASE_KEY}_snapshot`, `${BASE_KEY}_tmp`,
      ...(window.HISTODAILY_CORE?.legacyStorageKeys || [])
    ]);
    const absorbCandidate = candidate => {
      if (!candidate || typeof candidate !== "object") return;
      for (const [stable, friend] of mapByStableKey(candidate.friends || {})) {
        // Seuls les anciens amis locaux sont des candidats de migration. Une
        // relation déjà certifiée serveur suivra ensuite la vérité Supabase.
        if (friend.server === true && !friend.pendingServerStats && !friend.legacyRecovered) continue;
        if (removed.has(stable)) continue;
        const previous = recovered.get(stable) || {};
        recovered.set(stable, { ...friend, ...previous, legacyRecovered: true, pendingServerStats: true });
      }
      // Une ancienne vue « Amis » est une preuve plus sûre qu’un classement
      // général : elle permet de retrouver un profil effacé du map principal.
      for (const [bucket, rows] of Object.entries(candidate.serverLeaderboards || {})) {
        if (!(bucket === "friends" || bucket.startsWith("friends:")) || !Array.isArray(rows)) continue;
        for (const row of rows) {
          const friend = cleanFriend(row);
          if (!friend || selfMatches(friend) || row?.me === true) continue;
          const stable = friendStableKey(friend);
          if (!stable || removed.has(stable)) continue;
          const previous = recovered.get(stable) || {};
          recovered.set(stable, { ...friend, ...previous, legacyRecovered: true, pendingServerStats: true });
        }
      }
      const history = candidate.friendRequests?.history;
      for (const request of Array.isArray(history) ? history : []) {
        if (String(request.status || request.response || "").toLowerCase() !== "accepted") continue;
        const friend = cleanFriend({
          id: request.otherFriendCode || request.requesterFriendCode || request.targetFriendCode,
          code: request.otherFriendCode || request.requesterFriendCode || request.targetFriendCode,
          playerId: request.otherPlayerId || request.requesterPlayerId || request.targetPlayerId,
          name: request.otherPseudo || request.requesterPseudo || request.targetPseudo || "Ami"
        });
        if (!friend || selfMatches(friend)) continue;
        const stable = friendStableKey(friend);
        if (!stable || removed.has(stable)) continue;
        const previous = recovered.get(stable) || {};
        recovered.set(stable, { ...friend, ...previous, legacyRecovered: true, pendingServerStats: true });
      }
    };
    for (const key of allowedKeys) absorbCandidate(jsonRead(key, null));
    absorbCandidate(state);
    for (const [stable, friend] of mapByStableKey(state.friends || {})) {
      if (removed.has(stable)) continue;
      if (friend.server !== true || friend.pendingServerStats || friend.legacyRecovered) {
        const previous = recovered.get(stable) || {};
        recovered.set(stable, { ...friend, ...previous, legacyRecovered: true, pendingServerStats: true });
      }
    }
    savePreserved(recovered);
    mergePreservedIntoState(recovered);
    return recovered;
  }
  function mergePreservedIntoState(map = preservedFriends()) {
    const removed = pendingRemovalSet();
    const current = mapByStableKey(state.friends || {});
    let changed = false;
    for (const [stable, legacy] of map.entries()) {
      if (removed.has(stable) || current.has(stable)) continue;
      current.set(stable, { ...legacy, legacyRecovered: true, pendingServerStats: true });
      changed = true;
    }
    if (changed) {
      const next = {};
      for (const [stable, friend] of current.entries()) next[friend.code || friend.id || stable] = friend;
      state.friends = next;
      try { queueSaveState?.(60); } catch {}
    }
    return changed;
  }
  function prunePreservedFromServer(json = {}) {
    if (!Array.isArray(json.friends) || !json.friends.length) return preservedFriends();
    const preserved = preservedFriends();
    for (const [, raw] of Object.entries(json.friends)) {
      const friend = cleanFriend(raw);
      const key = friend && friendStableKey(friend);
      if (key) preserved.delete(key);
    }
    savePreserved(preserved);
    return preserved;
  }

  // Empêche une réponse serveur vide de faire disparaître un ancien ami local
  // avant que la migration ponctuelle ait eu le temps de le restaurer.
  const previousApplySnapshot = typeof beta142ApplyServerSocialSnapshot === "function" ? beta142ApplyServerSocialSnapshot : null;
  if (previousApplySnapshot) {
    beta142ApplyServerSocialSnapshot = function beta250ApplyServerSocialSnapshot(json = {}) {
      const preserved = prunePreservedFromServer(json);
      const result = previousApplySnapshot(json);
      mergePreservedIntoState(preserved);
      return result;
    };
  }

  const previousRemoveFriend = typeof removeFriend === "function" ? removeFriend : null;
  if (previousRemoveFriend) {
    removeFriend = function beta250RemoveFriend(id = "") {
      const friend = Object.entries(state.friends || {}).find(([key, item]) => {
        const value = String(id || "");
        return key === value || item?.id === value || friendPlayerId(item) === value || friendCodeOf(item) === norm(value);
      });
      if (friend) {
        const stable = friendStableKey(friend[1], friend[0]);
        const removed = jsonRead(REMOVED_FRIENDS_KEY, {});
        if (stable) removed[stable] = Date.now();
        jsonWrite(REMOVED_FRIENDS_KEY, removed);
        const preserved = preservedFriends();
        if (stable) preserved.delete(stable);
        savePreserved(preserved);
      }
      return previousRemoveFriend(id);
    };
  }

  async function repairLegacyFriends({ force = false } = {}) {
    if (repairPromise) return repairPromise;
    if (typeof isOnline !== "undefined" && !isOnline) return [];
    repairPromise = (async () => {
      const preserved = recoverFriendsFromStorage();
      const removed = pendingRemovalSet();
      const attempts = jsonRead(REPAIR_ATTEMPTS_KEY, {});
      const repaired = [];
      for (const [stable, friend] of [...preserved.entries()].slice(0, 12)) {
        if (removed.has(stable)) continue;
        const lastTry = Number(attempts[stable] || 0);
        if (!force && lastTry && Date.now() - lastTry < 30 * 60 * 1000) continue;
        attempts[stable] = Date.now();
        jsonWrite(REPAIR_ATTEMPTS_KEY, attempts);
        try {
          const response = await fetch("/api/v1/friends/sync", {
            method: "POST",
            cache: "no-store",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "repair-legacy-relation",
              playerId: typeof playerIdMe === "function" ? playerIdMe() : "",
              myFriendCode: typeof friendCode === "function" ? friendCode() : "",
              pseudo: typeof currentPseudo === "function" ? currentPseudo() : (state.pseudo || "Invité"),
              friendPlayerId: friendPlayerId(friend),
              friendCode: friendCodeOf(friend),
              friendPseudo: friend.name || "Ami",
              level: typeof level === "function" ? level() : 1,
              xp: Math.max(0, Number(state.xp || 0)),
              solvedCount: Object.keys(state.solvedMysteries || {}).length,
              streak: Math.max(0, Number(state.streak || 0))
            })
          });
          const json = await response.json().catch(() => ({}));
          if (response.ok && json?.stored && /^supabase(?:-|$)/.test(String(json.mode || ""))) {
            preserved.delete(stable);
            savePreserved(preserved);
            previousApplySnapshot?.(json);
            repaired.push(stable);
          }
        } catch {}
      }
      if (repaired.length && typeof fetchServerFriends === "function") {
        await fetchServerFriends({ force: true }).catch(() => null);
      } else {
        mergePreservedIntoState(preserved);
      }
      return repaired;
    })().finally(() => { repairPromise = null; });
    return repairPromise;
  }

  function requestsState() {
    try { return beta125FriendRequestsState?.() || { incoming: [], outgoing: [], history: [] }; }
    catch { return { incoming: [], outgoing: [], history: [] }; }
  }
  function pendingScores() {
    try { return Number(beta128PendingScoreCount?.() || 0); }
    catch { return 0; }
  }
  function initials(name = "") {
    const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
    return (parts.slice(0, 2).map(part => part.charAt(0)).join("") || "H").toUpperCase();
  }
  function serverState() {
    const friendStatus = state.serverFriendsStatus || {};
    const boardStatuses = Object.values(state.serverLeaderboardStatus || {});
    const error = friendStatus.mode === "error" || friendStatus.mode === "supabase-error" || boardStatuses.some(item => item?.mode === "error" || item?.mode === "supabase-error");
    const loading = Boolean(friendStatus.loading || boardStatuses.some(item => item?.loading));
    const ok = /^supabase(?:-|$)/.test(String(friendStatus.mode || "")) || boardStatuses.some(item => item?.authoritative && item?.mode === "supabase");
    return { error, loading, ok };
  }

  function compactSyncMarkup() {
    const count = pendingScores();
    const online = typeof isOnline === "undefined" ? navigator.onLine : isOnline;
    const server = serverState();
    if (count) return `<div class="hd250-sync-strip"><div><b>${count} score${count > 1 ? "s" : ""} à synchroniser</b><span>${online ? "Renvoi vers Supabase prêt. Aucun score local n’est perdu." : "Le renvoi reprendra automatiquement au retour du réseau."}</span></div><button type="button" data-hd250-resync>${online ? "Renvoyer" : "Réessayer"}</button></div>`;
    if (!online || server.error) return `<div class="hd250-sync-strip"><div><b>${online ? "Multi à actualiser" : "Mode hors ligne"}</b><span>${online ? "Les données locales restent intactes pendant la nouvelle tentative." : "Les scores et les amis restent disponibles sur cet appareil."}</span></div><button type="button" data-hd250-resync>Actualiser</button></div>`;
    if (server.loading) return `<div class="hd250-sync-strip ok"><div><b>Synchronisation en cours</b><span>Mise à jour des profils, amis et classements.</span></div></div>`;
    return "";
  }

  function identityMarkup() {
    return `<section class="card pseudo-card"><div><span class="card-label">Identité</span><h2>Pseudo du joueur</h2><p>Utilisé dans les profils et les classements.</p></div><form data-pseudo-form novalidate><input data-pseudo-input name="pseudo" type="text" value="${esc(state.pseudo || "Invité")}" maxlength="18" autocomplete="nickname" autocapitalize="words" enterkeyhint="done"/><button type="button" data-save-pseudo>Enregistrer</button></form>${state.profileFeedback ? `<p class="profile-feedback">${esc(state.profileFeedback)}</p>` : ""}</section>`;
  }

  function renderProfile250() {
    const name = String(state.pseudo || "Invité").trim() || "Invité";
    const friends = typeof friendProfiles === "function" ? friendProfiles() : [];
    const requests = requestsState();
    const incoming = Array.isArray(requests.incoming) ? requests.incoming.length : 0;
    const outgoing = Array.isArray(requests.outgoing) ? requests.outgoing.length : 0;
    const solved = Object.keys(state.solvedMysteries || {}).length;
    const xp = Math.max(0, Number(state.xp || 0));
    const currentLevel = typeof level === "function" ? level() : 1;
    const requestMarkup = typeof beta125RequestCardMarkup === "function" ? beta125RequestCardMarkup({ compact: false }) : "";
    const addMarkup = typeof addFriendMarkup === "function" ? addFriendMarkup() : "";
    const listMarkup = typeof friendListMarkup === "function" ? friendListMarkup() : "";
    const inviteMarkup = typeof socialInviteLinkMarkup === "function" ? socialInviteLinkMarkup() : "";
    const settingsMarkup = [
      typeof backupToolsMarkup === "function" ? backupToolsMarkup() : "",
      typeof installPromptMarkup === "function" ? installPromptMarkup() : "",
      typeof profileSettingsMarkup === "function" ? profileSettingsMarkup() : ""
    ].join("");

    renderShell(`<div class="hd250-profile">
      <header class="hd250-profile-head"><button type="button" class="hd250-icon-btn" data-home aria-label="Retour à l’accueil">←</button><div><p class="eyebrow">Espace joueur</p><h1>Profil</h1></div><button type="button" class="hd250-icon-btn" data-hd250-refresh aria-label="Actualiser">↻</button></header>
      <section class="hd250-profile-hero">
        <div class="hd250-profile-person"><div class="hd250-profile-avatar">${esc(initials(name))}</div><div><span class="card-label">Explorateur · niveau ${currentLevel}</span><h2>${esc(name)}</h2><p>Ta progression reste enregistrée sur cet appareil et synchronisée quand le multi répond.</p></div></div>
        <div class="hd250-profile-stats"><div><b>${currentLevel}</b><span>Niveau</span></div><div><b>${xp}</b><span>XP</span></div><div><b>${state.streak || 0}</b><span>Série</span></div><div><b>${solved}</b><span>Dossiers</span></div></div>
      </section>
      <section class="hd250-profile-card"><div class="hd250-profile-card-head"><div><span class="card-label">Amis et classements</span><h2>Ton espace multi</h2><p>${friends.length ? `${friends.length} ami${friends.length > 1 ? "s" : ""} enregistré${friends.length > 1 ? "s" : ""}.` : "Ajoute ou restaure un ami pour comparer les scores."}${incoming ? ` ${incoming} demande${incoming > 1 ? "s" : ""} à traiter.` : ""}</p></div><div class="hd250-social-count"><b>${friends.length}</b><span>ami${friends.length > 1 ? "s" : ""}</span></div></div><div class="hd250-profile-actions"><button type="button" data-hd250-rank="friends">Classement amis</button><button type="button" class="ghost" data-hd250-rank="general">Classement général</button></div></section>
      ${compactSyncMarkup()}
      <details ${incoming || outgoing ? "open" : ""}><summary><span>Gérer le profil et les amis</span><small>${incoming ? `${incoming} reçue${incoming > 1 ? "s" : ""}` : friends.length ? `${friends.length} ami${friends.length > 1 ? "s" : ""}` : "Ajouter"}</small></summary><div class="hd250-details-body">${identityMarkup()}${requestMarkup}${addMarkup}${listMarkup}${inviteMarkup}</div></details>
      <details><summary><span>Réglages et sauvegarde</span><small>Données locales</small></summary><div class="hd250-details-body">${settingsMarkup}</div></details>
    </div>`);

    resetScrollOnEntry("profile");
    const shell = document.querySelector(".app-shell.tab-profile");
    shell?.classList.remove("hd220-profile-shell");
    shell?.classList.add("hd250-profile-shell");

    document.querySelector("[data-home]")?.addEventListener("click", () => setState({ tab: "home" }));
    document.querySelector("[data-hd250-refresh]")?.addEventListener("click", () => refreshAll(true));
    document.querySelectorAll("[data-hd250-rank]").forEach(button => button.addEventListener("click", () => {
      const audience = button.dataset.hd250Rank === "friends" ? "friends" : "general";
      setState({ tab: "rank", rankAudience: audience, rankPeriod: "daily", rankFriendPeriod: "daily", rankScope: audience === "friends" ? "friends" : "daily" });
    }));
    document.querySelector("[data-hd250-resync]")?.addEventListener("click", () => refreshAll(true));
    const pseudoForm = document.querySelector("[data-pseudo-form]");
    const pseudoInput = document.querySelector("[data-pseudo-input]");
    pseudoForm?.addEventListener("submit", updatePseudo);
    document.querySelector("[data-save-pseudo]")?.addEventListener("click", updatePseudo);
    pseudoInput?.addEventListener("keydown", event => { if (event.key === "Enter") updatePseudo(event); });
    pseudoInput?.addEventListener("change", event => { try { savePseudoValue(event.currentTarget.value, { source: "change" }); } catch {} });
    document.querySelector("[data-add-friend]")?.addEventListener("submit", addFriend);
    document.querySelector("[data-share-invite]")?.addEventListener("click", shareInviteCode);
    document.querySelector("[data-copy-invite-link]")?.addEventListener("click", copyInviteLink);
    document.querySelectorAll("[data-view-profile]").forEach(button => button.addEventListener("click", () => viewProfile(button.dataset.viewProfile || "")));
    document.querySelectorAll("[data-remove-friend]").forEach(button => button.addEventListener("click", event => { event.stopPropagation(); removeFriend(button.dataset.removeFriend || ""); }));
    document.querySelectorAll("button[data-performance-mode]").forEach(button => button.addEventListener("click", () => setPerformanceMode(button.dataset.performanceMode)));
    document.querySelector("[data-export-save]")?.addEventListener("click", exportLocalSave);
    document.querySelector("[data-download-save]")?.addEventListener("click", downloadLocalSave);
    document.querySelector("[data-import-save]")?.addEventListener("click", importLocalSave);
    document.querySelector("[data-reset-progress]")?.addEventListener("click", resetProgressOnly);
    document.querySelector("[data-reset-server-score]")?.addEventListener("click", resetTodayServerScore);
    document.querySelector("[data-install-app]")?.addEventListener("click", installApp);
    document.querySelector("[data-dismiss-install]")?.addEventListener("click", () => setState({ installDismissed: true }));
    try { beta128InstallSyncActions?.(); } catch {}

    // Une lecture silencieuse suffit ; le rendu suivant n'est déclenché que si
    // le backend apporte réellement un nouvel état.
    window.setTimeout(() => {
      if (state.tab === "profile") fetchServerFriends?.({ force: false }).catch(() => null);
    }, 0);
  }

  async function refreshAll(force = true) {
    const button = document.querySelector("[data-hd250-resync],[data-hd250-refresh]");
    if (button) button.disabled = true;
    try {
      await beta128FlushScoreOutbox?.({ force, reason: "beta251-profile" });
      await repairLegacyFriends({ force });
      await fetchServerFriends?.({ force: true });
      await Promise.all(["daily", "week", "year", "friends"].map(scope => fetchServerLeaderboard?.(scope, { force: true }).catch(() => null)));
    } catch {}
    finally { if (state.tab === "profile") render({ immediate: true }); }
  }

  const previousRankRender250 = typeof renderRank === "function" ? renderRank : null;
  if (previousRankRender250) {
    renderRank = function beta250RankRender(...args) {
      const result = previousRankRender250.apply(this, args);
      resetScrollOnEntry("rank");
      return result;
    };
  }
  const previousHomeRender250 = typeof renderHome === "function" ? renderHome : null;
  if (previousHomeRender250) {
    renderHome = function beta250HomeRender(...args) {
      const result = previousHomeRender250.apply(this, args);
      resetScrollOnEntry("home");
      return result;
    };
  }

  recoverFriendsFromStorage();
  renderProfile = renderProfile250;

  // Nettoyage et nouvel essai automatiques après installation de la mise à jour.
  window.setTimeout(() => {
    beta128FlushScoreOutbox?.({ force: true, reason: "beta251-startup" }).catch(() => null);
    repairLegacyFriends({ force: false }).catch(() => null);
  }, 900);

  try {
    state.beta251UiReliabilityVersion = VERSION;
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      compactProfile: true,
      legacyFriendRecovery: true,
      compatibleAggregateRanking: true,
      repairLegacyFriends
    };
    queueSaveState?.(80);
    if (state?.tab === "profile") render({ immediate: true });
    else if (state?.tab === "home") window.requestAnimationFrame?.(() => {
      const rail = document.querySelector(".hd222-world-switcher");
      const first = rail?.querySelector(".hd222-world.active:first-child");
      if (rail && first) rail.scrollLeft = 0;
    });
  } catch (error) {
    try { console.warn("beta251 ui reliability", error); } catch {}
  }
})();
