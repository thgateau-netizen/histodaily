/* HistoDaily 1.0.0-rc.39.0 — Science & Astronomy progressive reasoning pass. */
(function histodailyRC39ScienceAstronomy(){
  "use strict";
  const VERSION="1.0.0-rc.39.0";
  const PAYLOAD={
  "courses": {
    "sci-method-proof-basics": {
      "practice": "Tu veux savoir si la lumière influence la croissance d’une plante. Avant de chercher une “bonne réponse”, imagine deux plantes comparables, une seule différence entre elles, ce que tu mesures et quel résultat te ferait changer d’avis. La science commence par rendre une idée testable.",
      "quiz": [
        {
          "kind": "experiment",
          "q": "Deux plantes identiques reçoivent la même eau. L’une est près d’une fenêtre, l’autre dans l’obscurité. Quelle variable est volontairement changée ?",
          "a": "La quantité de lumière reçue.",
          "choices": [
            "La quantité d’eau reçue.",
            "L’espèce de la plante.",
            "La durée totale de l’expérience."
          ],
          "why": "Le protocole cherche précisément à isoler l’effet de la lumière en gardant le reste aussi comparable que possible.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "prediction",
          "q": "Ton hypothèse est : « davantage de lumière augmente la croissance ». Quelle prédiction permet réellement de la tester ?",
          "a": "Dans des conditions comparables, la plante mieux éclairée devrait croître davantage.",
          "choices": [
            "La plante éclairée sera forcément plus belle.",
            "Toutes les plantes du monde ont besoin exactement de la même lumière.",
            "Si la plante pousse, l’hypothèse est définitivement prouvée."
          ],
          "why": "Une prédiction traduit l’hypothèse en différence observable sans transformer un résultat en certitude absolue.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "evidence",
          "q": "Une seule mesure va dans le sens attendu. Qu’est-ce qui rendrait le résultat plus solide ?",
          "a": "Répéter l’expérience et retrouver le même effet avec plusieurs plantes.",
          "choices": [
            "Choisir uniquement les plantes qui confirment l’idée.",
            "Arrêter les mesures dès que le résultat attendu apparaît.",
            "Demander à davantage de personnes si elles trouvent l’idée convaincante."
          ],
          "why": "La répétition permet de distinguer un effet robuste d’un hasard, d’une erreur de mesure ou d’un cas particulier.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "revision",
          "q": "Le résultat répété contredit ton hypothèse. Quel réflexe est le plus scientifique ?",
          "a": "Revoir l’hypothèse ou le protocole et chercher ce qui explique le résultat.",
          "choices": [
            "Écarter les mesures puisqu’elles ne correspondent pas à l’idée de départ.",
            "Modifier après coup la prédiction pour qu’elle corresponde au résultat.",
            "Conserver l’hypothèse parce qu’elle semblait logique avant l’expérience."
          ],
          "why": "Une hypothèse scientifique accepte le risque d’être corrigée quand les observations lui résistent.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "interpretation",
          "q": "Pourquoi devient-il difficile de conclure si deux groupes diffèrent à la fois par la lumière et par la quantité d’eau ?",
          "a": "On ne sait plus quelle différence a produit l’effet observé.",
          "choices": [
            "Deux variables rendent toujours une expérience deux fois plus précise.",
            "La croissance ne peut plus être mesurée avec des nombres.",
            "Une expérience scientifique doit obligatoirement se faire en laboratoire."
          ],
          "why": "Quand plusieurs facteurs changent ensemble, on ne peut plus attribuer proprement l’effet à l’un d’eux.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        }
      ]
    },
    "sci-galileo-revolution": {
      "practice": "Imagine que tu défendes un modèle du ciel où tous les astres doivent tourner autour de la Terre. Puis une lunette montre quatre petits corps qui tournent clairement autour de Jupiter. L’observation ne prouve pas à elle seule tout le modèle de Copernic, mais elle détruit déjà une contrainte importante de l’ancien modèle.",
      "quiz": [
        {
          "kind": "observation",
          "q": "Galilée voit plusieurs petits astres changer de position autour de Jupiter nuit après nuit. Quelle conclusion minimale est justifiée ?",
          "a": "Certains corps célestes tournent autour d’un autre astre que la Terre.",
          "choices": [
            "Jupiter est nécessairement au centre de tout l’Univers.",
            "La Terre ne bouge plus du tout.",
            "La lunette montre que toutes les orbites sont parfaitement circulaires."
          ],
          "why": "Les satellites de Jupiter suffisent à montrer que la Terre n’est pas l’unique centre de tous les mouvements célestes.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "model",
          "q": "Pourquoi les phases de Vénus intéressent-elles le débat sur les modèles du Système solaire ?",
          "a": "Leur succession dépend de la position de Vénus par rapport au Soleil et permet de tester la géométrie des modèles.",
          "choices": [
            "Elles permettent de mesurer directement la masse de la Terre.",
            "Elles montrent que Vénus produit sa propre lumière.",
            "Elles prouvent que toutes les étoiles tournent autour de Vénus."
          ],
          "why": "Une observation devient utile lorsqu’elle distingue des modèles qui ne prédisent pas exactement la même chose.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "instrument",
          "q": "Deux observateurs obtiennent des images différentes avec deux lunettes. Que faut-il faire avant de conclure ?",
          "a": "Comparer les instruments, répéter les observations et vérifier si le phénomène persiste.",
          "choices": [
            "Choisir l’image la plus spectaculaire.",
            "Faire confiance à l’observateur le plus célèbre.",
            "Moyenner les deux images sans examiner les instruments."
          ],
          "why": "Un instrument étend l’observation mais peut aussi introduire des défauts : il faut donc contrôler et reproduire.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "interpretation",
          "q": "Des reliefs et des ombres apparaissent sur la Lune. Quelle idée ancienne est directement fragilisée ?",
          "a": "L’idée que tous les corps célestes sont des sphères parfaitement lisses et immuables.",
          "choices": [
            "L’existence même de la Lune.",
            "Le fait que la Terre possède une atmosphère.",
            "La possibilité de mesurer le temps avec une horloge."
          ],
          "why": "Les ombres variables s’expliquent naturellement par un relief, ce qui contredit l’image d’un ciel matériellement parfait.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "reasoning",
          "q": "Quelle leçon scientifique résume le mieux l’épisode ?",
          "a": "Un nouvel instrument peut produire des observations qui obligent à départager ou modifier des modèles.",
          "choices": [
            "Une image nouvelle prouve automatiquement toute théorie proposée avec elle.",
            "Un instrument rend les interprétations inutiles.",
            "Une théorie devient vraie dès qu’elle est défendue contre une autorité."
          ],
          "why": "Le progrès vient du lien entre observation, prédictions et comparaison de modèles, pas de l’instrument seul.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        }
      ]
    },
    "sci-natural-selection": {
      "practice": "Dans une population de coléoptères, certains sont clairs et d’autres sombres. Sur un sol devenu sombre, les oiseaux repèrent plus facilement les clairs. Il n’est pas nécessaire que les coléoptères “veuillent” changer : si la couleur est héréditaire, la fréquence des variantes peut changer génération après génération.",
      "quiz": [
        {
          "kind": "mechanism",
          "q": "Des insectes sombres sont moins repérés sur un sol noir et la couleur est héréditaire. Que prévoit la sélection naturelle ?",
          "a": "La proportion d’insectes sombres peut augmenter au fil des générations.",
          "choices": [
            "Chaque insecte clair décide de devenir sombre pendant sa vie.",
            "Tous les descendants naissent sombres dès la génération suivante.",
            "Le sol fabrique directement la mutation exacte dont chaque insecte a besoin."
          ],
          "why": "La sélection agit sur des variations présentes : elle change leur succès reproductif, pas les besoins conscients des individus.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "variation",
          "q": "Pour qu’un avantage influence l’évolution d’une population, quelle condition est essentielle ?",
          "a": "Il faut qu’au moins une partie de la variation soit transmissible aux descendants.",
          "choices": [
            "Il faut que tous les individus possèdent déjà exactement le même caractère.",
            "Il faut que le caractère apparaisse seulement après la reproduction.",
            "Il faut que l’environnement connaisse à l’avance le caractère utile."
          ],
          "why": "Sans transmission, un avantage individuel ne modifie pas durablement la fréquence du caractère dans les générations suivantes.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "antibiotic",
          "q": "Avant un antibiotique, quelques bactéries sont déjà résistantes. Après traitement, que se passe-t-il le plus naturellement ?",
          "a": "Les sensibles disparaissent davantage et les résistantes laissent proportionnellement plus de descendants.",
          "choices": [
            "L’antibiotique enseigne volontairement à chaque bactérie comment résister.",
            "Toutes les bactéries deviennent résistantes au même instant.",
            "La résistance cesse d’être héréditaire dès que l’antibiotique est présent."
          ],
          "why": "L’antibiotique sélectionne des différences déjà présentes ou apparues par variation, il ne crée pas un besoin dirigé.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "misconception",
          "q": "Pourquoi « les girafes ont allongé leur cou parce qu’elles avaient besoin d’atteindre les feuilles » est-il trompeur ?",
          "a": "Le besoin n’oriente pas la production de la variation ; le milieu favorise ensuite certaines variantes.",
          "choices": [
            "Parce que les individus allongeraient leur cou pendant leur vie puis transmettraient directement ce changement acquis.",
            "Parce qu’un changement de nourriture déclencherait chez les descendants la variation précise devenue utile.",
            "Parce que l’exercice répété du cou expliquerait à lui seul la modification héréditaire de la population."
          ],
          "why": "La sélection n’est pas un projet : elle trie des différences héréditaires selon leurs conséquences.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "limits",
          "q": "Une fréquence génétique change par hasard dans une toute petite population. Est-ce forcément de la sélection naturelle ?",
          "a": "Non. La dérive génétique peut aussi modifier les fréquences sans avantage adaptatif.",
          "choices": [
            "Oui, toute évolution est par définition une adaptation.",
            "Oui, le hasard ne peut agir qu’avant la naissance de la population.",
            "Non, car une fréquence génétique ne peut jamais changer au hasard."
          ],
          "why": "L’évolution regroupe plusieurs mécanismes : la sélection naturelle en est un, mais le hasard peut aussi modifier les fréquences génétiques par dérive.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        }
      ]
    },
    "sci-genetics-dna-history": {
      "practice": "Deux parents possèdent chacun une version différente d’un gène. Au lieu de chercher un caractère “dominant” dans l’absolu, demande-toi quelles versions sont transmises, comment elles s’expriment et quelles autres influences modifient le résultat. La génétique devient claire quand on sépare transmission, expression et environnement.",
      "quiz": [
        {
          "kind": "inheritance",
          "q": "Mendel croise des plantes puis compte les caractères chez leurs descendants. Qu’obtient-il directement ?",
          "a": "Des fréquences de caractères qui permettent d’inférer des règles de transmission.",
          "choices": [
            "Une photographie de la double hélice.",
            "La séquence complète de tous les gènes du pois.",
            "La preuve que l’environnement n’influence jamais un caractère."
          ],
          "why": "Mendel observe des résultats de croisements ; les mécanismes moléculaires seront identifiés bien plus tard.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "complementarity",
          "q": "Un brin d’ADN contient la séquence A-C-G-T. Quelle propriété permet de construire le brin complémentaire ?",
          "a": "A s’apparie avec T et C avec G.",
          "choices": [
            "Chaque base s’apparie uniquement avec elle-même.",
            "Les bases s’assemblent au hasard à chaque copie.",
            "Le sucre de l’ADN choisit la base selon la température."
          ],
          "why": "La complémentarité fournit une règle simple grâce à laquelle chaque brin peut servir de modèle.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "evidence",
          "q": "Une expérience montre qu’une information héréditaire passe avec l’ADN purifié. Quelle idée gagne directement du soutien ?",
          "a": "L’ADN peut porter une information transmissible entre générations ou cellules.",
          "choices": [
            "Toutes les protéines sont inutiles dans les cellules.",
            "Chaque caractère dépend d’un seul gène.",
            "L’ADN détermine seul tout ce qui arrive à un organisme."
          ],
          "why": "La preuve porte sur le rôle informationnel de l’ADN, pas sur l’absence de protéines ni sur un déterminisme absolu.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "gene-environment",
          "q": "Pourquoi deux plantes génétiquement identiques peuvent-elles atteindre des tailles différentes dans deux milieux ?",
          "a": "Le même génome peut produire des résultats différents selon l’environnement et la régulation.",
          "choices": [
            "Leur ADN a nécessairement disparu dans l’un des deux milieux.",
            "Les gènes ne jouent donc aucun rôle dans la taille.",
            "Un organisme change volontairement ses gènes pour s’adapter."
          ],
          "why": "Un caractère peut dépendre à la fois de variantes génétiques et des conditions dans lesquelles elles s’expriment.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "mutation",
          "q": "Une mutation apparaît dans un gène. Quelle affirmation est correcte ?",
          "a": "Son effet peut être défavorable, neutre ou parfois avantageux selon le contexte.",
          "choices": [
            "Une mutation entraîne en général une maladie visible chez l’organisme.",
            "Une mutation améliore habituellement l’adaptation au milieu où elle apparaît.",
            "Une mutation apparue dans une cellule du corps est transmise aux futurs enfants de l’organisme."
          ],
          "why": "Une mutation est d’abord une modification de séquence ; son effet dépend de l’endroit, du fonctionnement du gène et du contexte.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        }
      ]
    },
    "astro-moon-phases-eclipses-tides": {
      "practice": "Prends une lampe pour le Soleil et une balle pour la Lune. Fais tourner la balle autour de toi : sa moitié éclairée ne change pas, mais la fraction que tu vois change. Tu viens de fabriquer les phases sans utiliser l’ombre de la Terre.",
      "quiz": [
        {
          "kind": "geometry",
          "q": "La Lune est toujours éclairée sur une moitié par le Soleil. Pourquoi voit-on pourtant des phases ?",
          "a": "Depuis la Terre, nous voyons une fraction différente de cette moitié éclairée selon sa position sur l’orbite.",
          "choices": [
            "L’ombre de la Terre recouvre la Lune chaque semaine.",
            "La Lune change réellement de forme au cours du mois.",
            "Le Soleil éclaire la Lune seulement pendant la pleine Lune."
          ],
          "why": "Les phases sont un problème de géométrie entre Soleil, Terre et Lune, pas une série d’éclipses.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "prediction",
          "q": "Si les phases étaient causées par l’ombre de la Terre, que devrait-on observer très souvent ?",
          "a": "Un alignement Terre-Soleil-Lune comparable à une éclipse pour chaque phase.",
          "choices": [
            "Une Lune toujours éclairée sur une moitié.",
            "Une rotation de la Lune sur elle-même.",
            "Une orbite lunaire inclinée."
          ],
          "why": "L’hypothèse de l’ombre conduit à une prédiction qui ne correspond pas à la géométrie réelle des phases.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "rotation",
          "q": "Pourquoi voit-on presque toujours le même hémisphère lunaire ?",
          "a": "La Lune tourne sur elle-même en environ le même temps qu’elle accomplit une orbite autour de la Terre.",
          "choices": [
            "La Lune ne tourne jamais sur elle-même.",
            "Son autre face reste toujours dans l’ombre.",
            "La Terre cache physiquement l’autre moitié de la Lune."
          ],
          "why": "Une rotation synchrone fait effectuer un tour sur soi pendant un tour autour de la Terre.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "eclipse",
          "q": "Pourquoi une nouvelle Lune ne produit-elle pas une éclipse solaire chaque mois ?",
          "a": "L’orbite de la Lune est inclinée : l’alignement exact n’a lieu que près de certains points de son orbite.",
          "choices": [
            "Le diamètre apparent du Soleil varierait assez pour empêcher l’alignement durant la plupart des mois.",
            "La rotation de la Lune interromprait régulièrement son passage entre la Terre et le Soleil.",
            "La géométrie d’une éclipse solaire dépendrait surtout de la saison terrestre en cours."
          ],
          "why": "La plupart des nouvelles Lunes passent légèrement au-dessus ou au-dessous de l’alignement nécessaire.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "tides",
          "q": "La Lune influence les marées, mais deux ports voisins n’ont pas exactement les mêmes horaires. Pourquoi ?",
          "a": "La forme des côtes, la profondeur et les résonances locales modifient la réponse de l’océan.",
          "choices": [
            "La gravité de la Lune s’éteint au-dessus de certains ports.",
            "Chaque mer possède une Lune différente.",
            "Le Soleil n’éclaire qu’un port à la fois."
          ],
          "why": "La force astronomique est globale, mais la réponse de l’eau dépend fortement de la géographie locale.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        }
      ]
    },
    "astro-seasons-tilt-solstice-equinox": {
      "practice": "Imagine une lampe fixe et un globe incliné. Sans rapprocher le globe de la lampe, fais-le tourner autour : un hémisphère reçoit tour à tour des rayons plus directs et des journées plus longues. C’est l’idée essentielle des saisons.",
      "quiz": [
        {
          "kind": "cause",
          "q": "Quand c’est l’été en France, c’est l’hiver en Australie. Quel mécanisme l’explique naturellement ?",
          "a": "L’inclinaison de l’axe terrestre favorise alternativement un hémisphère puis l’autre.",
          "choices": [
            "La Terre est beaucoup plus proche du Soleil pendant l’été français.",
            "Le Soleil chauffe seulement la moitié nord de la Terre six mois par an.",
            "La vitesse de la lumière change entre les hémisphères."
          ],
          "why": "Les saisons opposées dans les deux hémisphères sont une conséquence directe de l’inclinaison de l’axe.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "evidence",
          "q": "La Terre passe au plus près du Soleil au début de janvier. Que montre ce fait ?",
          "a": "La distance au Soleil ne peut pas être la cause principale de l’été dans l’hémisphère Nord.",
          "choices": [
            "Janvier est le mois le plus chaud partout sur Terre.",
            "L’orbite terrestre est parfaitement circulaire.",
            "La Terre ne reçoit aucune énergie solaire en juillet."
          ],
          "why": "Si la proximité était la cause principale, les deux hémisphères devraient connaître leurs saisons chaudes au même moment.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "sun-angle",
          "q": "Pourquoi un Soleil plus haut dans le ciel chauffe-t-il généralement davantage une même région ?",
          "a": "La même énergie arrive plus directement et se répartit sur une surface plus petite.",
          "choices": [
            "Le Soleil devient physiquement plus gros en été.",
            "L’atmosphère disparaît quand le Soleil monte.",
            "La Terre cesse de tourner pendant la journée."
          ],
          "why": "L’angle d’arrivée change la concentration de l’énergie reçue par unité de surface.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "day-length",
          "q": "Que se passe-t-il autour du solstice d’été d’un hémisphère ?",
          "a": "La durée du jour y atteint approximativement son maximum annuel.",
          "choices": [
            "La Terre atteint forcément son point le plus proche du Soleil.",
            "Le jour et la nuit y durent exactement douze heures.",
            "Le Soleil cesse de se lever pendant plusieurs semaines à toutes les latitudes."
          ],
          "why": "Le solstice correspond à un extrême de déclinaison solaire et donc de durée du jour.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "equator",
          "q": "Pourquoi les variations saisonnières de durée du jour sont-elles faibles près de l’équateur ?",
          "a": "La géométrie de l’inclinaison y modifie relativement peu la durée quotidienne d’éclairement.",
          "choices": [
            "L’équateur ne reçoit presque pas de lumière solaire.",
            "La Terre n’est pas inclinée quand on se trouve à l’équateur.",
            "Le Soleil reste sous l’horizon toute l’année."
          ],
          "why": "Près de l’équateur, jour et nuit restent proches de douze heures sur une grande partie de l’année.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        }
      ]
    },
    "astro-solar-system-formation": {
      "practice": "Les planètes tournent presque toutes dans le même sens et dans des plans voisins. Au lieu de mémoriser ce fait, demande-toi quel scénario de formation le rend naturel : un nuage qui se contracte, tourne et s’aplatit en disque fournit justement cette prédiction.",
      "quiz": [
        {
          "kind": "evidence",
          "q": "La plupart des grandes planètes orbitent dans des plans proches et dans le même sens. Quel scénario explique naturellement cette organisation ?",
          "a": "Une formation commune dans un disque de gaz et de poussière en rotation.",
          "choices": [
            "Une arrivée indépendante de chaque planète depuis des directions aléatoires.",
            "Une explosion récente de la Terre qui aurait projeté les autres planètes.",
            "Un Soleil déjà formé qui aurait créé chaque planète à des époques sans lien."
          ],
          "why": "Un disque en rotation transmet une organisation commune aux corps qui s’y assemblent.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "temperature",
          "q": "Pourquoi les matériaux glacés étaient-ils plus faciles à conserver loin du jeune Soleil ?",
          "a": "Les températures plus basses permettaient à davantage de composés volatils de se condenser.",
          "choices": [
            "La gravité était absente près du Soleil.",
            "Les roches ne pouvaient exister que loin du Soleil.",
            "La lumière se déplaçait plus lentement dans la partie externe du disque."
          ],
          "why": "La température du disque détermine quels matériaux peuvent rester solides et participer à la formation des corps.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "accretion",
          "q": "Des grains se heurtent, s’agrègent et forment progressivement des corps plus grands. Quel mécanisme est décrit ?",
          "a": "L’accrétion.",
          "choices": [
            "La fission nucléaire.",
            "La parallaxe.",
            "La rotation synchrone."
          ],
          "why": "L’accrétion désigne la croissance progressive d’un corps par collisions et accumulation de matière, exactement ce que décrit la scène proposée.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "archive",
          "q": "Pourquoi certaines météorites intéressent-elles particulièrement les astronomes ?",
          "a": "Elles conservent des matériaux très anciens, peu transformés depuis les débuts du Système solaire.",
          "choices": [
            "Elles proviennent toutes du centre du Soleil.",
            "Elles contiennent une photographie directe des premières planètes.",
            "Elles se forment uniquement dans l’atmosphère terrestre actuelle."
          ],
          "why": "Des matériaux primitifs permettent de tester la composition et les conditions du disque initial.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "model",
          "q": "Une nouvelle observation montre qu’un type de petit corps contient beaucoup plus de glace que prévu à sa distance. Que doit faire un bon modèle ?",
          "a": "Chercher si le transport de matière ou les températures du disque doivent être mieux représentés.",
          "choices": [
            "Ignorer l’observation puisqu’un modèle publié ne doit plus changer.",
            "Conclure que toute l’idée du disque est fausse à partir de ce seul cas.",
            "Changer la définition de la glace pour conserver la prédiction initiale."
          ],
          "why": "Un modèle scientifique est ajusté ou précisé quand des observations robustes révèlent une limite.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        }
      ]
    },
    "astro-rocky-planets": {
      "practice": "Mercure est plus proche du Soleil que Vénus, pourtant Vénus est plus chaude. Cette seule comparaison apprend une règle essentielle : pour comprendre une planète, la distance ne suffit pas ; il faut aussi regarder son atmosphère, sa masse, son eau et son histoire géologique.",
      "quiz": [
        {
          "kind": "comparison",
          "q": "Mercure est plus proche du Soleil, mais Vénus possède la température moyenne de surface la plus élevée. Quel facteur explique surtout ce paradoxe ?",
          "a": "L’atmosphère très épaisse de Vénus produit un effet de serre extrême.",
          "choices": [
            "Vénus possède deux Soleils.",
            "Mercure ne reçoit aucune lumière pendant son orbite.",
            "Le sol de Vénus produit sa chaleur en brûlant du carbone."
          ],
          "why": "Cette comparaison montre immédiatement que la distance au Soleil ne suffit pas à déterminer la température de surface.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "atmosphere",
          "q": "Pourquoi Mercure connaît-elle de très grands écarts de température entre jour et nuit ?",
          "a": "Elle possède très peu d’atmosphère pour stocker et redistribuer la chaleur.",
          "choices": [
            "Elle change de distance au Soleil toutes les quelques heures.",
            "Elle produit sa propre lumière pendant la journée.",
            "Sa surface est entièrement recouverte d’océans."
          ],
          "why": "Une atmosphère peut transporter et conserver une partie de l’énergie ; Mercure en possède très peu.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "mars",
          "q": "Des vallées anciennes ressemblent à des réseaux creusés par des écoulements. Quelle conclusion est la plus prudente ?",
          "a": "De l’eau liquide a probablement circulé à la surface de Mars dans le passé.",
          "choices": [
            "Mars possède aujourd’hui des océans identiques à ceux de la Terre.",
            "Ces vallées prouvent l’existence passée d’une civilisation.",
            "L’atmosphère martienne actuelle est plus épaisse que celle de la Terre."
          ],
          "why": "Les formes du relief soutiennent un passé plus humide sans justifier des conclusions beaucoup plus fortes.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "habitability",
          "q": "Une planète est située dans la “zone habitable” de son étoile. Que peut-on conclure ?",
          "a": "Sa distance pourrait permettre de l’eau liquide dans certaines conditions, mais son atmosphère et son histoire restent déterminantes.",
          "choices": [
            "Elle possède nécessairement des océans et de la vie.",
            "Sa température est connue exactement sans observer son atmosphère.",
            "Elle est forcément identique à la Terre."
          ],
          "why": "La zone habitable est un premier filtre énergétique, pas un certificat d’habitabilité.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        },
        {
          "kind": "comparison",
          "q": "Pour comparer sérieusement le climat de deux planètes rocheuses, quelles informations sont les plus utiles ensemble ?",
          "a": "Énergie reçue, atmosphère, masse et propriétés de surface.",
          "choices": [
            "Leur couleur vue depuis l’espace, car elle suffirait à résumer leur atmosphère.",
            "Leur distance au Soleil, car elle donnerait directement leur température de surface.",
            "Le nombre de cratères, car il déterminerait à lui seul leur climat actuel."
          ],
          "why": "Le climat résulte de plusieurs mécanismes qui interagissent ; une seule variable ne suffit généralement pas.",
          "trap": "Les autres réponses correspondent à une confusion plausible, mais ne collent pas à ce que la situation permet d’observer.",
          "evidence": "Pars de ce qui est observé, prédis ce qui devrait se passer, puis choisis l’explication la plus simple compatible avec les faits."
        }
      ]
    }
  }
};
  const STARTER_SCIENCE=new Set(["sci-method-proof-basics","sci-galileo-revolution","sci-natural-selection","sci-genetics-dna-history"]);
  const STARTER_ASTRONOMY=new Set(["astro-moon-phases-eclipses-tides","astro-seasons-tilt-solstice-equinox","astro-solar-system-formation","astro-rocky-planets"]);
  function cleanSection(section){
    if(Array.isArray(section)) return {title:String(section[0]||''),text:String(section[1]||'')};
    if(section&&typeof section==='object') return {title:String(section.title||section.heading||''),text:String(section.text||section.body||'')};
    return {title:'',text:String(section||'')};
  }
  for(const [id,spec] of Object.entries(PAYLOAD.courses)){
    const current=READY_LESSON_PACKS[id]||{};
    const complete=Array.isArray(current.complete)?current.complete.map(cleanSection).filter(s=>s.text):[];
    const withoutOldPractice=complete.filter(s=>!/^À toi de (prévoir|tester)|^Mise en pratique scientifique$/i.test(s.title||''));
    READY_LESSON_PACKS[id]={...current,complete:[...withoutOldPractice,{title:'À toi de prévoir',text:spec.practice}],quiz:spec.quiz,contentRevision:'rc39-progressive-science',scienceExperience:{mode:'observe-predict-explain',difficultyStage:'starter',redesigned:true}};
    try{PUBLISHED_LESSON_IDS.add(id)}catch{}
  }
  for(const [id,pack] of Object.entries(READY_LESSON_PACKS||{})){
    if(id.startsWith('astro-')) pack.scienceExperience={...(pack.scienceExperience||{}),mode:'observe-model-predict',difficultyStage:STARTER_ASTRONOMY.has(id)?'starter':'progressive'};
    else if(id.startsWith('sci-')||id.startsWith('science-')) pack.scienceExperience={...(pack.scienceExperience||{}),mode:'observe-test-explain',difficultyStage:STARTER_SCIENCE.has(id)?'starter':'progressive'};
  }
  function reorderAstronomy(){
    const groupOrder=['astro-solar-system','astro-stars','astro-other-worlds','astro-exploration','astro-foundations'];
    const labels={
      'astro-solar-system':['1. Le ciel proche et le Système solaire','Lune → planètes','Commencer par des phénomènes familiers : phases, saisons, planètes et petits corps.'],
      'astro-stars':['2. Le Soleil et les étoiles','Soleil → trous noirs','Comprendre notre étoile avant d’élargir aux autres étoiles et à leur évolution.'],
      'astro-other-worlds':['3. Observer d’autres mondes','lumière → exoplanètes','Lire la lumière et apprendre comment on déduit l’existence de mondes invisibles.'],
      'astro-exploration':['4. Explorer l’espace','orbites → missions','Fusées, orbites, Lune et exploration robotique ou humaine.'],
      'astro-foundations':['5. L’Univers à grande échelle','distances → cosmologie','Seulement après les bases : distances cosmiques, galaxies, expansion et Univers primordial.']
    };
    const groups=PLANNED_DISCIPLINE_GROUPS?.astronomy;
    if(Array.isArray(groups)){
      groups.forEach(g=>{if(labels[g.id]){g.title=labels[g.id][0];g.range=labels[g.id][1];g.description=labels[g.id][2];}});
      groups.sort((a,b)=>groupOrder.indexOf(a.id)-groupOrder.indexOf(b.id));
    }
    try{DISCIPLINE_OUTLINES.astronomy.groups=groups}catch{}
    const worlds=PLANNED_DISCIPLINE_WORLDS?.astronomy||[];
    const sort={
      'astro-moon-phases':1,'astro-seasons-earth-orbit':2,'astro-formation-rocky':3,'astro-giants-moons':4,'astro-small-bodies':5,
      'astro-sun':10,'astro-stellar-life':11,'astro-relativity-blackholes':12,
      'astro-observation':20,'astro-exoplanet-detection':21,'astro-exoplanets-life':22,
      'astro-spaceflight':30,'astro-apollo-space-race':31,
      'astro-scales':40,'astro-gaia-milky-way':41,'astro-galaxies-web':42,'astro-cosmology':43
    };
    worlds.forEach(w=>{if(sort[w.id]!=null)w.sortStart=sort[w.id];});
    try{DISCIPLINE_OUTLINES.astronomy.worlds=worlds}catch{}
  }
  reorderAstronomy();
  try{
    const sg=PLANNED_DISCIPLINE_GROUPS?.['science-inventions']||[];
    const titles={
      'sci-method':'1. Observer, tester, corriger','sci-earth-life':'2. Terre et vivant','sci-energy-matter':'3. Énergie et matière','sci-medicine-tech':'4. Médecine et techniques','sci-digital-space':'5. Informatique et espace'
    };
    sg.forEach(g=>{if(titles[g.id])g.title=titles[g.id];});
  }catch{}
  const easierMysteries={
    'science-mystery-experimental-proof-121':{difficulty:'facile',prompt:'Deux groupes de plantes sont identiques sauf pour la lumière reçue. On mesure ensuite leur croissance et on répète l’essai. Quel type de démarche permet de tester si la lumière produit réellement une différence ?'},
    'science-mystery-immune-memory-235':{difficulty:'facile',prompt:'Après une première rencontre avec un antigène, certaines cellules persistent. Lors d’une nouvelle rencontre, la réponse devient plus rapide et plus efficace. Quel mécanisme est décrit ?'},
    'astronomy-mystery-synchronous-rotation-236':{difficulty:'facile',prompt:'La Lune tourne bien sur elle-même, mais elle met presque exactement autant de temps à faire ce tour qu’à tourner autour de la Terre. Quel mouvement explique que nous voyions presque toujours la même face ?'}
  };
  if(Array.isArray(data.mysteries)) data.mysteries.forEach(m=>{if(easierMysteries[m.id])Object.assign(m,easierMysteries[m.id],{difficultyRampRC39:'starter'});});
  try{
    DISCIPLINE_MODE_COPY['science-inventions']={...(DISCIPLINE_MODE_COPY['science-inventions']||{}),headline:'Observe. Prédis. Teste. Explique.',promise:'On commence par des situations simples et familières, puis les mécanismes deviennent progressivement plus exigeants. Pas de récitation de dates pour démarrer.',discoveryTitle:'Petites enquêtes scientifiques',discoveryIntro:'Une observation, une hypothèse, une prédiction : choisis ce que les faits permettent vraiment de conclure.'};
    DISCIPLINE_MODE_COPY.astronomy={...(DISCIPLINE_MODE_COPY.astronomy||{}),headline:'Pars du ciel que tu connais, puis agrandis l’échelle.',promise:'Lune, saisons et planètes d’abord ; étoiles, exoplanètes et cosmologie ensuite. Chaque étape part d’une observation avant d’introduire le modèle.',discoveryTitle:'Le ciel comme enquête',discoveryIntro:'Regarde ce qui change, imagine ce que le modèle prédit, puis confronte-le à l’observation.'};
  }catch{}
  if(typeof invalidateCatalogCaches==='function')invalidateCatalogCaches();else try{lessonIndexCache=null}catch{}
  try{window.HistoDaily={...(window.HistoDaily||{}),version:VERSION,scienceAstronomyRC39:{starterScience:[...STARTER_SCIENCE],starterAstronomy:[...STARTER_ASTRONOMY],principles:['familiar-first','observe','predict','test','explain','progressive-difficulty']}}}catch{}
})();
