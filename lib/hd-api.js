const { mysteries, dailyMystery } = require('./hd-data');
const { configured, request, safeText, todayKey } = require('./hd-supabase');

const VERSION = '1.0.0-beta.138';

function send(res, status, payload) {
  return res.status(status).json(payload);
}
function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return {};
}
function routeFromReq(req) {
  const url = new URL(req.url || '/', 'https://histodaily.local');
  return url.pathname.replace(/^\/api\/v1\/?/, '').replace(/\/$/, '') || 'index';
}
function norm(s){ return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim(); }
function accepted(rawGuess, mystery){
  const guess = norm(rawGuess);
  if (!guess || guess.length < 3) return false;
  const blocked = (mystery.blockedGuesses || []).map(norm).filter(Boolean);
  if (blocked.includes(guess)) return false;
  const candidates = [mystery.answer, ...(mystery.aliases || [])].map(norm).filter(c => c && c.length >= 3);
  return candidates.some(candidate => {
    if (guess === candidate) return true;
    const tokens = candidate.split(' ').filter(Boolean);
    if (tokens.length === 1) return guess.split(' ').includes(candidate);
    return guess.length >= candidate.length && (` ${guess} `).includes(` ${candidate} `);
  });
}
function feedback(rawGuess, mystery){
  const guess = norm(rawGuess);
  if (!guess) return 'Écris une vraie proposition : un nom, un lieu, un événement ou un concept précis.';
  const blocked = (mystery.blockedGuesses || []).map(norm).filter(Boolean);
  if (blocked.includes(guess)) return 'Trop large : le mystère attend un nom ou un concept plus précis.';
  const candidates = [mystery.answer, ...(mystery.aliases || [])].map(norm).filter(Boolean);
  const tokens = guess.split(' ').filter(t => t.length > 3);
  if (candidates.some(c => tokens.some(t => c.includes(t)))) return 'Tu chauffes, mais la réponse est incomplète ou mal ciblée.';
  return 'Non. Aucun indice automatique : choisis un indice seulement si tu acceptes de perdre du score potentiel.';
}

function cleanFriendCode(value = '') {
  return safeText(value || '', 48).toUpperCase().replace(/\s+/g, '').replace(/[^A-Z0-9-]/g, '');
}
function codeSuffix(value = '') {
  const parts = cleanFriendCode(value).split('-').filter(Boolean);
  return parts[parts.length - 1] || '';
}
function friendCodeMatches(a = '', b = '') {
  const ca = cleanFriendCode(a);
  const cb = cleanFriendCode(b);
  if (!ca || !cb) return false;
  if (ca === cb) return true;
  const sa = codeSuffix(ca);
  const sb = codeSuffix(cb);
  return Boolean(sa && sb && sa === sb);
}

function startOfWeekISO(date = new Date()) {

  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay() || 7;
  d.setDate(d.getDate() - day + 1);
  return d.toISOString();
}
function startOfYear(date = new Date()) {
  return new Date(date.getFullYear(), 0, 1).toISOString();
}
function aggregate(rows, scope) {
  const map = new Map();
  for (const row of rows || []) {
    const id = row.player_id || row.friend_code || row.pseudo;
    if (!id) continue;
    const existing = map.get(id) || {
      id,
      player_id: row.player_id || '',
      friend_code: cleanFriendCode(row.friend_code || ''),
      friendCode: cleanFriendCode(row.friend_code || ''),
      pseudo: row.pseudo || 'Joueur',
      score: 0,
      level: row.level || 1,
      xp: row.xp || 0,
      solved: row.solved_count || 0,
      solved_count: row.solved_count || 0,
      streak: row.streak || 0,
      hints: row.hints,
      tries: row.tries,
      solvedAt: row.solved_at
    };
    if (scope === 'daily') existing.score = Math.max(existing.score, Number(row.score || 0));
    else existing.score += Number(row.score || 0);
    existing.pseudo = row.pseudo || existing.pseudo;
    existing.friend_code = cleanFriendCode(row.friend_code || existing.friend_code || '');
    existing.friendCode = existing.friend_code;
    existing.level = Math.max(existing.level || 1, Number(row.level || 1));
    existing.xp = Math.max(existing.xp || 0, Number(row.xp || 0));
    existing.solved = Math.max(existing.solved || 0, Number(row.solved_count || 0));
    existing.solved_count = existing.solved;
    existing.streak = Math.max(existing.streak || 0, Number(row.streak || 0));
    existing.solvedAt = existing.solvedAt || row.solved_at;
    map.set(id, existing);
  }
  return Array.from(map.values())
    .sort((a, b) => b.score - a.score || String(a.pseudo).localeCompare(String(b.pseudo), 'fr'))
    .slice(0, 50)
    .map((row, index) => ({ rank: index + 1, ...row }));
}
function queryFor(scope, periodKey) {
  const select = 'select=player_id,pseudo,friend_code,score,level,xp,solved_count,streak,hints,tries,solved_at';
  if (scope === 'friends') return `hd_scores?${select}&period_key=eq.${encodeURIComponent(periodKey)}&scope=eq.daily&order=score.desc&limit=1000`;
  if (scope === 'daily') return `hd_scores?${select}&period_key=eq.${encodeURIComponent(periodKey)}&scope=eq.daily&order=score.desc&limit=200`;
  if (scope === 'week') return `hd_scores?${select}&solved_at=gte.${encodeURIComponent(startOfWeekISO())}&scope=eq.daily&order=score.desc&limit=500`;
  if (scope === 'year') return `hd_scores?${select}&solved_at=gte.${encodeURIComponent(startOfYear())}&scope=eq.daily&order=score.desc&limit=1000`;
  return null;
}

function legacyQueryFor(scope, periodKey) {
  // Fallback volontairement minimal : si l'ancien Supabase n'a pas encore toutes les colonnes
  // récentes, on récupère au moins player/pseudo/score sans planter l'API.
  const select = 'select=player_id,pseudo,score,created_at';
  if (scope === 'daily' || scope === 'friends') return `hd_scores?${select}&order=score.desc&limit=200`;
  if (scope === 'week' || scope === 'year') return `hd_scores?${select}&order=score.desc&limit=500`;
  return null;
}
function normalizeScoreRows(rows = []) {
  return (rows || []).map(row => ({
    player_id: row.player_id || row.friend_code || row.pseudo || 'joueur',
    pseudo: row.pseudo || 'Joueur',
    friend_code: cleanFriendCode(row.friend_code || ''),
    score: Number(row.score || 0),
    level: Number(row.level || 1),
    xp: Number(row.xp || 0),
    solved_count: Number(row.solved_count || 0),
    streak: Number(row.streak || 0),
    hints: Number(row.hints || 0),
    tries: Number(row.tries || 1),
    solved_at: row.solved_at || row.created_at || new Date().toISOString()
  }));
}
async function leaderboardSchemaProbe() {
  if (!configured()) return { configured: false, ok: false, mode: 'not-configured' };
  try {
    await request('hd_scores?select=player_id,pseudo,friend_code,score,period_key,scope,solved_at&limit=1');
    return { configured: true, ok: true, mode: 'supabase' };
  } catch (error) {
    return { configured: true, ok: false, mode: 'schema-error', message: 'hd_scores incomplet ou inaccessible' };
  }
}

