# HistoDaily beta 184 — upgrade graphique premium

Cette version conserve toute la logique de la beta 183 et ajoute une couche graphique indépendante, sans bibliothèque externe.

## Principes

- aucune image de fond lourde ;
- aucun framework CSS ou JavaScript ajouté ;
- aucune animation permanente ;
- effets de transparence limités à la navigation et aux en-têtes utiles ;
- compatibilité avec les anciennes sauvegardes ;
- respect de `prefers-reduced-motion`.

## Changements visibles

- nouvelle palette sombre éditoriale ;
- surfaces et bordures harmonisées ;
- hiérarchie typographique renforcée ;
- accueil doté d’un en-tête de marque plus premium ;
- cartes principales distinguées des cartes secondaires ;
- parcours et chapitres plus sobres ;
- classement plus proche d’une application native ;
- profil et collections mieux structurés ;
- nouvelles icônes SVG intégrées à la navigation basse ;
- boutons, champs, progressions et états actifs uniformisés.

## Déploiement

Remplacer tous les fichiers afin que le service worker `histodaily-beta184-premium-visual-v1` mette le cache à jour.
