# Audit beta 264 — Expédition premium

- Aucun changement des routes Vercel, de Supabase, du classement, des amis ou du profil.
- Le moteur de mystère existant reste la source de vérité pour les réponses, pénalités, indices et scores.
- La nouvelle couche ajoute uniquement une présentation, un chronomètre local de session et une synthèse de résultat.
- Les indices ne sont jamais révélés automatiquement : le bouton premium déclenche le bouton d’indice existant.
- Le chronomètre n’entre pas dans le calcul du score et n’est pas envoyé au serveur.
- Les animations sont désactivées avec `prefers-reduced-motion`.
