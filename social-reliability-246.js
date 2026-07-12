/* =========================================================
   HistoDaily beta 246 — mutations sociales transactionnelles
   - suppression d'ami persistante, même après actualisation
   - réponses aux demandes avec requestId et retry hors ligne
   - garde anti double-clic et invalidation de tous les classements Amis
   ========================================================= */
(function beta246TransactionalSocial(){
  "use strict";

  const VERSION = "1.0.0-beta.246";
  const OPS_KEY = `${typeof STORAGE_KEY === "string" ? STORAGE_KEY : "histodaily_state"}_social_mutations_v2`;
  const MAX_OPS = 50;
  const PERIODS = ["daily", "week", "year"];
  const actionLocks = new Set();
  let flushPromise = null;
  let internalRefresh = false;

  function norm(value = "") {
    try { return normalizeFriendCode(value); }
    catch { return String(value || "").trim().toUpperCase().replace(/\s+/g, "").replace(/[^A-Z0-9-]/g, ""); }
  }
  function safe(value = "", max = 90) { return String(value || "").trim().slice(0, max); }
  function requestState() {
    try { return typeof beta125FriendRequestsState === "function" ? beta125FriendRequestsState() : { incoming: [], outgoing: [], history: [] }; }
    catch { return { incoming: [], outgoing: [], history: [] }; }
  }
  function saveRequests(value) {
    try { beta125SetFriendRequests?.(value); } catch { state.friendRequests = value; }
  }
  function readOps() {
    try {
      const parsed = JSON.parse(localStorage.getItem(OPS_KEY) || "[]");
      return Array.isArray(parsed) ? parsed.filter(Boolean).slice(0, MAX_OPS) : [];
    } catch { return []; }
  }
  function writeOps(list = []) {
    const seen = new Set();
    const clean = [];
    for (const raw of Array.isArray(list) ? list : []) {
      const key = safe(raw?.key || raw?.id || "", 180);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      clean.push({ ...raw, key });
      if (clean.length >= MAX_OPS) break;
    }
    try { localStorage.setItem(OPS_KEY, JSON.stringify(clean)); } catch {}
    state.socialMutationOutbox = clean;
    try { queueSaveState?.(80); } catch {}
    return clean;
  }
  function upsertOp(op = {}) {
    const list = readOps().filter(item => item.key !== op.key);
    // FIFO : une acceptation enregistrée avant une suppression doit toujours
    // être envoyée avant elle, sinon la relation pourrait être recréée.
    return writeOps([...list, { createdAt: Date.now(), attempts: 0, nextTryAt: 0, ...op }]
      .sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0)));
  }
  function removeOp(key = "") { return writeOps(readOps().filter(item => item.key !== key)); }
  function hasOp(key = "") { return readOps().some(item => item.key === key); }
  function retryDelay(attempts = 0) { return Math.min(120000, 1500 * Math.pow(2, Math.min(6, Math.max(0, attempts)))); }

  function friendKey(friend = {}) {
    const code = norm(friend.code || friend.friendCode || friend.friend_code || friend.id || "");
    const playerId = safe(friend.playerId || friend.player_id || friend.friend_player_id || "");
    return code ? `code:${code}` : playerId ? `id:${playerId}` : "";
  }
  function responseKey(req = {}, response = "accept") {
    const requestId = safe(req.requestId || req.id || "", 32);
    const code = norm(req.requesterFriendCode || req.otherFriendCode || "");
    const playerId = safe(req.requesterPlayerId || req.otherPlayerId || "");
    const target = requestId ? `request:${requestId}` : code ? `code:${code}` : `id:${playerId}`;
    return `respond:${target}:${response === "accept" ? "accept" : "decline"}`;
  }
  function invalidateFriendRanks(note = "Relations sociales actualisées.") {
    const boards = { ...(state.serverLeaderboards || {}) };
    const statuses = { ...(state.serverLeaderboardStatus || {}) };
    delete boards.friends;
    delete statuses.friends;
    for (const period of PERIODS) {
      delete boards[`friends:${period}`];
      statuses[`friends:${period}`] = { loading: false, loadedAt: 0, mode: "refresh", authoritative: false, period, audience: "friends", note };
    }
    state.serverLeaderboards = boards;
    state.serverLeaderboardStatus = statuses;
    try { queueSaveState?.(80); } catch {}
  }
  function friendSignature() {
    return Object.values(state.friends || {}).map(friendKey).filter(Boolean).sort().join("|");
  }
  function pendingRemovalKeys() {
    return new Set(readOps().filter(item => item.type === "removeFriend").map(item => item.targetKey).filter(Boolean));
  }
  function hidePendingRemovals() {
    const tombstones = pendingRemovalKeys();
    if (!tombstones.size) return false;
    const next = {};
    let changed = false;
    for (const [key, friend] of Object.entries(state.friends || {})) {
      const stable = friendKey(friend);
      if (stable && tombstones.has(stable)) { changed = true; continue; }
      next[key] = friend;
    }
    if (changed) state.friends = next;
    return changed;
  }
  function applySnapshot(json = {}) {
    try { beta142ApplyServerSocialSnapshot?.(json); }
    catch {
      try { if (Array.isArray(json.friends) && typeof beta141FriendMapFromServer === "function") state.friends = beta141FriendMapFromServer(json.friends); } catch {}
      try { if (json.requests) saveRequests(json.requests); } catch {}
    }
    hidePendingRemovals();
    invalidateFriendRanks(json.message || "Relations sociales actualisées.");
    state.serverFriendsStatus = {
      loading: false,
      loadedAt: Date.now(),
      mode: json.mode || "supabase",
      authoritative: json.authoritative !== false,
      message: json.message || "Relations sociales actualisées."
    };
    try { queueSaveState?.(80); } catch {}
  }
  async function requestJson(url, options = {}) {
    const response = await fetch(url, options);
    const json = await response.json().catch(() => ({}));
    const ok = response.ok && json?.ok !== false && json?.mode !== "supabase-error";
    if (!ok) {
      const error = new Error(json?.message || json?.note || `HTTP ${response.status}`);
      error.status = response.status;
      error.retryable = response.status === 0 || response.status === 408 || response.status === 429 || response.status >= 500 || json?.mode === "supabase-error";
      error.payload = json;
      throw error;
    }
    return json;
  }
  function selfPayload() {
    return {
      playerId: typeof playerIdMe === "function" ? playerIdMe() : "",
      pseudo: typeof currentPseudo === "function" ? currentPseudo() : (state.pseudo || "Invité"),
      myFriendCode: typeof friendCode === "function" ? friendCode() : "",
      level: typeof level === "function" ? level() : 1,
      xp: Math.max(0, Number(state.xp || 0)),
      solvedCount: Object.keys(state.solvedMysteries || {}).length,
      streak: Math.max(0, Number(state.streak || 0))
    };
  }
  async function executeOp(op = {}) {
    if (op.type === "respondRequest") {
      const json = await requestJson("/api/v1/friends/request/respond", {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...selfPayload(), ...op.payload })
      });
      applySnapshot(json);
      state.friendRequestFeedback = json.message || (op.payload.response === "accept" ? "Demande acceptée." : "Demande refusée.");
      return json;
    }
    if (op.type === "removeFriend") {
      const json = await requestJson("/api/v1/friends/sync", {
        method: "DELETE",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...selfPayload(),
          friendCode: op.payload.friendCode || "",
          friendPlayerId: op.payload.friendPlayerId || ""
        })
      });
      applySnapshot(json);
      state.friendFeedback = json.message || `${op.payload.name || "Ami"} retiré des amis.`;
      return json;
    }
    return null;
  }
  async function flushMutations({ force = false } = {}) {
    if (flushPromise) return flushPromise;
    if (typeof isOnline !== "undefined" && !isOnline) return [];
    flushPromise = (async () => {
      let list = readOps().sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
      const completed = [];
      for (const op of list.slice(0, 10)) {
        if (!force && Number(op.nextTryAt || 0) > Date.now()) continue;
        try {
          await executeOp(op);
          list = list.filter(item => item.key !== op.key);
          completed.push(op.key);
        } catch (error) {
          const attempts = Number(op.attempts || 0) + 1;
          if (error?.retryable === false || [400, 404, 409].includes(Number(error?.status || 0))) {
            list = list.filter(item => item.key !== op.key);
            if (op.type === "removeFriend" && op.backup && op.backupKey) {
              state.friends = { ...(state.friends || {}), [op.backupKey]: op.backup };
              state.friendFeedback = error?.message || "Suppression annulée : la relation a changé côté serveur.";
            } else {
              state.friendRequestFeedback = error?.message || "Cette demande n’est plus disponible.";
            }
          } else {
            list = list.map(item => item.key === op.key ? {
              ...item,
              attempts,
              nextTryAt: Date.now() + retryDelay(attempts),
              lastError: error?.message || "Connexion indisponible",
              updatedAt: Date.now()
            } : item);
          }
        }
        writeOps(list);
      }
      hidePendingRemovals();
      try { queueSaveState?.(80); } catch {}
      return completed;
    })().finally(() => { flushPromise = null; });
    return flushPromise;
  }

  const previousSendFriendRequest = typeof beta125SendFriendRequest === "function" ? beta125SendFriendRequest : null;
  if (previousSendFriendRequest) {
    beta125SendFriendRequest = async function beta246SendFriendRequest(player = {}) {
      const key = friendKey(player) || safe(player.playerId || player.id || "");
      if (!key) return;
      const outgoing = requestState().outgoing || [];
      const alreadyPending = outgoing.some(req => {
        const reqKey = friendKey({ code: req.targetFriendCode || req.otherFriendCode, playerId: req.targetPlayerId || req.otherPlayerId });
        return reqKey && reqKey === key;
      });
      if (alreadyPending || actionLocks.has(`send:${key}`)) {
        state.friendRequestFeedback = "Cette demande est déjà en attente.";
        try { render?.({ immediate: true }); } catch {}
        return;
      }
      actionLocks.add(`send:${key}`);
      try {
        await previousSendFriendRequest(player);
        state.friendRequestFeedback = state.serverFriendRequestsStatus?.mode === "supabase"
          ? (state.friendRequestFeedback || "Demande envoyée.")
          : "Demande enregistrée : envoi automatique dès que la connexion est disponible.";
      } finally {
        actionLocks.delete(`send:${key}`);
        try { queueSaveState?.(80); } catch {}
        try { render?.({ immediate: true }); } catch {}
      }
    };
  }

  beta125RespondFriendRequest = async function beta246RespondFriendRequest({ response = "decline", requesterPlayerId = "", requesterFriendCode = "", requestId = "" } = {}) {
    const normalizedResponse = response === "accept" || response === "accepted" ? "accept" : "decline";
    const current = requestState();
    const target = (current.incoming || []).find(req => {
      const sameRequest = requestId && String(req.requestId || req.id || "") === String(requestId);
      const sameId = requesterPlayerId && String(req.requesterPlayerId || req.otherPlayerId || "") === String(requesterPlayerId);
      const sameCode = requesterFriendCode && norm(req.requesterFriendCode || req.otherFriendCode || "") === norm(requesterFriendCode);
      return sameRequest || sameId || sameCode;
    });
    if (!target) {
      state.friendRequestFeedback = "Cette demande n’est plus disponible. Actualisation en cours…";
      try { fetchServerFriends?.({ force: true }); } catch {}
      try { render?.({ immediate: true }); } catch {}
      return;
    }
    const key = responseKey(target, normalizedResponse);
    if (hasOp(key) || actionLocks.has(key)) {
      state.friendRequestFeedback = "Cette réponse est déjà en cours de synchronisation.";
      try { render?.({ immediate: true }); } catch {}
      return;
    }
    const label = target.requesterPseudo || target.otherPseudo || "Joueur";
    upsertOp({
      key,
      type: "respondRequest",
      payload: {
        requestId: target.requestId || target.id || requestId || "",
        requesterPlayerId: target.requesterPlayerId || target.otherPlayerId || requesterPlayerId || "",
        requesterFriendCode: target.requesterFriendCode || target.otherFriendCode || requesterFriendCode || "",
        requesterPseudo: label,
        response: normalizedResponse
      }
    });
    saveRequests({
      ...current,
      incoming: (current.incoming || []).map(req => req === target ? { ...req, syncPending: true, pendingResponse: normalizedResponse } : req)
    });
    state.friendRequestFeedback = (typeof isOnline !== "undefined" && !isOnline)
      ? `Réponse à ${label} enregistrée. Elle sera envoyée au retour de la connexion.`
      : `${normalizedResponse === "accept" ? "Acceptation" : "Refus"} de ${label} en cours…`;
    try { queueSaveState?.(80); render?.({ immediate: true }); } catch {}
    actionLocks.add(key);
    try { await flushMutations({ force: true }); }
    finally { actionLocks.delete(key); try { render?.({ immediate: true }); } catch {} }
  };

  removeFriend = function beta246RemoveFriend(id = "") {
    const entries = Object.entries(state.friends || {});
    const found = entries.find(([key, friend]) => {
      const requested = safe(id);
      return key === requested || safe(friend.id) === requested || safe(friend.playerId || friend.friend_player_id) === requested || norm(friend.code || friend.friendCode) === norm(requested);
    });
    if (!found) {
      state.friendFeedback = "Cet ami n’est plus dans ta liste.";
      try { render?.({ immediate: true }); } catch {}
      return;
    }
    const [backupKey, friend] = found;
    const targetKey = friendKey(friend);
    const key = `remove:${targetKey || backupKey}`;
    if (hasOp(key) || actionLocks.has(key)) {
      state.friendFeedback = "Suppression déjà en cours.";
      try { render?.({ immediate: true }); } catch {}
      return;
    }
    upsertOp({
      key,
      type: "removeFriend",
      targetKey,
      backupKey,
      backup: friend,
      payload: {
        friendCode: norm(friend.code || friend.friendCode || friend.id || ""),
        friendPlayerId: safe(friend.playerId || friend.friend_player_id || ""),
        name: friend.name || "Ami"
      }
    });
    const next = { ...(state.friends || {}) };
    delete next[backupKey];
    state.friends = next;
    invalidateFriendRanks("Suppression d’un ami en cours.");
    state.friendFeedback = (typeof isOnline !== "undefined" && !isOnline)
      ? `${friend.name || "Ami"} retiré sur cet appareil. La suppression sera synchronisée au retour du réseau.`
      : `Suppression de ${friend.name || "cet ami"} en cours…`;
    try { queueSaveState?.(80); render?.({ immediate: true }); } catch {}
    actionLocks.add(key);
    flushMutations({ force: true }).finally(() => {
      actionLocks.delete(key);
      try { render?.({ immediate: true }); } catch {}
    });
  };

  const previousFetchServerFriends = typeof fetchServerFriends === "function" ? fetchServerFriends : null;
  if (previousFetchServerFriends) {
    fetchServerFriends = async function beta246FetchServerFriends(options = {}) {
      if (!internalRefresh) await flushMutations({ force: Boolean(options.force) }).catch(() => []);
      const before = friendSignature();
      internalRefresh = true;
      try { await previousFetchServerFriends(options); }
      finally { internalRefresh = false; }
      hidePendingRemovals();
      if (before !== friendSignature()) invalidateFriendRanks("Liste d’amis actualisée.");
      return state.friends || {};
    };
  }

  const previousFetchServerLeaderboard = typeof fetchServerLeaderboard === "function" ? fetchServerLeaderboard : null;
  if (previousFetchServerLeaderboard) {
    fetchServerLeaderboard = async function beta246FetchServerLeaderboard(scope = "daily", options = {}) {
      const isFriendScope = scope === "friends" || String(scope).startsWith("friends:");
      if (isFriendScope) await flushMutations({ force: Boolean(options.force) }).catch(() => []);
      return previousFetchServerLeaderboard(scope, options);
    };
  }

  const previousRequestMarkup = typeof beta125RequestCardMarkup === "function" ? beta125RequestCardMarkup : null;
  if (previousRequestMarkup) {
    beta125RequestCardMarkup = function beta246RequestCardMarkup(options = {}) {
      let html = previousRequestMarkup(options);
      const pending = readOps();
      if (!pending.length) return html;
      const responses = pending.filter(item => item.type === "respondRequest").length;
      const removals = pending.filter(item => item.type === "removeFriend").length;
      const text = [responses ? `${responses} réponse${responses > 1 ? "s" : ""}` : "", removals ? `${removals} suppression${removals > 1 ? "s" : ""}` : ""].filter(Boolean).join(" · ");
      return html.replace("</section>", `<div class="beta128-outbox-line"><strong>${pending.length}</strong><span>${text} en attente de synchronisation automatique.</span></div></section>`);
    };
  }

  function decoratePendingActions() {
    const ops = readOps();
    const responseOps = ops.filter(item => item.type === "respondRequest");
    document.querySelectorAll("[data-respond-friend-request]").forEach(button => {
      const code = norm(button.dataset.requestCode || "");
      const player = safe(button.dataset.requestPlayer || "");
      const pending = responseOps.some(op => norm(op.payload?.requesterFriendCode || "") === code || safe(op.payload?.requesterPlayerId || "") === player);
      if (pending) {
        button.disabled = true;
        button.setAttribute("aria-busy", "true");
        button.textContent = "En cours…";
      }
    });
    const removalKeys = pendingRemovalKeys();
    document.querySelectorAll("[data-remove-friend]").forEach(button => {
      const value = safe(button.dataset.removeFriend || "");
      if (removalKeys.has(`code:${norm(value)}`) || removalKeys.has(`id:${value}`)) button.disabled = true;
    });
  }
  for (const name of ["renderRank", "renderProfile", "renderPublicProfile"]) {
    const previous = typeof window[name] === "function" ? window[name] : null;
    if (!previous) continue;
    window[name] = function beta246DecoratedRender(...args) {
      const result = previous.apply(this, args);
      try { decoratePendingActions(); } catch {}
      return result;
    };
  }

  function scheduleFlush(force = false) {
    if (typeof isOnline !== "undefined" && !isOnline) return;
    Promise.resolve(typeof beta128FlushOutgoingRequests === "function" ? beta128FlushOutgoingRequests({ force }) : null)
      .catch(() => null)
      .then(() => flushMutations({ force }))
      .catch(() => null);
  }

  try {
    hidePendingRemovals();
    scheduleFlush(false);
    window.addEventListener("online", () => scheduleFlush(true));
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") scheduleFlush(true);
    });
    setInterval(() => {
      if (["rank", "profile", "publicProfile"].includes(state.tab) && document.visibilityState !== "hidden") scheduleFlush(false);
    }, 20000);
    state.beta246SocialReliabilityVersion = VERSION;
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      transactionalSocialMutations: true,
      persistentFriendRemoval: true,
      socialMutationOutbox: true,
      flushSocialMutations: flushMutations
    };
    try { queueSaveState?.(80); } catch {}
  } catch (error) {
    try { console.warn("beta246 transactional social", error); } catch {}
  }
})();
