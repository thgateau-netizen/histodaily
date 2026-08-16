import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root,'RC27-BUNDLE-MANIFEST.json'),'utf8'));
const readSource = name => fs.readFileSync(path.join(root,'src','legacy-client',name),'utf8');
const noop=()=>{};
const element = new Proxy({style:{},dataset:{},classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},appendChild:noop,append:noop,remove:noop,setAttribute:noop,addEventListener:noop,querySelector:()=>null,querySelectorAll:()=>[],getBoundingClientRect:()=>({top:0,left:0,width:390,height:844})},{get:(t,p)=>p in t?t[p]:noop});
const document={readyState:'loading',body:element,documentElement:element,head:element,getElementById:()=>element,querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>Object.create(element),createTextNode:()=>({}),addEventListener:noop};
const storage={getItem:()=>null,setItem:noop,removeItem:noop,clear:noop};
const quiet={log:noop,warn:noop,error:noop,info:noop,debug:noop};
const win={document,addEventListener:noop,removeEventListener:noop,setTimeout:()=>0,clearTimeout:noop,setInterval:()=>0,clearInterval:noop,localStorage:storage,sessionStorage:storage,location:{href:'http://audit/',pathname:'/',search:'',hash:'',origin:'http://audit',reload:noop},history:{pushState:noop,replaceState:noop},navigator:{onLine:true,language:'fr-FR',serviceWorker:{register:async()=>({})}},matchMedia:()=>({matches:false,addEventListener:noop}),innerWidth:390,innerHeight:844};
const sandbox={console:quiet,window:win,document,localStorage:storage,sessionStorage:storage,navigator:win.navigator,location:win.location,history:win.history,setTimeout:win.setTimeout,clearTimeout:noop,setInterval:win.setInterval,clearInterval:noop,fetch:async()=>({ok:false,status:404,json:async()=>({}),text:async()=>''}),AbortController:globalThis.AbortController,URL,URLSearchParams,TextEncoder,TextDecoder,Blob,Response,Request,Headers,crypto:globalThis.crypto,Intl,Date,Math,JSON,Object,Array,Set,Map,WeakMap,Promise,RegExp,String,Number,Boolean,Error,TypeError,performance:{now:()=>0},requestAnimationFrame:()=>0,cancelAnimationFrame:noop,alert:noop,confirm:()=>false,prompt:()=>null,CSS:{escape:String},structuredClone:globalThis.structuredClone,HD_ART:{}};
sandbox.globalThis=sandbox; win.window=win; win.globalThis=sandbox;
const ctx=vm.createContext(sandbox);
for(const group of ['core','content']) for(const source of manifest.sources[group]||[]) vm.runInContext(readSource(source),ctx,{filename:source,timeout:8000});
const catalogue=JSON.parse(vm.runInContext(`JSON.stringify({packs:READY_LESSON_PACKS,mysteries:data.mysteries||[]})`,ctx));

