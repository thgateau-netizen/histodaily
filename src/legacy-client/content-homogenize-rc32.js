/* HistoDaily RC32 — homogénéisation éditoriale globale.
   Objectif : une profondeur visible comparable entre disciplines sans remplissage générique.
   Les enrichissements réutilisent d'abord les approfondissements, repères et synthèses déjà écrits. */
(function histodailyRC32ContentHomogenize(){
  "use strict";
  const VERSION = "1.0.0-rc.32.0";
  const packs = (typeof READY_LESSON_PACKS === "object" && READY_LESSON_PACKS) || {};
  const mysteries = Array.isArray(data?.mysteries) ? data.mysteries : [];
  const clean = value => String(value || "").replace(/\s+/g, " ").trim();
  const words = value => clean(value).split(/\s+/).filter(Boolean).length;
  const norm = value => clean(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const tokenSet = value => new Set(norm(value).split(/\s+/).filter(token => token.length >= 4));
  const overlap = (a,b) => { const A=tokenSet(a), B=tokenSet(b); let n=0; A.forEach(t=>{ if(B.has(t)) n+=1; }); return n; };
  const firstSentence = value => { const text=clean(value); const m=text.match(/^.*?[.!?](?:\s|$)/); return clean(m ? m[0] : text); };
  const ensurePeriod = value => { const text=clean(value); return text && !/[.!?…]$/.test(text) ? `${text}.` : text; };
  const blockWords = blocks => words((blocks || []).map(block => block?.text || "").join(" "));
  const cleanTitle = value => clean(value).replace(/^\d+[.)]?\s*/, "");

  const lessonTitleById = new Map();
  try {
    Object.values(data?.lessons || {}).forEach(list => (Array.isArray(list) ? list : []).forEach(lesson => {
      if (lesson?.id) lessonTitleById.set(lesson.id, clean(lesson.title || lesson.shortTitle || lesson.id));
    }));
  } catch {}
  const lessonTitle = id => lessonTitleById.get(id) || clean(packs[id]?.title || id.replace(/[-_]+/g," "));

  function uniqueTextParts(values = []) {
    const seen = new Set();
    return values.map(clean).filter(text => {
      if (!text) return false;
      const key = norm(text);
      if (!key || seen.has(key)) return false;
      seen.add(key); return true;
    });
  }

  function takeawaySentences(pack) {
    return uniqueTextParts((pack?.takeaways || []).map(item => {
      if (typeof item === "string") return ensurePeriod(item);
      const label = clean(item?.label || "");
      const text = ensurePeriod(item?.text || "");
      return text ? `${label ? `${label} : ` : ""}${text}` : "";
    }));
  }

  function keyFactSentences(pack) {
    return uniqueTextParts((pack?.keyFacts || []).map(item => ensurePeriod(item)));
  }

  function synthesisBlock(pack, id, index) {
    const title = lessonTitle(id);
    const takeaways = takeawaySentences(pack).slice(0,4);
    const facts = keyFactSentences(pack).slice(0,3);
    const source = takeaways.length >= 3 ? takeaways : [...takeaways, ...facts].slice(0,4);
    const hook = ensurePeriod(pack?.hook || "");
    const text = clean(`${source.join(" ")} ${hook ? `Ces repères répondent au problème de départ : ${hook}` : ""}`);
    return text ? { title:`${index}. Synthèse : relier les idées`, text, editorialAddition:"rc32-synthesis" } : null;
  }

  function evidenceBlock(pack, id, index) {
    const facts = keyFactSentences(pack).slice(0,4);
    const deeper = (pack?.deeper || []).map(item => ensurePeriod(item?.text || "")).filter(Boolean).slice(0,2);
    const text = clean([...facts, ...deeper].join(" "));
    return text ? { title:`${index}. Comment raisonner sur ce sujet`, text, editorialAddition:"rc32-evidence" } : null;
  }

  function promoteComplete(pack, id) {
    if (!Array.isArray(pack.complete)) pack.complete = [];
    const seen = new Set(pack.complete.map(block => norm(`${block?.title || ""} ${block?.text || ""}`)));
    const deeper = Array.isArray(pack.deeper) ? pack.deeper.filter(Boolean) : [];
    for (const block of deeper) {
      if (pack.complete.length >= 6 && blockWords(pack.complete) >= 430) break;
      const key = norm(`${block?.title || ""} ${block?.text || ""}`);
      if (!key || seen.has(key) || words(block?.text) < 12) continue;
      pack.complete.push({ title:cleanTitle(block.title || `Approfondissement ${pack.complete.length+1}`), text:clean(block.text), editorialAddition:"rc32-promoted-deeper" });
      seen.add(key);
    }
    if (pack.complete.length < 6 || blockWords(pack.complete) < 430) {
      const block = synthesisBlock(pack,id,pack.complete.length+1);
      if (block && !seen.has(norm(`${block.title} ${block.text}`))) { pack.complete.push(block); seen.add(norm(`${block.title} ${block.text}`)); }
    }
    if (pack.complete.length < 6 || blockWords(pack.complete) < 430) {
      const block = evidenceBlock(pack,id,pack.complete.length+1);
      if (block && !seen.has(norm(`${block.title} ${block.text}`))) pack.complete.push(block);
    }
  }

  function strengthenExpress(pack) {
    if (!Array.isArray(pack.express)) pack.express = [];
    const sources = uniqueTextParts([
      ...(pack.express.slice(3).map(item => typeof item === "string" ? item : item?.text || "")),
      ...takeawaySentences(pack),
      ...keyFactSentences(pack),
      firstSentence(pack.hook || "")
    ]);
    while (pack.express.length < 3 && sources.length) pack.express.push(sources.shift());
    if (!pack.express.length) return;
    let visible = pack.express.slice(0,3).map(item => typeof item === "string" ? clean(item) : clean(item?.text || ""));
    let cursor = 0;
    while (words(visible.join(" ")) < 125 && cursor < sources.length) {
      const addition = ensurePeriod(sources[cursor++]);
      if (!addition || visible.some(text => norm(text).includes(norm(addition)))) continue;
      let target = 0;
      for (let i=1;i<visible.length;i++) if (words(visible[i]) < words(visible[target])) target=i;
      visible[target] = clean(`${ensurePeriod(visible[target])} ${addition}`);
    }
    visible.forEach((text,index) => {
      if (typeof pack.express[index] === "string" || pack.express[index] == null) pack.express[index] = text;
      else pack.express[index] = { ...pack.express[index], text };
    });
  }

  function sectionForQuestion(pack, question) {
    const sections = Array.isArray(pack.complete) ? pack.complete.filter(Boolean) : [];
    const evidenceName = norm(String(question?.evidence || "").replace(/[«»"]/g,""));
    if (evidenceName) {
      const exact = sections.find(section => norm(cleanTitle(section?.title || "")).includes(evidenceName) || evidenceName.includes(norm(cleanTitle(section?.title || ""))));
      if (exact) return exact;
    }
    const target = `${question?.q || ""} ${question?.a || question?.answer || question?.correct || ""}`;
    return sections.map(section => ({ section, score:overlap(target,`${section?.title || ""} ${section?.text || ""}`) }))
      .sort((a,b)=>b.score-a.score)[0]?.section || sections[0] || null;
  }

  function supportSentence(section, question) {
    if (!section) return "";
    const target = `${question?.q || ""} ${question?.a || question?.answer || question?.correct || ""}`;
    const candidates = clean(section.text || "").match(/[^.!?]+[.!?]?/g) || [];
    return candidates.map(sentence => ({ text:ensurePeriod(sentence), score:overlap(target,sentence) }))
      .filter(item => words(item.text) >= 7)
      .sort((a,b)=>b.score-a.score)[0]?.text || firstSentence(section.text || "");
  }

  function strengthenQuiz(pack) {
    const quiz = Array.isArray(pack.quiz) ? pack.quiz : [];
    const seenWhy = new Set();
    quiz.forEach(question => {
      if (!question || typeof question !== "object") return;
      const answer = ensurePeriod(question.a ?? question.answer ?? question.correct ?? "");
      const current = clean(question.why || question.explanation || "");
      const sameAsAnswer = norm(current) && norm(current) === norm(answer);
      const duplicateWhy = norm(current) && seenWhy.has(norm(current));
      const mismatch = current && overlap(`${question.q || ""} ${answer}`,current) === 0;
      const section = sectionForQuestion(pack,question);
      const support = supportSentence(section,question);
      if (words(current) < 14 || sameAsAnswer || duplicateWhy || mismatch) {
        let explanation = clean(`${answer} ${support && norm(support)!==norm(answer) ? support : ""}`);
        if (words(explanation) < 14) explanation = clean(`${explanation} Cette précision permet de distinguer la bonne réponse des raccourcis proposés.`);
        question.why = explanation;
      }
      if (section?.title) question.evidence = `« ${cleanTitle(section.title)} »`;
      seenWhy.add(norm(question.why || current));
    });
  }

  const duplicatePrompts = new Map();
  Object.entries(packs).forEach(([id,pack]) => (pack.quiz || []).forEach((question,index) => {
    const key = norm(question?.q || "");
    if (!key) return;
    if (!duplicatePrompts.has(key)) duplicatePrompts.set(key,[]);
    duplicatePrompts.get(key).push({id,question,index});
  }));
  duplicatePrompts.forEach(entries => {
    if (entries.length < 2) return;
    entries.forEach(({id,question}) => {
      const title = lessonTitle(id);
      const original = clean(question.q || "").replace(/\s*\?\s*$/,"");
      question.q = `À propos de « ${title} », ${original.charAt(0).toLowerCase()}${original.slice(1)} ?`;
      question.editorialQuestionRevision = "rc32-unique";
    });
  });

  let coursesTouched=0, promotedBlocks=0, expressStrengthened=0, quizStrengthened=0;
  Object.entries(packs).forEach(([id,pack]) => {
    const beforeSections=(pack.complete || []).length, beforeWords=blockWords(pack.complete || []);
    const beforeExpress=words((pack.express || []).slice(0,3).map(item=>typeof item==="string"?item:item?.text||"").join(" "));
    const beforeQuiz=(pack.quiz || []).map(q=>clean(q?.why || q?.explanation || ""));
    promoteComplete(pack,id);
    strengthenExpress(pack);
    strengthenQuiz(pack);
    const afterSections=(pack.complete || []).length, afterWords=blockWords(pack.complete || []);
    const afterExpress=words((pack.express || []).slice(0,3).map(item=>typeof item==="string"?item:item?.text||"").join(" "));
    promotedBlocks += Math.max(0,afterSections-beforeSections);
    if (afterExpress>beforeExpress) expressStrengthened += 1;
    quizStrengthened += (pack.quiz || []).filter((q,i)=>clean(q?.why || q?.explanation || "") !== beforeQuiz[i]).length;
    if (afterSections!==beforeSections || afterWords!==beforeWords || afterExpress!==beforeExpress || (pack.quiz || []).some((q,i)=>clean(q?.why || q?.explanation || "") !== beforeQuiz[i])) coursesTouched += 1;
    pack.editorialRevisionRC32 = "homogenized-visible-content";
  });

  let mysteriesTouched=0;
  mysteries.forEach(mystery => {
    const pack = packs[mystery?.lessonId];
    let changed=false;
    if (words(mystery?.prompt) < 24) {
      const context = firstSentence(pack?.hook || pack?.complete?.[0]?.text || "");
      if (context && !norm(mystery.prompt || "").includes(norm(context))) { mystery.prompt = clean(`${ensurePeriod(mystery.prompt)} ${context}`); changed=true; }
    }
    if (words(mystery?.explanation) < 24) {
      const takeaway = takeawaySentences(pack || {})[0] || firstSentence(pack?.hook || pack?.complete?.[0]?.text || "");
      if (takeaway && !norm(mystery.explanation || "").includes(norm(takeaway))) { mystery.explanation = clean(`${ensurePeriod(mystery.explanation || `La réponse est ${mystery.answer || "celle-ci"}`)} ${takeaway}`); changed=true; }
    }
    if (changed) { mystery.editorialMysteryRevisionRC32="homogenized"; mysteriesTouched+=1; }
  });

  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version:VERSION, contentHomogenizationRC32:{coursesTouched,promotedBlocks,expressStrengthened,quizStrengthened,mysteriesTouched} };
    if (typeof invalidateCatalogCaches === "function") invalidateCatalogCaches();
  } catch {}
})();

/* RC32.1 — finitions ciblées après audit global. */
(function histodailyRC32ContentFinalTuning(){
  "use strict";
  const packs = (typeof READY_LESSON_PACKS === "object" && READY_LESSON_PACKS) || {};
  const mysteries = Array.isArray(data?.mysteries) ? data.mysteries : [];
  const clean=v=>String(v||"").replace(/\s+/g," ").trim();
  const addToExpress=(id,text)=>{ const p=packs[id]; if(!p?.express?.length) return; const i=Math.min(2,p.express.length-1); if(typeof p.express[i]==="string") p.express[i]=clean(`${p.express[i]} ${text}`); else p.express[i]={...p.express[i],text:clean(`${p.express[i]?.text||""} ${text}`)}; };
  addToExpress("prehistory-hunt","La conservation des traces favorise la pierre et l’os : elle peut donc sous-représenter une part importante des végétaux, contenants et gestes ordinaires.");
  addToExpress("philo-descartes-doubt","Le doute cartésien est une méthode temporaire : son but n’est pas de vivre sans conviction, mais d’identifier ce qui résiste à l’examen.");
  addToExpress("eng-small-words-just-quite","Le bon réflexe consiste à tester le sens sur toute la phrase : ces petits mots changent souvent de valeur selon la position, le ton et la variété d’anglais.");

  const addComplete=(id,title,text)=>{ const p=packs[id]; if(!p?.complete) return; p.complete.push({title,text,editorialAddition:"rc32-final"}); };
  addComplete("philo-distinction-necessary-sufficient","Cas limite à tester","Une condition peut être nécessaire sans suffire à produire le résultat. Avoir du carburant est nécessaire pour qu’une voiture thermique roule, mais ne suffit pas si le moteur est en panne. Inversement, une condition suffisante garantit le résultat dans le cadre défini, sans être toujours la seule manière d’y parvenir. Tester des contre-exemples empêche de confondre les deux relations.");
  addComplete("philo-socrates-definition","Pourquoi demander des critères","Une définition philosophique utile doit permettre de décider pourquoi un cas entre dans la catégorie et pourquoi un autre en sort. Socrate cherche ainsi des critères plutôt qu’une liste d’exemples prestigieux. Si la définition accepte manifestement trop de cas ou en exclut qu’elle devrait conserver, le contre-exemple oblige à la reprendre. La discussion devient alors un travail collectif de précision conceptuelle.");

  const ff=packs["eng-false-friends-core"]?.quiz?.[0];
  if(ff) ff.why="Le mot anglais ressemble au français mais son sens dépend de l’usage réel de la phrase. Le contexte permet de vérifier la traduction avant de se fier à la ressemblance graphique.";

  const mysteryWhy={
    "english-mystery-actually-318":"Actually corrige ou précise généralement ce qui vient d’être dit : en français, « en fait » ou « en réalité » convient souvent mieux que « actuellement ».",
    "english-mystery-eventually-318":"Eventually annonce le résultat atteint au terme d’un processus ou après un délai : le sens naturel est « finalement », et non « éventuellement ».",
    "english-mystery-afraid-318":"Dans une interaction polie, I’m afraid sert souvent à préparer une mauvaise nouvelle, une impossibilité ou un désaccord : la peur littérale n’est pas le sens principal.",
    "english-mystery-yet-318":"Yet se comprend par sa position et le type de phrase : il peut signifier « encore » dans une négation, « déjà » dans une question ou introduire un contraste soutenu."
  };
  mysteries.forEach(m=>{ if(mysteryWhy[m?.id]) { m.explanation=mysteryWhy[m.id]; m.editorialMysteryRevisionRC32="final-tuning"; } });
})();

(function histodailyRC32TinyQuizFix(){
  const q=READY_LESSON_PACKS?.["eng-false-friends-core"]?.quiz?.[3];
  if(q) q.why="Assist signifie ici « aider », pas « assister à un événement ». Le contexte d’une demande directe permet de distinguer clairement les deux sens.";
})();

/* RC32.2 — distracteurs factuels : éviter que la bonne réponse se repère à sa longueur. */
(function histodailyRC32DistractorPolish(){
  const packs = READY_LESSON_PACKS || {};
  const patch=(id,qi,choices)=>{ const q=packs?.[id]?.quiz?.[qi]; if(q) { q.choices=choices; q.editorialDistractorsRC32="balanced"; } };
  patch("art-impressionism-modern-life",0,["En Grande-Bretagne.","En Italie.","En Allemagne."]);
  patch("music-jazz-birth",0,["En France.","Au Brésil.","À Cuba."]);
  patch("music-jazz-birth",1,["Chicago.","New York.","Kansas City."]);
  patch("medieval-west-clovis-merovingians",0,["Aux Carolingiens.","Aux Capétiens.","Aux Ottoniens."]);
  patch("medieval-west-charlemagne-carolingians",0,["Les Mérovingiens.","Les Capétiens.","Les Ottoniens."]);
  patch("medieval-west-capetians-monarchy",0,["843.","1214.","1302."]);
  patch("sci-pasteur-microbes-vaccines",0,["Au XVIIe siècle.","Au XVIIIe siècle.","Au XXe siècle."]);
  patch("rome-caesar-civil-wars",0,["Au IIIe siècle av. J.-C.","Au Ier siècle apr. J.-C.","Au Ve siècle apr. J.-C."]);
  patch("greece-alexander-hellenistic-kingdoms",2,["Les Séleucides.","Les Antigonides.","Les Attalides."]);
})();

/* RC32.3 — 30 QCM dont la bonne réponse se détachait trop visuellement. */
(function histodailyRC32BalancedDistractors(){
  const p=READY_LESSON_PACKS||{};
  const set=(id,n,c)=>{ if(p?.[id]?.quiz?.[n]) { p[id].quiz[n].choices=c; p[id].quiz[n].editorialDistractorsRC32="balanced-manual"; } };
  set("egypt-connected",0,[
    "Parce qu’elle domine durablement tout le Proche-Orient et impose ses institutions à ses voisins.",
    "Parce que ses échanges extérieurs commencent surtout après les conquêtes d’Alexandre le Grand.",
    "Parce qu’elle dépend principalement de routes terrestres mésopotamiennes, sans rôle majeur du Nil ni de la mer."
  ]);
  set("egypt-connected",1,[
    "Elle sert surtout de frontière militaire, avec peu d’échanges de ressources ou de populations avec l’Égypte.",
    "Elle fournit principalement le bois et les ports méditerranéens dont dépend la construction navale égyptienne.",
    "Elle reste un royaume extérieur sans occupation, forteresses ni interventions politiques égyptiennes à aucune période."
  ]);
  set("art-dada-readymade",0,[
    "Dans le Paris d’avant 1914, comme prolongement direct du cubisme et de la peinture de salon.",
    "Dans l’Allemagne de la fin des années 1920, en réaction principalement à la crise économique.",
    "Aux États-Unis après 1945, autour des grands musées et de l’essor de l’expressionnisme abstrait."
  ]);
  set("art-dada-readymade",2,[
    "Que le jury accepte les objets industriels seulement lorsqu’ils sont transformés matériellement par l’artiste.",
    "Que le pseudonyme employé par Duchamp suffit à expliquer le refus, indépendamment du statut de l’objet.",
    "Que l’exposition applique explicitement une règle interdisant les objets fabriqués en série et les œuvres anonymes."
  ]);
  set("art-dada-readymade",4,[
    "Le retour à une définition de l’art fondée d’abord sur la virtuosité manuelle et la maîtrise académique.",
    "L’idée qu’une œuvre doit rester séparée des objets ordinaires et des gestes de la vie quotidienne.",
    "La priorité donnée à la beauté formelle de l’objet plutôt qu’au contexte, au choix ou à l’intention."
  ]);
  set("art-street-art-public-space",0,[
    "Le tag développe une composition complexe, tandis qu’une pièce se limite généralement à une signature rapide.",
    "Le tag désigne surtout une image au pochoir, alors qu’une pièce correspond à toute inscription manuscrite.",
    "Le tag est une œuvre commandée et durable, tandis qu’une pièce est nécessairement clandestine et provisoire."
  ]);
  set("art-street-art-public-space",4,[
    "Le musée conserve l’œuvre sans modifier son sens, puisque seul le motif visuel compte dans le street art.",
    "L’entrée au musée rend l’œuvre automatiquement légale et efface les questions de propriété ou d’effacement.",
    "La conservation muséale restitue entièrement le lieu, le risque et le public initial de l’intervention urbaine."
  ]);
  set("cinema-italian-neorealism",0,[
    "Dans l’Italie fasciste des années 1930, autour des grandes productions historiques tournées en studio.",
    "Au début des années 1960, pendant le boom économique et l’essor de la télévision italienne.",
    "Après la Première Guerre mondiale, au moment où le cinéma muet italien domine encore les écrans européens."
  ]);
  set("cinema-italian-neorealism",2,[
    "Un père tente de retrouver un emploi d’usine après la guerre, tandis que son fils refuse de quitter Rome.",
    "Un homme soupçonné d’un vol cherche à prouver son innocence dans les quartiers populaires de la capitale.",
    "Un ouvrier parcourt Rome pour vendre son vélo et financer le départ de sa famille vers une autre région."
  ]);
  set("cinema-italian-neorealism",4,[
    "Il a montré qu’un réalisme social exigeait surtout de grands studios capables de reconstruire fidèlement les rues.",
    "Il a imposé l’usage d’acteurs non professionnels comme règle obligatoire pour tout cinéma réaliste après 1945.",
    "Il a surtout influencé les superproductions historiques en prouvant que les décors naturels coûtaient moins cher."
  ]);
  set("cinema-blockbuster-system",4,[
    "Parce que la réussite commerciale d’un film suffit à déterminer sa forme et empêche toute singularité artistique.",
    "Parce que le terme blockbuster décrit uniquement un genre narratif précis, indépendamment de sa distribution.",
    "Parce que les investissements massifs concernent la fabrication du film mais n’ont guère d’effet sur sa présence en salles."
  ]);
  set("sci-radioactivity-atom",4,[
    "Parce que la durée d’exposition compte, alors que la distance et le matériau de protection modifient peu la dose reçue.",
    "Parce que tous les rayonnements sont arrêtés par les mêmes matériaux dès que leur épaisseur est suffisante.",
    "Parce que la distance protège surtout des contaminations internes, tandis que le temps agit seulement sur les sources faibles."
  ]);
  set("sci-computers-microprocessor",4,[
    "Il réunit sur une seule puce la mémoire, l’écran et tous les logiciels nécessaires à un ordinateur complet.",
    "Il remplace les circuits intégrés par un composant mécanique plus petit et plus simple à produire.",
    "Il rend les ordinateurs indépendants de toute mémoire externe, puisque les instructions sont stockées dans le processeur."
  ]);
  set("eco-bank-money-creation",2,[
    "La quantité de billets disponible dans les agences, qui fixe directement le volume maximal des crédits accordés.",
    "Le niveau des dépôts existants, puisqu’une banque doit disposer à l’avance de chaque euro qu’elle prête.",
    "La seule demande des clients solvables, les contraintes de capital et de liquidité intervenant seulement après le prêt."
  ]);
  set("eco-bank-money-creation",4,[
    "Elle décide du montant et du taux de chaque crédit accordé par les banques commerciales aux ménages et entreprises.",
    "Elle crée directement la majorité des dépôts bancaires en ouvrant des comptes aux particuliers et aux entreprises.",
    "Elle fixe les prix et les salaires pour maintenir l’inflation au niveau compatible avec son objectif monétaire."
  ]);
  set("eco-great-depression",3,[
    "Il facilite une baisse coordonnée des taux de change et permet aux banques centrales de relancer rapidement le crédit.",
    "Il protège les économies nationales des faillites bancaires en garantissant automatiquement la valeur des dépôts.",
    "Il limite surtout le commerce extérieur, mais laisse aux gouvernements une large liberté pour augmenter la masse monétaire."
  ]);
  set("eco-great-depression",4,[
    "Il met rapidement fin au chômage de masse, mais réforme peu la finance et modifie surtout la politique commerciale.",
    "Il agit principalement par la baisse des droits de douane, sans transformer le système bancaire ni les dépenses publiques.",
    "Il restaure la confiance financière mais réduit l’intervention fédérale dans l’économie et les protections sociales."
  ]);
  set("geo-risk-vulnerability",0,[
    "Le nombre de personnes et de bâtiments qui se trouvent exposés à un phénomène dangereux dans un territoire donné.",
    "La fragilité sociale et matérielle qui détermine l’ampleur des dommages lorsqu’un événement se produit.",
    "L’ensemble des pertes humaines et économiques observées après qu’une catastrophe a effectivement eu lieu."
  ]);
  set("geo-risk-vulnerability",3,[
    "En densifiant les centres urbains déjà protégés, ce qui réduit l’exposition mais augmente seulement la valeur des biens.",
    "En développant des réseaux d’évacuation des eaux qui déplacent le risque sans modifier l’imperméabilisation des sols.",
    "En installant les nouveaux logements sur les hauteurs, ce qui accroît surtout le ruissellement vers les zones rurales."
  ]);
  set("music-baroque-opera",2,[
    "Le récitatif développe longuement une émotion, tandis que l’air sert surtout à transmettre rapidement les informations du récit.",
    "Le récitatif est réservé aux chœurs, tandis que l’air est toujours chanté par plusieurs personnages en même temps.",
    "Le récitatif et l’air ont la même fonction dramatique, mais se distinguent seulement par la langue employée."
  ]);
  set("music-baroque-opera",3,[
    "L’opéra devient un divertissement de cour gratuit, financé exclusivement par les familles aristocratiques de Venise.",
    "L’ouverture du théâtre met fin au système des saisons, puisque les spectacles sont désormais joués toute l’année.",
    "Le public payant disparaît au profit de mécènes privés qui choisissent seuls les chanteurs et les œuvres programmées."
  ]);
  set("astro-solar-activity-auroras",3,[
    "La lumière solaire se réfléchit sur les cristaux de glace polaires et prend des couleurs selon leur orientation.",
    "Des particules de la haute atmosphère quittent la Terre puis brillent lorsqu’elles atteignent directement la surface du Soleil.",
    "Le champ magnétique terrestre produit lui-même de la lumière visible lorsqu’il est comprimé par le vent solaire."
  ]);
  set("astro-space-telescopes",3,[
    "Un point matériel situé entre deux astres où leurs attractions gravitationnelles s’annulent exactement et définitivement.",
    "Une orbite circulaire autour de la Terre où un télescope reste immobile au-dessus du même point du sol.",
    "Une zone protégée de toute gravité, choisie pour empêcher le Soleil et la Terre de perturber l’observatoire."
  ]);
  set("philo-descartes-cogito",1,[
    "Que mes perceptions sensibles sont fiables dès lors que je peux les formuler clairement dans ma pensée.",
    "Que l’existence de mon corps est plus certaine que l’activité de penser qui permet d’en douter.",
    "Que toute idée présente dans mon esprit est vraie du seul fait que je peux la concevoir distinctement."
  ]);
  set("philo-ethics-frameworks",4,[
    "Parce que le conséquentialisme juge seulement l’intention de l’agent et non les effets produits par son action.",
    "Parce que toute théorie conséquentialiste impose une règle absolue qui interdit certains moyens quelles qu’en soient les conséquences.",
    "Parce que les approches conséquentialistes considèrent uniquement le résultat immédiat et excluent les effets sur les autres personnes."
  ]);
  set("history-mali-songhai-sahel",4,[
    "Elle place durablement l’ensemble du Sahel sous administration marocaine et maintient intactes les structures de l’empire songhaï.",
    "Elle coupe les routes transsahariennes et provoque la disparition rapide des grands centres commerciaux de la région.",
    "Elle rétablit un empire du Mali unifié qui reprend immédiatement le contrôle politique de Gao et de Tombouctou."
  ]);
  set("art-renaissance-perspective-workshop",1,[
    "Elle sert surtout à reproduire mathématiquement le bâtiment réel représenté, sans jouer de rôle dans la hiérarchie de la scène.",
    "Elle réduit la dimension symbolique en imposant que tous les personnages aient la même importance visuelle dans l’espace.",
    "Elle transforme le tableau religieux en simple démonstration géométrique, indépendante du récit et du regard du spectateur."
  ]);
  set("history-cold-war-bipolar-world",4,[
    "Les accords d’Helsinki de 1975 puis la disparition progressive des alliances militaires européennes avant 1980.",
    "La crise des missiles de Cuba puis la réunification allemande immédiate, qui met fin à la rivalité des deux blocs.",
    "La construction du mur de Berlin puis la dissolution de l’OTAN au moment des réformes soviétiques de la fin des années 1980."
  ]);
  set("cinema-new-wave-auteur-street-editing",2,[
    "Une coupe discrète entre deux plans raccordés qui conserve exactement la continuité du mouvement et de la durée.",
    "Un changement brutal d’axe de caméra sans suppression de temps, utilisé uniquement pour désorienter spatialement le spectateur.",
    "Un montage alterné entre deux actions simultanées qui se déroulent dans des lieux différents mais finissent par se rejoindre."
  ]);
  set("geo-demographic-transition-fertility-aging",3,[
    "La stabilité du nombre d’habitants lorsque les taux de fécondité et de mortalité cessent de varier pendant plusieurs décennies.",
    "Le vieillissement mécanique d’une population qui fait diminuer immédiatement les naissances dès que l’espérance de vie augmente.",
    "Le décalage entre recensements successifs, qui donne l’impression d’une croissance alors que la population est déjà stable."
  ]);
})();

/* RC32.4 — suppression des blocs d'entraînement copiés-collés Anglais / Philo. */
(function histodailyRC32UniquePracticeBlocks(){
  const packs=READY_LESSON_PACKS||{};
  const clean=v=>String(v||"").replace(/\s+/g," ").trim();
  const takeaway=pack=>{ const x=(pack?.takeaways||[])[0]; return clean(typeof x==="string"?x:x?.text||""); };
  Object.entries(packs).forEach(([id,pack])=>{
    (pack.complete||[]).forEach(block=>{
      const title=clean(block?.title||"");
      if (/Entraînement actif/i.test(title) && /^eng-/.test(id)) {
        const focus=takeaway(pack)||clean(pack.hook||"");
        block.text=clean(`Commence par ce repère du cours : ${focus} Trouve ensuite trois phrases naturelles où ce mécanisme change réellement le sens, le registre ou l’intention. Pour chacune, explique d’abord le message global en anglais simple avant de chercher une traduction française. Modifie un élément du contexte et observe ce qui change. Termine par une reformulation qui conserve l’idée sans reprendre l’expression étudiée : c’est ce déplacement qui vérifie que tu comprends l’usage et pas seulement une équivalence mémorisée.`);
        block.editorialAddition="rc32-unique-practice";
      }
      if (/Mise à l’épreuve/i.test(title) && /^philo-/.test(id)) {
        const focus=takeaway(pack)||clean(pack.hook||"");
        block.text=clean(`Pars de cette idée du cours : ${focus} Construis un exemple qui semble la confirmer, puis cherche volontairement un contre-exemple ou une objection qui la met sous pression. Écris ensuite le raisonnement en trois étapes : thèse, raison, objection. Réponds à l’objection sans changer discrètement le sens des termes. Si un auteur est mobilisé, distingue sa thèse de la version simplifiée qu’on pourrait en retenir. Le but est de tester les limites du concept, pas de réciter une formule.`);
        block.editorialAddition="rc32-unique-practice";
      }
    });
  });
})();

/* RC32.5 — retirer les sections strictement dupliquées dans un même cours. */
(function histodailyRC32DeduplicateSections(){
  const norm=v=>String(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim();
  Object.values(READY_LESSON_PACKS||{}).forEach(pack=>{
    if(!Array.isArray(pack?.complete)) return;
    const seen=new Set();
    pack.complete=pack.complete.filter(block=>{
      const key=norm(block?.text||"");
      if(!key) return false;
      if(seen.has(key)) return false;
      seen.add(key); return true;
    });
  });
})();

/* RC32.6 — compléter trois cours d'anglais raccourcis après déduplication. */
(function histodailyRC32EnglishUniqueDepth(){
  const add=(id,title,text)=>{ const p=READY_LESSON_PACKS?.[id]; if(p?.complete) p.complete.push({title,text,editorialAddition:"rc32-unique-depth"}); };
  add("eng-small-words-just-quite","8. Comparer plutôt que traduire mot à mot","Pour consolider ces petits mots, compare des phrases qui ne changent qu’un élément. “I just called” ne fonctionne pas comme “It’s just an idea”, et “quite good” ne se lit pas automatiquement comme “completely good”. Fais varier l’adjectif, le ton et la situation, puis reformule la phrase sans l’adverbe. Si le message relationnel ou le degré d’intensité change, tu as repéré ce que le petit mot ajoutait réellement. Cette méthode évite de mémoriser une traduction unique qui échoue dès que le contexte change.");
  add("eng-phrasal-get","8. Lire la particule dans la scène","Avec get, la particule ne se mémorise pas comme une décoration ajoutée au verbe : elle contribue à construire une scène. Get back implique un retour ou une récupération, get over le franchissement d’une difficulté, get by une suffisance minimale, get away with l’absence de conséquence attendue. Pour chaque expression, imagine qui agit, ce qui change avant et après, puis remplace la tournure par une paraphrase simple. Si la scène reste la même, tu tiens le sens utile plutôt qu’une liste de traductions isolées.");
  add("eng-implicit-understatement","8. Vérifier l’implicite par la réaction attendue","Une phrase atténuée se comprend aussi par la réaction qu’elle cherche à provoquer. Si quelqu’un dit “That’s not ideal” après une erreur grave, une réponse légère montrerait qu’on a pris les mots trop littéralement. Demande-toi donc : que sait déjà l’interlocuteur, quel degré de désaccord serait socialement acceptable, et quelle action la phrase prépare-t-elle ? Reformule ensuite le message de façon plus directe, puis reviens à la version atténuée. L’écart entre les deux formulations révèle l’implicite et le rôle du registre.");
})();

(function histodailyRC32EnglishWordFloor(){
  const add=(id,text)=>{ const p=READY_LESSON_PACKS?.[id]; const b=p?.complete?.[p.complete.length-1]; if(b) b.text=`${b.text} ${text}`; };
  add("eng-small-words-just-quite","Rejoue enfin les mêmes phrases à voix haute avec deux intentions différentes pour sentir ce que l’intonation ajoute au choix des mots.");
  add("eng-implicit-understatement","Compare aussi une conversation amicale et un échange professionnel : le même sous-entendu peut demander des formulations et des degrés de prudence différents.");
})();
