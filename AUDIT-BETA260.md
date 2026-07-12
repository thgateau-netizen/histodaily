# Audit beta 264 — consolidation générale

## Base conservée

La beta 264 part de la beta 259 validée en usage réel. Elle ne remplace ni le classement, ni le profil Orbit, ni le système de demandes d’amis, ni l’agrégation des amis à zéro point.

Les fichiers d’interface suivants sont inchangés :

- `app.css`
- `mobile-layout.css`
- `social-v2.css`
- `profile-v258.css`
- les routes explicites `api/v1/social-v2/**`
- `SUPABASE-SOCIAL-SCHEMA.sql`

## Consolidation effectuée

- version active harmonisée en `1.0.0-beta.264.0` dans l’application, le manifeste, le service worker et les réponses serveur ;
- cache PWA isolé sous `histodaily-beta264-v1` ;
- réponses API et manifeste explicitement non mis en cache par Vercel ;
- suppression du fichier dangereux et inutile `SUPABASE-SOCIAL-V2-CLEANUP.sql` du paquet de déploiement ;
- suppression des anciens rapports de beta du paquet final, qui n’étaient jamais chargés par l’application ;
- reprise du dossier quotidien au retour dans l’application et au passage de minuit sans rechargement complet ;
- invalidation des classements quotidiens lorsque leur `periodKey` ne correspond plus au jour courant ;
- sortie automatique des anciens états `loading` figés après expiration ;
- reprise sociale centralisée lors du retour en ligne, du focus et de la visibilité ;
- ancien gestionnaire de connectivité limité au renvoi des scores lorsque le moteur social V2 est actif, pour éviter deux rafraîchissements concurrents.

## Périmètre volontairement non modifié

- aucune table, fonction ou politique Supabase ;
- aucune règle de calcul des scores ;
- aucune règle d’amitié ou de demande ;
- aucun contenu de cours ou de mystère ;
- aucun style du classement ou du profil.

Aucun SQL n’est nécessaire pour cette mise à jour.
