/* HistoDaily beta 177 — nouveaux cours et mystères. */
(function histodailyBeta177Expansion(){
  const VERSION = "1.0.0-beta.177";
  const LESSONS = {
  "atlantic-revolutions": [
    {
      "id": "history-haitian-revolution",
      "title": "La révolution haïtienne : esclavage, liberté et indépendance",
      "period": "1791 → 1804",
      "location": "Saint-Domingue puis Haïti",
      "emoji": "🔥",
      "xp": 70,
      "gems": 2,
      "order": 4
    }
  ],
  "art-modern": [
    {
      "id": "art-cubism-multiple-viewpoints",
      "title": "Le cubisme : démonter le regard pour reconstruire le réel",
      "period": "1907 → 1914",
      "location": "Paris et Europe",
      "emoji": "🧩",
      "xp": 70,
      "order": 2
    }
  ],
  "cinema-editing-sound": [
    {
      "id": "cinema-montage-meaning",
      "title": "Le montage : quand deux plans fabriquent une idée",
      "period": "Années 1910 → aujourd’hui",
      "location": "Cinéma mondial",
      "emoji": "✂️",
      "xp": 70,
      "order": 1
    }
  ],
  "sci-evolution": [
    {
      "id": "sci-natural-selection",
      "title": "Darwin, Wallace et la sélection naturelle",
      "period": "XIXe siècle → aujourd’hui",
      "location": "Monde vivant",
      "emoji": "🧬",
      "xp": 70,
      "order": 1
    }
  ],
  "eco-inflation-rates": [
    {
      "id": "eco-inflation-interest-rates",
      "title": "Inflation et taux d’intérêt : comment ils agissent vraiment",
      "period": "Économie contemporaine",
      "location": "Ménages, entreprises et banques centrales",
      "emoji": "🏦",
      "xp": 70,
      "order": 1
    }
  ],
  "geo-flows": [
    {
      "id": "geo-containers-chokepoints",
      "title": "Conteneurs et détroits : les artères fragiles de la mondialisation",
      "period": "1956 → aujourd’hui",
      "location": "Routes maritimes mondiales",
      "emoji": "🚢",
      "xp": 70,
      "order": 1
    }
  ],
  "music-rap-electronic": [
    {
      "id": "music-hiphop-sampling",
      "title": "Naissance du hip-hop : breakbeats, MC et sampling",
      "period": "Années 1970 → aujourd’hui",
      "location": "Bronx puis monde",
      "emoji": "🎛️",
      "xp": 70,
      "order": 1
    }
  ]
};
  const PACKS = {
  "history-haitian-revolution": {
    "hook": "En 1804, d’anciens esclaves fondent Haïti après avoir vaincu successivement des propriétaires, des armées européennes et une tentative napoléonienne de rétablir l’esclavage. Cette révolution oblige à prendre au sérieux l’universalité proclamée en 1789.",
    "keyFacts": [
      "Saint-Domingue : colonie française extrêmement riche fondée sur l’esclavage",
      "Août 1791 : grande insurrection des esclaves du Nord",
      "1794 : la Convention abolit l’esclavage dans les colonies françaises",
      "1802 : l’expédition Leclerc tente de reprendre le contrôle de l’île",
      "1er janvier 1804 : proclamation de l’indépendance d’Haïti"
    ],
    "express": [
      "À la veille de 1789, Saint-Domingue produit une grande part du sucre et du café consommés en Europe. Cette richesse repose sur le travail forcé d’une majorité d’esclaves africains, soumis à une mortalité très élevée. La société distingue grands blancs, petits blancs, libres de couleur et esclaves, avec des droits profondément inégaux.",
      "La Révolution française ouvre une crise : les groupes de l’île utilisent le langage des droits, mais ne lui donnent pas le même sens. En août 1791, une insurrection massive commence dans le Nord. Toussaint Louverture devient progressivement un chef majeur ; en 1794, l’abolition française rallie une partie des insurgés à la République.",
      "Napoléon envoie en 1802 une armée commandée par Leclerc. Le rétablissement de l’esclavage dans d’autres colonies rend la menace évidente. Après une guerre très meurtrière, les forces de Dessalines remportent la victoire et proclament Haïti en 1804. L’indépendance est réelle, mais le nouvel État subit isolement diplomatique et dette imposée par la France en 1825."
    ],
    "complete": [
      {
        "title": "1. La colonie la plus riche repose sur une violence extrême",
        "text": "Saint-Domingue est l’une des colonies les plus rentables du monde atlantique à la fin du XVIIIe siècle. Sucre, café, indigo et coton alimentent le commerce français. Cette prospérité repose sur des centaines de milliers d’esclaves, souvent nés en Afrique et déportés récemment. Le travail dans les plantations, les châtiments, les maladies et le déséquilibre démographique provoquent une mortalité considérable.\n\nLa société n’oppose pas simplement blancs et noirs. Les grands planteurs, les blancs pauvres, les libres de couleur parfois propriétaires et la masse des esclaves ont des intérêts différents. Le Code noir encadre l’esclavage, mais la pratique quotidienne dépend aussi du pouvoir presque absolu des maîtres."
      },
      {
        "title": "2. Les droits de 1789 traversent l’Atlantique",
        "text": "La Déclaration des droits de l’homme proclame l’égalité naturelle, sans résoudre la question coloniale. Les planteurs veulent davantage d’autonomie commerciale tout en maintenant l’esclavage. Les libres de couleur réclament l’égalité civique. Les esclaves interprètent eux aussi les bouleversements comme une ouverture possible.\n\nDans la nuit du 22 au 23 août 1791, une vaste insurrection éclate dans la plaine du Nord. Plantations incendiées, ateliers désorganisés et formation de troupes insurgées changent l’échelle du conflit. L’événement n’est pas une explosion sans projet : des réseaux, des chefs, des pratiques religieuses et une expérience militaire structurent progressivement la révolte."
      },
      {
        "title": "3. Toussaint Louverture et l’abolition",
        "text": "Toussaint Bréda, devenu Toussaint Louverture, est un ancien esclave affranchi. Il rejoint d’abord les forces liées à l’Espagne, en guerre contre la France, puis se rallie à la République lorsque la Convention abolit l’esclavage en février 1794. Chef militaire et gouverneur, il cherche à maintenir la production par un travail contraint tout en empêchant le retour de l’esclavage.\n\nSon pouvoir devient presque autonome. La Constitution de 1801 le nomme gouverneur à vie, sans déclarer l’indépendance. Cette politique montre une tension centrale : libérer les personnes tout en conservant une économie d’exportation dont dépend la survie de la colonie."
      },
      {
        "title": "4. L’expédition napoléonienne et la guerre d’indépendance",
        "text": "En 1802, Napoléon envoie une grande expédition sous les ordres de son beau-frère Charles Leclerc. Officiellement, il s’agit de restaurer l’autorité française. Mais le rétablissement de l’esclavage en Guadeloupe et les arrestations à Saint-Domingue prouvent que la liberté est menacée. Toussaint est capturé et meurt en 1803 au fort de Joux, en France.\n\nLa résistance reprend sous Jean-Jacques Dessalines. La fièvre jaune décime l’armée française tandis que les anciens esclaves connaissent le terrain et combattent pour éviter la remise en servitude. La victoire de Vertières, en novembre 1803, ouvre la voie à l’indépendance proclamée le 1er janvier 1804."
      },
      {
        "title": "5. Une révolution mondiale longtemps isolée",
        "text": "Haïti devient le premier État indépendant issu d’une révolte d’esclaves victorieuse et la première république noire moderne. L’événement inquiète les sociétés esclavagistes et nourrit les espoirs des personnes asservies. Il modifie aussi l’équilibre atlantique : l’échec français contribue à la vente de la Louisiane aux États-Unis.\n\nLa victoire ne supprime pas les contraintes. Les puissances tardent à reconnaître Haïti. En 1825, la France impose une indemnité énorme en échange de la reconnaissance, destinée à dédommager les anciens colons. Cette dette pèse durablement sur le pays. La révolution haïtienne est donc à la fois une conquête radicale de liberté et le début d’un combat contre l’isolement économique et diplomatique."
      }
    ],
    "deeper": [
      {
        "title": "Une révolution française et caribéenne",
        "text": "Les événements de Paris comptent, mais les acteurs de Saint-Domingue transforment eux-mêmes le sens des droits et imposent l’abolition par leur lutte."
      },
      {
        "title": "Liberté et travail",
        "text": "Les dirigeants noirs veulent empêcher l’esclavage tout en maintenant les plantations : la contrainte de travail demeure un conflit majeur."
      },
      {
        "title": "Une mémoire longtemps marginalisée",
        "text": "Les récits européens ont souvent traité Haïti comme une conséquence secondaire de 1789, alors qu’elle oblige à redéfinir la révolution elle-même."
      }
    ],
    "takeaways": [
      {
        "label": "1791",
        "text": "L’insurrection des esclaves transforme une crise coloniale en révolution."
      },
      {
        "label": "1794",
        "text": "La République française abolit l’esclavage sous la pression de la guerre et des insurgés."
      },
      {
        "label": "1804",
        "text": "Haïti devient indépendant après la défaite de l’expédition napoléonienne."
      },
      {
        "label": "Portée",
        "text": "La liberté conquise bouleverse tout le monde atlantique, malgré l’isolement imposé."
      }
    ],
    "quiz": [
      {
        "kind": "société",
        "q": "Sur quoi repose la richesse de Saint-Domingue avant la révolution ?",
        "a": "Sur une économie de plantation exportatrice fondée sur le travail forcé d’une immense population esclave.",
        "choices": [
          "Sur une industrie mécanisée employant surtout des ouvriers libres européens.",
          "Sur un commerce local presque indépendant du sucre et du café.",
          "Sur de petites propriétés égalitaires sans hiérarchie raciale."
        ],
        "why": "Le sucre et le café enrichissent la colonie grâce à l’esclavage de masse.",
        "trap": "Retenir seulement que la colonie était riche sans demander qui produisait cette richesse.",
        "evidence": "Bloc 1."
      },
      {
        "kind": "chronologie",
        "q": "Que se passe-t-il en août 1791 ?",
        "a": "Une vaste insurrection d’esclaves commence dans le Nord de Saint-Domingue.",
        "choices": [
          "La France reconnaît immédiatement l’indépendance d’Haïti.",
          "Napoléon envoie déjà l’expédition Leclerc.",
          "Toussaint Louverture proclame seul l’abolition dans toutes les colonies."
        ],
        "why": "L’insurrection de 1791 ouvre la phase révolutionnaire armée.",
        "trap": "Confondre le début de l’insurrection avec l’indépendance de 1804.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "acteur",
        "q": "Pourquoi Toussaint Louverture se rallie-t-il à la République française en 1794 ?",
        "a": "Parce que la Convention abolit l’esclavage et que la République devient alors un allié possible de la liberté.",
        "choices": [
          "Parce que Napoléon lui promet l’indépendance complète de l’île.",
          "Parce que l’Espagne abolit l’esclavage dans toutes ses colonies.",
          "Parce que les planteurs blancs lui offrent le gouvernement à vie."
        ],
        "why": "L’abolition change les alliances dans la guerre coloniale.",
        "trap": "Présenter ses alliances comme fixes alors qu’elles dépendent de la question de l’esclavage.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "cause",
        "q": "Pourquoi la guerre reprend-elle fortement contre les Français en 1802 ?",
        "a": "Parce que l’expédition et le rétablissement de l’esclavage ailleurs font craindre une remise en servitude.",
        "choices": [
          "Parce que la France vient d’abolir pour la première fois l’esclavage.",
          "Parce que Toussaint vient de devenir empereur d’Haïti.",
          "Parce que la Grande-Bretagne impose l’indépendance de l’île."
        ],
        "why": "La menace de rétablissement rend le compromis impossible.",
        "trap": "Voir l’expédition comme une simple opération administrative.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "conséquence",
        "q": "Quelle contradiction marque l’après-1804 ?",
        "a": "Haïti conquiert son indépendance mais subit isolement diplomatique et lourde indemnité imposée par la France.",
        "choices": [
          "Haïti est immédiatement reconnu et financé par toutes les puissances esclavagistes.",
          "L’indépendance supprime instantanément les difficultés économiques de plantation.",
          "La France renonce sans condition à toute revendication sur son ancienne colonie."
        ],
        "why": "La victoire politique n’efface pas les rapports de force internationaux.",
        "trap": "Croire qu’une indépendance juridique suffit à supprimer toutes les contraintes.",
        "evidence": "Bloc 5."
      }
    ]
  },
  "art-cubism-multiple-viewpoints": {
    "hook": "Le cubisme ne cherche pas à peindre le monde comme un miroir brisé. Picasso, Braque et leurs proches interrogent plutôt une vieille convention : pourquoi une image devrait-elle enfermer un objet dans un seul instant et un seul point de vue ?",
    "keyFacts": [
      "Repère : 1907-1914, principalement à Paris",
      "Acteurs majeurs : Pablo Picasso et Georges Braque",
      "Cubisme analytique : formes fragmentées, palette resserrée, lecture lente",
      "Cubisme synthétique : papiers collés, signes, couleurs et construction",
      "Enjeu : montrer que l’image construit le réel au lieu de simplement le copier"
    ],
    "express": [
      "Autour de 1907, Picasso et Braque simplifient puis fragmentent les volumes. Ils regardent Cézanne, l’art ibérique et des objets africains alors présentés dans un contexte colonial. Cette histoire doit être racontée sans réduire ces œuvres à de simples « influences exotiques » disponibles pour l’Europe.",
      "Dans le cubisme analytique, une guitare, un visage ou une table sont décomposés en facettes. Plusieurs aspects peuvent coexister sur la même surface ; les couleurs limitées empêchent parfois le sujet de reprendre le dessus. L’image demande au spectateur de reconstruire mentalement l’objet.",
      "À partir de 1912, papiers collés, faux bois, journaux et lettres imprimées ouvrent une phase dite synthétique. Coller un morceau de journal dans une nature morte brouille la frontière entre représentation et objet réel. Le cubisme transforme durablement peinture, sculpture, design et architecture."
    ],
    "complete": [
      {
        "title": "1. Une rupture préparée par Cézanne et les collections coloniales",
        "text": "Cézanne conseille de traiter la nature par des volumes simples et construit ses paysages sans respecter toujours une perspective unique. Picasso et Braque reprennent cette instabilité. Les Demoiselles d’Avignon, peintes par Picasso en 1907, condensent plusieurs recherches : corps anguleux, espace peu profond, visages inspirés de traditions ibériques et africaines.\n\nCes emprunts se produisent dans une Europe coloniale qui extrait et expose des objets en les coupant souvent de leur fonction. Les reconnaître ne retire rien à l’innovation cubiste ; cela replace cette innovation dans des circulations inégales."
      },
      {
        "title": "2. Le cubisme analytique fragmente pour analyser",
        "text": "Entre 1909 et 1912, Picasso et Braque travaillent si étroitement que certaines œuvres se ressemblent fortement. Ils décomposent les objets en plans, multiplient les orientations et utilisent des bruns, gris ou ocres. Une table n’est plus vue d’un seul endroit : son plateau, son pied, un verre ou un instrument apparaissent comme des indices partiels.\n\nLe but n’est pas d’ajouter au hasard plusieurs profils. La toile construit un système où chaque facette suggère une position, une lumière ou une partie du volume. Le sujet résiste à la reconnaissance immédiate, ce qui fait du regard une enquête."
      },
      {
        "title": "3. Plusieurs points de vue, mais pas une photographie du mouvement",
        "text": "On dit souvent que le cubisme montre un objet de tous les côtés en même temps. La formule aide, mais elle simplifie. Les tableaux ne réalisent pas un relevé complet et scientifique. Ils combinent signes, souvenirs, conventions et points de vue possibles pour rappeler que voir est une activité construite.\n\nLe cubisme se distingue aussi du futurisme italien, qui insiste davantage sur vitesse, répétition et énergie moderne. Chez Picasso et Braque, l’objet peut sembler immobile ; c’est la manière de le connaître qui devient instable."
      },
      {
        "title": "4. Le collage change la définition du tableau",
        "text": "En 1912, Braque introduit du papier imitant le bois ; Picasso colle toile cirée, journaux ou papiers peints. Une lettre imprimée peut signifier le mot « journal », évoquer un café parisien et rester en même temps un fragment matériel. La représentation n’imite plus seulement le monde : elle incorpore des morceaux du monde.\n\nCette phase, appelée cubisme synthétique, réintroduit souvent couleurs plus franches et formes plus lisibles. Elle ouvre la voie au collage dada, au photomontage, au design graphique et à de nombreuses pratiques contemporaines."
      },
      {
        "title": "5. Une révolution du langage visuel",
        "text": "Le cubisme affaiblit la perspective unique héritée de la Renaissance, mais il ne détruit pas toute représentation. Guitares, bouteilles, visages et journaux restent présents sous forme de signes. Le spectateur apprend à lire une courbe comme une ouïe de violon, quelques lettres comme un titre ou un ovale comme le plateau d’une table.\n\nAprès 1914, le mouvement se diversifie et devient un langage international. Son héritage apparaît dans la sculpture assemblée, l’abstraction, l’architecture, l’affiche et même la manière moderne de penser une image comme construction plutôt que fenêtre transparente."
      }
    ],
    "deeper": [
      {
        "title": "Picasso n’invente pas seul",
        "text": "Braque, Juan Gris, Fernand Léger, Robert et Sonia Delaunay participent à des cubismes différents."
      },
      {
        "title": "Un mot d’abord moqueur",
        "text": "Comme « impressionnisme », le terme vient en partie de critiques parlant de petits cubes ou de formes géométriques."
      },
      {
        "title": "Regarder lentement",
        "text": "Identifier un objet n’est pas l’unique objectif : observe comment signes, matières et plans organisent ton effort de reconnaissance."
      }
    ],
    "takeaways": [
      {
        "label": "Fragmenter",
        "text": "Décomposer les formes rend visible la construction du regard."
      },
      {
        "label": "Point de vue",
        "text": "La toile ne dépend plus d’un observateur immobile placé devant une fenêtre."
      },
      {
        "label": "Collage",
        "text": "Des matériaux réels entrent dans l’image et brouillent représentation et objet."
      },
      {
        "label": "Héritage",
        "text": "Le cubisme transforme une grande partie de l’art et du design du XXe siècle."
      }
    ],
    "quiz": [
      {
        "kind": "objectif",
        "q": "Que remet principalement en cause le cubisme ?",
        "a": "L’idée qu’un tableau doit représenter un objet depuis un seul point de vue cohérent.",
        "choices": [
          "L’usage de toute forme géométrique dans la peinture.",
          "La possibilité de représenter encore des objets reconnaissables.",
          "L’existence de couleurs autres que le gris et le brun."
        ],
        "why": "Le cubisme montre que l’image construit plusieurs rapports possibles à l’objet.",
        "trap": "Le réduire à une simple déformation décorative.",
        "evidence": "Introduction et bloc 3."
      },
      {
        "kind": "phase",
        "q": "Qu’est-ce qui caractérise le cubisme analytique ?",
        "a": "La fragmentation des volumes en facettes et une palette souvent resserrée qui ralentissent la reconnaissance.",
        "choices": [
          "De grands aplats publicitaires très colorés sans objets identifiables.",
          "La copie fidèle d’un objet vu depuis un seul angle.",
          "L’utilisation obligatoire de photographies découpées."
        ],
        "why": "Cette phase analyse l’objet par plans et indices partiels.",
        "trap": "Confondre cubisme analytique et collage synthétique.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi l’expression « tous les côtés à la fois » est-elle insuffisante ?",
        "a": "Parce que les tableaux combinent des signes et points de vue sans constituer un relevé complet et scientifique de l’objet.",
        "choices": [
          "Parce que les cubistes refusent toujours de représenter le moindre volume.",
          "Parce que le cubisme cherche uniquement à représenter la vitesse.",
          "Parce que chaque tableau reste une perspective Renaissance parfaitement unique."
        ],
        "why": "La formule est utile mais ne décrit pas toute l’opération visuelle.",
        "trap": "Prendre une métaphore pédagogique pour une définition exacte.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "technique",
        "q": "Que produit le collage cubiste ?",
        "a": "Il introduit des matériaux réels dans l’œuvre et brouille la frontière entre l’objet et sa représentation.",
        "choices": [
          "Il restaure la peinture illusionniste académique.",
          "Il interdit l’usage de lettres ou de journaux dans l’image.",
          "Il transforme automatiquement toute œuvre en sculpture en trois dimensions."
        ],
        "why": "Le papier collé est à la fois matière réelle et signe.",
        "trap": "Le voir comme une simple décoration ajoutée après la peinture.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "contexte",
        "q": "Quelle nuance faut-il apporter aux références africaines du cubisme ?",
        "a": "Elles circulent dans un contexte colonial où des objets sont souvent extraits de leurs usages et présentés comme ressources européennes.",
        "choices": [
          "Elles prouvent que le cubisme est né indépendamment de toute histoire européenne.",
          "Elles n’existent que dans les critiques tardives et jamais dans les œuvres.",
          "Elles permettent d’attribuer chaque tableau à une culture africaine unique."
        ],
        "why": "L’innovation doit être replacée dans des circulations artistiques et politiques inégales.",
        "trap": "Parler d’« influence primitive » sans histoire ni fonction des objets.",
        "evidence": "Bloc 1."
      }
    ]
  },
  "cinema-montage-meaning": {
    "hook": "Un visage neutre suivi d’une assiette de soupe ne raconte pas la même chose que le même visage suivi d’un cercueil. Le montage ne se contente donc pas de raccourcir le temps : il fait naître entre les plans des émotions, des liens et parfois des arguments.",
    "keyFacts": [
      "Montage : choix, ordre et durée des plans",
      "Raccord de continuité : rendre l’espace et l’action faciles à suivre",
      "Effet Koulechov : le contexte modifie l’interprétation d’un même visage",
      "Montage soviétique : collision des plans pour produire une idée",
      "Son : dialogue, bruit, musique et silence peuvent relier ou contredire l’image"
    ],
    "express": [
      "Tourner produit des prises ; monter construit le film. Le monteur choisit où commencer et finir un plan, dans quel ordre le placer et combien de temps le laisser. Une coupe peut rendre une action fluide, créer une ellipse de plusieurs années ou provoquer un choc.",
      "Le cinéma classique développe des raccords qui rendent la coupe presque invisible : regard, mouvement, axe des 180 degrés. À l’inverse, Eisenstein défend un montage de collision où deux images produisent une troisième idée. L’expérience attribuée à Koulechov montre surtout que le spectateur interprète un visage selon le plan qui l’entoure.",
      "Le montage concerne aussi le son. Une musique peut annoncer un danger absent de l’image ; un bruit peut faire exister le hors-champ ; un silence peut interrompre le rythme. Analyser le montage consiste à demander ce que la relation entre plans et sons nous fait comprendre, pas seulement combien il y a de coupes."
    ],
    "complete": [
      {
        "title": "1. Le film naît une seconde fois au montage",
        "text": "Le tournage accumule des prises, souvent répétées et filmées sous plusieurs angles. Le montage sélectionne, ordonne et règle leur durée. Une scène apparemment continue peut être composée de plans tournés à des jours différents. Inversement, une seule coupe peut supprimer un trajet, accélérer un combat ou faire passer de l’enfance à l’âge adulte.\n\nLe montage est donc à la fois pratique et narratif. Il organise les informations : montrer d’abord une clé puis une porte fermée ne produit pas la même attente que découvrir la clé après l’échec du personnage."
      },
      {
        "title": "2. La continuité rend les coupes lisibles",
        "text": "Le montage classique cherche souvent à préserver une orientation stable. Le raccord dans le mouvement coupe pendant un geste et le reprend depuis un autre angle. Le champ-contrechamp organise une conversation. La règle dite des 180 degrés maintient les personnages du même côté de l’écran pour éviter d’inverser leur position.\n\nCes conventions ne sont pas naturelles : elles ont été apprises par les cinéastes et les spectateurs. Lorsqu’un film les brise, l’effet peut être voulu — malaise, désorientation, rupture — ou simplement maladroit. Il faut donc analyser la fonction de la discontinuité."
      },
      {
        "title": "3. L’effet Koulechov : un visage dépend de son voisin",
        "text": "Lev Koulechov et ses élèves sont associés à une expérience célèbre : le même visage impassible de l’acteur Ivan Mosjoukine aurait été monté avec une soupe, un cercueil ou une enfant, et les spectateurs auraient attribué au visage faim, tristesse ou tendresse. Les détails historiques de la démonstration sont discutés, mais le principe reste puissant.\n\nNous lisons une image à partir de ce qui la précède et la suit. Le plan n’a pas un sens totalement autonome. Le montage peut ainsi fabriquer une réaction qui n’a jamais été jouée dans la prise elle-même."
      },
      {
        "title": "4. Eisenstein et le montage comme conflit",
        "text": "Dans les années 1920, Sergueï Eisenstein théorise un montage qui ne cherche pas seulement la fluidité. Dans Le Cuirassé Potemkine, l’escalier d’Odessa est construit par fragments : bottes des soldats, foule, landau, visages, gestes interrompus. La durée ressentie dépasse le temps réel de l’action.\n\nPour Eisenstein, la collision de deux plans peut produire une idée nouvelle, comme dans un raisonnement. Le montage devient politique et émotionnel. D’autres cinéastes soviétiques, comme Dziga Vertov ou Vsevolod Poudovkine, proposent cependant des méthodes différentes : il n’existe pas un unique « montage soviétique »."
      },
      {
        "title": "5. Le son monte lui aussi le regard",
        "text": "Avec le cinéma sonore, la coupe ne sépare plus forcément tous les éléments. Un son peut commencer avant l’image suivante — raccord sonore — ou continuer après la coupe. La musique peut unifier une série de lieux ; un bruit peut contredire ce que l’on voit ; le silence peut rendre une coupe brutale.\n\nLe montage possède enfin une dimension éthique. En documentaire ou sur les réseaux, juxtaposer une image et une phrase peut faire croire à un lien causal absent. Comprendre le montage aide donc autant à lire une fiction qu’à résister à une manipulation d’images réelles."
      }
    ],
    "deeper": [
      {
        "title": "Invisible ne signifie pas neutre",
        "text": "Un montage très fluide oriente malgré tout notre attention, notre émotion et notre compréhension de l’espace."
      },
      {
        "title": "Le rythme n’est pas le nombre de coupes",
        "text": "Il dépend aussi du mouvement interne, du son, de la durée attendue et du contraste entre plans."
      },
      {
        "title": "Une compétence médiatique",
        "text": "Demande toujours si deux images ont réellement été enregistrées dans la relation que le montage suggère."
      }
    ],
    "takeaways": [
      {
        "label": "Choisir",
        "text": "Monter, c’est sélectionner, ordonner et régler la durée."
      },
      {
        "label": "Relier",
        "text": "Le sens d’un plan dépend souvent de ceux qui l’entourent."
      },
      {
        "label": "Rythmer",
        "text": "Continuité ou collision construisent des expériences différentes."
      },
      {
        "label": "Vérifier",
        "text": "Une juxtaposition peut fabriquer artificiellement une causalité."
      }
    ],
    "quiz": [
      {
        "kind": "définition",
        "q": "Que fait principalement le montage ?",
        "a": "Il sélectionne, ordonne et règle la durée des plans pour construire récit, espace, temps et sens.",
        "choices": [
          "Il consiste seulement à ajouter une musique après le tournage.",
          "Il corrige uniquement les défauts techniques de l’image.",
          "Il impose que toutes les scènes soient tournées dans l’ordre du récit."
        ],
        "why": "Le film est reconstruit par l’ordre et la durée des prises choisies.",
        "trap": "Réduire le montage à une opération de raccourcissement.",
        "evidence": "Bloc 1."
      },
      {
        "kind": "continuité",
        "q": "À quoi sert un raccord dans le mouvement ?",
        "a": "À couper pendant un geste puis le poursuivre dans le plan suivant pour rendre la transition fluide.",
        "choices": [
          "À répéter le même geste intégralement sous chaque angle.",
          "À inverser volontairement la position des personnages.",
          "À supprimer toute relation spatiale entre deux plans."
        ],
        "why": "Le geste commun masque en partie la coupe et maintient l’action.",
        "trap": "Confondre continuité et absence de montage.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "notion",
        "q": "Que montre l’effet Koulechov ?",
        "a": "Que le spectateur interprète un même visage différemment selon le plan placé avant ou après.",
        "choices": [
          "Qu’un acteur doit changer d’expression à chaque coupe.",
          "Que la musique détermine seule le sens d’une scène.",
          "Qu’un gros plan possède toujours une signification fixe."
        ],
        "why": "La relation entre images produit une lecture nouvelle.",
        "trap": "Croire que le sens se trouve entièrement à l’intérieur d’un plan isolé.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "auteur",
        "q": "Quelle conception Eisenstein défend-il ?",
        "a": "Un montage de collision où la confrontation des plans produit une émotion ou une idée nouvelle.",
        "choices": [
          "Un montage qui cache obligatoirement chaque coupe.",
          "Une interdiction de fragmenter les actions collectives.",
          "Un cinéma composé uniquement de plans-séquences sans montage."
        ],
        "why": "Il traite la juxtaposition comme un conflit productif.",
        "trap": "Confondre montage soviétique et continuité hollywoodienne.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "esprit critique",
        "q": "Pourquoi le montage est-il aussi un enjeu éthique ?",
        "a": "Parce qu’une juxtaposition peut faire croire à une relation ou une cause qui n’existait pas lors de l’enregistrement.",
        "choices": [
          "Parce que toute coupe rend automatiquement une image mensongère.",
          "Parce que seuls les documentaires utilisent le montage.",
          "Parce que le son empêche désormais toute manipulation visuelle."
        ],
        "why": "L’ordre des images peut produire une affirmation implicite.",
        "trap": "Considérer les images réelles comme transparentes dès qu’elles ne sont pas truquées.",
        "evidence": "Bloc 5."
      }
    ]
  },
  "sci-natural-selection": {
    "hook": "La sélection naturelle ne donne pas aux animaux ce dont ils ont besoin. Elle trie, génération après génération, des variations déjà présentes dans des populations. Cette différence apparemment simple sépare une explication scientifique d’un récit où la nature poursuivrait un projet.",
    "keyFacts": [
      "Darwin et Alfred Russel Wallace présentent conjointement l’idée en 1858",
      "Une population contient des variations transmissibles",
      "Les individus n’ont pas tous le même succès de survie et de reproduction",
      "Une adaptation augmente en fréquence dans un environnement donné",
      "La génétique moderne explique l’hérédité sans transformer l’évolution en progrès programmé"
    ],
    "express": [
      "Dans toute population, les individus diffèrent. Une partie de ces différences est héréditaire. Si certaines variantes permettent de laisser davantage de descendants dans un environnement donné, elles deviennent plus fréquentes au fil des générations. C’est la sélection naturelle.",
      "Darwin construit cette idée à partir de voyages, élevages, fossiles, biogéographie et lecture de Malthus. Wallace arrive indépendamment à une explication proche. En 1858, leurs textes sont présentés ensemble ; Darwin développe ensuite son argument dans L’Origine des espèces en 1859.",
      "Une girafe n’allonge donc pas son cou par effort pour transmettre cet allongement. Une population peut contenir des cous de longueurs différentes ; si un caractère héréditaire favorise la reproduction, sa fréquence change. L’évolution concerne les populations, n’a pas de but fixé et dépend toujours du milieu."
    ],
    "complete": [
      {
        "title": "1. Variation, hérédité et reproduction différentielle",
        "text": "Trois conditions suffisent à comprendre le mécanisme. D’abord, les individus d’une population varient. Ensuite, certaines variations sont transmissibles. Enfin, tous ne laissent pas le même nombre de descendants. Si une caractéristique héréditaire améliore ce succès dans le contexte présent, elle tend à devenir plus fréquente.\n\nLe mot « fitness », souvent traduit par valeur sélective, ne signifie pas force physique absolue. Il mesure le succès reproductif relatif. Une petite taille, une couleur discrète ou une résistance à un médicament peuvent être avantageuses dans un milieu et défavorables dans un autre."
      },
      {
        "title": "2. Darwin et Wallace arrivent à une idée commune",
        "text": "Darwin observe durant le voyage du Beagle la répartition des espèces, les fossiles et les ressemblances entre îles et continents. Les éleveurs lui montrent aussi qu’une sélection artificielle peut modifier rapidement des lignées. La lecture de Malthus l’aide à penser la compétition dans des populations capables de produire plus de descendants que le milieu ne peut en soutenir.\n\nAlfred Russel Wallace, travaillant en Amazonie puis dans l’archipel malais, formule indépendamment un mécanisme similaire. En 1858, leurs textes sont présentés à la Linnean Society. Cette histoire évite le mythe du génie isolé."
      },
      {
        "title": "3. Une adaptation n’est pas un besoin devenu organe",
        "text": "Dire « les ours ont développé une fourrure parce qu’il faisait froid » donne l’impression que le besoin crée directement le caractère. La sélection naturelle fonctionne autrement : des variations apparaissent sans prévoir l’avenir ; l’environnement modifie ensuite leur succès relatif.\n\nLes mutations ne sont pas produites parce qu’elles seraient utiles. Elles apparaissent par des processus biologiques variés. La sélection n’est pas aléatoire dans son tri, mais la variation n’est pas orientée vers un objectif. Une adaptation est donc un résultat historique, pas une solution parfaite dessinée d’avance."
      },
      {
        "title": "4. Des preuves qui se renforcent entre elles",
        "text": "La sélection naturelle est soutenue par plusieurs familles de preuves : fossiles, anatomie comparée, embryologie, biogéographie et observation directe. Les résistances aux antibiotiques évoluent rapidement lorsque les traitements éliminent les bactéries sensibles et laissent davantage se reproduire celles qui possèdent une résistance.\n\nLes pinsons des Galápagos ont aussi permis de mesurer des changements de taille du bec selon les sécheresses et les ressources disponibles. Aucun exemple isolé ne résume toute l’évolution ; leur convergence construit l’explication."
      },
      {
        "title": "5. Génétique, dérive et arbre du vivant",
        "text": "Darwin ne connaît pas les gènes. Au XXe siècle, la génétique mendélienne et la biologie des populations forment la synthèse moderne : mutations et recombinaisons produisent de la variation, tandis que sélection, dérive génétique, migrations et accouplements modifient les fréquences.\n\nLa sélection naturelle n’est donc pas la seule force évolutive. Elle n’implique pas non plus une marche vers la perfection. Toutes les espèces actuelles ont une histoire aussi longue et partagent des ancêtres communs à différents niveaux de l’arbre du vivant."
      }
    ],
    "deeper": [
      {
        "title": "Résister n’est pas s’habituer",
        "text": "Une bactérie individuelle ne décide pas de résister ; le traitement sélectionne des variantes déjà présentes ou nouvelles dans la population."
      },
      {
        "title": "Coût des adaptations",
        "text": "Un caractère avantageux peut coûter de l’énergie ou devenir inutile quand l’environnement change."
      },
      {
        "title": "Sélection et hasard",
        "text": "La variation et la dérive comportent du hasard ; le succès différentiel dépend néanmoins de propriétés réelles dans un milieu réel."
      }
    ],
    "takeaways": [
      {
        "label": "Population",
        "text": "Ce sont les fréquences de caractères dans les populations qui évoluent."
      },
      {
        "label": "Variation",
        "text": "La sélection agit sur des différences héréditaires déjà présentes."
      },
      {
        "label": "Milieu",
        "text": "Un avantage n’existe jamais indépendamment d’un contexte."
      },
      {
        "label": "Sans but",
        "text": "L’évolution ne vise ni progrès universel ni perfection."
      }
    ],
    "quiz": [
      {
        "kind": "mécanisme",
        "q": "Quelles conditions permettent la sélection naturelle ?",
        "a": "Des variations héréditaires et des différences de succès reproductif entre individus d’une population.",
        "choices": [
          "Un besoin ressenti par tous les individus puis transmis à leurs descendants.",
          "Une mutation identique produite chez toute l’espèce au même moment.",
          "Un objectif de perfection fixé par l’environnement."
        ],
        "why": "Le mécanisme repose sur variation, transmission et reproduction différentielle.",
        "trap": "Transformer l’évolution en réponse volontaire à un besoin.",
        "evidence": "Bloc 1."
      },
      {
        "kind": "histoire",
        "q": "Quel rôle joue Alfred Russel Wallace ?",
        "a": "Il formule indépendamment une explication par sélection naturelle et ses travaux sont présentés avec ceux de Darwin en 1858.",
        "choices": [
          "Il découvre les gènes et corrige Darwin avant 1850.",
          "Il s’oppose à toute idée d’évolution des espèces.",
          "Il réalise uniquement les expériences sur les pinsons des Galápagos."
        ],
        "why": "Wallace est un co-découvreur du mécanisme.",
        "trap": "Raconter l’histoire comme l’œuvre d’un seul savant isolé.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "piège",
        "q": "Pourquoi la phrase « l’animal développe ce dont il a besoin » est-elle trompeuse ?",
        "a": "Parce que les variations ne sont pas produites en prévision du besoin ; le milieu trie leur succès après leur apparition.",
        "choices": [
          "Parce que l’environnement n’a aucun effet sur la survie.",
          "Parce que tous les caractères sont acquis pendant la vie puis hérités.",
          "Parce que les espèces ne présentent aucune variation individuelle."
        ],
        "why": "La sélection ne crée pas intentionnellement la variation utile.",
        "trap": "Attribuer un projet ou une volonté à l’évolution.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "preuve",
        "q": "Comment les antibiotiques illustrent-ils la sélection naturelle ?",
        "a": "Ils éliminent surtout les bactéries sensibles et favorisent la descendance des variantes résistantes.",
        "choices": [
          "Ils apprennent à chaque bactérie à fabriquer volontairement une résistance.",
          "Ils rendent toutes les bactéries résistantes dès la première dose.",
          "Ils empêchent toute mutation et toute reproduction bactérienne."
        ],
        "why": "Le traitement change le succès relatif de variantes présentes.",
        "trap": "Dire qu’une population « s’habitue » comme un individu.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "La sélection naturelle est-elle la seule force de l’évolution ?",
        "a": "Non, la dérive génétique, les migrations, les mutations et les accouplements modifient aussi les populations.",
        "choices": [
          "Oui, tout changement biologique est nécessairement une adaptation.",
          "Non, parce que les espèces n’ont aucun ancêtre commun.",
          "Oui, la génétique a supprimé toutes les autres explications."
        ],
        "why": "La synthèse moderne combine plusieurs mécanismes.",
        "trap": "Confondre évolution et adaptation uniquement.",
        "evidence": "Bloc 5."
      }
    ]
  },
  "eco-inflation-interest-rates": {
    "hook": "Quand « les prix augmentent », tout le monde ne vit pas la même inflation. Le panier d’un étudiant, d’un retraité et d’une entreprise n’est pas identique ; les salaires, les dettes et l’épargne ne réagissent pas au même rythme. Les taux d’intérêt cherchent à freiner ou soutenir cette dynamique, mais leur effet est lent et imparfait.",
    "keyFacts": [
      "Inflation : hausse durable et générale du niveau des prix, non hausse isolée d’un produit",
      "Mesure : indice construit à partir d’un panier pondéré de biens et services",
      "Taux nominal et taux réel : le pouvoir d’achat dépend de l’inflation",
      "Taux directeur : prix auquel la banque centrale oriente le financement bancaire",
      "Transmission : crédit, demande, change et anticipations, avec des délais"
    ],
    "express": [
      "L’inflation désigne une hausse générale et durable des prix. Si le café augmente après une mauvaise récolte mais que le reste ne bouge pas, c’est surtout un prix relatif. Pour mesurer l’inflation, on suit un panier de consommation pondéré ; ce chiffre moyen ne décrit donc pas parfaitement chaque ménage.",
      "Les causes peuvent se combiner : demande très forte, coûts d’énergie ou de transport, pénuries, salaires et marges, politique monétaire, anticipations. Une inflation de 5 % ne signifie pas que tous les prix montent de 5 %, ni que tous les revenus suivent.",
      "Une banque centrale peut augmenter son taux directeur. Les crédits deviennent généralement plus chers, ce qui réduit une partie des achats et investissements ; la pression sur les prix peut ralentir. Mais l’effet prend du temps et ne produit pas davantage de gaz ou de blé. Une politique monétaire peut donc combattre une inflation de demande plus facilement qu’un choc d’offre pur."
    ],
    "complete": [
      {
        "title": "1. Une moyenne construite, pas un thermomètre parfait",
        "text": "Les instituts statistiques observent les prix d’un grand nombre de biens et services, puis les pondèrent selon leur importance dans la consommation moyenne. Logement, alimentation, transport ou santé n’ont pas le même poids. Le panier évolue avec les habitudes.\n\nL’indice est indispensable pour comparer dans le temps, mais il ne correspond pas exactement à chaque personne. Un ménage qui chauffe beaucoup au gaz ressentira plus fortement une flambée énergétique. Il faut distinguer inflation mesurée, inflation personnelle et sentiment d’inflation, souvent influencé par les achats fréquents."
      },
      {
        "title": "2. Tous les prix ne montent ni ensemble ni pour la même raison",
        "text": "Une hausse isolée modifie un prix relatif : elle signale qu’un bien devient plus rare ou plus demandé par rapport aux autres. L’inflation concerne une progression plus large et persistante du niveau général. Elle peut venir d’une demande supérieure aux capacités de production, d’une augmentation des coûts importés, de ruptures d’approvisionnement ou de dynamiques de salaires et de marges.\n\nChercher une cause unique est souvent trompeur. Un choc énergétique peut d’abord augmenter directement quelques prix puis se diffuser aux transports, à l’industrie et aux services."
      },
      {
        "title": "3. L’inflation redistribue entre revenus, dettes et épargne",
        "text": "Si les salaires augmentent moins vite que les prix, le pouvoir d’achat baisse. Un emprunteur à taux fixe peut au contraire voir le poids réel de sa dette diminuer si son revenu suit l’inflation. Le prêteur reçoit alors une monnaie qui achète moins.\n\nLe taux d’intérêt réel peut être approximé par le taux nominal moins l’inflation. Un placement à 3 % avec une inflation à 5 % perd environ 2 % de pouvoir d’achat avant impôts. Ces effets montrent pourquoi l’inflation n’est pas seulement une moyenne abstraite."
      },
      {
        "title": "4. Comment un taux directeur agit",
        "text": "La banque centrale ne fixe pas directement le prix des courses. Elle modifie des taux à très court terme et les conditions auxquelles les banques se refinancent. Cette impulsion influence ensuite les taux des crédits immobiliers, des prêts aux entreprises et de certains placements.\n\nDes taux plus élevés rendent l’emprunt moins attractif, peuvent soutenir la monnaie et ralentir la demande. Les entreprises investissent moins, certains ménages reportent leurs achats, et la hausse des prix peut se calmer. Mais la transmission dépend de l’endettement, de la confiance et de la structure du système bancaire."
      },
      {
        "title": "5. Un outil puissant avec des coûts et des délais",
        "text": "La politique monétaire agit souvent après plusieurs mois. Si elle serre trop, elle peut provoquer chômage, baisse de l’investissement ou difficultés immobilières. Si elle réagit trop tard, les anticipations d’inflation peuvent s’installer.\n\nElle ne résout pas seule une pénurie de logements, une guerre qui réduit l’énergie disponible ou un problème de concurrence. Les politiques budgétaires, la régulation, l’investissement et les négociations salariales comptent aussi. Comprendre les taux, c’est donc comprendre un arbitrage, pas un bouton magique."
      }
    ],
    "deeper": [
      {
        "title": "Inflation sous-jacente",
        "text": "Elle écarte souvent certains prix très volatils pour repérer une tendance plus persistante, sans rendre les produits exclus moins importants pour les ménages."
      },
      {
        "title": "Déflation",
        "text": "Une baisse générale des prix peut sembler agréable, mais elle peut aussi encourager le report des achats et alourdir le poids réel des dettes."
      },
      {
        "title": "Anticipations",
        "text": "Si chacun s’attend à de fortes hausses, salaires, contrats et prix peuvent intégrer cette attente et prolonger le mouvement."
      }
    ],
    "takeaways": [
      {
        "label": "Mesurer",
        "text": "L’inflation est un indice moyen construit à partir d’un panier pondéré."
      },
      {
        "label": "Distinguer",
        "text": "Une hausse isolée n’est pas forcément une inflation générale."
      },
      {
        "label": "Redistribuer",
        "text": "Revenus, dettes et épargne sont touchés différemment."
      },
      {
        "label": "Agir",
        "text": "Les taux freinent surtout par le crédit et la demande, avec retard et coûts."
      }
    ],
    "quiz": [
      {
        "kind": "définition",
        "q": "Qu’est-ce qui distingue l’inflation d’une hausse isolée ?",
        "a": "L’inflation est une hausse durable et assez générale du niveau des prix, pas le mouvement d’un seul produit.",
        "choices": [
          "L’inflation concerne uniquement les produits importés.",
          "Une hausse du café suffit toujours à prouver une inflation générale.",
          "L’inflation signifie que tous les prix montent exactement du même pourcentage."
        ],
        "why": "La notion porte sur le niveau général des prix.",
        "trap": "Confondre prix relatif et inflation.",
        "evidence": "Blocs 1 et 2."
      },
      {
        "kind": "mesure",
        "q": "Pourquoi deux ménages peuvent-ils ressentir différemment la même inflation officielle ?",
        "a": "Parce que leur panier réel de consommation et leurs dépenses contraintes ne sont pas identiques au panier moyen.",
        "choices": [
          "Parce que l’indice officiel change au hasard pour chaque personne.",
          "Parce que les prix nationaux n’existent jamais dans les magasins.",
          "Parce que seuls les ménages endettés achètent des biens pondérés."
        ],
        "why": "La mesure est une moyenne pondérée, pas un relevé individuel.",
        "trap": "Croire qu’un indice moyen décrit exactement chaque budget.",
        "evidence": "Bloc 1."
      },
      {
        "kind": "redistribution",
        "q": "Que devient approximativement un placement à 3 % si l’inflation atteint 5 % ?",
        "a": "Son rendement réel est proche de -2 % avant impôts : le pouvoir d’achat de l’épargne baisse.",
        "choices": [
          "Son rendement réel devient automatiquement 8 %.",
          "Il conserve exactement son pouvoir d’achat car le taux est positif.",
          "L’inflation n’a aucun effet sur une somme déjà placée."
        ],
        "why": "Le taux réel se pense en retirant l’inflation au taux nominal.",
        "trap": "Regarder le taux affiché sans mesurer ce que l’argent permet d’acheter.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "politique",
        "q": "Comment une hausse du taux directeur freine-t-elle généralement l’inflation ?",
        "a": "En renchérissant le crédit et en ralentissant une partie de la demande et de l’investissement.",
        "choices": [
          "En ordonnant directement à tous les magasins de baisser leurs prix.",
          "En augmentant immédiatement la quantité d’énergie et de logements.",
          "En supprimant automatiquement les dettes privées existantes."
        ],
        "why": "La transmission passe surtout par les conditions financières.",
        "trap": "Imaginer un contrôle direct et instantané de chaque prix.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "limite",
        "q": "Pourquoi les taux ne sont-ils pas un bouton magique ?",
        "a": "Parce qu’ils agissent avec retard, peuvent ralentir l’emploi et ne réparent pas directement une pénurie d’offre.",
        "choices": [
          "Parce qu’ils n’influencent jamais le crédit bancaire.",
          "Parce qu’une banque centrale ne cherche jamais à stabiliser les prix.",
          "Parce qu’ils ne peuvent produire aucun effet hors du marché immobilier."
        ],
        "why": "L’outil est puissant mais imparfait et coûteux.",
        "trap": "Jugement binaire : soit les taux résolvent tout, soit ils ne servent à rien.",
        "evidence": "Bloc 5."
      }
    ]
  },
  "geo-containers-chokepoints": {
    "hook": "Un téléphone assemblé en Asie, vendu en Europe et dépendant de minerais venus de plusieurs continents voyage dans un système d’une efficacité impressionnante — jusqu’au moment où un canal se bloque, qu’un port ferme ou qu’un détroit devient dangereux.",
    "keyFacts": [
      "1956 : Malcolm McLean popularise le transport maritime par conteneurs standardisés",
      "Intermodalité : le même caisson passe du navire au train et au camion",
      "Façades portuaires : concentration dans quelques grands hubs connectés à un arrière-pays",
      "Points de passage : Suez, Panama, Malacca, Ormuz ou Bab el-Mandeb",
      "Fragilité : flux tendus, dépendances, conflits, accidents et coût environnemental"
    ],
    "express": [
      "Avant le conteneur, charger un navire demande de manipuler séparément sacs, caisses et tonneaux. La boîte métallique standardisée réduit les ruptures de charge : une grue déplace le même caisson entre navire, train et camion. Le transport devient plus rapide, prévisible et compatible avec des chaînes de production mondiales.",
      "Cette efficacité concentre les flux. Les très grands porte-conteneurs fréquentent des ports équipés de chenaux profonds, grues géantes, zones logistiques et connexions terrestres. Singapour, Shanghai, Rotterdam ou Tanger Med fonctionnent comme des nœuds, pas comme de simples quais.",
      "Les routes passent par des détroits et canaux difficiles à contourner. Le détroit de Malacca relie océan Indien et mer de Chine méridionale ; Suez évite le tour de l’Afrique. Un incident local peut donc produire une onde mondiale. La mondialisation n’efface pas la géographie : elle rend certains lieux encore plus stratégiques."
    ],
    "complete": [
      {
        "title": "1. La révolution de la boîte standard",
        "text": "En 1956, l’entrepreneur américain Malcolm McLean fait transporter des remorques métalliques sur un navire. Le conteneur n’est pas inventé d’un seul coup, mais sa standardisation internationale transforme l’échelle du système. Des dimensions communes permettent aux grues, wagons, camions et navires de s’adapter au même objet.\n\nLe principal gain vient de la réduction des manipulations. Les marchandises sont moins exposées au vol et aux dégâts ; les navires restent moins longtemps au port. Le coût par unité baisse, ce qui facilite la dispersion géographique des étapes de production."
      },
      {
        "title": "2. L’intermodalité fabrique des chaînes mondiales",
        "text": "Un conteneur peut quitter une usine par camion, rejoindre un terminal ferroviaire, traverser un océan, puis repartir sans être ouvert. Cette intermodalité rend possibles des chaînes où conception, pièces, assemblage et vente se situent dans des pays différents.\n\nLa distance ne disparaît pas. Elle devient calculable en délais, fiabilité et coût. Les entreprises organisent parfois la production en flux tendus, avec peu de stocks. Cela réduit l’argent immobilisé, mais augmente la vulnérabilité à un retard."
      },
      {
        "title": "3. Les ports deviennent des plateformes",
        "text": "Les grands ports associent terminaux automatisés, entrepôts, zones industrielles, douanes et réseaux terrestres. Leur puissance dépend de leur avant-pays maritime — les routes desservies — et de leur arrière-pays, appelé hinterland, relié par routes, fleuves ou trains.\n\nUn port peut être un hub où les cargaisons passent d’un grand navire à des navires plus petits. Cette concentration crée des économies d’échelle, mais elle favorise aussi quelques armateurs et plateformes capables d’imposer leurs standards."
      },
      {
        "title": "4. Détroits et canaux : des passages étroits pour des flux immenses",
        "text": "Le canal de Suez relie Méditerranée et mer Rouge ; Panama unit Atlantique et Pacifique ; Malacca offre la voie la plus courte entre l’océan Indien et l’Asie orientale. Ormuz est crucial pour les hydrocarbures du Golfe, Bab el-Mandeb pour l’accès à la mer Rouge.\n\nCes passages sont des points d’étranglement, ou chokepoints. Les contourner peut ajouter des milliers de kilomètres. Accidents, piraterie, tensions militaires ou sécheresse limitant un canal modifient alors les prix, les assurances et les délais à l’échelle mondiale."
      },
      {
        "title": "5. Efficacité, dépendance et coût écologique",
        "text": "Le transport maritime émet moins par tonne-kilomètre que l’avion ou souvent le camion, mais son volume gigantesque produit une pollution importante. Les navires utilisent de l’énergie, émettent des gaz à effet de serre et peuvent diffuser des espèces par les eaux de ballast. Les ports transforment aussi les littoraux.\n\nLa recherche de résilience pousse certaines entreprises à diversifier leurs fournisseurs, constituer des stocks ou rapprocher certaines productions. Il ne s’agit pas de la fin de la mondialisation, mais d’un arbitrage entre coût minimal, vitesse, sécurité et impact environnemental."
      }
    ],
    "deeper": [
      {
        "title": "Pourquoi les navires grossissent",
        "text": "Un très grand navire réduit souvent le coût par conteneur, mais exige des ports adaptés et concentre les risques."
      },
      {
        "title": "Le dernier kilomètre",
        "text": "Le trajet maritime peut être bon marché tandis que congestion, douane et livraison urbaine représentent une part décisive du coût."
      },
      {
        "title": "Cartographier les dépendances",
        "text": "Pour comprendre un produit, suis ses composants, ses ports et ses passages obligés plutôt que son seul pays d’assemblage."
      }
    ],
    "takeaways": [
      {
        "label": "Standardiser",
        "text": "La même boîte relie navire, train et camion."
      },
      {
        "label": "Concentrer",
        "text": "Quelques ports et armateurs organisent une grande part des flux."
      },
      {
        "label": "Étrangler",
        "text": "Canaux et détroits rendent certains lieux décisifs."
      },
      {
        "label": "Arbitrer",
        "text": "Coût, vitesse, résilience et environnement ne progressent pas toujours ensemble."
      }
    ],
    "quiz": [
      {
        "kind": "innovation",
        "q": "Pourquoi le conteneur réduit-il fortement les coûts ?",
        "a": "Parce qu’une boîte standardisée passe entre plusieurs modes de transport avec beaucoup moins de manutention.",
        "choices": [
          "Parce qu’il supprime la nécessité de ports et de grues.",
          "Parce qu’il permet à tous les produits de voyager sans navire.",
          "Parce qu’il rend la distance physique inexistante."
        ],
        "why": "La standardisation et l’intermodalité limitent les ruptures de charge.",
        "trap": "Attribuer le gain à la boîte seule sans l’ensemble des infrastructures compatibles.",
        "evidence": "Blocs 1 et 2."
      },
      {
        "kind": "notion",
        "q": "Qu’est-ce que l’intermodalité ?",
        "a": "L’utilisation successive de plusieurs modes de transport en conservant la même unité de chargement.",
        "choices": [
          "Le remplacement de tous les camions par des avions.",
          "La spécialisation d’un port dans un seul type de marchandise.",
          "Le transport d’un produit uniquement à l’intérieur d’un pays."
        ],
        "why": "Le conteneur circule sans être vidé entre navire, train et camion.",
        "trap": "Confondre plusieurs modes connectés avec plusieurs trajets indépendants.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "port",
        "q": "De quoi dépend la puissance d’un grand port ?",
        "a": "De ses terminaux, de ses routes maritimes et de sa connexion à un hinterland terrestre.",
        "choices": [
          "Uniquement de la longueur de sa plage naturelle.",
          "Uniquement du nombre d’habitants de la ville voisine.",
          "De son éloignement maximal des réseaux ferroviaires et routiers."
        ],
        "why": "Un port est un nœud logistique relié au monde et à l’intérieur des terres.",
        "trap": "Voir le port comme un quai isolé.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "géographie",
        "q": "Pourquoi le détroit de Malacca est-il stratégique ?",
        "a": "Parce qu’il offre un passage court entre l’océan Indien et l’Asie orientale pour une masse immense de flux.",
        "choices": [
          "Parce qu’il relie directement l’Atlantique à la Méditerranée.",
          "Parce qu’il est le seul passage terrestre entre Europe et Afrique.",
          "Parce qu’il permet d’éviter totalement toute route maritime asiatique."
        ],
        "why": "Sa position le transforme en chokepoint majeur.",
        "trap": "Confondre les fonctions de Malacca, Suez et Panama.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi les chaînes en flux tendus sont-elles vulnérables ?",
        "a": "Parce qu’elles réduisent les stocks de sécurité et transmettent rapidement un retard local à toute la production.",
        "choices": [
          "Parce qu’elles obligent chaque usine à produire tous ses composants seule.",
          "Parce qu’elles interdisent tout transport maritime.",
          "Parce qu’elles accumulent toujours davantage de stocks inutilisés."
        ],
        "why": "L’efficacité quotidienne peut réduire la capacité à absorber un choc.",
        "trap": "Croire que le coût minimal et la résilience maximale vont toujours ensemble.",
        "evidence": "Blocs 2 et 5."
      }
    ]
  },
  "music-hiphop-sampling": {
    "hook": "Le hip-hop ne naît pas quand un disque est vendu sous cette étiquette. Il se forme dans des fêtes de quartier où des DJ prolongent les passages rythmiques, des MC animent la foule, des danseurs transforment le break et des artistes couvrent murs et trains de signatures.",
    "keyFacts": [
      "Bronx, années 1970 : fêtes de quartier et sound systems",
      "DJ Kool Herc : isolement et prolongation des breaks de batterie",
      "Grandmaster Flash : précision du mix, repérage et techniques de platines",
      "MC : de l’animation de la fête à des récits rythmiques complexes",
      "Sampling : réutilisation enregistrée de sons, enjeu créatif, juridique et économique"
    ],
    "express": [
      "Dans le Bronx des années 1970, crise urbaine et abandon public coexistent avec une intense invention culturelle. DJ Kool Herc utilise deux exemplaires d’un disque pour prolonger le break, le passage où la batterie domine. Les danseurs — b-boys et b-girls — attendent précisément ces moments.",
      "Grandmaster Flash perfectionne le repérage et l’enchaînement ; Afrika Bambaataa organise des réseaux et construit un récit collectif du mouvement. Les MC passent de courtes formules destinées à la fête à des textes plus longs, rythmés et compétitifs. DJing, rap, breaking et graffiti ne forment pas toujours un bloc fixe, mais deviennent les piliers d’une culture nommée hip-hop.",
      "Avec les boîtes à rythmes et les samplers, les producteurs peuvent découper, répéter et transformer des fragments enregistrés. Le sampling n’est pas une simple copie : le contexte, le découpage et la superposition créent une nouvelle œuvre. Mais droits d’auteur, rémunération et accès aux catalogues produisent aussi des conflits durables."
    ],
    "complete": [
      {
        "title": "1. Le Bronx : destruction urbaine et création sociale",
        "text": "Dans les années 1970, certains quartiers du Bronx subissent désindustrialisation, pauvreté, incendies et recul des services publics. Les autoroutes et politiques immobilières ont fragmenté des communautés. Pourtant, réduire le hip-hop à une réaction mécanique à la misère serait insuffisant : il naît aussi d’héritages caribéens, afro-américains et latino, de compétences techniques et d’une volonté de créer des espaces festifs.\n\nLes block parties utilisent platines, amplificateurs et enceintes. Le DJ devient le centre de l’organisation musicale plutôt que le groupe jouant en direct."
      },
      {
        "title": "2. Le break devient une matière musicale",
        "text": "Clive Campbell, dit DJ Kool Herc, observe que la foule réagit fortement aux breaks instrumentaux de funk ou de soul. Avec deux copies du même disque, il peut passer d’une platine à l’autre et prolonger ce moment : c’est le merry-go-round. Les danseurs développent leurs figures sur ces sections.\n\nGrandmaster Flash améliore la précision grâce au repérage des sillons et au contrôle manuel. Le scratch, popularisé notamment par Grand Wizzard Theodore, transforme aussi la platine en instrument. La technologie existante change de fonction par l’usage."
      },
      {
        "title": "3. Du maître de cérémonie au rappeur",
        "text": "Le MC parle d’abord pour présenter le DJ, maintenir l’énergie et faire répondre la foule. Les formules rimées s’allongent, deviennent compétitives et racontent identités, humour, vie de quartier ou critique sociale. En 1979, Rapper’s Delight contribue à diffuser commercialement le rap, même si le morceau reprend des pratiques déjà anciennes dans les fêtes.\n\nThe Message de Grandmaster Flash and the Furious Five, en 1982, montre la force d’un récit social enregistré. L’histoire ne progresse donc pas d’un rap « léger » vers un rap enfin sérieux : fête, virtuosité, conflit et politique coexistent dès les débuts."
      },
      {
        "title": "4. Le sampling compose avec la mémoire enregistrée",
        "text": "Les premiers DJ manipulent directement des disques. Les samplers numériques permettent ensuite d’enregistrer un fragment, de le transposer, le filtrer, le découper et le jouer comme une nouvelle matière. Une boucle de batterie, une note de basse ou une syllabe peuvent être méconnaissables après transformation.\n\nLe sampling crée un dialogue avec l’histoire de la musique noire, mais aussi avec rock, jazz, musiques électroniques et archives du monde entier. Il peut rendre hommage, contester ou déplacer le sens original. La créativité réside dans la sélection et la relation entre fragments."
      },
      {
        "title": "5. Une culture mondiale et des conflits de propriété",
        "text": "À mesure que le rap devient une industrie, les ayants droit réclament autorisations et paiements. Des procès imposent progressivement le clearance des samples, ce qui favorise parfois les artistes capables de payer. Les producteurs développent alors d’autres stratégies : rejouer une partie, utiliser des fragments minuscules ou créer leurs propres sons.\n\nLe hip-hop circule mondialement et s’adapte aux langues, histoires et scènes locales. Il ne s’agit pas d’une copie uniforme des États-Unis : chaque espace combine techniques globales et conflits propres. Son histoire relie donc invention de quartier, industrie culturelle et lutte pour contrôler la mémoire sonore."
      }
    ],
    "deeper": [
      {
        "title": "Les « quatre éléments »",
        "text": "DJing, MCing, breaking et graffiti forment un récit utile du hip-hop, mais leurs histoires et participants ne coïncident pas toujours parfaitement."
      },
      {
        "title": "Le sample comme citation",
        "text": "Reconnaître la source peut ajouter un sens, mais un morceau doit aussi fonctionner pour l’auditeur qui ne la connaît pas."
      },
      {
        "title": "Technologie détournée",
        "text": "Platines, mixeurs et samplers n’étaient pas destinés à produire exactement ces pratiques : les usages inventent l’instrument."
      }
    ],
    "takeaways": [
      {
        "label": "Break",
        "text": "Le DJ isole et prolonge le passage le plus rythmique."
      },
      {
        "label": "MC",
        "text": "L’animation de la fête devient une écriture vocale complexe."
      },
      {
        "label": "Sample",
        "text": "Un fragment enregistré devient matière à découper et recomposer."
      },
      {
        "label": "Culture",
        "text": "Le hip-hop relie espace urbain, technique, danse, image et industrie."
      }
    ],
    "quiz": [
      {
        "kind": "origine",
        "q": "Dans quel contexte le hip-hop se forme-t-il ?",
        "a": "Dans les fêtes de quartier du Bronx des années 1970, au croisement d’héritages afro-américains, caribéens et latino.",
        "choices": [
          "Dans les conservatoires européens comme prolongement direct de l’opéra.",
          "Dans les studios hollywoodiens pour accompagner les films muets.",
          "Dans les radios nationales après l’invention du streaming."
        ],
        "why": "Le mouvement naît d’une scène locale avant sa commercialisation.",
        "trap": "Chercher une date unique de sortie de disque comme acte de naissance.",
        "evidence": "Bloc 1."
      },
      {
        "kind": "technique",
        "q": "Que fait DJ Kool Herc avec deux exemplaires d’un disque ?",
        "a": "Il alterne les platines pour prolonger le break de batterie apprécié des danseurs.",
        "choices": [
          "Il joue les deux albums entièrement en même temps sans les synchroniser.",
          "Il efface les passages rythmiques pour privilégier les couplets chantés.",
          "Il enregistre immédiatement chaque fête sur un sampler numérique."
        ],
        "why": "Le merry-go-round transforme un court passage en espace de danse prolongé.",
        "trap": "Confondre la technique des platines avec le sampling numérique plus tardif.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "évolution",
        "q": "Comment évolue le rôle du MC ?",
        "a": "De l’animation de la foule vers des performances rimées, narratives et parfois politiques plus longues.",
        "choices": [
          "Il abandonne rapidement la parole pour ne laisser que le DJ.",
          "Il devient uniquement responsable des éclairages de la fête.",
          "Il remplace les danseurs en jouant les breaks à la batterie."
        ],
        "why": "La voix prend progressivement une autonomie musicale et narrative.",
        "trap": "Imaginer que le rap enregistré existe déjà sous sa forme complète au premier jour.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "définition",
        "q": "Qu’est-ce que le sampling ?",
        "a": "L’enregistrement et la transformation d’un fragment sonore existant pour l’intégrer à une nouvelle composition.",
        "choices": [
          "La copie intégrale d’un morceau sans modification ni contexte nouveau.",
          "L’écriture d’une partition entièrement silencieuse.",
          "Le simple fait d’écouter plusieurs styles avant de composer."
        ],
        "why": "Le fragment devient une matière manipulable : boucle, découpe, filtre ou transposition.",
        "trap": "Réduire tout sampling à du plagiat ou à une citation intacte.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "enjeu",
        "q": "Pourquoi les règles juridiques sur les samples modifient-elles la création ?",
        "a": "Parce que les autorisations et coûts peuvent favoriser les artistes disposant de davantage de moyens et pousser à d’autres techniques.",
        "choices": [
          "Parce qu’elles interdisent depuis toujours toute utilisation de platines.",
          "Parce qu’elles rendent tous les sons anciens automatiquement gratuits.",
          "Parce qu’elles suppriment la possibilité de produire des rythmes originaux."
        ],
        "why": "La propriété intellectuelle agit sur les choix esthétiques et économiques.",
        "trap": "Séparer totalement création musicale et conditions d’accès aux archives.",
        "evidence": "Bloc 5."
      }
    ]
  }
};
  const MYSTERIES = [
  {
    "id": "history-mystery-haitian-revolution-177",
    "discipline": "history",
    "difficulty": "difficile",
    "title": "La liberté conquise dans la colonie la plus riche",
    "caseTitle": "Révolution atlantique à identifier",
    "subjectType": "révolution et indépendance",
    "periodHint": "Caraïbes · 1791-1804",
    "lessonId": "history-haitian-revolution",
    "prompt": "Dans une colonie bâtie sur le sucre et l’esclavage, les dominés utilisent le langage des droits, battent plusieurs armées et fondent un État indépendant.",
    "answer": "La révolution haïtienne",
    "aliases": [
      "révolution haitienne",
      "revolution haitienne",
      "révolution de saint-domingue",
      "revolution de saint domingue"
    ],
    "clues": [
      "Elle commence par une grande insurrection d’esclaves dans le Nord de Saint-Domingue en août 1791.",
      "L’abolition française de 1794 et Toussaint Louverture modifient les alliances.",
      "Après la victoire de Vertières, l’indépendance d’Haïti est proclamée le 1er janvier 1804."
    ],
    "explanation": "La révolution haïtienne transforme une révolte d’esclaves en abolition puis en indépendance, bouleversant le monde atlantique.",
    "blockedGuesses": [
      "haiti",
      "haïti",
      "esclavage",
      "toussaint louverture"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB177": true,
    "editorialRevision": "beta177"
  },
  {
    "id": "history-mystery-toussaint-177",
    "discipline": "history",
    "difficulty": "expert",
    "title": "Le gouverneur qui refuse le retour aux chaînes",
    "caseTitle": "Personnage historique à identifier",
    "subjectType": "chef révolutionnaire",
    "periodHint": "Saint-Domingue · fin du XVIIIe siècle",
    "lessonId": "history-haitian-revolution",
    "prompt": "Ancien esclave devenu libre, il change d’alliance lorsque la France abolit l’esclavage, dirige presque toute la colonie puis meurt prisonnier loin des Caraïbes.",
    "answer": "Toussaint Louverture",
    "aliases": [
      "toussaint",
      "toussaint l ouverture",
      "toussaint louverture"
    ],
    "clues": [
      "Il se rallie à la République française après l’abolition de 1794.",
      "La Constitution de 1801 le nomme gouverneur à vie de Saint-Domingue.",
      "Capturé pendant l’expédition Leclerc, il meurt en 1803 au fort de Joux."
    ],
    "explanation": "Toussaint Louverture est un dirigeant majeur de la révolution de Saint-Domingue, avant la phase finale menée par Dessalines.",
    "blockedGuesses": [
      "dessalines",
      "haiti",
      "haïti",
      "gouverneur"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB177": true,
    "editorialRevision": "beta177"
  },
  {
    "id": "art-mystery-cubism-177",
    "discipline": "art",
    "difficulty": "moyen",
    "title": "Un objet vu comme une enquête",
    "caseTitle": "Mouvement artistique à identifier",
    "subjectType": "mouvement artistique",
    "periodHint": "Paris · 1907-1914",
    "lessonId": "art-cubism-multiple-viewpoints",
    "prompt": "Une guitare, un visage ou une table sont fragmentés en plans. Le tableau ne se soumet plus à un observateur immobile placé devant une fenêtre.",
    "answer": "Le cubisme",
    "aliases": [
      "cubisme",
      "le cubisme"
    ],
    "clues": [
      "Picasso et Braque en sont les deux acteurs les plus associés avant 1914.",
      "Sa phase analytique utilise souvent une palette resserrée et des facettes difficiles à lire.",
      "Sa phase synthétique introduit papiers collés, journaux et faux bois."
    ],
    "explanation": "Le cubisme déconstruit la perspective unique et fait de l’image une construction de signes, de matières et de points de vue.",
    "blockedGuesses": [
      "picasso",
      "braque",
      "abstraction",
      "géométrie"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB177": true,
    "editorialRevision": "beta177"
  },
  {
    "id": "art-mystery-collage-177",
    "discipline": "art",
    "difficulty": "difficile",
    "title": "Le journal entre réellement dans la nature morte",
    "caseTitle": "Technique artistique à identifier",
    "subjectType": "technique de composition",
    "periodHint": "Art moderne · à partir de 1912",
    "lessonId": "art-cubism-multiple-viewpoints",
    "prompt": "Au lieu d’imiter une texture, l’artiste fixe sur la surface un fragment déjà fabriqué. Ce morceau reste un objet réel tout en devenant signe dans l’image.",
    "answer": "Le collage",
    "aliases": [
      "collage",
      "le collage",
      "papier collé",
      "papiers collés"
    ],
    "clues": [
      "Braque utilise du papier imitant le bois et Picasso de la toile cirée ou du journal.",
      "La technique brouille la frontière entre représentation et matériau réel.",
      "Elle sera reprise par Dada, le photomontage et de nombreuses avant-gardes."
    ],
    "explanation": "Le collage incorpore des matériaux préexistants à l’œuvre et transforme la définition même du tableau.",
    "blockedGuesses": [
      "papier",
      "journal",
      "cubisme",
      "peinture"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB177": true,
    "editorialRevision": "beta177"
  },
  {
    "id": "cinema-mystery-kuleshov-177",
    "discipline": "cinema",
    "difficulty": "difficile",
    "title": "Le visage ne change pas, son émotion oui",
    "caseTitle": "Effet de montage à identifier",
    "subjectType": "principe de montage",
    "periodHint": "Cinéma soviétique · années 1920",
    "lessonId": "cinema-montage-meaning",
    "prompt": "Le même visage impassible paraît affamé, triste ou tendre selon l’image qui lui est associée. Le sens naît moins du jeu visible que de la relation entre deux plans.",
    "answer": "L’effet Koulechov",
    "aliases": [
      "effet koulechov",
      "l effet koulechov",
      "effet kuleshov",
      "kuleshov effect"
    ],
    "clues": [
      "Il porte le nom d’un cinéaste et pédagogue soviétique.",
      "L’expérience célèbre juxtapose le visage de Mosjoukine à une soupe, un cercueil ou une enfant.",
      "Il démontre que le spectateur projette une émotion à partir du plan voisin."
    ],
    "explanation": "L’effet Koulechov désigne la modification du sens d’un plan par celui qui le précède ou le suit.",
    "blockedGuesses": [
      "montage",
      "visage",
      "soupe",
      "mosjoukine"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB177": true,
    "editorialRevision": "beta177"
  },
  {
    "id": "cinema-mystery-montage-177",
    "discipline": "cinema",
    "difficulty": "moyen",
    "title": "Le film naît entre les prises",
    "caseTitle": "Opération cinématographique à identifier",
    "subjectType": "opération de langage cinématographique",
    "periodHint": "Cinéma · toutes périodes",
    "lessonId": "cinema-montage-meaning",
    "prompt": "Elle sélectionne les prises, décide de leur ordre et de leur durée. Elle peut rendre une action invisible, créer une ellipse ou faire naître une idée entre deux images.",
    "answer": "Le montage",
    "aliases": [
      "montage",
      "le montage",
      "montage cinéma",
      "montage cinematographique",
      "montage cinématographique"
    ],
    "clues": [
      "Le raccord dans le mouvement et le champ-contrechamp peuvent la rendre presque invisible.",
      "Eisenstein la pense comme une collision capable de produire un argument.",
      "Elle concerne aussi les sons, qui peuvent commencer avant ou continuer après une coupe."
    ],
    "explanation": "Le montage construit le temps, l’espace, le rythme et le sens à partir des plans et des sons.",
    "blockedGuesses": [
      "coupe",
      "raccord",
      "editing",
      "film"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB177": true,
    "editorialRevision": "beta177"
  },
  {
    "id": "science-mystery-natural-selection-177",
    "discipline": "science-inventions",
    "difficulty": "moyen",
    "title": "Le milieu trie sans prévoir",
    "caseTitle": "Mécanisme évolutif à identifier",
    "subjectType": "mécanisme biologique",
    "periodHint": "Biologie évolutive",
    "lessonId": "sci-natural-selection",
    "prompt": "Dans une population variable, certains caractères héréditaires permettent de laisser davantage de descendants. Leur fréquence augmente sans qu’aucun organisme ait prévu le résultat.",
    "answer": "La sélection naturelle",
    "aliases": [
      "sélection naturelle",
      "selection naturelle",
      "la selection naturelle",
      "la sélection naturelle"
    ],
    "clues": [
      "Darwin et Wallace présentent ensemble cette idée en 1858.",
      "Elle exige variation héréditaire et succès reproductif différent.",
      "Elle explique notamment l’augmentation des résistances aux antibiotiques."
    ],
    "explanation": "La sélection naturelle modifie la fréquence des caractères héréditaires selon leur effet sur la reproduction dans un environnement donné.",
    "blockedGuesses": [
      "darwin",
      "evolution",
      "évolution",
      "adaptation"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB177": true,
    "editorialRevision": "beta177"
  },
  {
    "id": "science-mystery-common-ancestor-177",
    "discipline": "science-inventions",
    "difficulty": "difficile",
    "title": "Des branches différentes, une histoire partagée",
    "caseTitle": "Notion évolutive à identifier",
    "subjectType": "relation entre espèces",
    "periodHint": "Arbre du vivant",
    "lessonId": "sci-natural-selection",
    "prompt": "Deux espèces actuelles ne se transforment pas l’une en l’autre. En remontant leurs lignées, on atteint une population ancienne dont elles descendent toutes deux.",
    "answer": "Un ancêtre commun",
    "aliases": [
      "ancêtre commun",
      "ancetre commun",
      "un ancêtre commun",
      "un ancetre commun",
      "origine commune"
    ],
    "clues": [
      "La notion se représente par un nœud dans un arbre phylogénétique.",
      "Les humains et les chimpanzés actuels sont des cousins évolutifs, pas parent et descendant.",
      "Plus le nœud est récent, plus les groupes comparés sont proches dans l’arbre."
    ],
    "explanation": "Un ancêtre commun est une population ancestrale à partir de laquelle plusieurs lignées se sont séparées.",
    "blockedGuesses": [
      "evolution",
      "évolution",
      "darwin",
      "singe"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB177": true,
    "editorialRevision": "beta177"
  },
  {
    "id": "economy-mystery-inflation-177",
    "discipline": "economy",
    "difficulty": "moyen",
    "title": "La monnaie achète moins en moyenne",
    "caseTitle": "Phénomène économique à identifier",
    "subjectType": "évolution générale des prix",
    "periodHint": "Économie contemporaine",
    "lessonId": "eco-inflation-interest-rates",
    "prompt": "Elle ne correspond pas au seul prix du café ou du pétrole. Elle apparaît lorsqu’un ensemble large de biens et services devient durablement plus cher.",
    "answer": "L’inflation",
    "aliases": [
      "inflation",
      "l inflation",
      "l’inflation"
    ],
    "clues": [
      "Elle est mesurée à l’aide d’un panier de consommation pondéré.",
      "Elle peut réduire le pouvoir d’achat si les revenus augmentent moins vite.",
      "Elle diminue le rendement réel d’une épargne dont le taux nominal est inférieur à la hausse des prix."
    ],
    "explanation": "L’inflation est une hausse durable et générale du niveau des prix, mesurée par des indices.",
    "blockedGuesses": [
      "prix",
      "hausse des prix",
      "vie chère",
      "pouvoir d achat"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB177": true,
    "editorialRevision": "beta177"
  },
  {
    "id": "economy-mystery-policy-rate-177",
    "discipline": "economy",
    "difficulty": "difficile",
    "title": "Le levier qui refroidit le crédit",
    "caseTitle": "Instrument monétaire à identifier",
    "subjectType": "taux de banque centrale",
    "periodHint": "Politique monétaire",
    "lessonId": "eco-inflation-interest-rates",
    "prompt": "Une institution le relève pour rendre le financement plus coûteux et ralentir la demande. Elle ne fixe pourtant ni le prix du pain ni directement le taux de chaque prêt.",
    "answer": "Le taux directeur",
    "aliases": [
      "taux directeur",
      "le taux directeur",
      "taux d intérêt directeur",
      "taux d’interet directeur",
      "taux de la banque centrale"
    ],
    "clues": [
      "Il oriente les conditions auxquelles les banques obtiennent des liquidités à court terme.",
      "Sa variation se transmet aux crédits, placements, taux de change et anticipations.",
      "La Banque centrale européenne ou la Réserve fédérale en fixent plusieurs formes."
    ],
    "explanation": "Le taux directeur est un instrument de banque centrale qui influence progressivement les conditions de financement de l’économie.",
    "blockedGuesses": [
      "taux",
      "intérêt",
      "interet",
      "banque centrale",
      "bce"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB177": true,
    "editorialRevision": "beta177"
  },
  {
    "id": "geography-mystery-containerization-177",
    "discipline": "geography",
    "difficulty": "moyen",
    "title": "Une boîte qui réorganise la planète",
    "caseTitle": "Transformation logistique à identifier",
    "subjectType": "système de transport",
    "periodHint": "Depuis les années 1950",
    "lessonId": "geo-containers-chokepoints",
    "prompt": "Une unité métallique standard passe du camion au train puis au navire sans que les marchandises soient manipulées séparément. Les ports, les usines et les stocks se réorganisent autour d’elle.",
    "answer": "La conteneurisation",
    "aliases": [
      "conteneurisation",
      "la conteneurisation",
      "containerisation",
      "transport par conteneurs"
    ],
    "clues": [
      "Malcolm McLean contribue à la populariser à partir de 1956.",
      "Elle réduit les ruptures de charge, les vols et le temps passé au port.",
      "Elle rend l’intermodalité et les chaînes de production mondiales beaucoup plus efficaces."
    ],
    "explanation": "La conteneurisation standardise l’unité de chargement et connecte les modes de transport dans un système logistique mondial.",
    "blockedGuesses": [
      "conteneur",
      "container",
      "bateau",
      "transport maritime"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB177": true,
    "editorialRevision": "beta177"
  },
  {
    "id": "geography-mystery-malacca-177",
    "discipline": "geography",
    "difficulty": "expert",
    "title": "Le passage étroit au cœur de l’Asie",
    "caseTitle": "Détroit stratégique à identifier",
    "subjectType": "point d’étranglement maritime",
    "periodHint": "Asie du Sud-Est",
    "lessonId": "geo-containers-chokepoints",
    "prompt": "Entre une péninsule et une grande île, il concentre les routes reliant l’océan Indien aux ports d’Asie orientale. Le contourner allongerait fortement de nombreux trajets.",
    "answer": "Le détroit de Malacca",
    "aliases": [
      "détroit de malacca",
      "detroit de malacca",
      "malacca",
      "le détroit de malacca",
      "le detroit de malacca"
    ],
    "clues": [
      "Il sépare principalement la péninsule Malaise de l’île de Sumatra.",
      "Singapour se situe près de son extrémité sud-est.",
      "Une part majeure des approvisionnements énergétiques vers la Chine, le Japon et la Corée y transite."
    ],
    "explanation": "Le détroit de Malacca est l’un des principaux chokepoints mondiaux entre l’océan Indien et la mer de Chine méridionale.",
    "blockedGuesses": [
      "suez",
      "panama",
      "ormuz",
      "singapour",
      "détroit"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB177": true,
    "editorialRevision": "beta177"
  },
  {
    "id": "music-mystery-sampling-177",
    "discipline": "music",
    "difficulty": "moyen",
    "title": "Composer avec un fragment de mémoire",
    "caseTitle": "Technique musicale à identifier",
    "subjectType": "technique de production sonore",
    "periodHint": "Musique enregistrée · XXe-XXIe siècles",
    "lessonId": "music-hiphop-sampling",
    "prompt": "Un producteur prélève quelques secondes d’un enregistrement, les découpe, les répète, les filtre ou les transpose jusqu’à en faire une nouvelle matière musicale.",
    "answer": "Le sampling",
    "aliases": [
      "sampling",
      "le sampling",
      "échantillonnage",
      "echantillonnage",
      "sample"
    ],
    "clues": [
      "La technique devient centrale avec les samplers numériques et le hip-hop.",
      "Le fragment peut être une batterie, une basse, une voix ou un bruit.",
      "Son usage soulève des questions de transformation créative, d’autorisation et de rémunération."
    ],
    "explanation": "Le sampling consiste à enregistrer et transformer un fragment sonore préexistant pour l’intégrer à une nouvelle composition.",
    "blockedGuesses": [
      "sampleur",
      "sampler",
      "copie",
      "plagiat"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB177": true,
    "editorialRevision": "beta177"
  },
  {
    "id": "music-mystery-breakbeat-177",
    "discipline": "music",
    "difficulty": "difficile",
    "title": "Le passage que le DJ refuse de laisser finir",
    "caseTitle": "Élément rythmique à identifier",
    "subjectType": "passage musical et technique de DJ",
    "periodHint": "Bronx · années 1970",
    "lessonId": "music-hiphop-sampling",
    "prompt": "Dans un disque de funk ou de soul, la voix et plusieurs instruments s’effacent un instant au profit de la batterie. Deux platines permettent d’allonger ce moment pour les danseurs.",
    "answer": "Le breakbeat",
    "aliases": [
      "breakbeat",
      "le breakbeat",
      "break beat",
      "break de batterie",
      "le break"
    ],
    "clues": [
      "DJ Kool Herc repère ces passages particulièrement appréciés des b-boys et b-girls.",
      "Avec deux copies du disque, il passe de l’un à l’autre pour créer un merry-go-round.",
      "Ce principe devient une base du hip-hop puis de plusieurs genres électroniques."
    ],
    "explanation": "Le breakbeat est un passage rythmique centré sur la batterie, isolé et prolongé par les DJ avant d’être samplé et recomposé.",
    "blockedGuesses": [
      "breakdance",
      "breaking",
      "batterie",
      "kool herc",
      "hip hop"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB177": true,
    "editorialRevision": "beta177"
  }
];

  Object.entries(LESSONS).forEach(([worldId, items]) => {
    if (!Array.isArray(data.lessons[worldId])) data.lessons[worldId] = [];
    const known = new Set(data.lessons[worldId].map(item => item.id));
    items.forEach(item => { if (!known.has(item.id)) data.lessons[worldId].push(item); });
  });
  Object.keys(PACKS).forEach(id => PUBLISHED_LESSON_IDS.add(id));
  Object.assign(READY_LESSON_PACKS, PACKS);
  lessonIndexCache = null;

  if (!Array.isArray(data.mysteries)) data.mysteries = [];
  const knownMysteries = new Set(data.mysteries.map(item => item.id));
  MYSTERIES.forEach(item => {
    if (!knownMysteries.has(item.id)) {
      data.mysteries.push(item);
      knownMysteries.add(item.id);
    }
  });
  data.mysteries.forEach(item => { item.rescueAvailable = true; });
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, expansionVersion: VERSION }; } catch {}
})();
