const { handleRequest } = require('../../lib/hd-api');

module.exports = async function histodailyApiIndex(req, res) {
  return handleRequest(req, res);
};
