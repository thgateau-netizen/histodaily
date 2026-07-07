module.exports = (req, res) => res.status(200).json({ ok: true, token: "local-demo", profile: { pseudo: "Invité" } });
