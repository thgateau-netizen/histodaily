# Audit technique — beta 207 LTS

## Résultat mesuré

| Indicateur | beta 206 | beta 207 LTS | Évolution |
|---|---:|---:|---:|
| Fichiers du paquet | 37 | 24 | −35 % |
| Fichiers JavaScript | 23 | 11 | −52 % |
| Feuilles CSS | 3 | 1 | −67 % |
| Scripts chargés par `index.html` | 17 | 5 | −71 % |
| Lignes de `app.js` | 22 152 | 19 665 | −2 487 lignes |
| Lignes de code/documentation | 41 706 | environ 39 200 | −6 % |

La diminution totale du code est volontairement plus faible que celle du nombre de fichiers : les contenus pédagogiques et les adaptateurs sociaux actifs ont été conservés.

## Contrôles automatiques

- Syntaxe Node validée sur tous les fichiers `.js`.
- JSON valide pour le manifeste PWA et la configuration Vercel.
- Toutes les ressources déclarées dans `index.html` existent.
- Toutes les ressources préchargées par le service worker existent.
- Parcours Chromium hors ligne simulé sur 24 états :
  - accueil ;
  - catalogue des huit disciplines ;
  - premier cours des huit disciplines ;
  - mystère ;
  - classements jour, semaine, année et amis ;
  - profil ;
  - recherche globale.
- Zéro exception JavaScript pendant le parcours.
- Recherche globale : fenêtre ouverte, 24 résultats initiaux visibles.
- Intégrité des données : 12 mondes, 106 cours, 65 mystères, zéro ID dupliqué.

## Dette restante connue

Les fonctions de compatibilité social/backend portant encore des noms historiques n’ont pas été supprimées lorsqu’elles participent à la normalisation des anciennes sauvegardes, au rapprochement des codes amis ou aux routes Supabase. La prochaine étape saine est une migration versionnée du schéma social accompagnée de tests d’intégration contre une instance Supabase de test.
