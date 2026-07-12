# HistoDaily beta 270 — réconciliation amis et scores

## Problème observé

Un joueur pouvait voir son propre profil à 0 point dans le classement général, tandis que son ami ne le voyait pas. Deux mécanismes étaient en cause :

1. le classement général masque volontairement les autres joueurs à 0 point ;
2. une demande acceptée pouvait ne pas produire les deux lignes réciproques dans `hd_friends`, notamment après changement d’identifiant local ou écriture partielle.

## Correctifs

- Une demande `accepted` devient une source autoritaire de relation, même si `hd_friends` est incomplet.
- Résolution de l’ami par identifiant **ou** code ami canonique.
- Réparation automatique des deux lignes réciproques lors du bootstrap social.
- Les amis confirmés sont semés dans le classement Amis avec 0 point.
- La file de scores locaux est reconstruite et renvoyée à chaque retour visible, reconnexion et rafraîchissement de fond.
- Le classement du jour explique désormais que les archives ne comptent pas dans le score quotidien et que les joueurs à 0 sont visibles dans l’onglet Amis.

## Non modifié

- règles de calcul des scores ;
- classement général ;
- profil ;
- séries ;
- contenu ;
- schéma SQL.

## Tests

- syntaxe de tous les fichiers JavaScript ;
- relation présente uniquement dans `hd_friend_requests` avec statut `accepted` ;
- récupération du profil ami par identifiant et code ;
- inclusion d’un ami sans score dans l’agrégation ;
- cache PWA et routes API.
