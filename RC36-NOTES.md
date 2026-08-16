# HistoDaily RC36 — Lean Learning Flow

## Décision produit
Le mode Express est mis en sommeil. Son contenu reste présent dans les données et le code pour une éventuelle réactivation future, mais il n'est plus proposé dans le parcours utilisateur actuel.

## Nouveau parcours
Expédition → Comprendre → Cours → Quiz

## Changements
- suppression de la carte « Maîtrise % » sur l'accueil ;
- suppression du pourcentage de maîtrise dans le sélecteur d'univers ;
- la place libérée est donnée à la prochaine action utile ;
- après résolution d'une expédition, « Comprendre » ouvre directement le cours ;
- un cours ouvert depuis l'accueil, le catalogue ou le cours suivant démarre sur le cours normal ;
- le lecteur n'affiche plus que « Cours » et « Quiz » ;
- les anciens états sauvegardés `lessonView = express` sont remappés vers `complete` ;
- les textes d'aide/onboarding ne parlent plus d'Express ;
- les références historiques « Express » dans les indications de quiz sont neutralisées à l'affichage ;
- les données `express` restent intactes dans les packs de contenu.

## Validation
- 13/13 contrôles Lean Flow ;
- 15/15 contrôles UI Flow ;
- 16/16 contrôles Product Polish ;
- bundles JS valides ;
- 209 cours, 158 mystères et 1 045 questions toujours chargés ;
- 0 warning au quality-check général ;
- 1 alerte de plausibilité éditoriale déjà connue et non bloquante.
