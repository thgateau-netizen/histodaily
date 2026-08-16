# HistoDaily RC34 — Flow Simplification

## Intention

Cette passe part d'une règle simple : l'utilisateur doit comprendre l'action suivante sans devoir lire l'interface. L'objectif n'est pas de retirer la richesse de HistoDaily, mais de déplacer les informations secondaires derrière une interaction volontaire et de supprimer les répétitions visuelles.

Principes appliqués :

- une action principale par étape ;
- un contexte présenté une seule fois ;
- pas de carte décorative entre l'utilisateur et le contenu ;
- les fonctions secondaires restent accessibles, mais repliées ;
- les écrans de lecture privilégient le texte, pas les contrôles ;
- le classement montre d'abord le classement ;
- le profil montre d'abord la progression utile.

## Points faibles trouvés

### Bibliothèque de cours

L'index empilait : sélecteur de discipline permanent, grand hero de discipline, carte « prochaine étape », puis seulement les chapitres. Le grand hero répétait des informations déjà disponibles sur l'accueil et retardait l'accès au contenu.

La page d'un chapitre répétait ensuite le contexte sous plusieurs formes : header du chapitre, rail des thèmes, grande carte du thème actif, puis titre du thème au-dessus des cours.

### Lecture d'un cours

C'était la zone la plus chargée. Le format Express / Complet / Quiz existait dans le header et dans le contenu ; une barre d'étape puis une seconde barre de progression de lecture pouvaient encore s'ajouter. Des couches de polish rajoutaient aussi « La phrase à garder » et un guide de lecture générique autour d'un contenu déjà structuré.

L'Express pouvait proposer des CTA dans l'article puis un nouveau CTA dans le footer. Le quiz terminé pouvait afficher un hero de résultat, un bloc de maîtrise / prochaine action et encore un footer de navigation.

### Expédition

Après résolution, la solution et la prochaine étape étaient séparées en deux grandes cartes. Le bloc replié « Archives et classement » mélangeait aussi deux destinations qui existent déjà ailleurs dans l'app.

### Classement

Le classement commençait par deux barres de filtres puis une grande carte expliquant le score personnel, avant la vraie liste. La période et l'audience étaient répétées dans plusieurs titres et paragraphes. Pour une page appelée « Classement », le classement arrivait trop tard.

### Profil

Le profil affichait immédiatement hero, système solaire de curiosité, rythme, communauté, progression, collections, succès puis réglages. Les modules les plus spectaculaires prenaient de la place avant les informations les plus utiles.

### Accueil

Le hero indiquait l'étape du jour deux fois : compteur `1/3` en haut puis parcours Expédition / Cours / Quiz en bas.

## Corrections RC34

- Bibliothèque : le choix de discipline devient un sélecteur compact replié. Le grand hero est supprimé. La prochaine action puis les chapitres arrivent immédiatement.
- Chapitre : suppression du grand header de chapitre et du second hero de thème. Un seul contexte compact précède la liste des cours.
- Cartes de cours : suppression de la répétition « Express, complet et quiz » sur chaque ligne.
- Lecteur : un seul contrôle Express / Complet / Quiz dans le header ; suppression de la seconde toolbar, de la barre d'étape et de la barre de progression de lecture.
- Express : suppression des « Repères clés » redondants dans ce mode ; le hook + les 3 idées suffisent.
- Complet : sommaire repliable au lieu d'un rail permanent ; suppression du guide de lecture générique.
- Navigation de cours : un seul CTA contextuel en bas pour Express et Complet. Le quiz garde uniquement sa propre navigation.
- Fin de quiz : score, maîtrise, rappel mémoire et prochaine action fusionnés en un seul bilan.
- Expédition résolue : « Comprendre la réponse » est fusionné dans le résultat ; plus de carte « Étape suivante » séparée.
- Expédition : le teaser de classement est retiré ; les archives restent repliées.
- Classement : filtres, ligne personnelle compacte, puis classement. La grande carte explicative a disparu.
- Profil : hero, rythme/communauté et progression restent visibles ; carte de curiosité, collections et succès deviennent secondaires et repliés.
- Accueil : un seul indicateur de parcours du jour.

## Correction importante découverte pendant l'audit

Le fichier `content-editorial-rc33.js` existait bien dans la RC33, et le manifeste déclarait qu'il était chargé, mais le script réel `build-client.mjs` l'avait oublié dans le bundle contenu. La RC34 corrige ce défaut : la revue éditoriale RC33 est maintenant réellement intégrée dans `bundles/content-rc27.js` et le quality check vérifie désormais le bundle généré, pas seulement le manifeste.

## Contrôles

- 209 cours / 158 mystères : audit contenu toujours valide ;
- 15 contrôles UX structurels RC34 ;
- 0 erreur / 0 avertissement au quality check ;
- 3 bundles JS passés par `node --check` ;
- assets et cache PWA vérifiés ;
- présence effective de `content-editorial-rc33.js` vérifiée dans le bundle final.

La validation visuelle headless Chromium n'a pas été utilisée comme preuve : l'exécution headless locale n'a pas abouti dans l'environnement. Les contrôles annoncés ci-dessus sont donc structurels, syntaxiques et fonctionnels côté build.
