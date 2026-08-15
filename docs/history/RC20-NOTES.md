# HistoDaily — RC20 · Cours interactifs

## Objectif

Transformer les cours Anglais et Philosophie en séquences actives, sans réintroduire la surcharge d’interface corrigée en RC16/RC17. Le quiz final reste un bilan, mais l’apprentissage n’attend plus la fin du cours pour demander à l’utilisateur de réfléchir.

## Nouveau déroulé

### Cours Express
- conserve la lecture courte ;
- ajoute un **Défi express** contextualisé avant la suite ;
- feedback immédiat, sans note et sans pénalité.

### Cours complet
Deux pauses sont injectées au milieu des blocs de lecture :

1. **Pause active — mini-défi**
   - 3 propositions ;
   - feedback spécifique pour chaque réponse ;
   - possibilité de réessayer jusqu’à comprendre ;
   - en anglais, bouton d’écoute quand une phrase naturelle est disponible.

2. **Rappel actif — “Dis-le avec tes mots”**
   - zone de formulation libre ;
   - aucune correction automatique artificielle ;
   - comparaison avec une formulation possible seulement après avoir écrit ;
   - l’objectif est l’auto-vérification du raisonnement, pas la chasse au mot exact.

Le quiz final reste ensuite la synthèse en 5 questions.

## Anglais
- 16/16 cours couverts ;
- 15/16 mini-défis avec synthèse vocale anglaise ;
- travail de contexte, registre, implicite, phrasal verbs, faux amis, connecteurs et clarification ;
- la compréhension et la reformulation sont prioritaires sur la traduction mot à mot ;
- si la synthèse vocale n’est pas disponible, la phrase reste accessible dans le contexte de l’exercice.

## Philosophie
- 16/16 cours couverts ;
- mini-défis centrés sur argument, prémisse/conclusion, objection, contre-exemple, nécessaire/suffisant, fait/valeur, stoïcisme, Descartes, Hume, éthique et contrat social ;
- le rappel libre demande de reformuler sans réciter le nom de l’auteur.

## Progression et UX
- 2 pauses actives par cours complet, avec indicateur 0/2 → 2/2 ;
- progression mémorisée localement ;
- aucun XP attribué aux pauses afin d’éviter le farming ;
- une mauvaise réponse ne bloque pas le cours ;
- les textes saisis dans le rappel libre ne sont pas conservés : seule la validation de la pause est mémorisée ;
- styles mobiles dédiés, zones tactiles larges et feedback `aria-live`.

## Validation
- 42 fichiers JavaScript vérifiés avec `node --check` : 0 erreur ;
- 32/32 cours Anglais/Philo mappés ;
- 32/32 références d’ateliers valides ;
- chaque mini-défi : au moins 3 choix, exactement 1 bonne réponse, feedback et takeaway ;
- 58 assets locaux du service worker contrôlés : 0 manquant ;
- module RC20 présent dans `index.html` et dans le cache PWA.

## Limite du contrôle dans cet environnement
Le rendu navigateur automatisé n’a pas été retenu comme validation de référence ici : Chromium headless ne termine pas proprement sur l’application locale dans cet environnement. La RC20 a donc été validée par contrôles syntaxiques, structurels et de cohérence des données/ressources.
