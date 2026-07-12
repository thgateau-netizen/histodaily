const { handleSocialV2 } = require('../../../lib/hd-social-v2');
module.exports = async function (req, res) { return handleSocialV2(req, res, 'social-v2/profile'); };
