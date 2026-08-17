/* HistoDaily RC54 — centralized retention analytics.
   Local analytics remain the source of truth while offline. This layer synchronizes
   a small, allow-listed event set to the server without sending pseudo, email or friend code. */
(function histodailyRc54RetentionAnalytics(){
  "use strict";
  const VERSION = "1.0.0-rc.54.0";
  const LOCAL_KEY = "histodaily_retention_rc47";
  const SYNC_KEY = "histodaily_retention_rc54_sync";
  const ENDPOINT = "/api/v1/analytics/events";
  const MAX_BATCH = 24;
  const ALLOWED = new Set([
    "app_open", "push_open", "mystery_start", "mystery_solved", "teaser_seen",
    "deep_dive", "comeback_message_seen", "onboarding_completed"
  ]);
  const safe = (fn, fallback = null) => { try { const value = fn(); return value == null ? fallback : value; } catch { return fallback; } };
  const text = (value, max=90) => String(value || "").trim().replace(/\s+/g," ").slice(0,max);

  function localAnalytics(){
    try { const data=JSON.parse(localStorage.getItem(LOCAL_KEY)||"null"); return data&&typeof data==="object"?data:{}; }
    catch { return {}; }
  }
  function syncState(){
    try { const data=JSON.parse(localStorage.getItem(SYNC_KEY)||"null"); return data&&typeof data==="object"?data:{sent:{}}; }
    catch { return {sent:{}}; }
  }
  function writeSync(data){
    try {
      const sent=data?.sent&&typeof data.sent==="object"?data.sent:{};
      const keys=Object.keys(sent).sort((a,b)=>Number(sent[b]||0)-Number(sent[a]||0));
      if(keys.length>700) keys.slice(700).forEach(key=>delete sent[key]);
      localStorage.setItem(SYNC_KEY,JSON.stringify({...data,sent}));
    } catch {}
  }
  function playerId(){
    return text(safe(()=>playerIdMe(), safe(()=>`me-${localUserId()}`,"anonymous-device")),90) || "anonymous-device";
  }
  function localDateFromTime(at){
    const time=Number(at||Date.now());
    return safe(()=>localDayKey(time),new Date(time).toISOString().slice(0,10));
  }
  function firstSeenDay(){
    const analytics=localAnalytics();
    return text(analytics.firstSeenDay || Object.keys(analytics.activeDays||{}).sort()[0] || localDateFromTime(Date.now()),10);
  }
  function recentEnough(day){
    const parsed=Date.parse(`${String(day||"")}T12:00:00Z`);
    const today=Date.parse(`${localDateFromTime(Date.now())}T12:00:00Z`);
    if(!Number.isFinite(parsed)||!Number.isFinite(today)) return false;
    const age=Math.round((today-parsed)/86400000);
    return age>=-1&&age<=45;
  }
  function metaFor(event){
    const meta={};
    const copy=(key,max=90)=>{ if(event?.[key]!==undefined&&event?.[key]!==null&&event?.[key]!=="") meta[key]=text(event[key],max); };
    copy("disciplineId",32); copy("mysteryId",90); copy("lessonId",90); copy("source",48);
    if(Number.isFinite(Number(event?.gapDays))) meta.gapDays=Math.max(0,Math.min(90,Number(event.gapDays)));
    if(Number.isFinite(Number(event?.tries))) meta.tries=Math.max(0,Math.min(50,Number(event.tries)));
    if(Number.isFinite(Number(event?.hints))) meta.hints=Math.max(0,Math.min(10,Number(event.hints)));
    return meta;
  }
  function eventRow(event){
    if(!event || !ALLOWED.has(String(event.type||""))) return null;
    const pid=playerId();
    const day=text(event.day || localDateFromTime(event.at),10);
    const signature=text(event.signature || `${day}|${event.type}|${event.mysteryId||event.lessonId||event.source||""}`,180);
    if(!signature) return null;
    const meta=metaFor(event);
    return {
      eventId:text(`${pid}|${signature}`,220),
      playerId:pid,
      type:String(event.type),
      day,
      at:new Date(Number(event.at||Date.now())).toISOString(),
      firstSeenDay:firstSeenDay(),
      disciplineId:meta.disciplineId||"",
      mysteryId:meta.mysteryId||"",
      lessonId:meta.lessonId||"",
      source:meta.source||"",
      meta
    };
  }
  function onboardingEvent(){
    const at=Date.parse(String(state?.onboardingCompletedAt||""));
    if(!Number.isFinite(at)) return null;
    const day=localDateFromTime(at);
    return eventRow({
      signature:`${day}|onboarding_completed|${String(state?.onboardingVersion||"v1")}`,
      type:"onboarding_completed", day, at,
      disciplineId:safe(()=>activeDisciplineId(),state?.currentDiscipline||""), source:"onboarding"
    });
  }
  function pendingRows(){
    const analytics=localAnalytics();
    const sync=syncState();
    const sent=sync.sent&&typeof sync.sent==="object"?sync.sent:{};
    const rows=(Array.isArray(analytics.events)?analytics.events:[]).map(eventRow).filter(Boolean);
    const onboard=onboardingEvent(); if(onboard) rows.push(onboard);
    const unique=new Map(); rows.forEach(row=>unique.set(row.eventId,row));
    return Array.from(unique.values()).filter(row=>recentEnough(row.day)&&!sent[row.eventId]).slice(0,MAX_BATCH);
  }
  let syncing=false;
  async function syncNow(){
    if(syncing || navigator.onLine===false) return {ok:false,skipped:true,reason:"offline-or-busy"};
    const events=pendingRows();
    if(!events.length) return {ok:true,stored:0,pending:0};
    syncing=true;
    try {
      const response=await fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({events}),keepalive:true,cache:"no-store"});
      const json=await response.json().catch(()=>({}));
      if(!response.ok || json?.ok===false || json?.stored===false) return {ok:false,stored:0,pending:events.length,mode:json?.mode||`http-${response.status}`};
      const sync=syncState(); sync.sent=sync.sent&&typeof sync.sent==="object"?sync.sent:{};
      const stamp=Date.now(); events.forEach(row=>{sync.sent[row.eventId]=stamp;});
      sync.lastSyncAt=stamp; sync.lastMode=json?.mode||"server"; writeSync(sync);
      return {ok:true,stored:Number(json?.accepted||events.length),pending:Math.max(0,pendingRows().length),mode:json?.mode||"server"};
    } catch(error){ return {ok:false,stored:0,pending:events.length,mode:"network-error"}; }
    finally { syncing=false; }
  }
  function snapshot(){
    const sync=syncState();
    return {version:VERSION,playerId:playerId(),firstSeenDay:firstSeenDay(),pending:pendingRows().length,lastSyncAt:sync.lastSyncAt||null,lastMode:sync.lastMode||null};
  }

  window.setTimeout(syncNow,250);
  window.setInterval(syncNow,5000);
  window.addEventListener("online",()=>window.setTimeout(syncNow,100));
  document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="hidden") syncNow(); });
  window.addEventListener("pagehide",()=>syncNow());

  const api=Object.freeze({version:VERSION,syncNow,snapshot,pendingRows});
  window.HistoDailyRetentionRC54=api;
  try { window.HistoDaily={...(window.HistoDaily||{}),version:VERSION,retentionRC54:api}; } catch {}
})();
