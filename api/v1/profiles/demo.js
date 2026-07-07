module.exports = (req, res) => res.status(410).json({
  ok: false,
  mode: 'removed',
  message: 'Les profils démo ont été supprimés : seuls les vrais profils, amis et scores serveur sont affichés.'
});
