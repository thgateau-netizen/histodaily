# HistoDaily RC51 — English Spiral

## Pourquoi cette version

RC50 a corrigé la valeur immédiate de l’anglais : un cours ne transmet plus un mot isolé mais un pack de six tournures utiles, et chaque dossier quotidien laisse trois expressions à garder.

RC51 traite le problème suivant : **une expression vue une fois ne devient pas un réflexe**. L’objectif est donc de faire revenir l’anglais utile sans ajouter un nouvel écran lourd ni transformer HistoDaily en application de répétition mécanique.

## Nouvelle boucle de mémorisation anglaise

### Après un cours anglais

Les six tournures du cours sont réparties en **trois groupes de deux**.

Les premiers rappels sont programmés à :

- J+1
- J+3
- J+7

Puis la file de mémorisation existante espace les rappels après les réussites.

Le premier passage reste volontairement facile : **reconnaître la bonne tournure dans une situation** parmi des expressions plausibles du même cours.

À partir du rappel suivant, HistoDaily passe en **rappel actif** :

1. une situation est donnée ;
2. l’utilisateur dit la phrase à voix haute ou l’écrit ;
3. il révèle une réponse naturelle ;
4. il indique simplement « Je l’avais » ou « À revoir » ;
5. il peut écouter la phrase avec le TTS.

Il n’y a pas de correction caractère par caractère : plusieurs formulations peuvent être valides en langue réelle.

### Après le dossier anglais quotidien

Les **trois expressions livrées par le dossier** créent elles aussi un rappel, même si l’utilisateur ne clique jamais sur le cours facultatif.

Le premier rappel arrive le lendemain. Ce petit pack est considéré consolidé après trois rappels réussis afin de ne pas saturer la file mémoire.

## Migration des utilisateurs existants

Les personnes ayant déjà validé des cours anglais avant RC51 ne perdent rien.

- au maximum **un ancien cours anglais par démarrage** est converti vers le nouveau système ;
- les anciens rappels génériques de cours sont remplacés par les rappels de tournures ;
- les vraies erreurs de quiz sont conservées ;
- un plafond de file évite d’inonder un ancien utilisateur de dizaines de rappels d’un coup.

## UX

Aucun nouvel écran obligatoire n’est ajouté au parcours quotidien.

Les rappels utilisent la mécanique de révision existante. Quand une révision anglaise est ouverte, le titre devient **« Réactiver ton anglais »** et l’exercice privilégie la production plutôt que le QCM dès le deuxième passage.

## Contrôles

- 3 ancres mémoire par cours anglais ;
- 2 expressions par ancre ;
- 6 expressions couvertes par cours ;
- dossier quotidien anglais programmé dans la mémoire ;
- reconnaissance contextuelle au premier rappel ;
- rappel actif ensuite ;
- TTS disponible après révélation ;
- backfill progressif des anciens cours ;
- aucun nouvel écran obligatoire ;
- pipeline qualité complet RC51 validé.
