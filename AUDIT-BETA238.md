# HistoDaily beta 238 — audit cohérence et sauvegarde

## Correction pédagogique

- Parcours unifié sur l’accueil et dans les cours : **Problème → Cours → Révision**.
- Les formats Express et Complet deviennent deux profondeurs du même cours, pas deux étapes concurrentes.
- La révision correspond au quiz obligatoire.
- Un cours est marqué « lu » au passage volontaire vers la révision ; la validation définitive reste liée au quiz à 80 %.
- Les anciens badges éditoriaux internes (« Sélection », « Express court », etc.) ne sont plus affichés dans la fiche.
- Les repères sont reconstruits depuis les sections du cours et présentés sous forme de phrases contextualisées.

## Correction du dossier Astronomie

- Le problème « Un trou noir » pointe désormais vers `astro-black-holes-relativity`.
- Il ne pointe plus vers le cours général `astro-stellar-deaths`.
- Les repères du cours distinguent horizon, formation, lumière environnante et méthodes de détection.

## Correction de la perte de progression

Cause identifiée : `applyVisibleStateGuard()` était exécutée pendant le chargement de `app.js`, avant l’enregistrement des packs de contenu premium. À chaque relance, les identifiants premium n’étaient pas encore connus et pouvaient être supprimés de `completedLessons`, `quizProgress` et `solvedMysteries`.

Correction :

- la garde n’est plus exécutée immédiatement ;
- elle s’exécute au bootstrap, après le chargement de tous les packs ;
- les changements critiques sont sauvegardés immédiatement ;
- un journal compact `histodaily_state_progress_v3` conserve séparément les cours lus, quiz, problèmes résolus et récompenses ;
- au démarrage, l’état principal, sa sauvegarde et le journal sont réconciliés sans effacer les données valides.

## Contrôles

- syntaxe JavaScript validée pour les fichiers principaux ;
- versions et cache alignés sur `1.0.0-beta.238.0` ;
- parcours d’accueil réduit à trois étapes ;
- nouvelle clé `readLessons` intégrée à la sauvegarde, à la restauration, au reset et à la garde de visibilité.
