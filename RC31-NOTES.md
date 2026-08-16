# HistoDaily RC31 — Quality Pass

## Objectif
Stabiliser et polir le parcours principal sans ajouter un nouveau système lourd.

## 1. Fin de cours simplifiée
La fin du quiz n'empile plus plusieurs panneaux qui répètent le même résultat.

Après validation, l'utilisateur voit désormais une seule séquence :
- résultat du quiz ;
- niveau de maîtrise réel du cours ;
- état de la mémoire (rappel dû, rappel futur ou cours maîtrisé) ;
- une prochaine action claire.

Le libellé trompeur « Bilan de la révision » est remplacé par « Bilan du cours ».

## 2. Aucun cul-de-sac après un quiz
Une validation réussie propose directement :
- le prochain cours non terminé de la discipline, lorsqu'il existe ;
- le retour à l'accueil ;
- une révision immédiate uniquement si un rappel est déjà dû.

En cas d'échec, l'écran recommande de relire seulement l'essentiel puis de retenter, plutôt que de recommencer tout le parcours.

## 3. Qualité éditoriale
Trois questions génériques répétées ont été réécrites pour être directement liées à leur sujet :
- néoréalisme italien ;
- climat et catastrophes ;
- figuration dans les arts des sociétés musulmanes.

Il ne reste plus de formulation exacte « Quelle affirmation est la plus juste ? » dans les packs de contenu actifs.

## 4. Contrôle qualité automatisé
Nouvelle commande : `npm run quality:check`.
Elle vérifie :
- alignement des versions ;
- version du cache PWA ;
- présence des assets CSS ;
- présence des assets précachés ;
- absence des anciens placeholders SVG ;
- absence de la formulation générique de quiz ;
- présence du module RC31 dans le bundle d'expérience.

## Validation
- 67 fichiers JS/MJS passés par `node --check` ;
- quality check : 0 erreur, 0 avertissement ;
- 18 références d'assets CSS contrôlées ;
- 19 assets PWA contrôlés ;
- 0 placeholder SVG actif ;
- 0 question générique ciblée restante.
