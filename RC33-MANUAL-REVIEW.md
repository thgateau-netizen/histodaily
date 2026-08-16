# RC33 — revue qualitative par discipline

Cette matrice résume les faiblesses observées pendant la lecture des éléments signalés et l'échantillonnage manuel transversal. Elle complète l'audit automatique ; elle ne remplace pas une expertise bibliographique spécialisée.

| Discipline | Faiblesse dominante trouvée | Action RC33 |
|---|---|---|
| Histoire | remplissage RC32, titres/glossaires dupliqués, distracteurs trop caricaturaux | suppression des ajouts mécaniques, renommage des repères, QCM repris |
| Astronomie | sections doublées/numérotation, quelques explications sémantiquement mal raccordées | architecture nettoyée, explications ciblées réécrites |
| Philosophie | exercices trop templatisés, quiz parfois surtout définitionnels | 16 ateliers spécifiques + questions de transfert |
| Anglais | exercices génériques, quelques explications fausses/mal raccordées, nuance grammaticale | 16 ateliers spécifiques, corrections sémantiques et scénarios contextualisés |
| Géographie | distracteurs souvent faciles à éliminer, quelques titres cassés | distracteurs plausibilisés, structure réparée |
| Sciences | distracteurs trop absolus, quelques corrections mal raccordées | QCM repris, explications ciblées corrigées |
| Littérature | mystères trop révélateurs et explications parfois génériques | prompts réécrits, justifications ciblées renforcées |
| Économie | inflation/taux/public goods : distracteurs trop grossiers ou confusions possibles | QCM et explications réécrits |
| Cinéma | questions très définitionnelles sur certains cours, enjeux documentaire/montage sous-testés | scénarios de raisonnement + distracteurs repris |
| Art | doublons de titres et distracteurs simplistes sur perspective/figuration | structure et QCM nettoyés |
| Musique | peu de défauts de fond mais quelques titres corrompus et distracteurs pauvres | titres réparés + QCM repris |

## Lecture transversale

Une vérification manuelle de cours représentatifs dans les 11 disciplines a été effectuée après patch afin de rechercher des défauts qui ne ressortent pas d'un simple compteur : titres qui se répètent, bloc ajouté sans vraie fonction, mauvaise explication reliée à une question, réponse devinable à la forme des distracteurs, ou exercice interchangeable entre deux cours.

Cette passe a notamment permis de découvrir des anomalies que RC32 considérait pourtant comme « conformes », par exemple deux sections `5.` dans le même cours, un repère intitulé seulement `milles`, et une section musicale tronquée en `n’est pas la naissance du jazz`.
