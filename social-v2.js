/* =========================================================
   HistoDaily beta 254 — moteur social unique, chemins hérités neutralisés
   Une seule couche client, Supabase comme seule vérité partagée.
   ========================================================= */
(function histoDailySocialV2() {
  "use strict";

  const VERSION = "1.0.0-beta.255.0";
  const API_ROOT = "/api/v1/social-v2";
  const STALE_MS = 30_000;
  const requestFlights = new Map();
  const refreshFlights = new Map();
  const publicProfileFlights = new Map();
  let bootstrapFlight = null;
  let legacyBridgeMutedUntil = 0;
  let scoreFlushFlight = null;
  let refreshTimer = 0;

  const esc = value => {
    try { return escapeHtml(String(value ?? "")); }
    catch {
      return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
    }
  };

  function now() { return Date.now(); }
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

  function defaultSocial() {
    return {
      version: VERSION,
      phase: "idle",
      message: "Connexion au classement…",
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
    state.socialV2 = {
      ...defaultSocial(),
      ...current,
      requests: {
        incoming: Array.isArray(current.requests?.incoming) ? current.requests.incoming : [],
        outgoing: Array.isArray(current.requests?.outgoing) ? current.requests.outgoing : []
      },
      friends: Array.isArray(current.friends) ? current.friends : [],
      leaderboards: current.leaderboards && typeof current.leaderboards === "object" ? current.leaderboards : {},
      leaderboardStatus: current.leaderboardStatus && typeof current.leaderboardStatus === "object" ? current.leaderboardStatus : {},
      publicProfiles: current.publicProfiles && typeof current.publicProfiles === "object" ? current.publicProfiles : {}
    };
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
    adoptIdentity(json);
    if (json.profile) s.profile = { ...json.profile };
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
    s.loadedAt = now();
    s.lastError = "";
    // quiet empêche uniquement un rendu intermédiaire ; il ne doit jamais
    // laisser le texte « Synchronisation… » après une réponse réussie.
    s.message = json.message || "Profil et amis synchronisés.";
    saveSoon();
  }

  async function bootstrap({ force = false, allowPseudoChange = false, quiet = false } = {}) {
    const s = social();
    if (!online()) {
      s.phase = s.loadedAt ? "offline" : "error";
      s.message = s.loadedAt ? "Hors ligne : dernière copie affichée." : "Connexion nécessaire pour charger le multi.";
      saveSoon();
      return null;
    }
    if (!force && s.loadedAt && now() - s.loadedAt < STALE_MS && s.phase === "ready") return s;
    if (bootstrapFlight) return bootstrapFlight;
    s.phase = "loading";
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
      s.lastError = error.message || "Service social indisponible.";
      s.message = s.loadedAt ? "Dernière copie affichée : actualisation impossible." : s.lastError;
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
    if (!online()) {
      s.leaderboardStatus[key] = { ...status, phase: status.loadedAt ? "offline" : "error", message: status.loadedAt ? "Hors ligne : dernière copie." : "Connexion nécessaire." };
      saveSoon();
      return s.leaderboards[key] || [];
    }
    if (!force && status.loadedAt && now() - status.loadedAt < STALE_MS && status.phase === "ready") return s.leaderboards[key] || [];
    if (requestFlights.has(key)) return requestFlights.get(key);

    s.leaderboardStatus[key] = { ...status, phase: "loading", message: "Actualisation du classement…" };
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
        loadedAt: now(),
        generatedAt: json.generatedAt || "",
        message: "Classement partagé à jour.",
        authoritative: true
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
        loadedAt: status.loadedAt || 0,
        message: hadCache ? "Dernière copie affichée : serveur indisponible." : (error.message || "Classement indisponible."),
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

  function activeContext() {
    const legacy = state.rankScope || "daily";
    const period = safePeriod(state.rankPeriod || state.rankFriendPeriod || (legacy === "friends" ? "daily" : legacy));
    const audience = safeAudience(state.rankAudience || (legacy === "friends" ? "friends" : "general"));
    return { period, audience, key: leaderboardKey(period, audience) };
  }

  function rowsFor(period, audience) {
    return social().leaderboards[leaderboardKey(period, audience)] || [];
  }

  function myRow(period, audience) {
    return rowsFor(period, audience).find(row => row.me || row.playerId === meId() || (meCode() && code(row.friendCode) === code(meCode()))) || null;
  }

  function statusText(status = {}) {
    if (!online()) return status.loadedAt ? "Hors ligne · dernière copie enregistrée" : "Hors ligne";
    if (status.phase === "loading") return "Actualisation en cours…";
    if (status.phase === "ready") {
      const seconds = Math.max(0, Math.round((now() - Number(status.loadedAt || 0)) / 1000));
      return seconds < 5 ? "Synchronisé à l’instant" : `Synchronisé il y a ${seconds} s`;
    }
    return status.message || "Classement non chargé.";
  }

  function requestMarkup() {
    const requests = social().requests;
    const incoming = requests.incoming || [];
    const outgoing = requests.outgoing || [];
    if (!incoming.length && !outgoing.length) return "";
    return `<section class="card hdsv2-card hdsv2-requests">
      <div class="hdsv2-section-head"><div><span class="card-label">Demandes d’amis</span><h2>${incoming.length ? `${incoming.length} à traiter` : "En attente"}</h2></div></div>
      ${incoming.map(item => `<div class="hdsv2-request-row"><div class="hdsv2-avatar">${esc((item.otherPseudo || item.requesterPseudo || "A").charAt(0).toUpperCase())}</div><div><strong>${esc(item.otherPseudo || item.requesterPseudo || "Joueur")}</strong><small>${esc(item.otherFriendCode || item.requesterFriendCode || "")}</small></div><div class="hdsv2-request-actions"><button type="button" data-social-respond="accept" data-request-id="${esc(item.requestId || item.id)}">Accepter</button><button type="button" class="ghost" data-social-respond="decline" data-request-id="${esc(item.requestId || item.id)}">Refuser</button></div></div>`).join("")}
      ${outgoing.map(item => `<div class="hdsv2-request-row pending"><div class="hdsv2-avatar">${esc((item.otherPseudo || "A").charAt(0).toUpperCase())}</div><div><strong>${esc(item.otherPseudo || "Joueur")}</strong><small>Demande envoyée · ${esc(item.otherFriendCode || "")}</small></div><span class="hdsv2-pending-pill">En attente</span></div>`).join("")}
    </section>`;
  }

  function friendsMarkup({ includeAdd = true } = {}) {
    const s = social();
    return `${includeAdd ? `<section class="card hdsv2-card hdsv2-add-card"><div><span class="card-label">Ajouter un ami</span><h2>Avec son code exact</h2><p>Aucun ami n’est ajouté localement avant confirmation du serveur.</p></div><form data-social-add-friend><input type="text" name="friendCode" value="${esc(state.friendCodeDraft || "")}" placeholder="MANON-ABC123" autocomplete="off" autocapitalize="characters" spellcheck="false"/><button type="submit">Envoyer</button></form>${s.feedback ? `<p class="hdsv2-feedback">${esc(s.feedback)}</p>` : ""}</section>` : ""}
    <section class="card hdsv2-card hdsv2-friends-card"><div class="hdsv2-section-head"><div><span class="card-label">Mes amis</span><h2>${s.friends.length} ami${s.friends.length > 1 ? "s" : ""}</h2></div></div>${s.friends.length ? `<div class="hdsv2-friend-list">${s.friends.map(friend => `<div class="hdsv2-friend-row"><button type="button" class="hdsv2-friend-main" data-social-profile="${esc(friend.playerId || friend.id || friend.friendCode)}"><span class="hdsv2-avatar">${esc((friend.pseudo || friend.name || "A").charAt(0).toUpperCase())}</span><span><strong>${esc(friend.pseudo || friend.name || "Ami")}</strong><small>${esc(friend.friendCode || friend.code || "")}</small></span></button><button type="button" class="ghost hdsv2-remove" data-social-remove="${esc(friend.playerId || friend.id || "")}" aria-label="Retirer ${esc(friend.pseudo || friend.name || "cet ami")}">Retirer</button></div>`).join("")}</div>` : `<div class="hdsv2-empty"><strong>Aucun ami confirmé</strong><p>Une relation apparaît ici uniquement après validation en ligne.</p></div>`}</section>`;
  }

  function leaderboardMarkup(rows, context, status) {
    if (status.phase === "loading" && !rows.length) {
      return `<div class="hdsv2-loading" aria-live="polite"><span></span><span></span><span></span><p>Chargement du classement partagé…</p></div>`;
    }
    if (status.phase === "error" && !rows.length) {
      return `<div class="hdsv2-empty error"><strong>Classement indisponible</strong><p>${esc(status.message || "Le serveur n’a pas répondu.")}</p><button type="button" data-social-refresh>Réessayer</button></div>`;
    }
    if (!rows.length) {
      return `<div class="hdsv2-empty"><strong>Aucun score ${periodShort(context.period)}</strong><p>${context.audience === "friends" ? "Tes amis sans score apparaîtront quand même dès que la liste sera synchronisée." : "Le premier dossier résolu ouvrira ce classement."}</p></div>`;
    }
    return `<div class="hdsv2-rank-list">${rows.map(row => `<button type="button" class="hdsv2-rank-row${row.me ? " me" : ""}" ${row.me ? "disabled" : `data-social-profile="${esc(row.playerId || row.id)}"`}><span class="hdsv2-rank-number">${row.rank || "—"}</span><span class="hdsv2-avatar">${esc((row.name || row.pseudo || "J").charAt(0).toUpperCase())}</span><span class="hdsv2-rank-player"><strong>${esc(row.name || row.pseudo || "Joueur")}${row.me ? " · toi" : ""}</strong><small>${Number(row.solvedInPeriod || 0)} dossier${Number(row.solvedInPeriod || 0) > 1 ? "s" : ""} compté${Number(row.solvedInPeriod || 0) > 1 ? "s" : ""}</small></span><b>${Number(row.score || 0)}<small> pts</small></b></button>`).join("")}</div>`;
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

    renderShell(`<div class="hdsv2-screen hdsv2-rank-screen">
      <header class="hdsv2-topbar"><div><p class="eyebrow">Classement</p><h1>${esc(periodLabel(context.period))}</h1></div><button type="button" class="hdsv2-profile-shortcut" data-open-profile aria-label="Ouvrir le profil">${esc(pseudo().charAt(0).toUpperCase() || "P")}</button></header>
      <nav class="hdsv2-period-tabs" aria-label="Période">${["daily", "week", "year"].map(period => `<button type="button" data-social-period="${period}" class="${context.period === period ? "active" : ""}">${esc(({ daily: "Aujourd’hui", week: "Semaine", year: "Année" })[period])}</button>`).join("")}</nav>
      <nav class="hdsv2-audience-tabs" aria-label="Joueurs affichés"><button type="button" data-social-audience="general" class="${context.audience === "general" ? "active" : ""}">Général</button><button type="button" data-social-audience="friends" class="${context.audience === "friends" ? "active" : ""}">Amis${incoming ? `<span>${incoming}</span>` : ""}</button></nav>
      <section class="card hdsv2-card hdsv2-score-card"><div class="hdsv2-score-head"><div><span class="card-label">Ton résultat partagé</span><h2>${Number(me?.score || 0)} points</h2><p>${context.audience === "friends" ? "Même période, uniquement toi et tes amis confirmés." : `Somme de tes dossiers résolus ${periodShort(context.period)}.`}</p></div><button type="button" data-social-refresh>Actualiser</button></div><div class="hdsv2-kpis"><div><b>${me?.rank ? `#${me.rank}` : "—"}</b><span>ta place</span></div><div><b>${Number(me?.solvedInPeriod || 0)}</b><span>dossiers comptés</span></div>${context.audience === "friends" ? `<div><b>${s.friends.length}</b><span>amis confirmés</span></div>` : ""}</div><small class="hdsv2-status ${status.phase || "idle"}">${esc(statusText(status))}</small></section>
      ${context.audience === "friends" ? requestMarkup() : ""}
      <section class="card hdsv2-card hdsv2-leaderboard"><div class="hdsv2-section-head"><div><span class="card-label">${context.audience === "friends" ? "Entre amis" : "Classement général"}</span><h2>${rows.length} joueur${rows.length > 1 ? "s" : ""}</h2></div></div>${leaderboardMarkup(rows, context, status)}</section>
      ${context.audience === "friends" ? friendsMarkup({ includeAdd: true }) : ""}
    </div>`);

    document.querySelector("[data-open-profile]")?.addEventListener("click", () => setState({ tab: "profile" }));
    document.querySelectorAll("[data-social-period]").forEach(button => button.addEventListener("click", () => setState({ rankPeriod: safePeriod(button.dataset.socialPeriod), rankFriendPeriod: safePeriod(button.dataset.socialPeriod) }, { save: true, renderImmediate: true })));
    document.querySelectorAll("[data-social-audience]").forEach(button => button.addEventListener("click", () => setState({ rankAudience: safeAudience(button.dataset.socialAudience), rankScope: button.dataset.socialAudience === "friends" ? "friends" : context.period }, { save: true, renderImmediate: true })));
    bindCommonSocialHandlers(context);

    const needsLeaderboard = (!status.loadedAt || now() - Number(status.loadedAt) > STALE_MS) && status.phase !== "loading";
    if (!s.loadedAt && s.phase !== "loading") {
      bootstrap({ quiet: true }).then(() => needsLeaderboard ? loadLeaderboard(context.period, context.audience, { quiet: true }) : null).then(() => { if (state.tab === "rank") renderNow(); });
    } else if (s.phase === "loading") {
      bootstrapFlight?.then(() => needsLeaderboard ? loadLeaderboard(context.period, context.audience, { quiet: true }) : null).then(() => { if (state.tab === "rank") renderNow(); });
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

  function profileSummaryMarkup() {
    const s = social();
    const profile = s.profile || identityPayload();
    const solved = Math.max(solvedTotal(), Number(profile.solvedCount || profile.solved_count || 0));
    const streak = Math.max(Number(state.streak || 0), Number(profile.streak || 0));
    return `<section class="card hdsv2-card hdsv2-profile-summary"><div class="hdsv2-profile-hero"><div class="hdsv2-profile-avatar">${esc(pseudo().charAt(0).toUpperCase() || "P")}</div><div><span class="card-label">Profil joueur</span><h2>${esc(pseudo())}</h2><p>Niveau ${Number(profile.level || levelValue())} · ${Number(profile.xp ?? state.xp ?? 0)} XP</p></div></div><div class="hdsv2-kpis"><div><b>${solved}</b><span>dossiers résolus</span></div><div><b>${streak}</b><span>jours de série</span></div><div><b>${s.friends.length}</b><span>amis</span></div></div></section>`;
  }

  renderProfile = function socialV2RenderProfile() {
    const s = social();
    renderShell(`<div class="hdsv2-screen hdsv2-profile-screen">
      <header class="hdsv2-topbar"><div><p class="eyebrow">Profil</p><h1>${esc(pseudo())}</h1></div><button type="button" class="ghost hdsv2-home-shortcut" data-home>Accueil</button></header>
      ${profileSummaryMarkup()}
      <section class="card hdsv2-card hdsv2-identity-card"><div><span class="card-label">Identité</span><h2>Ton pseudo et ton code ami</h2><p>Le serveur rattache les scores et les relations à cette identité exacte.</p></div><form data-social-pseudo><input type="text" name="pseudo" value="${esc(pseudo())}" maxlength="18" autocomplete="nickname"/><button type="submit">Enregistrer</button></form><div class="hdsv2-code-box"><span>${esc(meCode())}</span><button type="button" class="ghost" data-copy-social-code>Copier</button></div>${s.feedback ? `<p class="hdsv2-feedback">${esc(s.feedback)}</p>` : ""}</section>
      <section class="card hdsv2-card hdsv2-sync-card"><div><span class="card-label">Synchronisation</span><h2>${s.phase === "ready" ? "Multi connecté" : s.phase === "loading" ? "Connexion…" : "Vérification nécessaire"}</h2><p>${esc(s.message || "Le classement et les amis viennent uniquement de Supabase.")}</p></div><button type="button" data-social-refresh>Actualiser</button></section>
      ${requestMarkup()}
      ${friendsMarkup({ includeAdd: true })}
      <section class="card hdsv2-card hdsv2-rank-shortcuts"><div><span class="card-label">Classements</span><h2>Voir les résultats partagés</h2></div><div><button type="button" data-profile-rank="daily">Aujourd’hui</button><button type="button" class="ghost" data-profile-rank="friends">Entre amis</button></div></section>
      ${typeof backupToolsMarkup === "function" ? backupToolsMarkup() : ""}
      ${typeof profileSettingsMarkup === "function" ? profileSettingsMarkup() : ""}
    </div>`);
    sealSocialProfileShell();
    requestAnimationFrame(sealSocialProfileShell);

    document.querySelector("[data-home]")?.addEventListener("click", () => setState({ tab: "home" }));
    document.querySelector("[data-social-pseudo]")?.addEventListener("submit", async event => {
      event.preventDefault();
      const value = String(new FormData(event.currentTarget).get("pseudo") || "").trim();
      if (!value) return;
      try {
        // Les wrappers historiques de sauvegarde déclenchaient chacun leur propre
        // rafale de refresh. On les rend muets pendant ce tour, puis le moteur v2
        // effectue une seule fusion canonique autorisant le changement de pseudo.
        legacyBridgeMutedUntil = now() + 750;
        if (typeof savePseudoValue === "function") savePseudoValue(value, { source: "social-v2" });
        else state.pseudo = value;
        social().feedback = "Enregistrement du pseudo…";
        renderNow();
        // savePseudoValue réassigne l'objet state dans les couches historiques :
        // on relit donc toujours social() après cet appel, sans conserver une
        // référence devenue obsolète.
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
      try {
        await navigator.clipboard.writeText(meCode());
        s.feedback = "Code ami copié.";
      } catch {
        s.feedback = meCode();
      }
      saveSoon();
      renderNow();
    });
    document.querySelectorAll("[data-profile-rank]").forEach(button => button.addEventListener("click", () => setState({ tab: "rank", rankPeriod: "daily", rankAudience: button.dataset.profileRank === "friends" ? "friends" : "general", rankScope: button.dataset.profileRank }, { save: true })));
    bindCommonSocialHandlers(activeContext());
    document.querySelectorAll("button[data-performance-mode]").forEach(button => button.addEventListener("click", () => setPerformanceMode(button.dataset.performanceMode)));
    document.querySelector("[data-export-save]")?.addEventListener("click", exportLocalSave);
    document.querySelector("[data-download-save]")?.addEventListener("click", downloadLocalSave);
    document.querySelector("[data-import-save]")?.addEventListener("click", importLocalSave);

    if ((!s.loadedAt || now() - s.loadedAt > STALE_MS) && s.phase !== "loading") bootstrap({ quiet: true }).then(() => { if (state.tab === "profile") renderNow(); });
  };

  async function loadPublicProfile(id, { force = false } = {}) {
    if (!id) return null;
    const s = social();
    const cached = s.publicProfiles[id] || {};
    if (!force && cached.loadedAt && now() - cached.loadedAt < STALE_MS && cached.profile) return cached.profile;
    if (publicProfileFlights.has(id)) return publicProfileFlights.get(id);

    s.publicProfiles[id] = { ...cached, phase: "loading", message: "Chargement du profil partagé…" };
    saveSoon();
    const flight = api("profile", {
      query: {
        playerId: id,
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
      s.publicProfiles[id] = {
        ...cached,
        loadedAt: cached.loadedAt || 0,
        phase: "error",
        message: error.message || "Profil partagé indisponible."
      };
      saveSoon();
      return null;
    }).finally(() => publicProfileFlights.delete(id));
    publicProfileFlights.set(id, flight);
    return flight;
  }

  function acceptedFriend(id, player = null) {
    const targetId = String(player?.playerId || id || "");
    const targetCode = code(player?.friendCode || "");
    return social().friends.some(friend =>
      String(friend.playerId || friend.id || "") === targetId ||
      Boolean(targetCode && code(friend.friendCode || friend.code || "") === targetCode)
    );
  }

  viewProfile = function socialV2ViewProfile(id) {
    if (!id || id === meId()) return setState({ tab: "profile" });
    setState({ tab: "publicProfile", selectedProfileId: id }, { save: true });
    loadPublicProfile(id).then(() => {
      if (state.tab === "publicProfile" && state.selectedProfileId === id) renderNow();
    });
  };

  renderPublicProfile = function socialV2RenderPublicProfile() {
    const id = state.selectedProfileId || "";
    const record = social().publicProfiles[id] || {};
    const player = record.profile;
    const isFriend = player ? acceptedFriend(id, player) : false;
    const body = player
      ? `<section class="card hdsv2-card hdsv2-profile-summary"><div class="hdsv2-profile-hero"><div class="hdsv2-profile-avatar">${esc((player.pseudo || "J").charAt(0).toUpperCase())}</div><div><span class="card-label">Joueur</span><h2>${esc(player.pseudo || "Joueur")}</h2><p>Niveau ${Number(player.level || 1)} · ${Number(player.xp || 0)} XP</p></div></div><div class="hdsv2-kpis"><div><b>${Number(player.scores?.daily || 0)}</b><span>aujourd’hui</span></div><div><b>${Number(player.scores?.week || 0)}</b><span>semaine</span></div><div><b>${Number(player.scores?.year || 0)}</b><span>année</span></div></div></section>${isFriend ? `<section class="card hdsv2-card"><button type="button" class="ghost wide" data-social-remove="${esc(player.playerId || id)}">Retirer des amis</button></section>` : `<section class="card hdsv2-card hdsv2-neutral-note"><p>Ce joueur apparaît dans le classement général mais ne fait pas partie de tes amis confirmés.</p></section>`}`
      : record.phase === "error"
        ? `<section class="card hdsv2-card"><div class="hdsv2-empty error"><strong>Profil indisponible</strong><p>${esc(record.message || "Le serveur n’a pas répondu.")}</p><button type="button" data-public-profile-retry>Réessayer</button></div></section>`
        : `<section class="card hdsv2-card"><div class="hdsv2-loading"><span></span><span></span><span></span><p>${esc(record.message || "Chargement du profil partagé…")}</p></div></section>`;

    renderShell(`<div class="hdsv2-screen hdsv2-public-profile"><header class="hdsv2-topbar"><div><p class="eyebrow">Profil joueur</p><h1>${esc(player?.pseudo || (record.phase === "error" ? "Profil indisponible" : "Chargement…"))}</h1></div><button type="button" class="ghost" data-back-social>Retour</button></header>${body}</div>`);
    document.querySelector("[data-back-social]")?.addEventListener("click", () => setState({ tab: "rank" }));
    document.querySelector("[data-public-profile-retry]")?.addEventListener("click", () => {
      loadPublicProfile(id, { force: true }).then(() => { if (state.tab === "publicProfile") renderNow(); });
      renderNow();
    });
    bindCommonSocialHandlers(activeContext());
    // Une erreur reste stable jusqu'à une action explicite : pas de boucle réseau.
    if (!player && (!record.phase || record.phase === "idle")) {
      loadPublicProfile(id).then(() => { if (state.tab === "publicProfile") renderNow(); });
    }
  };

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
    s.feedback = `Suppression de ${friend.pseudo || friend.name || "cet ami"}…`;
    renderNow();
    try {
      const json = await api("friends/remove", { method: "DELETE", body: identityPayload({ friendPlayerId: friend.playerId, friendCodeTarget: friend.friendCode }) });
      applySnapshot(json, { quiet: true });
      s.feedback = json.message || "Ami retiré.";
      await loadLeaderboard(activeContext().period, "friends", { force: true, quiet: true });
      if (state.tab === "publicProfile") state.tab = "profile";
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
    const json = await api("score", { method: "POST", body: { ...identityPayload(), ...(payload || {}) } });
    if (!json.stored) throw new Error(json.message || "Score non enregistré.");
    adoptIdentity(json);
    return json;
  }

  submitScoreToServer = async function socialV2SubmitScore(payload) {
    const json = await sendScorePayload(payload);
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
    let outbox = beta128ReadScoreOutbox();
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
    const due = outbox.filter(item => force || !item.nextTryAt || Number(item.nextTryAt) <= startedAt).slice(0, 12);
    if (!due.length) return { storedCount: 0, pendingCount: outbox.length };

    scoreFlushFlight = (async () => {
      let storedCount = 0;
      for (const rawItem of due) {
        const payload = typeof beta128CleanScorePayload === "function" ? beta128CleanScorePayload(rawItem) : rawItem;
        const key = typeof beta128ScoreKey === "function" ? beta128ScoreKey(payload) : `${payload.mysteryId}|${payload.periodKey || payload.dayKey}`;
        try {
          state.lastScoreSubmit = { ...(state.lastScoreSubmit || {}), [payload.mysteryId]: { pending: true, stored: false, mode: "social-v2", message: "Envoi vers le classement partagé…" } };
          const result = await sendScorePayload(payload);
          storedCount += 1;
          if (typeof beta128RemoveScorePayload === "function") beta128RemoveScorePayload(payload);
          else beta128SaveScoreOutbox(beta128ReadScoreOutbox().filter(item => (typeof beta128ScoreKey === "function" ? beta128ScoreKey(item) : `${item.mysteryId}|${item.periodKey || item.dayKey}`) !== key));
          state.lastScoreSubmit = { ...(state.lastScoreSubmit || {}), [payload.mysteryId]: { pending: false, stored: true, mode: result.mode || "supabase-atomic", message: result.message || "Score synchronisé." } };
        } catch (error) {
          const current = beta128ReadScoreOutbox();
          beta128SaveScoreOutbox(current.map(item => {
            const itemKey = typeof beta128ScoreKey === "function" ? beta128ScoreKey(item) : `${item.mysteryId}|${item.periodKey || item.dayKey}`;
            if (itemKey !== key) return item;
            const retryCount = Number(item.retryCount || 0) + 1;
            const delay = typeof beta128RetryDelayMs === "function" ? beta128RetryDelayMs({ ...item, retryCount, lastMode: "error" }) : Math.min(600000, 15000 * Math.pow(1.7, retryCount));
            return { ...item, retryCount, lastMode: "error", lastMessage: error.message || "Connexion instable : renvoi automatique prévu.", nextTryAt: now() + delay, updatedAt: now() };
          }));
          state.lastScoreSubmit = { ...(state.lastScoreSubmit || {}), [payload.mysteryId]: { pending: false, stored: false, mode: "error", message: error.message || "Score gardé localement pour un nouveau renvoi." } };
        }
      }
      if (storedCount) {
        invalidateLeaderboards();
        const context = activeContext();
        await loadLeaderboard(context.period, context.audience, { force: true, quiet: true }).catch(() => []);
      }
      saveSoon();
      return { storedCount, pendingCount: beta128ReadScoreOutbox().length, reason };
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
      const status = state.lastScoreSubmit?.[mysteryId];
      if (!status || !status.stored) beta128QueueScorePayload(scorePayloadForMystery(mysteryId), "social-v2-recovery");
    });
  }

  queueScoreSubmit = function socialV2QueueScoreSubmit(mysteryId) {
    if (!mysteryId || typeof scorePayloadForMystery !== "function" || typeof beta128QueueScorePayload !== "function") return;
    const payload = scorePayloadForMystery(mysteryId);
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
    const row = scope === "friends" ? myRow(context.period, "friends") : myRow(safePeriod(scope), "general");
    return Number(row?.score || 0);
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
      if (!online()) return scheduleBackgroundRefresh();
      await bootstrap({ quiet: true });
      const context = activeContext();
      if (["rank", "profile"].includes(state.tab)) await loadLeaderboard(context.period, context.audience, { quiet: true });
      scheduleBackgroundRefresh();
    }, 60_000);
  }

  function init() {
    const s = social();
    s.version = VERSION;
    window.HD_SOCIAL_V2_ONLY = true;
    state.rankPeriod = safePeriod(state.rankPeriod || state.rankFriendPeriod || (state.rankScope === "friends" ? "daily" : state.rankScope));
    state.rankAudience = safeAudience(state.rankAudience || (state.rankScope === "friends" ? "friends" : "general"));
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
      refreshContext(activeContext()).finally(renderNow);
    });
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
        legacySocialNetworkDisabled: window.HD_SOCIAL_V2_ONLY === true
      })
    };
  }

  init();
})();
