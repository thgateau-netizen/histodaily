const { configured, request, safeText } = require('../_supabase');

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch { return {}; } }
  return {};
}

module.exports = async (req, res) => {
  const body = readBody(req);
  const playerId = safeText(body.playerId || req.query?.playerId || '', 90);
  if (!configured()) {
    return res.status(200).json({
      ok: true,
      mode: 'local-preview',
      friends: [],
      features: { addByCode: true, profiles: true, leaderboards: true, chat: false, inviteLinks: true },
      message: 'Amis gérés localement pour l’instant. Supabase activera la synchronisation réelle.'
    });
  }
  try {
    if ((req.method || 'GET') === 'POST') {
      const row = {
        player_id: playerId,
        friend_code: safeText(body.friendCode || '', 32),
        friend_pseudo: safeText(body.friendPseudo || body.pseudo || '', 32)
      };
      if (!row.player_id || !row.friend_code) return res.status(400).json({ ok: false, message: 'playerId et friendCode requis' });
      await request('hd_friends', { method: 'POST', prefer: 'resolution=merge-duplicates', body: [row] });
    }
    const rows = playerId ? await request(`hd_friends?select=friend_player_id,friend_code,friend_pseudo,created_at&player_id=eq.${encodeURIComponent(playerId)}&order=created_at.desc`) : [];
    return res.status(200).json({ ok: true, mode: 'supabase', friends: rows || [], features: { addByCode: true, profiles: true, leaderboards: true, chat: false, inviteLinks: true } });
  } catch (error) {
    return res.status(200).json({ ok: true, mode: 'supabase-error', friends: [], message: error.message, detail: error.body || null });
  }
};
