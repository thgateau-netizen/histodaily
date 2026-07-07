process.env.SUPABASE_URL = 'https://fake.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role';

const db = { profiles: [], scores: [], friends: [] };
function clean(v=''){ return String(v||'').toUpperCase().replace(/\s+/g,'').replace(/[^A-Z0-9-]/g,''); }
function suffix(v=''){ const p=clean(v).split('-').filter(Boolean); return p[p.length-1]||''; }
function textResponse(status, payload) {
  return { ok: status >= 200 && status < 300, status, async text(){ return payload === null ? '' : JSON.stringify(payload); } };
}
function paramEq(qs, name){ const v=qs.get(name); return v && v.startsWith('eq.') ? decodeURIComponent(v.slice(3)) : null; }
function applyProfileSelect(rows){ return rows.map(r => ({...r})); }
function profilesByPath(qs){
  let rows = db.profiles.slice();
  const playerEq = paramEq(qs, 'player_id');
  if (playerEq) rows = rows.filter(r => r.player_id === playerEq);
  const or = qs.get('or');
  if (or) {
    const raw = decodeURIComponent(or).replace(/^\(/,'').replace(/\)$/,'');
    const clauses = raw.split(',');
    rows = rows.filter(r => clauses.some(c => {
      if (c.startsWith('friend_code.eq.')) return clean(r.friend_code) === clean(c.slice('friend_code.eq.'.length));
      if (c.startsWith('friend_code.ilike.')) return suffix(r.friend_code) === suffix(c.slice('friend_code.ilike.'.length).replace(/^\*-/,''));
      return false;
    }));
  }
  const inParam = qs.get('player_id');
  if (inParam && inParam.startsWith('in.(')) {
    const inside = decodeURIComponent(inParam.slice(4,-1));
    const ids = inside.split(',').map(x => x.replace(/^"|"$/g,''));
    rows = rows.filter(r => ids.includes(r.player_id));
  }
  const limit = Number(qs.get('limit')||0);
  return limit ? rows.slice(0, limit) : rows;
}
function matchScores(qs){
  let rows = db.scores.slice();
  const period = paramEq(qs,'period_key'); if (period) rows = rows.filter(r => r.period_key === period);
  const scope = paramEq(qs,'scope'); if (scope) rows = rows.filter(r => r.scope === scope);
  const player = paramEq(qs,'player_id'); if (player) rows = rows.filter(r => r.player_id === player);
  const mystery = paramEq(qs,'mystery_id'); if (mystery) rows = rows.filter(r => r.mystery_id === mystery);
  rows.sort((a,b)=>Number(b.score)-Number(a.score));
  return rows;
}
function matchFriends(qs){
  let rows = db.friends.slice();
  const player = paramEq(qs,'player_id'); if (player) rows = rows.filter(r => r.player_id === player);
  const or = qs.get('or');
  if (or) {
    const raw = decodeURIComponent(or).replace(/^\(/,'').replace(/\)$/,'');
    const clauses = raw.split(',');
    rows = rows.filter(r => clauses.some(c => {
      if (c.startsWith('friend_code.eq.')) return clean(r.friend_code) === clean(c.slice('friend_code.eq.'.length));
      if (c.startsWith('friend_code.ilike.')) return suffix(r.friend_code) === suffix(c.slice('friend_code.ilike.'.length).replace(/^\*-/,''));
      if (c.startsWith('friend_player_id.eq.')) return r.friend_player_id === c.slice('friend_player_id.eq.'.length);
      return false;
    }));
  }
  return rows.map(r => ({...r}));
}
global.fetch = async (url, opts={}) => {
  const u = new URL(url);
  const full = u.pathname.replace('/rest/v1/','') + (u.search || '');
  const [table] = full.split('?');
  const qs = u.searchParams;
  const method = opts.method || 'GET';
  const body = opts.body ? JSON.parse(opts.body) : undefined;
  if (table === 'hd_profiles') {
    if (method === 'POST') {
      for (const row of body) {
        const idx = db.profiles.findIndex(p => p.player_id === row.player_id);
        if (idx >= 0) db.profiles[idx] = { ...db.profiles[idx], ...row };
        else db.profiles.push({ ...row });
      }
      return textResponse(200, body);
    }
    return textResponse(200, applyProfileSelect(profilesByPath(qs)));
  }
  if (table === 'hd_scores') {
    if (method === 'DELETE') {
      const doomed = new Set(matchScores(qs).map(r => r._id));
      db.scores = db.scores.filter(r => !doomed.has(r._id));
      return textResponse(204, null);
    }
    if (method === 'POST') {
      for (const row of body) db.scores.push({ _id: `s${db.scores.length+1}`, ...row });
      return textResponse(200, body);
    }
    return textResponse(200, matchScores(qs));
  }
  if (table === 'hd_friends') {
    if (method === 'POST') {
      for (const row of body) {
        const idx = db.friends.findIndex(f => f.player_id === row.player_id && clean(f.friend_code) === clean(row.friend_code));
        if (idx >= 0) db.friends[idx] = { ...db.friends[idx], ...row };
        else db.friends.push({ ...row, created_at: new Date().toISOString() });
      }
      return textResponse(200, body);
    }
    if (method === 'DELETE') {
      const doomed = new Set(matchFriends(qs).map(r => `${r.player_id}|${clean(r.friend_code)}`));
      db.friends = db.friends.filter(r => !doomed.has(`${r.player_id}|${clean(r.friend_code)}`));
      return textResponse(204, null);
    }
    return textResponse(200, matchFriends(qs));
  }
  return textResponse(404, { error: `unknown ${full}` });
};

