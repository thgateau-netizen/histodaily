import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const require = createRequire(import.meta.url);
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const pkg = JSON.parse(read('package.json'));
const version = pkg.version;
const errors = [];
const warnings = [];
const pass = (ok, msg) => { if (!ok) errors.push(msg); };

const index = read('index.html');
const sw = read('service-worker.js');
const vercel = read('vercel.json');
const api = read('lib/hd-api.js');
const social = read('lib/hd-social-v2.js');
const serverData = require(path.join(root, 'lib/hd-data.js'));
const catalogue = JSON.parse(read('catalogue-export-temp.json'));
const clientMysteries = Array.isArray(catalogue.mysteries) ? catalogue.mysteries : [];
const clientPacks = catalogue.packs && typeof catalogue.packs === 'object' ? Object.keys(catalogue.packs) : [];
const serverIds = new Set((serverData.mysteries || []).map(x => String(x.id)));
const clientIds = new Set(clientMysteries.map(x => String(x.id)));
const missingServerIds = [...clientIds].filter(id => !serverIds.has(id));
const extraServerIds = [...serverIds].filter(id => !clientIds.has(id));

pass(index.includes(version) && sw.includes(version) && api.includes(`const VERSION = '${version}'`) && social.includes(`const VERSION = '${version}'`), 'Version runtime/backend désalignée.');
pass(serverIds.size === clientIds.size && !missingServerIds.length && !extraServerIds.length, 'Catalogue mystères client/serveur désaligné.');
pass(social.includes('const expectedMystery = mysteryById(mysteryId);'), 'Le score social impose encore un mystère global par date.');
pass(social.includes("mode: 'daily-already-ranked'"), 'Garde une-expédition-classée-par-jour absente.');
pass(social.includes('const bestDailyRows = new Map();'), 'Le classement ne déduplique pas les anciennes doubles expéditions quotidiennes.');
pass(!/script-src[^;]*'unsafe-inline'/.test(vercel), 'CSP script autorise encore unsafe-inline.');
pass(!/<script(?![^>]*\bsrc=)[^>]*>/i.test(index), 'Script inline encore présent dans index.html.');
pass(read('.vercelignore').includes('catalogue-export-temp.json'), 'Export catalogue de travail exposé au déploiement.');
pass(api.includes(`readyCourses: ${clientPacks.length},`), 'Health API: nombre de cours périmé.');
pass(api.includes('publicMysteries: mysteries.length'), 'Health API: nombre de mystères non dynamique.');

const sourceFiles = fs.readdirSync(path.join(root, 'src/legacy-client')).filter(f => f.endsWith('.js'));
const clientSource = sourceFiles.map(f => read(`src/legacy-client/${f}`)).join('\n');
const backendSource = [api, social, read('lib/hd-supabase.js'), read('lib/hd-push.js')].join('\n');
const css = read('histodaily.css');
const bundleFiles = ['bundles/core-rc27.js','bundles/content-rc27.js','bundles/experience-rc27.js'];
const bundleStats = Object.fromEntries(bundleFiles.map(rel => {
  const buf = fs.readFileSync(path.join(root, rel));
  return [rel, { bytes: buf.length, gzipBytes: zlib.gzipSync(buf, { level: 9 }).length }];
}));
const cssBuf = Buffer.from(css);
const initialGzipBytes = zlib.gzipSync(cssBuf,{level:9}).length + Object.values(bundleStats).reduce((n,x)=>n+x.gzipBytes,0);

const metrics = {
  courses: clientPacks.length,
  clientMysteries: clientIds.size,
  serverMysteries: serverIds.size,
  clientSourceModules: sourceFiles.length,
  cssBytes: Buffer.byteLength(css),
  cssLines: css.split('\n').length,
  cssImportant: (css.match(/!important/g) || []).length,
  initialCssJsGzipBytes: initialGzipBytes,
  initialCssJsGzipMiB: Number((initialGzipBytes / 1048576).toFixed(2)),
  bundles: bundleStats,
  clientWindowGlobals: (clientSource.match(/window\.[A-Za-z_$][\w$]*\s*=/g) || []).length,
  clientMutationObservers: (clientSource.match(/MutationObserver/g) || []).length,
  clientEventListeners: (clientSource.match(/addEventListener\(/g) || []).length,
  clientCatchBlocks: (clientSource.match(/\bcatch\b/g) || []).length,
  clientEmptyCatchBlocks: (clientSource.match(/catch\s*(?:\([^)]*\))?\s*\{\s*\}/g) || []).length,
  backendCatchBlocks: (backendSource.match(/\bcatch\b/g) || []).length,
  backendFunctionReassignments: (backendSource.match(/^[A-Za-z_$][A-Za-z0-9_$]*\s*=\s*(?:async\s+)?function/gm) || []).length,
  localStorageWrites: (clientSource.match(/localStorage\.setItem/g) || []).length,
  localStorageReads: (clientSource.match(/localStorage\.getItem/g) || []).length
};

