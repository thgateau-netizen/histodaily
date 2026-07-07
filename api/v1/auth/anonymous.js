const { configured } = require('../_supabase');
module.exports = (req, res) => res.status(200).json({
  ok: true,
  mode: configured() ? 'server-ready' : 'local-demo',
  token: 'local-demo',
  profile: { pseudo: 'Invité' },
  message: 'Authentification anonyme préparée. Aucun compte obligatoire dans cette phase.'
});
