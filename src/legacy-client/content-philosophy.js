/* HistoDaily 1.0.0-rc.18.0 — discipline Philosophie. */
(function histodailyRC18Philosophy(){
  "use strict";
  const VERSION = "1.0.0-rc.18.0";
  const DISCIPLINE = {
  "id": "philosophy",
  "title": "Philosophie",
  "emoji": "🧠",
  "accent": "#c084fc",
  "description": "Problèmes, arguments, concepts et grandes manières de penser."
};
  const GROUPS = [
  {
    "id": "philo-tools",
    "title": "1. Apprendre à raisonner",
    "range": "méthode",
    "description": "Thèse, raisons, objections, distinctions et expériences de pensée."
  },
  {
    "id": "philo-ancient",
    "title": "2. Antiquité : vivre et savoir",
    "range": "Ve siècle av. J.-C. → IIe siècle",
    "description": "Socrate, stoïcisme, bonheur, maîtrise de soi et examen des croyances."
  },
  {
    "id": "philo-modern",
    "title": "3. Modernes : doute, expérience et connaissance",
    "range": "XVIIe → XVIIIe siècle",
    "description": "Descartes, Hume et la question de ce que nous pouvons vraiment connaître."
  },
  {
    "id": "philo-ethics-politics",
    "title": "4. Morale et politique",
    "range": "XVIIe siècle → aujourd’hui",
    "description": "Liberté, loi, conséquences, principes, justice et vie collective."
  }
];
  const WORLDS = [
  {
    "id": "philo-argument",
    "title": "Construire un argument",
    "emoji": "🧩",
    "subtitle": "Thèse, raison, objection, réponse",
    "timeframe": "méthode",
    "accent": "#c084fc",
    "group": "philo-tools",
    "sortStart": 1,
    "discipline": "philosophy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "philo-distinction",
    "title": "Distinguer pour mieux penser",
    "emoji": "⚖️",
    "subtitle": "Fait, opinion, valeur, définition",
    "timeframe": "méthode",
    "accent": "#a78bfa",
    "group": "philo-tools",
    "sortStart": 2,
    "discipline": "philosophy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "philo-socrates",
    "title": "Socrate et l’examen de soi",
    "emoji": "🏺",
    "subtitle": "Questionner ce que l’on croit savoir",
    "timeframe": "Ve siècle av. J.-C.",
    "accent": "#f59e0b",
    "group": "philo-ancient",
    "sortStart": 10,
    "discipline": "philosophy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "philo-stoicism",
    "title": "Stoïcisme",
    "emoji": "🪨",
    "subtitle": "Ce qui dépend de nous",
    "timeframe": "Antiquité",
    "accent": "#38bdf8",
    "group": "philo-ancient",
    "sortStart": 11,
    "discipline": "philosophy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "philo-descartes",
    "title": "Descartes et le doute",
    "emoji": "🔎",
    "subtitle": "Douter pour trouver un point solide",
    "timeframe": "XVIIe siècle",
    "accent": "#8b5cf6",
    "group": "philo-modern",
    "sortStart": 20,
    "discipline": "philosophy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "philo-hume",
    "title": "Hume et l’habitude",
    "emoji": "🎱",
    "subtitle": "Pourquoi croyons-nous aux causes ?",
    "timeframe": "XVIIIe siècle",
    "accent": "#60a5fa",
    "group": "philo-modern",
    "sortStart": 21,
    "discipline": "philosophy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "philo-ethics",
    "title": "Décider moralement",
    "emoji": "🧭",
    "subtitle": "Principes, conséquences et dilemmes",
    "timeframe": "méthode et éthique",
    "accent": "#22c55e",
    "group": "philo-ethics-politics",
    "sortStart": 30,
    "discipline": "philosophy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "philo-social-contract",
    "title": "Liberté, loi et contrat social",
    "emoji": "🤝",
    "subtitle": "Pourquoi obéir à des règles communes ?",
    "timeframe": "XVIIe → XVIIIe siècle",
    "accent": "#fb7185",
    "group": "philo-ethics-politics",
    "sortStart": 31,
    "discipline": "philosophy",
    "planned": true,
    "unlockedByDefault": false
  }
];
  const LESSONS = {
  "philo-argument": [
    {
      "id": "philo-argument-thesis-objection",
      "title": "Argumenter : une thèse ne suffit pas",
      "period": "Méthode",
      "location": "Raisonnement",
      "emoji": "🧩",
      "xp": 70,
      "order": 1
    }
  ],
  "philo-distinction": [
    {
      "id": "philo-fact-opinion-value",
      "title": "Fait, opinion, valeur : ne pas tout mélanger",
      "period": "Méthode",
      "location": "Raisonnement",
      "emoji": "⚖️",
      "xp": 70,
      "order": 1
    }
  ],
  "philo-socrates": [
    {
      "id": "philo-socrates-questioning",
      "title": "Socrate : savoir que l’on ne sait pas",
      "period": "Ve siècle av. J.-C.",
      "location": "Athènes",
      "emoji": "🏺",
      "xp": 70,
      "order": 1
    }
  ],
  "philo-stoicism": [
    {
      "id": "philo-stoic-control",
      "title": "Stoïcisme : ce qui dépend de nous",
      "period": "Ier → IIe siècle",
      "location": "Monde gréco-romain",
      "emoji": "🪨",
      "xp": 70,
      "order": 1
    }
  ],
  "philo-descartes": [
    {
      "id": "philo-descartes-doubt",
      "title": "Descartes : à quoi sert le doute méthodique ?",
      "period": "XVIIe siècle",
      "location": "Europe",
      "emoji": "🔎",
      "xp": 70,
      "order": 1
    }
  ],
  "philo-hume": [
    {
      "id": "philo-hume-causality",
      "title": "Hume : voir une succession n’est pas voir une cause",
      "period": "XVIIIe siècle",
      "location": "Écosse",
      "emoji": "🎱",
      "xp": 70,
      "order": 1
    }
  ],
  "philo-ethics": [
    {
      "id": "philo-ethics-principles-consequences",
      "title": "Morale : faut-il juger l’acte ou ses conséquences ?",
      "period": "Méthode",
      "location": "Éthique",
      "emoji": "🧭",
      "xp": 70,
      "order": 1
    }
  ],
  "philo-social-contract": [
    {
      "id": "philo-social-contract-liberty",
      "title": "Liberté et loi : pourquoi accepter une règle commune ?",
      "period": "XVIIe → XVIIIe siècle",
      "location": "Europe",
      "emoji": "🤝",
      "xp": 70,
      "order": 1
    }
  ]
};
  const PACKS = {
  "philo-argument-thesis-objection": {
    "hook": "Un argument n’est pas une opinion avec un ton assuré. Il relie une conclusion à des raisons que quelqu’un d’autre peut examiner, contester et éventuellement accepter.",
    "keyFacts": [
      "Une thèse est une conclusion, pas encore un argument.",
      "Les prémisses doivent soutenir la conclusion.",
      "Une objection teste une étape du raisonnement.",
      "Un contre-exemple peut limiter une règle générale.",
      "Le principe de charité évite l’homme de paille."
    ],
    "express": [
      "Dire « je pense que les réseaux sociaux sont mauvais » énonce une thèse, mais ne donne encore aucune raison. Pour argumenter, il faut préciser ce que l’on affirme, à quelles conditions, et sur quoi on s’appuie. Une phrase devient philosophique quand elle accepte d’être examinée.",
      "Un argument possède au minimum une conclusion et une ou plusieurs prémisses. Les prémisses doivent réellement soutenir la conclusion. Si elles sont vraies mais sans rapport, le raisonnement reste faible. Il faut donc regarder le lien logique, pas seulement la vraisemblance de chaque phrase.",
      "L’objection est un outil, pas une attaque. Elle teste une prémisse, montre un contre-exemple ou propose une autre explication. Une bonne réponse ne répète pas la thèse plus fort : elle modifie, précise ou défend le raisonnement en tenant compte de la difficulté.",
      "La meilleure habitude consiste à pouvoir reformuler l’argument adverse de manière qu’il le reconnaisse. Si l’on caricature l’autre position, on gagne contre une version inventée. Comprendre avant de réfuter rend le raisonnement plus robuste."
    ],
    "complete": [
      {
        "title": "1. Thèse et raisons",
        "text": "Une thèse répond à une question : « la liberté exige-t-elle des règles ? », « peut-on être heureux sans choisir ? ». Une raison explique pourquoi la thèse devrait être acceptée. On peut écrire le squelette : parce que A et B, donc C. Cette forme oblige à rendre visibles les étapes du raisonnement."
      },
      {
        "title": "2. Tester le lien",
        "text": "Deux prémisses peuvent être vraies sans soutenir la conclusion. « Il pleut » et « les chats dorment beaucoup » ne prouvent rien sur la justice. La philosophie ne demande donc pas seulement des informations exactes : elle demande une relation intelligible entre les idées."
      },
      {
        "title": "3. L’objection utile",
        "text": "Une objection peut viser la vérité d’une prémisse, le passage des prémisses à la conclusion ou la portée de la conclusion. Un contre-exemple est particulièrement puissant : il montre qu’une règle annoncée comme générale échoue dans au moins un cas."
      },
      {
        "title": "4. Répondre sans esquiver",
        "text": "Répondre à une objection peut conduire à abandonner une prémisse, à distinguer deux cas ou à limiter la conclusion. Ce n’est pas perdre. Un argument plus précis après objection est souvent meilleur que l’argument initial."
      },
      {
        "title": "5. Le principe de charité",
        "text": "Avant de critiquer, on reconstruit la version la plus solide du raisonnement adverse. Cette discipline évite l’homme de paille, où l’on attaque une position simplifiée ou absurde que personne ne défend vraiment."
      }
    ],
    "deeper": [],
    "takeaways": [
      {
        "label": "Réflexe",
        "text": "Écris « parce que… donc… » pour voir la structure."
      },
      {
        "label": "Test",
        "text": "Demande ce qui ferait changer d’avis."
      },
      {
        "label": "Objection",
        "text": "Vise une prémisse ou le lien logique, pas la personne."
      }
    ],
    "quiz": [
      {
        "kind": "concept",
        "q": "Qu’est-ce qui transforme une simple thèse en argument ?",
        "a": "Des raisons reliées à la conclusion.",
        "choices": [
          "Un vocabulaire compliqué.",
          "Une forte conviction personnelle.",
          "Le fait que beaucoup de gens soient d’accord."
        ],
        "why": "Un argument rend explicite pourquoi la conclusion devrait suivre.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Sections 1 et 2."
      },
      {
        "kind": "preuve",
        "q": "À quoi sert principalement une objection ?",
        "a": "À tester la solidité du raisonnement.",
        "choices": [
          "À montrer que l’adversaire est mal informé.",
          "À remplacer toute discussion par un contre-exemple.",
          "À éviter d’avoir à défendre sa propre thèse."
        ],
        "why": "L’objection teste une étape précise.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "piège",
        "q": "Qu’est-ce qu’un homme de paille ?",
        "a": "Une caricature de la position adverse que l’on réfute facilement.",
        "choices": [
          "Une prémisse vraie mais impopulaire.",
          "Un argument comportant trop d’exemples.",
          "Une conclusion qui reste prudente."
        ],
        "why": "On attaque une version inventée au lieu de la meilleure version adverse.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 5."
      },
      {
        "kind": "nuance",
        "q": "Une objection peut-elle améliorer notre propre thèse ?",
        "a": "Oui, en obligeant à la préciser ou à la limiter.",
        "choices": [
          "Non, elle ne sert qu’à gagner un débat.",
          "Seulement si l’objection est fausse.",
          "Non, modifier sa thèse revient toujours à l’abandonner."
        ],
        "why": "La révision d’une thèse est une force du raisonnement.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "synthèse",
        "q": "Quelle est la meilleure première étape avant de réfuter quelqu’un ?",
        "a": "Reformuler loyalement son argument.",
        "choices": [
          "Chercher immédiatement un détail faux.",
          "Présenter sa propre conclusion.",
          "Vérifier combien de personnes pensent comme lui."
        ],
        "why": "Comprendre la position évite de réfuter une caricature.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 5."
      }
    ]
  },
  "philo-fact-opinion-value": {
    "hook": "Une discussion devient vite confuse quand « c’est vrai », « j’aime » et « c’est bien » sont traités comme la même chose. Les distinguer permet de savoir quel type de justification chercher.",
    "keyFacts": [
      "Un fait est testable en principe.",
      "Une opinion peut être plus ou moins justifiée.",
      "Une valeur évalue selon des critères.",
      "Décrire ne suffit pas à prescrire.",
      "Une conclusion normative suppose au moins une prémisse normative."
    ],
    "express": [
      "Un fait décrit ce qui est ou ce qui s’est produit et peut, au moins en principe, être confronté à des observations ou à des sources. Dire qu’un film dure 142 minutes n’a pas le même statut que dire qu’il est ennuyeux ou qu’il est moralement problématique.",
      "Une opinion est une position tenue par quelqu’un. Elle n’est pas automatiquement fausse, mais le mot « opinion » ne la protège pas de la critique. On peut demander : sur quels faits repose-t-elle, quelles valeurs suppose-t-elle et quelles raisons la soutiennent ?",
      "Un jugement de valeur évalue : juste, beau, préférable, cruel, admirable. Il ne se réduit pas à un relevé de faits. Pourtant il n’est pas forcément arbitraire : on peut argumenter à partir de principes, de conséquences et de cohérence.",
      "La confusion classique consiste à passer directement d’un fait à une norme : « cela existe, donc c’est bien » ou « cela a toujours été ainsi, donc il faut continuer ». Décrire le monde ne suffit pas à dire ce qu’il devrait être."
    ],
    "complete": [
      {
        "title": "1. Trois questions différentes",
        "text": "Pour un énoncé, on peut demander : est-il descriptif ? exprime-t-il une préférence ou une croyance ? évalue-t-il selon une norme ? Cette première classification n’est pas toujours parfaite, mais elle clarifie ce qui est en jeu."
      },
      {
        "title": "2. Les faits demandent des preuves",
        "text": "Un fait empirique se teste avec des données, des témoignages, des mesures ou des documents adaptés. Une source peut être mauvaise ou incomplète ; le caractère factuel d’une phrase n’implique pas qu’elle soit déjà prouvée."
      },
      {
        "title": "3. Les opinions demandent des raisons",
        "text": "« C’est mon opinion » signifie seulement que la personne tient cette position. Dans une discussion rationnelle, cela n’interdit pas de demander les raisons. Certaines opinions sont mieux étayées que d’autres."
      },
      {
        "title": "4. Les valeurs peuvent être discutées",
        "text": "Dire qu’un acte est injuste mobilise des critères : égalité, liberté, dommage, promesse, mérite, etc. Des personnes peuvent diverger sur ces critères tout en argumentant sérieusement."
      },
      {
        "title": "5. Du fait à la norme",
        "text": "Le passage de « est » à « doit » exige une prémisse normative. Si l’on dit « cette mesure réduit la pollution, donc il faut l’adopter », il manque par exemple l’idée que réduire cette pollution est une priorité suffisamment importante."
      }
    ],
    "deeper": [],
    "takeaways": [],
    "quiz": [
      {
        "kind": "concept",
        "q": "« Ce tableau mesure deux mètres de haut » est d’abord…",
        "a": "Un énoncé factuel.",
        "choices": [
          "Un jugement esthétique.",
          "Une préférence personnelle.",
          "Une règle morale."
        ],
        "why": "La phrase décrit une propriété mesurable.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "concept",
        "q": "« Ce tableau est magnifique » est surtout…",
        "a": "Un jugement de valeur esthétique.",
        "choices": [
          "Un fait mesurable.",
          "Une définition scientifique.",
          "Une contradiction logique."
        ],
        "why": "Magnifique évalue l’œuvre.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "piège",
        "q": "Pourquoi « cela a toujours existé, donc c’est bien » est-il insuffisant ?",
        "a": "Parce qu’un fait historique ne fournit pas à lui seul une norme.",
        "choices": [
          "Parce que tout ce qui est ancien est faux.",
          "Parce qu’aucune tradition ne peut avoir de valeur.",
          "Parce que les faits historiques ne peuvent jamais être connus."
        ],
        "why": "Il manque un principe normatif.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 5."
      },
      {
        "kind": "nuance",
        "q": "Dire « c’est mon opinion » met-il fin à la discussion ?",
        "a": "Non, on peut encore demander les raisons qui la soutiennent.",
        "choices": [
          "Oui, une opinion ne peut jamais être évaluée.",
          "Oui, sauf si elle concerne la science.",
          "Non, car toute opinion est nécessairement fausse."
        ],
        "why": "Opinion ne signifie pas immunité à la critique.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "synthèse",
        "q": "Quelle distinction aide le plus avant de débattre ?",
        "a": "Identifier si l’on décrit, croit ou évalue.",
        "choices": [
          "Séparer les phrases courtes des phrases longues.",
          "Compter le nombre de personnes d’accord.",
          "Éviter tous les mots abstraits."
        ],
        "why": "Le type d’énoncé détermine le type de justification.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 1."
      }
    ]
  },
  "philo-socrates-questioning": {
    "hook": "Socrate ne nous laisse aucun traité écrit. Dans les dialogues de Platon, il avance surtout par questions : définir un mot, tester la réponse, trouver une contradiction, puis recommencer.",
    "keyFacts": [
      "Socrate n’a laissé aucun traité écrit.",
      "Il questionne définitions et conséquences.",
      "L’elenchos met au jour des incohérences.",
      "Reconnaître son ignorance ouvre la recherche.",
      "Socrate est condamné en 399 av. J.-C."
    ],
    "express": [
      "À Athènes au Ve siècle av. J.-C., Socrate discute sur la justice, le courage, la piété ou la vertu. Son geste caractéristique est de demander ce que signifie vraiment le mot employé. Une liste d’exemples ne suffit pas : il cherche ce qu’ils ont en commun.",
      "L’ironie socratique consiste souvent à se présenter comme celui qui ne sait pas, puis à interroger quelqu’un qui se croit compétent. La discussion révèle alors des contradictions. Reconnaître son ignorance n’est pas une fin : c’est le début d’une recherche plus exigeante.",
      "Cette méthode peut être inconfortable. Elle transforme une certitude familière en problème. Elle ne donne pas toujours une doctrine finale, mais apprend à détecter les mots vagues, les exceptions et les réponses qui changent en cours de route.",
      "Socrate est condamné à mort en 399 av. J.-C. pour impiété et corruption de la jeunesse. Les sources sont complexes, mais son procès rappelle qu’interroger publiquement les valeurs d’une cité peut devenir une affaire politique."
    ],
    "complete": [
      {
        "title": "1. Partir d’une définition",
        "text": "Quand quelqu’un affirme savoir ce qu’est le courage, Socrate demande une définition générale. Si la réponse donne seulement un exemple, il pousse à chercher le critère commun qui permet d’appeler courageuses plusieurs actions différentes."
      },
      {
        "title": "2. L’elenchos",
        "text": "La réfutation socratique, souvent appelée elenchos, examine les conséquences d’une réponse. Si la personne accepte plusieurs propositions incompatibles, il faut réviser quelque chose. Le but intellectuel est de rendre les croyances plus cohérentes."
      },
      {
        "title": "3. Savoir que l’on ne sait pas",
        "text": "La formule célèbre ne signifie pas que Socrate ne sait absolument rien. Elle exprime plutôt une supériorité paradoxale : il ne confond pas conviction et savoir. Cette conscience de la limite ouvre la recherche."
      },
      {
        "title": "4. Une philosophie vécue",
        "text": "Socrate associe examen rationnel et manière de vivre. Pour lui, se demander ce qu’est une vie juste ou bonne concerne les choix réels, pas seulement des exercices de vocabulaire."
      },
      {
        "title": "5. Les limites des sources",
        "text": "Notre image de Socrate vient surtout de Platon, Xénophon et Aristophane. Ils n’ont ni les mêmes buts ni le même portrait. Il faut donc distinguer le personnage historique et le Socrate philosophique des dialogues."
      }
    ],
    "deeper": [],
    "takeaways": [],
    "quiz": [
      {
        "kind": "concept",
        "q": "Que cherche Socrate quand il demande « qu’est-ce que le courage ? » ?",
        "a": "Une définition générale capable de couvrir plusieurs cas.",
        "choices": [
          "Un exemple de soldat courageux.",
          "L’opinion de la majorité.",
          "L’étymologie exacte du mot seulement."
        ],
        "why": "Il cherche le critère commun.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "preuve",
        "q": "À quoi sert la réfutation socratique ?",
        "a": "À montrer qu’un ensemble de réponses peut être incohérent.",
        "choices": [
          "À ridiculiser nécessairement l’interlocuteur.",
          "À remplacer les raisons par l’autorité.",
          "À prouver que toute définition est impossible."
        ],
        "why": "Elle teste les conséquences des croyances.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "nuance",
        "q": "« Savoir que l’on ne sait pas » signifie surtout…",
        "a": "Ne pas confondre conviction et connaissance assurée.",
        "choices": [
          "Refuser d’apprendre quoi que ce soit.",
          "Croire que toute vérité est inaccessible.",
          "Se taire dans toute discussion."
        ],
        "why": "L’ignorance reconnue devient un point de départ.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "repère",
        "q": "Pourquoi faut-il être prudent sur le Socrate historique ?",
        "a": "Parce que nous dépendons de sources différentes qui ont leurs propres buts.",
        "choices": [
          "Parce qu’Athènes n’utilisait pas l’écriture.",
          "Parce que Platon a vécu avant Socrate.",
          "Parce que son procès n’a jamais eu lieu."
        ],
        "why": "Les portraits de Platon, Xénophon et Aristophane diffèrent.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 5."
      },
      {
        "kind": "synthèse",
        "q": "Quelle habitude socratique peut-on réutiliser aujourd’hui ?",
        "a": "Demander une définition puis chercher un contre-exemple.",
        "choices": [
          "Remplacer un débat par un vote.",
          "Éviter de préciser les termes.",
          "Prendre la première réponse comme définitive."
        ],
        "why": "Définition et test sont au cœur de la méthode.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Sections 1 et 2."
      }
    ]
  },
  "philo-stoic-control": {
    "hook": "Le stoïcisme ne dit pas « ne ressens rien ». Il propose de concentrer jugement et action sur ce qui dépend réellement de nous, au lieu d’exiger que le monde obéisse à nos préférences.",
    "keyFacts": [
      "Épictète distingue contrôle propre et événements externes.",
      "L’effort n’est pas le résultat.",
      "Les jugements participent aux émotions.",
      "La vertu compte plus que richesse ou réputation.",
      "Le stoïcisme n’implique pas la passivité."
    ],
    "express": [
      "Épictète distingue ce qui dépend de nous — nos jugements, nos intentions, certaines décisions — et ce qui n’en dépend pas entièrement : réputation, maladie, météo, réaction des autres ou résultat final. La frontière n’est pas toujours simple, mais elle change la question à poser.",
      "Le stoïcien ne devient pas passif. Si un entretien d’embauche compte, il prépare ses réponses, arrive à l’heure et travaille sa compétence. Il reconnaît seulement que la décision du recruteur ne lui appartient pas totalement. L’effort est à lui, le résultat non.",
      "Les émotions ne sont pas simplement supprimées. Les stoïciens analysent le rôle des jugements : une situation nous bouleverse aussi parce que nous lui attribuons une signification. Travailler le jugement peut donc modifier la manière de traverser l’événement.",
      "Cette philosophie vise une liberté intérieure : agir selon ce que l’on estime juste sans faire dépendre toute sa paix d’éléments externes. Elle ne demande pas d’ignorer les injustices ; elle demande de distinguer notre action possible de la maîtrise totale du monde."
    ],
    "complete": [
      {
        "title": "1. La dichotomie du contrôle",
        "text": "Dans le Manuel, Épictète ouvre par une distinction radicale entre ce qui dépend de nous et ce qui n’en dépend pas. Elle ne fournit pas une liste mécanique : elle sert à déplacer l’attention vers le jugement et l’action disponibles."
      },
      {
        "title": "2. Agir sans posséder le résultat",
        "text": "Préparer une compétition, soigner quelqu’un ou défendre une cause suppose une action réelle. Mais aucune action ne garantit parfaitement l’issue. Le stoïcisme sépare excellence de l’effort et possession du résultat."
      },
      {
        "title": "3. Jugements et émotions",
        "text": "Pour les stoïciens, une impression surgit, puis nous pouvons l’examiner. Dire « c’est insupportable » ajoute un jugement à l’événement. Cela ne rend pas toute souffrance imaginaire, mais ouvre un espace de travail sur l’interprétation."
      },
      {
        "title": "4. Vertu et indifférents",
        "text": "La vertu — raison pratique, justice, courage, maîtrise de soi — constitue le bien principal. Santé, richesse ou réputation sont préférables dans de nombreux cas, mais elles ne suffisent pas à rendre une personne bonne."
      },
      {
        "title": "5. Une erreur moderne",
        "text": "Le slogan « contrôle ce que tu peux » devient caricatural s’il sert à accepter n’importe quelle injustice. Une action collective reste une action possible. Ne pas contrôler entièrement une situation ne signifie pas n’avoir aucune prise sur elle."
      }
    ],
    "deeper": [],
    "takeaways": [],
    "quiz": [
      {
        "kind": "concept",
        "q": "Que signifie « ce qui dépend de nous » chez Épictète ?",
        "a": "Principalement nos jugements, intentions et actions propres.",
        "choices": [
          "Tout ce que nous désirons fortement.",
          "Le comportement des autres si nous argumentons bien.",
          "Tous les résultats de nos efforts."
        ],
        "why": "La distinction porte sur notre pouvoir propre.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "nuance",
        "q": "Le stoïcisme recommande-t-il la passivité ?",
        "a": "Non, il distingue l’action possible de la maîtrise du résultat.",
        "choices": [
          "Oui, car tout événement extérieur est sans importance.",
          "Oui, sauf en politique.",
          "Non, car il promet de contrôler tous les résultats."
        ],
        "why": "Agir reste essentiel.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "concept",
        "q": "Quel rôle jouent les jugements dans les émotions selon les stoïciens ?",
        "a": "Ils contribuent à la signification que nous donnons à la situation.",
        "choices": [
          "Ils fabriquent toutes les douleurs physiques.",
          "Ils n’ont aucun lien avec les émotions.",
          "Ils permettent de ne plus jamais ressentir de peur."
        ],
        "why": "Une impression peut être examinée.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "piège",
        "q": "Quelle caricature faut-il éviter ?",
        "a": "« Je ne contrôle pas tout, donc je ne fais rien. »",
        "choices": [
          "« Je prépare ce qui dépend de moi. »",
          "« Je distingue effort et résultat. »",
          "« Je peux agir collectivement. »"
        ],
        "why": "La distinction n’abolit pas l’action.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 5."
      },
      {
        "kind": "synthèse",
        "q": "Dans un examen, quel réflexe est le plus stoïcien ?",
        "a": "Travailler la préparation puis accepter que tout ne soit pas maîtrisable.",
        "choices": [
          "Ne pas réviser pour éviter l’attachement au résultat.",
          "Exiger de contrôler la notation.",
          "Considérer la note comme la seule mesure de sa valeur."
        ],
        "why": "Effort propre, résultat partiellement externe.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Sections 1 et 2."
      }
    ]
  },
  "philo-descartes-doubt": {
    "hook": "Descartes ne doute pas pour rester sceptique. Il pousse le doute volontairement très loin afin de voir s’il existe une proposition qui résiste même à l’hypothèse la plus radicale.",
    "keyFacts": [
      "Le doute cartésien est méthodique.",
      "Le rêve fragilise l’évidence sensible.",
      "Le malin génie radicalise le test.",
      "Le cogito donne une certitude minimale.",
      "Descartes veut reconstruire le savoir."
    ],
    "express": [
      "Dans les Méditations métaphysiques, Descartes examine les croyances reçues. Les sens se trompent parfois ; un rêve peut sembler réel ; il imagine même un trompeur extrêmement puissant. Le doute est méthodique : il est choisi comme outil, pas subi comme incapacité à croire.",
      "Au cœur de ce doute, quelque chose résiste : si je doute, pense ou suis trompé, il faut qu’il y ait une pensée en acte. Le « je pense, donc je suis » formule cette certitude minimale. Il ne prouve pas encore tout le reste du monde.",
      "L’intérêt de la démarche est architectural. Descartes cherche un fondement certain à partir duquel reconstruire le savoir. Le projet dépasse une formule célèbre : il pose la question des critères qui justifient nos croyances.",
      "Le doute cartésien n’oblige donc pas à douter en permanence de chaque chaise. Il s’agit d’une expérience intellectuelle : suspendre provisoirement ce qui pourrait être faux pour identifier ce qui résiste vraiment."
    ],
    "complete": [
      {
        "title": "1. Pourquoi douter ?",
        "text": "Descartes veut réexaminer un ensemble de croyances construites depuis l’enfance. Au lieu de vérifier chaque opinion séparément, il attaque leurs sources : sens, expérience du monde et raisonnement."
      },
      {
        "title": "2. Le rêve",
        "text": "Il arrive que nous rêvions en croyant être éveillés. Cette possibilité ne prouve pas que tout est rêve, mais elle suffit à fragiliser certaines certitudes fondées uniquement sur l’expérience immédiate."
      },
      {
        "title": "3. Le malin génie",
        "text": "L’hypothèse d’un trompeur radical pousse encore plus loin l’expérience : et si même certains raisonnements simples étaient manipulés ? Descartes cherche alors ce qui demeure vrai sous cette hypothèse maximale."
      },
      {
        "title": "4. Le cogito",
        "text": "Au moment même où je pense être trompé, l’acte de penser est présent. La certitude porte sur l’existence du sujet pensant au moment de la pensée. Elle ne contient pas automatiquement une preuve du corps ou du monde extérieur."
      },
      {
        "title": "5. Méthode, pas mode de vie",
        "text": "Le doute est provisoire et stratégique. Le confondre avec un scepticisme permanent fait perdre le but cartésien : trouver un point ferme pour reconstruire la connaissance."
      }
    ],
    "deeper": [],
    "takeaways": [],
    "quiz": [
      {
        "kind": "concept",
        "q": "Pourquoi Descartes utilise-t-il le doute ?",
        "a": "Pour tester les fondements de ses croyances et chercher une certitude résistante.",
        "choices": [
          "Pour prouver que rien n’existe.",
          "Pour éviter toute conclusion philosophique.",
          "Pour montrer que les sens sont toujours faux."
        ],
        "why": "Le doute est méthodique et provisoire.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Sections 1 et 5."
      },
      {
        "kind": "preuve",
        "q": "Que montre l’argument du rêve ?",
        "a": "Que certaines expériences apparemment évidentes peuvent être trompeuses.",
        "choices": [
          "Que nous rêvons tout le temps.",
          "Que le monde extérieur est définitivement impossible.",
          "Que la logique cesse de fonctionner pendant le sommeil."
        ],
        "why": "Il fragilise une source de certitude.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "concept",
        "q": "Qu’est-ce qui résiste au doute au moment du cogito ?",
        "a": "Le fait qu’une pensée est en acte et qu’un sujet pense.",
        "choices": [
          "L’existence certaine de tous les objets physiques.",
          "La vérité de tous nos souvenirs.",
          "La fiabilité parfaite des sens."
        ],
        "why": "Le cogito donne une certitude minimale.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "piège",
        "q": "Quelle conclusion serait trop forte ?",
        "a": "« Je pense, donc tout ce que je perçois existe exactement comme je le perçois. »",
        "choices": [
          "« Si je doute, il y a une pensée. »",
          "« Le doute est ici volontaire. »",
          "« Le cogito ne prouve pas encore tout le monde extérieur. »"
        ],
        "why": "Le cogito ne contient pas tout le reste.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "synthèse",
        "q": "Le doute cartésien est surtout…",
        "a": "Une méthode de test des croyances.",
        "choices": [
          "Une humeur pessimiste.",
          "Une interdiction de faire confiance à l’expérience.",
          "Une preuve que toute science est impossible."
        ],
        "why": "Il est un outil de reconstruction.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 5."
      }
    ]
  },
  "philo-hume-causality": {
    "hook": "Quand une boule de billard en frappe une autre et que la seconde part, nous voyons deux événements qui se suivent. Hume demande : voyons-nous réellement la « nécessité » qui relie la cause à l’effet ?",
    "keyFacts": [
      "Nous observons des successions, pas une nécessité visible.",
      "La répétition produit une attente.",
      "Hume analyse l’habitude.",
      "L’induction ne se justifie pas par une simple démonstration logique.",
      "La science renforce les inférences avec des méthodes."
    ],
    "express": [
      "David Hume part de l’expérience. Nous observons qu’un type d’événement est régulièrement suivi d’un autre : le feu chauffe, un choc déplace une boule, le soleil se lève. Mais nos sens ne montrent pas une connexion nécessaire cachée entre les événements.",
      "Après de nombreuses répétitions, notre esprit s’attend au second événement quand le premier survient. Hume appelle l’attention sur l’habitude : une grande partie de notre confiance dans les causes vient de cette régularité apprise.",
      "Le problème de l’induction apparaît alors. Le fait que le soleil se soit levé chaque jour jusqu’ici justifie fortement notre attente pratique, mais cette répétition ne constitue pas une démonstration logique que demain sera identique.",
      "Hume ne demande pas d’arrêter d’utiliser la causalité. Dans la vie et dans la science, nous devons raisonner à partir de régularités. Il montre plutôt que cette confiance a une structure différente d’une preuve mathématique."
    ],
    "complete": [
      {
        "title": "1. Impression et idée",
        "text": "Hume distingue ce qui est directement donné dans l’expérience et les idées que l’esprit forme. Dans une séquence causale, nous voyons les événements, leur proximité et leur succession, pas une corde invisible de nécessité."
      },
      {
        "title": "2. Conjonction constante",
        "text": "Quand A est régulièrement suivi de B, nous apprenons à associer les deux. Cette répétition est une conjonction constante. Elle nourrit nos anticipations et nos concepts de causalité."
      },
      {
        "title": "3. Le rôle de l’habitude",
        "text": "Après répétition, l’apparition de A fait attendre B. Cette transition mentale n’est pas choisie à chaque fois par un raisonnement formel. L’habitude explique pourquoi nous anticipons naturellement."
      },
      {
        "title": "4. L’induction",
        "text": "Pour justifier que le futur ressemblera au passé, on pourrait invoquer le fait que cela a souvent marché auparavant. Mais cette justification utilise déjà le type de raisonnement inductif qu’elle cherche à justifier. Hume expose une difficulté de fond."
      },
      {
        "title": "5. Conséquence méthodologique",
        "text": "La science moderne ne se contente pas d’une succession observée : elle cherche mécanismes, expériences contrôlées, prédictions et réplications. Cela renforce l’inférence causale sans la transformer en nécessité logique pure."
      }
    ],
    "deeper": [],
    "takeaways": [],
    "quiz": [
      {
        "kind": "concept",
        "q": "Selon Hume, que voyons-nous directement dans une relation causale ?",
        "a": "Des événements, leur succession et leurs régularités.",
        "choices": [
          "Une nécessité invisible entre eux.",
          "La loi complète qui gouverne l’univers.",
          "La preuve logique que le futur sera identique au passé."
        ],
        "why": "La nécessité n’est pas une impression sensible distincte.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "concept",
        "q": "Quel rôle joue l’habitude ?",
        "a": "Elle produit une attente après des répétitions régulières.",
        "choices": [
          "Elle prouve mathématiquement les causes.",
          "Elle rend toute expérience inutile.",
          "Elle remplace la mémoire."
        ],
        "why": "La répétition crée une anticipation.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "piège",
        "q": "Le problème de l’induction affirme-t-il que demain le soleil ne se lèvera pas ?",
        "a": "Non, il questionne la justification logique de notre attente.",
        "choices": [
          "Oui, Hume prédit que le soleil peut ne plus se lever.",
          "Oui, toute prévision est absurde.",
          "Non, parce que l’avenir est démontré par le passé."
        ],
        "why": "Il distingue attente raisonnable et démonstration nécessaire.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "nuance",
        "q": "Hume interdit-il d’utiliser la causalité en science ?",
        "a": "Non, il clarifie le statut de nos inférences causales.",
        "choices": [
          "Oui, seule la description est permise.",
          "Oui, sauf en physique.",
          "Non, car toute succession est automatiquement une cause."
        ],
        "why": "La pratique reste indispensable.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 5."
      },
      {
        "kind": "synthèse",
        "q": "Quel contraste central faut-il retenir ?",
        "a": "Régularité observée versus nécessité logique.",
        "choices": [
          "Perception versus mémoire seulement.",
          "Opinion versus démocratie.",
          "Morale versus politique."
        ],
        "why": "C’est le cœur de l’analyse causale de Hume.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Sections 1 à 4."
      }
    ]
  },
  "philo-ethics-principles-consequences": {
    "hook": "Un dilemme moral devient intéressant quand deux raisons sérieuses tirent dans des directions différentes. Faut-il respecter une règle même si une exception produirait de meilleures conséquences ?",
    "keyFacts": [
      "Conséquentialisme : effets.",
      "Déontologie : devoirs et droits.",
      "L’intention peut compter dans la responsabilité.",
      "Les expériences de pensée isolent des conflits.",
      "Un critère moral doit être appliqué avec cohérence."
    ],
    "express": [
      "Une approche conséquentialiste juge principalement une action par ses effets. Si deux choix sont possibles, elle demande lequel produit le meilleur bilan selon les biens et dommages pertinents. L’utilitarisme est une famille célèbre de cette approche.",
      "Une approche déontologique insiste sur certains devoirs, droits ou interdictions qui ne se réduisent pas à un calcul de résultats. Mentir, utiliser quelqu’un uniquement comme moyen ou violer un droit peut rester problématique même si une conséquence favorable est annoncée.",
      "Dans la pratique, les conflits viennent aussi de l’incertitude. Nous ne connaissons jamais parfaitement les conséquences. Une règle peut protéger contre nos biais ; inversement, une règle absolue peut produire des cas extrêmes difficiles à accepter.",
      "Le but du cours n’est pas de choisir une école en cinq minutes. Il est d’apprendre à identifier ce que l’on fait déjà quand on argumente : parle-t-on surtout des conséquences, d’un principe, d’un droit, d’une intention ou d’une vertu ?"
    ],
    "complete": [
      {
        "title": "1. Conséquences",
        "text": "Une théorie conséquentialiste compare les états du monde produits par les actions. Elle doit donc préciser quels effets comptent, pour qui, avec quel horizon de temps et comment gérer les risques incertains."
      },
      {
        "title": "2. Principes et droits",
        "text": "Une théorie déontologique peut soutenir que certaines personnes ne doivent pas être sacrifiées simplement parce qu’un calcul global paraît avantageux. Les droits posent des limites à ce que l’on peut faire à un individu."
      },
      {
        "title": "3. Intentions et responsabilité",
        "text": "Deux actions ayant le même résultat peuvent être évaluées différemment selon l’intention ou la prévisibilité. Causer un dommage intentionnellement n’est pas toujours jugé comme le provoquer accidentellement."
      },
      {
        "title": "4. Les dilemmes comme tests",
        "text": "Une expérience de pensée simplifie volontairement une situation pour faire apparaître un conflit de principes. Elle ne remplace pas les cas réels, où informations, institutions et alternatives sont plus riches."
      },
      {
        "title": "5. Argumenter proprement",
        "text": "Avant de conclure, il faut dire quelle valeur est prioritaire et pourquoi. Changer de critère uniquement lorsque cela arrange notre intuition produit une morale ad hoc difficile à défendre."
      }
    ],
    "deeper": [],
    "takeaways": [],
    "quiz": [
      {
        "kind": "concept",
        "q": "Une approche conséquentialiste regarde d’abord…",
        "a": "Les effets produits par les options.",
        "choices": [
          "L’ancienneté de la règle.",
          "La personnalité de celui qui agit.",
          "Le nombre de mots utilisés pour justifier l’acte."
        ],
        "why": "Le résultat est le critère principal.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "concept",
        "q": "Une approche déontologique insiste notamment sur…",
        "a": "Des devoirs et des droits qui limitent certains actes.",
        "choices": [
          "Le plaisir immédiat seulement.",
          "La popularité de la décision.",
          "Les conséquences économiques uniquement."
        ],
        "why": "Certains actes peuvent être interdits par principe.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi l’incertitude complique-t-elle le calcul des conséquences ?",
        "a": "Parce que nous ne connaissons pas parfaitement les effets futurs.",
        "choices": [
          "Parce que les conséquences n’existent jamais.",
          "Parce que toute règle devient alors vraie.",
          "Parce que l’intention suffit toujours à décider."
        ],
        "why": "Les prédictions sont limitées.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "piège",
        "q": "Une expérience de pensée décrit-elle nécessairement un cas réaliste complet ?",
        "a": "Non, elle simplifie pour isoler un conflit de principes.",
        "choices": [
          "Oui, sinon elle n’a aucune valeur.",
          "Oui, elle doit reproduire toutes les données du monde réel.",
          "Non, car elle sert seulement à divertir."
        ],
        "why": "C’est un outil de test conceptuel.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "synthèse",
        "q": "Quel réflexe améliore un débat moral ?",
        "a": "Dire explicitement quel critère on utilise et pourquoi.",
        "choices": [
          "Changer de critère à chaque exemple.",
          "Éviter de parler des conséquences.",
          "Refuser toute exception avant d’avoir formulé la règle."
        ],
        "why": "La cohérence des critères compte.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 5."
      }
    ]
  },
  "philo-social-contract-liberty": {
    "hook": "Une règle limite certaines actions, mais l’absence de règles peut aussi laisser les plus forts limiter les autres. La philosophie politique demande donc quel type de contrainte peut être compatible avec la liberté.",
    "keyFacts": [
      "Le contrat social est un modèle de légitimité.",
      "Hobbes privilégie la sécurité sous autorité forte.",
      "Locke défend des droits et un pouvoir limité.",
      "Rousseau relie liberté et participation à la loi.",
      "La force seule ne suffit pas à justifier l’autorité."
    ],
    "express": [
      "Les théories du contrat social imaginent un accord — réel ou hypothétique — permettant de penser la légitimité du pouvoir. Hobbes, Locke et Rousseau ne proposent pas le même contrat, mais tous cherchent à expliquer pourquoi une autorité pourrait être autre chose qu’une simple force.",
      "Chez Hobbes, l’insécurité d’un monde sans autorité commune pousse les individus à transférer une grande partie de leur pouvoir à un souverain capable de garantir la paix. La sécurité joue un rôle central.",
      "Locke insiste davantage sur des droits préexistants, notamment vie, liberté et propriété, et sur un gouvernement limité. Si celui-ci détruit les droits qu’il devait protéger, sa légitimité devient contestable.",
      "Rousseau pose un autre problème : comment obéir à une loi sans être simplement soumis à la volonté d’un autre ? Sa réponse passe par la volonté générale et l’idée que les citoyens participent à la production de la loi commune."
    ],
    "complete": [
      {
        "title": "1. Le contrat comme modèle",
        "text": "Le contrat social n’est pas forcément un événement historique signé par les premiers citoyens. C’est un dispositif théorique pour demander quelles conditions rendraient l’autorité légitime aux yeux d’individus libres."
      },
      {
        "title": "2. Hobbes : sortir de l’insécurité",
        "text": "Hobbes décrit un état de nature marqué par l’incertitude et la vulnérabilité. Une puissance commune réduit le risque de conflit généralisé. Le prix est une autorité souveraine très forte."
      },
      {
        "title": "3. Locke : protéger des droits",
        "text": "Chez Locke, le gouvernement reçoit une mission limitée. Les individus ne cèdent pas tous leurs droits ; le pouvoir politique doit protéger ceux qu’il est institué pour servir."
      },
      {
        "title": "4. Rousseau : s’obéir à soi-même ?",
        "text": "Rousseau distingue l’obéissance à une personne particulière et l’obéissance à une loi dont on est, comme citoyen, co-auteur. La difficulté est de comprendre comment une volonté générale peut être véritablement commune sans écraser les individus."
      },
      {
        "title": "5. Une question toujours actuelle",
        "text": "Les constitutions, élections, droits fondamentaux et limites du pouvoir peuvent se lire comme des réponses institutionnelles à la même question : pourquoi cette règle, décidée de cette manière, a-t-elle autorité sur nous ?"
      }
    ],
    "deeper": [],
    "takeaways": [],
    "quiz": [
      {
        "kind": "concept",
        "q": "À quoi sert l’idée de contrat social ?",
        "a": "À penser les conditions de légitimité d’une autorité politique.",
        "choices": [
          "À raconter la signature historique du premier État.",
          "À montrer que toute loi est injuste.",
          "À supprimer la question des droits individuels."
        ],
        "why": "Le contrat est d’abord un modèle de justification.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "repère",
        "q": "Quel problème est central chez Hobbes ?",
        "a": "L’insécurité et le conflit sans puissance commune.",
        "choices": [
          "La séparation des pouvoirs judiciaires.",
          "La propriété artistique.",
          "La liberté de commerce internationale."
        ],
        "why": "La sécurité motive une autorité forte.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "repère",
        "q": "Que souligne Locke ?",
        "a": "Le gouvernement doit protéger des droits et reste limité.",
        "choices": [
          "Le souverain ne peut jamais perdre sa légitimité.",
          "Les individus abandonnent tous leurs droits.",
          "La sécurité exige toujours un pouvoir absolu."
        ],
        "why": "La mission du gouvernement est conditionnelle.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "nuance",
        "q": "Chez Rousseau, comment la loi peut-elle être compatible avec la liberté ?",
        "a": "Si le citoyen participe à une loi véritablement commune.",
        "choices": [
          "Si aucune règle n’existe.",
          "Si le chef décide seul mais avec de bonnes intentions.",
          "Si chacun applique uniquement les règles qu’il préfère."
        ],
        "why": "Le problème est celui de l’auto-législation collective.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "synthèse",
        "q": "Quel point commun relie ces théories malgré leurs différences ?",
        "a": "Elles cherchent pourquoi le pouvoir peut être légitime plutôt que seulement puissant.",
        "choices": [
          "Elles veulent toutes un État minimal.",
          "Elles refusent toutes la propriété.",
          "Elles donnent exactement la même définition de la liberté."
        ],
        "why": "Leur question commune porte sur la justification de l’autorité.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Sections 1 à 5."
      }
    ]
  }
};
  const RC18_PRACTICE = {
  "philo-argument-thesis-objection": "Prends une affirmation ordinaire : « les devoirs à la maison sont utiles ». Écris d’abord une raison qui soutient la thèse, puis une objection sérieuse, pas une caricature. Demande ensuite ce que l’objection oblige à modifier : faut-il limiter la quantité, distinguer les âges, préciser le type de devoir ou abandonner la thèse ? Termine en reformulant la position adverse de manière qu’un partisan puisse dire « oui, c’est bien ce que je pense ». Cet exercice montre que philosopher ne consiste pas à produire une opinion brillante, mais à rendre visibles les étapes d’un raisonnement, les conditions de validité et les points où l’on pourrait raisonnablement changer d’avis. On peut refaire exactement le même protocole sur une question morale, politique ou quotidienne.",
  "philo-fact-opinion-value": "Choisis un sujet concret, par exemple l’interdiction des voitures dans un centre-ville. Fais trois colonnes. Dans « faits », place uniquement des énoncés susceptibles d’être vérifiés : niveau de pollution, nombre de véhicules, fréquentation des commerces. Dans « valeurs », écris les critères mobilisés : liberté de déplacement, santé, calme, égalité d’accès. Dans « opinions », formule des conclusions qui combinent faits et valeurs. Puis cherche le moment où une discussion peut dérailler : deux personnes peuvent partager les mêmes données mais hiérarchiser différemment les valeurs ; elles peuvent aussi partager une valeur et contester les faits. Cette séparation ne résout pas le désaccord, mais elle indique quel type de preuve ou d’argument est réellement nécessaire pour avancer.",
  "philo-socrates-questioning": "Teste la méthode sur un mot que tout le monde croit comprendre : « courage ». Donne une première définition, puis cherche un cas qui la met en difficulté. Si tu dis que le courage consiste à ne pas avoir peur, pense à quelqu’un qui agit malgré sa peur ; la définition doit être corrigée. Si tu dis qu’il consiste à prendre un risque, pense à un risque stupide pris pour impressionner. Continue jusqu’à obtenir une formule plus précise. L’intérêt n’est pas de découvrir une définition parfaite en cinq minutes, mais de sentir la différence entre un exemple et un critère général. La méthode fonctionne aussi avec justice, liberté, loyauté ou réussite : définir, tester, trouver l’exception, reformuler.",
  "philo-stoic-control": "Prends une situation qui crée une vraie tension : examen, rendez-vous médical, compétition, entretien, conflit. Trace trois zones : « sous mon contrôle direct », « influençable mais non maîtrisable », « extérieur ». Une préparation, un message ou une décision personnelle entrent souvent dans la première zone ; la réaction d’un autre ou le résultat final dans les suivantes. Choisis ensuite une action concrète pour la première zone. L’exercice évite deux erreurs opposées : croire que tout dépend de soi, ce qui transforme chaque échec en faute personnelle, ou croire que rien ne dépend de soi, ce qui devient du fatalisme. La distinction stoïcienne est utile précisément parce qu’elle recentre l’énergie sur l’action disponible sans promettre de dominer le monde.",
  "philo-descartes-doubt": "Fais une mini-expérience cartésienne avec une croyance banale : « mon téléphone indique la bonne heure ». Première étape : quelles raisons as-tu de le croire ? Deuxième étape : quelles erreurs sont possibles — mauvais fuseau, batterie, synchronisation, affichage ? Troisième étape : qu’est-ce qui resterait certain même si l’affichage était faux ? L’exercice montre qu’un doute méthodique ne consiste pas à devenir paranoïaque. Il hiérarchise les niveaux de certitude et oblige à distinguer ce qui est directement présent de ce qui est inféré. On peut ensuite reconstruire la confiance avec de nouvelles vérifications. La démarche cartésienne est donc moins « ne crois rien » que « sache pourquoi tu accordes tel degré de confiance à telle croyance ». Compare enfin deux croyances et classe-les par degré de certitude pour rendre la méthode concrète.",
  "philo-hume-causality": "Observe une corrélation quotidienne : quand tu dors peu, tu te sens souvent moins concentré. Avant de conclure « le manque de sommeil cause forcément chaque baisse de concentration », liste les autres variables possibles : stress, caféine, maladie, difficulté de la tâche. Puis demande ce qu’une meilleure enquête devrait faire : comparer plusieurs jours, mesurer, contrôler certains facteurs, chercher un mécanisme. Tu reproduis ainsi, à petite échelle, le problème humeien : la répétition construit une attente, mais le lien causal demande plus qu’une succession. La bonne conclusion n’est pas qu’on ne sait jamais rien ; c’est qu’il faut calibrer la force de nos affirmations selon la qualité des observations et des tests disponibles. Cherche ensuite un exemple où une corrélation disparaît quand une troisième variable est contrôlée : c’est un excellent test de prudence causale.",
  "philo-ethics-principles-consequences": "Choisis un dilemme simple : faut-il mentir pour éviter une humiliation inutile à quelqu’un ? Analyse-le successivement avec trois lunettes. Conséquences : quels dommages ou bénéfices probables pour chaque personne ? Principe : existe-t-il un devoir de vérité ou une interdiction de manipuler ? Intention : cherche-t-on à protéger, à éviter un conflit ou à se protéger soi-même ? Ensuite change un détail — le mensonge cache-t-il un danger sérieux ? — et vois si ton jugement change. Si oui, explique quel critère a bougé. L’exercice ne cherche pas une réponse universelle ; il apprend à repérer les raisons réellement actives dans notre jugement et à éviter de changer silencieusement de règle quand l’intuition devient inconfortable. Pour finir, explique quelle information supplémentaire pourrait réellement te faire changer de jugement : ce test révèle si ton raisonnement reste ouvert à la révision.",
  "philo-social-contract-liberty": "Imagine une petite communauté qui doit décider d’une règle de bruit la nuit. Sans règle, chacun garde une liberté maximale immédiate, mais certains peuvent empêcher les autres de dormir. Une règle commune réduit donc une possibilité d’action tout en protégeant une autre liberté. Demande ensuite qui décide, selon quelle procédure, avec quelles exceptions et quels recours. Hobbes attire l’attention sur la sécurité et l’autorité nécessaire pour faire respecter la règle ; Locke sur les droits que le pouvoir doit protéger ; Rousseau sur la participation des citoyens à la loi commune. Le cas est volontairement banal : il montre que la philosophie politique ne commence pas seulement avec les constitutions, mais avec la question de la justification de toute contrainte collective."
};
  Object.entries(RC18_PRACTICE).forEach(([id, text]) => { if (PACKS[id]) PACKS[id].complete.push({ title: "6. Mise en pratique", text }); });

  const MYSTERIES = [
  {
    "id": "philo-mystery-strawman-318",
    "discipline": "philosophy",
    "difficulty": "facile",
    "title": "L’argument qu’on n’a jamais vraiment entendu",
    "caseTitle": "Adversaire en carton",
    "subjectType": "erreur de raisonnement",
    "periodHint": "méthode",
    "lessonId": "philo-argument-thesis-objection",
    "missionQuestion": "Quel procédé de raisonnement est décrit ?",
    "answerInstruction": "Choisis le nom du procédé.",
    "prompt": "Quelqu’un simplifie la position adverse jusqu’à la rendre absurde, puis célèbre sa réfutation. Il n’a jamais répondu à la version solide de l’argument.",
    "answer": "L’homme de paille",
    "aliases": [
      "homme de paille",
      "un homme de paille",
      "straw man",
      "strawman"
    ],
    "clues": [
      "La cible réfutée est une caricature.",
      "Le problème n’est pas une prémisse fausse mais une position adverse reconstruite de manière déloyale.",
      "Le principe de charité permet précisément de l’éviter."
    ],
    "explanation": "L’homme de paille consiste à attaquer une version affaiblie de la position adverse.",
    "blockedGuesses": [
      "argument d’autorité",
      "ad hominem",
      "contre-exemple"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "philo-mystery-is-ought-318",
    "discipline": "philosophy",
    "difficulty": "moyen",
    "title": "Le saut entre ce qui existe et ce qu’il faudrait faire",
    "caseTitle": "Un « donc » trop rapide",
    "subjectType": "distinction conceptuelle",
    "periodHint": "méthode",
    "lessonId": "philo-fact-opinion-value",
    "missionQuestion": "Quelle confusion faut-il repérer ?",
    "answerInstruction": "Choisis la meilleure formulation.",
    "prompt": "« Cette pratique existe depuis des siècles, donc nous devons la conserver. » Une description historique est utilisée comme si elle contenait déjà une norme.",
    "answer": "Passer du fait à la norme",
    "aliases": [
      "fait à la norme",
      "passage du fait a la norme",
      "est au doit",
      "is ought"
    ],
    "clues": [
      "La première partie décrit ce qui est.",
      "La conclusion affirme ce qui doit être.",
      "Une prémisse normative manque entre les deux."
    ],
    "explanation": "Un fait ne suffit pas, à lui seul, à produire une obligation.",
    "blockedGuesses": [
      "homme de paille",
      "contradiction",
      "argument circulaire"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "philo-mystery-control-318",
    "discipline": "philosophy",
    "difficulty": "facile",
    "title": "Préparer sans posséder le résultat",
    "caseTitle": "Effort versus résultat",
    "subjectType": "notion stoïcienne",
    "periodHint": "Antiquité",
    "lessonId": "philo-stoic-control",
    "missionQuestion": "Quelle idée philosophique guide cette attitude ?",
    "answerInstruction": "Choisis la notion la plus précise.",
    "prompt": "Une personne prépare soigneusement son entretien. Elle se concentre sur ses réponses et sa ponctualité, tout en acceptant que la décision finale du recruteur ne soit pas entièrement sous son contrôle.",
    "answer": "La dichotomie du contrôle",
    "aliases": [
      "dichotomie du controle",
      "ce qui dépend de nous",
      "ce qui depend de nous"
    ],
    "clues": [
      "Épictète en fait un point de départ.",
      "L’action reste nécessaire.",
      "L’idée sépare effort propre et résultat externe."
    ],
    "explanation": "Le stoïcisme distingue ce qui dépend de nous de ce qui ne dépend pas entièrement de nous.",
    "blockedGuesses": [
      "fatalisme",
      "hédonisme",
      "scepticisme"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "philo-mystery-cogito-318",
    "discipline": "philosophy",
    "difficulty": "moyen",
    "title": "La certitude qui survit au doute",
    "caseTitle": "Même trompé, quelque chose reste",
    "subjectType": "argument philosophique",
    "periodHint": "XVIIe siècle",
    "lessonId": "philo-descartes-doubt",
    "missionQuestion": "Quel argument est au cœur de ce dossier ?",
    "answerInstruction": "Choisis son nom usuel.",
    "prompt": "Même si un trompeur rend toutes mes perceptions douteuses, le fait même que je doute implique qu’une pensée est en train d’avoir lieu.",
    "answer": "Le cogito",
    "aliases": [
      "cogito",
      "je pense donc je suis",
      "cogito ergo sum"
    ],
    "clues": [
      "Descartes pousse le doute très loin.",
      "La certitude porte d’abord sur l’acte de penser.",
      "Elle ne prouve pas encore à elle seule le monde extérieur."
    ],
    "explanation": "Le cogito est le point de certitude trouvé par Descartes dans l’exercice du doute.",
    "blockedGuesses": [
      "malin génie",
      "empirisme",
      "induction"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "philo-mystery-induction-318",
    "discipline": "philosophy",
    "difficulty": "difficile",
    "title": "Demain ressemblera-t-il forcément à hier ?",
    "caseTitle": "La régularité sans démonstration",
    "subjectType": "problème philosophique",
    "periodHint": "XVIIIe siècle",
    "lessonId": "philo-hume-causality",
    "missionQuestion": "Quel problème philosophique est décrit ?",
    "answerInstruction": "Choisis son nom.",
    "prompt": "Nous attendons le même type d’effet parce qu’il a toujours suivi le même type de cause. Mais utiliser le passé pour garantir que le futur lui ressemblera semble déjà supposer ce que l’on veut prouver.",
    "answer": "Le problème de l’induction",
    "aliases": [
      "problème de l'induction",
      "probleme de l induction",
      "induction"
    ],
    "clues": [
      "Hume analyse cette difficulté.",
      "Elle concerne notre confiance dans les régularités futures.",
      "Une répétition forte n’est pas une nécessité logique."
    ],
    "explanation": "Le problème de l’induction interroge la justification de notre passage des régularités passées aux attentes futures.",
    "blockedGuesses": [
      "cogito",
      "dilemme moral",
      "contrat social"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "philo-mystery-contract-318",
    "discipline": "philosophy",
    "difficulty": "moyen",
    "title": "Pourquoi cette règle aurait-elle autorité sur moi ?",
    "caseTitle": "Pouvoir ou légitimité",
    "subjectType": "modèle politique",
    "periodHint": "XVIIe → XVIIIe siècle",
    "lessonId": "philo-social-contract-liberty",
    "missionQuestion": "Quel modèle politique cherche à répondre à cette question ?",
    "answerInstruction": "Choisis le concept.",
    "prompt": "On imagine les conditions dans lesquelles des individus libres pourraient accepter une autorité commune. Le but n’est pas de retrouver un document réellement signé par les premiers citoyens.",
    "answer": "Le contrat social",
    "aliases": [
      "contrat social",
      "le contrat social",
      "social contract"
    ],
    "clues": [
      "Hobbes, Locke et Rousseau en donnent des versions différentes.",
      "Il sert à penser la légitimité.",
      "Il s’agit d’un modèle théorique, pas nécessairement d’un événement historique."
    ],
    "explanation": "Le contrat social sert à demander dans quelles conditions l’autorité politique peut être légitime.",
    "blockedGuesses": [
      "séparation des pouvoirs",
      "droit naturel",
      "volonté générale"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  }
];
  const addLesson = (worldId, lesson) => {
    if (!Array.isArray(data.lessons[worldId])) data.lessons[worldId] = [];
    if (!data.lessons[worldId].some(item => item?.id === lesson.id)) data.lessons[worldId].push(lesson);
  };
  if (!DISCIPLINES.some(item => item.id === DISCIPLINE.id)) DISCIPLINES.push(DISCIPLINE);
  DISCIPLINE_OUTLINES[DISCIPLINE.id] = { groups: GROUPS, worlds: WORLDS };
  PLANNED_DISCIPLINE_GROUPS[DISCIPLINE.id] = GROUPS;
  PLANNED_DISCIPLINE_WORLDS[DISCIPLINE.id] = WORLDS;
  DISCIPLINE_MODE_COPY[DISCIPLINE.id] = {
  "label": "Mode Philosophie",
  "shortLabel": "Philo",
  "noun": "philosophique",
  "headline": "Apprends à raisonner avant de mémoriser des auteurs.",
  "promise": "Chaque parcours part d’un problème, met les arguments à l’épreuve et introduit les auteurs quand ils deviennent utiles.",
  "discoveryTitle": "Problèmes philosophiques à explorer",
  "discoveryIntro": "Définitions, objections, expériences de pensée et grands textes sans récitation scolaire."
};
  if (typeof BETA107_DISCIPLINE_THEME !== "undefined") BETA107_DISCIPLINE_THEME[DISCIPLINE.id] = {"accent": "#c084fc", "bg1": "#32164b", "bg2": "#140b22", "bg3": "#080511", "glow1": "rgba(192,132,252,.25)", "glow2": "rgba(56,189,248,.13)"};
  Object.entries(LESSONS).forEach(([worldId, items]) => items.forEach(item => addLesson(worldId, item)));
  Object.keys(PACKS).forEach(id => PUBLISHED_LESSON_IDS.add(id));
  Object.assign(READY_LESSON_PACKS, PACKS);
  if (typeof invalidateCatalogCaches === "function") invalidateCatalogCaches(); else lessonIndexCache = null;
  if (!Array.isArray(data.mysteries)) data.mysteries = [];
  const knownMysteries = new Set(data.mysteries.map(item => item?.id));
  MYSTERIES.forEach(item => { if (!knownMysteries.has(item.id)) data.mysteries.push(item); });
  const quality = Object.fromEntries(Object.entries(PACKS).map(([id, p]) => [id, rawPublishedQuality(p)]));
  const audit = { version: VERSION, discipline: DISCIPLINE.id, groups: GROUPS.length, worlds: WORLDS.length, lessons: Object.keys(PACKS).length, mysteries: MYSTERIES.length, quality, ok: Object.values(quality).every(item => item.pass) };
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, [DISCIPLINE.id]: audit }; } catch {}
  if (!audit.ok) try { console.warn("HistoDaily discipline audit", audit); } catch {}
  try { if (typeof renderSoon === "function") renderSoon(); else if (typeof render === "function") render(); } catch {}
})();
