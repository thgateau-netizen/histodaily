import fs from 'node:fs';
const module = fs.readFileSync('src/legacy-client/product-loop-rc52.js','utf8');
const css = fs.readFileSync('histodaily.css','utf8');
const build = fs.readFileSync('scripts/build-client.mjs','utf8');
const checks = {
  visibleProgress: /data-rc52-progress/.test(module) && /Ce que tu construis/.test(module),
  guiltFreeReturn: /Rien à rattraper/.test(module) && /returnGapDays/.test(module),
  noMandatoryScreen: /insertAdjacentHTML/.test(module) && !/setState\s*\(/.test(module),
  funnelSnapshot: /function funnelSnapshot/.test(module) && /firstSession/.test(module) && /D7/.test(module),
  learningCounts: /mysteriesSolved/.test(module) && /lessonsDone/.test(module),
  activeSevenDays: /activeLast7/.test(module) && /lastSevenActive/.test(module),
  cssPresent: /rc52-progress/.test(css) && /rc52-welcome/.test(css),
  bundledLast: /english-spiral-rc51\.js','product-loop-rc52\.js/.test(build),
};
const errors = Object.entries(checks).filter(([,ok])=>!ok).map(([name])=>name);
const report={version:'1.0.0-rc.54.0',featureVersion:'RC52',status:errors.length?'failed':'passed',checks,errors};
fs.writeFileSync('RC52-PRODUCT-LOOP-AUDIT.json',JSON.stringify(report,null,2)+'\n');
if(errors.length){ console.error(report); process.exit(1); }
console.log('RC52 product loop audit: PASS');
