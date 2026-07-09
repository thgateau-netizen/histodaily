# HistoDaily beta160 — correctif général profil / amis / stabilité

Cette version repart de la base beta156 et ajoute un correctif général ciblé, sans reprendre les optimisations JS expérimentales des beta157–159.

## Correctifs

- Pseudo sauvegardé dans une clé dédiée `histodaily_state_profile_v3`, en plus du gros état local.
- Restauration automatique du pseudo si le gros état revient à `Invité` après cache/PWA.
- Bouton `Enregistrer` du profil capturé par un gestionnaire global, plus robuste sur mobile.
- Nettoyage des demandes d’amis sortantes/entrantes quand la personne est déjà amie.
- Acceptation d’une demande : ajout local immédiat de l’ami avant la réponse serveur.
- Normalisation de `friends` si l’état local a été transformé en tableau ou en format mixte.
- Fenêtre de secours remplacée par une version avec boutons capturés globalement.
- Écran vide détecté plus tardivement pour éviter les faux positifs au changement d’onglet.

## Déploiement conseillé

Déployer le zip complet, puis fermer/réouvrir la PWA sur iPhone. Si un vieux service worker reste en mémoire, un deuxième lancement peut être nécessaire.
