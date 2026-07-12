# HistoDaily beta 246 — audit multi et amis

## Défaut critique corrigé

La suppression d’un ami effaçait les lignes `hd_friends`, mais la demande d’ami historique restait au statut `accepted`. Le mécanisme de réparation serveur recréait alors automatiquement la relation au prochain rafraîchissement.

La route `DELETE /api/v1/friends/sync` ferme désormais toutes les demandes acceptées correspondant à la paire (`accepted` → `cancelled`) avant de supprimer les deux lignes réciproques.

## Robustesse client

- File persistante pour les acceptations, refus et suppressions hors ligne.
- Retry exponentiel et mutations idempotentes.
- Utilisation du `requestId` pour répondre à la bonne demande.
- Verrou anti double-clic.
- Tombstone locale pendant une suppression pour éviter la réapparition visuelle avant confirmation serveur.
- Invalidation des caches `friends:daily`, `friends:week` et `friends:year` après toute modification de relation.
- Conservation du dernier classement connu en cas de panne réseau.

## Garanties supplémentaires

- Les mutations en attente sont exécutées dans l’ordre chronologique (FIFO), afin qu’une suppression ne puisse pas passer avant une acceptation plus ancienne.
- La suppression serveur suit une séquence vérifiée au niveau applicatif : les demandes acceptées sont recherchées directement dans les deux sens, neutralisées, puis contrôlées avant la suppression des lignes `hd_friends`.
- En cas d’échec de cette neutralisation, les lignes d’amis ne sont pas supprimées et l’opération reste dans la file de retry.

## Vérifications réalisées

- Syntaxe validée pour l’ensemble des fichiers JavaScript avec `node --check`.
- Test serveur de suppression réussie : demande acceptée neutralisée, puis suppression réciproque des deux lignes d’amis.
- Test serveur de panne : si la neutralisation échoue, aucune ligne d’ami n’est supprimée et la réponse reste retentable.
- Test de vérification après suppression : une ligne qui subsiste empêche tout faux message de réussite.
- Test client hors ligne : suppression masquée immédiatement, mutation persistée, `requestId` conservé, doublons bloqués et caches Amis invalidés.
- Test du classement Amis paginé : un score situé après la première page de 1 000 lignes reste présent.
- Contrôle des références de `index.html` et du service worker : aucun fichier statique manquant.

Ces tests utilisent des simulations locales de l’API Supabase ; le déploiement réel devra encore être validé avec les variables Vercel et la base de production.

## Classement Amis à l’échelle

L’ancienne lecture chargeait d’abord un nombre limité de scores globaux, puis filtrait les amis. Dès que la table grandissait, un ami moins bien classé pouvait donc disparaître du classement. La requête est maintenant filtrée côté Supabase sur les seuls participants acceptés, découpée en petits groupes et paginée. Les amis à zéro restent ajoutés ensuite par la fusion des profils.

## Suppression réciproque vérifiée

Les suppressions des lignes `hd_friends` ne masquent plus les erreurs réseau. Les deux directions sont effacées sans `catch` silencieux, puis relues. Si une ligne subsiste, l’API renvoie un état retentable et le client conserve la mutation dans sa file au lieu d’annoncer à tort une réussite.
