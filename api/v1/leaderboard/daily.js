const { configured, request, safeText, todayKey } = require('../_supabase');

const seed = {
  daily: [
    { id: 'demo-cliomax', pseudo: 'ClioMax', score: 176, level: 11, solved: 42 },
    { id: 'demo-papyhistoire', pseudo: 'PapyHistoire', score: 164, level: 10, solved: 38 },
    { id: 'demo-louise', pseudo: 'Louise', score: 152, level: 9, solved: 31 },
    { id: 'demo-anatole', pseudo: 'Anatole', score: 139, level: 8, solved: 27 },
    { id: 'demo-mina', pseudo: 'Mina', score: 126, level: 7, solved: 22 }
  ],
  week: [
    { id: 'demo-cliomax', pseudo: 'ClioMax', score: 910, level: 11, solved: 42 },
    { id: 'demo-papyhistoire', pseudo: 'PapyHistoire', score: 820, level: 10, solved: 38 },
    { id: 'demo-louise', pseudo: 'Louise', score: 730, level: 9, solved: 31 }
  ],
  year: [
    { id: 'demo-cliomax', pseudo: 'ClioMax', score: 12480, level: 11, solved: 42 },
    { id: 'demo-papyhistoire', pseudo: 'PapyHistoire', score: 11840, level: 10, solved: 38 },
    { id: 'demo-louise', pseudo: 'Louise', score: 10990, level: 9, solved: 31 }
  ],
  friends: []
};

function fallback(scope) {
  return (seed[scope] || seed.daily).map((row, index) => ({ rank: index + 1, ...row }));
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
      pseudo: row.pseudo || 'Joueur',
      score: 0,
      level: row.level || 1,
      solved: row.solved_count || 0,
      streak: row.streak || 0,
      hints: row.hints,
      tries: row.tries,
      solvedAt: row.solved_at
    };
    if (scope === 'daily') existing.score = Math.max(existing.score, Number(row.score || 0));
    else existing.score += Number(row.score || 0);
    existing.level = Math.max(existing.level || 1, Number(row.level || 1));
    existing.solved = Math.max(existing.solved || 0, Number(row.solved_count || 0));
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
  const select = 'select=player_id,pseudo,friend_code,score,level,solved_count,streak,hints,tries,solved_at';
  if (scope === 'daily') {
    return `hd_scores?${select}&period_key=eq.${encodeURIComponent(periodKey)}&scope=eq.daily&order=score.desc&limit=200`;
  }
  if (scope === 'week') {
    return `hd_scores?${select}&solved_at=gte.${encodeURIComponent(startOfWeekISO())}&scope=eq.daily&order=score.desc&limit=500`;
  }
  if (scope === 'year') {
    return `hd_scores?${select}&solved_at=gte.${encodeURIComponent(startOfYear())}&scope=eq.daily&order=score.desc&limit=1000`;
  }
  return null;
}

module.exports = async (req, res) => {
  const scope = ['daily', 'week', 'year', 'friends'].includes(req.query?.scope) ? req.query.scope : 'daily';
  const periodKey = safeText(req.query?.periodKey || todayKey(), 20);
  if (!configured() || scope === 'friends') {
    return res.status(200).json({ ok: true, scope, mode: 'local-preview', rows: fallback(scope), note: 'Prévisualisation locale tant que Supabase n’est pas branché.' });
  }
  try {
    const path = queryFor(scope, periodKey);
    const rows = path ? await request(path) : [];
    return res.status(200).json({ ok: true, scope, periodKey, mode: 'supabase', rows: aggregate(rows || [], scope) });
  } catch (error) {
    return res.status(200).json({ ok: true, scope, periodKey, mode: 'supabase-error', rows: fallback(scope), note: error.message, detail: error.body || null });
  }
};
