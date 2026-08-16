import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url)); const root=path.resolve(here,'..');
const source=fs.readFileSync(path.join(root,'src','legacy-client','personalized-path-rc41.js'),'utf8');
const home=fs.readFileSync(path.join(root,'src','legacy-client','home-premium-rc24.js'),'utf8');
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const errors=[]; const pass=(c,m)=>{if(!c)errors.push(m)};
const disciplines=['history','english','geography'];
function scenario({due={},started=null,doneMap={},solvedMap={},points={},loopSolved=false,linkedDone=false,current='history'}={}){
  const lessons=[
    {id:'h1',disciplineId:'history',title:'Histoire 1'},{id:'h2',disciplineId:'history',title:'Histoire 2'},
    {id:'e1',disciplineId:'english',title:'English 1'},{id:'e2',disciplineId:'english',title:'English 2'},
    {id:'g1',disciplineId:'geography',title:'Géo 1'}
  ];
  const quizProgress={}; if(started)quizProgress[started]={answers:{0:1},correct:{}};
  const state={currentDiscipline:current,quizProgress,solvedMysteries:{}};
  const mystery={id:'today',disciplineId:current};
  const sandbox={
    window:{HistoDaily:{memory:{validReviewEntries:id=>Array.from({length:due[id]||0},(_,i)=>({id:`r${i}`}))}},HistoDailyDifficultyRC40:{progressFor:id=>({id,points:points[id]||0})}},
    state, DISCIPLINES:disciplines.map(id=>({id,title:id})),
    disciplineById:id=>({id:String(id),title:String(id)}), allLessons:()=>lessons,
    lessonDisciplineId:l=>l.disciplineId, lessonWorld:()=>({title:'Parcours'}), worldDisciplineId:()=>current,
    lessonDone:id=>Boolean(doneMap[id]|| (linkedDone&&id==='h1')), lessonMetaLine:()=> 'Cours',
    rc17SolvedMysteryCount:id=>Math.floor((points[id]||0)/2),
    mysteryForDisciplineDayOffset:()=>mystery, mysterySolved:id=>id==='today'&&loopSolved,
    console,Object,Array,Set,Map,Math,Number,String,Boolean,Date,JSON
  };
  const ctx=vm.createContext(sandbox); vm.runInContext(source,ctx,{filename:'personalized-path-rc41.js'});
  return sandbox.window.HistoDailyPersonalizedPathRC41;
}
let api=scenario({due:{english:3},points:{history:12,english:4}});
let r=api.nextAction('history',{id:'h1'});
pass(r.kind==='review'&&r.disciplineId==='english','Une révision due dans un domaine déjà actif doit pouvoir devenir la prochaine action');

api=scenario({started:'h2',points:{history:10}}); r=api.nextAction('history',{id:'h1'});
pass(r.kind==='lesson'&&r.lesson?.id==='h2'&&r.reason==='resume','Un cours commencé doit être repris avant un nouveau cours');

api=scenario({points:{history:24,english:6},loopSolved:true,linkedDone:true,doneMap:{h1:true,h2:true}}); r=api.nextAction('history',{id:'h1'});
pass(r.kind==='lesson'&&r.disciplineId==='english'&&r.reason==='balance','Après la boucle du jour, un domaine déjà pratiqué nettement en retard doit pouvoir être proposé');

api=scenario({points:{history:4}}); r=api.nextAction('history',{id:'h1'});
pass(r.disciplineId==='history'&&r.reason==='current','Sans raison forte, la prochaine action doit rester dans l’univers choisi');

pass(home.includes('HistoDailyPersonalizedPathRC41'),'Accueil premium non branché au moteur personnalisé');
pass(home.includes('next.disciplineId || id'),'Une révision inter-discipline n’ouvre pas explicitement la bonne discipline');
const build=fs.readFileSync(path.join(root,'scripts','build-client.mjs'),'utf8');
pass(build.includes("'personalized-path-rc41.js','home-premium-rc24.js'"),'Le moteur personnalisé doit être chargé avant le home premium');

const report={version:pkg.version,status:errors.length?'failed':'passed',principle:'Une seule prochaine action, choisie selon mémoire → continuité → équilibre léger → parcours courant. Aucun nouveau widget.',tests:{crossDisciplineReview:true,resumeStarted:true,balanceOnlyAfterDailyLoop:true,defaultStaysCurrent:true},errors};
fs.writeFileSync(path.join(root,'RC41-PERSONALIZED-PATH-AUDIT.json'),JSON.stringify(report,null,2)+'\n');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('Personalized path audit passed: memory, resume, balance and predictable default.');
