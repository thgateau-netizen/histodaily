const { handleRoute } = require('../../../lib/hd-api');
module.exports = (req, res) => {
  const raw = req.query && req.query.action;
  const action = Array.isArray(raw) ? raw[0] : raw;
  return handleRoute(req, res, `leaderboard/${action || 'daily'}`);
};
