/* HistoDaily beta 235 — extension éditoriale premium multi-disciplines. */
(function histodailyBeta234PremiumContent(){
  "use strict";
  const VERSION = "1.0.0-beta.246.0";
  const GROUPS = {
  "history": [
    {
      "id": "indian-ocean-worlds",
      "title": "4. Réseaux de l’océan Indien",
      "range": "VIIe → XVIIIe siècle",
      "description": "Ports, moussons, diasporas marchandes, pèlerinages et circulations entre Afrique, Moyen-Orient, Inde et Asie du Sud-Est."
    },
    {
      "id": "industrial-asia",
      "title": "9. Asies face à l’industrialisation et aux empires",
      "range": "XIXe → début du XXe siècle",
      "description": "Réformes, souveraineté, empires coloniaux et transformations rapides au Japon et en Asie."
    }
  ],
  "art": [
    {
      "id": "art-worlds-design",
      "title": "6. Arts du monde et design moderne",
      "range": "VIIe → XXe siècle",
      "description": "Arts islamiques, architecture, calligraphie, objet, modernisme et naissance du design industriel."
    }
  ]
};
  const WORLDS = {
  "history": [
    {
      "id": "history-indian-ocean-networks",
      "title": "L’océan Indien avant la domination européenne",
      "emoji": "⛵",
      "subtitle": "Moussons, ports et diasporas",
      "timeframe": "VIIe → XVIIIe siècle",
      "accent": "#14b8a6",
      "group": "indian-ocean-worlds",
      "sortStart": 700,
      "sortEnd": 1750,
      "unlockedByDefault": false
    },
    {
      "id": "history-meiji-japan",
      "title": "Le Japon de Meiji",
      "emoji": "🗾",
      "subtitle": "Réformes, industrie et empire",
      "timeframe": "1853 → 1912",
      "accent": "#ef4444",
      "group": "industrial-asia",
      "sortStart": 1853,
      "sortEnd": 1912,
      "unlockedByDefault": false
    }
  ],
  "art": [
    {
      "id": "art-islamic-arts",
      "title": "Arts islamiques : espace, écriture et motif",
      "emoji": "🕌",
      "subtitle": "Mosquées, objets, géométrie et calligraphie",
      "timeframe": "VIIe → XVIIe siècle",
      "accent": "#0ea5e9",
      "group": "art-worlds-design",
      "sortStart": 45,
      "discipline": "art",
      "planned": true,
      "unlockedByDefault": false
    },
    {
      "id": "art-bauhaus-design",
      "title": "Bauhaus et naissance du design moderne",
      "emoji": "◼️",
      "subtitle": "Forme, fonction, atelier et industrie",
      "timeframe": "1919 → 1933",
      "accent": "#f43f5e",
      "group": "art-worlds-design",
      "sortStart": 46,
      "discipline": "art",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "cinema": [
    {
      "id": "cinema-animation-language",
      "title": "Donner vie à l’image",
      "emoji": "🎞️",
      "subtitle": "Dessin, volume, cadence et mise en scène",
      "timeframe": "1900 → aujourd’hui",
      "accent": "#22c55e",
      "group": "cinema-contemporary",
      "sortStart": 42,
      "discipline": "cinema",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "science-inventions": [
    {
      "id": "sci-plate-tectonics",
      "title": "Tectonique des plaques",
      "emoji": "🌍",
      "subtitle": "Continents mobiles, séismes et fonds océaniques",
      "timeframe": "1912 → 1968",
      "accent": "#f97316",
      "group": "sci-earth-life",
      "sortStart": 13,
      "discipline": "science-inventions",
      "planned": true,
      "unlockedByDefault": false
    },
    {
      "id": "sci-antibiotics-resistance",
      "title": "Antibiotiques et résistances",
      "emoji": "💊",
      "subtitle": "Découverte, sélection et santé publique",
      "timeframe": "1928 → aujourd’hui",
      "accent": "#10b981",
      "group": "sci-medicine-tech",
      "sortStart": 32,
      "discipline": "science-inventions",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "astronomy": [
    {
      "id": "astro-gaia-milky-way",
      "title": "Cartographier la Voie lactée avec Gaia",
      "emoji": "🛰️",
      "subtitle": "Parallaxe, mouvements et archéologie galactique",
      "timeframe": "2013 → aujourd’hui",
      "accent": "#60a5fa",
      "group": "astro-foundations",
      "sortStart": 4,
      "discipline": "astronomy",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "economy": [
    {
      "id": "eco-externalities-public-goods",
      "title": "Externalités et biens publics",
      "emoji": "🌿",
      "subtitle": "Pollution, passagers clandestins et action collective",
      "timeframe": "Économie publique",
      "accent": "#22c55e",
      "group": "eco-crises-policy",
      "sortStart": 32,
      "discipline": "economy",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "geography": [
    {
      "id": "geo-food-systems",
      "title": "Systèmes alimentaires mondialisés",
      "emoji": "🌾",
      "subtitle": "Terres, chaînes de valeur et sécurité alimentaire",
      "timeframe": "Monde contemporain",
      "accent": "#eab308",
      "group": "geo-resources",
      "sortStart": 42,
      "discipline": "geography",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "music": [
    {
      "id": "music-beethoven-public-concert",
      "title": "Beethoven et le concert public",
      "emoji": "🎹",
      "subtitle": "Symphonie, auteur et nouveau public",
      "timeframe": "1770 → 1827",
      "accent": "#a78bfa",
      "group": "music-classical-romantic",
      "sortStart": 32,
      "discipline": "music",
      "planned": true,
      "unlockedByDefault": false
    }
  ],
  "literature": [
    {
      "id": "lit-modernism-consciousness",
      "title": "Modernisme et flux de conscience",
      "emoji": "🧠",
      "subtitle": "Temps intérieur, voix et fragmentation",
      "timeframe": "1900 → 1945",
      "accent": "#8b5cf6",
      "group": "lit-modernities",
      "sortStart": 42,
      "discipline": "literature",
      "planned": true,
      "unlockedByDefault": false
    }
  ]
};
  const LESSONS = {
  "history-indian-ocean-networks": [
    {
      "id": "history-indian-ocean-monsoon-networks",
      "title": "L’océan Indien : moussons, ports et mondes connectés",
      "period": "VIIe → XVIIIe siècle",
      "location": "Afrique orientale, mer Rouge, golfe Persique, Inde et Asie du Sud-Est",
      "emoji": "⛵",
      "xp": 80,
      "order": 1
    }
  ],
  "history-meiji-japan": [
    {
      "id": "history-meiji-restoration-industrial-japan",
      "title": "Le Japon de Meiji : réformer pour rester souverain",
      "period": "1853 → 1912",
      "location": "Japon et Asie orientale",
      "emoji": "🗾",
      "xp": 85,
      "order": 1
    }
  ],
  "art-islamic-arts": [
    {
      "id": "art-islamic-space-calligraphy-pattern",
      "title": "Arts islamiques : architecture, calligraphie et géométrie",
      "period": "VIIe → XVIIe siècle",
      "location": "Méditerranée, Moyen-Orient, Iran, Asie centrale et Inde",
      "emoji": "🕌",
      "xp": 75,
      "order": 1
    }
  ],
  "art-bauhaus-design": [
    {
      "id": "art-bauhaus-modern-design",
      "title": "Le Bauhaus : unir art, artisanat et industrie",
      "period": "1919 → 1933",
      "location": "Weimar, Dessau, Berlin",
      "emoji": "◼️",
      "xp": 75,
      "order": 1
    }
  ],
  "cinema-animation-language": [
    {
      "id": "cinema-animation-movement-techniques",
      "title": "Cinéma d’animation : fabriquer le mouvement image par image",
      "period": "1900 → aujourd’hui",
      "location": "Europe, États-Unis, Japon et studios mondiaux",
      "emoji": "🎞️",
      "xp": 75,
      "order": 1
    }
  ],
  "sci-plate-tectonics": [
    {
      "id": "science-plate-tectonics-evidence",
      "title": "Tectonique des plaques : comment la Terre est devenue mobile",
      "period": "1912 → 1968",
      "location": "Sciences de la Terre",
      "emoji": "🌍",
      "xp": 80,
      "order": 1
    }
  ],
  "sci-antibiotics-resistance": [
    {
      "id": "science-antibiotics-resistance-public-health",
      "title": "Antibiotiques : victoire médicale et évolution des résistances",
      "period": "1928 → aujourd’hui",
      "location": "Microbiologie et santé publique",
      "emoji": "💊",
      "xp": 80,
      "order": 1
    }
  ],
  "astro-gaia-milky-way": [
    {
      "id": "astro-gaia-milky-way-map",
      "title": "Gaia : mesurer un milliard d’étoiles pour reconstruire la Voie lactée",
      "period": "2013 → aujourd’hui",
      "location": "Voie lactée",
      "emoji": "🛰️",
      "xp": 80,
      "order": 1
    }
  ],
  "eco-externalities-public-goods": [
    {
      "id": "eco-externalities-public-goods-policy",
      "title": "Externalités et biens publics : quand le prix oublie une partie du problème",
      "period": "Économie publique",
      "location": "Politiques publiques et environnement",
      "emoji": "🌿",
      "xp": 75,
      "order": 1
    }
  ],
  "geo-food-systems": [
    {
      "id": "geo-global-food-systems",
      "title": "Du champ à l’assiette : géographie des systèmes alimentaires",
      "period": "Monde contemporain",
      "location": "Chaînes agricoles et alimentaires mondiales",
      "emoji": "🌾",
      "xp": 75,
      "order": 1
    }
  ],
  "music-beethoven-public-concert": [
    {
      "id": "music-beethoven-symphony-public",
      "title": "Beethoven : la symphonie, l’auteur et le public moderne",
      "period": "Fin du XVIIIe → début du XIXe siècle",
      "location": "Vienne et Europe",
      "emoji": "🎹",
      "xp": 75,
      "order": 1
    }
  ],
  "lit-modernism-consciousness": [
    {
      "id": "lit-modernism-stream-consciousness",
      "title": "Modernisme : raconter le temps intérieur",
      "period": "1900 → 1945",
      "location": "Europe et Amériques",
      "emoji": "🧠",
      "xp": 75,
      "order": 1
    }
  ]
};
  const PACKS = {
  "history-indian-ocean-monsoon-networks": {
    "hook": "Bien avant que les Portugais n’arrivent au cap de Bonne-Espérance, l’océan Indien formait déjà un monde de circulations régulières. Les marins n’y naviguaient pas au hasard : ils organisaient départs et retours selon le rythme saisonnier des moussons.",
    "keyFacts": [
      "Les vents de mousson structurent les calendriers maritimes",
      "Les ports relient arrière-pays et routes océaniques",
      "Des diasporas marchandes créent confiance, crédit et traduction",
      "Islam, hindouisme et bouddhisme circulent avec les personnes",
      "L’arrivée européenne transforme sans remplacer immédiatement les réseaux existants"
    ],
    "express": [
      "Entre la côte swahilie, Aden, Ormuz, le Gujarat, le Kerala, Malacca et les ports indonésiens, les échanges transportent épices, textiles, porcelaines, chevaux, métaux, ivoire et personnes. Les moussons inversent périodiquement la direction des vents : un marchand peut séjourner plusieurs mois dans un port en attendant la saison favorable au retour.",
      "Ces escales deviennent des villes cosmopolites. Des communautés arabes, persanes, indiennes, juives, arméniennes, chinoises ou malaises maintiennent des liens familiaux et commerciaux à grande distance. Elles fournissent information, traduction, crédit et arbitrage. Aucun empire unique ne contrôle durablement tout l’océan ; la sécurité dépend d’accords locaux et de puissances régionales.",
      "À partir de 1498, les Portugais cherchent à taxer et militariser certaines routes. Leur artillerie navale leur donne un avantage dans des points stratégiques, mais ils ne créent pas le commerce indien. Ottomans, sultanats, Moghols, Hollandais, Anglais et marchands asiatiques continuent de rivaliser. L’histoire de cet océan est donc celle d’un réseau réorganisé, non d’un monde soudain ouvert par l’Europe."
    ],
    "complete": [
      {
        "title": "1. La mousson comme infrastructure naturelle",
        "text": "Les vents de l’océan Indien changent de direction selon les saisons sous l’effet des contrastes thermiques entre continents et océans. Les navigateurs apprennent à planifier leurs traversées à partir de ce rythme. La mousson ne rend pas le voyage automatique : récifs, tempêtes, courants, maladies et erreurs restent dangereux. Mais elle fournit une régularité suffisante pour construire des calendriers commerciaux à longue distance.\n\nCette temporalité explique les séjours prolongés dans les ports. Le commerce crée ainsi des quartiers, des mariages et des communautés installées entre plusieurs rives."
      },
      {
        "title": "2. Des ports reliés à de vastes arrière-pays",
        "text": "Kilwa, Calicut, Cambay, Aden ou Malacca ne sont pas de simples quais. Ils concentrent entrepôts, marchés, taxes, artisans et autorités politiques. Leur prospérité dépend aussi des routes terrestres : l’or et l’ivoire arrivent de l’intérieur africain ; les cotonnades sont produites dans plusieurs régions indiennes ; les épices viennent notamment d’Asie du Sud-Est.\n\nLe port est donc une interface. Il traduit les monnaies, les poids, les langues et les règles de plusieurs espaces économiques."
      },
      {
        "title": "3. Diasporas, confiance et crédit",
        "text": "À longue distance, un marchand ne peut pas tout vérifier lui-même. Il s’appuie sur des parents, des associés et des intermédiaires réputés. Les diasporas marchandes facilitent les lettres de crédit, le stockage, la collecte d’informations et le règlement des litiges. Elles ne forment pas des blocs fermés : elles coopèrent avec des autorités et partenaires d’autres origines.\n\nLa confiance repose sur la réputation, mais aussi sur les tribunaux, contrats, serments et protections politiques disponibles dans chaque port."
      },
      {
        "title": "4. Religions et cultures en circulation",
        "text": "L’islam se diffuse largement le long des côtes et des routes marchandes, sans effacer les sociétés antérieures. Des mosquées, sanctuaires, langues et pratiques juridiques apparaissent dans des contextes locaux très différents. Le bouddhisme avait déjà circulé entre l’Inde, Sri Lanka et l’Asie du Sud-Est ; l’hindouisme marque aussi des royaumes et des arts régionaux.\n\nLes échanges ne produisent donc pas une culture uniforme. Ils multiplient les emprunts, les traductions et les identités composites."
      },
      {
        "title": "5. L’irruption des compagnies européennes",
        "text": "Les Portugais tentent d’imposer des passes maritimes et de contrôler des détroits. Les compagnies néerlandaise et anglaise disposent ensuite de capitaux, d’armées et de privilèges accordés par leurs États. Elles s’insèrent toutefois dans des marchés déjà organisés et dépendent longtemps de producteurs, courtiers et marins asiatiques.\n\nLeur puissance augmente avec la conquête territoriale et la fiscalité coloniale. Il faut distinguer présence navale, contrôle de quelques ports et domination économique complète, qui n’arrivent ni partout ni au même moment."
      }
    ],
    "deeper": [
      {
        "title": "La côte swahilie",
        "text": "Ses villes parlent des langues bantoues enrichies d’emprunts et relient l’Afrique intérieure aux circuits océaniques."
      },
      {
        "title": "Malacca",
        "text": "Sa position près d’un détroit majeur en fait un carrefour du XVe siècle, avant sa prise par les Portugais en 1511."
      },
      {
        "title": "Pas de route unique",
        "text": "Les marchandises passent par plusieurs segments et changent souvent de navire et de propriétaire."
      }
    ],
    "takeaways": [
      {
        "label": "Moussons",
        "text": "Elles rendent les traversées saisonnières prévisibles."
      },
      {
        "label": "Ports",
        "text": "Ils articulent mer, arrière-pays et institutions."
      },
      {
        "label": "Diasporas",
        "text": "Elles organisent information, crédit et confiance."
      },
      {
        "label": "Europe",
        "text": "Elle transforme un réseau ancien au lieu de le créer."
      }
    ],
    "quiz": [
      {
        "kind": "mécanisme",
        "q": "Pourquoi les moussons comptent-elles autant pour le commerce ?",
        "a": "Elles fournissent des vents saisonniers dont la direction permet de planifier départs et retours.",
        "choices": [
          "Elles empêchent toute tempête dans l’océan Indien.",
          "Elles font disparaître les courants marins.",
          "Elles permettent de traverser sans escale ni calendrier."
        ],
        "why": "Leur régularité structure les itinéraires.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "fonction",
        "q": "Quel rôle joue un grand port comme Calicut ou Malacca ?",
        "a": "Il relie les routes maritimes à des arrière-pays, des marchés et des institutions.",
        "choices": [
          "Il produit à lui seul toutes les marchandises échangées.",
          "Il interdit le commerce aux étrangers.",
          "Il dépend uniquement d’un empire continental unique."
        ],
        "why": "Le port est une interface économique et politique.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "réseau",
        "q": "Pourquoi les diasporas marchandes sont-elles importantes ?",
        "a": "Elles fournissent confiance, information, crédit et intermédiaires à longue distance.",
        "choices": [
          "Elles remplacent toutes les autorités locales.",
          "Elles suppriment le besoin de contrats.",
          "Elles n’échangent qu’avec des membres de leur propre religion."
        ],
        "why": "La réputation et les relais réduisent les risques.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "nuance",
        "q": "Que change l’arrivée portugaise après 1498 ?",
        "a": "Elle militarise et taxe certaines routes sans créer ni contrôler immédiatement tout le commerce.",
        "choices": [
          "Elle ouvre pour la première fois un océan jusque-là vide.",
          "Elle met fin en quelques années à tous les marchands asiatiques.",
          "Elle supprime les moussons et les escales."
        ],
        "why": "L’expansion européenne s’insère dans des réseaux existants.",
        "trap": "",
        "evidence": "Section 5."
      },
      {
        "kind": "méthode",
        "q": "Pourquoi faut-il éviter l’idée d’une seule route des épices ?",
        "a": "Les produits circulent par de nombreux itinéraires, ports et intermédiaires.",
        "choices": [
          "Toutes les épices viennent d’un seul archipel.",
          "Les marchands utilisent toujours le même navire.",
          "Aucun produit ne voyage par voie terrestre."
        ],
        "why": "Le réseau est segmenté et changeant.",
        "trap": "",
        "evidence": "Approfondissement 3."
      }
    ],
    "editorialRevision": "beta234-premium"
  },
  "history-meiji-restoration-industrial-japan": {
    "hook": "La restauration de Meiji n’est pas le réveil soudain d’un pays immobile. Elle accélère des transformations déjà engagées et répond à une menace précise : préserver la souveraineté japonaise dans un monde dominé par les puissances industrielles et les traités inégaux.",
    "keyFacts": [
      "L’arrivée des navires américains en 1853 fragilise le shogunat",
      "Le pouvoir impérial est restauré en 1868",
      "L’État réforme armée, impôts, école et administration",
      "L’industrialisation combine initiatives publiques et entreprises privées",
      "La modernisation nourrit aussi expansion impériale et fortes tensions sociales"
    ],
    "express": [
      "En 1853, l’escadre du commodore Perry exige l’ouverture de ports japonais. Les traités qui suivent limitent les tarifs douaniers et accordent des privilèges aux étrangers. Le shogunat Tokugawa perd une partie de sa légitimité. Des domaines puissants, notamment Satsuma et Chōshū, renversent l’ordre politique au nom de l’empereur en 1868.",
      "Le nouvel État abolit les domaines féodaux, crée des préfectures, lève un impôt foncier en argent, impose la conscription et construit une école nationale. Il envoie des missions étudier les institutions étrangères, mais ne copie pas un modèle unique. Constitution, armée, marine, justice et industrie empruntent à plusieurs pays puis sont adaptées aux objectifs japonais.",
      "Les réformes ont un coût. Des anciens samouraïs perdent leurs privilèges ; des paysans subissent l’impôt et les fluctuations des prix ; les ouvrières du textile travaillent dans des conditions difficiles. Après ses victoires contre la Chine puis la Russie, le Japon devient une puissance impériale. La souveraineté préservée se transforme donc aussi en domination de la Corée, de Taïwan et d’autres territoires."
    ],
    "complete": [
      {
        "title": "1. Une crise de souveraineté",
        "text": "Le Japon Tokugawa n’est pas totalement fermé : il commerce notamment avec Hollandais, Chinois, Coréens et Aïnous dans des cadres contrôlés. L’arrivée de Perry change cependant le rapport de force. Les canons et les traités imposés rappellent les défaites chinoises face aux puissances occidentales.\n\nLe débat ne porte pas seulement sur l’ouverture. Il porte sur qui peut négocier au nom du pays et comment éviter de devenir une colonie ou une semi-colonie."
      },
      {
        "title": "2. Restaurer l’empereur, construire un État",
        "text": "La restauration présente l’empereur comme source de légitimité, mais le nouveau gouvernement est dirigé par une oligarchie issue de certains domaines. Les anciennes seigneuries sont supprimées et remplacées par des préfectures. Un cadastre et un impôt monétaire stabilisent les finances ; la conscription retire aux samouraïs le monopole du métier militaire.\n\nLa centralisation ne se fait pas sans résistances, dont la rébellion de Satsuma en 1877."
      },
      {
        "title": "3. Apprendre sans se dissoudre",
        "text": "La mission Iwakura parcourt les États-Unis et l’Europe entre 1871 et 1873. Ses membres observent écoles, usines, parlements, tribunaux et armées. Ils concluent que la puissance repose autant sur les institutions et l’éducation que sur les machines.\n\nLe Japon adopte une constitution en 1889 et un parlement, mais le pouvoir exécutif et impérial reste fort. La modernisation est sélective : l’État choisit les outils jugés utiles à son autonomie."
      },
      {
        "title": "4. Industrie, infrastructures et travail",
        "text": "L’État finance chemins de fer, télégraphe, arsenaux et usines modèles, puis revend certaines entreprises à des groupes privés. Le textile, souvent fondé sur le travail féminin, fournit des exportations essentielles. Les conglomérats appelés zaibatsu prennent une place croissante.\n\nCette industrialisation rapide ne signifie pas que tout le pays devient urbain ou riche. Elle s’appuie sur les prélèvements agricoles, la discipline du travail et des inégalités importantes."
      },
      {
        "title": "5. De la défense à l’empire",
        "text": "La victoire contre la Chine en 1895, l’annexion de Taïwan, puis la guerre russo-japonaise de 1904-1905 modifient l’équilibre asiatique. En 1910, la Corée est annexée. Le Japon obtient la révision des traités inégaux mais reproduit à son tour des pratiques impériales.\n\nPrésenter Meiji comme une réussite technique sans étudier conquêtes, violences coloniales et contestations ouvrières donne donc une histoire incomplète."
      }
    ],
    "deeper": [
      {
        "title": "“Occidentalisation”",
        "text": "Le mot masque les choix japonais, les emprunts multiples et la continuité de pratiques locales."
      },
      {
        "title": "Femmes et textile",
        "text": "Les ouvrières des filatures contribuent fortement aux exportations qui financent l’industrialisation."
      },
      {
        "title": "Mémoire de Meiji",
        "text": "La période sert encore de référence politique, parfois idéalisée comme unité nationale et réussite réformatrice."
      }
    ],
    "takeaways": [
      {
        "label": "Crise",
        "text": "Les traités imposés déclenchent une recomposition politique."
      },
      {
        "label": "État",
        "text": "Centralisation, école et conscription soutiennent la réforme."
      },
      {
        "label": "Industrie",
        "text": "Elle associe investissement public, capitaux privés et travail contraint."
      },
      {
        "label": "Empire",
        "text": "La souveraineté retrouvée débouche aussi sur la colonisation."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "Quel événement fragilise fortement le shogunat à partir de 1853 ?",
        "a": "L’arrivée de Perry et l’imposition de traités ouvrant des ports.",
        "choices": [
          "La prise de Tokyo par la Russie.",
          "L’abolition immédiate de l’empereur.",
          "La découverte du pétrole à Hokkaidō."
        ],
        "why": "La crise vient d’un rapport de force international.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "réforme",
        "q": "Pourquoi la conscription est-elle politiquement importante ?",
        "a": "Elle construit une armée nationale et retire aux samouraïs leur monopole militaire.",
        "choices": [
          "Elle restaure tous les privilèges féodaux.",
          "Elle interdit l’usage des armes modernes.",
          "Elle réserve le service aux marchands étrangers."
        ],
        "why": "L’armée devient un instrument de centralisation.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "méthode",
        "q": "Que montre la mission Iwakura ?",
        "a": "Le gouvernement étudie plusieurs modèles étrangers pour sélectionner des institutions utiles.",
        "choices": [
          "Le Japon copie intégralement la constitution américaine.",
          "Les dirigeants refusent de visiter les usines.",
          "La modernisation se limite à l’achat de canons."
        ],
        "why": "Les emprunts sont comparés et adaptés.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "économie",
        "q": "Quel secteur fournit une part essentielle des premières exportations industrielles ?",
        "a": "Le textile, largement alimenté par le travail féminin.",
        "choices": [
          "L’automobile de masse.",
          "Le pétrole offshore.",
          "L’aviation civile."
        ],
        "why": "Les filatures financent une partie de l’industrialisation.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi le bilan de Meiji ne peut-il être seulement célébré ?",
        "a": "La modernisation s’accompagne d’inégalités et d’une expansion coloniale.",
        "choices": [
          "Le pays renonce à toute industrie.",
          "Le parlement supprime immédiatement l’empereur.",
          "Le Japon perd sa souveraineté après 1905."
        ],
        "why": "Réforme interne et impérialisme sont liés.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta234-premium"
  },
  "art-islamic-space-calligraphy-pattern": {
    "hook": "Parler d’« art islamique » ne désigne ni un style unique ni l’absence générale de figures humaines. L’expression rassemble des œuvres produites pendant plus d’un millénaire, dans des sociétés très différentes, reliées par des pouvoirs, des religions, des langues et des circulations.",
    "keyFacts": [
      "La mosquée organise un espace rituel sans plan universel",
      "La calligraphie peut être texte, décor et signe de prestige",
      "Géométrie et arabesque reposent sur répétition et variation",
      "La figuration existe dans les manuscrits, palais et objets",
      "Matériaux et techniques circulent entre régions et ateliers"
    ],
    "express": [
      "Les premières mosquées adaptent des formes variées : maison à cour, salle hypostyle, coupole, iwan ou plan central. L’orientation vers La Mecque, le mur de qibla et le mihrab structurent le rituel, mais n’imposent pas une architecture identique de Cordoue à Ispahan ou Istanbul. Chaque dynastie transforme les modèles disponibles.",
      "L’écriture arabe acquiert une force visuelle particulière parce que le Coran est révélé en arabe et copié avec soin. Des inscriptions courent sur les murs, objets et monnaies. Elles peuvent être lues, mais aussi vues comme rythme. Les motifs géométriques et végétaux utilisent symétries, entrelacs, répétitions et changements d’échelle sans réduire l’œuvre à une formule mathématique.",
      "L’idée d’une interdiction absolue des images est fausse. Les espaces religieux privilégient souvent l’écriture et l’ornement non figuratif, tandis que des manuscrits persans, des palais omeyyades, des céramiques ou des ivoires montrent humains et animaux. Il faut distinguer contexte, fonction, époque et commanditaire plutôt que chercher une règle valable partout."
    ],
    "complete": [
      {
        "title": "1. Une catégorie construite par l’histoire de l’art",
        "text": "Les empires omeyyade, abbasside, fatimide, seldjoukide, mongol, timouride, ottoman, safavide ou moghol ne produisent pas le même art. Ils gouvernent des populations musulmanes et non musulmanes, emploient des artisans de plusieurs traditions et échangent avec Byzance, l’Inde, la Chine ou l’Europe.\n\nL’étiquette « islamique » est utile pour étudier des connexions, mais elle devient trompeuse si elle fait croire à une essence immobile ou uniquement religieuse."
      },
      {
        "title": "2. Construire l’espace de la mosquée",
        "text": "La mosquée accueille la prière collective et oriente les fidèles vers la qibla. Le minbar sert au sermon ; une cour ou une salle couverte répond aux usages et au climat. Mais aucune liste ne suffit à décrire toutes les mosquées.\n\nÀ Cordoue, les arcs superposés créent une forêt de supports ; à Ispahan, les iwans organisent la cour ; les Ottomans développent de vastes espaces sous coupoles. L’architecture négocie rituel, technique et représentation du pouvoir."
      },
      {
        "title": "3. L’écriture comme matière visuelle",
        "text": "Les calligraphes travaillent proportions, épaisseur, rythme et support. Une inscription coranique peut rappeler une parole sacrée ; une titulature affirme un souverain ; un poème persan accompagne une image. Les styles dits coufiques, cursifs ou monumentaux ne correspondent pas à une simple évolution linéaire.\n\nLire une inscription demande donc d’observer son contenu, sa visibilité et sa place. Un texte placé très haut peut être moins destiné à une lecture continue qu’à envelopper l’espace d’une autorité verbale."
      },
      {
        "title": "4. Géométrie, arabesque et travail de l’atelier",
        "text": "Les mosaïques, stucs, bois, briques et carreaux permettent de développer réseaux d’étoiles, polygones, rinceaux et entrelacs. Des tracés géométriques peuvent guider la composition, mais l’œuvre dépend aussi de gestes, modules, couleurs et imperfections.\n\nLa répétition n’est pas monotonie : un motif change selon l’échelle, la lumière et la surface. Sur un dôme, une page ou un coffret, il produit des effets différents. L’ornement structure l’objet autant qu’il le couvre."
      },
      {
        "title": "5. Images, usages et circulations",
        "text": "Les manuscrits illustrés montrent batailles, banquets, prophètes ou héros littéraires selon des conventions variables. Certains visages sont voilés ou effacés dans des contextes précis ; ailleurs, la figuration est pleinement assumée. Les objets de luxe circulent entre cours et marchés, transportant techniques et motifs.\n\nL’étude doit éviter deux simplifications opposées : prétendre que la figuration est absente, ou ignorer les débats religieux et politiques qui encadrent certaines images."
      }
    ],
    "deeper": [
      {
        "title": "Muqarnas",
        "text": "Ces structures alvéolées articulent corniches, coupoles et niches tout en captant la lumière."
      },
      {
        "title": "Céramique",
        "text": "Les échanges avec la Chine stimulent des recherches sur glaçures, blanc, bleu et imitation de la porcelaine."
      },
      {
        "title": "Patrimoine",
        "text": "Restaurations et musées peuvent isoler des fragments décoratifs de leur architecture et de leurs usages d’origine."
      }
    ],
    "takeaways": [
      {
        "label": "Pluralité",
        "text": "Aucun style unique ne résume les arts islamiques."
      },
      {
        "label": "Espace",
        "text": "La mosquée combine rituel, climat, technique et pouvoir."
      },
      {
        "label": "Écriture",
        "text": "Le texte est aussi rythme, matière et autorité."
      },
      {
        "label": "Images",
        "text": "La figuration dépend du contexte plutôt que d’une interdiction absolue."
      }
    ],
    "quiz": [
      {
        "kind": "nuance",
        "q": "Pourquoi l’expression « art islamique » doit-elle être maniée avec prudence ?",
        "a": "Elle regroupe des régions, périodes et fonctions très diverses.",
        "choices": [
          "Elle ne concerne que des œuvres produites à La Mecque.",
          "Elle désigne un style inchangé depuis le VIIe siècle.",
          "Elle exclut tout objet profane."
        ],
        "why": "La catégorie relie sans homogénéiser.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "architecture",
        "q": "Quel élément oriente la prière dans une mosquée ?",
        "a": "La qibla, souvent signalée par le mihrab.",
        "choices": [
          "Le clocher occidental.",
          "La scène de théâtre.",
          "Le baptistère central."
        ],
        "why": "L’espace répond à une orientation rituelle.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "lecture",
        "q": "Pourquoi une inscription peut-elle être importante même si elle est difficile à lire de près ?",
        "a": "Elle produit un rythme visuel et manifeste une autorité dans l’espace.",
        "choices": [
          "Elle prouve que le texte n’a aucun contenu.",
          "Elle sert uniquement de signature secrète.",
          "Elle remplace toute structure architecturale."
        ],
        "why": "Visibilité, contenu et emplacement doivent être étudiés ensemble.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "ornement",
        "q": "Que montre l’analyse des motifs géométriques ?",
        "a": "La répétition combine calcul, matériaux, gestes et variations d’échelle.",
        "choices": [
          "Chaque motif est produit automatiquement sans artisan.",
          "La géométrie interdit toute couleur.",
          "Tous les réseaux possèdent la même signification religieuse."
        ],
        "why": "Le tracé ne suffit pas à expliquer l’objet.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "figuration",
        "q": "Quelle affirmation est la plus juste ?",
        "a": "La figuration existe, mais ses usages varient selon les contextes religieux, politiques et matériels.",
        "choices": [
          "Toute image humaine est absente de toutes les sociétés musulmanes.",
          "Les mosquées sont toujours couvertes de portraits de souverains.",
          "Les manuscrits ne contiennent jamais d’animaux."
        ],
        "why": "Il faut distinguer lieux, périodes et fonctions.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta234-premium"
  },
  "art-bauhaus-modern-design": {
    "hook": "Le Bauhaus n’a pas inventé à lui seul le modernisme et ne se résume pas à des chaises tubulaires. Cette école allemande, active seulement quatorze ans, cherche à transformer la formation artistique en confrontant atelier, architecture, industrie et vie quotidienne.",
    "keyFacts": [
      "Walter Gropius fonde l’école à Weimar en 1919",
      "Le cours préliminaire expérimente matériaux, couleurs et formes",
      "Les ateliers produisent textile, mobilier, typographie et objets",
      "Le rapport à l’industrie évolue entre artisanat et production en série",
      "La fermeture par les nazis diffuse paradoxalement ses acteurs à l’étranger"
    ],
    "express": [
      "Après la Première Guerre mondiale, Gropius réunit à Weimar une école d’art et une école d’arts appliqués. Le manifeste célèbre l’édifice collectif, mais le Bauhaus commence sans département d’architecture stable. Les élèves suivent un cours préliminaire puis travaillent dans des ateliers dirigés par un maître de forme et un maître artisan.",
      "L’école change d’orientation. Les premières années valorisent expression, expérimentation et artisanat ; à Dessau, elle cherche davantage des prototypes adaptés à l’industrie et à l’habitat moderne. Marcel Breuer travaille le tube d’acier, Marianne Brandt le métal, Anni Albers le textile, Herbert Bayer la typographie. Les femmes restent pourtant souvent orientées vers l’atelier de tissage malgré le discours d’égalité.",
      "Le Bauhaus est attaqué par la droite nationaliste puis fermé en 1933 sous pression nazie. Ses enseignants et élèves émigrent, notamment aux États-Unis, en Palestine mandataire et ailleurs. Son influence vient autant de cette dispersion que de ses bâtiments. Mais beaucoup d’idées modernistes existent aussi chez De Stijl, le constructivisme, Le Corbusier ou d’autres écoles."
    ],
    "complete": [
      {
        "title": "1. Une réforme de l’enseignement",
        "text": "Le Bauhaus veut rompre avec la séparation entre beaux-arts prestigieux et arts appliqués. Le cours préliminaire fait manipuler papier, bois, métal, verre, couleur et volume avant la spécialisation. Johannes Itten, puis László Moholy-Nagy et Josef Albers proposent des pédagogies différentes.\n\nL’objectif n’est pas une recette stylistique unique, mais une attention aux propriétés des matériaux, à la perception et à la construction. Cette diversité interne est souvent effacée par l’image d’un Bauhaus uniquement blanc, géométrique et rationnel."
      },
      {
        "title": "2. De Weimar à Dessau",
        "text": "L’école dépend des autorités publiques et subit les changements politiques locaux. Elle quitte Weimar en 1925 pour Dessau, où Gropius construit un bâtiment devenu emblématique : façades vitrées, volumes distincts et circulation visible.\n\nL’architecture exprime une organisation pédagogique, mais elle sert aussi de vitrine. Les photographies soigneusement cadrées participent à la réputation internationale de l’école. En 1932, un nouveau déplacement vers Berlin précède la fermeture."
      },
      {
        "title": "3. Atelier, prototype et industrie",
        "text": "Les ateliers expérimentent des objets destinés à être reproduits, mais la production en série reste souvent limitée. La fameuse lampe Wagenfeld ou les meubles tubulaires deviennent des icônes, parfois longtemps après leur création.\n\nLe design ne consiste pas simplement à supprimer l’ornement. Il organise usages, fabrication, coûts, entretien et relation au corps. Un objet apparemment fonctionnel peut aussi être cher, inconfortable ou réservé à une élite. La fonction doit être vérifiée, pas proclamée."
      },
      {
        "title": "4. Genre et travail invisible",
        "text": "Le Bauhaus accepte des étudiantes en nombre important, mais l’administration cherche rapidement à limiter leur accès à certains ateliers. Beaucoup sont dirigées vers le textile, considéré comme féminin. Or cet atelier devient l’un des plus innovants et économiquement viables.\n\nAnni Albers, Gunta Stölzl ou Otti Berger développent structures, couleurs et matériaux techniques. Leur reconnaissance tardive montre comment l’histoire du design a longtemps privilégié architecture et mobilier masculin."
      },
      {
        "title": "5. Héritage, mythe et récupération",
        "text": "Après 1933, les trajectoires divergent. Certains membres fuient le nazisme ; d’autres s’adaptent ou collaborent à différents degrés. Aux États-Unis, le « New Bauhaus » et les écoles de design reprennent certaines méthodes.\n\nLe mot Bauhaus devient ensuite une marque de modernité vendue par les musées, les entreprises et l’immobilier. Étudier cet héritage exige de séparer les œuvres réelles, les ambitions sociales, les échecs et le mythe rétrospectif d’un style universel."
      }
    ],
    "deeper": [
      {
        "title": "Photographie",
        "text": "Les vues du bâtiment de Dessau construisent autant sa célébrité que son usage quotidien."
      },
      {
        "title": "Logement social",
        "text": "Hannes Meyer insiste davantage que Gropius sur les besoins collectifs, le coût et l’analyse sociale."
      },
      {
        "title": "Couleurs",
        "text": "Les intérieurs du Bauhaus ne sont pas tous blancs ; murs et circulations emploient aussi des couleurs fonctionnelles ou expressives."
      }
    ],
    "takeaways": [
      {
        "label": "École",
        "text": "Le Bauhaus réforme la formation par l’expérimentation matérielle."
      },
      {
        "label": "Industrie",
        "text": "Le passage du prototype à la série reste un objectif inégalement atteint."
      },
      {
        "label": "Genre",
        "text": "Le discours d’égalité coexiste avec une forte orientation sexuée des ateliers."
      },
      {
        "label": "Mythe",
        "text": "Son héritage mondial est amplifié par l’exil et la mise en récit."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "Quand et où le Bauhaus est-il fondé ?",
        "a": "À Weimar en 1919, sous la direction de Walter Gropius.",
        "choices": [
          "À Paris en 1889 par Le Corbusier.",
          "À New York en 1945 par Moholy-Nagy.",
          "À Moscou en 1917 par Kandinsky."
        ],
        "why": "La fondation suit la Première Guerre mondiale.",
        "trap": "",
        "evidence": "Express 1."
      },
      {
        "kind": "pédagogie",
        "q": "À quoi sert le cours préliminaire ?",
        "a": "À explorer matériaux, couleur, forme et perception avant la spécialisation.",
        "choices": [
          "À copier uniquement l’architecture grecque.",
          "À former seulement des ingénieurs militaires.",
          "À remplacer tous les ateliers par des cours théoriques."
        ],
        "why": "La manipulation constitue la base de la formation.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "design",
        "q": "Pourquoi “forme suit fonction” ne suffit-il pas à juger un objet ?",
        "a": "La fonction réelle dépend aussi de l’usage, du coût, du corps et de la fabrication.",
        "choices": [
          "Parce que le design ne concerne jamais les utilisateurs.",
          "Parce que tous les objets doivent recevoir un décor historique.",
          "Parce que l’industrie interdit les prototypes."
        ],
        "why": "Une déclaration fonctionnelle doit être testée.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "genre",
        "q": "Quel paradoxe concerne les étudiantes ?",
        "a": "Elles sont nombreuses mais souvent cantonnées au textile, atelier pourtant majeur et innovant.",
        "choices": [
          "Elles sont totalement interdites dès 1919.",
          "Elles dirigent seules tous les départements d’architecture.",
          "Elles ne produisent aucune œuvre conservée."
        ],
        "why": "L’ouverture officielle ne supprime pas les hiérarchies.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "héritage",
        "q": "Pourquoi l’influence du Bauhaus s’étend-elle après 1933 ?",
        "a": "La dispersion internationale de ses membres diffuse ses méthodes et son image.",
        "choices": [
          "Le régime nazi en fait son école officielle.",
          "L’école reste ouverte à Dessau jusqu’en 1960.",
          "Tous les bâtiments européens sont immédiatement reconstruits selon ses plans."
        ],
        "why": "L’exil participe à la mondialisation du mythe.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta234-premium"
  },
  "cinema-animation-movement-techniques": {
    "hook": "Le cinéma d’animation ne désigne pas un genre réservé aux enfants : c’est une manière de produire du mouvement à partir d’images fabriquées, photographiées ou calculées. Chaque technique transforme le temps, la matière et le jeu d’acteur.",
    "keyFacts": [
      "La persistance visuelle seule n’explique pas l’illusion de mouvement",
      "Le dessin animé organise poses clés et intervalles",
      "Le stop-motion anime des objets réels image par image",
      "L’animation limitée économise les dessins en stylisant le mouvement",
      "Le numérique modifie les outils sans supprimer les choix de mise en scène"
    ],
    "express": [
      "Quand des images légèrement différentes sont projetées rapidement, le cerveau construit une continuité. Cette perception dépend de plusieurs mécanismes et ne se réduit pas à une image qui resterait simplement imprimée sur la rétine. Les pionniers utilisent dessins, silhouettes, marionnettes, peinture sur verre ou objets déplacés entre chaque prise.",
      "Dans l’animation dessinée, les poses clés définissent les étapes fortes d’un geste ; des intervalles complètent le passage. Les studios organisent le travail entre scénario graphique, layout, animation, décors, couleur et montage. Disney industrialise certains procédés, mais d’autres traditions privilégient métamorphose, abstraction ou économie de mouvement.",
      "Le stop-motion conserve la texture de matériaux photographiés, tandis que l’image de synthèse construit volumes, éclairages et mouvements dans un espace numérique. Pourtant, aucun logiciel ne décide du rythme, du poids ou du regard. Le cinéma d’animation reste une écriture : cadrage, son, montage et design donnent sens à des images qui n’existaient pas comme mouvement avant leur fabrication."
    ],
    "complete": [
      {
        "title": "1. Fabriquer une continuité",
        "text": "Un film projette une succession d’images fixes, mais l’impression de mouvement vient du traitement cérébral des changements, des trajectoires et du contexte. Les jouets optiques du XIXe siècle — phénakistiscope, zootrope, praxinoscope — explorent déjà cette continuité.\n\nL’animateur ne cherche pas toujours le réalisme. Il peut étirer un corps, sauter des étapes ou transformer une ligne en animal. L’animation rend visible la construction du mouvement et autorise des lois physiques choisies."
      },
      {
        "title": "2. Dessins, poses et travail collectif",
        "text": "Le dessin animé traditionnel repose souvent sur des poses clés qui organisent intention et équilibre. Les intervallistes ajoutent les dessins intermédiaires ; le layout prépare espace et caméra ; les décors créent l’environnement. Les feuilles de celluloïd ont permis de séparer personnages et fonds, mais elles imposent aussi une chaîne de production.\n\nLa fluidité n’est pas seulement un nombre élevé d’images. Une pose lisible et un bon timing peuvent produire plus de vie qu’une interpolation uniforme."
      },
      {
        "title": "3. Stop-motion : le poids de la matière",
        "text": "Marionnettes, pâte à modeler, papier découpé ou objets sont déplacés très légèrement puis photographiés. La lumière, les empreintes et les vibrations deviennent visibles. Les animateurs préparent armatures, bouches, costumes et repères de déplacement.\n\nLe procédé exige une anticipation extrême : revenir exactement à une position précédente est difficile. Cette contrainte donne au stop-motion une présence matérielle particulière, exploitée de Ladislas Starewitch à Ray Harryhausen, puis Aardman ou Laika."
      },
      {
        "title": "4. Animation limitée et styles mondiaux",
        "text": "Pour réduire coûts et délais, certains studios réutilisent cycles, décors ou parties du corps. Cette animation dite limitée n’est pas nécessairement pauvre. Elle peut concentrer l’attention sur le montage, la composition, les voix et quelques mouvements expressifs.\n\nLa télévision américaine, les studios japonais et de nombreux cinémas d’auteur développent des solutions différentes. L’anime n’est pas un style unique : il rassemble des genres, publics et techniques variés, de la série hebdomadaire au long métrage très animé."
      },
      {
        "title": "5. Le numérique change la chaîne, pas le problème artistique",
        "text": "L’animation 3D utilise modèles, squelettes, textures, simulations et rendus. La capture de mouvement enregistre certains gestes, mais demande nettoyage et interprétation. L’animation 2D numérique peut conserver un dessin manuel tout en modifiant couleur et compositing.\n\nLe choix essentiel reste la mise en scène : où regarder, combien de temps tenir une pose, comment articuler son et image. Un rendu techniquement complexe peut rester inexpressif si le mouvement n’a ni intention ni rythme."
      }
    ],
    "deeper": [
      {
        "title": "Douze images par seconde",
        "text": "Un dessin peut être tenu sur deux photogrammes ; la cadence varie selon l’effet recherché."
      },
      {
        "title": "Rotoscopie",
        "text": "Elle consiste à redessiner à partir d’images filmées, avec des résultats allant du réalisme à la déformation."
      },
      {
        "title": "Son",
        "text": "Voix, bruitages et musique peuvent guider la perception d’un mouvement plus fortement que le dessin seul."
      }
    ],
    "takeaways": [
      {
        "label": "Illusion",
        "text": "Le mouvement est construit par la succession et l’interprétation perceptive."
      },
      {
        "label": "Timing",
        "text": "Poses, durée et espacement donnent poids et intention."
      },
      {
        "label": "Matière",
        "text": "Chaque technique possède des contraintes visuelles propres."
      },
      {
        "label": "Numérique",
        "text": "Il transforme la production sans automatiser la mise en scène."
      }
    ],
    "quiz": [
      {
        "kind": "perception",
        "q": "Pourquoi l’explication par la seule “persistance rétinienne” est-elle insuffisante ?",
        "a": "L’illusion de mouvement mobilise plusieurs mécanismes perceptifs qui interprètent les changements.",
        "choices": [
          "La rétine ne reçoit jamais d’image fixe.",
          "Les films projettent réellement des objets en mouvement.",
          "Le cerveau ignore totalement la succession des images."
        ],
        "why": "La perception reconstruit continuité et trajectoire.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "technique",
        "q": "Quel est le rôle des poses clés ?",
        "a": "Elles définissent les moments structurants et l’intention d’un mouvement.",
        "choices": [
          "Elles remplacent le scénario et le son.",
          "Elles colorient automatiquement tous les décors.",
          "Elles servent uniquement à mesurer la durée du générique."
        ],
        "why": "Le geste se construit autour de positions fortes.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "matière",
        "q": "Qu’est-ce qui distingue le stop-motion ?",
        "a": "Des objets réels sont déplacés puis photographiés image par image.",
        "choices": [
          "Il repose uniquement sur des acteurs filmés en continu.",
          "Il interdit toute lumière artificielle.",
          "Il est produit sans caméra ni rendu."
        ],
        "why": "La matière et ses imperfections restent visibles.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi l’animation limitée n’est-elle pas automatiquement médiocre ?",
        "a": "Elle peut déplacer l’invention vers la composition, le montage et quelques mouvements choisis.",
        "choices": [
          "Elle contient toujours plus de dessins que l’animation fluide.",
          "Elle ne concerne que les films muets.",
          "Elle supprime tout travail de mise en scène."
        ],
        "why": "L’économie technique peut devenir un style.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "numérique",
        "q": "Que ne décide pas automatiquement un logiciel 3D ?",
        "a": "Le rythme, l’intention, le regard et le poids dramatique du mouvement.",
        "choices": [
          "Le nombre de pixels d’une image.",
          "La possibilité d’enregistrer un fichier.",
          "L’existence d’une caméra virtuelle."
        ],
        "why": "La technique ne remplace pas les choix artistiques.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta234-premium"
  },
  "science-plate-tectonics-evidence": {
    "hook": "Wegener avait raison sur la mobilité des continents, mais il ne possédait pas le mécanisme capable de convaincre la majorité des géologues. La tectonique des plaques s’impose plus tard grâce à une convergence de cartes océaniques, magnétisme, séismes et mesures géodésiques.",
    "keyFacts": [
      "Wegener propose la dérive des continents en 1912",
      "Les dorsales fabriquent de la lithosphère océanique",
      "Les bandes magnétiques enregistrent les inversions du champ terrestre",
      "Séismes et volcans dessinent les limites de plaques",
      "La subduction recycle la lithosphère dans le manteau"
    ],
    "express": [
      "Les ressemblances entre côtes, roches, fossiles et traces glaciaires suggèrent à Wegener que les continents ont été réunis. Mais son idée rencontre deux objections : les ajustements de côtes ne suffisent pas comme preuve, et les forces proposées pour déplacer des continents à travers le plancher océanique sont trop faibles. La dérive reste marginale plusieurs décennies.",
      "Après 1945, le sonar révèle dorsales et fosses. Les mesures magnétiques montrent des bandes symétriques de part et d’autre des dorsales, correspondant aux inversions du champ terrestre enregistrées par les basaltes. Le plancher se forme, s’écarte et vieillit. Les foyers sismiques inclinés sous certaines marges indiquent qu’une plaque plonge : c’est la subduction.",
      "La théorie décrit des plaques lithosphériques rigides se déplaçant sur des couches plus déformables. Leurs limites peuvent diverger, converger ou coulisser. Elle explique ensemble séismes, volcanisme, chaînes de montagnes et ouverture des océans, sans prédire précisément chaque catastrophe. Aujourd’hui, GPS et satellites mesurent directement des mouvements de quelques millimètres à centimètres par an."
    ],
    "complete": [
      {
        "title": "1. Les indices continentaux de Wegener",
        "text": "Wegener rassemble la continuité de chaînes de montagnes, la présence des mêmes fossiles sur plusieurs continents et des traces climatiques incompatibles avec leur position actuelle. Il propose la Pangée puis sa fragmentation.\n\nSes adversaires ne rejettent pas tous les indices, mais contestent le mécanisme. Imaginer des continents traversant une croûte océanique supposée fixe pose un problème mécanique. Une bonne hypothèse peut donc rester insuffisante tant qu’elle n’explique pas comment le phénomène se produit."
      },
      {
        "title": "2. Découvrir le relief des océans",
        "text": "Les campagnes océanographiques cartographient une chaîne de dorsales mondiale, des fosses profondes et une croûte océanique plus mince que la croûte continentale. Harry Hess propose l’expansion des fonds océaniques : du magma remonte aux dorsales, se solidifie, puis le plancher s’écarte.\n\nCette idée transforme la question. Les continents ne labourent plus un fond fixe ; ils sont transportés avec la lithosphère au sein de plaques plus vastes."
      },
      {
        "title": "3. Les bandes magnétiques comme enregistrement",
        "text": "En refroidissant, certains minéraux des basaltes s’orientent selon le champ magnétique terrestre. Comme ce champ s’inverse au cours du temps, le plancher océanique enregistre des bandes de polarité alternée. Leur symétrie autour des dorsales correspond à une création bilatérale du fond.\n\nEn combinant âge radiométrique et chronologie des inversions, les géologues calculent des vitesses d’expansion. La preuve devient quantitative et prédictive."
      },
      {
        "title": "4. Subduction, séismes et montagnes",
        "text": "Les foyers de séismes s’alignent en profondeur sous les arcs volcaniques, dessinant la plaque qui plonge. La lithosphère océanique froide retourne dans le manteau ; l’eau libérée favorise la fusion partielle et le volcanisme. Quand deux continents convergent, leur faible densité limite la subduction complète et épaissit la croûte, formant de grandes chaînes.\n\nLes limites transformantes, comme la faille de San Andreas, accommodent un glissement horizontal sans créer ni détruire beaucoup de lithosphère."
      },
      {
        "title": "5. Une théorie mesurable mais non magique",
        "text": "Le GPS suit aujourd’hui les déplacements relatifs de stations fixées au sol. Les cartes de vitesse confirment les mouvements des plaques et la déformation de certaines zones. Cependant, connaître la limite ne donne pas la date exacte du prochain séisme.\n\nLa tectonique fournit un cadre pour estimer aléas et accumulations de contrainte. La prévention exige en plus bâtiments adaptés, histoire locale, surveillance et politiques publiques."
      }
    ],
    "deeper": [
      {
        "title": "Moteurs",
        "text": "La subduction des plaques froides, la convection et les forces aux dorsales contribuent ensemble aux mouvements."
      },
      {
        "title": "Points chauds",
        "text": "Des alignements volcaniques comme Hawaï permettent d’étudier le déplacement d’une plaque au-dessus d’une source mantellique."
      },
      {
        "title": "Planète singulière",
        "text": "La Terre est la seule planète connue avec une tectonique globale active de plaques comparable à la nôtre."
      }
    ],
    "takeaways": [
      {
        "label": "Wegener",
        "text": "Il réunit des indices solides mais manque d’un mécanisme convaincant."
      },
      {
        "label": "Océans",
        "text": "Les dorsales et bandes magnétiques révèlent l’expansion."
      },
      {
        "label": "Subduction",
        "text": "Elle recycle la lithosphère et concentre séismes et volcans."
      },
      {
        "label": "Mesure",
        "text": "Le GPS confirme les vitesses sans prédire l’heure des séismes."
      }
    ],
    "quiz": [
      {
        "kind": "histoire",
        "q": "Pourquoi la dérive de Wegener n’est-elle pas immédiatement acceptée ?",
        "a": "Son mécanisme pour déplacer les continents est physiquement insuffisant.",
        "choices": [
          "Il ne fournit aucun fossile ni indice géologique.",
          "Il affirme que les océans n’existent pas.",
          "Il refuse toute comparaison entre continents."
        ],
        "why": "Les indices ne compensent pas totalement l’absence de mécanisme.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "océan",
        "q": "Que produit une dorsale océanique ?",
        "a": "De la nouvelle lithosphère océanique qui s’écarte de part et d’autre.",
        "choices": [
          "Une chaîne continentale sans volcanisme.",
          "Une fosse où disparaît immédiatement toute plaque.",
          "Un arrêt permanent du champ magnétique."
        ],
        "why": "Le plancher se renouvelle aux limites divergentes.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "preuve",
        "q": "Pourquoi les bandes magnétiques sont-elles décisives ?",
        "a": "Leur symétrie enregistre les inversions du champ et l’expansion des fonds.",
        "choices": [
          "Elles montrent que tous les basaltes ont le même âge.",
          "Elles existent uniquement sur les continents.",
          "Elles prouvent que les pôles ne changent jamais."
        ],
        "why": "Elles relient chronologie et mouvement.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "processus",
        "q": "Que se passe-t-il dans une zone de subduction ?",
        "a": "Une plaque océanique plonge et alimente séismes, fusion partielle et volcanisme.",
        "choices": [
          "Deux plaques s’éloignent en fabriquant une dorsale.",
          "Une plaque continentale disparaît sans déformation.",
          "Le manteau cesse de transférer de la chaleur."
        ],
        "why": "Les foyers profonds tracent la plaque plongeante.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "limite",
        "q": "Pourquoi la tectonique ne prédit-elle pas la date exacte d’un séisme ?",
        "a": "Le cadre explique les zones de contrainte mais pas le déclenchement précis de chaque rupture.",
        "choices": [
          "Les plaques sont totalement immobiles.",
          "Les séismes ne se produisent jamais aux limites.",
          "Le GPS ne mesure aucune vitesse."
        ],
        "why": "Théorie globale et prévision immédiate sont différentes.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta234-premium"
  },
  "science-antibiotics-resistance-public-health": {
    "hook": "La pénicilline n’a pas inauguré une victoire définitive contre les bactéries. Chaque antibiotique exerce une pression de sélection : les microbes sensibles disparaissent davantage, tandis que les variantes résistantes survivent et se propagent si les usages sont mal maîtrisés.",
    "keyFacts": [
      "Fleming observe l’effet d’une moisissure en 1928",
      "Florey, Chain et leurs équipes rendent la pénicilline utilisable à grande échelle",
      "Un antibiotique cible des bactéries, pas les virus",
      "La résistance préexiste souvent dans une population microbienne",
      "Santé humaine, élevage et environnement sont liés dans l’approche One Health"
    ],
    "express": [
      "Alexander Fleming remarque qu’une moisissure empêche des staphylocoques de croître autour d’elle. L’observation est importante, mais le produit reste instable et difficile à purifier. Dans les années 1930-1940, Howard Florey, Ernst Chain, Norman Heatley et de nombreux techniciens transforment la pénicilline en traitement, puis l’industrie augmente la production pendant la guerre.",
      "Les antibiotiques ciblent des structures ou processus bactériens : paroi, ribosome, réplication ou métabolisme. Ils ne guérissent pas un rhume viral. Une résistance peut venir d’une mutation ou d’un gène transmis entre bactéries. Le traitement ne crée pas volontairement le gène ; il favorise les bactéries capables de survivre dans l’environnement exposé.",
      "L’usage inutile, les doses inadéquates, les médicaments de mauvaise qualité, les interruptions de chaîne de soins et l’emploi massif en élevage accélèrent la sélection et la diffusion. La réponse ne consiste pas seulement à dire aux patients de finir une boîte : il faut diagnostic, prévention des infections, vaccination, hygiène, surveillance, accès équitable et développement de nouveaux traitements."
    ],
    "complete": [
      {
        "title": "1. De l’observation au médicament",
        "text": "Fleming publie l’action antibactérienne de la pénicilline, mais ne dispose pas des moyens pour en faire un traitement fiable. L’équipe d’Oxford reprend le problème : culture, extraction, purification, tests animaux puis essais cliniques. Norman Heatley conçoit notamment des dispositifs permettant d’améliorer la production.\n\nCette histoire montre qu’une découverte médicale est rarement l’œuvre d’un instant solitaire. Elle dépend d’équipes, de méthodes, de financement et de capacités industrielles."
      },
      {
        "title": "2. Cibler la bactérie sans tout détruire",
        "text": "La pénicilline perturbe la synthèse de la paroi de nombreuses bactéries. D’autres familles ciblent les ribosomes ou des enzymes. La toxicité sélective cherche à atteindre davantage le microbe que le patient, mais les effets indésirables et les allergies existent.\n\nLe spectre d’action peut être large ou étroit. Utiliser le traitement le plus ciblé possible réduit parfois les dégâts sur le microbiote et la pression de sélection sur d’autres bactéries."
      },
      {
        "title": "3. Comment apparaît la résistance",
        "text": "Une mutation aléatoire peut modifier la cible, réduire l’entrée du médicament ou activer une pompe d’efflux. Des plasmides transfèrent aussi des gènes entre bactéries, parfois entre espèces. Des enzymes comme les bêta-lactamases détruisent certaines molécules.\n\nDans une population variée, l’antibiotique élimine surtout les sensibles. Les résistantes laissent davantage de descendants. Ce mécanisme est une démonstration directe de sélection naturelle, sans intention ni adaptation volontaire du microbe."
      },
      {
        "title": "4. Usage individuel et problème collectif",
        "text": "Un traitement mal indiqué expose la flore sans bénéfice. Mais la résistance ne dépend pas uniquement du comportement du patient. Les hôpitaux, prescriptions, laboratoires, élevages, eaux usées et marchés pharmaceutiques forment un système. Dans certains pays, le principal problème est l’excès ; dans d’autres, le manque d’accès à un diagnostic ou à un médicament de qualité.\n\nUne politique juste doit donc réduire les usages inutiles sans priver les malades d’antibiotiques essentiels."
      },
      {
        "title": "5. Préserver l’efficacité",
        "text": "Les programmes d’antibiogouvernance suivent prescriptions, durées et résultats microbiologiques. L’hygiène des mains, l’isolement, la vaccination et l’assainissement diminuent le nombre d’infections donc le besoin de traitements. La surveillance génomique suit certains clones résistants.\n\nLa recherche explore nouvelles molécules, associations, phages ou anticorps, mais aucun outil ne remplace la prévention. L’approche One Health relie humains, animaux et environnement parce que les bactéries et leurs gènes franchissent ces frontières."
      }
    ],
    "deeper": [
      {
        "title": "Finir le traitement ?",
        "text": "La durée optimale dépend de l’infection ; il faut suivre la prescription plutôt qu’une règle universelle de prolongation."
      },
      {
        "title": "Antibiogramme",
        "text": "Il teste la sensibilité d’une souche à plusieurs antibiotiques afin d’orienter le choix thérapeutique."
      },
      {
        "title": "Réserve",
        "text": "Certaines molécules sont conservées pour des infections résistantes afin de ralentir la perte d’efficacité."
      }
    ],
    "takeaways": [
      {
        "label": "Découverte",
        "text": "Transformer une observation en médicament exige un travail collectif."
      },
      {
        "label": "Cible",
        "text": "Les antibiotiques agissent sur les bactéries, pas sur les virus."
      },
      {
        "label": "Sélection",
        "text": "Le traitement favorise les variantes résistantes déjà présentes ou acquises."
      },
      {
        "label": "One Health",
        "text": "Humains, animaux et environnement partagent le même problème."
      }
    ],
    "quiz": [
      {
        "kind": "histoire",
        "q": "Pourquoi Fleming ne suffit-il pas à expliquer la naissance de la pénicilline thérapeutique ?",
        "a": "D’autres équipes ont dû purifier, tester et produire la molécule à grande échelle.",
        "choices": [
          "Il n’a jamais observé d’effet antibactérien.",
          "La pénicilline était déjà vendue au Moyen Âge.",
          "Aucun industriel n’a participé à sa production."
        ],
        "why": "Une observation doit devenir un traitement fiable.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "usage",
        "q": "Pourquoi un antibiotique ne soigne-t-il pas un rhume viral ?",
        "a": "Il cible des structures et processus bactériens absents des virus.",
        "choices": [
          "Les virus sont toujours plus grands que les bactéries.",
          "Le rhume ne déclenche aucune réponse immunitaire.",
          "Les antibiotiques agissent uniquement sur la fièvre."
        ],
        "why": "La cible biologique est différente.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "évolution",
        "q": "Le traitement crée-t-il volontairement une résistance chez la bactérie ?",
        "a": "Non, il sélectionne davantage les variantes capables de survivre.",
        "choices": [
          "Oui, chaque bactérie décide de muter au contact du comprimé.",
          "Oui, le médicament enseigne directement un nouveau gène.",
          "Non, car aucune mutation ne peut se produire chez une bactérie."
        ],
        "why": "La variation précède souvent la sélection.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "collectif",
        "q": "Pourquoi la résistance est-elle un problème collectif ?",
        "a": "Les bactéries et gènes circulent entre patients, hôpitaux, animaux et environnement.",
        "choices": [
          "Chaque résistance reste enfermée dans un seul organisme.",
          "Elle dépend uniquement de la couleur des comprimés.",
          "Elle disparaît dès qu’un patient quitte l’hôpital."
        ],
        "why": "Les usages et transmissions forment un système.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "stratégie",
        "q": "Quelle mesure préserve l’efficacité sans simplement inventer un nouveau médicament ?",
        "a": "Prévenir les infections et mieux cibler prescriptions et durées.",
        "choices": [
          "Prescrire des antibiotiques contre tous les virus.",
          "Arrêter toute surveillance microbiologique.",
          "Utiliser systématiquement la molécule la plus large."
        ],
        "why": "Réduire le besoin et la pression de sélection est essentiel.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta234-premium"
  },
  "astro-gaia-milky-way-map": {
    "hook": "Nous vivons dans la Voie lactée, ce qui rend sa forme difficile à voir : c’est comme vouloir cartographier une forêt depuis l’intérieur. La mission Gaia contourne le problème en mesurant avec une précision extrême positions, distances, couleurs et mouvements d’étoiles.",
    "keyFacts": [
      "Gaia mesure la parallaxe annuelle des étoiles",
      "Le mouvement propre indique leur déplacement sur le ciel",
      "La mission observe plus d’un milliard de sources",
      "Les données révèlent disque, halo, amas et traces de fusions anciennes",
      "Les distances restent accompagnées d’incertitudes et de modèles statistiques"
    ],
    "express": [
      "La parallaxe est le petit déplacement apparent d’une étoile lorsque la Terre passe d’un côté à l’autre de son orbite. Plus l’étoile est proche, plus l’angle est grand. Gaia répète des observations sous de nombreux angles et construit une référence astrométrique. La mesure demande de corriger attitude du satellite, optique, couleurs et mouvements.",
      "En combinant position, parallaxe, mouvement propre, vitesse radiale pour une partie des sources et propriétés photométriques, les astronomes reconstruisent des trajectoires. Ils cartographient le disque mince, le disque épais, le bulbe et le halo. Des groupes d’étoiles partageant des mouvements ou des compositions trahissent des amas dissous et des galaxies autrefois absorbées.",
      "Gaia ne photographie pas toute la Galaxie d’un seul regard. La poussière masque des régions, les étoiles faibles ou très lointaines sont moins bien mesurées et une parallaxe peut être négative par bruit statistique. Les catalogues sont donc interprétés avec des modèles et croisés avec spectroscopie, infrarouge et simulations. La carte est un résultat probabiliste, pas une image parfaite."
    ],
    "complete": [
      {
        "title": "1. Mesurer un angle minuscule",
        "text": "La parallaxe annuelle compare la direction apparente d’une étoile à six mois d’intervalle. Une seconde d’arc correspond à un angle minuscule ; Gaia atteint pour les sources favorables des précisions bien inférieures. La distance en parsecs est liée à l’inverse de la parallaxe en secondes d’arc, mais cette inversion devient instable quand l’incertitude est grande.\n\nLes astronomes utilisent alors des méthodes statistiques intégrant erreurs et informations supplémentaires plutôt qu’une formule appliquée aveuglément."
      },
      {
        "title": "2. Balayer le ciel plutôt que viser une cible",
        "text": "Gaia tourne et observe continuellement deux champs de vue séparés par un angle fixe. Le satellite mesure le passage des sources sur son plan focal ; la répétition construit un réseau global de positions. L’étalonnage est immense, car positions des étoiles, attitude du satellite et déformations instrumentales doivent être résolues ensemble.\n\nLa force de Gaia vient moins d’une image spectaculaire que de la cohérence d’un catalogue homogène couvrant presque tout le ciel."
      },
      {
        "title": "3. De la position à l’histoire orbitale",
        "text": "Le mouvement propre décrit le déplacement angulaire d’une étoile au fil des années. La vitesse radiale, mesurée par décalage Doppler pour certaines étoiles, complète le mouvement en trois dimensions. En ajoutant une estimation de distance, on calcule une vitesse spatiale.\n\nDes courants stellaires étirés par la gravité révèlent des amas ou galaxies naines détruits. Les orbites conservent une mémoire partielle de l’assemblage de la Voie lactée."
      },
      {
        "title": "4. Archéologie galactique",
        "text": "L’âge, la composition chimique et le mouvement d’une étoile renseignent sur son lieu de naissance. Les étoiles enrichies en éléments lourds se sont formées après plusieurs générations de supernovæ ; d’autres, pauvres en métaux, appartiennent souvent à des populations anciennes.\n\nGaia, combinée à des relevés spectroscopiques, identifie des signatures de collisions anciennes. La Galaxie apparaît comme un système assemblé, chauffé et remodelé plutôt qu’un disque né d’un seul bloc."
      },
      {
        "title": "5. Les limites d’une carte exceptionnelle",
        "text": "La poussière interstellaire absorbe la lumière visible vers le centre et le plan galactique. Les étoiles binaires perturbent certaines solutions astrométriques ; la sélection du catalogue privilégie certaines luminosités et couleurs. Une mesure négative de parallaxe ne signifie pas une distance négative, mais une fluctuation autour d’un signal faible.\n\nPublier les incertitudes et fonctions de sélection est donc aussi important que publier les positions. Sans elles, une carte précise peut produire une conclusion fausse."
      }
    ],
    "deeper": [
      {
        "title": "Parsec",
        "text": "Un parsec est la distance à laquelle une unité astronomique sous-tend une seconde d’arc, soit environ 3,26 années-lumière."
      },
      {
        "title": "Quasars",
        "text": "Très lointains, ils servent de points presque fixes pour construire le référentiel céleste."
      },
      {
        "title": "Catalogues ouverts",
        "text": "Les grandes publications de Gaia permettent à des équipes du monde entier de tester de nouvelles questions bien après la mission."
      }
    ],
    "takeaways": [
      {
        "label": "Parallaxe",
        "text": "Un angle annuel fournit une échelle de distance."
      },
      {
        "label": "Mouvement",
        "text": "Positions répétées et Doppler reconstruisent les vitesses."
      },
      {
        "label": "Archéologie",
        "text": "Les étoiles gardent des traces de l’assemblage galactique."
      },
      {
        "label": "Incertitude",
        "text": "La carte exige modèles, sélections et erreurs explicites."
      }
    ],
    "quiz": [
      {
        "kind": "mesure",
        "q": "Qu’est-ce que la parallaxe annuelle ?",
        "a": "Le déplacement apparent d’une étoile dû au changement de position de la Terre sur son orbite.",
        "choices": [
          "La variation réelle de taille de l’étoile chaque année.",
          "Le mouvement du Soleil autour de la Galaxie en une nuit.",
          "Une baisse de luminosité causée par une planète."
        ],
        "why": "Le changement de point de vue crée l’angle.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "instrument",
        "q": "Pourquoi Gaia balaie-t-elle le ciel de manière répétée ?",
        "a": "Pour relier toutes les positions dans un même référentiel et mesurer leurs évolutions.",
        "choices": [
          "Pour produire uniquement des portraits colorés de planètes.",
          "Pour éviter tout étalonnage de l’instrument.",
          "Pour observer une seule étoile pendant dix ans."
        ],
        "why": "La répétition rend le catalogue global cohérent.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "cinématique",
        "q": "Que complète la vitesse radiale ?",
        "a": "Le mouvement le long de la ligne de visée, mesuré par effet Doppler.",
        "choices": [
          "La couleur perçue par l’œil humain uniquement.",
          "La masse totale de la Voie lactée sans modèle.",
          "La date de naissance exacte de chaque étoile."
        ],
        "why": "Elle ajoute une composante au mouvement propre.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "histoire",
        "q": "Comment repère-t-on une ancienne galaxie absorbée ?",
        "a": "Par des groupes d’étoiles partageant mouvements et compositions particulières.",
        "choices": [
          "Par un trou visible au centre du ciel.",
          "Par une seule photographie prise depuis l’extérieur.",
          "Par la disparition immédiate de toutes ses étoiles."
        ],
        "why": "Les signatures dynamiques et chimiques persistent.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "incertitude",
        "q": "Que signifie une parallaxe mesurée légèrement négative ?",
        "a": "Une fluctuation statistique possible autour d’un signal faible, pas une distance négative.",
        "choices": [
          "Une étoile située derrière l’Univers.",
          "Une violation certaine de la géométrie.",
          "Un mouvement plus rapide que la lumière."
        ],
        "why": "Les mesures doivent être interprétées avec leurs erreurs.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta234-premium"
  },
  "eco-externalities-public-goods-policy": {
    "hook": "Un prix de marché peut coordonner vendeurs et acheteurs tout en oubliant des personnes qui ne participent pas à la transaction. Une fumée respirée par le voisin, une vaccination qui protège aussi les autres ou un phare accessible à tous obligent à élargir le calcul.",
    "keyFacts": [
      "Une externalité affecte un tiers sans compensation directe",
      "Les biens publics sont non rivaux et difficiles à exclure",
      "Le passager clandestin réduit le financement volontaire",
      "Taxes, normes, quotas et subventions corrigent différemment",
      "La mesure des coûts et bénéfices reste incertaine et politique"
    ],
    "express": [
      "Une usine vend un produit à un client, mais ses émissions peuvent augmenter les maladies dans le voisinage. Ce coût externe n’entre pas nécessairement dans le prix. À l’inverse, une vaccination ou l’entretien d’une façade peut produire des bénéfices pour d’autres. Parler d’externalité ne signifie pas que tout effet social doit être monétisé, mais que la décision privée ne reflète pas tous les effets.",
      "Un bien public pur est non rival — l’usage par une personne ne réduit pas celui des autres — et non excluable — il est difficile d’empêcher quelqu’un d’en bénéficier. La défense nationale ou un phare illustrent l’idée, tandis que beaucoup de services réels sont seulement partiellement publics. Si chacun attend que les autres paient, le financement volontaire peut être insuffisant : c’est le problème du passager clandestin.",
      "Une taxe pigouvienne cherche à rapprocher le coût privé du coût social ; une norme interdit ou limite ; un marché de quotas fixe une quantité totale ; une subvention encourage un bénéfice externe. Aucun instrument n’est parfait. Il faut mesurer, surveiller, éviter les effets régressifs et tenir compte du pouvoir des acteurs. L’économie publique compare des dispositifs, elle ne fournit pas un bouton neutre."
    ],
    "complete": [
      {
        "title": "1. Sortir du contrat entre deux personnes",
        "text": "Le prix résume ce que vendeur et acheteur acceptent, mais pas nécessairement ce que subissent les tiers. Si une pollution endommage la santé ou les cultures, le producteur n’a pas spontanément intérêt à payer le coût complet. Le marché produit alors trop d’activité polluante par rapport à un critère social donné.\n\nUne externalité positive fonctionne en sens inverse : l’individu ne reçoit pas tout le bénéfice qu’il crée, ce qui peut conduire à un investissement insuffisant."
      },
      {
        "title": "2. Biens publics et ressources communes",
        "text": "Un bien public pur est non rival et non excluable. Une ressource commune, comme une pêcherie, est difficile à exclure mais rivale : le poisson capturé n’est plus disponible pour les autres. Un club ou une autoroute à péage peut être excluable mais peu rival jusqu’à la congestion.\n\nCes distinctions évitent de mettre sous la même étiquette écoles, parcs, climat, connaissances et océans. Chaque bien appelle des règles différentes."
      },
      {
        "title": "3. Le passager clandestin",
        "text": "Si une personne bénéficie d’un éclairage collectif même sans payer, elle peut être tentée de laisser les autres financer. Si tous raisonnent ainsi, le service manque de ressources. L’État n’est pas la seule réponse possible : associations, normes sociales, coopératives et droits de propriété peuvent fonctionner dans certains contextes.\n\nElinor Ostrom montre notamment que des communautés construisent parfois des règles durables pour gérer des ressources communes sans privatisation totale ni commande centrale pure."
      },
      {
        "title": "4. Corriger : prix, quantité ou règle",
        "text": "Une taxe sur une émission laisse les acteurs choisir comment réduire, mais suppose un niveau de taxe et une mesure fiables. Un quota échangeable fixe une quantité totale puis permet des échanges ; son efficacité dépend de l’allocation initiale et du contrôle. Une norme peut être plus simple face à un danger local ou irréversible.\n\nLes subventions encouragent isolation, recherche ou vaccination, mais peuvent financer des actions qui auraient eu lieu de toute façon. La combinaison d’outils est fréquente."
      },
      {
        "title": "5. Qui paie, qui décide ?",
        "text": "Une taxe carbone peut peser proportionnellement plus sur des ménages dépendants de la voiture ou vivant dans des logements mal isolés. Redistribuer les recettes, investir dans les transports et accompagner les secteurs exposés modifie son acceptabilité. Les évaluations monétaires de la santé, de la biodiversité ou du futur comportent des choix éthiques.\n\nLa correction d’une défaillance de marché n’est donc pas uniquement technique : elle distribue droits, coûts et pouvoir."
      }
    ],
    "deeper": [
      {
        "title": "Coase",
        "text": "Avec droits clairs et coûts de négociation faibles, les parties peuvent parfois négocier ; ces conditions sont rarement complètes à grande échelle."
      },
      {
        "title": "Connaissance",
        "text": "Une idée est souvent non rivale, mais brevets, secrets et accès numérique peuvent la rendre partiellement excluable."
      },
      {
        "title": "Effet rebond",
        "text": "Une efficacité accrue peut réduire le coût d’usage et conduire à consommer davantage, limitant une partie du gain."
      }
    ],
    "takeaways": [
      {
        "label": "Externalité",
        "text": "La transaction affecte des tiers non intégrés au prix."
      },
      {
        "label": "Bien public",
        "text": "Non-rivalité et non-exclusion posent un problème de financement."
      },
      {
        "label": "Instruments",
        "text": "Taxes, normes, quotas et subventions ont des avantages différents."
      },
      {
        "label": "Justice",
        "text": "Toute correction répartit les coûts et les droits."
      }
    ],
    "quiz": [
      {
        "kind": "notion",
        "q": "Qu’est-ce qu’une externalité négative ?",
        "a": "Un coût imposé à un tiers sans compensation directe dans la transaction.",
        "choices": [
          "Une baisse du prix payée uniquement par l’acheteur.",
          "Une dépense volontaire du producteur pour sa publicité.",
          "Un impôt toujours versé à l’étranger."
        ],
        "why": "L’effet dépasse vendeur et acheteur.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "classification",
        "q": "Quel couple définit un bien public pur ?",
        "a": "Non-rivalité et non-exclusion.",
        "choices": [
          "Rivalité et exclusion totale.",
          "Prix élevé et production publique.",
          "Utilité individuelle et rareté naturelle."
        ],
        "why": "La nature du bien ne dépend pas seulement de son producteur.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "comportement",
        "q": "Qu’est-ce que le passager clandestin ?",
        "a": "Bénéficier d’un service collectif en laissant les autres le financer.",
        "choices": [
          "Payer deux fois le même impôt.",
          "Produire un bien sans aucune technologie.",
          "Refuser une subvention privée."
        ],
        "why": "L’incitation individuelle peut sous-financer le collectif.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "instrument",
        "q": "Quelle différence principale oppose taxe et quota ?",
        "a": "La taxe fixe un prix de l’émission, le quota fixe une quantité totale.",
        "choices": [
          "La taxe interdit toute production, le quota ne mesure rien.",
          "Le quota s’applique uniquement aux ménages.",
          "La taxe garantit toujours une quantité exacte."
        ],
        "why": "Prix et quantité sont les variables directement contrôlées.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "justice",
        "q": "Pourquoi une politique efficace peut-elle rester contestée ?",
        "a": "Elle répartit inégalement coûts, bénéfices et capacités d’adaptation.",
        "choices": [
          "Parce que toute taxe augmente forcément la pollution.",
          "Parce que les externalités n’affectent jamais la santé.",
          "Parce que la redistribution est mathématiquement impossible."
        ],
        "why": "L’efficacité agrégée ne suffit pas à juger l’équité.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta234-premium"
  },
  "geo-global-food-systems": {
    "hook": "Une assiette apparemment locale rassemble souvent semences sélectionnées ailleurs, engrais produits avec du gaz, aliments pour bétail importés, travail saisonnier, chaînes frigorifiques, ports, supermarchés et normes sanitaires. L’alimentation est un système territorial complet.",
    "keyFacts": [
      "La production dépend de sols, eau, climat, travail et capitaux",
      "Les chaînes de valeur répartissent inégalement la valeur",
      "Élevage et cultures sont reliés par les flux d’aliments",
      "La sécurité alimentaire combine disponibilité, accès, utilisation et stabilité",
      "Le gaspillage et les pertes n’ont pas les mêmes causes selon les territoires"
    ],
    "express": [
      "Les régions agricoles se spécialisent selon leurs milieux, infrastructures, politiques et marchés. Le soja brésilien peut nourrir des animaux en Europe ou en Chine ; le blé de la mer Noire influence des prix au Moyen-Orient ; fruits et légumes dépendent de travailleurs saisonniers et d’une logistique rapide. La mondialisation réduit certains coûts mais crée aussi des dépendances.",
      "Dans une chaîne alimentaire, agriculteurs, négociants, transformateurs, transporteurs et distributeurs ne disposent pas du même pouvoir. Un prix élevé en magasin ne garantit pas un revenu élevé au producteur. Contrats, normes, concentration des acheteurs, dette et accès au stockage déterminent la part de valeur conservée dans chaque territoire.",
      "La faim ne vient pas seulement d’un manque mondial de nourriture. Pauvreté, guerre, déplacement, accès à la terre, prix, discrimination et rupture logistique peuvent empêcher de se nourrir. Le climat modifie rendements et événements extrêmes, mais la vulnérabilité dépend des institutions. Renforcer un système peut passer par diversité des cultures, stocks, protection sociale et réduction des pertes."
    ],
    "complete": [
      {
        "title": "1. Produire avec un milieu transformé",
        "text": "L’agriculture dépend de température, pluie, sols et relief, mais ces facteurs sont aménagés : irrigation, drainage, serres, sélection variétale, engrais et machines modifient les possibilités. Les rendements élevés nécessitent souvent énergie, eau et intrants dont les prix peuvent varier fortement.\n\nUn territoire agricole n’est donc ni purement naturel ni totalement contrôlé. Les choix techniques déplacent les risques : irrigation sécurise une récolte mais peut épuiser une nappe ; pesticide protège un rendement mais affecter biodiversité et santé."
      },
      {
        "title": "2. Des chaînes mondiales inégalement gouvernées",
        "text": "Une denrée passe parfois par de nombreuses entreprises avant le consommateur. Le pouvoir de marché des transformateurs ou distributeurs leur permet de fixer normes, délais et prix. Les labels équitables ou indications géographiques cherchent à redistribuer une part de la valeur, mais leur effet dépend du contrôle et de l’accès des petits producteurs.\n\nLa chaîne est aussi politique : subventions, droits de douane, accords commerciaux et normes sanitaires favorisent certains modèles et territoires."
      },
      {
        "title": "3. Élevage, terres et alimentation animale",
        "text": "Une grande partie des terres agricoles sert au pâturage ou à produire des aliments pour animaux. Les systèmes d’élevage diffèrent fortement : pâturage extensif, fermes mixtes, bâtiments intensifs. Leur impact dépend de l’espèce, de l’alimentation, des émissions, de l’usage des terres et des services rendus localement.\n\nComparer un kilogramme de produit sans regarder déforestation, coproduits ou qualité nutritionnelle peut simplifier excessivement. Les ordres de grandeur restent néanmoins essentiels pour discuter ressources et régimes alimentaires."
      },
      {
        "title": "4. Sécurité alimentaire : quatre dimensions",
        "text": "La disponibilité mesure l’existence physique d’aliments ; l’accès dépend des revenus, prix et droits ; l’utilisation concerne nutrition, eau, santé et préparation ; la stabilité demande que ces conditions durent. Un pays peut exporter beaucoup et connaître la faim si certains ménages n’ont pas les moyens d’acheter.\n\nLes crises combinent souvent conflit, inflation, sécheresse et déplacement. Une aide alimentaire d’urgence sauve des vies, mais la résilience exige aussi marchés fonctionnels, protection sociale et capacités locales."
      },
      {
        "title": "5. Pertes, gaspillage et résilience",
        "text": "Dans des régions mal équipées, une part de la récolte est perdue faute de stockage, routes, froid ou protection contre les ravageurs. Dans les pays riches, davantage de gaspillage se produit au commerce et chez les consommateurs, sous l’effet de normes esthétiques, portions et dates mal comprises.\n\nRéduire ces pertes ne remplace pas une politique agricole, mais libère terres, eau et énergie. Diversifier fournisseurs, cultures et voies logistiques limite aussi le risque qu’un choc unique bloque tout le système."
      }
    ],
    "deeper": [
      {
        "title": "Accaparement des terres",
        "text": "De grands achats ou locations peuvent apporter capitaux et infrastructures, mais aussi déplacer usages et droits locaux."
      },
      {
        "title": "Futures agricoles",
        "text": "Ils permettent de couvrir un risque de prix ; leur rôle dans les flambées dépend des marchés et des positions prises."
      },
      {
        "title": "Souveraineté alimentaire",
        "text": "Le concept insiste sur le droit des sociétés à choisir leurs politiques agricoles et alimentaires, au-delà du seul volume disponible."
      }
    ],
    "takeaways": [
      {
        "label": "Système",
        "text": "L’alimentation relie milieu, énergie, travail, finance et logistique."
      },
      {
        "label": "Pouvoir",
        "text": "La valeur est distribuée selon les positions dans la chaîne."
      },
      {
        "label": "Faim",
        "text": "Elle dépend souvent de l’accès et de la stabilité, pas seulement de la quantité mondiale."
      },
      {
        "label": "Résilience",
        "text": "Diversité, stocks et protection sociale limitent les chocs."
      }
    ],
    "quiz": [
      {
        "kind": "réseau",
        "q": "Pourquoi une denrée locale peut-elle dépendre de flux mondiaux ?",
        "a": "Ses intrants, machines, alimentation animale, travail ou débouchés peuvent venir d’autres pays.",
        "choices": [
          "Tout produit local est obligatoirement importé fini.",
          "Le climat n’a aucun rôle dans la production.",
          "Les agriculteurs ne vendent jamais sur un marché régional."
        ],
        "why": "La chaîne dépasse souvent le lieu de culture.",
        "trap": "",
        "evidence": "Express 1."
      },
      {
        "kind": "valeur",
        "q": "Pourquoi un prix élevé au détail ne garantit-il pas un revenu agricole élevé ?",
        "a": "Transformateurs, distributeurs et négociants peuvent capter une grande part de la valeur.",
        "choices": [
          "Le producteur fixe toujours seul tous les prix.",
          "La logistique ne coûte jamais rien.",
          "Les normes n’influencent aucune négociation."
        ],
        "why": "Le pouvoir varie le long de la chaîne.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "sécurité",
        "q": "Quelles sont les quatre dimensions classiques de la sécurité alimentaire ?",
        "a": "Disponibilité, accès, utilisation et stabilité.",
        "choices": [
          "Production, publicité, exportation et luxe.",
          "Sol, pluie, tracteur et monnaie.",
          "Goût, couleur, marque et origine."
        ],
        "why": "La faim ne se réduit pas au volume produit.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "crise",
        "q": "Comment un pays exportateur peut-il connaître la faim ?",
        "a": "Une partie de la population peut manquer de revenus ou d’accès malgré la disponibilité nationale.",
        "choices": [
          "Les exportations détruisent physiquement tous les aliments.",
          "Aucun marché intérieur n’existe dans un pays exportateur.",
          "La nutrition dépend uniquement de la latitude."
        ],
        "why": "Droits et pouvoir d’achat déterminent l’accès.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "gaspillage",
        "q": "Pourquoi les pertes alimentaires diffèrent-elles selon les territoires ?",
        "a": "Les causes vont du manque de stockage au gaspillage commercial et domestique.",
        "choices": [
          "Elles se produisent uniquement dans les champs.",
          "Elles sont toujours provoquées par le consommateur final.",
          "Elles n’utilisent ni eau ni énergie."
        ],
        "why": "Les solutions doivent viser le maillon concerné.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta234-premium"
  },
  "music-beethoven-symphony-public": {
    "hook": "Beethoven n’est pas seulement le génie sourd qui aurait inventé le romantisme. Sa carrière se situe au moment où l’ancien système de cour, l’édition musicale, les concerts publics et une nouvelle idée de l’auteur transforment la place du compositeur.",
    "keyFacts": [
      "Beethoven arrive à Vienne en 1792",
      "Il dépend de mécènes mais négocie une autonomie croissante",
      "Ses symphonies élargissent durée, tension et rôle des motifs",
      "La surdité transforme ses conditions de travail sans arrêter sa création",
      "La réception postérieure construit un modèle de génie héroïque"
    ],
    "express": [
      "À Vienne, Beethoven reçoit le soutien d’aristocrates, donne des leçons, publie et organise des concerts. Il ne devient pas indépendant au sens moderne : les mécènes restent essentiels. Mais il peut vendre une œuvre à plusieurs éditeurs, bénéficier d’un public urbain et affirmer plus fortement sa propriété artistique que de nombreux compositeurs de cour.",
      "La Troisième Symphonie développe à grande échelle un motif simple, multiplie conflits et détours harmoniques, puis place une marche funèbre au centre du parcours. La Cinquième construit une unité remarquable autour d’un motif rythmique ; la Neuvième introduit voix et chœur dans son finale. Ces œuvres ne détruisent pas les formes classiques : elles les étirent et les rendent dramatiques.",
      "La surdité progressive isole Beethoven de l’exécution publique et l’oblige à utiliser des carnets de conversation. Le récit héroïque de l’artiste triomphant de son handicap a servi sa légende, mais il peut masquer douleur, dépendance, réseaux de copistes et interprètes. Son influence vient autant des œuvres que de la manière dont le XIXe siècle les sacralise."
    ],
    "complete": [
      {
        "title": "1. Composer entre cour et marché",
        "text": "Haydn et Mozart avaient déjà travaillé entre mécénat, édition et concert. Beethoven pousse plus loin certaines possibilités. Des aristocrates lui accordent pensions et logements ; les éditeurs rivalisent pour ses partitions ; les concerts par souscription touchent un public bourgeois plus large.\n\nCette autonomie reste fragile. Les guerres, monnaies et revenus fluctuent. Le compositeur doit négocier droits, dédicaces et exclusivités. Le mythe de l’artiste entièrement libre simplifie une économie faite de relations personnelles et commerciales."
      },
      {
        "title": "2. La symphonie comme argument dramatique",
        "text": "Une symphonie organise contrastes, retours et transformations sur plusieurs mouvements. Beethoven travaille souvent avec de petites cellules rythmiques ou mélodiques. Leur répétition n’est pas un manque d’invention : elles changent d’harmonie, de timbre, de registre et de fonction.\n\nDans la Cinquième, le célèbre motif initial traverse l’œuvre sous des formes variées. Le passage sans interruption du scherzo au finale crée une trajectoire de tension et de libération, renforcée par l’entrée de nouveaux instruments."
      },
      {
        "title": "3. L’Eroica et la politique des interprétations",
        "text": "La Troisième est d’abord associée à Bonaparte, puis la dédicace est modifiée lorsque Napoléon devient empereur. L’anecdote de la page déchirée est célèbre, mais les significations de l’œuvre ne se résument pas à une colère ponctuelle.\n\nLa symphonie dialogue avec les idéaux révolutionnaires, la culture héroïque et la mémoire funèbre. Son ampleur surprend les auditeurs. Une lecture politique doit s’appuyer sur sources et structure sans transformer chaque accord en message codé."
      },
      {
        "title": "4. Surdité et création",
        "text": "Le Testament de Heiligenstadt de 1802 exprime détresse, isolement et volonté de continuer. La perte auditive s’aggrave ; Beethoven cesse progressivement de jouer en public, mais compose grâce à son expérience intérieure du son, au piano, aux esquisses et aux vibrations.\n\nLes carnets de conversation documentent ses échanges tardifs, mais ils sont incomplets et parfois manipulés par son secrétaire Schindler. L’histoire du handicap doit donc être racontée avec empathie et critique des sources."
      },
      {
        "title": "5. Fabriquer le “génie Beethoven”",
        "text": "Après sa mort, biographies, monuments, éditions complètes et salles de concert construisent un canon. La symphonie devient une œuvre à écouter dans le silence, supposée porter une profondeur morale. Cette valorisation donne une place durable à Beethoven, mais marginalise aussi d’autres compositeurs, interprètes et traditions.\n\nÉtudier la réception permet de distinguer l’œuvre, ses conditions de création et le rôle symbolique que des sociétés ultérieures lui attribuent."
      }
    ],
    "deeper": [
      {
        "title": "Neuvième",
        "text": "Le finale met en musique l’Ode à la joie de Schiller, mais son universalisme a reçu des usages politiques très contradictoires."
      },
      {
        "title": "Esquisses",
        "text": "Les carnets montrent un travail patient de transformation, loin de l’image d’une inspiration instantanée."
      },
      {
        "title": "Interprétation",
        "text": "Tempos, instruments et effectifs diffèrent selon les chefs et les approches historiquement informées."
      }
    ],
    "takeaways": [
      {
        "label": "Économie",
        "text": "Beethoven combine mécénat, édition et concert public."
      },
      {
        "label": "Motif",
        "text": "De petites cellules organisent de vastes trajectoires."
      },
      {
        "label": "Surdité",
        "text": "Elle transforme le travail sans résumer l’artiste."
      },
      {
        "label": "Canon",
        "text": "La postérité construit autant le symbole que les œuvres."
      }
    ],
    "quiz": [
      {
        "kind": "contexte",
        "q": "De quels revenus Beethoven dépend-il ?",
        "a": "De mécènes, leçons, éditions et concerts, dans une combinaison instable.",
        "choices": [
          "Uniquement d’un salaire d’État garanti.",
          "Uniquement de la vente de disques.",
          "D’aucun revenu car ses œuvres sont anonymes."
        ],
        "why": "Son autonomie reste relationnelle et économique.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "forme",
        "q": "Quel rôle joue un motif dans la Cinquième Symphonie ?",
        "a": "Il est transformé et relie plusieurs moments de l’œuvre.",
        "choices": [
          "Il apparaît une seule fois puis disparaît.",
          "Il remplace tous les instruments par une voix.",
          "Il impose la même harmonie sans variation."
        ],
        "why": "La répétition devient développement.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "politique",
        "q": "Pourquoi l’Eroica ne se réduit-elle pas à l’anecdote de Napoléon ?",
        "a": "Sa structure et ses significations héroïques dépassent une dédicace modifiée.",
        "choices": [
          "Elle ne contient aucune marche funèbre.",
          "Beethoven ne connaissait pas les événements politiques.",
          "La symphonie est composée après 1900."
        ],
        "why": "Sources et analyse musicale doivent être croisées.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "handicap",
        "q": "Que montrent les esquisses et carnets ?",
        "a": "Une création longue, réfléchie et adaptée malgré la surdité.",
        "choices": [
          "Une disparition totale du travail après 1802.",
          "Une composition automatique dictée par un éditeur.",
          "Une audition redevenue normale à la fin de sa vie."
        ],
        "why": "Le récit héroïque ne doit pas effacer les méthodes.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "réception",
        "q": "Comment le XIXe siècle renforce-t-il la place de Beethoven ?",
        "a": "Par biographies, monuments, éditions et sacralisation du concert.",
        "choices": [
          "En interdisant toutes ses symphonies.",
          "En supprimant son nom des partitions.",
          "En réservant sa musique aux bals populaires uniquement."
        ],
        "why": "Le canon est une construction historique.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta234-premium"
  },
  "lit-modernism-stream-consciousness": {
    "hook": "Le modernisme littéraire ne se résume pas à des phrases difficiles. Face à la ville, à la guerre, à la psychanalyse et aux médias nouveaux, des écrivains cherchent des formes capables de représenter un temps vécu qui ne suit pas gentiment l’horloge.",
    "keyFacts": [
      "Le modernisme recouvre plusieurs mouvements et langues",
      "Le flux de conscience tente de rendre les associations mentales",
      "Le monologue intérieur réduit parfois la médiation du narrateur",
      "Le montage et la fragmentation organisent des perspectives multiples",
      "La difficulté formelle peut révéler des exclusions sociales autant qu’elle les conteste"
    ],
    "express": [
      "Entre 1900 et les années 1930, Joyce, Woolf, Proust, Faulkner et d’autres transforment la narration sans former une école unique. Ils héritent du réalisme mais doutent qu’un narrateur stable puisse ordonner le monde. Une journée ordinaire, un souvenir involontaire ou une conversation deviennent des laboratoires du temps, de la perception et de la mémoire.",
      "Le monologue intérieur présente une parole mentale avec peu d’explications ; le flux de conscience cherche plus largement les associations, sensations et ruptures de la pensée. Les deux termes se recouvrent parfois, mais ne sont pas synonymes parfaits. Ponctuation, rythme, pronoms, images et retours de mots produisent une expérience plutôt qu’une transcription scientifique du cerveau.",
      "La fragmentation ne signifie pas absence de construction. Ulysse relie épisodes, styles et motifs à l’Odyssée ; Mrs Dalloway fait circuler les consciences dans Londres sous le rythme de Big Ben ; À la recherche du temps perdu organise la mémoire sur des milliers de pages. Le lecteur doit reconstruire les liens, mais l’œuvre fournit des repères sonores, spatiaux et symboliques."
    ],
    "complete": [
      {
        "title": "1. Une modernité sans programme unique",
        "text": "Le terme modernisme est surtout utilisé par la critique pour rapprocher des œuvres qui refusent certaines conventions du XIXe siècle. Il couvre romans, poésie, arts visuels et architecture, dans des contextes nationaux différents. Tous les auteurs ne revendiquent pas la même rupture.\n\nLa Première Guerre mondiale, les transformations urbaines, le cinéma, la radio et les théories de l’inconscient modifient l’expérience du temps et de l’identité. La forme fragmentée répond à ce monde, sans en être le simple miroir."
      },
      {
        "title": "2. Temps chronologique et temps vécu",
        "text": "Une horloge mesure des intervalles réguliers, mais la conscience accélère, ralentit et revient. Chez Proust, une sensation présente déclenche un passé qui n’était pas volontairement recherché. Chez Woolf, quelques heures contiennent des décennies de souvenirs.\n\nLe récit peut donc suivre une journée tout en déployant plusieurs temporalités. Les cloches, trajets, rendez-vous et changements de lumière maintiennent une structure extérieure pendant que les pensées circulent."
      },
      {
        "title": "3. Monologue intérieur et flux de conscience",
        "text": "Le monologue intérieur rapproche le texte d’une parole non prononcée, souvent au présent et à la première personne. Le flux de conscience inclut aussi impressions, images, fragments grammaticaux et glissements de point de vue. Aucun procédé ne reproduit directement l’esprit : tout est sélectionné et composé.\n\nLe célèbre monologue de Molly Bloom dans Ulysse donne une impression de continuité par de longues phrases peu ponctuées, mais il possède motifs, retours et architecture précise."
      },
      {
        "title": "4. Montage, voix et ville",
        "text": "Le roman moderniste juxtapose affiches, conversations, journaux, chansons et pensées. La ville devient un espace de simultanéité où plusieurs vies se croisent sans se connaître. Dans Mrs Dalloway, le passage d’une conscience à une autre peut s’appuyer sur un bruit ou un objet partagé.\n\nCette technique rapproche parfois le roman du montage cinématographique, mais la littérature contrôle autrement durée, voix et accès à l’intériorité. La comparaison doit montrer les différences autant que les ressemblances."
      },
      {
        "title": "5. Innovation et limites sociales",
        "text": "Les modernistes contestent des normes de langue, de sexualité ou de récit, mais évoluent aussi dans des milieux éditoriaux et sociaux inégaux. Les petites revues et mécènes facilitent l’expérimentation ; l’accès culturel reste sélectif. Les perspectives coloniales ou de classe peuvent être critiquées dans une page et reproduites dans une autre.\n\nLire ces œuvres aujourd’hui demande donc d’étudier leur audace formelle, leurs contextes et les voix qu’elles rendent présentes ou silencieuses."
      }
    ],
    "deeper": [
      {
        "title": "Style indirect libre",
        "text": "Il mêle la voix du narrateur et celle du personnage sans guillemets ni verbe introducteur explicite."
      },
      {
        "title": "Censure",
        "text": "Ulysse est poursuivi pour obscénité avant d’être autorisé aux États-Unis en 1933."
      },
      {
        "title": "Traduction",
        "text": "Reproduire rythme, ambiguïtés et jeux sonores oblige le traducteur à choisir entre plusieurs pertes possibles."
      }
    ],
    "takeaways": [
      {
        "label": "Pluralité",
        "text": "Le modernisme est un ensemble de recherches, pas une école unique."
      },
      {
        "label": "Temps",
        "text": "Le récit oppose souvent horloge et expérience intérieure."
      },
      {
        "label": "Conscience",
        "text": "Les techniques mentales restent des constructions littéraires."
      },
      {
        "label": "Lecture",
        "text": "La fragmentation demande de reconstruire motifs, voix et espaces."
      }
    ],
    "quiz": [
      {
        "kind": "définition",
        "q": "Pourquoi le modernisme n’est-il pas un mouvement unique ?",
        "a": "Il regroupe des recherches diverses dans plusieurs pays, langues et arts.",
        "choices": [
          "Tous les auteurs signent le même manifeste en 1900.",
          "Il désigne uniquement les romans de guerre.",
          "Il impose une technique identique à chaque œuvre."
        ],
        "why": "La catégorie est critique et plurielle.",
        "trap": "",
        "evidence": "Section 1."
      },
      {
        "kind": "temps",
        "q": "Que montre le contraste entre horloge et conscience ?",
        "a": "Le temps vécu peut accélérer, ralentir et revenir par la mémoire.",
        "choices": [
          "Une journée littéraire doit toujours durer vingt-quatre pages.",
          "La mémoire suit exactement l’ordre chronologique.",
          "Les modernistes refusent toute indication temporelle."
        ],
        "why": "La durée subjective structure le récit.",
        "trap": "",
        "evidence": "Section 2."
      },
      {
        "kind": "technique",
        "q": "Le flux de conscience est-il une copie brute du cerveau ?",
        "a": "Non, il sélectionne et compose des associations pour produire un effet littéraire.",
        "choices": [
          "Oui, il enregistre directement les neurones.",
          "Oui, il interdit toute révision par l’auteur.",
          "Non, car il ne contient jamais de sensations."
        ],
        "why": "L’impression de spontanéité est travaillée.",
        "trap": "",
        "evidence": "Section 3."
      },
      {
        "kind": "montage",
        "q": "Comment Mrs Dalloway passe-t-il parfois d’une conscience à l’autre ?",
        "a": "Par un son, un objet ou un événement partagé dans l’espace urbain.",
        "choices": [
          "Par un narrateur qui annonce toujours le changement en titre.",
          "Par la disparition complète de Londres.",
          "Par un ordre alphabétique des personnages."
        ],
        "why": "La simultanéité urbaine organise les transitions.",
        "trap": "",
        "evidence": "Section 4."
      },
      {
        "kind": "critique",
        "q": "Pourquoi faut-il lire aussi les limites sociales du modernisme ?",
        "a": "L’innovation formelle coexiste avec des milieux et représentations parfois exclusifs.",
        "choices": [
          "Parce que toute forme nouvelle est politiquement identique.",
          "Parce que les œuvres ne parlent jamais de société.",
          "Parce que les écrivains n’utilisent aucun éditeur."
        ],
        "why": "Audace et contexte doivent être étudiés ensemble.",
        "trap": "",
        "evidence": "Section 5."
      }
    ],
    "editorialRevision": "beta234-premium"
  }
};
  const MYSTERIES = [
  {
    "id": "history-mystery-monsoon-234",
    "discipline": "history",
    "difficulty": "moyen",
    "title": "Le calendrier des vents",
    "caseTitle": "Partir, attendre, revenir",
    "subjectType": "phénomène climatique et maritime",
    "periodHint": "Océan Indien médiéval et moderne",
    "lessonId": "history-indian-ocean-monsoon-networks",
    "prompt": "Sa direction s’inverse selon la saison. Les marins l’utilisent pour organiser des traversées et séjournent parfois des mois au port avant le retour.",
    "answer": "La mousson",
    "aliases": [
      "mousson",
      "la mousson",
      "vents de mousson",
      "moussons"
    ],
    "clues": [
      "Elle dépend du contraste thermique entre continent et océan.",
      "Elle structure le commerce de l’océan Indien.",
      "Elle change de direction avec les saisons."
    ],
    "explanation": "La mousson fournit des vents saisonniers relativement prévisibles qui structurent les calendriers maritimes.",
    "blockedGuesses": [
      "alize",
      "courant marin",
      "tempete"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "history-mystery-meiji-234",
    "discipline": "history",
    "difficulty": "moyen",
    "title": "Une restauration qui transforme l’État",
    "caseTitle": "Préserver la souveraineté par la réforme",
    "subjectType": "transformation politique",
    "periodHint": "Japon, 1868",
    "lessonId": "history-meiji-restoration-industrial-japan",
    "prompt": "Elle rend à l’empereur une place centrale, abolit les domaines féodaux et ouvre une période de centralisation, conscription et industrialisation.",
    "answer": "La restauration de Meiji",
    "aliases": [
      "restauration meiji",
      "restauration de meiji",
      "meiji",
      "ère meiji"
    ],
    "clues": [
      "Elle commence en 1868.",
      "Satsuma et Chōshū jouent un rôle décisif.",
      "Elle suit la crise provoquée par les traités inégaux."
    ],
    "explanation": "La restauration de Meiji renverse le shogunat et engage une construction rapide de l’État moderne japonais.",
    "blockedGuesses": [
      "shogunat",
      "revolution chinoise",
      "mission iwakura"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "art-mystery-muqarnas-234",
    "discipline": "art",
    "difficulty": "difficile",
    "title": "Une voûte en alvéoles",
    "caseTitle": "La lumière se brise dans la niche",
    "subjectType": "élément architectural",
    "periodHint": "Arts islamiques",
    "lessonId": "art-islamic-space-calligraphy-pattern",
    "prompt": "Cette structure composée de petites cellules en encorbellement articule une coupole, une corniche ou une niche et transforme la lumière en facettes.",
    "answer": "Les muqarnas",
    "aliases": [
      "muqarnas",
      "les muqarnas",
      "mocárabes",
      "mocarabes"
    ],
    "clues": [
      "On les compare parfois à des stalactites.",
      "Ils apparaissent en stuc, pierre, brique ou bois.",
      "Ils articulent des transitions architecturales."
    ],
    "explanation": "Les muqarnas sont des compositions alvéolées utilisées dans de nombreux édifices des mondes islamiques.",
    "blockedGuesses": [
      "arabesque",
      "mihrab",
      "mosaïque"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "art-mystery-bauhaus-course-234",
    "discipline": "art",
    "difficulty": "moyen",
    "title": "Avant l’atelier spécialisé",
    "caseTitle": "Apprendre la matière avant le style",
    "subjectType": "dispositif pédagogique",
    "periodHint": "Bauhaus",
    "lessonId": "art-bauhaus-modern-design",
    "prompt": "Tous les élèves commencent par y manipuler couleur, papier, bois, volume et texture avant de rejoindre un atelier.",
    "answer": "Le cours préliminaire",
    "aliases": [
      "cours préliminaire",
      "le cours preliminaire",
      "vorkurs",
      "cours préparatoire"
    ],
    "clues": [
      "Johannes Itten en est un premier responsable.",
      "Moholy-Nagy et Josef Albers le transforment.",
      "Il précède la spécialisation."
    ],
    "explanation": "Le Vorkurs du Bauhaus fonde la formation sur l’expérimentation des matériaux et de la perception.",
    "blockedGuesses": [
      "atelier textile",
      "bauhaus",
      "architecture"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "cinema-mystery-stop-motion-234",
    "discipline": "cinema",
    "difficulty": "facile",
    "title": "La matière bouge image par image",
    "caseTitle": "Une marionnette entre deux prises",
    "subjectType": "technique d’animation",
    "periodHint": "Cinéma d’animation",
    "lessonId": "cinema-animation-movement-techniques",
    "prompt": "On déplace très légèrement un objet réel, on le photographie, puis on recommence jusqu’à fabriquer un mouvement qui n’a jamais existé en continu.",
    "answer": "Le stop-motion",
    "aliases": [
      "stop motion",
      "stop-motion",
      "animation en volume",
      "animation image par image"
    ],
    "clues": [
      "Il peut utiliser pâte à modeler ou marionnettes.",
      "Chaque erreur de position peut rester visible.",
      "Aardman et Laika l’emploient."
    ],
    "explanation": "Le stop-motion anime des objets matériels par une succession de prises fixes.",
    "blockedGuesses": [
      "rotoscopie",
      "motion capture",
      "dessin animé"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "science-mystery-magnetic-stripes-234",
    "discipline": "science-inventions",
    "difficulty": "moyen",
    "title": "Des bandes symétriques au fond de la mer",
    "caseTitle": "La mémoire du champ terrestre",
    "subjectType": "preuve géophysique",
    "periodHint": "Tectonique des plaques",
    "lessonId": "science-plate-tectonics-evidence",
    "prompt": "Elles alternent de part et d’autre des dorsales et enregistrent dans les basaltes les inversions successives du champ terrestre.",
    "answer": "Les bandes magnétiques océaniques",
    "aliases": [
      "bandes magnétiques",
      "bandes magnetiques océaniques",
      "anomalies magnétiques",
      "bandes paléomagnétiques"
    ],
    "clues": [
      "Elles sont presque symétriques autour des dorsales.",
      "Elles permettent de calculer l’âge et la vitesse du plancher.",
      "Vine et Matthews les interprètent dans les années 1960."
    ],
    "explanation": "Les bandes magnétiques du plancher océanique constituent une preuve décisive de l’expansion des fonds.",
    "blockedGuesses": [
      "dorsale",
      "subduction",
      "faille transformante"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "science-mystery-antibiogram-234",
    "discipline": "science-inventions",
    "difficulty": "moyen",
    "title": "Des disques et des zones sans bactéries",
    "caseTitle": "Choisir le traitement le plus ciblé",
    "subjectType": "test microbiologique",
    "periodHint": "Médecine contemporaine",
    "lessonId": "science-antibiotics-resistance-public-health",
    "prompt": "Une souche est mise en culture autour de plusieurs molécules. La taille des zones où elle ne pousse pas aide à savoir auxquelles elle reste sensible.",
    "answer": "L’antibiogramme",
    "aliases": [
      "antibiogramme",
      "un antibiogramme",
      "test de sensibilité aux antibiotiques"
    ],
    "clues": [
      "Il utilise souvent des disques imprégnés.",
      "Il guide le choix thérapeutique.",
      "Il distingue sensible, intermédiaire et résistant selon des seuils."
    ],
    "explanation": "L’antibiogramme mesure la sensibilité d’une bactérie à plusieurs antibiotiques.",
    "blockedGuesses": [
      "vaccin",
      "culture cellulaire",
      "penicilline"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "astronomy-mystery-parallax-234",
    "discipline": "astronomy",
    "difficulty": "moyen",
    "title": "Un minuscule décalage dans le ciel",
    "caseTitle": "Mesurer la distance par changement de point de vue",
    "subjectType": "méthode astrométrique",
    "periodHint": "Mission Gaia",
    "lessonId": "astro-gaia-milky-way-map",
    "prompt": "Une étoile proche semble se déplacer par rapport au fond lointain lorsque la Terre se trouve de l’autre côté de son orbite.",
    "answer": "La parallaxe annuelle",
    "aliases": [
      "parallaxe",
      "parallaxe annuelle",
      "la parallaxe",
      "parallaxe stellaire"
    ],
    "clues": [
      "Son angle diminue avec la distance.",
      "Elle est liée à la définition du parsec.",
      "Gaia la mesure pour un nombre immense d’étoiles."
    ],
    "explanation": "La parallaxe annuelle fournit une échelle géométrique de distance grâce au déplacement orbital de la Terre.",
    "blockedGuesses": [
      "mouvement propre",
      "doppler",
      "transit"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "economy-mystery-free-rider-234",
    "discipline": "economy",
    "difficulty": "moyen",
    "title": "Profiter sans financer",
    "caseTitle": "Quand chacun attend le paiement des autres",
    "subjectType": "problème d’action collective",
    "periodHint": "Biens publics",
    "lessonId": "eco-externalities-public-goods-policy",
    "prompt": "Il bénéficie d’un service difficile à réserver aux seuls payeurs, mais préfère laisser les autres supporter le coût. Si tous l’imitent, le service est sous-financé.",
    "answer": "Le passager clandestin",
    "aliases": [
      "passager clandestin",
      "le passager clandestin",
      "free rider",
      "comportement de passager clandestin"
    ],
    "clues": [
      "Le problème apparaît avec les biens non excluables.",
      "Il ne désigne pas un voyageur dans ce contexte.",
      "Il explique certaines limites du financement volontaire."
    ],
    "explanation": "Le passager clandestin bénéficie d’un bien collectif sans contribuer volontairement à son financement.",
    "blockedGuesses": [
      "externalité",
      "bien public",
      "taxe pigouvienne"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "geography-mystery-food-security-234",
    "discipline": "geography",
    "difficulty": "moyen",
    "title": "Produire assez ne suffit pas",
    "caseTitle": "Quatre dimensions pour se nourrir durablement",
    "subjectType": "notion géographique",
    "periodHint": "Systèmes alimentaires",
    "lessonId": "geo-global-food-systems",
    "prompt": "Elle suppose que la nourriture existe, que les personnes puissent y accéder, qu’elle soit utilisable pour une bonne nutrition et que ces conditions restent stables.",
    "answer": "La sécurité alimentaire",
    "aliases": [
      "sécurité alimentaire",
      "securite alimentaire",
      "la sécurité alimentaire",
      "food security"
    ],
    "clues": [
      "Elle distingue disponibilité et accès.",
      "Elle inclut la stabilité dans le temps.",
      "Un pays exportateur peut ne pas l’assurer à tous ses habitants."
    ],
    "explanation": "La sécurité alimentaire combine disponibilité, accès, utilisation et stabilité.",
    "blockedGuesses": [
      "souveraineté alimentaire",
      "autosuffisance",
      "famine"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "music-mystery-eroica-234",
    "discipline": "music",
    "difficulty": "moyen",
    "title": "Une symphonie héroïque démesurée",
    "caseTitle": "Dédicace effacée, marche funèbre conservée",
    "subjectType": "œuvre musicale",
    "periodHint": "Beethoven",
    "lessonId": "music-beethoven-symphony-public",
    "prompt": "Sa dédicace initiale est liée à Bonaparte, mais elle est modifiée lorsqu’il devient empereur. Son deuxième mouvement est une vaste marche funèbre.",
    "answer": "La Symphonie héroïque",
    "aliases": [
      "symphonie héroïque",
      "eroica",
      "symphonie no 3",
      "troisième symphonie de beethoven",
      "3e symphonie"
    ],
    "clues": [
      "Elle est en mi bémol majeur.",
      "Elle porte le numéro 3.",
      "Son surnom italien signifie héroïque."
    ],
    "explanation": "L’Eroica de Beethoven élargit l’échelle symphonique et nourrit de nombreuses lectures politiques.",
    "blockedGuesses": [
      "neuvième symphonie",
      "cinquième symphonie",
      "ode à la joie"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "rescueAvailable": true
  },
  {
    "id": "literature-mystery-stream-consciousness-234",
    "discipline": "literature",
    "difficulty": "moyen",
    "title": "Une pensée qui déborde la phrase",
    "caseTitle": "Sensations, souvenirs et associations",
    "subjectType": "procédé narratif",
    "periodHint": "Modernisme",
    "lessonId": "lit-modernism-stream-consciousness",
    "prompt": "Le texte suit les glissements de la conscience, mêle perceptions, souvenirs et fragments, sans prétendre enregistrer scientifiquement le cerveau.",
    "answer": "Le flux de conscience",
    "aliases": [
      "flux de conscience",
      "le flux de conscience",
      "stream of consciousness",
      "courant de conscience"
    ],
    "clues": [
      "Il est associé à Joyce et Woolf.",
      "Il ne se confond pas parfaitement avec le monologue intérieur.",
      "Ponctuation et rythme construisent son effet."
    ],
    "explanation": "Le flux de conscience est une construction littéraire qui donne forme aux associations mentales.",
    "blockedGuesses": [
      "monologue intérieur",
      "style indirect libre",
      "narrateur omniscient"
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
    ok:Object.keys(PACKS).length === 12 && Object.values(quality).every(item => item.pass)
  };
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version:VERSION, premium234:audit }; } catch {}
  if (!audit.ok) try { console.warn("HistoDaily beta234 premium content audit", audit); } catch {}
  try { if (typeof renderSoon === "function") renderSoon(); } catch {}
})();
