# HistoDaily — beta164 quiz flow + stabilité

Correctif ciblé sur le flux de quiz et la performance perçue.

## Changements

- Le quiz n'affiche plus une liste de 5 questions.
- Une seule question est rendue à la fois, avec correction immédiate puis bouton Continuer.
- Les clics sur les réponses sont gérés par délégation globale, donc plus robustes après un re-render ou un changement d'onglet.
- Le reset du quiz remet aussi à zéro l'étape courante.
- Le rendu du quiz charge beaucoup moins de DOM que l'ancienne liste complète.
- Le cache PWA passe en beta164.

## À tester

1. Ouvrir un cours.
2. Aller au quiz.
3. Cliquer une réponse sur chaque question.
4. Continuer jusqu'au bilan.
5. Vérifier validation, XP, classement, puis retour.
