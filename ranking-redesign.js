/* HistoDaily beta 198 — classement simplifié et score canonique. */
(() => {
  "use strict";

  const VERSION = "1.0.0-beta.198";
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
