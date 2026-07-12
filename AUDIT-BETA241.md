# Audit éditorial — HistoDaily beta 242

## Objectif

Continuer le nettoyage sans ajouter de cours : supprimer les éléments qui ressemblent à du remplissage automatique et renforcer le lien entre problème, cours et révision.

## Changements visibles

- Suppression du grand bloc automatique « Fil du cours / repères » placé avant la lecture. Il répétait souvent des fragments du cours et pouvait donner une impression de contenu décousu.
- Suppression des anciens blocs de repères dans le quiz.
- Le parcours reste centré sur trois étapes : **Problème → Cours → Révision**.
- Les textes d’interface trop métatextuels ont été raccourcis.

## Nettoyage du contenu

- Les fils pédagogiques sont désormais reconstruits à partir des vraies sections du cours, dans leur ordre, et non à partir de fragments isolés.
- Les titres génériques de synthèse (« Mécanisme », « Nuance », « À retenir », etc.) sont remplacés par le titre réel de la section lorsqu’ils n’apportent rien.
- Les approfondissements trop courts, génériques ou redondants avec le cours sont retirés.
- Les sections numérotées sont remises dans l’ordre.
- Les corrections de quiz sont reliées à la section la plus pertinente par les mots du problème et de la réponse.
- Lorsqu’aucune justification réellement liée au cours n’est trouvée, aucun texte de remplissage n’est affiché.

## Incohérences corrigées manuellement

- Dates de publication des deux parties de *Don Quichotte* ajoutées au cours.
- Date de publication des *Fleurs du mal* ajoutée au cours.
- Explication du rythme dans le vers libre ajoutée au passage correspondant.
- Rôle de 1517 et de la critique des indulgences replacé dans le corps du cours sur les Réformes.
- Lieu de naissance des étoiles explicité dans le cours.
- Vallées et anciens deltas martiens reliés à la présence passée d’eau liquide.
- Complémentarité entre robots et équipages humains replacée dans le cours sur l’exploration.
- Rupture introduite par le phonographe replacée dans le cours sur l’enregistrement.

## Contrôles

Audit exécuté sur les 110 packs de contenu externes chargés par l’application :

- 110 fils pédagogiques reconstruits à partir des sections réelles ;
- 550 questions contrôlées ;
- 0 correction sans explication spécifique ;
- 0 intitulé interne du type `repère-2` ou `quiz-3` ;
- 0 fil pédagogique réduit à un fragment incompréhensible ;
- 13 approfondissements faibles ou redondants retirés ;
- syntaxe JavaScript validée pour tous les scripts ;
- cache PWA et versions alignés sur `1.0.0-beta.242.0`.
