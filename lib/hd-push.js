const webpush = require('web-push');
const { configured, request, safeText, todayKey } = require('./hd-supabase');

let vapidConfigured = false;

function pushConfigured() {
  return Boolean(
    process.env.VAPID_PUBLIC_KEY &&
    process.env.VAPID_PRIVATE_KEY &&
    process.env.SUPABASE_URL &&
    (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_KEY)
  );
}

function configureVapid() {
  if (vapidConfigured) return true;
  const publicKey = String(process.env.VAPID_PUBLIC_KEY || '').trim();
  const privateKey = String(process.env.VAPID_PRIVATE_KEY || '').trim();
  const subjectRaw = String(process.env.VAPID_SUBJECT || 'mailto:notifications@histodaily.app').trim();
  const subject = /^(mailto:|https:\/\/)/i.test(subjectRaw) ? subjectRaw : 'mailto:notifications@histodaily.app';
  if (!publicKey || !privateKey) return false;
  webpush.setVapidDetails(subject, publicKey, privateKey);
  vapidConfigured = true;
  return true;
}

function cleanDeviceToken(value = '') {
  const token = String(value || '').trim();
  return /^[A-Za-z0-9_-]{16,160}$/.test(token) ? token : '';
}

function cleanEndpoint(value = '') {
  const endpoint = String(value || '').trim().slice(0, 4096);
  try {
    const url = new URL(endpoint);
    return url.protocol === 'https:' ? endpoint : '';
  } catch {
    return '';
  }
}

function cleanKey(value = '') {
  return String(value || '').trim().slice(0, 512);
}

function cleanTimezone(value = '') {
  const zone = String(value || '').trim().slice(0, 80);
  try {
    new Intl.DateTimeFormat('fr-FR', { timeZone: zone || 'Europe/Paris' }).format(new Date());
    return zone || 'Europe/Paris';
  } catch {
    return 'Europe/Paris';
  }
}

function readSubscription(body = {}) {
  const raw = body.subscription && typeof body.subscription === 'object' ? body.subscription : body;
  const endpoint = cleanEndpoint(raw.endpoint);
  const keys = raw.keys && typeof raw.keys === 'object' ? raw.keys : {};
  const p256dh = cleanKey(keys.p256dh || raw.p256dh);
  const auth = cleanKey(keys.auth || raw.auth);
  if (!endpoint || !p256dh || !auth) return null;
  return { endpoint, keys: { p256dh, auth }, expirationTime: raw.expirationTime || null };
}

function rowToSubscription(row = {}) {
  const endpoint = cleanEndpoint(row.endpoint);
  const p256dh = cleanKey(row.p256dh);
  const auth = cleanKey(row.auth);
  if (!endpoint || !p256dh || !auth) return null;
  return { endpoint, expirationTime: null, keys: { p256dh, auth } };
}

async function removeRows({ endpoint = '', deviceToken = '' } = {}) {
  const safeEndpoint = cleanEndpoint(endpoint);
  const safeToken = cleanDeviceToken(deviceToken);
  if (safeToken) {
    await request(`hd_push_subscriptions?device_token=eq.${encodeURIComponent(safeToken)}`, {
      method: 'DELETE', prefer: 'return=minimal'
    }).catch(() => null);
  }
  if (safeEndpoint) {
    await request(`hd_push_subscriptions?endpoint=eq.${encodeURIComponent(safeEndpoint)}`, {
      method: 'DELETE', prefer: 'return=minimal'
    }).catch(() => null);
  }
}

async function findByDeviceToken(deviceToken = '') {
  const token = cleanDeviceToken(deviceToken);
  if (!token || !configured()) return null;
  const rows = await request(`hd_push_subscriptions?select=*&device_token=eq.${encodeURIComponent(token)}&limit=1`).catch(() => []);
  return Array.isArray(rows) ? rows[0] || null : null;
}

