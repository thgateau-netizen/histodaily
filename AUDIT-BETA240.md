# Audit éditorial — HistoDaily beta 244

## Objectif

Supprimer les marqueurs de contenu généré mécaniquement : commentaires vagues, conseils génériques, intitulés internes et phrases qui paraphrasent la bonne réponse sans rien expliquer.

## Nettoyage effectué

- 100 commentaires identiques du type « Cette réponse reprend le mécanisme expliqué dans le cours » supprimés à la source.
- 405 faux « pièges » génériques supprimés à la source.
- Les commentaires manquants ne sont plus remplacés par une phrase de remplissage.
- Une explication est désormais reprise dans la section du cours réellement liée à la question.
- Les références « Section 1 du cours complet » sont transformées en titres lisibles, par exemple « Une lumière ancienne ».
- Les intitulés internes `repère-1`, `question-2` ou `quiz-3` ne sont plus affichés.
- Les trois approfondissements astronomiques génériques répétés vingt fois sont filtrés.
- Les amorces métatextuelles comme « Ce cours explique que… » sont raccourcies lorsqu’elles apparaissent.
- L’interface emploie désormais « Explication », « À ne pas confondre » et « Dans le cours », uniquement lorsqu’un contenu utile existe.

## Règle éditoriale ajoutée

Une correction doit apporter au moins une information supplémentaire : cause, mécanisme, date, exemple, source ou distinction. À défaut, elle n’est pas affichée.

## Contrôles

- Syntaxe JavaScript validée pour les fichiers principaux et tous les packs de contenu.
- Test unitaire de la passe éditoriale : explication extraite du bon bloc, titre de section reconstruit, piège générique supprimé, intitulé interne masqué.
- Cache PWA et versions alignés sur `1.0.0-beta.245.0`.
