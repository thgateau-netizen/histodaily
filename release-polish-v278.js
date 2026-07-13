(() => {
  "use strict";
  const VERSION = "1.0.0-rc.13";
  const ID = "hd-release-status";
  let hideTimer = 0;

  function statusNode() {
    let node = document.getElementById(ID);
    if (node) return node;
    node = document.createElement("div");
    node.id = ID;
    node.className = "hd-release-status";
    node.setAttribute("role", "status");
    node.setAttribute("aria-live", "polite");
    node.hidden = true;
    document.body.appendChild(node);
    return node;
  }

  function announce(message, mode = "info", persistent = false) {
    const node = statusNode();
    window.clearTimeout(hideTimer);
    node.className = `hd-release-status is-${mode}`;
    node.textContent = message;
    node.hidden = false;
    requestAnimationFrame(() => node.classList.add("is-visible"));
    if (!persistent) hideTimer = window.setTimeout(() => {
      node.classList.remove("is-visible");
      window.setTimeout(() => { node.hidden = true; }, 220);
    }, 3200);
  }

  function updateConnectivity(initial = false) {
    if (navigator.onLine === false) {
      document.documentElement.dataset.connection = "offline";
      announce("Mode hors connexion — ta progression reste enregistrée sur cet appareil.", "offline", true);
      return;
    }
    delete document.documentElement.dataset.connection;
    const node = document.getElementById(ID);
    if (!initial || node?.classList.contains("is-offline")) announce("Connexion rétablie — synchronisation en cours.", "online");
  }

  function markInteractiveState(root = document) {
    root.querySelectorAll("button[disabled], [role='button'][aria-disabled='true']").forEach(el => el.setAttribute("aria-busy", el.classList.contains("loading") ? "true" : "false"));
    root.querySelectorAll("img:not([alt])").forEach(img => img.alt = "");
  }

  function installBootGuard() {
    window.setTimeout(() => {
      const app = document.getElementById("app");
      if (!app || !app.querySelector(".boot-shell")) return;
      app.innerHTML = `<main class="hd-startup-fallback" id="main-content">
        <span aria-hidden="true">🧭</span><h1>HistoDaily n’a pas pu démarrer</h1>
        <p>Ta progression n’est pas perdue. Recharge simplement l’application.</p>
        <button type="button" class="primary" id="hd-reload-app">Recharger</button>
      </main>`;
      document.getElementById("hd-reload-app")?.addEventListener("click", () => location.reload());
    }, 12000);
  }

  function installServiceWorkerFeedback() {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.addEventListener("controllerchange", () => announce("HistoDaily vient d’être mis à jour.", "online"));
  }

  function boot() {
    document.documentElement.dataset.release = VERSION;
    updateConnectivity(true);
    window.addEventListener("online", () => updateConnectivity(false));
    window.addEventListener("offline", () => updateConnectivity(false));
    installBootGuard();
    installServiceWorkerFeedback();
    markInteractiveState();
    const observer = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === 1) markInteractiveState(node);
      }));
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.HistoDaily = { ...(window.HistoDaily || {}), releaseCandidate: true, releaseVersion: VERSION };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
