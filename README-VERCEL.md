# Déployer HistoDaily 1.0.0-beta.260

Cette version consolide la base fonctionnelle validée : classement, profil Orbit, demandes d’amis, amis à zéro point et rotation quotidienne. Elle ne change ni les tables Supabase ni les routes sociales publiques.

## Mise à jour depuis la beta 259

1. Extraire entièrement le ZIP.
2. Remplacer **tout** l’ancien déploiement, y compris `api/`, `lib/`, `index.html` et `service-worker.js`.
3. Conserver dans Vercel :
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Déployer le dossier racine contenant `index.html` et `vercel.json`.
5. Fermer complètement la PWA puis la rouvrir. Le cache attendu est `histodaily-beta264-v1`.

**Aucun SQL n’est à lancer pour passer de la beta 259 à la beta 260.** Le fichier `SUPABASE-SOCIAL-V2-CLEANUP.sql` a été retiré du paquet pour éviter toute exécution accidentelle. `SUPABASE-SOCIAL-SCHEMA.sql` reste uniquement la référence nécessaire à une installation neuve.

## Vérification immédiate

- `/api/v1/social-v2/health` doit répondre avec `ok: true`, `version: "1.0.0-beta.264.0"` et `architecture: "single-social-engine-v2"`.
- Le classement général et le classement Amis doivent conserver leurs données pendant une coupure réseau.
- Un ami confirmé sans score doit rester visible à 0 point.
- Après retour dans l’application, le profil, les demandes et le classement doivent quitter tout ancien état de chargement bloqué.
- Après un changement de jour, le dossier quotidien et les classements du jour doivent être invalidés puis rechargés.

## Périmètre figé

- une seule couche sociale cliente : `social-v2.js` ;
- une seule couche sociale serveur : `lib/hd-social-v2.js` ;
- Supabase reste l’unique vérité partagée ;
- aucune donnée d’ami ou de classement n’est inventée localement.
