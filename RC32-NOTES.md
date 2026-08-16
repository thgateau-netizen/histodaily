# HistoDaily RC32 — Content Quality Homogenization

## Périmètre audité
Audit éditorial interne complet du catalogue actuellement chargé par l'application :

- 209 cours ;
- 158 mystères / expéditions ;
- 1 045 questions de quiz ;
- 11 disciplines.

L'audit porte sur la profondeur réellement visible dans l'interface, la structure, la qualité des explications, les répétitions, la lisibilité des QCM et les mystères. Il ne constitue pas une vérification bibliographique externe ligne par ligne de chaque fait historique ou scientifique.

## Diagnostic RC31
Avec les mêmes critères que ceux utilisés après correction :

- 759 défauts éditoriaux bloquants ;
- 36 risques de QCM où la longueur de la bonne réponse donnait un indice trop fort ;
- 171 cours complets sous 420 mots visibles ;
- 106 cours avec moins de 6 sections visibles ;
- 77 modes Express trop courts dans les 3 blocs réellement affichés ;
- 280 explications de quiz trop courtes ;
- 59 explications qui répétaient essentiellement la réponse ;
- 24 formulations de questions dupliquées ;
- 42 prompts / explications de mystères trop courts.

Les deux disciplines les plus en retrait étaient Littérature et Astronomie en profondeur visible. Histoire avait surtout une forte dette sur l'Express et la longueur des cours. Anglais et Philosophie possédaient davantage de matière en profondeur, mais leur quatrième bloc Express n'était pas affiché par le lecteur, ce qui rendait leur version visible plus courte qu'attendu.

## Corrections RC32

### Cours complets
- Les approfondissements déjà écrits sont promus dans le cours complet lorsqu'ils apportent une vraie section supplémentaire.
- Cible commune : au moins 6 sections et environ 420 mots visibles minimum.
- Lorsque la matière existante ne suffisait pas, une synthèse spécifique au cours est construite à partir de ses repères et takeaways, pas à partir de texte générique hors sujet.
- Les sections strictement dupliquées sont retirées.
- Les 16 blocs d'entraînement identiques d'Anglais / Philosophie ont été personnalisés par concept.

### Express
- Audit basé sur les 3 blocs réellement affichés par l'interface.
- Les cours sous 120 mots visibles sont renforcés avec leurs propres takeaways, repères et exemples.
- Anglais et Philosophie ne dépendent plus d'un quatrième paragraphe caché pour atteindre une profondeur correcte.

### Quiz
- Chaque quiz conserve 5 questions.
- Explications portées à une longueur minimale utile et reliées à une section du cours.
- Les explications qui se limitaient à recopier la bonne réponse sont réécrites.
- Les 24 questions dupliquées deviennent contextualisées par le titre du cours.
- 36 questions où la bonne réponse se détachait trop par sa longueur ont reçu des distracteurs plus équilibrés ; une trentaine de cas particulièrement visibles ont été réécrits manuellement.

### Mystères
- Tous les prompts et explications atteignent désormais le seuil éditorial minimum.
- Les enrichissements utilisent le cours lié afin de rester spécifiques au sujet.

## Résultat mesuré
Le même audit donne après RC32 :

- 0 défaut éditorial bloquant ;
- 0 avertissement de longueur révélant la bonne réponse ;
- 0 question dupliquée ;
- 0 cours sous les seuils structurels retenus par l'audit ;
- 0 mystère sous les seuils de prompt / explication ;
- 0 bloc complet strictement dupliqué entre les cours après la passe de déduplication.

Les moyennes de cours complets visibles se situent désormais approximativement entre 469 et 508 mots selon la discipline, contre 302 à 404 mots pour plusieurs disciplines auparavant.

## Contrôle permanent
Nouveau script : `scripts/content-quality-audit.mjs`.

Commandes :

- `npm run content:audit`
- `npm run quality:check` exécute désormais également l'audit de contenu.

Rapports :

- `RC32-BASELINE-CONTENT-AUDIT.json` — état RC31 avec les critères RC32 ;
- `RC32-CONTENT-AUDIT.json` — état final ;
- `RC32-CONTENT-COMPARISON.json` — comparaison avant / après.
