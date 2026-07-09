# HistoDaily beta162 — correctif navigation + mystères

Base : beta161.

Correctifs ciblés :

- délégation globale pour les flèches retour du haut (`data-home`, `data-back-home`, `data-back-learn`, `data-back-social`, `data-back-chapters`) ;
- délégation globale pour la bottom nav et les raccourcis accueil/profil/classement ;
- déblocage d’une archive avec gemmes : déduit les gemmes, marque le mystère comme débloqué, ouvre immédiatement ce mystère, puis remonte en haut de page ;
- ouverture d’un mystère déjà débloqué : remonte aussi en haut de page ;
- lien “Aller au contenu” masqué correctement sauf focus clavier/accessibilité ;
- pas de nouvelle optimisation JS agressive.

À tester après déploiement :

1. ouvrir un cours puis flèche retour ;
2. ouvrir Profil public puis flèche retour ;
3. ouvrir Cours puis flèche retour accueil ;
4. débloquer un mystère d’archive avec 2 gemmes ;
5. changer d’onglet rapidement via la barre du bas ;
6. fermer/réouvrir la PWA.
