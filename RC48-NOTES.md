# HistoDaily RC48 — Discipline Sync Fix

## Bug reproduit
Après avoir terminé une expédition dans une discipline (ex. Histoire), changer de discipline depuis l’accueil (ex. Sciences) pouvait laisser affichés :
- le résultat de l’ancienne discipline ;
- son illustration ;
- le cours facultatif lié ;
- le teaser du lendemain.

## Cause
RC47 utilisait la récompense quotidienne globale (`dailyClaims[date]`) comme état d’affichage du home. Cette récompense n’est pas spécifique à une discipline. De plus, `dailyTomorrowTeasers` était indexé uniquement par date.

## Correction
- l’état du home est désormais calculé depuis **le mystère quotidien de la discipline active** ;
- une discipline n’est considérée terminée que si **son propre mystère quotidien** est résolu ;
- le résultat global du classement/streak n’est plus utilisé pour choisir le contenu du hero ;
- les teasers sont indexés par `date|discipline` ;
- migration sûre des anciens teasers RC47 uniquement lorsqu’ils appartiennent à la bonne discipline ;
- le deep-dive facultatif est toujours dérivé du mystère de la discipline actuellement affichée.

## Test de régression ajouté
Scénario automatisé :
1. Histoire est terminée aujourd’hui ;
2. le claim global appartient à Histoire ;
3. l’utilisateur passe à Sciences ;
4. Sciences doit rester non terminée si son mystère n’a pas été résolu ;
5. le teaser Histoire et le teaser Sciences doivent être différents et stockés séparément.

Le scénario passe en RC48.
