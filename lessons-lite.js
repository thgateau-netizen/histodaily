const HISTODAILY_CONTENT_VERSION = "1.0.0-beta.106-public-core";
const HISTO_WORLD_GROUPS = [
  {
    "id": "origins",
    "title": "1. Origines et premiers villages",
    "range": "-3 000 000 → -1200",
    "description": "Des premières traces humaines aux villages, aux métaux et aux sociétés sans écriture."
  },
  {
    "id": "first-civs",
    "title": "2. Premières civilisations",
    "range": "-3500 → -700",
    "description": "Fleuves, villes, écritures, royaumes du Bronze et premiers grands États."
  },
  {
    "id": "antiquity",
    "title": "3. Antiquité et empires",
    "range": "-1200 → 500",
    "description": "Méditerranée, Perse, Grèce, Rome, Inde, Chine, Afrique du Nord et mondes connectés."
  },
  {
    "id": "late-medieval",
    "title": "4. Antiquité tardive et Moyen Âge mondial",
    "range": "250 → 1500",
    "description": "Byzance, Islam, royaumes médiévaux, Vikings, empires mongols et circulations afro-eurasiennes."
  },
  {
    "id": "revolutions-19c",
    "title": "6. Révolutions, nations et XIXe siècle",
    "range": "1763 → 1914",
    "description": "Révolutions atlantiques, industrie, question sociale, nationalismes et impérialismes."
  },
  {
    "id": "20c",
    "title": "7. XXe siècle",
    "range": "1914 → 1991",
    "description": "Guerres mondiales, totalitarismes, décolonisations, guerre froide et sociétés de masse."
  }
];
const HISTO_WORLDS = [
  {
    "id": "prehistory",
    "title": "Préhistoire",
    "emoji": "🪨",
    "subtitle": "Avant l’écriture",
    "timeframe": "-3 000 000 → -3 300",
    "accent": "#84cc16",
    "theme": "forest",
    "unlockedByDefault": true,
    "group": "origins",
    "sortStart": -3000000,
    "sortEnd": -3300
  },
  {
    "id": "civilizations",
    "title": "Premières civilisations",
    "emoji": "🏺",
    "subtitle": "Villes, États et écriture",
    "timeframe": "-3 500 → -1 200",
    "accent": "#f59e0b",
    "theme": "desert",
    "unlockedByDefault": false,
    "group": "first-civs",
    "sortStart": -3500,
    "sortEnd": -1200
  },
  {
    "id": "egypt",
    "title": "Égypte",
    "emoji": "🐫",
    "subtitle": "Nil, pharaons et pyramides",
    "timeframe": "-3 100 → -30",
    "accent": "#facc15",
    "theme": "sand",
    "unlockedByDefault": false,
    "group": "first-civs",
    "sortStart": -3100,
    "sortEnd": -30
  },
  {
    "id": "aegean-mediterranean",
    "title": "Égée et Méditerranée archaïque",
    "emoji": "🌊",
    "subtitle": "Crétois, Mycéniens, ports et peuples de la mer",
    "timeframe": "-2000 → -700",
    "accent": "#0891b2",
    "theme": "river",
    "unlockedByDefault": false,
    "group": "first-civs",
    "sortStart": -2000,
    "sortEnd": -700
  },
  {
    "id": "greece",
    "title": "Grèce",
    "emoji": "🏛️",
    "subtitle": "Cités, mythes et démocratie",
    "timeframe": "-800 → -146",
    "accent": "#60a5fa",
    "theme": "marble",
    "unlockedByDefault": false,
    "group": "antiquity",
    "sortStart": -800,
    "sortEnd": -146
  },
  {
    "id": "rome",
    "title": "Rome",
    "emoji": "🦅",
    "subtitle": "République, empire et légions",
    "timeframe": "-753 → 476",
    "accent": "#ef4444",
    "theme": "roman",
    "unlockedByDefault": false,
    "group": "antiquity",
    "sortStart": -753,
    "sortEnd": 476
  },
  {
    "id": "northern-viking-worlds",
    "title": "Europe du Nord et Vikings",
    "emoji": "🛡️",
    "subtitle": "Scandinavie, raids, commerce, colonisation et christianisation",
    "timeframe": "700 → 1100",
    "accent": "#0e7490",
    "theme": "river",
    "unlockedByDefault": false,
    "group": "late-medieval",
    "sortStart": 700,
    "sortEnd": 1100
  },
  {
    "id": "atlantic-revolutions",
    "title": "Révolutions atlantiques",
    "emoji": "🌊",
    "subtitle": "Amérique, France, Haïti et droits politiques",
    "timeframe": "1763 → 1848",
    "accent": "#0ea5e9",
    "theme": "river",
    "unlockedByDefault": false,
    "group": "revolutions-19c",
    "sortStart": 1763,
    "sortEnd": 1848
  },
  {
    "id": "revolutions",
    "title": "Révolutions et Empire",
    "emoji": "🇫🇷",
    "subtitle": "Droits, République et Napoléon",
    "timeframe": "1789 → 1815",
    "accent": "#3b82f6",
    "theme": "roman",
    "unlockedByDefault": false,
    "group": "revolutions-19c",
    "sortStart": 1789,
    "sortEnd": 1815
  },
  {
    "id": "world-wars",
    "title": "Guerres mondiales",
    "emoji": "🕊️",
    "subtitle": "Violence de masse, totalitarismes et libérations",
    "timeframe": "1914 → 1945",
    "accent": "#475569",
    "theme": "castle",
    "unlockedByDefault": false,
    "group": "20c",
    "sortStart": 1914,
    "sortEnd": 1945
  },
  {
    "id": "second-world-war-detail",
    "title": "Seconde Guerre mondiale détaillée",
    "emoji": "🕯️",
    "subtitle": "Guerre totale, génocides, résistances et recomposition du monde",
    "timeframe": "1939 → 1945",
    "accent": "#475569",
    "theme": "iron",
    "unlockedByDefault": false,
    "group": "20c",
    "sortStart": 1939,
    "sortEnd": 1945
  }
];
const HISTO_LESSONS = {
  "prehistory": [
    {
      "id": "prehistory-hominids",
      "order": 2,
      "title": "Les premiers hominidés",
      "shortTitle": "Hominidés",
      "emoji": "🐒",
      "period": "Il y a plusieurs millions d’années",
      "location": "Afrique",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "bipedalism"
      ],
      "blocks": []
    },
    {
      "id": "prehistory-habilis",
      "order": 3,
      "title": "Homo habilis et les premiers outils",
      "shortTitle": "Habilis",
      "emoji": "🛠️",
      "period": "Environ -2,4 à -1,4 million d’années",
      "location": "Afrique de l’Est",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "homo-habilis"
      ],
      "blocks": []
    },
    {
      "id": "prehistory-fire",
      "order": 5,
      "title": "La maîtrise du feu",
      "shortTitle": "Feu",
      "emoji": "🔥",
      "period": "Progressivement avant -400 000 ans",
      "location": "Afrique, Europe, Asie",
      "xp": 50,
      "gems": 2,
      "unlocks": [
        "fire"
      ],
      "blocks": []
    },
    {
      "id": "prehistory-hunt",
      "order": 6,
      "title": "Chasser, cueillir et survivre",
      "shortTitle": "Survivre",
      "emoji": "🦣",
      "period": "Paléolithique",
      "location": "Afrique, Europe, Asie",
      "xp": 50,
      "gems": 2,
      "unlocks": [
        "mammoth"
      ],
      "blocks": []
    },
    {
      "id": "prehistory-agriculture",
      "order": 9,
      "title": "L’agriculture",
      "shortTitle": "Agriculture",
      "emoji": "🌾",
      "period": "Néolithique",
      "location": "Plusieurs foyers dans le monde",
      "xp": 50,
      "gems": 2,
      "unlocks": [
        "agriculture"
      ],
      "blocks": []
    },
    {
      "id": "prehistory-sapiens",
      "order": 11,
      "title": "Homo sapiens",
      "shortTitle": "Sapiens",
      "emoji": "🧑‍🤝‍🧑",
      "period": "Depuis environ -300 000 ans",
      "location": "Afrique puis monde",
      "xp": 50,
      "gems": 2,
      "unlocks": [
        "homo-sapiens"
      ],
      "blocks": []
    }
  ],
  "civilizations": [
    {
      "id": "civilizations-fertile-crescent",
      "order": 1,
      "title": "Le Croissant fertile",
      "shortTitle": "Croissant",
      "emoji": "🌙",
      "period": "Néolithique final et Antiquité ancienne",
      "location": "Proche-Orient",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "fertile-crescent",
        "sumer"
      ],
      "blocks": []
    }
  ],
  "aegean-mediterranean": [
    {
      "id": "aegean-mediterranean-minoens-crete",
      "order": 1,
      "title": "Les palais minoens de Crète",
      "shortTitle": "Les palais minoens de Crète",
      "emoji": "🐂",
      "period": "vers -2000 → -1450",
      "location": "Crète",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "aegean-mediterranean-minoens-crete-card"
      ],
      "blocks": []
    },
    {
      "id": "aegean-mediterranean-myceniens-palais",
      "order": 2,
      "title": "Les Mycéniens, guerriers et scribes",
      "shortTitle": "Les Mycéniens, guerriers et scribe",
      "emoji": "⚔️",
      "period": "vers -1600 → -1200",
      "location": "Grèce continentale",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "aegean-mediterranean-myceniens-palais-card"
      ],
      "blocks": []
    },
    {
      "id": "aegean-mediterranean-effondrement-egeen",
      "order": 3,
      "title": "La crise autour de -1200 en Égée",
      "shortTitle": "La crise autour de -1200 en Égée",
      "emoji": "🔥",
      "period": "vers -1250 → -1100",
      "location": "Égée et Méditerranée orientale",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "aegean-mediterranean-effondrement-egeen-card"
      ],
      "blocks": []
    }
  ],
  "egypt": [
    {
      "id": "egypt-nile",
      "order": 1,
      "title": "Le Nil, colonne vertébrale",
      "shortTitle": "Nil",
      "emoji": "🌊",
      "period": "Égypte ancienne",
      "location": "Vallée du Nil",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "nile"
      ],
      "blocks": []
    },
    {
      "id": "egypt-two-lands",
      "order": 2,
      "title": "Les Deux Terres",
      "shortTitle": "Deux Terres",
      "emoji": "👑",
      "period": "Vers -3100 et après",
      "location": "Haute et Basse-Égypte",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "two-lands"
      ],
      "blocks": []
    },
    {
      "id": "egypt-pharaoh-maat",
      "order": 3,
      "title": "Pharaon et Maât",
      "shortTitle": "Pharaon",
      "emoji": "⚖️",
      "period": "Égypte pharaonique",
      "location": "Tout le royaume",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "pharaoh",
        "maat"
      ],
      "blocks": []
    },
    {
      "id": "egypt-pyramids",
      "order": 5,
      "title": "Pyramides et pouvoir",
      "shortTitle": "Pyramides",
      "emoji": "🔺",
      "period": "Ancien Empire",
      "location": "Gizeh et autres sites",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "pyramids"
      ],
      "blocks": []
    },
    {
      "id": "egypt-ramses",
      "order": 10,
      "title": "Ramsès II et Qadesh",
      "shortTitle": "Ramsès II",
      "emoji": "🛡️",
      "period": "Nouvel Empire",
      "location": "Égypte et Levant",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "ramses-ii"
      ],
      "blocks": []
    },
    {
      "id": "egypt-connected",
      "order": 11,
      "title": "Une Égypte connectée",
      "shortTitle": "Contacts",
      "emoji": "🏜️",
      "period": "Du Nouvel Empire à l’époque tardive",
      "location": "Nubie, Levant, Méditerranée",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "nubia"
      ],
      "blocks": []
    }
  ],
  "greece": [
    {
      "id": "greece-athens-democracy",
      "order": 5,
      "title": "Athènes et la démocratie",
      "shortTitle": "Athènes",
      "emoji": "🗳️",
      "period": "Ve siècle av. J.-C.",
      "location": "Attique",
      "xp": 50,
      "gems": 2,
      "unlocks": [
        "athenian-democracy"
      ],
      "blocks": []
    },
    {
      "id": "greece-persian-wars",
      "order": 6,
      "title": "Les guerres médiques",
      "shortTitle": "Perses",
      "emoji": "🌊",
      "period": "Début du Ve siècle av. J.-C.",
      "location": "Mer Égée, Attique, détroits",
      "xp": 50,
      "gems": 2,
      "unlocks": [
        "persian-wars"
      ],
      "blocks": []
    },
    {
      "id": "greece-peloponnesian-war",
      "order": 8,
      "title": "Athènes contre Sparte",
      "shortTitle": "Guerre",
      "emoji": "⚔️",
      "period": "-431 → -404",
      "location": "Monde égéen",
      "xp": 50,
      "gems": 2,
      "unlocks": [
        "peloponnesian-war"
      ],
      "blocks": []
    }
  ],
  "rome": [
    {
      "id": "rome-foundation-kings",
      "order": 1,
      "title": "Des villages à Rome",
      "shortTitle": "Origines",
      "emoji": "🐺",
      "period": "VIIIe–VIe siècles av. J.-C.",
      "location": "Latium, Italie centrale",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "roman-foundation"
      ],
      "blocks": []
    },
    {
      "id": "rome-italy-expansion",
      "order": 4,
      "title": "Rome conquiert l’Italie",
      "shortTitle": "Italie",
      "emoji": "🛡️",
      "period": "IVe–IIIe siècles av. J.-C.",
      "location": "Péninsule italienne",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "roman-legion"
      ],
      "blocks": []
    },
    {
      "id": "rome-punic-wars",
      "order": 5,
      "title": "Les guerres puniques",
      "shortTitle": "Carthage",
      "emoji": "🐘",
      "period": "-264 → -146",
      "location": "Méditerranée occidentale",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "carthage",
        "hannibal"
      ],
      "blocks": []
    },
    {
      "id": "rome-republic-crisis",
      "order": 6,
      "title": "La République en crise",
      "shortTitle": "Crise",
      "emoji": "🌾",
      "period": "IIe–Ier siècles av. J.-C.",
      "location": "Rome et provinces",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "gracchi"
      ],
      "blocks": []
    },
    {
      "id": "rome-augustus-principate",
      "order": 8,
      "title": "Auguste invente l’Empire",
      "shortTitle": "Auguste",
      "emoji": "👑",
      "period": "-27 → 14",
      "location": "Empire romain",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "augustus",
        "pax-romana"
      ],
      "blocks": []
    },
    {
      "id": "rome-christianity-late-empire",
      "order": 11,
      "title": "Christianisme et Empire tardif",
      "shortTitle": "Empire tardif",
      "emoji": "✝️",
      "period": "IIIe–Ve siècles",
      "location": "Empire romain",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "constantine",
        "western-fall"
      ],
      "blocks": []
    }
  ],
  "northern-viking-worlds": [
    {
      "id": "northern-viking-worlds-scandinavie",
      "order": 1,
      "title": "La Scandinavie avant les raids",
      "shortTitle": "La Scandinavie avant les rai",
      "emoji": "🌲",
      "period": "700 → 800",
      "location": "Scandinavie",
      "xp": 50,
      "gems": 2,
      "unlocks": [
        "northern-viking-worlds-scandinavie-card"
      ],
      "blocks": []
    },
    {
      "id": "northern-viking-worlds-raids-vikings",
      "order": 2,
      "title": "Les raids vikings",
      "shortTitle": "Les raids vikings",
      "emoji": "⚔️",
      "period": "793 → 900",
      "location": "Îles Britanniques et Europe occidentale",
      "xp": 50,
      "gems": 2,
      "unlocks": [
        "northern-viking-worlds-raids-vikings-card"
      ],
      "blocks": []
    },
    {
      "id": "northern-viking-worlds-navires-vikings",
      "order": 3,
      "title": "Les navires longs",
      "shortTitle": "Les navires longs",
      "emoji": "🚢",
      "period": "VIIIe → XIe siècle",
      "location": "Mers du Nord et Atlantique",
      "xp": 50,
      "gems": 2,
      "unlocks": [
        "northern-viking-worlds-navires-vikings-card"
      ],
      "blocks": []
    },
    {
      "id": "northern-viking-worlds-colonisation-atlantique",
      "order": 4,
      "title": "Coloniser l’Atlantique Nord",
      "shortTitle": "Coloniser l’Atlantique Nord",
      "emoji": "🧭",
      "period": "870 → 1050",
      "location": "Atlantique Nord",
      "xp": 50,
      "gems": 2,
      "unlocks": [
        "northern-viking-worlds-colonisation-atlantique-card"
      ],
      "blocks": []
    },
    {
      "id": "northern-viking-worlds-viking-commerce",
      "order": 5,
      "title": "Marchands, esclaves et argent",
      "shortTitle": "Marchands, esclaves et argen",
      "emoji": "⚖️",
      "period": "800 → 1050",
      "location": "Baltique, Russie, Byzance",
      "xp": 50,
      "gems": 2,
      "unlocks": [
        "northern-viking-worlds-viking-commerce-card"
      ],
      "blocks": []
    },
    {
      "id": "northern-viking-worlds-christianisation-nord",
      "order": 6,
      "title": "La christianisation du Nord",
      "shortTitle": "La christianisation du Nord",
      "emoji": "✝️",
      "period": "950 → 1100",
      "location": "Danemark, Norvège, Suède",
      "xp": 50,
      "gems": 2,
      "unlocks": [
        "northern-viking-worlds-christianisation-nord-card"
      ],
      "blocks": []
    },
    {
      "id": "northern-viking-worlds-vie-quotidienne",
      "order": 7,
      "title": "Vivre dans le monde viking",
      "shortTitle": "Vie quotidienne viking",
      "emoji": "🏠",
      "period": "VIIIe → XIe siècle",
      "location": "Scandinavie, îles et colonies nordiques",
      "xp": 55,
      "gems": 2,
      "unlocks": [],
      "blocks": []
    },
    {
      "id": "northern-viking-worlds-societe-droit-femmes",
      "order": 8,
      "title": "Société, femmes et assemblées",
      "shortTitle": "Société viking",
      "emoji": "⚖️",
      "period": "VIIIe → XIe siècle",
      "location": "Scandinavie et communautés nordiques",
      "xp": 55,
      "gems": 2,
      "unlocks": [],
      "blocks": []
    },
    {
      "id": "northern-viking-worlds-croyances-sagas-runes",
      "order": 9,
      "title": "Dieux, runes et sagas",
      "shortTitle": "Croyances nordiques",
      "emoji": "🌳",
      "period": "VIIIe → XIIIe siècle",
      "location": "Mondes nordiques, puis Islande médiévale",
      "xp": 55,
      "gems": 2,
      "unlocks": [],
      "blocks": []
    }
  ],
  "atlantic-revolutions": [
    {
      "id": "atlantic-revolutions-revolution-francaise-1789",
      "title": "1789 : la souveraineté change de camp",
      "shortTitle": "1789 : la souveraineté chang",
      "emoji": "🇫🇷",
      "unlocks": [],
      "blocks": []
    }
  ],
  "revolutions": [
    {
      "id": "1789-crisis",
      "order": "1",
      "title": "1789 : crise de l’Ancien Régime",
      "shortTitle": "Crise de 1789",
      "emoji": "🌾",
      "period": "1788-1789",
      "location": "France",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "old-regime-crisis"
      ],
      "blocks": []
    },
    {
      "id": "rights-new-france",
      "order": "2",
      "title": "Déclaration des droits et nouvelle France",
      "shortTitle": "Droits",
      "emoji": "📜",
      "period": "1789-1791",
      "location": "France",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "rights-of-man"
      ],
      "blocks": []
    },
    {
      "id": "republic-terror-war",
      "order": "3",
      "title": "République, Terreur et guerre",
      "shortTitle": "Terreur",
      "emoji": "⚖️",
      "period": "1792-1794",
      "location": "France et Europe",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "the-terror"
      ],
      "blocks": []
    },
    {
      "id": "napoleon-empire",
      "order": "4",
      "title": "Napoléon et l’Empire",
      "shortTitle": "Napoléon",
      "emoji": "🐝",
      "period": "1799-1815",
      "location": "France et Europe",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "napoleonic-empire"
      ],
      "blocks": []
    },
    {
      "id": "europe-after-napoleon",
      "order": "5",
      "title": "Europe bouleversée",
      "shortTitle": "Vienne",
      "emoji": "🕊️",
      "period": "1815",
      "location": "Europe",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "congress-vienna"
      ],
      "blocks": []
    }
  ],
  "world-wars": [
    {
      "id": "russian-revolution-postwar",
      "order": "3",
      "title": "Révolution russe et après-guerre",
      "shortTitle": "Russie 1917",
      "emoji": "☭",
      "period": "1917-1920s",
      "location": "Russie et Europe",
      "xp": 45,
      "gems": 2,
      "unlocks": [
        "russian-revolution"
      ],
      "blocks": []
    }
  ],
  "second-world-war-detail": [
    {
      "id": "second-world-war-detail-resistances-collaborations",
      "title": "Résistances et collaborations",
      "shortTitle": "Résistances et collaborations",
      "emoji": "✊",
      "unlocks": [],
      "blocks": []
    }
  ]
};
const HISTO_DAILY_MYSTERIES = [
  {
    "id": "mystery-fire",
    "difficulty": "difficile",
    "title": "La nuit devient habitable",
    "subjectType": "transformation technique",
    "periodHint": "Préhistoire",
    "prompt": "On cherche une transformation technique. Elle ne se voit pas par un seul objet spectaculaire, mais par des traces répétées qui changent la nuit, l’alimentation et la protection des groupes humains.",
    "answer": "La maîtrise du feu",
    "aliases": [
      "maitrise du feu",
      "maîtrise du feu",
      "maitriser le feu",
      "maîtriser le feu"
    ],
    "lessonId": "prehistory-fire",
    "clues": [
      "Le cadre est celui d’occupations préhistoriques anciennes, connues par des traces matérielles plutôt que par des textes.",
      "Les archéologues observent foyers, charbons, os noircis et sols rubéfiés.",
      "Cette maîtrise rend possibles chaleur, lumière, cuisson et veillées prolongées."
    ],
    "explanation": "La maîtrise du feu n’est pas un gadget technique : elle transforme l’alimentation, les veillées, la protection, la mobilité et les formes de sociabilité.",
    "caseTitle": "Transformation technique à identifier",
    "blockedGuesses": [
      "feu"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  },
  {
    "id": "mystery-pyramids",
    "difficulty": "difficile",
    "title": "Une tombe, un État, un horizon",
    "subjectType": "ensemble monumental",
    "periodHint": "Égypte ancienne",
    "prompt": "On cherche un ensemble monumental. Il paraît d’abord religieux et funéraire, mais son véritable intérêt est de révéler une administration capable d’organiser hommes, matériaux et croyances à grande échelle.",
    "answer": "Les pyramides d’Égypte",
    "aliases": [
      "pyramide",
      "pyramides",
      "pyramides d egypte",
      "pyramides d’égypte",
      "pyramides egyptiennes",
      "pyramides égyptiennes"
    ],
    "lessonId": "egypt-pyramids",
    "clues": [
      "Le cadre est celui de l’Ancien Empire, avec une monarchie très centralisée autour du roi.",
      "Les chantiers mobilisent carrières, transport, équipes spécialisées, scribes et calendrier des crues.",
      "L’ensemble est lié au pharaon, à l’au-delà et à des horizons de pierre comme Gizeh."
    ],
    "explanation": "Les pyramides d’Égypte sont des tombes royales, mais elles prouvent aussi la puissance administrative, religieuse et économique du royaume.",
    "caseTitle": "Ensemble monumental à identifier",
    "blockedGuesses": [
      "egypte",
      "égypte",
      "pharaon",
      "pharaons",
      "tombe",
      "tombeau"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  },
  {
    "id": "mystery-athens",
    "difficulty": "difficile",
    "title": "Voter, mais pas pour tous",
    "subjectType": "régime politique",
    "periodHint": "Grèce classique",
    "prompt": "On cherche un régime politique. Il donne un rôle réel à une partie des habitants, mais il repose aussi sur une frontière très dure entre ceux qui participent et ceux qui restent exclus.",
    "answer": "La démocratie athénienne",
    "aliases": [
      "democratie athenienne",
      "démocratie athénienne",
      "democratie d athenes",
      "démocratie d’athènes"
    ],
    "lessonId": "greece-athens-democracy",
    "clues": [
      "Le cadre est une cité grecque du Ve siècle av. J.-C., dans un monde de citoyens-soldats.",
      "Les citoyens débattent, votent, jugent et peuvent être tirés au sort pour certaines fonctions.",
      "Femmes, esclaves et métèques restent hors du corps civique."
    ],
    "explanation": "La démocratie athénienne est fondatrice, mais elle reste directe, masculine, civique et fortement excluante.",
    "caseTitle": "Régime politique à identifier",
    "blockedGuesses": [
      "démocratie",
      "democratie",
      "athenes",
      "athènes",
      "cité",
      "cite"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  },
  {
    "id": "mystery-vikings",
    "difficulty": "expert",
    "title": "La violence n’explique pas tout",
    "subjectType": "peuple ou groupe historique",
    "periodHint": "Moyen Âge nord-européen",
    "prompt": "On cherche un groupe historique. Les sources de leurs adversaires insistent sur la peur, mais les traces matérielles racontent aussi des mobilités, des échanges, des installations et des services militaires.",
    "answer": "Les Vikings",
    "aliases": [
      "vikings",
      "viking",
      "nordiques",
      "scandinaves"
    ],
    "lessonId": "northern-viking-worlds-raids-vikings",
    "clues": [
      "Le cadre est l’Europe du Nord, entre la fin du VIIIe et le XIe siècle.",
      "Leur force vient autant des routes maritimes et fluviales que de la violence des raids.",
      "Ils relient îles Britanniques, Atlantique Nord, monde franc, Rus’ et Méditerranée."
    ],
    "explanation": "Les Vikings ne sont pas seulement des pillards : ce sont des acteurs scandinaves de mobilité, de commerce, de guerre, de colonisation et de recomposition politique.",
    "caseTitle": "Groupe historique à identifier",
    "blockedGuesses": [
      "empire",
      "royaume",
      "ville",
      "civilisation",
      "peuple",
      "guerre",
      "commerce",
      "religion",
      "europe",
      "asie",
      "afrique",
      "rome",
      "égypte",
      "egypte",
      "chine",
      "moyen âge",
      "antiquité",
      "révolution",
      "roi",
      "technologie"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  },
  {
    "id": "mystery-napoleon",
    "difficulty": "difficile",
    "title": "L’ordre né d’une rupture",
    "subjectType": "personnage historique",
    "periodHint": "Révolution et Empire",
    "prompt": "On cherche un personnage. Il sort d’une période de rupture, promet l’ordre, concentre le pouvoir et transforme durablement l’État tout en entraînant l’Europe dans une séquence de guerres.",
    "answer": "Napoléon",
    "aliases": [
      "napoleon",
      "napoléon",
      "bonaparte",
      "napoleon bonaparte",
      "napoléon bonaparte"
    ],
    "lessonId": "napoleon-empire",
    "clues": [
      "Le cadre est la France, de la fin du Directoire à la chute de l’Empire.",
      "Il passe du rôle de général victorieux à celui de chef d’État, puis d’empereur.",
      "Code civil, préfets, centralisation, légende et campagnes militaires lui sont associés."
    ],
    "explanation": "Napoléon stabilise une partie de la Révolution tout en construisant un pouvoir autoritaire et conquérant.",
    "caseTitle": "Personnage à identifier",
    "blockedGuesses": [
      "empire",
      "royaume",
      "ville",
      "civilisation",
      "peuple",
      "guerre",
      "commerce",
      "religion",
      "europe",
      "asie",
      "afrique",
      "rome",
      "égypte",
      "egypte",
      "chine",
      "moyen âge",
      "antiquité",
      "révolution",
      "roi",
      "technologie"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  },
  {
    "id": "mystery-hominids",
    "difficulty": "difficile",
    "title": "Le buisson avant la lignée",
    "subjectType": "groupe humain ancien",
    "periodHint": "Préhistoire très ancienne",
    "prompt": "On cherche un groupe très ancien. Le sujet oblige à abandonner l’idée d’une marche droite vers nous : plusieurs branches apparaissent, coexistent, disparaissent ou se croisent.",
    "answer": "Les premiers hominidés",
    "aliases": [
      "hominides",
      "hominidés",
      "premiers hominides",
      "premiers hominidés"
    ],
    "lessonId": "prehistory-hominids",
    "clues": [
      "Le cadre couvre plusieurs millions d’années, surtout en Afrique au départ.",
      "Les fossiles, la bipédie, les outils et parfois l’ADN ancien servent à reconstruire ce buisson.",
      "Il ne s’agit pas seulement de Homo sapiens, mais de lignées humaines antérieures ou voisines."
    ],
    "explanation": "Les premiers hominidés rappellent que l’évolution humaine est un buisson, pas une ligne droite.",
    "caseTitle": "Groupe humain ancien à identifier",
    "blockedGuesses": [
      "sapiens",
      "homo sapiens",
      "évolution",
      "evolution"
    ],
    "upgradedB19": true,
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  },
  {
    "id": "mystery-first-tools",
    "difficulty": "difficile",
    "title": "La main délègue au caillou",
    "subjectType": "innovation technique",
    "periodHint": "Préhistoire",
    "prompt": "On cherche une innovation. Elle paraît simple à première vue, mais elle révèle une chaîne de gestes : choisir une matière, frapper, détacher, utiliser, transmettre.",
    "answer": "Les premiers outils",
    "aliases": [
      "premiers outils",
      "outils en pierre",
      "outils de pierre",
      "outillage lithique"
    ],
    "lessonId": "prehistory-habilis",
    "clues": [
      "Le cadre est le Paléolithique ancien, avec des traces surtout connues en Afrique de l’Est pour les plus anciens ensembles.",
      "Les éclats et les enlèvements montrent des gestes répétés plutôt qu’un hasard naturel.",
      "La taille de la pierre ouvre l’accès à de nouveaux tranchants et à de nouvelles ressources."
    ],
    "explanation": "Les premiers outils montrent une capacité de transformation du milieu et de transmission des savoir-faire.",
    "caseTitle": "Innovation technique à identifier",
    "blockedGuesses": [
      "pierre",
      "caillou",
      "outil",
      "outils"
    ],
    "upgradedB19": true,
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  },
  {
    "id": "mystery-neolithic-agriculture",
    "difficulty": "difficile",
    "title": "Produire au lieu de seulement prélever",
    "subjectType": "transformation économique et sociale",
    "periodHint": "Néolithique",
    "prompt": "On cherche une transformation. Elle change la relation au temps : prévoir une saison, gérer des réserves, protéger un espace et dépendre davantage d’un territoire.",
    "answer": "L’agriculture",
    "aliases": [
      "agriculture",
      "l agriculture",
      "naissance de l agriculture",
      "développement de l agriculture",
      "agriculture néolithique",
      "agriculture neolithique"
    ],
    "lessonId": "prehistory-agriculture",
    "clues": [
      "Le cadre est le Néolithique, avec plusieurs foyers d’apparition selon les régions.",
      "Elle accompagne souvent villages plus stables, stockage, meules et sélection du vivant.",
      "Elle consiste à produire une partie de la nourriture plutôt qu’à seulement la prélever."
    ],
    "explanation": "L’agriculture transforme les rapports au territoire, au temps, à l’alimentation et au pouvoir.",
    "caseTitle": "Transformation économique à identifier",
    "blockedGuesses": [
      "village",
      "villages",
      "néolithique",
      "neolithique",
      "domestication"
    ],
    "upgradedB19": true,
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  },
  {
    "id": "mystery-nile",
    "difficulty": "difficile",
    "title": "Le rythme qui organise le royaume",
    "subjectType": "fleuve ou espace naturel",
    "periodHint": "Égypte ancienne",
    "prompt": "On cherche un espace naturel devenu cadre historique. Il n’est pas seulement un décor : il impose un rythme, des mesures, des déplacements et une manière d’organiser le pouvoir.",
    "answer": "Le Nil",
    "aliases": [
      "nil",
      "le nil",
      "fleuve nil"
    ],
    "lessonId": "egypt-nile",
    "clues": [
      "Le cadre est l’Afrique du Nord-Est, dans une vallée étroite entourée de zones désertiques.",
      "La crue annuelle oblige à prévoir, mesurer, irriguer, taxer et redistribuer.",
      "Sans lui, l’Égypte pharaonique ne s’organise pas de la même façon."
    ],
    "explanation": "Le Nil structure l’Égypte ancienne : il nourrit les terres, impose des calendriers, facilite les transports et soutient l’État pharaonique.",
    "caseTitle": "Espace naturel à identifier",
    "blockedGuesses": [
      "egypte",
      "égypte",
      "fleuve",
      "crue",
      "eau"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  },
  {
    "id": "mystery-minoens",
    "difficulty": "difficile",
    "title": "Des palais ouverts sur la mer",
    "subjectType": "civilisation",
    "periodHint": "Âge du Bronze égéen",
    "prompt": "On cherche une civilisation. Elle apparaît dans un espace insulaire où les palais, les fresques, les réserves et les routes maritimes comptent plus que les grandes batailles.",
    "answer": "Les Minoens",
    "aliases": [
      "minoens",
      "civilisation minoenne",
      "les minoens"
    ],
    "lessonId": "aegean-mediterranean-minoens-crete",
    "clues": [
      "Le cadre est la Méditerranée orientale, à l’âge du Bronze, avant la domination mycénienne.",
      "Les complexes palatiaux comme Cnossos organisent stockage, échanges et pouvoir.",
      "Cette civilisation est liée à la Crète et à une écriture encore difficile à interpréter."
    ],
    "explanation": "Les Minoens montrent une Méditerranée du Bronze connectée, brillante et difficile à lire faute de textes pleinement compris.",
    "caseTitle": "Civilisation à identifier",
    "blockedGuesses": [
      "Crète",
      "crete",
      "Cnossos",
      "Knossos",
      "palais"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  },
  {
    "id": "mystery-myceniens",
    "difficulty": "moyen",
    "title": "Des guerriers qui écrivent pour gérer",
    "subjectType": "civilisation ou peuple",
    "periodHint": "Âge du Bronze égéen",
    "prompt": "On cherche une civilisation. Les récits héroïques ont beaucoup marqué son image, mais les traces écrites conservées parlent surtout d’administration, de stocks et de dépendants.",
    "answer": "Les Mycéniens",
    "aliases": [
      "myceniens",
      "mycéniens",
      "mycenes",
      "mycènes",
      "les mycéniens",
      "les myceniens"
    ],
    "lessonId": "aegean-mediterranean-myceniens-palais",
    "clues": [
      "Le cadre est la Grèce continentale, à l’âge du Bronze récent, avant les crises autour de -1200.",
      "On y trouve des palais fortifiés, des murailles et des archives économiques.",
      "Les tablettes en linéaire B permettent de lire une forme ancienne du grec."
    ],
    "explanation": "Les Mycéniens sont passionnants parce qu’ils relient monde palatial, guerre, écriture administrative et mémoire épique.",
    "caseTitle": "Civilisation à identifier",
    "blockedGuesses": [
      "empire",
      "royaume",
      "ville",
      "civilisation",
      "peuple",
      "guerre",
      "commerce",
      "religion",
      "europe",
      "asie",
      "afrique",
      "rome",
      "égypte",
      "egypte",
      "chine",
      "moyen âge",
      "antiquité",
      "révolution",
      "roi",
      "technologie",
      "linéaire b",
      "lineaire b"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  },
  {
    "id": "mystery-viking-longship",
    "difficulty": "expert",
    "title": "Un bateau qui efface les frontières",
    "subjectType": "objet technique",
    "periodHint": "Moyen Âge nord-européen",
    "prompt": "On cherche un objet technique. Il ne sert pas seulement à se déplacer : il réduit la distance politique, rend des côtes vulnérables et transforme les fleuves en voies d’accès.",
    "answer": "Le navire viking",
    "aliases": [
      "navire viking",
      "le navire viking",
      "navires vikings",
      "bateau viking",
      "bateaux vikings",
      "drakkar",
      "langskip",
      "longship"
    ],
    "lessonId": "northern-viking-worlds-navires-vikings",
    "clues": [
      "Le cadre est l’Europe du Nord, entre le VIIIe et le XIe siècle.",
      "Sa conception permet d’alterner mer, estuaires, plages et cours d’eau.",
      "Voile, rames, faible tirant d’eau et coque souple expliquent son efficacité."
    ],
    "explanation": "Le navire viking explique une partie de la mobilité scandinave : il connecte mers, fleuves, raids, échanges et installations.",
    "caseTitle": "Objet technique à identifier",
    "blockedGuesses": [
      "viking",
      "vikings",
      "bateau",
      "navire"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  },
  {
    "id": "mystery-maat-rc39",
    "difficulty": "moyen",
    "title": "L’ordre que le roi doit maintenir",
    "subjectType": "notion religieuse et politique",
    "periodHint": "Égypte ancienne",
    "prompt": "On cherche une notion. Elle permet de comprendre pourquoi le pouvoir royal se présente comme plus qu’une administration : il prétend garantir un équilibre du monde.",
    "answer": "Maât",
    "aliases": [
      "maat",
      "maât",
      "la maat",
      "l ordre maat"
    ],
    "lessonId": "egypt-pharaoh-maat",
    "clues": [
      "Le cadre est l’Égypte pharaonique, entre palais, temples, justice et rites.",
      "La notion associe vérité, justice, ordre social et harmonie cosmique.",
      "Le roi doit la maintenir contre le désordre pour légitimer son autorité."
    ],
    "explanation": "Maât est essentielle pour comprendre que le pharaon n’est pas seulement un chef : il est présenté comme le garant de l’ordre cosmique et social.",
    "caseTitle": "Notion à identifier",
    "blockedGuesses": [
      "empire",
      "royaume",
      "ville",
      "civilisation",
      "peuple",
      "guerre",
      "commerce",
      "religion",
      "europe",
      "asie",
      "afrique",
      "rome",
      "égypte",
      "egypte",
      "chine",
      "moyen âge",
      "antiquité",
      "révolution",
      "roi",
      "technologie",
      "ordre",
      "justice"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  },
  {
    "id": "mystery-persian-wars-rc39",
    "difficulty": "moyen",
    "title": "Quand des cités résistent à un empire",
    "subjectType": "conflit historique",
    "periodHint": "Grèce classique",
    "prompt": "On cherche un conflit. Quelques batailles très célèbres ont fini par résumer l’affaire, mais l’enjeu principal est le rapport entre des cités indépendantes et une très grande puissance impériale.",
    "answer": "Les guerres médiques",
    "aliases": [
      "guerres mediques",
      "guerres médiques",
      "guerres perses",
      "guerres greco-perses",
      "guerres gréco-perses"
    ],
    "lessonId": "greece-persian-wars",
    "clues": [
      "Le cadre est le début du Ve siècle av. J.-C., entre mer Égée et monde grec.",
      "Marathon, Salamine et Platées sont devenus des repères de mémoire civique.",
      "Athènes, Sparte et l’Empire perse sont au cœur de l’affrontement."
    ],
    "explanation": "Les guerres médiques comptent parce qu’elles renforcent certaines cités grecques et nourrissent une mémoire politique durable.",
    "caseTitle": "Conflit à identifier",
    "blockedGuesses": [
      "empire",
      "royaume",
      "ville",
      "civilisation",
      "peuple",
      "guerre",
      "commerce",
      "religion",
      "europe",
      "asie",
      "afrique",
      "rome",
      "égypte",
      "egypte",
      "chine",
      "moyen âge",
      "antiquité",
      "révolution",
      "roi",
      "technologie",
      "marathon",
      "salamine",
      "perse"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  },
  {
    "id": "mystery-augustus-rc39",
    "difficulty": "moyen",
    "title": "Le chef qui garde les mots de la République",
    "subjectType": "personnage historique",
    "periodHint": "Rome antique",
    "prompt": "On cherche un personnage. Il réussit à concentrer le pouvoir personnel tout en conservant les noms, les rituels et les apparences d’un régime plus ancien.",
    "answer": "Auguste",
    "aliases": [
      "auguste",
      "octave",
      "octavien",
      "augustus"
    ],
    "lessonId": "rome-augustus-principate",
    "clues": [
      "Le cadre est le monde romain après les guerres civiles du Ier siècle av. J.-C.",
      "Il se présente comme restaurateur plutôt que comme roi, en ménageant le Sénat.",
      "Princeps, héritier de César et début du Principat orientent vers lui."
    ],
    "explanation": "Auguste montre comment un régime peut changer profondément tout en conservant des formes anciennes pour paraître légitime.",
    "caseTitle": "Personnage à identifier",
    "blockedGuesses": [
      "empire",
      "royaume",
      "ville",
      "civilisation",
      "peuple",
      "guerre",
      "commerce",
      "religion",
      "europe",
      "asie",
      "afrique",
      "rome",
      "égypte",
      "egypte",
      "chine",
      "moyen âge",
      "antiquité",
      "révolution",
      "roi",
      "technologie",
      "césar",
      "cesar",
      "princeps"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  },
  {
    "id": "mystery-1789-rc39",
    "difficulty": "difficile",
    "title": "Quand la crise fiscale devient souveraineté populaire",
    "subjectType": "rupture politique",
    "periodHint": "France, fin du XVIIIe siècle",
    "prompt": "On cherche une rupture politique. Elle naît d’une crise de finances et de représentation, puis dépasse rapidement la question de l’impôt pour redéfinir la souveraineté.",
    "answer": "La Révolution française",
    "aliases": [
      "revolution francaise",
      "révolution française",
      "1789",
      "revolution de 1789",
      "révolution de 1789"
    ],
    "lessonId": "atlantic-revolutions-revolution-francaise-1789",
    "clues": [
      "Le cadre est la France de la fin du XVIIIe siècle, avec une monarchie en crise.",
      "États généraux, Assemblée nationale et serment du Jeu de paume en sont des étapes.",
      "Droits, nation, privilèges abolis et été 1789 donnent la clé."
    ],
    "explanation": "La Révolution française naît d’une crise financière et politique, puis redéfinit souveraineté, droits et ordre social.",
    "caseTitle": "Rupture politique à identifier",
    "blockedGuesses": [
      "france",
      "bastille",
      "louis xvi",
      "crise fiscale",
      "états généraux",
      "etats generaux"
    ],
    "upgradedB19": true,
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  },
  {
    "id": "mystery-russian-revolution-rc39",
    "difficulty": "difficile",
    "title": "Un empire s’effondre, un régime nouveau naît",
    "subjectType": "rupture politique",
    "periodHint": "Première Guerre mondiale",
    "prompt": "On cherche une rupture politique. Elle n’est pas seulement une idée qui triomphe : elle naît d’un État épuisé, d’une guerre interminable, de villes affamées et de soldats qui ne suivent plus.",
    "answer": "La révolution russe",
    "aliases": [
      "revolution russe",
      "révolution russe",
      "1917",
      "revolution de 1917",
      "révolution de 1917"
    ],
    "lessonId": "russian-revolution-postwar",
    "clues": [
      "Le cadre est un empire européen et asiatique en crise pendant la Première Guerre mondiale.",
      "1917, Petrograd, soviets et gouvernement provisoire sont des repères centraux.",
      "Le parti bolchevik saisit l’occasion après l’effondrement de l’autorité monarchique."
    ],
    "explanation": "La révolution russe transforme le XXe siècle : elle donne naissance à un modèle politique qui structure ensuite la guerre froide.",
    "caseTitle": "Rupture politique à identifier",
    "blockedGuesses": [
      "russie",
      "urss",
      "lénine",
      "lenine",
      "bolcheviks",
      "soviets",
      "petrograd"
    ],
    "upgradedB19": true,
    "cluesCleaned": true,
    "manualCluesB97": true,
    "balancedMysteryB119": true
  }
];
const HISTO_ENCYCLOPEDIA = [];
window.HISTODAILY_DATA_MODE = "public-core";
