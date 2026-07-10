const { handleRequest } = require('../../lib/hd-api');

module.exports = async function histodailyApiRouter(req, res) {
  return handleRequest(req, res);
};
