import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const app = read('src/legacy-client/app.js');
const runtime = read('src/legacy-client/app-runtime.js');
const social = read('src/legacy-client/social-v2.js');
const home = read('src/legacy-client/home-premium-rc24.js');
const coursePolish = read('src/legacy-client/course-polish-v283.js');
const qualityPass = read('src/legacy-client/quality-pass-rc31.js');
const build = read('scripts/build-client.mjs');
const pkg = JSON.parse(read('package.json'));
const errors = [];
const checks = {};
const pass = (name, condition, detail) => {
  checks[name] = { pass: Boolean(condition), detail };
  if (!condition) errors.push(`${name}: ${detail}`);
};

const indexFn = runtime.slice(runtime.indexOf('function renderChapterIndex'), runtime.indexOf('function themeRailMarkup'));
const themeFn = runtime.slice(runtime.indexOf('function renderChapterCourses'), runtime.indexOf('function bindLearnActions'));
const readerEnhanceStart = runtime.indexOf('function enhanceLesson');
const readerEnhance = runtime.slice(readerEnhanceStart, runtime.indexOf('const previousRenderLesson', readerEnhanceStart));
const mysteryFn = app.slice(app.indexOf('function renderMystery()'), app.indexOf('function archiveCard'));
const rankFn = social.slice(social.indexOf('renderRank = function socialV2RenderRank'), social.indexOf('function sealSocialProfileShell'));
const profileFn = social.slice(social.indexOf('renderProfile = function socialV2RenderProfile'), social.indexOf('function fallbackPublicProfile'));

pass('rc33EditorialPatchBundledByBuild', build.includes("'content-editorial-rc33.js'"), 'La revue éditoriale RC33 doit être incluse dans le bundle réel.');
pass('courseIndexNoGiantHero', !indexFn.includes('disciplineHeroMarkup('), 'La bibliothèque ne doit plus empiler switch discipline + grand hero + reprise + chapitres.');
pass('themePageNoDuplicateChapterHero', !themeFn.includes('hd214-chapter-header'), 'Le chapitre ne doit être présenté qu’une fois.');
pass('themePageNoDuplicateWorldHero', !themeFn.includes('hd214-world-hero'), 'Le thème ne doit pas être répété dans une seconde grande carte.');
pass('readerSingleFormatControl', readerEnhance.includes('.rc26-course-toolbar,.lesson-next-choice') && !readerEnhance.includes('hd214-reader-stage"><span>'), 'Un seul sélecteur Express / Complet / Quiz doit rester visible.');
pass('readerNoDuplicateInlineCTA', readerEnhance.includes('.lesson-next-choice'), 'Les CTA internes redondants doivent être retirés au profit du footer contextuel.');
pass('quizNoSecondFooter', readerEnhance.includes('if (view !== \"quiz\") article.insertAdjacentHTML'), 'Le quiz possède déjà sa navigation et son bilan : aucun second footer ne doit être ajouté.');
pass('courseNoDecorativeReadingLayers', !coursePolish.includes('hd283-memory-card') && !coursePolish.includes('hd283-reading-guide') && !coursePolish.includes("header.insertAdjacentHTML('beforeend', `<div class=\"hd283-reader-progress"), 'La lecture ne doit plus empiler phrase à garder + guide + barre de lecture autour du vrai contenu.');
pass('quizSingleCompletionSurface', qualityPass.includes('hero?.remove();') && qualityPass.includes('hd34-course-result'), 'Le bilan, la maîtrise et la prochaine action doivent être fusionnés dans une seule surface.');
pass('guidedMysteryOneAnswerMode', mysteryFn.includes('guidedChoices.length >= 3 ?') && mysteryFn.includes(': `<form class="guess'), 'Le mode guidé doit montrer des choix OU un champ libre, jamais les deux.');
pass('solvedMysteryNextActionMerged', mysteryFn.includes('hd34-solved-next') && !mysteryFn.includes('hd300-next-step'), 'La suite après résolution doit rester dans le résultat, sans carte additionnelle.');
pass('mysteryNoRankingDetour', !mysteryFn.includes('Archives et classement') && !mysteryFn.includes('small-leader social-teaser'), 'Le classement n’a rien à faire dans le flux de résolution.');
pass('rankingNoExplanatoryScoreCard', !rankFn.includes('hdsv2-score-card') && rankFn.includes('hd34-my-rank'), 'Le classement doit commencer par les filtres puis les positions, pas par une grande carte explicative.');
pass('profileSecondaryWowCollapsed', profileFn.includes('Carte de curiosité et collections') && profileFn.indexOf('${profileProgressMarkup(model)}') < profileFn.indexOf('Carte de curiosité et collections'), 'La progression utile doit précéder les modules décoratifs secondaires.');
pass('homeSingleStageIndicator', !home.includes('${routeIndex}/3') && home.includes('rc24-route'), 'Le parcours du jour ne doit pas afficher deux fois le même indicateur d’étape.');

const result = {
  version: pkg.version,
  status: errors.length ? 'failed' : 'passed',
  philosophy: 'une action principale visible; contexte secondaire à la demande',
  before: {
    courseLibrary: 'discipline rail + hero + reprise + chapitres',
    themePage: 'header chapitre + rail thèmes + hero thème + titre cours',
    lesson: 'tabs header + barre de progression + tabs dans article + CTA article + footer',
    expeditionGuided: '3 choix visibles + formulaire technique conservé en arrière-plan',
    expeditionSolved: 'résultat + carte étape suivante + archives + teaser classement',
    ranking: '2 rangées de filtres + grosse carte score explicative + classement',
    profile: 'hero + carte orbitale + rythme + communauté + progression + collections + succès + réglages tous ouverts'
  },
  after: {
    courseLibrary: 'sélecteur discipline replié + reprise + chapitres',
    themePage: 'rail thèmes + contexte actif + liste des cours',
    lesson: 'tabs uniques + contenu + un CTA contextuel',
    expeditionGuided: '3 choix uniquement; champ libre uniquement en mode libre',
    expeditionSolved: 'résultat et prochaine action fusionnés; archives repliées',
    ranking: 'filtres + ligne personnelle compacte + classement',
    profile: 'hero + rythme/communauté + progression; curiosité, collections et succès repliés'
  },
  checks,
  errors
};
fs.writeFileSync(path.join(root, 'RC35-UI-FLOW-AUDIT.json'), JSON.stringify(result, null, 2));
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`HistoDaily ${pkg.version}: UI flow audit passed (${Object.keys(checks).length} checks).`);
