# HistoDaily RC44 — Audit complet ergonomie & qualité de l’app

## Périmètre

Cette passe porte sur **l’application**, pas sur la qualité éditoriale du contenu : ergonomie, navigation, hiérarchie, densité, mobile, états, accessibilité, performance perçue, cohérence visuelle et dette technique UI.

Les audits de contenu sont seulement rejoués en non-régression après les modifications.

## Faiblesses fortes trouvées et corrigées

### 1. Accueil : deux actions concurrentes
Tant que la boucle du jour n’était pas terminée, le hero proposait l’action principale **et** la carte « prochaine action » juste dessous. Il fallait donc choisir entre deux suites possibles.

**RC44 :** pendant Expédition → Cours → Quiz, seule l’action du parcours du jour est visible. La carte « Encore envie ? » n’apparaît qu’une fois la session terminée.

### 2. Accueil : série et niveau ressemblaient à des boutons
Les deux métriques ouvraient toutes les deux le Profil alors qu’elles ressemblent à des informations passives.

**RC44 :** elles sont maintenant de simples indicateurs. Le Profil reste accessible par la navigation principale.

### 3. Expédition : navigation basse pendant une tâche immersive
Le cours masquait la navigation principale, mais l’expédition la conservait, avec un bouton retour en haut en plus.

**RC44 :** cours **et expédition** sont désormais des flux immersifs. La navigation basse disparaît jusqu’au retour à l’accueil.

### 4. Expédition : cartes dans la carte
Le dossier contenait encore une carte « Piste gratuite » puis une carte « Solution ».

**RC44 :** la piste gratuite devient une ligne narrative avec accent latéral ; la solution est intégrée au dossier après un séparateur. Moins de bordures, moins de rayons, moins de profondeur artificielle.

### 5. Expédition : badge « À résoudre » inutile
Le contexte et le champ de réponse rendent déjà cet état évident.

**RC44 :** tant que le dossier est ouvert, seule la difficulté reste affichée. « ✓ Résolue » apparaît seulement après résolution.

### 6. Bibliothèque : progression répétée
Le sélecteur de discipline et les chapitres cumulaient pourcentage, barre et nombre de cours.

**RC44 :** les informations textuelles utilisent des comptes concrets (`4/12 cours`). La barre reste comme repère visuel, sans répéter un pourcentage à côté.

### 7. Bibliothèque : filtres inutiles sur les petits thèmes
`Tous / À faire / Terminés` apparaissait même sur des thèmes de 2–4 cours.

**RC44 :** les filtres n’apparaissent qu’à partir de 5 cours.

### 8. Lecteur : sommaire trop fréquent
Un sommaire apparaissait dès 3 sections, donc sur presque chaque cours court.

**RC44 :** le sommaire n’apparaît qu’à partir de 8 sections.

### 9. Quiz : trop de chrome avant et pendant les questions
Une carte d’introduction précédait encore la question, et « Recommencer » était visible à chaque étape à côté de l’action de progression.

**RC44 :** l’onglet Quiz arrive directement sur la question ; le reset disparaît pendant le quiz actif et reste disponible uniquement dans l’état d’échec pertinent.

### 10. Fin de quiz : pourcentage de maîtrise abstrait + trop d’actions
Le bilan pouvait montrer `60 % maîtrise`, puis Réviser, Continuer, Accueil et Refaire le quiz.

**RC44 :** le pourcentage disparaît de l’interface. Le bilan montre validation + état mémoire + **une action principale**, et au maximum une action secondaire. Si le cours appartient à l’expédition du jour, l’action principale est **« Terminer pour aujourd’hui »**.

### 11. Classement : affordances répétées
Chaque ligne disait « voir le profil » alors que toute la ligne est déjà cliquable, et le bouton d’actualisation était toujours visible malgré la synchronisation automatique.

**RC44 :** le texte redondant disparaît ; l’actualisation manuelle n’apparaît que s’il y a une erreur ou des scores en attente.

### 12. Profil : trop d’informations ouvertes d’un coup
Rythme + communauté + 11 domaines donnaient un écran très long avant les sections secondaires.

**RC44 :** le tableau principal montre le rythme, puis les **4 domaines les plus pratiqués**. Les autres sont disponibles dans « Voir les autres domaines ». La communauté reste dans « Amis et demandes », où elle a déjà sa place.

### 13. Terminologie
« Univers » était encore utilisé pour des actions de navigation où « discipline » ou « domaine » est plus immédiat.

**RC44 :** l’accueil et le premier lancement utilisent « discipline » ; le profil utilise « domaine » dans les textes fonctionnels.

### 14. Premier cache PWA
Le service worker préchargeait encore plusieurs anciennes illustrations conservées pour des couches historiques.

**RC44 :** elles restent dans le paquet par sécurité de compatibilité, mais ne sont plus téléchargées au premier cache.

## Contrôles produit RC44

Le nouvel audit `npm run ergonomics:audit` vérifie **30 critères** : action principale, immersion, désempilement, catalogue, lecteur, quiz, classement, profil, touch targets, safe areas iOS, focus clavier, reduced motion, onboarding, états réseau, version et cache.

Résultat : **30/30 contrôles fonctionnels/structurels passés**.

## Dette technique volontairement non masquée

La passe a aussi mesuré la dette UI au lieu de la déclarer « parfaite » :

- CSS : ~782 kB, **11 449 lignes**
- `!important` : **2 866**
- `box-shadow` : 417
- `border-radius` : 1 066
- `z-index` : 197
- `@media` : 246
- 58 fichiers sources historiques concaténés dans les 3 bundles
- CSS + JS initial : ~5.14 MB bruts / **~1.27 MB gzip**

Ce n’est pas une raison pour supprimer brutalement les anciennes couches : sans validation visuelle navigateur fiable, ce serait risqué. La prochaine passe structurelle devra consolider progressivement le CSS et les anciens modules avec des tests visuels réels.

## Validation

- `npm run build:client` : OK
- `npm run check:client` : OK
- `npm run quality:check` : OK
- `npm run ergonomics:audit` : 30/30, avec 2 avertissements de dette structurelle documentés
- test HTTP local : index, CSS, 3 bundles et asset hero → HTTP 200
- aucun audit éditorial n’a été utilisé pour décider des corrections UX

### Limite de validation visuelle
Chromium est présent dans l’environnement mais les navigations locales (`127.0.0.1` et `file://`) sont bloquées par une politique d’administration (`ERR_BLOCKED_BY_ADMINISTRATOR`). **Aucune validation pixel-perfect automatisée n’est donc revendiquée.**
