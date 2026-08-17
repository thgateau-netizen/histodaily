import fs from 'node:fs';
import vm from 'node:vm';
const moduleText=fs.readFileSync('src/legacy-client/daily-value-rc53.js','utf8');
const css=fs.readFileSync('histodaily.css','utf8');
const build=fs.readFileSync('scripts/build-client.mjs','utf8');
const catalogue=JSON.parse(fs.readFileSync('catalogue-export-temp.json','utf8'));
const context={window:{setTimeout(){}},document:{querySelector(){return null;}},console}; context.window.window=context.window;
vm.createContext(context); vm.runInContext(moduleText,context);
const api=context.window.HistoDailyDailyValueRC53;
const nonEnglish=catalogue.mysteries.filter(item=>item.discipline!=='english');
const packs=nonEnglish.map(item=>({item,pack:api.knowledgePack(item)}));
const generic=/^Quel(?:le)?\s+(?:personnage|régime|événement|transformation|ensemble|peuple|groupe|œuvre|notion|concept|savant|planète|méthode|technique)/i;
const teaserSamples=nonEnglish.map(item=>({item,text:api.curiosityTeaser(item)}));
const checks={
  moduleExposed:Boolean(api),
  threeAnchorsForAll:packs.every(row=>row.pack.length===3),
  noEnglishPack:api.knowledgePack(catalogue.mysteries.find(item=>item.discipline==='english')).length===0,
  teaserAvoidsMissionQuestion:teaserSamples.every(row=>!generic.test(row.text)),
  teaserUsesNarrativeTitle:teaserSamples.filter(row=>row.item.title&&row.text.includes(row.item.title)).length>=Math.floor(nonEnglish.length*.95),
  teaserDoesNotLeakAnswer:teaserSamples.every(({item,text})=>{const n=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(); const a=n(item.answer),t=n(text); return !a||a.length<5||!t.includes(a);}),
  cssPresent:/rc53-knowledge-pack/.test(css)&&/data-rc53-curiosity/.test(css),
  bundledLast:/product-loop-rc52\.js','daily-value-rc53\.js/.test(build)
};
const errors=Object.entries(checks).filter(([,ok])=>!ok).map(([name])=>name);
const report={version:'1.0.0-rc.54.0',status:errors.length?'failed':'passed',focus:'daily knowledge density and curiosity-first tomorrow teaser',metrics:{nonEnglishMysteries:nonEnglish.length,threeAnchorPacks:packs.filter(row=>row.pack.length===3).length,narrativeTitleTeasers:teaserSamples.filter(row=>row.item.title&&row.text.includes(row.item.title)).length},checks,errors};
fs.writeFileSync('RC53-DAILY-VALUE-AUDIT.json',JSON.stringify(report,null,2)+'\n');
if(errors.length){console.error(report);process.exit(1);} console.log(`RC53 daily value audit: PASS — ${nonEnglish.length} non-English mysteries produce 3 anchors.`);
