# Audit beta 254 — debug réel du moteur social

## Problèmes réellement trouvés dans la beta 253

Le fichier `social-v2.js` existait, mais le multi n’était pas encore réellement isolé :

- l’outbox des scores pouvait encore entrer par l’ancien chemin `/api/v1/leaderboard/submit` ;
- plusieurs closures et listeners historiques continuaient à demander profils, amis et classements ;
- deux systèmes concurrents pouvaient donc modifier les mêmes états ;
- le profil social v2 recevait après son rendu une ancienne carte « Profil de curiosité » injectée par un `MutationObserver` ;
- le résumé du profil pouvait afficher `0 dossier` alors que le serveur en connaissait plusieurs ;
- l’enregistrement du pseudo conservait une référence d’état devenue obsolète et pouvait perdre son message de résultat ;
- un profil public en erreur relançait sa requête à chaque rendu ;
- une demande refusée pouvait être rejouée comme acceptée ;
- l’upsert du meilleur score n’était pas atomique en cas d’écritures simultanées ;
- plusieurs listeners de reconnexion pouvaient lancer des rafales de requêtes v2 identiques.

## Corrections beta 254

- drapeau `HD_SOCIAL_V2_ONLY` posé avant le chargement des anciens bundles ;
- anciens appels réseau sociaux neutralisés avant leur première exécution ;
- outbox entièrement redirigée vers `/api/v1/social-v2/score` ;
- tous les anciens points d’entrée encore appelables redirigés vers un seul moteur v2 ;
- déduplication des actualisations concurrentes par contexte période/audience ;
- sauvegarde du pseudo ramenée à une seule fusion canonique et résultat serveur vérifié ;
- profil social protégé contre les injecteurs visuels historiques ;
- compteurs du profil calculés avec le maximum entre la copie locale et le profil canonique ;
- récupération des scores locaux effectuée après adoption de l’identité canonique ;
- fusion des profils via `hd_merge_profile`, avec repli compare-and-swap ;
- meilleur score via `hd_upsert_best_score`, avec repli conditionnel et relecture ;
- décisions d’amis terminales : un refus ne peut plus devenir une acceptation par rejeu ;
- création réciproque des relations d’amitié vérifiée côté serveur ;
- profils publics : erreur stable, bouton de réessai manuel, aucune boucle réseau ;
- bouton « Retirer des amis » affiché uniquement pour un ami réellement confirmé ;
- cache PWA distinct `histodaily-beta254-v1`.

## Limite volontaire

L’identité reste fondée sur le `playerId` et le code ami fournis par le client. Cette beta fiabilise la cohérence fonctionnelle, mais ne remplace pas une future authentification Supabase Auth.
