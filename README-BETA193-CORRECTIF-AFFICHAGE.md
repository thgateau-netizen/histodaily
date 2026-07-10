# BETA 193 — Correctif global d’affichage

## Bug corrigé
L’ouverture du cours « L’Univers observable : jusqu’où pouvons-nous voir ? » déclenchait l’écran de sécurité « Affichage relancé ».

La cause était une référence JavaScript inexistante ajoutée lors du remplacement des emojis par les nouvelles icônes. Cette référence concernait le rendu générique des cours : le problème pouvait donc toucher d’autres cours également.

## Corrections
- correction du rendu des titres de cours
- sécurisation des icônes dans les listes de chapitres et de cours
- sécurisation de la carte affichée après un mystère résolu
- fonctions de repli si `app-icons.js` ou `app-art.js` sont momentanément absents lors d’une mise à jour de cache
- suppression de plusieurs références fragiles introduites pendant la refonte visuelle

## Audit effectué
- 106 cours ouverts automatiquement
- 3 modes testés pour chaque cours : Express, Complet et Quiz
- 8 accueils de discipline
- 8 pages de chapitres
- 8 pages de listes de cours
- pages Mystère, Classement et Profil
- test supplémentaire sans charger les modules d’icônes et d’illustrations

Aucun écran de sécurité ni erreur de rendu lors de ces contrôles.
