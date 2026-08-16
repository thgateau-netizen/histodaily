import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const exists = rel => fs.existsSync(path.join(root, rel));
const pkg = JSON.parse(read('package.json'));
const css = read('histodaily.css');
const baseline = { cssBytes: 781199, cssLines: 11449, important: 2866, obsoleteVisualBytes: 60182 };

const runtimeFiles = [
  'index.html','privacy.html',
  ...fs.readdirSync(path.join(root,'src','legacy-client')).filter(f=>f.endsWith('.js')).map(f=>`src/legacy-client/${f}`),
  ...fs.readdirSync(path.join(root,'bundles')).filter(f=>f.endsWith('.js')).map(f=>`bundles/${f}`)
];
const corpus = runtimeFiles.map(read).join('\n');

const deadSelectors = [];
const blockPrelude = /([^{}]+)\{/g;
let m;
while ((m = blockPrelude.exec(css))) {
  const prelude = m[1].replace(/\/\*[\s\S]*?\*\//g,'').trim();
  if (!prelude || prelude.startsWith('@')) continue;
  const tokens = new Set([
    ...[...prelude.matchAll(/(?<![\w-])\.([A-Za-z_][\w-]*)/g)].map(x=>x[1]),
    ...[...prelude.matchAll(/#([A-Za-z_][\w-]*)/g)].map(x=>x[1])
  ]);
  if (tokens.size && [...tokens].every(token => !corpus.includes(token))) deadSelectors.push(prelude.slice(0,180));
}

const cssBytes = Buffer.byteLength(css);
const cssLines = css.split('\n').length;
const important = (css.match(/!important/g) || []).length;
const cssGzip = zlib.gzipSync(Buffer.from(css), {level:9}).length;
const removedAssets = [
  'assets/hero-art.svg','assets/hero-cinema.svg','assets/hero-economy.svg','assets/hero-geography.svg',
  'assets/hero-literature.svg','assets/hero-music.svg','assets/hero-science-inventions.svg','assets/hero-history-revolution.webp'
];
const errors = [];
if (deadSelectors.length) errors.push(`${deadSelectors.length} sélecteur(s) manifestement inatteignable(s) subsistent.`);
for (const rel of removedAssets) if (exists(rel)) errors.push(`Asset obsolète encore présent: ${rel}`);
if (cssBytes >= baseline.cssBytes) errors.push('La passe RC45 ne réduit pas la feuille CSS par rapport à RC44.');
if (important >= baseline.important) errors.push('La passe RC45 ne réduit pas les !important par rapport à RC44.');

const result = {
  version: pkg.version,
  status: errors.length ? 'failed' : 'passed',
  method: 'Conservative static reachability: a CSS rule is pruned only when every class/id token in its selector is absent from all runtime HTML and client JS sources/bundles.',
  baselineRC44: baseline,
  rc45: { cssBytes, cssLines, important, cssGzipBytes: cssGzip, deadSelectorsDetected: deadSelectors.length },
  improvement: {
    cssBytesRemoved: baseline.cssBytes - cssBytes,
    cssPercent: Number(((baseline.cssBytes-cssBytes)/baseline.cssBytes*100).toFixed(1)),
    importantRemoved: baseline.important - important,
    importantPercent: Number(((baseline.important-important)/baseline.important*100).toFixed(1)),
    obsoleteVisualAssetsRemoved: removedAssets.length,
    obsoleteVisualBytesRemoved: baseline.obsoleteVisualBytes
  },
  removedAssets,
  deadSelectorSamples: deadSelectors.slice(0,20),
  errors
};
fs.writeFileSync(path.join(root,'RC48-UI-CSS-CLEANUP-AUDIT.json'), JSON.stringify(result,null,2)+'\n');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`HistoDaily ${pkg.version}: UI/CSS cleanup audit passed — ${result.improvement.cssPercent}% CSS bytes removed, ${result.improvement.importantRemoved} !important removed.`);
