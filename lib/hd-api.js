const { mysteries, dailyMystery } = require('./hd-data');
const { configured, request, safeText, todayKey } = require('./hd-supabase');

const VERSION = '1.0.0-beta.63';

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
  if (blocked.includes(guess)) return 'Trop large : le dossier attend un nom ou un concept plus précis.';
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
  const scope = ['daily', 'week', 'year', 'friends'].includes(req.query?.scope) ? req.query.scope : 'daily';
  const periodKey = safeText(req.query?.periodKey || todayKey(), 20);
  if (!configured()) return send(res, 200, { ok: true, scope, periodKey, mode: 'local-preview', rows: [], note: 'Aucun faux joueur : les classements restent vides tant qu’aucun score réel n’est enregistré.' });
  try {
    const path = queryFor(scope, periodKey);
    const rows = path ? await request(path) : [];
    let filtered = rows || [];
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
    return send(res, 200, { ok: true, scope, periodKey, mode: 'supabase', rows: aggregate(enriched, scope), profileSync: 'beta63' });
  } catch (error) {
    return send(res, 200, { ok: true, scope, periodKey, mode: 'supabase-error', rows: [], note: error.message, detail: error.body || null });
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
  if (!configured()) return send(res, 200, { ok: true, stored: false, mode: 'local-preview', message: 'Score reçu par l’API, mais Supabase n’est pas configuré : conservation locale.' });
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
    return send(res, 200, { ok: true, stored: false, mode: 'supabase-error', message: 'Base configurée mais écriture impossible : score conservé localement.', detail: error.message });
  }
}
async function handleFriends(req, res) {
  const body = readBody(req);
  const method = req.method || 'GET';
  const playerId = safeText(body.playerId || req.query?.playerId || '', 90);
  if (!configured()) return send(res, 200, { ok: true, mode: 'local-preview', friends: [], features: { addByCode: true, removeByCode: true, profiles: true, leaderboards: true, chat: false, inviteLinks: true }, message: 'Amis conservés sur cet appareil. La synchronisation en ligne s’activera quand Supabase sera configuré.' });
  try {
    if (method === 'POST') {
      const inputCode = cleanFriendCode(body.friendCode || '');
      const profile = await profileByFriendCode(inputCode);
      const row = {
        player_id: playerId,
        friend_player_id: profile?.player_id || null,
        friend_code: cleanFriendCode(profile?.friend_code || inputCode),
        friend_pseudo: safeText(profile?.pseudo || body.friendPseudo || body.pseudo || 'Ami', 32)
      };
      if (!row.player_id || !row.friend_code) return send(res, 400, { ok: false, message: 'playerId et friendCode requis' });
      if (row.friend_player_id && row.friend_player_id === playerId) return send(res, 400, { ok: false, message: 'Impossible de s’ajouter soi-même.' });
      await request('hd_friends?on_conflict=player_id,friend_code', { method: 'POST', prefer: 'resolution=merge-duplicates', body: [row] });
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
    } else if (method !== 'GET') {
      res.setHeader('Allow', 'GET, POST, DELETE');
      return send(res, 405, { ok: false, message: 'Méthode non autorisée' });
    }
    const rows = playerId ? await request(`hd_friends?select=friend_player_id,friend_code,friend_pseudo,created_at&player_id=eq.${encodeURIComponent(playerId)}&order=created_at.desc`) : [];
    const enriched = await enrichFriendRows(rows || []);
    return send(res, 200, { ok: true, mode: 'supabase', friends: enriched, features: { addByCode: true, removeByCode: true, profiles: true, leaderboards: true, chat: false, inviteLinks: true, profileRefresh: true } });
  } catch (error) {
    return send(res, 200, { ok: true, mode: 'supabase-error', friends: [], message: error.message, detail: error.body || null });
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
      return send(res, 200, { ok: true, stored: false, mode: 'supabase-error', version: VERSION, message: error.message, profile });
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
  if (!configured()) return send(res, 200, { ok: true, stored: false, mode: 'local-preview', message: 'Supabase non configuré : reset serveur ignoré.' });
  try {
    let path = `hd_scores?player_id=eq.${encodeURIComponent(playerId)}`;
    if (clear === 'today') path += `&period_key=eq.${encodeURIComponent(periodKey)}`;
    if (mysteryId) path += `&mystery_id=eq.${encodeURIComponent(mysteryId)}`;
    await request(path, { method: 'DELETE', prefer: 'return=minimal' });
    return send(res, 200, { ok: true, mode: 'supabase', cleared: clear, periodKey, message: clear === 'today' ? 'Score serveur du jour effacé.' : 'Scores serveur effacés.' });
  } catch (error) {
    return send(res, 200, { ok: false, mode: 'supabase-error', message: 'Impossible de réinitialiser le score serveur.', detail: error.message, body: error.body || null });
  }
}
function handleDailyMystery(req, res) {
  const m = dailyMystery();
  return send(res, 200, { ok: true, mystery: { id: m.id, difficulty: m.difficulty, caseTitle: m.caseTitle || 'Dossier à identifier', prompt: m.prompt, lessonId: m.lessonId, clueCount: Math.min(3, (m.clues || []).length), reward: { dailyGems: 1, archiveUnlockCost: 2, streakBonusEvery: 7 } } });
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
function handleHealth(req, res) {
  return send(res, 200, {
    ok: true,
    app: 'HistoDaily',
    version: VERSION,
    target: 'vercel',
    deployment: { apiMode: 'file-router-under-hobby-limit', hobbySafe: true, serverlessFunctions: 10, routeFix: 'beta63 social cleanup and friend delete sync' },
    content: {
      mysteries: mysteries.length,
      archiveDaysVisible: 7,
      archiveUnlockCost: 2,
      dailyRewardGems: 1,
      premiumCourses: 192,
      pseudoLocal: true,
      scoreBreakdown: true,
      spoilerFreeShare: true,
      installPrompt: true,
      localBackupExport: true,
      friendCodeLocal: true,
      performanceMode: true,
      qualityDiagnostic: true,
      downloadableBackup: true,
      learnFilters: true,
      learnSearch: true,
      sessionCoach: true,
      normalizedQuizExplanations: true,
      keyFactsEveryCourse: true,
      contentWeakPointPass: true,
      premiumKeyFactsRendered: true,
      thirtySecondTakeaways: false,
      lessonMemoCards: false,
      beta44FoundationsContentPass: true,
      beta46NavigationMemoPass: true,
      beta47InputFocusFix: true,
      beta47LessonTabs: true,
      beta49DebugHomeCleanup: true,
      beta49CourseValidateFix: true,
      beta49ExpressStrengthened: true,
      beta50IndependentDailyCourse: true,
      beta50NoTraceTrapExpress: true,
      beta50MysteryLinkedCourseAfterSolveOnly: true,
      beta51ContentSanitizer: true,
      beta51DebugAudit: true,
      beta51LockedSpoilerCourse: true,
      beta51MultiplayerFoundationOnly: true,
      beta52FriendsProfilesLeaderboards: true,
      friendProfilesLocal: true,
      noChatByDesign: true,
      serverMultiplayerReady: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
      beta54InviteLinks: true,
      beta54ScoreSubmitApi: true,
      beta54SupabaseOptional: true,
      beta54NoChatStill: true,
      beta55TextInputHardening: true,
      beta55ResetUrl: true,
      beta55PseudoPromptFallback: true,
      beta56ProfileSaveFix: true,
      beta56PseudoNormalSaveFix: true,
      beta56ProfilePostApi: true,
      beta57LessonDisclosureFix: true,
      beta57NoAutoRerenderOnLessonFocus: true,
      beta58NoFakeFriends: true,
      beta58NoDemoLeaderboardRows: true,
      beta58VisibleProgressReset: true,
      beta58ServerScoreResetApi: true,
      beta60SingleApiFunction: true,
      beta60HobbyPlanSafe: true,
      beta61LeaderboardProfileSync: true,
      beta61GuestPseudoFix: true,
      beta63FriendSyncFetch: true,
      beta63StableFriendCode: true,
      beta63CanonicalLeaderboardNames: true,
      beta63FriendDeleteSync: true,
      beta63UiCopyCleanup: true,
      beta63FriendLeaderboardRefresh: true
    }
  });
}

async function handleRoute(req, res, route) {
  try {
    if (route === 'health') return handleHealth(req, res);
    if (route === 'index') return send(res, 200, { ok: true, api: 'HistoDaily', version: VERSION, routes: ['health','me','daily-mystery','daily-mystery/guess','daily-mystery/hint','leaderboard/daily','leaderboard/submit','friends/sync','progress/reset'] });
    if (route === 'me') return handleMe(req, res);
    if (route === 'auth/anonymous') return send(res, 200, { ok: true, mode: configured() ? 'server-ready' : 'local-session', token: 'local-session', profile: { pseudo: 'Invité' }, message: 'Authentification anonyme préparée. Aucun compte obligatoire dans cette phase.' });
    if (route === 'daily-mystery') return handleDailyMystery(req, res);
    if (route === 'daily-mystery/start') return send(res, 200, { ok: true, startedAt: new Date().toISOString() });
    if (route === 'daily-mystery/hint') return handleHint(req, res);
    if (route === 'daily-mystery/guess') return handleGuess(req, res);
    if (route === 'leaderboard/daily') return handleLeaderboard(req, res);
    if (route === 'leaderboard/submit') return handleSubmit(req, res);
    if (route === 'friends/sync') return handleFriends(req, res);
    if (route === 'sync/batch') return send(res, 200, { ok: true, synced: true });
    if (route === 'profiles/demo') return send(res, 410, { ok: false, mode: 'removed', message: 'Les profils démo ont été supprimés : seuls les profils et scores synchronisés sont affichés.' });
    if (route === 'progress/reset') return handleReset(req, res);
    return send(res, 404, { ok: false, message: 'Route API inconnue', route, version: VERSION });
  } catch (error) {
    return send(res, 500, { ok: false, message: 'Erreur API HistoDaily', route, error: error.message, version: VERSION });
  }
}

async function handleRequest(req, res) {
  return handleRoute(req, res, routeFromReq(req));
}

module.exports = { handleRoute, handleRequest, VERSION };
