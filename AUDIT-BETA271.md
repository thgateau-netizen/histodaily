# HistoDaily beta 271 — série canonique sur l’accueil

## Cause

L’accueil lisait directement `state.streak`, alors que le profil utilisait le maximum entre la valeur locale et la valeur du profil Supabase. Une synchronisation pouvait donc laisser `state.streak` à 0 tout en conservant une série correcte côté profil. De plus, la garde de progression remettait explicitement la série à 0 lorsqu’un enregistrement quotidien manquait.

## Correction

- une seule valeur canonique de série pour l’accueil, le rythme et les écrans de secours ;
- fusion monotone entre état local, profil social, dernier enregistrement quotidien et journal de progression ;
- adoption de la série serveur dans l’état local au bootstrap ;
- suppression du reset automatique à 0 en cas d’enregistrement quotidien manquant ;
- réparation rejouable sans XP, gemme ou score supplémentaire ;
- aucun changement des amis, classements ou règles de score.
