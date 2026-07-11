# HistoDaily — beta 207 LTS

Cette version met les nouvelles fonctionnalités en pause pour consolider la base technique avant le multijoueur et une diffusion publique.

## Architecture livrée

- `index.html` : point d’entrée unique.
- `app.css` : feuille de style unique.
- `lessons-lite.js` : noyau historique des données pédagogiques.
- `app-bootstrap.js` : configuration, démarrage, icônes et illustrations.
- `app.js` : moteur principal, navigation et écrans.
- `content-library.js` : extensions éditoriales de toutes les disciplines.
- `app-runtime.js` : progression, social, recherche, mystères et classement final.
- `service-worker.js` : cache PWA beta 207 et nettoyage automatique des anciens caches HistoDaily.
- `api/` et `lib/` : backend Vercel/Supabase conservé.

## Nettoyage effectué

- Fusion des 17 imports JavaScript de l’interface en 5 fichiers chargés.
- Fusion des 3 feuilles CSS en une seule feuille statique.
- Suppression des fichiers graphiques et modules remplacés.
- Suppression des anciennes implémentations de classement au profit d’un seul rendu actif.
- Suppression des déclarations de rendu dupliquées et de plusieurs blocs historiques devenus sans effet.
- Suppression automatique des fonctions non référencées, puis vérification du démarrage après chaque passe.
- Nettoyage des règles CSS strictement dupliquées et des sélecteurs liés à des composants absents.
- Harmonisation de la version visible, du manifeste, des modules, de l’API et du cache sur `1.0.0-beta.207`.
- Conservation des adaptateurs de compatibilité encore nécessaires aux anciennes sauvegardes locales et aux données sociales déjà créées.

## Vérifications réalisées

- Syntaxe de tous les fichiers JavaScript.
- Existence de chaque ressource référencée par `index.html` et par le service worker.
- Navigation automatisée sur 24 états d’écran : accueil, catalogue, 8 disciplines, cours, mystère, quatre classements, profil et recherche.
- Aucun plantage JavaScript pendant ce parcours.
- Données chargées : 12 mondes, 106 cours et 65 mystères.
- Aucun identifiant dupliqué parmi les mondes, les cours et les mystères.
- Cache PWA configuré pour supprimer les anciens caches `histodaily-*` à l’activation.

## Limite volontaire de cette LTS

Le frontend a été consolidé sans réécrire le modèle de données ni les routes sociales. Les adaptateurs de compatibilité portant encore d’anciens noms internes restent en place lorsqu’ils protègent les sauvegardes, les demandes d’amis ou les données Supabase existantes. Leur remplacement doit se faire avec une migration de données et des tests backend réels, pas par suppression aveugle.

## Déploiement

Le dossier peut être déployé tel quel sur Vercel. Après mise en ligne, ouvrir une fois l’application avec le réseau actif afin que le service worker installe le cache beta 207. Les détails de configuration restent dans `README-VERCEL.md` et `SUPABASE-SOCIAL-SCHEMA.sql`.

## Correctif mobile 207.1

- Correction de la grille implicite du bandeau d’accueil qui comprimait le texte dans une colonne étroite.
- Bandeau d’accueil mobile repassé sur une seule colonne, sans chevauchement de l’illustration.
- Navigation basse réduite pour libérer la zone utile et respecter la safe area iOS.
- Mise en cache PWA renouvelée (`histodaily-beta207-lts-v2`) et ressources repérées `1.0.0-beta.207.1`.

## Correctif mobile 207.2
- Réserve de défilement augmentée sous les pages pour que la navigation flottante ne masque plus les derniers boutons et cartes.
- Rail des disciplines mieux terminé sur mobile, avec marge droite et défilement horizontal sans barre visible.
- Cache PWA renouvelé (`histodaily-beta207-lts-v3`) et ressources repérées `1.0.0-beta.207.2`.


## Accueil vivant 208.0

- Expédition du jour restructurée autour de la prochaine action, avec parcours en quatre étapes, progression animée et informations de durée.
- Accueil rendu plus vivant par des animations CSS légères, respectant `prefers-reduced-motion`.
- Cache PWA renouvelé (`histodaily-beta208-v1`) et ressources repérées `1.0.0-beta.208.0`.


## Parcours quotidien 209.0

- Ajout d’un indicateur d’élan du jour avec progression visuelle.
- Estimation dynamique du temps et des étapes restantes.
- Sur mobile, les quatre étapes deviennent un chemin compact en quatre jalons.
- Réduction de la hauteur totale de l’expédition sans perdre la prochaine action mise en avant.
- Cache PWA renouvelé (`histodaily-beta209-v1`) et ressources repérées `1.0.0-beta.209.0`.


## Beta 210 — accueil vivant et expédition V2

- Bandeau d’accueil dynamique : date, prochaine action, progression en quatre jalons et reprise immédiate.
- Nouveau briefing quotidien non-spoilant avec numéro de dossier, discipline et teaser.
- Parcours visuel cliquable en quatre étapes : résoudre, comprendre, relier, retenir.
- Récompense quotidienne et rythme des sept derniers jours visibles sans ouvrir le profil.
- État de fin de mission complet avec compte à rebours et ouverture d’un sujet surprise.
- Retour haptique léger sur les actions compatibles et animations désactivées avec `prefers-reduced-motion`.
- Cache PWA renouvelé (`histodaily-beta211-v1`) et ressources repérées `1.0.0-beta.211.0`.

## Beta 216 — audit éditorial et chapitre Vikings final

- Ajout d’un audit global des 106 cours, 52 mondes, quiz, mystères, Expédition, révisions et sauvegardes de progression.
- Diagnostic interne accessible par `?diagnostic=1`, `#diagnostic` ou `HistoDailyQuality.open()`, avec export JSON.
- Réparation prudente des entrées invalides de la file de révision.
- Réécriture complète des 11 cours du chapitre Vikings : Express en quatre parties, cours complets de 562 à 838 mots et cinq questions expliquées.
- Verrouillage éditorial de ces cours avec le statut `published-final` et la révision `beta216-viking-final`.
- Rapport transparent livré dans `AUDIT-BETA216.md` et `AUDIT-BETA216.json` : le chapitre Vikings atteint le standard final, tandis que l’audit identifie précisément la dette restante dans les autres disciplines.
- Cache PWA renouvelé (`histodaily-beta216-v1`) et ressources repérées `1.0.0-beta.216.0`.
