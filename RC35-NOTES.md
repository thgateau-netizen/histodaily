# HistoDaily RC35 — Product Polish

## Objectif

Faire de HistoDaily une app qui donne envie d'être utilisée et dont la hiérarchie se comprend sans mode d'emploi. Cette passe n'ajoute pas de fonctionnalité métier : elle réduit le bruit visuel, homogénéise les composants hérités et renforce le feedback mobile.

## Faiblesses trouvées après RC34

### 1. Première ouverture encore trop explicative
Même avec seulement deux écrans, le premier lancement restait un petit tutoriel : l'utilisateur devait apprendre le rituel avant de le vivre.

### 2. Accueil encore trop vertical sur téléphone
Le grand hero premium fonctionnait visuellement, mais à 480 px de haut sur mobile il occupait presque tout le premier écran. Cela retardait la découverte de la prochaine action et de la maîtrise.

### 3. Bibliothèque : cartes dans des cartes
Les chapitres et cours restaient chacun dans des surfaces arrondies avec gradients et bordures. Une liste de navigation donnait donc encore la sensation d'une succession de panneaux indépendants.

### 4. Styles hérités incohérents
Après de nombreuses RC, les composants utilisaient plusieurs familles de rayons, bordures, ombres et transitions. Le produit pouvait sembler construit par strates même lorsque la structure était simplifiée.

### 5. Lecteur encore trop “interface”
RC34 avait supprimé les contrôles en double, mais le texte n'était pas encore assez clairement la surface principale. Les contenus longs devaient ressembler davantage à une lecture éditoriale qu'à une succession de blocs UI.

### 6. Classement : liste trop “cartifiée”
Le podium mérite un traitement fort. En revanche, chaque ligne de la liste complète avait encore une identité de petite carte, ce qui recréait un empilement après le podium.

### 7. Profil : modules secondaires encore trop présents visuellement
Ils étaient repliés en RC34, mais leurs surfaces pouvaient encore ressembler à des modules de premier niveau.

### 8. Dock de navigation et micro-feedback non totalement unifiés
Plusieurs anciennes couches CSS avaient défini des variantes de bottom-nav et de feedback tactile. Il fallait une règle finale unique, y compris pour la safe-area iOS.

## Corrections RC35

- Premier lancement fusionné en un seul écran : promesse, choix de l'univers, puis `Lancer mon expédition`. Le fonctionnement détaillé s'apprend dans le vrai parcours.
- Hero de l'accueil réduit à 438 px sur mobile, 420 px sur les petits écrans, sans perdre son caractère cinématique.
- Chapitres et cours aplatis visuellement : moins de gradient, moins de bordure, rayons plus petits, traitement de vraie liste de navigation.
- Ajout d'un vocabulaire visuel final RC35 : rayons, lignes, surfaces et ombres de référence.
- Lecteur recentré sur la typographie : corps/ligne homogènes, titres plus éditoriaux, réduction des ombres dans les blocs de lecture.
- Liste complète du classement aplatie ; le podium conserve son côté motivant.
- Modules secondaires du profil volontairement plus calmes.
- Bottom-nav uniformisée sur tous les écrans non immersifs avec safe-area iOS.
- Micro-interactions limitées à 120–200 ms : pression, transition d'écran légère, indicateur discret lors d'une actualisation.
- Aucun overlay de chargement bloquant ajouté.
- `prefers-reduced-motion` neutralise les animations.
- État des `<details>` synchronisé via `aria-expanded`, et seul l'onglet actif garde `aria-current="page"`.
- La couche `product-polish-rc35.js` est chargée en dernier afin qu'une ancienne feuille de polish ne puisse pas réécraser ces décisions.

## Validation

- `npm run build:client` : OK
- 3 bundles : `node --check` OK
- Quality check global : 0 erreur / 0 avertissement structurel
- Audit flow RC34 rejoué : 15/15 contrôles
- Audit Product Polish RC35 : 16/16 contrôles
- Catalogue toujours chargé : 209 cours, 158 mystères, 1 045 questions
- L'audit éditorial conserve un signal informatif intentionnel sur un mystère d'anglais, pas une erreur de contenu.

## Limite de validation

Chromium headless est encore bloqué dans cet environnement et n'a pas produit de capture fiable malgré une exécution limitée dans le temps. La RC35 est donc validée par build, syntaxe et audits structurels/UX automatisés, mais je ne présente pas de fausse validation pixel-perfect par screenshot.
