/* HistoDaily 1.0.0-rc.37.0 — English redesign: situation, intent, production. */
(function histodailyRC37EnglishRedesign(){
  "use strict";
  const VERSION = "1.0.0-rc.37.0";
  const PAYLOAD = {
  "courses": {
    "eng-context-inference": {
      "title": "Garder le fil quand un mot manque",
      "hook": "Ici, pas de liste de vocabulaire à réciter. Tu apprends à continuer une conversation ou une lecture même lorsqu’un mot t’échappe, en exploitant la scène, la grammaire et les conséquences.",
      "sections": [
        {
          "title": "1. Start with the scene",
          "text": "Lis d’abord la scène entière : “The café was packed, so we waited outside.” Même si packed t’échappe, café + so + waited outside te donnent déjà une hypothèse utile : il n’y avait probablement pas de place. En anglais réel, tu n’as pas besoin d’une traduction parfaite pour continuer. Le premier objectif est de préserver le sens global, puis d’affiner seulement si le détail devient important."
        },
        {
          "title": "2. Use what happens next",
          "text": "La suite d’une phrase agit comme une preuve. “The battery was dead, so the car wouldn’t start.” Dead pourrait avoir plusieurs sens dans un dictionnaire, mais la conséquence élimine presque tout : la batterie ne fournit plus d’énergie. Fais le même geste avec “The path was slippery, so we slowed down.” L’action qui suit transforme un mot inconnu en hypothèse raisonnable."
        },
        {
          "title": "3. Grammar narrows the field",
          "text": "La grammaire réduit encore les possibilités. Dans “She looked exhausted after the flight”, exhausted décrit l’état de she ; ce n’est ni un lieu ni une action future. Dans “We had to postpone the meeting”, postpone est l’action imposée après had to. Tu n’as peut-être pas encore le mot français exact, mais tu sais déjà quel rôle il joue et quel type de sens chercher."
        },
        {
          "title": "4. Keep uncertainty alive",
          "text": "Un bon lecteur n’invente pas une certitude. Si deux sens restent possibles, garde une compréhension provisoire : “quelque chose de négatif”, “une manière de parler”, “un objet lié à la cuisine”. Continue une ou deux phrases. Souvent, un nouvel indice tranche naturellement. Cette tolérance à l’incertitude est essentielle à l’oral, où sortir mentalement un dictionnaire à chaque trou fait perdre le fil."
        },
        {
          "title": "5. Check only when it matters",
          "text": "Vérifie un mot lorsqu’il bloque l’action, revient souvent ou change une décision. Si tu comprends qu’un train est delayed et que l’écran affiche une nouvelle heure, le mot précis est utile. Si un adjectif inconnu décrit simplement un décor et que l’histoire continue, tu peux le laisser en suspens. Le but n’est pas de deviner pour toujours : c’est de choisir quand l’effort de vérification vaut vraiment la peine."
        }
      ],
      "quiz": [
        {
          "kind": "inference",
          "q": "“The café was packed, so we waited outside.” Quelle conclusion est la mieux soutenue par la phrase ?",
          "a": "There were probably no free tables.",
          "choices": [
            "The café had stopped serving food.",
            "The waiter had lost our booking.",
            "The café was about to close."
          ],
          "why": "Waited outside est présenté comme la conséquence de packed : l’hypothèse la plus directe est donc un manque de place, sans inventer un autre événement.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "inference",
          "q": "“The battery was dead, so the car wouldn’t start.” Si dead est inconnu, quelle paraphrase conserve le mieux le sens ?",
          "a": "The battery had no usable power.",
          "choices": [
            "The battery was physically damaged.",
            "The battery had been removed.",
            "The battery was recently replaced."
          ],
          "why": "La voiture ne démarre pas à cause de l’état de la batterie ; “no usable power” reconstruit cette relation sans traduire dead mot à mot.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "grammar",
          "q": "Dans “She looked exhausted after the flight”, quel rôle joue exhausted ?",
          "a": "It describes how she seemed after the flight.",
          "choices": [
            "It tells us where she looked.",
            "It names something she did during the flight.",
            "It explains why the flight was delayed."
          ],
          "why": "Après look comme verbe de liaison, exhausted décrit l’état apparent de la personne ; les autres réponses ajoutent des informations absentes.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "strategy",
          "q": "Tu lis un article et un adjectif inconnu décrit la couleur d’un bâtiment sans modifier l’action. Quel réflexe est le plus utile ?",
          "a": "Keep reading and see whether the word matters later.",
          "choices": [
            "Stop immediately and translate every possible meaning.",
            "Replace the word with the first French cognate you notice.",
            "Skip the whole sentence because one detail is uncertain."
          ],
          "why": "La compréhension globale est déjà intacte : continuer permet de garder le rythme et de vérifier seulement si le détail devient pertinent.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "transfer",
          "q": "“The pavement was slick, so I walked more slowly.” Sans connaître slick, que peux-tu raisonnablement inférer ?",
          "a": "The pavement made walking less secure.",
          "choices": [
            "The pavement was unusually wide.",
            "The pavement had just been repaired.",
            "The pavement was crowded with people."
          ],
          "why": "Le ralentissement est une réaction à slick ; on peut donc inférer un problème d’adhérence ou de stabilité sans exiger une traduction exacte.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        }
      ],
      "express": [
        "Lis d’abord la scène entière : “The café was packed, so we waited outside.” Même si packed t’échappe, café + so + waited outside te donnent déjà une hypothèse utile : il n’y avait probablement pas de place. En anglais réel, tu n’as pas besoin d’une traduction parfaite pour continuer. Le premier objectif est de préserver le sens global, puis d’affiner seulement si le détail devient important.",
        "La suite d’une phrase agit comme une preuve. “The battery was dead, so the car wouldn’t start.” Dead pourrait avoir plusieurs sens dans un dictionnaire, mais la conséquence élimine presque tout : la batterie ne fournit plus d’énergie. Fais le même geste avec “The path was slippery, so we slowed down.” L’action qui suit transforme un mot inconnu en hypothèse raisonnable.",
        "La grammaire réduit encore les possibilités. Dans “She looked exhausted after the flight”, exhausted décrit l’état de she ; ce n’est ni un lieu ni une action future. Dans “We had to postpone the meeting”, postpone est l’action imposée après had to. Tu n’as peut-être pas encore le mot français exact, mais tu sais déjà quel rôle il joue et quel type de sens chercher."
      ],
      "takeaways": [
        {
          "label": "Réflexe",
          "text": "Ici, pas de liste de vocabulaire à réciter. Tu apprends à continuer une conversation ou une lecture même lorsqu’un mot t’échappe, en exploitant la scène, la grammaire et les conséquences."
        },
        {
          "label": "À pratiquer",
          "text": "Choisis ou produis la formulation qui convient à la scène, puis explique ce qui change si le contexte, la relation ou l’intention change."
        }
      ]
    },
    "eng-context-reference": {
      "title": "Suivre qui, quoi et ce que “it” désigne vraiment",
      "hook": "Comprendre l’anglais naturel demande souvent de suivre des références plutôt que de traduire des mots. One, it, they, this ou that peuvent reprendre un objet, une personne ou même toute une idée.",
      "sections": [
        {
          "title": "1. Rebuild the missing noun",
          "text": "“I need a charger. Do you have one?” One ne signifie pas “un” au sens isolé : il remplace charger. À l’oral, les anglophones évitent constamment les répétitions de ce type. Le réflexe utile consiste à réinsérer mentalement le nom : “Do you have a charger?” Puis seulement tu continues. Avec ones, même principe : “Which shoes? The black ones” = the black shoes."
        },
        {
          "title": "2. Follow pronouns across sentences",
          "text": "Dans “Maya called Lucy because she needed help”, she peut renvoyer à Maya ou Lucy. Parfois le contexte tranche ; parfois non. Un bon lecteur ne force pas une réponse. Il repère les candidats compatibles, observe la phrase suivante et accepte une ambiguïté réelle si rien ne permet de décider. Cette compétence est plus proche d’une enquête de discours que d’un exercice de vocabulaire."
        },
        {
          "title": "3. This and that can point to an idea",
          "text": "“They cancelled the train at the last minute. That ruined our evening.” That reprend ici tout l’événement précédent, pas train. La question utile est : qu’est-ce qui peut logiquement “ruin our evening” ? L’objet train tout seul ne suffit pas ; c’est l’annulation tardive qui crée le problème. Le sens naît du lien entre propositions."
        },
        {
          "title": "4. Context beats nearest noun",
          "text": "Le nom le plus proche n’est pas automatiquement le bon référent. “I put the cake in the fridge because it was warm.” It renvoie normalement au cake si l’idée est de le refroidir, mais une autre scène pourrait rendre fridge pertinent. Teste chaque candidat dans le sens de la phrase : lequel rend l’action cohérente ? La syntaxe aide, mais la logique de la scène reste essentielle."
        },
        {
          "title": "5. Learn to notice ambiguity",
          "text": "À l’oral, demander clarification est normal : “Do you mean Maya or Lucy?” ou “When you say that, do you mean the cancellation?” Comprendre une langue, ce n’est pas seulement résoudre toutes les références ; c’est aussi détecter quand elles ne sont pas résolubles sans aide. Cette vigilance évite les faux contresens produits par une certitude trop rapide."
        }
      ],
      "quiz": [
        {
          "kind": "reference",
          "q": "“I tried two jackets. The first one was too small.” Que remplace one ?",
          "a": "The first jacket.",
          "choices": [
            "The first shop.",
            "The first size.",
            "The first time I tried something."
          ],
          "why": "One remplace le nom comptable jacket déjà introduit ; first sélectionne lequel des deux sans répéter le nom.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "reference",
          "q": "“The delivery arrived late. That annoyed the client.” Que reprend that ?",
          "a": "The fact that the delivery arrived late.",
          "choices": [
            "The delivery company itself.",
            "The client’s previous message.",
            "The physical package only."
          ],
          "why": "That peut condenser un événement entier ; c’est le retard, plutôt que l’objet colis isolé, qui explique naturellement l’agacement.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "ambiguity",
          "q": "“Anna texted Sophie after she got home.” Quelle lecture est correcte ?",
          "a": "The sentence is ambiguous without more context.",
          "choices": [
            "She definitely means Anna.",
            "She definitely means Sophie.",
            "She refers to home, not to a person."
          ],
          "why": "Deux personnes féminines sont compatibles avec she et la phrase seule ne fournit pas assez d’information pour trancher.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "reasoning",
          "q": "“I moved the soup off the stove because it was too hot.” Quel référent de it est le plus naturel ?",
          "a": "The soup.",
          "choices": [
            "The stove.",
            "The kitchen.",
            "The plate."
          ],
          "why": "Déplacer la soupe hors du feu est une réaction naturelle à une soupe trop chaude ; les autres référents ne correspondent pas aussi directement à l’action.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "repair",
          "q": "Tu n’es pas sûr de ce que “that” reprend dans une conversation. Quelle réponse maintient le mieux l’échange ?",
          "a": "When you say “that”, do you mean the delay?",
          "choices": [
            "What is the dictionary meaning of “that”?",
            "Can you repeat every sentence from the beginning?",
            "I’ll assume you mean the last noun."
          ],
          "why": "La question cible exactement l’incertitude et propose une hypothèse vérifiable sans interrompre toute la conversation.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        }
      ],
      "express": [
        "“I need a charger. Do you have one?” One ne signifie pas “un” au sens isolé : il remplace charger. À l’oral, les anglophones évitent constamment les répétitions de ce type. Le réflexe utile consiste à réinsérer mentalement le nom : “Do you have a charger?” Puis seulement tu continues. Avec ones, même principe : “Which shoes? The black ones” = the black shoes.",
        "Dans “Maya called Lucy because she needed help”, she peut renvoyer à Maya ou Lucy. Parfois le contexte tranche ; parfois non. Un bon lecteur ne force pas une réponse. Il repère les candidats compatibles, observe la phrase suivante et accepte une ambiguïté réelle si rien ne permet de décider. Cette compétence est plus proche d’une enquête de discours que d’un exercice de vocabulaire.",
        "“They cancelled the train at the last minute. That ruined our evening.” That reprend ici tout l’événement précédent, pas train. La question utile est : qu’est-ce qui peut logiquement “ruin our evening” ? L’objet train tout seul ne suffit pas ; c’est l’annulation tardive qui crée le problème. Le sens naît du lien entre propositions."
      ],
      "takeaways": [
        {
          "label": "Réflexe",
          "text": "Comprendre l’anglais naturel demande souvent de suivre des références plutôt que de traduire des mots. One, it, they, this ou that peuvent reprendre un objet, une personne ou même toute une idée."
        },
        {
          "label": "À pratiquer",
          "text": "Choisis ou produis la formulation qui convient à la scène, puis explique ce qui change si le contexte, la relation ou l’intention change."
        }
      ]
    },
    "eng-false-friends-core": {
      "title": "Actually, eventually, currently : choisir le mot qui fait le bon travail",
      "hook": "On ne va pas mémoriser une liste “anglais = français”. On va choisir entre plusieurs phrases grammaticales selon ce qu’on veut réellement faire : corriger, situer dans le temps ou raconter une issue.",
      "sections": [
        {
          "title": "1. Actually corrects or reframes",
          "text": "“I thought Ben was from London.” — “Actually, he’s from Manchester.” Actually intervient comme correction ou précision. Il peut aussi adoucir une contradiction : “Actually, I think the deadline is Thursday.” Si tu veux simplement dire “en ce moment”, currently ou at the moment sera plus direct. Le contraste est fonctionnel : correction d’une idée versus localisation temporelle."
        },
        {
          "title": "2. Currently locates the present situation",
          "text": "“I’m currently working in Lyon, but I normally live in Grenoble.” Currently décrit une situation présente, parfois temporaire. La phrase ne corrige pas forcément quelqu’un. Compare “Actually, I work in Lyon” : selon le contexte, cette version peut sonner comme une rectification. Le choix dépend donc de l’intention conversationnelle, pas d’une ressemblance avec le français."
        },
        {
          "title": "3. Eventually is the end of a process",
          "text": "“After three interviews, she eventually got the job.” Eventually signale le résultat final après du temps, des essais ou des étapes. Pour “éventuellement” au sens de possibilité, on utilisera plutôt possibly, perhaps, maybe ou une reformulation. En contexte, eventually s’entend souvent avec une histoire qui a une trajectoire : problème, attente, puis issue."
        },
        {
          "title": "4. Attend and assist swap the trap",
          "text": "“I attended the conference” signifie que j’y étais présent. “A colleague assisted me during the presentation” signifie qu’il m’a aidé. Les deux mots ressemblent à des mots français mais leurs rôles sont différents. Au lieu de réciter la paire, imagine deux scènes : entrer dans une salle pour attend ; apporter une aide concrète pour assist."
        },
        {
          "title": "5. Use collocations, not isolated labels",
          "text": "Apprends des blocs : currently unavailable, actually quite good, eventually managed to, attend a meeting, assist a customer. Une collocation te donne immédiatement une scène plausible et réduit le risque de faux ami. Quand tu hésites, demande-toi quel rôle la phrase doit jouer : corriger, dater, conclure une évolution, être présent ou aider."
        }
      ],
      "quiz": [
        {
          "kind": "natural-choice",
          "q": "Quel message convient si quelqu’un pense que tu habites à Paris et que tu veux le corriger ?",
          "a": "Actually, I live in Lille — I only work in Paris.",
          "choices": [
            "Currently, I live in Lille — I only work in Paris.",
            "Eventually, I live in Lille — I only work in Paris.",
            "Possibly, I live in Lille — I only work in Paris."
          ],
          "why": "Actually marque naturellement la correction d’une supposition ; currently pourrait décrire le présent mais ne signale pas aussi clairement la rectification.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "natural-choice",
          "q": "Tu veux dire que tu travailles temporairement à distance en ce moment. Quelle phrase est la plus directe ?",
          "a": "I’m currently working from home.",
          "choices": [
            "I’m actually working from home.",
            "I’m eventually working from home.",
            "I’m attending working from home."
          ],
          "why": "Currently situe simplement la situation présente ; actually ajouterait une nuance de correction qui n’est pas nécessaire dans ce contexte.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "meaning-in-context",
          "q": "“After several failed attempts, we eventually fixed it.” Quelle reformulation anglaise garde le mieux le sens ?",
          "a": "In the end, we managed to fix it.",
          "choices": [
            "For now, we are fixing it.",
            "Maybe we will fix it later.",
            "We fixed it by accident immediately."
          ],
          "why": "Eventually décrit l’issue après plusieurs tentatives ; “in the end” et “managed to” conservent cette progression.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "usage",
          "q": "Tu étais présent à une réunion hier. Quelle phrase est naturelle ?",
          "a": "I attended the meeting yesterday.",
          "choices": [
            "I assisted the meeting yesterday.",
            "I eventually the meeting yesterday.",
            "I currently went to the meeting yesterday."
          ],
          "why": "Attend signifie être présent à un événement ; assist demanderait une personne ou une tâche que tu as aidée.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "usage",
          "q": "Un collègue t’a aidé à installer un logiciel. Quelle phrase convient ?",
          "a": "A colleague assisted me with the installation.",
          "choices": [
            "A colleague attended me with the installation.",
            "A colleague currently me with the installation.",
            "A colleague eventually me with the installation."
          ],
          "why": "Assist se construit naturellement avec une personne aidée et une tâche ; attend ne porte pas ce sens d’aide.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        }
      ],
      "express": [
        "“I thought Ben was from London.” — “Actually, he’s from Manchester.” Actually intervient comme correction ou précision. Il peut aussi adoucir une contradiction : “Actually, I think the deadline is Thursday.” Si tu veux simplement dire “en ce moment”, currently ou at the moment sera plus direct. Le contraste est fonctionnel : correction d’une idée versus localisation temporelle.",
        "“I’m currently working in Lyon, but I normally live in Grenoble.” Currently décrit une situation présente, parfois temporaire. La phrase ne corrige pas forcément quelqu’un. Compare “Actually, I work in Lyon” : selon le contexte, cette version peut sonner comme une rectification. Le choix dépend donc de l’intention conversationnelle, pas d’une ressemblance avec le français.",
        "“After three interviews, she eventually got the job.” Eventually signale le résultat final après du temps, des essais ou des étapes. Pour “éventuellement” au sens de possibilité, on utilisera plutôt possibly, perhaps, maybe ou une reformulation. En contexte, eventually s’entend souvent avec une histoire qui a une trajectoire : problème, attente, puis issue."
      ],
      "takeaways": [
        {
          "label": "Réflexe",
          "text": "On ne va pas mémoriser une liste “anglais = français”. On va choisir entre plusieurs phrases grammaticales selon ce qu’on veut réellement faire : corriger, situer dans le temps ou raconter une issue."
        },
        {
          "label": "À pratiquer",
          "text": "Choisis ou produis la formulation qui convient à la scène, puis explique ce qui change si le contexte, la relation ou l’intention change."
        }
      ]
    },
    "eng-false-friends-second-wave": {
      "title": "Sensible, sensitive, comprehensive : sonner naturel plutôt que traduire",
      "hook": "Le piège n’est pas seulement le sens : c’est la combinaison naturelle des mots. On travaille donc avec des situations et des collocations, pas avec une colonne de traductions.",
      "sections": [
        {
          "title": "1. Sensible belongs to decisions",
          "text": "A sensible plan, a sensible precaution, sensible shoes : sensible évoque généralement le bon sens, le caractère pratique ou raisonnable. Si tu décris une décision prise parce que le temps manque, “the sensible option” sonne naturel. Pour une personne facilement affectée ou un sujet délicat, sensitive sera souvent le bon mot."
        },
        {
          "title": "2. Sensitive belongs to reactions and delicate topics",
          "text": "Sensitive skin réagit facilement ; a sensitive issue demande de la prudence ; sensitive information peut avoir des conséquences si elle est divulguée. Le mot ne signifie pas “raisonnable”. Compare : “Be sensitive when you discuss it” demande de la délicatesse ; “Be sensible and take an umbrella” demande du bon sens."
        },
        {
          "title": "3. Comprehensive means broad in coverage",
          "text": "A comprehensive guide couvre beaucoup d’aspects. A comprehensive review examine le sujet de manière étendue. Il ne décrit pas une personne “compréhensive”. Pour cette idée, understanding, sympathetic ou patient seront souvent plus proches selon la scène. Là encore, l’environnement du mot est plus utile qu’une traduction unique."
        },
        {
          "title": "4. Library and bookshop are different places",
          "text": "You borrow from a library; you buy from a bookshop or bookstore. Le verbe de la scène permet souvent de résoudre le faux ami avant même d’y penser. “I returned the novel to the library” décrit un prêt. “I ordered the novel from a bookshop” décrit un achat. Associe les mots à leurs actions typiques."
        },
        {
          "title": "5. Build contrast pairs you can reuse",
          "text": "Crée des paires qui vivent : sensible decision / sensitive topic ; comprehensive report / understanding manager ; borrow from a library / buy from a bookshop. Puis change un seul élément : “sensitive data”, “sensible budget”, “comprehensive insurance”. Le but est de sentir quelles associations paraissent attendues plutôt que de traduire à rebours depuis le français."
        }
      ],
      "quiz": [
        {
          "kind": "collocation",
          "q": "Un collègue propose de reporter une tâche non urgente parce que l’équipe est débordée. Quelle réaction est naturelle ?",
          "a": "That sounds like a sensible decision.",
          "choices": [
            "That sounds like a sensitive decision.",
            "That sounds like a comprehensive decision.",
            "That sounds like an understanding decision."
          ],
          "why": "Sensible évalue ici le caractère raisonnable et pratique du choix ; sensitive porterait plutôt sur la délicatesse ou la réactivité.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "collocation",
          "q": "Tu avertis qu’un document contient des données confidentielles. Quelle formulation convient ?",
          "a": "This file contains sensitive information.",
          "choices": [
            "This file contains sensible information.",
            "This file contains understanding information.",
            "This file contains sympathetic information."
          ],
          "why": "Sensitive information est une collocation courante pour des données délicates ; sensible ne décrit pas ce type de contenu.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "meaning-in-context",
          "q": "“The report gives a comprehensive overview of the project.” Que suggère comprehensive ?",
          "a": "It covers the project broadly and in detail.",
          "choices": [
            "It explains the project in very simple language.",
            "It agrees with everyone involved in the project.",
            "It focuses only on the most urgent problem."
          ],
          "why": "Comprehensive concerne l’étendue de la couverture ; il ne dit ni que le texte est facile ni qu’il est conciliant.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "natural-choice",
          "q": "Tu veux acheter un roman neuf. Quelle phrase correspond à cette scène ?",
          "a": "I ordered it from a bookshop.",
          "choices": [
            "I borrowed it from a bookshop.",
            "I ordered it from the library.",
            "I returned it to the bookshop after three weeks."
          ],
          "why": "Bookshop est le lieu d’achat ; library correspond plutôt au prêt et au retour de livres empruntés.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "contrast",
          "q": "Quel couple montre correctement la différence ?",
          "a": "a sensible precaution / a sensitive subject",
          "choices": [
            "a sensitive precaution / a sensible subject",
            "a comprehensive person / an understanding report",
            "a library purchase / a bookshop loan"
          ],
          "why": "Le premier associe le bon sens à precaution et la délicatesse à subject, ce qui correspond aux usages naturels des deux adjectifs.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        }
      ],
      "express": [
        "A sensible plan, a sensible precaution, sensible shoes : sensible évoque généralement le bon sens, le caractère pratique ou raisonnable. Si tu décris une décision prise parce que le temps manque, “the sensible option” sonne naturel. Pour une personne facilement affectée ou un sujet délicat, sensitive sera souvent le bon mot.",
        "Sensitive skin réagit facilement ; a sensitive issue demande de la prudence ; sensitive information peut avoir des conséquences si elle est divulguée. Le mot ne signifie pas “raisonnable”. Compare : “Be sensitive when you discuss it” demande de la délicatesse ; “Be sensible and take an umbrella” demande du bon sens.",
        "A comprehensive guide couvre beaucoup d’aspects. A comprehensive review examine le sujet de manière étendue. Il ne décrit pas une personne “compréhensive”. Pour cette idée, understanding, sympathetic ou patient seront souvent plus proches selon la scène. Là encore, l’environnement du mot est plus utile qu’une traduction unique."
      ],
      "takeaways": [
        {
          "label": "Réflexe",
          "text": "Le piège n’est pas seulement le sens : c’est la combinaison naturelle des mots. On travaille donc avec des situations et des collocations, pas avec une colonne de traductions."
        },
        {
          "label": "À pratiquer",
          "text": "Choisis ou produis la formulation qui convient à la scène, puis explique ce qui change si le contexte, la relation ou l’intention change."
        }
      ]
    },
    "eng-still-yet-already-even": {
      "title": "Still, yet, already, even : sentir l’attente derrière la phrase",
      "hook": "Ces mots ne servent pas seulement à placer une action dans le temps. Ils montrent ce que le locuteur attendait, ce qui continue, ce qui arrive tôt ou ce qui le surprend.",
      "sections": [
        {
          "title": "1. Still = continuation against a reference point",
          "text": "“I’m still waiting.” La situation a commencé avant et continue maintenant. Selon le ton, still peut aussi suggérer que cela dure plus longtemps que prévu. “Are you still working?” ne demande pas seulement un état : la question compare le présent à une attente implicite. Écoute donc ce que le locuteur pensait devoir avoir changé."
        },
        {
          "title": "2. Yet = expected but not completed",
          "text": "“I haven’t finished yet.” Le travail n’est pas fini, mais l’accomplissement reste attendu. Dans une question, “Have you finished yet?” demande si le point attendu a été atteint. Yet ne ferme donc pas la porte ; il place l’action sur une ligne où l’on attend encore un changement."
        },
        {
          "title": "3. Already = earlier than the reference point",
          "text": "“You’ve already finished?” peut exprimer une simple constatation ou une surprise : la fin arrive plus tôt que prévu. “I already knew that” place la connaissance avant un moment de référence. Le mot ne signifie pas seulement “déjà” : son intérêt vient de la comparaison avec ce qu’on croyait être le calendrier normal."
        },
        {
          "title": "4. Even = surprising member of a scale",
          "text": "“Even Alex understood the instructions.” La phrase suppose une échelle implicite : si Alex est présenté comme le cas le moins attendu, son succès rend le résultat remarquable. Le mot ne donne pas une date. Il sélectionne un cas surprenant parmi d’autres possibilités. Le contexte te dit pourquoi ce cas est inattendu."
        },
        {
          "title": "5. Compare the same scene",
          "text": "Imagine un rapport : “I’m still writing it” = ça continue ; “I haven’t sent it yet” = l’envoi reste attendu ; “I’ve already sent it” = l’envoi est accompli, éventuellement plus tôt que prévu ; “Even Marta has sent hers” = Marta devient le cas surprenant. Travailler la même scène permet de sentir la nuance plutôt que mémoriser quatre traductions séparées."
        }
      ],
      "quiz": [
        {
          "kind": "nuance",
          "q": "À 18 h, un collègue dit “I’m still working on the report.” Quelle nuance est la plus probable ?",
          "a": "The work started earlier and is continuing now.",
          "choices": [
            "The report was completed earlier than expected.",
            "The report has not been started yet.",
            "The report is surprising because someone else wrote it."
          ],
          "why": "Still relie le présent à une situation commencée auparavant et suggère souvent que sa continuation mérite d’être remarquée.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "nuance",
          "q": "“I haven’t heard from Sam yet.” Quelle réponse paraphrase le mieux l’idée ?",
          "a": "I’m still waiting for a message from Sam.",
          "choices": [
            "Sam has definitely decided not to reply.",
            "Sam replied earlier than I expected.",
            "I received a surprising message from Sam."
          ],
          "why": "Yet maintient l’attente ouverte : aucun message jusqu’à maintenant, sans conclure que Sam ne répondra pas.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "nuance",
          "q": "Tu pensais qu’un travail prendrait toute la journée et quelqu’un dit à midi “I’ve already finished.” Que peut suggérer already ?",
          "a": "The task was completed earlier than the speaker expected.",
          "choices": [
            "The task is continuing longer than expected.",
            "The task may never be completed.",
            "The task was completed by an unexpected person."
          ],
          "why": "Already compare implicitement l’achèvement au calendrier attendu et peut donc signaler une avance.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "nuance",
          "q": "“Even Chris remembered the password.” Que faut-il inférer pour que even soit naturel ?",
          "a": "Chris was one of the less expected people to remember it.",
          "choices": [
            "Chris remembered it before everyone else.",
            "Chris is still trying to remember it.",
            "Chris has not remembered it up to now."
          ],
          "why": "Even place Chris à une extrémité d’une échelle implicite de probabilité ou d’attente ; c’est ce contraste qui crée la surprise.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "transfer",
          "q": "Tu veux dire “ce n’est pas fini pour l’instant, mais je compte le finir”. Quelle phrase convient le mieux ?",
          "a": "I haven’t finished it yet.",
          "choices": [
            "I’m already finishing it.",
            "I even finished it.",
            "I still finished it."
          ],
          "why": "La négation avec yet exprime précisément l’absence d’achèvement jusqu’à présent tout en gardant l’achèvement comme attente ouverte.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        }
      ],
      "express": [
        "“I’m still waiting.” La situation a commencé avant et continue maintenant. Selon le ton, still peut aussi suggérer que cela dure plus longtemps que prévu. “Are you still working?” ne demande pas seulement un état : la question compare le présent à une attente implicite. Écoute donc ce que le locuteur pensait devoir avoir changé.",
        "“I haven’t finished yet.” Le travail n’est pas fini, mais l’accomplissement reste attendu. Dans une question, “Have you finished yet?” demande si le point attendu a été atteint. Yet ne ferme donc pas la porte ; il place l’action sur une ligne où l’on attend encore un changement.",
        "“You’ve already finished?” peut exprimer une simple constatation ou une surprise : la fin arrive plus tôt que prévu. “I already knew that” place la connaissance avant un moment de référence. Le mot ne signifie pas seulement “déjà” : son intérêt vient de la comparaison avec ce qu’on croyait être le calendrier normal."
      ],
      "takeaways": [
        {
          "label": "Réflexe",
          "text": "Ces mots ne servent pas seulement à placer une action dans le temps. Ils montrent ce que le locuteur attendait, ce qui continue, ce qui arrive tôt ou ce qui le surprend."
        },
        {
          "label": "À pratiquer",
          "text": "Choisis ou produis la formulation qui convient à la scène, puis explique ce qui change si le contexte, la relation ou l’intention change."
        }
      ]
    },
    "eng-small-words-just-quite": {
      "title": "Just, quite, rather, pretty : régler le ton sans surtraduire",
      "hook": "Les petits adverbes changent souvent la relation plus que le contenu. On apprend à entendre leur effet : adoucir, minimiser, intensifier ou signaler une surprise.",
      "sections": [
        {
          "title": "1. Just can soften a request",
          "text": "“I just wanted to check whether you saw my email.” Just peut rendre l’entrée moins abrupte : le locuteur présente sa demande comme limitée. Ce n’est pas une règle de politesse automatique, mais un effet fréquent. Compare “I want to know why you haven’t replied” : le contenu est proche, le niveau de pression ne l’est pas."
        },
        {
          "title": "2. Just can also mean only or very recently",
          "text": "“It’s just a suggestion” minimise l’importance : ce n’est qu’une suggestion. “I’ve just arrived” situe l’action dans un passé très récent. La structure et le temps verbal t’indiquent la fonction. Chercher une traduction unique de just crée donc des contresens ; cherche plutôt ce que le mot fait dans la phrase."
        },
        {
          "title": "3. Quite depends on the adjective and variety",
          "text": "“It’s quite good” peut être une appréciation modérée ou franchement positive selon le locuteur et la variété d’anglais. Avec un adjectif plus absolu, “quite impossible” peut renforcer fortement. Ce n’est pas un bouton d’intensité fixe. Le contexte, l’intonation et le type d’adjectif comptent davantage qu’une équivalence “quite = assez”."
        },
        {
          "title": "4. Pretty is often an informal intensifier",
          "text": "“It’s pretty cold” ne parle pas d’apparence. Pretty fonctionne comme un intensifieur courant et assez informel. “The film was pretty good” peut être sincèrement positif sans être extravagant. À l’oral, l’intonation peut encore augmenter ou réduire la force. Apprends le bloc entier plutôt que le mot séparé."
        },
        {
          "title": "5. Rather can sound more marked",
          "text": "“That’s rather unusual” peut sembler plus soutenu ou signaler une légère surprise. “I’d rather stay home” est une autre construction : would rather exprime une préférence. Le même mot participe donc à deux mécanismes différents. Pour choisir, identifie d’abord la structure, puis demande quel ton ou quelle comparaison le locuteur construit."
        }
      ],
      "quiz": [
        {
          "kind": "pragmatics",
          "q": "Un collègue relance doucement un e-mail sans vouloir paraître accusateur. Quelle ouverture convient le mieux ?",
          "a": "I just wanted to check whether you saw my message.",
          "choices": [
            "I need to know why you ignored my message.",
            "You still haven’t answered my message.",
            "I am checking your failure to reply."
          ],
          "why": "Just wanted to check réduit la pression et présente la relance comme une vérification, contrairement aux autres formulations plus accusatrices.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "meaning-in-context",
          "q": "“I’ve just got home.” Que fait just ici ?",
          "a": "It places the arrival in the very recent past.",
          "choices": [
            "It means home is the only place available.",
            "It makes the sentence more formal.",
            "It suggests the speaker is uncertain about arriving."
          ],
          "why": "Avec le present perfect et une action d’arrivée, just signale naturellement qu’elle vient de se produire.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "register",
          "q": "Quelle phrase sonne la plus naturelle dans une conversation informelle pour dire qu’un examen était assez difficile ?",
          "a": "The exam was pretty difficult.",
          "choices": [
            "The exam was comprehensively difficult.",
            "The exam was sensitively difficult.",
            "The exam was currently difficult."
          ],
          "why": "Pretty est un intensifieur informel courant devant un adjectif gradable ; les autres adverbes ne remplissent pas cette fonction.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "nuance",
          "q": "“That’s rather unusual.” Quelle lecture est la plus plausible ?",
          "a": "The speaker finds it noticeably unusual, perhaps with some surprise.",
          "choices": [
            "The speaker is saying it is completely normal.",
            "The speaker is asking for a preference.",
            "The speaker means it happened very recently."
          ],
          "why": "Rather intensifie ici unusual et peut ajouter une coloration un peu marquée ou surprise ; ce n’est pas la structure would rather.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "contrast",
          "q": "Quelle paire montre deux fonctions différentes de just ?",
          "a": "I’ve just arrived / It’s just a suggestion.",
          "choices": [
            "I’m quite tired / I’d rather leave.",
            "It’s pretty cold / It’s rather cold.",
            "I’m still here / I haven’t left yet."
          ],
          "why": "Dans la première phrase just marque la récence ; dans la seconde il minimise en donnant l’idée de “seulement”.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        }
      ],
      "express": [
        "“I just wanted to check whether you saw my email.” Just peut rendre l’entrée moins abrupte : le locuteur présente sa demande comme limitée. Ce n’est pas une règle de politesse automatique, mais un effet fréquent. Compare “I want to know why you haven’t replied” : le contenu est proche, le niveau de pression ne l’est pas.",
        "“It’s just a suggestion” minimise l’importance : ce n’est qu’une suggestion. “I’ve just arrived” situe l’action dans un passé très récent. La structure et le temps verbal t’indiquent la fonction. Chercher une traduction unique de just crée donc des contresens ; cherche plutôt ce que le mot fait dans la phrase.",
        "“It’s quite good” peut être une appréciation modérée ou franchement positive selon le locuteur et la variété d’anglais. Avec un adjectif plus absolu, “quite impossible” peut renforcer fortement. Ce n’est pas un bouton d’intensité fixe. Le contexte, l’intonation et le type d’adjectif comptent davantage qu’une équivalence “quite = assez”."
      ],
      "takeaways": [
        {
          "label": "Réflexe",
          "text": "Les petits adverbes changent souvent la relation plus que le contenu. On apprend à entendre leur effet : adoucir, minimiser, intensifier ou signaler une surprise."
        },
        {
          "label": "À pratiquer",
          "text": "Choisis ou produis la formulation qui convient à la scène, puis explique ce qui change si le contexte, la relation ou l’intention change."
        }
      ]
    },
    "eng-polite-register": {
      "title": "Demander sans sonner brutal ni cérémonieux",
      "hook": "La politesse utile n’est pas “mettre le maximum de mots polis”. On calibre une demande selon la relation, l’urgence et le coût imposé à l’autre.",
      "sections": [
        {
          "title": "1. Direct is not the same as rude",
          "text": "“Send me the file” peut être normal entre proches dans une situation rapide, mais abrupt avec un collègue peu connu. “Could you send me the file?” ajoute une distance polie sans devenir cérémonieux. La question n’est donc pas “quelle phrase est grammaticalement correcte ?” mais “quelle phrase convient à cette relation précise ?”."
        },
        {
          "title": "2. Add a reason when it helps",
          "text": "“Could you send me the figures by noon? I need them for the client call.” Une raison brève rend la demande plus facile à interpréter et évite l’impression d’une exigence arbitraire. Inutile toutefois d’empiler excuses et justifications. Un anglais naturel préfère souvent une demande claire, une contrainte réelle et une marge si elle existe."
        },
        {
          "title": "3. Soften bad news, not the facts",
          "text": "“I’m afraid we can’t offer a refund” ou “Unfortunately, we can’t offer a refund” préparent une information négative sans masquer le message. Être poli ne signifie pas devenir vague. Si la décision est ferme, “I’m not sure we can…” peut créer une ambiguïté inutile. Le bon registre protège la relation tout en gardant le contenu compréhensible."
        },
        {
          "title": "4. Friends, colleagues, clients",
          "text": "À un ami : “Can you send me the address?” À un collègue : “Could you send me the address when you get a chance?” À un client : “Would you mind confirming the address?” Ces exemples ne forment pas une échelle rigide ; ils montrent comment la distance sociale et le coût de la demande modifient la formulation."
        },
        {
          "title": "5. Natural politeness is economical",
          "text": "Les formulations comme “I humbly request that you might perhaps…” sont grammaticales mais disproportionnées dans un e-mail ordinaire. La politesse naturelle repose souvent sur quelques outils : could, would you mind, when you have a moment, unfortunately, thanks. Le but est que l’autre comprenne vite ce que tu veux sans ressentir une pression inutile."
        }
      ],
      "quiz": [
        {
          "kind": "register",
          "q": "Tu demandes un document non urgent à un collègue que tu connais peu. Quelle phrase est la mieux calibrée ?",
          "a": "Could you send me the document when you have a minute?",
          "choices": [
            "Send me the document when you see this.",
            "Would you be so kind as to transmit the aforementioned document at your earliest convenience?",
            "I was wondering whether there might possibly be any chance of getting the document someday."
          ],
          "why": "La bonne réponse reste claire et polie sans être impérative ni excessivement cérémonieuse ou vague.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "register",
          "q": "Tu écris à un ami proche qui doit t’envoyer une adresse dans la journée. Quelle phrase paraît naturelle ?",
          "a": "Can you send me the address when you get a sec?",
          "choices": [
            "Would you mind formally confirming the postal details at your earliest convenience?",
            "I require the address to be transmitted to me.",
            "I’m afraid I must request the address from you."
          ],
          "why": "Avec un proche, une demande simple et directe est naturelle ; les autres formulations créent une distance ou une solennité artificielle.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "bad-news",
          "q": "Un remboursement est définitivement impossible. Quelle phrase est à la fois polie et claire ?",
          "a": "I’m afraid we can’t offer a refund in this case.",
          "choices": [
            "I’m not sure a refund would maybe be possible.",
            "A refund is impossible, obviously.",
            "Perhaps the refund situation is not ideal."
          ],
          "why": "I’m afraid atténue la mauvaise nouvelle tout en gardant la décision ferme ; les autres réponses sont soit ambiguës, soit inutilement dures ou floues.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "reason",
          "q": "Pourquoi “Could you send it by noon? I need it for the client call.” fonctionne bien ?",
          "a": "It combines a clear request with a useful reason.",
          "choices": [
            "It makes the deadline sound optional.",
            "It avoids saying what the speaker actually needs.",
            "It is more formal because every sentence is long."
          ],
          "why": "La contrainte est explicite et la raison permet à l’autre de comprendre pourquoi midi compte, sans ajouter de lourdeur.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "transfer",
          "q": "Tu veux refuser une proposition sans fermer brutalement la discussion. Quelle réponse convient ?",
          "a": "I don’t think that option will work for us, but we could try the second one.",
          "choices": [
            "No. That option won’t work. Next.",
            "That is perhaps an interesting possibility of uncertain relevance.",
            "I’m afraid of that option."
          ],
          "why": "La formulation exprime un désaccord net puis ouvre une alternative, ce qui protège à la fois la clarté et la coopération.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        }
      ],
      "express": [
        "“Send me the file” peut être normal entre proches dans une situation rapide, mais abrupt avec un collègue peu connu. “Could you send me the file?” ajoute une distance polie sans devenir cérémonieux. La question n’est donc pas “quelle phrase est grammaticalement correcte ?” mais “quelle phrase convient à cette relation précise ?”.",
        "“Could you send me the figures by noon? I need them for the client call.” Une raison brève rend la demande plus facile à interpréter et évite l’impression d’une exigence arbitraire. Inutile toutefois d’empiler excuses et justifications. Un anglais naturel préfère souvent une demande claire, une contrainte réelle et une marge si elle existe.",
        "“I’m afraid we can’t offer a refund” ou “Unfortunately, we can’t offer a refund” préparent une information négative sans masquer le message. Être poli ne signifie pas devenir vague. Si la décision est ferme, “I’m not sure we can…” peut créer une ambiguïté inutile. Le bon registre protège la relation tout en gardant le contenu compréhensible."
      ],
      "takeaways": [
        {
          "label": "Réflexe",
          "text": "La politesse utile n’est pas “mettre le maximum de mots polis”. On calibre une demande selon la relation, l’urgence et le coût imposé à l’autre."
        },
        {
          "label": "À pratiquer",
          "text": "Choisis ou produis la formulation qui convient à la scène, puis explique ce qui change si le contexte, la relation ou l’intention change."
        }
      ]
    },
    "eng-register-email-directness": {
      "title": "E-mails : écrire clair, humain et au bon niveau de pression",
      "hook": "Un bon e-mail anglais n’est pas forcément plus poli parce qu’il est plus long. On travaille le niveau de pression, l’objet de la demande et les formulations qui sonnent réellement professionnelles.",
      "sections": [
        {
          "title": "1. Put the action where it can be seen",
          "text": "“Could you confirm the date by Thursday?” permet de comprendre immédiatement l’action attendue et l’échéance. Un e-mail qui commence par quatre phrases de contexte peut être poli mais difficile à traiter. En anglais professionnel, une demande claire n’est pas impolie si elle est correctement calibrée. Place le besoin assez tôt, puis ajoute le contexte utile."
        },
        {
          "title": "2. A follow-up should not accuse by default",
          "text": "“Just checking whether you had a chance to look at this” est une relance neutre. “You still haven’t replied” transforme la même situation en reproche. Parfois le reproche est justifié, mais il ne doit pas être accidentel. Choisis donc consciemment le niveau de pression au lieu de traduire une formule française mot à mot."
        },
        {
          "title": "3. Deadlines can be firm without sounding hostile",
          "text": "“Could you send the final version by 3 pm? We need to submit it today.” est ferme : l’heure et la raison sont explicites. Ajouter “if possible” quand l’échéance n’est pas réellement optionnelle affaiblit inutilement le message. La diplomatie ne consiste pas à cacher une contrainte réelle."
        },
        {
          "title": "4. Requests and reminders need different tones",
          "text": "Première demande : “Could you send me the invoice?” Relance : “Just following up on the invoice below.” Escalade : “We still need the invoice today to process payment.” Même objectif, trois moments différents. Le registre évolue avec l’historique de l’échange, pas seulement avec le statut des personnes."
        },
        {
          "title": "5. Close with the next step",
          "text": "Une fin utile indique la suite : “Let me know if Thursday is a problem.”, “Thanks — I’ll review it this afternoon.” ou “If I don’t hear back, I’ll use the current version.” Ces phrases réduisent l’ambiguïté opérationnelle. L’e-mail devient un outil d’action, pas seulement une démonstration de politesse."
        }
      ],
      "quiz": [
        {
          "kind": "email",
          "q": "Première relance après deux jours, sans urgence particulière. Quelle phrase est la plus adaptée ?",
          "a": "Just checking whether you had a chance to look at the draft.",
          "choices": [
            "You still haven’t replied to my draft.",
            "I require an immediate response regarding the draft.",
            "I assume the draft has been rejected because you did not answer."
          ],
          "why": "La bonne phrase vérifie l’état sans attribuer de faute ni inventer une conclusion ; elle laisse à l’autre une sortie naturelle.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "email",
          "q": "L’échéance de 15 h est réelle et non négociable. Quelle formulation est la plus claire ?",
          "a": "Could you send the final version by 3 pm? We need to submit it today.",
          "choices": [
            "Could you maybe send it by 3 pm if that happens to be convenient?",
            "Send it at 3 pm. No excuses.",
            "I was wondering about the general possibility of a final version."
          ],
          "why": "La phrase combine politesse, heure précise et raison ; elle n’affaiblit pas artificiellement une contrainte réellement ferme.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "email",
          "q": "Quel début d’e-mail rend l’action la plus immédiatement visible ?",
          "a": "Could you confirm the meeting time for Friday?",
          "choices": [
            "I hope this message finds you well. I wanted to reach out regarding a matter.",
            "Following our recent correspondence and various considerations, I am writing today.",
            "There are several things that may be worth discussing before Friday."
          ],
          "why": "La demande précise apparaît dès la première ligne ; les autres ouvertures retardent l’information dont le lecteur a besoin pour agir.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "email",
          "q": "Après deux relances ignorées et un paiement bloqué, quelle phrase augmente raisonnablement la pression ?",
          "a": "We still need the invoice today to process the payment.",
          "choices": [
            "Just checking in whenever you have a spare moment.",
            "I suppose the invoice might arrive eventually.",
            "You are clearly refusing to send the invoice."
          ],
          "why": "Le message explique maintenant la conséquence et l’urgence sans passer directement à une accusation personnelle non démontrée.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "email",
          "q": "Quelle fin réduit le mieux l’ambiguïté sur la suite ?",
          "a": "Let me know by Thursday if that deadline is a problem.",
          "choices": [
            "Thanks in advance for your understanding.",
            "Best regards and many thanks again.",
            "I hope everything works out somehow."
          ],
          "why": "La bonne fin indique quoi signaler et quand ; elle transforme la formule de clôture en prochaine étape exploitable.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        }
      ],
      "express": [
        "“Could you confirm the date by Thursday?” permet de comprendre immédiatement l’action attendue et l’échéance. Un e-mail qui commence par quatre phrases de contexte peut être poli mais difficile à traiter. En anglais professionnel, une demande claire n’est pas impolie si elle est correctement calibrée. Place le besoin assez tôt, puis ajoute le contexte utile.",
        "“Just checking whether you had a chance to look at this” est une relance neutre. “You still haven’t replied” transforme la même situation en reproche. Parfois le reproche est justifié, mais il ne doit pas être accidentel. Choisis donc consciemment le niveau de pression au lieu de traduire une formule française mot à mot.",
        "“Could you send the final version by 3 pm? We need to submit it today.” est ferme : l’heure et la raison sont explicites. Ajouter “if possible” quand l’échéance n’est pas réellement optionnelle affaiblit inutilement le message. La diplomatie ne consiste pas à cacher une contrainte réelle."
      ],
      "takeaways": [
        {
          "label": "Réflexe",
          "text": "Un bon e-mail anglais n’est pas forcément plus poli parce qu’il est plus long. On travaille le niveau de pression, l’objet de la demande et les formulations qui sonnent réellement professionnelles."
        },
        {
          "label": "À pratiquer",
          "text": "Choisis ou produis la formulation qui convient à la scène, puis explique ce qui change si le contexte, la relation ou l’intention change."
        }
      ]
    },
    "eng-phrasal-context": {
      "title": "Phrasal verbs : apprendre la scène, pas “verbe + particule”",
      "hook": "Run out, call off, figure out ou turn out deviennent plus faciles quand on les apprend comme des actions complètes dans une histoire. La traduction mot à mot devient secondaire.",
      "sections": [
        {
          "title": "1. Run out of = the resource reaches zero",
          "text": "“We ran out of coffee halfway through the meeting.” La scène est une ressource disponible qui arrive à zéro. Tu peux varier : run out of time, battery, patience, paper. L’important est le cadre commun, pas quatre traductions séparées. Si tu visualises une quantité qui s’épuise, le bloc devient immédiatement plus stable."
        },
        {
          "title": "2. Call off = a planned event will not happen",
          "text": "“They called off the match because of the storm.” Quelque chose était prévu puis annulé. Compare postpone : l’événement est déplacé, pas supprimé. En apprenant call off avec meeting, trip, search, match, tu construis un réseau d’usages naturels plutôt qu’une formule abstraite."
        },
        {
          "title": "3. Figure out = reach understanding or a solution",
          "text": "“I finally figured out why the app was crashing.” Le processus se termine par une compréhension ou une solution. Figure out a password, a problem, how something works. Le sens ne vient pas de figure + out ; il vient du type de résultat que la scène produit."
        },
        {
          "title": "4. Turn out = the final reality is revealed",
          "text": "“We thought the restaurant was closed, but it turned out to be open.” Turn out introduit souvent la réalité découverte après une attente, une erreur ou une incertitude. La structure “turn out to be” est particulièrement utile pour raconter un résultat surprenant ou différent de ce qu’on croyait."
        },
        {
          "title": "5. Learn by swapping the nouns",
          "text": "Construis “We ran out of ___”, “They called off ___”, “I figured out ___”, “It turned out to be ___”. Change uniquement le complément et vérifie si la scène reste naturelle. Cet exercice te force à apprendre les contraintes d’usage. Un phrasal verb devient alors un outil productif, pas une entrée de dictionnaire."
        }
      ],
      "quiz": [
        {
          "kind": "phrasal",
          "q": "“We ran out of time, so we skipped the last topic.” Que s’est-il passé ?",
          "a": "There was no time left for the last topic.",
          "choices": [
            "The meeting started later than expected.",
            "The last topic was too difficult to understand.",
            "Someone deliberately removed the final topic earlier."
          ],
          "why": "Run out of décrit une ressource arrivée à zéro ; la conséquence skipped the last topic confirme ici qu’il ne restait plus de temps.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "phrasal",
          "q": "Une conférence est annulée à cause d’une grève. Quelle phrase convient ?",
          "a": "They called off the conference because of the strike.",
          "choices": [
            "They figured out the conference because of the strike.",
            "They ran out of the conference because of the strike.",
            "The conference turned out because of the strike."
          ],
          "why": "Call off s’emploie naturellement lorsqu’un événement prévu est annulé ; les autres verbes décrivent d’autres types de scènes.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "phrasal",
          "q": "“I finally figured out how to export the file.” Quelle paraphrase garde le sens ?",
          "a": "I finally found the solution and understood how to do it.",
          "choices": [
            "I finally cancelled the export.",
            "I finally used up the file.",
            "I finally discovered the export was impossible."
          ],
          "why": "Figure out aboutit à une compréhension ou solution ; ici le résultat est de savoir comment effectuer l’export.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "phrasal",
          "q": "“The cheap charger turned out to be excellent.” Quelle idée est centrale ?",
          "a": "The final reality was better than expected.",
          "choices": [
            "The charger was returned to the shop.",
            "The charger stopped working after a while.",
            "The charger was deliberately switched off."
          ],
          "why": "Turn out to be révèle le résultat ou la réalité constatée après coup ; la phrase oppose ici l’attente liée au prix au résultat réel.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "transfer",
          "q": "Quelle combinaison est la plus naturelle ?",
          "a": "run out of patience / call off a trip / figure out a problem",
          "choices": [
            "run out of a meeting / call off a password / figure out some coffee",
            "run out a solution / call off some battery / figure out a storm",
            "run out to be late / call off patience / figure out a conference"
          ],
          "why": "Chaque phrasal verb impose un cadre sémantique différent : ressource épuisée, événement annulé, problème compris ou résolu.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        }
      ],
      "express": [
        "“We ran out of coffee halfway through the meeting.” La scène est une ressource disponible qui arrive à zéro. Tu peux varier : run out of time, battery, patience, paper. L’important est le cadre commun, pas quatre traductions séparées. Si tu visualises une quantité qui s’épuise, le bloc devient immédiatement plus stable.",
        "“They called off the match because of the storm.” Quelque chose était prévu puis annulé. Compare postpone : l’événement est déplacé, pas supprimé. En apprenant call off avec meeting, trip, search, match, tu construis un réseau d’usages naturels plutôt qu’une formule abstraite.",
        "“I finally figured out why the app was crashing.” Le processus se termine par une compréhension ou une solution. Figure out a password, a problem, how something works. Le sens ne vient pas de figure + out ; il vient du type de résultat que la scène produit."
      ],
      "takeaways": [
        {
          "label": "Réflexe",
          "text": "Run out, call off, figure out ou turn out deviennent plus faciles quand on les apprend comme des actions complètes dans une histoire. La traduction mot à mot devient secondaire."
        },
        {
          "label": "À pratiquer",
          "text": "Choisis ou produis la formulation qui convient à la scène, puis explique ce qui change si le contexte, la relation ou l’intention change."
        }
      ]
    },
    "eng-phrasal-get": {
      "title": "Get : reconnaître le résultat plutôt que traduire “obtenir”",
      "hook": "Get change énormément avec son complément. Le bon réflexe est d’identifier le résultat de la scène : revenir, se débrouiller, se remettre, s’en tirer ou finir par faire quelque chose.",
      "sections": [
        {
          "title": "1. Get back = return",
          "text": "“I’ll get back home around eight.” = revenir. “I’ll get back to you tomorrow” = revenir vers quelqu’un avec une réponse. Le noyau est un retour vers un point ou une interaction antérieure. Le contexte te dit si le retour est physique ou conversationnel."
        },
        {
          "title": "2. Get by = manage with what you have",
          "text": "“My Spanish isn’t great, but I can get by.” La personne n’est pas experte ; elle peut néanmoins gérer les situations nécessaires. Get by on little money utilise la même idée de fonctionner avec des ressources limitées. Ce n’est pas “passer à côté” au sens spatial."
        },
        {
          "title": "3. Get over = recover from",
          "text": "“It took me a week to get over the flu.” = se remettre. Le complément peut être illness, shock, breakup, disappointment. La scène décrit un état difficile puis une récupération progressive. Visualiser cette trajectoire rend le sens plus solide qu’une traduction isolée."
        },
        {
          "title": "4. Get away with = avoid the expected consequence",
          "text": "“He cheated and got away with it.” Il a fait quelque chose de répréhensible sans subir la conséquence attendue. Le sens est très différent de get away = partir/s’échapper. Le with introduit souvent précisément l’action dont la personne “s’en tire”."
        },
        {
          "title": "5. End up + -ing = final result",
          "text": "Même si ce n’est pas un phrasal de get, “We ended up taking the train” appartient au même apprentissage par résultat : le train est ce qui s’est finalement produit, pas forcément ce qui était prévu. Apprends ces blocs comme des conclusions de petites histoires et entraîne-toi à prédire la phrase suivante."
        }
      ],
      "quiz": [
        {
          "kind": "phrasal",
          "q": "“I’ll get back to you after I check the figures.” Quelle réponse paraphrase le mieux la phrase ?",
          "a": "I’ll contact you again once I have checked them.",
          "choices": [
            "I’ll return the figures to you physically.",
            "I’ll avoid checking the figures.",
            "I’ll recover from the figures later."
          ],
          "why": "Get back to someone signifie revenir vers cette personne avec une réponse ou un suivi ; la suite after I check the figures confirme ce sens.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "phrasal",
          "q": "“I don’t know much Italian, but I can get by.” Que dit le locuteur ?",
          "a": "I can manage basic situations despite my limits.",
          "choices": [
            "I can speak Italian at a near-native level.",
            "I can avoid using Italian completely.",
            "I can return to Italy whenever I want."
          ],
          "why": "Get by exprime une capacité suffisante pour fonctionner malgré des limites, pas une maîtrise complète ni un déplacement.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "phrasal",
          "q": "“She’s finally getting over the flu.” Quel changement est en cours ?",
          "a": "She is recovering from the illness.",
          "choices": [
            "She is starting to develop the illness.",
            "She is hiding the illness from someone.",
            "She is travelling despite the illness."
          ],
          "why": "Get over décrit la récupération après une maladie ou une expérience difficile ; finally renforce l’idée d’un processus qui a pris du temps.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "phrasal",
          "q": "“He broke the rule and got away with it.” Quelle conséquence est sous-entendue ?",
          "a": "He was not punished or stopped as expected.",
          "choices": [
            "He immediately admitted what he had done.",
            "He left the place before breaking the rule.",
            "He was rewarded for following the rule."
          ],
          "why": "Get away with something signifie échapper à la conséquence normalement attendue d’un comportement problématique.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "result",
          "q": "“We planned to drive, but we ended up taking the train.” Que montre end up ?",
          "a": "The train was the final outcome, not necessarily the original plan.",
          "choices": [
            "The train journey was cancelled.",
            "The drive and the train happened at the same time.",
            "Taking the train was always the fixed plan."
          ],
          "why": "End up + -ing raconte le résultat final après une évolution ou un changement de plan, ici explicitement opposé à planned to drive.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        }
      ],
      "express": [
        "“I’ll get back home around eight.” = revenir. “I’ll get back to you tomorrow” = revenir vers quelqu’un avec une réponse. Le noyau est un retour vers un point ou une interaction antérieure. Le contexte te dit si le retour est physique ou conversationnel.",
        "“My Spanish isn’t great, but I can get by.” La personne n’est pas experte ; elle peut néanmoins gérer les situations nécessaires. Get by on little money utilise la même idée de fonctionner avec des ressources limitées. Ce n’est pas “passer à côté” au sens spatial.",
        "“It took me a week to get over the flu.” = se remettre. Le complément peut être illness, shock, breakup, disappointment. La scène décrit un état difficile puis une récupération progressive. Visualiser cette trajectoire rend le sens plus solide qu’une traduction isolée."
      ],
      "takeaways": [
        {
          "label": "Réflexe",
          "text": "Get change énormément avec son complément. Le bon réflexe est d’identifier le résultat de la scène : revenir, se débrouiller, se remettre, s’en tirer ou finir par faire quelque chose."
        },
        {
          "label": "À pratiquer",
          "text": "Choisis ou produis la formulation qui convient à la scène, puis explique ce qui change si le contexte, la relation ou l’intention change."
        }
      ]
    },
    "eng-paraphrase-repair": {
      "title": "Le mot manque ? Continuer quand même en anglais",
      "hook": "La vraie fluidité n’est pas connaître tous les mots : c’est pouvoir rester dans la conversation quand un mot disparaît. On travaille la description, la fonction et la reformulation.",
      "sections": [
        {
          "title": "1. Describe the function",
          "text": "Le mot screwdriver te manque : “It’s the tool you use to tighten screws.” Tu donnes une catégorie approximative et surtout une fonction. L’autre personne peut deviner ou fournir le mot. Cette stratégie est beaucoup plus robuste que “How do you say tournevis?” car elle maintient le cerveau dans la langue cible et crée un contexte mémorable pour le nouveau vocabulaire."
        },
        {
          "title": "2. Describe shape, place or use",
          "text": "Pour kettle : “the thing you use to boil water for tea.” Pour shelf : “the flat part on a wall where you put books.” Pour receipt : “the paper you get after you pay.” Les définitions n’ont pas besoin d’être élégantes. Elles doivent seulement isoler l’objet assez bien pour que l’échange continue."
        },
        {
          "title": "3. Paraphrase abstract ideas too",
          "text": "Pour disappointed : “sad because something was not as good as you expected.” Pour reliable : “someone or something you can depend on.” Les idées abstraites se contournent avec cause, conséquence ou exemple. Cet exercice développe une compétence plus générale : exprimer le sens même quand le vocabulaire précis n’est pas disponible."
        },
        {
          "title": "4. Signal the gap naturally",
          "text": "Tu peux dire “What do you call the thing that…?”, “I can’t remember the word, but it’s…”, “It’s a kind of…” ou “It’s the opposite of…”. Ces expressions achètent du temps sans sortir de l’anglais. Elles donnent aussi à l’interlocuteur un rôle actif dans la réparation."
        },
        {
          "title": "5. Prefer communication over perfect wording",
          "text": "Une paraphrase peut être grammaticalement imparfaite et quand même très efficace. L’objectif est d’abord que l’autre comprenne. Ensuite, s’il donne le mot exact, répète-le dans une nouvelle phrase : “Right, screwdriver — I need a screwdriver for this.” Tu transformes immédiatement la réparation en apprentissage actif."
        }
      ],
      "quiz": [
        {
          "kind": "paraphrase",
          "q": "Le mot “umbrella” te manque. Quelle phrase permet le mieux de continuer en anglais ?",
          "a": "It’s the thing you hold over your head when it rains.",
          "choices": [
            "It’s a weather object, you know, the French word is parapluie.",
            "I can’t say it, so let’s change the subject.",
            "It’s something, maybe for outside, I don’t know."
          ],
          "why": "La bonne paraphrase combine fonction et situation et donne suffisamment d’indices pour que l’autre identifie l’objet.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "paraphrase",
          "q": "Tu veux expliquer “reliable” sans connaître de synonyme précis. Quelle reformulation aide le plus ?",
          "a": "Someone you can depend on and trust to do what they said.",
          "choices": [
            "Someone who is generally quite nice.",
            "Someone who works in the same place as you.",
            "Someone who agrees with you most of the time."
          ],
          "why": "Depend on et doing what they said décrivent le mécanisme de fiabilité ; les autres réponses parlent de qualités différentes.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "repair",
          "q": "Quelle phrase signale naturellement un trou de vocabulaire sans quitter l’anglais ?",
          "a": "I can’t remember the word, but it’s the thing you use to…",
          "choices": [
            "What is the French translation of the missing word?",
            "Forget it — my English is too bad.",
            "I will stop until I remember the exact noun."
          ],
          "why": "La phrase annonce le problème puis lance immédiatement une paraphrase, ce qui maintient le tour de parole et l’échange.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "transfer",
          "q": "Le mot “receipt” te manque après un achat. Quelle description est la plus efficace ?",
          "a": "The paper or message you get after you pay, showing what you bought.",
          "choices": [
            "The document you sometimes see in a shop.",
            "The paper that is related to money in some way.",
            "The thing the cashier may or may not have."
          ],
          "why": "La description précise le moment, la fonction et le contenu, ce qui distingue receipt d’autres documents liés à l’argent.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "learning",
          "q": "L’interlocuteur te donne finalement le mot “screwdriver”. Quel geste aide le plus à l’ancrer ?",
          "a": "Use “screwdriver” immediately in a new sentence of your own.",
          "choices": [
            "Switch back to French to check the spelling first.",
            "Repeat only the French translation several times.",
            "Move on without using the new word again."
          ],
          "why": "Réutiliser immédiatement le mot dans une phrase personnelle relie la forme nouvelle à la scène et à l’intention déjà comprises.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        }
      ],
      "express": [
        "Le mot screwdriver te manque : “It’s the tool you use to tighten screws.” Tu donnes une catégorie approximative et surtout une fonction. L’autre personne peut deviner ou fournir le mot. Cette stratégie est beaucoup plus robuste que “How do you say tournevis?” car elle maintient le cerveau dans la langue cible et crée un contexte mémorable pour le nouveau vocabulaire.",
        "Pour kettle : “the thing you use to boil water for tea.” Pour shelf : “the flat part on a wall where you put books.” Pour receipt : “the paper you get after you pay.” Les définitions n’ont pas besoin d’être élégantes. Elles doivent seulement isoler l’objet assez bien pour que l’échange continue.",
        "Pour disappointed : “sad because something was not as good as you expected.” Pour reliable : “someone or something you can depend on.” Les idées abstraites se contournent avec cause, conséquence ou exemple. Cet exercice développe une compétence plus générale : exprimer le sens même quand le vocabulaire précis n’est pas disponible."
      ],
      "takeaways": [
        {
          "label": "Réflexe",
          "text": "La vraie fluidité n’est pas connaître tous les mots : c’est pouvoir rester dans la conversation quand un mot disparaît. On travaille la description, la fonction et la reformulation."
        },
        {
          "label": "À pratiquer",
          "text": "Choisis ou produis la formulation qui convient à la scène, puis explique ce qui change si le contexte, la relation ou l’intention change."
        }
      ]
    },
    "eng-paraphrase-clarify": {
      "title": "Clarifier précisément au lieu de dire “I don’t understand”",
      "hook": "Quand tu comprends 80 % d’une phrase, ne jette pas les 80 %. Apprends à isoler ce qui bloque, vérifier une interprétation et demander une reformulation utile.",
      "sections": [
        {
          "title": "1. Target the unknown part",
          "text": "Si seul reliable bloque, “What do you mean by reliable here?” est beaucoup plus utile que “I don’t understand.” L’autre sait exactement quoi reformuler et tu conserves tout ce que tu avais déjà compris. La réparation devient courte, naturelle et compatible avec une vraie conversation."
        },
        {
          "title": "2. Check an interpretation",
          "text": "“Do you mean the deadline is Friday, not Thursday?” te permet de vérifier une hypothèse sans demander une répétition totale. Cette stratégie est particulièrement utile au téléphone ou en réunion : elle montre ce que tu as compris et concentre la correction sur un seul point."
        },
        {
          "title": "3. Ask for simpler wording",
          "text": "“Could you say that another way?” ou “Could you give me an example?” sont souvent plus efficaces que “Can you repeat?” si le problème vient du vocabulaire et non du son. Une répétition identique peut simplement reproduire la même difficulté."
        },
        {
          "title": "4. Repair your own sentence",
          "text": "Tu peux aussi te corriger en parlant : “He didn’t accept it — sorry, I mean he didn’t agree with the decision.” Les expressions “I mean”, “what I’m trying to say is…” ou “let me put it another way” permettent de reconstruire une idée sans interrompre la conversation."
        },
        {
          "title": "5. Clarification is a normal skill",
          "text": "Les locuteurs natifs demandent aussi des clarifications. Le but n’est donc pas d’éviter toute incompréhension, mais de la gérer vite. Une bonne réparation contient souvent trois éléments : ce que tu as compris, le point incertain, puis une question ciblée. Cette structure transforme l’hésitation en interaction efficace."
        }
      ],
      "quiz": [
        {
          "kind": "clarify",
          "q": "Tu comprends toute la phrase sauf “reliable”. Quelle question est la plus ciblée ?",
          "a": "What do you mean by “reliable” here?",
          "choices": [
            "Could you repeat everything from the beginning?",
            "Can you speak more slowly for the rest of the conversation?",
            "What does every word in that sentence mean?"
          ],
          "why": "La question isole précisément le mot qui bloque et conserve toute la compréhension déjà acquise.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "clarify",
          "q": "Tu crois avoir entendu “Friday” mais tu veux vérifier. Quelle réponse est la plus efficace ?",
          "a": "Do you mean Friday, not Thursday?",
          "choices": [
            "I didn’t understand the meeting date at all.",
            "Can you repeat the whole explanation?",
            "Friday is probably right, so I’ll assume that."
          ],
          "why": "La formulation présente ton hypothèse et demande seulement la correction nécessaire, ce qui minimise la friction dans l’échange.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "clarify",
          "q": "Le problème vient d’une expression compliquée, pas du volume sonore. Quelle demande aide le plus ?",
          "a": "Could you say that another way?",
          "choices": [
            "Could you say exactly the same words again?",
            "Could you speak much louder?",
            "Could you translate the whole conversation?"
          ],
          "why": "Une reformulation modifie le vocabulaire ou la structure, alors qu’une répétition identique risque de reproduire exactement le même obstacle.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "self-repair",
          "q": "Tu viens d’utiliser un mot qui ne rend pas ton idée. Quelle phrase te permet de te corriger naturellement ?",
          "a": "Sorry, that’s not quite what I mean — let me put it another way.",
          "choices": [
            "Forget everything I just said.",
            "My English is wrong, so I’ll stop.",
            "You should guess what I meant."
          ],
          "why": "La phrase signale la correction puis garde le tour de parole pour proposer une nouvelle formulation, ce qui est courant dans une conversation naturelle.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "transfer",
          "q": "Quelle clarification montre le mieux ce que tu as déjà compris ?",
          "a": "So the meeting is online; I’m just not sure what time it starts.",
          "choices": [
            "I don’t understand anything about the meeting.",
            "Please explain the entire meeting again.",
            "I’ll wait until someone else tells me later."
          ],
          "why": "La phrase conserve l’information comprise et isole le seul élément incertain, ce qui aide l’interlocuteur à répondre exactement au bon endroit.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        }
      ],
      "express": [
        "Si seul reliable bloque, “What do you mean by reliable here?” est beaucoup plus utile que “I don’t understand.” L’autre sait exactement quoi reformuler et tu conserves tout ce que tu avais déjà compris. La réparation devient courte, naturelle et compatible avec une vraie conversation.",
        "“Do you mean the deadline is Friday, not Thursday?” te permet de vérifier une hypothèse sans demander une répétition totale. Cette stratégie est particulièrement utile au téléphone ou en réunion : elle montre ce que tu as compris et concentre la correction sur un seul point.",
        "“Could you say that another way?” ou “Could you give me an example?” sont souvent plus efficaces que “Can you repeat?” si le problème vient du vocabulaire et non du son. Une répétition identique peut simplement reproduire la même difficulté."
      ],
      "takeaways": [
        {
          "label": "Réflexe",
          "text": "Quand tu comprends 80 % d’une phrase, ne jette pas les 80 %. Apprends à isoler ce qui bloque, vérifier une interprétation et demander une reformulation utile."
        },
        {
          "label": "À pratiquer",
          "text": "Choisis ou produis la formulation qui convient à la scène, puis explique ce qui change si le contexte, la relation ou l’intention change."
        }
      ]
    },
    "eng-connectors-logic": {
      "title": "Although, however, therefore : lire la logique avant le vocabulaire",
      "hook": "Les connecteurs sont des panneaux de circulation. Ils te disent si la phrase ajoute, oppose, concède ou conclut. On les utilise pour suivre un raisonnement et produire un texte clair.",
      "sections": [
        {
          "title": "1. Although introduces a concession inside the sentence",
          "text": "“Although the hotel was cheap, it was far from the centre.” Le prix faible crée une raison potentielle d’être satisfait ; la distance introduit un obstacle qui coexiste avec cet avantage. Although relie directement les deux propositions dans une même structure."
        },
        {
          "title": "2. However changes direction between statements",
          "text": "“The hotel was cheap. However, it was far from the centre.” Le lien logique ressemble à although, mais la grammaire change : however fonctionne comme adverbe de liaison entre deux énoncés. Le choix dépend donc autant de la structure que de la relation logique."
        },
        {
          "title": "3. Therefore marks a conclusion or consequence",
          "text": "“The buses stopped at midnight; therefore, we took a taxi.” Therefore indique que la deuxième décision découle de la première information. Dans un texte, le mot t’aide à distinguer une nouvelle preuve d’une conclusion tirée de ce qui précède."
        },
        {
          "title": "4. Because gives the reason, so gives the result",
          "text": "“We left early because the road was busy.” La route encombrée explique le départ. “The road was busy, so we left early.” Même relation, mais le point de départ change. Savoir inverser ces deux formes permet de construire un texte plus flexible sans modifier le raisonnement."
        },
        {
          "title": "5. Map the logic before translating",
          "text": "Sur un paragraphe, marque simplement +, contrast, cause, result. Même si plusieurs mots sont inconnus, tu peux reconstruire l’architecture. Ensuite seulement, regarde le vocabulaire. Cette méthode est particulièrement utile dans les articles, les e-mails argumentés et les consignes où le lien entre phrases porte une grande partie du sens."
        }
      ],
      "quiz": [
        {
          "kind": "logic",
          "q": "“The room was small. However, it had an amazing view.” Que fait however ?",
          "a": "It introduces a contrasting positive point.",
          "choices": [
            "It gives the reason why the room was small.",
            "It shows that the view caused the small size.",
            "It concludes that the room should be avoided."
          ],
          "why": "However change la direction de l’évaluation : après un défaut, la phrase apporte un élément positif qui contraste avec lui.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "logic",
          "q": "“The last train had left; therefore, we booked a hotel.” Quelle relation exprime therefore ?",
          "a": "The hotel booking is presented as a consequence.",
          "choices": [
            "The hotel booking contradicts the train information.",
            "The train left because a hotel was booked.",
            "The two events are presented as unrelated facts."
          ],
          "why": "Therefore signale explicitement que la décision de réserver découle de l’absence de train disponible.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "structure",
          "q": "Quelle phrase utilise although naturellement ?",
          "a": "Although it was raining, we walked to the station.",
          "choices": [
            "Although the rain, we walked to the station.",
            "It was raining. Although, we walked to the station.",
            "We walked to the station because although it rained."
          ],
          "why": "Although introduit une proposition avec sujet et verbe ; les autres options imitent des structures d’autres connecteurs.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "rewrite",
          "q": "Quelle reformulation garde la même relation que “We left early because traffic was heavy” ?",
          "a": "Traffic was heavy, so we left early.",
          "choices": [
            "Traffic was heavy, however we left early.",
            "Although traffic was heavy, we left early for that reason.",
            "Traffic was heavy; nevertheless, it caused us to leave early."
          ],
          "why": "Because introduit la cause ; en plaçant la cause d’abord, so peut introduire le même résultat sans changer le raisonnement.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "reading",
          "q": "Dans un paragraphe difficile, pourquoi repérer les connecteurs avant certains mots rares ?",
          "a": "They reveal how the ideas relate even when some vocabulary is missing.",
          "choices": [
            "They guarantee that every unknown word can be ignored.",
            "They translate the entire paragraph automatically.",
            "They tell you which sentences are grammatically optional."
          ],
          "why": "Les connecteurs donnent l’architecture cause/contraste/conséquence ; cette architecture aide à maintenir la compréhension malgré un vocabulaire incomplet.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        }
      ],
      "express": [
        "“Although the hotel was cheap, it was far from the centre.” Le prix faible crée une raison potentielle d’être satisfait ; la distance introduit un obstacle qui coexiste avec cet avantage. Although relie directement les deux propositions dans une même structure.",
        "“The hotel was cheap. However, it was far from the centre.” Le lien logique ressemble à although, mais la grammaire change : however fonctionne comme adverbe de liaison entre deux énoncés. Le choix dépend donc autant de la structure que de la relation logique.",
        "“The buses stopped at midnight; therefore, we took a taxi.” Therefore indique que la deuxième décision découle de la première information. Dans un texte, le mot t’aide à distinguer une nouvelle preuve d’une conclusion tirée de ce qui précède."
      ],
      "takeaways": [
        {
          "label": "Réflexe",
          "text": "Les connecteurs sont des panneaux de circulation. Ils te disent si la phrase ajoute, oppose, concède ou conclut. On les utilise pour suivre un raisonnement et produire un texte clair."
        },
        {
          "label": "À pratiquer",
          "text": "Choisis ou produis la formulation qui convient à la scène, puis explique ce qui change si le contexte, la relation ou l’intention change."
        }
      ]
    },
    "eng-connectors-concession": {
      "title": "Although, despite, whereas, however : même contraste, structures différentes",
      "hook": "Le piège est de connaître le sens mais d’utiliser la mauvaise structure. On compare des phrases naturelles qui expriment un contraste proche avec des grammaires différentes.",
      "sections": [
        {
          "title": "1. Although + clause",
          "text": "“Although it was raining, we went out.” Après although, tu as une proposition complète : it + was raining. Le mot introduit un fait qui aurait pu empêcher l’action, mais ne l’a pas empêchée. Il peut aussi venir au milieu : “We went out although it was raining.”"
        },
        {
          "title": "2. Despite + noun or -ing form",
          "text": "“Despite the rain, we went out.” “Despite feeling tired, she stayed.” Despite n’introduit pas directement une proposition finie de type “despite it was raining”. Il s’associe naturellement à un nom, un groupe nominal ou une forme en -ing. Le sens de concession reste proche ; la structure change."
        },
        {
          "title": "3. Whereas compares two sides",
          "text": "“Alex prefers working early, whereas Mia works better at night.” Whereas met deux situations en contraste, souvent de manière assez neutre. Il ne suggère pas nécessairement qu’un fait aurait dû empêcher l’autre ; il compare surtout deux profils ou deux états."
        },
        {
          "title": "4. However links separate statements",
          "text": "“The price was attractive. However, the location was poor.” However fonctionne bien pour réorienter un texte après une première affirmation. Il est particulièrement utile dans l’écriture structurée, mais attention à la ponctuation et au fait qu’il ne remplace pas directement although dans toutes les positions."
        },
        {
          "title": "5. Choose by meaning and syntax",
          "text": "Avant de choisir, pose deux questions : quelle relation veux-tu exprimer — obstacle, comparaison, changement de direction ? Et quelle structure as-tu déjà — proposition, nom, nouvelle phrase ? Cette double vérification évite les erreurs produites par une traduction française unique comme “malgré / bien que / cependant”."
        }
      ],
      "quiz": [
        {
          "kind": "structure",
          "q": "Tu veux dire “Malgré la pluie, nous sommes sortis.” Quelle phrase est naturelle ?",
          "a": "Despite the rain, we went out.",
          "choices": [
            "Despite it was raining, we went out.",
            "Although the rain, we went out.",
            "However the rain, we went out."
          ],
          "why": "Despite accepte directement le groupe nominal the rain ; although demanderait une proposition complète comme “although it was raining”.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "structure",
          "q": "Quelle phrase utilise despite correctement avec une action ?",
          "a": "Despite feeling tired, she stayed until the end.",
          "choices": [
            "Despite she felt tired, she stayed until the end.",
            "Despite she was tired, she stayed until the end.",
            "Despite to feel tired, she stayed until the end."
          ],
          "why": "La forme en -ing peut suivre despite pour exprimer une circonstance concessive sans proposition finie.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "contrast",
          "q": "Deux collègues ont des habitudes opposées, sans idée d’obstacle. Quel connecteur convient bien ?",
          "a": "Alex works best early, whereas Mia prefers evenings.",
          "choices": [
            "Alex works best early, therefore Mia prefers evenings.",
            "Alex works best early, despite Mia prefers evenings.",
            "Alex works best early, because Mia prefers evenings."
          ],
          "why": "Whereas juxtapose naturellement deux caractéristiques contrastées sans construire une relation de cause ou de conséquence.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "writing",
          "q": "Tu veux introduire un contrepoint dans une nouvelle phrase. Quelle option est naturelle ?",
          "a": "The apartment is spacious. However, it is quite noisy.",
          "choices": [
            "The apartment is spacious. Although, it is quite noisy.",
            "The apartment is spacious. Despite, it is quite noisy.",
            "The apartment is spacious. Whereas, it is quite noisy."
          ],
          "why": "However fonctionne comme transition entre deux énoncés autonomes et marque clairement le changement de direction.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "choice",
          "q": "Quelle question aide le plus à choisir entre although et despite ?",
          "a": "Do I have a full clause or a noun/-ing phrase after the connector?",
          "choices": [
            "Is the sentence longer than ten words?",
            "Does the French version contain the word “mais”?",
            "Is the adjective positive or negative?"
          ],
          "why": "Les deux connecteurs peuvent exprimer une concession proche ; leur différence la plus utile en production vient souvent de la structure qui suit.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        }
      ],
      "express": [
        "“Although it was raining, we went out.” Après although, tu as une proposition complète : it + was raining. Le mot introduit un fait qui aurait pu empêcher l’action, mais ne l’a pas empêchée. Il peut aussi venir au milieu : “We went out although it was raining.”",
        "“Despite the rain, we went out.” “Despite feeling tired, she stayed.” Despite n’introduit pas directement une proposition finie de type “despite it was raining”. Il s’associe naturellement à un nom, un groupe nominal ou une forme en -ing. Le sens de concession reste proche ; la structure change.",
        "“Alex prefers working early, whereas Mia works better at night.” Whereas met deux situations en contraste, souvent de manière assez neutre. Il ne suggère pas nécessairement qu’un fait aurait dû empêcher l’autre ; il compare surtout deux profils ou deux états."
      ],
      "takeaways": [
        {
          "label": "Réflexe",
          "text": "Le piège est de connaître le sens mais d’utiliser la mauvaise structure. On compare des phrases naturelles qui expriment un contraste proche avec des grammaires différentes."
        },
        {
          "label": "À pratiquer",
          "text": "Choisis ou produis la formulation qui convient à la scène, puis explique ce qui change si le contexte, la relation ou l’intention change."
        }
      ]
    },
    "eng-implicit-meaning": {
      "title": "Comprendre ce que la personne fait avec ses mots",
      "hook": "À partir de B1/B2, le sens littéral ne suffit plus. On apprend à lire le désaccord, l’engagement, l’hésitation ou la politesse à partir de la scène entière.",
      "sections": [
        {
          "title": "1. “I’m not sure that would work” may be a disagreement",
          "text": "En réunion, quelqu’un dit “I’m not sure that would work” puis énumère trois risques majeurs. Littéralement, il exprime une incertitude ; pragmatiquement, il peut être en train de rejeter l’idée avec retenue. La suite du discours est un indice plus fort que le degré de certitude grammatical pris isolément."
        },
        {
          "title": "2. “Interesting” is not a fixed compliment",
          "text": "“That’s interesting” peut exprimer un vrai intérêt, une surprise, une réserve ou simplement gagner du temps. L’intonation et la suite tranchent. Si la personne pose trois questions enthousiastes, l’intérêt est probable ; si elle change immédiatement de sujet, l’engagement est beaucoup plus faible."
        },
        {
          "title": "3. “I’ll think about it” has levels of commitment",
          "text": "La phrase promet une réflexion, pas une acceptation. Le niveau d’ouverture dépend de ce qui suit : fixer un rendez-vous pour en reparler crée un engagement plus fort ; ne proposer aucune suite peut rendre la réponse très prudente. Évite donc de traduire une formule en verdict automatique."
        },
        {
          "title": "4. Actions are evidence",
          "text": "Après une phrase atténuée, regarde ce que la personne fait. “That might be difficult” suivi d’un plan alternatif détaillé peut équivaloir à un refus pratique. “We’ll see” suivi d’une date précise pour vérifier quelque chose est plus concret. Les actions et prochaines étapes servent de commentaire sur l’intention."
        },
        {
          "title": "5. Clarify when the stakes matter",
          "text": "Quand l’implicite a une conséquence réelle, demande : “Do you mean you’d prefer the second option?” ou “Should I take that as a no for now?” La compétence n’est pas de devenir devin. Elle consiste à formuler une hypothèse fondée puis à la tester lorsque l’ambiguïté compte."
        }
      ],
      "quiz": [
        {
          "kind": "implicit",
          "q": "En réunion : “I’m not sure that would work.” Puis la personne liste trois problèmes sérieux. Quelle lecture est la plus probable ?",
          "a": "It is a softened disagreement, not just missing information.",
          "choices": [
            "The speaker simply needs the proposal repeated.",
            "The speaker is broadly supportive but wants more detail.",
            "The speaker has not formed any opinion about the proposal."
          ],
          "why": "Les objections détaillées qui suivent montrent une position négative réelle ; la formulation initiale sert surtout à atténuer le désaccord.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "implicit",
          "q": "Quel contexte rend “That’s interesting” le plus clairement positif ?",
          "a": "The speaker leans in, asks several follow-up questions and wants to hear more.",
          "choices": [
            "The speaker says it, pauses, and immediately changes the subject.",
            "The speaker says it after rejecting the idea in writing.",
            "The speaker says it while ending the conversation early."
          ],
          "why": "L’intérêt se confirme par les comportements qui prolongent l’échange ; la phrase seule reste trop ambiguë pour suffire.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "commitment",
          "q": "Quel comportement rend “I’ll think about it” le plus engagé ?",
          "a": "The speaker suggests a time tomorrow to discuss the answer.",
          "choices": [
            "The speaker immediately changes topic and never mentions it again.",
            "The speaker says it while walking away from the conversation.",
            "The speaker gives no next step and avoids the subject later."
          ],
          "why": "Une prochaine étape précise transforme une formule vague en engagement observable à reconsidérer réellement la proposition.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "clarify",
          "q": "Un refus implicite aurait des conséquences importantes. Quelle question est la plus utile ?",
          "a": "Do you mean you’d prefer us not to go ahead with this option?",
          "choices": [
            "Why are you being indirect?",
            "So that definitely means no, right?",
            "Can you say the same sentence again?"
          ],
          "why": "La question propose une interprétation précise sans accuser ni transformer une hypothèse en certitude.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "reasoning",
          "q": "Pourquoi les actions qui suivent une phrase sont-elles importantes ?",
          "a": "They reveal how strongly the speaker is acting on the words.",
          "choices": [
            "They replace the need to understand the words at all.",
            "They prove that every indirect phrase means no.",
            "They tell you the dictionary definition of each expression."
          ],
          "why": "L’intention pragmatique se lit dans l’ensemble parole + comportement ; une action concrète peut renforcer ou affaiblir l’interprétation de la formulation.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        }
      ],
      "express": [
        "En réunion, quelqu’un dit “I’m not sure that would work” puis énumère trois risques majeurs. Littéralement, il exprime une incertitude ; pragmatiquement, il peut être en train de rejeter l’idée avec retenue. La suite du discours est un indice plus fort que le degré de certitude grammatical pris isolément.",
        "“That’s interesting” peut exprimer un vrai intérêt, une surprise, une réserve ou simplement gagner du temps. L’intonation et la suite tranchent. Si la personne pose trois questions enthousiastes, l’intérêt est probable ; si elle change immédiatement de sujet, l’engagement est beaucoup plus faible.",
        "La phrase promet une réflexion, pas une acceptation. Le niveau d’ouverture dépend de ce qui suit : fixer un rendez-vous pour en reparler crée un engagement plus fort ; ne proposer aucune suite peut rendre la réponse très prudente. Évite donc de traduire une formule en verdict automatique."
      ],
      "takeaways": [
        {
          "label": "Réflexe",
          "text": "À partir de B1/B2, le sens littéral ne suffit plus. On apprend à lire le désaccord, l’engagement, l’hésitation ou la politesse à partir de la scène entière."
        },
        {
          "label": "À pratiquer",
          "text": "Choisis ou produis la formulation qui convient à la scène, puis explique ce qui change si le contexte, la relation ou l’intention change."
        }
      ]
    },
    "eng-implicit-understatement": {
      "title": "Understatement et hedging : entendre la force cachée",
      "hook": "“Not ideal”, “a bit difficult”, “perhaps we should reconsider”… L’anglais peut réduire la force des mots tout en transmettant un message très net. On apprend à calibrer cette force sans appliquer de règle mécanique.",
      "sections": [
        {
          "title": "1. Understatement says less than the situation",
          "text": "Après une panne qui efface plusieurs heures de travail : “Well, that’s not ideal.” Le sens littéral est faible, mais la scène rend l’évaluation beaucoup plus négative. L’effet peut être humoristique, professionnel ou émotionnel. Ce n’est pas une traduction spéciale de not ideal ; c’est un contraste entre la force des mots et la gravité des faits."
        },
        {
          "title": "2. Hedging reduces commitment",
          "text": "Perhaps, might, seem, a little, I think peuvent rendre une affirmation moins frontale. “This seems a little risky” peut être une réserve sérieuse selon le contexte. Le hedge réduit l’engagement linguistique, pas nécessairement l’importance pratique du message."
        },
        {
          "title": "3. British-style understatement is not a codebook",
          "text": "“Not bad” peut aller de “correct” à un vrai compliment. “A bit of a problem” peut décrire un souci mineur ou une catastrophe racontée avec humour. Il serait donc faux d’apprendre “not bad = excellent”. L’intonation, la situation et les actions qui suivent déterminent la force réelle."
        },
        {
          "title": "4. Compare wording with consequences",
          "text": "Si quelqu’un dit “We might need to rethink this” puis annule le lancement, la décision montre que la réserve était forte. Si la même phrase est suivie de “but let’s try it anyway”, l’interprétation change. Observe toujours la conséquence proposée avant de classer la phrase comme faible ou forte."
        },
        {
          "title": "5. Use hedging deliberately",
          "text": "En production, hedger ne signifie pas devenir flou. “I think we need another day” exprime une recommandation claire avec une légère atténuation. “Maybe there are possibly some issues” dilue trop le message. Cherche le niveau minimal d’atténuation qui protège la relation sans cacher ce que tu veux dire."
        }
      ],
      "quiz": [
        {
          "kind": "understatement",
          "q": "Après une panne grave, l’ingénieur dit “That’s not ideal” et lance immédiatement une procédure d’urgence. Quelle lecture est la plus plausible ?",
          "a": "The words are deliberately mild compared with the seriousness of the problem.",
          "choices": [
            "The engineer genuinely believes the problem is minor.",
            "The engineer is praising the system’s behaviour.",
            "The engineer has not noticed that anything went wrong."
          ],
          "why": "La procédure d’urgence fournit la preuve comportementale que la situation est grave malgré la formulation atténuée.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "hedging",
          "q": "Quelle phrase exprime une réserve claire avec une atténuation raisonnable ?",
          "a": "I think this approach is a little too risky for this client.",
          "choices": [
            "This approach is unquestionably disastrous in every possible way.",
            "Maybe there could perhaps possibly be some sort of risk.",
            "This approach is fine, although I completely reject it."
          ],
          "why": "La bonne phrase atténue avec I think et a little tout en conservant un jugement compréhensible ; les autres surjouent ou deviennent incohérentes.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "context",
          "q": "“Not bad.” Dans quel contexte la phrase ressemble le plus à un vrai compliment ?",
          "a": "The speaker smiles, sounds impressed and asks where they can buy one.",
          "choices": [
            "The speaker shrugs and immediately lists several defects.",
            "The speaker says it after asking for a complete redesign.",
            "The speaker avoids looking at the result and changes topic."
          ],
          "why": "Les indices non verbaux et la suite confirment ici une évaluation positive ; la formule seule ne fixe pas son intensité.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "consequence",
          "q": "“We might need to rethink the launch.” Quelle suite rend la phrase la plus forte ?",
          "a": "The team immediately cancels the launch and schedules a new review.",
          "choices": [
            "The team keeps the launch unchanged and moves to another topic.",
            "Someone mentions a minor typo and laughs.",
            "The speaker says the idea was only hypothetical and irrelevant."
          ],
          "why": "Une action lourde et immédiate montre que might n’indiquait pas une simple possibilité abstraite mais une réserve opérationnelle majeure.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        },
        {
          "kind": "production",
          "q": "Tu veux dire clairement qu’il faut un jour de plus sans être brutal. Quelle phrase convient ?",
          "a": "I think we need one more day to finish this properly.",
          "choices": [
            "Maybe one more day could perhaps be useful, possibly.",
            "We absolutely cannot do anything unless you give us another day.",
            "One day is a concept we may want to consider."
          ],
          "why": "La phrase garde la demande explicite tout en utilisant une atténuation légère ; elle reste donc naturelle, professionnelle et exploitable.",
          "trap": "Les autres propositions restent possibles en anglais, mais elles ne produisent pas le même sens, le même registre ou la même intention dans cette scène.",
          "evidence": "Observe la situation, la relation entre les interlocuteurs et ce que la phrase permet réellement de déduire."
        }
      ],
      "express": [
        "Après une panne qui efface plusieurs heures de travail : “Well, that’s not ideal.” Le sens littéral est faible, mais la scène rend l’évaluation beaucoup plus négative. L’effet peut être humoristique, professionnel ou émotionnel. Ce n’est pas une traduction spéciale de not ideal ; c’est un contraste entre la force des mots et la gravité des faits.",
        "Perhaps, might, seem, a little, I think peuvent rendre une affirmation moins frontale. “This seems a little risky” peut être une réserve sérieuse selon le contexte. Le hedge réduit l’engagement linguistique, pas nécessairement l’importance pratique du message.",
        "“Not bad” peut aller de “correct” à un vrai compliment. “A bit of a problem” peut décrire un souci mineur ou une catastrophe racontée avec humour. Il serait donc faux d’apprendre “not bad = excellent”. L’intonation, la situation et les actions qui suivent déterminent la force réelle."
      ],
      "takeaways": [
        {
          "label": "Réflexe",
          "text": "“Not ideal”, “a bit difficult”, “perhaps we should reconsider”… L’anglais peut réduire la force des mots tout en transmettant un message très net. On apprend à calibrer cette force sans appliquer de règle mécanique."
        },
        {
          "label": "À pratiquer",
          "text": "Choisis ou produis la formulation qui convient à la scène, puis explique ce qui change si le contexte, la relation ou l’intention change."
        }
      ]
    }
  },
  "labs": {
    "eng-context-inference": {
      "id": "eng-lab-context",
      "skill": "Compréhension",
      "title": "Déduis sans traduire",
      "context": "Tu entends une phrase dans un récit de voyage.",
      "speak": "The platform was packed, so we waited for the next train.",
      "prompt": "Quelle conclusion est la mieux soutenue ?",
      "choices": [
        {
          "text": "There were probably too many people to board comfortably.",
          "correct": true,
          "feedback": "Packed + waited for the next train pointe vers une forte affluence."
        },
        {
          "text": "The train had been cancelled for the whole day.",
          "correct": false,
          "feedback": "La phrase parle d’attendre le suivant, pas d’une annulation générale."
        },
        {
          "text": "They had arrived at the wrong station.",
          "correct": false,
          "feedback": "Aucun indice ne suggère une erreur de gare."
        }
      ],
      "productionPrompt": "Réponds en anglais en une phrase : tu ne connais pas “packed”, mais tu veux expliquer ce que tu as compris de la scène.",
      "modelResponse": "I’m not sure what “packed” means exactly, but the platform was probably very crowded.",
      "takeaway": "Observe le contexte, choisis la formulation naturelle, puis produis ta propre phrase en anglais.",
      "difficulty": "moyen"
    },
    "eng-context-reference": {
      "id": "eng-lab-reference",
      "skill": "Référence",
      "title": "Retrouve ce que la phrase reprend",
      "context": "Deux personnes parlent de deux chargeurs.",
      "speak": "The old charger stopped working, so I bought a new one.",
      "prompt": "Que représente “one” dans cette scène ?",
      "choices": [
        {
          "text": "A new charger.",
          "correct": true,
          "feedback": "One remplace charger, déjà connu dans le discours."
        },
        {
          "text": "A new phone.",
          "correct": false,
          "feedback": "Le téléphone n’est pas mentionné."
        },
        {
          "text": "A new problem.",
          "correct": false,
          "feedback": "La phrase décrit une solution, pas un nouveau problème."
        }
      ],
      "productionPrompt": "Reformule la phrase en anglais sans utiliser “one”.",
      "modelResponse": "The old charger stopped working, so I bought a new charger.",
      "takeaway": "Observe le contexte, choisis la formulation naturelle, puis produis ta propre phrase en anglais.",
      "difficulty": "moyen"
    },
    "eng-false-friends-core": {
      "id": "eng-lab-actually",
      "skill": "Choix naturel",
      "title": "Correction ou situation actuelle ?",
      "context": "Quelqu’un pense que tu vis à Paris, mais tu n’y fais que travailler.",
      "speak": "Actually, I live in Lille. I only work in Paris.",
      "prompt": "Quelle ouverture correspond à une correction ?",
      "choices": [
        {
          "text": "Actually, I live in Lille. I only work in Paris.",
          "correct": true,
          "feedback": "Actually signale naturellement la rectification."
        },
        {
          "text": "Currently, I live in Lille. I only work in Paris.",
          "correct": false,
          "feedback": "Currently décrit le présent mais ne marque pas aussi clairement la correction."
        },
        {
          "text": "Eventually, I live in Lille. I only work in Paris.",
          "correct": false,
          "feedback": "Eventually raconterait l’issue d’un processus, ce qui ne correspond pas à la scène."
        }
      ],
      "productionPrompt": "Écris en anglais une phrase avec “currently” qui décrit simplement ta situation du moment, sans corriger quelqu’un.",
      "modelResponse": "I’m currently working from home three days a week.",
      "takeaway": "Observe le contexte, choisis la formulation naturelle, puis produis ta propre phrase en anglais.",
      "difficulty": "moyen"
    },
    "eng-false-friends-second-wave": {
      "id": "eng-lab-sensible",
      "skill": "Collocation",
      "title": "Quel adjectif sonne naturel ?",
      "context": "Une décision réduit le risque et simplifie le projet.",
      "speak": "Choosing the simpler plan is a sensible decision.",
      "prompt": "Quelle formulation correspond le mieux à “raisonnable” ?",
      "choices": [
        {
          "text": "a sensible decision",
          "correct": true,
          "feedback": "Sensible est naturel pour une décision raisonnable et pratique."
        },
        {
          "text": "a sensitive decision",
          "correct": false,
          "feedback": "Sensitive décrirait plutôt quelque chose de délicat ou réactif."
        },
        {
          "text": "a comprehensive decision",
          "correct": false,
          "feedback": "Comprehensive parle surtout d’étendue ou de couverture."
        }
      ],
      "productionPrompt": "Écris deux mini-phrases en anglais : une avec “sensible”, une avec “sensitive”, dans deux contextes différents.",
      "modelResponse": "Taking a taxi was a sensible choice. / Salary information is sensitive.",
      "takeaway": "Observe le contexte, choisis la formulation naturelle, puis produis ta propre phrase en anglais.",
      "difficulty": "moyen"
    },
    "eng-still-yet-already-even": {
      "id": "eng-lab-yet",
      "skill": "Nuance",
      "title": "Quelle attente se cache derrière la phrase ?",
      "context": "Le rapport doit être envoyé aujourd’hui.",
      "speak": "I haven't sent it yet.",
      "prompt": "Que laisse entendre “yet” ?",
      "choices": [
        {
          "text": "Sending it is still expected, but it has not happened up to now.",
          "correct": true,
          "feedback": "Yet garde ouverte l’attente de l’action."
        },
        {
          "text": "The speaker has decided not to send it.",
          "correct": false,
          "feedback": "La phrase ne ferme pas la possibilité future."
        },
        {
          "text": "The report was sent earlier than expected.",
          "correct": false,
          "feedback": "Cela correspondrait plutôt à already."
        }
      ],
      "productionPrompt": "Écris en anglais deux phrases sur la même tâche : une avec “still”, une avec “already”, en faisant sentir deux attentes différentes.",
      "modelResponse": "I'm still working on it. / I've already finished it.",
      "takeaway": "Observe le contexte, choisis la formulation naturelle, puis produis ta propre phrase en anglais.",
      "difficulty": "moyen"
    },
    "eng-small-words-just-quite": {
      "id": "eng-lab-audio-barely",
      "skill": "Ton",
      "title": "Entends la pression",
      "context": "Une relance professionnelle non agressive.",
      "speak": "I just wanted to check whether you saw my email.",
      "prompt": "Quel effet “just” produit-il surtout ici ?",
      "choices": [
        {
          "text": "It softens the follow-up and reduces the sense of pressure.",
          "correct": true,
          "feedback": "Just présente la relance comme une vérification limitée."
        },
        {
          "text": "It means the email arrived only a few seconds ago.",
          "correct": false,
          "feedback": "La phrase ne situe pas ici l’arrivée de l’e-mail dans le temps."
        },
        {
          "text": "It makes the message more formal and legalistic.",
          "correct": false,
          "feedback": "L’effet est plutôt conversationnel et atténuateur."
        }
      ],
      "productionPrompt": "Réécris la phrase en anglais de façon plus directe, puis compare mentalement le changement de ton.",
      "modelResponse": "Did you see my email?",
      "takeaway": "Observe le contexte, choisis la formulation naturelle, puis produis ta propre phrase en anglais.",
      "difficulty": "moyen"
    },
    "eng-polite-register": {
      "id": "eng-lab-register",
      "skill": "Registre",
      "title": "Calibre la demande",
      "context": "Collègue peu connu, aucune urgence.",
      "speak": "Could you send me the file when you have a minute?",
      "prompt": "Quelle phrase est la mieux calibrée ?",
      "choices": [
        {
          "text": "Could you send me the file when you have a minute?",
          "correct": true,
          "feedback": "Claire, polie et légère pour une demande ordinaire."
        },
        {
          "text": "Send me the file when you see this.",
          "correct": false,
          "feedback": "Possible dans certains rapports proches, mais plus direct ici."
        },
        {
          "text": "Would you be so kind as to forward the requested file at your earliest convenience?",
          "correct": false,
          "feedback": "Trop cérémonieux pour une demande simple entre collègues."
        }
      ],
      "productionPrompt": "Écris la même demande en anglais pour un ami proche, puis pour un client. Fais varier le registre, pas le contenu.",
      "modelResponse": "Friend: Can you send me the file? / Client: Would you mind sending me the file when you have a moment?",
      "takeaway": "Observe le contexte, choisis la formulation naturelle, puis produis ta propre phrase en anglais.",
      "difficulty": "moyen"
    },
    "eng-register-email-directness": {
      "id": "eng-lab-audio-wondering",
      "skill": "E-mail",
      "title": "Relance sans accusation",
      "context": "Première relance après deux jours.",
      "speak": "Just checking whether you had a chance to look at the draft.",
      "prompt": "Pourquoi cette formulation fonctionne-t-elle ?",
      "choices": [
        {
          "text": "It asks for an update without assuming the other person ignored you.",
          "correct": true,
          "feedback": "La relance reste factuelle et laisse une explication possible."
        },
        {
          "text": "It clearly blames the reader for being late.",
          "correct": false,
          "feedback": "La formulation évite précisément l’accusation."
        },
        {
          "text": "It makes the request sound legally binding.",
          "correct": false,
          "feedback": "Le ton est professionnel mais non juridique."
        }
      ],
      "productionPrompt": "Écris une relance anglaise plus ferme pour le même dossier après deux rappels ignorés, sans insulte ni accusation personnelle.",
      "modelResponse": "We still need your feedback today so we can send the final version.",
      "takeaway": "Observe le contexte, choisis la formulation naturelle, puis produis ta propre phrase en anglais.",
      "difficulty": "moyen"
    },
    "eng-phrasal-context": {
      "id": "eng-lab-getby",
      "skill": "Phrasal verb",
      "title": "Prédit le résultat",
      "context": "Une réunion manque de temps.",
      "speak": "We ran out of time, so we skipped the last topic.",
      "prompt": "Quelle paraphrase conserve le sens ?",
      "choices": [
        {
          "text": "There was no time left for the final topic.",
          "correct": true,
          "feedback": "Run out of time décrit une ressource qui arrive à zéro."
        },
        {
          "text": "The final topic was cancelled before the meeting began.",
          "correct": false,
          "feedback": "La phrase indique une conséquence du manque de temps pendant la réunion."
        },
        {
          "text": "The final topic was too easy to discuss.",
          "correct": false,
          "feedback": "Aucun indice ne parle de difficulté ou de facilité."
        }
      ],
      "productionPrompt": "Crée en anglais une phrase avec “run out of” dans une autre scène réelle, puis une avec “call off”.",
      "modelResponse": "My phone died because I ran out of battery. / They called off the match because of the storm.",
      "takeaway": "Observe le contexte, choisis la formulation naturelle, puis produis ta propre phrase en anglais.",
      "difficulty": "moyen"
    },
    "eng-phrasal-get": {
      "id": "eng-lab-audio-endedup",
      "skill": "Résultat",
      "title": "Quel résultat final ?",
      "context": "Le plan initial était de conduire.",
      "speak": "We ended up taking the train.",
      "prompt": "Que raconte “ended up” ?",
      "choices": [
        {
          "text": "Taking the train was the final outcome, not necessarily the original plan.",
          "correct": true,
          "feedback": "End up + -ing met l’accent sur ce qui s’est finalement produit."
        },
        {
          "text": "The train journey ended earlier than expected.",
          "correct": false,
          "feedback": "End up ne décrit pas ici la fin temporelle du trajet."
        },
        {
          "text": "They deliberately planned the train from the beginning.",
          "correct": false,
          "feedback": "La tournure suggère au contraire souvent une trajectoire vers un résultat final."
        }
      ],
      "productionPrompt": "Écris en anglais une mini-histoire de deux phrases avec “planned to…” puis “ended up…”.",
      "modelResponse": "We planned to cook at home, but we ended up ordering pizza.",
      "takeaway": "Observe le contexte, choisis la formulation naturelle, puis produis ta propre phrase en anglais.",
      "difficulty": "moyen"
    },
    "eng-paraphrase-repair": {
      "id": "eng-lab-paraphrase",
      "skill": "Production",
      "title": "Décris le mot que tu n’as pas",
      "context": "Tu as besoin d’un tournevis, mais le mot ne vient pas.",
      "prompt": "Quelle formulation maintient le mieux l’échange en anglais ?",
      "choices": [
        {
          "text": "It's the tool you use to tighten screws.",
          "correct": true,
          "feedback": "Fonction + objet associé donnent une description claire."
        },
        {
          "text": "It's a small metal thing for repairs.",
          "correct": false,
          "feedback": "Compréhensible, mais trop vague pour identifier facilement l’objet."
        },
        {
          "text": "I know the French word, but not the English one.",
          "correct": false,
          "feedback": "La phrase explique le problème mais ne permet pas encore à l’autre de deviner."
        }
      ],
      "productionPrompt": "Choisis un objet autour de toi et décris-le en anglais sans utiliser son nom.",
      "modelResponse": "It’s the thing you use to charge your phone when the battery is low.",
      "takeaway": "Observe le contexte, choisis la formulation naturelle, puis produis ta propre phrase en anglais.",
      "difficulty": "moyen"
    },
    "eng-paraphrase-clarify": {
      "id": "eng-lab-clarify",
      "skill": "Interaction",
      "title": "Isole ce qui bloque",
      "context": "Tu comprends tout sauf “reliable”.",
      "speak": "What do you mean by reliable here?",
      "prompt": "Quelle question répare le mieux l’échange ?",
      "choices": [
        {
          "text": "What do you mean by “reliable” here?",
          "correct": true,
          "feedback": "Elle cible exactement le point incertain."
        },
        {
          "text": "Could you repeat the whole sentence?",
          "correct": false,
          "feedback": "Une répétition identique peut ne rien résoudre si le mot reste inconnu."
        },
        {
          "text": "Could you explain everything again from the start?",
          "correct": false,
          "feedback": "La demande jette inutilement les informations déjà comprises."
        }
      ],
      "productionPrompt": "Écris en anglais une phrase qui vérifie ton interprétation : tu crois que la réunion est vendredi et non jeudi.",
      "modelResponse": "Do you mean the meeting is on Friday, not Thursday?",
      "takeaway": "Observe le contexte, choisis la formulation naturelle, puis produis ta propre phrase en anglais.",
      "difficulty": "moyen"
    },
    "eng-connectors-logic": {
      "id": "eng-lab-concession",
      "skill": "Logique",
      "title": "Lis le virage du texte",
      "context": "Un hôtel a un avantage puis un défaut.",
      "speak": "The hotel was cheap. However, it was far from the centre.",
      "prompt": "Que fait “however” ?",
      "choices": [
        {
          "text": "It introduces a point that contrasts with the previous positive fact.",
          "correct": true,
          "feedback": "La direction de l’évaluation change entre les deux phrases."
        },
        {
          "text": "It explains why the hotel was cheap.",
          "correct": false,
          "feedback": "Le lien de cause n’est pas exprimé."
        },
        {
          "text": "It concludes that the distance was caused by the price.",
          "correct": false,
          "feedback": "Aucune conséquence de ce type n’est donnée."
        }
      ],
      "productionPrompt": "Écris deux phrases anglaises reliées par “therefore”, puis transforme-les avec “because” sans changer la relation cause-résultat.",
      "modelResponse": "The last train had left; therefore, we took a taxi. / We took a taxi because the last train had left.",
      "takeaway": "Observe le contexte, choisis la formulation naturelle, puis produis ta propre phrase en anglais.",
      "difficulty": "moyen"
    },
    "eng-connectors-concession": {
      "id": "eng-lab-despite",
      "skill": "Structure",
      "title": "Même contraste, bonne grammaire",
      "context": "Tu veux dire “malgré la pluie”.",
      "speak": "Despite the rain, we went out.",
      "prompt": "Quelle structure est naturelle ?",
      "choices": [
        {
          "text": "Despite the rain, we went out.",
          "correct": true,
          "feedback": "Despite accepte directement un groupe nominal."
        },
        {
          "text": "Despite it was raining, we went out.",
          "correct": false,
          "feedback": "Une proposition finie n’est pas la structure standard après despite."
        },
        {
          "text": "Although the rain, we went out.",
          "correct": false,
          "feedback": "Although demande normalement une proposition complète."
        }
      ],
      "productionPrompt": "Produis en anglais la même idée deux fois : une avec “although”, une avec “despite”.",
      "modelResponse": "Although it was raining, we went out. / Despite the rain, we went out.",
      "takeaway": "Observe le contexte, choisis la formulation naturelle, puis produis ta propre phrase en anglais.",
      "difficulty": "moyen"
    },
    "eng-implicit-meaning": {
      "id": "eng-lab-understatement",
      "skill": "Implicite",
      "title": "Quel message derrière les mots ?",
      "context": "Une proposition en réunion reçoit trois objections sérieuses.",
      "speak": "I'm not sure that would work.",
      "prompt": "Quelle intention est la plus probable ?",
      "choices": [
        {
          "text": "A softened disagreement.",
          "correct": true,
          "feedback": "Les objections qui suivent montrent que la réserve est substantielle."
        },
        {
          "text": "A request to hear the exact same proposal again.",
          "correct": false,
          "feedback": "Le problème n’est pas un manque d’audition ou d’information."
        },
        {
          "text": "A strong sign of approval.",
          "correct": false,
          "feedback": "La suite négative rend cette lecture très improbable."
        }
      ],
      "productionPrompt": "Écris en anglais une manière polie mais claire de dire que tu préfères la deuxième option.",
      "modelResponse": "I’m not sure the first option will work for us. I’d prefer the second one.",
      "takeaway": "Observe le contexte, choisis la formulation naturelle, puis produis ta propre phrase en anglais.",
      "difficulty": "moyen"
    },
    "eng-implicit-understatement": {
      "id": "eng-lab-audio-mind",
      "skill": "Hedging",
      "title": "Doux dans les mots, fort dans la décision",
      "context": "Le lancement vient de révéler un risque sérieux.",
      "speak": "We might need to rethink this.",
      "prompt": "Quelle suite montrerait que la réserve est en réalité forte ?",
      "choices": [
        {
          "text": "They stop the launch and schedule an urgent review.",
          "correct": true,
          "feedback": "L’action transforme une formulation prudente en réserve opérationnelle majeure."
        },
        {
          "text": "They keep everything unchanged and move on.",
          "correct": false,
          "feedback": "Cette suite affaiblirait fortement l’interprétation sérieuse."
        },
        {
          "text": "They laugh about a harmless typo.",
          "correct": false,
          "feedback": "Le contexte deviendrait mineur, donc le hedge serait beaucoup moins chargé."
        }
      ],
      "productionPrompt": "Écris une phrase anglaise qui exprime une recommandation ferme avec une légère atténuation, sans devenir vague.",
      "modelResponse": "I think we need one more day before we launch.",
      "takeaway": "Observe le contexte, choisis la formulation naturelle, puis produis ta propre phrase en anglais.",
      "difficulty": "moyen"
    }
  },
  "mysteries": [
    {
      "id": "english-mystery-actually-318",
      "discipline": "english",
      "difficulty": "facile",
      "title": "Correction en réunion",
      "caseTitle": "English in context",
      "subjectType": "usage réel",
      "periodHint": "anglais contemporain",
      "lessonId": "eng-false-friends-core",
      "missionQuestion": "Quelle réponse corrige naturellement la supposition ?",
      "answerInstruction": "Choisis la formulation ou l’interprétation qui convient à la scène.",
      "prompt": "Un collègue dit : “So you live in Paris now?” Tu travailles à Paris, mais tu vis à Lille.",
      "answer": "Actually, I live in Lille. I only work in Paris.",
      "aliases": [
        "Actually, I live in Lille. I only work in Paris.",
        "Actually, I live in Lille. I only work in Paris",
        "actually, i live in lille. i only work in paris."
      ],
      "clues": [
        "Regarde ce que la personne essaie de faire, pas seulement les mots isolés.",
        "Compare le registre et la conséquence de chaque formulation.",
        "Les mauvaises réponses restent proches en surface mais changent le sens ou la relation."
      ],
      "explanation": "Actually sert ici à corriger l’hypothèse “tu vis à Paris”. Currently pourrait situer le présent, mais ne marque pas aussi nettement la rectification.",
      "blockedGuesses": [
        "Currently, I live in Lille. I only work in Paris.",
        "Eventually, I live in Lille. I only work in Paris.",
        "I possibly live in Lille. I only work in Paris."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "englishScenarioRC37": true
    },
    {
      "id": "english-mystery-eventually-318",
      "discipline": "english",
      "difficulty": "facile",
      "title": "Après trois essais",
      "caseTitle": "English in context",
      "subjectType": "usage réel",
      "periodHint": "anglais contemporain",
      "lessonId": "eng-false-friends-core",
      "missionQuestion": "Quelle phrase raconte le mieux cette trajectoire ?",
      "answerInstruction": "Choisis la formulation ou l’interprétation qui convient à la scène.",
      "prompt": "Après deux échecs, Maya tente une troisième fois et réussit enfin son examen.",
      "answer": "She eventually passed the exam.",
      "aliases": [
        "She eventually passed the exam.",
        "She eventually passed the exam",
        "she eventually passed the exam."
      ],
      "clues": [
        "Regarde ce que la personne essaie de faire, pas seulement les mots isolés.",
        "Compare le registre et la conséquence de chaque formulation.",
        "Les mauvaises réponses restent proches en surface mais changent le sens ou la relation."
      ],
      "explanation": "Eventually présente l’issue finale après plusieurs étapes ou tentatives ; les autres phrases changent le rapport au temps ou à la certitude.",
      "blockedGuesses": [
        "She currently passed the exam.",
        "She possibly passed the exam.",
        "She actually passes the exam every time."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "englishScenarioRC37": true
    },
    {
      "id": "english-mystery-afraid-318",
      "discipline": "english",
      "difficulty": "facile",
      "title": "Mauvaise nouvelle à l’hôtel",
      "caseTitle": "English in context",
      "subjectType": "usage réel",
      "periodHint": "anglais contemporain",
      "lessonId": "eng-polite-register",
      "missionQuestion": "Quelle formulation est la plus adaptée ?",
      "answerInstruction": "Choisis la formulation ou l’interprétation qui convient à la scène.",
      "prompt": "À la réception, il ne reste aucune chambre. Le réceptionniste veut annoncer le refus poliment mais sans laisser croire qu’une chambre est peut-être disponible.",
      "answer": "I'm afraid we don't have any rooms left.",
      "aliases": [
        "I'm afraid we don't have any rooms left.",
        "I'm afraid we don't have any rooms left",
        "im afraid we dont have any rooms left."
      ],
      "clues": [
        "Regarde ce que la personne essaie de faire, pas seulement les mots isolés.",
        "Compare le registre et la conséquence de chaque formulation.",
        "Les mauvaises réponses restent proches en surface mais changent le sens ou la relation."
      ],
      "explanation": "“I’m afraid” fonctionne comme atténuateur de mauvaise nouvelle tout en laissant l’information principale parfaitement claire.",
      "blockedGuesses": [
        "I'm not sure we maybe have no rooms left.",
        "We have no rooms. That's your problem.",
        "I'm frightened because there are no rooms."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "englishScenarioRC37": true
    },
    {
      "id": "english-mystery-yet-318",
      "discipline": "english",
      "difficulty": "facile",
      "title": "Toujours attendu",
      "caseTitle": "English in context",
      "subjectType": "usage réel",
      "periodHint": "anglais contemporain",
      "lessonId": "eng-still-yet-already-even",
      "missionQuestion": "Quelle phrase exprime le mieux cette situation ?",
      "answerInstruction": "Choisis la formulation ou l’interprétation qui convient à la scène.",
      "prompt": "À 16 h, le rapport n’est pas envoyé, mais la personne prévoit toujours de l’envoyer aujourd’hui.",
      "answer": "I haven't sent the report yet.",
      "aliases": [
        "I haven't sent the report yet.",
        "I haven't sent the report yet",
        "i havent sent the report yet."
      ],
      "clues": [
        "Regarde ce que la personne essaie de faire, pas seulement les mots isolés.",
        "Compare le registre et la conséquence de chaque formulation.",
        "Les mauvaises réponses restent proches en surface mais changent le sens ou la relation."
      ],
      "explanation": "Not ... yet décrit une action non accomplie jusqu’à maintenant tout en conservant l’idée qu’elle reste attendue.",
      "blockedGuesses": [
        "I've already sent the report.",
        "I'm still sending the report yesterday.",
        "I even sent the report."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "englishScenarioRC37": true
    },
    {
      "id": "english-mystery-turnout-318",
      "discipline": "english",
      "difficulty": "moyen",
      "title": "La réalité après coup",
      "caseTitle": "English in context",
      "subjectType": "usage réel",
      "periodHint": "anglais contemporain",
      "lessonId": "eng-phrasal-context",
      "missionQuestion": "Quelle phrase raconte naturellement cette découverte ?",
      "answerInstruction": "Choisis la formulation ou l’interprétation qui convient à la scène.",
      "prompt": "Vous pensiez qu’un e-mail était authentique. Après vérification, vous découvrez que c’était une arnaque.",
      "answer": "It turned out to be a scam.",
      "aliases": [
        "It turned out to be a scam.",
        "It turned out to be a scam",
        "it turned out to be a scam."
      ],
      "clues": [
        "Regarde ce que la personne essaie de faire, pas seulement les mots isolés.",
        "Compare le registre et la conséquence de chaque formulation.",
        "Les mauvaises réponses restent proches en surface mais changent le sens ou la relation."
      ],
      "explanation": "Turn out to be sert à révéler la réalité finale après une attente ou une croyance différente ; c’est exactement la structure de cette scène.",
      "blockedGuesses": [
        "It called off to be a scam.",
        "It ran out of being a scam.",
        "It figured out to be a scam."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "englishScenarioRC37": true
    },
    {
      "id": "english-mystery-soft-disagree-318",
      "discipline": "english",
      "difficulty": "moyen",
      "title": "Désaccord sans claquer la porte",
      "caseTitle": "English in context",
      "subjectType": "usage réel",
      "periodHint": "anglais contemporain",
      "lessonId": "eng-implicit-meaning",
      "missionQuestion": "Quelle réponse est la plus naturelle ?",
      "answerInstruction": "Choisis la formulation ou l’interprétation qui convient à la scène.",
      "prompt": "En réunion, tu veux signaler qu’une proposition pose problème et ouvrir immédiatement une alternative.",
      "answer": "I'm not sure that would work. Could we try the second option instead?",
      "aliases": [
        "I'm not sure that would work. Could we try the second option instead?",
        "I'm not sure that would work. Could we try the second option instead?",
        "im not sure that would work. could we try the second option instead?"
      ],
      "clues": [
        "Regarde ce que la personne essaie de faire, pas seulement les mots isolés.",
        "Compare le registre et la conséquence de chaque formulation.",
        "Les mauvaises réponses restent proches en surface mais changent le sens ou la relation."
      ],
      "explanation": "La phrase exprime un désaccord réel mais atténué, puis transforme la critique en prochaine étape concrète avec une alternative.",
      "blockedGuesses": [
        "That won't work. Next idea.",
        "Maybe it is perhaps somehow not perfect.",
        "I'm not sure what the proposal means at all."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "englishScenarioRC37": true
    },
    {
      "id": "english-mystery-sensible-rc19",
      "discipline": "english",
      "difficulty": "moyen",
      "title": "Une décision raisonnable",
      "caseTitle": "English in context",
      "subjectType": "usage réel",
      "periodHint": "anglais contemporain",
      "lessonId": "eng-false-friends-second-wave",
      "missionQuestion": "Quelle réaction sonne naturelle ?",
      "answerInstruction": "Choisis la formulation ou l’interprétation qui convient à la scène.",
      "prompt": "Le temps manque. Un plan plus simple réduit le risque sans sacrifier l’objectif.",
      "answer": "That sounds like a sensible decision.",
      "aliases": [
        "That sounds like a sensible decision.",
        "That sounds like a sensible decision",
        "that sounds like a sensible decision."
      ],
      "clues": [
        "Regarde ce que la personne essaie de faire, pas seulement les mots isolés.",
        "Compare le registre et la conséquence de chaque formulation.",
        "Les mauvaises réponses restent proches en surface mais changent le sens ou la relation."
      ],
      "explanation": "Sensible qualifie naturellement une décision raisonnable et pratique ; sensitive et comprehensive appartiennent à d’autres types de contexte.",
      "blockedGuesses": [
        "That sounds like a sensitive decision.",
        "That sounds like a comprehensive decision.",
        "That sounds like an understanding decision."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "englishScenarioRC37": true
    },
    {
      "id": "english-mystery-one-reference-rc19",
      "discipline": "english",
      "difficulty": "moyen",
      "title": "Le nom disparu",
      "caseTitle": "English in context",
      "subjectType": "usage réel",
      "periodHint": "anglais contemporain",
      "lessonId": "eng-context-reference",
      "missionQuestion": "Que représente “one” dans cette phrase ?",
      "answerInstruction": "Choisis la formulation ou l’interprétation qui convient à la scène.",
      "prompt": "“My charger is broken, so I need to buy a new one.” Le nom n’est pas répété dans la seconde proposition.",
      "answer": "A new charger.",
      "aliases": [
        "A new charger.",
        "A new charger",
        "a new charger."
      ],
      "clues": [
        "Regarde ce que la personne essaie de faire, pas seulement les mots isolés.",
        "Compare le registre et la conséquence de chaque formulation.",
        "Les mauvaises réponses restent proches en surface mais changent le sens ou la relation."
      ],
      "explanation": "One remplace charger, déjà disponible dans le contexte. Le lecteur reconstruit le nom sans qu’il soit répété.",
      "blockedGuesses": [
        "A new phone.",
        "A new battery.",
        "A new problem."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "englishScenarioRC37": true
    },
    {
      "id": "english-mystery-pretty-rc19",
      "discipline": "english",
      "difficulty": "moyen",
      "title": "Pretty sans apparence",
      "caseTitle": "English in context",
      "subjectType": "usage réel",
      "periodHint": "anglais contemporain",
      "lessonId": "eng-small-words-just-quite",
      "missionQuestion": "Quelle reformulation anglaise garde le mieux le ton ?",
      "answerInstruction": "Choisis la formulation ou l’interprétation qui convient à la scène.",
      "prompt": "Un étudiant sort d’un examen exigeant et dit : “That was pretty difficult.” Il ne parle évidemment pas d’apparence.",
      "answer": "That was fairly difficult.",
      "aliases": [
        "That was fairly difficult.",
        "That was fairly difficult",
        "that was fairly difficult."
      ],
      "clues": [
        "Regarde ce que la personne essaie de faire, pas seulement les mots isolés.",
        "Compare le registre et la conséquence de chaque formulation.",
        "Les mauvaises réponses restent proches en surface mais changent le sens ou la relation."
      ],
      "explanation": "Pretty fonctionne ici comme intensifieur informel. Fairly difficult conserve une intensité modérée sans introduire l’idée de beauté.",
      "blockedGuesses": [
        "That was visually attractive.",
        "That was impossible to understand.",
        "That was slightly beautiful."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "englishScenarioRC37": true
    },
    {
      "id": "english-mystery-email-rc19",
      "discipline": "english",
      "difficulty": "moyen",
      "title": "La bonne relance",
      "caseTitle": "English in context",
      "subjectType": "usage réel",
      "periodHint": "anglais contemporain",
      "lessonId": "eng-register-email-directness",
      "missionQuestion": "Quelle relance est la mieux calibrée ?",
      "answerInstruction": "Choisis la formulation ou l’interprétation qui convient à la scène.",
      "prompt": "Tu as envoyé un brouillon à un collègue il y a deux jours. C’est la première relance et il n’y a pas encore d’urgence.",
      "answer": "Just checking whether you had a chance to look at the draft.",
      "aliases": [
        "Just checking whether you had a chance to look at the draft.",
        "Just checking whether you had a chance to look at the draft",
        "just checking whether you had a chance to look at the draft."
      ],
      "clues": [
        "Regarde ce que la personne essaie de faire, pas seulement les mots isolés.",
        "Compare le registre et la conséquence de chaque formulation.",
        "Les mauvaises réponses restent proches en surface mais changent le sens ou la relation."
      ],
      "explanation": "La formulation demande une mise à jour sans attribuer de faute ni inventer l’intention du collègue ; elle convient à une première relance.",
      "blockedGuesses": [
        "You still haven't replied to my draft.",
        "I require your immediate feedback on the draft.",
        "I assume you rejected the draft because you didn't answer."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "englishScenarioRC37": true
    },
    {
      "id": "english-mystery-getover-rc19",
      "discipline": "english",
      "difficulty": "moyen",
      "title": "Deux semaines plus tard",
      "caseTitle": "English in context",
      "subjectType": "usage réel",
      "periodHint": "anglais contemporain",
      "lessonId": "eng-phrasal-get",
      "missionQuestion": "Quelle phrase raconte naturellement cette récupération ?",
      "answerInstruction": "Choisis la formulation ou l’interprétation qui convient à la scène.",
      "prompt": "Après une grippe, quelqu’un retrouve progressivement son état normal après deux semaines.",
      "answer": "It took him two weeks to get over the flu.",
      "aliases": [
        "It took him two weeks to get over the flu.",
        "It took him two weeks to get over the flu",
        "it took him two weeks to get over the flu."
      ],
      "clues": [
        "Regarde ce que la personne essaie de faire, pas seulement les mots isolés.",
        "Compare le registre et la conséquence de chaque formulation.",
        "Les mauvaises réponses restent proches en surface mais changent le sens ou la relation."
      ],
      "explanation": "Get over décrit la récupération après une maladie ou une expérience difficile ; les autres constructions avec get décrivent des résultats différents.",
      "blockedGuesses": [
        "It took him two weeks to get by the flu.",
        "It took him two weeks to get away with the flu.",
        "It took him two weeks to get back the flu."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "englishScenarioRC37": true
    },
    {
      "id": "english-mystery-clarify-rc19",
      "discipline": "english",
      "difficulty": "difficile",
      "title": "Un seul mot bloque",
      "caseTitle": "English in context",
      "subjectType": "usage réel",
      "periodHint": "anglais contemporain",
      "lessonId": "eng-paraphrase-clarify",
      "missionQuestion": "Quelle question est la plus efficace ?",
      "answerInstruction": "Choisis la formulation ou l’interprétation qui convient à la scène.",
      "prompt": "Tu comprends toute la phrase sauf “reliable”. Tu veux demander de l’aide sans faire répéter tout le reste.",
      "answer": "What do you mean by 'reliable' here?",
      "aliases": [
        "What do you mean by 'reliable' here?",
        "What do you mean by 'reliable' here?",
        "what do you mean by reliable here?"
      ],
      "clues": [
        "Regarde ce que la personne essaie de faire, pas seulement les mots isolés.",
        "Compare le registre et la conséquence de chaque formulation.",
        "Les mauvaises réponses restent proches en surface mais changent le sens ou la relation."
      ],
      "explanation": "La question cible l’unique zone d’incertitude et conserve les informations déjà comprises, ce qui rend la réparation courte et naturelle.",
      "blockedGuesses": [
        "Could you repeat everything from the beginning?",
        "Can you explain every word in that sentence?",
        "I don't understand anything."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "englishScenarioRC37": true
    },
    {
      "id": "english-mystery-despite-rc19",
      "discipline": "english",
      "difficulty": "difficile",
      "title": "Même idée, bonne structure",
      "caseTitle": "English in context",
      "subjectType": "usage réel",
      "periodHint": "anglais contemporain",
      "lessonId": "eng-connectors-concession",
      "missionQuestion": "Quelle phrase est naturelle ?",
      "answerInstruction": "Choisis la formulation ou l’interprétation qui convient à la scène.",
      "prompt": "Tu veux exprimer “Malgré la pluie, nous sommes sortis” avec despite et un groupe nominal.",
      "answer": "Despite the rain, we went out.",
      "aliases": [
        "Despite the rain, we went out.",
        "Despite the rain, we went out",
        "despite the rain, we went out."
      ],
      "clues": [
        "Regarde ce que la personne essaie de faire, pas seulement les mots isolés.",
        "Compare le registre et la conséquence de chaque formulation.",
        "Les mauvaises réponses restent proches en surface mais changent le sens ou la relation."
      ],
      "explanation": "Despite se construit ici avec le groupe nominal the rain. Although demanderait une proposition complète : although it was raining.",
      "blockedGuesses": [
        "Despite it was raining, we went out.",
        "Although the rain, we went out.",
        "However the rain, we went out."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "englishScenarioRC37": true
    },
    {
      "id": "english-mystery-notideal-rc19",
      "discipline": "english",
      "difficulty": "difficile",
      "title": "Deux mots faibles, gros problème",
      "caseTitle": "English in context",
      "subjectType": "usage réel",
      "periodHint": "anglais contemporain",
      "lessonId": "eng-implicit-understatement",
      "missionQuestion": "Que fait la formulation “not ideal” dans cette scène ?",
      "answerInstruction": "Choisis la formulation ou l’interprétation qui convient à la scène.",
      "prompt": "Un déploiement efface plusieurs heures de travail. L’ingénieur dit “Well, that’s not ideal” puis lance immédiatement une récupération d’urgence.",
      "answer": "It understates a serious problem.",
      "aliases": [
        "It understates a serious problem.",
        "It understates a serious problem",
        "it understates a serious problem."
      ],
      "clues": [
        "Regarde ce que la personne essaie de faire, pas seulement les mots isolés.",
        "Compare le registre et la conséquence de chaque formulation.",
        "Les mauvaises réponses restent proches en surface mais changent le sens ou la relation."
      ],
      "explanation": "La gravité de la situation et l’action d’urgence montrent que les mots sont volontairement plus faibles que l’évaluation réelle.",
      "blockedGuesses": [
        "It shows the engineer thinks the problem is minor.",
        "It means the engineer has not understood what happened.",
        "It expresses genuine satisfaction with the deployment."
      ],
      "modeMystery": true,
      "manualCluesB97": true,
      "cluesCleaned": true,
      "rescueAvailable": true,
      "englishScenarioRC37": true
    }
  ]
};

  const MYSTERY_DEPTH = {
    "english-mystery-actually-318": ["La réponse doit montrer clairement que tu rectifies une idée déjà formulée par l'autre personne.", "La nuance importante est conversationnelle : actually corrige, alors que currently situe simplement une situation dans le présent."],
    "english-mystery-eventually-318": ["Le contexte contient plusieurs tentatives : la phrase doit faire sentir l'issue obtenue au terme de ce processus.", "Eventually regarde vers le résultat final après une progression ; il ne marque ni une simple possibilité ni le présent actuel."],
    "english-mystery-afraid-318": ["Le client doit comprendre immédiatement qu'il n'y a plus de chambre, tout en recevant la nouvelle sans brutalité inutile.", "La formule atténue l'annonce négative sans affaiblir son contenu : le refus reste ferme et parfaitement compréhensible."],
    "english-mystery-yet-318": ["L'élément décisif est que l'envoi reste prévu : l'absence d'action est vraie maintenant, pas présentée comme définitive.", "Yet maintient une attente ouverte jusqu'au moment présent ; il ne transforme pas la phrase en abandon du projet."],
    "english-mystery-turnout-318": ["La formulation doit opposer ce que vous croyiez au départ à la réalité découverte après la vérification.", "Turn out to be sert précisément à révéler après coup une réalité différente de l'hypothèse ou de l'attente initiale."],
    "english-mystery-soft-disagree-318": ["Le but n'est pas seulement d'être poli : il faut aussi rendre visible le désaccord et proposer une voie de sortie concrète.", "La bonne réponse combine une réserve compréhensible avec une alternative, ce qui évite autant la brutalité que le flou diplomatique."],
    "english-mystery-sensible-rc19": ["Le mot recherché doit évaluer le caractère pratique et raisonnable du choix, pas sa charge émotionnelle ou sa sensibilité.", "Sensible appartient naturellement aux décisions et précautions raisonnables ; sensitive décrit plutôt ce qui réagit fortement ou demande de la délicatesse."],
    "english-mystery-one-reference-rc19": ["Pour résoudre la scène, réinsère mentalement le nom déjà mentionné à l'endroit où one évite sa répétition.", "One agit ici comme substitut nominal : il permet de parler d'un nouveau chargeur sans répéter charger une seconde fois."],
    "english-mystery-pretty-rc19": ["Cherche une reformulation qui conserve une intensité conversationnelle modérée, sans transformer l'évaluation en jugement extrême.", "Pretty est un intensifieur informel devant difficult ; l'idée porte sur le degré de difficulté, pas sur l'apparence de l'examen."],
    "english-mystery-email-rc19": ["Comme il s'agit d'une première relance sans urgence, la formulation doit demander une mise à jour sans attribuer de mauvaise intention.", "Just checking fonctionne comme une relance légère : elle rappelle le dossier tout en laissant ouverte la possibilité d'un simple retard."],
    "english-mystery-getover-rc19": ["La phrase doit décrire un passage progressif de l'état malade vers un retour à l'état normal après plusieurs jours.", "Get over correspond à cette trajectoire de récupération ; get by ou get away with décrivent des résultats totalement différents."],
    "english-mystery-clarify-rc19": ["Tu as déjà compris le reste de la phrase : une bonne réparation doit donc viser uniquement le mot qui bloque.", "La question ciblée préserve les informations acquises et demande exactement la reformulation utile, au lieu de recommencer toute la conversation."],
    "english-mystery-despite-rc19": ["Le sens de concession est déjà choisi ; le vrai problème consiste maintenant à sélectionner la structure grammaticale qui suit naturally despite.", "Despite accepte ici le groupe nominal the rain, tandis que although introduirait une proposition complète avec sujet et verbe."],
    "english-mystery-notideal-rc19": ["La formulation doit être interprétée avec ce que l'ingénieur fait ensuite : la procédure d'urgence révèle la force réelle de son jugement.", "L'understatement naît du contraste entre des mots volontairement faibles et une situation dont les conséquences montrent qu'elle est très sérieuse."]
  };
  for (const mystery of PAYLOAD.mysteries) {
    const depth = MYSTERY_DEPTH[mystery.id];
    if (!depth) continue;
    mystery.prompt = `${mystery.prompt} ${depth[0]}`;
    mystery.explanation = `${mystery.explanation} ${depth[1]}`;
  }

  const titleById = Object.fromEntries(Object.entries(PAYLOAD.courses).map(([id, pack]) => [id, pack.title]));
  for (const [id, spec] of Object.entries(PAYLOAD.courses)) {
    READY_LESSON_PACKS[id] = {
      title: spec.title,
      hook: spec.hook,
      keyFacts: [
        "Comprendre la scène avant de traduire.",
        "Choisir une formulation naturelle, pas seulement grammaticale.",
        "Lire le registre et l’intention.",
        "Produire une phrase personnelle pour fixer la compétence."
      ],
      express: spec.express,
      complete: spec.sections,
      deeper: [],
      takeaways: spec.takeaways,
      quiz: spec.quiz,
      editorialStatus: "published",
      contentRevision: "rc37-english-situational",
      englishExperience: { mode: "situation-intent-production", redesigned: true }
    };
    PUBLISHED_LESSON_IDS.add(id);
  }

  // Retitle existing lesson cards without changing IDs/progress.
  try {
    for (const lessons of Object.values(data.lessons || {})) {
      if (!Array.isArray(lessons)) continue;
      for (const lesson of lessons) if (titleById[lesson?.id]) lesson.title = titleById[lesson.id];
    }
  } catch {}

  // English labs become language-use checkpoints; philosophy labs remain untouched.
  const oldLabs = window.HD_DISCIPLINE_LABS || {};
  window.HD_DISCIPLINE_LABS = { ...oldLabs, english: Object.values(PAYLOAD.labs) };

  // Replace every existing English mystery with a situational language task while preserving IDs/history.
  if (Array.isArray(data.mysteries)) {
    const replacement = new Map(PAYLOAD.mysteries.map(item => [item.id, item]));
    data.mysteries = data.mysteries.map(item => item?.discipline === "english" && replacement.has(item.id) ? replacement.get(item.id) : item);
    const known = new Set(data.mysteries.map(item => item?.id));
    for (const item of PAYLOAD.mysteries) if (!known.has(item.id)) data.mysteries.push(item);
  }

  try {
    DISCIPLINE_MODE_COPY.english = {
      ...(DISCIPLINE_MODE_COPY.english || {}),
      headline: "Comprends ce que les gens veulent dire — puis réponds naturellement.",
      promise: "Des scènes courtes, de l’écoute, des choix plausibles et de la production. Pas de récitation de règles ni de traduction mot à mot.",
      discoveryTitle: "Scènes d’anglais réel",
      discoveryIntro: "Décoder une intention, choisir le bon registre, reformuler et répondre comme dans une vraie interaction."
    };
  } catch {}

  if (typeof invalidateCatalogCaches === "function") invalidateCatalogCaches(); else try { lessonIndexCache = null; } catch {}
  try {
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      englishRedesignRC37: {
        version: VERSION,
        courses: Object.keys(PAYLOAD.courses).length,
        labs: Object.keys(PAYLOAD.labs).length,
        mysteries: PAYLOAD.mysteries.length,
        principles: ["context", "naturalness", "register", "intent", "paraphrase", "production"]
      }
    };
  } catch {}
})();
