/* =========================================================
   HistoDaily beta 245 — période et audience du classement séparées
   - Aujourd'hui / Semaine / Année restent sélectionnables en mode Amis
   - le classement Amis n'est plus bloqué sur le score du jour
   - les scores anciens du joueur sont renvoyés une fois au serveur
   ========================================================= */
(function beta245RankingPeriodAudience(){
  "use strict";

  const VERSION = "1.0.0-beta.245";
  const PERIODS = new Set(["daily", "week", "year"]);
  const AUDIENCES = new Set(["general", "friends"]);
  const RESYNC_KEY = `${typeof STORAGE_KEY === "string" ? STORAGE_KEY : "histodaily_state"}_beta245_period_score_resync`;
  const inFlight = new Map();

  function esc(value) {
    try { return escapeHtml(String(value ?? "")); }
    catch { return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c])); }
  }
  function normCode(value = "") {
    try { return normalizeFriendCode(value); }
    catch { return String(value || "").trim().toUpperCase().replace(/\s+/g, "").replace(/[^A-Z0-9-]/g, ""); }
  }
  function safePeriod(value) { return PERIODS.has(value) ? value : "daily"; }
  function safeAudience(value) { return AUDIENCES.has(value) ? value : "general"; }
  function initialPeriod() {
    if (PERIODS.has(state.rankPeriod)) return state.rankPeriod;
    if (PERIODS.has(state.rankFriendPeriod)) return state.rankFriendPeriod;
    if (PERIODS.has(state.rankScope)) return state.rankScope;
    return "daily";
  }
  function initialAudience() {
    if (AUDIENCES.has(state.rankAudience)) return state.rankAudience;
    return state.rankScope === "friends" ? "friends" : "general";
  }
  function currentContext() {
    const audience = safeAudience(state.rankAudience || (state.rankScope === "friends" ? "friends" : "general"));
    const period = safePeriod(audience === "friends"
      ? (state.rankFriendPeriod || state.rankPeriod || (PERIODS.has(state.rankScope) ? state.rankScope : "daily"))
      : (state.rankPeriod || (PERIODS.has(state.rankScope) ? state.rankScope : "daily")));
    return { period, audience };
  }
  function contextForScope(scope = "daily") {
    if (scope === "friends") {
      return {
        period: safePeriod(state.rankFriendPeriod || state.rankPeriod || "daily"),
        audience: "friends"
      };
    }
    return { period: safePeriod(scope), audience: "general" };
  }
  function bucketKey(context) {
    return context.audience === "friends" ? `friends:${context.period}` : context.period;
  }
  function localRange(period = "daily") {
    if (typeof rangeForScope === "function") return rangeForScope(safePeriod(period));
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const start = new Date(today);
    if (period === "week") {
      const day = start.getDay() || 7;
      start.setDate(start.getDate() - day + 1);
    } else if (period === "year") {
      start.setMonth(0, 1);
    }
    const end = new Date(today);
    end.setDate(end.getDate() + 1);
    return { start: start.getTime(), end: end.getTime() };
  }
  function scoreCap(difficulty = "moyen") {
    const key = String(difficulty || "moyen").toLowerCase();
    if (key === "facile") return 95;
    if (key === "difficile") return 150;
    if (key === "expert") return 180;
    return 120;
  }
  function localSolvedEntries(period = "daily") {
    const range = localRange(period);
    const mysteries = new Map(((typeof data === "object" && Array.isArray(data?.mysteries)) ? data.mysteries : []).map(item => [String(item.id), item]));
    return Object.entries(state.solvedMysteries || {}).filter(([, solved]) => {
      const at = Number(solved?.at || 0);
      return at >= Number(range.start || 0) && at < Number(range.end || Infinity);
    }).map(([id, solved]) => {
      const mystery = mysteries.get(String(id)) || {};
      const cap = scoreCap(solved?.difficulty || mystery?.difficulty || "moyen");
      return {
        id,
        at: Number(solved?.at || 0),
        score: Math.max(0, Math.min(cap, Number(solved?.score || 0)))
      };
    });
  }
  function localScore(period = "daily") {
    return localSolvedEntries(period).reduce((sum, row) => sum + Number(row.score || 0), 0);
  }
  function localSolvedCount(period = "daily") {
    return localSolvedEntries(period).length;
  }
  function selfIdentity() {
    return {
      playerId: String(typeof playerIdMe === "function" ? playerIdMe() : ""),
      friendCode: normCode(typeof friendCode === "function" ? friendCode() : ""),
      name: String(state.pseudo || "Invité")
    };
  }
  function rowIdentity(row = {}) {
    return {
      playerId: String(row.playerId || row.player_id || row.id || ""),
      friendCode: normCode(row.friendCode || row.friend_code || row.code || ""),
      name: String(row.name || row.pseudo || "Joueur")
    };
  }
  function isSelf(row = {}) {
    const mine = selfIdentity();
    const other = rowIdentity(row);
    return Boolean(
      (mine.playerId && other.playerId && mine.playerId === other.playerId) ||
      (mine.friendCode && other.friendCode && mine.friendCode === other.friendCode)
    );
  }
  function rawServerRows(context) {
    const rows = state.serverLeaderboards?.[bucketKey(context)];
    return Array.isArray(rows) ? rows : [];
  }
  function serverStatus(context) {
    return state.serverLeaderboardStatus?.[bucketKey(context)] || {};
  }
  function serverAuthoritative(context) {
    const status = serverStatus(context);
    return Boolean(String(status.mode || "").startsWith("supabase") && status.authoritative === true && Array.isArray(state.serverLeaderboards?.[bucketKey(context)]));
  }
  function normalizedServerRows(context) {
    const map = new Map();
    for (const raw of rawServerRows(context)) {
      const identity = rowIdentity(raw);
      const key = identity.friendCode || identity.playerId || identity.name.toLowerCase();
      if (!key) continue;
      const row = {
        ...raw,
        id: raw.id || identity.playerId || identity.friendCode || key,
        playerId: identity.playerId,
        friendCode: identity.friendCode,
        name: identity.name,
        score: Math.max(0, Number(raw.score || 0)),
        xp: Math.max(0, Number(raw.xp || 0)),
        me: isSelf(raw),
        acceptedFriend: Boolean(raw.acceptedFriend || context.audience === "friends")
      };
      const previous = map.get(key);
      if (!previous || row.score > previous.score || row.me) map.set(key, row);
    }
    return Array.from(map.values());
  }
  function fallbackFriendRows(context) {
    const rows = [];
    const me = selfIdentity();
    rows.push({
      id: me.playerId || me.friendCode || "self",
      playerId: me.playerId,
      friendCode: me.friendCode,
      name: me.name,
      score: localScore(context.period),
      xp: Math.max(0, Number(state.xp || 0)),
      me: true
    });
    if (context.audience === "friends") {
      for (const friend of Object.values(state.friends || {})) {
        const identity = rowIdentity(friend);
        const value = context.period === "week" ? friend.week : context.period === "year" ? friend.year : friend.daily;
        rows.push({
          ...friend,
          id: friend.id || identity.playerId || identity.friendCode || identity.name,
          playerId: identity.playerId,
          friendCode: identity.friendCode,
          name: identity.name,
          score: Math.max(0, Number(value || 0)),
          xp: Math.max(0, Number(friend.xp || 0)),
          acceptedFriend: true,
          me: false
        });
      }
    }
    return rows;
  }
  function rankedRows(context) {
    let rows = serverAuthoritative(context) ? normalizedServerRows(context) : fallbackFriendRows(context);
    if (context.audience === "general") rows = rows.filter(row => row.me || Number(row.score || 0) > 0);
    const mine = selfIdentity();
    if (!rows.some(row => row.me || isSelf(row))) {
      rows.push({ id: mine.playerId || mine.friendCode || "self", playerId: mine.playerId, friendCode: mine.friendCode, name: mine.name, score: localScore(context.period), xp: Number(state.xp || 0), me: true });
    }
    rows = rows.map(row => ({ ...row, me: Boolean(row.me || isSelf(row)) }));
    rows.sort((a, b) => Number(b.score || 0) - Number(a.score || 0) || String(a.name || "").localeCompare(String(b.name || ""), "fr"));
    let previousScore = null;
    let previousRank = 0;
    return rows.slice(0, 100).map((row, index) => {
      const score = Number(row.score || 0);
      const rank = previousScore !== null && score === previousScore ? previousRank : index + 1;
      previousScore = score;
      previousRank = rank;
      return { ...row, score, rank };
    });
  }
  function scoreForContext(context) {
    if (serverAuthoritative(context)) {
      const me = normalizedServerRows(context).find(row => row.me || isSelf(row));
      if (me) return Number(me.score || 0);
    }
    return localScore(context.period);
  }

  state.rankPeriod = initialPeriod();
  state.rankAudience = initialAudience();
  state.rankFriendPeriod = safePeriod(state.rankFriendPeriod || state.rankPeriod);
  state.rankScope = state.rankAudience === "friends" ? "friends" : state.rankPeriod;
  try { queueSaveState?.(80); } catch {}

  scoreForScope = function beta245ScoreForScope(scope = "daily") {
    return scoreForContext(contextForScope(scope));
  };
  solvedCountForScope = function beta245SolvedCountForScope(scope = "daily") {
    return localSolvedCount(contextForScope(scope).period);
  };
  leaderboardRows = function beta245LeaderboardRows(scope = state.rankScope || "daily") {
    return rankedRows(contextForScope(scope));
  };
  scoreOfPlayer = function beta245ScoreOfPlayer(player = {}, scope = "daily") {
    if (player.me || isSelf(player)) return scoreForScope(scope);
    const context = contextForScope(scope);
    if (context.period === "week") return Number(player.week ?? player.score ?? 0);
    if (context.period === "year") return Number(player.year ?? player.score ?? 0);
    return Number(player.daily ?? player.score ?? 0);
  };

  fetchServerLeaderboard = async function beta245FetchServerLeaderboard(scope = "daily", { force = false } = {}) {
    if (typeof isOnline !== "undefined" && !isOnline) return [];
    const context = contextForScope(scope);
    const key = bucketKey(context);
    const status = serverStatus(context);
    if (!force && status.loadedAt && Date.now() - Number(status.loadedAt || 0) < 25000) return rawServerRows(context);
    if (inFlight.has(key)) return inFlight.get(key);

    const task = (async () => {
      state.serverLeaderboardStatus = { ...(state.serverLeaderboardStatus || {}), [key]: { ...status, loading: true, period: context.period, audience: context.audience } };
      try { queueSaveState?.(80); } catch {}
      try {
        if (typeof beta128FlushScoreOutbox === "function") await beta128FlushScoreOutbox({ force, reason: `beta245:${key}` }).catch(() => {});
        if (typeof syncMyProfileToServer === "function") await syncMyProfileToServer({ source: `leaderboard-${key}-beta245` }).catch(() => null);
        const range = localRange(context.period);
        const params = new URLSearchParams({
          scope: context.period,
          periodScope: context.period,
          audience: context.audience,
          periodKey: typeof localDayKey === "function" ? localDayKey() : new Date().toISOString().slice(0, 10),
          playerId: typeof playerIdMe === "function" ? playerIdMe() : "",
          myFriendCode: typeof friendCode === "function" ? friendCode() : "",
          rangeStart: new Date(range.start).toISOString(),
          rangeEnd: new Date(range.end).toISOString(),
          _: String(Date.now())
        });
        const response = await fetch(`/api/v1/leaderboard/daily?${params.toString()}`, { cache: "no-store" });
        const json = await response.json().catch(() => ({}));
        const success = response.ok && json?.ok !== false && String(json?.mode || "").startsWith("supabase") && json?.authoritative === true;
        if (!success) throw new Error(json?.note || json?.message || `HTTP ${response.status}`);
        try { if (json.canonicalPlayerId || json.canonicalFriendCode) beta142AdoptServerIdentity?.(json); } catch {}
        state.serverLeaderboards = { ...(state.serverLeaderboards || {}), [key]: Array.isArray(json.rows) ? json.rows : [] };
        state.serverLeaderboardStatus = {
          ...(state.serverLeaderboardStatus || {}),
          [key]: {
            loading: false,
            loadedAt: Date.now(),
            mode: String(json.mode || "supabase"),
            authoritative: true,
            generatedAt: json.generatedAt || "",
            period: context.period,
            audience: context.audience,
            note: "Classement partagé actualisé."
          }
        };
        try { queueSaveState?.(80); } catch {}
        return state.serverLeaderboards[key];
      } catch (error) {
        state.serverLeaderboardStatus = {
          ...(state.serverLeaderboardStatus || {}),
          [key]: {
            loading: false,
            loadedAt: Date.now(),
            mode: "error",
            authoritative: false,
            period: context.period,
            audience: context.audience,
            note: "Classement partagé indisponible : dernier état conservé."
          }
        };
        try { queueSaveState?.(80); } catch {}
        return rawServerRows(context);
      } finally {
        inFlight.delete(key);
        const visible = currentContext();
        if (state.tab === "rank" && bucketKey(visible) === key) {
          try { render({ immediate: true }); } catch {}
        }
      }
    })();

    inFlight.set(key, task);
    return task;
  };
  ensureServerLeaderboard = function beta245EnsureServerLeaderboard(scope = "daily") {
    return fetchServerLeaderboard(scope).catch(() => []);
  };

  function periodLabel(period) {
    return ({ daily: "Aujourd’hui", week: "Cette semaine", year: "Cette année" })[safePeriod(period)];
  }
  function periodShort(period) {
    return ({ daily: "aujourd’hui", week: "cette semaine", year: "cette année" })[safePeriod(period)];
  }
  function periodEmpty(period) {
    return ({ daily: "aujourd’hui", week: "depuis lundi", year: "depuis le 1er janvier" })[safePeriod(period)];
  }
  function helpText(context) {
    const base = context.period === "daily"
      ? "Les points viennent des dossiers résolus aujourd’hui."
      : context.period === "week"
        ? "Les points de tous les dossiers résolus depuis lundi sont additionnés."
        : "Les points de tous les dossiers résolus depuis le 1er janvier sont additionnés.";
    return context.audience === "friends" ? `${base} Seuls toi et tes amis acceptés sont affichés.` : `${base} Le classement est général.`;
  }
  function requestsSnapshot() {
    try { return typeof beta125FriendRequestsState === "function" ? beta125FriendRequestsState() : { incoming: [], outgoing: [], history: [] }; }
    catch { return { incoming: [], outgoing: [], history: [] }; }
  }
  function syncLine(context) {
    const status = serverStatus(context);
    if (typeof isOnline !== "undefined" && !isOnline) return "Hors ligne : dernier classement enregistré.";
    if (status.loading) return "Actualisation du classement partagé…";
    if (String(status.mode || "").startsWith("supabase") && status.authoritative) {
      const seconds = Math.max(0, Math.round((Date.now() - Number(status.loadedAt || 0)) / 1000));
      return `Même résultat sur tous les appareils · ${seconds < 5 ? "actualisé à l’instant" : `actualisé il y a ${seconds} s`}`;
    }
    return status.note || "Synchronisation du classement en attente.";
  }
  function rowsMarkup(rows, context) {
    if (!rows.length) return `<div class="hd242-empty"><strong>Aucun score pour le moment</strong><p>Aucun dossier n’a encore été compté ${esc(periodEmpty(context.period))}.</p></div>`;
    return rows.map(row => {
      const score = Number(row.score || 0);
      const xp = Number(row.xp || 0);
      const zero = context.audience === "friends" && score === 0;
      const detail = row.me
        ? `${score ? `score partagé ${periodShort(context.period)}` : `aucun dossier compté ${periodEmpty(context.period)}`}${xp ? ` · ${xp} XP au total` : ""}`
        : zero
          ? `aucun dossier compté ${periodEmpty(context.period)}${xp ? ` · ${xp} XP au total` : ""}`
          : `score partagé ${periodShort(context.period)}${xp ? ` · ${xp} XP au total` : ""}`;
      const profileId = row.id || row.playerId || row.friendCode || "";
      return `<div class="hd242-rank-row${row.me ? " me" : ""}${zero ? " zero-score" : ""}"><span class="hd242-position">${row.rank}</span><button type="button" class="hd242-player" ${row.me || !profileId ? "disabled" : `data-view-profile="${esc(profileId)}"`}><strong>${esc(row.name || "Joueur")}${row.me ? " · toi" : ""}</strong><small>${esc(detail)}</small></button><b>${score} pt${score > 1 ? "s" : ""}</b></div>`;
    }).join("");
  }

  renderRank = function beta245RenderRank() {
    const context = currentContext();
    state.rankPeriod = context.period;
    state.rankAudience = context.audience;
    state.rankFriendPeriod = context.period;
    state.rankScope = context.audience === "friends" ? "friends" : context.period;

    const rows = rankedRows(context);
    const me = rows.find(row => row.me);
    const score = scoreForContext(context);
    const solved = localSolvedCount(context.period);
    const requests = requestsSnapshot();
    const incomingCount = Array.isArray(requests.incoming) ? requests.incoming.length : 0;
    const friendCount = Object.keys(state.friends || {}).length;

    renderShell(`<header class="topbar hd242-rank-topbar"><button type="button" data-home aria-label="Retour">←</button><div><p class="eyebrow">Classement</p><h1>${esc(periodLabel(context.period))}</h1></div><button type="button" class="hd242-profile-button" data-open-profile>${esc((state.pseudo || "P").charAt(0).toUpperCase())}</button></header>
      <nav class="hd242-rank-tabs hd245-period-tabs" aria-label="Choisir une période">
        ${["daily","week","year"].map(period => `<button type="button" data-rank-period="${period}" class="${context.period === period ? "active" : ""}" aria-current="${context.period === period ? "page" : "false"}">${esc(({ daily: "Aujourd’hui", week: "Semaine", year: "Année" })[period])}</button>`).join("")}
      </nav>
      <nav class="hd245-audience-tabs" aria-label="Choisir les joueurs affichés">
        <button type="button" data-rank-audience="general" class="${context.audience === "general" ? "active" : ""}">Général</button>
        <button type="button" data-rank-audience="friends" class="${context.audience === "friends" ? "active" : ""}">Amis${incomingCount ? ` <span>${incomingCount}</span>` : ""}</button>
      </nav>
      <section class="card hd242-score-card"><div class="hd242-score-head"><div><span class="card-label">Ton résultat partagé</span><h2>${score} points</h2><p>${esc(helpText(context))}</p></div><button type="button" data-refresh-ranking>Actualiser</button></div><div class="hd242-kpis"><div><b>#${me?.rank || "—"}</b><span>ta place</span></div><div><b>${solved}</b><span>dossier${solved > 1 ? "s" : ""} compté${solved > 1 ? "s" : ""}</span></div>${context.audience === "friends" ? `<div><b>${friendCount}</b><span>ami${friendCount > 1 ? "s" : ""}</span></div>` : ""}</div><small class="hd242-sync-line">${esc(syncLine(context))}</small></section>
      ${context.audience === "friends" && typeof beta125RequestCardMarkup === "function" ? beta125RequestCardMarkup({ compact: false }) : ""}
      <section class="card hd242-leaderboard"><div class="section-title-row"><div><span class="card-label">${context.audience === "friends" ? "Entre amis" : "Classement général"}</span><h2>${rows.length} joueur${rows.length > 1 ? "s" : ""}</h2></div></div><div class="hd242-rank-list">${rowsMarkup(rows, context)}</div></section>
      ${context.audience === "friends" ? `${typeof addFriendMarkup === "function" ? addFriendMarkup() : ""}${typeof friendListMarkup === "function" ? friendListMarkup() : ""}` : ""}`);

    document.querySelectorAll("[data-rank-period]").forEach(button => button.onclick = event => {
      event.preventDefault();
      const period = safePeriod(button.dataset.rankPeriod);
      const patch = {
        tab: "rank",
        rankPeriod: period,
        rankFriendPeriod: period,
        rankScope: context.audience === "friends" ? "friends" : period
      };
      setState(patch, { save: true, renderImmediate: true });
    });
    document.querySelectorAll("[data-rank-audience]").forEach(button => button.onclick = event => {
      event.preventDefault();
      const audience = safeAudience(button.dataset.rankAudience);
      setState({
        tab: "rank",
        rankAudience: audience,
        rankPeriod: context.period,
        rankFriendPeriod: context.period,
        rankScope: audience === "friends" ? "friends" : context.period
      }, { save: true, renderImmediate: true });
    });
    document.querySelectorAll("[data-view-profile]").forEach(button => button.onclick = event => {
      event.preventDefault();
      try { viewProfile(button.dataset.viewProfile || ""); } catch {}
    });
    document.querySelectorAll("[data-remove-friend]").forEach(button => button.onclick = event => {
      event.preventDefault();
      event.stopPropagation();
      try { removeFriend(button.dataset.removeFriend); } catch {}
    });
    document.querySelector("[data-add-friend]")?.addEventListener("submit", addFriend);
    document.querySelector("[data-friend-code-input]")?.addEventListener("input", event => { state.friendCodeDraft = event.currentTarget.value || ""; try { queueSaveState?.(200); } catch {} });
    document.querySelector("[data-share-invite]")?.addEventListener("click", shareInviteCode);
    document.querySelector("[data-home]")?.addEventListener("click", () => setState({ tab: "home" }));
    document.querySelector("[data-open-profile]")?.addEventListener("click", () => setState({ tab: "profile" }));
    document.querySelector("[data-refresh-ranking]")?.addEventListener("click", async event => {
      const button = event.currentTarget;
      button.disabled = true;
      button.textContent = "Actualisation…";
      await resyncPeriod(context.period, { force: true }).catch(() => {});
      if (typeof fetchServerFriends === "function") await fetchServerFriends({ force: true }).catch(() => {});
      await fetchServerLeaderboard(context.audience === "friends" ? "friends" : context.period, { force: true }).catch(() => {});
      try { render({ immediate: true }); } catch {}
    });

    if (context.audience === "friends" && typeof fetchServerFriends === "function") fetchServerFriends({ force: false }).catch(() => {});
    resyncPeriod(context.period).catch(() => {});
    fetchServerLeaderboard(context.audience === "friends" ? "friends" : context.period, { force: false }).catch(() => {});
  };

  async function resyncPeriod(period = "daily", { force = false } = {}) {
    if (typeof isOnline !== "undefined" && !isOnline) return [];
    if (typeof submitScoreToServer !== "function" || typeof scorePayloadForMystery !== "function") return [];
    const ids = localSolvedEntries(period).map(row => row.id).filter(Boolean);
    if (!ids.length) return [];
    const key = `${period}:${ids.join(",")}`;
    state.beta245ResyncKeys = state.beta245ResyncKeys || {};
    if (!force && state.beta245ResyncKeys[key]) return [];
    state.beta245ResyncKeys[key] = Date.now();
    try { queueSaveState?.(80); } catch {}
    return Promise.all(ids.map(id => Promise.resolve(submitScoreToServer(scorePayloadForMystery(id))).catch(() => null)));
  }

  function resyncAllOnce() {
    let done = "";
    try { done = localStorage.getItem(RESYNC_KEY) || ""; } catch {}
    if (done === VERSION) return;
    try {
      for (const mysteryId of Object.keys(state.solvedMysteries || {})) {
        if (typeof beta128QueueScorePayload === "function" && typeof scorePayloadForMystery === "function") {
          beta128QueueScorePayload(scorePayloadForMystery(mysteryId), "beta245-period-ranking-repair");
        }
      }
      localStorage.setItem(RESYNC_KEY, VERSION);
      if (typeof beta128FlushScoreOutbox === "function") beta128FlushScoreOutbox({ force: true, reason: "beta245-period-ranking-repair" }).catch(() => {});
    } catch {}
  }

  resyncAllOnce();
  try {
    state.beta245RankingVersion = VERSION;
    queueSaveState?.(100);
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      friendPeriodRanking: true,
      rankingPeriodAudienceSeparated: true
    };
  } catch {}
})();
