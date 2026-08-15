# HistoDaily RC29 — Classement complet & rotation quotidienne stricte

## 1. Classement : toute la communauté est visible

Avant RC29, le classement général partait des lignes de score de la période. Un joueur inscrit mais à 0 point n'était donc pas chargé. Avec trois joueurs ayant joué dans la journée, l'écran pouvait donner l'impression qu'il n'existait que trois utilisateurs.

RC29 :
- charge les profils inscrits en plus des scores ;
- conserve les joueurs à 0 point dans le classement général ;
- garde le podium pour les trois premiers, puis affiche la liste complète dessous ;
- l'onglet Amis continue d'afficher les amis sans score ;
- suppression des limites client artificielles à 50 lignes / serveur social à 100 lignes pour le classement général.

## 2. Un mystère réussi ne revient plus dans la rotation quotidienne

Le moteur RC29 choisit d'abord parmi les mystères non résolus. Les mystères déjà réussis restent accessibles dans les archives, mais ils sortent du choix quotidien tant qu'il existe au moins un dossier inédit dans la discipline.

## 3. L'expédition change tous les jours, jouée ou non

Chaque couple `date + discipline` reçoit maintenant une affectation persistante :
- l'expédition est stable pendant toute la journée ;
- le lendemain, celle de la veille est explicitement exclue si une autre est disponible ;
- ce changement ne dépend pas du fait d'avoir réussi ou même ouvert l'expédition précédente ;
- si le filtre de difficulté est trop étroit, le moteur préfère élargir à un autre mystère inédit plutôt que recycler celui d'hier.

## 4. Compatibilité

- la rotation historique des archives antérieures à RC29 reste disponible ;
- la logique de difficulté progressive est conservée ;
- la PWA est versionnée `1.0.0-rc.29.0` et utilise un nouveau cache ;
- les bundles RC27 restent le format de build consolidé, avec le module RC29 ajouté à la fin du bundle expérience.
