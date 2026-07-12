const { configured, request, safeText, todayKey } = require('./hd-supabase');

const VERSION = '1.0.0-beta.271.0';
const SCORE_SCOPE = 'daily';

function send(res, status, payload) {
  try {
    res.setHeader?.('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.setHeader?.('Pragma', 'no-cache');
    res.setHeader?.('X-HistoDaily-Social-Version', VERSION);
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

function queryOf(req) {
  if (req.query && typeof req.query === 'object') return req.query;
  try {
    const url = new URL(req.url || '/', 'https://histodaily.local');
    return Object.fromEntries(url.searchParams.entries());
  } catch {
    return {};
  }
}

function cleanCode(value = '') {
  return safeText(value, 48).toUpperCase().replace(/\s+/g, '').replace(/[^A-Z0-9-]/g, '');
}

function cleanId(value = '') {
  return safeText(value, 90).replace(/[^A-Za-z0-9._:-]/g, '');
}

function cleanPseudo(value = '') {
  return safeText(value || 'Invité', 24) || 'Invité';
}

function int(value, min = 0, max = Number.MAX_SAFE_INTEGER) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return min;
  return Math.max(min, Math.min(max, Math.trunc(parsed)));
}

function scoreCap(difficulty = '') {
  switch (String(difficulty || '').toLowerCase()) {
    case 'facile': return 95;
    case 'difficile': return 150;
    case 'expert': return 180;
    default: return 120;
  }
}

function safeIso(value = '') {
  if (!value) return '';
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toISOString() : '';
}

function periodBounds(period = 'daily', query = {}) {
  const safePeriod = ['daily', 'week', 'year'].includes(period) ? period : 'daily';
  const now = new Date();
  const periodKey = safeText(query.periodKey || todayKey(now), 20);
  const suppliedStart = safeIso(query.rangeStart || '');
  const suppliedEnd = safeIso(query.rangeEnd || '');
  if (suppliedStart && suppliedEnd) return { period: safePeriod, periodKey, start: suppliedStart, end: suppliedEnd };

  const end = new Date(now);
  end.setUTCHours(24, 0, 0, 0);
  let start;
  if (safePeriod === 'year') {
    start = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
  } else if (safePeriod === 'week') {
    start = new Date(now);
    start.setUTCHours(0, 0, 0, 0);
    const day = start.getUTCDay() || 7;
    start.setUTCDate(start.getUTCDate() - day + 1);
  } else {
    start = new Date(now);
    start.setUTCHours(0, 0, 0, 0);
  }
  return { period: safePeriod, periodKey, start: start.toISOString(), end: end.toISOString() };
}

function profilePayload(input = {}, canonicalId = '', canonicalCode = '', previous = null) {
  const allowPseudoChange = Boolean(input.allowPseudoChange);
  const incomingPseudo = cleanPseudo(input.pseudo || 'Invité');
  const previousPseudo = cleanPseudo(previous?.pseudo || 'Invité');
  const previousIsGuest = /^(invité|invite|joueur|local-player)$/i.test(previousPseudo);
  return {
    player_id: canonicalId || cleanId(input.playerId || input.player_id || ''),
    pseudo: allowPseudoChange || previousIsGuest ? incomingPseudo : previousPseudo,
    friend_code: canonicalCode || cleanCode(input.friendCode || input.myFriendCode || input.friend_code || ''),
    level: Math.max(int(previous?.level, 1), int(input.level, 1)),
    xp: Math.max(int(previous?.xp), int(input.xp)),
    solved_count: Math.max(int(previous?.solved_count), int(input.solvedCount ?? input.solved_count)),
    streak: Math.max(int(previous?.streak), int(input.streak)),
    updated_at: new Date().toISOString()
  };
}

async function profileById(playerId = '') {
  const id = cleanId(playerId);
  if (!id) return null;
  const rows = await request(`hd_profiles?select=player_id,pseudo,friend_code,level,xp,solved_count,streak,updated_at&player_id=eq.${encodeURIComponent(id)}&limit=1`);
  return rows?.[0] || null;
}

async function profileByCode(friendCode = '') {
  const code = cleanCode(friendCode);
  if (!code) return null;
  const rows = await request(`hd_profiles?select=player_id,pseudo,friend_code,level,xp,solved_count,streak,updated_at&friend_code=eq.${encodeURIComponent(code)}&limit=1`);
  return rows?.[0] || null;
}

async function resolveIdentity(input = {}) {
  const incomingId = cleanId(input.playerId || input.player_id || '');
  const incomingCode = cleanCode(input.friendCode || input.myFriendCode || input.friend_code || '');
  if (!incomingId) throw Object.assign(new Error('Identité locale absente.'), { status: 400 });

  let byCode = incomingCode ? await profileByCode(incomingCode).catch(() => null) : null;
  let byId = await profileById(incomingId).catch(() => null);
  let previous = byCode || byId || null;
  let canonicalId = cleanId(previous?.player_id || incomingId);
  let canonicalCode = cleanCode(previous?.friend_code || incomingCode);
  let payload = profilePayload(input, canonicalId, canonicalCode, previous);
  const allowPseudoChange = Boolean(input.allowPseudoChange);

  // Chemin normal : fusion monotone et atomique dans PostgreSQL.
  try {
    const rows = await request('rpc/hd_merge_profile', {
      method: 'POST',
      prefer: 'return=representation',
      body: {
        p_player_id: payload.player_id,
        p_pseudo: payload.pseudo,
        p_friend_code: payload.friend_code,
        p_level: payload.level,
        p_xp: payload.xp,
        p_solved_count: payload.solved_count,
        p_streak: payload.streak,
        p_allow_pseudo_change: allowPseudoChange
      }
    });
    if (rows?.[0]) {
      const profile = rows[0];
      return {
        profile,
        canonicalPlayerId: cleanId(profile.player_id || canonicalId),
        canonicalFriendCode: cleanCode(profile.friend_code || canonicalCode),
        adopted: cleanId(profile.player_id || canonicalId) !== incomingId,
        mode: 'supabase-atomic'
      };
    }
  } catch {}

  // Repli compatible : compare-and-swap sur updated_at. Les statistiques ne
  // peuvent pas régresser même si deux appareils écrivent en même temps.
  for (let attempt = 0; attempt < 5; attempt += 1) {
    byCode = incomingCode ? await profileByCode(incomingCode).catch(() => null) : null;
    byId = await profileById(incomingId).catch(() => null);
    previous = byCode || byId || null;
    canonicalId = cleanId(previous?.player_id || incomingId);
    canonicalCode = cleanCode(previous?.friend_code || incomingCode);
    payload = profilePayload(input, canonicalId, canonicalCode, previous);

    if (previous?.player_id) {
      const stamp = previous.updated_at;
      const stampFilter = stamp ? `updated_at=eq.${encodeURIComponent(stamp)}` : 'updated_at=is.null';
      const rows = await request(`hd_profiles?player_id=eq.${encodeURIComponent(canonicalId)}&${stampFilter}&select=player_id,pseudo,friend_code,level,xp,solved_count,streak,updated_at`, {
        method: 'PATCH', prefer: 'return=representation', body: payload
      }).catch(() => []);
      if (rows?.[0]) {
        const profile = rows[0];
        return { profile, canonicalPlayerId: cleanId(profile.player_id), canonicalFriendCode: cleanCode(profile.friend_code), adopted: cleanId(profile.player_id) !== incomingId, mode: 'supabase-cas' };
      }
      continue;
    }

    const rows = await request('hd_profiles?on_conflict=player_id', {
      method: 'POST', prefer: 'resolution=ignore-duplicates,return=representation', body: [payload]
    }).catch(() => []);
    if (rows?.[0]) {
      const profile = rows[0];
      return { profile, canonicalPlayerId: cleanId(profile.player_id), canonicalFriendCode: cleanCode(profile.friend_code), adopted: cleanId(profile.player_id) !== incomingId, mode: 'supabase-cas' };
    }
  }

  const latest = (incomingCode ? await profileByCode(incomingCode).catch(() => null) : null) || await profileById(incomingId).catch(() => null);
  if (latest) return { profile: latest, canonicalPlayerId: cleanId(latest.player_id), canonicalFriendCode: cleanCode(latest.friend_code), adopted: cleanId(latest.player_id) !== incomingId, mode: 'supabase-readback' };
  throw Object.assign(new Error('Conflit lors de la synchronisation du profil.'), { status: 409 });
}

function quoteIn(values = []) {
  return values.map(value => `"${String(value).replace(/"/g, '')}"`).join(',');
}

async function profilesByIds(ids = []) {
  const unique = [...new Set(ids.map(cleanId).filter(Boolean))].slice(0, 250);
  if (!unique.length) return [];
  return request(`hd_profiles?select=player_id,pseudo,friend_code,level,xp,solved_count,streak,updated_at&player_id=in.(${encodeURIComponent(quoteIn(unique))})`);
}

async function profilesByCodes(codes = []) {
  const unique = [...new Set(codes.map(cleanCode).filter(Boolean))].slice(0, 250);
  if (!unique.length) return [];
  return request(`hd_profiles?select=player_id,pseudo,friend_code,level,xp,solved_count,streak,updated_at&friend_code=in.(${encodeURIComponent(quoteIn(unique))})`);
}

async function acceptedRequestCandidates(playerId = '', ownFriendCode = '') {
  const id = cleanId(playerId);
  const ownCode = cleanCode(ownFriendCode);
  if (!id && !ownCode) return [];

  const clauses = [];
  if (id) {
    clauses.push(`requester_player_id.eq.${id}`);
    clauses.push(`target_player_id.eq.${id}`);
  }
  if (ownCode) {
    clauses.push(`requester_friend_code.eq.${ownCode}`);
    clauses.push(`target_friend_code.eq.${ownCode}`);
  }
  const select = 'id,requester_player_id,requester_friend_code,requester_pseudo,target_player_id,target_friend_code,target_pseudo,status,updated_at,created_at';
  const rows = await request(`hd_friend_requests?select=${select}&status=eq.accepted&or=(${encodeURIComponent(clauses.join(','))})&order=updated_at.desc`).catch(() => []);
  const candidates = [];

  for (const row of rows || []) {
    const requesterId = cleanId(row.requester_player_id);
    const requesterCode = cleanCode(row.requester_friend_code);
    const targetId = cleanId(row.target_player_id);
    const targetCode = cleanCode(row.target_friend_code);
    const requesterMatches = Boolean((id && requesterId === id) || (ownCode && requesterCode === ownCode));
    const targetMatches = Boolean((id && targetId === id) || (ownCode && targetCode === ownCode));
    if (requesterMatches === targetMatches) continue;

    if (requesterMatches) {
      candidates.push({
        playerId: targetId,
        friendCode: targetCode,
        pseudo: cleanPseudo(row.target_pseudo || 'Ami'),
        createdAt: row.updated_at || row.created_at || '',
        source: 'accepted-request'
      });
    } else {
      candidates.push({
        playerId: requesterId,
        friendCode: requesterCode,
        pseudo: cleanPseudo(row.requester_pseudo || 'Ami'),
        createdAt: row.updated_at || row.created_at || '',
        source: 'accepted-request'
      });
    }
  }
  return candidates;
}

async function friendRows(playerId = '', ownFriendCode = '') {
  const id = cleanId(playerId);
  const ownCode = cleanCode(ownFriendCode);
  if (!id && !ownCode) return [];

  const select = 'player_id,friend_player_id,friend_code,friend_pseudo,created_at';
  const outbound = id
    ? await request(`hd_friends?select=${select}&player_id=eq.${encodeURIComponent(id)}&order=created_at.asc`).catch(() => [])
    : [];

  // Une ancienne acceptation a parfois créé une seule des deux lignes de la
  // relation. On lit donc aussi les lignes qui pointent vers le joueur. Cette
  // lecture est sans écriture : elle répare l'affichage sans recréer un ami.
  const incomingClauses = [];
  if (id) incomingClauses.push(`friend_player_id.eq.${id}`);
  if (ownCode) incomingClauses.push(`friend_code.eq.${ownCode}`);
  const inbound = incomingClauses.length
    ? await request(`hd_friends?select=${select}&or=(${encodeURIComponent(incomingClauses.join(','))})&order=created_at.asc`).catch(() => [])
    : [];
  // Une demande marquée « accepted » est une preuve d'amitié. Elle sert de
  // filet de sécurité si les deux lignes hd_friends n'ont pas été écrites,
  // ou si un identifiant local a changé après une réinstallation de la PWA.
  const accepted = await acceptedRequestCandidates(id, ownCode);

  const candidates = [];
  for (const row of outbound || []) {
    candidates.push({
      playerId: cleanId(row.friend_player_id),
      friendCode: cleanCode(row.friend_code),
      pseudo: cleanPseudo(row.friend_pseudo || 'Ami'),
      createdAt: row.created_at || '',
      source: 'outbound'
    });
  }
  for (const row of inbound || []) {
    const ownerId = cleanId(row.player_id);
    if (!ownerId || ownerId === id) continue;
    candidates.push({
      playerId: ownerId,
      friendCode: '',
      pseudo: 'Ami',
      createdAt: row.created_at || '',
      source: 'inbound'
    });
  }
  candidates.push(...accepted);

  const ids = [...new Set(candidates.map(item => cleanId(item.playerId)).filter(Boolean))];
  const codes = [...new Set(candidates.map(item => cleanCode(item.friendCode)).filter(Boolean))];
  const [profilesByPlayer, profilesByFriendCode] = await Promise.all([
    profilesByIds(ids).catch(() => []),
    profilesByCodes(codes).catch(() => [])
  ]);
  const byId = new Map((profilesByPlayer || []).map(profile => [cleanId(profile.player_id), profile]));
  const byCode = new Map((profilesByFriendCode || []).map(profile => [cleanCode(profile.friend_code), profile]));
  const merged = new Map();

  for (const candidate of candidates) {
    const storedId = cleanId(candidate.playerId);
    const storedCode = cleanCode(candidate.friendCode);
    const profile = byId.get(storedId) || byCode.get(storedCode) || null;
    const friendId = cleanId(profile?.player_id || storedId);
    const friendCode = cleanCode(profile?.friend_code || storedCode);
    if ((friendId && friendId === id) || (friendCode && friendCode === ownCode)) continue;
    const key = friendId || (friendCode ? `code:${friendCode}` : '');
    if (!key) continue;

    const next = {
      playerId: friendId,
      id: friendId || friendCode,
      friendCode,
      code: friendCode,
      pseudo: cleanPseudo(profile?.pseudo || candidate.pseudo || 'Ami'),
      name: cleanPseudo(profile?.pseudo || candidate.pseudo || 'Ami'),
      level: int(profile?.level, 1),
      xp: int(profile?.xp),
      solvedCount: int(profile?.solved_count),
      streak: int(profile?.streak),
      createdAt: candidate.createdAt || '',
      relationSource: candidate.source
    };
    const previous = merged.get(key);
    if (!previous) {
      merged.set(key, next);
    } else {
      merged.set(key, {
        ...previous,
        ...next,
        playerId: next.playerId || previous.playerId,
        id: next.playerId || previous.playerId || next.friendCode || previous.friendCode,
        friendCode: next.friendCode || previous.friendCode,
        code: next.friendCode || previous.friendCode,
        pseudo: next.pseudo !== 'Ami' ? next.pseudo : previous.pseudo,
        name: next.name !== 'Ami' ? next.name : previous.name,
        relationSource: previous.relationSource === next.relationSource ? previous.relationSource : 'reciprocal'
      });
    }
  }

  return [...merged.values()].sort((a, b) => a.pseudo.localeCompare(b.pseudo, 'fr'));
}

function normalizeRequest(row = {}, meId = '', meCode = '') {
  const requesterId = cleanId(row.requester_player_id);
  const requesterCode = cleanCode(row.requester_friend_code);
  const targetId = cleanId(row.target_player_id);
  const targetCode = cleanCode(row.target_friend_code);
  const incoming = (targetId && targetId === meId) || (!targetId && targetCode && targetCode === meCode);
  return {
    id: String(row.id || ''),
    requestId: String(row.id || ''),
    status: row.status || 'pending',
    direction: incoming ? 'incoming' : 'outgoing',
    requesterPlayerId: requesterId,
    requesterFriendCode: requesterCode,
    requesterPseudo: cleanPseudo(row.requester_pseudo || 'Joueur'),
    targetPlayerId: targetId,
    targetFriendCode: targetCode,
    targetPseudo: cleanPseudo(row.target_pseudo || 'Joueur'),
    otherPlayerId: incoming ? requesterId : targetId,
    otherFriendCode: incoming ? requesterCode : targetCode,
    otherPseudo: incoming ? cleanPseudo(row.requester_pseudo || 'Joueur') : cleanPseudo(row.target_pseudo || 'Joueur'),
    createdAt: row.created_at || '',
    updatedAt: row.updated_at || ''
  };
}

async function requestRows(playerId = '', friendCode = '') {
  const id = cleanId(playerId);
  const code = cleanCode(friendCode);
  if (!id && !code) return { incoming: [], outgoing: [] };
  const clauses = [];
  if (id) {
    clauses.push(`requester_player_id.eq.${id}`);
    clauses.push(`target_player_id.eq.${id}`);
  }
  if (code) clauses.push(`target_friend_code.eq.${code}`);
  const path = `hd_friend_requests?select=id,requester_player_id,requester_friend_code,requester_pseudo,target_player_id,target_friend_code,target_pseudo,status,created_at,updated_at&status=eq.pending&or=(${encodeURIComponent(clauses.join(','))})&order=created_at.asc`;
  const rows = await request(path);
  const normalized = (rows || []).map(row => normalizeRequest(row, id, code));
  return {
    incoming: normalized.filter(row => row.direction === 'incoming'),
    outgoing: normalized.filter(row => row.direction === 'outgoing')
  };
}

async function repairAcceptedFriendPairs(identity, friends = []) {
  const me = identityShape(identity.profile);
  const repairable = (friends || []).filter(friend =>
    friend.relationSource === 'accepted-request' && friend.playerId && friend.friendCode
  ).slice(0, 20);
  if (!repairable.length) return 0;
  const results = await Promise.allSettled(repairable.map(friend => ensureFriendPair(me, {
    playerId: cleanId(friend.playerId),
    friendCode: cleanCode(friend.friendCode),
    pseudo: cleanPseudo(friend.pseudo || friend.name || 'Ami')
  })));
  return results.filter(result => result.status === 'fulfilled').length;
}

async function snapshot(identity) {
  let [friends, requests] = await Promise.all([
    friendRows(identity.canonicalPlayerId, identity.canonicalFriendCode),
    requestRows(identity.canonicalPlayerId, identity.canonicalFriendCode)
  ]);
  // Le serveur répare les relations acceptées incomplètes, mais l'affichage
  // n'attend jamais cette réparation : accepted-request est déjà une source
  // autoritaire pour montrer l'ami, même à zéro point.
  const repaired = await repairAcceptedFriendPairs(identity, friends).catch(() => 0);
  if (repaired) friends = await friendRows(identity.canonicalPlayerId, identity.canonicalFriendCode);
  return { friends, requests, repairedFriendPairs: repaired };
}

function aggregateScores(rows = [], profiles = [], includeIds = [], seedPlayers = []) {
  const profileMap = new Map((profiles || []).map(profile => [cleanId(profile.player_id), profile]));
  const players = new Map();
  const keyByCode = new Map();
  const scoreKeys = new Map();

  function seedPlayer(raw = {}) {
    const playerId = cleanId(raw.playerId || raw.player_id || raw.id || '');
    const friendCode = cleanCode(raw.friendCode || raw.friend_code || raw.code || '');
    const key = playerId || (friendCode ? `code:${friendCode}` : '');
    if (!key) return;
    const profile = profileMap.get(playerId) || {};
    const existing = players.get(key) || {};
    const row = {
      playerId,
      id: playerId || friendCode,
      pseudo: cleanPseudo(profile.pseudo || raw.pseudo || raw.name || existing.pseudo || 'Joueur'),
      name: cleanPseudo(profile.pseudo || raw.pseudo || raw.name || existing.name || 'Joueur'),
      friendCode: cleanCode(profile.friend_code || friendCode || existing.friendCode || ''),
      code: cleanCode(profile.friend_code || friendCode || existing.friendCode || ''),
      score: int(existing.score),
      solvedInPeriod: int(existing.solvedInPeriod),
      level: Math.max(int(existing.level, 1), int(profile.level, 1), int(raw.level, 1)),
      xp: Math.max(int(existing.xp), int(profile.xp), int(raw.xp)),
      solvedCount: Math.max(int(existing.solvedCount), int(profile.solved_count), int(raw.solvedCount || raw.solved_count)),
      streak: Math.max(int(existing.streak), int(profile.streak), int(raw.streak))
    };
    players.set(key, row);
    if (row.friendCode) keyByCode.set(row.friendCode, key);
  }

  for (const rawId of includeIds || []) {
    const playerId = cleanId(rawId);
    if (!playerId) continue;
    seedPlayer({ ...(profileMap.get(playerId) || {}), playerId });
  }
  for (const seed of seedPlayers || []) seedPlayer(seed);

  for (const scoreRow of rows || []) {
    const playerId = cleanId(scoreRow.player_id);
    if (!playerId) continue;
    const profile = profileMap.get(playerId) || {};
    const rowCode = cleanCode(profile.friend_code || scoreRow.friend_code || '');
    const oldKey = rowCode ? keyByCode.get(rowCode) : '';
    if (oldKey && oldKey !== playerId && players.has(oldKey) && !players.has(playerId)) {
      const migrated = players.get(oldKey);
      players.delete(oldKey);
      players.set(playerId, { ...migrated, playerId, id: playerId });
      keyByCode.set(rowCode, playerId);
    }

    const dedupeKey = `${safeText(scoreRow.period_key || '', 20)}|${safeText(scoreRow.mystery_id || '', 100) || safeText(scoreRow.solved_at || '', 40)}`;
    if (!scoreKeys.has(playerId)) scoreKeys.set(playerId, new Set());
    if (scoreKeys.get(playerId).has(dedupeKey)) continue;
    scoreKeys.get(playerId).add(dedupeKey);

    const current = players.get(playerId) || {
      playerId,
      id: playerId,
      pseudo: cleanPseudo(profile.pseudo || scoreRow.pseudo || 'Joueur'),
      name: cleanPseudo(profile.pseudo || scoreRow.pseudo || 'Joueur'),
      friendCode: rowCode,
      code: rowCode,
      score: 0,
      solvedInPeriod: 0,
      level: Math.max(int(profile.level, 1), int(scoreRow.level, 1)),
      xp: Math.max(int(profile.xp), int(scoreRow.xp)),
      solvedCount: Math.max(int(profile.solved_count), int(scoreRow.solved_count)),
      streak: Math.max(int(profile.streak), int(scoreRow.streak))
    };
    current.score += Math.min(int(scoreRow.score), scoreCap(scoreRow.difficulty));
    current.solvedInPeriod += 1;
    current.level = Math.max(int(current.level, 1), int(profile.level, 1), int(scoreRow.level, 1));
    current.xp = Math.max(int(current.xp), int(profile.xp), int(scoreRow.xp));
    current.solvedCount = Math.max(int(current.solvedCount), int(profile.solved_count), int(scoreRow.solved_count));
    current.streak = Math.max(int(current.streak), int(profile.streak), int(scoreRow.streak));
    players.set(playerId, current);
    if (rowCode) keyByCode.set(rowCode, playerId);
  }

  const sorted = [...players.values()].sort((a, b) => b.score - a.score || a.pseudo.localeCompare(b.pseudo, 'fr') || a.friendCode.localeCompare(b.friendCode));
  let previousScore = null;
  let previousRank = 0;
  return sorted.map((row, index) => {
    const rank = previousScore !== null && previousScore === row.score ? previousRank : index + 1;
    previousScore = row.score;
    previousRank = rank;
    return { ...row, rank };
  });
}

async function leaderboardRows({ period, audience, identity, query }) {
  const bounds = periodBounds(period, query);
  let friends = [];
  let includeIds = [identity.canonicalPlayerId];
  const seedPlayers = [identityShape(identity.profile)];
  if (audience === 'friends') {
    friends = await friendRows(identity.canonicalPlayerId, identity.canonicalFriendCode);
    includeIds.push(...friends.map(friend => friend.playerId));
    seedPlayers.push(...friends);
  }
  includeIds = [...new Set(includeIds.map(cleanId).filter(Boolean))];

  let filter = `scope=eq.${SCORE_SCOPE}`;
  if (bounds.period === 'daily') {
    filter += `&period_key=eq.${encodeURIComponent(bounds.periodKey)}`;
  } else {
    filter += `&solved_at=gte.${encodeURIComponent(bounds.start)}&solved_at=lt.${encodeURIComponent(bounds.end)}`;
  }
  if (audience === 'friends') {
    // Les amis sans identifiant canonique restent visibles à zéro grâce aux
    // seedPlayers. Seuls les identifiants connus servent à filtrer les scores.
    if (!includeIds.length) return { rows: [], bounds, friendCount: friends.length, zeroScoreFriendCount: friends.length };
    filter += `&player_id=in.(${encodeURIComponent(quoteIn(includeIds))})`;
  }

  const limit = audience === 'friends' ? 1000 : 2000;
  const scores = await request(`hd_scores?select=player_id,pseudo,friend_code,mystery_id,period_key,score,difficulty,level,xp,solved_count,streak,solved_at&${filter}&order=score.desc&limit=${limit}`);
  const profileIds = [...new Set([...(scores || []).map(row => cleanId(row.player_id)), ...includeIds].filter(Boolean))];
  const profiles = await profilesByIds(profileIds).catch(() => []);
  let rows = aggregateScores(scores || [], profiles || [], includeIds, seedPlayers);
  if (audience === 'general') rows = rows.filter(row => row.score > 0 || row.playerId === identity.canonicalPlayerId);
  const zeroScoreFriendCount = audience === 'friends'
    ? rows.filter(row => row.playerId !== identity.canonicalPlayerId && int(row.score) === 0).length
    : 0;
  return {
    rows: rows.slice(0, audience === 'friends' ? 250 : 100),
    bounds,
    friendCount: friends.length,
    zeroScoreFriendCount
  };
}

async function ensureFriendPair(a, b) {
  const pairs = [[a, b], [b, a]];
  for (let attempt = 0; attempt < 3; attempt += 1) {
    for (const [owner, other] of pairs) {
      const payload = {
        player_id: owner.playerId,
        friend_player_id: other.playerId,
        friend_code: other.friendCode,
        friend_pseudo: other.pseudo,
        created_at: new Date().toISOString()
      };
      try {
        await request('hd_friends?on_conflict=player_id,friend_code', {
          method: 'POST', prefer: 'resolution=merge-duplicates,return=minimal', body: [payload]
        });
      } catch {
        // Compatibilité avec un schéma ancien : mise à jour si la relation existe,
        // insertion sinon. Le tour suivant vérifie les deux directions.
        const relationFilter = `or=(${encodeURIComponent(`friend_player_id.eq.${other.playerId},friend_code.eq.${other.friendCode}`)})`;
        const existing = await request(`hd_friends?select=player_id&player_id=eq.${encodeURIComponent(owner.playerId)}&${relationFilter}&limit=1`).catch(() => []);
        if (existing?.[0]) {
          await request(`hd_friends?player_id=eq.${encodeURIComponent(owner.playerId)}&${relationFilter}`, {
            method: 'PATCH', prefer: 'return=minimal', body: { friend_player_id: other.playerId, friend_code: other.friendCode, friend_pseudo: other.pseudo }
          }).catch(() => null);
        } else {
          await request('hd_friends', { method: 'POST', prefer: 'return=minimal', body: [payload] }).catch(() => null);
        }
      }
    }
    const [left, right] = await Promise.all([
      request(`hd_friends?select=friend_player_id&player_id=eq.${encodeURIComponent(a.playerId)}&friend_player_id=eq.${encodeURIComponent(b.playerId)}&limit=1`).catch(() => []),
      request(`hd_friends?select=friend_player_id&player_id=eq.${encodeURIComponent(b.playerId)}&friend_player_id=eq.${encodeURIComponent(a.playerId)}&limit=1`).catch(() => [])
    ]);
    if (left?.[0] && right?.[0]) return { reciprocal: true, attempts: attempt + 1 };
  }
  throw Object.assign(new Error('Relation réciproque incomplète.'), { status: 503 });
}

function identityShape(profile = {}) {
  return {
    playerId: cleanId(profile.player_id),
    friendCode: cleanCode(profile.friend_code),
    pseudo: cleanPseudo(profile.pseudo),
    level: int(profile.level, 1),
    xp: int(profile.xp),
    solvedCount: int(profile.solved_count),
    streak: int(profile.streak)
  };
}


async function upsertBestScore(payload = {}) {
  try {
    const rows = await request('rpc/hd_upsert_best_score', {
      method: 'POST', prefer: 'return=representation', body: {
        p_player_id: payload.player_id,
        p_pseudo: payload.pseudo,
        p_friend_code: payload.friend_code,
        p_mystery_id: payload.mystery_id,
        p_period_key: payload.period_key,
        p_score: payload.score,
        p_hints: payload.hints,
        p_tries: payload.tries,
        p_difficulty: payload.difficulty,
        p_level: payload.level,
        p_xp: payload.xp,
        p_solved_count: payload.solved_count,
        p_streak: payload.streak,
        p_solved_at: payload.solved_at
      }
    });
    if (rows?.[0]) return { rows, mode: 'supabase-atomic' };
  } catch {}

  const conflict = 'player_id,mystery_id,period_key,scope';
  const inserted = await request(`hd_scores?on_conflict=${conflict}`, {
    method: 'POST', prefer: 'resolution=ignore-duplicates,return=representation', body: [payload]
  }).catch(() => []);
  if (inserted?.[0]) return { rows: inserted, mode: 'supabase-cas' };

  const cap = scoreCap(payload.difficulty);
  const base = `hd_scores?player_id=eq.${encodeURIComponent(payload.player_id)}&mystery_id=eq.${encodeURIComponent(payload.mystery_id)}&period_key=eq.${encodeURIComponent(payload.period_key)}&scope=eq.${SCORE_SCOPE}`;
  const improved = await request(`${base}&or=(${encodeURIComponent(`score.lt.${payload.score},score.gt.${cap}`)})&select=player_id,pseudo,friend_code,mystery_id,period_key,scope,score,hints,tries,difficulty,level,xp,solved_count,streak,solved_at`, {
    method: 'PATCH', prefer: 'return=representation', body: payload
  }).catch(() => []);
  if (improved?.[0]) return { rows: improved, mode: 'supabase-cas' };

  const current = await request(`${base}&select=player_id,pseudo,friend_code,mystery_id,period_key,scope,score,hints,tries,difficulty,level,xp,solved_count,streak,solved_at&limit=1`);
  if (current?.[0]) return { rows: current, mode: 'supabase-cas-readback' };
  throw Object.assign(new Error('Conflit lors de l’enregistrement du score.'), { status: 409 });
}

async function cancelPendingPairRequests(a, b) {
  const pairFilter = `and(requester_player_id.eq.${a.playerId},target_player_id.eq.${b.playerId}),and(requester_player_id.eq.${b.playerId},target_player_id.eq.${a.playerId})`;
  return request(`hd_friend_requests?status=eq.pending&or=(${encodeURIComponent(pairFilter)})`, {
    method: 'PATCH', prefer: 'return=minimal', body: { status: 'cancelled', updated_at: new Date().toISOString() }
  }).catch(() => null);
}

async function handleBootstrap(req, res) {
  if (String(req.method || 'GET').toUpperCase() !== 'POST') return send(res, 405, { ok: false, message: 'POST requis.' });
  if (!configured()) return send(res, 503, { ok: false, mode: 'not-configured', message: 'Supabase n’est pas configuré sur Vercel.' });
  const body = readBody(req);
  const identity = await resolveIdentity(body);
  const social = await snapshot(identity);
  return send(res, 200, {
    ok: true,
    mode: 'supabase',
    authoritative: true,
    version: VERSION,
    profile: identityShape(identity.profile),
    canonicalPlayerId: identity.canonicalPlayerId,
    canonicalFriendCode: identity.canonicalFriendCode,
    adoptedCanonicalProfile: identity.adopted,
    friends: social.friends,
    requests: social.requests,
    repairedFriendPairs: int(social.repairedFriendPairs),
    generatedAt: new Date().toISOString()
  });
}

async function handleLeaderboard(req, res) {
  if (String(req.method || 'GET').toUpperCase() !== 'GET') return send(res, 405, { ok: false, message: 'GET requis.' });
  if (!configured()) return send(res, 503, { ok: false, mode: 'not-configured', message: 'Classement en ligne non configuré.' });
  const query = queryOf(req);
  const identity = await resolveIdentity({
    playerId: query.playerId,
    friendCode: query.friendCode || query.myFriendCode,
    pseudo: query.pseudo,
    level: query.level,
    xp: query.xp,
    solvedCount: query.solvedCount,
    streak: query.streak
  });
  const period = ['daily', 'week', 'year'].includes(query.period) ? query.period : 'daily';
  const audience = query.audience === 'friends' ? 'friends' : 'general';
  const result = await leaderboardRows({ period, audience, identity, query });
  const rows = result.rows.map(row => ({ ...row, me: row.playerId === identity.canonicalPlayerId }));
  return send(res, 200, {
    ok: true,
    mode: 'supabase',
    authoritative: true,
    version: VERSION,
    period,
    audience,
    periodKey: result.bounds.periodKey,
    rangeStart: result.bounds.start,
    rangeEnd: result.bounds.end,
    canonicalPlayerId: identity.canonicalPlayerId,
    canonicalFriendCode: identity.canonicalFriendCode,
    rows,
    friendCount: result.friendCount || 0,
    zeroScoreFriendCount: result.zeroScoreFriendCount || 0,
    generatedAt: new Date().toISOString()
  });
}

async function handleScore(req, res) {
  if (String(req.method || 'GET').toUpperCase() !== 'POST') return send(res, 405, { ok: false, message: 'POST requis.' });
  if (!configured()) return send(res, 503, { ok: false, stored: false, mode: 'not-configured', message: 'Score gardé localement : Supabase non configuré.' });
  const body = readBody(req);
  const mysteryId = safeText(body.mysteryId || body.mystery_id || '', 100);
  if (!mysteryId) return send(res, 400, { ok: false, stored: false, message: 'mysteryId requis.' });
  const identity = await resolveIdentity(body);
  const difficulty = safeText(body.difficulty || 'moyen', 20);
  const periodKey = safeText(body.dayKey || body.periodKey || todayKey(), 20);
  const payload = {
    player_id: identity.canonicalPlayerId,
    pseudo: cleanPseudo(identity.profile.pseudo),
    friend_code: identity.canonicalFriendCode,
    mystery_id: mysteryId,
    period_key: periodKey,
    scope: SCORE_SCOPE,
    score: Math.min(int(body.score), scoreCap(difficulty)),
    hints: int(body.hints),
    tries: int(body.tries || body.answerTries, 1),
    difficulty,
    level: int(identity.profile.level, 1),
    xp: int(identity.profile.xp),
    solved_count: int(identity.profile.solved_count),
    streak: int(identity.profile.streak),
    solved_at: Number.isFinite(Number(body.solvedAt)) ? new Date(Number(body.solvedAt)).toISOString() : new Date().toISOString()
  };

  const stored = await upsertBestScore(payload);
  const exactScore = int(stored.rows?.[0]?.score ?? payload.score);
  return send(res, 200, {
    ok: true,
    stored: true,
    mode: stored.mode,
    authoritative: true,
    bestScoreWins: true,
    exactScore,
    canonicalPlayerId: identity.canonicalPlayerId,
    canonicalFriendCode: identity.canonicalFriendCode,
    message: exactScore > payload.score ? 'Un meilleur score était déjà enregistré.' : 'Meilleur score enregistré dans le classement.'
  });
}

async function handleFriendRequest(req, res) {
  if (String(req.method || 'GET').toUpperCase() !== 'POST') return send(res, 405, { ok: false, message: 'POST requis.' });
  if (!configured()) return send(res, 503, { ok: false, mode: 'not-configured', message: 'Amis en ligne non configurés.' });
  const body = readBody(req);
  const targetCode = cleanCode(body.targetFriendCode || body.friendCodeTarget || body.code || '');
  if (!targetCode) return send(res, 400, { ok: false, message: 'Code ami requis.' });
  const meIdentity = await resolveIdentity(body);
  const me = identityShape(meIdentity.profile);
  const targetProfile = await profileByCode(targetCode);
  if (!targetProfile) return send(res, 404, { ok: false, message: 'Aucun profil ne correspond exactement à ce code ami.' });
  const target = identityShape(targetProfile);
  if (target.playerId === me.playerId || target.friendCode === me.friendCode) return send(res, 400, { ok: false, message: 'Tu ne peux pas t’ajouter toi-même.' });

  const existingFriend = await request(`hd_friends?select=player_id&player_id=eq.${encodeURIComponent(me.playerId)}&friend_player_id=eq.${encodeURIComponent(target.playerId)}&limit=1`).catch(() => []);
  if (existingFriend?.[0]) {
    await cancelPendingPairRequests(me, target);
    const social = await snapshot(meIdentity);
    return send(res, 200, { ok: true, mode: 'supabase', authoritative: true, alreadyFriend: true, friends: social.friends, requests: social.requests, message: `${target.pseudo} est déjà dans tes amis.` });
  }

  const between = await request(`hd_friend_requests?select=id,requester_player_id,target_player_id,status&status=eq.pending&or=(${encodeURIComponent(`and(requester_player_id.eq.${me.playerId},target_player_id.eq.${target.playerId}),and(requester_player_id.eq.${target.playerId},target_player_id.eq.${me.playerId})`)})&order=created_at.asc`).catch(() => []);
  const incoming = (between || []).find(row => cleanId(row.requester_player_id) === target.playerId && cleanId(row.target_player_id) === me.playerId);
  if (incoming) {
    const accepted = await request(`hd_friend_requests?id=eq.${encodeURIComponent(incoming.id)}&status=eq.pending&select=id,status`, {
      method: 'PATCH', prefer: 'return=representation', body: { status: 'accepted', updated_at: new Date().toISOString() }
    }).catch(() => []);
    if (!accepted?.[0]) {
      const latest = await request(`hd_friend_requests?select=id,status&id=eq.${encodeURIComponent(incoming.id)}&limit=1`).catch(() => []);
      if (latest?.[0]?.status !== 'accepted') {
        const social = await snapshot(meIdentity);
        return send(res, 409, { ok: false, mode: 'supabase', authoritative: true, terminalStatus: latest?.[0]?.status || 'unknown', friends: social.friends, requests: social.requests, message: 'La demande croisée a déjà été traitée sur un autre appareil.' });
      }
    }
    await ensureFriendPair(me, target);
    await cancelPendingPairRequests(me, target);
    const social = await snapshot(meIdentity);
    return send(res, 200, { ok: true, mode: 'supabase', authoritative: true, autoAccepted: true, friends: social.friends, requests: social.requests, message: `${target.pseudo} t’avait déjà envoyé une demande : vous êtes maintenant amis.` });
  }
  const outgoing = (between || []).find(row => cleanId(row.requester_player_id) === me.playerId && cleanId(row.target_player_id) === target.playerId);
  if (!outgoing) {
    await request('hd_friend_requests', {
      method: 'POST', prefer: 'return=minimal', body: [{
        requester_player_id: me.playerId,
        requester_friend_code: me.friendCode,
        requester_pseudo: me.pseudo,
        target_player_id: target.playerId,
        target_friend_code: target.friendCode,
        target_pseudo: target.pseudo,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]
    }).catch(() => null); // un envoi concurrent peut avoir créé la même demande
  }
  const social = await snapshot(meIdentity);
  return send(res, 200, { ok: true, mode: 'supabase', authoritative: true, friends: social.friends, requests: social.requests, message: outgoing ? `Demande déjà envoyée à ${target.pseudo}.` : `Demande envoyée à ${target.pseudo}.` });
}

async function handleFriendRespond(req, res) {
  if (String(req.method || 'GET').toUpperCase() !== 'POST') return send(res, 405, { ok: false, message: 'POST requis.' });
  if (!configured()) return send(res, 503, { ok: false, mode: 'not-configured', message: 'Amis en ligne non configurés.' });
  const body = readBody(req);
  const response = ['accept', 'accepted'].includes(String(body.response || '').toLowerCase()) ? 'accepted' : ['decline', 'declined'].includes(String(body.response || '').toLowerCase()) ? 'declined' : '';
  if (!response) return send(res, 400, { ok: false, message: 'Réponse invalide.' });
  const requestId = String(body.requestId || body.id || '').replace(/[^0-9]/g, '');
  if (!requestId) return send(res, 400, { ok: false, message: 'Demande invalide.' });
  const meIdentity = await resolveIdentity(body);
  const me = identityShape(meIdentity.profile);
  const select = 'id,requester_player_id,requester_friend_code,requester_pseudo,target_player_id,target_friend_code,target_pseudo,status';
  let rows = await request(`hd_friend_requests?select=${select}&id=eq.${encodeURIComponent(requestId)}&limit=1`);
  let row = rows?.[0];
  if (!row) return send(res, 404, { ok: false, message: 'Cette demande n’existe plus.' });
  const targetMatches = cleanId(row.target_player_id) === me.playerId || (!row.target_player_id && cleanCode(row.target_friend_code) === me.friendCode);
  if (!targetMatches) return send(res, 403, { ok: false, message: 'Cette demande ne t’est pas destinée.' });

  const requesterProfile = await profileById(row.requester_player_id).catch(() => null) || await profileByCode(row.requester_friend_code).catch(() => null);
  if (!requesterProfile) return send(res, 409, { ok: false, message: 'Le profil demandeur n’existe plus.' });
  const requester = identityShape(requesterProfile);

  if (row.status !== 'pending') {
    // Une décision terminale ne peut jamais être inversée par rejeu de requête.
    if (row.status === 'accepted' && response === 'accepted') {
      await ensureFriendPair(me, requester);
      await cancelPendingPairRequests(me, requester);
      const social = await snapshot(meIdentity);
      return send(res, 200, { ok: true, mode: 'supabase', authoritative: true, response: 'accepted', alreadyProcessed: true, friends: social.friends, requests: social.requests, message: 'Demande déjà acceptée.' });
    }
    const social = await snapshot(meIdentity);
    return send(res, 409, { ok: false, mode: 'supabase', authoritative: true, terminalStatus: row.status, friends: social.friends, requests: social.requests, message: row.status === 'declined' ? 'Cette demande a déjà été refusée.' : 'Cette demande a déjà été traitée.' });
  }

  const updated = await request(`hd_friend_requests?id=eq.${encodeURIComponent(requestId)}&status=eq.pending&select=${select}`, {
    method: 'PATCH', prefer: 'return=representation', body: { status: response, updated_at: new Date().toISOString() }
  }).catch(() => []);
  if (!updated?.[0]) {
    rows = await request(`hd_friend_requests?select=${select}&id=eq.${encodeURIComponent(requestId)}&limit=1`);
    row = rows?.[0];
    if (row?.status === 'accepted' && response === 'accepted') {
      await ensureFriendPair(me, requester);
      await cancelPendingPairRequests(me, requester);
      const social = await snapshot(meIdentity);
      return send(res, 200, { ok: true, mode: 'supabase', authoritative: true, response: 'accepted', alreadyProcessed: true, friends: social.friends, requests: social.requests, message: 'Demande déjà acceptée.' });
    }
    return send(res, 409, { ok: false, terminalStatus: row?.status || 'unknown', message: 'La demande a été traitée sur un autre appareil.' });
  }

  if (response === 'accepted') {
    await ensureFriendPair(me, requester);
    await cancelPendingPairRequests(me, requester);
  }
  const social = await snapshot(meIdentity);
  return send(res, 200, { ok: true, mode: 'supabase', authoritative: true, response, friends: social.friends, requests: social.requests, message: response === 'accepted' ? 'Demande acceptée.' : 'Demande refusée.' });
}

async function handleFriendDelete(req, res) {
  if (!['DELETE', 'POST'].includes(String(req.method || 'GET').toUpperCase())) return send(res, 405, { ok: false, message: 'DELETE requis.' });
  if (!configured()) return send(res, 503, { ok: false, mode: 'not-configured', message: 'Amis en ligne non configurés.' });
  const body = readBody(req);
  const meIdentity = await resolveIdentity(body);
  const me = identityShape(meIdentity.profile);
  let otherProfile = body.friendPlayerId ? await profileById(body.friendPlayerId).catch(() => null) : null;
  if (!otherProfile && body.targetPlayerId) otherProfile = await profileById(body.targetPlayerId).catch(() => null);
  if (!otherProfile && (body.friendCodeTarget || body.targetFriendCode || body.code)) otherProfile = await profileByCode(body.friendCodeTarget || body.targetFriendCode || body.code).catch(() => null);
  if (!otherProfile) return send(res, 404, { ok: false, message: 'Ami introuvable.' });
  const other = identityShape(otherProfile);

  const mineFilter = `or=(${encodeURIComponent(`friend_player_id.eq.${other.playerId},friend_code.eq.${other.friendCode}`)})`;
  const theirsFilter = `or=(${encodeURIComponent(`friend_player_id.eq.${me.playerId},friend_code.eq.${me.friendCode}`)})`;
  await Promise.all([
    request(`hd_friends?player_id=eq.${encodeURIComponent(me.playerId)}&${mineFilter}`, { method: 'DELETE', prefer: 'return=minimal' }),
    request(`hd_friends?player_id=eq.${encodeURIComponent(other.playerId)}&${theirsFilter}`, { method: 'DELETE', prefer: 'return=minimal' })
  ]);
  await request(`hd_friend_requests?status=eq.pending&or=(${encodeURIComponent(`and(requester_player_id.eq.${me.playerId},target_player_id.eq.${other.playerId}),and(requester_player_id.eq.${other.playerId},target_player_id.eq.${me.playerId})`)})`, {
    method: 'PATCH', prefer: 'return=minimal', body: { status: 'cancelled', updated_at: new Date().toISOString() }
  }).catch(() => null);
  const social = await snapshot(meIdentity);
  return send(res, 200, { ok: true, mode: 'supabase', authoritative: true, friends: social.friends, requests: social.requests, message: `${other.pseudo} a été retiré de tes amis.` });
}

async function handleProfile(req, res) {
  if (String(req.method || 'GET').toUpperCase() !== 'GET') return send(res, 405, { ok: false, message: 'GET requis.' });
  if (!configured()) return send(res, 503, { ok: false, mode: 'not-configured', message: 'Profil en ligne non configuré.' });
  const query = queryOf(req);
  const profile = query.playerId ? await profileById(query.playerId) : await profileByCode(query.friendCode || query.code);
  if (!profile) return send(res, 404, { ok: false, message: 'Profil introuvable.' });
  const target = identityShape(profile);
  // Le profil cible devient le joueur inclus de force dans chaque agrégation.
  // Son score reste donc lisible même s'il n'est pas dans le top 100 général.
  const identity = { canonicalPlayerId: target.playerId, canonicalFriendCode: target.friendCode, profile };
  const scores = {};
  for (const period of ['daily', 'week', 'year']) {
    const result = await leaderboardRows({ period, audience: 'general', identity, query });
    scores[period] = result.rows.find(row => row.playerId === target.playerId)?.score || 0;
  }
  return send(res, 200, { ok: true, mode: 'supabase', authoritative: true, profile: { ...target, scores }, generatedAt: new Date().toISOString() });
}

async function handleHealth(req, res) {
  const ready = configured();
  return send(res, ready ? 200 : 503, {
    ok: ready,
    version: VERSION,
    mode: ready ? 'supabase' : 'not-configured',
    architecture: 'single-social-engine-v2',
    sourceOfTruth: 'supabase',
    features: ['profiles', 'atomic-profile-merge', 'friend-requests', 'terminal-request-decisions', 'reciprocal-friends', 'daily-week-year-leaderboards', 'zero-score-friends', 'one-sided-friend-read-recovery', 'friend-code-zero-score-seeding', 'accepted-request-friend-recovery', 'reciprocal-friend-auto-heal', 'continuous-score-outbox-recovery', 'atomic-best-score']
  });
}

async function handleSocialV2(req, res, route) {
  if (!String(route || '').startsWith('social-v2')) return false;
  try {
    if (route === 'social-v2/health') return handleHealth(req, res);
    if (route === 'social-v2/bootstrap') return await handleBootstrap(req, res);
    if (route === 'social-v2/leaderboard') return await handleLeaderboard(req, res);
    if (route === 'social-v2/score') return await handleScore(req, res);
    if (route === 'social-v2/friends/request') return await handleFriendRequest(req, res);
    if (route === 'social-v2/friends/respond') return await handleFriendRespond(req, res);
    if (route === 'social-v2/friends/remove') return await handleFriendDelete(req, res);
    if (route === 'social-v2/profile') return await handleProfile(req, res);
    return send(res, 404, { ok: false, version: VERSION, message: 'Route sociale inconnue.' });
  } catch (error) {
    const rawStatus = Number(error?.status || 0);
    const status = rawStatus >= 400 && rawStatus <= 599 ? rawStatus : 500;
    const message = status >= 500 ? 'Le service social n’a pas répondu correctement.' : (error?.message || 'Requête sociale invalide.');
    console.error('[social-v2]', route, error?.message || error);
    return send(res, status, { ok: false, version: VERSION, mode: 'error', message });
  }
}

module.exports = {
  VERSION,
  handleSocialV2,
  _test: { cleanCode, cleanId, periodBounds, aggregateScores, friendRows, leaderboardRows, scoreCap, profilePayload, upsertBestScore }
};
