# HistoDaily RC40 — Global Difficulty Ramp

## Pourquoi cette version
La progression douce introduite en Sciences/Astronomie en RC39 devient une règle générale. Un utilisateur expérimenté en Histoire doit pouvoir découvrir l’Économie, l’Art ou l’Anglais sans être traité comme un expert de cette nouvelle discipline.

## Nouvelle règle globale
Chaque discipline possède sa propre expérience, calculée à partir des mystères réussis et des cours validés dans cette discipline.

La montée en difficulté suit quatre stades :

1. **Découverte** — uniquement des mystères faciles issus d’un pool de démarrage choisi pour la discipline.
2. **En confiance** — facile + moyen.
3. **Intermédiaire** — facile + moyen + difficile.
4. **Avancé** — l’expert peut entrer dans la rotation.

Le niveau global du compte n’accélère pas cette rampe : la progression est locale à chaque discipline.

## Couverture
- 11 disciplines couvertes.
- 6 mystères de découverte par discipline, soit **66 mystères starter**.
- 2 premiers cours explicitement marqués comme fondations par discipline, soit **22 cours starter**.
- Les starters sont forcés en difficulté `facile` et restent dans le mode guidé de début de parcours.

## Disciplines
Histoire, Art, Cinéma, Sciences & inventions, Astronomie, Économie, Géographie, Musique, Littérature, Philosophie et Anglais.

## Rotation quotidienne
RC40 conserve les règles déjà corrigées :
- le dossier change chaque jour même s’il n’a pas été joué ;
- un dossier réussi ne revient pas tant qu’il reste de l’inédit ;
- le dossier de la veille est évité ;
- un ancien dossier du jour devenu trop dur après migration RC40 est remplacé s’il n’a pas encore été joué ;
- le contenu `expert` n’est jamais utilisé comme simple secours avant le stade avancé.

## Ateliers
Les ateliers disciplinaires utilisent désormais la même rampe de difficulté lorsqu’un pool d’ateliers est disponible.

## Validation
Le contrôle RC40 exécute aussi un test comportemental sur un compte vierge. Pour chacune des 11 disciplines, le moteur doit :
- renvoyer le stade `discovery` ;
- choisir réellement un dossier appartenant au pool de découverte ;
- renvoyer un dossier de difficulté `facile`.

Tous les audits existants Anglais, Philosophie, Sciences/Astronomie, contenu, UX et polish continuent de passer.
