# Audit beta 253 — reconstruction du multi

## Décision

Le multi n’a pas reçu un correctif supplémentaire. Les six couches `social-reliability-244/245/246/247/249/250` et le correctif réseau de `mobile-repair-252.js` ont été retirés du chargement puis supprimés du paquet.

## Nouvelle architecture

### Client

`social-v2.js` possède seul :

- l’état social en mémoire et dans la sauvegarde ;
- la synchronisation du profil ;
- les demandes d’amis ;
- les relations confirmées ;
- les classements jour, semaine et année ;
- les écrans Classement, Profil et Profil joueur ;
- l’envoi idempotent des scores.

Les écrans ne fusionnent plus des amis locaux avec les résultats du serveur. Une relation n’apparaît qu’après une réponse Supabase valide.

### Serveur

`lib/hd-social-v2.js` expose un jeu de routes court et cohérent :

- `social-v2/bootstrap`
- `social-v2/leaderboard`
- `social-v2/score`
- `social-v2/friends/request`
- `social-v2/friends/respond`
- `social-v2/friends/remove`
- `social-v2/profile`
- `social-v2/health`

Les recherches de code ami sont exactes. Les anciennes comparaisons par suffixe, qui pouvaient rattacher deux profils différents, ne sont plus utilisées.

## Invariants

1. `player_id` est l’identité technique ; `friend_code` sert uniquement à retrouver un profil exact.
2. Une amitié est enregistrée dans les deux sens et vérifiée côté serveur.
3. Une demande en sens inverse est acceptée automatiquement au lieu de créer deux demandes concurrentes.
4. Un score est unique par joueur, mystère, jour et portée ; le meilleur score est conservé.
5. Les amis sans score sont présents dans le classement Amis avec zéro point.
6. Le client n’affiche jamais « synchronisé » si la réponse n’est pas autoritaire.
7. Un échec réseau conserve éventuellement la dernière copie mais ne la présente pas comme fraîche.

## Affichage mobile

Les écrans sociaux utilisent leurs propres classes `hdsv2-*`, sans dépendre des anciennes grilles `hd242/hd245` :

- en-tête à deux colonnes sans bouton superposé au titre ;
- onglets de période en trois colonnes réellement flexibles ;
- aucune largeur fixe dépassant 390 px ;
- contenu protégé du menu inférieur par un espace de sécurité ;
- adaptation spécifique sous 460 px et 360 px.

Le rail de l’accueil est désormais géré par `mobile-layout.js`, qui ne contient aucune logique de classement.

## Vérifications réalisées

- syntaxe de tous les fichiers JavaScript ;
- présence de chaque ressource référencée par `index.html` et le service worker ;
- absence des anciens scripts sociaux dans le chargement ;
- chargement isolé de `social-v2.js` dans un environnement JavaScript simulé ;
- agrégation de scores avec déduplication ;
- présence d’un ami à zéro point ;
- classement Pepito/Manon sur scores distincts ;
- cache PWA passé à `histodaily-beta253-v1`.

La connexion au Supabase de production n’est pas disponible pendant la construction du paquet. La validation finale de données réelles doit donc se faire après déploiement via `/api/v1/social-v2/health` et les deux comptes.
