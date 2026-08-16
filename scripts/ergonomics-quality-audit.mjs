import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const exists = rel => fs.existsSync(path.join(root, rel));
const pkg = JSON.parse(read('package.json'));
const app = read('src/legacy-client/app.js');
const runtime = read('src/legacy-client/app-runtime.js');
const home = read('src/legacy-client/home-premium-rc24.js');
const quality = read('src/legacy-client/quality-pass-rc31.js');
const social = read('src/legacy-client/social-v2.js');
const css = read('histodaily.css');
const sw = read('service-worker.js');
const build = read('scripts/build-client.mjs');

const errors = [];
const warnings = [];
const checks = {};
const pass = (name, condition, detail) => {
  checks[name] = { pass: Boolean(condition), detail };
  if (!condition) errors.push(`${name}: ${detail}`);
};

const homeRender = home.slice(home.indexOf('function renderPremiumHome'), home.indexOf('renderHome = renderPremiumHome'));
const shell = app.slice(app.indexOf('function renderShell(content)'), app.indexOf('const beta113DirectRender'));
const mystery = app.slice(app.indexOf('function renderMystery()'), app.indexOf('function archiveCard'));
const toc = runtime.slice(runtime.indexOf('function buildReaderToc'), runtime.indexOf('function enhanceLesson'));
const reader = runtime.slice(runtime.indexOf('function enhanceLesson'), runtime.indexOf('function bindReaderActions'));
const filters = runtime.slice(runtime.indexOf('function lessonFilterMarkup'), runtime.indexOf('function lessonCardsMarkup'));
const chapters = runtime.slice(runtime.indexOf('function disciplineRailMarkup'), runtime.indexOf('function renderChapterIndex'));
const completion = quality.slice(quality.indexOf('function completionMarkup'), quality.indexOf('const previousRenderLessonText'));
const rank = social.slice(social.indexOf('renderRank = function socialV2RenderRank'), social.indexOf('function sealSocialProfileShell'));
const profileProgress = social.slice(social.indexOf('function profileProgressMarkup'), social.indexOf('function profileCollectionsMarkup'));
const profile = social.slice(social.indexOf('renderProfile = function socialV2RenderProfile'), social.indexOf('function fallbackPublicProfile'));

