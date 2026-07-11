# HistoDaily — audit beta 222

## Refonte intégrée

- Accueil reconstruit autour de la maquette Visual V4 validée.
- Sélecteur de disciplines conservé et rendu horizontal, compact et premium.
- La discipline active est automatiquement recentrée dans le rail après chaque changement.
- Suppression du nom de discipline détaché à droite du titre « Ton univers » : l’état actif est maintenant visible directement dans la carte sélectionnée.
- Illustrations SVG dédiées à Histoire, Art, Cinéma, Sciences & inventions, Économie, Géographie et Musique.
- L’illustration cinéma représente uniquement une caméra, des bobines et un clap ; aucun motif abstrait ou hors sujet.
- Les illustrations sont contenues dans leur zone et utilisent un viewBox stable : elles ne débordent plus et ne sont plus coupées par un masque.
- Carte du dossier du jour rapprochée de la maquette validée : titre fort, illustration à droite, bouton principal large, progression en quatre étapes.
- Cartes « Prochaines escales » compactées en grille au lieu d’un rail tronqué.
- Navigation basse affinée et séparée du contenu.

## Performance

- Aucun framework ou paquet ajouté.
- Aucun PNG distant ni image lourde ajouté à l’application.
- Illustrations vectorielles intégrées au HTML, sans animation permanente.
- Les seules transitions sont courtes et déclenchées par interaction.

## Vérifications

- Syntaxe JavaScript vérifiée avec `node --check`.
- CSS analysé sans erreur de parsing.
- JSON du manifeste et de Vercel validé.
- Toutes les ressources référencées par `index.html` et le service worker existent.
- Version applicative, cache PWA et assets alignés sur `1.0.0-beta.222.0`.
