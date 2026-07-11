# HistoDaily beta 214 — bibliothèque et lecteur

## Objectif

Transformer l’onglet Cours en parcours lisible sur téléphone et rendre la lecture d’un cours réellement immersive.

## Changements

- bibliothèque compacte : discipline → grand chapitre → thème → cours ;
- choix du thème sans réafficher tous les cours du chapitre ;
- progression intégrée aux chapitres et thèmes ;
- carte de reprise unique et non redondante ;
- filtres Tous / À faire / Terminés ;
- lecteur plein écran sans navigation inférieure ;
- trois formats toujours visibles : Express, Complet et Quiz ;
- sommaire horizontal du cours complet ;
- navigation vers le cours suivant ;
- audit de contenu accessible via `HistoDailyContentAudit.run()`.

## Contrôles attendus

- aucune erreur de syntaxe JavaScript ;
- aucun débordement horizontal entre 320 et 430 px ;
- navigation complète chapitre → thème → cours → retour ;
- quiz et validation existants conservés ;
- cache PWA renouvelé en beta 214.
