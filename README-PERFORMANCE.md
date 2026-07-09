# HistoDaily — beta157 performance mobile

Cette version part de `histodaily-v1.0-beta156-release-readiness.zip` et ajoute une couche performance sans changer le modèle de données.

## Changements principaux

- `app-perf.js` charge après `app.js` et regroupe les rendus dans une seule frame `requestAnimationFrame`.
- `setState` ignore les patches qui ne changent aucune valeur, pour éviter les doubles rendus après taps multiples.
- Les cours, quiz, blocs complets et listes par chapitre sont mis en cache pendant la session.
- `styles-perf.css` garde une animation d’entrée légère mais supprime les effets coûteux par carte en mode fluide.
- `content-visibility:auto` est utilisé sur les longues listes et les blocs de cours quand le navigateur le supporte.
- Le service worker change de cache (`histodaily-beta157-perf-v1`) pour forcer le rechargement des nouveaux assets.

## Effet recherché

Le rendu doit rester moderne et animé, mais avec moins de micro-freezes sur mobile : moins de recalculs JS, moins de couches GPU inutiles, moins de blur/backdrop-filter, et moins de DOM peint hors écran.
