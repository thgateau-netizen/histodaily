# HistoDaily beta 265 — correction de série

## Cause trouvée

`isTodayMystery(id)` comparait le dossier résolu uniquement au mystère de la discipline actuellement active. Un dossier quotidien valide pouvait donc être classé comme archive si l’état actif avait changé entre l’accueil et la validation. Dans ce cas, `applyDailyReward()` ne créait pas la récompense quotidienne et la série restait à 0.

Un second cas existait : une entrée quotidienne déjà créée avec `streak: 0` bloquait tout recalcul, car la présence de la réclamation empêchait `applyDailyReward()` de s’exécuter une seconde fois.

## Correction

- validation du dossier quotidien selon sa propre discipline ;
- réparation automatique d’une résolution effectuée aujourd’hui ;
- normalisation des entrées `dailyClaims` et `dailyHistory` à au moins 1 jour ;
- reconstruction depuis la veille lorsqu’un historique existe ;
- aucune gemme, XP ou soumission de score dupliquée ;
- réparation rejouable sans modifier à nouveau un état déjà correct.
