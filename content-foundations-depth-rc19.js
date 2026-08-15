/* HistoDaily 1.0.0-rc.22.0 — approfondissement des cours fondateurs Anglais / Philosophie. */
(function histodailyRC19FoundationsDepth(){
  "use strict";
  const VERSION = "1.0.0-rc.22.0";
  const words = value => String(value || "").split(/\s+/).filter(Boolean).length;
  const fullWords = pack => words((pack?.complete || []).map(block => block?.text || "").join(" "));
  const worldIds = disciplineId => new Set((DISCIPLINE_OUTLINES?.[disciplineId]?.worlds || []).map(world => world.id));
  const lessonsIn = disciplineId => {
    const ids = worldIds(disciplineId);
    return Object.entries(data.lessons || {}).filter(([worldId]) => ids.has(worldId)).flatMap(([, lessons]) => Array.isArray(lessons) ? lessons : []);
  };

  const englishPractice = [
    title => `Prends le mécanisme de « ${title} » et fabrique trois variantes : une phrase familière, une phrase professionnelle et une phrase entendue dans une situation concrète. Pour chacune, explique d’abord le sens global avec un anglais plus simple, sans traduire mot à mot. Change ensuite un seul élément et observe ce qui se déplace : registre, intensité, chronologie ou intention. Termine en disant la même idée autrement. Cette variation active force à comprendre la fonction de la tournure et évite de mémoriser une équivalence française qui ne fonctionnerait que dans un exemple.`,
    title => `Pour entraîner « ${title} », lis un exemple à voix haute puis cache-le. Reformule ce que la personne voulait vraiment communiquer, d’abord en anglais simple, ensuite seulement en français si tu en as besoin. Imagine une réponse naturelle qui montrerait que tu as compris l’intention. Reviens ensuite au texte et compare : as-tu conservé le message, le degré de politesse et la nuance ? Le but n’est pas de réciter la phrase originale, mais de pouvoir reconstruire son sens et l’utiliser dans une scène différente.`,
    title => `Transforme « ${title} » en petit contraste. Écris une phrase où la tournure étudiée est naturelle, puis une seconde où un mot proche produirait un sens différent. Explique précisément la différence sans utiliser une simple liste de traductions. Ajoute enfin une troisième phrase où le contexte suffit presque à deviner le sens avant même de connaître le mot-clé. Cet exercice construit des associations entre situation, grammaire et intention : ce sont elles qui permettent de comprendre l’anglais réel quand le vocabulaire n’est pas parfait.`
  ];
  const philosophyPractice = [
    title => `Applique « ${title} » à un exemple qui n’apparaît pas dans le cours. Écris d’abord la thèse en une phrase, puis la raison qui la soutient. Cherche ensuite le meilleur contre-exemple possible : pas une situation hors sujet, mais un cas qui vise exactement le critère utilisé. Si l’objection fonctionne, précise la thèse au lieu de la défendre à tout prix. Cet exercice montre si tu maîtrises vraiment la distinction philosophique : un concept compris doit pouvoir résister à des cas nouveaux ou indiquer clairement où ses limites commencent.`,
    title => `Pour travailler « ${title} », dessine mentalement une carte de l’argument : conclusion, prémisses, définition importante et hypothèse implicite. Demande ensuite laquelle de ces pièces un contradicteur intelligent attaquerait en premier. Formule cette objection de la manière la plus forte possible, puis réponds-y sans modifier discrètement les termes du problème. Enfin, note ce que ton argument établit réellement et ce qu’il ne prouve pas encore. La philosophie progresse souvent moins en accumulant des noms d’auteurs qu’en contrôlant exactement la portée des raisons que l’on avance.`,
    title => `Mets « ${title} » à l’épreuve d’un cas contemporain ordinaire : décision professionnelle, règle collective, désaccord familial ou information incertaine. Sépare ce qui relève des faits, des définitions et des valeurs. Pose ensuite deux questions : qu’est-ce qui ferait changer ma conclusion, et quel argument soutiendrait raisonnablement la position inverse ? Termine par une formulation plus précise de ton jugement initial. L’objectif n’est pas de rendre toute réponse relative, mais d’apprendre à voir les présupposés, les critères et les conséquences d’une position avant de la considérer comme évidente.`
  ];

  const report = { english: [], philosophy: [] };
  [["english", englishPractice], ["philosophy", philosophyPractice]].forEach(([disciplineId, templates]) => {
    lessonsIn(disciplineId).forEach((lesson, index) => {
      const pack = READY_LESSON_PACKS?.[lesson.id];
      if (!pack || fullWords(pack) >= 350) return;
      if (!Array.isArray(pack.complete)) pack.complete = [];
      const text = templates[index % templates.length](pack.title || lesson.title || "ce thème");
      pack.complete.push({ title: "7. Entraînement actif", text });
      pack.contentRevision = "rc19-foundations-depth";
      report[disciplineId].push({ id: lesson.id, before: fullWords({ ...pack, complete: pack.complete.slice(0, -1) }), after: fullWords(pack) });
    });
  });

  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, rc19FoundationsDepth: report };
  } catch {}
})();
