# HistoDaily beta 178

## Correctif des cours et des pourcentages

- Le cours sur le cubisme est déplacé de l’identifiant de groupe `art-modern` vers le vrai thème `art-avantgardes`.
- L’accueil, le parcours et le profil utilisent désormais exactement la même liste de cours publiés.
- L’accueil est repeint après le chargement des extensions : les nouveaux totaux apparaissent immédiatement, sans devoir ouvrir le profil.
- Un audit intégré vérifie qu’un cours publié possède un vrai thème, un contenu suffisant et exactement cinq questions.

## Nouveaux contenus hors Histoire

12 cours complets et 60 questions :

- Art : Dada et le ready-made ; street art.
- Cinéma : néoréalisme italien ; système du blockbuster.
- Sciences : radioactivité ; naissance de l’ordinateur.
- Économie : création monétaire bancaire ; Grande Dépression.
- Géographie : métropolisation ; risques et vulnérabilité.
- Musique : naissance de l’opéra ; studio comme instrument.

## Dernier indice pédagogique

Après les trois indices, le joueur peut ouvrir le cours correspondant. Le simple clic ne valide rien : il faut lire le cours puis réussir un nouveau quiz complet, même si le cours avait déjà été validé auparavant.

Le mystère sauvé rapporte 12 XP, ne donne aucune gemme, mais prolonge la série quotidienne. Le score et le classement conservent la mention de ce sauvetage.

## Contrôles réalisés

- 86 cours publiés détectés, sans doublon ni cours orphelin.
- Les 12 nouveaux cours sont visibles et passent les seuils éditoriaux.
- Totaux identiques entre moteur, accueil et progression de chaque discipline.
- Sauvetage testé sur un cours nouveau et sur un cours déjà terminé : une seule réponse ne suffit pas, le quiz complet déclenche la validation.
- Vérification syntaxique de tous les fichiers JavaScript.

## Déploiement

Remplacer tous les fichiers afin de mettre à jour le service worker, le cache et les scripts de contenu.
