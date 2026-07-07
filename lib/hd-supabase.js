const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_KEY || '';

function configured() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY && typeof fetch === 'function');
}

async function request(path, { method = 'GET', body, prefer = 'return=representation' } = {}) {
  if (!configured()) throw new Error('Supabase not configured');
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: prefer
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const text = await response.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { json = text; }
  if (!response.ok) {
    const err = new Error(`Supabase ${response.status}`);
    err.status = response.status;
    err.body = json;
    throw err;
  }
  return json;
}

function safeText(value = '', max = 80) {
  return String(value || '').trim().replace(/\s+/g, ' ').slice(0, max);
}

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

module.exports = { configured, request, safeText, todayKey };
