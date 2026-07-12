/* =========================================================
   HistoDaily beta 249 — stockage social et multi-onglets
   - sauvegarde des files corrompues avant réparation
   - déduplication des décisions contradictoires
   - verrou inter-onglets pendant les synchronisations
   - miroir d'identité monotone sur l'appareil
   ========================================================= */
(function beta249LocalSocialIntegrity(){
  "use strict";

  const VERSION = "1.0.0-beta.249.0";
  const BASE = typeof STORAGE_KEY === "string" ? STORAGE_KEY : "histodaily_state";
  const REQUEST_KEY = "histodaily_social_request_outbox_v1";
  const SCORE_KEY = `${BASE}_score_outbox_v1`;
  const MUTATION_KEY = `${BASE}_social_mutations_v2`;
  const LEASE_PREFIX = `${BASE}_beta249_lease_`;
  const TAB_ID = (() => {
    try { return crypto.randomUUID(); }
    catch { return `${Date.now()}-${Math.random().toString(36).slice(2)}`; }
  })();
  const watchedKeys = new Set([REQUEST_KEY, SCORE_KEY, MUTATION_KEY]);
  let renderTimer = null;

  function safeParse(raw, fallback = null) {
    try { return JSON.parse(raw); }
    catch { return fallback; }
  }
  function backupCorrupt(key, raw, reason = "json-invalide") {
    if (!raw) return;
    try {
      const backupKey = `${key}_corrupt_backup_beta249`;
      localStorage.setItem(backupKey, JSON.stringify({ reason, savedAt: new Date().toISOString(), raw: String(raw).slice(0, 250000) }));
    } catch {}
  }
  function readArray(key) {
    let raw = "";
    try { raw = localStorage.getItem(key) || ""; } catch { return []; }
    if (!raw) return [];
    const parsed = safeParse(raw, null);
    if (!Array.isArray(parsed)) {
      backupCorrupt(key, raw, parsed === null ? "json-invalide" : "format-non-tableau");
      try { localStorage.setItem(key, "[]"); } catch {}
      return [];
    }
    return parsed.filter(Boolean);
  }
  function writeArray(key, list) {
    const clean = Array.isArray(list) ? list.filter(Boolean) : [];
    try { localStorage.setItem(key, JSON.stringify(clean)); return true; }
    catch { return false; }
  }
  function normalizedCode(value = "") {
    try { return normalizeFriendCode(value); }
    catch { return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9-]/g, ""); }
  }
  function requestKey(item = {}) {
    try { return beta128TargetKey(item); }
    catch {
      const id = String(item.targetPlayerId || item.playerId || "").trim();
      const code = normalizedCode(item.targetFriendCode || item.friendCode || item.code || "");
      return id ? `id:${id}` : code ? `code:${code}` : "";
    }
  }
  function scoreKey(item = {}) {
    try { return beta128ScoreKey(item); }
    catch { return [item.playerId || "", item.mysteryId || "", item.periodKey || item.dayKey || "", "daily"].join("__"); }
  }
  function mutationTarget(item = {}) {
    const payload = item.payload || {};
    if (item.type === "respondRequest") {
      const requestId = String(payload.requestId || "").trim();
      const code = normalizedCode(payload.requesterFriendCode || "");
      const id = String(payload.requesterPlayerId || "").trim();
      return requestId ? `request:${requestId}` : code ? `code:${code}` : id ? `id:${id}` : "";
    }
    if (item.type === "removeFriend") return item.targetKey || requestKey(payload);
    return String(item.key || "").trim();
  }

  function normalizeRequests(list = []) {
    const map = new Map();
    for (const raw of list) {
      const key = requestKey(raw);
      if (!key) continue;
      const item = {
        ...raw,
        key,
        targetPlayerId: String(raw.targetPlayerId || raw.playerId || "").slice(0, 90),
        targetFriendCode: normalizedCode(raw.targetFriendCode || raw.friendCode || raw.code || ""),
        targetPseudo: String(raw.targetPseudo || raw.pseudo || raw.name || "Joueur").trim().slice(0, 32),
        createdAt: raw.createdAt || new Date().toISOString(),
        updatedAt: Number(raw.updatedAt || Date.now()),
        tries: Math.max(0, Number(raw.tries || 0))
      };
      const previous = map.get(key);
      if (!previous || item.updatedAt >= previous.updatedAt) map.set(key, item);
    }
    return Array.from(map.values()).sort((a, b) => Number(a.updatedAt || 0) - Number(b.updatedAt || 0)).slice(-60);
  }
  function normalizeScores(list = []) {
    const map = new Map();
    for (const raw of list) {
      if (!raw?.mysteryId) continue;
      let item = raw;
      try { item = { ...raw, ...beta128CleanScorePayload(raw) }; } catch {}
      const key = scoreKey(item);
      if (!key) continue;
      const previous = map.get(key);
      if (!previous) { map.set(key, { ...item, outboxKey: key }); continue; }
      const better = Number(item.score || 0) > Number(previous.score || 0) ? item : previous;
      map.set(key, {
        ...previous,
        ...better,
        outboxKey: key,
        score: Math.max(Number(previous.score || 0), Number(item.score || 0)),
        level: Math.max(Number(previous.level || 1), Number(item.level || 1)),
        xp: Math.max(Number(previous.xp || 0), Number(item.xp || 0)),
        solvedCount: Math.max(Number(previous.solvedCount || 0), Number(item.solvedCount || 0)),
        streak: Math.max(Number(previous.streak || 0), Number(item.streak || 0)),
        queuedAt: Math.min(Number(previous.queuedAt || Date.now()), Number(item.queuedAt || Date.now())),
        updatedAt: Math.max(Number(previous.updatedAt || 0), Number(item.updatedAt || 0), Date.now())
      });
    }
    return Array.from(map.values()).sort((a, b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0)).slice(0, 100);
  }
  function normalizeMutations(list = []) {
    const map = new Map();
    for (const raw of list) {
      if (!raw || !["respondRequest", "removeFriend"].includes(raw.type)) continue;
      const target = mutationTarget(raw);
      if (!target) continue;
      // Une demande ne peut avoir qu'une décision finale locale. La plus récente gagne,
      // tout en conservant la clé attendue par la couche beta246 pour bloquer les doubles clics.
      const decision = raw.type === "respondRequest"
        ? ((raw.payload?.response === "accept" || raw.payload?.response === "accepted") ? "accept" : "decline")
        : "";
      const groupKey = raw.type === "respondRequest" ? `respond:${target}` : `remove:${target}`;
      const item = {
        ...raw,
        key: raw.type === "respondRequest" ? `${groupKey}:${decision}` : groupKey,
        createdAt: Number(raw.createdAt || Date.now()),
        updatedAt: Number(raw.updatedAt || raw.createdAt || Date.now()),
        attempts: Math.max(0, Number(raw.attempts || 0)),
        nextTryAt: Math.max(0, Number(raw.nextTryAt || 0))
      };
      const previous = map.get(groupKey);
      if (!previous || item.updatedAt >= previous.updatedAt) map.set(groupKey, item);
    }
    return Array.from(map.values()).sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0)).slice(0, 80);
  }

  function repairAll() {
    const requests = normalizeRequests(readArray(REQUEST_KEY));
    const scores = normalizeScores(readArray(SCORE_KEY));
    const mutations = normalizeMutations(readArray(MUTATION_KEY));
    writeArray(REQUEST_KEY, requests);
    writeArray(SCORE_KEY, scores);
    writeArray(MUTATION_KEY, mutations);
    try {
      state.friendRequestOutbox = requests;
      state.socialMutationOutbox = mutations;
      state.beta249LocalIntegrity = {
        version: VERSION,
        checkedAt: Date.now(),
        requests: requests.length,
        scores: scores.length,
        mutations: mutations.length
      };
      queueSaveState?.(120);
    } catch {}
    return { requests, scores, mutations };
  }

  // Remplace les lectures silencieuses : une corruption est sauvegardée avant remise à zéro.
  try {
    if (typeof beta128ReadOutbox === "function") beta128ReadOutbox = function beta249ReadRequestOutbox(){ return normalizeRequests(readArray(REQUEST_KEY)); };
    if (typeof beta128SaveOutbox === "function") {
      const previousSaveRequests = beta128SaveOutbox;
      beta128SaveOutbox = function beta249SaveRequestOutbox(list = []) { return previousSaveRequests(normalizeRequests(list)); };
    }
    if (typeof beta128ReadScoreOutbox === "function") beta128ReadScoreOutbox = function beta249ReadScoreOutbox(){ return normalizeScores(readArray(SCORE_KEY)); };
    if (typeof beta128SaveScoreOutbox === "function") {
      const previousSaveScores = beta128SaveScoreOutbox;
      beta128SaveScoreOutbox = function beta249SaveScoreOutbox(list = []) { return previousSaveScores(normalizeScores(list)); };
    }
  } catch {}

  function readLease(name) {
    try { return safeParse(localStorage.getItem(`${LEASE_PREFIX}${name}`) || "", null); }
    catch { return null; }
  }
  function acquireLease(name, ttl = 20000) {
    const key = `${LEASE_PREFIX}${name}`;
    const now = Date.now();
    const current = readLease(name);
    if (current && current.owner !== TAB_ID && Number(current.expiresAt || 0) > now) return false;
    try {
      localStorage.setItem(key, JSON.stringify({ owner: TAB_ID, expiresAt: now + ttl }));
      return readLease(name)?.owner === TAB_ID;
    } catch { return true; }
  }
  function renewLease(name, ttl = 20000) {
    try { localStorage.setItem(`${LEASE_PREFIX}${name}`, JSON.stringify({ owner: TAB_ID, expiresAt: Date.now() + ttl })); } catch {}
  }
  function releaseLease(name) {
    const key = `${LEASE_PREFIX}${name}`;
    try { if (readLease(name)?.owner === TAB_ID) localStorage.removeItem(key); } catch {}
  }
  async function withLease(name, work) {
    if (!acquireLease(name)) return null;
    const heartbeat = setInterval(() => renewLease(name), 6000);
    try { return await work(); }
    finally { clearInterval(heartbeat); releaseLease(name); }
  }

  const channel = (() => {
    try { return typeof BroadcastChannel === "function" ? new BroadcastChannel("histodaily-social-beta249") : null; }
    catch { return null; }
  })();
  function broadcast(type) { try { channel?.postMessage({ type, from: TAB_ID, at: Date.now() }); } catch {} }
  function scheduleRender() {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(() => {
      try { if (["rank", "profile", "publicProfile"].includes(state.tab)) render?.({ immediate: true }); } catch {}
    }, 120);
  }

  try {
    if (typeof beta128FlushScoreOutbox === "function") {
      const previousScoreFlush = beta128FlushScoreOutbox;
      beta128FlushScoreOutbox = function beta249FlushScores(options = {}) {
        return withLease("scores", async () => {
          repairAll();
          const result = await previousScoreFlush(options);
          broadcast("scores-updated");
          return result;
        });
      };
    }
    if (typeof beta128FlushOutgoingRequests === "function") {
      const previousRequestFlush = beta128FlushOutgoingRequests;
      beta128FlushOutgoingRequests = function beta249FlushRequests(options = {}) {
        return withLease("requests", async () => {
          repairAll();
          const result = await previousRequestFlush(options);
          broadcast("requests-updated");
          return result;
        });
      };
    }
  } catch {}

  // Le miroir local ne doit pas régresser quand un vieil onglet se réveille.
  try {
    if (typeof beta128MirrorIdentity === "function" && typeof beta128IdentitySnapshot === "function") {
      const previousMirror = beta128MirrorIdentity;
      beta128MirrorIdentity = function beta249MirrorIdentity(){
        const before = beta128IdentitySnapshot() || {};
        previousMirror();
        const after = beta128IdentitySnapshot() || {};
        const weak = value => !String(value || "").trim() || /^(invité|joueur)$/i.test(String(value || "").trim());
        const merged = {
          ...before,
          ...after,
          pseudo: !weak(before.pseudo) && weak(after.pseudo) ? before.pseudo : after.pseudo,
          level: Math.max(Number(before.level || 1), Number(after.level || 1)),
          xp: Math.max(Number(before.xp || 0), Number(after.xp || 0)),
          solvedCount: Math.max(Number(before.solvedCount || 0), Number(after.solvedCount || 0)),
          streak: Math.max(Number(before.streak || 0), Number(after.streak || 0)),
          version: VERSION,
          updatedAt: new Date().toISOString()
        };
        try { beta128WriteJson?.(`${BASE}_social_identity_v2`, merged); } catch {}
        return merged;
      };
    }
  } catch {}

  window.addEventListener("storage", event => {
    if (!watchedKeys.has(event.key)) return;
    repairAll();
    scheduleRender();
  });
  channel?.addEventListener?.("message", event => {
    if (event.data?.from === TAB_ID) return;
    repairAll();
    scheduleRender();
  });
  window.addEventListener("pagehide", () => {
    try { repairAll(); } catch {}
    releaseLease("scores");
    releaseLease("requests");
  });

  try {
    const result = repairAll();
    setInterval(() => repairAll(), 30000);
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      localSocialIntegrity: true,
      crossTabSyncLocks: true,
      corruptOutboxBackup: true
    };
    window.HistoDailyBeta249 = { version: VERSION, repair: repairAll, inspect: () => ({ ...result, tabId: TAB_ID }) };
  } catch (error) {
    try { console.warn("beta249 local social integrity", error); } catch {}
  }
})();
