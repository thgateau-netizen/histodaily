# Tests exécutés — beta 254

## Client

- syntaxe vérifiée pour tous les fichiers JavaScript ;
- chargement complet des bundles sans exception JavaScript ;
- aucun appel aux anciennes routes sociales au démarrage ;
- aucun appel aux anciennes routes après reconnexion, changement de pseudo, demande d’ami, changement de période, changement Général/Amis et actualisation manuelle ;
- changement de pseudo : une seule requête canonique depuis le formulaire social ;
- profil public en erreur : une requête unique, puis nouvelle tentative uniquement via le bouton Réessayer ;
- bouton Retirer absent pour un inconnu et présent pour un ami confirmé ;
- profil v2 sans carte historique injectée ;
- affichage du profil et du classement sans débordement horizontal à 320, 375, 390 et 430 px ;
- dernier bloc du profil accessible au-dessus de la barre de navigation fixe ;
- classement simulé Pepito + Manon, dont Manon à zéro point sur la période Amis ;
- accueil vérifié à 390 px avec les cartes Histoire et Art visibles et alignées.

## Serveur

- fusion de profil via RPC atomique ;
- changement de pseudo autorisé uniquement avec le drapeau explicite ;
- meilleur score conservé lors d’un nouvel envoi inférieur ;
- repli compare-and-swap conservant également le meilleur score ;
- refus d’ami terminal impossible à rejouer comme acceptation ;
- ami sans score conservé dans le classement Amis avec un score de zéro ;
- ressources de `index.html` et du service worker présentes ;
- versions et cache PWA cohérents en `1.0.0-beta.254.0`.

Ces tests utilisent un navigateur automatisé et un Supabase simulé. Ils ne remplacent pas la vérification finale contre les données réelles du projet Supabase de production.
