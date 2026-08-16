import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url)); const root=path.resolve(here,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'RC40-BUNDLE-MANIFEST.json'),'utf8'));
const read=n=>fs.readFileSync(path.join(root,'src','legacy-client',n),'utf8'); const noop=()=>{};
const el=new Proxy({style:{},dataset:{},classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},appendChild:noop,append:noop,remove:noop,setAttribute:noop,addEventListener:noop,querySelector:()=>null,querySelectorAll:()=>[]},{get:(t,p)=>p in t?t[p]:noop});
const document={readyState:'loading',body:el,documentElement:el,head:el,getElementById:()=>el,querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>Object.create(el),createTextNode:()=>({}),addEventListener:noop}; const storage={getItem:()=>null,setItem:noop,removeItem:noop,clear:noop};
const win={document,addEventListener:noop,removeEventListener:noop,setTimeout:()=>0,clearTimeout:noop,setInterval:()=>0,clearInterval:noop,queueMicrotask:noop,localStorage:storage,sessionStorage:storage,location:{href:'http://audit/',pathname:'/',search:'',hash:'',origin:'http://audit',reload:noop},history:{pushState:noop,replaceState:noop},navigator:{onLine:true,language:'fr-FR',serviceWorker:{register:async()=>({})}},matchMedia:()=>({matches:false,addEventListener:noop}),innerWidth:390,innerHeight:844};
const sandbox={console:{log:noop,warn:noop,error:noop,info:noop,debug:noop},window:win,document,localStorage:storage,sessionStorage:storage,navigator:win.navigator,location:win.location,history:win.history,setTimeout:win.setTimeout,clearTimeout:noop,setInterval:win.setInterval,clearInterval:noop,queueMicrotask:noop,fetch:async()=>({ok:false,status:404,json:async()=>({}),text:async()=>''}),AbortController:globalThis.AbortController,URL,URLSearchParams,TextEncoder,TextDecoder,Blob,Response,Request,Headers,crypto:globalThis.crypto,Intl,Date,Math,JSON,Object,Array,Set,Map,WeakMap,Promise,RegExp,String,Number,Boolean,Error,TypeError,performance:{now:()=>0},requestAnimationFrame:()=>0,cancelAnimationFrame:noop,alert:noop,confirm:()=>false,prompt:()=>null,CSS:{escape:String},structuredClone:globalThis.structuredClone,HD_ART:{}}; sandbox.globalThis=sandbox;win.window=win;win.globalThis=sandbox; const ctx=vm.createContext(sandbox);
for(const group of ['core','content']) for(const source of manifest.sources[group]||[]) vm.runInContext(read(source),ctx,{filename:source,timeout:12000});
const catalog=JSON.parse(vm.runInContext(`JSON.stringify({disciplines:DISCIPLINES.map(d=>d.id),packs:READY_LESSON_PACKS,mysteries:data.mysteries||[],config:window.HD_GLOBAL_RAMP_RC40||null})`,ctx));
vm.runInContext(read('global-difficulty-ramp-rc40.js'),ctx,{filename:'global-difficulty-ramp-rc40.js',timeout:12000});
const errors=[]; const pass=(c,m)=>{if(!c)errors.push(m)}; const warnings=[];
const expected=['history','art','cinema','science-inventions','astronomy','economy','geography','music','literature','philosophy','english'];
const cfg=catalog.config||{}; const mysteries=new Map(catalog.mysteries.map(m=>[m.id,m]));
const freshRuntime=JSON.parse(vm.runInContext(`JSON.stringify(Object.fromEntries(${JSON.stringify(['history','art','cinema','science-inventions','astronomy','economy','geography','music','literature','philosophy','english'])}.map(id=>{const p=window.HistoDailyDifficultyRC40.progressFor(id);const m=mysteryForDisciplineDayOffset(id,0);return [id,{stage:p.stage,solved:p.solved,lessons:p.lessons,mysteryId:m?.id||'',difficulty:m?.difficulty||''}]})))`,ctx));
pass(expected.every(id=>catalog.disciplines.includes(id)),`Disciplines manquantes: ${expected.filter(id=>!catalog.disciplines.includes(id)).join(', ')}`);
for(const id of expected){
  const starters=cfg.starterMysteries?.[id]||[]; const lessons=cfg.starterLessons?.[id]||[];
  pass(starters.length>=6,`${id}: moins de 6 mystères découverte (${starters.length})`);
  pass(new Set(starters).size===starters.length,`${id}: doublon dans les starters`);
  for(const mid of starters){ const m=mysteries.get(mid); pass(!!m,`${id}: mystère starter absent ${mid}`); if(m)pass(m.difficulty==='facile',`${id}: starter ${mid} n'est pas facile`); }
  pass(lessons.length>=2,`${id}: moins de 2 cours de fondation`);
  for(const lid of lessons){ const p=catalog.packs[lid]; pass(!!p,`${id}: cours starter absent ${lid}`); if(p)pass(p.learningRampRC40?.stage==='discovery',`${id}: cours ${lid} non tagué discovery`); }
}
for(const id of expected){ const r=freshRuntime[id]; pass(r?.stage==='discovery',`${id}: un compte neuf démarre en ${r?.stage}`); pass((cfg.starterMysteries?.[id]||[]).includes(r?.mysteryId),`${id}: le mystère neuf ${r?.mysteryId} n'est pas dans le pool découverte`); pass(r?.difficulty==='facile',`${id}: le premier mystère réel n'est pas facile`); }
pass(cfg.thresholds?.discoveryPoints===8,'Seuil discovery inattendu');
pass(cfg.thresholds?.confidencePoints===20,'Seuil confidence inattendu');
pass(cfg.thresholds?.intermediatePoints===38,'Seuil intermediate inattendu');
const engine=read('global-difficulty-ramp-rc40.js');
pass(engine.includes('solved * 2 + Math.min(12, lessons)'),'Expérience par discipline ne combine pas mystères + cours');
pass(engine.includes('new Set(["facile"])'),'Discovery ne limite pas au facile');
pass(engine.includes('new Set(["facile", "moyen"])'),'Confidence ne limite pas à facile+moyen');
pass(engine.includes('"expert"]') && engine.includes('stage === "intermediate"'),'Gating expert/intermediate absent');
pass(engine.includes('unseenPreferred') && engine.includes('unseenAll'),'Protection anti-replay des réussites absente');
pass(engine.includes('yesterdayId'),'Protection changement quotidien absente');
const stageModel=(solved,lessons)=>{const points=solved*2+Math.min(12,lessons); if(solved<4&&points<8)return'discovery'; if(points<20)return'confidence'; if(points<38)return'intermediate'; return'advanced'};
const simulations=[
 {solved:0,lessons:0,want:'discovery'}, {solved:2,lessons:2,want:'discovery'},
 {solved:4,lessons:0,want:'confidence'}, {solved:6,lessons:4,want:'confidence'},
 {solved:8,lessons:6,want:'intermediate'}, {solved:14,lessons:10,want:'advanced'}
];
for(const s of simulations)pass(stageModel(s.solved,s.lessons)===s.want,`Simulation ${s.solved}/${s.lessons}: ${stageModel(s.solved,s.lessons)} != ${s.want}`);
const starterTotal=expected.reduce((n,id)=>n+(cfg.starterMysteries?.[id]?.length||0),0);
const report={version:JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).version,status:errors.length?'failed':'passed',principle:'Chaque discipline recommence doucement pour un nouvel utilisateur : bases/familier → confiance → application → difficulté réelle. La progression est locale à la discipline, pas au niveau global du compte.',disciplines:expected.length,coverage:{starterMysteries:starterTotal,starterLessons:expected.reduce((n,id)=>n+(cfg.starterLessons?.[id]?.length||0),0),perDiscipline:Object.fromEntries(expected.map(id=>[id,{starterMysteries:cfg.starterMysteries?.[id]?.length||0,starterLessons:cfg.starterLessons?.[id]?.length||0}]))},stages:{discovery:'facile + pool découverte guidé',confidence:'facile + moyen',intermediate:'facile + moyen + difficile',advanced:'expert autorisé'},experienceFormula:'2 × mystères réussis + cours validés (cours plafonnés à 12 pour le calcul)',simulations,freshRuntime,warnings,errors};
fs.writeFileSync(path.join(root,'RC40-GLOBAL-DIFFICULTY-AUDIT.json'),JSON.stringify(report,null,2));
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Global difficulty audit passed: ${expected.length} disciplines, ${starterTotal} starter mysteries.`);
