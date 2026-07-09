# HistoDaily beta163 — correctif général stabilité

Base : beta156, sans les patches expérimentaux beta157-beta162.

Correctifs principaux :
- saisie du code ami protégée contre les rerenders mobile ;
- conservation de `friends` en objet/map au lieu de le transformer en liste ;
- nettoyage des demandes d’amis obsolètes quand une relation est déjà validée ;
- classement basé sur l’XP total (`state.xp`, cours + mystères), pas seulement sur le score du mystère ;
- payload serveur envoyé en XP total ;
- navigation retour et déblocage de mystère repris sobrement sans intercepter les champs texte ;
- cache PWA bumpé en beta163.

Test conseillé :
1. Profil : taper un code ami, quitter/revenir, vérifier que la saisie reste possible.
2. Changer pseudo, fermer/réouvrir.
3. Classement : vérifier que le score local correspond à l’XP du profil.
4. Débloquer un mystère avec gemmes : ouverture directe du dossier.
