# BETA 198 — Classement unifié et simplifié

## Problème corrigé
Le résumé personnel et la ligne du joueur pouvaient afficher deux scores différents, car plusieurs anciennes couches mélangeaient :
- score des mystères
- XP totale
- ancien score serveur
- score local actuel

## Nouvelle règle
Le classement utilise une seule source de vérité :
- somme des points des mystères résolus sur la période
- score plafonné selon la difficulté du mystère
- cours et XP totale exclus du classement
- une seule ligne personnelle, toujours alignée avec le résumé

## Refonte de l'écran
- navigation claire par période : Aujourd'hui / Semaine / Année
- séparation nette entre classement général et classement entre amis
- grand bloc personnel : score, place, mystères comptés
- classement placé immédiatement dessous
- synchronisation reléguée dans un panneau secondaire repliable
- vocabulaire unifié en « points »

## Test de non-régression
Cas reproduit :
- score local réel : 270
- ancienne ligne serveur : 500
- résultat affiché : une seule ligne Pepito à 270 points
