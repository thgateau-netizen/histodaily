# Tests beta 264

## Validation statique

- syntaxe de tous les fichiers JavaScript avec `node --check` ;
- JSON valide pour `vercel.json` et `manifest.webmanifest` ;
- toutes les ressources de `index.html` présentes ;
- toutes les ressources préchargées par le service worker présentes ;
- version `1.0.0-beta.264.0` cohérente entre client, serveur, manifeste et cache ;
- une seule inclusion de `social-v2.js` ;
- absence de `SUPABASE-SOCIAL-V2-CLEANUP.sql` dans le paquet.

## Tests du moteur serveur

- score plafonné selon la difficulté ;
- déduplication d’un même mystère ;
- Pepito classé avec un score et Manon conservée à zéro ;
- récupération d’une relation ancienne stockée dans un seul sens ;
- classement Amis contenant bien l’ami confirmé sans ligne dans `hd_scores` ;
- chargement sans 404 des huit routes explicites Social V2 ;
- en-tête serveur `X-HistoDaily-Social-Version: 1.0.0-beta.264.0` sur chaque route.

## Tests du changement de jour

- un dossier Astronomie de la veille est remplacé par celui du nouveau jour sur l’accueil ;
- `currentMysteryOpenedDay` est mis à jour ;
- l’ancien verrou `beta231AstroDossierReady` est supprimé ;
- un mystère d’archive déjà résolu reste ouvert lorsque le joueur est encore dans sa page ;
- le moteur quotidien annonce la version `1.0.0-beta.264.0`.

## Non-régression

Les feuilles de style, le profil Orbit, les composants du classement, les routes explicites et le schéma SQL ont été comparés à la beta 259 et n’ont pas été modifiés.
