# HistoDaily beta137 — mode scroll fix

Correctif ciblé après test mobile.

## Changements
- Le sélecteur de disciplines de l’accueil peut être scrollé horizontalement sans activer le mode touché.
- Un vrai tap sur Histoire, Cinéma, Économie, etc. continue de changer de mode.
- Protection contre les clics fantômes `touchend` / `pointerup` / `click` après un swipe.
- Cache PWA renouvelé en `1.0.0-beta.137`.
- Aucun changement Supabase nécessaire.

## Test rapide
1. Accueil : poser le doigt sur Cinéma/Économie et faire glisser horizontalement.
2. Vérifier que le mode ne change pas pendant le scroll.
3. Faire un vrai tap court sur un mode et vérifier qu’il s’active.
4. Tester ensuite Mystère → Indice et Classement → Profil pour vérifier que les correctifs précédents restent OK.
