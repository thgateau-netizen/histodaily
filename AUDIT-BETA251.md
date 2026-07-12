# HistoDaily beta 251 — correctifs réels mobile et multi

## Causes corrigées

- Le bouton Retour du classement était masqué dans une grille à trois colonnes : le titre occupait alors la colonne de 44 px et le bouton Profil prenait sa place. La grille est maintenant explicitement composée de deux colonnes et chaque élément est positionné.
- Le rail des univers utilisait un pseudo-élément avant le premier bouton pour le centrer. Cet espace initial est supprimé et le rail est remis à zéro après le positionnement de `visual-v4`.
- La page Profil issue de `visual-v4` empilait plusieurs générations de cartes. Elle est remplacée par une vue mobile compacte avec sections repliables.
- Un échec d’écriture du profil empêchait l’écriture du score. Le score est désormais envoyé séparément avec plusieurs replis de schéma.
- Le classement échouait entièrement lorsqu’une colonne ou la RPC beta 249 manquait. Une lecture compatible par période (`solved_at`, puis `created_at`) conserve un classement Supabase autoritaire.
- Les relations locales anciennes peuvent être réparées vers Supabase sans restaurer les anciennes demandes en attente nettoyées par la beta 247.
- Le cache beta 250 réutilisait encore le nom beta 249. La beta 251 utilise un cache neuf et précache réellement ses deux nouveaux modules.

## Vérifications

- Syntaxe validée pour tous les fichiers JavaScript client, API et service worker.
- Toutes les ressources référencées par `index.html` et le service worker existent.
- Test API simulé : RPC absente + schéma partiel, classement de deux joueurs retourné avec Manon.
- Test API simulé : écriture du profil refusée, score tout de même enregistré et marqué comme synchronisé.
