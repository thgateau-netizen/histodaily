# HistoDaily RC53 — Daily Value & Curiosity

## Pourquoi cette version

RC52 rend la progression visible et traite mieux le retour après une absence. Le point faible suivant était la **valeur ressentie de la session minimale** : hors anglais, résoudre un dossier pouvait encore se terminer sur une réponse + une explication, sans garantir que l'utilisateur reparte avec plusieurs repères faciles à retenir. Le teaser du lendemain souffrait aussi d'un défaut concret : il privilégiait souvent la `missionQuestion`, ce qui produisait des formulations génériques du type « Quel personnage / régime / événement est décrit ? ».

## 1. Trois choses à garder après chaque dossier

Pour les **144 mystères non anglais**, la résolution remplace le simple bloc « À retenir » par un pack compact **3 choses à garder** :

- **Repère** : la réponse replacée dans sa période ou son contexte ;
- **Idée clé** : la première idée forte de l'explication ;
- **Indice concret** : un fait ou élément de preuve provenant du dossier.

Le système réutilise les contenus déjà édités et retire les formulations de secours du type « Dernier coup de pouce ». Il ne crée donc pas une nouvelle couche de contenu artificiel et ne rallonge pas le parcours obligatoire.

Exemple Athènes :
- Repère : « La démocratie athénienne — Grèce classique » ;
- Idée clé : démocratie fondatrice mais directe, masculine, civique et excluante ;
- Indice concret : citoyens qui débattent, votent, jugent et peuvent être tirés au sort.

L'anglais conserve son traitement RC50/RC51 spécifique avec ses expressions utiles et sa répétition espacée.

## 2. Teaser du lendemain réellement intrigant

Le teaser n'affiche plus en priorité la consigne générique du dossier. RC53 utilise le **titre narratif non-spoilant** puis le contexte temporel quand il existe.

Exemples :
- « Une tombe, un État, un horizon · Égypte ancienne » ;
- « Voter, mais pas pour tous · Grèce classique » ;
- « Le ciel devient une preuve · Italie · début du XVIIe siècle » ;
- « Plus chaude que la planète la plus proche · Système solaire interne ».

Un garde-fou vérifie que le teaser ne contient pas directement la réponse attendue.

## UX

- aucun nouvel écran ;
- aucune étape supplémentaire dans le rituel ;
- le bloc existant est enrichi plutôt qu'empilé ;
- mise en page responsive, avec libellé + idée sur deux colonnes puis une colonne sur petit écran ;
- la logique RC52 de progression et de retour sans culpabilité est conservée.

## Validation

- 219 cours / 158 mystères ;
- 144/144 mystères non anglais produisent 3 ancrages ;
- aucun pack RC53 ajouté aux mystères anglais ;
- teasers narratifs sans fuite de la réponse ;
- bundles JS : syntaxe OK ;
- Daily Hook + changement de discipline : OK ;
- English Spiral : OK ;
- Product Loop RC52 : OK ;
- pipeline qualité complet : OK.
