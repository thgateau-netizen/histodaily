import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'RC51-BUNDLE-MANIFEST.json'),'utf8'));
const readSource=n=>fs.readFileSync(path.join(root,'src','legacy-client',n),'utf8');
const noop=()=>{};
const makeElement=()=>new Proxy({style:{},dataset:{},classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},appendChild:noop,append:noop,prepend:noop,remove:noop,setAttribute:noop,removeAttribute:noop,addEventListener:noop,querySelector:()=>null,querySelectorAll:()=>[],closest:()=>null,matches:()=>false,focus:noop,scrollIntoView:noop,innerHTML:'',hidden:false,disabled:false},{get:(t,p)=>p in t?t[p]:noop,set:(t,p,v)=>(t[p]=v,true)});
const element=makeElement();
const document={readyState:'loading',body:element,documentElement:element,head:element,getElementById:()=>element,querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>makeElement(),createTextNode:()=>({}),addEventListener:noop,removeEventListener:noop};
const store=new Map();
const storage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k),clear:()=>store.clear()};
class Observer{constructor(cb){this.cb=cb}observe(){}disconnect(){}unobserve(){}}
const fetchStub=async()=>({ok:false,status:404,json:async()=>({}),text:async()=>''});
const win={document,fetch:fetchStub,addEventListener:noop,removeEventListener:noop,setTimeout:()=>0,clearTimeout:noop,setInterval:()=>0,clearInterval:noop,localStorage:storage,sessionStorage:storage,location:{href:'http://audit/',pathname:'/',search:'',hash:'',origin:'http://audit',reload:noop},history:{pushState:noop,replaceState:noop},navigator:{onLine:true,language:'fr-FR',serviceWorker:{register:async()=>({}),getRegistration:async()=>null,ready:Promise.resolve(null)}},matchMedia:()=>({matches:false,addEventListener:noop,removeEventListener:noop}),innerWidth:390,innerHeight:844,scrollTo:noop,requestAnimationFrame:()=>0,cancelAnimationFrame:noop,MutationObserver:Observer,IntersectionObserver:Observer,ResizeObserver:Observer};
const sandbox={addEventListener:noop,removeEventListener:noop,console:{log:noop,warn:noop,error:noop,info:noop,debug:noop},window:win,document,localStorage:storage,sessionStorage:storage,navigator:win.navigator,location:win.location,history:win.history,setTimeout:win.setTimeout,clearTimeout:noop,setInterval:win.setInterval,clearInterval:noop,fetch:fetchStub,AbortController:globalThis.AbortController,URL,URLSearchParams,TextEncoder,TextDecoder,Blob,Response,Request,Headers,crypto:globalThis.crypto,Intl,Date,Math,JSON,Object,Array,Set,Map,WeakMap,Promise,RegExp,String,Number,Boolean,Error,TypeError,performance:{now:()=>0},requestAnimationFrame:()=>0,cancelAnimationFrame:noop,requestIdleCallback:()=>0,cancelIdleCallback:noop,queueMicrotask:fn=>fn?.(),alert:noop,confirm:()=>false,prompt:()=>null,CSS:{escape:String},structuredClone:globalThis.structuredClone,HD_ART:{},MutationObserver:Observer,IntersectionObserver:Observer,ResizeObserver:Observer};
sandbox.globalThis=sandbox;win.window=win;win.globalThis=sandbox;
const ctx=vm.createContext(sandbox);
for(const group of ['core','content','experience']){
  for(const source of manifest.sources[group]||[]){
    try{vm.runInContext(readSource(source),ctx,{filename:source,timeout:15000});}
    catch(error){throw new Error(`Source ${source}: ${error.message}`);}
  }
}

const result=vm.runInContext(`(() => {
  const debug=window.HistoDaily?.progressionDebug;
  const lessonId='eng-context-inference';
  state.reviewQueue={};
  state.reviewSeededLessons={};
  state.englishPhraseSeededLessonsRC51={};
  state.englishDailyPhraseSeedsRC51={};
  const added=debug.scheduleEnglishLessonChunkAnchors(lessonId);
  const courseEntries=Object.entries(state.reviewQueue).map(([key,value])=>({key,...value})).filter(x=>x.source==='english-chunk');
  courseEntries.forEach(entry=>entry.dueAt=Date.now()-1);
  const recognition=debug.adaptiveReviewRecord({...courseEntries[0],key:courseEntries[0]?.key,lesson:lessonById(lessonId)});
  if(courseEntries[0]) courseEntries[0].stage=1;
  const recall=debug.adaptiveReviewRecord({...courseEntries[0],key:courseEntries[0]?.key,lesson:lessonById(lessonId)});
  const mystery=(data.mysteries||[]).find(m=>m.discipline==='english'&&Array.isArray(m.englishDailyPack)&&m.englishDailyPack.length===3);
  const dailyAdded=window.HistoDaily.memory.scheduleEnglishDailyPackReview(mystery);
  const dailyEntry=Object.entries(state.reviewQueue).map(([key,value])=>({key,...value})).find(x=>x.source==='english-daily-chunk');
  return {added,courseEntries:courseEntries.map(e=>({source:e.source,phrases:e.englishPhrases?.length,dueAt:e.dueAt,questionIndex:e.questionIndex})),recognition:{mode:recognition?.reviewMode,choices:recognition?.choices?.length,context:recognition?.context||''},recall:{mode:recall?.reviewMode,answer:recall?.modelAnswer||'',prompt:recall?.productionPrompt||''},dailyAdded,dailyEntry:dailyEntry?{phrases:dailyEntry.englishPhrases?.length,source:dailyEntry.source}:null,meta:window.HistoDaily?.englishSpiralRC51||null};
})()`,ctx);
const checks={
  threeCourseAnchors:result.added===3&&result.courseEntries.length===3,
  twoPhrasesPerAnchor:result.courseEntries.every(e=>e.phrases===2),
  firstReviewRecognition:result.recognition.mode==='english-recognition'&&result.recognition.choices>=3&&Boolean(result.recognition.context),
  secondReviewActiveRecall:result.recall.mode==='english-recall'&&Boolean(result.recall.answer)&&Boolean(result.recall.prompt),
  dailyPackScheduled:result.dailyAdded===1&&result.dailyEntry?.source==='english-daily-chunk'&&result.dailyEntry?.phrases===3,
  metadataExposed:result.meta?.dailyPackReturns===true&&result.meta?.courseAnchors===3
};
const errors=Object.entries(checks).filter(([,ok])=>!ok).map(([name])=>name);
const report={version:JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).version,status:errors.length?'failed':'passed',checks,observed:result,errors};
fs.writeFileSync(path.join(root,'RC51-ENGLISH-SPIRAL-BEHAVIOR-AUDIT.json'),JSON.stringify(report,null,2)+'\n');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('English RC51 spiral behavior test passed.');