function isGuestPseudo(value) {
  const n = safeText(value || '', 40).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  return !n || ['invite', 'invité', 'joueur', 'local-player'].includes(n);
}
async function profileMapForRows(rows = []) {
  const ids = Array.from(new Set((rows || []).map(row => safeText(row.player_id || '', 90)).filter(Boolean))).slice(0, 100);
  if (!ids.length || !configured()) return new Map();
  const quoted = ids.map(id => `\"${String(id).replace(/\\/g, '\\\\').replace(/\"/g, '\\"')}\"`).join(',');
  try {
    const profiles = await request(`hd_profiles?select=player_id,pseudo,friend_code,level,xp,solved_count,streak&player_id=in.(${encodeURIComponent(quoted)})`);
    return new Map((profiles || []).map(profile => [profile.player_id, profile]));
  } catch {
    return new Map();
  }
}
function enrichScoreRowsWithProfiles(rows = [], profiles = new Map()) {
  return (rows || []).map(row => {
    const profile = profiles.get(row.player_id);
    if (!profile) return { ...row, friend_code: cleanFriendCode(row.friend_code || '') };
    return {
      ...row,
      pseudo: profile.pseudo || row.pseudo || 'Joueur',
      friend_code: cleanFriendCode(profile.friend_code || row.friend_code || ''),
      level: Math.max(Number(row.level || 1), Number(profile.level || 1)),
      xp: Math.max(Number(row.xp || 0), Number(profile.xp || 0)),
      solved_count: Math.max(Number(row.solved_count || 0), Number(profile.solved_count || 0)),
      streak: Math.max(Number(row.streak || 0), Number(profile.streak || 0))
    };
  });
}
async function profileByFriendCode(friendCode = '') {
  const code = cleanFriendCode(friendCode);
  if (!configured() || !code) return null;
  const suffix = codeSuffix(code);
  const clauses = [`friend_code.eq.${encodeURIComponent(code)}`];
  if (suffix) clauses.push(`friend_code.ilike.${encodeURIComponent(`*-${suffix}`)}`);
  try {
    const rows = await request(`hd_profiles?select=player_id,pseudo,friend_code,level,xp,solved_count,streak&or=(${clauses.join(',')})&limit=1`);
    return rows && rows[0] ? rows[0] : null;
  } catch {
    return null;
  }
}
async function enrichFriendRows(rows = []) {
  const output = [];
  for (const row of rows || []) {
    const profile = row.friend_player_id
      ? (await request(`hd_profiles?select=player_id,pseudo,friend_code,level,xp,solved_count,streak&player_id=eq.${encodeURIComponent(row.friend_player_id)}&limit=1`).catch(() => []))[0]
      : await profileByFriendCode(row.friend_code);
    output.push({
      ...row,
      friend_player_id: profile?.player_id || row.friend_player_id || '',
      friend_code: cleanFriendCode(profile?.friend_code || row.friend_code || ''),
      friend_pseudo: profile?.pseudo || row.friend_pseudo || 'Ami',
      profile_pseudo: profile?.pseudo || row.friend_pseudo || 'Ami',
      level: Number(profile?.level || 1),
      xp: Number(profile?.xp || 0),
      solved_count: Number(profile?.solved_count || 0),
      streak: Number(profile?.streak || 0)
    });
  }
  return output;
}
async function profilePseudoForPlayer(playerId, fallback = '') {
  if (!configured() || !playerId) return safeText(fallback || 'Invité', 32);
  try {
    const rows = await request(`hd_profiles?select=pseudo&player_id=eq.${encodeURIComponent(playerId)}&limit=1`);
    const profilePseudo = rows && rows[0] && rows[0].pseudo;
    if (profilePseudo && !isGuestPseudo(profilePseudo)) return safeText(profilePseudo, 32);
  } catch {}
  return safeText(fallback || 'Invité', 32);
}
async function handleLeaderboard(req, res) {
  const rawScope = Array.isArray(req.query?.scope) ? req.query.scope[0] : req.query?.scope;
  const scope = ['daily', 'week', 'year', 'friends'].includes(rawScope) ? rawScope : 'daily';
  const rawPeriod = Array.isArray(req.query?.periodKey) ? req.query.periodKey[0] : req.query?.periodKey;
  const periodKey = safeText(rawPeriod || todayKey(), 20);
  if (!configured()) return send(res, 200, { ok: true, scope, periodKey, mode: 'local-preview', rows: [], note: 'Classement en ligne non connecté : scores locaux uniquement.' });
  try {
    const path = queryFor(scope, periodKey);
    let rows = path ? await request(path) : [];
    let mode = 'supabase';
    if (!Array.isArray(rows)) rows = [];
    let filtered = normalizeScoreRows(rows);
    if (scope === 'friends') {
      const playerId = safeText(req.query?.playerId || '', 90);
      const friendCodes = String(req.query?.friendCodes || '').split(',').map(cleanFriendCode).filter(Boolean);
      const friendIds = String(req.query?.friendIds || '').split(',').map(v => safeText(v, 90)).filter(Boolean);
      const codeSet = new Set(friendCodes);
      const suffixSet = new Set(friendCodes.map(codeSuffix).filter(Boolean));
      const idSet = new Set(friendIds);
      filtered = filtered.filter(row => row.player_id === playerId || idSet.has(row.player_id) || codeSet.has(cleanFriendCode(row.friend_code)) || suffixSet.has(codeSuffix(row.friend_code)));
    }
    const profiles = await profileMapForRows(filtered);
    const enriched = enrichScoreRowsWithProfiles(filtered, profiles);
    return send(res, 200, { ok: true, scope, periodKey, mode, rows: aggregate(enriched, scope), profileSync: 'enabled' });
  } catch (error) {
    try {
      const fallbackPath = legacyQueryFor(scope, periodKey);
      const fallbackRows = fallbackPath ? await request(fallbackPath) : [];
      return send(res, 200, { ok: true, scope, periodKey, mode: 'supabase-legacy', rows: aggregate(normalizeScoreRows(fallbackRows), scope), note: 'Classement affiché en mode compatibilité. Lance la migration hd_scores beta133 dans Supabase.' });
    } catch (fallbackError) {
      return send(res, 200, { ok: true, scope, periodKey, mode: 'supabase-error', rows: [], note: 'Classement en ligne indisponible : app utilisable en local.', schemaHint: 'Vérifie les colonnes hd_scores : period_key, scope, friend_code, solved_at.' });
    }
  }
}
async function handleSubmit(req, res) {
  if (req.method && req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { ok: false, message: 'POST only' }); }
  const body = readBody(req);
  const score = Math.max(0, Math.min(500, Number(body.score || 0)));
  const playerId = safeText(body.playerId || body.friendCode || 'local-player', 90);
  const incomingPseudo = safeText(body.pseudo || 'Invité', 32);
  const pseudo = isGuestPseudo(incomingPseudo) ? await profilePseudoForPlayer(playerId, incomingPseudo) : incomingPseudo;
  const periodKey = safeText(body.dayKey || todayKey(), 20);
  const payload = {
    player_id: playerId,
    pseudo,
    friend_code: cleanFriendCode(body.friendCode || ''),
    mystery_id: safeText(body.mysteryId || '', 80),
    period_key: periodKey,
    scope: 'daily',
    score,
    hints: Math.max(0, Number(body.hints || 0)),
    tries: Math.max(1, Number(body.tries || 1)),
    difficulty: safeText(body.difficulty || 'moyen', 20),
    level: Math.max(1, Number(body.level || 1)),
    xp: Math.max(0, Number(body.xp || 0)),
    solved_count: Math.max(0, Number(body.solvedCount || 0)),
    streak: Math.max(0, Number(body.streak || 0)),
    solved_at: new Date(Number(body.solvedAt || Date.now())).toISOString()
  };
  if (!configured()) return send(res, 200, { ok: true, stored: false, mode: 'local-preview', message: 'Classement en ligne non connecté : score conservé localement.' });
  try {
    await request('hd_profiles?on_conflict=player_id', { method: 'POST', prefer: 'resolution=merge-duplicates', body: [{
      player_id: payload.player_id,
      pseudo: payload.pseudo,
      friend_code: payload.friend_code,
      level: payload.level,
      xp: payload.xp,
      solved_count: payload.solved_count,
      streak: payload.streak,
      updated_at: new Date().toISOString()
    }] });
    if (payload.player_id && payload.mystery_id && payload.period_key) {
      const deletePath = `hd_scores?player_id=eq.${encodeURIComponent(payload.player_id)}&mystery_id=eq.${encodeURIComponent(payload.mystery_id)}&period_key=eq.${encodeURIComponent(payload.period_key)}&scope=eq.daily`;
      await request(deletePath, { method: 'DELETE', prefer: 'return=minimal' }).catch(() => null);
    }
    const rows = await request('hd_scores', { method: 'POST', body: [payload] });
    return send(res, 200, { ok: true, stored: true, mode: 'supabase', rows, message: 'Score enregistré dans le classement.' });
  } catch (error) {
    try {
      const legacyPayload = { player_id: payload.player_id, pseudo: payload.pseudo, score: payload.score };
      const rows = await request('hd_scores', { method: 'POST', body: [legacyPayload] });
      return send(res, 200, { ok: true, stored: true, mode: 'supabase-legacy', rows, message: 'Score enregistré en mode compatibilité. Lance la migration hd_scores beta133 pour tout fiabiliser.' });
    } catch {
      return send(res, 200, { ok: true, stored: false, mode: 'supabase-error', message: 'Connexion en ligne indisponible : score conservé localement.' });
    }
  }
}
async function syncOwnProfileFromFriendBody(body = {}, playerId = '') {
  const myCode = cleanFriendCode(body.myFriendCode || body.selfFriendCode || '');
  const pseudo = safeText(body.pseudo || body.playerPseudo || 'Invité', 32);
  if (!configured() || !playerId || !myCode) return null;
  const profile = {
    player_id: playerId,
    pseudo,
    friend_code: myCode,
    level: Math.max(1, Number(body.level || 1)),
    xp: Math.max(0, Number(body.xp || 0)),
    solved_count: Math.max(0, Number(body.solvedCount || 0)),
    streak: Math.max(0, Number(body.streak || 0)),
    updated_at: new Date().toISOString()
  };
  await request('hd_profiles?on_conflict=player_id', { method: 'POST', prefer: 'resolution=merge-duplicates,return=representation', body: [profile] });
  return profile;
}

