# HistoDaily — RC17 Guided Expedition

Base : `v1.0-rc16-ux-clarity`.

## Objectif

Deuxième passe UX après les retours bêta : rendre l’accueil encore plus évident, supprimer les dernières surcouches au lancement d’une Expédition et réduire fortement la difficulté des premières parties.

## Accueil

- Le bloc « À continuer » redondant disparaît.
- Hiérarchie réduite à : rendez-vous du jour → progression du parcours → changement d’univers.
- Le rendez-vous du jour annonce une durée cible « 3 à 5 min ».
- Quand l’Expédition est l’étape active, le cours qui suivra est annoncé discrètement.
- Le parcours complet devient une ligne compacte avec barre de progression, au lieu d’une seconde grosse carte concurrente.

## Premier lancement

- Onboarding réduit de 3 écrans à 2.
- Le message explique directement le nouveau principe : lire → choisir parmi 3 propositions → comprendre.
- Suppression totale du panneau additionnel « Premier dossier » qui se rajoutait encore au-dessus de l’Expédition après l’onboarding.

## Expédition progressive

- 0 à 19 Expéditions résolues : réponse guidée par 3 propositions.
- 0 à 7 : distracteurs volontairement plus distincts pour apprendre la mécanique sans effet « concours ».
- 8 à 19 : les distracteurs peuvent devenir plus proches de la bonne réponse.
- À partir de 20 : réponse libre par défaut, avec bouton gratuit « Afficher 3 propositions » en cas de blocage.
- Le mode guidé ne coûte pas d’XP.
- Le premier indice reste affiché gratuitement ; seuls les indices supplémentaires réduisent le score potentiel.

## Courbe de difficulté

- Les 8 premiers rendez-vous Histoire utilisent une sélection de sujets immédiatement reconnaissables : feu, pyramides, démocratie athénienne, Napoléon, agriculture, Nil, Minoens et Révolution française.
- Jusqu’à 29 dossiers résolus, la rotation automatique évite l’expert.
- À partir de 30, les dossiers avancés peuvent entrer dans la rotation.
- Les huit premiers rendez-vous portent le libellé « découverte » dans l’interface, indépendamment de l’ancienne difficulté éditoriale du dossier.

## Compatibilité / validation

- Version applicative et assets : `1.0.0-rc.17.0`.
- Cache PWA : `histodaily-rc17-guided-v1`.
- Tous les fichiers JavaScript passent `node --check`.
- Tous les assets locaux référencés par `index.html` et le service worker existent.
- Les anciens modules `expedition-v264.js`, `expedition-delivery-v276.js` et `visual-redesign-v287.js` ne sont plus référencés.
- Le navigateur headless de l’environnement bloque les URLs locales par politique administrateur ; aucun nouveau test visuel automatisé n’est revendiqué pour cette RC.
