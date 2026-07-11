# HistoDaily beta 210 — accueil et expédition quotidienne

## Changements produits

- Bandeau d’accueil dynamique avec date, prochain jalon, récompense potentielle et bouton de reprise.
- Briefing quotidien non-spoilant avec numéro de dossier, discipline et teaser.
- Chemin visuel cliquable en quatre jalons : résoudre, comprendre, relier et retenir.
- Récompense du jour et historique compact des sept derniers rendez-vous.
- État de mission terminée avec compte à rebours et accès à un sujet surprise.
- Retour haptique léger quand le navigateur le permet.

## Correction fonctionnelle importante

La leçon de connexion était recalculée après chaque validation. Comme le moteur favorisait les cours non terminés, la troisième étape pouvait changer de cible et ne jamais rester validée. La connexion est désormais figée pour la journée et conservée dans l’état local pendant 21 jours.

## Vérifications réalisées

- Chargement sans erreur JavaScript.
- Aucun débordement horizontal à 320, 390 et 430 px.
- Le bouton principal reste au-dessus de la navigation flottante au chargement.
- Le bouton « Lancer » ouvre bien le mystère quotidien.
- Les quatre jalons peuvent atteindre l’état terminé.
- L’état terminé affiche la récompense, le compte à rebours et ouvre un cours surprise.
- Les animations sont neutralisées avec `prefers-reduced-motion`.
