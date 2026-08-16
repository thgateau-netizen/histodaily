/* HistoDaily RC42 — targeted catalogue expansion for underrepresented disciplines. */
(function histodailyRc42CatalogueExpansion(){
  "use strict";
  const VERSION = "1.0.0-rc.42.0";
  if (typeof data === "undefined" || typeof READY_LESSON_PACKS === "undefined") return;
  const courses = [
  {
    "chapter": "eco-externalities-public-goods",
    "meta": {
      "id": "eco-common-resources-rules",
      "order": 2,
      "title": "Ressources communes : éviter la surexploitation",
      "shortTitle": "Ressources communes",
      "emoji": "🌊",
      "period": "Économie contemporaine",
      "location": "Marchés, territoires et ressources",
      "xp": 55,
      "gems": 2,
      "unlocks": [],
      "blocks": []
    },
    "pack": {
      "hook": "Une ressource peut être précieuse pour tout le monde et pourtant être épuisée par des décisions individuellement logiques. Comprendre ce paradoxe permet de raisonner sur l’eau, les pêches, les forêts ou le climat sans réduire le problème à la bonne ou mauvaise volonté.",
      "keyFacts": [
        "Une ressource peut être ouverte sans être infinie — Une pâture, une nappe phréatique, une zone de pêche ou l’atmosphère peuvent être utilisées par plusieurs acteurs.",
        "Bien public et ressource commune ne sont pas la même chose — Un bien public est difficile à réserver à ceux qui paient et l’usage d’une personne ne réduit pas forcément celui des autres : l’éclairage d’une rue en est un exemple classique.",
        "Pourquoi le prix peut envoyer un mauvais signal — Si l’accès à une ressource est gratuit ou sous-évalué, son prix privé ne reflète pas nécessairement son coût collectif.",
        "Il n’existe pas une solution unique — Privatiser peut parfois clarifier qui supporte les conséquences d’un usage, mais cela ne fonctionne pas pour toutes les ressources et peut créer des problèmes d’accès."
      ],
      "express": [
        "Une ressource commune est difficile à réserver, mais chaque prélèvement peut réduire ce qui reste aux autres. Le problème vient de l’écart entre bénéfice privé immédiat et coût collectif.",
        "Prix, quotas, droits d’usage ou règles locales sont différentes façons de modifier les incitations. Aucune n’est automatiquement supérieure : tout dépend de l’information et du contrôle disponibles.",
        "Pour analyser une surexploitation, demande qui bénéficie d’une unité supplémentaire, qui en supporte le coût et quelle règle pourrait rapprocher ces deux éléments."
      ],
      "complete": [
        {
          "title": "1. Une ressource peut être ouverte sans être infinie",
          "text": "Une pâture, une nappe phréatique, une zone de pêche ou l’atmosphère peuvent être utilisées par plusieurs acteurs. Le problème apparaît lorsque chacun reçoit presque tout le bénéfice de son usage supplémentaire alors que le coût de l’épuisement est partagé par tous. Dans ce cas, une décision raisonnable à l’échelle individuelle peut produire collectivement une surexploitation. Ce n’est donc pas une histoire de personnes « égoïstes » : c’est un problème d’incitations et de règles."
        },
        {
          "title": "2. Bien public et ressource commune ne sont pas la même chose",
          "text": "Un bien public est difficile à réserver à ceux qui paient et l’usage d’une personne ne réduit pas forcément celui des autres : l’éclairage d’une rue en est un exemple classique. Une ressource commune est également difficile à exclure, mais elle peut être épuisée : un poisson capturé n’est plus disponible pour les autres pêcheurs. Confondre les deux empêche de choisir les bons outils de gestion."
        },
        {
          "title": "3. Pourquoi le prix peut envoyer un mauvais signal",
          "text": "Si l’accès à une ressource est gratuit ou sous-évalué, son prix privé ne reflète pas nécessairement son coût collectif. Pomper un litre d’eau peut coûter très peu aujourd’hui tout en accélérant la baisse d’une nappe. Une taxe, un quota ou un droit d’usage cherche alors à faire entrer une partie de ce coût futur dans la décision présente. Mais le bon outil dépend de ce qu’on sait mesurer et contrôler."
        },
        {
          "title": "4. Il n’existe pas une solution unique",
          "text": "Privatiser peut parfois clarifier qui supporte les conséquences d’un usage, mais cela ne fonctionne pas pour toutes les ressources et peut créer des problèmes d’accès. Des quotas peuvent limiter la quantité totale mais exigent de décider comment les répartir. Des règles locales peuvent aussi fonctionner lorsque les usagers se connaissent, surveillent la ressource et acceptent des sanctions. L’économie étudie précisément ces architectures d’incitation plutôt qu’une recette universelle."
        },
        {
          "title": "5. Les règles doivent résister aux contournements",
          "text": "Une politique peut être élégante sur le papier et échouer si elle est impossible à contrôler. Un quota de pêche mal surveillé peut déplacer les captures vers une autre zone ou encourager les déclarations incomplètes. Une taxe trop facile à éviter change moins les comportements qu’espéré. Pour évaluer une politique, il faut donc regarder le mécanisme, mais aussi l’information disponible, les possibilités de fraude et la capacité de contrôle."
        },
        {
          "title": "6. Le bon réflexe : identifier qui gagne et qui supporte le coût",
          "text": "Face à une ressource menacée, commence par demander qui bénéficie d’une unité d’usage supplémentaire et qui supporte la dégradation. Puis cherche ce qui empêche spontanément les acteurs de tenir compte de ce coût. Cette méthode évite de moraliser trop vite le problème. Elle permet aussi de comparer plusieurs solutions : prix, quotas, droits d’usage, coopération locale, normes techniques ou combinaison de plusieurs instruments."
        }
      ],
      "deeper": [],
      "takeaways": [
        {
          "label": "Incitation",
          "text": "Une décision rationnelle individuellement peut devenir destructrice collectivement."
        },
        {
          "label": "Rivalité",
          "text": "Prélever une ressource commune réduit ce qui reste disponible."
        },
        {
          "label": "Institutions",
          "text": "Taxes, quotas, droits et règles locales organisent des incitations différentes."
        },
        {
          "label": "Diagnostic",
          "text": "Toujours identifier le bénéficiaire immédiat et le porteur du coût collectif."
        }
      ],
      "quiz": [
        {
          "kind": "mécanisme",
          "q": "Pourquoi une ressource commune peut-elle être surexploitée même par des acteurs rationnels ?",
          "a": "Parce que chacun capte une grande partie du bénéfice de son usage alors qu’une partie du coût est répartie sur tous.",
          "choices": [
            "Parce que chaque usager sous-estime la dégradation, même si le bénéfice privé et le coût collectif étaient parfaitement alignés.",
            "Parce que l’absence de propriétaire privé empêche en pratique toute forme de coordination entre les usagers.",
            "Parce que le prix courant résume déjà l’ensemble des coûts futurs imposés aux autres usagers."
          ],
          "why": "Le cœur du problème est l’écart entre bénéfice privé et coût collectif : l’incitation individuelle ne reflète pas entièrement la rareté créée pour les autres.",
          "trap": "",
          "evidence": "« Une ressource peut être ouverte sans être infinie »"
        },
        {
          "kind": "distinction",
          "q": "Quelle différence distingue surtout une ressource commune d’un bien public ?",
          "a": "L’usage d’une ressource commune peut réduire ce qui reste disponible pour les autres.",
          "choices": [
            "Un bien public est défini par son mode de financement, tandis qu’une ressource commune est définie par son propriétaire juridique.",
            "Une ressource commune est surtout un bien sans prix, tandis qu’un bien public est un service financé par l’impôt.",
            "Un bien public se distingue surtout parce que sa production coûte peu, alors qu’une ressource commune devient chère à exploiter."
          ],
          "why": "Les deux peuvent être difficiles à réserver, mais la rivalité d’usage est décisive : prélever une ressource commune diminue ce qui reste.",
          "trap": "",
          "evidence": "« Bien public et ressource commune ne sont pas la même chose »"
        },
        {
          "kind": "application",
          "q": "Une ville veut freiner le pompage d’une nappe phréatique. Quel diagnostic est le plus utile avant de choisir un outil ?",
          "a": "Mesurer qui pompe, comment la nappe réagit et quels usages peuvent réellement changer.",
          "choices": [
            "Comparer d’abord le niveau de taxe ou de quota le plus ambitieux, même si les réactions des usagers restent mal connues.",
            "Estimer l’effet de la règle à partir de son objectif officiel, sans mesurer comment les usagers peuvent s’adapter.",
            "Commencer par le statut juridique de la nappe et en déduire directement le comportement futur des usagers."
          ],
          "why": "Une politique dépend de l’information, de la réaction des acteurs et de la capacité de contrôle ; le même instrument ne fonctionne pas dans tous les contextes.",
          "trap": "",
          "evidence": "« Les règles doivent résister aux contournements »"
        },
        {
          "kind": "nuance",
          "q": "Pourquoi un quota n’est-il pas automatiquement meilleur qu’une taxe ?",
          "a": "Parce qu’il faut pouvoir fixer, répartir et contrôler le quota, tandis qu’une taxe agit autrement sur les incitations.",
          "choices": [
            "Parce qu’un quota agit surtout sur le prix alors qu’une taxe fixe directement la quantité autorisée.",
            "Parce qu’une taxe permet de connaître à l’avance la quantité finale, tandis qu’un quota laisse cette quantité indéterminée.",
            "Parce que taxe et quota diffèrent surtout par leur nom administratif, beaucoup moins par les incitations qu’ils créent."
          ],
          "why": "Quota et taxe répondent au même problème par des mécanismes différents ; leur efficacité dépend de l’incertitude, du contrôle et de la manière dont les acteurs s’adaptent.",
          "trap": "",
          "evidence": "« Il n’existe pas une solution unique »"
        },
        {
          "kind": "raisonnement",
          "q": "Dans une pêcherie, chaque bateau gagne à sortir une fois de plus, mais le stock de poissons chute. Quelle question révèle le mieux le problème économique ?",
          "a": "Qui supporte la baisse future du stock quand un bateau capture davantage aujourd’hui ?",
          "choices": [
            "Quel bateau possède le moteur le plus puissant ?",
            "Quel poisson se vend le plus cher dans les restaurants de la région ?",
            "Quel équipage travaille le plus longtemps pendant la saison ?"
          ],
          "why": "La question pertinente met en relation le bénéfice immédiat d’un acteur et le coût diffus imposé aux autres utilisateurs de la ressource.",
          "trap": "",
          "evidence": "« Le bon réflexe : identifier qui gagne et qui supporte le coût »"
        }
      ],
      "learningPath": [
        "Une ressource peut être ouverte sans être infinie — Une pâture, une nappe phréatique, une zone de pêche ou l’atmosphère peuvent être utilisées par plusieurs acteurs.",
        "Bien public et ressource commune ne sont pas la même chose — Un bien public est difficile à réserver à ceux qui paient et l’usage d’une personne ne réduit pas forcément celui des autres : l’éclairage d’une rue en est un exemple classique.",
        "Pourquoi le prix peut envoyer un mauvais signal — Si l’accès à une ressource est gratuit ou sous-évalué, son prix privé ne reflète pas nécessairement son coût collectif.",
        "Il n’existe pas une solution unique — Privatiser peut parfois clarifier qui supporte les conséquences d’un usage, mais cela ne fonctionne pas pour toutes les ressources et peut créer des problèmes d’accès."
      ],
      "editorialFlow": "concept-observation-application",
      "contentRevision": "rc42-catalogue-expansion"
    }
  },
  {
    "chapter": "eco-inequality-redistribution",
    "meta": {
      "id": "eco-redistribution-tax-benefits",
      "order": 2,
      "title": "Redistribution : impôts, prestations et services publics",
      "shortTitle": "Redistribution",
      "emoji": "⚖️",
      "period": "Économie contemporaine",
      "location": "Ménages et finances publiques",
      "xp": 55,
      "gems": 2,
      "unlocks": [],
      "blocks": []
    },
    "pack": {
      "hook": "Quand on dit qu’un système « redistribue », on mélange souvent impôts, prestations et services publics. Les séparer permet de comprendre qui paie vraiment, qui reçoit, et pourquoi un taux affiché ne dit presque jamais à lui seul ce qu’un ménage supporte.",
      "keyFacts": [
        "Redistribution : regarder avant et après les prélèvements — Comparer les inégalités uniquement à partir des salaires bruts donne une image incomplète.",
        "Progressif ne veut pas dire que tout le revenu est taxé au même taux — Dans un barème progressif, les tranches supérieures peuvent être taxées à un taux plus élevé sans que ce taux s’applique à l’ensemble du revenu.",
        "Les prestations ne sont qu’une partie du système — Une redistribution peut passer par un versement monétaire, mais aussi par l’accès à l’école, aux soins, aux transports ou à d’autres services publics.",
        "Cibler ou universaliser produit des compromis différents — Une prestation très ciblée concentre les ressources sur les ménages qui en ont le plus besoin, mais elle exige des critères, peut créer des non-recours et parfois des seuils abrupts."
      ],
      "express": [
        "La redistribution se lit en comparant revenu initial, prélèvements, prestations et services financés collectivement.",
        "Dans un impôt progressif, le taux marginal concerne la dernière tranche : il ne remplace pas le taux appliqué à tout le revenu.",
        "Ciblage et universalité produisent des compromis différents entre concentration de l’aide, simplicité, non-recours et coût."
      ],
      "complete": [
        {
          "title": "1. Redistribution : regarder avant et après les prélèvements",
          "text": "Comparer les inégalités uniquement à partir des salaires bruts donne une image incomplète. Les ménages paient des impôts et cotisations, reçoivent parfois des prestations monétaires et bénéficient de services financés collectivement. Le revenu disponible se rapproche davantage de ce qu’un ménage peut réellement consommer ou épargner. Pour comprendre la redistribution, il faut donc distinguer revenu initial, prélèvements, prestations et services en nature."
        },
        {
          "title": "2. Progressif ne veut pas dire que tout le revenu est taxé au même taux",
          "text": "Dans un barème progressif, les tranches supérieures peuvent être taxées à un taux plus élevé sans que ce taux s’applique à l’ensemble du revenu. Le taux marginal concerne la dernière tranche ; le taux moyen rapporte l’impôt total au revenu total. Cette distinction évite une erreur fréquente : croire qu’une petite hausse de salaire peut faire « perdre » tout le gain en faisant basculer l’ensemble du revenu dans une tranche supérieure."
        },
        {
          "title": "3. Les prestations ne sont qu’une partie du système",
          "text": "Une redistribution peut passer par un versement monétaire, mais aussi par l’accès à l’école, aux soins, aux transports ou à d’autres services publics. Deux ménages au même revenu disponible n’ont pas forcément le même niveau de vie si leurs dépenses contraintes diffèrent fortement. L’analyse économique cherche donc à mesurer plusieurs dimensions plutôt qu’à réduire la redistribution à un seul chèque ou à un seul impôt."
        },
        {
          "title": "4. Cibler ou universaliser produit des compromis différents",
          "text": "Une prestation très ciblée concentre les ressources sur les ménages qui en ont le plus besoin, mais elle exige des critères, peut créer des non-recours et parfois des seuils abrupts. Une prestation universelle est plus simple et moins stigmatisante, mais coûte davantage à niveau individuel identique. Aucun choix n’est neutre : il faut comparer efficacité redistributive, simplicité, coût administratif et effets sur les comportements."
        },
        {
          "title": "5. Les incitations comptent, mais elles ne racontent pas toute l’histoire",
          "text": "Un impôt ou une prestation peut modifier l’intérêt à travailler davantage, épargner ou investir. Cependant, les réactions réelles dépendent du marché du travail, des contraintes familiales, de l’accès aux emplois, de la santé ou du logement. Dire qu’un taux « décourage le travail » sans mesurer les comportements est donc insuffisant. L’économie empirique cherche à estimer ces effets plutôt qu’à les supposer."
        },
        {
          "title": "6. Évaluer une réforme : qui paie, qui reçoit, et sur quelle durée ?",
          "text": "Une réforme fiscale peut avantager un ménage cette année mais modifier progressivement les salaires, les prix ou les services financés. Pour l’analyser, il faut regarder la distribution des gains et pertes, pas seulement le coût budgétaire total. Le bon réflexe est de demander quels groupes sont affectés, de combien, par quel mécanisme et avec quels effets indirects plausibles. La redistribution est un système, pas une simple soustraction entre « contributeurs » et « bénéficiaires »."
        }
      ],
      "deeper": [],
      "takeaways": [
        {
          "label": "Revenu disponible",
          "text": "Il tient compte des prélèvements et prestations monétaires."
        },
        {
          "label": "Taux marginal",
          "text": "Il concerne la dernière tranche, pas tout le revenu."
        },
        {
          "label": "Services publics",
          "text": "Ils redistribuent aussi sans prendre la forme d’un virement."
        },
        {
          "label": "Évaluation",
          "text": "Comparer qui gagne, qui perd et par quel mécanisme."
        }
      ],
      "quiz": [
        {
          "kind": "distinction",
          "q": "Quelle différence existe entre taux marginal et taux moyen d’imposition ?",
          "a": "Le taux marginal s’applique à la dernière tranche concernée ; le taux moyen rapporte l’impôt total au revenu total.",
          "choices": [
            "Le taux marginal est payé uniquement par les entreprises, tandis que le taux moyen concerne les ménages.",
            "Le taux moyen s’applique seulement aux revenus les plus élevés, tandis que le taux marginal est identique pour tous.",
            "Le taux marginal mesure les prestations reçues, tandis que le taux moyen mesure les cotisations sociales."
          ],
          "why": "Dans un barème par tranches, le dernier euro peut être soumis à un taux différent de la proportion réellement payée sur l’ensemble du revenu.",
          "trap": "",
          "evidence": "« Progressif ne veut pas dire que tout le revenu est taxé au même taux »"
        },
        {
          "kind": "application",
          "q": "Une personne passe légèrement dans une tranche d’impôt supérieure. Que peut-on conclure sans connaître le reste du barème ?",
          "a": "Que seule la part de revenu située dans cette nouvelle tranche est concernée par son taux marginal.",
          "choices": [
            "Que la hausse du taux marginal risque de s’appliquer à la majeure partie de son revenu et d’effacer le gain salarial.",
            "Que le franchissement de tranche modifie le taux applicable à l’ensemble de son revenu imposable.",
            "Que son taux moyen se rapproche instantanément du taux de la nouvelle tranche, même si seule une faible part y entre."
          ],
          "why": "Le mécanisme des tranches protège précisément contre le saut où tout le revenu serait soudain taxé au taux de la tranche supérieure.",
          "trap": "",
          "evidence": "« Progressif ne veut pas dire que tout le revenu est taxé au même taux »"
        },
        {
          "kind": "nuance",
          "q": "Pourquoi les services publics comptent-ils dans l’analyse de la redistribution ?",
          "a": "Parce qu’ils fournissent des ressources ou services financés collectivement sans prendre forcément la forme d’un revenu versé.",
          "choices": [
            "Parce qu’ils sont comptés comme un revenu monétaire supplémentaire versé directement à chaque ménage.",
            "Parce que leur financement permet de traiter les prélèvements comme s’ils n’avaient plus d’effet redistributif propre.",
            "Parce qu’on peut attribuer la même valeur économique à un service public pour chaque ménage, indépendamment de son usage."
          ],
          "why": "Éducation, santé ou transport peuvent modifier le niveau de vie sans apparaître comme un virement monétaire sur le compte du ménage.",
          "trap": "",
          "evidence": "« Les prestations ne sont qu’une partie du système »"
        },
        {
          "kind": "comparaison",
          "q": "Quel compromis oppose souvent prestation ciblée et prestation universelle ?",
          "a": "Le ciblage concentre davantage l’aide mais exige des critères ; l’universalité simplifie l’accès mais coûte davantage à prestation identique.",
          "choices": [
            "Le ciblage réduit surtout les coûts administratifs parce qu’il concerne moins de personnes, alors que l’universalité exige davantage de contrôles.",
            "L’universalité redistribue peu par construction, alors qu’un dispositif ciblé suffit généralement à corriger l’essentiel des écarts de revenu.",
            "Les deux dispositifs se distinguent surtout par leur vocabulaire, mais conduisent à une population bénéficiaire et un coût proches."
          ],
          "why": "Le choix porte notamment sur concentration des ressources, simplicité, non-recours, coût administratif et coût budgétaire.",
          "trap": "",
          "evidence": "« Cibler ou universaliser produit des compromis différents »"
        },
        {
          "kind": "raisonnement",
          "q": "Pour juger une réforme fiscale, quelle comparaison est la plus informative ?",
          "a": "Comparer les gains et pertes par groupes de ménages, puis examiner les mécanismes et effets indirects attendus.",
          "choices": [
            "Comparer uniquement le nombre de pages du nouveau texte fiscal.",
            "Regarder seulement le montant total collecté sans identifier qui le paie.",
            "Observer le taux le plus élevé du barème sans examiner les revenus réellement concernés."
          ],
          "why": "Une réforme redistributive change la répartition, pas seulement un total budgétaire ; il faut donc suivre qui paie, qui reçoit et comment les comportements peuvent évoluer.",
          "trap": "",
          "evidence": "« Évaluer une réforme : qui paie, qui reçoit, et sur quelle durée ? »"
        }
      ],
      "learningPath": [
        "Redistribution : regarder avant et après les prélèvements — Comparer les inégalités uniquement à partir des salaires bruts donne une image incomplète.",
        "Progressif ne veut pas dire que tout le revenu est taxé au même taux — Dans un barème progressif, les tranches supérieures peuvent être taxées à un taux plus élevé sans que ce taux s’applique à l’ensemble du revenu.",
        "Les prestations ne sont qu’une partie du système — Une redistribution peut passer par un versement monétaire, mais aussi par l’accès à l’école, aux soins, aux transports ou à d’autres services publics.",
        "Cibler ou universaliser produit des compromis différents — Une prestation très ciblée concentre les ressources sur les ménages qui en ont le plus besoin, mais elle exige des critères, peut créer des non-recours et parfois des seuils abrupts."
      ],
      "editorialFlow": "concept-observation-application",
      "contentRevision": "rc42-catalogue-expansion"
    }
  },
  {
    "chapter": "music-baroque",
    "meta": {
      "id": "music-bach-counterpoint-listening",
      "order": 2,
      "title": "Bach et le contrepoint : entendre plusieurs voix à la fois",
      "shortTitle": "Bach & contrepoint",
      "emoji": "🎼",
      "period": "XVIIe–XVIIIe siècles",
      "location": "Europe",
      "xp": 55,
      "gems": 2,
      "unlocks": [],
      "blocks": []
    },
    "pack": {
      "hook": "Une fugue peut d’abord donner l’impression que trop de choses se passent en même temps. Le contrepoint devient beaucoup plus accessible dès qu’on cesse d’essayer de tout entendre et qu’on suit une idée qui passe d’une voix à l’autre.",
      "keyFacts": [
        "Écouter plusieurs lignes en même temps — Dans beaucoup de musiques, une mélodie principale domine et les autres sons l’accompagnent.",
        "La basse donne un sol sous les voix — Dans la musique baroque, une ligne de basse et l’harmonie qui l’accompagne fournissent souvent un socle.",
        "Une fugue commence par une idée qui voyage — Dans une fugue, une voix expose un sujet reconnaissable ; une autre entre ensuite avec cette même idée, tandis que la première continue.",
        "Indépendance ne veut pas dire chaos — Pour que plusieurs lignes restent lisibles, elles doivent éviter de se gêner constamment."
      ],
      "express": [
        "Le contrepoint associe plusieurs lignes autonomes plutôt qu’une mélodie avec simple accompagnement.",
        "Dans une fugue, un sujet reconnaissable circule entre les voix et sert de fil conducteur.",
        "Écouter le grave, puis une imitation, permet de décomposer une texture dense sans connaître le solfège."
      ],
      "complete": [
        {
          "title": "1. Écouter plusieurs lignes en même temps",
          "text": "Dans beaucoup de musiques, une mélodie principale domine et les autres sons l’accompagnent. Le contrepoint organise au contraire plusieurs lignes mélodiques qui gardent chacune une certaine autonomie tout en formant un ensemble cohérent. L’enjeu n’est pas de suivre chaque note dès la première écoute. Commence par repérer une ligne, puis écoute quand une seconde l’imite, la contredit ou poursuit son propre chemin."
        },
        {
          "title": "2. La basse donne un sol sous les voix",
          "text": "Dans la musique baroque, une ligne de basse et l’harmonie qui l’accompagne fournissent souvent un socle. Ce principe de basse continue permet aux voix supérieures de circuler avec davantage de liberté tout en gardant une direction harmonique commune. À l’écoute, tu peux chercher d’abord le mouvement grave : même lorsqu’il est discret, il aide à sentir les arrivées, les tensions et les changements de section."
        },
        {
          "title": "3. Une fugue commence par une idée qui voyage",
          "text": "Dans une fugue, une voix expose un sujet reconnaissable ; une autre entre ensuite avec cette même idée, tandis que la première continue. D’autres entrées peuvent s’ajouter. Le plaisir vient de reconnaître le sujet quand il réapparaît transformé ou déplacé. Une fugue n’est donc pas simplement « plusieurs mélodies à la fois » : elle construit une conversation organisée autour d’un matériau partagé."
        },
        {
          "title": "4. Indépendance ne veut pas dire chaos",
          "text": "Pour que plusieurs lignes restent lisibles, elles doivent éviter de se gêner constamment. Le compositeur joue sur les directions contraires, les décalages rythmiques, les consonances et les dissonances. Une voix peut monter pendant qu’une autre descend ; une tension peut être préparée puis résolue. Le contrepoint crée ainsi de la densité sans renoncer à la trajectoire de chaque partie. C’est cette combinaison qui donne l’impression d’une architecture sonore."
        },
        {
          "title": "5. Bach : moins un monument qu’un laboratoire d’écoute",
          "text": "Johann Sebastian Bach est souvent présenté comme un sommet du contrepoint, mais le nom ne doit pas remplacer l’écoute. Dans ses fugues, chorals ou inventions, cherche les entrées successives, les motifs qui passent d’une voix à l’autre et les moments où plusieurs trajectoires convergent. On comprend mieux cette musique en suivant un petit motif pendant trente secondes qu’en mémorisant une liste de formes ou de dates."
        },
        {
          "title": "6. Une méthode d’écoute en trois passages",
          "text": "Premier passage : suis uniquement la ligne la plus évidente. Deuxième : essaie de repérer une entrée ou une imitation dans une autre voix. Troisième : écoute le grave et demande-toi comment il soutient les tensions et les résolutions. Cette méthode transforme une texture qui semblait compacte en plusieurs gestes distincts. Le but n’est pas de devenir analyste, mais d’entendre que l’intérêt vient précisément de la coexistence de plusieurs directions."
        }
      ],
      "deeper": [],
      "takeaways": [
        {
          "label": "Contrepoint",
          "text": "Plusieurs lignes gardent leur identité tout en formant un ensemble."
        },
        {
          "label": "Sujet",
          "text": "Dans une fugue, c’est l’idée musicale que l’on apprend à reconnaître."
        },
        {
          "label": "Basse",
          "text": "Elle aide à sentir direction, tension et résolution."
        },
        {
          "label": "Écoute",
          "text": "Suivre une seule voix d’abord vaut mieux que vouloir tout analyser."
        }
      ],
      "quiz": [
        {
          "kind": "écoute",
          "q": "Qu’est-ce qui caractérise le mieux une texture contrapuntique ?",
          "a": "Plusieurs lignes mélodiques relativement autonomes se combinent de manière organisée.",
          "choices": [
            "Une seule mélodie est doublée exactement à l’unisson par tous les instruments.",
            "Le rythme disparaît pour laisser uniquement une succession d’accords statiques.",
            "Chaque instrument joue sans tenir compte de ce que font les autres parties."
          ],
          "why": "Le contrepoint repose sur l’autonomie relative des lignes : elles peuvent être suivies séparément tout en participant à une même construction.",
          "trap": "",
          "evidence": "« Écouter plusieurs lignes en même temps »"
        },
        {
          "kind": "repérage",
          "q": "Dans une fugue, que cherches-tu d’abord pour ne pas te perdre ?",
          "a": "Le sujet qui apparaît dans une voix puis revient dans d’autres.",
          "choices": [
            "Le moment où tous les instruments s’arrêtent exactement en même temps.",
            "Une percussion régulière qui reste identique pendant toute la pièce.",
            "Un refrain chanté qui revient avec les mêmes paroles entre chaque couplet."
          ],
          "why": "Le sujet fournit un repère auditif stable : reconnaître ses entrées permet de suivre la conversation entre les voix.",
          "trap": "",
          "evidence": "« Une fugue commence par une idée qui voyage »"
        },
        {
          "kind": "mécanisme",
          "q": "Pourquoi une ligne de basse peut-elle aider à écouter plusieurs voix ?",
          "a": "Parce qu’elle donne un socle harmonique et rend plus perceptibles les tensions et les arrivées.",
          "choices": [
            "Parce qu’elle oblige toutes les autres voix à jouer exactement les mêmes notes.",
            "Parce qu’elle remplace les mélodies dès qu’une texture devient trop complexe.",
            "Parce qu’elle supprime toute dissonance et rend chaque accord parfaitement stable."
          ],
          "why": "Le grave structure le mouvement harmonique ; l’entendre permet de situer les lignes supérieures dans une direction commune.",
          "trap": "",
          "evidence": "« La basse donne un sol sous les voix »"
        },
        {
          "kind": "nuance",
          "q": "Pourquoi « plusieurs mélodies à la fois » ne suffit-il pas à définir une fugue ?",
          "a": "Parce que les entrées sont organisées autour d’un sujet commun et de ses transformations.",
          "choices": [
            "Parce qu’une fugue interdit qu’une deuxième voix entre après la première.",
            "Parce qu’une fugue n’utilise jamais de répétition ou d’imitation entre les voix.",
            "Parce que toutes les fugues sont écrites pour un seul instrument monodique."
          ],
          "why": "La fugue ne juxtapose pas arbitrairement des lignes : elle développe un matériau reconnaissable selon un principe d’entrées et de réponses.",
          "trap": "",
          "evidence": "« Une fugue commence par une idée qui voyage »"
        },
        {
          "kind": "pratique",
          "q": "Quelle stratégie est la plus utile pour une première écoute d’une pièce contrapuntique dense ?",
          "a": "Suivre une ligne, puis chercher une imitation, puis écouter le rôle du grave.",
          "choices": [
            "Essayer de nommer immédiatement chaque accord et chaque note de toutes les voix.",
            "Écouter uniquement le volume général sans chercher de motif récurrent.",
            "Lire la biographie du compositeur pendant la pièce pour éviter de manquer une date."
          ],
          "why": "Découper l’écoute en tâches simples réduit la charge mentale et permet d’entendre progressivement la structure des voix.",
          "trap": "",
          "evidence": "« Une méthode d’écoute en trois passages »"
        }
      ],
      "learningPath": [
        "Écouter plusieurs lignes en même temps — Dans beaucoup de musiques, une mélodie principale domine et les autres sons l’accompagnent.",
        "La basse donne un sol sous les voix — Dans la musique baroque, une ligne de basse et l’harmonie qui l’accompagne fournissent souvent un socle.",
        "Une fugue commence par une idée qui voyage — Dans une fugue, une voix expose un sujet reconnaissable ; une autre entre ensuite avec cette même idée, tandis que la première continue.",
        "Indépendance ne veut pas dire chaos — Pour que plusieurs lignes restent lisibles, elles doivent éviter de se gêner constamment."
      ],
      "editorialFlow": "concept-observation-application",
      "contentRevision": "rc42-catalogue-expansion"
    }
  },
  {
    "chapter": "music-rock-pop",
    "meta": {
      "id": "music-riff-groove-hook",
      "order": 2,
      "title": "Riff, groove, refrain : pourquoi une chanson accroche",
      "shortTitle": "Riff & groove",
      "emoji": "🎸",
      "period": "XXe–XXIe siècles",
      "location": "Musiques populaires enregistrées",
      "xp": 55,
      "gems": 2,
      "unlocks": [],
      "blocks": []
    },
    "pack": {
      "hook": "Pourquoi reconnaît-on certains morceaux en deux secondes ? Pas seulement grâce à une mélodie : un riff, un son de batterie, une ligne de basse ou un détail de production peuvent suffire. Ce cours apprend à entendre comment répétition, groove et arrangement fabriquent la mémoire musicale.",
      "keyFacts": [
        "Une chanson tient souvent sur quelques éléments très mémorisables — Beaucoup de morceaux pop ou rock utilisent peu de matériaux, mais les combinent avec précision.",
        "Le groove est une relation entre les temps, pas seulement un tempo — Deux morceaux à la même vitesse peuvent donner des sensations radicalement différentes.",
        "Répéter crée une attente ; varier empêche l’usure — Un refrain fonctionne en partie parce qu’il revient.",
        "Couplet, pré-refrain, refrain : des fonctions plutôt que des règles — Le couplet peut développer une histoire ou varier le texte ; le refrain concentre souvent l’idée centrale ; le pré-refrain peut augmenter la tension avant l’arrivée."
      ],
      "express": [
        "Riff et hook ne sont pas synonymes : le hook est ce qui accroche, quelle que soit sa forme.",
        "Le groove vient du placement des sons autour de la pulsation, pas seulement du nombre de battements par minute.",
        "Une chanson garde son identité grâce à la répétition tout en renouvelant l’attention par de petites variations."
      ],
      "complete": [
        {
          "title": "1. Une chanson tient souvent sur quelques éléments très mémorisables",
          "text": "Beaucoup de morceaux pop ou rock utilisent peu de matériaux, mais les combinent avec précision. Un riff peut servir de signature instrumentale ; un refrain concentre souvent le texte et la mélodie les plus mémorisables ; un hook peut être une phrase, un son, un rythme ou un détail de production qui accroche l’oreille. La simplicité n’est donc pas l’absence de travail : elle exige de choisir ce que l’auditeur doit retenir."
        },
        {
          "title": "2. Le groove est une relation entre les temps, pas seulement un tempo",
          "text": "Deux morceaux à la même vitesse peuvent donner des sensations radicalement différentes. Le groove dépend de la manière dont batterie, basse, guitare, clavier ou voix placent leurs attaques autour de la pulsation. De minuscules décalages, accents ou silences changent la sensation de mouvement. Pour l’entendre, essaie de battre une pulsation régulière puis observe quels éléments semblent pousser vers l’avant ou se poser légèrement derrière."
        },
        {
          "title": "3. Répéter crée une attente ; varier empêche l’usure",
          "text": "Un refrain fonctionne en partie parce qu’il revient. Mais si tout reste identique, l’attention peut retomber. Les arrangements jouent donc sur l’ajout d’une deuxième voix, l’ouverture des cymbales, une guitare supplémentaire, un silence avant le retour ou une modification de dynamique. La structure d’une chanson est souvent un art de la différence dans la répétition : faire reconnaître immédiatement une section tout en donnant une raison de l’écouter encore."
        },
        {
          "title": "4. Couplet, pré-refrain, refrain : des fonctions plutôt que des règles",
          "text": "Le couplet peut développer une histoire ou varier le texte ; le refrain concentre souvent l’idée centrale ; le pré-refrain peut augmenter la tension avant l’arrivée. Mais de nombreux morceaux ignorent cette architecture, inversent les fonctions ou construisent tout sur une boucle. Il est plus utile de demander « que fait cette section dans l’énergie du morceau ? » que de forcer chaque passage dans une étiquette."
        },
        {
          "title": "5. Le studio fabrique aussi le hook",
          "text": "Une accroche peut venir d’un timbre autant que d’une mélodie : une voix filtrée, un effet de guitare, une batterie compressée ou un échantillon singulier peuvent devenir immédiatement reconnaissables. Depuis l’enregistrement multipiste, l’identité d’un morceau se construit largement au mixage et à la production. Entendre la chanson, c’est donc aussi écouter les choix de texture, d’espace et de contraste qui n’existent pas forcément avant le studio."
        },
        {
          "title": "6. Une grille d’écoute simple pour n’importe quel morceau",
          "text": "Choisis une chanson que tu connais. Repère d’abord l’élément qui te permet de la reconnaître en deux secondes : c’est probablement un hook. Ensuite, frappe la pulsation et écoute la relation basse-batterie pour sentir le groove. Enfin, compare deux refrains successifs : qu’est-ce qui a été ajouté, retiré ou intensifié ? Cette petite enquête transforme une écoute passive en observation de la fabrication du morceau."
        }
      ],
      "deeper": [],
      "takeaways": [
        {
          "label": "Hook",
          "text": "L’élément que l’oreille retient immédiatement."
        },
        {
          "label": "Groove",
          "text": "La sensation produite par le placement rythmique des différentes parties."
        },
        {
          "label": "Variation",
          "text": "Un refrain peut revenir tout en changeant d’énergie."
        },
        {
          "label": "Production",
          "text": "Le timbre et le mixage font partie de l’écriture du morceau."
        }
      ],
      "quiz": [
        {
          "kind": "distinction",
          "q": "Quelle différence décrit le mieux un riff et un hook ?",
          "a": "Un riff est généralement un motif instrumental répété ; un hook est tout élément particulièrement mémorisable, instrumental ou non.",
          "choices": [
            "Un riff est toujours vocal tandis qu’un hook est toujours joué par une guitare électrique.",
            "Un hook désigne uniquement le titre du morceau, alors qu’un riff désigne toutes ses paroles.",
            "Les deux mots décrivent exactement la vitesse à laquelle le morceau est joué."
          ],
          "why": "Le riff est un type de motif ; le hook est une fonction de mémorisation et peut prendre plusieurs formes.",
          "trap": "",
          "evidence": "« Une chanson tient souvent sur quelques éléments très mémorisables »"
        },
        {
          "kind": "écoute",
          "q": "Deux chansons ont le même tempo mais ne donnent pas du tout la même sensation de mouvement. Quelle notion aide le plus à l’expliquer ?",
          "a": "Le groove, c’est-à-dire la manière dont les attaques et accents s’organisent autour de la pulsation.",
          "choices": [
            "La durée totale du fichier audio, même si elle ne change pas le placement rythmique.",
            "Le nombre de mots dans le titre, indépendamment de ce qui est joué.",
            "La date de sortie du morceau, qui détermine automatiquement sa sensation rythmique."
          ],
          "why": "Le tempo donne une vitesse ; le groove dépend du placement, des accents, des silences et des relations entre les instruments.",
          "trap": "",
          "evidence": "« Le groove est une relation entre les temps, pas seulement un tempo »"
        },
        {
          "kind": "mécanisme",
          "q": "Pourquoi un deuxième refrain peut-il sembler plus puissant que le premier tout en gardant la même mélodie ?",
          "a": "Parce que l’arrangement peut ajouter des couches, élargir la dynamique ou préparer différemment son arrivée.",
          "choices": [
            "Parce que la répétition rend le refrain subjectivement plus fort, même si l’arrangement et la dynamique restent inchangés.",
            "Parce que le deuxième refrain est généralement transposé, ce qui suffit à créer une impression d’élargissement.",
            "Parce que l’impression de puissance vient principalement d’une accélération du tempo au retour du refrain."
          ],
          "why": "La variation d’orchestration et de dynamique renouvelle une section connue sans lui faire perdre son identité.",
          "trap": "",
          "evidence": "« Répéter crée une attente ; varier empêche l’usure »"
        },
        {
          "kind": "nuance",
          "q": "Pourquoi les étiquettes couplet/refrain ne suffisent-elles pas à analyser toutes les chansons ?",
          "a": "Parce que certains morceaux utilisent des boucles, des formes irrégulières ou donnent des fonctions différentes aux sections.",
          "choices": [
            "Parce qu’aucune chanson populaire n’utilise réellement de sections reconnaissables.",
            "Parce que les couplets et refrains ne peuvent être distingués qu’en lisant une partition classique.",
            "Parce que la structure ne joue aucun rôle dans l’évolution de l’énergie d’un morceau."
          ],
          "why": "Les catégories sont des outils ; la fonction énergétique ou narrative d’une section est souvent plus informative que son nom.",
          "trap": "",
          "evidence": "« Couplet, pré-refrain, refrain : des fonctions plutôt que des règles »"
        },
        {
          "kind": "pratique",
          "q": "Quel exercice révèle le mieux la fabrication d’un refrain ?",
          "a": "Comparer deux refrains successifs et noter ce qui a été ajouté, retiré ou intensifié.",
          "choices": [
            "Compter uniquement le nombre de lettres du nom de l’artiste.",
            "Écouter le morceau en coupant toute la partie rythmique puis ignorer les autres couches.",
            "Chercher d’abord le classement commercial sans réécouter le morceau."
          ],
          "why": "Comparer deux occurrences d’une même section fait ressortir les choix d’arrangement qui passent facilement inaperçus.",
          "trap": "",
          "evidence": "« Une grille d’écoute simple pour n’importe quel morceau »"
        }
      ],
      "learningPath": [
        "Une chanson tient souvent sur quelques éléments très mémorisables — Beaucoup de morceaux pop ou rock utilisent peu de matériaux, mais les combinent avec précision.",
        "Le groove est une relation entre les temps, pas seulement un tempo — Deux morceaux à la même vitesse peuvent donner des sensations radicalement différentes.",
        "Répéter crée une attente ; varier empêche l’usure — Un refrain fonctionne en partie parce qu’il revient.",
        "Couplet, pré-refrain, refrain : des fonctions plutôt que des règles — Le couplet peut développer une histoire ou varier le texte ; le refrain concentre souvent l’idée centrale ; le pré-refrain peut augmenter la tension avant l’arrivée."
      ],
      "editorialFlow": "concept-observation-application",
      "contentRevision": "rc42-catalogue-expansion"
    }
  },
  {
    "chapter": "cinema-shot-frame",
    "meta": {
      "id": "cinema-mise-en-scene-space-light",
      "order": 81,
      "title": "Mise en scène : faire parler l’espace avant le dialogue",
      "shortTitle": "Mise en scène",
      "emoji": "🎬",
      "period": "Langage du cinéma",
      "location": "Plateau et espace filmé",
      "xp": 55,
      "gems": 2,
      "unlocks": [],
      "blocks": []
    },
    "pack": {
      "hook": "Un film peut montrer qu’un personnage domine, se rapproche ou se sent piégé sans lui faire prononcer une seule phrase. La mise en scène raconte avec les corps, les distances, les objets et la lumière. Apprendre à la lire donne immédiatement plus de profondeur à n’importe quelle scène.",
      "keyFacts": [
        "Avant le montage, le plan raconte déjà — La mise en scène désigne la manière d’organiser ce qui existe devant la caméra : acteurs, décors, objets, lumière, déplacements et relations dans l’espace.",
        "Placer un acteur, c’est écrire une relation — Le blocking — le placement et le mouvement des acteurs — permet de raconter sans expliquer.",
        "Profondeur et premier plan distribuent notre attention — Un cadre peut contenir plusieurs actions à différentes distances.",
        "La lumière ne sert pas seulement à rendre visible — Une source dure peut découper les visages et accentuer les contrastes ; une lumière diffuse adoucit les volumes."
      ],
      "express": [
        "La mise en scène organise tout ce qui se trouve devant la caméra avant même le montage.",
        "Le placement et le déplacement des acteurs rendent visibles les relations entre personnages.",
        "Profondeur, lumière et décor distribuent l’attention et peuvent raconter plusieurs choses en même temps."
      ],
      "complete": [
        {
          "title": "1. Avant le montage, le plan raconte déjà",
          "text": "La mise en scène désigne la manière d’organiser ce qui existe devant la caméra : acteurs, décors, objets, lumière, déplacements et relations dans l’espace. Un personnage isolé au fond d’une pièce n’exprime pas la même chose que le même personnage placé au centre d’un groupe. Avant même le dialogue ou le montage, la disposition des corps peut donc rendre visibles une domination, une distance affective, une hésitation ou une alliance."
        },
        {
          "title": "2. Placer un acteur, c’est écrire une relation",
          "text": "Le blocking — le placement et le mouvement des acteurs — permet de raconter sans expliquer. Deux personnes qui parlent côte à côte mais ne se regardent pas peuvent sembler proches physiquement et éloignées émotionnellement. Un personnage qui traverse progressivement le cadre pour rejoindre un autre transforme la relation sous nos yeux. Regarde moins « qui parle ? » et davantage « qui occupe quel espace, et comment cet espace change ? »."
        },
        {
          "title": "3. Profondeur et premier plan distribuent notre attention",
          "text": "Un cadre peut contenir plusieurs actions à différentes distances. Un visage au premier plan peut réagir pendant qu’un événement important se produit derrière lui ; au contraire, une grande profondeur peut nous laisser choisir où regarder. La mise en scène organise donc parfois plusieurs informations simultanément. Elle peut aussi cacher volontairement une information derrière un corps ou un décor pour créer attente, surprise ou ambiguïté."
        },
        {
          "title": "4. La lumière ne sert pas seulement à rendre visible",
          "text": "Une source dure peut découper les visages et accentuer les contrastes ; une lumière diffuse adoucit les volumes. Mais le plus important est souvent la direction : qui est éclairé, qui reste dans l’ombre, quelle zone de la pièce attire l’œil ? Les changements de lumière peuvent accompagner une émotion sans la traduire mécaniquement. Une scène sombre n’est pas automatiquement triste ; tout dépend de la manière dont la lumière organise le regard."
        },
        {
          "title": "5. Les objets et décors peuvent devenir des forces dramatiques",
          "text": "Un couloir étroit, une table trop longue, une porte entrouverte ou un téléphone posé entre deux personnages peuvent structurer une scène. Les décors ne sont pas un fond neutre : ils imposent des chemins, séparent des corps ou créent des lignes visuelles. Un bon réflexe consiste à regarder ce qui empêcherait la scène de fonctionner si on le retirait. L’objet indispensable à la relation est souvent déjà un élément de narration."
        },
        {
          "title": "6. Lire une scène sans chercher le symbole caché",
          "text": "Analyser la mise en scène ne consiste pas à inventer une signification secrète pour chaque couleur. Commence par décrire précisément ce qui change : distance entre les personnages, direction des regards, emplacement dans le cadre, source de lumière, obstacle ou déplacement. Ensuite seulement, propose une interprétation reliée à l’action. Cette méthode garde l’analyse ancrée dans ce que le film fait réellement voir."
        }
      ],
      "deeper": [],
      "takeaways": [
        {
          "label": "Mise en scène",
          "text": "Organisation des corps, décors, objets, lumière et mouvements dans l’espace filmé."
        },
        {
          "label": "Blocking",
          "text": "Placement et déplacements des acteurs."
        },
        {
          "label": "Profondeur",
          "text": "Elle permet de faire coexister plusieurs informations dans un même plan."
        },
        {
          "label": "Méthode",
          "text": "Décrire ce qui change avant d’interpréter."
        }
      ],
      "quiz": [
        {
          "kind": "analyse",
          "q": "Dans une scène de dispute, deux personnages sont séparés par une grande table. Quelle observation relève directement de la mise en scène ?",
          "a": "La table organise physiquement leur distance et peut renforcer la séparation visible entre eux.",
          "choices": [
            "La table indique que le réalisateur veut surtout annoncer l’issue future de leur relation, indépendamment de leurs gestes et dialogues.",
            "La table fonctionne d’abord comme un signe de genre et renseigne davantage sur le type de film que sur la relation entre les personnages.",
            "La géométrie du meuble commande principalement la durée des plans, même si les acteurs restent immobiles."
          ],
          "why": "L’analyse part de l’organisation concrète de l’espace avant de proposer une interprétation ; le décor peut matérialiser une relation sans la décider entièrement.",
          "trap": "",
          "evidence": "« Les objets et décors peuvent devenir des forces dramatiques »"
        },
        {
          "kind": "mécanisme",
          "q": "Pourquoi le déplacement d’un acteur dans le cadre peut-il raconter quelque chose sans dialogue ?",
          "a": "Parce qu’il modifie sa relation spatiale avec les autres personnages et les zones du cadre.",
          "choices": [
            "Parce que le mouvement du corps traduit directement une évolution psychologique, même si sa relation spatiale aux autres reste identique.",
            "Parce que le déplacement oblige généralement la caméra à couper, ce qui produit surtout un effet de montage.",
            "Parce que la distance physique constitue à elle seule un indicateur fiable de proximité affective, quel que soit le contexte de la scène."
          ],
          "why": "Le blocking fait évoluer les distances, les lignes de regard et les positions de pouvoir visibles dans la scène.",
          "trap": "",
          "evidence": "« Placer un acteur, c’est écrire une relation »"
        },
        {
          "kind": "attention",
          "q": "Une action importante se déroule au fond du cadre pendant qu’un visage occupe le premier plan. Qu’est-ce que cette construction permet ?",
          "a": "Faire coexister l’événement et la réaction, en répartissant notre attention dans la profondeur.",
          "choices": [
            "Empêcher le spectateur de percevoir la moindre relation entre les deux actions.",
            "Transformer automatiquement le plan en documentaire, quelle que soit la fiction racontée.",
            "Supprimer tout besoin d’éclairage puisque la profondeur crée elle-même la visibilité."
          ],
          "why": "La profondeur peut superposer plusieurs informations et nous faire lire simultanément événement, réaction ou concurrence entre actions.",
          "trap": "",
          "evidence": "« Profondeur et premier plan distribuent notre attention »"
        },
        {
          "kind": "nuance",
          "q": "Pourquoi « une scène sombre = une scène triste » est-il un mauvais raccourci ?",
          "a": "Parce que la lumière prend son sens par sa direction, son contraste, le contexte et ce qu’elle fait regarder.",
          "choices": [
            "Parce que la lumière n’a jamais aucun effet sur la perception d’une scène.",
            "Parce que seules les couleurs vives peuvent porter une signification dramatique.",
            "Parce que les scènes sombres sont exclusivement utilisées pour les plans extérieurs de nuit."
          ],
          "why": "La luminosité seule ne suffit pas ; il faut observer comment la lumière organise les visages, l’espace et l’attention.",
          "trap": "",
          "evidence": "« La lumière ne sert pas seulement à rendre visible »"
        },
        {
          "kind": "méthode",
          "q": "Quelle est la meilleure première étape pour analyser la mise en scène ?",
          "a": "Décrire précisément positions, déplacements, regards, lumière et obstacles avant d’interpréter.",
          "choices": [
            "Chercher immédiatement un symbole caché pour chaque objet visible dans le décor.",
            "Lire le résumé du film puis décider ce que chaque plan doit forcément signifier.",
            "Compter les coupes du montage sans regarder l’organisation de l’espace dans le plan."
          ],
          "why": "Une description observable protège contre la surinterprétation et permet de relier ensuite les choix visuels à l’action dramatique.",
          "trap": "",
          "evidence": "« Lire une scène sans chercher le symbole caché »"
        }
      ],
      "learningPath": [
        "Avant le montage, le plan raconte déjà — La mise en scène désigne la manière d’organiser ce qui existe devant la caméra : acteurs, décors, objets, lumière, déplacements et relations dans l’espace.",
        "Placer un acteur, c’est écrire une relation — Le blocking — le placement et le mouvement des acteurs — permet de raconter sans expliquer.",
        "Profondeur et premier plan distribuent notre attention — Un cadre peut contenir plusieurs actions à différentes distances.",
        "La lumière ne sert pas seulement à rendre visible — Une source dure peut découper les visages et accentuer les contrastes ; une lumière diffuse adoucit les volumes."
      ],
      "editorialFlow": "concept-observation-application",
      "contentRevision": "rc42-catalogue-expansion"
    }
  },
  {
    "chapter": "cinema-editing-sound",
    "meta": {
      "id": "cinema-sound-offscreen-silence",
      "order": 2,
      "title": "Son, silence, hors-champ : le film continue les yeux fermés",
      "shortTitle": "Son & hors-champ",
      "emoji": "🎧",
      "period": "Langage du cinéma",
      "location": "Bande-son et montage",
      "xp": 55,
      "gems": 2,
      "unlocks": [],
      "blocks": []
    },
    "pack": {
      "hook": "Ferme les yeux devant une scène : tu continues souvent à comprendre où tu es, qui approche et ce qui menace. Le son construit de l’espace, du suspense et des transitions. Il ne vient pas après l’image : il raconte avec elle.",
      "keyFacts": [
        "Un film continue quand l’image ne montre rien — Le son peut faire exister une pièce, une foule ou une menace située hors du cadre.",
        "Son dans le monde du film ou musique pour le spectateur — Un dialogue, une radio allumée dans la scène ou le moteur d’une voiture appartiennent au monde vécu par les personnages.",
        "Le hors-champ sonore fabrique l’attente — Ce que nous entendons sans le voir devient une promesse d’image.",
        "Un pont sonore peut relier deux espaces ou deux temps — Le son d’une scène peut commencer avant que l’image suivante apparaisse, ou continuer après la coupe."
      ],
      "express": [
        "Un son hors champ fait exister une source invisible et agrandit l’espace du film.",
        "Le film peut jouer entre sons entendus par les personnages et musique destinée au spectateur.",
        "Ponts sonores et silences modifient la continuité, l’attente et l’attention sans changer nécessairement l’image."
      ],
      "complete": [
        {
          "title": "1. Un film continue quand l’image ne montre rien",
          "text": "Le son peut faire exister une pièce, une foule ou une menace située hors du cadre. Un bruit de pas derrière une porte suffit parfois à agrandir l’espace bien au-delà de ce que la caméra montre. Le cinéma ne construit donc pas seulement un champ visuel : il construit un monde sonore. Écouter ce qui vient d’ailleurs permet de comprendre comment un film suggère sans montrer et dirige notre imagination."
        },
        {
          "title": "2. Son dans le monde du film ou musique pour le spectateur",
          "text": "Un dialogue, une radio allumée dans la scène ou le moteur d’une voiture appartiennent au monde vécu par les personnages. Une musique ajoutée pour accompagner l’émotion peut n’être entendue que par le spectateur. Ces catégories sont utiles, mais les films jouent souvent avec leur frontière : une chanson commence comme musique extérieure puis on découvre sa source dans la pièce, ou l’inverse. Ce glissement change notre relation à la scène."
        },
        {
          "title": "3. Le hors-champ sonore fabrique l’attente",
          "text": "Ce que nous entendons sans le voir devient une promesse d’image. Un cri dans une autre pièce pose immédiatement une question : qui crie, pourquoi, et quand la caméra nous montrera-t-elle la source ? Le réalisateur peut retarder cette révélation ou ne jamais la donner. Le son hors-champ est donc un puissant outil de suspense, mais aussi de réalisme : un lieu semble habité parce qu’il produit des sons au-delà du cadre."
        },
        {
          "title": "4. Un pont sonore peut relier deux espaces ou deux temps",
          "text": "Le son d’une scène peut commencer avant que l’image suivante apparaisse, ou continuer après la coupe. Ce pont rend la transition plus fluide ou crée une relation d’idée entre deux moments. Entendre une sirène avant de découvrir l’ambulance prépare notre lecture ; laisser une phrase se poursuivre sur une autre image peut lui donner un nouveau sens. Le montage sonore organise donc des liens que le montage visuel seul ne produit pas."
        },
        {
          "title": "5. Le silence est un contraste, pas un vide absolu",
          "text": "Au cinéma, un « silence » contient souvent respiration, froissement ou ambiance très faible. Son efficacité vient du contraste avec ce qui précédait. Après une scène saturée de musique et de bruit, une chute sonore peut rendre un geste minuscule extrêmement présent. Le silence attire l’attention parce qu’il change brutalement notre niveau d’écoute. Il peut créer intimité, malaise ou concentration sans qu’un effet musical nous dise quoi ressentir."
        },
        {
          "title": "6. Une méthode : fermer les yeux trente secondes",
          "text": "Choisis une scène que tu connais et écoute-la brièvement sans regarder l’écran. Peux-tu deviner la taille du lieu, les distances, ce qui se passe hors champ, ou le moment où une coupe approche ? Puis regarde à nouveau et compare ce que le son t’avait fait imaginer. Cet exercice montre que la bande-son possède sa propre mise en scène et qu’elle guide constamment notre compréhension de l’espace et du récit."
        }
      ],
      "deeper": [],
      "takeaways": [
        {
          "label": "Hors-champ",
          "text": "Le son rend présent ce que la caméra ne montre pas."
        },
        {
          "label": "Diégèse",
          "text": "Certains sons appartiennent au monde vécu par les personnages."
        },
        {
          "label": "Pont sonore",
          "text": "Un son peut chevaucher une coupe et relier deux scènes."
        },
        {
          "label": "Silence",
          "text": "Son pouvoir vient souvent du contraste avec ce qui précédait."
        }
      ],
      "quiz": [
        {
          "kind": "écoute",
          "q": "Un personnage regarde une porte fermée et nous entendons des pas derrière. Que fait principalement le son ?",
          "a": "Il fait exister un espace et une présence hors du cadre avant qu’ils soient montrés.",
          "choices": [
            "Il prépare surtout une révélation visuelle immédiate de la source sonore dans le plan suivant.",
            "Il fonctionne comme une forme de narration extérieure dès lors que sa source reste hors de l’image.",
            "Il fournit assez d’informations sur l’espace pour que le cadrage visuel joue ensuite un rôle secondaire."
          ],
          "why": "Le hors-champ sonore agrandit l’espace perçu et crée une attente sans obliger le film à montrer immédiatement la source.",
          "trap": "",
          "evidence": "« Le hors-champ sonore fabrique l’attente »"
        },
        {
          "kind": "distinction",
          "q": "Une chanson sort d’une radio visible dans la pièce. Comment la comprendre d’abord ?",
          "a": "Comme un son appartenant au monde de la scène, que les personnages peuvent en principe entendre.",
          "choices": [
            "Comme une musique nécessairement ajoutée uniquement pour le spectateur au montage final.",
            "Comme un silence musical puisque sa source apparaît à l’image.",
            "Comme un bruitage sans rapport avec l’espace ou les personnages."
          ],
          "why": "Une source présente dans le monde filmé rend le son diégétique ; le film peut ensuite jouer avec cette frontière.",
          "trap": "",
          "evidence": "« Son dans le monde du film ou musique pour le spectateur »"
        },
        {
          "kind": "montage",
          "q": "Pourquoi faire commencer le son de la scène suivante avant le changement d’image ?",
          "a": "Pour préparer ou relier la transition grâce à un pont sonore.",
          "choices": [
            "Pour empêcher le spectateur de comprendre que l’image va changer.",
            "Pour garantir que les deux scènes se déroulent exactement au même endroit.",
            "Pour supprimer le besoin de toute continuité narrative entre les deux moments."
          ],
          "why": "Le chevauchement son/image peut rendre une coupe fluide, anticiper un lieu ou créer une association de sens entre deux scènes.",
          "trap": "",
          "evidence": "« Un pont sonore peut relier deux espaces ou deux temps »"
        },
        {
          "kind": "nuance",
          "q": "Pourquoi un silence cinématographique peut-il être très expressif ?",
          "a": "Parce que la réduction sonore contraste avec ce qui précède et rend certains détails soudain très présents.",
          "choices": [
            "Parce qu’un silence signifie toujours exactement la même émotion dans tous les genres.",
            "Parce que le silence empêche le spectateur de percevoir les gestes ou les expressions.",
            "Parce qu’il est techniquement impossible d’enregistrer une ambiance faible pendant un silence."
          ],
          "why": "Le silence agit surtout comme changement de régime sonore ; son sens dépend du contexte et des sons qui restent perceptibles.",
          "trap": "",
          "evidence": "« Le silence est un contraste, pas un vide absolu »"
        },
        {
          "kind": "pratique",
          "q": "Quel exercice aide le mieux à comprendre la mise en scène sonore ?",
          "a": "Écouter une scène les yeux fermés puis comparer l’espace imaginé avec les images.",
          "choices": [
            "Regarder les sous-titres sans écouter aucun son et conclure que la bande-son est secondaire.",
            "Compter le nombre de plans tout en coupant totalement le son du début à la fin.",
            "Lire uniquement la liste des acteurs avant de regarder la séquence."
          ],
          "why": "Priver temporairement l’écoute de l’image fait apparaître tout ce que le son nous apprend sur espace, distance, rythme et hors-champ.",
          "trap": "",
          "evidence": "« Une méthode : fermer les yeux trente secondes »"
        }
      ],
      "learningPath": [
        "Un film continue quand l’image ne montre rien — Le son peut faire exister une pièce, une foule ou une menace située hors du cadre.",
        "Son dans le monde du film ou musique pour le spectateur — Un dialogue, une radio allumée dans la scène ou le moteur d’une voiture appartiennent au monde vécu par les personnages.",
        "Le hors-champ sonore fabrique l’attente — Ce que nous entendons sans le voir devient une promesse d’image.",
        "Un pont sonore peut relier deux espaces ou deux temps — Le son d’une scène peut commencer avant que l’image suivante apparaisse, ou continuer après la coupe."
      ],
      "editorialFlow": "concept-observation-application",
      "contentRevision": "rc42-catalogue-expansion"
    }
  },
  {
    "chapter": "geo-cities",
    "meta": {
      "id": "geo-urban-sprawl-mobility",
      "order": 2,
      "title": "Étalement urbain : logement, distance et mobilité",
      "shortTitle": "Étalement urbain",
      "emoji": "🏘️",
      "period": "XXe–XXIe siècles",
      "location": "Métropoles et périphéries",
      "xp": 55,
      "gems": 2,
      "unlocks": [],
      "blocks": []
    },
    "pack": {
      "hook": "Une maison moins chère à vingt kilomètres du centre peut-elle vraiment être « moins chère » si elle impose deux voitures et des trajets quotidiens ? L’étalement urbain se comprend en reliant logement, foncier, transport et accès aux services.",
      "keyFacts": [
        "Une ville peut grandir sans gagner beaucoup d’habitants — L’étalement urbain désigne l’extension des surfaces urbanisées vers des espaces auparavant moins bâtis.",
        "Le prix du sol pousse certaines fonctions vers la périphérie — Au centre, le foncier est souvent plus rare et plus cher.",
        "La mobilité relie l’habitat dispersé au reste de la ville — Plus les destinations sont éloignées et spécialisées, plus les déplacements deviennent importants.",
        "Densité ne signifie pas forcément tours, ni étalement maisons individuelles — Une ville dense peut être composée d’immeubles de quelques étages, de rues mixtes et de petits espaces publics."
      ],
      "express": [
        "L’étalement mesure l’extension de l’espace urbanisé, pas seulement la croissance du nombre d’habitants.",
        "Prix du sol, urbanisme, crédit et infrastructures structurent fortement la localisation des ménages et activités.",
        "Les formes urbaines créent des contraintes de mobilité et répartissent leurs coûts de manière inégale."
      ],
      "complete": [
        {
          "title": "1. Une ville peut grandir sans gagner beaucoup d’habitants",
          "text": "L’étalement urbain désigne l’extension des surfaces urbanisées vers des espaces auparavant moins bâtis. Il peut se produire même lorsque la population augmente peu, si les logements deviennent plus grands, si les activités se dispersent ou si l’on construit à faible densité. Regarder uniquement le nombre d’habitants masque donc une dimension essentielle : combien d’espace est consommé pour loger, travailler, se déplacer et accéder aux services."
        },
        {
          "title": "2. Le prix du sol pousse certaines fonctions vers la périphérie",
          "text": "Au centre, le foncier est souvent plus rare et plus cher. Des ménages cherchent davantage d’espace résidentiel ; des entrepôts ou commerces ont besoin de grandes parcelles ; des entreprises privilégient l’accès routier. Ces choix peuvent déplacer activités et habitat vers la périphérie. Mais parler d’un simple « choix individuel » serait incomplet : les règles d’urbanisme, l’offre de transport, le crédit et l’histoire du territoire structurent fortement les options disponibles."
        },
        {
          "title": "3. La mobilité relie l’habitat dispersé au reste de la ville",
          "text": "Plus les destinations sont éloignées et spécialisées, plus les déplacements deviennent importants. Si les transports collectifs sont rares et les distances grandes, la voiture peut devenir une contrainte plutôt qu’une préférence. Cela influence le budget des ménages, les émissions et l’accès à l’emploi. À l’inverse, densifier autour de lignes de transport peut rapprocher davantage d’habitants des services, à condition que le logement reste accessible."
        },
        {
          "title": "4. Densité ne signifie pas forcément tours, ni étalement maisons individuelles",
          "text": "Une ville dense peut être composée d’immeubles de quelques étages, de rues mixtes et de petits espaces publics. Une zone pavillonnaire peut aussi accueillir des services de proximité et plusieurs formes de logement. Les oppositions caricaturales empêchent de raisonner. Ce qui compte est la combinaison entre densité, mixité des fonctions, qualité des espaces, réseaux de transport et prix du logement."
        },
        {
          "title": "5. Les coûts sont répartis de manière inégale",
          "text": "Une maison plus loin du centre peut être moins chère à l’achat mais entraîner davantage de dépenses de transport. Un changement du prix du carburant touche alors différemment un ménage dépendant de la voiture et un ménage proche d’un réseau ferré. Les politiques de limitation de l’étalement peuvent aussi renchérir le foncier si l’offre de logements n’évolue pas. L’analyse géographique doit donc regarder les effets sociaux en même temps que les effets spatiaux."
        },
        {
          "title": "6. Lire une périphérie : relier formes urbaines et réseaux",
          "text": "Sur une carte ou une photo aérienne, observe la continuité du bâti, la taille des parcelles, les axes routiers, les gares, les zones commerciales et la distance aux services. Demande ensuite quels déplacements cette organisation rend faciles ou difficiles. Cette lecture permet de comprendre l’étalement comme un système habitat-emploi-mobilité, pas seulement comme une tache urbaine qui devient plus grande."
        }
      ],
      "deeper": [],
      "takeaways": [
        {
          "label": "Étalement",
          "text": "Davantage de surface urbanisée pour organiser habitat, activités et réseaux."
        },
        {
          "label": "Mobilité",
          "text": "Les distances et alternatives disponibles conditionnent les déplacements."
        },
        {
          "label": "Densité",
          "text": "Elle peut prendre de nombreuses formes autres que les tours."
        },
        {
          "label": "Équité",
          "text": "Le coût d’une même politique varie selon la localisation et les alternatives."
        }
      ],
      "quiz": [
        {
          "kind": "définition",
          "q": "Qu’est-ce que l’étalement urbain mesure surtout ?",
          "a": "L’extension des surfaces urbanisées et la manière dont les activités et logements occupent davantage d’espace.",
          "choices": [
            "Uniquement la hausse du nombre d’habitants à l’intérieur des limites administratives de la ville.",
            "Seulement la construction d’immeubles de grande hauteur dans les quartiers centraux.",
            "La quantité de transports publics présents dans une agglomération, sans lien avec le bâti."
          ],
          "why": "Une ville peut consommer davantage de sol sans connaître une forte croissance démographique ; surface urbanisée et population ne sont pas la même variable.",
          "trap": "",
          "evidence": "« Une ville peut grandir sans gagner beaucoup d’habitants »"
        },
        {
          "kind": "mécanisme",
          "q": "Pourquoi la dépendance automobile peut-elle augmenter dans une périphérie dispersée ?",
          "a": "Parce que les distances entre logement, emploi et services augmentent alors que les alternatives collectives peuvent rester limitées.",
          "choices": [
            "Parce que les habitants de périphérie préfèrent nécessairement la voiture quels que soient les réseaux disponibles.",
            "Parce que tout logement individuel interdit juridiquement l’usage du bus ou du train.",
            "Parce que la densité faible réduit automatiquement la distance entre toutes les destinations."
          ],
          "why": "La forme urbaine et l’offre de transport rendent certaines mobilités plus ou moins praticables ; la voiture peut devenir une contrainte d’organisation.",
          "trap": "",
          "evidence": "« La mobilité relie l’habitat dispersé au reste de la ville »"
        },
        {
          "kind": "nuance",
          "q": "Pourquoi « densifier = construire des tours » est-il un mauvais raccourci ?",
          "a": "Parce qu’une densité élevée peut aussi venir d’immeubles moyens, de parcelles compactes et d’une forte mixité des fonctions.",
          "choices": [
            "Parce que la densité décrit surtout la hauteur moyenne des bâtiments, plus que le nombre de logements rapporté à une surface.",
            "Parce que les tours consomment beaucoup de sol au pied des bâtiments et produisent donc souvent une densité plus faible que les quartiers pavillonnaires.",
            "Parce que la consommation d’espace dépend principalement de la croissance démographique, beaucoup moins de la forme des quartiers."
          ],
          "why": "La densité est un rapport entre population ou constructions et surface ; plusieurs formes architecturales peuvent produire des niveaux proches.",
          "trap": "",
          "evidence": "« Densité ne signifie pas forcément tours, ni étalement maisons individuelles »"
        },
        {
          "kind": "équité",
          "q": "Pourquoi une hausse du carburant n’affecte-t-elle pas tous les ménages de la même façon ?",
          "a": "Parce que leur dépendance aux déplacements motorisés et leur accès aux alternatives diffèrent selon leur localisation.",
          "choices": [
            "Parce que le prix du carburant varie automatiquement selon le revenu déclaré de chaque ménage.",
            "Parce que seuls les habitants des centres-villes possèdent des véhicules motorisés.",
            "Parce que les distances domicile-travail sont identiques pour tous à l’intérieur d’une métropole."
          ],
          "why": "La géographie des réseaux et des lieux de vie crée des contraintes de mobilité très différentes, donc des expositions différentes à un même prix.",
          "trap": "",
          "evidence": "« Les coûts sont répartis de manière inégale »"
        },
        {
          "kind": "lecture",
          "q": "Sur une photo aérienne, quel ensemble d’indices aide le mieux à analyser l’étalement ?",
          "a": "Continuité du bâti, taille des parcelles, axes, gares, zones d’activité et distance aux services.",
          "choices": [
            "La couleur du logo de la commune et le nombre de lettres de son nom.",
            "Uniquement l’altitude du point le plus haut sans regarder les réseaux ni le bâti.",
            "Le nombre de monuments historiques, indépendamment de l’organisation des logements et déplacements."
          ],
          "why": "L’étalement se comprend en reliant formes bâties, fonctions et réseaux de mobilité plutôt qu’en regardant une seule caractéristique.",
          "trap": "",
          "evidence": "« Lire une périphérie : relier formes urbaines et réseaux »"
        }
      ],
      "learningPath": [
        "Une ville peut grandir sans gagner beaucoup d’habitants — L’étalement urbain désigne l’extension des surfaces urbanisées vers des espaces auparavant moins bâtis.",
        "Le prix du sol pousse certaines fonctions vers la périphérie — Au centre, le foncier est souvent plus rare et plus cher.",
        "La mobilité relie l’habitat dispersé au reste de la ville — Plus les destinations sont éloignées et spécialisées, plus les déplacements deviennent importants.",
        "Densité ne signifie pas forcément tours, ni étalement maisons individuelles — Une ville dense peut être composée d’immeubles de quelques étages, de rues mixtes et de petits espaces publics."
      ],
      "editorialFlow": "concept-observation-application",
      "contentRevision": "rc42-catalogue-expansion"
    }
  },
  {
    "chapter": "geo-flows",
    "meta": {
      "id": "geo-migration-routes-networks-borders",
      "order": 2,
      "title": "Migrations : routes, réseaux et frontières",
      "shortTitle": "Migrations",
      "emoji": "🧭",
      "period": "Monde contemporain",
      "location": "Routes migratoires et territoires",
      "xp": 55,
      "gems": 2,
      "unlocks": [],
      "blocks": []
    },
    "pack": {
      "hook": "Une grande flèche sur une carte donne l’impression qu’une migration relie directement un point A à un point B. En réalité, les parcours dépendent de ressources, de réseaux, de frontières, d’étapes et de projets qui changent en route.",
      "keyFacts": [
        "Une migration est une trajectoire, pas une simple flèche — Les cartes représentent souvent les migrations par une flèche entre un pays de départ et un pays d’arrivée.",
        "« Push-pull » aide à commencer, mais pas à expliquer tout — On distingue parfois des facteurs qui poussent au départ — conflit, chômage, catastrophe — et d’autres qui attirent — emploi, sécurité, famille.",
        "Les réseaux personnels façonnent les destinations — Une destination devient plus accessible lorsqu’un proche peut fournir une information, un hébergement temporaire ou un contact professionnel.",
        "La frontière n’est pas seulement une ligne — Visa, contrôle, mer, désert, coût du transport, accords entre États ou politiques d’asile transforment les itinéraires."
      ],
      "express": [
        "Une migration est une trajectoire faite d’étapes et de temporalités, pas seulement un départ et une arrivée.",
        "Les raisons de partir ne suffisent pas : moyens, informations, documents et réseaux conditionnent la possibilité de migrer.",
        "Les frontières transforment les routes et les risques ; les réseaux personnels contribuent à concentrer certains flux."
      ],
      "complete": [
        {
          "title": "1. Une migration est une trajectoire, pas une simple flèche",
          "text": "Les cartes représentent souvent les migrations par une flèche entre un pays de départ et un pays d’arrivée. Cette simplification cache les étapes, retours, détours, séjours temporaires et changements de projet. Beaucoup de mobilités sont régionales plutôt qu’intercontinentales. D’autres s’effectuent d’abord vers une ville proche. Comprendre une migration exige donc de regarder le parcours et sa durée, pas seulement deux points reliés sur une carte."
        },
        {
          "title": "2. « Push-pull » aide à commencer, mais pas à expliquer tout",
          "text": "On distingue parfois des facteurs qui poussent au départ — conflit, chômage, catastrophe — et d’autres qui attirent — emploi, sécurité, famille. Cette grille est utile mais trop simple si elle ignore les ressources nécessaires pour partir, les informations disponibles et les contraintes juridiques. Les personnes les plus exposées à une crise ne sont pas toujours celles qui peuvent migrer le plus loin. La mobilité dépend aussi de la capacité à transformer un projet en trajet réel."
        },
        {
          "title": "3. Les réseaux personnels façonnent les destinations",
          "text": "Une destination devient plus accessible lorsqu’un proche peut fournir une information, un hébergement temporaire ou un contact professionnel. Ces réseaux expliquent pourquoi des flux se concentrent parfois sur quelques villes plutôt que de se répartir uniformément. Une migration antérieure peut donc faciliter les suivantes. Ce mécanisme ne supprime ni les frontières ni les coûts, mais il modifie la carte des possibilités perçues et réelles."
        },
        {
          "title": "4. La frontière n’est pas seulement une ligne",
          "text": "Visa, contrôle, mer, désert, coût du transport, accords entre États ou politiques d’asile transforment les itinéraires. Renforcer un passage peut déplacer les routes vers un autre, parfois plus dangereux, sans supprimer le projet migratoire. La frontière fonctionne ainsi comme un ensemble de dispositifs distribués : consulats, compagnies de transport, bases de données, contrôles intérieurs et règles d’accès au travail participent aussi à la sélection des mobilités."
        },
        {
          "title": "5. Partir transforme aussi le lieu d’origine",
          "text": "Les migrants peuvent envoyer une partie de leurs revenus, transmettre des informations, investir ou maintenir des liens politiques et familiaux. Les départs peuvent alléger certaines tensions sur l’emploi mais aussi priver un territoire de compétences rares. Les effets dépendent du nombre de départs, des profils concernés et de la durée. Une migration ne relie donc pas seulement un individu à une destination : elle crée souvent un espace de relations entre plusieurs lieux."
        },
        {
          "title": "6. Lire une carte migratoire sans lui faire dire trop",
          "text": "Une grande flèche peut représenter un flux annuel, un stock de personnes nées à l’étranger ou une estimation sur plusieurs années : ce ne sont pas les mêmes choses. Vérifie toujours l’unité, la période et la définition utilisée. Demande ensuite quels trajets intermédiaires ou quelles mobilités courtes disparaissent de la représentation. La carte est un outil de synthèse puissant, mais elle peut fabriquer une impression de mouvement massif si l’on oublie son échelle et ses conventions."
        }
      ],
      "deeper": [],
      "takeaways": [
        {
          "label": "Trajectoire",
          "text": "Les migrations comportent souvent étapes, retours et changements de projet."
        },
        {
          "label": "Capacité",
          "text": "Vouloir partir et pouvoir partir sont deux choses différentes."
        },
        {
          "label": "Réseaux",
          "text": "Les contacts réduisent certains coûts et orientent les destinations."
        },
        {
          "label": "Carte",
          "text": "Toujours vérifier indicateur, période et définition avant de lire une flèche."
        }
      ],
      "quiz": [
        {
          "kind": "nuance",
          "q": "Pourquoi une flèche entre deux pays donne-t-elle une vision incomplète d’une migration ?",
          "a": "Parce qu’elle masque souvent étapes, retours, durée, détours et changements de projet.",
          "choices": [
            "Parce qu’une migration ne relie jamais deux territoires différents.",
            "Parce que toutes les personnes migrantes utilisent exactement le même itinéraire.",
            "Parce que les cartes ne peuvent représenter que des déplacements touristiques."
          ],
          "why": "La trajectoire réelle peut comporter plusieurs lieux et temporalités ; le point de départ et la destination finale ne résument pas tout le parcours.",
          "trap": "",
          "evidence": "« Une migration est une trajectoire, pas une simple flèche »"
        },
        {
          "kind": "raisonnement",
          "q": "Deux régions connaissent la même crise, mais les départs internationaux sont plus nombreux dans celle où les ménages disposent de davantage de ressources et de réseaux. Quelle idée cela illustre ?",
          "a": "Subir une forte contrainte ne suffit pas : migrer dépend aussi des moyens, informations et connexions permettant de partir.",
          "choices": [
            "Les crises expliquent à elles seules l’intensité des départs ; les différences de ressources jouent surtout après l’arrivée.",
            "Les réseaux familiaux facilitent surtout l’intégration après l’arrivée, mais orientent peu la destination choisie avant le départ.",
            "À contrainte comparable, les écarts de départs reflètent surtout des préférences culturelles différentes plutôt que des capacités matérielles."
          ],
          "why": "Le modèle push-pull doit être complété par la capacité à agir : coût du trajet, documents, contacts et informations conditionnent la réalisation du projet.",
          "trap": "",
          "evidence": "« « Push-pull » aide à commencer, mais pas à expliquer tout »"
        },
        {
          "kind": "réseau",
          "q": "Comment un réseau migratoire peut-il renforcer un flux vers une ville précise ?",
          "a": "Des personnes déjà installées peuvent réduire l’incertitude en fournissant informations, contacts ou hébergement.",
          "choices": [
            "La présence d’un proche réduit suffisamment les obstacles pour que les règles de visa deviennent secondaires dans le choix du trajet.",
            "Un réseau tend à homogénéiser presque entièrement les destinations parce que chacun reproduit le parcours des premiers migrants.",
            "Les informations fournies par des proches réduisent surtout le coût financier du transport, davantage que l’incertitude ou l’hébergement."
          ],
          "why": "Les réseaux diminuent certains coûts et risques sans supprimer les contraintes institutionnelles ; ils orientent ainsi les destinations accessibles.",
          "trap": "",
          "evidence": "« Les réseaux personnels façonnent les destinations »"
        },
        {
          "kind": "frontière",
          "q": "Pourquoi fermer un passage ne supprime-t-il pas forcément un flux migratoire ?",
          "a": "Parce que les itinéraires peuvent se déplacer vers d’autres routes si les raisons et capacités de partir subsistent.",
          "choices": [
            "Parce qu’une frontière physique n’a jamais aucun effet sur le coût ou le risque d’un trajet.",
            "Parce que tous les États doivent laisser ouverts exactement les mêmes points de passage.",
            "Parce qu’un trajet international est indépendant des politiques de visa ou de contrôle."
          ],
          "why": "Les contrôles modifient coûts, risques et routes ; ils peuvent transformer la géographie du flux plutôt que supprimer toutes les mobilités.",
          "trap": "",
          "evidence": "« La frontière n’est pas seulement une ligne »"
        },
        {
          "kind": "carte",
          "q": "Avant de comparer deux cartes de migrations, que faut-il vérifier en priorité ?",
          "a": "Si elles représentent le même indicateur, la même période et la même définition des personnes comptées.",
          "choices": [
            "Si les flèches utilisent exactement la même couleur, quel que soit l’indicateur.",
            "Si les deux cartes ont été imprimées sur un papier de même taille.",
            "Si le nom des pays est écrit avec la même police de caractères."
          ],
          "why": "Un stock, un flux annuel et un cumul pluriannuel peuvent produire des images très différentes ; la légende et la période sont donc indispensables.",
          "trap": "",
          "evidence": "« Lire une carte migratoire sans lui faire dire trop »"
        }
      ],
      "learningPath": [
        "Une migration est une trajectoire, pas une simple flèche — Les cartes représentent souvent les migrations par une flèche entre un pays de départ et un pays d’arrivée.",
        "« Push-pull » aide à commencer, mais pas à expliquer tout — On distingue parfois des facteurs qui poussent au départ — conflit, chômage, catastrophe — et d’autres qui attirent — emploi, sécurité, famille.",
        "Les réseaux personnels façonnent les destinations — Une destination devient plus accessible lorsqu’un proche peut fournir une information, un hébergement temporaire ou un contact professionnel.",
        "La frontière n’est pas seulement une ligne — Visa, contrôle, mer, désert, coût du transport, accords entre États ou politiques d’asile transforment les itinéraires."
      ],
      "editorialFlow": "concept-observation-application",
      "contentRevision": "rc42-catalogue-expansion"
    }
  },
  {
    "chapter": "art-avantgardes",
    "meta": {
      "id": "art-abstraction-color-form",
      "order": 4,
      "title": "Abstraction : couleur, forme et rythme sans récit imposé",
      "shortTitle": "Abstraction",
      "emoji": "🔷",
      "period": "XXe siècle",
      "location": "Europe et États-Unis",
      "xp": 55,
      "gems": 2,
      "unlocks": [],
      "blocks": []
    },
    "pack": {
      "hook": "Devant une toile abstraite, la mauvaise question est souvent « qu’est-ce que ça représente ? ». La meilleure peut être : « qu’est-ce que mes yeux sont en train de faire ? ». Couleur, ligne, répétition et matière peuvent construire une expérience sans raconter une scène.",
      "keyFacts": [
        "Abstraire ne veut pas dire « ne rien représenter » — L’abstraction réduit, transforme ou abandonne la représentation reconnaissable pour faire travailler directement couleur, ligne, forme, rythme et matière.",
        "La couleur peut organiser une tension sans raconter une histoire — Un rouge dense contre un bleu froid, une zone claire entourée de noir ou une série de tons proches produisent des relations visuelles avant toute interprétation symbolique.",
        "Kandinsky : chercher une nécessité visuelle plutôt qu’un code secret — Kandinsky associe peinture, musique et intériorité, mais ses œuvres ne se résument pas à une traduction mécanique de sons en couleurs.",
        "Mondrian : réduire pour rendre les relations visibles — Chez Mondrian, la grille, les verticales et horizontales, les rectangles et un nombre limité de couleurs ne sont pas une décoration minimaliste choisie au hasard."
      ],
      "express": [
        "L’abstraction déplace l’attention de la ressemblance vers les relations entre formes, couleurs et matière.",
        "Une couleur ne possède pas un sens universel : son effet dépend de ce qui l’entoure et de sa place dans la composition.",
        "Kandinsky, Mondrian et les abstractions gestuelles montrent qu’il existe plusieurs façons radicalement différentes de ne pas représenter."
      ],
      "complete": [
        {
          "title": "1. Abstraire ne veut pas dire « ne rien représenter »",
          "text": "L’abstraction réduit, transforme ou abandonne la représentation reconnaissable pour faire travailler directement couleur, ligne, forme, rythme et matière. Certaines œuvres partent d’un paysage ou d’un objet puis le simplifient ; d’autres sont non figuratives dès leur conception. Parler d’abstraction comme d’un simple refus de dessiner « correctement » manque donc le sujet : la question devient ce que l’œuvre peut construire quand la ressemblance n’est plus son principal critère."
        },
        {
          "title": "2. La couleur peut organiser une tension sans raconter une histoire",
          "text": "Un rouge dense contre un bleu froid, une zone claire entourée de noir ou une série de tons proches produisent des relations visuelles avant toute interprétation symbolique. Les artistes abstraits explorent ces effets de contraste, de poids et de vibration. Il n’existe pas un dictionnaire universel où rouge signifie toujours passion. Commence plutôt par observer comment une couleur se comporte par rapport aux autres et quelle partie du tableau elle rend dominante."
        },
        {
          "title": "3. Kandinsky : chercher une nécessité visuelle plutôt qu’un code secret",
          "text": "Kandinsky associe peinture, musique et intériorité, mais ses œuvres ne se résument pas à une traduction mécanique de sons en couleurs. Lignes, masses et directions créent des tensions qui peuvent rappeler un rythme ou un mouvement. Pour regarder ses compositions, suis une forme, observe où elle rencontre une autre, puis repère les répétitions et ruptures. Cette approche est plus féconde que d’essayer de deviner ce que « représente » chaque tache."
        },
        {
          "title": "4. Mondrian : réduire pour rendre les relations visibles",
          "text": "Chez Mondrian, la grille, les verticales et horizontales, les rectangles et un nombre limité de couleurs ne sont pas une décoration minimaliste choisie au hasard. La réduction rend extrêmement perceptibles les rapports de taille, de position et d’équilibre. Déplacer une ligne de quelques centimètres changerait toute la composition. L’abstraction montre ici qu’un vocabulaire restreint peut produire une grande complexité de relations."
        },
        {
          "title": "5. Le geste et la matière ouvrent d’autres voies",
          "text": "Toute abstraction n’est pas géométrique. Des artistes mettent au premier plan la trace du geste, l’épaisseur de la peinture, la vitesse ou la répétition. L’œuvre peut alors conserver l’empreinte d’une action plutôt qu’une image du monde. Cela change la manière de regarder : on peut imaginer le mouvement du corps, la résistance du matériau ou le temps nécessaire pour accumuler les marques visibles sur la surface."
        },
        {
          "title": "6. Comment regarder une œuvre abstraite sans rester bloqué",
          "text": "Commence par trois questions descriptives : où va ton regard en premier, quelles formes ou couleurs se répètent, et où se trouve la plus forte tension ? Ensuite, formule une hypothèse : la composition paraît-elle stable, instable, expansive, compacte ? Enfin, cherche dans l’œuvre un élément qui confirme ou contredit ton impression. Tu n’as pas besoin de trouver « la bonne histoire » ; tu dois relier ton interprétation à des relations visibles."
        }
      ],
      "deeper": [],
      "takeaways": [
        {
          "label": "Abstraction",
          "text": "La ressemblance cesse d’être le critère principal de l’œuvre."
        },
        {
          "label": "Couleur",
          "text": "Elle agit par contraste et relation, pas par dictionnaire symbolique fixe."
        },
        {
          "label": "Réduction",
          "text": "Peu d’éléments peuvent rendre chaque rapport plus intense."
        },
        {
          "label": "Regard",
          "text": "Décrire les tensions visibles avant d’inventer une interprétation."
        }
      ],
      "quiz": [
        {
          "kind": "concept",
          "q": "Qu’est-ce qui définit le mieux l’abstraction en art ?",
          "a": "Le fait de faire travailler formes, couleurs, lignes ou matière sans faire de la ressemblance reconnaissable le critère principal.",
          "choices": [
            "L’interdiction d’utiliser toute couleur présente dans le monde réel.",
            "L’obligation de peindre uniquement des formes géométriques à angles droits.",
            "L’absence totale de choix de composition ou de référence à une expérience visuelle."
          ],
          "why": "L’abstraction peut être géométrique, gestuelle ou issue d’une simplification du réel ; son point commun est de déplacer le centre de gravité hors de la ressemblance.",
          "trap": "",
          "evidence": "« Abstraire ne veut pas dire « ne rien représenter » »"
        },
        {
          "kind": "analyse",
          "q": "Face à une grande zone rouge dans une toile abstraite, quelle première question est la plus solide ?",
          "a": "Comment ce rouge contraste-t-il avec les autres couleurs et comment organise-t-il mon regard ?",
          "choices": [
            "Quelle émotion le rouge exprime-t-il habituellement, en supposant que sa symbolique reste stable d’une œuvre à l’autre ?",
            "Quel objet réel cette zone pourrait-elle représenter si l’on cherchait d’abord une correspondance figurative ?",
            "Pourquoi l’artiste a-t-il choisi une couleur isolée qui fonctionne indépendamment du reste de la composition ?"
          ],
          "why": "L’analyse commence par une relation observable ; attribuer immédiatement un symbole fixe à une couleur mène facilement à la surinterprétation.",
          "trap": "",
          "evidence": "« La couleur peut organiser une tension sans raconter une histoire »"
        },
        {
          "kind": "comparaison",
          "q": "Pourquoi un vocabulaire très réduit peut-il rendre une composition de Mondrian complexe ?",
          "a": "Parce que chaque proportion, position et intervalle devient très perceptible quand peu d’éléments sont présents.",
          "choices": [
            "Parce que toutes les grilles produisent exactement le même équilibre quelle que soit leur organisation.",
            "Parce que réduire les éléments supprime automatiquement toute décision de composition.",
            "Parce que les rectangles remplacent la nécessité de regarder les relations entre les couleurs."
          ],
          "why": "La réduction augmente l’importance relative de chaque choix : une ligne ou une surface déplacée modifie l’équilibre de l’ensemble.",
          "trap": "",
          "evidence": "« Mondrian : réduire pour rendre les relations visibles »"
        },
        {
          "kind": "nuance",
          "q": "Qu’est-ce qui distingue une abstraction gestuelle d’une abstraction strictement géométrique ?",
          "a": "Elle peut mettre davantage en avant la trace du mouvement, la matière et le temps de l’action.",
          "choices": [
            "Elle exclut toute couleur et n’utilise que le noir du support.",
            "Elle doit nécessairement représenter fidèlement un paysage derrière les traces visibles.",
            "Elle interdit que l’artiste contrôle la composition ou revienne sur son travail."
          ],
          "why": "Dans certaines abstractions, la matérialité de la peinture et l’empreinte du geste deviennent elles-mêmes le sujet de l’expérience visuelle.",
          "trap": "",
          "evidence": "« Le geste et la matière ouvrent d’autres voies »"
        },
        {
          "kind": "méthode",
          "q": "Quel réflexe aide le plus devant une œuvre abstraite inconnue ?",
          "a": "Décrire répétitions, contrastes et tensions, puis relier son interprétation à ces éléments visibles.",
          "choices": [
            "Commencer par la biographie de l’artiste et utiliser ensuite l’œuvre pour illustrer ce récit personnel.",
            "Chercher d’abord à rattacher les formes à des objets connus avant d’étudier leurs relations visuelles.",
            "Considérer que l’absence de sujet reconnaissable limite fortement ce qu’on peut analyser sans information extérieure."
          ],
          "why": "L’absence de narration figurative ne signifie pas absence d’organisation ; observer les relations visuelles donne des appuis concrets à l’interprétation.",
          "trap": "",
          "evidence": "« Comment regarder une œuvre abstraite sans rester bloqué »"
        }
      ],
      "learningPath": [
        "Abstraire ne veut pas dire « ne rien représenter » — L’abstraction réduit, transforme ou abandonne la représentation reconnaissable pour faire travailler directement couleur, ligne, forme, rythme et matière.",
        "La couleur peut organiser une tension sans raconter une histoire — Un rouge dense contre un bleu froid, une zone claire entourée de noir ou une série de tons proches produisent des relations visuelles avant toute interprétation symbolique.",
        "Kandinsky : chercher une nécessité visuelle plutôt qu’un code secret — Kandinsky associe peinture, musique et intériorité, mais ses œuvres ne se résument pas à une traduction mécanique de sons en couleurs.",
        "Mondrian : réduire pour rendre les relations visibles — Chez Mondrian, la grille, les verticales et horizontales, les rectangles et un nombre limité de couleurs ne sont pas une décoration minimaliste choisie au hasard."
      ],
      "editorialFlow": "concept-observation-application",
      "contentRevision": "rc42-catalogue-expansion"
    }
  },
  {
    "chapter": "art-contemporary-practices",
    "meta": {
      "id": "art-installation-performance-space",
      "order": 2,
      "title": "Installation et performance : quand l’œuvre devient une situation",
      "shortTitle": "Installation & performance",
      "emoji": "🧍",
      "period": "XXe–XXIe siècles",
      "location": "Musées, villes et espaces publics",
      "xp": 55,
      "gems": 2,
      "unlocks": [],
      "blocks": []
    },
    "pack": {
      "hook": "Que reste-t-il d’une œuvre quand elle n’est ni tableau ni sculpture, mais une pièce à traverser ou une action qui ne dure qu’une heure ? Installation et performance déplacent la question de l’objet vers l’espace, le temps, le corps et la relation avec le public.",
      "keyFacts": [
        "L’œuvre peut être un espace à traverser plutôt qu’un objet à regarder — Une installation organise un lieu avec des objets, images, sons, lumière ou architecture.",
        "Une performance utilise le temps et l’action comme matériaux — Dans une performance, l’œuvre peut être une action réalisée par l’artiste, par des participants ou selon un protocole.",
        "Le lieu peut faire partie du contenu — Une œuvre dite in situ ou site-specific est pensée pour un endroit précis : architecture, histoire, usages ou circulation du public participent à sa signification.",
        "Participer ne signifie pas forcément être libre — Certaines œuvres demandent au public d’écrire, déplacer, choisir, marcher ou accomplir une consigne."
      ],
      "express": [
        "Une installation peut faire du lieu et du parcours du spectateur une partie de l’œuvre.",
        "Une performance utilise l’action et la durée comme matériaux et pose la question de sa documentation après coup.",
        "Participation et site-specificité obligent à analyser qui fixe les règles et ce que le contexte change réellement."
      ],
      "complete": [
        {
          "title": "1. L’œuvre peut être un espace à traverser plutôt qu’un objet à regarder",
          "text": "Une installation organise un lieu avec des objets, images, sons, lumière ou architecture. Le spectateur ne reste pas forcément devant une surface : il entre, contourne, écoute ou se déplace. Le sens dépend alors de la position du corps et de la durée de la visite. Photographier l’œuvre aide à la documenter, mais ne remplace pas toujours l’expérience d’échelle, d’orientation ou de proximité construite dans l’espace."
        },
        {
          "title": "2. Une performance utilise le temps et l’action comme matériaux",
          "text": "Dans une performance, l’œuvre peut être une action réalisée par l’artiste, par des participants ou selon un protocole. Elle possède un début, une durée, parfois une part d’imprévu. Le corps devient un matériau mais aussi un lieu de risque, de présence et de relation au public. Une performance peut être répétée, documentée ou réinterprétée ; la question de ce qui constitue alors « l’œuvre originale » devient elle-même intéressante."
        },
        {
          "title": "3. Le lieu peut faire partie du contenu",
          "text": "Une œuvre dite in situ ou site-specific est pensée pour un endroit précis : architecture, histoire, usages ou circulation du public participent à sa signification. Déplacer l’œuvre dans un autre lieu peut donc la transformer profondément. Cela permet aussi aux artistes de travailler hors du musée, dans une rue, un paysage ou un bâtiment abandonné. Le contexte n’est plus seulement un support : il devient l’un des matériaux de l’œuvre."
        },
        {
          "title": "4. Participer ne signifie pas forcément être libre",
          "text": "Certaines œuvres demandent au public d’écrire, déplacer, choisir, marcher ou accomplir une consigne. Cette participation peut donner une impression de liberté, mais elle reste souvent encadrée par un dispositif conçu par l’artiste. La bonne question n’est donc pas seulement « est-ce interactif ? » mais « quelles actions sont possibles, qui fixe les règles, et qu’est-ce que ma participation change réellement ? »."
        },
        {
          "title": "5. Documentation et œuvre ne se confondent pas toujours",
          "text": "Photos, vidéos, objets conservés ou témoignages permettent de connaître une performance passée. Pourtant, ces traces sélectionnent un point de vue et peuvent devenir à leur tour des œuvres exposées ou vendues. Une institution doit alors décider comment présenter quelque chose qui n’existe plus sous sa forme initiale. L’art contemporain rend visible un problème ancien : conserver une œuvre, c’est toujours aussi interpréter ce qu’on considère comme essentiel."
        },
        {
          "title": "6. Lire une installation : décrire ce que le dispositif te fait faire",
          "text": "Au lieu de demander immédiatement « est-ce beau ? », commence par observer ton comportement : dois-tu ralentir, contourner, lever la tête, entrer seul, écouter, toucher ou attendre ? Ensuite, demande pourquoi l’œuvre impose cette relation au corps et au lieu. Cette méthode fonctionne particulièrement bien lorsque l’objet isolé paraît banal. Le sens peut résider moins dans ce qui est présent que dans la situation créée entre espace, objets et spectateur."
        }
      ],
      "deeper": [],
      "takeaways": [
        {
          "label": "Installation",
          "text": "L’espace et le parcours peuvent être constitutifs de l’œuvre."
        },
        {
          "label": "Performance",
          "text": "L’action, le corps et la durée deviennent des matériaux."
        },
        {
          "label": "In situ",
          "text": "Le lieu participe à la conception et au sens."
        },
        {
          "label": "Participation",
          "text": "Interagir ne signifie pas nécessairement sortir du cadre conçu par l’artiste."
        }
      ],
      "quiz": [
        {
          "kind": "distinction",
          "q": "Qu’est-ce qui distingue souvent une installation d’un objet autonome exposé sur un socle ?",
          "a": "L’installation organise une expérience spatiale où le lieu et le déplacement du spectateur participent à l’œuvre.",
          "choices": [
            "Une installation se distingue principalement par son échelle, qui doit dépasser celle des objets autonomes exposés.",
            "Un objet autonome garde son sens indépendamment du lieu, tandis qu’une installation dépend exclusivement de l’architecture qui l’entoure.",
            "Une installation se reconnaît surtout au mélange de plusieurs médias techniques, même lorsque le parcours du spectateur reste secondaire."
          ],
          "why": "Dans une installation, la relation entre éléments, architecture, échelle et parcours est souvent constitutive de l’expérience, pas seulement décorative.",
          "trap": "",
          "evidence": "« L’œuvre peut être un espace à traverser plutôt qu’un objet à regarder »"
        },
        {
          "kind": "temps",
          "q": "Pourquoi le temps est-il un matériau important dans une performance ?",
          "a": "Parce que l’action se déroule selon une durée et peut changer en fonction du corps, du public ou de l’imprévu.",
          "choices": [
            "Parce que toutes les performances doivent durer exactement le même nombre de minutes.",
            "Parce que le public ne peut jamais assister directement à une performance en cours.",
            "Parce que le temps remplace entièrement l’espace et les gestes dans ce type d’œuvre."
          ],
          "why": "Une performance existe dans un déroulement : début, durée, répétition, attente ou imprévu contribuent à ce que le public expérimente.",
          "trap": "",
          "evidence": "« Une performance utilise le temps et l’action comme matériaux »"
        },
        {
          "kind": "contexte",
          "q": "Que signifie le plus souvent qu’une œuvre est pensée in situ ?",
          "a": "Que le lieu, son architecture ou son histoire font partie de la conception et du sens de l’œuvre.",
          "choices": [
            "Que l’œuvre peut être déplacée partout sans que son fonctionnement ne change.",
            "Que l’artiste n’a utilisé aucun matériau physique pour la réaliser.",
            "Que l’œuvre doit être installée uniquement dans le lieu de naissance de l’artiste."
          ],
          "why": "Une œuvre site-specific entretient une relation structurante avec son environnement ; la déplacer peut donc modifier ce qu’elle fait ou signifie.",
          "trap": "",
          "evidence": "« Le lieu peut faire partie du contenu »"
        },
        {
          "kind": "participation",
          "q": "Une œuvre demande au public de choisir entre trois actions prévues par l’artiste. Quelle analyse est la plus juste ?",
          "a": "Le public participe, mais à l’intérieur d’un cadre de possibilités déjà conçu.",
          "choices": [
            "Le public devient le principal auteur dès qu’un choix lui est proposé, l’artiste se limitant alors à fournir le cadre matériel.",
            "La participation réduit fortement le rôle des règles initiales, puisque le résultat dépend surtout des décisions du public.",
            "Le fait de choisir transforme le dispositif en espace ouvert où les limites prévues par l’artiste deviennent secondaires."
          ],
          "why": "Une interaction peut être réelle tout en étant structurée par des règles ; analyser qui définit ces règles éclaire la relation entre œuvre et public.",
          "trap": "",
          "evidence": "« Participer ne signifie pas forcément être libre »"
        },
        {
          "kind": "méthode",
          "q": "Face à une installation composée d’objets banals, quelle question peut révéler le mieux son fonctionnement ?",
          "a": "Que m’oblige-t-elle à faire dans l’espace et pourquoi organise-t-elle mon corps de cette façon ?",
          "choices": [
            "Quel objet coûterait le plus cher s’il était acheté séparément dans un magasin ?",
            "Quel élément ressemble le plus à une peinture traditionnelle, même s’il n’y en a pas ?",
            "Combien d’objets faudrait-il retirer pour que l’œuvre devienne automatiquement plus belle ?"
          ],
          "why": "Dans une installation, le dispositif et le parcours peuvent porter davantage de sens que la valeur ou l’apparence isolée de chaque objet.",
          "trap": "",
          "evidence": "« Lire une installation : décrire ce que le dispositif te fait faire »"
        }
      ],
      "learningPath": [
        "L’œuvre peut être un espace à traverser plutôt qu’un objet à regarder — Une installation organise un lieu avec des objets, images, sons, lumière ou architecture.",
        "Une performance utilise le temps et l’action comme matériaux — Dans une performance, l’œuvre peut être une action réalisée par l’artiste, par des participants ou selon un protocole.",
        "Le lieu peut faire partie du contenu — Une œuvre dite in situ ou site-specific est pensée pour un endroit précis : architecture, histoire, usages ou circulation du public participent à sa signification.",
        "Participer ne signifie pas forcément être libre — Certaines œuvres demandent au public d’écrire, déplacer, choisir, marcher ou accomplir une consigne."
      ],
      "editorialFlow": "concept-observation-application",
      "contentRevision": "rc42-catalogue-expansion"
    }
  }
];
  const added = [];
  courses.forEach(entry => {
    const lesson = entry.meta;
    const chapter = entry.chapter;
    // Express remains dormant in RC36+, but keep a coherent reusable summary if it returns later.
    const expressWords = (entry.pack.express || []).join(" ").trim().split(/\s+/).filter(Boolean).length;
    if (expressWords < 120 && Array.isArray(entry.pack.complete) && entry.pack.complete.length >= 6) {
      entry.pack.express = [entry.pack.complete[0].text, entry.pack.complete[2].text, entry.pack.complete[5].text];
    }
    if (!Array.isArray(data.lessons[chapter])) data.lessons[chapter] = [];
    if (!data.lessons[chapter].some(item => item?.id === lesson.id)) {
      data.lessons[chapter].push(lesson);
      data.lessons[chapter].sort((a,b) => (Number(a?.order)||999) - (Number(b?.order)||999));
    }
    READY_LESSON_PACKS[lesson.id] = entry.pack;
    READY_LESSON_PACKS[lesson.id].catalogueExpansionRC42 = true;
    READY_LESSON_PACKS[lesson.id].releaseVersion = VERSION;
    added.push(lesson.id);
  });
  window.HD_RC42_CATALOGUE_EXPANSION = Object.freeze({version:VERSION, added:Object.freeze(added)});
})();
