/* HistoDaily 1.0.0-rc.22.0 — extension de mystères Anglais / Philosophie. */
(function histodailyRC19DisciplineMysteries(){
  "use strict";
  const ITEMS = [
  {
    "id": "english-mystery-sensible-rc19",
    "discipline": "english",
    "difficulty": "facile",
    "title": "Un choix très… sensible ?",
    "caseTitle": "Le faux ami raisonnable",
    "subjectType": "faux ami",
    "periodHint": "anglais quotidien",
    "lessonId": "eng-false-friends-second-wave",
    "missionQuestion": "Que signifie “a sensible decision” ?",
    "answerInstruction": "Choisis le sens naturel dans cette scène.",
    "prompt": "A manager says: “We don’t have much time, so choosing the simpler plan is a sensible decision.” The idea is that the choice is practical and reasonable.",
    "answer": "Une décision raisonnable",
    "aliases": [
      "une décision raisonnable",
      "un choix raisonnable",
      "raisonnable"
    ],
    "clues": [
      "La décision est présentée comme pratique.",
      "Le mot ne décrit pas une émotion.",
      "Sensitive serait le mot plus proche de « sensible » dans d’autres contextes."
    ],
    "explanation": "Sensible signifie ici raisonnable ou judicieux.",
    "blockedGuesses": [
      "une décision émotionnelle",
      "une décision secrète",
      "une décision actuelle"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "english-mystery-one-reference-rc19",
    "discipline": "english",
    "difficulty": "facile",
    "title": "Le nom a disparu",
    "caseTitle": "Retrouver la référence",
    "subjectType": "référence grammaticale",
    "periodHint": "conversation",
    "lessonId": "eng-context-reference",
    "missionQuestion": "Que remplace “one” ?",
    "answerInstruction": "Retrouve le nom sous-entendu.",
    "prompt": "“My charger is broken. I need to buy a new one.” The second sentence avoids repeating a noun that has just been mentioned.",
    "answer": "Charger",
    "aliases": [
      "charger",
      "a charger",
      "le chargeur",
      "chargeur"
    ],
    "clues": [
      "Le nom apparaît dans la première phrase.",
      "New décrit quelque chose déjà connu.",
      "One peut remplacer un nom comptable singulier."
    ],
    "explanation": "One remplace charger : « un nouveau chargeur ».",
    "blockedGuesses": [
      "broken",
      "buy",
      "new"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "english-mystery-pretty-rc19",
    "discipline": "english",
    "difficulty": "moyen",
    "title": "Pretty sans beauté",
    "caseTitle": "Un petit mot d’intensité",
    "subjectType": "nuance",
    "periodHint": "anglais courant",
    "lessonId": "eng-small-words-just-quite",
    "missionQuestion": "Que fait “pretty” dans la phrase ?",
    "answerInstruction": "Choisis sa fonction, pas son sens le plus connu.",
    "prompt": "“The exam was pretty difficult.” Nothing in the situation concerns appearance. The speaker is evaluating how hard the exam was.",
    "answer": "Il renforce difficult",
    "aliases": [
      "il renforce difficult",
      "intensifieur",
      "plutôt difficile",
      "assez difficile"
    ],
    "clues": [
      "Pretty est placé devant un adjectif.",
      "La phrase ne parle pas d’apparence.",
      "Dans cet usage, pretty fonctionne comme un adverbe."
    ],
    "explanation": "Pretty est ici un intensifieur informel : « plutôt / assez / vraiment » selon le ton.",
    "blockedGuesses": [
      "il signifie joli",
      "il indique le futur",
      "il remplace exam"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "english-mystery-email-rc19",
    "discipline": "english",
    "difficulty": "moyen",
    "title": "Poli sans en faire trop",
    "caseTitle": "Le bon registre",
    "subjectType": "pragmatique",
    "periodHint": "travail",
    "lessonId": "eng-register-email-directness",
    "missionQuestion": "Quelle formulation est la plus adaptée ?",
    "answerInstruction": "Choisis la formulation naturelle pour le contexte.",
    "prompt": "You need a file from a colleague you barely know. There is no emergency. Which request is clear and appropriately polite?",
    "answer": "Could you send me the file when you have a minute?",
    "aliases": [
      "could you send me the file when you have a minute",
      "could you send me the file"
    ],
    "clues": [
      "Ce n’est pas une urgence.",
      "L’impératif nu serait assez direct.",
      "Une demande professionnelle ordinaire n’exige pas une formule cérémonieuse."
    ],
    "explanation": "Could you…? calibre bien la demande : claire, polie, sans lourdeur.",
    "blockedGuesses": [
      "send me the file",
      "i humbly request the file",
      "file now"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "english-mystery-getover-rc19",
    "discipline": "english",
    "difficulty": "moyen",
    "title": "Passer au-dessus ? Pas vraiment",
    "caseTitle": "Se remettre d’un problème",
    "subjectType": "phrasal verb",
    "periodHint": "conversation",
    "lessonId": "eng-phrasal-get",
    "missionQuestion": "Que signifie “get over” ici ?",
    "answerInstruction": "Reconstruis la scène.",
    "prompt": "“It took him two weeks to get over the flu.” After two weeks, he felt normal again.",
    "answer": "Se remettre de la grippe",
    "aliases": [
      "se remettre de la grippe",
      "se remettre",
      "récupérer de la grippe"
    ],
    "clues": [
      "La phrase décrit une évolution sur deux semaines.",
      "À la fin, son état s’est amélioré.",
      "Get over s’emploie souvent avec illness, shock ou breakup."
    ],
    "explanation": "Get over signifie ici se remettre d’une maladie.",
    "blockedGuesses": [
      "sauter au-dessus de la grippe",
      "attraper la grippe",
      "cacher la grippe"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "english-mystery-clarify-rc19",
    "discipline": "english",
    "difficulty": "facile",
    "title": "Un mot bloque, pas toute la conversation",
    "caseTitle": "Réparer l’échange",
    "subjectType": "interaction",
    "periodHint": "conversation",
    "lessonId": "eng-paraphrase-clarify",
    "missionQuestion": "Quelle demande est la plus efficace ?",
    "answerInstruction": "Choisis la clarification la plus ciblée.",
    "prompt": "You understand the whole sentence except the word “reliable”. You want the other person to explain only that point.",
    "answer": "What do you mean by reliable?",
    "aliases": [
      "what do you mean by reliable",
      "what do you mean by 'reliable'"
    ],
    "clues": [
      "Tu as compris le reste.",
      "Une question ciblée aide l’autre à reformuler précisément.",
      "Dire “I don’t understand anything” serait trop large."
    ],
    "explanation": "What do you mean by X? isole exactement l’élément qui bloque.",
    "blockedGuesses": [
      "i don't understand anything",
      "can we speak french",
      "say everything again"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "english-mystery-despite-rc19",
    "discipline": "english",
    "difficulty": "moyen",
    "title": "Même logique, autre grammaire",
    "caseTitle": "Although ou despite ?",
    "subjectType": "connecteur",
    "periodHint": "lecture",
    "lessonId": "eng-connectors-concession",
    "missionQuestion": "Quelle formulation est grammaticale ?",
    "answerInstruction": "Choisis la bonne structure concessive.",
    "prompt": "You want to express: « Malgré la pluie, nous sommes sortis. » One option uses despite correctly before a noun phrase.",
    "answer": "Despite the rain, we went out.",
    "aliases": [
      "despite the rain we went out",
      "despite the rain, we went out"
    ],
    "clues": [
      "Despite peut être suivi d’un groupe nominal.",
      "The rain est un groupe nominal.",
      "Although demanderait une proposition avec sujet et verbe."
    ],
    "explanation": "Despite + noun phrase est la bonne structure : despite the rain.",
    "blockedGuesses": [
      "despite it was raining we went out",
      "although the rain we went out",
      "therefore the rain we went out"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "english-mystery-notideal-rc19",
    "discipline": "english",
    "difficulty": "difficile",
    "title": "Deux mots faibles, un gros problème",
    "caseTitle": "Lire l’understatement",
    "subjectType": "implicite",
    "periodHint": "travail",
    "lessonId": "eng-implicit-understatement",
    "missionQuestion": "Comment interpréter “not ideal” ?",
    "answerInstruction": "Compare les mots avec la gravité de la scène.",
    "prompt": "A deployment has erased several hours of work. The engineer looks at the screen and says: “Well, that’s not ideal.” They immediately start an emergency recovery procedure.",
    "answer": "Un understatement pour un problème sérieux",
    "aliases": [
      "un understatement",
      "un problème sérieux exprimé avec retenue",
      "une critique atténuée"
    ],
    "clues": [
      "La panne est grave.",
      "La formulation est volontairement faible.",
      "L’action d’urgence qui suit montre la vraie gravité."
    ],
    "explanation": "La personne dit moins fort que la situation : c’est un understatement.",
    "blockedGuesses": [
      "le problème est insignifiant",
      "c'est un compliment",
      "tout fonctionne"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "philo-mystery-validity-rc19",
    "discipline": "philosophy",
    "difficulty": "facile",
    "title": "Faux… mais valide ?",
    "caseTitle": "Structure contre contenu",
    "subjectType": "argument",
    "periodHint": "méthode",
    "lessonId": "philo-argument-validity",
    "missionQuestion": "Quel diagnostic est correct ?",
    "answerInstruction": "Sépare validité et vérité.",
    "prompt": "“Tous les chats sont des reptiles. Félix est un chat. Donc Félix est un reptile.” La première prémisse est fausse, mais on te demande d’évaluer la forme du raisonnement.",
    "answer": "Valide dans sa forme mais avec une prémisse fausse",
    "aliases": [
      "valide mais prémisse fausse",
      "valide dans sa forme",
      "argument valide avec prémisse fausse"
    ],
    "clues": [
      "Imagine que les prémisses soient vraies.",
      "Dans ce cas, la conclusion devrait suivre.",
      "La validité ne garantit pas la vérité des prémisses."
    ],
    "explanation": "Le schéma est valide ; l’argument n’est pas solide parce qu’une prémisse est fausse.",
    "blockedGuesses": [
      "invalide seulement parce que la conclusion est fausse",
      "solide",
      "aucun argument"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "philo-mystery-necessary-rc19",
    "discipline": "philosophy",
    "difficulty": "facile",
    "title": "Il faut… donc ça suffit ?",
    "caseTitle": "Le piège du nécessaire",
    "subjectType": "distinction",
    "periodHint": "méthode",
    "lessonId": "philo-distinction-necessary-sufficient",
    "missionQuestion": "Quelle conclusion est légitime ?",
    "answerInstruction": "Distingue nécessaire et suffisant.",
    "prompt": "On affirme : « De l’oxygène est nécessaire à une combustion ordinaire. » Rien n’est dit sur le combustible ou l’énergie d’activation.",
    "answer": "Sans oxygène pas de combustion ordinaire, mais l’oxygène seul ne suffit pas",
    "aliases": [
      "sans oxygène pas de combustion mais cela ne suffit pas",
      "nécessaire mais pas suffisant",
      "l'oxygène est nécessaire pas suffisant"
    ],
    "clues": [
      "Nécessaire signifie : sans X, pas de Y.",
      "Cela ne dit pas : avec X, Y forcément.",
      "D’autres conditions peuvent être requises."
    ],
    "explanation": "Une condition nécessaire peut ne pas être suffisante.",
    "blockedGuesses": [
      "l'oxygène suffit toujours",
      "l'oxygène est inutile",
      "combustion et oxygène sont synonymes"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "philo-mystery-counterexample-rc19",
    "discipline": "philosophy",
    "difficulty": "moyen",
    "title": "Un courage qui recule",
    "caseTitle": "Tester une définition",
    "subjectType": "contre-exemple",
    "periodHint": "méthode socratique",
    "lessonId": "philo-socrates-definition",
    "missionQuestion": "Quel cas réfute le mieux la définition ?",
    "answerInstruction": "Vise précisément le critère « ne jamais reculer ».",
    "prompt": "Définition proposée : « Être courageux, c’est ne jamais reculer. » Il faut trouver un cas où quelqu’un recule tout en restant plausiblement courageux.",
    "answer": "Un pompier recule devant un effondrement puis revient sauver une victime",
    "aliases": [
      "le pompier qui recule puis revient",
      "un pompier recule pour éviter l'effondrement",
      "pompier"
    ],
    "clues": [
      "Le contre-exemple doit concerner le recul.",
      "Il doit rester compatible avec le courage.",
      "Un retrait tactique peut servir une action courageuse."
    ],
    "explanation": "Le cas montre que « ne jamais reculer » est trop étroit pour définir le courage.",
    "blockedGuesses": [
      "une personne aime le café",
      "un soldat porte un casque",
      "quelqu'un ne recule jamais par ignorance"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "philo-mystery-assent-rc19",
    "discipline": "philosophy",
    "difficulty": "moyen",
    "title": "Le fait ou le jugement ?",
    "caseTitle": "L’espace de l’assentiment",
    "subjectType": "stoïcisme",
    "periodHint": "Antiquité",
    "lessonId": "philo-stoic-impressions",
    "missionQuestion": "Quel énoncé ajoute clairement un jugement ?",
    "answerInstruction": "Sépare description et évaluation.",
    "prompt": "Après une critique publique, trois formulations sont possibles. L’une transforme l’événement en évaluation globale sur soi et l’avenir.",
    "answer": "Cette critique prouve que je suis nul et que tout est fichu",
    "aliases": [
      "cette critique prouve que je suis nul",
      "je suis nul et tout est fichu"
    ],
    "clues": [
      "Le fait brut serait seulement qu’une critique a été formulée.",
      "Cherche une généralisation évaluative.",
      "Le stoïcisme travaille sur l’assentiment donné à ce type de jugement."
    ],
    "explanation": "La phrase ajoute un jugement catastrophique au fait observable.",
    "blockedGuesses": [
      "deux points ont été critiqués",
      "la réunion a commencé à 9 h",
      "une personne a parlé"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "philo-mystery-cogito-rc19",
    "discipline": "philosophy",
    "difficulty": "moyen",
    "title": "Jusqu’où va le cogito ?",
    "caseTitle": "Ne pas gonfler la preuve",
    "subjectType": "Descartes",
    "periodHint": "XVIIe siècle",
    "lessonId": "philo-descartes-cogito",
    "missionQuestion": "Que garantit d’abord le cogito ?",
    "answerInstruction": "Choisis la conclusion minimale.",
    "prompt": "Descartes pousse le doute très loin. Pourtant, au moment même où il doute, une chose résiste à l’opération de doute.",
    "answer": "J’existe au moins comme sujet pensant au moment où je pense",
    "aliases": [
      "j'existe comme sujet pensant",
      "je suis un sujet pensant",
      "j'existe quand je pense"
    ],
    "clues": [
      "Douter est déjà une activité de pensée.",
      "La conclusion ne garantit pas encore toutes les perceptions.",
      "Le monde extérieur demande d’autres étapes."
    ],
    "explanation": "Le cogito établit d’abord une certitude minimale sur le sujet pensant.",
    "blockedGuesses": [
      "toutes mes perceptions sont vraies",
      "le monde est exactement comme je le vois",
      "je ne peux jamais être trompé"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "philo-mystery-induction-rc19",
    "discipline": "philosophy",
    "difficulty": "difficile",
    "title": "Le passé justifie-t-il le futur ?",
    "caseTitle": "Le cercle de l’induction",
    "subjectType": "Hume",
    "periodHint": "XVIIIe siècle",
    "lessonId": "philo-hume-induction",
    "missionQuestion": "Où est le cercle ?",
    "answerInstruction": "Repère ce que l’argument utilise déjà.",
    "prompt": "Quelqu’un affirme : « L’induction a été fiable dans le passé ; donc elle sera fiable demain. » Cette phrase veut justifier le passage du passé au futur.",
    "answer": "Elle utilise déjà l’induction pour justifier l’induction",
    "aliases": [
      "elle utilise l'induction pour justifier l'induction",
      "raisonnement circulaire",
      "elle projette déjà le passé dans le futur"
    ],
    "clues": [
      "La conclusion concerne demain.",
      "La prémisse concerne le passé.",
      "Passer du succès passé au succès futur est précisément une inférence inductive."
    ],
    "explanation": "La justification présuppose la méthode qu’elle cherche à fonder.",
    "blockedGuesses": [
      "le mot demain est faux",
      "le passé n'existe pas",
      "aucun scientifique n'utilise l'induction"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "philo-mystery-ethics-rc19",
    "discipline": "philosophy",
    "difficulty": "moyen",
    "title": "Même cas, autre question morale",
    "caseTitle": "Identifier le cadre",
    "subjectType": "éthique",
    "periodHint": "méthode",
    "lessonId": "philo-ethics-frameworks",
    "missionQuestion": "Quelle question est déontologique ?",
    "answerInstruction": "Identifie le type de raison morale.",
    "prompt": "Trois philosophes évaluent la même action. L’un s’intéresse surtout à ce qu’elle produit, un autre aux devoirs et droits, un troisième aux vertus et au caractère.",
    "answer": "Y a-t-il un devoir ou un droit que cette action violerait ?",
    "aliases": [
      "y a-t-il un devoir ou un droit",
      "un devoir ou un droit serait-il violé",
      "devoir et droit"
    ],
    "clues": [
      "Conséquentialisme : effets.",
      "Vertus : dispositions et caractère.",
      "Déontologie : obligations, droits, contraintes."
    ],
    "explanation": "Une question sur le devoir ou les droits correspond au cadre déontologique.",
    "blockedGuesses": [
      "quel bilan total produit l'action",
      "quel trait de caractère cultive-t-elle",
      "quelle option est la plus populaire"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "philo-mystery-contract-rc19",
    "discipline": "philosophy",
    "difficulty": "moyen",
    "title": "Trois contrats, trois problèmes",
    "caseTitle": "Comparer sans confondre",
    "subjectType": "philosophie politique",
    "periodHint": "XVIIe–XVIIIe siècle",
    "lessonId": "philo-social-contract-comparison",
    "missionQuestion": "Quel appariement est le plus juste ?",
    "answerInstruction": "Associe chaque auteur à son accent principal.",
    "prompt": "Il faut distinguer les problèmes mis au premier plan par Hobbes, Locke et Rousseau plutôt que de les ranger sous une seule fiche « contrat social ».",
    "answer": "Hobbes sécurité, Locke droits et limites du pouvoir, Rousseau liberté politique et volonté générale",
    "aliases": [
      "hobbes sécurité locke droits rousseau volonté générale",
      "sécurité droits liberté politique",
      "hobbes securite locke droits rousseau volonte generale"
    ],
    "clues": [
      "Hobbes part fortement du problème de l’insécurité.",
      "Locke insiste sur les droits et la limitation du gouvernement.",
      "Rousseau travaille la liberté sous une loi commune et la volonté générale."
    ],
    "explanation": "Cette carte résume les accents différents des trois projets sans les identifier.",
    "blockedGuesses": [
      "les trois défendent exactement le même pouvoir",
      "les trois refusent toute loi",
      "hobbes droits locke volonté générale rousseau sécurité"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  }
];
  if (!Array.isArray(data.mysteries)) data.mysteries = [];
  const known = new Set(data.mysteries.map(item => item?.id));
  let added = 0;
  for (const item of ITEMS) {
    if (!item?.id || known.has(item.id)) continue;
    data.mysteries.push(item);
    known.add(item.id);
    added += 1;
  }
  try {
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: "1.0.0-rc.22.0",
      rc19DisciplineMysteries: {
        added,
        english: ITEMS.filter(x => x.discipline === "english").length,
        philosophy: ITEMS.filter(x => x.discipline === "philosophy").length
      }
    };
  } catch {}
})();
