import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const pkg = JSON.parse(read('package.json'));
const version = pkg.version;
const errors = [];
const warnings = [];
const pass = (condition, message) => { if (!condition) errors.push(message); };

for (const rel of ['index.html','manifest.webmanifest','service-worker.js']) {
  pass(read(rel).includes(version), `${rel}: version ${version} absente`);
}
pass(read('service-worker.js').includes('histodaily-rc49-flow-english-fix-v1'), 'service-worker: cache RC46 absent');
pass(read('RC49-BUNDLE-MANIFEST.json').includes('content-editorial-rc33.js'), 'bundle manifest: content-editorial-rc33.js absent');
pass(read('bundles/content-rc27.js').includes('SOURCE: content-editorial-rc33.js'), 'bundle réel: content-editorial-rc33.js absent');
pass(read('RC49-BUNDLE-MANIFEST.json').includes('content-english-redesign-rc37.js'), 'bundle manifest: content-english-redesign-rc37.js absent');
pass(read('bundles/content-rc27.js').includes('SOURCE: content-english-redesign-rc37.js'), 'bundle réel: content-english-redesign-rc37.js absent');
pass(read('RC49-BUNDLE-MANIFEST.json').includes('content-english-mysteries-rc49.js'), 'bundle manifest: content-english-mysteries-rc49.js absent');
pass(read('bundles/content-rc27.js').includes('SOURCE: content-english-mysteries-rc49.js'), 'bundle réel: content-english-mysteries-rc49.js absent');

pass(read('RC49-BUNDLE-MANIFEST.json').includes('content-philosophy-redesign-rc38.js'), 'bundle manifest: content-philosophy-redesign-rc38.js absent');
pass(read('bundles/content-rc27.js').includes('SOURCE: content-philosophy-redesign-rc38.js'), 'bundle réel: content-philosophy-redesign-rc38.js absent');
pass(read('RC49-BUNDLE-MANIFEST.json').includes('content-science-astronomy-rc39.js'), 'bundle manifest: content-science-astronomy-rc39.js absent');
pass(read('bundles/content-rc27.js').includes('SOURCE: content-science-astronomy-rc39.js'), 'bundle réel: content-science-astronomy-rc39.js absent');
pass(read('RC49-BUNDLE-MANIFEST.json').includes('content-difficulty-ramp-rc40.js'), 'bundle manifest: content-difficulty-ramp-rc40.js absent');
pass(read('bundles/content-rc27.js').includes('SOURCE: content-difficulty-ramp-rc40.js'), 'bundle réel: content-difficulty-ramp-rc40.js absent');
pass(read('RC49-BUNDLE-MANIFEST.json').includes('global-difficulty-ramp-rc40.js'), 'bundle manifest: global-difficulty-ramp-rc40.js absent');
pass(read('RC49-BUNDLE-MANIFEST.json').includes('personalized-path-rc41.js'), 'bundle manifest: personalized-path-rc41.js absent');
pass(read('bundles/experience-rc27.js').includes('SOURCE: personalized-path-rc41.js'), 'bundle experience: personalized-path-rc41.js absent');
pass(read('RC49-BUNDLE-MANIFEST.json').includes('adaptive-comfort-rc41.js'), 'bundle manifest: adaptive-comfort-rc41.js absent');
pass(read('bundles/experience-rc27.js').includes('SOURCE: adaptive-comfort-rc41.js'), 'bundle experience: adaptive-comfort-rc41.js absent');
pass(read('bundles/experience-rc27.js').includes('SOURCE: global-difficulty-ramp-rc40.js'), 'bundle réel: global-difficulty-ramp-rc40.js absent');
pass(read('RC49-BUNDLE-MANIFEST.json').includes('content-expansion-rc42.js'), 'bundle manifest: content-expansion-rc42.js absent');
pass(read('bundles/content-rc27.js').includes('SOURCE: content-expansion-rc42.js'), 'bundle réel: content-expansion-rc42.js absent');
pass(read('RC49-BUNDLE-MANIFEST.json').includes('daily-freshness-rc43.js'), 'bundle manifest: daily-freshness-rc43.js absent');
pass(read('bundles/experience-rc27.js').includes('SOURCE: daily-freshness-rc43.js'), 'bundle réel: daily-freshness-rc43.js absent');
pass(read('RC49-BUNDLE-MANIFEST.json').includes('daily-hook-rc49.js'), 'bundle manifest: daily-hook-rc49.js absent');
pass(read('bundles/experience-rc27.js').includes('SOURCE: daily-hook-rc49.js'), 'bundle réel: daily-hook-rc49.js absent');

