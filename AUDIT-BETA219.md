# HistoDaily — audit beta 219

## Objet

Refonte visuelle V2 centrée sur la clarté, la hiérarchie et la sensation d’application mobile native, sans ajouter d’animation ou de dépendance lourde.

## Accueil

- Les disciplines restent visibles et pilotent immédiatement le contenu proposé.
- Nouveau bandeau d’ouverture plus compact : salutation, série et niveau.
- L’expédition du jour devient le seul héros visuel de la page.
- Étapes Résoudre → Comprendre → Relier → Retenir conservées dans une frise simplifiée.
- Progression de la discipline isolée dans un module court.
- Reprise et découverte limitées à une carte chacune.
- Boutons harmonisés et textes secondaires raccourcis.

## Profil

- Profil joueur placé avant le profil de curiosité.
- Niveau et XP regroupés dans une jauge dédiée.
- Profil de curiosité réorganisé en une affinité principale et deux repères compacts.
- Collections transformées en grille de médailles à deux colonnes ; aucun découpage forcé des mots.
- Maîtrise limitée aux quatre premiers domaines par défaut, avec ouverture volontaire.
- Succès transformés en jetons compacts à trois colonnes.
- Sections sociales et réglages restent repliées pour ne pas encombrer la page.

## Performance

- Aucun framework, image distante ou bibliothèque supplémentaire.
- Pas d’animation permanente.
- Transitions limitées à `transform`, `filter` et largeur de jauge.
- `backdrop-filter` supprimé des cartes principales du profil.
- Mode `prefers-reduced-motion` pris en charge.

## Vérifications réalisées

- Analyse syntaxique JavaScript avec `node --check`.
- Rendu Chromium aux largeurs 320, 360, 390 et 430 px.
- Aucun débordement horizontal détecté.
- Changement de discipline vérifié.
- Ouverture/réduction de la maîtrise vérifiée.
- Aucun `pageerror` pendant les tests de rendu.
- Version et cache PWA incrémentés en `1.0.0-beta.219.0`.
