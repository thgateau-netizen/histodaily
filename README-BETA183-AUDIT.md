# HistoDaily 1.0.0 beta 183 — audit UX et fluidité

Cette version part de la beta 182 et ne modifie ni le format des sauvegardes, ni les scores, ni le contenu pédagogique.

## Points faibles relevés

- navigation basse à cinq entrées alors que le mystère est déjà l’action centrale de l’accueil ;
- structure HTML avec un élément `main` imbriqué dans un autre ;
- toute l’application placée dans une zone `aria-live`, ce qui pouvait faire relire un écran complet à chaque rendu ;
- cours mobiles répétant le titre, le format et les mêmes indications dans plusieurs cartes ;
- absence de repère de progression pendant une lecture longue ;
- programme quotidien encore volumineux même une fois terminé ;
- volets du profil refermés après chaque nouveau rendu ;
- transformations GPU et flous appliqués à trop d’éléments, avec un coût possible pendant le défilement.

## Corrections

- navigation principale ramenée à Accueil, Cours, Classement et Profil ;
- le mystère reste accessible immédiatement depuis l’accueil et l’onglet Accueil demeure actif sur son écran ;
- une seule région `main`, avec une zone d’annonce séparée et discrète ;
- focus clavier replacé sur le titre lors d’un vrai changement d’écran ;
- retour depuis un cours au même endroit dans la liste du chapitre ;
- brouillon de réponse au mystère conservé lors d’un rafraîchissement imprévu ;
- titres de page mis à jour dans l’onglet du navigateur ;
- onglets Express/Complet intégrés à l’en-tête du cours ;
- barre de progression de lecture ;
- résumés de format et métadonnées répétitives retirés sur mobile ;
- programme quotidien terminé automatiquement compacté, avec accès aux détails ;
- un seul volet du profil ouvert à la fois, et ce choix est mémorisé ;
- actions de progression du parcours présentées horizontalement sur mobile ;
- suppression des transformations permanentes sur les cartes ;
- flou de navigation désactivé en mode statique ou avec réduction des animations.

## Compatibilité

- stockage principal inchangé ;
- anciennes sauvegardes compatibles ;
- formulaires de réponse, de recherche, de pseudo et d’amis conservés ;
- cache PWA renouvelé sous `histodaily-beta183-audit-ux-v1`.
