# HistoDaily beta166 — demandes d'amis réelles

Correctif ciblé sur l'ajout d'ami par code.

## Cause trouvée
La beta165 ajoutait l'ami localement avant l'appel serveur. La fonction d'envoi de demande voyait alors déjà la personne dans `state.friends` et annulait l'appel à `/api/v1/friends/request`. Résultat : aucune ligne dans `hd_friend_requests` dans Supabase.

## Correctifs
- L'ajout par code ne crée plus une amitié locale directe.
- Il crée une demande sortante locale, puis écrit dans Supabase `hd_friend_requests`.
- Les faux amis locaux créés par la beta165 sont convertis automatiquement en demandes sortantes.
- Le message d'erreur serveur expose maintenant l'erreur utile si Supabase refuse l'insertion.

## Test conseillé
Déployer sur les deux téléphones. Sur le téléphone de Manon : Profil > coller le code de Théo > Ajouter. Puis vérifier dans Supabase la table `hd_friend_requests`.
