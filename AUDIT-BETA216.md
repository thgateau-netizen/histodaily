# HistoDaily — audit beta 216

## Périmètre

La beta 216 ajoute un audit éditorial et structurel exécutable directement dans l’application. Il contrôle les 106 cours, les 52 mondes pédagogiques, les quiz, les liens de mystères, l’Expédition active, les révisions et les identifiants de progression enregistrés.

Rapport brut complet : `AUDIT-BETA216.json`.

## Résultat global

- 106 cours analysés dans 8 disciplines.
- 52 mondes pédagogiques analysés.
- 0 erreur d’intégrité structurelle : aucun monde orphelin, aucun lien actif de mystère, d’Expédition ou de révision pointant vers un cours absent dans l’état testé.
- 11 cours atteignent actuellement toutes les exigences éditoriales bloquantes : il s’agit du chapitre pilote sur les Vikings.
- Dette éditoriale restante : 21 alertes critiques, 248 avertissements et 64 informations.

Les 21 alertes critiques concernent des cours trop courts, principalement les 20 cours d’astronomie et le cours `Pyramides et pouvoir`. Elles ne signalent pas des routes cassées ou une corruption de progression.

Les avertissements restants concernent surtout :

- 95 modes Express qui ne comportent pas encore quatre paragraphes structurés ;
- 63 cours complets encore sous la longueur cible ;
- 42 Express trop courts ;
- 18 réponses de quiz insuffisamment étayées par le texte ;
- 18 cours dont le découpage comporte trop peu de sections ;
- 12 formulations de questions réutilisées dans plusieurs cours.

## Chapitre pilote : Vikings

Les 11 cours du monde viking ont été réécrits au niveau éditorial final :

- 4 paragraphes Express par cours ;
- 5 questions avec distracteurs distincts et explications ;
- 7 à 9 sections dans le cours complet ;
- 562 à 838 mots par cours complet, moyenne de 623 mots ;
- aucune alerte critique ou avertissement ;
- métadonnées éditoriales `published-final` et révision `beta216-viking-final`.

Le chapitre couvre la Scandinavie avant les raids, les expéditions, les navires, la colonisation atlantique, le commerce et l’esclavage, la christianisation, la vie quotidienne, la société et le droit, les croyances, la construction des royaumes ainsi que les implantations en Normandie, en Angleterre et autour de Kiev.

## Diagnostic interne

Le diagnostic est volontairement absent de la navigation publique. Il s’ouvre avec :

- `?diagnostic=1` ajouté à l’adresse ;
- `#diagnostic` ajouté à l’adresse ;
- `HistoDailyQuality.open()` dans la console.

Il permet de filtrer les anomalies, d’inspecter l’état des liens et d’exporter le rapport JSON. Le moteur est aussi disponible avec `HistoDailyContentAudit.run()`.

## Révisions et progression

Au démarrage de l’audit, la file de révision est assainie sans toucher aux réponses valides :

- retrait des entrées pointant vers un cours inexistant ;
- retrait des index de question invalides ;
- bornage du niveau de répétition ;
- réparation des échéances illisibles ;
- conservation de la source de chaque révision.

## Tests de non-régression

- vérification syntaxique de tous les fichiers JavaScript ;
- rendu contrôlé en 320, 390 et 430 px ;
- aucune erreur JavaScript ni débordement horizontal durant le parcours testé ;
- lecteur Express et cours complet du chapitre Vikings ouverts ;
- diagnostic et export de l’audit ouverts ;
- quiz contrôlé à 2/5 : aucune annonce de fin, aucun accès au cours suivant, trois questions restantes affichées ;
- Expédition commencée puis changement de discipline : le mystère et les deux cours épinglés restent inchangés.

## Lecture du score « valide »

Le nombre de cours « valides » est volontairement strict : un cours n’est compté comme valide que s’il n’a ni alerte critique ni avertissement. Le score de 11/106 ne signifie donc pas que les 95 autres cours sont inutilisables ; il indique qu’ils n’ont pas encore tous atteint le standard éditorial retenu pour une publication finale.