const css = read('histodaily.css');
const cssUrls = [...css.matchAll(/url\(['"]?([^)'"?#]+)[^)]*\)/g)].map(m => m[1]).filter(v => !v.startsWith('data:') && !v.startsWith('http'));
for (const raw of new Set(cssUrls)) {
  const rel = raw.replace(/^\.\//,'').replace(/^\//,'');
  if (rel && !fs.existsSync(path.join(root, rel))) errors.push(`CSS asset manquant: ${raw}`);
}

const sw = read('service-worker.js');
const swAssets = [...sw.matchAll(/["'](\/(?:assets|bundles)\/[^"'?]+(?:\.[a-z0-9]+))[?^"']*/gi)].map(m => m[1]);
for (const raw of new Set(swAssets)) {
  const rel = raw.replace(/^\//,'');
  if (!fs.existsSync(path.join(root, rel))) errors.push(`PWA asset manquant: ${raw}`);
}

const placeholderRefs = ['hero-art.svg','hero-cinema.svg','hero-economy.svg','hero-geography.svg','hero-literature.svg','hero-music.svg','hero-science-inventions.svg'];
for (const ref of placeholderRefs) {
  if (css.includes(ref) || sw.includes(ref)) errors.push(`Placeholder visuel encore actif: ${ref}`);
}

const contentFiles = fs.readdirSync(path.join(root,'src','legacy-client')).filter(name => /^content.*\.js$/.test(name));
let content = contentFiles.map(name => read(path.join('src','legacy-client',name))).join('\n');
const generic = (content.match(/Quelle affirmation est la plus juste \?/g) || []).length;
if (generic) warnings.push(`${generic} formulation(s) générique(s) « Quelle affirmation est la plus juste ? » encore présentes`);

const result = {
  version,
  status: errors.length ? 'failed' : 'passed',
  checks: {
    runtimeVersionAligned: !errors.some(e => e.includes('version')),
    cacheVersionAligned: sw.includes('histodaily-rc49-flow-english-fix-v1'),
    cssAssetsChecked: new Set(cssUrls).size,
    pwaAssetsChecked: new Set(swAssets).size,
    activeSvgPlaceholders: placeholderRefs.filter(ref => css.includes(ref) || sw.includes(ref)),
    genericQuizQuestions: generic,
    qualityModuleBundled: read('RC49-BUNDLE-MANIFEST.json').includes('content-editorial-rc33.js') && read('bundles/content-rc27.js').includes('SOURCE: content-editorial-rc33.js'),
    englishRedesignBundled: read('RC49-BUNDLE-MANIFEST.json').includes('content-english-redesign-rc37.js') && read('bundles/content-rc27.js').includes('SOURCE: content-english-redesign-rc37.js'),
    englishMysteryClarityBundled: read('RC49-BUNDLE-MANIFEST.json').includes('content-english-mysteries-rc49.js') && read('bundles/content-rc27.js').includes('SOURCE: content-english-mysteries-rc49.js'),
    philosophyRedesignBundled: read('RC49-BUNDLE-MANIFEST.json').includes('content-philosophy-redesign-rc38.js') && read('bundles/content-rc27.js').includes('SOURCE: content-philosophy-redesign-rc38.js'),
    scienceAstronomyRedesignBundled: read('RC49-BUNDLE-MANIFEST.json').includes('content-science-astronomy-rc39.js') && read('bundles/content-rc27.js').includes('SOURCE: content-science-astronomy-rc39.js'),
    globalDifficultyRampBundled: read('RC49-BUNDLE-MANIFEST.json').includes('content-difficulty-ramp-rc40.js') && read('bundles/content-rc27.js').includes('SOURCE: content-difficulty-ramp-rc40.js') && read('bundles/experience-rc27.js').includes('SOURCE: global-difficulty-ramp-rc40.js'),
    personalizedPathBundled: read('RC49-BUNDLE-MANIFEST.json').includes('personalized-path-rc41.js') && read('bundles/experience-rc27.js').includes('SOURCE: personalized-path-rc41.js'),
    adaptiveComfortBundled: read('RC49-BUNDLE-MANIFEST.json').includes('adaptive-comfort-rc41.js') && read('bundles/experience-rc27.js').includes('SOURCE: adaptive-comfort-rc41.js'),
    catalogueExpansionBundled: read('RC49-BUNDLE-MANIFEST.json').includes('content-expansion-rc42.js') && read('bundles/content-rc27.js').includes('SOURCE: content-expansion-rc42.js'),
    dailyFreshnessBundled: read('RC49-BUNDLE-MANIFEST.json').includes('daily-freshness-rc43.js') && read('bundles/experience-rc27.js').includes('SOURCE: daily-freshness-rc43.js'),
    dailyHookBundled: read('RC49-BUNDLE-MANIFEST.json').includes('daily-hook-rc49.js') && read('bundles/experience-rc27.js').includes('SOURCE: daily-hook-rc49.js')
  },
  warnings,
  errors
};
fs.writeFileSync(path.join(root,'RC49-QUALITY-AUDIT.json'), JSON.stringify(result,null,2));
fs.writeFileSync(path.join(root,'RC45-QUALITY-AUDIT.json'), JSON.stringify(result,null,2));
fs.writeFileSync(path.join(root,'RC44-QUALITY-AUDIT.json'), JSON.stringify(result,null,2));
fs.writeFileSync(path.join(root,'RC43-QUALITY-AUDIT.json'), JSON.stringify(result,null,2));
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`HistoDaily ${version}: quality checks passed (${warnings.length} warning(s)).`);
