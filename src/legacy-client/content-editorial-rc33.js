/* HistoDaily RC33 — revue éditoriale qualitative.
   La longueur reste un garde-fou, mais cette passe cible surtout :
   - redondance et remplissage générique ;
   - exercices réellement spécifiques au concept ;
   - explications de quiz reliées à la bonne idée ;
   - mystères qui ne révèlent jamais gratuitement leur solution ;
   - erreurs/corruptions de formulation. */
(function histodailyRC33EditorialReview(){
  "use strict";
  const VERSION="1.0.0-rc.33.0";
  const packs=(typeof READY_LESSON_PACKS==="object"&&READY_LESSON_PACKS)||{};
  const mysteries=Array.isArray(data?.mysteries)?data.mysteries:[];
  const clean=v=>String(v||"").replace(/\s+/g," ").trim();
  const fold=v=>clean(v).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  const norm=v=>fold(v).replace(/[^a-z0-9]+/g," ").trim();
  const wordTokens=v=>norm(v).split(/\s+/).filter(Boolean);
  const stop=new Set("le la les un une des du de d et ou a au aux en dans sur pour par avec sans ce cet cette ces il elle ils elles on nous vous que qui quoi quel quelle quels quelles est sont etait etaient etre se sa son ses leur leurs comme plus moins tres ne pas non oui car donc puis mais ni si tout toute tous toutes entre vers chez quand ou comment pourquoi peut peuvent permet signifie surtout notamment generalement simplement cours question reponse idee bonne vrai vraie".split(" "));
  const tokens=v=>wordTokens(v).filter(t=>t.length>=3&&!stop.has(t));
  const tokenSet=v=>new Set(tokens(v));
  const overlap=(a,b)=>{const A=tokenSet(a),B=tokenSet(b);let n=0;A.forEach(t=>{if(B.has(t))n++;});return n;};
  const sentences=v=>clean(v).match(/[^.!?]+[.!?]?/g)?.map(clean).filter(Boolean)||[];
  const ensurePeriod=v=>{const t=clean(v);return t&&!/[.!?…»]$/.test(t)?`${t}.`:t;};

  // 1) RC32 avait rempli certains catalogues avec des synthèses mécaniques.
  // On conserve les approfondissements factuels, mais pas les blocs de remplissage.
  let removedFiller=0;
  Object.values(packs).forEach(pack=>{
    if(!Array.isArray(pack?.complete))return;
    const before=pack.complete.length;
    pack.complete=pack.complete.filter(block=>!['rc32-synthesis','rc32-evidence'].includes(block?.editorialAddition));
    removedFiller+=before-pack.complete.length;
  });

  // 2) Un seul atelier réellement propre à chaque cours d'anglais/philosophie.
  // Les ateliers RC32 génériques sont retirés et remplacés, pas empilés.
  const practice={
    'eng-context-inference':`Lis : “The path was slippery, so Maya slowed down and held the rail.” Sans dictionnaire, propose d’abord un sens plausible pour slippery à partir des conséquences visibles. Remplace ensuite le mot par trois candidats — narrow, wet, crowded — et explique lequel reste compatible avec toute la scène. Termine en formulant en anglais simple ce que tu as compris avant de vérifier le mot. Le but est de distinguer une hypothèse contextuelle d’une traduction devinée au hasard.`,
    'eng-false-friends-core':`Traduis quatre mini-phrases sans te fier à la ressemblance : “Actually, I disagree.”, “We eventually found it.”, “I attended the meeting.” et “Could you assist me?”. Pour chacune, écris ensuite le faux ami français qui aurait créé le contresens et l’indice de contexte qui permet de l’éviter. Enfin, invente une phrase avec currently afin de bien séparer “actuellement” de actually.`,
    'eng-still-yet-already-even':`Pars d’une seule situation : un rapport doit être rendu à 18 h. À 17 h, écris quatre phrases naturelles avec still, yet, already et even. Pour chacune, indique l’attente implicite : continuité, résultat encore attendu, résultat plus tôt que prévu ou cas surprenant. Si deux phrases décrivent les mêmes faits, explique pourquoi elles ne donnent pourtant pas le même point de vue.`,
    'eng-polite-register':`Tu dois obtenir un document avant midi. Formule la même demande à un ami proche, à un collègue et à un client que tu connais peu. Utilise successivement une demande directe contextualisée, could you… et une formulation plus distante. Pour chaque version, indique ce qui change réellement : degré d’imposition, relation supposée et urgence. La plus longue n’est pas automatiquement la plus polie.`,
    'eng-phrasal-context':`Sans traduire mot à mot, explique les scènes suivantes : “The match was called off”, “I can’t figure it out”, “We ran out of time”. Pour chaque phrasal verb, donne une paraphrase anglaise très simple, puis modifie un élément de la scène afin de vérifier que le sens tient toujours. Termine par une nouvelle phrase où la particule isolée ne suffirait pas à deviner le sens.`,
    'eng-paraphrase-repair':`Interdiction de passer au français pendant une minute : décris successivement un screwdriver, un kettle et quelqu’un reluctant sans employer ces trois mots. Utilise catégorie, fonction, apparence, exemple ou contraste. Puis imagine que l’interlocuteur n’a toujours pas compris : ajoute une seconde reformulation différente au lieu de répéter la première plus fort.`,
    'eng-connectors-logic':`Construis un mini-paragraphe de quatre phrases sur un trajet retardé. Il doit contenir une concession avec although, une opposition avec however et une conséquence avec therefore. Remplace ensuite although + proposition par despite + groupe nominal ou forme en -ing sans changer la logique. Vérifie que la grammaire change alors que la relation entre les idées reste la même.`,
    'eng-implicit-meaning':`Interprète “That’s interesting” dans trois scènes : un ami admire vraiment une idée, un recruteur veut rester neutre, un collègue désapprouve sans le dire directement. Pour chaque scène, relève deux indices qui justifient ton interprétation. Fais ensuite la même chose avec “I’ll think about it”. L’objectif est de justifier une lecture par le contexte, pas d’apprendre un sous-entendu fixe.`,
    'eng-context-reference':`Dans “Nora lent Leo her charger because his had stopped working. That saved the meeting”, identifie précisément les référents de her, his et that. Remplace chacun par son référent complet et relis le passage : si le sens ou la grammaire se casse, ton hypothèse est mauvaise. Termine avec “I’ll take the blue one” en inventant le nom que one pourrait remplacer.`,
    'eng-false-friends-second-wave':`Crée quatre paires contrastées : sensible/sensitive, comprehensive/comprehensible, library/bookshop et actually/currently. Chaque paire doit contenir une collocation naturelle plutôt qu’un mot isolé : a sensible decision, sensitive skin, etc. Explique ensuite quel contexte ferait immédiatement sonner faux la traduction littérale française.`,
    'eng-small-words-just-quite':`Prends “The presentation was good” et fabrique quatre versions avec just, quite, rather et pretty. Elles ne doivent pas toutes vouloir dire “assez”. Pour chaque version, décris l’effet sur le ton et précise si une autre intonation ou une autre variété d’anglais pourrait déplacer l’interprétation. Termine avec “I just wanted to ask…” et explique ce que just fait socialement.`,
    'eng-register-email-directness':`Réécris “Send me the corrected file by 4.” en trois versions : directe mais acceptable dans une équipe habituée à travailler ensemble, neutre professionnelle, puis diplomatique pour une demande coûteuse. Ajoute une raison réelle à l’échéance sans noyer l’action demandée. Compare ensuite les trois objets de mail : lequel permet de comprendre immédiatement l’action attendue ?`,
    'eng-phrasal-get':`Associe chaque mini-scène au bon bloc : get back, get over, get by, get away with. 1) quelqu’un rentre à 2 h ; 2) une personne se remet d’une grippe ; 3) un voyageur parle juste assez italien ; 4) un élève triche sans être sanctionné. Puis invente une phrase avec “get my keys back” et explique pourquoi l’objet change le sens de get back.`,
    'eng-paraphrase-clarify':`Joue une réparation de conversation en trois étapes. D’abord, demande la signification précise d’un mot avec “What do you mean by…?”. Ensuite, propose ton hypothèse avec “Do you mean…?”. Enfin, résume la décision avec “So, if I understand correctly…”. Les trois phrases ne sont pas interchangeables : note ce que chacune demande à l’interlocuteur.`,
    'eng-connectors-concession':`Transforme “Although she was tired, she finished the report” en une phrase avec despite sans conserver une proposition complète : “Despite being tired…” ou “Despite her tiredness…”. Fais ensuite l’inverse. Ajoute une phrase avec whereas pour comparer deux méthodes et une nouvelle phrase avec however pour corriger l’idée précédente. Le défi est grammatical autant que logique.`,
    'eng-implicit-understatement':`Classe “That’s not ideal” sur une échelle de gravité dans trois contextes : café servi froid, train raté, sauvegarde d’un serveur détruite. Reformule à chaque fois ce que le locuteur pourrait dire s’il choisissait une formulation totalement directe. Puis repère ce qui, dans la scène ou dans la réaction attendue, empêche de traduire mécaniquement la même intensité.`,

    'philo-argument-thesis-objection':`Prends la thèse “Les réseaux sociaux diminuent notre liberté”. Écris une raison qui la soutient, puis construis la meilleure objection possible : pas un exemple hors sujet, mais un cas où les réseaux augmentent réellement une capacité d’agir. Réécris enfin la thèse pour qu’elle résiste mieux à l’objection. Tu dois pouvoir pointer séparément la conclusion, la prémisse et la concession ajoutée.`,
    'philo-fact-opinion-value':`Classe ces trois phrases : “Le train est arrivé avec 18 minutes de retard”, “Ce retard est inacceptable”, “Le service est mauvais”. Indique lesquelles peuvent être vérifiées directement, lesquelles dépendent d’un critère de valeur et laquelle mélange peut-être les deux. Puis précise quel fait supplémentaire et quel principe rendraient le dernier jugement mieux argumenté.`,
    'philo-socrates-questioning':`Essaie de définir le courage sans utiliser seulement des exemples. Propose un critère, puis teste-le avec trois cas : un pompier qui prend un risque calculé, quelqu’un qui cherche volontairement un danger inutile et une personne qui avoue une faute malgré la peur. Si ton critère accepte trop de cas ou en exclut un bon, corrige-le comme dans un dialogue socratique.`,
    'philo-stoic-control':`Ton train est supprimé avant un rendez-vous important. Classe ce qui dépend de toi, ce qui dépend seulement en partie de toi et ce qui n’en dépend pas : suppression, ton irritation initiale, appel au client, recherche d’un autre trajet, jugement “ma journée est ruinée”. L’exercice consiste à ne pas confondre influence et contrôle total.`,
    'philo-descartes-doubt':`Choisis trois croyances ordinaires : “je vois correctement l’heure”, “je me souviens du code”, “2 + 3 = 5”. Pour chacune, imagine la raison de doute la plus forte autorisée par la méthode cartésienne. Indique ensuite ce que le doute montre réellement : une croyance peut être contestable sans être fausse. Le but est de comprendre la fonction du doute, non de cultiver le scepticisme permanent.`,
    'philo-hume-causality':`Une personne boit du café les jours où elle a mal à la tête. Donne trois modèles causaux compatibles avec cette corrélation : café → douleur, douleur → café, troisième facteur → les deux. Pour chaque modèle, propose une observation qui permettrait de les départager. L’exercice matérialise la différence entre succession observée et lien causal établi.`,
    'philo-ethics-principles-consequences':`Tu as promis de garder un secret, mais ce secret expose une autre personne à un dommage sérieux. Analyse le cas avec deux questions séparées : quelles conséquences prévisibles de parler ou se taire ? quelle obligation la promesse crée-t-elle et quelles limites peut-elle avoir ? Formule ensuite le désaccord possible sans caricaturer l’un des deux raisonnements.`,
    'philo-social-contract-liberty':`Une résidence adopte une règle commune limitant le bruit après 23 h. Explique d’abord en quoi la règle réduit une liberté immédiate, puis en quoi elle peut rendre possible une liberté plus égale pour les autres habitants. Imagine enfin une version arbitraire de la règle et donne le critère qui ferait perdre sa légitimité à la contrainte.`,
    'philo-argument-validity':`Teste ce raisonnement : “Tous les animaux capables de voler sont des oiseaux ; les chauves-souris volent ; donc les chauves-souris sont des oiseaux.” La conclusion est fausse, mais demande-toi d’abord si la forme de l’argument transmettrait la conclusion si les prémisses étaient vraies. Corrige ensuite la prémisse factuelle sans confondre validité logique et vérité.`,
    'philo-distinction-necessary-sufficient':`Pour accéder à un compte, imaginons qu’un mot de passe correct soit nécessaire mais qu’une validation à deux facteurs soit également requise. Le mot de passe est-il suffisant ? Puis imagine une condition qui serait suffisante sans être nécessaire. Dessine mentalement les flèches “A implique B” et “sans B, pas de A” : si elles sont inversées, la distinction est perdue.`,
    'philo-socrates-definition':`Propose une définition de “jeu” ou de “courage” qui soit autre chose qu’une liste d’exemples. Cherche ensuite un cas qui satisfait tes critères mais que tu ne voudrais pas appeler ainsi, puis un cas que ta définition exclut à tort. Le contre-exemple doit forcer une modification du critère, pas simplement ajouter une exception arbitraire.`,
    'philo-stoic-impressions':`Tu reçois un e-mail très bref : “We need to talk.” Note la première impression qui surgit, puis le jugement que tu serais tenté d’y ajouter (“j’ai fait quelque chose de grave”). Sépare enfin ce qui est donné de ce à quoi tu consens. Imagine une réponse qui permet de vérifier la situation avant de transformer l’impression en certitude.`,
    'philo-descartes-cogito':`Dresse deux colonnes : “établi par le cogito” et “pas encore établi”. Place-y existence du sujet pensant au moment de la pensée, fiabilité de tous les souvenirs, existence précise du monde extérieur et vérité de chaque perception. Justifie chaque placement. Le défi est de ne pas faire dire à une certitude locale plus qu’elle ne démontre.`,
    'philo-hume-induction':`Une entreprise teste 200 batteries d’un nouveau lot sans panne et conclut que les 20 000 restantes fonctionneront. Explique pourquoi la conclusion est raisonnable sans être logiquement nécessaire. Donne ensuite une information qui augmenterait fortement la confiance et une autre qui la ferait chuter. Tu dois distinguer force probabiliste et démonstration.`,
    'philo-ethics-frameworks':`Tu trouves un portefeuille contenant de l’argent et une adresse. Analyse exactement le même cas sous trois angles : conséquences de chaque action, devoirs ou droits en jeu, caractère et jugement pratique d’une personne honnête. Note ensuite un point où deux cadres pourraient recommander la même action pour des raisons différentes.`,
    'philo-social-contract-comparison':`Une copropriété veut imposer un badge nocturne après plusieurs intrusions. Formule une question inspirée de Hobbes sur la sécurité, une question inspirée de Locke sur les droits et limites du pouvoir, puis une question inspirée de Rousseau sur la règle commune à laquelle chacun peut se reconnaître comme participant. Compare les problèmes avant de comparer les auteurs.`
  };

  let bespokePractice=0;
  Object.entries(practice).forEach(([id,text])=>{
    const pack=packs[id]; if(!pack||!Array.isArray(pack.complete))return;
    pack.complete=pack.complete.filter(block=>{
      const title=fold(block?.title||'');
      return !(block?.editorialAddition==='rc32-unique-practice'||title.includes('entrainement actif')||title.includes('mise a l epreuve'));
    });
    pack.complete.push({title:'Atelier — tester la compréhension',text,editorialAddition:'rc33-bespoke-practice'});
    bespokePractice++;
  });

  // 3) Réparation des explications : une bonne réponse n'est pas une explication.
  // Pour les cas faibles/génériques, on rattache la correction au passage le plus pertinent du cours.
  const genericWhy=["c'est le repere precis a retenir pour cette question","cette precision permet de distinguer la bonne reponse des raccourcis proposes","prends le mecanisme de","fabrique trois variantes"];
  const bestSupport=(pack,q)=>{
    const answer=clean(q?.a??q?.answer??q?.correct??'');
    const target=`${q?.q||''} ${answer}`;
    const aTokens=new Set(tokens(answer));
    let best={score:0,text:''};
    for(const block of pack?.complete||[]) for(const sentence of sentences(block?.text||'')){
      const S=new Set(tokens(sentence)); let score=0;
      for(const t of tokens(target)) if(S.has(t)) score+=aTokens.has(t)?4:1;
      if(score>best.score&&wordsSafe(sentence)>=7)best={score,text:ensurePeriod(sentence)};
    }
    return best.text;
  };
  function wordsSafe(v){return clean(v).split(/\s+/).filter(Boolean).length;}
  let quizRepairs=0;
  Object.values(packs).forEach(pack=>{
    (pack?.quiz||[]).forEach(q=>{
      if(!q||typeof q!=='object')return;
      const answer=ensurePeriod(q.a??q.answer??q.correct??'');
      const current=clean(q.why||q.explanation||'');
      const currentNorm=norm(current); const aSet=tokenSet(answer), wSet=tokenSet(current); let shared=0; aSet.forEach(t=>{if(wSet.has(t))shared++;});
      const broken=((current.match(/"/g)||[]).length%2===1)||((current.match(/“/g)||[]).length!==((current.match(/”/g)||[]).length));
      const generic=genericWhy.some(x=>currentNorm.includes(x));
      const thin=norm(answer)&&currentNorm.startsWith(norm(answer))&&wordsSafe(current)<=wordsSafe(answer)+8;
      const unsupported=aSet.size>=2&&shared===0;
      if(!(broken||generic||thin||unsupported))return;
      const support=bestSupport(pack,q);
      let next='';
      if(support&&norm(support)!==norm(answer)) next=wordsSafe(answer)<=2?`${answer} ${support}`:`${answer} ${support}`;
      else next=answer||current;
      next=clean(next).replace(/\.\s*\./g,'.');
      if(next){q.why=next;q.explanation=next;q.editorialWhyRC33='support-linked';quizRepairs++;}
    });
  });

  // Corrections manuelles lorsque le bon support exige une nuance que l'appariement lexical ne suffit pas à garantir.
  const whyOverrides={
    'eng-false-friends-core':{
      0:'Dans « Actually, I live in Lyon », actually corrige ou précise l’énoncé : la traduction naturelle est « en fait », alors que currently exprimerait « actuellement ».'
    },
    'eng-connectors-logic':{
      0:'Although est une conjonction suivie d’une proposition : « Although it was raining, we went out. » La structure exprime une concession entre la pluie et la décision de sortir.'
    },
    'eng-context-reference':{
      4:'Dans « I’ll take the blue one », one remplace un nom comptable singulier déjà identifiable dans le contexte ; on choisit donc l’objet bleu sans répéter son nom.'
    },
    'eng-context-inference':{
      2:'But signale une opposition : « It was expensive, but worth it. » La seconde partie corrige l’attente créée par la première.',
      3:'Il faut vérifier un mot lorsqu’une hypothèse contextuelle ne suffit plus : s’il change l’action à effectuer, bloque le sens général ou revient souvent, l’incertitude devient importante.',
      4:'Commencer par la scène permet de construire une hypothèse globale ; la vérification vient ensuite pour confirmer ou corriger ce sens provisoire.'
    },
    'eng-phrasal-get':{
      0:'Sans complément placé entre get et back, « I got back at midnight » décrit ici un retour : la personne est rentrée à minuit.',
      1:'Dans « I got my money back », l’objet my money est ce qui est récupéré : la phrase signifie que l’argent est revenu à son propriétaire.',
      2:'Get over + difficulté ou maladie décrit le fait de s’en remettre : elle est en train de récupérer après la grippe.',
      3:'Get by signifie disposer de juste assez pour fonctionner : ici, un anglais basique permet de se débrouiller sans impliquer une maîtrise complète.',
      4:'Get away with + faute signifie échapper à la conséquence ou à la sanction attendue ; il a donc triché sans être puni.'
    },
    'eng-paraphrase-clarify':{
      0:'« What do you mean by reliable? » isole précisément le mot qui bloque et demande à l’interlocuteur de l’expliquer ou de le reformuler.',
      1:'« Do you mean…? » ne demande pas une explication générale : la formule propose une interprétation que l’autre peut confirmer ou corriger.',
      4:'La fluidité inclut la réparation : un locuteur autonome sait signaler le problème, reformuler ou demander une précision puis reprendre le fil de l’échange.'
    },
    'eng-register-email-directness':{
      0:'« Could you send me the file? » transforme l’ordre direct en demande et laisse davantage de place à l’interlocuteur, ce qui la rend généralement moins abrupte.',
      1:'Donner une raison réelle à l’échéance rend la contrainte intelligible : le destinataire comprend pourquoi l’heure demandée compte au lieu de recevoir un délai arbitraire.'
    },
    'eng-connectors-concession':{
      0:'Although introduit une proposition avec sujet et verbe : « Although it was raining, we went out. »',
      1:'Despite prend ici un groupe nominal : « Despite the rain, we went out. » Il peut aussi être suivi d’une forme en -ing, par exemple « despite being tired », mais pas de *despite it was raining*.',
      2:'Whereas met deux propositions en contraste comparatif : il sert à opposer deux situations ou propriétés sur le même plan.'
    },
    'eng-implicit-understatement':{
      0:'Après une panne majeure, « That’s not ideal » peut volontairement sous-évaluer verbalement un problème grave : c’est précisément le mécanisme de l’understatement.',
      1:'Perhaps peut fonctionner comme hedge parce qu’il réduit l’engagement catégorique de l’énoncé ; selon le contexte, cette prudence peut être réelle ou relationnelle.',
      3:'L’action qui suit aide à calibrer la force réelle des mots : annuler un projet ou appeler un responsable peut révéler qu’un désaccord formulé doucement est en réalité sérieux.'
    },
    'astro-ocean-moons':{
      0:'Les déformations de marée dissipent de l’énergie à l’intérieur de la lune : cette chaleur peut maintenir de l’eau liquide même très loin du Soleil.',
      1:'Encelade, lune de Saturne, projette depuis son pôle sud des panaches contenant des matériaux issus de son océan interne.',
      2:'Les panaches donnent accès à des grains et des gaz provenant de l’océan : une sonde peut les échantillonner sans traverser plusieurs kilomètres de glace.',
      3:'Titan est le monde cité ici pour ses lacs d’hydrocarbures en surface ; Europe et Encelade sont surtout étudiées pour leurs océans sous la glace.',
      4:'Un océan, une source d’énergie et une chimie intéressante définissent une habitabilité possible ; ils ne constituent pas une détection de vie.'
    },
    'astro-exoplanet-detection':{
      0:'Un transit est une baisse répétée de la lumière stellaire lorsque la planète passe devant son étoile depuis notre ligne de visée.',
      1:'Un transit n’est visible que si le plan orbital est suffisamment aligné avec notre ligne de visée ; de nombreuses planètes existent donc sans transiter depuis la Terre.',
      2:'La vitesse radiale mesure le petit va-et-vient de l’étoile autour du centre de masse du système grâce au décalage Doppler de ses raies spectrales.',
      3:'Le transit contraint le rayon et, lorsque l’inclinaison est connue, la vitesse radiale fournit la masse ; les deux permettent alors d’estimer la densité moyenne.',
      4:'Les grosses planètes proches produisent des transits plus profonds et des signaux dynamiques plus forts, souvent répétés sur des périodes courtes : elles étaient donc plus faciles à détecter.'
    },
    'astro-sun-structure':{
      0:'L’énergie du Soleil est produite principalement dans son cœur, où la température et la pression permettent la fusion de noyaux d’hydrogène.',
      1:'La photosphère est la couche visible d’où la plupart des photons que nous recevons s’échappent efficacement ; ce n’est pas une surface solide.',
      2:'Dans la zone convective, des mouvements de plasma transportent l’énergie vers l’extérieur : la matière chaude monte tandis que la matière plus froide redescend.',
      3:'La couronne atteint des températures bien supérieures à celles de la photosphère ; comprendre ce chauffage magnétique reste un problème important de physique solaire.'
    },
    'lit-poetry-modernity':{
      0:'Les Fleurs du mal paraissent en 1857 ; le procès de la même année conduit à la condamnation de six poèmes, repère important de la réception de Baudelaire.',
      3:'Dans un calligramme, la disposition des mots participe au sens et au parcours du regard : l’espace de la page devient une composante du poème.'
    },
    'sci-radioactivity-atom':{
      0:'Becquerel constate qu’un composé d’uranium impressionne une plaque photographique protégée même sans exposition préalable au Soleil : l’émission est spontanée.',
      4:'Pour une source externe, réduire le temps d’exposition, augmenter la distance et choisir un écran adapté diminuent la dose reçue ; la contamination interne demande en plus d’éviter l’incorporation du radionucléide.'
    },
    'cinema-early-lumiere-melies':{
      1:'Les vues Lumière privilégient souvent des scènes brèves de la vie, du travail, des déplacements ou des foules ; ce choix n’empêche pas cadrage, répétition et organisation du réel.',
      4:'Dès les premières années, le cinéma peut enregistrer le monde comme le transformer par la mise en scène et le trucage : ces deux possibilités se développent ensemble.'
    },
    'philo-social-contract-comparison':{
      3:'Comparer Hobbes, Locke et Rousseau par problème fait apparaître des justifications différentes de l’ordre politique : sécurité, protection des droits et autonomie collective ne répondent pas exactement à la même question.'
    },
    'philo-distinction-necessary-sufficient':{
      3:'Une condition nécessaire doit être présente sans garantir à elle seule le résultat ; une condition suffisante garantit le résultat dans le cadre défini sans être forcément la seule voie possible.'
    },
    'philo-fact-opinion-value':{
      0:'Un fait est une proposition dont on peut examiner la vérité à partir d’observations, de documents ou de mesures ; cela ne signifie pas que toute affirmation factuelle soit automatiquement vraie.'
    },
    'philo-stoic-impressions':{
      3:'Non. Le stoïcisme ne demande pas de supprimer toute réaction affective : il distingue l’impression initiale du jugement auquel nous donnons ensuite notre assentiment.'
    },
    'eco-externalities-public-goods-policy':{
      1:'Un bien public pur combine non-rivalité et non-exclusion : l’usage par une personne ne réduit pas celui des autres et il est difficile d’écarter les non-payeurs.'
    },
    'medieval-west-charlemagne-carolingians':{
      0:'Charlemagne appartient à la dynastie carolingienne, qui remplace les Mérovingiens après la montée en puissance des maires du palais francs.'
    }
  };
  let manualWhy=0;
  Object.entries(whyOverrides).forEach(([id,map])=>Object.entries(map).forEach(([index,text])=>{
    const q=packs?.[id]?.quiz?.[Number(index)]; if(!q)return; q.why=text;q.explanation=text;q.editorialWhyRC33='manual';manualWhy++;
  }));

  // 4) Mystères : retirer toute solution donnée gratuitement et réparer les textes corrompus.
  const mysteryPatch={
    'science-mystery-natural-selection-177':{prompt:'Dans une population variable, certains caractères héréditaires permettent à leurs porteurs de laisser davantage de descendants. Au fil des générations, ces caractères deviennent plus fréquents sans qu’aucun organisme ait prévu le résultat.'},
    'astro-mystery-orbit-186':{prompt:'Je suis une chute libre courbe : la gravitation m’attire, mais une vitesse tangentielle suffisante fait continuellement manquer la surface. Atteindre l’espace ne suffit pas à suivre durablement cette trajectoire.'},
    'literature-mystery-windmills-232':{prompt:'Un lecteur passionné renomme son cheval, choisit une dame idéale et prend des moulins pour des géants. Le comique naît du choc entre les codes des romans de chevalerie et le monde ordinaire qu’il traverse.'},
    'literature-mystery-press-232':{prompt:'Des caractères métalliques mobiles sont assemblés, encrés puis pressés sur du papier. Les exemplaires deviennent plus nombreux et plus comparables, changeant l’échelle de circulation des textes au moment où les humanistes relisent et discutent les œuvres anciennes.'},
    'literature-mystery-three-unities-232':{prompt:'Des critiques du théâtre français classique valorisent une intrigue principale, une durée resserrée et un espace stable afin d’accroître concentration et vraisemblance. Ces prescriptions ne résument pourtant pas toute la création dramatique du XVIIe siècle.'},
    'cinema-mystery-documentary-233':{prompt:'Il travaille avec des personnes, des lieux, des archives ou des événements du monde réel, mais cadre, coupe, ordonne les sources et construit toujours un point de vue. Son rapport au réel n’abolit donc ni mise en scène ni responsabilité.'},
    'history-mystery-meiji-234':{prompt:'À partir de 1868, l’empereur retrouve une place politique centrale tandis que les domaines féodaux sont abolis. Centralisation, conscription, école et industrialisation transforment rapidement l’État japonais sans partir d’un pays jusque-là immobile.'},
    'art-mystery-linear-perspective-235':{prompt:'Sur une surface plane, des lignes supposées parallèles sont construites de façon à sembler converger vers un même point de l’horizon. Ce dispositif organise géométriquement la profondeur plutôt qu’il ne copie automatiquement la vision.'},
    'economy-mystery-inflation-235':{prompt:'Un indice pondéré indique qu’un ensemble large de biens et services devient durablement plus cher, même si certains prix particuliers peuvent encore baisser. Il s’agit donc d’un mouvement général du niveau des prix, pas du renchérissement isolé d’un produit.',clues:['Elle se mesure notamment à partir d’un panier de consommation.','Elle peut être alimentée par la demande, les coûts, les importations ou les anticipations.','Quand son rythme ralentit tout en restant positif, on parle de désinflation. Dernier coup de pouce : le nom attendu ressemble à « infl… ».']},
    'history-mystery-industrial-revolution-236':{prompt:'Usines, machines à vapeur, charbon et chemins de fer se renforcent tandis que les villes grandissent et qu’un nouveau monde ouvrier apparaît. Le phénomène désigne une transformation durable de l’énergie, de la production et des rapports sociaux, pas l’invention d’une seule machine.'},
    'history-mystery-cold-war-236':{prompt:'Deux superpuissances accumulent les armes nucléaires, structurent des alliances rivales et s’affrontent par crises, propagande et guerres locales, tout en évitant un conflit militaire direct entre elles. Berlin et Cuba deviennent des lieux emblématiques de cette confrontation.'},
    'astronomy-mystery-apollo11-236':{prompt:'Une mission américaine dépose deux astronautes dans la mer de la Tranquillité pendant qu’un troisième reste en orbite autour de la Lune. Elle constitue l’aboutissement spectaculaire d’une compétition technologique et politique, pas une marche inévitable vers le satellite.'},
    'literature-mystery-science-fiction-236':{prompt:'Une invention, une planète ou une transformation sociale sert à construire un monde cohérent qui interroge progrès, pouvoir et définition de l’humain. Le genre vaut moins par la prédiction de gadgets que par les conséquences qu’il tire de ses hypothèses.'},
    'mystery-1789-rc39':{clues:['Le cadre est la France de la fin du XVIIIe siècle, avec une monarchie en crise.','États généraux, Assemblée nationale et serment du Jeu de paume en sont des étapes.','Droits, souveraineté nationale et abolition des privilèges donnent la clé. Dernier coup de pouce : le nom attendu ressemble à « revo… fran… ».']},
    'mystery-russian-revolution-rc39':{clues:['Le cadre est un empire européen et asiatique en crise pendant la Première Guerre mondiale.','Février 1917, Petrograd, soviets et gouvernement provisoire sont des repères centraux.','Le parti bolchevik saisit l’occasion après l’effondrement de l’autorité monarchique. Dernier coup de pouce : le nom attendu ressemble à « revo… ru… ».']},
    'geography-mystery-coordinates-122':{clues:['La première valeur mesure une position au nord ou au sud de l’équateur.','La seconde mesure une position à l’est ou à l’ouest du méridien de Greenwich.','Latitude et longitude forment ensemble ce système de repérage. Dernier coup de pouce : le nom attendu ressemble à « coor… geog… ».']},
    'music-mystery-sampling-177':{clues:['La technique devient centrale avec les sampleurs numériques et le hip-hop.','Le fragment peut être une batterie, une basse, une voix ou un bruit.','Son usage soulève des questions de transformation créative, d’autorisation et de rémunération. Dernier coup de pouce : le nom attendu ressemble à « sam… ».']},
    'science-mystery-induction-235':{clues:['Faraday la met expérimentalement en évidence au XIXe siècle.','Elle fonde le fonctionnement des générateurs électriques.','La loi de Lenz précise le sens du courant créé. Dernier coup de pouce : le nom attendu ressemble à « indu… elec… ».']},
    'science-mystery-quantum-236':{clues:['Planck introduit cette idée pour décrire les échanges d’énergie.','Son nom latin signifie une quantité ou une portion.','Einstein l’applique à la lumière avec les photons. Dernier coup de pouce : le nom attendu ressemble à « qua… ene… ».']}
  };
  let mysteriesFixed=0;
  mysteries.forEach(m=>{
    const patch=mysteryPatch[m?.id]; if(!patch)return;
    Object.assign(m,patch,{editorialMysteryRevisionRC33:'deep-review'}); mysteriesFixed++;
  });

  // 5) Quelques corrections factuelles/linguistiques ciblées issues de la relecture.
  const concession=packs['eng-connectors-concession'];
  if(concession?.complete){
    concession.complete.forEach(block=>{if(block?.text)block.text=block.text.replace(/Despite introduit plutôt un nom ou -ing : “Despite the rain \/ Despite raining…”\./g,'Despite introduit un groupe nominal ou une forme en -ing : “Despite the rain” ou “Despite being tired”.');});
  }
  const exo=packs['astro-exoplanet-detection'];
  if(exo?.complete?.[4]) exo.complete[4].text='Un transit donne surtout le rayon relatif de la planète. La vitesse radiale mesure l’amplitude du mouvement de l’étoile et fournit M × sin(i) : sans connaître l’inclinaison, il s’agit donc d’une masse minimale. Lorsqu’un transit fixe une orbite presque vue par la tranche, on peut déterminer la masse beaucoup plus précisément ; rayon et masse donnent alors la densité moyenne. Plusieurs compositions internes peuvent néanmoins partager une densité voisine, et l’activité de l’étoile peut contaminer les signaux.';

  // 6) Transfert : au moins une question de mise en situation dans les derniers cours encore trop centrés sur la reconnaissance.
  const reasoningQuizPatch={
    'medieval-west-charlemagne-carolingians':{
      index:3,
      q:'Dans quel cas les missi dominici sont-ils particulièrement utiles à Charlemagne ?',
      a:'Quand il veut vérifier qu’un responsable local applique bien les décisions impériales loin de la cour.',
      choices:['Quand il faut élire un nouvel empereur par vote populaire.','Quand un monastère cherche uniquement à recopier des manuscrits.','Quand le pape veut administrer directement tous les comtés de l’Empire.'],
      why:'L’empire est vaste et l’autorité centrale dépend de relais locaux. Envoyer des missi dominici permet de transmettre des ordres, d’entendre des plaintes et de contrôler certains agents du pouvoir : l’institution répond donc à un problème concret de gouvernement à distance.'
    },
    'philo-argument-thesis-objection':{
      index:3,
      q:'Dans quel cas une objection améliore-t-elle réellement une thèse ?',
      a:'Quand elle révèle un cas que la thèse expliquait mal et conduit à la préciser sans esquiver le problème.',
      choices:['Quand elle permet de ridiculiser une version plus faible de la thèse adverse.','Quand elle remplace les raisons par une opinion plus ferme.','Quand elle pousse à changer de sujet pour éviter le contre-exemple.'],
      why:'Une bonne objection met à l’épreuve le lien entre raisons et conclusion. Si elle oblige à distinguer, limiter ou reformuler la thèse tout en répondant au problème initial, elle rend le raisonnement plus précis plutôt que de simplement le fragiliser.'
    },
    'philo-stoic-control':{
      index:3,
      q:'Dans quel cas le raisonnement stoïcien est-il le mieux appliqué ?',
      a:'Ton train est annulé : tu cherches un autre trajet et préviens les personnes concernées, sans prétendre maîtriser l’heure réelle d’arrivée.',
      choices:['Ton train est annulé : tu ne fais rien puisque l’annulation ne dépend pas de toi.','Tu exiges que le réseau garantisse le résultat exact de ton déplacement avant d’agir.','Tu considères que toute contrariété extérieure doit être ignorée, même lorsqu’une action utile reste possible.'],
      why:'Le stoïcisme ne confond pas absence de contrôle total et passivité. Ici, l’annulation et le résultat final échappent en partie à ta maîtrise, mais chercher une solution, prévenir et décider de ta conduite relèvent encore de ton action.'
    },
    'philo-hume-causality':{
      index:3,
      q:'Pourquoi une corrélation répétée entre deux événements ne suffit-elle pas, à elle seule, à établir une cause selon l’analyse de Hume ?',
      a:'Parce que la répétition crée une attente, mais ne donne pas directement accès à une nécessité invisible reliant les deux événements.',
      choices:['Parce qu’aucune régularité observée ne peut jamais être utile.','Parce qu’une cause doit obligatoirement être visible à l’œil nu.','Parce qu’une seule observation suffit déjà à démontrer logiquement la causalité.'],
      why:'Hume distingue la régularité que nous observons de la nécessité que nous attribuons à la relation causale. Des répétitions peuvent justifier une attente pratique très forte sans transformer cette attente en démonstration logique d’un lien nécessaire.'
    },
    'philo-social-contract-liberty':{
      index:3,
      q:'Dans quel cas une règle commune peut-elle le mieux illustrer l’idée rousseauiste d’une liberté compatible avec la loi ?',
      a:'Quand les citoyens participent comme égaux à une règle générale qui s’applique à tous plutôt qu’à l’ordre particulier d’un maître.',
      choices:['Quand un dirigeant impose une règle privée qu’il n’a pas à respecter lui-même.','Quand chacun est libre d’ignorer toute règle dès qu’elle le contraint.','Quand une majorité peut retirer arbitrairement tout droit à une minorité sans justification commune.'],
      why:'Chez Rousseau, l’enjeu n’est pas l’absence de toute contrainte. Une loi peut être compatible avec la liberté politique si elle exprime une volonté véritablement générale et si le citoyen n’obéit pas simplement à la volonté particulière d’un autre.'
    },
    'eng-context-inference':{
      index:3,
      q:'Comment peux-tu comprendre “slippery” dans “The pavement was slippery, so Maya slowed down and held the railing” sans dictionnaire ?',
      a:'Les conséquences montrent que le sol risque de faire glisser : “slippery” décrit donc une surface glissante.',
      choices:['Le mot doit vouloir dire “bruyant” parce que Maya est dehors.','Le mot doit vouloir dire “rapide” parce que Maya ralentit.','Il suffit de traduire séparément les lettres ou les syllabes du mot.'],
      why:'L’inférence s’appuie sur les indices de la scène : ralentir et tenir la rampe sont des réactions cohérentes avec un risque de glissade. On formule donc un sens provisoire à partir du contexte avant de le vérifier si nécessaire.'
    },
    'eng-polite-register':{
      index:3,
      q:'Dans quel cas “Could you send me the revised file by 3 p.m., please?” est-il mieux calibré que “Send it by 3.” ?',
      a:'Quand tu demandes un service à un collègue ou à un client et veux rester clair sans sonner comme un ordre sec.',
      choices:['Quand tu veux volontairement provoquer l’interlocuteur.','Quand tu écris une note privée qui ne sera lue par personne.','Quand ton objectif est de supprimer toute indication d’échéance.'],
      why:'Le registre dépend de la relation et de la situation. “Could you…” garde la demande explicite tout en atténuant l’impératif ; l’échéance reste précise, donc la politesse ne se fait pas au prix de la clarté.'
    },
    'eng-phrasal-context':{
      index:3,
      q:'Comment déduire “put off” dans “The meeting was put off because the manager was ill. We’ll meet next Tuesday instead” ?',
      a:'Le second énoncé donne une nouvelle date : “put off” signifie ici reporter.',
      choices:['Le mot “ill” suffit à conclure que “put off” signifie annuler définitivement.','La particule “off” signifie toujours partir, quel que soit le contexte.','Il faut traduire “put” et “off” séparément puis additionner les deux sens.'],
      why:'La scène fournit le résultat de l’action : la réunion n’a pas disparu, elle est déplacée à mardi suivant. C’est cet indice global qui permet d’inférer le sens du phrasal verb, pas une traduction mot à mot.'
    },
    'eng-paraphrase-repair':{
      index:3,
      q:'Comment réparer au mieux la phrase si le mot “screwdriver” te manque pendant une conversation ?',
      a:'Dire “the tool you use to turn a screw” puis demander “What do you call it?”',
      choices:['Répéter “screw… screw…” jusqu’à ce que l’autre devine.','Passer immédiatement au français sans essayer de décrire l’objet.','Inventer “screw-machine” et continuer comme si le mot existait.'],
      why:'Une bonne stratégie de réparation combine des mots disponibles — catégorie ou fonction — puis une demande ciblée. Elle maintient la conversation en anglais et transforme le trou lexical en occasion d’obtenir le mot précis.'
    },
    'eng-phrasal-get':{
      index:3,
      q:'Dans quel cas “get by” convient-il le mieux ?',
      a:'Tu n’as pas beaucoup d’argent ce mois-ci, mais tu en as assez pour payer l’essentiel : “I can get by.”',
      choices:['Tu guéris progressivement d’une grippe : “I can get by the flu.”','Tu reviens chez toi à minuit : “I get by at midnight.”','Tu triches sans être puni : “I get by with cheating.”'],
      why:'Get by décrit le fait de disposer de juste assez pour fonctionner ou se débrouiller. Les autres scènes appellent d’autres constructions avec get : get over, get back et get away with.'
    },
    'eng-paraphrase-clarify':{
      index:3,
      q:'Comment réagir si quelqu’un dit “I’ll send it later” mais que tu dois savoir s’il parle de cet après-midi ou de demain ?',
      a:'Demander “Do you mean later today or tomorrow?” pour proposer deux interprétations précises.',
      choices:['Répondre “OK” puis supposer silencieusement qu’il parle de demain.','Demander la traduction française de toute la phrase.','Répéter exactement “later” plus fort sans préciser le point ambigu.'],
      why:'La clarification efficace identifie le morceau incertain et propose une vérification ciblée. “Do you mean…?” permet à l’autre de confirmer ou de corriger ton interprétation sans interrompre inutilement l’échange.'
    },
    'philo-argument-validity':{
      index:3,
      q:'Dans quel cas l’argument suivant est-il valide même si sa conclusion est factuellement fausse : « Tous les poissons sont des mammifères ; tous les mammifères respirent de l’air ; donc tous les poissons respirent de l’air » ?',
      a:'Il est valide si la conclusion découle nécessairement des prémisses supposées vraies, même lorsque l’une de ces prémisses est en réalité fausse.',
      choices:['Il est invalide dès qu’une prémisse est factuellement fausse.','Il est valide uniquement parce que la conclusion contient des mots présents dans les prémisses.','Il est solide puisque validité et vérité des prémisses sont la même propriété.'],
      why:'La validité porte sur la structure du raisonnement : on demande ce qui suivrait si les prémisses étaient vraies. La solidité ajoute une autre exigence, celle de prémisses effectivement vraies ou bien établies.'
    },
    'cinema-montage-continuity-collision':{
      index:3,
      q:'Comment interpréter un montage qui coupe d’un visage impassible à une assiette vide, puis revient au même visage ?',
      a:'Le plan voisin peut conduire le spectateur à attribuer au visage une émotion ou une intention que le visage seul ne fixait pas.',
      choices:['Le visage acquiert forcément le même sens dans n’importe quelle succession de plans.','La coupe prouve que les deux plans ont été tournés exactement au même moment.','Le montage ne peut produire qu’une continuité spatiale et jamais une association d’idées.'],
      why:'Le sens d’un plan dépend aussi de ce qui le précède et le suit. Une juxtaposition peut orienter l’interprétation d’une expression neutre : c’est précisément l’un des enseignements associés à l’effet Koulechov et au montage comme relation entre plans.'
    }
  };
  let reasoningQuizUpgrades=0;
  Object.entries(reasoningQuizPatch).forEach(([id,patch])=>{
    const q=packs?.[id]?.quiz?.[patch.index]; if(!q)return;
    q.q=patch.q;q.a=patch.a;q.answer=patch.a;q.choices=patch.choices;q.why=patch.why;q.explanation=patch.why;q.editorialReasoningRC33='scenario-transfer';
    reasoningQuizUpgrades++;
  });

  // 7) QCM : corriger les séries où les trois mauvaises réponses se repéraient surtout par des formulations caricaturales.
  const distractorUpgrades={
  "prehistory-hominids#1": [
    "Oui, car libérer les mains entraîne à lui seul l’apparition du langage symbolique.",
    "Non, car la bipédie n’apparaît qu’après les premiers outils complexes.",
    "Oui, car langage, technique et bipédie découlent du même changement anatomique au même moment."
  ],
  "prehistory-fire#3": [
    "Parce qu’un foyer domestique ne laisse normalement aucune modification durable des os ou des pierres.",
    "Parce que la présence de charbon suffit à identifier une cuisson alimentaire, mais pas l’auteur du feu.",
    "Parce que les traces de combustion connues apparaissent seulement après les premières sociétés agricoles."
  ],
  "civilizations-fertile-crescent#3": [
    "Parce qu’un même environnement conduit généralement les sociétés à adopter une organisation politique comparable.",
    "Parce que les techniques humaines finissent par neutraliser les contraintes du climat et du relief.",
    "Parce que la géographie influence surtout l’agriculture, beaucoup moins les échanges, les conflits ou le pouvoir."
  ],
  "egypt-connected#3": [
    "Les emprunts montrent surtout qu’une société abandonne ses traditions lorsqu’elle échange beaucoup.",
    "Les objets importés indiquent que les artisans locaux cessent de produire les formes correspondantes.",
    "Une influence artistique venue d’ailleurs constitue en elle-même la preuve d’une domination politique directe."
  ],
  "rome-italy-expansion#2": [
    "Accorder rapidement un statut politique identique à toutes les communautés vaincues pour les assimiler.",
    "Maintenir les autonomies locales sans demander de soldats, de ressources ni de fidélité à Rome.",
    "Remplacer partout les institutions locales par une administration romaine uniforme dirigée depuis la ville."
  ],
  "rome-republic-crisis#2": [
    "Parce que leur professionnalisation place juridiquement le Sénat sous l’autorité de chaque commandant d’armée.",
    "Parce qu’une armée liée à un général abolit à elle seule les magistratures républicaines avant tout conflit politique.",
    "Parce que ces armées sont composées principalement de combattants étrangers sans lien avec les citoyens romains."
  ],
  "northern-viking-worlds-raids-vikings#1": [
    "Parce qu’ils se trouvent surtout près des capitales royales que les Scandinaves cherchent d’abord à conquérir.",
    "Parce qu’ils servent de bases militaires côtières menaçant directement les ports scandinaves.",
    "Parce que leurs bibliothèques constituent la principale richesse recherchée lors des expéditions de pillage."
  ],
  "1789-crisis#0": [
    "Parce que les mauvaises récoltes réduisent à elles seules les recettes de l’État jusqu’à rendre toute réforme fiscale inutile.",
    "Parce que le tiers état avait cessé de payer les principaux impôts plusieurs années avant la réunion des États généraux.",
    "Parce que la dette royale est faible mais que l’administration fiscale, devenue trop centralisée, ne peut plus lever l’impôt."
  ],
  "napoleon-empire#3": [
    "Il unifie le droit privé tout en établissant une égalité juridique comparable entre époux dans la famille.",
    "Il organise surtout le droit commercial et la propriété, en laissant le statut familial aux coutumes locales.",
    "Il restaure dans les campagnes une grande partie des privilèges juridiques supprimés pendant la Révolution."
  ],
  "europe-after-napoleon#0": [
    "Diffuser les institutions républicaines françaises afin d’éviter le retour des guerres dynastiques.",
    "Fragmenter les grandes puissances européennes pour empêcher qu’un équilibre diplomatique puisse se reformer.",
    "Redessiner les frontières principalement selon les nationalités exprimées par les populations concernées."
  ],
  "medieval-west-capetians-monarchy#3": [
    "Il désigne l’ensemble théorique du royaume de France, même lorsque le roi n’en tire ni revenus ni administration directe.",
    "Il sert surtout de symbole dynastique, les ressources de la monarchie venant déjà d’un impôt national régulier.",
    "Il correspond aux terres des grands vassaux, que le roi ne peut administrer mais qu’il peut mobiliser sans négociation."
  ],
  "history-reformations-print-culture#4": [
    "Parce que les rivalités dynastiques finissent par remplacer les convictions confessionnelles comme moteur des mobilisations.",
    "Parce que les alliances suivent une ligne confessionnelle assez stable pour rendre secondaires les intérêts territoriaux.",
    "Parce que ces conflits restent essentiellement locaux et touchent peu la construction des États européens."
  ],
  "history-early-modern-empires-comparison#1": [
    "Parce qu’une frontière tracée permet en général de déduire directement le degré de contrôle exercé par le centre.",
    "Parce que le souverain administre les provinces selon des règles comparables dès qu’elles appartiennent au même empire.",
    "Parce que les intermédiaires locaux jouent un rôle marginal une fois qu’un territoire figure durablement dans l’empire."
  ],
  "history-indian-ocean-monsoon-networks#4": [
    "Parce que les épices suivent surtout un trajet direct entre leur zone de production et leur marché final.",
    "Parce que les mêmes ports dominent les échanges sur toute la période, ce qui stabilise un axe commercial principal.",
    "Parce que la mousson impose aux navires un itinéraire maritime presque unique d’un bout à l’autre de l’océan."
  ],
  "history-cold-war-bipolar-world#3": [
    "Parce que les choix des acteurs locaux sont principalement déterminés par les stratégies de Washington et de Moscou.",
    "Parce que le clivage Est-Ouest suffit à expliquer la chronologie interne des conflits où les superpuissances interviennent.",
    "Parce que nationalismes, décolonisation et conflits sociaux ont un rôle secondaire face à l’appartenance à l’un des deux blocs."
  ],
  "history-decolonization-india-algeria-bandung#4": [
    "Parce que le transfert de souveraineté conserve nécessairement les institutions coloniales dans leur forme initiale.",
    "Parce que l’indépendance politique met fin aux dépendances économiques, mais beaucoup plus lentement aux dépendances culturelles.",
    "Parce que les frontières héritées sont généralement redessinées dès l’indépendance afin de supprimer les héritages coloniaux."
  ],
  "art-renaissance-perspective#0": [
    "Surtout dans les cours bourguignonnes et flamandes, avant que les artistes italiens n’adoptent leurs méthodes.",
    "De manière assez uniforme dans toute l’Europe grâce à la diffusion rapide de modèles imprimés dès le début du mouvement.",
    "Principalement dans les monastères ruraux d’Europe centrale avant d’atteindre les grands centres urbains."
  ],
  "art-islamic-space-calligraphy-pattern#2": [
    "Son importance dépend surtout de la possibilité pour chaque visiteur d’en lire intégralement le texte à hauteur des yeux.",
    "Si le texte est difficile à déchiffrer, la bande calligraphique perd l’essentiel de sa fonction politique ou religieuse.",
    "La calligraphie architecturale sert d’abord à identifier l’artiste, à la manière d’une signature monumentale."
  ],
  "art-islamic-space-calligraphy-pattern#3": [
    "Les motifs reposent sur un gabarit fixe qui se reproduit pratiquement de la même manière quels que soient le support et le lieu.",
    "Le calcul géométrique détermine entièrement le résultat, de sorte que les gestes et les matériaux jouent un rôle secondaire.",
    "Changer l’échelle modifie la taille du motif mais presque pas la manière dont il doit être construit ou raccordé."
  ],
  "art-islamic-space-calligraphy-pattern#4": [
    "Les prescriptions religieuses produisent une absence assez uniforme de figures humaines dans les différents contextes artistiques.",
    "Les images figuratives conservées proviennent surtout d’œuvres importées, plutôt que de productions réalisées dans ces sociétés.",
    "La figuration appartient à l’architecture civile, tandis que les manuscrits et objets de cour l’emploient très peu."
  ],
  "art-renaissance-perspective-workshop#2": [
    "Parce que le maître appose souvent son nom sur des œuvres qu’il ne conçoit pas lui-même.",
    "Parce que le commanditaire fixe généralement chaque choix de composition, laissant peu de décisions au peintre et à l’atelier.",
    "Parce que l’atelier sert surtout à copier des œuvres achevées plutôt qu’à répartir les étapes d’une même production."
  ],
  "art-surrealism-dream-automatism-image#4": [
    "Elle confirme que ces artistes ont surtout documenté le travail des surréalistes masculins plutôt que développé leurs propres recherches.",
    "Elle montre que les femmes entrent véritablement dans le surréalisme seulement après la Seconde Guerre mondiale.",
    "Elle rétablit surtout leur rôle de modèles et de muses, longtemps sous-estimé par les histoires centrées sur les œuvres."
  ],
  "astro-expansion-dark-universe#1": [
    "Parce que cette matière est principalement cachée par de la poussière qui absorbe sa lumière visible.",
    "Parce qu’elle correspond surtout à des étoiles très faibles et à des trous noirs ordinaires trop peu lumineux pour être recensés.",
    "Parce que sa température la conduit à rayonner presque exclusivement dans l’infrarouge plutôt que dans le visible."
  ],
  "astro-stellar-deaths#4": [
    "Parce que l’explosion fabrique à elle seule l’ensemble des éléments lourds présents dans l’Univers.",
    "Parce qu’elle restitue au milieu interstellaire des éléments déjà présents dans l’étoile, sans contribuer à de nouvelles nucléosynthèses.",
    "Parce que le résidu compact retient l’essentiel des éléments lourds et limite ainsi leur dispersion dans le milieu."
  ],
  "astro-rocky-planets#4": [
    "Parce que la distance à l’étoile fixe pratiquement la température de surface, quelle que soit la composition de l’atmosphère.",
    "Parce qu’une planète rocheuse située dans cette zone conserve normalement de l’eau liquide pendant toute son histoire.",
    "Parce qu’un champ magnétique suffisamment intense garantit à lui seul des conditions habitables en surface."
  ],
  "astro-moon-mars-exploration#4": [
    "Oui, car les robots sont préférables dès qu’une mission comporte un délai de communication important.",
    "Oui, car la présence humaine rend les instruments robotiques beaucoup moins utiles scientifiquement.",
    "Non, mais leurs architectures de mission, leurs coûts et leurs risques sont assez semblables pour être interchangeables."
  ],
  "cinema-italian-neorealism#3": [
    "Ils privilégient des intrigues d’évasion construites autour du spectacle de studio et de personnages socialement exceptionnels.",
    "Ils s’intéressent surtout à des milieux favorisés relativement protégés des contraintes économiques de l’après-guerre.",
    "Ils mettent en scène des difficultés sociales mais les résolvent le plus souvent par une conclusion rassurante qui referme le conflit."
  ],
  "cinema-documentary-truth#0": [
    "Parce que la présence de la caméra devient négligeable dès lors que les personnes et événements filmés sont réels.",
    "Parce que l’absence de commentaire en voix off suffit à garantir la neutralité du point de vue documentaire.",
    "Parce que des images enregistrées sur le vif possèdent un sens assez stable, indépendamment du cadrage et de leur place dans le montage."
  ],
  "cinema-documentary-truth#3": [
    "Parce qu’un accord donné au tournage couvre raisonnablement les contextes futurs tant que les images ne sont pas modifiées.",
    "Parce que le consentement concerne surtout l’acte de filmer ; le montage et la diffusion relèvent ensuite du choix de l’auteur.",
    "Parce qu’une personne filmée dans un lieu public accepte implicitement les principaux usages futurs de son image."
  ],
  "eco-inflation-interest-rates#0": [
    "Une forte hausse d’un produit essentiel suffit à caractériser l’inflation même si le reste du panier reste stable.",
    "L’inflation suppose que les différentes catégories de prix progressent à peu près au même rythme.",
    "Une hausse marquée de l’indice pendant un seul mois suffit à établir une inflation durable."
  ],
  "eco-inflation-interest-rates#3": [
    "En donnant aux banques commerciales une consigne directe sur les prix que leurs clients doivent pratiquer.",
    "En rendant le crédit plus abondant afin d’augmenter rapidement le pouvoir d’achat des ménages.",
    "En augmentant la capacité de production à court terme, ce qui corrige directement les pénuries d’offre."
  ],
  "eco-inflation-interest-rates#4": [
    "Parce que leur effet est presque immédiat et se transmet de manière comparable à tous les secteurs de l’économie.",
    "Parce qu’ils réduisent directement le coût de l’énergie ou des matières premières lorsque l’inflation vient de l’offre.",
    "Parce qu’ils peuvent ralentir la demande sans affecter sensiblement l’investissement, l’emploi ou le logement."
  ],
  "eco-comparative-advantage-trade#4": [
    "Parce qu’un avantage comparatif suppose de choisir la source la moins chère, même lorsqu’une dépendance devient stratégique.",
    "Parce qu’un coût supérieur réduit nécessairement le bien-être, même s’il diminue le risque d’interruption d’approvisionnement.",
    "Parce que la résilience s’obtient surtout en supprimant les importations plutôt qu’en diversifiant les fournisseurs."
  ],
  "eco-externalities-public-goods-policy#3": [
    "La taxe fixe la quantité autorisée, tandis que le quota fixe directement le prix payé pour chaque émission.",
    "La taxe et le quota sont équivalents parce qu’ils déterminent à l’avance à la fois le prix et la quantité d’émissions.",
    "Le quota modifie surtout les recettes publiques et laisse la quantité totale d’émissions s’ajuster librement."
  ],
  "eco-inflation-prices-central-bank#0": [
    "Une hausse persistante d’un bien très important suffit à parler d’inflation même si les autres prix évoluent peu.",
    "L’inflation implique que la plupart des prix augmentent dans des proportions proches les unes des autres.",
    "Une augmentation ponctuelle de l’indice général est déjà une inflation, même si elle est entièrement inversée le mois suivant."
  ],
  "eco-gdp-growth-limits#3": [
    "Le PIB par habitant renseigne directement sur le revenu médian et donc sur la situation du ménage typique.",
    "Quand il augmente, on peut en déduire que les revenus des différents groupes ont progressé dans des proportions comparables.",
    "Comme il divise la production par la population, il constitue aussi un indicateur synthétique de l’inégalité des revenus."
  ],
  "eng-still-yet-already-even#4": [
    "Parce que chacun de ces mots possède un équivalent français stable qui fonctionne dans les mêmes positions de phrase.",
    "Parce qu’ils modifient surtout le temps grammatical et beaucoup moins les attentes implicites du locuteur.",
    "Parce que leur place dans la phrase change rarement la nuance, à condition que le temps verbal soit correct."
  ],
  "geo-risk-vulnerability#4": [
    "Une fois l’intensité de l’aléa connue, le climat explique l’essentiel des dommages et les inégalités jouent surtout après la crise.",
    "La vulnérabilité sociale influence surtout la reconstruction, beaucoup moins l’exposition et les pertes au moment de l’événement.",
    "Un aménagement suffisamment protecteur peut supprimer le rôle de l’exposition, même si l’aléa devient plus intense."
  ],
  "geo-oceans-cables-maritime-power#0": [
    "Il domine surtout parce qu’un conteneur voyage en moyenne plus vite par mer que par avion sur les longues distances.",
    "La puissance d’une route maritime dépend principalement des ports d’arrivée ; les connexions terrestres jouent un rôle secondaire.",
    "Son avantage de coût concerne surtout les hydrocarbures et beaucoup moins les produits manufacturés ou les vracs."
  ],
  "geo-oceans-cables-maritime-power#1": [
    "Parce qu’un détroit concentre les flux tout en offrant généralement plusieurs itinéraires alternatifs de coût comparable.",
    "Parce que les risques y viennent surtout des conditions naturelles, beaucoup moins de la concentration des routes commerciales.",
    "Parce que les navires se dispersent avant le passage étroit, ce qui limite l’effet systémique d’une fermeture locale."
  ],
  "geo-global-food-systems#0": [
    "Un produit vendu comme local utilise normalement des intrants et des financements domestiques, même si son emballage vient d’ailleurs.",
    "La dépendance internationale provient surtout du transport final ; semences, engrais, machines ou aliments du bétail comptent peu.",
    "Une production proche du consommateur est faiblement exposée aux marchés mondiaux tant qu’elle n’est pas elle-même exportée."
  ],
  "geo-global-food-systems#1": [
    "Le prix payé en magasin est transmis presque proportionnellement au producteur lorsque la denrée devient plus chère.",
    "Les marges de transformation et de distribution sont assez fixes pour peser peu sur le partage de la valeur.",
    "Le pouvoir de négociation du transformateur ou du distributeur influence peu le prix reçu par l’agriculteur."
  ],
  "geo-global-food-systems#3": [
    "Un excédent national d’exportations alimentaires garantit en principe l’accès des ménages à une quantité suffisante de nourriture.",
    "La disponibilité physique à l’échelle du pays explique l’essentiel de la sécurité alimentaire, davantage que le revenu des ménages.",
    "Un pays exportateur connaît la faim surtout lorsque les exportations créent mécaniquement une pénurie sur le marché intérieur."
  ],
  "geo-metropolization-networks-segregation#3": [
    "Une rénovation accompagnée d’une hausse des prix suffit à parler de gentrification, même si la composition sociale reste stable.",
    "Toute amélioration importante de l’espace public constitue une gentrification dès lors qu’elle attire de nouveaux visiteurs.",
    "La gentrification suppose surtout des expulsions formelles ; des départs progressifs liés aux prix comptent beaucoup moins."
  ],
  "geo-metropolization-networks-segregation#4": [
    "Les emplois et les logements restent assez concentrés dans chaque commune pour permettre des politiques largement indépendantes.",
    "Les flux de transport peuvent être gérés commune par commune, la coordination métropolitaine ajoutant surtout une couche administrative.",
    "La pollution et les marchés immobiliers suivent suffisamment les frontières administratives pour être traités localement."
  ],
  "geo-climate-change-unequal-territories#3": [
    "L’intensité physique d’un aléa suffit à déterminer l’ampleur d’une catastrophe, quelle que soit la société touchée.",
    "La vulnérabilité décrit les fragilités d’une population mais reste indépendante de son exposition au phénomène dangereux.",
    "Une forte densité de population constitue en elle-même une catastrophe, même en l’absence d’un aléa dommageable."
  ],
  "geo-demographic-transition-fertility-aging#4": [
    "Il reflète surtout la baisse de la fécondité ; l’allongement de la vie joue un rôle assez secondaire.",
    "Il montre que les gains de santé et de longévité ont bénéficié de manière comparable à tous les groupes sociaux.",
    "Il indique qu’un système de retraites devient plus facile à financer puisque davantage de personnes atteignent un âge élevé."
  ],
  "geo-energy-transition-networks-minerals#0": [
    "Parce que la production d’électricité constitue l’essentiel du système énergétique ; les usages finaux s’adaptent ensuite assez spontanément.",
    "Parce que transports et bâtiments peuvent être décarbonés sans modifier sensiblement réseaux, demande ou infrastructures existantes.",
    "Parce que changer la source d’électricité laisse presque inchangés les besoins en matériaux, stockage, réseaux et équipements."
  ],
  "geo-energy-transition-networks-minerals#1": [
    "Parce que leur production peut être commandée au moment précis où la demande augmente, ce qui exige une réserve permanente.",
    "Parce que stockage, interconnexions et gestion de la demande deviennent moins utiles quand leur part dans le mix augmente.",
    "Parce que de bonnes prévisions météorologiques permettent de supprimer l’essentiel de la variabilité de leur production."
  ],
  "geo-energy-transition-networks-minerals#4": [
    "Parce qu’un même montant d’aide réduit la charge énergétique dans des proportions proches, quel que soit le revenu ou le logement.",
    "Parce que les ménages disposent de capacités d’investissement assez similaires pour répondre à une même incitation financière.",
    "Parce qu’une aide uniforme cible mieux la vulnérabilité qu’un dispositif tenant compte du revenu et des caractéristiques du logement."
  ],
  "lit-greek-tragedy#4": [
    "Parce qu’Aristote donne au terme une définition psychologique unique qui correspond assez directement à son usage moderne.",
    "Parce que la catharsis désigne principalement ce qui arrive aux acteurs sur scène plutôt que l’effet produit sur le public.",
    "Parce que le concept suffit à expliquer l’ensemble des effets émotionnels et politiques de la tragédie grecque."
  ],
  "lit-classical-theatre#4": [
    "Parce que les trois unités sont des règles obligatoires qu’Aristote formule explicitement sous cette forme pour tout théâtre.",
    "Parce que leur respect suffit à classer une pièce comme classique, indépendamment de son langage, de son public ou de ses institutions.",
    "Parce qu’elles règlent principalement le nombre d’actes et de personnages, et beaucoup moins l’action, le temps ou le lieu."
  ],
  "lit-romanticism#0": [
    "Oui, car le romantisme désigne d’abord une littérature sentimentale centrée sur le couple et l’intimité.",
    "Non, mais ses dimensions historiques et politiques restent marginales par rapport à l’expression des sentiments individuels.",
    "Non, car il se définit surtout par une même forme poétique adoptée dans les différents pays européens."
  ],
  "lit-dystopia#4": [
    "Parce que la valeur d’une dystopie dépend d’abord de la précision avec laquelle elle anticipe les technologies futures.",
    "Parce qu’un récit situé dans le futur se détache nécessairement des institutions et conflits du présent de son auteur.",
    "Parce que les mécanismes politiques y servent surtout de décor à une réflexion sur les inventions et les modes de vie à venir."
  ],
  "lit-modernism-stream-consciousness#4": [
    "Parce qu’une rupture formelle importante implique généralement une rupture comparable avec les exclusions sociales de son époque.",
    "Parce qu’un style expérimental rend l’œuvre largement indépendante du milieu social et des institutions littéraires de son auteur.",
    "Parce que la formation du canon moderniste dépend surtout de critères esthétiques et très peu des rapports de pouvoir culturels."
  ],
  "lit-science-fiction-worlds-critique#4": [
    "Elles renforcent surtout la dimension de prédiction technologique de la science-fiction, en laissant au second plan l’organisation sociale.",
    "Elles reprennent le modèle du héros conquérant pour montrer qu’il fonctionne de manière neutre quels que soient le genre ou la race.",
    "Elles séparent davantage les mondes spéculatifs des questions de pouvoir, de dépendance et d’identité présentes dans leur époque."
  ],
  "lit-enlightenment-critique-encyclopedia#1": [
    "Pour éloigner la fiction de toute critique d’institutions concrètes et éviter que le lecteur y reconnaisse le présent.",
    "Pour exposer une doctrine de manière directe, sans ironie ni distance narrative susceptibles d’en compliquer le message.",
    "Pour donner à son raisonnement la forme d’un récit littéralement réaliste dont les événements servent de preuves historiques."
  ],
  "lit-enlightenment-critique-encyclopedia#4": [
    "Parce que le recours commun à la raison conduit les auteurs des Lumières à des positions assez semblables sur esclavage, femmes et empire.",
    "Parce qu’un vocabulaire universaliste garantit que les principes défendus sont appliqués de la même façon à tous les groupes.",
    "Parce que les désaccords internes sont secondaires par rapport à un ensemble doctrinal commun suffisamment stable pour parler d’un bloc."
  ],
  "music-beethoven-symphony-public#0": [
    "D’un poste salarié permanent accordé par l’État autrichien, complété occasionnellement par des concerts.",
    "Principalement d’une pension aristocratique fixe, les ventes d’éditions et les leçons jouant un rôle marginal.",
    "De droits comparables aux royalties modernes sur chaque exécution publique de ses œuvres et sur leurs enregistrements."
  ],
  "music-jazz-blues-swing-bebop#2": [
    "Parce qu’un rapport rythmique fixe, par exemple deux pour un, suffit à reproduire le swing quel que soit le tempo.",
    "Parce que le swing vient surtout de la batterie ; le placement des autres musiciens modifie peu la sensation collective.",
    "Parce qu’une même subdivision écrite produit une sensation de swing comparable dans les différents styles et contextes d’interprétation."
  ],
  "philo-stoic-control#2": [
    "Les événements extérieurs déterminent d’abord l’émotion ; le jugement intervient ensuite surtout pour choisir une action.",
    "Le travail sur le jugement permet d’empêcher les impressions involontaires d’apparaître lorsqu’on maîtrise suffisamment la doctrine.",
    "Les jugements influencent la conduite mais changent peu la signification émotionnelle donnée à une situation."
  ],
  "philo-ethics-principles-consequences#2": [
    "Parce qu’une intention suffisamment claire permet en principe d’anticiper l’ensemble des conséquences pertinentes.",
    "Parce que l’incertitude importe peu dès lors que la conséquence immédiate paraît globalement positive.",
    "Parce qu’il suffit d’identifier une conséquence probable sans comparer sa gravité ni les autres scénarios possibles."
  ],
  "philo-social-contract-liberty#2": [
    "Le pouvoir devient légitime lorsque les individus lui transfèrent leurs droits sans conserver de limite opposable au gouvernement.",
    "La stabilité politique suffit à maintenir la légitimité d’un gouvernement, même s’il ne protège plus les droits pour lesquels il a été institué.",
    "Le consentement joue surtout au moment de l’origine du pouvoir et devient secondaire une fois les institutions installées."
  ],
  "philo-socrates-definition#1": [
    "À confirmer une définition en ajoutant une exception qui ne demande pas de modifier le critère proposé.",
    "À montrer qu’un concept est incohérent en lui-même plutôt qu’à tester la définition particulière qu’on en donne.",
    "À remplacer le travail de clarification des termes par un cas concret sur lequel les interlocuteurs peuvent s’accorder."
  ],
  "sci-natural-selection#2": [
    "Parce que les individus ajustent leurs caractères héréditaires lorsque l’environnement crée un nouveau besoin.",
    "Parce que les variations utiles apparaissent principalement après le changement du milieu qui les rend nécessaires.",
    "Parce que la sélection produit d’abord le caractère adapté, puis favorise les individus qui l’ont reçu."
  ],
  "sci-natural-selection#4": [
    "La dérive modifie surtout des caractères non héréditaires et n’agit donc pas réellement sur les fréquences génétiques.",
    "Mutation et migration changent les populations principalement lorsque la sélection naturelle est absente ou très faible.",
    "Toute variation durable de fréquence d’un allèle constitue une adaptation, même si elle vient du hasard ou d’une migration."
  ],
  "sci-thermodynamics-energy#1": [
    "L’énergie se conserve uniquement dans un système parfaitement isolé ; un système ouvert peut en créer ou en détruire.",
    "Chaleur et travail sont deux formes d’énergie stockées séparément dans un système puis converties l’une dans l’autre.",
    "La conservation de l’énergie suppose que la température du système reste constante pendant la transformation."
  ],
  "science-plate-tectonics-evidence#2": [
    "Elles montrent que le plancher océanique s’est déplacé tout en enregistrant un champ magnétique resté orienté dans le même sens.",
    "Leur symétrie peut s’expliquer par le déplacement des continents sans création régulière de nouvelle croûte au niveau des dorsales.",
    "Elles datent seulement l’orientation actuelle du champ et apportent peu d’information sur les inversions anciennes."
  ],
  "science-antibiotics-resistance-public-health#1": [
    "Parce que les antibiotiques ciblent surtout les enzymes de réplication présentes à la fois chez les bactéries et les virus.",
    "Parce que le rhume est généralement bactérien mais évolue trop vite pour qu’un antibiotique ait le temps d’agir.",
    "Parce que les antibiotiques agissent surtout sur la réponse immunitaire et non sur des structures propres aux agents infectieux."
  ],
  "sci-vaccination-immune-memory#3": [
    "Il est principalement fixé par l’efficacité du vaccin et varie peu selon le pathogène ou les contacts dans la population.",
    "Il dépend surtout de la protection contre les symptômes, même si le vaccin modifie peu la transmission de l’infection.",
    "Il reste comparable d’une population à l’autre tant que le même vaccin est utilisé, malgré des structures de contacts différentes."
  ]
};
  let distractorSetsUpgraded=0;
  Object.entries(distractorUpgrades).forEach(([key,choices])=>{
    const cut=key.lastIndexOf('#'); const id=key.slice(0,cut); const index=Number(key.slice(cut+1));
    const q=packs?.[id]?.quiz?.[index]; if(!q)return;
    q.choices=choices; q.editorialDistractorsRC33='plausibility-pass'; distractorSetsUpgraded++;
  });

  // 8) Architecture éditoriale : supprimer les titres dupliqués, numérotations incohérentes et fragments de titres hérités.
  const sectionTitleUpgrades={
  "aegean-mediterranean-myceniens-palais": {
    "8": "Linéaire B : les archives du palais"
  },
  "egypt-ramses": {
    "9": "Propagande royale",
    "10": "Lire un récit royal"
  },
  "egypt-connected": {
    "9": "Les formes du contact"
  },
  "greece-persian-wars": {
    "10": "Médiser : changer de camp"
  },
  "rome-foundation-kings": {
    "8": "Fondation légendaire"
  },
  "rome-italy-expansion": {
    "9": "Alliés italiens",
    "10": "Une intégration inégale"
  },
  "rome-punic-wars": {
    "9": "Pourquoi « punique » ?",
    "10": "Victoire tactique, guerre longue"
  },
  "rome-christianity-late-empire": {
    "9": "Paganisme : un mot trompeur"
  },
  "northern-viking-worlds-colonisation-atlantique": {
    "7": "Saga : une source à croiser"
  },
  "northern-viking-worlds-viking-commerce": {
    "6": "7. Des échanges fondés sur des réseaux de confiance"
  },
  "1789-crisis": {
    "9": "Le tiers état"
  },
  "republic-terror-war": {
    "8": "Une Terreur variable selon les lieux"
  },
  "napoleon-empire": {
    "9": "Le plébiscite"
  },
  "second-world-war-detail-resistances-collaborations": {
    "9": "Le STO"
  },
  "music-jazz-birth": {
    "5": "1917 n’est pas la naissance du jazz"
  },
  "astro-observable-universe": {
    "5": "Regarder Andromède dans le passé"
  },
  "astro-big-bang": {
    "7": "Les limites du modèle"
  },
  "astro-solar-activity-auroras": {
    "5": "6. Prévoir la météo de l’espace"
  },
  "astro-solar-system-formation": {
    "5": "6. Les migrations ont brouillé l’ordre initial"
  },
  "astro-giant-planets": {
    "5": "6. Quatre géantes, deux familles"
  },
  "astro-ocean-moons": {
    "5": "6. Pourquoi ces océans intéressent l’astrobiologie"
  },
  "astro-asteroids-comets": {
    "5": "6. Des petits corps, mais une grande mémoire"
  },
  "astro-meteors-impacts": {
    "5": "6. Du suivi statistique à la défense planétaire"
  },
  "astro-exoplanet-detection": {
    "5": "6. Détecter une planète, puis vérifier qu’elle existe"
  },
  "astro-habitable-zone-biosignatures": {
    "5": "6. Éviter les faux positifs"
  },
  "astro-telescopes-spectrum": {
    "5": "6. Un télescope mesure avant de montrer"
  },
  "astro-space-telescopes": {
    "5": "6. L’espace ne résout pas tous les problèmes"
  },
  "astro-rockets-orbits": {
    "5": "6. Atteindre l’orbite demande surtout de la vitesse"
  },
  "history-early-modern-empires-comparison": {
    "5": "6. Comparer sans fabriquer un modèle unique"
  },
  "astro-galaxies-cosmic-web": {
    "5": "6. La toile cosmique grandit à partir de faibles contrastes"
  },
  "eco-comparative-advantage-trade": {
    "5": "6. Le modèle éclaire un mécanisme, pas toute la politique commerciale"
  },
  "geo-oceans-cables-maritime-power": {
    "5": "6. La puissance maritime combine flux et contrôle",
    "6": "200 milles nautiques : la ZEE"
  },
  "art-renaissance-perspective-workshop": {
    "7": "Attribuer une œuvre à plusieurs mains"
  },
  "sci-electromagnetism-fields-induction": {
    "5": "6. Du phénomène de laboratoire au réseau électrique"
  },
  "geo-metropolization-networks-segregation": {
    "5": "6. Une métropole se construit à plusieurs échelles"
  },
  "lit-negritude-cesaire-senghor-damas": {
    "5": "6. Une alliance intellectuelle traversée de différences"
  },
  "art-baroque-light-movement-power": {
    "5": "6. Le spectateur placé dans la scène"
  },
  "geo-climate-change-unequal-territories": {
    "6": "Attribuer un événement au changement climatique"
  }
};
  let sectionTitlesUpgraded=0;
  Object.entries(sectionTitleUpgrades).forEach(([id,map])=>Object.entries(map).forEach(([index,title])=>{
    const block=packs?.[id]?.complete?.[Number(index)]; if(!block)return; block.title=title; block.editorialTitleRC33='coherence-pass'; sectionTitlesUpgraded++;
  }));

  try{
    window.HD_RC33_EDITORIAL={version:VERSION,removedFiller,bespokePractice,quizRepairs,manualWhy,mysteriesFixed,reasoningQuizUpgrades,distractorSetsUpgraded,sectionTitlesUpgraded};
    if(typeof invalidateCatalogCaches==='function')invalidateCatalogCaches();
  }catch{}
})();