async function subscribe(body = {}, userAgent = '') {
  if (!pushConfigured() || !configured()) {
    return { status: 503, payload: { ok: false, configured: false, message: 'Les notifications ne sont pas encore configurées sur le serveur.' } };
  }
  const subscription = readSubscription(body);
  const deviceToken = cleanDeviceToken(body.deviceToken);
  if (!subscription || !deviceToken) {
    return { status: 400, payload: { ok: false, message: 'Abonnement de notification invalide.' } };
  }
  const now = new Date().toISOString();
  const row = {
    device_token: deviceToken,
    endpoint: subscription.endpoint,
    p256dh: subscription.keys.p256dh,
    auth: subscription.keys.auth,
    player_id: safeText(body.playerId || '', 90),
    friend_code: safeText(body.friendCode || '', 48).toUpperCase(),
    pseudo: safeText(body.pseudo || 'Joueur', 32),
    timezone: cleanTimezone(body.timezone),
    daily_enabled: body.dailyEnabled !== false,
    user_agent: safeText(userAgent || '', 240),
    updated_at: now
  };
  await removeRows({ endpoint: subscription.endpoint, deviceToken });
  const rows = await request('hd_push_subscriptions', {
    method: 'POST',
    prefer: 'return=representation',
    body: [row]
  });
  return {
    status: 200,
    payload: {
      ok: true,
      subscribed: true,
      dailyEnabled: row.daily_enabled,
      deliveryWindow: 'evening',
      rows: Array.isArray(rows) ? rows.length : 0
    }
  };
}

async function unsubscribe(body = {}) {
  const deviceToken = cleanDeviceToken(body.deviceToken);
  const endpoint = cleanEndpoint(body.endpoint || body.subscription?.endpoint);
  if (!deviceToken && !endpoint) {
    return { status: 400, payload: { ok: false, message: 'Abonnement introuvable.' } };
  }
  if (configured()) await removeRows({ endpoint, deviceToken });
  return { status: 200, payload: { ok: true, subscribed: false } };
}

async function status(deviceToken = '') {
  const row = await findByDeviceToken(deviceToken);
  return {
    status: 200,
    payload: {
      ok: true,
      configured: pushConfigured(),
      subscribed: Boolean(row),
      dailyEnabled: Boolean(row?.daily_enabled),
      lastSentDay: row?.last_sent_day || null
    }
  };
}

function payloadForDaily(dayKey = todayKey()) {
  return JSON.stringify({
    title: 'Ton expédition du jour est prête',
    body: 'Un nouveau dossier t’attend. Quelques minutes suffisent pour préserver ta série.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: `histodaily-daily-${dayKey}`,
    url: '/?view=daily&source=push',
    data: { type: 'daily-reminder', dayKey, url: '/?view=daily&source=push' }
  });
}

function payloadForTest() {
  return JSON.stringify({
    title: 'Les notifications HistoDaily fonctionnent',
    body: 'Parfait. Tu pourras recevoir ton rappel quotidien même lorsque l’application est fermée.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: `histodaily-test-${Date.now()}`,
    url: '/?view=profile&source=push-test',
    data: { type: 'test', url: '/?view=profile&source=push-test' }
  });
}

async function sendToRow(row, payload, options = {}) {
  if (!configureVapid()) throw new Error('VAPID not configured');
  const subscription = rowToSubscription(row);
  if (!subscription) throw Object.assign(new Error('Invalid subscription'), { statusCode: 410 });
  return webpush.sendNotification(subscription, payload, {
    TTL: options.TTL || 43200,
    urgency: options.urgency || 'normal',
    topic: options.topic || undefined
  });
}

