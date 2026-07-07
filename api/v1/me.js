const { configured } = require('./_supabase');
module.exports = (req, res) => res.status(200).json({
  ok: true,
  version: '1.0.0-beta.54',
  mode: configured() ? 'server-ready' : 'local-profile',
  profile: {
    pseudo: 'Invité',
    level: 1,
    xp: 0,
    gems: 12,
    streak: 0,
    features: ['friends', 'leaderboards', 'public_profiles', 'invite_links', 'no_chat']
  }
});
