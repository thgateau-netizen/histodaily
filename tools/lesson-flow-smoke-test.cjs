const fs = require('fs');
const assert = require('assert');
const app = fs.readFileSync('app.js','utf8');
const core = fs.readFileSync('app-core.js','utf8');
const sw = fs.readFileSync('service-worker.js','utf8');

assert(app.includes('1.0.0-beta.64'), 'app version beta64 missing');
assert(core.includes('1.0.0-beta.64'), 'core version beta64 missing');
assert(sw.includes('histodaily-beta64-learning-quiz-fix'), 'service worker cache not bumped');

assert(app.includes('function expandedCompleteBlocks'), 'complete course expansion missing');
assert(app.includes('5 min de lecture') || app.includes('Cours complet'), 'complete course wording missing');
assert(app.includes('function handleQuizChoice'), 'MCQ quiz handler missing');
assert(app.includes('data-quiz-choice'), 'MCQ choice buttons missing');
assert(app.includes('Validation verrouillée'), 'lesson validation lock missing');
assert(app.includes('lessonQuizPassed'), 'quiz pass gate missing');
assert(app.includes('je ne donne pas la bonne réponse directement'), 'wrong answer no-spoil feedback missing');
assert(!app.includes('<details class="quiz-item"'), 'old reveal-answer quiz details still present');
assert(!app.includes('<strong>Réponse :</strong>'), 'direct quiz answer reveal still present');
assert(!app.includes('Réponse attendue :'), 'memo direct answer reveal still present');
assert(!app.includes('vrais amis') && !app.includes('vrais classements'), 'project-note social copy leaked');

console.log('lesson flow OK — beta64 complete course + locked MCQ quiz');
