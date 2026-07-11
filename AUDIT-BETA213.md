# HistoDaily — audit beta 213

## Objectif

Rendre l’Expédition du jour moins statique, plus lisible étape par étape et plus gratifiante à terminer, sans alourdir la page d’accueil.

## Changements principaux

- Le bandeau quotidien affiche désormais la prochaine action exacte : enquête, cours, connexion ou rappel.
- Une session d’expédition est mémorisée par jour afin d’estimer la durée réelle du parcours.
- Le briefing évolue selon la progression : sujet masqué, sujet révélé, connexion proposée, puis rappel final.
- Nouveau défi de précision visible dans la mission : résolution sans indice, avec retour après l’enquête.
- L’étape « Relier » montre explicitement le passage du premier cours vers le second.
- Une validation d’étape déclenche un retour visuel léger et haptique lors du retour à l’accueil.
- La fin du parcours possède désormais un bilan complet : durée, score du mystère, gemme, deux cours reliés, partage et sujet bonus.
- Une fenêtre de célébration apparaît après la question finale, au lieu d’un simple toast.
- Le bandeau de l’accueil met brièvement en évidence l’Expédition après le défilement.
- Cache PWA et références d’assets renouvelés en beta 213.

## Garde-fous

- Aucun nouveau verrou sur les cours.
- Aucun changement du barème du mystère ou de l’économie des gemmes.
- L’étape finale conserve les 10 XP déjà prévus.
- Les animations respectent `prefers-reduced-motion`.
