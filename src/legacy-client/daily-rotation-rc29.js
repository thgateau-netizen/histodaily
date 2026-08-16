/* HistoDaily RC29 — rotation quotidienne stricte des expéditions.
   - une expédition assignée reste stable pendant la journée
   - elle change le lendemain, même si elle n'a pas été jouée
   - un mystère déjà réussi sort de la rotation tant qu'il reste du contenu inédit
*/
(function histodailyRc29DailyRotation(){
  "use strict";

  const VERSION = "1.0.0-rc.48.0";
  const previousForDiscipline = typeof mysteryForDisciplineDayOffset === "function" ? mysteryForDisciplineDayOffset : null;
  const STARTER_HISTORY = new Set([
    "mystery-fire", "mystery-pyramids", "mystery-athens", "mystery-napoleon",
    "mystery-neolithic-agriculture", "mystery-nile", "mystery-minoens", "mystery-1789-rc39"
  ]);
  const STARTER_SCIENCE = new Set([
    "science-mystery-hypothesis-122", "science-mystery-experimental-proof-121",
    "science-mystery-double-helix-233", "science-mystery-immune-memory-235",
    "science-mystery-universal-gravity-236", "science-mystery-atomic-number-237"
  ]);
  const STARTER_ASTRONOMY = new Set([
    "astro-mystery-aurora-186", "astro-mystery-orbit-186",
    "astronomy-mystery-transit-method-235", "astronomy-mystery-synchronous-rotation-236",
    "astronomy-mystery-apollo11-236", "astronomy-mystery-solstice-237"
  ]);

  function assignmentMap(){
    if (!state.dailyMysteryAssignments || typeof state.dailyMysteryAssignments !== "object" || Array.isArray(state.dailyMysteryAssignments)) {
      state.dailyMysteryAssignments = {};
    }
    return state.dailyMysteryAssignments;
  }

  function dayKeyForOffset(offset = 0){
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - Math.max(0, Number(offset || 0)));
    return localDayKey(date.getTime());
  }

  function assignmentKey(disciplineId, offset = 0){
    return `${dayKeyForOffset(offset)}|${disciplineById(disciplineId || "history").id}`;
  }

  function stableHash(value = ""){
    let hash = 2166136261;
    const text = String(value || "");
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function mysteryFromAssigned(rawPool, assignedId){
    return rawPool.find(item => item?.id === assignedId) || null;
  }

  function preferredPool(id, rawPool){
    const solvedCount = typeof rc17SolvedMysteryCount === "function" ? rc17SolvedMysteryCount(id) : 0;
    let starterSet = null;
    let starterLimit = 0;
    if (id === "history") { starterSet = STARTER_HISTORY; starterLimit = 8; }
    else if (id === "science-inventions") { starterSet = STARTER_SCIENCE; starterLimit = 6; }
    else if (id === "astronomy") { starterSet = STARTER_ASTRONOMY; starterLimit = 6; }
    const starter = starterSet && solvedCount < starterLimit ? rawPool.filter(item => starterSet.has(item.id)) : [];

    // RC39 : sciences/astronomie montent plus doucement. Les premiers dossiers
    // doivent surtout apprendre le geste de raisonnement, pas sanctionner le jargon.
    const gentleDiscipline = id === "science-inventions" || id === "astronomy";
    const allowed = gentleDiscipline
      ? (solvedCount < 8 ? new Set(["facile"]) : solvedCount < 24 ? new Set(["facile", "moyen"]) : new Set(["facile", "moyen", "difficile"]))
      : (solvedCount < 4 ? new Set(["facile"]) : solvedCount < 30 ? new Set(["facile", "moyen"]) : new Set(["facile", "moyen", "difficile"]));
    const adapted = rawPool.filter(item => allowed.has(item.difficulty || "moyen"));
    const nonExpert = rawPool.filter(item => (item.difficulty || "moyen") !== "expert");
    return starter.length ? starter : (adapted.length ? adapted : (nonExpert.length ? nonExpert : rawPool));
  }

  function unsolved(items){
    return items.filter(item => item?.id && !mysterySolved(item.id));
  }

  function chooseDaily(id, rawPool){
    const assignments = assignmentMap();
    const key = assignmentKey(id, 0);
    const existing = mysteryFromAssigned(rawPool, assignments[key]);
    // Une fois le dossier du jour choisi, il ne change plus avant minuit,
    // même si le joueur le résout ensuite.
    if (existing) return existing;

    const preferred = preferredPool(id, rawPool);
    const unseenPreferred = unsolved(preferred);
    const unseenAll = unsolved(rawPool);
    let candidates = unseenPreferred.length ? unseenPreferred : (unseenAll.length ? unseenAll : preferred.length ? preferred : rawPool);

    // Le dossier doit changer d'un jour sur l'autre même si celui d'hier n'a pas été joué.
    const yesterdayId = assignments[assignmentKey(id, 1)] || "";
    if (yesterdayId && candidates.length > 1) {
      const withoutYesterday = candidates.filter(item => item.id !== yesterdayId);
      if (withoutYesterday.length) candidates = withoutYesterday;
    } else if (yesterdayId && candidates.length === 1 && candidates[0]?.id === yesterdayId) {
      // Si le filtre de difficulté est trop étroit, on élargit d'abord aux mystères inédits
      // plutôt que de recycler le même dossier deux jours de suite.
      const broader = unseenAll.filter(item => item.id !== yesterdayId);
      if (broader.length) candidates = broader;
    }

    if (!candidates.length) return null;
    const index = stableHash(`${dayKeyForOffset(0)}|${id}|histodaily-rc29`) % candidates.length;
    const chosen = candidates[index] || candidates[0];
    if (chosen?.id) {
      assignments[key] = chosen.id;
      // Garder l'historique utile sans laisser grossir le stockage indéfiniment.
      const keys = Object.keys(assignments).sort();
      if (keys.length > 180) keys.slice(0, keys.length - 180).forEach(oldKey => delete assignments[oldKey]);
      state.dailyMysteryAssignments = assignments;
      try { queueSaveState?.(80); } catch {}
    }
    return chosen || null;
  }

  mysteryForDisciplineDayOffset = function rc29MysteryForDisciplineDayOffset(disciplineId = activeDisciplineId(), offset = 0){
    const id = disciplineById(disciplineId || "history").id;
    const rawPool = publicMysteries(id) || [];
    if (!rawPool.length) return id === "history" ? null : (publicMysteries("history")?.[0] || null);

    const safeOffset = Math.max(0, Number(offset || 0));
    const assignments = assignmentMap();
    const historical = mysteryFromAssigned(rawPool, assignments[assignmentKey(id, safeOffset)]);
    if (historical) return historical;
    if (safeOffset === 0) return chooseDaily(id, rawPool);

    // Pour les jours antérieurs non enregistrés avant RC29, on conserve le comportement
    // d'archive historique afin de ne pas casser les sept jours déjà affichables.
    return previousForDiscipline ? previousForDiscipline(id, safeOffset) : rawPool[(todayIndex() - safeOffset + rawPool.length) % rawPool.length];
  };

  mysteryForDayOffset = function rc29MysteryForDayOffset(offset = 0){
    return mysteryForDisciplineDayOffset(activeDisciplineId(), offset);
  };
  dailyMystery = function rc29DailyMystery(){ return mysteryForDayOffset(0); };
  isTodayMystery = function rc29IsTodayMystery(id){ return Boolean(id && dailyMystery()?.id === id); };

  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, strictDailyRotation: true, noSolvedMysteryReplay: true };
    queueMicrotask(() => {
      try { window.HistoDailyDailyRotation?.reconcile?.({ renderAfter: true }); } catch {}
    });
  } catch {}
})();
