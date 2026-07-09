# HistoDaily beta136 — hint tap fix

Correctif ciblé après test mobile.

## Changements
- Correction du bouton Indice dans le mystère : demander un indice ne déclenche plus un changement d’onglet.
- Le tap sur Indice est traité avant la navigation globale et bloque les doubles événements mobile.
- Les boutons de réponse/indice du mystère sont mieux isolés de la barre de navigation.
- Cache PWA renouvelé en `1.0.0-beta.136`.
- Aucun changement Supabase nécessaire.

## Test rapide
1. Ouvrir un mystère non résolu.
2. Appuyer sur Indice.
3. Vérifier que l’indice apparaît sans quitter l’écran Mystère.
4. Valider une réponse puis vérifier que Classement/Profil marchent toujours.
