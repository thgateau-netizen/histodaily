const { dispatchDaily } = require('../../lib/hd-push');

module.exports = async function pushReminderCron(req, res) {
  const secret = String(process.env.CRON_SECRET || '').trim();
  const authorization = String(req.headers?.authorization || '').trim();
  if (!secret || authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ ok: false, message: 'Unauthorized' });
  }
  if (req.method && req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, message: 'GET only' });
  }
  try {
    const result = await dispatchDaily();
    return res.status(result.status).json(result.payload);
  } catch {
    return res.status(500).json({ ok: false, message: 'Push dispatch failed' });
  }
};
