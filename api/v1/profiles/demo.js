const { configured } = require('../_supabase');
module.exports = (req, res) => res.status(200).json({
  ok: true,
  mode: configured() ? 'server-ready' : 'local-preview',
  profile: { id: 'demo-cliomax', pseudo: 'ClioMax', level: 11, xp: 2620, solved: 42, streak: 9, badges: ['Top jour', 'Sans indice'] }
});
