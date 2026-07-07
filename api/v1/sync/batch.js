const { handleRoute } = require('../../../lib/hd-api');
module.exports = (req, res) => handleRoute(req, res, 'sync/batch');
