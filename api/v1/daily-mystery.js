const { dailyMystery } = require('./_data');
module.exports = (req, res) => {
  const m = dailyMystery();
  res.status(200).json({ ok: true, mystery: {
    id: m.id,
    difficulty: m.difficulty,
    caseTitle: m.caseTitle || "Dossier à identifier",
    prompt: m.prompt,
    lessonId: m.lessonId,
    clueCount: Math.min(3, (m.clues || []).length),
    reward: { dailyGems: 1, archiveUnlockCost: 2, streakBonusEvery: 7 }
  }});
};
