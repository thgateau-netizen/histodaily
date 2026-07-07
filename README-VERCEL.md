# HistoDaily — Vercel / GitHub beta60

Version : `1.0.0-beta.60`

## Objectif

Cette version continue la direction “app finale + multi léger”, sans chat et sans nouveau contenu massif.

Elle stabilise surtout :

- profil joueur local ;
- code ami ;
- lien d’invitation `?friend=CODE` ;
- ajout/retrait d’amis ;
- profils publics consultables ;
- classements jour/semaine/année/amis ;
- soumission automatique du score à `/api/v1/leaderboard/submit` ;
- fallback local si la base en ligne n’est pas configurée ;
- API préparées pour Supabase sans clé dans GitHub.

## Déploiement

Avec GitHub Desktop :

1. Dézipper le paquet.
2. Remplacer le contenu du dossier local du repo par ce contenu.
3. Ne pas supprimer `.git` si tu le vois.
4. Commit : `Beta58 real friends reset`.
5. Push origin.
6. Vercel redéploie automatiquement.

## Tests rapides

- `/api/v1/health` doit afficher `1.0.0-beta.60`.
- Résoudre un mystère doit afficher un statut de score : envoyé / local / hors-ligne.
- Profil : le code ami et le lien d’invitation doivent être copiables.
- Ouvrir `/?friend=CODE_REEL` doit ajouter le vrai code partagé par un autre joueur.
- Classement amis : ton profil et les amis ajoutés doivent apparaître.
- Aucun chat, aucune messagerie.

## Multi réel

Avec Supabase configuré, le classement est réel. Sans score envoyé, il reste vide : aucun faux joueur n’est injecté.

Pour brancher le vrai serveur plus tard, ajouter dans Vercel :

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Puis créer les tables avec `tools/supabase-schema.sql`.

## Beta54 — Supabase live mode

Cette version lit le classement jour/semaine/année depuis Supabase quand les variables Vercel sont configurées :

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Le multi reste volontairement limité à : amis, profils, classements. Aucun chat.


## Beta56
- Correction forte des champs texte : pseudo, réponse du mystère, recherche et code ami.
- Reset test fiable : ouvrir `/?reset=1` pour effacer la progression locale puis rejouer le mystère.
- Mode debug : `/?debug=1`.
- Fallback pseudo : bouton “Modifier via fenêtre simple”.


## Beta56
- Correction de la sauvegarde normale du pseudo : bouton Enregistrer, touche Entrée, changement de champ et fenêtre simple utilisent le même chemin robuste.
- POST `/api/v1/me` prépare aussi la synchronisation du profil dans `hd_profiles` quand Supabase est actif.


## Beta 57 — correction cours

- Corrige le bug où les blocs de cours ouverts (`Quiz`, `Vocabulaire utile`, `Pour aller plus loin`) s’affichaient puis disparaissaient.
- Supprime le re-render automatique déclenché après l’ouverture d’un cours via focus Express/Complet/Quiz.
- Isole les clics sur `details/summary` pour éviter qu’un clic de sous-partie soit interprété comme une navigation.
- Garde les corrections beta56 : pseudo, Entrée, reset `?reset=1`, Supabase.


## Beta58 — vrais amis / reset testeur

- Suppression des faux amis et faux joueurs inventés dans l’interface.
- Les classements restent vides tant qu’aucun score réel n’est enregistré.
- Ajout d’un reset progression visible dans Profil → Tests bêta.
- Ajout d’un endpoint `/api/v1/progress/reset` pour effacer le score serveur du jour d’un joueur pendant les tests.
- Le submit score remplace le score du même joueur/mystère/jour au lieu d’empiler des doublons.


## Beta60

Correction Vercel Hobby : toutes les routes API passent maintenant par une seule fonction `api/v1/[...path].js`, donc le déploiement reste sous la limite Hobby de 12 Serverless Functions.


## Beta60

Correction Vercel Hobby : le catch-all `api/v1/[...path].js` ne capturait pas correctement les routes imbriquées comme `/api/v1/leaderboard/daily`. Les routes sont maintenant explicites mais restent sous la limite Hobby.

À vérifier après déploiement :

- `/api/v1/health`
- `/api/v1/leaderboard/daily?scope=daily`
- `/api/v1/leaderboard/submit` après résolution d'un mystère
