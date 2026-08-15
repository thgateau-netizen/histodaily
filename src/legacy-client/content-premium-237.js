/* HistoDaily beta 244 — grands thèmes structurants, extension premium. */
(function histodailyBeta237PremiumContent(){
  "use strict";
  const VERSION = "1.0.0-beta.246.0";
  const GROUPS = {
  "literature": [
    {
      "id": "lit-enlightenment",
      "title": "4. Lumières et espace public",
      "range": "XVIIIe siècle",
      "description": "Philosophie, critique, encyclopédie et nouveaux publics de lecture."
    }
  ]
};
  const WORLDS = {
  "history": [
    {
      "id": "history-decolonization",
      "title": "Décolonisations",
      "emoji": "🌍",
      "subtitle": "Indépendances, violences et nouveaux États",
      "timeframe": "1945 → années 1970",
      "accent": "#0f766e",
      "group": "20c",
      "sortStart": 1945,
      "sortEnd": 1975,
      "unlockedByDefault": false
    },
    {
      "id": "history-european-integration",
      "title": "Construction européenne",
      "emoji": "🇪🇺",
      "subtitle": "Réconciliation, marché commun et souverainetés",
      "timeframe": "1945 → aujourd’hui",
      "accent": "#2563eb",
      "group": "20c",
      "sortStart": 1948,
      "sortEnd": 2020,
      "unlockedByDefault": false
    }
  ],
  "art": [
    {
      "id": "art-surrealism",
      "title": "Surréalisme",
      "emoji": "🌀",
      "subtitle": "Rêve, hasard, désir et image",
      "timeframe": "Années 1920 → 1940",
      "accent": "#8b5cf6",
      "group": "art-modern",
      "sortStart": 34,
      "discipline": "art",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "cinema": [
    {
      "id": "cinema-sound-revolution",
      "title": "La révolution du cinéma parlant",
      "emoji": "🎙️",
      "subtitle": "Voix, bruit, musique et nouveaux métiers",
      "timeframe": "Années 1920 → 1930",
      "accent": "#0ea5e9",
      "group": "cinema-classical",
      "sortStart": 21,
      "discipline": "cinema",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "science-inventions": [
    {
      "id": "sci-relativity",
      "title": "La relativité",
      "emoji": "🕰️",
      "subtitle": "Temps, espace, lumière et gravitation",
      "timeframe": "1905 → 1915",
      "accent": "#6366f1",
      "group": "sci-energy-matter",
      "sortStart": 26,
      "discipline": "science-inventions",
      "planned": true,
      "unlockedByDefault": false
    },
    {
      "id": "sci-periodic-table",
      "title": "Le tableau périodique",
      "emoji": "🧪",
      "subtitle": "Classer les éléments et prédire leurs propriétés",
      "timeframe": "XIXe → XXe siècle",
      "accent": "#14b8a6",
      "group": "sci-energy-matter",
      "sortStart": 27,
      "discipline": "science-inventions",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "astronomy": [
    {
      "id": "astro-seasons-earth-orbit",
      "title": "Les saisons",
      "emoji": "🌍",
      "subtitle": "Inclinaison terrestre, lumière et climats",
      "timeframe": "Astronomie fondamentale",
      "accent": "#818cf8",
      "group": "astro-solar-system",
      "sortStart": 26,
      "discipline": "astronomy",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "economy": [
    {
      "id": "eco-inequality-redistribution",
      "title": "Inégalités et redistribution",
      "emoji": "⚖️",
      "subtitle": "Revenus, patrimoine, impôts et services publics",
      "timeframe": "Économie contemporaine",
      "accent": "#10b981",
      "group": "eco-global",
      "sortStart": 52,
      "discipline": "economy",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "geography": [
    {
      "id": "geo-demographic-transition",
      "title": "Transition démographique",
      "emoji": "👥",
      "subtitle": "Mortalité, fécondité, croissance et vieillissement",
      "timeframe": "XIXe → XXIe siècle",
      "accent": "#06b6d4",
      "group": "geo-population-cities",
      "sortStart": 21,
      "discipline": "geography",
      "planned": true,
      "unlockedByDefault": false
    },
    {
      "id": "geo-energy-transition",
      "title": "Transition énergétique",
      "emoji": "⚡",
      "subtitle": "Fossiles, électricité, minerais et territoires",
      "timeframe": "XXe → XXIe siècle",
      "accent": "#f59e0b",
      "group": "geo-resources",
      "sortStart": 42,
      "discipline": "geography",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "music": [
    {
      "id": "music-electronic-revolution",
      "title": "La révolution électronique",
      "emoji": "🎛️",
      "subtitle": "Bande, synthétiseur, boîte à rythmes et club",
      "timeframe": "1945 → aujourd’hui",
      "accent": "#a855f7",
      "group": "music-contemporary",
      "sortStart": 51,
      "discipline": "music",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "literature": [
    {
      "id": "lit-enlightenment-public-sphere",
      "title": "Les Lumières",
      "emoji": "🕯️",
      "subtitle": "Raison critique, encyclopédie et opinion publique",
      "timeframe": "XVIIIe siècle",
      "accent": "#f59e0b",
      "group": "lit-enlightenment",
      "sortStart": 25,
      "discipline": "literature",
      "planned": true,
      "unlockedByDefault": false
    }
  ]
};
  const LESSONS = {
  "history-decolonization": [
    {
      "id": "history-decolonization-india-algeria-bandung",
      "title": "Décolonisations : de l’empire aux indépendances",
      "period": "1945 → années 1970",
      "location": "Asie, Afrique et monde arabe",
      "emoji": "🌍",
      "xp": 90,
      "order": 1
    }
  ],
  "history-european-integration": [
    {
      "id": "history-european-integration-coal-eu",
      "title": "Construction européenne : unir sans effacer les États",
      "period": "1945 → aujourd’hui",
      "location": "Europe",
      "emoji": "🇪🇺",
      "xp": 85,
      "order": 1
    }
  ],
  "art-surrealism": [
    {
      "id": "art-surrealism-dream-automatism-image",
      "title": "Surréalisme : libérer l’image, le langage et le désir",
      "period": "Années 1920 → 1940",
      "location": "Paris puis réseaux internationaux",
      "emoji": "🌀",
      "xp": 80,
      "order": 1
    }
  ],
  "cinema-sound-revolution": [
    {
      "id": "cinema-sound-voice-microphone-musical",
      "title": "Cinéma parlant : quand la voix transforme l’image",
      "period": "Fin des années 1920 → années 1930",
      "location": "États-Unis, Europe et cinémas mondiaux",
      "emoji": "🎙️",
      "xp": 80,
      "order": 1
    }
  ],
  "sci-relativity": [
    {
      "id": "sci-relativity-spacetime-gravity",
      "title": "Relativité : pourquoi temps et espace ne sont pas absolus",
      "period": "1905 → 1915",
      "location": "Physique théorique et expérimentale",
      "emoji": "🕰️",
      "xp": 90,
      "order": 1
    }
  ],
  "sci-periodic-table": [
    {
      "id": "sci-periodic-table-mendeleev-elements",
      "title": "Tableau périodique : classer la matière pour prévoir",
      "period": "XIXe → XXe siècle",
      "location": "Chimie mondiale",
      "emoji": "🧪",
      "xp": 80,
      "order": 1
    }
  ],
  "astro-seasons-earth-orbit": [
    {
      "id": "astro-seasons-tilt-solstice-equinox",
      "title": "Saisons : l’inclinaison de la Terre change la lumière reçue",
      "period": "Astronomie fondamentale",
      "location": "Système Terre-Soleil",
      "emoji": "🌍",
      "xp": 75,
      "order": 1
    }
  ],
  "eco-inequality-redistribution": [
    {
      "id": "eco-inequality-income-wealth-redistribution",
      "title": "Inégalités : mesurer les écarts et comprendre la redistribution",
      "period": "Économie contemporaine",
      "location": "Sociétés et États",
      "emoji": "⚖️",
      "xp": 80,
      "order": 1
    }
  ],
  "geo-demographic-transition": [
    {
      "id": "geo-demographic-transition-fertility-aging",
      "title": "Transition démographique : pourquoi les populations changent de rythme",
      "period": "XIXe → XXIe siècle",
      "location": "Monde",
      "emoji": "👥",
      "xp": 80,
      "order": 1
    }
  ],
  "geo-energy-transition": [
    {
      "id": "geo-energy-transition-networks-minerals",
      "title": "Transition énergétique : changer de système, pas seulement de source",
      "period": "XXe → XXIe siècle",
      "location": "Monde",
      "emoji": "⚡",
      "xp": 85,
      "order": 1
    }
  ],
  "music-electronic-revolution": [
    {
      "id": "music-electronic-tape-synth-house-techno",
      "title": "Musique électronique : du studio expérimental au dancefloor",
      "period": "1945 → aujourd’hui",
      "location": "Europe, États-Unis puis monde",
      "emoji": "🎛️",
      "xp": 80,
      "order": 1
    }
  ],
  "lit-enlightenment-public-sphere": [
    {
      "id": "lit-enlightenment-critique-encyclopedia",
      "title": "Lumières : écrire, débattre et contester l’autorité",
      "period": "XVIIIe siècle",
      "location": "Europe et espaces atlantiques",
      "emoji": "🕯️",
      "xp": 80,
      "order": 1
    }
  ]
};
  const PACKS = {
  "history-decolonization-india-algeria-bandung": {
    "hook": "Après 1945, les empires européens ne disparaissent pas tous de la même manière. Négociation, désobéissance civile, guerre, pression internationale et mobilisations populaires se combinent selon les territoires, laissant des États indépendants mais aussi des frontières, des économies et des conflits hérités de la domination coloniale.",
    "keyFacts": [
      "L’indépendance de l’Inde en 1947 s’accompagne de la partition et de violences massives",
      "La guerre d’Algérie oppose le FLN à la France de 1954 à 1962",
      "La conférence de Bandung en 1955 affirme une voix afro-asiatique",
      "Les métropoles tentent parfois de conserver influence militaire, économique ou culturelle",
      "La décolonisation transforme l’ordre international sans effacer les héritages coloniaux"
    ],
    "express": [
      "La Seconde Guerre mondiale fragilise les puissances coloniales. Des soldats et travailleurs des empires ont participé à l’effort de guerre, tandis que les principes d’autodétermination circulent davantage. Dans les colonies, les mouvements nationalistes disposent déjà de partis, syndicats, journaux et réseaux. L’indépendance ne tombe donc pas du ciel en 1945 : elle résulte d’organisations plus anciennes qui profitent d’un nouvel équilibre mondial.",
      "En Inde, le Congrès et Gandhi utilisent notamment mobilisation de masse et désobéissance civile, mais l’indépendance de 1947 se paie par la partition entre Inde et Pakistan et par des déplacements meurtriers. En Algérie, la présence d’une importante population européenne, le refus français de reconnaître une nation algérienne et la violence coloniale conduisent à une guerre longue, marquée par attentats, torture, répression et crise politique en France.",
      "À Bandung en 1955, des États d’Asie et d’Afrique affirment qu’ils ne veulent pas être de simples satellites des blocs américain ou soviétique. Pourtant, l’indépendance politique n’efface ni dépendance économique, ni frontières contestées, ni inégalités internes. La décolonisation est donc à la fois une conquête fondamentale et le début de problèmes nouveaux : construire un État, redistribuer les terres, choisir des alliances et maîtriser des économies orientées vers l’exportation."
    ],
    "complete": [
      {
        "title": "1. Pourquoi l’ordre colonial devient-il plus fragile ?",
        "text": "Les empires sortent affaiblis de la guerre. Le Japon a montré en Asie que les Européens pouvaient être vaincus, même si son occupation fut elle-même brutale. Les États-Unis et l’URSS critiquent les empires pour des raisons différentes, tandis que l’ONU offre un langage international à l’autodétermination. Surtout, les sociétés colonisées ont leurs propres militants, anciens combattants, élites administratives, syndicats et mouvements paysans. L’indépendance résulte de cette convergence, pas d’une simple décision généreuse des métropoles."
      },
      {
        "title": "2. L’Inde : négocier, mobiliser, puis partager",
        "text": "Le Congrès national indien rassemble des courants divers. Gandhi transforme la désobéissance civile en instrument politique massif, mais d’autres acteurs comptent : Nehru, Patel, Ambedkar, la Ligue musulmane de Jinnah, les mouvements ouvriers et paysans. Les Britanniques acceptent finalement un transfert rapide de pouvoir. La partition en deux États, Inde et Pakistan, provoque migrations forcées, massacres et rupture durable. L’indépendance montre ainsi qu’une victoire anticoloniale peut coïncider avec une catastrophe humaine."
      },
      {
        "title": "3. L’Algérie : une guerre au cœur de la République française",
        "text": "L’Algérie est juridiquement intégrée à la France, mais les droits politiques et l’accès à la terre restent profondément inégaux. Le FLN déclenche l’insurrection en 1954 et cherche à imposer sa représentativité. L’armée française combine opérations militaires, déplacements de population, renseignement et torture. Les violences touchent civils européens et musulmans. La guerre provoque la chute de la IVe République, le retour de de Gaulle, puis les accords d’Évian et l’indépendance en 1962."
      },
      {
        "title": "4. Bandung et l’affirmation du Sud",
        "text": "Réunis en Indonésie en 1955, vingt-neuf États d’Asie et d’Afrique dénoncent colonialisme, racisme et domination. Bandung ne crée pas un bloc homogène : les régimes, intérêts et alliances diffèrent fortement. Mais la conférence rend visible une volonté commune de peser dans les affaires mondiales. Elle prépare le mouvement des non-alignés et rappelle que la guerre froide ne résume pas toute la politique internationale."
      },
      {
        "title": "5. Après le drapeau : souveraineté incomplète et héritages",
        "text": "Les nouveaux États héritent souvent de frontières tracées par les puissances coloniales, d’administrations centralisées et d’économies dépendantes de quelques exportations. Certains connaissent coups d’État, guerres civiles ou autoritarismes ; d’autres stabilisent des institutions pluralistes. Les anciennes métropoles conservent parfois bases, monnaies, entreprises ou réseaux diplomatiques. Parler de néocolonialisme peut éclairer ces dépendances, à condition de ne pas nier les choix et conflits propres aux sociétés indépendantes."
      }
    ],
    "deeper": [
      {
        "title": "Décoloniser les mémoires",
        "text": "Les musées, monuments, archives et programmes scolaires deviennent des terrains de débat sur la violence et les héritages de l’empire."
      },
      {
        "title": "Femmes et indépendances",
        "text": "Les femmes participent aux mobilisations, aux réseaux clandestins et aux combats, puis sont souvent marginalisées dans les récits officiels."
      },
      {
        "title": "Une chronologie mondiale",
        "text": "L’Amérique latine est largement indépendante dès le XIXe siècle ; l’Asie et l’Afrique connaissent surtout leur grande vague après 1945."
      }
    ],
    "takeaways": [
      {
        "label": "Pluralité",
        "text": "Il n’existe pas une seule voie vers l’indépendance."
      },
      {
        "label": "Violence",
        "text": "La sortie d’empire peut produire guerre, partition et déplacements."
      },
      {
        "label": "Bandung",
        "text": "Les nouveaux États veulent parler en leur propre nom."
      },
      {
        "label": "Héritages",
        "text": "L’indépendance politique ne supprime pas toutes les dépendances."
      }
    ],
    "quiz": [
      {
        "kind": "causes",
        "q": "Pourquoi les empires européens se fragilisent-ils après 1945 ?",
        "a": "Parce que la guerre les affaiblit tandis que les mouvements nationalistes et le principe d’autodétermination gagnent en force.",
        "choices": [
          "Parce que toutes les métropoles abolissent immédiatement leurs armées.",
          "Parce que les sociétés colonisées cessent toute mobilisation.",
          "Parce que l’ONU impose partout la même date d’indépendance."
        ],
        "why": "Plusieurs rapports de force se combinent.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "Inde",
        "q": "Quel événement accompagne l’indépendance de l’Inde en 1947 ?",
        "a": "La partition entre l’Inde et le Pakistan, avec des déplacements et violences massifs.",
        "choices": [
          "La création immédiate d’un État indien unifié avec la Birmanie.",
          "La disparition de toute tension religieuse.",
          "Le maintien direct du gouvernement britannique pendant trente ans."
        ],
        "why": "L’indépendance et la partition sont liées.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "Algérie",
        "q": "Pourquoi la guerre d’Algérie touche-t-elle directement la politique française ?",
        "a": "Parce que l’Algérie est intégrée juridiquement à la France et que la guerre provoque une crise de régime.",
        "choices": [
          "Parce qu’elle se déroule uniquement entre deux États étrangers.",
          "Parce qu’elle ne mobilise aucune armée française.",
          "Parce qu’elle commence après l’indépendance algérienne."
        ],
        "why": "Le conflit est aussi une crise intérieure française.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "Bandung",
        "q": "Que signifie surtout la conférence de Bandung ?",
        "a": "La volonté d’États asiatiques et africains d’affirmer une voix autonome dans l’ordre mondial.",
        "choices": [
          "La création d’une armée unique dirigée par l’URSS.",
          "Le retour des empires coloniaux européens.",
          "L’adhésion de tous les participants à l’OTAN."
        ],
        "why": "Bandung rend visible un Sud politique pluriel.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "héritages",
        "q": "Pourquoi l’indépendance ne met-elle pas fin à tous les effets de la colonisation ?",
        "a": "Parce que frontières, économies, institutions et réseaux de dépendance peuvent survivre à la souveraineté politique.",
        "choices": [
          "Parce qu’aucun nouveau drapeau n’est adopté.",
          "Parce que les anciennes colonies restent légalement toutes des départements européens.",
          "Parce que les sociétés indépendantes n’ont aucun acteur politique propre."
        ],
        "why": "Les héritages structurent les choix après l’indépendance.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta237-premium-core"
  },
  "history-european-integration-coal-eu": {
    "hook": "La construction européenne ne suit pas un plan écrit d’avance vers un super-État. Elle avance par compromis entre gouvernements qui veulent empêcher une nouvelle guerre, reconstruire les économies et gagner du poids, tout en conservant l’essentiel de leur souveraineté.",
    "keyFacts": [
      "La CECA de 1951 met en commun charbon et acier de six États",
      "Les traités de Rome de 1957 créent la CEE",
      "Le marché unique organise la libre circulation des biens, services, capitaux et personnes",
      "L’Union européenne est créée par le traité de Maastricht en 1992",
      "L’intégration avance par crises, élargissements et négociations entre institutions et États"
    ],
    "express": [
      "Après 1945, la priorité est de rendre une nouvelle guerre franco-allemande matériellement plus difficile. La Communauté européenne du charbon et de l’acier place en 1951 des secteurs stratégiques sous une autorité commune. Le choix est concret : plutôt que proclamer immédiatement une fédération, six États commencent par gérer ensemble des ressources indispensables à l’industrie et à l’armement.",
      "Les traités de Rome créent en 1957 la Communauté économique européenne. La suppression progressive des droits de douane et la politique agricole commune renforcent les échanges. L’intégration ne signifie pourtant pas disparition des États : les gouvernements gardent fiscalité, armées, systèmes sociaux et une grande part de la décision. Les institutions européennes organisent en permanence un équilibre entre logique commune et intérêts nationaux.",
      "L’élection du Parlement européen au suffrage universel, le marché unique, l’espace Schengen, l’euro et les élargissements vers le Sud puis l’Est approfondissent le projet. Mais chaque étape produit des désaccords sur démocratie, solidarité, frontières, monnaie ou politique étrangère. La sortie du Royaume-Uni rappelle que l’Union n’est ni irréversible ni uniforme. Elle est une construction politique originale : plus intégrée qu’une organisation internationale, moins centralisée qu’un État."
    ],
    "complete": [
      {
        "title": "1. Réconcilier sans oublier les rapports de force",
        "text": "Les dirigeants européens veulent reconstruire, contenir l’influence soviétique et encadrer le retour de la puissance allemande. Robert Schuman propose en 1950 de placer les productions française et allemande de charbon et d’acier sous une Haute Autorité ouverte à d’autres pays. France, Allemagne de l’Ouest, Italie, Belgique, Pays-Bas et Luxembourg créent la CECA. La paix recherchée repose donc sur des institutions, des intérêts partagés et le contexte de guerre froide."
      },
      {
        "title": "2. Le marché commun comme moteur",
        "text": "Les traités de Rome établissent la CEE et Euratom. Le marché commun réduit les barrières internes et adopte un tarif extérieur commun. La politique agricole commune garantit des débouchés et soutient les revenus, au prix de dépenses et de surplus parfois importants. Cette intégration économique crée des interdépendances fortes, mais ses bénéfices sont inégalement répartis selon secteurs, régions et périodes."
      },
      {
        "title": "3. Des institutions qui se partagent le pouvoir",
        "text": "La Commission propose et surveille l’application des règles ; le Conseil réunit les gouvernements ; le Parlement élu participe de plus en plus à la législation et au budget ; la Cour de justice assure la primauté du droit européen dans les domaines transférés. Aucun acteur ne gouverne seul. Cette architecture complexe ralentit parfois la décision, mais elle empêche aussi qu’un seul État ou une seule institution domine entièrement."
      },
      {
        "title": "4. Élargir et approfondir",
        "text": "Les Communautés passent de six membres à neuf, douze, quinze, puis s’élargissent largement après la fin de la guerre froide. Le marché unique accélère la circulation ; Schengen supprime les contrôles à de nombreuses frontières intérieures ; Maastricht crée l’Union européenne et prépare l’euro. Tous les États ne participent pas à toutes les politiques. L’Europe avance donc à plusieurs vitesses et combine espaces superposés."
      },
      {
        "title": "5. Une union traversée de conflits politiques",
        "text": "Crise de la zone euro, migrations, politique climatique, État de droit, budget ou défense révèlent des intérêts différents. Les citoyens peuvent juger l’Union trop distante, trop libérale, trop faible ou au contraire trop intrusive. Le Brexit montre qu’un État peut choisir de partir. Comprendre l’Union exige donc de suivre les décisions concrètes plutôt que de l’imaginer comme une marche automatique vers l’unité."
      }
    ],
    "deeper": [
      {
        "title": "Méthode Monnet",
        "text": "L’idée est d’obtenir des avancées sectorielles qui créent ensuite de nouvelles interdépendances et de nouveaux besoins de coopération."
      },
      {
        "title": "Souveraineté partagée",
        "text": "Les États ne perdent pas toute souveraineté : ils choisissent d’exercer certaines compétences ensemble selon des règles communes."
      },
      {
        "title": "Conseil de l’Europe",
        "text": "Il ne faut pas le confondre avec l’Union européenne ; cette organisation distincte porte notamment la Convention européenne des droits de l’homme."
      }
    ],
    "takeaways": [
      {
        "label": "Paix",
        "text": "Le projet naît de la reconstruction et de la réconciliation franco-allemande."
      },
      {
        "label": "Marché",
        "text": "L’intégration économique précède une grande partie de l’intégration politique."
      },
      {
        "label": "Compromis",
        "text": "Institutions européennes et gouvernements se partagent la décision."
      },
      {
        "label": "Conflits",
        "text": "L’Union progresse par crises et choix contestés, pas par automatisme."
      }
    ],
    "quiz": [
      {
        "kind": "origine",
        "q": "Pourquoi le charbon et l’acier sont-ils mis en commun en 1951 ?",
        "a": "Parce qu’ils sont essentiels à l’industrie et à l’armement, donc stratégiques pour rendre une nouvelle guerre plus difficile.",
        "choices": [
          "Parce qu’ils n’ont plus aucune valeur économique.",
          "Parce que tous les États européens ont déjà supprimé leurs frontières.",
          "Parce que l’ONU impose une monnaie unique."
        ],
        "why": "La coopération commence par un secteur stratégique.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "traités",
        "q": "Que créent principalement les traités de Rome de 1957 ?",
        "a": "La Communauté économique européenne et un marché commun progressif.",
        "choices": [
          "L’OTAN et son commandement militaire.",
          "Le Conseil de l’Europe et sa cour.",
          "L’euro mis immédiatement en circulation."
        ],
        "why": "Rome approfondit l’intégration économique.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "institutions",
        "q": "Pourquoi aucune institution européenne ne gouverne-t-elle seule ?",
        "a": "Parce que Commission, Conseil, Parlement et Cour se répartissent des fonctions différentes.",
        "choices": [
          "Parce que toutes les décisions sont prises uniquement par référendum.",
          "Parce que le Parlement nomme directement chaque gouvernement national.",
          "Parce que l’Union ne produit aucune règle obligatoire."
        ],
        "why": "Le pouvoir est institutionnellement partagé.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "géographie",
        "q": "Pourquoi parle-t-on d’une Europe à plusieurs vitesses ?",
        "a": "Parce que tous les États ne participent pas aux mêmes politiques, comme l’euro ou Schengen.",
        "choices": [
          "Parce que chaque pays utilise un fuseau horaire différent.",
          "Parce que les traités interdisent tout élargissement.",
          "Parce que seuls six États peuvent commercer entre eux."
        ],
        "why": "Les espaces d’intégration se superposent.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "nature",
        "q": "Quelle formule décrit le mieux l’Union européenne ?",
        "a": "Une construction plus intégrée qu’une organisation internationale mais moins centralisée qu’un État.",
        "choices": [
          "Un État unitaire ayant supprimé tous les gouvernements nationaux.",
          "Une simple zone géographique sans institutions.",
          "Une alliance militaire identique à l’OTAN."
        ],
        "why": "L’Union est une forme politique originale.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta237-premium-core"
  },
  "art-surrealism-dream-automatism-image": {
    "hook": "Le surréalisme ne consiste pas à peindre des choses bizarres. Il cherche à court-circuiter les habitudes de la raison, à faire surgir associations, désirs et conflits enfouis, puis à transformer ce matériau en poésie, photographie, objet, cinéma ou peinture.",
    "keyFacts": [
      "Le Manifeste du surréalisme d’André Breton paraît en 1924",
      "L’écriture automatique vise à laisser venir les associations sans contrôle préalable",
      "Photographie, collage, objet trouvé et cinéma comptent autant que la peinture",
      "Dalí, Magritte, Ernst, Man Ray, Buñuel, Carrington ou Cahun suivent des voies différentes",
      "Le mouvement se veut révolutionnaire mais reproduit aussi des rapports de pouvoir et des exclusions"
    ],
    "express": [
      "Après la Première Guerre mondiale, Dada a attaqué les valeurs qui prétendaient justifier la civilisation et le progrès. Le surréalisme reprend cette révolte mais veut construire une méthode d’exploration. Inspiré par Freud, Breton affirme que rêve, lapsus, hasard et désir peuvent révéler une réalité plus vaste que la conscience rationnelle. L’automatisme cherche à produire sans censure immédiate, même si l’œuvre finale reste souvent retravaillée.",
      "Les artistes inventent des procédés pour déstabiliser le regard : frottage chez Max Ernst, images doubles chez Dalí, rencontres impossibles chez Magritte, solarisation chez Man Ray, collages et objets détournés. Buñuel et Dalí montent Un chien andalou comme une suite de chocs visuels. L’étrangeté ne vient pas toujours d’un monde fantastique : elle naît souvent d’objets ordinaires placés dans une relation impossible.",
      "Le groupe se mêle à la politique révolutionnaire et se déchire sur ses alliances. Les femmes y sont souvent représentées comme muses ou figures du désir, mais des créatrices comme Leonora Carrington, Claude Cahun, Dora Maar ou Remedios Varo construisent des œuvres autonomes et critiques. Le surréalisme devient international, de Prague au Caire, du Mexique aux Caraïbes, en se transformant au contact d’autres histoires."
    ],
    "complete": [
      {
        "title": "1. De Dada à une nouvelle méthode",
        "text": "Dada utilise provocation, non-sens et scandale pour attaquer institutions artistiques et certitudes bourgeoises. Breton, Aragon, Soupault et d’autres veulent aller au-delà de la négation. Le manifeste de 1924 définit le surréalisme comme un automatisme psychique. Il ne s’agit pas de rejeter toute pensée, mais de suspendre provisoirement le contrôle afin de faire apparaître des enchaînements inattendus."
      },
      {
        "title": "2. Rêve, inconscient et automatisme",
        "text": "Freud fournit un vocabulaire puissant, mais les surréalistes l’adaptent librement. Écriture automatique, cadavre exquis, récits de rêves et jeux collectifs cherchent à contourner l’auteur souverain. Pourtant, le résultat n’est jamais une transcription pure de l’inconscient : choix, publication, mise en page et retouches interviennent. L’automatisme est surtout un dispositif de création qui déplace les habitudes."
      },
      {
        "title": "3. Produire l’étrange avec le réel",
        "text": "Magritte peint avec une précision presque publicitaire des situations conceptuellement impossibles. Dalí développe une méthode paranoïaque-critique fondée sur les images ambiguës. Ernst utilise frottage et collage pour laisser les textures suggérer des formes. La photographie joue un rôle majeur parce qu’elle semble enregistrer le réel tout en permettant cadrage, surimpression, solarisation et mise en scène."
      },
      {
        "title": "4. Transformer l’art et la vie",
        "text": "Le mouvement refuse de limiter la révolution à la toile. Poésie, amour, promenade urbaine, objets trouvés et hasard objectif doivent transformer l’expérience quotidienne. Les rapports avec le communisme sont conflictuels : certains veulent une discipline politique, d’autres défendent l’autonomie de l’imagination. Exclusions et querelles montrent que la liberté proclamée cohabite avec un groupe très contrôlé par Breton."
      },
      {
        "title": "5. Femmes, circulations et héritages",
        "text": "Longtemps, l’histoire du mouvement a privilégié quelques hommes célèbres. Carrington, Cahun, Maar, Varo, Tanning ou Miller ne sont pas de simples modèles. Elles interrogent identité, corps, métamorphose et pouvoir du regard. En dehors de Paris, le surréalisme se combine avec anticolonialisme, mythologies locales et expériences d’exil. Son héritage traverse publicité, clip, photographie, cinéma et art contemporain."
      }
    ],
    "deeper": [
      {
        "title": "Cadavre exquis",
        "text": "Chaque participant ajoute un élément sans connaître entièrement ce qui précède, produisant une création collective imprévisible."
      },
      {
        "title": "Objet surréaliste",
        "text": "Un objet banal déplacé ou associé à un autre perd sa fonction évidente et devient machine à désir ou à inquiétude."
      },
      {
        "title": "Attention à Freud",
        "text": "Les œuvres ne sont pas de simples illustrations de la psychanalyse ; elles transforment ses idées en pratiques artistiques propres."
      }
    ],
    "takeaways": [
      {
        "label": "Méthode",
        "text": "L’automatisme cherche à déjouer le contrôle conscient."
      },
      {
        "label": "Médias",
        "text": "Le surréalisme dépasse largement la peinture."
      },
      {
        "label": "Politique",
        "text": "Le mouvement veut changer la vie mais se divise sur les moyens."
      },
      {
        "label": "Relecture",
        "text": "Ses créatrices et ses circulations internationales sont essentielles."
      }
    ],
    "quiz": [
      {
        "kind": "définition",
        "q": "Que cherche principalement l’écriture automatique ?",
        "a": "À faire surgir des associations sans les filtrer immédiatement par la raison.",
        "choices": [
          "À recopier exactement un texte ancien.",
          "À supprimer toute possibilité de révision ultérieure.",
          "À transformer chaque poème en programme politique officiel."
        ],
        "why": "L’automatisme suspend provisoirement le contrôle.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "origine",
        "q": "Quel mouvement précède et influence directement le surréalisme ?",
        "a": "Dada.",
        "choices": [
          "L’impressionnisme uniquement.",
          "Le réalisme socialiste des années 1950.",
          "Le pop art américain."
        ],
        "why": "Le surréalisme reprend la révolte dadaïste en lui donnant une méthode.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "médias",
        "q": "Pourquoi la photographie intéresse-t-elle les surréalistes ?",
        "a": "Parce qu’elle peut sembler objective tout en étant profondément transformée par cadrage, montage et procédés de laboratoire.",
        "choices": [
          "Parce qu’elle interdit toute mise en scène.",
          "Parce qu’elle remplace définitivement la poésie.",
          "Parce qu’elle ne peut montrer que des paysages réels."
        ],
        "why": "Le médium joue sur la confiance accordée au réel photographique.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "politique",
        "q": "Pourquoi le groupe surréaliste connaît-il des ruptures ?",
        "a": "Parce que ses membres s’opposent notamment sur les alliances politiques et le contrôle du mouvement.",
        "choices": [
          "Parce que tous refusent toute activité collective.",
          "Parce que Breton n’écrit aucun manifeste.",
          "Parce que le mouvement est limité à une seule exposition."
        ],
        "why": "La liberté artistique cohabite avec de fortes tensions internes.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "historiographie",
        "q": "Que corrige la redécouverte de Carrington, Cahun ou Varo ?",
        "a": "Une histoire qui réduisait souvent les femmes à des muses plutôt qu’à des créatrices autonomes.",
        "choices": [
          "L’idée qu’aucune femme ne vivait en Europe.",
          "La croyance que le surréalisme utilisait uniquement la sculpture.",
          "L’affirmation que toutes les œuvres étaient anonymes."
        ],
        "why": "Les créatrices transforment les thèmes du mouvement.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta237-premium-core"
  },
  "cinema-sound-voice-microphone-musical": {
    "hook": "L’arrivée du parlant n’ajoute pas simplement des dialogues à un art déjà achevé. Elle modifie la caméra, le jeu, le montage, les salles, la circulation internationale des films et l’organisation entière des studios.",
    "keyFacts": [
      "Le Chanteur de jazz en 1927 popularise le cinéma sonore synchronisé sans être le premier film sonore",
      "Les premiers microphones limitent mouvements et placement des acteurs",
      "Le doublage et le sous-titrage deviennent des solutions à la barrière des langues",
      "Le musical et la comédie dialoguée exploitent rapidement les nouvelles possibilités",
      "Le cinéma muet n’était jamais réellement silencieux : musique et bruitage accompagnaient souvent les projections"
    ],
    "express": [
      "Avant le parlant, les séances sont déjà sonores : pianiste, orchestre, bonimenteur ou bruitages peuvent accompagner les images. La difficulté technique est de fixer le son, de le synchroniser durablement et de l’amplifier pour une grande salle. À la fin des années 1920, les systèmes sur disque puis sur pellicule deviennent assez fiables pour être adoptés industriellement.",
      "Les débuts sont contraignants. Les caméras bruyantes sont enfermées dans des cabines, les microphones captent une zone réduite et les acteurs doivent parfois rester proches d’un objet dissimulant le micro. Le montage devient plus difficile lorsque chaque coupe doit préserver la continuité sonore. Ingénieurs, perchistes, mixeurs, dialoguistes et compositeurs prennent une place nouvelle dans la fabrication.",
      "Le son crée des genres et des styles : musical, film de gangsters, comédie fondée sur le débit verbal, voix chantée des stars. Il peut aussi produire hors-champ, ironie ou suspense. La transition bouleverse les marchés internationaux, car une voix est liée à une langue. Versions multiples, doublage et sous-titrage sont expérimentés. Certains cinéastes craignent un théâtre filmé ; les meilleurs films découvrent au contraire que son et image peuvent se compléter, se contredire ou ouvrir des espaces invisibles."
    ],
    "complete": [
      {
        "title": "1. Le muet était déjà sonore",
        "text": "Le mot « muet » décrit l’absence de son enregistré avec l’image, pas une projection silencieuse. Les salles disposent de partitions, musiciens, machines à bruit ou commentaires. La musique règle le rythme et l’émotion, mais varie selon les lieux. Les inventeurs cherchent depuis longtemps à synchroniser image et phonographe ; le problème est d’éviter décalage, faible volume et usure du support."
      },
      {
        "title": "2. Une transition industrielle coûteuse",
        "text": "Warner Bros. mise sur le Vitaphone, qui synchronise disques et projecteur. Le Chanteur de jazz combine encore intertitres, passages chantés et quelques répliques. Le succès accélère l’équipement des studios et des salles. La pellicule sonore finit par dominer car elle garde image et son sur le même support. Les exploitants doivent acheter haut-parleurs, amplificateurs et projecteurs adaptés."
      },
      {
        "title": "3. Le microphone redessine la mise en scène",
        "text": "Les premiers équipements imposent immobilité et diction claire. Les caméras enfermées perdent leur liberté ; on tourne parfois plusieurs caméras en même temps pour éviter les coupes sonores. Rapidement, perches, insonorisation et mixage améliorent la situation. Le jeu ne devient pas simplement plus naturel : accents, timbres, rythme verbal et chant deviennent de nouvelles matières de starisation."
      },
      {
        "title": "4. La langue fracture le marché mondial",
        "text": "Un intertitre pouvait être facilement remplacé ; une voix enregistrée l’est beaucoup moins. Les studios tournent parfois la nuit des versions du même film dans plusieurs langues avec d’autres acteurs. Cette solution coûte cher. Le doublage et le sous-titrage s’imposent progressivement, avec des préférences différentes selon les pays. Le son renforce certains cinémas nationaux tout en favorisant les grandes industries capables de financer les adaptations."
      },
      {
        "title": "5. Penser le son comme mise en scène",
        "text": "Un son hors champ peut faire exister un espace invisible ; une musique peut contredire l’image ; le silence peut devenir expressif précisément parce que le film pourrait parler. Fritz Lang, Hitchcock, Clair, Lubitsch ou les cinéastes soviétiques explorent ces possibilités. La grande leçon est que le son n’a pas à redoubler ce que l’image montre : il peut produire information, rythme, tension ou point de vue."
      }
    ],
    "deeper": [
      {
        "title": "Asynchronisme",
        "text": "Son et image peuvent provenir de temps ou d’espaces différents, créant mémoire, commentaire ou ironie."
      },
      {
        "title": "Voix et pouvoir",
        "text": "Le parlant révèle accents et langues, ce qui peut ouvrir des rôles mais aussi renforcer stéréotypes et exclusions."
      },
      {
        "title": "Le silence construit",
        "text": "Dans un film sonore, retirer soudainement le bruit attire l’attention et crée une attente très forte."
      }
    ],
    "takeaways": [
      {
        "label": "Continuité",
        "text": "Le parlant transforme toute la chaîne technique et économique."
      },
      {
        "label": "Microphone",
        "text": "Il modifie mouvement, jeu et montage avant que les pratiques s’assouplissent."
      },
      {
        "label": "Langues",
        "text": "Doublage et sous-titrage répondent à un nouveau problème mondial."
      },
      {
        "label": "Écriture",
        "text": "Le son peut compléter ou contredire l’image."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "Pourquoi le cinéma muet n’était-il pas vraiment silencieux ?",
        "a": "Parce que les projections étaient souvent accompagnées de musique, bruitages ou commentaires.",
        "choices": [
          "Parce que les acteurs parlaient directement derrière l’écran.",
          "Parce que chaque film possédait déjà une piste numérique.",
          "Parce que les salles diffusaient uniquement des opéras."
        ],
        "why": "La séance sonore précède le son enregistré.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "technique",
        "q": "Quel problème les premiers microphones posent-ils aux tournages ?",
        "a": "Ils limitent la position et les mouvements des acteurs et de la caméra.",
        "choices": [
          "Ils rendent toute parole inaudible dans les salles.",
          "Ils interdisent totalement le montage.",
          "Ils ne peuvent enregistrer que la musique."
        ],
        "why": "La technique impose d’abord une mise en scène plus rigide.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "industrie",
        "q": "Pourquoi les salles doivent-elles investir lors du passage au parlant ?",
        "a": "Parce qu’elles doivent installer amplification, haut-parleurs et projecteurs compatibles.",
        "choices": [
          "Parce que les films deviennent tous deux fois plus longs.",
          "Parce que les spectateurs doivent recevoir un casque individuel.",
          "Parce que les pellicules cessent d’exister."
        ],
        "why": "Le parlant suppose une infrastructure nouvelle.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "international",
        "q": "Pourquoi le son complique-t-il la circulation internationale des films ?",
        "a": "Parce que la voix enregistrée est liée à une langue, contrairement à un intertitre facilement remplacé.",
        "choices": [
          "Parce que les images ne peuvent plus franchir les frontières.",
          "Parce que tous les pays interdisent les films étrangers.",
          "Parce que les acteurs doivent voyager avec chaque copie."
        ],
        "why": "La langue devient une contrainte industrielle.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "mise en scène",
        "q": "Que peut apporter un son hors champ ?",
        "a": "Il peut faire exister un espace ou une action que l’image ne montre pas.",
        "choices": [
          "Il prouve que le film est mal synchronisé.",
          "Il supprime automatiquement toute tension.",
          "Il sert seulement à masquer les dialogues."
        ],
        "why": "Le son élargit l’espace narratif.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta237-premium-core"
  },
  "sci-relativity-spacetime-gravity": {
    "hook": "La relativité ne dit pas que tout est subjectif. Elle impose au contraire des lois très précises : la vitesse de la lumière est la même pour tous les observateurs inertiels, et les mesures de temps ou de distance s’ajustent pour préserver cette invariance.",
    "keyFacts": [
      "La relativité restreinte est publiée par Einstein en 1905",
      "La simultanéité dépend de l’état de mouvement de l’observateur",
      "Le temps propre d’une horloge en mouvement peut s’écouler différemment",
      "L’équivalence masse-énergie s’écrit E = mc²",
      "La relativité générale décrit la gravitation comme géométrie de l’espace-temps"
    ],
    "express": [
      "La physique de Newton suppose un temps universel et des vitesses qui s’additionnent simplement. Mais les équations de Maxwell donnent à la lumière une vitesse fixe. Einstein prend au sérieux deux principes : les lois de la physique sont les mêmes dans tous les référentiels inertiels et la vitesse de la lumière dans le vide est constante. Pour les concilier, il faut abandonner l’idée d’un temps identique pour tous.",
      "Deux événements simultanés pour un observateur peuvent ne pas l’être pour un autre en mouvement. Une horloge mobile est mesurée plus lente et une longueur dans la direction du mouvement plus courte. Ces effets sont négligeables dans la vie courante mais deviennent mesurables à grande vitesse. Ils ne viennent pas d’une illusion : ils sont intégrés au fonctionnement des accélérateurs de particules et des systèmes de navigation par satellites.",
      "En 1915, la relativité générale étend la réflexion aux référentiels accélérés et à la gravitation. Masse et énergie courbent l’espace-temps ; les corps libres suivent les trajectoires les plus naturelles de cette géométrie. La théorie explique la précession de Mercure, la déviation de la lumière et les ondes gravitationnelles. Elle ne remplace pas Newton partout : la mécanique newtonienne reste une excellente approximation lorsque vitesses et champs gravitationnels sont faibles."
    ],
    "complete": [
      {
        "title": "1. Le conflit entre mécanique et lumière",
        "text": "Dans la mécanique classique, un passager lance une balle et sa vitesse s’ajoute à celle du train. On pourrait attendre la même chose pour la lumière. Pourtant, les expériences et l’électromagnétisme indiquent une vitesse lumineuse invariantе. Einstein renonce à chercher un éther immobile et reformule espace et temps à partir de mesures par horloges et signaux lumineux."
      },
      {
        "title": "2. La simultanéité n’est plus absolue",
        "text": "Pour décider si deux événements lointains sont simultanés, il faut synchroniser des horloges. Or la propagation de la lumière et le mouvement de l’observateur modifient ce jugement. Deux éclairs frappant les extrémités d’un train peuvent être simultanés pour une personne sur le quai et non pour une personne dans le train. Il n’existe pas de présent universel indépendant de tout référentiel."
      },
      {
        "title": "3. Dilatation du temps et contraction des longueurs",
        "text": "Une horloge en mouvement par rapport à un observateur accumule moins de temps entre deux rencontres. Des particules instables créées dans l’atmosphère atteignent le sol parce que leur durée de vie mesurée depuis la Terre est dilatée. Les longueurs se contractent dans la direction du mouvement. Chaque observateur obtient des mesures cohérentes dans son propre référentiel ; aucun paradoxe ne subsiste lorsque l’on compare correctement les trajectoires dans l’espace-temps."
      },
      {
        "title": "4. Masse, énergie et limite de vitesse",
        "text": "L’équation E = mc² indique qu’une masse au repos correspond à une énergie considérable. Elle ne signifie pas que toute masse se convertit spontanément en rayonnement. À mesure qu’un objet massif accélère, l’énergie nécessaire augmente fortement ; atteindre la vitesse de la lumière demanderait une énergie sans limite. Les particules sans masse, comme les photons, se déplacent dans le vide à cette vitesse."
      },
      {
        "title": "5. La gravitation devient géométrie",
        "text": "Einstein remarque qu’en chute libre, on ne ressent localement plus son poids : c’est le principe d’équivalence. Dans la relativité générale, la présence de masse-énergie courbe la géométrie, et cette géométrie guide les mouvements. Les horloges fonctionnent plus lentement dans un champ gravitationnel plus intense. Les satellites GPS doivent corriger à la fois effets de vitesse et de gravité pour donner une position précise."
      }
    ],
    "deeper": [
      {
        "title": "Le paradoxe des jumeaux",
        "text": "Le jumeau voyageur change de référentiel en accélérant et suit une trajectoire d’espace-temps différente ; la situation n’est donc pas symétrique."
      },
      {
        "title": "Lentilles gravitationnelles",
        "text": "La courbure de l’espace-temps dévie la lumière et peut multiplier ou agrandir l’image d’un objet lointain."
      },
      {
        "title": "Domaine de validité",
        "text": "Une théorie plus générale ne rend pas l’ancienne inutile : Newton reste efficace pour de nombreux calculs ordinaires."
      }
    ],
    "takeaways": [
      {
        "label": "Invariant",
        "text": "La vitesse de la lumière structure la relativité restreinte."
      },
      {
        "label": "Temps",
        "text": "Durée et simultanéité dépendent du mouvement relatif."
      },
      {
        "label": "Énergie",
        "text": "Masse et énergie sont deux formes liées."
      },
      {
        "label": "Gravité",
        "text": "La relativité générale décrit une géométrie dynamique."
      }
    ],
    "quiz": [
      {
        "kind": "principe",
        "q": "Que conserve tous les observateurs inertiels dans la relativité restreinte ?",
        "a": "La même valeur de la vitesse de la lumière dans le vide.",
        "choices": [
          "La même vitesse pour tous les objets matériels.",
          "Un temps universel identique partout.",
          "La même position dans l’espace."
        ],
        "why": "L’invariance de c oblige à repenser espace et temps.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "simultanéité",
        "q": "Pourquoi deux événements peuvent-ils être simultanés pour un observateur et pas pour un autre ?",
        "a": "Parce que la synchronisation des horloges et la propagation des signaux dépendent de leur mouvement relatif.",
        "choices": [
          "Parce que les événements changent réellement d’ordre pour une même trajectoire causale.",
          "Parce qu’une horloge immobile ne mesure jamais le temps.",
          "Parce que la lumière voyage à des vitesses arbitraires."
        ],
        "why": "La simultanéité lointaine dépend du référentiel.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "preuve",
        "q": "Pourquoi des particules instables atmosphériques peuvent-elles atteindre le sol ?",
        "a": "Parce que leur durée de vie mesurée depuis la Terre est dilatée par leur grande vitesse.",
        "choices": [
          "Parce qu’elles deviennent immortelles dans l’atmosphère.",
          "Parce que la gravité cesse complètement d’exister.",
          "Parce qu’elles se déplacent plus vite que la lumière."
        ],
        "why": "La dilatation du temps est mesurable.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "énergie",
        "q": "Que signifie correctement E = mc² ?",
        "a": "Qu’une masse au repos correspond à une quantité d’énergie.",
        "choices": [
          "Que tout objet se transforme spontanément en lumière.",
          "Que la vitesse de la lumière dépend de la masse.",
          "Que l’énergie n’est jamais conservée."
        ],
        "why": "L’équivalence n’implique pas une conversion automatique.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "gravité",
        "q": "Comment la relativité générale décrit-elle la gravitation ?",
        "a": "Comme la courbure de l’espace-temps produite par la masse et l’énergie.",
        "choices": [
          "Comme un fluide invisible poussant les planètes.",
          "Comme une force existant seulement sur Terre.",
          "Comme une erreur des horloges mécaniques."
        ],
        "why": "Les corps suivent la géométrie courbe.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta237-premium-core"
  },
  "sci-periodic-table-mendeleev-elements": {
    "hook": "Le tableau périodique est bien plus qu’une liste à mémoriser. Il condense une idée scientifique puissante : lorsque les éléments sont ordonnés correctement, leurs propriétés se répètent selon une structure qui permet de comparer, d’expliquer et même de prévoir.",
    "keyFacts": [
      "Mendeleïev publie un tableau influent en 1869",
      "Il laisse des cases vides pour des éléments encore inconnus",
      "L’ordre moderne repose sur le numéro atomique, pas sur la masse atomique",
      "Les colonnes regroupent des propriétés chimiques apparentées",
      "La structure électronique explique la périodicité"
    ],
    "express": [
      "Au XIXe siècle, les chimistes découvrent de nombreux éléments et mesurent leurs masses, mais les classifications restent partielles. Dmitri Mendeleïev ordonne les éléments et surtout accepte de casser l’ordre simple des masses lorsque les propriétés chimiques l’exigent. Il laisse des cases vides et décrit à l’avance certaines caractéristiques d’éléments futurs, comme le gallium.",
      "Le tableau moderne classe les éléments par numéro atomique, c’est-à-dire par nombre de protons. Ce principe, établi grâce aux travaux de Moseley, résout plusieurs anomalies. Les lignes correspondent au remplissage progressif de couches électroniques ; les colonnes rassemblent souvent des éléments dont les électrons externes produisent des réactions similaires. Les gaz nobles sont peu réactifs, les alcalins réagissent fortement et les halogènes forment facilement des sels.",
      "La périodicité ne permet pas de tout deviner. Les propriétés dépendent aussi de la structure, des liaisons, de la température ou de la pression. Mais le tableau donne une carte de la matière : métaux, non-métaux, transitions, lanthanides, actinides. Les éléments au-delà de l’uranium sont en grande partie produits artificiellement et souvent très instables. Le tableau continue donc d’être un outil de recherche, pas seulement une affiche scolaire."
    ],
    "complete": [
      {
        "title": "1. Classer une matière de plus en plus diverse",
        "text": "Lavoisier distingue à la fin du XVIIIe siècle des substances simples, mais leur nombre augmente rapidement. Döbereiner repère des triades ; Newlands propose une loi des octaves. Ces tentatives montrent des répétitions sans fournir une organisation générale satisfaisante. Les chimistes ont besoin d’un système capable d’accueillir découvertes et corrections, pas seulement de ranger ce qui est déjà connu."
      },
      {
        "title": "2. La force prédictive de Mendeleïev",
        "text": "Mendeleïev classe principalement selon masse atomique et comportement chimique. Lorsqu’une propriété ne correspond pas, il préfère parfois inverser deux éléments ou supposer une mesure erronée. Surtout, il laisse des espaces et prédit densité, type d’oxyde ou réactivité d’éléments manquants. La découverte du gallium, du scandium et du germanium renforce considérablement son système."
      },
      {
        "title": "3. Le numéro atomique résout l’ordre",
        "text": "Au début du XXe siècle, Moseley relie les spectres de rayons X à une grandeur entière : la charge nucléaire. Le numéro atomique devient le principe d’ordre. Ainsi, tellure et iode trouvent leur place correcte malgré leurs masses relatives. Les isotopes expliquent pourquoi des atomes du même élément peuvent avoir des masses différentes tout en partageant le même nombre de protons."
      },
      {
        "title": "4. Les électrons expliquent les familles",
        "text": "La mécanique quantique montre que les électrons occupent des niveaux et orbitales. Les électrons de valence influencent fortement les liaisons et la réactivité. Les éléments d’une même colonne possèdent des configurations externes analogues, d’où des propriétés périodiques. Rayon atomique, énergie d’ionisation ou électronégativité suivent des tendances, mais avec des exceptions qu’il faut interpréter plutôt que mémoriser aveuglément."
      },
      {
        "title": "5. Une carte ouverte de la matière",
        "text": "Les éléments lourds sont synthétisés dans des accélérateurs ou réacteurs par fusion de noyaux. Leur existence peut durer une fraction de seconde, mais elle teste les modèles nucléaires. Les noms et symboles sont validés internationalement. La recherche explore aussi une possible « île de stabilité ». Le tableau périodique relie ainsi chimie quotidienne, physique atomique, astrophysique et science nucléaire."
      }
    ],
    "deeper": [
      {
        "title": "Élément et isotope",
        "text": "L’élément est défini par son nombre de protons ; les isotopes diffèrent par leur nombre de neutrons."
      },
      {
        "title": "Métaux de transition",
        "text": "Le remplissage des orbitales d produit plusieurs états d’oxydation et des composés souvent colorés."
      },
      {
        "title": "Prédire sans simplifier",
        "text": "Une tendance périodique est une règle générale, pas une garantie absolue pour chaque composé."
      }
    ],
    "takeaways": [
      {
        "label": "Ordre",
        "text": "Le numéro atomique organise le tableau moderne."
      },
      {
        "label": "Prévision",
        "text": "Les cases vides de Mendeleïev montrent la puissance d’une classification scientifique."
      },
      {
        "label": "Électrons",
        "text": "La structure électronique explique les familles chimiques."
      },
      {
        "label": "Recherche",
        "text": "Le tableau évolue avec la synthèse d’éléments lourds."
      }
    ],
    "quiz": [
      {
        "kind": "Mendeleïev",
        "q": "Pourquoi les cases vides de Mendeleïev sont-elles importantes ?",
        "a": "Parce qu’elles permettent de prédire des éléments inconnus et certaines de leurs propriétés.",
        "choices": [
          "Parce qu’il refuse de reconnaître les métaux.",
          "Parce qu’il ignore tous les éléments gazeux.",
          "Parce qu’il veut limiter le tableau à dix éléments."
        ],
        "why": "Une bonne classification devient prédictive.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "ordre",
        "q": "Quel critère ordonne le tableau périodique moderne ?",
        "a": "Le numéro atomique, donc le nombre de protons.",
        "choices": [
          "La couleur visible de l’élément.",
          "Sa date de découverte.",
          "Son prix commercial."
        ],
        "why": "La charge nucléaire définit l’élément.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "familles",
        "q": "Pourquoi les éléments d’une même colonne ont-ils souvent des propriétés voisines ?",
        "a": "Parce que leurs configurations électroniques externes sont analogues.",
        "choices": [
          "Parce qu’ils possèdent tous la même masse.",
          "Parce qu’ils ont été découverts par la même personne.",
          "Parce qu’ils sont tous solides à température ambiante."
        ],
        "why": "Les électrons de valence gouvernent une grande part de la chimie.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "isotopes",
        "q": "Qu’est-ce qui distingue deux isotopes d’un même élément ?",
        "a": "Leur nombre de neutrons, et donc leur masse.",
        "choices": [
          "Leur nombre de protons.",
          "Leur symbole chimique obligatoire.",
          "Leur place dans une colonne différente."
        ],
        "why": "Le numéro atomique reste identique.",
        "trap": "",
        "evidence": "Approfondissement « Élément et isotope »."
      },
      {
        "kind": "limites",
        "q": "Pourquoi une tendance périodique ne suffit-elle pas à prévoir tout comportement chimique ?",
        "a": "Parce que liaisons, structure, température et autres conditions influencent aussi les propriétés.",
        "choices": [
          "Parce que le tableau ne contient aucun élément réel.",
          "Parce que les électrons n’interviennent jamais en chimie.",
          "Parce que les colonnes changent chaque jour."
        ],
        "why": "Le tableau est une carte, pas une réponse automatique.",
        "trap": "",
        "evidence": "Section 4."
      }
    ],
    "editorialRevision": "beta237-premium-core"
  },
  "astro-seasons-tilt-solstice-equinox": {
    "hook": "L’été n’arrive pas parce que la Terre se rapproche du Soleil. Les saisons viennent surtout de l’inclinaison de l’axe terrestre, qui modifie à la fois la hauteur du Soleil dans le ciel et la durée du jour au cours de l’année.",
    "keyFacts": [
      "L’axe terrestre est incliné d’environ 23,5° par rapport au plan orbital",
      "Les deux hémisphères connaissent des saisons opposées",
      "Un Soleil plus haut concentre davantage l’énergie sur une même surface",
      "Les solstices correspondent aux extrêmes de durée du jour",
      "Les équinoxes sont les moments où le Soleil traverse l’équateur céleste"
    ],
    "express": [
      "La Terre tourne autour du Soleil en gardant son axe orienté presque dans la même direction de l’espace. Pendant une partie de l’année, l’hémisphère Nord est incliné vers le Soleil : les jours y sont plus longs et les rayons arrivent plus directement. Six mois plus tard, c’est l’hémisphère Sud qui bénéficie de cette configuration. Les saisons sont donc inversées entre Nord et Sud.",
      "La hauteur du Soleil compte autant que la durée du jour. Lorsque les rayons arrivent obliquement, la même énergie se répartit sur une surface plus grande et traverse davantage d’atmosphère. Un Soleil bas chauffe moins efficacement. Le sol et l’océan mettent aussi du temps à se réchauffer ou à se refroidir, ce qui explique que les températures maximales arrivent après le solstice d’été.",
      "La distance Terre-Soleil varie légèrement, mais elle ne produit pas les saisons : la Terre est même au plus près du Soleil au début de janvier. Les solstices marquent les déclinaisons extrêmes du Soleil ; les équinoxes correspondent au passage de l’équateur céleste. Près de l’équateur, les variations de température sont souvent faibles et les saisons peuvent être surtout organisées par les pluies. Vers les pôles, les contrastes de lumière deviennent extrêmes."
    ],
    "complete": [
      {
        "title": "1. Une planète inclinée",
        "text": "Le plan de l’orbite terrestre sert de référence. L’axe de rotation est incliné d’environ 23,5 degrés par rapport à la perpendiculaire à ce plan. Cette orientation reste presque parallèle à elle-même au cours de l’année. C’est ce maintien qui fait alterner l’hémisphère penché vers le Soleil. Sans inclinaison, la durée du jour varierait beaucoup moins et les saisons seraient très faibles."
      },
      {
        "title": "2. Deux mécanismes de chauffage",
        "text": "En été, le Soleil décrit une trajectoire plus haute et reste visible plus longtemps. Les rayons proches de la verticale concentrent leur énergie sur une petite surface ; les rayons obliques l’étalent. La journée plus longue ajoute des heures de chauffage. Les deux effets se renforcent. La température dépend ensuite des nuages, vents, océans, altitude et nature du sol."
      },
      {
        "title": "3. Solstices et équinoxes",
        "text": "Au solstice de juin, le Soleil atteint sa déclinaison la plus au nord : jour le plus long dans l’hémisphère Nord et le plus court au Sud. Au solstice de décembre, la situation s’inverse. Aux équinoxes, le centre du Soleil traverse l’équateur céleste. Jour et nuit sont alors proches de douze heures, mais pas exactement partout à cause de la réfraction atmosphérique et de la taille apparente du Soleil."
      },
      {
        "title": "4. Pourquoi les saisons retardent-elles ?",
        "text": "Le maximum d’ensoleillement ne produit pas immédiatement le maximum de température. Océans et sols stockent de l’énergie ; le bilan entre énergie reçue et perdue reste positif après le solstice d’été. Les températures continuent donc souvent à monter pendant plusieurs semaines. Ce décalage, appelé inertie thermique saisonnière, est plus marqué près des océans que dans les continents."
      },
      {
        "title": "5. Des saisons différentes selon les latitudes",
        "text": "Aux hautes latitudes, la durée du jour varie fortement, jusqu’au soleil de minuit et à la nuit polaire. Près de l’équateur, la hauteur solaire reste élevée et la température varie moins ; alternance humide-sèche peut être plus importante. Les climats régionaux dépendent également des courants océaniques, reliefs et moussons. Le mécanisme astronomique est global, mais ses effets climatiques sont géographiquement divers."
      }
    ],
    "deeper": [
      {
        "title": "Périhélie",
        "text": "La Terre passe au plus près du Soleil début janvier, preuve simple que la distance n’explique pas l’été de l’hémisphère Nord."
      },
      {
        "title": "Précession",
        "text": "L’axe terrestre change lentement d’orientation sur des millénaires, ce qui modifie la relation entre saisons et position orbitale."
      },
      {
        "title": "Planètes",
        "text": "Mars possède aussi des saisons ; leur intensité dépend de son inclinaison et de son orbite plus excentrique."
      }
    ],
    "takeaways": [
      {
        "label": "Inclinaison",
        "text": "L’axe terrestre est la cause principale des saisons."
      },
      {
        "label": "Lumière",
        "text": "Hauteur du Soleil et durée du jour modifient l’énergie reçue."
      },
      {
        "label": "Opposition",
        "text": "Les hémisphères Nord et Sud ont des saisons inversées."
      },
      {
        "label": "Climats",
        "text": "Le même mécanisme produit des effets différents selon latitude et milieu."
      }
    ],
    "quiz": [
      {
        "kind": "cause",
        "q": "Quelle est la cause principale des saisons terrestres ?",
        "a": "L’inclinaison de l’axe de rotation de la Terre.",
        "choices": [
          "La variation quotidienne de la distance au Soleil.",
          "Les phases de la Lune.",
          "Le changement annuel de vitesse de la lumière."
        ],
        "why": "L’inclinaison modifie hauteur solaire et durée du jour.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "chauffage",
        "q": "Pourquoi un Soleil haut chauffe-t-il plus efficacement ?",
        "a": "Parce que son énergie se concentre sur une surface plus petite.",
        "choices": [
          "Parce qu’il devient physiquement plus gros en été.",
          "Parce que l’atmosphère cesse d’exister.",
          "Parce que la Terre arrête de tourner."
        ],
        "why": "L’angle d’incidence modifie l’énergie par unité de surface.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "distance",
        "q": "Quel fait contredit l’idée que l’été boréal vient d’une Terre plus proche du Soleil ?",
        "a": "La Terre est au plus près du Soleil au début de janvier.",
        "choices": [
          "La Lune tourne autour de la Terre.",
          "Le Soleil se lève à l’est.",
          "L’année comporte douze mois."
        ],
        "why": "La distance n’explique pas l’opposition des saisons.",
        "trap": "",
        "evidence": "Approfondissement « Périhélie »."
      },
      {
        "kind": "retard",
        "q": "Pourquoi les jours les plus chauds arrivent-ils souvent après le solstice d’été ?",
        "a": "Parce que sols et océans continuent à accumuler de l’énergie pendant un certain temps.",
        "choices": [
          "Parce que le Soleil continue à monter indéfiniment.",
          "Parce que l’année s’arrête au solstice.",
          "Parce que la Terre se rapproche brutalement du Soleil en août."
        ],
        "why": "L’inertie thermique crée un décalage.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "latitudes",
        "q": "Pourquoi les saisons proches de l’équateur sont-elles souvent moins thermiques ?",
        "a": "Parce que la hauteur du Soleil et la durée du jour y varient relativement peu.",
        "choices": [
          "Parce que l’équateur ne reçoit aucun rayonnement solaire.",
          "Parce que les océans y sont toujours gelés.",
          "Parce que la Terre n’y tourne pas."
        ],
        "why": "Les pluies peuvent y structurer davantage l’année.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta237-premium-core"
  },
  "eco-inequality-income-wealth-redistribution": {
    "hook": "Deux sociétés ayant le même revenu moyen peuvent être radicalement différentes selon la manière dont revenus, patrimoine, services publics et possibilités d’avenir sont répartis. Mesurer les inégalités exige donc plusieurs indicateurs et une distinction claire entre flux de revenus et stock de richesse.",
    "keyFacts": [
      "Le revenu est un flux reçu pendant une période ; le patrimoine est un stock détenu",
      "Le revenu médian décrit mieux la situation centrale que la moyenne lorsque les hauts revenus sont très élevés",
      "La courbe de Lorenz et le coefficient de Gini résument une distribution",
      "Impôts, prestations et services publics modifient le revenu disponible et les conditions de vie",
      "Les inégalités économiques se combinent avec genre, origine, territoire, santé et éducation"
    ],
    "express": [
      "Le revenu comprend salaires, revenus d’activité indépendante, retraites, prestations et revenus du capital. Le patrimoine rassemble logements, terres, épargne, entreprises et actifs financiers, moins les dettes. Comme il s’accumule et se transmet, le patrimoine est généralement beaucoup plus concentré que le revenu. Confondre les deux masque une dimension essentielle des inégalités.",
      "La moyenne est sensible aux valeurs extrêmes. Si quelques personnes reçoivent des revenus très élevés, elle augmente sans que la majorité voie sa situation changer. La médiane sépare la population en deux moitiés. Les déciles, rapports entre hauts et bas revenus, courbes de Lorenz et coefficient de Gini donnent d’autres angles. Aucun indicateur ne résume à lui seul la pauvreté, la concentration au sommet et la mobilité entre générations.",
      "La redistribution passe par impôts, cotisations, prestations monétaires et services publics. Une école, un hôpital ou une garde d’enfants gratuite ne figurent pas toujours directement dans le revenu versé, mais changent fortement le niveau de vie. Les politiques doivent arbitrer entre réduction des écarts, financement collectif et effets sur emploi ou investissement. Le débat ne porte donc pas seulement sur le niveau d’inégalité, mais sur ses causes, ses conséquences et les formes jugées légitimes."
    ],
    "complete": [
      {
        "title": "1. Revenu, niveau de vie et patrimoine",
        "text": "Le revenu d’un ménage ne suffit pas pour comparer ses conditions de vie : il faut tenir compte du nombre de personnes qui partagent les ressources, du logement, des dettes et des prix locaux. Les statisticiens utilisent des unités de consommation pour calculer un niveau de vie. Le patrimoine offre sécurité, capacité d’emprunt et transmission. Deux ménages ayant le même revenu peuvent donc avoir des vulnérabilités très différentes."
      },
      {
        "title": "2. Mesurer sans écraser la distribution",
        "text": "La médiane indique le centre, les déciles décrivent les positions relatives et le taux de pauvreté mesure la part sous un seuil conventionnel. La courbe de Lorenz compare la part cumulée des revenus à la part cumulée de la population ; le Gini résume l’écart à l’égalité parfaite. Un même Gini peut toutefois cacher des distributions différentes, notamment au sommet. Il faut croiser les outils."
      },
      {
        "title": "3. D’où viennent les inégalités ?",
        "text": "Diplômes, professions, temps de travail, chômage, héritages et rendement du capital influencent les revenus. Mais ces facteurs ne sont pas indépendants : quartier, santé, réseaux, discriminations et qualité scolaire modifient les possibilités. Les technologies et la mondialisation changent la demande de compétences et le pouvoir de négociation. Les institutions — salaire minimum, syndicats, fiscalité, droit du travail — jouent également un rôle majeur."
      },
      {
        "title": "4. Redistribution monétaire et services publics",
        "text": "Les prélèvements progressifs augmentent avec la capacité contributive ; les prestations ciblées ou universelles soutiennent les ménages. Les pensions et l’assurance chômage remplacent des revenus perdus. Les services publics fournissent directement éducation, santé, sécurité ou transport. Mesurer seulement les transferts en argent sous-estime donc une partie de la redistribution. Son efficacité dépend aussi de l’accès réel et de la qualité des services."
      },
      {
        "title": "5. Égalité, équité et mobilité",
        "text": "Une société peut accepter certains écarts s’ils récompensent effort ou responsabilité, mais contester ceux qui viennent d’héritages ou de discriminations. L’égalité des chances ne garantit pas l’égalité des résultats, et elle est difficile à assurer lorsque les conditions de départ divergent fortement. La mobilité sociale mesure les déplacements entre positions, mais une forte mobilité n’efface pas nécessairement une grande distance entre le haut et le bas."
      }
    ],
    "deeper": [
      {
        "title": "Pauvreté relative",
        "text": "Elle est définie par rapport au niveau de vie médian d’une société, donc mesure aussi l’exclusion des standards courants."
      },
      {
        "title": "Top 1 %",
        "text": "Étudier le sommet de la distribution exige souvent des données fiscales, car les enquêtes interrogent peu de très hauts patrimoines."
      },
      {
        "title": "Avant et après redistribution",
        "text": "Comparer revenu primaire et revenu disponible permet d’évaluer l’effet du système fiscal et social."
      }
    ],
    "takeaways": [
      {
        "label": "Distinction",
        "text": "Revenu et patrimoine ne mesurent pas la même chose."
      },
      {
        "label": "Indicateurs",
        "text": "Moyenne, médiane, déciles et Gini éclairent des dimensions différentes."
      },
      {
        "label": "Institutions",
        "text": "Marché du travail, fiscalité et services publics façonnent la distribution."
      },
      {
        "label": "Débat",
        "text": "L’inégalité pose des questions d’efficacité, de pouvoir et de justice."
      }
    ],
    "quiz": [
      {
        "kind": "concept",
        "q": "Quelle différence fondamentale sépare revenu et patrimoine ?",
        "a": "Le revenu est un flux sur une période, le patrimoine un stock détenu.",
        "choices": [
          "Le revenu concerne seulement les entreprises.",
          "Le patrimoine ne peut jamais être transmis.",
          "Les deux mots désignent exactement la même mesure."
        ],
        "why": "La distinction permet d’analyser accumulation et sécurité.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "statistique",
        "q": "Pourquoi la médiane peut-elle être plus informative que la moyenne ?",
        "a": "Parce qu’elle est moins tirée vers le haut par quelques revenus extrêmement élevés.",
        "choices": [
          "Parce qu’elle additionne tous les patrimoines.",
          "Parce qu’elle mesure automatiquement la pauvreté absolue.",
          "Parce qu’elle ignore la moitié de la population."
        ],
        "why": "La médiane décrit la position centrale.",
        "trap": "",
        "evidence": "Introduction et section 2."
      },
      {
        "kind": "Gini",
        "q": "Que résume le coefficient de Gini ?",
        "a": "Le degré global de concentration d’une distribution par rapport à l’égalité parfaite.",
        "choices": [
          "Le montant exact de chaque salaire.",
          "Le nombre d’entreprises d’un pays.",
          "La croissance annuelle des prix."
        ],
        "why": "Le Gini est synthétique mais ne dit pas tout.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "redistribution",
        "q": "Pourquoi les services publics comptent-ils dans la redistribution ?",
        "a": "Parce qu’ils fournissent des ressources et protections qui améliorent le niveau de vie sans toujours verser d’argent.",
        "choices": [
          "Parce qu’ils augmentent automatiquement tous les patrimoines privés.",
          "Parce qu’ils remplacent toute fiscalité.",
          "Parce qu’ils ne bénéficient qu’aux plus hauts revenus."
        ],
        "why": "La redistribution dépasse les transferts monétaires.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "mobilité",
        "q": "Une forte mobilité sociale suffit-elle à prouver que les inégalités sont faibles ?",
        "a": "Non, on peut se déplacer entre positions tout en gardant de grands écarts entre elles.",
        "choices": [
          "Oui, mobilité et égalité sont strictement identiques.",
          "Oui, si le revenu moyen augmente une fois.",
          "Non, parce que personne ne change jamais de position."
        ],
        "why": "Distance et mobilité sont deux dimensions différentes.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta237-premium-core"
  },
  "geo-demographic-transition-fertility-aging": {
    "hook": "Une population ne croît pas simplement parce qu’elle « fait beaucoup d’enfants ». Elle change lorsque mortalité et fécondité diminuent à des rythmes différents, tandis que migrations et structure par âge prolongent ou freinent ces effets pendant des décennies.",
    "keyFacts": [
      "La transition démographique décrit le passage de fortes mortalité et fécondité à des niveaux plus faibles",
      "La mortalité baisse généralement avant la fécondité, provoquant une phase de croissance rapide",
      "L’espérance de vie dépend fortement de la baisse de la mortalité infantile",
      "L’inertie démographique peut maintenir la croissance après la baisse de la fécondité",
      "Le vieillissement résulte de vies plus longues et de générations moins nombreuses"
    ],
    "express": [
      "Dans un régime ancien, naissances et décès sont nombreux. Les épidémies, famines et mortalité infantile rendent la croissance lente et instable. Avec amélioration de l’alimentation, hygiène, vaccination, soins et infrastructures, la mortalité diminue. Si la fécondité reste élevée, l’écart entre naissances et décès s’élargit : la population augmente rapidement.",
      "La fécondité baisse ensuite sous l’effet combiné de l’urbanisation, de la scolarisation des filles, de l’accès à la contraception, du coût des enfants, de la baisse de leur mortalité et de nouvelles aspirations familiales. Il n’existe pas une séquence identique partout. Politiques publiques, conflits, migrations et normes sociales modifient les trajectoires. Certains pays vieillissent avant d’avoir atteint un haut niveau de revenu.",
      "La structure par âge compte autant que le taux de fécondité. Une population très jeune peut continuer à croître parce que de nombreuses personnes arrivent à l’âge d’avoir des enfants : c’est l’inertie démographique. À l’inverse, une population vieillissante doit adapter retraites, santé, logement et travail. Les migrations peuvent rajeunir localement et redistribuer la population, mais elles ne suppriment pas mécaniquement toutes les tensions démographiques."
    ],
    "complete": [
      {
        "title": "1. Du régime ancien à la baisse de la mortalité",
        "text": "Avant la transition, mortalité et fécondité sont élevées. Une espérance de vie faible ne signifie pas que personne ne devient vieux : elle reflète surtout de nombreux décès précoces. La sécurisation alimentaire, l’eau potable, les égouts, les vaccins et les traitements réduisent progressivement les décès. Les gains sanitaires ne viennent donc pas uniquement de la médecine hospitalière, mais aussi de transformations sociales et territoriales."
      },
      {
        "title": "2. Pourquoi la fécondité diminue-t-elle ?",
        "text": "Lorsque les enfants survivent davantage, les familles n’ont plus besoin d’autant de naissances pour atteindre la taille souhaitée. L’éducation, l’emploi féminin, la contraception et l’urbanisation retardent l’âge des unions et augmentent le coût d’opportunité d’une famille nombreuse. Les politiques peuvent accompagner ou contraindre ces choix, mais elles agissent dans un ensemble de normes, revenus et rapports de genre."
      },
      {
        "title": "3. Lire une pyramide des âges",
        "text": "Une base large indique de nombreuses naissances récentes ; un renflement signale une génération nombreuse ou une migration ; un sommet élargi reflète une longue survie. La pyramide conserve la mémoire des guerres, baby-booms, crises et migrations. Elle permet d’anticiper entrées à l’école, sur le marché du travail ou à la retraite, mais ne prédit pas parfaitement les comportements futurs."
      },
      {
        "title": "4. Inertie et dividende démographiques",
        "text": "Même avec une fécondité proche du remplacement, une population jeune peut croître longtemps. Lorsque la part des adultes actifs augmente par rapport aux enfants, un dividende démographique est possible : davantage de travailleurs potentiels par personne dépendante. Il n’est jamais automatique. Il faut emplois, formation, santé et institutions capables de transformer cette structure en développement."
      },
      {
        "title": "5. Vieillissement, migrations et politiques",
        "text": "Le vieillissement augmente les besoins de soins et modifie les équilibres de retraite, mais il reflète aussi un succès sanitaire. Les politiques peuvent agir sur emploi des seniors, prévention, logement ou accueil de migrants. Les migrations dépendent toutefois de décisions individuelles, de conflits, de marchés du travail et de politiques frontalières. Les réduire à une variable d’ajustement démographique efface les personnes et les causes des mobilités."
      }
    ],
    "deeper": [
      {
        "title": "Taux de remplacement",
        "text": "Il est proche de 2,1 enfants par femme dans les pays à faible mortalité, mais varie selon mortalité et équilibre des sexes."
      },
      {
        "title": "Espérance de vie",
        "text": "C’est une moyenne calculée à partir des conditions de mortalité d’une période, pas l’âge prévu pour chaque individu."
      },
      {
        "title": "Données et recensements",
        "text": "La qualité des statistiques varie ; les estimations combinent recensements, registres et enquêtes."
      }
    ],
    "takeaways": [
      {
        "label": "Décalage",
        "text": "La mortalité baisse souvent avant la fécondité."
      },
      {
        "label": "Structure",
        "text": "La composition par âge influence le futur démographique."
      },
      {
        "label": "Pluralité",
        "text": "Les transitions suivent des rythmes et mécanismes différents."
      },
      {
        "label": "Politiques",
        "text": "École, santé, emploi et logement sont au cœur des enjeux."
      }
    ],
    "quiz": [
      {
        "kind": "mécanisme",
        "q": "Pourquoi la population croît-elle rapidement au début de la transition démographique ?",
        "a": "Parce que la mortalité baisse alors que la fécondité reste encore élevée.",
        "choices": [
          "Parce que les naissances et les décès augmentent exactement ensemble.",
          "Parce que toute migration s’arrête.",
          "Parce que l’espérance de vie diminue fortement."
        ],
        "why": "L’écart entre naissances et décès s’élargit.",
        "trap": "",
        "evidence": "Sections 1 et 2."
      },
      {
        "kind": "espérance",
        "q": "Pourquoi une faible espérance de vie ancienne n’empêche-t-elle pas l’existence de personnes âgées ?",
        "a": "Parce que la moyenne est fortement abaissée par la mortalité infantile et les décès précoces.",
        "choices": [
          "Parce que l’espérance de vie ne tient jamais compte des décès.",
          "Parce que tous les adultes meurent au même âge.",
          "Parce que les personnes âgées ne sont pas comptées."
        ],
        "why": "La moyenne résume des risques très inégaux selon l’âge.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "pyramide",
        "q": "Que peut révéler un renflement dans une pyramide des âges ?",
        "a": "Une génération nombreuse, une migration ou un événement démographique passé.",
        "choices": [
          "La hauteur moyenne des habitants.",
          "Le niveau exact de richesse nationale.",
          "La température annuelle du pays."
        ],
        "why": "La structure d’âge conserve une mémoire.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "inertie",
        "q": "Qu’est-ce que l’inertie démographique ?",
        "a": "La poursuite de la croissance parce qu’une population jeune compte beaucoup de futurs parents.",
        "choices": [
          "L’arrêt immédiat de toute naissance.",
          "La disparition de la mortalité.",
          "Le refus des statistiques de changer."
        ],
        "why": "La structure d’âge prolonge les tendances.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "vieillissement",
        "q": "Pourquoi le vieillissement est-il aussi un signe de réussite ?",
        "a": "Parce qu’il résulte en partie d’une mortalité plus faible et de vies plus longues.",
        "choices": [
          "Parce qu’il supprime tous les besoins de santé.",
          "Parce qu’il garantit automatiquement la croissance économique.",
          "Parce qu’il empêche toute migration."
        ],
        "why": "Le défi démographique vient d’un progrès sanitaire réel.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta237-premium-core"
  },
  "geo-energy-transition-networks-minerals": {
    "hook": "Remplacer une centrale à charbon par des éoliennes ne suffit pas à décrire une transition énergétique. Il faut transformer réseaux, stockage, transports, bâtiments, industries, usages et rapports de pouvoir construits pendant deux siècles autour des combustibles fossiles.",
    "keyFacts": [
      "Les énergies fossiles restent structurantes pour transport, chaleur et industrie",
      "L’électricité n’est qu’une partie de l’énergie finale consommée",
      "Solaire et éolien exigent réseaux, flexibilité, stockage et pilotage de la demande",
      "Cuivre, lithium, nickel, cobalt et terres rares deviennent stratégiques pour certaines technologies",
      "Une transition juste répartit coûts, emplois, risques et bénéfices entre territoires"
    ],
    "express": [
      "Le charbon, le pétrole et le gaz possèdent une forte densité énergétique et sont faciles à stocker ou transporter. Ils ont façonné mines, ports, raffineries, automobiles, chauffage et géopolitique. Une transition doit donc modifier des infrastructures qui durent plusieurs décennies. Fermer trop vite sans solution sociale peut déstabiliser des régions ; attendre prolonge émissions, pollution et dépendances.",
      "L’éolien et le solaire produisent une électricité peu carbonée mais variable. Leur intégration demande lignes, interconnexions, prévisions, stockage, hydraulique, pilotage de la demande et moyens pilotables. L’électrification des voitures, pompes à chaleur ou procédés industriels réduit les combustibles fossiles, surtout si l’électricité est décarbonée. Mais certains secteurs comme acier, aviation ou ciment nécessitent aussi efficacité, sobriété, hydrogène ou procédés nouveaux.",
      "Les technologies déplacent les géographies de dépendance. Batteries, réseaux et moteurs utilisent beaucoup de cuivre, lithium, nickel ou terres rares, dont l’extraction a des impacts locaux. La transition peut créer emplois et améliorer l’air, mais aussi provoquer conflits fonciers, hausses de prix ou pertes d’activité. Elle est donc technique, sociale et politique : qui décide des projets, qui paie, qui bénéficie et quels territoires portent les nuisances ?"
    ],
    "complete": [
      {
        "title": "1. Un système fossile profondément installé",
        "text": "Les combustibles fossiles ne sont pas de simples marchandises substituables. Raffineries, pipelines, véhicules, chaudières et chaînes logistiques forment un système cohérent. Les États dépendent aussi de taxes, emplois et revenus d’exportation. La transition crée donc des actifs échoués et des gagnants ou perdants. Son rythme dépend des infrastructures existantes autant que du prix des technologies nouvelles."
      },
      {
        "title": "2. Décarboner l’électricité",
        "text": "Selon les pays, nucléaire, hydraulique, solaire, éolien, géothermie ou biomasse peuvent contribuer. Aucun mix n’est universel. Un réseau doit équilibrer production et consommation à chaque instant. Les interconnexions élargissent la zone de compensation ; le stockage déplace l’énergie dans le temps ; la demande flexible évite certains pics. Les débats portent aussi sur coût, délais, paysages, déchets et sécurité d’approvisionnement."
      },
      {
        "title": "3. Électrifier et réduire la demande",
        "text": "Un moteur électrique ou une pompe à chaleur utilisent souvent l’énergie plus efficacement qu’un moteur thermique ou une chaudière fossile. Mais l’électrification exige des réseaux renforcés et des équipements accessibles. Isolation, transports collectifs, urbanisme compact et sobriété réduisent la quantité d’énergie nécessaire. Sans action sur les usages, la demande peut croître plus vite que les nouvelles capacités bas-carbone."
      },
      {
        "title": "4. Minerais et nouvelles dépendances",
        "text": "Une voiture électrique ou une éolienne n’utilise pas les mêmes ressources qu’un véhicule thermique. L’extraction de lithium, cuivre, cobalt ou nickel consomme eau, énergie et espace, et peut affecter les populations locales. Le raffinage est concentré dans quelques pays. Diversifier, recycler, réduire la taille des batteries et concevoir des produits réparables limitent les tensions sans les supprimer entièrement."
      },
      {
        "title": "5. Organiser une transition juste",
        "text": "Les ménages modestes consacrent souvent une plus grande part de leur budget à l’énergie et disposent de moins de capital pour rénover ou acheter un véhicule. Des aides mal conçues peuvent donc bénéficier surtout aux ménages aisés. Accompagner les travailleurs des bassins fossiles, négocier les implantations et redistribuer les bénéfices locaux rend la transition plus légitime. La justice concerne aussi les pays ayant peu contribué au réchauffement mais fortement exposés."
      }
    ],
    "deeper": [
      {
        "title": "Énergie et puissance",
        "text": "L’énergie est une quantité accumulée ; la puissance mesure le rythme auquel elle est produite ou utilisée."
      },
      {
        "title": "Hydrogène",
        "text": "C’est un vecteur énergétique, pas une source primaire ; son intérêt dépend de la manière dont il est produit et utilisé."
      },
      {
        "title": "Effet rebond",
        "text": "Un gain d’efficacité peut être partiellement annulé si la baisse du coût d’usage entraîne davantage de consommation."
      }
    ],
    "takeaways": [
      {
        "label": "Système",
        "text": "La transition transforme infrastructures et usages, pas seulement les sources."
      },
      {
        "label": "Réseaux",
        "text": "Une électricité variable exige flexibilité et planification."
      },
      {
        "label": "Ressources",
        "text": "Les technologies bas-carbone créent d’autres dépendances matérielles."
      },
      {
        "label": "Justice",
        "text": "Répartition des coûts et bénéfices conditionne l’acceptation."
      }
    ],
    "quiz": [
      {
        "kind": "système",
        "q": "Pourquoi la transition ne se réduit-elle pas à remplacer une centrale ?",
        "a": "Parce que transports, bâtiments, industries, réseaux et habitudes sont liés au système énergétique existant.",
        "choices": [
          "Parce que l’électricité n’est jamais utilisée.",
          "Parce que toutes les infrastructures se renouvellent chaque année.",
          "Parce que les combustibles fossiles n’ont aucun usage industriel."
        ],
        "why": "Les équipements et territoires forment un ensemble durable.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "réseau",
        "q": "Pourquoi éolien et solaire nécessitent-ils davantage de flexibilité ?",
        "a": "Parce que leur production varie avec les conditions météorologiques et le moment de la journée.",
        "choices": [
          "Parce qu’ils ne produisent jamais d’électricité.",
          "Parce qu’ils fonctionnent uniquement sous terre.",
          "Parce que les réseaux interdisent toute prévision."
        ],
        "why": "Stockage, interconnexion et demande pilotable équilibrent le système.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "efficacité",
        "q": "Pourquoi une pompe à chaleur peut-elle réduire l’énergie consommée pour le chauffage ?",
        "a": "Parce qu’elle déplace de la chaleur et fournit plusieurs unités de chaleur pour une unité d’électricité.",
        "choices": [
          "Parce qu’elle crée de l’énergie à partir de rien.",
          "Parce qu’elle fonctionne sans bâtiment.",
          "Parce qu’elle transforme toute chaleur en pétrole."
        ],
        "why": "L’électrification peut être plus efficace.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "minerais",
        "q": "Quel nouveau risque accompagne certaines technologies bas-carbone ?",
        "a": "Une dépendance accrue à des minerais dont extraction et raffinage sont concentrés et impactants.",
        "choices": [
          "La disparition de toute matière première.",
          "L’impossibilité absolue de recycler des métaux.",
          "La fin de tous les conflits fonciers."
        ],
        "why": "La décarbonation déplace une partie des dépendances.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "justice",
        "q": "Pourquoi une aide uniforme peut-elle être socialement injuste ?",
        "a": "Parce que les ménages n’ont pas les mêmes dépenses, logements ni capacité d’investir.",
        "choices": [
          "Parce que tous les ménages consomment exactement la même énergie.",
          "Parce que les prix de l’énergie sont toujours nuls.",
          "Parce qu’une transition ne crée jamais d’emplois."
        ],
        "why": "Les capacités d’adaptation sont inégales.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta237-premium-core"
  },
  "music-electronic-tape-synth-house-techno": {
    "hook": "La musique électronique n’est pas un genre unique né avec les ordinateurs. Elle vient de plusieurs histoires : studios de radio qui manipulent la bande, compositeurs qui synthétisent des sons, ingénieurs qui miniaturisent les machines et clubs où DJs et danseurs réinventent la répétition.",
    "keyFacts": [
      "La musique concrète travaille à partir de sons enregistrés dès la fin des années 1940",
      "Les synthétiseurs produisent et modulent des signaux électriques",
      "Le séquenceur organise des motifs dans le temps",
      "House et techno naissent dans des scènes de club noires et queer à Chicago et Detroit",
      "Sampling, boîte à rythmes et logiciel transforment la production et la circulation"
    ],
    "express": [
      "À Paris, Pierre Schaeffer découpe, boucle et ralentit des sons enregistrés : train, voix, percussion. Cette musique concrète part du son réel transformé. À Cologne, d’autres studios cherchent à construire le son électroniquement à partir de fréquences. Les deux approches se rencontrent bientôt, notamment grâce à la bande magnétique, qui permet montage, inversion et superposition.",
      "Les synthétiseurs analogiques rendent ces techniques plus accessibles, même s’ils restent d’abord coûteux et encombrants. Oscillateurs, filtres et enveloppes permettent de modeler timbre et durée. Le séquenceur répète des motifs ; la boîte à rythmes fournit une pulsation programmable. Wendy Carlos, Kraftwerk, Jean-Michel Jarre, le dub jamaïcain ou le disco montrent des usages très différents du studio électronique.",
      "Dans les clubs de Chicago, la house prolonge disco, gospel et soul ; à Detroit, la techno imagine une musique futuriste marquée par l’industrie automobile et les machines. DJs, danseurs, sound systems et labels indépendants sont aussi importants que les inventeurs d’appareils. Le numérique démocratise ensuite montage et synthèse, mais les logiciels reproduisent souvent des gestes nés avec la bande, les platines et les circuits analogiques."
    ],
    "complete": [
      {
        "title": "1. La bande comme instrument",
        "text": "Après 1945, le magnétophone permet de détacher un son de sa source. On peut couper la bande, faire une boucle, changer la vitesse ou lire à l’envers. Schaeffer parle d’écoute réduite : entendre le son pour sa texture plutôt que reconnaître seulement son origine. Dans les studios de radio, compositeurs et techniciens travaillent ensemble ; l’œuvre devient aussi une opération de montage."
      },
      {
        "title": "2. Synthétiser plutôt qu’enregistrer",
        "text": "Un synthétiseur crée des signaux à l’aide d’oscillateurs, puis modifie leur spectre avec filtres et amplificateurs. Une enveloppe contrôle l’évolution dans le temps. Les systèmes modulaires relient les fonctions par câbles. Le clavier facilite l’adoption musicale mais peut aussi enfermer l’instrument dans les habitudes de la gamme tempérée. D’autres interfaces et séquenceurs ouvrent des formes non instrumentales."
      },
      {
        "title": "3. Studio, dub et répétition",
        "text": "En Jamaïque, producteurs et ingénieurs retirent les voix, accentuent basse et batterie, ajoutent échos et réverbérations. Le dub fait du mixage une performance. Disco et funk développent longues sections rythmiques adaptées à la danse. Le DJ assemble les morceaux, prolonge les breaks et lit l’énergie de la salle. La répétition n’est pas absence d’invention : de petites variations deviennent très perceptibles."
      },
      {
        "title": "4. House et techno : des scènes avant des étiquettes",
        "text": "La house se développe autour du Warehouse et de clubs de Chicago fréquentés notamment par des publics noirs, latinos et gays. Frankie Knuckles mélange disques et boîtes à rythmes. À Detroit, Juan Atkins, Derrick May et Kevin Saunderson associent funk, synthétiseurs et imaginaire technologique. Réduire ces musiques à des sons de machine efface leurs contextes sociaux, leurs réseaux de danse et leurs ambitions futuristes."
      },
      {
        "title": "5. Le numérique transforme l’accès et l’économie",
        "text": "MIDI permet à des appareils de communiquer ; échantillonneurs et stations audionumériques concentrent en logiciel studio, séquenceur et effets. Produire devient moins coûteux, mais visibilité et revenus dépendent de plateformes, labels, festivals et algorithmes. Les débats sur sampling, droits et appropriation rappellent qu’un son manipulable reste lié à des créateurs et à une histoire."
      }
    ],
    "deeper": [
      {
        "title": "MIDI",
        "text": "Il transmet des instructions — note, vélocité, contrôle — mais pas directement le son lui-même."
      },
      {
        "title": "Acid house",
        "text": "La TB-303, conçue comme basse d’accompagnement, devient célèbre grâce à ses glissés et filtres poussés hors de l’usage prévu."
      },
      {
        "title": "Afrofuturisme",
        "text": "La techno de Detroit mobilise futur et technologie pour imaginer d’autres places aux populations noires dans la modernité."
      }
    ],
    "takeaways": [
      {
        "label": "Bande",
        "text": "Enregistrer permet de transformer le son en matériau."
      },
      {
        "label": "Synthèse",
        "text": "Oscillateurs, filtres et enveloppes fabriquent le timbre."
      },
      {
        "label": "Scènes",
        "text": "Clubs, DJs et publics co-créent les genres."
      },
      {
        "label": "Numérique",
        "text": "Le logiciel démocratise les outils sans effacer leurs histoires."
      }
    ],
    "quiz": [
      {
        "kind": "origine",
        "q": "Que distingue la musique concrète de la synthèse électronique initiale ?",
        "a": "Elle part de sons enregistrés puis transformés.",
        "choices": [
          "Elle interdit tout montage sur bande.",
          "Elle utilise uniquement des instruments acoustiques joués en concert.",
          "Elle ne travaille jamais la texture sonore."
        ],
        "why": "La source enregistrée devient un matériau.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "synthèse",
        "q": "Quel rôle joue un filtre dans un synthétiseur ?",
        "a": "Il modifie le spectre en atténuant certaines fréquences.",
        "choices": [
          "Il fixe automatiquement les droits d’auteur.",
          "Il transforme une note en image.",
          "Il remplace toute pulsation par du silence."
        ],
        "why": "Le filtre façonne le timbre.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "dub",
        "q": "Pourquoi le dub est-il important dans cette histoire ?",
        "a": "Parce qu’il transforme mixage, écho et retrait d’éléments en véritable composition.",
        "choices": [
          "Parce qu’il interdit l’usage de la basse.",
          "Parce qu’il supprime toute répétition.",
          "Parce qu’il naît dans les studios hollywoodiens des années 1920."
        ],
        "why": "Le studio devient un instrument performatif.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "scènes",
        "q": "Pourquoi faut-il parler de scènes de club pour la house et la techno ?",
        "a": "Parce que DJs, publics, lieux et réseaux sociaux participent à leur invention.",
        "choices": [
          "Parce que les machines composent seules sans humains.",
          "Parce que ces musiques sont créées uniquement pour la radio publique.",
          "Parce qu’elles n’ont aucun lien avec la danse."
        ],
        "why": "Un genre naît d’un écosystème social.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "MIDI",
        "q": "Que transporte principalement le protocole MIDI ?",
        "a": "Des instructions musicales et de contrôle, pas le son lui-même.",
        "choices": [
          "Uniquement des fichiers vidéo.",
          "La puissance électrique des haut-parleurs.",
          "Le son acoustique brut d’une salle."
        ],
        "why": "MIDI relie et pilote des appareils.",
        "trap": "",
        "evidence": "Approfondissement « MIDI »."
      }
    ],
    "editorialRevision": "beta237-premium-core"
  },
  "lit-enlightenment-critique-encyclopedia": {
    "hook": "Les Lumières ne forment ni un parti unique ni une liste de grands hommes d’accord sur tout. Elles désignent un espace de débats où écrivains, savants, lecteurs et réformateurs utilisent la raison critique pour examiner religion, justice, commerce, pouvoir et droits.",
    "keyFacts": [
      "Montesquieu analyse la séparation et l’équilibre des pouvoirs",
      "Voltaire combat le fanatisme et utilise conte, pamphlet et ironie",
      "Diderot et d’Alembert dirigent l’Encyclopédie",
      "Rousseau critique les inégalités et réfléchit à la souveraineté populaire",
      "Les Lumières défendent l’universel tout en restant traversées par esclavage, colonialisme et exclusions des femmes"
    ],
    "express": [
      "Au XVIIIe siècle, l’imprimé circule davantage dans livres, journaux, brochures et correspondances. Cafés, salons, académies et loges offrent des espaces de discussion, même si l’accès reste socialement limité. Les auteurs écrivent sous censure, utilisent pseudonymes, publications étrangères, fiction et ironie. La littérature devient un moyen de tester des idées sans prendre toujours la forme d’un traité.",
      "Montesquieu compare les régimes et montre que le pouvoir doit être limité par d’autres pouvoirs. Voltaire emploie le conte philosophique pour ridiculiser fanatisme et optimisme abstrait. Diderot organise avec l’Encyclopédie un immense projet de classement des savoirs, qui valorise aussi arts mécaniques et métiers. Rousseau affirme que la souveraineté appartient au peuple, tout en se méfiant d’une civilisation qui produit dépendance et inégalité.",
      "Les Lumières ne sont pas uniformément démocratiques ni anticoloniales. Certains penseurs critiquent l’esclavage, d’autres l’acceptent ou l’abordent de façon ambiguë. Olympe de Gouges et Mary Wollstonecraft révéleront l’écart entre droits universels et exclusion politique des femmes. Lire les Lumières exige donc de tenir ensemble leur puissance critique, leurs conflits internes et leurs limites historiques."
    ],
    "complete": [
      {
        "title": "1. Une nouvelle sphère de discussion",
        "text": "L’alphabétisation progresse inégalement et le marché du livre s’élargit. Bibliothèques, cabinets de lecture et périodiques permettent à davantage de lecteurs de suivre controverses scientifiques ou politiques. Les salons sont souvent animés par des femmes de l’élite, mais cette influence mondaine ne donne pas l’égalité civique. La notion d’opinion publique se développe : gouvernants et auteurs doivent compter avec un jugement collectif difficile à contrôler."
      },
      {
        "title": "2. Montesquieu : comparer pour limiter le pouvoir",
        "text": "Dans L’Esprit des lois, Montesquieu ne propose pas un modèle mécanique valable partout. Il compare institutions, mœurs, climat, histoire et taille des États. Sa réflexion sur la séparation des pouvoirs vise à empêcher la concentration arbitraire. Pouvoir législatif, exécutif et judiciaire doivent se limiter mutuellement. L’idée influencera fortement les constitutions, même si les applications diffèrent de son texte."
      },
      {
        "title": "3. Voltaire : l’arme de l’ironie",
        "text": "Voltaire intervient dans des affaires judiciaires comme celle de Jean Calas et dénonce intolérance et fanatisme. Dans Candide, catastrophes, guerres et esclavage réfutent l’idée que tout est nécessairement pour le mieux. Le conte permet vitesse, contraste et distance comique. Voltaire défend des libertés mais reste favorable à une monarchie réformatrice plutôt qu’à une démocratie égalitaire."
      },
      {
        "title": "4. L’Encyclopédie : organiser et diffuser les savoirs",
        "text": "Publiée sous la direction de Diderot et d’Alembert, l’Encyclopédie rassemble articles, planches et renvois. Elle donne une place remarquable aux techniques, outils et gestes des artisans. Son organisation n’est pas neutre : les renvois peuvent mettre en relation des idées critiques. Interdictions et surveillance ralentissent le projet sans l’arrêter. Des milliers de souscripteurs en font un événement éditorial européen."
      },
      {
        "title": "5. Universalité, souveraineté et contradictions",
        "text": "Rousseau affirme que la loi légitime doit exprimer la volonté générale, mais ses positions sur les femmes restent hiérarchiques. Les débats sur esclavage et empire divisent les auteurs. Des textes de Gouges, Wollstonecraft, Equiano ou des révolutionnaires de Saint-Domingue poussent plus loin l’universalité proclamée. Les Lumières ne sont donc pas un bloc achevé : elles fournissent des armes critiques que d’autres acteurs retournent contre leurs limites."
      }
    ],
    "deeper": [
      {
        "title": "Censure et contournement",
        "text": "Un ouvrage peut être imprimé à Amsterdam ou Genève, circuler clandestinement et être attribué à un faux auteur."
      },
      {
        "title": "Conte philosophique",
        "text": "La fiction simplifie une situation pour tester une idée et rendre visible l’absurdité d’un raisonnement."
      },
      {
        "title": "République des lettres",
        "text": "Les correspondances savantes relient auteurs et lecteurs au-delà des frontières, sans abolir hiérarchies sociales et linguistiques."
      }
    ],
    "takeaways": [
      {
        "label": "Publics",
        "text": "L’imprimé et les lieux de discussion élargissent la circulation des idées."
      },
      {
        "label": "Formes",
        "text": "Conte, article, lettre et dictionnaire deviennent des armes critiques."
      },
      {
        "label": "Pouvoir",
        "text": "Les Lumières interrogent limites, légitimité et souveraineté."
      },
      {
        "label": "Limites",
        "text": "L’universel proclamé reste traversé d’exclusions."
      }
    ],
    "quiz": [
      {
        "kind": "Montesquieu",
        "q": "Quel est l’objectif principal de la séparation des pouvoirs ?",
        "a": "Empêcher qu’un même pouvoir puisse agir arbitrairement sans contrepoids.",
        "choices": [
          "Supprimer toute loi écrite.",
          "Donner toutes les fonctions au monarque.",
          "Remplacer les tribunaux par des salons littéraires."
        ],
        "why": "La liberté politique exige des pouvoirs qui se limitent.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "Voltaire",
        "q": "Pourquoi Voltaire utilise-t-il le conte philosophique ?",
        "a": "Pour critiquer des idées et institutions par récit, contraste et ironie.",
        "choices": [
          "Pour éviter toute référence à la société réelle.",
          "Pour raconter uniquement des légendes médiévales.",
          "Pour prouver que tout est toujours pour le mieux."
        ],
        "why": "La fiction rend la critique mobile et accessible.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "Encyclopédie",
        "q": "Quelle originalité importante possède l’Encyclopédie ?",
        "a": "Elle valorise aussi les techniques, outils et savoirs des métiers.",
        "choices": [
          "Elle interdit toute illustration.",
          "Elle ne contient que des biographies de rois.",
          "Elle est rédigée par un seul auteur en une semaine."
        ],
        "why": "Les planches donnent une dignité nouvelle aux arts mécaniques.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "opinion",
        "q": "Qu’est-ce qui favorise la formation d’une opinion publique au XVIIIe siècle ?",
        "a": "La circulation accrue des imprimés et la multiplication des espaces de discussion.",
        "choices": [
          "La disparition complète de la censure.",
          "La fermeture des cafés et bibliothèques.",
          "L’interdiction de toute correspondance."
        ],
        "why": "Les publics de lecture deviennent un acteur politique.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "limites",
        "q": "Pourquoi ne faut-il pas présenter les Lumières comme un bloc parfaitement universaliste ?",
        "a": "Parce que leurs auteurs divergent et restent souvent marqués par exclusions de sexe, esclavage ou colonialisme.",
        "choices": [
          "Parce qu’aucun auteur ne parle de droits.",
          "Parce que tous refusent la raison.",
          "Parce qu’elles se déroulent uniquement dans l’Antiquité."
        ],
        "why": "D’autres acteurs prolongent et contestent leur universel.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta237-premium-core"
  }
};
  const MYSTERIES = [
  {
    "id": "history-mystery-bandung-237",
    "discipline": "history",
    "difficulty": "moyen",
    "title": "Une conférence sans les anciennes puissances",
    "caseTitle": "Vingt-neuf États veulent parler en leur propre nom",
    "subjectType": "conférence internationale",
    "periodHint": "1955",
    "lessonId": "history-decolonization-india-algeria-bandung",
    "prompt": "Des États d’Asie et d’Afrique se réunissent en Indonésie pour dénoncer colonialisme et racisme sans se ranger automatiquement derrière Washington ou Moscou.",
    "answer": "La conférence de Bandung",
    "aliases": [
      "conférence de Bandung",
      "Bandung",
      "la conférence de Bandung",
      "conference de Bandung"
    ],
    "clues": [
      "Elle se déroule en Indonésie.",
      "Elle prépare l’affirmation du non-alignement.",
      "Elle réunit vingt-neuf États en 1955."
    ],
    "explanation": "Bandung rend visible une voix afro-asiatique autonome dans l’ordre mondial.",
    "blockedGuesses": [
      "non-alignés",
      "décolonisation",
      "ONU"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "history-mystery-ceca-237",
    "discipline": "history",
    "difficulty": "moyen",
    "title": "Mettre en commun deux ressources stratégiques",
    "caseTitle": "Une coopération concrète pour rendre la guerre plus difficile",
    "subjectType": "organisation européenne",
    "periodHint": "1951",
    "lessonId": "history-european-integration-coal-eu",
    "prompt": "Six États placent sous une autorité commune deux productions indispensables à l’industrie et aux armements.",
    "answer": "La CECA",
    "aliases": [
      "CECA",
      "la CECA",
      "Communauté européenne du charbon et de l’acier",
      "Communaute europeenne du charbon et de l acier"
    ],
    "clues": [
      "Elle associe notamment France et Allemagne de l’Ouest.",
      "Elle précède la CEE.",
      "Son nom contient charbon et acier."
    ],
    "explanation": "La CECA est la première communauté européenne sectorielle créée en 1951.",
    "blockedGuesses": [
      "CEE",
      "Union européenne",
      "traités de Rome"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "art-mystery-automatic-writing-237",
    "discipline": "art",
    "difficulty": "moyen",
    "title": "Écrire avant de censurer",
    "caseTitle": "Les associations surgissent sans plan préalable",
    "subjectType": "procédé surréaliste",
    "periodHint": "Années 1920",
    "lessonId": "art-surrealism-dream-automatism-image",
    "prompt": "Une pratique demande de laisser venir mots et images sans les soumettre immédiatement au contrôle logique ou esthétique.",
    "answer": "L’écriture automatique",
    "aliases": [
      "écriture automatique",
      "l’écriture automatique",
      "ecriture automatique",
      "automatisme psychique"
    ],
    "clues": [
      "Breton la place au cœur du premier manifeste.",
      "Elle cherche à contourner le contrôle conscient.",
      "Elle n’interdit pas forcément toute révision ultérieure."
    ],
    "explanation": "L’écriture automatique est un dispositif surréaliste destiné à libérer les associations.",
    "blockedGuesses": [
      "cadavre exquis",
      "inconscient",
      "surréalisme"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "cinema-mystery-offscreen-sound-237",
    "discipline": "cinema",
    "difficulty": "facile",
    "title": "Une présence que l’image ne montre pas",
    "caseTitle": "L’espace continue au-delà du cadre",
    "subjectType": "notion sonore",
    "periodHint": "Cinéma parlant",
    "lessonId": "cinema-sound-voice-microphone-musical",
    "prompt": "Une voix, un bruit ou une action est audible alors que sa source reste hors de l’image, créant un espace invisible.",
    "answer": "Le son hors champ",
    "aliases": [
      "son hors champ",
      "le son hors champ",
      "hors-champ sonore",
      "son off"
    ],
    "clues": [
      "Il élargit l’espace du plan.",
      "Il peut créer suspense ou information.",
      "Sa source n’est pas visible dans le cadre."
    ],
    "explanation": "Le son hors champ fait exister une source située en dehors de l’image.",
    "blockedGuesses": [
      "voix off",
      "musique",
      "silence"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "science-mystery-time-dilation-237",
    "discipline": "science-inventions",
    "difficulty": "moyen",
    "title": "Deux horloges ne cumulent pas la même durée",
    "caseTitle": "La vitesse modifie le temps mesuré",
    "subjectType": "effet relativiste",
    "periodHint": "Relativité restreinte",
    "lessonId": "sci-relativity-spacetime-gravity",
    "prompt": "Une horloge en mouvement rapide par rapport à un observateur accumule moins de temps entre deux rencontres.",
    "answer": "La dilatation du temps",
    "aliases": [
      "dilatation du temps",
      "la dilatation du temps",
      "dilatation temporelle"
    ],
    "clues": [
      "Elle est mesurée avec des particules et des horloges.",
      "Elle augmente avec la vitesse relative.",
      "Elle ne signifie pas que l’horloge fonctionne mal."
    ],
    "explanation": "La dilatation du temps est une conséquence mesurable de la relativité restreinte.",
    "blockedGuesses": [
      "relativité générale",
      "contraction des longueurs",
      "simultanéité"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "science-mystery-atomic-number-237",
    "discipline": "science-inventions",
    "difficulty": "facile",
    "title": "L’identité d’un élément tient à un entier",
    "caseTitle": "Changer cette valeur, c’est changer d’élément",
    "subjectType": "notion atomique",
    "periodHint": "Tableau périodique",
    "lessonId": "sci-periodic-table-mendeleev-elements",
    "prompt": "Cette grandeur correspond au nombre de protons dans le noyau et fixe la place moderne d’un élément dans le tableau.",
    "answer": "Le numéro atomique",
    "aliases": [
      "numéro atomique",
      "le numéro atomique",
      "numero atomique",
      "Z"
    ],
    "clues": [
      "On le note souvent Z.",
      "Il est identique pour tous les isotopes d’un même élément.",
      "Moseley l’établit comme principe d’ordre."
    ],
    "explanation": "Le numéro atomique définit l’élément par sa charge nucléaire.",
    "blockedGuesses": [
      "masse atomique",
      "nombre de neutrons",
      "valence"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "astronomy-mystery-solstice-237",
    "discipline": "astronomy",
    "difficulty": "facile",
    "title": "Le jour atteint son extrême",
    "caseTitle": "Le Soleil cesse de monter avant de repartir",
    "subjectType": "repère astronomique",
    "periodHint": "Deux fois par an",
    "lessonId": "astro-seasons-tilt-solstice-equinox",
    "prompt": "Dans un hémisphère, cette date correspond au jour le plus long ou au plus court de l’année, lorsque la déclinaison solaire atteint un maximum.",
    "answer": "Le solstice",
    "aliases": [
      "solstice",
      "le solstice",
      "solstice d’été",
      "solstice d’hiver"
    ],
    "clues": [
      "Il existe en juin et en décembre.",
      "Il ne correspond pas nécessairement au jour le plus chaud ou froid.",
      "Le mot évoque un Soleil qui semble s’arrêter."
    ],
    "explanation": "Le solstice marque un extrême annuel de déclinaison du Soleil et de durée du jour.",
    "blockedGuesses": [
      "équinoxe",
      "périhélie",
      "saison"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "economy-mystery-gini-237",
    "discipline": "economy",
    "difficulty": "moyen",
    "title": "Un nombre résume la concentration",
    "caseTitle": "Zéro approche l’égalité parfaite",
    "subjectType": "indicateur statistique",
    "periodHint": "Mesure des inégalités",
    "lessonId": "eco-inequality-income-wealth-redistribution",
    "prompt": "Cet indicateur synthétise l’écart entre une distribution observée et une égalité parfaite à partir de la courbe de Lorenz.",
    "answer": "Le coefficient de Gini",
    "aliases": [
      "coefficient de Gini",
      "le coefficient de Gini",
      "indice de Gini",
      "Gini"
    ],
    "clues": [
      "Il est compris entre 0 et 1 dans sa forme standard.",
      "Il ne décrit pas précisément où se situent les écarts.",
      "Il peut concerner revenu ou patrimoine."
    ],
    "explanation": "Le coefficient de Gini mesure la concentration globale d’une distribution.",
    "blockedGuesses": [
      "revenu médian",
      "décile",
      "taux de pauvreté"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "geography-mystery-demographic-inertia-237",
    "discipline": "geography",
    "difficulty": "moyen",
    "title": "La croissance continue malgré moins d’enfants",
    "caseTitle": "Une population jeune porte son propre élan",
    "subjectType": "notion démographique",
    "periodHint": "Transition démographique",
    "lessonId": "geo-demographic-transition-fertility-aging",
    "prompt": "Même après une forte baisse de la fécondité, une population continue de croître parce que de très nombreuses personnes entrent dans les âges de procréation.",
    "answer": "L’inertie démographique",
    "aliases": [
      "inertie démographique",
      "l’inertie démographique",
      "elan démographique",
      "élan démographique"
    ],
    "clues": [
      "Elle dépend de la structure par âge.",
      "Elle peut durer plusieurs décennies.",
      "Elle n’implique pas que la fécondité reste élevée."
    ],
    "explanation": "L’inertie démographique prolonge la croissance d’une population très jeune.",
    "blockedGuesses": [
      "transition démographique",
      "baby-boom",
      "solde migratoire"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "geography-mystery-hydrogen-vector-237",
    "discipline": "geography",
    "difficulty": "moyen",
    "title": "Il transporte de l’énergie sans être une source primaire",
    "caseTitle": "Sa couleur dépend de la manière dont on le produit",
    "subjectType": "vecteur énergétique",
    "periodHint": "Transition énergétique",
    "lessonId": "geo-energy-transition-networks-minerals",
    "prompt": "Ce gaz peut stocker et transporter de l’énergie, mais il faut d’abord le produire avec de l’électricité ou des combustibles.",
    "answer": "L’hydrogène",
    "aliases": [
      "hydrogène",
      "l’hydrogène",
      "hydrogene",
      "H2"
    ],
    "clues": [
      "Il peut servir dans certains procédés industriels.",
      "Son bilan dépend de l’énergie utilisée pour le fabriquer.",
      "Il n’est pas extrait comme une source abondante prête à l’emploi."
    ],
    "explanation": "L’hydrogène est surtout un vecteur énergétique dont l’intérêt dépend de sa production et de ses usages.",
    "blockedGuesses": [
      "électricité",
      "gaz naturel",
      "batterie"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "music-mystery-midi-237",
    "discipline": "music",
    "difficulty": "facile",
    "title": "Des instructions circulent entre les machines",
    "caseTitle": "La note voyage, pas le son",
    "subjectType": "protocole musical",
    "periodHint": "Depuis les années 1980",
    "lessonId": "music-electronic-tape-synth-house-techno",
    "prompt": "Un protocole transmet hauteur, durée, vélocité et contrôles entre clavier, séquenceur et synthétiseur sans transporter directement l’audio.",
    "answer": "Le MIDI",
    "aliases": [
      "MIDI",
      "le MIDI",
      "Musical Instrument Digital Interface"
    ],
    "clues": [
      "Il apparaît au début des années 1980.",
      "Il permet à des appareils de fabricants différents de communiquer.",
      "Un même message peut déclencher des sons très différents."
    ],
    "explanation": "MIDI transmet des commandes musicales standardisées, pas un enregistrement sonore.",
    "blockedGuesses": [
      "synthétiseur",
      "échantillonneur",
      "MP3"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "literature-mystery-encyclopedia-237",
    "discipline": "literature",
    "difficulty": "facile",
    "title": "Classer le savoir pour déplacer l’autorité",
    "caseTitle": "Articles, planches et renvois forment une œuvre collective",
    "subjectType": "ouvrage des Lumières",
    "periodHint": "XVIIIe siècle",
    "lessonId": "lit-enlightenment-critique-encyclopedia",
    "prompt": "Dirigé par Diderot et d’Alembert, cet immense ouvrage rassemble savoirs, techniques et métiers tout en contournant la censure.",
    "answer": "L’Encyclopédie",
    "aliases": [
      "Encyclopédie",
      "l’Encyclopédie",
      "Encyclopedie",
      "Encyclopédie de Diderot et d’Alembert"
    ],
    "clues": [
      "Elle paraît en volumes de texte et de planches.",
      "Elle valorise les arts mécaniques.",
      "Ses renvois peuvent porter une critique implicite."
    ],
    "explanation": "L’Encyclopédie est un grand projet éditorial des Lumières qui organise et diffuse les savoirs.",
    "blockedGuesses": [
      "Dictionnaire philosophique",
      "Candide",
      "Esprit des lois"
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
    groups:Object.values(GROUPS).flat().length,
    mysteries:MYSTERIES.length,
    quality,
    ok:Object.keys(PACKS).length === 12 && Object.values(quality).every(item => item.pass)
  };
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version:VERSION, premium237:audit }; } catch {}
  if (!audit.ok) try { console.warn("HistoDaily beta237 premium content audit", audit); } catch {}
  try { if (typeof renderSoon === "function") renderSoon(); } catch {}
})();
