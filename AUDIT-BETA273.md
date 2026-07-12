# Audit HistoDaily beta 273 — profils depuis le classement

## Objectif

Permettre d’ouvrir un profil public depuis une ligne du classement et de gérer la relation d’amitié sans recopier le code ami.

## Fonctionnalités ajoutées

- Toutes les lignes du classement sont cliquables, y compris la ligne du joueur connecté.
- Une ligne personnelle ouvre le profil complet local.
- Une autre ligne ouvre un profil public limité : pseudo, niveau, XP, série, dossiers résolus, scores et rangs jour/semaine/année.
- Le code ami et l’adresse électronique ne sont pas affichés dans le profil public.
- Le code ami n’est plus renvoyé par la route de profil public.
- Le bouton social reflète l’état réel :
  - Ajouter en ami ;
  - Demande envoyée ;
  - Accepter la demande ;
  - Vous êtes amis.
- Les demandes issues d’un profil utilisent d’abord le `playerId` Supabase.
- Le code ami reste disponible comme méthode manuelle et comme repli de réconciliation.
- Les demandes croisées sont automatiquement acceptées par le serveur existant.
- Après ajout, acceptation ou suppression, le classement Amis est actualisé immédiatement.
- Le profil public reste défilable sur Android.

## Robustesse

- Un double appui sur « Ajouter en ami » est bloqué côté client pendant la requête.
- Le serveur conserve sa logique idempotente pour les demandes déjà envoyées, croisées ou déjà acceptées.
- Une relation reconnue par identifiant ou par code est affichée avec le même état.
- Les anciens profils publics en cache sont invalidés lors du passage à la beta 273.
- La route serveur accepte un identifiant joueur, un code ami, ou un identifiant contenant exceptionnellement un ancien code.

## Non-régression

Les fichiers suivants sont strictement identiques à la beta 272 :

- `app.js`
- `streak-v265.js`
- `engagement-v263.js`
- `expedition-v264.js`
- `archive-mobile-v268.js`
- `course-mobile-v269.js`
- `mystery-clarity-v272.js`

La série, les récompenses, le moteur de score et le contenu des mystères n’ont pas été modifiés.

## Base de données

Aucune migration SQL n’est nécessaire. La version utilise les tables déjà présentes : `hd_profiles`, `hd_friend_requests`, `hd_friends` et `hd_scores`.
