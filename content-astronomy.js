/* HistoDaily beta 186 — Astronomie devient une discipline autonome. */
(function histodailyBeta186Astronomy(){
  const VERSION = "1.0.0-beta.186";
  const DISCIPLINE = {
  "id": "astronomy",
  "title": "Astronomie",
  "emoji": "🌌",
  "accent": "#7c8cff",
  "description": "Univers, étoiles, planètes, observation et exploration spatiale."
};
  const GROUPS = [
  {
    "id": "astro-foundations",
    "title": "1. Comprendre l’Univers",
    "range": "échelles → cosmologie",
    "description": "Distances, lumière, Big Bang, expansion et grandes structures de l’Univers."
  },
  {
    "id": "astro-stars",
    "title": "2. Les étoiles et le Soleil",
    "range": "naissance → fin des étoiles",
    "description": "Fusion, vie des étoiles, supernovæ, astres compacts et activité solaire."
  },
  {
    "id": "astro-solar-system",
    "title": "3. Le Système solaire",
    "range": "formation → petits corps",
    "description": "Planètes rocheuses, géantes, lunes, astéroïdes, comètes et impacts."
  },
  {
    "id": "astro-other-worlds",
    "title": "4. Observer d’autres mondes",
    "range": "télescopes → exoplanètes",
    "description": "Lumière, spectres, instruments, exoplanètes et recherche de conditions favorables à la vie."
  },
  {
    "id": "astro-exploration",
    "title": "5. Explorer l’espace",
    "range": "orbites → missions",
    "description": "Fusées, trajectoires, exploration de la Lune, de Mars et du Système solaire."
  }
];
  const WORLDS = [
  {
    "id": "astro-scales",
    "title": "Échelles cosmiques",
    "emoji": "📏",
    "subtitle": "Mesurer l’immense",
    "timeframe": "bases",
    "accent": "#60a5fa",
    "group": "astro-foundations",
    "sortStart": 1,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-cosmology",
    "title": "Naissance et évolution de l’Univers",
    "emoji": "🌠",
    "subtitle": "Big Bang, expansion, matière noire",
    "timeframe": "13,8 milliards d’années",
    "accent": "#8b5cf6",
    "group": "astro-foundations",
    "sortStart": 2,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-stellar-life",
    "title": "Vie et mort des étoiles",
    "emoji": "⭐",
    "subtitle": "Fusion, géantes, supernovæ",
    "timeframe": "millions à milliards d’années",
    "accent": "#f59e0b",
    "group": "astro-stars",
    "sortStart": 10,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-sun",
    "title": "Notre étoile : le Soleil",
    "emoji": "☀️",
    "subtitle": "Structure, activité, vents",
    "timeframe": "étoile actuelle",
    "accent": "#f97316",
    "group": "astro-stars",
    "sortStart": 11,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-formation-rocky",
    "title": "Formation et planètes rocheuses",
    "emoji": "🪨",
    "subtitle": "Du disque de poussière aux mondes solides",
    "timeframe": "4,6 milliards d’années",
    "accent": "#fb7185",
    "group": "astro-solar-system",
    "sortStart": 20,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-giants-moons",
    "title": "Planètes géantes et lunes",
    "emoji": "🪐",
    "subtitle": "Atmosphères, anneaux, océans cachés",
    "timeframe": "Système solaire externe",
    "accent": "#38bdf8",
    "group": "astro-solar-system",
    "sortStart": 21,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-small-bodies",
    "title": "Astéroïdes, comètes et impacts",
    "emoji": "☄️",
    "subtitle": "Archives et voyageurs du Système solaire",
    "timeframe": "origines → aujourd’hui",
    "accent": "#a3e635",
    "group": "astro-solar-system",
    "sortStart": 22,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-exoplanets-life",
    "title": "Exoplanètes et vie possible",
    "emoji": "🌍",
    "subtitle": "Détecter l’invisible, chercher des indices",
    "timeframe": "1990 → aujourd’hui",
    "accent": "#22c55e",
    "group": "astro-other-worlds",
    "sortStart": 30,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-observation",
    "title": "Observer et décoder la lumière",
    "emoji": "🔭",
    "subtitle": "Télescopes, spectres, observatoires spatiaux",
    "timeframe": "Galilée → aujourd’hui",
    "accent": "#06b6d4",
    "group": "astro-other-worlds",
    "sortStart": 31,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-spaceflight",
    "title": "Vol spatial et exploration",
    "emoji": "🚀",
    "subtitle": "Orbites, sondes, Lune et Mars",
    "timeframe": "XXe → XXIe siècle",
    "accent": "#ef4444",
    "group": "astro-exploration",
    "sortStart": 40,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  }
];
  const LESSONS = {
  "astro-scales": [
    {
      "id": "astro-observable-universe",
      "title": "L’Univers observable : jusqu’où pouvons-nous voir ?",
      "period": "Des premiers instants à aujourd’hui",
      "location": "Univers observable",
      "emoji": "🔭",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-light-years-distances",
      "title": "Année-lumière, parsec et unité astronomique",
      "period": "Mesures astronomiques",
      "location": "Du Système solaire aux galaxies",
      "emoji": "💡",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-cosmology": [
    {
      "id": "astro-big-bang",
      "title": "Le Big Bang : une expansion, pas une explosion dans le vide",
      "period": "Il y a environ 13,8 milliards d’années",
      "location": "Univers primordial",
      "emoji": "🌠",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-expansion-dark-universe",
      "title": "Expansion, matière noire et énergie noire",
      "period": "Univers contemporain",
      "location": "Grandes structures cosmiques",
      "emoji": "🕸️",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-stellar-life": [
    {
      "id": "astro-star-birth-fusion",
      "title": "Comment naît une étoile et pourquoi brille-t-elle ?",
      "period": "Cycle stellaire",
      "location": "Nuages moléculaires et étoiles",
      "emoji": "⭐",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-stellar-deaths",
      "title": "Géantes rouges, supernovæ, étoiles à neutrons et trous noirs",
      "period": "Fin de vie stellaire",
      "location": "Étoiles évoluées et restes compacts",
      "emoji": "💥",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-sun": [
    {
      "id": "astro-sun-structure",
      "title": "Le Soleil de l’intérieur à la couronne",
      "period": "Étoile de 4,6 milliards d’années",
      "location": "Centre du Système solaire",
      "emoji": "☀️",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-solar-activity-auroras",
      "title": "Taches, éruptions, vent solaire et aurores",
      "period": "Cycle solaire et météo de l’espace",
      "location": "Soleil, magnétosphères et hautes atmosphères",
      "emoji": "🌌",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-formation-rocky": [
    {
      "id": "astro-solar-system-formation",
      "title": "Comment s’est formé le Système solaire ?",
      "period": "Il y a environ 4,6 milliards d’années",
      "location": "Nébuleuse solaire",
      "emoji": "🌀",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-rocky-planets",
      "title": "Mercure, Vénus, Terre et Mars : quatre mondes rocheux",
      "period": "Système solaire interne",
      "location": "Mercure, Vénus, Terre et Mars",
      "emoji": "🪨",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-giants-moons": [
    {
      "id": "astro-giant-planets",
      "title": "Jupiter, Saturne, Uranus et Neptune",
      "period": "Système solaire externe",
      "location": "Planètes géantes",
      "emoji": "🪐",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-ocean-moons",
      "title": "Lunes océans : Europe, Encelade et autres mondes cachés",
      "period": "Système solaire externe",
      "location": "Lunes glacées",
      "emoji": "🌊",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-small-bodies": [
    {
      "id": "astro-asteroids-comets",
      "title": "Astéroïdes et comètes : les archives du Système solaire",
      "period": "Origines du Système solaire",
      "location": "Ceintures, noyaux glacés et petits corps",
      "emoji": "☄️",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-meteors-impacts",
      "title": "Météore, météorite et risque d’impact",
      "period": "Phénomènes actuels et histoire planétaire",
      "location": "Atmosphères et surfaces planétaires",
      "emoji": "🌠",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-exoplanets-life": [
    {
      "id": "astro-exoplanet-detection",
      "title": "Comment détecter une planète invisible autour d’une autre étoile ?",
      "period": "Astronomie contemporaine",
      "location": "Systèmes extrasolaires",
      "emoji": "🪐",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-habitable-zone-biosignatures",
      "title": "Zone habitable, biosignatures et paradoxe de Fermi",
      "period": "Recherche contemporaine",
      "location": "Exoplanètes et astrobiologie",
      "emoji": "🧬",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-observation": [
    {
      "id": "astro-telescopes-spectrum",
      "title": "Télescopes et spectres : lire la lumière des astres",
      "period": "De l’optique moderne à aujourd’hui",
      "location": "Observatoires au sol",
      "emoji": "🌈",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-space-telescopes",
      "title": "Pourquoi envoyer des télescopes dans l’espace ?",
      "period": "XXe → XXIe siècle",
      "location": "Orbites terrestres et points de Lagrange",
      "emoji": "🛰️",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-spaceflight": [
    {
      "id": "astro-rockets-orbits",
      "title": "Fusées, vitesse orbitale et gravité",
      "period": "Principes du vol spatial",
      "location": "Terre et espace proche",
      "emoji": "🚀",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-moon-mars-exploration",
      "title": "Explorer la Lune et Mars : robots, humains et objectifs scientifiques",
      "period": "1959 → aujourd’hui",
      "location": "Lune et Mars",
      "emoji": "🌕",
      "xp": 70,
      "order": 2
    }
  ]
};
  const PACKS = {
  "astro-observable-universe": {
    "hook": "Regarder loin dans l’espace revient à regarder dans le passé : la lumière transporte une information qui a parfois voyagé pendant des milliards d’années.",
    "keyFacts": [
      "La région dont des signaux ont eu le temps de nous parvenir.",
      "Parce que sa lumière met du temps à nous atteindre.",
      "Non, c’est une limite d’information liée au trajet possible des signaux.",
      "Le fond diffus cosmologique.",
      "Parce que l’espace s’est dilaté pendant le trajet de la lumière."
    ],
    "express": [
      "L’Univers désigne tout l’espace-temps et son contenu. L’Univers observable est seulement la région dont la lumière a eu le temps de nous atteindre depuis les premiers temps cosmiques. Cette limite n’est pas un mur matériel : elle dépend de notre position, de l’âge de l’Univers et de son expansion.",
      "Une galaxie très lointaine apparaît telle qu’elle était lorsque sa lumière est partie. Les télescopes fonctionnent donc comme des machines à remonter le temps. Ils ne montrent jamais l’état présent d’un objet éloigné, mais une image ancienne, parfois antérieure à la formation du Soleil.",
      "L’Univers peut être bien plus vaste que la partie observable, voire infini ; les observations actuelles ne permettent pas de voir au-delà de l’horizon cosmologique. Il faut donc distinguer ce que les modèles décrivent, ce que les instruments mesurent et ce qui demeure inaccessible directement."
    ],
    "complete": [
      {
        "title": "1. Observable ne signifie pas total",
        "text": "Notre horizon cosmologique est défini par les signaux capables de nous parvenir. Chaque observateur possède son propre Univers observable, centré sur sa position. Rien ne garantit que la totalité de l’Univers s’arrête à cette frontière. La confusion vient souvent des images montrant une sphère comme si elle flottait dans un espace extérieur connu."
      },
      {
        "title": "2. Voir loin, c’est voir ancien",
        "text": "La lumière ne se propage pas instantanément. Le Soleil est vu avec environ huit minutes de retard ; les étoiles proches avec plusieurs années ; les galaxies lointaines avec des millions ou milliards d’années. Cette durée transforme chaque observation astronomique en archive de l’évolution cosmique."
      },
      {
        "title": "3. L’expansion complique les distances",
        "text": "Pendant que la lumière voyage, l’espace entre les grandes structures peut s’étirer. La distance actuelle d’une galaxie très ancienne n’est donc pas simplement égale au temps de trajet de sa lumière multiplié par sa vitesse. Les cosmologistes utilisent plusieurs définitions de distance selon la question posée."
      },
      {
        "title": "4. Une frontière d’information",
        "text": "Avant une certaine époque, l’Univers était trop chaud et opaque pour laisser circuler librement la lumière. Le fond diffus cosmologique constitue la plus ancienne lumière directement observable. D’autres messagers, comme les neutrinos ou les ondes gravitationnelles, pourraient donner accès à des phases encore plus anciennes."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "L’Univers désigne tout l’espace-temps et son contenu."
      },
      {
        "label": "Mécanisme",
        "text": "Une galaxie très lointaine apparaît telle qu’elle était lorsque sa lumière est partie."
      },
      {
        "label": "Nuance",
        "text": "L’Univers peut être bien plus vaste que la partie observable, voire infini ; les observations actuelles ne permettent pas de voir au-delà de l’horizon cosmologique."
      },
      {
        "label": "À retenir",
        "text": "Regarder loin dans l’espace revient à regarder dans le passé : la lumière transporte une information qui a parfois voyagé pendant des milliards d’années."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Que désigne l’Univers observable ?",
        "a": "La région dont des signaux ont eu le temps de nous parvenir.",
        "choices": [
          "Une sphère matérielle qui enferme toutes les galaxies.",
          "Uniquement la Voie lactée.",
          "La partie de l’espace visible à l’œil nu."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi une galaxie lointaine est-elle vue dans le passé ?",
        "a": "Parce que sa lumière met du temps à nous atteindre.",
        "choices": [
          "Parce que les galaxies reculeraient dans le temps.",
          "Parce que les télescopes enregistrent avec retard.",
          "Parce que la lumière ralentit près de la Terre."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "L’horizon cosmologique est-il un mur ?",
        "a": "Non, c’est une limite d’information liée au trajet possible des signaux.",
        "choices": [
          "Oui, il réfléchit la lumière.",
          "Oui, il marque le bord certain de l’Univers.",
          "Non, mais il correspond à la limite de la Voie lactée."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Quel rayonnement est la plus ancienne lumière directement observée ?",
        "a": "Le fond diffus cosmologique.",
        "choices": [
          "La lumière du Soleil.",
          "Les aurores polaires.",
          "Le rayonnement d’une supernova récente."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi plusieurs définitions de distance sont-elles utilisées ?",
        "a": "Parce que l’espace s’est dilaté pendant le trajet de la lumière.",
        "choices": [
          "Parce que la vitesse de la lumière change chaque année.",
          "Parce que les galaxies n’ont pas de position.",
          "Parce que les unités astronomiques sont imprécises."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-light-years-distances": {
    "hook": "Les astronomes changent d’unité comme on change d’échelle sur une carte : kilomètres près de la Terre, unités astronomiques autour du Soleil, années-lumière et parsecs pour les étoiles.",
    "keyFacts": [
      "Une distance parcourue par la lumière en une année.",
      "À la distance moyenne entre la Terre et le Soleil.",
      "Il est défini à partir de l’angle apparent d’un objet observé depuis l’orbite terrestre.",
      "La parallaxe stellaire.",
      "Parce qu’aucune méthode unique ne fonctionne de façon précise à toutes les distances."
    ],
    "express": [
      "Une année-lumière est une distance, pas une durée : c’est le trajet effectué par la lumière dans le vide pendant une année, soit environ 9 460 milliards de kilomètres. Elle sert à exprimer des séparations stellaires sans aligner des suites de zéros difficiles à lire.",
      "Dans le Système solaire, l’unité astronomique correspond approximativement à la distance moyenne entre la Terre et le Soleil, environ 150 millions de kilomètres. Le parsec, utilisé par les professionnels, vient de la parallaxe : un parsec vaut environ 3,26 années-lumière.",
      "Aucune unité ne supprime la difficulté de mesurer. Les astronomes combinent radar, parallaxe, luminosité d’objets étalons et décalage spectral. Chaque méthode fonctionne sur une plage de distances et repose sur des hypothèses qu’il faut contrôler."
    ],
    "complete": [
      {
        "title": "1. Une unité adaptée à chaque domaine",
        "text": "Les kilomètres restent pratiques pour les satellites et les planètes proches. L’unité astronomique décrit les orbites autour du Soleil. L’année-lumière donne une image intuitive du temps de trajet de la lumière, tandis que le parsec se relie directement à une méthode géométrique de mesure."
      },
      {
        "title": "2. La parallaxe stellaire",
        "text": "La Terre observe une étoile depuis deux positions opposées de son orbite. L’étoile proche semble légèrement se déplacer par rapport au fond très lointain. L’angle est minuscule, mais il permet de construire un triangle et d’obtenir une distance sans supposer la luminosité réelle de l’astre."
      },
      {
        "title": "3. Une échelle en plusieurs barreaux",
        "text": "Quand la parallaxe devient trop faible, on utilise des étoiles dont la luminosité intrinsèque peut être déduite, puis certaines supernovæ. En comparant luminosité réelle et luminosité reçue, on estime la distance. Les méthodes se chevauchent afin de calibrer une véritable échelle cosmique."
      },
      {
        "title": "4. Les nombres ne sont pas les objets",
        "text": "Dire qu’Alpha du Centaure est à quelques années-lumière ne signifie pas qu’un voyage humain y prendrait seulement quelques années. Nos engins sont beaucoup plus lents que la lumière. Les unités servent à décrire l’Univers ; elles ne garantissent pas une technologie capable de le traverser rapidement."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Une année-lumière est une distance, pas une durée : c’est le trajet effectué par la lumière dans le vide pendant une année, soit environ 9 460 milliards de kilomètres."
      },
      {
        "label": "Mécanisme",
        "text": "Dans le Système solaire, l’unité astronomique correspond approximativement à la distance moyenne entre la Terre et le Soleil, environ 150 millions de kilomètres."
      },
      {
        "label": "Nuance",
        "text": "Aucune unité ne supprime la difficulté de mesurer."
      },
      {
        "label": "À retenir",
        "text": "Les astronomes changent d’unité comme on change d’échelle sur une carte : kilomètres près de la Terre, unités astronomiques autour du Soleil, années-lumière et parsecs pour les étoiles."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Une année-lumière mesure quoi ?",
        "a": "Une distance parcourue par la lumière en une année.",
        "choices": [
          "Une durée de vie d’une étoile.",
          "La luminosité annuelle du Soleil.",
          "La vitesse moyenne d’une fusée."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "À quoi correspond une unité astronomique ?",
        "a": "À la distance moyenne entre la Terre et le Soleil.",
        "choices": [
          "À la distance Terre-Lune.",
          "À une année-lumière exacte.",
          "Au diamètre de la Voie lactée."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Pourquoi le parsec est-il lié à la parallaxe ?",
        "a": "Il est défini à partir de l’angle apparent d’un objet observé depuis l’orbite terrestre.",
        "choices": [
          "Il mesure la couleur des étoiles.",
          "Il correspond au temps d’une orbite.",
          "Il est déterminé par la masse du Soleil."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Quelle méthode fournit une distance géométrique pour les étoiles proches ?",
        "a": "La parallaxe stellaire.",
        "choices": [
          "Le comptage des planètes.",
          "La température de l’atmosphère terrestre.",
          "La forme des constellations."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi faut-il une échelle des distances ?",
        "a": "Parce qu’aucune méthode unique ne fonctionne de façon précise à toutes les distances.",
        "choices": [
          "Parce que les unités changent avec les saisons.",
          "Parce que la lumière n’a pas de vitesse fixe.",
          "Parce que les galaxies refusent les mesures radar."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-big-bang": {
    "hook": "Le Big Bang ne décrit pas une bombe partie d’un point au milieu d’un espace vide. Il décrit un Univers ancien extrêmement chaud et dense, dont l’espace s’est ensuite dilaté et refroidi.",
    "keyFacts": [
      "L’évolution d’un Univers très chaud et dense qui se dilate et se refroidit.",
      "Parce que l’expansion concerne l’espace lui-même et n’a pas de centre global identifié.",
      "Le fond diffus cosmologique.",
      "Dans les étoiles et certains événements stellaires.",
      "Non, il décrit très bien une évolution ancienne sans résoudre toutes les questions sur l’instant initial."
    ],
    "express": [
      "Le modèle du Big Bang repose sur plusieurs observations concordantes : l’expansion cosmique, l’abondance des éléments légers et le fond diffus cosmologique. Il ne raconte pas forcément un instant zéro absolu ; il décrit avec succès l’évolution de l’Univers depuis un état très chaud et très dense.",
      "À mesure que l’Univers se dilate, sa température baisse. Des particules se forment, puis des noyaux légers. Bien plus tard, électrons et noyaux s’associent en atomes ; la lumière peut alors circuler librement. Cette lumière refroidie est aujourd’hui observée sous forme de micro-ondes.",
      "Le mot explosion est trompeur, car il suggère une matière projetée dans un espace préexistant depuis un centre. Dans le modèle cosmologique, c’est la distance entre les grandes régions de l’espace qui augmente. Aucun lieu n’est identifié comme centre de l’expansion globale."
    ],
    "complete": [
      {
        "title": "1. Des preuves indépendantes",
        "text": "Les galaxies lointaines présentent en moyenne un décalage spectral associé à l’expansion. Les proportions d’hydrogène, d’hélium et de lithium correspondent aux réactions possibles dans un Univers très chaud. Le fond diffus cosmologique montre enfin une lumière presque uniforme, avec de petites variations à l’origine des structures futures."
      },
      {
        "title": "2. Les premières minutes",
        "text": "Lorsque la température devient compatible avec des noyaux stables, protons et neutrons produisent surtout de l’hydrogène et de l’hélium, avec de faibles quantités d’autres éléments légers. Les éléments lourds, comme le carbone ou le fer, seront principalement fabriqués plus tard dans les étoiles."
      },
      {
        "title": "3. La libération de la lumière",
        "text": "Pendant des centaines de milliers d’années, la matière ionisée diffuse sans cesse les photons. Quand des atomes neutres se forment, la lumière se découple de la matière. L’expansion allonge ensuite sa longueur d’onde jusqu’au domaine des micro-ondes : c’est le fond diffus cosmologique."
      },
      {
        "title": "4. Ce que le modèle ne résout pas seul",
        "text": "La physique connue devient insuffisante lorsqu’on remonte vers des densités extrêmes. L’origine ultime, la nature d’une éventuelle phase d’inflation ou la manière d’unifier gravitation et physique quantique restent des questions de recherche. Un bon modèle peut être très solide sans répondre à tout."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Le modèle du Big Bang repose sur plusieurs observations concordantes : l’expansion cosmique, l’abondance des éléments légers et le fond diffus cosmologique."
      },
      {
        "label": "Mécanisme",
        "text": "À mesure que l’Univers se dilate, sa température baisse."
      },
      {
        "label": "Nuance",
        "text": "Le mot explosion est trompeur, car il suggère une matière projetée dans un espace préexistant depuis un centre."
      },
      {
        "label": "À retenir",
        "text": "Le Big Bang ne décrit pas une bombe partie d’un point au milieu d’un espace vide. Il décrit un Univers ancien extrêmement chaud et dense, dont l’espace s’est ensuite dilaté et refroidi."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Que décrit principalement le Big Bang ?",
        "a": "L’évolution d’un Univers très chaud et dense qui se dilate et se refroidit.",
        "choices": [
          "Une étoile géante qui explose.",
          "Une collision entre deux galaxies dans un vide immobile.",
          "La naissance du Soleil."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi l’image d’une explosion centrale est-elle trompeuse ?",
        "a": "Parce que l’expansion concerne l’espace lui-même et n’a pas de centre global identifié.",
        "choices": [
          "Parce que le Big Bang a eu lieu dans la Voie lactée.",
          "Parce qu’aucune matière n’existait après lui.",
          "Parce que les galaxies se déplacent toutes vers un même point."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Quelle lumière ancienne observe-t-on aujourd’hui en micro-ondes ?",
        "a": "Le fond diffus cosmologique.",
        "choices": [
          "Le vent solaire.",
          "La lumière réfléchie par la Lune.",
          "Les rayons d’une supernova médiévale."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Où les éléments lourds sont-ils surtout fabriqués ?",
        "a": "Dans les étoiles et certains événements stellaires.",
        "choices": [
          "Uniquement pendant les premières secondes du Big Bang.",
          "Dans les océans terrestres.",
          "Dans les comètes froides."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Le modèle du Big Bang explique-t-il nécessairement l’origine ultime ?",
        "a": "Non, il décrit très bien une évolution ancienne sans résoudre toutes les questions sur l’instant initial.",
        "choices": [
          "Oui, il décrit chaque phénomène avant le temps.",
          "Non, car il ne possède aucune preuve.",
          "Oui, et il exclut toute nouvelle physique."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-expansion-dark-universe": {
    "hook": "La matière visible ne suffit pas à expliquer la vitesse des étoiles dans les galaxies, la formation des grandes structures ni l’accélération actuelle de l’expansion. Les cosmologistes utilisent alors deux notions distinctes : matière noire et énergie noire.",
    "keyFacts": [
      "Entre de grandes structures éloignées qui ne sont pas liées localement.",
      "Parce qu’une masse non lumineuse est inférée par ses effets gravitationnels.",
      "Les vitesses dans les galaxies et la formation des grandes structures.",
      "Le nom donné à la cause encore inconnue de l’accélération cosmique.",
      "Elles répondent à des observations différentes : gravitation supplémentaire et accélération de l’expansion."
    ],
    "express": [
      "L’expansion de l’Univers signifie qu’à grande échelle les distances entre régions non liées gravitationnellement augmentent. Les galaxies d’un même groupe peuvent toutefois se rapprocher ou fusionner : l’expansion ne gonfle pas les êtres humains, les planètes ni les systèmes maintenus par des forces locales.",
      "La matière noire est déduite de ses effets gravitationnels. Elle aide à expliquer les vitesses orbitales dans les galaxies, les lentilles gravitationnelles et la croissance des structures. Elle n’émet pas de lumière détectable comme la matière ordinaire, et sa nature microscopique reste inconnue.",
      "L’énergie noire est le nom donné à ce qui semble provoquer l’accélération de l’expansion cosmique. Elle n’est pas une réserve d’énergie sombre à l’intérieur des galaxies. Les deux notions décrivent des problèmes différents et constituent encore une grande part de l’inventaire cosmologique."
    ],
    "complete": [
      {
        "title": "1. Expansion et gravitation locale",
        "text": "Une galaxie, un amas compact ou le Système solaire sont liés par la gravitation. À leur échelle, cette attraction domine. L’expansion se mesure surtout entre grandes structures éloignées. Dire que l’Univers se dilate ne signifie donc pas que chaque objet se met à grandir proportionnellement."
      },
      {
        "title": "2. Les indices de matière noire",
        "text": "Dans de nombreuses galaxies, les étoiles extérieures tournent trop vite pour la seule masse visible. Les amas dévient davantage la lumière qu’attendu. Les simulations de formation des structures fonctionnent mieux avec une composante massive supplémentaire. Ces indices différents pointent vers un même manque gravitationnel."
      },
      {
        "title": "3. Une expansion accélérée",
        "text": "Des observations de supernovæ lointaines ont montré à la fin du XXe siècle que l’expansion ne ralentissait pas comme prévu, mais accélérait. Une constante cosmologique peut reproduire cet effet, mais son interprétation physique reste difficile. Le terme énergie noire regroupe cette énigme plutôt qu’une substance déjà comprise."
      },
      {
        "title": "4. Modèle robuste, ingrédients mystérieux",
        "text": "Le modèle cosmologique standard décrit remarquablement plusieurs observations avec peu de paramètres. Pourtant, la matière ordinaire que nous connaissons ne représente qu’une minorité du contenu total inféré. Cela illustre une idée essentielle : mesurer précisément les effets d’un phénomène ne signifie pas encore connaître sa nature profonde."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "L’expansion de l’Univers signifie qu’à grande échelle les distances entre régions non liées gravitationnellement augmentent."
      },
      {
        "label": "Mécanisme",
        "text": "La matière noire est déduite de ses effets gravitationnels."
      },
      {
        "label": "Nuance",
        "text": "L’énergie noire est le nom donné à ce qui semble provoquer l’accélération de l’expansion cosmique."
      },
      {
        "label": "À retenir",
        "text": "La matière visible ne suffit pas à expliquer la vitesse des étoiles dans les galaxies, la formation des grandes structures ni l’accélération actuelle de l’expansion. Les cosmologistes utilisent alors deux notions distinctes : matière noire et énergie noire."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "À quelle échelle l’expansion est-elle surtout mesurée ?",
        "a": "Entre de grandes structures éloignées qui ne sont pas liées localement.",
        "choices": [
          "À l’intérieur des atomes.",
          "Dans la taille quotidienne des humains.",
          "Entre la Terre et la Lune à chaque seconde."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi parle-t-on de matière noire ?",
        "a": "Parce qu’une masse non lumineuse est inférée par ses effets gravitationnels.",
        "choices": [
          "Parce que toutes les étoiles noires ont disparu.",
          "Parce qu’elle absorbe nécessairement toute lumière.",
          "Parce qu’elle est faite de trous noirs uniquement."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Quel phénomène la matière noire aide-t-elle à expliquer ?",
        "a": "Les vitesses dans les galaxies et la formation des grandes structures.",
        "choices": [
          "La couleur bleue du ciel terrestre.",
          "Les saisons.",
          "La radioactivité des roches."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Que désigne l’énergie noire ?",
        "a": "Le nom donné à la cause encore inconnue de l’accélération cosmique.",
        "choices": [
          "Le carburant des étoiles.",
          "L’énergie stockée dans les trous noirs seulement.",
          "La lumière invisible des planètes."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi matière noire et énergie noire ne sont-elles pas interchangeables ?",
        "a": "Elles répondent à des observations différentes : gravitation supplémentaire et accélération de l’expansion.",
        "choices": [
          "Elles ont exactement la même fonction.",
          "La première existe dans le passé et la seconde aujourd’hui.",
          "L’une est une unité de distance."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-star-birth-fusion": {
    "hook": "Une étoile naît lorsque la gravitation rassemble une partie d’un nuage froid de gaz et de poussière. Elle commence réellement sa longue vie stable lorsque son cœur devient assez chaud et dense pour entretenir la fusion nucléaire.",
    "keyFacts": [
      "Dans des régions denses de nuages froids de gaz et de poussière.",
      "Quand la fusion de l’hydrogène s’entretient dans son cœur.",
      "La pression du gaz chaud et du rayonnement produits par l’énergie interne.",
      "Elles consomment leur combustible beaucoup plus rapidement.",
      "Il alimente l’étoile et fournit la matière d’un futur système planétaire."
    ],
    "express": [
      "Les nuages moléculaires ne s’effondrent pas entièrement d’un seul bloc. Des régions plus denses se contractent, se fragmentent et forment des protoétoiles entourées de disques. La rotation, le champ magnétique, les turbulences et le rayonnement influencent la matière qui continue de tomber.",
      "Dans le cœur, pression et température augmentent jusqu’à permettre la fusion de noyaux d’hydrogène en hélium. Une petite partie de la masse est convertie en énergie. Le rayonnement et la pression produits s’opposent à la gravitation : cet équilibre maintient l’étoile stable pendant l’essentiel de sa vie.",
      "La masse initiale décide presque tout. Une petite étoile consomme son combustible lentement et peut vivre très longtemps. Une étoile massive est plus chaude et lumineuse, mais brûle ses réserves beaucoup plus vite. Briller davantage ne signifie donc pas vivre plus longtemps."
    ],
    "complete": [
      {
        "title": "1. Un effondrement local",
        "text": "Une perturbation, une onde de choc ou la propre instabilité du nuage peut favoriser l’effondrement d’une région. La gravitation transforme l’énergie de chute en chaleur. La protoétoile n’est pas encore alimentée principalement par la fusion, même si elle peut déjà rayonner fortement."
      },
      {
        "title": "2. Le rôle du disque",
        "text": "La matière possédant du mouvement ne tombe pas directement au centre : elle forme un disque d’accrétion. Des jets peuvent évacuer une partie du moment angulaire. Ce disque constitue aussi le milieu où des grains s’assemblent et où un système planétaire peut commencer à se construire."
      },
      {
        "title": "3. Fusion et équilibre hydrostatique",
        "text": "La gravitation tend à comprimer l’étoile. La pression du gaz chaud et du rayonnement tend à l’étendre. Tant que la production d’énergie du cœur compense les pertes, l’étoile reste sur la séquence principale. Cet équilibre dynamique n’est ni immobile ni éternel."
      },
      {
        "title": "4. La masse fixe le rythme",
        "text": "La pression centrale d’une étoile massive permet des réactions rapides. Sa luminosité augmente très fortement avec sa masse, si bien qu’elle épuise son hydrogène en quelques millions d’années. Une naine rouge peut au contraire rester stable pendant des durées dépassant largement l’âge actuel de l’Univers."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Les nuages moléculaires ne s’effondrent pas entièrement d’un seul bloc."
      },
      {
        "label": "Mécanisme",
        "text": "Dans le cœur, pression et température augmentent jusqu’à permettre la fusion de noyaux d’hydrogène en hélium."
      },
      {
        "label": "Nuance",
        "text": "La masse initiale décide presque tout."
      },
      {
        "label": "À retenir",
        "text": "Une étoile naît lorsque la gravitation rassemble une partie d’un nuage froid de gaz et de poussière. Elle commence réellement sa longue vie stable lorsque son cœur devient assez chaud et dense pour entretenir la fusion nucléaire."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Où naissent les étoiles ?",
        "a": "Dans des régions denses de nuages froids de gaz et de poussière.",
        "choices": [
          "Dans le vide absolu entre les galaxies.",
          "À la surface des planètes.",
          "Dans les queues de comètes uniquement."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Quand une protoétoile devient-elle une étoile stable ?",
        "a": "Quand la fusion de l’hydrogène s’entretient dans son cœur.",
        "choices": [
          "Quand elle possède une planète.",
          "Quand elle devient visible depuis la Terre.",
          "Quand toute sa poussière disparaît."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Qu’est-ce qui équilibre la gravitation dans une étoile ?",
        "a": "La pression du gaz chaud et du rayonnement produits par l’énergie interne.",
        "choices": [
          "La force des planètes en orbite.",
          "Le vent interstellaire uniquement.",
          "La rotation de la galaxie."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi les étoiles massives vivent-elles moins longtemps ?",
        "a": "Elles consomment leur combustible beaucoup plus rapidement.",
        "choices": [
          "Elles possèdent moins d’hydrogène.",
          "Elles ne réalisent aucune fusion.",
          "Elles sont toujours plus anciennes."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Quel rôle un disque autour d’une protoétoile peut-il jouer ?",
        "a": "Il alimente l’étoile et fournit la matière d’un futur système planétaire.",
        "choices": [
          "Il bloque définitivement la gravitation.",
          "Il transforme immédiatement tout le gaz en lumière.",
          "Il empêche toute planète de se former."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-stellar-deaths": {
    "hook": "La mort d’une étoile n’est pas unique. Elle dépend surtout de sa masse : le Soleil finira en naine blanche, tandis que les étoiles les plus massives peuvent exploser et laisser une étoile à neutrons ou un trou noir.",
    "keyFacts": [
      "Une naine blanche.",
      "La fusion du fer ne fournit plus l’énergie permettant de soutenir le cœur.",
      "Une étoile à neutrons en rotation dont le rayonnement est reçu périodiquement.",
      "La frontière au-delà de laquelle aucun signal ne peut revenir vers l’extérieur.",
      "Elles dispersent des éléments fabriqués par les étoiles dans le milieu interstellaire."
    ],
    "express": [
      "Quand l’hydrogène central se raréfie, le cœur se contracte et les couches externes se dilatent. Une étoile de masse modérée devient géante rouge, expulse progressivement son enveloppe puis conserve un cœur dense : une naine blanche, soutenue par la pression quantique des électrons.",
      "Une étoile massive peut fusionner des éléments de plus en plus lourds jusqu’au fer. La fusion du fer ne fournit plus l’énergie nécessaire pour soutenir le cœur. Celui-ci s’effondre brutalement ; les couches externes rebondissent et sont expulsées dans une supernova, qui disperse des éléments dans l’espace.",
      "Le reste comprimé peut devenir une étoile à neutrons de quelques dizaines de kilomètres, parfois observée comme pulsar. Si la masse du cœur est trop grande pour être soutenue, l’effondrement produit un trou noir, région dont l’horizon empêche même la lumière de ressortir."
    ],
    "complete": [
      {
        "title": "1. Le destin du Soleil",
        "text": "Le Soleil n’est pas assez massif pour exploser en supernova. Après sa phase de géante rouge, il éjectera ses couches externes. Son cœur chaud deviendra une naine blanche, qui se refroidira lentement sans nouvelle fusion durable."
      },
      {
        "title": "2. La fabrication des éléments",
        "text": "Les étoiles produisent des éléments par fusion, mais les conditions extrêmes de certaines explosions ou collisions sont nécessaires pour une partie des noyaux les plus lourds. La matière des planètes et des êtres vivants a donc été enrichie par plusieurs générations stellaires."
      },
      {
        "title": "3. Une étoile à neutrons",
        "text": "Lors de l’effondrement, électrons et protons peuvent se combiner en neutrons. La matière devient extraordinairement dense. Un pulsar est une étoile à neutrons en rotation dont les faisceaux de rayonnement balayent périodiquement la Terre, comme un phare cosmique."
      },
      {
        "title": "4. Un trou noir n’aspire pas tout",
        "text": "À distance égale, un trou noir attire comme n’importe quel objet de même masse. Il devient dangereux lorsqu’on s’approche très près. Son horizon des événements marque une frontière causale : une fois franchie, aucune trajectoire ne ramène un signal vers l’extérieur."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Géantes rouges, supernovæ, étoiles à neutrons et trous noirs », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Quand l’hydrogène central se raréfie, le cœur se contracte et les couches externes se dilatent."
      },
      {
        "label": "Mécanisme",
        "text": "Une étoile massive peut fusionner des éléments de plus en plus lourds jusqu’au fer."
      },
      {
        "label": "Nuance",
        "text": "Le reste comprimé peut devenir une étoile à neutrons de quelques dizaines de kilomètres, parfois observée comme pulsar."
      },
      {
        "label": "À retenir",
        "text": "La mort d’une étoile n’est pas unique. Elle dépend surtout de sa masse : le Soleil finira en naine blanche, tandis que les étoiles les plus massives peuvent exploser et laisser une étoile à neutrons ou un trou noir."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Quel sera probablement le reste final du Soleil ?",
        "a": "Une naine blanche.",
        "choices": [
          "Une étoile à neutrons.",
          "Un trou noir supermassif.",
          "Une nouvelle galaxie."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi le cœur d’une étoile massive s’effondre-t-il après la formation de fer ?",
        "a": "La fusion du fer ne fournit plus l’énergie permettant de soutenir le cœur.",
        "choices": [
          "Le fer repousse la gravitation.",
          "Le cœur devient soudain froid et vide.",
          "Toutes les réactions nucléaires inversent le temps."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Qu’est-ce qu’un pulsar ?",
        "a": "Une étoile à neutrons en rotation dont le rayonnement est reçu périodiquement.",
        "choices": [
          "Une planète qui clignote.",
          "Une étoile ordinaire cachée par une lune.",
          "Une comète très rapide."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Que marque l’horizon d’un trou noir ?",
        "a": "La frontière au-delà de laquelle aucun signal ne peut revenir vers l’extérieur.",
        "choices": [
          "Une surface solide et lumineuse.",
          "La limite de toute gravitation dans l’Univers.",
          "Le bord de la galaxie."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi les supernovæ sont-elles importantes pour la matière cosmique ?",
        "a": "Elles dispersent des éléments fabriqués par les étoiles dans le milieu interstellaire.",
        "choices": [
          "Elles détruisent tous les éléments lourds.",
          "Elles produisent uniquement de l’hydrogène.",
          "Elles empêchent toute nouvelle étoile."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-sun-structure": {
    "hook": "Le Soleil est une étoile ordinaire par sa catégorie, mais décisive pour la Terre. Son énergie naît dans un cœur inaccessible, traverse lentement l’intérieur puis s’échappe depuis une surface apparente appelée photosphère.",
    "keyFacts": [
      "Dans le cœur par fusion nucléaire.",
      "La couche apparente d’où la lumière visible s’échappe efficacement.",
      "Notamment par convection du plasma.",
      "Elle est beaucoup plus chaude que la photosphère située dessous.",
      "Environ huit minutes."
    ],
    "express": [
      "Le cœur concentre les températures et pressions permettant la fusion de l’hydrogène. L’énergie produite est transportée d’abord surtout par rayonnement, puis par convection dans les couches externes : du plasma chaud monte, se refroidit et redescend en cellules visibles sous forme de granulation.",
      "La photosphère n’est pas une surface solide ; elle correspond à la couche d’où la lumière s’échappe efficacement. Au-dessus se trouvent la chromosphère et la couronne. Étrangement, la couronne atteint des températures bien supérieures à celles de la photosphère, grâce à des mécanismes magnétiques encore étudiés.",
      "Le Soleil contient l’immense majorité de la masse du Système solaire. Sa gravitation organise les orbites, tandis que son rayonnement et son vent de particules influencent atmosphères, magnétosphères et comètes. Il évolue lentement et deviendra une géante rouge dans plusieurs milliards d’années."
    ],
    "complete": [
      {
        "title": "1. Une centrale de fusion",
        "text": "Dans le cœur, une chaîne de réactions transforme globalement quatre noyaux d’hydrogène en un noyau d’hélium. La masse finale est légèrement plus faible ; la différence apparaît sous forme d’énergie selon l’équivalence entre masse et énergie."
      },
      {
        "title": "2. Un long trajet vers l’extérieur",
        "text": "Un photon produit au cœur n’effectue pas une ligne droite jusqu’à la surface. Il interagit un très grand nombre de fois avec le plasma. L’énergie est absorbée, réémise et transportée pendant une durée immense, alors que la lumière libérée par la photosphère rejoint ensuite la Terre en environ huit minutes."
      },
      {
        "title": "3. Une atmosphère magnétique",
        "text": "La chromosphère et la couronne montrent arches, boucles et jets liés au champ magnétique. Des ondes et reconnexions magnétiques transfèrent de l’énergie au plasma. Le chauffage coronal reste un exemple de problème scientifique dont le cadre général est connu mais les détails encore discutés."
      },
      {
        "title": "4. Une étoile qui change lentement",
        "text": "Le Soleil devient progressivement plus lumineux au cours de sa vie principale. Lorsque l’hydrogène central sera épuisé, son cœur se contractera et ses couches externes se dilateront. Cette évolution est très lente à l’échelle humaine, mais transforme profondément l’habitabilité à long terme."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Le cœur concentre les températures et pressions permettant la fusion de l’hydrogène."
      },
      {
        "label": "Mécanisme",
        "text": "La photosphère n’est pas une surface solide ; elle correspond à la couche d’où la lumière s’échappe efficacement."
      },
      {
        "label": "Nuance",
        "text": "Le Soleil contient l’immense majorité de la masse du Système solaire."
      },
      {
        "label": "À retenir",
        "text": "Le Soleil est une étoile ordinaire par sa catégorie, mais décisive pour la Terre. Son énergie naît dans un cœur inaccessible, traverse lentement l’intérieur puis s’échappe depuis une surface apparente appelée photosphère."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Où l’énergie solaire est-elle principalement produite ?",
        "a": "Dans le cœur par fusion nucléaire.",
        "choices": [
          "Dans la photosphère par combustion.",
          "Dans les taches solaires.",
          "Dans les planètes proches."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Qu’est-ce que la photosphère ?",
        "a": "La couche apparente d’où la lumière visible s’échappe efficacement.",
        "choices": [
          "Une coque solide.",
          "Le noyau du Soleil.",
          "La limite de son champ gravitationnel."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Comment l’énergie traverse-t-elle les couches externes ?",
        "a": "Notamment par convection du plasma.",
        "choices": [
          "Par des océans liquides.",
          "Par des roches conductrices.",
          "Uniquement par des météorites."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi la couronne intrigue-t-elle les scientifiques ?",
        "a": "Elle est beaucoup plus chaude que la photosphère située dessous.",
        "choices": [
          "Elle est entièrement froide.",
          "Elle ne contient aucune matière.",
          "Elle tourne autour de la Terre."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Combien de temps la lumière libérée à la surface met-elle environ pour atteindre la Terre ?",
        "a": "Environ huit minutes.",
        "choices": [
          "Huit secondes.",
          "Un an.",
          "Plusieurs millions d’années après sa sortie de la surface."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-solar-activity-auroras": {
    "hook": "Le Soleil n’éclaire pas seulement : il projette continuellement un vent de particules et connaît des éruptions capables de perturber l’environnement spatial terrestre. Les aurores sont l’une des manifestations visibles de cette interaction.",
    "keyFacts": [
      "Elle est plus froide que la photosphère environnante et apparaît sombre par contraste.",
      "Environ onze ans.",
      "Un vaste nuage de plasma et de champ magnétique expulsé par le Soleil.",
      "Des particules guidées par le champ terrestre excitent les gaz de la haute atmosphère.",
      "Les satellites, communications, systèmes de navigation ou réseaux électriques."
    ],
    "express": [
      "Les taches solaires sont des régions temporairement plus froides de la photosphère, liées à des champs magnétiques intenses. Leur nombre varie selon un cycle d’environ onze ans. Une tache n’est pas noire en soi : elle paraît sombre par contraste avec la surface plus chaude.",
      "Les éruptions libèrent rapidement énergie et rayonnements. Certaines éjections de masse coronale envoient de vastes nuages de plasma dans l’espace. Si leur trajectoire rencontre la Terre et que leur champ magnétique se couple au nôtre, une tempête géomagnétique peut se produire.",
      "Le champ terrestre canalise des particules vers les régions polaires. En heurtant les gaz de la haute atmosphère, elles excitent oxygène et azote, qui émettent ensuite différentes couleurs. Les mêmes tempêtes peuvent affecter satellites, communications radio, navigation et réseaux électriques."
    ],
    "complete": [
      {
        "title": "1. Un cycle magnétique",
        "text": "Le champ global du Soleil se réorganise et inverse sa polarité autour du maximum d’activité. Le cycle des taches constitue la manifestation la plus facile à suivre, mais l’activité varie aussi dans les éruptions, le rayonnement ultraviolet et les particules énergétiques."
      },
      {
        "title": "2. Vent continu et événements violents",
        "text": "Le vent solaire s’écoule en permanence depuis la couronne. Une éjection de masse coronale est un événement plus massif et structuré. Confondre les deux empêche de comprendre pourquoi certaines perturbations sont modestes tandis que d’autres déclenchent une forte réponse magnétique terrestre."
      },
      {
        "title": "3. Couleurs des aurores",
        "text": "L’oxygène peut produire du vert ou du rouge selon l’altitude et l’énergie des collisions ; l’azote contribue notamment au bleu et au violet. La forme des rideaux suit les lignes du champ magnétique et varie rapidement avec l’arrivée des particules."
      },
      {
        "title": "4. Prévoir la météo spatiale",
        "text": "Des satellites observent le Soleil et mesurent le vent solaire en amont de la Terre. Les prévisions visent à protéger les astronautes, les satellites et les infrastructures. Elles restent difficiles, car il faut connaître la direction magnétique et l’évolution tridimensionnelle des éjections."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Taches, éruptions, vent solaire et aurores », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Les taches solaires sont des régions temporairement plus froides de la photosphère, liées à des champs magnétiques intenses."
      },
      {
        "label": "Mécanisme",
        "text": "Les éruptions libèrent rapidement énergie et rayonnements."
      },
      {
        "label": "Nuance",
        "text": "Le champ terrestre canalise des particules vers les régions polaires."
      },
      {
        "label": "À retenir",
        "text": "Le Soleil n’éclaire pas seulement : il projette continuellement un vent de particules et connaît des éruptions capables de perturber l’environnement spatial terrestre. Les aurores sont l’une des manifestations visibles de cette interaction."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Pourquoi une tache solaire paraît-elle sombre ?",
        "a": "Elle est plus froide que la photosphère environnante et apparaît sombre par contraste.",
        "choices": [
          "Elle est un trou dans le Soleil.",
          "Elle ne contient aucune matière.",
          "Elle absorbe toute lumière de l’Univers."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Quelle est la durée approximative du cycle des taches ?",
        "a": "Environ onze ans.",
        "choices": [
          "Onze jours.",
          "Un siècle exact.",
          "Une année terrestre."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Qu’est-ce qu’une éjection de masse coronale ?",
        "a": "Un vaste nuage de plasma et de champ magnétique expulsé par le Soleil.",
        "choices": [
          "Une planète éjectée du Système solaire.",
          "Un simple rayon de lumière visible.",
          "La disparition de la couronne."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Comment naissent les aurores ?",
        "a": "Des particules guidées par le champ terrestre excitent les gaz de la haute atmosphère.",
        "choices": [
          "La Lune éclaire les nuages polaires.",
          "Les océans réfléchissent les étoiles.",
          "La neige produit de la radioactivité."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Quel domaine peut être perturbé par une tempête géomagnétique ?",
        "a": "Les satellites, communications, systèmes de navigation ou réseaux électriques.",
        "choices": [
          "La tectonique des plaques uniquement.",
          "La rotation quotidienne de la Terre.",
          "La fusion au cœur du Soleil."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-solar-system-formation": {
    "hook": "Le Soleil et les planètes se sont formés ensemble à partir d’un nuage en contraction. La matière s’est aplatie en disque ; au centre est né le Soleil, tandis que grains, cailloux et embryons planétaires s’assemblaient autour de lui.",
    "keyFacts": [
      "D’un nuage de gaz et de poussière qui s’est contracté en disque.",
      "Des planétésimaux.",
      "La rotation et les collisions organisent progressivement la matière dans un plan.",
      "La température plus basse permettait aux composés volatils de se condenser.",
      "Certaines météorites, astéroïdes et comètes peu transformés."
    ],
    "express": [
      "Sous l’effet de la gravitation, une région d’un nuage moléculaire s’est contractée. La conservation du mouvement de rotation a favorisé un disque autour de la jeune étoile. Dans ce disque, température et composition variaient fortement avec la distance au Soleil.",
      "Les grains se sont heurtés et parfois collés. Des corps de plus en plus grands, appelés planétésimaux, ont accumulé de la matière par gravitation. Les collisions ont construit des embryons planétaires, mais elles ont aussi fragmenté ou éjecté de nombreux objets.",
      "Près du Soleil, la chaleur favorisait surtout roches et métaux ; plus loin, les glaces pouvaient se condenser et fournir davantage de matériau. Cette différence aide à comprendre la séparation entre petites planètes rocheuses internes et planètes géantes externes, sans imposer un scénario parfaitement ordonné."
    ],
    "complete": [
      {
        "title": "1. Pourquoi un disque ?",
        "text": "Un nuage possède presque toujours une faible rotation initiale. En se contractant, il tourne plus vite et les collisions dissipent les mouvements verticaux, ce qui aplatit la matière. Les disques protoplanétaires observés autour de jeunes étoiles confirment que ce mécanisme est courant."
      },
      {
        "title": "2. De la poussière aux planètes",
        "text": "Les premières étapes de collage sont complexes, car les grains peuvent rebondir ou se briser. Une fois des corps assez grands formés, leur gravitation augmente la zone de capture. La croissance devient alors chaotique, avec migrations, résonances et impacts géants."
      },
      {
        "title": "3. La ligne des glaces",
        "text": "Au-delà d’une certaine distance, l’eau et d’autres composés volatils peuvent rester sous forme solide. La quantité de matériau disponible augmente, ce qui facilite la formation rapide de gros noyaux capables de retenir hydrogène et hélium avant la dispersion du gaz du disque."
      },
      {
        "title": "4. Des archives primitives",
        "text": "Les météorites les plus anciennes, certains astéroïdes et les comètes conservent une matière peu transformée. Leur composition et leur datation permettent de reconstruire les premiers millions d’années, bien mieux que les surfaces planétaires continuellement remaniées."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Comment s’est formé le Système solaire ? », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Sous l’effet de la gravitation, une région d’un nuage moléculaire s’est contractée."
      },
      {
        "label": "Mécanisme",
        "text": "Les grains se sont heurtés et parfois collés."
      },
      {
        "label": "Nuance",
        "text": "Près du Soleil, la chaleur favorisait surtout roches et métaux ; plus loin, les glaces pouvaient se condenser et fournir davantage de matériau."
      },
      {
        "label": "À retenir",
        "text": "Le Soleil et les planètes se sont formés ensemble à partir d’un nuage en contraction. La matière s’est aplatie en disque ; au centre est né le Soleil, tandis que grains, cailloux et embryons planétaires s’assemblaient autour de lui."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "À partir de quoi le Système solaire s’est-il formé ?",
        "a": "D’un nuage de gaz et de poussière qui s’est contracté en disque.",
        "choices": [
          "D’une explosion de la Terre.",
          "D’une comète unique.",
          "D’un trou noir évaporé."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Comment appelle-t-on les corps intermédiaires qui s’assemblent ?",
        "a": "Des planétésimaux.",
        "choices": [
          "Des pulsars.",
          "Des quasars.",
          "Des photosphères."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Pourquoi le disque s’aplatit-il ?",
        "a": "La rotation et les collisions organisent progressivement la matière dans un plan.",
        "choices": [
          "Le Soleil possédait déjà une surface solide plate.",
          "Une galaxie voisine l’a coupé.",
          "Les planètes ont aspiré toute la matière verticale."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi davantage de glaces existaient-elles loin du jeune Soleil ?",
        "a": "La température plus basse permettait aux composés volatils de se condenser.",
        "choices": [
          "La gravitation y était absente.",
          "La lumière y voyageait moins vite.",
          "Les roches ne pouvaient pas exister."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Quelles archives renseignent les débuts du Système solaire ?",
        "a": "Certaines météorites, astéroïdes et comètes peu transformés.",
        "choices": [
          "Uniquement les océans modernes.",
          "Les satellites de communication.",
          "Les taches solaires actuelles."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-rocky-planets": {
    "hook": "Les quatre planètes internes partagent une surface solide et une composition dominée par roches et métaux. Pourtant, elles ont suivi des destins très différents sous l’effet de leur masse, de leur atmosphère, de leur eau et de leur distance au Soleil.",
    "keyFacts": [
      "Son atmosphère épaisse produit un effet de serre extrêmement puissant.",
      "La Terre.",
      "La présence passée d’écoulements d’eau liquide.",
      "Elle possède très peu d’atmosphère pour redistribuer la chaleur.",
      "L’atmosphère, la masse, l’eau et l’activité géologique modifient fortement le climat."
    ],
    "express": [
      "Mercure est petite, dense et presque dépourvue d’atmosphère durable. Ses températures varient fortement, mais de la glace peut subsister dans des cratères polaires toujours à l’ombre. Sa surface conserve de nombreux impacts et des traces de contraction globale.",
      "Vénus possède une atmosphère épaisse de dioxyde de carbone et des nuages acides. Son puissant effet de serre maintient une surface plus chaude que Mercure. La Terre conserve de l’eau liquide, une tectonique active et une atmosphère profondément modifiée par le vivant.",
      "Mars est aujourd’hui froide, sèche et enveloppée d’une atmosphère ténue, mais ses vallées et minéraux indiquent qu’elle a connu de l’eau liquide. Comparer ces planètes montre qu’une position dans la zone habitable ne suffit pas : masse, géologie et évolution atmosphérique comptent aussi."
    ],
    "complete": [
      {
        "title": "1. Mercure, un monde extrême",
        "text": "Son absence d’atmosphère dense empêche de redistribuer efficacement la chaleur. Elle tourne lentement et subit de fortes variations entre zones éclairées et obscures. Son grand noyau métallique occupe une proportion remarquable de son volume."
      },
      {
        "title": "2. Vénus et l’emballement climatique",
        "text": "La pression au sol est énorme et l’atmosphère piège efficacement le rayonnement infrarouge. Vénus rappelle qu’une planète proche de la Terre en taille peut évoluer vers un état radicalement différent. Son passé aqueux éventuel reste étudié."
      },
      {
        "title": "3. La Terre, planète active",
        "text": "La tectonique recycle une partie de la croûte et participe au cycle du carbone sur de longues durées. Le champ magnétique, l’océan et la biosphère interagissent avec l’atmosphère. L’habitabilité terrestre résulte d’un système, pas d’un seul paramètre."
      },
      {
        "title": "4. Mars a perdu une grande partie de son atmosphère",
        "text": "Sa faible masse et la disparition précoce d’un champ magnétique global ont facilité l’érosion atmosphérique. L’eau de surface a gelé, pénétré le sous-sol ou été perdue. Les missions cherchent les environnements anciens où une vie microbienne aurait pu être possible."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Mercure, Vénus, Terre et Mars : quatre mondes rocheux », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Mercure est petite, dense et presque dépourvue d’atmosphère durable."
      },
      {
        "label": "Mécanisme",
        "text": "Vénus possède une atmosphère épaisse de dioxyde de carbone et des nuages acides."
      },
      {
        "label": "Nuance",
        "text": "Mars est aujourd’hui froide, sèche et enveloppée d’une atmosphère ténue, mais ses vallées et minéraux indiquent qu’elle a connu de l’eau liquide."
      },
      {
        "label": "À retenir",
        "text": "Les quatre planètes internes partagent une surface solide et une composition dominée par roches et métaux. Pourtant, elles ont suivi des destins très différents sous l’effet de leur masse, de leur atmosphère, de leur eau et de leur distance au Soleil."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Pourquoi Vénus est-elle plus chaude que Mercure ?",
        "a": "Son atmosphère épaisse produit un effet de serre extrêmement puissant.",
        "choices": [
          "Elle est beaucoup plus proche du Soleil.",
          "Son sol brûle du charbon.",
          "Elle possède deux Soleils."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Quelle planète conserve une tectonique des plaques active connue ?",
        "a": "La Terre.",
        "choices": [
          "Mercure.",
          "Vénus de façon identique à la Terre.",
          "Mars avec des plaques rapides actuelles."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Qu’indiquent les vallées anciennes de Mars ?",
        "a": "La présence passée d’écoulements d’eau liquide.",
        "choices": [
          "Des océans de lave actuels.",
          "Des traces de routes artificielles.",
          "Une atmosphère plus épaisse aujourd’hui."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi Mercure connaît-elle de grands écarts de température ?",
        "a": "Elle possède très peu d’atmosphère pour redistribuer la chaleur.",
        "choices": [
          "Elle produit sa propre lumière.",
          "Elle change de distance chaque heure.",
          "Elle est entièrement recouverte d’eau."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi la zone habitable ne suffit-elle pas à prédire un monde habitable ?",
        "a": "L’atmosphère, la masse, l’eau et l’activité géologique modifient fortement le climat.",
        "choices": [
          "Parce que toutes les planètes y sont identiques.",
          "Parce que la lumière stellaire n’a aucun effet.",
          "Parce qu’une planète doit obligatoirement avoir des anneaux."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-giant-planets": {
    "hook": "Les quatre planètes externes sont bien plus massives que la Terre, mais elles ne sont pas identiques. Jupiter et Saturne sont dominées par hydrogène et hélium ; Uranus et Neptune contiennent proportionnellement davantage de composés lourds et glacés.",
    "keyFacts": [
      "Jupiter.",
      "Non, leur atmosphère devient progressivement un fluide très dense en profondeur.",
      "D’innombrables particules de glace et de roche en orbite.",
      "Son axe de rotation est extrêmement incliné, comme si elle tournait couchée.",
      "Elle possède une dynamique atmosphérique et une source de chaleur interne."
    ],
    "express": [
      "Jupiter est la planète la plus massive. Son atmosphère montre bandes, tourbillons et une Grande Tache rouge durable. Sous les nuages, la pression transforme progressivement l’hydrogène ; il n’existe pas de surface solide nette où l’on pourrait se poser comme sur Mars.",
      "Saturne est célèbre pour ses anneaux, composés d’innombrables particules de glace et de roche. Toutes les géantes possèdent des anneaux, mais ceux de Saturne sont particulièrement brillants et étendus. Les interactions avec de petites lunes sculptent des divisions et des ondes.",
      "Uranus tourne presque couchée, probablement à la suite d’événements anciens. Neptune, plus éloignée, présente pourtant des vents très rapides grâce à une source de chaleur interne. Ces mondes montrent que recevoir peu de lumière solaire ne signifie pas être météorologiquement inactif."
    ],
    "complete": [
      {
        "title": "1. Pas de sol accessible",
        "text": "La densité augmente progressivement avec la profondeur. Les modèles prévoient des couches de fluides sous haute pression et probablement des noyaux enrichis en éléments lourds. Une sonde descendante serait détruite bien avant d’atteindre une frontière solide hypothétique."
      },
      {
        "title": "2. Des systèmes miniatures",
        "text": "Chaque planète géante possède de nombreuses lunes, des anneaux et une vaste magnétosphère. Jupiter ressemble à un petit système planétaire, où les satellites galiléens occupent des orbites régulières et présentent des mondes très différents."
      },
      {
        "title": "3. Les anneaux sont dynamiques",
        "text": "Les particules suivent chacune une orbite. Collisions, résonances et lunes bergères structurent les anneaux. Ils ne constituent pas un disque rigide. Leur origine et leur âge précis restent étudiés, notamment pour les anneaux spectaculaires de Saturne."
      },
      {
        "title": "4. Géantes de glace",
        "text": "Uranus et Neptune sont souvent appelées géantes de glace, non parce qu’elles seraient des boules gelées, mais parce que leurs intérieurs contiennent davantage de molécules comme eau, ammoniac et méthane sous des états extrêmes."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Jupiter, Saturne, Uranus et Neptune », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Jupiter est la planète la plus massive."
      },
      {
        "label": "Mécanisme",
        "text": "Saturne est célèbre pour ses anneaux, composés d’innombrables particules de glace et de roche."
      },
      {
        "label": "Nuance",
        "text": "Uranus tourne presque couchée, probablement à la suite d’événements anciens."
      },
      {
        "label": "À retenir",
        "text": "Les quatre planètes externes sont bien plus massives que la Terre, mais elles ne sont pas identiques. Jupiter et Saturne sont dominées par hydrogène et hélium ; Uranus et Neptune contiennent proportionnellement davantage de composés lourds et glacés."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Quelle planète est la plus massive du Système solaire ?",
        "a": "Jupiter.",
        "choices": [
          "Mars.",
          "Saturne.",
          "Neptune."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Les géantes possèdent-elles une surface solide nette ?",
        "a": "Non, leur atmosphère devient progressivement un fluide très dense en profondeur.",
        "choices": [
          "Oui, une croûte rocheuse visible sous les nuages.",
          "Oui, une surface de glace plate.",
          "Non, car elles sont entièrement vides."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "De quoi les anneaux de Saturne sont-ils surtout composés ?",
        "a": "D’innombrables particules de glace et de roche en orbite.",
        "choices": [
          "D’un disque solide unique.",
          "De gaz brûlant immobile.",
          "De poussière provenant uniquement de la Terre."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Quelle particularité caractérise Uranus ?",
        "a": "Son axe de rotation est extrêmement incliné, comme si elle tournait couchée.",
        "choices": [
          "Elle est la plus proche du Soleil.",
          "Elle ne possède aucune atmosphère.",
          "Elle tourne autour de Saturne."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi Neptune peut-elle avoir des vents actifs malgré son éloignement ?",
        "a": "Elle possède une dynamique atmosphérique et une source de chaleur interne.",
        "choices": [
          "Elle reçoit plus de Soleil que la Terre.",
          "Ses vents viennent directement des comètes.",
          "Elle est réchauffée par la Lune."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-ocean-moons": {
    "hook": "Certaines lunes glacées pourraient abriter sous leur croûte des océans d’eau liquide. Elles déplacent la recherche de vie au-delà de la zone habitable classique, car la chaleur peut venir des forces de marée plutôt que du Soleil.",
    "keyFacts": [
      "La chaleur produite par les déformations de marée.",
      "Encelade.",
      "Ils permettent d’analyser des matériaux provenant de l’océan interne sans traverser la glace.",
      "Titan.",
      "Non, cela indique un environnement potentiellement habitable, pas une vie démontrée."
    ],
    "express": [
      "Europe, lune de Jupiter, présente une surface jeune et fracturée. Son champ magnétique induit et sa géologie suggèrent un océan salé sous la glace. Les forces de marée exercées par Jupiter déforment son intérieur et peuvent fournir de la chaleur.",
      "Encelade, petite lune de Saturne, éjecte des panaches depuis des fractures polaires. Des sondes ont traversé ces jets et détecté eau, sels, molécules organiques et indices d’interactions hydrothermales. Il est donc possible d’échantillonner indirectement son océan sans forer la glace.",
      "Titan possède une atmosphère dense, des lacs d’hydrocarbures en surface et probablement un océan interne. Ces mondes ne prouvent pas l’existence de vie. Ils réunissent toutefois eau liquide, chimie et sources d’énergie, trois ingrédients qui justifient des missions ciblées."
    ],
    "complete": [
      {
        "title": "1. Le chauffage par marées",
        "text": "Une orbite légèrement excentrique fait varier l’attraction gravitationnelle reçue. La lune se déforme continuellement ; les frottements internes dissipent de l’énergie en chaleur. Les résonances avec d’autres satellites maintiennent souvent cette excentricité."
      },
      {
        "title": "2. Europe sous la glace",
        "text": "Les fractures, terrains chaotiques et rares cratères indiquent une surface renouvelée. L’épaisseur de la glace et les échanges avec l’océan restent incertains. Comprendre ces échanges est essentiel pour savoir si des nutriments peuvent circuler."
      },
      {
        "title": "3. Les panaches d’Encelade",
        "text": "Ils contiennent des grains et des gaz issus de l’océan interne. La présence d’hydrogène moléculaire peut s’expliquer par des réactions entre eau et roche chaude, analogues à celles observées près de certaines sources hydrothermales terrestres."
      },
      {
        "title": "4. Habitabilité n’est pas vie",
        "text": "Un environnement habitable offre des conditions compatibles avec une chimie vivante connue. Il peut rester stérile. Les missions recherchent donc des ensembles d’indices, en éliminant les explications géologiques ou chimiques non biologiques."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Lunes océans : Europe, Encelade et autres mondes cachés », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Europe, lune de Jupiter, présente une surface jeune et fracturée."
      },
      {
        "label": "Mécanisme",
        "text": "Encelade, petite lune de Saturne, éjecte des panaches depuis des fractures polaires."
      },
      {
        "label": "Nuance",
        "text": "Titan possède une atmosphère dense, des lacs d’hydrocarbures en surface et probablement un océan interne."
      },
      {
        "label": "À retenir",
        "text": "Certaines lunes glacées pourraient abriter sous leur croûte des océans d’eau liquide. Elles déplacent la recherche de vie au-delà de la zone habitable classique, car la chaleur peut venir des forces de marée plutôt que du Soleil."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Quelle source peut maintenir un océan liquide loin du Soleil ?",
        "a": "La chaleur produite par les déformations de marée.",
        "choices": [
          "La lumière visible seule.",
          "Les incendies de surface.",
          "La rotation de la Voie lactée."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Quelle lune de Saturne émet des panaches ?",
        "a": "Encelade.",
        "choices": [
          "La Lune terrestre.",
          "Phobos.",
          "Io uniquement."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Pourquoi les panaches sont-ils précieux ?",
        "a": "Ils permettent d’analyser des matériaux provenant de l’océan interne sans traverser la glace.",
        "choices": [
          "Ils rendent la lune visible à l’œil nu.",
          "Ils prouvent directement une civilisation.",
          "Ils arrêtent les radiations solaires."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Quel monde possède des lacs d’hydrocarbures en surface ?",
        "a": "Titan.",
        "choices": [
          "Europe.",
          "Mercure.",
          "Vénus."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Découvrir un océan signifie-t-il découvrir la vie ?",
        "a": "Non, cela indique un environnement potentiellement habitable, pas une vie démontrée.",
        "choices": [
          "Oui, toute eau liquide contient forcément des organismes.",
          "Oui, si l’océan est sous la glace.",
          "Non, car la vie ne peut jamais exister dans l’eau."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-asteroids-comets": {
    "hook": "Astéroïdes et comètes sont souvent présentés comme des débris, mais ils sont surtout des archives. Leur matière a moins été transformée que celle des grandes planètes et conserve des indices sur les conditions initiales du disque solaire.",
    "keyFacts": [
      "Entre les orbites de Mars et Jupiter.",
      "Non, les objets y sont généralement séparés par de très grandes distances.",
      "Ses glaces se subliment lorsqu’elle se réchauffe près du Soleil.",
      "Globalement à l’opposé du Soleil sous l’effet du vent solaire.",
      "Ils conservent des matériaux primitifs renseignant la formation du Système solaire."
    ],
    "express": [
      "Un astéroïde est généralement un petit corps dominé par roches ou métaux. Beaucoup se trouvent dans la ceinture entre Mars et Jupiter, mais ils existent ailleurs. La ceinture n’est pas un champ compact : les objets sont séparés par d’immenses distances.",
      "Une comète contient davantage de glaces et de poussière. En approchant du Soleil, ses glaces se subliment, formant une chevelure et des queues. La queue ionique et la queue de poussière sont orientées par le vent solaire et le rayonnement, pas simplement derrière la trajectoire.",
      "Les petits corps peuvent avoir apporté une partie de l’eau et des molécules organiques aux planètes internes, mais leur contribution exacte est débattue. Des missions rapportent ou analysent des échantillons afin de comparer leur chimie aux météorites et à la Terre."
    ],
    "complete": [
      {
        "title": "1. Une ceinture très vide",
        "text": "Les images de fiction montrent des rochers serrés, alors qu’un vaisseau traverserait normalement la ceinture principale sans voir d’objet de près. La masse totale de cette ceinture reste très inférieure à celle de la Lune."
      },
      {
        "title": "2. Les familles d’astéroïdes",
        "text": "Des collisions brisent des corps parents et créent des groupes partageant des orbites et compositions proches. Certains fragments croisent ensuite l’orbite terrestre. Leur étude relie les météorites tombées au sol à des populations observées dans l’espace."
      },
      {
        "title": "3. Une comète se transforme près du Soleil",
        "text": "Le noyau reste petit et sombre. L’activité crée une atmosphère temporaire immense. Les jets peuvent modifier légèrement l’orbite et la rotation. Après de nombreux passages, une comète peut perdre ses matériaux volatils ou se fragmenter."
      },
      {
        "title": "4. Prélever la matière primitive",
        "text": "Les analyses en laboratoire sont plus précises que les instruments embarqués. Les missions de retour d’échantillons exigent cependant d’éviter la contamination terrestre et de documenter exactement le contexte du prélèvement."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Astéroïdes et comètes : les archives du Système solaire », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Un astéroïde est généralement un petit corps dominé par roches ou métaux."
      },
      {
        "label": "Mécanisme",
        "text": "Une comète contient davantage de glaces et de poussière."
      },
      {
        "label": "Nuance",
        "text": "Les petits corps peuvent avoir apporté une partie de l’eau et des molécules organiques aux planètes internes, mais leur contribution exacte est débattue."
      },
      {
        "label": "À retenir",
        "text": "Astéroïdes et comètes sont souvent présentés comme des débris, mais ils sont surtout des archives. Leur matière a moins été transformée que celle des grandes planètes et conserve des indices sur les conditions initiales du disque solaire."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Où se situe la ceinture principale d’astéroïdes ?",
        "a": "Entre les orbites de Mars et Jupiter.",
        "choices": [
          "Entre la Terre et la Lune.",
          "Au centre du Soleil.",
          "Au-delà de toutes les galaxies."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "La ceinture d’astéroïdes est-elle très dense ?",
        "a": "Non, les objets y sont généralement séparés par de très grandes distances.",
        "choices": [
          "Oui, aucun espace vide n’y existe.",
          "Oui, elle forme une surface solide.",
          "Non, car elle ne contient qu’un seul objet."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Pourquoi une comète développe-t-elle une chevelure ?",
        "a": "Ses glaces se subliment lorsqu’elle se réchauffe près du Soleil.",
        "choices": [
          "Elle brûle dans l’atmosphère terrestre.",
          "Elle capture les nuages de Jupiter.",
          "Son noyau devient une étoile."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Dans quelle direction la queue ionique s’oriente-t-elle ?",
        "a": "Globalement à l’opposé du Soleil sous l’effet du vent solaire.",
        "choices": [
          "Toujours derrière le mouvement orbital.",
          "Toujours vers la Terre.",
          "Vers le centre de la galaxie."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi étudier les petits corps ?",
        "a": "Ils conservent des matériaux primitifs renseignant la formation du Système solaire.",
        "choices": [
          "Ils sont tous identiques aux planètes.",
          "Ils produisent la majorité de la lumière solaire.",
          "Ils déterminent les saisons terrestres."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-meteors-impacts": {
    "hook": "Un petit corps dans l’espace est un météoroïde ; la traînée lumineuse dans l’atmosphère est un météore ; le fragment qui atteint le sol devient une météorite. Ces mots décrivent trois étapes différentes d’un même voyage possible.",
    "keyFacts": [
      "Le phénomène lumineux produit lors de l’entrée d’un petit corps dans l’atmosphère.",
      "Une météorite.",
      "La Terre recroise chaque année des courants de poussières sur son orbite.",
      "Par un effet de perspective sur des trajectoires presque parallèles.",
      "Modifier légèrement sa vitesse afin qu’il manque la Terre plus tard."
    ],
    "express": [
      "La lumière d’une étoile filante provient surtout de l’échauffement et de l’ionisation de l’air comprimé autour du corps, ainsi que de l’ablation de sa matière. La plupart des particules sont minuscules et se détruisent haut dans l’atmosphère sans danger.",
      "Les pluies de météores se produisent lorsque la Terre traverse des courants de poussières laissés par une comète ou parfois un astéroïde. Les trajectoires semblent converger vers un radiant par effet de perspective, comme des rails parallèles semblant se rejoindre au loin.",
      "Les grands impacts sont rares mais peuvent avoir des conséquences mondiales. La surveillance recherche les objets géocroiseurs, affine leurs orbites et teste des méthodes de déviation. Le risque dépend à la fois de la probabilité de collision et de l’énergie que libérerait l’objet."
    ],
    "complete": [
      {
        "title": "1. Une terminologie utile",
        "text": "Météoroïde désigne l’objet avant son entrée. Météore désigne le phénomène lumineux. Météorite désigne ce qui survit jusqu’au sol. Une météorite peut provenir d’un astéroïde, de la Lune ou de Mars après un impact ayant éjecté des fragments."
      },
      {
        "title": "2. Les pluies annuelles",
        "text": "Les Perséides ou les Géminides reviennent lorsque l’orbite terrestre recoupe un courant de débris. La date est donc prévisible. L’intensité varie selon la densité du courant, l’activité du corps parent et les perturbations gravitationnelles."
      },
      {
        "title": "3. Lire les cratères",
        "text": "Une surface ancienne et inactive accumule les cratères ; une surface renouvelée par volcanisme, tectonique ou érosion les efface. Compter les cratères aide à comparer les âges relatifs des terrains, en calibrant la méthode avec des échantillons datés."
      },
      {
        "title": "4. Dévier plutôt que détruire",
        "text": "Modifier très légèrement la vitesse d’un astéroïde longtemps avant une rencontre peut suffire à changer sa position future. Une collision contrôlée, un tracteur gravitationnel ou d’autres méthodes sont étudiés. La clé reste la détection précoce et une orbite précisément connue."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Météore, météorite et risque d’impact », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "La lumière d’une étoile filante provient surtout de l’échauffement et de l’ionisation de l’air comprimé autour du corps, ainsi que de l’ablation de sa matière."
      },
      {
        "label": "Mécanisme",
        "text": "Les pluies de météores se produisent lorsque la Terre traverse des courants de poussières laissés par une comète ou parfois un astéroïde."
      },
      {
        "label": "Nuance",
        "text": "Les grands impacts sont rares mais peuvent avoir des conséquences mondiales."
      },
      {
        "label": "À retenir",
        "text": "Un petit corps dans l’espace est un météoroïde ; la traînée lumineuse dans l’atmosphère est un météore ; le fragment qui atteint le sol devient une météorite. Ces mots décrivent trois étapes différentes d’un même voyage possible."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Qu’est-ce qu’un météore ?",
        "a": "Le phénomène lumineux produit lors de l’entrée d’un petit corps dans l’atmosphère.",
        "choices": [
          "Le fragment posé au sol.",
          "Une planète naine.",
          "Une étoile qui explose."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Comment appelle-t-on un fragment qui atteint le sol ?",
        "a": "Une météorite.",
        "choices": [
          "Une photosphère.",
          "Un pulsar.",
          "Une nébuleuse."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Pourquoi les pluies de météores reviennent-elles à des dates proches ?",
        "a": "La Terre recroise chaque année des courants de poussières sur son orbite.",
        "choices": [
          "Les étoiles tombent selon le calendrier.",
          "La Lune libère ses roches chaque été.",
          "Le Soleil fabrique les mêmes météores chaque nuit."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi les trajectoires semblent-elles venir d’un radiant ?",
        "a": "Par un effet de perspective sur des trajectoires presque parallèles.",
        "choices": [
          "Parce que tous les débris naissent dans l’atmosphère.",
          "Parce qu’un trou noir les attire.",
          "Parce que la Terre s’arrête de tourner."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Quelle stratégie est efficace contre un objet détecté longtemps à l’avance ?",
        "a": "Modifier légèrement sa vitesse afin qu’il manque la Terre plus tard.",
        "choices": [
          "Attendre son entrée atmosphérique.",
          "Éteindre les satellites.",
          "Changer la masse de la Terre."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-exoplanet-detection": {
    "hook": "Une exoplanète est une planète en orbite autour d’une autre étoile que le Soleil. La plupart ne sont pas photographiées directement : leur présence est déduite des minuscules effets qu’elles produisent sur la lumière ou le mouvement de leur étoile.",
    "keyFacts": [
      "Une baisse périodique de luminosité quand la planète passe devant son étoile.",
      "L’orbite doit être alignée avec notre ligne de visée.",
      "Le mouvement de l’étoile révélé par le décalage Doppler de son spectre.",
      "D’estimer le rayon, la masse et donc la densité moyenne.",
      "Leurs signaux sont plus forts et leurs périodes plus courtes."
    ],
    "express": [
      "La méthode des transits mesure une faible baisse de luminosité quand une planète passe devant son étoile. La profondeur indique approximativement le rapport de taille ; la répétition donne la période orbitale. La géométrie doit être bien alignée, donc beaucoup de planètes ne transitent jamais de notre point de vue.",
      "La vitesse radiale mesure le va-et-vient de l’étoile sous l’attraction de sa planète, grâce au décalage Doppler de ses raies spectrales. Elle fournit une masse minimale. Combinée à un transit, elle permet d’estimer densité et composition globale.",
      "L’imagerie directe bloque l’éclat de l’étoile pour isoler certains mondes jeunes, massifs et éloignés de leur étoile. D’autres méthodes utilisent microlentilles ou astrométrie. Chaque technique possède des biais ; les populations observées ne reflètent pas directement toutes les planètes existantes."
    ],
    "complete": [
      {
        "title": "1. Le transit ne montre pas une silhouette détaillée",
        "text": "Le télescope enregistre une courbe de lumière. Une baisse régulière et répétée peut signaler une planète, mais les taches stellaires ou étoiles binaires peuvent imiter le phénomène. Plusieurs transits et observations complémentaires sont nécessaires."
      },
      {
        "title": "2. Une étoile n’est jamais immobile",
        "text": "Planète et étoile tournent autour de leur centre de masse commun. La planète effectue le mouvement le plus large, mais l’étoile oscille légèrement. Les spectrographes mesurent des vitesses extrêmement petites dans les cas favorables."
      },
      {
        "title": "3. Masse, rayon, densité",
        "text": "Un transit donne un rayon relatif ; la vitesse radiale donne une contrainte de masse. La densité moyenne distingue grossièrement un monde rocheux d’une planète riche en gaz, mais plusieurs structures internes peuvent produire une densité similaire."
      },
      {
        "title": "4. Des biais de détection",
        "text": "Les grosses planètes proches de leur étoile produisent des signaux plus forts et fréquents. Elles ont été découvertes en premier, non parce qu’elles seraient forcément les plus nombreuses, mais parce qu’elles sont plus faciles à repérer."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Comment détecter une planète invisible autour d’une autre étoile ? », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "La méthode des transits mesure une faible baisse de luminosité quand une planète passe devant son étoile."
      },
      {
        "label": "Mécanisme",
        "text": "La vitesse radiale mesure le va-et-vient de l’étoile sous l’attraction de sa planète, grâce au décalage Doppler de ses raies spectrales."
      },
      {
        "label": "Nuance",
        "text": "L’imagerie directe bloque l’éclat de l’étoile pour isoler certains mondes jeunes, massifs et éloignés de leur étoile."
      },
      {
        "label": "À retenir",
        "text": "Une exoplanète est une planète en orbite autour d’une autre étoile que le Soleil. La plupart ne sont pas photographiées directement : leur présence est déduite des minuscules effets qu’elles produisent sur la lumière ou le mouvement de leur étoile."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Que mesure la méthode des transits ?",
        "a": "Une baisse périodique de luminosité quand la planète passe devant son étoile.",
        "choices": [
          "Le bruit de la planète.",
          "La température de la Terre.",
          "La rotation de la galaxie entière."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi tous les systèmes ne montrent-ils pas de transit ?",
        "a": "L’orbite doit être alignée avec notre ligne de visée.",
        "choices": [
          "Seules les planètes rocheuses transitent.",
          "Les étoiles empêchent toujours les transits.",
          "Une planète doit posséder une lune."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Que mesure la vitesse radiale ?",
        "a": "Le mouvement de l’étoile révélé par le décalage Doppler de son spectre.",
        "choices": [
          "La vitesse du vent dans l’atmosphère de la planète uniquement.",
          "La distance exacte de toutes les galaxies.",
          "La couleur du télescope."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Que permet la combinaison transit et vitesse radiale ?",
        "a": "D’estimer le rayon, la masse et donc la densité moyenne.",
        "choices": [
          "De photographier automatiquement la surface.",
          "De prouver une vie intelligente.",
          "De connaître chaque élément du noyau."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi les grosses planètes proches ont-elles été découvertes tôt ?",
        "a": "Leurs signaux sont plus forts et leurs périodes plus courtes.",
        "choices": [
          "Elles sont les seules à exister.",
          "Elles produisent leur propre télescope.",
          "Elles sont toutes visibles à l’œil nu."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-habitable-zone-biosignatures": {
    "hook": "La zone habitable est la région où une planète pourrait maintenir de l’eau liquide en surface avec une atmosphère adaptée. C’est un filtre utile, pas une garantie de vie ni même d’habitabilité réelle.",
    "keyFacts": [
      "Seulement des conditions orbitales compatibles avec de l’eau liquide selon certaines hypothèses.",
      "Les forces de marée peuvent fournir une source de chaleur interne.",
      "Un indice potentiellement biologique qui doit être confronté à des explications non vivantes.",
      "Des processus non biologiques peuvent aussi en produire ou l’accumuler.",
      "La tension entre la possibilité de nombreuses civilisations et l’absence de preuve claire détectée."
    ],
    "express": [
      "La distance favorable dépend de la luminosité et du spectre de l’étoile. Une planète peut se trouver dans la zone habitable tout en possédant une atmosphère trop épaisse, trop mince ou absente. À l’inverse, un océan interne chauffé par marées peut exister bien au-delà de cette zone.",
      "Une biosignature est un signal chimique ou physique potentiellement produit par la vie. L’oxygène, le méthane ou certains déséquilibres atmosphériques sont étudiés, mais chacun peut avoir des sources non biologiques. Il faut rechercher des combinaisons cohérentes et comprendre le contexte planétaire.",
      "Le paradoxe de Fermi résume une tension : si les civilisations technologiques étaient fréquentes et anciennes, pourquoi ne voyons-nous aucune preuve claire ? Les réponses possibles vont de la rareté de la vie à la difficulté de détecter, en passant par des durées technologiques courtes. Aucun scénario n’est démontré."
    ],
    "complete": [
      {
        "title": "1. Une zone calculée, pas observée directement",
        "text": "Les limites sont estimées à partir de modèles climatiques. Nuages, rotation, continents, pression et composition atmosphérique peuvent les déplacer. Le terme doit donc être accompagné d’hypothèses, surtout pour des étoiles très différentes du Soleil."
      },
      {
        "title": "2. Les fausses biosignatures",
        "text": "La photodissociation de l’eau peut accumuler de l’oxygène sans vie ; une activité géologique peut libérer du méthane. Un seul gaz ne suffit pas. Les chercheurs cherchent un ensemble de molécules difficile à maintenir ensemble sans renouvellement."
      },
      {
        "title": "3. La vie simple avant la vie intelligente",
        "text": "Sur Terre, la vie microbienne a précédé de très loin les sociétés technologiques. Une planète habitée peut donc ne produire aucun signal radio artificiel. Rechercher de la vie et rechercher une technologie sont deux programmes différents."
      },
      {
        "title": "4. Le silence n’est pas une preuve d’absence",
        "text": "Nos recherches couvrent une infime partie des fréquences, directions et durées possibles. Les signaux s’affaiblissent avec la distance et les civilisations pourraient utiliser des techniques que nous ne reconnaissons pas. Le paradoxe stimule des hypothèses ; il ne prouve ni solitude ni présence."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Zone habitable, biosignatures et paradoxe de Fermi », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "La distance favorable dépend de la luminosité et du spectre de l’étoile."
      },
      {
        "label": "Mécanisme",
        "text": "Une biosignature est un signal chimique ou physique potentiellement produit par la vie."
      },
      {
        "label": "Nuance",
        "text": "Le paradoxe de Fermi résume une tension : si les civilisations technologiques étaient fréquentes et anciennes, pourquoi ne voyons-nous aucune preuve claire ? Les réponses possibles vont de la rareté de la vie à la difficulté de détecter, en passant par des durées technologiques courtes."
      },
      {
        "label": "À retenir",
        "text": "La zone habitable est la région où une planète pourrait maintenir de l’eau liquide en surface avec une atmosphère adaptée. C’est un filtre utile, pas une garantie de vie ni même d’habitabilité réelle."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Que garantit la zone habitable ?",
        "a": "Seulement des conditions orbitales compatibles avec de l’eau liquide selon certaines hypothèses.",
        "choices": [
          "La présence certaine d’océans et de vie.",
          "Une atmosphère identique à celle de la Terre.",
          "Une civilisation technologique."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi une lune éloignée du Soleil peut-elle garder un océan ?",
        "a": "Les forces de marée peuvent fournir une source de chaleur interne.",
        "choices": [
          "La lumière y est plus forte.",
          "La glace produit spontanément du feu.",
          "La gravitation n’y existe pas."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Qu’est-ce qu’une biosignature ?",
        "a": "Un indice potentiellement biologique qui doit être confronté à des explications non vivantes.",
        "choices": [
          "Une preuve absolue fournie par un seul gaz.",
          "Un message radio forcément artificiel.",
          "La forme circulaire d’une planète."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi l’oxygène seul ne suffit-il pas ?",
        "a": "Des processus non biologiques peuvent aussi en produire ou l’accumuler.",
        "choices": [
          "Parce que l’oxygène n’existe pas dans l’espace.",
          "Parce que toute vie détruit l’oxygène.",
          "Parce qu’il est invisible à la spectroscopie."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Que souligne le paradoxe de Fermi ?",
        "a": "La tension entre la possibilité de nombreuses civilisations et l’absence de preuve claire détectée.",
        "choices": [
          "La preuve que personne n’existe ailleurs.",
          "La certitude que toutes les civilisations communiquent.",
          "L’impossibilité de voyager dans le Système solaire."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-telescopes-spectrum": {
    "hook": "Un télescope ne sert pas seulement à grossir. Il collecte de la lumière, améliore la résolution et alimente des instruments qui séparent les longueurs d’onde. Le spectre permet alors de mesurer composition, température et mouvement sans toucher l’astre.",
    "keyFacts": [
      "Collecter davantage de lumière et améliorer la résolution potentielle.",
      "Une transition caractéristique d’un atome ou d’une molécule.",
      "La source s’éloigne le long de la ligne de visée.",
      "Pour réduire turbulence, vapeur d’eau et absorption atmosphérique.",
      "Chaque domaine révèle des températures et phénomènes physiques différents."
    ],
    "express": [
      "Un objectif ou un miroir de grand diamètre recueille davantage de photons. La résolution dépend notamment du diamètre et de la longueur d’onde. L’atmosphère brouille les images, absorbe certaines radiations et impose de choisir des sites secs, élevés ou éloignés des lumières urbaines.",
      "La spectroscopie décompose la lumière. Les atomes et molécules absorbent ou émettent à des longueurs d’onde précises, laissant des raies caractéristiques. Leur intensité et leur forme renseignent sur température, densité, pression, champ magnétique ou abondance chimique.",
      "Le décalage Doppler déplace les raies selon le mouvement radial : vers le bleu si la source se rapproche, vers le rouge si elle s’éloigne. L’astronomie moderne combine visible, radio, infrarouge, ultraviolet, rayons X et gamma, car chaque domaine révèle des phénomènes différents."
    ],
    "complete": [
      {
        "title": "1. Collecter avant de grossir",
        "text": "Un petit instrument peut grossir énormément une image sombre et floue sans créer d’information. Le diamètre détermine la quantité de lumière et limite la finesse théorique des détails. C’est pourquoi les grands observatoires privilégient des miroirs larges et souvent segmentés."
      },
      {
        "title": "2. L’atmosphère utile et gênante",
        "text": "Elle protège la vie des rayonnements énergétiques, mais rend plusieurs bandes inaccessibles depuis le sol. Les turbulences déplacent rapidement les fronts d’onde. L’optique adaptative mesure ces déformations et corrige un miroir en temps réel."
      },
      {
        "title": "3. Une empreinte chimique",
        "text": "Chaque espèce atomique possède des niveaux d’énergie quantifiés. Les transitions produisent des raies à des longueurs d’onde particulières. On peut ainsi identifier de l’hydrogène dans une étoile ou des molécules dans une atmosphère planétaire lointaine."
      },
      {
        "title": "4. Plusieurs messagers",
        "text": "Les ondes radio tracent les gaz froids et les pulsars ; l’infrarouge traverse mieux la poussière ; les rayons X révèlent des plasmas très chauds près d’objets compacts. Aucun télescope unique ne donne une vision complète du ciel."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Télescopes et spectres : lire la lumière des astres », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Un objectif ou un miroir de grand diamètre recueille davantage de photons."
      },
      {
        "label": "Mécanisme",
        "text": "La spectroscopie décompose la lumière."
      },
      {
        "label": "Nuance",
        "text": "Le décalage Doppler déplace les raies selon le mouvement radial : vers le bleu si la source se rapproche, vers le rouge si elle s’éloigne."
      },
      {
        "label": "À retenir",
        "text": "Un télescope ne sert pas seulement à grossir. Il collecte de la lumière, améliore la résolution et alimente des instruments qui séparent les longueurs d’onde. Le spectre permet alors de mesurer composition, température et mouvement sans toucher l’astre."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Quelle fonction essentielle possède un grand diamètre ?",
        "a": "Collecter davantage de lumière et améliorer la résolution potentielle.",
        "choices": [
          "Ralentir la lumière.",
          "Changer la couleur des étoiles.",
          "Supprimer la gravitation."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Que révèle une raie spectrale ?",
        "a": "Une transition caractéristique d’un atome ou d’une molécule.",
        "choices": [
          "La distance exacte sans autre information.",
          "La forme géographique de la surface.",
          "Le nombre de planètes de toute étoile."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Que signifie un décalage vers le rouge Doppler ?",
        "a": "La source s’éloigne le long de la ligne de visée.",
        "choices": [
          "La source refroidit nécessairement.",
          "La source devient une géante rouge.",
          "Le télescope est mal peint."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi placer certains observatoires en altitude ?",
        "a": "Pour réduire turbulence, vapeur d’eau et absorption atmosphérique.",
        "choices": [
          "Pour se rapprocher significativement des étoiles.",
          "Pour augmenter la gravité.",
          "Pour éviter la rotation terrestre."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi observer plusieurs longueurs d’onde ?",
        "a": "Chaque domaine révèle des températures et phénomènes physiques différents.",
        "choices": [
          "Parce que le visible ne contient aucune information.",
          "Parce que toutes les longueurs d’onde donnent exactement la même image.",
          "Parce que les étoiles changent de position selon la couleur."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-space-telescopes": {
    "hook": "L’espace ne rend pas automatiquement un télescope meilleur, mais il supprime la turbulence et l’absorption atmosphériques. Cela ouvre des domaines de longueur d’onde inaccessibles depuis le sol et permet des observations très stables.",
    "keyFacts": [
      "L’absence de turbulence atmosphérique.",
      "L’atmosphère terrestre absorbe largement ces rayonnements.",
      "Pour réduire son propre rayonnement thermique qui masquerait les signaux faibles.",
      "Une région où la géométrie gravitationnelle facilite une position stable relative au Soleil et à la Terre.",
      "Non, ils sont complémentaires et soumis à des contraintes différentes."
    ],
    "express": [
      "Un observatoire spatial peut détecter ultraviolet, rayons X ou une partie de l’infrarouge absorbés par l’atmosphère. Il évite aussi la scintillation causée par les turbulences. En contrepartie, sa masse, son miroir, son refroidissement et ses réparations sont fortement contraints.",
      "Hubble observe surtout du proche ultraviolet au proche infrarouge et a fourni des images fines grâce à sa position au-dessus de l’atmosphère. D’autres missions cartographient le ciel en rayons X, mesurent le fond cosmologique ou surveillent les transits d’exoplanètes.",
      "Un télescope infrarouge doit souvent être très froid pour ne pas émettre lui-même le rayonnement qu’il cherche. Certains sont placés près d’un point de Lagrange, où la géométrie Soleil-Terre facilite un environnement thermique stable et des communications régulières."
    ],
    "complete": [
      {
        "title": "1. Des bandes bloquées",
        "text": "L’atmosphère laisse passer principalement le visible et certaines fenêtres radio ou infrarouges. Cette protection est indispensable à la vie mais masque une grande partie du spectre. Les satellites complètent donc les observatoires au sol plutôt qu’ils ne les remplacent totalement."
      },
      {
        "title": "2. Les coûts de l’espace",
        "text": "Chaque kilogramme doit être lancé. Les vibrations, le vide, le rayonnement et les cycles thermiques imposent des essais sévères. Un défaut minuscule peut être impossible à réparer. Les instruments sont conçus avec redondances, mécanismes limités et procédures très prudentes."
      },
      {
        "title": "3. Refroidir l’infrarouge",
        "text": "Tout objet chaud émet de l’infrarouge. Le télescope et ses détecteurs doivent être protégés du Soleil, de la Terre et de leur propre chaleur. Des écrans thermiques et des refroidisseurs permettent de distinguer les photons astronomiques très faibles."
      },
      {
        "title": "4. Une flotte complémentaire",
        "text": "Les grands résultats combinent souvent plusieurs observatoires. Une source transitoire peut être suivie en lumière visible, rayons X, radio et ondes gravitationnelles. La coordination transforme un événement bref en diagnostic physique complet."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Pourquoi envoyer des télescopes dans l’espace ? », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Un observatoire spatial peut détecter ultraviolet, rayons X ou une partie de l’infrarouge absorbés par l’atmosphère."
      },
      {
        "label": "Mécanisme",
        "text": "Hubble observe surtout du proche ultraviolet au proche infrarouge et a fourni des images fines grâce à sa position au-dessus de l’atmosphère."
      },
      {
        "label": "Nuance",
        "text": "Un télescope infrarouge doit souvent être très froid pour ne pas émettre lui-même le rayonnement qu’il cherche."
      },
      {
        "label": "À retenir",
        "text": "L’espace ne rend pas automatiquement un télescope meilleur, mais il supprime la turbulence et l’absorption atmosphériques. Cela ouvre des domaines de longueur d’onde inaccessibles depuis le sol et permet des observations très stables."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Quel avantage principal offre l’espace pour l’image ?",
        "a": "L’absence de turbulence atmosphérique.",
        "choices": [
          "Une proximité importante avec les étoiles.",
          "Une gravité nulle dans tout l’Univers.",
          "Une lumière plus rapide."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi observer l’ultraviolet ou les rayons X depuis l’espace ?",
        "a": "L’atmosphère terrestre absorbe largement ces rayonnements.",
        "choices": [
          "Ils n’existent pas près du sol.",
          "Ils sont produits uniquement par les satellites.",
          "Les miroirs au sol refusent de tourner."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Pourquoi refroidir un télescope infrarouge ?",
        "a": "Pour réduire son propre rayonnement thermique qui masquerait les signaux faibles.",
        "choices": [
          "Pour empêcher les miroirs de réfléchir.",
          "Pour augmenter la vitesse de la lumière.",
          "Pour fabriquer de l’oxygène."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Qu’est-ce qu’un point de Lagrange utile aux observatoires ?",
        "a": "Une région où la géométrie gravitationnelle facilite une position stable relative au Soleil et à la Terre.",
        "choices": [
          "Une surface solide entre deux planètes.",
          "Le centre d’un trou noir.",
          "Une station sur la Lune."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Les télescopes spatiaux remplacent-ils tous les observatoires au sol ?",
        "a": "Non, ils sont complémentaires et soumis à des contraintes différentes.",
        "choices": [
          "Oui, aucun télescope au sol n’est utile.",
          "Oui, car ils sont gratuits.",
          "Non, car ils ne peuvent observer aucune lumière."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-rockets-orbits": {
    "hook": "Atteindre l’espace ne suffit pas à rester en orbite. Une fusée doit surtout donner au véhicule une vitesse horizontale assez grande pour qu’il tombe continuellement autour de la Terre sans rencontrer le sol.",
    "keyFacts": [
      "Elle expulse de la masse et reçoit une quantité de mouvement opposée.",
      "Pour abandonner les réservoirs et moteurs devenus inutiles et réduire la masse à accélérer.",
      "Une chute libre dont la vitesse horizontale fait manquer continuellement la surface.",
      "Ils sont en chute libre avec leur véhicule.",
      "Elle utilise le mouvement d’une planète pour modifier la vitesse et la direction d’une sonde."
    ],
    "express": [
      "Une fusée avance en expulsant de la masse à grande vitesse dans la direction opposée. Elle n’a pas besoin de pousser sur l’air : action et réaction fonctionnent dans le vide. Les étages sont abandonnés lorsqu’ils sont vides afin de ne plus accélérer une masse inutile.",
      "Une orbite est une chute libre courbe. La gravitation attire le satellite, tandis que sa vitesse tangentielle lui fait manquer continuellement la surface. Les astronautes semblent sans poids parce qu’ils chutent avec leur vaisseau, non parce que la gravité aurait disparu.",
      "Changer d’orbite exige une variation de vitesse. Une impulsion apparemment dirigée vers l’avant peut relever le côté opposé de l’orbite ; ralentir peut faire descendre. Les trajectoires interplanétaires utilisent des orbites autour du Soleil et parfois l’assistance gravitationnelle des planètes."
    ],
    "complete": [
      {
        "title": "1. L’équation de la fusée",
        "text": "Plus un véhicule emporte de carburant, plus il doit aussi accélérer ce carburant. La masse initiale augmente rapidement pour obtenir une grande variation de vitesse. Le choix du moteur, de la vitesse d’éjection et du nombre d’étages est donc central."
      },
      {
        "title": "2. Le vide n’empêche pas la poussée",
        "text": "Les gaz expulsés acquièrent une quantité de mouvement dans un sens ; la fusée acquiert une quantité opposée. L’air extérieur n’est pas nécessaire. Les moteurs chimiques embarquent à la fois combustible et comburant."
      },
      {
        "title": "3. L’impesanteur est une chute",
        "text": "À l’altitude d’une station orbitale, la gravité terrestre reste forte. Tous les objets accélèrent presque pareil, si bien qu’aucun sol ne les soutient. Les petites accélérations résiduelles expliquent le terme microgravité plutôt qu’absence absolue de gravité."
      },
      {
        "title": "4. Naviguer par impulsions",
        "text": "Dans l’espace, couper le moteur ne fait pas s’arrêter : le véhicule poursuit son orbite. Les manœuvres modifient énergie et direction. Une assistance gravitationnelle échange une petite quantité d’énergie avec le mouvement orbital d’une planète pour accélérer ou ralentir une sonde."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Fusées, vitesse orbitale et gravité », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Une fusée avance en expulsant de la masse à grande vitesse dans la direction opposée."
      },
      {
        "label": "Mécanisme",
        "text": "Une orbite est une chute libre courbe."
      },
      {
        "label": "Nuance",
        "text": "Changer d’orbite exige une variation de vitesse."
      },
      {
        "label": "À retenir",
        "text": "Atteindre l’espace ne suffit pas à rester en orbite. Une fusée doit surtout donner au véhicule une vitesse horizontale assez grande pour qu’il tombe continuellement autour de la Terre sans rencontrer le sol."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Comment une fusée produit-elle une poussée dans le vide ?",
        "a": "Elle expulse de la masse et reçoit une quantité de mouvement opposée.",
        "choices": [
          "Elle pousse sur l’air absent.",
          "Elle est attirée par les étoiles.",
          "Elle réduit la masse de la Terre."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi utilise-t-on plusieurs étages ?",
        "a": "Pour abandonner les réservoirs et moteurs devenus inutiles et réduire la masse à accélérer.",
        "choices": [
          "Pour ajouter des passagers à chaque altitude.",
          "Pour créer plusieurs gravités.",
          "Pour ralentir la lumière."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Qu’est-ce qu’une orbite ?",
        "a": "Une chute libre dont la vitesse horizontale fait manquer continuellement la surface.",
        "choices": [
          "Une zone sans gravité.",
          "Un cercle matériel autour de la Terre.",
          "Une trajectoire qui exige une poussée constante."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi les astronautes flottent-ils ?",
        "a": "Ils sont en chute libre avec leur véhicule.",
        "choices": [
          "La gravité terrestre s’arrête à cent kilomètres.",
          "L’air les porte.",
          "Le Soleil annule exactement toute force."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Que fait une assistance gravitationnelle ?",
        "a": "Elle utilise le mouvement d’une planète pour modifier la vitesse et la direction d’une sonde.",
        "choices": [
          "Elle éteint la gravité de la planète.",
          "Elle transforme une sonde en satellite naturel.",
          "Elle produit du carburant à partir du vide."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-moon-mars-exploration": {
    "hook": "L’exploration spatiale ne suit pas une course simple vers toujours plus loin. Chaque mission répond à un compromis entre science, technologie, coût, risque et politique. La Lune et Mars sont deux laboratoires très différents.",
    "keyFacts": [
      "Des datations et des indices sur l’origine et l’évolution de la Lune.",
      "Les communications subissent un délai qui empêche le pilotage instantané.",
      "Les anciens lacs, deltas et roches sédimentaires ayant connu de l’eau.",
      "Les laboratoires terrestres disposent d’instruments plus variés et précis.",
      "Non, leurs capacités et risques sont complémentaires."
    ],
    "express": [
      "Les premières sondes lunaires ont testé survols, impacts, orbites et alunissages avant les missions habitées. Les échantillons Apollo ont daté des terrains, révélé une origine commune après un impact géant et fourni une référence pour l’âge des surfaces par comptage des cratères.",
      "Mars est assez proche pour recevoir de nombreux robots, mais chaque voyage dure des mois et les communications ont un délai. Orbiteurs, atterrisseurs et rovers étudient climat, géologie, eau ancienne et habitabilité. Un retour d’échantillons offre des analyses terrestres beaucoup plus fines, mais exige une chaîne complexe.",
      "Une présence humaine permet décisions rapides, réparation et exploration flexible, mais demande protection contre rayonnement, poussière, faible gravité et isolement. Les robots restent moins coûteux et acceptent davantage de risques. Les stratégies sérieuses combinent donc souvent les deux plutôt que de les opposer."
    ],
    "complete": [
      {
        "title": "1. La Lune comme archive",
        "text": "Sans atmosphère dense ni tectonique active comparable à la Terre, sa surface conserve une longue histoire d’impacts. Les régions polaires, où de la glace existe dans des zones ombragées, intéressent à la fois la science et une éventuelle utilisation locale de ressources."
      },
      {
        "title": "2. Mars, planète anciennement humide",
        "text": "Les deltas, argiles et roches sédimentaires montrent des environnements où l’eau a persisté. Les rovers choisissent des sites capables de préserver des traces chimiques ou texturales. Ils ne recherchent pas seulement des organismes vivants aujourd’hui."
      },
      {
        "title": "3. Atterrir est difficile",
        "text": "Une atmosphère martienne trop mince ne freine pas assez avec un parachute seul, mais assez dense pour chauffer et déstabiliser le véhicule. Bouclier thermique, parachute, rétrofusées ou grue volante doivent s’enchaîner avec très peu de marge."
      },
      {
        "title": "4. Science et politique",
        "text": "Les programmes spatiaux dépendent de budgets pluriannuels, de coopérations et de priorités nationales. Une mission peut être scientifiquement excellente mais reportée pour des raisons industrielles ou politiques. Comprendre l’exploration exige donc autant de technique que d’organisation collective."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Explorer la Lune et Mars : robots, humains et objectifs scientifiques », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Les premières sondes lunaires ont testé survols, impacts, orbites et alunissages avant les missions habitées."
      },
      {
        "label": "Mécanisme",
        "text": "Mars est assez proche pour recevoir de nombreux robots, mais chaque voyage dure des mois et les communications ont un délai."
      },
      {
        "label": "Nuance",
        "text": "Une présence humaine permet décisions rapides, réparation et exploration flexible, mais demande protection contre rayonnement, poussière, faible gravité et isolement."
      },
      {
        "label": "À retenir",
        "text": "L’exploration spatiale ne suit pas une course simple vers toujours plus loin. Chaque mission répond à un compromis entre science, technologie, coût, risque et politique. La Lune et Mars sont deux laboratoires très différents."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Qu’ont apporté les échantillons lunaires ?",
        "a": "Des datations et des indices sur l’origine et l’évolution de la Lune.",
        "choices": [
          "La preuve d’une atmosphère dense actuelle.",
          "Un carburant illimité déjà exploité.",
          "La découverte de forêts fossiles."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi les robots martiens doivent-ils être autonomes ?",
        "a": "Les communications subissent un délai qui empêche le pilotage instantané.",
        "choices": [
          "Mars bloque toutes les ondes radio.",
          "Ils se déplacent plus vite que la lumière.",
          "La Terre ne tourne pas dans la même direction."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Quels environnements martiens intéressent la recherche de vie ancienne ?",
        "a": "Les anciens lacs, deltas et roches sédimentaires ayant connu de l’eau.",
        "choices": [
          "Uniquement les dunes les plus sèches.",
          "Les volcans actifs observés chaque jour.",
          "Les villes artificielles visibles depuis l’orbite."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi un retour d’échantillons est-il puissant ?",
        "a": "Les laboratoires terrestres disposent d’instruments plus variés et précis.",
        "choices": [
          "Les roches deviennent vivantes sur Terre.",
          "Les sondes ne peuvent mesurer aucune composition.",
          "Il évite toute règle de protection planétaire."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Robots et humains sont-ils nécessairement rivaux ?",
        "a": "Non, leurs capacités et risques sont complémentaires.",
        "choices": [
          "Oui, une mission doit toujours choisir un seul type.",
          "Oui, les robots ne produisent aucune science.",
          "Non, car les humains n’ont aucun avantage sur place."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  }
};
  const MYSTERIES = [
  {
    "id": "astro-mystery-horizon-186",
    "discipline": "astronomy",
    "difficulty": "moyen",
    "title": "La frontière qui n’est pas un mur",
    "caseTitle": "Limite cosmologique à identifier",
    "subjectType": "limite d’observation",
    "periodHint": "Univers observable",
    "lessonId": "astro-observable-universe",
    "prompt": "Je délimite la région dont les signaux ont eu le temps de parvenir jusqu’à nous. Je ne suis ni une paroi ni le bord démontré de tout ce qui existe.",
    "answer": "L’horizon cosmologique",
    "aliases": [
      "horizon cosmologique",
      "l horizon cosmologique",
      "horizon de l univers observable",
      "limite de l univers observable"
    ],
    "clues": [
      "Ma position dépend de l’observateur et de l’histoire de l’expansion.",
      "Au-delà de moi, des régions peuvent exister sans pouvoir encore nous informer.",
      "Je suis une frontière causale de l’Univers observable."
    ],
    "explanation": "L’horizon cosmologique est une limite d’information : au-delà, la lumière n’a pas pu nous atteindre.",
    "blockedGuesses": [
      "mur",
      "bord de l univers",
      "voie lactee"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-cmb-186",
    "discipline": "astronomy",
    "difficulty": "difficile",
    "title": "La lumière refroidie depuis l’enfance du cosmos",
    "caseTitle": "Rayonnement à identifier",
    "subjectType": "rayonnement cosmologique",
    "periodHint": "Univers primordial",
    "lessonId": "astro-big-bang",
    "prompt": "Je remplis presque uniformément le ciel. J’ai été libéré lorsque l’Univers est devenu transparent et l’expansion m’a déplacé vers les micro-ondes.",
    "answer": "Le fond diffus cosmologique",
    "aliases": [
      "fond diffus cosmologique",
      "le fond diffus cosmologique",
      "rayonnement fossile",
      "cmb"
    ],
    "clues": [
      "Je constitue la plus ancienne lumière directement observable.",
      "Mes minuscules variations ont annoncé les futures grandes structures.",
      "Ma température actuelle est proche de quelques kelvins."
    ],
    "explanation": "Le fond diffus cosmologique est la lumière fossile émise lorsque la matière et le rayonnement se sont découplés.",
    "blockedGuesses": [
      "big bang",
      "micro ondes",
      "lumiere"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-pulsar-186",
    "discipline": "astronomy",
    "difficulty": "moyen",
    "title": "Le phare qui tient dans une ville",
    "caseTitle": "Reste stellaire à identifier",
    "subjectType": "astre compact",
    "periodHint": "Après une supernova",
    "lessonId": "astro-stellar-deaths",
    "prompt": "Je concentre une masse comparable à celle du Soleil dans une sphère de quelques dizaines de kilomètres. Ma rotation peut envoyer vers la Terre des impulsions extrêmement régulières.",
    "answer": "Un pulsar",
    "aliases": [
      "pulsar",
      "un pulsar",
      "etoile a neutrons pulsante",
      "étoile à neutrons pulsante"
    ],
    "clues": [
      "Je suis une forme observable d’étoile à neutrons.",
      "Mes faisceaux balayent l’espace comme ceux d’un phare.",
      "Je naîs après l’effondrement du cœur de certaines étoiles massives."
    ],
    "explanation": "Un pulsar est une étoile à neutrons en rotation dont les faisceaux sont détectés périodiquement.",
    "blockedGuesses": [
      "trou noir",
      "supernova",
      "etoile a neutrons"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-aurora-186",
    "discipline": "astronomy",
    "difficulty": "facile",
    "title": "Le rideau coloré guidé par un champ invisible",
    "caseTitle": "Phénomène atmosphérique à identifier",
    "subjectType": "interaction Soleil-atmosphère",
    "periodHint": "Régions polaires",
    "lessonId": "astro-solar-activity-auroras",
    "prompt": "Je danse surtout près des pôles lorsque des particules venues du Soleil excitent l’oxygène et l’azote de la haute atmosphère.",
    "answer": "Une aurore polaire",
    "aliases": [
      "aurore polaire",
      "une aurore polaire",
      "aurore boreale",
      "aurore boréale",
      "aurore australe"
    ],
    "clues": [
      "Le champ magnétique terrestre canalise les particules.",
      "Je peux apparaître verte, rouge, bleue ou violette.",
      "Mon activité augmente souvent pendant les tempêtes géomagnétiques."
    ],
    "explanation": "Une aurore polaire est la lumière émise par des gaz atmosphériques excités par des particules énergétiques.",
    "blockedGuesses": [
      "arc en ciel",
      "vent solaire",
      "tempete solaire"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-greenhouse-venus-186",
    "discipline": "astronomy",
    "difficulty": "moyen",
    "title": "Plus chaude que la planète la plus proche",
    "caseTitle": "Planète à identifier",
    "subjectType": "planète rocheuse",
    "periodHint": "Système solaire interne",
    "lessonId": "astro-rocky-planets",
    "prompt": "Je ressemble à la Terre par ma taille, mais mon atmosphère épaisse de dioxyde de carbone entretient un effet de serre qui rend ma surface plus chaude que celle de Mercure.",
    "answer": "Vénus",
    "aliases": [
      "venus",
      "vénus",
      "la planete venus",
      "la planète vénus"
    ],
    "clues": [
      "Mes nuages contiennent de l’acide sulfurique.",
      "Ma pression au sol est immense.",
      "Je tourne très lentement et dans un sens inhabituel."
    ],
    "explanation": "Vénus est une planète rocheuse dont l’atmosphère dense produit un effet de serre extrême.",
    "blockedGuesses": [
      "mercure",
      "terre",
      "mars"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-enceladus-186",
    "discipline": "astronomy",
    "difficulty": "difficile",
    "title": "L’océan qui s’échantillonne dans l’espace",
    "caseTitle": "Lune à identifier",
    "subjectType": "satellite glacé",
    "periodHint": "Autour de Saturne",
    "lessonId": "astro-ocean-moons",
    "prompt": "Je suis petite et glacée, mais des fractures de mon pôle sud projettent des panaches contenant eau, sels et molécules issues d’un océan interne.",
    "answer": "Encelade",
    "aliases": [
      "encelade",
      "enceladus",
      "la lune encelade"
    ],
    "clues": [
      "Je tourne autour de Saturne.",
      "Une sonde a traversé mes jets.",
      "Le chauffage de marée entretient mon activité interne."
    ],
    "explanation": "Encelade est une lune de Saturne dont les panaches permettent d’étudier indirectement un océan sous-glaciaire.",
    "blockedGuesses": [
      "europe",
      "titan",
      "saturne"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-comet-tail-186",
    "discipline": "astronomy",
    "difficulty": "moyen",
    "title": "Une queue qui ne suit pas toujours la route",
    "caseTitle": "Petit corps à identifier",
    "subjectType": "corps glacé",
    "periodHint": "Passage près du Soleil",
    "lessonId": "astro-asteroids-comets",
    "prompt": "Quand je m’approche du Soleil, mes glaces se subliment. Mes queues sont poussées par le rayonnement et le vent solaire, si bien qu’elles pointent globalement à l’opposé du Soleil.",
    "answer": "Une comète",
    "aliases": [
      "comete",
      "comète",
      "une comete",
      "une comète",
      "noyau cometaire",
      "noyau cométaire"
    ],
    "clues": [
      "Mon noyau est sombre et riche en glaces.",
      "Je peux provenir de régions très lointaines du Système solaire.",
      "Ma chevelure peut devenir bien plus grande que mon noyau."
    ],
    "explanation": "Une comète devient active près du Soleil et développe une chevelure ainsi que plusieurs queues.",
    "blockedGuesses": [
      "asteroide",
      "météore",
      "meteorite"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-transit-186",
    "discipline": "astronomy",
    "difficulty": "moyen",
    "title": "La planète révélée par une minuscule baisse",
    "caseTitle": "Méthode à identifier",
    "subjectType": "méthode de détection",
    "periodHint": "Exoplanètes",
    "lessonId": "astro-exoplanet-detection",
    "prompt": "Je détecte une planète lorsque la luminosité de son étoile baisse légèrement et régulièrement au moment où elle passe devant elle depuis notre ligne de visée.",
    "answer": "La méthode des transits",
    "aliases": [
      "methode des transits",
      "méthode des transits",
      "transit",
      "les transits",
      "photometrie de transit",
      "photométrie de transit"
    ],
    "clues": [
      "La profondeur de la baisse renseigne sur le rayon relatif.",
      "La répétition fournit la période orbitale.",
      "Je ne fonctionne que si la géométrie du système est favorable."
    ],
    "explanation": "La méthode des transits repère les baisses périodiques de lumière produites par le passage d’une planète devant son étoile.",
    "blockedGuesses": [
      "vitesse radiale",
      "eclipse",
      "imagerie directe"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-spectrum-186",
    "discipline": "astronomy",
    "difficulty": "difficile",
    "title": "L’empreinte chimique cachée dans la lumière",
    "caseTitle": "Technique à identifier",
    "subjectType": "méthode d’analyse",
    "periodHint": "Observation astronomique",
    "lessonId": "astro-telescopes-spectrum",
    "prompt": "Je sépare la lumière selon sa longueur d’onde. Mes raies révèlent les atomes, la température et parfois le mouvement d’un objet que personne ne peut toucher.",
    "answer": "La spectroscopie",
    "aliases": [
      "spectroscopie",
      "la spectroscopie",
      "analyse spectrale",
      "spectre"
    ],
    "clues": [
      "Chaque élément laisse des raies caractéristiques.",
      "Un décalage de mes raies peut mesurer une vitesse radiale.",
      "Je transforme la lumière en diagnostic physique."
    ],
    "explanation": "La spectroscopie décompose la lumière et permet d’identifier composition et conditions physiques.",
    "blockedGuesses": [
      "telescope",
      "doppler",
      "prisme"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-orbit-186",
    "discipline": "astronomy",
    "difficulty": "facile",
    "title": "Tomber sans jamais toucher le sol",
    "caseTitle": "Trajectoire à identifier",
    "subjectType": "mouvement spatial",
    "periodHint": "Autour d’un astre",
    "lessonId": "astro-rockets-orbits",
    "prompt": "Je suis une chute libre courbe : la gravitation m’attire, mais ma vitesse horizontale me fait manquer continuellement la surface.",
    "answer": "Une orbite",
    "aliases": [
      "orbite",
      "une orbite",
      "mise en orbite",
      "trajectoire orbitale"
    ],
    "clues": [
      "La gravité ne disparaît pas sur ma trajectoire.",
      "Les astronautes y flottent parce qu’ils chutent avec leur véhicule.",
      "Une variation de vitesse peut me relever ou m’abaisser."
    ],
    "explanation": "Une orbite est une trajectoire de chute libre autour d’un corps sous l’effet de la gravitation.",
    "blockedGuesses": [
      "apesanteur",
      "gravite zero",
      "satellite"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  }
];

  if (!DISCIPLINES.some(item => item.id === DISCIPLINE.id)) DISCIPLINES.push(DISCIPLINE);
  DISCIPLINE_OUTLINES.astronomy = { groups: GROUPS, worlds: WORLDS };
  PLANNED_DISCIPLINE_GROUPS.astronomy = GROUPS;
  PLANNED_DISCIPLINE_WORLDS.astronomy = WORLDS;
  DISCIPLINE_MODE_COPY.astronomy = {
    label: "Mode Astronomie",
    shortLabel: "Astronomie",
    noun: "astronomique",
    headline: "Explore l’Univers, des planètes proches aux structures cosmiques.",
    promise: "Échelles, étoiles, Système solaire, exoplanètes et exploration avancent dans un parcours cohérent.",
    discoveryTitle: "Cours d’astronomie à découvrir",
    discoveryIntro: "Un parcours autonome pour comprendre avant de mémoriser : mécanismes, observations et grands repères."
  };

  Object.entries(LESSONS).forEach(([worldId, items]) => {
    if (!Array.isArray(data.lessons[worldId])) data.lessons[worldId] = [];
    const known = new Set(data.lessons[worldId].map(item => item?.id));
    items.forEach(item => { if (!known.has(item.id)) data.lessons[worldId].push(item); });
  });
  Object.keys(PACKS).forEach(id => PUBLISHED_LESSON_IDS.add(id));
  Object.assign(READY_LESSON_PACKS, PACKS);
  lessonIndexCache = null;

  if (!Array.isArray(data.mysteries)) data.mysteries = [];
  const knownMysteries = new Set(data.mysteries.map(item => item?.id));
  MYSTERIES.forEach(item => { if (!knownMysteries.has(item.id)) data.mysteries.push(item); });

  const audit = {
    version: VERSION,
    discipline: DISCIPLINE.id,
    groups: GROUPS.length,
    worlds: WORLDS.length,
    lessons: Object.keys(PACKS).length,
    mysteries: MYSTERIES.length,
    quality: Object.fromEntries(Object.entries(PACKS).map(([id, pack]) => [id, rawPublishedQuality(pack)]))
  };
  audit.ok = audit.lessons === 20 && audit.mysteries === 10 && Object.values(audit.quality).every(item => item.pass);
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, astronomy: audit }; } catch {}
  if (!audit.ok) try { console.warn("HistoDaily beta186 astronomy audit", audit); } catch {}
  try {
    if (typeof renderSoon === "function") renderSoon();
    else if (typeof render === "function") render({ immediate: true });
  } catch (error) { try { console.warn("HistoDaily beta186 astronomy refresh", error); } catch {} }
})();