async function acceptedFriendRequestExists(playerId = '', myFriendCode = '', targetPlayerId = '', targetFriendCode = '') {
  const id = safeText(playerId || '', 90);
  const code = cleanFriendCode(myFriendCode || '');
  const targetId = safeText(targetPlayerId || '', 90);
  const targetCode = cleanFriendCode(targetFriendCode || '');
  if (!configured() || (!id && !code) || (!targetId && !targetCode)) return false;
  try {
    const rows = await friendRequestRowsForPlayer(id, code);
    return (rows || []).some(row => {
      if (row.status !== 'accepted') return false;
      const otherId = safeText(row.otherPlayerId || row.requesterPlayerId || row.targetPlayerId || '', 90);
      const otherCode = cleanFriendCode(row.otherFriendCode || row.requesterFriendCode || row.targetFriendCode || '');
      return (targetId && otherId === targetId) || (targetCode && friendCodeMatches(otherCode, targetCode));
    });
  } catch { return false; }
}

async function deleteFriendRowsForPair(playerId = '', myFriendCode = '', targetPlayerId = '', targetFriendCode = '') {
  if (!configured()) return;
  const id = safeText(playerId || '', 90);
  const code = cleanFriendCode(myFriendCode || '');
  const targetId = safeText(targetPlayerId || '', 90);
  const targetCode = cleanFriendCode(targetFriendCode || '');
  const deleteOneWay = async (ownerId, friendId, friendCode) => {
    const owner = safeText(ownerId || '', 90);
    const clauses = [];
    if (friendId) clauses.push(`friend_player_id.eq.${encodeURIComponent(friendId)}`);
    if (friendCode) {
      clauses.push(`friend_code.eq.${encodeURIComponent(friendCode)}`);
      const suffix = codeSuffix(friendCode);
      if (suffix) clauses.push(`friend_code.ilike.${encodeURIComponent(`*-${suffix}`)}`);
    }
    if (!owner || !clauses.length) return;
    await request(`hd_friends?player_id=eq.${encodeURIComponent(owner)}&or=(${clauses.join(',')})`, { method: 'DELETE', prefer: 'return=minimal' }).catch(() => null);
  };
  await deleteOneWay(id, targetId, targetCode);
  if (targetId) await deleteOneWay(targetId, id, code);
}

