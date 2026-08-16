/* HistoDaily RC49 — English mystery clarity pass.
   English starter mysteries must feel like real situations, not meta-instructions. */
(function histodailyRc49EnglishMysteries(){
  "use strict";
  const VERSION="1.0.0-rc.49.0";
  const updates={
    "english-mystery-actually-318":{
      title:"Tu corriges sans insister",missionQuestion:"Ton collègue se trompe. Que réponds-tu ?",
      prompt:'Il te demande : “So you live in Paris now?” En réalité, tu habites Lille et tu travailles seulement à Paris.',
      answerInstruction:"Choisis la réponse la plus naturelle dans cette conversation.",
      clues:["Tu ne donnes pas seulement une information : tu corriges l’idée qu’il vient d’exprimer.","Actually est très courant pour rectifier doucement une supposition dans une conversation."],
      blockedGuesses:["Currently, I live in Lille. I only work in Paris.","Eventually, I live in Lille. I only work in Paris.","Actually, I currently work in Lille and live in Paris."],
      explanation:"Actually signale naturellement une petite correction : ton collègue vient de supposer que tu vis à Paris, et tu rectifies ce point. Currently parle surtout de ce qui est vrai en ce moment ; eventually parle d’un résultat qui arrive plus tard."
    },
    "english-mystery-eventually-318":{
      title:"La troisième tentative",missionQuestion:"Quelle phrase raconte naturellement ce qui s’est passé ?",
      prompt:"Maya rate l’examen deux fois. Elle le repasse une troisième fois et, cette fois, elle réussit.",
      answerInstruction:"Choisis la phrase qui exprime le résultat obtenu après plusieurs tentatives.",
      clues:["La réussite arrive au bout d’un processus, pas simplement ‘en ce moment’.","Eventually signifie ici qu’après plusieurs étapes ou tentatives, on arrive enfin à ce résultat."],
      blockedGuesses:["She currently passed the exam.","She already passed the exam after failing it tomorrow.","She actually passes the exam every time."],
      explanation:"She eventually passed the exam décrit une réussite qui arrive finalement après plusieurs tentatives. Le mot donne l’idée d’un aboutissement, sans préciser exactement quand."
    },
    "english-mystery-afraid-318":{
      title:"Plus aucune chambre",missionQuestion:"Tu es à la réception. Comment annonces-tu la mauvaise nouvelle ?",
      prompt:"Un client demande une chambre pour ce soir, mais l’hôtel est complet. Tu veux être poli tout en étant parfaitement clair.",
      answerInstruction:"Choisis la formulation la plus naturelle pour annoncer ce refus.",
      clues:["La réponse doit rester ferme : aucune chambre n’est disponible.","I’m afraid… sert souvent à adoucir une mauvaise nouvelle ; ici afraid ne décrit pas réellement la peur."],
      blockedGuesses:["I'm frightened that we don't have any rooms left.","We maybe don't have any rooms left, I think.","We don't have any rooms left, so that's your problem."],
      explanation:"I’m afraid we don’t have any rooms left est une manière courante et polie d’annoncer une mauvaise nouvelle. I’m afraid adoucit le message sans rendre l’information moins nette."
    },
    "english-mystery-yet-318":{
      title:"Pas envoyé… pour l’instant",missionQuestion:"À 16 h, que peux-tu dire naturellement ?",
      prompt:"Le rapport n’est toujours pas envoyé, mais tu comptes bien l’envoyer avant la fin de la journée.",
      answerInstruction:"Choisis la phrase qui dit ‘pas encore’ sans suggérer que tu as abandonné.",
      clues:["L’action n’est pas faite maintenant, mais elle reste attendue.","Yet se place très naturellement avec une négation pour dire ‘jusqu’à maintenant, non’."],
      blockedGuesses:["I haven't sent the report already.","I didn't send the report yet yesterday.","I haven't yet the report sent."],
      explanation:"I haven’t sent the report yet signifie que l’envoi n’a pas eu lieu jusqu’à maintenant, tout en laissant entendre qu’il est encore prévu. C’est exactement la situation décrite."
    },
    "english-mystery-turnout-318":{
      title:"Ce n’était pas ce qu’on croyait",missionQuestion:"Quelle phrase raconte naturellement la découverte ?",
      prompt:"Vous pensiez qu’un e-mail était authentique. Après vérification, vous découvrez que c’était une arnaque.",
      answerInstruction:"Choisis la phrase qui oppose l’impression de départ à la réalité découverte ensuite.",
      clues:["La réalité finale est différente de ce que vous pensiez au début.","Turn out to be sert précisément à parler de ce qu’une chose se révèle être après vérification."],
      blockedGuesses:["It turned into being a scam.","It found out to be a scam.","It called off as a scam."],
      explanation:"It turned out to be a scam signifie qu’après vérification, la situation s’est révélée être une arnaque. Turn out to be est très naturel quand la réalité finale contredit l’impression initiale."
    },
    "english-mystery-soft-disagree-318":{
      title:"Dire non sans fermer la discussion",missionQuestion:"En réunion, quelle réponse fonctionne le mieux ?",
      prompt:"Tu penses que la première proposition risque d’échouer. Tu veux le dire clairement, mais aussi proposer immédiatement une autre piste.",
      answerInstruction:"Choisis la réponse qui exprime un désaccord net sans être inutilement agressive.",
      clues:["Il faut entendre le désaccord ET une solution de rechange.","I’m not sure that would work atténue la forme, mais le désaccord reste compréhensible."],
      blockedGuesses:["That won't work. Next idea.","I'm not sure… maybe… I don't know.","I don't understand the proposal, so let's stop."],
      explanation:"I’m not sure that would work exprime une réserve claire sans attaquer la personne. Could we try the second option instead? transforme ensuite le désaccord en proposition concrète."
    },
    "english-mystery-sensible-rc19":{
      title:"Le plan B",missionQuestion:"Ton collègue propose le plan le plus simple. Que réponds-tu ?",
      prompt:'Il dit : “We’re short on time. Let’s use the simpler plan — it does the same job with less risk.” Tu trouves que c’est une décision raisonnable et pratique.',
      answerInstruction:"Choisis la réponse anglaise qui sonne naturelle.",
      clues:["Attention au faux ami : sensible en anglais ne signifie généralement pas ‘sensible’ au sens émotionnel.","Pour une décision pratique et raisonnable, sensible est justement un adjectif très naturel."],
      blockedGuesses:["That sounds like a sensitive decision.","That sounds like a sensibly decision.","That sounds sensible decision."],
      explanation:"That sounds like a sensible decision est naturel ici : sensible signifie raisonnable, judicieux ou pratique. Sensitive concerne plutôt quelqu’un ou quelque chose de sensible, délicat ou réactif."
    },
    "english-mystery-one-reference-rc19":{
      title:"À quoi renvoie one ?",missionQuestion:"Dans cette phrase, que remplace “one” ?",
      prompt:'“My charger is broken, so I need to buy a new one.”',
      answerInstruction:"Retrouve le nom que l’anglais évite de répéter.",
      clues:["Relis le nom déjà présent juste avant : c’est l’objet qu’il faut remplacer.","A new one signifie ici ‘un nouveau + le même type d’objet’."],
      blockedGuesses:["A new phone.","A new battery.","A new problem."],
      explanation:"One remplace charger : ‘I need to buy a new one’ veut dire ‘I need to buy a new charger’. L’anglais évite ainsi de répéter le même nom."
    },
    "english-mystery-pretty-rc19":{
      title:"Pretty sans parler de beauté",missionQuestion:"Que veut dire “pretty” ici ?",
      prompt:'Un étudiant sort d’un examen difficile et dit : “That was pretty difficult.”',
      answerInstruction:"Choisis la reformulation qui garde le sens et le niveau d’intensité.",
      clues:["Pretty est placé devant un adjectif : regarde son rôle dans la phrase.","Dans ce registre informel, pretty peut renforcer un adjectif, un peu comme fairly/quite selon le contexte."],
      blockedGuesses:["That was visually attractive.","That was a little beautiful.","That looked prettier than expected."],
      explanation:"Ici, pretty est un intensifieur informel : pretty difficult signifie ‘assez / plutôt difficile’. Il n’a aucun rapport avec l’apparence."
    },
    "english-mystery-email-rc19":{
      title:"Relancer sans agresser",missionQuestion:"Tu relances pour la première fois. Quel message envoies-tu ?",
      prompt:"Tu as envoyé un brouillon à un collègue il y a deux jours. Il n’y a pas d’urgence et tu veux simplement savoir s’il a eu le temps de le regarder.",
      answerInstruction:"Choisis la relance la plus naturelle et proportionnée à la situation.",
      clues:["C’est la première relance : inutile de supposer qu’il t’ignore.","Just checking… permet de rappeler le sujet sans transformer le retard en reproche."],
      blockedGuesses:["You still haven't replied to my draft.","I require your immediate feedback on the draft.","I assume you rejected the draft because you didn't answer."],
      explanation:"Just checking whether you had a chance to look at the draft est une relance légère : elle rappelle le sujet et demande une mise à jour sans accuser le collègue ni inventer une urgence."
    },
    "english-mystery-getover-rc19":{
      title:"Remis de la grippe",missionQuestion:"Quelle phrase décrit naturellement sa récupération ?",
      prompt:"Après une grippe, il lui faut deux semaines avant de se sentir vraiment revenu à la normale.",
      answerInstruction:"Choisis le phrasal verb qui convient à une récupération après une maladie.",
      clues:["On parle du fait de se remettre d’une maladie.","Get over peut signifier ‘se remettre de’ une maladie ou d’une expérience difficile."],
      blockedGuesses:["It took him two weeks to get by the flu.","It took him two weeks to get away with the flu.","It took him two weeks to get through over the flu."],
      explanation:"Get over the flu signifie se remettre de la grippe. Get by signifie plutôt se débrouiller ; get away with signifie échapper aux conséquences de quelque chose."
    },
    "english-mystery-clarify-rc19":{
      title:"Un mot te bloque",missionQuestion:"Tu comprends toute la phrase sauf “reliable”. Que demandes-tu ?",
      prompt:"Tu ne veux pas faire répéter toute la conversation : tu veux seulement éclaircir ce mot dans ce contexte.",
      answerInstruction:"Choisis la question la plus précise et la plus naturelle.",
      clues:["Ta question doit viser uniquement le mot qui pose problème.","What do you mean by…? est une façon simple de demander ce qu’un mot signifie dans ce contexte."],
      blockedGuesses:["Could you repeat everything from the beginning?","Can you explain every word in that sentence?","I don't understand anything."],
      explanation:"What do you mean by ‘reliable’ here? cible exactement l’information manquante. C’est plus naturel et efficace que de faire répéter ou expliquer toute la phrase."
    },
    "english-mystery-despite-rc19":{
      title:"Despite ou although ?",missionQuestion:"Quelle phrase est correctement construite ?",
      prompt:"Tu veux dire : ‘Malgré la pluie, nous sommes sortis’ en utilisant despite.",
      answerInstruction:"Choisis la structure anglaise naturelle après despite.",
      clues:["Après despite, on attend ici un nom ou groupe nominal.","Although fonctionne autrement : il introduit normalement une proposition avec sujet + verbe."],
      blockedGuesses:["Despite it was raining, we went out.","Although the rain, we went out.","Despite of the rain, we went out."],
      explanation:"Despite the rain, we went out est correct : despite est suivi du groupe nominal the rain. Avec although, on dirait plutôt although it was raining."
    },
    "english-mystery-notideal-rc19":{
      title:"“Not ideal” alors que tout va mal",missionQuestion:"Que sous-entend réellement “That’s not ideal” ici ?",
      prompt:'Un déploiement efface plusieurs heures de travail. L’ingénieur dit “Well, that’s not ideal” puis lance immédiatement une récupération d’urgence.',
      answerInstruction:"Interprète la phrase avec la gravité de la situation et ce que fait l’ingénieur ensuite.",
      clues:["Ses mots sont faibles, mais son action montre qu’il considère le problème comme sérieux.","C’est un understatement : on dit volontairement moins fort que ce qu’on pense réellement."],
      blockedGuesses:["It means the engineer thinks the problem is minor.","It means the engineer is pleased with the deployment.","It means the engineer has not noticed the data loss."],
      explanation:"It understates a serious problem : l’expression not ideal paraît modérée, mais la récupération d’urgence montre que le problème est grave. C’est un understatement typique."
    }
  };

  let updated=0;
  for(const mystery of (data.mysteries||[])){
    const patch=updates[mystery?.id];
    if(!patch)continue;
    Object.assign(mystery,patch,{englishScenarioRC49:true});
    updated++;
  }
  try{window.HistoDaily={...(window.HistoDaily||{}),version:VERSION,englishMysteryClarityRC49:{updated}};}catch{}
})();
