# Audit beta 243 — amis et classement partagé

## Symptômes corrigés

- Une même journée pouvait afficher des scores différents sur deux téléphones.
- Un joueur pouvait être visible comme ami sur un appareil mais absent sur l'autre.
- Une demande acceptée pouvait rester bloquée ou créer une relation seulement dans un sens.
- Une ancienne valeur de score erronée pouvait rester définitivement en base.

## Causes trouvées

1. Une ancienne couche du client utilisait parfois l'XP totale du profil comme score du jour, de la semaine ou de l'année.
2. Le tableau de classement mélangeait des données locales avec les lignes reçues de Supabase.
3. Le classement Amis dépendait en partie de la liste locale du téléphone au lieu de reconstruire les relations acceptées depuis `hd_friends`.
4. L'envoi d'un nouveau score conservait parfois l'ancienne valeur la plus élevée, même quand elle provenait du bug d'XP.
5. La lecture des amis ne résolvait pas toujours l'identité canonique par code ami.

## Correctifs

- Supabase devient la source d'autorité dès qu'une réponse valide a été reçue.
- Les scores envoyés correspondent uniquement au score exact du mystère résolu.
- Le serveur remplace les anciennes valeurs erronées pour le même joueur, mystère et jour.
- Le classement Amis est calculé côté serveur depuis les relations acceptées dans `hd_friends`.
- Les lectures sociales utilisent l'identité canonique déterminée par `friend_code` et `player_id`.
- L'acceptation d'une demande est idempotente et crée les deux lignes réciproques de relation.
- Une resynchronisation unique renvoie les mystères déjà résolus avec leur score exact.
- Les écrans Classement et Amis se rafraîchissent automatiquement lorsqu'ils sont visibles.

## Vérification réalisée

Un test d'intégration API avec deux profils distincts, Théo et Manon, a validé :

- création des deux profils ;
- envoi d'une demande ;
- réception de la demande sur le second profil ;
- acceptation ;
- relation réciproque ;
- classement Amis strictement identique depuis les deux identités ;
- remplacement d'un ancien score trop élevé par le score exact.

Résultat : `PASS beta243 API social + leaderboard integration`.

Les principaux fichiers JavaScript passent également le contrôle de syntaxe.

## Déploiement

Aucune nouvelle table ni migration Supabase n'est requise par rapport à la beta 242. Les quatre tables existantes restent utilisées :

- `hd_profiles`
- `hd_scores`
- `hd_friends`
- `hd_friend_requests`

Après déploiement, les deux téléphones doivent utiliser la beta 243. L'ancienne application peut continuer à injecter ses valeurs locales tant qu'elle reste ouverte ou conservée par le cache PWA.

## Limite de la vérification

Le test d'intégration serveur a été exécuté avec succès. Le navigateur Chromium disponible dans l'environnement de fabrication bloque toutefois toute navigation locale par politique d'administration ; le parcours visuel complet n'a donc pas pu être automatisé ici.
