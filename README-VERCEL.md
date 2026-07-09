# HistoDaily beta138 — friend request guard

Version `1.0.0-beta.138`.

Correctif ciblé social :

- verrouillage serveur : `/api/v1/friends/sync` ne crée plus d’ami direct ;
- les anciens appels d’ajout ami sont convertis en demandes à valider ;
- une ligne `hd_friends` créée par l’ancien flux est retirée si aucune demande acceptée ne justifie l’amitié ;
- les vrais amis validés restent conservés ;
- aucun changement Supabase obligatoire si `hd_friend_requests` existe déjà.

Après déploiement : tester demande d’ami depuis classement, puis vérifier `hd_friend_requests` avant acceptation et `hd_friends` après acceptation.
