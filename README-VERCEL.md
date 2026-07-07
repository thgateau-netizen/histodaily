# HistoDaily — beta51 stabilité + contenu

Version : `1.0.0-beta.51`

## Objectif de cette passe

Cette version arrête d'ajouter des gadgets et remet l'app sur des rails propres :

- accueil réduit à l'essentiel : mystère du jour, cours indépendant, progression ;
- cours-réponse verrouillé si le mystère du jour n'est pas résolu ;
- indices régénérés avec une logique progressive, sans donner directement la réponse ;
- disparition des blocs de type `Trace utile` / `Erreur à éviter` dans l'interface Express ;
- mode debug avec `?debug=1` : audit contenu + reset local ;
- endpoint de base pour futur multi : `/api/v1/leaderboard/submit`, volontairement en mode local-demo tant que Supabase n'est pas configuré.

## Déploiement

Avec GitHub Desktop :

1. Dézipper le paquet.
2. Remplacer le contenu du dossier local du repo par ce contenu.
3. Ne pas supprimer `.git` si tu le vois.
4. Commit : `Beta51 stability content pass`.
5. Push origin.
6. Vercel redéploie automatiquement.

## Tests rapides

- `/api/v1/health` doit afficher `1.0.0-beta.51`.
- `/api/v1/daily-mystery` ne doit pas révéler la réponse.
- Accueil : pas de cours-réponse du mystère affiché en clair.
- `/?debug=1` affiche l'audit contenu.
- Un cours lié au mystère du jour reste verrouillé avant résolution.

## Multi

Le multi réel n'est pas activé ici. Il faut d'abord Supabase et variables Vercel :

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Sans ça, les classements restent locaux/démo.
