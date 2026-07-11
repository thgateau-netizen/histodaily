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
