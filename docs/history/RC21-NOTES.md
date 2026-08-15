# HistoDaily RC21 — Smart Memory

## Objectif
Faire de la mémorisation une partie normale du parcours, sans alourdir l’interface ni transformer HistoDaily en application de flashcards.

## Mémoire espacée
- Chaque nouveau cours validé programme automatiquement jusqu’à 2 ancres mémoire.
- Première ancre : J+1.
- Deuxième ancre : J+3.
- Une notion correctement rappelée revient ensuite à J+7 puis J+21.
- Après le dernier rappel réussi, elle sort de la file et est considérée comme maîtrisée.
- Une erreur remet immédiatement la notion au premier niveau de consolidation.
- Les erreurs de quiz restent prioritaires et ne sont jamais écrasées par une ancre automatique.

## Sessions courtes
- 5 rappels maximum par session.
- Le programme quotidien parle désormais de « notions à consolider » et non uniquement d’« erreurs ».
- La maîtrise par discipline prend en compte les notions programmées dans le temps.

## Anglais et Philosophie
La première ancre mémoire d’un cours Anglais/Philo utilise l’atelier pratique associé lorsque celui-ci existe, plutôt que de répéter exactement la question du quiz.

### Anglais
- contexte avant la question ;
- écoute de la phrase quand une version audio est disponible ;
- choix portant sur le sens, le registre ou l’intention ;
- feedback spécifique à la réponse choisie.

### Philosophie
- reprise d’une situation argumentative ;
- distinction, objection, validité ou contre-exemple ;
- feedback explicatif plutôt que simple « vrai/faux ».

## Migration douce
Pour les utilisateurs ayant déjà validé des cours avant RC21 :
- 2 anciens cours maximum sont réintroduits en mémoire par lancement ;
- le backfill s’arrête dès que 12 rappels sont présents ;
- aucune avalanche de centaines de révisions à la mise à jour.

## Modules réactivés
RC20 préchargeait trois fichiers mais ne les exécutait pas depuis `index.html`. RC21 charge désormais réellement :
- `content-foundations-depth-rc19.js` ;
- `discipline-mysteries-rc19.js` ;
- `notifications-v288.js`.

## Validation
- 42 fichiers JavaScript passent `node --check`.
- 0 asset manquant dans `index.html`.
- 0 asset manquant dans le service worker.
- 2 hooks de validation de cours branchés sur la programmation mémoire.
- écoute anglaise disponible dans les rappels adaptatifs.
- version PWA/cache : `1.0.0-rc.21.0`.

Voir `RC21-MEMORY-AUDIT.json` pour le contrôle automatisé.
