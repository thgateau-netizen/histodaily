import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'RC50-BUNDLE-MANIFEST.json'),'utf8'));
const readSource=n=>fs.readFileSync(path.join(root,'src','legacy-client',n),'utf8');
const noop=()=>{};
const element=new Proxy({style:{},dataset:{},classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},appendChild:noop,append:noop,remove:noop,setAttribute:noop,addEventListener:noop,querySelector:()=>null,querySelectorAll:()=>[]},{get:(t,p)=>p in t?t[p]:noop});
const document={readyState:'loading',body:element,documentElement:element,head:element,getElementById:()=>element,querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>Object.create(element),createTextNode:()=>({}),addEventListener:noop};
const storage={getItem:()=>null,setItem:noop,removeItem:noop,clear:noop};
const quiet={log:noop,warn:noop,error:noop,info:noop,debug:noop};
const win={document,addEventListener:noop,removeEventListener:noop,setTimeout:()=>0,clearTimeout:noop,setInterval:()=>0,clearInterval:noop,localStorage:storage,sessionStorage:storage,location:{href:'http://audit/',pathname:'/',search:'',hash:'',origin:'http://audit',reload:noop},history:{pushState:noop,replaceState:noop},navigator:{onLine:true,language:'fr-FR',serviceWorker:{register:async()=>({})}},matchMedia:()=>({matches:false,addEventListener:noop}),innerWidth:390,innerHeight:844};
const sandbox={console:quiet,window:win,document,localStorage:storage,sessionStorage:storage,navigator:win.navigator,location:win.location,history:win.history,setTimeout:win.setTimeout,clearTimeout:noop,setInterval:win.setInterval,clearInterval:noop,fetch:async()=>({ok:false,status:404,json:async()=>({}),text:async()=>''}),AbortController:globalThis.AbortController,URL,URLSearchParams,TextEncoder,TextDecoder,Blob,Response,Request,Headers,crypto:globalThis.crypto,Intl,Date,Math,JSON,Object,Array,Set,Map,WeakMap,Promise,RegExp,String,Number,Boolean,Error,TypeError,performance:{now:()=>0},requestAnimationFrame:()=>0,cancelAnimationFrame:noop,alert:noop,confirm:()=>false,prompt:()=>null,CSS:{escape:String},structuredClone:globalThis.structuredClone,HD_ART:{}};
sandbox.globalThis=sandbox; win.window=win; win.globalThis=sandbox;
const ctx=vm.createContext(sandbox);
for(const group of ['core','content']) for(const source of manifest.sources[group]||[]) vm.runInContext(readSource(source),ctx,{filename:source,timeout:10000});
const catalogue=JSON.parse(vm.runInContext(`JSON.stringify({packs:READY_LESSON_PACKS,mysteries:data.mysteries||[],labs:window.HD_DISCIPLINE_LABS||{},meta:window.HistoDaily?.englishUtilityRC50||null,ramp:window.HD_GLOBAL_RAMP_RC40||null})`,ctx));
const english=Object.entries(catalogue.packs).filter(([id])=>id.startsWith('eng-'));
const quiz=english.flatMap(([id,p])=>(p.quiz||[]).map((q,index)=>({id,index,...q})));
const labs=catalogue.labs?.english||[];
const mysteries=(catalogue.mysteries||[]).filter(m=>m.discipline==='english');
const clean=v=>String(v||'').replace(/\s+/g,' ').trim();
const looksEnglish=v=>{const s=` ${clean(v).toLowerCase()} `; const hits=(s.match(/\b(the|a|an|i|you|we|they|he|she|it|is|are|was|were|have|has|had|do|does|did|can|could|would|should|to|of|for|with|from|this|that|not|but|and|or|if|when|because|so|still|yet|already|actually|currently|despite|although|however|really|pretty|just|get|sounds|mean|think)\b/g)||[]).length; return hits>=1 || /^[A-Za-z][A-Za-z '\-–—,.!?/…]+$/.test(clean(v));};
const errors=[]; const warnings=[]; const pass=(c,m)=>{if(!c)errors.push(m)};
pass(catalogue.meta?.courses===16,'RC50 metadata: 16 cours anglais non confirmés');
pass(catalogue.meta?.targets===96,`RC50 targets: ${catalogue.meta?.targets||0}/96`);
pass(english.length===16,`Catalogue anglais: ${english.length}/16 cours`);
pass(english.every(([,p])=>p.contentRevision==='rc50-english-useful-pack'),'Tous les cours anglais ne portent pas la révision RC50');
const targetCounts=english.map(([id,p])=>({id,count:p.englishExperienceRC50?.targetExpressions?.length||0}));
pass(targetCounts.every(x=>x.count>=6),`Chaque cours doit contenir au moins 6 expressions réutilisables: ${targetCounts.filter(x=>x.count<6).map(x=>`${x.id}:${x.count}`).join(', ')}`);
pass(quiz.length===80,`Quiz anglais: ${quiz.length}/80 questions`);
pass(quiz.every(x=>looksEnglish(x.a)),'Certaines bonnes réponses ne sont pas formulées comme de l’anglais à utiliser/comprendre');
const totalOptions=quiz.reduce((n,x)=>n+1+(x.choices||[]).length,0);
const englishOptions=quiz.reduce((n,x)=>n+[x.a,...(x.choices||[])].filter(looksEnglish).length,0);
pass(englishOptions/Math.max(1,totalOptions)>=0.95,`Options anglaises: ${englishOptions}/${totalOptions}`);
const translationPrompts=quiz.filter(x=>/que signifie|meilleure traduction|traduction française|comment traduire/i.test(clean(x.q)));
pass(translationPrompts.length<=1,`Trop de questions de traduction directe: ${translationPrompts.length}`);
const contextual=quiz.filter(x=>/[“"]|tu |collègue|ami|réunion|message|hôtel|train|scène|phrase|situation|projet|rapport|examen|client|travail/i.test(clean(x.q))).length;
pass(contextual>=72,`Questions contextualisées: ${contextual}/80 (<72)`);
const kinds=new Set(quiz.map(x=>clean(x.kind)));
pass(kinds.size>=5,`Variété de mécanismes insuffisante: ${kinds.size}/5`);
pass(labs.length===16,`Pauses anglaises: ${labs.length}/16`);
pass(labs.every(l=>l.englishUtilityRC50===true),'Les 16 pauses doivent utiliser le modèle RC50');
pass(labs.every(l=>clean(l.productionPrompt)&&clean(l.modelResponse)),'Chaque pause anglaise doit finir par une production personnelle + modèle');
const audio=labs.filter(l=>clean(l.speak)).length;
pass(audio>=16,`Audio/TTS: ${audio}/16 pauses`);
pass(mysteries.length===14,`Expéditions anglaises: ${mysteries.length}/14`);
pass(mysteries.every(m=>m.englishScenarioRC50===true),'Toutes les expéditions anglaises doivent porter la passe RC50');
const dailyPackCount=mysteries.reduce((n,m)=>n+(m.englishDailyPack?.length||0),0);
pass(dailyPackCount===42,`Expressions livrées par les dossiers quotidiens: ${dailyPackCount}/42`);
pass(mysteries.every(m=>(m.englishDailyPack||[]).length===3),'Chaque dossier anglais doit livrer exactement 3 expressions utiles');
const lexicalMission=/que veut dire|à quoi renvoie|quel mot|mot recherché|trouve le mot|quelle traduction/i;
const lexical=mysteries.filter(m=>lexicalMission.test(`${m.title||''} ${m.missionQuestion||''}`));
pass(lexical.length===0,`Des dossiers restent centrés sur un mot isolé: ${lexical.map(m=>m.id).join(', ')}`);
const starterIds=catalogue.ramp?.starterLessons?.english||[];
pass(starterIds.length===2,'Deux cours de démarrage anglais attendus');
pass(starterIds.every(id=>catalogue.packs[id]?.englishExperienceRC50?.targetExpressions?.length>=6),'Les cours de démarrage anglais ne sont pas des packs RC50 complets');
const report={
 version:JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).version,
 status:errors.length?'failed':'passed',
 philosophy:'L’anglais doit créer une sensation de progrès visible: une session = plusieurs blocs réutilisables, une scène, une production. Le mot isolé n’est jamais l’unité pédagogique principale.',
 coverage:{courses:english.length,targetExpressions:targetCounts.reduce((n,x)=>n+x.count,0),quizQuestions:quiz.length,labs:labs.length,labsWithAudio:audio,mysteries:mysteries.length,dailyReusableChunks:dailyPackCount},
 designSignals:{contextualQuizQuestions:contextual,directTranslationQuestions:translationPrompts.length,questionKinds:[...kinds],coursesWithSixOrMoreTargets:targetCounts.filter(x=>x.count>=6).length,mysteriesCenteredOnSingleWord:lexical.length},
 guardrails:{minTargetsPerCourse:6,totalTargets:96,quizQuestions:80,minContextualQuizQuestions:72,maxDirectTranslationQuestions:1,requiredDailyChunksPerMystery:3,requiredDailyChunksTotal:42,starterCourseCount:2},
 warnings,errors
};
fs.writeFileSync(path.join(root,'RC50-ENGLISH-VALUE-AUDIT.json'),JSON.stringify(report,null,2));
fs.writeFileSync(path.join(root,'RC37-ENGLISH-EXPERIENCE-AUDIT.json'),JSON.stringify(report,null,2));
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`English RC50 audit passed: ${english.length} courses, ${targetCounts.reduce((n,x)=>n+x.count,0)} reusable chunks, ${quiz.length} questions, ${dailyPackCount} daily chunks.`);
