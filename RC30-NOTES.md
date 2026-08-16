# HistoDaily RC30 — Classement annuel basé sur la progression

## Problème corrigé
Un joueur pouvait avoir de l'XP visible sur son profil (cours, quiz, révisions, ateliers) mais afficher 0 dans le classement « Année ». La cause était que l'annuel additionnait uniquement les lignes `hd_scores`, alimentées par les expéditions classées.

## Nouvelle règle
- Jour : points des expéditions quotidiennes.
- Semaine : points des expéditions classées de la semaine.
- Année : XP du profil, qui représente la progression globale dans l'application.

L'application ayant été lancée en 2026, l'XP déjà enregistrée dans `hd_profiles` constitue la reprise historique de l'année en cours. Aucun backfill manuel n'est nécessaire.

## Reprise des comptes existants
Au prochain chargement :
- les profils déjà présents dans `hd_profiles` sont relus ;
- leur XP devient le score annuel ;
- les joueurs à XP > 0 ne peuvent plus apparaître à 0 en Année ;
- le classement est recalculé sur cette métrique, y compris pour les joueurs sans score d'expédition.

## Interface
L'onglet Année affiche explicitement `XP` au lieu de `pts` et explique que cours, quiz, révisions, ateliers et expéditions alimentent cette progression.

## Compatibilité
Le nouveau classement social `/api/v1/social-v2/leaderboard` est la source principale. Le chemin de classement général historique dans `hd-api.js` a également été aligné sur l'XP pour la période annuelle.
