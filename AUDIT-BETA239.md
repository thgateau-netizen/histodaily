# HistoDaily beta 239 — audit de cohérence éditoriale

## Objectif

Remettre les cours dans la logique fondamentale de l’application :

1. **Problème** : une question ou une situation précise à résoudre.
2. **Cours** : un raisonnement ordonné qui explique la réponse.
3. **Révision** : cinq questions directement reliées au cours.

## Nettoyage global

- 110 packs de contenu additionnels analysés et normalisés après leur chargement.
- Chaque pack dispose désormais d’un **fil du cours** comportant au moins trois idées complètes et contextualisées.
- Les anciens « repères clés » qui recopiaient parfois mot pour mot les réponses du quiz ont été supprimés.
- Les sections numérotées sont remises dans leur ordre éditorial.
- Les cours d’un même chapitre sont triés selon leur ordre prévu.
- Les mondes d’une discipline sont triés chronologiquement ou selon leur ordre éditorial.
- Audit obtenu : **0 fil incomplet**, **0 section numérotée désordonnée**, **0 copie exacte d’une réponse de quiz dans les repères**.

## Réparations manuelles

### Mort des étoiles

Le cours `astro-stellar-deaths` a été entièrement réécrit autour d’une question claire : pourquoi le Soleil devient-il une naine blanche alors qu’une étoile massive peut finir en étoile à neutrons ou en trou noir ?

Le nouveau plan suit la causalité :

- masse initiale ;
- fin du Soleil ;
- formation du cœur de fer et supernova ;
- étoile à neutrons, pulsar ou trou noir ;
- observations permettant d’identifier le reste.

La version complète contient environ 470 mots et remplace le dernier bloc générique par des méthodes d’observation concrètes.

### Liens problème-cours réparés

- **Muqarnas** : le terme et son rôle architectural apparaissent désormais dans le cours sur les arts islamiques.
- **Antibiogramme** : la méthode est expliquée dans le cours sur les antibiotiques et la résistance.
- **Quantum** : la notion de quantum d’énergie est explicitement définie et le mystère utilise une réponse plus précise.
- **Conteneurisation** : la notion est définie dès l’express et reliée à la standardisation et à l’intermodalité.
- **Breakbeat** : le terme est défini dans le cours sur la naissance du hip-hop.
- **Mort des étoiles** : le cours général est réorganisé pour ne plus ressembler à une liste de réponses isolées.

## Astronomie

- 13 derniers blocs génériques « Comment les astronomes tranchent » remplacés par des sections propres au sujet : activité solaire, formation du Système solaire, planètes rocheuses, géantes, lunes océans, petits corps, impacts, exoplanètes, biosignatures, spectres, télescopes spatiaux, orbites et exploration.
- Les 20 anciens cours astronomiques disposent désormais de trois approfondissements spécifiques au sujet.
- Aucun approfondissement générique « À ne pas confondre / Méthode / Échelle » ne subsiste dans ces cours.

## Contrôles techniques

- Syntaxe JavaScript validée pour les fichiers principaux et le nouveau correctif éditorial.
- `content-coherence-239.js` est chargé après tous les packs de contenu et inclus dans le cache PWA.
- Version, cache et requêtes d’assets alignés sur `1.0.0-beta.239.0`.
- Les cinq anciens identifiants de cours de base signalés comme absents dans le bac à sable sont bien présents dans `app.js` et seront disponibles dans l’application réelle.

Le rendu navigateur n’a pas pu être capturé dans l’environnement de test local, bloqué par la politique réseau du navigateur. Les contrôles réalisés portent donc sur la syntaxe, le chargement des données, les liens de contenu et les audits automatisés.
