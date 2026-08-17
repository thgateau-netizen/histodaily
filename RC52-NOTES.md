# HistoDaily RC52 — Progress & Return Loop

## Pourquoi cette version

Les dernières RC ont raccourci le rituel quotidien et amélioré l’anglais, mais deux faiblesses produit restaient visibles : l’utilisateur voyait surtout son activité (série, XP, dossier terminé) plutôt que ce qu’il avait réellement construit, et un retour après plusieurs jours d’absence n’avait pas de traitement dédié.

## Progression perçue

L’accueil affiche désormais un bloc très compact **Ta progression / Ce que tu construis** dans la discipline active : nombre de dossiers explorés, cours maîtrisés, activité récente sur 7 jours et rappels à consolider lorsqu’il y en a.

Après résolution du dossier quotidien, la solution affiche elle aussi ce bilan et rappelle explicitement que la session vient d’ajouter une découverte au parcours. Il ne s’agit pas d’un nouvel écran, d’une nouvelle monnaie ni d’une barre de remplissage supplémentaire.

## Retour après absence

Quand un utilisateur revient après au moins deux jours, l’accueil affiche une seule fois dans le rendu courant : **« Content de te revoir — Rien à rattraper. »** Le texte précise que le dossier du jour suffit. L’objectif est d’éviter l’effet de dette ou de série cassée qui transforme une courte absence en abandon définitif.

## Diagnostic de rétention

`window.HistoDailyProductLoopRC52.funnelSnapshot()` synthétise désormais les événements déjà collectés : première session (ouverture → lancement → résolution → approfondissement), activité récente, D1/D3/D7, retour après absence et volume d’apprentissage construit. Cela ne remplace pas encore une vraie collecte analytics centralisée, mais rend les tests utilisateurs beaucoup plus faciles à diagnostiquer sans rajouter d’UI publique.

## Garde-fous

- aucun nouvel écran obligatoire ;
- aucune dette de révision affichée au retour ;
- progression dérivée des données existantes ;
- discipline active respectée ;
- RC51 English Spiral conservée ;
- audit RC52 dédié ajouté au pipeline qualité.
