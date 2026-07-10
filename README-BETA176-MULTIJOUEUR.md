# HistoDaily 1.0.0-beta.176 — réparation multijoueur

Cette version ne modifie ni les cours, ni les quiz, ni les mystères de la beta 175.

## Corrections principales

- ajout des fonctions Vercel `api/v1/index.js` et `api/v1/[...route].js` ;
- séparation du score de mystère et de l’XP totale du profil ;
- conservation du meilleur score lors d’un nouvel envoi ;
- vérification d’un code ami avant la création d’une demande ;
- refus des demandes fantômes vers un profil inexistant ;
- annulation d’une demande sans supprimer une amitié déjà acceptée ;
- traitement idempotent des acceptations et refus ;
- délai maximal de huit secondes pour les appels sociaux ;
- chargement groupé des profils d’amis afin de réduire les requêtes Supabase.

## Déploiement

Remplacer tous les fichiers de l’ancien déploiement. Conserver les variables `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` dans Vercel. Le fichier `SUPABASE-SOCIAL-SCHEMA.sql` reste compatible ; il doit avoir été appliqué au moins une fois au projet Supabase.
