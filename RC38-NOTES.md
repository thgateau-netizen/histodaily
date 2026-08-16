# HistoDaily RC38 — Philosophy Reasoning Rework

## Pourquoi
La philosophie restait trop proche du moule « fiche de connaissances + QCM ». Les contenus conceptuels étaient utiles, mais de nombreuses questions pouvaient être gagnées par élimination de distracteurs absurdes, et plusieurs ateliers étaient réutilisés entre deux cours.

## Nouvel angle
La discipline suit désormais : **problème concret → argument → objection / contre-exemple → reformulation → production personnelle**.

## Changements
- 16/16 cours philosophie conservent leurs IDs et la progression utilisateur.
- 80 questions de quiz remplacées par des cas appliqués et des distinctions réellement testées.
- 16 ateliers uniques, un par cours, avec une production argumentée et une réponse modèle.
- 14 expéditions philosophie transformées en problèmes à résoudre plutôt qu’en questions de récitation.
- Le lecteur interactif affiche désormais « Cas à trancher » puis « Construis ta réponse » en philosophie.
- Les rappels actifs de philosophie utilisent le prompt spécifique du cours au lieu d’une consigne générique identique partout.
- RC37 Anglais reste intact et son audit continue de tourner dans la release RC38.

## Principe
Un utilisateur doit pouvoir échouer parce que son raisonnement est trop rapide, pas parce qu’il ne se souvient pas du nom d’un auteur. Inversement, il ne doit plus pouvoir réussir simplement parce que trois réponses sont ridicules.

## Contrôle qualité spécifique à la discipline
Le garde-fou générique de longueur n'est plus utilisé comme proxy principal de qualité pour la philosophie. Le seuil structurel est volontairement plus bas (220 mots) car la valeur pédagogique est portée en partie par les cas, l'argumentation et la production active. La release reste bloquée par un audit spécifique : nombre de questions appliquées, rareté de la récitation directe, diversité des opérations de raisonnement, 16 ateliers uniques et 14 expéditions scénarisées.

## Résultat de l'audit final
- 16 cours philosophie
- 80 questions
- 55 questions explicitement appliquées/contextualisées selon le détecteur
- 1 seule question de définition directe
- 16 ateliers uniques avec production personnelle
- 14 expéditions philosophie scénarisées
- 0 avertissement dans l'audit philosophie
- audit contenu global : 209 cours / 158 mystères / 0 avertissement de plausibilité
- audit éditorial global : 209 cours classés A / 158 mystères classés A / 0 signal
- audit Anglais RC37 toujours validé
