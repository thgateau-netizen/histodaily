# Tests beta 272

## Catalogue

- 130/130 mystères chargés.
- 130/130 possèdent `missionQuestion`.
- 130/130 possèdent `answerInstruction`.
- 130/130 possèdent au moins trois indices.
- 0 réponse principale modifiée.
- 0 niveau de difficulté interne modifié.
- 0 conflit entre une nouvelle variante acceptée et une réponse explicitement bloquée.
- Variantes acceptées : 559 avant la passe, 755 après normalisation.

## Exemple méthode des transits

- Question : « Quelle méthode de détection des exoplanètes est décrite ? »
- Instruction : le joueur doit donner le nom de la méthode.
- Indice 1 : comparaison avec une petite éclipse.
- Indice 2 : passage périodique devant l’étoile.
- Indice 3 : amorce « trans… ».
- Variantes « transit », « transits », « méthode du transit » et « photométrie de transit » acceptées.

## Régressions

- `app.js` identique à la beta 271.
- `streak-v265.js` identique à la beta 271.
- `social-v2.js` identique à la beta 271.
- Aucun accès à `state`, aux streaks, aux scores serveur ou aux tables Supabase dans la nouvelle passe éditoriale.
- Tous les fichiers JavaScript passent `node --check`.
- Tous les assets déclarés par le service worker existent.
