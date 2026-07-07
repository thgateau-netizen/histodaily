# HistoDaily — beta54 social-ready

Version : `1.0.0-beta.54`

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
4. Commit : `Beta54 social ready`.
5. Push origin.
6. Vercel redéploie automatiquement.

## Tests rapides

- `/api/v1/health` doit afficher `1.0.0-beta.54`.
- Résoudre un mystère doit afficher un statut de score : envoyé / local / hors-ligne.
- Profil : le code ami et le lien d’invitation doivent être copiables.
- Ouvrir `/?friend=MANON-A7K9` doit ajouter Manon en ami localement.
- Classement amis : ton profil et les amis ajoutés doivent apparaître.
- Aucun chat, aucune messagerie.

## Multi réel

Sans Supabase, le multi reste une prévisualisation locale : parfait pour tester l’interface, insuffisant pour un classement vraiment partagé entre joueurs.

Pour brancher le vrai serveur plus tard, ajouter dans Vercel :

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Puis créer les tables avec `tools/supabase-schema.sql`.

## Beta54 — Supabase live mode

Cette version lit le classement jour/semaine/année depuis Supabase quand les variables Vercel sont configurées :

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Le multi reste volontairement limité à : amis, profils, classements. Aucun chat.
