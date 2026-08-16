import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const source = fs.readFileSync(path.join(root, 'src/legacy-client/daily-freshness-rc43.js'), 'utf8');
const home = fs.readFileSync(path.join(root, 'src/legacy-client/home-premium-rc24.js'), 'utf8');
const personalized = fs.readFileSync(path.join(root, 'src/legacy-client/personalized-path-rc41.js'), 'utf8');
const contentRamp = fs.readFileSync(path.join(root, 'src/legacy-client/content-difficulty-ramp-rc40.js'), 'utf8');
const cataloguePath = path.join(root, 'catalogue-export-temp.json');
if (!fs.existsSync(cataloguePath)) throw new Error('catalogue-export-temp.json missing; run export-catalogue-temp.mjs first');
const catalogue = JSON.parse(fs.readFileSync(cataloguePath, 'utf8'));

const issues = [];
const check = (condition, label) => { if (!condition) issues.push(label); };
check(source.includes('RECENT_DAYS = 10'), 'recent-history window missing');
check(source.includes('noveltyPenalty'), 'novelty scoring missing');
check(source.includes('sameLesson(candidate, item)'), 'same-lesson repetition is not penalized');
check(source.includes('if (current) return current'), 'same-day stability missing');
check(source.includes('unseenPreferred'), 'solved-content exclusion missing');
check(source.includes('yesterday') && source.includes('item.id !== yesterday.id'), 'next-day change guard missing');
check(home.includes('type:"complete"'), 'home has no explicit completed state');
check(home.includes('Nouveau dossier demain'), 'home does not communicate tomorrow freshness');
check(!home.includes('action:lesson?"Revoir le cours":"Revoir l’expédition"'), 'obsolete repeat CTA still active after completion');
check(home.includes('s.type!=="complete"'), 'hero CTA is not removed after completion');
check(!personalized.includes('eyebrow:"Pour équilibrer"'), 'recommendation engine is exposed to the user');

const starterMatch = contentRamp.match(/const starterMysteries = (\{[\s\S]*?\n  \});/);
if (!starterMatch) throw new Error('starterMysteries config not found');
const starters = Function(`"use strict"; return (${starterMatch[1]});`)();
const disciplines = Object.keys(starters);
const byDiscipline = new Map(disciplines.map(id => [id, []]));
for (const mystery of catalogue.mysteries || []) {
  const id = mystery.discipline || 'history';
  if (!byDiscipline.has(id)) byDiscipline.set(id, []);
  byDiscipline.get(id).push(mystery);
}

const normalize = value => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const sameLesson = (a,b) => Boolean(a?.lessonId && b?.lessonId && String(a.lessonId) === String(b.lessonId));
const sameSubject = (a,b) => { const l=normalize(a?.subjectType), r=normalize(b?.subjectType); return Boolean(l&&r&&l===r&&!['usage reel','probleme philosophique'].includes(l)); };
const samePeriod = (a,b) => { const l=normalize(a?.periodHint), r=normalize(b?.periodHint); return Boolean(l&&r&&l===r&&l.length>=5&&!['anglais en contexte','raisonnement applique'].includes(l)); };
function penalty(candidate,recent){ let score=0; for(const {item,offset} of recent){ if(candidate.id===item.id)score+=offset<=7?1000:120; if(sameLesson(candidate,item))score+=offset===1?180:offset<=4?65:18; if(sameSubject(candidate,item))score+=offset===1?48:offset<=3?18:4; if(samePeriod(candidate,item))score+=offset===1?38:offset<=3?14:3; } return score; }
function hash(value){ let h=2166136261; for(const c of String(value)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);} return h>>>0; }
function stageFor(solved){ const points=solved*2; if(solved<4&&points<8)return 'discovery'; if(points<20)return 'confidence'; if(points<38)return 'intermediate'; return 'advanced'; }
function allowed(stage){ return stage==='discovery'?new Set(['facile']):stage==='confidence'?new Set(['facile','moyen']):stage==='intermediate'?new Set(['facile','moyen','difficile']):new Set(['facile','moyen','difficile','expert']); }

const simulation = {};
for (const id of disciplines) {
  const raw = byDiscipline.get(id) || [];
  const starterSet = new Set(starters[id] || []);
  for (const starter of starterSet) check(raw.some(item => item.id === starter), `${id}: missing starter ${starter}`);
  const solved = new Set();
  const recent = [];
  const chosen = [];
  let adjacentLessonRepeats = 0;
  for (let day=1; day<=Math.min(12, raw.length); day++) {
    const stage=stageFor(solved.size); const allow=allowed(stage);
    let preferred=raw.filter(item=>allow.has(item.difficulty||'moyen'));
    if(stage==='discovery'){ const starterPool=raw.filter(item=>starterSet.has(item.id)); if(starterPool.length)preferred=starterPool; }
    const unseenPreferred=preferred.filter(item=>!solved.has(item.id));
    const unseenAllowed=raw.filter(item=>allow.has(item.difficulty||'moyen')&&!solved.has(item.id));
    const unseenNonExpert=raw.filter(item=>(item.difficulty||'moyen')!=='expert'&&!solved.has(item.id));
    const unseenAll=raw.filter(item=>!solved.has(item.id));
    let candidates=unseenPreferred.length?unseenPreferred:unseenAllowed.length?unseenAllowed:unseenNonExpert.length?unseenNonExpert:unseenAll.length?unseenAll:preferred;
    const yesterday=recent[0]?.item;
    if(yesterday&&candidates.length>1){ const changed=candidates.filter(item=>item.id!==yesterday.id); if(changed.length)candidates=changed; }
    const ranked=candidates.map(item=>({item,score:penalty(item,recent),tie:hash(`${day}|${id}|${item.id}|rc43`)})).sort((a,b)=>a.score-b.score||a.tie-b.tie);
    const pick=ranked[0]?.item;
    if(!pick)break;
    if(yesterday&&sameLesson(pick,yesterday)){
      const alternative=candidates.some(item=>item.id!==pick.id&&!sameLesson(item,yesterday));
      if(alternative) adjacentLessonRepeats += 1;
    }
    chosen.push(pick.id); solved.add(pick.id); recent.unshift({item:pick,offset:1});
    recent.forEach((row,index)=>row.offset=index+1); if(recent.length>10)recent.length=10;
  }
  check(new Set(chosen).size===chosen.length, `${id}: simulation replayed solved content before exhaustion`);
  check(adjacentLessonRepeats===0, `${id}: avoidable adjacent lesson/theme repeat in simulation`);
  simulation[id]={days:chosen.length,unique:new Set(chosen).size,adjacentLessonRepeats,firstSix:chosen.slice(0,6)};
}

const report = {
  version:'1.0.0-rc.43.0',
  scope:'daily freshness + clear completion',
  disciplines:disciplines.length,
  checks:11 + disciplines.length*2,
  issues,
  simulation,
  status:issues.length?'fail':'pass'
};
fs.writeFileSync(path.join(root,'RC43-DAILY-FRESHNESS-AUDIT.json'),JSON.stringify(report,null,2)+'\n');
if(issues.length){ console.error(JSON.stringify(report,null,2)); process.exit(1); }
console.log(`RC43 daily freshness audit: PASS — ${disciplines.length} disciplines, no avoidable daily replay in simulation.`);
