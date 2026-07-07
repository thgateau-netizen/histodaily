const seed = {
  daily: [
    ["ClioMax", 176], ["PapyHistoire", 160], ["Louise", 145], ["Anatole", 125], ["Mina", 110]
  ],
  week: [
    ["ClioMax", 840], ["PapyHistoire", 760], ["Louise", 690], ["Anatole", 610], ["Mina", 540]
  ],
  year: [
    ["ClioMax", 12480], ["PapyHistoire", 11840], ["Louise", 10990], ["Anatole", 9820], ["Mina", 9210]
  ],
  friends: [
    ["Manon", 760], ["PapyHistoire", 690], ["Louise", 610], ["Anatole", 540]
  ]
};
module.exports = (req, res) => {
  const scope = ["daily", "week", "year", "friends"].includes(req.query?.scope) ? req.query.scope : "daily";
  const rows = (seed[scope] || seed.daily).map(([pseudo, score], index) => ({ rank: index + 1, pseudo, score }));
  res.status(200).json({ ok: true, scope, rows });
};