async function createPendingFriendRequest({ playerId = '', myFriendCode = '', pseudo = 'Joueur', targetPlayerId = '', targetFriendCode = '', targetPseudo = 'Joueur' } = {}) {
  const requesterId = safeText(playerId || '', 90);
  const requesterCode = cleanFriendCode(myFriendCode || '');
  const targetId = safeText(targetPlayerId || '', 90);
  const targetCode = cleanFriendCode(targetFriendCode || '');
  if (!configured() || !requesterId || (!targetId && !targetCode)) return false;
  const suffix = codeSuffix(targetCode);
  const deleteClauses = [];
  if (targetId) deleteClauses.push(`target_player_id.eq.${encodeURIComponent(targetId)}`);
  if (targetCode) deleteClauses.push(`target_friend_code.eq.${encodeURIComponent(targetCode)}`);
  if (suffix) deleteClauses.push(`target_friend_code.ilike.${encodeURIComponent(`*-${suffix}`)}`);
  if (deleteClauses.length) await request(`hd_friend_requests?requester_player_id=eq.${encodeURIComponent(requesterId)}&status=eq.pending&or=(${deleteClauses.join(',')})`, { method: 'DELETE', prefer: 'return=minimal' }).catch(() => null);
  const payload = {
    requester_player_id: requesterId,
    requester_friend_code: requesterCode,
    requester_pseudo: safeText(pseudo || 'Joueur', 32),
    target_player_id: targetId || null,
    target_friend_code: targetCode,
    target_pseudo: safeText(targetPseudo || 'Joueur', 32),
    status: 'pending',
    updated_at: new Date().toISOString()
  };
  await request('hd_friend_requests', { method: 'POST', body: [payload] });
  return true;
}

async function handleFriends(req, res) {
  const body = readBody(req);
  const method = req.method || 'GET';
  const playerId = safeText(body.playerId || req.query?.playerId || '', 90);
  if (!configured()) return send(res, 200, { ok: true, mode: 'local-preview', friends: [], features: requestFeatureFlags(), message: 'Amis conservés sur cet appareil. La synchronisation en ligne s’activera quand le service sera branché.' });
  try {
    if (method === 'POST') {
      await syncOwnProfileFromFriendBody(body, playerId).catch(() => null);
      const inputCode = cleanFriendCode(body.friendCode || '');
      const myCode = cleanFriendCode(body.myFriendCode || body.selfFriendCode || '');
      const profile = await profileByFriendCode(inputCode);
      const targetPlayerId = safeText(profile?.player_id || body.friendPlayerId || body.targetPlayerId || '', 90);
      const targetCode = cleanFriendCode(profile?.friend_code || inputCode);
      const targetPseudo = safeText(profile?.pseudo || body.friendPseudo || 'Joueur', 32);
      if (!playerId || (!targetPlayerId && !targetCode)) return send(res, 400, { ok: false, message: 'playerId et ami requis' });
      if (friendCodeMatches(targetCode, myCode) || (targetPlayerId && targetPlayerId === playerId)) return send(res, 400, { ok: false, message: 'Impossible de s’ajouter soi-même.' });
      const accepted = await acceptedFriendRequestExists(playerId, myCode, targetPlayerId, targetCode);
      if (!accepted) await deleteFriendRowsForPair(playerId, myCode, targetPlayerId, targetCode);
      if (!accepted) {
        await createPendingFriendRequest({
          playerId,
          myFriendCode: myCode,
          pseudo: safeText(body.pseudo || body.playerPseudo || 'Joueur', 32),
          targetPlayerId,
          targetFriendCode: targetCode,
          targetPseudo
        });
      }
    } else if (method === 'DELETE') {
      const targetCode = cleanFriendCode(body.friendCode || req.query?.friendCode || '');
      const targetId = safeText(body.friendPlayerId || req.query?.friendPlayerId || '', 90);
      if (!playerId || (!targetCode && !targetId)) return send(res, 400, { ok: false, message: 'playerId et ami requis' });
      const clauses = [];
      if (targetCode) {
        clauses.push(`friend_code.eq.${encodeURIComponent(targetCode)}`);
        const suffix = codeSuffix(targetCode);
        if (suffix) clauses.push(`friend_code.ilike.${encodeURIComponent(`*-${suffix}`)}`);
      }
      if (targetId) clauses.push(`friend_player_id.eq.${encodeURIComponent(targetId)}`);
      const deletePath = `hd_friends?player_id=eq.${encodeURIComponent(playerId)}&or=(${clauses.join(',')})`;
      await request(deletePath, { method: 'DELETE', prefer: 'return=minimal' });
      const myCode = cleanFriendCode(body.myFriendCode || req.query?.myFriendCode || '');
      if (targetId) {
        const reciprocalClauses = [];
        reciprocalClauses.push(`friend_player_id.eq.${encodeURIComponent(playerId)}`);
        if (myCode) {
          reciprocalClauses.push(`friend_code.eq.${encodeURIComponent(myCode)}`);
          const mySuffix = codeSuffix(myCode);
          if (mySuffix) reciprocalClauses.push(`friend_code.ilike.${encodeURIComponent(`*-${mySuffix}`)}`);
        }
        await request(`hd_friends?player_id=eq.${encodeURIComponent(targetId)}&or=(${reciprocalClauses.join(',')})`, { method: 'DELETE', prefer: 'return=minimal' }).catch(() => null);
      }
    } else if (method !== 'GET') {
      res.setHeader('Allow', 'GET, POST, DELETE');
      return send(res, 405, { ok: false, message: 'Méthode non autorisée' });
    }
    const rows = playerId ? await request(`hd_friends?select=friend_player_id,friend_code,friend_pseudo,created_at&player_id=eq.${encodeURIComponent(playerId)}&order=created_at.desc`) : [];
    const enriched = await enrichFriendRows(rows || []);
    return send(res, 200, { ok: true, mode: 'supabase', stored: true, friends: enriched, features: { ...requestFeatureFlags(), profileRefresh: true, selfProfileUpsert: true } });
  } catch (error) {
    return send(res, 200, { ok: true, mode: 'supabase-error', stored: false, friends: [], message: 'Connexion amis indisponible : la liste locale reste utilisable.' });
  }
}

