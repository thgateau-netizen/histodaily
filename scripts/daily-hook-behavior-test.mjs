import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const source=fs.readFileSync(path.join(root,'src/legacy-client/daily-hook-rc47.js'),'utf8');
const store=new Map();
const mysteries=[
  {id:'m1',disciplineId:'history',difficulty:'facile',missionQuestion:'Pourquoi le premier dossier ?'},
  {id:'m2',disciplineId:'history',difficulty:'facile',missionQuestion:'Pourquoi le deuxième dossier ?'},
  {id:'m3',disciplineId:'history',difficulty:'facile',missionQuestion:'Pourquoi le troisième dossier ?'}
];
const localDayKey=ts=>{const d=new Date(ts||Date.now());return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
const tomorrow=()=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+1);return localDayKey(d.getTime());};
const today=localDayKey();
const state={tab:'rank',dailyClaims:{[today]:{mysteryId:'m1',at:Date.now()}},dailyHistory:{},dailyMysteryAssignments:{[`${today}|history`]:'m1'},solvedMysteries:{m1:{at:Date.now()}},dailyTomorrowTeasers:{}};
const context={
  console,Date,URLSearchParams,location:{search:''},state,
  localDayKey,disciplineById:id=>({id}),activeDisciplineId:()=> 'history',publicMysteries:()=>mysteries,
  mysterySolved:id=>Boolean(state.solvedMysteries[id]),mysteryById:id=>mysteries.find(x=>x.id===id)||null,
  mysteryDisciplineId:m=>m.disciplineId,queueSaveState:()=>{},
  localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},
  window:{HistoDailyDifficultyRC40:{stageFor:()=> 'discovery',allowedFor:()=>['facile'],starterMysteries:()=>['m1','m2','m3']},setTimeout:()=>{}},
};
context.window.window=context.window;
vm.createContext(context);
vm.runInContext(source,context,{filename:'daily-hook-rc47.js'});
const api=context.window.HistoDailyDailyHookRC47;
const teaser=api.ensureTomorrowTeaser(mysteries[0]);
const key=`${tomorrow()}|history`;
const checks={
  dailyDone:api.dailyDone()===true,
  teaserExists:Boolean(teaser?.id),
  teaserDiffersFromToday:teaser?.id!=='m1',
  exactTomorrowAssignment:state.dailyMysteryAssignments[key]===teaser?.id,
  teaserStoreMatchesTomorrow:state.dailyTomorrowTeasers[today]?.mysteryId===teaser?.id && state.dailyTomorrowTeasers[today]?.forDay===tomorrow(),
  analyticsSnapshotAvailable:typeof api.retentionSnapshot==='function'
};
const errors=Object.entries(checks).filter(([,ok])=>!ok).map(([key])=>key);
const result={version:JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).version,status:errors.length?'failed':'passed',checks,selectedTomorrow:teaser?.id||null,assignmentKey:key,errors};
fs.writeFileSync(path.join(root,'RC47-DAILY-HOOK-BEHAVIOR-AUDIT.json'),JSON.stringify(result,null,2)+'\n');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}console.log('RC47 Daily Hook behavior test passed:',teaser.id);
