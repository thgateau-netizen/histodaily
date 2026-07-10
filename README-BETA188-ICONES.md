# BETA 188 — Interface avec icônes SVG

## Objectif
Réduire l'effet "emoji partout" sans casser l'app ni l'alourdir.

## Changements principaux
- ajout d'un fichier `app-icons.js` avec une petite librairie d'icônes SVG inline
- remplacement des emojis les plus visibles sur :
  - navigation basse
  - cartes de disciplines
  - cartes de progression
  - module Expédition libre
  - collections / médailles / recommandations
  - plusieurs CTA et labels d'interface
- nettoyage de plusieurs libellés (`Express`, `Complet`, `Quiz`, etc.)
- icône SVG de l'application mise à jour sans emoji
- service worker et versions alignés en `beta.188`

## Philosophie
- ne pas tout refaire d'un coup
- viser les zones les plus visibles d'abord
- garder de bonnes performances (SVG inline très léger)
- conserver la structure existante pour limiter le risque de casse

## Notes
Il reste encore des emojis dans certaines données de contenu ou zones secondaires de l'app. Cette bêta lance surtout la première vraie couche visuelle cohérente.
