const Module=require('module');
const originalLoad=Module._load;
Module._load=function(request,parent,isMain){
  if(request==='web-push') return {setVapidDetails(){},sendNotification:async()=>({})};
  return originalLoad.call(this,request,parent,isMain);
};
const {handleRequest,_rc54AggregateAnalytics}=require('../lib/hd-api.js');
const row=(player,type,day,discipline='history',first='2026-08-10',at=`${day}T12:00:00.000Z`)=>({player_id:player,event_type:type,event_day:day,first_seen_day:first,discipline_id:discipline,occurred_at:at});
const rows=[
  row('A','app_open','2026-08-10'),row('A','mystery_start','2026-08-10'),row('A','mystery_solved','2026-08-10'),row('A','deep_dive','2026-08-10'),row('A','app_open','2026-08-11'),row('A','app_open','2026-08-13'),row('A','app_open','2026-08-17'),
  row('B','app_open','2026-08-10','science'),row('B','mystery_start','2026-08-10','science'),row('B','app_open','2026-08-13','science'),
  row('C','app_open','2026-08-16','history','2026-08-16'),row('C','mystery_start','2026-08-16','history','2026-08-16'),row('C','mystery_solved','2026-08-16','history','2026-08-16'),row('C','app_open','2026-08-17','history','2026-08-16')
];
const summary=_rc54AggregateAnalytics(rows,'2026-08-17');
const checks={
  users:summary.users===3,
  solveRate:summary.firstSession.solveRate===66.7,
  deepDiveRate:summary.firstSession.deepDiveRate===33.3,
  d1:summary.retention.eligibleD1===3&&summary.retention.D1===2&&summary.retention.D1Rate===66.7,
  d3:summary.retention.eligibleD3===2&&summary.retention.D3===2&&summary.retention.D3Rate===100,
  d7:summary.retention.eligibleD7===2&&summary.retention.D7===1&&summary.retention.D7Rate===50,
  cohorts:summary.cohorts.length===2,
  disciplines:summary.byDiscipline.some(row=>row.discipline==='history'&&row.users===2)&&summary.byDiscipline.some(row=>row.discipline==='science'&&row.users===1)
};
const errors=Object.entries(checks).filter(([,ok])=>!ok).map(([name])=>name);
function mockRes(){ const holder={statusCode:200,payload:null}; return {holder,setHeader(){},status(code){holder.statusCode=code;return {json(payload){holder.payload=payload;return payload;}}}}; }
(async()=>{
  const eventsRes=mockRes();
  await handleRequest({url:'/api/v1/analytics/events',method:'POST',body:{events:[{eventId:'me-test|2026-08-17|app_open|direct',playerId:'me-test',type:'app_open',day:'2026-08-17',at:'2026-08-17T12:00:00.000Z',firstSeenDay:'2026-08-17',source:'direct'}]},query:{},headers:{}},eventsRes);
  checks.offlineIngestionGraceful=eventsRes.holder.statusCode===200&&eventsRes.holder.payload?.stored===false&&eventsRes.holder.payload?.mode==='local-only';
  const adminRes=mockRes();
  await handleRequest({url:'/api/v1/analytics/cohorts?days=30',method:'GET',body:{},query:{days:'30'},headers:{}},adminRes);
  checks.adminRouteProtected=adminRes.holder.statusCode===404;
  const finalErrors=Object.entries(checks).filter(([,ok])=>!ok).map(([name])=>name);
  const fs=require('fs');
  const report={version:'1.0.0-rc.54.0',status:finalErrors.length?'failed':'passed',checks,summary,errors:finalErrors};
  fs.writeFileSync('RC54-RETENTION-BEHAVIOR-AUDIT.json',JSON.stringify(report,null,2)+'\n');
  if(finalErrors.length){console.error(report);process.exit(1);} console.log('RC54 retention behavior: PASS — cohort math, offline fallback and admin protection verified.');
})().catch(error=>{console.error(error);process.exit(1);});
