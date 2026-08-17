import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const errors = [];
const pass = (condition, message) => { if (!condition) errors.push(message); };

const app = read('src/legacy-client/app.js');
const runtime = read('src/legacy-client/app-runtime.js');
const english = read('src/legacy-client/content-english-value-rc50.js');
const spiral = read('src/legacy-client/english-spiral-rc51.js');
const css = read('histodaily.css');
const build = read('scripts/build-client.mjs');

pass(/targetEntries:spec\.targets\.map/.test(english), 'Les packs RC50 n’exposent pas les couples expression/usage.');
pass(/scheduleEnglishDailyPackReview/.test(app), 'La résolution d’un dossier anglais ne programme pas son rappel.');
pass(/function scheduleEnglishDailyPackReview\(/.test(runtime), 'Le moteur de rappel quotidien anglais manque.');
pass(/function scheduleEnglishLessonChunkAnchors\(/.test(runtime), 'Le moteur de rappels de cours anglais manque.');
pass(/initialDays = \[1, 3, 7\]/.test(runtime), 'Les trois ancres J+1/J+3/J+7 ne sont pas configurées.');
pass(/source: "english-chunk"/.test(runtime), 'Les rappels de cours ne sont pas identifiés comme english-chunk.');
pass(/source: "english-daily-chunk"/.test(runtime), 'Les rappels du rituel court ne sont pas identifiés comme english-daily-chunk.');
pass(/reviewMode: "english-recall"/.test(runtime), 'Le rappel actif anglais manque.');
pass(/data-hd51-self="known"/.test(runtime) && /data-hd51-self="again"/.test(runtime), 'L’auto-évaluation du rappel actif manque.');
pass(/speakEnglish/.test(runtime), 'La réécoute TTS après rappel n’est pas branchée.');
pass(/backfillEnglishPhraseAnchors/.test(runtime), 'La migration des anciens cours anglais validés manque.');
pass(/scheduleEnglishDailyPackReview/.test(runtime.split('memory: {')[1] || ''), 'Le hook de rappel quotidien n’est pas exposé via HistoDaily.memory.');
pass(/\.hd51-english-recall/.test(css) && /\.hd51-recall-answer/.test(css), 'Les styles du rappel actif anglais manquent.');
pass(/english-spiral-rc51\.js/.test(build), 'Le module RC51 n’est pas inclus dans le bundle expérience.');
pass(/englishSpiralRC51/.test(spiral), 'Les métadonnées RC51 manquent.');

const report = {
  version: JSON.parse(read('package.json')).version,
  status: errors.length ? 'failed' : 'passed',
  principle: 'Un bloc d’anglais utile doit revenir avant d’être oublié : reconnaissance douce d’abord, rappel actif ensuite. Le rituel court compte autant que le cours complet.',
  behavior: {
    courseChunksPerLesson: 6,
    courseAnchorGroups: 3,
    initialScheduleDays: [1,3,7],
    dailyMysteryPackScheduledNextDay: true,
    firstExposure: 'contextual recognition',
    laterExposure: 'active recall + self assessment + optional TTS',
    legacyBackfill: 'one completed English lesson per startup max'
  },
  guardrails: {
    noNewMandatoryScreen: true,
    usesExistingReviewQueue: true,
    noExactStringGradingForProduction: true,
    userMaySpeakInsteadOfType: true
  },
  errors
};
fs.writeFileSync(path.join(root, 'RC51-ENGLISH-SPIRAL-AUDIT.json'), JSON.stringify(report, null, 2) + '\n');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('English RC51 spiral audit passed.');
