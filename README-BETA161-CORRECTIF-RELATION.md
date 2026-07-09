# HistoDaily 1.0 beta161 — correctif relation/profil

Correctif général sur la zone Profil / Amis :

- priorité à la relation serveur `relationship.friend` quand un profil public est ouvert ;
- nettoyage des demandes sortantes si la personne est déjà amie ;
- nettoyage de la file locale d’envoi des demandes ;
- bouton de réparation locale si une demande reste bloquée malgré une validation côté autre appareil ;
- `/friends/requests` renvoie aussi les amis et filtre les pending obsolètes ;
- version/cache PWA mis à jour en `1.0.0-beta.161`.

Base : beta160, sans réintroduire les optimisations JS agressives de beta157.