// Product-level limitations that are real but require architecture/product choices,
// not a safe patch in a maintenance release.
if (!/signIn|signUp|access_token|auth\/v1|sessionToken|userJwt/i.test(clientSource + backendSource)) warnings.push('IDENTITY_AUTH: identité sociale fondée sur playerId/code ami, sans authentification de compte forte. Un client modifié peut usurper des statistiques. Bloquant avant ouverture publique compétitive.');
if (!/hd_progress|progress_snapshot|course_progress/i.test(backendSource)) warnings.push('CLOUD_PROGRESS: progression détaillée (cours/quiz/mystères) locale uniquement. Le changement d’appareil dépend de la sauvegarde JSON manuelle.');
if (api.includes("mode: 'admin-only'") && api.includes('suppression des scores en ligne')) warnings.push('DATA_DELETION: aucune suppression autonome des données serveur ; administration requise. À résoudre avant diffusion publique large.');
if (!/rate.?limit|ratelimit/i.test(backendSource)) warnings.push('RATE_LIMIT: aucune limitation de débit applicative détectée sur les routes publiques/sociales.');
if (metrics.initialCssJsGzipBytes > 1_000_000) warnings.push(`STARTUP_WEIGHT: CSS + JS initiaux ≈ ${metrics.initialCssJsGzipMiB} MiB gzip, tout téléchargé au démarrage ; le contenu n’est pas encore chargé à la demande.`);
if (metrics.clientEmptyCatchBlocks > 200) warnings.push(`OBSERVABILITY: ${metrics.clientEmptyCatchBlocks} catch vides côté client ; beaucoup de défauts peuvent être masqués au lieu d’être diagnostiqués.`);
if (metrics.clientMutationObservers > 10) warnings.push(`RUNTIME_COMPLEXITY: ${metrics.clientMutationObservers} occurrences de MutationObserver et ${metrics.clientWindowGlobals} écritures globales window.* : architecture encore très patchée.`);
if (metrics.cssImportant > 1500) warnings.push(`CSS_DEBT: ${metrics.cssImportant} !important subsistent malgré RC45.`);

const priorities = [
  { priority: 'P0 corrigé RC46', area: 'Classements / backend', issue: '158 mystères client contre 17 serveur ; validation quotidienne incompatible avec la rotation personnalisée.', action: 'Catalogue serveur aligné sur les 158 mystères, validation par catalogue, une seule expédition classée par jour, déduplication historique par journée.' },
  { priority: 'P0 corrigé RC46', area: 'Cohérence release', issue: 'Backend encore estampillé RC32 et health indiquant 74 cours.', action: `Versions alignées sur ${version}, health = ${clientPacks.length} cours / ${clientIds.size} mystères.` },
  { priority: 'P1 corrigé RC46', area: 'Sécurité navigateur', issue: "CSP script autorisait 'unsafe-inline' pour un seul flag inline.", action: 'Flag déplacé dans le bundle externe et script-src limité à self.' },
  { priority: 'P1 corrigé RC46', area: 'Déploiement', issue: 'catalogue-export-temp.json (≈2,5 Mo, contenu de travail) pouvait être servi par Vercel.', action: 'Exclu via .vercelignore.' },
  { priority: 'P1 restant', area: 'Identité / triche', issue: 'Pas d’authentification forte ; XP/profil viennent du client.', action: 'Introduire une vraie identité authentifiée ou des jetons serveur avant classement public sérieux.' },
  { priority: 'P1 restant', area: 'Sauvegarde', issue: 'Progression fine non synchronisée dans le cloud.', action: 'Ajouter un stockage serveur versionné de la progression une fois l’identité sécurisée.' },
  { priority: 'P1 restant', area: 'Données personnelles', issue: 'Pas de suppression autonome des données serveur.', action: 'Prévoir suppression/export côté compte après authentification.' },
  { priority: 'P2 restant', area: 'Performance', issue: `≈${metrics.initialCssJsGzipMiB} MiB gzip de CSS+JS initiaux ; les 219 cours sont chargés d’emblée.`, action: 'Découper le catalogue par discipline et charger à la demande.' },
  { priority: 'P2 restant', area: 'Observabilité', issue: `${metrics.clientEmptyCatchBlocks} catch vides côté client.`, action: 'Centraliser les erreurs attendues et journaliser les erreurs inattendues avec contexte.' },
  { priority: 'P2 restant', area: 'Architecture', issue: `${metrics.clientSourceModules} modules hérités, ${metrics.clientMutationObservers} MutationObserver, ${metrics.clientWindowGlobals} écritures globales.`, action: 'Remplacer progressivement les wrappers historiques par quelques modules stables, écran par écran.' },
  { priority: 'P2 restant', area: 'Abus API', issue: 'Pas de rate limiting détecté.', action: 'Limiter score/profil/amis/push côté edge/DB avant exposition publique.' }
];

const result = {
  version,
  status: errors.length ? 'failed' : 'passed-with-known-product-risks',
  scope: 'Qualité globale hors contenu : backend/frontend parity, robustesse, performance, PWA, sécurité navigateur, données, observabilité, architecture et maintenabilité.',
  fixedInRC46: priorities.filter(x => x.priority.includes('corrigé')),
  remainingWeaknesses: priorities.filter(x => x.priority.includes('restant')),
  metrics,
  parity: { missingServerIds, extraServerIds },
  warnings,
  errors
};
fs.writeFileSync(path.join(root, 'RC47-PRODUCT-HEALTH-AUDIT.json'), JSON.stringify(result, null, 2) + '\n');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`HistoDaily ${version}: product health audit passed — ${clientPacks.length} cours, ${clientIds.size}/${serverIds.size} mystères client/serveur, ${warnings.length} risque(s) produit documenté(s).`);
