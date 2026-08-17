# HistoDaily RC54 — Central Retention Analytics

## Pourquoi cette version

RC52 rend la progression visible et RC53 augmente la valeur mémorable du rituel quotidien. La question suivante n'est plus « quelle fonctionnalité ajouter ? », mais « où les utilisateurs décrochent-ils réellement ? ».

RC54 transforme donc les signaux de rétention jusque-là locaux en mesure centralisée exploitable, sans ajouter d'écran au produit.

## Événements synchronisés

La couche RC54 synchronise uniquement une liste fermée d'événements :
- ouverture de l'app ;
- ouverture depuis une notification ;
- démarrage du dossier quotidien ;
- résolution ;
- teaser de demain vu ;
- approfondissement ouvert ;
- message de retour après absence vu ;
- onboarding terminé.

L'envoi contient l'identifiant anonyme d'installation, le jour, la discipline, les IDs dossier/cours et quelques compteurs utiles. Aucun pseudo, email ou code ami n'est envoyé par cette couche.

## Offline et fiabilité

Le journal local RC47 reste la source de secours. RC54 relit les événements non synchronisés à chaque ouverture, toutes les quelques secondes lorsque l'app est active, au retour du réseau et à la fermeture/masquage de la page.

Les écritures serveur sont idempotentes grâce à `event_id` : un même événement retransmis n'est pas compté deux fois. La file n'essaie que les 45 derniers jours d'événements, pour éviter qu'un vieux journal ne bloque les données récentes.

Si Supabase ou la table analytics n'est pas prêt, l'app continue normalement et ne marque pas les événements comme synchronisés.

## Cohortes D1 / D3 / D7

La route admin `GET /api/v1/analytics/cohorts?days=30` calcule :
- conversion première session vers démarrage du dossier ;
- conversion vers résolution ;
- conversion vers approfondissement ;
- rétention stricte D1, D3 et D7 ;
- cohortes par jour de première utilisation ;
- segmentation par première discipline pratiquée.

La lecture exige `ANALYTICS_ADMIN_TOKEN` et ne renvoie que des agrégats.

## Mise en route serveur

Deux actions sont nécessaires après déploiement du build :
1. exécuter `supabase/RC54-ANALYTICS-MIGRATION.sql` dans Supabase ;
2. définir `ANALYTICS_ADMIN_TOKEN` dans les variables d'environnement Vercel.

`/api/v1/health` expose ensuite `deployment.analyticsReady` pour confirmer que la table est accessible.

Un rapport terminal est fourni via `scripts/retention-report.mjs`.

## Validation

- 219 cours / 158 mystères : inchangés ;
- pipeline qualité complet : OK ;
- client + backend : syntaxe OK ;
- collecte allow-listée et bornée : OK ;
- stockage idempotent : OK ;
- fallback offline / table absente : OK ;
- route de cohortes protégée : OK ;
- simulation de cohortes : D1/D3/D7 vérifiés ;
- RC51 anglais, RC52 progression et RC53 valeur quotidienne : non-régression OK.
