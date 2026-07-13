(() => {
  'use strict';

  const VERSION = '1.0.0-rc.15';
  const CARD_ATTR = 'data-hd-push-card';
  const DEVICE_TOKEN_KEY = 'histodaily_push_device_token_v1';
  const SYNC_KEY = 'histodaily_push_last_sync_v1';
  let busy = false;
  let feedback = '';

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));

  function supportsPush() {
    return Boolean('serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window);
  }

  function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent || '') || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  function isStandalone() {
    return Boolean(window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true);
  }

  function randomToken() {
    try {
      const bytes = new Uint8Array(24);
      crypto.getRandomValues(bytes);
      return Array.from(bytes, n => n.toString(36).padStart(2, '0')).join('');
    } catch {
      return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
    }
  }

  function deviceToken() {
    try {
      let token = localStorage.getItem(DEVICE_TOKEN_KEY) || '';
      if (!/^[A-Za-z0-9_-]{16,160}$/.test(token)) {
        token = randomToken();
        localStorage.setItem(DEVICE_TOKEN_KEY, token);
      }
      return token;
    } catch {
      return randomToken();
    }
  }

  function safeGlobal(name, fallback = '') {
    try {
      const candidate = window[name];
      return typeof candidate === 'function' ? candidate() : (candidate ?? fallback);
    } catch {
      return fallback;
    }
  }

  function safeLocalGet(key) {
    try { return localStorage.getItem(key) || ''; } catch { return ''; }
  }

  function identity() {
    let state = {};
    try { state = JSON.parse(safeLocalGet('histodaily_state') || '{}') || {}; } catch {}
    return {
      playerId: String(safeGlobal('playerIdMe', '') || safeGlobal('localUserId', '') || safeLocalGet('histodaily_state_local_user_id') || '').slice(0, 90),
      friendCode: String(safeGlobal('friendCode', '') || safeLocalGet('histodaily_state_friend_code') || '').slice(0, 48),
      pseudo: String(safeGlobal('currentPseudo', '') || state.pseudo || 'Joueur').slice(0, 32)
    };
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
  }

  async function api(path, options = {}) {
    const response = await fetch(`/api/v1/${path}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.ok === false) {
      const error = new Error(payload.message || 'Action impossible pour le moment.');
      error.status = response.status;
      error.payload = payload;
      throw error;
    }
    return payload;
  }

  async function getRegistration() {
    if (!supportsPush()) throw new Error('Les notifications ne sont pas disponibles sur ce navigateur.');
    return navigator.serviceWorker.ready;
  }

  async function getSubscription() {
    if (!supportsPush()) return null;
    const registration = await getRegistration();
    return registration.pushManager.getSubscription();
  }

  async function serverSubscribe(subscription) {
    const who = identity();
    return api('push/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        subscription: subscription.toJSON ? subscription.toJSON() : subscription,
        deviceToken: deviceToken(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Paris',
        dailyEnabled: true,
        ...who
      })
    });
  }

  async function enablePush() {
    if (busy) return;
    busy = true;
    feedback = 'Activation en cours…';
    renderAll();
    try {
      if (!supportsPush()) throw new Error('Ce navigateur ne prend pas en charge les notifications Web Push.');
      if (isIOS() && !isStandalone()) throw new Error('Sur iPhone, ajoute d’abord HistoDaily à l’écran d’accueil puis ouvre l’application installée.');
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') throw new Error(permission === 'denied' ? 'Les notifications sont bloquées dans les réglages du téléphone.' : 'Autorisation non accordée.');
      const key = await api('push/public-key');
      if (!key.publicKey) throw new Error('La clé de notification du serveur est absente.');
      const registration = await getRegistration();
      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(key.publicKey)
        });
      }
      await serverSubscribe(subscription);
      try { localStorage.setItem(SYNC_KEY, String(Date.now())); } catch {}
      feedback = 'Rappel quotidien activé. Tu peux maintenant envoyer un test.';
    } catch (error) {
      feedback = error?.message || 'L’activation n’a pas abouti.';
    } finally {
      busy = false;
      await renderAll();
    }
  }

  async function disablePush() {
    if (busy) return;
    busy = true;
    feedback = 'Désactivation en cours…';
    renderAll();
    try {
      const subscription = await getSubscription();
      await api('push/unsubscribe', {
        method: 'POST',
        body: JSON.stringify({ deviceToken: deviceToken(), endpoint: subscription?.endpoint || '' })
      }).catch(() => null);
      if (subscription) await subscription.unsubscribe().catch(() => false);
      try { await navigator.clearAppBadge?.(); } catch {}
      feedback = 'Notifications désactivées sur cet appareil.';
    } catch {
      feedback = 'Impossible de terminer la désactivation. Réessaie plus tard.';
    } finally {
      busy = false;
      await renderAll();
    }
  }

  async function sendTest() {
    if (busy) return;
    busy = true;
    feedback = 'Envoi du test…';
    renderAll();
    try {
      await api('push/test', { method: 'POST', body: JSON.stringify({ deviceToken: deviceToken() }) });
      feedback = 'Notification envoyée. Elle devrait apparaître dans quelques secondes.';
    } catch (error) {
      feedback = error?.message || 'Le test n’a pas abouti.';
    } finally {
      busy = false;
      renderAll();
    }
  }

  async function currentState() {
    const base = {
      supported: supportsPush(),
      iosNeedsInstall: isIOS() && !isStandalone(),
      permission: typeof Notification !== 'undefined' ? Notification.permission : 'unsupported',
      subscribed: false
    };
    if (!base.supported) return base;
    try {
      base.subscribed = Boolean(await getSubscription());
    } catch {}
    return base;
  }

  function cardMarkup(state) {
    let title = 'Rappel quotidien';
    let description = 'Reçois un rappel discret en soirée si tu n’as pas encore résolu l’expédition du jour.';
    let status = 'Désactivé';
    let actions = `<button type="button" data-hd-push-action="enable" ${busy ? 'disabled' : ''}>Activer les rappels</button>`;

    if (!state.supported) {
      status = 'Non disponible';
      description = 'Ce navigateur ne prend pas en charge les notifications Web Push.';
      actions = '';
    } else if (state.iosNeedsInstall) {
      status = 'Installation nécessaire';
      description = 'Sur iPhone, ajoute HistoDaily à l’écran d’accueil, puis active les notifications depuis l’application installée.';
      actions = '';
    } else if (state.permission === 'denied') {
      status = 'Bloqué par le téléphone';
      description = 'Réactive les notifications de HistoDaily dans les réglages du navigateur ou du téléphone.';
      actions = '';
    } else if (state.subscribed && state.permission === 'granted') {
      status = 'Activé';
      actions = `<button type="button" data-hd-push-action="test" ${busy ? 'disabled' : ''}>Envoyer un test</button><button type="button" class="ghost" data-hd-push-action="disable" ${busy ? 'disabled' : ''}>Désactiver</button>`;
    }

    return `<section class="card hd-push-card" ${CARD_ATTR}="true">
      <div class="hd-push-card-icon" aria-hidden="true">🔔</div>
      <div class="hd-push-card-copy">
        <span class="card-label">Notifications</span>
        <div class="hd-push-title-row"><h2>${esc(title)}</h2><span class="hd-push-status ${state.subscribed ? 'is-active' : ''}">${esc(status)}</span></div>
        <p>${esc(description)}</p>
        <div class="hd-push-actions">${actions}</div>
        ${feedback ? `<p class="hd-push-feedback" role="status" aria-live="polite">${esc(feedback)}</p>` : ''}
      </div>
    </section>`;
  }

  async function mountCard() {
    const app = document.getElementById('app');
    if (!app || app.querySelector(`[${CARD_ATTR}]`)) return;
    const target = app.querySelector('[data-beta182-fold="settings"] .beta182-fold-content') || app.querySelector('.profile-settings-card') || app.querySelector('.hd257-fold-body');
    if (!target) return;
    const state = await currentState();
    const holder = document.createElement('div');
    holder.innerHTML = cardMarkup(state);
    const card = holder.firstElementChild;
    if (!card) return;
    target.prepend(card);
    bindCard(card);
  }

  async function renderAll() {
    const cards = [...document.querySelectorAll(`[${CARD_ATTR}]`)];
    if (!cards.length) return mountCard();
    const state = await currentState();
    cards.forEach(card => {
      const holder = document.createElement('div');
      holder.innerHTML = cardMarkup(state);
      const next = holder.firstElementChild;
      card.replaceWith(next);
      bindCard(next);
    });
  }

  function bindCard(card) {
    card?.querySelectorAll('[data-hd-push-action]').forEach(button => button.addEventListener('click', () => {
      const action = button.dataset.hdPushAction;
      if (action === 'enable') enablePush();
      else if (action === 'disable') disablePush();
      else if (action === 'test') sendTest();
    }));
  }

  async function silentResync() {
    if (!supportsPush() || Notification.permission !== 'granted') return;
    try {
      const last = Number(localStorage.getItem(SYNC_KEY) || 0);
      if (Date.now() - last < 12 * 60 * 60 * 1000) return;
      const subscription = await getSubscription();
      if (!subscription) return;
      await serverSubscribe(subscription);
      localStorage.setItem(SYNC_KEY, String(Date.now()));
    } catch {}
  }

  function clearBadgeOnOpen() {
    try { navigator.clearAppBadge?.(); } catch {}
  }

  function boot() {
    const app = document.getElementById('app') || document.body;
    const observer = new MutationObserver(() => mountCard());
    observer.observe(app, { childList: true, subtree: true });
    mountCard();
    silentResync();
    clearBadgeOnOpen();
    window.addEventListener('focus', clearBadgeOnOpen);
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      push: { enable: enablePush, disable: disablePush, test: sendTest, refresh: renderAll, supported: supportsPush }
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
