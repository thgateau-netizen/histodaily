# HistoDaily RC22 — Adaptive Path

## Objectif
Rendre la progression immédiatement compréhensible sans ajouter de nouvelles cartes à l’accueil : l’application distingue désormais ce qui a été simplement validé de ce qui est réellement consolidé en mémoire, puis choisit une seule meilleure prochaine action.

## Accueil : une seule prochaine action
Le bloc double « À continuer / À découvrir » est remplacé par une seule action secondaire sous l’Expédition :

1. **révision due** si une notion doit être consolidée maintenant ;
2. sinon **reprise du cours commencé** ;
3. sinon **prochain cours du parcours** ;
4. le catalogue reste accessible depuis le bloc de progression.

L’Expédition du jour reste l’action principale de l’écran.

## Progression : validé n’est plus maîtrisé
Le pourcentage de l’accueil devient un indicateur de **maîtrise du domaine** et non un simple compteur de cours terminés.

Un cours validé mais jamais encore testé par le système de mémoire part à 60 % de maîtrise. Les rappels espacés font ensuite progresser cette valeur jusqu’à 100 %.

Correction importante : les anciens cours terminés avant RC21 ne sont plus considérés artificiellement comme maîtrisés tant que la migration douce n’a pas programmé et confirmé leurs rappels.

## États visibles dans la bibliothèque
Chaque cours peut désormais afficher l’un des états suivants :

- **À découvrir** ;
- **En cours** ;
- **En consolidation** ;
- **À revoir** ;
- **Maîtrisé** ;
- **Validé** pour un ancien cours encore en attente d’intégration au nouveau système de mémoire.

Lorsqu’un thème contient des rappels dus, un filtre local **À revoir** apparaît pour isoler uniquement les cours concernés.

## Disciplines
Les pastilles de discipline affichent temporairement le nombre de notions à revoir lorsqu’une révision est due, à la place du pourcentage de progression. L’information urgente prend donc la priorité sans ajouter de badge ou de panneau supplémentaire.

## Architecture
- nouveau module `adaptive-path-rc22.js`, chargé en dernier afin de ne pas dupliquer les moteurs existants ;
- le moteur mémoire RC21 expose maintenant une petite API publique (`HistoDaily.memory`) pour les interfaces tardives ;
- aucun nouveau système parallèle de révision n’est créé ; RC22 réutilise la file mémoire existante ;
- cache PWA incrémenté en `histodaily-rc22-adaptive-path-v1`.

## Validation
- 43 fichiers JavaScript passent `node --check` ;
- 0 ressource manquante dans `index.html` ;
- 0 ressource manquante dans le service worker ;
- 5/5 tests unitaires de transition d’état passent : En cours, Validé, En consolidation, À revoir, Maîtrisé ;
- `adaptive-path-rc22.js` est présent dans l’index et le cache PWA ;
- aucune référence `1.0.0-rc.21.0` ne subsiste dans l’index ou le service worker.

Voir `RC22-ADAPTIVE-AUDIT.json`.
