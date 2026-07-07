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
  const score = Math.max(0, Math.min(500, Number(body.score || 0)));
  const playerId = safeText(body.playerId || body.friendCode || 'local-player', 90);
  const pseudo = safeText(body.pseudo || 'Invité', 32);
  const periodKey = safeText(body.dayKey || todayKey(), 20);
  const payload = {
    player_id: playerId,
    pseudo,
    friend_code: safeText(body.friendCode || '', 32),
    mystery_id: safeText(body.mysteryId || '', 80),
    period_key: periodKey,
    scope: 'daily',
    score,
    hints: Math.max(0, Number(body.hints || 0)),
    tries: Math.max(1, Number(body.tries || 1)),
    difficulty: safeText(body.difficulty || 'moyen', 20),
    level: Math.max(1, Number(body.level || 1)),
    xp: Math.max(0, Number(body.xp || 0)),
    solved_count: Math.max(0, Number(body.solvedCount || 0)),
    streak: Math.max(0, Number(body.streak || 0)),
    solved_at: new Date(Number(body.solvedAt || Date.now())).toISOString()
  };

  if (!configured()) {
    return res.status(200).json({
      ok: true,
      stored: false,
      mode: 'local-preview',
      message: 'Score reçu par l’API, mais Supabase n’est pas configuré : conservation locale.'
    });
  }

  try {
    await request('hd_profiles', { method: 'POST', prefer: 'resolution=merge-duplicates', body: [{
      player_id: payload.player_id,
      pseudo: payload.pseudo,
      friend_code: payload.friend_code,
      level: payload.level,
      xp: payload.xp,
      solved_count: payload.solved_count,
      streak: payload.streak,
      updated_at: new Date().toISOString()
    }] });
    const rows = await request('hd_scores', { method: 'POST', body: [payload] });
    return res.status(200).json({ ok: true, stored: true, mode: 'supabase', rows, message: 'Score enregistré dans le classement.' });
  } catch (error) {
    return res.status(200).json({ ok: true, stored: false, mode: 'supabase-error', message: 'Base configurée mais écriture impossible : score conservé localement.', detail: error.message });
  }
};
