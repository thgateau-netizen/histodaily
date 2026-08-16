import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const source=fs.readFileSync(path.join(root,'src/legacy-client/daily-hook-rc48.js'),'utf8');
const store=new Map();
const mysteries=[
  {id:'h1',disciplineId:'history',difficulty:'facile',missionQuestion:'Pourquoi le premier dossier histoire ?'},
  {id:'h2',disciplineId:'history',difficulty:'facile',missionQuestion:'Pourquoi le deuxième dossier histoire ?'},
  {id:'h3',disciplineId:'history',difficulty:'facile',missionQuestion:'Pourquoi le troisième dossier histoire ?'},
  {id:'s1',disciplineId:'science-inventions',difficulty:'facile',missionQuestion:'Pourquoi le premier dossier sciences ?'},
  {id:'s2',disciplineId:'science-inventions',difficulty:'facile',missionQuestion:'Pourquoi le deuxième dossier sciences ?'},
  {id:'s3',disciplineId:'science-inventions',difficulty:'facile',missionQuestion:'Pourquoi le troisième dossier sciences ?'}
];
const pools=id=>mysteries.filter(m=>m.disciplineId===id);
const localDayKey=ts=>{const d=new Date(ts||Date.now());return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
const tomorrow=()=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+1);return localDayKey(d.getTime());};
const today=localDayKey();
let active='history';
const state={tab:'rank',currentDiscipline:'history',dailyClaims:{[today]:{mysteryId:'h1',at:Date.now()}},dailyHistory:{},dailyMysteryAssignments:{[`${today}|history`]:'h1',[`${today}|science-inventions`]:'s1'},solvedMysteries:{h1:{at:Date.now()}},dailyTomorrowTeasers:{}};
const currentDaily=id=>pools(id).find(x=>x.id===state.dailyMysteryAssignments[`${today}|${id}`])||pools(id)[0]||null;
const context={
  console,Date,URLSearchParams,location:{search:''},state,
  localDayKey,disciplineById:id=>({id}),activeDisciplineId:()=> active,publicMysteries:id=>pools(id),
  mysteryForDisciplineDayOffset:(id,offset=0)=> offset===0?currentDaily(id):pools(id)[0],
  dailyMystery:()=>currentDaily(active),
  mysterySolved:id=>Boolean(state.solvedMysteries[id]),mysteryById:id=>mysteries.find(x=>x.id===id)||null,
  mysteryDisciplineId:m=>m.disciplineId,queueSaveState:()=>{},
  localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},
  window:{HistoDailyDifficultyRC40:{stageFor:()=> 'discovery',allowedFor:()=>['facile'],starterMysteries:id=>pools(id).map(x=>x.id)},setTimeout:()=>{}},
};
context.window.window=context.window;
vm.createContext(context);
vm.runInContext(source,context,{filename:'daily-hook-rc48.js'});
const api=context.window.HistoDailyDailyHookRC48;
const historyTeaser=api.ensureTomorrowTeaser(currentDaily('history'));
const historyKey=`${tomorrow()}|history`;
const historyStoreKey=`${today}|history`;

// Reproduce the user's bug: History is solved, then switch the home discipline to Sciences.
active='science-inventions'; state.currentDiscipline=active;
const scienceDoneBefore=api.dailyDone();
const scienceTeaser=api.ensureTomorrowTeaser(currentDaily('science-inventions'));
const scienceKey=`${tomorrow()}|science-inventions`;
const scienceStoreKey=`${today}|science-inventions`;

const checks={
  historyDailyDone:api.dailyDone('history')===true,
  scienceNotDoneAfterSwitch:scienceDoneBefore===false,
  historyTeaserExists:Boolean(historyTeaser?.id),
  scienceTeaserExists:Boolean(scienceTeaser?.id),
  historyExactTomorrowAssignment:state.dailyMysteryAssignments[historyKey]===historyTeaser?.id,
  scienceExactTomorrowAssignment:state.dailyMysteryAssignments[scienceKey]===scienceTeaser?.id,
  teaserStoreScopedByDiscipline:state.dailyTomorrowTeasers[historyStoreKey]?.mysteryId===historyTeaser?.id && state.dailyTomorrowTeasers[scienceStoreKey]?.mysteryId===scienceTeaser?.id,
  noCrossDisciplineTeaser:scienceTeaser?.disciplineId==='science-inventions' && historyTeaser?.disciplineId==='history',
  analyticsSnapshotAvailable:typeof api.retentionSnapshot==='function'
};
const errors=Object.entries(checks).filter(([,ok])=>!ok).map(([key])=>key);
const result={version:JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).version,status:errors.length?'failed':'passed',checks,historyTomorrow:historyTeaser?.id||null,scienceTomorrow:scienceTeaser?.id||null,errors};
fs.writeFileSync(path.join(root,'RC48-DAILY-HOOK-BEHAVIOR-AUDIT.json'),JSON.stringify(result,null,2)+'\n');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}console.log('RC48 Daily Hook discipline switch behavior test passed.');
