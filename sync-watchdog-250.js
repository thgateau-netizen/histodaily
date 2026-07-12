/* =========================================================
   Beta 250 — garde-fou réseau
   -----------------------------------------------------------
   Bug corrigé : beta128FlushScoreOutbox et
   beta128FlushOutgoingRequests utilisent un verrou global
   (beta128ScoreFlushInFlight / beta128FlushInFlight) qui n'est
   libéré qu'après la fin du fetch réseau. Aucun fetch côté
   client n'avait de timeout : si une requête restait bloquée
   (PWA mise en arrière-plan, coupure réseau, cold start), le
   verrou restait vrai pour toujours et TOUTE synchronisation
   future (scores ET demandes d'amis) était silencieusement
   annulée dès la première ligne de la fonction, sans erreur
   visible pour l'utilisateur.

   Correctif : chaque appel vers /api/v1/* est désormais borné
   dans le temps. Une requête qui traîne échoue proprement,
   ce qui relâche le verrou existant et laisse le mécanisme de
   nouvelle tentative déjà présent (beta128RetryDelayMs) faire
   son travail normalement. Ce fichier ne modifie aucune
   fonction interne de app.js : il s'appuie sur les mêmes
   points d'extension globaux que social-reliability-249.js.
   ========================================================= */
(function beta250NetworkWatchdog() {
  try {
    if (typeof window === "undefined" || typeof window.fetch !== "function") return;
    if (window.__beta250FetchPatched) return;
    window.__beta250FetchPatched = true;

    const ORIGINAL_FETCH = window.fetch.bind(window);
    const TIMEOUT_MS = 15000;

    function isApiRequest(input) {
      try {
        const url = typeof input === "string" ? input : (input && input.url) || "";
        return url.indexOf("/api/v1/") !== -1;
      } catch {
        return false;
      }
    }

    window.fetch = function beta250TimedFetch(input, init = {}) {
      if (!isApiRequest(input)) return ORIGINAL_FETCH(input, init);
      if (init && init.signal) return ORIGINAL_FETCH(input, init);
      if (typeof AbortController !== "function") return ORIGINAL_FETCH(input, init);

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

      return ORIGINAL_FETCH(input, { ...init, signal: controller.signal })
        .catch(error => {
          if (error && error.name === "AbortError") {
            const timeoutError = new Error("Connexion trop lente : nouvelle tentative automatique.");
            timeoutError.name = "TimeoutError";
            throw timeoutError;
          }
          throw error;
        })
        .finally(() => clearTimeout(timer));
    };

    // Filet de sécurité supplémentaire, indépendant du correctif ci-dessus :
    // si malgré tout un verrou de synchronisation restait bloqué (bug futur,
    // exception non prévue), on relance périodiquement un essai. Comme les
    // fonctions elles-mêmes sortent désormais toujours de leur "finally"
    // grâce au timeout, cette relance périodique suffit à les débloquer.
    window.setInterval(() => {
      try { if (typeof beta128FlushScoreOutbox === "function") beta128FlushScoreOutbox({ reason: "beta250-watchdog" }).catch(() => {}); } catch {}
      try { if (typeof beta128FlushOutgoingRequests === "function") beta128FlushOutgoingRequests({}).catch(() => {}); } catch {}
    }, 45000);

    // Reprise immédiate quand l'app PWA revient au premier plan : c'est le
    // scénario le plus fréquent de fetch resté bloqué sur mobile.
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "visible") return;
      try { if (typeof beta128FlushScoreOutbox === "function") beta128FlushScoreOutbox({ force: true, reason: "beta250-visible" }).catch(() => {}); } catch {}
      try { if (typeof beta128FlushOutgoingRequests === "function") beta128FlushOutgoingRequests({ force: true }).catch(() => {}); } catch {}
    });
    window.addEventListener("online", () => {
      try { if (typeof beta128FlushScoreOutbox === "function") beta128FlushScoreOutbox({ force: true, reason: "beta250-online" }).catch(() => {}); } catch {}
      try { if (typeof beta128FlushOutgoingRequests === "function") beta128FlushOutgoingRequests({ force: true }).catch(() => {}); } catch {}
    });

    window.HistoDaily = { ...(window.HistoDaily || {}), networkWatchdog250: true, fetchTimeoutMs: TIMEOUT_MS };
    try { console.info("[HistoDaily] beta250 network watchdog actif (timeout " + TIMEOUT_MS + "ms sur /api/v1/*)"); } catch {}
  } catch (error) {
    try { console.warn("beta250 network watchdog", error); } catch {}
  }
})();
