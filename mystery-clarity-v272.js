/* HistoDaily beta 272 — consignes explicites et difficulté réellement progressive.
   Cette passe éditoriale ne touche ni à la série, ni aux scores déjà enregistrés,
   ni au social. Elle précise ce que le joueur doit trouver sur les 130 mystères. */
(function histodailyBeta272MysteryClarity(){
  "use strict";
  const VERSION = "1.0.0-beta.272.0";
  if (!Array.isArray(data?.mysteries)) return;

  const clean = value => String(value || "").replace(/\s+/g, " ").trim();
  const norm = value => clean(value)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[’']/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
  const escapeLocal = value => typeof escapeHtml === "function"
    ? escapeHtml(value)
    : String(value || "").replace(/[&<>\"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));

  const FEMALE_HEADS = new Set([
    "civilisation","conference","conférence","étape","etape","évolution","evolution","forme",
    "frontière","frontiere","infrastructure","innovation","interaction","loi","méthode","methode",
    "mission","notion","opération","operation","organisation","période","periode","planète","planete",
    "preuve","projection","relation","révolution","revolution","rupture","sensation","structure",
    "technique","transformation","œuvre","oeuvre"
  ]);
  const PERSON_HEADS = new Set(["personnage","savant","pionnier","chef","artiste","auteur","scientifique","explorateur","dirigeant"]);
  const METHOD_HEADS = new Set(["méthode","methode","technique","procédé","procede","dispositif","test","protocole"]);
  const WORK_HEADS = new Set(["œuvre","oeuvre","ouvrage","roman","film","poème","poeme","texte"]);
  const EVENT_HEADS = new Set(["événement","evenement","rupture","révolution","revolution","conflit","guerre","indépendance","independance","transformation","conférence","conference"]);
  const GROUP_HEADS = new Set(["peuple","civilisation","groupe","communauté","communaute"]);
  const PLACE_HEADS = new Set(["lieu","fleuve","espace","cité","cite","détroit","detroit"]);

  const OVERRIDES = {
    "astro-mystery-transit-186": {
      missionQuestion: "Quelle méthode de détection des exoplanètes est décrite ?",
      answerInstruction: "Réponds par le nom de la méthode, pas par « exoplanète » ni par « éclipse ».",
      answerFormat: "nom d’une méthode",
      clues: [
        "Le phénomène observé ressemble à une minuscule éclipse vue depuis la Terre.",
        "La planète passe entre son étoile et nous ; la baisse de lumière revient à chaque orbite.",
        "Dernier coup de pouce : le terme attendu commence par « trans… »."
      ]
    },
    "astronomy-mystery-transit-method-235": {
      missionQuestion: "Quelle méthode de détection des exoplanètes est décrite ?",
      answerInstruction: "Réponds par le nom de la méthode, pas par le nom de l’objet détecté.",
      answerFormat: "nom d’une méthode",
      clues: [
        "Le phénomène observé ressemble à une minuscule éclipse.",
        "Le signal se répète quand la planète repasse devant son étoile.",
        "Dernier coup de pouce : le terme attendu commence par « trans… »."
      ]
    },
    "astro-mystery-spectrum-186": {
      missionQuestion: "Quelle méthode permet d’identifier la composition d’un astre grâce à sa lumière ?",
      answerInstruction: "Réponds par le nom de la méthode d’analyse.",
      answerFormat: "nom d’une méthode"
    },
    "astro-mystery-cmb-186": {
      missionQuestion: "Quel rayonnement ancien de l’Univers est décrit ?",
      answerInstruction: "Réponds par le nom du rayonnement, pas simplement par « Big Bang ».",
      answerFormat: "nom d’un rayonnement"
    },
    "art-mystery-muqarnas-234": {
      missionQuestion: "Quel élément architectural en alvéoles est décrit ?",
      answerInstruction: "Réponds par le nom de cet élément architectural.",
      answerFormat: "nom architectural"
    },
    "cinema-mystery-kuleshov-177": {
      missionQuestion: "Quel effet de montage montre que deux plans successifs changent le sens d’une image ?",
      answerInstruction: "Réponds par le nom de l’effet de montage.",
      answerFormat: "nom d’un effet"
    },
    "economy-mystery-comparative-advantage-233": {
      missionQuestion: "Quelle notion explique qu’un pays puisse gagner à se spécialiser même s’il est moins productif partout ?",
      answerInstruction: "Réponds par le nom de la notion économique.",
      answerFormat: "notion économique"
    },
    "geography-mystery-malacca-177": {
      missionQuestion: "Quel détroit stratégique d’Asie du Sud-Est est décrit ?",
      answerInstruction: "Réponds par le nom du détroit.",
      answerFormat: "nom d’un lieu"
    },
    "music-mystery-breakbeat-177": {
      missionQuestion: "Quel passage rythmique isolé puis répété par les DJ est décrit ?",
      answerInstruction: "Réponds par le nom de cette technique ou de ce passage musical.",
      answerFormat: "terme musical"
    },
    "music-mystery-swing-175": {
      missionQuestion: "Quelle sensation rythmique caractéristique du jazz est décrite ?",
      answerInstruction: "Réponds par le nom de la sensation rythmique.",
      answerFormat: "terme musical"
    },
    "literature-mystery-three-unities-232": {
      missionQuestion: "Quelle règle théâtrale réunit unité d’action, de temps et de lieu ?",
      answerInstruction: "Réponds par le nom de la règle.",
      answerFormat: "nom d’une règle"
    },
    "science-mystery-common-ancestor-177": {
      missionQuestion: "Quelle relation évolutive entre plusieurs espèces est décrite ?",
      answerInstruction: "Réponds par l’expression biologique attendue.",
      answerFormat: "notion biologique"
    }
  };

  function firstWord(subject = "") {
    return clean(subject).toLowerCase().split(/[\s’'-]+/).filter(Boolean)[0] || "sujet";
  }

  function articleFor(subject = "") {
    return FEMALE_HEADS.has(firstWord(subject)) ? "Quelle" : "Quel";
  }

  function explicitQuestion(mystery = {}) {
    const override = OVERRIDES[mystery.id]?.missionQuestion;
    if (override) return override;
    const subject = clean(mystery.subjectType || (typeof mysterySubjectTypeLabel === "function" ? mysterySubjectTypeLabel(mystery, relatedLessonForMystery?.(mystery) || {}) : "sujet précis"))
      .replace(/^un(?:e)?\s+/i, "")
      .replace(/[.?!]+$/g, "");
    const head = firstWord(subject);
    const article = articleFor(subject);
    const ending = article === "Quelle" ? "décrite" : "décrit";
    if (/civilisation ou peuple/i.test(subject)) return "Quelle civilisation ou quel peuple est décrit dans ce dossier ?";
    if (/peuple ou groupe/i.test(subject)) return "Quel peuple ou groupe historique est décrit dans ce dossier ?";
    if (/période et système/i.test(subject)) return "Quelle période du cinéma et quel système de production sont décrits ?";
    if (/savant et (?:observateur|expérimentateur)/i.test(subject)) return "Quel savant est décrit dans ce dossier ?";
    if (/révolution et indépendance/i.test(subject)) return "Quelle révolution menant à une indépendance est décrite ?";
    if (PERSON_HEADS.has(head)) return `Quel ${subject} est décrit dans ce dossier ?`;
    if (WORK_HEADS.has(head)) return `${article} ${subject} faut-il identifier ?`;
    if (PLACE_HEADS.has(head)) return `${article} ${subject} faut-il identifier ?`;
    return `${article} ${subject} est ${ending} dans ce dossier ?`;
  }

  function answerInstruction(mystery = {}) {
    const override = OVERRIDES[mystery.id]?.answerInstruction;
    if (override) return override;
    const subject = clean(mystery.subjectType || "sujet précis");
    const head = firstWord(subject);
    if (PERSON_HEADS.has(head)) return "Réponds par le nom de la personne.";
    if (METHOD_HEADS.has(head)) return "Réponds par le nom de la méthode ou du procédé, pas seulement par le phénomène observé.";
    if (WORK_HEADS.has(head)) return "Réponds par le titre ou le nom précis de l’œuvre.";
    if (EVENT_HEADS.has(head)) return "Réponds par le nom de l’événement ou de la transformation.";
    if (GROUP_HEADS.has(head)) return "Réponds par le nom du peuple, du groupe ou de la civilisation.";
    if (PLACE_HEADS.has(head)) return "Réponds par le nom précis du lieu ou de l’espace.";
    if (/date|année|annee/i.test(subject)) return "Réponds par une année.";
    return "Donne le nom précis attendu, pas seulement le thème général.";
  }

  function answerFormat(mystery = {}) {
    const override = OVERRIDES[mystery.id]?.answerFormat;
    if (override) return override;
    const subject = clean(mystery.subjectType || "sujet précis").toLowerCase();
    const head = firstWord(subject);
    if (PERSON_HEADS.has(head)) return "nom d’une personne";
    if (METHOD_HEADS.has(head)) return "nom d’une méthode ou technique";
    if (WORK_HEADS.has(head)) return "titre ou nom d’une œuvre";
    if (EVENT_HEADS.has(head)) return "nom d’un événement";
    if (GROUP_HEADS.has(head)) return "nom d’un peuple ou groupe";
    if (PLACE_HEADS.has(head)) return "nom d’un lieu";
    return subject;
  }

  function stripGenericPrefix(value = "") {
    return clean(value)
      .replace(/^(?:le|la|les|l[’']|un|une|des)\s+/i, "")
      .replace(/^(?:méthode|methode|règle|regle|théorie|theorie|principe|effet|loi|notion)\s+(?:de|du|des|d[’'])\s+/i, "")
      .trim();
  }

  function normalizedAliasVariants(mystery = {}) {
    const values = [mystery.answer, ...(Array.isArray(mystery.aliases) ? mystery.aliases : [])].filter(Boolean);
    const output = new Set(values.map(clean));
    values.forEach(value => {
      const noArticle = clean(value).replace(/^(?:le|la|les|l[’']|un|une|des)\s+/i, "");
      if (noArticle.length >= 4) output.add(noArticle);
      const core = stripGenericPrefix(value);
      if (core.length >= 5 && core.split(/\s+/).length <= 4) output.add(core);
      output.add(clean(value).replace(/[’']/g, " "));
    });
    return [...output].filter(value => value && value.length >= 3);
  }

  function answerSkeleton(answer = "") {
    const stop = new Set(["le","la","les","un","une","des","de","du","d","l","et","ou"]);
    const tokens = norm(answer).split(/\s+/).filter(token => token && !stop.has(token));
    const chosen = tokens.slice(-2);
    if (!chosen.length) return "le terme exact";
    return chosen.map(token => {
      const visible = token.length >= 9 ? 4 : token.length >= 6 ? 3 : token.length >= 4 ? 2 : 1;
      return `${token.slice(0, visible)}…`;
    }).join(" ");
  }

  function progressiveClues(mystery = {}) {
    const override = OVERRIDES[mystery.id]?.clues;
    if (override) return override.slice(0, 3);
    const source = (Array.isArray(mystery.clues) ? mystery.clues : [])
      .map(clue => typeof cleanMysteryCopy === "function" ? cleanMysteryCopy(clue, mystery) : clean(clue))
      .map(clean).filter(Boolean);
    const period = clean(mystery.periodHint || "");
    const first = source[0] || (period ? `Le repère principal est : ${period}.` : "Commence par identifier le domaine et la période.");
    const second = source[1] || source[0] || "Cherche le détail qui distingue ce sujet des réponses voisines.";
    const baseThird = source[2] || source[1] || "Le dernier indice précise directement le terme attendu.";
    const rescue = `Dernier coup de pouce : le nom attendu ressemble à « ${answerSkeleton(mystery.answer)} ».`;
    return [first, second, `${baseThird.replace(/[.!?…]+$/g, "")}. ${rescue}`].slice(0, 3);
  }

  data.mysteries.forEach(mystery => {
    mystery.missionQuestion = explicitQuestion(mystery);
    mystery.answerInstruction = answerInstruction(mystery);
    mystery.answerFormat = answerFormat(mystery);
    mystery.aliases = normalizedAliasVariants(mystery);
    mystery.clues = progressiveClues(mystery);
    mystery.clarityRevision = "beta272";
  });

  // « moyen » était affiché « corsé », ce qui rendait presque tout le catalogue
  // plus intimidant que prévu. Les valeurs de score restent strictement identiques.
  difficultyLabel = function beta272DifficultyLabel(difficulty = "moyen") {
    if (difficulty === "facile") return "accessible";
    if (difficulty === "difficile") return "corsé";
    if (difficulty === "expert") return "expert";
    return "intermédiaire";
  };
  mysteryHintLabels = function beta272MysteryHintLabels() {
    return ["1 · Situer", "2 · Déduire", "3 · Presque la réponse"];
  };

  mysteryBriefMarkup = function beta272MysteryBriefMarkup(mystery = {}, lesson = {}) {
    const period = typeof mysteryPeriodLabel === "function" ? mysteryPeriodLabel(mystery, lesson) : clean(mystery.periodHint || "Sujet à situer");
    const question = mystery.missionQuestion || explicitQuestion(mystery);
    const instruction = mystery.answerInstruction || answerInstruction(mystery);
    const format = mystery.answerFormat || answerFormat(mystery);
    return `<section class="mystery-mission-v272" aria-label="Consigne du mystère">
      <span class="mystery-mission-v272__label">Ta mission</span>
      <h2>${escapeLocal(question)}</h2>
      <p>${escapeLocal(instruction)} <strong>Les variantes courantes sont acceptées.</strong></p>
      <div class="mystery-mission-v272__meta">
        <span><b>Réponse attendue</b>${escapeLocal(format)}</span>
        <span><b>Repère</b>${escapeLocal(period || "à déduire")}</span>
      </div>
    </section>`;
  };

  try {
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      mysteryClarity: {
        total: data.mysteries.length,
        explicitQuestions: data.mysteries.filter(item => item.missionQuestion).length,
        answerInstructions: data.mysteries.filter(item => item.answerInstruction).length,
        progressiveClues: data.mysteries.filter(item => Array.isArray(item.clues) && item.clues.length >= 3).length
      }
    };
  } catch {}
})();
