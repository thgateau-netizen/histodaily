# HistoDaily beta 122 — mystery density

Passe centrée sur la densification des mystères par discipline.

# HistoDaily — paquet de déploiement beta123

Version : `1.0.0-beta.123`

Build public resserré pour test privé. Ajout des outils bêta mystères et navigation cours allégée.

## Contenu public

- 42 cours d’histoire prêts
- grands chapitres préparés pour Art, Cinéma, Sciences & inventions, Économie, Géographie et Musique
- accueil piloté par le mode actif : mystère et propositions changent selon la discipline
- profil culturel avec jeton de progression par discipline
- PWA installable
- scores locaux disponibles hors ligne
- classements et amis activables avec les variables Supabase
- validation des réponses de mystère renforcée sur mobile
- outil bêta pour actualiser le mystère du jour et tester plusieurs dossiers
- navigation des cours allégée : chapitre ouvert = liste des cours + retour

## Déploiement Vercel

Déposer le contenu du dossier sur Vercel. Les variables en ligne restent optionnelles pour l’usage local, mais nécessaires pour partager les scores entre appareils.

Variables optionnelles :

```text
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Notes beta 106

- Les modes se choisissent depuis l’accueil.
- Le mystère du jour suit la discipline active.
- Les disciplines non historiques restent volontairement légères : structure et grands chapitres d’abord, vrais cours ensuite.
- Réglages testés sans erreur avec le mode performance.


## Beta 108
- Thème couleur dynamique par discipline.
- Ajout de 5 vrais cours courts+complets+quiz : art, cinéma, sciences, économie, géographie.
- Accueil des modes non historiques : propositions de cours réels quand disponibles.


## Beta 108
- Ajout du mode Musique.
- Recentrage Art/Cinéma/Sciences sur l’histoire des œuvres, films, sciences et inventions.
- Ajout de quelques vrais cours longs : Renaissance, naissance du cinéma, Galilée, chant médiéval/polyphonie.
- Les modules de méthode restent présents mais passent en hors-série.


## Beta 109
- Ajout de 6 vrais cours longs, sans bourrage : impressionnisme, Hollywood classique, Pasteur/microbes, inflation, Mercator et naissance du jazz.
- Ajout de nouveaux mystères liés à ces domaines pour que l’accueil reste cohérent avec le mode choisi.
- Les contenus gardent la structure validée : express court, cours complet narratif, points à retenir et 5 questions vraiment tirées du texte.

## Beta 110
- Correctif ciblé sur les mystères : validation robuste, feedback visible et réponses Napoléon/Bonaparte acceptées.

## Beta 111
- Ajout d’une carte “Journal de version” sur l’accueil.
- Affichage visible de la version courante sur l’accueil.
- Préparation d’un suivi propre des nouveautés à chaque push de mise à jour.

## Beta 112
- Correctif performance mobile : mode fluide activé par défaut.
- Navigation entre onglets allégée : les simples changements d’écran ne déclenchent plus de grosse sauvegarde locale.
- Suppression des flous, animations et ombres lourdes en mode fluide.
- Le garde-fou de cohérence ne tourne plus à chaque rendu : il reste au démarrage, pas sur chaque tap.


## Beta 114

- Animations intelligentes réactivées sans flous lourds.
- Rendu cadencé avec requestAnimationFrame pour éviter plusieurs rendus lors de taps rapides.
- Trois modes : Fluide animé, Statique, Visuel.


## Beta 115

- Durcissement de l’état local au lancement.
- Ajout d’un diagnostic de stabilité dans le profil.
- Réparation douce de l’affichage sans effacer la progression lisible.
- Garde-fous contre écran vide, ancien cache et taps multiples.


## Beta 116

- Polissage de l’affichage : accueil plus hiérarchisé, cartes plus lisibles, sélecteur de disciplines mieux tenu.
- Barre de navigation flottante plus propre sur mobile.
- Cours et mystères plus confortables à lire et à utiliser sans réactiver les flous lourds.


## beta119 — mystères

- Énigmes de base durcies sans redevenir floues.
- Type recherché affiché avant les indices.
- Indices progressifs : contexte, piste, confirmation.


## beta120 — mystères des autres disciplines

- Passe faite sur les mystères hors histoire pure : Art, Cinéma, Sciences, Économie, Géographie et Musique.
- Base des énigmes durcie : le joueur sait ce qu’il cherche, mais les mots-clés évidents sont repoussés dans les indices.
- Ajout ou harmonisation des champs `subjectType`, `periodHint` et `lessonId` pour mieux afficher le type recherché et débloquer le cours lié quand il existe.
- Indices progressifs conservés : situer l’époque, trouver la piste, confirmer la réponse.


## beta123 — profondeur des mystères disciplinaires

Objectif : continuer la passe mystères au-delà de l’histoire pure.

- Art : ajout d’un mystère sur la perspective linéaire, lié au cours Renaissance.
- Économie : ajout d’un mystère sur l’offre et la demande, lié au cours marchés/prix.
- Géographie : ajout d’un mystère sur l’échelle cartographique, lié au cours lecture de cartes.
- Sciences : ajout d’un mystère sur la preuve expérimentale, lié au cours méthode scientifique.
- Les modes Art, Économie et Géographie passent à au moins deux mystères jouables.
- Les énigmes restent cadrées par type + repère, mais évitent les mots-clés trop donnés avant les indices.


## beta123 — colonne vertébrale historique

Ajout d'une passe de cours-pivots pour éviter un contenu trop centré sur le mode de vie : Uruk, Hammurabi, dynasties égyptiennes, Alexandre et les royaumes hellénistiques, César et les guerres civiles, rois nordiques, Normandie/Angleterre/Kiev, Clovis/Mérovingiens, Charlemagne/Carolingiens, Capétiens.
