/* HistoDaily beta 244 — nettoyage éditorial et cohérence pédagogique. */
(function histodailyBeta241ContentCleanup(){
  "use strict";

  const VERSION = "1.0.0-beta.245.0";
  const packs = typeof READY_LESSON_PACKS === "object" && READY_LESSON_PACKS ? READY_LESSON_PACKS : {};

  const clean = value => String(value || "").replace(/\s+/g, " ").trim();
  const stripNumber = value => clean(value).replace(/^\d+[.)]?\s*/, "");
  const words = value => clean(value).split(/\s+/).filter(Boolean);
  const sentences = value => clean(value)
    .split(/(?<=[.!?…])\s+/)
    .map(clean)
    .filter(sentence => sentence.length >= 28 && sentence.length <= 420);
  const trimAtWord = (value, max = 205) => {
    const text = clean(value);
    if (text.length <= max) return text;
    return `${text.slice(0, max).replace(/\s+\S*$/, "").trim()}…`;
  };
  const normalize = value => clean(value)
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s'-]/g, " ");

  const STOP_WORDS = new Set([
    "alors","avec","avoir","cette","comme","dans","depuis","donc","elle","elles","entre","etait","était","etre","être","leur","leurs","mais","meme","même","nous","pour","quand","que","quel","quelle","quelles","quels","sans","selon","sont","sous","tout","toute","toutes","tous","une","vers","vous"
  ]);
  const keywords = value => normalize(value)
    .split(/\s+/)
    .filter(word => word.length >= 4 && !STOP_WORDS.has(word));

  const GENERIC_LABELS = new Set([
    "mécanisme","mecanisme","nuance","à retenir","a retenir","repère","repères","repere","reperes","méthode","methode","contexte","comparaison","vocabulaire","limite","échelle","echelle","attribution"
  ]);
  const weakMeta = value => /^(ce cours|dans ce cours|l['’]objectif|l['’]enjeu|il faut comprendre|on va voir|nous allons voir)/i.test(clean(value));
  const internalKind = value => /^(rep[eè]re|question|quiz|bloc|section)[-\s]?\d+$/i.test(clean(value));

  function firstUsefulSentence(text) {
    return sentences(text).find(sentence => !weakMeta(sentence)) || sentences(text)[0] || "";
  }

  function sectionSummaries(pack) {
    const blocks = Array.isArray(pack?.complete) ? pack.complete : [];
    return blocks.map(block => {
      const title = stripNumber(block?.title || "");
      const sentence = firstUsefulSentence(block?.text || "");
      if (!sentence) return "";
      return trimAtWord(title ? `${title} — ${sentence}` : sentence, 205);
    }).filter(item => words(item).length >= 9);
  }

  function evenlyPick(items, max = 4) {
    if (items.length <= max) return items.slice();
    const indexes = [];
    for (let i = 0; i < max; i += 1) indexes.push(Math.round(i * (items.length - 1) / (max - 1)));
    return [...new Set(indexes)].map(index => items[index]).filter(Boolean);
  }

  function normalizeCourseOrder(pack) {
    if (!Array.isArray(pack?.complete)) return;
    const entries = pack.complete.map((block, index) => {
      const match = clean(block?.title).match(/^(\d+)/);
      return { block, index, order: match ? Number(match[1]) : 999 };
    });
    if (entries.filter(item => item.order !== 999).length >= 2) {
      pack.complete = entries.sort((a, b) => a.order - b.order || a.index - b.index).map(item => item.block);
    }
  }

  function normalizeLearningPath(pack) {
    const summaries = sectionSummaries(pack);
    if (summaries.length >= 3) {
      const path = evenlyPick(summaries, 4);
      pack.learningPath = path;
      pack.keyFacts = path.slice();
    }
  }

  function normalizeTakeaways(pack) {
    if (!Array.isArray(pack?.takeaways)) return;
    const blocks = Array.isArray(pack.complete) ? pack.complete : [];
    const seen = new Set();
    pack.takeaways = pack.takeaways.map((item, index) => {
      if (!item) return null;
      if (typeof item === "string") return clean(item);
      let label = stripNumber(item.label || "");
      const text = clean(item.text || "");
      if (!text || words(text).length < 6) return null;
      if (!label || GENERIC_LABELS.has(normalize(label))) label = stripNumber(blocks[index]?.title || "");
      const key = normalize(text);
      if (seen.has(key)) return null;
      seen.add(key);
      return { ...item, label, text };
    }).filter(Boolean).slice(0, 4);
  }

  function overlapRatio(a, b) {
    const left = new Set(keywords(a));
    const right = new Set(keywords(b));
    if (!left.size || !right.size) return 0;
    let common = 0;
    left.forEach(word => { if (right.has(word)) common += 1; });
    return common / Math.min(left.size, right.size);
  }

  function normalizeDeeper(pack) {
    if (!Array.isArray(pack?.deeper)) return;
    const courseText = (pack.complete || []).map(block => clean(block?.text)).join(" ");
    const seen = new Set();
    pack.deeper = pack.deeper.map((item, index) => {
      if (!item || typeof item !== "object") return null;
      let title = stripNumber(item.title || "");
      const text = clean(item.text || "");
      if (!text || words(text).length < 10) return null;
      if ((!title || GENERIC_LABELS.has(normalize(title))) && words(text).length < 18) return null;
      if (!title || GENERIC_LABELS.has(normalize(title))) {
        const fallback = stripNumber(pack.complete?.[Math.min(index, (pack.complete?.length || 1) - 1)]?.title || "");
        title = fallback || title;
      }
      if (overlapRatio(text, courseText) > 0.88) return null;
      const key = normalize(`${title} ${text}`);
      if (seen.has(key)) return null;
      seen.add(key);
      return { ...item, title, text };
    }).filter(Boolean).slice(0, 3);
  }

  function sectionScore(block, item) {
    const target = new Set(keywords(`${item?.q || ""} ${item?.a || ""}`));
    const blockWords = keywords(`${block?.title || ""} ${block?.text || ""}`);
    let score = 0;
    blockWords.forEach(word => { if (target.has(word)) score += /\d/.test(word) ? 5 : 2; });
    const answer = clean(item?.a).toLowerCase();
    if (answer && clean(block?.text).toLowerCase().includes(answer)) score += 12;
    return score;
  }

  function bestQuizSection(pack, item) {
    const blocks = Array.isArray(pack?.complete) ? pack.complete : [];
    return blocks.map((block, index) => ({ block, index, score:sectionScore(block, item) }))
      .sort((a, b) => b.score - a.score || a.index - b.index)[0] || null;
  }

  function bestQuizExplanation(pack, item, match) {
    if (!match || match.score < 2) return "";
    const target = new Set(keywords(`${item?.q || ""} ${item?.a || ""}`));
    const ranked = sentences(match.block?.text || "").map(sentence => {
      let score = 0;
      keywords(sentence).forEach(word => { if (target.has(word)) score += /\d/.test(word) ? 5 : 2; });
      if (clean(item?.a) && sentence.toLowerCase().includes(clean(item.a).toLowerCase())) score += 10;
      if (weakMeta(sentence)) score -= 8;
      return { sentence, score };
    }).sort((a, b) => b.score - a.score || a.sentence.length - b.sentence.length);
    const best = ranked[0];
    return best && best.score >= 2 ? trimAtWord(best.sentence, 230) : "";
  }

  function normalizeQuiz(pack) {
    if (!Array.isArray(pack?.quiz)) return;
    pack.quiz.forEach(item => {
      if (!item || typeof item !== "object") return;
      const match = bestQuizSection(pack, item);
      const currentWhy = clean(item.why);
      const currentRelevant = overlapRatio(currentWhy, `${item.q || ""} ${item.a || ""}`) >= 0.15;
      if (!currentWhy || weakMeta(currentWhy) || !currentRelevant) item.why = bestQuizExplanation(pack, item, match);
      if (!match || match.score < 2) {
        item.evidence = "";
      } else {
        const title = stripNumber(match.block?.title || "");
        item.evidence = title ? `« ${title} »` : "";
      }
      if (internalKind(item.kind)) item.kind = "";
      if (clean(item.trap).split(/\s+/).length < 7) item.trap = "";
    });
  }

  function normalizeHook(pack) {
    if (typeof pack?.hook !== "string") return;
    let hook = clean(pack.hook)
      .replace(/^Ce cours (?:montre|explique|présente) que\s+/i, "")
      .replace(/^Dans ce cours,?\s*/i, "")
      .replace(/^L['’]objectif est de\s+/i, "")
      .replace(/^On va voir (?:comment|pourquoi)\s+/i, "");
    if (hook) hook = hook.charAt(0).toUpperCase() + hook.slice(1);
    pack.hook = hook;
  }

  function patchKnownGaps() {
    const append = (id, index, sentence) => {
      const block = packs[id]?.complete?.[index];
      if (!block || normalize(block.text).includes(normalize(sentence))) return;
      block.text = `${clean(block.text)}\n\n${sentence}`;
    };
    append("lit-don-quixote-modern-novel", 0, "La première partie paraît en 1605 et la seconde en 1615.");
    append("lit-poetry-modernity", 0, "Les Fleurs du mal paraissent en 1857.");
    append("lit-poetry-modernity", 3, "Le vers libre ne supprime pas le rythme : il l’organise autrement par les reprises, les coupes et les respirations.");
    append("history-reformations-print-culture", 0, "En 1517, Luther rend publique sa critique des indulgences et ouvre une controverse européenne.");
    append("astro-star-birth-fusion", 0, "Les étoiles naissent dans les régions les plus denses de nuages froids de gaz et de poussière.");
    append("astro-rocky-planets", 3, "Les vallées et anciens deltas de Mars témoignent d’écoulements d’eau liquide dans un passé plus humide.");
    append("astro-moon-mars-exploration", 4, "Robots et humains ne sont pas nécessairement rivaux : l’endurance et l’autonomie des machines complètent les capacités d’observation et de décision d’un équipage, au prix de risques très différents.");
    append("music-recording-studio-industry", 0, "Le phonographe introduit une rupture décisive : une performance sonore peut désormais être enregistrée puis reproduite.");
  }

  patchKnownGaps();
  Object.values(packs).forEach(pack => {
    if (!pack || typeof pack !== "object") return;
    normalizeCourseOrder(pack);
    normalizeHook(pack);
    normalizeTakeaways(pack);
    normalizeDeeper(pack);
    normalizeLearningPath(pack);
    normalizeQuiz(pack);
    pack.editorialRevision241 = VERSION;
  });

  const previousRenderLessonText = typeof renderLessonText === "function" ? renderLessonText : null;
  if (previousRenderLessonText) {
    renderLessonText = function beta241RenderLessonText(lesson, content) {
      let html = String(previousRenderLessonText(lesson, content) || "");
      html = html
        .replace(/<section class="hd238-course-landmarks"[\s\S]*?<\/section>/g, "")
        .replace(/<div class="key-facts[^\"]*"[^>]*>[\s\S]*?<\/div>/g, "")
        .replace(/<section class="text-block express-block compact-reminder"[^>]*>[\s\S]*?<\/section>/g, "")
        .replace(/Le problème est résolu\. Le cours explique maintenant le mécanisme, les preuves et les nuances derrière la réponse\./g, "Le problème est résolu. Le cours montre maintenant pourquoi cette réponse tient.")
        .replace(/Les quatre idées qui structurent la réponse/g, "")
        .replace(/Quatre étapes pour construire la réponse/g, "")
        .replace(/Fil du cours/g, "")
        .replace(/Avant le cours/g, "");
      return html;
    };
  }

  const audit = {
    version:VERSION,
    packs:Object.keys(packs).length,
    weakLearningPaths:Object.values(packs).filter(pack => (pack.learningPath || []).some(item => words(item).length < 9)).length,
    internalQuizKinds:Object.values(packs).reduce((sum, pack) => sum + (pack.quiz || []).filter(item => internalKind(item?.kind)).length, 0),
    genericShortDeeper:Object.values(packs).reduce((sum, pack) => sum + (pack.deeper || []).filter(item => GENERIC_LABELS.has(normalize(item?.title)) && words(item?.text).length < 18).length, 0)
  };
  audit.ok = audit.weakLearningPaths === 0 && audit.internalQuizKinds === 0 && audit.genericShortDeeper === 0;

  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version:VERSION, contentCleanup241:audit };
  } catch {}
  if (!audit.ok) try { console.warn("HistoDaily beta241 content cleanup audit", audit); } catch {}
})();