function requestFeatureFlags() {
  return { addByCode: true, removeByCode: true, profiles: true, leaderboards: true, chat: false, inviteLinks: true, friendRequests: true, requestValidation: true, profileLookup: true, requestBadges: true, duplicateGuard: true, cancelRequests: true, reciprocalRemove: true, localOutbox: true, scoreOutbox: true, identityMirror: true, offlineScoreRetry: true };
}
async function profileByPlayerId(playerId = '') {
  const id = safeText(playerId || '', 90);
  if (!configured() || !id) return null;
  try {
    const rows = await request(`hd_profiles?select=player_id,pseudo,friend_code,level,xp,solved_count,streak&player_id=eq.${encodeURIComponent(id)}&limit=1`);
    return rows && rows[0] ? rows[0] : null;
  } catch { return null; }
}
function cleanRequestRow(row = {}, viewerPlayerId = '', viewerFriendCode = '') {
  const myId = safeText(viewerPlayerId || '', 90);
  const myCode = cleanFriendCode(viewerFriendCode || '');
  const requesterCode = cleanFriendCode(row.requester_friend_code || '');
  const targetCode = cleanFriendCode(row.target_friend_code || '');
  const incoming = Boolean((row.target_player_id && row.target_player_id === myId) || (myCode && friendCodeMatches(targetCode, myCode)));
  const otherCode = incoming ? requesterCode : targetCode;
  const otherPlayerId = incoming ? row.requester_player_id : row.target_player_id;
  const otherPseudo = incoming ? row.requester_pseudo : row.target_pseudo;
  return {
    id: `${safeText(row.requester_player_id || requesterCode, 90)}__${safeText(row.target_player_id || targetCode, 90)}__${safeText(row.status || 'pending', 16)}`,
    direction: incoming ? 'incoming' : 'outgoing',
    status: safeText(row.status || 'pending', 20),
    requesterPlayerId: safeText(row.requester_player_id || '', 90),
    requesterFriendCode: requesterCode,
    requesterPseudo: safeText(row.requester_pseudo || 'Joueur', 32),
    targetPlayerId: safeText(row.target_player_id || '', 90),
    targetFriendCode: targetCode,
    targetPseudo: safeText(row.target_pseudo || 'Joueur', 32),
    otherPlayerId: safeText(otherPlayerId || '', 90),
    otherFriendCode: otherCode,
    otherPseudo: safeText(otherPseudo || 'Joueur', 32),
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null
  };
}
async function friendRequestRowsForPlayer(playerId = '', friendCode = '') {
  const id = safeText(playerId || '', 90);
  const code = cleanFriendCode(friendCode || '');
  if (!configured() || (!id && !code)) return [];
  const clauses = [];
  if (id) {
    clauses.push(`requester_player_id.eq.${encodeURIComponent(id)}`);
    clauses.push(`target_player_id.eq.${encodeURIComponent(id)}`);
  }
  if (code) {
    clauses.push(`requester_friend_code.eq.${encodeURIComponent(code)}`);
    clauses.push(`target_friend_code.eq.${encodeURIComponent(code)}`);
    const suffix = codeSuffix(code);
    if (suffix) {
      clauses.push(`requester_friend_code.ilike.${encodeURIComponent(`*-${suffix}`)}`);
      clauses.push(`target_friend_code.ilike.${encodeURIComponent(`*-${suffix}`)}`);
    }
  }
  const select = 'requester_player_id,requester_friend_code,requester_pseudo,target_player_id,target_friend_code,target_pseudo,status,created_at,updated_at';
  const rows = await request(`hd_friend_requests?select=${select}&or=(${clauses.join(',')})&order=created_at.desc&limit=80`);
  return (rows || []).map(row => cleanRequestRow(row, id, code));
}
function splitRequestsForClient(rows = []) {
  const pending = rows.filter(row => row.status === 'pending');
  return {
    incoming: pending.filter(row => row.direction === 'incoming'),
    outgoing: pending.filter(row => row.direction === 'outgoing'),
    history: rows.filter(row => row.status !== 'pending').slice(0, 20)
  };
}
async function currentFriendRows(playerId = '') {
  const id = safeText(playerId || '', 90);
  if (!id || !configured()) return [];
  const rows = await request(`hd_friends?select=friend_player_id,friend_code,friend_pseudo,created_at&player_id=eq.${encodeURIComponent(id)}&order=created_at.desc`);
  return enrichFriendRows(rows || []);
}
async function upsertFriendPair(a = {}, b = {}) {
  if (!configured()) return;
  const leftId = safeText(a.playerId || '', 90);
  const rightId = safeText(b.playerId || '', 90);
  const leftCode = cleanFriendCode(a.friendCode || '');
  const rightCode = cleanFriendCode(b.friendCode || '');
  if (!leftId || !rightCode) return;
  const rowA = {
    player_id: leftId,
    friend_player_id: rightId || null,
    friend_code: rightCode,
    friend_pseudo: safeText(b.pseudo || 'Ami', 32)
  };
  await request('hd_friends?on_conflict=player_id,friend_code', { method: 'POST', prefer: 'resolution=merge-duplicates,return=representation', body: [rowA] });
  if (rightId && leftCode) {
    const rowB = {
      player_id: rightId,
      friend_player_id: leftId,
      friend_code: leftCode,
      friend_pseudo: safeText(a.pseudo || 'Ami', 32)
    };
    await request('hd_friends?on_conflict=player_id,friend_code', { method: 'POST', prefer: 'resolution=merge-duplicates,return=representation', body: [rowB] });
  }
}

