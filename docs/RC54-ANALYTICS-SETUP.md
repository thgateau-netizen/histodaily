# RC54 — mise en route des analytics de rétention

1. Exécuter `supabase/RC54-ANALYTICS-MIGRATION.sql` une fois dans le SQL Editor Supabase.
2. Ajouter une variable Vercel `ANALYTICS_ADMIN_TOKEN` avec une valeur longue et aléatoire.
3. Redéployer RC54.
4. Vérifier `/api/v1/health` : `deployment.analyticsReady` doit être `true`.
5. Le client synchronise automatiquement les événements locaux vers `POST /api/v1/analytics/events`.
6. Pour lire les cohortes, appeler `GET /api/v1/analytics/cohorts?days=30` avec l'en-tête `Authorization: Bearer <ANALYTICS_ADMIN_TOKEN>`.

Les événements stockés sont volontairement minimaux : identifiant anonyme d'installation, type d'événement, jour, discipline, identifiants de dossier/cours et quelques compteurs. Aucun pseudo, email ou code ami n'est envoyé par cette couche.

Si la table n'existe pas encore ou si Supabase est indisponible, l'application continue normalement. Les événements restent en local et seront retentés lors d'une prochaine ouverture.

Rapport lisible en terminal :

```bash
HISTODAILY_URL=https://ton-app.vercel.app ANALYTICS_ADMIN_TOKEN=... node scripts/retention-report.mjs 30
```
