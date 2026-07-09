# HistoDaily beta165 — stabilisation fonctionnelle

Base : beta156 stable. Les patches expérimentaux de perf ne sont pas repris.

Correctifs :
- onglet Classement > Semaine cliquable ;
- champ code ami saisissable et brouillon conservé ;
- classement basé sur XP total, cours + mystères ;
- quiz en flux une question à la fois ;
- réponses de quiz robustes même si l’id de cours est stocké en string ;
- déblocage d’un mystère avec gemmes ouvre directement le dossier ;
- nettoyage doux des demandes d’amis déjà validées ;
- cache PWA beta165.

Vérifications : `node --check app.js`, `node --check lib/hd-api.js`, smoke test Node avec DOM simulé sur classement semaine, profil/code ami et quiz.