async function latestScoresForPlayer(playerId = '') {
  const id = safeText(playerId || '', 90);
  if (!id || !configured()) return { daily: 0, week: 0, year: 0 };
  try {
    const select = 'score,solved_at,period_key';
    const yearRows = await request(`hd_scores?select=${select}&player_id=eq.${encodeURIComponent(id)}&scope=eq.daily&solved_at=gte.${encodeURIComponent(startOfYear())}&limit=1000`).catch(() => []);
    const today = todayKey();
    const weekStart = new Date(startOfWeekISO()).getTime();
    let daily = 0, week = 0, year = 0;
    for (const row of yearRows || []) {
      const score = Number(row.score || 0);
      year += score;
      if (row.period_key === today) daily += score;
      const at = Date.parse(row.solved_at || '');
      if (Number.isFinite(at) && at >= weekStart) week += score;
    }
    return { daily, week, year };
  } catch { return { daily: 0, week: 0, year: 0 }; }
}
async function handlePublicProfile(req, res) {
  const playerId = safeText(req.query?.playerId || req.body?.playerId || '', 90);
  const friendCode = cleanFriendCode(req.query?.friendCode || req.body?.friendCode || '');
  if (!configured()) return send(res, 200, { ok: true, mode: 'local-preview', profile: null, message: 'Profil en ligne non connecté.' });
  try {
    const profile = playerId ? await profileByPlayerId(playerId) : await profileByFriendCode(friendCode);
    if (!profile) return send(res, 200, { ok: true, mode: 'supabase', profile: null, message: 'Profil non trouvé.' });
    const scores = await latestScoresForPlayer(profile.player_id).catch(() => ({ daily: 0, week: 0, year: 0 }));
    const viewerPlayerId = safeText(req.query?.viewerPlayerId || req.body?.viewerPlayerId || '', 90);
    const viewerFriendCode = cleanFriendCode(req.query?.viewerFriendCode || req.body?.viewerFriendCode || '');
    let relationship = { self: false, friend: false, incomingRequest: false, outgoingRequest: false };
    if (viewerPlayerId || viewerFriendCode) {
      relationship.self = Boolean((viewerPlayerId && viewerPlayerId === profile.player_id) || (viewerFriendCode && friendCodeMatches(viewerFriendCode, profile.friend_code)));
      if (!relationship.self && viewerPlayerId) {
        const friendRows = await currentFriendRows(viewerPlayerId).catch(() => []);
        relationship.friend = friendRows.some(friend => {
          const fid = safeText(friend.friend_player_id || friend.playerId || '', 90);
          const fcode = cleanFriendCode(friend.friend_code || friend.friendCode || friend.code || '');
          return (fid && fid === profile.player_id) || (fcode && friendCodeMatches(fcode, profile.friend_code));
        });
      }
      if (!relationship.self && !relationship.friend) {
        const reqRows = await friendRequestRowsForPlayer(viewerPlayerId, viewerFriendCode).catch(() => []);
        relationship.incomingRequest = reqRows.some(row => row.status === 'pending' && row.direction === 'incoming' && ((row.otherPlayerId && row.otherPlayerId === profile.player_id) || friendCodeMatches(row.otherFriendCode, profile.friend_code)));
        relationship.outgoingRequest = reqRows.some(row => row.status === 'pending' && row.direction === 'outgoing' && ((row.otherPlayerId && row.otherPlayerId === profile.player_id) || friendCodeMatches(row.otherFriendCode, profile.friend_code)));
      }
    }
    return send(res, 200, { ok: true, mode: 'supabase', relationship, profile: {
      playerId: safeText(profile.player_id || '', 90),
      id: safeText(profile.player_id || '', 90),
      name: safeText(profile.pseudo || 'Joueur', 32),
      pseudo: safeText(profile.pseudo || 'Joueur', 32),
      friendCode: cleanFriendCode(profile.friend_code || ''),
      code: cleanFriendCode(profile.friend_code || ''),
      level: Number(profile.level || 1),
      xp: Number(profile.xp || 0),
      solved: Number(profile.solved_count || 0),
      solved_count: Number(profile.solved_count || 0),
      streak: Number(profile.streak || 0),
      daily: Number(scores.daily || 0),
      week: Number(scores.week || 0),
      year: Number(scores.year || 0),
      server: true
    }, features: requestFeatureFlags() });
  } catch (error) {
    return send(res, 200, { ok: true, mode: 'supabase-error', profile: null, message: 'Profil en ligne indisponible.' });
  }
}
async function handleFriendRequests(req, res) {
  const body = readBody(req);
  const method = req.method || 'GET';
  const playerId = safeText(body.playerId || req.query?.playerId || '', 90);
  const myFriendCode = cleanFriendCode(body.myFriendCode || body.friendCodeSelf || req.query?.friendCode || '');
  if (!configured()) return send(res, 200, { ok: true, mode: 'local-preview', requests: { incoming: [], outgoing: [], history: [] }, features: requestFeatureFlags(), message: 'Demandes conservées localement tant que le service en ligne n’est pas branché.' });
  try {
    if (method === 'POST') {
      await syncOwnProfileFromFriendBody(body, playerId).catch(() => null);
      const targetPlayerIdRaw = safeText(body.targetPlayerId || body.friendPlayerId || '', 90);
      const inputCode = cleanFriendCode(body.targetFriendCode || body.friendCode || '');
      const targetProfile = targetPlayerIdRaw ? await profileByPlayerId(targetPlayerIdRaw) : await profileByFriendCode(inputCode);
      const targetPlayerId = safeText(targetProfile?.player_id || targetPlayerIdRaw || '', 90);
      const targetCode = cleanFriendCode(targetProfile?.friend_code || inputCode || '');
      const targetPseudo = safeText(targetProfile?.pseudo || body.targetPseudo || body.friendPseudo || 'Joueur', 32);
      const requesterPseudo = safeText(body.pseudo || body.playerPseudo || 'Joueur', 32);
      if (!playerId || (!targetPlayerId && !targetCode)) return send(res, 400, { ok: false, message: 'Profil cible introuvable.' });
      if ((targetPlayerId && targetPlayerId === playerId) || friendCodeMatches(targetCode, myFriendCode)) return send(res, 400, { ok: false, message: 'Impossible de t’envoyer une demande à toi-même.' });
      const existingFriends = await currentFriendRows(playerId).catch(() => []);
      const alreadyFriend = existingFriends.some(friend => {
        const friendId = safeText(friend.friend_player_id || friend.player_id || '', 90);
        const friendCode = cleanFriendCode(friend.friend_code || friend.friendCode || '');
        return (targetPlayerId && friendId === targetPlayerId) || (targetCode && friendCodeMatches(friendCode, targetCode));
      });
      if (alreadyFriend) {
        const accepted = await acceptedFriendRequestExists(playerId, myFriendCode, targetPlayerId, targetCode);
        if (accepted) {
          const rows = await friendRequestRowsForPlayer(playerId, myFriendCode);
          return send(res, 200, { ok: true, mode: 'supabase', stored: true, alreadyFriend: true, requests: splitRequestsForClient(rows), friends: existingFriends, features: requestFeatureFlags(), message: `${targetPseudo} est déjà dans tes amis.` });
        }
        await deleteFriendRowsForPair(playerId, myFriendCode, targetPlayerId, targetCode);
      }
      await createPendingFriendRequest({
        playerId,
        myFriendCode,
        pseudo: requesterPseudo,
        targetPlayerId,
        targetFriendCode: targetCode,
        targetPseudo
      });
    } else if (method === 'DELETE') {
      const targetPlayerId = safeText(body.targetPlayerId || body.friendPlayerId || req.query?.targetPlayerId || req.query?.friendPlayerId || '', 90);
      const targetCode = cleanFriendCode(body.targetFriendCode || body.friendCode || req.query?.targetFriendCode || req.query?.friendCode || '');
      if (!playerId || (!targetPlayerId && !targetCode)) return send(res, 400, { ok: false, message: 'Demande à annuler introuvable.' });
      const deleteClauses = [];
      if (targetPlayerId) deleteClauses.push(`target_player_id.eq.${encodeURIComponent(targetPlayerId)}`);
      if (targetCode) {
        deleteClauses.push(`target_friend_code.eq.${encodeURIComponent(targetCode)}`);
        const suffix = codeSuffix(targetCode);
        if (suffix) deleteClauses.push(`target_friend_code.ilike.${encodeURIComponent(`*-${suffix}`)}`);
      }
      await request(`hd_friend_requests?requester_player_id=eq.${encodeURIComponent(playerId)}&status=eq.pending&or=(${deleteClauses.join(',')})`, { method: 'DELETE', prefer: 'return=minimal' });
    } else if (method !== 'GET') {
      res.setHeader('Allow', 'GET, POST, DELETE');
      return send(res, 405, { ok: false, message: 'Méthode non autorisée' });
    }
    const rows = await friendRequestRowsForPlayer(playerId, myFriendCode);
    return send(res, 200, { ok: true, mode: 'supabase', stored: true, requests: splitRequestsForClient(rows), features: requestFeatureFlags() });
  } catch (error) {
    return send(res, 200, { ok: true, mode: 'supabase-error', stored: false, requests: { incoming: [], outgoing: [], history: [] }, features: requestFeatureFlags(), message: 'Demandes d’amis indisponibles : vérifie la table hd_friend_requests.' });
  }
}
async function handleFriendRequestRespond(req, res) {
  if (req.method && req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { ok: false, message: 'POST only' }); }
  const body = readBody(req);
  const playerId = safeText(body.playerId || '', 90);
  const myFriendCode = cleanFriendCode(body.myFriendCode || body.friendCodeSelf || '');
  const response = safeText(body.response || body.status || '', 20) === 'accept' ? 'accepted' : 'declined';
  const requesterPlayerId = safeText(body.requesterPlayerId || body.otherPlayerId || '', 90);
  const requesterFriendCode = cleanFriendCode(body.requesterFriendCode || body.otherFriendCode || '');
  if (!configured()) return send(res, 200, { ok: true, mode: 'local-preview', stored: false, requests: { incoming: [], outgoing: [], history: [] }, friends: [], message: 'Validation locale seulement : service en ligne non branché.' });
  try {
    await syncOwnProfileFromFriendBody(body, playerId).catch(() => null);
    const requesterProfile = requesterPlayerId ? await profileByPlayerId(requesterPlayerId) : await profileByFriendCode(requesterFriendCode);
    const meProfile = await profileByPlayerId(playerId);
    const requester = {
      playerId: safeText(requesterProfile?.player_id || requesterPlayerId || '', 90),
      friendCode: cleanFriendCode(requesterProfile?.friend_code || requesterFriendCode || ''),
      pseudo: safeText(requesterProfile?.pseudo || body.requesterPseudo || body.otherPseudo || 'Joueur', 32)
    };
    const me = {
      playerId,
      friendCode: cleanFriendCode(meProfile?.friend_code || myFriendCode || ''),
      pseudo: safeText(meProfile?.pseudo || body.pseudo || 'Joueur', 32)
    };
    const clauses = [];
    if (requester.playerId) clauses.push(`requester_player_id.eq.${encodeURIComponent(requester.playerId)}`);
    if (requester.friendCode) {
      clauses.push(`requester_friend_code.eq.${encodeURIComponent(requester.friendCode)}`);
      const suffix = codeSuffix(requester.friendCode);
      if (suffix) clauses.push(`requester_friend_code.ilike.${encodeURIComponent(`*-${suffix}`)}`);
    }
    const targetClauses = [];
    if (playerId) targetClauses.push(`target_player_id.eq.${encodeURIComponent(playerId)}`);
    if (me.friendCode) {
      targetClauses.push(`target_friend_code.eq.${encodeURIComponent(me.friendCode)}`);
      const suffix = codeSuffix(me.friendCode);
      if (suffix) targetClauses.push(`target_friend_code.ilike.${encodeURIComponent(`*-${suffix}`)}`);
    }
    if (!clauses.length || !targetClauses.length) return send(res, 400, { ok: false, message: 'Demande introuvable.' });
    let updateBase = `hd_friend_requests?status=eq.pending`;
    if (requester.playerId) updateBase += `&requester_player_id=eq.${encodeURIComponent(requester.playerId)}`;
    else if (requester.friendCode) updateBase += `&requester_friend_code=eq.${encodeURIComponent(requester.friendCode)}`;
    updateBase += `&or=(${targetClauses.join(',')})`;
    await request(updateBase, { method: 'PATCH', prefer: 'return=minimal', body: { status: response, updated_at: new Date().toISOString() } });
    if (response === 'accepted') await upsertFriendPair(me, requester);
    const rows = await friendRequestRowsForPlayer(playerId, me.friendCode);
    const friends = await currentFriendRows(playerId).catch(() => []);
    return send(res, 200, { ok: true, mode: 'supabase', stored: true, response, requests: splitRequestsForClient(rows), friends, features: requestFeatureFlags(), message: response === 'accepted' ? 'Demande acceptée.' : 'Demande refusée.' });
  } catch (error) {
    return send(res, 200, { ok: true, mode: 'supabase-error', stored: false, requests: { incoming: [], outgoing: [], history: [] }, friends: [], message: 'Impossible de traiter la demande pour le moment.' });
  }
}

