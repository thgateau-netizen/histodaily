import fs from 'node:fs';

const filesToScan = ['lessons-lite.js', 'lib/hd-data.js', 'app.js', 'lib/hd-api.js'];
const issues = [];

for (const file of filesToScan) {
  if (!fs.existsSync(file)) issues.push(`Fichier manquant: ${file}`);
}

for (const file of filesToScan.filter(file => fs.existsSync(file))) {
  const text = fs.readFileSync(file, 'utf8');
  for (const word of ['Trace utile', 'Erreur à éviter', '+$ lesson.xp', 'Donner envie de revenir', 'Objectif : mettre en avant', 'vrais amis', 'vrais classements']) {
    if (text.includes(word)) issues.push(`Motif interdit présent dans ${file}: ${word}`);
  }
}

const versionFiles = ['app-core.js', 'index.html', 'service-worker.js', 'lib/hd-api.js', 'manifest.webmanifest'];
const versionOk = versionFiles.every(file => fs.existsSync(file) && fs.readFileSync(file, 'utf8').includes('1.0.0-beta.63'));
if (!versionOk) issues.push('Version beta63 absente dans au moins un fichier critique');

const routeFiles = [
  'api/v1/leaderboard/[action].js',
  'api/v1/friends/sync.js',
  'api/v1/me.js',
  'api/v1/progress/reset.js'
];
for (const file of routeFiles) {
  if (!fs.existsSync(file)) issues.push(`Endpoint manquant: ${file}`);
}
if (!fs.existsSync('lib/hd-supabase.js')) issues.push('Helper Supabase manquant: lib/hd-supabase.js');
if (!fs.existsSync('tools/supabase-schema.sql')) issues.push('Schéma Supabase manquant');

const api = fs.existsSync('lib/hd-api.js') ? fs.readFileSync('lib/hd-api.js', 'utf8') : '';
for (const marker of ['beta63FriendSyncFetch', 'beta63StableFriendCode', 'beta63CanonicalLeaderboardNames', 'beta63FriendDeleteSync', 'beta63UiCopyCleanup', 'profileByFriendCode', 'on_conflict=player_id,friend_code']) {
  if (!api.includes(marker)) issues.push(`Correctif social absent: ${marker}`);
}

if (issues.length) {
  console.error('Audit contenu échoué:');
  issues.forEach(i => console.error(' - ' + i));
  process.exit(1);
}
console.log('Audit contenu OK — beta63 social-debug-cleanup');
