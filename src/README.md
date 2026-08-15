# Client source

RC27 consolide le chargement navigateur en trois bundles générés.

- `legacy-client/` conserve les sources client dans leur ordre historique validé.
- `../scripts/build-client.mjs` reconstruit les bundles sans modifier cet ordre.
- Ne pas éditer directement `bundles/*.js` : lancer `npm run build:client` après modification des sources.

Cette étape est volontairement conservatrice : elle réduit le nombre de fichiers exécutés sans réécrire le moteur métier. Les prochains refactors peuvent désormais migrer module par module depuis `legacy-client/` vers des composants plus propres sans modifier le contrat de livraison de l'application.
