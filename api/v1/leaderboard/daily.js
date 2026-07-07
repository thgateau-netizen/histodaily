const { configured, request, safeText, todayKey } = require('../_supabase');

function fallback(scope) {
  return [];
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
  if (scope === 'friends') {
    return `hd_scores?${select}&period_key=eq.${encodeURIComponent(periodKey)}&scope=eq.daily&order=score.desc&limit=1000`;
  }
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
  if (!configured()) {
    return res.status(200).json({ ok: true, scope, mode: 'local-preview', rows: [], note: 'Aucun faux joueur : les classements restent vides tant qu’aucun score réel n’est enregistré.' });
  }
  try {
    const path = queryFor(scope, periodKey);
    const rows = path ? await request(path) : [];
    let filtered = rows || [];
    if (scope === 'friends') {
      const playerId = safeText(req.query?.playerId || '', 90);
      const friendCodes = String(req.query?.friendCodes || '').split(',').map(v => safeText(v, 40)).filter(Boolean);
      const codeSet = new Set(friendCodes);
      filtered = filtered.filter(row => row.player_id === playerId || codeSet.has(row.friend_code));
    }
    return res.status(200).json({ ok: true, scope, periodKey, mode: 'supabase', rows: aggregate(filtered, scope) });
  } catch (error) {
    return res.status(200).json({ ok: true, scope, periodKey, mode: 'supabase-error', rows: [], note: error.message, detail: error.body || null });
  }
};
