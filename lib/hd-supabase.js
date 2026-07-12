const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_KEY || '';
const DEFAULT_TIMEOUT_MS = Math.max(2500, Number(process.env.SUPABASE_TIMEOUT_MS || 8500));

function configured() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY && typeof fetch === 'function');
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function retryable(error) {
  const status = Number(error?.status || 0);
  return !status || status === 408 || status === 429 || status >= 500;
}

async function request(path, { method = 'GET', body, prefer = 'return=representation', timeoutMs = DEFAULT_TIMEOUT_MS, retries } = {}) {
  if (!configured()) throw new Error('Supabase not configured');
  const verb = String(method || 'GET').toUpperCase();
  const maxRetries = Number.isFinite(retries) ? Math.max(0, retries) : (verb === 'GET' ? 1 : 0);
  let lastError = null;

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
        method: verb,
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: prefer
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: controller?.signal
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
    } catch (error) {
      lastError = error?.name === 'AbortError' ? Object.assign(new Error('Supabase timeout'), { status: 408 }) : error;
      if (attempt >= maxRetries || !retryable(lastError)) throw lastError;
      await sleep(180 * (attempt + 1));
    } finally {
      if (timer) clearTimeout(timer);
    }
  }
  throw lastError || new Error('Supabase request failed');
}

function safeText(value = '', max = 80) {
  return String(value || '').trim().replace(/\s+/g, ' ').slice(0, max);
}

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

module.exports = { configured, request, safeText, todayKey };
