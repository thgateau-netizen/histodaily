/* HistoDaily RC50 — English utility overhaul: each lesson is a reusable language pack, not a one-word fact sheet. */
(function histodailyRc50EnglishUtility(){
  "use strict";
  const VERSION="1.0.0-rc.50.0";
  const COURSE_SPECS={
  "eng-context-inference": {
    "title": "Garder la conversation en vie",
    "hook": "Le premier réflexe utile en anglais n’est pas de connaître tous les mots : c’est de savoir continuer quand tu n’as pas entendu, pas compris ou pas trouvé le mot. Tu repars avec six phrases de secours utilisables dès aujourd’hui.",
    "targets": [
      [
        "Sorry, I didn’t catch that.",
        "Tu n’as pas bien entendu."
      ],
      [
        "Could you say that again?",
        "Tu demandes simplement de répéter."
      ],
      [
        "What do you mean by …?",
        "Un mot ou une expression te bloque."
      ],
      [
        "Do you mean …?",
        "Tu vérifies ton interprétation."
      ],
      [
        "I’m not sure what … means, but …",
        "Tu continues malgré un mot inconnu."
      ],
      [
        "Let me think for a second.",
        "Tu gagnes quelques secondes sans casser l’échange."
      ]
    ],
    "dialogue": "At a noisy café: “The last train is at ten past eleven.” — “Sorry, I didn’t catch that. Did you say ten past eleven?” — “Yes.” — “Got it, thanks.” Trois gestes suffisent : signaler le trou, proposer ce que tu as compris, puis repartir. Pas besoin de dire “I don’t understand English”.",
    "contrast": "Si le son manque, demande de répéter. Si un seul mot bloque, demande ce qu’il veut dire. Si tu crois avoir compris, vérifie avec Do you mean…? Et si le sens global tient malgré un mot inconnu, continue : “I’m not sure what packed means, but it sounds like the place was very crowded.”",
    "production": "Choisis trois situations réelles : quelqu’un parle trop vite, un mot te manque, puis tu as besoin de deux secondes pour réfléchir. Produis une réponse anglaise pour chacune. Le but est que ces phrases deviennent automatiques, pas de les réciter dans un ordre.",
    "quiz": [
      [
        "Dans un bar bruyant, tu n’as pas entendu l’heure. Quelle réponse sonne la plus naturelle ?",
        "Sorry, I didn’t catch that. What time did you say?",
        [
          "I don’t understand the conversation.",
          "Repeat the complete information now.",
          "What is the meaning of the time?"
        ],
        "Tu signales précisément le problème puis tu demandes l’information manquante, sans dramatiser."
      ],
      [
        "Tu comprends toute la phrase sauf “reliable”. Que demandes-tu ?",
        "What do you mean by “reliable” here?",
        [
          "Could you repeat everything from the start?",
          "What is the French translation of the sentence?",
          "Can you speak with easier grammar?"
        ],
        "La question cible exactement le mot qui bloque et garde le reste de l’échange intact."
      ],
      [
        "Tu penses avoir entendu “Friday”, mais tu veux vérifier. Que dis-tu ?",
        "Do you mean the meeting is on Friday?",
        [
          "Is the meeting meaning Friday?",
          "Tell me again about the whole meeting.",
          "Friday is the meeting, yes or no?"
        ],
        "Do you mean…? permet de proposer ton interprétation et de la faire confirmer."
      ],
      [
        "Tu ne connais pas “packed”, mais les gens attendent dehors faute de place. Quelle phrase montre une bonne stratégie ?",
        "I’m not sure what “packed” means, but it sounds like the place was very crowded.",
        [
          "I need the exact translation before I can understand anything.",
          "Packed probably means expensive because cafés can be expensive.",
          "I’ll ignore the whole sentence because one word is missing."
        ],
        "Tu gardes une hypothèse explicite et fondée sur la scène sans prétendre connaître le mot exactement."
      ],
      [
        "On te pose une question et tu veux deux secondes pour réfléchir. Quelle réponse est naturelle ?",
        "Let me think for a second.",
        [
          "Wait because I am searching my English.",
          "Give me silence for two seconds.",
          "I need to construct my answer now."
        ],
        "Let me think… est une petite phrase très courante pour conserver ton tour de parole sans stress."
      ]
    ],
    "productionPrompt": "Réponds à voix haute à trois micro-situations : tu n’as pas entendu, tu ne comprends qu’un mot, puis tu veux vérifier ce que tu as compris.",
    "modelResponse": "Sorry, I didn’t catch that. / What do you mean by “reliable” here? / Do you mean we’re meeting on Friday?"
  },
  "eng-context-reference": {
    "title": "Réagir naturellement au lieu de rester silencieux",
    "hook": "Une conversation paraît beaucoup plus fluide quand tu sais montrer que tu suis. Ici, tu apprends six petites réactions qui valent souvent plus qu’une longue phrase parfaite.",
    "targets": [
      [
        "Really?",
        "Surprise ou invitation à continuer."
      ],
      [
        "That makes sense.",
        "Tu montres que l’explication te paraît logique."
      ],
      [
        "I see what you mean.",
        "Tu reconnais le point de vue ou l’explication."
      ],
      [
        "Fair enough.",
        "Tu acceptes un argument ou une limite, sans forcément être enthousiaste."
      ],
      [
        "Sounds good.",
        "Tu acceptes une proposition ou un plan."
      ],
      [
        "No way!",
        "Surprise forte, très informelle : à réserver au bon contexte."
      ]
    ],
    "dialogue": "“I’m taking Friday off — I’ve worked twelve days straight.” — “Fair enough.” / “Let’s meet at seven and eat first.” — “Sounds good.” / “The cheaper train takes two hours longer.” — “Ah, that makes sense.” Ces réactions ne traduisent pas un mot : elles font avancer l’échange.",
    "contrast": "Really? invite souvent l’autre à développer. I see what you mean reconnaît son raisonnement, même sans être d’accord. Fair enough accepte un point. Sounds good valide un plan. No way! peut être chaleureux entre amis mais trop familier dans un contexte professionnel.",
    "production": "Prends une même nouvelle — “I’m moving to Canada next month.” — et réponds de trois façons : surprise, compréhension, puis réaction enthousiaste. Fais attention à l’intonation : ces petites phrases vivent beaucoup à l’oral.",
    "quiz": [
      [
        "Un ami annonce qu’il part vivre au Japon. Tu veux montrer une surprise intéressée. Que réponds-tu ?",
        "Really? That’s a big move.",
        [
          "Fair enough. That is administratively acceptable.",
          "Sounds good, I approve your relocation.",
          "I see the grammar of what you mean."
        ],
        "Really? invite naturellement l’autre à raconter la suite sans surjouer."
      ],
      [
        "On t’explique que le billet bon marché prend deux heures de plus. Quelle réaction montre que tu comprends la logique ?",
        "Ah, that makes sense.",
        [
          "No way, that is impossible.",
          "Sounds good, let’s buy every ticket.",
          "Fair enough, I disagree completely."
        ],
        "That makes sense valide la logique de l’explication, pas nécessairement le choix final."
      ],
      [
        "Ton collègue explique pourquoi il préfère l’option B. Tu comprends son point sans promettre d’être d’accord. Que dis-tu ?",
        "I see what you mean.",
        [
          "I see what you are meaning literally.",
          "Sounds good, so the decision is final.",
          "Really? I refuse the explanation."
        ],
        "I see what you mean reconnaît le raisonnement de l’autre et laisse la discussion ouverte."
      ],
      [
        "Un ami refuse une sortie parce qu’il se lève à 5 h. Tu trouves la raison compréhensible. Quelle réaction convient ?",
        "Fair enough. Let’s do it another day.",
        [
          "No way! You must come anyway.",
          "That makes sense, so I am surprised.",
          "Sounds good, I will wake you at five."
        ],
        "Fair enough accepte une raison ou une limite, puis la suite propose une solution."
      ],
      [
        "“Let’s meet at seven outside the cinema.” Tu acceptes simplement. Que réponds-tu ?",
        "Sounds good. See you there.",
        [
          "Really? Why is seven a time?",
          "I see what you mean, but I did not understand.",
          "Fair enough, although I reject the plan."
        ],
        "Sounds good est une réponse très naturelle à un plan qui te convient."
      ]
    ],
    "productionPrompt": "Réagis en anglais à trois annonces : une surprise, une explication logique, puis un plan que tu acceptes.",
    "modelResponse": "Really? / Ah, that makes sense. / Sounds good — see you there."
  },
  "eng-false-friends-core": {
    "title": "Parler du présent, corriger et raconter un changement",
    "hook": "Plutôt qu’un “cours sur actually”, tu apprends six façons différentes de situer une information : corriger quelqu’un, parler de maintenant, d’une période temporaire ou d’un résultat découvert plus tard.",
    "targets": [
      [
        "Actually, …",
        "Tu corriges ou recadres une idée."
      ],
      [
        "At the moment, …",
        "Situation actuelle, souvent temporaire."
      ],
      [
        "Currently, …",
        "Présent actuel, un peu plus neutre/formel."
      ],
      [
        "These days, …",
        "Tendance ou habitude de la période actuelle."
      ],
      [
        "For now, …",
        "Situation valable provisoirement."
      ],
      [
        "It turns out that …",
        "Tu annonces ce que la réalité a finalement révélé."
      ]
    ],
    "dialogue": "“So you live in Paris?” — “Actually, I live in Lille. I’m working in Paris at the moment.” Puis : “For now, I take the train three days a week.” Et après vérification : “It turns out the company may move the office.” Chaque tournure fait un travail différent.",
    "contrast": "Actually ne veut pas simplement dire “actuellement”. At the moment et currently placent la situation maintenant. These days parle d’une période plus large. For now ajoute l’idée de provisoire. It turns out that introduit une réalité découverte, souvent différente de ce qu’on imaginait.",
    "production": "Décris ta propre situation avec trois temporalités : ce qui est vrai en ce moment, ce qui est provisoire, puis une correction que tu pourrais faire à quelqu’un. Ajoute ensuite une phrase avec It turns out that…",
    "quiz": [
      [
        "Quelqu’un pense que tu habites à Paris, mais tu vis à Lille. Quelle ouverture corrige naturellement ?",
        "Actually, I live in Lille — I only work in Paris.",
        [
          "At the moment, I live in Lille — I only work in Paris.",
          "These days, I live in Lille — I only work in Paris.",
          "For now, I live in Lille — I only work in Paris."
        ],
        "Actually signale directement que tu rectifies l’idée exprimée juste avant."
      ],
      [
        "Tu travailles temporairement depuis chez toi cette semaine. Quelle phrase convient ?",
        "I’m working from home at the moment.",
        [
          "Actually, I work from home this week.",
          "It turns out I work from home every second.",
          "These days, I worked from home yesterday."
        ],
        "At the moment situe naturellement une situation actuelle et temporaire."
      ],
      [
        "Tu veux dire que, ces derniers temps, tu cuisines davantage. Que dis-tu ?",
        "These days, I cook at home much more often.",
        [
          "For now, I cooked more often last year.",
          "Actually, I cook because today exists.",
          "Currently, I used to cook more in the past."
        ],
        "These days décrit une tendance de la période actuelle, pas un instant précis."
      ],
      [
        "Ton organisation actuelle est provisoire jusqu’à septembre. Quelle formulation le montre ?",
        "For now, I’m staying with my brother.",
        [
          "Actually, I’m staying with my brother permanently.",
          "These days, I stayed with him once.",
          "It turns out I am staying before now."
        ],
        "For now indique clairement que la situation vaut pour le moment mais peut changer."
      ],
      [
        "Vous pensiez que le problème venait du serveur ; après enquête, c’était le câble. Quelle phrase introduit la découverte ?",
        "It turns out that the cable was the problem.",
        [
          "Currently, the cable was the problem yesterday.",
          "Actually, the cable will eventually be a cable.",
          "For now, the problem turned into a cable."
        ],
        "It turns out that… sert à révéler ce qu’une situation s’est avérée être après vérification."
      ]
    ],
    "productionPrompt": "Fais quatre phrases sur ta vie : une correction avec Actually, une situation actuelle, une situation provisoire et une découverte avec It turns out…",
    "modelResponse": "Actually, I live outside the city. / I’m working late at the moment. / For now, I’m taking the bus. / It turns out the meeting was cancelled."
  },
  "eng-false-friends-second-wave": {
    "title": "Choisir, conseiller et dire ce qui vaut le coup",
    "hook": "Ici, tu n’apprends pas “sensible = raisonnable”. Tu apprends six façons de prendre position quand plusieurs options sont possibles.",
    "targets": [
      [
        "That sounds sensible.",
        "Une option paraît raisonnable/pratique."
      ],
      [
        "I’d go with …",
        "Tu recommandes un choix."
      ],
      [
        "I’d rather …",
        "Tu exprimes ta préférence."
      ],
      [
        "It depends.",
        "La réponse change selon les conditions."
      ],
      [
        "It’s worth it.",
        "Le bénéfice justifie l’effort, le prix ou le temps."
      ],
      [
        "That’s more convenient.",
        "Une option est plus pratique dans l’organisation."
      ]
    ],
    "dialogue": "“The direct train is €20 more, but it saves two hours.” — “It depends. If we’re coming back the same day, I’d go with the direct train. It’s probably worth it.” — “Yeah, that sounds sensible.” Une vraie discussion mobilise plusieurs tournures, pas un adjectif isolé.",
    "contrast": "I’d go with… conseille ; I’d rather… parle de ta préférence. It depends refuse une réponse absolue. Worth it compare bénéfice et coût. Convenient parle de facilité pratique, pas nécessairement de qualité. Sensible évalue un choix comme raisonnable.",
    "production": "Compare deux options réelles : voiture/train, restaurant/maison, hôtel/appartement. Utilise au moins quatre des six expressions pour nuancer ton choix au lieu de donner une réponse binaire.",
    "quiz": [
      [
        "Deux trains : le direct coûte plus cher mais te fait gagner deux heures. Tu recommandes le direct. Que dis-tu ?",
        "I’d go with the direct train if time matters.",
        [
          "I’d rather the direct train is objectively best.",
          "That is sensitive because trains have feelings.",
          "It depends, therefore there is no possible choice."
        ],
        "I’d go with… est une recommandation naturelle et la condition explique ton critère."
      ],
      [
        "Tu préfères manger tôt plutôt que tard. Quelle phrase est naturelle ?",
        "I’d rather eat early.",
        [
          "I’d go with eating is early always.",
          "It’s worth eat early.",
          "I’m sensible to eat early."
        ],
        "I’d rather + base verb exprime directement une préférence personnelle."
      ],
      [
        "“Is renting a car better than taking trains in Scotland?” Tu veux éviter une réponse absolue. Que dis-tu ?",
        "It depends on where you’re going.",
        [
          "It is depending in every possible place.",
          "That sounds sensitive.",
          "I would rather it depends."
        ],
        "It depends on… ouvre naturellement la discussion sur le critère qui change la réponse."
      ],
      [
        "Le musée coûte cher mais tu y passes toute la journée et tu l’adores. Que peux-tu dire ?",
        "It was expensive, but it was worth it.",
        [
          "It was expensive, but it was convenient of money.",
          "It was sensible because expensive means good.",
          "I would go with the museum was worthy."
        ],
        "Worth it exprime que le bénéfice a justifié le coût."
      ],
      [
        "Deux hôtels sont similaires, mais l’un est juste à côté de la gare. Quel commentaire est naturel ?",
        "The one by the station is more convenient.",
        [
          "The one by the station is more sensible emotionally.",
          "The one by the station is more comprehensive.",
          "The one by the station is worth because near."
        ],
        "Convenient décrit précisément l’avantage pratique de l’emplacement dans cette situation."
      ]
    ],
    "productionPrompt": "Compare deux options de ton quotidien en anglais et utilise I’d go with…, It depends…, worth it et convenient.",
    "modelResponse": "It depends on the price. I’d go with the train if it’s under €50. It’s more convenient, and the extra cost is probably worth it."
  },
  "eng-still-yet-already-even": {
    "title": "Dire où tu en es : déjà, encore, pas encore",
    "hook": "Ces petits mots deviennent utiles quand tu les combines dans de vraies mises à jour : travail terminé, tâche en cours, habitude qui a cessé, progrès jusqu’ici.",
    "targets": [
      [
        "not yet",
        "Pas encore, mais l’action reste possible/attendue."
      ],
      [
        "still",
        "La situation continue."
      ],
      [
        "already",
        "Plus tôt que prévu ou simplement déjà accompli."
      ],
      [
        "so far",
        "Jusqu’à maintenant dans une période encore ouverte."
      ],
      [
        "not … anymore",
        "Une situation vraie avant ne l’est plus."
      ],
      [
        "just",
        "Action très récente dans I’ve just…"
      ]
    ],
    "dialogue": "“Have you sent the report yet?” — “Not yet. I’m still checking the figures.” — “Okay. I’ve already sent mine.” — “How’s the project going?” — “So far, pretty well. And we don’t have the budget problem anymore.” Six petites tournures, une seule conversation.",
    "contrast": "Yet/not yet regarde une attente non réalisée. Still insiste sur la continuité. Already met l’action du côté accompli. So far fait un bilan provisoire. Anymore marque la fin d’une ancienne situation. Just place l’action dans un passé très récent.",
    "production": "Fais une mise à jour sur une tâche réelle avec trois états : ce qui est déjà fait, ce qui est encore en cours, ce qui n’est pas encore fait. Ajoute un mini-bilan avec so far.",
    "quiz": [
      [
        "On te demande si tu as envoyé le rapport. Ce n’est pas fait, mais tu le feras. Que réponds-tu ?",
        "Not yet — I’m still checking the figures.",
        [
          "Already not — I check them anymore.",
          "So far no, and I will never send it.",
          "Just no — the report is still yesterday."
        ],
        "Not yet garde l’action attendue ; still décrit ce qui continue maintenant."
      ],
      [
        "Ton collègue a fini beaucoup plus tôt que prévu. Que peut-il dire ?",
        "I’ve already finished it.",
        [
          "I still finished it.",
          "I haven’t finished it anymore.",
          "I’ve so far finish it."
        ],
        "Already convient à une action accomplie, souvent avec une nuance de “déjà”."
      ],
      [
        "Le projet continue et tu fais un bilan positif jusqu’à aujourd’hui. Que dis-tu ?",
        "So far, everything is going well.",
        [
          "Already, everything will go well forever.",
          "Not yet, everything went well last year.",
          "Anymore, everything is going well."
        ],
        "So far résume ce qui s’est passé jusqu’au moment présent sans prédire la suite."
      ],
      [
        "Avant tu prenais le bus, maintenant non. Quelle phrase est naturelle ?",
        "I don’t take the bus anymore.",
        [
          "I still don’t take the bus before.",
          "I haven’t taken the bus yet every day.",
          "I already take the bus no more."
        ],
        "Not… anymore marque qu’une ancienne habitude ou situation a cessé."
      ],
      [
        "Tu viens juste d’arriver. Que dis-tu ?",
        "I’ve just arrived.",
        [
          "I already arrive in this exact second.",
          "I’m still arrived.",
          "I haven’t arrived yet."
        ],
        "Present perfect + just est une façon très naturelle de parler d’une action toute récente."
      ]
    ],
    "productionPrompt": "Donne une mise à jour en quatre phrases avec already, still, not yet et so far.",
    "modelResponse": "I’ve already written the introduction. I’m still working on the figures. I haven’t sent it yet. So far, it’s going well."
  },
  "eng-small-words-just-quite": {
    "title": "Régler le ton : fort, léger, hésitant, enthousiaste",
    "hook": "Un anglais naturel ne dit pas tout à 100 %. Tu apprends six petits réglages qui permettent de parler moins brutalement et plus précisément.",
    "targets": [
      [
        "a bit …",
        "Atténue : a bit tired, a bit expensive."
      ],
      [
        "pretty …",
        "Assez/plutôt, informel : pretty good, pretty hard."
      ],
      [
        "quite …",
        "Degré notable ; la force dépend du contexte."
      ],
      [
        "really …",
        "Renforce clairement."
      ],
      [
        "kind of …",
        "Approximation ou atténuation informelle."
      ],
      [
        "just …",
        "Peut réduire la pression : I just wanted to ask…"
      ]
    ],
    "dialogue": "“How was the exam?” — “Pretty hard, actually. The last question was really difficult, and I was a bit tired.” / “Did you like the film?” — “Yeah, kind of. It was quite slow, though.” Tu peux enfin donner autre chose que good/bad.",
    "contrast": "Really renforce. A bit atténue. Pretty et quite occupent un milieu plus flexible. Kind of rend l’étiquette moins catégorique. Just peut minimiser l’intrusion d’une demande : “I just wanted to check…”",
    "production": "Choisis un film, un repas ou une journée de travail. Décris-le avec quatre degrés différents sans utiliser very. Puis transforme une question directe en relance plus douce avec just.",
    "quiz": [
      [
        "L’examen était assez difficile, sans être catastrophique. Quelle phrase sonne naturelle ?",
        "It was pretty difficult.",
        [
          "It was prettily difficult.",
          "It was really impossible, but easy.",
          "It was a bit absolutely terrible."
        ],
        "Pretty + adjective donne ici une intensité informelle intermédiaire."
      ],
      [
        "Tu veux dire que l’hôtel est légèrement cher. Que dis-tu ?",
        "It’s a bit expensive.",
        [
          "It’s really cheap-expensive.",
          "It’s kind expensive completely.",
          "It’s quite not price."
        ],
        "A bit atténue naturellement l’adjectif et évite de dramatiser."
      ],
      [
        "Tu as adoré le concert. Quelle phrase exprime clairement une forte intensité ?",
        "It was really good.",
        [
          "It was a bit good, absolutely.",
          "It was kind of amazing with certainty.",
          "It was pretty not bad maybe."
        ],
        "Really renforce directement ton évaluation et marque une forte intensité sans ambiguïté."
      ],
      [
        "Tu n’es pas sûr de vouloir appeler le film “comedy”. Que dis-tu ?",
        "It’s kind of a comedy, but not really.",
        [
          "It is a comedy exactly, kind of definitely.",
          "It is quite a comedy noun.",
          "It is a bit of completely comedy."
        ],
        "Kind of permet une catégorisation approximative et la suite explicite ta réserve."
      ],
      [
        "Première relance, sans urgence. Quelle ouverture réduit la pression ?",
        "I just wanted to check whether you saw my message.",
        [
          "I really require you to answer my message.",
          "I kind of demand an immediate response.",
          "I quite need your answer now."
        ],
        "Just présente la relance comme une petite vérification plutôt qu’un reproche."
      ]
    ],
    "productionPrompt": "Décris quelque chose que tu as fait aujourd’hui avec a bit, pretty, really et kind of, puis fais une relance avec just.",
    "modelResponse": "The ride was pretty long, I was a bit tired, but the view was really good. The last climb was kind of brutal. / I just wanted to check whether you saw my message."
  },
  "eng-polite-register": {
    "title": "Demander quelque chose sans sonner bizarre",
    "hook": "Tu vas pratiquer six structures réellement utiles pour demander un service, une information ou une permission, du plus direct au plus diplomatique.",
    "targets": [
      [
        "Could you …?",
        "Demande polie et très polyvalente."
      ],
      [
        "Would you mind …ing?",
        "Demande polie, structure particulière."
      ],
      [
        "Do you happen to have …?",
        "Question légère quand tu n’es pas sûr que l’autre puisse aider."
      ],
      [
        "I was wondering if …",
        "Demande plus indirecte/diplomatique."
      ],
      [
        "Could I possibly …?",
        "Permission formulée avec prudence."
      ],
      [
        "I’d appreciate it if …",
        "Demande assez ferme mais professionnelle."
      ]
    ],
    "dialogue": "À un collègue : “Could you send me the latest file?” À quelqu’un que tu connais peu : “I was wondering if you could send me the latest version.” À l’hôtel : “Do you happen to have a charger I could borrow?” Le contenu est le même ; la relation change la forme.",
    "contrast": "Could you…? est le couteau suisse. Would you mind…? demande -ing. Do you happen to…? rend la question légère. I was wondering if… crée de la distance polie. I’d appreciate it if… est utile quand la demande doit rester claire et professionnelle.",
    "production": "Formule la même demande — déplacer une réunion de trente minutes — pour un ami, un collègue puis un client. Tu dois faire varier la forme sans changer le besoin.",
    "quiz": [
      [
        "Tu demandes simplement à un collègue de t’envoyer un fichier. Quelle phrase est naturelle ?",
        "Could you send me the latest version?",
        [
          "Would you send me the latest version immediately, yes?",
          "Can you possibly to send the latest version?",
          "I appreciate you send the latest version."
        ],
        "Could you…? est poli, direct et parfaitement normal entre collègues."
      ],
      [
        "Tu veux demander à quelqu’un de fermer la fenêtre avec Would you mind. Quelle structure est correcte ?",
        "Would you mind closing the window?",
        [
          "Would you mind to close the window?",
          "Would you mind close the window?",
          "Would you mind if closing the window by you?"
        ],
        "Would you mind est suivi ici d’un verbe en -ing."
      ],
      [
        "Tu demandes dans un café s’ils auraient par hasard une prise disponible. Que dis-tu ?",
        "Do you happen to have a power outlet I could use?",
        [
          "Do you own necessarily a power outlet for me?",
          "Would you mind having a power outlet?",
          "I was wondering a power outlet exists."
        ],
        "Do you happen to have…? est une façon légère et naturelle de vérifier une possibilité."
      ],
      [
        "Tu écris à un client pour demander si la réunion peut être déplacée. Quelle ouverture est la plus diplomatique ?",
        "I was wondering if we could move the meeting to Thursday.",
        [
          "Move the meeting to Thursday, please.",
          "Could I possibly move your meeting myself?",
          "I appreciate if Thursday is the meeting."
        ],
        "I was wondering if… atténue la demande tout en la gardant parfaitement claire."
      ],
      [
        "Une échéance est importante et tu demandes une confirmation avant midi. Quelle phrase reste professionnelle mais ferme ?",
        "I’d appreciate it if you could confirm by noon.",
        [
          "Maybe you could perhaps confirm sometime.",
          "I demand that you confirm because I appreciate it.",
          "Would you mind confirmation noon?"
        ],
        "I’d appreciate it if… permet de formuler une attente nette sans agressivité."
      ]
    ],
    "productionPrompt": "Demande de déplacer une réunion à un ami, un collègue et un client avec trois niveaux de politesse différents.",
    "modelResponse": "Can we move it to 3? / Could we move the meeting to 3? / I was wondering if we could move the meeting to 3 p.m."
  },
  "eng-register-email-directness": {
    "title": "Messages et e-mails : relancer, confirmer, répondre",
    "hook": "Un petit stock de six blocs couvre une énorme partie des messages professionnels quotidiens. Le but est de les réutiliser, pas d’écrire des e-mails “parfaits”.",
    "targets": [
      [
        "Just checking …",
        "Première relance légère."
      ],
      [
        "I wanted to follow up on …",
        "Relance neutre/professionnelle."
      ],
      [
        "Could you confirm …?",
        "Demande de confirmation précise."
      ],
      [
        "Thanks for letting me know.",
        "Accusé de réception naturel."
      ],
      [
        "No worries.",
        "Réponse informelle à un petit problème/excuse."
      ],
      [
        "I’ll get back to you …",
        "Tu promets de revenir avec une réponse."
      ]
    ],
    "dialogue": "“Just checking whether you had a chance to look at the draft.” — “Sorry, not yet.” — “No worries. Could you confirm by tomorrow afternoon?” — “Yes. I’ll get back to you before 3.” Voilà presque un mini-kit complet de suivi.",
    "contrast": "Just checking est léger. Follow up est plus neutre et professionnel. Could you confirm…? transforme un échange flou en demande précise. Thanks for letting me know ferme proprement une information. I’ll get back to you crée un engagement de réponse.",
    "production": "Écris un échange de quatre messages : première relance, excuse du collègue, réponse sans tension, puis échéance claire. Essaie de rester court : un bon message n’est pas un essai scolaire.",
    "quiz": [
      [
        "Première relance, pas d’urgence. Quelle ouverture convient ?",
        "Just checking whether you had a chance to look at the draft.",
        [
          "You still haven’t answered my draft.",
          "I urgently follow you for the draft.",
          "Could you confirm why you ignored me?"
        ],
        "Just checking est proportionné à une première relance et n’accuse pas l’autre."
      ],
      [
        "Deuxième relance plus neutre sur un dossier professionnel. Quelle phrase fonctionne ?",
        "I wanted to follow up on the quote I sent on Monday.",
        [
          "I wanted to chase you because the quote exists.",
          "Just checking you are late again.",
          "I’m following you on the quote physically."
        ],
        "Follow up on est une collocation standard pour reprendre un sujet ou un dossier."
      ],
      [
        "Tu as besoin de savoir si la date est bien vendredi. Que demandes-tu ?",
        "Could you confirm that the deadline is Friday?",
        [
          "Could you explain all the deadline again?",
          "I confirm you the deadline is Friday?",
          "Would you mind the deadline Friday?"
        ],
        "Could you confirm…? cible exactement l’information qui doit être validée."
      ],
      [
        "Quelqu’un t’informe d’un retard. Tu veux simplement accuser réception. Que réponds-tu ?",
        "Thanks for letting me know.",
        [
          "Thanks for making me know.",
          "I acknowledge your lateness formally.",
          "No worries, I did not read your message."
        ],
        "Thanks for letting me know est naturel, neutre et très réutilisable."
      ],
      [
        "Tu n’as pas la réponse maintenant mais tu peux répondre demain matin. Que dis-tu ?",
        "I’ll get back to you tomorrow morning.",
        [
          "I’ll return you tomorrow morning.",
          "I’ll answer back to you eventually maybe.",
          "I’ll get you back tomorrow morning."
        ],
        "Get back to someone signifie revenir vers cette personne avec une réponse ou une information."
      ]
    ],
    "productionPrompt": "Écris une relance courte, puis réponds à une information avec Thanks for letting me know et promets une réponse avec I’ll get back to you.",
    "modelResponse": "Just checking whether you had a chance to review the file. / Thanks for letting me know. I’ll get back to you tomorrow morning."
  },
  "eng-phrasal-context": {
    "title": "Six phrasal verbs vraiment utiles au quotidien",
    "hook": "Pas de liste de cinquante phrasal verbs. Tu en pratiques six que tu peux rencontrer et employer partout, chacun dans une scène claire.",
    "targets": [
      [
        "find out",
        "Découvrir une information."
      ],
      [
        "figure out",
        "Comprendre/trouver comment faire."
      ],
      [
        "work out",
        "Trouver une solution ou bien se terminer selon le contexte."
      ],
      [
        "sort out",
        "Régler/organiser un problème concret."
      ],
      [
        "run out of",
        "Ne plus avoir quelque chose."
      ],
      [
        "call off",
        "Annuler un événement prévu."
      ]
    ],
    "dialogue": "“We’ve run out of coffee.” — “I’ll sort it out.” / “Did you find out why the app crashed?” — “Not yet. I’m trying to figure it out.” / “They called off the match because of the storm.” Ce sont des blocs complets : apprends la scène avec le verbe.",
    "contrast": "Find out porte sur une information découverte. Figure out implique un travail de compréhension. Sort out vise un problème à régler. Work out peut parler d’une solution qui fonctionne. Run out of = stock épuisé. Call off = événement annulé.",
    "production": "Raconte une mini-journée avec trois problèmes : tu n’as plus de batterie, tu dois comprendre un bug et un événement est annulé. Utilise trois phrasal verbs sans les traduire mentalement.",
    "quiz": [
      [
        "Tu découvres finalement pourquoi le train était en retard. Quelle phrase convient ?",
        "I found out why the train was delayed.",
        [
          "I figured the train out of delay.",
          "I sorted out why as an information.",
          "I called off the reason for the delay."
        ],
        "Find out correspond à la découverte d’une information."
      ],
      [
        "Tu essaies de comprendre comment configurer un nouvel appareil. Que dis-tu ?",
        "I’m trying to figure out how it works.",
        [
          "I’m finding out the device physically.",
          "I’m calling off how it works.",
          "I’m running out of how it works."
        ],
        "Figure out décrit l’effort pour comprendre ou trouver comment faire."
      ],
      [
        "Il n’y a plus de café. Quelle phrase est naturelle ?",
        "We’ve run out of coffee.",
        [
          "We’ve sorted out coffee.",
          "We’ve called coffee off.",
          "We’ve worked coffee out."
        ],
        "Run out of signifie épuiser un stock ou ne plus en avoir."
      ],
      [
        "Le match est annulé à cause de l’orage. Que dis-tu ?",
        "They called off the match because of the storm.",
        [
          "They found out the match because of the storm.",
          "They sorted the match out of the storm.",
          "They ran out of the match."
        ],
        "Call off est un phrasal verb très courant pour annuler un événement prévu."
      ],
      [
        "Un problème de réservation existe et tu promets de le régler. Que dis-tu ?",
        "Don’t worry — I’ll sort it out.",
        [
          "I’ll find it out, meaning I’ll repair it.",
          "I’ll run out of it immediately.",
          "I’ll call it off even if the booking is needed."
        ],
        "Sort it out signifie régler ou organiser le problème de façon concrète."
      ]
    ],
    "productionPrompt": "Fais trois phrases avec find out, figure out et sort out sur trois problèmes différents.",
    "modelResponse": "I found out why it failed. / I’m trying to figure out the new settings. / Don’t worry — I’ll sort it out."
  },
  "eng-phrasal-get": {
    "title": "Get dans la vraie vie : six blocs à connaître",
    "hook": "Get paraît impossible si tu cherches une traduction unique. Il devient simple quand tu apprends des blocs complets associés à une situation.",
    "targets": [
      [
        "get back",
        "Revenir ou revenir vers quelqu’un."
      ],
      [
        "get used to",
        "S’habituer à."
      ],
      [
        "get stuck",
        "Se retrouver bloqué."
      ],
      [
        "get rid of",
        "Se débarrasser de."
      ],
      [
        "get along with",
        "Bien s’entendre avec."
      ],
      [
        "get through",
        "Traverser/finir une période, un volume de travail, ou réussir à joindre quelqu’un selon le contexte."
      ]
    ],
    "dialogue": "“I’m still getting used to the new job.” / “I got stuck in traffic.” / “I need to get rid of these old files.” / “Do you get along with your new manager?” / “I’ll get back to you after lunch.” Apprends les blocs ; ne demande pas à get de vouloir dire la même chose partout.",
    "contrast": "Get back = retour. Get used to = adaptation progressive. Get stuck = blocage. Get rid of = suppression volontaire. Get along with = relation. Get through = passage réussi à travers quelque chose. Le complément et la particule font l’unité de sens.",
    "production": "Raconte ta semaine avec quatre des six blocs : un changement auquel tu t’habitues, un moment où tu es resté bloqué, quelque chose dont tu veux te débarrasser et une personne avec qui tu t’entends bien.",
    "quiz": [
      [
        "Nouveau travail : après deux semaines, tu t’habitues progressivement. Que dis-tu ?",
        "I’m getting used to the new job.",
        [
          "I’m getting the new job used.",
          "I get along the new job.",
          "I’m getting rid of the new job little by little."
        ],
        "Get used to + nom/-ing décrit le processus d’adaptation."
      ],
      [
        "Embouteillage : tu es resté bloqué quarante minutes. Que dis-tu ?",
        "I got stuck in traffic for forty minutes.",
        [
          "I got through traffic by not moving.",
          "I got rid of traffic for forty minutes.",
          "I got back traffic for forty minutes."
        ],
        "Get stuck in traffic est une collocation extrêmement courante pour ce type de blocage."
      ],
      [
        "Tu veux supprimer de vieux vêtements dont tu ne te sers plus. Que dis-tu ?",
        "I need to get rid of these old clothes.",
        [
          "I need to get along with these clothes.",
          "I need to get back these clothes away.",
          "I need to get used these clothes out."
        ],
        "Get rid of signifie se débarrasser de quelque chose."
      ],
      [
        "Tu demandes si une personne s’entend bien avec son équipe. Quelle question est naturelle ?",
        "Do you get along with your team?",
        [
          "Do you get through your team socially?",
          "Do you get used to your team as friends?",
          "Do you get rid of your team well?"
        ],
        "Get along with décrit la qualité de la relation avec quelqu’un."
      ],
      [
        "Tu promets une réponse après avoir vérifié. Que dis-tu ?",
        "I’ll get back to you this afternoon.",
        [
          "I’ll get you back this afternoon.",
          "I’ll get through you this afternoon.",
          "I’ll get along to you this afternoon."
        ],
        "Get back to someone signifie revenir vers cette personne avec une réponse."
      ]
    ],
    "productionPrompt": "Utilise quatre blocs avec get pour raconter une adaptation, un blocage, une relation et une réponse à venir.",
    "modelResponse": "I’m getting used to the schedule. I got stuck in traffic yesterday. I get along with the team, and I’ll get back to my manager tomorrow."
  },
  "eng-paraphrase-repair": {
    "title": "Parler même quand le mot te manque",
    "hook": "Le vrai progrès commence quand tu arrêtes de t’arrêter. Tu apprends six structures pour décrire un objet, une idée ou une action dont le mot anglais ne te vient pas.",
    "targets": [
      [
        "It’s the thing you use to …",
        "Décrire par la fonction."
      ],
      [
        "It’s a kind of …",
        "Donner une catégorie approximative."
      ],
      [
        "It’s the place where …",
        "Décrire un lieu par ce qu’on y fait."
      ],
      [
        "It looks like …",
        "Décrire par la forme/ressemblance."
      ],
      [
        "It’s used for …ing",
        "Expliquer l’usage."
      ],
      [
        "What I’m trying to say is …",
        "Reformuler une idée qui sort mal."
      ]
    ],
    "dialogue": "Le mot screwdriver ne vient pas : “It’s the thing you use to tighten screws.” Tu cherches greenhouse : “It’s a kind of glass building where people grow plants.” Tu n’as pas besoin du mot parfait pour être compris.",
    "contrast": "Fonction, catégorie, lieu, apparence et usage sont cinq routes de secours. What I’m trying to say is… sert plutôt quand le problème n’est pas un nom mais toute ton idée. Cette compétence réduit énormément le réflexe de repasser en français.",
    "production": "Regarde autour de toi. Choisis trois objets et un lieu. Interdiction d’utiliser leur nom anglais : fais-les deviner uniquement avec ces structures. Ensuite reformule une opinion avec What I’m trying to say is…",
    "quiz": [
      [
        "Tu as besoin d’un tournevis mais le mot ne vient pas. Que dis-tu ?",
        "It’s the thing you use to tighten screws.",
        [
          "It’s a metal object, you know, maybe.",
          "I forgot the English word so the conversation stops.",
          "It’s the thing that is screwdriver in French."
        ],
        "La fonction précise permet à l’autre d’identifier l’objet même sans le nom."
      ],
      [
        "Tu décris une serre sans connaître greenhouse. Quelle phrase aide vraiment ?",
        "It’s a kind of glass building where people grow plants.",
        [
          "It’s a building thing with transparent stuff.",
          "It looks like a word I don’t remember.",
          "It is used to be a greenhouse."
        ],
        "Catégorie + matériau + fonction donnent plusieurs indices complémentaires."
      ],
      [
        "Tu cherches le mot “bakery”. Quelle description fonctionne ?",
        "It’s the place where they make and sell bread and cakes.",
        [
          "It’s the place where bread is a noun.",
          "It looks like eating but as a shop.",
          "It’s used for being somewhere with food."
        ],
        "The place where… est une structure simple et très efficace pour décrire un lieu."
      ],
      [
        "Tu veux décrire un objet ressemblant à une petite tablette. Quelle structure est utile ?",
        "It looks like a small tablet.",
        [
          "It uses like a small tablet.",
          "It places where a small tablet.",
          "It’s trying to say a small tablet."
        ],
        "It looks like… permet d’utiliser une ressemblance visuelle comme indice."
      ],
      [
        "Ta première phrase est confuse et tu veux repartir proprement. Que dis-tu ?",
        "What I’m trying to say is that the timing is the real problem.",
        [
          "What I’m translating is the timing.",
          "What I fail to say is every word.",
          "The timing is a problem, vocabulary finished."
        ],
        "What I’m trying to say is… annonce une reformulation et te donne une seconde chance sans quitter l’anglais."
      ]
    ],
    "productionPrompt": "Fais deviner deux objets sans les nommer, puis reformule une opinion avec What I’m trying to say is…",
    "modelResponse": "It’s the thing you use to open a bottle. / It’s a kind of bag you wear on your back. / What I’m trying to say is that the price matters less than the location."
  },
  "eng-paraphrase-clarify": {
    "title": "Clarifier précisément sans bloquer la conversation",
    "hook": "Quand tu comprends 80 % d’une phrase, ne demande pas à l’autre de recommencer 100 %. Ces six structures ciblent exactement l’incertitude.",
    "targets": [
      [
        "Do you mean …?",
        "Tu proposes ton interprétation."
      ],
      [
        "When you say …, do you mean …?",
        "Tu isoles un mot ou une idée ambiguë."
      ],
      [
        "Are you saying that …?",
        "Tu vérifies une conclusion."
      ],
      [
        "Could you put that another way?",
        "Tu demandes une reformulation globale mais courte."
      ],
      [
        "So, if I understand correctly, …",
        "Tu résumes avant de continuer."
      ],
      [
        "What do you mean by … here?",
        "Tu demandes le sens local d’un terme."
      ]
    ],
    "dialogue": "“We need a more reliable solution.” — “What do you mean by reliable here — cheaper or less likely to fail?” / “We may push the launch back.” — “So, if I understand correctly, we’re not launching on Monday anymore?” Tu transformes l’incompréhension en question précise.",
    "contrast": "Do you mean…? est court. When you say… ajoute le morceau ambigu. Are you saying that… vérifie une implication. Could you put that another way? demande une reformulation. So, if I understand correctly… est excellent après une explication complexe.",
    "production": "Imagine une réunion où trois points restent flous : une date, un mot technique et une conséquence. Pose trois questions différentes plutôt que de dire I don’t understand.",
    "quiz": [
      [
        "Tu crois que la réunion passe de jeudi à vendredi. Quelle question vérifie ton interprétation ?",
        "Do you mean the meeting is now on Friday?",
        [
          "Could you repeat every detail about the meeting?",
          "Are you meaning Friday as a word?",
          "What does meeting translate to?"
        ],
        "Do you mean…? propose directement l’interprétation à confirmer."
      ],
      [
        "Le mot “flexible” est ambigu dans cette discussion. Quelle question est précise ?",
        "When you say “flexible”, do you mean the schedule can change?",
        [
          "Could you explain the whole project again?",
          "Is flexible an English adjective?",
          "Are you saying all schedules are good?"
        ],
        "Tu cites le terme puis proposes le sens que tu veux vérifier."
      ],
      [
        "Après une explication, tu crois comprendre que le lancement est reporté. Que dis-tu ?",
        "Are you saying that the launch has been postponed?",
        [
          "Are you saying the same words again?",
          "Do you mean launch means start?",
          "Could you translate postponement to me?"
        ],
        "Are you saying that…? vérifie la conséquence que tu as tirée de ce qui précède."
      ],
      [
        "Tu connais tous les mots mais la formulation reste obscure. Que demandes-tu ?",
        "Could you put that another way?",
        [
          "Could you say exactly the same sentence louder?",
          "What is every word in French?",
          "Do you mean the grammar is wrong?"
        ],
        "Cette phrase demande une autre formulation plutôt qu’une répétition identique."
      ],
      [
        "Après plusieurs instructions, tu veux résumer avant d’agir. Que dis-tu ?",
        "So, if I understand correctly, I send the file first and call you afterwards.",
        [
          "So, I understood correctly because English.",
          "Could you repeat everything before I start?",
          "Are you saying files mean calls?"
        ],
        "Tu transformes ce que tu as compris en résumé vérifiable, ce qui évite les malentendus opérationnels."
      ]
    ],
    "productionPrompt": "Pose trois questions de clarification différentes : une date, un mot ambigu et une conséquence.",
    "modelResponse": "Do you mean Friday? / When you say “flexible”, do you mean the deadline can move? / So, if I understand correctly, we’re delaying the launch."
  },
  "eng-connectors-logic": {
    "title": "Faire des phrases qui s’enchaînent naturellement",
    "hook": "Tu n’as pas besoin de vingt connecteurs. Six suffisent déjà pour raconter une cause, une conséquence, un contraste et une conclusion proprement.",
    "targets": [
      [
        "because",
        "Introduit la cause."
      ],
      [
        "so",
        "Introduit une conséquence, très courant à l’oral."
      ],
      [
        "but",
        "Contraste simple et naturel."
      ],
      [
        "however",
        "Contraste plus écrit/formel, souvent entre phrases."
      ],
      [
        "that’s why",
        "Explique la conséquence à partir de ce qui précède."
      ],
      [
        "therefore",
        "Conséquence logique, plus formelle/écrite."
      ]
    ],
    "dialogue": "“The last train had left, so we took a taxi.” / “We took a taxi because the last train had left.” Même faits, orientation différente. “The hotel was cheap, but it was far away.” Dans un rapport : “The sample was too small; therefore, the result is uncertain.”",
    "contrast": "Because répond à “pourquoi ?”. So et that’s why avancent vers la conséquence. But est le contraste quotidien. However permet un virage plus écrit. Therefore est utile quand tu veux marquer une conclusion logique, pas simplement raconter la suite.",
    "production": "Prends deux faits liés. Raconte-les d’abord avec because, puis avec so. Ajoute ensuite un contraste avec but et reformule-le dans un registre écrit avec however.",
    "quiz": [
      [
        "“We took a taxi ___ the last train had left.” Quel connecteur introduit la cause ?",
        "because",
        [
          "so",
          "however",
          "therefore"
        ],
        "Because introduit la raison qui explique pourquoi le taxi a été nécessaire."
      ],
      [
        "“The last train had left, ___ we took a taxi.” Quel mot introduit naturellement la conséquence à l’oral ?",
        "so",
        [
          "because",
          "however",
          "although"
        ],
        "So fait avancer le récit de la cause vers sa conséquence."
      ],
      [
        "L’hôtel était bon marché, mais loin du centre. Quelle phrase est la plus naturelle à l’oral ?",
        "The hotel was cheap, but it was far from the centre.",
        [
          "The hotel was cheap, therefore it was far from the centre.",
          "The hotel was cheap because it was far from the centre, necessarily.",
          "The hotel was cheap, so distance was the cause."
        ],
        "But met simplement en contraste deux aspects sans inventer de causalité."
      ],
      [
        "Tu écris deux phrases et veux introduire un contraste plus formel. Quelle option convient ?",
        "The price is attractive. However, the location is inconvenient.",
        [
          "The price is attractive. Because, the location is inconvenient.",
          "The price is attractive. Therefore, the location is inconvenient.",
          "The price is attractive. So that means the location caused it."
        ],
        "However marque un contraste entre deux propositions indépendantes."
      ],
      [
        "La batterie était vide ; c’est pour ça que le téléphone s’est éteint. Quelle formulation est naturelle ?",
        "The battery was dead. That’s why the phone turned off.",
        [
          "The battery was dead. However the phone therefore.",
          "The battery was dead because the phone turned off, necessarily.",
          "The battery was dead. But that’s why means contrast."
        ],
        "That’s why reprend la cause précédente et introduit explicitement sa conséquence."
      ]
    ],
    "productionPrompt": "Crée une mini-histoire en quatre phrases avec because, so, but et that’s why.",
    "modelResponse": "I left early because the weather was getting worse. The buses were delayed, so I walked. It was cold, but the streets were quiet. I forgot my umbrella — that’s why I got soaked."
  },
  "eng-connectors-concession": {
    "title": "Nuancer : “malgré”, “même si”, “alors que”",
    "hook": "Ces six tournures permettent de conserver deux idées vraies en même temps : un obstacle et une action, deux situations opposées, ou un contraste qui n’annule pas le reste.",
    "targets": [
      [
        "although + clause",
        "Concession avec sujet + verbe."
      ],
      [
        "even though + clause",
        "Concession souvent plus appuyée."
      ],
      [
        "despite + noun/-ing",
        "Concession sans proposition finie."
      ],
      [
        "whereas",
        "Contraste entre deux situations."
      ],
      [
        "while",
        "Peut opposer deux faits dans un registre neutre."
      ],
      [
        "still",
        "“Malgré cela / quand même” dans la suite du discours."
      ]
    ],
    "dialogue": "“Although it was raining, we went out.” = “Despite the rain, we went out.” / “The first hotel is central, whereas the second one is much quieter.” / “The journey was long. Still, I’d do it again.” Tu apprends des structures, pas des équivalences isolées.",
    "contrast": "Although/even though demandent une proposition. Despite prend un nom ou -ing. Whereas/while mettent deux situations face à face. Still peut arriver dans une nouvelle phrase pour dire que, malgré ce qui précède, la conclusion tient.",
    "production": "Prends une expérience mitigée : mauvais temps mais belle journée, hôtel loin mais excellent, film long mais intéressant. Exprime chaque contraste de deux façons différentes.",
    "quiz": [
      [
        "Tu veux dire “Malgré la pluie, nous sommes sortis.” Quelle phrase est correcte ?",
        "Despite the rain, we went out.",
        [
          "Despite it was raining, we went out.",
          "Although the rain, we went out.",
          "Despite of the rain, we went out."
        ],
        "Despite est suivi ici du groupe nominal the rain."
      ],
      [
        "Quelle reformulation avec although garde le même sens ?",
        "Although it was raining, we went out.",
        [
          "Although the rain, we went out.",
          "Although raining was the rain, we went out.",
          "Although despite the rain, we went out."
        ],
        "Although introduit une proposition complète avec sujet et verbe."
      ],
      [
        "Tu compares deux hôtels : l’un est central, l’autre plus calme. Quel connecteur convient ?",
        "The first is central, whereas the second is much quieter.",
        [
          "The first is central, therefore the second is quieter.",
          "The first is central because the second is quieter.",
          "The first is central, despite the second is quieter."
        ],
        "Whereas met directement deux propriétés ou situations en contraste."
      ],
      [
        "Le trajet était très long, mais tu recommencerais. Quelle suite est naturelle ?",
        "The journey was long. Still, I’d do it again.",
        [
          "The journey was long. Therefore, I’d do it again.",
          "The journey was long. Because, I’d do it again.",
          "The journey was long. Whereas I’d do it again the journey."
        ],
        "Still peut introduire une conclusion qui reste vraie malgré l’obstacle précédent."
      ],
      [
        "Tu veux insister davantage sur le fait que la pluie était forte mais que vous êtes sortis. Quelle phrase marche ?",
        "Even though it was pouring, we went out.",
        [
          "Despite it was pouring, we went out.",
          "Whereas it was pouring, we went out because contrast.",
          "Still it was pouring, despite we went out."
        ],
        "Even though fonctionne comme although avec une concession souvent ressentie comme plus marquée."
      ]
    ],
    "productionPrompt": "Exprime une même concession avec although puis despite, puis compare deux options avec whereas.",
    "modelResponse": "Although it was raining, we went out. / Despite the rain, we went out. / The first route is faster, whereas the second is much nicer."
  },
  "eng-implicit-meaning": {
    "title": "Comprendre ce que les gens veulent vraiment dire",
    "hook": "À partir d’un certain niveau, le problème n’est plus le vocabulaire : c’est que les mots littéraux ne disent pas toute l’intention. Tu pratiques six formulations très fréquentes.",
    "targets": [
      [
        "I’m not sure that would work.",
        "Souvent un désaccord atténué."
      ],
      [
        "We’ll see.",
        "Peut signaler une décision non prise ou un enthousiasme limité."
      ],
      [
        "That’s interesting.",
        "Peut être sincère… ou simplement maintenir la conversation."
      ],
      [
        "I might …",
        "Intention possible, pas promesse."
      ],
      [
        "I don’t think that’s …",
        "Désaccord formulé par une négation atténuée."
      ],
      [
        "I’d probably …",
        "Préférence/conseil non absolu."
      ]
    ],
    "dialogue": "Réunion : “Let’s launch Friday.” — “I’m not sure that would work. We still have two blocking bugs.” Ce n’est pas de l’incertitude innocente : c’est une objection. Invitation : “Are you coming?” — “I might.” Ce n’est pas oui. Le contexte et l’action qui suit donnent la force réelle.",
    "contrast": "Les hedges réduisent la brutalité, pas forcément la conviction. I might laisse une possibilité. We’ll see suspend la décision. I don’t think… peut être un non très réel. That’s interesting doit être interprété avec l’intonation et ce qui vient ensuite.",
    "production": "Transforme trois messages directs — “No”, “Your plan won’t work”, “I prefer B” — en versions naturelles qui restent claires mais moins frontales.",
    "quiz": [
      [
        "Une proposition reçoit trois objections, puis quelqu’un dit “I’m not sure that would work.” Quelle lecture est la plus probable ?",
        "It’s a softened disagreement.",
        [
          "It’s a strong sign of approval.",
          "It means the speaker did not hear the proposal.",
          "It is a promise to implement the proposal later."
        ],
        "Le contexte d’objections montre que la phrase adoucit un désaccord réel."
      ],
      [
        "Tu invites quelqu’un et il répond “I might come.” Que sais-tu vraiment ?",
        "Coming is possible, but it is not a firm commitment.",
        [
          "They have definitely accepted.",
          "They have definitely refused.",
          "They are already on their way."
        ],
        "Might laisse la possibilité ouverte sans transformer l’intention en promesse."
      ],
      [
        "Après une suggestion, ton manager dit “We’ll see” et change de sujet. Quelle interprétation est prudente ?",
        "The decision is not settled, and enthusiasm may be limited.",
        [
          "The suggestion has been officially approved.",
          "The manager has promised to do it tomorrow.",
          "The phrase always means an enthusiastic yes."
        ],
        "We’ll see suspend la conclusion ; le changement de sujet peut renforcer l’impression de faible engagement."
      ],
      [
        "Tu veux dire que le prix proposé n’est pas raisonnable sans être brutal. Que dis-tu ?",
        "I don’t think that’s a realistic price.",
        [
          "That price is ridiculous and you know it.",
          "I might price maybe perhaps.",
          "That’s interesting, therefore I accept the price."
        ],
        "I don’t think… permet un désaccord clair tout en atténuant la forme."
      ],
      [
        "Un ami hésite entre deux trajets et tu donnes un conseil non absolu. Quelle phrase convient ?",
        "I’d probably take the train.",
        [
          "You must take the train; there is no alternative.",
          "I might have taken every train already.",
          "We’ll see which train you are forced to use."
        ],
        "I’d probably… exprime une recommandation personnelle avec une marge d’incertitude."
      ]
    ],
    "productionPrompt": "Transforme trois refus ou désaccords très directs en formulations plus naturelles sans les rendre flous.",
    "modelResponse": "I’m not sure that would work. / I don’t think that’s the best option. / I’d probably go with the second one."
  },
  "eng-implicit-understatement": {
    "title": "Sonner naturel quand tu critiques ou recommandes",
    "hook": "L’anglais conversationnel atténue souvent la forme tout en gardant un message très net. Tu apprends six tournures utiles pour critiquer, alerter et recommander sans surjouer.",
    "targets": [
      [
        "That’s not ideal.",
        "Sous-évaluation fréquente d’un problème."
      ],
      [
        "It could be better.",
        "Critique modérée."
      ],
      [
        "That’s a bit tricky.",
        "Difficulté exprimée avec atténuation."
      ],
      [
        "That’s not exactly …",
        "Correction/critique indirecte."
      ],
      [
        "I’m not entirely convinced.",
        "Réserve claire mais professionnelle."
      ],
      [
        "You might want to …",
        "Conseil prudent, parfois assez ferme selon le contexte."
      ]
    ],
    "dialogue": "Une sauvegarde a échoué : “That’s not ideal. We might want to stop the deployment.” / Présentation moyenne : “It could be better — the main point isn’t clear yet.” / Proposition risquée : “I’m not entirely convinced. We need more data.” Les mots sont modérés ; les actions révèlent la force.",
    "contrast": "A bit et not entirely réduisent la frontalité. Not exactly permet de corriger sans dire “wrong”. You might want to… ressemble à une suggestion mais peut être un vrai avertissement. Le contexte décide si l’atténuation est légère, polie ou ironique.",
    "production": "Prends trois critiques très directes et transforme-les : “This is bad”, “Your plan is risky”, “Change the password”. Garde le message opérationnel, mais utilise une atténuation naturelle.",
    "quiz": [
      [
        "Une panne efface du travail et l’ingénieur dit “That’s not ideal” avant de lancer une procédure d’urgence. Que fait la phrase ?",
        "It understates a serious problem.",
        [
          "It says the problem is genuinely minor.",
          "It means the engineer is pleased.",
          "It indicates that no action is necessary."
        ],
        "L’action d’urgence montre que la formulation faible sous-évalue volontairement la gravité."
      ],
      [
        "Tu trouves une présentation moyenne et veux faire une critique modérée. Que dis-tu ?",
        "It could be better — the main point isn’t clear yet.",
        [
          "It is terrible and completely useless.",
          "It might possibly maybe be something.",
          "It is not exactly a presentation because I dislike it."
        ],
        "Could be better exprime une critique nette mais laisse immédiatement place à un point d’amélioration concret."
      ],
      [
        "Un changement technique est délicat. Quelle phrase est naturelle ?",
        "That’s a bit tricky — we’ll need to test it first.",
        [
          "That’s absolutely impossible because it is a bit tricky.",
          "That is tricky a bitly.",
          "That’s quite a trick, so no testing is needed."
        ],
        "A bit tricky atténue la formulation tandis que la suite précise la conséquence opérationnelle."
      ],
      [
        "Tu n’es pas convaincu par le plan, mais tu veux rester professionnel. Que dis-tu ?",
        "I’m not entirely convinced this will solve the problem.",
        [
          "I am convinced that this definitely fails.",
          "I’m not convinced anything in general.",
          "That’s interesting, so I approve it."
        ],
        "Not entirely convinced exprime une réserve réelle sans attaquer la personne."
      ],
      [
        "Un collègue utilise un mot de passe très faible. Quel conseil prudent mais clair peux-tu donner ?",
        "You might want to change that password.",
        [
          "You may maybe want perhaps a password one day.",
          "Change it now because I command you.",
          "It could be better passwordly."
        ],
        "You might want to… est souvent une suggestion polie qui peut porter une recommandation assez forte selon le contexte."
      ]
    ],
    "productionPrompt": "Transforme trois critiques directes en versions naturelles avec not ideal, not entirely convinced et you might want to.",
    "modelResponse": "That’s not ideal. / I’m not entirely convinced this is safe enough. / You might want to change the password before we launch."
  }
};
  const MYSTERY_PACKS={
  "english-mystery-actually-318": [
    [
      "Actually, …",
      "pour corriger"
    ],
    [
      "At the moment, …",
      "pour parler de maintenant"
    ],
    [
      "For now, …",
      "pour une situation provisoire"
    ]
  ],
  "english-mystery-eventually-318": [
    [
      "Eventually, …",
      "résultat après un processus"
    ],
    [
      "It turns out that …",
      "réalité découverte"
    ],
    [
      "In the end, …",
      "issue finale dans un récit"
    ]
  ],
  "english-mystery-afraid-318": [
    [
      "I’m afraid …",
      "annoncer une mauvaise nouvelle poliment"
    ],
    [
      "Unfortunately, …",
      "annoncer un problème neutrement"
    ],
    [
      "I’m sorry, but …",
      "refuser ou corriger avec tact"
    ]
  ],
  "english-mystery-yet-318": [
    [
      "Not yet.",
      "pas encore"
    ],
    [
      "I’m still working on it.",
      "encore en cours"
    ],
    [
      "I’ve already finished it.",
      "déjà terminé"
    ]
  ],
  "english-mystery-turnout-318": [
    [
      "It turned out that …",
      "réalité découverte"
    ],
    [
      "I found out that …",
      "information découverte"
    ],
    [
      "In the end, …",
      "issue finale"
    ]
  ],
  "english-mystery-soft-disagree-318": [
    [
      "I’m not sure that would work.",
      "désaccord atténué"
    ],
    [
      "Could we try … instead?",
      "proposer une alternative"
    ],
    [
      "I’d probably go with …",
      "donner une préférence"
    ]
  ],
  "english-mystery-sensible-rc19": [
    [
      "That makes sense.",
      "valider une logique"
    ],
    [
      "I’d go with the simpler option.",
      "recommander un choix"
    ],
    [
      "That sounds sensible.",
      "dire qu’un choix paraît raisonnable"
    ]
  ],
  "english-mystery-one-reference-rc19": [
    [
      "the blue one",
      "éviter de répéter un nom"
    ],
    [
      "the other one",
      "désigner l’autre élément"
    ],
    [
      "the one that …",
      "identifier un élément par une précision"
    ]
  ],
  "english-mystery-pretty-rc19": [
    [
      "pretty difficult",
      "plutôt/assez difficile, informel"
    ],
    [
      "a bit difficult",
      "un peu difficile"
    ],
    [
      "really difficult",
      "vraiment difficile"
    ]
  ],
  "english-mystery-email-rc19": [
    [
      "Just checking …",
      "première relance légère"
    ],
    [
      "I wanted to follow up on …",
      "relance professionnelle"
    ],
    [
      "Could you confirm …?",
      "demande précise"
    ]
  ],
  "english-mystery-getover-rc19": [
    [
      "get over it",
      "se remettre de quelque chose"
    ],
    [
      "feel much better",
      "se sentir bien mieux"
    ],
    [
      "be back to normal",
      "être revenu à la normale"
    ]
  ],
  "english-mystery-clarify-rc19": [
    [
      "What do you mean by …?",
      "cibler un mot"
    ],
    [
      "Do you mean …?",
      "vérifier une interprétation"
    ],
    [
      "Could you put that another way?",
      "demander une reformulation"
    ]
  ],
  "english-mystery-despite-rc19": [
    [
      "Despite the rain, …",
      "malgré + nom"
    ],
    [
      "Although it was raining, …",
      "bien que + proposition"
    ],
    [
      "Still, …",
      "malgré cela / quand même"
    ]
  ],
  "english-mystery-notideal-rc19": [
    [
      "That’s not ideal.",
      "sous-évaluer un problème"
    ],
    [
      "It could be better.",
      "critique modérée"
    ],
    [
      "I’m not entirely convinced.",
      "réserve claire mais polie"
    ]
  ]
};
  const MYSTERY_PATCHES={
  "english-mystery-sensible-rc19": {
    "title": "Choisir le plan le plus raisonnable",
    "missionQuestion": "Vous devez choisir vite. Quelle réponse ferait avancer la discussion ?",
    "prompt": "Votre équipe hésite entre un plan complexe et un plan plus simple qui atteint le même objectif avec moins de risque. Ton collègue propose le plan simple.",
    "answer": "That makes sense. I’d go with the simpler option.",
    "aliases": [
      "That makes sense",
      "I’d go with the simpler option",
      "That sounds sensible"
    ],
    "blockedGuesses": [
      "I prefer the simple plan because simple is always better.",
      "That sounds sensitive, so we should choose it.",
      "It depends, but I refuse to say what it depends on."
    ],
    "explanation": "That makes sense montre que tu comprends la logique, puis I’d go with the simpler option exprime clairement ton choix. Tu repars avec deux blocs de conversation, pas seulement avec le faux ami sensible."
  },
  "english-mystery-one-reference-rc19": {
    "title": "Éviter de répéter le même nom",
    "missionQuestion": "Tu compares deux chargeurs. Quelle phrase sonne naturelle ?",
    "prompt": "Le premier chargeur est trop cher. Tu veux demander le prix de l’autre sans répéter charger une troisième fois.",
    "answer": "How much is the other one?",
    "aliases": [
      "the other one",
      "How much is the other one"
    ],
    "blockedGuesses": [
      "How much is the other charger one?",
      "How much is another it?",
      "How much is the other object charger?"
    ],
    "explanation": "The other one remplace naturellement charger déjà connu dans la conversation. Le même mécanisme sert dans the blue one ou the one on the left."
  },
  "english-mystery-pretty-rc19": {
    "title": "Dire “plutôt difficile” sans exagérer",
    "missionQuestion": "Tu sors d’un examen : quelle réaction sonne naturelle ?",
    "prompt": "L’examen était clairement difficile, mais pas une catastrophe. Un ami te demande : “How was it?”",
    "answer": "Pretty difficult, but I think it went okay.",
    "aliases": [
      "Pretty difficult",
      "It was pretty difficult"
    ],
    "blockedGuesses": [
      "Absolutely impossible, but also quite easy.",
      "Beautifully difficult, I think.",
      "A bit completely terrible."
    ],
    "explanation": "Pretty difficult donne une intensité informelle intermédiaire. La suite but I think it went okay nuance encore l’évaluation et transforme le vocabulaire en vraie réponse de conversation."
  },
  "english-mystery-getover-rc19": {
    "title": "Dire que tu vas enfin mieux",
    "missionQuestion": "Un ami te demande comment tu vas après une grippe. Que réponds-tu ?",
    "prompt": "Tu as été malade pendant plusieurs jours. Aujourd’hui tu te sens nettement mieux et presque revenu à la normale.",
    "answer": "I’m finally getting over it. I’m feeling much better.",
    "aliases": [
      "I’m getting over it",
      "I’m feeling much better",
      "I’m finally getting over it"
    ],
    "blockedGuesses": [
      "I’m getting away with the flu.",
      "I’m getting by the flu completely.",
      "I’m over getting the flu grammatically."
    ],
    "explanation": "Get over something signifie se remettre d’une maladie ou d’une expérience difficile. I’m feeling much better ajoute une phrase immédiatement réutilisable pour parler de ton état."
  },
  "english-mystery-despite-rc19": {
    "title": "Dire “malgré ça” de plusieurs façons",
    "missionQuestion": "Il pleut, mais vous sortez quand même. Quelle phrase est naturelle ?",
    "prompt": "Vous aviez prévu de marcher toute la journée. Il pleut depuis le matin, mais vous décidez de maintenir la sortie.",
    "answer": "Despite the rain, we went out. It was still worth it.",
    "aliases": [
      "Despite the rain, we went out",
      "It was still worth it"
    ],
    "blockedGuesses": [
      "Despite it was raining, we went out.",
      "Although the rain, we went out.",
      "Despite of the rain, we went out."
    ],
    "explanation": "Despite the rain utilise despite + nom. Still worth it ajoute l’idée “malgré cela, ça valait quand même le coup” et donne une deuxième tournure utile dans la même scène."
  }
};

  const targetSection = spec => ({
    title:"1. Ton pack du jour — 6 expressions",
    text:spec.targets.map(([phrase,use])=>`${phrase} — ${use}`).join("\n\n")
  });
  const buildSections = spec => [
    targetSection(spec),
    {title:"2. Une scène, plusieurs réflexes",text:spec.dialogue},
    {title:"3. Choisir la bonne nuance",text:spec.contrast},
    {title:"4. À toi de parler",text:spec.production},
    {title:"5. Le test de demain",text:`Ferme le cours et essaie de retrouver au moins quatre expressions sans regarder. Si tu n’en retrouves que deux, ce n’est pas un échec : reprends la scène et reconstruis les phrases par leur fonction. Le but n’est pas de mémoriser six traductions, mais d’avoir plusieurs réflexes disponibles quand une situation réelle se présente.`}
  ];
  const titles={};
  for(const [id,spec] of Object.entries(COURSE_SPECS)){
    titles[id]=spec.title;
    const pack=READY_LESSON_PACKS[id];
    if(!pack)continue;
    pack.title=spec.title;
    pack.hook=spec.hook;
    pack.complete=buildSections(spec);
    pack.takeaways=[
      {label:"6 expressions",text:spec.targets.map(([phrase])=>phrase).join(" · ")},
      {label:"Objectif",text:"Comprendre la scène, choisir une formulation naturelle et produire ta propre réponse."},
      {label:"Révision",text:"Demain, essaie d’en rappeler quatre avant de relire le cours."}
    ];
    pack.quiz=spec.quiz.map(([q,a,choices,why],index)=>({kind:["reaction","natural-choice","context","transfer","production-choice"][index],q,a,choices,why,trap:"Les autres réponses sont proches en surface mais changent la fonction, le registre ou la structure utile dans cette scène.",evidence:"Choisis la phrase qu’un anglophone pourrait réellement employer ici, pas celle qui ressemble le plus au français."}));
    pack.keyFacts=spec.targets.map(([phrase,use])=>`${phrase} — ${use}`);
    pack.contentRevision="rc50-english-useful-pack";
    pack.englishExperience={mode:"usable-chunks-situations-production",redesigned:true,targetCount:spec.targets.length};
    pack.englishExperienceRC50={targetExpressions:spec.targets.map(([phrase])=>phrase),minimumRecall:4,productionPrompt:spec.productionPrompt};
    PUBLISHED_LESSON_IDS.add(id);
  }
  try{
    for(const lessons of Object.values(data.lessons||{})){
      if(!Array.isArray(lessons))continue;
      for(const lesson of lessons)if(titles[lesson?.id])lesson.title=titles[lesson.id];
    }
  }catch{}

  // One active checkpoint per lesson, aligned with the new pack rather than a single vocabulary item.
  window.HD_DISCIPLINE_LABS={...(window.HD_DISCIPLINE_LABS||{}),english:Object.entries(COURSE_SPECS).map(([id,spec],index)=>{
    const q=spec.quiz[index%spec.quiz.length];
    return {
      id:`eng50-lab-${id}`,lessonId:id,skill:"Usage réel",title:`6 expressions → 1 réflexe`,
      context:"Mini-situation d’anglais réel.",
      speak:spec.targets.slice(0,3).map(([phrase])=>phrase).join(" / "),
      prompt:q[0],
      choices:[{text:q[1],correct:true,feedback:q[3]},...(q[2]||[]).slice(0,2).map(text=>({text,correct:false,feedback:"La phrase est possible grammaticalement ou lexicalement, mais elle ne fait pas le bon travail dans cette scène."}))],
      productionPrompt:spec.productionPrompt,modelResponse:spec.modelResponse,
      takeaway:`Tu dois repartir avec plusieurs blocs réutilisables : ${spec.targets.slice(0,4).map(([p])=>p).join(" · ")}.`,
      difficulty:index<4?"facile":index<10?"moyen":"difficile",englishUtilityRC50:true
    };
  })};

  // The short daily ritual must also deliver several useful chunks, even if the learner skips the optional full lesson.
  for(const mystery of (data.mysteries||[])){
    if(mystery?.discipline!=="english")continue;
    const patch=MYSTERY_PATCHES[mystery.id];
    if(patch)Object.assign(mystery,patch);
    const pack=MYSTERY_PACKS[mystery.id];
    if(pack){mystery.englishDailyPack=pack.map(([phrase,use])=>({phrase,use}));mystery.englishScenarioRC50=true;}
  }

  try{
    DISCIPLINE_MODE_COPY.english={...(DISCIPLINE_MODE_COPY.english||{}),
      headline:"Chaque session te laisse plusieurs phrases que tu peux réellement réutiliser.",
      promise:"Des mini-situations, 6 tournures par cours, 3 expressions dans le dossier quotidien, de l’écoute et de la production. Pas un mot isolé à mémoriser.",
      discoveryTitle:"Parler avec des blocs utiles",
      discoveryIntro:"Commence par des phrases de secours et des réactions courantes ; les nuances fines arrivent ensuite."
    };
  }catch{}
  try{
    window.HistoDaily={...(window.HistoDaily||{}),version:VERSION,englishUtilityRC50:{
      version:VERSION,courses:Object.keys(COURSE_SPECS).length,targets:Object.values(COURSE_SPECS).reduce((n,s)=>n+s.targets.length,0),
      mysteries:Object.keys(MYSTERY_PACKS).length,dailyChunks:Object.values(MYSTERY_PACKS).reduce((n,s)=>n+s.length,0),
      principle:"one lesson = several reusable chunks"
    }};
  }catch{}
  if(typeof invalidateCatalogCaches==="function")invalidateCatalogCaches();else try{lessonIndexCache=null;}catch{}
})();
