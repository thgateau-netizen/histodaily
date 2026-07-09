# HistoDaily beta158 — hotfix stabilité

Cette version repart de beta156 et retire la couche JavaScript beta157.

## Pourquoi beta157 plantait

La couche perf beta157 mettait en cache puis figeait certaines listes de cours. L’app existante utilise encore `.sort()` sur une de ces listes au moment d’ouvrir certains onglets, notamment Cours. Trier une liste figée déclenche une erreur JavaScript, donc le crash guard affichait la fenêtre de plantage.

## Ce qui reste optimisé

- CSS plus léger en mode `performance-smart`.
- Suppression de plusieurs effets coûteux : blur, ombres lourdes, animations en cascade.
- `content-visibility:auto` sur les longues listes et blocs de cours.
- Nouveau cache service worker `histodaily-beta158-stability-hotfix-v1`.

## Ce qui est volontairement retiré

- Aucun override de `allLessons`, `curatedLessons`, `treeLessonsForWorld`, `render` ou `setState`.
- Aucun tableau figé avec `Object.freeze`.

Priorité : navigation stable entre les onglets.
