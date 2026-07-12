/* HistoDaily beta 244 — passe éditoriale anti-texte générique. */
(function histodailyBeta240Humanize(){
  "use strict";

  const VERSION = "1.0.0-beta.245.0";
  const packs = typeof READY_LESSON_PACKS === "object" && READY_LESSON_PACKS ? READY_LESSON_PACKS : {};

  const clean = value => String(value || "").replace(/\s+/g, " ").trim();
  const stripNumber = value => clean(value).replace(/^\d+[.)]?\s*/, "");
  const trimAtWord = (value, max = 230) => {
    const text = clean(value);
    if (text.length <= max) return text;
    return `${text.slice(0, max).replace(/\s+\S*$/, "").trim()}…`;
  };
  const sentences = value => clean(value)
    .split(/(?<=[.!?…])\s+/)
    .map(clean)
    .filter(sentence => sentence.length >= 24 && sentence.length <= 360);

  const STOP_WORDS = new Set([
    "alors","aucun","aucune","avec","avoir","cette","comme","comment","dans","depuis","des","donc","elle","elles","entre","est","etait","était","etre","être","font","leur","leurs","mais","meme","même","nous","parce","peut","plus","pour","pourquoi","quand","que","quel","quelle","quelles","quels","sans","selon","sont","sous","sur","tandis","tout","toute","toutes","tous","une","vers","vous"
  ]);
  const keywords = value => clean(value)
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter(word => word.length >= 4 && !STOP_WORDS.has(word));

  const genericWhy = value => {
    const text = clean(value).toLowerCase();
    return !text || /cette reponse reprend|cette réponse reprend|idee demontree|idée démontrée|idee expliquee|idée expliquée|mecanisme explique|mécanisme expliqué|question verifie|question vérifie/.test(text);
  };
  const genericTrap = value => {
    const text = clean(value).toLowerCase();
    return !text || /choisir une (formule|reponse|réponse|formulation).*(seduisante|séduisante|plausible|spectaculaire)|trop simplifiee|trop simplifiée|incompatible avec les observations|contredite par le cours/.test(text);
  };
  const genericDeeper = value => {
    const text = clean(value);
    return /Le vocabulaire astronomique distingue les observations/i.test(text)
      || /Les conclusions solides reposent sur plusieurs mesures indépendantes/i.test(text)
      || /Les phénomènes astronomiques deviennent plus clairs quand on précise/i.test(text);
  };

  const ordinalIndex = value => {
    const text = clean(value).toLowerCase();
    const direct = text.match(/(?:section|bloc|express)\s*(\d+)/i);
    if (direct) return Math.max(0, Number(direct[1]) - 1);
    const words = ["première","premiere","deuxième","deuxieme","seconde","troisième","troisieme","quatrième","quatrieme","cinquième","cinquieme","dernière","derniere"];
    const found = words.findIndex(word => text.includes(word));
    if (found < 0) return null;
    if (found <= 1) return 0;
    if (found <= 3) return 1;
    if (found <= 5) return 2;
    if (found <= 7) return 3;
    if (found <= 9) return 4;
    return -1;
  };

  function sectionIndexFor(item, fallbackIndex, pack) {
    let index = ordinalIndex(item?.evidence);
    if (index === null) {
      const kindMatch = clean(item?.kind).match(/(\d+)$/);
      if (kindMatch) index = Number(kindMatch[1]) - 1;
    }
    if (index === -1) return Math.max(0, (pack?.complete?.length || 1) - 1);
    if (Number.isInteger(index)) return Math.max(0, Math.min(index, (pack?.complete?.length || 1) - 1));
    return Math.max(0, Math.min(fallbackIndex, (pack?.complete?.length || 1) - 1));
  }

  function sentenceScore(sentence, item) {
    const target = new Set(keywords(`${item?.q || ""} ${item?.a || ""}`));
    const words = keywords(sentence);
    let score = 0;
    words.forEach(word => { if (target.has(word)) score += 4; });
    if (clean(item?.a) && clean(sentence).toLowerCase().includes(clean(item.a).toLowerCase())) score += 12;
    if (/^ce cours|^dans ce cours|^l'objectif|^l’objectif|^il faut|^l'enjeu|^l’enjeu/i.test(sentence)) score -= 6;
    if (sentence.length >= 55 && sentence.length <= 210) score += 3;
    return score;
  }

  function bestExplanation(pack, item, quizIndex) {
    const blocks = Array.isArray(pack?.complete) ? pack.complete : [];
    if (!blocks.length) return "";
    const preferredIndex = sectionIndexFor(item, quizIndex, pack);
    const preferred = sentences(blocks[preferredIndex]?.text || "");
    const all = blocks.flatMap(block => sentences(block?.text || ""));
    const pool = [...preferred, ...all.filter(sentence => !preferred.includes(sentence))];
    const ranked = pool
      .map(sentence => ({ sentence, score: sentenceScore(sentence, item) }))
      .sort((a, b) => b.score - a.score || a.sentence.length - b.sentence.length);
    const best = ranked.find(entry => entry.score >= 3)?.sentence || preferred[0] || "";
    return trimAtWord(best, 230);
  }

  function evidenceLabel(pack, item, quizIndex) {
    const blocks = Array.isArray(pack?.complete) ? pack.complete : [];
    if (!blocks.length) return "";
    const index = sectionIndexFor(item, quizIndex, pack);
    const title = stripNumber(blocks[index]?.title || "");
    return title ? `« ${title} »` : "";
  }

  function humanizeQuiz(pack) {
    if (!Array.isArray(pack?.quiz)) return;
    pack.quiz.forEach((item, index) => {
      if (!item || typeof item !== "object") return;
      if (genericWhy(item.why)) item.why = bestExplanation(pack, item, index);
      if (genericTrap(item.trap)) item.trap = "";
      item.evidence = evidenceLabel(pack, item, index) || clean(item.evidence);
      if (/^(rep[eè]re|question|quiz)[-\s]?\d+$/i.test(clean(item.kind))) item.kind = "";
    });
  }

  function humanizePack(pack) {
    if (!pack || typeof pack !== "object") return;
    humanizeQuiz(pack);
    if (Array.isArray(pack.deeper)) {
      pack.deeper = pack.deeper.filter(item => !genericDeeper(item?.text));
    }
    if (typeof pack.hook === "string") {
      pack.hook = clean(pack.hook)
        .replace(/^Ce cours (?:montre|explique|présente) que\s+/i, "")
        .replace(/^L’objectif est de\s+/i, "")
        .replace(/^L'objectif est de\s+/i, "");
      if (pack.hook) pack.hook = pack.hook.charAt(0).toUpperCase() + pack.hook.slice(1);
    }
    pack.humanEditorialRevision = VERSION;
  }

  Object.values(packs).forEach(humanizePack);

  const previousNormalizeQuizPack = typeof normalizeQuizPack === "function" ? normalizeQuizPack : null;
  if (previousNormalizeQuizPack) {
    normalizeQuizPack = function beta240NormalizeQuizPack(items, lesson, content) {
      const normalized = previousNormalizeQuizPack(items, lesson, content);
      const pack = content || {};
      return (normalized || []).map((item, index) => {
        const next = { ...item };
        if (genericWhy(next.why)) next.why = bestExplanation(pack, next, index);
        if (genericTrap(next.trap)) next.trap = "";
        next.evidence = evidenceLabel(pack, next, index) || clean(next.evidence);
        if (/^(rep[eè]re|question|quiz)[-\s]?\d+$/i.test(clean(next.kind))) next.kind = "";
        return next;
      });
    };
  }

  try {
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      humanEditorialRevision: VERSION,
      genericQuizFeedbackRemoved: true
    };
  } catch {}
})();
