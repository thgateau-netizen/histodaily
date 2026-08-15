# HistoDaily RC27 — Consolidation

## Pourquoi cette version

Après les passes UX/visuelles RC16–RC26, le principal risque produit était devenu architectural : `index.html` exécutait encore 43 fichiers JavaScript client dans un ordre historique très précis. Cette architecture fonctionnait, mais rendait les mises à jour et le cache PWA fragiles.

## Ce qui change

- 43 scripts client chargés en production sont consolidés en 3 bundles ordonnés :
  - `bundles/core-rc27.js` : boot, son, moteur principal ;
  - `bundles/content-rc27.js` : contenus, disciplines, audits éditoriaux ;
  - `bundles/experience-rc27.js` : runtime, UI, mobile, social, mémoire, accessibilité et accueil premium.
- L'ordre exact des 43 sources validées est conservé à l'intérieur des bundles afin de ne pas modifier le comportement métier.
- Les sources individuelles sont conservées sous `src/legacy-client/` et ne sont plus chargées par `index.html`.
- `npm run build:client` reconstruit les 3 bundles ; `npm run check:client` contrôle leur syntaxe.
- Le service worker ne précharge plus 43 fichiers JS critiques mais seulement les 3 bundles.
- Le cache PWA passe à `histodaily-rc27-consolidated-v1`.
- Les anciens audits/notes ont été rangés dans `docs/history/` afin d'assainir la racine du projet.
- `.vercelignore` exclut les sources et documents de développement du déploiement statique ; les bundles générés restent livrés.

## Effet utilisateur

Cette RC vise surtout la fiabilité et le démarrage : moins de requêtes JavaScript, mises à jour PWA plus atomiques, moins de risque de mélange entre deux générations de scripts. Le rendu et les règles pédagogiques de RC26 sont volontairement conservés.

## Validation

- 43 modules sources présents dans les bundles, dans l'ordre prévu.
- 3 scripts client externes seulement dans `index.html` (réduction de 93 %).
- Syntaxe des 3 bundles validée avec Node.
- Syntaxe de l'ensemble des fichiers JS/MJS du paquet validée.
- Aucun asset de l'index, du CSS ou du précache PWA manquant.
- Version alignée : `1.0.0-rc.27.0` dans le package, le manifest, le bootstrap, l'accueil et le service worker.
