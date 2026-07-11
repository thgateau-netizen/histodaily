# HistoDaily beta 215 — intégrité du parcours

## Bugs corrigés

1. **L’expédition changeait de cours après une navigation libre**
   - Cause : le mystère quotidien dépendait de la discipline active. Ouvrir un autre cours modifiait cette discipline, puis le retour à l’accueil recalculait un autre dossier.
   - Correction : le dossier, le cours principal et le cours de connexion sont figés au premier geste de l’expédition. Avant son lancement, l’utilisateur peut encore changer librement de discipline.

2. **Le lecteur annonçait trop tôt la fin du parcours**
   - Cause : le pied du lecteur proposait toujours « Cours suivant » ou « Thème terminé », y compris pendant un quiz incomplet.
   - Correction : aucun lien vers le cours suivant n’apparaît avant la fin réelle et la validation du quiz. À 2/5, le lecteur affiche désormais « Quiz en cours · 2/5 » et le nombre de questions restantes.

3. **Progression ambiguë dans le lecteur**
   - Le bandeau indique maintenant `Quiz 2/5`, puis `Terminé` uniquement quand toutes les questions ont été traitées.
   - Un score insuffisant propose de recommencer, sans annoncer la fin du thème.

## Contrôles automatisés

- Chargement JavaScript sans exception.
- Version application, assets et service worker : `1.0.0-beta.215.0`.
- 106 cours inspectés.
- Aucun identifiant de cours dupliqué.
- Aucun lien invalide dans l’expédition enregistrée.
- Changement de discipline avant lancement : autorisé.
- Changement de discipline après lancement : expédition conservée.
- Quiz incomplet 2/5 : aucun bouton « Cours suivant », aucun message « Thème terminé ».
- Quiz validé 5/5 : bilan et suite affichés seulement à ce moment-là.
