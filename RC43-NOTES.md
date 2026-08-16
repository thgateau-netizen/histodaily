# HistoDaily RC43 — Daily Freshness & Clear Finish

## Pourquoi cette version
Après l'élargissement du catalogue, la priorité revient à l'envie de rouvrir HistoDaily chaque jour. Deux frictions restaient visibles : la rotation quotidienne empêchait surtout le même identifiant de revenir, sans assez protéger contre deux sujets très proches, et l'accueil continuait à proposer de « revoir » quelque chose immédiatement après une session terminée.

## Changements

### Rotation quotidienne plus fraîche
- historique thématique de 10 jours par discipline ;
- priorité absolue au contenu non résolu tant qu'il en reste ;
- stabilité du dossier pendant toute la journée ;
- changement le lendemain dès qu'une alternative existe ;
- pénalisation forte des répétitions récentes ;
- évitement d'un second mystère lié au même cours juste après le précédent ;
- évitement des mêmes types de sujet/périodes consécutifs quand ces métadonnées sont pertinentes ;
- toutes les contraintes RC40/RC41 de difficulté par discipline restent respectées.

### Une vraie fin de session
Après Expédition → Cours → Quiz, le hero d'accueil n'affiche plus un gros bouton « Revoir le cours ».
Il affiche désormais clairement :
- « C'est fait pour aujourd'hui » ;
- « À demain pour un nouveau dossier » ;
- « Nouveau dossier demain ».

La seule carte située dessous reste facultative et devient « Encore envie ? ». La recommandation personnalisée continue donc d'exister sans transformer une session terminée en nouvelle obligation.

### Personnalisation moins visible
Le libellé interne « Pour équilibrer » a disparu. Quand le moteur propose un autre domaine déjà pratiqué, l'utilisateur voit simplement « Une autre piste » : l'intelligence reste derrière l'interface.

## Contrôles
- 219 cours et 158 mystères conservés ;
- audit de fraîcheur sur les 11 disciplines ;
- aucune répétition évitable en simulation ;
- pipeline qualité complet sans warning ;
- 3 bundles JavaScript valides ;
- index, CSS, bundles, service worker, manifest et hero Histoire servis en HTTP 200 lors du test local.
