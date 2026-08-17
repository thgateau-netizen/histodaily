const base=String(process.env.HISTODAILY_URL||'').replace(/\/$/,'');
const token=String(process.env.ANALYTICS_ADMIN_TOKEN||'');
const days=Math.max(7,Math.min(120,Number(process.argv[2]||30)));
if(!base||!token){
  console.error('Usage: HISTODAILY_URL=https://... ANALYTICS_ADMIN_TOKEN=... node scripts/retention-report.mjs [days]');
  process.exit(1);
}
const response=await fetch(`${base}/api/v1/analytics/cohorts?days=${days}`,{headers:{Authorization:`Bearer ${token}`},cache:'no-store'});
const data=await response.json().catch(()=>({}));
if(!response.ok||data.ok===false){console.error(data);process.exit(1);}
console.log(`HistoDaily — rétention sur ${days} jours — ${data.users} utilisateurs`);
console.log(`1re session: démarrage ${data.firstSession?.startRate ?? '—'}% · résolution ${data.firstSession?.solveRate ?? '—'}% · approfondissement ${data.firstSession?.deepDiveRate ?? '—'}%`);
console.log(`Rétention: D1 ${data.retention?.D1Rate ?? '—'}% (${data.retention?.D1}/${data.retention?.eligibleD1}) · D3 ${data.retention?.D3Rate ?? '—'}% (${data.retention?.D3}/${data.retention?.eligibleD3}) · D7 ${data.retention?.D7Rate ?? '—'}% (${data.retention?.D7}/${data.retention?.eligibleD7})`);
if(Array.isArray(data.byDiscipline)&&data.byDiscipline.length){
  console.table(data.byDiscipline.map(row=>({discipline:row.discipline,users:row.users,solve_pct:row.solveRate,D1_pct:row.D1Rate,D7_pct:row.D7Rate})));
}
if(Array.isArray(data.cohorts)&&data.cohorts.length){
  console.table(data.cohorts.slice(0,14).map(row=>({cohorte:row.day,users:row.users,solve_pct:row.solveRate,D1_pct:row.D1Rate,D3_pct:row.D3Rate,D7_pct:row.D7Rate})));
}
