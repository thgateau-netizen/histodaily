# Audit multi, profils et classements — beta 249

## Objectif

Renforcer le fonctionnement social lorsque plusieurs onglets ou appareils écrivent simultanément, lorsque le réseau coupe pendant une action, ou lorsque le stockage local contient une ancienne donnée invalide.

## Renforcements réalisés

### Profils

- Fusion monotone de `level`, `xp`, `solved_count` et `streak` : une donnée plus ancienne ne peut plus faire régresser le profil.
- Conservation du pseudo personnalisé lors d'une synchronisation automatique.
- Résolution du profil canonique par identifiant et code ami.
- Écriture atomique via `hd_merge_profile` lorsque la migration SQL beta 249 est installée.
- Repli compatible par comparaison et nouvelle tentative si la fonction SQL n'est pas encore disponible.

### Scores et classements

- Un score inférieur envoyé plus tard ne remplace plus un meilleur score.
- Écriture atomique facultative via `hd_upsert_best_score`.
- Agrégation jour/semaine/année directement dans Supabase via `hd_leaderboard_period`.
- Limitation et déduplication côté serveur avant affichage.
- Repli sur l'ancien calcul si les fonctions SQL beta 249 ne sont pas installées.

### Amis et demandes

- Vérification de la présence des deux lignes réciproques après création d'une amitié.
- Réparation automatique des demandes croisées A → B et B → A.
- Réconciliation même lorsqu'une autre requête accepte la demande au même instant.
- Première décision serveur conservée en cas d'acceptation/refus concurrents.
- Neutralisation des anciennes demandes en attente ou acceptées lors d'une suppression.
- Actions idempotentes et rejouables après une coupure réseau.

### Robustesse locale

- Sauvegarde de la valeur corrompue avant réinitialisation d'une file locale.
- Déduplication des demandes, scores et mutations.
- Dernière décision locale conservée pour une même demande.
- Clé d'opération compatible avec le verrouillage anti-double-clic de la beta 246.
- Verrou inter-onglets pour éviter deux vidages simultanés de la même file.
- Synchronisation inter-onglets par `BroadcastChannel` et événement `storage`.

## Contrôles exécutés

- Vérification syntaxique des 26 fichiers JavaScript.
- Chargement du module API et vérification de sa version.
- Vérification de tous les scripts et styles référencés par `index.html`.
- Vérification des ressources locales du service worker.
- Test simulé : un profil ancien ne diminue pas l'XP ou la série.
- Test simulé : un score de 70 envoyé après un score de 110 conserve 110.
- Test simulé : une file JSON corrompue est sauvegardée puis réparée.
- Test simulé : deux décisions locales contradictoires sont ramenées à la plus récente.

## Déploiement Supabase

Pour bénéficier des transactions réellement atomiques, exécuter de nouveau `SUPABASE-SOCIAL-SCHEMA.sql` dans l'éditeur SQL Supabase. Les trois fonctions beta 249 sont additives et peuvent être recréées sans supprimer les données.

L'application fonctionne sans cette migration grâce au mécanisme de repli, mais celui-ci ne peut pas offrir exactement le même niveau de garantie qu'une opération exécutée directement dans PostgreSQL.

## Limite de validation

Les tests présents sont des simulations locales. Le dernier niveau de validation nécessite deux comptes ou deux navigateurs connectés au véritable projet Supabase, avec ses tables, index, permissions et éventuelles règles RLS.