pass('homeOnePrimaryActionDuringDailyLoop', homeRender.includes('s.type === "complete" ? `<section class="rc24-dashboard') && !homeRender.includes('aria-label="Ta progression"'), 'La carte secondaire de l’accueil ne doit apparaître qu’une fois la boucle quotidienne terminée.');
pass('homeStatsAreNotNavigationButtons', homeRender.includes('class="rc44-metric"') && !homeRender.includes('data-rc24-profile'), 'Série et niveau doivent être des informations, pas deux faux boutons qui mènent au même profil.');
pass('homeUsesPlainDisciplineLanguage', homeRender.includes('<summary><span>Discipline</span>'), 'Le changement de domaine doit être nommé avec un mot immédiatement compréhensible.');
pass('expeditionIsImmersive', shell.includes('const immersiveMystery = state.tab === "mystery"') && shell.includes('const immersiveFlow = immersiveLesson || immersiveMystery') && shell.includes('navMarkup = immersiveFlow ? ""'), 'La navigation basse doit disparaître pendant une expédition, comme pendant un cours.');
pass('expeditionNoRedundantOpenStatus', !mystery.includes('"À résoudre"') && mystery.includes('is-open'), 'Un dossier ouvert n’a pas besoin d’un badge qui répète qu’il est à résoudre.');
pass('expeditionNestedSurfacesFlattened', css.includes('.tab-mystery .hd325-free-clue{') && css.includes('border-left:2px solid') && css.includes('.tab-mystery .hd300-solution{') && css.includes('border-top:1px solid'), 'Indice gratuit et solution doivent être intégrés au dossier, pas être deux cartes supplémentaires.');
pass('courseProgressUsesConcreteCounts', chapters.includes('${currentProgress.done}/${currentProgress.total || 0} cours') && !chapters.includes('${currentProgress.progress}%') && !chapters.includes('<span class="hd214-chapter-status"><b>${progress}%</b>'), 'Le catalogue doit privilégier des comptes concrets plutôt que répéter des pourcentages.');
pass('smallCourseListsHaveNoFilterBar', filters.includes('if (lessons.length <= 4) return ""') && filters.includes('if (lessons.length <= 4) return lessons'), 'Les filtres Tous/À faire/Terminés ne doivent exister que lorsqu’ils apportent réellement quelque chose.');
pass('readerTocOnlyForLongCourses', toc.includes('if (sections.length < 8) return;'), 'Un sommaire ne doit apparaître que pour un cours réellement long.');
pass('quizStartsOnQuestion', reader.includes('if (hook && view === "quiz") hook.remove();'), 'Le quiz doit arriver directement sur la question, sans carte d’introduction supplémentaire.');
pass('activeQuizHasNoResetCompetingAction', reader.includes('!article.querySelector(".rc31-completion,.rc31-retry")') && reader.includes('querySelectorAll("[data-reset-quiz]").forEach(node => node.remove())'), 'Le reset ne doit pas concurrencer Continuer pendant chaque question.');
pass('completionHasNoMasteryPercentage', !completion.includes('rc31-mastery-ring') && !completion.includes('memory.mastery') && completion.includes('rc44-completion-mark'), 'Le bilan utilisateur ne doit plus exposer un pourcentage abstrait de maîtrise.');
pass('completionHasAtMostTwoActions', completion.includes('const primary') && completion.includes('const secondary') && !completion.includes('data-reset-quiz') && !completion.includes('data-rc31-review'), 'Après réussite : une action principale et au plus une secondaire.');
pass('dailyLoopCompletionEndsTheDay', completion.includes('Terminer pour aujourd’hui') && completion.includes('belongsToTodayLoop'), 'Le cours lié au dossier du jour doit déboucher naturellement sur la fin de session.');
pass('rankingRowsDoNotRepeatAffordance', !social.includes('· voir le profil'), 'Une ligne déjà cliquable n’a pas besoin de répéter « voir le profil ».');
pass('rankingRefreshIsExceptional', rank.includes('pending || status.phase === "error" ? `<button') && !rank.includes('</div><button type="button" class="ghost" data-social-refresh aria-label="Actualiser le classement">'), 'Le bouton actualiser ne doit apparaître que si une action est réellement nécessaire.');
pass('profileLearningFirst', profile.includes('<section class="hd257-dashboard rc44-profile-dashboard">${profileRhythmMarkup()}</section>') && !profile.includes('${profileCommunityMarkup(s)}'), 'Le profil principal doit montrer apprentissage et rythme; la communauté reste dans son panneau dédié.');
pass('profileDomainsAreProgressivelyDisclosed', profileProgress.includes('const visible = ordered.slice(0, 4)') && profileProgress.includes('rc44-more-domains'), 'Le profil ne doit pas afficher onze domaines d’un coup.');
pass('profileAvoidsAveragePercentHeadline', !profileProgress.includes('${model.average}%') && profileProgress.includes('totalDone'), 'Le résumé de progression doit utiliser un total concret, pas une moyenne abstraite.');
pass('serviceWorkerDoesNotPrecacheLegacyArtwork', !sw.includes('/hero-astronomy-art-v2.png') && !sw.includes('/hero-astronomy-art-v3-faded.png') && !sw.includes('/hero-astronomy-blackhole.png') && !sw.includes('/assets/hero-history-revolution.webp'), 'Le premier cache ne doit pas télécharger des visuels historiques inutiles.');
pass('rc47BuildManifestIsGenerated', build.includes("'RC47-BUNDLE-MANIFEST.json'") && build.includes("uiPass: 'RC47 Daily Hook'"), 'Les outils de release doivent décrire la version réellement livrée.');
pass('versionConsistent', home.includes(`const VERSION = "${pkg.version}"`) && read('src/legacy-client/daily-freshness-rc43.js').includes(`const VERSION = "${pkg.version}"`) && sw.includes(`const APP_VERSION = "${pkg.version}"`), 'Les couches capables d’exposer la version doivent rester alignées.');
pass('touchTargetsMeetMobileBaseline', css.includes('button,[role="button"]{min-block-size:44px!important;min-height:44px!important}'), 'Les cibles tactiles interactives doivent conserver une base de 44 px.');
pass('iosSafeAreaHandled', css.includes('env(safe-area-inset-bottom)') && css.includes('.mystery-focus-shell'), 'Navigation et flux immersifs doivent respecter la safe area des iPhone.');
pass('keyboardFocusVisible', css.includes(':focus-visible') && css.includes('outline-offset:3px'), 'Le focus clavier doit rester visible sur toute l’application.');
pass('reducedMotionSupported', css.includes('@media(prefers-reduced-motion:reduce)') && css.includes('transition-duration:.001ms!important'), 'Les animations doivent respecter la préférence système de réduction des mouvements.');
pass('routeChangesAreAnnounced', runtime.includes('app-announcer') && runtime.includes('aria-live') || read('index.html').includes('id="app-announcer"'), 'Les changements de vue doivent rester annoncés aux technologies d’assistance.');
pass('singleScreenOnboarding', read('src/legacy-client/onboarding-v275.js').includes('hd35-onboarding-one') && read('src/legacy-client/onboarding-v275.js').includes('discipline qui t’attire'), 'Le premier lancement doit rester court et utiliser une terminologie explicite.');
pass('rankingHasRecoverableErrorState', social.includes('Impossible d’actualiser pour le moment') && social.includes('data-social-refresh>Réessayer'), 'Une erreur réseau de classement doit proposer une récupération claire.');
pass('noBlockingPolishOverlay', !read('src/legacy-client/product-polish-rc35.js').includes('hd35-loading-overlay'), 'Le polish ne doit pas réintroduire un écran de chargement bloquant.');

