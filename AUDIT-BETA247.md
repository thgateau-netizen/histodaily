# HistoDaily beta 247 — nettoyage des anciennes demandes locales

- Les demandes reçues et envoyées encore présentes uniquement dans le stockage local sont supprimées une seule fois lors du passage en beta 247.
- Les anciennes réponses en attente de synchronisation associées à ces demandes sont également retirées de la file locale.
- L'historique social et la liste d'amis sont conservés.
- Après le nettoyage, une actualisation serveur forcée est lancée en ligne : seules les demandes réellement présentes dans Supabase peuvent réapparaître.
- La migration est marquée comme terminée afin de ne pas supprimer les nouvelles demandes créées après la mise à jour.
