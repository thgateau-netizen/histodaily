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
    "prompt": "On retrouve, dans plusieurs niveaux d’occupation, des zones rubéfiées, des charbons et des os noircis. L’hypothèse de l’incendie accidentel tient mal: les traces se répètent, s’organisent et changent la manière d’habiter la nuit.",
    "answer": "La maîtrise du feu",
    "aliases": [
      "maitrise du feu",
      "maîtrise du feu"
    ],
    "lessonId": "prehistory-fire",
    "clues": [
      "Technique maîtrisée peu à peu, visible par des traces matérielles répétées.",
      "Paléolithique ancien et moyen · foyers, charbons, os noircis, zones rubéfiées.",
      "Cuisson, chaleur, protection, lumière et veillées deviennent possibles."
    ],
    "explanation": "La maîtrise du feu n’est pas un gadget technique : elle transforme l’alimentation, les veillées, la protection, la mobilité et les formes de sociabilité.",
    "caseTitle": "Sujet à identifier",
    "blockedGuesses": [
      "feu"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true
  },
  {
    "id": "mystery-pyramids",
    "difficulty": "difficile",
    "title": "Une tombe, un État, un horizon",
    "prompt": "Un monument colossal suppose carrières, transport, équipes spécialisées, scribes, calendrier des crues et théologie royale. Ce n’est donc pas seulement un tombeau: c’est une démonstration d’État.",
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
      "Monument funéraire royal, mais aussi démonstration d’organisation étatique.",
      "Ancien Empire · Gizeh et autres chantiers du royaume.",
      "Carrières, blocs, équipes, scribes, crue du fleuve et théologie solaire."
    ],
    "explanation": "Les pyramides d’Égypte sont des tombes royales, mais elles prouvent aussi la puissance administrative, religieuse et économique du royaume.",
    "caseTitle": "Sujet à identifier",
    "blockedGuesses": [
      "egypte",
      "égypte",
      "pharaon",
      "pharaons"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true
  },
  {
    "id": "mystery-athens",
    "difficulty": "difficile",
    "title": "Voter, mais pas pour tous",
    "prompt": "Assemblée, tirage au sort, tribunaux populaires: les citoyens prennent réellement part au pouvoir. Mais femmes, esclaves et métèques restent hors du corps civique. Le modèle est donc à la fois fondateur et profondément limité.",
    "answer": "La démocratie athénienne",
    "aliases": [
      "democratie athenienne",
      "démocratie athénienne",
      "democratie d athenes",
      "démocratie d’athènes"
    ],
    "lessonId": "greece-athens-democracy",
    "clues": [
      "Régime civique direct, fondateur mais très excluant.",
      "Ve siècle av. J.-C. · Attique, assemblée, tribunaux et tirage au sort.",
      "Citoyens actifs, femmes exclues, métèques exclus, esclaves exclus."
    ],
    "explanation": "La démocratie athénienne est fondatrice, mais elle reste directe, masculine, civique et fortement excluante.",
    "caseTitle": "Sujet à identifier",
    "blockedGuesses": [
      "démocratie",
      "democratie",
      "athenes",
      "athènes"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true
  },
  {
    "id": "mystery-vikings",
    "difficulty": "expert",
    "title": "La violence n’explique pas tout",
    "prompt": "Les chroniqueurs chrétiens décrivent surtout la violence. Les dépôts monétaires, l’archéologie des comptoirs et les routes fluviales racontent pourtant des acteurs capables de piller, commercer, s’installer, servir comme mercenaires et relier des mondes très éloignés.",
    "answer": "Les Vikings",
    "aliases": [
      "vikings",
      "viking",
      "nordiques",
      "scandinaves"
    ],
    "lessonId": "northern-viking-worlds-raids-vikings",
    "clues": [
      "Groupe scandinave de mobilité, de guerre et d’échanges, pas seulement de pillage.",
      "Fin VIIIe → XIe siècle · mers du Nord, fleuves, îles Britanniques, Atlantique.",
      "Raids, comptoirs, argent, routes fluviales, colonies et bateaux rapides."
    ],
    "explanation": "Les Vikings ne sont pas seulement des pillards : ce sont des acteurs scandinaves de mobilité, de commerce, de guerre, de colonisation et de recomposition politique.",
    "caseTitle": "Sujet à identifier",
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
    "manualCluesB97": true
  },
  {
    "id": "mystery-napoleon",
    "difficulty": "difficile",
    "title": "L’ordre né d’une rupture",
    "prompt": "Un général devenu chef d’État conserve une partie de l’héritage révolutionnaire, centralise l’administration, codifie le droit, fabrique une légende et transforme l’Europe par des guerres presque continues.",
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
      "Personnage politique et militaire issu de la rupture révolutionnaire.",
      "1799 → 1815 · France, Europe, Consulat puis pouvoir impérial.",
      "Code civil, centralisation, légende, guerres presque continues."
    ],
    "explanation": "Napoléon stabilise une partie de la Révolution tout en construisant un pouvoir autoritaire et conquérant.",
    "caseTitle": "Sujet à identifier",
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
    "manualCluesB97": true
  },
  {
    "id": "mystery-hominids",
    "difficulty": "difficile",
    "title": "Le buisson avant la lignée",
    "prompt": "Des fossiles anciens, des outils et l’ADN ancien obligent à abandonner l’image d’une file indienne menant proprement jusqu’à nous. Plusieurs lignées coexistent, disparaissent, se croisent parfois, et l’évolution ressemble davantage à un buisson qu’à un escalier.",
    "answer": "Les premiers hominidés",
    "aliases": [
      "hominides",
      "hominidés",
      "premiers hominides",
      "premiers hominidés"
    ],
    "lessonId": "prehistory-hominids",
    "clues": [
      "Groupe de lignées humaines anciennes, pas une espèce unique ni une marche droite vers nous.",
      "Plusieurs millions d’années · Afrique d’abord, puis expansions progressives.",
      "Fossiles, bipédie, outils associés, buisson évolutif, coexistences."
    ],
    "explanation": "Les premiers hominidés rappellent que l’évolution humaine est un buisson, pas une ligne droite.",
    "caseTitle": "Sujet à identifier",
    "blockedGuesses": [
      "sapiens",
      "homo sapiens",
      "évolution",
      "evolution"
    ],
    "upgradedB19": true,
    "cluesCleaned": true,
    "manualCluesB97": true
  },
  {
    "id": "mystery-first-tools",
    "difficulty": "difficile",
    "title": "La main délègue au caillou",
    "prompt": "Un éclat n’est pas seulement un caillou coupant. Sa forme, le point de percussion, les enlèvements successifs et les traces d’usure révèlent une chaîne de gestes pensée à l’avance, transmise, corrigée et répétée par des groupes humains.",
    "answer": "Les premiers outils",
    "aliases": [
      "premiers outils",
      "outils en pierre",
      "homo habilis"
    ],
    "lessonId": "prehistory-habilis",
    "clues": [
      "Innovation technique en pierre taillée, lisible dans la forme des éclats.",
      "Paléolithique ancien · surtout Afrique de l’Est pour les premiers ensembles connus.",
      "Percussion, tranchants, gestes appris, découpe et accès à de nouvelles ressources."
    ],
    "explanation": "Les premiers outils montrent une capacité de transformation du milieu et de transmission des savoir-faire.",
    "caseTitle": "Sujet à identifier",
    "blockedGuesses": [
      "pierre",
      "caillou",
      "outil",
      "outils"
    ],
    "upgradedB19": true,
    "cluesCleaned": true,
    "manualCluesB97": true
  },
  {
    "id": "mystery-neolithic-agriculture",
    "difficulty": "difficile",
    "title": "Produire au lieu de seulement prélever",
    "prompt": "Des graines sélectionnées, des meules, des silos, des villages plus stables et des os d’animaux domestiques montrent que la subsistance n’est plus seulement une affaire de prélèvement. Elle devient anticipation, travail saisonnier, stockage et propriété disputée.",
    "answer": "L’agriculture",
    "aliases": [
      "agriculture",
      "neolithique",
      "néolithique",
      "domestication",
      "domestications"
    ],
    "lessonId": "prehistory-agriculture",
    "clues": [
      "Transformation des modes de subsistance : produire plutôt que seulement prélever.",
      "Néolithique · plusieurs foyers indépendants, pas une invention unique.",
      "Graines sélectionnées, meules, silos, troupeaux, villages plus stables."
    ],
    "explanation": "L’agriculture transforme les rapports au territoire, au temps, à l’alimentation et au pouvoir.",
    "caseTitle": "Sujet à identifier",
    "blockedGuesses": [
      "village",
      "villages",
      "néolithique",
      "neolithique",
      "domestication"
    ],
    "upgradedB19": true,
    "cluesCleaned": true,
    "manualCluesB97": true
  },
  {
    "id": "mystery-nile",
    "difficulty": "difficile",
    "title": "Le calendrier vient de l’eau",
    "prompt": "La crue ne donne pas seulement de l’eau. Elle impose de mesurer, prévoir, répartir, taxer et organiser les travaux. Le calendrier agricole, l’impôt et le pouvoir royal prennent appui sur un rythme naturel très politique.",
    "answer": "Le Nil",
    "aliases": [
      "nil",
      "le nil",
      "fleuve nil"
    ],
    "lessonId": "egypt-nile",
    "clues": [
      "Grand fleuve qui rythme l’agriculture, le calendrier et le pouvoir.",
      "Vallée nord-africaine · crues annuelles, limon, digues, canaux.",
      "Mesurer, prévoir, répartir l’eau, taxer les récoltes, organiser les travaux."
    ],
    "explanation": "Le Nil n’est pas seulement un décor : il organise l’économie, les transports, le calendrier et l’État égyptien.",
    "caseTitle": "Sujet à identifier",
    "blockedGuesses": [
      "égypte",
      "egypte",
      "pharaon",
      "crue"
    ],
    "upgradedB19": true,
    "cluesCleaned": true,
    "manualCluesB97": true
  },
  {
    "id": "mystery-minoens",
    "difficulty": "difficile",
    "title": "Des palais sans murailles évidentes",
    "prompt": "En Crète, des complexes palatiaux, des fresques, des échanges maritimes et une écriture mal comprise dessinent un monde égéen original.",
    "answer": "Les Minoens",
    "aliases": [
      "minoens",
      "civilisation minoenne"
    ],
    "lessonId": "aegean-mediterranean-minoens-crete",
    "clues": [
      "Civilisation palatiale insulaire de l’âge du Bronze égéen.",
      "Crète · environ -2000 à -1450, autour de grands complexes comme Cnossos.",
      "Fresques, entrepôts, échanges maritimes, écriture encore mal comprise."
    ],
    "explanation": "Les Minoens montrent une Méditerranée du Bronze connectée, brillante et difficile à lire faute de textes pleinement compris.",
    "caseTitle": "Sujet à identifier",
    "blockedGuesses": [
      "Crète",
      "Cnossos",
      "Knossos"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true
  },
  {
    "id": "mystery-myceniens",
    "difficulty": "moyen",
    "title": "Des guerriers qui écrivent pour gérer",
    "prompt": "Derrière les murailles et les récits héroïques, des tablettes révèlent surtout une administration palatiale attentive aux stocks et aux dépendants.",
    "answer": "Les Mycéniens",
    "aliases": [
      "myceniens",
      "mycéniens",
      "mycenes",
      "mycènes",
      "lineaire b",
      "linéaire b"
    ],
    "lessonId": "aegean-mediterranean-myceniens-palais",
    "clues": [
      "Civilisation palatiale guerrière, mais aussi très administrative.",
      "Grèce continentale · âge du Bronze récent, avant la crise autour de -1200.",
      "Murailles, palais, tablettes en linéaire B, stocks, dépendants, wanax."
    ],
    "explanation": "Les Mycéniens sont passionnants parce qu’ils relient monde palatial, guerre, écriture administrative et mémoire épique.",
    "caseTitle": "Sujet à identifier",
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
    "manualCluesB97": true
  },
  {
    "id": "mystery-viking-longship",
    "difficulty": "expert",
    "title": "Un bateau qui efface les frontières",
    "prompt": "L’objet n’est pas seulement maritime: il change le temps de réaction des pouvoirs. Il franchit côtes et fleuves, transporte hommes et butin, puis transforme l’espace intérieur en zone atteignable.",
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
      "Objet technique pensé pour naviguer vite, débarquer vite et repartir vite.",
      "VIIIe → XIe siècle · côtes, mers du Nord, Atlantique et fleuves.",
      "Faible tirant d’eau, voile, rames, coque souple, raids et commerce."
    ],
    "explanation": "Le navire viking explique une partie de la mobilité scandinave : il connecte mers, fleuves, raids, échanges et installations.",
    "caseTitle": "Sujet à identifier",
    "blockedGuesses": [
      "viking",
      "vikings"
    ],
    "cluesCleaned": true,
    "manualCluesB97": true
  },
  {
    "id": "mystery-maat-rc39",
    "difficulty": "moyen",
    "title": "L’ordre que le roi doit maintenir",
    "prompt": "Dans l’Égypte ancienne, le pouvoir royal n’est pas seulement politique: il prétend garantir l’équilibre du monde, la justice, les rites et l’ordre cosmique.",
    "answer": "Maât",
    "aliases": [
      "maat",
      "maât",
      "la maat",
      "l ordre maat"
    ],
    "lessonId": "egypt-pharaoh-maat",
    "clues": [
      "Idée religieuse et politique liée à l’ordre du monde.",
      "Égypte pharaonique · palais, temples, justice, rites royaux.",
      "Équilibre, vérité, justice, harmonie cosmique et responsabilité du roi."
    ],
    "explanation": "Maât est essentielle pour comprendre que le pharaon n’est pas seulement un chef : il est présenté comme le garant de l’ordre cosmique et social.",
    "caseTitle": "Sujet à identifier",
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
    "manualCluesB97": true
  },
  {
    "id": "mystery-persian-wars-rc39",
    "difficulty": "moyen",
    "title": "Quand des cités grecques résistent à un très grand empire",
    "prompt": "Marathon, Salamine, Platées: quelques batailles deviennent des repères, mais l’enjeu réel est l’équilibre entre cités grecques et puissance perse.",
    "answer": "Les guerres médiques",
    "aliases": [
      "guerres mediques",
      "guerres médiques",
      "guerres perses",
      "guerres greco-perses"
    ],
    "lessonId": "greece-persian-wars",
    "clues": [
      "Conflit entre des cités grecques et une très grande puissance impériale.",
      "Début du Ve siècle av. J.-C. · Marathon, Salamine, Platées, mer Égée.",
      "Hoplites, trirèmes, Athènes, Sparte, puissance perse, mémoire civique."
    ],
    "explanation": "Les guerres médiques comptent parce qu’elles renforcent certaines cités grecques et nourrissent une mémoire politique durable.",
    "caseTitle": "Sujet à identifier",
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
    "manualCluesB97": true
  },
  {
    "id": "mystery-augustus-rc39",
    "difficulty": "moyen",
    "title": "Le chef qui garde les mots de la République",
    "prompt": "Après les guerres civiles romaines, un chef concentre l’essentiel du pouvoir tout en conservant les mots, les magistratures et les apparences de la République. Le dossier cherche celui qui transforme la domination personnelle en régime durable.",
    "answer": "Auguste",
    "aliases": [
      "auguste",
      "octave",
      "octavien",
      "augustus"
    ],
    "lessonId": "rome-augustus-principate",
    "clues": [
      "Personnage qui concentre le pouvoir tout en gardant les formes anciennes.",
      "-27 → 14 · monde romain, après les guerres civiles.",
      "Princeps, Sénat, paix civile, héritier de César, magistratures conservées."
    ],
    "explanation": "Auguste montre comment un régime peut changer profondément tout en conservant des formes anciennes pour paraître légitime.",
    "caseTitle": "Sujet à identifier",
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
    "manualCluesB97": true
  },
  {
    "id": "mystery-1789-rc39",
    "difficulty": "difficile",
    "title": "Quand la crise fiscale devient souveraineté populaire",
    "prompt": "La crise fiscale oblige le roi à réunir les ordres, mais la question devient vite plus profonde: qui représente la nation, qui décide de l’impôt, et que vaut encore une monarchie quand l’Assemblée se déclare souveraine?",
    "answer": "La Révolution française",
    "aliases": [
      "revolution francaise",
      "révolution française",
      "1789",
      "revolution de 1789"
    ],
    "lessonId": "atlantic-revolutions-revolution-francaise-1789",
    "clues": [
      "Rupture politique née d’une crise de monarchie, d’impôts et de représentation.",
      "France · États généraux, Assemblée nationale, été 1789.",
      "Ordres, nation, souveraineté, droits, privilèges, serment du Jeu de paume."
    ],
    "explanation": "La Révolution française naît d’une crise financière et politique, puis redéfinit souveraineté, droits et ordre social.",
    "caseTitle": "Sujet à identifier",
    "blockedGuesses": [
      "france",
      "bastille",
      "louis xvi",
      "crise fiscale"
    ],
    "upgradedB19": true,
    "cluesCleaned": true,
    "manualCluesB97": true
  },
  {
    "id": "mystery-russian-revolution-rc39",
    "difficulty": "difficile",
    "title": "Un empire s’effondre, un régime nouveau naît",
    "prompt": "Une monarchie fragilisée par la guerre, des villes affamées, des soviets, des soldats épuisés et un parti révolutionnaire capable de saisir l’occasion: le basculement ne vient pas d’une idée seule, mais d’un État qui se défait.",
    "answer": "La révolution russe",
    "aliases": [
      "revolution russe",
      "révolution russe",
      "1917",
      "bolcheviks"
    ],
    "lessonId": "russian-revolution-postwar",
    "clues": [
      "Rupture politique qui renverse une monarchie épuisée par la guerre.",
      "1917 · Petrograd, empire russe, villes affamées et armée fragile.",
      "Soviets, pain, soldats, gouvernement provisoire, parti bolchevik."
    ],
    "explanation": "La révolution russe transforme le XXe siècle : elle donne naissance à un modèle politique qui structure ensuite la guerre froide.",
    "caseTitle": "Sujet à identifier",
    "blockedGuesses": [
      "russie",
      "urss",
      "lénine",
      "lenine",
      "bolcheviks"
    ],
    "upgradedB19": true,
    "cluesCleaned": true,
    "manualCluesB97": true
  }
];
const HISTO_ENCYCLOPEDIA = [];
window.HISTODAILY_DATA_MODE = "public-core";
