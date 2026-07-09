window.HISTODAILY_ONBOARDING = {
  version: "1.0.0-beta.124",
  sessionTip({ state = {}, data = {}, readyIds = [], counts = {} } = {}) {
    const solved = Object.keys(state.solvedMysteries || {}).length;
    const completed = Object.keys(state.completedLessons || {}).length;
    const todayDone = Boolean(counts.todayDone);
    const linkedLessonDone = Boolean(counts.linkedLessonDone);
    const backlog = Number(counts.archiveBacklog || 0);
    if (!solved && !completed) {
      return { label: "Démarrage", title: "Commence par jouer, pas par lire.", text: "Le meilleur premier contact reste le dossier du jour : une énigme courte, puis seulement ensuite le résumé ou le cours.", action: "mystery", cta: "Lancer le mystère" };
    }
    if (todayDone && !linkedLessonDone) {
      return { label: "Après résolution", title: "Profite du moment où le sujet est frais.", text: "Une fois le mystère résolu, l’express lié donne les repères essentiels sans transformer la session en pavé.", action: "daily-lesson", cta: "Lire l’express" };
    }
    if (backlog > 0) {
      return { label: "Archive", title: "Tu as un dossier déjà payé en gemmes.", text: "Mieux vaut finir une archive ouverte plutôt que dépenser encore : ça garde le rythme clair et évite d’enchaîner sans vraie attention.", action: "archive", cta: "Voir l’archive" };
    }
    if ((readyIds || []).length && completed < 3) {
      return { label: "Parcours", title: "Teste un cours solide.", text: "Choisis un sujet court : un exemple précis, quelques repères, puis un quiz qui valide vraiment la lecture.", action: "ready", cta: "Ouvrir un cours" };
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
