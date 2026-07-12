/* HistoDaily beta 235 — extension éditoriale premium multi-disciplines. */
(function histodailyBeta233PremiumContent(){
  "use strict";
  const VERSION = "1.0.0-beta.245.0";
  const GROUPS = {
  "history": [
    {
      "id": "early-modern-worlds",
      "title": "5. Mondes modernes et premiers empires globaux",
      "range": "1450 → 1763",
      "description": "Imprimerie, réformes religieuses, empires ottoman, moghol et Qing, expansion atlantique et esclavage."
    }
  ],
  "cinema": [
    {
      "id": "cinema-realities",
      "title": "6. Filmer le réel",
      "range": "1920 → aujourd’hui",
      "description": "Documentaire, archives, enquête, mise en scène du réel et responsabilité du cinéaste."
    }
  ],
  "literature": [
    {
      "id": "lit-world-stages",
      "title": "6. Scènes et voix du monde",
      "range": "XVIe → XXIe siècle",
      "description": "Shakespeare, circulations mondiales, réalismes magiques et littératures postcoloniales."
    }
  ]
};
  const WORLDS = {
  "history": [
    {
      "id": "early-modern-reformations",
      "title": "Réformes et cultures de l’imprimé",
      "emoji": "🖨️",
      "subtitle": "Foi, pamphlets et nouveaux pouvoirs",
      "timeframe": "1450 → 1648",
      "accent": "#f59e0b",
      "group": "early-modern-worlds",
      "sortStart": 1450,
      "sortEnd": 1648,
      "unlockedByDefault": false
    },
    {
      "id": "early-modern-empires",
      "title": "Empires ottoman, moghol et Qing",
      "emoji": "👑",
      "subtitle": "Gouverner des mondes immenses et pluriels",
      "timeframe": "XVIe → XVIIIe siècle",
      "accent": "#a78bfa",
      "group": "early-modern-worlds",
      "sortStart": 1500,
      "sortEnd": 1800,
      "unlockedByDefault": false
    },
    {
      "id": "atlantic-empires-slavery",
      "title": "Atlantique, plantations et esclavage",
      "emoji": "🌊",
      "subtitle": "Commerce, violence et résistances",
      "timeframe": "XVe → XIXe siècle",
      "accent": "#0ea5e9",
      "group": "early-modern-worlds",
      "sortStart": 1500,
      "sortEnd": 1888,
      "unlockedByDefault": false
    }
  ],
  "art": [
    {
      "id": "art-photography",
      "title": "Photographie et nouveaux regards",
      "emoji": "📷",
      "subtitle": "Preuve, cadrage, reproduction",
      "timeframe": "1839 → aujourd’hui",
      "accent": "#38bdf8",
      "group": "art-modern",
      "sortStart": 32,
      "discipline": "art",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "cinema": [
    {
      "id": "cinema-documentary",
      "title": "Documentaire et vérité",
      "emoji": "🎙️",
      "subtitle": "Filmer, monter, témoigner",
      "timeframe": "1920 → aujourd’hui",
      "accent": "#14b8a6",
      "group": "cinema-realities",
      "sortStart": 50,
      "discipline": "cinema",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "science-inventions": [
    {
      "id": "sci-genetics",
      "title": "Génétique et ADN",
      "emoji": "🧬",
      "subtitle": "Hérédité, chromosomes, molécules",
      "timeframe": "1865 → aujourd’hui",
      "accent": "#22c55e",
      "group": "sci-earth-life",
      "sortStart": 12,
      "discipline": "science-inventions",
      "planned": true,
      "unlockedByDefault": false
    },
    {
      "id": "sci-thermodynamics",
      "title": "Énergie et thermodynamique",
      "emoji": "♨️",
      "subtitle": "Machines, chaleur, rendement",
      "timeframe": "XVIIIe → XXe siècle",
      "accent": "#f97316",
      "group": "sci-energy-matter",
      "sortStart": 22,
      "discipline": "science-inventions",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "astronomy": [
    {
      "id": "astro-relativity-blackholes",
      "title": "Relativité et trous noirs",
      "emoji": "⚫",
      "subtitle": "Espace-temps, horizons, détection",
      "timeframe": "1915 → aujourd’hui",
      "accent": "#8b5cf6",
      "group": "astro-stars",
      "sortStart": 12,
      "discipline": "astronomy",
      "planned": true,
      "unlockedByDefault": false
    },
    {
      "id": "astro-galaxies-web",
      "title": "Galaxies et toile cosmique",
      "emoji": "🌌",
      "subtitle": "Voie lactée, amas, matière noire",
      "timeframe": "Univers actuel",
      "accent": "#6366f1",
      "group": "astro-foundations",
      "sortStart": 3,
      "discipline": "astronomy",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "economy": [
    {
      "id": "eco-trade-advantages",
      "title": "Commerce et avantages comparatifs",
      "emoji": "🚢",
      "subtitle": "Spécialisation, échanges, gagnants et perdants",
      "timeframe": "XIXe → XXIe siècle",
      "accent": "#14b8a6",
      "group": "eco-global",
      "sortStart": 41,
      "discipline": "economy",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "geography": [
    {
      "id": "geo-oceans-cables",
      "title": "Océans, ports et câbles",
      "emoji": "🌐",
      "subtitle": "Routes maritimes et infrastructures invisibles",
      "timeframe": "Monde contemporain",
      "accent": "#06b6d4",
      "group": "geo-power",
      "sortStart": 31,
      "discipline": "geography",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "music": [
    {
      "id": "music-recording-industry",
      "title": "Enregistrement et industrie musicale",
      "emoji": "🎚️",
      "subtitle": "Disque, studio, formats et écoute",
      "timeframe": "1877 → aujourd’hui",
      "accent": "#ec4899",
      "group": "music-modern-recording",
      "sortStart": 42,
      "discipline": "music",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "literature": [
    {
      "id": "lit-shakespeare-world",
      "title": "Shakespeare et la scène élisabéthaine",
      "emoji": "🎭",
      "subtitle": "Théâtre public, vers, pouvoir et ambiguïté",
      "timeframe": "Fin du XVIe → début du XVIIe siècle",
      "accent": "#eab308",
      "group": "lit-world-stages",
      "sortStart": 50,
      "discipline": "literature",
      "planned": true,
      "unlockedByDefault": false
    },
    {
      "id": "lit-magical-realism-world",
      "title": "Réalisme magique et littératures du monde",
      "emoji": "🦋",
      "subtitle": "Histoire, mémoire et merveilleux quotidien",
      "timeframe": "XXe → XXIe siècle",
      "accent": "#f97316",
      "group": "lit-world-stages",
      "sortStart": 51,
      "discipline": "literature",
      "planned": true,
      "unlockedByDefault": false
    }
  ]
};
  const LESSONS = {
  "early-modern-reformations": [
    {
      "id": "history-reformations-print-culture",
      "title": "Réformes religieuses et imprimerie : pourquoi l’Europe se fracture",
      "period": "1450 → 1648",
      "location": "Europe",
      "emoji": "📜",
      "xp": 75,
      "order": 1
    }
  ],
  "early-modern-empires": [
    {
      "id": "history-early-modern-empires-comparison",
      "title": "Ottomans, Moghols et Qing : trois empires à comparer",
      "period": "XVIe → XVIIIe siècle",
      "location": "Eurasie",
      "emoji": "👑",
      "xp": 75,
      "order": 1
    }
  ],
  "atlantic-empires-slavery": [
    {
      "id": "history-atlantic-slavery-plantations",
      "title": "L’Atlantique des plantations, de l’esclavage et des résistances",
      "period": "XVe → XIXe siècle",
      "location": "Afrique, Europe et Amériques",
      "emoji": "⛓️",
      "xp": 80,
      "order": 1
    }
  ],
  "art-photography": [
    {
      "id": "art-photography-new-vision",
      "title": "La photographie : preuve, art ou construction du regard ?",
      "period": "1839 → aujourd’hui",
      "location": "Europe puis monde",
      "emoji": "📷",
      "xp": 70,
      "order": 1
    }
  ],
  "cinema-documentary": [
    {
      "id": "cinema-documentary-truth",
      "title": "Le documentaire dit-il la vérité ?",
      "period": "1920 → aujourd’hui",
      "location": "Cinémas du monde",
      "emoji": "🎙️",
      "xp": 70,
      "order": 1
    }
  ],
  "sci-genetics": [
    {
      "id": "sci-genetics-dna-history",
      "title": "De Mendel à l’ADN : comment l’hérédité devient moléculaire",
      "period": "1865 → 1953 et après",
      "location": "Europe et États-Unis",
      "emoji": "🧬",
      "xp": 75,
      "order": 1
    }
  ],
  "sci-thermodynamics": [
    {
      "id": "sci-thermodynamics-energy",
      "title": "Thermodynamique : ce que les machines à vapeur ont appris à la physique",
      "period": "XVIIIe → XIXe siècle",
      "location": "Europe industrielle",
      "emoji": "♨️",
      "xp": 75,
      "order": 1
    }
  ],
  "astro-relativity-blackholes": [
    {
      "id": "astro-black-holes-relativity",
      "title": "Trous noirs : de la relativité aux images d’horizon",
      "period": "1915 → aujourd’hui",
      "location": "Univers",
      "emoji": "⚫",
      "xp": 80,
      "order": 1
    }
  ],
  "astro-galaxies-web": [
    {
      "id": "astro-galaxies-cosmic-web",
      "title": "Galaxies, amas et toile cosmique",
      "period": "Univers actuel",
      "location": "Univers observable",
      "emoji": "🌌",
      "xp": 75,
      "order": 1
    }
  ],
  "eco-trade-advantages": [
    {
      "id": "eco-comparative-advantage-trade",
      "title": "Pourquoi des pays différents ont intérêt à échanger",
      "period": "XIXe → XXIe siècle",
      "location": "Économie mondiale",
      "emoji": "🚢",
      "xp": 70,
      "order": 1
    }
  ],
  "geo-oceans-cables": [
    {
      "id": "geo-oceans-cables-maritime-power",
      "title": "Les océans : routes, détroits et câbles du monde connecté",
      "period": "Monde contemporain",
      "location": "Océans mondiaux",
      "emoji": "🌐",
      "xp": 70,
      "order": 1
    }
  ],
  "music-recording-industry": [
    {
      "id": "music-recording-studio-industry",
      "title": "Du phonographe au streaming : quand l’enregistrement change la musique",
      "period": "1877 → aujourd’hui",
      "location": "Monde",
      "emoji": "🎚️",
      "xp": 70,
      "order": 1
    }
  ],
  "lit-shakespeare-world": [
    {
      "id": "lit-shakespeare-stage-language",
      "title": "Shakespeare : une scène, une langue et des pouvoirs en mouvement",
      "period": "Vers 1590 → 1613",
      "location": "Angleterre",
      "emoji": "🎭",
      "xp": 75,
      "order": 1
    }
  ],
  "lit-magical-realism-world": [
    {
      "id": "lit-magical-realism-memory",
      "title": "Réalisme magique : raconter l’histoire avec le merveilleux quotidien",
      "period": "XXe → XXIe siècle",
      "location": "Amériques et littératures du monde",
      "emoji": "🦋",
      "xp": 75,
      "order": 1
    }
  ]
};
  const PACKS = {
  "history-reformations-print-culture": {
    "hook": "En 1517, une controverse universitaire sur les indulgences devient une crise européenne. Le geste de Luther compte, mais l’explosion ne s’explique ni par un homme seul ni par une feuille miraculeusement placardée : elle naît de réseaux d’imprimeurs, de princes, de prédicateurs et de fidèles déjà traversés par des attentes de réforme.",
    "keyFacts": [
      "1517 : les quatre-vingt-quinze thèses de Martin Luther",
      "L’imprimé accélère la circulation sans déterminer le sens des textes",
      "Plusieurs Réformes : luthérienne, réformée, anglicane et mouvements radicaux",
      "Réforme catholique : concile de Trente, ordres nouveaux et discipline",
      "Les divisions religieuses deviennent aussi des problèmes politiques"
    ],
    "express": [
      "À la fin du Moyen Âge, critiques du clergé, attentes spirituelles et débats sur l’autorité de l’Église existent déjà. Luther conteste notamment la prédication des indulgences et affirme que le salut ne s’achète pas. Ses thèses de 1517 déclenchent une controverse parce qu’elles touchent à la pénitence, au pouvoir pontifical et au financement de l’Église.",
      "L’imprimerie permet aux sermons, traductions de la Bible, images satiriques et pamphlets de circuler rapidement en latin et dans les langues vernaculaires. Elle ne crée pas automatiquement la Réforme : les villes, les autorités politiques et les publics choisissent ce qu’ils impriment, interdisent ou soutiennent.",
      "L’Europe ne se divise pas simplement entre Luther et Rome. Calvin organise une autre tradition réformée ; la monarchie anglaise rompt avec Rome pour des raisons dynastiques et politiques ; des groupes radicaux contestent le baptême des enfants ou le lien entre Église et pouvoir. Le concile de Trente répond par une réforme doctrinale, pastorale et disciplinaire du catholicisme."
    ],
    "complete": [
      {
        "title": "1. Avant Luther, une Église déjà discutée",
        "text": "Les critiques des abus, de la richesse ecclésiastique ou de la formation du clergé ne commencent pas en 1517. Jan Hus, les humanistes chrétiens et de nombreux prédicateurs demandent déjà des réformes. Ce contexte explique pourquoi la dispute sur les indulgences trouve un public. Il évite aussi le récit trop simple d’une Europe religieusement immobile brutalement réveillée par un seul homme."
      },
      {
        "title": "2. Imprimer ne signifie pas convaincre",
        "text": "Les ateliers produisent des éditions concurrentes, des images, des chansons et des traductions. Les textes courts et polémiques se vendent bien, mais leur réception varie selon les villes, les censures et les alliances politiques. Un pamphlet peut instruire, mobiliser ou caricaturer. L’imprimé multiplie les possibilités de conflit autant que celles d’apprentissage."
      },
      {
        "title": "3. Des théologies et des institutions différentes",
        "text": "Luther insiste sur la justification par la foi et l’autorité de l’Écriture. Les réformés développent d’autres formes d’organisation ecclésiale et de discipline. En Angleterre, le souverain devient chef de l’Église nationale. Les différences portent sur les sacrements, la liturgie, l’autorité et le rapport au pouvoir : il n’existe donc pas une Réforme protestante unique."
      },
      {
        "title": "4. La Réforme catholique",
        "text": "Le concile de Trente, réuni entre 1545 et 1563, précise la doctrine catholique et renforce la formation des prêtres. Les jésuites développent écoles et missions ; les évêques sont davantage appelés à résider dans leur diocèse. La réaction catholique n’est pas seulement répression : elle produit aussi une profonde réorganisation religieuse et culturelle."
      },
      {
        "title": "5. Quand la foi redessine la politique",
        "text": "Les princes et les monarchies utilisent parfois la réforme pour contrôler les biens ecclésiastiques ou renforcer leur autorité, mais ils ne maîtrisent pas toujours les mobilisations. Les guerres de Religion et la guerre de Trente Ans montrent l’entrecroisement du religieux, du dynastique et du territorial. Les paix ne créent pas immédiatement la tolérance moderne ; elles organisent d’abord une coexistence fragile."
      }
    ],
    "deeper": [
      {
        "title": "Le mythe de l’affiche",
        "text": "La scène de Luther clouant ses thèses à une porte est célèbre, mais la diffusion imprimée et les réseaux universitaires sont plus sûrs que le détail théâtral."
      },
      {
        "title": "Langue et pouvoir",
        "text": "Traduire la Bible élargit les lecteurs potentiels, mais donne aussi aux autorités de nouveaux moyens de normaliser langue, catéchisme et pratiques."
      },
      {
        "title": "Confessionnalisation",
        "text": "Les historiens utilisent ce terme pour étudier comment États et Églises encadrent croyances, école, mariage et comportements."
      }
    ],
    "takeaways": [
      {
        "label": "1517",
        "text": "Un repère de départ, non une cause unique."
      },
      {
        "label": "Imprimé",
        "text": "Un accélérateur soumis à des choix politiques et commerciaux."
      },
      {
        "label": "Pluralité",
        "text": "Plusieurs protestantismes et une réforme catholique."
      },
      {
        "label": "Politique",
        "text": "Les conflits religieux transforment aussi les États."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "Pourquoi 1517 est-il un repère important ?",
        "a": "Luther rend publique une critique des indulgences qui ouvre une controverse majeure.",
        "choices": [
          "Le concile de Trente interdit alors toute impression.",
          "L’Angleterre adopte ce jour-là l’anglicanisme.",
          "La guerre de Trente Ans commence immédiatement."
        ],
        "why": "Le repère lance une crise, sans résumer toutes ses causes.",
        "trap": "",
        "evidence": "Express 1."
      },
      {
        "kind": "média",
        "q": "Quel rôle joue l’imprimerie ?",
        "a": "Elle accélère et diversifie la circulation des textes, images et traductions.",
        "choices": [
          "Elle impose partout la doctrine luthérienne.",
          "Elle remplace immédiatement la prédication orale.",
          "Elle rend les autorités incapables de censurer."
        ],
        "why": "Le média amplifie la circulation mais ne décide pas seul de la réception.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "pluralité",
        "q": "Pourquoi parler de plusieurs Réformes ?",
        "a": "Parce que luthériens, réformés, anglicans et groupes radicaux divergent sur doctrine et organisation.",
        "choices": [
          "Parce que chaque imprimeur invente sa propre religion.",
          "Parce que le catholicisme disparaît dans le Nord de l’Europe.",
          "Parce que les divergences portent seulement sur la langue des Bibles."
        ],
        "why": "Les ruptures sont institutionnelles et théologiques.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "réponse",
        "q": "Que fait le concile de Trente ?",
        "a": "Il précise la doctrine catholique et renforce la réforme du clergé et de la discipline.",
        "choices": [
          "Il accepte la justification par la foi seule.",
          "Il abolit les ordres religieux.",
          "Il place toutes les Églises sous l’autorité des princes."
        ],
        "why": "La réponse catholique combine clarification et réforme.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "synthèse",
        "q": "Pourquoi les guerres ne sont-elles pas purement religieuses ?",
        "a": "Les conflits mêlent croyances, dynasties, territoires et construction des États.",
        "choices": [
          "Les acteurs ne croient jamais vraiment à leur religion.",
          "Les doctrines n’ont aucun rôle dans les mobilisations.",
          "Toutes les guerres opposent exactement les mêmes alliances."
        ],
        "why": "Les causes s’entrecroisent sans annuler la force des convictions.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta233-premium"
  },
  "history-early-modern-empires-comparison": {
    "hook": "Au XVIIe siècle, l’Europe n’est pas le centre incontesté du monde. Les empires ottoman, moghol et Qing gouvernent des populations immenses, contrôlent des routes commerciales majeures et développent des solutions différentes pour lever l’impôt, organiser l’armée et administrer la diversité.",
    "keyFacts": [
      "Ottomans : empire méditerranéen, balkanique et proche-oriental",
      "Moghols : empire de l’Inde du Nord fondé en 1526",
      "Qing : dynastie mandchoue au pouvoir en Chine à partir de 1644",
      "Les trois empires gouvernent des populations linguistiquement et religieusement diverses",
      "Comparer évite de classer les sociétés sur une seule trajectoire européenne"
    ],
    "express": [
      "Les Ottomans prennent Constantinople en 1453 et construisent un empire qui relie Balkans, Anatolie, Méditerranée orientale et provinces arabes. Leur pouvoir s’appuie sur la maison dynastique, l’armée, une fiscalité négociée et des élites provinciales. L’empire n’est pas un bloc uniforme : ses institutions changent selon les régions et les siècles.",
      "En Inde, Babur fonde l’Empire moghol en 1526. Akbar étend le territoire, associe des élites diverses au pouvoir et cherche des formes de coexistence religieuse. Sous les Qing, conquérants mandchous installés à Pékin en 1644, la Chine s’agrandit fortement et combine institutions chinoises, identité mandchoue et gouvernement de vastes frontières.",
      "Ces empires utilisent poudre à canon, fortifications, cavaleries, bureaucraties et cultures de cour, mais aucun modèle n’explique tout. Leur puissance dépend aussi des récoltes, du crédit, des négociations locales et des échanges internationaux. Les comparer montre une première modernité plurielle, bien loin du récit d’un Orient immobile."
    ],
    "complete": [
      {
        "title": "1. L’empire comme relation, pas seulement comme carte",
        "text": "Un empire rassemble des territoires et des groupes différents sous une autorité inégale. Le centre ne contrôle pas chaque village de la même manière. Gouverneurs, notables, militaires, communautés religieuses et collecteurs d’impôts négocient en permanence. La stabilité vient souvent d’arrangements locaux plutôt que d’une administration parfaitement uniforme."
      },
      {
        "title": "2. Les Ottomans et la Méditerranée",
        "text": "Le sultan gouverne avec un appareil impérial installé à Istanbul. Les janissaires, les administrateurs et les réseaux provinciaux jouent des rôles variables au fil du temps. Les communautés non musulmanes disposent de cadres religieux et juridiques propres, sans bénéficier d’une égalité moderne. La capitale, les ports et les routes caravanières relient l’empire à l’Europe, à l’Afrique et à l’Asie."
      },
      {
        "title": "3. Les Moghols et l’art de coalition",
        "text": "Akbar s’appuie sur des nobles musulmans, des princes rajputs et une administration fiscale perfectionnée. La cour utilise le persan, finance architecture et peinture, et met en scène la souveraineté. Les politiques religieuses changent selon les règnes : réduire l’empire à une tolérance constante ou à un conflit permanent efface ces variations."
      },
      {
        "title": "4. Les Qing, un empire mandchou et chinois",
        "text": "Les Qing conservent de nombreuses institutions impériales chinoises tout en protégeant une identité mandchoue et des structures militaires propres. Leur expansion vers l’Asie intérieure transforme l’échelle de l’empire. Le gouvernement adapte ses pratiques selon les régions et les populations, de la bureaucratie des provinces chinoises aux dispositifs de frontière."
      },
      {
        "title": "5. Pourquoi les comparer",
        "text": "Les trois empires mobilisent armées, fiscalité, croyances, cérémonies et savoirs administratifs. Pourtant, leurs géographies, successions et rapports aux élites diffèrent. La comparaison ne cherche pas un vainqueur : elle montre plusieurs manières de construire un État puissant avant l’industrialisation européenne et explique pourquoi le monde moderne ne naît pas d’une seule région."
      }
    ],
    "deeper": [
      {
        "title": "Poudre à canon",
        "text": "Elle compte pour les sièges et les armées, mais ne suffit pas à créer un empire durable sans fiscalité ni alliances."
      },
      {
        "title": "Tolérance",
        "text": "Le mot moderne peut tromper : coexistence et hiérarchie peuvent fonctionner ensemble."
      },
      {
        "title": "Déclin",
        "text": "Parler d’un long déclin automatique après un âge d’or empêche de voir les réformes et les recompositions."
      }
    ],
    "takeaways": [
      {
        "label": "Ottomans",
        "text": "Un empire méditerranéen et proche-oriental durable."
      },
      {
        "label": "Moghols",
        "text": "Un pouvoir de coalition et de cour en Asie du Sud."
      },
      {
        "label": "Qing",
        "text": "Une dynastie mandchoue gouvernant un vaste empire chinois."
      },
      {
        "label": "Comparaison",
        "text": "Plusieurs modernités politiques coexistent."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "Quand les Qing prennent-ils le pouvoir à Pékin ?",
        "a": "En 1644.",
        "choices": [
          "En 1453.",
          "En 1526.",
          "En 1789."
        ],
        "why": "Ce repère distingue la chronologie Qing des conquêtes ottomane et moghole.",
        "trap": "",
        "evidence": "Express 2."
      },
      {
        "kind": "méthode",
        "q": "Pourquoi l’empire ne se réduit-il pas à une carte colorée ?",
        "a": "Parce que le pouvoir repose sur des relations inégales et négociées entre centre, provinces et groupes locaux.",
        "choices": [
          "Parce que les frontières n’existent jamais.",
          "Parce que le souverain ne possède aucune armée.",
          "Parce que toutes les provinces sont indépendantes."
        ],
        "why": "L’administration réelle varie selon les territoires.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "acteur",
        "q": "Quelle politique est associée à Akbar ?",
        "a": "L’intégration d’élites diverses et la recherche de formes de coexistence religieuse.",
        "choices": [
          "L’expulsion de tous les princes rajputs.",
          "L’abolition de la fiscalité agricole.",
          "La fermeture totale aux cultures persanes."
        ],
        "why": "Akbar gouverne par coalition et adaptation.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi qualifier les Qing de dynastie seulement chinoise est-il incomplet ?",
        "a": "Ils sont d’origine mandchoue et gouvernent aussi de vastes territoires d’Asie intérieure.",
        "choices": [
          "Ils règnent uniquement sur la Mandchourie.",
          "Ils refusent toute institution chinoise.",
          "Ils sont une dynastie ottomane installée à Pékin."
        ],
        "why": "Leur pouvoir combine plusieurs traditions politiques.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "synthèse",
        "q": "Quel est l’intérêt principal de la comparaison ?",
        "a": "Montrer plusieurs formes d’État puissant et de modernité avant l’industrialisation européenne.",
        "choices": [
          "Prouver que les trois empires sont institutionnellement identiques.",
          "Désigner lequel est le plus civilisé.",
          "Montrer que le commerce mondial est alors inexistant."
        ],
        "why": "Comparer éclaire les différences sans construire un classement simpliste.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta233-premium"
  },
  "history-atlantic-slavery-plantations": {
    "hook": "Le sucre qui adoucit les tables européennes repose sur une violence extrême. Du XVe au XIXe siècle, l’Atlantique devient un espace de conquête, de plantations, de traite esclavagiste et de résistances, où les profits circulent avec des êtres humains réduits en marchandises.",
    "keyFacts": [
      "La plantation associe monoculture d’exportation, capital et travail contraint",
      "La traite transatlantique déporte des millions d’Africains",
      "Le schéma du commerce triangulaire est utile mais trop régulier pour décrire tous les voyages",
      "Les personnes esclavisées résistent par la fuite, la révolte, le travail et la culture",
      "Abolitions et émancipations sont longues, conflictuelles et incomplètes"
    ],
    "express": [
      "Les empires portugais, espagnol, néerlandais, français et britannique développent des économies atlantiques différentes mais connectées. Dans les Amériques, les plantations de sucre, tabac, café ou coton concentrent terres, capitaux et travail forcé. La richesse ne vient pas d’un produit tropical seul : elle dépend d’un système juridique qui transforme des personnes en propriétés.",
      "Des négociants européens achètent des captifs sur les côtes africaines dans des contextes de guerres, de razzias et de pouvoirs locaux complexes. La traversée de l’Atlantique est meurtrière. Parler seulement de commerce triangulaire masque les routes directes, les circulations régionales et le rôle central des économies américaines et africaines.",
      "Les personnes esclavisées ne sont jamais passives. Elles préservent et transforment langues, religions, pratiques agricoles et musiques ; ralentissent le travail, négocient, fuient, forment des communautés marronnes et se révoltent. La révolution de Saint-Domingue, devenue Haïti en 1804, renverse l’ordre esclavagiste et colonial de manière sans précédent."
    ],
    "complete": [
      {
        "title": "1. La plantation est une institution",
        "text": "Une plantation n’est pas seulement une grande ferme. Elle combine une production spécialisée destinée au marché lointain, une discipline violente du travail, des investissements et des réseaux de transport. Le droit racial organise qui peut posséder, hériter, témoigner ou être vendu. L’économie et la hiérarchie sociale sont donc inséparables."
      },
      {
        "title": "2. La traite transatlantique",
        "text": "Des millions de captifs sont embarqués depuis différentes régions d’Afrique vers les Amériques. Les conditions de la traversée provoquent maladie, faim et mortalité. Les marchés africains ne fonctionnent pas hors de toute histoire locale : guerres, États, intermédiaires et demandes atlantiques se combinent. Cela n’atténue pas la responsabilité des empires et négociants qui organisent la déportation."
      },
      {
        "title": "3. Le triangle qui simplifie trop",
        "text": "Le modèle Europe–Afrique–Amériques aide à visualiser certains circuits : produits manufacturés, captifs, denrées coloniales. Mais tous les navires ne suivent pas ce triangle. Des échanges relient directement ports américains, îles, côtes africaines ou Europe du Nord. Il faut donc retenir un réseau atlantique plutôt qu’une route unique parfaitement régulière."
      },
      {
        "title": "4. Résister et refaire société",
        "text": "La résistance prend des formes ouvertes et discrètes. Les marrons fondent des communautés hors des plantations ; des révoltes éclatent ; des familles se forment malgré les séparations imposées ; des savoirs médicaux, culinaires et religieux circulent. Ces pratiques ne suppriment pas la contrainte, mais elles montrent que les personnes asservies agissent, créent et combattent dans des conditions extrêmes."
      },
      {
        "title": "5. Abolir ne suffit pas à égaliser",
        "text": "Les abolitions résultent de mobilisations d’esclaves, d’abolitionnistes, de révolutions et de décisions d’État. Elles arrivent à des dates différentes et peuvent s’accompagner d’indemnisations aux propriétaires plutôt qu’aux anciens esclaves. Travail forcé, racisme juridique, pauvreté et domination coloniale survivent souvent à l’émancipation. L’après-esclavage est donc un nouveau conflit social, pas une fin instantanée de l’histoire."
      }
    ],
    "deeper": [
      {
        "title": "Haïti",
        "text": "La révolution haïtienne relie insurrection servile, guerre impériale, abolition et indépendance."
      },
      {
        "title": "Chiffres",
        "text": "Les bases de données historiques permettent d’estimer les traversées, mais chaque nombre correspond à des vies, des régions et des trajectoires différentes."
      },
      {
        "title": "Mémoire",
        "text": "Ports, fortunes, musées et paysages de plantation portent encore les traces matérielles de ce système."
      }
    ],
    "takeaways": [
      {
        "label": "Plantation",
        "text": "Une organisation économique, juridique et coercitive."
      },
      {
        "label": "Réseau",
        "text": "L’Atlantique ne suit pas un triangle unique."
      },
      {
        "label": "Résistances",
        "text": "Fuite, culture, négociation et révolte prennent de multiples formes."
      },
      {
        "label": "Abolition",
        "text": "Elle détruit un statut légal sans effacer immédiatement les hiérarchies."
      }
    ],
    "quiz": [
      {
        "kind": "notion",
        "q": "Qu’est-ce qui définit une plantation esclavagiste ?",
        "a": "Une production d’exportation organisée par le capital, le droit de propriété sur les personnes et le travail contraint.",
        "choices": [
          "Toute petite exploitation familiale des colonies.",
          "Un port spécialisé dans l’achat de produits européens.",
          "Une communauté marronne indépendante."
        ],
        "why": "La plantation est un système social autant qu’une unité agricole.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi le commerce triangulaire est-il insuffisant ?",
        "a": "Il ne décrit pas les nombreuses routes directes et circulations régionales de l’Atlantique.",
        "choices": [
          "Il exclut totalement l’Europe.",
          "Il ne concerne que le XIXe siècle.",
          "Il suppose que les plantations n’exportent rien."
        ],
        "why": "Le triangle est un schéma pédagogique, non la carte de tous les voyages.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "acteur",
        "q": "Quelles formes prend la résistance des personnes esclavisées ?",
        "a": "Fuite, marronnage, ralentissement, maintien de cultures, négociation et révolte.",
        "choices": [
          "Uniquement les révoltes militaires organisées par des États.",
          "Aucune, car le système supprime toute action possible.",
          "Seulement l’écriture de pétitions en Europe."
        ],
        "why": "L’action existe sous des formes ouvertes et quotidiennes.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "repère",
        "q": "Pourquoi Haïti est-il un repère majeur ?",
        "a": "Une insurrection d’esclaves conduit à l’abolition et à l’indépendance en 1804.",
        "choices": [
          "La colonie y abolit l’esclavage sans conflit dès 1492.",
          "La France y crée la première plantation de coton européenne.",
          "Les propriétaires y obtiennent l’indépendance pour maintenir l’esclavage."
        ],
        "why": "La révolution renverse simultanément ordre colonial et esclavagiste.",
        "trap": "",
        "evidence": "Express 3."
      },
      {
        "kind": "synthèse",
        "q": "Pourquoi l’abolition ne produit-elle pas immédiatement l’égalité ?",
        "a": "Racisme, pauvreté, travail contraint et domination coloniale peuvent survivre au statut esclavagiste.",
        "choices": [
          "Parce que l’esclavage légal continue partout sans changement.",
          "Parce que les anciens esclaves refusent toute liberté juridique.",
          "Parce que les plantations disparaissent toujours le jour de l’abolition."
        ],
        "why": "Un statut juridique change plus vite que les structures sociales.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta233-premium"
  },
  "art-photography-new-vision": {
    "hook": "La photographie est annoncée publiquement en 1839 comme une machine capable de fixer la lumière. Très vite, elle devient portrait, document, preuve, archive, propagande et œuvre d’art. Son apparente exactitude ne supprime pourtant ni le cadrage, ni la mise en scène, ni le choix de ce qui mérite d’être montré.",
    "keyFacts": [
      "1839 : annonce du daguerréotype et diffusion des premiers procédés",
      "Une photographie dépend d’un appareil, d’un support, d’un temps de pose et d’un opérateur",
      "La reproductibilité transforme la circulation des images",
      "Documenter ne signifie pas être neutre",
      "Les artistes utilisent très tôt retouche, montage, série et mise en scène"
    ],
    "express": [
      "Le daguerréotype produit une image unique très détaillée sur plaque métallique ; les procédés négatif-positif de Talbot permettent au contraire plusieurs tirages. Cette différence technique change déjà l’usage : objet précieux d’un côté, image reproductible de l’autre. Les portraits deviennent plus accessibles, sans être immédiatement populaires pour tous.",
      "Une photographie enregistre la lumière, mais ne choisit pas seule son sujet. Position de l’appareil, durée d’exposition, focale, moment, recadrage et légende orientent la lecture. Les images de guerre, d’ethnographie ou de police ont souvent été présentées comme des preuves tout en servant des institutions et des pouvoirs précis.",
      "Au XXe siècle, reportage, avant-gardes, publicité et photographie artistique explorent des voies très différentes. Le numérique rend la prise de vue et la diffusion massives ; les retouches ne commencent pourtant pas avec Photoshop. Dès le XIXe siècle, négatifs combinés, colorisation et effacement montrent que la photographie n’a jamais été une fenêtre transparente."
    ],
    "complete": [
      {
        "title": "1. Plusieurs inventions plutôt qu’une naissance unique",
        "text": "Niépce obtient des images durables avant 1839 ; Daguerre perfectionne un procédé détaillé ; Talbot développe le négatif papier. D’autres expérimentateurs travaillent aussi sur la sensibilité à la lumière. Retenir 1839 est utile pour la publicité officielle et la diffusion internationale, mais parler d’un inventeur unique simplifie une histoire collective."
      },
      {
        "title": "2. Le portrait et la nouvelle économie de l’image",
        "text": "Les ateliers photographiques standardisent poses, décors et formats. Le portrait permet d’affirmer une identité familiale, professionnelle ou politique. Les cartes de visite photographiques circulent à grande échelle. La technique ne démocratise pas tout instantanément : coût, accès aux studios et conventions sociales continuent à sélectionner les visages visibles."
      },
      {
        "title": "3. Document, archive et pouvoir",
        "text": "La photographie inventorie monuments, populations, criminels, colonies et champs de bataille. L’image peut conserver une trace précieuse, mais son usage dépend du classement et de la légende. Une série policière ou coloniale ne décrit pas seulement le monde : elle fabrique des catégories et donne à l’institution le pouvoir de comparer les corps."
      },
      {
        "title": "4. Quand la photographie devient langage",
        "text": "Le cadrage coupe le réel, la profondeur organise les plans, le flou peut suggérer le mouvement et la série produire une idée. Les avant-gardes utilisent photomontage, angles obliques et solarisation. Le reportage construit un récit par sélection et séquence. La photographie devient donc un langage visuel, pas seulement un procédé chimique."
      },
      {
        "title": "5. Lire une photographie aujourd’hui",
        "text": "Il faut demander qui a produit l’image, pour quel support, avec quelle légende et dans quelle chaîne de diffusion. Une photographie de presse, une publicité, un selfie ou une image scientifique n’obéissent pas aux mêmes contraintes. Les outils génératifs et les retouches numériques renforcent une question ancienne : la confiance vient moins de l’apparence que de la provenance et du contexte."
      }
    ],
    "deeper": [
      {
        "title": "La couleur",
        "text": "Les procédés couleur se développent progressivement ; la couleur n’est pas un simple ajout tardif sans histoire."
      },
      {
        "title": "Légende",
        "text": "Quelques mots peuvent transformer le sens politique d’une image identique."
      },
      {
        "title": "Tirage",
        "text": "Le contraste, le papier et le format font partie de l’œuvre photographique."
      }
    ],
    "takeaways": [
      {
        "label": "1839",
        "text": "Un repère de diffusion, non une invention solitaire."
      },
      {
        "label": "Choix",
        "text": "Cadrage et contexte construisent l’image."
      },
      {
        "label": "Pouvoir",
        "text": "Archives et preuves servent des institutions."
      },
      {
        "label": "Méthode",
        "text": "Vérifier provenance, usage et légende."
      }
    ],
    "quiz": [
      {
        "kind": "technique",
        "q": "Quelle différence majeure sépare daguerréotype et négatif-positif ?",
        "a": "Le daguerréotype est une image unique, tandis qu’un négatif permet plusieurs tirages.",
        "choices": [
          "Le daguerréotype est toujours en couleur.",
          "Le négatif ne nécessite aucune lumière.",
          "Le daguerréotype est une vidéo courte."
        ],
        "why": "La reproductibilité modifie les usages sociaux.",
        "trap": "",
        "evidence": "Express 1."
      },
      {
        "kind": "analyse",
        "q": "Pourquoi une photographie n’est-elle pas neutre ?",
        "a": "Parce que cadrage, moment, appareil, sélection et légende orientent ce qui est visible et interprétable.",
        "choices": [
          "Parce qu’elle ne contient aucune information réelle.",
          "Parce que toutes les photographies sont entièrement peintes.",
          "Parce que seule la couleur crée du sens."
        ],
        "why": "L’enregistrement lumineux reste un acte de choix.",
        "trap": "",
        "evidence": "Express 2."
      },
      {
        "kind": "pouvoir",
        "q": "Comment une archive photographique peut-elle exercer un pouvoir ?",
        "a": "En classant les individus et en fabriquant des catégories institutionnelles.",
        "choices": [
          "En interdisant toute comparaison entre images.",
          "En supprimant systématiquement les légendes.",
          "En rendant chaque portrait anonyme."
        ],
        "why": "L’archive ne conserve pas seulement ; elle organise.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "langage",
        "q": "Que montre le photomontage ?",
        "a": "Que la photographie peut assembler, transformer et argumenter au lieu de seulement enregistrer.",
        "choices": [
          "Que les retouches n’existent qu’après l’ordinateur.",
          "Que les négatifs empêchent toute création artistique.",
          "Que l’image photographique n’a aucun lien avec le réel."
        ],
        "why": "La photographie est aussi un langage construit.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "méthode",
        "q": "Quelle question est prioritaire face à une image virale ?",
        "a": "Qui l’a produite, dans quel contexte et avec quelle chaîne de diffusion ?",
        "choices": [
          "Quel filtre serait le plus joli.",
          "Combien de couleurs contient le fichier.",
          "Si le sujet regarde l’objectif."
        ],
        "why": "La provenance est centrale pour évaluer la confiance.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta233-premium"
  },
  "cinema-documentary-truth": {
    "hook": "Le documentaire travaille avec des personnes, des lieux et des événements du monde réel, mais il reste un film : quelqu’un choisit où placer la caméra, quand couper, quelle voix faire entendre et quelles images laisser hors champ. Sa force ne vient pas d’une absence de mise en scène, mais d’un contrat de confiance à examiner.",
    "keyFacts": [
      "Le documentaire construit un point de vue par tournage et montage",
      "Nanouk l’Esquimau montre que la reconstitution existe dès les débuts",
      "Vertov défend une puissance propre du cinéma pour observer le monde",
      "Archives, commentaire et musique peuvent informer ou manipuler",
      "L’éthique concerne consentement, sécurité, rémunération et conséquences du film"
    ],
    "express": [
      "Dans Nanouk l’Esquimau en 1922, Robert Flaherty filme une famille inuit mais reconstitue certaines pratiques et situations. Le film reste un jalon majeur tout en révélant un problème durable : une scène peut être vraie au sens culturel, fabriquée au tournage et trompeuse si le spectateur ignore cette fabrication.",
      "Dziga Vertov cherche au contraire un langage de caméra et de montage capable de révéler des rythmes invisibles à l’œil ordinaire. Plus tard, le cinéma direct allège le matériel pour enregistrer conversations et gestes avec moins d’intervention apparente. Pourtant, la présence de la caméra et le choix du montage ne disparaissent jamais.",
      "Un documentaire peut enquêter, observer, témoigner, utiliser des archives, mettre en scène une performance ou assumer la subjectivité du cinéaste. La question utile n’est donc pas “est-ce totalement objectif ?”, mais “quelles preuves montre-t-il, comment les relie-t-il et quelles responsabilités prend-il envers les personnes filmées ?”."
    ],
    "complete": [
      {
        "title": "1. Un film du réel reste une construction",
        "text": "Le cadre sélectionne une portion du monde ; le montage rapproche deux moments ; la musique transforme une émotion. Même une caméra fixe produit un point de vue par son emplacement et sa durée. Reconnaître cette construction ne disqualifie pas le documentaire : cela permet d’évaluer ses méthodes et la solidité de son enquête."
      },
      {
        "title": "2. Reconstitution et honnêteté",
        "text": "Rejouer une action peut aider à montrer un événement non filmé, protéger un témoin ou rendre visible une pratique. Le problème apparaît quand la reconstitution est présentée comme une captation spontanée ou quand elle force les participants à incarner une image exotique. La transparence du dispositif compte autant que la pureté impossible d’une scène."
      },
      {
        "title": "3. Archives et voix d’autorité",
        "text": "Une image d’archive change de sens selon sa date, son origine, son recadrage et le commentaire qui l’accompagne. La voix off classique peut fournir des repères, mais aussi imposer une interprétation sans contradiction. Un film rigoureux identifie les documents, confronte les sources et distingue ce qui est établi, probable ou discuté."
      },
      {
        "title": "4. Filmer avec, pas seulement sur",
        "text": "Les documentaristes décident qui parle, qui est payé, qui peut voir les images et quelles conséquences peut avoir leur diffusion. Un témoignage intime ou politique expose parfois une personne à des risques. Consentir au tournage ne signifie pas toujours comprendre tous les usages futurs. L’éthique exige donc une relation continue, pas une simple signature."
      },
      {
        "title": "5. Regarder activement un documentaire",
        "text": "Repère les types de plans, la présence du cinéaste, les ellipses, les sources et les absences. Demande si des points de vue contradictoires sont nécessaires ou si le film documente légitimement une expérience située. Enfin, distingue émotion et preuve : une scène bouleversante peut être authentique sans démontrer à elle seule une thèse générale."
      }
    ],
    "deeper": [
      {
        "title": "Cinéma direct",
        "text": "Un matériel léger réduit certaines interventions sans rendre la caméra invisible."
      },
      {
        "title": "Faux équilibre",
        "text": "Donner le même temps à une affirmation établie et à une contre-vérité ne produit pas automatiquement de la rigueur."
      },
      {
        "title": "Documentaire performatif",
        "text": "Certains films montrent explicitement le rôle du cinéaste et l’impossibilité d’une neutralité totale."
      }
    ],
    "takeaways": [
      {
        "label": "Construction",
        "text": "Le réel filmé passe par cadre, durée et montage."
      },
      {
        "label": "Transparence",
        "text": "La reconstitution doit être comprise par le public."
      },
      {
        "label": "Sources",
        "text": "Archives et témoignages exigent contexte et confrontation."
      },
      {
        "label": "Éthique",
        "text": "Le film a des conséquences pour les personnes représentées."
      }
    ],
    "quiz": [
      {
        "kind": "notion",
        "q": "Pourquoi le documentaire n’est-il pas un enregistrement neutre ?",
        "a": "Parce que le tournage et le montage sélectionnent, ordonnent et interprètent le réel.",
        "choices": [
          "Parce qu’il utilise toujours des acteurs professionnels.",
          "Parce qu’aucune image documentaire ne correspond à un fait.",
          "Parce qu’il est obligatoirement tourné en studio."
        ],
        "why": "La construction est inévitable, mais peut être rigoureuse.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "exemple",
        "q": "Que montre le cas de Nanouk l’Esquimau ?",
        "a": "Qu’un documentaire ancien peut reconstituer des scènes et poser la question de la transparence.",
        "choices": [
          "Que le cinéma direct existe dès 1895.",
          "Que les archives n’ont jamais de légende.",
          "Que tous les participants ont écrit le scénario."
        ],
        "why": "La reconstitution n’est pas une invention numérique.",
        "trap": "",
        "evidence": "Express 1."
      },
      {
        "kind": "source",
        "q": "Pourquoi faut-il identifier une archive ?",
        "a": "Pour connaître sa date, son auteur, son usage initial et les transformations qu’elle a subies.",
        "choices": [
          "Pour vérifier uniquement sa résolution.",
          "Pour supprimer toute voix off.",
          "Pour savoir si elle a été tournée en couleur."
        ],
        "why": "Une image hors contexte peut soutenir des récits opposés.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "éthique",
        "q": "Pourquoi un consentement initial peut-il être insuffisant ?",
        "a": "Les usages futurs et les risques de diffusion ne sont pas toujours prévisibles ou compris.",
        "choices": [
          "Une personne filmée ne peut jamais changer d’avis.",
          "Le cinéaste possède moralement toute image tournée.",
          "La rémunération rend toute question éthique inutile."
        ],
        "why": "La relation se poursuit au-delà du tournage.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "méthode",
        "q": "Comment regarder activement un documentaire ?",
        "a": "Distinguer émotion, preuves, sources, montage et position du cinéaste.",
        "choices": [
          "Chercher uniquement si la caméra bouge.",
          "Refuser toute subjectivité déclarée.",
          "Croire la voix off dès qu’elle semble assurée."
        ],
        "why": "L’analyse porte sur le dispositif autant que sur le sujet.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta233-premium"
  },
  "sci-genetics-dna-history": {
    "hook": "Les pois de Mendel, les chromosomes observés au microscope et une image de diffraction des rayons X n’appartiennent pas à la même expérience. Leur réunion progressive transforme l’hérédité : d’une régularité statistique, elle devient un mécanisme porté par les chromosomes puis une information moléculaire copiée et exprimée dans les cellules.",
    "keyFacts": [
      "Mendel publie ses résultats sur les pois en 1866",
      "Les chromosomes relient hérédité et division cellulaire",
      "En 1944, Avery et ses collègues identifient l’ADN comme support de transformation bactérienne",
      "La diffraction de Franklin et Wilkins contraint les modèles de structure",
      "Le modèle de double hélice de 1953 explique une copie possible de l’information"
    ],
    "express": [
      "Mendel croise des lignées de pois et compte les caractères sur plusieurs générations. Ses rapports réguliers soutiennent l’idée d’unités héréditaires distinctes, bien avant que le mot gène prenne son sens moderne. Ses résultats, publiés en 1866, ne deviennent centraux qu’autour de 1900, lorsque plusieurs biologistes retrouvent des lois proches.",
      "L’observation des chromosomes pendant la division cellulaire permet ensuite de relier les facteurs de Mendel à des structures physiques. Les travaux de Morgan sur la drosophile montrent que des gènes sont situés sur les chromosomes et que leur proximité influence leur transmission. La génétique devient expérimentale et cartographique.",
      "Au milieu du XXe siècle, les expériences sur les bactéries et les virus renforcent l’idée que l’ADN porte l’information héréditaire. Les données de diffraction obtenues notamment par Rosalind Franklin, combinées à la chimie des bases, contribuent au modèle en double hélice proposé en 1953. Ce modèle est puissant parce qu’il suggère comment chaque brin peut guider une copie."
    ],
    "complete": [
      {
        "title": "1. Mendel mesure des générations",
        "text": "Mendel choisit des caractères discrets, contrôle les croisements et compte de nombreux descendants. Les ratios ne décrivent pas chaque individu mais des probabilités de transmission. Le modèle est simple et ne couvre pas immédiatement tous les caractères : dominance incomplète, plusieurs gènes et environnement complexifient l’hérédité."
      },
      {
        "title": "2. Les chromosomes donnent un support",
        "text": "Au microscope, les chromosomes se dupliquent et se séparent lors de la division. Leur comportement pendant la méiose ressemble aux séparations prévues par les lois mendéliennes. Morgan et son équipe utilisent les recombinaisons chez la drosophile pour ordonner des gènes le long d’un chromosome, transformant une hypothèse abstraite en carte expérimentale."
      },
      {
        "title": "3. Pourquoi l’ADN plutôt que les protéines",
        "text": "Les protéines paraissent d’abord candidates en raison de leur diversité. L’expérience d’Avery, MacLeod et McCarty montre qu’un principe transformant bactérien est détruit par une enzyme qui dégrade l’ADN. D’autres expériences, dont celle d’Hershey et Chase, renforcent cette conclusion. Une preuve scientifique se construit ici par convergence, non par une scène unique."
      },
      {
        "title": "4. Une structure sous contraintes",
        "text": "La diffraction des rayons X ne photographie pas directement une molécule ; elle produit un motif à interpréter. Les données de Franklin indiquent une structure hélicoïdale et des dimensions précises. Les règles de Chargaff sur les proportions de bases limitent aussi les modèles possibles. Watson et Crick assemblent ces contraintes dans une structure à deux brins complémentaires."
      },
      {
        "title": "5. Du gène au génome",
        "text": "La double hélice n’explique pas seule l’organisme. L’information doit être transcrite, traduite, régulée et interagir avec l’environnement. Les mutations créent des variantes ; la recombinaison les redistribue ; l’expression dépend des cellules. La génomique moderne révèle enfin que de nombreux caractères résultent de réseaux de gènes plutôt que d’un interrupteur unique."
      }
    ],
    "deeper": [
      {
        "title": "Photo 51",
        "text": "Elle est une donnée de diffraction cruciale, pas une photographie ordinaire de la double hélice."
      },
      {
        "title": "Crédit scientifique",
        "text": "La découverte combine expériences, données et modèles ; raconter seulement deux noms efface Franklin, Wilkins, Chargaff et d’autres."
      },
      {
        "title": "Déterminisme",
        "text": "Un gène influence un caractère sans transformer toujours l’avenir individuel en destin inévitable."
      }
    ],
    "takeaways": [
      {
        "label": "Mendel",
        "text": "Des régularités statistiques dans les croisements."
      },
      {
        "label": "Chromosomes",
        "text": "Un support cellulaire pour les gènes."
      },
      {
        "label": "ADN",
        "text": "La molécule porte une information copiable."
      },
      {
        "label": "Complexité",
        "text": "Expression et environnement modulent les effets génétiques."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "Que mesure Mendel ?",
        "a": "La fréquence de caractères dans des générations issues de croisements contrôlés.",
        "choices": [
          "La structure atomique de l’ADN.",
          "La taille exacte des chromosomes humains.",
          "La vitesse de mutation des bactéries."
        ],
        "why": "Son raisonnement est statistique avant d’être moléculaire.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "support",
        "q": "Pourquoi les chromosomes deviennent-ils de bons candidats pour porter les gènes ?",
        "a": "Leur séparation pendant la méiose correspond aux lois de transmission et les recombinaisons permettent de les cartographier.",
        "choices": [
          "Ils sont les seules structures visibles dans une cellule vivante.",
          "Ils ne se dupliquent jamais.",
          "Ils sont composés uniquement de protéines."
        ],
        "why": "Comportement cellulaire et statistiques convergent.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "preuve",
        "q": "Que montrent les expériences sur les bactéries et les virus ?",
        "a": "Que l’ADN peut transmettre une information héréditaire.",
        "choices": [
          "Que toutes les protéines sont inutiles.",
          "Que l’ADN est absent des cellules animales.",
          "Que chaque caractère dépend d’un seul gène."
        ],
        "why": "Plusieurs expériences consolident la même conclusion.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "structure",
        "q": "Pourquoi la complémentarité des bases est-elle importante ?",
        "a": "Chaque brin peut servir de modèle à la copie de l’autre.",
        "choices": [
          "Elle empêche toute mutation.",
          "Elle rend les chromosomes visibles à l’œil nu.",
          "Elle transforme l’ADN en protéine sans intermédiaire."
        ],
        "why": "La structure suggère un mécanisme de réplication.",
        "trap": "",
        "evidence": "Express 3."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi un gène n’est-il pas toujours un destin ?",
        "a": "Son effet dépend souvent d’autres gènes, de la régulation et de l’environnement.",
        "choices": [
          "Parce que les gènes disparaissent après la naissance.",
          "Parce que seules les bactéries possèdent un génome.",
          "Parce que les chromosomes ne sont jamais hérités."
        ],
        "why": "Les caractères complexes résultent de réseaux et d’interactions.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta233-premium"
  },
  "sci-thermodynamics-energy": {
    "hook": "La thermodynamique ne naît pas d’abord d’une méditation abstraite sur l’Univers, mais d’un problème industriel : comment transformer davantage de chaleur en travail sans gaspiller le combustible ? En étudiant les machines à vapeur, les physiciens découvrent des lois qui s’appliquent aux moteurs, aux réfrigérateurs, aux cellules et aux étoiles.",
    "keyFacts": [
      "Carnot étudie en 1824 la limite idéale du rendement des machines",
      "Premier principe : l’énergie se conserve en changeant de forme",
      "Deuxième principe : toutes les transformations n’ont pas la même réversibilité",
      "L’entropie mesure une dispersion de l’énergie et le nombre de configurations possibles",
      "Un rendement de 100 % est impossible pour une machine thermique cyclique"
    ],
    "express": [
      "Les premières machines à vapeur fonctionnent avant que leur théorie soit comprise. Sadi Carnot compare des moteurs idéaux et montre que le rendement dépend des températures entre lesquelles ils opèrent, pas seulement du mécanisme particulier. Son raisonnement introduit l’idée qu’une machine réelle possède une limite physique.",
      "Les expériences de Joule relient travail mécanique et chaleur. Le premier principe généralise cette équivalence : l’énergie ne disparaît pas, elle se transforme et se transfère. Une machine peut convertir une partie de l’énergie thermique en travail, tandis qu’une autre partie reste rejetée vers une source plus froide.",
      "Le deuxième principe ajoute une direction. La chaleur passe spontanément du chaud vers le froid, mais l’inverse exige du travail, comme dans un réfrigérateur. L’entropie aide à décrire cette irréversibilité. La réduire au mot désordre est parfois utile, mais trompeuse : elle concerne surtout la répartition de l’énergie et le nombre d’états microscopiques compatibles avec un état global."
    ],
    "complete": [
      {
        "title": "1. Les machines précèdent la loi",
        "text": "Newcomen puis Watt améliorent les machines à vapeur pour pomper et produire du mouvement. Les ingénieurs mesurent consommation et rendement sans posséder encore une théorie complète de la chaleur. La science se construit donc ici dans un échange avec les techniques, et non par une application linéaire d’une découverte déjà terminée."
      },
      {
        "title": "2. Carnot et la limite idéale",
        "text": "Carnot imagine un cycle réversible entre une source chaude et une source froide. Plus l’écart de température est exploitable, plus le rendement maximal peut être élevé. Aucune amélioration mécanique ne permet de dépasser cette limite idéale. La notion de modèle prend toute sa force : un moteur impossible à construire exactement permet d’évaluer les moteurs réels."
      },
      {
        "title": "3. Conserver l’énergie",
        "text": "Joule montre qu’un travail mécanique peut chauffer un liquide. Le premier principe exprime l’équivalence entre chaleur, travail et énergie interne. Si un système reçoit de l’énergie, celle-ci modifie son état ou ressort sous une autre forme. Le mot perte désigne souvent une énergie devenue moins utile, non une disparition au sens physique."
      },
      {
        "title": "4. Pourquoi tout ne revient pas en arrière",
        "text": "Un parfum se diffuse dans une pièce et ne se reconcentre pas spontanément. Les molécules obéissent pourtant à des lois microscopiques presque réversibles. La différence vient du nombre immense de configurations dispersées par rapport aux configurations concentrées. Le deuxième principe décrit cette tendance statistique et donne une flèche au temps macroscopique."
      },
      {
        "title": "5. De la centrale au vivant",
        "text": "Turbines, moteurs, pompes à chaleur et réfrigérateurs se comprennent par bilans d’énergie et d’entropie. Les organismes vivants maintiennent une organisation locale en échangeant matière et énergie avec leur environnement ; ils ne violent pas le deuxième principe. La thermodynamique ne dit pas que tout devient immédiatement chaotique : elle impose des contraintes aux transformations possibles."
      }
    ],
    "deeper": [
      {
        "title": "Rendement",
        "text": "Il faut toujours préciser l’énergie utile recherchée et les limites du système étudié."
      },
      {
        "title": "Entropie",
        "text": "Le mot désordre masque parfois la définition statistique et énergétique plus précise."
      },
      {
        "title": "Perpétuel",
        "text": "Une machine perpétuelle de deuxième espèce échoue parce qu’elle voudrait convertir toute chaleur en travail sans autre effet."
      }
    ],
    "takeaways": [
      {
        "label": "Technique",
        "text": "Les moteurs stimulent la théorie."
      },
      {
        "label": "Conservation",
        "text": "L’énergie change de forme mais ne disparaît pas."
      },
      {
        "label": "Direction",
        "text": "Le deuxième principe distingue transformations spontanées et forcées."
      },
      {
        "label": "Limite",
        "text": "Aucune machine thermique cyclique n’atteint 100 % de rendement."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "Que cherche Carnot en 1824 ?",
        "a": "La limite idéale du rendement d’une machine thermique.",
        "choices": [
          "La structure de l’atome.",
          "La composition chimique du charbon.",
          "La vitesse de la lumière."
        ],
        "why": "Son modèle compare les températures des sources.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "principe",
        "q": "Que dit le premier principe ?",
        "a": "L’énergie se conserve en se transformant ou en se transférant.",
        "choices": [
          "Toute chaleur devient intégralement du travail.",
          "L’énergie d’un système reste toujours sous la même forme.",
          "La température ne peut jamais changer."
        ],
        "why": "Le bilan distingue transformation et disparition.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "direction",
        "q": "Pourquoi un réfrigérateur consomme-t-il du travail ?",
        "a": "Il force un transfert de chaleur du froid vers le chaud, opposé au sens spontané.",
        "choices": [
          "Il crée de l’énergie à partir du vide.",
          "Il supprime toute entropie de l’Univers.",
          "Il transforme uniquement le froid en matière."
        ],
        "why": "Le deuxième principe impose une contrepartie.",
        "trap": "",
        "evidence": "Express 3."
      },
      {
        "kind": "notion",
        "q": "Pourquoi “entropie = désordre” est-il incomplet ?",
        "a": "L’entropie décrit la dispersion de l’énergie et le nombre d’états microscopiques compatibles.",
        "choices": [
          "Parce que l’entropie mesure seulement la masse.",
          "Parce qu’elle ne concerne que les gaz.",
          "Parce qu’elle diminue toujours dans l’Univers."
        ],
        "why": "La notion est statistique et énergétique.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "vivant",
        "q": "Pourquoi la vie ne viole-t-elle pas le deuxième principe ?",
        "a": "Un organisme maintient son organisation en échangeant matière et énergie avec son environnement.",
        "choices": [
          "Parce que les cellules n’ont pas de température.",
          "Parce que la vie crée de l’énergie sans source.",
          "Parce que l’entropie ne s’applique pas à la chimie."
        ],
        "why": "Il faut étudier le système et ses échanges.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta233-premium"
  },
  "astro-black-holes-relativity": {
    "hook": "Un trou noir n’est pas un trou percé dans l’espace ni un aspirateur cosmique. C’est une région où la géométrie de l’espace-temps crée une frontière causale : une fois l’horizon franchi, aucune trajectoire ne permet à la lumière ou à un signal de revenir vers l’extérieur.",
    "keyFacts": [
      "La relativité générale décrit la gravitation comme une courbure de l’espace-temps",
      "Schwarzschild obtient en 1916 une solution contenant un rayon critique",
      "L’horizon des événements n’est pas une surface matérielle",
      "Le disque d’accrétion lumineux appartient à la matière autour du trou noir",
      "On détecte les trous noirs par leurs effets sur étoiles, gaz, lumière et ondes gravitationnelles"
    ],
    "express": [
      "En relativité générale, la masse et l’énergie courbent l’espace-temps. La solution trouvée par Karl Schwarzschild autour d’une masse sphérique contient un rayon au-delà duquel les trajectoires orientées vers le futur restent dirigées vers l’intérieur. Cette limite devient l’horizon des événements : elle marque ce qui peut encore communiquer avec l’extérieur.",
      "Les trous noirs stellaires peuvent naître après l’effondrement du cœur d’une étoile massive. D’autres, supermassifs, occupent le centre des galaxies. Leur origine complète reste étudiée. À distance, un trou noir attire comme n’importe quel objet de même masse : remplacer le Soleil par un objet aussi massif ne ferait pas tomber instantanément les planètes.",
      "Un trou noir est noir, mais son voisinage peut être extrêmement lumineux. Du gaz chauffé dans un disque d’accrétion émet rayons X et lumière ; la gravité courbe les rayons autour de l’horizon. Les observations des orbites stellaires, des ondes gravitationnelles et des images produites par l’Event Horizon Telescope testent des modèles cohérents plutôt qu’elles ne photographient directement l’intérieur."
    ],
    "complete": [
      {
        "title": "1. Une frontière causale",
        "text": "L’horizon n’est ni une coque solide ni un lieu où la gravité devient soudain infinie. Pour un observateur en chute libre traversant un grand horizon, aucun panneau local n’annonce nécessairement le passage. La différence est globale : après cette frontière, toutes les trajectoires futures conduisent vers l’intérieur et aucun message ne peut atteindre un observateur lointain."
      },
      {
        "title": "2. Effondrement et masse",
        "text": "Lorsque le cœur d’une étoile très massive n’est plus soutenu par les réactions nucléaires ni par les pressions quantiques suffisantes, il peut poursuivre son effondrement. Le résultat dépend de la masse restante et des pertes pendant l’explosion. Un trou noir stellaire n’est donc pas une étoile très dense ordinaire : il possède un horizon."
      },
      {
        "title": "3. Le spectacle vient de l’extérieur",
        "text": "Le gaz en orbite perd de l’énergie, se comprime et chauffe avant de franchir l’horizon. Les champs magnétiques peuvent alimenter des jets puissants, surtout autour de trous noirs en rotation. Les couleurs spectaculaires des illustrations traduisent souvent des longueurs d’onde invisibles et des modèles : elles ne sont pas une vue à l’œil nu."
      },
      {
        "title": "4. Comment prouver l’invisible",
        "text": "On mesure la vitesse d’étoiles autour d’un objet compact, les rayons X d’un système binaire ou les mouvements du gaz au centre d’une galaxie. Depuis 2015, les détecteurs d’ondes gravitationnelles observent la fusion d’objets compacts. L’Event Horizon Telescope combine des radiotélescopes séparés par la taille de la Terre pour reconstruire une structure à l’échelle de l’ombre de l’horizon."
      },
      {
        "title": "5. Ce que nous ignorons encore",
        "text": "La relativité générale prédit une singularité dans ses solutions classiques, signe probable qu’elle atteint une limite où une théorie quantique de la gravitation devient nécessaire. La perte d’information, l’évaporation de Hawking et la croissance des premiers trous noirs supermassifs restent des domaines actifs. Distinguer observation, modèle robuste et question ouverte est essentiel."
      }
    ],
    "deeper": [
      {
        "title": "Spaghettification",
        "text": "Les forces de marée étirent les objets ; leur intensité à l’horizon dépend fortement de la masse du trou noir."
      },
      {
        "title": "Image d’un horizon",
        "text": "Les images célèbres montrent une émission autour d’une ombre gravitationnelle reconstruite, pas la surface du trou noir."
      },
      {
        "title": "Aspiration",
        "text": "Un trou noir n’attire pas à distance davantage qu’un autre objet de même masse."
      }
    ],
    "takeaways": [
      {
        "label": "Relativité",
        "text": "La gravité devient géométrie de l’espace-temps."
      },
      {
        "label": "Horizon",
        "text": "Une frontière causale, non une matière solide."
      },
      {
        "label": "Détection",
        "text": "Les effets du trou noir rendent l’invisible mesurable."
      },
      {
        "label": "Limite",
        "text": "La singularité signale une question théorique ouverte."
      }
    ],
    "quiz": [
      {
        "kind": "notion",
        "q": "Qu’est-ce que l’horizon des événements ?",
        "a": "Une frontière au-delà de laquelle aucun signal ne peut revenir vers l’extérieur.",
        "choices": [
          "La surface solide du trou noir.",
          "Le disque de gaz lumineux autour du trou noir.",
          "La distance où la gravité disparaît."
        ],
        "why": "L’horizon est une frontière causale.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "origine",
        "q": "Comment peut se former un trou noir stellaire ?",
        "a": "Par l’effondrement du cœur suffisamment massif d’une étoile en fin de vie.",
        "choices": [
          "Par le refroidissement d’une planète géante.",
          "Par la fusion de deux comètes.",
          "Par l’arrêt de rotation d’une galaxie."
        ],
        "why": "La masse restante détermine l’issue compacte.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "image",
        "q": "Pourquoi le voisinage d’un trou noir peut-il être lumineux ?",
        "a": "Le gaz du disque d’accrétion chauffe et rayonne avant de franchir l’horizon.",
        "choices": [
          "Le trou noir possède une surface en feu.",
          "La singularité émet directement de la lumière visible.",
          "L’horizon réfléchit toutes les étoiles."
        ],
        "why": "La lumière vient de la matière extérieure.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "preuve",
        "q": "Comment observe-t-on un objet qui n’émet pas de lumière ?",
        "a": "Par ses effets gravitationnels, le rayonnement du gaz et les ondes gravitationnelles.",
        "choices": [
          "Uniquement avec un microscope.",
          "En regardant directement la singularité.",
          "En mesurant sa température avec une sonde posée dessus."
        ],
        "why": "Plusieurs observations indépendantes convergent.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi la singularité reste-t-elle une question ouverte ?",
        "a": "Elle indique probablement une limite de la relativité générale sans gravitation quantique.",
        "choices": [
          "Elle a déjà été filmée directement.",
          "Elle prouve que l’énergie n’est pas conservée.",
          "Elle n’apparaît dans aucun modèle physique."
        ],
        "why": "Le modèle est robuste autour de l’horizon mais incomplet aux extrêmes.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta233-premium"
  },
  "astro-galaxies-cosmic-web": {
    "hook": "Une galaxie n’est pas une île isolée posée dans le vide. La Voie lactée appartient à un groupe, lui-même lié à des filaments et des amas. À très grande échelle, la matière dessine une toile cosmique faite de nœuds denses et de vastes régions peu peuplées.",
    "keyFacts": [
      "Les galaxies contiennent étoiles, gaz, poussières et matière noire",
      "Dans les années 1920, les distances montrent que les nébuleuses spirales sont d’autres galaxies",
      "Les courbes de rotation révèlent une masse invisible supplémentaire",
      "Galaxies et amas se répartissent en filaments autour de vides",
      "Les fusions transforment les formes et peuvent déclencher de nouvelles étoiles"
    ],
    "express": [
      "Au début du XXe siècle, le statut des nébuleuses spirales est débattu. Les mesures de Céphéides dans Andromède établissent qu’elle se trouve bien au-delà de la Voie lactée. L’Univers observable devient un monde de galaxies, chacune contenant des milliards d’étoiles et une histoire propre.",
      "Les étoiles des régions externes des galaxies tournent plus vite que ne le prédit la matière visible seule. Les mouvements des galaxies dans les amas et les effets de lentille gravitationnelle pointent aussi vers une masse invisible : la matière noire. Elle n’est pas une correction décorative, mais un élément majeur des modèles de formation des structures.",
      "Les relevés de millions de galaxies montrent des filaments, des murs et des vides. Les petites fluctuations de densité de l’Univers jeune grandissent sous l’effet de la gravitation. Le gaz tombe dans les halos de matière noire, forme des étoiles, puis les supernovæ et les noyaux actifs réinjectent de l’énergie. Une galaxie évolue donc par interaction entre gravité, gaz et environnement."
    ],
    "complete": [
      {
        "title": "1. Sortir de la Voie lactée",
        "text": "Les étoiles variables céphéides possèdent une relation entre période et luminosité. En comparant luminosité réelle et apparente, les astronomes estiment la distance. Les observations d’Andromède montrent qu’elle ne peut appartenir à notre galaxie. Le débat se résout par une méthode de mesure, pas seulement par une photographie plus nette."
      },
      {
        "title": "2. Formes et histoires",
        "text": "Les galaxies spirales, elliptiques ou irrégulières ne forment pas une simple séquence d’âge. Leur apparence dépend du gaz, des collisions, de la rotation et de la formation stellaire. Une galaxie peut changer de morphologie. Les classifications sont utiles pour comparer, mais elles ne résument pas toute l’évolution."
      },
      {
        "title": "3. La masse que l’on ne voit pas",
        "text": "Les courbes de rotation restent souvent presque plates loin du centre, alors que la matière lumineuse diminue. Des halos de matière noire expliquent cette dynamique dans le modèle dominant. Les lentilles gravitationnelles cartographient aussi une masse indépendante de sa lumière. La nature microscopique de cette matière reste cependant inconnue."
      },
      {
        "title": "4. La toile cosmique",
        "text": "La gravité amplifie les surdensités de l’Univers jeune. La matière s’écoule vers des filaments puis des nœuds où se forment groupes et amas. Les vides ne sont pas absolument vides, mais beaucoup moins denses. Les simulations numériques comparent cette architecture aux relevés pour tester cosmologie et matière noire."
      },
      {
        "title": "5. Des galaxies qui se régulent",
        "text": "Le gaz froid alimente la naissance d’étoiles ; les supernovæ chauffent et expulsent une partie de ce gaz ; les trous noirs supermassifs peuvent produire jets et vents. Ces rétroactions empêchent une conversion simple de tout le gaz en étoiles. Les galaxies sont des systèmes ouverts, nourris et freinés par leur environnement."
      }
    ],
    "deeper": [
      {
        "title": "Andromède",
        "text": "Elle se rapproche de la Voie lactée et les deux systèmes fusionneront à très long terme, sans collision directe probable entre la plupart des étoiles."
      },
      {
        "title": "Matière noire",
        "text": "Elle est inférée par plusieurs méthodes ; son identité particulaire n’est pas encore établie."
      },
      {
        "title": "Couleur",
        "text": "Une galaxie bleue contient souvent davantage d’étoiles jeunes, mais poussière et histoire compliquent l’interprétation."
      }
    ],
    "takeaways": [
      {
        "label": "Galaxies",
        "text": "Des systèmes évolutifs, pas des îles immobiles."
      },
      {
        "label": "Matière noire",
        "text": "Une masse invisible révélée par la dynamique et les lentilles."
      },
      {
        "label": "Toile",
        "text": "Filaments, nœuds et vides structurent le cosmos."
      },
      {
        "label": "Rétroaction",
        "text": "Étoiles et trous noirs modifient le gaz qui les nourrit."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "Comment établit-on qu’Andromède est une autre galaxie ?",
        "a": "La mesure de Céphéides montre qu’elle est bien au-delà de la Voie lactée.",
        "choices": [
          "Son diamètre apparent est nul.",
          "Elle émet uniquement des ondes radio.",
          "Elle ne contient aucune étoile."
        ],
        "why": "La distance transforme l’interprétation de l’objet.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "forme",
        "q": "Pourquoi une galaxie elliptique n’est-elle pas simplement une spirale vieille ?",
        "a": "Morphologie, gaz, collisions et formation stellaire suivent des histoires diverses.",
        "choices": [
          "Toutes les galaxies gardent toujours la même forme.",
          "Les elliptiques ne contiennent aucune gravité.",
          "La couleur détermine à elle seule la forme."
        ],
        "why": "Les classifications ne sont pas une chronologie unique.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "preuve",
        "q": "Que suggèrent les courbes de rotation presque plates ?",
        "a": "La présence de masse supplémentaire au-delà de la matière lumineuse.",
        "choices": [
          "L’absence de toute matière dans les bords.",
          "Une vitesse identique pour toutes les galaxies de l’Univers.",
          "La disparition de la gravitation à grande distance."
        ],
        "why": "La dynamique révèle une masse invisible.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "structure",
        "q": "Qu’est-ce que la toile cosmique ?",
        "a": "La répartition de la matière en filaments, nœuds et vides à grande échelle.",
        "choices": [
          "Un réseau artificiel de satellites.",
          "La surface visible d’un trou noir.",
          "Une classification des planètes."
        ],
        "why": "Elle émerge de la croissance des fluctuations de densité.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "régulation",
        "q": "Pourquoi tout le gaz d’une galaxie ne devient-il pas immédiatement des étoiles ?",
        "a": "Supernovæ, vents et noyaux actifs chauffent ou expulsent une partie du gaz.",
        "choices": [
          "Le gaz n’est jamais soumis à la gravité.",
          "Les étoiles empêchent toute chimie.",
          "Les galaxies sont des systèmes parfaitement fermés."
        ],
        "why": "Les rétroactions régulent la formation stellaire.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta233-premium"
  },
  "eco-comparative-advantage-trade": {
    "hook": "Deux pays peuvent gagner à échanger même si l’un est plus productif dans tous les domaines. Le point décisif n’est pas seulement qui produit le plus avec une heure de travail, mais ce à quoi chacun renonce en choisissant une production plutôt qu’une autre : le coût d’opportunité.",
    "keyFacts": [
      "Ricardo formalise l’avantage comparatif au début du XIXe siècle",
      "L’avantage comparatif dépend des coûts d’opportunité relatifs",
      "Le commerce peut agrandir la production totale sans répartir les gains équitablement",
      "Transport, institutions, qualité et chaînes de valeur compliquent le modèle",
      "Une politique commerciale doit distinguer efficacité globale, sécurité et distribution"
    ],
    "express": [
      "Imagine deux pays capables de produire du blé et du tissu. Même si l’un produit davantage des deux biens, il peut être relativement meilleur dans le tissu tandis que l’autre sacrifie moins de blé pour en produire. La spécialisation selon ces coûts d’opportunité permet en théorie d’obtenir davantage de biens au total.",
      "Le modèle de Ricardo isole un mécanisme, mais suppose notamment des facteurs qui ne se déplacent pas librement entre pays et des coûts de transport faibles. Dans le monde réel, entreprises, travailleurs et capitaux réagissent différemment ; les produits ont des qualités variées et les chaînes de valeur répartissent une même production entre plusieurs territoires.",
      "Dire que le commerce crée des gains globaux ne signifie pas que chaque personne gagne. Une région industrielle peut perdre des emplois tandis que les consommateurs paient moins cher et que des entreprises exportatrices progressent. Formation, assurance sociale, fiscalité et politique industrielle déterminent une grande partie de la répartition des gains et des pertes."
    ],
    "complete": [
      {
        "title": "1. Avantage absolu et comparatif",
        "text": "L’avantage absolu compare la quantité produite avec les mêmes ressources. L’avantage comparatif compare le sacrifice d’une production alternative. Un pays très productif partout possède plusieurs avantages absolus, mais son coût d’opportunité peut encore varier selon les secteurs. C’est cette différence relative qui crée la possibilité d’échange dans le modèle."
      },
      {
        "title": "2. Un modèle pour isoler un mécanisme",
        "text": "Les hypothèses simplifient volontairement la réalité. Elles permettent de comprendre pourquoi la spécialisation peut augmenter la production totale. On ne doit pas les confondre avec une recommandation automatique : le modèle ne mesure pas à lui seul pollution, dépendance stratégique, pouvoir de marché ou coût social d’une reconversion."
      },
      {
        "title": "3. Les chaînes de valeur mondiales",
        "text": "Un smartphone peut être conçu dans un pays, intégrer des composants de plusieurs continents et être assemblé ailleurs. Les statistiques brutes d’exportation attribuent parfois toute la valeur au dernier lieu d’assemblage. Étudier la valeur ajoutée et le contrôle des technologies révèle une géographie économique plus complexe que l’étiquette d’origine."
      },
      {
        "title": "4. Gagnants, perdants et ajustements",
        "text": "Les baisses de prix profitent largement aux consommateurs, mais les pertes d’emploi peuvent se concentrer dans certaines villes et durer. Le travail ne se déplace pas instantanément et les compétences ne sont pas interchangeables. Une analyse sérieuse observe donc la transition, les salaires, les territoires et les protections, pas seulement le gain moyen national."
      },
      {
        "title": "5. Commerce, puissance et résilience",
        "text": "Les États utilisent droits de douane, normes, subventions et accords pour protéger des secteurs ou négocier. Certaines dépendances deviennent stratégiques pour énergie, médicaments ou semi-conducteurs. Diversifier une chaîne peut coûter davantage à court terme tout en réduisant un risque. L’arbitrage porte alors sur efficacité, sécurité, climat et justice sociale."
      }
    ],
    "deeper": [
      {
        "title": "Ricardo",
        "text": "Son exemple du vin et du drap illustre une logique relative, non une carte immuable des spécialisations."
      },
      {
        "title": "Dumping",
        "text": "Un prix bas peut venir d’une productivité élevée, d’une subvention, de normes faibles ou d’une stratégie de marché : il faut enquêter."
      },
      {
        "title": "Autarcie",
        "text": "Réduire toutes les dépendances peut aussi diminuer innovation, choix et capacité de coopération."
      }
    ],
    "takeaways": [
      {
        "label": "Coût d’opportunité",
        "text": "Ce que l’on renonce à produire."
      },
      {
        "label": "Gains",
        "text": "Le total peut augmenter sans égalité de répartition."
      },
      {
        "label": "Chaînes",
        "text": "La valeur se répartit entre plusieurs territoires."
      },
      {
        "label": "Politique",
        "text": "Efficacité, résilience et justice doivent être distinguées."
      }
    ],
    "quiz": [
      {
        "kind": "notion",
        "q": "Qu’est-ce qu’un avantage comparatif ?",
        "a": "Un coût d’opportunité plus faible pour une production donnée.",
        "choices": [
          "Une productivité supérieure dans tous les secteurs.",
          "Un salaire toujours plus bas.",
          "Une monnaie plus forte."
        ],
        "why": "La comparaison est relative aux alternatives.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "modèle",
        "q": "Pourquoi les hypothèses simplificatrices sont-elles utiles ?",
        "a": "Elles isolent un mécanisme, mais ne suffisent pas à décider toute politique réelle.",
        "choices": [
          "Elles rendent le modèle automatiquement vrai partout.",
          "Elles prouvent que les transports sont gratuits.",
          "Elles éliminent la question des travailleurs."
        ],
        "why": "Un modèle est un outil d’analyse, non un verdict complet.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "chaîne",
        "q": "Pourquoi l’assemblage final peut-il tromper ?",
        "a": "La conception, les composants et la valeur ajoutée proviennent souvent de plusieurs pays.",
        "choices": [
          "Parce qu’aucun produit n’est réellement exporté.",
          "Parce que les statistiques ne comptent jamais les marchandises.",
          "Parce que seul le transport crée de la valeur."
        ],
        "why": "Les chaînes mondiales fragmentent la production.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "distribution",
        "q": "Pourquoi un gain national moyen peut-il masquer un problème ?",
        "a": "Les pertes peuvent être concentrées dans certains métiers et territoires.",
        "choices": [
          "Tous les consommateurs paient toujours plus cher.",
          "Les entreprises exportatrices ne gagnent jamais.",
          "Le travail change instantanément de secteur."
        ],
        "why": "La distribution et la durée des ajustements comptent.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "stratégie",
        "q": "Pourquoi accepter parfois un coût supérieur ?",
        "a": "Pour diversifier une dépendance critique et améliorer la résilience.",
        "choices": [
          "Pour supprimer toute innovation étrangère.",
          "Pour garantir qu’aucun échange n’existe.",
          "Parce que les coûts ne comptent jamais."
        ],
        "why": "Sécurité et efficacité peuvent entrer en tension.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta233-premium"
  },
  "geo-oceans-cables-maritime-power": {
    "hook": "La mondialisation paraît aérienne et numérique, mais elle repose sur des infrastructures très matérielles : porte-conteneurs, ports, détroits, oléoducs et câbles posés au fond des océans. Contrôler une route ou réparer une fibre peut peser autant qu’occuper une vaste surface maritime.",
    "keyFacts": [
      "La majorité du commerce mondial en volume voyage par mer",
      "Les détroits concentrent des flux et créent des vulnérabilités",
      "Les zones économiques exclusives s’étendent jusqu’à 200 milles marins sous conditions",
      "Les câbles sous-marins transportent l’essentiel des données intercontinentales",
      "Puissance maritime = flotte, ports, droit, finance, industrie et information"
    ],
    "express": [
      "Les routes maritimes relient façades industrielles, zones d’extraction et marchés de consommation. Les porte-conteneurs réduisent le coût du transport à grande échelle, mais dépendent de ports profonds, de grues, de réseaux ferroviaires et de calendriers précis. Une perturbation locale peut désorganiser une chaîne mondiale.",
      "Suez, Malacca, Ormuz ou Bab el-Mandeb sont des passages étroits où se concentrent navires, énergie et rivalités. Un détroit n’est pas seulement un point sur une carte : sa profondeur, sa largeur, le droit de passage, la sécurité des côtes et les routes alternatives déterminent sa valeur stratégique.",
      "Sous la mer, des câbles de fibre optique relient les continents et transportent la plupart des communications internationales. Leur tracé suit des choix économiques et géopolitiques ; leurs stations d’atterrissement sont des nœuds sensibles. Les protéger exige surveillance, navires de réparation, coopération et redondance."
    ],
    "complete": [
      {
        "title": "1. Une mer aménagée",
        "text": "Les océans sont parcourus de couloirs, zones de pêche, champs d’éoliennes, pipelines et câbles. Les ports sont des interfaces où conteneurs et données logistiques passent du navire au rail, à la route ou au fleuve. La distance maritime ne suffit pas : qualité du port, fiabilité et temps d’attente modifient le coût réel."
      },
      {
        "title": "2. Détroits et points de passage",
        "text": "Les chokepoints concentrent les flux parce que la géographie limite les itinéraires. Leur fermeture peut obliger les navires à contourner un continent, augmenter délais, assurances et consommation. Mais leur importance varie selon le produit : pétrole, gaz, céréales et conteneurs ne dépendent pas exactement des mêmes routes."
      },
      {
        "title": "3. Le droit de la mer",
        "text": "La convention des Nations unies sur le droit de la mer distingue mer territoriale, zone économique exclusive et haute mer. Dans sa ZEE, un État dispose de droits sur les ressources, mais ne possède pas l’océan comme un territoire terrestre. Les chevauchements, îles et plateaux continentaux produisent des négociations et des contentieux."
      },
      {
        "title": "4. Les câbles invisibles",
        "text": "Les satellites sont essentiels pour certains usages, mais les câbles transportent l’essentiel des volumes intercontinentaux grâce à leur capacité et leur faible latence. Ils peuvent être endommagés par ancres, séismes ou actes hostiles. Leur résilience dépend de routes alternatives et de réparations rapides, pas d’une invulnérabilité parfaite."
      },
      {
        "title": "5. Ce qu’est une puissance maritime",
        "text": "Une marine militaire ne suffit pas. Il faut aussi des chantiers navals, des armateurs, des assurances, des ports, des normes, des cartes, des satellites et des entreprises numériques. Les États coopèrent pour sécuriser les routes tout en se concurrençant pour les terminaux, les câbles et les ressources. La puissance se lit donc dans un système de réseaux."
      }
    ],
    "deeper": [
      {
        "title": "200 milles",
        "text": "La ZEE donne des droits économiques, pas une souveraineté identique à celle du territoire terrestre."
      },
      {
        "title": "Canal",
        "text": "Un canal artificiel peut réduire radicalement une distance, mais devient une infrastructure critique à entretenir."
      },
      {
        "title": "Câbles",
        "text": "Leur invisibilité sociale contraste avec leur rôle central dans la vie numérique."
      }
    ],
    "takeaways": [
      {
        "label": "Routes",
        "text": "Le commerce dépend d’infrastructures portuaires et logistiques."
      },
      {
        "label": "Détroits",
        "text": "La concentration crée efficacité et vulnérabilité."
      },
      {
        "label": "Droit",
        "text": "Les espaces marins ont des statuts distincts."
      },
      {
        "label": "Réseaux",
        "text": "Câbles et ports sont des instruments de puissance."
      }
    ],
    "quiz": [
      {
        "kind": "flux",
        "q": "Pourquoi le transport maritime est-il central ?",
        "a": "Il déplace de très grands volumes à faible coût relatif entre façades portuaires.",
        "choices": [
          "Il est toujours plus rapide que l’avion.",
          "Il n’utilise aucune infrastructure terrestre.",
          "Il concerne uniquement le pétrole."
        ],
        "why": "Le volume et les interfaces portuaires expliquent son rôle.",
        "trap": "",
        "evidence": "Express 1."
      },
      {
        "kind": "détroit",
        "q": "Pourquoi un chokepoint est-il vulnérable ?",
        "a": "De nombreux flux dépendent d’un passage étroit avec peu d’alternatives rapides.",
        "choices": [
          "Il se situe toujours hors de toute juridiction.",
          "Aucun navire ne peut y être suivi.",
          "Il ne transporte jamais d’énergie."
        ],
        "why": "La concentration transforme une perturbation locale en effet global.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "droit",
        "q": "Que permet une zone économique exclusive ?",
        "a": "Des droits sur l’exploration et l’exploitation des ressources marines.",
        "choices": [
          "La fermeture complète de toute navigation étrangère.",
          "L’annexion de toutes les îles voisines.",
          "La suppression de la haute mer."
        ],
        "why": "La ZEE n’est pas un territoire terrestre élargi.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "numérique",
        "q": "Pourquoi les câbles restent-ils essentiels malgré les satellites ?",
        "a": "Ils offrent une capacité massive et une faible latence pour les flux intercontinentaux.",
        "choices": [
          "Les satellites ne transmettent aucune donnée.",
          "Les câbles ne peuvent jamais être coupés.",
          "Ils fonctionnent sans station terrestre."
        ],
        "why": "Les deux systèmes sont complémentaires, mais les volumes reposent surtout sur la fibre.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "puissance",
        "q": "Qu’est-ce qui compose une puissance maritime ?",
        "a": "Flottes, ports, industrie, droit, finance, information et capacité de réparation.",
        "choices": [
          "Uniquement le nombre de navires de guerre.",
          "La superficie de la capitale.",
          "Le nombre de plages touristiques."
        ],
        "why": "La puissance est un système de réseaux et de compétences.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta233-premium"
  },
  "music-recording-studio-industry": {
    "hook": "Avant l’enregistrement, entendre une œuvre suppose presque toujours qu’un musicien la joue. Le phonographe sépare le son de sa source : une performance peut voyager, être répétée, vendue et comparée. Peu à peu, le studio cesse de seulement conserver la musique et devient un instrument capable de fabriquer des sons impossibles sur scène.",
    "keyFacts": [
      "1877 : le phonographe d’Edison enregistre et reproduit le son",
      "Le disque et la radio créent des marchés de masse",
      "Le microphone électrique transforme les voix et les styles d’interprétation",
      "La bande magnétique permet montage, overdub et multipiste",
      "Le streaming modifie rémunération, catalogue et découverte sans supprimer les intermédiaires"
    ],
    "express": [
      "Le phonographe inscrit une vibration dans un support. Les premiers cylindres puis les disques ont une durée et une dynamique limitées ; ces contraintes influencent la longueur des morceaux et les manières de jouer. Une interprétation enregistrée devient un objet reproductible, mais les musiciens doivent apprendre à jouer pour le pavillon puis le microphone.",
      "À partir des années 1920, l’enregistrement électrique capte plus finement la voix et les instruments. Le crooner peut chanter avec une intimité impossible dans une grande salle sans amplification. Radio, disque et cinéma sonore créent des vedettes, des répertoires standardisés et des industries qui sélectionnent ce qui sera distribué.",
      "Après la guerre, la bande magnétique rend le montage souple. Le multipiste enregistre séparément voix et instruments, permet corrections, superpositions et effets. Les Beatles, la musique électronique, le dub ou le hip-hop utilisent le studio non comme miroir d’un concert, mais comme espace de composition. Le numérique et le streaming prolongent cette séparation entre création, support et écoute."
    ],
    "complete": [
      {
        "title": "1. Fixer un son change la mémoire",
        "text": "Une tradition orale se transmet par performances successives ; un disque offre une version stable que l’on peut réécouter. Cette stabilité crée des références et des canons, mais ne supprime pas le jeu vivant. Les interprètes apprennent parfois à partir d’enregistrements, les imitent ou les détournent. La mémoire musicale devient à la fois humaine et technique."
      },
      {
        "title": "2. Formats et durée",
        "text": "Le cylindre, le 78 tours, le microsillon, la cassette, le CD et le fichier imposent des durées, des faces, une qualité et des gestes d’écoute. L’album long joue un rôle différent du single. Le bouton “passer” du streaming transforme encore l’attention. La technologie ne détermine pas seule la forme, mais elle ouvre et ferme des possibilités."
      },
      {
        "title": "3. Le microphone invente une proximité",
        "text": "Sans amplification, un chanteur doit projeter. Le microphone capte souffle, nuances et voix plus douce. Cette intimité devient un style esthétique et une relation médiatique. Dans le jazz, la pop ou la chanson, placement du micro, acoustique et compression participent au timbre autant que l’instrument."
      },
      {
        "title": "4. Le studio comme instrument",
        "text": "Avec la bande et le multipiste, une œuvre peut être assemblée à partir de prises réalisées à des moments différents. Réverbération, saturation, montage et panoramique produisent un espace sonore fabriqué. L’authenticité ne se mesure donc pas au nombre minimal de techniques : un traitement peut être un choix artistique assumé."
      },
      {
        "title": "5. Plateformes et économie de l’écoute",
        "text": "Le streaming donne accès à des catalogues immenses et permet une diffusion mondiale rapide. Il concentre aussi le pouvoir dans les plateformes, labels, agrégateurs et systèmes de recommandation. La rémunération dépend du volume d’écoute, des contrats et de la répartition des revenus. L’abondance de musique ne garantit ni visibilité ni diversité réelle."
      }
    ],
    "deeper": [
      {
        "title": "Bruit",
        "text": "Les défauts du vinyle, de la bande ou du numérique peuvent devenir des choix esthétiques recherchés."
      },
      {
        "title": "Mastering",
        "text": "La préparation finale adapte équilibre et dynamique au support et à la diffusion."
      },
      {
        "title": "Live",
        "text": "Un concert peut reproduire un disque ou au contraire réinventer une œuvre impossible à fixer définitivement."
      }
    ],
    "takeaways": [
      {
        "label": "Fixation",
        "text": "Le son devient répétable et commercialisable."
      },
      {
        "label": "Microphone",
        "text": "La technique transforme le style vocal."
      },
      {
        "label": "Studio",
        "text": "Montage et multipiste deviennent des outils de composition."
      },
      {
        "label": "Plateforme",
        "text": "L’accès élargi s’accompagne d’un nouveau pouvoir de distribution."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "Que change le phonographe ?",
        "a": "Il permet d’enregistrer puis de reproduire une performance sonore.",
        "choices": [
          "Il diffuse uniquement des partitions imprimées.",
          "Il amplifie un concert sans conserver le son.",
          "Il crée immédiatement le streaming."
        ],
        "why": "Le son devient un objet répétable.",
        "trap": "",
        "evidence": "Express 1."
      },
      {
        "kind": "style",
        "q": "Comment le microphone transforme-t-il le chant ?",
        "a": "Il permet des voix plus intimes et nuancées sans projection massive.",
        "choices": [
          "Il oblige tous les chanteurs à crier.",
          "Il supprime le timbre individuel.",
          "Il interdit les instruments acoustiques."
        ],
        "why": "La captation modifie la technique d’interprétation.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "studio",
        "q": "Pourquoi le multipiste est-il décisif ?",
        "a": "Il permet d’enregistrer séparément, corriger, superposer et traiter plusieurs sources.",
        "choices": [
          "Il rend impossible tout montage.",
          "Il limite l’enregistrement à une seule prise collective.",
          "Il ne fonctionne qu’avec des voix."
        ],
        "why": "Le studio devient un outil de composition.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "format",
        "q": "Pourquoi un support influence-t-il une œuvre ?",
        "a": "Durée, qualité, faces et gestes d’écoute orientent les formes possibles.",
        "choices": [
          "Le support détermine exactement le genre musical.",
          "Tous les supports ont les mêmes contraintes.",
          "La musique enregistrée n’a jamais de durée limitée."
        ],
        "why": "Technique et forme interagissent sans déterminisme absolu.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "économie",
        "q": "Quel paradoxe accompagne le streaming ?",
        "a": "L’accès massif coexiste avec une forte concentration du pouvoir de recommandation et de rémunération.",
        "choices": [
          "Il supprime tous les labels et intermédiaires.",
          "Il rémunère chaque artiste de façon identique.",
          "Il réduit les catalogues à quelques albums physiques."
        ],
        "why": "L’abondance ne garantit pas visibilité ni équité.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta233-premium"
  },
  "lit-shakespeare-stage-language": {
    "hook": "Shakespeare n’écrit pas des chefs-d’œuvre destinés à être lus silencieusement quatre siècles plus tard. Il écrit pour une compagnie, des acteurs, un bâtiment ouvert au bruit de Londres et un public socialement mêlé. Le texte est une partition de scène : vers, prose, silences et adresses au public fabriquent le pouvoir du théâtre.",
    "keyFacts": [
      "Le Globe est un théâtre public associé à la compagnie de Shakespeare",
      "Les rôles féminins sont joués par des garçons ou jeunes hommes",
      "Le vers blanc est un pentamètre iambique non rimé",
      "Le soliloque donne accès à une pensée sans garantir qu’elle soit vraie",
      "Les pièces circulent par représentations, manuscrits et éditions parfois divergentes"
    ],
    "express": [
      "Les théâtres londoniens de la fin du XVIe siècle accueillent plusieurs milliers de spectateurs. Le plateau s’avance dans la foule ; les décors sont limités et le langage doit faire apparaître palais, tempêtes ou champs de bataille. Le public voit aussi les autres spectateurs, ce qui rend l’expérience sociale et politique.",
      "Shakespeare alterne vers et prose. Le vers blanc donne rythme et tension sans imposer la rime ; une rupture métrique peut signaler hésitation ou violence. La prose sert conversations, comique ou changement de statut, mais aucune règle n’est mécanique. Les personnages adaptent leur langue à la situation et à l’interlocuteur.",
      "Hamlet, Macbeth, Othello ou Lear ne livrent pas une morale simple. Leurs soliloques exposent des raisonnements, des peurs et des stratégies que l’action peut contredire. Le spectateur devient juge d’une parole ambiguë. C’est aussi pourquoi les pièces supportent des mises en scène très différentes : le texte organise des conflits plutôt qu’une interprétation unique."
    ],
    "complete": [
      {
        "title": "1. Une entreprise de spectacle",
        "text": "Shakespeare est acteur, auteur et actionnaire dans une compagnie. Les pièces doivent attirer le public, s’adapter aux acteurs et répondre à la censure. Le théâtre est une activité commerciale autant qu’un art. Les collaborations entre auteurs sont fréquentes ; l’image du génie isolé travaillant hors de toute contrainte appartient surtout à la postérité."
      },
      {
        "title": "2. Un espace sans réalisme décoratif",
        "text": "Le Globe utilise trappes, galerie, costumes et accessoires, mais le langage construit une grande partie du lieu. Une phrase peut déplacer l’action d’une cour à une lande. Cette économie donne au spectateur un rôle actif : imaginer n’est pas combler un manque, c’est participer au dispositif."
      },
      {
        "title": "3. Vers, prose et pouvoir",
        "text": "Le pentamètre iambique crée une pulsation proche d’une alternance de syllabes faibles et fortes, mais les acteurs peuvent la déplacer. Le vers peut donner solennité ou conflit ; la prose peut signifier familiarité, folie jouée ou stratégie. Une analyse précise observe quand le personnage change de registre et ce que cela fait à la relation de pouvoir."
      },
      {
        "title": "4. Soliloque et vérité incertaine",
        "text": "Lorsqu’un personnage parle seul, le public entend une pensée qui serait cachée aux autres personnages. Pourtant, cette parole peut être contradictoire, théâtrale ou auto-justificatrice. Hamlet analyse sans cesse son action ; Macbeth transforme le désir en images. Le soliloque crée une proximité, mais pas une transparence parfaite."
      },
      {
        "title": "5. Des textes qui continuent à bouger",
        "text": "Les éditions anciennes ne sont pas toujours identiques ; certaines pièces existent en versions différentes. Chaque mise en scène choisit coupes, rythme, époque, corps et espace. Adapter Shakespeare n’est donc pas trahir un objet parfaitement fixe : c’est entrer dans une histoire de transmission, à condition de rendre lisibles les choix effectués."
      }
    ],
    "deeper": [
      {
        "title": "Auteurs multiples",
        "text": "Certaines pièces sont probablement collaboratives ; la compagnie et les imprimeurs participent aussi à la transmission."
      },
      {
        "title": "Femmes absentes ?",
        "text": "Les actrices ne jouent pas sur les scènes publiques anglaises, mais les femmes sont présentes comme spectatrices, lectrices, mécènes et travailleuses du spectacle."
      },
      {
        "title": "Traduire",
        "text": "Une traduction doit choisir entre rythme, jeu de mots, clarté et étrangeté : aucune version ne conserve tout."
      }
    ],
    "takeaways": [
      {
        "label": "Scène",
        "text": "Le texte est conçu pour un espace et des acteurs."
      },
      {
        "label": "Langue",
        "text": "Vers et prose modifient rythme et pouvoir."
      },
      {
        "label": "Soliloque",
        "text": "Une pensée offerte au public, pas une vérité garantie."
      },
      {
        "label": "Transmission",
        "text": "Éditions et mises en scène font vivre plusieurs versions."
      }
    ],
    "quiz": [
      {
        "kind": "contexte",
        "q": "Pourquoi les décors limités ne rendent-ils pas le théâtre pauvre ?",
        "a": "Le langage et l’imagination du public construisent rapidement lieux et événements.",
        "choices": [
          "Les pièces se déroulent toutes au même endroit.",
          "Le public ne regarde jamais la scène.",
          "Chaque représentation utilise des décors de cinéma."
        ],
        "why": "Le dispositif transforme le spectateur en partenaire.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "forme",
        "q": "Qu’est-ce que le vers blanc ?",
        "a": "Un vers non rimé, souvent organisé en pentamètre iambique.",
        "choices": [
          "Une prose sans ponctuation.",
          "Un vers toujours chanté et rimé.",
          "Une page laissée vide entre deux scènes."
        ],
        "why": "C’est une ressource rythmique majeure.",
        "trap": "",
        "evidence": "Express 2."
      },
      {
        "kind": "analyse",
        "q": "Que peut signifier un passage du vers à la prose ?",
        "a": "Un changement de relation, de registre ou de stratégie du personnage.",
        "choices": [
          "Une erreur automatique de l’imprimeur.",
          "La fin obligatoire de la pièce.",
          "L’absence totale de rythme."
        ],
        "why": "Le changement doit être interprété dans la scène.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "notion",
        "q": "Pourquoi un soliloque n’est-il pas une vérité pure ?",
        "a": "Le personnage peut se contredire, se mettre en scène ou se justifier.",
        "choices": [
          "Parce que le public ne l’entend pas.",
          "Parce qu’il est toujours prononcé par le narrateur.",
          "Parce qu’il n’utilise jamais la première personne."
        ],
        "why": "L’accès à la pensée reste dramatique et ambigu.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "transmission",
        "q": "Pourquoi existe-t-il plusieurs Shakespeare sur scène ?",
        "a": "Les textes anciens varient et chaque mise en scène choisit coupes, corps, rythme et contexte.",
        "choices": [
          "Parce que les pièces n’ont aucun texte.",
          "Parce que toute traduction est identique.",
          "Parce que le Globe interdisait les répétitions."
        ],
        "why": "La transmission est une histoire de choix.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta233-premium"
  },
  "lit-magical-realism-memory": {
    "hook": "Dans le réalisme magique, une ascension au ciel, un fantôme ou une pluie de fleurs peut être raconté avec la même évidence qu’un repas. L’étrange n’interrompt pas le réel : il révèle une histoire où mémoire familiale, violence politique, croyances et temps collectif ne se laissent pas enfermer dans une seule rationalité.",
    "keyFacts": [
      "Le terme “réalisme magique” précède son usage littéraire latino-américain",
      "Le mouvement est associé au Boom mais ne se réduit pas à García Márquez",
      "Le merveilleux est souvent raconté sans explication spectaculaire",
      "Histoire coloniale, mémoire et oralité structurent de nombreux récits",
      "Employer l’étiquette partout peut exotiser des œuvres très différentes"
    ],
    "express": [
      "Le terme vient d’abord d’un critique d’art allemand dans les années 1920, puis circule vers la littérature. En Amérique latine, des écrivains cherchent des formes capables de raconter des sociétés où archives coloniales, mythes, catholicisme, cultures autochtones et modernisation violente coexistent. Le réalisme magique n’est donc pas une simple fantaisie décorative.",
      "Dans Cent ans de solitude, Gabriel García Márquez raconte l’histoire de Macondo sur plusieurs générations. Les répétitions de noms, les guerres, l’insomnie et les apparitions brouillent le temps linéaire. Le ton narratif reste calme devant l’impossible, ce qui empêche le lecteur de séparer facilement réalité politique et légende familiale.",
      "D’autres écrivains, des Caraïbes, d’Afrique, d’Asie ou d’Europe, mêlent également merveilleux et histoire, mais leurs traditions diffèrent. Appeler toute œuvre non réaliste “réalisme magique” peut réduire des cosmologies et des expériences coloniales à une couleur exotique. L’étiquette est utile lorsqu’elle ouvre une comparaison précise, pas lorsqu’elle remplace la lecture."
    ],
    "complete": [
      {
        "title": "1. Une histoire du terme",
        "text": "Franz Roh utilise en 1925 l’expression allemande Magischer Realismus pour décrire une peinture attentive à l’étrangeté du quotidien. En littérature latino-américaine, le terme change de sens et se combine avec le “réel merveilleux” d’Alejo Carpentier. Il ne possède donc pas une définition intemporelle et unique."
      },
      {
        "title": "2. Le ton de l’évidence",
        "text": "Le narrateur peut annoncer un événement surnaturel sans surprise ni justification. Cette neutralité déplace la hiérarchie des savoirs : ce que le lecteur moderne juge impossible appartient au monde ordinaire des personnages. L’effet n’est pas seulement poétique ; il questionne qui a le droit de définir le réel et quelles expériences les récits officiels excluent."
      },
      {
        "title": "3. Temps circulaire et mémoire",
        "text": "Les générations répètent des noms, des erreurs ou des violences. Le passé revient sous forme de fantôme, de récit familial ou de catastrophe oubliée. Cette structure rend visible la difficulté à sortir d’une histoire coloniale et politique. La magie n’efface pas les faits : elle donne une forme à leur persistance."
      },
      {
        "title": "4. Histoire et archives",
        "text": "Dans de nombreux romans, une violence collective est niée ou effacée par les autorités. La rumeur, le mythe et la mémoire orale conservent ce que l’archive officielle supprime. Le lecteur doit cependant éviter d’opposer naïvement vérité populaire et mensonge écrit : le roman met en scène des mémoires concurrentes, elles aussi transformées."
      },
      {
        "title": "5. Une catégorie à manier avec prudence",
        "text": "Le succès international du terme a parfois conduit éditeurs et critiques à attendre des auteurs du Sud global qu’ils produisent du merveilleux. Une lecture premium nomme les traditions précises, observe le style et replace l’œuvre dans son histoire. Comparer García Márquez, Toni Morrison ou Salman Rushdie peut être fécond, à condition de ne pas les rendre interchangeables."
      }
    ],
    "deeper": [
      {
        "title": "Boom latino-américain",
        "text": "Il désigne une circulation internationale d’auteurs dans les années 1960-1970, pas un style unique."
      },
      {
        "title": "Réel merveilleux",
        "text": "Carpentier insiste sur une histoire et une expérience américaines qui rendent le merveilleux réel, plutôt que sur une technique importée."
      },
      {
        "title": "Exotisme",
        "text": "Le merveilleux peut être utilisé par le marché pour transformer des histoires politiques en décor séduisant."
      }
    ],
    "takeaways": [
      {
        "label": "Évidence",
        "text": "L’impossible est raconté comme une part du quotidien."
      },
      {
        "label": "Mémoire",
        "text": "Le passé revient et conteste les récits officiels."
      },
      {
        "label": "Pluralité",
        "text": "Plusieurs conceptions du réel coexistent."
      },
      {
        "label": "Prudence",
        "text": "L’étiquette ne doit pas effacer les traditions propres à chaque œuvre."
      }
    ],
    "quiz": [
      {
        "kind": "origine",
        "q": "D’où vient d’abord l’expression “réalisme magique” ?",
        "a": "D’une critique allemande de la peinture dans les années 1920.",
        "choices": [
          "D’un manifeste de García Márquez en 1967.",
          "D’une théorie antique de la tragédie.",
          "D’un genre cinématographique hollywoodien."
        ],
        "why": "Le terme change de sens en circulant.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "style",
        "q": "Quel effet produit le ton narratif neutre devant l’impossible ?",
        "a": "Il place le merveilleux dans l’ordre quotidien et questionne la définition du réel.",
        "choices": [
          "Il prouve que le narrateur ment toujours.",
          "Il transforme le roman en manuel scientifique.",
          "Il supprime toute dimension politique."
        ],
        "why": "L’évidence narrative déplace les hiérarchies de savoir.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "temps",
        "q": "Pourquoi le temps peut-il sembler circulaire ?",
        "a": "Les générations répètent noms, violences et oublis, faisant revenir le passé.",
        "choices": [
          "Les personnages ne vieillissent jamais.",
          "Le roman se déroule en une seule journée.",
          "L’auteur refuse toute chronologie."
        ],
        "why": "La répétition donne une forme à la mémoire historique.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "archive",
        "q": "Quel rôle peut jouer le merveilleux face à une histoire effacée ?",
        "a": "Conserver sous forme de mémoire et de récit ce que l’autorité nie.",
        "choices": [
          "Remplacer tous les faits par des mensonges.",
          "Empêcher les personnages de se souvenir.",
          "Garantir qu’une rumeur est toujours exacte."
        ],
        "why": "Le roman confronte des formes de mémoire.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "méthode",
        "q": "Pourquoi faut-il employer l’étiquette avec prudence ?",
        "a": "Elle peut exotiser et rendre interchangeables des traditions littéraires différentes.",
        "choices": [
          "Elle ne s’applique qu’aux livres pour enfants.",
          "Elle interdit toute comparaison internationale.",
          "Elle désigne uniquement les récits sans politique."
        ],
        "why": "Une catégorie doit guider la lecture, non la remplacer.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta233-premium"
  }
};
  const MYSTERIES = [
  {
    "id": "history-mystery-95-theses-233",
    "discipline": "history",
    "difficulty": "moyen",
    "title": "Une controverse imprimée",
    "caseTitle": "Une liste qui embrase l’Europe",
    "subjectType": "texte religieux et politique",
    "periodHint": "Empire germanique · 1517",
    "lessonId": "history-reformations-print-culture",
    "prompt": "Un professeur de théologie conteste la vente d’indulgences. Sa liste de propositions circule rapidement bien au-delà du débat universitaire.",
    "answer": "Les 95 thèses",
    "aliases": [
      "95 theses",
      "les quatre vingt quinze theses",
      "quatre-vingt-quinze thèses",
      "les 95 thèses de Luther"
    ],
    "clues": [
      "Elles sont associées à Martin Luther.",
      "Elles datent de 1517.",
      "L’imprimerie amplifie leur circulation."
    ],
    "explanation": "Les 95 thèses ouvrent une controverse sur les indulgences qui devient l’un des repères de la Réforme.",
    "blockedGuesses": [
      "luther",
      "reforme",
      "indulgences"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "history-mystery-plantation-233",
    "discipline": "history",
    "difficulty": "moyen",
    "title": "Un domaine de contrainte et d’exportation",
    "caseTitle": "Sucre, capital et travail forcé",
    "subjectType": "système économique colonial",
    "periodHint": "Atlantique · XVIIe-XIXe siècles",
    "lessonId": "history-atlantic-slavery-plantations",
    "prompt": "Une grande exploitation produit surtout pour un marché lointain. Son rendement repose sur une discipline violente et sur le droit de posséder des êtres humains.",
    "answer": "La plantation esclavagiste",
    "aliases": [
      "plantation",
      "plantation esclavagiste",
      "une plantation",
      "plantation coloniale"
    ],
    "clues": [
      "Le sucre, le café, le tabac ou le coton y sont cultivés.",
      "Elle ne se réduit pas à une grande ferme.",
      "Elle combine capital, exportation et esclavage."
    ],
    "explanation": "La plantation esclavagiste est une institution économique, juridique et sociale du monde atlantique.",
    "blockedGuesses": [
      "esclavage",
      "commerce triangulaire",
      "sucre"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "art-mystery-daguerreotype-233",
    "discipline": "art",
    "difficulty": "moyen",
    "title": "Une image unique sur métal",
    "caseTitle": "Portrait sans négatif",
    "subjectType": "procédé photographique",
    "periodHint": "France · 1839",
    "lessonId": "art-photography-new-vision",
    "prompt": "Une plaque argentée enregistre une image très détaillée. Elle ne permet pas directement de multiplier les tirages, mais fascine les premiers ateliers de portrait.",
    "answer": "Le daguerréotype",
    "aliases": [
      "daguerreotype",
      "le daguerréotype",
      "daguerréotypie"
    ],
    "clues": [
      "Le procédé est associé à Louis Daguerre.",
      "L’image obtenue est unique.",
      "Son annonce publique date de 1839."
    ],
    "explanation": "Le daguerréotype est l’un des premiers procédés photographiques diffusés à grande échelle.",
    "blockedGuesses": [
      "photographie",
      "negatif",
      "camera"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "cinema-mystery-documentary-233",
    "discipline": "cinema",
    "difficulty": "facile",
    "title": "Le réel monté en film",
    "caseTitle": "Témoigner sans prétendre être invisible",
    "subjectType": "forme cinématographique",
    "periodHint": "XXe-XXIe siècles",
    "lessonId": "cinema-documentary-truth",
    "prompt": "Il travaille avec des personnes, des lieux et des archives réels, mais cadre, coupe et construit toujours un point de vue.",
    "answer": "Le documentaire",
    "aliases": [
      "documentaire",
      "cinema documentaire",
      "film documentaire",
      "un documentaire"
    ],
    "clues": [
      "Il peut observer, enquêter ou témoigner.",
      "La reconstitution n’y est pas forcément interdite.",
      "Son éthique concerne les personnes filmées."
    ],
    "explanation": "Le documentaire construit un rapport au réel par tournage, montage, sources et responsabilité.",
    "blockedGuesses": [
      "reportage",
      "fiction",
      "archive"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "science-mystery-double-helix-233",
    "discipline": "science-inventions",
    "difficulty": "facile",
    "title": "Une échelle torsadée",
    "caseTitle": "Deux brins complémentaires",
    "subjectType": "structure moléculaire",
    "periodHint": "1953",
    "lessonId": "sci-genetics-dna-history",
    "prompt": "Deux chaînes s’enroulent. Les bases de l’une déterminent celles de l’autre, ce qui suggère un mécanisme de copie.",
    "answer": "La double hélice de l’ADN",
    "aliases": [
      "double helice",
      "double hélice",
      "adn",
      "structure en double hélice",
      "double helix"
    ],
    "clues": [
      "Les bases A s’associent avec T, et C avec G.",
      "Rosalind Franklin fournit des données de diffraction décisives.",
      "Le modèle est proposé en 1953."
    ],
    "explanation": "La double hélice explique la complémentarité et rend imaginable la réplication de l’ADN.",
    "blockedGuesses": [
      "chromosome",
      "gene",
      "photo 51"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "astronomy-mystery-event-horizon-233",
    "discipline": "astronomy",
    "difficulty": "moyen",
    "title": "Une frontière sans retour",
    "caseTitle": "Dernier signal possible",
    "subjectType": "frontière gravitationnelle",
    "periodHint": "Relativité générale",
    "lessonId": "astro-black-holes-relativity",
    "prompt": "Ce n’est pas une surface solide. Une fois franchie, toutes les trajectoires futures restent dirigées vers l’intérieur et aucun message ne revient.",
    "answer": "L’horizon des événements",
    "aliases": [
      "horizon des evenements",
      "horizon des événements",
      "l horizon des événements",
      "event horizon"
    ],
    "clues": [
      "Il entoure un trou noir.",
      "Sa position dépend de la masse et de la rotation.",
      "La lumière émise au-delà ne peut atteindre l’extérieur."
    ],
    "explanation": "L’horizon des événements est une frontière causale définie par la géométrie de l’espace-temps.",
    "blockedGuesses": [
      "singularite",
      "trou noir",
      "disque d accretion"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "economy-mystery-comparative-advantage-233",
    "discipline": "economy",
    "difficulty": "difficile",
    "title": "Le meilleur choix relatif",
    "caseTitle": "Produire là où le renoncement est moindre",
    "subjectType": "notion économique",
    "periodHint": "Commerce international",
    "lessonId": "eco-comparative-advantage-trade",
    "prompt": "Même un pays moins productif dans tous les secteurs peut en posséder un si son coût d’opportunité y est relativement plus faible.",
    "answer": "L’avantage comparatif",
    "aliases": [
      "avantage comparatif",
      "l avantage comparatif",
      "comparative advantage"
    ],
    "clues": [
      "Il ne faut pas le confondre avec l’avantage absolu.",
      "David Ricardo en donne une formulation classique.",
      "Il dépend de ce qu’on renonce à produire."
    ],
    "explanation": "L’avantage comparatif compare les coûts d’opportunité relatifs et explique un gain possible à l’échange.",
    "blockedGuesses": [
      "avantage absolu",
      "libre echange",
      "productivite"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "geography-mystery-submarine-cable-233",
    "discipline": "geography",
    "difficulty": "moyen",
    "title": "Une autoroute invisible sous la mer",
    "caseTitle": "Fibre entre les continents",
    "subjectType": "infrastructure numérique",
    "periodHint": "Océans contemporains",
    "lessonId": "geo-oceans-cables-maritime-power",
    "prompt": "Elle repose au fond des océans, rejoint des stations côtières et transporte la majorité des données intercontinentales.",
    "answer": "Le câble sous-marin",
    "aliases": [
      "cable sous marin",
      "câble sous-marin",
      "cables sous marins",
      "fibre sous marine"
    ],
    "clues": [
      "Il peut être endommagé par une ancre ou un séisme.",
      "Des navires spécialisés le réparent.",
      "Il complète les satellites mais porte bien plus de volume."
    ],
    "explanation": "Les câbles sous-marins de fibre optique forment l’infrastructure physique majeure de l’Internet mondial.",
    "blockedGuesses": [
      "satellite",
      "internet",
      "fibre optique"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "music-mystery-multitrack-233",
    "discipline": "music",
    "difficulty": "moyen",
    "title": "Des prises séparées, un seul morceau",
    "caseTitle": "Composer dans le studio",
    "subjectType": "technique d’enregistrement",
    "periodHint": "Après 1945",
    "lessonId": "music-recording-studio-industry",
    "prompt": "La voix, la batterie et les guitares peuvent être enregistrées à des moments différents, corrigées puis superposées avant le mixage.",
    "answer": "L’enregistrement multipiste",
    "aliases": [
      "multipiste",
      "enregistrement multipiste",
      "multi piste",
      "multitrack"
    ],
    "clues": [
      "La bande magnétique facilite son développement.",
      "Il permet les overdubs.",
      "Le studio devient un instrument de composition."
    ],
    "explanation": "Le multipiste sépare les sources sonores afin de les assembler et de les traiter indépendamment.",
    "blockedGuesses": [
      "mixage",
      "microphone",
      "streaming"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "literature-mystery-soliloquy-233",
    "discipline": "literature",
    "difficulty": "moyen",
    "title": "Une pensée offerte au public",
    "caseTitle": "Seul en scène, jamais totalement transparent",
    "subjectType": "procédé théâtral",
    "periodHint": "Théâtre élisabéthain",
    "lessonId": "lit-shakespeare-stage-language",
    "prompt": "Un personnage parle sans interlocuteur visible. Le public entend son raisonnement, mais cette proximité ne garantit ni sincérité parfaite ni cohérence.",
    "answer": "Le soliloque",
    "aliases": [
      "soliloque",
      "le soliloque",
      "monologue interieur",
      "monologue seul en scene"
    ],
    "clues": [
      "Hamlet en utilise plusieurs.",
      "Il peut révéler hésitation ou stratégie.",
      "Il ne faut pas le confondre avec une vérité objective du narrateur."
    ],
    "explanation": "Le soliloque expose la pensée dramatique d’un personnage tout en conservant son ambiguïté.",
    "blockedGuesses": [
      "monologue",
      "aparté",
      "narrateur"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "literature-mystery-magical-realism-233",
    "discipline": "literature",
    "difficulty": "moyen",
    "title": "Le merveilleux raconté sans surprise",
    "caseTitle": "Un quotidien où le fantôme reste à table",
    "subjectType": "mode littéraire",
    "periodHint": "XXe siècle",
    "lessonId": "lit-magical-realism-memory",
    "prompt": "Des événements impossibles sont racontés avec un ton calme. Ils révèlent souvent une mémoire familiale, coloniale ou politique que le récit officiel ne suffit pas à contenir.",
    "answer": "Le réalisme magique",
    "aliases": [
      "realisme magique",
      "réalisme magique",
      "magic realism",
      "realismo magico"
    ],
    "clues": [
      "García Márquez lui est souvent associé.",
      "Le terme vient d’abord de la critique d’art.",
      "Il ne désigne pas toute littérature fantastique."
    ],
    "explanation": "Le réalisme magique intègre le merveilleux au quotidien pour interroger mémoire, histoire et pluralité du réel.",
    "blockedGuesses": [
      "fantastique",
      "merveilleux",
      "cent ans de solitude"
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

  const quality = Object.fromEntries(Object.entries(PACKS).map(([id, content]) => [id, rawPublishedQuality(content)]));
  const audit = {
    version:VERSION,
    lessons:Object.keys(PACKS).length,
    worlds:Object.values(WORLDS).flat().length,
    groups:Object.values(GROUPS).flat().length,
    mysteries:MYSTERIES.length,
    quality,
    ok:Object.keys(PACKS).length === 14 && Object.values(quality).every(item => item.pass)
  };
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version:VERSION, premium233:audit }; } catch {}
  if (!audit.ok) try { console.warn("HistoDaily beta233 premium content audit", audit); } catch {}
  try { if (typeof renderSoon === "function") renderSoon(); } catch {}
})();
