/* HistoDaily beta 267 — audit éditorial du catalogue.
   Cette passe ne change aucun moteur de jeu : elle renforce les cours trop courts,
   répare les explications de quiz faibles ou dupliquées et nettoie les indices qui
   donnaient involontairement une partie de la réponse. */
(function histodailyBeta267ContentAudit(){
  "use strict";
  const VERSION = "1.0.0-beta.268.0";
  const packs = (typeof READY_LESSON_PACKS === "object" && READY_LESSON_PACKS) || {};
  const mysteries = Array.isArray(data?.mysteries) ? data.mysteries : [];
  const clean = value => String(value || "").replace(/\s+/g, " ").trim();
  const words = value => clean(value).split(/\s+/).filter(Boolean).length;
  const norm = value => clean(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const STOPWORDS = new Set(["alors","apres","avant","avec","avoir","cette","comme","dans","depuis","dessous","entre","etre","fait","font","leurs","mais","moins","plus","pour","pourquoi","quand","quelle","quelles","quels","sans","selon","sont","sous","telle","telles","tous","tout","toute","toutes","vers","ainsi","aussi","cela","celle","celui","elles","encore","leurs","meme","parce","peut","peuvent","plusieurs","reste","situee","tres"]);
  const stemToken = token => token.length > 5 && token.endsWith("s") ? token.slice(0, -1) : token;
  const tokens = value => new Set(norm(value).split(/\s+/).map(stemToken).filter(token => token.length >= 4 && !STOPWORDS.has(token)));
  const firstSentence = value => {
    const text = clean(value);
    const match = text.match(/^.*?[.!?](?:\s|$)/);
    return clean(match ? match[0] : text);
  };
  const ensurePeriod = value => {
    const text = clean(value);
    return text && !/[.!?…]$/.test(text) ? `${text}.` : text;
  };
  const overlap = (a, b) => {
    const A = tokens(a), B = tokens(b);
    let score = 0;
    A.forEach(token => { if (B.has(token)) score += 1; });
    return score;
  };

  const COURSE_ADDITIONS = {
    "art-baroque-light-movement-power": {
      title:"5. Le spectateur placé dans la scène",
      text:"Le baroque ne cherche pas seulement à décorer davantage : il organise une expérience. Les diagonales, les gestes suspendus, les contrastes lumineux et les architectures ouvertes donnent l’impression que l’action déborde du cadre. Dans une église, un palais ou une place, peinture, sculpture et architecture peuvent fonctionner ensemble pour guider le regard et produire de l’émotion. Cette efficacité visuelle sert souvent une institution — monarchie, Église ou grande famille — mais elle n’annule pas l’invention des artistes. Lire une œuvre baroque consiste donc à demander qui doit être impressionné, par quels moyens et au service de quel pouvoir."
    },
    "astro-sun-structure": {
      title:"5. Comment connaît-on un intérieur inaccessible ?",
      text:"Aucune sonde ne peut traverser le Soleil, mais son intérieur laisse des signatures mesurables. Les oscillations de sa surface, étudiées par l’héliosismologie, se propagent différemment selon la densité et la température des couches traversées. Les neutrinos produits par les réactions nucléaires quittent presque immédiatement le cœur et confirment que la fusion s’y déroule réellement. Enfin, les modèles doivent expliquer simultanément la luminosité, le rayon, la composition et l’âge du Soleil. La structure solaire n’est donc pas une coupe imaginaire : c’est une reconstruction contrainte par plusieurs observations indépendantes."
    },
    "astro-light-years-distances": {
      title:"5. Une échelle construite par étapes",
      text:"Les astronomes ne disposent pas d’une règle unique pour toutes les distances. Ils commencent par la géométrie du Système solaire, utilisent ensuite la parallaxe pour les étoiles proches, puis des objets dont la luminosité peut être calibrée pour atteindre d’autres galaxies. Chaque méthode recouvre partiellement la précédente : ces recouvrements permettent de contrôler les erreurs et forment une « échelle des distances ». Une année-lumière reste une unité de longueur, tandis que le parsec vient directement de la parallaxe. Comprendre ces unités, c’est surtout comprendre comment une mesure locale peut progressivement ouvrir l’accès à l’Univers lointain."
    },
    "astro-expansion-dark-universe": {
      title:"5. Trois problèmes qu’il faut distinguer",
      text:"L’expansion, la matière noire et l’énergie noire ne sont pas trois noms pour le même phénomène. L’expansion décrit l’évolution des distances à grande échelle. La matière noire est introduite pour expliquer une gravité supplémentaire révélée par les mouvements des galaxies, les lentilles gravitationnelles et la formation des structures. L’énergie noire désigne ce qui rend compte de l’accélération récente de l’expansion dans le modèle cosmologique actuel. Ces notions sont reliées par un même cadre, mais elles reposent sur des observations différentes. Les confondre donne l’impression d’un mystère unique alors qu’il s’agit de questions physiques distinctes."
    },
    "astro-big-bang": {
      title:"5. Un modèle scientifique, pas un récit d’origine complet",
      text:"Le modèle du Big Bang est puissant parce qu’il relie des observations indépendantes et produit des prévisions testables. Il permet notamment de calculer les abondances d’éléments légers et les propriétés statistiques du fond diffus cosmologique. Il ne dit pas nécessairement ce qui aurait précédé la phase très chaude, ni pourquoi les lois physiques ont cette forme. Cette limite n’est pas un échec : un modèle peut décrire avec précision un domaine sans prétendre répondre à toute question philosophique. La bonne question n’est donc pas « croit-on au Big Bang ? », mais quelles observations le soutiennent et jusqu’où ses équations restent valables."
    },
    "astro-observable-universe": {
      title:"5. Voir loin ne signifie pas voir tout l’Univers",
      text:"L’Univers observable dépend de l’histoire de la lumière et de l’expansion, pas seulement de l’âge cosmique multiplié par la vitesse de la lumière. Pendant que les photons voyagent, l’espace se dilate ; les régions qui les ont émis sont aujourd’hui bien plus éloignées que treize ou quatorze milliards d’années-lumière. Il existe aussi un horizon au-delà duquel aucun signal émis aujourd’hui ne pourra jamais nous atteindre si l’expansion accélérée se poursuit. « Observable » décrit donc une limite d’information propre à notre position et à notre époque, sans démontrer que l’Univers entier s’arrête à cette frontière."
    },
    "astro-ocean-moons": {
      title:"5. Pourquoi ces océans intéressent l’astrobiologie",
      text:"Un océan liquide ne suffit pas à garantir la vie. Il faut aussi une source d’énergie, des éléments chimiques disponibles et une stabilité assez longue. Europe pourrait échanger des matériaux entre sa surface glacée et son océan ; Encelade projette directement dans l’espace de la vapeur, des sels et des molécules carbonées, ce qui permet à une sonde d’échantillonner son environnement sans forer. Les scientifiques cherchent notamment des déséquilibres chimiques capables d’alimenter un métabolisme. Ces lunes sont donc des laboratoires naturels : elles permettent de tester les conditions d’habitabilité sans réduire la recherche de vie à la seule présence d’eau."
    },
    "astro-asteroids-comets": {
      title:"5. Des petits corps, mais une grande mémoire",
      text:"Les planètes ont été profondément transformées par la fusion, la tectonique, l’érosion ou l’atmosphère. Beaucoup d’astéroïdes et de comètes ont conservé des matériaux plus primitifs. Leur composition renseigne donc sur les températures, les mélanges et les migrations qui régnaient lors de la formation du Système solaire. Les météorites permettent des analyses de laboratoire extrêmement précises, tandis que les missions spatiales observent le contexte géologique et rapportent parfois des échantillons identifiés. Comparer ces deux sources évite de traiter tous les petits corps comme identiques : leur origine et leur histoire peuvent être très différentes."
    },
    "astro-giant-planets": {
      title:"5. Quatre géantes, deux familles",
      text:"Jupiter et Saturne sont dominées par l’hydrogène et l’hélium ; Uranus et Neptune contiennent proportionnellement davantage d’eau, d’ammoniac et de méthane dans leurs enveloppes profondes, d’où l’expression « géantes de glace ». Aucune ne possède une surface solide comparable à celle de la Terre. Pression, température et état de la matière changent progressivement vers l’intérieur. Leurs anneaux et leurs nombreuses lunes forment de véritables systèmes planétaires miniatures. Les comparer aide à comprendre pourquoi masse, distance au Soleil, composition initiale et migrations orbitales ont produit des mondes aussi différents à partir du même disque protoplanétaire."
    },
    "astro-telescopes-spectrum": {
      title:"5. Un télescope mesure avant de montrer",
      text:"L’image spectaculaire n’est qu’une partie du travail astronomique. Un détecteur compte des photons, mesure leur énergie, leur position et leur heure d’arrivée. Un spectre peut révéler une composition chimique, une température, une vitesse par effet Doppler ou la présence d’un champ magnétique. Les observations doivent être corrigées des défauts du capteur, de l’atmosphère et de la lumière parasite. Deux instruments regardant le même objet dans des domaines différents peuvent raconter des histoires complémentaires. Le télescope n’agrandit donc pas simplement le ciel : il transforme la lumière reçue en données comparables à des modèles physiques."
    },
    "astro-star-birth-fusion": {
      title:"5. L’équilibre qui règle la vie d’une étoile",
      text:"Une étoile stable résulte d’un équilibre dynamique. Sa gravité comprime le gaz vers le centre, tandis que la pression du plasma chaud et de l’énergie produite s’oppose à cet effondrement. Si le cœur se contracte, il chauffe et les réactions peuvent s’intensifier ; si la production d’énergie augmente trop, l’étoile se dilate et se refroidit. Ce mécanisme de rétroaction explique la longue stabilité de la séquence principale. La masse initiale reste décisive : elle fixe la température centrale, la luminosité, la durée de vie et les éléments que l’étoile pourra fabriquer avant sa fin."
    },
    "astro-habitable-zone-biosignatures": {
      title:"5. Éviter les faux positifs",
      text:"Une molécule associée à la vie sur Terre peut aussi être produite sans organisme. L’oxygène peut par exemple s’accumuler dans certaines atmosphères après la destruction de molécules d’eau par le rayonnement stellaire. Les chercheurs ne cherchent donc pas un marqueur magique, mais un ensemble cohérent : plusieurs gaz en déséquilibre, le contexte de l’étoile, la température, les nuages et l’histoire probable de la planète. Une biosignature est un argument probabiliste qui doit résister à des explications abiotiques. La zone habitable indique seulement où de l’eau liquide pourrait exister en surface, pas où la vie existe nécessairement."
    },
    "astro-rockets-orbits": {
      title:"5. Atteindre l’orbite demande surtout de la vitesse",
      text:"Monter très haut ne suffit pas pour rester dans l’espace. Un objet placé en orbite doit acquérir une vitesse horizontale telle que sa chute épouse continuellement la courbure de la planète. Les fusées dépensent donc une grande partie de leur énergie à accélérer latéralement et à lutter contre les pertes dues à la gravité et à l’atmosphère. Les étages permettent d’abandonner des réservoirs et moteurs devenus inutiles. Une fois en orbite, un bref allumage effectué au bon endroit peut modifier fortement la trajectoire future. La mécanique orbitale repose ainsi sur des impulsions précises plutôt que sur une poussée permanente."
    },
    "astro-space-telescopes": {
      title:"5. L’espace ne résout pas tous les problèmes",
      text:"Un observatoire spatial échappe à la turbulence et à l’absorption de l’atmosphère, mais il devient difficile à réparer, à refroidir et à protéger du rayonnement. Sa taille est limitée par le lancement et ses instruments doivent fonctionner pendant des années sans intervention directe. Les télescopes au sol peuvent au contraire être modernisés, construire des miroirs immenses et utiliser une optique adaptative de plus en plus efficace. Les deux approches sont complémentaires : l’espace ouvre certaines longueurs d’onde et offre une grande stabilité, tandis que le sol fournit surface collectrice, flexibilité et durée de vie."
    },
    "astro-meteors-impacts": {
      title:"5. Du suivi statistique à la défense planétaire",
      text:"La plupart des objets proches de la Terre ne constituent pas une menace immédiate. Les observatoires mesurent plusieurs positions, calculent une orbite puis réduisent progressivement l’incertitude. Une probabilité d’impact peut d’abord augmenter lorsque les données se précisent, avant de disparaître avec de nouvelles observations. La défense planétaire consiste d’abord à découvrir tôt les objets, car une petite modification de vitesse appliquée des années à l’avance peut suffire à écarter une collision. La mission DART a montré qu’un impact contrôlé pouvait modifier la période orbitale d’un petit astéroïde autour de son compagnon."
    },
    "astro-exoplanet-detection": {
      title:"5. Détecter une planète, puis vérifier qu’elle existe",
      text:"Un signal périodique n’est pas automatiquement une planète. Les taches d’une étoile, une autre étoile en arrière-plan ou des variations instrumentales peuvent imiter un transit ou une vitesse radiale. Les équipes cherchent donc plusieurs passages, comparent différentes longueurs d’onde et combinent des méthodes indépendantes. Le transit fournit surtout le rayon relatif de la planète ; la vitesse radiale renseigne sur sa masse minimale. Ensemble, ils permettent d’estimer une densité moyenne et de distinguer grossièrement un monde rocheux d’une planète riche en gaz. La découverte est donc une enquête statistique avant d’être une image."
    },
    "astro-solar-system-formation": {
      title:"5. Les migrations ont brouillé l’ordre initial",
      text:"Le schéma simple — roches près du Soleil, glaces plus loin — constitue un point de départ, pas une photographie définitive. Les jeunes planètes ont échangé de l’énergie et du moment angulaire avec le disque de gaz puis entre elles. Certaines ont migré, dispersé de petits corps ou capturé des satellites. Les résonances orbitales et la composition des météorites conservent des traces de cette évolution. Les modèles actuels doivent expliquer simultanément les masses des planètes, leurs orbites, les ceintures de petits corps et les différences isotopiques. La formation du Système solaire est donc un processus dynamique, pas un simple tri immobile des matériaux."
    },
    "astro-galaxies-cosmic-web": {
      title:"5. La toile cosmique grandit à partir de faibles contrastes",
      text:"Le fond diffus cosmologique montre un Univers ancien presque uniforme, mais pas parfaitement. De minuscules différences de densité ont été amplifiées par la gravitation. La matière noire, qui interagit peu avec la lumière, a formé des structures dans lesquelles le gaz ordinaire a pu tomber, se refroidir et fabriquer des galaxies. À grande échelle, la matière se répartit en filaments, amas et vastes régions moins denses. Les simulations numériques comparent cette croissance aux relevés de galaxies et aux lentilles gravitationnelles. La toile cosmique relie ainsi une physique de l’Univers primordial aux structures observées aujourd’hui."
    },
    "astro-solar-activity-auroras": {
      title:"5. Prévoir la météo de l’espace",
      text:"Une éruption solaire et une éjection de masse coronale ne sont pas exactement le même phénomène, même si elles peuvent être associées. Pour anticiper leurs effets, les observatoires suivent les régions actives, mesurent le champ magnétique et surveillent le vent solaire entre le Soleil et la Terre. L’arrivée de particules et de champs perturbés peut produire des aurores, mais aussi affecter satellites, communications radio, navigation et réseaux électriques. La prévision reste difficile car l’orientation du champ magnétique transporté joue un rôle crucial. La météo spatiale combine donc observation solaire, propagation interplanétaire et réponse de la magnétosphère terrestre."
    },
    "cinema-blockbuster-system": {
      title:"5. Un modèle économique autant qu’une forme de cinéma",
      text:"Le blockbuster moderne ne se définit pas uniquement par son budget ou ses effets spéciaux. Il repose sur une sortie large, une campagne promotionnelle massive, une forte lisibilité internationale et souvent la possibilité de prolonger l’univers par des suites, produits dérivés ou adaptations. Cette concentration des investissements peut réduire la diversité des films visibles, mais elle finance aussi des innovations techniques et des spectacles collectifs. Son succès dépend d’un réseau complet : studios, distributeurs, salles, plateformes et médias. L’analyser demande donc de relier esthétique, calendrier de sortie, risques financiers et stratégie de marque."
    },
    "eco-comparative-advantage-trade": {
      title:"5. Le modèle éclaire un mécanisme, pas toute la politique commerciale",
      text:"L’avantage comparatif montre qu’un échange peut créer un gain total même lorsqu’un partenaire est plus productif dans toutes les activités. Il ne garantit pourtant ni une répartition équitable des bénéfices, ni l’absence de coûts d’adaptation. Des travailleurs, des territoires ou des secteurs peuvent perdre lorsque la spécialisation change rapidement. Transport, dépendances stratégiques, environnement, rapports de force et politiques sociales modifient également le résultat réel. Le modèle sert donc à isoler le rôle du coût d’opportunité ; il ne suffit pas, à lui seul, pour décider quels échanges une société doit encourager ou protéger."
    },
    "geo-oceans-cables-maritime-power": {
      title:"5. La puissance maritime combine flux et contrôle",
      text:"Posséder une longue façade littorale ne suffit pas à faire une puissance maritime. Il faut des ports connectés à l’arrière-pays, des compagnies, des capacités navales, des infrastructures numériques et une influence sur les règles de circulation. Les détroits concentrent les vulnérabilités parce qu’un incident local peut perturber des chaînes mondiales. Les câbles sous-marins montrent aussi que le cyberespace possède une géographie matérielle : ils atterrissent dans des sites précis, peuvent être surveillés, réparés ou endommagés. L’océan apparaît ainsi comme un espace de circulation, de ressources, de souveraineté et de rivalité."
    },
    "geo-metropolization-networks-segregation": {
      title:"5. Une métropole se construit à plusieurs échelles",
      text:"La métropolisation ne se limite pas à l’augmentation de la population d’une grande ville. Elle concentre des fonctions de commandement, des emplois qualifiés, des universités, des infrastructures et des connexions internationales. Cette concentration transforme aussi les périphéries : logements plus éloignés, déplacements longs, nouvelles centralités et concurrence foncière. Les inégalités se lisent entre quartiers mais aussi entre la métropole et les territoires moins connectés. Étudier une métropole exige donc de passer du quartier au réseau mondial, et de distinguer croissance urbaine, attractivité économique et capacité réelle des habitants à accéder aux ressources."
    },
    "northern-viking-worlds-viking-commerce": {
      title:"5. Des échanges fondés sur des réseaux de confiance",
      text:"Le commerce viking ne fonctionne pas comme un marché moderne anonyme. Les transactions reposent sur des rencontres saisonnières, des poids d’argent, des réputations et des protections politiques. Les dirhams islamiques retrouvés en Scandinavie montrent l’ampleur des circuits reliant Baltique, Russie et mondes musulmans. Fourrures, ambre, métaux, textiles et personnes réduites en esclavage circulent ensemble, ce qui interdit d’idéaliser ces réseaux. Les places commerciales comme Hedeby ou Birka associent artisans, marchands et autorités. Le profit dépend donc autant de la maîtrise des routes et des alliances que de la valeur intrinsèque des marchandises."
    },
    "history-early-modern-empires-comparison": {
      title:"5. Comparer sans fabriquer un modèle unique",
      text:"Les empires ottoman, moghol et Qing gouvernent de vastes populations, mais ils ne constituent pas trois versions interchangeables d’un même État. Leurs élites militaires, leurs fiscalités, leurs langues administratives et leurs rapports aux religions diffèrent. La comparaison devient utile lorsqu’elle porte sur une question précise : comment intégrer des provinces éloignées, négocier avec des pouvoirs locaux ou assurer la succession ? Elle évite alors deux pièges : considérer l’Europe comme seule norme de modernité, ou effacer les conflits internes sous l’étiquette vague de tolérance impériale. Comparer sert à faire apparaître des choix historiques, pas à nier les singularités."
    },
    "lit-dystopia": {
      title:"5. La dystopie n’est pas une simple prédiction",
      text:"Une dystopie peut emprunter des technologies ou des institutions plausibles, mais son rôle n’est pas forcément d’annoncer exactement l’avenir. Elle grossit des tendances présentes afin de rendre visibles leurs conséquences : surveillance, contrôle de la langue, hiérarchie sociale ou abandon de l’autonomie. Le lecteur compare constamment le monde fictif au sien. C’est pourquoi des œuvres très différentes peuvent être qualifiées de dystopiques sans partager le même régime politique. Pour analyser le genre, il faut demander quelle liberté est menacée, comment le pouvoir obtient l’obéissance et quelle place le récit laisse encore à la résistance."
    },
    "lit-romanticism": {
      title:"5. Un mouvement européen aux formes multiples",
      text:"Le romantisme circule entre langues et pays, mais il ne produit pas partout les mêmes œuvres. En Allemagne, en Grande-Bretagne ou en France, les écrivains dialoguent avec des révolutions, des traditions nationales et des marchés éditoriaux différents. Le « moi » romantique n’est pas seulement confession intime : il peut devenir une manière de penser l’histoire, le peuple, la nature ou l’exil. Le goût des ruines et du Moyen Âge sert parfois à contester le présent. Parler du romantisme au singulier est donc pratique, à condition de conserver ses conflits internes et ses usages politiques contradictoires."
    },
    "lit-humanism-printing": {
      title:"5. L’imprimé accélère les débats sans les uniformiser",
      text:"L’imprimerie rend possible la reproduction rapide de textes, mais elle ne crée pas automatiquement un public unique ni une vérité partagée. Les ateliers choisissent des œuvres rentables, corrigent, traduisent et parfois censurent. Manuscrits et imprimés continuent longtemps de coexister. Les humanistes utilisent ce nouveau milieu pour comparer des versions, établir des textes anciens et diffuser des controverses religieuses ou savantes. Les erreurs peuvent aussi se multiplier à grande échelle. L’innovation décisive tient donc autant à l’organisation des ateliers, des libraires et des lecteurs qu’à la presse elle-même."
    },
    "lit-realism-naturalism": {
      title:"5. Produire un effet de réel",
      text:"Le réalisme ne consiste pas à copier mécaniquement le monde. Le romancier sélectionne des détails, organise les points de vue et construit des personnages capables de rendre lisibles des rapports sociaux. Le naturalisme radicalise parfois cette ambition en observant les milieux, les corps et les déterminismes, sans transformer pour autant le roman en expérience scientifique véritable. Les descriptions de logements, de vêtements ou d’argent ne sont jamais neutres : elles situent les individus dans une hiérarchie. L’effet de réel est donc une technique narrative qui donne au lecteur le sentiment d’un monde cohérent tout en proposant une interprétation de la société."
    },
    "lit-negritude-cesaire-senghor-damas": {
      title:"5. Une alliance intellectuelle traversée de différences",
      text:"Césaire, Senghor et Damas partagent le refus de l’assimilation coloniale et la volonté de réhabiliter des héritages noirs, mais leurs écritures et leurs projets ne se confondent pas. La Négritude se construit à Paris dans des revues, des rencontres étudiantes et un dialogue avec les avant-gardes, le panafricanisme et les luttes anticoloniales. Elle sera ensuite critiquée pour le risque d’essentialiser une identité noire unique. Ces débats font partie de son histoire. Le mouvement est moins une doctrine fermée qu’une stratégie de reprise de parole dans un espace où la langue et la culture avaient été hiérarchisées."
    },
    "sci-electromagnetism-fields-induction": {
      title:"5. Du phénomène de laboratoire au réseau électrique",
      text:"L’induction relie directement expérience et technique : une variation de flux magnétique crée une tension électrique. Dans une centrale, une turbine fait tourner un aimant ou une bobine ; dans un moteur, le processus inverse transforme un courant en mouvement. Les transformateurs modifient tension et intensité grâce à des champs variables, ce qui permet de transporter l’énergie avec moins de pertes. Pourtant, le concept de champ ne se réduit pas à ces machines. Il offre une description locale des interactions et prépare l’unification de l’électricité, du magnétisme et de la lumière par Maxwell."
    }
  };

  const MYSTERY_PATCHES = {
    "economy-mystery-comparative-advantage-233": {
      clues:[
        "Il ne faut pas le confondre avec la simple supériorité de productivité d’un pays.",
        "David Ricardo en donne une formulation classique.",
        "Il dépend de ce qu’on renonce à produire pour obtenir une unité supplémentaire."
      ]
    },
    "music-mystery-eroica-234": {
      clues:[
        "Elle est en mi bémol majeur.",
        "Elle porte le numéro 3.",
        "Son surnom italien évoque une figure digne de l’épopée plutôt qu’un genre musical précis."
      ]
    },
    "history-mystery-cold-war-236": {
      clues:[
        "Berlin en est un symbole majeur.",
        "En octobre 1962, des missiles installés à Cuba rapprochent les deux superpuissances d’un affrontement nucléaire.",
        "Elle se termine avec l’effondrement du bloc soviétique."
      ]
    },
    "astronomy-mystery-synchronous-rotation-236": {
      clues:[
        "La Lune en est l’exemple le plus familier.",
        "Le satellite tourne bien sur lui-même : sans cela, toutes ses faces seraient successivement visibles depuis la planète.",
        "Les forces de marée installent progressivement cet état."
      ]
    },
    "history-mystery-ceca-237": {
      prompt:"Au début des années 1950, six États européens décident de placer sous une autorité commune deux productions indispensables à l’industrie lourde et aux armements, afin de rendre une nouvelle guerre matériellement plus difficile.",
      clues:[
        "Elle associe notamment la France et l’Allemagne de l’Ouest.",
        "Elle précède la Communauté économique européenne.",
        "Son nom réunit le combustible des hauts-fourneaux et le métal central de l’industrie lourde."
      ]
    },
    "mystery-fire": {
      clues:[
        "Le cadre est celui d’occupations préhistoriques anciennes, connues par des traces matérielles plutôt que par des textes.",
        "Les archéologues observent foyers, charbons, os noircis et sols rubéfiés.",
        "Cette innovation rend possibles chaleur, lumière, cuisson et veillées prolongées."
      ]
    },
    "music-mystery-gregorian-polyphony-120": {
      clues:[
        "Elle se développe dans les écoles religieuses de l’Europe du Moyen Âge.",
        "Ses premières formes sont appelées organum et peuvent superposer une voix mobile à un chant tenu.",
        "Léonin, Pérotin et l’école de Notre-Dame sont associés à son essor aux XIIe et XIIIe siècles."
      ]
    },
    "geography-mystery-map-scale-121": {
      clues:[
        "Il peut être écrit sous forme de fraction ou représenté par une barre graduée.",
        "Au 1:50 000, un centimètre correspond à cinq cents mètres sur le terrain.",
        "Quand le dénominateur est plus petit, la carte couvre moins d’espace mais peut conserver davantage de détails."
      ]
    },
    "economy-mystery-policy-rate-177": {
      clues:[
        "Il oriente les conditions auxquelles les banques obtiennent des liquidités à court terme.",
        "Sa modification influence ensuite le coût du crédit, les placements, le change et les anticipations.",
        "La Banque centrale européenne ou la Réserve fédérale en fixent plusieurs formes."
      ]
    }
  };

  let coursesExpanded = 0;
  let quizExplanationsRepaired = 0;
  let mysteryExplanationsExpanded = 0;
  let mysteriesRewritten = 0;

  function bestSection(pack, question) {
    const sections = Array.isArray(pack?.complete) ? pack.complete.filter(Boolean) : [];
    const target = `${question?.q || ""} ${question?.a || question?.answer || question?.correct || ""}`;
    return sections.map(section => {
      const body = `${section?.title || ""} ${section?.text || ""}`;
      return { section, score:overlap(target, body) };
    }).sort((a, b) => b.score - a.score)[0] || { section:null, score:0 };
  }

  function supportingSentence(section, question, answer, sectionScore) {
    if (!section || sectionScore < 2) return "";
    const target = `${question?.q || ""} ${answer || ""}`;
    const answerTokens = tokens(answer);
    const candidates = clean(section?.text || "").match(/[^.!?]+[.!?]?/g) || [];
    return candidates.map(sentence => {
      const text = ensurePeriod(sentence);
      const sentenceTokens = tokens(text);
      const shared = overlap(answer, text);
      const denominator = Math.max(1, Math.min(answerTokens.size, sentenceTokens.size));
      const repeated = shared / denominator >= .65;
      return { text, repeated, score:overlap(target, text), length:words(text) };
    }).filter(item => item.text && !item.repeated && item.score >= 2 && item.length >= 7)
      .sort((a, b) => b.score - a.score || a.length - b.length)[0]?.text || "";
  }

  Object.entries(packs).forEach(([lessonId, pack]) => {
    if (!pack || typeof pack !== "object") return;
    if (!Array.isArray(pack.complete)) pack.complete = [];
    const addition = COURSE_ADDITIONS[lessonId];
    if (addition && !pack.complete.some(block => norm(block?.title) === norm(addition.title))) {
      pack.complete.push({ ...addition, editorialAddition:"beta267" });
      coursesExpanded += 1;
    }

    const seenWhy = new Set();
    (Array.isArray(pack.quiz) ? pack.quiz : []).forEach(question => {
      if (!question || typeof question !== "object") return;
      const current = clean(question.why || question.explanation || "");
      const key = norm(current);
      const duplicate = key && seenWhy.has(key);
      if (key) seenWhy.add(key);
      const answer = ensurePeriod(question.a ?? question.answer ?? question.correct ?? "");
      const selected = bestSection(pack, question);
      const section = selected.section;
      const support = supportingSentence(section, question, answer, selected.score);
      const mismatch = current && overlap(`${question.q || ""} ${answer}`, current) === 0;
      if (words(current) < 8 || duplicate || mismatch) {
        let joined = clean(`${answer} ${support}`);
        if (words(joined) < 8) joined = clean(`${joined} C’est le repère précis à retenir pour cette question.`);
        question.why = joined || current || "La bonne réponse reprend directement le mécanisme expliqué dans le cours.";
        if (section?.title && support) question.evidence = `« ${clean(section.title).replace(/^\d+[.)]?\s*/, "")} »`;
        quizExplanationsRepaired += 1;
      }
    });
  });

  const alexanderQuiz = packs["greece-alexander-hellenistic-kingdoms"]?.quiz?.[0];
  if (alexanderQuiz) {
    alexanderQuiz.why = "Alexandre règne de -336 à -323, de son accession au trône de Macédoine jusqu’à sa mort à Babylone.";
    alexanderQuiz.evidence = "« La Macédoine change le jeu grec »";
  }

  mysteries.forEach(mystery => {
    const patch = MYSTERY_PATCHES[mystery?.id];
    if (patch) {
      Object.assign(mystery, patch, { editorialMysteryRevision:"beta267" });
      mysteriesRewritten += 1;
    }
    if (words(mystery?.explanation) >= 18) return;
    const pack = packs[mystery?.lessonId];
    const context = firstSentence(pack?.hook || pack?.complete?.[0]?.text || "");
    if (!context) return;
    const current = ensurePeriod(mystery.explanation || `La réponse est ${mystery.answer || "celle-ci"}`);
    mystery.explanation = clean(`${current} ${context}`);
    mysteryExplanationsExpanded += 1;
  });

  const fullCourseWords = pack => words([
    pack?.hook || "",
    ...(pack?.complete || []).map(block => block?.text || ""),
    ...(pack?.deeper || []).map(block => block?.text || "")
  ].join(" "));
  const remainingShortCourses = Object.entries(packs)
    .filter(([, pack]) => fullCourseWords(pack) < 350)
    .map(([id, pack]) => ({ id, words:fullCourseWords(pack) }));
  const brokenMysteryLinks = mysteries
    .filter(mystery => mystery?.lessonId && !packs[mystery.lessonId])
    .map(mystery => mystery.id);
  const malformedQuizzes = Object.entries(packs)
    .filter(([, pack]) => !Array.isArray(pack?.quiz) || pack.quiz.length !== 5)
    .map(([id]) => id);

  const audit = {
    version:VERSION,
    catalog:{ lessons:Object.keys(packs).length, mysteries:mysteries.length },
    coursesExpanded,
    quizExplanationsRepaired,
    mysteryExplanationsExpanded,
    mysteriesRewritten,
    remainingShortCourses,
    brokenMysteryLinks,
    malformedQuizzes,
    ok:remainingShortCourses.length === 0 && brokenMysteryLinks.length === 0 && malformedQuizzes.length === 0
  };
  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version:VERSION, contentAudit267:audit };
    if (!audit.ok) console.warn("HistoDaily beta267 content audit", audit);
    if (typeof renderSoon === "function") renderSoon();
  } catch {}
})();
