# HistoDaily RC28 — Full Visual Coverage Pass

## Objectif
Intégrer réellement les nouvelles illustrations premium dans l'application pour les disciplines restées inégales visuellement.

## Intégrations effectuées
- Art → `assets/hero-art.webp`
- Cinéma → `assets/hero-cinema.webp`
- Sciences → `assets/hero-science-inventions.webp`
- Économie → `assets/hero-economy.webp`
- Géographie → `assets/hero-geography.webp`
- Musique → `assets/hero-music.webp`
- Littérature → `assets/hero-literature.webp`

## Écrans couverts
Ces visuels sont maintenant utilisés partout où les héros de discipline étaient appelés par le CSS existant :
- accueil premium
- carte expédition
- en-tête de cours
- vignettes « prochaine action »
- cartes d'univers

## Nettoyage technique
- remplacement des placeholders SVG par des assets WebP optimisés
- mise à jour du service worker et du pré-cache
- bump de version applicative vers `1.0.0-rc.28.0`
- nouveau cache PWA `histodaily-rc28-full-visual-v1`

## Résultat attendu
Toutes les disciplines ont désormais une illustration cohérente et premium, au lieu d'un mix inégal entre quelques images riches et plusieurs placeholders vectoriels.
