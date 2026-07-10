/* HistoDaily beta 175 — refonte éditoriale des domaines hors Histoire et des mystères. */
(function histodailyBeta175Editorial(){
  const VERSION = "1.0.0-beta.176";
  const PACKS = {
  "art-read-image-basics": {
    "hook": "Une œuvre n’est ni une énigme à deviner ni une illustration à résumer. Elle produit du sens par son format, son espace, sa lumière, sa matière, sa fonction et la place qu’elle impose au spectateur.",
    "keyFacts": [
      "Méthode : distinguer observation, analyse et interprétation",
      "Composition : centre, lignes, profondeur, vides et rapports d’échelle",
      "Forme : couleur, lumière, touche, matière et support",
      "Contexte : commande, lieu, public, usage et circulation",
      "Piège : plaquer une biographie ou un symbole sans preuve visuelle"
    ],
    "express": [
      "Commence par un inventaire précis : format, personnages, objets, gestes, couleurs, lumière, profondeur et matière. Dire ce qui est visible évite de transformer une impression personnelle en certitude.",
      "Demande ensuite comment le regard est conduit. Dans Les Ménines de Velázquez, les regards, le miroir, la porte du fond et la présence du peintre compliquent la place du spectateur. Dans une toile du Caravage, un faisceau lumineux peut isoler l’instant décisif et hiérarchiser les figures.",
      "Enfin, relie les choix formels à la fonction de l’œuvre : retable destiné à une église, portrait de pouvoir, image de presse, affiche politique, objet rituel ou œuvre conçue pour un musée. Une interprétation solide part toujours d’indices visibles et d’un contexte vérifiable."
    ],
    "complete": [
      {
        "title": "1. Trois opérations différentes",
        "text": "Observer consiste à relever des faits visibles sans encore les expliquer : une figure centrale, une diagonale, un contraste clair-obscur, une surface lisse ou une touche épaisse. Analyser consiste à montrer les relations entre ces éléments : la diagonale accélère-t-elle la scène ? Le vide isole-t-il un personnage ? La lumière désigne-t-elle un geste ? Interpréter consiste enfin à proposer un sens en s’appuyant sur cette analyse et sur le contexte.\n\nCette distinction protège contre deux erreurs opposées : la description qui n’aboutit à aucune idée, et l’interprétation libre qui ne peut être justifiée par rien dans l’œuvre."
      },
      {
        "title": "2. La composition fabrique un parcours",
        "text": "La composition répartit les masses, les lignes, les couleurs et les vides. Une figure placée au centre n’a pas le même statut qu’une figure coupée par le bord. Une diagonale peut créer une poussée, une symétrie installer l’ordre, un espace vide produire attente ou solitude. Les rapports d’échelle sont tout aussi parlants : agrandir un souverain, réduire une foule ou écraser un corps sous une architecture construit déjà une hiérarchie.\n\nDans Les Ménines, Velázquez ne donne pas un centre simple. L’infante attire d’abord le regard, mais le miroir du fond, la silhouette dans l’embrasure et le peintre au travail déplacent sans cesse la question : qui regarde qui ? L’espace devient le sujet autant que la scène de cour."
      },
      {
        "title": "3. Lumière, couleur et matière ne décorent pas",
        "text": "Le clair-obscur du Caravage ne sert pas seulement à rendre une scène spectaculaire : la lumière découpe les corps, suspend un instant et peut donner au geste une valeur spirituelle ou dramatique. Chez Monet, la touche visible et les variations colorées ne cherchent pas la même stabilité : elles rendent la lumière changeante et la perception momentanée.\n\nIl faut aussi regarder le support et la matière. Une fresque liée au mur, une peinture sur bois, une huile sur toile, une photographie, une sculpture polie ou une installation traversable engagent différemment le corps du spectateur. Le sens passe donc aussi par la manière dont l’œuvre occupe l’espace réel."
      },
      {
        "title": "4. Une œuvre a une fonction avant d’avoir un cartel",
        "text": "Beaucoup d’œuvres aujourd’hui exposées au musée n’ont pas été créées pour ce lieu. Un retable devait organiser la prière dans une église ; un portrait officiel devait rendre visible un rang ; une tapisserie pouvait isoler du froid tout en affichant richesse et mémoire dynastique ; une estampe pouvait circuler en de nombreux exemplaires.\n\nLa commande, le lieu d’origine, le public et les conditions de visibilité changent donc l’analyse. Une image aperçue de loin dans une nef, portée en procession, collée dans la rue ou contemplée seule dans une salle blanche ne produit pas le même rapport au regard."
      },
      {
        "title": "5. Construire une interprétation démontrable",
        "text": "Une bonne analyse peut tenir en une phrase construite : « L’artiste utilise tel choix formel pour produire tel effet dans tel contexte. » On peut ensuite démontrer cette idée avec deux ou trois indices précis. Par exemple : « Le fort contraste lumineux isole le geste principal et transforme une scène ordinaire en apparition. »\n\nIl reste toujours une part de discussion. Une interprétation n’est pas une solution secrète détenue par l’expert ; c’est une hypothèse argumentée. Elle devient plus convaincante lorsqu’elle explique plusieurs éléments de l’œuvre sans contredire ce que l’on sait de sa fonction et de son époque."
      }
    ],
    "deeper": [
      {
        "title": "Le piège du symbole universel",
        "text": "Une couleur ou un objet ne possède pas un sens fixe dans toutes les cultures et toutes les périodes. Il faut vérifier son usage dans l’œuvre et son contexte."
      },
      {
        "title": "Le musée transforme le regard",
        "text": "Cadre, éclairage, cartel et isolement esthétique peuvent faire oublier l’usage religieux, politique ou quotidien d’origine."
      },
      {
        "title": "Une mini-grille efficace",
        "text": "Qu’est-ce que je vois ? Comment mon regard est-il conduit ? Quel effet cela produit-il ? Pour qui et pour quel usage l’œuvre a-t-elle été faite ?"
      }
    ],
    "takeaways": [
      {
        "label": "Observer",
        "text": "Décrire des indices visibles avant de chercher un sens."
      },
      {
        "label": "Analyser",
        "text": "Montrer comment espace, lumière, couleur et matière agissent ensemble."
      },
      {
        "label": "Contextualiser",
        "text": "Replacer l’œuvre dans sa commande, son lieu et son public."
      },
      {
        "label": "Interpréter",
        "text": "Proposer une idée démontrée, non une intuition gratuite."
      }
    ],
    "editorialRevision": "beta175"
  },
  "art-renaissance-perspective": {
    "hook": "La Renaissance ne se résume pas à des artistes qui auraient soudain appris à dessiner correctement. Elle transforme les rapports entre atelier, savoir mathématique, Antiquité, commanditaire et représentation du corps humain.",
    "keyFacts": [
      "Foyers : villes italiennes des XVe et XVIe siècles, puis diffusion européenne",
      "Perspective linéaire : espace construit depuis un point de vue",
      "Repères : Brunelleschi, Alberti, Masaccio, Léonard, Michel-Ange, Raphaël",
      "Continuités : commandes religieuses, ateliers et héritages médiévaux",
      "Nuance : les Renaissance italiennes et nordiques ne suivent pas un modèle unique"
    ],
    "express": [
      "Dans les villes italiennes du XVe siècle, peintres, architectes et commanditaires expérimentent de nouvelles manières d’organiser l’espace. Brunelleschi est associé aux premières démonstrations de perspective ; Alberti en formule les principes dans un traité ; Masaccio les rend spectaculaires dans La Trinité.",
      "La perspective linéaire fait converger des lignes vers un point de fuite et suppose un observateur placé à un endroit théorique. Elle ne reproduit pas mécaniquement la vision : elle construit une image cohérente selon une méthode géométrique.",
      "Mais la Renaissance ne rompt pas avec tout le Moyen Âge. Les sujets religieux restent majoritaires, les ateliers travaillent collectivement et les mécènes utilisent l’art pour leur salut, leur prestige ou leur pouvoir. Le changement tient à une nouvelle combinaison de traditions, d’Antiquité réinterprétée, d’observation et de savoirs techniques."
    ],
    "complete": [
      {
        "title": "1. Des villes, des ateliers et des commanditaires",
        "text": "Florence, Rome, Venise ou Mantoue concentrent richesses, rivalités politiques, chantiers religieux et commandes privées. Familles marchandes, confréries, papes et princes financent chapelles, palais, portraits et monuments. L’artiste reste longtemps un artisan formé en atelier, entouré d’apprentis et de collaborateurs ; l’image du génie solitaire est en partie une construction postérieure.\n\nLa commande impose dimensions, matériaux, sujet, délais et parfois détails iconographiques. L’innovation se développe donc à l’intérieur de contraintes très concrètes."
      },
      {
        "title": "2. La perspective est une machine visuelle",
        "text": "Vers 1420, Brunelleschi aurait réalisé à Florence des expériences montrant comment faire coïncider une image peinte avec un point de vue réel. En 1435, Alberti décrit la peinture comme une « fenêtre » et propose une construction géométrique de l’espace. Dans La Trinité de Masaccio, à Santa Maria Novella, l’architecture peinte semble prolonger le mur en profondeur.\n\nLes lignes orthogonales convergent vers un point de fuite placé à hauteur du regard. La diminution régulière des objets crée une cohérence spatiale. Cette méthode ne constitue pourtant pas la seule perspective possible : perspective atmosphérique, chevauchement, variation de netteté et couleur participent aussi à la profondeur."
      },
      {
        "title": "3. Antiquité, corps et humanisme",
        "text": "Les artistes étudient ruines, statues, textes et proportions antiques, mais ils ne copient pas simplement un passé retrouvé. Ils sélectionnent, recomposent et adaptent. Le nu, la posture contrapposto, les ordres architecturaux et les récits mythologiques retrouvent une forte visibilité.\n\nL’intérêt pour l’anatomie et le mouvement conduit à observer davantage le corps. Léonard dissèque et dessine ; Michel-Ange donne aux figures une puissance sculpturale. L’humanisme valorise les capacités de l’être humain, sans abolir la religion : les mêmes moyens servent très souvent à rendre plus présente une histoire chrétienne."
      },
      {
        "title": "4. Il n’existe pas une seule Renaissance",
        "text": "À Florence, le dessin et la construction spatiale occupent une place forte ; à Venise, la couleur, la lumière et les possibilités de la peinture à l’huile prennent une importance particulière. Dans les anciens Pays-Bas, Jan van Eyck et d’autres peintres développent un rendu minutieux des matières, reflets et détails grâce à une maîtrise raffinée de l’huile.\n\nLes échanges circulent par les œuvres, les artistes, les gravures et les cours princières. Parler de « Renaissance » est utile, mais le terme ne doit pas effacer les chronologies et les solutions différentes selon les régions."
      },
      {
        "title": "5. Une rupture réelle, mais non totale",
        "text": "La Renaissance modifie le statut social de certains artistes, la théorie de l’art et l’ambition intellectuelle de la peinture. Pourtant, elle conserve ateliers, sujets sacrés, fonctions dévotionnelles et nombreuses conventions héritées. Elle ne remplace pas brutalement un Moyen Âge obscur par la modernité.\n\nSon importance vient plutôt de la convergence de plusieurs transformations : espace mesurable, retour critique à l’Antiquité, observation du corps et de la nature, affirmation de l’auteur, circulation des images et compétition des pouvoirs par l’art."
      }
    ],
    "deeper": [
      {
        "title": "Pourquoi le point de vue compte",
        "text": "La perspective linéaire suppose un œil placé à un endroit déterminé. Elle organise donc aussi la position idéale du spectateur."
      },
      {
        "title": "Le mot « artiste »",
        "text": "Au XVe siècle, le peintre reste lié au monde des métiers. La reconnaissance intellectuelle et sociale progresse, mais de manière inégale."
      },
      {
        "title": "Un exemple à regarder",
        "text": "Dans La Trinité de Masaccio, cherche le point de fuite, l’échelle des figures et la manière dont l’architecture peinte ouvre fictivement le mur."
      }
    ],
    "takeaways": [
      {
        "label": "Perspective",
        "text": "Une construction géométrique de la profondeur, non une copie automatique du réel."
      },
      {
        "label": "Contexte",
        "text": "Ateliers, mécènes et rivalités urbaines rendent l’innovation possible."
      },
      {
        "label": "Humanisme",
        "text": "L’Antiquité et l’étude du corps sont réinterprétées dans un monde toujours chrétien."
      },
      {
        "label": "Nuance",
        "text": "Il existe plusieurs foyers et plusieurs manières de faire Renaissance."
      }
    ],
    "editorialRevision": "beta175"
  },
  "art-impressionism-modern-life": {
    "hook": "L’impressionnisme ne naît pas seulement d’une envie de peindre de jolies lumières. Il répond à un système officiel des arts, à une ville transformée, à de nouveaux loisirs et à une question radicale : comment peindre ce que l’œil perçoit avant que l’instant ne disparaisse ?",
    "keyFacts": [
      "Repère : première exposition collective indépendante en 1874",
      "Nom : lié à Impression, soleil levant de Monet et à une critique moqueuse",
      "Sujets : ville, gares, spectacles, loisirs, paysages et vie moderne",
      "Techniques : touche visible, couleurs juxtaposées, cadrages audacieux",
      "Nuance : Degas, Morisot, Renoir ou Monet n’ont ni les mêmes sujets ni la même méthode"
    ],
    "express": [
      "En France, en 1874, des artistes exposent hors du Salon officiel dans l’ancien atelier du photographe Nadar. Le critique Louis Leroy tourne en dérision Impression, soleil levant de Monet ; le mot « impressionniste » finit par désigner le groupe.",
      "Leur peinture privilégie souvent les effets changeants de lumière, les touches visibles et les ombres colorées. Le plein air est facilité par le matériel transportable et le chemin de fer, mais tout n’est pas peint directement dehors : Degas construit beaucoup ses scènes d’atelier, de répétition ou de spectacle.",
      "Les sujets sont ceux de la société contemporaine : boulevards haussmanniens, gares, cafés, opéras, canotage et promenades. Cette modernité a aussi ses limites sociales : les possibilités d’observer librement la ville ne sont pas les mêmes pour Berthe Morisot ou Mary Cassatt que pour leurs collègues masculins."
    ],
    "complete": [
      {
        "title": "1. Sortir du Salon sans sortir du marché",
        "text": "Au XIXe siècle, le Salon parisien reste un passage majeur pour obtenir visibilité, commandes et reconnaissance. Son jury favorise souvent grandes compositions historiques, dessin fini et surface lisse. Plusieurs peintres refusés ou insatisfaits cherchent d’autres voies. L’exposition de 1874 n’est pas un geste romantique hors de toute économie : les artistes veulent aussi rencontrer directement critiques, collectionneurs et public.\n\nLe groupe est hétérogène. Monet, Renoir, Degas, Pissarro, Sisley, Morisot ou Cézanne ne partagent pas exactement la même peinture, mais ils défendent la possibilité d’exposer indépendamment."
      },
      {
        "title": "2. Peindre une perception en train de se faire",
        "text": "Les contours peuvent rester ouverts, les touches visibles et les couleurs être juxtaposées plutôt que longuement fondues. Les ombres ne sont pas nécessairement noires : elles réfléchissent les couleurs de l’environnement. Dans les séries de Monet consacrées aux meules, à la cathédrale de Rouen ou aux nymphéas, le motif compte autant comme support de variations lumineuses que comme sujet.\n\nL’impression d’esquisse n’est donc pas absence de travail. Il faut décider très vite de rapports colorés, simplifier et recomposer. L’apparente spontanéité est souvent le résultat d’une méthode exigeante."
      },
      {
        "title": "3. Une peinture de la vie moderne",
        "text": "Paris change avec les transformations haussmanniennes : larges boulevards, gares, nouveaux lieux de consommation et de spectacle. Les peintres montrent cette expérience urbaine, mais aussi les loisirs rendus possibles par les transports : bords de Seine, canotage, guinguettes et stations de bord de mer.\n\nDegas choisit les coulisses de l’Opéra, les répétitions et les cadrages décentrés ; Caillebotte peint rues, balcons et perspectives urbaines ; Renoir rassemble une sociabilité lumineuse. Ces scènes ne sont pas de simples documents : cadrage, point de vue et couleur construisent une vision de la modernité."
      },
      {
        "title": "4. Photographie, estampes japonaises et nouveaux cadrages",
        "text": "La photographie libère-t-elle la peinture de la copie ? La formule est trop simple, mais le nouveau médium modifie les habitudes visuelles : instantané, découpe du cadre, poses inhabituelles et étude du mouvement. Les estampes japonaises, très présentes en Europe, montrent aussi des compositions asymétriques, des aplats et des points de vue élevés qui intéressent de nombreux artistes.\n\nCes influences ne produisent pas une recette unique. Elles élargissent le vocabulaire visuel et encouragent des images où un personnage peut être coupé par le bord ou le centre laissé vide."
      },
      {
        "title": "5. Une modernité avec des angles morts",
        "text": "Les femmes artistes participent pleinement au mouvement, mais leurs sujets reflètent parfois les espaces auxquels la société leur donne accès. Berthe Morisot et Mary Cassatt peignent intérieurs, jardins, maternité, théâtre ou sociabilité bourgeoise sans que ces thèmes soient moins modernes. Leur regard permet justement de voir la modernité depuis d’autres positions sociales.\n\nL’impressionnisme ouvre la voie à de nouvelles recherches sur la couleur et la perception, mais les générations suivantes — néo-impressionnistes, postimpressionnistes, fauves — critiquent aussi son caractère jugé trop fugitif et cherchent d’autres structures."
      }
    ],
    "deeper": [
      {
        "title": "Le mythe de la peinture instantanée",
        "text": "Une toile peut sembler capturer une seconde tout en ayant été longuement reprise en atelier."
      },
      {
        "title": "Le rôle du matériel",
        "text": "Tubes de peinture, chevalets portatifs et chemins de fer facilitent le travail dehors, sans expliquer à eux seuls l’invention artistique."
      },
      {
        "title": "Une question sociale",
        "text": "Demande qui peut circuler librement dans la ville, fréquenter certains lieux ou regarder sans être regardé : le point de vue dépend aussi du genre et de la classe."
      }
    ],
    "takeaways": [
      {
        "label": "1874",
        "text": "Une exposition indépendante donne une visibilité collective au mouvement."
      },
      {
        "label": "Perception",
        "text": "La lumière et la couleur changeantes deviennent un sujet central."
      },
      {
        "label": "Modernité",
        "text": "La ville, les loisirs et les transports entrent dans la peinture."
      },
      {
        "label": "Diversité",
        "text": "L’impressionnisme rassemble des pratiques et des expériences sociales différentes."
      }
    ],
    "editorialRevision": "beta175"
  },
  "cinema-shot-frame-basics": {
    "hook": "Le scénario dit peut-être qu’un personnage entre dans une pièce. Le cinéma, lui, doit décider d’où nous le voyons, pendant combien de temps, avec quelle focale, quel mouvement, quel son et quelle portion du monde laissée hors champ.",
    "keyFacts": [
      "Plan : prise continue entre deux coupes dans le film monté",
      "Cadre : limite visible qui sélectionne et hiérarchise",
      "Échelle : du plan d’ensemble au très gros plan, selon le contexte",
      "Point de vue : information, émotion et position morale du spectateur",
      "Hors-champ : espace invisible rendu présent par son, regard ou action"
    ],
    "express": [
      "Un plan n’est pas seulement une taille d’image. Il combine durée, distance, angle, focale, mouvement et organisation interne. Un gros plan peut révéler une émotion, cacher le contexte ou transformer un objet banal en indice.",
      "Le cadre crée immédiatement un hors-champ. Dans Les Dents de la mer, la menace existe longtemps par la musique, les réactions et l’espace invisible ; dans Fenêtre sur cour, le cadrage limite volontairement notre savoir à ce que le protagoniste peut observer depuis son appartement.",
      "Pour analyser, évite les traductions automatiques du type « plongée = faiblesse ». Décris le choix, compare-le au reste de la scène et demande ce qu’il nous permet de savoir, de ressentir ou de manquer."
    ],
    "complete": [
      {
        "title": "1. Le plan est une unité de temps et de regard",
        "text": "Dans le film monté, un plan est généralement la portion comprise entre deux coupes. Sa durée peut être inférieure à une seconde ou s’étendre sur plusieurs minutes. Un plan long laisse au spectateur davantage de liberté pour explorer l’espace, mais il peut aussi créer attente ou enfermement ; un montage très découpé peut produire énergie, confusion ou précision analytique.\n\nIl faut distinguer le plan du tournage, la prise réellement enregistrée, et le plan tel qu’il apparaît après sélection et montage. Une même action peut avoir été filmée plusieurs fois et depuis plusieurs angles."
      },
      {
        "title": "2. L’échelle du plan distribue l’information",
        "text": "Un plan d’ensemble situe les corps dans un espace ; un plan moyen rend les gestes lisibles ; un gros plan isole un visage ou un détail. Mais aucun effet n’est automatique. Un gros plan peut créer intimité, menace, comique ou enquête selon le jeu, le son et ce qui précède. Un plan large peut libérer un personnage ou au contraire montrer qu’il est minuscule dans un décor hostile.\n\nL’échelle est relative : un « plan américain » ou un « plan rapproché » sont des conventions utiles, pas des mesures universelles. L’important est la relation entre le sujet et l’espace qui lui est accordé."
      },
      {
        "title": "3. Angle, focale et mouvement ne disent pas la même chose",
        "text": "La plongée et la contre-plongée désignent la hauteur et l’orientation de la caméra. La focale, elle, modifie le champ visible et la sensation de profondeur : un grand-angle accentue souvent les distances, tandis qu’une longue focale rapproche visuellement les plans. Le travelling déplace la caméra ; le panoramique la fait pivoter ; le zoom modifie la focale sans déplacement physique.\n\nConfondre ces outils empêche de comprendre l’effet. Un travelling avant et un zoom avant peuvent agrandir le sujet, mais ils ne transforment pas l’espace de la même manière. Le célèbre « travelling compensé » joue précisément sur cette différence."
      },
      {
        "title": "4. Le hors-champ fabrique un monde plus grand que l’image",
        "text": "Le cadre ne supprime pas ce qui est hors de l’image : il peut au contraire le rendre plus actif. Un bruit, une ombre, un regard dirigé vers le bord ou l’entrée soudaine d’un personnage construisent un espace invisible. Dans le cinéma d’horreur, ne pas montrer peut laisser l’imagination travailler ; dans un dialogue, le champ-contrechamp fait exister alternativement chacun des interlocuteurs.\n\nLe hors-champ est aussi un choix moral. Montrer frontalement une violence, la laisser hors cadre ou ne filmer que ses conséquences ne place pas le spectateur dans la même position."
      },
      {
        "title": "5. Une méthode d’analyse en quatre questions",
        "text": "D’abord : que montre exactement le plan et combien de temps dure-t-il ? Ensuite : où la caméra est-elle placée, et comment l’espace est-il organisé ? Puis : quelle information est donnée ou retenue ? Enfin : comment ce choix s’articule-t-il au plan précédent, au son et au récit ?\n\nUne analyse devient forte lorsqu’elle relie forme et effet. Au lieu d’écrire « il y a un gros plan », écris : « Le gros plan coupe le personnage de son environnement et rend son hésitation plus importante que l’action autour de lui. »"
      }
    ],
    "deeper": [
      {
        "title": "Le plan-séquence",
        "text": "C’est un plan long qui prend en charge une séquence entière ou une grande partie de celle-ci. Il ne signifie pas absence de mise en scène : déplacements, profondeur et rythme doivent y être organisés avec précision."
      },
      {
        "title": "La règle des 180 degrés",
        "text": "Dans un dialogue classique, la caméra reste souvent du même côté d’un axe imaginaire afin de maintenir les directions de regard. La franchir peut désorienter volontairement."
      },
      {
        "title": "Un exercice",
        "text": "Regarde trente secondes sans le son, puis écoute-les sans l’image. Note ce que le cadre et le son racontent séparément avant d’étudier leur combinaison."
      }
    ],
    "takeaways": [
      {
        "label": "Plan",
        "text": "Une durée filmée et organisée, pas une simple photographie."
      },
      {
        "label": "Cadre",
        "text": "Il montre, cache et hiérarchise."
      },
      {
        "label": "Hors-champ",
        "text": "L’espace invisible peut devenir un moteur du récit."
      },
      {
        "label": "Analyse",
        "text": "Toujours relier le choix technique à l’information et à l’effet produits."
      }
    ],
    "editorialRevision": "beta175"
  },
  "cinema-early-lumiere-melies": {
    "hook": "Le cinéma n’a pas un unique jour de naissance ni deux pères qui auraient tout inventé. Il résulte de recherches sur la photographie, la projection, la décomposition du mouvement, les spectacles optiques et l’industrialisation des images.",
    "keyFacts": [
      "Repère français : séance publique payante du Cinématographe Lumière le 28 décembre 1895",
      "Concurrences : Edison, Dickson, Skladanowsky, Reynaud et de nombreux opérateurs",
      "Lumière : vues brèves, cadrage, profondeur et circulation mondiale",
      "Méliès : mise en scène, décors, trucages et univers fictionnels",
      "Nuance : le cinéma dit « muet » était souvent accompagné de musique, bruitage ou commentaire"
    ],
    "express": [
      "En 1895, le Cinématographe Lumière combine prise de vues, tirage et projection. La séance du 28 décembre à Paris devient un repère, mais d’autres dispositifs existent déjà, notamment le Kinétoscope d’Edison et Dickson, consulté individuellement.",
      "Les vues Lumière semblent enregistrer le quotidien : sortie d’usine, repas, arrivée d’un train. Pourtant, cadrage, choix du moment et parfois répétition organisent déjà le réel. Les opérateurs envoyés dans le monde filment aussi cérémonies, villes et empires coloniaux.",
      "Georges Méliès, homme de théâtre et illusionniste, explore l’autre puissance du médium : faire apparaître, disparaître, transformer et voyager. Le Voyage dans la Lune, en 1902, combine tableaux, décors, trucages et récit spectaculaire. Dès le début, le cinéma documente et fabrique."
    ],
    "complete": [
      {
        "title": "1. Avant 1895, le mouvement est déjà un laboratoire",
        "text": "Au XIXe siècle, la lanterne magique projette des images ; le phénakistiscope et le zoetrope créent une illusion de mouvement ; Muybridge et Marey décomposent les gestes par la photographie. La pellicule souple et les mécanismes d’entraînement rendent ensuite possible une succession rapide d’images.\n\nEdison et William Kennedy Laurie Dickson développent le Kinétographe et le Kinétoscope, qui permet à une personne de regarder un court film dans une machine. Les Lumière se distinguent notamment par un appareil léger et une projection collective, mais ils s’inscrivent dans une compétition internationale."
      },
      {
        "title": "2. Les vues Lumière sont plus construites qu’elles n’en ont l’air",
        "text": "La Sortie de l’usine Lumière à Lyon ou L’Arrivée d’un train en gare de La Ciotat donnent une forte impression de présence. La caméra fixe laisse les mouvements se déployer dans la profondeur : ouvriers, voyageurs, véhicules et fumée traversent le cadre. Plusieurs versions de certaines vues montrent pourtant qu’il existe choix, reprise et organisation.\n\nL’histoire selon laquelle le public aurait fui devant le train est devenue un mythe célèbre, mais elle n’est pas solidement établie. L’étonnement vient moins d’une confusion totale avec la réalité que de la nouveauté d’un monde photographique mis en mouvement."
      },
      {
        "title": "3. Les opérateurs inventent un regard mondial",
        "text": "La société Lumière envoie des opérateurs dans de nombreuses régions pour tourner et présenter des films. Ils rapportent paysages, cérémonies, activités urbaines et événements politiques. Ces images constituent aujourd’hui des archives précieuses, mais elles reflètent aussi les regards et les rapports de pouvoir de leur époque, notamment dans les contextes coloniaux.\n\nLe cinéma devient très vite un réseau : les films circulent, les appareils se copient, les publics locaux interprètent les images et de nouvelles sociétés de production apparaissent."
      },
      {
        "title": "4. Méliès transforme la coupe en magie",
        "text": "Méliès vient du théâtre Robert-Houdin et connaît les mécanismes de l’illusion. Il utilise arrêt de caméra, substitutions, surimpressions, caches, décors peints et montage de tableaux. La caméra peut enregistrer un trucage, mais aussi produire une transformation impossible sur scène.\n\nDans Le Voyage dans la Lune, les savants, l’obus planté dans l’œil de la Lune et les Sélénites composent moins une anticipation scientifique qu’une féerie satirique. La mise en scène frontale rappelle le théâtre, tandis que le montage relie une succession de mondes."
      },
      {
        "title": "5. Un art déjà multiple et rarement silencieux",
        "text": "Alice Guy réalise très tôt des films de fiction chez Gaumont ; Edwin S. Porter développe des récits montés aux États-Unis ; écoles, attractions foraines et salles permanentes transforment les conditions de projection. Les films peuvent être coloriés à la main ou au pochoir.\n\nSurtout, le cinéma muet n’est généralement pas muet dans la salle. Pianiste, orchestre, bruiteur, conférencier ou bonimenteur accompagnent les images. Le spectacle varie donc selon le lieu. Dès ses premières années, le cinéma est à la fois technique, industrie, performance et langage en construction."
      }
    ],
    "deeper": [
      {
        "title": "Le 28 décembre 1895",
        "text": "Cette date est un repère commode pour la projection commerciale Lumière à Paris, pas la création soudaine de tout le cinéma mondial."
      },
      {
        "title": "Document ou fiction ?",
        "text": "La frontière est poreuse dès le départ : une vue réelle est cadrée et organisée ; une féerie conserve les gestes et les décors d’un spectacle concret."
      },
      {
        "title": "Un oublié à retenir",
        "text": "Alice Guy fait partie des premières personnes à développer systématiquement le cinéma de fiction et dirige ensuite une carrière de production des deux côtés de l’Atlantique."
      }
    ],
    "takeaways": [
      {
        "label": "Invention collective",
        "text": "Le cinéma résulte de plusieurs techniques et de nombreux inventeurs."
      },
      {
        "label": "Lumière",
        "text": "La projection collective et les vues en profondeur donnent une nouvelle présence au réel."
      },
      {
        "label": "Méliès",
        "text": "Le film devient espace de trucage, de décor et d’imaginaire."
      },
      {
        "label": "Spectacle",
        "text": "Même sans parole enregistrée, les projections étaient souvent sonorisées sur place."
      }
    ],
    "editorialRevision": "beta175"
  },
  "cinema-hollywood-studio-system": {
    "hook": "Le Hollywood classique n’est pas seulement une collection de vieux films célèbres. C’est une organisation industrielle qui coordonne capitaux, studios, contrats, genres, censure, publicité et formes narratives afin de produire régulièrement des films lisibles pour un immense public.",
    "keyFacts": [
      "Période centrale : années 1930 à 1950",
      "Big Five : MGM, Paramount, Warner Bros., 20th Century-Fox et RKO",
      "Intégration verticale : production, distribution et exploitation liées",
      "Style : continuité, causalité, objectifs clairs et montage souvent invisible",
      "Tournant : décision antitrust Paramount de 1948, télévision et essor des indépendants"
    ],
    "express": [
      "Les grands studios disposent de plateaux, décors, équipes techniques, scénaristes et vedettes sous contrat. Les plus puissants contrôlent aussi distribution et réseaux de salles, ce qui sécurise la diffusion de leurs productions.",
      "Le film classique cherche souvent à rendre la narration fluide : raccords de regard et de mouvement, champ-contrechamp, musique guidant l’émotion et intrigue organisée autour d’objectifs et d’obstacles. Ce style paraît naturel parce qu’il cache en partie son travail.",
      "Genres et stars réduisent l’incertitude industrielle. Un western, une comédie musicale ou un film noir promettent certains plaisirs, tandis que le studio façonne l’image publique de ses acteurs. Mais ce système impose aussi discipline, hiérarchies, stéréotypes et contrôle moral avec le Code de production."
    ],
    "complete": [
      {
        "title": "1. Une industrie intégrée",
        "text": "Dans le système des studios, chaque compagnie possède une identité, des infrastructures et un personnel relativement stable. MGM cultive le prestige et les grandes vedettes ; Warner Bros. est associée à des récits urbains et sociaux plus nerveux ; Universal, Columbia ou United Artists occupent d’autres positions. Les catégories de « majors » et de studios secondaires correspondent à des puissances économiques différentes.\n\nL’intégration verticale permet aux plus grands groupes de produire les films, de les distribuer et de les programmer dans leurs propres salles. Le block booking oblige parfois les exploitants à accepter un ensemble de titres pour obtenir les plus désirés."
      },
      {
        "title": "2. Le style classique rend la fabrication presque invisible",
        "text": "La continuité spatiale et temporelle aide le spectateur à suivre l’action sans devoir reconstruire chaque coupe. Un personnage regarde hors champ ; le plan suivant montre ce qu’il voit. Un geste commencé dans un plan se poursuit dans le suivant. La ligne des 180 degrés stabilise les directions de regard.\n\nCette clarté ne signifie pas uniformité. Citizen Kane exploite profondeur de champ, angles bas et structures temporelles complexes ; les comédies de Hawks ou Lubitsch jouent sur le rythme verbal ; Hitchcock transforme les règles de point de vue en machine à suspense. Le système fournit une grammaire que les cinéastes peuvent pousser, détourner ou rendre visible."
      },
      {
        "title": "3. Les genres sont des contrats évolutifs",
        "text": "Le western organise frontière, violence et formation d’un ordre ; la comédie musicale articule récit et spectacle ; le mélodrame rend visibles conflits familiaux et contraintes sociales ; le film noir associe crime, ville nocturne, fatalité et ambiguïté morale. Un genre n’est pas un moule fixe : il change avec les préoccupations historiques et les innovations formelles.\n\nPour le studio, il facilite la réutilisation de décors, compétences et vedettes. Pour le public, il crée des attentes. Le plaisir peut venir de la répétition, mais aussi de la variation inattendue."
      },
      {
        "title": "4. Stars, travail et contrôle",
        "text": "Le star-system est la construction d’acteurs comme images publiques capables d’attirer un public. Les studios fabriquent la star par rôles, photographies, presse et récits biographiques contrôlés. Le nom d’un acteur devient une promesse commerciale. Cette visibilité repose cependant sur une forte discipline contractuelle et sur le travail moins visible de scénaristes, monteurs, costumiers, chefs opérateurs, décorateurs et techniciens.\n\nÀ partir de 1934, le Code de production encadre plus strictement sexualité, violence, crime et représentation morale. Il ne supprime pas l’ambiguïté : les films développent ellipses, sous-entendus et détours. Il contribue néanmoins à limiter certaines vies et identités à l’écran et à maintenir de nombreux stéréotypes raciaux et sociaux."
      },
      {
        "title": "5. Déclin du système, permanence du modèle",
        "text": "En 1948, la décision United States v. Paramount Pictures contraint les grands studios à se séparer progressivement de leurs salles et s’attaque à certaines pratiques de distribution. La télévision concurrence les sorties, le public se déplace vers les banlieues et les contrats de long terme se raréfient. Le studio classique se transforme plutôt qu’il ne disparaît d’un coup.\n\nSon héritage reste immense : narration causale, genres, vedettes, promotion mondiale et recherche d’une lisibilité maximale structurent encore une grande partie du cinéma populaire et des séries contemporaines."
      }
    ],
    "deeper": [
      {
        "title": "Pourquoi le montage paraît « invisible »",
        "text": "Il oriente continuellement le regard, mais respecte des raccords qui empêchent souvent le spectateur de sentir la rupture entre les plans."
      },
      {
        "title": "Le film noir est-il un genre ?",
        "text": "Les historiens discutent encore : genre industriel, cycle, style ou catégorie critique construite après coup. Cette hésitation est elle-même instructive."
      },
      {
        "title": "Un système contradictoire",
        "text": "La standardisation industrielle peut produire des œuvres très inventives parce que les artistes négocient avec des règles, des genres et des contraintes partagées."
      }
    ],
    "takeaways": [
      {
        "label": "Industrie",
        "text": "Le studio coordonne production, distribution, personnel et promotion."
      },
      {
        "label": "Style",
        "text": "La continuité rend le récit fluide sans abolir l’invention."
      },
      {
        "label": "Genres et stars",
        "text": "Ils organisent les attentes et réduisent le risque commercial."
      },
      {
        "label": "Transformation",
        "text": "Antitrust, télévision et production indépendante modifient le système après 1948."
      }
    ],
    "editorialRevision": "beta175"
  },
  "sci-method-proof-basics": {
    "hook": "La science ne suit pas une recette unique en cinq étapes. Elle construit des questions testables, des modèles, des mesures et des arguments publics capables de résister aux erreurs, aux biais et aux tentatives de réfutation.",
    "keyFacts": [
      "Hypothèse : proposition testable, non simple intuition",
      "Théorie : cadre explicatif robuste, pas une supposition fragile",
      "Mesure : valeur accompagnée d’une incertitude et d’une méthode",
      "Contrôle : comparer en ne faisant varier que ce qui est pertinent",
      "Solidité : réplication, convergence des preuves, critique et transparence"
    ],
    "express": [
      "Une observation surprenante peut conduire à plusieurs explications. Le travail scientifique consiste à les rendre testables : quelles conséquences devrait-on observer si l’hypothèse est correcte, et qu’est-ce qui pourrait montrer qu’elle est fausse ou insuffisante ?",
      "L’expérience contrôlée est puissante, mais toutes les sciences ne peuvent pas manipuler leur objet. Astronomie, climatologie ou évolution combinent observations, modèles, archives naturelles et prédictions. La méthode dépend de la question.",
      "Une théorie scientifique n’est pas une simple idée. C’est un cadre explicatif soutenu par de nombreuses preuves et capable d’unifier des phénomènes, comme la théorie de l’évolution ou la théorie microbienne. Elle reste révisable sans être arbitraire."
    ],
    "complete": [
      {
        "title": "1. De la question à une prédiction risquée",
        "text": "Une hypothèse devient scientifique lorsqu’elle produit des conséquences observables. Dire « cette plante pousse mal parce qu’elle est triste » reste vague ; proposer que son manque de lumière réduit sa croissance permet de définir une comparaison, une durée, une mesure et un résultat attendu.\n\nLe test doit pouvoir mettre l’idée en difficulté. Chercher seulement des exemples qui confirment ce que l’on croit crée un biais de confirmation. Une bonne stratégie imagine aussi ce que l’on devrait observer si l’explication concurrente était correcte."
      },
      {
        "title": "2. Contrôles, variables et causalité",
        "text": "Dans une expérience, on cherche à isoler l’effet d’une variable. Un groupe témoin sert de comparaison ; la randomisation limite certaines différences initiales ; l’aveugle évite que l’attente du participant ou de l’expérimentateur influence le résultat. Ces outils ne sont pas toujours possibles, mais ils montrent le problème central : une association ne prouve pas à elle seule une cause.\n\nSi consommation de glaces et noyades augmentent ensemble, la chaleur peut agir sur les deux. Identifier une variable cachée est souvent plus important que calculer une corrélation impressionnante."
      },
      {
        "title": "3. Mesurer, c’est aussi quantifier le doute",
        "text": "Aucun instrument ne donne une vérité sans marge. Résolution, étalonnage, conditions de mesure et choix du protocole produisent une incertitude. Répéter permet d’estimer la variabilité, mais répéter une procédure biaisée ne supprime pas l’erreur systématique.\n\nLes résultats sont donc accompagnés d’unités, d’intervalles et de méthodes. La précision d’un nombre ne doit jamais dépasser celle des données qui le produisent. Une différence statistique peut en outre être réelle sans avoir une importance pratique majeure."
      },
      {
        "title": "4. Réplication, revue et convergence",
        "text": "La publication ne transforme pas automatiquement un résultat en vérité. Les spécialistes examinent méthodes et cohérence, d’autres équipes tentent de reproduire ou d’étendre l’étude, et plusieurs types de preuves peuvent converger. Une observation isolée, même spectaculaire, reste fragile.\n\nLa transparence sur les données, le protocole et les analyses permet la critique. Les désaccords ne sont pas un échec du système : ils deviennent productifs lorsqu’ils portent sur des preuves et conduisent à de meilleurs tests."
      },
      {
        "title": "5. Hypothèse, modèle, loi et théorie",
        "text": "Une loi décrit une régularité, souvent sous forme mathématique ; un modèle représente certains aspects du réel en les simplifiant ; une théorie explique un vaste ensemble de faits ; une hypothèse propose une réponse plus locale à tester. Ces mots ne forment pas une échelle où l’hypothèse deviendrait loi puis théorie.\n\nUne théorie bien établie peut être précisée sans être entièrement renversée. La mécanique de Newton reste extrêmement efficace à notre échelle même si la relativité en définit les limites. La révision scientifique ressemble souvent à un élargissement du domaine de validité plutôt qu’à un effacement total."
      }
    ],
    "deeper": [
      {
        "title": "La science n’est pas seulement expérimentale",
        "text": "On ne déplace pas une galaxie ni ne répète l’extinction des dinosaures. Les sciences historiques et observationnelles testent des prédictions à partir de traces indépendantes."
      },
      {
        "title": "Le rôle des résultats négatifs",
        "text": "Ne pas observer l’effet attendu peut être informatif, à condition que le test ait été assez sensible et correctement conçu."
      },
      {
        "title": "La bonne question face à une étude",
        "text": "Quelle est la taille de l’échantillon ? Quel est le groupe de comparaison ? L’effet est-il important ? D’autres équipes l’ont-elles retrouvé ?"
      }
    ],
    "takeaways": [
      {
        "label": "Hypothèse",
        "text": "Une explication locale qui accepte d’être testée."
      },
      {
        "label": "Théorie",
        "text": "Un cadre explicatif soutenu par un ensemble convergent de preuves."
      },
      {
        "label": "Incertitude",
        "text": "Mesurer signifie aussi indiquer la qualité et les limites de la mesure."
      },
      {
        "label": "Collectif",
        "text": "La robustesse vient de la critique, de la réplication et de la convergence."
      }
    ],
    "editorialRevision": "beta175"
  },
  "sci-galileo-revolution": {
    "hook": "Galilée n’a ni inventé la lunette ni, à lui seul, prouvé que la Terre tourne autour du Soleil. Son rôle décisif est d’avoir transformé un instrument récent en machine à produire des observations capables de déstabiliser l’ancien ordre du ciel.",
    "keyFacts": [
      "Repère : observations télescopiques publiées dans Le Messager des étoiles en 1610",
      "Découvertes : relief lunaire, satellites de Jupiter, phases de Vénus, taches solaires",
      "Contexte : Copernic, Tycho Brahe et Kepler proposent déjà des systèmes concurrents",
      "Enjeu : fiabilité de l’instrument et interprétation des observations",
      "Procès : condamnation en 1633 dans un conflit religieux, institutionnel et politique complexe"
    ],
    "express": [
      "Au début du XVIIe siècle, Galilée améliore une lunette apparue aux Pays-Bas et la tourne vers le ciel. La Lune n’est pas une sphère parfaitement lisse ; quatre astres changent de position autour de Jupiter ; Vénus présente des phases.",
      "Ces observations n’établissent pas toutes, isolément, l’héliocentrisme. Les satellites de Jupiter montrent surtout que tout ne tourne pas autour de la Terre. Les phases complètes de Vénus rendent impossible l’ancien système ptoléméen simple, mais restent compatibles avec certains modèles hybrides comme celui de Tycho Brahe.",
      "La révolution vient de la combinaison entre instrument, observation répétée, dessin, publication et débat. Il faut convaincre que les taches vues ne sont pas des défauts de la lunette et que les mathématiques peuvent décrire le mouvement réel du monde."
    ],
    "complete": [
      {
        "title": "1. Un ciel déjà en crise avant Galilée",
        "text": "Copernic publie en 1543 un modèle plaçant le Soleil près du centre du monde planétaire. Tycho Brahe produit des observations d’une précision exceptionnelle et propose un système où les planètes tournent autour du Soleil, lui-même tournant autour de la Terre. Kepler montre ensuite que les orbites peuvent être elliptiques.\n\nGalilée intervient donc dans une controverse déjà avancée. Son talent tient à sa capacité à associer instrument, démonstration, écriture en langue accessible et stratégie publique."
      },
      {
        "title": "2. La lunette transforme ce qui compte comme preuve",
        "text": "La lunette n’est pas inventée par Galilée, mais il en augmente le grossissement et apprend à l’utiliser pour l’astronomie. Il doit encore persuader ses contemporains que l’instrument montre le ciel plutôt que ses propres défauts. Il compare les positions nuit après nuit, dessine et fait essayer l’appareil.\n\nLes montagnes lunaires contredisent l’idée d’astres parfaitement lisses ; les taches solaires montrent un Soleil changeant ; la multitude d’étoiles invisibles à l’œil nu agrandit le cosmos. L’instrument ne donne pas seulement plus de détails : il modifie le domaine de l’observable."
      },
      {
        "title": "3. Jupiter et Vénus : deux coups différents",
        "text": "En janvier 1610, Galilée suit quatre points lumineux qui changent de place près de Jupiter. Il comprend qu’ils tournent autour de la planète. Ce petit système prouve qu’un centre de mouvement autre que la Terre existe.\n\nLes phases de Vénus ont une autre portée. Pour présenter toutes les phases observées, Vénus doit tourner autour du Soleil. Le modèle ptoléméen traditionnel ne convient plus. Cela ne suffit pas encore à choisir définitivement entre Copernic et Tycho, mais l’ancienne architecture du cosmos perd une pièce essentielle."
      },
      {
        "title": "4. Pourquoi le conflit ne se réduit pas à « science contre religion »",
        "text": "Les interprétations bibliques, l’autorité de l’Église après la Réforme, la personnalité de Galilée, ses réseaux de protection et la manière dont il présente ses adversaires jouent toutes un rôle. En 1616, l’héliocentrisme est déclaré contraire à l’interprétation officielle de certains passages ; Galilée reçoit l’ordre de ne pas le soutenir comme réalité établie.\n\nSon Dialogue de 1632 compare les systèmes et favorise clairement le mouvement de la Terre. Jugé en 1633, il est contraint d’abjurer et assigné à résidence. Le conflit est bien un affrontement sur le droit de décrire la nature, mais il ne se comprend pas par deux blocs simples et intemporels."
      },
      {
        "title": "5. Une nouvelle pratique du savoir",
        "text": "Galilée combine mathématisation du mouvement, expériences sur les corps et observations instrumentales. Ses conclusions ne sont pas toutes exactes — son explication des marées, par exemple, ne fonctionne pas — mais sa pratique contribue à déplacer l’autorité vers des phénomènes mesurés et publiquement discutables.\n\nL’épisode enseigne aussi qu’une observation n’interprète pas toute seule le monde. Il faut comparer plusieurs modèles, connaître les limites de l’instrument et construire une argumentation capable de distinguer ce qui est observé de ce qui en est déduit."
      }
    ],
    "deeper": [
      {
        "title": "Ce que les satellites de Jupiter prouvent vraiment",
        "text": "Ils réfutent l’idée que tous les mouvements célestes ont nécessairement la Terre pour centre ; ils ne démontrent pas, à eux seuls, le mouvement terrestre."
      },
      {
        "title": "Un instrument controversé",
        "text": "Accepter une nouvelle preuve suppose aussi d’apprendre à reconnaître les artefacts, régler l’appareil et répéter l’observation."
      },
      {
        "title": "Une erreur utile",
        "text": "Galilée défend une mauvaise théorie des marées. Un grand savant peut produire des preuves puissantes sur un point et se tromper sur un autre."
      }
    ],
    "takeaways": [
      {
        "label": "1610",
        "text": "La publication des observations télescopiques change le débat."
      },
      {
        "label": "Instrument",
        "text": "La lunette étend le visible mais exige une validation."
      },
      {
        "label": "Modèles",
        "text": "Une même observation peut éliminer un système sans suffire à choisir immédiatement le bon."
      },
      {
        "label": "Nuance",
        "text": "Le procès mêle preuve, autorité religieuse, politique et communication."
      }
    ],
    "editorialRevision": "beta175"
  },
  "sci-pasteur-microbes-vaccines": {
    "hook": "Pasteur n’a pas découvert seul que les microbes existent, et tous les microbes ne rendent pas malades. Son importance tient à un programme expérimental qui relie micro-organismes, fermentations, altérations, prévention et fabrication raisonnée de certains vaccins.",
    "keyFacts": [
      "Fermentation : activité d’organismes microscopiques spécifiques",
      "Génération spontanée : débat expérimental, notamment avec les ballons à col de cygne",
      "Pasteurisation : chauffage contrôlé pour réduire des micro-organismes indésirables",
      "Vaccination : atténuer ou préparer un agent pour provoquer une protection",
      "Nuance : Lister, Koch, Semmelweis et de nombreux praticiens construisent aussi la révolution microbienne"
    ],
    "express": [
      "Au XIXe siècle, en étudiant vin, bière et fermentations, Pasteur montre que des micro-organismes différents sont associés à des transformations différentes. Le laboratoire relie alors un phénomène invisible à des effets industriels très concrets.",
      "Ses expériences avec des ballons à col de cygne soutiennent l’idée que les micro-organismes viennent de contaminations extérieures plutôt qu’ils n’apparaissent spontanément dans un milieu stérilisé. Le résultat dépend d’un dispositif qui laisse entrer l’air mais retient les poussières.",
      "La vaccination contre la rage en 1885 devient un symbole, mais elle s’inscrit dans une histoire plus large. La théorie microbienne transforme chirurgie, hygiène et santé publique grâce à un réseau de chercheurs, médecins, vétérinaires, laboratoires et institutions."
    ],
    "complete": [
      {
        "title": "1. Des cristaux à la fermentation",
        "text": "Formé à la chimie, Pasteur travaille d’abord sur l’asymétrie de certains cristaux. Ses recherches sur les fermentations l’amènent ensuite à observer levures et bactéries. Il défend l’idée que fermentation lactique, alcoolique ou altérations ne sont pas de simples réactions chimiques spontanées : elles correspondent à l’activité d’organismes particuliers.\n\nCette relation entre type de microbe et transformation donne aux brasseurs, viticulteurs et industriels des moyens de comprendre les échecs de production. La science se construit ici au contact direct de problèmes économiques."
      },
      {
        "title": "2. Le col de cygne et la génération spontanée",
        "text": "Dans les ballons chauffés de Pasteur, le bouillon reste stérile tant que les poussières chargées de germes sont piégées dans la courbure du col. Si le liquide touche ces poussières ou si le col est brisé, des micro-organismes se développent. Le dispositif laisse pourtant circuler l’air, ce qui répond à l’objection selon laquelle une mystérieuse « force vitale » aurait été bloquée.\n\nLe débat ne se règle pas par une expérience magique unique. Il dépend de la qualité des stérilisations, des milieux utilisés et de controverses prolongées. Mais il renforce fortement l’idée d’une contamination provenant de germes préexistants."
      },
      {
        "title": "3. De l’altération à la pasteurisation",
        "text": "Pour limiter certaines altérations du vin ou de la bière, on peut chauffer le liquide à une température contrôlée puis éviter une nouvelle contamination. La pasteurisation ne stérilise pas nécessairement tout et ne rend pas un produit éternel ; elle réduit une partie de la flore indésirable tout en préservant autant que possible les qualités du produit.\n\nLe procédé sera adapté à différents aliments, notamment au lait. Il montre comment une connaissance microbiologique peut devenir une pratique industrielle et sanitaire."
      },
      {
        "title": "4. Atténuer pour protéger",
        "text": "La vaccination existait avant Pasteur, notamment depuis Jenner et la variole. Pasteur et ses collaborateurs développent toutefois une démarche de laboratoire visant à affaiblir ou préparer des agents infectieux pour provoquer une protection. Les expériences sur le choléra des poules et le charbon contribuent à cette approche.\n\nEn 1885, Joseph Meister, mordu par un chien suspecté enragé, reçoit une série de préparations après exposition. Le succès devient un événement public et contribue à la création de l’Institut Pasteur. Les protocoles et le récit héroïque feront ensuite l’objet de discussions historiques, ce qui rappelle que l’innovation médicale possède aussi une dimension éthique."
      },
      {
        "title": "5. Une révolution collective et ses limites",
        "text": "Semmelweis avait montré l’importance du lavage des mains avant que le mécanisme microbien soit largement accepté ; Lister applique l’antisepsie à la chirurgie ; Koch développe des méthodes permettant de relier certains microbes à certaines maladies. La théorie microbienne naît donc d’une constellation de travaux, pas d’un homme seul.\n\nElle ne signifie pas que toute maladie est infectieuse ni que tout micro-organisme est dangereux. Le corps humain héberge une immense diversité microbienne. La leçon durable est plus précise : identifier les agents, leurs voies de transmission et les conditions de contamination permet d’agir rationnellement sur certains risques."
      }
    ],
    "deeper": [
      {
        "title": "Pasteurisation ou stérilisation ?",
        "text": "La pasteurisation réduit la charge microbienne par un chauffage adapté ; la stérilisation vise une élimination beaucoup plus complète."
      },
      {
        "title": "Le mot vaccin",
        "text": "Pasteur généralise ce terme en hommage à Jenner, dont la vaccine avait permis de protéger contre la variole."
      },
      {
        "title": "La science et le récit du héros",
        "text": "Les découvertes sont souvent racontées autour d’un nom, alors qu’elles reposent sur collaborateurs, techniciens, patients, animaux d’expérience et institutions."
      }
    ],
    "takeaways": [
      {
        "label": "Fermentation",
        "text": "Des micro-organismes spécifiques peuvent produire des transformations spécifiques."
      },
      {
        "label": "Expérience",
        "text": "Le col de cygne relie contamination et poussières sans supprimer l’air."
      },
      {
        "label": "Prévention",
        "text": "Pasteurisation et vaccination appliquent une connaissance des microbes."
      },
      {
        "label": "Collectif",
        "text": "La révolution microbienne implique Pasteur, Koch, Lister, Semmelweis et beaucoup d’autres."
      }
    ],
    "editorialRevision": "beta175"
  },
  "eco-supply-demand-basics": {
    "hook": "Le prix d’un billet de concert, d’un appartement ou d’un kilo de café ne vient pas d’une seule volonté. Il résulte d’interactions entre acheteurs, vendeurs, coûts, contraintes de capacité, alternatives et règles — mais le schéma offre-demande n’explique pas tout.",
    "keyFacts": [
      "Demande : quantités souhaitées et solvables à différents prix",
      "Offre : quantités proposées à différents prix compte tenu des coûts et capacités",
      "Déplacement de courbe : changement de revenu, goût, coût, technologie ou nombre d’acteurs",
      "Élasticité : sensibilité des quantités à une variation de prix",
      "Limites : pouvoir de marché, externalités, information inégale et intervention publique"
    ],
    "express": [
      "Quand seul le prix d’un bien change, on se déplace le long d’une courbe. Quand un autre facteur change — revenu, coût de l’énergie, récolte, technologie, goût — c’est toute la relation entre prix et quantité qui se déplace.",
      "Si une gelée détruit une partie de la récolte de café, l’offre diminue : à demande comparable, le prix tend à monter. Si une mode attire soudain davantage d’acheteurs vers un produit dont la production ne peut pas augmenter vite, la demande se déplace et la tension sur le prix augmente.",
      "L’équilibre n’est ni un prix juste ni une garantie de bien-être. Un marché peut exclure les ménages pauvres, polluer ou être dominé par quelques entreprises. Le modèle est une carte pour raisonner, pas une photographie complète de la société."
    ],
    "complete": [
      {
        "title": "1. Une courbe décrit une relation, pas une file de personnes",
        "text": "La demande indique combien les consommateurs seraient prêts et capables d’acheter à différents prix, toutes choses égales par ailleurs. Elle ne se confond pas avec le désir : vouloir une maison sans pouvoir la financer ne constitue pas la même demande effective que disposer d’un budget.\n\nL’offre indique les quantités que les producteurs accepteraient de vendre selon le prix, compte tenu de leurs coûts, capacités et anticipations. Pour de nombreux biens, un prix plus élevé rend rentable une production supplémentaire ; mais à court terme, une salle de concert ou un vignoble ne peuvent pas agrandir instantanément leur capacité."
      },
      {
        "title": "2. Mouvement le long de la courbe ou déplacement ?",
        "text": "Si le prix des fraises baisse et que les consommateurs en achètent davantage, on se déplace le long de la demande. Si les revenus, les goûts ou le prix d’un produit substituable changent, la courbe de demande elle-même se déplace. De même, une nouvelle technologie, une taxe, une hausse des salaires ou un choc énergétique peuvent déplacer l’offre.\n\nCette distinction est fondamentale pour diagnostiquer une hausse de prix. Dire seulement « la demande augmente parce que le prix augmente » inverse souvent la causalité et mélange deux mécanismes."
      },
      {
        "title": "3. Équilibre, pénurie et surplus",
        "text": "Le point d’intersection des courbes représente un prix où quantité demandée et quantité offerte coïncident dans le modèle. En dessous, les acheteurs peuvent demander plus que ce qui est proposé : files d’attente, rationnement ou marché parallèle apparaissent. Au-dessus, des invendus poussent les vendeurs à réduire prix ou production.\n\nDans la réalité, l’ajustement prend du temps. Les stocks, contrats, attentes et coûts de changement ralentissent les mouvements. Un prix peut rester éloigné de l’équilibre théorique pendant longtemps."
      },
      {
        "title": "4. L’élasticité explique pourquoi les réactions diffèrent",
        "text": "L’élasticité-prix mesure la sensibilité de la quantité à une variation de prix. La demande de carburant peut réagir peu à court terme si les déplacements sont indispensables et les alternatives rares ; elle peut réagir davantage à long terme quand les ménages changent de véhicule ou de lieu de vie.\n\nPour un médicament vital sans substitut, la demande est souvent peu élastique. Pour une marque de biscuits parmi beaucoup d’autres, elle peut l’être davantage. Cette différence influence les recettes des entreprises et la répartition du coût d’une taxe."
      },
      {
        "title": "5. Ce que le modèle laisse volontairement de côté",
        "text": "Une entreprise en monopole peut choisir un prix en limitant la quantité. Une pollution impose un coût à des personnes qui ne participent pas à la transaction : c’est une externalité. Un acheteur peut ignorer la qualité réelle d’un produit, créant une asymétrie d’information. Et la capacité à payer distribue l’accès sans juger l’importance sociale du besoin.\n\nTaxes, subventions, normes, services publics ou plafonds de prix cherchent parfois à corriger ces problèmes, mais ils peuvent produire de nouveaux effets. L’analyse économique consiste alors à comparer mécanismes, bénéficiaires, perdants et effets inattendus."
      }
    ],
    "deeper": [
      {
        "title": "Le coût d’opportunité",
        "text": "Choisir une option signifie renoncer à la meilleure alternative disponible. Ce coût invisible éclaire les décisions bien au-delà du prix payé."
      },
      {
        "title": "Un prix plafond",
        "text": "S’il est fixé sous le prix d’équilibre sans politique complémentaire, il peut augmenter la quantité demandée tout en réduisant l’offre, créant pénurie ou rationnement."
      },
      {
        "title": "Une méthode de diagnostic",
        "text": "Face à un prix qui change, cherche d’abord quel facteur extérieur a déplacé l’offre ou la demande, puis demande à quelle vitesse les quantités peuvent réagir."
      }
    ],
    "takeaways": [
      {
        "label": "Courbes",
        "text": "Elles représentent des relations conditionnelles, pas des quantités fixes."
      },
      {
        "label": "Chocs",
        "text": "Revenu, goût, technologie ou coût déplacent offre et demande."
      },
      {
        "label": "Élasticité",
        "text": "Elle mesure la force de la réaction des quantités au prix."
      },
      {
        "label": "Limites",
        "text": "Équilibre de marché ne signifie ni justice ni efficacité sociale complète."
      }
    ],
    "editorialRevision": "beta175"
  },
  "eco-inflation-money-value": {
    "hook": "Quand l’inflation est de 5 %, cela ne signifie pas que tous les prix ont augmenté de 5 %, ni qu’ils vont redescendre lorsque l’inflation ralentit. Cela signifie qu’un indice moyen des prix est plus élevé qu’un an auparavant.",
    "keyFacts": [
      "Inflation : hausse générale et durable du niveau des prix",
      "Indice : panier pondéré de biens et services, non expérience identique pour chacun",
      "Désinflation : inflation qui ralentit ; déflation : niveau général des prix qui baisse",
      "Pouvoir d’achat : dépend des prix mais aussi de l’évolution des revenus",
      "Politique monétaire : les taux agissent avec retard sur crédit, demande et anticipations"
    ],
    "express": [
      "Les instituts statistiques suivent un panier représentatif : logement, énergie, alimentation, transports, services. Chaque poste reçoit un poids. Ton inflation personnelle peut différer si ton budget consacre beaucoup plus que la moyenne à l’essence ou au loyer.",
      "Une inflation de 8 % puis de 3 % signifie que les prix continuent en moyenne d’augmenter, mais moins vite. Pour retrouver l’ancien niveau, il faudrait une baisse générale des prix, c’est-à-dire de la déflation, phénomène distinct et potentiellement dangereux s’il entraîne reports d’achats et alourdissement réel des dettes.",
      "Les causes peuvent se combiner : demande forte, énergie rare, chaînes d’approvisionnement perturbées, marges, salaires et anticipations. Relever les taux freine une partie du crédit et de la demande, mais ne produit pas immédiatement davantage de gaz, de blé ou de logements."
    ],
    "complete": [
      {
        "title": "1. Mesurer une hausse générale",
        "text": "L’inflation n’est pas la hausse spectaculaire d’un seul produit. Elle désigne une progression suffisamment large et durable du niveau des prix. Les statisticiens observent des milliers de prix et construisent un indice pondéré selon la consommation moyenne des ménages.\n\nCette mesure implique des choix : comment tenir compte d’un nouveau téléphone plus performant, d’un changement de qualité ou du remplacement d’un produit ? L’indice est indispensable, mais ce n’est pas un thermomètre parfait et identique pour chaque foyer."
      },
      {
        "title": "2. Taux d’inflation et niveau des prix",
        "text": "Supposons un indice à 100, puis 108 après une inflation de 8 %. Si l’inflation tombe à 3 % l’année suivante, l’indice monte encore à environ 111,2. Les prix n’ont pas baissé ; leur hausse a ralenti. C’est la désinflation.\n\nLa déflation correspond, elle, à une baisse générale. Elle peut sembler favorable au consommateur, mais si elle devient persistante, entreprises et ménages peuvent reporter dépenses et investissements, tandis que les dettes deviennent plus lourdes en valeur réelle."
      },
      {
        "title": "3. Plusieurs moteurs peuvent se renforcer",
        "text": "Une demande qui rebondit plus vite que les capacités de production peut pousser les prix. Une hausse du pétrole, du gaz, des céréales ou du transport augmente les coûts de nombreux secteurs. Des pénuries limitent l’offre. Entreprises et salariés peuvent ensuite ajuster prix et salaires en anticipant que l’inflation continuera.\n\nIl faut éviter une cause unique valable en tout temps. La monnaie, les coûts, les marges, les salaires, les taux de change et les politiques budgétaires interagissent différemment selon la période."
      },
      {
        "title": "4. Gagnants, perdants et contrats",
        "text": "Si le salaire augmente moins vite que les prix, le pouvoir d’achat baisse. Un épargnant rémunéré à 2 % pendant une inflation de 5 % perd environ 3 % de rendement réel avant fiscalité. À l’inverse, un emprunteur à taux fixe peut voir le poids réel de sa dette diminuer si ses revenus suivent l’inflation.\n\nTout dépend des contrats et du calendrier : loyers indexés, pensions revalorisées, taux variables, négociations salariales et patrimoine ne s’ajustent pas ensemble. L’inflation redistribue donc du revenu et du risque."
      },
      {
        "title": "5. Pourquoi les banques centrales agissent sur les taux",
        "text": "Une hausse des taux directeurs rend généralement le financement plus coûteux. Crédits immobiliers et investissements ralentissent, la demande se modère et la monnaie peut se renforcer. L’objectif est aussi d’empêcher que chacun anticipe durablement une inflation élevée.\n\nLa transmission prend des mois et comporte des coûts : activité plus faible, chômage possible et investissement réduit. Les taux agissent surtout sur la demande ; face à un choc d’offre, ils ne créent pas directement l’énergie ou les matières manquantes. La politique monétaire cherche donc un équilibre imparfait entre stabilité des prix et activité."
      }
    ],
    "deeper": [
      {
        "title": "Inflation personnelle",
        "text": "Compare la structure de ton budget au panier moyen : logement, énergie et alimentation peuvent rendre ton expérience très différente du chiffre national."
      },
      {
        "title": "Taux réel",
        "text": "Une approximation utile est : taux d’intérêt réel ≈ taux nominal − inflation attendue."
      },
      {
        "title": "Le piège du prix isolé",
        "text": "Un produit qui double ne prouve pas une inflation générale ; un indice stable peut cacher des hausses et baisses opposées selon les postes."
      }
    ],
    "takeaways": [
      {
        "label": "Indice",
        "text": "L’inflation est mesurée à partir d’un panier pondéré."
      },
      {
        "label": "Désinflation",
        "text": "Le rythme ralentit sans que les prix reviennent à leur ancien niveau."
      },
      {
        "label": "Redistribution",
        "text": "Revenus, épargne et dettes ne réagissent pas de la même manière."
      },
      {
        "label": "Taux",
        "text": "Ils freinent la demande avec retard et ne résolvent pas directement les pénuries."
      }
    ],
    "editorialRevision": "beta175"
  },
  "geo-maps-scale-basics": {
    "hook": "Une carte n’est pas le territoire en miniature. C’est un modèle construit pour répondre à une question : elle choisit une échelle, une projection, des catégories, des couleurs et un niveau de simplification, puis laisse le reste hors champ.",
    "keyFacts": [
      "Échelle : rapport entre distance cartographique et distance réelle",
      "Grande échelle : petit espace très détaillé ; petite échelle : vaste espace simplifié",
      "Généralisation : sélectionner, déplacer et simplifier pour rester lisible",
      "Carte thématique : valeurs, classes et figurés déterminent le message",
      "Lecture critique : titre, date, source, projection, légende et unité spatiale"
    ],
    "express": [
      "Une carte au 1:25 000 représente 250 mètres par centimètre ; une carte au 1:1 000 000 représente 10 kilomètres par centimètre. La première est dite à grande échelle car la fraction est plus grande et le détail plus fin.",
      "Changer d’échelle change parfois l’explication. Un quartier peut sembler socialement homogène à l’échelle communale alors que des contrastes apparaissent à l’échelle de l’îlot. Regrouper les données dans des unités différentes peut modifier le motif visible.",
      "Une carte choroplèthe colore des zones selon un taux ou une proportion. Utiliser des nombres bruts — population totale, crimes ou médecins — peut tromper si les territoires n’ont pas la même population. Le bon dénominateur est aussi important que la couleur."
    ],
    "complete": [
      {
        "title": "1. Comprendre la fraction d’échelle",
        "text": "L’échelle 1:50 000 signifie qu’une unité sur la carte correspond à 50 000 unités identiques sur le terrain : 1 cm représente 500 m. Plus le dénominateur est petit, plus la fraction est grande et plus la carte peut montrer de détails. Cette convention explique le vocabulaire contre-intuitif de grande et petite échelle.\n\nUne échelle graphique reste utilisable après agrandissement ou réduction de l’image, contrairement à une simple fraction numérique si le document est redimensionné sans indication."
      },
      {
        "title": "2. Généraliser sans mentir",
        "text": "À petite échelle, il est impossible de représenter chaque route, méandre ou bâtiment. Le cartographe sélectionne les objets, simplifie les lignes, regroupe les catégories et déplace parfois légèrement un symbole pour éviter les chevauchements. Cette généralisation est nécessaire ; le problème commence lorsqu’elle n’est pas adaptée à l’usage.\n\nUne route très importante peut être exagérée en largeur, une ville symbolisée par un point plus grand que sa surface réelle. Ces déformations ne sont pas des erreurs si la légende et l’objectif les rendent compréhensibles."
      },
      {
        "title": "3. Projection et centrage",
        "text": "Passer du globe à la feuille oblige à déformer surfaces, angles, distances ou directions. Le choix dépend du but : navigation, comparaison des superficies, atlas scolaire ou carte locale. Le centrage compte également. Une carte du Pacifique coupée à l’Atlantique raconte autrement les relations mondiales qu’une carte centrée sur l’Europe.\n\nIl n’existe donc pas de planisphère neutre. Cela ne signifie pas que toutes les cartes se valent : on peut juger si la projection convient à la question posée."
      },
      {
        "title": "4. Les pièges des cartes thématiques",
        "text": "Dans une carte choroplèthe, des couleurs plus foncées représentent généralement un taux dans chaque zone. Le choix des classes peut accentuer ou atténuer les contrastes : seuils réguliers, quantiles ou ruptures naturelles ne produisent pas la même image. Une palette arc-en-ciel peut aussi créer de fausses frontières visuelles.\n\nLes nombres bruts doivent souvent être rapportés à une population, une surface ou une durée. Cartographier le nombre total de médecins favorise mécaniquement les grandes villes ; cartographier les médecins pour 100 000 habitants répond à une autre question, sans mesurer pour autant la distance réelle d’accès."
      },
      {
        "title": "5. Une carte critique se lit dans les marges",
        "text": "Le titre indique la question ; la date précise le moment ; la source permet d’évaluer les données ; la légende révèle les catégories ; l’échelle et la projection indiquent les transformations spatiales. Il faut encore demander qui a produit la carte, pour quel public et quelles données sont absentes.\n\nCompare si possible plusieurs échelles ou plusieurs indicateurs. Une seule carte peut montrer un motif, mais rarement toute l’explication. Elle devient un outil d’enquête lorsqu’on la confronte à d’autres sources."
      }
    ],
    "deeper": [
      {
        "title": "Le problème des unités spatiales",
        "text": "Un même ensemble de points regroupé par communes, départements ou quartiers peut produire des corrélations différentes. C’est une forme du problème des unités spatiales modifiables."
      },
      {
        "title": "Carte ou territoire",
        "text": "Les frontières nettes sur la carte peuvent masquer des gradients, des mobilités et des espaces vécus beaucoup moins tranchés."
      },
      {
        "title": "Vérification rapide",
        "text": "Cherche toujours : quelle variable ? quelle unité ? quel dénominateur ? quelle date ? quelle source ?"
      }
    ],
    "takeaways": [
      {
        "label": "Échelle",
        "text": "Elle détermine le niveau de détail et parfois l’explication."
      },
      {
        "label": "Généralisation",
        "text": "Simplifier est nécessaire pour rendre la carte lisible."
      },
      {
        "label": "Thématique",
        "text": "Classes, dénominateurs et couleurs construisent le résultat."
      },
      {
        "label": "Critique",
        "text": "Une carte s’évalue par son usage, ses données et ses choix."
      }
    ],
    "editorialRevision": "beta175"
  },
  "geo-mercator-projection": {
    "hook": "La projection de Mercator n’est ni une mauvaise carte à interdire ni une image fidèle des continents. C’est un outil de navigation du XVIe siècle dont la propriété essentielle — conserver les angles locaux — produit une déformation gigantesque des surfaces aux hautes latitudes.",
    "keyFacts": [
      "Création : Gerardus Mercator publie son planisphère en 1569",
      "Propriété : projection conforme, les angles locaux sont conservés",
      "Navigation : les routes à cap constant apparaissent comme des droites",
      "Distorsion : l’échelle augmente rapidement vers les pôles",
      "Usage actuel : Web Mercator facilite les cartes numériques mais exagère toujours les hautes latitudes"
    ],
    "express": [
      "Sur Mercator, une route maritime suivie avec un cap constant — une loxodromie — peut être tracée comme une ligne droite. Cette propriété a une grande valeur pratique pour la navigation à la boussole.",
      "Pour conserver localement les angles, la projection étire les distances de plus en plus en allant vers les pôles. Le Groenland paraît comparable à l’Afrique, alors que l’Afrique est environ quatorze fois plus vaste. Les pôles eux-mêmes ne peuvent pas être représentés à une distance finie.",
      "Aucune projection plane ne conserve tout. Une projection équivalente protège les surfaces mais déforme les formes ; une projection de compromis cherche un aspect global acceptable. La bonne question n’est pas « quelle carte est vraie ? », mais « quelle propriété doit-elle préserver pour cet usage ? »"
    ],
    "complete": [
      {
        "title": "1. Le problème impossible du globe aplati",
        "text": "La surface terrestre est courbe. Pour la poser sur une feuille sans déchirure ni chevauchement, il faut accepter des déformations. On peut préserver certaines propriétés localement — angles, surfaces, distances depuis un point — mais pas toutes sur l’ensemble du monde.\n\nUne projection est donc une transformation mathématique. Le choix n’est pas seulement esthétique : il dépend du trajet à calculer, du phénomène à comparer et de l’étendue cartographiée."
      },
      {
        "title": "2. Pourquoi Mercator aide le navigateur",
        "text": "La projection publiée en 1569 par Gerardus Mercator est cylindrique et conforme. À petite échelle locale, les angles et formes sont conservés, ce qui permet de reporter plus facilement un cap mesuré à la boussole. Une loxodromie, route coupant les méridiens sous un angle constant, devient une droite sur la carte.\n\nCette droite n’est pas toujours le trajet le plus court sur le globe. Les routes de grand cercle sont généralement plus courtes sur de longues distances, mais apparaissent courbes sur Mercator."
      },
      {
        "title": "3. D’où vient l’agrandissement des pôles",
        "text": "Les méridiens sont représentés par des droites parallèles au lieu de converger vers les pôles. Pour préserver les angles, la projection doit étirer aussi les distances nord-sud. Ce facteur d’échelle augmente avec la latitude et tend vers l’infini près des pôles.\n\nAinsi, le Groenland, le Canada, la Scandinavie ou la Russie paraissent beaucoup trop vastes par rapport aux régions tropicales. L’Afrique, proche de l’équateur, est moins agrandie et paraît donc relativement réduite."
      },
      {
        "title": "4. Une carte n’est pas coupable de son mauvais usage",
        "text": "Mercator répond correctement à une question de navigation ; il devient trompeur lorsqu’on l’utilise pour comparer visuellement les superficies ou comme image naturelle du monde sans explication. Son centrage historique sur l’Atlantique et l’Europe peut renforcer une perception de centralité, mais la déformation mathématique vient d’abord de sa propriété conforme.\n\nRéduire le débat à « carte coloniale » ou « carte scientifique » empêche de comprendre l’essentiel : une projection peut être techniquement excellente pour un usage et inadéquate pour un autre."
      },
      {
        "title": "5. Alternatives et cartes numériques",
        "text": "Les projections équivalentes, comme Gall-Peters ou Mollweide, conservent les surfaces et permettent de meilleures comparaisons de taille, mais étirent les formes. Robinson ou Winkel Tripel sont des compromis souvent utilisés dans les atlas. Pour les régions polaires, des projections azimutales sont plus adaptées.\n\nLes services cartographiques en ligne utilisent souvent Web Mercator parce qu’elle simplifie le découpage en tuiles et conserve une apparence locale pratique. En zoomant sur une ville, la distorsion est peu gênante ; à l’échelle mondiale, elle reste spectaculaire."
      }
    ],
    "deeper": [
      {
        "title": "Groenland contre Afrique",
        "text": "Leur apparence proche sur Mercator est un excellent test visuel de la distorsion : l’Afrique est en réalité environ quatorze fois plus grande."
      },
      {
        "title": "Forme ou surface",
        "text": "Une projection conforme préserve localement les angles ; une projection équivalente préserve les aires. Ces objectifs sont différents."
      },
      {
        "title": "Une carte pour chaque question",
        "text": "Navigation, climat, densité et distances aériennes peuvent nécessiter des projections différentes."
      }
    ],
    "takeaways": [
      {
        "label": "1569",
        "text": "Mercator publie une projection conçue notamment pour la navigation."
      },
      {
        "label": "Conforme",
        "text": "Elle conserve localement les angles et les formes."
      },
      {
        "label": "Distorsion",
        "text": "L’échelle augmente vers les pôles et exagère leurs surfaces."
      },
      {
        "label": "Choix",
        "text": "Aucune projection ne conserve simultanément forme, aire, distance et direction partout."
      }
    ],
    "editorialRevision": "beta175"
  },
  "music-gregorian-polyphony": {
    "hook": "Entre le chant liturgique à une voix et les grandes polyphonies gothiques, il n’existe pas un progrès simple du pauvre vers le riche. Il existe un changement de fonction, de notation et de conception du temps musical : plusieurs lignes deviennent coordonnées sur l’écrit.",
    "keyFacts": [
      "Chant grégorien : répertoire liturgique monodique, stabilisé surtout à l’époque carolingienne",
      "Monodie : une seule ligne mélodique, même chantée par plusieurs voix",
      "Notation : des neumes à la portée, mémoire progressivement plus précise",
      "Polyphonie : superposition de voix distinctes, de l’organum aux écoles cathédrales",
      "Repères : Guido d’Arezzo, Léonin, Pérotin et Notre-Dame de Paris"
    ],
    "express": [
      "Le terme « chant grégorien » renvoie à un vaste répertoire liturgique en latin. Son association au pape Grégoire le Grand relève en partie d’une tradition de légitimation ; sa normalisation est surtout liée aux réformes carolingiennes des VIIIe et IXe siècles.",
      "Les premiers neumes aident à se souvenir du mouvement mélodique. Aux XIe et XIIe siècles, la portée et les méthodes liées à Guido d’Arezzo rendent les hauteurs plus précises et facilitent l’apprentissage d’un répertoire qui ne dépend plus seulement de la mémoire directe du maître.",
      "L’organum ajoute une ou plusieurs voix à un chant préexistant. Autour de Notre-Dame de Paris, Léonin et Pérotin sont associés à des polyphonies plus vastes où rythme et coordination doivent être pensés. Écrire la musique ne se contente plus de la conserver : l’écriture permet d’en concevoir la complexité."
    ],
    "complete": [
      {
        "title": "1. Un répertoire pour organiser le rite",
        "text": "Le chant liturgique accompagne offices et messe. Les textes, souvent bibliques, changent selon le calendrier religieux. La mélodie aide à porter la parole, à unifier la communauté et à structurer le temps. Monodique signifie qu’il existe une ligne mélodique principale ; un chœur entier peut la chanter à l’unisson.\n\nLe rythme ne se mesure pas comme une pulsation de chanson moderne. Il suit largement la prosodie du texte et les traditions d’interprétation. Parler d’une musique « simple » parce qu’elle n’a qu’une voix manquerait sa richesse modale, mélodique et rituelle."
      },
      {
        "title": "2. Pourquoi l’appeler grégorien ?",
        "text": "La tradition médiévale associe le chant au pape Grégoire Ier, parfois représenté recevant les mélodies de l’Esprit saint sous forme de colombe. Les historiens considèrent plutôt que le répertoire se fixe par un long processus, notamment lors des réformes carolingiennes qui cherchent à unifier les pratiques liturgiques dans l’Empire.\n\nLe nom donne donc autorité et ancienneté à une construction collective. Il rappelle qu’une tradition musicale peut créer son propre récit d’origine."
      },
      {
        "title": "3. Noter ce que la mémoire ne suffit plus à porter",
        "text": "Les neumes placés au-dessus du texte indiquent d’abord le mouvement de la mélodie sans toujours fixer précisément les intervalles. Les lignes de hauteur, puis la portée, rendent la lecture plus exacte. Guido d’Arezzo, au XIe siècle, est associé à des outils pédagogiques comme la solmisation et la main guidonienne.\n\nLa notation ne remplace pas instantanément l’oralité. Elle fonctionne avec elle. Mais elle permet de transmettre plus loin, comparer les versions et concevoir des structures que la mémoire seule rendrait plus difficiles à stabiliser."
      },
      {
        "title": "4. De l’organum à Notre-Dame",
        "text": "L’organum ajoute une voix à un chant liturgique. Les premières formes peuvent avancer parallèlement ; d’autres laissent une voix tenir de longues notes tandis qu’une voix supérieure développe une mélodie plus mobile. La relation entre consonance, mouvement et cadence devient un problème de composition.\n\nAux XIIe et XIIIe siècles, l’école dite de Notre-Dame est associée à Léonin et Pérotin. Des œuvres à deux, trois ou quatre voix exigent des modes rythmiques et une notation plus organisée. La cathédrale devient aussi un laboratoire sonore."
      },
      {
        "title": "5. Le Moyen Âge musical est plus vaste",
        "text": "À côté de la liturgie existent chansons de troubadours et trouvères, danses, traditions instrumentales, musiques de cour et pratiques populaires dont la trace écrite est inégale. Ce que nous connaissons dépend beaucoup de ce qui a été noté et conservé par les institutions.\n\nLa naissance de la polyphonie écrite ne remplace pas la monodie. Les deux coexistent. Son importance historique tient à une nouvelle capacité : penser plusieurs voix autonomes dans un temps commun, ouvrant la voie à des formes de composition toujours plus complexes."
      }
    ],
    "deeper": [
      {
        "title": "Grégoire n’a pas composé tout le répertoire",
        "text": "L’attribution au pape sert surtout de récit d’autorité pour une tradition formée sur plusieurs siècles."
      },
      {
        "title": "Écrit et oral",
        "text": "Une partition médiévale ne contient pas toutes les informations d’une interprétation ; elle suppose des pratiques apprises."
      },
      {
        "title": "Polyphonie et architecture",
        "text": "Comme une cathédrale, une polyphonie répartit plusieurs lignes dans un ensemble coordonné, mais la comparaison reste une métaphore, pas une cause directe."
      }
    ],
    "takeaways": [
      {
        "label": "Monodie",
        "text": "Plusieurs chanteurs peuvent suivre une seule ligne mélodique."
      },
      {
        "label": "Notation",
        "text": "Elle précise peu à peu hauteurs et rythmes sans supprimer l’oralité."
      },
      {
        "label": "Polyphonie",
        "text": "Plusieurs voix distinctes sont coordonnées dans le temps."
      },
      {
        "label": "Nuance",
        "text": "Cette transformation n’est pas un passage de la musique primitive à la musique vraie."
      }
    ],
    "editorialRevision": "beta175"
  },
  "music-jazz-birth": {
    "hook": "Le jazz ne naît pas d’un mélange abstrait de musiques ni d’un seul génie à La Nouvelle-Orléans. Il émerge de l’expérience afro-américaine, de la ségrégation, des fanfares, du blues, du ragtime, des églises, des danses et d’une nouvelle manière de faire du son une voix personnelle.",
    "keyFacts": [
      "Origines : communautés afro-américaines du Sud des États-Unis, tournant des XIXe et XXe siècles",
      "La Nouvelle-Orléans : lieu majeur de brass bands, danse et circulations culturelles",
      "Improvisation : invention dans un cadre harmonique, rythmique et collectif",
      "Swing : organisation souple de la pulsation et interaction entre les musiciens",
      "Évolutions : Chicago, Harlem, big bands, bebop, cool, hard bop, free et fusion"
    ],
    "express": [
      "Le jazz combine des héritages transformés : blues, chants religieux, ragtime, marches, fanfares et pratiques rythmiques afro-américaines. Il ne possède pas une date de naissance unique ; les premiers enregistrements de 1917 rendent visible une musique déjà formée par des années de pratique.",
      "Improviser ne signifie pas jouer au hasard. Le musicien connaît la forme, l’harmonie, le rythme et le vocabulaire du style. Il invente en écoutant les autres : la section rythmique soutient, répond, déplace les accents et peut modifier la direction du solo.",
      "Avec Louis Armstrong, le solo prend une nouvelle centralité ; les big bands font du swing une musique de danse de masse ; le bebop des années 1940 accélère les harmonies et déplace le jazz vers l’écoute attentive. Le jazz est une tradition de transformations, pas un son unique."
    ],
    "complete": [
      {
        "title": "1. Une histoire afro-américaine dans une ville-carrefour",
        "text": "Après l’esclavage, les communautés noires américaines vivent ségrégation, violences et fortes mobilités. À La Nouvelle-Orléans, ports, quartiers, traditions créoles, fanfares militaires, cérémonies, églises et lieux de danse créent un environnement de circulation musicale. Le blues apporte inflexions, formes et expression personnelle ; le ragtime propose une écriture syncopée ; les brass bands donnent puissance collective et mobilité.\n\nAucun de ces éléments n’est simplement additionné. Les musiciens les transforment par le jeu, le timbre et la relation à la danse."
      },
      {
        "title": "2. Le son personnel devient une signature",
        "text": "Dans la musique classique européenne, on valorise souvent la fidélité à une sonorité idéale et à une partition. Le jazz donne une place centrale à la manière singulière d’attaquer une note, de la plier, de la rendre rugueuse ou lumineuse. Deux trompettistes jouant la même mélodie peuvent raconter des mondes différents.\n\nLouis Armstrong marque un tournant par la puissance rythmique et narrative de ses solos dans les années 1920. Il ne supprime pas l’improvisation collective de La Nouvelle-Orléans, mais montre comment un soliste peut construire un discours cohérent sur plusieurs chorus."
      },
      {
        "title": "3. Improviser dans une forme",
        "text": "Une grille harmonique, une mélodie et une structure de mesures donnent un cadre. Le soliste peut paraphraser le thème, développer un motif, déplacer les accents ou jouer avec les tensions harmoniques. Les autres musiciens ne restent pas passifs : batterie, contrebasse et piano commentent et relancent.\n\nL’improvisation repose sur une mémoire immense : standards, tournures rythmiques, techniques instrumentales et écoute des partenaires. La liberté naît de la maîtrise des contraintes, pas de leur absence."
      },
      {
        "title": "4. Que signifie swinguer ?",
        "text": "Le swing désigne à la fois une sensation rythmique et, historiquement, l’ère des grands orchestres des années 1930 et 1940. Les croches peuvent être inégales, mais aucune formule mathématique unique ne suffit. Le placement légèrement en avant ou en arrière du temps, les accents, la pulsation régulière et la coordination collective produisent le mouvement.\n\nLes big bands de Duke Ellington, Count Basie ou Benny Goodman rendent cette musique centrale dans la culture de masse. Le succès s’inscrit pourtant dans une industrie ségréguée où musiciens noirs et blancs ne bénéficient pas des mêmes lieux, contrats ni reconnaissance."
      },
      {
        "title": "5. Une musique qui se réinvente",
        "text": "Le bebop de Charlie Parker et Dizzy Gillespie privilégie petits ensembles, tempos rapides et harmonies complexes. Le cool jazz, le hard bop, le modal, le free jazz et la fusion proposent ensuite des réponses différentes. Miles Davis traverse plusieurs de ces transformations ; John Coltrane pousse l’improvisation harmonique et modale ; Ornette Coleman remet en question les cadres établis.\n\nLe jazz circule mondialement et influence rhythm and blues, soul, funk, rock, hip-hop et musiques savantes. Son unité ne vient pas d’un style fixe, mais d’une manière d’articuler mémoire, interaction, rythme et invention personnelle."
      }
    ],
    "deeper": [
      {
        "title": "1917 n’est pas la naissance du jazz",
        "text": "C’est l’année des premiers enregistrements commercialisés sous cette étiquette, non l’apparition soudaine de la pratique."
      },
      {
        "title": "Le standard",
        "text": "Une même composition peut devenir un terrain commun que des générations de musiciens réinterprètent."
      },
      {
        "title": "Appropriation et industrie",
        "text": "La diffusion mondiale du jazz s’accompagne souvent d’inégalités : des artistes blancs ont parfois obtenu plus facilement contrats et visibilité à partir d’innovations afro-américaines."
      }
    ],
    "takeaways": [
      {
        "label": "Origines",
        "text": "Le jazz s’enracine dans l’histoire afro-américaine et plusieurs traditions transformées."
      },
      {
        "label": "Improvisation",
        "text": "Une invention individuelle qui dépend d’un cadre et d’une écoute collective."
      },
      {
        "label": "Swing",
        "text": "Une relation vivante à la pulsation, pas une formule mécanique."
      },
      {
        "label": "Évolution",
        "text": "Le jazz reste cohérent en se réinventant continuellement."
      }
    ],
    "editorialRevision": "beta175"
  }
};
  Object.entries(PACKS).forEach(([id, patch]) => { if (READY_LESSON_PACKS[id]) READY_LESSON_PACKS[id] = { ...READY_LESSON_PACKS[id], ...patch, quiz: READY_LESSON_PACKS[id].quiz }; });
  const OVERRIDES = {
  "art-mystery-impressionism-mode": {
    "prompt": "On cherche un mouvement qui refuse la surface parfaitement lissée du Salon et préfère rendre une perception instable : reflets sur l’eau, vapeur d’une gare, foule d’un boulevard ou lumière qui change avant que la toile soit terminée.",
    "clues": [
      "Le dossier se situe en France dans les années 1870, autour d’expositions organisées hors du Salon officiel.",
      "La touche reste visible, les ombres se colorent et les sujets viennent souvent de la ville, des loisirs ou du paysage peint sur le motif.",
      "Une critique moqueuse d’Impression, soleil levant de Monet fournit le nom du mouvement."
    ],
    "explanation": "L’impressionnisme cherche moins un contour définitif qu’une expérience visuelle située dans un instant. Il transforme aussi les sujets de la peinture en faisant entrer ville, gares, spectacles et loisirs modernes dans l’œuvre."
  },
  "art-mystery-linear-perspective-121": {
    "prompt": "On cherche une méthode qui transforme le tableau en espace calculé depuis la place d’un observateur. Les objets n’y rapetissent plus au hasard : leur diminution obéit à une construction commune.",
    "clues": [
      "Elle s’affirme dans les villes italiennes du XVe siècle, au croisement de la peinture, de l’architecture et des mathématiques.",
      "Des lignes dites orthogonales convergent vers un point situé sur l’horizon.",
      "Brunelleschi l’expérimente, Alberti la théorise et Masaccio l’emploie spectaculairement dans La Trinité."
    ],
    "explanation": "La perspective linéaire construit une profondeur cohérente à partir d’un point de vue. Elle ne copie pas naturellement la vision : elle organise l’image selon un modèle géométrique."
  },
  "art-mystery-composition-122": {
    "prompt": "On cherche ce qui agit avant même que le spectateur identifie le sujet. Cela répartit les masses, ménage des vides, crée des diagonales et décide quel élément recevra d’abord le regard.",
    "clues": [
      "Ce n’est ni une couleur ni un symbole isolé, mais l’organisation globale des éléments dans le cadre.",
      "Symétrie, centre, diagonales, répétitions et rapports d’échelle en sont des outils.",
      "Un tableau peut représenter la même scène qu’un autre et produire un effet opposé grâce à cette organisation."
    ],
    "explanation": "La composition est l’architecture visuelle de l’œuvre. Elle hiérarchise, conduit le regard et transforme un sujet en expérience précise."
  },
  "cinema-mystery-melies-mode": {
    "prompt": "On cherche un homme de spectacle qui comprend très tôt qu’une coupe peut devenir une disparition, qu’un décor peint peut ouvrir un autre monde et qu’une caméra peut prolonger les pouvoirs d’un théâtre d’illusion.",
    "clues": [
      "Il travaille à Paris à la fin du XIXe siècle et dirige le théâtre Robert-Houdin.",
      "Arrêts de caméra, surimpressions, substitutions et décors en tableaux structurent ses films.",
      "En 1902, il envoie des savants dans un obus qui vient se planter dans l’œil de la Lune."
    ],
    "explanation": "Georges Méliès fait du cinéma un art de la mise en scène et du trucage. Il ne se contente pas d’enregistrer le monde : il utilise le médium pour fabriquer l’impossible."
  },
  "cinema-mystery-hollywood-studios": {
    "prompt": "On cherche un système où la fluidité du récit dépend autant d’une organisation industrielle que d’un style : contrats longs, départements spécialisés, genres réguliers, vedettes construites et montage qui cherche à faire oublier ses coupes.",
    "clues": [
      "Il domine une grande partie du cinéma américain entre les années 1930 et 1950.",
      "Les majors contrôlent production et distribution, et certaines possèdent aussi des réseaux de salles.",
      "MGM, Paramount, Warner Bros., 20th Century-Fox et RKO en sont les puissances emblématiques."
    ],
    "explanation": "Hollywood classique désigne à la fois un système de studios et une grammaire narrative. Il rend possible une production massive de films lisibles, tout en imposant contrats, hiérarchies et contrôle moral."
  },
  "cinema-mystery-cadrage-122": {
    "prompt": "On cherche une décision prise avant toute coupe : elle trace la frontière de l’image, fait entrer un visage, exclut une menace et transforme le reste du monde en espace invisible.",
    "clues": [
      "Elle dépend de la position de la caméra, de la focale, de la distance et du format de l’image.",
      "Elle peut isoler un détail en gros plan ou laisser un personnage minuscule dans un plan d’ensemble.",
      "En choisissant le champ, elle crée automatiquement le hors-champ."
    ],
    "explanation": "Le cadrage détermine ce qui est visible et la manière dont les éléments occupent l’image. Il construit l’information et la position du spectateur."
  },
  "science-mystery-galileo-mode": {
    "prompt": "On cherche un savant qui ne fabrique pas l’instrument qu’il utilise, mais l’améliore puis le retourne vers le ciel. Quatre points près de Jupiter et les phases d’une planète suffisent à fragiliser une architecture cosmique vieille de siècles.",
    "clues": [
      "Le dossier se déroule en Italie au début du XVIIe siècle, après Copernic et au temps de Kepler.",
      "Il publie ses premières observations télescopiques dans Le Messager des étoiles en 1610.",
      "Son Dialogue de 1632 conduit à un procès et à une condamnation l’année suivante."
    ],
    "explanation": "Galilée transforme la lunette en instrument astronomique et rend publiques des observations qui éliminent certaines formes du géocentrisme. Son conflit avec l’Église mêle preuves, interprétation des Écritures, autorité et politique."
  },
  "science-mystery-pasteur-microbes": {
    "prompt": "On cherche un chimiste devenu figure de la médecine sans être médecin. Il suit l’activité d’êtres invisibles depuis les cuves de fermentation jusqu’aux maladies, puis cherche à contrôler leur action par chauffage ou atténuation.",
    "clues": [
      "Il travaille en France au XIXe siècle sur le vin, la bière et la génération spontanée.",
      "Ses ballons à col de cygne laissent entrer l’air tout en retenant les poussières porteuses de germes.",
      "Son nom reste attaché à un procédé de chauffage et à la vaccination contre la rage en 1885."
    ],
    "explanation": "Louis Pasteur relie microbiologie expérimentale et applications industrielles ou médicales. Son œuvre compte, mais elle appartient à une révolution collective impliquant aussi Lister, Koch, Semmelweis et beaucoup d’autres."
  },
  "science-mystery-experimental-proof-121": {
    "prompt": "On cherche un type d’argument qui ne repose ni sur le prestige d’un savant ni sur une belle idée. Il organise une comparaison, contrôle des conditions et expose une prédiction au risque d’échouer.",
    "clues": [
      "Il faut distinguer ce qui varie de ce qui doit rester comparable.",
      "Un groupe témoin, une répétition ou une mesure indépendante peut le renforcer.",
      "Son but est de tester une relation causale et non de collectionner seulement des exemples favorables."
    ],
    "explanation": "La preuve expérimentale vient d’un dispositif qui rend les hypothèses testables et les comparaisons interprétables. Elle reste limitée par la qualité du protocole et l’incertitude des mesures."
  },
  "science-mystery-hypothesis-122": {
    "prompt": "On cherche une réponse provisoire qui ne mérite son statut scientifique que si elle accepte d’indiquer ce que l’on devrait observer et ce qui pourrait la mettre en défaut.",
    "clues": [
      "Elle vient souvent après une question ou une observation, mais n’est pas une simple opinion.",
      "Elle doit produire des conséquences testables par expérience, mesure ou observation.",
      "Elle ne devient pas automatiquement une théorie ; les deux mots désignent des rôles différents."
    ],
    "explanation": "Une hypothèse scientifique est une proposition testable. Une théorie est un cadre explicatif beaucoup plus large, soutenu par de nombreuses preuves convergentes."
  },
  "economy-mystery-inflation-mode": {
    "prompt": "On cherche un phénomène qui peut ralentir sans s’inverser. Lorsqu’il passe de 8 % à 3 %, les étiquettes continuent en moyenne de monter, mais moins vite ; la même somme achète encore moins qu’auparavant.",
    "clues": [
      "Il est mesuré à partir d’un panier pondéré de biens et services.",
      "Il ne se confond ni avec la hausse d’un seul prix ni avec le simple niveau élevé des prix.",
      "Banques centrales, salaires, épargne et dettes sont directement concernés par son évolution."
    ],
    "explanation": "L’inflation est une hausse générale et durable du niveau des prix. Sa baisse signifie souvent désinflation, pas retour automatique aux anciens prix."
  },
  "economy-mystery-supply-demand-121": {
    "prompt": "On cherche un modèle où deux relations se croisent. L’une décrit les achats possibles à différents prix ; l’autre les quantités que les producteurs acceptent de vendre. Le point de rencontre n’est pas une définition de la justice.",
    "clues": [
      "Un changement du prix seul provoque un déplacement le long d’une courbe.",
      "Revenu, goût, coût de l’énergie ou technologie peuvent déplacer une courbe entière.",
      "Il sert à analyser équilibre, pénurie, surplus et réaction des prix sur un marché."
    ],
    "explanation": "Le modèle de l’offre et de la demande aide à distinguer les chocs et les ajustements de marché. Il ne suffit pas à traiter pouvoir de marché, pollution ou inégalités d’accès."
  },
  "economy-mystery-scarcity-122": {
    "prompt": "On cherche le problème de départ de l’économie : les projets, usages et besoins concurrents dépassent les ressources, le temps ou les capacités disponibles. Même une ressource abondante peut devenir insuffisante face à tous ses usages possibles.",
    "clues": [
      "Il oblige à choisir et donc à renoncer à une alternative.",
      "Il ne signifie pas forcément famine ou pénurie physique immédiate.",
      "Le coût d’opportunité est la valeur de la meilleure option abandonnée à cause de cette contrainte."
    ],
    "explanation": "La rareté désigne l’écart entre ressources limitées et usages concurrents. Elle rend nécessaires arbitrage, priorité et coût d’opportunité."
  },
  "geography-mystery-mercator-mode": {
    "prompt": "On cherche une projection qui réussit ce pour quoi elle a été conçue et trompe lorsqu’on lui demande autre chose. Elle transforme une route à cap constant en droite, au prix d’un agrandissement croissant vers les pôles.",
    "clues": [
      "Elle est publiée en 1569 par un cartographe flamand.",
      "Elle est conforme : les angles locaux sont conservés, propriété utile à la navigation.",
      "Le Groenland y paraît proche de l’Afrique en taille alors que l’Afrique est environ quatorze fois plus vaste."
    ],
    "explanation": "La projection de Mercator sert efficacement la navigation, mais déforme fortement les superficies aux hautes latitudes. Son adéquation dépend donc de l’usage."
  },
  "geography-mystery-map-scale-121": {
    "prompt": "On cherche un rapport qui décide qu’un centimètre représentera cinq cents mètres, dix kilomètres ou davantage. En changeant ce rapport, on ne perd pas seulement des détails : on peut aussi changer le phénomène que l’on croit voir.",
    "clues": [
      "Il peut être écrit sous forme de fraction ou représenté par une barre graduée.",
      "Au 1:50 000, un centimètre correspond à cinq cents mètres sur le terrain.",
      "Une carte à grande échelle montre un petit espace avec davantage de détails."
    ],
    "explanation": "L’échelle cartographique relie mesure sur la carte et distance réelle. Elle commande le niveau de détail et influence l’analyse spatiale."
  },
  "geography-mystery-coordinates-122": {
    "prompt": "On cherche un système qui localise sans décrire le paysage. Deux valeurs suffisent à fixer une position sur le globe à partir d’un équateur et d’un méridien de référence.",
    "clues": [
      "La première valeur mesure une position au nord ou au sud de l’équateur.",
      "La seconde mesure une position à l’est ou à l’ouest du méridien de Greenwich.",
      "Latitude et longitude forment ensemble ce système de repérage."
    ],
    "explanation": "Les coordonnées géographiques donnent une position par latitude et longitude. Elles localisent précisément sans expliquer la nature du lieu."
  },
  "music-mystery-jazz-mode": {
    "prompt": "On cherche une musique qui transforme une mélodie commune en conversation imprévisible. La liberté du soliste y dépend d’une forme mémorisée, d’une pulsation partagée et de partenaires capables de répondre en temps réel.",
    "clues": [
      "Elle naît dans l’histoire afro-américaine des États-Unis au tournant du XXe siècle.",
      "Blues, ragtime, brass bands et La Nouvelle-Orléans comptent dans ses origines.",
      "Improvisation, swing, timbre personnel et interaction collective en sont des principes centraux."
    ],
    "explanation": "Le jazz est une tradition afro-américaine d’invention dans un cadre. Il évolue du jeu collectif de La Nouvelle-Orléans aux big bands, au bebop et à de nombreuses formes contemporaines."
  },
  "music-mystery-gregorian-polyphony-120": {
    "prompt": "On cherche une transformation de l’écriture musicale. Une ligne liturgique préexistante demeure, mais d’autres voix commencent à se déplacer autour d’elle jusqu’à former une architecture qu’il devient difficile de transmettre par mémoire seule.",
    "clues": [
      "Elle se développe dans l’Europe médiévale, notamment dans les écoles religieuses.",
      "Ses premières formes sont appelées organum et peuvent superposer une voix mobile à un chant tenu.",
      "Léonin, Pérotin et l’école de Notre-Dame sont associés à son essor aux XIIe et XIIIe siècles."
    ],
    "explanation": "La polyphonie médiévale coordonne plusieurs lignes vocales distinctes. Son développement accompagne la précision de la notation et une nouvelle capacité à concevoir la musique sur l’écrit."
  },
  "music-mystery-gregorian-chant-122": {
    "prompt": "On cherche un répertoire où plusieurs chanteurs peuvent produire ensemble une seule ligne. Il ne vise pas le concert autonome : il règle la prière, le texte et le calendrier d’une institution religieuse.",
    "clues": [
      "Il est monodique et principalement chanté en latin dans la liturgie occidentale.",
      "Son nom l’associe à un pape, même si sa formation historique est surtout collective et carolingienne.",
      "Les neumes servent d’abord d’aide-mémoire avant une notation plus précise sur portée."
    ],
    "explanation": "Le chant grégorien est un répertoire liturgique monodique progressivement stabilisé et noté. L’attribution directe au pape Grégoire relève surtout d’une tradition d’autorité."
  }
};
  (data.mysteries || []).forEach(mystery => { const patch = OVERRIDES[mystery.id]; if (patch) Object.assign(mystery, patch, { editorialRevision: "beta175", manualCluesB97: true, cluesCleaned: true }); });
  const NEW_MYSTERIES = [
  {
    "id": "art-mystery-chiaroscuro-175",
    "discipline": "art",
    "difficulty": "difficile",
    "title": "La lumière découpe l’action",
    "caseTitle": "Procédé pictural à identifier",
    "subjectType": "procédé de lumière et de contraste",
    "periodHint": "Peinture européenne · surtout XVIe-XVIIe siècles",
    "lessonId": "art-read-image-basics",
    "prompt": "On cherche un procédé qui ne consiste pas à éclairer uniformément la scène. Une zone lumineuse surgit contre une obscurité profonde, hiérarchise les corps et transforme un geste en événement.",
    "answer": "Le clair-obscur",
    "aliases": [
      "clair obscur",
      "clair-obscur",
      "le clair obscur",
      "le clair-obscur",
      "chiaroscuro"
    ],
    "clues": [
      "Il organise l’image par un fort contraste entre zones éclairées et zones sombres.",
      "Il peut isoler un visage, dramatiser une scène ou guider le regard sans changer le sujet représenté.",
      "Le Caravage en fait un instrument majeur de tension narrative et spirituelle."
    ],
    "explanation": "Le clair-obscur utilise les contrastes de lumière pour modeler les volumes et hiérarchiser l’action. Chez le Caravage, il devient souvent un véritable moteur dramatique.",
    "blockedGuesses": [
      "lumiere",
      "lumière",
      "ombre",
      "contraste",
      "caravage"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB175": true
  },
  {
    "id": "cinema-mystery-offscreen-175",
    "discipline": "cinema",
    "difficulty": "difficile",
    "title": "L’image s’arrête, le monde continue",
    "caseTitle": "Notion de mise en scène à identifier",
    "subjectType": "notion d’espace cinématographique",
    "periodHint": "Langage du cinéma",
    "lessonId": "cinema-shot-frame-basics",
    "prompt": "On cherche un espace qui n’est jamais visible au moment où il agit. Un bruit derrière une porte, un regard vers le bord ou une réaction effrayée suffisent pourtant à le rendre présent.",
    "answer": "Le hors-champ",
    "aliases": [
      "hors champ",
      "hors-champ",
      "le hors champ",
      "le hors-champ",
      "espace hors champ"
    ],
    "clues": [
      "Il est créé automatiquement par les limites du cadre.",
      "Le son, les regards et les entrées de personnages permettent de le construire.",
      "Dans le suspense ou l’horreur, ce qui y reste caché peut être plus puissant que ce qui est montré."
    ],
    "explanation": "Le hors-champ est la partie de l’univers du film située en dehors de l’image visible. La mise en scène peut lui donner une présence narrative et émotionnelle très forte.",
    "blockedGuesses": [
      "cadre",
      "cadrage",
      "invisible",
      "son",
      "bruit"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB175": true
  },
  {
    "id": "economy-mystery-opportunity-cost-175",
    "discipline": "economy",
    "difficulty": "moyen",
    "title": "Le prix de ce que l’on ne choisit pas",
    "caseTitle": "Notion économique à identifier",
    "subjectType": "notion d’arbitrage",
    "periodHint": "Décision économique",
    "lessonId": "eco-supply-demand-basics",
    "prompt": "On cherche un coût qui n’apparaît pas forcément sur une facture. Consacrer une soirée à travailler peut rapporter un salaire, mais fait disparaître la meilleure autre utilisation possible de ce temps.",
    "answer": "Le coût d’opportunité",
    "aliases": [
      "cout d opportunite",
      "coût d opportunité",
      "cout d’opportunité",
      "coût d’opportunité",
      "cout opportunite",
      "coût opportunité"
    ],
    "clues": [
      "Il apparaît chaque fois que des ressources limitées obligent à choisir.",
      "Il ne correspond pas à toutes les options abandonnées, mais à la meilleure d’entre elles.",
      "Il permet de comparer une décision à ce que l’on aurait pu faire de plus avantageux à la place."
    ],
    "explanation": "Le coût d’opportunité est la valeur de la meilleure alternative abandonnée. Il rend visibles les renoncements cachés derrière tout choix économique.",
    "blockedGuesses": [
      "prix",
      "argent",
      "temps",
      "rarete",
      "rareté",
      "choix"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB175": true
  },
  {
    "id": "geography-mystery-map-projection-175",
    "discipline": "geography",
    "difficulty": "moyen",
    "title": "Aplatir sans pouvoir tout conserver",
    "caseTitle": "Transformation cartographique à identifier",
    "subjectType": "méthode de représentation du globe",
    "periodHint": "Cartographie mondiale",
    "lessonId": "geo-maps-scale-basics",
    "prompt": "On cherche une opération mathématique inévitable dès que le globe devient une feuille. Elle oblige à choisir ce que l’on préservera — angles, aires, distances ou directions — et ce que l’on acceptera de déformer.",
    "answer": "Une projection cartographique",
    "aliases": [
      "projection cartographique",
      "une projection cartographique",
      "projection de carte",
      "projection"
    ],
    "clues": [
      "Elle transforme des coordonnées situées sur une surface courbe en positions sur un plan.",
      "Aucune solution ne conserve simultanément toutes les propriétés sur le monde entier.",
      "Mercator, Mollweide, Robinson ou Winkel Tripel sont des familles de réponses à ce problème."
    ],
    "explanation": "Une projection cartographique est une transformation du globe vers le plan. Toute projection privilégie certaines propriétés et introduit des déformations adaptées ou non à l’usage.",
    "blockedGuesses": [
      "carte",
      "globe",
      "mercator",
      "deformation",
      "déformation"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB175": true
  },
  {
    "id": "music-mystery-swing-175",
    "discipline": "music",
    "difficulty": "expert",
    "title": "Une pulsation qui avance sans marcher au pas",
    "caseTitle": "Principe rythmique à identifier",
    "subjectType": "sensation et organisation rythmiques",
    "periodHint": "Jazz · XXe siècle",
    "lessonId": "music-jazz-birth",
    "prompt": "On cherche une qualité rythmique qu’une partition décrit imparfaitement. Elle vient de croches souvent inégales, d’accents déplacés et surtout de la manière collective de se placer autour d’une pulsation régulière.",
    "answer": "Le swing",
    "aliases": [
      "swing",
      "le swing",
      "swing jazz",
      "rythme swing"
    ],
    "clues": [
      "Le mot désigne à la fois une sensation de mouvement et une période de grands orchestres des années 1930-1940.",
      "Il ne se réduit pas à transformer mécaniquement deux croches égales en triolet.",
      "Count Basie, Duke Ellington et de nombreux batteurs montrent combien il dépend du placement, de l’accent et de l’écoute."
    ],
    "explanation": "Le swing est une manière souple et collective d’organiser la pulsation. Il dépend du placement rythmique, des accents et de l’interaction plus que d’une formule écrite unique.",
    "blockedGuesses": [
      "jazz",
      "rythme",
      "pulsation",
      "big band",
      "ellington"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB175": true
  }
];
  const known = new Set((data.mysteries || []).map(item => item.id));
  NEW_MYSTERIES.forEach(item => { if (!known.has(item.id)) { data.mysteries.push(item); known.add(item.id); } });
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, editorialVersion: VERSION }; } catch {}
})();
