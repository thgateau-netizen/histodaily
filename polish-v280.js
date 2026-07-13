/* HistoDaily 1.0 RC3 — interface polish pass */
(() => {
  'use strict';
  const VERSION = '1.0.0-rc.15';

  const TEXT_REPLACEMENTS = new Map([
    ['Reprendre', 'Poursuivre'],
    ['Ouvrir', 'Découvrir'],
    ['Voir', 'Explorer'],
    ['Jouer', 'Ouvrir le dossier'],
    ['Terminé', 'Mission accomplie'],
    ['Aucun score reçu', 'Le terrain est encore libre'],
    ['Personne pour le moment', 'Ton cercle est prêt à grandir']
  ]);

  function polishButtons(root = document) {
    root.querySelectorAll('button').forEach(button => {
      const text = String(button.textContent || '').trim();
      if (TEXT_REPLACEMENTS.has(text)) button.textContent = TEXT_REPLACEMENTS.get(text);
    });
  }

  function polishEmptyStates(root = document) {
    root.querySelectorAll('.hd242-empty').forEach(card => {
      const strong = card.querySelector('strong');
      const paragraph = card.querySelector('p');
      if (strong?.textContent.trim() === 'Aucun score reçu') {
        strong.textContent = 'Le terrain est encore libre';
        if (paragraph) paragraph.textContent = 'Résous le dossier du jour pour poser le premier score du classement.';
        card.classList.add('hd280-empty-state');
      }
    });
    root.querySelectorAll('.empty-friends-card').forEach(card => {
      const title = card.querySelector('h2');
      const paragraph = card.querySelector('p');
      if (title?.textContent.trim() === 'Personne pour le moment') {
        title.textContent = 'Ton cercle est prêt à grandir';
        if (paragraph) paragraph.textContent = 'Partage ton code avec une personne, puis retrouve-la ici dès qu’elle accepte.';
        card.classList.add('hd280-empty-state');
      }
    });
  }

  function polishHome(root = document) {
    const home = root.querySelector('.hd219-home');
    if (!home) return;
    home.classList.add('hd280-home');
    const expedition = home.querySelector('.hd219-expedition');
    expedition?.classList.add('hd280-expedition-focus');

    const appbarTitle = home.querySelector('.hd219-appbar h1');
    if (appbarTitle && /Continue ton exploration/i.test(appbarTitle.textContent)) {
      appbarTitle.textContent = 'Une découverte à la fois';
    }

    const expeditionButton = home.querySelector('[data-hd219-expedition] span');
    if (expeditionButton) {
      const label = expeditionButton.textContent.trim();
      if (label === 'Résoudre le mystère') expeditionButton.textContent = 'Ouvrir le dossier';
      if (label === 'Lire le cours') expeditionButton.textContent = 'Comprendre la réponse';
      if (label === 'Faire le quiz') expeditionButton.textContent = 'Relier les idées';
      if (label === 'Revoir le cours') expeditionButton.textContent = 'Reparcourir l’expédition';
    }

    const secondaryCards = home.querySelector('.hd219-home-cards');
    secondaryCards?.setAttribute('aria-label', 'Pour aller plus loin');
    home.querySelectorAll('.hd219-learning-card').forEach((card, index) => {
      card.style.setProperty('--hd280-order', String(index));
    });
  }

  function polishProfile(root = document) {
    const shell = root.querySelector('.app-shell.tab-profile');
    if (!shell) return;
    shell.classList.add('hd280-profile');
    const achievements = shell.querySelector('.achievement-grid');
    achievements?.setAttribute('aria-label', 'Tes réussites');
  }

  function run() {
    polishButtons();
    polishEmptyStates();
    polishHome();
    polishProfile();
  }

  const observer = new MutationObserver(() => window.requestAnimationFrame(run));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('DOMContentLoaded', run, { once: true });
  window.setTimeout(run, 0);

  window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, polish280: true };
})();
