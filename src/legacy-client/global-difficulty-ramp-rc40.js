/* HistoDaily RC40 — global per-discipline progressive difficulty engine. */
(function histodailyRc40GlobalDifficultyRamp(){
  "use strict";
  const VERSION = "1.0.0-rc.42.0";
  const cfg = window.HD_GLOBAL_RAMP_RC40 || {};
  const thresholds = cfg.thresholds || { discoveryPoints: 8, confidencePoints: 20, intermediatePoints: 38 };
  const previousForDiscipline = typeof mysteryForDisciplineDayOffset === "function" ? mysteryForDisciplineDayOffset : null;

  function progressFor(disciplineId){
    const id = disciplineById(disciplineId || "history").id;
    const solved = Math.max(0, Number(typeof rc17SolvedMysteryCount === "function" ? rc17SolvedMysteryCount(id) : 0) || 0);
    let lessons = 0;
    try { lessons = Math.max(0, Number(disciplineProgress(id)?.done || 0)); } catch {}
    // Les mystères pèsent davantage car ils mesurent une restitution sans le cours sous les yeux.
    // Les cours validés comptent aussi : un utilisateur peut progresser sans faire une expédition chaque jour.
    const points = solved * 2 + Math.min(12, lessons);
    let stage = "advanced";
    if (solved < 4 && points < thresholds.discoveryPoints) stage = "discovery";
    else if (points < thresholds.confidencePoints) stage = "confidence";
    else if (points < thresholds.intermediatePoints) stage = "intermediate";
    const baseStage = stage;
    const comfortApi = window.HistoDailyComfortRC41 || null;
    try { stage = comfortApi?.capStage?.(baseStage, id) || baseStage; } catch { stage = baseStage; }
    const comfort = (() => { try { return comfortApi?.metricsFor?.(id) || null; } catch { return null; } })();
    return { id, solved, lessons, points, baseStage, stage, comfort };
  }

  function allowedDifficulties(stage){
    if (stage === "discovery") return new Set(["facile"]);
    if (stage === "confidence") return new Set(["facile", "moyen"]);
    if (stage === "intermediate") return new Set(["facile", "moyen", "difficile"]);
    return new Set(["facile", "moyen", "difficile", "expert"]);
  }

  function starterSet(id){ return new Set(cfg.starterMysteries?.[id] || []); }
  function mysteryIsSolved(id){ try { return Boolean(mysterySolved(id)); } catch { return Boolean(state.solvedMysteries?.[id]); } }
  function unsolved(items){ return (items || []).filter(item => item?.id && !mysteryIsSolved(item.id)); }
  function stableHash(value=""){
    let hash=2166136261;
    for(const char of String(value)){ hash^=char.charCodeAt(0); hash=Math.imul(hash,16777619); }
    return hash>>>0;
  }
  function dayKey(offset=0){
    const date=new Date(); date.setHours(12,0,0,0); date.setDate(date.getDate()-Math.max(0,Number(offset||0)));
    return localDayKey(date.getTime());
  }
  function assignments(){
    if(!state.dailyMysteryAssignments || typeof state.dailyMysteryAssignments!=="object" || Array.isArray(state.dailyMysteryAssignments)) state.dailyMysteryAssignments={};
    return state.dailyMysteryAssignments;
  }
  function key(id,offset=0){ return `${dayKey(offset)}|${id}`; }
  function assigned(rawPool,id,offset=0){
    const assignedId=assignments()[key(id,offset)];
    return rawPool.find(item=>item?.id===assignedId)||null;
  }

  function preferredPool(id,rawPool){
    const progress=progressFor(id);
    const allowed=allowedDifficulties(progress.stage);
    if(progress.stage==="discovery"){
      const starters=rawPool.filter(item=>starterSet(id).has(item.id));
      if(starters.length) return { progress, pool: starters, allowed };
    }
    const adapted=rawPool.filter(item=>allowed.has(item.difficulty||"moyen"));
    // Ne jamais faire entrer expert comme simple secours avant le stade avancé.
    const safeFallback=rawPool.filter(item=>(item.difficulty||"moyen")!=="expert");
    return { progress, pool: adapted.length?adapted:(safeFallback.length?safeFallback:rawPool), allowed };
  }

  function chooseToday(id,rawPool){
    const map=assignments();
    const selection=preferredPool(id,rawPool);
    const current=assigned(rawPool,id,0);
    if(current){
      const stillSuitable = selection.pool.some(item=>item.id===current.id) || mysteryIsSolved(current.id);
      if(stillSuitable) return current;
      // Migration RC40 : on remplace une ancienne assignation trop dure uniquement si elle n'a pas encore été jouée.
      delete map[key(id,0)];
    }
    const unseenPreferred=unsolved(selection.pool);
    const unseenSafe=unsolved(rawPool.filter(item=>selection.allowed.has(item.difficulty||"moyen")));
    const unseenNonExpert=unsolved(rawPool.filter(item=>(item.difficulty||"moyen")!=="expert"));
    const unseenAll=unsolved(rawPool);
    let candidates=unseenPreferred.length?unseenPreferred:
      unseenSafe.length?unseenSafe:
      unseenNonExpert.length?unseenNonExpert:
      unseenAll.length?unseenAll:
      selection.pool.length?selection.pool:rawPool;

    const yesterdayId=map[key(id,1)]||"";
    if(yesterdayId && candidates.length>1){
      const withoutYesterday=candidates.filter(item=>item.id!==yesterdayId);
      if(withoutYesterday.length)candidates=withoutYesterday;
    }
    if(!candidates.length)return null;
    const index=stableHash(`${dayKey(0)}|${id}|histodaily-rc41-adaptive-comfort`)%candidates.length;
    const chosen=candidates[index]||candidates[0];
    if(chosen?.id){
      map[key(id,0)]=chosen.id;
      const keys=Object.keys(map).sort();
      if(keys.length>180)keys.slice(0,keys.length-180).forEach(oldKey=>delete map[oldKey]);
      state.dailyMysteryAssignments=map;
      try{queueSaveState?.(80);}catch{}
    }
    return chosen||null;
  }

  mysteryForDisciplineDayOffset=function rc40MysteryForDisciplineDayOffset(disciplineId=activeDisciplineId(),offset=0){
    const id=disciplineById(disciplineId||"history").id;
    const rawPool=publicMysteries(id)||[];
    if(!rawPool.length)return id==="history"?null:(publicMysteries("history")?.[0]||null);
    const safeOffset=Math.max(0,Number(offset||0));
    const historical=assigned(rawPool,id,safeOffset);
    if(historical)return historical;
    if(safeOffset===0)return chooseToday(id,rawPool);
    return previousForDiscipline?previousForDiscipline(id,safeOffset):rawPool[(todayIndex()-safeOffset+rawPool.length)%rawPool.length];
  };
  mysteryForDayOffset=function rc40MysteryForDayOffset(offset=0){return mysteryForDisciplineDayOffset(activeDisciplineId(),offset);};
  dailyMystery=function rc40DailyMystery(){return mysteryForDayOffset(0);};
  isTodayMystery=function rc40IsTodayMystery(id){return Boolean(id&&dailyMystery()?.id===id);};

  const previousLabForToday = typeof disciplineLabForToday === "function" ? disciplineLabForToday : null;
  if(previousLabForToday){
    disciplineLabForToday=function rc40DisciplineLabForToday(disciplineId=activeDisciplineId()){
      const rawPool=disciplineLabPool(disciplineId);
      if(!rawPool.length)return null;
      const progress=progressFor(disciplineId);
      const allowed=allowedDifficulties(progress.stage);
      const adapted=rawPool.filter(item=>allowed.has(item.difficulty||"moyen"));
      const pool=adapted.length?adapted:rawPool.filter(item=>(item.difficulty||"moyen")!=="expert");
      const usable=pool.length?pool:rawPool;
      const seed=seededHash(`${disciplineId}:${localDayKey()}:rc40`);
      return usable[(seed+disciplineLabOffsetValue(disciplineId))%usable.length]||usable[0]||null;
    };
  }

  const api=Object.freeze({
    version:VERSION,
    progressFor,
    allowedFor:(disciplineId)=>[...allowedDifficulties(progressFor(disciplineId).stage)],
    stageFor:(disciplineId)=>progressFor(disciplineId).stage,
    starterMysteries:(disciplineId)=>[...(cfg.starterMysteries?.[disciplineById(disciplineId||"history").id]||[])]
  });
  window.HistoDailyDifficultyRC40=api;
  try{window.HistoDaily={...(window.HistoDaily||{}),version:VERSION,globalDifficultyRampRC40:true,difficulty:api};}catch{}
})();
