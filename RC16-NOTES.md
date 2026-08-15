# HistoDaily — RC16 UX Clarity

Base : `v1.0-rc15.1-vercel-fix`.

## Objectif

Cette release traite trois retours utilisateurs prioritaires :

1. accueil difficile à lire ;
2. lancement de l’Expédition surchargé par trop de panneaux / fenêtres ;
3. Expéditions trop difficiles trop tôt.

## Accueil

- Une seule action principale : continuer l’étape du jour.
- Parcours quotidien réduit visuellement à trois étapes : Expédition → Cours → Quiz.
- Progression et cours à reprendre placés en second niveau.
- Changement d’univers rangé dans un panneau repliable.
- Aucun ajout automatique de l’ancien tableau de bord d’Expédition sur l’accueil.

## Expédition

- Suppression des modules `expedition-v264.js`, `expedition-delivery-v276.js` et `visual-redesign-v287.js` du bundle public.
- Un seul dossier à l’écran : mission, contexte, indice, réponse.
- Premier indice révélé automatiquement et gratuit.
- Indices suivants toujours optionnels et coûtant 20 XP potentiels.
- Mauvaise réponse : feedback inline, jamais de fenêtre.
- Résolution : résultat inline puis CTA vers le cours.
- Archives et classement conservés mais repliés sous « Archives et classement ».
- Fin de parcours : suppression de l’ancienne livraison en trois écrans ; simple confirmation visuelle.

## Difficulté

- Avant 30 Expéditions résolues : rotation quotidienne limitée aux niveaux `facile` et `moyen`.
- À partir de 30 : ajout du niveau `difficile`.
- Les niveaux `expert` sont exclus de la rotation quotidienne automatique.
- Le libellé `difficile` devient « avancé » dans l’interface.

## Tests effectués

- Vérification syntaxique de tous les fichiers JavaScript de la release.
- Vérification JSON / manifest / package metadata.
- Vérification de l’existence de tous les assets référencés par `index.html` et le service worker.
- Test navigateur mobile 390 × 844 : accueil rendu sans erreur ni dialogue.
- Test clic « Continuer l’expédition » : ouverture directe du dossier, 0 dialogue, 0 ancien composant hd264/hd276/hd287.
- Test score : premier indice gratuit, deuxième indice -20 XP.
- Test mauvaise réponse puis bonne réponse : feedback et résultat inline, aucune modal.
