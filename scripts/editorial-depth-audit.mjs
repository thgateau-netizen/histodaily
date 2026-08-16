import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'RC27-BUNDLE-MANIFEST.json'),'utf8'));
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
const catalogue=JSON.parse(vm.runInContext(`JSON.stringify({packs:READY_LESSON_PACKS,mysteries:data.mysteries||[],lessons:data.lessons||{}})`,ctx));

const clean=v=>String(v||'').replace(/\s+/g,' ').trim();
const fold=v=>clean(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const norm=v=>fold(v).replace(/[^a-z0-9]+/g,' ').trim();
const words=v=>clean(v).split(/\s+/).filter(Boolean);
const stop=new Set('le la les un une des du de d et ou a au aux en dans sur pour par avec sans ce cet cette ces il elle ils elles on nous vous que qui quoi quel quelle quels quelles est sont etait etaient etre se sa son ses leur leurs comme plus moins tres ne pas non oui parce car donc puis mais ni si tout toute tous toutes entre vers chez quand ou comment pourquoi peut peuvent permet signifie surtout notamment generalement simplement cours question reponse idee bonne vrai vraie'.split(' '));
const tokens=v=>norm(v).split(/\s+/).filter(t=>t.length>=3&&!stop.has(t));
const tokenSet=v=>new Set(tokens(v));
const jaccard=(a,b)=>{const A=tokenSet(a),B=tokenSet(b); if(!A.size||!B.size)return 0; let n=0; for(const t of A)if(B.has(t))n++; return n/(A.size+B.size-n);};
const discipline=id=>id.startsWith('astro-')?'astronomy':id.startsWith('sci-')||id.startsWith('science-')?'science-inventions':id.startsWith('eco-')?'economy':id.startsWith('geo-')?'geography':id.startsWith('music-')?'music':id.startsWith('art-')?'art':id.startsWith('cinema-')?'cinema':id.startsWith('lit-')?'literature':id.startsWith('eng-')?'english':id.startsWith('philo-')?'philosophy':'history';
const qKind=q=>{const s=fold(q?.q||''); if(/^(quand|ou |qui |combien|en quelle annee|quel siecle)/.test(s))return'recall'; if(/^(pourquoi|comment |dans quel cas|laquelle explique|quelle explication|quel raisonnement|que peut-on deduire|que montre|quelle difference|quel mecanisme)/.test(s))return'reasoning'; if(/^(quel|quelle|quels|quelles|que signifie|comment appelle|comment nomme)/.test(s))return'recognition'; return'other';};
const genericWhy=["c'est le repere precis a retenir pour cette question","cette precision permet de distinguer la bonne reponse des raccourcis proposes","prends le mecanisme de","fabrique trois variantes"];
const repeatedTrainingNeedles=["termine par une reformulation qui conserve l idee sans reprendre l expression etudiee","ecris ensuite le raisonnement en trois etapes these raison objection","reponds a l objection sans changer discretement le sens des termes","le but est de tester les limites du concept pas de reciter une formule"];
const issues=[]; const courseRows=[];
for(const [id,p] of Object.entries(catalogue.packs)){
  const d=discipline(id); const complete=Array.isArray(p.complete)?p.complete:[]; const quiz=Array.isArray(p.quiz)?p.quiz:[]; let score=100;
  for(const b of complete){
    const add=b?.editorialAddition||'';
    if(add==='rc32-synthesis'||add==='rc32-evidence'){issues.push({kind:'course',id,discipline:d,severity:'major',code:'generated-filler-section',title:b?.title}); score-=8;}
    const bt=norm(b?.text||'');
    for(const needle of repeatedTrainingNeedles) if(bt.includes(needle)){issues.push({kind:'course',id,discipline:d,severity:'medium',code:'repeated-training-template',title:b?.title}); score-=3;}
  }
  for(let i=0;i<complete.length;i++)for(let j=i+1;j<complete.length;j++){
    const sim=jaccard(complete[i]?.text,complete[j]?.text);
    if(sim>=0.58){issues.push({kind:'course',id,discipline:d,severity:'medium',code:'near-duplicate-sections',sections:[i+1,j+1],similarity:Number(sim.toFixed(2))}); score-=5;}
  }
  const titles=complete.map(b=>clean(b?.title||''));
  const titleKey=t=>fold(t).replace(/^\d+[.)]?\s*/, '').trim();
  const seenTitles=new Map();
  titles.forEach((title,index)=>{if(!title)return;const key=titleKey(title);if(seenTitles.has(key)){issues.push({kind:'course',id,discipline:d,severity:'medium',code:'duplicate-section-title',sections:[seenTitles.get(key)+1,index+1],title});score-=3;}else seenTitles.set(key,index);});
  const numbered=titles.map((title,index)=>({index,match:title.match(/^\s*(\d+)[.)]?\s+/)})).filter(x=>x.match);
  const seenNumbers=new Map();
  numbered.forEach(({index,match})=>{const n=Number(match[1]);if(seenNumbers.has(n)){issues.push({kind:'course',id,discipline:d,severity:'minor',code:'duplicate-section-number',sections:[seenNumbers.get(n)+1,index+1],number:n});score-=2;}else seenNumbers.set(n,index);});
  titles.forEach((title,index)=>{if(title && /^[a-zà-ÿ]/.test(title)){issues.push({kind:'course',id,discipline:d,severity:'medium',code:'malformed-section-title',section:index+1,title});score-=3;}});
  let reasoning=0;
  quiz.forEach((q,index)=>{
    if(qKind(q)==='reasoning')reasoning++;
    const why=clean(q?.why||q?.explanation||''); const whyNorm=norm(why); const answer=clean(q?.a||q?.answer||q?.correct||'');
    if(genericWhy.some(x=>whyNorm.includes(x))){issues.push({kind:'course',id,discipline:d,severity:'medium',code:'generic-quiz-explanation',questionIndex:index}); score-=4;}
    if((why.match(/"/g)||[]).length%2===1 || (why.match(/“/g)||[]).length!==(why.match(/”/g)||[]).length){issues.push({kind:'course',id,discipline:d,severity:'major',code:'broken-quote-in-explanation',questionIndex:index}); score-=7;}
    const choices=Array.isArray(q?.choices)?q.choices:[]; const absoluteRx=/\b(jamais|toujours|uniquement|aucun|aucune|toutes?|tous|forcément|nécessairement|obligatoirement|immédiatement|automatiquement)\b/i;
    if(choices.length>=3 && choices.every(c=>absoluteRx.test(clean(c)))){issues.push({kind:'course',id,discipline:d,severity:'medium',code:'three-caricatured-distractors',questionIndex:index}); score-=4;}
    const aNorm=norm(answer);
    if(aNorm && whyNorm===aNorm){issues.push({kind:'course',id,discipline:d,severity:'medium',code:'answer-only-explanation',questionIndex:index}); score-=4;}
    else if(aNorm && whyNorm.startsWith(aNorm) && words(why).length<=words(answer).length+3){issues.push({kind:'course',id,discipline:d,severity:'minor',code:'thin-answer-repeat',questionIndex:index}); score-=2;}
  });
  if(quiz.length>=4 && reasoning===0){issues.push({kind:'course',id,discipline:d,severity:'minor',code:'no-reasoning-question'}); score-=3;}
  const fullText=fold(complete.map(b=>b?.text||'').join(' '));
  if(id==='eng-connectors-concession' && /despite raining/.test(fullText)){issues.push({kind:'course',id,discipline:d,severity:'major',code:'english-grammar-error-despite-raining'}); score-=12;}
  score=Math.max(0,Math.min(100,score)); const grade=score>=90?'A':score>=80?'B':score>=65?'C':'D';
  courseRows.push({id,discipline:d,score,grade,sections:complete.length,quizQuestions:quiz.length,reasoningQuestions:reasoning});
}

const mysteryRows=[];
for(const m of catalogue.mysteries){
  const d=m.discipline||'history'; let score=100; const promptNorm=norm(m.prompt||''); const aliases=[m.answer,...(m.aliases||[])].map(norm).filter(a=>a.length>=4);
  const leak=aliases.find(a=>promptNorm.includes(a));
  const intentionalReference=new Set(['english-mystery-one-reference-rc19']);
  if(leak&&!intentionalReference.has(m.id)){issues.push({kind:'mystery',id:m.id,discipline:d,severity:'critical',code:'answer-leaked-in-prompt',answer:m.answer}); score-=30;}
  if(leak&&intentionalReference.has(m.id)){issues.push({kind:'mystery',id:m.id,discipline:d,severity:'info',code:'intentional-reference-resolution',answer:m.answer});}
  const clueText=fold((m.clues||[]).join(' '));
  if(/desle sujet|le sujetrs|^le sujet\b|\ble sujet, petrograd|ete le sujet\b|pluriel latin est le sujet/.test(clueText)){issues.push({kind:'mystery',id:m.id,discipline:d,severity:'major',code:'corrupted-clue-text'}); score-=12;}
  const clues=Array.isArray(m.clues)?m.clues:[];
  for(let i=0;i<clues.length;i++)for(let j=i+1;j<clues.length;j++){const sim=jaccard(clues[i],clues[j]); if(sim>=0.45){issues.push({kind:'mystery',id:m.id,discipline:d,severity:'medium',code:'near-duplicate-clues',clues:[i+1,j+1],similarity:Number(sim.toFixed(2))}); score-=5;}}
  const copy=jaccard(m.prompt,m.explanation); if(copy>=0.68){issues.push({kind:'mystery',id:m.id,discipline:d,severity:'minor',code:'explanation-too-close-to-prompt',similarity:Number(copy.toFixed(2))}); score-=3;}
  score=Math.max(0,Math.min(100,score)); const grade=score>=90?'A':score>=80?'B':score>=65?'C':'D';
  mysteryRows.push({id:m.id,discipline:d,score,grade,difficulty:m.difficulty});
}

const gradeCounts=rows=>rows.reduce((o,r)=>(o[r.grade]=(o[r.grade]||0)+1,o),{});
const byDiscipline={};
for(const d of [...new Set([...courseRows.map(r=>r.discipline),...mysteryRows.map(r=>r.discipline)])].sort()){
  const c=courseRows.filter(r=>r.discipline===d), m=mysteryRows.filter(r=>r.discipline===d);
  byDiscipline[d]={courses:c.length,courseAverage:Number((c.reduce((s,r)=>s+r.score,0)/Math.max(1,c.length)).toFixed(1)),courseGrades:gradeCounts(c),mysteries:m.length,mysteryAverage:Number((m.reduce((s,r)=>s+r.score,0)/Math.max(1,m.length)).toFixed(1)),mysteryGrades:gradeCounts(m)};
}
const counts={}; for(const issue of issues)counts[issue.code]=(counts[issue.code]||0)+1;
const priority=[...courseRows.map(r=>({...r,kind:'course'})),...mysteryRows.map(r=>({...r,kind:'mystery'}))].sort((a,b)=>a.score-b.score).slice(0,40);
const report={version:JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).version,methodology:{note:'Audit qualitatif structurel : redondance, remplissage générique, spécificité des exercices, qualité des explications de quiz, plausibilité minimale des distracteurs, cohérence des sections, intégrité des formulations et mystères qui ne doivent jamais révéler leur réponse. La longueur n’entre pas dans le score.',interpretation:'La bande A signifie qu’aucun défaut couvert par cette grille n’a été détecté. Elle ne constitue ni une certification factuelle phrase par phrase ni une note absolue de qualité littéraire.',courseDimensions:['distinctiveness','pedagogical-specificity','quiz-explanation-quality','reasoning-balance','distractor-plausibility','section-coherence','language-integrity'],mysteryDimensions:['answer-concealment','clue-distinctiveness','explanation-value','text-integrity']},catalogue:{courses:courseRows.length,mysteries:mysteryRows.length,quizQuestions:courseRows.reduce((s,r)=>s+r.quizQuestions,0)},courseGrades:gradeCounts(courseRows),mysteryGrades:gradeCounts(mysteryRows),byDiscipline,issueCounts:counts,priorityItems:priority,issues};
const out=process.env.HD_EDITORIAL_AUDIT_OUT||'RC33-EDITORIAL-AUDIT.json'; fs.writeFileSync(path.join(root,out),JSON.stringify(report,null,2));
console.log(`Editorial audit: courses ${JSON.stringify(report.courseGrades)}, mysteries ${JSON.stringify(report.mysteryGrades)}, issues ${issues.length}.`);
