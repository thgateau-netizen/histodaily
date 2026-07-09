# HistoDaily beta133 — discipline switch fix

Correctif ciblé après test téléphone : l'API/Supabase et le classement sont OK, mais le sélecteur Histoire / Cinéma / Économie / etc. pouvait ne plus réagir sur mobile.

## Corrections
- Délégation globale dédiée aux taps sur `[data-home-discipline]` et `[data-discipline]`.
- Chemin unique sécurisé pour changer de discipline depuis l'accueil ou depuis Cours.
- Z-index/pointer-events renforcés uniquement sur les sélecteurs de disciplines.
- Cache PWA renouvelé en `1.0.0-beta.133`.
- Aucun changement Supabase nécessaire.

## Test rapide
1. Ouvrir l'app sur téléphone.
2. Depuis Accueil, toucher Cinéma, Économie, Sciences, Musique.
3. Vérifier que le titre, le mystère et les cours proposés changent.
4. Aller dans Cours et changer aussi de discipline.
5. Vérifier que Classement reste fonctionnel.
