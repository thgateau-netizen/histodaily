/* HistoDaily LTS — bibliothèque de contenus publiés */

/* ===== content-editorial.js ===== */

/* HistoDaily beta 175 — refonte éditoriale des domaines hors Histoire et des mystères. */
(function histodailyBeta175Editorial(){
  const VERSION = "1.0.0-beta.207";
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
    "caseTitle": "Procédé pictural",
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
    "caseTitle": "Notion de mise en scène",
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
    "caseTitle": "Notion économique",
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
    "caseTitle": "Transformation cartographique",
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
    "caseTitle": "Principe rythmique",
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


/* ===== content-expansion.js ===== */

/* HistoDaily beta 177 — nouveaux cours et mystères. */
(function histodailyBeta177Expansion(){
  const VERSION = "1.0.0-beta.207";
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
    "caseTitle": "Révolution atlantique",
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
    "caseTitle": "Personnage historique",
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
    "caseTitle": "Mouvement artistique",
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
    "caseTitle": "Technique artistique",
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
    "caseTitle": "Effet de montage",
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
    "caseTitle": "Opération cinématographique",
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
    "caseTitle": "Mécanisme évolutif",
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
    "caseTitle": "Notion évolutive",
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
    "caseTitle": "Phénomène économique",
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
    "caseTitle": "Instrument monétaire",
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
    "caseTitle": "Transformation logistique",
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
    "caseTitle": "Détroit stratégique",
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
    "caseTitle": "Technique musicale",
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
    "caseTitle": "Élément rythmique",
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


/* ===== content-nonhistory.js ===== */

/* HistoDaily beta 178 — contenus hors Histoire + cohérence des parcours. */
(function histodailyBeta178NonHistory(){
  const VERSION = "1.0.0-beta.207";
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


/* ===== content-astronomy.js ===== */

/* HistoDaily beta 186 — Astronomie devient une discipline autonome. */
(function histodailyBeta186Astronomy(){
  const VERSION = "1.0.0-beta.207";
  const DISCIPLINE = {
  "id": "astronomy",
  "title": "Astronomie",
  "emoji": "🌌",
  "accent": "#fbbf24",
  "description": "Univers, étoiles, planètes, observation et exploration spatiale."
};
  const GROUPS = [
  {
    "id": "astro-foundations",
    "title": "1. Comprendre l’Univers",
    "range": "échelles → cosmologie",
    "description": "Distances, lumière, Big Bang, expansion et grandes structures de l’Univers."
  },
  {
    "id": "astro-stars",
    "title": "2. Les étoiles et le Soleil",
    "range": "naissance → fin des étoiles",
    "description": "Fusion, vie des étoiles, supernovæ, astres compacts et activité solaire."
  },
  {
    "id": "astro-solar-system",
    "title": "3. Le Système solaire",
    "range": "formation → petits corps",
    "description": "Planètes rocheuses, géantes, lunes, astéroïdes, comètes et impacts."
  },
  {
    "id": "astro-other-worlds",
    "title": "4. Observer d’autres mondes",
    "range": "télescopes → exoplanètes",
    "description": "Lumière, spectres, instruments, exoplanètes et recherche de conditions favorables à la vie."
  },
  {
    "id": "astro-exploration",
    "title": "5. Explorer l’espace",
    "range": "orbites → missions",
    "description": "Fusées, trajectoires, exploration de la Lune, de Mars et du Système solaire."
  }
];
  const WORLDS = [
  {
    "id": "astro-scales",
    "title": "Échelles cosmiques",
    "emoji": "📏",
    "subtitle": "Mesurer l’immense",
    "timeframe": "bases",
    "accent": "#60a5fa",
    "group": "astro-foundations",
    "sortStart": 1,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-cosmology",
    "title": "Naissance et évolution de l’Univers",
    "emoji": "🌠",
    "subtitle": "Big Bang, expansion, matière noire",
    "timeframe": "13,8 milliards d’années",
    "accent": "#8b5cf6",
    "group": "astro-foundations",
    "sortStart": 2,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-stellar-life",
    "title": "Vie et mort des étoiles",
    "emoji": "⭐",
    "subtitle": "Fusion, géantes, supernovæ",
    "timeframe": "millions à milliards d’années",
    "accent": "#f59e0b",
    "group": "astro-stars",
    "sortStart": 10,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-sun",
    "title": "Notre étoile : le Soleil",
    "emoji": "☀️",
    "subtitle": "Structure, activité, vents",
    "timeframe": "étoile actuelle",
    "accent": "#f97316",
    "group": "astro-stars",
    "sortStart": 11,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-formation-rocky",
    "title": "Formation et planètes rocheuses",
    "emoji": "🪨",
    "subtitle": "Du disque de poussière aux mondes solides",
    "timeframe": "4,6 milliards d’années",
    "accent": "#fb7185",
    "group": "astro-solar-system",
    "sortStart": 20,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-giants-moons",
    "title": "Planètes géantes et lunes",
    "emoji": "🪐",
    "subtitle": "Atmosphères, anneaux, océans cachés",
    "timeframe": "Système solaire externe",
    "accent": "#38bdf8",
    "group": "astro-solar-system",
    "sortStart": 21,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-small-bodies",
    "title": "Astéroïdes, comètes et impacts",
    "emoji": "☄️",
    "subtitle": "Archives et voyageurs du Système solaire",
    "timeframe": "origines → aujourd’hui",
    "accent": "#a3e635",
    "group": "astro-solar-system",
    "sortStart": 22,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-exoplanets-life",
    "title": "Exoplanètes et vie possible",
    "emoji": "🌍",
    "subtitle": "Détecter l’invisible, chercher des indices",
    "timeframe": "1990 → aujourd’hui",
    "accent": "#22c55e",
    "group": "astro-other-worlds",
    "sortStart": 30,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-observation",
    "title": "Observer et décoder la lumière",
    "emoji": "🔭",
    "subtitle": "Télescopes, spectres, observatoires spatiaux",
    "timeframe": "Galilée → aujourd’hui",
    "accent": "#06b6d4",
    "group": "astro-other-worlds",
    "sortStart": 31,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  },
  {
    "id": "astro-spaceflight",
    "title": "Vol spatial et exploration",
    "emoji": "🚀",
    "subtitle": "Orbites, sondes, Lune et Mars",
    "timeframe": "XXe → XXIe siècle",
    "accent": "#ef4444",
    "group": "astro-exploration",
    "sortStart": 40,
    "discipline": "astronomy",
    "planned": true,
    "unlockedByDefault": false
  }
];
  const LESSONS = {
  "astro-scales": [
    {
      "id": "astro-observable-universe",
      "title": "L’Univers observable : jusqu’où pouvons-nous voir ?",
      "period": "Des premiers instants à aujourd’hui",
      "location": "Univers observable",
      "emoji": "🔭",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-light-years-distances",
      "title": "Année-lumière, parsec et unité astronomique",
      "period": "Mesures astronomiques",
      "location": "Du Système solaire aux galaxies",
      "emoji": "💡",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-cosmology": [
    {
      "id": "astro-big-bang",
      "title": "Le Big Bang : une expansion, pas une explosion dans le vide",
      "period": "Il y a environ 13,8 milliards d’années",
      "location": "Univers primordial",
      "emoji": "🌠",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-expansion-dark-universe",
      "title": "Expansion, matière noire et énergie noire",
      "period": "Univers contemporain",
      "location": "Grandes structures cosmiques",
      "emoji": "🕸️",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-stellar-life": [
    {
      "id": "astro-star-birth-fusion",
      "title": "Comment naît une étoile et pourquoi brille-t-elle ?",
      "period": "Cycle stellaire",
      "location": "Nuages moléculaires et étoiles",
      "emoji": "⭐",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-stellar-deaths",
      "title": "Géantes rouges, supernovæ, étoiles à neutrons et trous noirs",
      "period": "Fin de vie stellaire",
      "location": "Étoiles évoluées et restes compacts",
      "emoji": "💥",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-sun": [
    {
      "id": "astro-sun-structure",
      "title": "Le Soleil de l’intérieur à la couronne",
      "period": "Étoile de 4,6 milliards d’années",
      "location": "Centre du Système solaire",
      "emoji": "☀️",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-solar-activity-auroras",
      "title": "Taches, éruptions, vent solaire et aurores",
      "period": "Cycle solaire et météo de l’espace",
      "location": "Soleil, magnétosphères et hautes atmosphères",
      "emoji": "🌌",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-formation-rocky": [
    {
      "id": "astro-solar-system-formation",
      "title": "Comment s’est formé le Système solaire ?",
      "period": "Il y a environ 4,6 milliards d’années",
      "location": "Nébuleuse solaire",
      "emoji": "🌀",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-rocky-planets",
      "title": "Mercure, Vénus, Terre et Mars : quatre mondes rocheux",
      "period": "Système solaire interne",
      "location": "Mercure, Vénus, Terre et Mars",
      "emoji": "🪨",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-giants-moons": [
    {
      "id": "astro-giant-planets",
      "title": "Jupiter, Saturne, Uranus et Neptune",
      "period": "Système solaire externe",
      "location": "Planètes géantes",
      "emoji": "🪐",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-ocean-moons",
      "title": "Lunes océans : Europe, Encelade et autres mondes cachés",
      "period": "Système solaire externe",
      "location": "Lunes glacées",
      "emoji": "🌊",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-small-bodies": [
    {
      "id": "astro-asteroids-comets",
      "title": "Astéroïdes et comètes : les archives du Système solaire",
      "period": "Origines du Système solaire",
      "location": "Ceintures, noyaux glacés et petits corps",
      "emoji": "☄️",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-meteors-impacts",
      "title": "Météore, météorite et risque d’impact",
      "period": "Phénomènes actuels et histoire planétaire",
      "location": "Atmosphères et surfaces planétaires",
      "emoji": "🌠",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-exoplanets-life": [
    {
      "id": "astro-exoplanet-detection",
      "title": "Comment détecter une planète invisible autour d’une autre étoile ?",
      "period": "Astronomie contemporaine",
      "location": "Systèmes extrasolaires",
      "emoji": "🪐",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-habitable-zone-biosignatures",
      "title": "Zone habitable, biosignatures et paradoxe de Fermi",
      "period": "Recherche contemporaine",
      "location": "Exoplanètes et astrobiologie",
      "emoji": "🧬",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-observation": [
    {
      "id": "astro-telescopes-spectrum",
      "title": "Télescopes et spectres : lire la lumière des astres",
      "period": "De l’optique moderne à aujourd’hui",
      "location": "Observatoires au sol",
      "emoji": "🌈",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-space-telescopes",
      "title": "Pourquoi envoyer des télescopes dans l’espace ?",
      "period": "XXe → XXIe siècle",
      "location": "Orbites terrestres et points de Lagrange",
      "emoji": "🛰️",
      "xp": 70,
      "order": 2
    }
  ],
  "astro-spaceflight": [
    {
      "id": "astro-rockets-orbits",
      "title": "Fusées, vitesse orbitale et gravité",
      "period": "Principes du vol spatial",
      "location": "Terre et espace proche",
      "emoji": "🚀",
      "xp": 70,
      "order": 1
    },
    {
      "id": "astro-moon-mars-exploration",
      "title": "Explorer la Lune et Mars : robots, humains et objectifs scientifiques",
      "period": "1959 → aujourd’hui",
      "location": "Lune et Mars",
      "emoji": "🌕",
      "xp": 70,
      "order": 2
    }
  ]
};
  const PACKS = {
  "astro-observable-universe": {
    "hook": "Regarder loin dans l’espace revient à regarder dans le passé : la lumière transporte une information qui a parfois voyagé pendant des milliards d’années.",
    "keyFacts": [
      "La région dont des signaux ont eu le temps de nous parvenir.",
      "Parce que sa lumière met du temps à nous atteindre.",
      "Non, c’est une limite d’information liée au trajet possible des signaux.",
      "Le fond diffus cosmologique.",
      "Parce que l’espace s’est dilaté pendant le trajet de la lumière."
    ],
    "express": [
      "L’Univers désigne tout l’espace-temps et son contenu. L’Univers observable est seulement la région dont la lumière a eu le temps de nous atteindre depuis les premiers temps cosmiques. Cette limite n’est pas un mur matériel : elle dépend de notre position, de l’âge de l’Univers et de son expansion.",
      "Une galaxie très lointaine apparaît telle qu’elle était lorsque sa lumière est partie. Les télescopes fonctionnent donc comme des machines à remonter le temps. Ils ne montrent jamais l’état présent d’un objet éloigné, mais une image ancienne, parfois antérieure à la formation du Soleil.",
      "L’Univers peut être bien plus vaste que la partie observable, voire infini ; les observations actuelles ne permettent pas de voir au-delà de l’horizon cosmologique. Il faut donc distinguer ce que les modèles décrivent, ce que les instruments mesurent et ce qui demeure inaccessible directement."
    ],
    "complete": [
      {
        "title": "1. Observable ne signifie pas total",
        "text": "Notre horizon cosmologique est défini par les signaux capables de nous parvenir. Chaque observateur possède son propre Univers observable, centré sur sa position. Rien ne garantit que la totalité de l’Univers s’arrête à cette frontière. La confusion vient souvent des images montrant une sphère comme si elle flottait dans un espace extérieur connu."
      },
      {
        "title": "2. Voir loin, c’est voir ancien",
        "text": "La lumière ne se propage pas instantanément. Le Soleil est vu avec environ huit minutes de retard ; les étoiles proches avec plusieurs années ; les galaxies lointaines avec des millions ou milliards d’années. Cette durée transforme chaque observation astronomique en archive de l’évolution cosmique."
      },
      {
        "title": "3. L’expansion complique les distances",
        "text": "Pendant que la lumière voyage, l’espace entre les grandes structures peut s’étirer. La distance actuelle d’une galaxie très ancienne n’est donc pas simplement égale au temps de trajet de sa lumière multiplié par sa vitesse. Les cosmologistes utilisent plusieurs définitions de distance selon la question posée."
      },
      {
        "title": "4. Une frontière d’information",
        "text": "Avant une certaine époque, l’Univers était trop chaud et opaque pour laisser circuler librement la lumière. Le fond diffus cosmologique constitue la plus ancienne lumière directement observable. D’autres messagers, comme les neutrinos ou les ondes gravitationnelles, pourraient donner accès à des phases encore plus anciennes."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "L’Univers désigne tout l’espace-temps et son contenu."
      },
      {
        "label": "Mécanisme",
        "text": "Une galaxie très lointaine apparaît telle qu’elle était lorsque sa lumière est partie."
      },
      {
        "label": "Nuance",
        "text": "L’Univers peut être bien plus vaste que la partie observable, voire infini ; les observations actuelles ne permettent pas de voir au-delà de l’horizon cosmologique."
      },
      {
        "label": "À retenir",
        "text": "Regarder loin dans l’espace revient à regarder dans le passé : la lumière transporte une information qui a parfois voyagé pendant des milliards d’années."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Que désigne l’Univers observable ?",
        "a": "La région dont des signaux ont eu le temps de nous parvenir.",
        "choices": [
          "Une sphère matérielle qui enferme toutes les galaxies.",
          "Uniquement la Voie lactée.",
          "La partie de l’espace visible à l’œil nu."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi une galaxie lointaine est-elle vue dans le passé ?",
        "a": "Parce que sa lumière met du temps à nous atteindre.",
        "choices": [
          "Parce que les galaxies reculeraient dans le temps.",
          "Parce que les télescopes enregistrent avec retard.",
          "Parce que la lumière ralentit près de la Terre."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "L’horizon cosmologique est-il un mur ?",
        "a": "Non, c’est une limite d’information liée au trajet possible des signaux.",
        "choices": [
          "Oui, il réfléchit la lumière.",
          "Oui, il marque le bord certain de l’Univers.",
          "Non, mais il correspond à la limite de la Voie lactée."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Quel rayonnement est la plus ancienne lumière directement observée ?",
        "a": "Le fond diffus cosmologique.",
        "choices": [
          "La lumière du Soleil.",
          "Les aurores polaires.",
          "Le rayonnement d’une supernova récente."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi plusieurs définitions de distance sont-elles utilisées ?",
        "a": "Parce que l’espace s’est dilaté pendant le trajet de la lumière.",
        "choices": [
          "Parce que la vitesse de la lumière change chaque année.",
          "Parce que les galaxies n’ont pas de position.",
          "Parce que les unités astronomiques sont imprécises."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-light-years-distances": {
    "hook": "Les astronomes changent d’unité comme on change d’échelle sur une carte : kilomètres près de la Terre, unités astronomiques autour du Soleil, années-lumière et parsecs pour les étoiles.",
    "keyFacts": [
      "Une distance parcourue par la lumière en une année.",
      "À la distance moyenne entre la Terre et le Soleil.",
      "Il est défini à partir de l’angle apparent d’un objet observé depuis l’orbite terrestre.",
      "La parallaxe stellaire.",
      "Parce qu’aucune méthode unique ne fonctionne de façon précise à toutes les distances."
    ],
    "express": [
      "Une année-lumière est une distance, pas une durée : c’est le trajet effectué par la lumière dans le vide pendant une année, soit environ 9 460 milliards de kilomètres. Elle sert à exprimer des séparations stellaires sans aligner des suites de zéros difficiles à lire.",
      "Dans le Système solaire, l’unité astronomique correspond approximativement à la distance moyenne entre la Terre et le Soleil, environ 150 millions de kilomètres. Le parsec, utilisé par les professionnels, vient de la parallaxe : un parsec vaut environ 3,26 années-lumière.",
      "Aucune unité ne supprime la difficulté de mesurer. Les astronomes combinent radar, parallaxe, luminosité d’objets étalons et décalage spectral. Chaque méthode fonctionne sur une plage de distances et repose sur des hypothèses qu’il faut contrôler."
    ],
    "complete": [
      {
        "title": "1. Une unité adaptée à chaque domaine",
        "text": "Les kilomètres restent pratiques pour les satellites et les planètes proches. L’unité astronomique décrit les orbites autour du Soleil. L’année-lumière donne une image intuitive du temps de trajet de la lumière, tandis que le parsec se relie directement à une méthode géométrique de mesure."
      },
      {
        "title": "2. La parallaxe stellaire",
        "text": "La Terre observe une étoile depuis deux positions opposées de son orbite. L’étoile proche semble légèrement se déplacer par rapport au fond très lointain. L’angle est minuscule, mais il permet de construire un triangle et d’obtenir une distance sans supposer la luminosité réelle de l’astre."
      },
      {
        "title": "3. Une échelle en plusieurs barreaux",
        "text": "Quand la parallaxe devient trop faible, on utilise des étoiles dont la luminosité intrinsèque peut être déduite, puis certaines supernovæ. En comparant luminosité réelle et luminosité reçue, on estime la distance. Les méthodes se chevauchent afin de calibrer une véritable échelle cosmique."
      },
      {
        "title": "4. Les nombres ne sont pas les objets",
        "text": "Dire qu’Alpha du Centaure est à quelques années-lumière ne signifie pas qu’un voyage humain y prendrait seulement quelques années. Nos engins sont beaucoup plus lents que la lumière. Les unités servent à décrire l’Univers ; elles ne garantissent pas une technologie capable de le traverser rapidement."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Une année-lumière est une distance, pas une durée : c’est le trajet effectué par la lumière dans le vide pendant une année, soit environ 9 460 milliards de kilomètres."
      },
      {
        "label": "Mécanisme",
        "text": "Dans le Système solaire, l’unité astronomique correspond approximativement à la distance moyenne entre la Terre et le Soleil, environ 150 millions de kilomètres."
      },
      {
        "label": "Nuance",
        "text": "Aucune unité ne supprime la difficulté de mesurer."
      },
      {
        "label": "À retenir",
        "text": "Les astronomes changent d’unité comme on change d’échelle sur une carte : kilomètres près de la Terre, unités astronomiques autour du Soleil, années-lumière et parsecs pour les étoiles."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Une année-lumière mesure quoi ?",
        "a": "Une distance parcourue par la lumière en une année.",
        "choices": [
          "Une durée de vie d’une étoile.",
          "La luminosité annuelle du Soleil.",
          "La vitesse moyenne d’une fusée."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "À quoi correspond une unité astronomique ?",
        "a": "À la distance moyenne entre la Terre et le Soleil.",
        "choices": [
          "À la distance Terre-Lune.",
          "À une année-lumière exacte.",
          "Au diamètre de la Voie lactée."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Pourquoi le parsec est-il lié à la parallaxe ?",
        "a": "Il est défini à partir de l’angle apparent d’un objet observé depuis l’orbite terrestre.",
        "choices": [
          "Il mesure la couleur des étoiles.",
          "Il correspond au temps d’une orbite.",
          "Il est déterminé par la masse du Soleil."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Quelle méthode fournit une distance géométrique pour les étoiles proches ?",
        "a": "La parallaxe stellaire.",
        "choices": [
          "Le comptage des planètes.",
          "La température de l’atmosphère terrestre.",
          "La forme des constellations."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi faut-il une échelle des distances ?",
        "a": "Parce qu’aucune méthode unique ne fonctionne de façon précise à toutes les distances.",
        "choices": [
          "Parce que les unités changent avec les saisons.",
          "Parce que la lumière n’a pas de vitesse fixe.",
          "Parce que les galaxies refusent les mesures radar."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-big-bang": {
    "hook": "Le Big Bang ne décrit pas une bombe partie d’un point au milieu d’un espace vide. Il décrit un Univers ancien extrêmement chaud et dense, dont l’espace s’est ensuite dilaté et refroidi.",
    "keyFacts": [
      "L’évolution d’un Univers très chaud et dense qui se dilate et se refroidit.",
      "Parce que l’expansion concerne l’espace lui-même et n’a pas de centre global identifié.",
      "Le fond diffus cosmologique.",
      "Dans les étoiles et certains événements stellaires.",
      "Non, il décrit très bien une évolution ancienne sans résoudre toutes les questions sur l’instant initial."
    ],
    "express": [
      "Le modèle du Big Bang repose sur plusieurs observations concordantes : l’expansion cosmique, l’abondance des éléments légers et le fond diffus cosmologique. Il ne raconte pas forcément un instant zéro absolu ; il décrit avec succès l’évolution de l’Univers depuis un état très chaud et très dense.",
      "À mesure que l’Univers se dilate, sa température baisse. Des particules se forment, puis des noyaux légers. Bien plus tard, électrons et noyaux s’associent en atomes ; la lumière peut alors circuler librement. Cette lumière refroidie est aujourd’hui observée sous forme de micro-ondes.",
      "Le mot explosion est trompeur, car il suggère une matière projetée dans un espace préexistant depuis un centre. Dans le modèle cosmologique, c’est la distance entre les grandes régions de l’espace qui augmente. Aucun lieu n’est identifié comme centre de l’expansion globale."
    ],
    "complete": [
      {
        "title": "1. Des preuves indépendantes",
        "text": "Les galaxies lointaines présentent en moyenne un décalage spectral associé à l’expansion. Les proportions d’hydrogène, d’hélium et de lithium correspondent aux réactions possibles dans un Univers très chaud. Le fond diffus cosmologique montre enfin une lumière presque uniforme, avec de petites variations à l’origine des structures futures."
      },
      {
        "title": "2. Les premières minutes",
        "text": "Lorsque la température devient compatible avec des noyaux stables, protons et neutrons produisent surtout de l’hydrogène et de l’hélium, avec de faibles quantités d’autres éléments légers. Les éléments lourds, comme le carbone ou le fer, seront principalement fabriqués plus tard dans les étoiles."
      },
      {
        "title": "3. La libération de la lumière",
        "text": "Pendant des centaines de milliers d’années, la matière ionisée diffuse sans cesse les photons. Quand des atomes neutres se forment, la lumière se découple de la matière. L’expansion allonge ensuite sa longueur d’onde jusqu’au domaine des micro-ondes : c’est le fond diffus cosmologique."
      },
      {
        "title": "4. Ce que le modèle ne résout pas seul",
        "text": "La physique connue devient insuffisante lorsqu’on remonte vers des densités extrêmes. L’origine ultime, la nature d’une éventuelle phase d’inflation ou la manière d’unifier gravitation et physique quantique restent des questions de recherche. Un bon modèle peut être très solide sans répondre à tout."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Le modèle du Big Bang repose sur plusieurs observations concordantes : l’expansion cosmique, l’abondance des éléments légers et le fond diffus cosmologique."
      },
      {
        "label": "Mécanisme",
        "text": "À mesure que l’Univers se dilate, sa température baisse."
      },
      {
        "label": "Nuance",
        "text": "Le mot explosion est trompeur, car il suggère une matière projetée dans un espace préexistant depuis un centre."
      },
      {
        "label": "À retenir",
        "text": "Le Big Bang ne décrit pas une bombe partie d’un point au milieu d’un espace vide. Il décrit un Univers ancien extrêmement chaud et dense, dont l’espace s’est ensuite dilaté et refroidi."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Que décrit principalement le Big Bang ?",
        "a": "L’évolution d’un Univers très chaud et dense qui se dilate et se refroidit.",
        "choices": [
          "Une étoile géante qui explose.",
          "Une collision entre deux galaxies dans un vide immobile.",
          "La naissance du Soleil."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi l’image d’une explosion centrale est-elle trompeuse ?",
        "a": "Parce que l’expansion concerne l’espace lui-même et n’a pas de centre global identifié.",
        "choices": [
          "Parce que le Big Bang a eu lieu dans la Voie lactée.",
          "Parce qu’aucune matière n’existait après lui.",
          "Parce que les galaxies se déplacent toutes vers un même point."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Quelle lumière ancienne observe-t-on aujourd’hui en micro-ondes ?",
        "a": "Le fond diffus cosmologique.",
        "choices": [
          "Le vent solaire.",
          "La lumière réfléchie par la Lune.",
          "Les rayons d’une supernova médiévale."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Où les éléments lourds sont-ils surtout fabriqués ?",
        "a": "Dans les étoiles et certains événements stellaires.",
        "choices": [
          "Uniquement pendant les premières secondes du Big Bang.",
          "Dans les océans terrestres.",
          "Dans les comètes froides."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Le modèle du Big Bang explique-t-il nécessairement l’origine ultime ?",
        "a": "Non, il décrit très bien une évolution ancienne sans résoudre toutes les questions sur l’instant initial.",
        "choices": [
          "Oui, il décrit chaque phénomène avant le temps.",
          "Non, car il ne possède aucune preuve.",
          "Oui, et il exclut toute nouvelle physique."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-expansion-dark-universe": {
    "hook": "La matière visible ne suffit pas à expliquer la vitesse des étoiles dans les galaxies, la formation des grandes structures ni l’accélération actuelle de l’expansion. Les cosmologistes utilisent alors deux notions distinctes : matière noire et énergie noire.",
    "keyFacts": [
      "Entre de grandes structures éloignées qui ne sont pas liées localement.",
      "Parce qu’une masse non lumineuse est inférée par ses effets gravitationnels.",
      "Les vitesses dans les galaxies et la formation des grandes structures.",
      "Le nom donné à la cause encore inconnue de l’accélération cosmique.",
      "Elles répondent à des observations différentes : gravitation supplémentaire et accélération de l’expansion."
    ],
    "express": [
      "L’expansion de l’Univers signifie qu’à grande échelle les distances entre régions non liées gravitationnellement augmentent. Les galaxies d’un même groupe peuvent toutefois se rapprocher ou fusionner : l’expansion ne gonfle pas les êtres humains, les planètes ni les systèmes maintenus par des forces locales.",
      "La matière noire est déduite de ses effets gravitationnels. Elle aide à expliquer les vitesses orbitales dans les galaxies, les lentilles gravitationnelles et la croissance des structures. Elle n’émet pas de lumière détectable comme la matière ordinaire, et sa nature microscopique reste inconnue.",
      "L’énergie noire est le nom donné à ce qui semble provoquer l’accélération de l’expansion cosmique. Elle n’est pas une réserve d’énergie sombre à l’intérieur des galaxies. Les deux notions décrivent des problèmes différents et constituent encore une grande part de l’inventaire cosmologique."
    ],
    "complete": [
      {
        "title": "1. Expansion et gravitation locale",
        "text": "Une galaxie, un amas compact ou le Système solaire sont liés par la gravitation. À leur échelle, cette attraction domine. L’expansion se mesure surtout entre grandes structures éloignées. Dire que l’Univers se dilate ne signifie donc pas que chaque objet se met à grandir proportionnellement."
      },
      {
        "title": "2. Les indices de matière noire",
        "text": "Dans de nombreuses galaxies, les étoiles extérieures tournent trop vite pour la seule masse visible. Les amas dévient davantage la lumière qu’attendu. Les simulations de formation des structures fonctionnent mieux avec une composante massive supplémentaire. Ces indices différents pointent vers un même manque gravitationnel."
      },
      {
        "title": "3. Une expansion accélérée",
        "text": "Des observations de supernovæ lointaines ont montré à la fin du XXe siècle que l’expansion ne ralentissait pas comme prévu, mais accélérait. Une constante cosmologique peut reproduire cet effet, mais son interprétation physique reste difficile. Le terme énergie noire regroupe cette énigme plutôt qu’une substance déjà comprise."
      },
      {
        "title": "4. Modèle robuste, ingrédients mystérieux",
        "text": "Le modèle cosmologique standard décrit remarquablement plusieurs observations avec peu de paramètres. Pourtant, la matière ordinaire que nous connaissons ne représente qu’une minorité du contenu total inféré. Cela illustre une idée essentielle : mesurer précisément les effets d’un phénomène ne signifie pas encore connaître sa nature profonde."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "L’expansion de l’Univers signifie qu’à grande échelle les distances entre régions non liées gravitationnellement augmentent."
      },
      {
        "label": "Mécanisme",
        "text": "La matière noire est déduite de ses effets gravitationnels."
      },
      {
        "label": "Nuance",
        "text": "L’énergie noire est le nom donné à ce qui semble provoquer l’accélération de l’expansion cosmique."
      },
      {
        "label": "À retenir",
        "text": "La matière visible ne suffit pas à expliquer la vitesse des étoiles dans les galaxies, la formation des grandes structures ni l’accélération actuelle de l’expansion. Les cosmologistes utilisent alors deux notions distinctes : matière noire et énergie noire."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "À quelle échelle l’expansion est-elle surtout mesurée ?",
        "a": "Entre de grandes structures éloignées qui ne sont pas liées localement.",
        "choices": [
          "À l’intérieur des atomes.",
          "Dans la taille quotidienne des humains.",
          "Entre la Terre et la Lune à chaque seconde."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi parle-t-on de matière noire ?",
        "a": "Parce qu’une masse non lumineuse est inférée par ses effets gravitationnels.",
        "choices": [
          "Parce que toutes les étoiles noires ont disparu.",
          "Parce qu’elle absorbe nécessairement toute lumière.",
          "Parce qu’elle est faite de trous noirs uniquement."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Quel phénomène la matière noire aide-t-elle à expliquer ?",
        "a": "Les vitesses dans les galaxies et la formation des grandes structures.",
        "choices": [
          "La couleur bleue du ciel terrestre.",
          "Les saisons.",
          "La radioactivité des roches."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Que désigne l’énergie noire ?",
        "a": "Le nom donné à la cause encore inconnue de l’accélération cosmique.",
        "choices": [
          "Le carburant des étoiles.",
          "L’énergie stockée dans les trous noirs seulement.",
          "La lumière invisible des planètes."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi matière noire et énergie noire ne sont-elles pas interchangeables ?",
        "a": "Elles répondent à des observations différentes : gravitation supplémentaire et accélération de l’expansion.",
        "choices": [
          "Elles ont exactement la même fonction.",
          "La première existe dans le passé et la seconde aujourd’hui.",
          "L’une est une unité de distance."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-star-birth-fusion": {
    "hook": "Une étoile naît lorsque la gravitation rassemble une partie d’un nuage froid de gaz et de poussière. Elle commence réellement sa longue vie stable lorsque son cœur devient assez chaud et dense pour entretenir la fusion nucléaire.",
    "keyFacts": [
      "Dans des régions denses de nuages froids de gaz et de poussière.",
      "Quand la fusion de l’hydrogène s’entretient dans son cœur.",
      "La pression du gaz chaud et du rayonnement produits par l’énergie interne.",
      "Elles consomment leur combustible beaucoup plus rapidement.",
      "Il alimente l’étoile et fournit la matière d’un futur système planétaire."
    ],
    "express": [
      "Les nuages moléculaires ne s’effondrent pas entièrement d’un seul bloc. Des régions plus denses se contractent, se fragmentent et forment des protoétoiles entourées de disques. La rotation, le champ magnétique, les turbulences et le rayonnement influencent la matière qui continue de tomber.",
      "Dans le cœur, pression et température augmentent jusqu’à permettre la fusion de noyaux d’hydrogène en hélium. Une petite partie de la masse est convertie en énergie. Le rayonnement et la pression produits s’opposent à la gravitation : cet équilibre maintient l’étoile stable pendant l’essentiel de sa vie.",
      "La masse initiale décide presque tout. Une petite étoile consomme son combustible lentement et peut vivre très longtemps. Une étoile massive est plus chaude et lumineuse, mais brûle ses réserves beaucoup plus vite. Briller davantage ne signifie donc pas vivre plus longtemps."
    ],
    "complete": [
      {
        "title": "1. Un effondrement local",
        "text": "Une perturbation, une onde de choc ou la propre instabilité du nuage peut favoriser l’effondrement d’une région. La gravitation transforme l’énergie de chute en chaleur. La protoétoile n’est pas encore alimentée principalement par la fusion, même si elle peut déjà rayonner fortement."
      },
      {
        "title": "2. Le rôle du disque",
        "text": "La matière possédant du mouvement ne tombe pas directement au centre : elle forme un disque d’accrétion. Des jets peuvent évacuer une partie du moment angulaire. Ce disque constitue aussi le milieu où des grains s’assemblent et où un système planétaire peut commencer à se construire."
      },
      {
        "title": "3. Fusion et équilibre hydrostatique",
        "text": "La gravitation tend à comprimer l’étoile. La pression du gaz chaud et du rayonnement tend à l’étendre. Tant que la production d’énergie du cœur compense les pertes, l’étoile reste sur la séquence principale. Cet équilibre dynamique n’est ni immobile ni éternel."
      },
      {
        "title": "4. La masse fixe le rythme",
        "text": "La pression centrale d’une étoile massive permet des réactions rapides. Sa luminosité augmente très fortement avec sa masse, si bien qu’elle épuise son hydrogène en quelques millions d’années. Une naine rouge peut au contraire rester stable pendant des durées dépassant largement l’âge actuel de l’Univers."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Les nuages moléculaires ne s’effondrent pas entièrement d’un seul bloc."
      },
      {
        "label": "Mécanisme",
        "text": "Dans le cœur, pression et température augmentent jusqu’à permettre la fusion de noyaux d’hydrogène en hélium."
      },
      {
        "label": "Nuance",
        "text": "La masse initiale décide presque tout."
      },
      {
        "label": "À retenir",
        "text": "Une étoile naît lorsque la gravitation rassemble une partie d’un nuage froid de gaz et de poussière. Elle commence réellement sa longue vie stable lorsque son cœur devient assez chaud et dense pour entretenir la fusion nucléaire."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Où naissent les étoiles ?",
        "a": "Dans des régions denses de nuages froids de gaz et de poussière.",
        "choices": [
          "Dans le vide absolu entre les galaxies.",
          "À la surface des planètes.",
          "Dans les queues de comètes uniquement."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Quand une protoétoile devient-elle une étoile stable ?",
        "a": "Quand la fusion de l’hydrogène s’entretient dans son cœur.",
        "choices": [
          "Quand elle possède une planète.",
          "Quand elle devient visible depuis la Terre.",
          "Quand toute sa poussière disparaît."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Qu’est-ce qui équilibre la gravitation dans une étoile ?",
        "a": "La pression du gaz chaud et du rayonnement produits par l’énergie interne.",
        "choices": [
          "La force des planètes en orbite.",
          "Le vent interstellaire uniquement.",
          "La rotation de la galaxie."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi les étoiles massives vivent-elles moins longtemps ?",
        "a": "Elles consomment leur combustible beaucoup plus rapidement.",
        "choices": [
          "Elles possèdent moins d’hydrogène.",
          "Elles ne réalisent aucune fusion.",
          "Elles sont toujours plus anciennes."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Quel rôle un disque autour d’une protoétoile peut-il jouer ?",
        "a": "Il alimente l’étoile et fournit la matière d’un futur système planétaire.",
        "choices": [
          "Il bloque définitivement la gravitation.",
          "Il transforme immédiatement tout le gaz en lumière.",
          "Il empêche toute planète de se former."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-stellar-deaths": {
    "hook": "La mort d’une étoile n’est pas unique. Elle dépend surtout de sa masse : le Soleil finira en naine blanche, tandis que les étoiles les plus massives peuvent exploser et laisser une étoile à neutrons ou un trou noir.",
    "keyFacts": [
      "Une naine blanche.",
      "La fusion du fer ne fournit plus l’énergie permettant de soutenir le cœur.",
      "Une étoile à neutrons en rotation dont le rayonnement est reçu périodiquement.",
      "La frontière au-delà de laquelle aucun signal ne peut revenir vers l’extérieur.",
      "Elles dispersent des éléments fabriqués par les étoiles dans le milieu interstellaire."
    ],
    "express": [
      "Quand l’hydrogène central se raréfie, le cœur se contracte et les couches externes se dilatent. Une étoile de masse modérée devient géante rouge, expulse progressivement son enveloppe puis conserve un cœur dense : une naine blanche, soutenue par la pression quantique des électrons.",
      "Une étoile massive peut fusionner des éléments de plus en plus lourds jusqu’au fer. La fusion du fer ne fournit plus l’énergie nécessaire pour soutenir le cœur. Celui-ci s’effondre brutalement ; les couches externes rebondissent et sont expulsées dans une supernova, qui disperse des éléments dans l’espace.",
      "Le reste comprimé peut devenir une étoile à neutrons de quelques dizaines de kilomètres, parfois observée comme pulsar. Si la masse du cœur est trop grande pour être soutenue, l’effondrement produit un trou noir, région dont l’horizon empêche même la lumière de ressortir."
    ],
    "complete": [
      {
        "title": "1. Le destin du Soleil",
        "text": "Le Soleil n’est pas assez massif pour exploser en supernova. Après sa phase de géante rouge, il éjectera ses couches externes. Son cœur chaud deviendra une naine blanche, qui se refroidira lentement sans nouvelle fusion durable."
      },
      {
        "title": "2. La fabrication des éléments",
        "text": "Les étoiles produisent des éléments par fusion, mais les conditions extrêmes de certaines explosions ou collisions sont nécessaires pour une partie des noyaux les plus lourds. La matière des planètes et des êtres vivants a donc été enrichie par plusieurs générations stellaires."
      },
      {
        "title": "3. Une étoile à neutrons",
        "text": "Lors de l’effondrement, électrons et protons peuvent se combiner en neutrons. La matière devient extraordinairement dense. Un pulsar est une étoile à neutrons en rotation dont les faisceaux de rayonnement balayent périodiquement la Terre, comme un phare cosmique."
      },
      {
        "title": "4. Un trou noir n’aspire pas tout",
        "text": "À distance égale, un trou noir attire comme n’importe quel objet de même masse. Il devient dangereux lorsqu’on s’approche très près. Son horizon des événements marque une frontière causale : une fois franchie, aucune trajectoire ne ramène un signal vers l’extérieur."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Géantes rouges, supernovæ, étoiles à neutrons et trous noirs », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Quand l’hydrogène central se raréfie, le cœur se contracte et les couches externes se dilatent."
      },
      {
        "label": "Mécanisme",
        "text": "Une étoile massive peut fusionner des éléments de plus en plus lourds jusqu’au fer."
      },
      {
        "label": "Nuance",
        "text": "Le reste comprimé peut devenir une étoile à neutrons de quelques dizaines de kilomètres, parfois observée comme pulsar."
      },
      {
        "label": "À retenir",
        "text": "La mort d’une étoile n’est pas unique. Elle dépend surtout de sa masse : le Soleil finira en naine blanche, tandis que les étoiles les plus massives peuvent exploser et laisser une étoile à neutrons ou un trou noir."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Quel sera probablement le reste final du Soleil ?",
        "a": "Une naine blanche.",
        "choices": [
          "Une étoile à neutrons.",
          "Un trou noir supermassif.",
          "Une nouvelle galaxie."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi le cœur d’une étoile massive s’effondre-t-il après la formation de fer ?",
        "a": "La fusion du fer ne fournit plus l’énergie permettant de soutenir le cœur.",
        "choices": [
          "Le fer repousse la gravitation.",
          "Le cœur devient soudain froid et vide.",
          "Toutes les réactions nucléaires inversent le temps."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Qu’est-ce qu’un pulsar ?",
        "a": "Une étoile à neutrons en rotation dont le rayonnement est reçu périodiquement.",
        "choices": [
          "Une planète qui clignote.",
          "Une étoile ordinaire cachée par une lune.",
          "Une comète très rapide."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Que marque l’horizon d’un trou noir ?",
        "a": "La frontière au-delà de laquelle aucun signal ne peut revenir vers l’extérieur.",
        "choices": [
          "Une surface solide et lumineuse.",
          "La limite de toute gravitation dans l’Univers.",
          "Le bord de la galaxie."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi les supernovæ sont-elles importantes pour la matière cosmique ?",
        "a": "Elles dispersent des éléments fabriqués par les étoiles dans le milieu interstellaire.",
        "choices": [
          "Elles détruisent tous les éléments lourds.",
          "Elles produisent uniquement de l’hydrogène.",
          "Elles empêchent toute nouvelle étoile."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-sun-structure": {
    "hook": "Le Soleil est une étoile ordinaire par sa catégorie, mais décisive pour la Terre. Son énergie naît dans un cœur inaccessible, traverse lentement l’intérieur puis s’échappe depuis une surface apparente appelée photosphère.",
    "keyFacts": [
      "Dans le cœur par fusion nucléaire.",
      "La couche apparente d’où la lumière visible s’échappe efficacement.",
      "Notamment par convection du plasma.",
      "Elle est beaucoup plus chaude que la photosphère située dessous.",
      "Environ huit minutes."
    ],
    "express": [
      "Le cœur concentre les températures et pressions permettant la fusion de l’hydrogène. L’énergie produite est transportée d’abord surtout par rayonnement, puis par convection dans les couches externes : du plasma chaud monte, se refroidit et redescend en cellules visibles sous forme de granulation.",
      "La photosphère n’est pas une surface solide ; elle correspond à la couche d’où la lumière s’échappe efficacement. Au-dessus se trouvent la chromosphère et la couronne. Étrangement, la couronne atteint des températures bien supérieures à celles de la photosphère, grâce à des mécanismes magnétiques encore étudiés.",
      "Le Soleil contient l’immense majorité de la masse du Système solaire. Sa gravitation organise les orbites, tandis que son rayonnement et son vent de particules influencent atmosphères, magnétosphères et comètes. Il évolue lentement et deviendra une géante rouge dans plusieurs milliards d’années."
    ],
    "complete": [
      {
        "title": "1. Une centrale de fusion",
        "text": "Dans le cœur, une chaîne de réactions transforme globalement quatre noyaux d’hydrogène en un noyau d’hélium. La masse finale est légèrement plus faible ; la différence apparaît sous forme d’énergie selon l’équivalence entre masse et énergie."
      },
      {
        "title": "2. Un long trajet vers l’extérieur",
        "text": "Un photon produit au cœur n’effectue pas une ligne droite jusqu’à la surface. Il interagit un très grand nombre de fois avec le plasma. L’énergie est absorbée, réémise et transportée pendant une durée immense, alors que la lumière libérée par la photosphère rejoint ensuite la Terre en environ huit minutes."
      },
      {
        "title": "3. Une atmosphère magnétique",
        "text": "La chromosphère et la couronne montrent arches, boucles et jets liés au champ magnétique. Des ondes et reconnexions magnétiques transfèrent de l’énergie au plasma. Le chauffage coronal reste un exemple de problème scientifique dont le cadre général est connu mais les détails encore discutés."
      },
      {
        "title": "4. Une étoile qui change lentement",
        "text": "Le Soleil devient progressivement plus lumineux au cours de sa vie principale. Lorsque l’hydrogène central sera épuisé, son cœur se contractera et ses couches externes se dilateront. Cette évolution est très lente à l’échelle humaine, mais transforme profondément l’habitabilité à long terme."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Le cœur concentre les températures et pressions permettant la fusion de l’hydrogène."
      },
      {
        "label": "Mécanisme",
        "text": "La photosphère n’est pas une surface solide ; elle correspond à la couche d’où la lumière s’échappe efficacement."
      },
      {
        "label": "Nuance",
        "text": "Le Soleil contient l’immense majorité de la masse du Système solaire."
      },
      {
        "label": "À retenir",
        "text": "Le Soleil est une étoile ordinaire par sa catégorie, mais décisive pour la Terre. Son énergie naît dans un cœur inaccessible, traverse lentement l’intérieur puis s’échappe depuis une surface apparente appelée photosphère."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Où l’énergie solaire est-elle principalement produite ?",
        "a": "Dans le cœur par fusion nucléaire.",
        "choices": [
          "Dans la photosphère par combustion.",
          "Dans les taches solaires.",
          "Dans les planètes proches."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Qu’est-ce que la photosphère ?",
        "a": "La couche apparente d’où la lumière visible s’échappe efficacement.",
        "choices": [
          "Une coque solide.",
          "Le noyau du Soleil.",
          "La limite de son champ gravitationnel."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Comment l’énergie traverse-t-elle les couches externes ?",
        "a": "Notamment par convection du plasma.",
        "choices": [
          "Par des océans liquides.",
          "Par des roches conductrices.",
          "Uniquement par des météorites."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi la couronne intrigue-t-elle les scientifiques ?",
        "a": "Elle est beaucoup plus chaude que la photosphère située dessous.",
        "choices": [
          "Elle est entièrement froide.",
          "Elle ne contient aucune matière.",
          "Elle tourne autour de la Terre."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Combien de temps la lumière libérée à la surface met-elle environ pour atteindre la Terre ?",
        "a": "Environ huit minutes.",
        "choices": [
          "Huit secondes.",
          "Un an.",
          "Plusieurs millions d’années après sa sortie de la surface."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-solar-activity-auroras": {
    "hook": "Le Soleil n’éclaire pas seulement : il projette continuellement un vent de particules et connaît des éruptions capables de perturber l’environnement spatial terrestre. Les aurores sont l’une des manifestations visibles de cette interaction.",
    "keyFacts": [
      "Elle est plus froide que la photosphère environnante et apparaît sombre par contraste.",
      "Environ onze ans.",
      "Un vaste nuage de plasma et de champ magnétique expulsé par le Soleil.",
      "Des particules guidées par le champ terrestre excitent les gaz de la haute atmosphère.",
      "Les satellites, communications, systèmes de navigation ou réseaux électriques."
    ],
    "express": [
      "Les taches solaires sont des régions temporairement plus froides de la photosphère, liées à des champs magnétiques intenses. Leur nombre varie selon un cycle d’environ onze ans. Une tache n’est pas noire en soi : elle paraît sombre par contraste avec la surface plus chaude.",
      "Les éruptions libèrent rapidement énergie et rayonnements. Certaines éjections de masse coronale envoient de vastes nuages de plasma dans l’espace. Si leur trajectoire rencontre la Terre et que leur champ magnétique se couple au nôtre, une tempête géomagnétique peut se produire.",
      "Le champ terrestre canalise des particules vers les régions polaires. En heurtant les gaz de la haute atmosphère, elles excitent oxygène et azote, qui émettent ensuite différentes couleurs. Les mêmes tempêtes peuvent affecter satellites, communications radio, navigation et réseaux électriques."
    ],
    "complete": [
      {
        "title": "1. Un cycle magnétique",
        "text": "Le champ global du Soleil se réorganise et inverse sa polarité autour du maximum d’activité. Le cycle des taches constitue la manifestation la plus facile à suivre, mais l’activité varie aussi dans les éruptions, le rayonnement ultraviolet et les particules énergétiques."
      },
      {
        "title": "2. Vent continu et événements violents",
        "text": "Le vent solaire s’écoule en permanence depuis la couronne. Une éjection de masse coronale est un événement plus massif et structuré. Confondre les deux empêche de comprendre pourquoi certaines perturbations sont modestes tandis que d’autres déclenchent une forte réponse magnétique terrestre."
      },
      {
        "title": "3. Couleurs des aurores",
        "text": "L’oxygène peut produire du vert ou du rouge selon l’altitude et l’énergie des collisions ; l’azote contribue notamment au bleu et au violet. La forme des rideaux suit les lignes du champ magnétique et varie rapidement avec l’arrivée des particules."
      },
      {
        "title": "4. Prévoir la météo spatiale",
        "text": "Des satellites observent le Soleil et mesurent le vent solaire en amont de la Terre. Les prévisions visent à protéger les astronautes, les satellites et les infrastructures. Elles restent difficiles, car il faut connaître la direction magnétique et l’évolution tridimensionnelle des éjections."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Taches, éruptions, vent solaire et aurores », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Les taches solaires sont des régions temporairement plus froides de la photosphère, liées à des champs magnétiques intenses."
      },
      {
        "label": "Mécanisme",
        "text": "Les éruptions libèrent rapidement énergie et rayonnements."
      },
      {
        "label": "Nuance",
        "text": "Le champ terrestre canalise des particules vers les régions polaires."
      },
      {
        "label": "À retenir",
        "text": "Le Soleil n’éclaire pas seulement : il projette continuellement un vent de particules et connaît des éruptions capables de perturber l’environnement spatial terrestre. Les aurores sont l’une des manifestations visibles de cette interaction."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Pourquoi une tache solaire paraît-elle sombre ?",
        "a": "Elle est plus froide que la photosphère environnante et apparaît sombre par contraste.",
        "choices": [
          "Elle est un trou dans le Soleil.",
          "Elle ne contient aucune matière.",
          "Elle absorbe toute lumière de l’Univers."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Quelle est la durée approximative du cycle des taches ?",
        "a": "Environ onze ans.",
        "choices": [
          "Onze jours.",
          "Un siècle exact.",
          "Une année terrestre."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Qu’est-ce qu’une éjection de masse coronale ?",
        "a": "Un vaste nuage de plasma et de champ magnétique expulsé par le Soleil.",
        "choices": [
          "Une planète éjectée du Système solaire.",
          "Un simple rayon de lumière visible.",
          "La disparition de la couronne."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Comment naissent les aurores ?",
        "a": "Des particules guidées par le champ terrestre excitent les gaz de la haute atmosphère.",
        "choices": [
          "La Lune éclaire les nuages polaires.",
          "Les océans réfléchissent les étoiles.",
          "La neige produit de la radioactivité."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Quel domaine peut être perturbé par une tempête géomagnétique ?",
        "a": "Les satellites, communications, systèmes de navigation ou réseaux électriques.",
        "choices": [
          "La tectonique des plaques uniquement.",
          "La rotation quotidienne de la Terre.",
          "La fusion au cœur du Soleil."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-solar-system-formation": {
    "hook": "Le Soleil et les planètes se sont formés ensemble à partir d’un nuage en contraction. La matière s’est aplatie en disque ; au centre est né le Soleil, tandis que grains, cailloux et embryons planétaires s’assemblaient autour de lui.",
    "keyFacts": [
      "D’un nuage de gaz et de poussière qui s’est contracté en disque.",
      "Des planétésimaux.",
      "La rotation et les collisions organisent progressivement la matière dans un plan.",
      "La température plus basse permettait aux composés volatils de se condenser.",
      "Certaines météorites, astéroïdes et comètes peu transformés."
    ],
    "express": [
      "Sous l’effet de la gravitation, une région d’un nuage moléculaire s’est contractée. La conservation du mouvement de rotation a favorisé un disque autour de la jeune étoile. Dans ce disque, température et composition variaient fortement avec la distance au Soleil.",
      "Les grains se sont heurtés et parfois collés. Des corps de plus en plus grands, appelés planétésimaux, ont accumulé de la matière par gravitation. Les collisions ont construit des embryons planétaires, mais elles ont aussi fragmenté ou éjecté de nombreux objets.",
      "Près du Soleil, la chaleur favorisait surtout roches et métaux ; plus loin, les glaces pouvaient se condenser et fournir davantage de matériau. Cette différence aide à comprendre la séparation entre petites planètes rocheuses internes et planètes géantes externes, sans imposer un scénario parfaitement ordonné."
    ],
    "complete": [
      {
        "title": "1. Pourquoi un disque ?",
        "text": "Un nuage possède presque toujours une faible rotation initiale. En se contractant, il tourne plus vite et les collisions dissipent les mouvements verticaux, ce qui aplatit la matière. Les disques protoplanétaires observés autour de jeunes étoiles confirment que ce mécanisme est courant."
      },
      {
        "title": "2. De la poussière aux planètes",
        "text": "Les premières étapes de collage sont complexes, car les grains peuvent rebondir ou se briser. Une fois des corps assez grands formés, leur gravitation augmente la zone de capture. La croissance devient alors chaotique, avec migrations, résonances et impacts géants."
      },
      {
        "title": "3. La ligne des glaces",
        "text": "Au-delà d’une certaine distance, l’eau et d’autres composés volatils peuvent rester sous forme solide. La quantité de matériau disponible augmente, ce qui facilite la formation rapide de gros noyaux capables de retenir hydrogène et hélium avant la dispersion du gaz du disque."
      },
      {
        "title": "4. Des archives primitives",
        "text": "Les météorites les plus anciennes, certains astéroïdes et les comètes conservent une matière peu transformée. Leur composition et leur datation permettent de reconstruire les premiers millions d’années, bien mieux que les surfaces planétaires continuellement remaniées."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Comment s’est formé le Système solaire ? », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Sous l’effet de la gravitation, une région d’un nuage moléculaire s’est contractée."
      },
      {
        "label": "Mécanisme",
        "text": "Les grains se sont heurtés et parfois collés."
      },
      {
        "label": "Nuance",
        "text": "Près du Soleil, la chaleur favorisait surtout roches et métaux ; plus loin, les glaces pouvaient se condenser et fournir davantage de matériau."
      },
      {
        "label": "À retenir",
        "text": "Le Soleil et les planètes se sont formés ensemble à partir d’un nuage en contraction. La matière s’est aplatie en disque ; au centre est né le Soleil, tandis que grains, cailloux et embryons planétaires s’assemblaient autour de lui."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "À partir de quoi le Système solaire s’est-il formé ?",
        "a": "D’un nuage de gaz et de poussière qui s’est contracté en disque.",
        "choices": [
          "D’une explosion de la Terre.",
          "D’une comète unique.",
          "D’un trou noir évaporé."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Comment appelle-t-on les corps intermédiaires qui s’assemblent ?",
        "a": "Des planétésimaux.",
        "choices": [
          "Des pulsars.",
          "Des quasars.",
          "Des photosphères."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Pourquoi le disque s’aplatit-il ?",
        "a": "La rotation et les collisions organisent progressivement la matière dans un plan.",
        "choices": [
          "Le Soleil possédait déjà une surface solide plate.",
          "Une galaxie voisine l’a coupé.",
          "Les planètes ont aspiré toute la matière verticale."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi davantage de glaces existaient-elles loin du jeune Soleil ?",
        "a": "La température plus basse permettait aux composés volatils de se condenser.",
        "choices": [
          "La gravitation y était absente.",
          "La lumière y voyageait moins vite.",
          "Les roches ne pouvaient pas exister."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Quelles archives renseignent les débuts du Système solaire ?",
        "a": "Certaines météorites, astéroïdes et comètes peu transformés.",
        "choices": [
          "Uniquement les océans modernes.",
          "Les satellites de communication.",
          "Les taches solaires actuelles."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-rocky-planets": {
    "hook": "Les quatre planètes internes partagent une surface solide et une composition dominée par roches et métaux. Pourtant, elles ont suivi des destins très différents sous l’effet de leur masse, de leur atmosphère, de leur eau et de leur distance au Soleil.",
    "keyFacts": [
      "Son atmosphère épaisse produit un effet de serre extrêmement puissant.",
      "La Terre.",
      "La présence passée d’écoulements d’eau liquide.",
      "Elle possède très peu d’atmosphère pour redistribuer la chaleur.",
      "L’atmosphère, la masse, l’eau et l’activité géologique modifient fortement le climat."
    ],
    "express": [
      "Mercure est petite, dense et presque dépourvue d’atmosphère durable. Ses températures varient fortement, mais de la glace peut subsister dans des cratères polaires toujours à l’ombre. Sa surface conserve de nombreux impacts et des traces de contraction globale.",
      "Vénus possède une atmosphère épaisse de dioxyde de carbone et des nuages acides. Son puissant effet de serre maintient une surface plus chaude que Mercure. La Terre conserve de l’eau liquide, une tectonique active et une atmosphère profondément modifiée par le vivant.",
      "Mars est aujourd’hui froide, sèche et enveloppée d’une atmosphère ténue, mais ses vallées et minéraux indiquent qu’elle a connu de l’eau liquide. Comparer ces planètes montre qu’une position dans la zone habitable ne suffit pas : masse, géologie et évolution atmosphérique comptent aussi."
    ],
    "complete": [
      {
        "title": "1. Mercure, un monde extrême",
        "text": "Son absence d’atmosphère dense empêche de redistribuer efficacement la chaleur. Elle tourne lentement et subit de fortes variations entre zones éclairées et obscures. Son grand noyau métallique occupe une proportion remarquable de son volume."
      },
      {
        "title": "2. Vénus et l’emballement climatique",
        "text": "La pression au sol est énorme et l’atmosphère piège efficacement le rayonnement infrarouge. Vénus rappelle qu’une planète proche de la Terre en taille peut évoluer vers un état radicalement différent. Son passé aqueux éventuel reste étudié."
      },
      {
        "title": "3. La Terre, planète active",
        "text": "La tectonique recycle une partie de la croûte et participe au cycle du carbone sur de longues durées. Le champ magnétique, l’océan et la biosphère interagissent avec l’atmosphère. L’habitabilité terrestre résulte d’un système, pas d’un seul paramètre."
      },
      {
        "title": "4. Mars a perdu une grande partie de son atmosphère",
        "text": "Sa faible masse et la disparition précoce d’un champ magnétique global ont facilité l’érosion atmosphérique. L’eau de surface a gelé, pénétré le sous-sol ou été perdue. Les missions cherchent les environnements anciens où une vie microbienne aurait pu être possible."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Mercure, Vénus, Terre et Mars : quatre mondes rocheux », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Mercure est petite, dense et presque dépourvue d’atmosphère durable."
      },
      {
        "label": "Mécanisme",
        "text": "Vénus possède une atmosphère épaisse de dioxyde de carbone et des nuages acides."
      },
      {
        "label": "Nuance",
        "text": "Mars est aujourd’hui froide, sèche et enveloppée d’une atmosphère ténue, mais ses vallées et minéraux indiquent qu’elle a connu de l’eau liquide."
      },
      {
        "label": "À retenir",
        "text": "Les quatre planètes internes partagent une surface solide et une composition dominée par roches et métaux. Pourtant, elles ont suivi des destins très différents sous l’effet de leur masse, de leur atmosphère, de leur eau et de leur distance au Soleil."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Pourquoi Vénus est-elle plus chaude que Mercure ?",
        "a": "Son atmosphère épaisse produit un effet de serre extrêmement puissant.",
        "choices": [
          "Elle est beaucoup plus proche du Soleil.",
          "Son sol brûle du charbon.",
          "Elle possède deux Soleils."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Quelle planète conserve une tectonique des plaques active connue ?",
        "a": "La Terre.",
        "choices": [
          "Mercure.",
          "Vénus de façon identique à la Terre.",
          "Mars avec des plaques rapides actuelles."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Qu’indiquent les vallées anciennes de Mars ?",
        "a": "La présence passée d’écoulements d’eau liquide.",
        "choices": [
          "Des océans de lave actuels.",
          "Des traces de routes artificielles.",
          "Une atmosphère plus épaisse aujourd’hui."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi Mercure connaît-elle de grands écarts de température ?",
        "a": "Elle possède très peu d’atmosphère pour redistribuer la chaleur.",
        "choices": [
          "Elle produit sa propre lumière.",
          "Elle change de distance chaque heure.",
          "Elle est entièrement recouverte d’eau."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi la zone habitable ne suffit-elle pas à prédire un monde habitable ?",
        "a": "L’atmosphère, la masse, l’eau et l’activité géologique modifient fortement le climat.",
        "choices": [
          "Parce que toutes les planètes y sont identiques.",
          "Parce que la lumière stellaire n’a aucun effet.",
          "Parce qu’une planète doit obligatoirement avoir des anneaux."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-giant-planets": {
    "hook": "Les quatre planètes externes sont bien plus massives que la Terre, mais elles ne sont pas identiques. Jupiter et Saturne sont dominées par hydrogène et hélium ; Uranus et Neptune contiennent proportionnellement davantage de composés lourds et glacés.",
    "keyFacts": [
      "Jupiter.",
      "Non, leur atmosphère devient progressivement un fluide très dense en profondeur.",
      "D’innombrables particules de glace et de roche en orbite.",
      "Son axe de rotation est extrêmement incliné, comme si elle tournait couchée.",
      "Elle possède une dynamique atmosphérique et une source de chaleur interne."
    ],
    "express": [
      "Jupiter est la planète la plus massive. Son atmosphère montre bandes, tourbillons et une Grande Tache rouge durable. Sous les nuages, la pression transforme progressivement l’hydrogène ; il n’existe pas de surface solide nette où l’on pourrait se poser comme sur Mars.",
      "Saturne est célèbre pour ses anneaux, composés d’innombrables particules de glace et de roche. Toutes les géantes possèdent des anneaux, mais ceux de Saturne sont particulièrement brillants et étendus. Les interactions avec de petites lunes sculptent des divisions et des ondes.",
      "Uranus tourne presque couchée, probablement à la suite d’événements anciens. Neptune, plus éloignée, présente pourtant des vents très rapides grâce à une source de chaleur interne. Ces mondes montrent que recevoir peu de lumière solaire ne signifie pas être météorologiquement inactif."
    ],
    "complete": [
      {
        "title": "1. Pas de sol accessible",
        "text": "La densité augmente progressivement avec la profondeur. Les modèles prévoient des couches de fluides sous haute pression et probablement des noyaux enrichis en éléments lourds. Une sonde descendante serait détruite bien avant d’atteindre une frontière solide hypothétique."
      },
      {
        "title": "2. Des systèmes miniatures",
        "text": "Chaque planète géante possède de nombreuses lunes, des anneaux et une vaste magnétosphère. Jupiter ressemble à un petit système planétaire, où les satellites galiléens occupent des orbites régulières et présentent des mondes très différents."
      },
      {
        "title": "3. Les anneaux sont dynamiques",
        "text": "Les particules suivent chacune une orbite. Collisions, résonances et lunes bergères structurent les anneaux. Ils ne constituent pas un disque rigide. Leur origine et leur âge précis restent étudiés, notamment pour les anneaux spectaculaires de Saturne."
      },
      {
        "title": "4. Géantes de glace",
        "text": "Uranus et Neptune sont souvent appelées géantes de glace, non parce qu’elles seraient des boules gelées, mais parce que leurs intérieurs contiennent davantage de molécules comme eau, ammoniac et méthane sous des états extrêmes."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Jupiter, Saturne, Uranus et Neptune », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Jupiter est la planète la plus massive."
      },
      {
        "label": "Mécanisme",
        "text": "Saturne est célèbre pour ses anneaux, composés d’innombrables particules de glace et de roche."
      },
      {
        "label": "Nuance",
        "text": "Uranus tourne presque couchée, probablement à la suite d’événements anciens."
      },
      {
        "label": "À retenir",
        "text": "Les quatre planètes externes sont bien plus massives que la Terre, mais elles ne sont pas identiques. Jupiter et Saturne sont dominées par hydrogène et hélium ; Uranus et Neptune contiennent proportionnellement davantage de composés lourds et glacés."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Quelle planète est la plus massive du Système solaire ?",
        "a": "Jupiter.",
        "choices": [
          "Mars.",
          "Saturne.",
          "Neptune."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Les géantes possèdent-elles une surface solide nette ?",
        "a": "Non, leur atmosphère devient progressivement un fluide très dense en profondeur.",
        "choices": [
          "Oui, une croûte rocheuse visible sous les nuages.",
          "Oui, une surface de glace plate.",
          "Non, car elles sont entièrement vides."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "De quoi les anneaux de Saturne sont-ils surtout composés ?",
        "a": "D’innombrables particules de glace et de roche en orbite.",
        "choices": [
          "D’un disque solide unique.",
          "De gaz brûlant immobile.",
          "De poussière provenant uniquement de la Terre."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Quelle particularité caractérise Uranus ?",
        "a": "Son axe de rotation est extrêmement incliné, comme si elle tournait couchée.",
        "choices": [
          "Elle est la plus proche du Soleil.",
          "Elle ne possède aucune atmosphère.",
          "Elle tourne autour de Saturne."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi Neptune peut-elle avoir des vents actifs malgré son éloignement ?",
        "a": "Elle possède une dynamique atmosphérique et une source de chaleur interne.",
        "choices": [
          "Elle reçoit plus de Soleil que la Terre.",
          "Ses vents viennent directement des comètes.",
          "Elle est réchauffée par la Lune."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-ocean-moons": {
    "hook": "Certaines lunes glacées pourraient abriter sous leur croûte des océans d’eau liquide. Elles déplacent la recherche de vie au-delà de la zone habitable classique, car la chaleur peut venir des forces de marée plutôt que du Soleil.",
    "keyFacts": [
      "La chaleur produite par les déformations de marée.",
      "Encelade.",
      "Ils permettent d’analyser des matériaux provenant de l’océan interne sans traverser la glace.",
      "Titan.",
      "Non, cela indique un environnement potentiellement habitable, pas une vie démontrée."
    ],
    "express": [
      "Europe, lune de Jupiter, présente une surface jeune et fracturée. Son champ magnétique induit et sa géologie suggèrent un océan salé sous la glace. Les forces de marée exercées par Jupiter déforment son intérieur et peuvent fournir de la chaleur.",
      "Encelade, petite lune de Saturne, éjecte des panaches depuis des fractures polaires. Des sondes ont traversé ces jets et détecté eau, sels, molécules organiques et indices d’interactions hydrothermales. Il est donc possible d’échantillonner indirectement son océan sans forer la glace.",
      "Titan possède une atmosphère dense, des lacs d’hydrocarbures en surface et probablement un océan interne. Ces mondes ne prouvent pas l’existence de vie. Ils réunissent toutefois eau liquide, chimie et sources d’énergie, trois ingrédients qui justifient des missions ciblées."
    ],
    "complete": [
      {
        "title": "1. Le chauffage par marées",
        "text": "Une orbite légèrement excentrique fait varier l’attraction gravitationnelle reçue. La lune se déforme continuellement ; les frottements internes dissipent de l’énergie en chaleur. Les résonances avec d’autres satellites maintiennent souvent cette excentricité."
      },
      {
        "title": "2. Europe sous la glace",
        "text": "Les fractures, terrains chaotiques et rares cratères indiquent une surface renouvelée. L’épaisseur de la glace et les échanges avec l’océan restent incertains. Comprendre ces échanges est essentiel pour savoir si des nutriments peuvent circuler."
      },
      {
        "title": "3. Les panaches d’Encelade",
        "text": "Ils contiennent des grains et des gaz issus de l’océan interne. La présence d’hydrogène moléculaire peut s’expliquer par des réactions entre eau et roche chaude, analogues à celles observées près de certaines sources hydrothermales terrestres."
      },
      {
        "title": "4. Habitabilité n’est pas vie",
        "text": "Un environnement habitable offre des conditions compatibles avec une chimie vivante connue. Il peut rester stérile. Les missions recherchent donc des ensembles d’indices, en éliminant les explications géologiques ou chimiques non biologiques."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Lunes océans : Europe, Encelade et autres mondes cachés », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Europe, lune de Jupiter, présente une surface jeune et fracturée."
      },
      {
        "label": "Mécanisme",
        "text": "Encelade, petite lune de Saturne, éjecte des panaches depuis des fractures polaires."
      },
      {
        "label": "Nuance",
        "text": "Titan possède une atmosphère dense, des lacs d’hydrocarbures en surface et probablement un océan interne."
      },
      {
        "label": "À retenir",
        "text": "Certaines lunes glacées pourraient abriter sous leur croûte des océans d’eau liquide. Elles déplacent la recherche de vie au-delà de la zone habitable classique, car la chaleur peut venir des forces de marée plutôt que du Soleil."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Quelle source peut maintenir un océan liquide loin du Soleil ?",
        "a": "La chaleur produite par les déformations de marée.",
        "choices": [
          "La lumière visible seule.",
          "Les incendies de surface.",
          "La rotation de la Voie lactée."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Quelle lune de Saturne émet des panaches ?",
        "a": "Encelade.",
        "choices": [
          "La Lune terrestre.",
          "Phobos.",
          "Io uniquement."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Pourquoi les panaches sont-ils précieux ?",
        "a": "Ils permettent d’analyser des matériaux provenant de l’océan interne sans traverser la glace.",
        "choices": [
          "Ils rendent la lune visible à l’œil nu.",
          "Ils prouvent directement une civilisation.",
          "Ils arrêtent les radiations solaires."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Quel monde possède des lacs d’hydrocarbures en surface ?",
        "a": "Titan.",
        "choices": [
          "Europe.",
          "Mercure.",
          "Vénus."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Découvrir un océan signifie-t-il découvrir la vie ?",
        "a": "Non, cela indique un environnement potentiellement habitable, pas une vie démontrée.",
        "choices": [
          "Oui, toute eau liquide contient forcément des organismes.",
          "Oui, si l’océan est sous la glace.",
          "Non, car la vie ne peut jamais exister dans l’eau."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-asteroids-comets": {
    "hook": "Astéroïdes et comètes sont souvent présentés comme des débris, mais ils sont surtout des archives. Leur matière a moins été transformée que celle des grandes planètes et conserve des indices sur les conditions initiales du disque solaire.",
    "keyFacts": [
      "Entre les orbites de Mars et Jupiter.",
      "Non, les objets y sont généralement séparés par de très grandes distances.",
      "Ses glaces se subliment lorsqu’elle se réchauffe près du Soleil.",
      "Globalement à l’opposé du Soleil sous l’effet du vent solaire.",
      "Ils conservent des matériaux primitifs renseignant la formation du Système solaire."
    ],
    "express": [
      "Un astéroïde est généralement un petit corps dominé par roches ou métaux. Beaucoup se trouvent dans la ceinture entre Mars et Jupiter, mais ils existent ailleurs. La ceinture n’est pas un champ compact : les objets sont séparés par d’immenses distances.",
      "Une comète contient davantage de glaces et de poussière. En approchant du Soleil, ses glaces se subliment, formant une chevelure et des queues. La queue ionique et la queue de poussière sont orientées par le vent solaire et le rayonnement, pas simplement derrière la trajectoire.",
      "Les petits corps peuvent avoir apporté une partie de l’eau et des molécules organiques aux planètes internes, mais leur contribution exacte est débattue. Des missions rapportent ou analysent des échantillons afin de comparer leur chimie aux météorites et à la Terre."
    ],
    "complete": [
      {
        "title": "1. Une ceinture très vide",
        "text": "Les images de fiction montrent des rochers serrés, alors qu’un vaisseau traverserait normalement la ceinture principale sans voir d’objet de près. La masse totale de cette ceinture reste très inférieure à celle de la Lune."
      },
      {
        "title": "2. Les familles d’astéroïdes",
        "text": "Des collisions brisent des corps parents et créent des groupes partageant des orbites et compositions proches. Certains fragments croisent ensuite l’orbite terrestre. Leur étude relie les météorites tombées au sol à des populations observées dans l’espace."
      },
      {
        "title": "3. Une comète se transforme près du Soleil",
        "text": "Le noyau reste petit et sombre. L’activité crée une atmosphère temporaire immense. Les jets peuvent modifier légèrement l’orbite et la rotation. Après de nombreux passages, une comète peut perdre ses matériaux volatils ou se fragmenter."
      },
      {
        "title": "4. Prélever la matière primitive",
        "text": "Les analyses en laboratoire sont plus précises que les instruments embarqués. Les missions de retour d’échantillons exigent cependant d’éviter la contamination terrestre et de documenter exactement le contexte du prélèvement."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Astéroïdes et comètes : les archives du Système solaire », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Un astéroïde est généralement un petit corps dominé par roches ou métaux."
      },
      {
        "label": "Mécanisme",
        "text": "Une comète contient davantage de glaces et de poussière."
      },
      {
        "label": "Nuance",
        "text": "Les petits corps peuvent avoir apporté une partie de l’eau et des molécules organiques aux planètes internes, mais leur contribution exacte est débattue."
      },
      {
        "label": "À retenir",
        "text": "Astéroïdes et comètes sont souvent présentés comme des débris, mais ils sont surtout des archives. Leur matière a moins été transformée que celle des grandes planètes et conserve des indices sur les conditions initiales du disque solaire."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Où se situe la ceinture principale d’astéroïdes ?",
        "a": "Entre les orbites de Mars et Jupiter.",
        "choices": [
          "Entre la Terre et la Lune.",
          "Au centre du Soleil.",
          "Au-delà de toutes les galaxies."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "La ceinture d’astéroïdes est-elle très dense ?",
        "a": "Non, les objets y sont généralement séparés par de très grandes distances.",
        "choices": [
          "Oui, aucun espace vide n’y existe.",
          "Oui, elle forme une surface solide.",
          "Non, car elle ne contient qu’un seul objet."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Pourquoi une comète développe-t-elle une chevelure ?",
        "a": "Ses glaces se subliment lorsqu’elle se réchauffe près du Soleil.",
        "choices": [
          "Elle brûle dans l’atmosphère terrestre.",
          "Elle capture les nuages de Jupiter.",
          "Son noyau devient une étoile."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Dans quelle direction la queue ionique s’oriente-t-elle ?",
        "a": "Globalement à l’opposé du Soleil sous l’effet du vent solaire.",
        "choices": [
          "Toujours derrière le mouvement orbital.",
          "Toujours vers la Terre.",
          "Vers le centre de la galaxie."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi étudier les petits corps ?",
        "a": "Ils conservent des matériaux primitifs renseignant la formation du Système solaire.",
        "choices": [
          "Ils sont tous identiques aux planètes.",
          "Ils produisent la majorité de la lumière solaire.",
          "Ils déterminent les saisons terrestres."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-meteors-impacts": {
    "hook": "Un petit corps dans l’espace est un météoroïde ; la traînée lumineuse dans l’atmosphère est un météore ; le fragment qui atteint le sol devient une météorite. Ces mots décrivent trois étapes différentes d’un même voyage possible.",
    "keyFacts": [
      "Le phénomène lumineux produit lors de l’entrée d’un petit corps dans l’atmosphère.",
      "Une météorite.",
      "La Terre recroise chaque année des courants de poussières sur son orbite.",
      "Par un effet de perspective sur des trajectoires presque parallèles.",
      "Modifier légèrement sa vitesse afin qu’il manque la Terre plus tard."
    ],
    "express": [
      "La lumière d’une étoile filante provient surtout de l’échauffement et de l’ionisation de l’air comprimé autour du corps, ainsi que de l’ablation de sa matière. La plupart des particules sont minuscules et se détruisent haut dans l’atmosphère sans danger.",
      "Les pluies de météores se produisent lorsque la Terre traverse des courants de poussières laissés par une comète ou parfois un astéroïde. Les trajectoires semblent converger vers un radiant par effet de perspective, comme des rails parallèles semblant se rejoindre au loin.",
      "Les grands impacts sont rares mais peuvent avoir des conséquences mondiales. La surveillance recherche les objets géocroiseurs, affine leurs orbites et teste des méthodes de déviation. Le risque dépend à la fois de la probabilité de collision et de l’énergie que libérerait l’objet."
    ],
    "complete": [
      {
        "title": "1. Une terminologie utile",
        "text": "Météoroïde désigne l’objet avant son entrée. Météore désigne le phénomène lumineux. Météorite désigne ce qui survit jusqu’au sol. Une météorite peut provenir d’un astéroïde, de la Lune ou de Mars après un impact ayant éjecté des fragments."
      },
      {
        "title": "2. Les pluies annuelles",
        "text": "Les Perséides ou les Géminides reviennent lorsque l’orbite terrestre recoupe un courant de débris. La date est donc prévisible. L’intensité varie selon la densité du courant, l’activité du corps parent et les perturbations gravitationnelles."
      },
      {
        "title": "3. Lire les cratères",
        "text": "Une surface ancienne et inactive accumule les cratères ; une surface renouvelée par volcanisme, tectonique ou érosion les efface. Compter les cratères aide à comparer les âges relatifs des terrains, en calibrant la méthode avec des échantillons datés."
      },
      {
        "title": "4. Dévier plutôt que détruire",
        "text": "Modifier très légèrement la vitesse d’un astéroïde longtemps avant une rencontre peut suffire à changer sa position future. Une collision contrôlée, un tracteur gravitationnel ou d’autres méthodes sont étudiés. La clé reste la détection précoce et une orbite précisément connue."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Météore, météorite et risque d’impact », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "La lumière d’une étoile filante provient surtout de l’échauffement et de l’ionisation de l’air comprimé autour du corps, ainsi que de l’ablation de sa matière."
      },
      {
        "label": "Mécanisme",
        "text": "Les pluies de météores se produisent lorsque la Terre traverse des courants de poussières laissés par une comète ou parfois un astéroïde."
      },
      {
        "label": "Nuance",
        "text": "Les grands impacts sont rares mais peuvent avoir des conséquences mondiales."
      },
      {
        "label": "À retenir",
        "text": "Un petit corps dans l’espace est un météoroïde ; la traînée lumineuse dans l’atmosphère est un météore ; le fragment qui atteint le sol devient une météorite. Ces mots décrivent trois étapes différentes d’un même voyage possible."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Qu’est-ce qu’un météore ?",
        "a": "Le phénomène lumineux produit lors de l’entrée d’un petit corps dans l’atmosphère.",
        "choices": [
          "Le fragment posé au sol.",
          "Une planète naine.",
          "Une étoile qui explose."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Comment appelle-t-on un fragment qui atteint le sol ?",
        "a": "Une météorite.",
        "choices": [
          "Une photosphère.",
          "Un pulsar.",
          "Une nébuleuse."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Pourquoi les pluies de météores reviennent-elles à des dates proches ?",
        "a": "La Terre recroise chaque année des courants de poussières sur son orbite.",
        "choices": [
          "Les étoiles tombent selon le calendrier.",
          "La Lune libère ses roches chaque été.",
          "Le Soleil fabrique les mêmes météores chaque nuit."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi les trajectoires semblent-elles venir d’un radiant ?",
        "a": "Par un effet de perspective sur des trajectoires presque parallèles.",
        "choices": [
          "Parce que tous les débris naissent dans l’atmosphère.",
          "Parce qu’un trou noir les attire.",
          "Parce que la Terre s’arrête de tourner."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Quelle stratégie est efficace contre un objet détecté longtemps à l’avance ?",
        "a": "Modifier légèrement sa vitesse afin qu’il manque la Terre plus tard.",
        "choices": [
          "Attendre son entrée atmosphérique.",
          "Éteindre les satellites.",
          "Changer la masse de la Terre."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-exoplanet-detection": {
    "hook": "Une exoplanète est une planète en orbite autour d’une autre étoile que le Soleil. La plupart ne sont pas photographiées directement : leur présence est déduite des minuscules effets qu’elles produisent sur la lumière ou le mouvement de leur étoile.",
    "keyFacts": [
      "Une baisse périodique de luminosité quand la planète passe devant son étoile.",
      "L’orbite doit être alignée avec notre ligne de visée.",
      "Le mouvement de l’étoile révélé par le décalage Doppler de son spectre.",
      "D’estimer le rayon, la masse et donc la densité moyenne.",
      "Leurs signaux sont plus forts et leurs périodes plus courtes."
    ],
    "express": [
      "La méthode des transits mesure une faible baisse de luminosité quand une planète passe devant son étoile. La profondeur indique approximativement le rapport de taille ; la répétition donne la période orbitale. La géométrie doit être bien alignée, donc beaucoup de planètes ne transitent jamais de notre point de vue.",
      "La vitesse radiale mesure le va-et-vient de l’étoile sous l’attraction de sa planète, grâce au décalage Doppler de ses raies spectrales. Elle fournit une masse minimale. Combinée à un transit, elle permet d’estimer densité et composition globale.",
      "L’imagerie directe bloque l’éclat de l’étoile pour isoler certains mondes jeunes, massifs et éloignés de leur étoile. D’autres méthodes utilisent microlentilles ou astrométrie. Chaque technique possède des biais ; les populations observées ne reflètent pas directement toutes les planètes existantes."
    ],
    "complete": [
      {
        "title": "1. Le transit ne montre pas une silhouette détaillée",
        "text": "Le télescope enregistre une courbe de lumière. Une baisse régulière et répétée peut signaler une planète, mais les taches stellaires ou étoiles binaires peuvent imiter le phénomène. Plusieurs transits et observations complémentaires sont nécessaires."
      },
      {
        "title": "2. Une étoile n’est jamais immobile",
        "text": "Planète et étoile tournent autour de leur centre de masse commun. La planète effectue le mouvement le plus large, mais l’étoile oscille légèrement. Les spectrographes mesurent des vitesses extrêmement petites dans les cas favorables."
      },
      {
        "title": "3. Masse, rayon, densité",
        "text": "Un transit donne un rayon relatif ; la vitesse radiale donne une contrainte de masse. La densité moyenne distingue grossièrement un monde rocheux d’une planète riche en gaz, mais plusieurs structures internes peuvent produire une densité similaire."
      },
      {
        "title": "4. Des biais de détection",
        "text": "Les grosses planètes proches de leur étoile produisent des signaux plus forts et fréquents. Elles ont été découvertes en premier, non parce qu’elles seraient forcément les plus nombreuses, mais parce qu’elles sont plus faciles à repérer."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Comment détecter une planète invisible autour d’une autre étoile ? », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "La méthode des transits mesure une faible baisse de luminosité quand une planète passe devant son étoile."
      },
      {
        "label": "Mécanisme",
        "text": "La vitesse radiale mesure le va-et-vient de l’étoile sous l’attraction de sa planète, grâce au décalage Doppler de ses raies spectrales."
      },
      {
        "label": "Nuance",
        "text": "L’imagerie directe bloque l’éclat de l’étoile pour isoler certains mondes jeunes, massifs et éloignés de leur étoile."
      },
      {
        "label": "À retenir",
        "text": "Une exoplanète est une planète en orbite autour d’une autre étoile que le Soleil. La plupart ne sont pas photographiées directement : leur présence est déduite des minuscules effets qu’elles produisent sur la lumière ou le mouvement de leur étoile."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Que mesure la méthode des transits ?",
        "a": "Une baisse périodique de luminosité quand la planète passe devant son étoile.",
        "choices": [
          "Le bruit de la planète.",
          "La température de la Terre.",
          "La rotation de la galaxie entière."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi tous les systèmes ne montrent-ils pas de transit ?",
        "a": "L’orbite doit être alignée avec notre ligne de visée.",
        "choices": [
          "Seules les planètes rocheuses transitent.",
          "Les étoiles empêchent toujours les transits.",
          "Une planète doit posséder une lune."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Que mesure la vitesse radiale ?",
        "a": "Le mouvement de l’étoile révélé par le décalage Doppler de son spectre.",
        "choices": [
          "La vitesse du vent dans l’atmosphère de la planète uniquement.",
          "La distance exacte de toutes les galaxies.",
          "La couleur du télescope."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Que permet la combinaison transit et vitesse radiale ?",
        "a": "D’estimer le rayon, la masse et donc la densité moyenne.",
        "choices": [
          "De photographier automatiquement la surface.",
          "De prouver une vie intelligente.",
          "De connaître chaque élément du noyau."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi les grosses planètes proches ont-elles été découvertes tôt ?",
        "a": "Leurs signaux sont plus forts et leurs périodes plus courtes.",
        "choices": [
          "Elles sont les seules à exister.",
          "Elles produisent leur propre télescope.",
          "Elles sont toutes visibles à l’œil nu."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-habitable-zone-biosignatures": {
    "hook": "La zone habitable est la région où une planète pourrait maintenir de l’eau liquide en surface avec une atmosphère adaptée. C’est un filtre utile, pas une garantie de vie ni même d’habitabilité réelle.",
    "keyFacts": [
      "Seulement des conditions orbitales compatibles avec de l’eau liquide selon certaines hypothèses.",
      "Les forces de marée peuvent fournir une source de chaleur interne.",
      "Un indice potentiellement biologique qui doit être confronté à des explications non vivantes.",
      "Des processus non biologiques peuvent aussi en produire ou l’accumuler.",
      "La tension entre la possibilité de nombreuses civilisations et l’absence de preuve claire détectée."
    ],
    "express": [
      "La distance favorable dépend de la luminosité et du spectre de l’étoile. Une planète peut se trouver dans la zone habitable tout en possédant une atmosphère trop épaisse, trop mince ou absente. À l’inverse, un océan interne chauffé par marées peut exister bien au-delà de cette zone.",
      "Une biosignature est un signal chimique ou physique potentiellement produit par la vie. L’oxygène, le méthane ou certains déséquilibres atmosphériques sont étudiés, mais chacun peut avoir des sources non biologiques. Il faut rechercher des combinaisons cohérentes et comprendre le contexte planétaire.",
      "Le paradoxe de Fermi résume une tension : si les civilisations technologiques étaient fréquentes et anciennes, pourquoi ne voyons-nous aucune preuve claire ? Les réponses possibles vont de la rareté de la vie à la difficulté de détecter, en passant par des durées technologiques courtes. Aucun scénario n’est démontré."
    ],
    "complete": [
      {
        "title": "1. Une zone calculée, pas observée directement",
        "text": "Les limites sont estimées à partir de modèles climatiques. Nuages, rotation, continents, pression et composition atmosphérique peuvent les déplacer. Le terme doit donc être accompagné d’hypothèses, surtout pour des étoiles très différentes du Soleil."
      },
      {
        "title": "2. Les fausses biosignatures",
        "text": "La photodissociation de l’eau peut accumuler de l’oxygène sans vie ; une activité géologique peut libérer du méthane. Un seul gaz ne suffit pas. Les chercheurs cherchent un ensemble de molécules difficile à maintenir ensemble sans renouvellement."
      },
      {
        "title": "3. La vie simple avant la vie intelligente",
        "text": "Sur Terre, la vie microbienne a précédé de très loin les sociétés technologiques. Une planète habitée peut donc ne produire aucun signal radio artificiel. Rechercher de la vie et rechercher une technologie sont deux programmes différents."
      },
      {
        "title": "4. Le silence n’est pas une preuve d’absence",
        "text": "Nos recherches couvrent une infime partie des fréquences, directions et durées possibles. Les signaux s’affaiblissent avec la distance et les civilisations pourraient utiliser des techniques que nous ne reconnaissons pas. Le paradoxe stimule des hypothèses ; il ne prouve ni solitude ni présence."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Zone habitable, biosignatures et paradoxe de Fermi », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "La distance favorable dépend de la luminosité et du spectre de l’étoile."
      },
      {
        "label": "Mécanisme",
        "text": "Une biosignature est un signal chimique ou physique potentiellement produit par la vie."
      },
      {
        "label": "Nuance",
        "text": "Le paradoxe de Fermi résume une tension : si les civilisations technologiques étaient fréquentes et anciennes, pourquoi ne voyons-nous aucune preuve claire ? Les réponses possibles vont de la rareté de la vie à la difficulté de détecter, en passant par des durées technologiques courtes."
      },
      {
        "label": "À retenir",
        "text": "La zone habitable est la région où une planète pourrait maintenir de l’eau liquide en surface avec une atmosphère adaptée. C’est un filtre utile, pas une garantie de vie ni même d’habitabilité réelle."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Que garantit la zone habitable ?",
        "a": "Seulement des conditions orbitales compatibles avec de l’eau liquide selon certaines hypothèses.",
        "choices": [
          "La présence certaine d’océans et de vie.",
          "Une atmosphère identique à celle de la Terre.",
          "Une civilisation technologique."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi une lune éloignée du Soleil peut-elle garder un océan ?",
        "a": "Les forces de marée peuvent fournir une source de chaleur interne.",
        "choices": [
          "La lumière y est plus forte.",
          "La glace produit spontanément du feu.",
          "La gravitation n’y existe pas."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Qu’est-ce qu’une biosignature ?",
        "a": "Un indice potentiellement biologique qui doit être confronté à des explications non vivantes.",
        "choices": [
          "Une preuve absolue fournie par un seul gaz.",
          "Un message radio forcément artificiel.",
          "La forme circulaire d’une planète."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi l’oxygène seul ne suffit-il pas ?",
        "a": "Des processus non biologiques peuvent aussi en produire ou l’accumuler.",
        "choices": [
          "Parce que l’oxygène n’existe pas dans l’espace.",
          "Parce que toute vie détruit l’oxygène.",
          "Parce qu’il est invisible à la spectroscopie."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Que souligne le paradoxe de Fermi ?",
        "a": "La tension entre la possibilité de nombreuses civilisations et l’absence de preuve claire détectée.",
        "choices": [
          "La preuve que personne n’existe ailleurs.",
          "La certitude que toutes les civilisations communiquent.",
          "L’impossibilité de voyager dans le Système solaire."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-telescopes-spectrum": {
    "hook": "Un télescope ne sert pas seulement à grossir. Il collecte de la lumière, améliore la résolution et alimente des instruments qui séparent les longueurs d’onde. Le spectre permet alors de mesurer composition, température et mouvement sans toucher l’astre.",
    "keyFacts": [
      "Collecter davantage de lumière et améliorer la résolution potentielle.",
      "Une transition caractéristique d’un atome ou d’une molécule.",
      "La source s’éloigne le long de la ligne de visée.",
      "Pour réduire turbulence, vapeur d’eau et absorption atmosphérique.",
      "Chaque domaine révèle des températures et phénomènes physiques différents."
    ],
    "express": [
      "Un objectif ou un miroir de grand diamètre recueille davantage de photons. La résolution dépend notamment du diamètre et de la longueur d’onde. L’atmosphère brouille les images, absorbe certaines radiations et impose de choisir des sites secs, élevés ou éloignés des lumières urbaines.",
      "La spectroscopie décompose la lumière. Les atomes et molécules absorbent ou émettent à des longueurs d’onde précises, laissant des raies caractéristiques. Leur intensité et leur forme renseignent sur température, densité, pression, champ magnétique ou abondance chimique.",
      "Le décalage Doppler déplace les raies selon le mouvement radial : vers le bleu si la source se rapproche, vers le rouge si elle s’éloigne. L’astronomie moderne combine visible, radio, infrarouge, ultraviolet, rayons X et gamma, car chaque domaine révèle des phénomènes différents."
    ],
    "complete": [
      {
        "title": "1. Collecter avant de grossir",
        "text": "Un petit instrument peut grossir énormément une image sombre et floue sans créer d’information. Le diamètre détermine la quantité de lumière et limite la finesse théorique des détails. C’est pourquoi les grands observatoires privilégient des miroirs larges et souvent segmentés."
      },
      {
        "title": "2. L’atmosphère utile et gênante",
        "text": "Elle protège la vie des rayonnements énergétiques, mais rend plusieurs bandes inaccessibles depuis le sol. Les turbulences déplacent rapidement les fronts d’onde. L’optique adaptative mesure ces déformations et corrige un miroir en temps réel."
      },
      {
        "title": "3. Une empreinte chimique",
        "text": "Chaque espèce atomique possède des niveaux d’énergie quantifiés. Les transitions produisent des raies à des longueurs d’onde particulières. On peut ainsi identifier de l’hydrogène dans une étoile ou des molécules dans une atmosphère planétaire lointaine."
      },
      {
        "title": "4. Plusieurs messagers",
        "text": "Les ondes radio tracent les gaz froids et les pulsars ; l’infrarouge traverse mieux la poussière ; les rayons X révèlent des plasmas très chauds près d’objets compacts. Aucun télescope unique ne donne une vision complète du ciel."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Télescopes et spectres : lire la lumière des astres », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Un objectif ou un miroir de grand diamètre recueille davantage de photons."
      },
      {
        "label": "Mécanisme",
        "text": "La spectroscopie décompose la lumière."
      },
      {
        "label": "Nuance",
        "text": "Le décalage Doppler déplace les raies selon le mouvement radial : vers le bleu si la source se rapproche, vers le rouge si elle s’éloigne."
      },
      {
        "label": "À retenir",
        "text": "Un télescope ne sert pas seulement à grossir. Il collecte de la lumière, améliore la résolution et alimente des instruments qui séparent les longueurs d’onde. Le spectre permet alors de mesurer composition, température et mouvement sans toucher l’astre."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Quelle fonction essentielle possède un grand diamètre ?",
        "a": "Collecter davantage de lumière et améliorer la résolution potentielle.",
        "choices": [
          "Ralentir la lumière.",
          "Changer la couleur des étoiles.",
          "Supprimer la gravitation."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Que révèle une raie spectrale ?",
        "a": "Une transition caractéristique d’un atome ou d’une molécule.",
        "choices": [
          "La distance exacte sans autre information.",
          "La forme géographique de la surface.",
          "Le nombre de planètes de toute étoile."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Que signifie un décalage vers le rouge Doppler ?",
        "a": "La source s’éloigne le long de la ligne de visée.",
        "choices": [
          "La source refroidit nécessairement.",
          "La source devient une géante rouge.",
          "Le télescope est mal peint."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi placer certains observatoires en altitude ?",
        "a": "Pour réduire turbulence, vapeur d’eau et absorption atmosphérique.",
        "choices": [
          "Pour se rapprocher significativement des étoiles.",
          "Pour augmenter la gravité.",
          "Pour éviter la rotation terrestre."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Pourquoi observer plusieurs longueurs d’onde ?",
        "a": "Chaque domaine révèle des températures et phénomènes physiques différents.",
        "choices": [
          "Parce que le visible ne contient aucune information.",
          "Parce que toutes les longueurs d’onde donnent exactement la même image.",
          "Parce que les étoiles changent de position selon la couleur."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-space-telescopes": {
    "hook": "L’espace ne rend pas automatiquement un télescope meilleur, mais il supprime la turbulence et l’absorption atmosphériques. Cela ouvre des domaines de longueur d’onde inaccessibles depuis le sol et permet des observations très stables.",
    "keyFacts": [
      "L’absence de turbulence atmosphérique.",
      "L’atmosphère terrestre absorbe largement ces rayonnements.",
      "Pour réduire son propre rayonnement thermique qui masquerait les signaux faibles.",
      "Une région où la géométrie gravitationnelle facilite une position stable relative au Soleil et à la Terre.",
      "Non, ils sont complémentaires et soumis à des contraintes différentes."
    ],
    "express": [
      "Un observatoire spatial peut détecter ultraviolet, rayons X ou une partie de l’infrarouge absorbés par l’atmosphère. Il évite aussi la scintillation causée par les turbulences. En contrepartie, sa masse, son miroir, son refroidissement et ses réparations sont fortement contraints.",
      "Hubble observe surtout du proche ultraviolet au proche infrarouge et a fourni des images fines grâce à sa position au-dessus de l’atmosphère. D’autres missions cartographient le ciel en rayons X, mesurent le fond cosmologique ou surveillent les transits d’exoplanètes.",
      "Un télescope infrarouge doit souvent être très froid pour ne pas émettre lui-même le rayonnement qu’il cherche. Certains sont placés près d’un point de Lagrange, où la géométrie Soleil-Terre facilite un environnement thermique stable et des communications régulières."
    ],
    "complete": [
      {
        "title": "1. Des bandes bloquées",
        "text": "L’atmosphère laisse passer principalement le visible et certaines fenêtres radio ou infrarouges. Cette protection est indispensable à la vie mais masque une grande partie du spectre. Les satellites complètent donc les observatoires au sol plutôt qu’ils ne les remplacent totalement."
      },
      {
        "title": "2. Les coûts de l’espace",
        "text": "Chaque kilogramme doit être lancé. Les vibrations, le vide, le rayonnement et les cycles thermiques imposent des essais sévères. Un défaut minuscule peut être impossible à réparer. Les instruments sont conçus avec redondances, mécanismes limités et procédures très prudentes."
      },
      {
        "title": "3. Refroidir l’infrarouge",
        "text": "Tout objet chaud émet de l’infrarouge. Le télescope et ses détecteurs doivent être protégés du Soleil, de la Terre et de leur propre chaleur. Des écrans thermiques et des refroidisseurs permettent de distinguer les photons astronomiques très faibles."
      },
      {
        "title": "4. Une flotte complémentaire",
        "text": "Les grands résultats combinent souvent plusieurs observatoires. Une source transitoire peut être suivie en lumière visible, rayons X, radio et ondes gravitationnelles. La coordination transforme un événement bref en diagnostic physique complet."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Pourquoi envoyer des télescopes dans l’espace ? », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Un observatoire spatial peut détecter ultraviolet, rayons X ou une partie de l’infrarouge absorbés par l’atmosphère."
      },
      {
        "label": "Mécanisme",
        "text": "Hubble observe surtout du proche ultraviolet au proche infrarouge et a fourni des images fines grâce à sa position au-dessus de l’atmosphère."
      },
      {
        "label": "Nuance",
        "text": "Un télescope infrarouge doit souvent être très froid pour ne pas émettre lui-même le rayonnement qu’il cherche."
      },
      {
        "label": "À retenir",
        "text": "L’espace ne rend pas automatiquement un télescope meilleur, mais il supprime la turbulence et l’absorption atmosphériques. Cela ouvre des domaines de longueur d’onde inaccessibles depuis le sol et permet des observations très stables."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Quel avantage principal offre l’espace pour l’image ?",
        "a": "L’absence de turbulence atmosphérique.",
        "choices": [
          "Une proximité importante avec les étoiles.",
          "Une gravité nulle dans tout l’Univers.",
          "Une lumière plus rapide."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi observer l’ultraviolet ou les rayons X depuis l’espace ?",
        "a": "L’atmosphère terrestre absorbe largement ces rayonnements.",
        "choices": [
          "Ils n’existent pas près du sol.",
          "Ils sont produits uniquement par les satellites.",
          "Les miroirs au sol refusent de tourner."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Pourquoi refroidir un télescope infrarouge ?",
        "a": "Pour réduire son propre rayonnement thermique qui masquerait les signaux faibles.",
        "choices": [
          "Pour empêcher les miroirs de réfléchir.",
          "Pour augmenter la vitesse de la lumière.",
          "Pour fabriquer de l’oxygène."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Qu’est-ce qu’un point de Lagrange utile aux observatoires ?",
        "a": "Une région où la géométrie gravitationnelle facilite une position stable relative au Soleil et à la Terre.",
        "choices": [
          "Une surface solide entre deux planètes.",
          "Le centre d’un trou noir.",
          "Une station sur la Lune."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Les télescopes spatiaux remplacent-ils tous les observatoires au sol ?",
        "a": "Non, ils sont complémentaires et soumis à des contraintes différentes.",
        "choices": [
          "Oui, aucun télescope au sol n’est utile.",
          "Oui, car ils sont gratuits.",
          "Non, car ils ne peuvent observer aucune lumière."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-rockets-orbits": {
    "hook": "Atteindre l’espace ne suffit pas à rester en orbite. Une fusée doit surtout donner au véhicule une vitesse horizontale assez grande pour qu’il tombe continuellement autour de la Terre sans rencontrer le sol.",
    "keyFacts": [
      "Elle expulse de la masse et reçoit une quantité de mouvement opposée.",
      "Pour abandonner les réservoirs et moteurs devenus inutiles et réduire la masse à accélérer.",
      "Une chute libre dont la vitesse horizontale fait manquer continuellement la surface.",
      "Ils sont en chute libre avec leur véhicule.",
      "Elle utilise le mouvement d’une planète pour modifier la vitesse et la direction d’une sonde."
    ],
    "express": [
      "Une fusée avance en expulsant de la masse à grande vitesse dans la direction opposée. Elle n’a pas besoin de pousser sur l’air : action et réaction fonctionnent dans le vide. Les étages sont abandonnés lorsqu’ils sont vides afin de ne plus accélérer une masse inutile.",
      "Une orbite est une chute libre courbe. La gravitation attire le satellite, tandis que sa vitesse tangentielle lui fait manquer continuellement la surface. Les astronautes semblent sans poids parce qu’ils chutent avec leur vaisseau, non parce que la gravité aurait disparu.",
      "Changer d’orbite exige une variation de vitesse. Une impulsion apparemment dirigée vers l’avant peut relever le côté opposé de l’orbite ; ralentir peut faire descendre. Les trajectoires interplanétaires utilisent des orbites autour du Soleil et parfois l’assistance gravitationnelle des planètes."
    ],
    "complete": [
      {
        "title": "1. L’équation de la fusée",
        "text": "Plus un véhicule emporte de carburant, plus il doit aussi accélérer ce carburant. La masse initiale augmente rapidement pour obtenir une grande variation de vitesse. Le choix du moteur, de la vitesse d’éjection et du nombre d’étages est donc central."
      },
      {
        "title": "2. Le vide n’empêche pas la poussée",
        "text": "Les gaz expulsés acquièrent une quantité de mouvement dans un sens ; la fusée acquiert une quantité opposée. L’air extérieur n’est pas nécessaire. Les moteurs chimiques embarquent à la fois combustible et comburant."
      },
      {
        "title": "3. L’impesanteur est une chute",
        "text": "À l’altitude d’une station orbitale, la gravité terrestre reste forte. Tous les objets accélèrent presque pareil, si bien qu’aucun sol ne les soutient. Les petites accélérations résiduelles expliquent le terme microgravité plutôt qu’absence absolue de gravité."
      },
      {
        "title": "4. Naviguer par impulsions",
        "text": "Dans l’espace, couper le moteur ne fait pas s’arrêter : le véhicule poursuit son orbite. Les manœuvres modifient énergie et direction. Une assistance gravitationnelle échange une petite quantité d’énergie avec le mouvement orbital d’une planète pour accélérer ou ralentir une sonde."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Fusées, vitesse orbitale et gravité », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Une fusée avance en expulsant de la masse à grande vitesse dans la direction opposée."
      },
      {
        "label": "Mécanisme",
        "text": "Une orbite est une chute libre courbe."
      },
      {
        "label": "Nuance",
        "text": "Changer d’orbite exige une variation de vitesse."
      },
      {
        "label": "À retenir",
        "text": "Atteindre l’espace ne suffit pas à rester en orbite. Une fusée doit surtout donner au véhicule une vitesse horizontale assez grande pour qu’il tombe continuellement autour de la Terre sans rencontrer le sol."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Comment une fusée produit-elle une poussée dans le vide ?",
        "a": "Elle expulse de la masse et reçoit une quantité de mouvement opposée.",
        "choices": [
          "Elle pousse sur l’air absent.",
          "Elle est attirée par les étoiles.",
          "Elle réduit la masse de la Terre."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi utilise-t-on plusieurs étages ?",
        "a": "Pour abandonner les réservoirs et moteurs devenus inutiles et réduire la masse à accélérer.",
        "choices": [
          "Pour ajouter des passagers à chaque altitude.",
          "Pour créer plusieurs gravités.",
          "Pour ralentir la lumière."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Qu’est-ce qu’une orbite ?",
        "a": "Une chute libre dont la vitesse horizontale fait manquer continuellement la surface.",
        "choices": [
          "Une zone sans gravité.",
          "Un cercle matériel autour de la Terre.",
          "Une trajectoire qui exige une poussée constante."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi les astronautes flottent-ils ?",
        "a": "Ils sont en chute libre avec leur véhicule.",
        "choices": [
          "La gravité terrestre s’arrête à cent kilomètres.",
          "L’air les porte.",
          "Le Soleil annule exactement toute force."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Que fait une assistance gravitationnelle ?",
        "a": "Elle utilise le mouvement d’une planète pour modifier la vitesse et la direction d’une sonde.",
        "choices": [
          "Elle éteint la gravité de la planète.",
          "Elle transforme une sonde en satellite naturel.",
          "Elle produit du carburant à partir du vide."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  },
  "astro-moon-mars-exploration": {
    "hook": "L’exploration spatiale ne suit pas une course simple vers toujours plus loin. Chaque mission répond à un compromis entre science, technologie, coût, risque et politique. La Lune et Mars sont deux laboratoires très différents.",
    "keyFacts": [
      "Des datations et des indices sur l’origine et l’évolution de la Lune.",
      "Les communications subissent un délai qui empêche le pilotage instantané.",
      "Les anciens lacs, deltas et roches sédimentaires ayant connu de l’eau.",
      "Les laboratoires terrestres disposent d’instruments plus variés et précis.",
      "Non, leurs capacités et risques sont complémentaires."
    ],
    "express": [
      "Les premières sondes lunaires ont testé survols, impacts, orbites et alunissages avant les missions habitées. Les échantillons Apollo ont daté des terrains, révélé une origine commune après un impact géant et fourni une référence pour l’âge des surfaces par comptage des cratères.",
      "Mars est assez proche pour recevoir de nombreux robots, mais chaque voyage dure des mois et les communications ont un délai. Orbiteurs, atterrisseurs et rovers étudient climat, géologie, eau ancienne et habitabilité. Un retour d’échantillons offre des analyses terrestres beaucoup plus fines, mais exige une chaîne complexe.",
      "Une présence humaine permet décisions rapides, réparation et exploration flexible, mais demande protection contre rayonnement, poussière, faible gravité et isolement. Les robots restent moins coûteux et acceptent davantage de risques. Les stratégies sérieuses combinent donc souvent les deux plutôt que de les opposer."
    ],
    "complete": [
      {
        "title": "1. La Lune comme archive",
        "text": "Sans atmosphère dense ni tectonique active comparable à la Terre, sa surface conserve une longue histoire d’impacts. Les régions polaires, où de la glace existe dans des zones ombragées, intéressent à la fois la science et une éventuelle utilisation locale de ressources."
      },
      {
        "title": "2. Mars, planète anciennement humide",
        "text": "Les deltas, argiles et roches sédimentaires montrent des environnements où l’eau a persisté. Les rovers choisissent des sites capables de préserver des traces chimiques ou texturales. Ils ne recherchent pas seulement des organismes vivants aujourd’hui."
      },
      {
        "title": "3. Atterrir est difficile",
        "text": "Une atmosphère martienne trop mince ne freine pas assez avec un parachute seul, mais assez dense pour chauffer et déstabiliser le véhicule. Bouclier thermique, parachute, rétrofusées ou grue volante doivent s’enchaîner avec très peu de marge."
      },
      {
        "title": "4. Science et politique",
        "text": "Les programmes spatiaux dépendent de budgets pluriannuels, de coopérations et de priorités nationales. Une mission peut être scientifiquement excellente mais reportée pour des raisons industrielles ou politiques. Comprendre l’exploration exige donc autant de technique que d’organisation collective."
      },
      {
        "title": "5. Comment les astronomes tranchent",
        "text": "Pour étudier « Explorer la Lune et Mars : robots, humains et objectifs scientifiques », les astronomes ne s'appuient pas sur une image isolée. Ils comparent plusieurs instruments, plusieurs longueurs d'onde et des modèles capables de produire des prédictions mesurables. Une explication devient solide lorsqu'elle résiste à des observations indépendantes, précise ses incertitudes et reste révisable si de nouvelles données contredisent le scénario initial."
      }
    ],
    "deeper": [
      {
        "title": "À ne pas confondre",
        "text": "Le vocabulaire astronomique distingue les observations, les modèles qui les expliquent et les hypothèses encore ouvertes."
      },
      {
        "title": "Méthode",
        "text": "Les conclusions solides reposent sur plusieurs mesures indépendantes, avec des incertitudes explicitement comparées."
      },
      {
        "title": "Échelle",
        "text": "Les phénomènes astronomiques deviennent plus clairs quand on précise la distance, la durée et l’ordre de grandeur concernés."
      }
    ],
    "takeaways": [
      {
        "label": "Idée clé",
        "text": "Les premières sondes lunaires ont testé survols, impacts, orbites et alunissages avant les missions habitées."
      },
      {
        "label": "Mécanisme",
        "text": "Mars est assez proche pour recevoir de nombreux robots, mais chaque voyage dure des mois et les communications ont un délai."
      },
      {
        "label": "Nuance",
        "text": "Une présence humaine permet décisions rapides, réparation et exploration flexible, mais demande protection contre rayonnement, poussière, faible gravité et isolement."
      },
      {
        "label": "À retenir",
        "text": "L’exploration spatiale ne suit pas une course simple vers toujours plus loin. Chaque mission répond à un compromis entre science, technologie, coût, risque et politique. La Lune et Mars sont deux laboratoires très différents."
      }
    ],
    "quiz": [
      {
        "kind": "repère-1",
        "q": "Qu’ont apporté les échantillons lunaires ?",
        "a": "Des datations et des indices sur l’origine et l’évolution de la Lune.",
        "choices": [
          "La preuve d’une atmosphère dense actuelle.",
          "Un carburant illimité déjà exploité.",
          "La découverte de forêts fossiles."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 1 du cours complet."
      },
      {
        "kind": "repère-2",
        "q": "Pourquoi les robots martiens doivent-ils être autonomes ?",
        "a": "Les communications subissent un délai qui empêche le pilotage instantané.",
        "choices": [
          "Mars bloque toutes les ondes radio.",
          "Ils se déplacent plus vite que la lumière.",
          "La Terre ne tourne pas dans la même direction."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 2 du cours complet."
      },
      {
        "kind": "repère-3",
        "q": "Quels environnements martiens intéressent la recherche de vie ancienne ?",
        "a": "Les anciens lacs, deltas et roches sédimentaires ayant connu de l’eau.",
        "choices": [
          "Uniquement les dunes les plus sèches.",
          "Les volcans actifs observés chaque jour.",
          "Les villes artificielles visibles depuis l’orbite."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 3 du cours complet."
      },
      {
        "kind": "repère-4",
        "q": "Pourquoi un retour d’échantillons est-il puissant ?",
        "a": "Les laboratoires terrestres disposent d’instruments plus variés et précis.",
        "choices": [
          "Les roches deviennent vivantes sur Terre.",
          "Les sondes ne peuvent mesurer aucune composition.",
          "Il évite toute règle de protection planétaire."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      },
      {
        "kind": "repère-5",
        "q": "Robots et humains sont-ils nécessairement rivaux ?",
        "a": "Non, leurs capacités et risques sont complémentaires.",
        "choices": [
          "Oui, une mission doit toujours choisir un seul type.",
          "Oui, les robots ne produisent aucune science.",
          "Non, car les humains n’ont aucun avantage sur place."
        ],
        "why": "Cette réponse reprend le mécanisme expliqué dans le cours.",
        "trap": "Choisir une formulation spectaculaire mais incompatible avec les observations.",
        "evidence": "Section 4 du cours complet."
      }
    ]
  }
};
  const MYSTERIES = [
  {
    "id": "astro-mystery-horizon-186",
    "discipline": "astronomy",
    "difficulty": "moyen",
    "title": "La frontière qui n’est pas un mur",
    "caseTitle": "Limite cosmologique",
    "subjectType": "limite d’observation",
    "periodHint": "Univers observable",
    "lessonId": "astro-observable-universe",
    "prompt": "Je délimite la région dont les signaux ont eu le temps de parvenir jusqu’à nous. Je ne suis ni une paroi ni le bord démontré de tout ce qui existe.",
    "answer": "L’horizon cosmologique",
    "aliases": [
      "horizon cosmologique",
      "l horizon cosmologique",
      "horizon de l univers observable",
      "limite de l univers observable"
    ],
    "clues": [
      "Ma position dépend de l’observateur et de l’histoire de l’expansion.",
      "Au-delà de moi, des régions peuvent exister sans pouvoir encore nous informer.",
      "Je suis une frontière causale de l’Univers observable."
    ],
    "explanation": "L’horizon cosmologique est une limite d’information : au-delà, la lumière n’a pas pu nous atteindre.",
    "blockedGuesses": [
      "mur",
      "bord de l univers",
      "voie lactee"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-cmb-186",
    "discipline": "astronomy",
    "difficulty": "difficile",
    "title": "La lumière refroidie depuis l’enfance du cosmos",
    "caseTitle": "Rayonnement",
    "subjectType": "rayonnement cosmologique",
    "periodHint": "Univers primordial",
    "lessonId": "astro-big-bang",
    "prompt": "Je remplis presque uniformément le ciel. J’ai été libéré lorsque l’Univers est devenu transparent et l’expansion m’a déplacé vers les micro-ondes.",
    "answer": "Le fond diffus cosmologique",
    "aliases": [
      "fond diffus cosmologique",
      "le fond diffus cosmologique",
      "rayonnement fossile",
      "cmb"
    ],
    "clues": [
      "Je constitue la plus ancienne lumière directement observable.",
      "Mes minuscules variations ont annoncé les futures grandes structures.",
      "Ma température actuelle est proche de quelques kelvins."
    ],
    "explanation": "Le fond diffus cosmologique est la lumière fossile émise lorsque la matière et le rayonnement se sont découplés.",
    "blockedGuesses": [
      "big bang",
      "micro ondes",
      "lumiere"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-pulsar-186",
    "discipline": "astronomy",
    "difficulty": "moyen",
    "title": "Le phare qui tient dans une ville",
    "caseTitle": "Reste stellaire",
    "subjectType": "astre compact",
    "periodHint": "Après une supernova",
    "lessonId": "astro-stellar-deaths",
    "prompt": "Je concentre une masse comparable à celle du Soleil dans une sphère de quelques dizaines de kilomètres. Ma rotation peut envoyer vers la Terre des impulsions extrêmement régulières.",
    "answer": "Un pulsar",
    "aliases": [
      "pulsar",
      "un pulsar",
      "etoile a neutrons pulsante",
      "étoile à neutrons pulsante"
    ],
    "clues": [
      "Je suis une forme observable d’étoile à neutrons.",
      "Mes faisceaux balayent l’espace comme ceux d’un phare.",
      "Je naîs après l’effondrement du cœur de certaines étoiles massives."
    ],
    "explanation": "Un pulsar est une étoile à neutrons en rotation dont les faisceaux sont détectés périodiquement.",
    "blockedGuesses": [
      "trou noir",
      "supernova",
      "etoile a neutrons"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-aurora-186",
    "discipline": "astronomy",
    "difficulty": "facile",
    "title": "Le rideau coloré guidé par un champ invisible",
    "caseTitle": "Phénomène atmosphérique",
    "subjectType": "interaction Soleil-atmosphère",
    "periodHint": "Régions polaires",
    "lessonId": "astro-solar-activity-auroras",
    "prompt": "Je danse surtout près des pôles lorsque des particules venues du Soleil excitent l’oxygène et l’azote de la haute atmosphère.",
    "answer": "Une aurore polaire",
    "aliases": [
      "aurore polaire",
      "une aurore polaire",
      "aurore boreale",
      "aurore boréale",
      "aurore australe"
    ],
    "clues": [
      "Le champ magnétique terrestre canalise les particules.",
      "Je peux apparaître verte, rouge, bleue ou violette.",
      "Mon activité augmente souvent pendant les tempêtes géomagnétiques."
    ],
    "explanation": "Une aurore polaire est la lumière émise par des gaz atmosphériques excités par des particules énergétiques.",
    "blockedGuesses": [
      "arc en ciel",
      "vent solaire",
      "tempete solaire"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-greenhouse-venus-186",
    "discipline": "astronomy",
    "difficulty": "moyen",
    "title": "Plus chaude que la planète la plus proche",
    "caseTitle": "Planète",
    "subjectType": "planète rocheuse",
    "periodHint": "Système solaire interne",
    "lessonId": "astro-rocky-planets",
    "prompt": "Je ressemble à la Terre par ma taille, mais mon atmosphère épaisse de dioxyde de carbone entretient un effet de serre qui rend ma surface plus chaude que celle de Mercure.",
    "answer": "Vénus",
    "aliases": [
      "venus",
      "vénus",
      "la planete venus",
      "la planète vénus"
    ],
    "clues": [
      "Mes nuages contiennent de l’acide sulfurique.",
      "Ma pression au sol est immense.",
      "Je tourne très lentement et dans un sens inhabituel."
    ],
    "explanation": "Vénus est une planète rocheuse dont l’atmosphère dense produit un effet de serre extrême.",
    "blockedGuesses": [
      "mercure",
      "terre",
      "mars"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-enceladus-186",
    "discipline": "astronomy",
    "difficulty": "difficile",
    "title": "L’océan qui s’échantillonne dans l’espace",
    "caseTitle": "Lune",
    "subjectType": "satellite glacé",
    "periodHint": "Autour de Saturne",
    "lessonId": "astro-ocean-moons",
    "prompt": "Je suis petite et glacée, mais des fractures de mon pôle sud projettent des panaches contenant eau, sels et molécules issues d’un océan interne.",
    "answer": "Encelade",
    "aliases": [
      "encelade",
      "enceladus",
      "la lune encelade"
    ],
    "clues": [
      "Je tourne autour de Saturne.",
      "Une sonde a traversé mes jets.",
      "Le chauffage de marée entretient mon activité interne."
    ],
    "explanation": "Encelade est une lune de Saturne dont les panaches permettent d’étudier indirectement un océan sous-glaciaire.",
    "blockedGuesses": [
      "europe",
      "titan",
      "saturne"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-comet-tail-186",
    "discipline": "astronomy",
    "difficulty": "moyen",
    "title": "Une queue qui ne suit pas toujours la route",
    "caseTitle": "Petit corps",
    "subjectType": "corps glacé",
    "periodHint": "Passage près du Soleil",
    "lessonId": "astro-asteroids-comets",
    "prompt": "Quand je m’approche du Soleil, mes glaces se subliment. Mes queues sont poussées par le rayonnement et le vent solaire, si bien qu’elles pointent globalement à l’opposé du Soleil.",
    "answer": "Une comète",
    "aliases": [
      "comete",
      "comète",
      "une comete",
      "une comète",
      "noyau cometaire",
      "noyau cométaire"
    ],
    "clues": [
      "Mon noyau est sombre et riche en glaces.",
      "Je peux provenir de régions très lointaines du Système solaire.",
      "Ma chevelure peut devenir bien plus grande que mon noyau."
    ],
    "explanation": "Une comète devient active près du Soleil et développe une chevelure ainsi que plusieurs queues.",
    "blockedGuesses": [
      "asteroide",
      "météore",
      "meteorite"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-transit-186",
    "discipline": "astronomy",
    "difficulty": "moyen",
    "title": "La planète révélée par une minuscule baisse",
    "caseTitle": "Méthode",
    "subjectType": "méthode de détection",
    "periodHint": "Exoplanètes",
    "lessonId": "astro-exoplanet-detection",
    "prompt": "Je détecte une planète lorsque la luminosité de son étoile baisse légèrement et régulièrement au moment où elle passe devant elle depuis notre ligne de visée.",
    "answer": "La méthode des transits",
    "aliases": [
      "methode des transits",
      "méthode des transits",
      "transit",
      "les transits",
      "photometrie de transit",
      "photométrie de transit"
    ],
    "clues": [
      "La profondeur de la baisse renseigne sur le rayon relatif.",
      "La répétition fournit la période orbitale.",
      "Je ne fonctionne que si la géométrie du système est favorable."
    ],
    "explanation": "La méthode des transits repère les baisses périodiques de lumière produites par le passage d’une planète devant son étoile.",
    "blockedGuesses": [
      "vitesse radiale",
      "eclipse",
      "imagerie directe"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-spectrum-186",
    "discipline": "astronomy",
    "difficulty": "difficile",
    "title": "L’empreinte chimique cachée dans la lumière",
    "caseTitle": "Technique",
    "subjectType": "méthode d’analyse",
    "periodHint": "Observation astronomique",
    "lessonId": "astro-telescopes-spectrum",
    "prompt": "Je sépare la lumière selon sa longueur d’onde. Mes raies révèlent les atomes, la température et parfois le mouvement d’un objet que personne ne peut toucher.",
    "answer": "La spectroscopie",
    "aliases": [
      "spectroscopie",
      "la spectroscopie",
      "analyse spectrale",
      "spectre"
    ],
    "clues": [
      "Chaque élément laisse des raies caractéristiques.",
      "Un décalage de mes raies peut mesurer une vitesse radiale.",
      "Je transforme la lumière en diagnostic physique."
    ],
    "explanation": "La spectroscopie décompose la lumière et permet d’identifier composition et conditions physiques.",
    "blockedGuesses": [
      "telescope",
      "doppler",
      "prisme"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  },
  {
    "id": "astro-mystery-orbit-186",
    "discipline": "astronomy",
    "difficulty": "facile",
    "title": "Tomber sans jamais toucher le sol",
    "caseTitle": "Trajectoire",
    "subjectType": "mouvement spatial",
    "periodHint": "Autour d’un astre",
    "lessonId": "astro-rockets-orbits",
    "prompt": "Je suis une chute libre courbe : la gravitation m’attire, mais ma vitesse horizontale me fait manquer continuellement la surface.",
    "answer": "Une orbite",
    "aliases": [
      "orbite",
      "une orbite",
      "mise en orbite",
      "trajectoire orbitale"
    ],
    "clues": [
      "La gravité ne disparaît pas sur ma trajectoire.",
      "Les astronautes y flottent parce qu’ils chutent avec leur véhicule.",
      "Une variation de vitesse peut me relever ou m’abaisser."
    ],
    "explanation": "Une orbite est une trajectoire de chute libre autour d’un corps sous l’effet de la gravitation.",
    "blockedGuesses": [
      "apesanteur",
      "gravite zero",
      "satellite"
    ],
    "modeMystery": true,
    "manualCluesB97": true,
    "cluesCleaned": true,
    "balancedMysteryB186": true,
    "editorialRevision": "beta186",
    "rescueAvailable": true
  }
];

  if (!DISCIPLINES.some(item => item.id === DISCIPLINE.id)) DISCIPLINES.push(DISCIPLINE);
  DISCIPLINE_OUTLINES.astronomy = { groups: GROUPS, worlds: WORLDS };
  PLANNED_DISCIPLINE_GROUPS.astronomy = GROUPS;
  PLANNED_DISCIPLINE_WORLDS.astronomy = WORLDS;
  DISCIPLINE_MODE_COPY.astronomy = {
    label: "Mode Astronomie",
    shortLabel: "Astronomie",
    noun: "astronomique",
    headline: "Explore l’Univers, des planètes proches aux structures cosmiques.",
    promise: "Échelles, étoiles, Système solaire, exoplanètes et exploration avancent dans un parcours cohérent.",
    discoveryTitle: "Cours d’astronomie à découvrir",
    discoveryIntro: "Un parcours autonome pour comprendre avant de mémoriser : mécanismes, observations et grands repères."
  };

  Object.entries(LESSONS).forEach(([worldId, items]) => {
    if (!Array.isArray(data.lessons[worldId])) data.lessons[worldId] = [];
    const known = new Set(data.lessons[worldId].map(item => item?.id));
    items.forEach(item => { if (!known.has(item.id)) data.lessons[worldId].push(item); });
  });
  Object.keys(PACKS).forEach(id => PUBLISHED_LESSON_IDS.add(id));
  Object.assign(READY_LESSON_PACKS, PACKS);
  lessonIndexCache = null;

  if (!Array.isArray(data.mysteries)) data.mysteries = [];
  const knownMysteries = new Set(data.mysteries.map(item => item?.id));
  MYSTERIES.forEach(item => { if (!knownMysteries.has(item.id)) data.mysteries.push(item); });

  const audit = {
    version: VERSION,
    discipline: DISCIPLINE.id,
    groups: GROUPS.length,
    worlds: WORLDS.length,
    lessons: Object.keys(PACKS).length,
    mysteries: MYSTERIES.length,
    quality: Object.fromEntries(Object.entries(PACKS).map(([id, pack]) => [id, rawPublishedQuality(pack)]))
  };
  audit.ok = audit.lessons === 20 && audit.mysteries === 10 && Object.values(audit.quality).every(item => item.pass);
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, astronomy: audit }; } catch {}
  if (!audit.ok) try { console.warn("HistoDaily beta186 astronomy audit", audit); } catch {}
  try {
    if (typeof renderSoon === "function") renderSoon();
    else if (typeof render === "function") render({ immediate: true });
  } catch (error) { try { console.warn("HistoDaily beta186 astronomy refresh", error); } catch {} }
})();

/* Beta 231 — dossier Astronomie cohérent avec l’accueil */
(function histodailyBeta231BlackHoleMystery(){
  const mystery = {
    id: "astro-mystery-black-hole-231",
    discipline: "astronomy",
    difficulty: "moyen",
    title: "La frontière dont rien ne revient",
    caseTitle: "Reste stellaire",
    subjectType: "astre compact",
    periodHint: "Fin de vie de certaines étoiles massives",
    lessonId: "astro-stellar-deaths",
    prompt: "Je peux naître lorsque le cœur d’une étoile très massive s’effondre. Autour de moi, une frontière marque le point au-delà duquel aucun signal, même lumineux, ne peut revenir vers l’extérieur.",
    answer: "Un trou noir",
    aliases: [
      "trou noir",
      "un trou noir",
      "black hole"
    ],
    clues: [
      "À distance égale, j’attire comme n’importe quel objet possédant la même masse.",
      "Ma frontière causale s’appelle l’horizon des événements.",
      "On me repère par mes effets sur la matière, la lumière et les astres voisins plutôt qu’en me voyant directement."
    ],
    explanation: "Un trou noir est une région de l’espace-temps où la gravité est si intense qu’au-delà de l’horizon des événements, aucune trajectoire ne permet à un signal de ressortir.",
    blockedGuesses: [
      "pulsar",
      "étoile à neutrons",
      "etoile a neutrons",
      "supernova"
    ],
    modeMystery: true,
    manualCluesB97: true,
    cluesCleaned: true,
    balancedMysteryB231: true,
    editorialRevision: "beta231",
    rescueAvailable: true
  };

  if (!Array.isArray(data.mysteries)) data.mysteries = [];
  if (!data.mysteries.some(item => item?.id === mystery.id)) data.mysteries.unshift(mystery);
})();
