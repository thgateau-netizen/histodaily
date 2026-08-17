/* HistoDaily RC49 — Daily Hook flow fixes.
   The daily expedition is now a complete ritual by itself.
   Course + quiz remain available as an optional deep dive.
   Also prepares an exact next-day teaser and records local D1/D3/D7 retention signals.
*/
(function histodailyRc49DailyHook(){
  "use strict";
  const VERSION = "1.0.0-rc.54.0";
  const ANALYTICS_KEY = "histodaily_retention_rc47"; // keep the same analytics history across the bug-fix release
  const TEASER_HISTORY_LIMIT = 120;
  const safe = (fn, fallback = null) => { try { const v = fn(); return v == null ? fallback : v; } catch { return fallback; } };
  const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const clean = value => String(value || "").replace(/\s+/g," ").trim();

  function dateKey(delta = 0){
    const d = new Date(); d.setHours(12,0,0,0); d.setDate(d.getDate() + Number(delta || 0));
    return localDayKey(d.getTime());
  }
  function dayNumber(key){
    const parts = String(key || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if(!parts) return NaN;
    return Math.floor(new Date(Number(parts[1]), Number(parts[2])-1, Number(parts[3]), 12).getTime() / 86400000);
  }
  function daysBetween(a,b){ const left=dayNumber(a), right=dayNumber(b); return Number.isFinite(left)&&Number.isFinite(right)?right-left:null; }
  function stableHash(value=""){
    let hash=2166136261;
    for(const ch of String(value)){ hash^=ch.charCodeAt(0); hash=Math.imul(hash,16777619); }
    return hash>>>0;
  }
  function disciplineId(raw){ return safe(()=>disciplineById(raw || "history").id, String(raw || "history")); }
  // The score/streak claim is global for a calendar day, but the home experience is
  // discipline-scoped. RC47 incorrectly used the global claim to decide what the
  // selected discipline should display, which made a solved History dossier leak
  // into Sciences, Art, etc.
  function todayClaimRecord(){ return safe(()=>state.dailyClaims?.[dateKey(0)] || state.dailyHistory?.[dateKey(0)], null); }
  function claimedMystery(){
    const claim=todayClaimRecord();
    return claim?.mysteryId ? safe(()=>mysteryById(claim.mysteryId), null) : null;
  }
  function dailyMysteryFor(rawId=activeDisciplineId()){
    const id=disciplineId(rawId);
    return safe(()=>mysteryForDisciplineDayOffset(id,0), safe(()=>dailyMystery(),null));
  }
  function dailyDone(rawId=activeDisciplineId()){
    const mystery=dailyMysteryFor(rawId);
    return Boolean(mystery?.id && safe(()=>mysterySolved(mystery.id), Boolean(state.solvedMysteries?.[mystery.id])));
  }

  function analyticsRead(){
    try { const raw=JSON.parse(localStorage.getItem(ANALYTICS_KEY)||"null"); if(raw&&typeof raw==="object") return raw; } catch {}
    return { version:VERSION, firstSeenDay:dateKey(0), activeDays:{}, events:[], milestones:{} };
  }
  function analyticsWrite(data){
    try { localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data)); } catch {}
  }
  function record(type, meta={}){
    const data=analyticsRead();
    const today=dateKey(0);
    data.version=VERSION;
    data.firstSeenDay=data.firstSeenDay || today;
    data.activeDays=data.activeDays&&typeof data.activeDays==="object"?data.activeDays:{};
    data.activeDays[today]=Math.max(1, Number(data.activeDays[today]||0)+1);
    data.events=Array.isArray(data.events)?data.events:[];
    const signature=`${today}|${type}|${String(meta.mysteryId||meta.lessonId||meta.source||"")}`;
    if(!data.events.some(row=>row?.signature===signature)) data.events.push({ signature, type, day:today, at:Date.now(), ...meta });
    if(data.events.length>400) data.events=data.events.slice(-400);
    const offset=daysBetween(data.firstSeenDay,today);
    data.milestones=data.milestones&&typeof data.milestones==="object"?data.milestones:{};
    if([1,3,7].includes(offset)) data.milestones[`D${offset}`]=true;
    analyticsWrite(data);
    return data;
  }
  function retentionSnapshot(){
    const data=analyticsRead();
    const active=Object.keys(data.activeDays||{}).sort();
    return {
      firstSeenDay:data.firstSeenDay,
      activeDays:active.length,
      lastActiveDay:active.at(-1)||null,
      D1:Boolean(data.milestones?.D1), D3:Boolean(data.milestones?.D3), D7:Boolean(data.milestones?.D7),
      opens:(data.events||[]).filter(x=>x.type==="app_open").length,
      mysteryStarts:(data.events||[]).filter(x=>x.type==="mystery_start").length,
      mysterySolves:(data.events||[]).filter(x=>x.type==="mystery_solved").length,
      deepDives:(data.events||[]).filter(x=>x.type==="deep_dive").length,
      pushOpens:(data.events||[]).filter(x=>x.type==="push_open").length
    };
  }

  function assignmentMap(){
    if(!state.dailyMysteryAssignments || typeof state.dailyMysteryAssignments!=="object" || Array.isArray(state.dailyMysteryAssignments)) state.dailyMysteryAssignments={};
    return state.dailyMysteryAssignments;
  }
  function tomorrowAssignmentKey(id){ return `${dateKey(1)}|${disciplineId(id)}`; }
  function todayAssignmentKey(id){ return `${dateKey(0)}|${disciplineId(id)}`; }
  function recentAssignedIds(id, days=10){
    const map=assignmentMap(); const out=[]; const canonical=disciplineId(id);
    for(let delta=0; delta>=-days; delta--){ const value=map[`${dateKey(delta)}|${canonical}`]; if(value) out.push(String(value)); }
    return out;
  }
  function chooseTomorrow(id){
    const canonical=disciplineId(id); const map=assignmentMap(); const key=tomorrowAssignmentKey(canonical);
    const pool=safe(()=>publicMysteries(canonical),[])||[];
    if(!pool.length) return null;
    const existing=pool.find(item=>item?.id===map[key]);
    if(existing) return existing;
    const difficulty=window.HistoDailyDifficultyRC40 || null;
    const stage=safe(()=>difficulty?.stageFor?.(canonical),"discovery")||"discovery";
    const allowed=new Set(safe(()=>difficulty?.allowedFor?.(canonical),["facile"])||["facile"]);
    let preferred=pool.filter(item=>allowed.has(item?.difficulty||"moyen"));
    if(stage==="discovery"){
      const starters=new Set(safe(()=>difficulty?.starterMysteries?.(canonical),[])||[]);
      const starterPool=pool.filter(item=>starters.has(item.id));
      if(starterPool.length) preferred=starterPool;
    }
    const unsolved=items=>items.filter(item=>!safe(()=>mysterySolved(item.id), Boolean(state.solvedMysteries?.[item.id])));
    let candidates=unsolved(preferred);
    if(!candidates.length) candidates=unsolved(pool.filter(item=>(item?.difficulty||"moyen")!=="expert"));
    if(!candidates.length) candidates=unsolved(pool);
    if(!candidates.length) candidates=preferred.length?preferred:pool;
    const recent=new Set(recentAssignedIds(canonical,10));
    const fresh=candidates.filter(item=>!recent.has(String(item.id)));
    if(fresh.length) candidates=fresh;
    const todayId=map[todayAssignmentKey(canonical)] || dailyMysteryFor(canonical)?.id || "";
    if(todayId && candidates.length>1){ const changed=candidates.filter(item=>item.id!==todayId); if(changed.length)candidates=changed; }
    if(!candidates.length) return null;
    candidates=[...candidates].sort((a,b)=>stableHash(`${dateKey(1)}|${canonical}|${a.id}|rc47`)-stableHash(`${dateKey(1)}|${canonical}|${b.id}|rc47`));
    const chosen=candidates[0]||null;
    if(chosen?.id){
      map[key]=chosen.id;
      const keys=Object.keys(map).sort(); if(keys.length>TEASER_HISTORY_LIMIT*2) keys.slice(0,keys.length-TEASER_HISTORY_LIMIT*2).forEach(old=>delete map[old]);
      state.dailyMysteryAssignments=map;
      safe(()=>queueSaveState?.(80));
    }
    return chosen;
  }
  function teaserStore(){
    if(!state.dailyTomorrowTeasers || typeof state.dailyTomorrowTeasers!=="object" || Array.isArray(state.dailyTomorrowTeasers)) state.dailyTomorrowTeasers={};
    return state.dailyTomorrowTeasers;
  }
  function teaserKey(day,id){ return `${day}|${disciplineId(id)}`; }
  function ensureTomorrowTeaser(mystery=dailyMysteryFor()){
    if(!mystery) return null;
    const today=dateKey(0); const store=teaserStore();
    const id=disciplineId(safe(()=>mysteryDisciplineId(mystery), mystery.disciplineId||mystery.discipline||activeDisciplineId()));
    const key=teaserKey(today,id);
    let saved=store[key];
    // One-time compatibility with RC47's day-only teaser key. Only migrate it
    // when it belongs to the same discipline; otherwise ignore it completely.
    if(!saved && store[today]?.disciplineId===id){ saved=store[today]; store[key]=saved; }
    if(saved?.mysteryId){
      const found=safe(()=>mysteryById(saved.mysteryId),null);
      if(found && disciplineId(safe(()=>mysteryDisciplineId(found), found.disciplineId||found.discipline||id))===id) return found;
    }
    const next=chooseTomorrow(id);
    if(next?.id){
      store[key]={ mysteryId:next.id, disciplineId:id, forDay:dateKey(1), createdAt:Date.now() };
      const keys=Object.keys(store).sort(); if(keys.length>120)keys.slice(0,keys.length-120).forEach(old=>delete store[old]);
      state.dailyTomorrowTeasers=store; safe(()=>queueSaveState?.(80));
    }
    return next;
  }
  function teaserText(mystery){
    if(!mystery) return "Un nouveau dossier t’attendra demain.";
    const mission=clean(mystery.missionQuestion);
    if(mission) return mission;
    const teaser=clean(safe(()=>mysteryTeaser(mystery), mystery.teaser||mystery.publicPrompt||mystery.prompt||""));
    if(teaser) return teaser.length>170?`${teaser.slice(0,167).trim()}…`:teaser;
    return clean(mystery.caseTitle||mystery.title||"Un nouveau dossier t’attendra demain.");
  }
  function takeaway(mystery){
    const lesson=mystery?.lessonId?safe(()=>lessonById(mystery.lessonId),null):null;
    const content=lesson?safe(()=>buildLessonContent(lesson),null):null;
    const item=Array.isArray(content?.takeaways)?content.takeaways[0]:null;
    const fromTakeaway=clean(typeof item==="string"?item:item?.text||"");
    if(fromTakeaway) return fromTakeaway;
    const explanation=clean(mystery?.explanation||"");
    if(!explanation) return "Garde surtout le mécanisme qui permettait de relier les indices à la réponse.";
    const sentence=explanation.match(/^.*?[.!?](?:\s|$)/)?.[0]||explanation;
    return sentence.length>220?`${sentence.slice(0,217).trim()}…`:sentence;
  }

  function enhanceSolvedMystery(){
    const mystery=safe(()=>currentMystery(),null); if(!mystery?.id || !safe(()=>mysterySolved(mystery.id),false))return;
    const solution=document.querySelector(".hd300-solution"); if(!solution || solution.querySelector("[data-rc47-takeaway]"))return;
    const resultLine=solution.querySelector(".hd300-result-line");
    const anchor=resultLine || solution.querySelector(".reward-feedback");
    const block=document.createElement("div"); block.className="rc47-takeaway"; block.dataset.rc47Takeaway="true";
    block.innerHTML=`<small>À retenir</small><p>${esc(takeaway(mystery))}</p>`;
    if(anchor) anchor.insertAdjacentElement("beforebegin",block); else solution.append(block);

    const lesson=mystery.lessonId?safe(()=>lessonById(mystery.lessonId),null):null;
    const lessonButton=solution.querySelector("[data-open-lesson]");
    if(lessonButton){ lessonButton.textContent="Approfondir ce sujet"; lessonButton.insertAdjacentHTML("beforebegin","<small class=\"rc47-optional-label\">Facultatif · si tu veux aller plus loin</small>"); lessonButton.addEventListener("click",()=>record("deep_dive",{mysteryId:mystery.id,lessonId:lesson?.id||mystery.lessonId,source:"solution"}),{once:true}); }
    const homeButton=solution.querySelector("[data-home-stop]"); if(homeButton) homeButton.textContent="Terminer pour aujourd’hui";

    if(isTodayMystery(mystery.id) || String(todayClaimRecord()?.mysteryId||"")===String(mystery.id)){
      const tomorrow=ensureTomorrowTeaser(mystery);
      if(tomorrow){
        const teaser=document.createElement("div"); teaser.className="rc47-tomorrow-teaser";
        teaser.innerHTML=`<small>Demain</small><p>${esc(teaserText(tomorrow))}</p>`;
        const actions=solution.querySelector(".hd34-solved-next"); if(actions)actions.insertAdjacentElement("beforebegin",teaser); else solution.append(teaser);
        record("teaser_seen",{mysteryId:tomorrow.id,source:"solution"});
      }
    }
  }

  function openDeepDiveLesson(lessonId){
    const id=String(lessonId||"");
    if(!id)return false;
    const lesson=safe(()=>curatedLessonById(id), safe(()=>lessonById(id),null));
    if(!lesson)return false;
    const world=safe(()=>lessonWorld(lesson),{})||{};
    const did=safe(()=>lessonDisciplineId(lesson),activeDisciplineId())||activeDisciplineId();
    // Do not rely on a local `openLesson` helper from another renderer: those helpers
    // live inside their own function/IIFE and are not available from the home hook.
    setState({
      tab:"lesson",
      currentLessonId:lesson.id,
      currentDiscipline:did,
      currentWorld:world.id||state.currentWorld,
      currentGroup:world.group||state.currentGroup,
      lessonView:"complete",
      lessonFocus:"complete"
    });
    return true;
  }

  function optionalDeepDiveMarkup(mystery){
    const lesson=mystery?.lessonId?safe(()=>lessonById(mystery.lessonId),null):null;
    if(!lesson)return "";
    const done=safe(()=>lessonDone(lesson.id),false);
    const title=clean(safe(()=>buildLessonContent(lesson)?.title,lesson.title||"Approfondir le sujet"));
    const did=safe(()=>lessonDisciplineId(lesson),mystery?.discipline||"");
    const english=did==="english";
    const kicker=done?"Pour aller plus loin":(english?"6 expressions utiles · 5 min":"Si tu as 5 minutes de plus");
    const action=done?"Revoir le sujet":(english?"Pratiquer l’anglais":"Approfondir le sujet");
    return `<section class="rc47-deep-dive" aria-label="Approfondissement facultatif"><button type="button" data-rc47-deep-dive="${esc(lesson.id)}"><span><small>${kicker}</small><b>${action}</b><em>${esc(title)}</em></span><i>→</i></button></section>`;
  }
  function enhanceHome(){
    const home=document.querySelector(".rc24-home"); if(!home)return;
    const hero=home.querySelector(".rc24-hero"); if(!hero)return;
    const activeId=disciplineId(activeDisciplineId());
    const mystery=dailyMysteryFor(activeId);
    const solved=Boolean(mystery?.id && safe(()=>mysterySolved(mystery.id), Boolean(state.solvedMysteries?.[mystery.id])));
    if(!solved){
      const route=hero.querySelector(".rc24-route"); if(route){ route.classList.add("rc47-ritual-note"); route.innerHTML="<span><b>2–4 min</b> · un dossier, une révélation</span>"; }
      const primary=hero.querySelector("[data-rc24-primary]"); if(primary)primary.addEventListener("click",()=>{ const m=dailyMysteryFor(activeId); record("mystery_start",{mysteryId:m?.id||"",disciplineId:activeId,source:"home"}); },{once:true});
      return;
    }
    // Everything below is derived from the currently selected discipline. Never
    // reuse the global daily claim here: it may belong to another discipline.
    const claimedDiscipline=activeId;
    const discipline=safe(()=>disciplineById(claimedDiscipline),null);
    if(discipline?.accent) home.style.setProperty("--world",discipline.accent);
    [...hero.classList].filter(name=>name.startsWith("art-")).forEach(name=>hero.classList.remove(name));
    hero.classList.add("has-art",`art-${claimedDiscipline}`);
    const tomorrow=ensureTomorrowTeaser(mystery);
    const content=hero.querySelector(".rc24-hero-content");
    if(content){
      content.innerHTML=`<p>Expédition terminée</p><h2 id="rc24-hero-title">C’est fait pour aujourd’hui</h2><span>Tu as eu ta révélation du jour. Le cours est maintenant facultatif.</span><div class="rc43-done-note"><span>✓</span><b>Journée validée</b></div>${tomorrow?`<div class="rc47-home-teaser"><small>Demain</small><strong>${esc(teaserText(tomorrow))}</strong></div>`:""}`;
    }
    const route=hero.querySelector(".rc24-route"); if(route){route.classList.add("rc47-ritual-note","is-done");route.innerHTML="<span>✓ Reviens demain pour un nouveau dossier</span>";}
    home.querySelector(".rc44-optional-next")?.remove();
    home.querySelector(".rc47-deep-dive")?.remove();
    const deep=optionalDeepDiveMarkup(mystery);
    if(deep){hero.insertAdjacentHTML("afterend",deep);const btn=home.querySelector("[data-rc47-deep-dive]");btn?.addEventListener("click",()=>{const lessonId=btn.dataset.rc47DeepDive||"";record("deep_dive",{mysteryId:mystery?.id||"",lessonId,source:"home"});openDeepDiveLesson(lessonId);});}
    if(tomorrow)record("teaser_seen",{mysteryId:tomorrow.id,source:"home"});
  }

  const previousSubmitGuess=typeof submitGuess==="function"?submitGuess:null;
  if(previousSubmitGuess) submitGuess=function rc49SubmitGuess(event){
    const mystery=safe(()=>currentMystery(),null); const wasSolved=Boolean(mystery?.id&&safe(()=>mysterySolved(mystery.id),false));
    const result=previousSubmitGuess(event);
    window.setTimeout(()=>{
      const nowSolved=Boolean(mystery?.id&&safe(()=>mysterySolved(mystery.id),false));
      if(!wasSolved&&nowSolved){ record("mystery_solved",{mysteryId:mystery.id,disciplineId:safe(()=>mysteryDisciplineId(mystery),activeDisciplineId()),tries:Number(state.solvedMysteries?.[mystery.id]?.tries||1),hints:Number(state.solvedMysteries?.[mystery.id]?.hints||0)}); ensureTomorrowTeaser(mystery); }
    },0);
    return result;
  };

  const previousRenderMystery=typeof renderMystery==="function"?renderMystery:null;
  if(previousRenderMystery) renderMystery=function rc49RenderMystery(){const out=previousRenderMystery();window.setTimeout(enhanceSolvedMystery,0);return out;};
  const previousRenderHome=typeof renderHome==="function"?renderHome:null;
  if(previousRenderHome) renderHome=function rc49RenderHome(){const out=previousRenderHome();window.setTimeout(enhanceHome,0);return out;};

  record("app_open",{source:new URLSearchParams(location.search).get("source")||"direct"});
  if(new URLSearchParams(location.search).get("source")?.startsWith("push")) record("push_open",{source:new URLSearchParams(location.search).get("source")});
  if(dailyDone()) ensureTomorrowTeaser(dailyMysteryFor());

  const api=Object.freeze({ version:VERSION, dailyDone, dailyMysteryFor, ensureTomorrowTeaser, teaserText, retentionSnapshot, record, openDeepDiveLesson });
  window.HistoDailyDailyHookRC49=api;
  window.HistoDailyDailyHookRC48=api; // compatibility alias
  window.HistoDailyDailyHookRC47=api; // compatibility alias
  try { window.HistoDaily={...(window.HistoDaily||{}),version:VERSION,dailyHookRC47:true,dailyHookRC48:true,dailyHookRC49:true,dailyHook:api}; } catch {}
  try { if(state?.tab==="home") window.setTimeout(()=>{renderHome();},0); else if(state?.tab==="mystery") window.setTimeout(enhanceSolvedMystery,0); } catch {}
})();
