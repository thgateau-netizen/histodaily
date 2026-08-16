/* HistoDaily 1.0.0-rc.38.0 — Philosophy redesign: problems, objections, counterexamples, argument production. */
(function histodailyRC38PhilosophyRedesign(){
  "use strict";
  const VERSION = "1.0.0-rc.38.0";
  const PAYLOAD = {
  "courses": {
    "philo-argument-thesis-objection": {
      "title": "Construire un argument qui résiste à une objection",
      "hook": "En philosophie, avoir une position ne suffit pas. Le vrai travail commence quand tu peux reconstruire les raisons, formuler l’objection la plus forte et préciser ce que ta thèse peut encore défendre.",
      "practice": "Une ville veut interdire les voitures dans son centre le dimanche. Ne commence pas par être pour ou contre. Écris d’abord la conclusion exacte, puis deux prémisses qui la soutiennent. Cherche ensuite l’objection la plus forte — par exemple l’accès des personnes qui ne peuvent pas venir autrement — et vois si elle détruit la thèse ou oblige seulement à ajouter une exception. La qualité du raisonnement se mesure à sa capacité à survivre à cette mise à l’épreuve.",
      "takeaways": [
        "Une thèse devient un argument quand des raisons soutiennent réellement sa conclusion.",
        "La meilleure objection vise le point le plus fragile de l’argument, pas une caricature.",
        "Répondre à une objection peut conduire à limiter ou préciser sa thèse sans l’abandonner."
      ],
      "quiz": [
        {
          "kind": "reconstruction",
          "q": "Une commune dit : « Nous devons piétonniser la place, car cela réduira les accidents et rendra l’espace plus agréable. » Quelle reconstruction est la plus fidèle ?",
          "a": "La commune défend la piétonnisation en invoquant deux bénéfices attendus : sécurité et qualité d’usage.",
          "choices": [
            "La commune affirme que toute voiture est dangereuse et doit disparaître de la ville.",
            "La commune préfère les piétons aux automobilistes et n’a donc pas besoin d’autre raison.",
            "La commune prouve déjà que la piétonnisation produira forcément ces deux effets."
          ],
          "why": "Une bonne reconstruction distingue la conclusion des raisons sans ajouter une thèse plus forte que celle réellement défendue.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "objection",
          "q": "Quelle objection met le mieux cet argument à l’épreuve ?",
          "a": "Demander comment seront maintenus les accès nécessaires pour les riverains ou personnes à mobilité réduite.",
          "choices": [
            "Dire que la place actuelle est jolie sur certaines photos.",
            "Affirmer que les élus détestent probablement les voitures.",
            "Rappeler qu’une autre ville possède aussi une place piétonne."
          ],
          "why": "L’objection porte sur une conséquence importante que l’argument doit intégrer plutôt que sur les intentions supposées des personnes.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "strawman",
          "q": "Quel énoncé transforme l’argument en homme de paille ?",
          "a": "« Ils veulent interdire toute voiture partout et tout le temps. »",
          "choices": [
            "« Leur proposition concerne seulement la place et le dimanche. »",
            "« Il faut vérifier si la baisse d’accidents est plausible. »",
            "« Une exception d’accès pourrait modifier l’évaluation du projet. »"
          ],
          "why": "L’homme de paille rend la position adverse plus extrême pour la réfuter plus facilement.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "reply",
          "q": "L’objection sur l’accès est solide. Quelle réponse améliore le mieux la thèse ?",
          "a": "Maintenir la piétonnisation tout en prévoyant des dérogations d’accès clairement définies.",
          "choices": [
            "Ignorer l’objection parce que la majorité des gens peuvent marcher.",
            "Abandonner toute règle dès qu’une exception imaginable existe.",
            "Répondre que les critiques sont simplement attachés à leurs habitudes."
          ],
          "why": "Une bonne réponse conserve ce qui résiste dans la thèse et traite précisément le cas problématique.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "premise",
          "q": "Une étude montre que les accidents diminuent après piétonnisation, mais rien sur l’agrément. Quelle conclusion est justifiée ?",
          "a": "L’argument sur la sécurité gagne un appui ; le bénéfice sur l’agrément reste à établir.",
          "choices": [
            "Les deux bénéfices sont désormais démontrés.",
            "La piétonnisation est nécessairement la seule cause de la baisse observée.",
            "L’étude ne peut rien apporter puisque l’argument comportait deux raisons."
          ],
          "why": "Une preuve soutient la prémisse qu’elle concerne ; elle ne valide pas automatiquement les autres prémisses ni toute la chaîne causale.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        }
      ]
    },
    "philo-fact-opinion-value": {
      "title": "Séparer les faits, les valeurs et le passage entre les deux",
      "hook": "Les débats se brouillent quand une mesure, une préférence et un jugement moral sont traités comme le même type d’énoncé. Le bon réflexe est de repérer ce qui décrit, ce qui évalue et quelle prémisse relie les deux.",
      "practice": "Un restaurant augmente ses prix de 10 %. « Ses coûts ont augmenté » est une proposition factuelle à vérifier. « Ce prix est injuste » est une évaluation qui demande un critère d’équité. « Donc il ne devrait pas augmenter ses prix » ajoute une conclusion normative. La discussion devient plus claire dès que tu demandes quelle règle implicite permet de passer du constat au jugement.",
      "takeaways": [
        "Un fait peut être vrai sans contenir à lui seul une conclusion morale.",
        "Une préférence personnelle n’est pas identique à un jugement de valeur général.",
        "Quand un ‘donc’ passe de ce qui est à ce qui doit être, cherche la prémisse normative manquante."
      ],
      "quiz": [
        {
          "kind": "classification",
          "q": "« Le billet coûte 15 € de plus que l’an dernier. » Quel type d’énoncé est-ce d’abord ?",
          "a": "Une description factuelle vérifiable.",
          "choices": [
            "Une condamnation morale du prix.",
            "Une préférence pour l’ancien tarif.",
            "Une règle sur ce que le vendeur devrait faire."
          ],
          "why": "La phrase décrit un écart mesurable sans encore dire s’il est bon, mauvais ou acceptable.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "bridge",
          "q": "« Les loyers ont augmenté, donc la ville doit plafonner les loyers. » Que manque-t-il pour que le passage soit argumenté ?",
          "a": "Une prémisse normative expliquant pourquoi cette hausse justifie un plafonnement.",
          "choices": [
            "Une deuxième mesure de l’augmentation, quelle qu’elle soit.",
            "La preuve que tout le monde préfère les loyers bas.",
            "Un exemple historique de ville ayant déjà plafonné les loyers."
          ],
          "why": "Le constat d’une hausse n’implique pas à lui seul une politique ; il faut rendre explicite le principe qui relie le fait à la norme.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "preference",
          "q": "Laquelle exprime surtout une préférence plutôt qu’un jugement général ?",
          "a": "« Je préfère les films courts. »",
          "choices": [
            "« Ce film dure 92 minutes. »",
            "« Un distributeur ne devrait pas tromper le public sur la durée. »",
            "« Une salle bondée augmente le temps d’attente à la sortie. »"
          ],
          "why": "Une préférence dit ce que le locuteur aime ; elle n’impose pas encore une règle générale aux autres.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "value-disagreement",
          "q": "Deux personnes acceptent exactement les mêmes chiffres sur une taxe mais en tirent des jugements opposés. Quel désaccord faut-il examiner en priorité ?",
          "a": "Les valeurs ou principes qu’elles utilisent pour évaluer ces chiffres.",
          "choices": [
            "La possibilité que les nombres changent de sens grammaticalement.",
            "Le fait que l’une des deux personnes ait nécessairement mal lu le tableau.",
            "Le nombre de personnes qui partagent chaque opinion."
          ],
          "why": "Un accord factuel peut coexister avec un désaccord normatif si les critères d’équité, liberté ou efficacité diffèrent.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "is-ought",
          "q": "« Cette pratique existe depuis longtemps, donc nous devons la conserver. » Quelle prémisse implicite rendrait au moins l’argument explicite ?",
          "a": "« Les pratiques anciennes doivent être conservées sauf raison contraire. »",
          "choices": [
            "« Cette pratique est ancienne. »",
            "« Beaucoup de personnes la connaissent. »",
            "« Certaines traditions ont déjà disparu. »"
          ],
          "why": "La conclusion normative exige une règle normative ; l’exposer permet ensuite de la discuter au lieu de la cacher dans le ‘donc’.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        }
      ]
    },
    "philo-socrates-questioning": {
      "title": "Questionner une idée jusqu’à trouver son vrai critère",
      "hook": "Le geste socratique utile n’est pas de poser des questions au hasard : c’est d’obliger une définition à affronter les cas qui la confirment, les cas limites et les contre-exemples.",
      "practice": "Quelqu’un définit la justice par « traiter tout le monde pareil ». Teste immédiatement un cas : deux élèves ont le même examen, mais l’un a besoin d’un aménagement lié à un handicap. Si traiter pareil produit ici une injustice plausible, la définition doit être précisée : égalité de traitement n’est peut-être pas le seul critère. Le questionnement sert à améliorer le concept, pas à humilier celui qui répond.",
      "takeaways": [
        "Une définition philosophique donne un critère, pas une simple liste d’exemples.",
        "Un contre-exemple pertinent respecte les termes de la définition tout en donnant un verdict intuitivement problématique.",
        "Une aporie peut être productive : elle montre exactement ce que la première définition ne savait pas traiter."
      ],
      "quiz": [
        {
          "kind": "definition",
          "q": "« Être juste, c’est toujours traiter tout le monde exactement pareil. » Quel test est le plus philosophique ?",
          "a": "Chercher un cas où un traitement différent semble nécessaire pour traiter les personnes équitablement.",
          "choices": [
            "Chercher une personne célèbre qui utilise le mot ‘justice’.",
            "Compter combien de fois la définition emploie le mot ‘tout’.",
            "Demander si la majorité trouve la phrase élégante."
          ],
          "why": "Le contre-exemple teste le critère proposé, pas sa popularité ou sa formulation.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "counterexample",
          "q": "Quel cas fragilise le mieux cette définition ?",
          "a": "Accorder un temps supplémentaire à un candidat dont le handicap ralentit matériellement l’écriture.",
          "choices": [
            "Deux candidats sans besoin particulier reçoivent la même durée.",
            "Un professeur utilise le même barème pour deux copies identiques.",
            "Deux élèves choisissent le même sujet d’exposé."
          ],
          "why": "Le cas montre qu’un traitement différent peut viser une égalité plus substantielle, ce qui oblige à préciser le concept de justice.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "revision",
          "q": "Quelle révision répond le mieux à ce contre-exemple ?",
          "a": "« Être juste exige de justifier les différences de traitement par des raisons pertinentes. »",
          "choices": [
            "« Être juste, c’est appliquer la même règle de départ, puis corriger les écarts quand le résultat paraît inégal. »",
            "« Être juste, c’est compenser toutes les différences entre personnes, qu’elles soient pertinentes ou non pour la situation. »",
            "« Être juste, c’est décider au cas par cas sans chercher de critère général, puisque les situations diffèrent toujours. »"
          ],
          "why": "La bonne révision conserve l’exigence d’impartialité tout en intégrant le rôle des différences pertinentes.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "aporia",
          "q": "Après plusieurs contre-exemples, aucune définition ne tient encore. Que montre surtout cette aporie ?",
          "a": "Que nos critères initiaux étaient insuffisants et doivent être retravaillés.",
          "choices": [
            "Que le concept étudié n’existe pas.",
            "Que toute discussion philosophique est impossible.",
            "Que la première définition était secrètement correcte."
          ],
          "why": "L’aporie est un constat de difficulté argumentée, pas une preuve que la recherche est vaine.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "source",
          "q": "Pourquoi distinguer le Socrate des dialogues du ‘Socrate historique’ ?",
          "a": "Parce que nos sources mettent en scène Socrate selon des projets d’auteur différents.",
          "choices": [
            "Parce que Socrate a écrit plusieurs traités contradictoires.",
            "Parce qu’aucune source antique ne mentionne Socrate.",
            "Parce que Platon a vécu plusieurs siècles avant lui."
          ],
          "why": "La prudence historique n’annule pas l’intérêt philosophique du questionnement ; elle évite seulement de confondre personnage textuel et biographie certaine.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        }
      ]
    },
    "philo-stoic-control": {
      "title": "Agir sur ce qui dépend de toi sans confondre effort et résultat",
      "hook": "Le stoïcisme devient utile quand on distingue trois choses souvent mélangées : ce que tu contrôles directement, ce que tu peux influencer et ce qui reste finalement hors de ta maîtrise.",
      "practice": "Tu passes un entretien. Tu contrôles ton heure d’arrivée, ta préparation et la manière dont tu réponds. Tu peux influencer l’impression du recruteur, mais tu ne contrôles ni les autres candidats ni la décision finale. Cette distinction ne recommande pas de moins agir ; elle évite seulement de transformer un résultat incertain en mesure totale de ta valeur.",
      "takeaways": [
        "Préparation et action peuvent dépendre de toi alors que leur résultat final n’en dépend jamais entièrement.",
        "Accepter une limite de contrôle n’est pas renoncer à toute influence.",
        "Le réflexe stoïcien utile est de revenir à l’action disponible après avoir distingué événement, jugement et choix."
      ],
      "quiz": [
        {
          "kind": "control",
          "q": "Tu prépares un entretien. Lequel dépend le plus directement de toi ?",
          "a": "Arriver à l’heure avec des exemples préparés pour répondre aux questions.",
          "choices": [
            "Être le candidat préféré du recruteur.",
            "Éviter qu’un autre candidat ait davantage d’expérience.",
            "Obtenir exactement le salaire souhaité."
          ],
          "why": "Le choix et la préparation sont tes actions ; les décisions des autres et le résultat final ne sont pas entièrement à toi.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "influence",
          "q": "Laquelle formule correctement la différence entre contrôle et influence ?",
          "a": "Je peux améliorer mes chances par ma préparation sans pouvoir garantir la décision finale.",
          "choices": [
            "Si ma préparation est excellente, je contrôle la décision finale.",
            "Puisque je ne contrôle pas la décision, ma préparation n’a aucune utilité.",
            "Tout résultat influençable est, par définition, entièrement contrôlable."
          ],
          "why": "L’influence modifie des probabilités ou des conditions sans transformer le résultat en objet de maîtrise directe.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "passivity",
          "q": "Ton train est annulé. Quelle réaction applique le mieux la distinction stoïcienne ?",
          "a": "Chercher une alternative et prévenir les personnes concernées, puis accepter l’incertitude sur l’heure d’arrivée.",
          "choices": [
            "Ne rien faire puisque l’annulation ne dépend pas de toi.",
            "Exiger de pouvoir garantir l’heure d’arrivée avant de choisir une solution.",
            "Décider que la contrariété extérieure ne mérite jamais aucune action."
          ],
          "why": "Le stoïcisme distingue ce qu’on peut faire maintenant du résultat qu’on ne peut pas posséder.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "judgment",
          "q": "Le recruteur répond : « Nous vous recontactons. » Quelle phrase ajoute le plus clairement un jugement ?",
          "a": "« Cela prouve que j’ai raté et que je ne suis pas à la hauteur. »",
          "choices": [
            "« Il a dit qu’il me recontacterait. »",
            "« Je n’ai pas encore de décision. »",
            "« Je peux envoyer un message de suivi si le délai annoncé passe. »"
          ],
          "why": "Le jugement transforme une information incomplète en verdict global sur soi et l’avenir.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "aim",
          "q": "Quel objectif est le plus compatible avec cette pratique ?",
          "a": "Faire au mieux l’action qui dépend de moi tout en refusant de confondre réussite extérieure et valeur personnelle.",
          "choices": [
            "Éliminer toute émotion avant d’agir.",
            "Éviter les objectifs dont le résultat n’est pas garanti.",
            "Croire que les événements extérieurs n’ont jamais aucune importance pratique."
          ],
          "why": "Le stoïcisme ne nie ni les préférences ni l’action ; il travaille le rapport entre jugement, action et résultat.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        }
      ]
    },
    "philo-descartes-doubt": {
      "title": "Utiliser le doute comme test, pas comme posture permanente",
      "hook": "Le doute cartésien est un stress-test des croyances : il cherche ce qui résiste à une remise en question radicale, puis oblige à reconstruire les certitudes étape par étape.",
      "practice": "Ton téléphone affiche 17 h 42. Tu as de bonnes raisons de lui faire confiance, mais tu peux imaginer un mauvais fuseau ou une synchronisation défaillante. Le doute méthodique ne signifie pas que l’heure est probablement fausse : il distingue simplement ce qui est très fiable de ce qui serait absolument indubitable dans l’expérience de pensée.",
      "takeaways": [
        "Douter méthodiquement revient à tester le fondement d’une croyance, pas à affirmer que tout est faux.",
        "L’argument du rêve fragilise certaines certitudes sensibles sans conclure que nous rêvons effectivement.",
        "Le cogito donne une certitude minimale ; toute conclusion plus large demande des arguments supplémentaires."
      ],
      "quiz": [
        {
          "kind": "method",
          "q": "Quelle attitude ressemble le plus au doute méthodique ?",
          "a": "Suspendre provisoirement une croyance pour voir quelles raisons résistent à l’hypothèse d’erreur.",
          "choices": [
            "Décider que toute croyance ordinaire est probablement fausse.",
            "Refuser définitivement toute information issue des sens.",
            "Choisir la croyance la plus rassurante lorsqu’un doute apparaît."
          ],
          "why": "Le doute est un outil de test volontaire, pas une conclusion sceptique déjà acquise.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "dream",
          "q": "Que permet l’argument du rêve sans aller plus loin ?",
          "a": "Montrer que certaines expériences très convaincantes peuvent ne pas garantir à elles seules que la scène extérieure est telle qu’elle apparaît.",
          "choices": [
            "Démontrer que nous sommes actuellement en train de rêver.",
            "Prouver que les mathématiques changent pendant le sommeil.",
            "Établir que toute perception est fausse même à l’état de veille."
          ],
          "why": "L’argument ouvre une possibilité de tromperie ; il ne transforme pas cette possibilité en description certaine de notre situation.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "cogito",
          "q": "Même sous l’hypothèse d’un trompeur parfait, qu’est-ce qui résiste au moment où je doute ?",
          "a": "Qu’une activité de pensée a lieu et que je ne peux nier mon existence comme sujet pensant à cet instant.",
          "choices": [
            "Que mon corps possède exactement les propriétés que je perçois.",
            "Que tous mes souvenirs correspondent à des événements réels.",
            "Que le monde extérieur existe déjà exactement comme je le conçois."
          ],
          "why": "Le cogito est volontairement minimal : il ne restaure pas d’un coup toutes les croyances mises en doute.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "overreach",
          "q": "Quelle conclusion dépasse ce que le cogito établit immédiatement ?",
          "a": "« Puisque je pense, mes perceptions du monde extérieur sont toutes fiables. »",
          "choices": [
            "« Si je doute, une pensée est en cours. »",
            "« Le doute lui-même ne peut supprimer le fait qu’il y a pensée. »",
            "« D’autres étapes seront nécessaires pour reconstruire la connaissance du monde. »"
          ],
          "why": "La certitude de penser ne suffit pas encore à garantir la fiabilité des perceptions externes.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "degrees",
          "q": "Tu as une horloge synchronisée par réseau et une montre arrêtée hier. Quel usage du doute est le plus rationnel ?",
          "a": "Accorder des degrés de confiance différents tout en distinguant cette confiance pratique d’une certitude absolue.",
          "choices": [
            "Traiter les deux affichages comme également douteux puisqu’aucun n’est absolument certain.",
            "Considérer l’horloge réseau comme métaphysiquement indubitable parce qu’elle est plus fiable.",
            "Refuser de lire l’heure tant qu’une démonstration philosophique complète n’est pas disponible."
          ],
          "why": "La méthode peut hiérarchiser les raisons sans exiger que toute décision pratique atteigne la certitude absolue.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        }
      ]
    },
    "philo-hume-causality": {
      "title": "Passer d’une succession observée à une causalité sans aller trop vite",
      "hook": "Voir A puis B, même souvent, ne revient pas à voir une nécessité qui relie A à B. Hume oblige à distinguer régularité observée, attente mentale et affirmation causale.",
      "practice": "Les jours où tu dors peu, tu bois aussi davantage de café et tu te sens moins concentré. Une simple corrélation entre sommeil et concentration peut être informative, mais elle ne dit pas encore quel facteur produit quoi. La prudence causale consiste à chercher d’autres variables, comparer des situations et calibrer la force de la conclusion.",
      "takeaways": [
        "La répétition d’une succession produit une attente, pas une nécessité logique visible.",
        "Une corrélation peut soutenir une hypothèse causale sans suffire à elle seule à l’établir.",
        "Le problème humeien porte sur la justification du passage du passé au futur, pas sur l’interdiction pratique de prévoir."
      ],
      "quiz": [
        {
          "kind": "correlation",
          "q": "Les jours chauds, ventes de glaces et noyades augmentent ensemble. Quelle conclusion est la plus prudente ?",
          "a": "La corrélation peut s’expliquer en partie par une troisième variable, comme la chaleur qui augmente à la fois baignades et achats de glaces.",
          "choices": [
            "La répétition saisonnière rend plausible un lien causal direct des ventes de glaces vers les noyades, même sans mécanisme identifié.",
            "Comme les deux séries augmentent ensemble, on peut choisir la direction de la cause en regardant simplement laquelle monte en premier.",
            "Une cause commune reste possible, mais une corrélation forte et répétée suffit à ne pas avoir besoin de la tester."
          ],
          "why": "La simultanéité régulière peut venir d’un facteur commun ; elle ne détermine pas à elle seule le sens du lien causal.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "necessity",
          "q": "Quand une boule en frappe une autre et que la seconde bouge, que souligne l’analyse de Hume ?",
          "a": "Nous observons la succession et la régularité, pas une ‘nécessité’ séparée perceptible entre les événements.",
          "choices": [
            "Le mouvement transmis nous permet d’observer directement la nécessité causale elle-même, au-delà de la simple succession des événements.",
            "La nécessité apparaît dès que le même type de choc se répète assez souvent dans des conditions semblables.",
            "La causalité n’est que le nom donné à la succession temporelle ; l’habitude de l’observateur n’ajoute rien à notre attente."
          ],
          "why": "La critique vise l’idée d’une nécessité directement donnée dans l’expérience, pas l’utilité de l’enquête empirique.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "habit",
          "q": "Après cent matins où la machine démarre avec le même bouton, pourquoi attends-tu qu’elle démarre demain ?",
          "a": "L’habitude formée par la régularité passée produit naturellement cette attente.",
          "choices": [
            "Parce que la logique déductive interdit toute autre possibilité future.",
            "Parce que la répétition rend la machine incapable de tomber en panne.",
            "Parce qu’une attente psychologique équivaut à une preuve nécessaire."
          ],
          "why": "Hume décrit comment l’esprit forme l’attente sans confondre ce mécanisme avec une démonstration logique du futur.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "investigation",
          "q": "Une étude observe que les personnes qui marchent davantage déclarent un meilleur moral. Quelle étape renforcerait une interprétation causale ?",
          "a": "Comparer les groupes en tenant compte de variables comme santé initiale, âge ou conditions de vie.",
          "choices": [
            "Répéter uniquement le titre de l’étude avec davantage de participants sur les réseaux sociaux.",
            "Supposer que la direction causale est évidente parce que marcher précède souvent l’humeur mesurée.",
            "Écarter toute hypothèse causale puisque l’étude est observationnelle."
          ],
          "why": "Contrôler des facteurs concurrents ne garantit pas une cause, mais améliore nettement l’enquête par rapport à une corrélation brute.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "induction",
          "q": "« Nos prévisions fondées sur le passé ont souvent marché ; donc le passé continuera à guider correctement le futur. » Quel problème apparaît ?",
          "a": "La justification utilise déjà une projection du passé vers le futur pour justifier ce même type de projection.",
          "choices": [
            "La phrase est invalide uniquement parce qu’elle parle du futur.",
            "La phrase prouve que toute prévision scientifique est inutile.",
            "La phrase devient déductive dès qu’elle contient beaucoup d’observations."
          ],
          "why": "Le raisonnement paraît circulaire du point de vue de la justification de l’induction elle-même.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        }
      ]
    },
    "philo-ethics-principles-consequences": {
      "title": "Trancher un dilemme sans cacher le critère qui décide",
      "hook": "Un dilemme moral intéressant ne se résout pas en récitant un mot comme ‘devoir’ ou ‘conséquences’. Il faut exposer le critère, regarder ce qu’il implique dans le cas et tester ce qui ferait changer le jugement.",
      "practice": "Tu as promis de garder une information confidentielle, mais cette information révèle un danger sérieux pour une autre personne. Une approche centrée sur le devoir demande quelles obligations entrent en conflit ; une approche conséquentialiste compare les dommages probables ; une analyse des vertus demande ce qu’exigent honnêteté, loyauté ou courage. Le travail consiste à rendre visibles ces raisons plutôt qu’à choisir une étiquette.",
      "takeaways": [
        "Les mêmes faits peuvent être évalués avec des critères moraux différents.",
        "L’incertitude sur les conséquences oblige à raisonner sur probabilités et gravité, pas à faire comme si le futur était connu.",
        "Une exception peut révéler que la règle était trop simple ou qu’un autre devoir entre réellement en conflit."
      ],
      "quiz": [
        {
          "kind": "dilemma",
          "q": "Tu as promis le secret à un ami, mais l’information révèle un risque grave et immédiat pour quelqu’un. Quelle formulation décrit le mieux le dilemme ?",
          "a": "Un devoir de confidentialité entre en conflit avec une raison forte de prévenir un dommage grave.",
          "choices": [
            "La promesse reste prioritaire tant que le danger n’est pas établi avec une certitude presque complète.",
            "La gravité possible du danger suffit à suspendre la confidentialité avant même d’examiner sa probabilité ou les autres options.",
            "Le conflit est surtout un calcul d’efficacité entre deux options ; parler de devoirs concurrents ajoute une complication inutile."
          ],
          "why": "Le cas est difficile précisément parce que deux raisons morales sérieuses tirent dans des directions opposées.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "consequence",
          "q": "Quelle question est typiquement conséquentialiste dans ce cas ?",
          "a": "Quels dommages probables résultent de garder le secret ou de le révéler, et pour qui ?",
          "choices": [
            "Ai-je formulé explicitement une promesse qui crée un devoir ?",
            "Quel trait de caractère est manifesté par mon choix ?",
            "Cette règle pourrait-elle être respectée même si le résultat m’est défavorable ?"
          ],
          "why": "Le conséquentialisme met au premier plan les effets comparés des options, même si d’autres approches peuvent aussi considérer ces effets.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "deontology",
          "q": "Quelle question déontologique est la plus pertinente ?",
          "a": "Quels devoirs et droits sont engagés, et l’un d’eux limite-t-il ce que je peux faire même pour produire un bon résultat ?",
          "choices": [
            "Quelle option maximise simplement la somme des effets agréables ?",
            "Quelle réaction me donnera la meilleure réputation auprès des autres ?",
            "Quelle option correspond le mieux à ce que la majorité ferait spontanément ?"
          ],
          "why": "Une approche déontologique examine les contraintes morales et les obligations, pas seulement le bilan final.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "uncertainty",
          "q": "Le danger n’est plus certain mais seulement possible. Qu’est-ce que cela change surtout ?",
          "a": "Il faut intégrer la probabilité et la gravité du dommage au lieu de traiter la conséquence comme garantie.",
          "choices": [
            "Toute considération des conséquences devient impossible.",
            "La promesse devient automatiquement absolue dès qu’une probabilité apparaît.",
            "Le raisonnement moral peut ignorer l’incertitude parce qu’elle appartient seulement aux sciences."
          ],
          "why": "Les décisions morales réelles sont souvent prises sous incertitude ; la comparaison doit alors être calibrée plutôt que supprimée.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "revision",
          "q": "Quelle information pourrait légitimement te faire réviser ton jugement ?",
          "a": "Apprendre que la menace est une plaisanterie vérifiée et qu’aucune personne n’est réellement en danger.",
          "choices": [
            "Découvrir que ton ami n’aime pas ton hésitation.",
            "Voir qu’un commentaire en ligne approuve ton premier choix.",
            "Changer le vocabulaire utilisé pour décrire exactement les mêmes faits."
          ],
          "why": "Une bonne raison de réviser modifie une prémisse moralement pertinente du cas plutôt que la pression sociale autour du choix.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        }
      ]
    },
    "philo-social-contract-liberty": {
      "title": "Quand une règle commune limite une liberté pour en protéger d’autres",
      "hook": "La philosophie politique devient concrète dès qu’une règle commune contraint quelqu’un. La question n’est pas seulement ‘suis-je limité ?’, mais qui décide, au nom de quoi, pour protéger quoi et avec quelles limites au pouvoir.",
      "practice": "Une résidence interdit le bruit après 23 h. La règle retire une possibilité d’action à ceux qui veulent faire la fête, mais protège le sommeil des autres. Pour juger sa légitimité, il faut regarder la généralité de la règle, la procédure, les exceptions, les recours et l’équilibre entre libertés concurrentes.",
      "takeaways": [
        "Une contrainte peut réduire une liberté immédiate tout en sécurisant d’autres libertés.",
        "Le contrat social est un outil de justification de l’autorité, pas nécessairement le récit d’un contrat historique signé.",
        "Pouvoir imposer une règle et avoir le droit de l’imposer sont deux questions différentes."
      ],
      "quiz": [
        {
          "kind": "legitimacy",
          "q": "Une résidence impose silence après 23 h. Quel élément renforce le plus la légitimité de cette règle ?",
          "a": "Elle s’applique à tous selon une procédure connue, protège un intérêt commun identifiable et prévoit des exceptions justifiables.",
          "choices": [
            "Le gestionnaire peut physiquement sanctionner ceux qui désobéissent.",
            "La règle n’est jamais discutée parce qu’elle existe depuis longtemps.",
            "Les personnes les plus bruyantes n’ont pas participé au vote."
          ],
          "why": "La force d’exécution ne suffit pas à établir la légitimité ; généralité, justification et procédure comptent.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "liberty",
          "q": "Pourquoi cette règle n’oppose-t-elle pas simplement ‘liberté’ et ‘absence de liberté’ ?",
          "a": "Parce qu’elle limite la liberté de faire du bruit tout en protégeant la liberté des autres de dormir et d’utiliser leur logement.",
          "choices": [
            "Parce qu’une règle collective ne limite jamais aucune liberté.",
            "Parce que la liberté ne concerne que les actes politiques.",
            "Parce que toute majorité transforme automatiquement une contrainte en liberté."
          ],
          "why": "Les libertés peuvent entrer en conflit ; une institution doit alors justifier comment elle les organise.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "contract",
          "q": "Dans une théorie du contrat social, qu’apporte l’idée de consentement hypothétique ou de justification commune ?",
          "a": "Elle demande sous quelles conditions des personnes libres pourraient reconnaître une autorité comme légitime.",
          "choices": [
            "Elle prouve qu’un document historique a réellement été signé par tous les citoyens.",
            "Elle rend toute contestation ultérieure illégitime.",
            "Elle signifie que chaque loi doit être approuvée individuellement à l’unanimité."
          ],
          "why": "Le contrat est souvent un dispositif de justification, pas une archive historique.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "power",
          "q": "Un groupe armé impose une règle et tout le monde obéit. Qu’est-ce qui reste à montrer ?",
          "a": "Pourquoi ce pouvoir aurait une autorité légitime plutôt que la seule capacité de contraindre.",
          "choices": [
            "Que les citoyens ont effectivement peur du groupe.",
            "Que la règle peut être exécutée rapidement.",
            "Que la règle est formulée dans un langage juridique."
          ],
          "why": "L’efficacité coercitive répond à ‘peut-il imposer ?’, pas à ‘a-t-il le droit d’imposer ?’.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "rule-change",
          "q": "Une exception permanente permet au dirigeant d’ignorer la règle qu’il impose aux autres. Quel problème apparaît ?",
          "a": "La règle cesse d’être réellement générale et ressemble davantage à l’ordre particulier d’un supérieur.",
          "choices": [
            "Une règle devient plus légitime quand elle comporte une exception personnelle pour celui qui la crée.",
            "L’égalité devant la règle n’a aucun lien possible avec la légitimité politique.",
            "Le problème porte uniquement sur la longueur du texte réglementaire."
          ],
          "why": "Une règle commune est difficile à défendre comme expression collective si elle crée d’emblée un statut arbitrairement supérieur pour son auteur.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        }
      ]
    },
    "philo-argument-validity": {
      "title": "Tester la forme d’un raisonnement indépendamment de ce qu’on croit déjà",
      "hook": "Une conclusion vraie peut être soutenue par un mauvais raisonnement, et un raisonnement valide peut partir de prémisses fausses. La philosophie demande de savoir critiquer exactement la bonne couche.",
      "practice": "« Tous les poissons sont des mammifères ; tous les mammifères respirent de l’air ; donc tous les poissons respirent de l’air. » Le contenu est faux, mais la conclusion découle bien des prémisses si on les suppose vraies. À l’inverse, « Paris est en France ; donc 2 + 2 = 4 » relie deux vérités sans relation logique pertinente.",
      "takeaways": [
        "La validité porte sur ce qui suivrait si les prémisses étaient vraies.",
        "Une conclusion vraie ne répare pas une inférence invalide.",
        "Un argument solide exige à la fois une bonne structure et des prémisses suffisamment justifiées."
      ],
      "quiz": [
        {
          "kind": "validity",
          "q": "« Tous les A sont B. Tous les B sont C. Donc tous les A sont C. » Que peux-tu dire sans savoir ce que A, B et C désignent ?",
          "a": "La forme est valide : si les deux prémisses sont vraies, la conclusion doit l’être.",
          "choices": [
            "La conclusion est forcément vraie dans le monde réel.",
            "La forme est invalide tant que A, B et C ne sont pas définis.",
            "Les prémisses sont automatiquement vraies parce que la forme est valide."
          ],
          "why": "La validité est une relation entre prémisses et conclusion, indépendante de la vérité factuelle des termes particuliers.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "true-conclusion",
          "q": "« Rome est en Italie ; donc 2 + 2 = 4. » Comment évaluer l’argument ?",
          "a": "La conclusion est vraie mais ne découle pas de la prémisse : l’argument est invalide.",
          "choices": [
            "L’argument est valide parce que les deux phrases sont vraies.",
            "L’argument est solide parce que la conclusion est certaine.",
            "L’argument devient valide si l’on ajoute davantage de faits vrais sans rapport."
          ],
          "why": "Des propositions vraies peuvent être juxtaposées sans former une inférence valide : il faut encore qu’une relation logique relie la prémisse à la conclusion.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "affirming-consequent",
          "q": "« S’il pleut, la rue est mouillée. La rue est mouillée. Donc il pleut. » Quel problème ?",
          "a": "La conclusion ne suit pas nécessairement : une autre cause peut avoir mouillé la rue.",
          "choices": [
            "La première prémisse est grammaticalement conditionnelle et donc toujours fausse.",
            "La rue mouillée prouve logiquement qu’il a plu si elle est observée après midi.",
            "Le raisonnement est valide dès que pluie et rue mouillée sont souvent corrélées."
          ],
          "why": "Affirmer le conséquent oublie d’autres chemins possibles vers le même effet : une rue mouillée peut avoir plusieurs causes compatibles avec la prémisse conditionnelle.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "critique",
          "q": "Tu acceptes les prémisses mais pas l’inférence. Quelle critique est la plus précise ?",
          "a": "« Même en accordant tes prémisses, ta conclusion peut encore être fausse. »",
          "choices": [
            "« Je n’aime pas ta conclusion. »",
            "« Une de tes phrases est trop longue. »",
            "« Beaucoup de gens pensent le contraire. »"
          ],
          "why": "La critique vise exactement la validité : ce qui suit ou non des prémisses.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "soundness",
          "q": "Un argument est valide et ses prémisses sont bien établies. Quelle propriété supplémentaire a-t-il ?",
          "a": "Il est solide au sens logique usuel.",
          "choices": [
            "Il devrait convaincre tout interlocuteur rationnel informé ; si quelqu’un résiste encore, le problème vient surtout de sa psychologie.",
            "Il est cohérent et bien construit, mais le mot « solide » devrait être réservé aux arguments dont la conclusion a été vérifiée indépendamment.",
            "Il est valide et bien fondé, mais il faudrait encore établir séparément la vérité de la conclusion avant de parler de solidité."
          ],
          "why": "La solidité combine validité et prémisses vraies ou suffisamment établies ; elle ne garantit pas l’accord psychologique de tous.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        }
      ]
    },
    "philo-distinction-necessary-sufficient": {
      "title": "Nécessaire ou suffisant : tester les deux directions séparément",
      "hook": "Beaucoup de raisonnements ratent parce qu’ils transforment ‘il faut X’ en ‘X suffit’. La solution n’est pas d’apprendre deux définitions par cœur, mais de chercher le bon contre-exemple dans chaque direction.",
      "practice": "Avoir un billet valide peut être nécessaire pour entrer dans une salle de concert, sans être suffisant si la salle est évacuée ou si le billet correspond à une autre date. À l’inverse, être un carré suffit pour être un rectangle, mais n’est pas nécessaire : il existe des rectangles non carrés.",
      "takeaways": [
        "Pour tester la nécessité de X pour Y, cherche Y sans X.",
        "Pour tester la suffisance de X pour Y, cherche X sans Y.",
        "Dans les situations réelles, un facteur peut contribuer à Y sans être strictement nécessaire ni suffisant."
      ],
      "quiz": [
        {
          "kind": "necessary",
          "q": "Une licence est exigée pour exercer légalement une profession réglementée, mais il faut aussi remplir d’autres conditions. La licence est alors…",
          "a": "Nécessaire mais pas suffisante.",
          "choices": [
            "Suffisante mais pas nécessaire.",
            "À la fois suffisante et inutile.",
            "Ni nécessaire ni liée à l’exercice légal."
          ],
          "why": "Sans la licence la condition légale échoue, mais sa présence seule ne garantit pas que toutes les autres exigences soient remplies.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "sufficient",
          "q": "Dans la géométrie usuelle, être un carré garantit d’être un rectangle. Que peut-on conclure ?",
          "a": "Être carré est une condition suffisante pour être rectangle, mais pas nécessaire.",
          "choices": [
            "Être rectangle est suffisant pour être carré.",
            "Aucun rectangle ne peut être carré.",
            "Être carré et être rectangle sont exactement la même propriété."
          ],
          "why": "Tous les carrés sont rectangles, mais certains rectangles ne sont pas carrés.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "test-necessary",
          "q": "Quel cas réfuterait l’affirmation « X est nécessaire à Y » ?",
          "a": "Un cas réel ou possible où Y est présent alors que X ne l’est pas.",
          "choices": [
            "Un cas où X est présent et Y aussi.",
            "Un cas où X est présent sans Y.",
            "Un cas où ni X ni Y n’est présent."
          ],
          "why": "La nécessité signifie ‘pas de Y sans X’ ; un seul Y sans X suffit donc à la réfuter.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "test-sufficient",
          "q": "Quel cas réfuterait « X suffit pour Y » ?",
          "a": "Un cas où X est présent mais Y ne se produit pas.",
          "choices": [
            "Un cas où Y apparaît sans X.",
            "Un cas où X et Y apparaissent ensemble.",
            "Un cas où X est absent et Y aussi."
          ],
          "why": "La suffisance exige que chaque fois que X est donné, Y suive dans le cadre défini.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "causal",
          "q": "Le manque de sommeil augmente souvent le risque d’erreur mais certaines personnes fatiguées ne se trompent pas et des personnes reposées peuvent se tromper. Quelle formulation est la plus précise ?",
          "a": "Le manque de sommeil peut être un facteur contributif sans être strictement nécessaire ni suffisant pour chaque erreur.",
          "choices": [
            "Le manque de sommeil devient une condition nécessaire dès qu’on se limite aux erreurs liées à l’attention, même si d’autres erreurs ont d’autres causes.",
            "Le manque de sommeil peut être considéré comme suffisant au niveau statistique, même si certains individus fatigués ne se trompent pas.",
            "Puisqu’il existe des erreurs sans fatigue et de la fatigue sans erreur, il vaut mieux parler de simple corrélation plutôt que de contribution causale."
          ],
          "why": "Les relations probabilistes demandent parfois un vocabulaire plus fin que la seule opposition nécessaire/suffisant.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        }
      ]
    },
    "philo-socrates-definition": {
      "title": "Fabriquer une définition qui survit aux cas limites",
      "hook": "Une définition utile doit être assez large pour inclure les bons cas et assez précise pour exclure les mauvais. Les contre-exemples servent à régler ces deux frontières.",
      "practice": "« Le courage, c’est ne jamais reculer. » Imagine un pompier qui recule parce qu’un plafond va s’effondrer, puis revient par un autre accès pour sauver une victime. Si tu juges encore son comportement courageux, la définition est trop étroite. Tu peux la réviser autour de l’idée d’affronter un risque pour une raison jugée valable, sans exiger l’absence de tout retrait tactique.",
      "takeaways": [
        "Un exemple illustre un concept ; une définition prétend fournir son critère.",
        "Un cas inclus à tort montre souvent que la définition est trop large ; un bon cas exclu montre qu’elle est trop étroite.",
        "Réviser une définition consiste à modifier son critère, pas à inventer une exception ad hoc pour chaque contre-exemple."
      ],
      "quiz": [
        {
          "kind": "too-narrow",
          "q": "« Être courageux, c’est ne jamais reculer. » Que montre le pompier qui recule devant un effondrement puis revient par un autre accès ?",
          "a": "La définition paraît trop étroite : elle exclut un comportement qui peut rester courageux.",
          "choices": [
            "Le pompier prouve que tout recul est courageux.",
            "Le cas montre seulement que les bâtiments sont dangereux.",
            "La définition devient vraie si l’on refuse de juger les intentions."
          ],
          "why": "Le cas conserve une conduite courageuse plausible tout en violant le critère ‘ne jamais reculer’.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "too-broad",
          "q": "« Être courageux, c’est prendre un risque. » Quel cas montre que la définition est trop large ?",
          "a": "Quelqu’un conduit très vite pour impressionner ses amis sans nécessité particulière.",
          "choices": [
            "Un sauveteur entre dans l’eau pour aider une personne en danger.",
            "Une personne défend publiquement quelqu’un au risque d’être critiquée.",
            "Un médecin accepte une mission difficile pour soigner des patients."
          ],
          "why": "Prendre un risque peut être imprudent ou vain ; le risque seul ne capture pas ce qui rend une action courageuse.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "revision",
          "q": "Quelle révision améliore le mieux la définition ?",
          "a": "« Le courage implique d’affronter un risque ou une difficulté pour une raison que l’on peut défendre, sans exiger l’absence de toute prudence. »",
          "choices": [
            "« Le courage, c’est tout ce que nous appelons courageux. »",
            "« Le courage, c’est toujours avancer physiquement. »",
            "« Le courage est impossible à définir dès qu’un contre-exemple existe. »"
          ],
          "why": "La révision répond aux deux problèmes : elle évite d’assimiler tout risque au courage et autorise la prudence tactique.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "example",
          "q": "Pourquoi « un soldat qui tient sa position » ne suffit-il pas à définir le courage ?",
          "a": "Parce que le cas ne dit pas encore quel trait commun permet de classer aussi d’autres comportements comme courageux ou non.",
          "choices": [
            "Parce qu’aucun soldat ne peut être courageux.",
            "Parce qu’une définition doit toujours comporter exactement trois exemples.",
            "Parce qu’un exemple concret est incompatible avec tout concept abstrait."
          ],
          "why": "L’exemple peut aider à chercher le critère, mais il ne remplace pas ce critère.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "ad-hoc",
          "q": "Après chaque contre-exemple, quelqu’un ajoute une exception spécialement faite pour sauver sa définition. Quel problème apparaît ?",
          "a": "La définition devient ad hoc et n’explique plus par un critère général pourquoi les cas comptent.",
          "choices": [
            "La définition devient plus précise à chaque exception ; tant qu’elle classe correctement les nouveaux cas, ce raffinement suffit.",
            "Le problème vient seulement du nombre d’exceptions ; quelques clauses indépendantes peuvent encore constituer une bonne définition.",
            "Une définition peut rester explicative même si chaque nouveau cas difficile exige une exception spécifique, à condition de toutes les énumérer."
          ],
          "why": "Une bonne révision cherche une règle plus éclairante, pas une liste illimitée de rustines.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        }
      ]
    },
    "philo-stoic-impressions": {
      "title": "Entre l’impression qui surgit et le jugement auquel tu consens",
      "hook": "Le stoïcisme ne prétend pas que la première réaction est choisie. Il s’intéresse au moment suivant : est-ce que tu transformes cette impression en vérité globale, ou est-ce que tu la réexamines avant d’agir ?",
      "practice": "Tu reçois « On doit parler demain ». L’impression d’inquiétude peut apparaître immédiatement. Mais « je vais être licencié » est déjà une interprétation supplémentaire. Distinguer message, interprétation et action possible ne supprime pas l’émotion ; cela évite de traiter la première histoire produite par l’esprit comme un fait.",
      "takeaways": [
        "Une impression peut surgir avant toute décision consciente.",
        "L’assentiment consiste à adopter l’interprétation comme vraie ou directrice.",
        "Séparer fait, interprétation et action disponible permet de travailler le jugement sans nier l’événement."
      ],
      "quiz": [
        {
          "kind": "impression",
          "q": "Tu lis « On doit parler demain » et tu ressens immédiatement une tension. Quelle distinction est la plus fidèle ?",
          "a": "La tension peut surgir comme première impression ; « je vais être licencié » ajoute déjà un jugement sur ce que le message signifie.",
          "choices": [
            "Les deux sont des faits explicitement écrits dans le message.",
            "La tension prouve que l’interprétation est correcte.",
            "Le stoïcisme exige de ne ressentir aucune réaction physique à ce message."
          ],
          "why": "Le contenu observable du message est plus limité que le scénario que l’esprit peut immédiatement construire autour de lui.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "assent",
          "q": "Que serait donner son assentiment à l’impression ?",
          "a": "Traiter « je vais être licencié » comme vrai et organiser sa réaction à partir de ce verdict.",
          "choices": [
            "Constater seulement que le message contient six mots.",
            "Sentir une accélération du cœur avant d’avoir formulé une pensée.",
            "Demander calmement quel sera l’objet de la discussion."
          ],
          "why": "L’assentiment porte sur l’acceptation du jugement, pas sur l’apparition involontaire d’une première réaction.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "reframe",
          "q": "Quelle reformulation réduit le moins l’événement tout en séparant fait et interprétation ?",
          "a": "« Je sais qu’on veut me parler demain ; je ne sais pas encore pourquoi. »",
          "choices": [
            "« Tout va forcément très bien. »",
            "« Ce message n’a aucune importance. »",
            "« Je suis certain que le pire scénario est le plus réaliste. »"
          ],
          "why": "La reformulation ne remplace pas une catastrophe par un optimisme forcé ; elle revient à ce qui est effectivement établi.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "action",
          "q": "Quelle action suit le mieux cette distinction ?",
          "a": "Préparer les informations utiles et attendre la conversation avant de conclure sur son contenu.",
          "choices": [
            "Envoyer immédiatement sa démission pour reprendre le contrôle.",
            "Ignorer le rendez-vous puisque la réaction émotionnelle est extérieure.",
            "Chercher dix interprétations négatives supplémentaires pour être prêt à tout."
          ],
          "why": "Le travail sur le jugement sert à mieux agir avec les informations disponibles, pas à éviter toute action.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "emotion",
          "q": "Pourquoi dire « le stoïcisme consiste à ne rien ressentir » est-il trompeur ?",
          "a": "Parce qu’il distingue les premières impressions et le travail d’assentiment plutôt que de supposer toute réaction initiale volontaire.",
          "choices": [
            "Parce que les stoïciens cherchent surtout à remplacer les émotions négatives par des émotions positives avant de décider comment agir.",
            "Parce qu’ils séparent totalement émotion et jugement : seule la conduite extérieure aurait une importance philosophique.",
            "Parce que leur objectif principal serait de réduire l’intensité des émotions, le jugement n’intervenant qu’ensuite dans le choix de l’action."
          ],
          "why": "La pratique porte sur l’évaluation et la conduite, pas sur une commande magique qui empêcherait toute réaction de surgir.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        }
      ]
    },
    "philo-descartes-cogito": {
      "title": "Comprendre exactement ce que le cogito établit — et ce qu’il n’établit pas",
      "hook": "Le cogito est puissant parce qu’il est étroit. Au moment même où je doute, l’acte de douter rend impossible la négation totale de mon existence comme être pensant ; le reste doit encore être reconstruit.",
      "practice": "Imagine qu’un trompeur fausse chacune de tes perceptions. Même cette hypothèse suppose qu’il y a quelque chose qui est trompé, doute ou pense. Mais elle ne te donne encore ni la forme de ton corps, ni la fiabilité de ta mémoire, ni la structure du monde extérieur. Le bon exercice consiste donc autant à limiter la conclusion qu’à la comprendre.",
      "takeaways": [
        "Le doute performe lui-même l’activité qui rend le cogito certain au moment où il a lieu.",
        "Le cogito établit d’abord l’existence comme sujet pensant, pas l’existence détaillée du monde perçu.",
        "Une conclusion philosophique forte peut être vraie tout en dépassant ce que l’argument présent a réellement démontré."
      ],
      "quiz": [
        {
          "kind": "performative",
          "q": "Pourquoi l’hypothèse « je n’existe pas pendant que je doute » s’effondre-t-elle dans l’exercice cartésien ?",
          "a": "Parce que l’acte même de douter manifeste une activité de pensée au moment où la négation est formulée.",
          "choices": [
            "Parce que toute phrase à la première personne est vraie.",
            "Parce que le corps est déjà garanti par les sensations.",
            "Parce qu’un trompeur ne pourrait jamais produire de pensée fausse."
          ],
          "why": "Le point est réflexif : tenter de nier toute existence pensante exige déjà l’activité dont on nie l’existence.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "scope",
          "q": "Quelle conclusion est immédiatement la mieux soutenue ?",
          "a": "« J’existe au moins comme être pensant au moment où je pense. »",
          "choices": [
            "« Mon corps possède certainement toutes les propriétés que je lui attribue. »",
            "« Le monde extérieur existe exactement comme il apparaît. »",
            "« Tous mes souvenirs sont fiables parce que je peux y penser. »"
          ],
          "why": "La force du cogito tient à sa portée minimale et difficile à nier, non à une restauration instantanée de tout le savoir.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "overreach",
          "q": "Quel raisonnement commet un saut injustifié ?",
          "a": "« Je suis certain que je pense ; donc je suis certain que la table devant moi existe telle que je la perçois. »",
          "choices": [
            "« Je suis certain qu’une pensée a lieu pendant que je doute. »",
            "« Il faut un argument supplémentaire pour rétablir la confiance dans certaines perceptions. »",
            "« Le cogito ne suffit pas seul à garantir mes souvenirs. »"
          ],
          "why": "La certitude de l’acte de penser et la fiabilité d’une perception extérieure sont deux étapes distinctes.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "evil-demon",
          "q": "À quoi sert l’hypothèse du trompeur dans cette étape ?",
          "a": "À pousser le scénario d’erreur assez loin pour tester s’il reste une certitude indépendante du contenu de mes perceptions.",
          "choices": [
            "À démontrer l’existence réelle d’un démon.",
            "À montrer que toute erreur vient nécessairement d’un agent malveillant.",
            "À prouver que les perceptions sont sans intérêt pratique."
          ],
          "why": "Le trompeur est un dispositif de pensée radicalisant le doute, pas une découverte empirique.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "next-step",
          "q": "Après le cogito, que faudrait-il pour conclure davantage sur le monde ?",
          "a": "De nouveaux arguments qui justifient les étapes supplémentaires au lieu de les inclure tacitement dans le cogito.",
          "choices": [
            "Répéter ‘je pense’ assez souvent pour rendre toutes les perceptions certaines.",
            "Supposer que toute croyance antérieure redevient automatiquement vraie.",
            "Changer de vocabulaire sans fournir de nouvelle raison."
          ],
          "why": "Une conclusion supplémentaire doit recevoir son propre soutien argumentatif : la certitude du cogito ne transporte pas automatiquement avec elle la fiabilité du monde extérieur.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        }
      ]
    },
    "philo-hume-induction": {
      "title": "Pourquoi le passé guide nos attentes sans démontrer le futur",
      "hook": "Nous projetons sans cesse des régularités : le soleil se lèvera, le feu chauffera, un médicament similaire agira probablement pareil. Hume demande ce qui justifie logiquement cette projection sans déjà supposer que le futur ressemble au passé.",
      "practice": "Tu as utilisé cinquante fois une clé et elle a toujours ouvert la porte. Attendre qu’elle fonctionne demain est parfaitement raisonnable en pratique. Mais la phrase « elle a toujours fonctionné, donc elle fonctionnera nécessairement demain » ajoute une nécessité que les observations passées ne contiennent pas. Le problème philosophique porte sur cette justification, pas sur l’abandon de toute anticipation.",
      "takeaways": [
        "L’induction projette des régularités observées au-delà des cas déjà vus.",
        "La réussite passée de l’induction ne justifie pas non circulairement le principe d’induction si elle est elle-même utilisée comme argument inductif.",
        "Le problème est épistémologique : comment justifier nos attentes, pas comment vivre sans aucune attente."
      ],
      "quiz": [
        {
          "kind": "projection",
          "q": "Une clé a ouvert la porte chaque jour pendant un an. Quelle affirmation va au-delà des observations ?",
          "a": "« Elle ouvrira nécessairement la porte demain. »",
          "choices": [
            "« Elle a ouvert la porte à chacune des observations rapportées. »",
            "« Son historique donne une raison pratique de s’attendre à ce qu’elle fonctionne encore. »",
            "« Une panne future reste logiquement possible. »"
          ],
          "why": "Le mot ‘nécessairement’ transforme une régularité passée en garantie du futur, alors que les observations rapportées n’établissent qu’un historique de réussite.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "circularity",
          "q": "Pourquoi « l’induction a été fiable jusqu’ici, donc elle sera fiable demain » pose-t-il problème comme justification ultime ?",
          "a": "Parce qu’il utilise déjà un raisonnement inductif pour défendre la fiabilité future de l’induction.",
          "choices": [
            "Parce qu’un raisonnement ne peut jamais parler de sa propre méthode.",
            "Parce que toute observation passée est forcément fausse.",
            "Parce que l’induction et la déduction sont exactement le même type d’inférence."
          ],
          "why": "L’argument présuppose le type de projection dont il cherche justement à établir la légitimité.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "deduction",
          "q": "Quelle différence est correcte ?",
          "a": "Une déduction valide préserve nécessairement la vérité des prémisses vers la conclusion ; une induction peut être forte sans garantir sa conclusion.",
          "choices": [
            "Une induction garantit toujours le futur si elle contient beaucoup de cas.",
            "Une déduction est seulement une induction avec moins d’observations.",
            "Une déduction dépend toujours d’une habitude psychologique produite par répétition."
          ],
          "why": "La force logique d’une déduction valide et la force probabiliste d’une induction ne sont pas du même ordre.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "practical",
          "q": "Hume conclut-il qu’il faut cesser de prévoir ?",
          "a": "Non : il explique notamment que l’habitude rend ces attentes naturelles, tout en distinguant cette pratique d’une démonstration logique du futur.",
          "choices": [
            "Oui : toute anticipation devient irrationnelle et doit être supprimée.",
            "Oui : seules les mathématiques permettent encore une action pratique.",
            "Non : parce que le futur est en réalité déductivement garanti par le passé."
          ],
          "why": "Le problème de justification n’est pas une prescription de paralysie quotidienne : Hume distingue la pratique naturelle de l’anticipation et sa justification logique ultime.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "science",
          "q": "Une théorie prédit correctement cent expériences. Quelle attitude respecte le problème de l’induction ?",
          "a": "Considérer ce succès comme une forte raison empirique de confiance sans le transformer en preuve logique qu’aucune expérience future ne pourra diverger.",
          "choices": [
            "Considérer qu’après un grand nombre de confirmations, la théorie franchit un seuil où sa réussite future devient logiquement certaine.",
            "Refuser d’augmenter sa confiance tant qu’on ne possède pas une déduction indépendante de toute expérience passée.",
            "Utiliser les cent succès pour conclure que le même taux de réussite se maintiendra nécessairement dans toutes les expériences comparables."
          ],
          "why": "Le scepticisme humeien sur la nécessité logique n’empêche pas une confiance empirique graduée.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        }
      ]
    },
    "philo-ethics-frameworks": {
      "title": "Faire varier le cadre moral pour voir ce qui change vraiment",
      "hook": "Conséquences, devoirs et vertus ne sont pas trois réponses pré-écrites : ce sont trois focales qui posent des questions différentes au même cas. Les comparer permet de voir d’où vient réellement le désaccord.",
      "practice": "Un collègue a commis une petite erreur et te demande de la cacher. Une approche par les conséquences regarde les effets du mensonge et de l’aveu ; une approche déontologique demande quels devoirs d’honnêteté ou de responsabilité sont engagés ; une approche des vertus s’interroge sur le caractère d’une conduite loyale mais aussi courageuse et juste. Les cadres peuvent converger ou entrer en tension.",
      "takeaways": [
        "Changer de cadre moral change la question principale posée au cas, pas nécessairement la réponse finale.",
        "Deux cadres différents peuvent parfois recommander la même action pour des raisons différentes.",
        "Comparer les cadres évite de changer silencieusement de critère uniquement quand le résultat nous déplaît."
      ],
      "quiz": [
        {
          "kind": "consequence",
          "q": "Ton collègue te demande de cacher une erreur bénigne. Quelle question appartient d’abord à une analyse des conséquences ?",
          "a": "Quels effets probables auront le mensonge ou l’aveu pour les personnes concernées et pour la confiance dans l’équipe ?",
          "choices": [
            "Quel devoir d’honnêteté s’applique indépendamment du bénéfice attendu ?",
            "Quel type de collègue veux-je devenir en agissant ainsi ?",
            "La règle ‘ne mens jamais’ pourrait-elle me contraindre même si mentir aide ici ?"
          ],
          "why": "La focale porte sur les résultats comparés des options et oblige à regarder qui bénéficie, qui supporte les coûts et avec quelle probabilité.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "duty",
          "q": "Quelle question est la plus déontologique ?",
          "a": "Ai-je un devoir de vérité ou de responsabilité que je ne peux pas simplement écarter parce qu’un mensonge serait commode ?",
          "choices": [
            "Quel choix produit le plus grand bénéfice total ?",
            "Quelle émotion me fera paraître le plus sympathique ?",
            "Quel trait de caractère mon équipe admire le plus souvent ?"
          ],
          "why": "La déontologie examine les obligations et limites qui structurent l’action, notamment ce qu’un devoir interdit de sacrifier même pour un résultat avantageux.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "virtue",
          "q": "Quelle question relève le plus clairement d’une éthique des vertus ?",
          "a": "Que ferait ici une personne honnête, loyale et courageuse, et comment arbitrer entre ces traits s’ils tirent différemment ?",
          "choices": [
            "Quel choix maximise mécaniquement un score de conséquences ?",
            "Quelle règle contractuelle est écrite dans le règlement de l’entreprise ?",
            "Combien de personnes sont statistiquement favorables à l’aveu ?"
          ],
          "why": "L’éthique des vertus réfléchit aux dispositions de caractère et à leur mise en œuvre prudente dans la situation.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "convergence",
          "q": "Les trois cadres recommandent finalement d’avouer l’erreur. Que peut-on en conclure ?",
          "a": "Ils peuvent converger sur l’action tout en la justifiant par des raisons différentes.",
          "choices": [
            "Ils deviennent alors une seule et même théorie morale.",
            "Le cadre moral n’a donc jamais aucune importance.",
            "Une réponse identique prouve que toutes les prémisses des trois cadres sont identiques."
          ],
          "why": "Même verdict ne signifie pas même structure de justification : deux cadres peuvent recommander la même action pour des raisons philosophiquement différentes.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "switching",
          "q": "Quel comportement affaiblit le plus une discussion morale ?",
          "a": "Changer de critère à chaque exemple uniquement pour préserver le verdict qu’on voulait déjà obtenir.",
          "choices": [
            "Dire explicitement qu’un nouveau fait rend un autre critère pertinent.",
            "Comparer ce qu’impliquent deux cadres concurrents.",
            "Reconnaître qu’un cas difficile produit une tension entre plusieurs raisons."
          ],
          "why": "Le problème n’est pas de changer d’avis, mais de déplacer invisiblement la règle du jeu pour immuniser sa conclusion.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        }
      ]
    },
    "philo-social-contract-comparison": {
      "title": "Hobbes, Locke, Rousseau : comparer les problèmes plutôt que mémoriser trois fiches",
      "hook": "Les trois auteurs parlent d’autorité politique, mais pas avec le même problème central. Les comparer par situations permet de comprendre ce que chaque théorie cherche à protéger ou à résoudre.",
      "practice": "Imagine successivement trois crises : une société plongée dans l’insécurité où aucune règle n’est garantie ; un gouvernement stable qui confisque arbitrairement les biens ; une cité où une faction utilise la loi pour ses intérêts particuliers. Hobbes, Locke et Rousseau ne mettent pas le même danger au premier plan. C’est cette différence de problème qu’il faut savoir mobiliser.",
      "takeaways": [
        "Hobbes met au premier plan la sécurité et la puissance commune capable de sortir du conflit.",
        "Locke insiste sur les droits que le gouvernement doit protéger et sur les limites de l’autorité.",
        "Rousseau demande comment obéir à une loi commune peut rester compatible avec la liberté politique et l’intérêt général."
      ],
      "quiz": [
        {
          "kind": "hobbes",
          "q": "Une région n’a plus d’autorité commune : groupes rivaux, peur constante, accords impossibles à faire respecter. Quelle problématique est la plus hobbesienne ?",
          "a": "Comment établir une puissance commune assez forte pour rendre la sécurité et les engagements possibles ?",
          "choices": [
            "Comment empêcher un gouvernement déjà stable d’empiéter sur des droits protégés ?",
            "Comment distinguer volonté générale et intérêt particulier d’une faction ?",
            "Comment organiser prioritairement la séparation entre propriété privée et création artistique ?"
          ],
          "why": "Le scénario met au premier plan le problème de l’insécurité sans puissance commune.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "locke",
          "q": "Le pays est stable, mais le gouvernement saisit arbitrairement les biens et interdit tout recours. Quelle critique est la plus lockéenne ?",
          "a": "Un pouvoir institué pour protéger des droits perd sa justification lorsqu’il les viole arbitrairement.",
          "choices": [
            "Toute autorité est illégitime dès qu’elle édicte la moindre contrainte.",
            "La seule question politique pertinente est de savoir si le gouvernement peut maintenir l’ordre.",
            "La confiscation devient légitime dès qu’une majorité momentanée l’approuve."
          ],
          "why": "Locke lie la légitimité du gouvernement à la protection de droits et à des limites du pouvoir.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "rousseau",
          "q": "Une majorité adopte une loi qui accorde un privilège permanent uniquement à ses propres membres. Quelle interrogation est la plus rousseauiste ?",
          "a": "Cette décision exprime-t-elle réellement une règle générale orientée vers l’intérêt commun ou seulement la volonté particulière d’un groupe ?",
          "choices": [
            "La loi est-elle assez sévère pour produire l’obéissance par peur ?",
            "Le privilège existait-il déjà avant la création du gouvernement ?",
            "La décision protège-t-elle uniquement le droit de propriété de la majorité ?"
          ],
          "why": "Rousseau distingue l’agrégation d’intérêts particuliers d’une volonté générale portant sur le commun.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "liberty",
          "q": "Quelle différence est la plus fidèle entre ces problématiques ?",
          "a": "Elles cherchent toutes une autorité légitime, mais donnent des rôles différents à sécurité, droits individuels et participation à la loi commune.",
          "choices": [
            "Elles défendent exactement le même État pour exactement les mêmes raisons.",
            "Hobbes ne s’intéresse jamais à la paix, Locke jamais aux droits et Rousseau jamais à la liberté.",
            "Leur seule différence est le siècle où leurs textes ont été écrits."
          ],
          "why": "Comparer les problèmes évite de réduire les théories à trois slogans indépendants.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        },
        {
          "kind": "diagnosis",
          "q": "Une société est sûre et les droits sont juridiquement protégés, mais les citoyens vivent la loi comme l’ordre d’un groupe séparé auquel ils ne participent jamais. Quel axe devient particulièrement saillant ?",
          "a": "La question rousseauiste de la liberté politique et du rapport entre citoyens et loi commune.",
          "choices": [
            "Le problème reste surtout hobbesien : sans participation directe des citoyens, l’ordre politique retombe vers une simple relation de domination.",
            "Le problème devient surtout lockéen : l’absence de participation suffit à montrer que les droits individuels ne sont plus réellement protégés.",
            "Si la sécurité et les droits sont garantis, la question essentielle de la légitimité est déjà réglée ; la participation politique est secondaire."
          ],
          "why": "La stabilité et certains droits ne répondent pas à toutes les conceptions de la légitimité ; le rapport à l’auto-législation reste une question distincte.",
          "trap": "Les distracteurs correspondent à des raisonnements plausibles mais déplacent une prémisse, le critère ou la portée de la conclusion.",
          "evidence": "Demande-toi exactement ce que les raisons permettent de conclure, puis cherche ce qui ferait échouer le raisonnement."
        }
      ]
    }
  },
  "labs": [
    {
      "id": "philo38-lab-argument",
      "title": "Renforcer avant de réfuter",
      "context": "Une équipe veut supprimer une réunion hebdomadaire parce qu’elle prend du temps et produit peu de décisions.",
      "prompt": "Quelle réponse constitue la meilleure objection ?",
      "choices": [
        {
          "text": "« Certaines équipes utilisent cette réunion pour traiter des problèmes transversaux qu’aucun autre canal ne prend en charge. »",
          "correct": true,
          "feedback": "Oui : elle cible une fonction que la thèse risque d’ignorer."
        },
        {
          "text": "« Les réunions sont toujours pénibles. »",
          "correct": false,
          "feedback": "Cela renforce plutôt la conclusion au lieu de l’objecter."
        },
        {
          "text": "« Le manager qui propose cela aime trop les e-mails. »",
          "correct": false,
          "feedback": "Cela attaque une personne supposée, pas le raisonnement."
        }
      ],
      "takeaway": "Une objection forte montre ce que l’argument explique mal ou oublie.",
      "productionPrompt": "Écris en deux phrases la thèse de l’équipe puis une version améliorée qui répond à l’objection sans abandonner tout le projet.",
      "modelResponse": "Thèse : la réunion devrait disparaître car son coût dépasse son utilité. Réponse améliorée : supprimons-la sauf lorsqu’un problème transversal exige réellement un échange synchrone.",
      "difficulty": "moyen",
      "philosophyReasoningRC38": true
    },
    {
      "id": "philo38-lab-factvalue",
      "title": "Trouver la prémisse cachée",
      "context": "Une ville constate que les voitures représentent 60 % des trajets du centre. Quelqu’un conclut : « donc il faut interdire les voitures ».",
      "prompt": "Quelle phrase rendrait explicite la prémisse normative ?",
      "choices": [
        {
          "text": "« Quand un mode de transport crée des coûts collectifs importants et qu’une alternative raisonnable existe, la ville peut légitimement le restreindre. »",
          "correct": true,
          "feedback": "Oui : elle relie un constat à une règle normative discutable."
        },
        {
          "text": "« Les voitures représentent 60 % des trajets. »",
          "correct": false,
          "feedback": "C’est une répétition du fait, pas la règle qui produit le “il faut”."
        },
        {
          "text": "« Beaucoup de villes ont un centre-ville. »",
          "correct": false,
          "feedback": "Ce fait ne relie pas les données à la conclusion."
        }
      ],
      "takeaway": "Un passage du fait à la norme a besoin d’un principe normatif, explicite ou caché.",
      "productionPrompt": "Invente un exemple quotidien avec un fait, puis un « donc il faut… ». Ajoute ensuite la prémisse normative qui manquait.",
      "modelResponse": "Fait : ce service répond rarement en moins de 48 h. Conclusion : il faut annoncer un délai de 48 h. Prémisse : un service doit annoncer un délai réaliste plutôt que promettre ce qu’il ne tient pas.",
      "difficulty": "moyen",
      "philosophyReasoningRC38": true
    },
    {
      "id": "philo38-lab-socratic",
      "title": "Casser puis réparer une définition",
      "context": "On propose : « être généreux, c’est donner beaucoup d’argent ».",
      "prompt": "Quel cas constitue le meilleur contre-exemple ?",
      "choices": [
        {
          "text": "Une personne modeste donne régulièrement du temps et de l’aide au prix d’un réel effort personnel.",
          "correct": true,
          "feedback": "Oui : le cas paraît généreux sans remplir le critère monétaire."
        },
        {
          "text": "Une personne riche fait un don important à une association.",
          "correct": false,
          "feedback": "Ce cas confirme plutôt la définition."
        },
        {
          "text": "Une personne ne donne rien et refuse toute aide.",
          "correct": false,
          "feedback": "Il n’attaque pas la frontière de la définition."
        }
      ],
      "takeaway": "Un bon contre-exemple force la définition à expliquer un cas qu’elle classe mal.",
      "productionPrompt": "Propose une meilleure définition de la générosité qui survive au contre-exemple sans devenir vague.",
      "modelResponse": "La générosité consiste à consacrer volontairement une part significative de ses ressources — argent, temps ou effort — au bénéfice d’autrui sans réduire le concept au montant donné.",
      "difficulty": "moyen",
      "philosophyReasoningRC38": true
    },
    {
      "id": "philo38-lab-control",
      "title": "Contrôle, influence, résultat",
      "context": "Tu présentes un projet devant un jury.",
      "prompt": "Quelle formulation est la plus précise ?",
      "choices": [
        {
          "text": "« Je contrôle ma préparation et mes réponses ; je peux influencer le jury, mais pas posséder sa décision finale. »",
          "correct": true,
          "feedback": "Oui : les trois niveaux sont distingués."
        },
        {
          "text": "« Si je prépare assez bien, je contrôle forcément la note. »",
          "correct": false,
          "feedback": "Une bonne préparation influence le résultat sans le garantir."
        },
        {
          "text": "« Puisque la note ne dépend pas entièrement de moi, préparer ne sert pas. »",
          "correct": false,
          "feedback": "Ne pas contrôler un résultat n’annule pas l’influence de l’action."
        }
      ],
      "takeaway": "Ne transforme ni l’influence en contrôle, ni l’absence de contrôle en passivité.",
      "productionPrompt": "Écris trois lignes pour un événement à venir : ce que tu contrôles, ce que tu influences, ce que tu ne contrôles pas.",
      "modelResponse": "Contrôle : préparer mon intervention. Influence : rendre mon argument clair. Hors contrôle : les priorités et la décision finale du jury.",
      "difficulty": "moyen",
      "philosophyReasoningRC38": true
    },
    {
      "id": "philo38-lab-doubt",
      "title": "Stress-test d’une croyance",
      "context": "Ton application météo annonce de la pluie à 18 h.",
      "prompt": "Quelle attitude correspond au doute méthodique sans caricature ?",
      "choices": [
        {
          "text": "« Je peux tester les raisons de lui faire confiance et imaginer des erreurs possibles sans conclure que la prévision est fausse. »",
          "correct": true,
          "feedback": "Oui : le doute teste la justification sans transformer la possibilité d’erreur en certitude d’erreur."
        },
        {
          "text": "« Toute prévision est fausse tant qu’elle n’est pas absolument certaine. »",
          "correct": false,
          "feedback": "Cela confond doute méthodique et scepticisme pratique total."
        },
        {
          "text": "« Une application populaire est indubitable. »",
          "correct": false,
          "feedback": "La popularité ne crée pas de certitude absolue."
        }
      ],
      "takeaway": "Le doute cartésien hiérarchise les certitudes ; il ne rend pas toute croyance ordinaire inutilisable.",
      "productionPrompt": "Choisis une croyance banale et écris : raison de confiance / erreur possible / ce qui resterait certain si elle était fausse.",
      "modelResponse": "Mon téléphone indique 18 h. Confiance : synchronisation réseau. Erreur possible : mauvais fuseau. Même s’il se trompe, il reste certain que je vois actuellement un affichage que j’interprète comme une heure.",
      "difficulty": "moyen",
      "philosophyReasoningRC38": true
    },
    {
      "id": "philo38-lab-causality",
      "title": "Corrélation ou cause ?",
      "context": "Les jours de forte chaleur, les urgences liées à la baignade et les ventes de boissons augmentent.",
      "prompt": "Quelle hypothèse faut-il tester avant de dire que les boissons causent les urgences ?",
      "choices": [
        {
          "text": "La chaleur peut augmenter séparément les deux phénomènes.",
          "correct": true,
          "feedback": "Oui : une cause commune peut produire la corrélation."
        },
        {
          "text": "Les deux séries utilisent des nombres et sont donc causalement liées.",
          "correct": false,
          "feedback": "Le format numérique ne crée aucun lien causal."
        },
        {
          "text": "Une corrélation répétée suffit toujours à fixer la direction de la cause.",
          "correct": false,
          "feedback": "La direction et les variables cachées restent à examiner."
        }
      ],
      "takeaway": "Une régularité est une piste ; la causalité demande une enquête supplémentaire.",
      "productionPrompt": "Donne un exemple de corrélation quotidienne et propose une troisième variable qui pourrait expliquer les deux phénomènes.",
      "modelResponse": "Je dors moins les jours où je bois plus de café et je suis moins concentré. Le stress peut à la fois réduire mon sommeil, augmenter le café et diminuer ma concentration.",
      "difficulty": "moyen",
      "philosophyReasoningRC38": true
    },
    {
      "id": "philo38-lab-dilemma",
      "title": "Nommer les raisons en conflit",
      "context": "Tu as promis de garder un secret, mais ce secret révèle un danger sérieux pour quelqu’un.",
      "prompt": "Quelle description du dilemme est la plus honnête ?",
      "choices": [
        {
          "text": "« Une obligation de confidentialité entre en conflit avec une raison forte de prévenir un dommage grave. »",
          "correct": true,
          "feedback": "Oui : les deux raisons sont conservées au lieu d’en effacer une."
        },
        {
          "text": "« Toute promesse disparaît dès qu’elle devient difficile. »",
          "correct": false,
          "feedback": "Cela résout le cas en supprimant arbitrairement une des raisons."
        },
        {
          "text": "« Une promesse doit toujours être tenue, donc le danger n’a aucune pertinence. »",
          "correct": false,
          "feedback": "Cela immunise une règle contre le conflit au lieu de l’examiner."
        }
      ],
      "takeaway": "Un dilemme est plus clair quand on formule les deux raisons sérieuses avant de trancher.",
      "productionPrompt": "Écris une réponse de trois phrases : ton choix, le critère principal et l’information qui pourrait te faire changer d’avis.",
      "modelResponse": "Je préviendrais la personne menacée, car la gravité et l’imminence du dommage l’emportent ici sur la confidentialité. Si le danger se révélait fictif ou déjà écarté, je réévaluerais ce choix.",
      "difficulty": "moyen",
      "philosophyReasoningRC38": true
    },
    {
      "id": "philo38-lab-liberty",
      "title": "Une règle, deux libertés",
      "context": "Une copropriété limite le bruit après 23 h.",
      "prompt": "Quelle analyse est la plus complète ?",
      "choices": [
        {
          "text": "« La règle limite certaines actions mais protège aussi l’usage paisible du logement ; sa légitimité dépend notamment de sa généralité, de sa justification et de la procédure. »",
          "correct": true,
          "feedback": "Oui : contrainte et protection sont examinées ensemble."
        },
        {
          "text": "« Toute limitation d’une action est nécessairement incompatible avec la liberté. »",
          "correct": false,
          "feedback": "Cela ignore les conflits entre libertés."
        },
        {
          "text": "« La règle est légitime uniquement parce qu’elle peut être sanctionnée. »",
          "correct": false,
          "feedback": "Le pouvoir d’exécution ne suffit pas à fonder l’autorité."
        }
      ],
      "takeaway": "La philosophie politique demande comment justifier la contrainte, pas seulement si elle existe.",
      "productionPrompt": "Propose une règle collective banale et donne une raison pour elle, puis une limite ou exception qui éviterait qu’elle devienne arbitraire.",
      "modelResponse": "Règle : pas de musique forte après 23 h pour protéger le repos. Limite : exceptions annoncées pour certains événements, avec un niveau sonore et un horaire maximum communs à tous.",
      "difficulty": "moyen",
      "philosophyReasoningRC38": true
    },
    {
      "id": "philo38-lab-validity",
      "title": "Changer les mots, garder la forme",
      "context": "Tous les norps sont des lumes. Tous les lumes sont des veks. Donc tous les norps sont des veks.",
      "prompt": "Que peux-tu déjà juger ?",
      "choices": [
        {
          "text": "La forme est valide même sans savoir ce que les mots inventés désignent.",
          "correct": true,
          "feedback": "Oui : la relation logique suffit à tester cette structure."
        },
        {
          "text": "L’argument est faux parce que “norp” n’existe pas.",
          "correct": false,
          "feedback": "La vérité des termes n’est pas nécessaire pour tester la forme."
        },
        {
          "text": "La conclusion est vraie dans le monde réel.",
          "correct": false,
          "feedback": "La validité n’établit pas la vérité factuelle des prémisses inventées."
        }
      ],
      "takeaway": "La validité se teste en supposant les prémisses vraies puis en demandant si la conclusion pourrait encore être fausse.",
      "productionPrompt": "Crée un argument valide avec une prémisse manifestement fausse, puis explique en une phrase pourquoi il reste valide.",
      "modelResponse": "Tous les chats sont des reptiles ; Félix est un chat ; donc Félix est un reptile. Il est valide parce que la conclusion suivrait nécessairement si les prémisses étaient vraies, même si l’une est fausse en réalité.",
      "difficulty": "moyen",
      "philosophyReasoningRC38": true
    },
    {
      "id": "philo38-lab-necessary",
      "title": "Tester les deux directions",
      "context": "Être carré suffit pour être rectangle.",
      "prompt": "Quel contre-exemple testerait l’idée que « carré » est aussi nécessaire pour être rectangle ?",
      "choices": [
        {
          "text": "Un rectangle qui n’est pas carré.",
          "correct": true,
          "feedback": "Oui : Y sans X réfute la nécessité de X pour Y."
        },
        {
          "text": "Un carré qui est aussi rectangle.",
          "correct": false,
          "feedback": "Cela confirme la suffisance sans tester la nécessité."
        },
        {
          "text": "Une figure qui n’est ni carré ni rectangle.",
          "correct": false,
          "feedback": "Elle ne touche pas à la relation proposée."
        }
      ],
      "takeaway": "Pour la nécessité, cherche Y sans X ; pour la suffisance, cherche X sans Y.",
      "productionPrompt": "Choisis une condition de la vie quotidienne et écris deux phrases : est-elle nécessaire ? est-elle suffisante ? Justifie chacune avec un cas.",
      "modelResponse": "Avoir un billet valide est généralement nécessaire pour entrer au concert, mais pas suffisant si la salle est évacuée ou si le billet est pour une autre date.",
      "difficulty": "moyen",
      "philosophyReasoningRC38": true
    },
    {
      "id": "philo38-lab-definition",
      "title": "Trop large ou trop étroite ?",
      "context": "Définition : « le courage, c’est prendre un risque ».",
      "prompt": "Quel cas montre le mieux que la définition est trop large ?",
      "choices": [
        {
          "text": "Conduire dangereusement pour impressionner ses amis.",
          "correct": true,
          "feedback": "Oui : il y a risque sans courage évident."
        },
        {
          "text": "Entrer dans l’eau pour secourir quelqu’un.",
          "correct": false,
          "feedback": "Ce cas peut illustrer le courage."
        },
        {
          "text": "Prendre la parole pour défendre une personne injustement attaquée.",
          "correct": false,
          "feedback": "Ce cas peut également compter comme courageux."
        }
      ],
      "takeaway": "Un bon critère doit exclure les cas qui possèdent un trait superficiel sans posséder le concept étudié.",
      "productionPrompt": "Réécris la définition en ajoutant le critère qui manque, puis cherche toi-même un nouveau cas limite.",
      "modelResponse": "Le courage consiste à affronter lucidement un risque ou une difficulté pour une raison défendable. Cas limite : prendre un risque sportif extrême pour soi-même — courage, goût du risque, ou les deux ?",
      "difficulty": "moyen",
      "philosophyReasoningRC38": true
    },
    {
      "id": "philo38-lab-assent",
      "title": "Le message et l’histoire qu’on se raconte",
      "context": "Tu reçois « On doit parler demain ».",
      "prompt": "Quelle phrase distingue le mieux fait et jugement ?",
      "choices": [
        {
          "text": "« Je sais qu’on veut me parler demain ; “je vais être licencié” est une interprétation supplémentaire. »",
          "correct": true,
          "feedback": "Oui : l’information certaine est séparée du scénario ajouté."
        },
        {
          "text": "« Mon inquiétude prouve que le licenciement est probable. »",
          "correct": false,
          "feedback": "Une émotion n’établit pas la vérité de son interprétation."
        },
        {
          "text": "« Si je suis stoïcien, le message ne doit produire aucune première réaction. »",
          "correct": false,
          "feedback": "La doctrine distingue l’impression de l’assentiment ; elle ne suppose pas toute réaction initiale choisie."
        }
      ],
      "takeaway": "La première impression peut surgir ; la pratique porte sur le jugement auquel on décide ensuite de consentir.",
      "productionPrompt": "Écris un fait observable qui t’inquiéterait, puis deux interprétations différentes et une action possible avant de savoir laquelle est vraie.",
      "modelResponse": "Fait : mon responsable annule notre réunion. Interprétation 1 : mon projet est abandonné. Interprétation 2 : son planning a changé. Action : demander quand reprogrammer sans conclure avant sa réponse.",
      "difficulty": "moyen",
      "philosophyReasoningRC38": true
    },
    {
      "id": "philo38-lab-cogito",
      "title": "Ne pas sur-vendre une certitude",
      "context": "Suppose que toutes tes perceptions extérieures puissent être trompeuses.",
      "prompt": "Quelle conclusion reste la mieux protégée ?",
      "choices": [
        {
          "text": "« Au moment où je doute, une activité de pensée a lieu et je ne peux nier totalement mon existence comme être pensant. »",
          "correct": true,
          "feedback": "Oui : c’est la portée minimale du cogito."
        },
        {
          "text": "« Donc chaque objet que je perçois existe exactement comme je le vois. »",
          "correct": false,
          "feedback": "Cela dépasse ce que le cogito établit."
        },
        {
          "text": "« Donc mes souvenirs sont tous fiables. »",
          "correct": false,
          "feedback": "La mémoire exige une justification supplémentaire."
        }
      ],
      "takeaway": "Une bonne lecture du cogito consiste autant à limiter sa conclusion qu’à l’affirmer.",
      "productionPrompt": "Écris une conclusion que le cogito permet, puis une conclusion plausible qu’il ne permet pas encore.",
      "modelResponse": "Permet : j’existe au moins comme sujet pensant pendant que je pense. Ne permet pas encore : mon corps et le monde extérieur sont exactement tels que je les perçois.",
      "difficulty": "moyen",
      "philosophyReasoningRC38": true
    },
    {
      "id": "philo38-lab-induction",
      "title": "Le futur n’est pas contenu dans la liste du passé",
      "context": "La même clé a ouvert la porte 200 fois.",
      "prompt": "Quelle affirmation est la plus rigoureuse ?",
      "choices": [
        {
          "text": "« Cela donne une forte raison pratique d’attendre qu’elle fonctionne encore, sans démontrer qu’elle fonctionnera nécessairement demain. »",
          "correct": true,
          "feedback": "Oui : confiance empirique et nécessité logique sont séparées."
        },
        {
          "text": "« Deux cents succès rendent une panne future logiquement impossible. »",
          "correct": false,
          "feedback": "Une série finie ne contient pas déductivement tous les cas futurs."
        },
        {
          "text": "« Comme ce n’est pas certain, l’historique n’apporte aucune information utile. »",
          "correct": false,
          "feedback": "L’absence de certitude n’annule pas toute force inductive."
        }
      ],
      "takeaway": "Le problème de l’induction limite la prétention à la nécessité ; il ne transforme pas toute prévision en absurdité.",
      "productionPrompt": "Prends une habitude fiable de ton quotidien et formule d’abord ta confiance pratique, puis la limite logique de cette confiance.",
      "modelResponse": "Mon train est généralement à l’heure, donc je m’attends raisonnablement à ce qu’il le soit demain. Mais les trajets passés ne démontrent pas qu’aucun incident futur ne peut survenir.",
      "difficulty": "moyen",
      "philosophyReasoningRC38": true
    },
    {
      "id": "philo38-lab-frameworks",
      "title": "Même action, trois questions",
      "context": "Un collègue te demande de cacher une petite erreur.",
      "prompt": "Quelle question appartient le mieux à l’éthique des vertus ?",
      "choices": [
        {
          "text": "« Que ferait une personne honnête, loyale et courageuse dans cette situation, et comment arbitrer ces traits ? »",
          "correct": true,
          "feedback": "Oui : le caractère et la prudence pratique sont centraux."
        },
        {
          "text": "« Quel choix maximise les effets positifs globaux ? »",
          "correct": false,
          "feedback": "C’est une question conséquentialiste."
        },
        {
          "text": "« Quel devoir de vérité s’applique indépendamment du résultat attendu ? »",
          "correct": false,
          "feedback": "C’est une question déontologique."
        }
      ],
      "takeaway": "Les cadres moraux se distinguent d’abord par ce qu’ils regardent, pas par une liste de réponses automatiques.",
      "productionPrompt": "Analyse une même petite décision avec trois phrases commençant par « Conséquences : », « Devoir : », « Vertu : ».",
      "modelResponse": "Conséquences : cacher l’erreur peut éviter un embarras mais fragiliser la confiance. Devoir : j’ai une obligation d’honnêteté. Vertu : la loyauté ne doit pas devenir complicité ; le courage peut exiger de reconnaître l’erreur.",
      "difficulty": "moyen",
      "philosophyReasoningRC38": true
    },
    {
      "id": "philo38-lab-contractcompare",
      "title": "Quel problème politique est au premier plan ?",
      "context": "Un État est très stable mais saisit arbitrairement les biens de certains citoyens sans recours.",
      "prompt": "Quelle problématique devient particulièrement lockéenne ?",
      "choices": [
        {
          "text": "La limite d’un pouvoir qui cesse de protéger les droits pour lesquels il est institué.",
          "correct": true,
          "feedback": "Oui : stabilité et légitimité ne sont pas identiques."
        },
        {
          "text": "La nécessité première de créer une puissance commune pour sortir d’une guerre générale.",
          "correct": false,
          "feedback": "C’est davantage le problème hobbesien dans un état d’insécurité radicale."
        },
        {
          "text": "La distinction entre induction et déduction.",
          "correct": false,
          "feedback": "Cette question n’appartient pas au problème politique décrit."
        }
      ],
      "takeaway": "Comparer Hobbes, Locke et Rousseau par problèmes est plus utile que mémoriser trois slogans.",
      "productionPrompt": "Invente trois mini-crises politiques en une phrase : une hobbesienne, une lockéenne, une rousseauiste.",
      "modelResponse": "Hobbes : aucune autorité ne peut faire respecter les accords. Locke : un gouvernement stable viole arbitrairement les droits. Rousseau : une faction utilise la loi générale pour ses intérêts particuliers.",
      "difficulty": "moyen",
      "philosophyReasoningRC38": true
    }
  ],
  "mysteries": [
    {
      "id": "philo-mystery-strawman-318",
      "lessonId": "philo-argument-thesis-objection",
      "difficulty": "facile",
      "title": "La version trop facile à battre",
      "missionQuestion": "Quelle réponse rétablit le vrai débat ?",
      "prompt": "A dit : « Je veux limiter la circulation automobile autour des écoles aux heures d’entrée et de sortie. » B répond : « Donc tu veux interdire toutes les voitures partout. »",
      "answer": "Revenir à la proposition limitée autour des écoles",
      "aliases": [
        "revenir à la proposition réelle",
        "reformuler la vraie proposition",
        "répondre à la proposition limitée"
      ],
      "blockedGuesses": [
        "défendre l’interdiction totale inventée par B",
        "attaquer les intentions de B",
        "changer de sujet"
      ],
      "explanation": "B a remplacé la thèse par une version beaucoup plus extrême. Le bon geste est d’abord de restaurer la proposition réellement défendue avant de l’évaluer.",
      "discipline": "philosophy",
      "caseTitle": "Atelier de raisonnement",
      "subjectType": "problème philosophique",
      "periodHint": "raisonnement",
      "answerInstruction": "Choisis la réponse qui résiste le mieux au cas.",
      "clues": [
        "Isole la conclusion exacte avant de choisir.",
        "Cherche le critère ou la prémisse qui change réellement le cas.",
        "Écarte les réponses qui ajoutent une information absente ou rendent la thèse artificiellement extrême."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "philosophyScenarioRC38": true
    },
    {
      "id": "philo-mystery-is-ought-318",
      "lessonId": "philo-fact-opinion-value",
      "difficulty": "moyen",
      "title": "Le ‘donc’ qui cache une règle",
      "missionQuestion": "Quelle prémisse manque ?",
      "prompt": "« Cette entreprise travaille ainsi depuis vingt ans, donc nous devons conserver cette méthode. » Le fait historique est admis par tout le monde.",
      "answer": "Les pratiques anciennes doivent être conservées sauf raison contraire",
      "aliases": [
        "ce qui est ancien doit être conservé",
        "une pratique ancienne mérite d'être conservée"
      ],
      "blockedGuesses": [
        "cette entreprise existe depuis vingt ans",
        "la méthode est ancienne",
        "beaucoup de salariés connaissent la méthode"
      ],
      "explanation": "Pour passer d’un fait à une obligation, il faut une prémisse normative. Une fois rendue explicite, cette prémisse peut elle-même être discutée.",
      "discipline": "philosophy",
      "caseTitle": "Atelier de raisonnement",
      "subjectType": "problème philosophique",
      "periodHint": "raisonnement",
      "answerInstruction": "Choisis la réponse qui résiste le mieux au cas.",
      "clues": [
        "Isole la conclusion exacte avant de choisir.",
        "Cherche le critère ou la prémisse qui change réellement le cas.",
        "Écarte les réponses qui ajoutent une information absente ou rendent la thèse artificiellement extrême."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "philosophyScenarioRC38": true
    },
    {
      "id": "philo-mystery-control-318",
      "lessonId": "philo-stoic-control",
      "difficulty": "facile",
      "title": "Préparer sans posséder le résultat",
      "missionQuestion": "Quelle formulation distingue correctement action et résultat ?",
      "prompt": "Tu as un entretien demain. Tu peux préparer tes exemples, arriver à l’heure et répondre clairement. Tu ignores qui seront les autres candidats et quelle décision finale prendra le recruteur.",
      "answer": "Je contrôle ma préparation mais pas la décision finale",
      "aliases": [
        "je contrôle la préparation pas le résultat",
        "préparer oui contrôler la décision non"
      ],
      "blockedGuesses": [
        "si je me prépare bien je contrôle le résultat",
        "puisque le résultat m'échappe préparer ne sert à rien",
        "je dois éviter de vouloir réussir"
      ],
      "explanation": "La préparation dépend largement de ton action ; elle peut influencer le résultat sans le garantir. Cette distinction vise une action lucide, pas la passivité.",
      "discipline": "philosophy",
      "caseTitle": "Atelier de raisonnement",
      "subjectType": "problème philosophique",
      "periodHint": "raisonnement",
      "answerInstruction": "Choisis la réponse qui résiste le mieux au cas.",
      "clues": [
        "Isole la conclusion exacte avant de choisir.",
        "Cherche le critère ou la prémisse qui change réellement le cas.",
        "Écarte les réponses qui ajoutent une information absente ou rendent la thèse artificiellement extrême."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "philosophyScenarioRC38": true
    },
    {
      "id": "philo-mystery-cogito-318",
      "lessonId": "philo-descartes-doubt",
      "difficulty": "moyen",
      "title": "Ce qui résiste au stress-test",
      "missionQuestion": "Quelle certitude reste la plus minimale ?",
      "prompt": "Suppose que tes perceptions, tes souvenirs et même la scène devant toi puissent être trompeurs. Tu es pourtant en train d’examiner cette hypothèse.",
      "answer": "Une pensée est en cours pendant que je doute",
      "aliases": [
        "je pense pendant que je doute",
        "il y a une activité de pensée"
      ],
      "blockedGuesses": [
        "tout ce que je perçois est certain",
        "mes souvenirs sont fiables",
        "le monde extérieur est déjà démontré"
      ],
      "explanation": "Le doute radical n’efface pas l’acte même de douter. Le cogito part de cette certitude minimale et ne restaure pas encore toutes les autres croyances.",
      "discipline": "philosophy",
      "caseTitle": "Atelier de raisonnement",
      "subjectType": "problème philosophique",
      "periodHint": "raisonnement",
      "answerInstruction": "Choisis la réponse qui résiste le mieux au cas.",
      "clues": [
        "Isole la conclusion exacte avant de choisir.",
        "Cherche le critère ou la prémisse qui change réellement le cas.",
        "Écarte les réponses qui ajoutent une information absente ou rendent la thèse artificiellement extrême."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "philosophyScenarioRC38": true
    },
    {
      "id": "philo-mystery-induction-318",
      "lessonId": "philo-hume-causality",
      "difficulty": "moyen",
      "title": "Deux courbes montent ensemble",
      "missionQuestion": "Quelle hypothèse faut-il tester avant de parler de cause ?",
      "prompt": "En été, les ventes de glaces et les interventions de secours sur les plages augmentent toutes les deux. Quelqu’un conclut : « les glaces provoquent donc les interventions ».",
      "answer": "La chaleur peut être une cause commune des deux phénomènes",
      "aliases": [
        "une troisième variable comme la chaleur",
        "la chaleur explique les deux"
      ],
      "blockedGuesses": [
        "les interventions causent les glaces",
        "toute corrélation prouve une cause",
        "aucune causalité n'est jamais connaissable"
      ],
      "explanation": "Une cause commune peut produire deux séries corrélées. Ici, la chaleur augmente à la fois les baignades et les achats de glaces ; la corrélation soutient une enquête, pas encore une direction causale précise.",
      "discipline": "philosophy",
      "caseTitle": "Atelier de raisonnement",
      "subjectType": "problème philosophique",
      "periodHint": "raisonnement",
      "answerInstruction": "Choisis la réponse qui résiste le mieux au cas.",
      "clues": [
        "Isole la conclusion exacte avant de choisir.",
        "Cherche le critère ou la prémisse qui change réellement le cas.",
        "Écarte les réponses qui ajoutent une information absente ou rendent la thèse artificiellement extrême."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "philosophyScenarioRC38": true
    },
    {
      "id": "philo-mystery-contract-318",
      "lessonId": "philo-social-contract-liberty",
      "difficulty": "moyen",
      "title": "Obéir n’est pas encore légitimer",
      "missionQuestion": "Qu’est-ce qu’il manque pour passer du pouvoir à l’autorité ?",
      "prompt": "Un groupe possède assez de force pour imposer une règle et tout le monde obéit. Rien n’est dit sur la procédure, les droits protégés ou la justification commune.",
      "answer": "Une justification de la légitimité de la règle",
      "aliases": [
        "justifier pourquoi le pouvoir est légitime",
        "une raison légitime d'obéir"
      ],
      "blockedGuesses": [
        "davantage de force",
        "une sanction plus rapide",
        "un texte plus long"
      ],
      "explanation": "La capacité de contraindre montre un pouvoir de fait. La philosophie politique demande encore pourquoi ce pouvoir aurait le droit de gouverner.",
      "discipline": "philosophy",
      "caseTitle": "Atelier de raisonnement",
      "subjectType": "problème philosophique",
      "periodHint": "raisonnement",
      "answerInstruction": "Choisis la réponse qui résiste le mieux au cas.",
      "clues": [
        "Isole la conclusion exacte avant de choisir.",
        "Cherche le critère ou la prémisse qui change réellement le cas.",
        "Écarte les réponses qui ajoutent une information absente ou rendent la thèse artificiellement extrême."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "philosophyScenarioRC38": true
    },
    {
      "id": "philo-mystery-validity-rc19",
      "lessonId": "philo-argument-validity",
      "difficulty": "facile",
      "title": "Une conclusion vraie pour une mauvaise raison",
      "missionQuestion": "Comment évaluer le raisonnement ?",
      "prompt": "« Rome est en Italie. Donc 2 + 2 = 4. » Les deux propositions sont vraies, mais aucune information supplémentaire ne relie la première à la seconde comme prémisse et conclusion.",
      "answer": "La conclusion est vraie mais le raisonnement est invalide",
      "aliases": [
        "vrai mais invalide",
        "la conclusion ne découle pas de la prémisse"
      ],
      "blockedGuesses": [
        "valide parce que tout est vrai",
        "solide parce que la conclusion est certaine",
        "valide si on ajoute d'autres faits vrais"
      ],
      "explanation": "La validité demande que la conclusion suive des prémisses. Deux vérités sans lien logique ne forment pas un bon argument.",
      "discipline": "philosophy",
      "caseTitle": "Atelier de raisonnement",
      "subjectType": "problème philosophique",
      "periodHint": "raisonnement",
      "answerInstruction": "Choisis la réponse qui résiste le mieux au cas.",
      "clues": [
        "Isole la conclusion exacte avant de choisir.",
        "Cherche le critère ou la prémisse qui change réellement le cas.",
        "Écarte les réponses qui ajoutent une information absente ou rendent la thèse artificiellement extrême."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "philosophyScenarioRC38": true
    },
    {
      "id": "philo-mystery-necessary-rc19",
      "lessonId": "philo-distinction-necessary-sufficient",
      "difficulty": "moyen",
      "title": "Le billet qui ne garantit pas l’entrée",
      "missionQuestion": "Quel statut a le billet dans ce cas ?",
      "prompt": "Pour entrer au concert il faut un billet valide. Pourtant, même avec un billet, tu n’entres pas si la salle est évacuée pour raisons de sécurité.",
      "answer": "Le billet est nécessaire mais pas suffisant",
      "aliases": [
        "nécessaire pas suffisant",
        "condition nécessaire mais non suffisante"
      ],
      "blockedGuesses": [
        "suffisant mais pas nécessaire",
        "à la fois nécessaire et suffisant",
        "ni nécessaire ni suffisant"
      ],
      "explanation": "Sans billet l’entrée échoue, mais le billet seul ne garantit pas l’entrée : d’autres conditions peuvent encore manquer, comme l’ouverture effective de la salle et l’absence d’évacuation.",
      "discipline": "philosophy",
      "caseTitle": "Atelier de raisonnement",
      "subjectType": "problème philosophique",
      "periodHint": "raisonnement",
      "answerInstruction": "Choisis la réponse qui résiste le mieux au cas.",
      "clues": [
        "Isole la conclusion exacte avant de choisir.",
        "Cherche le critère ou la prémisse qui change réellement le cas.",
        "Écarte les réponses qui ajoutent une information absente ou rendent la thèse artificiellement extrême."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "philosophyScenarioRC38": true
    },
    {
      "id": "philo-mystery-counterexample-rc19",
      "lessonId": "philo-socrates-definition",
      "difficulty": "moyen",
      "title": "Le courage qui recule",
      "missionQuestion": "Que montre le cas du pompier ?",
      "prompt": "Définition : « être courageux, c’est ne jamais reculer ». Un pompier recule devant un plafond prêt à s’effondrer, contourne le bâtiment puis revient sauver une victime.",
      "answer": "La définition est trop étroite",
      "aliases": [
        "définition trop étroite",
        "le contre-exemple montre qu'on peut reculer et rester courageux"
      ],
      "blockedGuesses": [
        "tout recul est courageux",
        "la définition est trop large",
        "le cas confirme exactement la définition"
      ],
      "explanation": "Le pompier paraît encore courageux tout en violant le critère ‘ne jamais reculer’. La définition exclut donc un cas plausible qu’elle devrait pouvoir traiter.",
      "discipline": "philosophy",
      "caseTitle": "Atelier de raisonnement",
      "subjectType": "problème philosophique",
      "periodHint": "raisonnement",
      "answerInstruction": "Choisis la réponse qui résiste le mieux au cas.",
      "clues": [
        "Isole la conclusion exacte avant de choisir.",
        "Cherche le critère ou la prémisse qui change réellement le cas.",
        "Écarte les réponses qui ajoutent une information absente ou rendent la thèse artificiellement extrême."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "philosophyScenarioRC38": true
    },
    {
      "id": "philo-mystery-assent-rc19",
      "lessonId": "philo-stoic-impressions",
      "difficulty": "facile",
      "title": "Le message et le scénario",
      "missionQuestion": "Quelle phrase ajoute un jugement plutôt qu’un fait ?",
      "prompt": "Ton responsable écrit seulement : « On doit parler demain. » Trois secondes plus tard, ton esprit produit plusieurs scénarios.",
      "answer": "Je vais être licencié",
      "aliases": [
        "je vais sûrement être licencié",
        "ça prouve que je vais être licencié"
      ],
      "blockedGuesses": [
        "on doit parler demain",
        "je ne sais pas encore pourquoi",
        "je peux demander l'objet du rendez-vous"
      ],
      "explanation": "Le message est le fait disponible ; le licenciement est une interprétation possible à laquelle on peut ou non donner son assentiment.",
      "discipline": "philosophy",
      "caseTitle": "Atelier de raisonnement",
      "subjectType": "problème philosophique",
      "periodHint": "raisonnement",
      "answerInstruction": "Choisis la réponse qui résiste le mieux au cas.",
      "clues": [
        "Isole la conclusion exacte avant de choisir.",
        "Cherche le critère ou la prémisse qui change réellement le cas.",
        "Écarte les réponses qui ajoutent une information absente ou rendent la thèse artificiellement extrême."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "philosophyScenarioRC38": true
    },
    {
      "id": "philo-mystery-cogito-rc19",
      "lessonId": "philo-descartes-cogito",
      "difficulty": "moyen",
      "title": "Jusqu’où va la certitude ?",
      "missionQuestion": "Quelle conclusion ne dépasse pas le cogito ?",
      "prompt": "Tu accordes le raisonnement du cogito mais rien de plus. Choisis la conclusion qui reste à l’intérieur de sa portée immédiate.",
      "answer": "J’existe au moins comme être pensant pendant que je pense",
      "aliases": [
        "j'existe comme sujet pensant",
        "je pense donc j'existe au moment où je pense"
      ],
      "blockedGuesses": [
        "mon corps est exactement comme je le perçois",
        "tous mes souvenirs sont fiables",
        "le monde extérieur est déjà démontré"
      ],
      "explanation": "Le cogito donne une certitude minimale sur l’existence pensante actuelle. Les conclusions sur le corps, la mémoire ou le monde demandent encore d’autres arguments.",
      "discipline": "philosophy",
      "caseTitle": "Atelier de raisonnement",
      "subjectType": "problème philosophique",
      "periodHint": "raisonnement",
      "answerInstruction": "Choisis la réponse qui résiste le mieux au cas.",
      "clues": [
        "Isole la conclusion exacte avant de choisir.",
        "Cherche le critère ou la prémisse qui change réellement le cas.",
        "Écarte les réponses qui ajoutent une information absente ou rendent la thèse artificiellement extrême."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "philosophyScenarioRC38": true
    },
    {
      "id": "philo-mystery-induction-rc19",
      "lessonId": "philo-hume-induction",
      "difficulty": "difficile",
      "title": "La méthode qui se justifie elle-même",
      "missionQuestion": "Pourquoi la justification tourne-t-elle en cercle ?",
      "prompt": "« Nos projections du passé vers le futur ont généralement réussi jusqu’ici ; donc elles continueront à être fiables demain. »",
      "answer": "On utilise déjà l’induction pour justifier l’induction",
      "aliases": [
        "raisonnement circulaire sur l'induction",
        "l'induction justifie elle-même l'induction"
      ],
      "blockedGuesses": [
        "le futur ne peut jamais être prévu",
        "le passé est forcément faux",
        "il s'agit d'une déduction valide"
      ],
      "explanation": "Le succès passé est projeté vers le futur pour défendre le principe même qui autorise cette projection. C’est précisément la difficulté soulevée par Hume.",
      "discipline": "philosophy",
      "caseTitle": "Atelier de raisonnement",
      "subjectType": "problème philosophique",
      "periodHint": "raisonnement",
      "answerInstruction": "Choisis la réponse qui résiste le mieux au cas.",
      "clues": [
        "Isole la conclusion exacte avant de choisir.",
        "Cherche le critère ou la prémisse qui change réellement le cas.",
        "Écarte les réponses qui ajoutent une information absente ou rendent la thèse artificiellement extrême."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "philosophyScenarioRC38": true
    },
    {
      "id": "philo-mystery-ethics-rc19",
      "lessonId": "philo-ethics-frameworks",
      "difficulty": "moyen",
      "title": "Même choix, autre raison",
      "missionQuestion": "Quelle question change vraiment de cadre ?",
      "prompt": "Un collègue te demande de cacher son erreur. Tu as déjà demandé : « quels effets aura mon choix ? » Tu veux maintenant examiner le même cas sous une focale déontologique.",
      "answer": "Ai-je un devoir d'honnêteté que je ne peux pas écarter pour un meilleur résultat",
      "aliases": [
        "quel devoir d'honnêteté s'applique",
        "y a-t-il un devoir ou un droit en jeu"
      ],
      "blockedGuesses": [
        "quel choix produit le plus de bénéfices",
        "quelle option aura les meilleures conséquences",
        "combien de personnes seront contentes"
      ],
      "explanation": "Changer de cadre signifie changer la question centrale. Une focale déontologique met d’abord au premier plan les devoirs et droits.",
      "discipline": "philosophy",
      "caseTitle": "Atelier de raisonnement",
      "subjectType": "problème philosophique",
      "periodHint": "raisonnement",
      "answerInstruction": "Choisis la réponse qui résiste le mieux au cas.",
      "clues": [
        "Isole la conclusion exacte avant de choisir.",
        "Cherche le critère ou la prémisse qui change réellement le cas.",
        "Écarte les réponses qui ajoutent une information absente ou rendent la thèse artificiellement extrême."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "philosophyScenarioRC38": true
    },
    {
      "id": "philo-mystery-contract-rc19",
      "lessonId": "philo-social-contract-comparison",
      "difficulty": "difficile",
      "title": "Trois crises, trois priorités",
      "missionQuestion": "Quel auteur est le plus directement interpellé par ce cas ?",
      "prompt": "L’État est stable, les rues sont sûres et les accords sont exécutés, mais le gouvernement confisque arbitrairement les biens de certains citoyens, interdit tout recours et ne justifie aucune limite à son pouvoir.",
      "answer": "Locke",
      "aliases": [
        "John Locke",
        "locke : droits et limites du pouvoir"
      ],
      "blockedGuesses": [
        "Hobbes : il manque surtout une puissance commune",
        "Rousseau : le problème est uniquement l'absence de sondage",
        "aucun : la stabilité suffit à rendre le pouvoir légitime"
      ],
      "explanation": "Le cas met au premier plan la protection des droits et les limites d’un gouvernement déjà établi, une problématique particulièrement lockéenne.",
      "discipline": "philosophy",
      "caseTitle": "Atelier de raisonnement",
      "subjectType": "problème philosophique",
      "periodHint": "raisonnement",
      "answerInstruction": "Choisis la réponse qui résiste le mieux au cas.",
      "clues": [
        "Isole la conclusion exacte avant de choisir.",
        "Cherche le critère ou la prémisse qui change réellement le cas.",
        "Écarte les réponses qui ajoutent une information absente ou rendent la thèse artificiellement extrême."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "philosophyScenarioRC38": true
    }
  ]
};
  const cleanSection = section => {
    if (Array.isArray(section)) return { title: String(section[0] || ''), text: String(section[1] || '') };
    if (section && typeof section === 'object') return { title: String(section.title || section.heading || ''), text: String(section.text || section.body || '') };
    return { title: '', text: String(section || '') };
  };
  const titleById = Object.fromEntries(Object.entries(PAYLOAD.courses).map(([id,s])=>[id,s.title]));
  for (const [id,spec] of Object.entries(PAYLOAD.courses)) {
    const current = READY_LESSON_PACKS[id] || {};
    const inherited = Array.isArray(current.complete) ? current.complete.map(cleanSection).filter(s=>s.text) : [];
    const conceptual = inherited.slice(0, Math.min(5, inherited.length));
    READY_LESSON_PACKS[id] = {
      ...current,
      title: spec.title,
      hook: spec.hook,
      complete: [{title:'Le problème',text:spec.hook}, ...conceptual, {title:'Mise à l’épreuve',text:spec.practice}],
      takeaways: (spec.takeaways || []).map((text,index)=>({label:index===0?'À comprendre':index===1?'À tester':'À réutiliser',text})),
      quiz: spec.quiz,
      editorialStatus: 'published',
      contentRevision: 'rc38-philosophy-reasoning',
      philosophyExperience: {mode:'problem-argument-objection-production', redesigned:true}
    };
    PUBLISHED_LESSON_IDS.add(id);
  }
  try {
    for (const lessons of Object.values(data.lessons || {})) {
      if (!Array.isArray(lessons)) continue;
      for (const lesson of lessons) if (titleById[lesson?.id]) lesson.title = titleById[lesson.id];
    }
  } catch {}
  const oldLabs = window.HD_DISCIPLINE_LABS || {};
  window.HD_DISCIPLINE_LABS = {...oldLabs, philosophy: PAYLOAD.labs};
  if (Array.isArray(data.mysteries)) {
    const replacement = new Map(PAYLOAD.mysteries.map(item=>[item.id,item]));
    data.mysteries = data.mysteries.map(item=>item?.discipline==='philosophy' && replacement.has(item.id) ? replacement.get(item.id) : item);
    const known = new Set(data.mysteries.map(item=>item?.id));
    for (const item of PAYLOAD.mysteries) if (!known.has(item.id)) data.mysteries.push(item);
  }
  try {
    DISCIPLINE_MODE_COPY.philosophy = {
      ...(DISCIPLINE_MODE_COPY.philosophy || {}),
      headline:'Prends position, attaque l’argument, puis reconstruis-le.',
      promise:'Des problèmes concrets, des objections plausibles et des contre-exemples. Le but n’est pas de réciter les auteurs : c’est d’apprendre à raisonner.',
      discoveryTitle:'Problèmes à mettre à l’épreuve',
      discoveryIntro:'Distinguer, argumenter, objecter, chercher un contre-exemple et reformuler une position plus solide.'
    };
  } catch {}
  if (typeof invalidateCatalogCaches === 'function') invalidateCatalogCaches(); else try { lessonIndexCache = null; } catch {}
  try {
    window.HistoDaily = {...(window.HistoDaily||{}),version:VERSION,philosophyRedesignRC38:{version:VERSION,courses:Object.keys(PAYLOAD.courses).length,labs:PAYLOAD.labs.length,mysteries:PAYLOAD.mysteries.length,principles:['problem','argument','objection','counterexample','distinction','production']}};
  } catch {}
})();
