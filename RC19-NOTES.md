# HistoDaily 1.0.0-rc.19.0 — Ateliers disciplinaires

## Objectif

La RC19 transforme Philosophie et Anglais en deux expériences pédagogiques distinctes au lieu de réutiliser uniquement le format cours + QCM des autres disciplines.

## Anglais — apprendre autrement qu'avec une logique de traduction

- 16 cours répartis dans 8 mondes pédagogiques.
- 14 expéditions quotidiennes reliées aux cours.
- 16 ateliers pratiques, dont 15 exploitent une phrase orale et 6 sont conçus d'abord comme exercices d'écoute.
- Travail sur le contexte, les faux amis, le registre, les références, les petits mots, les phrasal verbs, la reformulation, les connecteurs et l'implicite.
- Synthèse vocale native du navigateur/téléphone en anglais britannique, sans fichier audio externe.
- Si la synthèse vocale n'est pas disponible, les exercices audio seuls révèlent automatiquement la phrase : aucun atelier ne devient bloquant.

## Philosophie — raisonner avant de réciter

- 16 cours répartis dans 8 mondes pédagogiques.
- 14 expéditions quotidiennes reliées aux cours.
- 16 ateliers pratiques.
- Travail sur thèse/prémisses/conclusion, validité, conditions nécessaires et suffisantes, contre-exemples, objections, Socrate, stoïcisme, Descartes, Hume, cadres moraux et contrat social.
- Les auteurs servent les problèmes et les arguments ; ils ne sont pas traités comme une liste de fiches à mémoriser.

## Accueil

Pour Anglais et Philosophie, l'accueil est volontairement plus léger :

1. Expédition du jour.
2. Atelier pratique.
3. Continuer le cours.
4. Accès au parcours complet et aux fonctions secondaires.

La grosse zone de recommandations multiples n'est pas affichée dans ces deux disciplines afin de conserver la clarté gagnée lors des RC16/RC17.

## Difficulté progressive

La progression est désormais calculée par discipline :

- 0 à 3 expéditions résolues : uniquement facile ;
- 4 à 29 : facile + moyen ;
- à partir de 30 : facile + moyen + difficile ;
- les 20 premières expéditions de chaque discipline conservent le mode guidé à trois choix.

Un utilisateur très avancé en Histoire reste donc débutant lorsqu'il ouvre Anglais ou Philosophie pour la première fois.

Les ateliers appliquent aussi une rampe : facile au début, puis moyen, puis difficile selon l'expérience dans la discipline.

## Contenu et qualité

Les 16 cours initiaux et nouveaux de chaque discipline ont été harmonisés. Les anciens cours RC18 trop courts ont reçu une section d'entraînement actif au lieu d'abaisser le seuil de contrôle.

Audit RC19 :

- Anglais : 16 cours, 382 à 480 mots dans le cours complet, 5 questions par cours.
- Philosophie : 16 cours, 385 à 472 mots dans le cours complet, 5 questions par cours.
- 0 cours sous le seuil éditorial de publication.
- 0 lien d'expédition cassé.
- 0 atelier mal formé.
- 0 identifiant dupliqué dans les deux disciplines testées.

## Onboarding

Le sélecteur précise désormais la personnalité pédagogique des deux disciplines :

- Anglais : contexte, écoute, registre, reformulation et implicite, sans listes de mots à réciter.
- Philosophie : arguments, distinctions, objections et expériences de pensée avant la récitation d'auteurs.

Aucun écran d'onboarding supplémentaire n'a été ajouté.

## PWA / hors ligne

Les nouveaux bundles de contenu, d'ateliers et de profondeur éditoriale sont référencés dans `index.html` et dans le cache critique du service worker RC19.

## Contrôles effectués

- Vérification syntaxique Node de tous les fichiers JavaScript accessibles du paquet : OK.
- Vérification des références locales de `index.html` : aucune ressource manquante.
- Vérification des ressources du service worker : aucune ressource manquante.
- Cohérence de version des fichiers runtime principaux : RC19.
- Audit programmatique Anglais / Philosophie : OK.
- Tests statiques des garde-fous de difficulté, mode guidé, ateliers, synthèse vocale et fallback audio : OK.

Le rendu navigateur automatisé local n'a pas été rejoué dans cet environnement, car le navigateur headless disponible bloque les URL locales/localhost. La validation de cette RC repose donc sur les contrôles syntaxiques, structurels et fonctionnels ci-dessus.
