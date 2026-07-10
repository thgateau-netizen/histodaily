# HistoDaily 1.0 beta 180

Cette version approfondit les systèmes de progression introduits en beta 179.

## Programme quotidien

L'accueil propose désormais une boucle courte en trois étapes :

1. résoudre le mystère quotidien ;
2. valider un cours ;
3. consolider les erreurs dues ou, lorsqu'aucune révision n'attend, valider un second cours.

Le programme est fixé lors de la première ouverture de la journée afin qu'il ne change pas en cours de route. Une première complétion rapporte 25 XP. Le bonus est enregistré par date et ne peut pas être obtenu deux fois.

## Révisions espacées

Une question ratée n'est plus supprimée définitivement après une seule correction :

- première bonne réponse : retour le lendemain ;
- deuxième bonne réponse : retour trois jours plus tard ;
- troisième bonne réponse : notion considérée comme maîtrisée.

Une nouvelle erreur remet la notion au premier niveau. Les anciennes files de révision sans date ni niveau restent compatibles et sont considérées comme dues immédiatement.

Les erreurs commises pendant les quiz de synthèse rejoignent elles aussi les révisions.

## Collections

Le profil garde un aperçu compact de quatre collections. Le bouton « Voir les collections » ouvre désormais la liste complète avec trois filtres : toutes, débloquées et à terminer. Chaque médaille permet de revenir directement au thème ou au domaine correspondant.

## Compatibilité

Les sauvegardes beta 179 sont conservées. Les nouvelles données utilisent les clés `dailyLearningLog`, `reviewQueue.stage` et `reviewQueue.dueAt` sans modifier les cours, mystères ou scores existants.
