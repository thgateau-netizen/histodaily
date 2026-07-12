# Audit HistoDaily beta 248 — multi, profils et classements

## Renforcements

- Synchronisation de profil monotone : un appareil ancien ne peut plus diminuer le niveau, l’XP, le nombre de dossiers résolus ou la série enregistrée.
- Conservation de l’identité canonique Supabase lorsqu’un ancien `player_id` local est encore présent.
- Conservation du pseudo déjà personnalisé lorsqu’un appareil renvoie accidentellement `Invité`.
- Détection des demandes d’amis croisées : A → B et B → A deviennent une seule relation acceptée.
- Déduplication des demandes en attente renvoyées au client.
- Déduplication des lignes d’amis et élimination des relations vers soi-même dans les instantanés.
- Les protections beta246 restent actives : suppression persistante, retry hors ligne, classement Amis filtré et paginé.

## Vérifications effectuées

- Syntaxe de tous les fichiers JavaScript.
- Chargement du module API.
- Présence et ordre des scripts sociaux.
- Cohérence des versions et du cache PWA.
- Vérification statique des routes profils, demandes, amis et classements.

## Limite restante

Le seul test impossible hors déploiement est la validation réelle des politiques Supabase, des variables d’environnement et des requêtes PostgREST sur le projet de production.
