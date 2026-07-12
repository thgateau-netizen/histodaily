# Déployer HistoDaily 1.0.0-beta.254

Cette version remplace l’empilement de correctifs sociaux par un moteur unique : `social-v2.js` côté application et `lib/hd-social-v2.js` côté serveur.

## Déploiement

1. Extraire entièrement le ZIP.
2. Remplacer **tout** l’ancien déploiement, y compris `api/`, `lib/`, `index.html` et `service-worker.js`.
3. Conserver dans Vercel :
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Exécuter la version fournie de `SUPABASE-SOCIAL-SCHEMA.sql` dans Supabase, même si une ancienne version du schéma avait déjà été installée. Le script est idempotent et ajoute les fonctions atomiques de la beta 254.
5. Déployer le dossier racine contenant `index.html` et `vercel.json`.
6. Fermer complètement la PWA puis la rouvrir. Le cache attendu est `histodaily-beta254-v1`.

Aucune nouvelle table n’est nécessaire. `SUPABASE-SOCIAL-V2-CLEANUP.sql` est seulement un nettoyage optionnel des doublons anciens.

## Vérification immédiate

- Ouvrir `/api/v1/social-v2/health` : `ok` doit être `true`, avec `architecture: "single-social-engine-v2"`.
- Sur Pepito, actualiser le profil puis envoyer une demande au code exact de Manon.
- Sur Manon, actualiser le profil puis accepter la demande.
- Les deux profils doivent apparaître dans « Mes amis », même avec zéro point sur la période.
- Résoudre un mystère puis ouvrir jour, semaine et année : chaque onglet doit additionner uniquement les dossiers de sa période.

## Ce qui a changé

- Supabase est la seule vérité partagée. Le navigateur ne crée plus de faux ami ou de faux classement.
- Une seule requête de démarrage renvoie le profil, les amis et les demandes.
- Les classements général et amis sont séparés par période.
- Les appels ont un délai maximal et un état explicite : chargement, synchronisé, dernière copie ou erreur.
- Les anciens fichiers `social-reliability-*` ne sont plus chargés et ont été retirés du projet.