const { handleRoute } = require('../lib/hd-api');
async function call(route, { method='GET', query={}, body={} }={}) {
  const req = { method, query, body, url: `/api/v1/${route}` };
  const res = { statusCode: 200, headers:{}, setHeader(k,v){this.headers[k]=v;}, status(c){this.statusCode=c; return this;}, json(p){this.payload=p; return p;} };
  await handleRoute(req,res,route);
  if (res.statusCode >= 400) throw new Error(`${route} ${res.statusCode}: ${JSON.stringify(res.payload)}`);
  return res.payload;
}
(async()=>{
  await call('me', { method:'POST', body:{ playerId:'me-A', pseudo:'Theo', friendCode:'THEO-AAA111', level:2, xp:250, solvedCount:1, streak:1 }});
  await call('me', { method:'POST', body:{ playerId:'me-B', pseudo:'Paul', friendCode:'PAUL-BBB222', level:3, xp:500, solvedCount:2, streak:2 }});
  await call('leaderboard/submit', { method:'POST', body:{ playerId:'me-A', pseudo:'Theo', friendCode:'THEO-AAA111', mysteryId:'m1', dayKey:'2026-07-07', score:120, solvedAt: Date.now() }});
  await call('leaderboard/submit', { method:'POST', body:{ playerId:'me-B', pseudo:'Invité', friendCode:'PAUL-BBB222', mysteryId:'m1', dayKey:'2026-07-07', score:150, solvedAt: Date.now() }});
  const add = await call('friends/sync', { method:'POST', body:{ playerId:'me-A', friendCode:'PAUL-BBB222', friendPseudo:'Paul' }});
  if (add.friends.length !== 1 || add.friends[0].friend_player_id !== 'me-B') throw new Error('friend add/enrich failed '+JSON.stringify(add));
  let rank = await call('leaderboard/daily', { query:{ scope:'friends', periodKey:'2026-07-07', playerId:'me-A', friendCodes:'PAUL-BBB222', friendIds:'me-B' }});
  if (rank.rows.length !== 2 || rank.rows[0].pseudo !== 'Paul') throw new Error('friend leaderboard failed '+JSON.stringify(rank));
  await call('me', { method:'POST', body:{ playerId:'me-B', pseudo:'Pauline', friendCode:'PAUL-BBB222', level:4, xp:700, solvedCount:3, streak:3 }});
  rank = await call('leaderboard/daily', { query:{ scope:'friends', periodKey:'2026-07-07', playerId:'me-A', friendCodes:'PAUL-BBB222', friendIds:'me-B' }});
  if (rank.rows[0].pseudo !== 'Pauline') throw new Error('canonical leaderboard name refresh failed '+JSON.stringify(rank));
  const del = await call('friends/sync', { method:'DELETE', body:{ playerId:'me-A', friendCode:'PAUL-BBB222', friendPlayerId:'me-B' }});
  if (del.friends.length !== 0) throw new Error('friend delete failed '+JSON.stringify(del));
  console.log('social API integration OK', JSON.stringify({ profiles:db.profiles.length, scores:db.scores.length, friends:db.friends.length, top:rank.rows[0].pseudo }));
})().catch(err => { console.error(err); process.exit(1); });
