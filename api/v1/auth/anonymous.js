const { configured } = require('../_supabase');
module.exports = (req, res) => res.status(200).json({
  ok: true,
  mode: configured() ? 'server-ready' : 'local-session',
  token: 'local-session',
  profile: { pseudo: 'Invité' },
  message: 'Authentification anonyme préparée. Aucun compte obligatoire dans cette phase.'
});