const cssBytes = Buffer.byteLength(css);
const cssLines = css.split('\n').length;
const count = token => (css.match(new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
const cssDebt = {
  bytes: cssBytes,
  lines: cssLines,
  important: count('!important'),
  boxShadow: count('box-shadow'),
  borderRadius: count('border-radius'),
  backdropFilter: count('backdrop-filter'),
  zIndex: count('z-index'),
  transitions: count('transition'),
  animations: count('animation'),
  mediaQueries: count('@media')
};
const bundleFiles = ['bundles/core-rc27.js','bundles/content-rc27.js','bundles/experience-rc27.js'];
const bundles = Object.fromEntries(bundleFiles.filter(exists).map(rel => {
  const raw = fs.readFileSync(path.join(root, rel));
  return [rel, { bytes: raw.length, gzipBytes: zlib.gzipSync(raw, { level: 9 }).length }];
}));
const initialRawBytes = Object.values(bundles).reduce((sum, item) => sum + item.bytes, 0) + cssBytes;
const initialGzipBytes = Object.values(bundles).reduce((sum, item) => sum + item.gzipBytes, 0) + zlib.gzipSync(Buffer.from(css), { level: 9 }).length;

if (cssDebt.important > 2500) warnings.push(`Dette CSS élevée: ${cssDebt.important} déclarations !important. À consolider dans une future passe structurelle avec validation visuelle.`);
if (cssDebt.lines > 10000) warnings.push(`Feuille CSS historique volumineuse: ${cssDebt.lines} lignes. Ne pas supprimer agressivement sans couverture visuelle navigateur.`);
if (initialGzipBytes > 1_500_000) warnings.push(`Poids initial compressé élevé: ${Math.round(initialGzipBytes/1024)} KiB CSS+JS.`);

const result = {
  version: pkg.version,
  status: errors.length ? 'failed' : 'passed_with_structural_debt',
  scope: 'ergonomie, navigation, densité, mobile, états, accessibilité, cohérence visuelle, performance perçue et dette UI — contenu exclu',
  checks,
  technicalDebt: {
    css: cssDebt,
    bundles,
    initialRawBytes,
    initialGzipBytes
  },
  warnings,
  errors,
  browserValidation: {
    status: 'not_available_in_environment',
    note: 'Chromium local est bloqué par la politique de l’environnement; aucune validation pixel-perfect automatisée n’est revendiquée.'
  }
};
fs.writeFileSync(path.join(root, 'RC47-ERGONOMICS-QUALITY-AUDIT.json'), JSON.stringify(result, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'RC45-ERGONOMICS-QUALITY-AUDIT.json'), JSON.stringify(result, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'RC44-ERGONOMICS-QUALITY-AUDIT.json'), JSON.stringify(result, null, 2) + '\n');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`HistoDaily ${pkg.version}: ergonomics audit passed (${Object.keys(checks).length} checks, ${warnings.length} structural warnings documented).`);
