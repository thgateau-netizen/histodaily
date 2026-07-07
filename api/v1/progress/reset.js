const { configured, request, safeText, todayKey } = require('../_supabase');

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return {};
}

module.exports = async (req, res) => {
  if (req.method && req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'POST only' });
  }
  const body = readBody(req);
  const playerId = safeText(body.playerId || '', 90);
  const periodKey = safeText(body.periodKey || todayKey(), 20);
  const mysteryId = safeText(body.mysteryId || '', 80);
  const clear = safeText(body.clear || 'today', 20);
  if (!playerId) return res.status(400).json({ ok: false, message: 'playerId requis' });
  if (!configured()) return res.status(200).json({ ok: true, stored: false, mode: 'local-preview', message: 'Supabase non configuré : reset serveur ignoré.' });
  try {
    let path = `hd_scores?player_id=eq.${encodeURIComponent(playerId)}`;
    if (clear === 'today') path += `&period_key=eq.${encodeURIComponent(periodKey)}`;
    if (mysteryId) path += `&mystery_id=eq.${encodeURIComponent(mysteryId)}`;
    await request(path, { method: 'DELETE', prefer: 'return=minimal' });
    return res.status(200).json({ ok: true, mode: 'supabase', cleared: clear, periodKey, message: clear === 'today' ? 'Score serveur du jour effacé.' : 'Scores serveur effacés.' });
  } catch (error) {
    return res.status(200).json({ ok: false, mode: 'supabase-error', message: 'Impossible de réinitialiser le score serveur.', detail: error.message, body: error.body || null });
  }
};
