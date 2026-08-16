# HistoDaily RC41 — Adaptive Comfort & Personalized Path

## Principe
RC40 rendait la difficulté progressive dans chacune des 11 disciplines. RC41 ajoute une deuxième condition : l'expérience seule ne suffit plus à faire monter la difficulté. Les résultats doivent aussi montrer que l'utilisateur est à l'aise.

L'adaptation reste volontairement invisible : aucun panneau, aucun pourcentage de performance et aucun réglage supplémentaire sur l'accueil.

## Difficulté adaptative par discipline
Le moteur observe séparément pour chaque discipline :
- la réussite aux questions de quiz ;
- le nombre d'essais sur les 8 mystères réussis les plus récents ;
- l'utilisation récente des indices.

Il ne peut jamais accélérer un utilisateur vers du contenu plus difficile. Il peut seulement ralentir la montée :
- soutien léger : le stade `advanced` reste temporairement `intermediate` ;
- soutien fort : `intermediate` ou `advanced` restent temporairement `confidence` (facile + moyen).

Un compte neuf sans données n'est ni pénalisé ni accéléré.

## Guidage adaptatif
Le choix guidé reste normal pendant les 20 premiers mystères d'une discipline.
Après cela :
- si les résultats sont confortables, la réponse libre peut prendre le relais ;
- en soutien léger, le guidage peut rester jusqu'à 24 réussites ;
- en soutien fort, jusqu'à 30 réussites.

Le but est d'éviter un mur de difficulté sans rendre l'expérience infantilisante pour quelqu'un qui réussit facilement.

## Une seule prochaine action personnalisée
La carte secondaire de l'accueil reste unique. Son ordre de priorité est :
1. révision mémoire réellement due, y compris dans un autre domaine déjà pratiqué ;
2. cours/quiz déjà commencé ;
3. seulement après la boucle Expédition → Cours → Quiz du jour, léger rééquilibrage vers un domaine déjà pratiqué nettement en retard ;
4. sinon, rester simplement dans l'univers actuellement choisi.

RC41 n'impose jamais une discipline encore jamais pratiquée.

## Compatibilité
- 209 cours et 158 mystères inchangés.
- Les règles RC40 de pool découverte restent actives dans les 11 disciplines.
- Les refontes Anglais RC37, Philosophie RC38 et Sciences/Astronomie RC39 restent actives.
- Le flux RC36 reste Expédition → Comprendre → Cours → Quiz.
