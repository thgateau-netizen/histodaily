/* HistoDaily 1.0.0-rc.22.0 — extension éditoriale philosophy. */
(function histodailyRC19PhilosophyDepth(){
  "use strict";
  const VERSION = "1.0.0-rc.22.0";
  const DEFINITIONS = [
  {
    "id": "philo-argument-validity",
    "world": "philo-argument",
    "title": "Validité et vérité : un bon raisonnement n’est pas seulement une conclusion vraie",
    "period": "Méthode",
    "location": "Raisonnement",
    "emoji": "🧱",
    "xp": 75,
    "hook": "Une conclusion peut être vraie par hasard alors que le raisonnement est mauvais. Inversement, un raisonnement peut être logiquement valide à partir de prémisses fausses.",
    "express": [
      "Un argument est valide lorsque, si ses prémisses étaient vraies, sa conclusion ne pourrait pas être fausse. La validité porte donc sur la structure du passage des prémisses à la conclusion.",
      "“Tous les chats sont des reptiles ; Félix est un chat ; donc Félix est un reptile” est valide dans sa forme mais contient une prémisse fausse. La logique n’a pas encore vérifié le monde.",
      "Un argument solide combine une structure valide et des prémisses suffisamment justifiées. C’est seulement à ce niveau qu’on peut vraiment faire confiance à la conclusion.",
      "Cette distinction évite deux erreurs : accepter un mauvais raisonnement parce que sa conclusion nous plaît, ou rejeter une bonne structure uniquement parce que son exemple contient une prémisse fausse."
    ],
    "sections": [
      [
        "1. Structure et contenu",
        "La logique distingue la forme de l’argument et la vérité des propositions qui le composent. La validité demande : la conclusion suit-elle nécessairement si j’accorde les prémisses ? La vérité demande : les prémisses et la conclusion correspondent-elles réellement aux faits ou sont-elles défendables ?"
      ],
      [
        "2. Une validité avec prémisse fausse",
        "Tous les poissons sont des mammifères ; le saumon est un poisson ; donc le saumon est un mammifère. La conclusion est fausse, mais le schéma est valide : si les deux prémisses étaient vraies, la conclusion devrait l’être. Cela montre que validité ne veut pas dire vérité."
      ],
      [
        "3. Conclusion vraie, raisonnement mauvais",
        "Paris est en France ; 2 + 2 = 4 ; donc l’eau bout à 100 °C à pression standard. La conclusion peut être vraie dans les conditions précisées, mais elle ne découle pas des prémisses. Une conclusion correcte ne répare pas un lien logique absent."
      ],
      [
        "4. Solidité",
        "On appelle souvent solide un argument valide dont les prémisses sont vraies ou bien établies. Dans la vie réelle, la difficulté porte souvent sur la justification des prémisses : données, définitions, témoignages, hypothèses. La logique ne dispense donc pas de l’enquête."
      ],
      [
        "5. Tester un argument",
        "Pour tester la validité, imagine un monde où toutes les prémisses sont vraies. Peux-tu encore rendre la conclusion fausse sans contradiction ? Si oui, l’argument n’est pas valide. Ce test force à examiner la structure plutôt que ton accord personnel."
      ],
      [
        "6. Utilité pratique",
        "Dans un débat, sépare les critiques : « ta prémisse est fausse », « ta prémisse est insuffisamment justifiée » et « même si je l’accorde, ta conclusion ne suit pas ». Cette précision rend la discussion beaucoup plus productive."
      ]
    ],
    "quiz": [
      [
        "validité",
        "Qu’est-ce que la validité d’un argument ?",
        "L’impossibilité d’avoir des prémisses vraies et une conclusion fausse dans cette structure.",
        [
          "Le fait que la conclusion nous plaise.",
          "Le fait que toutes les phrases soient longues.",
          "Le fait que les prémisses soient forcément vraies."
        ],
        "La validité concerne le lien logique."
      ],
      [
        "false premise",
        "Un argument valide peut-il avoir une prémisse fausse ?",
        "Oui.",
        [
          "Non, jamais.",
          "Seulement en mathématiques.",
          "Seulement s’il n’a pas de conclusion."
        ],
        "Validité et vérité sont distinctes."
      ],
      [
        "true conclusion",
        "Une conclusion vraie suffit-elle à rendre l’argument bon ?",
        "Non, elle peut être vraie sans découler des prémisses.",
        [
          "Oui, toujours.",
          "Oui si elle est populaire.",
          "Oui si elle est courte."
        ],
        "Il faut examiner le passage logique."
      ],
      [
        "solid",
        "Un argument solide combine…",
        "Validité et prémisses bien établies.",
        [
          "Une conclusion surprenante et un ton assuré.",
          "Deux opinions identiques.",
          "Une longue citation et une question."
        ],
        "La structure et le contenu comptent."
      ],
      [
        "critique",
        "Quelle critique est la plus précise ?",
        "Même si j’accorde tes prémisses, la conclusion ne suit pas.",
        [
          "C’est faux parce que je n’aime pas.",
          "Tout le monde sait que non.",
          "Tu as tort."
        ],
        "Elle cible la structure logique."
      ]
    ]
  },
  {
    "id": "philo-distinction-necessary-sufficient",
    "world": "philo-distinction",
    "title": "Nécessaire ou suffisant ? La distinction qui démonte beaucoup de raisonnements",
    "period": "Méthode",
    "location": "Raisonnement",
    "emoji": "🔐",
    "xp": 75,
    "hook": "Confondre condition nécessaire et condition suffisante produit des erreurs partout : médecine, politique, causalité, règles et débat quotidien.",
    "express": [
      "Une condition nécessaire doit être présente pour que quelque chose soit possible. L’oxygène est nécessaire à une combustion ordinaire, mais sa présence seule ne suffit pas à déclencher un feu.",
      "Une condition suffisante garantit le résultat dans le cadre défini. Être un carré suffit pour être un rectangle si l’on utilise les définitions géométriques usuelles, mais être rectangle ne suffit pas pour être carré.",
      "Beaucoup d’arguments glissent de “X est nécessaire à Y” vers “X suffit à produire Y”. C’est une erreur logique : plusieurs conditions peuvent être nécessaires en même temps.",
      "Poser la question “nécessaire, suffisant, les deux ou aucun ?” clarifie immédiatement les débats sur les critères, les causes et les définitions."
    ],
    "sections": [
      [
        "1. Condition nécessaire",
        "Dire que X est nécessaire à Y signifie : sans X, pas de Y. Cela n’affirme pas que X produit Y à lui seul. Avoir un billet est souvent nécessaire pour entrer à un concert, mais un billet annulé ou une salle fermée peuvent encore empêcher l’entrée."
      ],
      [
        "2. Condition suffisante",
        "Dire que X est suffisant pour Y signifie : si X est présent dans les conditions définies, Y suit. Une condition suffisante peut ne pas être nécessaire si plusieurs chemins différents produisent le même résultat."
      ],
      [
        "3. Les deux",
        "Certaines définitions donnent une condition à la fois nécessaire et suffisante. Pour un entier, être pair est équivalent à être divisible par 2. Dans les situations empiriques, les équivalences parfaites sont souvent plus rares que dans les définitions formelles."
      ],
      [
        "4. Erreur classique",
        "“Il faut de la motivation pour progresser ; donc la motivation suffit pour progresser.” Le passage est invalide. Le temps, la méthode, les ressources ou l’entraînement peuvent aussi être nécessaires. Le mot « il faut » signale souvent une nécessité, pas une suffisance."
      ],
      [
        "5. Causes complexes",
        "Dans les sciences et la vie sociale, un facteur peut augmenter une probabilité sans être ni strictement nécessaire ni suffisant. La distinction reste utile, mais il faut parfois ajouter les catégories de facteur contributif, risque ou condition facilitante."
      ],
      [
        "6. Question réflexe",
        "Quand quelqu’un propose un critère, demande : peut-on avoir le résultat sans ce critère ? peut-on avoir ce critère sans le résultat ? Les deux contre-exemples possibles permettent de tester nécessité et suffisance séparément."
      ]
    ],
    "quiz": [
      [
        "necessary",
        "Si X est nécessaire à Y, alors…",
        "Sans X, Y ne peut pas avoir lieu.",
        [
          "X garantit toujours Y.",
          "Y garantit toujours X.",
          "X et Y sont synonymes."
        ],
        "La nécessité porte sur l’absence de X."
      ],
      [
        "sufficient",
        "Si X est suffisant pour Y, alors…",
        "X garantit Y dans le cadre défini.",
        [
          "Y est impossible sans X dans tous les cas.",
          "X est forcément la seule cause.",
          "X et Y ont le même nom."
        ],
        "La suffisance concerne ce que X assure."
      ],
      [
        "oxygen",
        "Pourquoi l’oxygène n’est-il pas suffisant à lui seul pour un feu ordinaire ?",
        "Parce que d’autres conditions comme un combustible et une énergie d’activation sont requises.",
        [
          "Parce que l’oxygène empêche toujours le feu.",
          "Parce qu’il n’existe pas dans l’air.",
          "Parce que feu et oxygène sont synonymes."
        ],
        "Plusieurs conditions peuvent être nécessaires."
      ],
      [
        "error",
        "Quelle erreur contient “X est nécessaire, donc X suffit” ?",
        "Une confusion entre nécessité et suffisance.",
        [
          "Une contradiction grammaticale.",
          "Une définition circulaire obligatoire.",
          "Aucune erreur possible."
        ],
        "Les deux relations sont différentes."
      ],
      [
        "test",
        "Comment tester si X est nécessaire à Y ?",
        "Chercher un cas où Y existe sans X.",
        [
          "Chercher un cas où X existe sans Y uniquement.",
          "Compter les lettres de X.",
          "Demander si X est populaire."
        ],
        "Un seul contre-exemple réfute la nécessité."
      ]
    ]
  },
  {
    "id": "philo-socrates-definition",
    "world": "philo-socrates",
    "title": "Socrate : pourquoi une liste d’exemples ne suffit pas à définir",
    "period": "Antiquité",
    "location": "Athènes",
    "emoji": "🏺",
    "xp": 75,
    "hook": "Dire “le courage, c’est un soldat qui tient sa position” donne un exemple. Socrate demanderait encore : qu’est-ce qui rend cet acte courageux, et retrouve-t-on ce trait dans les autres cas ?",
    "express": [
      "Dans les dialogues socratiques, l’interlocuteur répond souvent à une question générale par un exemple particulier. Socrate cherche au contraire ce qui est commun à tous les cas que nous appelons courageux, justes ou pieux.",
      "Une bonne définition doit être assez large pour inclure les bons exemples et assez précise pour exclure les mauvais. Elle peut donc être testée par des contre-exemples.",
      "Le questionnement socratique n’est pas simplement une manière de piéger. Il rend visibles les contradictions entre nos réponses et nous oblige à préciser nos concepts.",
      "Le résultat peut rester aporétique : on découvre que nos certitudes initiales étaient fragiles sans obtenir immédiatement une définition parfaite. Cette ignorance reconnue est déjà un progrès intellectuel."
    ],
    "sections": [
      [
        "1. Exemple ou définition",
        "Un exemple montre qu’un cas appartient à une catégorie ; une définition cherche le critère qui explique l’appartenance. “Rendre un objet trouvé” peut être un acte juste, mais cela ne définit pas encore la justice. Il faut savoir pourquoi ce geste compte comme juste et quand il pourrait ne pas l’être."
      ],
      [
        "2. Chercher le commun",
        "La question socratique vise souvent une forme commune : qu’est-ce qui fait que plusieurs actes différents reçoivent le même nom ? Cette recherche oblige à passer du récit concret au concept. Elle n’implique pas que la réponse soit facile ou unique."
      ],
      [
        "3. Tester par contre-exemple",
        "Si quelqu’un définit le courage comme « ne jamais reculer », un contre-exemple surgit : reculer tactiquement pour protéger son groupe peut être courageux, tandis que rester par ignorance du danger ne l’est pas forcément. Le contre-exemple affine la définition."
      ],
      [
        "4. L’elenchos",
        "Le questionnement socratique confronte les affirmations d’un interlocuteur. Si deux engagements sont incompatibles, il faut réviser au moins l’un d’eux. Cette méthode ne fournit pas automatiquement une doctrine ; elle met à l’épreuve la cohérence."
      ],
      [
        "5. L’aporie",
        "Certains dialogues se terminent sans solution définitive. L’aporie n’est pas un simple échec : l’interlocuteur sait désormais que sa première réponse était insuffisante. Le terrain est préparé pour une recherche plus rigoureuse."
      ],
      [
        "6. Usage contemporain",
        "Face à un concept vague — liberté, mérite, naturel, intelligence — demande des critères et cherche des cas limites. La méthode socratique transforme un mot familier en problème précis. Elle ralentit le débat, mais améliore la qualité des désaccords."
      ]
    ],
    "quiz": [
      [
        "example",
        "Pourquoi un exemple ne suffit-il pas à définir le courage ?",
        "Parce qu’il montre un cas sans donner le critère commun à tous les cas.",
        [
          "Parce qu’un exemple est toujours faux.",
          "Parce que le courage n’a aucun cas concret.",
          "Parce qu’une définition doit contenir dix exemples."
        ],
        "Définir demande un principe général."
      ],
      [
        "counterexample",
        "À quoi sert un contre-exemple ?",
        "À montrer qu’une définition inclut ou exclut mal certains cas.",
        [
          "À prouver que tous les concepts sont inutiles.",
          "À remplacer toute argumentation.",
          "À confirmer automatiquement la définition."
        ],
        "Il teste les limites du critère."
      ],
      [
        "elenchos",
        "Que fait l’elenchos socratique ?",
        "Il met à l’épreuve la cohérence des affirmations.",
        [
          "Il impose une réponse sans question.",
          "Il mesure la mémoire.",
          "Il récite un texte."
        ],
        "Le dialogue révèle les contradictions."
      ],
      [
        "aporia",
        "Qu’est-ce qu’une aporie ?",
        "Une situation où la recherche reconnaît une difficulté sans solution définitive immédiate.",
        [
          "Une preuve mathématique achevée.",
          "Une injure antique.",
          "Une règle politique."
        ],
        "L’absence de solution peut être instructive."
      ],
      [
        "method",
        "Quel réflexe est socratique face au mot “liberté” ?",
        "Demander quel critère permet de reconnaître les cas de liberté.",
        [
          "Supposer que tout le monde entend exactement la même chose.",
          "Chercher seulement l’étymologie.",
          "Compter les opinions majoritaires."
        ],
        "La méthode clarifie les concepts."
      ]
    ]
  },
  {
    "id": "philo-stoic-impressions",
    "world": "philo-stoicism",
    "title": "Stoïcisme : impression, jugement et assentiment",
    "period": "Antiquité",
    "location": "Monde gréco-romain",
    "emoji": "🪨",
    "xp": 75,
    "hook": "Le stoïcisme ne dit pas que l’on choisit la première émotion qui nous traverse. Il distingue l’impression qui surgit et l’assentiment que nous donnons ensuite à ce qu’elle affirme.",
    "express": [
      "Une impression peut apparaître sans décision : un bruit nous fait sursauter, une remarque nous blesse, une perspective nous inquiète. Les stoïciens ne prétendent pas supprimer cette première réaction par volonté magique.",
      "Le travail porte sur le jugement ajouté : “c’est insupportable”, “cela prouve que je suis humilié”, “je dois absolument contrôler ce résultat”. Nous pouvons examiner ces affirmations avant de leur donner notre assentiment.",
      "Cette distinction rend la doctrine plus subtile que “contrôle tes émotions”. Le but est de travailler sur les évaluations et les réponses qui dépendent davantage de notre activité rationnelle.",
      "Dans la pratique : nommer l’impression, séparer le fait de l’interprétation, puis choisir l’action compatible avec ses valeurs. La maîtrise porte sur la réponse, pas sur l’existence du monde extérieur."
    ],
    "sections": [
      [
        "1. L’impression",
        "Les stoïciens utilisent l’idée de représentation ou impression pour ce qui se présente à l’esprit. Elle peut être vive et involontaire. Le premier mouvement corporel ou émotionnel n’est donc pas toujours assimilé à un jugement pleinement choisi."
      ],
      [
        "2. L’assentiment",
        "L’assentiment est l’acceptation d’une impression comme vraie ou comme guide d’action. Entre “on critique mon travail” et “cette critique détruit ma valeur”, un jugement supplémentaire s’est introduit. C’est ce jugement que la réflexion peut interroger."
      ],
      [
        "3. Fait et évaluation",
        "Une pratique stoïcienne consiste à décrire l’événement de manière plus nue avant de l’évaluer. “Cette personne a prononcé ces mots” n’est pas encore “elle m’a humilié de façon intolérable”. La reformulation crée un espace pour examiner l’interprétation."
      ],
      [
        "4. Pas une suppression des émotions",
        "Réduire le stoïcisme à l’insensibilité est trompeur. Les textes distinguent des réactions initiales, des passions nourries par certains jugements et des attitudes rationnelles. L’objectif n’est pas de devenir une pierre, mais de ne pas être gouverné par des évaluations irréfléchies."
      ],
      [
        "5. Ce qui dépend de nous",
        "La distinction rejoint la question du contrôle : je ne commande pas entièrement l’événement, l’opinion d’autrui ni ma première réaction ; je peux davantage travailler sur mon jugement, mon intention et ma conduite. Ce “davantage” ne signifie pas un contrôle psychologique absolu."
      ],
      [
        "6. Exercice",
        "Quand une situation te heurte, écris trois lignes : fait observable, interprétation spontanée, action possible. Puis demande quelle partie dépend réellement de toi. L’exercice ne garantit pas le calme, mais il clarifie le lieu du choix."
      ]
    ],
    "quiz": [
      [
        "impression",
        "Une impression stoïcienne peut-elle surgir sans décision ?",
        "Oui.",
        [
          "Non, toute émotion est choisie.",
          "Seulement pendant le sommeil.",
          "Seulement chez les philosophes."
        ],
        "La première apparition peut être involontaire."
      ],
      [
        "assent",
        "Qu’est-ce que l’assentiment ?",
        "Le fait d’accepter une impression ou un jugement comme vrai et directeur.",
        [
          "Un réflexe musculaire.",
          "Une loi politique.",
          "Une absence totale de pensée."
        ],
        "Il concerne notre adhésion."
      ],
      [
        "fact",
        "Pourquoi séparer fait et évaluation ?",
        "Pour voir quel jugement a été ajouté à l’événement.",
        [
          "Pour nier que l’événement existe.",
          "Pour supprimer toute émotion immédiatement.",
          "Pour éviter toute action."
        ],
        "La distinction rend l’interprétation visible."
      ],
      [
        "emotion",
        "Le stoïcisme vise-t-il simplement à ne rien ressentir ?",
        "Non.",
        [
          "Oui, c’est son unique but.",
          "Oui, surtout physiquement.",
          "Non, parce qu’il refuse toute raison."
        ],
        "La doctrine porte surtout sur jugements et conduite."
      ],
      [
        "practice",
        "Quel trio correspond à l’exercice proposé ?",
        "Fait observable, interprétation, action possible.",
        [
          "Passé, futur, chance.",
          "Opinion, majorité, victoire.",
          "Silence, fuite, oubli."
        ],
        "Il sépare événement, jugement et réponse."
      ]
    ]
  },
  {
    "id": "philo-descartes-cogito",
    "world": "philo-descartes",
    "title": "Descartes : le cogito, certitude minimale et non slogan magique",
    "period": "XVIIe siècle",
    "location": "Europe",
    "emoji": "🔎",
    "xp": 75,
    "hook": "“Je pense, donc je suis” n’est pas présenté comme une preuve ordinaire déduite d’une théorie préalable. C’est la découverte qu’au moment même où je doute, mon existence comme être pensant ne peut être niée.",
    "express": [
      "Le doute méthodique retire provisoirement sa confiance aux croyances qui peuvent être mises en question : perceptions, souvenirs, raisonnements susceptibles d’erreur. Il cherche un point qui résiste à cette opération.",
      "Si je doute, je pense au moins au sens large : je questionne, j’affirme, je nie ou j’imagine. Or il est impossible que cette activité ait lieu sans que j’existe d’une certaine manière au moment où elle se produit.",
      "Le cogito garantit d’abord une certitude minimale : l’existence du sujet pensant pendant l’acte de pensée. Il ne prouve pas immédiatement tout ce que je crois sur mon corps, le monde extérieur ou mon identité personnelle complète.",
      "La force philosophique vient donc de sa portée précise. Une certitude très étroite sert de point de départ ; le reste de la philosophie cartésienne doit encore reconstruire davantage."
    ],
    "sections": [
      [
        "1. Le projet du doute",
        "Descartes ne cherche pas à vivre en sceptique permanent. Le doute est méthodique : il sert à tester les fondations du savoir. Les croyances douteuses sont suspendues afin de voir s’il existe une proposition que l’opération même de douter confirme."
      ],
      [
        "2. Douter est déjà penser",
        "Même si un trompeur extrêmement puissant me trompait sur tout, il faudrait encore qu’il y ait quelque chose qui soit trompé au moment où la pensée se produit. L’acte de douter révèle donc une présence du sujet à sa propre activité."
      ],
      [
        "3. Donc ?",
        "Le “donc” ne doit pas forcément être lu comme un syllogisme scolaire nécessitant une prémisse universelle du type “tout ce qui pense existe”. La certitude est saisie dans l’acte : tenter de nier que j’existe pendant que je pense réaffirme la pensée."
      ],
      [
        "4. Ce que le cogito établit",
        "La conclusion est modeste : je suis, j’existe, au moins chaque fois que je pense. L’expression “chose pensante” rassemble plusieurs activités mentales. Cette certitude ne décrit pas encore complètement la nature du monde ni même celle du corps."
      ],
      [
        "5. Ce qu’il n’établit pas immédiatement",
        "Le cogito ne suffit pas seul à garantir que toutes mes perceptions sont correctes, que le monde extérieur existe exactement comme je le crois ou que chaque souvenir est fiable. Confondre le point de départ avec toute la reconstruction cartésienne grossit abusivement l’argument."
      ],
      [
        "6. Leçon méthodologique",
        "La précision de portée est essentielle : quelle proposition est réellement établie et quelles propositions supplémentaires nécessitent encore des arguments ? Cette question vaut pour toute philosophie. Une preuve locale ne doit pas être transformée en certitude universelle."
      ]
    ],
    "quiz": [
      [
        "doubt",
        "Pourquoi Descartes doute-t-il méthodiquement ?",
        "Pour chercher une croyance qui résiste au doute et servir de fondation.",
        [
          "Pour ne plus jamais croire quoi que ce soit.",
          "Pour prouver que le langage est inutile.",
          "Pour éviter toute science."
        ],
        "Le doute est un outil méthodique."
      ],
      [
        "cogito",
        "Que découvre le cogito ?",
        "Qu’au moment où je pense ou doute, mon existence comme sujet pensant ne peut être niée.",
        [
          "Que toutes mes perceptions sont vraies.",
          "Que mon corps est éternel.",
          "Que personne ne peut me tromper."
        ],
        "La certitude porte sur l’acte de pensée."
      ],
      [
        "scope",
        "Le cogito prouve-t-il immédiatement l’existence du monde extérieur ?",
        "Non.",
        [
          "Oui, entièrement.",
          "Oui, mais seulement la nuit.",
          "Oui, par définition du mot monde."
        ],
        "Sa portée initiale est limitée."
      ],
      [
        "deny",
        "Pourquoi nier “j’existe pendant que je pense” est-il difficile ?",
        "Parce que l’acte même de nier est encore une pensée qui suppose ce point d’existence.",
        [
          "Parce que la phrase est très ancienne.",
          "Parce que nier est grammaticalement impossible.",
          "Parce que tous les philosophes sont d’accord."
        ],
        "La tentative de négation réactive la certitude."
      ],
      [
        "method",
        "Quelle leçon générale tirer ?",
        "Distinguer exactement ce qu’un argument établit de ce qu’il reste à démontrer.",
        [
          "Étendre toute conclusion au maximum.",
          "Éviter les arguments modestes.",
          "Considérer toute intuition comme certaine."
        ],
        "La portée d’une preuve doit être contrôlée."
      ]
    ]
  },
  {
    "id": "philo-hume-induction",
    "world": "philo-hume",
    "title": "Hume : pourquoi le passé ne démontre pas logiquement le futur",
    "period": "XVIIIe siècle",
    "location": "Écosse",
    "emoji": "🎱",
    "xp": 75,
    "hook": "Nous attendons que le soleil se lève demain et que le feu chauffe parce que l’expérience a été régulière. Hume demande : quelle justification non circulaire avons-nous pour projeter cette régularité dans l’avenir ?",
    "express": [
      "Un raisonnement inductif passe de cas observés à des cas non observés : ce médicament a souvent produit cet effet ; il le produira probablement encore. Ce raisonnement est indispensable, mais il n’est pas une démonstration logique au sens strict.",
      "On pourrait justifier l’induction en disant que la nature a toujours été régulière. Mais cette justification utilise déjà le passé pour prévoir que cette régularité continuera : elle s’appuie donc elle-même sur l’induction.",
      "Hume ne conclut pas que nous devons cesser de prévoir. Il explique plutôt que l’habitude ou la coutume fonde psychologiquement notre attente, davantage qu’une preuve rationnelle démonstrative.",
      "Le problème de l’induction reste central en philosophie des sciences : comment justifier, calibrer ou encadrer les inférences qui dépassent les observations disponibles ?"
    ],
    "sections": [
      [
        "1. Déduction et induction",
        "Une déduction valide transmet la vérité des prémisses à la conclusion. L’induction étend ce que nous savons : elle généralise ou prédit. Cette extension la rend féconde, mais elle ouvre la possibilité que les prochains cas diffèrent des cas observés."
      ],
      [
        "2. Exemple simple",
        "Avoir vu mille cygnes blancs rend plausible l’hypothèse que les prochains seront blancs, mais ne la rend pas nécessaire. Un seul cygne noir suffit à montrer que la généralisation universelle était trop forte. L’observation passée ne contient pas logiquement tous les cas futurs."
      ],
      [
        "3. Principe de régularité",
        "Pour passer du passé au futur, on suppose souvent que des causes similaires continueront à produire des effets similaires. Mais comment prouver ce principe ? Une preuve par expérience invoque encore le succès passé de cette manière de raisonner."
      ],
      [
        "4. Cercle",
        "Dire “l’induction a bien marché jusqu’ici, donc elle marchera demain” est précisément un raisonnement inductif. Il ne fournit donc pas une justification indépendante de l’induction. C’est le cœur du problème humien."
      ],
      [
        "5. Habitude",
        "Hume décrit la coutume comme un mécanisme naturel : après des conjonctions répétées, l’esprit attend le résultat habituel. Cette explication n’abolit pas la science. Elle distingue l’origine de notre confiance d’une démonstration logique impossible à obtenir de la même manière."
      ],
      [
        "6. Après Hume",
        "Les philosophies des sciences ont proposé diverses réponses : probabilités, falsifiabilité, inférence à la meilleure explication, approches bayésiennes. Le problème ne disparaît pas ; il oblige à être plus précis sur ce que les données autorisent à croire."
      ]
    ],
    "quiz": [
      [
        "induction",
        "Qu’est-ce qu’un raisonnement inductif ?",
        "Une inférence qui étend des observations vers des cas non observés.",
        [
          "Une définition purement grammaticale.",
          "Une contradiction.",
          "Une déduction dont la conclusion est déjà contenue nécessairement."
        ],
        "L’induction généralise ou prédit."
      ],
      [
        "necessity",
        "Mille observations concordantes rendent-elles la prochaine observation logiquement nécessaire ?",
        "Non.",
        [
          "Oui, toujours.",
          "Oui après exactement mille cas.",
          "Oui si l’observateur est expert."
        ],
        "Le futur peut différer sans contradiction logique."
      ],
      [
        "circular",
        "Pourquoi “l’induction a marché dans le passé” ne justifie-t-il pas l’induction sans cercle ?",
        "Parce que projeter ce succès vers l’avenir utilise déjà l’induction.",
        [
          "Parce que le passé n’existe pas.",
          "Parce que la science refuse les expériences.",
          "Parce que toute habitude est fausse."
        ],
        "La justification présuppose ce qu’elle veut justifier."
      ],
      [
        "habit",
        "Quel rôle Hume attribue-t-il à l’habitude ?",
        "Elle explique notre attente naturelle après des régularités répétées.",
        [
          "Elle démontre logiquement le futur.",
          "Elle rend toute science impossible.",
          "Elle supprime les observations."
        ],
        "La coutume explique la croyance."
      ],
      [
        "science",
        "Pourquoi le problème reste-t-il important ?",
        "Parce que la science doit souvent inférer au-delà des données observées.",
        [
          "Parce que la science n’utilise jamais de données.",
          "Parce que les lois ne concernent que le passé.",
          "Parce que toute prédiction est interdite."
        ],
        "Il faut calibrer la portée des inférences."
      ]
    ]
  },
  {
    "id": "philo-ethics-frameworks",
    "world": "philo-ethics",
    "title": "Conséquences, devoirs, vertus : trois questions morales différentes",
    "period": "Éthique",
    "location": "Raisonnement moral",
    "emoji": "🧭",
    "xp": 75,
    "hook": "Les désaccords moraux deviennent plus clairs quand on voit que les personnes n’évaluent pas toujours la même chose : résultats, règles ou caractère.",
    "express": [
      "Une approche conséquentialiste demande principalement quels effets les actions produisent et comment comparer ces effets. L’utilitarisme est une famille influente de cette approche, mais tous les conséquentialismes ne se réduisent pas à une formule unique.",
      "Une approche déontologique insiste sur certaines obligations, interdictions ou droits qui ne dépendent pas seulement du bilan final. Chez Kant, la possibilité d’universaliser la maxime et le respect des personnes sont centraux.",
      "L’éthique des vertus demande aussi quel type de personne et de dispositions nous cultivons : courage, justice, prudence, générosité. Elle ne réduit pas l’évaluation à un calcul ponctuel ou à une règle isolée.",
      "Ces cadres ne donnent pas toujours des réponses opposées. Ils posent surtout des questions différentes, ce qui aide à comprendre où se situe réellement un désaccord moral."
    ],
    "sections": [
      [
        "1. Les conséquences",
        "Évaluer les conséquences consiste à regarder ce qui arrive aux personnes concernées : bénéfices, souffrances, risques, distribution des effets. La difficulté est de choisir les conséquences pertinentes, leur horizon temporel et la manière de comparer des biens parfois incompatibles."
      ],
      [
        "2. Les devoirs",
        "Une morale déontologique peut soutenir que certaines façons de traiter autrui sont interdites même si elles promettent de bons résultats. Les droits, les promesses, le consentement ou l’interdiction d’utiliser une personne uniquement comme moyen deviennent alors des contraintes centrales."
      ],
      [
        "3. Les vertus",
        "L’éthique des vertus déplace l’attention vers les dispositions stables et le jugement pratique. Une personne courageuse ne suit pas mécaniquement une règle “prendre toujours un risque” : elle apprend à discerner quand le risque est justifié et pour quelle fin."
      ],
      [
        "4. Un même cas, trois angles",
        "Face à un mensonge protecteur, on peut demander : quelles conséquences aura-t-il ? viole-t-il une obligation de vérité ou respecte-t-il un devoir plus important ? que ferait une personne honnête et prudente dans cette relation ? Les questions ne sont pas identiques."
      ],
      [
        "5. Éviter les caricatures",
        "Le conséquentialisme n’est pas simplement “la fin justifie tous les moyens”, la déontologie n’est pas “appliquer des règles sans réfléchir” et la vertu n’est pas “être gentil”. Chaque tradition contient des débats internes et des formulations sophistiquées."
      ],
      [
        "6. Cartographier un désaccord",
        "Dans une discussion morale, repère d’abord le type de raison invoqué. Deux personnes peuvent partager les mêmes faits mais hiérarchiser différemment conséquences, droits et vertus. Nommer ce niveau du désaccord permet d’aller au fond plutôt que de répéter les conclusions."
      ]
    ],
    "quiz": [
      [
        "consequence",
        "Quelle question est typiquement conséquentialiste ?",
        "Quels effets cette action aura-t-elle sur les personnes concernées ?",
        [
          "Quelle est l’étymologie du mot action ?",
          "Combien de lettres contient la règle ?",
          "L’action a-t-elle été faite un mardi ?"
        ],
        "Le cadre se concentre sur les résultats."
      ],
      [
        "deontology",
        "Une approche déontologique insiste notamment sur…",
        "Des devoirs, droits ou contraintes qui ne se réduisent pas au bilan final.",
        [
          "Le hasard uniquement.",
          "L’esthétique de l’action.",
          "La popularité de la décision."
        ],
        "Elle donne un poids propre à certaines obligations."
      ],
      [
        "virtue",
        "L’éthique des vertus demande notamment…",
        "Quelles dispositions et quel jugement pratique une bonne vie exige.",
        [
          "Quelle action est la plus rapide.",
          "Quel résultat est le plus spectaculaire.",
          "Quelle règle a le plus de mots."
        ],
        "Elle évalue aussi le caractère."
      ],
      [
        "case",
        "Pourquoi appliquer trois cadres au même cas ?",
        "Pour révéler des dimensions morales différentes du problème.",
        [
          "Pour obtenir forcément trois réponses incompatibles.",
          "Pour éviter de décider.",
          "Pour remplacer les faits."
        ],
        "Les cadres structurent des questions distinctes."
      ],
      [
        "caricature",
        "Pourquoi éviter “conséquentialisme = la fin justifie tous les moyens” ?",
        "Parce que les théories conséquentialistes sont plus précises sur les effets, les personnes et les règles de décision.",
        [
          "Parce que les conséquences n’existent pas.",
          "Parce que tout conséquentialisme refuse les résultats.",
          "Parce que c’est une formule mathématique."
        ],
        "Une tradition ne se résume pas à un slogan."
      ]
    ]
  },
  {
    "id": "philo-social-contract-comparison",
    "world": "philo-social-contract",
    "title": "Hobbes, Locke, Rousseau : trois problèmes derrière le “contrat social”",
    "period": "XVIIe → XVIIIe siècle",
    "location": "Philosophie politique",
    "emoji": "🤝",
    "xp": 75,
    "hook": "Parler du contrat social comme d’une théorie unique masque les différences. Hobbes, Locke et Rousseau n’ont ni le même diagnostic du conflit, ni la même conception de l’autorité légitime.",
    "express": [
      "Chez Hobbes, la priorité est de sortir d’une situation où l’insécurité et la défiance rendent la vie commune instable. Une autorité souveraine forte est justifiée par la recherche de paix et de protection.",
      "Chez Locke, le pouvoir politique doit protéger des droits et reste limité. Le consentement et la possibilité de résister à un gouvernement qui trahit sa mission prennent une place importante.",
      "Chez Rousseau, le problème est aussi de comprendre comment obéir à une loi commune sans perdre la liberté. La volonté générale vise l’intérêt commun et ne se réduit pas à la somme instantanée des préférences individuelles.",
      "Ces auteurs utilisent des constructions théoriques différentes. Les comparer par problème — sécurité, droits, liberté politique — est plus utile que mémoriser trois fiches séparées."
    ],
    "sections": [
      [
        "1. L’état de nature comme outil",
        "L’état de nature n’est pas simplement un récit historique certain sur les premiers humains. Il sert à imaginer ce que seraient les relations sans autorité politique commune et à faire apparaître ce que l’institution politique doit résoudre."
      ],
      [
        "2. Hobbes",
        "Hobbes insiste sur la vulnérabilité, la concurrence et la défiance qui peuvent rendre l’absence de pouvoir commun dangereuse. Le pacte vise une puissance capable d’assurer la paix. Son problème central est l’ordre dans un contexte d’insécurité."
      ],
      [
        "3. Locke",
        "Locke donne une place plus forte aux droits prépolitiques et aux limites du gouvernement. L’autorité est instituée pour mieux protéger la vie, la liberté et les biens. Un pouvoir qui détruit sa mission peut perdre sa légitimité."
      ],
      [
        "4. Rousseau",
        "Rousseau cherche une forme d’association où chacun participe à une volonté générale orientée vers le commun. La liberté politique ne consiste donc pas seulement à être laissé tranquille ; elle implique une relation à la loi que les citoyens se donnent collectivement."
      ],
      [
        "5. Trois légitimités",
        "La comparaison révèle trois accents : protection par l’autorité, protection des droits contre l’autorité, et autonomie collective dans l’autorité. Les textes sont plus complexes que ces résumés, mais cette carte permet de ne pas les confondre."
      ],
      [
        "6. Question contemporaine",
        "Face à une mesure politique, on peut poser trois questions : améliore-t-elle réellement la sécurité ? respecte-t-elle les droits et les limites du pouvoir ? peut-elle être justifiée comme règle commune à des citoyens libres et égaux ? La comparaison devient alors un outil d’analyse."
      ]
    ],
    "quiz": [
      [
        "hobbes",
        "Quel problème est particulièrement central chez Hobbes ?",
        "L’insécurité et la nécessité d’un pouvoir commun capable d’assurer la paix.",
        [
          "La suppression de toute règle.",
          "La beauté artistique.",
          "La traduction des langues."
        ],
        "Son contrat répond au risque de conflit."
      ],
      [
        "locke",
        "Quel accent caractérise Locke ?",
        "La protection des droits et les limites du gouvernement.",
        [
          "L’autorité sans aucune limite possible.",
          "Le refus de toute propriété.",
          "La disparition du consentement."
        ],
        "Le pouvoir est conditionné par sa mission."
      ],
      [
        "rousseau",
        "Chez Rousseau, la volonté générale vise…",
        "L’intérêt commun d’un corps de citoyens.",
        [
          "La somme automatique de tous les désirs privés.",
          "La volonté secrète du souverain individuel.",
          "L’absence complète de loi."
        ],
        "Elle ne se réduit pas à l’addition des préférences."
      ],
      [
        "comparison",
        "Pourquoi comparer ces auteurs par problème ?",
        "Pour voir qu’ils justifient l’ordre politique à partir d’enjeux différents.",
        [
          "Parce qu’ils défendent exactement la même théorie.",
          "Pour éviter de lire leurs arguments.",
          "Parce qu’ils ont vécu à la même date."
        ],
        "Sécurité, droits et liberté structurent différemment leurs réponses."
      ],
      [
        "tool",
        "L’état de nature sert notamment à…",
        "Tester ce que l’autorité politique est censée résoudre ou protéger.",
        [
          "Décrire avec certitude un événement archéologique.",
          "Fixer une date de naissance de l’État.",
          "Prouver qu’aucune société n’a existé."
        ],
        "C’est un dispositif théorique."
      ]
    ]
  }
];
  const makePack = (d) => ({
    title: d.title,
    hook: d.hook,
    keyFacts: d.express.slice(0, 4),
    express: d.express,
    complete: [
      ...d.sections.map(([title, text]) => ({ title, text })),
      {
        title: "7. Mise à l’épreuve",
        text: "Pour vérifier que tu maîtrises vraiment la distinction, construis un exemple personnel puis cherche volontairement un cas qui pourrait la faire échouer. Écris ensuite le raisonnement en trois lignes : la thèse, la raison principale et l’objection la plus forte que tu peux formuler. Réponds à cette objection sans changer discrètement le sens des termes. Si le concept vient d’un auteur, distingue ce que le cours affirme de la version simplifiée qu’on pourrait en tirer. L’objectif n’est pas de réciter une formule, mais de voir jusqu’où elle fonctionne, ce qu’elle exclut et quelles hypothèses supplémentaires elle exige."
      }
    ],
    deeper: [],
    takeaways: [
      { label: "Réflexe", text: d.express[0] },
      { label: "À retenir", text: d.express[d.express.length - 1] }
    ],
    quiz: d.quiz.map(([kind, q, a, choices, why]) => ({
      kind, q, a, choices, why,
      trap: "Choisir une réponse plausible qui ne respecte pas la distinction travaillée.",
      evidence: "Le cours complet donne le raisonnement et un exemple."
    })),
    editorialStatus: "published",
    contentRevision: "rc19-depth"
  });
  const addLesson = (worldId, lesson) => {
    if (!Array.isArray(data.lessons[worldId])) data.lessons[worldId] = [];
    if (!data.lessons[worldId].some(item => item?.id === lesson.id)) data.lessons[worldId].push(lesson);
  };
  const audit = {};
  DEFINITIONS.forEach((d, index) => {
    const lesson = { id: d.id, title: d.title, period: d.period, location: d.location, emoji: d.emoji, xp: d.xp || 75, order: 10 + index };
    const pack = makePack(d);
    addLesson(d.world, lesson);
    PUBLISHED_LESSON_IDS.add(d.id);
    READY_LESSON_PACKS[d.id] = pack;
    audit[d.id] = rawPublishedQuality(pack);
  });
  if (typeof invalidateCatalogCaches === "function") invalidateCatalogCaches(); else lessonIndexCache = null;
  const ok = Object.values(audit).every(item => item.pass);
  try {
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      ["philosophyDepth"]: { version: VERSION, lessons: DEFINITIONS.length, quality: audit, ok }
    };
  } catch {}
  if (!ok) try { console.warn("HistoDaily RC19 philosophy depth audit", audit); } catch {}
})();
