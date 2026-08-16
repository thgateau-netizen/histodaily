# HistoDaily RC47 — Daily Hook

## Pourquoi cette version
Les premiers testeurs pouvaient trouver HistoDaily intéressant sans avoir de raison forte de le rouvrir le lendemain. RC47 ne rajoute pas de catalogue : elle transforme la boucle quotidienne elle-même.

## Nouvelle boucle quotidienne
**Ouvrir → résoudre le dossier → comprendre la réponse → journée validée → teaser exact de demain.**

Le cours et le quiz ne sont plus nécessaires pour « finir » sa journée. Ils restent disponibles comme approfondissement facultatif.

## Changements utilisateur
- Une expédition résolue valide immédiatement le rendez-vous quotidien et la série.
- La page de résolution affiche directement une explication, un bloc **À retenir**, puis **Demain**.
- Le bouton principal de sortie devient **Terminer pour aujourd’hui**.
- Le cours associé devient **Approfondir ce sujet**, clairement facultatif.
- Sur l’accueil avant résolution, la frise Expédition/Cours/Quiz est remplacée par **2–4 min · un dossier, une révélation**.
- Après résolution, l’accueil dit simplement **C’est fait pour aujourd’hui** et n’impose plus cours + quiz.
- Le teaser du lendemain n’est pas décoratif : il pré-assigne réellement le mystère qui sera servi le lendemain.

## Fraîcheur
Le mystère pré-assigné pour demain respecte la difficulté RC40/41, privilégie l’inédit et évite les IDs récemment servis quand une alternative existe.

## Instrumentation de rétention
RC47 enregistre localement, sans nouveau panneau UI :
- ouverture de l’app ;
- lancement d’expédition ;
- résolution ;
- clic sur approfondissement ;
- ouverture depuis notification ;
- retours D1 / D3 / D7.

Le snapshot est accessible en diagnostic via `window.HistoDailyDailyHookRC47.retentionSnapshot()`. Les résolutions quotidiennes restent en parallèle centralisées côté serveur via les scores, ce qui permet déjà d’observer la récurrence des utilisateurs qui complètent leur rituel.

## Notifications
Le texte serveur reflète désormais le nouveau contrat : **« Une question, une révélation »**, **2 à 4 minutes**. Il ne prétend pas afficher une question personnalisée exacte car le serveur Push ne connaît pas encore le teaser local choisi par l’utilisateur.

## Validation
- bundles JS : syntaxe valide ;
- 10/10 contrôles Daily Hook ;
- test comportemental : teaser différent du jour courant + assignation exacte au lendemain ;
- pipeline complet historique : OK ;
- 219 cours / 158 mystères inchangés.
