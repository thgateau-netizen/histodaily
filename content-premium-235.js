/* HistoDaily beta 235 — extension éditoriale premium multi-disciplines. */
(function histodailyBeta235PremiumContent(){
  "use strict";
  const VERSION = "1.0.0-beta.239.0";
  const GROUPS = {
  "history": [
    {
      "id": "african-atlantic-transformations",
      "title": "7. Empires africains et révolutions atlantiques",
      "range": "XIIIe → XIXe siècle",
      "description": "Pouvoirs du Sahel, réseaux transsahariens, esclavage colonial, révolution haïtienne et indépendances."
    }
  ],
  "art": [
    {
      "id": "art-renaissance-vision",
      "title": "4. Renaissance et construction du regard",
      "range": "XVe → XVIe siècle",
      "description": "Perspective, ateliers, commandes, circulation des techniques et fabrication de la figure de l’artiste."
    }
  ],
  "cinema": [
    {
      "id": "cinema-language-editing",
      "title": "3. Montage et langage du cinéma",
      "range": "1900 → aujourd’hui",
      "description": "Raccords, ellipses, continuité, collision des plans et fabrication du sens."
    }
  ],
  "economy": [
    {
      "id": "eco-money-prices",
      "title": "3. Monnaie, prix et banques centrales",
      "range": "Économie contemporaine",
      "description": "Inflation, taux d’intérêt, anticipations, crédit et effets distributifs."
    }
  ],
  "geography": [
    {
      "id": "geo-cities-networks",
      "title": "3. Métropoles, réseaux et inégalités urbaines",
      "range": "XXe → XXIe siècle",
      "description": "Concentration des fonctions, ségrégation, mobilités, étalement et gouvernance urbaine."
    }
  ],
  "music": [
    {
      "id": "music-jazz-modern",
      "title": "5. Jazz, improvisation et cultures urbaines",
      "range": "Fin du XIXe → XXe siècle",
      "description": "Blues, syncopes, migration, swing, bebop, industrie musicale et luttes pour la reconnaissance."
    }
  ],
  "literature": [
    {
      "id": "lit-colonial-voices",
      "title": "7. Écrire contre l’ordre colonial",
      "range": "XXe → XXIe siècle",
      "description": "Négritude, anticolonialisme, langues, mémoires et littératures postcoloniales."
    }
  ]
};
  const WORLDS = {
  "history": [
    {
      "id": "history-mali-songhai",
      "title": "Mali, Songhaï et mondes du Sahel",
      "emoji": "🐪",
      "subtitle": "Or, fleuve Niger, savoirs et pouvoir",
      "timeframe": "XIIIe → XVIe siècle",
      "accent": "#d97706",
      "group": "african-atlantic-transformations",
      "sortStart": 1235,
      "sortEnd": 1591,
      "unlockedByDefault": false
    },
    {
      "id": "history-haitian-revolution",
      "title": "La révolution haïtienne",
      "emoji": "🔥",
      "subtitle": "Esclavage, citoyenneté et indépendance",
      "timeframe": "1791 → 1804",
      "accent": "#ef4444",
      "group": "african-atlantic-transformations",
      "sortStart": 1791,
      "sortEnd": 1804,
      "unlockedByDefault": false
    }
  ],
  "art": [
    {
      "id": "art-renaissance-perspective",
      "title": "Perspective, atelier et mécénat",
      "emoji": "🖼️",
      "subtitle": "Comment la Renaissance fabrique un nouveau regard",
      "timeframe": "XVe → XVIe siècle",
      "accent": "#f59e0b",
      "group": "art-renaissance-vision",
      "sortStart": 24,
      "discipline": "art",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "cinema": [
    {
      "id": "cinema-montage-language",
      "title": "Le montage fabrique le sens",
      "emoji": "✂️",
      "subtitle": "Raccords, ellipses et collision des plans",
      "timeframe": "1900 → aujourd’hui",
      "accent": "#fb7185",
      "group": "cinema-language-editing",
      "sortStart": 22,
      "discipline": "cinema",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "science-inventions": [
    {
      "id": "sci-vaccination-immunity",
      "title": "Vaccination et mémoire immunitaire",
      "emoji": "🧫",
      "subtitle": "Prévenir une maladie en entraînant l’organisme",
      "timeframe": "XVIIIe siècle → aujourd’hui",
      "accent": "#14b8a6",
      "group": "sci-medicine-tech",
      "sortStart": 33,
      "discipline": "science-inventions",
      "planned": true,
      "unlockedByDefault": false
    },
    {
      "id": "sci-electromagnetism",
      "title": "Électricité et magnétisme réunis",
      "emoji": "⚡",
      "subtitle": "Champs, induction, moteurs et ondes",
      "timeframe": "1820 → 1888",
      "accent": "#3b82f6",
      "group": "sci-energy-matter",
      "sortStart": 23,
      "discipline": "science-inventions",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "astronomy": [
    {
      "id": "astro-exoplanet-detection",
      "title": "Détecter des mondes invisibles",
      "emoji": "🪐",
      "subtitle": "Transits, vitesses radiales et atmosphères",
      "timeframe": "1995 → aujourd’hui",
      "accent": "#8b5cf6",
      "group": "astro-other-worlds",
      "sortStart": 31,
      "discipline": "astronomy",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "economy": [
    {
      "id": "eco-inflation-central-banks",
      "title": "Inflation et banques centrales",
      "emoji": "📈",
      "subtitle": "Prix, anticipations, crédit et taux d’intérêt",
      "timeframe": "Économie contemporaine",
      "accent": "#f97316",
      "group": "eco-money-prices",
      "sortStart": 31,
      "discipline": "economy",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "geography": [
    {
      "id": "geo-metropolization-inequalities",
      "title": "Métropolisation et fractures urbaines",
      "emoji": "🏙️",
      "subtitle": "Fonctions de commandement, mobilités et ségrégation",
      "timeframe": "Monde contemporain",
      "accent": "#06b6d4",
      "group": "geo-cities-networks",
      "sortStart": 31,
      "discipline": "geography",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "music": [
    {
      "id": "music-jazz-improvisation",
      "title": "Le jazz : improviser dans une histoire collective",
      "emoji": "🎷",
      "subtitle": "Blues, swing, migrations et création",
      "timeframe": "1890 → 1960",
      "accent": "#f59e0b",
      "group": "music-jazz-modern",
      "sortStart": 51,
      "discipline": "music",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "literature": [
    {
      "id": "lit-negritude-anticolonial",
      "title": "La Négritude : poésie et combat anticolonial",
      "emoji": "✒️",
      "subtitle": "Césaire, Senghor, Damas et les débats d’un mouvement",
      "timeframe": "Années 1930 → 1960",
      "accent": "#a855f7",
      "group": "lit-colonial-voices",
      "sortStart": 61,
      "discipline": "literature",
      "planned": true,
      "unlockedByDefault": false
    }
  ]
};
  const LESSONS = {
  "history-mali-songhai": [
    {
      "id": "history-mali-songhai-sahel",
      "title": "Mali et Songhaï : gouverner les routes du Sahel",
      "period": "XIIIe → XVIe siècle",
      "location": "Afrique de l’Ouest",
      "emoji": "🐪",
      "xp": 85,
      "order": 1
    }
  ],
  "history-haitian-revolution": [
    {
      "id": "history-haiti-revolution-slavery",
      "title": "La révolution haïtienne : renverser l’ordre esclavagiste",
      "period": "1791 → 1804",
      "location": "Saint-Domingue puis Haïti",
      "emoji": "🔥",
      "xp": 90,
      "order": 1
    }
  ],
  "art-renaissance-perspective": [
    {
      "id": "art-renaissance-perspective-workshop",
      "title": "Renaissance : perspective, atelier et commande",
      "period": "XVe → XVIe siècle",
      "location": "Italie et Europe du Nord",
      "emoji": "🖼️",
      "xp": 75,
      "order": 1
    }
  ],
  "cinema-montage-language": [
    {
      "id": "cinema-montage-continuity-collision",
      "title": "Montage : comment deux plans produisent une idée",
      "period": "1900 → aujourd’hui",
      "location": "Cinémas du monde",
      "emoji": "✂️",
      "xp": 75,
      "order": 1
    }
  ],
  "sci-vaccination-immunity": [
    {
      "id": "sci-vaccination-immune-memory",
      "title": "Vaccination : entraîner l’immunité sans subir la maladie",
      "period": "XVIIIe siècle → aujourd’hui",
      "location": "Histoire mondiale de la médecine",
      "emoji": "🧫",
      "xp": 80,
      "order": 1
    }
  ],
  "sci-electromagnetism": [
    {
      "id": "sci-electromagnetism-fields-induction",
      "title": "De la boussole au moteur : naissance de l’électromagnétisme",
      "period": "1820 → 1888",
      "location": "Europe",
      "emoji": "⚡",
      "xp": 80,
      "order": 1
    }
  ],
  "astro-exoplanet-detection": [
    {
      "id": "astro-exoplanets-methods-habitability",
      "title": "Exoplanètes : détecter, mesurer et éviter les faux espoirs",
      "period": "1995 → aujourd’hui",
      "location": "Voisinage stellaire et Galaxie",
      "emoji": "🪐",
      "xp": 80,
      "order": 1
    }
  ],
  "eco-inflation-central-banks": [
    {
      "id": "eco-inflation-prices-central-bank",
      "title": "Inflation : pourquoi les prix montent et comment on réagit",
      "period": "Économie contemporaine",
      "location": "Économies monétaires",
      "emoji": "📈",
      "xp": 75,
      "order": 1
    }
  ],
  "geo-metropolization-inequalities": [
    {
      "id": "geo-metropolization-networks-segregation",
      "title": "Métropolisation : concentration des pouvoirs et fractures urbaines",
      "period": "XXe → XXIe siècle",
      "location": "Grandes régions urbaines mondiales",
      "emoji": "🏙️",
      "xp": 75,
      "order": 1
    }
  ],
  "music-jazz-improvisation": [
    {
      "id": "music-jazz-blues-swing-bebop",
      "title": "Jazz : improviser, faire swinguer, transformer les règles",
      "period": "1890 → 1960",
      "location": "États-Unis puis monde",
      "emoji": "🎷",
      "xp": 75,
      "order": 1
    }
  ],
  "lit-negritude-anticolonial": [
    {
      "id": "lit-negritude-cesaire-senghor-damas",
      "title": "Négritude : reprendre la parole dans la langue du colonisateur",
      "period": "Années 1930 → 1960",
      "location": "Paris, Antilles et Afrique francophone",
      "emoji": "✒️",
      "xp": 80,
      "order": 1
    }
  ]
};
  const PACKS = {
  "history-mali-songhai-sahel": {
    "hook": "Les empires du Mali et du Songhaï ne sont pas de simples étapes sur une route de l’or. Ils organisent des territoires immenses autour du fleuve Niger, de villes savantes, d’impôts et d’alliances, tout en laissant coexister plusieurs langues, autorités et pratiques religieuses.",
    "keyFacts": [
      "Le fleuve Niger soutient agriculture, transport et villes",
      "L’or, le sel et d’autres produits alimentent les échanges transsahariens",
      "Les souverains taxent les flux sans contrôler chaque caravane",
      "Tombouctou est un centre commercial et savant parmi plusieurs",
      "L’islam de cour coexiste avec des pratiques locales diverses"
    ],
    "express": [
      "Au XIIIe siècle, l’empire du Mali s’étend sur une partie du Sahel occidental et des zones aurifères. Sa puissance repose moins sur une frontière fixe que sur des fidélités, des tributs et le contrôle de nœuds commerciaux. Le Niger relie des régions agricoles, des marchés et des villes comme Djenné, Gao ou Tombouctou.",
      "Le pèlerinage de Mansa Musa à La Mecque en 1324 frappe les chroniqueurs par son faste et place le Mali sur les cartes méditerranéennes. Il ne faut pourtant pas réduire l’empire à cet épisode. Les échanges concernent aussi sel, cuivre, textiles, noix de kola, chevaux et personnes, tandis que les revenus viennent de taxes et de prélèvements variés.",
      "Au XVe siècle, le Songhaï devient la principale puissance de la boucle du Niger. Sous Sonni Ali puis Askia Mohammed, il combine conquête militaire, administration régionale et légitimation islamique. L’invasion marocaine de 1591 brise son centre politique, mais les sociétés du Sahel, leurs marchés et leurs savoirs ne disparaissent pas avec l’empire."
    ],
    "complete": [
      {
        "title": "1. Le Sahel, une zone de contact",
        "text": "Le Sahel n’est ni un désert vide ni une simple marge. C’est une bande de transition où se rencontrent pastoralisme, agriculture pluviale, cultures irriguées et commerce. Les variations climatiques déplacent routes et centres de pouvoir. Le fleuve Niger offre des ressources, des transports et des zones de peuplement denses, ce qui explique le poids de Gao, Djenné et Tombouctou."
      },
      {
        "title": "2. Gouverner des circulations",
        "text": "Les souverains ne dirigent pas un État centralisé au sens moderne. Ils s’appuient sur des chefs locaux, des garnisons, des liens de parenté et des obligations tributaires. Leur avantage consiste à sécuriser certains axes, taxer des marchés et contrôler des villes. Les caravaniers restent des acteurs autonomes : ils choisissent leurs itinéraires selon les risques, les prix et les alliances."
      },
      {
        "title": "3. Or, sel et fiscalité",
        "text": "L’or du sud alimente des circuits allant vers l’Afrique du Nord et la Méditerranée. Le sel saharien est indispensable à l’alimentation et à la conservation. Mais les échanges sont plus divers : esclaves, chevaux, tissus, cuivre, céréales, manuscrits et produits forestiers circulent aussi. Parler d’une unique route de l’or masque donc une économie faite de nombreux segments et intermédiaires."
      },
      {
        "title": "4. Islam, savoirs et pluralité",
        "text": "Des marchands et lettrés musulmans sont présents depuis longtemps au Sahel. Certains souverains utilisent l’islam pour la diplomatie, l’écriture administrative et le prestige. Les populations ne suivent pourtant pas toutes les mêmes pratiques. À Tombouctou, des familles de savants enseignent droit, grammaire, théologie ou astronomie à partir de manuscrits copiés et commentés."
      },
      {
        "title": "5. De Mali à Songhaï, sans récit de disparition",
        "text": "Le recul du Mali et l’essor du Songhaï résultent de conflits, de changements de routes et de nouvelles coalitions. Après 1591, l’expédition marocaine profite des armes à feu mais peine à gouverner durablement l’espace conquis. Les réseaux régionaux continuent. Une chute impériale n’équivaut donc pas à l’effacement des sociétés ni à une coupure totale de l’histoire ouest-africaine."
      }
    ],
    "deeper": [
      {
        "title": "Mansa Musa",
        "text": "Son pèlerinage révèle la richesse et la diplomatie du Mali, mais ne résume pas tout son fonctionnement."
      },
      {
        "title": "Manuscrits de Tombouctou",
        "text": "Ils témoignent d’une culture savante locale connectée à d’autres centres islamiques."
      },
      {
        "title": "Sources",
        "text": "Les récits arabes, traditions orales et données archéologiques doivent être croisés, car chacun éclaire différemment les pouvoirs sahéliens."
      }
    ],
    "takeaways": [
      {
        "label": "Sahel",
        "text": "Un espace productif et connecté, pas une simple bordure du désert."
      },
      {
        "label": "Pouvoir",
        "text": "Les empires gouvernent surtout des villes, des fidélités et des flux."
      },
      {
        "label": "Commerce",
        "text": "L’or compte, mais il ne circule jamais seul."
      },
      {
        "label": "Continuités",
        "text": "Les sociétés survivent aux changements de dynastie et d’empire."
      }
    ],
    "quiz": [
      {
        "kind": "géographie",
        "q": "Pourquoi le fleuve Niger est-il central ?",
        "a": "Il relie agriculture, transport, marchés et villes dans un environnement sahélien.",
        "choices": [
          "Il sert uniquement de frontière militaire.",
          "Il apporte directement l’or du Sahara.",
          "Il rend inutiles les routes terrestres."
        ],
        "why": "Le fleuve structure plusieurs fonctions à la fois.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "pouvoir",
        "q": "Comment les souverains tirent-ils profit du commerce ?",
        "a": "Ils sécurisent et taxent certains axes, marchés et villes sans contrôler chaque échange.",
        "choices": [
          "Ils possèdent personnellement toutes les caravanes.",
          "Ils interdisent aux marchands étrangers de circuler.",
          "Ils fixent un prix unique pour tout le Sahel."
        ],
        "why": "Le pouvoir repose sur la maîtrise de nœuds stratégiques.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "économie",
        "q": "Pourquoi faut-il dépasser le couple or-sel ?",
        "a": "Parce que de nombreux produits, personnes et services participent aux échanges.",
        "choices": [
          "Parce que l’or n’a jamais circulé au Sahel.",
          "Parce que le sel était sans valeur.",
          "Parce que toutes les marchandises venaient d’Europe."
        ],
        "why": "Le réseau commercial est diversifié.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "culture",
        "q": "Que montre Tombouctou ?",
        "a": "L’existence de milieux savants locaux reliés à un espace intellectuel plus vaste.",
        "choices": [
          "Une université unique dirigée depuis Le Caire.",
          "Une ville uniquement consacrée au pèlerinage.",
          "L’absence de manuscrits en Afrique de l’Ouest."
        ],
        "why": "Le savoir circule par des familles, des maîtres et des textes.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "nuance",
        "q": "Que provoque l’invasion marocaine de 1591 ?",
        "a": "Elle brise le centre politique songhaï sans faire disparaître les sociétés et réseaux régionaux.",
        "choices": [
          "Elle vide définitivement le Sahel.",
          "Elle crée le commerce transsaharien.",
          "Elle rétablit immédiatement l’empire du Mali."
        ],
        "why": "Une rupture politique ne supprime pas toutes les continuités.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta235-premium"
  },
  "history-haiti-revolution-slavery": {
    "hook": "À Saint-Domingue, la colonie la plus rentable du monde atlantique est aussi l’une des plus violentes. À partir de 1791, des esclaves insurgés, des libres de couleur, des révolutionnaires français et plusieurs armées impériales transforment une guerre civile en révolution antiesclavagiste puis en indépendance.",
    "keyFacts": [
      "Saint-Domingue repose sur une plantation esclavagiste extrêmement brutale",
      "La révolte générale commence en août 1791 dans le Nord",
      "La France abolit l’esclavage dans les colonies en 1794",
      "Toussaint Louverture construit un pouvoir autonome sans proclamer l’indépendance",
      "L’indépendance de 1804 crée Haïti mais ne met pas fin aux pressions extérieures"
    ],
    "express": [
      "En 1789, Saint-Domingue produit une grande part du sucre et du café consommés en Europe. Cette richesse dépend du travail forcé de centaines de milliers d’esclaves, soumis à une mortalité élevée et à des violences constantes. La société oppose grands planteurs blancs, petits blancs, libres de couleur et population servile, mais ces catégories sont elles-mêmes traversées par des intérêts divergents.",
      "La révolte d’août 1791 détruit des plantations et impose la question de l’abolition. Les commissaires français proclament localement la liberté en 1793 ; la Convention l’étend en 1794. Toussaint Louverture s’allie alors à la République, repousse les puissances étrangères et gouverne l’île avec une large autonomie, tout en maintenant un travail agricole contraint.",
      "Napoléon envoie une expédition en 1802 pour reprendre le contrôle et rétablit l’esclavage dans d’autres colonies. La résistance reprend sous Dessalines. Après la défaite française, l’indépendance est proclamée le 1er janvier 1804. Haïti affronte ensuite isolement diplomatique, divisions internes et indemnité imposée par la France en 1825."
    ],
    "complete": [
      {
        "title": "1. Une machine économique fondée sur la contrainte",
        "text": "Saint-Domingue est organisée en plantations exportatrices. La majorité des esclaves est née en Afrique et beaucoup viennent d’arriver récemment. Le Code noir ne protège pas réellement contre les violences quotidiennes. Marronnage, ralentissement du travail, maintien de liens culturels et révoltes montrent que la domination n’est jamais acceptée passivement."
      },
      {
        "title": "2. 1789 : des droits disputés",
        "text": "Les colons réclament davantage d’autonomie commerciale sans vouloir l’égalité raciale. Les libres de couleur demandent les droits politiques promis par le langage révolutionnaire. Les esclaves interprètent eux aussi la crise du pouvoir comme une ouverture. Les nouvelles venues de France circulent, mais la révolution locale ne se contente pas d’appliquer mécaniquement les décisions parisiennes."
      },
      {
        "title": "3. L’insurrection de 1791 et l’abolition",
        "text": "La cérémonie du Bois Caïman joue un rôle important dans la mémoire, mais les historiens discutent ses détails. L’essentiel est l’organisation d’une insurrection massive dans le Nord. Face à la guerre et au risque de perdre la colonie, les commissaires Sonthonax et Polverel proclament l’émancipation. En 1794, la Convention abolit l’esclavage dans toutes les colonies françaises."
      },
      {
        "title": "4. Toussaint Louverture : liberté et autorité",
        "text": "Ancien esclave devenu général, Toussaint change d’alliance lorsque la République adopte l’abolition. Il reconquiert l’île et promulgue en 1801 une constitution autonome. Il protège la liberté juridique, mais contraint les cultivateurs à rester sur les plantations afin de relancer les exportations. Son gouvernement révèle donc une tension entre souveraineté, économie et aspirations populaires."
      },
      {
        "title": "5. Indépendance, héritages et contraintes",
        "text": "L’expédition Leclerc capture Toussaint, mort en France en 1803. Les troupes françaises utilisent une violence extrême et perdent aussi des hommes à cause de la fièvre jaune. Dessalines proclame l’indépendance sous le nom d’Haïti. Cette victoire bouleverse l’ordre racial atlantique, mais les puissances esclavagistes isolent le nouvel État. L’indemnité de 1825 pèse durablement sur ses finances."
      }
    ],
    "deeper": [
      {
        "title": "Une révolution mondiale",
        "text": "L’événement effraie les sociétés esclavagistes et nourrit les luttes abolitionnistes dans tout l’Atlantique."
      },
      {
        "title": "Le rôle des femmes",
        "text": "Elles participent aux combats, aux réseaux de ravitaillement, aux marchés et à la survie des communautés, malgré des sources souvent centrées sur les chefs militaires."
      },
      {
        "title": "Abolition et indépendance",
        "text": "La première est proclamée avant la seconde : les deux processus sont liés mais ne se confondent pas."
      }
    ],
    "takeaways": [
      {
        "label": "Plantation",
        "text": "La richesse coloniale repose sur un système de coercition massive."
      },
      {
        "label": "Insurrection",
        "text": "Les esclaves imposent eux-mêmes la question de la liberté."
      },
      {
        "label": "Toussaint",
        "text": "Son pouvoir défend l’abolition tout en maintenant une discipline du travail."
      },
      {
        "label": "Haïti",
        "text": "L’indépendance devient une rupture politique et raciale majeure."
      }
    ],
    "quiz": [
      {
        "kind": "cause",
        "q": "Pourquoi Saint-Domingue est-elle à la fois riche et fragile ?",
        "a": "Sa prospérité dépend d’une population esclavisée très nombreuse soumise à une violence extrême.",
        "choices": [
          "Elle ne produit aucune denrée exportable.",
          "Elle est coupée de toutes les routes maritimes.",
          "Elle possède une population entièrement libre."
        ],
        "why": "La richesse et la violence appartiennent au même système.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "politique",
        "q": "Que révèle la crise de 1789 dans la colonie ?",
        "a": "Plusieurs groupes utilisent le langage des droits pour défendre des objectifs différents.",
        "choices": [
          "Tous les colons demandent l’abolition immédiate.",
          "Les libres de couleur refusent toute citoyenneté.",
          "Les esclaves ignorent totalement les événements français."
        ],
        "why": "Les droits révolutionnaires font l’objet de luttes.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "chronologie",
        "q": "Quel lien unit l’insurrection et l’abolition ?",
        "a": "L’insurrection rend le maintien de l’esclavage politiquement et militairement intenable.",
        "choices": [
          "L’abolition est décidée avant toute révolte.",
          "L’insurrection vise à rétablir le Code noir.",
          "La France abolit seulement après 1804."
        ],
        "why": "La liberté est conquise sous la pression de la guerre.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi le pouvoir de Toussaint Louverture est-il ambivalent ?",
        "a": "Il défend la liberté juridique mais impose une discipline autoritaire aux cultivateurs.",
        "choices": [
          "Il rétablit officiellement l’esclavage.",
          "Il refuse toute production agricole.",
          "Il proclame l’indépendance dès 1791."
        ],
        "why": "Abolition et liberté du travail ne coïncident pas entièrement.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "héritage",
        "q": "Pourquoi 1804 est-il un événement mondial ?",
        "a": "Un État né d’une révolution d’esclaves renverse l’ordre colonial et racial atlantique.",
        "choices": [
          "Haïti devient immédiatement la première puissance européenne.",
          "La traite disparaît partout la même année.",
          "Toutes les colonies françaises deviennent indépendantes."
        ],
        "why": "La portée symbolique dépasse l’île.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta235-premium"
  },
  "art-renaissance-perspective-workshop": {
    "hook": "La perspective linéaire n’est pas une fenêtre neutre ouverte sur le réel. C’est une méthode géométrique de construction de l’espace, élaborée dans l’Italie du XVe siècle, puis adaptée, contournée ou combinée à d’autres traditions visuelles.",
    "keyFacts": [
      "La perspective organise les lignes vers un ou plusieurs points de fuite",
      "Alberti théorise une méthode déjà expérimentée par les artistes",
      "Les ateliers sont collectifs même si les signatures valorisent un maître",
      "Commanditaires religieux, civiques et privés orientent sujets et formats",
      "La Renaissance italienne n’efface ni les innovations du Nord ni les traditions antérieures"
    ],
    "express": [
      "Vers 1420, Brunelleschi réalise à Florence des expériences célèbres sur la représentation d’un bâtiment. Alberti expose ensuite des règles permettant de construire un espace cohérent sur une surface plane. Les lignes parallèles semblent converger vers un point de fuite, tandis que la taille apparente diminue avec la distance.",
      "Cette technique répond à des attentes particulières : donner unité à une scène, mesurer l’architecture, placer le spectateur. Elle ne copie pas exactement la vision humaine, qui bouge et combine deux yeux. D’autres œuvres utilisent plusieurs points de vue, hiérarchisent les figures par importance ou privilégient la surface décorative.",
      "La production repose sur des ateliers. Apprentis, assistants et spécialistes préparent panneaux, pigments, cartons ou parties secondaires. Le commanditaire définit souvent le sujet, le lieu et le coût. L’image de l’artiste solitaire masque donc des négociations économiques et collectives essentielles."
    ],
    "complete": [
      {
        "title": "1. Construire plutôt qu’imiter",
        "text": "La perspective linéaire part d’un observateur théorique placé à un point fixe. Une ligne d’horizon correspond à la hauteur de son regard ; des orthogonales convergent vers un point de fuite. Ce système permet de coordonner architecture et figures, mais il reste une convention. Il faut distinguer précision géométrique, illusion convaincante et naturalisme général."
      },
      {
        "title": "2. Perspective et narration",
        "text": "Masaccio utilise l’espace pour rendre une scène sacrée physiquement crédible ; Piero della Francesca explore rapports mathématiques et lumière ; Léonard travaille aussi le modelé atmosphérique. La perspective peut guider le regard vers le Christ, un donateur ou un événement central. Elle ne vaut donc pas seulement comme prouesse technique : elle organise le récit et la hiérarchie des significations."
      },
      {
        "title": "3. L’atelier derrière le chef-d’œuvre",
        "text": "Un atelier reçoit des commandes, forme des apprentis et conserve des modèles. Le maître peut dessiner la composition et peindre les parties prestigieuses tandis que d’autres exécutent fonds, draperies ou copies. Les attributions modernes deviennent difficiles parce que plusieurs mains travaillent dans un style commun. La signature croissante transforme néanmoins le statut social de certains artistes."
      },
      {
        "title": "4. Commande, argent et prestige",
        "text": "Églises, confréries, communes, marchands et princes financent les œuvres. Un contrat précise matériaux, dimensions, délais et parfois quantité de bleu outremer ou d’or. Les Médicis utilisent l’art pour la dévotion, le prestige et les alliances. Une œuvre n’est donc jamais seulement l’expression libre d’un créateur : elle répond à un espace, un public et une stratégie."
      },
      {
        "title": "5. Une Renaissance plurielle",
        "text": "Les peintres flamands perfectionnent la superposition de couches d’huile, les textures et les reflets sans suivre exactement le modèle italien. Les échanges transportent gravures, pigments et œuvres. Les artistes étudient aussi l’Antiquité, mais la période ne rompt pas brutalement avec le Moyen Âge. Continuités religieuses, techniques artisanales et innovations coexistent."
      }
    ],
    "deeper": [
      {
        "title": "Point de fuite",
        "text": "Il unifie certaines directions de l’espace représenté, mais toutes les compositions n’en utilisent pas un seul."
      },
      {
        "title": "Carton",
        "text": "Un dessin à grandeur réelle peut transférer une composition vers une fresque, une tapisserie ou un panneau."
      },
      {
        "title": "Attribution",
        "text": "Les analyses de pigments, supports et dessins aident à distinguer la main du maître, celle de l’atelier et les restaurations."
      }
    ],
    "takeaways": [
      {
        "label": "Perspective",
        "text": "Une convention géométrique, non une copie automatique de la vision."
      },
      {
        "label": "Atelier",
        "text": "La création est collective et organisée."
      },
      {
        "label": "Commande",
        "text": "Le sujet et la forme répondent à des intérêts précis."
      },
      {
        "label": "Pluralité",
        "text": "Italie et Europe du Nord innovent par des voies différentes."
      }
    ],
    "quiz": [
      {
        "kind": "technique",
        "q": "Que produit un point de fuite ?",
        "a": "Il fait converger dans l’image certaines lignes parallèles supposées s’éloigner du spectateur.",
        "choices": [
          "Il impose la même taille à toutes les figures.",
          "Il remplace les couleurs par des nombres.",
          "Il permet de voir derrière le tableau."
        ],
        "why": "La convergence construit une profondeur conventionnelle.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "fonction",
        "q": "À quoi sert la perspective dans une scène religieuse ?",
        "a": "Elle peut guider le regard et hiérarchiser le récit autant que créer une illusion d’espace.",
        "choices": [
          "Elle supprime toute dimension symbolique.",
          "Elle interdit la présence de donateurs.",
          "Elle transforme automatiquement l’œuvre en paysage."
        ],
        "why": "La technique participe au sens.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "production",
        "q": "Pourquoi l’idée du génie solitaire est-elle trompeuse ?",
        "a": "Parce que les ateliers répartissent préparation, exécution et reproduction entre plusieurs personnes.",
        "choices": [
          "Parce que les peintres ne signent jamais leurs œuvres.",
          "Parce que toutes les œuvres sont fabriquées par des machines.",
          "Parce que le commanditaire peint toujours le tableau."
        ],
        "why": "Le travail collectif est structurel.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "économie",
        "q": "Que peut préciser un contrat de commande ?",
        "a": "Le format, les matériaux, le délai et certains éléments iconographiques.",
        "choices": [
          "Uniquement le nom du futur musée.",
          "La réaction exacte de chaque spectateur.",
          "La valeur de l’œuvre cinq siècles plus tard."
        ],
        "why": "La commande encadre matériellement la création.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi parler de Renaissances au pluriel ?",
        "a": "Parce que les innovations varient selon les régions et prolongent aussi des traditions plus anciennes.",
        "choices": [
          "Parce que l’Italie n’a produit aucune nouveauté.",
          "Parce que tous les artistes européens travaillent dans le même atelier.",
          "Parce que la peinture disparaît au XVe siècle."
        ],
        "why": "La période est faite de circulations et de trajectoires distinctes.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta235-premium"
  },
  "cinema-montage-continuity-collision": {
    "hook": "Un plan ne possède pas un sens entièrement autonome. Placé après un visage, un bol de soupe, une porte fermée ou une foule en mouvement, il change de fonction. Le montage organise le temps, l’espace et l’interprétation du spectateur.",
    "keyFacts": [
      "Le montage sélectionne et ordonne les plans",
      "Les raccords de continuité rendent les coupes moins visibles",
      "L’effet Koulechov montre l’importance du contexte",
      "Le montage soviétique valorise parfois la collision plutôt que la fluidité",
      "Le son crée lui aussi des raccords, des ruptures et des ellipses"
    ],
    "express": [
      "Les premiers films peuvent montrer une scène en un seul plan, mais le cinéma développe rapidement des découpages. Un raccord dans le mouvement, un champ-contrechamp ou un regard vers un objet aide le spectateur à reconstruire un espace continu. La règle dite des 180 degrés stabilise les directions sans être une loi naturelle.",
      "Les expériences associées à Lev Koulechov montrent qu’un même visage paraît exprimer des émotions différentes selon le plan qui l’accompagne. Eisenstein théorise un montage de conflits : cadrages, rythmes et symboles se heurtent pour produire une idée, comme dans la séquence de l’escalier d’Odessa du Cuirassé Potemkine.",
      "Le montage peut aussi comprimer des années en quelques secondes, retarder une information, créer un parallèle ou désorienter volontairement. Avec le son, une voix peut commencer avant le changement d’image ou se poursuivre après. La continuité classique n’est donc qu’une stratégie parmi d’autres."
    ],
    "complete": [
      {
        "title": "1. Découper une action",
        "text": "Découper signifie choisir où placer la caméra et quand changer de plan. Un gros plan attire l’attention sur un détail ; un plan d’ensemble situe les corps. Au montage, la durée de chaque plan produit une cadence. Deux prises de la même action peuvent être reliées si le geste semble se poursuivre, même si elles ont été tournées à des moments différents."
      },
      {
        "title": "2. Rendre la coupe presque invisible",
        "text": "Le cinéma de continuité utilise raccord de regard, champ-contrechamp, axe des 180 degrés et cohérence des directions. Le but n’est pas de supprimer la coupe, mais de faire primer l’action sur sa présence. Ces règles se sont historiquement imposées dans certains studios ; elles peuvent être transgressées pour créer malaise, énergie ou ambiguïté."
      },
      {
        "title": "3. L’effet Koulechov",
        "text": "Dans la version la plus célèbre du récit, un visage neutre de l’acteur Mosjoukine est alterné avec une soupe, un cercueil ou une enfant. Les spectateurs attribuent au visage faim, tristesse ou tendresse. Les détails historiques de l’expérience sont discutés, mais son principe reste fécond : le sens naît de la relation entre les plans."
      },
      {
        "title": "4. Collision et montage intellectuel",
        "text": "Pour Eisenstein, une coupe peut être un choc. Dans Octobre ou Le Cuirassé Potemkine, formes, masses et rythmes construisent une réaction politique et émotionnelle. Le montage parallèle rapproche deux actions ; le montage métaphorique associe des images qui ne partagent pas le même lieu. Cette ambition ne signifie pas que le spectateur reçoit toujours exactement le message voulu."
      },
      {
        "title": "5. Temps, son et mémoire",
        "text": "Une ellipse retire une partie de l’action ; un flash-back réordonne la chronologie ; une séquence alternée crée l’attente entre plusieurs lieux. Le son peut relier deux espaces par un chevauchement, contredire l’image ou faire exister un hors-champ. Le montage final dépend aussi de contraintes de durée, de production et parfois de censure."
      }
    ],
    "deeper": [
      {
        "title": "Raccord de regard",
        "text": "Un personnage regarde hors champ, puis le plan suivant propose ce qu’il semble voir."
      },
      {
        "title": "Jump cut",
        "text": "Une coupe visible dans une action continue peut accélérer, troubler ou rappeler la fabrication du film."
      },
      {
        "title": "Montage numérique",
        "text": "Les logiciels accélèrent les essais, mais les décisions fondamentales restent celles de durée, ordre, rythme et point de vue."
      }
    ],
    "takeaways": [
      {
        "label": "Relation",
        "text": "Le sens naît souvent entre les plans."
      },
      {
        "label": "Continuité",
        "text": "Elle est construite par des conventions apprises."
      },
      {
        "label": "Collision",
        "text": "Une coupe peut créer une idée plutôt que cacher son existence."
      },
      {
        "label": "Temps",
        "text": "Le montage peut condenser, répéter ou déplacer la chronologie."
      }
    ],
    "quiz": [
      {
        "kind": "fonction",
        "q": "À quoi sert un raccord dans le mouvement ?",
        "a": "À relier deux plans en donnant l’impression que le geste se poursuit sans rupture.",
        "choices": [
          "À immobiliser tous les personnages.",
          "À supprimer la nécessité de cadrer.",
          "À faire entendre un son hors champ."
        ],
        "why": "La continuité est reconstruite malgré la coupe.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "convention",
        "q": "Que stabilise la règle des 180 degrés ?",
        "a": "Les directions et positions relatives des personnages dans l’espace.",
        "choices": [
          "La durée maximale d’un film.",
          "Le nombre d’acteurs autorisés.",
          "La vitesse de projection du son."
        ],
        "why": "Elle facilite l’orientation du spectateur.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "interprétation",
        "q": "Que montre l’effet Koulechov ?",
        "a": "Le contexte des plans voisins modifie l’émotion ou le sens attribué à une image.",
        "choices": [
          "Un visage possède toujours une signification unique.",
          "Le montage ne change jamais une performance.",
          "Les spectateurs ignorent les plans précédents."
        ],
        "why": "L’association guide l’interprétation.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "style",
        "q": "Qu’est-ce qu’un montage de collision ?",
        "a": "Un assemblage qui fait se heurter formes ou idées pour produire un effet nouveau.",
        "choices": [
          "Une erreur technique qui détruit la pellicule.",
          "Un plan-séquence sans aucune coupe.",
          "Une simple copie du théâtre filmé."
        ],
        "why": "La rupture peut devenir une méthode expressive.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "temps",
        "q": "Que fait une ellipse ?",
        "a": "Elle retire une portion de l’action que le spectateur reconstitue.",
        "choices": [
          "Elle répète obligatoirement le même plan.",
          "Elle ralentit chaque geste en temps réel.",
          "Elle empêche tout changement de lieu."
        ],
        "why": "Le montage choisit ce qui mérite d’être montré.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta235-premium"
  },
  "sci-vaccination-immune-memory": {
    "hook": "Un vaccin ne crée pas une barrière magique autour du corps. Il présente au système immunitaire une information suffisamment sûre pour qu’il prépare une réponse plus rapide et plus efficace lors d’une rencontre ultérieure avec l’agent infectieux.",
    "keyFacts": [
      "La variolisation précède la vaccination moderne",
      "Jenner utilise la vaccine contre la variole à la fin du XVIIIe siècle",
      "Les lymphocytes B et T participent à la mémoire immunitaire",
      "Un vaccin peut réduire maladie grave, transmission ou les deux selon le pathogène",
      "La protection collective dépend de l’efficacité, de la couverture et du mode de transmission"
    ],
    "express": [
      "Avant Jenner, plusieurs sociétés pratiquent la variolisation : elles exposent volontairement une personne à du matériel provenant de la variole pour provoquer une forme souvent moins grave. La méthode reste dangereuse. En 1796, Jenner expérimente l’utilisation de la vaccine, maladie bovine apparentée, et contribue à diffuser une approche plus sûre.",
      "Les vaccins modernes utilisent des stratégies différentes : agent atténué ou inactivé, protéine, vecteur viral, ARN messager. Tous cherchent à présenter un antigène. Des lymphocytes se multiplient, produisent des anticorps ou détruisent des cellules infectées, puis une partie persiste sous forme de cellules mémoire.",
      "L’efficacité n’est jamais identique pour toutes les personnes ni contre toutes les formes d’infection. Une dose de rappel peut renforcer ou actualiser la réponse. Les décisions de santé publique comparent bénéfices et risques, surveillent les effets indésirables et tiennent compte de la circulation du pathogène."
    ],
    "complete": [
      {
        "title": "1. De la variolisation à Jenner",
        "text": "La variolisation existe en Asie, en Afrique et dans l’Empire ottoman avant d’être introduite en Europe. Elle diminue le risque par rapport à une infection naturelle, mais peut provoquer la variole et transmettre la maladie. Jenner ne découvre donc pas l’idée d’immuniser ; il démontre et popularise l’usage d’un agent apparenté, puis le terme vaccination s’étend à d’autres maladies."
      },
      {
        "title": "2. Reconnaître un antigène",
        "text": "L’immunité adaptative distingue des structures moléculaires. Les lymphocytes B peuvent se différencier en plasmocytes producteurs d’anticorps ; les lymphocytes T auxiliaires coordonnent des réponses, et certains T cytotoxiques détruisent des cellules infectées. Un vaccin n’enseigne pas une phrase au corps : il sélectionne et amplifie des cellules capables de reconnaître une cible."
      },
      {
        "title": "3. Construire une mémoire",
        "text": "Après la réponse initiale, la majorité des cellules activées disparaît, mais des cellules mémoire persistent. Lors d’une nouvelle exposition, elles réagissent plus vite. La quantité d’anticorps circulants peut baisser sans que toute protection disparaisse. Inversement, une réponse mesurable ne garantit pas toujours une protection complète, car le pathogène et le site d’infection comptent."
      },
      {
        "title": "4. Efficacité individuelle et effet collectif",
        "text": "Un vaccin peut surtout prévenir les formes graves sans bloquer totalement l’infection. Pour réduire la circulation, il faut qu’il limite suffisamment la transmission et qu’une part importante de la population soit protégée. Le seuil collectif n’est pas un nombre universel : il dépend de la contagiosité, de la durée de protection, des contacts et des variants."
      },
      {
        "title": "5. Sécurité, rappels et confiance",
        "text": "Les essais comparent groupes vaccinés et témoins avant l’autorisation. La pharmacovigilance recherche ensuite des événements rares. Un effet survenant après une injection n’est pas automatiquement causé par elle : il faut comparer sa fréquence attendue. Les rappels compensent parfois une baisse de protection ou une évolution antigénique. Une communication honnête doit reconnaître incertitudes et bénéfices sans promettre le risque zéro."
      }
    ],
    "deeper": [
      {
        "title": "Éradication de la variole",
        "text": "La vaccination mondiale et la surveillance ont permis de déclarer la maladie éradiquée en 1980."
      },
      {
        "title": "Adjuvant",
        "text": "Il renforce certains signaux immunitaires afin d’améliorer la réponse à l’antigène."
      },
      {
        "title": "Corrélation de protection",
        "text": "Les chercheurs cherchent des marqueurs, comme un niveau d’anticorps, associés à une protection clinique, mais ils ne sont pas toujours simples."
      }
    ],
    "takeaways": [
      {
        "label": "Histoire",
        "text": "La vaccination prolonge des pratiques d’immunisation plus anciennes."
      },
      {
        "label": "Mémoire",
        "text": "Des cellules spécialisées rendent la réponse ultérieure plus rapide."
      },
      {
        "label": "Efficacité",
        "text": "Elle peut concerner infection, symptômes ou formes graves de manière différente."
      },
      {
        "label": "Sécurité",
        "text": "Elle s’évalue avant et après l’autorisation par comparaison de risques."
      }
    ],
    "quiz": [
      {
        "kind": "histoire",
        "q": "Pourquoi la variolisation reste-t-elle risquée ?",
        "a": "Elle utilise du matériel variolique et peut provoquer ou transmettre la maladie.",
        "choices": [
          "Elle ne déclenche aucune réponse immunitaire.",
          "Elle emploie uniquement des bactéries inoffensives.",
          "Elle est inventée après l’éradication de la variole."
        ],
        "why": "La protection est obtenue au prix d’une exposition dangereuse.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "mécanisme",
        "q": "Quel est le rôle des lymphocytes après vaccination ?",
        "a": "Certains reconnaissent l’antigène, se multiplient et produisent des effecteurs ou des cellules mémoire.",
        "choices": [
          "Ils remplacent toutes les cellules du sang.",
          "Ils empêchent toute inflammation pour toujours.",
          "Ils transforment le vaccin en antibiotique."
        ],
        "why": "La réponse adaptative sélectionne des cellules spécifiques.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "mémoire",
        "q": "Pourquoi une baisse des anticorps ne signifie-t-elle pas toujours absence totale de protection ?",
        "a": "Des cellules mémoire peuvent encore déclencher rapidement une nouvelle réponse.",
        "choices": [
          "Les anticorps ne jouent jamais aucun rôle.",
          "Le pathogène disparaît définitivement après une dose.",
          "La température du corps reste toujours élevée."
        ],
        "why": "La mémoire ne se réduit pas au taux instantané d’anticorps.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "collectif",
        "q": "Pourquoi le seuil de protection collective varie-t-il ?",
        "a": "Il dépend notamment de la contagiosité, de la transmission réduite par le vaccin et des contacts.",
        "choices": [
          "Il est fixé à 50 % pour toutes les maladies.",
          "Il dépend uniquement du prix du vaccin.",
          "Il ne change jamais avec les variants."
        ],
        "why": "Le mécanisme épidémiologique varie selon le contexte.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "sécurité",
        "q": "Pourquoi un événement survenu après vaccination ne prouve-t-il pas une causalité ?",
        "a": "Il faut comparer sa fréquence avec celle attendue sans vaccination et étudier le mécanisme.",
        "choices": [
          "Parce qu’aucun effet indésirable n’existe.",
          "Parce que la chronologie suffit toujours à exclure un lien.",
          "Parce que seuls les médecins vaccinés peuvent être malades."
        ],
        "why": "Après ne signifie pas nécessairement à cause de.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta235-premium"
  },
  "sci-electromagnetism-fields-induction": {
    "hook": "Au XIXe siècle, électricité et magnétisme cessent d’être deux catalogues séparés de phénomènes. Des expériences montrent qu’un courant agit sur une boussole, qu’un champ magnétique variable produit un courant et que lumière et ondes radio appartiennent à une même famille.",
    "keyFacts": [
      "Ørsted relie courant électrique et déviation magnétique en 1820",
      "Ampère décrit les forces entre courants",
      "Faraday découvre l’induction électromagnétique",
      "Maxwell formule une théorie unifiée des champs",
      "Les générateurs, moteurs et transformateurs exploitent ces relations"
    ],
    "express": [
      "En 1820, Ørsted observe qu’une aiguille aimantée se déplace près d’un fil parcouru par un courant. Ampère étudie alors les forces entre conducteurs. L’électricité produit donc des effets magnétiques, mais la relation ne se résume pas à un aimant caché dans le fil.",
      "Faraday montre qu’un courant apparaît dans un circuit lorsque le flux magnétique qui le traverse varie. Ce principe d’induction fonde la dynamo et le transformateur. Il raisonne avec des lignes de force, une manière concrète de penser l’espace autour des charges et des aimants.",
      "Maxwell traduit ces idées en équations : des champs électriques et magnétiques variables peuvent se propager sous forme d’ondes. Leur vitesse calculée correspond à celle de la lumière. Hertz produit ensuite des ondes radio en laboratoire. L’unification devient à la fois théorique et technologique."
    ],
    "complete": [
      {
        "title": "1. Du courant à l’effet magnétique",
        "text": "La déviation de la boussole dépend du sens du courant et de la position du fil. Le champ magnétique entoure le conducteur. Ampère montre aussi que deux fils parcourus par des courants exercent des forces l’un sur l’autre. Ces résultats poussent les physiciens à chercher des lois spatiales plutôt qu’une simple action mystérieuse à distance."
      },
      {
        "title": "2. Le champ comme objet physique",
        "text": "Faraday représente les interactions par des lignes de force. Le champ attribue à chaque point une direction et une intensité possibles. Cette idée évite de penser uniquement en termes de corps qui se tirent instantanément. Elle devient centrale en physique moderne, même si les lignes dessinées ne sont pas des fils matériels présents dans l’espace."
      },
      {
        "title": "3. L’induction électromagnétique",
        "text": "Déplacer un aimant dans une bobine, déplacer la bobine ou faire varier un autre courant peut créer une tension. Ce n’est pas la présence d’un champ constant qui suffit, mais sa variation à travers le circuit. La loi de Lenz indique que le courant induit s’oppose au changement qui le produit, ce qui exprime la conservation de l’énergie."
      },
      {
        "title": "4. Générateurs, moteurs et transformateurs",
        "text": "Un générateur transforme énergie mécanique en énergie électrique par induction. Un moteur fait l’inverse : un courant soumis à un champ produit un couple. Un transformateur utilise deux bobines et un flux variable pour modifier tension et intensité en courant alternatif. Le transport à haute tension réduit les pertes par effet Joule pour une puissance donnée."
      },
      {
        "title": "5. Maxwell, lumière et radio",
        "text": "Les équations de Maxwell contiennent une correction appelée courant de déplacement. Elles prédisent des ondes autonomes de champs électrique et magnétique. La lumière visible n’est qu’une petite partie du spectre électromagnétique, avec infrarouge, ultraviolet, micro-ondes ou rayons X. Fréquence et longueur d’onde changent, mais la description commune demeure."
      }
    ],
    "deeper": [
      {
        "title": "Dynamo",
        "text": "Le mouvement relatif entre conducteurs et champ magnétique permet de produire une tension."
      },
      {
        "title": "Courant alternatif",
        "text": "Sa variation périodique rend possible le fonctionnement efficace des transformateurs."
      },
      {
        "title": "Champ",
        "text": "C’est une grandeur définie dans l’espace, pas une simple image décorative autour d’un aimant."
      }
    ],
    "takeaways": [
      {
        "label": "Lien",
        "text": "Un courant crée un champ magnétique."
      },
      {
        "label": "Variation",
        "text": "Un flux magnétique changeant induit une tension."
      },
      {
        "label": "Conversion",
        "text": "Moteurs et générateurs transforment l’énergie dans deux sens opposés."
      },
      {
        "label": "Unification",
        "text": "La lumière est une onde électromagnétique."
      }
    ],
    "quiz": [
      {
        "kind": "expérience",
        "q": "Que montre l’expérience d’Ørsted ?",
        "a": "Un courant électrique produit un effet magnétique autour du conducteur.",
        "choices": [
          "Un aimant produit obligatoirement de la lumière visible.",
          "Une boussole contient une pile électrique.",
          "Le courant n’agit que lorsqu’il est immobile."
        ],
        "why": "Elle relie deux domaines jusque-là séparés.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "concept",
        "q": "À quoi sert la notion de champ ?",
        "a": "À décrire en chaque point l’action possible sur une charge ou un aimant.",
        "choices": [
          "À remplacer toutes les mesures par un dessin.",
          "À prouver que les lignes sont des objets matériels.",
          "À supprimer la distance entre les corps."
        ],
        "why": "Le champ organise l’interaction dans l’espace.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "induction",
        "q": "Qu’est-ce qui provoque une tension induite dans une bobine ?",
        "a": "Une variation du flux magnétique qui la traverse.",
        "choices": [
          "La présence éternelle d’un champ parfaitement constant.",
          "Le simple poids de la bobine.",
          "La couleur de l’isolant électrique."
        ],
        "why": "La variation est le mécanisme décisif.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "technologie",
        "q": "Pourquoi transporte-t-on souvent l’électricité à haute tension ?",
        "a": "Pour réduire le courant nécessaire et donc les pertes par effet Joule.",
        "choices": [
          "Pour rendre les électrons plus lourds.",
          "Pour empêcher toute transformation de tension.",
          "Pour produire directement du pétrole."
        ],
        "why": "À puissance donnée, un courant plus faible réduit les pertes résistives.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "unification",
        "q": "Quelle prédiction majeure vient des équations de Maxwell ?",
        "a": "Des ondes électromagnétiques se propagent à la vitesse de la lumière.",
        "choices": [
          "La lumière ne peut exister dans le vide.",
          "Toutes les ondes ont la même fréquence.",
          "Le magnétisme disparaît à grande distance."
        ],
        "why": "La correspondance de vitesse relie lumière et électromagnétisme.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta235-premium"
  },
  "astro-exoplanets-methods-habitability": {
    "hook": "La plupart des exoplanètes ne sont pas photographiées directement. Elles sont repérées par l’effet minuscule qu’elles produisent sur leur étoile : baisse périodique de lumière, mouvement de va-et-vient ou déformation gravitationnelle d’un arrière-plan.",
    "keyFacts": [
      "La première exoplanète autour d’une étoile de type solaire est confirmée en 1995",
      "La méthode des vitesses radiales mesure le mouvement de l’étoile",
      "Le transit révèle le rayon relatif de la planète",
      "Masse et rayon permettent d’estimer une densité moyenne",
      "Zone habitable ne signifie ni planète habitée ni même réellement habitable"
    ],
    "express": [
      "Une planète et son étoile tournent autour de leur centre de masse commun. La vitesse radiale détecte le léger décalage Doppler de la lumière stellaire. Elle fournit une masse minimale, car l’inclinaison de l’orbite n’est pas toujours connue. Les premières découvertes favorisent donc les planètes massives proches de leur étoile.",
      "Lors d’un transit, une planète passe devant son étoile et bloque une petite fraction de lumière. La profondeur du creux donne surtout le rapport des rayons. Plusieurs transits établissent la période. En combinant transit et vitesse radiale, on estime masse, rayon et densité, ce qui distingue grossièrement mondes rocheux et géantes gazeuses.",
      "Les spectres peuvent révéler certaines molécules dans une atmosphère, mais les signaux sont faibles et les nuages compliquent l’analyse. La zone habitable indique seulement où l’eau liquide pourrait exister en surface sous certaines hypothèses. Atmosphère, activité stellaire, géologie et histoire de la planète restent déterminantes."
    ],
    "complete": [
      {
        "title": "1. Détecter un mouvement invisible",
        "text": "La méthode des vitesses radiales observe les raies spectrales de l’étoile. Lorsqu’elle se rapproche, elles sont légèrement décalées vers le bleu ; lorsqu’elle s’éloigne, vers le rouge. Le signal dépend de la masse planétaire, de la période et de l’inclinaison. L’activité magnétique de l’étoile peut imiter ou brouiller un signal, d’où la nécessité de mesures répétées."
      },
      {
        "title": "2. Lire une courbe de transit",
        "text": "Un transit n’est visible que si l’orbite est presque alignée avec notre ligne de visée. Sa profondeur est approximativement liée au carré du rapport des rayons. Sa durée renseigne sur la géométrie de l’orbite. Des taches stellaires, une étoile compagne ou un système multiple peuvent créer des faux positifs ; les candidats doivent donc être validés."
      },
      {
        "title": "3. De la masse à la composition",
        "text": "Une même masse peut correspondre à des compositions différentes. La densité moyenne aide : une petite planète dense est probablement riche en roches et métaux, une planète volumineuse moins dense contient davantage de gaz ou de glaces. Mais l’intérieur reste modélisé, pas observé directement. Des atmosphères épaisses peuvent aussi gonfler le rayon."
      },
      {
        "title": "4. Atmosphères et spectres",
        "text": "Pendant un transit, une petite partie de la lumière traverse l’atmosphère et porte l’empreinte de molécules absorbantes. Lors d’une éclipse secondaire, on peut comparer la lumière du système avec et sans la face éclairée de la planète. Détecter eau, dioxyde de carbone ou méthane ne suffit pas à prouver la vie : ces molécules ont plusieurs origines."
      },
      {
        "title": "5. Habitable, habitée, comparable à la Terre",
        "text": "La zone habitable est calculée à partir de la luminosité de l’étoile et de modèles climatiques. Vénus et Mars montrent qu’une position favorable ne garantit rien. Une étoile active peut éroder une atmosphère ; un effet de serre peut devenir extrême. L’expression « Terre 2.0 » est donc souvent médiatique avant d’être scientifique."
      }
    ],
    "deeper": [
      {
        "title": "Biais de détection",
        "text": "Les méthodes trouvent plus facilement les grandes planètes proches de leur étoile ; les catalogues bruts ne représentent pas directement la population réelle."
      },
      {
        "title": "Microlentille",
        "text": "La gravité d’un système au premier plan amplifie brièvement une étoile lointaine et peut révéler une planète."
      },
      {
        "title": "Imagerie directe",
        "text": "Elle fonctionne surtout pour des planètes jeunes, chaudes et éloignées de leur étoile, dont on bloque la lumière."
      }
    ],
    "takeaways": [
      {
        "label": "Indirect",
        "text": "On détecte le plus souvent l’effet de la planète sur la lumière ou le mouvement de l’étoile."
      },
      {
        "label": "Combinaison",
        "text": "Transit et vitesse radiale donnent ensemble rayon et masse."
      },
      {
        "label": "Atmosphère",
        "text": "Un spectre fournit des indices, pas une photographie complète."
      },
      {
        "label": "Prudence",
        "text": "Zone habitable et vie ne sont pas synonymes."
      }
    ],
    "quiz": [
      {
        "kind": "méthode",
        "q": "Que mesure la vitesse radiale ?",
        "a": "Le mouvement périodique de l’étoile le long de notre ligne de visée.",
        "choices": [
          "Le diamètre direct de la planète.",
          "La température du noyau stellaire.",
          "La couleur réelle de l’orbite."
        ],
        "why": "Le décalage Doppler révèle le va-et-vient de l’étoile.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "transit",
        "q": "Que fournit principalement la profondeur d’un transit ?",
        "a": "Le rapport entre le rayon de la planète et celui de l’étoile.",
        "choices": [
          "La masse exacte de la planète.",
          "La présence certaine de vie.",
          "L’âge précis du système."
        ],
        "why": "La surface masquée dépend du carré des rayons.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "composition",
        "q": "Pourquoi combiner masse et rayon ?",
        "a": "Pour calculer une densité moyenne qui contraint la composition possible.",
        "choices": [
          "Pour connaître directement la carte des continents.",
          "Pour supprimer tous les modèles intérieurs.",
          "Pour mesurer la langue parlée par une civilisation."
        ],
        "why": "La densité distingue des familles de mondes.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "atmosphère",
        "q": "Pourquoi une molécule détectée n’est-elle pas une preuve de vie ?",
        "a": "Parce qu’elle peut être produite par plusieurs processus géologiques ou photochimiques.",
        "choices": [
          "Parce que les molécules n’existent pas dans les atmosphères.",
          "Parce que les spectres ne contiennent aucune information.",
          "Parce que toute vie détruit immédiatement les gaz."
        ],
        "why": "Un indice doit être interprété dans un contexte planétaire.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "prudence",
        "q": "Que signifie réellement « zone habitable » ?",
        "a": "Une région où l’eau liquide en surface est possible sous certaines hypothèses climatiques.",
        "choices": [
          "Une zone nécessairement habitée.",
          "Une orbite identique à celle de la Terre.",
          "Une planète sans atmosphère."
        ],
        "why": "Le terme indique une possibilité limitée, non un diagnostic.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta235-premium"
  },
  "eco-inflation-prices-central-bank": {
    "hook": "L’inflation n’est pas simplement le prix d’un produit qui augmente. Elle désigne une hausse durable et assez générale du niveau des prix, mesurée à partir d’un panier de consommation dont la composition et les pondérations influencent le résultat.",
    "keyFacts": [
      "Un indice des prix agrège de nombreux biens et services",
      "Un choc d’offre et un excès de demande peuvent tous deux alimenter l’inflation",
      "Les anticipations influencent salaires, contrats et fixation des prix",
      "Une banque centrale agit surtout par les taux et les conditions financières",
      "L’inflation redistribue entre débiteurs, créanciers, ménages et entreprises"
    ],
    "express": [
      "L’indice des prix à la consommation suit l’évolution d’un panier représentatif. Si l’énergie bondit tandis que d’autres prix restent stables, l’indice peut augmenter fortement sans que chaque bien renchérisse. L’inflation ressentie diffère selon le logement, les déplacements et la structure de consommation de chaque ménage.",
      "Les causes se combinent. Une demande forte peut rencontrer des capacités limitées ; un choc pétrolier ou une rupture logistique augmente les coûts ; une dépréciation monétaire renchérit les importations. Les entreprises répercutent plus ou moins ces hausses selon la concurrence, leurs marges et les contrats.",
      "Une banque centrale relève souvent ses taux pour ralentir crédit et demande. L’effet passe par les prêts immobiliers, l’investissement, le taux de change et les anticipations, avec des délais. Une politique trop faible laisse l’inflation s’installer ; trop brutale, elle peut provoquer chômage et récession."
    ],
    "complete": [
      {
        "title": "1. Mesurer un niveau général des prix",
        "text": "Un institut statistique relève des milliers de prix et attribue des poids selon les dépenses moyennes. Le panier est actualisé, ce qui complique les comparaisons très longues. L’inflation globale inclut énergie et alimentation ; une mesure sous-jacente retire certains éléments volatils pour repérer une tendance. Aucune mesure unique ne correspond exactement à chaque ménage."
      },
      {
        "title": "2. Demande, capacités et goulots d’étranglement",
        "text": "Quand ménages, entreprises ou État dépensent davantage que ce que l’économie peut produire à court terme, les tensions peuvent pousser les prix. Mais un choc d’offre réduit aussi la production disponible ou augmente ses coûts. Après une pandémie, reprise de la demande, pénuries de composants et perturbations logistiques peuvent donc agir ensemble."
      },
      {
        "title": "3. Salaires, marges et anticipations",
        "text": "Les salariés cherchent à préserver leur pouvoir d’achat ; les entreprises ajustent prix et marges. Une boucle prix-salaires n’est pas automatique : elle dépend du rapport de force, de la productivité et de la concurrence. Si tous anticipent une inflation durable, ils indexent davantage les contrats, ce qui peut rendre la hausse plus persistante."
      },
      {
        "title": "4. Comment agit une banque centrale",
        "text": "Le taux directeur influence les taux auxquels banques, ménages et entreprises empruntent. Des taux plus élevés rendent certains projets moins rentables, modèrent la demande et peuvent soutenir la monnaie. La banque centrale communique aussi sur sa trajectoire pour ancrer les anticipations. Elle ne peut cependant pas produire du gaz, débloquer un port ou construire immédiatement des logements."
      },
      {
        "title": "5. Gagnants, perdants et arbitrages",
        "text": "Une inflation inattendue réduit la valeur réelle d’une dette à taux fixe, ce qui peut aider l’emprunteur et pénaliser le prêteur. Les ménages modestes sont souvent plus exposés à l’alimentation et à l’énergie. Les épargnants perdent si le rendement reste inférieur à l’inflation. Combattre la hausse des prix suppose donc des choix distributifs autant que techniques."
      }
    ],
    "deeper": [
      {
        "title": "Prix relatif",
        "text": "Si les pommes augmentent mais que le reste baisse, il ne s’agit pas nécessairement d’inflation générale."
      },
      {
        "title": "Désinflation",
        "text": "C’est un ralentissement de l’inflation, pas une baisse générale des prix."
      },
      {
        "title": "Déflation",
        "text": "Elle correspond à une baisse durable du niveau général des prix et peut retarder dépenses et investissement."
      }
    ],
    "takeaways": [
      {
        "label": "Mesure",
        "text": "L’inflation dépend d’un panier pondéré."
      },
      {
        "label": "Causes",
        "text": "Demande, offre, importations et anticipations peuvent se combiner."
      },
      {
        "label": "Taux",
        "text": "La politique monétaire agit avec des délais et des coûts."
      },
      {
        "label": "Répartition",
        "text": "La hausse des prix ne touche pas tout le monde de la même façon."
      }
    ],
    "quiz": [
      {
        "kind": "définition",
        "q": "Quelle différence existe entre inflation et hausse d’un prix isolé ?",
        "a": "L’inflation concerne une progression durable et assez générale du niveau des prix.",
        "choices": [
          "Toute hausse de prix est automatiquement de l’inflation.",
          "L’inflation mesure uniquement le prix du pétrole.",
          "L’inflation exige que tous les prix augmentent exactement autant."
        ],
        "why": "La notion porte sur un ensemble pondéré.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "cause",
        "q": "Comment un choc d’offre peut-il créer de l’inflation ?",
        "a": "Il réduit la disponibilité ou augmente le coût de production de nombreux biens.",
        "choices": [
          "Il augmente automatiquement la productivité.",
          "Il rend tous les crédits gratuits.",
          "Il supprime la demande des ménages."
        ],
        "why": "Une offre plus coûteuse peut pousser les prix même sans surchauffe de la demande.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "anticipations",
        "q": "Pourquoi les anticipations comptent-elles ?",
        "a": "Elles influencent négociations salariales, contrats et décisions de prix.",
        "choices": [
          "Elles permettent de connaître parfaitement l’avenir.",
          "Elles remplacent toute production réelle.",
          "Elles empêchent les entreprises de changer leurs marges."
        ],
        "why": "Les comportements présents dépendent des prix attendus.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "politique",
        "q": "Pourquoi une hausse de taux peut-elle ralentir l’inflation ?",
        "a": "Elle renchérit le crédit et modère certains investissements et dépenses.",
        "choices": [
          "Elle augmente instantanément la quantité de pétrole.",
          "Elle fixe directement chaque prix en magasin.",
          "Elle supprime toutes les dettes publiques."
        ],
        "why": "La transmission passe par la demande et les conditions financières.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "répartition",
        "q": "Qui peut être avantagé par une inflation inattendue ?",
        "a": "Un emprunteur endetté à taux fixe si son revenu suit suffisamment les prix.",
        "choices": [
          "Un prêteur remboursé en monnaie dépréciée.",
          "Un épargnant dont le compte ne rapporte rien.",
          "Un ménage dont le salaire reste totalement bloqué."
        ],
        "why": "La valeur réelle de la dette peut diminuer.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta235-premium"
  },
  "geo-metropolization-networks-segregation": {
    "hook": "Une métropole n’est pas seulement une très grande ville. Elle concentre des fonctions de commandement, relie des réseaux lointains et organise un vaste espace quotidien. Cette puissance peut coexister avec de profondes inégalités entre quartiers et habitants.",
    "keyFacts": [
      "La métropolisation concentre emplois qualifiés, finance, recherche et culture",
      "Les réseaux de transport et de communication élargissent les régions urbaines",
      "La ségrégation résulte des prix, des politiques et des discriminations",
      "L’étalement augmente distances et dépendance à la mobilité",
      "Les métropoles sont souvent polycentriques plutôt qu’organisées autour d’un seul centre"
    ],
    "express": [
      "Les sièges sociaux, universités, équipements culturels, aéroports et services spécialisés se concentrent dans certaines grandes villes. Leur influence dépasse leur population : elles commandent des flux de capitaux, d’informations et de personnes. Mais toutes les villes millionnaires ne disposent pas du même pouvoir mondial.",
      "La région métropolitaine associe centre ancien, quartiers d’affaires, banlieues résidentielles, zones industrielles, plateformes logistiques et communes périurbaines. Les habitants utilisent des réseaux différents selon leur revenu, leur emploi et leur accès à la voiture ou aux transports collectifs.",
      "La valorisation foncière peut rénover un quartier tout en chassant une partie de ses habitants. Ailleurs, logements informels et quartiers mal desservis absorbent une urbanisation rapide. La fracture urbaine n’oppose donc pas toujours simplement centre riche et périphérie pauvre."
    ],
    "complete": [
      {
        "title": "1. Des fonctions de commandement",
        "text": "La métropolisation sélectionne certains lieux où se prennent des décisions économiques, politiques ou scientifiques. Les services très spécialisés cherchent la proximité d’autres acteurs qualifiés. Cette concentration produit des économies d’agglomération, mais aussi congestion et hausse des coûts. Une métropole peut être dominante à l’échelle nationale sans appartenir au premier rang mondial."
      },
      {
        "title": "2. Une ville-région en réseau",
        "text": "Les déplacements domicile-travail dépassent les limites administratives. Train, autoroute, métro, fibre et aéroport relient plusieurs pôles. Les entrepôts se placent près des échangeurs ; les bureaux suivent certaines gares ; les universités forment parfois de nouveaux centres. La ville contemporaine est donc souvent polycentrique, même si un centre historique conserve un poids symbolique."
      },
      {
        "title": "3. Ségrégation et accès inégal aux ressources",
        "text": "Les ménages ne choisissent pas librement parmi tous les quartiers : prix, offre de logement, discrimination et politiques scolaires contraignent les trajectoires. La ségrégation peut concerner revenu, origine, âge ou statut migratoire. Elle devient particulièrement pénalisante lorsque les emplois, soins et écoles de qualité sont éloignés ou mal accessibles."
      },
      {
        "title": "4. Gentrification et déplacements",
        "text": "L’arrivée d’investissements et de ménages plus aisés peut restaurer des bâtiments, ouvrir des commerces et améliorer l’espace public. Elle peut aussi augmenter loyers et taxes, transformer les usages et provoquer des départs directs ou progressifs. Mesurer la gentrification demande de suivre les populations, pas seulement l’apparence rénovée d’un quartier."
      },
      {
        "title": "5. Étalement, climat et gouvernance",
        "text": "L’habitat dispersé consomme des sols et multiplie les déplacements, mais la densité n’est bénéfique que si elle s’accompagne de services, d’espaces publics et de transports. Les îlots de chaleur touchent davantage les quartiers peu végétalisés. Or la gouvernance est fragmentée entre communes, régions, opérateurs et État, alors que les problèmes dépassent leurs frontières."
      }
    ],
    "deeper": [
      {
        "title": "Ville mondiale",
        "text": "Le terme désigne un nœud majeur des réseaux internationaux, pas simplement une ville très peuplée."
      },
      {
        "title": "Informalité",
        "text": "Les quartiers auto-construits peuvent manquer de droits fonciers et de réseaux, tout en possédant une économie et une organisation sociale complexes."
      },
      {
        "title": "Justice spatiale",
        "text": "Elle interroge la répartition des logements, transports, nuisances et équipements dans l’espace urbain."
      }
    ],
    "takeaways": [
      {
        "label": "Commandement",
        "text": "La métropole concentre des fonctions rares et connectées."
      },
      {
        "label": "Réseaux",
        "text": "Ses limites réelles dépassent souvent les frontières administratives."
      },
      {
        "label": "Ségrégation",
        "text": "L’accès à la ville dépend des prix, politiques et discriminations."
      },
      {
        "label": "Gouvernance",
        "text": "Les solutions exigent une coordination à l’échelle de la région urbaine."
      }
    ],
    "quiz": [
      {
        "kind": "définition",
        "q": "Pourquoi une métropole ne se définit-elle pas seulement par sa population ?",
        "a": "Parce qu’elle concentre des fonctions de commandement et organise des réseaux à plusieurs échelles.",
        "choices": [
          "Parce qu’une métropole doit toujours être une capitale.",
          "Parce qu’elle ne possède aucun habitant permanent.",
          "Parce que sa taille administrative suffit à mesurer son influence."
        ],
        "why": "Le rôle fonctionnel compte autant que le nombre.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "forme",
        "q": "Que signifie une organisation polycentrique ?",
        "a": "Plusieurs pôles d’emploi et de services structurent la région urbaine.",
        "choices": [
          "Tous les habitants vivent dans le centre historique.",
          "La ville ne possède aucun réseau de transport.",
          "Chaque commune est totalement indépendante des autres."
        ],
        "why": "La métropole n’est pas nécessairement organisée autour d’un cœur unique.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "inégalité",
        "q": "Pourquoi la ségrégation est-elle cumulative ?",
        "a": "Elle peut éloigner simultanément logement abordable, emplois, écoles et soins.",
        "choices": [
          "Elle garantit les mêmes ressources à tous les quartiers.",
          "Elle dépend uniquement des préférences esthétiques.",
          "Elle disparaît dès qu’une route est construite."
        ],
        "why": "Les inégalités spatiales se renforcent entre elles.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "gentrification",
        "q": "Pourquoi une rénovation ne suffit-elle pas à prouver une gentrification ?",
        "a": "Il faut aussi observer hausse des prix, changement social et déplacements des habitants.",
        "choices": [
          "Parce qu’aucun quartier rénové ne change jamais.",
          "Parce que la gentrification concerne uniquement les usines.",
          "Parce que les loyers baissent toujours après des travaux."
        ],
        "why": "Le processus est social autant que paysager.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "gouvernance",
        "q": "Pourquoi les politiques urbaines doivent-elles dépasser la commune ?",
        "a": "Parce que mobilités, pollution, logement et emplois fonctionnent à l’échelle métropolitaine.",
        "choices": [
          "Parce que les communes n’ont jamais d’habitants.",
          "Parce que tous les problèmes sont mondiaux uniquement.",
          "Parce que les transports ne franchissent aucune frontière."
        ],
        "why": "Les flux ignorent souvent les limites administratives.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta235-premium"
  },
  "music-jazz-blues-swing-bebop": {
    "hook": "Le jazz n’est ni une musique sans règles ni le produit d’un seul inventeur. Il naît de traditions afro-américaines, de fanfares, de blues, de ragtime, de spirituals et de cultures urbaines, puis se transforme au rythme des migrations, des clubs et de l’industrie du disque.",
    "keyFacts": [
      "La Nouvelle-Orléans est un foyer important mais non unique",
      "L’improvisation s’appuie sur des formes et conventions partagées",
      "Le swing désigne une organisation du rythme autant qu’une période",
      "La Grande Migration diffuse les musiciens vers Chicago et New York",
      "Le bebop déplace le jazz vers de petits ensembles et une écoute plus attentive"
    ],
    "express": [
      "À la fin du XIXe siècle, musiciens noirs créoles et afro-américains croisent blues, marches, ragtime, chants religieux et pratiques de danse. À La Nouvelle-Orléans, trompettes, clarinettes et trombones improvisent parfois plusieurs lignes simultanées. Les récits qui attribuent l’invention à un seul homme simplifient un processus collectif.",
      "La Grande Migration transporte musiciens et publics vers Chicago, Kansas City ou New York. Dans les années 1930, les big bands développent arrangements, sections de cuivres et solistes. Le swing repose sur une pulsation souple, un placement rythmique et une interaction qui ne se réduit pas à écrire deux croches inégales.",
      "Dans les années 1940, Charlie Parker, Dizzy Gillespie, Thelonious Monk et d’autres élaborent le bebop : tempos rapides, harmonies denses, thèmes anguleux, petits groupes. Cette musique reste liée au blues et au standard, mais revendique aussi une autonomie artistique face aux attentes commerciales et raciales."
    ],
    "complete": [
      {
        "title": "1. Des sources multiples",
        "text": "Le blues apporte formes, inflexions et rapports entre voix et instrument ; le ragtime développe la syncope écrite ; les fanfares fournissent instruments et répertoire ; les pratiques africaines diasporiques nourrissent polyrythmie, appel-réponse et variation. Aucun ingrédient isolé ne suffit. Le jazz naît de rencontres sous les contraintes de la ségrégation."
      },
      {
        "title": "2. Improviser dans une structure",
        "text": "Un musicien improvise sur une grille harmonique, une forme de blues, un thème ou un mode. Il écoute la section rythmique, reprend un motif, le transforme et répond aux autres. La liberté dépend donc d’un vocabulaire et d’une mémoire partagés. Une improvisation peut être préparée dans son style sans être écrite note par note."
      },
      {
        "title": "3. Swing et big bands",
        "text": "Les orchestres de Duke Ellington, Count Basie ou Fletcher Henderson organisent des sections de saxophones, trompettes, trombones et rythme. Les arrangements alternent riffs, réponses et solos. Les danseurs participent à l’économie des salles. Le mot swing décrit aussi une sensation de propulsion produite par l’accentuation, le phrasé et le placement collectif."
      },
      {
        "title": "4. Disque, radio et inégalités raciales",
        "text": "L’enregistrement diffuse des styles mais fixe des catégories commerciales comme race records. Des musiciens noirs créent des innovations parfois exploitées par des producteurs ou reprises par des orchestres blancs mieux distribués. La radio et les tournées élargissent le public, tandis que clubs, hôtels et syndicats restent ségrégués."
      },
      {
        "title": "5. Bebop : rupture et continuité",
        "text": "Les jam-sessions de Harlem permettent d’explorer substitutions harmoniques, tempos rapides et phrasés complexes. Le bebop est moins adapté aux grandes salles de danse et valorise l’écoute du soliste. Il ne détruit pourtant pas le jazz antérieur : il réemploie blues, standards et cycles harmoniques, tout en changeant le statut social du musicien."
      }
    ],
    "deeper": [
      {
        "title": "Blue notes",
        "text": "Certaines hauteurs sont infléchies entre les degrés du système tempéré, ce qui donne au phrasé une expressivité particulière."
      },
      {
        "title": "Standard",
        "text": "Une chanson connue fournit une structure commune que les musiciens peuvent réharmoniser et improviser."
      },
      {
        "title": "Call and response",
        "text": "Un motif appelle une réponse instrumentale ou vocale ; ce principe organise autant la forme que la relation sociale."
      }
    ],
    "takeaways": [
      {
        "label": "Collectif",
        "text": "Le jazz naît de traditions croisées et d’histoires communautaires."
      },
      {
        "label": "Improvisation",
        "text": "Elle utilise des règles, une écoute et un vocabulaire."
      },
      {
        "label": "Swing",
        "text": "C’est une relation rythmique vécue collectivement."
      },
      {
        "label": "Bebop",
        "text": "Il transforme la complexité et le statut artistique sans effacer le blues."
      }
    ],
    "quiz": [
      {
        "kind": "origines",
        "q": "Pourquoi est-il trompeur de chercher un inventeur unique du jazz ?",
        "a": "Parce que le genre résulte de multiples traditions et communautés en interaction.",
        "choices": [
          "Parce que le jazz est créé par un logiciel.",
          "Parce qu’il apparaît simultanément sans musiciens.",
          "Parce que toutes ses œuvres sont anonymes."
        ],
        "why": "La naissance est collective et progressive.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "improvisation",
        "q": "Sur quoi repose une improvisation ?",
        "a": "Sur une forme, un vocabulaire, une écoute et des conventions partagés.",
        "choices": [
          "Sur l’absence totale de rythme et d’accords.",
          "Sur la répétition obligatoire d’une partition exacte.",
          "Sur le silence de tous les autres musiciens."
        ],
        "why": "La liberté se construit à l’intérieur d’un cadre.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "rythme",
        "q": "Pourquoi le swing ne se réduit-il pas à deux croches inégales ?",
        "a": "Parce qu’il dépend aussi du placement, des accents et de l’interaction collective.",
        "choices": [
          "Parce qu’il n’utilise jamais de pulsation.",
          "Parce qu’il impose toujours le même tempo.",
          "Parce qu’il est uniquement un type d’instrument."
        ],
        "why": "Le swing est une sensation rythmique globale.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "industrie",
        "q": "Comment l’industrie musicale reproduit-elle des inégalités ?",
        "a": "Elle classe, distribue et rémunère différemment les artistes selon des rapports raciaux et commerciaux.",
        "choices": [
          "Elle interdit tout enregistrement de musique.",
          "Elle garantit les mêmes contrats à tous.",
          "Elle supprime la ségrégation des salles."
        ],
        "why": "La diffusion ne neutralise pas les rapports de pouvoir.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "bebop",
        "q": "Quelle continuité subsiste dans le bebop ?",
        "a": "Il conserve blues, standards et structures harmoniques tout en les complexifiant.",
        "choices": [
          "Il abandonne toute improvisation.",
          "Il revient uniquement aux marches militaires.",
          "Il supprime les petits ensembles."
        ],
        "why": "La rupture stylistique réemploie un langage plus ancien.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta235-premium"
  },
  "lit-negritude-cesaire-senghor-damas": {
    "hook": "Dans le Paris des années 1930, des étudiants noirs venus des Antilles, d’Afrique et de Guyane refusent l’assimilation coloniale qui présente l’Europe comme unique mesure de l’universel. Ils transforment la poésie française en lieu de mémoire, de colère et de réinvention.",
    "keyFacts": [
      "Le terme Négritude est associé à Aimé Césaire",
      "Léopold Sédar Senghor et Léon-Gontran Damas sont des figures majeures",
      "Le mouvement se forme dans un espace intellectuel transatlantique",
      "La poésie renverse les stéréotypes coloniaux et revendique une histoire noire",
      "La Négritude suscite ensuite des critiques sur le risque d’essentialiser une identité"
    ],
    "express": [
      "Césaire, Senghor et Damas se rencontrent à Paris dans un contexte de racisme, d’empire colonial et de débats panafricains. Ils lisent la Renaissance de Harlem, des ethnologues, des marxistes et des écrivains antillais. La revue L’Étudiant noir contribue à faire circuler leurs idées.",
      "Dans le Cahier d’un retour au pays natal, Césaire mêle images volcaniques, histoire de l’esclavage, colère et invention verbale. Damas utilise ironie, répétitions et rythme pour attaquer l’éducation assimilatrice. Senghor célèbre des héritages africains et cherche une civilisation de l’universel fondée sur la rencontre plutôt que sur l’effacement.",
      "Le mouvement n’est pas une doctrine homogène. Frantz Fanon, Wole Soyinka ou des penseuses féministes interrogent l’idée d’une essence noire unique et le poids des expériences masculines. Pourtant, la Négritude demeure décisive pour les luttes anticoloniales, la poésie francophone et les débats sur langue et identité."
    ],
    "complete": [
      {
        "title": "1. Paris, capitale impériale et lieu de rencontre",
        "text": "Les étudiants colonisés vivent au centre de l’empire tout en subissant préjugés et injonctions à l’assimilation. Paris permet des rencontres entre Antillais, Africains et Afro-Américains. Les circulations ne sont pas à sens unique : journaux, musique, surréalisme, communisme et panafricanisme composent un espace intellectuel conflictuel."
      },
      {
        "title": "2. Nommer ce que le colonialisme dévalue",
        "text": "Le mot Négritude reprend un terme insultant et en inverse la charge. Il affirme que l’histoire, les cultures et les sensibilités noires ne sont pas des manques à corriger. Cette réappropriation n’est pas seulement identitaire : elle conteste les hiérarchies politiques qui justifient domination, travail forcé et dépossession."
      },
      {
        "title": "3. Une révolution de la langue poétique",
        "text": "Césaire étire la phrase, accumule images, ruptures et mots rares. Damas fait entendre la contrainte par des répétitions sèches et un rythme proche de l’oral. Senghor travaille musicalité, parallélismes et symboles. Tous écrivent en français, langue coloniale, mais la déplacent par d’autres mémoires et cadences. L’outil imposé devient ainsi matière de contestation."
      },
      {
        "title": "4. Différences internes",
        "text": "Césaire lie davantage Négritude, surréalisme et révolution ; Senghor insiste sur la rencontre des civilisations et assume parfois des oppositions entre raison européenne et émotion noire aujourd’hui critiquées ; Damas privilégie une satire incisive de l’assimilation. Le mouvement ne doit donc pas être réduit à une formule commune répétée par trois auteurs identiques."
      },
      {
        "title": "5. Critiques et héritages",
        "text": "Fanon analyse la fabrication coloniale des identités et juge insuffisant le retour à une essence passée. Soyinka lance la formule célèbre selon laquelle le tigre ne proclame pas sa tigritude. Des autrices soulignent aussi l’effacement des femmes. Ces critiques n’annulent pas le mouvement : elles prolongent sa question centrale, comment reprendre la parole sans figer une identité."
      }
    ],
    "deeper": [
      {
        "title": "Cahier d’un retour au pays natal",
        "text": "Le poème de Césaire transforme le retour en Martinique en exploration de l’aliénation, de la mémoire et de la révolte."
      },
      {
        "title": "Présence Africaine",
        "text": "La revue et maison d’édition fondée en 1947 devient un carrefour intellectuel majeur."
      },
      {
        "title": "Francophonie",
        "text": "Senghor participe plus tard à son institutionnalisation, ce qui alimente des débats sur coopération culturelle et héritage colonial."
      }
    ],
    "takeaways": [
      {
        "label": "Réappropriation",
        "text": "Un mot dévalorisant devient outil de fierté et de lutte."
      },
      {
        "label": "Langue",
        "text": "Le français est transformé de l’intérieur par le rythme et l’imaginaire."
      },
      {
        "label": "Pluralité",
        "text": "Césaire, Senghor et Damas ne défendent pas exactement la même vision."
      },
      {
        "label": "Débat",
        "text": "Les critiques interrogent l’essentialisme sans effacer la portée anticoloniale."
      }
    ],
    "quiz": [
      {
        "kind": "contexte",
        "q": "Pourquoi Paris joue-t-il un rôle important ?",
        "a": "La ville met en contact des étudiants et courants noirs venus de plusieurs espaces coloniaux et atlantiques.",
        "choices": [
          "Parce que l’empire colonial n’y est jamais discuté.",
          "Parce que tous les auteurs sont nés dans le même quartier.",
          "Parce que la poésie africaine n’existe qu’en France."
        ],
        "why": "Le mouvement naît d’une circulation transnationale.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 1."
      },
      {
        "kind": "notion",
        "q": "Que fait le mot Négritude ?",
        "a": "Il retourne une désignation dévalorisante en affirmation historique et politique.",
        "choices": [
          "Il impose l’abandon de toute culture africaine.",
          "Il désigne uniquement une école de peinture.",
          "Il affirme la supériorité biologique d’un peuple."
        ],
        "why": "La réappropriation conteste la hiérarchie coloniale.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 2."
      },
      {
        "kind": "style",
        "q": "Comment les auteurs transforment-ils le français ?",
        "a": "Ils le travaillent par images, ruptures, répétitions et rythmes liés à d’autres mémoires.",
        "choices": [
          "Ils refusent d’utiliser toute phrase.",
          "Ils écrivent uniquement des traductions littérales.",
          "Ils conservent exactement le style administratif colonial."
        ],
        "why": "La langue imposée devient une matière de création.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 3."
      },
      {
        "kind": "pluralité",
        "q": "Pourquoi ne faut-il pas présenter les trois auteurs comme identiques ?",
        "a": "Leurs styles, références et conceptions politiques diffèrent sensiblement.",
        "choices": [
          "Parce qu’un seul d’entre eux écrit de la poésie.",
          "Parce qu’ils vivent à des siècles différents.",
          "Parce qu’ils refusent tous l’anticolonialisme."
        ],
        "why": "Le mouvement possède des tensions internes.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 4."
      },
      {
        "kind": "critique",
        "q": "Quel risque les critiques de la Négritude soulignent-elles ?",
        "a": "Figer une identité noire en essence unique et parfois masculine.",
        "choices": [
          "Accorder trop de place aux archives coloniales.",
          "Défendre uniquement la poésie médiévale.",
          "Refuser toute revendication politique."
        ],
        "why": "Une identité libératrice peut devenir simplificatrice si elle est essentialisée.",
        "trap": "Choisir une formule séduisante mais trop simple ou contredite par le cours.",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta235-premium"
  }
};
  const MYSTERIES = [
  {
    "id": "history-mystery-mansa-musa-235",
    "discipline": "history",
    "difficulty": "moyen",
    "title": "Le pèlerin au cortège d’or",
    "caseTitle": "Un souverain du Sahel sur les cartes méditerranéennes",
    "subjectType": "personnage historique",
    "periodHint": "XIVe siècle · empire du Mali",
    "lessonId": "history-mali-songhai-sahel",
    "prompt": "En 1324, ce souverain traverse l’Égypte en route vers La Mecque. Son cortège impressionne les chroniqueurs et fait connaître son empire bien au-delà du Sahel.",
    "answer": "Mansa Musa",
    "aliases": [
      "mansa musa",
      "moussa du mali",
      "kankou moussa",
      "mansa moussa"
    ],
    "clues": [
      "Il règne sur l’empire du Mali.",
      "Son voyage est un pèlerinage à La Mecque.",
      "Son nom apparaît sur le célèbre Atlas catalan."
    ],
    "explanation": "Mansa Musa est le souverain malien dont le pèlerinage de 1324 devient un symbole de la puissance sahélienne.",
    "blockedGuesses": [
      "songhai",
      "askia mohammed",
      "tombouctou"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "history-mystery-toussaint-235",
    "discipline": "history",
    "difficulty": "moyen",
    "title": "Le général devenu gouverneur",
    "caseTitle": "Liberté, plantations et autonomie à Saint-Domingue",
    "subjectType": "personnage historique",
    "periodHint": "Révolution haïtienne",
    "lessonId": "history-haiti-revolution-slavery",
    "prompt": "Ancien esclave devenu général de la République française, il rejoint le camp abolitionniste, gouverne Saint-Domingue et promulgue une constitution autonome en 1801.",
    "answer": "Toussaint Louverture",
    "aliases": [
      "toussaint louverture",
      "louverture",
      "toussaint bréda",
      "toussaint breda"
    ],
    "clues": [
      "Il change d’alliance après l’abolition française.",
      "Il ne proclame pas lui-même l’indépendance d’Haïti.",
      "Capturé en 1802, il meurt emprisonné en France."
    ],
    "explanation": "Toussaint Louverture dirige une grande partie de la révolution avant l’expédition napoléonienne.",
    "blockedGuesses": [
      "dessalines",
      "sonthonax",
      "napoleon"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "art-mystery-linear-perspective-235",
    "discipline": "art",
    "difficulty": "facile",
    "title": "Toutes les lignes se rejoignent",
    "caseTitle": "Construire une profondeur depuis un regard fixe",
    "subjectType": "procédé de représentation",
    "periodHint": "Renaissance italienne",
    "lessonId": "art-renaissance-perspective-workshop",
    "prompt": "Des lignes supposées parallèles semblent converger vers un point situé sur l’horizon, afin d’organiser un espace cohérent sur une surface plane.",
    "answer": "La perspective linéaire",
    "aliases": [
      "perspective linéaire",
      "la perspective lineaire",
      "perspective",
      "perspective centrale"
    ],
    "clues": [
      "Elle se développe fortement dans l’Italie du XVe siècle.",
      "Alberti en expose les principes.",
      "Elle utilise notamment horizon et point de fuite."
    ],
    "explanation": "La perspective linéaire est une convention géométrique majeure de la Renaissance.",
    "blockedGuesses": [
      "sfumato",
      "clair-obscur",
      "trompe-l’œil"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "cinema-mystery-kuleshov-235",
    "discipline": "cinema",
    "difficulty": "moyen",
    "title": "Le visage ne change pas, l’émotion oui",
    "caseTitle": "Une image interprétée par celle qui la suit",
    "subjectType": "effet de montage",
    "periodHint": "Cinéma soviétique des années 1920",
    "lessonId": "cinema-montage-continuity-collision",
    "prompt": "Un même visage neutre paraît exprimer faim, tristesse ou tendresse selon qu’il est associé à une soupe, un cercueil ou une enfant.",
    "answer": "L’effet Koulechov",
    "aliases": [
      "effet koulechov",
      "l effet koulechov",
      "kuleshov effect",
      "effet kuleshov"
    ],
    "clues": [
      "Il porte le nom d’un cinéaste et théoricien russe.",
      "Il montre que le sens naît entre les plans.",
      "Les détails exacts de l’expérience historique sont discutés."
    ],
    "explanation": "L’effet Koulechov désigne la modification du sens d’un plan par son voisinage au montage.",
    "blockedGuesses": [
      "raccord regard",
      "montage parallèle",
      "champ contrechamp"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "science-mystery-immune-memory-235",
    "discipline": "science-inventions",
    "difficulty": "moyen",
    "title": "Une défense qui se souvient",
    "caseTitle": "Réagir plus vite lors d’une nouvelle exposition",
    "subjectType": "mécanisme biologique",
    "periodHint": "Immunologie",
    "lessonId": "sci-vaccination-immune-memory",
    "prompt": "Après une première réponse, certaines cellules persistent longtemps et permettent une réaction plus rapide et souvent plus forte lorsque le même antigène revient.",
    "answer": "La mémoire immunitaire",
    "aliases": [
      "mémoire immunitaire",
      "la mémoire immunitaire",
      "cellules mémoire",
      "memoire immunitaire"
    ],
    "clues": [
      "Elle implique notamment des lymphocytes B et T.",
      "Elle ne se réduit pas au taux instantané d’anticorps.",
      "C’est le principe recherché par la vaccination."
    ],
    "explanation": "La mémoire immunitaire permet au système adaptatif de répondre plus efficacement à une rencontre ultérieure.",
    "blockedGuesses": [
      "immunité innée",
      "antibiotique",
      "inflammation"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "science-mystery-induction-235",
    "discipline": "science-inventions",
    "difficulty": "moyen",
    "title": "Le courant né d’un changement",
    "caseTitle": "Une bobine, un aimant et un flux variable",
    "subjectType": "loi physique",
    "periodHint": "Électromagnétisme du XIXe siècle",
    "lessonId": "sci-electromagnetism-fields-induction",
    "prompt": "Une tension apparaît dans un circuit lorsque le flux magnétique qui le traverse varie, par déplacement ou par changement du champ.",
    "answer": "L’induction électromagnétique",
    "aliases": [
      "induction électromagnétique",
      "l induction electromagnetique",
      "induction",
      "loi de faraday"
    ],
    "clues": [
      "Faraday la met en évidence.",
      "Elle fonde le fonctionnement des générateurs.",
      "La loi de Lenz précise le sens du courant créé."
    ],
    "explanation": "L’induction électromagnétique transforme une variation de flux magnétique en tension électrique.",
    "blockedGuesses": [
      "effet joule",
      "électrostatique",
      "courant continu"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "astronomy-mystery-transit-method-235",
    "discipline": "astronomy",
    "difficulty": "facile",
    "title": "Une étoile baisse régulièrement",
    "caseTitle": "Mesurer un monde par l’ombre qu’il produit",
    "subjectType": "méthode de détection",
    "periodHint": "Recherche d’exoplanètes",
    "lessonId": "astro-exoplanets-methods-habitability",
    "prompt": "À intervalles réguliers, la luminosité d’une étoile diminue légèrement parce qu’un objet passe devant son disque depuis notre point de vue.",
    "answer": "La méthode des transits",
    "aliases": [
      "méthode des transits",
      "transit",
      "transits",
      "méthode du transit"
    ],
    "clues": [
      "Elle exige une orbite presque alignée avec notre regard.",
      "La profondeur du signal renseigne sur le rayon relatif.",
      "Plusieurs passages permettent de déterminer la période."
    ],
    "explanation": "La méthode des transits détecte une planète par la baisse périodique de lumière qu’elle provoque.",
    "blockedGuesses": [
      "vitesse radiale",
      "imagerie directe",
      "microlentille"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "economy-mystery-inflation-235",
    "discipline": "economy",
    "difficulty": "facile",
    "title": "Le panier coûte de plus en plus cher",
    "caseTitle": "Une hausse générale plutôt qu’un prix isolé",
    "subjectType": "phénomène économique",
    "periodHint": "Économie monétaire",
    "lessonId": "eco-inflation-prices-central-bank",
    "prompt": "Un indice pondéré montre qu’un ensemble large de biens et services devient durablement plus cher, même si certains prix baissent encore.",
    "answer": "L’inflation",
    "aliases": [
      "inflation",
      "l inflation",
      "hausse générale des prix"
    ],
    "clues": [
      "Elle se mesure avec un panier de consommation.",
      "Elle peut venir de la demande comme de l’offre.",
      "Son ralentissement s’appelle la désinflation."
    ],
    "explanation": "L’inflation est une hausse durable et assez générale du niveau des prix.",
    "blockedGuesses": [
      "déflation",
      "désinflation",
      "prix relatif"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "geography-mystery-metropolization-235",
    "discipline": "geography",
    "difficulty": "moyen",
    "title": "Le pouvoir se concentre dans quelques nœuds",
    "caseTitle": "Des villes qui commandent des réseaux plus vastes",
    "subjectType": "processus géographique",
    "periodHint": "Urbanisation contemporaine",
    "lessonId": "geo-metropolization-networks-segregation",
    "prompt": "Emplois qualifiés, sièges sociaux, recherche, culture et connexions internationales se concentrent dans certaines grandes régions urbaines, parfois au prix de fortes fractures internes.",
    "answer": "La métropolisation",
    "aliases": [
      "métropolisation",
      "la métropolisation",
      "metropolisation"
    ],
    "clues": [
      "Elle ne se confond pas avec la simple croissance démographique.",
      "Elle renforce des fonctions de commandement.",
      "Elle peut produire gentrification et ségrégation."
    ],
    "explanation": "La métropolisation concentre pouvoirs et réseaux dans certaines grandes villes et régions urbaines.",
    "blockedGuesses": [
      "urbanisation",
      "mégapole",
      "périurbanisation"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "music-mystery-swing-235",
    "discipline": "music",
    "difficulty": "moyen",
    "title": "Une pulsation qui avance sans être mécanique",
    "caseTitle": "Placement, accents et interaction collective",
    "subjectType": "notion rythmique",
    "periodHint": "Jazz",
    "lessonId": "music-jazz-blues-swing-bebop",
    "prompt": "Cette sensation de propulsion dépend du phrasé, des accents, du placement des notes et de l’écoute entre musiciens ; elle ne se réduit pas à écrire deux croches inégales.",
    "answer": "Le swing",
    "aliases": [
      "swing",
      "le swing",
      "faire swinguer"
    ],
    "clues": [
      "Le mot désigne aussi une période dominée par les big bands.",
      "Count Basie et Duke Ellington en offrent des conceptions différentes.",
      "Il s’entend autant dans la section rythmique que chez le soliste."
    ],
    "explanation": "Le swing est une organisation vivante du rythme et de la pulsation dans le jazz.",
    "blockedGuesses": [
      "syncope",
      "bebop",
      "ragtime"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "literature-mystery-negritude-235",
    "discipline": "literature",
    "difficulty": "moyen",
    "title": "Retourner un mot imposé",
    "caseTitle": "Poésie, identité et lutte anticoloniale",
    "subjectType": "mouvement littéraire et politique",
    "periodHint": "Années 1930 · monde francophone",
    "lessonId": "lit-negritude-cesaire-senghor-damas",
    "prompt": "Césaire, Senghor et Damas reprennent dans la poésie française une désignation raciale dévalorisée pour affirmer des histoires et cultures noires contre l’assimilation coloniale.",
    "answer": "La Négritude",
    "aliases": [
      "négritude",
      "la négritude",
      "negritude"
    ],
    "clues": [
      "Le terme est particulièrement associé à Aimé Césaire.",
      "Le mouvement se forme à Paris dans les années 1930.",
      "Il est ensuite critiqué pour le risque d’essentialiser une identité."
    ],
    "explanation": "La Négritude est un mouvement de réappropriation culturelle, littéraire et anticoloniale.",
    "blockedGuesses": [
      "panafricanisme",
      "surréalisme",
      "francophonie"
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
    if (disciplineId === "history") {
      addUnique(HISTO_WORLD_GROUPS, group);
      return;
    }
    if (!DISCIPLINE_OUTLINES[disciplineId]) DISCIPLINE_OUTLINES[disciplineId] = { groups:[], worlds:[] };
    addUnique(DISCIPLINE_OUTLINES[disciplineId].groups, group);
    PLANNED_DISCIPLINE_GROUPS[disciplineId] = DISCIPLINE_OUTLINES[disciplineId].groups;
  };

  const addWorld = (disciplineId, world) => {
    if (disciplineId === "history") {
      addUnique(data.worlds, world);
      return;
    }
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
    groups:Object.values(GROUPS).flat().length,
    mysteries:MYSTERIES.length,
    quality,
    ok:Object.keys(PACKS).length === 11 && Object.values(quality).every(item => item.pass)
  };
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version:VERSION, premium235:audit }; } catch {}
  if (!audit.ok) try { console.warn("HistoDaily beta235 premium content audit", audit); } catch {}
  try { if (typeof renderSoon === "function") renderSoon(); } catch {}
})();
