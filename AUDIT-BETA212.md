# HistoDaily — audit beta 212

## Objectif

Rendre l’accueil plus clair, moins répétitif et transformer l’Expédition du jour en un véritable parcours quotidien à quatre étapes.

## Changements principaux

- Bandeau d’accueil compact avec date, numéro de dossier, étape actuelle, durée estimée, récompense et progression segmentée.
- Défilement direct vers l’Expédition depuis le bandeau.
- Nouvelle hiérarchie de l’Expédition : mission, sujet, prochaine action, chemin en quatre étapes, récompense et rythme hebdomadaire.
- Parcours strictement séquentiel : Résoudre → Comprendre → Relier → Retenir.
- Nouvelle étape finale « Retenir » : question éclair issue du cours, nouvel essai sans pénalité en cas d’erreur, puis validation de l’expédition et attribution de 10 XP.
- Validation de l’étape « Retenir » enregistrée séparément pour éviter qu’un ancien cours terminé ne boucle automatiquement la mission.
- Accueil allégé : retrait des cartes de notes de version et du bloc d’exploration libre redondant.
- Saison éditoriale compactée et recommandations dédupliquées.
- Cache PWA et références d’assets renouvelés en beta 212.

## Contrôles effectués

- Vérification syntaxique de tous les fichiers JavaScript principaux avec Node.js.
- Rendu mobile testé en 320, 360, 390 et 430 px.
- Aucun débordement horizontal détecté aux quatre largeurs.
- Présence vérifiée du bandeau quotidien, de l’Expédition, des quatre étapes et de la saison éditoriale.
- Navigation du bandeau vers l’Expédition vérifiée.
- Ouverture de la première étape « Mystère » vérifiée.
- Étape finale « Retenir » et progression complète testées isolément.
- Absence d’erreur JavaScript lors des scénarios de rendu et d’interaction.
