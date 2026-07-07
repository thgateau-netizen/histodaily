const { dailyMystery } = require('../_data');
module.exports = (req, res) => {
  const m = dailyMystery();
  const raw = Number((req.query && req.query.index) || 0);
  const index = Math.max(0, Math.min(Math.floor(Number.isFinite(raw) ? raw : 0), Math.min(3, (m.clues || []).length) - 1));
  res.status(200).json({ ok: true, index, hint: (m.clues || [])[index] || null, clueCount: Math.min(3, (m.clues || []).length) });
};
