# BETA 196 — Score du classement cohérent

## Bug corrigé
Le résumé affichait le score local réel de la période, tandis que la ligne personnelle du classement pouvait conserver un ancien score serveur plus élevé.

Exemple observé :
- résumé du jour : 270 points
- ligne Pepito : 500 points

## Cause
Une ancienne version envoyait parfois l'XP totale du profil comme score de mystère. Le serveur conservait ensuite systématiquement la valeur la plus élevée, même lorsqu'un score correct plus faible était renvoyé.

## Corrections
- la ligne personnelle utilise exactement le même total que le résumé
- les scores de plusieurs mystères résolus dans la même période sont additionnés
- les doublons d'un même mystère ne sont pas recomptés
- chaque score est plafonné au maximum réellement possible selon la difficulté
- les anciennes valeurs impossibles sont écrasées lors de la prochaine synchronisation
- l'ouverture du classement resynchronise automatiquement les mystères locaux de la période

## Test
Un scénario avec une ancienne ligne corrompue à 500 points et deux mystères valides a été testé : le total obtenu est désormais 270 points.
