(() => {
  "use strict";
  const VERSION = "1.0.0-rc.13";
  const MODAL_ID = "hd-release-center-modal";
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  function closeModal() {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) return;
    const returnTo = modal._returnFocus;
    modal.remove();
    document.documentElement.classList.remove("hd-modal-open");
    document.body.classList.remove("hd-modal-open");
    try { returnTo?.focus?.(); } catch {}
  }

  function modalMarkup(section = "help") {
    const online = navigator.onLine !== false;
    return `<div class="hd-release-center-backdrop" id="${MODAL_ID}" role="presentation">
      <section class="hd-release-center" role="dialog" aria-modal="true" aria-labelledby="hd-release-center-title" tabindex="-1">
        <header><div><span class="card-label">HistoDaily</span><h2 id="hd-release-center-title">Aide et données</h2></div><button type="button" class="ghost hd-release-center-close" aria-label="Fermer">×</button></header>
        <nav aria-label="Rubriques"><button type="button" data-hd-center-tab="help" class="${section === "help" ? "active" : ""}">Aide</button><button type="button" data-hd-center-tab="data" class="${section === "data" ? "active" : ""}">Mes données</button><button type="button" data-hd-center-tab="privacy" class="${section === "privacy" ? "active" : ""}">Confidentialité</button></nav>
        <div class="hd-release-center-body">
          ${section === "help" ? `<article><h3>Comment fonctionne HistoDaily ?</h3><p>Chaque jour, résous un mystère, découvre sa révélation puis poursuis avec un cours ou un quiz. Les archives servent à réviser et restent hors du classement quotidien.</p><h3>Le score reste en attente ?</h3><p>Ta partie reste enregistrée sur cet appareil. Vérifie ta connexion puis ouvre le profil ou le classement pour relancer la synchronisation.</p><h3>Installer l’application</h3><p>Sur Android, ouvre le menu du navigateur puis choisis « Installer l’application » ou « Ajouter à l’écran d’accueil ».</p></article>` : ""}
          ${section === "data" ? `<article><h3>Une sauvegarde vraiment complète</h3><p>Le fichier contient la progression, le pseudo et l’identité sociale nécessaires pour conserver ton code ami lors d’un changement d’appareil.</p><div class="hd-release-data-actions"><button type="button" data-hd-data-action="download">Télécharger ma sauvegarde</button><button type="button" class="ghost" data-hd-data-action="repair">Réparer le cache</button></div><p class="hd-release-data-note" data-hd-data-feedback>Réparer le cache ne supprime pas ta progression locale.</p></article>` : ""}
          ${section === "privacy" ? `<article><h3>Données utilisées</h3><p>HistoDaily utilise ton pseudo, un identifiant technique, ton code ami, tes scores et ta progression nécessaires au fonctionnement de l’application.</p><h3>Ce qui n’est pas demandé</h3><p>L’application ne demande ni caméra, ni microphone, ni géolocalisation. Elle ne comporte pas de messagerie privée.</p><p><a class="hd-release-legal-link" href="privacy.html" target="_blank" rel="noopener">Lire la notice de confidentialité complète</a></p></article>` : ""}
        </div>
        <footer><span>${online ? "Connecté" : "Hors connexion"}</span></footer>
      </section>
    </div>`;
  }

  function bindDataActions(modal) {
    modal.querySelectorAll("[data-hd-data-action]").forEach(button => button.addEventListener("click", async () => {
      const action = button.dataset.hdDataAction;
      const feedback = modal.querySelector("[data-hd-data-feedback]");
      button.disabled = true;
      try {
        if (action === "download") {
          if (typeof window.downloadLocalSave === "function") window.downloadLocalSave();
          else if (typeof downloadLocalSave === "function") downloadLocalSave();
          if (feedback) feedback.textContent = "Sauvegarde téléchargée.";
        } else if (action === "repair") {
          if (feedback) feedback.textContent = "Nettoyage du cache en cours…";
          await window.HistoDaily?.repairCache?.();
        }
      } catch {
        if (feedback) feedback.textContent = "Cette action n’a pas abouti. Ta progression n’a pas été modifiée.";
      } finally { button.disabled = false; }
    }));
  }

  function openModal(section = "help", trigger = document.activeElement) {
    closeModal();
    document.body.insertAdjacentHTML("beforeend", modalMarkup(section));
    const modal = document.getElementById(MODAL_ID);
    const dialog = modal?.querySelector(".hd-release-center");
    if (!modal || !dialog) return;
    modal._returnFocus = trigger;
    document.documentElement.classList.add("hd-modal-open");
    document.body.classList.add("hd-modal-open");
    modal.querySelector(".hd-release-center-close")?.addEventListener("click", closeModal);
    modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
    modal.querySelectorAll("[data-hd-center-tab]").forEach(button => button.addEventListener("click", () => openModal(button.dataset.hdCenterTab, trigger)));
    bindDataActions(modal);
    dialog.addEventListener("keydown", event => {
      if (event.key === "Escape") { event.preventDefault(); closeModal(); return; }
      if (event.key !== "Tab") return;
      const focusable = [...dialog.querySelectorAll("button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])")].filter(el => !el.disabled && !el.hidden);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    dialog.focus();
  }

  function mountProfileCard() {
    const app = document.getElementById("app");
    if (!app || app.querySelector("[data-hd-release-center-card]")) return;
    const target = app.querySelector('[data-beta182-fold="settings"] .beta182-fold-content') || app.querySelector(".profile-settings-card") || app.querySelector(".hd257-fold-body");
    if (!target) return;
    const card = document.createElement("section");
    card.className = "card hd-release-center-card";
    card.dataset.hdReleaseCenterCard = "true";
    card.innerHTML = `<div><span class="card-label">À propos</span><h2>Aide, sauvegarde et confidentialité</h2><p>Retrouve les réponses utiles, ta sauvegarde et les options de récupération.</p></div><div class="hd-release-center-actions"><button type="button" data-hd-open-center="help">Ouvrir l’aide</button><button type="button" class="ghost" data-hd-open-center="data">Mes données</button></div>`;
    target.appendChild(card);
    card.querySelectorAll("[data-hd-open-center]").forEach(button => button.addEventListener("click", () => openModal(button.dataset.hdOpenCenter, button)));
  }

  function boot() {
    document.documentElement.dataset.appVersion = VERSION;
    const observer = new MutationObserver(() => mountProfileCard());
    observer.observe(document.getElementById("app") || document.body, { childList: true, subtree: true });
    mountProfileCard();
    window.addEventListener("keydown", event => { if (event.key === "Escape" && document.getElementById(MODAL_ID)) closeModal(); });
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, releaseVersion: VERSION, openHelp: openModal };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
