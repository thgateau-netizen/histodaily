/* =========================================================
   HistoDaily beta 251 — vérité sociale, réparation visuelle et
   récupération après échec de synchronisation
   ========================================================= */
(() => {
  "use strict";

  const VERSION = "1.0.0-beta.251";
  const root = document.documentElement;
  root.classList.add("hd251-stable-ui");
  let directFriendsPromise = null;

  function online() {
    if (typeof isOnline !== "undefined") return Boolean(isOnline);
    return typeof navigator === "undefined" ? true : navigator.onLine !== false;
  }
  function modeOk(mode = "") { return /^supabase(?:-|$)/.test(String(mode || "")); }
  function safeRender() {
    try { render?.({ immediate: true }); } catch {}
  }
  function currentDiscipline() {
    return String(state?.currentDiscipline || "history");
  }

  function resetHistoryRail() {
    if (state?.tab !== "home" || currentDiscipline() !== "history") return;
    const reset = () => {
      const rail = document.querySelector(".hd222-world-switcher");
      if (!rail) return;
      try { rail.scrollTo({ left: 0, top: 0, behavior: "auto" }); }
      catch { rail.scrollLeft = 0; }
    };
    // visual-v4 programme lui aussi un positionnement au prochain frame : le
    // second frame garantit que notre correction est la dernière appliquée.
    requestAnimationFrame(() => requestAnimationFrame(reset));
    window.setTimeout(reset, 80);
  }

  function normalizeLeaderboardStatuses() {
    const statuses = state?.serverLeaderboardStatus || {};
    let changed = false;
    for (const [key, value] of Object.entries(statuses)) {
      if (value?.authoritative === true && modeOk(value.mode)) {
        const note = value.note === "Classement partagé indisponible : dernier état conservé."
          ? "Classement partagé actualisé."
          : value.note;
        if (note !== value.note) {
          statuses[key] = { ...value, note };
          changed = true;
        }
      }
    }
    if (changed) {
      state.serverLeaderboardStatus = { ...statuses };
      try { queueSaveState?.(80); } catch {}
    }
  }

  const previousRender = typeof render === "function" ? render : null;
  if (previousRender) {
    render = function beta251Render(options = {}) {
      normalizeLeaderboardStatuses();
      const result = previousRender(options);
      resetHistoryRail();
      return result;
    };
  }

  async function directFriendsRead({ force = false } = {}) {
    if (!online()) return state?.friends || {};
    if (directFriendsPromise) return directFriendsPromise;
    directFriendsPromise = (async () => {
      const params = new URLSearchParams({
        playerId: typeof playerIdMe === "function" ? playerIdMe() : "",
        myFriendCode: typeof friendCode === "function" ? friendCode() : "",
        friendCode: typeof friendCode === "function" ? friendCode() : "",
        pseudo: typeof currentPseudo === "function" ? currentPseudo() : String(state?.pseudo || "Invité"),
        hard: force ? "1" : "0",
        _: String(Date.now())
      });
      const response = await fetch(`/api/v1/friends/sync?${params.toString()}`, { cache: "no-store" });
      const json = await response.json().catch(() => ({}));
      const success = response.ok && json?.ok !== false && modeOk(json?.mode) && json?.authoritative !== false;
      if (!success) throw new Error(json?.message || `HTTP ${response.status}`);
      try { beta142AdoptServerIdentity?.(json); } catch {}
      try { beta142ApplyServerSocialSnapshot?.(json); }
      catch {
        try { if (Array.isArray(json.friends) && typeof beta141FriendMapFromServer === "function") state.friends = beta141FriendMapFromServer(json.friends); } catch {}
        try { if (json.requests) beta125SetFriendRequests?.(json.requests); } catch {}
      }
      state.serverFriendsStatus = {
        loading: false,
        loadedAt: Date.now(),
        mode: String(json.mode || "supabase"),
        authoritative: true,
        message: json.message || "Amis actualisés depuis Supabase."
      };
      try { queueSaveState?.(80); } catch {}
      return state.friends || {};
    })().finally(() => { directFriendsPromise = null; });
    return directFriendsPromise;
  }

  const previousFetchFriends = typeof fetchServerFriends === "function" ? fetchServerFriends : null;
  fetchServerFriends = async function beta251FetchServerFriends(options = {}) {
    if (!online()) return state?.friends || {};
    let result = null;
    if (previousFetchFriends) {
      try { result = await previousFetchFriends(options); } catch {}
    }
    if (modeOk(state?.serverFriendsStatus?.mode) && state?.serverFriendsStatus?.authoritative !== false) {
      return result || state.friends || {};
    }
    try {
      result = await directFriendsRead(options);
      if (["profile", "rank", "publicProfile"].includes(state?.tab)) safeRender();
      return result;
    } catch (error) {
      state.serverFriendsStatus = {
        loading: false,
        loadedAt: Date.now(),
        mode: "error",
        authoritative: false,
        message: "Amis en ligne temporairement indisponibles. Les données locales sont conservées."
      };
      try { queueSaveState?.(80); } catch {}
      return state?.friends || {};
    }
  };

  const previousFetchLeaderboard = typeof fetchServerLeaderboard === "function" ? fetchServerLeaderboard : null;
  if (previousFetchLeaderboard) {
    fetchServerLeaderboard = async function beta251FetchLeaderboard(scope = "daily", options = {}) {
      const friendScope = scope === "friends" || String(scope).startsWith("friends:");
      if (friendScope) await fetchServerFriends({ force: Boolean(options.force) }).catch(() => null);
      const rows = await previousFetchLeaderboard(scope, options).catch(() => []);
      normalizeLeaderboardStatuses();
      return rows;
    };
  }

  function compactOutbox() {
    try {
      if (typeof beta128ReadScoreOutbox !== "function" || typeof beta128SaveScoreOutbox !== "function") return;
      const rows = beta128ReadScoreOutbox();
      const best = new Map();
      for (const row of rows) {
        const key = typeof beta128ScoreKey === "function"
          ? beta128ScoreKey(row)
          : `${row?.playerId || ""}|${row?.mysteryId || ""}|${row?.periodKey || row?.dayKey || ""}`;
        const previous = best.get(key);
        if (!previous || Number(row?.score || 0) >= Number(previous?.score || 0)) best.set(key, row);
      }
      if (best.size !== rows.length) beta128SaveScoreOutbox([...best.values()]);
    } catch {}
  }

  function retryMulti(reason = "beta251") {
    if (!online()) return;
    compactOutbox();
    beta128FlushScoreOutbox?.({ force: true, reason }).catch(() => null);
    fetchServerFriends?.({ force: true }).catch(() => null);
  }

  window.addEventListener("online", () => retryMulti("beta251-online"));
  window.setTimeout(() => {
    resetHistoryRail();
    retryMulti("beta251-startup");
  }, 650);

  try {
    state.beta251Version = VERSION;
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      stableRankHeader: true,
      leftAlignedHistoryRail: true,
      canonicalFriendRefresh: true,
      compactProfile251: true
    };
    queueSaveState?.(60);
  } catch {}
})();
