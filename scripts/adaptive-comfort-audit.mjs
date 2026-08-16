import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const source=fs.readFileSync(path.join(root,'src','legacy-client','adaptive-comfort-rc41.js'),'utf8');
const ramp=fs.readFileSync(path.join(root,'src','legacy-client','global-difficulty-ramp-rc40.js'),'utf8');
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const errors=[]; const pass=(c,m)=>{if(!c)errors.push(m)};

function buildScenario({discipline='history', quizCorrect=0, quizAnswered=0, solved=0, tries=1, hintRate=0}){
  const lessonIds=Array.from({length:Math.max(1,Math.ceil(quizAnswered/5))},(_,i)=>`lesson-${i}`);
  const quizProgress={}; let remaining=quizAnswered; let remainingCorrect=quizCorrect;
  lessonIds.forEach((id,index)=>{
    const count=Math.min(5,remaining); remaining-=count;
    const correctCount=Math.min(count,remainingCorrect); remainingCorrect-=correctCount;
    const answers={}; const correct={};
    for(let i=0;i<count;i++){answers[i]=0;if(i<correctCount)correct[i]=true;}
    quizProgress[id]={answers,correct};
  });
  const mysteries=[]; const solvedMysteries={};
  for(let i=0;i<solved;i++){
    const id=`m-${i}`; mysteries.push({id,disciplineId:discipline});
    solvedMysteries[id]={at:Date.now()-i*1000,tries,hints:i<Math.round(solved*hintRate)?1:0};
  }
  const state={quizProgress,solvedMysteries,mysteryGuided:{}};
  const sandbox={
    window:{}, state, data:{mysteries},
    disciplineById:id=>({id:String(id||'history')}),
    lessonById:id=>lessonIds.includes(id)?{id,disciplineId:discipline}:null,
    lessonDisciplineId:lesson=>lesson.disciplineId,
    mysteryDisciplineId:m=>m.disciplineId,
    rc17SolvedMysteryCount:()=>solved,
    rc17GuidedMysteryMode:()=>solved<20,
    console, Object, Array, Set, Map, Math, Number, String, Boolean, Date, JSON
  };
  sandbox.window.window=sandbox.window;
  const ctx=vm.createContext(sandbox);
  vm.runInContext(source,ctx,{filename:'adaptive-comfort-rc41.js'});
  return {api:sandbox.window.HistoDailyComfortRC41, ctx, mystery:mysteries[0]||{id:'dummy',disciplineId:discipline}};
}

const fresh=buildScenario({});
const freshMetrics=fresh.api.metricsFor('history');
pass(freshMetrics.support==='none','Un nouveau compte ne doit pas être considéré en difficulté sans preuve');
pass(fresh.api.capStage('discovery','history')==='discovery','Discovery ne doit jamais être accéléré');
pass(fresh.api.capStage('advanced','history')==='advanced','Sans données, la RC41 ne doit pas inventer un niveau de soutien');

const strong=buildScenario({quizAnswered:20,quizCorrect:19,solved:22,tries:1,hintRate:0});
const strongMetrics=strong.api.metricsFor('history');
pass(strongMetrics.support==='none',`Un utilisateur à l'aise est classé ${strongMetrics.support}`);
pass(strong.api.capStage('advanced','history')==='advanced','Un utilisateur à l’aise ne doit pas être ralenti');
pass(strong.api.guidedMode(strong.mystery)===false,'Après 20 réussites solides, le choix guidé doit pouvoir disparaître');

const light=buildScenario({discipline:'economy',quizAnswered:20,quizCorrect:13,solved:22,tries:2,hintRate:.25});
const lightMetrics=light.api.metricsFor('economy');
pass(lightMetrics.support==='light',`Soutien léger attendu, reçu ${lightMetrics.support}`);
pass(light.api.capStage('advanced','economy')==='intermediate','Le soutien léger doit empêcher le passage immédiat à expert');
pass(light.api.guidedMode(light.mystery)===true,'Le choix guidé doit être prolongé temporairement en soutien léger');

const struggling=buildScenario({discipline:'geography',quizAnswered:20,quizCorrect:8,solved:22,tries:4,hintRate:.75});
const strugglingMetrics=struggling.api.metricsFor('geography');
pass(strugglingMetrics.support==='strong',`Soutien fort attendu, reçu ${strugglingMetrics.support}`);
pass(struggling.api.capStage('advanced','geography')==='confidence','Une discipline en difficulté doit revenir à facile+moyen');
pass(struggling.api.capStage('intermediate','geography')==='confidence','Le difficile doit être écarté en soutien fort');
pass(struggling.api.guidedMode(struggling.mystery)===true,'Le guidage doit rester disponible si les résultats montrent un besoin');

pass(ramp.includes('HistoDailyComfortRC41'),'Le moteur global RC40 n’appelle pas le moteur de confort RC41');
pass(ramp.includes('baseStage'),'Le moteur ne conserve pas le stade brut avant adaptation');
pass(source.includes('solved < 30') && source.includes('solved < 24'),'Les limites de prolongation du guidage ne sont pas explicites');
pass(source.includes('accuracy') && source.includes('avgTries') && source.includes('hintRate'),'L’adaptation n’utilise pas quiz + essais + indices');

const report={
  version:pkg.version,
  status:errors.length?'failed':'passed',
  principle:'La difficulté monte avec l’expérience, mais peut rester plus douce localement si les résultats montrent que l’utilisateur n’est pas encore confortable. Aucun écran supplémentaire.',
  metrics:['quiz accuracy','recent mystery attempts','recent hint usage'],
  behavior:{
    noEvidence:'aucune pénalisation et aucune accélération',
    lightSupport:'advanced est plafonné à intermediate ; guidage possible jusqu’à 24 mystères',
    strongSupport:'intermediate/advanced sont plafonnés à confidence ; guidage possible jusqu’à 30 mystères',
    strongPerformance:'aucun ralentissement artificiel'
  },
  scenarios:{fresh:freshMetrics,strong:strongMetrics,light:lightMetrics,struggling:strugglingMetrics},
  errors
};
fs.writeFileSync(path.join(root,'RC41-ADAPTIVE-COMFORT-AUDIT.json'),JSON.stringify(report,null,2)+'\n');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('Adaptive comfort audit passed: fresh, strong, light-support and strong-support scenarios.');
