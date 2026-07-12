/* HistoDaily beta 242 — cohérence éditoriale et remise en ordre du contenu. */
(function histodailyBeta239ContentCoherence(){
  "use strict";
  const VERSION = "1.0.0-beta.242.0";
  const packs = typeof READY_LESSON_PACKS === "object" && READY_LESSON_PACKS ? READY_LESSON_PACKS : {};
  const mysteries = Array.isArray(data?.mysteries) ? data.mysteries : [];

  const clean = value => String(value || "").replace(/\s+/g, " ").trim();
  const ensurePeriod = value => {
    const text = clean(value);
    return text && !/[.!?…]$/.test(text) ? `${text}.` : text;
  };
  const words = value => clean(value).split(/\s+/).filter(Boolean).length;
  const firstSentence = value => {
    const text = clean(value);
    const match = text.match(/^.*?[.!?](?:\s|$)/);
    return ensurePeriod(match ? match[0].trim() : text);
  };
  const stripNumber = value => clean(value).replace(/^\d+[.)]?\s*/, "");
  const numberedOrder = value => Number((clean(value).match(/^(\d+)/) || [])[1] || 999);
  const lessonMysteries = lessonId => mysteries.filter(mystery => mystery?.lessonId === lessonId);
  const linkedMystery = lessonId => lessonMysteries(lessonId)[0] || null;

  function normalizeSections(pack) {
    if (!Array.isArray(pack?.complete)) return;
    const indexed = pack.complete.map((block, index) => ({ block, index, order:numberedOrder(block?.title) }));
    const numbered = indexed.filter(item => item.order !== 999).length;
    if (numbered >= 2) {
      pack.complete = indexed.sort((a, b) => a.order - b.order || a.index - b.index).map(item => item.block);
    }
  }

  function buildLearningPath(pack, lessonId) {
    const explicit = Array.isArray(pack.learningPath) ? pack.learningPath.filter(Boolean) : [];
    if (explicit.length >= 3) return explicit.slice(0, 4).map(ensurePeriod);

    const takeaways = (pack.takeaways || []).map(item => {
      if (!item) return "";
      const label = clean(item.label || "");
      const text = ensurePeriod(typeof item === "string" ? item : item.text || "");
      return text ? `${label ? `${label} — ` : ""}${text}` : "";
    }).filter(item => words(item) >= 7);
    if (takeaways.length >= 3) return takeaways.slice(0, 4);

    const sections = (pack.complete || []).map(block => {
      const title = stripNumber(block?.title || "");
      const sentence = firstSentence(block?.text || "");
      return title && sentence ? `${title} — ${sentence}` : sentence;
    }).filter(item => words(item) >= 8);
    return sections.slice(0, 4);
  }

  function normalizePack(pack, lessonId) {
    if (!pack || typeof pack !== "object") return;
    normalizeSections(pack);
    const learningPath = buildLearningPath(pack, lessonId);
    if (learningPath.length >= 3) {
      pack.learningPath = learningPath;
      pack.keyFacts = learningPath.slice();
    }
    pack.editorialFlow = "problem-course-review";
    pack.coherenceRevision = VERSION;
  }

  /* ---------- Réparation complète : mort des étoiles ---------- */
  if (packs["astro-stellar-deaths"]) {
    Object.assign(packs["astro-stellar-deaths"], {
      hook:"Pourquoi le Soleil deviendra-t-il une naine blanche alors qu’une étoile plus massive peut exploser puis laisser une étoile à neutrons ou un trou noir ? La réponse tient surtout à la masse du cœur et à ce qui peut encore résister à la gravitation.",
      learningPath:[
        "Masse initiale — elle fixe la température du cœur, la durée de vie et les réactions de fusion possibles.",
        "Étoile modérée — après la géante rouge, l’enveloppe est expulsée et le cœur devient une naine blanche.",
        "Étoile massive — la fusion progresse jusqu’au fer, puis le cœur s’effondre et déclenche une supernova.",
        "Reste compact — selon la masse résiduelle, l’effondrement laisse une étoile à neutrons ou un trou noir."
      ],
      express:[
        "Le destin d’une étoile dépend d’abord de sa masse. Une étoile plus massive possède un cœur plus chaud, consomme plus vite son combustible et peut fabriquer des éléments plus lourds. Le Soleil, lui, n’atteindra jamais les conditions nécessaires pour former un cœur de fer ni exploser en supernova.",
        "Quand le Soleil aura épuisé l’hydrogène de son cœur, celui-ci se contractera tandis que les couches externes se dilateront : il deviendra une géante rouge. Il expulsera ensuite son enveloppe. Le cœur restant, très dense mais trop léger pour s’effondrer davantage, deviendra une naine blanche soutenue par la pression quantique des électrons.",
        "Dans une étoile beaucoup plus massive, la fusion forme des noyaux de plus en plus lourds jusqu’au fer. Fusionner le fer ne libère plus d’énergie pour soutenir le cœur. La gravitation l’emporte alors brutalement : le cœur s’effondre et les couches externes sont éjectées lors d’une supernova.",
        "Le résidu comprimé peut devenir une étoile à neutrons. S’il est encore trop massif pour être soutenu, l’effondrement se poursuit et forme un trou noir. Un pulsar est une étoile à neutrons en rotation dont les faisceaux balaient périodiquement la Terre."
      ],
      complete:[
        {title:"1. La masse décide de la trajectoire",text:"Une étoile reste stable tant que la pression liée à l’énergie produite dans son cœur compense la gravitation. Sa masse initiale fixe la température du cœur, la vitesse à laquelle elle consomme son combustible et les réactions de fusion qu’elle peut entretenir. Les étoiles massives vivent donc moins longtemps que les petites : elles disposent de plus de combustible, mais le brûlent beaucoup plus vite.\n\nIl n’existe pas une mort stellaire unique. Il faut suivre une chaîne logique : masse initiale, combustibles accessibles, effondrement du cœur, puis nature du reste compact."},
        {title:"2. Le Soleil finira en naine blanche",text:"Lorsque l’hydrogène central se raréfie, le cœur du Soleil se contracte et chauffe. Les couches externes se dilatent : l’étoile devient une géante rouge. Des phases de fusion supplémentaires ont lieu, mais le Soleil n’est pas assez massif pour aller jusqu’à la formation d’un cœur de fer.\n\nIl expulsera progressivement son enveloppe, qui formera une nébuleuse planétaire. Le cœur restant deviendra une naine blanche : un objet de taille comparable à la Terre, contenant une grande fraction de la masse solaire et soutenu par la pression de dégénérescence des électrons. Il se refroidira lentement sans nouvelle fusion durable."},
        {title:"3. Une étoile massive s’effondre au stade du fer",text:"Une étoile massive peut fusionner successivement hydrogène, hélium, carbone, oxygène puis d’autres noyaux. Ces réactions produisent de l’énergie tant qu’elles conduisent vers des noyaux plus liés. Le fer marque une limite : sa fusion ne fournit plus l’énergie nécessaire pour soutenir le cœur.\n\nEn quelques instants, la gravitation provoque l’effondrement. La matière centrale est comprimée à des densités extrêmes ; les couches externes tombent puis sont violemment expulsées. L’explosion de supernova disperse dans le milieu interstellaire des éléments fabriqués par l’étoile et par l’explosion elle-même."},
        {title:"4. Étoile à neutrons, pulsar ou trou noir",text:"Si le cœur résiduel peut encore être soutenu, il devient une étoile à neutrons : quelques dizaines de kilomètres pour une masse comparable à celle du Soleil. Son champ magnétique et sa rotation peuvent produire deux faisceaux de rayonnement. Quand ces faisceaux balayent régulièrement la Terre, l’objet est observé comme un pulsar.\n\nSi le cœur est trop massif, aucune pression connue ne suffit à arrêter l’effondrement. Un trou noir se forme. Son horizon des événements n’est pas une surface matérielle : c’est une frontière causale au-delà de laquelle aucun signal ne peut revenir vers l’extérieur."},
        {title:"5. Comment sait-on quel reste s’est formé ?",text:"Les astronomes relient plusieurs observations. Le spectre d’une supernova renseigne sur les éléments éjectés et sur la vitesse de l’explosion. Un pulsar se reconnaît à ses impulsions régulières, tandis qu’une étoile à neutrons peut aussi être détectée en rayons X. Un trou noir est révélé par les orbites d’étoiles ou de gaz voisins, par le rayonnement de matière chauffée avant sa chute, ou par les ondes gravitationnelles émises lors de la fusion de deux objets compacts.\n\nCe faisceau d’indices permet de tester les modèles d’évolution stellaire au lieu de déduire le destin d’une étoile à partir d’une seule image."}
      ],
      deeper:[
        {title:"Une supernova ne crée pas tout",text:"De nombreux éléments sont fabriqués pendant la vie de l’étoile. Les explosions et les collisions d’objets compacts complètent cette production, notamment pour certains noyaux très lourds."},
        {title:"Une naine blanche n’est pas une petite étoile active",text:"Elle ne tire plus son énergie d’une fusion durable. Sa lumière vient surtout de la chaleur accumulée qu’elle rayonne en se refroidissant."},
        {title:"Un trou noir n’aspire pas l’Univers",text:"À distance égale, il exerce la même attraction qu’un autre objet de même masse. Les effets extrêmes apparaissent seulement à proximité immédiate."}
      ],
      takeaways:[
        {label:"Cause",text:"La masse initiale détermine les réactions de fusion possibles et la violence de la fin de vie."},
        {label:"Soleil",text:"Il expulsera son enveloppe puis laissera une naine blanche, sans supernova."},
        {label:"Étoile massive",text:"La formation d’un cœur de fer déclenche l’effondrement et l’explosion."},
        {label:"Reste",text:"Le cœur devient une étoile à neutrons ou, s’il est trop massif, un trou noir."}
      ]
    });
  }

  /* ---------- Mystères dont le terme central était absent du cours ---------- */
  const islamic = packs["art-islamic-space-calligraphy-pattern"];
  if (islamic) {
    islamic.express[1] = `${islamic.express[1]} Les muqarnas, assemblages de petites cellules en encorbellement, font passer d’un mur à une coupole ou à une niche tout en fragmentant la lumière.`;
    const ornament = islamic.complete.find(block => /^4\./.test(clean(block?.title)));
    if (ornament) ornament.text += "\n\nLes muqarnas constituent un cas spectaculaire de cette logique. Ces alvéoles superposées articulent corniches, niches et coupoles. Elles ne sont pas seulement décoratives : elles résolvent une transition architecturale et transforment la lumière en une succession de facettes.";
    islamic.learningPath = [
      "Pluralité — les arts des sociétés musulmanes ne forment ni un style unique ni un art uniquement religieux.",
      "Espace — la mosquée combine orientation rituelle, techniques locales et représentation du pouvoir.",
      "Langage visuel — calligraphie, géométrie, arabesque et muqarnas organisent autant l’espace qu’ils le décorent.",
      "Images — la figuration existe, mais ses usages dépendent du lieu, de l’époque et de la fonction."
    ];
  }

  const antibiotics = packs["science-antibiotics-resistance-public-health"];
  if (antibiotics) {
    antibiotics.express[2] = `${antibiotics.express[2]} En pratique, l’antibiogramme met une souche bactérienne au contact de plusieurs antibiotiques : les zones sans croissance indiquent les molécules auxquelles elle reste sensible et aident à choisir un traitement ciblé.`;
    const last = antibiotics.complete[antibiotics.complete.length - 1];
    if (last) last.text += "\n\nL’antibiogramme relie directement diagnostic et bon usage. Une bactérie isolée chez le patient est cultivée autour de disques imprégnés d’antibiotiques. La taille des zones d’inhibition permet de classer la souche comme sensible ou résistante et d’éviter, lorsque c’est possible, une molécule trop large ou inefficace.";
    antibiotics.learningPath = [
      "Découverte collective — Fleming observe l’effet, puis Florey, Chain, Heatley et l’industrie rendent la pénicilline utilisable.",
      "Cible — un antibiotique agit sur des structures bactériennes et ne traite pas les infections virales.",
      "Sélection — les variantes résistantes survivent mieux lorsque l’antibiotique élimine les bactéries sensibles.",
      "Choix du traitement — culture, diagnostic et antibiogramme permettent de prescrire plus précisément."
    ];
  }

  const quantum = packs["sci-quantum-quanta-probability"];
  if (quantum) {
    quantum.express[0] = quantum.express[0].replace("les quanta.", "les quanta : chaque paquet élémentaire est un quantum d’énergie.");
    quantum.complete[0].text = quantum.complete[0].text.replace("quantités discrètes proportionnelles à la fréquence.", "quantités discrètes proportionnelles à la fréquence. Chacun de ces paquets est un quantum d’énergie.");
    quantum.learningPath = [
      "Quantum — certains échanges d’énergie se font par paquets discrets plutôt que de manière continue.",
      "Photon — l’effet photoélectrique montre que l’énergie de la lumière dépend de la fréquence de chaque photon.",
      "État quantique — la théorie prédit des probabilités de résultats, non des trajectoires classiques cachées.",
      "Applications — transistors, lasers et spectroscopie exploitent directement ces règles."
    ];
    const mystery = mysteries.find(item => item?.id === "science-mystery-quantum-236");
    if (mystery) {
      mystery.answer = "Un quantum d’énergie";
      mystery.aliases = Array.from(new Set([...(mystery.aliases || []), "quantum", "le quantum", "un quantum", "quantum d energie", "quantification de l energie"]));
      mystery.explanation = "Planck appelle quantum chaque paquet élémentaire d’énergie échangé selon une quantité liée à la fréquence.";
    }
  }

  const containers = packs["geo-containers-chokepoints"];
  if (containers) {
    containers.express[0] = `La conteneurisation désigne l’organisation du transport autour de boîtes standardisées. Avant elle, charger un navire demande de manipuler séparément sacs, caisses et tonneaux. Le même conteneur passe désormais du navire au train puis au camion, ce qui réduit fortement les ruptures de charge.`;
    containers.complete[0].text = containers.complete[0].text.replace("sa standardisation internationale transforme l’échelle du système.", "sa standardisation internationale transforme l’échelle du système. Cette réorganisation complète des flux est appelée conteneurisation.");
    containers.learningPath = [
      "Standardisation — la conteneurisation impose une boîte compatible avec navires, trains, camions et grues.",
      "Intermodalité — la marchandise change de mode de transport sans être déchargée à chaque étape.",
      "Concentration — quelques ports, façades et armateurs organisent une grande partie des échanges mondiaux.",
      "Vulnérabilité — canaux, détroits et flux tendus transmettent rapidement un blocage local au reste du monde."
    ];
  }

  const hiphop = packs["music-hiphop-sampling"];
  if (hiphop) {
    hiphop.express[0] = hiphop.express[0].replace("le break, le passage où la batterie domine.", "le break, le passage où la batterie domine. Prolongé et répété par le DJ, ce fragment devient un breakbeat : la base rythmique sur laquelle dansent les b-boys et b-girls et interviennent les MC.");
    const breakSection = hiphop.complete.find(block => /^2\./.test(clean(block?.title)));
    if (breakSection) breakSection.text += "\n\nLe terme breakbeat désigne ce rythme isolé ou recomposé à partir d’un break. Il peut venir de deux disques alternés sur les platines, puis plus tard d’une boucle créée avec un sampler ou une boîte à rythmes.";
    hiphop.learningPath = [
      "Fête de quartier — le hip-hop naît d’espaces collectifs, de sound systems et d’héritages caribéens, afro-américains et latino.",
      "Breakbeat — le DJ isole puis prolonge le passage rythmique qui devient une matière musicale et dansée.",
      "MC et rap — l’animation de la foule évolue vers des textes rimés, des récits et des performances autonomes.",
      "Sampling — les producteurs découpent des enregistrements pour composer, tout en rencontrant des enjeux de mémoire et de droits."
    ];
  }

  /* ---------- Suppression du bloc astronomique générique répété ---------- */
  const astronomyEvidence = {
    "astro-solar-activity-auroras": ["5. Relier les éruptions solaires aux effets terrestres", "Les satellites observent le Soleil en lumière visible, ultraviolet et rayons X, tandis que des instruments mesurent le vent solaire et le champ magnétique près de la Terre. Lorsqu’une éjection de masse coronale arrive, son orientation magnétique détermine en partie l’intensité de la tempête géomagnétique. Les aurores, les perturbations radio, les erreurs de navigation et les courants induits dans les réseaux constituent alors différentes conséquences d’un même événement spatial."],
    "astro-solar-system-formation": ["5. Les archives du disque primitif", "La formation du Système solaire est reconstruite grâce aux météorites datées, aux compositions isotopiques, aux orbites des planètes et aux observations de disques autour de jeunes étoiles. Les inclusions les plus anciennes de certaines météorites donnent un âge d’environ 4,57 milliards d’années. Les astéroïdes et les comètes conservent des matériaux moins transformés que ceux des grandes planètes et permettent donc de tester les scénarios d’accrétion."],
    "astro-rocky-planets": ["5. Comparer pour comprendre les climats planétaires", "Les sondes, les radars et la spectroscopie mesurent reliefs, atmosphères et compositions. La comparaison explique pourquoi Vénus connaît un effet de serre extrême, pourquoi Mars a perdu une grande partie de son atmosphère et pourquoi Mercure subit de très forts contrastes thermiques. La Terre ne constitue pas une norme automatique : elle est un cas parmi quatre planètes rocheuses ayant divergé sous l’effet de leur masse, de leur eau et de leur histoire géologique."],
    "astro-giant-planets": ["5. Sonder des mondes sans surface solide", "Les sondes mesurent gravité, champ magnétique, atmosphère et anneaux. Les occultations d’étoiles révèlent la structure des anneaux ; les trajectoires des satellites renseignent sur la masse interne ; les émissions infrarouges montrent que Jupiter, Saturne et Neptune libèrent encore de la chaleur. Comme il est impossible d’observer directement leur intérieur, les modèles doivent reproduire simultanément plusieurs familles de données."],
    "astro-ocean-moons": ["5. Chercher un océan sous la glace", "Les océans internes sont déduits de la gravité, des champs magnétiques induits, des fissures de surface et des panaches. À Encelade, Cassini a traversé des jets contenant eau, sels et molécules organiques. À Europe, les déformations de la croûte et les mesures magnétiques indiquent une couche conductrice compatible avec un océan salé. Ces indices établissent un environnement potentiellement habitable, pas la présence de vie."],
    "astro-asteroids-comets": ["5. Des échantillons pour remonter aux origines", "Les missions de retour d’échantillons permettent d’analyser en laboratoire grains, minéraux et molécules. Hayabusa2 a rapporté de la matière de Ryugu et OSIRIS-REx de Bennu. Les comètes sont étudiées par leur coma, leur queue et leur composition volatile. En comparant ces matériaux à ceux des météorites, les chercheurs reconstituent les régions du disque où les petits corps se sont formés et les déplacements qu’ils ont ensuite subis."],
    "astro-meteors-impacts": ["5. Mesurer le risque d’impact", "Les réseaux de caméras triangulent les trajectoires des météores et peuvent relier une météorite à son orbite initiale. Pour les astéroïdes proches de la Terre, plusieurs nuits d’observation affinent l’orbite et réduisent l’incertitude. La mission DART a testé une déviation par impact cinétique sur Dimorphos : le but n’est pas de détruire l’objet, mais de modifier très légèrement sa vitesse suffisamment tôt pour qu’il manque la Terre."],
    "astro-exoplanet-detection": ["5. Croiser les méthodes pour décrire une planète", "Un transit donne surtout le rayon relatif de la planète ; les vitesses radiales fournissent une masse minimale. Lorsque les deux sont disponibles, la densité moyenne aide à distinguer monde rocheux, planète riche en eau ou géante gazeuse. Le spectre obtenu pendant un transit peut révéler certaines molécules atmosphériques. Chaque résultat dépend toutefois de l’activité de l’étoile, de l’orientation de l’orbite et des limites de l’instrument."],
    "astro-habitable-zone-biosignatures": ["5. Une biosignature doit résister aux faux positifs", "Une molécule n’est pas une preuve de vie à elle seule. Oxygène, méthane ou autres gaz peuvent avoir des origines biologiques, géologiques ou photochimiques. Il faut donc étudier plusieurs molécules ensemble, le type d’étoile, la température, les nuages et l’évolution probable de l’atmosphère. La recherche vise un ensemble d’indices difficile à expliquer sans activité biologique, tout en conservant des scénarios non vivants à tester."],
    "astro-telescopes-spectrum": ["5. Le spectre transforme la lumière en mesure", "Chaque atome ou molécule produit des raies caractéristiques. Leur intensité renseigne sur la température et l’abondance ; leur décalage Doppler mesure un mouvement le long de la ligne de visée ; leur élargissement peut indiquer rotation, pression ou turbulence. Un télescope collecte donc des photons, mais le spectrographe permet d’en extraire une véritable analyse physique de l’objet observé."],
    "astro-space-telescopes": ["5. Pourquoi associer observatoires au sol et dans l’espace", "Les télescopes spatiaux accèdent aux rayons X, à une partie de l’ultraviolet et de l’infrarouge absorbés par l’atmosphère, tout en offrant une grande stabilité. Les observatoires terrestres peuvent cependant être beaucoup plus grands, réparés et modernisés. L’optique adaptative corrige une partie de la turbulence. Les meilleurs résultats viennent souvent de campagnes communes, où plusieurs instruments observent le même phénomène à des longueurs d’onde différentes."],
    "astro-rockets-orbits": ["5. Une orbite se vérifie par la vitesse et l’énergie", "Les ingénieurs calculent la trajectoire en suivant position, vitesse et énergie du véhicule. Une poussée brève peut relever ou abaisser une partie de l’orbite ; une manœuvre au bon moment change l’inclinaison ou prépare une rencontre. Les assistances gravitationnelles échangent de l’énergie avec le mouvement d’une planète. Le vol spatial est donc moins une montée verticale continue qu’une succession de changements précis de vitesse."],
    "astro-moon-mars-exploration": ["5. Des missions conçues autour d’une question", "Un orbiteur cartographie de vastes régions, un atterrisseur mesure longtemps un site, un rover se déplace entre plusieurs terrains et un retour d’échantillons offre les instruments des laboratoires terrestres. Sur Mars, le délai radio impose une forte autonomie ; sur la Lune, la proximité facilite les communications mais les nuits, la poussière et les températures restent difficiles. Le choix d’une mission dépend donc de la question scientifique, pas seulement de la distance atteinte."]
  };
  Object.entries(astronomyEvidence).forEach(([id, replacement]) => {
    const pack = packs[id];
    if (!pack || !Array.isArray(pack.complete)) return;
    const index = pack.complete.findIndex(block => /Comment les astronomes tranchent|Pour étudier «/i.test(`${block?.title || ""} ${block?.text || ""}`));
    if (index >= 0) pack.complete[index] = { title:replacement[0], text:replacement[1] };
  });


  /* ---------- Astronomie : suppression des approfondissements génériques répétés ---------- */
  const astronomyDeeper = {
    "astro-observable-universe":[
      {title:"Voir loin, c’est voir ancien",text:"La galaxie d’Andromède est observée telle qu’elle était il y a environ 2,5 millions d’années. Pour les galaxies les plus lointaines, le décalage temporel atteint des milliards d’années."},
      {title:"Observable ne signifie pas totalité",text:"L’Univers observable est limité par le temps de trajet des signaux et par l’expansion. Il peut n’être qu’une partie d’un Univers beaucoup plus vaste."},
      {title:"Une distance qui dépend de la question",text:"En cosmologie, distance actuelle, temps de trajet de la lumière et distance déduite de la luminosité ne coïncident pas toujours, car l’espace s’est dilaté pendant le voyage du signal."}
    ],
    "astro-light-years-distances":[
      {title:"Année-lumière : une distance",text:"Une année-lumière vaut environ 9 460 milliards de kilomètres. Le mot « année » décrit ici la durée utilisée pour définir la distance, pas le temps nécessaire à une fusée."},
      {title:"Le parsec vient d’un angle",text:"Une étoile située à un parsec présente une parallaxe d’une seconde d’arc lorsque la base de mesure correspond au rayon de l’orbite terrestre."},
      {title:"Une échelle calibrée par chevauchement",text:"Parallaxes, céphéides et supernovæ ne couvrent pas les mêmes distances. Leur chevauchement permet de vérifier qu’un barreau de l’échelle cosmique est cohérent avec le précédent."}
    ],
    "astro-big-bang":[
      {title:"Pas d’explosion dans un espace vide",text:"Le modèle décrit la dilatation de l’espace partout à la fois. Il ne suppose donc ni centre de l’explosion ni bord vers lequel la matière se déplacerait."},
      {title:"Trois preuves majeures",text:"Expansion des galaxies, fond diffus cosmologique et abondance des éléments légers forment trois tests indépendants d’un Univers autrefois plus chaud et plus dense."},
      {title:"Ce que le modèle ne résout pas seul",text:"Il décrit très bien l’évolution ancienne après les premières fractions de seconde, mais ne donne pas nécessairement une réponse complète sur l’origine absolue, l’inflation ou la nature de la matière noire."}
    ],
    "astro-expansion-dark-universe":[
      {title:"Matière noire : une gravité supplémentaire",text:"Elle est invoquée pour expliquer notamment les vitesses orbitales dans les galaxies, les lentilles gravitationnelles et la formation des grandes structures."},
      {title:"Énergie noire : une autre question",text:"Elle désigne la cause encore inconnue de l’accélération récente de l’expansion cosmique. Elle ne remplace pas la matière noire et ne répond pas aux mêmes observations."},
      {title:"Des noms, pas des explications finales",text:"Les termes résument des effets mesurés. Leur nature physique reste l’un des grands problèmes ouverts de la cosmologie."}
    ],
    "astro-star-birth-fusion":[
      {title:"Un nuage ne s’effondre pas partout",text:"Turbulence, champs magnétiques et pression peuvent freiner la gravitation. La naissance stellaire se concentre dans les zones les plus denses et les plus froides."},
      {title:"La protoétoile précède la fusion stable",text:"Avant la séquence principale, l’objet brille surtout grâce à l’énergie libérée par sa contraction. La véritable stabilité commence lorsque la fusion de l’hydrogène s’entretient dans le cœur."},
      {title:"Le disque prépare les planètes",text:"Une partie du gaz et de la poussière conserve son mouvement orbital autour de la jeune étoile. Ce disque protoplanétaire fournit la matière des futurs petits corps et planètes."}
    ],
    "astro-stellar-deaths":[
      {title:"Une supernova ne crée pas tout",text:"De nombreux éléments sont fabriqués pendant la vie de l’étoile. Les explosions et les collisions d’objets compacts complètent cette production, notamment pour certains noyaux très lourds."},
      {title:"Une naine blanche n’est pas une petite étoile active",text:"Elle ne tire plus son énergie d’une fusion durable. Sa lumière vient surtout de la chaleur accumulée qu’elle rayonne en se refroidissant."},
      {title:"Un trou noir n’aspire pas l’Univers",text:"À distance égale, il exerce la même attraction qu’un autre objet de même masse. Les effets extrêmes apparaissent seulement à proximité immédiate."}
    ],
    "astro-sun-structure":[
      {title:"La lumière met du temps à sortir",text:"L’énergie produite dans le cœur traverse l’intérieur par d’innombrables interactions avant d’atteindre la photosphère. Le photon visible qui s’échappe n’a pas simplement parcouru une ligne droite depuis le centre."},
      {title:"La photosphère n’est pas une surface solide",text:"C’est la couche à partir de laquelle le plasma devient assez transparent pour que la lumière visible puisse s’échapper efficacement."},
      {title:"La couronne pose encore des questions",text:"L’atmosphère externe du Soleil atteint des températures bien supérieures à celles de la photosphère. Les champs magnétiques jouent un rôle majeur dans ce chauffage."}
    ],
    "astro-solar-activity-auroras":[
      {title:"Tache solaire ne signifie pas trou",text:"Une tache est une région de la photosphère plus froide que son environnement, liée à de forts champs magnétiques ; elle paraît sombre seulement par contraste."},
      {title:"Éruption et éjection ne sont pas identiques",text:"Une éruption libère rapidement de l’énergie et du rayonnement. Une éjection de masse coronale projette une grande quantité de plasma et de champ magnétique dans l’espace."},
      {title:"Les aurores tracent le champ terrestre",text:"Les particules chargées sont guidées vers les régions polaires, où elles excitent oxygène et azote. La couleur dépend de l’espèce, de l’altitude et de l’énergie des particules."}
    ],
    "astro-solar-system-formation":[
      {title:"L’aplatissement vient du mouvement",text:"En se contractant, le nuage conserve son moment angulaire. Les collisions dissipent les mouvements désordonnés et concentrent progressivement la matière dans un disque."},
      {title:"La température trie les matériaux",text:"Près du Soleil jeune, seuls roches et métaux condensent facilement. Plus loin, des glaces peuvent s’ajouter, ce qui favorise la croissance de noyaux massifs."},
      {title:"Les migrations brouillent le plan initial",text:"Les planètes et petits corps ont pu changer d’orbite. La disposition actuelle n’est donc pas une photographie immobile du disque d’origine."}
    ],
    "astro-rocky-planets":[
      {title:"Vénus n’est pas chaude parce qu’elle est seulement plus proche",text:"Son atmosphère très épaisse riche en dioxyde de carbone produit un effet de serre extrême, bien plus déterminant que la seule distance au Soleil."},
      {title:"Mars conserve les traces d’un passé humide",text:"Vallées, deltas et minéraux altérés indiquent que de l’eau liquide a circulé durablement à sa surface, même si le climat actuel est froid et sec."},
      {title:"Mercure possède un grand noyau",text:"Sa densité et son champ magnétique montrent une forte proportion de métal. Son histoire reste discutée entre composition initiale et pertes lors de collisions anciennes."}
    ],
    "astro-giant-planets":[
      {title:"Pas de sol où se poser",text:"Dans Jupiter et Saturne, l’atmosphère devient progressivement plus dense avec la profondeur. Il n’existe pas de frontière nette comparable à la surface rocheuse de la Terre."},
      {title:"Les anneaux sont des systèmes dynamiques",text:"Ils sont formés d’innombrables particules en orbite. Résonances avec les lunes, collisions et gravité sculptent divisions, vagues et arcs."},
      {title:"Uranus tourne presque couchée",text:"Son axe très incliné produit des saisons extrêmes. Une collision géante ancienne est souvent envisagée, sans constituer l’unique scénario étudié."}
    ],
    "astro-ocean-moons":[
      {title:"La marée peut chauffer un monde",text:"Une orbite légèrement excentrique fait varier les forces gravitationnelles. Les déformations répétées dissipent de l’énergie dans l’intérieur de la lune."},
      {title:"Un panache offre un accès indirect",text:"À Encelade, des jets expulsent des matériaux provenant de l’océan interne. Une sonde peut les analyser sans forer plusieurs kilomètres de glace."},
      {title:"Habitable n’est pas habité",text:"Eau liquide, énergie et molécules organiques rendent un milieu intéressant. Ils ne démontrent ni l’apparition ni la présence actuelle d’organismes."}
    ],
    "astro-asteroids-comets":[
      {title:"La ceinture d’astéroïdes n’est pas un embouteillage",text:"Les objets sont séparés par de très grandes distances. Une sonde peut la traverser sans slalomer continuellement entre des rochers."},
      {title:"La queue ne suit pas forcément la trajectoire",text:"Poussières et gaz sont repoussés par le rayonnement et le vent solaire. Les queues pointent globalement à l’opposé du Soleil."},
      {title:"Primitive ne signifie pas inchangée",text:"Ces corps conservent des matériaux anciens, mais collisions, chauffage, irradiation et passages près du Soleil ont aussi transformé leur surface."}
    ],
    "astro-meteors-impacts":[
      {title:"Trois mots pour trois étapes",text:"Le météoroïde se trouve dans l’espace, le météore est le phénomène lumineux atmosphérique et la météorite est le fragment retrouvé au sol."},
      {title:"Les essaims reviennent parce que la Terre recroise une orbite",text:"Des comètes laissent des courants de poussières. Quand la Terre traverse le même courant chaque année, les météores semblent jaillir d’un radiant commun."},
      {title:"Dévier tôt vaut mieux que frapper fort",text:"Une très petite variation de vitesse, appliquée des années avant la rencontre, peut produire un écart suffisant pour éviter la collision."}
    ],
    "astro-exoplanet-detection":[
      {title:"Le transit dépend de l’alignement",text:"Une planète peut exister sans jamais passer devant son étoile depuis notre point de vue. L’absence de transit ne prouve donc pas l’absence de planète."},
      {title:"La vitesse radiale mesure un va-et-vient",text:"La planète et l’étoile tournent autour de leur centre de masse commun. Le spectre stellaire se décale légèrement vers le rouge puis vers le bleu."},
      {title:"Les catalogues ont des biais",text:"Les grosses planètes proches de leur étoile produisent des signaux plus forts et plus fréquents. Elles ont donc été découvertes plus facilement au début des recherches."}
    ],
    "astro-habitable-zone-biosignatures":[
      {title:"La zone habitable dépend de l’atmosphère",text:"La distance à l’étoile ne suffit pas. Pression, composition, nuages, rotation et activité stellaire modifient fortement la température de surface."},
      {title:"Une biosignature doit être contextuelle",text:"Une molécule intéressante ne vaut que replacée dans un ensemble chimique et géologique. Les faux positifs non biologiques doivent être testés."},
      {title:"La vie souterraine élargit les scénarios",text:"Des océans internes chauffés par les marées montrent qu’un environnement potentiellement habitable peut exister loin de la zone tempérée classique."}
    ],
    "astro-telescopes-spectrum":[
      {title:"Plus grand signifie surtout plus de lumière",text:"Un miroir plus large collecte davantage de photons et peut améliorer la résolution. Le grossissement seul ne crée pas d’information supplémentaire."},
      {title:"Une raie est une signature physique",text:"Atomes et molécules absorbent ou émettent à des longueurs d’onde précises. Leur spectre révèle composition, température et conditions du milieu."},
      {title:"Le décalage Doppler mesure un mouvement radial",text:"Il renseigne sur la composante du mouvement vers nous ou loin de nous, pas automatiquement sur toute la vitesse réelle dans l’espace."}
    ],
    "astro-space-telescopes":[
      {title:"L’atmosphère protège et limite",text:"Elle bloque des rayonnements dangereux pour la vie, mais empêche aussi d’observer depuis le sol une grande partie des rayons X, de l’ultraviolet et de l’infrarouge."},
      {title:"Le froid est un outil scientifique",text:"Un télescope infrarouge doit limiter son propre rayonnement thermique afin de ne pas éblouir les signaux faibles qu’il cherche à mesurer."},
      {title:"L’espace impose des contraintes sévères",text:"Masse, lancement, réparations difficiles, rayonnement et durée de mission obligent à choisir soigneusement instruments et architecture."}
    ],
    "astro-rockets-orbits":[
      {title:"Une fusée pousse en expulsant de la masse",text:"Les gaz sont accélérés vers l’arrière ; le véhicule reçoit une quantité de mouvement opposée. Le principe fonctionne aussi dans le vide."},
      {title:"Être en orbite, c’est tomber sans toucher le sol",text:"La gravité reste forte. La vitesse horizontale fait que la courbure de la trajectoire suit celle de la Terre."},
      {title:"Une assistance gravitationnelle échange de l’énergie",text:"Une sonde utilise le mouvement orbital d’une planète pour modifier sa vitesse et sa direction dans le référentiel du Soleil."}
    ],
    "astro-moon-mars-exploration":[
      {title:"La Lune conserve une histoire ancienne",text:"Sans atmosphère épaisse ni tectonique globale active, sa surface garde de nombreux cratères et des roches permettant de dater les débuts du Système solaire."},
      {title:"Mars oblige à l’autonomie",text:"Le délai des communications varie de plusieurs minutes à plus de vingt minutes dans un sens. Un rover doit donc détecter certains dangers et exécuter seul des séquences."},
      {title:"Retourner un échantillon change l’analyse",text:"Les laboratoires terrestres utilisent des instruments trop lourds ou complexes pour une mission. Ils peuvent aussi conserver une partie de l’échantillon pour des techniques futures."}
    ]
  };
  Object.entries(astronomyDeeper).forEach(([id, blocks]) => {
    if (packs[id]) packs[id].deeper = blocks;
  });

  /* ---------- Normalisation de tous les packs après réparations ---------- */
  Object.entries(packs).forEach(([lessonId, pack]) => normalizePack(pack, lessonId));

  /* Les cours d’un chapitre suivent toujours leur ordre éditorial. */
  if (data?.lessons && typeof data.lessons === "object") {
    Object.values(data.lessons).forEach(items => {
      if (!Array.isArray(items)) return;
      items.sort((a, b) => Number(a?.order || 999) - Number(b?.order || 999) || String(a?.title || a?.id || "").localeCompare(String(b?.title || b?.id || ""), "fr"));
    });
  }
  Object.values(typeof DISCIPLINE_OUTLINES === "object" && DISCIPLINE_OUTLINES ? DISCIPLINE_OUTLINES : {}).forEach(outline => {
    if (!Array.isArray(outline?.worlds)) return;
    outline.worlds.sort((a, b) => Number(a?.sortStart ?? 999999) - Number(b?.sortStart ?? 999999) || String(a?.title || a?.id || "").localeCompare(String(b?.title || b?.id || ""), "fr"));
  });

  /* ---------- Audit de cohérence visible dans window.HistoDaily ---------- */
  const normalizeToken = value => clean(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’']/g, " ").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  const stop = new Set("le la les un une des de du et ou en au aux est sont pour par avec dans sur ce cette ces son sa ses leur leurs qui que quoi comme plus pas vers entre mais".split(" "));
  const tokens = value => normalizeToken(value).split(" ").filter(token => token.length > 3 && !stop.has(token));
  const packText = pack => [pack?.hook, ...(pack?.learningPath || []), ...(pack?.express || []), ...(pack?.complete || []).map(block => `${block?.title || ""} ${block?.text || ""}`), ...(pack?.deeper || []).map(block => `${block?.title || ""} ${block?.text || ""}`)].join(" ");
  const brokenMysteryLinks = [];
  const weakMysteryLinks = [];
  mysteries.forEach(mystery => {
    if (!mystery?.lessonId) return;
    const pack = packs[mystery.lessonId];
    if (!pack) { brokenMysteryLinks.push({ mystery:mystery.id, lessonId:mystery.lessonId }); return; }
    const answerTokens = tokens(mystery.answer || "");
    const haystack = normalizeToken(packText(pack));
    if (answerTokens.length && !answerTokens.some(token => haystack.includes(token))) weakMysteryLinks.push({ mystery:mystery.id, lessonId:mystery.lessonId, answer:mystery.answer });
  });
  const malformedPaths = Object.entries(packs).filter(([, pack]) => !Array.isArray(pack.learningPath) || pack.learningPath.length < 3).map(([id]) => id);
  const unorderedCourses = Object.entries(packs).filter(([, pack]) => {
    const orders = (pack.complete || []).map(block => numberedOrder(block?.title)).filter(order => order !== 999);
    return orders.some((order, index) => index && order < orders[index - 1]);
  }).map(([id]) => id);

  const audit = {
    version:VERSION,
    packs:Object.keys(packs).length,
    mysteries:mysteries.length,
    brokenMysteryLinks,
    weakMysteryLinks,
    malformedPaths,
    unorderedCourses,
    repairedLessons:[
      "astro-stellar-deaths",
      "art-islamic-space-calligraphy-pattern",
      "science-antibiotics-resistance-public-health",
      "sci-quantum-quanta-probability",
      "geo-containers-chokepoints",
      "music-hiphop-sampling"
    ],
    astronomyEvidenceSections:Object.keys(astronomyEvidence),
    reviewSuggested:weakMysteryLinks.length,
    ok:brokenMysteryLinks.length === 0 && malformedPaths.length === 0 && unorderedCourses.length === 0
  };
  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version:VERSION, contentCoherence239:audit };
    if (brokenMysteryLinks.length || malformedPaths.length || unorderedCourses.length) console.warn("HistoDaily beta239 content coherence audit", audit);
    if (typeof renderSoon === "function") renderSoon();
  } catch {}
})();
