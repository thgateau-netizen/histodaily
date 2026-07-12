/* =========================================================
   HistoDaily beta 247 — nettoyage des demandes fantômes locales
   - supprime une seule fois les anciennes demandes en attente stockées localement
   - conserve l'historique et les demandes réellement renvoyées par Supabase ensuite
   ========================================================= */
(function beta247ClearLegacyLocalRequests(){
  "use strict";

  const VERSION = "1.0.0-beta.247";
  const STORAGE_BASE = typeof STORAGE_KEY === "string" ? STORAGE_KEY : "histodaily_state";
  const MIGRATION_KEY = `${STORAGE_BASE}_cleanup_legacy_friend_requests_beta247`;
  const OPS_KEY = `${STORAGE_BASE}_social_mutations_v2`;

  function alreadyDone() {
    try { return localStorage.getItem(MIGRATION_KEY) === VERSION; }
    catch { return false; }
  }

  function markDone() {
    try { localStorage.setItem(MIGRATION_KEY, VERSION); } catch {}
  }

  function currentRequests() {
    try {
      if (typeof beta125FriendRequestsState === "function") return beta125FriendRequestsState();
    } catch {}
    const raw = state?.friendRequests || {};
    return {
      incoming: Array.isArray(raw.incoming) ? raw.incoming : [],
      outgoing: Array.isArray(raw.outgoing) ? raw.outgoing : [],
      history: Array.isArray(raw.history) ? raw.history : []
    };
  }

  function saveRequests(requests) {
    try {
      if (typeof beta125SetFriendRequests === "function") beta125SetFriendRequests(requests);
      else state.friendRequests = requests;
    } catch {
      try { state.friendRequests = requests; } catch {}
    }
  }

  function clearLegacyResponseOps() {
    try {
      const parsed = JSON.parse(localStorage.getItem(OPS_KEY) || "[]");
      if (!Array.isArray(parsed)) return 0;
      const kept = parsed.filter(op => op?.type !== "respondRequest");
      const removed = parsed.length - kept.length;
      if (removed) localStorage.setItem(OPS_KEY, JSON.stringify(kept));
      state.socialMutationOutbox = kept;
      return removed;
    } catch { return 0; }
  }

  function migrate() {
    if (alreadyDone()) return;

    const requests = currentRequests();
    const removedIncoming = requests.incoming.length;
    const removedOutgoing = requests.outgoing.length;
    const removedOps = clearLegacyResponseOps();

    saveRequests({
      ...requests,
      incoming: [],
      outgoing: [],
      history: requests.history
    });

    state.serverFriendRequestsStatus = {
      ...(state.serverFriendRequestsStatus || {}),
      loading: false,
      loadedAt: 0,
      mode: "local-cleanup",
      message: "Anciennes demandes locales supprimées."
    };
    state.friendRequestFeedback = (removedIncoming || removedOutgoing || removedOps)
      ? "Les anciennes demandes en attente ont été supprimées."
      : "";
    state.beta247SocialCleanupVersion = VERSION;

    markDone();
    try { queueSaveState?.(0); } catch { try { saveState?.(); } catch {} }
    try { render?.({ immediate: true }); } catch {}

    // Une fois le stockage local assaini, seule la réponse du serveur peut
    // repeupler les demandes. En ligne, on force donc un instantané frais.
    try {
      if (typeof isOnline === "undefined" || isOnline) {
        setTimeout(() => beta125FetchFriendRequests?.({ force: true }), 0);
      }
    } catch {}
  }

  try { migrate(); }
  catch (error) { try { console.warn("beta247 local request cleanup", error); } catch {} }
})();
