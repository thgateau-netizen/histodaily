const { configured, request, safeText } = require('./_supabase');

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return {};
}

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const body = readBody(req);
    const profile = {
      player_id: safeText(body.playerId || body.friendCode || 'local-player', 90),
      pseudo: safeText(body.pseudo || 'Invité', 32),
      friend_code: safeText(body.friendCode || '', 32),
      level: Math.max(1, Number(body.level || 1)),
      xp: Math.max(0, Number(body.xp || 0)),
      solved_count: Math.max(0, Number(body.solvedCount || 0)),
      streak: Math.max(0, Number(body.streak || 0)),
      updated_at: new Date().toISOString()
    };
    if (!configured()) {
      return res.status(200).json({ ok: true, stored: false, mode: 'local-profile', version: '1.0.0-beta.57', profile });
    }
    try {
      const rows = await request('hd_profiles', { method: 'POST', prefer: 'resolution=merge-duplicates', body: [profile] });
      return res.status(200).json({ ok: true, stored: true, mode: 'supabase', version: '1.0.0-beta.57', rows, profile });
    } catch (error) {
      return res.status(200).json({ ok: true, stored: false, mode: 'supabase-error', version: '1.0.0-beta.57', message: error.message, profile });
    }
  }
  return res.status(200).json({
    ok: true,
    version: '1.0.0-beta.57',
    mode: configured() ? 'server-ready' : 'local-profile',
    profile: {
      pseudo: 'Invité',
      level: 1,
      xp: 0,
      gems: 12,
      streak: 0,
      features: ['friends', 'leaderboards', 'public_profiles', 'invite_links', 'no_chat', 'profile_save']
    }
  });
};
