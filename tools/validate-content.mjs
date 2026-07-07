import fs from 'node:fs';
const lessonsLite = fs.readFileSync('lessons-lite.js','utf8');
const dataApi = fs.readFileSync('api/v1/_data.js','utf8');
const issues = [];
for (const word of ['Trace utile','Erreur à éviter','+$ lesson.xp']) {
  if (lessonsLite.includes(word) || dataApi.includes(word)) issues.push(`Motif interdit présent: ${word}`);
}
const versionOk = ['app-core.js','index.html','service-worker.js','api/v1/health.js'].every(file => fs.readFileSync(file,'utf8').includes('1.0.0-beta.51'));
if (!versionOk) issues.push('Version beta51 absente dans au moins un fichier critique');
if (!fs.existsSync('api/v1/leaderboard/submit.js')) issues.push('Endpoint leaderboard submit manquant');
if (issues.length) {
  console.error('Audit contenu échoué:');
  issues.forEach(i => console.error(' - '+i));
  process.exit(1);
}
console.log('Audit contenu OK — beta51');
