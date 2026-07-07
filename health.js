const { dailyMystery } = require('../_data');
function norm(s){ return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,' ').trim(); }
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
  if (!guess) return "Écris une vraie proposition : un nom, un lieu, un événement ou un concept précis.";
  const blocked = (mystery.blockedGuesses || []).map(norm).filter(Boolean);
  if (blocked.includes(guess)) return "Trop large : le dossier attend un nom ou un concept plus précis.";
  const candidates = [mystery.answer, ...(mystery.aliases || [])].map(norm).filter(Boolean);
  const tokens = guess.split(' ').filter(t => t.length > 3);
  if (candidates.some(c => tokens.some(t => c.includes(t)))) return "Tu chauffes, mais la réponse est incomplète ou mal ciblée.";
  return "Non. Aucun indice automatique : choisis un indice seulement si tu acceptes de perdre du score potentiel.";
}
module.exports = (req, res) => {
  const m = dailyMystery();
  const guess = req.body && req.body.guess;
  const correct = accepted(guess, m);
  res.status(200).json({ ok: true, correct, hintAutoRevealed: false, feedback: correct ? undefined : feedback(guess, m), answer: correct ? m.answer : undefined, explanation: correct ? m.explanation : undefined });
};
