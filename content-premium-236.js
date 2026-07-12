/* HistoDaily beta 236 — grands sujets premium, priorité aux thèmes centraux. */
(function histodailyBeta236PremiumContent(){
  "use strict";
  const VERSION = "1.0.0-beta.242.0";
  const GROUPS = {};
  const WORLDS = {
  "history": [
    {
      "id": "history-industrial-revolution",
      "title": "Révolution industrielle",
      "emoji": "🏭",
      "subtitle": "Charbon, vapeur, usine et monde ouvrier",
      "timeframe": "1760 → 1914",
      "accent": "#64748b",
      "group": "revolutions-19c",
      "sortStart": 1760,
      "sortEnd": 1914,
      "unlockedByDefault": false
    },
    {
      "id": "history-cold-war",
      "title": "Guerre froide",
      "emoji": "☢️",
      "subtitle": "Deux blocs, dissuasion et conflits mondiaux",
      "timeframe": "1947 → 1991",
      "accent": "#475569",
      "group": "20c",
      "sortStart": 1947,
      "sortEnd": 1991,
      "unlockedByDefault": false
    }
  ],
  "art": [
    {
      "id": "art-baroque-power",
      "title": "Baroque, spectacle et pouvoir",
      "emoji": "🕯️",
      "subtitle": "Caravage, Bernin, Rubens et Versailles",
      "timeframe": "1600 → 1750",
      "accent": "#c084fc",
      "group": "art-renaissance-classical",
      "sortStart": 22,
      "discipline": "art",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "cinema": [
    {
      "id": "cinema-french-new-wave",
      "title": "La Nouvelle Vague",
      "emoji": "🎬",
      "subtitle": "Rue, auteur, montage et liberté",
      "timeframe": "1958 → 1968",
      "accent": "#38bdf8",
      "group": "cinema-new-waves",
      "sortStart": 31,
      "discipline": "cinema",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "science-inventions": [
    {
      "id": "sci-newton-mechanics",
      "title": "Newton et la mécanique",
      "emoji": "🍎",
      "subtitle": "Mouvement, forces et gravitation",
      "timeframe": "XVIIe siècle",
      "accent": "#3b82f6",
      "group": "sci-energy-matter",
      "sortStart": 24,
      "discipline": "science-inventions",
      "planned": true,
      "unlockedByDefault": false
    },
    {
      "id": "sci-quantum-revolution",
      "title": "La révolution quantique",
      "emoji": "⚛️",
      "subtitle": "Quanta, probabilités et monde atomique",
      "timeframe": "1900 → aujourd’hui",
      "accent": "#8b5cf6",
      "group": "sci-energy-matter",
      "sortStart": 25,
      "discipline": "science-inventions",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "astronomy": [
    {
      "id": "astro-moon-phases",
      "title": "La Lune, ses phases et ses éclipses",
      "emoji": "🌙",
      "subtitle": "Mouvements, lumière et marées",
      "timeframe": "Astronomie fondamentale",
      "accent": "#a78bfa",
      "group": "astro-solar-system",
      "sortStart": 25,
      "discipline": "astronomy",
      "planned": true,
      "unlockedByDefault": false
    },
    {
      "id": "astro-apollo-space-race",
      "title": "La course à la Lune",
      "emoji": "🚀",
      "subtitle": "Spoutnik, Gagarine et Apollo 11",
      "timeframe": "1957 → 1972",
      "accent": "#6366f1",
      "group": "astro-exploration",
      "sortStart": 42,
      "discipline": "astronomy",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "economy": [
    {
      "id": "eco-gdp-growth",
      "title": "PIB, croissance et niveau de vie",
      "emoji": "📊",
      "subtitle": "Mesurer la production sans tout confondre",
      "timeframe": "Économie contemporaine",
      "accent": "#10b981",
      "group": "eco-basics",
      "sortStart": 3,
      "discipline": "economy",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "geography": [
    {
      "id": "geo-climate-change",
      "title": "Changement climatique et territoires",
      "emoji": "🌡️",
      "subtitle": "Causes, impacts, adaptation et justice",
      "timeframe": "XXe → XXIe siècle",
      "accent": "#f97316",
      "group": "geo-environments",
      "sortStart": 12,
      "discipline": "geography",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "music": [
    {
      "id": "music-rock-revolution",
      "title": "La révolution rock",
      "emoji": "🎸",
      "subtitle": "Blues, amplification et culture jeune",
      "timeframe": "Années 1950 → 1970",
      "accent": "#ef4444",
      "group": "music-modern-recording",
      "sortStart": 42,
      "discipline": "music",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "literature": [
    {
      "id": "lit-science-fiction",
      "title": "La science-fiction",
      "emoji": "🛸",
      "subtitle": "Imaginer demain pour interroger aujourd’hui",
      "timeframe": "XIXe → XXIe siècle",
      "accent": "#f97316",
      "group": "lit-modernities",
      "sortStart": 43,
      "discipline": "literature",
      "planned": true,
      "unlockedByDefault": false
    }
  ]
};
  const LESSONS = {
  "history-industrial-revolution": [
    {
      "id": "history-industrial-revolution-steam-factory",
      "title": "Révolution industrielle : vapeur, usine et monde ouvrier",
      "period": "1760 → 1914",
      "location": "Grande-Bretagne puis Europe, États-Unis et Japon",
      "emoji": "🏭",
      "xp": 90,
      "order": 1
    }
  ],
  "history-cold-war": [
    {
      "id": "history-cold-war-bipolar-world",
      "title": "Guerre froide : un conflit mondial sous menace nucléaire",
      "period": "1947 → 1991",
      "location": "Monde",
      "emoji": "☢️",
      "xp": 90,
      "order": 1
    }
  ],
  "art-baroque-power": [
    {
      "id": "art-baroque-light-movement-power",
      "title": "Le baroque : lumière, mouvement et mise en scène du pouvoir",
      "period": "XVIIe → début du XVIIIe siècle",
      "location": "Italie puis Europe et Amériques",
      "emoji": "🕯️",
      "xp": 80,
      "order": 1
    }
  ],
  "cinema-french-new-wave": [
    {
      "id": "cinema-new-wave-auteur-street-editing",
      "title": "Nouvelle Vague : filmer autrement et redéfinir l’auteur",
      "period": "Fin des années 1950 → années 1960",
      "location": "France",
      "emoji": "🎬",
      "xp": 80,
      "order": 1
    }
  ],
  "sci-newton-mechanics": [
    {
      "id": "sci-newton-motion-universal-gravitation",
      "title": "Newton : les mêmes lois pour la pomme et la Lune",
      "period": "XVIIe siècle",
      "location": "Angleterre et Europe savante",
      "emoji": "🍎",
      "xp": 85,
      "order": 1
    }
  ],
  "sci-quantum-revolution": [
    {
      "id": "sci-quantum-quanta-probability",
      "title": "Physique quantique : quand le monde cesse d’être intuitif",
      "period": "1900 → aujourd’hui",
      "location": "Europe, États-Unis et recherche mondiale",
      "emoji": "⚛️",
      "xp": 90,
      "order": 1
    }
  ],
  "astro-moon-phases": [
    {
      "id": "astro-moon-phases-eclipses-tides",
      "title": "La Lune : phases, éclipses, marées et face cachée",
      "period": "Astronomie fondamentale",
      "location": "Système Terre-Lune-Soleil",
      "emoji": "🌙",
      "xp": 75,
      "order": 1
    }
  ],
  "astro-apollo-space-race": [
    {
      "id": "astro-space-race-apollo-11",
      "title": "De Spoutnik à Apollo 11 : pourquoi la Lune devient un objectif politique",
      "period": "1957 → 1972",
      "location": "URSS, États-Unis et espace proche",
      "emoji": "🚀",
      "xp": 85,
      "order": 1
    }
  ],
  "eco-gdp-growth": [
    {
      "id": "eco-gdp-growth-limits",
      "title": "PIB et croissance : mesurer la production sans mesurer toute la vie",
      "period": "Économie contemporaine",
      "location": "Monde",
      "emoji": "📊",
      "xp": 75,
      "order": 1
    }
  ],
  "geo-climate-change": [
    {
      "id": "geo-climate-change-unequal-territories",
      "title": "Changement climatique : un phénomène global aux effets très inégaux",
      "period": "XXe → XXIe siècle",
      "location": "Monde",
      "emoji": "🌡️",
      "xp": 80,
      "order": 1
    }
  ],
  "music-rock-revolution": [
    {
      "id": "music-rock-blues-studio-youth",
      "title": "Rock : du rhythm and blues à une culture mondiale",
      "period": "Années 1950 → 1970",
      "location": "États-Unis, Royaume-Uni puis monde",
      "emoji": "🎸",
      "xp": 80,
      "order": 1
    }
  ],
  "lit-science-fiction": [
    {
      "id": "lit-science-fiction-worlds-critique",
      "title": "Science-fiction : construire un autre monde pour regarder le nôtre",
      "period": "XIXe → XXIe siècle",
      "location": "Littératures mondiales",
      "emoji": "🛸",
      "xp": 80,
      "order": 1
    }
  ]
};
  const PACKS = {
  "history-industrial-revolution-steam-factory": {
    "hook": "La révolution industrielle ne se résume ni à une machine ni à une date. Elle combine énergie fossile, nouvelles organisations du travail, capitaux, transports et marchés, puis transforme profondément les villes, les familles et les rapports sociaux.",
    "keyFacts": [
      "La Grande-Bretagne est le premier foyer majeur au XVIIIe siècle",
      "Le charbon alimente vapeur, métallurgie et transports",
      "L’usine concentre machines, ouvriers et discipline du temps",
      "L’industrialisation augmente la production mais crée de fortes inégalités",
      "Le phénomène se diffuse de manière inégale en Europe, aux États-Unis et au Japon"
    ],
    "express": [
      "À partir de la seconde moitié du XVIIIe siècle, la Grande-Bretagne connaît une transformation cumulative. Les machines textiles accélèrent la production, le charbon fournit une énergie abondante, la vapeur permet d’actionner des équipements loin des cours d’eau et les canaux puis le chemin de fer relient mines, usines, ports et marchés. Aucun élément ne suffit seul : c’est leur combinaison qui change l’échelle de l’économie.",
      "L’usine impose un nouveau rapport au temps. Le travail n’est plus seulement rythmé par la saison ou la tâche, mais par l’horloge, le règlement et la cadence des machines. Hommes, femmes et enfants participent à cette économie selon des statuts et salaires très inégaux. Les villes industrielles grandissent vite, souvent plus vite que les logements, l’assainissement ou les protections sociales.",
      "La production de masse rend certains biens moins chers et enrichit entrepreneurs, commerçants et États. Mais elle entraîne aussi accidents, pollution, journées longues et conflits salariaux. Les syndicats, coopératives, lois sociales et mouvements politiques ne sont pas extérieurs à l’industrialisation : ils naissent en grande partie des tensions qu’elle produit."
    ],
    "complete": [
      {
        "title": "1. Pourquoi la Grande-Bretagne démarre-t-elle tôt ?",
        "text": "La présence de charbon accessible, un réseau commercial mondial, des capitaux, une agriculture productive et des institutions favorables aux investissements créent un terrain propice. Il faut éviter l’explication magique par l’« esprit inventif ». Les techniques circulent, mais elles deviennent décisives lorsqu’elles peuvent être financées, entretenues et reliées à des marchés. L’empire et l’esclavage atlantique participent aussi à l’accumulation de richesses et de matières premières, notamment le coton."
      },
      {
        "title": "2. De la machine à vapeur au système industriel",
        "text": "La vapeur perfectionnée par James Watt n’invente pas à elle seule l’industrie. Elle fournit une puissance régulière aux pompes, filatures, hauts-fourneaux puis locomotives. Le charbon remplace progressivement une partie de l’énergie du bois, de l’eau, du vent et des muscles. Cette densité énergétique permet de concentrer des machines et d’augmenter les volumes, mais crée une dépendance durable aux combustibles fossiles."
      },
      {
        "title": "3. L’usine transforme le travail",
        "text": "Dans la fabrique, les machines coûtent cher et doivent fonctionner longtemps. Les propriétaires imposent horaires, surveillance et division des tâches. Des ouvriers qualifiés conservent un savoir important, tandis que d’autres postes deviennent répétitifs. Le travail à domicile ne disparaît pas immédiatement : usine, atelier et sous-traitance coexistent. La nouveauté tient surtout à la concentration de la production et au pouvoir accru de ceux qui possèdent bâtiments, machines et capitaux."
      },
      {
        "title": "4. Urbanisation, santé et question sociale",
        "text": "Manchester, Birmingham, Lille ou la Ruhr attirent des populations rurales. Les quartiers ouvriers manquent souvent d’eau potable, d’égouts et d’espace. Les épidémies révèlent que la santé dépend aussi de l’urbanisme. Enquêtes, réformes sanitaires et lois limitant progressivement le travail des enfants apparaissent au XIXe siècle. Ces avancées ne sont pas des cadeaux automatiques du progrès : elles résultent de mobilisations, de peurs sociales et de décisions politiques."
      },
      {
        "title": "5. Une révolution mondiale mais inégale",
        "text": "La Belgique, la France, l’Allemagne, les États-Unis puis le Japon s’industrialisent selon des rythmes différents. Certaines régions se spécialisent dans le textile, d’autres dans l’acier, la chimie ou l’électricité. L’industrialisation renforce la puissance militaire et impériale des États déjà dominants, tout en intégrant d’autres territoires comme fournisseurs de matières premières. Parler d’une seule révolution uniforme masque donc des trajectoires nationales, coloniales et régionales très diverses."
      }
    ],
    "deeper": [
      {
        "title": "Luddistes",
        "text": "Les briseurs de machines ne refusent pas toute technique : ils protestent contre des usages qui détruisent métiers, salaires et autonomie."
      },
      {
        "title": "Niveau de vie",
        "text": "La production augmente rapidement, mais l’amélioration moyenne des conditions de vie est lente et très inégalement répartie."
      },
      {
        "title": "Héritage climatique",
        "text": "Le modèle énergétique fondé sur le charbon ouvre une croissance puissante tout en installant une dépendance aux émissions de carbone."
      }
    ],
    "takeaways": [
      {
        "label": "Système",
        "text": "Machines, énergie, capitaux, marchés et travail se renforcent mutuellement."
      },
      {
        "label": "Usine",
        "text": "Elle concentre la production et impose une nouvelle discipline du temps."
      },
      {
        "label": "Conflits",
        "text": "Les droits sociaux sont conquis dans les tensions de l’industrialisation."
      },
      {
        "label": "Inégalités",
        "text": "Le phénomène est mondial mais jamais uniforme."
      }
    ],
    "quiz": [
      {
        "kind": "causes",
        "q": "Pourquoi la vapeur ne suffit-elle pas à expliquer l’industrialisation ?",
        "a": "Parce qu’elle devient décisive seulement avec charbon, capitaux, usines, transports et marchés.",
        "choices": [
          "Parce qu’elle n’a jamais été utilisée dans les usines.",
          "Parce que toutes les machines fonctionnent uniquement à l’eau.",
          "Parce que la production industrielle commence seulement au XXe siècle."
        ],
        "why": "L’industrialisation est un système cumulatif.",
        "trap": "",
        "evidence": "Sections 1 et 2."
      },
      {
        "kind": "travail",
        "q": "Qu’est-ce que l’usine change principalement dans l’organisation du travail ?",
        "a": "Elle concentre machines et travailleurs sous horaires, règles et surveillance.",
        "choices": [
          "Elle supprime immédiatement tout travail à domicile.",
          "Elle donne à chaque ouvrier la propriété de sa machine.",
          "Elle remplace le salaire par un partage égal des profits."
        ],
        "why": "La concentration modifie les rapports de pouvoir.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "société",
        "q": "Pourquoi les lois sociales apparaissent-elles ?",
        "a": "Parce que les conditions de travail, les mobilisations et les crises sanitaires rendent les coûts sociaux visibles.",
        "choices": [
          "Parce que les machines exigent juridiquement des congés.",
          "Parce que les patrons suppriment spontanément le travail des enfants partout.",
          "Parce que les villes industrielles ne connaissent aucun conflit."
        ],
        "why": "Les réformes résultent de luttes et de décisions politiques.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "géographie",
        "q": "Pourquoi parle-t-on d’une industrialisation inégale ?",
        "a": "Parce que les régions se transforment à des rythmes et dans des secteurs différents.",
        "choices": [
          "Parce que seule Londres possède des machines au XIXe siècle.",
          "Parce que tous les pays suivent exactement le même calendrier.",
          "Parce que l’industrie reste sans lien avec les empires."
        ],
        "why": "Les trajectoires diffèrent selon les ressources et les États.",
        "trap": "",
        "evidence": "Section 5."
      },
      {
        "kind": "nuance",
        "q": "Quelle formule résume le mieux ses effets ?",
        "a": "Elle augmente fortement les capacités de production tout en créant de nouvelles dépendances et inégalités.",
        "choices": [
          "Elle améliore immédiatement la vie de toute la population.",
          "Elle détruit toute forme de croissance économique.",
          "Elle ne change que le textile britannique."
        ],
        "why": "Progrès productif et coûts sociaux coexistent.",
        "trap": "",
        "evidence": "Ensemble du cours."
      }
    ],
    "editorialRevision": "beta236-premium-core"
  },
  "history-cold-war-bipolar-world": {
    "hook": "La guerre froide est dite « froide » parce que les États-Unis et l’URSS évitent une guerre directe, non parce qu’elle serait sans morts. Elle structure alliances, coups d’État, propagandes, guerres locales et menace nucléaire pendant plus de quarante ans.",
    "keyFacts": [
      "Deux superpuissances dominent l’après-1945",
      "La dissuasion nucléaire limite la guerre directe sans supprimer le danger",
      "OTAN et pacte de Varsovie organisent les blocs",
      "Corée, Vietnam et Afghanistan sont des conflits chauds liés à la rivalité",
      "La décolonisation donne aux nouveaux États une marge de choix et de négociation"
    ],
    "express": [
      "Après 1945, les États-Unis et l’Union soviétique sortent renforcés tandis que l’Europe est affaiblie. Leur opposition mêle sécurité, idéologie, économie et influence mondiale. Le plan Marshall, la division de l’Allemagne, le blocus de Berlin puis la création de l’OTAN et du pacte de Varsovie stabilisent progressivement deux blocs, sans que chaque pays obéisse toujours parfaitement à son chef de camp.",
      "L’arme nucléaire transforme le calcul. Une attaque peut entraîner une riposte capable de détruire les deux adversaires : c’est la dissuasion. Elle réduit la probabilité d’une guerre générale, mais multiplie les crises où une erreur serait catastrophique, comme à Cuba en 1962. Espionnage, propagande, conquête spatiale et compétition technologique deviennent des terrains de confrontation.",
      "La guerre froide est brûlante en Asie, en Afrique, au Moyen-Orient et en Amérique latine. Des acteurs locaux poursuivent leurs propres objectifs dans les guerres de Corée, du Vietnam ou d’Afghanistan. À partir des années 1970, détente et reprise des tensions alternent. L’effondrement du bloc soviétique puis de l’URSS en 1991 met fin au système bipolaire, sans effacer ses frontières, arsenaux et mémoires."
    ],
    "complete": [
      {
        "title": "1. De l’alliance contre Hitler à la méfiance",
        "text": "États-Unis, Royaume-Uni et URSS ont combattu ensemble l’Allemagne nazie, mais leurs intérêts restent différents. Moscou veut une zone de sécurité en Europe de l’Est après des invasions dévastatrices ; Washington défend des marchés ouverts et des régimes alliés. En 1947, doctrine Truman et plan Marshall présentent l’endiguement du communisme comme une priorité. De son côté, l’URSS consolide des gouvernements communistes dans son voisinage."
      },
      {
        "title": "2. Berlin, symbole d’un monde coupé",
        "text": "L’Allemagne et Berlin sont divisées en zones d’occupation. En 1948-1949, l’URSS bloque les accès terrestres à Berlin-Ouest ; les Occidentaux répondent par un pont aérien. Deux États allemands apparaissent ensuite. Le mur construit en 1961 vise surtout à empêcher les départs depuis l’Est. Il devient le symbole d’une frontière politique, économique et humaine au cœur de l’Europe."
      },
      {
        "title": "3. La dissuasion nucléaire",
        "text": "Après 1949, les deux puissances possèdent l’arme atomique puis thermonucléaire. Sous-marins, bombardiers et missiles garantissent une capacité de seconde frappe : même attaqué, un camp peut encore riposter. Cette vulnérabilité mutuelle stabilise paradoxalement la relation tout en rendant chaque alerte dangereuse. Les dirigeants cherchent donc des canaux de communication et des accords limitant certains armements."
      },
      {
        "title": "4. Des guerres locales, des logiques propres",
        "text": "En Corée, la partition issue de 1945 mène à une guerre internationale. Au Vietnam, lutte anticoloniale, guerre civile et rivalité des blocs se combinent. En Afghanistan, l’intervention soviétique affronte des résistances soutenues notamment par les États-Unis et le Pakistan. Réduire ces conflits à des marionnettes de Moscou et Washington efface les nationalismes, divisions sociales et stratégies locales."
      },
      {
        "title": "5. Détente, crise soviétique et fin du bloc",
        "text": "Dans les années 1970, accords stratégiques et dialogue réduisent certaines tensions, sans supprimer la compétition. L’économie soviétique ralentit, la guerre en Afghanistan coûte cher et les sociétés d’Europe de l’Est contestent davantage le contrôle politique. Les réformes de Gorbatchev desserrent la contrainte sans maîtriser les conséquences. En 1989, les régimes communistes européens tombent ; en 1991, l’URSS disparaît."
      }
    ],
    "deeper": [
      {
        "title": "Non-alignés",
        "text": "De nombreux États refusent de se définir comme simples membres d’un bloc et utilisent la rivalité pour négocier aides et autonomie."
      },
      {
        "title": "Course spatiale",
        "text": "Spoutnik, Gagarine et Apollo servent autant la science que la démonstration de puissance."
      },
      {
        "title": "Guerre culturelle",
        "text": "Cinéma, sport, radios, expositions et modèles de consommation participent à la compétition."
      }
    ],
    "takeaways": [
      {
        "label": "Bipolarité",
        "text": "Deux superpuissances structurent les alliances sans contrôler tous les acteurs."
      },
      {
        "label": "Dissuasion",
        "text": "La peur de la riposte limite la guerre directe."
      },
      {
        "label": "Conflits",
        "text": "La violence est réelle dans les guerres périphériques."
      },
      {
        "label": "Fin",
        "text": "1989-1991 clôt le système, pas tous ses héritages."
      }
    ],
    "quiz": [
      {
        "kind": "définition",
        "q": "Pourquoi parle-t-on de guerre froide ?",
        "a": "Parce que les deux superpuissances évitent un affrontement militaire direct tout en se combattant par d’autres moyens.",
        "choices": [
          "Parce qu’aucune guerre n’a lieu entre 1947 et 1991.",
          "Parce que le conflit se déroule uniquement dans les régions polaires.",
          "Parce que les deux pays ne possèdent pas d’armées."
        ],
        "why": "Le mot décrit la relation centrale, pas l’absence de violence.",
        "trap": "",
        "evidence": "Introduction."
      },
      {
        "kind": "nucléaire",
        "q": "Qu’est-ce qui rend la dissuasion crédible ?",
        "a": "La capacité de riposter même après avoir subi une première attaque.",
        "choices": [
          "L’interdiction totale des missiles par l’ONU.",
          "La disparition des armes nucléaires après 1945.",
          "La promesse qu’aucun dirigeant ne commettra d’erreur."
        ],
        "why": "La seconde frappe rend une victoire impossible.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "Berlin",
        "q": "Pourquoi le mur de Berlin est-il construit en 1961 ?",
        "a": "Principalement pour stopper les départs de l’Allemagne de l’Est vers l’Ouest.",
        "choices": [
          "Pour protéger Berlin-Est d’une invasion mongole.",
          "Pour réunifier immédiatement les deux Allemagnes.",
          "Pour faciliter les déplacements entre les secteurs."
        ],
        "why": "Le mur répond à une crise de fuite démographique et politique.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "conflits",
        "q": "Pourquoi les guerres locales ne sont-elles pas de simples copies de la rivalité Est-Ouest ?",
        "a": "Parce que des acteurs locaux poursuivent aussi des objectifs nationaux, sociaux et politiques propres.",
        "choices": [
          "Parce que Moscou et Washington n’y interviennent jamais.",
          "Parce qu’elles sont toutes déclenchées par la même frontière européenne.",
          "Parce qu’elles ne concernent aucune idéologie."
        ],
        "why": "Les logiques locales et mondiales se combinent.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "fin",
        "q": "Quel enchaînement marque la fin de la guerre froide ?",
        "a": "La chute des régimes communistes européens en 1989 puis la disparition de l’URSS en 1991.",
        "choices": [
          "La crise de Cuba de 1962.",
          "La construction du mur de Berlin.",
          "La création de l’OTAN en 1949."
        ],
        "why": "La bipolarité disparaît à la fin des années 1980 et au début des années 1990.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta236-premium-core"
  },
  "art-baroque-light-movement-power": {
    "hook": "Le baroque ne désigne pas seulement des décors chargés. Il met le spectateur en mouvement, transforme la lumière en événement et utilise peinture, sculpture et architecture pour rendre une présence religieuse ou politique presque physique.",
    "keyFacts": [
      "Le baroque se développe fortement dans l’Europe du XVIIe siècle",
      "Caravage dramatise l’action par la lumière et des modèles ordinaires",
      "Le Bernin fusionne sculpture, architecture et espace",
      "Rubens organise des corps en mouvement et de grandes compositions",
      "Versailles associe arts, cérémonial et pouvoir monarchique"
    ],
    "express": [
      "Autour de 1600, des artistes cherchent à produire une expérience immédiate. Chez Caravage, un faisceau lumineux découpe des visages et des gestes au milieu d’une obscurité dense. Les saints ressemblent à des personnes réelles, avec pieds sales, rides et émotions. Cette proximité donne aux épisodes religieux une force théâtrale qui répond aux attentes de l’Église catholique après les Réformes.",
      "Le Bernin pousse plus loin l’union des arts. Dans L’Extase de sainte Thérèse, sculpture, lumière cachée, marbres colorés et architecture transforment une chapelle en scène. Ses places et fontaines organisent aussi la circulation des corps dans la ville. Le baroque veut souvent que l’œuvre déborde son cadre et implique physiquement celui qui regarde.",
      "Dans les cours européennes, le spectaculaire sert également le pouvoir. Rubens peint des cycles où politique, mythologie et mouvement se mêlent. À Versailles, axe, jardins, galerie des Glaces, fêtes et étiquette construisent l’image d’une monarchie centrale. Pourtant, il n’existe pas un baroque unique : les formes varient selon régions, confessions, commanditaires et traditions locales."
    ],
    "complete": [
      {
        "title": "1. Une réponse visuelle à un temps de conflits religieux",
        "text": "Après les Réformes protestantes, l’Église catholique renforce formation du clergé, missions et usages des images. Les œuvres doivent instruire, émouvoir et rendre les récits accessibles. Cela ne signifie pas qu’un pape dicte un style unique. Mais commandes d’églises, chapelles et confréries favorisent des images lisibles, dramatiques et capables d’engager les sens."
      },
      {
        "title": "2. Caravage : lumière et présence",
        "text": "Caravage place souvent l’action près du spectateur. Le fond sombre élimine les distractions tandis qu’une lumière oblique révèle l’instant décisif. Son clair-obscur n’est pas qu’un effet esthétique : il organise le récit et la conversion du regard. Ses modèles populaires choquent parfois parce qu’ils réduisent la distance entre monde sacré et corps quotidien."
      },
      {
        "title": "3. Le Bernin et l’œuvre totale",
        "text": "Sculpteur, architecte et organisateur de fêtes, Gian Lorenzo Bernini pense l’espace comme un ensemble. Les drapés semblent bouger, la pierre imite chair, nuage ou tissu, et la lumière réelle participe à la scène. La colonnade de la place Saint-Pierre encadre une foule immense tout en donnant au lieu une forme symbolique d’accueil."
      },
      {
        "title": "4. Peindre le mouvement et la puissance",
        "text": "Rubens construit des diagonales, torsions et couleurs chaudes qui donnent l’impression d’une action continue. Ses grands ateliers permettent de répondre à des commandes internationales. Le travail est collectif : assistants, spécialistes des animaux ou des paysages et maître coordonnent la production. Le chef-d’œuvre baroque est souvent aussi une entreprise organisée."
      },
      {
        "title": "5. Versailles : art, espace et cérémonial",
        "text": "Louis XIV ne gouverne pas uniquement par les bâtiments, mais Versailles met en scène l’ordre monarchique. Les nobles sont attirés à la cour, observés dans un cérémonial précis et intégrés à une hiérarchie visible. Jardins géométriques, perspectives, mythologie solaire et fêtes suggèrent un pouvoir capable d’ordonner nature et société. L’art devient ici un instrument parmi d’autres de gouvernement."
      }
    ],
    "deeper": [
      {
        "title": "Baroque ou classique ?",
        "text": "En France, les catégories se chevauchent : Versailles associe contrôle classique, effets spectaculaires et cérémonial baroque."
      },
      {
        "title": "Colonies et métissages",
        "text": "Dans les Amériques, artistes locaux adaptent formes européennes, matériaux, motifs et traditions propres."
      },
      {
        "title": "Regarder",
        "text": "Cherche la source de lumière, les diagonales, le point de vue et la place prévue pour le spectateur."
      }
    ],
    "takeaways": [
      {
        "label": "Lumière",
        "text": "Elle construit l’action et dirige l’émotion."
      },
      {
        "label": "Mouvement",
        "text": "Les œuvres semblent déborder leur cadre."
      },
      {
        "label": "Pouvoir",
        "text": "Le spectaculaire sert religion et monarchie."
      },
      {
        "label": "Pluralité",
        "text": "Le baroque varie selon les lieux et les commandes."
      }
    ],
    "quiz": [
      {
        "kind": "peinture",
        "q": "À quoi sert le clair-obscur chez Caravage ?",
        "a": "À isoler l’action, guider le regard et dramatiser une présence.",
        "choices": [
          "À supprimer toute différence entre les personnages.",
          "À rendre les couleurs uniformément pastel.",
          "À montrer uniquement des paysages lointains."
        ],
        "why": "La lumière organise le récit.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "sculpture",
        "q": "Pourquoi parle-t-on d’œuvre totale chez le Bernin ?",
        "a": "Parce qu’il coordonne sculpture, architecture, lumière et position du spectateur.",
        "choices": [
          "Parce qu’il refuse toute architecture autour de ses statues.",
          "Parce qu’il travaille uniquement de petits objets privés.",
          "Parce qu’il interdit l’usage de marbres colorés."
        ],
        "why": "Les arts coopèrent pour produire une expérience.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "atelier",
        "q": "Que révèle l’atelier de Rubens ?",
        "a": "Que les grandes commandes reposent sur une production collective coordonnée par le maître.",
        "choices": [
          "Que Rubens peint seul chaque centimètre de toutes ses œuvres.",
          "Que la peinture baroque exclut les commandes internationales.",
          "Que les assistants ne possèdent aucune spécialité."
        ],
        "why": "La création est aussi une organisation du travail.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "politique",
        "q": "Comment Versailles participe-t-il au pouvoir royal ?",
        "a": "En mettant en scène une hiérarchie et en intégrant la noblesse au cérémonial de cour.",
        "choices": [
          "En supprimant toute règle de préséance.",
          "En éloignant définitivement le roi de ses courtisans.",
          "En transformant la monarchie en démocratie directe."
        ],
        "why": "L’espace rend l’ordre politique visible.",
        "trap": "",
        "evidence": "Section 5."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi faut-il éviter de définir le baroque comme un simple excès décoratif ?",
        "a": "Parce qu’il organise lumière, mouvement, espace et relation au spectateur selon des objectifs précis.",
        "choices": [
          "Parce que toutes les œuvres baroques sont entièrement dépouillées.",
          "Parce que le baroque ne concerne que la musique.",
          "Parce qu’il n’existe aucune commande religieuse au XVIIe siècle."
        ],
        "why": "Le décor n’est qu’un élément d’une mise en scène plus large.",
        "trap": "",
        "evidence": "Ensemble du cours."
      }
    ],
    "editorialRevision": "beta236-premium-core"
  },
  "cinema-new-wave-auteur-street-editing": {
    "hook": "La Nouvelle Vague n’est pas seulement une caméra légère dans Paris. Elle naît d’une génération de critiques qui veulent prouver qu’un film peut porter une écriture personnelle, même au sein d’un art industriel.",
    "keyFacts": [
      "Les Cahiers du cinéma forment plusieurs futurs réalisateurs",
      "Les tournages en décors réels profitent de caméras et pellicules plus mobiles",
      "Les récits utilisent ellipses, adresses au spectateur et faux raccords",
      "Agnès Varda précède et élargit le récit centré sur les critiques masculins",
      "La notion d’auteur valorise la mise en scène sans effacer le travail collectif"
    ],
    "express": [
      "À la fin des années 1950, François Truffaut, Jean-Luc Godard, Claude Chabrol, Éric Rohmer et Jacques Rivette passent de la critique à la réalisation. Ils admirent des cinéastes comme Hitchcock ou Hawks, capables selon eux d’imposer une vision personnelle dans le système des studios. Leur politique des auteurs conteste l’idée qu’un bon film serait seulement une adaptation littéraire prestigieuse.",
      "Les nouvelles caméras, les équipes réduites et les décors naturels facilitent des tournages moins lourds. Les Quatre Cents Coups suit un adolescent dans Paris avec une énergie documentaire. À bout de souffle multiplie faux raccords, regards caméra et citations. Mais la liberté n’exclut pas le travail : choix de montage, direction d’acteurs et connaissance du cinéma sont très construits.",
      "Agnès Varda tourne La Pointe Courte avant l’explosion médiatique de 1959 et développe dans Cléo de 5 à 7 une relation singulière entre temps réel, ville et regard féminin. Parler de Nouvelle Vague exige donc de dépasser une liste de jeunes hommes. Le mouvement transforme durablement l’idée d’auteur, les conditions de production et la manière dont les cinéastes du monde entier peuvent affirmer une voix personnelle."
    ],
    "complete": [
      {
        "title": "1. Des cinéphiles contre le « cinéma de qualité »",
        "text": "Dans les Cahiers du cinéma, de jeunes critiques reprochent à une partie du cinéma français son académisme, ses scénarios littéraires et sa mise en scène jugée impersonnelle. Ils défendent au contraire Renoir, Hitchcock, Rossellini ou Hawks. Leur polémique est souvent injuste envers des scénaristes et réalisateurs antérieurs, mais elle impose une question durable : où se reconnaît la signature d’un cinéaste ?"
      },
      {
        "title": "2. Produire plus léger",
        "text": "Les budgets réduits imposent peu de décors construits, des équipes compactes et des acteurs parfois débutants. Les rues, cafés et appartements deviennent des lieux de tournage. Des caméras plus légères et des pellicules sensibles rendent cette mobilité possible. Cette économie n’est pas seulement une contrainte : elle devient un style fait d’imprévu, de circulation et de proximité avec les corps."
      },
      {
        "title": "3. Casser la continuité sans perdre le spectateur",
        "text": "Godard coupe parfois à l’intérieur d’une même prise, créant le jump cut. D’autres films utilisent voix off, ellipses brutales, arrêts sur image ou adresses directes. Ces ruptures rappellent que le film est fabriqué. Elles ne signifient pas que toutes les règles disparaissent : le spectateur suit encore des personnages, des désirs et des rythmes soigneusement organisés."
      },
      {
        "title": "4. Varda, Resnais et les frontières du mouvement",
        "text": "Agnès Varda vient de la photographie et tourne La Pointe Courte en 1954. Alain Resnais, Chris Marker ou Marguerite Duras explorent mémoire, documentaire et montage dans ce que l’on appelle parfois la Rive gauche. Les catégories sont utiles mais imparfaites. Elles montrent surtout qu’un même moment français produit plusieurs façons de rompre avec les récits classiques."
      },
      {
        "title": "5. L’auteur, une idée féconde mais incomplète",
        "text": "La notion d’auteur aide à relier cadrage, montage, thèmes et direction d’acteurs sur plusieurs films. Elle permet de reconnaître une cohérence artistique. Mais un film reste collectif : producteur, scénariste, chef opérateur, monteuse, décorateurs et acteurs participent au résultat. Utiliser l’auteur comme outil d’analyse ne doit pas transformer la réalisation en génie solitaire."
      }
    ],
    "deeper": [
      {
        "title": "Festival de Cannes",
        "text": "Les Quatre Cents Coups reçoit le prix de la mise en scène en 1959, accélérant la reconnaissance internationale."
      },
      {
        "title": "Son direct",
        "text": "Les contraintes techniques conduisent parfois à postsynchroniser, malgré l’impression de spontanéité."
      },
      {
        "title": "Héritage",
        "text": "Du Nouvel Hollywood aux cinémas indépendants, produire léger et revendiquer une voix devient un modèle mondial."
      }
    ],
    "takeaways": [
      {
        "label": "Critique",
        "text": "Le mouvement naît aussi d’une bataille d’idées sur la mise en scène."
      },
      {
        "label": "Production",
        "text": "La légèreté technique ouvre de nouveaux espaces de tournage."
      },
      {
        "label": "Forme",
        "text": "Ellipses et faux raccords rendent le montage visible."
      },
      {
        "label": "Auteur",
        "text": "Une signature artistique n’efface pas le collectif."
      }
    ],
    "quiz": [
      {
        "kind": "origine",
        "q": "Quel milieu forme plusieurs réalisateurs de la Nouvelle Vague ?",
        "a": "La critique cinématographique, notamment aux Cahiers du cinéma.",
        "choices": [
          "Les studios hollywoodiens des années 1930.",
          "Les écoles de peinture baroque.",
          "Les compagnies de théâtre antique."
        ],
        "why": "Ils développent d’abord une théorie de la mise en scène.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "technique",
        "q": "Pourquoi les décors réels deviennent-ils importants ?",
        "a": "Parce que des équipes et caméras plus mobiles permettent de tourner rapidement dans la ville.",
        "choices": [
          "Parce que les studios sont interdits par la loi.",
          "Parce que les films n’utilisent plus aucun éclairage.",
          "Parce que tous les acteurs refusent les plateaux."
        ],
        "why": "La contrainte économique devient un choix esthétique.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "montage",
        "q": "Qu’est-ce qu’un jump cut ?",
        "a": "Une coupe visible à l’intérieur d’une continuité qui fait sauter une partie du mouvement ou du temps.",
        "choices": [
          "Un lent fondu entre deux paysages.",
          "Un plan tourné sans aucune coupe.",
          "Un déplacement de caméra sur une grue."
        ],
        "why": "Godard rend la coupe perceptible.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "historiographie",
        "q": "Pourquoi Agnès Varda est-elle importante dans ce récit ?",
        "a": "Parce qu’elle tourne avant 1959 et développe une voie originale souvent minorée dans le récit masculin du mouvement.",
        "choices": [
          "Parce qu’elle dirige les Cahiers du cinéma depuis 1930.",
          "Parce qu’elle refuse tout tournage en extérieur.",
          "Parce qu’elle réalise uniquement des westerns."
        ],
        "why": "Elle oblige à élargir les frontières du mouvement.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "auteur",
        "q": "Quelle limite faut-il poser à la politique des auteurs ?",
        "a": "La cohérence d’un réalisateur ne doit pas effacer la nature collective du cinéma.",
        "choices": [
          "Un réalisateur n’a jamais aucune influence sur un film.",
          "Seul le producteur décide de toutes les images.",
          "Un film ne peut pas avoir de style reconnaissable."
        ],
        "why": "L’auteur est un outil, pas un culte du génie solitaire.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta236-premium-core"
  },
  "sci-newton-motion-universal-gravitation": {
    "hook": "Newton réunit le mouvement d’une pierre, la chute d’une pomme et l’orbite de la Lune dans un même cadre mathématique. Le ciel et la Terre cessent alors d’obéir à deux physiques séparées.",
    "keyFacts": [
      "Les trois lois du mouvement relient forces et changements de vitesse",
      "L’inertie décrit le mouvement en l’absence de force résultante",
      "Action et réaction agissent sur deux corps différents",
      "La gravitation universelle dépend des masses et de la distance",
      "Les lois de Newton restent une excellente approximation à vitesse ordinaire"
    ],
    "express": [
      "Au XVIIe siècle, Galilée a montré que le mouvement peut être étudié par la mesure et que la chute ne dépend pas simplement du poids. Kepler a décrit mathématiquement les orbites planétaires. Newton relie ces travaux dans les Principia de 1687 : un corps conserve son état de mouvement si aucune force résultante ne le modifie, et l’accélération dépend de la force et de la masse.",
      "La gravitation universelle affirme que deux masses s’attirent. La force augmente avec leurs masses et diminue rapidement avec le carré de la distance. La Lune ne tombe pas sur la Terre parce qu’elle possède une vitesse latérale : elle chute continuellement tout en manquant la surface. Une orbite est donc une chute libre courbée, pas l’absence de gravité.",
      "Les lois de Newton permettent de prévoir trajectoires, marées, mouvements des planètes, machines et ponts. Elles ne sont pourtant pas la vérité finale. À très grande vitesse ou dans des champs gravitationnels extrêmes, la relativité d’Einstein devient nécessaire ; à l’échelle atomique, la physique quantique domine. Une théorie peut être limitée tout en restant extraordinairement utile."
    ],
    "complete": [
      {
        "title": "1. L’inertie contre l’intuition quotidienne",
        "text": "Dans la vie courante, un objet glissant finit par s’arrêter à cause des frottements. Cela donne l’impression qu’un mouvement doit être constamment entretenu. Newton affirme au contraire qu’en l’absence de force résultante, un corps reste au repos ou poursuit un mouvement rectiligne uniforme. L’inertie ne signifie pas qu’aucune force n’existe, mais que leurs effets peuvent se compenser."
      },
      {
        "title": "2. Force, masse et accélération",
        "text": "La deuxième loi relie la somme des forces à la variation du mouvement. À force égale, une masse plus grande accélère moins. Cette relation oblige à distinguer vitesse et accélération : un objet peut aller très vite tout en ayant une accélération nulle, ou changer de direction sans augmenter sa vitesse. Les forces expliquent les changements de mouvement, pas le mouvement lui-même."
      },
      {
        "title": "3. Action et réaction",
        "text": "Quand un pied pousse le sol vers l’arrière, le sol pousse le corps vers l’avant. Une fusée expulse des gaz dans une direction et reçoit une impulsion opposée. Les deux forces sont égales et opposées, mais elles ne s’annulent pas car elles s’exercent sur des corps différents. Cette précision évite un contresens fréquent sur la troisième loi."
      },
      {
        "title": "4. Une gravitation universelle",
        "text": "La même interaction attire la pomme vers la Terre et maintient la Lune en orbite. Newton formule une force proportionnelle au produit des masses et inversement proportionnelle au carré de la distance. Avec cette loi et les mathématiques, les orbites elliptiques de Kepler deviennent explicables. Le mot universelle indique surtout l’unification : mêmes règles dans le ciel et sur Terre."
      },
      {
        "title": "5. Une théorie dépassée mais toujours vraie dans son domaine",
        "text": "La relativité générale explique mieux l’orbite de Mercure, la lumière déviée et les trous noirs. Pourtant, ingénieurs et astronomes utilisent encore Newton pour la plupart des bâtiments, véhicules et trajectoires spatiales ordinaires. La science n’avance pas en jetant toute théorie ancienne : elle précise son domaine de validité et construit un cadre plus général lorsque les écarts deviennent mesurables."
      }
    ],
    "deeper": [
      {
        "title": "La pomme",
        "text": "L’histoire est probablement embellie, mais Newton a bien raconté qu’une chute lui avait fait réfléchir à la gravité lunaire."
      },
      {
        "title": "Poids et masse",
        "text": "La masse mesure l’inertie ; le poids est une force gravitationnelle qui dépend du lieu."
      },
      {
        "title": "Calcul différentiel",
        "text": "Newton et Leibniz développent des outils mathématiques capables de décrire des variations continues."
      }
    ],
    "takeaways": [
      {
        "label": "Inertie",
        "text": "Sans force résultante, le mouvement ne change pas."
      },
      {
        "label": "Accélération",
        "text": "Une force modifie vitesse ou direction."
      },
      {
        "label": "Gravitation",
        "text": "La même loi relie chutes et orbites."
      },
      {
        "label": "Domaine",
        "text": "Newton reste précis dans la plupart des situations ordinaires."
      }
    ],
    "quiz": [
      {
        "kind": "inertie",
        "q": "Que devient un corps sans force résultante ?",
        "a": "Il reste au repos ou poursuit un mouvement rectiligne uniforme.",
        "choices": [
          "Il s’arrête nécessairement après quelques secondes.",
          "Il accélère spontanément vers le haut.",
          "Il tourne toujours en cercle."
        ],
        "why": "Le frottement masque souvent l’inertie.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "force",
        "q": "À force égale, comment réagit une masse plus grande ?",
        "a": "Elle acquiert une accélération plus faible.",
        "choices": [
          "Elle acquiert toujours une vitesse infinie.",
          "Elle ne peut subir aucune force.",
          "Elle accélère davantage parce qu’elle est plus lourde."
        ],
        "why": "La masse mesure la résistance au changement de mouvement.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "réaction",
        "q": "Pourquoi action et réaction ne s’annulent-elles pas ?",
        "a": "Parce qu’elles s’exercent sur deux corps différents.",
        "choices": [
          "Parce qu’elles n’ont jamais la même intensité.",
          "Parce qu’une seule des deux est réelle.",
          "Parce qu’elles agissent à des moments séparés par plusieurs heures."
        ],
        "why": "La paire relie deux objets en interaction.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "orbite",
        "q": "Pourquoi la Lune ne tombe-elle pas directement sur la Terre ?",
        "a": "Parce que sa vitesse latérale transforme sa chute en orbite autour de la Terre.",
        "choices": [
          "Parce qu’il n’existe aucune gravité à sa distance.",
          "Parce que la Lune est plus légère que l’air.",
          "Parce que le Soleil la pousse en permanence vers l’extérieur."
        ],
        "why": "Une orbite est une chute libre continue.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "science",
        "q": "Pourquoi utilise-t-on encore Newton après Einstein ?",
        "a": "Parce que ses lois restent une approximation très précise dans les vitesses et champs ordinaires.",
        "choices": [
          "Parce que la relativité a été réfutée.",
          "Parce que Newton explique mieux les trous noirs.",
          "Parce que les satellites ne subissent aucune gravité."
        ],
        "why": "Une théorie peut être limitée et utile.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta236-premium-core"
  },
  "sci-quantum-quanta-probability": {
    "hook": "La physique quantique n’affirme pas que tout est mystérieux ou que la pensée crée le réel. Elle fournit des règles extrêmement précises pour décrire lumière, atomes et particules lorsque les concepts classiques cessent de suffire.",
    "keyFacts": [
      "Planck introduit des échanges d’énergie par quanta",
      "Einstein explique l’effet photoélectrique avec des photons",
      "Les états quantiques donnent des probabilités de résultats",
      "Le principe d’incertitude ne vient pas d’un mauvais instrument",
      "Transistors, lasers et imagerie reposent sur la physique quantique"
    ],
    "express": [
      "Vers 1900, la physique classique échoue à expliquer certains rayonnements. Max Planck propose que l’énergie soit échangée par paquets, les quanta. En 1905, Einstein décrit la lumière comme des photons pour expliquer l’effet photoélectrique : augmenter l’intensité ne suffit pas si chaque photon ne possède pas l’énergie nécessaire pour arracher un électron.",
      "Bohr introduit des niveaux d’énergie atomiques, puis Heisenberg, Schrödinger, Born et Dirac construisent une théorie plus générale. Une fonction d’onde permet de calculer les probabilités de différents résultats. Avant la mesure, on ne peut pas toujours attribuer à une particule une position et une vitesse précises comme à une bille miniature. Cette limite appartient à la structure de la théorie, pas seulement à notre ignorance.",
      "La quantique est contre-intuitive mais remarquablement vérifiée. Elle explique spectres atomiques, liaisons chimiques, semi-conducteurs, lasers et résonance magnétique. Les débats sur l’interprétation restent réels, mais ils ne justifient pas les slogans selon lesquels la conscience commanderait librement la matière. Les prédictions expérimentales sont rigoureuses et souvent numériques."
    ],
    "complete": [
      {
        "title": "1. Le problème du rayonnement",
        "text": "Un objet chaud émet un spectre de lumière. Les équations classiques prédisent à haute fréquence une énergie infinie, catastrophe dite ultraviolette. Planck obtient la bonne courbe en supposant que les oscillateurs échangent l’énergie par quantités discrètes proportionnelles à la fréquence. Il présente d’abord l’idée comme un outil de calcul, mais elle ouvre une rupture profonde."
      },
      {
        "title": "2. Le photon et l’effet photoélectrique",
        "text": "Lorsqu’une lumière frappe certains métaux, des électrons sont émis seulement au-dessus d’une fréquence seuil. Une lumière très intense mais trop rouge n’arrache rien, tandis qu’une lumière moins intense mais plus énergétique fonctionne. Einstein explique ce comportement en attribuant à chaque photon une énergie liée à sa fréquence. L’intensité détermine surtout le nombre de photons."
      },
      {
        "title": "3. Atomes, niveaux et spectres",
        "text": "Les atomes n’émettent pas toutes les couleurs, mais des raies précises. Cela indique des niveaux d’énergie autorisés. Un électron qui change de niveau absorbe ou émet un photon correspondant à la différence d’énergie. Le modèle de Bohr reste limité, mais il impose l’idée de quantification. La mécanique quantique moderne décrit plutôt des orbitales, qui sont des distributions de probabilité."
      },
      {
        "title": "4. Probabilité et incertitude",
        "text": "La théorie permet de prédire avec précision la distribution des résultats sur un grand nombre d’expériences, sans toujours annoncer le résultat individuel. Le principe d’incertitude relie certaines grandeurs comme position et quantité de mouvement : un état très localisé en position possède nécessairement une dispersion plus large en mouvement. Il ne s’agit pas simplement d’un microscope maladroit qui dérangerait l’objet."
      },
      {
        "title": "5. Une théorie au cœur de la technologie",
        "text": "Les bandes d’énergie expliquent pourquoi un matériau conduit, isole ou devient semi-conducteur. Les transistors contrôlent des courants dans les puces. Les lasers exploitent des transitions quantifiées et une émission stimulée. Les horloges atomiques, capteurs et techniques médicales dépendent aussi de phénomènes quantiques. La théorie la plus étrange du XXe siècle est donc également l’une des plus pratiques."
      }
    ],
    "deeper": [
      {
        "title": "Chat de Schrödinger",
        "text": "Cette expérience de pensée critique le passage du monde quantique aux objets macroscopiques ; elle ne dit pas que les chats ordinaires sont vraiment morts et vivants."
      },
      {
        "title": "Interprétations",
        "text": "Copenhague, mondes multiples et autres lectures diffèrent sur le sens, pas sur la plupart des calculs testés."
      },
      {
        "title": "Intrication",
        "text": "Des corrélations quantiques dépassent les modèles classiques sans permettre d’envoyer un message plus vite que la lumière."
      }
    ],
    "takeaways": [
      {
        "label": "Quanta",
        "text": "Certains échanges d’énergie sont discrets."
      },
      {
        "label": "Probabilité",
        "text": "La théorie prédit des distributions de résultats."
      },
      {
        "label": "Incertitude",
        "text": "Certaines précisions sont incompatibles dans un même état."
      },
      {
        "label": "Applications",
        "text": "Électronique et lasers reposent sur ces règles."
      }
    ],
    "quiz": [
      {
        "kind": "Planck",
        "q": "Pourquoi Planck introduit-il les quanta ?",
        "a": "Pour obtenir une description correcte du rayonnement des corps chauds.",
        "choices": [
          "Pour expliquer les orbites de Mars.",
          "Pour démontrer que l’énergie est toujours infinie.",
          "Pour remplacer toutes les expériences par la philosophie."
        ],
        "why": "La quantification résout un échec classique.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "photon",
        "q": "Que montre l’effet photoélectrique ?",
        "a": "La fréquence de la lumière détermine l’énergie de chaque photon et l’existence d’un seuil.",
        "choices": [
          "Seule la couleur rouge peut éjecter des électrons.",
          "L’intensité suffit toujours, quelle que soit la fréquence.",
          "Les électrons sortent sans absorber d’énergie."
        ],
        "why": "L’énergie arrive par photons.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "atome",
        "q": "Que représentent les orbitales en mécanique quantique ?",
        "a": "Des distributions de probabilité associées aux états électroniques.",
        "choices": [
          "Des trajectoires planétaires exactes autour du noyau.",
          "Des tubes matériels fixés dans l’atome.",
          "Des zones où aucun électron ne peut jamais être détecté."
        ],
        "why": "Le modèle n’est pas celui de petites planètes.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "incertitude",
        "q": "D’où vient principalement le principe d’incertitude ?",
        "a": "De la structure des états quantiques, pas seulement d’instruments imparfaits.",
        "choices": [
          "D’un manque temporaire de microscopes puissants.",
          "De la chaleur produite par toutes les mesures.",
          "Du refus des scientifiques de calculer précisément."
        ],
        "why": "La limite est théorique et mesurable.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "applications",
        "q": "Quelle technologie dépend directement de la physique quantique ?",
        "a": "Le transistor utilisé dans les circuits électroniques.",
        "choices": [
          "La roue en bois antique.",
          "Le moulin à vent médiéval uniquement.",
          "La voile carrée des navires."
        ],
        "why": "Les semi-conducteurs sont quantiques.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta236-premium-core"
  },
  "astro-moon-phases-eclipses-tides": {
    "hook": "La Lune ne change pas de forme et son ombre ne produit pas ses phases. Ce que nous voyons dépend de la portion éclairée par le Soleil et de la géométrie mouvante entre Soleil, Terre et Lune.",
    "keyFacts": [
      "La moitié de la Lune est presque toujours éclairée par le Soleil",
      "Les phases dépendent de l’angle Soleil-Terre-Lune",
      "Une éclipse exige un alignement près des nœuds orbitaux",
      "La rotation synchrone montre presque toujours la même face",
      "Les marées viennent surtout des différences d’attraction gravitationnelle"
    ],
    "express": [
      "À tout instant, le Soleil éclaire environ une moitié de la Lune. Depuis la Terre, nous voyons une fraction variable de cette moitié : nouvelle Lune, premier quartier, pleine Lune puis dernier quartier. Le cycle des phases dure environ 29,5 jours. L’ombre de la Terre n’intervient que lors d’une éclipse lunaire, événement beaucoup plus rare.",
      "Les éclipses ne se produisent pas chaque mois parce que l’orbite lunaire est inclinée d’environ cinq degrés par rapport au plan de l’orbite terrestre. Il faut que la Lune passe près d’un nœud au moment de la nouvelle ou de la pleine Lune. Une éclipse solaire projette l’ombre de la Lune sur une petite zone terrestre ; une éclipse lunaire plonge la Lune dans l’ombre de la Terre.",
      "La Lune tourne sur elle-même exactement en un tour orbital environ : cette rotation synchrone explique pourquoi nous voyons presque toujours la même face. Sa gravité déforme les océans terrestres et crée deux renflements principaux. La rotation de la Terre fait passer les côtes à travers ces zones, mais la forme des bassins et des littoraux modifie fortement les horaires et amplitudes locales."
    ],
    "complete": [
      {
        "title": "1. Les phases sont une question de point de vue",
        "text": "À la nouvelle Lune, la Lune se trouve approximativement entre la Terre et le Soleil : sa face éclairée regarde surtout à l’opposé de nous. Au premier quartier, nous voyons la moitié de l’hémisphère éclairé ; à la pleine Lune, la Terre se trouve approximativement entre Soleil et Lune. Le mot quartier décrit la position dans le cycle, pas la fraction visible du disque."
      },
      {
        "title": "2. Croissante ou décroissante",
        "text": "Entre nouvelle et pleine Lune, la partie éclairée visible augmente : la Lune est croissante. Après la pleine Lune, elle décroît. L’heure de lever change également : une pleine Lune se lève autour du coucher du Soleil, tandis qu’un premier quartier est visible surtout l’après-midi et le soir. Les phases permettent donc de relier forme apparente, position et horaire."
      },
      {
        "title": "3. Pourquoi les éclipses sont rares",
        "text": "L’orbite de la Lune coupe le plan de l’écliptique en deux nœuds. La plupart des nouvelles Lunes passent au-dessus ou au-dessous du Soleil apparent, et les pleines Lunes évitent l’ombre terrestre. Les saisons d’éclipses surviennent lorsque la ligne des nœuds est bien orientée. Une totalité solaire n’est visible que dans une bande étroite, ce qui la rend rare pour un lieu donné."
      },
      {
        "title": "4. La même face, mais pas exactement la moitié",
        "text": "Les forces de marée ont progressivement synchronisé rotation et révolution lunaires. La Lune tourne donc bien sur elle-même ; si elle ne tournait pas, nous verrions toutes ses faces au cours d’une orbite. Grâce aux librations, petits balancements apparents dus à l’orbite et à notre point de vue, environ 59 % de sa surface est visible depuis la Terre au fil du temps."
      },
      {
        "title": "5. Les marées : gravité différentielle et géographie",
        "text": "La face terrestre proche de la Lune est attirée un peu plus fortement que le centre, et la face opposée un peu moins. Cette différence étire le système Terre-océans et produit deux bosses. Le Soleil participe aussi : marées plus fortes près des nouvelles et pleines Lunes, plus faibles aux quartiers. Les cartes locales dépendent ensuite de la profondeur, des baies et des résonances océaniques."
      }
    ],
    "deeper": [
      {
        "title": "Face cachée",
        "text": "Elle n’est pas toujours sombre : elle reçoit autant de lumière solaire que la face visible au cours d’un mois."
      },
      {
        "title": "Lune rouge",
        "text": "Lors d’une éclipse lunaire, l’atmosphère terrestre dévie surtout la lumière rouge vers l’ombre."
      },
      {
        "title": "Éloignement",
        "text": "Les interactions de marée ralentissent très légèrement la rotation terrestre et éloignent la Lune de quelques centimètres par an."
      }
    ],
    "takeaways": [
      {
        "label": "Phases",
        "text": "Elles viennent de la géométrie d’éclairage."
      },
      {
        "label": "Éclipses",
        "text": "Elles exigent un alignement près des nœuds."
      },
      {
        "label": "Rotation",
        "text": "La Lune tourne en même temps qu’elle orbite."
      },
      {
        "label": "Marées",
        "text": "Elles résultent d’une attraction gravitationnelle différentielle."
      }
    ],
    "quiz": [
      {
        "kind": "phases",
        "q": "Quelle est la cause des phases lunaires ?",
        "a": "La fraction variable de la moitié éclairée que nous voyons depuis la Terre.",
        "choices": [
          "L’ombre de la Terre qui traverse la Lune chaque semaine.",
          "Un changement réel de la forme de la Lune.",
          "Des nuages situés dans l’atmosphère lunaire."
        ],
        "why": "L’éclairage solaire reste, le point de vue change.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "éclipses",
        "q": "Pourquoi n’y a-t-il pas d’éclipse à chaque pleine ou nouvelle Lune ?",
        "a": "Parce que l’orbite lunaire est inclinée et que l’alignement près des nœuds est rare.",
        "choices": [
          "Parce que le Soleil s’éteint certains mois.",
          "Parce que la Lune change de distance chaque jour.",
          "Parce que les éclipses ne peuvent avoir lieu qu’en hiver."
        ],
        "why": "L’inclinaison fait généralement manquer l’alignement.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "rotation",
        "q": "Pourquoi voit-on presque toujours la même face ?",
        "a": "Parce que la Lune tourne sur elle-même en environ le même temps qu’elle fait une orbite.",
        "choices": [
          "Parce que la Lune ne tourne pas du tout.",
          "Parce que l’autre face ne reçoit jamais de lumière.",
          "Parce que la Terre masque la moitié opposée en permanence."
        ],
        "why": "C’est une rotation synchrone.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "marées",
        "q": "Pourquoi existe-t-il deux renflements de marée principaux ?",
        "a": "Parce que l’attraction lunaire varie entre la face proche, le centre et la face opposée de la Terre.",
        "choices": [
          "Parce que deux Lunes orbitent autour de la Terre.",
          "Parce que les océans sont repoussés uniquement par le vent.",
          "Parce que la Terre cesse de tourner deux fois par jour."
        ],
        "why": "Les marées viennent d’un gradient gravitationnel.",
        "trap": "",
        "evidence": "Section 5."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi les horaires de marée diffèrent-ils selon les côtes ?",
        "a": "Parce que profondeur, forme des bassins et résonances modifient la réponse locale.",
        "choices": [
          "Parce que la gravité lunaire disparaît sur certains continents.",
          "Parce que le Soleil n’éclaire pas tous les océans.",
          "Parce que chaque mer possède sa propre Lune."
        ],
        "why": "La géographie locale transforme le signal astronomique.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta236-premium-core"
  },
  "astro-space-race-apollo-11": {
    "hook": "Apollo 11 n’est pas le résultat d’une marche naturelle vers la Lune. C’est l’aboutissement d’une compétition politique lancée par les succès soviétiques, rendue possible par des budgets immenses, des risques élevés et le travail de centaines de milliers de personnes.",
    "keyFacts": [
      "Spoutnik ouvre l’ère spatiale en 1957",
      "Gagarine devient le premier humain en orbite en 1961",
      "Kennedy fixe l’objectif lunaire avant la fin des années 1960",
      "Apollo 11 alunit le 20 juillet 1969",
      "Le programme produit science et prestige mais coûte très cher"
    ],
    "express": [
      "Le lancement soviétique de Spoutnik en 1957 choque les États-Unis : le même lanceur capable de placer un satellite peut suggérer une avance dans les missiles. En 1961, Youri Gagarine effectue le premier vol orbital habité. Quelques semaines plus tard, John F. Kennedy engage son pays à envoyer un homme sur la Lune et à le ramener avant la fin de la décennie.",
      "L’objectif exige une chaîne technique entière : fusée Saturn V, capsule de commande, module lunaire, navigation, ordinateurs, combinaisons et réseau mondial de suivi. Les programmes Mercury et Gemini testent survie, rendez-vous orbital et sorties dans l’espace. L’incendie d’Apollo 1 en 1967 tue trois astronautes et force la NASA à revoir procédures et conception.",
      "Le 20 juillet 1969, Neil Armstrong et Buzz Aldrin se posent dans la mer de la Tranquillité tandis que Michael Collins reste en orbite. Six missions Apollo alunissent au total. Les échantillons lunaires transforment la connaissance de la Lune et de l’histoire du Système solaire. Mais le coût, la guerre du Vietnam et la baisse de l’intérêt politique conduisent à l’arrêt après Apollo 17 en 1972."
    ],
    "complete": [
      {
        "title": "1. Une course née de la guerre froide",
        "text": "Les fusées spatiales héritent en partie des missiles développés pendant et après la Seconde Guerre mondiale. États-Unis et URSS recrutent ingénieurs et utilisent l’espace comme vitrine de leur système. Spoutnik transmet seulement un bip, mais son effet politique est immense. L’espace devient un domaine où science, armée, éducation et prestige national se mélangent."
      },
      {
        "title": "2. Gagarine et le défi de Kennedy",
        "text": "Le vol de Gagarine montre que l’URSS maîtrise lanceur, capsule, rentrée atmosphérique et suivi orbital. Kennedy choisit la Lune parce que l’objectif est spectaculaire et que les deux pays doivent encore résoudre une grande partie du problème. Il ne promet pas une victoire scientifique abstraite : il fixe un calendrier politique mobilisateur, avec un budget fédéral exceptionnel."
      },
      {
        "title": "3. Apprendre par étapes",
        "text": "Mercury vérifie qu’un humain peut vivre et travailler en orbite. Gemini développe rendez-vous, amarrage et sorties extravéhiculaires. Apollo adopte le rendez-vous en orbite lunaire : un module léger descend, puis rejoint la capsule restée autour de la Lune. Cette architecture réduit la masse à poser et à redécoller, mais exige une navigation très précise."
      },
      {
        "title": "4. Risques, accidents et travail collectif",
        "text": "Apollo 1 révèle les dangers d’une cabine pressurisée en oxygène pur, de matériaux inflammables et d’une trappe difficile à ouvrir. Les modifications qui suivent montrent que la réussite dépend aussi d’une culture de sécurité. Environ 400 000 personnes travaillent directement ou indirectement au programme : ouvrières, programmeuses, ingénieurs, techniciens, contrôleurs et sous-traitants."
      },
      {
        "title": "5. Science, images et héritage",
        "text": "Les astronautes installent des instruments et rapportent des roches qui confortent l’idée d’une Lune formée après un impact géant. Les retransmissions créent un événement mondial, même si tous les pays ne le lisent pas de la même manière. Apollo accélère l’électronique et les méthodes de gestion, mais les listes de « produits inventés pour la NASA » sont souvent exagérées. Son héritage principal reste la capacité démontrée d’organiser un projet extrême."
      }
    ],
    "deeper": [
      {
        "title": "Femmes et calcul",
        "text": "Des mathématiciennes et programmeuses jouent un rôle majeur, même si les astronautes d’Apollo sont tous des hommes."
      },
      {
        "title": "Drapeau et droit",
        "text": "Planter un drapeau ne transforme pas la Lune en territoire américain : le traité de l’espace interdit l’appropriation nationale."
      },
      {
        "title": "Après Apollo",
        "text": "La priorité passe aux stations, navettes et sondes ; le retour humain vers la Lune exige de nouveaux objectifs politiques durables."
      }
    ],
    "takeaways": [
      {
        "label": "Compétition",
        "text": "La course spatiale est une branche de la guerre froide."
      },
      {
        "label": "Système",
        "text": "Une mission dépend de milliers de sous-systèmes et de métiers."
      },
      {
        "label": "Risque",
        "text": "Les accidents modifient techniques et procédures."
      },
      {
        "label": "Héritage",
        "text": "Apollo produit connaissances, images et capacité organisationnelle."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "Quel événement ouvre symboliquement l’ère spatiale en 1957 ?",
        "a": "Le lancement du satellite soviétique Spoutnik.",
        "choices": [
          "Le premier alunissage d’Apollo 11.",
          "La construction de la Station spatiale internationale.",
          "Le vol de la navette Columbia."
        ],
        "why": "Spoutnik déclenche un choc stratégique.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "politique",
        "q": "Pourquoi Kennedy choisit-il l’objectif lunaire ?",
        "a": "Parce qu’il est spectaculaire, mesurable et encore ouvert à une compétition technologique.",
        "choices": [
          "Parce que l’URSS a déjà installé une base permanente sur la Lune.",
          "Parce que le projet ne nécessite presque aucun financement.",
          "Parce que la Lune contient alors un minerai indispensable connu."
        ],
        "why": "L’objectif permet de mobiliser et de rattraper le retard.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "architecture",
        "q": "Pourquoi utilise-t-on un module lunaire séparé ?",
        "a": "Pour éviter de poser puis redécoller toute la lourde capsule de voyage.",
        "choices": [
          "Pour transporter le public dans l’espace.",
          "Pour rester définitivement sur la surface.",
          "Pour remplacer la fusée Saturn V au décollage terrestre."
        ],
        "why": "Le rendez-vous lunaire réduit la masse.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "sécurité",
        "q": "Que change l’accident d’Apollo 1 ?",
        "a": "Il entraîne une révision profonde de la cabine, des matériaux et des procédures.",
        "choices": [
          "Il provoque l’abandon définitif de tout vol habité américain.",
          "Il a lieu sur la surface lunaire.",
          "Il montre que l’oxygène pur ne brûle pas."
        ],
        "why": "L’échec devient une source de correction.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "science",
        "q": "Quel apport scientifique majeur vient des missions Apollo ?",
        "a": "Des échantillons et mesures qui éclairent la formation et l’histoire de la Lune.",
        "choices": [
          "La preuve que la Lune est creuse.",
          "La découverte d’une civilisation lunaire.",
          "La mesure directe de toutes les galaxies."
        ],
        "why": "Les roches lunaires restent une archive essentielle.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta236-premium-core"
  },
  "eco-gdp-growth-limits": {
    "hook": "Le PIB est un thermomètre de la production marchande et publique, pas un score général de bonheur. Bien utilisé, il éclaire l’activité ; mal utilisé, il transforme une mesure partielle en jugement sur toute la société.",
    "keyFacts": [
      "Le PIB additionne les valeurs ajoutées produites sur un territoire",
      "Le PIB réel corrige l’effet de la variation des prix",
      "Le PIB par habitant facilite certaines comparaisons de niveau de vie",
      "Le travail domestique non rémunéré est largement absent",
      "Croissance, bien-être et soutenabilité ne sont pas synonymes"
    ],
    "express": [
      "Le produit intérieur brut mesure la valeur des biens et services finaux produits sur un territoire pendant une période. Pour éviter de compter plusieurs fois la même chose, on additionne les valeurs ajoutées : la différence entre la valeur de la production d’une organisation et celle des consommations intermédiaires qu’elle utilise. Les services publics sont évalués principalement à partir de leurs coûts de production.",
      "Le PIB nominal peut augmenter simplement parce que les prix montent. Le PIB réel corrige cette inflation pour mesurer l’évolution des volumes produits. Diviser par le nombre d’habitants donne un PIB par habitant, utile pour comparer des ordres de grandeur. Mais une moyenne ne dit rien de la répartition : deux pays au même PIB par habitant peuvent avoir des inégalités très différentes.",
      "Le PIB ignore largement le travail domestique gratuit, le bénévolat et une partie de l’économie informelle. Une catastrophe peut même augmenter certaines dépenses de reconstruction tout en détruisant du bien-être. Les économistes complètent donc cette mesure par revenu médian, santé, éducation, patrimoine, émissions ou temps libre. Le bon réflexe n’est pas de jeter le PIB, mais de lui poser la question qu’il peut réellement traiter."
    ],
    "complete": [
      {
        "title": "1. Additionner sans compter deux fois",
        "text": "Un boulanger vend du pain, mais il a acheté farine et énergie. Compter la valeur du blé, de la farine puis du pain entier additionnerait plusieurs fois les mêmes inputs. La valeur ajoutée du boulanger est sa production moins ses consommations intermédiaires. La somme des valeurs ajoutées, ajustée des impôts et subventions sur les produits, forme le PIB par l’approche de la production."
      },
      {
        "title": "2. Production, revenus et dépenses",
        "text": "La même activité peut être observée par trois côtés. Produire crée des revenus : salaires, profits et impôts. Acheter les produits crée des dépenses : consommation, investissement, dépense publique et solde extérieur. En théorie comptable, ces approches aboutissent au même total, car la dépense de l’un devient le revenu d’un autre. Les écarts statistiques viennent des sources imparfaites."
      },
      {
        "title": "3. Nominal, réel et croissance",
        "text": "Si un pays produit exactement les mêmes quantités mais que tous les prix augmentent de 5 %, le PIB nominal progresse alors que la production réelle ne change pas. Les statisticiens construisent donc des indices de prix pour calculer le PIB en volume. Le taux de croissance réel mesure l’évolution de cette production corrigée des prix, mais les révisions sont fréquentes lorsque de meilleures données arrivent."
      },
      {
        "title": "4. PIB par habitant et niveau de vie",
        "text": "Le PIB par habitant rapproche la production moyenne de la taille de la population. Pour comparer des pays, les parités de pouvoir d’achat corrigent les différences de prix locaux. Cette mesure reste une moyenne. Elle ne montre ni la distribution des revenus, ni le coût du logement dans chaque ville, ni l’accès effectif à la santé et à l’éducation. Le revenu médian peut parfois mieux décrire la situation centrale des ménages."
      },
      {
        "title": "5. Ce que le PIB laisse de côté",
        "text": "Cuisiner pour sa famille n’entre généralement pas dans le PIB, tandis que payer un restaurant y entre. Extraire une ressource augmente la production même si le patrimoine naturel diminue. Les dépenses liées à un accident ou à une pollution peuvent également accroître l’activité mesurée. Pour parler de bien-être ou de soutenabilité, il faut donc ajouter d’autres indicateurs plutôt que demander au PIB de répondre seul."
      }
    ],
    "deeper": [
      {
        "title": "Économie numérique",
        "text": "Les services gratuits financés par la publicité créent une utilité difficile à mesurer directement dans le PIB."
      },
      {
        "title": "Révisions",
        "text": "Les comptes nationaux sont mis à jour ; un chiffre précis n’est pas une observation parfaite en temps réel."
      },
      {
        "title": "Décroissance du PIB",
        "text": "Une récession peut réduire emploi et revenus, même si toute hausse de production n’améliore pas automatiquement le bien-être."
      }
    ],
    "takeaways": [
      {
        "label": "Valeur ajoutée",
        "text": "Elle évite les doubles comptes."
      },
      {
        "label": "Réel",
        "text": "Il corrige l’effet de l’inflation."
      },
      {
        "label": "Moyenne",
        "text": "Le PIB par habitant ne décrit pas la répartition."
      },
      {
        "label": "Limites",
        "text": "Production, bonheur et soutenabilité sont différents."
      }
    ],
    "quiz": [
      {
        "kind": "définition",
        "q": "Pourquoi additionne-t-on les valeurs ajoutées ?",
        "a": "Pour éviter de compter plusieurs fois les biens intermédiaires incorporés dans un produit final.",
        "choices": [
          "Pour exclure tous les services de l’économie.",
          "Pour compter chaque matière première à chaque étape.",
          "Pour mesurer uniquement les profits des entreprises."
        ],
        "why": "La valeur ajoutée corrige les doubles comptes.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "comptabilité",
        "q": "Pourquoi production, revenus et dépenses donnent-ils le même total en théorie ?",
        "a": "Parce que la production vendue crée simultanément une dépense et un revenu.",
        "choices": [
          "Parce que l’État fixe tous les prix.",
          "Parce que chaque ménage gagne exactement la même somme.",
          "Parce que les importations sont toujours nulles."
        ],
        "why": "Ce sont trois vues d’un même circuit.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "inflation",
        "q": "Que mesure le PIB réel ?",
        "a": "L’évolution de la production corrigée des variations de prix.",
        "choices": [
          "Uniquement la quantité de monnaie en circulation.",
          "La valeur des actions cotées.",
          "Le bonheur moyen déclaré."
        ],
        "why": "Il distingue volumes et prix.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "comparaison",
        "q": "Quelle limite a le PIB par habitant ?",
        "a": "C’est une moyenne qui ne montre pas comment les revenus sont répartis.",
        "choices": [
          "Il ne peut jamais être calculé.",
          "Il mesure uniquement les exportations.",
          "Il exclut toute production publique."
        ],
        "why": "Une moyenne peut masquer de fortes inégalités.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "limites",
        "q": "Pourquoi une catastrophe peut-elle parfois augmenter le PIB ?",
        "a": "Parce que la reconstruction et certains services supplémentaires créent des dépenses et une production mesurée.",
        "choices": [
          "Parce que le PIB soustrait automatiquement toutes les destructions futures.",
          "Parce que toute souffrance est comptée comme richesse.",
          "Parce que les prix cessent d’exister après une catastrophe."
        ],
        "why": "Le PIB mesure des flux de production, pas le dommage net au bien-être.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta236-premium-core"
  },
  "geo-climate-change-unequal-territories": {
    "hook": "Le changement climatique est global par ses causes physiques, mais profondément géographique par ses effets. Une même hausse moyenne de température produit des risques différents selon littoraux, villes, revenus, infrastructures et capacités d’adaptation.",
    "keyFacts": [
      "L’effet de serre naturel rend la Terre habitable",
      "Les émissions humaines renforcent cet effet depuis l’industrialisation",
      "Le réchauffement modifie températures, pluies, glaces et niveau marin",
      "Un aléa devient catastrophe selon exposition et vulnérabilité",
      "Atténuation et adaptation sont complémentaires"
    ],
    "express": [
      "Certains gaz atmosphériques absorbent une partie du rayonnement infrarouge émis par la Terre. Cet effet de serre naturel maintient une température compatible avec l’eau liquide. Depuis la révolution industrielle, la combustion du charbon, du pétrole et du gaz, la déforestation et certaines activités agricoles augmentent les concentrations de dioxyde de carbone, méthane et protoxyde d’azote, renforçant le déséquilibre énergétique.",
      "Le réchauffement moyen ne signifie pas que chaque lieu chauffe de la même manière. Les continents se réchauffent plus vite que les océans, l’Arctique très rapidement, et les régimes de pluie se déplacent. Vagues de chaleur, pluies intenses, sécheresses, incendies et submersions deviennent plus probables ou plus sévères dans de nombreuses régions. Aucun événement isolé n’est « causé » simplement, mais l’attribution mesure comment sa probabilité change.",
      "Le risque dépend aussi de la société. Une canicule frappe davantage les logements mal isolés, les travailleurs exposés et les quartiers sans végétation. L’atténuation réduit les émissions et protège les puits de carbone ; l’adaptation modifie villes, agriculture, santé ou littoraux pour limiter les dommages. Les choix soulèvent une question de justice, car les populations les moins responsables sont souvent les plus vulnérables."
    ],
    "complete": [
      {
        "title": "1. Un bilan énergétique perturbé",
        "text": "La Terre reçoit surtout de l’énergie solaire visible et réémet de l’infrarouge. Les gaz à effet de serre absorbent et réémettent une partie de ce rayonnement. Ajouter du CO₂ ralentit la perte d’énergie vers l’espace jusqu’à ce qu’un nouvel équilibre plus chaud s’établisse. La vapeur d’eau amplifie ensuite le réchauffement, mais elle agit principalement comme rétroaction plutôt que comme cause initiale durable."
      },
      {
        "title": "2. Des causes mesurables",
        "text": "Les signatures isotopiques du carbone, la baisse relative de l’oxygène et les inventaires énergétiques relient l’augmentation du CO₂ aux combustibles fossiles. Les changements solaires et volcaniques sont mesurés mais n’expliquent pas la tendance récente. Les modèles reproduisent le réchauffement observé seulement lorsqu’ils incluent les forçages humains. La conclusion repose donc sur plusieurs familles de preuves convergentes."
      },
      {
        "title": "3. Des impacts spatialement différenciés",
        "text": "Les littoraux bas affrontent l’élévation du niveau marin, mais digues, mangroves, densité et ressources financières modifient le danger. Les montagnes perdent glaciers et réserves saisonnières. Les villes accumulent la chaleur à cause des matériaux minéraux et du manque de végétation. Dans l’agriculture, certaines régions gagnent temporairement une saison plus longue tandis que d’autres subissent chaleur et manque d’eau."
      },
      {
        "title": "4. Aléa, exposition et vulnérabilité",
        "text": "Une tempête est un aléa. Elle devient risque majeur lorsqu’elle rencontre des personnes, logements et réseaux exposés. La vulnérabilité dépend de la qualité des constructions, des revenus, de l’âge, de l’accès aux soins et de la capacité d’évacuation. Cette distinction empêche de présenter les catastrophes comme purement naturelles. Les politiques d’aménagement peuvent réduire ou augmenter les dommages."
      },
      {
        "title": "5. Atténuer, adapter et arbitrer",
        "text": "L’atténuation agit sur la cause : sobriété, efficacité, électrification, énergies bas-carbone, réduction du méthane, protection des forêts. L’adaptation agit sur les conséquences : plans canicule, bâtiments frais, retenues ou économies d’eau, systèmes d’alerte, recul stratégique de certains littoraux. Certaines mesures créent des conflits d’usage. Une adaptation qui protège un quartier en aggravant le risque ailleurs n’est pas forcément juste."
      }
    ],
    "deeper": [
      {
        "title": "Météo et climat",
        "text": "La météo décrit un état court ; le climat analyse les distributions et tendances sur de longues périodes."
      },
      {
        "title": "Attribution",
        "text": "Les chercheurs comparent un monde modélisé avec et sans influence humaine pour estimer le changement de probabilité d’un événement."
      },
      {
        "title": "Justice",
        "text": "Responsabilité historique, capacité financière et exposition ne se superposent pas entre pays et populations."
      }
    ],
    "takeaways": [
      {
        "label": "Cause",
        "text": "Les émissions humaines renforcent l’effet de serre."
      },
      {
        "label": "Territoires",
        "text": "Les impacts varient selon milieux et sociétés."
      },
      {
        "label": "Risque",
        "text": "Aléa, exposition et vulnérabilité se combinent."
      },
      {
        "label": "Réponse",
        "text": "Atténuation et adaptation doivent avancer ensemble."
      }
    ],
    "quiz": [
      {
        "kind": "physique",
        "q": "Pourquoi l’effet de serre naturel n’est-il pas en lui-même un problème ?",
        "a": "Parce qu’il maintient une température compatible avec la vie, tandis que son renforcement rapide déséquilibre le climat.",
        "choices": [
          "Parce qu’il refroidit toujours la planète.",
          "Parce qu’il est produit uniquement par les océans.",
          "Parce qu’il disparaît complètement la nuit."
        ],
        "why": "Le problème est l’augmentation des concentrations.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "preuves",
        "q": "Qu’est-ce qui relie le réchauffement récent aux activités humaines ?",
        "a": "Plusieurs preuves convergentes : émissions, isotopes, mesures énergétiques et modèles.",
        "choices": [
          "Un seul thermomètre urbain.",
          "La seule observation des volcans.",
          "Une baisse générale de tous les gaz atmosphériques."
        ],
        "why": "La conclusion ne repose pas sur un indice isolé.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "géographie",
        "q": "Pourquoi une même hausse moyenne n’a-t-elle pas les mêmes effets partout ?",
        "a": "Parce que milieux, exposition, infrastructures et ressources diffèrent entre territoires.",
        "choices": [
          "Parce que le climat n’existe que dans les villes.",
          "Parce que les océans ne réagissent jamais.",
          "Parce que toutes les populations habitent au même endroit."
        ],
        "why": "Le risque est spatialement différencié.",
        "trap": "",
        "evidence": "Sections 3 et 4."
      },
      {
        "kind": "risque",
        "q": "Quelle formule décrit correctement une catastrophe ?",
        "a": "Un aléa rencontre des populations et équipements exposés et vulnérables.",
        "choices": [
          "Un aléa naturel produit toujours le même dommage.",
          "La vulnérabilité dépend uniquement de la latitude.",
          "Une catastrophe n’a aucun lien avec l’aménagement."
        ],
        "why": "La société transforme l’aléa en risque.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "politiques",
        "q": "Quelle différence existe entre atténuation et adaptation ?",
        "a": "L’atténuation réduit les causes, l’adaptation limite les conséquences.",
        "choices": [
          "L’atténuation concerne seulement la météo et l’adaptation seulement l’espace.",
          "L’adaptation remplace entièrement la réduction des émissions.",
          "Les deux termes désignent exactement la même action."
        ],
        "why": "Les deux stratégies sont complémentaires.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta236-premium-core"
  },
  "music-rock-blues-studio-youth": {
    "hook": "Le rock n’apparaît pas soudainement avec une star blanche et une guitare électrique. Il naît de circulations entre blues, gospel, country et rhythm and blues, puis devient une industrie mondiale portée par le disque, la radio et une nouvelle culture adolescente.",
    "keyFacts": [
      "Le rock and roll puise largement dans les musiques afro-américaines",
      "Chuck Berry, Little Richard et Fats Domino sont des pionniers majeurs",
      "Elvis Presley élargit le marché dans une industrie ségréguée",
      "Les Beatles transforment le studio en espace de création",
      "Le rock devient une famille de styles plutôt qu’un son unique"
    ],
    "express": [
      "Dans les années 1940 et 1950, rhythm and blues, boogie, gospel et country circulent entre scènes, radios et labels. Des artistes noirs comme Sister Rosetta Tharpe, Chuck Berry, Little Richard ou Fats Domino développent riffs, énergie vocale et accentuation rythmique qui nourrissent le rock and roll. Le mot nouveau aide surtout l’industrie à présenter à un public plus large des formes déjà en mouvement.",
      "Elvis Presley combine influences noires et country avec une présence scénique spectaculaire. Son succès montre la puissance de la télévision et des grands labels, mais aussi les inégalités raciales : des artistes blancs obtiennent souvent une diffusion et des revenus supérieurs pour des styles profondément liés aux créateurs afro-américains. Le rock devient l’emblème d’une jeunesse disposant d’argent, de disques et de lieux propres.",
      "Au Royaume-Uni, les Beatles et les Rolling Stones réinterprètent blues et rock américains. À partir du milieu des années 1960, le studio devient un instrument : multipistes, effets, collages et instruments inhabituels produisent des morceaux impossibles à reproduire exactement sur scène. Hendrix, psychédélisme, hard rock, punk puis d’autres courants montrent que le rock est une histoire de transformations, de marchés et d’identités."
    ],
    "complete": [
      {
        "title": "1. Des racines multiples et inégales",
        "text": "Le blues fournit structures harmoniques, blue notes et récits personnels ; le gospel apporte puissance collective et techniques vocales ; le country contribue par ses guitares et formes narratives. Les frontières entre catégories sont aussi commerciales et raciales. Les magasins et radios classent les disques pour des publics supposés séparés, alors que les musiciens s’écoutent et s’influencent constamment."
      },
      {
        "title": "2. Le riff, le rythme et l’amplification",
        "text": "Le riff est une courte figure répétée qui organise l’énergie du morceau. La guitare électrique permet de projeter ce motif au-dessus d’une batterie et d’une basse. La saturation, d’abord parfois considérée comme défaut, devient une couleur recherchée. Le backbeat accentue souvent les deuxième et quatrième temps, donnant une pulsation immédiatement corporelle et dansante."
      },
      {
        "title": "3. Stars, télévision et culture adolescente",
        "text": "Après-guerre, une partie des adolescents dispose d’un budget propre. Radios locales, juke-boxes, cinéma et télévision créent un marché. Elvis devient une star internationale, mais son image plus acceptable pour certains diffuseurs blancs révèle la ségrégation du secteur. Les débats moraux sur danse, sexualité et délinquance contribuent paradoxalement à la publicité du genre."
      },
      {
        "title": "4. Les Beatles et le studio comme instrument",
        "text": "Les premiers Beatles reposent sur concerts, reprises et chansons courtes. Avec George Martin et les ingénieurs d’Abbey Road, le groupe utilise enregistrement multipiste, bandes accélérées ou inversées, superpositions et montages. Des albums comme Revolver ou Sgt. Pepper ne documentent plus simplement une performance : ils composent un objet sonore construit couche par couche."
      },
      {
        "title": "5. Une culture mondiale et contestée",
        "text": "Le rock accompagne mouvements de jeunesse, contestation de la guerre, nouvelles modes et industries massives. Il peut porter rébellion tout en générant tournées lucratives et multinationales du disque. Les scènes locales adaptent langue, rythmes et enjeux politiques. Punk, metal, rock alternatif ou fusion ne sont pas des fins logiques, mais des réponses différentes aux conventions installées."
      }
    ],
    "deeper": [
      {
        "title": "Sister Rosetta Tharpe",
        "text": "Sa guitare électrique et son énergie de gospel en font une figure essentielle avant l’étiquette rock and roll."
      },
      {
        "title": "Appropriation",
        "text": "Reconnaître les échanges musicaux n’efface pas les écarts de rémunération, de visibilité et de contrôle des catalogues."
      },
      {
        "title": "Album",
        "text": "Le microsillon et le studio favorisent l’album conçu comme œuvre cohérente, au-delà du simple single."
      }
    ],
    "takeaways": [
      {
        "label": "Racines",
        "text": "Le rock vient de traditions noires et blanches en interaction."
      },
      {
        "label": "Son",
        "text": "Riff, backbeat et amplification structurent son énergie."
      },
      {
        "label": "Industrie",
        "text": "Radio, télévision et labels fabriquent un marché jeune."
      },
      {
        "label": "Studio",
        "text": "L’enregistrement devient une pratique de composition."
      }
    ],
    "quiz": [
      {
        "kind": "origines",
        "q": "Pourquoi est-il faux de dire qu’une seule personne invente le rock ?",
        "a": "Parce qu’il résulte de circulations anciennes entre plusieurs traditions et nombreux artistes.",
        "choices": [
          "Parce que le rock existe déjà dans l’Antiquité.",
          "Parce qu’il est créé uniquement par les fabricants de guitares.",
          "Parce qu’aucun musicien n’utilise le blues."
        ],
        "why": "Une étiquette commerciale rassemble des évolutions multiples.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "rythme",
        "q": "Qu’est-ce qu’un riff ?",
        "a": "Une courte figure musicale répétée qui structure souvent le morceau.",
        "choices": [
          "Une longue pause sans son.",
          "Un type de contrat discographique.",
          "Une danse réservée au classique."
        ],
        "why": "Le riff agit comme motif reconnaissable.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "industrie",
        "q": "Pourquoi le succès d’Elvis doit-il être replacé dans la ségrégation ?",
        "a": "Parce que l’industrie donne souvent plus de visibilité à un artiste blanc pour des formes issues largement de créateurs noirs.",
        "choices": [
          "Parce qu’Elvis ne connaît aucune musique américaine.",
          "Parce que les radios diffusent alors uniquement des artistes noirs.",
          "Parce que les disques n’existent pas encore."
        ],
        "why": "Le marché distribue inégalement reconnaissance et revenus.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "studio",
        "q": "Que changent les Beatles dans la seconde moitié des années 1960 ?",
        "a": "Ils utilisent le studio pour construire des sons impossibles à réduire à une prise de concert.",
        "choices": [
          "Ils refusent toute technique d’enregistrement.",
          "Ils abandonnent définitivement les chansons.",
          "Ils enregistrent uniquement en direct sans montage."
        ],
        "why": "Le disque devient une œuvre fabriquée.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi le rock n’est-il pas un son unique ?",
        "a": "Parce qu’il se transforme en nombreuses scènes et sous-genres selon les lieux et les époques.",
        "choices": [
          "Parce qu’il n’utilise jamais de guitare.",
          "Parce que toutes ses chansons ont exactement le même rythme.",
          "Parce qu’il disparaît après 1960."
        ],
        "why": "Le genre est une histoire de réinventions.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta236-premium-core"
  },
  "lit-science-fiction-worlds-critique": {
    "hook": "La science-fiction ne vaut pas parce qu’elle aurait correctement prédit nos gadgets. Elle construit des mondes cohérents pour tester des idées : progrès, pouvoir, altérité, environnement, technique et définition de l’humain.",
    "keyFacts": [
      "Frankenstein interroge création et responsabilité",
      "Verne met en scène exploration et savoir technique",
      "Wells utilise l’avenir pour critiquer son présent",
      "Le Guin et Butler renouvellent genre, société et pouvoir",
      "La science-fiction fonctionne par hypothèse et construction de monde"
    ],
    "express": [
      "Avec Frankenstein en 1818, Mary Shelley ne décrit pas simplement un monstre. Elle raconte un savant qui veut créer la vie puis refuse toute responsabilité envers l’être produit. Le roman croise science moderne, romantisme, solitude et exclusion. Il pose déjà une question centrale de la science-fiction : que devient une invention lorsque son créateur ne maîtrise ni ses effets ni son statut moral ?",
      "Jules Verne transforme voyages, géographie et machines en aventures fondées sur les savoirs de son temps. H. G. Wells utilise au contraire machine temporelle, invasion martienne ou homme invisible pour exposer lutte des classes, impérialisme et fragilité humaine. Dans les deux cas, l’avenir ou l’ailleurs sert moins à deviner exactement demain qu’à déplacer le regard sur le présent.",
      "Au XXe siècle, Ursula K. Le Guin imagine des sociétés où genre, propriété ou politique fonctionnent autrement. Octavia E. Butler relie pouvoir, race, corps et survie. La science-fiction élargit ainsi ses voix et ses formes : roman, nouvelle, cinéma, bande dessinée. Une bonne lecture observe la règle du monde inventé, ses conséquences et le point de vue de ceux qui y vivent."
    ],
    "complete": [
      {
        "title": "1. Frankenstein : créer ne suffit pas",
        "text": "Victor Frankenstein assemble un être puis l’abandonne dès qu’il prend vie. La créature apprend seule, cherche une relation et rencontre rejet et violence. Le roman ne condamne pas simplement la science. Il interroge l’ambition sans responsabilité, le regard social qui fabrique le monstre et l’écart entre capacité technique et devoir moral. Le récit encadré multiplie aussi les points de vue."
      },
      {
        "title": "2. Verne et la fiction du savoir",
        "text": "Vingt mille lieues sous les mers ou De la Terre à la Lune utilisent calculs, cartes, machines et inventaires. Les erreurs scientifiques comptent moins que la méthode narrative : rendre l’inconnu plausible par une accumulation de détails. Le capitaine Nemo incarne à la fois maîtrise technique, refus politique et violence. La machine ouvre un monde mais n’indique pas comment l’habiter justement."
      },
      {
        "title": "3. Wells : l’avenir comme miroir social",
        "text": "Dans La Machine à explorer le temps, l’humanité future est divisée en groupes issus d’inégalités devenues biologiques. La Guerre des mondes inverse le regard impérial : les Britanniques subissent une invasion semblable à celles qu’ils imposent ailleurs. Wells utilise l’hypothèse scientifique pour produire une satire politique. Le futur est un laboratoire de pensée, pas une simple prophétie."
      },
      {
        "title": "4. Construire un monde cohérent",
        "text": "Le world-building ne consiste pas à empiler des noms de planètes. Une modification importante doit avoir des conséquences sur économie, famille, langage, guerre ou environnement. La cohérence n’exige pas d’expliquer chaque technologie, mais de respecter les règles posées. Le lecteur compare alors ce monde au sien et repère ce que l’auteur a rendu étrange pour le rendre visible."
      },
      {
        "title": "5. Le Guin, Butler et la pluralité des futurs",
        "text": "La Main gauche de la nuit interroge le genre à travers une société où les individus ne sont pas en permanence sexués de la même manière. Les Dépossédés compare deux systèmes politiques sans offrir une utopie parfaite. Butler met souvent ses personnages dans des relations de dépendance où pouvoir et adaptation ont un coût. Ces œuvres montrent que le futur n’appartient pas à une seule culture ni à un héros conquérant."
      }
    ],
    "deeper": [
      {
        "title": "Hard et soft science-fiction",
        "text": "La distinction oppose l’accent mis sur sciences physiques à celui mis sur sociétés, mais de nombreuses œuvres combinent les deux."
      },
      {
        "title": "Prévision",
        "text": "Une invention ressemblante ne prouve pas qu’un auteur a prévu son usage social réel."
      },
      {
        "title": "Point de vue",
        "text": "Demande toujours qui bénéficie de la technologie et qui en paie le prix dans le monde raconté."
      }
    ],
    "takeaways": [
      {
        "label": "Hypothèse",
        "text": "Une modification permet de tester ses conséquences."
      },
      {
        "label": "Responsabilité",
        "text": "La technique pose des questions morales et politiques."
      },
      {
        "label": "Monde",
        "text": "La cohérence relie invention et organisation sociale."
      },
      {
        "label": "Pluralité",
        "text": "Les futurs changent avec les voix qui les imaginent."
      }
    ],
    "quiz": [
      {
        "kind": "Frankenstein",
        "q": "Quel problème central pose le roman de Mary Shelley ?",
        "a": "La responsabilité d’un créateur qui abandonne l’être qu’il a produit.",
        "choices": [
          "La construction d’une fusée vers Mars.",
          "La victoire d’un robot militaire.",
          "La découverte d’une utopie sans conflit."
        ],
        "why": "La création technique engage une obligation morale.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "Verne",
        "q": "Comment Verne rend-il ses aventures plausibles ?",
        "a": "Par l’usage de savoirs, cartes, calculs et détails techniques intégrés au récit.",
        "choices": [
          "En refusant toute description matérielle.",
          "En situant tous ses romans dans la Grèce antique.",
          "En affirmant que les machines sont magiques."
        ],
        "why": "Le savoir produit un effet de vraisemblance.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "Wells",
        "q": "À quoi sert l’invasion dans La Guerre des mondes ?",
        "a": "À inverser le regard impérial et montrer la vulnérabilité des dominants.",
        "choices": [
          "À célébrer uniquement la puissance militaire britannique.",
          "À raconter un événement historique exact.",
          "À prouver que Mars est réellement habitée."
        ],
        "why": "L’ailleurs critique le présent.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "monde",
        "q": "Qu’est-ce qu’un world-building réussi ?",
        "a": "Un ensemble de règles dont les conséquences sociales, politiques et matérielles restent cohérentes.",
        "choices": [
          "Une liste très longue de noms sans lien.",
          "Une technologie expliquée sans personnages.",
          "Un décor qui change de règles à chaque page."
        ],
        "why": "Le monde doit produire des conséquences.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "pluralité",
        "q": "Que renouvellent Le Guin et Butler ?",
        "a": "Les questions de genre, pouvoir, race, dépendance et organisation sociale dans les futurs imaginés.",
        "choices": [
          "Elles suppriment toute dimension politique.",
          "Elles écrivent uniquement des manuels techniques.",
          "Elles reprennent toujours le même héros conquérant."
        ],
        "why": "De nouvelles voix produisent d’autres futurs.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta236-premium-core"
  }
};
  const MYSTERIES = [
  {
    "id": "history-mystery-industrial-revolution-236",
    "discipline": "history",
    "difficulty": "facile",
    "title": "La production change d’échelle",
    "caseTitle": "Charbon, machines et discipline de l’horloge",
    "subjectType": "transformation économique et sociale",
    "periodHint": "Fin du XVIIIe → XIXe siècle",
    "lessonId": "history-industrial-revolution-steam-factory",
    "prompt": "Usines, vapeur, charbon et chemins de fer se renforcent, tandis que les villes grandissent et qu’un nouveau monde ouvrier apparaît.",
    "answer": "La révolution industrielle",
    "aliases": [
      "révolution industrielle",
      "la révolution industrielle",
      "revolution industrielle",
      "industrialisation"
    ],
    "clues": [
      "Elle démarre tôt en Grande-Bretagne.",
      "Elle concentre machines et travailleurs dans les usines.",
      "Elle transforme durablement énergie, transports et rapports sociaux."
    ],
    "explanation": "La révolution industrielle combine innovations techniques, énergie fossile et nouvelles organisations économiques et sociales.",
    "blockedGuesses": [
      "machine à vapeur",
      "charbon",
      "usine"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "history-mystery-cold-war-236",
    "discipline": "history",
    "difficulty": "facile",
    "title": "Deux blocs sous la menace",
    "caseTitle": "Une guerre évitée au centre, menée ailleurs",
    "subjectType": "conflit géopolitique",
    "periodHint": "1947 → 1991",
    "lessonId": "history-cold-war-bipolar-world",
    "prompt": "Deux superpuissances accumulent les armes nucléaires, organisent des alliances et s’affrontent par crises, propagande et guerres locales sans se déclarer directement la guerre.",
    "answer": "La guerre froide",
    "aliases": [
      "guerre froide",
      "la guerre froide",
      "cold war"
    ],
    "clues": [
      "Berlin en est un symbole majeur.",
      "La crise de Cuba rapproche le monde d’une guerre nucléaire.",
      "Elle se termine avec l’effondrement du bloc soviétique."
    ],
    "explanation": "La guerre froide oppose les États-Unis et l’URSS dans un système bipolaire mondial.",
    "blockedGuesses": [
      "seconde guerre mondiale",
      "guerre nucléaire",
      "rideau de fer"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "art-mystery-chiaroscuro-236",
    "discipline": "art",
    "difficulty": "moyen",
    "title": "Une lumière tranche l’obscurité",
    "caseTitle": "Le regard est conduit vers l’instant décisif",
    "subjectType": "procédé pictural",
    "periodHint": "Peinture baroque",
    "lessonId": "art-baroque-light-movement-power",
    "prompt": "Une zone très éclairée surgit d’un fond sombre, modèle les visages et transforme une scène religieuse en événement presque théâtral.",
    "answer": "Le clair-obscur",
    "aliases": [
      "clair-obscur",
      "le clair-obscur",
      "clair obscur",
      "chiaroscuro"
    ],
    "clues": [
      "Caravage en fait un usage célèbre.",
      "Il ne s’agit pas seulement de peindre de nuit.",
      "Le contraste dirige l’attention et dramatise le récit."
    ],
    "explanation": "Le clair-obscur organise une forte opposition entre lumière et ombre pour construire volume et tension.",
    "blockedGuesses": [
      "baroque",
      "caravage",
      "ténébrisme"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "cinema-mystery-jump-cut-236",
    "discipline": "cinema",
    "difficulty": "moyen",
    "title": "La coupe fait sauter le temps",
    "caseTitle": "Un raccord volontairement visible",
    "subjectType": "procédé de montage",
    "periodHint": "Nouvelle Vague",
    "lessonId": "cinema-new-wave-auteur-street-editing",
    "prompt": "Dans une même continuité, une partie du mouvement disparaît brusquement. Le spectateur ressent une secousse au lieu d’un raccord invisible.",
    "answer": "Le jump cut",
    "aliases": [
      "jump cut",
      "le jump cut",
      "faux raccord",
      "coupe sautée"
    ],
    "clues": [
      "Godard l’utilise dans À bout de souffle.",
      "La caméra peut rester presque au même endroit.",
      "Le procédé rappelle que le film est monté."
    ],
    "explanation": "Le jump cut est une coupe visible qui crée un saut temporel ou spatial dans un même plan apparent.",
    "blockedGuesses": [
      "fondu",
      "plan séquence",
      "champ contrechamp"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "science-mystery-universal-gravity-236",
    "discipline": "science-inventions",
    "difficulty": "facile",
    "title": "La pomme et la Lune obéissent ensemble",
    "caseTitle": "Une force unique relie chute et orbite",
    "subjectType": "loi physique",
    "periodHint": "Newton · XVIIe siècle",
    "lessonId": "sci-newton-motion-universal-gravitation",
    "prompt": "Deux masses s’attirent ; l’intensité dépend de leur masse et diminue avec le carré de leur distance. La même règle explique une chute et une orbite.",
    "answer": "La gravitation universelle",
    "aliases": [
      "gravitation universelle",
      "la gravitation universelle",
      "loi de gravitation universelle",
      "gravité universelle"
    ],
    "clues": [
      "Newton la formule mathématiquement.",
      "Elle unifie la physique terrestre et céleste.",
      "Elle explique pourquoi une orbite est une chute continue."
    ],
    "explanation": "La gravitation universelle décrit l’attraction mutuelle entre toutes les masses.",
    "blockedGuesses": [
      "pesanteur",
      "inertie",
      "relativité générale"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "science-mystery-quantum-236",
    "discipline": "science-inventions",
    "difficulty": "moyen",
    "title": "L’énergie arrive par paquets",
    "caseTitle": "Le continu ne suffit plus",
    "subjectType": "concept physique",
    "periodHint": "Début du XXe siècle",
    "lessonId": "sci-quantum-quanta-probability",
    "prompt": "Pour expliquer le rayonnement et l’effet photoélectrique, l’énergie doit être échangée en quantités discrètes liées à la fréquence.",
    "answer": "Le quantum",
    "aliases": [
      "quantum",
      "le quantum",
      "quanta",
      "quantification de l’énergie"
    ],
    "clues": [
      "Planck introduit l’idée.",
      "Le pluriel latin est quanta.",
      "Einstein l’applique à la lumière avec les photons."
    ],
    "explanation": "Un quantum est une quantité discrète élémentaire associée à un échange d’énergie.",
    "blockedGuesses": [
      "photon",
      "électron",
      "atome"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "astronomy-mystery-synchronous-rotation-236",
    "discipline": "astronomy",
    "difficulty": "moyen",
    "title": "Toujours presque le même visage",
    "caseTitle": "Un tour sur soi pour un tour autour",
    "subjectType": "mouvement orbital",
    "periodHint": "Système Terre-Lune",
    "lessonId": "astro-moon-phases-eclipses-tides",
    "prompt": "Un satellite tourne sur lui-même en exactement le même temps qu’il accomplit son orbite, si bien qu’il présente presque toujours le même hémisphère à sa planète.",
    "answer": "La rotation synchrone",
    "aliases": [
      "rotation synchrone",
      "la rotation synchrone",
      "verrouillage gravitationnel",
      "rotation liée"
    ],
    "clues": [
      "La Lune en est l’exemple le plus familier.",
      "Elle ne signifie pas absence de rotation.",
      "Les forces de marée l’installent progressivement."
    ],
    "explanation": "La rotation synchrone verrouille la période de rotation sur la période orbitale.",
    "blockedGuesses": [
      "face cachée",
      "libration",
      "phase lunaire"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "astronomy-mystery-apollo11-236",
    "discipline": "astronomy",
    "difficulty": "facile",
    "title": "Le premier pas sur un autre monde",
    "caseTitle": "Deux hommes au sol, un troisième en orbite",
    "subjectType": "mission spatiale",
    "periodHint": "Juillet 1969",
    "lessonId": "astro-space-race-apollo-11",
    "prompt": "Une mission américaine dépose deux astronautes dans la mer de la Tranquillité pendant qu’un troisième reste autour de la Lune.",
    "answer": "Apollo 11",
    "aliases": [
      "apollo 11",
      "mission apollo 11",
      "apollo onze"
    ],
    "clues": [
      "Neil Armstrong et Buzz Aldrin marchent sur la Lune.",
      "Michael Collins pilote le module de commande.",
      "La mission utilise une fusée Saturn V."
    ],
    "explanation": "Apollo 11 réalise le premier alunissage humain en juillet 1969.",
    "blockedGuesses": [
      "apollo 13",
      "spoutnik",
      "gagarine"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "economy-mystery-gdp-236",
    "discipline": "economy",
    "difficulty": "facile",
    "title": "Le total des valeurs ajoutées",
    "caseTitle": "Mesurer la production sans compter deux fois",
    "subjectType": "indicateur économique",
    "periodHint": "Comptabilité nationale",
    "lessonId": "eco-gdp-growth-limits",
    "prompt": "Cet indicateur additionne la valeur produite sur un territoire pendant une période. Il est utile pour suivre l’activité mais ne mesure pas directement le bonheur ni les inégalités.",
    "answer": "Le PIB",
    "aliases": [
      "PIB",
      "le PIB",
      "produit intérieur brut",
      "produit interieur brut"
    ],
    "clues": [
      "Il peut être nominal ou réel.",
      "On le divise parfois par le nombre d’habitants.",
      "Il additionne les valeurs ajoutées."
    ],
    "explanation": "Le PIB mesure la valeur de la production finale réalisée sur un territoire.",
    "blockedGuesses": [
      "PNB",
      "revenu médian",
      "inflation"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "geography-mystery-climate-risk-236",
    "discipline": "geography",
    "difficulty": "moyen",
    "title": "Le même aléa, des dégâts différents",
    "caseTitle": "Exposition et fragilité transforment le danger",
    "subjectType": "notion géographique",
    "periodHint": "Risques climatiques",
    "lessonId": "geo-climate-change-unequal-territories",
    "prompt": "Une vague de chaleur ou une inondation devient plus destructrice lorsque logements, populations et réseaux sont exposés et disposent de peu de moyens pour résister ou se relever.",
    "answer": "La vulnérabilité",
    "aliases": [
      "vulnérabilité",
      "la vulnérabilité",
      "vulnerabilite",
      "vulnérabilité territoriale"
    ],
    "clues": [
      "Elle ne se confond pas avec l’aléa.",
      "Elle dépend de revenus, bâtiments, santé et gouvernance.",
      "Elle explique pourquoi une catastrophe est aussi sociale."
    ],
    "explanation": "La vulnérabilité mesure la fragilité des sociétés et territoires face à un aléa.",
    "blockedGuesses": [
      "exposition",
      "risque",
      "aléa"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "music-mystery-riff-236",
    "discipline": "music",
    "difficulty": "facile",
    "title": "Quelques notes qui portent tout le morceau",
    "caseTitle": "Un motif répété, immédiatement reconnaissable",
    "subjectType": "notion musicale",
    "periodHint": "Blues, rock et musiques populaires",
    "lessonId": "music-rock-blues-studio-youth",
    "prompt": "Une courte figure mélodique ou rythmique revient, organise l’énergie et permet d’identifier le morceau dès les premières secondes.",
    "answer": "Le riff",
    "aliases": [
      "riff",
      "le riff",
      "riff de guitare"
    ],
    "clues": [
      "Il est souvent joué à la guitare ou à la basse.",
      "Il peut se répéter sous les couplets.",
      "Chuck Berry et de nombreux groupes de rock en font un moteur."
    ],
    "explanation": "Un riff est un motif court et répété qui structure une pièce.",
    "blockedGuesses": [
      "solo",
      "refrain",
      "backbeat"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "literature-mystery-science-fiction-236",
    "discipline": "literature",
    "difficulty": "facile",
    "title": "Un autre monde pour examiner le nôtre",
    "caseTitle": "Une hypothèse pousse la société jusqu’à ses conséquences",
    "subjectType": "genre littéraire",
    "periodHint": "XIXe → XXIe siècle",
    "lessonId": "lit-science-fiction-worlds-critique",
    "prompt": "Une invention, une planète ou une transformation sociale sert à construire un monde cohérent qui interroge progrès, pouvoir et définition de l’humain.",
    "answer": "La science-fiction",
    "aliases": [
      "science-fiction",
      "la science-fiction",
      "science fiction",
      "SF"
    ],
    "clues": [
      "Mary Shelley, Wells, Le Guin et Butler y sont associés.",
      "Elle ne se réduit pas à prédire des gadgets.",
      "Le world-building organise les conséquences d’une hypothèse."
    ],
    "explanation": "La science-fiction utilise des mondes possibles pour tester des idées scientifiques, sociales et politiques.",
    "blockedGuesses": [
      "fantasy",
      "dystopie",
      "anticipation"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  }
];

  const addUnique = (array, item) => {
    if (!Array.isArray(array) || !item?.id || array.some(existing => existing?.id === item.id)) return;
    array.push(item);
  };
  const addGroup = (disciplineId, group) => {
    if (disciplineId === "history") { addUnique(HISTO_WORLD_GROUPS, group); return; }
    if (!DISCIPLINE_OUTLINES[disciplineId]) DISCIPLINE_OUTLINES[disciplineId] = { groups:[], worlds:[] };
    addUnique(DISCIPLINE_OUTLINES[disciplineId].groups, group);
    PLANNED_DISCIPLINE_GROUPS[disciplineId] = DISCIPLINE_OUTLINES[disciplineId].groups;
  };
  const addWorld = (disciplineId, world) => {
    if (disciplineId === "history") { addUnique(data.worlds, world); return; }
    if (!DISCIPLINE_OUTLINES[disciplineId]) DISCIPLINE_OUTLINES[disciplineId] = { groups:[], worlds:[] };
    addUnique(DISCIPLINE_OUTLINES[disciplineId].worlds, { ...world, discipline:disciplineId, planned:true, unlockedByDefault:false });
    PLANNED_DISCIPLINE_WORLDS[disciplineId] = DISCIPLINE_OUTLINES[disciplineId].worlds.map(item => ({ ...item, discipline:disciplineId, planned:true, unlockedByDefault:false }));
  };
  const addLesson = (worldId, lesson) => {
    if (!Array.isArray(data.lessons[worldId])) data.lessons[worldId] = [];
    addUnique(data.lessons[worldId], lesson);
  };

  Object.entries(GROUPS).forEach(([disciplineId, groups]) => groups.forEach(group => addGroup(disciplineId, group)));
  Object.entries(WORLDS).forEach(([disciplineId, worlds]) => worlds.forEach(world => addWorld(disciplineId, world)));
  Object.entries(LESSONS).forEach(([worldId, lessons]) => lessons.forEach(lesson => addLesson(worldId, lesson)));
  Object.keys(PACKS).forEach(id => PUBLISHED_LESSON_IDS.add(id));
  Object.assign(READY_LESSON_PACKS, PACKS);
  lessonIndexCache = null;
  if (!Array.isArray(data.mysteries)) data.mysteries = [];
  MYSTERIES.forEach(mystery => addUnique(data.mysteries, mystery));

  const quality = Object.fromEntries(Object.entries(PACKS).map(([id, body]) => [id, rawPublishedQuality(body)]));
  const audit = {
    version:VERSION,
    lessons:Object.keys(PACKS).length,
    worlds:Object.values(WORLDS).flat().length,
    groups:0,
    mysteries:MYSTERIES.length,
    quality,
    ok:Object.keys(PACKS).length === 12 && Object.values(quality).every(item => item.pass)
  };
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version:VERSION, premium236:audit }; } catch {}
  if (!audit.ok) try { console.warn("HistoDaily beta236 premium content audit", audit); } catch {}
  try { if (typeof renderSoon === "function") renderSoon(); } catch {}
})();
