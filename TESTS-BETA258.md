# Tests beta 258

- Syntaxe JavaScript vérifiée sur tous les fichiers `.js`.
- Chargement complet de l’application sans exception JavaScript.
- Changement Histoire → Astronomie : domaine, mystère courant et date d’ouverture synchronisés.
- Ouverture du dossier Astronomie : le mystère affiché correspond au mystère Astronomie du jour.
- État ancien simulé : un mystère de la veille n’est plus considéré comme le dossier courant.
- Rotation simulée sur trois journées : les neuf disciplines changent toutes de mystère lorsque leur réserve contient plusieurs dossiers.
- Réserves constatées : Histoire 29, Art 12, Cinéma 11, Sciences 15, Astronomie 17, Économie 11, Géographie 12, Musique 11, Littérature 12.
- Profil et classement rendus avec des réponses sociales simulées, sans exception JavaScript.
- Routes API, moteur social serveur et schéma Supabase inchangés.
