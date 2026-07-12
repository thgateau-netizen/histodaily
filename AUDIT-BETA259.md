# Audit beta 259 — amis à zéro point

Cette version part de la beta 258 et ne modifie ni le profil Orbit, ni le moteur quotidien, ni les routes Vercel explicites.

## Correction ciblée

- le classement **Amis** est maintenant construit à partir de la liste des relations confirmées, puis enrichi avec les scores ;
- un ami confirmé est donc présent même s'il n'a aucune ligne dans `hd_scores` pour la période ;
- les anciennes relations enregistrées dans un seul sens sont lues dans les deux directions, sans créer de nouvelle relation en base ;
- une relation ancienne qui ne possède encore que le code ami reste affichable à zéro point ;
- le profil public sait ouvrir ce type de relation via le code ami ;
- le classement retourne des compteurs de diagnostic `friendCount` et `zeroScoreFriendCount`.

Aucune migration SQL n'est nécessaire.
