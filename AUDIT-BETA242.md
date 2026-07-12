# HistoDaily beta 244 — fiabilité, classement et amis

## Objectif

Cette version ne rajoute pas de contenu. Elle renforce les fonctions qui doivent rester fiables entre deux ouvertures, pendant une coupure réseau et après une mise à jour de la PWA.

## Sauvegarde locale

- Écriture transactionnelle avec copie temporaire, vérification JSON, sauvegarde précédente et instantané.
- Au démarrage, sélection automatique de la copie valide la plus récente.
- Instantané social séparé pour conserver l'identité, les amis, les demandes et les envois en attente.
- Identifiant joueur et code ami stables pendant toute la session, même lorsque le stockage du navigateur est temporairement indisponible.
- Sauvegarde renforcée lors de la mise en arrière-plan, de la fermeture de page et du retour en ligne.

## Réseau et PWA

- Navigation PWA en stratégie réseau d'abord, avec repli sur le cache après délai court.
- Mise à jour explicite du service worker et activation contrôlée de la nouvelle version.
- Rechargement unique après changement de service worker afin d'éviter les mélanges de fichiers entre deux versions.
- Requêtes Supabase limitées dans le temps, avec annulation et nouvelle tentative uniquement lorsque l'erreur peut être transitoire.
- Les erreurs techniques brutes ne sont plus affichées à l'utilisateur.

## Classement

- Quatre onglets fixes : Aujourd'hui, Semaine, Année et Amis.
- Géométrie de la navigation inférieure figée pour éviter les sauts d'onglets.
- Bornes de semaine et d'année calculées dans le fuseau local du joueur puis transmises à l'API.
- Déduplication des scores par joueur, période et mystère.
- Un joueur n'est plus ajouté deux fois lorsque son profil est reconnu à la fois par son identifiant et son code ami.
- Les égalités partagent le même rang.
- Les dernières données reçues restent visibles hors ligne ou en cas de panne momentanée.
- Les scores non envoyés sont conservés dans une file d'attente et renvoyés au retour du réseau.

## Amis

- L'ajout direct est remplacé par une vraie demande d'ami.
- États distincts : reçue, envoyée, acceptée, refusée ou annulée.
- Seuls les amis acceptés apparaissent dans la liste et le classement Amis.
- Annulation d'une demande envoyée, acceptation ou refus d'une demande reçue.
- Conservation locale des demandes et nouvelle tentative automatique après une coupure réseau.
- Synchronisation des profils par identifiant joueur et code ami pour limiter les profils fantômes.

## Contrôles effectués

- Contrôle de syntaxe de `app.js`, `app-bootstrap.js`, `app-runtime.js`, `service-worker.js`, `lib/hd-api.js` et `lib/hd-supabase.js`.
- Test navigateur mobile : quatre onglets inférieurs, quatre périodes de classement, formulaire d'ajout d'ami et code ami stable après changement d'onglet.
- Aucun message d'erreur JavaScript pendant ce parcours.
- Tests API locaux réussis pour l'index, la santé, le classement, la synchronisation des amis, les demandes et le contrôle de mise en production.
- Vérification de la présence de tous les fichiers de contenu dans le cache du service worker.

## Limite connue

Sans variables Supabase et tables sociales configurées, l'application fonctionne en mode local : sauvegarde, files d'attente et affichage de repli restent opérationnels, mais le classement partagé et les amis entre plusieurs appareils ne peuvent pas réellement se synchroniser. Le fichier `SUPABASE-SOCIAL-SCHEMA.sql` inclus contient la migration additive nécessaire.