async function handleMe(req, res) {
  if (req.method === 'POST') {
    const body = readBody(req);
    const profile = {
      player_id: safeText(body.playerId || body.friendCode || 'local-player', 90),
      pseudo: safeText(body.pseudo || 'Invité', 32),
      friend_code: cleanFriendCode(body.friendCode || ''),
      level: Math.max(1, Number(body.level || 1)),
      xp: Math.max(0, Number(body.xp || 0)),
      solved_count: Math.max(0, Number(body.solvedCount || 0)),
      streak: Math.max(0, Number(body.streak || 0)),
      updated_at: new Date().toISOString()
    };
    if (!configured()) return send(res, 200, { ok: true, stored: false, mode: 'local-profile', version: VERSION, profile });
    try {
      const rows = await request('hd_profiles?on_conflict=player_id', { method: 'POST', prefer: 'resolution=merge-duplicates', body: [profile] });
      return send(res, 200, { ok: true, stored: true, mode: 'supabase', version: VERSION, rows, profile });
    } catch (error) {
      return send(res, 200, { ok: true, stored: false, mode: 'supabase-error', version: VERSION, message: 'Profil conservé localement pour le moment.', profile });
    }
  }
  return send(res, 200, { ok: true, version: VERSION, mode: configured() ? 'server-ready' : 'local-profile', profile: { pseudo: 'Invité', level: 1, xp: 0, gems: 12, streak: 0, features: ['friends','leaderboards','public_profiles','invite_links','no_chat','profile_save'] } });
}
async function handleReset(req, res) {
  if (req.method && req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { ok: false, message: 'POST only' }); }
  const body = readBody(req);
  const playerId = safeText(body.playerId || '', 90);
  const periodKey = safeText(body.periodKey || todayKey(), 20);
  const mysteryId = safeText(body.mysteryId || '', 80);
  const clear = safeText(body.clear || 'today', 20);
  if (!playerId) return send(res, 400, { ok: false, message: 'playerId requis' });
  if (!configured()) return send(res, 200, { ok: true, stored: false, mode: 'local-preview', message: 'Connexion en ligne inactive : reset local uniquement.' });
  try {
    let path = `hd_scores?player_id=eq.${encodeURIComponent(playerId)}`;
    if (clear === 'today') path += `&period_key=eq.${encodeURIComponent(periodKey)}`;
    if (mysteryId) path += `&mystery_id=eq.${encodeURIComponent(mysteryId)}`;
    await request(path, { method: 'DELETE', prefer: 'return=minimal' });
    return send(res, 200, { ok: true, mode: 'supabase', cleared: clear, periodKey, message: clear === 'today' ? 'Score en ligne du jour effacé.' : 'Scores en ligne effacés.' });
  } catch (error) {
    return send(res, 200, { ok: false, mode: 'supabase-error', message: 'Impossible de réinitialiser le score en ligne.' });
  }
}
function handleDailyMystery(req, res) {
  const m = dailyMystery();
  return send(res, 200, { ok: true, mystery: { id: m.id, difficulty: m.difficulty, caseTitle: m.caseTitle || 'Sujet à identifier', prompt: m.prompt, lessonId: m.lessonId, clueCount: Math.min(3, (m.clues || []).length), reward: { dailyGems: 1, archiveUnlockCost: 2, streakBonusEvery: 7 } } });
}
function handleHint(req, res) {
  const m = dailyMystery();
  const raw = Number((req.query && req.query.index) || 0);
  const index = Math.max(0, Math.min(Math.floor(Number.isFinite(raw) ? raw : 0), Math.min(3, (m.clues || []).length) - 1));
  return send(res, 200, { ok: true, index, hint: (m.clues || [])[index] || null, clueCount: Math.min(3, (m.clues || []).length) });
}
function handleGuess(req, res) {
  const m = dailyMystery();
  const guess = req.body && req.body.guess;
  const correct = accepted(guess, m);
  return send(res, 200, { ok: true, correct, hintAutoRevealed: false, feedback: correct ? undefined : feedback(guess, m), answer: correct ? m.answer : undefined, explanation: correct ? m.explanation : undefined });
}
async function handleHealth(req, res) {
  const probe = await leaderboardSchemaProbe();
  return send(res, 200, {
    ok: true,
    app: 'HistoDaily',
    version: VERSION,
    target: 'vercel',
    deployment: {
      apiMode: 'catch-all-router',
      exposedRoutes: 14,
      onlineSyncOptional: true,
      onlineMultiplayerReady: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
      leaderboardReady: Boolean(probe.ok),
      leaderboardMode: probe.mode,
      schemaMessage: probe.message || ''
    },
    content: {
      readyCourses: 42,
      publicMysteries: mysteries.length,
      dailyRewardGems: 1,
      archiveDaysVisible: 7
    },
    features: ['daily-mystery', 'course-flow', 'leaderboards', 'friends', 'friend-requests', 'public-profiles', 'profile-lookup', 'request-badges', 'local-backup', 'pwa', 'offline-score-outbox', 'identity-mirror', 'profile-tap-fix-mode']
  });
}

