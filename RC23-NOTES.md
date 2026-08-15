# HistoDaily — RC23 Real Artwork

## Objectif

La RC23 traite le principal écart entre les maquettes et l’application réelle : les illustrations sont désormais de vrais fichiers embarqués et utilisés par l’interface, pas seulement des aperçus générés à côté.

## Changements visuels

- Ajout d’un dossier `assets/` contenant des illustrations WebP réellement livrées avec l’application.
- Accueil : le bloc « Aujourd’hui » utilise une image de fond réelle pour Histoire, Astronomie, Philosophie et Anglais, avec superposition de texte lisible et CTA conservé.
- Expédition : le dossier jouable affiche désormais une bannière illustrée réelle en haut de l’écran avant la mission et les indices.
- Cours : le header du cours intègre la même direction artistique et une image réelle liée à la discipline.
- Sélecteur d’univers : Histoire, Astronomie, Philosophie et Anglais ont des miniatures visuelles intégrées dans leurs cartes.
- Navigation basse simplifiée : suppression de l’effet « tuiles bleues » au profit d’icônes plus discrètes et d’un accent de discipline.
- Typographie : les grands titres de l’accueil, de l’expédition et du cours utilisent une pile serif système pour se rapprocher du rendu éditorial des maquettes sans charger de police externe.

## Assets embarqués

- `assets/hero-history.webp`
- `assets/hero-history-revolution.webp`
- `assets/hero-astronomy.webp`
- `assets/hero-philosophy.webp`
- `assets/hero-english.webp`
- `assets/thumb-history.webp`
- `assets/thumb-astronomy.webp`
- `assets/thumb-philosophy.webp`
- `assets/thumb-english.webp`

Les assets sont ajoutés au cache PWA afin de rester disponibles hors ligne.

## Compatibilité

Les disciplines sans illustration dédiée conservent le rendu précédent. Aucune fonctionnalité de RC22 n’est supprimée.
