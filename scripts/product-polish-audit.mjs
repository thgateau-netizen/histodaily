import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const pkg = JSON.parse(read('package.json'));
const css = read('histodaily.css');
const module = read('src/legacy-client/product-polish-rc35.js');
const build = read('scripts/build-client.mjs');
const onboarding = read('src/legacy-client/onboarding-v275.js');
const bundle = read('bundles/experience-rc27.js');
const errors = [];
const checks = {};
const pass = (name, condition, detail) => {
  checks[name] = { pass: Boolean(condition), detail };
  if (!condition) errors.push(`${name}: ${detail}`);
};

pass('polishModuleBeforeLeanFlow', /'quality-pass-rc31\.js','product-polish-rc35\.js','lean-flow-rc36\.js'\]/.test(build), 'La couche RC35 doit rester après les anciens polish et juste avant la simplification RC36.');
pass('polishModuleInBundle', bundle.includes('SOURCE: product-polish-rc35.js'), 'Le module RC35 doit exister dans le bundle réellement servi.');
pass('consistentDesignTokens', css.includes('--hd35-radius-card:18px') && css.includes('--hd35-line:'), 'Les écrans doivent partager les mêmes tokens de surface et de rayon.');
pass('mobileHeroReduced', css.includes('.rc24-hero{min-height:438px}') && css.includes('.rc24-hero{min-height:420px}'), 'Le hero mobile ne doit plus monopoliser presque tout le premier écran.');
pass('navigationRowsFlattened', css.includes('.hd214-chapter-row,\nhtml.hd35-polish .hd214-lesson-row') && css.includes('background:rgba(255,255,255,.022)'), 'Chapitres et cours doivent se lire comme une liste, pas des cartes imbriquées.');
pass('readerTypographyPrioritized', css.includes('.hd34-reader-page :where(p,li){font-size:1rem;line-height:1.67}'), 'La lecture doit privilégier la typographie au chrome.');
pass('rankingListFlattened', css.includes('.hd34-leaderboard .hdsv2-rank-row') && css.includes('box-shadow:none!important'), 'La longue liste de classement ne doit pas ressembler à un empilement de cartes.');
pass('secondaryProfileSurfacesQuiet', css.includes('.hd34-profile-fold{background:rgba(255,255,255,.018)'), 'Les modules secondaires du profil doivent rester visuellement secondaires.');
pass('bottomNavSafeArea', css.includes('bottom:max(8px,env(safe-area-inset-bottom))'), 'Le dock mobile doit respecter la safe area iOS.');
pass('focusVisibleStrong', css.includes(':focus-visible') && css.includes('outline-offset:3px'), 'Le focus clavier doit rester évident malgré le polish visuel.');
pass('reducedMotionRespected', css.includes('@media(prefers-reduced-motion:reduce)') && css.includes('transition-duration:.001ms!important'), 'Les micro-interactions doivent être coupées si l’utilisateur réduit les animations.');
pass('detailsStateAccessible', module.includes('aria-expanded') && module.includes('addEventListener("toggle"'), 'Les panneaux repliables doivent exposer leur état sans ajout d’aide textuelle.');
pass('activeNavCurrentPage', module.includes('aria-current", "page"') && module.includes('removeAttribute("aria-current")'), 'La navigation doit annoncer uniquement l’onglet actif comme page courante.');
pass('noBlockingLoadingOverlay', !css.includes('hd35-loading-overlay') && !module.includes('hd35-loading-overlay'), 'Le feedback de chargement ne doit pas ajouter un écran bloquant.');
pass('firstRunSingleDecision', onboarding.includes('hd35-onboarding-one') && !onboarding.includes('hd275-step-count') && !onboarding.includes('data-hd275-back'), 'La première ouverture doit conduire directement au choix de l’univers puis à l’expédition.');
pass('releaseVersionExposed', module.includes(`const VERSION = "${pkg.version}"`) && module.includes('version: VERSION'), 'La couche finale doit exposer la vraie version du build.');

const result = {
  version: pkg.version,
  status: errors.length ? 'failed' : 'passed',
  principle: 'désirable, fluide, évident; la hiérarchie remplace les explications',
  checks,
  errors
};
fs.writeFileSync(path.join(root, 'RC35-PRODUCT-POLISH-AUDIT.json'), JSON.stringify(result, null, 2));
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`HistoDaily ${pkg.version}: product polish audit passed (${Object.keys(checks).length} checks).`);
