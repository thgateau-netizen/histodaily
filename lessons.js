const APP_VERSION = "0.2.0";
const UPDATED_AT = "05/07/2026";

const CHAPTERS = [
  {
    id: "prehistoire",
    title: "Préhistoire",
    icon: "🪨",
    subtitle: "Des premiers hominidés aux premiers villages",
    lessons: ["hominides", "feu", "sapiens", "art-parietal", "neolithique", "gobekli"]
  }
];

const LESSONS = {
  "hominides": {
    title: "Avant Homo sapiens : une famille nombreuse",
    theme: "Préhistoire",
    duration: "7 min",
    intro: "L’humanité n’apparaît pas d’un coup. Avant nous, il y a une longue histoire de cousins, de migrations et d’extinctions.",
    pages: [
      { title: "Nous ne sommes pas le début de l’histoire", text: "Quand on parle de “l’homme préhistorique”, on imagine souvent une seule lignée qui avance tranquillement jusqu’à nous. C’est faux. L’histoire humaine ressemble plutôt à un buisson : plusieurs espèces proches apparaissent, coexistent parfois, puis disparaissent.

Homo sapiens, notre espèce, n’est que la dernière survivante. Avant nous, il y a eu des australopithèques, Homo habilis, Homo erectus, Néandertal, Denisova et d’autres encore. Pendant une grande partie de la préhistoire, la Terre n’était donc pas peuplée par “l’homme” au singulier, mais par plusieurs humanités.", fact: "Idée clé : Homo sapiens n’est pas le sommet prévu d’une évolution linéaire. C’est une branche qui a survécu." },
      { title: "Lucy et les australopithèques", text: "Parmi les fossiles célèbres, Lucy occupe une place particulière. Découverte en Éthiopie en 1974, elle appartient à l’espèce Australopithecus afarensis et a vécu il y a environ 3,2 millions d’années.

Lucy n’est pas une humaine au sens strict. Son cerveau est petit, sa taille modeste, mais elle marche déjà debout. La bipédie change beaucoup de choses : elle libère les mains, permet de transporter des objets et offre une meilleure vision au-dessus des herbes hautes. Mais elle ne signifie pas encore langage complexe, feu ou outils perfectionnés.", fact: "Lucy montre que la marche debout précède de très loin l’apparition de gros cerveaux." },
      { title: "Homo habilis et les premiers outils", text: "Vers 2,4 millions d’années avant notre époque apparaît Homo habilis. Son nom signifie “homme habile”, car on l’a longtemps associé aux premiers outils de pierre taillée.

Ces outils ne sont pas des objets spectaculaires. Il s’agit souvent de galets cassés pour obtenir un tranchant. Mais leur importance est énorme : couper une carcasse, briser un os, récupérer de la moelle, transformer la nourriture. L’outil devient une extension du corps.

On ne sait pas toujours si Homo habilis est le seul à fabriquer ces outils, mais il marque une étape importante dans la relation entre intelligence, main et environnement.", fact: "Un simple éclat de pierre peut changer l’accès à la nourriture." },
      { title: "Homo erectus quitte l’Afrique", text: "Homo erectus est l’un des grands personnages de la préhistoire. Il apparaît il y a environ 1,9 million d’années et devient la première espèce humaine connue à sortir largement d’Afrique.

On retrouve ses traces en Géorgie, en Chine, en Indonésie. Cela signifie qu’il a su s’adapter à des climats, des paysages et des ressources très différents. Il marche efficacement, fabrique des outils plus réguliers et occupe l’espace comme aucune espèce humaine avant lui.

Sa réussite est immense : Homo erectus survit pendant plus d’un million d’années. À côté de lui, notre propre ancienneté paraît presque courte.", fact: "Homo erectus est probablement le premier grand voyageur de la famille humaine." },
      { title: "Pourquoi c’est important", text: "Comprendre les premiers hominidés évite une erreur classique : croire que toute la préhistoire attendait Homo sapiens.

En réalité, chaque espèce humaine a expérimenté une manière de vivre : marcher debout, tailler la pierre, migrer, s’adapter au froid, coopérer, transmettre. Notre espèce hérite de cette longue histoire. Elle ne part pas de zéro.

Quand Homo sapiens apparaît, il arrive dans un monde déjà habité, déjà exploré, déjà transformé par d’autres humains.", fact: "La préhistoire est une histoire de diversité humaine, pas seulement l’enfance de notre espèce." }
    ],
    quiz: [
      { q: "Quelle idée est la plus juste sur l’évolution humaine ?", a: "Plusieurs espèces humaines ont coexisté", options: ["Plusieurs espèces humaines ont coexisté", "Homo sapiens descend directement de Néandertal", "Lucy était déjà Homo sapiens", "L’évolution humaine est une ligne droite sans branches"], explain: "L’évolution humaine ressemble à un buisson avec plusieurs branches." },
      { q: "Pourquoi Lucy est-elle importante ?", a: "Elle montre une bipédie très ancienne", options: ["Elle montre une bipédie très ancienne", "Elle prouve l’invention de l’écriture", "Elle est le premier Homo sapiens connu", "Elle a construit les premiers villages"], explain: "Lucy marche debout bien avant les gros cerveaux humains." },
      { q: "À quelle espèce associe-t-on souvent les premiers outils simples ?", a: "Homo habilis", options: ["Homo habilis", "Homo sapiens", "Homo neanderthalensis", "Homo floresiensis"], explain: "Homo habilis signifie même “homme habile”." },
      { q: "Quel Homo est connu pour avoir quitté largement l’Afrique très tôt ?", a: "Homo erectus", options: ["Homo erectus", "Australopithecus afarensis", "Homo habilis", "Homo naledi"], explain: "Homo erectus est retrouvé jusqu’en Asie." },
      { q: "Que permet surtout un outil de pierre tranchant ?", a: "Transformer l’accès à la nourriture", options: ["Transformer l’accès à la nourriture", "Écrire sur des tablettes", "Construire des pyramides", "Naviguer sur l’océan Atlantique"], explain: "Couper, briser, récupérer : c’est décisif pour l’alimentation." },
      { q: "Quelle phrase est fausse ?", a: "Homo sapiens a toujours été la seule espèce humaine", options: ["Homo sapiens a toujours été la seule espèce humaine", "Néandertal a coexisté avec Homo sapiens", "Homo erectus a duré très longtemps", "Lucy n’était pas Homo sapiens"], explain: "Sapiens a coexisté avec d’autres espèces humaines." },
      { q: "Que signifie la bipédie ?", a: "Le fait de marcher sur deux jambes", options: ["Le fait de marcher sur deux jambes", "Le fait de fabriquer du bronze", "Le fait de parler plusieurs langues", "Le fait de vivre en ville"], explain: "La bipédie est un changement anatomique majeur." },
      { q: "Pourquoi Homo erectus est-il central dans cette histoire ?", a: "Il montre une capacité d’adaptation exceptionnelle", options: ["Il montre une capacité d’adaptation exceptionnelle", "Il invente l’agriculture", "Il fonde les premiers États", "Il construit Göbekli Tepe"], explain: "Sa diffusion géographique montre une adaptation très forte." }
    ]
  },
  "feu": {
    title: "Le feu : l’invention qui change le corps et le groupe",
    theme: "Préhistoire",
    duration: "8 min",
    intro: "Maîtriser le feu, ce n’est pas seulement se réchauffer. C’est transformer la nourriture, la nuit, la peur et la vie sociale.",
    pages: [
      { title: "Une technologie vivante", text: "Le feu n’est pas un outil comme un silex. Il faut le nourrir, le surveiller, le transporter parfois. Il peut protéger, mais aussi détruire. Le maîtriser demande donc une organisation collective.

Les traces les plus anciennes sont discutées, car il est difficile de savoir si un foyer est naturel ou contrôlé. Mais à partir de plusieurs centaines de milliers d’années, l’usage du feu devient de plus en plus clair chez certaines populations humaines.", fact: "Le feu est autant une technique qu’une discipline collective." },
      { title: "Manger autrement", text: "La cuisson change profondément l’alimentation. Des aliments deviennent plus digestes. Certains végétaux ou morceaux de viande deviennent plus faciles à mâcher. Cela peut augmenter l’énergie disponible pour le corps.

Cette idée est importante : dans l’évolution humaine, l’intelligence ne dépend pas seulement du cerveau. Elle dépend aussi de la nourriture, du temps disponible, de la coopération et des techniques qui rendent la survie moins coûteuse.", fact: "Cuire, c’est parfois obtenir plus d’énergie avec moins d’effort digestif." },
      { title: "Repousser la nuit", text: "Avant le feu, la nuit appartient largement aux prédateurs et au froid. Avec le feu, un camp peut rester actif plus longtemps. On se rassemble, on se protège, on observe, on transmet.

On peut imaginer l’importance sociale du foyer : les individus se regroupent autour d’un point lumineux. Les gestes, les récits, l’apprentissage et peut-être le langage y trouvent un espace privilégié. Le feu crée une sorte de centre du monde.", fact: "Le foyer est peut-être l’un des premiers grands lieux sociaux." },
      { title: "S’installer dans des milieux difficiles", text: "Le feu permet aussi de résister à des climats plus froids. Il aide à occuper des régions où survivre sans chaleur serait beaucoup plus compliqué.

Ce n’est pas la seule condition de l’expansion humaine, mais c’est un avantage décisif. Pouvoir se chauffer, éloigner des animaux, durcir certains matériaux ou éclairer un abri élargit les possibilités de vie.", fact: "Le feu augmente l’espace habitable pour les humains." },
      { title: "Pourquoi c’est important", text: "Le feu ne change pas seulement ce que les humains font. Il change ce qu’ils peuvent devenir.

Avec lui, le corps mange autrement, le groupe s’organise autrement, la nuit n’a plus la même signification. C’est une étape fondatrice parce qu’elle touche à la fois la biologie, la technique et la culture.

Dans l’histoire humaine, peu d’innovations ont eu une portée aussi profonde." , fact: "Le feu est une révolution lente : pas une date unique, mais un basculement durable." }
    ],
    quiz: [
      { q: "Pourquoi le feu n’est-il pas un outil ordinaire ?", a: "Il doit être entretenu et surveillé", options: ["Il doit être entretenu et surveillé", "Il sert uniquement à décorer les grottes", "Il fonctionne sans intervention humaine", "Il remplace immédiatement l’agriculture"], explain: "Le feu est instable : il demande une organisation." },
      { q: "Quel effet la cuisson peut-elle avoir ?", a: "Rendre certains aliments plus digestes", options: ["Rendre certains aliments plus digestes", "Créer directement l’écriture", "Empêcher toute maladie", "Faire disparaître les migrations"], explain: "La cuisson modifie l’accès à l’énergie alimentaire." },
      { q: "Pourquoi le foyer est-il socialement important ?", a: "Il rassemble le groupe autour d’un lieu commun", options: ["Il rassemble le groupe autour d’un lieu commun", "Il sert de monnaie", "Il remplace les outils de pierre", "Il prouve l’existence des États"], explain: "Le foyer structure le camp et favorise la transmission." },
      { q: "Quel avantage le feu donne-t-il face au froid ?", a: "Il permet d’occuper des milieux plus difficiles", options: ["Il permet d’occuper des milieux plus difficiles", "Il fait pousser les céréales", "Il crée des villes", "Il invente la domestication"], explain: "Se chauffer élargit les zones habitables." },
      { q: "Quelle affirmation est la plus prudente historiquement ?", a: "Les premières traces de feu contrôlé sont parfois difficiles à interpréter", options: ["Les premières traces de feu contrôlé sont parfois difficiles à interpréter", "On connaît la date exacte du premier feu", "Le feu est inventé après l’écriture", "Seul Homo sapiens a utilisé le feu"], explain: "Les archéologues distinguent difficilement feu naturel et feu contrôlé." },
      { q: "Le feu transforme surtout…", a: "La nourriture, la sécurité et la vie sociale", options: ["La nourriture, la sécurité et la vie sociale", "Les impôts et les administrations", "La monnaie et le commerce maritime", "Les temples et les alphabets"], explain: "Ses effets sont multiples et très anciens." },
      { q: "Quel usage n’est PAS typique du feu préhistorique ?", a: "Imprimer des livres", options: ["Imprimer des livres", "Se chauffer", "Éclairer", "Cuire"], explain: "L’imprimerie arrive très tard dans l’histoire." },
      { q: "Pourquoi parle-t-on d’une révolution lente ?", a: "Parce que l’usage du feu s’installe progressivement", options: ["Parce que l’usage du feu s’installe progressivement", "Parce que tout change en une seule journée", "Parce qu’il n’a aucun effet visible", "Parce qu’il concerne uniquement l’Europe médiévale"], explain: "Il n’y a pas une invention unique et simple à dater." }
    ]
  },
  "sapiens": { title:"Pourquoi Homo sapiens a survécu", theme:"Préhistoire", duration:"bientôt", intro:"Prochaine leçon longue.", pages:[], quiz:[] },
  "art-parietal": { title:"Lascaux, Chauvet et l’art des grottes", theme:"Préhistoire", duration:"bientôt", intro:"Prochaine leçon longue.", pages:[], quiz:[] },
  "neolithique": { title:"La révolution néolithique", theme:"Préhistoire", duration:"bientôt", intro:"Prochaine leçon longue.", pages:[], quiz:[] },
  "gobekli": { title:"Göbekli Tepe : le temple avant la ville ?", theme:"Préhistoire", duration:"bientôt", intro:"Prochaine leçon longue.", pages:[], quiz:[] }
};
