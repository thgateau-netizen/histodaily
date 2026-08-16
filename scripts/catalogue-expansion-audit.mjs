import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'RC42-BUNDLE-MANIFEST.json'),'utf8'));
const read=n=>fs.readFileSync(path.join(root,'src','legacy-client',n),'utf8');
const noop=()=>{};
const el=new Proxy({style:{},dataset:{},classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},appendChild:noop,append:noop,remove:noop,setAttribute:noop,addEventListener:noop,querySelector:()=>null,querySelectorAll:()=>[]},{get:(t,p)=>p in t?t[p]:noop});
const document={readyState:'loading',body:el,documentElement:el,head:el,getElementById:()=>el,querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>Object.create(el),createTextNode:()=>({}),addEventListener:noop};
const storage={getItem:()=>null,setItem:noop,removeItem:noop,clear:noop};
const win={document,addEventListener:noop,removeEventListener:noop,setTimeout:()=>0,clearTimeout:noop,setInterval:()=>0,clearInterval:noop,localStorage:storage,sessionStorage:storage,location:{href:'http://audit/',pathname:'/',search:'',hash:'',origin:'http://audit',reload:noop},history:{pushState:noop,replaceState:noop},navigator:{onLine:true,language:'fr-FR',serviceWorker:{register:async()=>({})}},matchMedia:()=>({matches:false,addEventListener:noop}),innerWidth:390,innerHeight:844};
const sandbox={console:{log:noop,warn:noop,error:noop,info:noop,debug:noop},window:win,document,localStorage:storage,sessionStorage:storage,navigator:win.navigator,location:win.location,history:win.history,setTimeout:win.setTimeout,clearTimeout:noop,setInterval:win.setInterval,clearInterval:noop,fetch:async()=>({ok:false,status:404,json:async()=>({}),text:async()=>''}),AbortController:globalThis.AbortController,URL,URLSearchParams,TextEncoder,TextDecoder,Blob,Response,Request,Headers,crypto:globalThis.crypto,Intl,Date,Math,JSON,Object,Array,Set,Map,WeakMap,Promise,RegExp,String,Number,Boolean,Error,TypeError,performance:{now:()=>0},requestAnimationFrame:()=>0,cancelAnimationFrame:noop,alert:noop,confirm:()=>false,prompt:()=>null,CSS:{escape:String},structuredClone:globalThis.structuredClone,HD_ART:{}};
sandbox.globalThis=sandbox;win.window=win;win.globalThis=sandbox;
const ctx=vm.createContext(sandbox);
for(const group of ['core','content']) for(const source of manifest.sources[group]||[]) vm.runInContext(read(source),ctx,{filename:source,timeout:12000});
const catalogue=JSON.parse(vm.runInContext(`JSON.stringify({packs:READY_LESSON_PACKS,lessons:data.lessons||{}})`,ctx));
const discipline=id=>id.startsWith('astro-')?'astronomy':id.startsWith('sci-')||id.startsWith('science-')?'science-inventions':id.startsWith('eco-')?'economy':id.startsWith('geo-')?'geography':id.startsWith('music-')?'music':id.startsWith('art-')?'art':id.startsWith('cinema-')?'cinema':id.startsWith('lit-')?'literature':id.startsWith('eng-')?'english':id.startsWith('philo-')?'philosophy':'history';
const required={
 economy:['eco-common-resources-rules','eco-redistribution-tax-benefits'],
 music:['music-bach-counterpoint-listening','music-riff-groove-hook'],
 cinema:['cinema-mise-en-scene-space-light','cinema-sound-offscreen-silence'],
 geography:['geo-urban-sprawl-mobility','geo-migration-routes-networks-borders'],
 art:['art-abstraction-color-form','art-installation-performance-space']
};
const counts={};
for(const id of Object.keys(catalogue.packs)){const d=discipline(id);counts[d]=(counts[d]||0)+1;}
const errors=[];
for(const [d,ids] of Object.entries(required)) for(const id of ids){
 const p=catalogue.packs[id];
 if(!p){errors.push(`${id}: pack absent`);continue;}
 if(!p.catalogueExpansionRC42) errors.push(`${id}: marqueur RC42 absent`);
 if(!Array.isArray(p.complete)||p.complete.length<6) errors.push(`${id}: cours complet insuffisant`);
 if(!Array.isArray(p.quiz)||p.quiz.length!==5) errors.push(`${id}: quiz != 5 questions`);
 const visible=Object.values(catalogue.lessons).flat().some(x=>x?.id===id);
 if(!visible) errors.push(`${id}: métadonnée de cours absente du catalogue visible`);
}
const minimums={economy:12,music:12,cinema:13,geography:13,art:14};
for(const [d,min] of Object.entries(minimums)) if((counts[d]||0)<min) errors.push(`${d}: ${counts[d]||0} cours, minimum RC42 ${min}`);
const report={version:JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).version,status:errors.length?'failed':'passed',principle:'Élargir les catalogues courts avec peu de cours mais de vrais sujets complémentaires, sans gonfler les disciplines déjà riches.',addedCourses:Object.fromEntries(Object.entries(required).map(([d,ids])=>[d,ids.map(id=>({id,title:Object.values(catalogue.lessons).flat().find(x=>x?.id===id)?.title||id}))])),courseCounts:counts,minimums,errors};
fs.writeFileSync(path.join(root,'RC42-CATALOGUE-EXPANSION-AUDIT.json'),JSON.stringify(report,null,2));
if(errors.length){console.error(errors.join('\n'));process.exit(1);}console.log(`Catalogue expansion audit passed: ${Object.values(required).flat().length} new courses, ${Object.keys(catalogue.packs).length} total.`);
