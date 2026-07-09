const { mysteries, dailyMystery } = require('./hd-data');
const { configured, request, safeText, todayKey } = require('./hd-supabase');

const VERSION = '1.0.0-beta.165';

function send(res, status, payload) {
  try {
    res.setHeader?.('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.setHeader?.('Pragma', 'no-cache');
    res.setHeader?.('X-HistoDaily-Version', VERSION);
  } catch {}
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
    const stableFriendCode = cleanFriendCode(row.friend_code || '');
    const id = stableFriendCode || row.player_id || row.pseudo;
    if (!id) continue;
    const existing = map.get(id) || {
      id,
      player_id: row.player_id || '',
      friend_code: stableFriendCode,
      friendCode: stableFriendCode,
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
  let playerId = safeText(body.playerId || body.friendCode || 'local-player', 90);
  let friendCode = cleanFriendCode(body.friendCode || body.myFriendCode || '');
  let canonical = null;

  // beta145: un score ne doit pas créer un profil fantôme si le code ami existe déjà.
  // On rattache d'abord le score au profil canonique reconnu par Supabase.
  if (configured()) {
    canonical = await beta142CanonicalProfileFromBody({
      ...body,
      playerId,
      friendCode,
      myFriendCode: friendCode
    }).catch(() => null);
    if (canonical) {
      playerId = safeText(canonical.canonicalPlayerId || canonical.profile?.player_id || playerId, 90);
      friendCode = cleanFriendCode(canonical.canonicalFriendCode || canonical.profile?.friend_code || friendCode);
      body.playerId = playerId;
      body.friendCode = friendCode;
    }
  }

  const incomingPseudo = safeText(body.pseudo || 'Invité', 32);
  const canonicalPseudo = safeText(canonical?.canonicalPseudo || canonical?.profile?.pseudo || '', 32);
  const pseudo = canonicalPseudo && !isGuestPseudo(canonicalPseudo)
    ? canonicalPseudo
    : (isGuestPseudo(incomingPseudo) ? await profilePseudoForPlayer(playerId, incomingPseudo) : incomingPseudo);
  const periodKey = safeText(body.dayKey || todayKey(), 20);
  const payload = {
    player_id: playerId,
    pseudo,
    friend_code: friendCode,
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
    const deletes = [];
    if (payload.player_id && payload.mystery_id && payload.period_key) {
      deletes.push(`hd_scores?player_id=eq.${encodeURIComponent(payload.player_id)}&mystery_id=eq.${encodeURIComponent(payload.mystery_id)}&period_key=eq.${encodeURIComponent(payload.period_key)}&scope=eq.daily`);
    }
    if (payload.friend_code && payload.mystery_id && payload.period_key) {
      deletes.push(`hd_scores?friend_code=eq.${encodeURIComponent(payload.friend_code)}&mystery_id=eq.${encodeURIComponent(payload.mystery_id)}&period_key=eq.${encodeURIComponent(payload.period_key)}&scope=eq.daily`);
    }
    await Promise.allSettled(Array.from(new Set(deletes)).map(path => request(path, { method: 'DELETE', prefer: 'return=minimal' })));
    const rows = await request('hd_scores', { method: 'POST', body: [payload] });
    return send(res, 200, { ok: true, stored: true, mode: 'supabase', rows, canonicalPlayerId: playerId, canonicalFriendCode: friendCode, message: 'Score enregistré dans le classement.' });
  } catch (error) {
    try {
      const legacyPayload = { player_id: payload.player_id, pseudo: payload.pseudo, score: payload.score };
      const rows = await request('hd_scores', { method: 'POST', body: [legacyPayload] });
      return send(res, 200, { ok: true, stored: true, mode: 'supabase-legacy', rows, canonicalPlayerId: playerId, canonicalFriendCode: friendCode, message: 'Score enregistré en mode compatibilité. Lance la migration hd_scores beta133 pour tout fiabiliser.' });
    } catch {
      return send(res, 200, { ok: true, stored: false, mode: 'supabase-error', message: 'Connexion en ligne indisponible : score conservé localement.' });
    }
  }
}
async function syncOwnProfileFromFriendBody(body = {}, playerId = '') {
  // beta143: toutes les routes sociales passent par l'identité canonique.
  // Le front peut envoyer un ancien player_id après une mise à jour/cache mobile :
  // on rattache alors la requête au profil Supabase identifié par le friend_code.
  const myCode = cleanFriendCode(body.myFriendCode || body.selfFriendCode || body.friendCodeSelf || '');
  const incomingId = safeText(playerId || body.playerId || '', 90);
  if (!configured() || !incomingId || !myCode) return null;
  const canonical = await beta142CanonicalProfileFromBody({
    ...body,
    playerId: incomingId,
    friendCode: myCode,
    myFriendCode: myCode
  }).catch(() => null);
  if (!canonical) return null;
  if (canonical.canonicalPlayerId) {
    body.playerId = canonical.canonicalPlayerId;
    body.canonicalPlayerId = canonical.canonicalPlayerId;
  }
  if (canonical.canonicalFriendCode) {
    body.myFriendCode = canonical.canonicalFriendCode;
    body.friendCodeSelf = canonical.canonicalFriendCode;
    body.selfFriendCode = canonical.canonicalFriendCode;
  }
  if (canonical.canonicalPseudo) body.pseudo = canonical.canonicalPseudo;
  return canonical.profile || null;
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



async function cancelPendingFriendRequest({ playerId = '', myFriendCode = '', requestId = '', targetPlayerId = '', targetFriendCode = '' } = {}) {
  const requesterId = safeText(playerId || '', 90);
  const requesterCode = cleanFriendCode(myFriendCode || '');
  const targetId = safeText(targetPlayerId || '', 90);
  const targetCode = cleanFriendCode(targetFriendCode || '');
  const reqId = safeText(requestId || '', 32).replace(/[^0-9]/g, '');
  if (!configured() || !requesterId) return false;
  const deleteQueries = [];
  if (reqId) {
    deleteQueries.push(`hd_friend_requests?id=eq.${encodeURIComponent(reqId)}&requester_player_id=eq.${encodeURIComponent(requesterId)}&status=eq.pending`);
  }
  const clauses = [];
  if (targetId) clauses.push(`target_player_id.eq.${encodeURIComponent(targetId)}`);
  if (targetCode) {
    clauses.push(`target_friend_code.eq.${encodeURIComponent(targetCode)}`);
    const suffix = codeSuffix(targetCode);
    if (suffix) clauses.push(`target_friend_code.ilike.${encodeURIComponent(`*-${suffix}`)}`);
  }
  if (clauses.length) {
    deleteQueries.push(`hd_friend_requests?requester_player_id=eq.${encodeURIComponent(requesterId)}&status=eq.pending&or=(${clauses.join(',')})`);
  }
  let changed = false;
  for (const query of deleteQueries) {
    await request(query, { method: 'DELETE', prefer: 'return=minimal' }).then(() => { changed = true; }).catch(() => null);
  }
  const accepted = await acceptedFriendRequestExists(requesterId, requesterCode, targetId, targetCode).catch(() => false);
  if (!accepted && (targetId || targetCode)) await deleteFriendRowsForPair(requesterId, requesterCode, targetId, targetCode).catch(() => null);
  return changed;
}

async function handleFriends(req, res) {  const body = readBody(req);
  const method = req.method || 'GET';
  let playerId = safeText(body.playerId || req.query?.playerId || '', 90);
  let myFriendCode = cleanFriendCode(body.myFriendCode || body.selfFriendCode || req.query?.myFriendCode || '');
  if (!configured()) return send(res, 200, { ok: true, mode: 'local-preview', friends: [], features: requestFeatureFlags(), message: 'Amis conservés sur cet appareil. La synchronisation en ligne s’activera quand le service sera branché.' });
  try {
    if (method === 'POST' && (safeText(body.action || body.intent || '', 20) === 'cancel' || body.cancel === true)) {
      await syncOwnProfileFromFriendBody(body, playerId).catch(() => null);
      playerId = safeText(body.playerId || body.canonicalPlayerId || playerId, 90);
      myFriendCode = cleanFriendCode(body.myFriendCode || body.friendCodeSelf || body.selfFriendCode || myFriendCode);
      await cancelPendingFriendRequest({
        playerId,
        myFriendCode,
        requestId: body.requestId || body.id || '',
        targetPlayerId: body.targetPlayerId || body.friendPlayerId || '',
        targetFriendCode: body.targetFriendCode || body.friendCode || ''
      });
    } else if (method === 'POST') {
      await syncOwnProfileFromFriendBody(body, playerId).catch(() => null);
      playerId = safeText(body.playerId || body.canonicalPlayerId || playerId, 90);
      myFriendCode = cleanFriendCode(body.myFriendCode || body.friendCodeSelf || body.selfFriendCode || myFriendCode);
      const inputCode = cleanFriendCode(body.friendCode || '');
      const myCode = cleanFriendCode(myFriendCode || body.myFriendCode || body.selfFriendCode || '');
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
  const requestId = row.id != null ? String(row.id) : '';
  return {
    requestId,
    id: requestId || `${safeText(row.requester_player_id || requesterCode, 90)}__${safeText(row.target_player_id || targetCode, 90)}__${safeText(row.status || 'pending', 16)}`,
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
  const select = 'id,requester_player_id,requester_friend_code,requester_pseudo,target_player_id,target_friend_code,target_pseudo,status,created_at,updated_at';
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
  let playerId = safeText(body.playerId || req.query?.playerId || '', 90);
  let myFriendCode = cleanFriendCode(body.myFriendCode || body.friendCodeSelf || req.query?.friendCode || '');
  if (!configured()) return send(res, 200, { ok: true, mode: 'local-preview', requests: { incoming: [], outgoing: [], history: [] }, features: requestFeatureFlags(), message: 'Demandes conservées localement tant que le service en ligne n’est pas branché.' });
  try {
    const friendRequestAction = safeText(body.action || body.intent || '', 20);
    if (method === 'POST' && (friendRequestAction === 'cancel' || friendRequestAction === 'reset-relation' || body.cancel === true)) {
      await syncOwnProfileFromFriendBody(body, playerId).catch(() => null);
      playerId = safeText(body.playerId || body.canonicalPlayerId || playerId, 90);
      myFriendCode = cleanFriendCode(body.myFriendCode || body.friendCodeSelf || body.selfFriendCode || myFriendCode);
      const targetPlayerId = safeText(body.targetPlayerId || body.friendPlayerId || '', 90);
      const targetCode = cleanFriendCode(body.targetFriendCode || body.friendCode || '');
      const requestId = safeText(body.requestId || body.id || '', 32);
      if (!playerId || (!requestId && !targetPlayerId && !targetCode)) return send(res, 400, { ok: false, message: 'Demande à annuler introuvable.' });
      await cancelPendingFriendRequest({ playerId, myFriendCode, requestId, targetPlayerId, targetFriendCode: targetCode });
      await deleteFriendRowsForPair(playerId, myFriendCode, targetPlayerId, targetCode).catch(() => null);
      const rows = await friendRequestRowsForPlayer(playerId, myFriendCode).catch(() => []);
      const friends = await currentFriendRows(playerId).catch(() => []);
      return send(res, 200, { ok: true, mode: 'supabase', stored: true, cancelled: true, requests: splitRequestsForClient(rows), friends, features: requestFeatureFlags(), message: 'Demande annulée. Relation remise à zéro.' });
    }
    if (method === 'POST') {
      await syncOwnProfileFromFriendBody(body, playerId).catch(() => null);
      playerId = safeText(body.playerId || body.canonicalPlayerId || playerId, 90);
      myFriendCode = cleanFriendCode(body.myFriendCode || body.friendCodeSelf || body.selfFriendCode || myFriendCode);
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
      const requestId = safeText(body.requestId || body.id || req.query?.requestId || req.query?.id || '', 32);
      if (!playerId || (!requestId && !targetPlayerId && !targetCode)) return send(res, 400, { ok: false, message: 'Demande à annuler introuvable.' });
      await cancelPendingFriendRequest({ playerId, myFriendCode, requestId, targetPlayerId, targetFriendCode: targetCode });
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
  let playerId = safeText(body.playerId || '', 90);
  let myFriendCode = cleanFriendCode(body.myFriendCode || body.friendCodeSelf || '');
  const response = safeText(body.response || body.status || '', 20) === 'accept' ? 'accepted' : 'declined';
  const requesterPlayerId = safeText(body.requesterPlayerId || body.otherPlayerId || '', 90);
  const requesterFriendCode = cleanFriendCode(body.requesterFriendCode || body.otherFriendCode || '');
  if (!configured()) return send(res, 200, { ok: true, mode: 'local-preview', stored: false, requests: { incoming: [], outgoing: [], history: [] }, friends: [], message: 'Validation locale seulement : service en ligne non branché.' });
  try {
    await syncOwnProfileFromFriendBody(body, playerId).catch(() => null);
      playerId = safeText(body.playerId || body.canonicalPlayerId || playerId, 90);
      myFriendCode = cleanFriendCode(body.myFriendCode || body.friendCodeSelf || body.selfFriendCode || myFriendCode);
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
      exposedRoutes: 16,
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
    features: ['daily-mystery', 'course-flow', 'leaderboards', 'friends', 'friend-requests', 'public-profiles', 'profile-lookup', 'request-badges', 'local-backup', 'pwa', 'offline-score-outbox', 'identity-mirror', 'profile-tap-fix-mode', 'online-repair', 'canonical-identity', 'social-canonical-routes', 'profile-diagnostics', 'canonical-scores', 'leaderboard-dedupe']
  });
}

async function handleRoute(req, res, route) {
  try {
    if (route === 'health') return await handleHealth(req, res);
    if (route === 'index') return send(res, 200, { ok: true, api: 'HistoDaily', version: VERSION, routes: ['health','me','daily-mystery','daily-mystery/guess','daily-mystery/hint','leaderboard/daily','leaderboard/submit','friends/sync','friends/requests','friends/request','friends/request/respond','friends/profile','progress/reset','social/repair','social/audit','social/ping','social/state'] });
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


/* Beta 142 — online hardening helpers */
async function beta142CanonicalProfileFromBody(body = {}) {
  const incomingId = safeText(body.playerId || body.friendCode || 'local-player', 90);
  const incomingCode = cleanFriendCode(body.friendCode || body.myFriendCode || '');
  const incomingPseudo = safeText(body.pseudo || 'Invité', 32);
  const incomingStats = {
    level: Math.max(1, Number(body.level || 1)),
    xp: Math.max(0, Number(body.xp || 0)),
    solved_count: Math.max(0, Number(body.solvedCount || 0)),
    streak: Math.max(0, Number(body.streak || 0))
  };
  if (!configured()) {
    return {
      stored: false,
      mode: 'local-profile',
      profile: { player_id: incomingId, pseudo: incomingPseudo, friend_code: incomingCode, ...incomingStats },
      canonicalPlayerId: incomingId,
      canonicalFriendCode: incomingCode,
      adoptedCanonicalProfile: false
    };
  }
  const existingByCode = incomingCode ? await profileByFriendCode(incomingCode).catch(() => null) : null;
  const canonicalId = safeText(existingByCode?.player_id || incomingId, 90);
  const canonicalCode = cleanFriendCode(existingByCode?.friend_code || incomingCode);
  const pseudo = !isGuestPseudo(incomingPseudo) ? incomingPseudo : safeText(existingByCode?.pseudo || 'Invité', 32);
  const profile = {
    player_id: canonicalId,
    pseudo,
    friend_code: canonicalCode,
    level: Math.max(Number(existingByCode?.level || 1), incomingStats.level),
    xp: Math.max(Number(existingByCode?.xp || 0), incomingStats.xp),
    solved_count: Math.max(Number(existingByCode?.solved_count || 0), incomingStats.solved_count),
    streak: Math.max(Number(existingByCode?.streak || 0), incomingStats.streak),
    updated_at: new Date().toISOString()
  };
  const rows = await request('hd_profiles?on_conflict=player_id', { method: 'POST', prefer: 'resolution=merge-duplicates,return=representation', body: [profile] });
  return {
    stored: true,
    mode: 'supabase',
    rows,
    profile,
    canonicalPlayerId: canonicalId,
    canonicalFriendCode: canonicalCode,
    canonicalPseudo: pseudo,
    adoptedCanonicalProfile: Boolean(existingByCode?.player_id && existingByCode.player_id !== incomingId),
    message: existingByCode?.player_id && existingByCode.player_id !== incomingId ? 'Profil canonique récupéré depuis le code ami.' : 'Profil synchronisé.'
  };
}

const beta142PreviousHandleMe = handleMe;
handleMe = async function beta142HandleMe(req, res) {
  if (req.method === 'POST') {
    const body = readBody(req);
    try {
      const result = await beta142CanonicalProfileFromBody(body);
      return send(res, 200, { ok: true, version: VERSION, ...result });
    } catch (error) {
      const body = readBody(req);
      const profile = {
        player_id: safeText(body.playerId || body.friendCode || 'local-player', 90),
        pseudo: safeText(body.pseudo || 'Invité', 32),
        friend_code: cleanFriendCode(body.friendCode || body.myFriendCode || ''),
        level: Math.max(1, Number(body.level || 1)),
        xp: Math.max(0, Number(body.xp || 0)),
        solved_count: Math.max(0, Number(body.solvedCount || 0)),
        streak: Math.max(0, Number(body.streak || 0)),
        updated_at: new Date().toISOString()
      };
      return send(res, 200, { ok: true, stored: false, mode: 'supabase-error', version: VERSION, message: 'Profil conservé localement pour le moment.', profile, canonicalPlayerId: profile.player_id, canonicalFriendCode: profile.friend_code });
    }
  }
  return beta142PreviousHandleMe(req, res);
};

async function handleSocialRepair(req, res) {
  if (req.method && req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { ok: false, message: 'POST only' }); }
  const body = readBody(req);
  if (!configured()) return send(res, 200, { ok: true, stored: false, mode: 'local-preview', friends: [], requests: { incoming: [], outgoing: [], history: [] }, diagnostics: { configured: false }, message: 'Service en ligne non branché.' });
  try {
    const canonical = await beta142CanonicalProfileFromBody(body);
    const playerId = canonical.canonicalPlayerId || safeText(body.playerId || '', 90);
    const friendCode = canonical.canonicalFriendCode || cleanFriendCode(body.friendCode || body.myFriendCode || '');
    const friends = await currentFriendRows(playerId).catch(() => []);
    const rows = await friendRequestRowsForPlayer(playerId, friendCode).catch(() => []);
    const requests = splitRequestsForClient(rows);
    return send(res, 200, {
      ok: true,
      mode: 'supabase',
      stored: true,
      ...canonical,
      friends,
      requests,
      diagnostics: {
        configured: true,
        playerId,
        friendCode,
        friends: friends.length,
        incomingRequests: requests.incoming.length,
        outgoingRequests: requests.outgoing.length,
        identity: await beta143ProfileDiagnostics(playerId, friendCode).catch(() => ({ configured: true, error: 'identity-diagnostic-failed' })),
        checkedAt: new Date().toISOString()
      },
      features: { ...requestFeatureFlags(), onlineRepair: true, canonicalIdentity: true },
      message: canonical.message || 'Synchro réparée.'
    });
  } catch (error) {
    return send(res, 200, { ok: true, mode: 'supabase-error', stored: false, friends: [], requests: { incoming: [], outgoing: [], history: [] }, diagnostics: { configured: true, error: 'repair-failed' }, message: 'Réparation en ligne incomplète.' });
  }
}



/* Beta 143 — server online stability helpers */
async function beta143ProfileDiagnostics(playerId = '', friendCode = '') {
  if (!configured()) return { configured: false };
  const id = safeText(playerId || '', 90);
  const code = cleanFriendCode(friendCode || '');
  const suffix = codeSuffix(code);
  const out = { configured: true, profileFound: false, friendCode: code, playerId: id, possibleCodeMatches: 0 };
  try {
    if (id) {
      const rows = await request(`hd_profiles?select=player_id,pseudo,friend_code,updated_at&player_id=eq.${encodeURIComponent(id)}&limit=1`);
      out.profileFound = Boolean(rows && rows[0]);
      if (rows && rows[0]) out.profile = rows[0];
    }
  } catch { out.profileLookup = 'error'; }
  try {
    if (code) {
      const clauses = [`friend_code.eq.${encodeURIComponent(code)}`];
      if (suffix) clauses.push(`friend_code.ilike.${encodeURIComponent(`*-${suffix}`)}`);
      const rows = await request(`hd_profiles?select=player_id,pseudo,friend_code,updated_at&or=(${clauses.join(',')})&limit=10`);
      out.possibleCodeMatches = (rows || []).length;
      out.codeMatches = (rows || []).map(row => ({
        player_id: row.player_id,
        pseudo: row.pseudo,
        friend_code: row.friend_code,
        updated_at: row.updated_at
      }));
    }
  } catch { out.codeLookup = 'error'; }
  return out;
}

const beta142PreviousRequestFeatureFlags = requestFeatureFlags;
requestFeatureFlags = function beta142RequestFeatureFlags() {
  return { ...beta142PreviousRequestFeatureFlags(), onlineRepair: true, canonicalIdentity: true, serverTruthRefresh: true, socialCanonicalRoutes: true, profileDiagnostics: true, canonicalScores: true, leaderboardFriendCodeDedupe: true };
};

const beta142PreviousHandleRoute = handleRoute;
handleRoute = async function beta142HandleRoute(req, res, route) {
  if (route === 'social/repair') return handleSocialRepair(req, res);
  return beta142PreviousHandleRoute(req, res, route);
};


/* Beta 145 — online audit and safe social cleanup */
async function beta145Rows(path) {
  try { const rows = await request(path); return Array.isArray(rows) ? rows : []; }
  catch { return []; }
}
function beta145TargetKey(row = {}) {
  const id = safeText(row.target_player_id || row.requester_player_id || '', 90);
  const code = cleanFriendCode(row.target_friend_code || row.requester_friend_code || '');
  return id || codeSuffix(code) || code || 'unknown';
}
async function beta145CleanupSelfRelations(playerId = '', friendCode = '') {
  const id = safeText(playerId || '', 90);
  const code = cleanFriendCode(friendCode || '');
  const cleaned = { selfFriendRows: 0, selfRequests: 0 };
  if (!configured() || (!id && !code)) return cleaned;
  const selfFriendClauses = [];
  if (id) selfFriendClauses.push(`friend_player_id.eq.${encodeURIComponent(id)}`);
  if (code) {
    selfFriendClauses.push(`friend_code.eq.${encodeURIComponent(code)}`);
    const suffix = codeSuffix(code);
    if (suffix) selfFriendClauses.push(`friend_code.ilike.${encodeURIComponent(`*-${suffix}`)}`);
  }
  if (id && selfFriendClauses.length) {
    await request(`hd_friends?player_id=eq.${encodeURIComponent(id)}&or=(${selfFriendClauses.join(',')})`, { method: 'DELETE', prefer: 'return=minimal' }).then(() => { cleaned.selfFriendRows += 1; }).catch(() => null);
  }
  const reqClauses = [];
  if (id) {
    reqClauses.push(`and(requester_player_id.eq.${encodeURIComponent(id)},target_player_id.eq.${encodeURIComponent(id)})`);
  }
  if (code) {
    reqClauses.push(`and(requester_friend_code.eq.${encodeURIComponent(code)},target_friend_code.eq.${encodeURIComponent(code)})`);
    const suffix = codeSuffix(code);
    if (suffix) reqClauses.push(`and(requester_friend_code.ilike.${encodeURIComponent(`*-${suffix}`)},target_friend_code.ilike.${encodeURIComponent(`*-${suffix}`)})`);
  }
  if (reqClauses.length) {
    await request(`hd_friend_requests?status=eq.pending&or=(${reqClauses.join(',')})`, { method: 'DELETE', prefer: 'return=minimal' }).then(() => { cleaned.selfRequests += 1; }).catch(() => null);
  }
  return cleaned;
}
async function beta145DedupePendingRequests(playerId = '', friendCode = '') {
  const id = safeText(playerId || '', 90);
  const code = cleanFriendCode(friendCode || '');
  const cleaned = { duplicateRequests: 0 };
  if (!configured() || (!id && !code)) return cleaned;
  const rows = await friendRequestRowsForPlayer(id, code).catch(() => []);
  const outgoing = (rows || []).filter(row => row.status === 'pending' && row.direction === 'outgoing');
  const seen = new Map();
  for (const row of outgoing) {
    const key = beta145TargetKey({ target_player_id: row.targetPlayerId || row.otherPlayerId, target_friend_code: row.targetFriendCode || row.otherFriendCode });
    if (!key || key === 'unknown') continue;
    const previous = seen.get(key);
    const currentTime = Date.parse(row.updatedAt || row.createdAt || '') || 0;
    const previousTime = previous ? (Date.parse(previous.updatedAt || previous.createdAt || '') || 0) : -1;
    if (!previous || currentTime >= previousTime) {
      if (previous?.requestId) {
        await request(`hd_friend_requests?id=eq.${encodeURIComponent(previous.requestId)}&status=eq.pending`, { method: 'DELETE', prefer: 'return=minimal' }).then(() => { cleaned.duplicateRequests += 1; }).catch(() => null);
      }
      seen.set(key, row);
    } else if (row.requestId) {
      await request(`hd_friend_requests?id=eq.${encodeURIComponent(row.requestId)}&status=eq.pending`, { method: 'DELETE', prefer: 'return=minimal' }).then(() => { cleaned.duplicateRequests += 1; }).catch(() => null);
    }
  }
  return cleaned;
}
async function beta145EnsureAcceptedFriendRows(playerId = '', friendCode = '') {
  const id = safeText(playerId || '', 90);
  const code = cleanFriendCode(friendCode || '');
  const result = { restoredFriendRows: 0 };
  if (!configured() || (!id && !code)) return result;
  const rows = await friendRequestRowsForPlayer(id, code).catch(() => []);
  const accepted = (rows || []).filter(row => row.status === 'accepted').slice(0, 30);
  for (const row of accepted) {
    const incoming = row.direction === 'incoming';
    const requester = {
      playerId: safeText(row.requesterPlayerId || '', 90),
      friendCode: cleanFriendCode(row.requesterFriendCode || ''),
      pseudo: safeText(row.requesterPseudo || 'Joueur', 32)
    };
    const target = {
      playerId: safeText(row.targetPlayerId || '', 90),
      friendCode: cleanFriendCode(row.targetFriendCode || ''),
      pseudo: safeText(row.targetPseudo || 'Joueur', 32)
    };
    const me = incoming ? target : requester;
    const other = incoming ? requester : target;
    if (!me.playerId || (!other.playerId && !other.friendCode)) continue;
    const friends = await currentFriendRows(me.playerId).catch(() => []);
    const exists = friends.some(friend => {
      const fid = safeText(friend.friend_player_id || friend.playerId || '', 90);
      const fcode = cleanFriendCode(friend.friend_code || friend.friendCode || friend.code || '');
      return (other.playerId && fid === other.playerId) || (other.friendCode && friendCodeMatches(fcode, other.friendCode));
    });
    if (!exists) {
      await upsertFriendPair(me, other).then(() => { result.restoredFriendRows += 1; }).catch(() => null);
    }
  }
  return result;
}
async function beta145SocialAuditFor(playerId = '', friendCode = '') {
  const id = safeText(playerId || '', 90);
  const code = cleanFriendCode(friendCode || '');
  const diagnostics = await beta143ProfileDiagnostics(id, code).catch(() => ({ configured: configured(), error: 'profile-diagnostic-failed' }));
  const friends = id ? await currentFriendRows(id).catch(() => []) : [];
  const requests = await friendRequestRowsForPlayer(id, code).catch(() => []);
  const scoreClauses = [];
  if (id) scoreClauses.push(`player_id.eq.${encodeURIComponent(id)}`);
  if (code) {
    scoreClauses.push(`friend_code.eq.${encodeURIComponent(code)}`);
    const suffix = codeSuffix(code);
    if (suffix) scoreClauses.push(`friend_code.ilike.${encodeURIComponent(`*-${suffix}`)}`);
  }
  const scoreRows = scoreClauses.length ? await beta145Rows(`hd_scores?select=id,player_id,friend_code,period_key,score,solved_at&or=(${scoreClauses.join(',')})&order=solved_at.desc&limit=100`) : [];
  return {
    configured: configured(),
    playerId: id,
    friendCode: code,
    profiles: diagnostics,
    friends: friends.length,
    requests: {
      pending: requests.filter(row => row.status === 'pending').length,
      incoming: requests.filter(row => row.status === 'pending' && row.direction === 'incoming').length,
      outgoing: requests.filter(row => row.status === 'pending' && row.direction === 'outgoing').length,
      accepted: requests.filter(row => row.status === 'accepted').length,
      history: requests.filter(row => row.status !== 'pending').length
    },
    scores: { recentRows: scoreRows.length, latestAt: scoreRows[0]?.solved_at || null },
    checkedAt: new Date().toISOString()
  };
}
const beta145PreviousHandleSocialRepair = handleSocialRepair;
handleSocialRepair = async function beta145HandleSocialRepair(req, res) {
  if (req.method && req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { ok: false, message: 'POST only' }); }
  const body = readBody(req);
  if (!configured()) return beta145PreviousHandleSocialRepair(req, res);
  try {
    const canonical = await beta142CanonicalProfileFromBody(body);
    const playerId = canonical.canonicalPlayerId || safeText(body.playerId || '', 90);
    const friendCode = canonical.canonicalFriendCode || cleanFriendCode(body.friendCode || body.myFriendCode || '');
    const cleanup = {
      ...(await beta145CleanupSelfRelations(playerId, friendCode).catch(() => ({ selfFriendRows: 0, selfRequests: 0 }))),
      ...(await beta145DedupePendingRequests(playerId, friendCode).catch(() => ({ duplicateRequests: 0 }))),
      ...(await beta145EnsureAcceptedFriendRows(playerId, friendCode).catch(() => ({ restoredFriendRows: 0 })))
    };
    const friends = await currentFriendRows(playerId).catch(() => []);
    const rows = await friendRequestRowsForPlayer(playerId, friendCode).catch(() => []);
    const requests = splitRequestsForClient(rows);
    const audit = await beta145SocialAuditFor(playerId, friendCode).catch(() => null);
    const totalCleanup = Object.values(cleanup).reduce((sum, value) => sum + Number(value || 0), 0);
    return send(res, 200, {
      ok: true,
      mode: 'supabase',
      stored: true,
      ...canonical,
      friends,
      requests,
      diagnostics: {
        configured: true,
        playerId,
        friendCode,
        friends: friends.length,
        incomingRequests: requests.incoming.length,
        outgoingRequests: requests.outgoing.length,
        cleanup,
        audit,
        identity: await beta143ProfileDiagnostics(playerId, friendCode).catch(() => ({ configured: true, error: 'identity-diagnostic-failed' })),
        checkedAt: new Date().toISOString()
      },
      features: { ...requestFeatureFlags(), onlineRepair: true, onlineAudit: true, safeSocialCleanup: true },
      message: totalCleanup ? `Synchro réparée : ${totalCleanup} correction(s) appliquée(s).` : (canonical.message || 'Synchro vérifiée.')
    });
  } catch (error) {
    return send(res, 200, { ok: true, mode: 'supabase-error', stored: false, friends: [], requests: { incoming: [], outgoing: [], history: [] }, diagnostics: { configured: true, error: 'repair-failed' }, message: 'Réparation en ligne incomplète.' });
  }
};
async function handleSocialAudit(req, res) {
  if (!configured()) return send(res, 200, { ok: true, mode: 'local-preview', audit: { configured: false }, message: 'Service en ligne non branché.' });
  const body = readBody(req);
  const playerId = safeText(req.query?.playerId || body.playerId || '', 90);
  const friendCode = cleanFriendCode(req.query?.friendCode || req.query?.myFriendCode || body.friendCode || body.myFriendCode || '');
  try {
    const audit = await beta145SocialAuditFor(playerId, friendCode);
    return send(res, 200, { ok: true, mode: 'supabase', audit, features: { ...requestFeatureFlags(), onlineAudit: true } });
  } catch {
    return send(res, 200, { ok: true, mode: 'supabase-error', audit: { configured: true, error: 'audit-failed' }, message: 'Audit indisponible pour le moment.' });
  }
}
const beta145PreviousRequestFeatureFlags = requestFeatureFlags;
requestFeatureFlags = function beta145RequestFeatureFlags() {
  return { ...beta145PreviousRequestFeatureFlags(), onlineAudit: true, safeSocialCleanup: true, acceptedFriendRepair: true };
};
const beta145PreviousHandleHealth = handleHealth;
handleHealth = async function beta145HandleHealth(req, res) {
  const oldJson = res.json?.bind(res);
  if (!oldJson) return beta145PreviousHandleHealth(req, res);
  const wrapper = { ...res, status: (...args) => ({ json: (payload) => payload }) };
  try {
    const probe = await leaderboardSchemaProbe();
    let socialReady = false;
    let socialMessage = '';
    if (configured()) {
      try {
        await request('hd_profiles?select=player_id,friend_code&limit=1');
        await request('hd_friend_requests?select=id,status&limit=1');
        socialReady = true;
      } catch { socialMessage = 'Tables sociales incomplètes ou inaccessibles'; }
    }
    return send(res, 200, {
      ok: true,
      app: 'HistoDaily',
      version: VERSION,
      target: 'vercel',
      deployment: {
        apiMode: 'catch-all-router',
        exposedRoutes: 16,
        onlineSyncOptional: true,
        onlineMultiplayerReady: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
        leaderboardReady: Boolean(probe.ok),
        leaderboardMode: probe.mode,
        socialReady,
        schemaMessage: probe.message || socialMessage || ''
      },
      content: { readyCourses: 42, publicMysteries: mysteries.length, dailyRewardGems: 1, archiveDaysVisible: 7 },
      features: ['daily-mystery', 'course-flow', 'leaderboards', 'friends', 'friend-requests', 'public-profiles', 'profile-lookup', 'request-badges', 'local-backup', 'pwa', 'offline-score-outbox', 'identity-mirror', 'online-repair', 'online-audit', 'safe-social-cleanup', 'canonical-scores', 'leaderboard-dedupe']
    });
  } catch {
    return beta145PreviousHandleHealth(req, res);
  }
};
const beta145PreviousHandleRoute = handleRoute;
handleRoute = async function beta145HandleRoute(req, res, route) {
  if (route === 'social/audit') return handleSocialAudit(req, res);
  return beta145PreviousHandleRoute(req, res, route);
};


/* Beta 146 — server-side online resilience
   - lookup de profil par code ami plus déterministe
   - audit des relations anciennes sans demande acceptée
   - flags de cohérence pour le diagnostic client
*/
const BETA146_SERVER_ONLINE_RESILIENCE = true;
const beta146PreviousProfileByFriendCode = profileByFriendCode;
profileByFriendCode = async function beta146ProfileByFriendCode(friendCode = '') {
  const code = cleanFriendCode(friendCode);
  if (!configured() || !code) return null;
  const select = 'player_id,pseudo,friend_code,level,xp,solved_count,streak,updated_at';
  try {
    const exact = await request(`hd_profiles?select=${select}&friend_code=eq.${encodeURIComponent(code)}&order=updated_at.desc.nullslast&limit=1`);
    if (exact && exact[0]) return exact[0];
  } catch {}
  try {
    const suffix = codeSuffix(code);
    if (suffix) {
      const rows = await request(`hd_profiles?select=${select}&friend_code=ilike.${encodeURIComponent(`*-${suffix}`)}&order=updated_at.desc.nullslast&limit=10`);
      if (rows && rows[0]) return rows[0];
    }
  } catch {}
  return beta146PreviousProfileByFriendCode(friendCode);
};
async function beta146UnverifiedFriendRows(playerId = '', friendCode = '') {
  const id = safeText(playerId || '', 90);
  const code = cleanFriendCode(friendCode || '');
  const result = { unverifiedRows: 0, checkedRows: 0 };
  if (!configured() || !id) return result;
  const friends = await currentFriendRows(id).catch(() => []);
  for (const friend of (friends || []).slice(0, 50)) {
    const otherId = safeText(friend.friend_player_id || friend.playerId || '', 90);
    const otherCode = cleanFriendCode(friend.friend_code || friend.friendCode || friend.code || '');
    if (!otherId && !otherCode) continue;
    result.checkedRows += 1;
    const accepted = await acceptedFriendRequestExists(id, code, otherId, otherCode).catch(() => false);
    if (!accepted) result.unverifiedRows += 1;
  }
  return result;
}
const beta146PreviousSocialAuditFor = beta145SocialAuditFor;
beta145SocialAuditFor = async function beta146SocialAuditFor(playerId = '', friendCode = '') {
  const audit = await beta146PreviousSocialAuditFor(playerId, friendCode);
  const unverified = await beta146UnverifiedFriendRows(playerId, friendCode).catch(() => ({ unverifiedRows: 0, checkedRows: 0, error: 'unverified-check-failed' }));
  return {
    ...audit,
    friends: {
      count: typeof audit.friends === 'number' ? audit.friends : (audit.friends?.count || 0),
      unverifiedRows: unverified.unverifiedRows || 0,
      checkedRows: unverified.checkedRows || 0
    }
  };
};
const beta146PreviousRequestFeatureFlags = requestFeatureFlags;
requestFeatureFlags = function beta146RequestFeatureFlags() {
  return { ...beta146PreviousRequestFeatureFlags(), deterministicFriendCodeLookup: true, unverifiedFriendAudit: true, localOutboxIdentityRewrite: true, serverOnlineResilience: true };
};
const beta146PreviousHandleRoute = handleRoute;
handleRoute = async function beta146HandleRoute(req, res, route) {
  if (route === 'social/ping') {
    return send(res, 200, { ok: true, version: VERSION, mode: configured() ? 'supabase-ready' : 'local-preview', features: requestFeatureFlags(), checkedAt: new Date().toISOString() });
  }
  return beta146PreviousHandleRoute(req, res, route);
};


/* Beta 147 — server release hardening
   - endpoint de diagnostic social non destructif
   - health plus explicite sur les tables online
   - flags utiles pour vérifier un déploiement sans modifier les données
*/
async function beta147SocialState(req, res) {
  if (!configured()) {
    return send(res, 200, { ok: true, mode: 'local-preview', version: VERSION, state: { configured: false }, message: 'Service en ligne non branché.' });
  }
  const body = readBody(req);
  const playerId = safeText(req.query?.playerId || body.playerId || '', 90);
  const friendCode = cleanFriendCode(req.query?.friendCode || req.query?.myFriendCode || body.friendCode || body.myFriendCode || '');
  try {
    const canonical = await beta142CanonicalProfileFromBody({ playerId, friendCode, myFriendCode: friendCode, pseudo: body.pseudo || req.query?.pseudo || 'Joueur' });
    const canonicalPlayerId = canonical.canonicalPlayerId || playerId;
    const canonicalFriendCode = canonical.canonicalFriendCode || friendCode;
    const friends = await currentFriendRows(canonicalPlayerId).catch(() => []);
    const requestRows = await friendRequestRowsForPlayer(canonicalPlayerId, canonicalFriendCode).catch(() => []);
    const requests = splitRequestsForClient(requestRows);
    const audit = await beta145SocialAuditFor(canonicalPlayerId, canonicalFriendCode).catch(() => null);
    return send(res, 200, {
      ok: true,
      mode: 'supabase',
      version: VERSION,
      ...canonical,
      state: {
        configured: true,
        friends: friends.length,
        incomingRequests: requests.incoming.length,
        outgoingRequests: requests.outgoing.length,
        historyRequests: requests.history.length,
        audit,
        checkedAt: new Date().toISOString()
      },
      friends,
      requests,
      features: { ...requestFeatureFlags(), socialState: true, releaseHardening: true }
    });
  } catch (error) {
    return send(res, 200, { ok: true, mode: 'supabase-error', version: VERSION, state: { configured: true, error: 'social-state-failed' }, message: 'État social indisponible pour le moment.' });
  }
}
const beta147PreviousRequestFeatureFlags = requestFeatureFlags;
requestFeatureFlags = function beta147RequestFeatureFlags() {
  return { ...beta147PreviousRequestFeatureFlags(), socialState: true, releaseHardening: true, silentOnlineRepair: true };
};
const beta147PreviousHandleHealth = handleHealth;
handleHealth = async function beta147HandleHealth(req, res) {
  if (!configured()) return beta147PreviousHandleHealth(req, res);
  try {
    const probe = await leaderboardSchemaProbe();
    const checks = {
      profiles: false,
      scores: Boolean(probe.ok),
      friends: false,
      friendRequests: false
    };
    let schemaMessage = probe.message || '';
    try { await request('hd_profiles?select=player_id,friend_code,updated_at&limit=1'); checks.profiles = true; } catch { schemaMessage = schemaMessage || 'hd_profiles incomplet'; }
    try { await request('hd_friends?select=player_id,friend_code,friend_player_id&limit=1'); checks.friends = true; } catch { schemaMessage = schemaMessage || 'hd_friends incomplet'; }
    try { await request('hd_friend_requests?select=id,status,requester_player_id,target_friend_code&limit=1'); checks.friendRequests = true; } catch { schemaMessage = schemaMessage || 'hd_friend_requests incomplet'; }
    return send(res, 200, {
      ok: true,
      app: 'HistoDaily',
      version: VERSION,
      target: 'vercel',
      deployment: {
        apiMode: 'catch-all-router',
        exposedRoutes: 17,
        onlineSyncOptional: true,
        onlineMultiplayerReady: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
        leaderboardReady: Boolean(probe.ok),
        leaderboardMode: probe.mode,
        socialReady: Boolean(checks.profiles && checks.friends && checks.friendRequests),
        schemaChecks: checks,
        schemaMessage
      },
      content: { readyCourses: 42, publicMysteries: mysteries.length, dailyRewardGems: 1, archiveDaysVisible: 7 },
      features: ['daily-mystery', 'course-flow', 'leaderboards', 'friends', 'friend-requests', 'public-profiles', 'profile-lookup', 'request-badges', 'local-backup', 'pwa', 'offline-score-outbox', 'identity-mirror', 'online-repair', 'online-audit', 'social-state', 'release-hardening', 'silent-online-repair']
    });
  } catch {
    return beta147PreviousHandleHealth(req, res);
  }
};
const beta147PreviousHandleRoute = handleRoute;
handleRoute = async function beta147HandleRoute(req, res, route) {
  if (route === 'social/state') return beta147SocialState(req, res);
  return beta147PreviousHandleRoute(req, res, route);
};



/* Beta 148 — non destructive system preflight
   Vérifie les briques online sans écrire dans Supabase.
*/
async function beta148SystemPreflight(req, res) {
  const started = Date.now();
  const checks = { api: true, configured: configured(), profiles: false, scores: false, friends: false, friendRequests: false, leaderboard: false, social: false };
  const warnings = [];
  let mode = configured() ? 'supabase' : 'local-preview';
  let schemaMessage = '';
  if (!configured()) {
    return send(res, 200, { ok: true, version: VERSION, mode, checks, warnings: ['Supabase non configuré sur cet environnement.'], durationMs: Date.now() - started, message: 'Pré-vérification locale uniquement.' });
  }
  try { await request('hd_profiles?select=player_id,friend_code,updated_at&limit=1'); checks.profiles = true; } catch { warnings.push('Table profils inaccessible ou incomplète.'); schemaMessage = schemaMessage || 'hd_profiles'; }
  try { await request('hd_scores?select=player_id,mystery_id,period_key,scope,score,friend_code&limit=1'); checks.scores = true; } catch { warnings.push('Table scores inaccessible ou incomplète.'); schemaMessage = schemaMessage || 'hd_scores'; }
  try { await request('hd_friends?select=player_id,friend_code,friend_player_id&limit=1'); checks.friends = true; } catch { warnings.push('Table amis inaccessible ou incomplète.'); schemaMessage = schemaMessage || 'hd_friends'; }
  try { await request('hd_friend_requests?select=id,status,requester_player_id,target_friend_code&limit=1'); checks.friendRequests = true; } catch { warnings.push('Table demandes inaccessible ou incomplète.'); schemaMessage = schemaMessage || 'hd_friend_requests'; }
  try { const probe = await leaderboardSchemaProbe(); checks.leaderboard = Boolean(probe.ok); if (!probe.ok && probe.message) warnings.push(probe.message); } catch { warnings.push('Classement non vérifiable.'); }
  checks.social = Boolean(checks.profiles && checks.friends && checks.friendRequests);
  const body = readBody(req);
  const playerId = safeText(req.query?.playerId || body.playerId || '', 90);
  const friendCode = cleanFriendCode(req.query?.friendCode || req.query?.myFriendCode || body.friendCode || body.myFriendCode || '');
  let identity = null;
  if (playerId || friendCode) {
    try {
      const canonical = await beta142CanonicalProfileFromBody({ playerId, friendCode, myFriendCode: friendCode, pseudo: body.pseudo || req.query?.pseudo || 'Joueur' });
      identity = {
        playerId: canonical.canonicalPlayerId || playerId,
        friendCode: canonical.canonicalFriendCode || friendCode,
        adoptedCanonicalProfile: Boolean(canonical.adoptedCanonicalProfile)
      };
    } catch {
      warnings.push('Profil courant non vérifiable.');
    }
  }
  return send(res, 200, {
    ok: Boolean(checks.api && checks.profiles && checks.scores && checks.friends && checks.friendRequests && checks.leaderboard),
    version: VERSION,
    mode,
    checks,
    warnings,
    identity,
    schemaMessage,
    durationMs: Date.now() - started,
    message: warnings.length ? 'Pré-vérification terminée avec points à surveiller.' : 'Pré-vérification online OK.'
  });
}
const beta148PreviousHandleRoute = handleRoute;
handleRoute = async function beta148HandleRoute(req, res, route) {
  if (route === 'system/preflight') return beta148SystemPreflight(req, res);
  if (route === 'index') return send(res, 200, { ok: true, api: 'HistoDaily', version: VERSION, routes: ['health','me','daily-mystery','daily-mystery/guess','daily-mystery/hint','leaderboard/daily','leaderboard/submit','friends/sync','friends/requests','friends/request','friends/request/respond','friends/profile','progress/reset','social/repair','social/audit','social/ping','social/state','system/preflight'] });
  return beta148PreviousHandleRoute(req, res, route);
};
const beta148PreviousHandleHealth = handleHealth;
handleHealth = async function beta148HandleHealth(req, res) {
  if (!configured()) return beta148PreviousHandleHealth(req, res);
  try {
    const req2 = { ...req, query: {}, body: {} };
    let payload = null;
    const fake = { status: () => ({ json: (p) => { payload = p; return p; } }) };
    await beta148SystemPreflight(req2, fake);
    const preflightReady = Boolean(payload?.ok);
    const probe = await leaderboardSchemaProbe();
    const checks = payload?.checks || {};
    return send(res, 200, {
      ok: true,
      app: 'HistoDaily',
      version: VERSION,
      target: 'vercel',
      deployment: {
        apiMode: 'catch-all-router',
        exposedRoutes: 18,
        onlineSyncOptional: true,
        onlineMultiplayerReady: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
        leaderboardReady: Boolean(probe.ok),
        leaderboardMode: probe.mode,
        socialReady: Boolean(checks.profiles && checks.friends && checks.friendRequests),
        preflightReady,
        schemaChecks: checks,
        schemaMessage: payload?.schemaMessage || probe.message || ''
      },
      content: { readyCourses: 42, publicMysteries: mysteries.length, dailyRewardGems: 1, archiveDaysVisible: 7 },
      features: ['daily-mystery','course-flow','leaderboards','friends','friend-requests','public-profiles','profile-lookup','request-badges','local-backup','pwa','offline-score-outbox','identity-mirror','online-repair','online-audit','social-state','release-hardening','silent-online-repair','system-preflight','local-state-cleanup']
    });
  } catch {
    return beta148PreviousHandleHealth(req, res);
  }
};


/* Beta 149 — regression guard + non destructive selftest
   Vérifie la cohérence minimale du build, du contenu public et des routes API sans écrire en base.
*/
function beta149Dupes(values = []) {
  const seen = new Set();
  const dupes = new Set();
  for (const value of values.map(v => String(v || '').trim()).filter(Boolean)) {
    if (seen.has(value)) dupes.add(value);
    seen.add(value);
  }
  return Array.from(dupes);
}
function beta149MysteryContentReport() {
  const ids = mysteries.map(m => m.id);
  const duplicateIds = beta149Dupes(ids);
  const issues = [];
  for (const mystery of mysteries) {
    const id = mystery.id || '(sans-id)';
    if (!mystery.id) issues.push(`${id}: id manquant`);
    if (!safeText(mystery.answer || '', 120)) issues.push(`${id}: réponse manquante`);
    if (!safeText(mystery.prompt || mystery.title || '', 300)) issues.push(`${id}: énigme manquante`);
    if (!Array.isArray(mystery.clues) || mystery.clues.length < 3) issues.push(`${id}: moins de 3 indices`);
    // Les alias accentués/non accentués peuvent volontairement se normaliser pareil.
    if (mystery.lessonId && typeof mystery.lessonId !== 'string') issues.push(`${id}: lessonId invalide`);
  }
  duplicateIds.forEach(id => issues.push(`id mystère doublonné: ${id}`));
  const lessonLinks = mysteries.filter(m => m.lessonId).length;
  return {
    count: mysteries.length,
    duplicateIds,
    lessonLinks,
    lessonLinkRate: mysteries.length ? Math.round((lessonLinks / mysteries.length) * 100) : 0,
    issues: issues.slice(0, 40),
    ok: issues.length === 0 && mysteries.length > 0
  };
}
function beta149RouteList() {
  return ['health','me','daily-mystery','daily-mystery/start','daily-mystery/guess','daily-mystery/hint','leaderboard/daily','leaderboard/submit','friends/sync','friends/requests','friends/request','friends/request/respond','friends/profile','progress/reset','social/repair','social/audit','social/ping','social/state','system/preflight','system/selftest'];
}
async function beta149SystemSelftest(req, res) {
  const started = Date.now();
  const content = beta149MysteryContentReport();
  const checks = {
    api: true,
    version: VERSION,
    routes: beta149RouteList(),
    contentOk: Boolean(content.ok),
    configured: configured(),
    supabaseReachable: false,
    socialTablesReachable: false,
    leaderboardReachable: false
  };
  const warnings = [];
  if (!content.ok) warnings.push('Contenu mystères à vérifier.');
  if (!configured()) {
    warnings.push('Supabase non configuré dans cet environnement.');
  } else {
    try {
      await request('hd_profiles?select=player_id,friend_code,updated_at&limit=1');
      checks.supabaseReachable = true;
    } catch { warnings.push('Table profils non vérifiable.'); }
    try {
      await request('hd_friends?select=player_id,friend_code,friend_player_id&limit=1');
      await request('hd_friend_requests?select=id,status,requester_player_id,target_friend_code&limit=1');
      checks.socialTablesReachable = true;
    } catch { warnings.push('Tables sociales non vérifiables.'); }
    try {
      const probe = await leaderboardSchemaProbe();
      checks.leaderboardReachable = Boolean(probe.ok);
      if (!probe.ok && probe.message) warnings.push(probe.message);
    } catch { warnings.push('Classement non vérifiable.'); }
  }
  const ok = Boolean(checks.api && checks.contentOk && (!checks.configured || (checks.supabaseReachable && checks.socialTablesReachable && checks.leaderboardReachable)));
  return send(res, 200, {
    ok,
    version: VERSION,
    mode: configured() ? 'supabase' : 'local-preview',
    durationMs: Date.now() - started,
    checks,
    content,
    warnings,
    message: ok ? 'Auto-test HistoDaily OK.' : 'Auto-test terminé avec points à surveiller.'
  });
}
const beta149PreviousRequestFeatureFlags = requestFeatureFlags;
requestFeatureFlags = function beta149RequestFeatureFlags() {
  return { ...beta149PreviousRequestFeatureFlags(), regressionGuard: true, systemSelftest: true };
};
const beta149PreviousHandleRoute = handleRoute;
handleRoute = async function beta149HandleRoute(req, res, route) {
  if (route === 'system/selftest') return beta149SystemSelftest(req, res);
  if (route === 'index') return send(res, 200, { ok: true, api: 'HistoDaily', version: VERSION, routes: beta149RouteList() });
  return beta149PreviousHandleRoute(req, res, route);
};
const beta149PreviousHandleHealth = handleHealth;
handleHealth = async function beta149HandleHealth(req, res) {
  if (!configured()) return beta149PreviousHandleHealth(req, res);
  try {
    let selfPayload = null;
    const fake = { status: () => ({ json: (p) => { selfPayload = p; return p; } }) };
    await beta149SystemSelftest({ ...req, query: {}, body: {} }, fake);
    const previous = { status: (code) => ({ json: (payload) => ({ code, payload }) }) };
    const base = await beta149PreviousHandleHealth(req, previous);
    const payload = base?.payload || {};
    return send(res, 200, {
      ...payload,
      version: VERSION,
      deployment: {
        ...(payload.deployment || {}),
        exposedRoutes: 19,
        selftestReady: Boolean(selfPayload?.ok),
        selftestWarnings: selfPayload?.warnings || []
      },
      features: Array.from(new Set([...(payload.features || []), 'regression-guard', 'system-selftest']))
    });
  } catch {
    return beta149PreviousHandleHealth(req, res);
  }
};


module.exports = { handleRoute, handleRequest, VERSION };

/* Beta 155 — final guard diagnostics
   Endpoint non destructif pour vérifier la cohérence serveur avant test élargi.
*/
async function beta155SystemDiagnostics(req, res) {
  const started = Date.now();
  const checks = {
    api: true,
    configured: configured(),
    health: false,
    selftest: false,
    preflight: false,
    socialState: false,
    leaderboard: false
  };
  const warnings = [];
  if (!configured()) warnings.push('Supabase non configuré dans cet environnement.');
  try {
    let selfPayload = null;
    const fakeSelf = { status: () => ({ json: (p) => { selfPayload = p; return p; } }) };
    await beta149SystemSelftest({ ...req, query: {}, body: {} }, fakeSelf);
    checks.selftest = Boolean(selfPayload?.ok);
    if (Array.isArray(selfPayload?.warnings)) warnings.push(...selfPayload.warnings);
  } catch { warnings.push('Auto-test indisponible.'); }
  try {
    let prePayload = null;
    const fakePre = { status: () => ({ json: (p) => { prePayload = p; return p; } }) };
    await beta148SystemPreflight({ ...req, query: {}, body: {} }, fakePre);
    checks.preflight = Boolean(prePayload?.ok);
    if (Array.isArray(prePayload?.warnings)) warnings.push(...prePayload.warnings);
  } catch { warnings.push('Pré-vérification indisponible.'); }
  if (configured()) {
    try {
      const probe = await leaderboardSchemaProbe();
      checks.leaderboard = Boolean(probe.ok);
      if (!probe.ok && probe.message) warnings.push(probe.message);
    } catch { warnings.push('Classement non vérifiable.'); }
    try {
      await request('hd_profiles?select=player_id,friend_code,updated_at&limit=1');
      await request('hd_scores?select=player_id,friend_code,mystery_id,period_key,scope&limit=1');
      await request('hd_friends?select=player_id,friend_code,friend_player_id&limit=1');
      await request('hd_friend_requests?select=id,status,requester_player_id,target_friend_code&limit=1');
      checks.socialState = true;
    } catch { warnings.push('Tables sociales non vérifiables.'); }
  }
  checks.health = checks.api && (!checks.configured || (checks.leaderboard && checks.socialState));
  const uniqueWarnings = Array.from(new Set(warnings.filter(Boolean))).slice(0, 12);
  return send(res, 200, {
    ok: Boolean(checks.health && checks.selftest && checks.preflight),
    version: VERSION,
    mode: configured() ? 'supabase' : 'local-preview',
    checks,
    warnings: uniqueWarnings,
    durationMs: Date.now() - started,
    message: uniqueWarnings.length ? 'Diagnostic terminé avec points à surveiller.' : 'Diagnostic serveur OK.'
  });
}
const beta155PreviousRequestFeatureFlags = requestFeatureFlags;
requestFeatureFlags = function beta155RequestFeatureFlags() {
  return { ...beta155PreviousRequestFeatureFlags(), finalGuard: true, systemDiagnostics: true, noStoreApi: true };
};
const beta155PreviousHandleRoute = handleRoute;
handleRoute = async function beta155HandleRoute(req, res, route) {
  if (route === 'system/diagnostics') return beta155SystemDiagnostics(req, res);
  if (route === 'index') return send(res, 200, { ok: true, api: 'HistoDaily', version: VERSION, routes: [...new Set([...beta149RouteList(), 'system/diagnostics'])] });
  return beta155PreviousHandleRoute(req, res, route);
};
const beta155PreviousHandleHealth = handleHealth;
handleHealth = async function beta155HandleHealth(req, res) {
  try {
    let diagPayload = null;
    const fake = { status: () => ({ json: (p) => { diagPayload = p; return p; } }) };
    await beta155SystemDiagnostics({ ...req, query: {}, body: {} }, fake);
    const previous = { status: (code) => ({ json: (payload) => ({ code, payload }) }), setHeader: () => {} };
    const base = await beta155PreviousHandleHealth(req, previous);
    const payload = base?.payload || {};
    return send(res, 200, {
      ...payload,
      version: VERSION,
      deployment: {
        ...(payload.deployment || {}),
        exposedRoutes: 20,
        diagnosticsReady: Boolean(diagPayload?.ok),
        diagnosticsWarnings: diagPayload?.warnings || []
      },
      features: Array.from(new Set([...(payload.features || []), 'final-guard', 'system-diagnostics', 'no-store-api']))
    });
  } catch {
    return beta155PreviousHandleHealth(req, res);
  }
};

module.exports = { handleRoute, handleRequest, VERSION };

/* Beta 156 — release readiness
   Endpoint non destructif pour décider si la build peut partir en test privé.
*/
async function beta156Capture(handler, req) {
  let payload = null;
  let statusCode = 200;
  const fake = { status: (code) => ({ json: (p) => { statusCode = code; payload = p; return p; } }), setHeader: () => {} };
  await handler({ ...req, query: {}, body: {} }, fake);
  return { statusCode, payload };
}

async function beta156SystemReleaseCheck(req, res) {
  const started = Date.now();
  const warnings = [];
  const checks = {
    api: true,
    configured: configured(),
    diagnostics: false,
    selftest: false,
    preflight: false,
    health: false,
    content: false,
    social: false,
    leaderboard: false
  };
  try {
    const diag = await beta156Capture(beta155SystemDiagnostics, req);
    checks.diagnostics = Boolean(diag.payload?.ok);
    if (Array.isArray(diag.payload?.warnings)) warnings.push(...diag.payload.warnings);
  } catch { warnings.push('Diagnostic système indisponible.'); }
  try {
    const self = await beta156Capture(beta149SystemSelftest, req);
    checks.selftest = Boolean(self.payload?.ok);
    if (Array.isArray(self.payload?.warnings)) warnings.push(...self.payload.warnings);
  } catch { warnings.push('Auto-test système indisponible.'); }
  try {
    const pre = await beta156Capture(beta148SystemPreflight, req);
    checks.preflight = Boolean(pre.payload?.ok);
    if (Array.isArray(pre.payload?.warnings)) warnings.push(...pre.payload.warnings);
  } catch { warnings.push('Pré-vérification indisponible.'); }
  try {
    checks.content = Array.isArray(mysteries) && mysteries.length >= 17 && mysteries.every(m => m.id && m.answer && Array.isArray(m.clues) && m.clues.length === 3);
    if (!checks.content) warnings.push('Contenu mystères public incomplet ou mal formé.');
  } catch { warnings.push('Contenu non vérifiable.'); }
  if (configured()) {
    try {
      await request('hd_profiles?select=player_id,friend_code,updated_at&limit=1');
      await request('hd_friend_requests?select=id,status,requester_player_id,target_friend_code&limit=1');
      await request('hd_friends?select=player_id,friend_code,friend_player_id&limit=1');
      checks.social = true;
    } catch { warnings.push('Tables sociales non vérifiables.'); }
    try {
      const probe = await leaderboardSchemaProbe();
      checks.leaderboard = Boolean(probe.ok);
      if (!probe.ok && probe.message) warnings.push(probe.message);
    } catch { warnings.push('Classement non vérifiable.'); }
  } else {
    checks.social = true;
    checks.leaderboard = true;
    warnings.push('Supabase non configuré dans cet environnement : test local uniquement.');
  }
  checks.health = checks.api && checks.content && checks.diagnostics && checks.selftest && checks.preflight && checks.social && checks.leaderboard;
  const uniqueWarnings = [...new Set(warnings.filter(Boolean))].slice(0, 15);
  const readinessScore = Math.round(Object.values(checks).filter(Boolean).length / Object.keys(checks).length * 100);
  return send(res, 200, {
    ok: Boolean(checks.health),
    version: VERSION,
    mode: configured() ? 'supabase' : 'local-preview',
    readinessScore,
    checks,
    warnings: uniqueWarnings,
    durationMs: Date.now() - started,
    message: checks.health ? 'Contrôle final OK pour test privé.' : 'Contrôle final terminé avec points à surveiller.'
  });
}
const beta156PreviousRequestFeatureFlags = requestFeatureFlags;
requestFeatureFlags = function beta156RequestFeatureFlags() {
  return { ...beta156PreviousRequestFeatureFlags(), releaseReadiness: true, privateBetaGuard: true };
};
const beta156PreviousHandleRoute = handleRoute;
handleRoute = async function beta156HandleRoute(req, res, route) {
  if (route === 'system/release-check') return beta156SystemReleaseCheck(req, res);
  if (route === 'index') return send(res, 200, { ok: true, api: 'HistoDaily', version: VERSION, routes: [...new Set([...beta149RouteList(), 'system/diagnostics', 'system/release-check'])] });
  return beta156PreviousHandleRoute(req, res, route);
};
const beta156PreviousHandleHealth = handleHealth;
handleHealth = async function beta156HandleHealth(req, res) {
  try {
    let releasePayload = null;
    const fake = { status: () => ({ json: (p) => { releasePayload = p; return p; } }), setHeader: () => {} };
    await beta156SystemReleaseCheck({ ...req, query: {}, body: {} }, fake);
    const previous = { status: (code) => ({ json: (payload) => ({ code, payload }) }), setHeader: () => {} };
    const base = await beta156PreviousHandleHealth(req, previous);
    const payload = base?.payload || {};
    return send(res, 200, {
      ...payload,
      version: VERSION,
      deployment: {
        ...(payload.deployment || {}),
        exposedRoutes: 21,
        releaseCheckReady: Boolean(releasePayload?.ok),
        releaseCheckScore: Number(releasePayload?.readinessScore || 0),
        releaseCheckWarnings: releasePayload?.warnings || []
      },
      features: Array.from(new Set([...(payload.features || []), 'release-readiness', 'private-beta-guard']))
    });
  } catch {
    return beta156PreviousHandleHealth(req, res);
  }
};

module.exports = { handleRoute, handleRequest, VERSION };


/* BETA165 — classement serveur en XP total si disponible */
(() => { try { const oldAggregate = aggregate; aggregate = function beta165Aggregate(rows, scope) { const aggregated = oldAggregate(rows, scope) || []; const xpById = new Map(); for (const row of rows || []) { const id = cleanFriendCode(row.friend_code || '') || row.player_id || row.pseudo; if (!id) continue; xpById.set(id, Math.max(Number(xpById.get(id)||0), Number(row.xp || row.totalXp || 0))); } return aggregated.map(row => { const id = cleanFriendCode(row.friend_code || row.friendCode || '') || row.player_id || row.id || row.pseudo; const xp = Math.max(Number(row.xp||0), Number(xpById.get(id)||0)); const score = Math.max(Number(row.score||0), xp); return { ...row, xp, score, daily:score, week:score, year:score, scoreMode:'total_xp' }; }).sort((a,b)=>Number(b.score||0)-Number(a.score||0)||String(a.pseudo||'').localeCompare(String(b.pseudo||''),'fr')).map((row,index)=>({ ...row, rank:index+1 })); }; } catch {} })();
