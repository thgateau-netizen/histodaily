window.HISTODAILY_QUALITY = {
  version: "1.0.0-beta.48",
  audit(data = {}, premiumIds = []) {
    const lessons = Object.values(data.lessons || {}).flat();
    const mysteries = Array.isArray(data.mysteries) ? data.mysteries : [];
    const lessonIds = new Set(lessons.map(lesson => lesson.id));
    const premiumSet = new Set(premiumIds || []);
    const answerMap = new Map();
    const duplicateAnswers = [];
    const orphanMysteries = [];
    const weakMysteries = [];
    for (const mystery of mysteries) {
      const normalizedAnswer = this.normalize(mystery.answer || "");
      if (normalizedAnswer) {
        if (answerMap.has(normalizedAnswer)) duplicateAnswers.push([answerMap.get(normalizedAnswer), mystery.id]);
        else answerMap.set(normalizedAnswer, mystery.id);
      }
      if (mystery.lessonId && !lessonIds.has(mystery.lessonId)) orphanMysteries.push(mystery.id);
      const promptLen = String(mystery.prompt || "").length;
      const clueCount = Array.isArray(mystery.clues) ? mystery.clues.length : 0;
      if (promptLen < 120 || clueCount < 3 || !mystery.blockedGuesses) weakMysteries.push(mystery.id);
    }
    return {
      lessons: lessons.length,
      mysteries: mysteries.length,
      premium: premiumSet.size,
      premiumCoverage: lessons.length ? Math.round((premiumSet.size / lessons.length) * 100) : 0,
      duplicateAnswers: duplicateAnswers.length,
      orphanMysteries: orphanMysteries.length,
      weakMysteries: weakMysteries.length,
      linkedMysteries: mysteries.filter(mystery => mystery.lessonId && lessonIds.has(mystery.lessonId)).length,
      status: duplicateAnswers.length === 0 && orphanMysteries.length === 0 ? "propre" : "à vérifier"
    };
  },
  normalize(value = "") {
    return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  },
  performanceLabel(mode = "balanced") {
    if (mode === "light") return "Mode fluide";
    return "Animations légères";
  },
  diagnosticsText(data = {}, premiumIds = [], state = {}, appVersion = "") {
    const audit = this.audit(data, premiumIds);
    return [
      `HistoDaily ${appVersion}`,
      `Mystères: ${audit.mysteries}`,
      `Leçons: ${audit.lessons}`,
      `Cours premium: ${audit.premium}`,
      `Doublons réponse: ${audit.duplicateAnswers}`,
      `Mystères sans leçon liée: ${audit.orphanMysteries}`,
      `Mode perf: ${state.performanceMode || "balanced"}`,
      `XP local: ${state.xp || 0}`,
      `Mystères résolus: ${Object.keys(state.solvedMysteries || {}).length}`
    ].join("\n");
  }
};
