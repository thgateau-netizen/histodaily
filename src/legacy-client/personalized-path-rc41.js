/* HistoDaily RC41 — one personalized next action, no new dashboard. */
(function histodailyRc41PersonalizedPath(){
  "use strict";
  const VERSION="1.0.0-rc.43.0";
  const safe=(fn,fallback=null)=>{try{return fn();}catch{return fallback;}};

  function did(raw){ return safe(()=>disciplineById(raw||"history").id,String(raw||"history")); }
  function dname(raw){ const d=safe(()=>disciplineById(raw),null); return String(d?.title||d?.label||raw||""); }
  function lessonDiscipline(lesson){
    return did(safe(()=>lessonDisciplineId(lesson),safe(()=>worldDisciplineId(lessonWorld(lesson)),state?.currentDiscipline||"history")));
  }
  function lessonsForDiscipline(id){ return safe(()=>allLessons().filter(item=>lessonDiscipline(item)===did(id)),[])||[]; }
  function solvedCount(id){ return safe(()=>rc17SolvedMysteryCount(did(id)),0)||0; }
  function progress(id){
    const p=safe(()=>window.HistoDailyDifficultyRC40?.progressFor?.(did(id)),null);
    if(p)return p;
    const lessons=lessonsForDiscipline(id); const done=lessons.filter(item=>safe(()=>lessonDone(item.id),false)).length;
    return {id:did(id),lessons:done,solved:solvedCount(id),points:done+solvedCount(id)*2,stage:"discovery"};
  }
  function memory(){ return window.HistoDaily?.memory||null; }
  function dueFor(id){ return safe(()=>memory()?.validReviewEntries?.(did(id))||[],[])||[]; }
  function activeDisciplineIds(currentId){
    const ids=(typeof DISCIPLINES!=="undefined"?DISCIPLINES:[]).map(item=>item.id);
    const active=ids.filter(id=>{
      if(id===did(currentId))return true;
      const p=progress(id);
      return Number(p.points||0)>0 || dueFor(id).length>0;
    });
    return active.length?active:[did(currentId)];
  }
  function startedLesson(id){
    const lessons=lessonsForDiscipline(id);
    return lessons.find(lesson=>{
      if(safe(()=>lessonDone(lesson.id),false))return false;
      const answers=state?.quizProgress?.[lesson.id]?.answers||{};
      return Object.keys(answers).length>0;
    })||null;
  }
  function nextLesson(id,excludedId=""){
    const lessons=lessonsForDiscipline(id);
    return lessons.find(item=>String(item.id)!==String(excludedId||"")&&!safe(()=>lessonDone(item.id),false))
      || lessons.find(item=>!safe(()=>lessonDone(item.id),false))
      || lessons[0]||null;
  }
  function metaFor(lesson,id){
    const raw=safe(()=>lessonMetaLine(lesson),"")||safe(()=>lessonWorld(lesson)?.title,"")||"Cours";
    return `${dname(id)} · ${raw}`;
  }
  function loopComplete(currentId,linkedLesson){
    const mystery=safe(()=>mysteryForDisciplineDayOffset(did(currentId),0),null);
    const solved=Boolean(mystery?.id&&safe(()=>mysterySolved(mystery.id),false));
    const courseDone=!linkedLesson||Boolean(safe(()=>lessonDone(linkedLesson.id),false));
    return solved&&courseDone;
  }

  function nextAction(currentId,linkedLesson){
    const current=did(currentId);
    const active=activeDisciplineIds(current);

    // 1. Mémoire : une dette réelle est plus utile qu'un nouveau contenu.
    const reviewRows=active.map(id=>({id,due:dueFor(id)})).filter(row=>row.due.length);
    if(reviewRows.length){
      reviewRows.sort((a,b)=>(a.id===current?-1:0)-(b.id===current?-1:0)||b.due.length-a.due.length);
      const row=reviewRows[0];
      return {kind:"review",disciplineId:row.id,eyebrow:"À faire maintenant",title:`${row.due.length} notion${row.due.length>1?"s":""} à revoir`,meta:`${dname(row.id)} · séance courte`,action:"Réviser",count:row.due.length,reason:"memory"};
    }

    // 2. Continuité : ne pas abandonner un quiz/cours déjà commencé.
    const startedCurrent=startedLesson(current);
    if(startedCurrent)return {kind:"lesson",disciplineId:current,lesson:startedCurrent,eyebrow:"Reprendre",title:startedCurrent.title||"Cours en cours",meta:metaFor(startedCurrent,current),action:"Continuer",reason:"resume"};
    for(const id of active){
      if(id===current)continue;
      const lesson=startedLesson(id);
      if(lesson)return {kind:"lesson",disciplineId:id,lesson,eyebrow:"Reprendre",title:lesson.title||"Cours en cours",meta:metaFor(lesson,id),action:"Continuer",reason:"resume"};
    }

    // 3. Après la boucle du jour seulement : rééquilibrer un domaine déjà pratiqué, jamais imposer un nouvel univers.
    if(loopComplete(current,linkedLesson)&&active.length>=2){
      const currentPoints=Number(progress(current).points||0);
      const candidates=active.filter(id=>id!==current&&Number(progress(id).points||0)>0).map(id=>({id,p:progress(id)}));
      candidates.sort((a,b)=>Number(a.p.points||0)-Number(b.p.points||0));
      const weakest=candidates[0];
      if(weakest&&currentPoints-Number(weakest.p.points||0)>=8){
        const lesson=nextLesson(weakest.id);
        if(lesson)return {kind:"lesson",disciplineId:weakest.id,lesson,eyebrow:"Une autre piste",title:lesson.title||"Prochain cours",meta:metaFor(lesson,weakest.id),action:"Continuer",reason:"balance"};
      }
    }

    // 4. Sinon, rester dans l'univers choisi : comportement simple et prévisible.
    const lesson=nextLesson(current,linkedLesson?.id||"");
    if(lesson)return {kind:"lesson",disciplineId:current,lesson,eyebrow:"Prochaine étape",title:lesson.title||"Prochain cours",meta:metaFor(lesson,current),action:safe(()=>lessonDone(lesson.id),false)?"Revoir":"Continuer",reason:"current"};
    return {kind:"catalog",disciplineId:current,eyebrow:"À explorer",title:"Choisis un nouveau parcours",meta:dname(current),action:"Voir les cours",reason:"catalog"};
  }

  const api=Object.freeze({version:VERSION,nextAction,activeDisciplineIds,progress});
  window.HistoDailyPersonalizedPathRC41=api;
  try{window.HistoDaily={...(window.HistoDaily||{}),version:VERSION,personalizedPathRC41:true,personalizedPath:api};}catch{}
})();
