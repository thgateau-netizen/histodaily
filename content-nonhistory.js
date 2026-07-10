/* HistoDaily beta 178 — contenus hors Histoire + cohérence des parcours. */
(function histodailyBeta178NonHistory(){
  const VERSION = "1.0.0-beta.178";
  const LESSONS = {
  "art-avantgardes": [
    {
      "id": "art-dada-readymade",
      "title": "Dada et le ready-made : quand l’art attaque ses propres règles",
      "period": "1916 → années 1920",
      "location": "Zurich, Berlin, Paris, New York",
      "emoji": "🚽",
      "xp": 70,
      "order": 3
    }
  ],
  "art-contemporary-practices": [
    {
      "id": "art-street-art-public-space",
      "title": "Street art : qui a le droit d’écrire sur la ville ?",
      "period": "Années 1960 → aujourd’hui",
      "location": "Philadelphie, New York puis villes du monde",
      "emoji": "🧱",
      "xp": 70,
      "order": 1
    }
  ],
  "cinema-neorealism-newwave": [
    {
      "id": "cinema-italian-neorealism",
      "title": "Le néoréalisme italien : filmer les ruines et la vie ordinaire",
      "period": "1943 → début des années 1950",
      "location": "Italie",
      "emoji": "🚲",
      "xp": 70,
      "order": 1
    }
  ],
  "cinema-blockbuster": [
    {
      "id": "cinema-blockbuster-system",
      "title": "Le blockbuster : comment un film devient un événement mondial",
      "period": "1975 → aujourd’hui",
      "location": "Hollywood puis marché mondial",
      "emoji": "🦈",
      "xp": 70,
      "order": 1
    }
  ],
  "sci-atom-energy": [
    {
      "id": "sci-radioactivity-atom",
      "title": "Radioactivité : quand l’atome cesse d’être indivisible",
      "period": "1896 → milieu du XXe siècle",
      "location": "Europe et laboratoires internationaux",
      "emoji": "☢️",
      "xp": 70,
      "order": 1
    }
  ],
  "sci-computers-space": [
    {
      "id": "sci-computers-microprocessor",
      "title": "De la machine à calculer au microprocesseur : naissance de l’ordinateur",
      "period": "XVIIe siècle → années 1970",
      "location": "Europe et États-Unis",
      "emoji": "💻",
      "xp": 70,
      "order": 1
    }
  ],
  "eco-money-banks": [
    {
      "id": "eco-bank-money-creation",
      "title": "Comment les banques créent-elles de la monnaie ?",
      "period": "Économie contemporaine",
      "location": "Banques, entreprises, ménages et banque centrale",
      "emoji": "💳",
      "xp": 70,
      "order": 1
    }
  ],
  "eco-crises": [
    {
      "id": "eco-great-depression",
      "title": "1929 et la Grande Dépression : comment une crise devient mondiale",
      "period": "1929 → fin des années 1930",
      "location": "États-Unis, Europe et économie mondiale",
      "emoji": "📉",
      "xp": 70,
      "order": 1
    }
  ],
  "geo-cities": [
    {
      "id": "geo-metropolization",
      "title": "Métropolisation : pourquoi les grandes villes concentrent-elles les pouvoirs ?",
      "period": "XXe → XXIe siècle",
      "location": "Monde urbain",
      "emoji": "🏙️",
      "xp": 70,
      "order": 1
    }
  ],
  "geo-risks": [
    {
      "id": "geo-risk-vulnerability",
      "title": "Risques naturels : pourquoi un même aléa ne produit-il pas la même catastrophe ?",
      "period": "Monde contemporain",
      "location": "Territoires exposés aux séismes, cyclones, crues et incendies",
      "emoji": "🌋",
      "xp": 70,
      "order": 1
    }
  ],
  "music-baroque": [
    {
      "id": "music-baroque-opera",
      "title": "Naissance de l’opéra : quand la musique devient théâtre",
      "period": "Vers 1600 → XVIIIe siècle",
      "location": "Italie puis Europe",
      "emoji": "🎭",
      "xp": 70,
      "order": 1
    }
  ],
  "music-rock-pop": [
    {
      "id": "music-studio-instrument",
      "title": "Le studio devient un instrument : du disque capté au son fabriqué",
      "period": "Années 1950 → années 1970",
      "location": "États-Unis, Royaume-Uni et industrie mondiale",
      "emoji": "🎚️",
      "xp": 70,
      "order": 1
    }
  ]
};
  const PACKS = {
  "art-dada-readymade": {
    "hook": "En 1917, un urinoir renversé, signé « R. Mutt » et intitulé Fontaine, est présenté comme une œuvre. Le scandale oblige à demander qui décide qu’une chose devient de l’art.",
    "keyFacts": [
      "1916 : naissance de Dada au Cabaret Voltaire",
      "Dada répond à la guerre par l’absurde et la rupture",
      "Ready-made : objet manufacturé choisi et déplacé",
      "Duchamp transforme la sélection en geste artistique",
      "Collage, photomontage, performance et hasard deviennent des armes critiques"
    ],
    "express": [
      "Dada naît pendant la Première Guerre mondiale autour du Cabaret Voltaire à Zurich. Ses artistes considèrent que la raison, le patriotisme et les valeurs bourgeoises ont accompagné la catastrophe. Ils répondent par la poésie sonore, les costumes, le collage, le bruit et la destruction volontaire des habitudes culturelles.",
      "Le ready-made de Marcel Duchamp radicalise cette rupture. Une roue de bicyclette, un porte-bouteilles ou un urinoir deviennent des propositions artistiques parce qu’un choix, un titre, une signature, un déplacement et un lieu d’exposition modifient notre manière de les regarder.",
      "Dada ne signifie pas que tout se vaut. Il montre que l’art dépend aussi d’institutions, de conventions et d’un débat public. Son héritage traverse le surréalisme, le pop art, l’art conceptuel, la performance et l’appropriation."
    ],
    "complete": [
      {
        "title": "1. Une révolte née de la guerre",
        "text": "Dada apparaît en 1916 à Zurich, ville neutre où se retrouvent des exilés, des artistes et des écrivains. Au Cabaret Voltaire, Hugo Ball, Emmy Hennings, Tristan Tzara et Hans Arp organisent des soirées de chants, de poèmes sonores, de masques et de gestes déroutants. Le mouvement n’a pas un style unique : il partage surtout un refus. Pour ses membres, les discours sérieux sur la civilisation européenne ont peu de valeur après les massacres industriels de la guerre. L’absurde devient une arme critique, destinée à rendre visible la faillite des certitudes."
      },
      {
        "title": "2. Collage et photomontage",
        "text": "À Berlin, Hannah Höch, Raoul Hausmann, John Heartfield et George Grosz découpent journaux, photographies et publicités pour recomposer un monde fragmenté. Le photomontage retourne des images de presse contre les pouvoirs qui les utilisent. Le collage introduit aussi des matériaux ordinaires dans l’œuvre. Une coupure de journal garde sa typographie, sa date et son contexte. L’artiste ne fabrique plus nécessairement chaque élément : il choisit, assemble et reconfigure. Cette logique annonce une grande partie de la culture visuelle moderne, de l’affiche militante au montage numérique."
      },
      {
        "title": "3. Le ready-made déplace la question",
        "text": "Duchamp sélectionne Roue de bicyclette en 1913, Porte-bouteilles en 1914 puis Fontaine en 1917. La fabrication manuelle cesse d’être le centre de l’œuvre. Le choix de l’objet, son changement de position, son titre et sa présentation deviennent l’acte artistique. Fontaine est refusée par une exposition new-yorkaise qui prétendait pourtant accepter toute œuvre moyennant un droit d’inscription. L’affaire révèle que les institutions conservent des critères implicites. Le ready-made ne prouve pas que n’importe quoi vaut n’importe quoi ; il transforme l’exposition, la signature et le jugement en matériaux de l’œuvre."
      },
      {
        "title": "4. Un héritage contradictoire",
        "text": "Le surréalisme reprend le hasard et le détournement ; le pop art réutilise les images de consommation ; l’art conceptuel place l’idée au premier plan ; la performance transforme l’action en œuvre. Mais Dada entre aussi dans les musées et le marché qu’il attaquait. Cette récupération ne l’annule pas : elle montre qu’une critique peut être absorbée par les institutions. Pour comprendre un geste dada, il faut donc demander ce qu’il déplace, quel contexte il vise et pourquoi la provocation produit du sens à cet endroit précis."
      }
    ],
    "deeper": [
      {
        "title": "Dada n’est pas un style",
        "text": "Zurich, Berlin, Cologne, Paris et New York développent des pratiques différentes."
      },
      {
        "title": "Le contexte transforme l’objet",
        "text": "Un urinoir dans un magasin, une salle de bain ou une exposition ne suscite pas les mêmes attentes."
      },
      {
        "title": "La critique peut être récupérée",
        "text": "Les musées conservent aujourd’hui un mouvement qui contestait la culture officielle."
      }
    ],
    "takeaways": [
      {
        "label": "1916",
        "text": "Dada naît à Zurich au cœur de la guerre."
      },
      {
        "label": "Ready-made",
        "text": "Le choix et le déplacement deviennent un geste artistique."
      },
      {
        "label": "Méthodes",
        "text": "Collage, hasard et provocation contestent les règles."
      },
      {
        "label": "Héritage",
        "text": "Dada ouvre la voie à l’art conceptuel."
      }
    ],
    "quiz": [
      {
        "kind": "origine",
        "q": "Dans quel contexte Dada naît-il ?",
        "a": "Pendant la Première Guerre mondiale, dans un milieu révolté par les valeurs qui ont accompagné la catastrophe.",
        "choices": [
          "Pendant la Renaissance italienne.",
          "Après 1945 comme art officiel.",
          "Au XVIIIe siècle dans les salons royaux."
        ],
        "why": "La guerre et la crise de la civilisation européenne sont essentielles.",
        "trap": "Le réduire à un style décoratif.",
        "evidence": "Le cours présente Zurich en 1916."
      },
      {
        "kind": "notion",
        "q": "Qu’est-ce qu’un ready-made ?",
        "a": "Un objet manufacturé choisi, déplacé, titré ou signé pour devenir le centre d’une proposition artistique.",
        "choices": [
          "Une sculpture entièrement réalisée à la main.",
          "Une copie fidèle d’un objet en marbre.",
          "Une peinture produite automatiquement."
        ],
        "why": "Le geste porte sur la sélection et le contexte.",
        "trap": "Le confondre avec une imitation artisanale.",
        "evidence": "La section sur Duchamp."
      },
      {
        "kind": "institution",
        "q": "Que révèle le refus de Fontaine ?",
        "a": "Qu’une exposition se disant ouverte conserve des critères implicites sur ce qui peut être reconnu comme art.",
        "choices": [
          "Que les pseudonymes étaient interdits.",
          "Que Duchamp avait oublié de payer.",
          "Que les objets industriels étaient illégaux."
        ],
        "why": "L’affaire met à nu le pouvoir des institutions.",
        "trap": "Réduire l’épisode à l’administration.",
        "evidence": "La section sur Fontaine."
      },
      {
        "kind": "technique",
        "q": "Pourquoi le photomontage dada est-il important ?",
        "a": "Il réemploie des images de presse pour démonter et critiquer les discours publics.",
        "choices": [
          "Il rend seulement les photos plus réalistes.",
          "Il remplace toute critique par des paysages.",
          "Il corrige des défauts techniques."
        ],
        "why": "Le montage détourne des images déjà chargées de sens.",
        "trap": "Le confondre avec une retouche esthétique.",
        "evidence": "La section sur Berlin."
      },
      {
        "kind": "héritage",
        "q": "Quel héritage majeur Dada laisse-t-il ?",
        "a": "L’idée qu’une œuvre peut reposer sur un concept, un choix, une action ou un détournement.",
        "choices": [
          "Le retour obligatoire à l’académie.",
          "La disparition des musées.",
          "L’interdiction de signer les œuvres."
        ],
        "why": "Dada élargit les formes possibles de l’art.",
        "trap": "Prendre ses provocations au pied de la lettre.",
        "evidence": "La dernière section."
      }
    ]
  },
  "art-street-art-public-space": {
    "hook": "Un graffiti peut être effacé comme une dégradation, protégé comme une œuvre ou vendu très cher après avoir été arraché à son mur. Le street art oblige à penser ensemble création, propriété et espace public.",
    "keyFacts": [
      "Le graffiti moderne se développe avec les signatures répétées",
      "Tag, throw-up et pièce correspondent à des pratiques différentes",
      "Le métro new-yorkais devient un support mobile majeur",
      "Le street art inclut pochoir, collage, affiche et mosaïque",
      "La reconnaissance institutionnelle crée des tensions avec l’illégalité"
    ],
    "express": [
      "À Philadelphie puis à New York, des jeunes répètent un nom ou un pseudonyme dans la ville. Le tag affirme une présence ; le throw-up privilégie la vitesse ; la pièce développe lettres, couleurs et effets. Les trains permettent à une signature de circuler entre quartiers.",
      "Le street art utilise aussi pochoirs, collages, affiches, mosaïques et installations. Les artistes travaillent avec l’architecture, le passage des habitants et les contraintes du lieu. Une image clandestine, une commande municipale et une intervention sur un mur abandonné n’ont donc ni le même risque ni le même sens.",
      "Quand galeries, marques et musées s’intéressent à ces pratiques, une contradiction apparaît. La reconnaissance protège parfois les œuvres et rémunère les artistes, mais elle peut aussi effacer leur contexte ou transformer une culture contestataire en décoration."
    ],
    "complete": [
      {
        "title": "1. La signature comme visibilité",
        "text": "À la fin des années 1960 et au début des années 1970, des signatures se multiplient à Philadelphie et New York. Des noms comme CORNBREAD ou TAKI 183 deviennent célèbres par leur répétition. Le tag n’est pas d’abord une petite fresque : c’est une écriture rapide qui rend un pseudonyme visible dans des espaces où son auteur dispose de peu de pouvoir officiel. Des codes internes apparaissent : style des lettres, emplacement, fréquence, prise de risque et reconnaissance par les pairs. Les autorités y voient au contraire une atteinte à la propriété et un signe de désordre."
      },
      {
        "title": "2. Le métro comme galerie mobile",
        "text": "Dans le New York des années 1970, les rames offrent des surfaces immenses et mobiles. Les writers peignent dans les dépôts, puis voient leurs œuvres traverser la ville. Les pièces deviennent plus grandes, colorées et complexes ; certaines couvrent un wagon entier. Le métro permet une diffusion spectaculaire, mais concentre aussi la répression. À partir des années 1980, nettoyage systématique, surveillance et sécurisation réduisent fortement les trains peints. Le mouvement ne disparaît pas : il se déplace vers les murs, terrains abandonnés, commandes et autres villes."
      },
      {
        "title": "3. Du graffiti au street art",
        "text": "Le terme street art rassemble des pratiques variées. Le pochoir répète rapidement une image ; le collage apporte un visuel préparé en atelier ; la mosaïque s’insère dans l’architecture ; l’affiche détourne les codes publicitaires. Keith Haring dessine dans les espaces publicitaires vides du métro, Basquiat utilise d’abord le signe SAMO, Blek le Rat développe le pochoir en France et Banksy exploite humour et anonymat. Ces trajectoires ne doivent pas faire oublier l’histoire spécifique du graffiti de lettres."
      },
      {
        "title": "4. Ville, musée et marché",
        "text": "Un mur appartient juridiquement à quelqu’un, mais participe aussi au paysage quotidien. Une publicité autorisée peut occuper plusieurs mètres carrés, tandis qu’un collage non autorisé est immédiatement effacé. Le street art rend visible cette asymétrie sans rendre toute intervention légitime. L’entrée dans les galeries protège et finance parfois les artistes, mais une œuvre conçue pour un mur précis perd une partie de son contexte dans une salle blanche. L’arrachement et la vente d’une peinture murale posent enfin la question de savoir qui possède réellement sa valeur : propriétaire, artiste ou quartier."
      }
    ],
    "deeper": [
      {
        "title": "Graffiti et street art ne sont pas synonymes",
        "text": "Le graffiti de lettres possède une histoire et des critères propres."
      },
      {
        "title": "L’éphémère fait partie de l’œuvre",
        "text": "Effacement, recouvrement et météo modifient son existence."
      },
      {
        "title": "La commande change le risque",
        "text": "Une fresque autorisée n’a pas le même rapport à la ville qu’une action clandestine."
      }
    ],
    "takeaways": [
      {
        "label": "Tag",
        "text": "Une signature répétée construit visibilité et réputation."
      },
      {
        "label": "Ville",
        "text": "Le support et le quartier font partie du sens."
      },
      {
        "label": "Conflit",
        "text": "Création et propriété s’opposent souvent."
      },
      {
        "label": "Marché",
        "text": "La reconnaissance peut protéger autant que neutraliser."
      }
    ],
    "quiz": [
      {
        "kind": "vocabulaire",
        "q": "Quelle différence essentielle existe entre un tag et une pièce ?",
        "a": "Le tag est une signature rapide, tandis qu’une pièce développe davantage les lettres, les couleurs et la composition.",
        "choices": [
          "Le tag est toujours légal.",
          "La pièce ne contient jamais de lettres.",
          "Le tag est obligatoirement au pochoir."
        ],
        "why": "Leur ambition formelle et leur temps d’exécution diffèrent.",
        "trap": "Réduire tout graffiti à une fresque.",
        "evidence": "La première section."
      },
      {
        "kind": "support",
        "q": "Pourquoi le métro new-yorkais a-t-il été si important ?",
        "a": "Il transformait les rames en supports mobiles visibles dans de nombreux quartiers.",
        "choices": [
          "Il permettait d’exposer officiellement.",
          "Il garantissait l’anonymat juridique.",
          "Il interdisait l’effacement."
        ],
        "why": "La circulation multipliait la visibilité.",
        "trap": "Confondre visibilité et autorisation.",
        "evidence": "La deuxième section."
      },
      {
        "kind": "notion",
        "q": "Que recouvre le terme street art ?",
        "a": "Des interventions urbaines variées comme pochoir, collage, affiche, mosaïque ou installation.",
        "choices": [
          "Uniquement les tags sur les trains.",
          "Seulement les fresques municipales.",
          "Toute peinture extérieure depuis l’Antiquité."
        ],
        "why": "Le street art est plus large que le graffiti de lettres.",
        "trap": "Employer les termes comme synonymes parfaits.",
        "evidence": "La troisième section."
      },
      {
        "kind": "enjeu",
        "q": "Pourquoi l’espace public est-il central ?",
        "a": "Parce qu’il distribue inégalement les droits de visibilité, de propriété et de prise de parole.",
        "choices": [
          "Parce qu’aucun mur n’a de propriétaire.",
          "Parce que la publicité y est interdite.",
          "Parce que toute intervention y est légale."
        ],
        "why": "Le mur est propriété, paysage et support de communication.",
        "trap": "Croire que l’espace public est sans règles.",
        "evidence": "La quatrième section."
      },
      {
        "kind": "marché",
        "q": "Quelle tension apparaît quand une œuvre de rue entre au musée ?",
        "a": "Elle peut être reconnue et conservée, mais perdre le contexte ou l’éphémère qui faisaient son sens.",
        "choices": [
          "Elle cesse d’être une image.",
          "Elle devient forcément anonyme.",
          "Elle ne peut plus être reproduite."
        ],
        "why": "Le changement de lieu transforme la relation à l’œuvre.",
        "trap": "Voir la reconnaissance comme seulement positive.",
        "evidence": "La dernière section."
      }
    ]
  },
  "cinema-italian-neorealism": {
    "hook": "Après la chute du fascisme et au milieu des ruines, des cinéastes italiens sortent des studios pour filmer rues, logements, chômage et survie quotidienne. Le néoréalisme ne copie pas le réel : il invente une forme pour lui rendre sa complexité.",
    "keyFacts": [
      "Contexte : fin du fascisme, guerre et reconstruction",
      "Films majeurs : Rome, ville ouverte, Paisà, Le Voleur de bicyclette",
      "Décors réels et moyens limités sont fréquents",
      "Acteurs professionnels et non professionnels peuvent coexister",
      "Les récits ouverts montrent le poids des contraintes sociales"
    ],
    "express": [
      "Le néoréalisme se développe à la fin de la Seconde Guerre mondiale. Rossellini, De Sica, Visconti, Zavattini et d’autres veulent rompre avec les images lisses associées au cinéma fasciste. Ils filment une société marquée par l’occupation, la pauvreté, le marché noir et la reconstruction.",
      "Les décors réels, la lumière disponible et les acteurs non professionnels sont fréquents, mais ne constituent pas une recette absolue. Rome, ville ouverte mélange acteurs connus, reconstitution et urgence documentaire. Le Voleur de bicyclette construit un récit précis autour d’un père dont l’emploi dépend d’un vélo volé.",
      "Le néoréalisme modifie la manière de raconter : les événements semblent modestes, les solutions restent fragiles et la société pèse sur les choix individuels. Son influence atteint la Nouvelle Vague, Satyajit Ray, le cinéma iranien et de nombreux réalisateurs travaillant hors des studios."
    ],
    "complete": [
      {
        "title": "1. Sortir du cinéma fasciste",
        "text": "Sous le fascisme, l’Italie possède une industrie importante et des studios comme Cinecittà. Après-guerre, les comédies bourgeoises élégantes deviennent le symbole d’un monde artificiel éloigné de la vie populaire. La guerre détruit des infrastructures, disperse les équipes et rend les tournages en studio plus difficiles. Filmer dehors est donc à la fois un choix esthétique et une nécessité matérielle. Les rues endommagées, les foules, les logements et les ruines donnent aux films une densité historique immédiate. Le néoréalisme se forme entre rupture politique, pénurie et désir de regarder la société autrement."
      },
      {
        "title": "2. Rossellini et l’urgence de l’histoire",
        "text": "Rome, ville ouverte, tourné en 1945, raconte la résistance à l’occupation allemande. Le film utilise Anna Magnani et Aldo Fabrizi, des décors réels et des scènes reconstruites. Son apparence brute ne signifie donc pas absence de mise en scène : montage, musique et trajectoires dramatiques organisent fortement l’émotion. Paisà, en 1946, adopte une structure en épisodes et suit la remontée de l’Italie par les Alliés. Les difficultés de langue, les malentendus et les rencontres provisoires y comptent autant que les opérations militaires."
      },
      {
        "title": "3. L’événement minuscule devient social",
        "text": "Dans Le Voleur de bicyclette, réalisé par Vittorio De Sica en 1948, le vol d’un vélo met en danger le travail d’Antonio. Le père et son fils parcourent Rome, rencontrent marchés, police, église, foule et indifférence. L’enjeu est simple, mais révèle un système social entier. Antonio n’est ni totalement innocent ni héroïque ; la pauvreté l’entraîne vers un geste qu’il condamnait. Le film transforme une recherche concrète en expérience morale et sociale, sans offrir de résolution rassurante."
      },
      {
        "title": "4. Une influence mondiale",
        "text": "Le néoréalisme ne forme jamais une école fermée et ses méthodes varient. Décors naturels, acteurs non professionnels et lumière réelle coexistent avec doublage, musique, studios et scénarios élaborés. Sa force vient de la combinaison entre observation et construction. La Nouvelle Vague admire les tournages légers et la rue ; Satyajit Ray reconnaît son influence sur Pather Panchali ; de nombreux cinémas africains, latino-américains et iraniens reprennent l’attention aux vies ordinaires et aux récits ouverts."
      }
    ],
    "deeper": [
      {
        "title": "Réalisme ne signifie pas absence de forme",
        "text": "Le cadrage, le montage et le scénario sélectionnent toujours le réel."
      },
      {
        "title": "Le quotidien devient politique",
        "text": "Un vélo ou un emploi peuvent révéler une structure sociale entière."
      },
      {
        "title": "Une étiquette rétrospective",
        "text": "Les cinéastes concernés n’avaient pas tous les mêmes objectifs."
      }
    ],
    "takeaways": [
      {
        "label": "Contexte",
        "text": "Guerre et reconstruction transforment le cinéma italien."
      },
      {
        "label": "Forme",
        "text": "La rue est organisée par une mise en scène précise."
      },
      {
        "label": "Récit",
        "text": "Les contraintes sociales pèsent sur les personnages."
      },
      {
        "label": "Influence",
        "text": "Le mouvement inspire des cinémas du monde entier."
      }
    ],
    "quiz": [
      {
        "kind": "contexte",
        "q": "Dans quel contexte le néoréalisme se développe-t-il ?",
        "a": "À la fin de la Seconde Guerre mondiale, entre chute du fascisme, ruines et reconstruction.",
        "choices": [
          "Pendant l’âge d’or du muet américain.",
          "Dans l’Italie des années 1980.",
          "Avant le cinéma parlant."
        ],
        "why": "Le bouleversement matériel et politique est déterminant.",
        "trap": "Détacher le mouvement de l’après-guerre.",
        "evidence": "La première section."
      },
      {
        "kind": "forme",
        "q": "Quelle affirmation est la plus juste ?",
        "a": "Les décors réels et acteurs non professionnels sont fréquents, mais coexistent avec scénarios, musique et acteurs professionnels.",
        "choices": [
          "Tous les films sont des documentaires sans scénario.",
          "Aucun acteur professionnel n’apparaît.",
          "Tout est tourné en caméra cachée."
        ],
        "why": "Le réalisme est une construction.",
        "trap": "Transformer des tendances en règles absolues.",
        "evidence": "La quatrième section."
      },
      {
        "kind": "film",
        "q": "Quel est l’enjeu du Voleur de bicyclette ?",
        "a": "Un père cherche le vélo indispensable à son emploi, et cette quête révèle la précarité sociale.",
        "choices": [
          "Un détective enquête sur un meurtre.",
          "Un cycliste prépare une course.",
          "Un enfant construit un vélo volant."
        ],
        "why": "L’objet quotidien devient l’entrée vers toute une société.",
        "trap": "Confondre le titre avec un film sportif.",
        "evidence": "La troisième section."
      },
      {
        "kind": "récit",
        "q": "Qu’est-ce qui distingue souvent ces récits ?",
        "a": "Ils privilégient des vies ordinaires, des contraintes concrètes et des fins peu rassurantes.",
        "choices": [
          "Ils reposent toujours sur des super-héros.",
          "Ils évitent toute dimension sociale.",
          "Ils finissent nécessairement par un mariage."
        ],
        "why": "Les histoires modestes dévoilent des structures collectives.",
        "trap": "Chercher les conventions hollywoodiennes classiques.",
        "evidence": "Les sections 2 et 3."
      },
      {
        "kind": "héritage",
        "q": "Pourquoi le néoréalisme a-t-il eu une influence internationale ?",
        "a": "Il a montré qu’un cinéma puissant pouvait naître de la rue, du quotidien et de moyens légers.",
        "choices": [
          "Il a imposé une langue unique.",
          "Il a inventé les effets numériques.",
          "Il a supprimé le montage."
        ],
        "why": "Sa liberté et son attention au réel ont ouvert de nombreuses voies.",
        "trap": "Réduire son influence à une technique.",
        "evidence": "La dernière section."
      }
    ]
  },
  "cinema-blockbuster-system": {
    "hook": "Un blockbuster n’est pas seulement un film cher ou spectaculaire. C’est un système qui coordonne sortie massive, publicité, salles, produits dérivés et parfois plusieurs médias pour transformer un film en événement.",
    "keyFacts": [
      "Jaws en 1975 popularise la sortie estivale massive",
      "Star Wars associe spectacle, univers et produits dérivés",
      "La publicité concentrée modifie la distribution",
      "La franchise réduit une partie du risque",
      "Le marché mondial influence récit, calendrier et casting"
    ],
    "express": [
      "Jaws de Steven Spielberg devient un modèle décisif en 1975. Universal organise une sortie beaucoup plus large que d’habitude et une campagne télévisée nationale. Le film n’attend pas de construire lentement sa réputation : il doit créer immédiatement un rendez-vous.",
      "Star Wars approfondit ce modèle en 1977. Le film combine effets visuels, musique, personnages identifiables et potentiel de suite. Les jouets et produits dérivés prolongent l’univers, entretiennent l’attention et peuvent représenter une part majeure des revenus.",
      "Le blockbuster contemporain est donc une organisation industrielle autant qu’une forme de cinéma. Budget, marketing, sortie mondiale, plateformes, franchises et propriétés intellectuelles se répondent. Ce système peut produire des œuvres inventives, mais aussi réduire la diversité en monopolisant les écrans et les investissements."
    ],
    "complete": [
      {
        "title": "1. Avant le modèle moderne",
        "text": "Hollywood a toujours produit des films coûteux et spectaculaires : péplums, comédies musicales, westerns ou fresques bibliques. Mais leur distribution est souvent progressive, des premières prestigieuses vers une circulation plus large. Dans les années 1960 et 1970, certains films à gros budget échouent lourdement tandis que des succès inattendus attirent un nouveau public. Le blockbuster moderne ne naît donc pas du seul gigantisme ; il naît d’une nouvelle coordination entre production, marketing et distribution."
      },
      {
        "title": "2. Jaws et la sortie événement",
        "text": "Pour Jaws, Universal achète de nombreux espaces publicitaires à la télévision et sort le film sur plusieurs centaines d’écrans dès le début de l’été 1975. Cette stratégie concentre l’attention et transforme la sortie en événement national. Le succès ne repose pas seulement sur la campagne. Spielberg construit un suspense très efficace malgré les problèmes du requin mécanique : la créature est longtemps suggérée par le point de vue, le montage et la musique. Le modèle industriel et l’invention formelle se renforcent."
      },
      {
        "title": "3. Star Wars et la franchise",
        "text": "Star Wars, sorti en 1977, relie aventure sérialisée, effets spéciaux et imaginaire mythologique. George Lucas obtient un contrôle important sur les suites et les produits dérivés. Figurines, livres, bandes dessinées et jeux prolongent le récit hors de la salle. La propriété intellectuelle devient un actif durable. Ce modèle encourage les studios à penser en termes d’univers et de personnages récurrents. Une suite coûte cher, mais bénéficie d’un public déjà constitué et de repères immédiatement reconnaissables."
      },
      {
        "title": "4. Une économie du risque mondial",
        "text": "Un blockbuster concentre des sommes énormes. Pour limiter le risque, les studios privilégient adaptations, remakes, super-héros ou marques connues. Le budget publicitaire peut lui aussi être considérable. Au XXIe siècle, les sorties sont coordonnées mondialement et les bandes-annonces, réseaux sociaux, conventions et partenariats organisent l’attente. Le blockbuster n’est pas un genre : c’est une stratégie d’événementialisation. Un film particulier peut être inventif, tandis que le système peut malgré tout concentrer les investissements et les écrans."
      }
    ],
    "deeper": [
      {
        "title": "Un blockbuster n’est pas seulement un gros budget",
        "text": "La sortie et la publicité sont tout aussi importantes."
      },
      {
        "title": "La franchise est une assurance imparfaite",
        "text": "Une marque connue réduit l’incertitude sans garantir le succès."
      },
      {
        "title": "Le spectacle peut être inventif",
        "text": "Jaws transforme une contrainte technique en suspense."
      }
    ],
    "takeaways": [
      {
        "label": "1975",
        "text": "Jaws impose la sortie estivale massive."
      },
      {
        "label": "1977",
        "text": "Star Wars renforce franchise et produits dérivés."
      },
      {
        "label": "Système",
        "text": "Production, marketing et distribution fonctionnent ensemble."
      },
      {
        "label": "Tension",
        "text": "L’événement mondial peut concentrer les écrans."
      }
    ],
    "quiz": [
      {
        "kind": "définition",
        "q": "Qu’est-ce qui définit le mieux un blockbuster ?",
        "a": "Une stratégie combinant spectacle, marketing et large distribution pour créer un événement.",
        "choices": [
          "Un film obligatoirement en 3D.",
          "Tout film de plus de deux heures.",
          "Un film primé en festival."
        ],
        "why": "Le blockbuster est un système industriel.",
        "trap": "Le réduire au budget.",
        "evidence": "L’introduction."
      },
      {
        "kind": "film",
        "q": "Pourquoi Jaws est-il un tournant ?",
        "a": "Sa sortie large et sa campagne télévisée coordonnée créent immédiatement un événement estival.",
        "choices": [
          "Il est le premier film sonore.",
          "Il inaugure les salles.",
          "Il sort dans une seule ville."
        ],
        "why": "La distribution change d’échelle.",
        "trap": "Retenir seulement le requin.",
        "evidence": "La deuxième section."
      },
      {
        "kind": "franchise",
        "q": "Quel rôle jouent les produits dérivés de Star Wars ?",
        "a": "Ils prolongent l’univers et transforment les personnages en propriété intellectuelle durable.",
        "choices": [
          "Ils remplacent toutes les recettes des salles.",
          "Ils sont interdits avant les suites.",
          "Ils financent seuls le premier film."
        ],
        "why": "Ils entretiennent la relation au récit.",
        "trap": "Les considérer comme de simples souvenirs.",
        "evidence": "La troisième section."
      },
      {
        "kind": "économie",
        "q": "Pourquoi privilégier des marques connues ?",
        "a": "Elles réduisent une partie de l’incertitude en apportant un public préexistant.",
        "choices": [
          "Elles rendent le film gratuit.",
          "Elles garantissent toujours le succès.",
          "Elles suppriment la publicité."
        ],
        "why": "La familiarité limite le risque sans le supprimer.",
        "trap": "Confondre réduction et garantie.",
        "evidence": "La quatrième section."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi distinguer film et système blockbuster ?",
        "a": "Un film peut être inventif alors que le système concentre tout de même les investissements et les écrans.",
        "choices": [
          "Un blockbuster ne peut jamais être bon.",
          "Tous ont le même scénario.",
          "La distribution n’a aucun effet."
        ],
        "why": "L’analyse esthétique et industrielle sont différentes.",
        "trap": "Porter un jugement unique sur tous les films.",
        "evidence": "La dernière section."
      }
    ]
  },
  "sci-radioactivity-atom": {
    "hook": "En 1896, Henri Becquerel constate qu’un sel d’uranium impressionne une plaque photographique sans lumière. L’expérience ouvre une révolution : certains atomes se transforment spontanément et libèrent de l’énergie.",
    "keyFacts": [
      "1896 : Becquerel met en évidence le rayonnement de l’uranium",
      "Marie Curie forge le terme radioactivité",
      "Polonium et radium sont identifiés en 1898",
      "Rutherford distingue plusieurs rayonnements et révèle le noyau",
      "Les usages médicaux exigent une radioprotection rigoureuse"
    ],
    "express": [
      "La radioactivité n’est pas inventée : elle est découverte. Becquerel observe qu’un composé d’uranium émet un rayonnement capable de traverser une enveloppe et de noircir une plaque. Marie Curie forge le terme radioactivité et montre que le phénomène dépend de l’atome lui-même, pas d’une réaction chimique ordinaire.",
      "Avec Pierre Curie, elle traite de grandes quantités de pechblende et identifie le polonium puis le radium. Rutherford et d’autres distinguent rayonnements alpha, bêta et gamma. Ces travaux font disparaître l’idée d’un atome parfaitement indivisible et conduisent à comprendre le noyau.",
      "La radioactivité permet datation, imagerie, traitement des cancers et production d’énergie, mais elle peut aussi endommager les tissus. Le danger dépend du rayonnement, de l’activité, de la dose, de la durée et de la voie d’exposition. L’histoire scientifique est inséparable de la radioprotection."
    ],
    "complete": [
      {
        "title": "1. L’observation de Becquerel",
        "text": "Après la découverte des rayons X par Röntgen en 1895, Henri Becquerel étudie des sels d’uranium fluorescents. Il pense d’abord que la lumière solaire pourrait leur faire émettre un rayonnement analogue. En février 1896, le mauvais temps l’amène à ranger un échantillon avec des plaques photographiques protégées. En développant les plaques, il observe pourtant une forte marque. Le rayonnement ne dépend donc pas d’une excitation lumineuse. L’uranium émet spontanément quelque chose capable de traverser le papier noir, même si le modèle nucléaire n’existe pas encore."
      },
      {
        "title": "2. Marie Curie en fait une propriété atomique",
        "text": "Marie Skłodowska Curie choisit ce phénomène pour sa thèse. Elle mesure l’ionisation de l’air grâce à un électromètre sensible et constate que l’intensité dépend de la quantité d’uranium, non de son état chimique. Elle en déduit que le phénomène est une propriété de l’atome et propose le mot radioactivité. Certains minerais étant plus actifs que l’uranium pur, Marie et Pierre Curie soupçonnent des éléments inconnus. Ils annoncent en 1898 le polonium puis le radium, après un travail chimique considérable sur la pechblende."
      },
      {
        "title": "3. Rayonnements et transformation",
        "text": "Rutherford distingue d’abord les rayonnements alpha et bêta selon leur pénétration et leur déviation dans des champs. Le gamma, très pénétrant, est ensuite identifié. On comprend que l’alpha correspond à un noyau d’hélium, le bêta à certaines émissions électroniques et le gamma à un photon énergétique. Rutherford et Soddy montrent aussi que la radioactivité accompagne une transmutation : un élément devient un autre. La décroissance suit une loi statistique caractérisée par une demi-vie. On ne prévoit pas l’instant exact d’un noyau, mais on décrit très précisément une grande population."
      },
      {
        "title": "4. Du noyau aux usages",
        "text": "L’expérience de la feuille d’or menée par Geiger et Marsden conduit Rutherford à proposer en 1911 un atome presque vide, dont la charge positive et l’essentiel de la masse sont concentrés dans un noyau. Les rayonnements sont rapidement utilisés en médecine, parfois avant que leurs dangers soient compris. Brûlures et cancers professionnels imposent peu à peu la radioprotection : réduire le temps, augmenter la distance, utiliser un écran adapté et contrôler la contamination. Aujourd’hui, radioéléments et rayonnements servent à l’imagerie, à la radiothérapie, à la datation, à l’industrie et à l’énergie."
      }
    ],
    "deeper": [
      {
        "title": "Découverte et modèle sont différents",
        "text": "Le phénomène est observé avant que le noyau soit compris."
      },
      {
        "title": "Activité et dose ne sont pas synonymes",
        "text": "Le nombre de désintégrations ne décrit pas à lui seul l’effet biologique."
      },
      {
        "title": "La demi-vie est statistique",
        "text": "Elle décrit une population, pas une minuterie individuelle."
      }
    ],
    "takeaways": [
      {
        "label": "1896",
        "text": "Becquerel observe une émission spontanée."
      },
      {
        "label": "Curie",
        "text": "La radioactivité devient une propriété atomique mesurable."
      },
      {
        "label": "Noyau",
        "text": "Les transformations révèlent la structure de l’atome."
      },
      {
        "label": "Protection",
        "text": "Les usages utiles nécessitent mesure et limitation."
      }
    ],
    "quiz": [
      {
        "kind": "découverte",
        "q": "Qu’observe Becquerel en 1896 ?",
        "a": "Un sel d’uranium impressionne une plaque protégée sans avoir besoin d’être éclairé.",
        "choices": [
          "L’uranium devient visible seulement au soleil.",
          "Une réaction chimique produit de l’électricité.",
          "Le radium arrête les rayons X."
        ],
        "why": "L’émission spontanée est le cœur de la découverte.",
        "trap": "Raconter une expérience dépendant de la fluorescence.",
        "evidence": "La première section."
      },
      {
        "kind": "Curie",
        "q": "Quelle conclusion majeure Marie Curie tire-t-elle ?",
        "a": "La radioactivité est une propriété de l’atome et ne dépend pas simplement de sa combinaison chimique.",
        "choices": [
          "Elle est produite uniquement par la chaleur.",
          "Elle n’existe que dans le radium.",
          "Elle dépend de la couleur du minerai."
        ],
        "why": "Ses mesures conduisent à une propriété atomique.",
        "trap": "Limiter son travail à l’isolement du radium.",
        "evidence": "La deuxième section."
      },
      {
        "kind": "rayonnements",
        "q": "Quelle affirmation est correcte ?",
        "a": "Alpha, bêta et gamma ont des natures et des pouvoirs de pénétration différents.",
        "choices": [
          "Ce sont trois noms d’un rayonnement identique.",
          "Alpha traverse toujours mieux que gamma.",
          "Gamma est identique à alpha."
        ],
        "why": "Leur interaction avec la matière diffère.",
        "trap": "Parler d’un risque unique sans préciser le rayonnement.",
        "evidence": "La troisième section."
      },
      {
        "kind": "demi-vie",
        "q": "Que signifie la demi-vie ?",
        "a": "Le temps au bout duquel la moitié d’une grande population de noyaux initiaux s’est désintégrée.",
        "choices": [
          "Le temps exact de vie de chaque noyau.",
          "Le temps pour que tout disparaisse.",
          "La moitié d’une expérience."
        ],
        "why": "La décroissance est statistique.",
        "trap": "Transformer la demi-vie en horloge individuelle.",
        "evidence": "La troisième section."
      },
      {
        "kind": "protection",
        "q": "Pourquoi distinguer temps, distance et écran ?",
        "a": "Parce que l’exposition dépend de la durée, de la géométrie et du type de rayonnement.",
        "choices": [
          "Tous les écrans arrêtent tout pareil.",
          "Seule la distance compte.",
          "L’activité ne peut pas être mesurée."
        ],
        "why": "La maîtrise du risque exige plusieurs paramètres.",
        "trap": "Chercher une protection universelle.",
        "evidence": "La dernière section."
      }
    ]
  },
  "sci-computers-microprocessor": {
    "hook": "Un ordinateur n’est pas né d’une seule invention. Il résulte de la rencontre entre machines à calculer, logique, cartes perforées, électronique et idée d’un programme stocké en mémoire.",
    "keyFacts": [
      "Pascal et Leibniz automatisent des opérations",
      "Babbage imagine une machine analytique programmable",
      "Ada Lovelace décrit des opérations pour cette machine",
      "La guerre accélère les calculateurs électroniques",
      "Transistor et microprocesseur miniaturisent l’informatique"
    ],
    "express": [
      "Les machines de Pascal et Leibniz automatisent certaines opérations, mais ne sont pas des ordinateurs universels. Au XIXe siècle, Charles Babbage conçoit une machine analytique avec mémoire, unité de calcul et programme sur cartes perforées. Ada Lovelace comprend qu’elle pourrait manipuler des symboles, pas seulement des nombres.",
      "Au XXe siècle, logique mathématique et besoins de guerre accélèrent les progrès. Alan Turing formalise l’idée d’une machine universelle ; Colossus, ENIAC et les premiers ordinateurs à programme enregistré utilisent relais ou tubes électroniques. Ils sont énormes, coûteux et difficiles à programmer.",
      "Le transistor remplace progressivement les tubes, puis les circuits intégrés rassemblent de nombreux composants. En 1971, le microprocesseur Intel 4004 place une unité centrale sur une puce. Cette miniaturisation ouvre la voie aux micro-ordinateurs, avec les logiciels et interfaces qui les rendent utilisables."
    ],
    "complete": [
      {
        "title": "1. Automatiser le calcul",
        "text": "En 1642, Blaise Pascal met au point une machine capable d’additionner et de soustraire pour aider aux calculs fiscaux. Quelques décennies plus tard, Leibniz développe une machine pouvant aussi multiplier et diviser. Ces dispositifs utilisent roues dentées, engrenages et reports mécaniques. Ils déplacent une partie du savoir-faire humain vers un mécanisme, mais ne changent pas facilement de tâche. Ils s’inscrivent dans une histoire plus longue des abaques, tables et instruments destinés à accélérer les calculs répétitifs et à réduire les erreurs."
      },
      {
        "title": "2. Babbage et l’idée de programme",
        "text": "Au XIXe siècle, Charles Babbage imagine d’abord une machine à différences pour produire automatiquement des tables mathématiques. Il conçoit ensuite une machine analytique beaucoup plus générale, avec un « moulin » pour les opérations, un « magasin » pour la mémoire et des cartes perforées inspirées des métiers Jacquard. La machine complète n’est pas achevée, faute de financement et de précision industrielle suffisante. Pourtant, son architecture annonce séparation entre mémoire et calcul, enchaînement d’instructions, boucles et choix conditionnels."
      },
      {
        "title": "3. Ada Lovelace et les symboles",
        "text": "Ada Lovelace traduit en 1843 un article sur la machine analytique et l’enrichit de longues notes. Elle y décrit notamment une méthode pour calculer des nombres de Bernoulli, souvent présentée comme un programme. Son apport le plus profond est conceptuel : si les relations peuvent être codées, une machine pourrait traiter des symboles, de la musique ou d’autres objets formels. Elle n’a pas construit seule l’ordinateur moderne, mais ses notes montrent une compréhension originale des possibilités et des limites d’une machine générale."
      },
      {
        "title": "4. Électronique et miniaturisation",
        "text": "Dans les années 1930, Alan Turing décrit une machine abstraite capable d’exécuter toute procédure calculable. Pendant la guerre, Colossus aide à la cryptanalyse et ENIAC effectue des calculs rapides grâce à des milliers de tubes. Le programme stocké en mémoire rend ensuite la reprogrammation plus souple. Le transistor, mis au point en 1947, remplace progressivement les tubes ; les circuits intégrés regroupent plusieurs composants ; puis le microprocesseur rassemble l’unité centrale sur une puce. En 1971, l’Intel 4004 ouvre la voie à des systèmes programmables compacts et moins coûteux."
      }
    ],
    "deeper": [
      {
        "title": "Il n’existe pas un inventeur unique",
        "text": "Chaque étape répond à un problème différent : calcul, logique, mémoire ou miniaturisation."
      },
      {
        "title": "Le logiciel est décisif",
        "text": "Un matériel polyvalent n’a d’utilité que si des programmes lui confient des tâches."
      },
      {
        "title": "La guerre accélère sans tout expliquer",
        "text": "Elle mobilise des ressources sur des recherches plus anciennes."
      }
    ],
    "takeaways": [
      {
        "label": "Mécanique",
        "text": "Pascal et Leibniz automatisent des opérations."
      },
      {
        "label": "Programme",
        "text": "Babbage et Lovelace pensent une machine générale."
      },
      {
        "label": "Électronique",
        "text": "Les calculateurs de guerre accélèrent le traitement."
      },
      {
        "label": "Puce",
        "text": "Le microprocesseur rend l’ordinateur compact."
      }
    ],
    "quiz": [
      {
        "kind": "origine",
        "q": "Pourquoi les machines de Pascal et Leibniz ne sont-elles pas encore universelles ?",
        "a": "Elles automatisent certaines opérations mais ne peuvent pas exécuter n’importe quel programme.",
        "choices": [
          "Elles n’utilisent aucun mécanisme.",
          "Ce sont des instruments de musique.",
          "Elles ont déjà des microprocesseurs."
        ],
        "why": "Leur tâche reste limitée.",
        "trap": "Assimiler toute calculatrice à un ordinateur moderne.",
        "evidence": "La première section."
      },
      {
        "kind": "architecture",
        "q": "Quelle idée de Babbage annonce l’ordinateur ?",
        "a": "Séparer mémoire, unité de calcul et instructions programmables.",
        "choices": [
          "Remplacer les nombres par des images seulement.",
          "Utiliser uniquement la vapeur.",
          "Supprimer toute répétition."
        ],
        "why": "La machine analytique combine des fonctions générales.",
        "trap": "Retenir seulement qu’elle est inachevée.",
        "evidence": "La deuxième section."
      },
      {
        "kind": "Lovelace",
        "q": "Quelle intuition importante formule Ada Lovelace ?",
        "a": "Une machine pourrait manipuler des symboles et pas seulement des nombres.",
        "choices": [
          "Une machine deviendrait consciente.",
          "Les cartes perforées étaient inutiles.",
          "Le calcul devait rester fiscal."
        ],
        "why": "Elle élargit le traitement formel.",
        "trap": "Lui attribuer des prédictions qu’elle n’a pas faites.",
        "evidence": "La troisième section."
      },
      {
        "kind": "programme enregistré",
        "q": "Que change le programme stocké en mémoire ?",
        "a": "Il permet de conserver instructions et données et de reprogrammer plus facilement.",
        "choices": [
          "Il interdit de modifier un calcul.",
          "Il remplace la mémoire par du papier.",
          "Il supprime l’unité de calcul."
        ],
        "why": "La programmation devient plus souple que le recâblage.",
        "trap": "Confondre stockage et spécialisation.",
        "evidence": "La quatrième section."
      },
      {
        "kind": "microprocesseur",
        "q": "Pourquoi le microprocesseur est-il un tournant ?",
        "a": "Il rassemble l’unité centrale sur une puce et permet des systèmes compacts et moins coûteux.",
        "choices": [
          "Il invente Internet à lui seul.",
          "Il remplace tous les logiciels.",
          "Il fonctionne sans mémoire."
        ],
        "why": "La miniaturisation facilite la diffusion.",
        "trap": "Lui attribuer toutes les inventions numériques.",
        "evidence": "La dernière section."
      }
    ]
  },
  "eco-bank-money-creation": {
    "hook": "Quand une banque accorde un prêt, elle ne se contente pas toujours de déplacer l’épargne d’un client vers un autre. Elle inscrit simultanément une créance à son actif et un dépôt sur le compte de l’emprunteur.",
    "keyFacts": [
      "La monnaie quotidienne est surtout scripturale",
      "Un crédit crée généralement un dépôt du même montant",
      "Le remboursement du principal détruit cette monnaie",
      "Risque, capital, liquidité et réglementation limitent les banques",
      "La banque centrale influence les conditions de crédit"
    ],
    "express": [
      "La monnaie moderne comprend billets et pièces, mais surtout des dépôts bancaires utilisables par virement ou carte. Lorsqu’une banque accorde un crédit, elle inscrit le prêt parmi ses actifs et crédite le compte de l’emprunteur au passif. Le dépôt nouveau peut servir à payer : la quantité de monnaie bancaire augmente.",
      "Cette création n’est ni gratuite ni illimitée. La banque doit juger l’emprunteur solvable, respecter des exigences de capital, obtenir des réserves et régler les paiements vers d’autres banques. Si elle prête trop mal, les défauts réduisent ses fonds propres et menacent sa survie.",
      "Quand le principal du prêt est remboursé, le dépôt utilisé disparaît et la monnaie correspondante est détruite. La banque centrale agit sur ce système par ses taux, son refinancement et ses règles, sans décider directement de chaque crédit."
    ],
    "complete": [
      {
        "title": "1. La monnaie est surtout scripturale",
        "text": "Payer par carte ou virement déplace des nombres entre comptes. Ces dépôts sont des dettes des banques envers leurs clients : la banque promet de convertir le dépôt en billets ou de transférer la somme vers une autre banque. Ils sont acceptés parce que le système juridique, la garantie des dépôts, la supervision et la banque centrale soutiennent la confiance. La monnaie scripturale se distingue de la monnaie de banque centrale, utilisée sous forme de billets par le public et de réserves par les banques. Les deux circulent dans des espaces différents mais restent convertibles à leur valeur nominale."
      },
      {
        "title": "2. Un prêt crée un dépôt",
        "text": "Imaginons une banque qui accorde 100 000 euros à une entreprise. Dans son bilan, elle inscrit une créance de 100 000 euros : l’entreprise lui devra cette somme. En même temps, elle crédite le compte de l’entreprise de 100 000 euros. Son actif et son passif augmentent ensemble. L’entreprise peut ensuite payer un fournisseur. Si celui-ci est dans une autre banque, les deux établissements règlent la différence en monnaie de banque centrale. La banque prêteuse doit donc pouvoir obtenir la liquidité nécessaire, sans posséder à l’avance chaque euro de dépôt créé."
      },
      {
        "title": "3. Pourquoi les banques ne prêtent-elles pas sans limite ?",
        "text": "Un prêt peut ne pas être remboursé. La perte réduit les fonds propres de la banque, c’est-à-dire la marge absorbant les chocs. Les exigences de capital obligent donc les établissements à financer une partie de leurs risques par des ressources capables d’encaisser les pertes. Les banques doivent aussi conserver ou obtenir assez de liquidité pour répondre aux retraits et paiements interbancaires. La demande de crédit limite également la création : un ménage surendetté ou une entreprise sans projet rentable n’est pas un bon emprunteur. Enfin, réglementation, taux et conjoncture influencent les décisions."
      },
      {
        "title": "4. Remboursement et banque centrale",
        "text": "Quand l’emprunteur rembourse 1 000 euros de principal, son dépôt diminue et la créance de la banque diminue du même montant. La monnaie créée lors du prêt est donc détruite. Les intérêts transfèrent un revenu vers la banque, qui le dépense ensuite en salaires, coûts, impôts ou dividendes. La banque centrale fixe des taux directeurs, prête aux banques sous conditions et organise le règlement final entre établissements. Elle influence le coût et la disponibilité du crédit, mais ne pilote pas mécaniquement un multiplicateur fixe ni chaque dossier individuel."
      }
    ],
    "deeper": [
      {
        "title": "Un dépôt est une dette de la banque",
        "text": "Pour le client, c’est un actif ; pour la banque, c’est une somme due."
      },
      {
        "title": "Capital et réserves diffèrent",
        "text": "Le capital absorbe les pertes, les réserves servent notamment aux règlements."
      },
      {
        "title": "La monnaie est créée puis détruite",
        "text": "Le stock dépend des nouveaux crédits et des remboursements."
      }
    ],
    "takeaways": [
      {
        "label": "Crédit",
        "text": "Le prêt et le dépôt apparaissent ensemble."
      },
      {
        "label": "Limites",
        "text": "Risque, capital, liquidité et demande encadrent la création."
      },
      {
        "label": "Remboursement",
        "text": "Le principal détruit la monnaie bancaire."
      },
      {
        "label": "Banque centrale",
        "text": "Elle influence sans choisir chaque prêt."
      }
    ],
    "quiz": [
      {
        "kind": "mécanisme",
        "q": "Que se passe-t-il généralement quand une banque accorde un crédit ?",
        "a": "Elle inscrit une créance à son actif et crée un dépôt au compte de l’emprunteur.",
        "choices": [
          "Elle retire obligatoirement la somme d’un autre client.",
          "Elle imprime des billets.",
          "Elle ne modifie pas son bilan."
        ],
        "why": "Le prêt et le dépôt apparaissent ensemble.",
        "trap": "Imaginer un simple transfert d’épargne dans tous les cas.",
        "evidence": "La deuxième section."
      },
      {
        "kind": "bilan",
        "q": "Pourquoi un dépôt est-il au passif de la banque ?",
        "a": "Parce que la banque doit cette somme au client et doit pouvoir la transférer ou la convertir.",
        "choices": [
          "Parce qu’il est une perte certaine.",
          "Parce que le client doit cette somme à la banque.",
          "Parce qu’il n’a aucune valeur."
        ],
        "why": "Le même dépôt est actif pour le client et dette pour la banque.",
        "trap": "Inverser les points de vue.",
        "evidence": "La première section."
      },
      {
        "kind": "limite",
        "q": "Qu’est-ce qui limite la création de crédit ?",
        "a": "Le risque de défaut, le capital, la liquidité, la réglementation et la demande solvable.",
        "choices": [
          "Uniquement les billets du coffre.",
          "Aucune limite réelle.",
          "Seulement la volonté du client."
        ],
        "why": "Les contraintes sont multiples.",
        "trap": "Chercher une seule contrainte mécanique.",
        "evidence": "La troisième section."
      },
      {
        "kind": "remboursement",
        "q": "Que produit le remboursement du principal ?",
        "a": "Il réduit le dépôt et la créance, donc détruit la monnaie créée par le prêt.",
        "choices": [
          "Il crée deux fois plus de monnaie.",
          "Il transforme tout en billets.",
          "Il augmente toujours la dette totale."
        ],
        "why": "Le mouvement inverse retire de la monnaie bancaire.",
        "trap": "Confondre principal et intérêt.",
        "evidence": "La quatrième section."
      },
      {
        "kind": "banque centrale",
        "q": "Quel est le rôle le plus juste de la banque centrale ?",
        "a": "Elle fournit la monnaie de banque centrale et influence les conditions générales de financement.",
        "choices": [
          "Elle approuve chaque prêt immobilier.",
          "Elle fixe tous les prix.",
          "Elle interdit les dépôts."
        ],
        "why": "Elle agit sur le cadre, pas chaque dossier.",
        "trap": "Lui attribuer un contrôle direct total.",
        "evidence": "La dernière section."
      }
    ]
  },
  "eco-great-depression": {
    "hook": "Le krach de Wall Street n’est pas à lui seul la Grande Dépression. Il devient catastrophique parce qu’il frappe un système bancaire fragile, une économie endettée et un ordre monétaire qui transmet puis aggrave le choc.",
    "keyFacts": [
      "Octobre 1929 : chute spectaculaire de Wall Street",
      "Faillites bancaires et contraction du crédit amplifient la récession",
      "La déflation alourdit les dettes",
      "L’étalon-or transmet les politiques restrictives",
      "Le New Deal réforme et soutient sans tout résoudre"
    ],
    "express": [
      "Dans les années 1920, l’économie américaine croît rapidement, mais le crédit alimente aussi spéculation boursière et achats à tempérament. Le krach d’octobre 1929 détruit patrimoines et confiance. Il n’explique pas une décennie de crise : les faillites bancaires et la chute du crédit transforment le choc en dépression.",
      "Les prix et les salaires baissent, mais les dettes gardent leur valeur nominale. Le poids réel des remboursements augmente, poussant ménages et entreprises à réduire encore leurs dépenses. L’étalon-or limite les réponses des gouvernements et transmet la contraction à l’Europe. Les barrières douanières aggravent l’effondrement du commerce.",
      "À partir de 1933, Roosevelt lance le New Deal : secours, travaux publics, régulation bancaire, assurance des dépôts et réformes sociales. La production repart, mais le chômage reste élevé. La mobilisation industrielle de la Seconde Guerre mondiale achève la sortie de crise aux États-Unis."
    ],
    "complete": [
      {
        "title": "1. Les fragilités des années 1920",
        "text": "Les États-Unis connaissent une forte croissance de la productivité, de l’automobile, de l’électricité et de la consommation. Beaucoup de ménages achètent à crédit. Les cours boursiers montent rapidement et certains investisseurs achètent des actions sur marge, avec de l’argent emprunté. Toutes les causes ne se trouvent pourtant pas à Wall Street. Les revenus sont inégalement répartis, l’agriculture est déjà en difficulté et de nombreuses petites banques restent fragiles. L’économie mondiale porte aussi les dettes et réparations héritées de la Première Guerre mondiale."
      },
      {
        "title": "2. Le krach n’est que le début",
        "text": "À l’automne 1929, les ventes paniques font chuter les actions. Les pertes réduisent richesse et confiance, mais le problème décisif est l’enchaînement. Entre 1930 et 1933, des vagues de faillites bancaires détruisent des dépôts et poussent les survivantes à réduire le crédit. Sans assurance fédérale des dépôts, les clients courent retirer leur argent. Les entreprises investissent moins, les ménages réduisent leurs achats et le chômage augmente. La contraction bancaire transforme une récession sévère en effondrement durable."
      },
      {
        "title": "3. Déflation, dette et contagion internationale",
        "text": "Quand les prix baissent fortement, revenus et salaires diminuent alors que la dette nominale reste identique. Le fardeau réel augmente. Les emprunteurs vendent des actifs ou coupent leurs dépenses, ce qui fait encore baisser prix et activité. L’étalon-or aggrave la transmission : lorsqu’un pays perd des réserves, il relève ses taux ou réduit la dépense pour défendre sa monnaie, même en récession. Le commerce mondial chute avec la demande, le manque de crédit et le protectionnisme. Le tarif Smoot-Hawley n’est pas la cause unique, mais participe aux représailles."
      },
      {
        "title": "4. Le New Deal et la sortie incomplète",
        "text": "Roosevelt ferme temporairement les banques en 1933, fait examiner leur solidité et met en place une assurance fédérale des dépôts. Le New Deal crée des emplois publics, soutient certaines catégories et réforme la finance. La Social Security pose les bases d’une protection sociale fédérale. Ces mesures restaurent la confiance et réduisent certaines souffrances, sans rétablir immédiatement le plein emploi. Une rechute survient en 1937-1938 lorsque les politiques se resserrent. La production de guerre puis l’entrée des États-Unis dans le conflit mobilisent massivement l’économie."
      }
    ],
    "deeper": [
      {
        "title": "Krach et dépression ne sont pas synonymes",
        "text": "Le choc devient systémique quand il atteint banques, crédit, emploi et commerce."
      },
      {
        "title": "Les institutions transmettent les crises",
        "text": "L’étalon-or et l’absence d’assurance des dépôts aggravent les paniques."
      },
      {
        "title": "Le New Deal est un ensemble",
        "text": "Secours, relance, régulation et réforme sociale ont des effets différents."
      }
    ],
    "takeaways": [
      {
        "label": "1929",
        "text": "Le krach déclenche une perte de confiance."
      },
      {
        "label": "Banques",
        "text": "Les faillites amplifient la crise."
      },
      {
        "label": "Monde",
        "text": "Étalon-or et commerce transmettent la dépression."
      },
      {
        "label": "New Deal",
        "text": "Il réforme et soutient sans tout résoudre."
      }
    ],
    "quiz": [
      {
        "kind": "cause",
        "q": "Pourquoi le krach ne suffit-il pas à expliquer la Dépression ?",
        "a": "Parce que faillites bancaires, dette, déflation et ordre monétaire amplifient le choc.",
        "choices": [
          "Parce que la Bourse ne baisse pas.",
          "Parce que le chômage disparaît.",
          "Parce que toutes les banques sont publiques."
        ],
        "why": "La crise est un enchaînement systémique.",
        "trap": "Chercher une cause unique.",
        "evidence": "Les sections 2 et 3."
      },
      {
        "kind": "banques",
        "q": "Comment les faillites bancaires aggravent-elles la crise ?",
        "a": "Elles détruisent des dépôts, provoquent des paniques et réduisent le crédit.",
        "choices": [
          "Elles augmentent les salaires.",
          "Elles rendent les prêts moins risqués.",
          "Elles forcent à consommer."
        ],
        "why": "La contraction financière touche l’économie réelle.",
        "trap": "Limiter la crise à la Bourse.",
        "evidence": "La deuxième section."
      },
      {
        "kind": "déflation",
        "q": "Pourquoi la déflation alourdit-elle les dettes ?",
        "a": "Les revenus baissent alors que la somme nominale à rembourser reste la même.",
        "choices": [
          "Les dettes doublent par la loi.",
          "Les taux deviennent toujours négatifs.",
          "La monnaie disparaît totalement."
        ],
        "why": "Le poids réel augmente.",
        "trap": "Confondre nominal et réel.",
        "evidence": "La troisième section."
      },
      {
        "kind": "international",
        "q": "Quel rôle joue l’étalon-or ?",
        "a": "Il pousse les pays à défendre leur monnaie par des politiques restrictives et transmet la contraction.",
        "choices": [
          "Il permet une relance illimitée.",
          "Il supprime tous les taux.",
          "Il protège automatiquement les banques."
        ],
        "why": "La contrainte monétaire limite les réponses.",
        "trap": "Voir l’or comme une réserve passive.",
        "evidence": "La troisième section."
      },
      {
        "kind": "New Deal",
        "q": "Quelle évaluation est la plus juste ?",
        "a": "Il restaure la confiance, réforme la finance et soutient l’activité, mais ne supprime pas seul le chômage de masse.",
        "choices": [
          "Il ne change rien.",
          "Il met fin à toute crise en 1933.",
          "Il consiste seulement en droits de douane."
        ],
        "why": "Ses effets sont importants mais incomplets.",
        "trap": "Choisir succès total ou échec total.",
        "evidence": "La dernière section."
      }
    ]
  },
  "geo-metropolization": {
    "hook": "La planète est majoritairement urbaine, mais toutes les villes ne commandent pas les mêmes flux. La métropolisation concentre populations qualifiées, sièges, finance, culture et infrastructures dans certains grands pôles.",
    "keyFacts": [
      "Urbanisation : hausse de la population vivant en ville",
      "Métropolisation : concentration des fonctions supérieures",
      "Une métropole organise des flux au-delà de son territoire",
      "Les économies d’agglomération renforcent l’attractivité",
      "La gentrification peut améliorer le bâti et déplacer des habitants"
    ],
    "express": [
      "L’urbanisation décrit l’augmentation de la population urbaine ; la métropolisation décrit une concentration plus sélective. Une métropole réunit fonctions de commandement, universités, services spécialisés, culture, transports et capacité d’innovation. Sa puissance ne dépend donc pas seulement de son nombre d’habitants.",
      "Les entreprises cherchent les métropoles pour accéder aux marchés, aux travailleurs qualifiés, aux investisseurs et aux réseaux. Cette concentration produit des effets cumulatifs. Mais congestion, prix du logement et inégalités peuvent pousser habitants et emplois vers les périphéries.",
      "La métropole est un espace fragmenté. Quartiers d’affaires, centres rénovés, banlieues résidentielles, zones logistiques et habitats précaires coexistent. La gentrification peut améliorer le bâti tout en déplaçant les populations. Il faut suivre ensemble les flux mondiaux et les mobilités quotidiennes."
    ],
    "complete": [
      {
        "title": "1. Urbanisation et métropolisation",
        "text": "Une société peut s’urbaniser sans que toutes ses villes deviennent des métropoles. L’urbanisation mesure la croissance des villes et la part de population urbaine. La métropolisation concerne la concentration de fonctions rares : direction d’entreprises, finance, recherche, universités, grands équipements culturels, connexions aériennes ou numériques. Une ville très peuplée peut rester dépendante d’autres centres, tandis qu’une ville plus petite peut jouer un rôle international dans un secteur spécialisé. La notion oblige donc à regarder les relations et les fonctions, pas seulement la taille."
      },
      {
        "title": "2. Les économies d’agglomération",
        "text": "La proximité permet de partager des infrastructures, de recruter sur un marché du travail vaste et de rencontrer clients, fournisseurs ou partenaires. Une entreprise technologique bénéficie de la présence d’universités et de financeurs ; un hôpital spécialisé attire chercheurs et patients ; une scène culturelle dense facilite les échanges. Ces avantages sont appelés économies d’agglomération et peuvent s’auto-renforcer. Mais la concentration produit aussi des coûts : embouteillages, pollution, loyers élevés, temps de transport et saturation des services."
      },
      {
        "title": "3. Une organisation polycentrique",
        "text": "La métropole contemporaine ne se réduit plus à un centre unique entouré d’une banlieue uniforme. Quartiers d’affaires secondaires, centres commerciaux, pôles universitaires, aéroports et plateformes logistiques forment plusieurs noyaux. Les réseaux relient parfois mieux ces pôles entre eux qu’avec les quartiers voisins. L’étalement augmente les distances et la dépendance à la voiture ; la densification autour des transports collectifs peut réduire certains déplacements, mais aussi faire monter les prix dans les secteurs bien desservis."
      },
      {
        "title": "4. Gentrification et réseaux mondiaux",
        "text": "Quand un quartier central attire ménages aisés, commerces et investisseurs, les loyers peuvent augmenter. La gentrification ne signifie pas seulement embellissement : elle décrit un changement social pouvant entraîner le départ de résidents modestes. À l’échelle mondiale, les métropoles sont reliées par avions, câbles, investissements et migrations. Leur puissance dépend pourtant d’espaces moins visibles : régions agricoles, centrales énergétiques, ports, entrepôts et travailleurs de la logistique ou du soin. Une métropole organise des flux, mais dépend aussi d’eux."
      }
    ],
    "deeper": [
      {
        "title": "Grande ville et métropole ne sont pas identiques",
        "text": "Les fonctions et les réseaux comptent autant que la taille."
      },
      {
        "title": "La concentration produit ses propres coûts",
        "text": "Le succès peut provoquer congestion et exclusion résidentielle."
      },
      {
        "title": "Le pouvoir déborde les frontières",
        "text": "Les bassins d’emploi sont souvent plus larges que la commune centrale."
      }
    ],
    "takeaways": [
      {
        "label": "Urbanisation",
        "text": "Davantage de personnes vivent en ville."
      },
      {
        "label": "Métropolisation",
        "text": "Les fonctions supérieures se concentrent."
      },
      {
        "label": "Fragmentation",
        "text": "Les espaces sont inégalement connectés."
      },
      {
        "label": "Enjeu",
        "text": "Attractivité et justice spatiale doivent être liées."
      }
    ],
    "quiz": [
      {
        "kind": "définition",
        "q": "Quelle différence existe entre urbanisation et métropolisation ?",
        "a": "L’urbanisation concerne la population urbaine ; la métropolisation la concentration de fonctions supérieures.",
        "choices": [
          "Ce sont des synonymes.",
          "La métropolisation désigne seulement le métro.",
          "L’urbanisation ne concerne que les campagnes."
        ],
        "why": "Les processus peuvent avancer différemment.",
        "trap": "Se fier à la proximité des mots.",
        "evidence": "La première section."
      },
      {
        "kind": "fonction",
        "q": "Qu’est-ce qui fait d’une ville une métropole ?",
        "a": "Sa capacité à concentrer des fonctions de commandement et à organiser des flux.",
        "choices": [
          "Uniquement le nombre d’immeubles.",
          "La présence obligatoire d’une capitale.",
          "La disparition de toute périphérie."
        ],
        "why": "Les fonctions et réseaux priment sur la taille seule.",
        "trap": "Confondre grande ville et métropole.",
        "evidence": "La première section."
      },
      {
        "kind": "agglomération",
        "q": "Que sont les économies d’agglomération ?",
        "a": "Les avantages créés par la proximité de travailleurs, entreprises, services et infrastructures.",
        "choices": [
          "Une baisse automatique des loyers.",
          "Un impôt municipal.",
          "La suppression de tous les transports."
        ],
        "why": "La proximité facilite les échanges.",
        "trap": "Oublier les coûts de la concentration.",
        "evidence": "La deuxième section."
      },
      {
        "kind": "gentrification",
        "q": "Que désigne la gentrification ?",
        "a": "Une transformation sociale et immobilière pouvant déplacer les ménages modestes.",
        "choices": [
          "Toute rénovation d’un bâtiment.",
          "La croissance d’un pays.",
          "Une nouvelle ligne de bus seulement."
        ],
        "why": "L’évolution du bâti s’accompagne d’un changement social.",
        "trap": "Réduire le terme à l’embellissement.",
        "evidence": "La quatrième section."
      },
      {
        "kind": "réseau",
        "q": "Pourquoi la puissance métropolitaine est-elle relationnelle ?",
        "a": "Parce qu’elle dépend des flux, ressources et territoires auxquels la ville est connectée.",
        "choices": [
          "Parce qu’elle produit seule tout ce qu’elle consomme.",
          "Parce que les transports n’ont aucun rôle.",
          "Parce qu’elle reste limitée à la mairie."
        ],
        "why": "Une métropole commande des réseaux et dépend d’eux.",
        "trap": "Imaginer une ville autonome.",
        "evidence": "La dernière section."
      }
    ]
  },
  "geo-risk-vulnerability": {
    "hook": "Un séisme puissant dans une région peu habitée peut faire peu de victimes, tandis qu’un événement plus faible dans une ville mal construite devient catastrophique. Le risque naît de la rencontre entre aléa, exposition et vulnérabilité.",
    "keyFacts": [
      "Aléa : phénomène potentiellement dangereux",
      "Exposition : personnes et biens présents",
      "Vulnérabilité : capacité à résister et se relever",
      "La catastrophe n’est jamais seulement naturelle",
      "Prévention, normes et justice sociale réduisent le risque"
    ],
    "express": [
      "L’aléa décrit un phénomène : séisme, crue, cyclone, éruption, avalanche ou incendie. Le risque apparaît quand des populations et des biens y sont exposés. La vulnérabilité dépend de la qualité des bâtiments, des revenus, des réseaux, de l’information et de la capacité des institutions à agir.",
      "Deux territoires soumis à la même secousse peuvent connaître des bilans très différents. Des normes parasismiques, un système d’alerte et des évacuations réduisent les victimes. À l’inverse, habitat précaire, isolement ou destruction des protections naturelles aggravent les conséquences.",
      "Le changement climatique modifie certains aléas comme vagues de chaleur, pluies extrêmes ou incendies, mais l’aménagement reste décisif. Construire en zone inondable, imperméabiliser les sols ou supprimer des mangroves augmente l’exposition. La réduction du risque combine science, politique urbaine et justice sociale."
    ],
    "complete": [
      {
        "title": "1. Aléa, exposition et vulnérabilité",
        "text": "Un aléa est la possibilité qu’un phénomène dangereux se produise avec une certaine intensité dans un lieu donné. L’exposition mesure ce qui se trouve dans la zone : habitants, logements, routes, hôpitaux, entreprises ou patrimoine. La vulnérabilité désigne la fragilité de ces éléments et leur capacité à faire face. On résume parfois le risque par une combinaison de ces facteurs. Cette formule n’est pas une équation exacte, mais évite une erreur : croire qu’un phénomène physique suffit à déterminer la catastrophe. Sans personnes ni biens exposés, il n’y a pas de catastrophe sociale."
      },
      {
        "title": "2. Bâti et infrastructures",
        "text": "Lors d’un séisme, ce sont souvent les bâtiments qui tuent. Des normes adaptées, un contrôle réel des chantiers et la rénovation des structures anciennes réduisent fortement le danger. Hôpitaux, ponts, réseaux d’eau et télécommunications doivent aussi rester fonctionnels après le choc, sinon une crise secondaire apparaît. Le coût de la prévention est élevé, mais la reconstruction l’est davantage. Des techniques simples, la formation des artisans et la cartographie des sols peuvent améliorer la sécurité même dans des territoires disposant de ressources limitées."
      },
      {
        "title": "3. Alerte et préparation",
        "text": "Pour les cyclones, tsunamis ou crues, quelques heures ou minutes d’alerte peuvent sauver des vies. Un système efficace ne se limite pas à détecter le phénomène. Il faut transmettre un message compréhensible, disposer d’itinéraires, de refuges, de transports et répéter les consignes. Une alerte sans possibilité d’évacuer protège peu. La confiance compte également : si les autorités ont souvent déclenché de fausses alertes ou si les habitants craignent les vols, certains refusent de partir. La préparation est technique, sociale et politique."
      },
      {
        "title": "4. Aménagement, climat et inégalités",
        "text": "Les plaines inondables et littoraux attirent activités et logements. Lorsque l’urbanisation s’étend sans protections adaptées, l’exposition augmente. L’imperméabilisation accélère le ruissellement ; la disparition des zones humides supprime des espaces de stockage de l’eau. Le réchauffement augmente aussi la fréquence ou l’intensité de certains événements, mais les conséquences restent inégalement réparties. Les ménages pauvres vivent souvent dans les logements les moins protégés et disposent de moins d’assurance ou d’épargne pour se relever. Réduire le risque suppose donc d’agir sur l’aléa quand c’est possible, mais surtout sur l’exposition et la vulnérabilité."
      }
    ],
    "deeper": [
      {
        "title": "Une catastrophe n’est pas seulement naturelle",
        "text": "Le phénomène rencontre toujours des choix d’aménagement et des inégalités."
      },
      {
        "title": "Prévoir n’est pas protéger",
        "text": "Une prévision doit être reliée à des moyens et à une population préparée."
      },
      {
        "title": "Reconstruire est politique",
        "text": "On peut corriger les vulnérabilités ou les reproduire."
      }
    ],
    "takeaways": [
      {
        "label": "Aléa",
        "text": "Le phénomène potentiellement dangereux."
      },
      {
        "label": "Exposition",
        "text": "Les personnes et biens sur sa trajectoire."
      },
      {
        "label": "Vulnérabilité",
        "text": "La fragilité et la capacité de réponse."
      },
      {
        "label": "Prévention",
        "text": "Agir sur le bâti, l’alerte et l’aménagement."
      }
    ],
    "quiz": [
      {
        "kind": "notion",
        "q": "Qu’est-ce qu’un aléa ?",
        "a": "La possibilité qu’un phénomène dangereux se produise avec une certaine intensité dans un lieu.",
        "choices": [
          "Le nombre de victimes.",
          "La totalité des bâtiments.",
          "La capacité d’un assureur."
        ],
        "why": "L’aléa décrit le phénomène, pas les conséquences.",
        "trap": "Confondre aléa et risque.",
        "evidence": "La première section."
      },
      {
        "kind": "risque",
        "q": "Pourquoi un même séisme produit-il des bilans différents ?",
        "a": "Parce que l’exposition, la qualité du bâti et la capacité de réponse varient.",
        "choices": [
          "Parce que les séismes ne sont pas mesurables.",
          "Parce que le nombre d’habitants ne compte pas.",
          "Parce que seule la latitude décide."
        ],
        "why": "Le risque combine phénomène et vulnérabilité.",
        "trap": "Attribuer tout à la nature.",
        "evidence": "Les sections 1 et 2."
      },
      {
        "kind": "alerte",
        "q": "Pourquoi une alerte technique peut-elle échouer ?",
        "a": "Parce qu’elle doit être comprise et accompagnée de moyens réels d’évacuation et de confiance.",
        "choices": [
          "Parce qu’aucun cyclone n’est détectable.",
          "Parce qu’une sirène augmente le danger.",
          "Parce que personne ne reçoit de messages."
        ],
        "why": "La chaîne va de la détection à l’action.",
        "trap": "Confondre information et protection.",
        "evidence": "La troisième section."
      },
      {
        "kind": "aménagement",
        "q": "Comment l’urbanisation augmente-t-elle le risque d’inondation ?",
        "a": "En construisant dans les zones exposées et en imperméabilisant les sols ou détruisant les zones humides.",
        "choices": [
          "En plantant des arbres.",
          "En entretenant les réseaux.",
          "En laissant des zones d’expansion."
        ],
        "why": "L’aménagement modifie exposition et ruissellement.",
        "trap": "Oublier les choix humains.",
        "evidence": "La quatrième section."
      },
      {
        "kind": "climat",
        "q": "Quelle affirmation est la plus juste ?",
        "a": "Le climat modifie certains aléas, mais inégalités et aménagement déterminent largement les dommages.",
        "choices": [
          "Il explique seul toutes les catastrophes.",
          "Il n’a aucun effet.",
          "Il rend toute prévention inutile."
        ],
        "why": "Climat et vulnérabilité doivent être analysés ensemble.",
        "trap": "Choisir une explication totale ou nulle.",
        "evidence": "La dernière section."
      }
    ]
  },
  "music-baroque-opera": {
    "hook": "Vers 1600, des musiciens florentins cherchent à retrouver la puissance supposée du théâtre grec. Ils inventent sans le savoir un genre nouveau : une action entière portée par la musique, la voix, le décor et la scène.",
    "keyFacts": [
      "Les premières expériences apparaissent à Florence vers 1600",
      "L’Orfeo de Monteverdi date de 1607",
      "Récitatif et air remplissent des fonctions différentes",
      "Venise ouvre en 1637 un théâtre d’opéra public payant",
      "Le genre se diffuse et s’adapte aux langues européennes"
    ],
    "express": [
      "L’opéra naît dans les milieux humanistes italiens qui imaginent que les tragédies grecques étaient chantées. La monodie accompagnée rend le texte plus intelligible que la polyphonie complexe. Les premières œuvres de Peri et Caccini expérimentent une parole située entre chant et déclamation.",
      "Avec L’Orfeo en 1607, Monteverdi combine récitatifs, airs, chœurs, danses et couleurs instrumentales. La musique ne se contente pas d’orner le récit : elle caractérise les personnages, organise les tensions et transforme un mythe en expérience émotionnelle.",
      "L’ouverture d’un théâtre public à Venise en 1637 change l’économie du genre. Billets, saisons et concurrence favorisent vedettes, décors spectaculaires et airs mémorables. L’opéra se diffuse ensuite en France, Angleterre et espaces germaniques, où chaque cour et chaque langue l’adapte."
    ],
    "complete": [
      {
        "title": "1. Retrouver l’Antiquité, inventer du neuf",
        "text": "À Florence, la Camerata de Bardi réunit poètes, savants et musiciens à la fin du XVIe siècle. Ils critiquent la polyphonie vocale lorsqu’elle rend le texte difficile à comprendre. Persuadés que le théâtre grec associait parole et chant, ils cherchent une déclamation musicale capable de suivre les accents du langage. Leurs connaissances de l’Antiquité sont incomplètes, mais l’erreur est féconde. La monodie accompagnée place une voix principale au-dessus d’une basse et d’accords. Elle permet de raconter une action continue et donne naissance aux premières formes d’opéra."
      },
      {
        "title": "2. Monteverdi et L’Orfeo",
        "text": "Créé à Mantoue en 1607, L’Orfeo raconte la descente d’Orphée aux Enfers pour retrouver Eurydice. Monteverdi utilise des instruments variés, des chœurs, des ritournelles et plusieurs styles de chant. Le célèbre lamento après la perte d’Eurydice montre comment la musique peut suspendre l’action et faire entendre le conflit intérieur. L’œuvre n’est pas le premier opéra, mais elle reste l’une des premières à posséder une telle cohérence dramatique et musicale. Elle unit spectacle de cour, puissance poétique et recherche expressive."
      },
      {
        "title": "3. Récitatif, air et économie de la scène",
        "text": "Le récitatif suit le rythme de la parole et fait avancer l’intrigue ; l’air arrête davantage le temps pour développer une émotion. Cette distinction devient de plus en plus nette au XVIIe siècle et crée une tension entre compréhension du récit et plaisir musical. En 1637, le Teatro San Cassiano ouvre à Venise comme théâtre d’opéra public payant. Le genre sort du cercle exclusif des cours. Les impresarios organisent les saisons, les chanteurs célèbres attirent les spectateurs et la concurrence favorise intrigues complexes, machines scéniques et virtuosité."
      },
      {
        "title": "4. Des modèles nationaux",
        "text": "En France, Lully adapte le genre à la cour de Louis XIV avec la tragédie en musique, qui donne une grande place à la danse, aux chœurs et à la prosodie française. En Angleterre, Purcell compose Dido and Aeneas et développe aussi le semi-opéra. Dans les pays germaniques, l’influence italienne se combine à des traditions locales. Au XVIIIe siècle, opera seria, opera buffa et autres formes se distinguent. Haendel écrit pour Londres, puis Mozart transforme les rapports entre musique, théâtre et personnages. L’opéra devient un langage européen pluriel."
      }
    ],
    "deeper": [
      {
        "title": "Une reconstruction imaginaire",
        "text": "Les humanistes ne reproduisent pas fidèlement la tragédie grecque ; ils créent du neuf."
      },
      {
        "title": "La scène est une économie",
        "text": "Salles, billets et chanteurs influencent la forme musicale."
      },
      {
        "title": "La langue transforme la musique",
        "text": "Prosodie italienne, française ou anglaise conduit à des solutions différentes."
      }
    ],
    "takeaways": [
      {
        "label": "Vers 1600",
        "text": "La monodie rend le texte dramatique intelligible."
      },
      {
        "label": "1607",
        "text": "L’Orfeo impose une grande synthèse."
      },
      {
        "label": "1637",
        "text": "Venise ouvre l’opéra au public payant."
      },
      {
        "label": "Europe",
        "text": "Chaque langue adapte le genre."
      }
    ],
    "quiz": [
      {
        "kind": "origine",
        "q": "Que cherchent les humanistes florentins ?",
        "a": "Une déclamation musicale rendant le texte dramatique intelligible et expressif.",
        "choices": [
          "Une musique sans parole.",
          "Une copie exacte d’une partition grecque.",
          "Un genre seulement dansé."
        ],
        "why": "Leur hypothèse conduit à la monodie.",
        "trap": "Croire qu’ils possédaient les partitions grecques.",
        "evidence": "La première section."
      },
      {
        "kind": "œuvre",
        "q": "Pourquoi L’Orfeo est-il majeur ?",
        "a": "Il unit récit, voix, chœurs et instruments dans une construction dramatique riche.",
        "choices": [
          "C’est le premier enregistrement sonore.",
          "Il supprime les instruments.",
          "Il est composé pour le cinéma."
        ],
        "why": "L’œuvre synthétise les expériences précédentes.",
        "trap": "Le présenter comme le premier opéra sans nuance.",
        "evidence": "La deuxième section."
      },
      {
        "kind": "forme",
        "q": "Quelle différence générale existe entre récitatif et air ?",
        "a": "Le récitatif fait avancer l’action près de la parole ; l’air développe une émotion.",
        "choices": [
          "Le récitatif est toujours instrumental.",
          "L’air n’a pas de mélodie.",
          "Ils sont identiques."
        ],
        "why": "Ils organisent différemment le temps dramatique.",
        "trap": "Appliquer une définition rigide à toutes les époques.",
        "evidence": "La troisième section."
      },
      {
        "kind": "économie",
        "q": "Que change le Teatro San Cassiano en 1637 ?",
        "a": "L’opéra devient un spectacle public payant soumis aux saisons, à la concurrence et aux vedettes.",
        "choices": [
          "Il devient gratuit partout.",
          "Il cesse d’utiliser des décors.",
          "Il interdit les professionnels."
        ],
        "why": "Le genre entre dans une économie urbaine.",
        "trap": "Oublier que public ne signifie pas égalitaire.",
        "evidence": "La troisième section."
      },
      {
        "kind": "diffusion",
        "q": "Pourquoi l’opéra européen n’est-il pas un modèle unique ?",
        "a": "Les langues, les cours et les traditions locales produisent des formes différentes.",
        "choices": [
          "Chaque pays interdit la musique italienne.",
          "Les partitions ne circulent jamais.",
          "Seuls les sujets historiques sont permis."
        ],
        "why": "La circulation s’accompagne d’adaptations.",
        "trap": "Imaginer une simple copie.",
        "evidence": "La dernière section."
      }
    ]
  },
  "music-studio-instrument": {
    "hook": "Au début, le disque cherche surtout à conserver une performance. Avec la bande magnétique, le multipiste et le mixage, le studio devient un lieu où une musique peut être construite morceau par morceau.",
    "keyFacts": [
      "La bande magnétique facilite montage, copie et superposition",
      "Les Paul développe le re-recording et le multipiste",
      "Le producteur peut devenir un auteur du son",
      "Phil Spector construit le Wall of Sound",
      "Les Beatles utilisent le studio comme espace de composition"
    ],
    "express": [
      "L’enregistrement électrique améliore déjà la qualité, mais la bande magnétique après 1945 change la pratique. On peut couper, recoller, ralentir, inverser et copier le son. Les Paul superpose plusieurs parties enregistrées séparément et montre qu’un musicien peut dialoguer avec ses propres prises.",
      "Le multipiste permet d’enregistrer voix, batterie, guitares et effets à des moments différents. Le mixage règle volume, espace et timbre ; la réverbération donne une profondeur artificielle. Des producteurs comme Phil Spector organisent une masse sonore qui n’est pas la simple photographie d’un concert.",
      "Avec Revolver ou Sgt. Pepper, les Beatles et leur équipe utilisent boucles, bandes inversées, changements de vitesse et montages. Le studio devient un outil de composition. Cette révolution prépare le dub, la musique électronique, le hip-hop et la production numérique."
    ],
    "complete": [
      {
        "title": "1. De la captation à la bande",
        "text": "Les premiers enregistrements acoustiques obligent les musiciens à se placer autour d’un pavillon. Le son fait vibrer directement un stylet qui grave le support. Avec le microphone et l’enregistrement électrique dans les années 1920, dynamique et timbres sont mieux captés. Après la Seconde Guerre mondiale, les magnétophones à bande se diffusent. La bande peut être coupée et collée, ce qui permet de sélectionner des prises ou de réorganiser une séquence. Sa vitesse peut être modifiée, une boucle créée et le son lu à l’envers. L’enregistrement devient un matériau transformable."
      },
      {
        "title": "2. Les Paul et le multipiste",
        "text": "Le guitariste et inventeur Les Paul expérimente le re-recording : il enregistre une partie, puis ajoute d’autres couches en se réécoutant. Avec Mary Ford, il produit des voix et guitares superposées donnant l’impression d’un ensemble impossible à réunir en direct. Le multipiste permet ensuite de retravailler chaque partie séparément avant de les combiner. On peut corriger une voix sans refaire la batterie, construire un arrangement progressivement et faire jouer plusieurs rôles à une seule personne. Cette souplesse transforme la division du travail entre interprète, ingénieur et producteur."
      },
      {
        "title": "3. Le producteur sculpte le son",
        "text": "Phil Spector développe au début des années 1960 le Wall of Sound. Il réunit plusieurs instruments doublant les mêmes parties, enregistre dans une salle très réverbérante et compacte l’ensemble en une masse dense adaptée aux radios et petits haut-parleurs. Le résultat n’imite pas une salle de concert : il fabrique une signature. George Martin, Brian Wilson ou Joe Meek montrent également que le producteur intervient dans l’écriture, l’arrangement et l’expérimentation. Le studio devient un espace de décisions artistiques où technologie et musique sont indissociables."
      },
      {
        "title": "4. Des Beatles au numérique",
        "text": "À partir de 1966, les Beatles renoncent progressivement aux tournées et consacrent davantage de temps au studio. Revolver puis Sgt. Pepper utilisent doublage automatique, bandes inversées, boucles, instruments enregistrés à des vitesses différentes et montages de plusieurs prises. Certaines pièces ne sont plus conçues pour être reproduites fidèlement sur scène. Le principe se diffuse : le dub jamaïcain fait du mixage une performance, le hip-hop échantillonne des disques, la musique électronique programme et transforme le son. Les logiciels actuels prolongent cette révolution de la bande et du multipiste."
      }
    ],
    "deeper": [
      {
        "title": "La fidélité est un choix",
        "text": "Un disque peut documenter une performance ou produire un objet autonome."
      },
      {
        "title": "La technique redistribue l’auteur",
        "text": "Ingénieurs et producteurs participent parfois décisivement au résultat."
      },
      {
        "title": "Le live s’adapte au disque",
        "text": "Pistes et séquenceurs permettent de reproduire des sons créés en studio."
      }
    ],
    "takeaways": [
      {
        "label": "Bande",
        "text": "Le son devient découpable et transformable."
      },
      {
        "label": "Multipiste",
        "text": "Les parties sont enregistrées séparément."
      },
      {
        "label": "Producteur",
        "text": "Le mixage devient un choix d’écriture."
      },
      {
        "label": "Héritage",
        "text": "Le numérique prolonge cette construction du son."
      }
    ],
    "quiz": [
      {
        "kind": "technique",
        "q": "Que permet la bande magnétique ?",
        "a": "De couper, recoller, copier, inverser ou changer la vitesse du son.",
        "choices": [
          "Seulement d’augmenter le volume.",
          "D’enregistrer sans support.",
          "De supprimer automatiquement tout bruit."
        ],
        "why": "La bande rend le son manipulable.",
        "trap": "Réduire son apport à la fidélité.",
        "evidence": "La première section."
      },
      {
        "kind": "multipiste",
        "q": "Quel est l’intérêt du multipiste ?",
        "a": "Enregistrer et retravailler séparément plusieurs parties avant de les combiner.",
        "choices": [
          "Obliger le groupe à jouer en une prise.",
          "Interdire les corrections.",
          "Transformer automatiquement en stéréo."
        ],
        "why": "Chaque piste devient une couche contrôlable.",
        "trap": "Confondre pistes et musiciens.",
        "evidence": "La deuxième section."
      },
      {
        "kind": "Les Paul",
        "q": "Pourquoi Les Paul est-il important ?",
        "a": "Il développe la superposition, le re-recording et des usages pionniers du multipiste.",
        "choices": [
          "Il invente le chant lyrique.",
          "Il refuse l’enregistrement électrique.",
          "Il dirige un orchestre baroque."
        ],
        "why": "Ses expériences construisent le son par couches.",
        "trap": "Le réduire à une guitare.",
        "evidence": "La deuxième section."
      },
      {
        "kind": "production",
        "q": "Que désigne le Wall of Sound ?",
        "a": "Une masse dense obtenue par accumulation d’instruments, mixage et réverbération.",
        "choices": [
          "Un mur devant les musiciens.",
          "Une méthode sans microphone.",
          "Une règle interdisant les arrangements."
        ],
        "why": "Le studio fabrique un espace sonore.",
        "trap": "Prendre le nom littéralement.",
        "evidence": "La troisième section."
      },
      {
        "kind": "héritage",
        "q": "Pourquoi Sgt. Pepper symbolise-t-il le studio-instrument ?",
        "a": "Parce que montage, vitesses, boucles et effets participent directement à la composition.",
        "choices": [
          "Il est enregistré entièrement en concert.",
          "Il supprime toute production.",
          "Il ne contient aucun instrument acoustique."
        ],
        "why": "La production ne se contente plus de documenter.",
        "trap": "Confondre expérimentation et absence de musiciens.",
        "evidence": "La dernière section."
      }
    ]
  }
};

  function addLesson(worldId, lesson) {
    if (!Array.isArray(data.lessons[worldId])) data.lessons[worldId] = [];
    if (!data.lessons[worldId].some(item => item?.id === lesson.id)) data.lessons[worldId].push(lesson);
  }

  const misplacedCubism = (data.lessons["art-modern"] || []).find(item => item?.id === "art-cubism-multiple-viewpoints");
  if (misplacedCubism) {
    data.lessons["art-modern"] = (data.lessons["art-modern"] || []).filter(item => item?.id !== misplacedCubism.id);
    addLesson("art-avantgardes", misplacedCubism);
  }

  Object.entries(LESSONS).forEach(([worldId, items]) => items.forEach(item => addLesson(worldId, item)));
  Object.keys(PACKS).forEach(id => PUBLISHED_LESSON_IDS.add(id));
  Object.assign(READY_LESSON_PACKS, PACKS);
  lessonIndexCache = null;

  function beta178RealWorlds(disciplineId = activeDisciplineId()) {
    const id = disciplineById(disciplineId || "history").id;
    return allDisciplineWorlds()
      .filter(world => worldDisciplineId(world) === id)
      .filter(world => (data.lessons?.[world.id] || []).some(isCuratedLesson))
      .sort((a, b) => (a.sortStart ?? 999999) - (b.sortStart ?? 999999) || String(a.id).localeCompare(String(b.id)));
  }
  function beta178LessonsForWorld(worldId) {
    return (data.lessons?.[worldId] || [])
      .filter(isCuratedLesson)
      .sort((a, b) => (a.order || 999) - (b.order || 999) || String(a.id).localeCompare(String(b.id)));
  }
  function beta178LessonsForDiscipline(disciplineId = activeDisciplineId()) {
    return beta178RealWorlds(disciplineId).flatMap(world => beta178LessonsForWorld(world.id));
  }

  beta139RealWorldsForDiscipline = beta178RealWorlds;
  beta139ReadyLessonsForDiscipline = beta178LessonsForDiscipline;
  treeAvailableWorlds = beta178RealWorlds;
  treeLessonsForWorld = beta178LessonsForWorld;
  lessonsForDiscipline = beta178LessonsForDiscipline;
  curatedWorlds = function beta178CuratedWorlds() {
    const ids = new Set(curatedLessons().map(lesson => lessonWorldId(lesson.id)));
    return allDisciplineWorlds().filter(world => ids.has(world.id));
  };
  disciplineProgress = function beta178DisciplineProgress(disciplineId = activeDisciplineId()) {
    const id = disciplineById(disciplineId || "history").id;
    const lessons = beta178LessonsForDiscipline(id);
    const done = lessons.filter(lesson => lessonDone(lesson.id)).length;
    const worlds = beta178RealWorlds(id);
    const groupIds = new Set(worlds.map(world => world.group).filter(Boolean));
    return {
      done,
      total: lessons.length,
      progress: percent(done, lessons.length),
      chapters: groupIds.size,
      worlds: worlds.length,
      themes: worlds.length,
      ready: lessons.length > 0,
      planned: false
    };
  };

  function beta178CourseAudit() {
    const worlds = new Map(allDisciplineWorlds().map(world => [world.id, world]));
    const published = curatedLessons();
    const orphanLessons = published.filter(lesson => !worlds.has(lessonWorldId(lesson.id))).map(lesson => lesson.id);
    const duplicateIds = [];
    const seen = new Set();
    allLessons().forEach(lesson => {
      if (seen.has(lesson.id)) duplicateIds.push(lesson.id);
      seen.add(lesson.id);
    });
    const newCourses = Object.keys(PACKS).map(id => {
      const lesson = lessonById(id);
      const worldId = lesson ? lessonWorldId(id) : "";
      const quality = rawPublishedQuality(PACKS[id] || {});
      return { id, worldId, visible: Boolean(lesson && worlds.has(worldId) && isCuratedLesson(lesson)), quality };
    });
    const result = {
      version: VERSION,
      published: published.length,
      byDiscipline: Object.fromEntries(DISCIPLINES.map(d => [d.id, beta178LessonsForDiscipline(d.id).length])),
      orphanLessons,
      duplicateIds: [...new Set(duplicateIds)],
      newCourses,
      ok: orphanLessons.length === 0 && duplicateIds.length === 0 && newCourses.every(item => item.visible && item.quality.pass)
    };
    try { window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, contentAudit: result, nonHistoryExpansion: true }; } catch {}
    return result;
  }

  const audit = beta178CourseAudit();
  if (!audit.ok) try { console.warn("HistoDaily beta178 content audit", audit); } catch {}
  try { state.contentAuditVersion = VERSION; queueSaveState?.(50); } catch {}

  // app.js a déjà peint l’accueil avant le chargement des extensions de contenu.
  // Sans ce nouveau rendu, les cours existent dans le profil mais l’accueil conserve
  // les anciens totaux jusqu’à la prochaine navigation — exactement le décalage observé.
  try {
    if (typeof renderSoon === "function") renderSoon();
    else if (typeof render === "function") render({ immediate: true });
  } catch (error) {
    try { console.warn("HistoDaily beta178 content refresh", error); } catch {}
  }
})();
