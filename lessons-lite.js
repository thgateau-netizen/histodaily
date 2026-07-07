window.HISTODAILY_ONBOARDING = {
  version: "1.0.0-beta.43",
  sessionTip({ state = {}, data = {}, premiumIds = [], counts = {} } = {}) {
    const solved = Object.keys(state.solvedMysteries || {}).length;
    const completed = Object.keys(state.completedLessons || {}).length;
    const todayDone = Boolean(counts.todayDone);
    const linkedLessonDone = Boolean(counts.linkedLessonDone);
    const backlog = Number(counts.archiveBacklog || 0);
    if (!solved && !completed) {
      return { label: "Démarrage", title: "Commence par jouer, pas par lire.", text: "Le meilleur premier contact reste le dossier du jour : une énigme courte, puis seulement ensuite le résumé ou le cours.", action: "mystery", cta: "Lancer le mystère" };
    }
    if (todayDone && !linkedLessonDone) {
      return { label: "Après résolution", title: "Ne perds pas le moment où le cerveau est accroché.", text: "Une fois le mystère résolu, le résumé express lié est le meilleur moment pour apprendre sans impression de pavé.", action: "daily-lesson", cta: "Lire l’express" };
    }
    if (backlog > 0) {
      return { label: "Archive", title: "Tu as un dossier déjà payé en gemmes.", text: "Mieux vaut finir une archive ouverte plutôt que dépenser encore : ça garde l’économie propre et évite le binge inutile.", action: "archive", cta: "Voir l’archive" };
    }
    if ((premiumIds || []).length && completed < 3) {
      return { label: "Qualité", title: "Teste un cours premium vitrine.", text: "Les cours premium montrent le vrai potentiel de l’app : exemples précis, pièges, nuances, quiz moins scolaire.", action: "premium", cta: "Ouvrir un premium" };
    }
    return { label: "Rituel", title: todayDone ? "Rituel validé, reviens demain." : "Un bon score vient d’une réponse précise.", text: todayDone ? "L’app doit donner envie de revenir, pas tout consommer d’un coup. Les archives restent du rattrapage." : "Tente d’abord sans indice. Tu peux te tromper : l’indice reste un choix volontaire et coûte plus cher qu’un essai raté.", action: todayDone ? "home" : "mystery", cta: todayDone ? "Voir mon rythme" : "Jouer" };
  },
  firstRunSteps() {
    return [
      "Résoudre le dossier sans titre révélé",
      "Choisir un indice seulement si nécessaire",
      "Lire l’express après la réponse",
      "Ouvrir le cours complet seulement si le sujet accroche"
    ];
  }
};
