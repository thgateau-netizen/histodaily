/* =========================================================
   HistoDaily RC5 — classements, communauté et intégrité sociale
   Une seule couche client, Supabase comme seule vérité partagée.
   ========================================================= */
(function histoDailySocialV2() {
  "use strict";

  const VERSION = "1.0.0-rc.13";
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
    return {
      id: meId(), playerId: meId(), friendCode: meCode(), code: meCode(),
      name: pseudo(), pseudo: pseudo(), me: true, rank: 0,
      score: entries.reduce((sum, item) => sum + item.score, 0),
      solvedInPeriod: entries.length,
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
      leaderboards: current.leaderboards && typeof current.leaderboards === "object" ? current.leaderboards : {},
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
        rank: Number(row.rank || 0),
        solvedInPeriod: Number(row.solvedInPeriod || 0),
        solved: Number(row.solvedCount || row.solved_count || 0),
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
      return `<div class="hdsv2-friend-row"><button type="button" class="hdsv2-friend-main" data-social-profile="${esc(friend.playerId || friend.id || friend.friendCode)}"><span class="hdsv2-avatar">${esc(name.charAt(0).toUpperCase())}</span><span><strong>${esc(name)}</strong><small>${esc(details.join(" · "))}</small></span></button><div class="hdsv2-friend-period">${periodRow ? `<b>${Number(periodRow.score || 0)} pts</b><small>${periodRow.rank ? `#${Number(periodRow.rank)} entre amis` : "Pas encore classé"}</small>` : `<b>—</b><small>${context ? `Aucun score ${periodShort(context.period)}` : esc(friend.friendCode || friend.code || "")}</small>`}</div><button type="button" class="ghost hdsv2-remove" data-social-remove="${esc(friend.playerId || friend.id || "")}" aria-label="Retirer ${esc(name)}">Retirer</button></div>`;
    }).join("")}</div>` : `<div class="hdsv2-empty hdsv2-empty-friends"><span class="hdsv2-empty-icon" aria-hidden="true">◎</span><strong>Ton cercle est prêt à grandir</strong><p>Ajoute un proche pour comparer vos expéditions, même lorsqu’il n’a encore aucun point.</p>${includeAdd ? `<button type="button" class="ghost" data-focus-add-friend>Entrer un code ami</button>` : ""}</div>`;
    return `${addCard}<section class="card hdsv2-card hdsv2-friends-card"><div class="hdsv2-section-head"><div><span class="card-label">Ton cercle</span><h2>${s.friends.length} ami${s.friends.length > 1 ? "s" : ""} confirmé${s.friends.length > 1 ? "s" : ""}</h2><p>${s.friends.length ? "Ouvre un profil pour découvrir sa progression complète." : "Les relations confirmées apparaîtront ici."}</p></div></div>${list}</section>`;
  }

  function rowName(row = {}) { return row.name || row.pseudo || "Joueur"; }
  function rowTarget(row = {}) { return row.playerId || row.id || row.friendCode || row.code || ""; }
  function rowMeta(row = {}) {
    const solved = Number(row.solvedInPeriod || 0);
    return `${solved} dossier${solved > 1 ? "s" : ""} compté${solved > 1 ? "s" : ""}`;
  }
  function rankRowMarkup(row, { selfCard = false } = {}) {
    const name = rowName(row);
    return `<button type="button" class="hdsv2-rank-row${row.me ? " me" : ""}${selfCard ? " hdsv2-self-row" : ""}" data-social-profile="${esc(rowTarget(row))}" aria-label="Ouvrir le profil de ${esc(name)}"><span class="hdsv2-rank-number">${row.rank ? `#${Number(row.rank)}` : "—"}</span><span class="hdsv2-avatar">${esc(name.charAt(0).toUpperCase())}</span><span class="hdsv2-rank-player"><strong>${esc(name)}${row.me ? " · toi" : ""}</strong><small>${esc(rowMeta(row))} · voir le profil</small></span><b>${Number(row.score || 0)}<small> pts</small></b></button>`;
  }

  function podiumMarkup(rows = []) {
    const podium = rows.filter(row => Number(row.rank || 0) >= 1 && Number(row.rank || 0) <= 3).sort((a, b) => Number(a.rank) - Number(b.rank));
    if (podium.length < 3 || !podium.some(row => Number(row.score || 0) > 0)) return "";
    const order = [podium.find(row => Number(row.rank) === 2), podium.find(row => Number(row.rank) === 1), podium.find(row => Number(row.rank) === 3)].filter(Boolean);
    return `<div class="hdsv2-podium" aria-label="Podium du classement">${order.map(row => {
      const rank = Number(row.rank || 0);
      const name = rowName(row);
      const medal = rank === 1 ? "1" : rank === 2 ? "2" : "3";
      return `<button type="button" class="hdsv2-podium-card rank-${rank}${row.me ? " me" : ""}" data-social-profile="${esc(rowTarget(row))}" aria-label="${esc(name)}, ${rank}${rank === 1 ? "er" : "e"} du classement"><span class="hdsv2-podium-medal">${medal}</span><span class="hdsv2-podium-avatar">${esc(name.charAt(0).toUpperCase())}</span><strong>${esc(name)}${row.me ? " · toi" : ""}</strong><b>${Number(row.score || 0)} pts</b><small>${esc(rowMeta(row))}</small></button>`;
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

    renderShell(`<div class="hdsv2-screen hdsv2-rank-screen">
      <header class="hdsv2-topbar"><div><p class="eyebrow">Classements</p><h1>${esc(periodLabel(context.period))}</h1></div><button type="button" class="hdsv2-profile-shortcut" data-open-profile aria-label="Ouvrir le profil">${esc(pseudo().charAt(0).toUpperCase() || "P")}</button></header>
      <nav class="hdsv2-period-tabs" aria-label="Période">${[["daily", "Jour", "Aujourd’hui"], ["week", "Semaine", "Cette semaine"], ["year", "Année", "Cette année"]].map(([period, shortLabel, fullLabel]) => `<button type="button" data-social-period="${period}" class="${context.period === period ? "active" : ""}" aria-label="${fullLabel}" aria-current="${context.period === period ? "page" : "false"}">${shortLabel}</button>`).join("")}</nav>
      <nav class="hdsv2-audience-tabs" aria-label="Joueurs affichés"><button type="button" data-social-audience="general" class="${context.audience === "general" ? "active" : ""}">Tous</button><button type="button" data-social-audience="friends" class="${context.audience === "friends" ? "active" : ""}">Amis${incoming ? `<span>${incoming}</span>` : ""}</button></nav>
      <section class="card hdsv2-card hdsv2-score-card"><div class="hdsv2-score-head"><div><span class="card-label">Ta performance · ${esc(audienceLabel)}</span><h2>${Number(me?.score || 0)} points</h2><p>${context.audience === "friends" ? `Ta place parmi ${Math.max(1, s.friends.length + 1)} joueur${s.friends.length ? "s" : ""} de ton cercle.` : `Total de tes dossiers résolus ${periodShort(context.period)}.`}</p></div><button type="button" class="ghost" data-social-refresh>Mettre à jour</button></div><div class="hdsv2-kpis"><div><b>${me?.rank ? `#${me.rank}` : "—"}</b><span>ta place</span></div><div><b>${Number(me?.solvedInPeriod || 0)}</b><span>dossiers comptés</span></div>${context.audience === "friends" ? `<div><b>${s.friends.length}</b><span>amis confirmés</span></div>` : ""}</div><div class="hdsv2-sync-line"><small class="hdsv2-status ${status.phase || "idle"}">${esc(statusText(status))}</small>${pending ? `<span class="hdsv2-sync-pill pending"><i></i>${pending} score${pending > 1 ? "s" : ""} à envoyer</span>` : `<span class="hdsv2-sync-pill ok">✓ aucun score en attente</span>`}</div>${context.period === "daily" && context.audience === "general" ? `<small class="hdsv2-zero-friends">Les joueurs à 0 point sont masqués ici. Tes amis restent visibles dans l’onglet Amis et les archives ne modifient jamais le score du jour.</small>` : ""}${context.audience === "friends" && Number(status.zeroScoreFriendCount || 0) > 0 ? `<small class="hdsv2-zero-friends">${Number(status.zeroScoreFriendCount)} ami${Number(status.zeroScoreFriendCount) > 1 ? "s" : ""} sans score ${Number(status.zeroScoreFriendCount) > 1 ? "restent" : "reste"} visible${Number(status.zeroScoreFriendCount) > 1 ? "s" : ""}.</small>` : ""}</section>
      ${context.audience === "friends" ? requestMarkup() : ""}
      <section class="card hdsv2-card hdsv2-leaderboard"><div class="hdsv2-section-head hdsv2-ranking-head"><div><span class="card-label">${context.audience === "friends" ? "Entre amis" : "Classement général"}</span><h2>${rows.length} joueur${rows.length > 1 ? "s" : ""}</h2><p>${context.audience === "friends" ? "Ta position reste affichée au-dessus du classement, même loin du podium." : "Le podium distingue les trois meilleurs résultats de la période."}</p></div></div>${leaderboardMarkup(rows, context, status)}</section>
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
    renderShell(`<div class="hdsv2-screen hdsv2-profile-screen hd257-profile-root">
      <header class="hd257-page-head"><div><p class="eyebrow">Espace joueur</p><h1>Ton profil</h1></div><button type="button" class="ghost" data-home>Accueil</button></header>
      ${profileHeroMarkup(model)}
      ${profileOrbitMarkup(model)}
      <section class="hd257-dashboard">${profileRhythmMarkup()}${profileCommunityMarkup(s)}</section>
      ${profileProgressMarkup(model)}
      ${profileCollectionsMarkup()}
      ${profileAchievementsMarkup(s)}
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
      ? `<section class="card hdsv2-card hdsv2-profile-summary hd273-public-card"><div class="hdsv2-profile-hero"><div class="hdsv2-profile-avatar">${esc((player.pseudo || "J").charAt(0).toUpperCase())}</div><div><span class="card-label">Profil public</span><h2>${esc(player.pseudo || "Joueur")}</h2><p>Niveau ${Number(player.level || 1)} · ${Number(player.xp || 0)} XP</p></div></div><div class="hd273-public-stats"><div><b>${Number(player.streak || 0)}</b><span>jours de série</span></div><div><b>${Number(player.solvedCount || 0)}</b><span>dossiers résolus</span></div></div><div class="hd273-score-grid">${[['daily', 'Aujourd’hui'], ['week', 'Semaine'], ['year', 'Année']].map(([period, label]) => `<div><span>${label}</span><b>${Number(player.scores?.[period] || 0)} pts</b><small>${Number(player.ranks?.[period] || 0) ? `#${Number(player.ranks[period])} au général` : "Pas encore classé"}</small></div>`).join("")}</div>${player.partial ? `<p class="hd274-partial-profile">Données partielles : une actualisation complétera ce profil dès que le serveur répondra.</p>` : ""}</section>${publicProfileActionMarkup(player, id)}${social().feedback ? `<p class="hdsv2-feedback hd273-profile-feedback" role="status">${esc(social().feedback)}</p>` : ""}`
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
