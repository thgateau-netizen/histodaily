# HistoDaily RC26 — Coherence Pass

## Diagnostic produit

La RC25 n'avait plus un problème de fonctionnalités manquantes mais de cohérence : les écrans les plus récents étaient nettement plus aboutis que les écrans hérités, seules quatre disciplines disposaient d'un vrai traitement illustré, et les cours/expéditions conservaient encore plusieurs couches d'information redondantes.

## Axes prioritaires appliqués

### 1. Couverture visuelle complète
- Histoire, Astronomie, Philosophie et Anglais conservent leurs illustrations existantes.
- Ajout d'illustrations vectorielles éditoriales pour Art, Cinéma, Sciences & inventions, Économie, Géographie, Musique et Littérature.
- Les 11 disciplines disposent désormais d'un visuel sur l'accueil premium.
- Le même langage visuel est repris dans les expéditions, les en-têtes de cours et les sélecteurs d'univers.
- Les nouveaux SVG sont légers et inclus dans le cache PWA.

### 2. Expédition plus directe
- Le bloc « Dossier » de RC25 est conservé.
- La zone « Choisis la réponse / Ta réponse » devient un simple repère « À toi ».
- Les choix ou le champ de réponse arrivent immédiatement après le dossier.
- Mode guidé, réponse libre, indices supplémentaires et règle de score sont regroupés derrière un seul volet « Besoin d'un coup de pouce ? ».
- La piste gratuite reste visible dans le dossier : aucune aide indispensable n'est cachée.

### 3. Cours moins empilés
- Suppression dans le cœur du lecteur de la grosse carte « Choisis ton format » répétant les onglets déjà présents dans l'en-tête.
- Introduction réduite à une seule idée centrale.
- Express : idée centrale → repères → 3 idées → action suivante.
- Complet : idée centrale → repères → lecture → synthèse → quiz.
- Quiz : les panneaux d'explication redondants sont réduits ; le runner question par question existant reste compatible.
- Les interactions Anglais/Philo RC20 restent injectées dans le flux de lecture.

### 4. Finition cohérente
- Rayons, surfaces, boutons secondaires et hiérarchie typographique harmonisés.
- Textes du rituel quotidien raccourcis après résolution de l'expédition.
- Les contrôles secondaires sont plus silencieux pour garder le contenu au premier plan.

## Validation
- 60 fichiers JavaScript contrôlés par `node --check` : 0 erreur.
- Tous les assets référencés par CSS et le service worker existent.
- 11/11 disciplines ont un asset de hero.
- Le cache PWA est versionné `histodaily-rc26-coherence-v1`.
- Version package/manifest/bootstrap : `1.0.0-rc.26.0`.
