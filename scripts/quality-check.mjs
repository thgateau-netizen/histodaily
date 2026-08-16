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
pass(read('service-worker.js').includes('histodaily-rc31-quality-v1'), 'service-worker: cache RC31 absent');
pass(read('scripts/build-client.mjs').includes('quality-pass-rc31.js'), 'build: quality-pass-rc31.js non bundle');

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
    cacheVersionAligned: sw.includes('histodaily-rc31-quality-v1'),
    cssAssetsChecked: new Set(cssUrls).size,
    pwaAssetsChecked: new Set(swAssets).size,
    activeSvgPlaceholders: placeholderRefs.filter(ref => css.includes(ref) || sw.includes(ref)),
    genericQuizQuestions: generic,
    qualityModuleBundled: read('scripts/build-client.mjs').includes('quality-pass-rc31.js')
  },
  warnings,
  errors
};
fs.writeFileSync(path.join(root,'RC31-QUALITY-AUDIT.json'), JSON.stringify(result,null,2));
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`HistoDaily ${version}: quality checks passed (${warnings.length} warning(s)).`);