const clean=v=>String(v||'').replace(/\s+/g,' ').trim();
const wordCount=v=>clean(v).split(/\s+/).filter(Boolean).length;
const norm=v=>clean(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const discipline=id=>id.startsWith('astro-')?'astronomy':id.startsWith('sci-')||id.startsWith('science-')?'science-inventions':id.startsWith('eco-')?'economy':id.startsWith('geo-')?'geography':id.startsWith('music-')?'music':id.startsWith('art-')?'art':id.startsWith('cinema-')?'cinema':id.startsWith('lit-')?'literature':id.startsWith('eng-')?'english':id.startsWith('philo-')?'philosophy':'history';
const issues=[]; const rows=[]; const questions=new Map();
for(const [id,pack] of Object.entries(catalogue.packs)){
  const complete=Array.isArray(pack.complete)?pack.complete:[];
  const visibleExpress=(Array.isArray(pack.express)?pack.express:[]).slice(0,3);
  const quiz=Array.isArray(pack.quiz)?pack.quiz:[];
  const completeWords=wordCount(complete.map(b=>b?.text||'').join(' '));
  const expressWords=wordCount(visibleExpress.map(x=>typeof x==='string'?x:x?.text||'').join(' '));
  const d=discipline(id);
  if(completeWords<420) issues.push({severity:'error',code:'course-short',lessonId:id,discipline:d,value:completeWords,target:420});
  if(complete.length<6) issues.push({severity:'error',code:'sections-few',lessonId:id,discipline:d,value:complete.length,target:6});
  if(expressWords<120) issues.push({severity:'error',code:'express-short',lessonId:id,discipline:d,value:expressWords,target:120});
  if(quiz.length!==5) issues.push({severity:'error',code:'quiz-count',lessonId:id,discipline:d,value:quiz.length,target:5});
  quiz.forEach((q,index)=>{
    const key=norm(q?.q||''); if(key){ if(!questions.has(key))questions.set(key,[]); questions.get(key).push({id,index}); }
    const why=clean(q?.why||q?.explanation||''); const answer=clean(q?.a||q?.answer||q?.correct||'');
    if(wordCount(why)<12) issues.push({severity:'error',code:'quiz-explanation-short',lessonId:id,discipline:d,questionIndex:index,value:wordCount(why),target:12});
    if(norm(why)&&norm(why)===norm(answer)) issues.push({severity:'error',code:'quiz-explanation-repeats-answer',lessonId:id,discipline:d,questionIndex:index});
    const choices=Array.isArray(q?.choices)?q.choices:[];
    const lens=choices.map(wordCount); const aw=wordCount(answer);
    const absolutes=choices.filter(c=>/\b(jamais|toujours|uniquement|aucun|toutes?|forcément|obligatoirement|immédiatement)\b/i.test(c)).length;
    const lengthGiveaway=lens.length>=3 && ((aw>=14 && aw>2.3*Math.max(...lens)) || (aw<=2 && Math.min(...lens)>=5));
    if(lengthGiveaway) issues.push({severity:'warning',code:'distractor-length-giveaway',lessonId:id,discipline:d,questionIndex:index,lengthGiveaway:true,absoluteDistractors:absolutes});
  });
  rows.push({id,discipline:d,completeWords,sections:complete.length,expressWords,quizCount:quiz.length});
}
for(const entries of questions.values()) if(entries.length>1) entries.forEach(({id,index})=>issues.push({severity:'error',code:'duplicate-question',lessonId:id,discipline:discipline(id),questionIndex:index,duplicates:entries.length}));
for(const mystery of catalogue.mysteries){
  if(mystery.lessonId && !catalogue.packs[mystery.lessonId]) issues.push({severity:'error',code:'broken-mystery-link',mysteryId:mystery.id,discipline:mystery.discipline,lessonId:mystery.lessonId});
  if(wordCount(mystery.prompt)<20) issues.push({severity:'error',code:'mystery-prompt-short',mysteryId:mystery.id,discipline:mystery.discipline,value:wordCount(mystery.prompt),target:20});
  if(wordCount(mystery.explanation)<20) issues.push({severity:'error',code:'mystery-explanation-short',mysteryId:mystery.id,discipline:mystery.discipline,value:wordCount(mystery.explanation),target:20});
}
const disciplines=[...new Set(rows.map(r=>r.discipline))].sort();
const summaryByDiscipline={};
for(const d of disciplines){
 const rr=rows.filter(r=>r.discipline===d); const ii=issues.filter(i=>i.discipline===d);
 const avg=key=>Math.round(rr.reduce((s,r)=>s+r[key],0)/rr.length);
 summaryByDiscipline[d]={courses:rr.length,avgCompleteWords:avg('completeWords'),minCompleteWords:Math.min(...rr.map(r=>r.completeWords)),avgSections:Number((rr.reduce((s,r)=>s+r.sections,0)/rr.length).toFixed(1)),avgVisibleExpressWords:avg('expressWords'),errors:ii.filter(i=>i.severity==='error').length,warnings:ii.filter(i=>i.severity==='warning').length};
}
const issueCounts={}; for(const issue of issues) issueCounts[issue.code]=(issueCounts[issue.code]||0)+1;
let absoluteDistractorSignals=0; for(const pack of Object.values(catalogue.packs)) for(const q of (pack.quiz||[])) absoluteDistractorSignals += (q.choices||[]).filter(c=>/\b(jamais|toujours|uniquement|aucun|toutes?|forcément|obligatoirement|immédiatement)\b/i.test(c)).length;
const report={version:JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).version,catalogue:{courses:rows.length,mysteries:catalogue.mysteries.length,quizQuestions:rows.length*5},targets:{completeWords:420,completeSections:6,visibleExpressWords:120,quizQuestions:5,quizExplanationWords:12,mysteryPromptWords:20,mysteryExplanationWords:20},summaryByDiscipline,issueCounts,blockingErrors:issues.filter(i=>i.severity==='error').length,warnings:issues.filter(i=>i.severity==='warning').length,editorialSignals:{absoluteDistractorPhrases:absoluteDistractorSignals},issues};
fs.writeFileSync(path.join(root,'RC32-CONTENT-AUDIT.json'),JSON.stringify(report,null,2));
if(report.blockingErrors){ console.error(`Content audit failed: ${report.blockingErrors} blocking issue(s)`); process.exit(1); }
console.log(`Content audit passed: ${rows.length} courses, ${catalogue.mysteries.length} mysteries, ${report.warnings} plausibility warning(s).`);
