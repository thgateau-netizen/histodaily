# HistoDaily beta134 — profile tap fix

Correctif ciblé après test téléphone : le classement fonctionne et les disciplines se changent bien, mais le tap sur un joueur du classement pouvait ne plus ouvrir sa fiche profil.

## Corrections
- Délégation globale dédiée aux taps sur les lignes du classement `[data-view-profile]`.
- Ouverture de fiche joueur indépendante des écouteurs posés après rendu.
- Comparaison de profils plus robuste entre `player_id`, `id`, code ami et valeurs numériques/string.
- Ligne de classement explicitement cliquable en `type="button"`.
- Bouton “Demander en ami” sécurisé par la même délégation globale.
- Z-index/pointer-events renforcés uniquement sur les lignes de classement et cartes profil.
- Cache PWA renouvelé en `1.0.0-beta.134`.
- Aucun changement Supabase nécessaire.

## Test rapide
1. Ouvrir le classement du jour.
2. Toucher un autre joueur.
3. Vérifier que sa fiche profil s’ouvre.
4. Toucher “Demander en ami”.
5. Vérifier sur l’autre appareil que la demande apparaît.
6. Revenir au classement puis changer d’onglet et de discipline.
