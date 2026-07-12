# Tests HistoDaily beta 273

## Tests exécutés

- Vérification de syntaxe Node sur les 40 fichiers JavaScript : réussie.
- Contrôle des 44 ressources du service worker : aucune ressource manquante.
- Comparaison SHA-256 des moteurs critiques avec la beta 272 : tous inchangés.
- Test des états de relation client : soi-même, ami, demande reçue, demande envoyée et aucune relation.
- Test serveur simulé d’une demande envoyée directement avec `targetPlayerId`, sans saisie de code : réussi.
- Vérification de la présence des quatre états de bouton dans le profil public.
- Vérification qu’une ligne personnelle du classement n’est plus désactivée.
- Vérification que le profil public renvoie les scores et rangs des trois périodes sans exposer le code ami.
- Vérification des versions et du cache PWA beta 273.

## Test visuel automatisé

Une tentative de capture Chromium de l’application complète a expiré dans l’environnement de test à cause du navigateur système. Aucun résultat visuel automatisé n’est donc revendiqué. Les styles ont été contrôlés statiquement et le défilement Android est explicitement préservé dans la feuille beta 273.

## Test réel recommandé après déploiement

1. Ouvrir le classement Général.
2. Toucher un autre joueur puis envoyer une demande.
3. Vérifier l’état « Demande envoyée ».
4. Sur l’autre téléphone, ouvrir le même profil ou l’onglet Amis et accepter.
5. Vérifier que les deux joueurs apparaissent dans le classement Amis, même avec 0 point.
6. Toucher sa propre ligne et vérifier qu’elle ouvre le profil personnel.
