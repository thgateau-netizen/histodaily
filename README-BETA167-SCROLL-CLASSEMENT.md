# HistoDaily beta167 — classement scroll-safe

Correctif ciblé sur le classement mobile.

- La ligne complète du classement n’ouvre plus un profil.
- Seul le bouton explicite **Profil** à droite ouvre la fiche joueur.
- Les gestes de scroll sont détectés et ignorés par le handler social.
- L’ancien handler beta134 qui ouvrait au `touchend` est retiré.
- Le rendu du classement garde l’XP totale et les correctifs demandes d’amis de beta166.

Version : 1.0.0-beta.167
