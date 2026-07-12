# HistoDaily beta 252 — correction des causes réelles

## Régressions identifiées

1. Le correctif mobile des beta 250/251 ciblait `.hd219-disciplines`, alors que l'accueil final est rendu par `.hd222-world-switcher`.
2. Le bouton retour du classement est masqué par une ancienne règle, mais l'en-tête conservait une grille à trois colonnes. Le titre et le bouton profil étaient donc replacés dans les mauvaises colonnes.
3. Un état `loading: true` pouvait être sauvegardé puis réutilisé indéfiniment après une interruption.
4. La synchronisation des scores, du profil et du classement n'avait pas de durée maximale. Une requête bloquée pouvait figer l'actualisation.
5. Le service worker servait d'abord ses fichiers JavaScript/CSS en cache, ce qui pouvait laisser apparaître une ancienne interface après un déploiement.

## Correctifs beta 252

- Rail d'univers corrigé sur les vraies classes `hd222`, sans pseudo-éléments de centrage.
- Deux cartes complètes visibles sur mobile, départ systématique sur Histoire.
- En-tête du classement en deux colonnes explicites : titre à gauche, profil à droite.
- Réinitialisation des anciens états de chargement orphelins.
- Requêtes de classement bornées à 10 secondes avec `AbortController`.
- Synchronisations préalables bornées afin qu'elles ne puissent plus bloquer le classement.
- Conservation d'un classement serveur valide en cas de panne réseau.
- Temporisation après erreur pour éviter les boucles de nouvelles requêtes.
- Service worker en stratégie réseau d'abord pour HTML, JS, CSS et manifeste.

## Vérifications effectuées

- Validation syntaxique de tous les fichiers JavaScript avec Node.
- Validation JSON du manifeste.
- Test DOM mobile 390 px : deux univers entièrement visibles, rail à `scrollLeft = 0`.
- Test DOM mobile 390 px : aucune superposition entre le titre du classement et le bouton profil.
- Test simulé du classement : réponse `supabase-aggregate` acceptée, deux joueurs enregistrés, état `loading` remis à `false`.
- Test simulé d'une panne : les lignes partagées déjà chargées restent visibles et autoritatives.
