/* HistoDaily RC41 — adaptive comfort: performance slows difficulty locally without adding UI complexity. */
(function histodailyRc41AdaptiveComfort(){
  "use strict";
  const VERSION = "1.0.0-rc.41.0";
  const previousGuidedMode = typeof rc17GuidedMysteryMode === "function" ? rc17GuidedMysteryMode : null;
  const clamp = (value, min=0, max=100) => Math.max(min, Math.min(max, Number(value) || 0));

  function disciplineId(raw){
    try { return disciplineById(raw || "history").id; }
    catch { return String(raw || "history"); }
  }
  function lessonDiscipline(lesson){
    if (!lesson) return "";
    try { return lessonDisciplineId(lesson); }
    catch {
      try { return worldDisciplineId(lessonWorld(lesson)); }
      catch { return ""; }
    }
  }
  function mysteryDiscipline(mystery){
    if (!mystery) return "";
    try { return mysteryDisciplineId(mystery); }
    catch { return String(mystery.disciplineId || mystery.discipline || "history"); }
  }

  function quizMetrics(rawId){
    const id = disciplineId(rawId);
    let answered = 0;
    let correct = 0;
    const lessonCount = new Set();
    for (const [lessonId, progress] of Object.entries(state?.quizProgress || {})) {
      const lesson = (() => { try { return lessonById(lessonId); } catch { return null; } })();
      if (!lesson || disciplineId(lessonDiscipline(lesson)) !== id) continue;
      const answers = progress?.answers && typeof progress.answers === "object" ? progress.answers : {};
      const correctMap = progress?.correct && typeof progress.correct === "object" ? progress.correct : {};
      const count = Object.keys(answers).length;
      if (!count) continue;
      lessonCount.add(String(lessonId));
      answered += count;
      correct += Object.values(correctMap).filter(Boolean).length;
    }
    const accuracy = answered ? correct / answered : null;
    return { answered, correct, lessons: lessonCount.size, accuracy, evidence: answered >= 10 };
  }

  function mysteryMetrics(rawId){
    const id = disciplineId(rawId);
    const catalog = (() => { try { return data?.mysteries || []; } catch { return []; } })();
    const byId = new Map(catalog.map(item => [String(item?.id || ""), item]));
    const rows = Object.entries(state?.solvedMysteries || {})
      .map(([mysteryId, meta]) => ({ mystery: byId.get(String(mysteryId)), meta: meta || {} }))
      .filter(row => row.mystery && disciplineId(mysteryDiscipline(row.mystery)) === id)
      .sort((a,b) => Number(b.meta?.at || 0) - Number(a.meta?.at || 0))
      .slice(0, 8);
    if (!rows.length) return { solved:0, sampled:0, avgTries:null, hintRate:null, firstTryRate:null, evidence:false };
    const tries = rows.map(row => Math.max(1, Number(row.meta?.tries || 1) || 1));
    const hinted = rows.filter(row => Number(row.meta?.hints ?? row.meta?.visibleHints ?? 0) > 0).length;
    const firstTry = rows.filter((row,index) => tries[index] <= 1).length;
    return {
      solved: Object.entries(state?.solvedMysteries || {}).filter(([mysteryId]) => {
        const mystery = byId.get(String(mysteryId));
        return mystery && disciplineId(mysteryDiscipline(mystery)) === id;
      }).length,
      sampled: rows.length,
      avgTries: tries.reduce((sum,value)=>sum+value,0) / tries.length,
      hintRate: hinted / rows.length,
      firstTryRate: firstTry / rows.length,
      evidence: rows.length >= 4
    };
  }

  function metricsFor(rawId){
    const id = disciplineId(rawId);
    const quiz = quizMetrics(id);
    const mysteries = mysteryMetrics(id);
    const components = [];
    if (quiz.evidence) components.push({ weight: 0.55, score: clamp((quiz.accuracy || 0) * 100) });
    if (mysteries.evidence) {
      const triesPenalty = Math.max(0, (Number(mysteries.avgTries || 1) - 1) * 18);
      const hintsPenalty = Number(mysteries.hintRate || 0) * 22;
      components.push({ weight: 0.45, score: clamp(100 - triesPenalty - hintsPenalty, 20, 100) });
    }
    const evidenceWeight = components.reduce((sum,item)=>sum+item.weight,0);
    const comfort = evidenceWeight
      ? Math.round(components.reduce((sum,item)=>sum+item.score*item.weight,0) / evidenceWeight)
      : 75;

    const strongSupport = Boolean(
      (quiz.evidence && Number(quiz.accuracy || 0) < 0.55) ||
      (mysteries.evidence && Number(mysteries.avgTries || 0) >= 3.2) ||
      (components.length >= 2 && comfort < 56)
    );
    const lightSupport = !strongSupport && Boolean(
      (quiz.evidence && Number(quiz.accuracy || 0) < 0.68) ||
      (mysteries.evidence && (Number(mysteries.avgTries || 0) >= 2.35 || Number(mysteries.hintRate || 0) >= 0.55)) ||
      (components.length >= 2 && comfort < 68)
    );
    const support = strongSupport ? "strong" : lightSupport ? "light" : "none";
    return { id, comfort, support, quiz, mysteries, hasEvidence: components.length > 0 };
  }

  function capStage(baseStage, rawId){
    const stage = String(baseStage || "discovery");
    if (stage === "discovery") return stage;
    const metrics = metricsFor(rawId);
    if (!metrics.hasEvidence || metrics.support === "none") return stage;
    if (metrics.support === "strong") {
      if (stage === "advanced" || stage === "intermediate") return "confidence";
      return stage;
    }
    if (metrics.support === "light" && stage === "advanced") return "intermediate";
    return stage;
  }

  function guidedMode(mystery){
    if (!mystery?.id) return false;
    if (previousGuidedMode && previousGuidedMode(mystery)) return true;
    const id = disciplineId(mysteryDiscipline(mystery));
    const metrics = metricsFor(id);
    let solved = 0;
    try { solved = Math.max(0, Number(rc17SolvedMysteryCount(id) || 0)); } catch {}
    // Le choix guidé se prolonge seulement si les résultats montrent un besoin réel.
    if (metrics.support === "strong" && solved < 30) return true;
    if (metrics.support === "light" && solved < 24) return true;
    return false;
  }

  if (previousGuidedMode) rc17GuidedMysteryMode = guidedMode;

  const api = Object.freeze({ version:VERSION, metricsFor, capStage, guidedMode });
  window.HistoDailyComfortRC41 = api;
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version:VERSION, adaptiveComfortRC41:true, comfort:api }; } catch {}
})();
