import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'RC39-BUNDLE-MANIFEST.json'),'utf8'));
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
const catalogue=JSON.parse(vm.runInContext(`JSON.stringify({packs:READY_LESSON_PACKS,mysteries:data.mysteries||[],labs:window.HD_DISCIPLINE_LABS||{},meta:window.HistoDaily?.englishRedesignRC37||null})`,ctx));
const english=Object.entries(catalogue.packs).filter(([id])=>id.startsWith('eng-'));
const quiz=english.flatMap(([id,p])=>(p.quiz||[]).map((q,index)=>({id,index,...q})));
const labs=catalogue.labs?.english||[];
const mysteries=(catalogue.mysteries||[]).filter(m=>m.discipline==='english');
const clean=v=>String(v||'').replace(/\s+/g,' ').trim();
const words=v=>clean(v).split(/\s+/).filter(Boolean);
const looksEnglish=v=>{const s=` ${clean(v).toLowerCase()} `; const hits=(s.match(/\b(the|a|an|i|you|we|they|he|she|it|is|are|was|were|have|has|had|do|does|did|can|could|would|should|to|of|for|with|from|this|that|not|but|and|or|if|when|because|so|still|yet|already|actually|currently|despite|although|however)\b/g)||[]).length; return hits>=1 || /^[A-Za-z][A-Za-z '\-–—,.!?/]+$/.test(clean(v));};
const errors=[]; const warnings=[];
const pass=(c,m)=>{if(!c)errors.push(m)};
pass(catalogue.meta?.courses===16,'RC37 metadata: 16 cours anglais non confirmés');
pass(english.length===16,`Catalogue anglais: ${english.length}/16 cours`);
pass(english.every(([,p])=>p.contentRevision==='rc37-english-situational'),'Tous les cours anglais ne portent pas la révision RC37');
pass(quiz.length===80,`Quiz anglais: ${quiz.length}/80 questions`);
pass(quiz.every(x=>looksEnglish(x.a)), 'Certaines bonnes réponses ne sont pas formulées comme de l’anglais à utiliser/comprendre');
const answerChoiceEnglish=quiz.reduce((n,x)=>n+[x.a,...(x.choices||[])].filter(looksEnglish).length,0);
const totalOptions=quiz.reduce((n,x)=>n+1+(x.choices||[]).length,0);
pass(answerChoiceEnglish/Math.max(1,totalOptions)>=0.95,`Options anglaises: ${answerChoiceEnglish}/${totalOptions}`);
const translationPrompts=quiz.filter(x=>/que signifie|meilleure traduction|traduction française|comment traduire/i.test(clean(x.q)));
pass(translationPrompts.length<=2,`Trop de questions de traduction directe: ${translationPrompts.length}`);
const contextualPrompts=quiz.filter(x=>/[“"]|tu |quelqu|collègue|réunion|scène|phrase|message|e-mail|rapport|contexte|situation/i.test(clean(x.q))).length;
pass(contextualPrompts>=68,`Questions contextualisées: ${contextualPrompts}/80 (<68)`);
const kinds=new Set(quiz.map(x=>clean(x.kind)));
pass(kinds.size>=12,`Variété de types de question insuffisante: ${kinds.size}`);
pass(labs.length===16,`Pauses anglaises: ${labs.length}/16`);
pass(labs.every(l=>clean(l.productionPrompt)&&clean(l.modelResponse)),'Chaque pause anglaise doit finir par une production personnelle + modèle');
const audio=labs.filter(l=>clean(l.speak)).length;
pass(audio>=14,`Audio/TTS: ${audio}/16 pauses (<14)`);
pass(mysteries.length===14,`Expéditions anglaises: ${mysteries.length}/14`);
pass(mysteries.every(m=>m.englishScenarioRC37===true),'Toutes les expéditions anglaises ne sont pas des scènes RC37');
pass(mysteries.every(m=>looksEnglish(m.answer)),'Certaines réponses d’expédition anglaise ne demandent pas une formulation/interprétation en anglais');
const shortChoices=quiz.filter(x=>(x.choices||[]).some(c=>words(c).length<2)).length;
if(shortChoices>8) warnings.push(`${shortChoices} questions ont au moins un distracteur très court; vérifier qu’il s’agit bien d’un test de collocation/structure.`);
const report={
 version:JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).version,
 status:errors.length?'failed':'passed',
 philosophy:'L’anglais est traité comme une compétence d’usage: scène → intention/forme naturelle → production, et non comme une fiche de connaissances.',
 coverage:{courses:english.length,quizQuestions:quiz.length,labs:labs.length,labsWithAudio:audio,mysteries:mysteries.length},
 designSignals:{contextualQuizQuestions:contextualPrompts,directTranslationQuestions:translationPrompts.length,questionKinds:[...kinds].sort(),englishAnswerOptions:`${answerChoiceEnglish}/${totalOptions}`,productionPrompts:labs.filter(l=>clean(l.productionPrompt)).length,modelResponses:labs.filter(l=>clean(l.modelResponse)).length},
 guardrails:{maxDirectTranslationQuestions:2,minContextualQuizQuestions:68,minQuestionKinds:12,minAudioLabs:14,requiredProductionLabs:16,requiredScenarioMysteries:14},
 warnings,errors
};
fs.writeFileSync(path.join(root,'RC37-ENGLISH-EXPERIENCE-AUDIT.json'),JSON.stringify(report,null,2));
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`English audit passed: ${english.length} courses, ${quiz.length} questions, ${labs.length} production labs, ${mysteries.length} scenario mysteries.`);
