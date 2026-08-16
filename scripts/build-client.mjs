import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const srcRoot = path.join(root, 'src', 'legacy-client');
const outRoot = path.join(root, 'bundles');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const version = pkg.version;

const groups = {
  'core-rc27.js': ['lessons-lite.js','app-bootstrap.js','sound-ui.js','app.js'],
  'content-rc27.js': ['content-library.js','content-literature.js','content-philosophy.js','content-english.js','content-english-rc19.js','content-philosophy-rc19.js','content-foundations-depth-rc19.js','discipline-labs-rc19.js','discipline-mysteries-rc19.js','content-premium-233.js','content-premium-234.js','content-premium-235.js','content-premium-236.js','content-premium-237.js','content-coherence-239.js','content-humanize-240.js','content-cleanup-241.js','content-audit-v267.js','mystery-clarity-v272.js','content-homogenize-rc32.js','content-editorial-rc33.js','content-english-redesign-rc37.js','content-philosophy-redesign-rc38.js','content-science-astronomy-rc39.js','content-difficulty-ramp-rc40.js','content-expansion-rc42.js','content-english-mysteries-rc49.js','content-english-value-rc50.js'],
  'experience-rc27.js': ['app-runtime.js','visual-v4.js','engagement-v263.js','mobile-layout.js','social-v2.js','streak-v265.js','archive-mobile-v268.js','course-mobile-v269.js','onboarding-v275.js','release-polish-v278.js','release-center-v279.js','polish-v280.js','course-polish-v283.js','course-interactions-rc20.js','launch-readiness-v284.js','performance-accessibility-v285.js','stability-v286.js','notifications-v288.js','adaptive-path-rc22.js','personalized-path-rc41.js','home-premium-rc24.js','daily-rotation-rc29.js','quality-pass-rc31.js','product-polish-rc35.js','lean-flow-rc36.js','adaptive-comfort-rc41.js','global-difficulty-ramp-rc40.js','daily-freshness-rc43.js','daily-hook-rc49.js']
};

fs.mkdirSync(outRoot, { recursive: true });
for (const [bundle, sources] of Object.entries(groups)) {
  const chunks = [`/* HistoDaily ${version} — generated bundle. Source order is intentional. */\n`];
  if (bundle === 'core-rc27.js') {
    chunks.push(`window.HD_BUILD_MANIFEST = Object.freeze(${JSON.stringify({version, architecture:'bundled-rc27', bundles:3})});\n`);
  }
  for (const source of sources) {
    const sourcePath = path.join(srcRoot, source);
    if (!fs.existsSync(sourcePath)) throw new Error(`Source missing: ${source}`);
    chunks.push(`\n/* ===== SOURCE: ${source} ===== */\n`);
    chunks.push(fs.readFileSync(sourcePath, 'utf8'));
    chunks.push('\n;\n');
  }
  fs.writeFileSync(path.join(outRoot, bundle), chunks.join(''), 'utf8');
}
const manifest = {
  version,
  bundleOrder: Object.keys(groups),
  sources: {
    core: groups['core-rc27.js'],
    content: groups['content-rc27.js'],
    experience: groups['experience-rc27.js']
  },
  uiPass: 'RC50 English Useful Packs',
  importantFix: 'English lessons now teach six reusable chunks; daily English mysteries reveal three useful expressions'
};
fs.writeFileSync(path.join(root, 'RC50-BUNDLE-MANIFEST.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(root, 'RC49-BUNDLE-MANIFEST.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(root, 'RC48-BUNDLE-MANIFEST.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(root, 'RC47-BUNDLE-MANIFEST.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(root, 'RC46-BUNDLE-MANIFEST.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(root, 'RC45-BUNDLE-MANIFEST.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(root, 'RC44-BUNDLE-MANIFEST.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(root, 'RC43-BUNDLE-MANIFEST.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(root, 'RC42-BUNDLE-MANIFEST.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
// Compatibility alias for existing discipline-specific audits.
fs.writeFileSync(path.join(root, 'RC41-BUNDLE-MANIFEST.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(root, 'RC40-BUNDLE-MANIFEST.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(root, 'RC39-BUNDLE-MANIFEST.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(root, 'RC27-BUNDLE-MANIFEST.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
console.log(`HistoDaily ${version}: ${Object.keys(groups).length} client bundles rebuilt.`);
