# HistoDaily beta 257 — Profil Orbit

## Périmètre

Cette version repart de la beta 255 dont les routes sociales explicites fonctionnent. Les fichiers API, le schéma Supabase et le moteur serveur sont conservés octet pour octet.

## Profil reconstruit

- En-tête joueur compact : niveau, XP, série, dossiers et progression vers le niveau suivant.
- Système solaire de curiosité calculé à partir des cours réellement validés.
- Affinités principales et accès direct aux parcours correspondants.
- Rythme des sept derniers jours.
- Bloc communauté compact avec amis, demandes et meilleur rang déjà chargé.
- Progression réelle des huit domaines.
- Collections, succès, identité, amis, sauvegarde et réglages conservés.
- Sections techniques regroupées dans deux volets pour ne plus écraser le contenu intéressant.

## Isolation technique

- Nouveau style isolé dans `profile-v257.css` avec le préfixe `hd257-`.
- Aucun changement dans `api/`, `lib/hd-social-v2.js`, `vercel.json` ou les fichiers SQL.
- Aucun script Supabase à exécuter pour cette version.
- Cache PWA porté à `histodaily-beta257-v1`.

## Vérifications

- Syntaxe JavaScript validée pour les fichiers modifiés.
- Toutes les ressources référencées par `index.html` et le service worker existent.
- Rendu inspecté à 320, 390 et 430 px.
- Aucun débordement horizontal de page aux trois largeurs.
- Les anciennes cartes de profil injectées restent neutralisées.
