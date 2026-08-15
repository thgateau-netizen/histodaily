/* HistoDaily 1.0.0-rc.22.0 — ateliers disciplinaires. */
(function histodailyRC19Labs(){
  "use strict";
  const LABS = {
  "english": [
    {
      "id": "eng-lab-actually",
      "skill": "Faux ami",
      "title": "Décoder l’intention",
      "prompt": "“Actually, I don’t agree with that conclusion.” Que fait réellement actually ici ?",
      "context": "Une collègue répond calmement à une proposition en réunion.",
      "choices": [
        {
          "text": "Elle corrige ou nuance ce qui vient d’être dit.",
          "correct": true,
          "feedback": "Oui. Actually introduit souvent une correction : « en fait / à vrai dire »."
        },
        {
          "text": "Elle parle d’un événement actuel.",
          "correct": false,
          "feedback": "Non. « Actuel » serait plutôt current. Ici, actually ne parle pas du temps."
        },
        {
          "text": "Elle annonce qu’elle est d’accord.",
          "correct": false,
          "feedback": "Non. La suite “I don’t agree” montre précisément le contraire."
        }
      ],
      "takeaway": "Lis le rôle de la phrase avant de traduire le mot.",
      "speak": "Actually, I don’t agree with that conclusion.",
      "difficulty": "facile"
    },
    {
      "id": "eng-lab-register",
      "skill": "Registre",
      "title": "Calibrer une demande",
      "prompt": "Tu demandes un fichier à un collègue que tu connais peu. Quelle formulation est la plus naturelle ?",
      "context": "Pas d’urgence, e-mail professionnel court.",
      "choices": [
        {
          "text": "Could you send me the file when you have a minute?",
          "correct": true,
          "feedback": "Oui. C’est clair, poli et pas excessivement cérémonieux."
        },
        {
          "text": "Send me the file.",
          "correct": false,
          "feedback": "Grammatical, mais trop direct dans ce contexte."
        },
        {
          "text": "I humbly request that you might perhaps send the file.",
          "correct": false,
          "feedback": "Compréhensible, mais beaucoup trop cérémonieux pour un échange ordinaire."
        }
      ],
      "takeaway": "Le bon registre est adapté à la relation, pas maximalement poli.",
      "speak": "Could you send me the file when you have a minute?",
      "difficulty": "moyen"
    },
    {
      "id": "eng-lab-context",
      "skill": "Contexte",
      "title": "Déduire sans dictionnaire",
      "prompt": "“The road was flooded, so we had to turn back.” Sans connaître flooded, que peux-tu déjà comprendre ?",
      "context": "Une personne raconte un trajet interrompu.",
      "choices": [
        {
          "text": "Quelque chose sur la route empêchait de continuer.",
          "correct": true,
          "feedback": "Exact. So + turn back donnent déjà la structure de la scène."
        },
        {
          "text": "La route était plus rapide que prévu.",
          "correct": false,
          "feedback": "Rien dans la phrase n’indique un trajet plus rapide."
        },
        {
          "text": "Ils ont décidé de faire demi-tour pour le plaisir.",
          "correct": false,
          "feedback": "So introduit une conséquence : le demi-tour répond au problème décrit avant."
        }
      ],
      "takeaway": "Les connecteurs et les actions donnent souvent le sens global.",
      "speak": "The road was flooded, so we had to turn back.",
      "difficulty": "facile"
    },
    {
      "id": "eng-lab-yet",
      "skill": "Nuance",
      "title": "Sentir le petit mot",
      "prompt": "“I haven’t finished yet.” Quelle nuance apporte yet ?",
      "context": "La tâche n’est pas terminée au moment où la personne parle.",
      "choices": [
        {
          "text": "Pas encore, avec l’idée que cela peut toujours arriver.",
          "correct": true,
          "feedback": "Oui. Yet garde ouverte l’attente d’un accomplissement."
        },
        {
          "text": "Jamais, et ce ne sera pas fait.",
          "correct": false,
          "feedback": "Non. Yet ne ferme pas la possibilité future."
        },
        {
          "text": "Déjà terminé.",
          "correct": false,
          "feedback": "C’est l’inverse de la phrase."
        }
      ],
      "takeaway": "Les petits mots expriment souvent une attente, pas seulement un temps.",
      "speak": "I haven’t finished yet.",
      "difficulty": "facile"
    },
    {
      "id": "eng-lab-paraphrase",
      "skill": "Paraphrase",
      "title": "Ne pas bloquer sur un mot",
      "prompt": "Le mot screwdriver te manque. Quelle stratégie maintient le mieux la conversation en anglais ?",
      "context": "Tu décris un outil à quelqu’un.",
      "choices": [
        {
          "text": "It’s the tool you use to tighten screws.",
          "correct": true,
          "feedback": "Exact. Catégorie + fonction : la paraphrase garde l’échange vivant."
        },
        {
          "text": "Je ne sais plus, comment on dit tournevis ?",
          "correct": false,
          "feedback": "Ça peut dépanner, mais l’exercice vise à rester dans la langue cible."
        },
        {
          "text": "Screw… thing… enfin bref.",
          "correct": false,
          "feedback": "Mieux que rien, mais la fonction de l’objet donne une explication beaucoup plus claire."
        }
      ],
      "takeaway": "La fluidité, c’est aussi savoir contourner un trou lexical.",
      "difficulty": "moyen"
    },
    {
      "id": "eng-lab-concession",
      "skill": "Logique",
      "title": "Reconstruire le connecteur",
      "prompt": "Complète : “___ it was raining, we went for a walk.”",
      "context": "La pluie rend la promenade moins attendue, mais elle a quand même eu lieu.",
      "choices": [
        {
          "text": "Although",
          "correct": true,
          "feedback": "Oui. Although introduit une proposition concessive complète."
        },
        {
          "text": "Despite",
          "correct": false,
          "feedback": "Despite demanderait plutôt “despite the rain” ou “despite it raining”."
        },
        {
          "text": "Therefore",
          "correct": false,
          "feedback": "Therefore annoncerait une conséquence, pas une concession."
        }
      ],
      "takeaway": "Comprendre le lien logique aide autant que connaître le vocabulaire.",
      "speak": "Although it was raining, we went for a walk.",
      "difficulty": "moyen"
    },
    {
      "id": "eng-lab-understatement",
      "skill": "Implicite",
      "title": "Lire entre les lignes",
      "prompt": "Après une panne qui a supprimé des heures de travail, quelqu’un dit : “Well, that’s not ideal.” Comment l’interpréter ?",
      "context": "La situation est objectivement sérieuse.",
      "choices": [
        {
          "text": "Comme un understatement : la formulation est plus faible que la gravité réelle.",
          "correct": true,
          "feedback": "Oui. Le contraste entre les mots et la situation produit l’implicite."
        },
        {
          "text": "Comme la preuve que la personne trouve le problème mineur.",
          "correct": false,
          "feedback": "Pas forcément. Le contexte peut rendre la phrase ironiquement ou diplomatiquement très négative."
        },
        {
          "text": "Comme une approbation.",
          "correct": false,
          "feedback": "Non. “Not ideal” reste une évaluation négative."
        }
      ],
      "takeaway": "Compare toujours la force des mots à la force de la situation.",
      "speak": "Well, that’s not ideal.",
      "difficulty": "difficile"
    },
    {
      "id": "eng-lab-reference",
      "skill": "Référence",
      "title": "Retrouver le nom caché",
      "prompt": "“Which shoes do you want?” — “The black ones.” Que remplace ones ?",
      "context": "Deux paires de chaussures sont devant vous.",
      "choices": [
        {
          "text": "Shoes",
          "correct": true,
          "feedback": "Oui. Ones évite de répéter le nom déjà connu."
        },
        {
          "text": "Black",
          "correct": false,
          "feedback": "Black reste l’adjectif qui décrit les chaussures."
        },
        {
          "text": "Want",
          "correct": false,
          "feedback": "Ones ne remplace pas le verbe."
        }
      ],
      "takeaway": "Les pronoms et substituts se comprennent en suivant la chaîne du discours.",
      "speak": "Which shoes do you want? The black ones.",
      "difficulty": "facile"
    },
    {
      "id": "eng-lab-getby",
      "skill": "Phrasal verb",
      "title": "Comprendre la scène",
      "prompt": "“My English isn’t perfect, but I can get by.” Quel est le sens le plus naturel ?",
      "context": "La personne peut gérer les situations quotidiennes malgré des limites.",
      "choices": [
        {
          "text": "Je peux me débrouiller.",
          "correct": true,
          "feedback": "Exact. Get by = réussir à fonctionner avec des ressources limitées."
        },
        {
          "text": "Je peux passer physiquement à côté.",
          "correct": false,
          "feedback": "La traduction mot à mot ne correspond pas à la scène."
        },
        {
          "text": "Je peux devenir bilingue immédiatement.",
          "correct": false,
          "feedback": "La phrase dit précisément que l’anglais n’est pas parfait."
        }
      ],
      "takeaway": "Un phrasal verb est une mini-scène, pas la somme de ses mots.",
      "speak": "My English isn’t perfect, but I can get by.",
      "difficulty": "facile"
    },
    {
      "id": "eng-lab-clarify",
      "skill": "Interaction",
      "title": "Réparer une incompréhension",
      "prompt": "Tu comprends toute la phrase sauf le mot “reliable”. Quelle réaction est la plus efficace ?",
      "context": "Conversation en anglais, tu veux rester dans l’échange.",
      "choices": [
        {
          "text": "What do you mean by “reliable”?",
          "correct": true,
          "feedback": "Oui. Tu cibles exactement ce qui bloque."
        },
        {
          "text": "I don’t understand anything.",
          "correct": false,
          "feedback": "Trop large : l’autre ne sait pas quoi reformuler."
        },
        {
          "text": "Can we speak French now?",
          "correct": false,
          "feedback": "Possible dans la vie réelle, mais tu perds l’occasion de réparer en anglais."
        }
      ],
      "takeaway": "Une bonne demande de clarification isole l’incertitude.",
      "speak": "What do you mean by reliable?",
      "difficulty": "facile"
    },
    {
      "id": "eng-lab-audio-wondering",
      "skill": "Écoute · intention",
      "title": "Entendre une demande indirecte",
      "prompt": "Écoute la phrase. Quelle est l’intention principale ?",
      "context": "Un collègue écrit au sujet d’un document attendu cette semaine.",
      "speak": "I was wondering if you could send it by Friday.",
      "audioOnly": true,
      "choices": [
        {
          "text": "Faire une demande polie pour vendredi.",
          "correct": true,
          "feedback": "Oui. “I was wondering if you could…” est une manière indirecte et polie de demander."
        },
        {
          "text": "Raconter ce qu’il faisait vendredi dernier.",
          "correct": false,
          "feedback": "Non. La structure introduit une requête, pas un récit au passé."
        },
        {
          "text": "Dire qu’il ne veut plus du document.",
          "correct": false,
          "feedback": "Rien dans la phrase ne suggère l’abandon de la demande."
        }
      ],
      "takeaway": "À l’écoute, repère la fonction de la tournure avant chaque mot.",
      "difficulty": "moyen"
    },
    {
      "id": "eng-lab-audio-mind",
      "skill": "Écoute · implicite",
      "title": "Comprendre une réaction atténuée",
      "prompt": "Écoute la phrase. Quelle réaction exprime-t-elle le plus probablement ?",
      "context": "Quelqu’un découvre une première version d’un design qui ne correspond pas à sa demande.",
      "speak": "It’s not exactly what I had in mind.",
      "audioOnly": true,
      "choices": [
        {
          "text": "Une déception ou un désaccord formulé avec retenue.",
          "correct": true,
          "feedback": "Exact. “Not exactly what I had in mind” atténue une réaction négative."
        },
        {
          "text": "Un enthousiasme très fort.",
          "correct": false,
          "feedback": "Non. La formulation marque plutôt un écart avec ce qui était attendu."
        },
        {
          "text": "Une absence totale d’opinion.",
          "correct": false,
          "feedback": "La personne exprime bien une évaluation, même si elle est atténuée."
        }
      ],
      "takeaway": "Une formulation douce peut porter un jugement assez net.",
      "difficulty": "difficile"
    },
    {
      "id": "eng-lab-audio-endedup",
      "skill": "Écoute · phrasal verb",
      "title": "Reconstruire le résultat final",
      "prompt": "Écoute la phrase. Que s’est-il finalement passé ?",
      "context": "Le plan initial n’était pas forcément de prendre le train.",
      "speak": "We ended up taking the train.",
      "audioOnly": true,
      "choices": [
        {
          "text": "Ils ont finalement pris le train.",
          "correct": true,
          "feedback": "Oui. “End up + -ing” indique le résultat final d’une situation."
        },
        {
          "text": "Ils ont arrêté le train.",
          "correct": false,
          "feedback": "Non. La traduction mot à mot de end ne fonctionne pas ici."
        },
        {
          "text": "Ils ont raté tous les transports.",
          "correct": false,
          "feedback": "La phrase dit au contraire qu’ils ont pris le train."
        }
      ],
      "takeaway": "Les expressions fréquentes se comprennent comme des blocs.",
      "difficulty": "facile"
    },
    {
      "id": "eng-lab-audio-barely",
      "skill": "Écoute · nuance",
      "title": "Mesurer une quantité presque nulle",
      "prompt": "Écoute la phrase. Que signifie-t-elle ?",
      "context": "La connexion audio est mauvaise.",
      "speak": "I can barely hear you.",
      "audioOnly": true,
      "choices": [
        {
          "text": "Je t’entends à peine.",
          "correct": true,
          "feedback": "Oui. Barely indique que la capacité existe, mais presque pas."
        },
        {
          "text": "Je t’entends parfaitement.",
          "correct": false,
          "feedback": "C’est l’inverse de barely."
        },
        {
          "text": "Je refuse de t’écouter.",
          "correct": false,
          "feedback": "La phrase parle de capacité auditive, pas de volonté."
        }
      ],
      "takeaway": "Barely est plus proche de « à peine » que de « un peu ».",
      "difficulty": "facile"
    },
    {
      "id": "eng-lab-audio-suppose",
      "skill": "Écoute · registre",
      "title": "Décoder une demande très atténuée",
      "prompt": "Écoute la phrase. Quelle action attend probablement le locuteur ?",
      "context": "Une personne demande un petit service à quelqu’un qu’elle connaît peu.",
      "speak": "I don’t suppose you could give me a hand?",
      "audioOnly": true,
      "choices": [
        {
          "text": "Recevoir de l’aide.",
          "correct": true,
          "feedback": "Exact. La forme négative et prudente atténue une demande de service."
        },
        {
          "text": "Vérifier si l’autre possède une main.",
          "correct": false,
          "feedback": "“Give me a hand” est une expression pour demander de l’aide."
        },
        {
          "text": "Refuser toute assistance.",
          "correct": false,
          "feedback": "La phrase cherche au contraire à obtenir de l’aide."
        }
      ],
      "takeaway": "Le registre anglais passe souvent par des détours grammaticaux.",
      "difficulty": "moyen"
    },
    {
      "id": "eng-lab-audio-mustjoke",
      "skill": "Écoute · pragmatique",
      "title": "Comprendre la réaction, pas le modal",
      "prompt": "Écoute la phrase. Dans cette scène, que veut probablement dire la personne ?",
      "context": "On lui annonce un prix manifestement exorbitant.",
      "speak": "You must be joking.",
      "audioOnly": true,
      "choices": [
        {
          "text": "Elle exprime une forte incrédulité.",
          "correct": true,
          "feedback": "Oui. Ici must ne décrit pas une obligation : la phrase signifie en gros « tu plaisantes ! »."
        },
        {
          "text": "Elle donne l’ordre de raconter une blague.",
          "correct": false,
          "feedback": "Non. L’usage est pragmatique : c’est une réaction d’incrédulité."
        },
        {
          "text": "Elle accepte immédiatement le prix.",
          "correct": false,
          "feedback": "Le contexte indique au contraire un rejet ou une surprise forte."
        }
      ],
      "takeaway": "Les modaux prennent leur sens dans l’acte de parole, pas seulement dans une règle grammaticale.",
      "difficulty": "difficile"
    }
  ],
  "philosophy": [
    {
      "id": "philo-lab-validity",
      "skill": "Argument",
      "title": "Tester la structure",
      "prompt": "“Tous les oiseaux sont des mammifères. Le moineau est un oiseau. Donc le moineau est un mammifère.” Que faut-il dire ?",
      "context": "On évalue la structure logique, pas la biologie.",
      "choices": [
        {
          "text": "L’argument est valide dans sa forme, mais une prémisse est fausse.",
          "correct": true,
          "feedback": "Exact. Si les prémisses étaient vraies, la conclusion suivrait ; le contenu reste faux."
        },
        {
          "text": "L’argument est invalide parce que la conclusion est fausse.",
          "correct": false,
          "feedback": "La fausseté d’une prémisse ou de la conclusion ne suffit pas à diagnostiquer l’invalidité."
        },
        {
          "text": "L’argument est solide.",
          "correct": false,
          "feedback": "Non : un argument solide exige aussi des prémisses bien établies."
        }
      ],
      "takeaway": "Sépare toujours structure logique et vérité des prémisses.",
      "difficulty": "facile"
    },
    {
      "id": "philo-lab-necessary",
      "skill": "Distinction",
      "title": "Nécessaire ou suffisant ?",
      "prompt": "Avoir de l’oxygène est nécessaire à une combustion ordinaire. Que peut-on conclure ?",
      "context": "On raisonne sur les conditions d’un phénomène.",
      "choices": [
        {
          "text": "Sans oxygène, pas de combustion ordinaire ; mais l’oxygène seul ne suffit pas.",
          "correct": true,
          "feedback": "Oui. Nécessaire ne veut pas dire suffisant."
        },
        {
          "text": "Dès qu’il y a de l’oxygène, un feu démarre.",
          "correct": false,
          "feedback": "C’est précisément la confusion entre nécessité et suffisance."
        },
        {
          "text": "L’oxygène est sans rapport avec la combustion.",
          "correct": false,
          "feedback": "La prémisse dit au contraire qu’il est nécessaire."
        }
      ],
      "takeaway": "Demande : sans X, Y ? et avec X, Y forcément ?",
      "difficulty": "facile"
    },
    {
      "id": "philo-lab-counterexample",
      "skill": "Concept",
      "title": "Chercher le contre-exemple",
      "prompt": "On propose : “Être courageux, c’est ne jamais reculer.” Quel cas fragilise le mieux cette définition ?",
      "context": "Tu cherches un cas où la définition classe mal une situation.",
      "choices": [
        {
          "text": "Un pompier recule pour éviter un effondrement puis revient sauver une victime.",
          "correct": true,
          "feedback": "Oui. Reculer peut être compatible avec le courage ; la définition est trop étroite."
        },
        {
          "text": "Un soldat porte un casque.",
          "correct": false,
          "feedback": "Ce cas ne teste pas directement le critère “ne jamais reculer”."
        },
        {
          "text": "Une personne aime le café.",
          "correct": false,
          "feedback": "Hors sujet : cela ne concerne pas le courage."
        }
      ],
      "takeaway": "Un bon contre-exemple vise exactement le critère proposé.",
      "difficulty": "moyen"
    },
    {
      "id": "philo-lab-stoic",
      "skill": "Stoïcisme",
      "title": "Fait ou jugement ?",
      "prompt": "Quel énoncé ajoute le plus clairement une évaluation à un fait ?",
      "context": "Une présentation vient de recevoir une critique publique.",
      "choices": [
        {
          "text": "“Cette critique prouve que je suis nul et que tout est fichu.”",
          "correct": true,
          "feedback": "Oui. On passe de l’événement à un jugement global et catastrophique."
        },
        {
          "text": "“Une personne a critiqué deux points de ma présentation.”",
          "correct": false,
          "feedback": "C’est une description plus proche du fait observable."
        },
        {
          "text": "“La réunion a commencé à 9 h.”",
          "correct": false,
          "feedback": "C’est un fait temporel sans évaluation manifeste."
        }
      ],
      "takeaway": "Séparer événement et jugement ouvre un espace de réponse.",
      "difficulty": "facile"
    },
    {
      "id": "philo-lab-cogito",
      "skill": "Descartes",
      "title": "Limiter la conclusion",
      "prompt": "Que garantit d’abord le cogito cartésien ?",
      "context": "On évite d’étendre la conclusion au-delà de ce que l’argument établit.",
      "choices": [
        {
          "text": "Que j’existe au moins comme sujet pensant au moment où je pense.",
          "correct": true,
          "feedback": "Exact. C’est une certitude minimale."
        },
        {
          "text": "Que toutes mes perceptions sont vraies.",
          "correct": false,
          "feedback": "Le cogito ne garantit pas immédiatement la fiabilité de toutes les perceptions."
        },
        {
          "text": "Que le monde extérieur est exactement comme je l’imagine.",
          "correct": false,
          "feedback": "Cette conclusion demande des étapes supplémentaires."
        }
      ],
      "takeaway": "Une preuve locale ne doit pas devenir une certitude universelle.",
      "difficulty": "moyen"
    },
    {
      "id": "philo-lab-induction",
      "skill": "Hume",
      "title": "Repérer le cercle",
      "prompt": "“L’induction a toujours bien marché jusqu’ici, donc elle marchera demain.” Quel est le problème humien ?",
      "context": "On cherche une justification de l’induction qui ne l’utilise pas déjà.",
      "choices": [
        {
          "text": "La justification utilise elle-même le passage du passé au futur qu’elle veut justifier.",
          "correct": true,
          "feedback": "Oui. Elle est circulaire au niveau pertinent."
        },
        {
          "text": "Le mot demain est ambigu.",
          "correct": false,
          "feedback": "Le problème n’est pas linguistique."
        },
        {
          "text": "L’induction n’a jamais été utilisée.",
          "correct": false,
          "feedback": "Au contraire, elle structure énormément de raisonnements ordinaires et scientifiques."
        }
      ],
      "takeaway": "Demande si la justification présuppose déjà la méthode qu’elle défend.",
      "difficulty": "difficile"
    },
    {
      "id": "philo-lab-ethics",
      "skill": "Éthique",
      "title": "Changer de cadre",
      "prompt": "Dans un dilemme, quelle question correspond le mieux à une approche déontologique ?",
      "context": "On distingue conséquences, devoirs et vertus.",
      "choices": [
        {
          "text": "Y a-t-il un devoir ou un droit que cette action violerait, même si le résultat semble bon ?",
          "correct": true,
          "feedback": "Oui. Le cadre donne un poids propre aux obligations et aux droits."
        },
        {
          "text": "Quelle option produit le meilleur bilan total ?",
          "correct": false,
          "feedback": "C’est plutôt une question conséquentialiste."
        },
        {
          "text": "Quel trait de caractère cette décision cultive-t-elle ?",
          "correct": false,
          "feedback": "C’est plus proche de l’éthique des vertus."
        }
      ],
      "takeaway": "Beaucoup de désaccords moraux viennent de questions différentes posées au même cas.",
      "difficulty": "moyen"
    },
    {
      "id": "philo-lab-contract",
      "skill": "Politique",
      "title": "Comparer les problèmes",
      "prompt": "Quel appariement est le plus juste ?",
      "context": "Hobbes, Locke et Rousseau ne posent pas exactement le même problème politique.",
      "choices": [
        {
          "text": "Hobbes : sécurité ; Locke : droits et limites du pouvoir ; Rousseau : liberté politique et volonté générale.",
          "correct": true,
          "feedback": "Oui. C’est une bonne carte de départ, sans prétendre résumer tous leurs textes."
        },
        {
          "text": "Les trois défendent exactement le même pouvoir absolu.",
          "correct": false,
          "feedback": "Leurs conceptions de la légitimité diffèrent fortement."
        },
        {
          "text": "Les trois rejettent toute forme de loi commune.",
          "correct": false,
          "feedback": "Le contrat social traite précisément de l’ordre politique commun."
        }
      ],
      "takeaway": "Comparer par problème évite de transformer les auteurs en fiches interchangeables.",
      "difficulty": "moyen"
    },
    {
      "id": "philo-lab-factvalue",
      "skill": "Distinction",
      "title": "Fait, valeur ou inférence ?",
      "prompt": "Laquelle de ces phrases est principalement un jugement de valeur ?",
      "context": "On sépare description et évaluation.",
      "choices": [
        {
          "text": "“Cette politique est injuste.”",
          "correct": true,
          "feedback": "Oui. “Injuste” évalue selon une norme ou une conception de la justice."
        },
        {
          "text": "“La loi a été votée mardi.”",
          "correct": false,
          "feedback": "C’est d’abord une affirmation descriptive vérifiable."
        },
        {
          "text": "“Le texte contient 14 articles.”",
          "correct": false,
          "feedback": "C’est une proposition factuelle."
        }
      ],
      "takeaway": "Identifier la nature d’une phrase aide à savoir quel type de justification elle demande.",
      "difficulty": "facile"
    },
    {
      "id": "philo-lab-objection",
      "skill": "Débat",
      "title": "Formuler une vraie objection",
      "prompt": "Quel énoncé est l’objection la plus philosophique à une thèse ?",
      "context": "Thèse : “Toute règle juste doit être identique pour tout le monde, sans aucune exception.”",
      "choices": [
        {
          "text": "“Et si des situations pertinentes sont différentes, pourquoi l’égalité de traitement exigerait-elle forcément une règle strictement identique ?”",
          "correct": true,
          "feedback": "Oui. L’objection cible le lien entre justice et uniformité."
        },
        {
          "text": "“Je n’aime pas cette thèse.”",
          "correct": false,
          "feedback": "C’est une réaction, pas encore une raison."
        },
        {
          "text": "“C’est faux, point.”",
          "correct": false,
          "feedback": "Une objection doit montrer où le raisonnement peut échouer."
        }
      ],
      "takeaway": "Une objection forte attaque une prémisse, une inférence ou un contre-exemple possible.",
      "difficulty": "moyen"
    },
    {
      "id": "philo-lab-premise",
      "skill": "Argument",
      "title": "Repérer la conclusion",
      "prompt": "Dans l’argument suivant, quelle phrase joue le rôle de conclusion ?",
      "context": "« Les données sont incomplètes. Une décision irréversible serait donc prématurée. Il faut attendre une mesure supplémentaire. »",
      "choices": [
        {
          "text": "Il faut attendre une mesure supplémentaire.",
          "correct": true,
          "feedback": "Oui. C’est la recommandation que les phrases précédentes cherchent à soutenir."
        },
        {
          "text": "Les données sont incomplètes.",
          "correct": false,
          "feedback": "C’est une prémisse : elle fournit une raison."
        },
        {
          "text": "Une décision irréversible serait prématurée.",
          "correct": false,
          "feedback": "C’est une étape du raisonnement, mais la recommandation finale est encore plus loin."
        }
      ],
      "takeaway": "Demande quelle proposition les autres phrases essaient de faire accepter.",
      "difficulty": "facile"
    },
    {
      "id": "philo-lab-solid",
      "skill": "Argument",
      "title": "Valide n’est pas encore solide",
      "prompt": "Un raisonnement est valide et toutes ses prémisses sont bien établies. Quel terme le décrit le mieux ?",
      "context": "On distingue structure logique et qualité des prémisses.",
      "choices": [
        {
          "text": "Solide.",
          "correct": true,
          "feedback": "Oui. Dans l’usage logique courant, solidité = validité + prémisses vraies ou bien établies."
        },
        {
          "text": "Circulaire par définition.",
          "correct": false,
          "feedback": "La validité et la vérité des prémisses n’impliquent pas une circularité."
        },
        {
          "text": "Nécessairement faux.",
          "correct": false,
          "feedback": "Au contraire, une structure valide avec de bonnes prémisses donne une forte garantie à la conclusion."
        }
      ],
      "takeaway": "Évalue séparément la forme et le contenu, puis réunis-les.",
      "difficulty": "facile"
    },
    {
      "id": "philo-lab-isought",
      "skill": "Distinction",
      "title": "Du fait à la norme",
      "prompt": "Quel passage ajoute une prémisse normative implicite ?",
      "context": "« La majorité des gens fait X, donc tout le monde devrait faire X. »",
      "choices": [
        {
          "text": "Le passage de “la majorité fait X” à “tout le monde devrait faire X”.",
          "correct": true,
          "feedback": "Exact. Un fait de fréquence ne suffit pas seul à produire une obligation."
        },
        {
          "text": "Le mot “majorité”.",
          "correct": false,
          "feedback": "Le problème n’est pas le mot, mais le saut entre description et norme."
        },
        {
          "text": "Le fait qu’il y ait des gens.",
          "correct": false,
          "feedback": "Ce n’est pas ce qui porte l’inférence normative."
        }
      ],
      "takeaway": "Une conclusion en « devrait » demande au moins une raison normative.",
      "difficulty": "moyen"
    },
    {
      "id": "philo-lab-influence",
      "skill": "Stoïcisme",
      "title": "Contrôle ou influence ?",
      "prompt": "Quelle formulation est la plus précise ?",
      "context": "Tu prépares un entretien important.",
      "choices": [
        {
          "text": "Je peux travailler ma préparation et ma conduite, mais seulement influencer le résultat final.",
          "correct": true,
          "feedback": "Oui. Cela évite de confondre ce qui dépend davantage de toi avec un contrôle total sur le monde."
        },
        {
          "text": "Si je me prépare parfaitement, je contrôle nécessairement la décision du recruteur.",
          "correct": false,
          "feedback": "La décision d’autrui reste extérieure à ton contrôle complet."
        },
        {
          "text": "Comme je ne contrôle pas le résultat, ma préparation ne sert à rien.",
          "correct": false,
          "feedback": "Ne pas contrôler le résultat n’annule pas l’influence de ton action."
        }
      ],
      "takeaway": "La distinction utile n’est pas toujours contrôle / absence totale d’effet.",
      "difficulty": "moyen"
    },
    {
      "id": "philo-lab-consequences",
      "skill": "Éthique",
      "title": "Quelle question change le cadre ?",
      "prompt": "Laquelle de ces questions déplace clairement l’analyse vers les conséquences ?",
      "context": "Une règle interdit normalement de mentir, mais un cas exceptionnel met quelqu’un en danger.",
      "choices": [
        {
          "text": "Quels effets chaque option aura-t-elle sur les personnes concernées ?",
          "correct": true,
          "feedback": "Oui. C’est le cœur d’une analyse orientée vers les conséquences."
        },
        {
          "text": "Quelle règle ai-je l’obligation de respecter ?",
          "correct": false,
          "feedback": "Cette question est plus déontologique."
        },
        {
          "text": "Quel type de personne est-ce que je veux devenir ?",
          "correct": false,
          "feedback": "Cette question est plus proche de l’éthique des vertus."
        }
      ],
      "takeaway": "Identifier le cadre permet de comprendre pourquoi deux raisonnements moraux divergent.",
      "difficulty": "moyen"
    },
    {
      "id": "philo-lab-generalwill",
      "skill": "Politique",
      "title": "Volonté générale ≠ sondage",
      "prompt": "Quelle formulation évite le mieux de caricaturer Rousseau ?",
      "context": "On compare volonté générale et addition des préférences privées.",
      "choices": [
        {
          "text": "La volonté générale vise le commun et ne se réduit pas automatiquement à la somme des désirs individuels du moment.",
          "correct": true,
          "feedback": "Oui. C’est précisément la distinction à conserver."
        },
        {
          "text": "La volonté générale est toujours ce que veut la majorité dans n’importe quel sondage.",
          "correct": false,
          "feedback": "C’est une réduction trop simple de la notion."
        },
        {
          "text": "La volonté générale signifie qu’aucune loi commune n’est possible.",
          "correct": false,
          "feedback": "Rousseau cherche au contraire à penser une loi commune compatible avec la liberté politique."
        }
      ],
      "takeaway": "Un concept politique doit être distingué de ses approximations contemporaines.",
      "difficulty": "difficile"
    }
  ]
};
  window.HD_DISCIPLINE_LABS = LABS;
  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version: "1.0.0-rc.22.0", disciplineLabs: { english: LABS.english.length, philosophy: LABS.philosophy.length } };
  } catch {}
})();