async function handleRoute(req, res, route) {
  try {
    if (route === 'health') return await handleHealth(req, res);
    if (route === 'index') return send(res, 200, { ok: true, api: 'HistoDaily', version: VERSION, routes: ['health','me','daily-mystery','daily-mystery/guess','daily-mystery/hint','leaderboard/daily','leaderboard/submit','friends/sync','friends/requests','friends/request','friends/request/respond','friends/profile','progress/reset'] });
    if (route === 'me') return handleMe(req, res);
    if (route === 'daily-mystery') return handleDailyMystery(req, res);
    if (route === 'daily-mystery/start') return send(res, 200, { ok: true, startedAt: new Date().toISOString() });
    if (route === 'daily-mystery/hint') return handleHint(req, res);
    if (route === 'daily-mystery/guess') return handleGuess(req, res);
    if (route === 'leaderboard/daily') return handleLeaderboard(req, res);
    if (route === 'leaderboard/submit') return handleSubmit(req, res);
    if (route === 'friends/sync') return handleFriends(req, res);
    if (route === 'friends/requests' || route === 'friends/request') return handleFriendRequests(req, res);
    if (route === 'friends/request/respond') return handleFriendRequestRespond(req, res);
    if (route === 'friends/profile') return handlePublicProfile(req, res);
    if (route === 'progress/reset') return handleReset(req, res);
    return send(res, 404, { ok: false, message: 'Route API inconnue', route, version: VERSION });
  } catch (error) {
    return send(res, 500, { ok: false, message: 'Erreur API HistoDaily', route, version: VERSION });
  }
}

async function handleRequest(req, res) {
  return handleRoute(req, res, routeFromReq(req));
}

module.exports = { handleRoute, handleRequest, VERSION };
