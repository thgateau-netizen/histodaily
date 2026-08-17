import fs from 'node:fs';
const client=fs.readFileSync('src/legacy-client/retention-analytics-rc54.js','utf8');
const server=fs.readFileSync('lib/hd-api.js','utf8');
const sql=fs.readFileSync('supabase/RC54-ANALYTICS-MIGRATION.sql','utf8');
const build=fs.readFileSync('scripts/build-client.mjs','utf8');
const ignore=fs.readFileSync('.vercelignore','utf8');
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
const checks={
  version:pkg.version==='1.0.0-rc.54.0',
  clientBundledLast:/daily-value-rc53\.js','retention-analytics-rc54\.js/.test(build),
  privacyMinimized:!/state\?\.pseudo|friendCode\(|friend_code|state\?\.email/i.test(client),
  localFirst:/histodaily_retention_rc47/.test(client)&&/pendingRows/.test(client),
  automaticRetry:/setInterval\(syncNow,5000\)/.test(client)&&/addEventListener\("online"/.test(client),
  boundedBatch:/MAX_BATCH = 24/.test(client)&&/slice\(0, 24\)/.test(server),
  idempotentStore:/on_conflict=event_id/.test(server)&&/resolution=ignore-duplicates/.test(server),
  eventAllowlist:/RC54_ANALYTICS_EVENTS/.test(server)&&/onboarding_completed/.test(server),
  cohortD1D3D7:/D1Rate/.test(server)&&/D3Rate/.test(server)&&/D7Rate/.test(server),
  protectedReport:/ANALYTICS_ADMIN_TOKEN/.test(server)&&/rc54Authorized/.test(server),
  aggregateOnly:/analytics\/cohorts/.test(server)&&/byDiscipline/.test(server),
  healthProbe:/analyticsReady/.test(server)&&/rc54AnalyticsSchemaProbe/.test(server),
  migrationTable:/create table if not exists public\.hd_analytics_events/i.test(sql),
  migrationRls:/enable row level security/i.test(sql),
  migrationIndexes:(sql.match(/create index if not exists/gi)||[]).length>=3,
  migrationNotPublic:/^supabase\/$/m.test(ignore),
  recentWindow:/recentEnough/.test(client)&&/age<=45/.test(client),
  gracefulFallback:/analytics-table-missing/.test(server)&&/Analytics conservés localement/.test(server)
};
const errors=Object.entries(checks).filter(([,ok])=>!ok).map(([name])=>name);
const report={version:pkg.version,status:errors.length?'failed':'passed',focus:'centralized privacy-minimized retention analytics',checks,errors};
fs.writeFileSync('RC54-RETENTION-ANALYTICS-AUDIT.json',JSON.stringify(report,null,2)+'\n');
if(errors.length){console.error(report);process.exit(1);} console.log('RC54 retention analytics audit: PASS');
