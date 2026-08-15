/* HistoDaily 1.0.0-rc.18.0 — discipline Anglais. */
(function histodailyRC18English(){
  "use strict";
  const VERSION = "1.0.0-rc.18.0";
  const DISCIPLINE = {
  "id": "english",
  "title": "Anglais",
  "emoji": "💬",
  "accent": "#38bdf8",
  "description": "Compréhension, nuances, reformulation et anglais réel en contexte."
};
  const GROUPS = [
  {
    "id": "eng-understand",
    "title": "1. Comprendre sans traduire mot à mot",
    "range": "A2 → B1",
    "description": "Contexte, faux amis, petits mots et indices qui permettent de reconstruire le sens."
  },
  {
    "id": "eng-natural",
    "title": "2. Anglais naturel et registre",
    "range": "B1",
    "description": "Politesse, implicite, phrasal verbs et formulations réellement utilisées."
  },
  {
    "id": "eng-rephrase",
    "title": "3. Reformuler quand le mot manque",
    "range": "B1 → B2",
    "description": "Paraphrase, clarification et stratégies pour continuer une conversation sans bloquer."
  },
  {
    "id": "eng-read-between",
    "title": "4. Comprendre le raisonnement et l’implicite",
    "range": "B1 → B2",
    "description": "Connecteurs, sous-entendus, nuances et lecture active de phrases naturelles."
  }
];
  const WORLDS = [
  {
    "id": "eng-context",
    "title": "Le sens par le contexte",
    "emoji": "🕵️",
    "subtitle": "Déduire avant de traduire",
    "timeframe": "A2 → B1",
    "accent": "#38bdf8",
    "group": "eng-understand",
    "sortStart": 1,
    "discipline": "english",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "eng-false-friends",
    "title": "Faux amis utiles",
    "emoji": "🪤",
    "subtitle": "Actually, eventually, current…",
    "timeframe": "A2 → B1",
    "accent": "#60a5fa",
    "group": "eng-understand",
    "sortStart": 2,
    "discipline": "english",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "eng-small-words",
    "title": "Petits mots, gros sens",
    "emoji": "🔬",
    "subtitle": "Still, yet, already, even",
    "timeframe": "B1",
    "accent": "#22c55e",
    "group": "eng-understand",
    "sortStart": 3,
    "discipline": "english",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "eng-register",
    "title": "Politesse et registre",
    "emoji": "🎚️",
    "subtitle": "Être naturel sans être brutal",
    "timeframe": "B1",
    "accent": "#a78bfa",
    "group": "eng-natural",
    "sortStart": 10,
    "discipline": "english",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "eng-phrasal",
    "title": "Phrasal verbs en situation",
    "emoji": "🔀",
    "subtitle": "Comprendre le verbe dans la scène",
    "timeframe": "B1",
    "accent": "#f59e0b",
    "group": "eng-natural",
    "sortStart": 11,
    "discipline": "english",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "eng-paraphrase",
    "title": "Paraphraser et se débrouiller",
    "emoji": "♻️",
    "subtitle": "Dire autrement au lieu de bloquer",
    "timeframe": "B1 → B2",
    "accent": "#14b8a6",
    "group": "eng-rephrase",
    "sortStart": 20,
    "discipline": "english",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "eng-connectors",
    "title": "Connecteurs et logique",
    "emoji": "🔗",
    "subtitle": "Although, however, therefore…",
    "timeframe": "B1 → B2",
    "accent": "#fb7185",
    "group": "eng-read-between",
    "sortStart": 30,
    "discipline": "english",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "eng-implicit",
    "title": "Lire entre les lignes",
    "emoji": "👀",
    "subtitle": "Sous-entendu, prudence, désaccord",
    "timeframe": "B2",
    "accent": "#8b5cf6",
    "group": "eng-read-between",
    "sortStart": 31,
    "discipline": "english",
    "planned": true,
    "unlockedByDefault": false
  }
];
  const LESSONS = {
  "eng-context": [
    {
      "id": "eng-context-inference",
      "title": "Comprendre un mot inconnu sans sortir le dictionnaire",
      "period": "A2 → B1",
      "location": "Anglais en contexte",
      "emoji": "🕵️",
      "xp": 70,
      "order": 1
    }
  ],
  "eng-false-friends": [
    {
      "id": "eng-false-friends-core",
      "title": "Actually, eventually, currently : les faux amis qui changent tout",
      "period": "A2 → B1",
      "location": "Anglais quotidien",
      "emoji": "🪤",
      "xp": 70,
      "order": 1
    }
  ],
  "eng-small-words": [
    {
      "id": "eng-still-yet-already-even",
      "title": "Still, yet, already, even : quatre mots qui changent la nuance",
      "period": "B1",
      "location": "Anglais quotidien",
      "emoji": "🔬",
      "xp": 70,
      "order": 1
    }
  ],
  "eng-register": [
    {
      "id": "eng-polite-register",
      "title": "Could you…? I’m afraid… : demander et nuancer naturellement",
      "period": "B1",
      "location": "Conversation",
      "emoji": "🎚️",
      "xp": 70,
      "order": 1
    }
  ],
  "eng-phrasal": [
    {
      "id": "eng-phrasal-context",
      "title": "Phrasal verbs : comprendre la scène avant le dictionnaire",
      "period": "B1",
      "location": "Conversation",
      "emoji": "🔀",
      "xp": 70,
      "order": 1
    }
  ],
  "eng-paraphrase": [
    {
      "id": "eng-paraphrase-repair",
      "title": "Le mot te manque ? Paraphrase au lieu de passer en français",
      "period": "B1 → B2",
      "location": "Conversation",
      "emoji": "♻️",
      "xp": 70,
      "order": 1
    }
  ],
  "eng-connectors": [
    {
      "id": "eng-connectors-logic",
      "title": "Although, however, despite, therefore : suivre la logique",
      "period": "B1 → B2",
      "location": "Lecture et expression",
      "emoji": "🔗",
      "xp": 70,
      "order": 1
    }
  ],
  "eng-implicit": [
    {
      "id": "eng-implicit-meaning",
      "title": "Lire entre les lignes : désaccord, prudence et sous-entendu",
      "period": "B2",
      "location": "Conversation et lecture",
      "emoji": "👀",
      "xp": 70,
      "order": 1
    }
  ]
};
  const PACKS = {
  "eng-context-inference": {
    "hook": "Le réflexe utile n’est pas « je ne connais pas ce mot, donc je ne comprends pas ». On apprend à récupérer le sens global grâce à la situation, à la grammaire et aux mots voisins avant de vérifier au dictionnaire.",
    "keyFacts": [
      "Commencer par la scène globale.",
      "La fonction grammaticale réduit les hypothèses.",
      "Les connecteurs révèlent la logique.",
      "Une compréhension provisoire peut suffire.",
      "Vérifier les mots vraiment bloquants."
    ],
    "express": [
      "Imagine : “The road was flooded, so we had to turn back.” Même si flooded est inconnu, road, so et turn back donnent une structure. Quelque chose sur la route empêche de continuer. Le sens précis peut ensuite être confirmé, mais la phrase est déjà utilisable.",
      "Le premier indice est grammatical. Un mot placé après was peut être un adjectif ou un participe ; après to, on attend un verbe ; entre a et noun, on trouve souvent un adjectif. Identifier la fonction réduit énormément les possibilités.",
      "Le deuxième indice est logique. Because annonce une cause, but un contraste, so une conséquence. Les mots autour créent donc un petit réseau de contraintes. On ne devine pas au hasard : on construit l’hypothèse la plus compatible avec la scène.",
      "Enfin, on accepte une compréhension provisoire. Pour suivre une vidéo, un article ou une conversation, connaître “environ” le sens suffit souvent. On vérifie seulement les mots qui bloquent vraiment l’action ou reviennent souvent."
    ],
    "complete": [
      {
        "title": "1. Global before local",
        "text": "Commence par répondre à trois questions : qui parle ? de quoi ? qu’est-ce qui se passe ? Le sens de la phrase entière vient avant la traduction parfaite de chaque mot. Cette stratégie évite qu’un seul mot inconnu arrête toute la lecture."
      },
      {
        "title": "2. Grammar gives clues",
        "text": "Dans “She looked exhausted after the trip”, looked fonctionne comme un verbe de liaison et exhausted décrit l’état de la personne. Même sans traduction précise, on sait que le mot est une description, probablement négative ou liée à la fatigue grâce à after the trip."
      },
      {
        "title": "3. Logic words matter",
        "text": "But signale une opposition : “It was expensive, but worth it.” Le second morceau corrige l’impression du premier. So signale un résultat ; although introduit une concession. Ces petits mots sont souvent plus importants que le vocabulaire rare."
      },
      {
        "title": "4. Build a temporary meaning",
        "text": "Une hypothèse provisoire peut être “route impraticable” avant de savoir que flooded signifie inondée. L’objectif est de continuer. Si le mot revient, si une consigne en dépend ou si plusieurs interprétations restent possibles, on vérifie."
      },
      {
        "title": "5. No word-for-word addiction",
        "text": "Traduire chaque groupe dans l’ordre anglais peut créer des phrases françaises artificielles et masquer l’idée. La compréhension robuste consiste à reconstruire le message, puis seulement à comparer les formulations entre les deux langues."
      }
    ],
    "deeper": [],
    "takeaways": [
      {
        "label": "Réflexe",
        "text": "Qui ? quoi ? qu’est-ce qui change ?"
      },
      {
        "label": "Indice",
        "text": "Regarde la grammaire et les connecteurs."
      },
      {
        "label": "Dictionnaire",
        "text": "Vérifie après avoir formulé ton hypothèse."
      }
    ],
    "quiz": [
      {
        "kind": "context",
        "q": "Dans “The road was flooded, so we had to turn back”, que peut-on déduire avant de traduire flooded ?",
        "a": "La route empêchait de continuer.",
        "choices": [
          "La route était probablement plus courte.",
          "Ils avaient décidé de courir.",
          "Le voyage avait déjà fini normalement."
        ],
        "why": "So + turn back donnent la conséquence.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Introduction et section 4."
      },
      {
        "kind": "grammar",
        "q": "Dans “She looked exhausted”, exhausted sert surtout à…",
        "a": "Décrire l’état de she.",
        "choices": [
          "Nommer une action future.",
          "Indiquer un lieu.",
          "Remplacer le sujet."
        ],
        "why": "Looked fonctionne ici comme verbe de liaison.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "logic",
        "q": "Quel mot signale le plus clairement un contraste ?",
        "a": "But.",
        "choices": [
          "So.",
          "Because.",
          "And."
        ],
        "why": "But oppose deux idées.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "strategy",
        "q": "Quand faut-il absolument vérifier un mot ?",
        "a": "Quand il bloque le sens ou l’action, ou revient souvent.",
        "choices": [
          "À chaque mot inconnu.",
          "Jamais, il faut toujours deviner.",
          "Uniquement à la fin d’un livre."
        ],
        "why": "La vérification devient ciblée.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "synthèse",
        "q": "Quel est le bon ordre de travail ?",
        "a": "Comprendre la scène, formuler une hypothèse, puis vérifier si nécessaire.",
        "choices": [
          "Traduire chaque mot, puis chercher le sujet.",
          "Mémoriser le dictionnaire avant de lire.",
          "Ignorer les connecteurs logiques."
        ],
        "why": "Le sens global guide le détail.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Sections 1 à 5."
      }
    ]
  },
  "eng-false-friends-core": {
    "hook": "Les faux amis sont dangereux parce qu’ils donnent l’impression de comprendre. Actually ne veut généralement pas dire « actuellement », eventually ne veut pas dire « éventuellement », et currently ne veut pas dire « couramment ».",
    "keyFacts": [
      "Actually = en fait.",
      "Eventually = finalement / finir par.",
      "Current/currently = actuel/actuellement.",
      "Attend = assister à.",
      "Assist = aider."
    ],
    "express": [
      "Actually sert souvent à corriger, préciser ou surprendre : “I thought he was British, but he’s actually Irish.” Ici, le sens naturel est « en fait ». Pour « actuellement », on dira plutôt currently, at the moment ou right now selon le contexte.",
      "Eventually signifie « finalement », souvent après un processus ou une attente : “After three attempts, she eventually passed the exam.” Éventuellement se traduit plutôt par possibly, perhaps ou, selon la phrase, if necessary.",
      "Current signifie « actuel » : current situation, current price. Library est une bibliothèque, not une librairie ; to attend signifie assister à, pas attendre ; to assist signifie aider, pas assister à un événement.",
      "La bonne méthode n’est pas une longue liste de pièges. On apprend chaque faux ami dans une mini-scène et avec son concurrent français le plus tentant. Le contexte devient alors plus mémorable qu’une paire de mots isolés."
    ],
    "complete": [
      {
        "title": "1. Actually = en fait",
        "text": "“Actually, I don’t drink coffee.” peut corriger une supposition : « En fait, je ne bois pas de café. » Le mot peut aussi introduire une précision. Il ne porte pas normalement le sens temporel de actuellement."
      },
      {
        "title": "2. Eventually = finalement",
        "text": "Eventually décrit l’issue à la fin d’un délai, d’une évolution ou de plusieurs essais. “We eventually found the hotel” signifie qu’on a fini par le trouver."
      },
      {
        "title": "3. Attend / assist",
        "text": "“I attended the meeting” = j’ai assisté à la réunion. “Can you assist me?” = pouvez-vous m’aider ? L’anglais et le français ont croisé les sens de mots visuellement proches."
      },
      {
        "title": "4. Current / currently",
        "text": "Current est un adjectif : current account, current version. Currently est un adverbe : “I’m currently working from home.” Les deux expriment l’idée d’actuel ou actuellement."
      },
      {
        "title": "5. Learning by contrast",
        "text": "Une phrase courte vaut mieux qu’une liste abstraite : “She eventually arrived” oppose naturellement finalement à éventuellement. On mémorise la situation, le sens et une formulation concurrente. Puis on produit sa propre phrase avec le même mot afin de vérifier qu’on sait l’utiliser sans repasser par le français."
      }
    ],
    "deeper": [],
    "takeaways": [],
    "quiz": [
      {
        "kind": "meaning",
        "q": "“Actually, I live in Lyon.” signifie le plus souvent…",
        "a": "« En fait, j’habite à Lyon. »",
        "choices": [
          "« Actuellement, j’habite à Lyon. » obligatoirement.",
          "« Éventuellement, j’habite à Lyon. »",
          "« J’habite habituellement à Lyon. »"
        ],
        "why": "Actually corrige ou précise.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "meaning",
        "q": "“They eventually agreed.” signifie…",
        "a": "« Ils ont fini par être d’accord. »",
        "choices": [
          "« Ils seront peut-être d’accord. »",
          "« Ils sont actuellement d’accord. »",
          "« Ils ont assisté à l’accord. »"
        ],
        "why": "Eventually = finalement / finir par.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "meaning",
        "q": "“I attended the conference.” signifie…",
        "a": "« J’ai assisté à la conférence. »",
        "choices": [
          "« J’ai attendu la conférence. »",
          "« J’ai aidé la conférence. »",
          "« J’ai organisé la conférence. »"
        ],
        "why": "Attend = assister à.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "meaning",
        "q": "“Could you assist me?” veut dire…",
        "a": "« Pourriez-vous m’aider ? »",
        "choices": [
          "« Pourriez-vous assister à ma place ? »",
          "« Pourriez-vous m’attendre ? »",
          "« Pourriez-vous m’inscrire ? »"
        ],
        "why": "Assist = aider.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "synthèse",
        "q": "Comment mémoriser un faux ami plus solidement ?",
        "a": "Dans une phrase qui montre le sens et le piège concurrent.",
        "choices": [
          "En répétant seulement deux mots isolés.",
          "En évitant de le rencontrer en contexte.",
          "En traduisant toujours par le mot français ressemblant."
        ],
        "why": "Le contraste contextualisé construit une trace plus fiable.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 5."
      }
    ]
  },
  "eng-still-yet-already-even": {
    "hook": "Still, yet, already et even sont de petits mots très fréquents. Ils ne changent pas les faits principaux ; ils changent la manière dont le locuteur situe ces faits par rapport à une attente.",
    "keyFacts": [
      "Still : continuation.",
      "Yet : attente jusqu’à maintenant.",
      "Already : avant le point attendu.",
      "Even : cas surprenant sur une échelle.",
      "La traduction dépend de la phrase."
    ],
    "express": [
      "Still exprime souvent qu’une situation continue : “I’m still waiting.” On s’attendait peut-être à ce qu’elle soit terminée, mais elle dure. Dans une phrase négative, “I still don’t understand” insiste sur la persistance du problème.",
      "Yet apparaît souvent dans les questions et négations : “Have you finished yet?” / “I haven’t finished yet.” Il regarde vers une action attendue jusqu’au moment présent. Le français utilise souvent « déjà » dans la question et « pas encore » dans la négation.",
      "Already signale qu’une chose est réalisée plus tôt que prévu ou simplement avant le point de référence : “I’ve already eaten.” Il peut porter une nuance de surprise : “Is it five o’clock already?”",
      "Even met en relief un élément surprenant : “Even Tom understood.” Le locuteur présente Tom comme un cas moins attendu. Comprendre even suppose donc de repérer l’échelle implicite derrière la phrase."
    ],
    "complete": [
      {
        "title": "1. Still = continuation",
        "text": "Still relie le présent à une situation antérieure qui se poursuit. “She still works there” indique que c’était vrai avant et que cela reste vrai maintenant."
      },
      {
        "title": "2. Yet = attente ouverte",
        "text": "Dans “I haven’t called him yet”, l’action n’a pas eu lieu jusqu’ici mais reste envisagée. Yet ne signifie donc pas seulement « maintenant » ; il encode une attente non satisfaite."
      },
      {
        "title": "3. Already = avant le repère",
        "text": "“We already knew” place la connaissance avant un autre moment du récit. Dans le présent parfait, “I’ve already done it” indique que la tâche est accomplie avant maintenant, souvent contrairement à une attente de délai."
      },
      {
        "title": "4. Even = surprise sur une échelle",
        "text": "“Even the cheapest option is expensive” signifie que si même l’option supposée la moins chère reste chère, les autres le sont probablement davantage. Even signale le cas considéré comme extrême ou surprenant."
      },
      {
        "title": "5. Traduire l’intention, pas seulement le mot",
        "text": "Still peut devenir encore/toujours, yet déjà/pas encore, already déjà, even même. La traduction dépend de la structure de la phrase et de l’attente implicite."
      }
    ],
    "deeper": [],
    "takeaways": [],
    "quiz": [
      {
        "kind": "nuance",
        "q": "“I’m still waiting” ajoute quelle idée ?",
        "a": "La situation continue alors qu’elle aurait pu être terminée.",
        "choices": [
          "L’attente commencera plus tard.",
          "L’attente est impossible.",
          "La personne vient juste d’arriver."
        ],
        "why": "Still = continuation.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "nuance",
        "q": "“I haven’t finished yet” signifie naturellement…",
        "a": "« Je n’ai pas encore fini. »",
        "choices": [
          "« J’ai déjà fini. »",
          "« Je ne finirai jamais. »",
          "« Je finissais encore hier. »"
        ],
        "why": "Yet dans la négation encode une attente ouverte.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "nuance",
        "q": "“I’ve already eaten” indique…",
        "a": "Que le repas est déjà terminé avant le point de référence.",
        "choices": [
          "Que le repas est encore en cours.",
          "Que le repas n’a pas commencé.",
          "Que manger est surprenant en soi."
        ],
        "why": "Already place l’action plus tôt.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "nuance",
        "q": "Dans “Even Tom understood”, even suggère que…",
        "a": "Tom était présenté comme un cas moins attendu.",
        "choices": [
          "Tom était le seul à parler.",
          "Tom a expliqué la phrase.",
          "Tout le monde s’attendait surtout à ce que Tom comprenne."
        ],
        "why": "Even crée une échelle implicite.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "synthèse",
        "q": "Pourquoi une traduction fixe de ces mots est-elle risquée ?",
        "a": "Parce que leur sens dépend de l’attente et de la structure.",
        "choices": [
          "Parce qu’ils n’ont aucun sens en français.",
          "Parce qu’ils sont toujours optionnels.",
          "Parce qu’ils changent uniquement le temps grammatical."
        ],
        "why": "La nuance se reconstruit dans le contexte.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 5."
      }
    ]
  },
  "eng-polite-register": {
    "hook": "L’anglais naturel n’est pas seulement correct ou incorrect. “Send me the file” est grammatical, mais peut sonner brusque dans un contexte où “Could you send me the file?” est plus adapté.",
    "keyFacts": [
      "Could you…? sert souvent à demander.",
      "I’m afraid… atténue une mauvaise nouvelle.",
      "Would you mind + -ing.",
      "Not at all peut accepter une demande avec mind.",
      "Le registre dépend de la relation."
    ],
    "express": [
      "Could you…? et Would you…? transforment souvent un impératif en demande. La question ne porte pas réellement sur la capacité physique. “Could you open the window?” signifie généralement « pourriez-vous ouvrir la fenêtre ? », pas « êtes-vous capable de le faire ? ».",
      "I’m afraid… peut introduire une mauvaise nouvelle avec tact : “I’m afraid we can’t offer a refund.” Le locuteur ne décrit pas forcément une peur. La formule prépare un désaccord, une limite ou une réponse négative.",
      "Would you mind…? est une autre stratégie de politesse. Attention à la logique de la réponse : “Would you mind closing the door?” demande si cela vous dérangerait de fermer. Dans l’usage, “Not at all” accepte volontiers.",
      "Le registre dépend de la relation. Avec un ami, “Can you send it?” peut être parfaitement naturel. Avec un client ou dans une demande délicate, modal, conditionnel, formule d’introduction et remerciement peuvent rendre la phrase plus souple."
    ],
    "complete": [
      {
        "title": "1. Grammar versus pragmatics",
        "text": "Une phrase peut être grammaticalement correcte mais socialement trop directe. La pragmatique étudie ce que l’on fait avec les mots : demander, atténuer, refuser, suggérer ou laisser une porte ouverte."
      },
      {
        "title": "2. Could / would for requests",
        "text": "Les modaux déplacent la demande d’un ordre direct vers une formulation hypothétique. “Could you check this?” est une demande standard. Le contexte fait comprendre que la capacité n’est pas le vrai sujet."
      },
      {
        "title": "3. I’m afraid",
        "text": "Dans un service client, “I’m afraid that option isn’t available” atténue une information négative. Traduire mot à mot par « j’ai peur » serait souvent maladroit ; « malheureusement » ou une formule de regret peut mieux rendre la fonction."
      },
      {
        "title": "4. Would you mind",
        "text": "La structure prend généralement -ing : “Would you mind waiting a minute?” Pour accepter : “No, not at all” signifie que cela ne dérange pas. Répondre seulement “yes” peut être ambigu pour un francophone."
      },
      {
        "title": "5. Match the situation",
        "text": "Le but n’est pas de rendre chaque phrase ultra-polie. Un anglais naturel sait varier : direct entre proches, neutre au travail, plus atténué en cas de désaccord ou de demande coûteuse."
      }
    ],
    "deeper": [],
    "takeaways": [],
    "quiz": [
      {
        "kind": "pragmatics",
        "q": "“Could you send me the file?” est généralement…",
        "a": "Une demande polie.",
        "choices": [
          "Une question sur la capacité physique d’envoyer un fichier.",
          "Une phrase au passé.",
          "Une interdiction."
        ],
        "why": "Le contexte donne une fonction pragmatique.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "meaning",
        "q": "“I’m afraid we’re closed” signifie le plus naturellement…",
        "a": "« Désolé / malheureusement, nous sommes fermés. »",
        "choices": [
          "« J’ai peur du magasin fermé. »",
          "« Nous avons peur de fermer. »",
          "« Peut-être que nous fermerons. »"
        ],
        "why": "I’m afraid atténue une mauvaise nouvelle.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "grammar",
        "q": "Quelle forme est naturelle ?",
        "a": "Would you mind waiting a minute?",
        "choices": [
          "Would you mind to wait a minute?",
          "Would you mind wait a minute?",
          "Would you mind waited a minute?"
        ],
        "why": "Mind est suivi ici de -ing.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "nuance",
        "q": "Une demande directe est-elle toujours impolie ?",
        "a": "Non, le registre dépend de la relation et du contexte.",
        "choices": [
          "Oui, tout impératif est insultant.",
          "Non, car la politesse ne compte jamais en anglais.",
          "Oui, sauf à l’écrit."
        ],
        "why": "Le contexte social détermine le niveau d’atténuation.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 5."
      },
      {
        "kind": "synthèse",
        "q": "Que faut-il apprendre en plus de la grammaire ?",
        "a": "La fonction sociale d’une formulation.",
        "choices": [
          "Uniquement son nombre de syllabes.",
          "Une traduction fixe mot à mot.",
          "La nationalité du locuteur."
        ],
        "why": "Comprendre ce que la phrase accomplit rend l’anglais naturel.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 1."
      }
    ]
  },
  "eng-phrasal-context": {
    "hook": "Les phrasal verbs deviennent pénibles quand on apprend “get = obtenir” puis une liste de vingt particules. Ils deviennent plus simples quand on apprend une scène complète : “The meeting was called off because of the storm.”",
    "keyFacts": [
      "Apprendre des chunks plutôt que des particules isolées.",
      "Call off = annuler.",
      "Figure out = comprendre/trouver.",
      "Turn out = s’avérer / se révéler.",
      "Réutiliser dans une autre scène."
    ],
    "express": [
      "Call off signifie annuler dans “They called off the match.” La particule off suggère ici l’arrêt, mais il ne faut pas transformer cela en règle universelle. Le contexte — match, storm, tomorrow — fait une grande partie du travail.",
      "Turn out apparaît souvent quand un résultat ou une vérité se révèle : “It turned out to be a mistake.” On peut penser « il s’est avéré que ». Le sens n’est pas la somme mécanique de turn + out.",
      "Figure out signifie comprendre ou trouver une solution : “I can’t figure out how this works.” Le décor syntaxique — how this works — oriente immédiatement vers un processus de compréhension.",
      "La meilleure stratégie est de stocker des blocs : call off a meeting, figure out a problem, turn out to be true, run out of time. Une expression fréquente avec son contexte vaut mieux qu’une traduction isolée du verbe."
    ],
    "complete": [
      {
        "title": "1. Learn chunks",
        "text": "Un chunk est une combinaison fréquente mémorisée comme unité. “Run out of time” se récupère plus vite si l’on a déjà rencontré le bloc entier dans plusieurs situations que si l’on reconstruit run, out et of séparément."
      },
      {
        "title": "2. Call off",
        "text": "Call off = annuler : a meeting, a match, a search. L’objet qui suit aide énormément à identifier le sens. Si une tempête arrive et qu’un match est called off, la scène rend l’interprétation presque évidente."
      },
      {
        "title": "3. Figure out",
        "text": "Figure out introduit souvent une question, un problème ou une solution : “figure out why”, “figure out how”, “figure it out”. On peut le reformuler par understand, solve ou find an answer selon le cas."
      },
      {
        "title": "4. Turn out",
        "text": "“The story turned out to be false” décrit un résultat découvert après coup. “It turns out that…” est très courant pour révéler une information qui modifie ce qu’on pensait."
      },
      {
        "title": "5. Reuse actively",
        "text": "Après compréhension, reformule le chunk dans une nouvelle scène : meeting → trip, problem → password. Cette variation contrôlée apprend l’usage sans réciter une liste déconnectée."
      }
    ],
    "deeper": [],
    "takeaways": [],
    "quiz": [
      {
        "kind": "meaning",
        "q": "“They called off the match” signifie…",
        "a": "Ils ont annulé le match.",
        "choices": [
          "Ils ont commenté le match.",
          "Ils ont quitté le match à pied.",
          "Ils ont appelé les joueurs."
        ],
        "why": "Match + call off pointe vers annuler.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "meaning",
        "q": "“I can’t figure out the answer” signifie…",
        "a": "Je n’arrive pas à trouver/comprendre la réponse.",
        "choices": [
          "Je ne peux pas dessiner la réponse.",
          "Je refuse de répondre.",
          "Je connais déjà la réponse."
        ],
        "why": "Figure out = comprendre/trouver.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "meaning",
        "q": "“It turned out to be true” signifie…",
        "a": "Cela s’est avéré vrai.",
        "choices": [
          "Cela a été retourné pour être vrai.",
          "Cela deviendra peut-être vrai.",
          "Cela a été annulé."
        ],
        "why": "Turn out introduit un résultat révélé.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "strategy",
        "q": "Quelle unité est la plus utile à mémoriser ?",
        "a": "Une expression fréquente dans une scène, comme “run out of time”.",
        "choices": [
          "Le verbe nu avec toutes ses traductions possibles.",
          "La particule seule.",
          "Une liste alphabétique sans exemple."
        ],
        "why": "Les chunks accélèrent la récupération.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Sections 1 et 5."
      },
      {
        "kind": "synthèse",
        "q": "Que faire après avoir compris un phrasal verb ?",
        "a": "Le réutiliser dans une nouvelle situation proche.",
        "choices": [
          "Éviter de le revoir pour ne pas le confondre.",
          "Mémoriser uniquement son équivalent français.",
          "Changer chaque mot de la phrase au hasard."
        ],
        "why": "La variation active stabilise l’usage.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 5."
      }
    ]
  },
  "eng-paraphrase-repair": {
    "hook": "Parler une langue n’exige pas de connaître le mot parfait à chaque seconde. Un locuteur autonome sait contourner : décrire l’objet, donner sa fonction, comparer, donner un exemple ou demander le mot qui manque.",
    "keyFacts": [
      "Décrire la fonction d’un mot manquant.",
      "Simplifier sans perdre le message.",
      "Demander le terme en anglais.",
      "Reformuler au lieu de répéter.",
      "La fluidité inclut la réparation."
    ],
    "express": [
      "Si “screwdriver” ne vient pas, on peut dire “the tool you use to turn a screw”. La phrase est plus longue mais la communication continue. Ce réflexe est souvent plus utile qu’une pause de vingt secondes à chercher le terme exact.",
      "Pour une idée abstraite, on peut reformuler avec des mots plus simples : “He was reluctant” devient “He didn’t really want to do it.” La paraphrase montre une compétence réelle : garder le sens en changeant la forme.",
      "On peut aussi réparer explicitement : “I don’t know the word in English, but it’s something you use for…” ou “What do you call the thing that…?” Ces formules transforment le manque de vocabulaire en interaction.",
      "L’exercice utile consiste donc à interdire temporairement un mot connu et à l’expliquer autrement. On entraîne la flexibilité, pas seulement la mémoire. C’est cette capacité qui évite de repasser automatiquement en français."
    ],
    "complete": [
      {
        "title": "1. Function first",
        "text": "Pour un objet, commence par sa fonction : “something you use to…”. Puis ajoute forme, lieu ou comparaison. Même une description imparfaite donne à l’interlocuteur plusieurs indices."
      },
      {
        "title": "2. Use simpler English",
        "text": "Un mot précis peut souvent être remplacé par une phrase : exhausted → very tired; postpone → do it later; affordable → not too expensive. La paraphrase ne doit pas être élégante, elle doit préserver le message."
      },
      {
        "title": "3. Ask for the missing word",
        "text": "“What’s the word for…?” et “What do you call…?” sont des outils normaux de conversation. Demander un mot en anglais maintient l’échange dans la langue cible et crée un apprentissage immédiatement contextualisé."
      },
      {
        "title": "4. Clarify when misunderstood",
        "text": "Si l’autre ne comprend pas, ne répète pas exactement la même phrase plus fort. Change la structure, donne un exemple ou oppose deux idées : “Not X, I mean Y.” La réparation est une compétence à part entière."
      },
      {
        "title": "5. Fluency is resilience",
        "text": "La fluidité n’est pas l’absence d’erreur. C’est aussi la capacité à continuer malgré un trou de vocabulaire, une phrase mal partie ou une incompréhension. Cette résilience se travaille intentionnellement."
      }
    ],
    "deeper": [],
    "takeaways": [],
    "quiz": [
      {
        "kind": "strategy",
        "q": "Si le mot “screwdriver” te manque, quel réflexe est le meilleur ?",
        "a": "Décrire sa fonction avec des mots connus.",
        "choices": [
          "Arrêter la conversation.",
          "Dire le mot français et attendre.",
          "Inventer un mot anglais au hasard."
        ],
        "why": "La fonction donne des indices suffisants.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "paraphrase",
        "q": "Quelle paraphrase conserve le mieux “reluctant” ?",
        "a": "He didn’t really want to do it.",
        "choices": [
          "He did it very quickly.",
          "He was very excited to do it.",
          "He forgot how to do it."
        ],
        "why": "Reluctant exprime une réticence.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Introduction."
      },
      {
        "kind": "interaction",
        "q": "Quelle phrase permet de demander le mot manquant en anglais ?",
        "a": "What do you call the thing that…?",
        "choices": [
          "How is called in French…?",
          "Say me the word.",
          "Which name has this?"
        ],
        "why": "La structure est naturelle et interactive.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "repair",
        "q": "Que faire si l’interlocuteur ne comprend pas ?",
        "a": "Reformuler, donner un exemple ou préciser le contraste.",
        "choices": [
          "Répéter exactement la même phrase plus fort.",
          "Changer immédiatement de langue.",
          "Abandonner le sujet."
        ],
        "why": "La réparation fait partie de la fluidité.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "synthèse",
        "q": "La fluidité est aussi…",
        "a": "La capacité à continuer malgré un mot manquant ou une erreur.",
        "choices": [
          "Le fait de ne jamais hésiter.",
          "La connaissance de tous les mots rares.",
          "L’absence totale d’accent."
        ],
        "why": "La résilience communicative est une compétence centrale.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 5."
      }
    ]
  },
  "eng-connectors-logic": {
    "hook": "Les connecteurs sont les panneaux de signalisation d’un texte. Si tu comprends although, however, despite et therefore, tu peux suivre le raisonnement même quand plusieurs mots de vocabulaire te manquent.",
    "keyFacts": [
      "Although + proposition.",
      "However = opposition/restriction.",
      "Despite + nom ou -ing.",
      "Therefore = conséquence.",
      "Les connecteurs révèlent la logique."
    ],
    "express": [
      "Although introduit une proposition qui crée un contraste : “Although it was late, we kept working.” Le fait qu’il soit tard aurait pu conduire à arrêter, mais la suite va dans l’autre direction.",
      "However relie deux idées en marquant une opposition ou une restriction : “The plan is cheap. However, it may be risky.” Il fonctionne souvent comme un adverbe de liaison et se sépare par la ponctuation.",
      "Despite est suivi d’un nom, d’un groupe nominal ou de -ing : “Despite the rain” / “Despite being tired”. On ne dit pas normalement “despite it was raining”. Pour une proposition complète, on utilise although ou even though.",
      "Therefore signale une conséquence logique : “The data were incomplete; therefore, we postponed the decision.” Lire activement consiste à prédire la relation avant même de traduire chaque terme."
    ],
    "complete": [
      {
        "title": "1. Contrast versus consequence",
        "text": "Commence par classer le lien : addition, contraste, cause ou conséquence. Cette étiquette grossière donne l’architecture du paragraphe. Un mot inconnu devient moins dangereux si l’on sait déjà comment les phrases s’opposent."
      },
      {
        "title": "2. Although",
        "text": "Although + proposition : “Although I disagree, I understand the argument.” La proposition concessive reconnaît un fait sans lui laisser déterminer la conclusion attendue."
      },
      {
        "title": "3. However",
        "text": "However peut ouvrir une nouvelle phrase ou être inséré avec ponctuation. Il ne se construit pas exactement comme but. “I wanted to go. However, I was too tired.”"
      },
      {
        "title": "4. Despite",
        "text": "Despite + nom / -ing : “Despite the delay”, “Despite arriving late”. “Despite of” est une erreur fréquente ; en revanche “in spite of” prend of."
      },
      {
        "title": "5. Therefore",
        "text": "Therefore explicite une conséquence tirée de ce qui précède. Dans un texte argumentatif, repérer therefore aide à identifier la conclusion locale et les prémisses qui la soutiennent. À l’oral comme à l’écrit, cette lecture des connecteurs permet aussi d’anticiper la direction de la phrase suivante avant d’en connaître tous les mots."
      }
    ],
    "deeper": [],
    "takeaways": [],
    "quiz": [
      {
        "kind": "grammar",
        "q": "Quelle phrase est correcte ?",
        "a": "Although it was raining, we went out.",
        "choices": [
          "Despite it was raining, we went out.",
          "Despite of the rain, we went out.",
          "However it was raining, we went out."
        ],
        "why": "Although introduit une proposition complète.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "grammar",
        "q": "Quelle construction convient avec despite ?",
        "a": "Despite the rain, we went out.",
        "choices": [
          "Despite it rained, we went out.",
          "Despite of it rained, we went out.",
          "Despite that was raining, we went out."
        ],
        "why": "Despite prend un nom ou -ing.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "logic",
        "q": "“Therefore” annonce surtout…",
        "a": "Une conséquence ou conclusion.",
        "choices": [
          "Un exemple sans lien.",
          "Un contraste.",
          "Une concession."
        ],
        "why": "Therefore = conséquence logique.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 5."
      },
      {
        "kind": "logic",
        "q": "“However” signale le plus souvent…",
        "a": "Une opposition ou restriction.",
        "choices": [
          "Une cause certaine.",
          "Une chronologie.",
          "Une définition."
        ],
        "why": "However réoriente le raisonnement.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "synthèse",
        "q": "Pourquoi repérer les connecteurs avant tous les mots rares ?",
        "a": "Parce qu’ils révèlent l’architecture logique du texte.",
        "choices": [
          "Parce qu’ils donnent toujours le sujet du texte.",
          "Parce qu’ils remplacent tous les verbes.",
          "Parce qu’ils permettent d’ignorer la grammaire."
        ],
        "why": "Ils servent de panneaux de signalisation.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 1."
      }
    ]
  },
  "eng-implicit-meaning": {
    "hook": "Un bon niveau d’anglais commence quand on comprend ce qui n’est pas dit directement. “That’s interesting” peut être un vrai compliment, une réponse neutre ou une manière polie de ne pas approuver : le contexte décide.",
    "keyFacts": [
      "Sens littéral et intention peuvent différer.",
      "Le désaccord peut être atténué.",
      "Understatement = minimisation volontaire.",
      "Une réponse vague n’est pas toujours un engagement.",
      "Chercher des indices avant de conclure."
    ],
    "express": [
      "L’understatement minimise volontairement : “It’s a bit chilly” peut être dit alors qu’il fait franchement froid. A bit, not ideal, not great ou quite peuvent porter des nuances très différentes selon la variété d’anglais et l’intonation.",
      "Le désaccord est souvent atténué : “I’m not sure that would work” peut vouloir dire « je pense que ça ne marchera probablement pas ». Le locuteur choisit une formulation moins frontale que “That won’t work”.",
      "Les réponses comme “I’ll think about it” ou “Maybe” ne sont pas toujours des promesses. Selon la situation, elles peuvent garder une porte ouverte sans engagement. Comprendre l’intention exige de regarder la relation, le coût de la demande et ce qui suit.",
      "Il faut éviter l’autre extrême : imaginer un sous-entendu partout. On formule une hypothèse pragmatique, puis on cherche des indices : contraste, ton, contexte, actions suivantes. La compétence est probabiliste, pas magique."
    ],
    "complete": [
      {
        "title": "1. Literal versus intended meaning",
        "text": "Le sens littéral est ce que les mots codent directement. Le sens pragmatique ajoute ce que le locuteur accomplit dans la situation. “Can you pass the salt?” est littéralement une question de capacité, mais fonctionne normalement comme une demande."
      },
      {
        "title": "2. Soft disagreement",
        "text": "“I’m not convinced” ou “I’m not sure about that” permettent de contester sans transformer la phrase en confrontation. Dans un contexte professionnel, ces formulations peuvent exprimer un désaccord assez ferme malgré leur surface prudente."
      },
      {
        "title": "3. Understatement",
        "text": "Minimiser peut servir l’humour, la politesse ou une norme culturelle. “The project had a few issues” peut cacher de très gros problèmes. On regarde ce qui est ensuite décrit pour calibrer la force réelle."
      },
      {
        "title": "4. Non-commitment",
        "text": "“We’ll see” et “I’ll think about it” peuvent être sincères, mais ne valent pas automatiquement oui. Une réponse sans date, sans action et sans confirmation concrète reste souvent un engagement faible."
      },
      {
        "title": "5. Evidence, not paranoia",
        "text": "Une interprétation implicite doit être soutenue par des indices. Si plusieurs lectures restent possibles, demander une clarification est souvent plus intelligent que de prétendre connaître l’intention exacte."
      }
    ],
    "deeper": [],
    "takeaways": [],
    "quiz": [
      {
        "kind": "pragmatics",
        "q": "“I’m not sure that would work” peut, selon le contexte, exprimer…",
        "a": "Un désaccord atténué.",
        "choices": [
          "Une certitude totale que cela fonctionnera.",
          "Une question sur l’heure.",
          "Une promesse de réaliser le projet."
        ],
        "why": "La prudence de forme peut contenir un désaccord réel.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "pragmatics",
        "q": "“Can you pass the salt?” est normalement…",
        "a": "Une demande.",
        "choices": [
          "Un test de force physique.",
          "Une question sur le prix du sel.",
          "Une invitation à cuisiner."
        ],
        "why": "Le sens pragmatique dépasse le sens littéral.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "nuance",
        "q": "“I’ll think about it” signifie-t-il toujours oui ?",
        "a": "Non, cela peut rester un engagement faible.",
        "choices": [
          "Oui, c’est une promesse ferme.",
          "Oui, sauf à l’écrit.",
          "Non, cela signifie toujours non."
        ],
        "why": "Le contexte et les actions suivantes comptent.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "nuance",
        "q": "Qu’est-ce que l’understatement ?",
        "a": "Une manière de minimiser volontairement la force d’une situation.",
        "choices": [
          "Une faute de grammaire.",
          "Une traduction mot à mot.",
          "Une exagération systématique."
        ],
        "why": "La formulation peut être plus faible que la réalité décrite.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "synthèse",
        "q": "Comment éviter de surinterpréter ?",
        "a": "Chercher des indices et demander une clarification si nécessaire.",
        "choices": [
          "Supposer toujours le pire sous-entendu.",
          "Ignorer tout contexte.",
          "Traduire chaque mot isolément."
        ],
        "why": "L’inférence pragmatique reste une hypothèse fondée.",
        "trap": "Choisir une réponse plausible qui ne correspond pas au raisonnement du cours.",
        "evidence": "Section 5."
      }
    ]
  }
};
  const RC18_PRACTICE = {
  "eng-context-inference": "Mini-défi : lis “The restaurant was packed, so we had to wait outside.” Suppose que packed est inconnu. Interdis-toi le dictionnaire pendant trente secondes. Restaurant donne le lieu ; so annonce une conséquence ; had to wait outside indique qu’on ne pouvait pas entrer immédiatement. L’hypothèse utile devient « très rempli / bondé ». Maintenant seulement, vérifie. Recommence avec “The battery was dead, so the car wouldn’t start.” Ici, dead ne décrit évidemment pas un organisme vivant : la scène impose « déchargée ». Ce type d’exercice entraîne une compétence que les séries de traduction développent peu : supporter une zone d’incertitude, accumuler des indices et maintenir la compréhension globale avant d’exiger une équivalence française parfaite.",
  "eng-false-friends-core": "Travaille par contraste actif. Lis “I’m currently working in Paris, but I actually live in Lyon.” Sans traduire mot à mot, sépare les fonctions : currently situe temporairement la situation professionnelle ; actually corrige une idée possible sur le domicile. Puis crée deux nouvelles phrases où les mots ne pourraient pas être échangés. Fais la même chose avec “I eventually attended the conference”: eventually raconte l’issue après une attente ou un processus ; attended signifie que la personne y a assisté. Le cerveau retient mieux lorsque deux faux amis apparaissent dans une scène cohérente et qu’il doit choisir leur rôle. L’objectif n’est pas de réciter une liste, mais de rendre la mauvaise traduction suffisamment étrange pour qu’elle déclenche immédiatement une alerte.",
  "eng-still-yet-already-even": "Compare quatre phrases autour de la même tâche : “I’m still working on it.” “I haven’t finished yet.” “I’ve already finished.” “Even Sam has finished.” Les faits changent peu, mais le point de vue change beaucoup. Still insiste sur la continuation ; yet garde l’attente ouverte ; already place l’achèvement avant le repère attendu ; even présente Sam comme un cas surprenant sur une échelle implicite. Maintenant imagine une situation réelle — préparer une valise, finir un rapport, attendre un train — et produis les quatre variantes. C’est plus efficace que de mémoriser quatre traductions séparées, parce que tu sens directement ce que chaque petit mot ajoute à la même scène de base. À la fin, explique en français la nuance de chaque phrase sans traduire mot à mot : si les quatre explications diffèrent, tu as réellement compris les mots.",
  "eng-polite-register": "Transforme une même intention selon trois relations. Avec un ami : “Send me the photo when you can.” Avec un collègue : “Could you send me the photo when you have a minute?” Avec un client dans une demande délicate : “Would you mind sending me the photo when you have a moment?” Aucune version n’est universellement « correcte » ; elles placent simplement la demande à des niveaux différents de directivité. Fais ensuite l’inverse : repère les mots qui atténuent et retire-les un à un pour sentir le changement de ton. Enfin, reformule “I’m afraid we can’t do that” sans traduire afraid par peur : “Unfortunately, that isn’t possible.” Cet entraînement développe le registre, compétence souvent absente des exercices de phrase isolée.",
  "eng-phrasal-context": "Construis une micro-histoire avec quatre chunks : “We ran out of time, so we called off the meeting. Later, I figured out the problem, and it turned out to be simple.” Même si chaque phrasal verb est nouveau, les relations entre les événements réduisent les interprétations possibles : plus de temps, annulation, compréhension, révélation finale. Puis change les objets sans changer les verbes : run out of battery, call off a trip, figure out a password problem, turn out to be false. Cette variation contrôlée apprend les cadres d’usage. Elle est plus robuste qu’une liste “run = courir, out = dehors”, car le sens d’un phrasal verb appartient souvent au bloc complet et à la situation où il apparaît.",
  "eng-paraphrase-repair": "Fais un exercice de « mot interdit ». Choisis un objet courant et interdits-toi son nom anglais. Pour umbrella : “something you hold over your head when it rains”. Pour kettle : “the thing you use to boil water for tea”. Pour une idée abstraite comme disappointed : “sad because something was not as good as you expected”. Ensuite demande le mot : “What do you call that?” Le but est de rester en anglais pendant toute la réparation. Une conversation réelle récompense souvent davantage cette flexibilité qu’un vocabulaire théorique immense. Plus tu pratiques la paraphrase, moins un trou de mémoire déclenche automatiquement un retour au français, et plus le nouveau mot appris s’ancre dans une situation déjà comprise.",
  "eng-connectors-logic": "Prends ce mini-paragraphe : “Although the hotel was cheap, it was far from the centre. However, the buses were frequent. We therefore decided to stay there despite the distance.” Avant de traduire, dessine la logique : concession → correction positive → conséquence → obstacle maintenu. Ensuite masque quelques mots de vocabulaire ; l’architecture reste compréhensible grâce aux connecteurs. Refais le paragraphe en remplaçant although par because : le raisonnement change immédiatement. Puis transforme despite the distance en although it was far away pour sentir la différence de construction grammaticale. L’objectif est de lire les connecteurs comme des opérateurs logiques, pas comme de simples mots de liaison décoratifs. Fais ensuite la même lecture sur un paragraphe d’article réel : encadre les connecteurs avant de chercher le vocabulaire inconnu.",
  "eng-implicit-meaning": "Imagine un collègue qui dit “That’s an ambitious deadline” après qu’on lui annonce un délai extrêmement court. Littéralement, il qualifie seulement le délai d’ambitieux ; pragmatiquement, il peut signaler qu’il le juge difficile ou irréaliste. Cherche les indices avant de conclure : ton, contexte, phrases suivantes, proposition d’un nouveau calendrier. Fais la même chose avec “I’ll think about it.” Si aucune date ni action ne suit, l’engagement reste faible ; si la personne fixe un rendez-vous pour en reparler, la phrase est plus ouverte. L’exercice consiste à produire deux contextes différents pour la même phrase. On apprend ainsi que l’implicite n’est pas contenu dans les mots seuls, mais dans leur interaction avec la situation. Quand le contexte reste ambigu, entraîne aussi la phrase de clarification : “Do you mean that…?” plutôt que d’inventer une certitude."
};
  Object.entries(RC18_PRACTICE).forEach(([id, text]) => { if (PACKS[id]) PACKS[id].complete.push({ title: "6. Mise en pratique", text }); });

  const MYSTERIES = [
  {
    "id": "english-mystery-actually-318",
    "discipline": "english",
    "difficulty": "facile",
    "title": "Le mot familier qui ne veut pas dire ce qu’on croit",
    "caseTitle": "Correction discrète",
    "subjectType": "sens en contexte",
    "periodHint": "anglais quotidien",
    "lessonId": "eng-false-friends-core",
    "missionQuestion": "Que veut dire le mot-clé dans cette phrase ?",
    "answerInstruction": "Choisis le sens naturel en français.",
    "prompt": "“I thought she was American, but she’s actually Canadian.” Le mot placé après but corrige l’hypothèse de départ.",
    "answer": "En fait",
    "aliases": [
      "en fait",
      "actually = en fait",
      "actually veut dire en fait"
    ],
    "clues": [
      "Il ne donne pas une date.",
      "Il corrige une supposition.",
      "Pour « actuellement », currently serait plus direct."
    ],
    "explanation": "Actually signifie ici « en fait ».",
    "blockedGuesses": [
      "actuellement",
      "éventuellement",
      "habituellement"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "english-mystery-eventually-318",
    "discipline": "english",
    "difficulty": "facile",
    "title": "Trois essais plus tard…",
    "caseTitle": "Une issue après attente",
    "subjectType": "sens en contexte",
    "periodHint": "anglais quotidien",
    "lessonId": "eng-false-friends-core",
    "missionQuestion": "Quel sens porte le mot-clé ?",
    "answerInstruction": "Choisis la meilleure traduction.",
    "prompt": "“After three attempts, she eventually passed the exam.” Le résultat arrive après plusieurs essais.",
    "answer": "Finalement",
    "aliases": [
      "finalement",
      "elle a fini par",
      "finir par"
    ],
    "clues": [
      "Le mot décrit l’issue d’un processus.",
      "Il ne signifie pas « peut-être ».",
      "On peut souvent le reformuler par “in the end”."
    ],
    "explanation": "Eventually signifie « finalement » ou « finir par ».",
    "blockedGuesses": [
      "éventuellement",
      "actuellement",
      "immédiatement"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "english-mystery-afraid-318",
    "discipline": "english",
    "difficulty": "moyen",
    "title": "Une peur qui n’en est pas vraiment une",
    "caseTitle": "Mauvaise nouvelle polie",
    "subjectType": "intention de phrase",
    "periodHint": "conversation",
    "lessonId": "eng-polite-register",
    "missionQuestion": "Quelle fonction a “I’m afraid” ici ?",
    "answerInstruction": "Choisis l’intention, pas la traduction mot à mot.",
    "prompt": "A hotel receptionist says: “I’m afraid we don’t have any rooms left.” Nothing in the situation suggests fear.",
    "answer": "Atténuer une mauvaise nouvelle",
    "aliases": [
      "atténuer une mauvaise nouvelle",
      "attenuer une mauvaise nouvelle",
      "politesse",
      "dire malheureusement"
    ],
    "clues": [
      "La réceptionniste annonce une indisponibilité.",
      "La formule prépare un message négatif.",
      "En français, « malheureusement » peut mieux rendre sa fonction."
    ],
    "explanation": "I’m afraid sert ici à adoucir une mauvaise nouvelle.",
    "blockedGuesses": [
      "exprimer la peur",
      "demander une chambre",
      "annoncer un danger"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "english-mystery-yet-318",
    "discipline": "english",
    "difficulty": "moyen",
    "title": "Pas maintenant, mais la porte reste ouverte",
    "caseTitle": "Une attente non satisfaite",
    "subjectType": "nuance grammaticale",
    "periodHint": "anglais quotidien",
    "lessonId": "eng-still-yet-already-even",
    "missionQuestion": "Quelle nuance ajoute “yet” ?",
    "answerInstruction": "Choisis l’interprétation.",
    "prompt": "“I haven’t finished yet.” The task is not complete up to now, but the sentence does not say it will never be completed.",
    "answer": "Pas encore",
    "aliases": [
      "pas encore",
      "not yet",
      "l'action est encore attendue"
    ],
    "clues": [
      "La phrase est négative.",
      "L’action reste attendue.",
      "Le français utilise une expression en deux mots."
    ],
    "explanation": "Yet correspond ici à « pas encore ».",
    "blockedGuesses": [
      "déjà",
      "toujours",
      "jamais"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "english-mystery-turnout-318",
    "discipline": "english",
    "difficulty": "moyen",
    "title": "La vérité apparaît après coup",
    "caseTitle": "Résultat révélé",
    "subjectType": "phrasal verb",
    "periodHint": "anglais naturel",
    "lessonId": "eng-phrasal-context",
    "missionQuestion": "Que signifie “turned out” dans cette scène ?",
    "answerInstruction": "Choisis la reformulation française.",
    "prompt": "“We thought the email was genuine, but it turned out to be a scam.” The second part reveals what was discovered later.",
    "answer": "S’est avéré",
    "aliases": [
      "s'est avéré",
      "s est avere",
      "s’est révélé",
      "s'est revele"
    ],
    "clues": [
      "La vérité n’était pas connue au début.",
      "But introduit la correction.",
      "Le groupe peut se reformuler par “proved to be / was discovered to be”."
    ],
    "explanation": "Turn out to be signifie ici « s’avérer / se révéler être ».",
    "blockedGuesses": [
      "a été annulé",
      "a été retourné",
      "a commencé"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "english-mystery-soft-disagree-318",
    "discipline": "english",
    "difficulty": "difficile",
    "title": "Une phrase douce, un désaccord réel",
    "caseTitle": "Lire entre les lignes",
    "subjectType": "implicite pragmatique",
    "periodHint": "conversation professionnelle",
    "lessonId": "eng-implicit-meaning",
    "missionQuestion": "Quelle intention est la plus probable ?",
    "answerInstruction": "Choisis ce que le locuteur fait réellement avec la phrase.",
    "prompt": "During a meeting, someone answers a proposal with: “I’m not sure that would work.” They then list three serious problems with the plan.",
    "answer": "Exprimer un désaccord atténué",
    "aliases": [
      "désaccord atténué",
      "desaccord attenue",
      "exprimer un désaccord",
      "soft disagreement"
    ],
    "clues": [
      "La phrase est prudente dans sa forme.",
      "Les trois problèmes qui suivent renforcent l’opposition.",
      "Le locuteur n’exprime pas seulement une absence d’information."
    ],
    "explanation": "La formulation atténue un désaccord qui peut être assez ferme dans le contexte.",
    "blockedGuesses": [
      "demander plus de temps",
      "approuver le plan",
      "exprimer une incapacité"
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
  "label": "Mode Anglais",
  "shortLabel": "Anglais",
  "noun": "d’anglais",
  "headline": "Comprends l’anglais réel au lieu d’aligner des traductions mot à mot.",
  "promise": "Contexte, nuance, registre, reformulation et implicite : on entraîne la compréhension et l’autonomie, pas une série de mots isolés.",
  "discoveryTitle": "Situations d’anglais à décoder",
  "discoveryIntro": "Des phrases naturelles à comprendre, reformuler et réutiliser dans d’autres contextes."
};
  if (typeof BETA107_DISCIPLINE_THEME !== "undefined") BETA107_DISCIPLINE_THEME[DISCIPLINE.id] = {"accent": "#38bdf8", "bg1": "#0b3b58", "bg2": "#071a2a", "bg3": "#04101a", "glow1": "rgba(56,189,248,.26)", "glow2": "rgba(34,197,94,.12)"};
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
