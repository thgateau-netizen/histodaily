# HistoDaily beta130 — product clean

Version : `1.0.0-beta.130`

Passe centrée sur le nettoyage visible avant test réel.

## Nettoyage interface

- Masquage du journal de version sur l’accueil.
- Suppression du bouton de test “Autre mystère” dans la carte du mystère du jour.
- Retrait du gros panneau “Diagnostic beta” du profil normal.
- Réglages profil simplifiés : moins de texte technique, sauvegarde rangée dans un panneau repliable.
- Carte multi/synchro rendue plus discrète quand tout va bien, mais conservée en cas de hors-ligne, erreur, demande ou score en attente.
- Invitation ami condensée : plus de grand lien brut affiché en permanence.

## Sécurités conservées

- Les garde-fous de rendu, réparation locale, outbox scores et demandes d’amis restent dans le code.
- Les états hors ligne et les files de synchronisation restent visibles quand ils sont utiles.
- Les profils, demandes, classement et PWA ne sont pas modifiés fonctionnellement.

## À tester

1. Ouvrir l’accueil : il doit être moins chargé.
2. Vérifier qu’il n’y a plus de bouton de mystère “test”.
3. Aller dans Profil : le diagnostic beta ne doit plus envahir l’écran.
4. Couper le réseau : la carte hors-ligne/synchro doit toujours apparaître.
5. Résoudre un mystère puis ouvrir le classement : score et rafraîchissement doivent rester OK.
