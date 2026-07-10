# HistoDaily — beta 171

Cette version est une passe de stabilisation structurelle réalisée à partir de la beta 170.
Elle remplace les couches de correctifs concurrentes par des chemins d’exécution uniques.

## Corrections principales

- Correction définitive du mélange Sciences / Géographie : seuls les vrais boutons de discipline sont interactifs ; les attributs visuels présents sur `html` et `body` ne déclenchent plus de navigation.
- Normalisation du contexte d’un cours : discipline, chapitre et monde sont recalculés depuis l’identifiant réel du cours, y compris avec une ancienne sauvegarde incohérente.
- Suppression des doubles événements tactiles (`touchend`, `pointerup`, `click`) et des anciens gestionnaires de navigation superposés.
- Un seul routeur global demeure pour les actions réellement dynamiques (demandes d’amis, réparation et outils de diagnostic).
- Suppression du verrou temporel qui pouvait ignorer un second changement d’onglet pourtant volontaire.
- Fin de la boucle Profil : une requête d’amis en erreur ne relance plus indéfiniment rendu puis requête.
- Les requêtes sociales ne sont plus déclenchées à chaque rendu de Profil ou Classement.
- Suppression des contrôles réseau automatiques de diagnostic lancés quelques secondes après le démarrage ; ils restent accessibles manuellement.
- Un clic sur « Valider » dans un mystère ne peut plus soumettre deux fois la même réponse.
- Suppression d’un second rendu inutile lors d’un changement de discipline.
- Rendu initial regroupé en une seule passe après l’installation du code.

## PWA et performances

- Cache beta 171 neuf.
- Les fichiers statiques versionnés sont servis immédiatement depuis le cache, puis actualisés en arrière-plan.
- Les icônes et fichiers d’installation sont désormais précachés.
- Un fichier statique absent hors connexion ne reçoit plus par erreur le HTML de la page d’accueil.
- Versions harmonisées dans `index.html`, `app-core.js`, `app.js`, `manifest.webmanifest`, `lib/hd-api.js` et le service worker.

## Vérifications effectuées

- Syntaxe JavaScript de l’application, du service worker, des routes API et des bibliothèques.
- Validation JSON du manifeste et de la configuration Vercel.
- Navigation réelle sur les sept disciplines.
- Parcours Sciences → chapitre → cours → cours complet → quiz.
- Réparation d’une sauvegarde associant un cours de Sciences à Géographie.
- Navigation Accueil, Cours, Mystère, Classement et Profil.
- Filtres des classements jour, semaine, année et amis.
- Une réponse de quiz enregistrée une seule fois.
- Une tentative de mystère et un indice comptés une seule fois par clic.
- Profil testé avec API indisponible : aucune boucle de rendu.
- Actualisation et réparation sociales déclenchées une seule fois.
- Aucun message d’erreur JavaScript non géré pendant les scénarios automatisés.

## Déploiement

Remplacer tous les fichiers du déploiement précédent. Après mise en ligne, effectuer une actualisation forcée. Pour une PWA déjà installée, fermer complètement l’application puis la rouvrir afin que le nouveau service worker prenne le contrôle.