async function sendTest(body = {}) {
  if (!pushConfigured() || !configured()) {
    return { status: 503, payload: { ok: false, message: 'Les notifications ne sont pas encore configurées sur le serveur.' } };
  }
  const token = cleanDeviceToken(body.deviceToken);
  const row = await findByDeviceToken(token);
  if (!row) return { status: 404, payload: { ok: false, message: 'Active d’abord les notifications sur cet appareil.' } };
  const lastTest = Date.parse(row.last_test_at || '');
  if (Number.isFinite(lastTest) && Date.now() - lastTest < 15000) {
    return { status: 429, payload: { ok: false, message: 'Attends quelques secondes avant de refaire un test.' } };
  }
  try {
    await sendToRow(row, payloadForTest(), { TTL: 300, urgency: 'high' });
    await request(`hd_push_subscriptions?device_token=eq.${encodeURIComponent(token)}`, {
      method: 'PATCH', prefer: 'return=minimal', body: { last_test_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    }).catch(() => null);
    return { status: 200, payload: { ok: true, sent: true } };
  } catch (error) {
    const code = Number(error?.statusCode || error?.status || 0);
    if (code === 404 || code === 410) await removeRows({ endpoint: row.endpoint, deviceToken: token });
    return { status: code === 404 || code === 410 ? 410 : 502, payload: { ok: false, expired: code === 404 || code === 410, message: code === 404 || code === 410 ? 'Cet abonnement a expiré. Réactive les notifications.' : 'La notification de test n’a pas pu être envoyée.' } };
  }
}

async function solvedIdentities(dayKey) {
  if (!configured()) return { playerIds: new Set(), friendCodes: new Set() };
  const rows = await request(`hd_scores?select=player_id,friend_code&period_key=eq.${encodeURIComponent(dayKey)}&scope=eq.daily&limit=3000`).catch(() => []);
  const list = Array.isArray(rows) ? rows : [];
  return {
    playerIds: new Set(list.map(row => safeText(row.player_id || '', 90)).filter(Boolean)),
    friendCodes: new Set(list.map(row => safeText(row.friend_code || '', 48).toUpperCase()).filter(Boolean))
  };
}

function alreadySolved(row = {}, solved = { playerIds: new Set(), friendCodes: new Set() }) {
  const playerId = safeText(row.player_id || '', 90);
  const friendCode = safeText(row.friend_code || '', 48).toUpperCase();
  return Boolean((playerId && solved.playerIds.has(playerId)) || (friendCode && solved.friendCodes.has(friendCode)));
}

async function dispatchDaily() {
  if (!pushConfigured() || !configured()) {
    return { status: 503, payload: { ok: false, configured: false, message: 'Push ou Supabase non configuré.' } };
  }
  configureVapid();
  const dayKey = todayKey();
  const rows = await request('hd_push_subscriptions?select=*&daily_enabled=eq.true&limit=1000').catch(() => []);
  const subscriptions = Array.isArray(rows) ? rows : [];
  const solved = await solvedIdentities(dayKey);
  const candidates = subscriptions.filter(row => row.last_sent_day !== dayKey && !alreadySolved(row, solved));
  const result = { total: subscriptions.length, eligible: candidates.length, sent: 0, skippedSolved: subscriptions.filter(row => alreadySolved(row, solved)).length, expired: 0, failed: 0 };
  const payload = payloadForDaily(dayKey);

  for (let index = 0; index < candidates.length; index += 10) {
    const batch = candidates.slice(index, index + 10);
    const outcomes = await Promise.allSettled(batch.map(async row => {
      try {
        await sendToRow(row, payload, { TTL: 43200, urgency: 'normal', topic: `daily-${dayKey}` });
        await request(`hd_push_subscriptions?id=eq.${encodeURIComponent(row.id)}`, {
          method: 'PATCH', prefer: 'return=minimal', body: { last_sent_day: dayKey, last_sent_at: new Date().toISOString(), updated_at: new Date().toISOString() }
        }).catch(() => null);
        return 'sent';
      } catch (error) {
        const code = Number(error?.statusCode || error?.status || 0);
        if (code === 404 || code === 410) {
          await removeRows({ endpoint: row.endpoint, deviceToken: row.device_token });
          return 'expired';
        }
        return 'failed';
      }
    }));
    outcomes.forEach(outcome => {
      const value = outcome.status === 'fulfilled' ? outcome.value : 'failed';
      if (value === 'sent') result.sent += 1;
      else if (value === 'expired') result.expired += 1;
      else result.failed += 1;
    });
  }
  return { status: 200, payload: { ok: true, dayKey, ...result } };
}

async function handlePushRoute(req, res, route, send) {
  const body = req.body && typeof req.body === 'object' ? req.body : (() => {
    try { return typeof req.body === 'string' ? JSON.parse(req.body) : {}; } catch { return {}; }
  })();
  if (route === 'push/public-key') {
    const publicKey = String(process.env.VAPID_PUBLIC_KEY || '').trim();
    return send(res, publicKey ? 200 : 503, { ok: Boolean(publicKey), configured: pushConfigured(), publicKey });
  }
  if (route === 'push/status') {
    const token = Array.isArray(req.query?.deviceToken) ? req.query.deviceToken[0] : req.query?.deviceToken;
    const result = await status(token || '');
    return send(res, result.status, result.payload);
  }
  if (route === 'push/subscribe') {
    if (req.method !== 'POST') return send(res, 405, { ok: false, message: 'POST only' });
    const result = await subscribe(body, req.headers?.['user-agent'] || '');
    return send(res, result.status, result.payload);
  }
  if (route === 'push/unsubscribe') {
    if (req.method !== 'POST') return send(res, 405, { ok: false, message: 'POST only' });
    const result = await unsubscribe(body);
    return send(res, result.status, result.payload);
  }
  if (route === 'push/test') {
    if (req.method !== 'POST') return send(res, 405, { ok: false, message: 'POST only' });
    const result = await sendTest(body);
    return send(res, result.status, result.payload);
  }
  return null;
}

module.exports = {
  pushConfigured,
  handlePushRoute,
  dispatchDaily,
  payloadForDaily,
  payloadForTest,
  readSubscription,
  cleanDeviceToken
};
