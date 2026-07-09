const HISTODAILY_CORE = window.HISTODAILY_CORE || {};
const HISTODAILY_ONBOARDING = window.HISTODAILY_ONBOARDING || {};
const APP_VERSION = HISTODAILY_CORE.version || "1.0.0-beta.113";
const STORAGE_KEY = HISTODAILY_CORE.storageKey || "histodaily_state";
const LEGACY_STORAGE_KEY = "histodaily_state_legacy";

const $ = (selector) => document.querySelector(selector);
const app = document.getElementById("app");

const data = {
  worlds: typeof HISTO_WORLDS !== "undefined" && Array.isArray(HISTO_WORLDS) ? HISTO_WORLDS : [],
  lessons: typeof HISTO_LESSONS !== "undefined" ? HISTO_LESSONS : {},
  mysteries: typeof HISTO_DAILY_MYSTERIES !== "undefined" && Array.isArray(HISTO_DAILY_MYSTERIES) ? HISTO_DAILY_MYSTERIES : []
};

const DISCIPLINES = [
  { id: "history", title: "Histoire", emoji: "🏛️", accent: "#f6c453", description: "Périodes, peuples, événements et grands repères." },
  { id: "art", title: "Art", emoji: "🎨", accent: "#fb7185", description: "Histoire de l’art, œuvres, artistes et mouvements." },
  { id: "cinema", title: "Cinéma", emoji: "🎬", accent: "#a78bfa", description: "Histoire du cinéma, films, réalisateurs et courants." },
  { id: "science-inventions", title: "Sciences & inventions", emoji: "🧪", accent: "#56d6ff", description: "Histoire des sciences, découvertes et inventions." },
  { id: "economy", title: "Économie", emoji: "📈", accent: "#48d597", description: "Marchés, crises, monnaies et grandes notions." },
  { id: "geography", title: "Géographie", emoji: "🗺️", accent: "#84cc16", description: "Pays, milieux, villes, frontières et cartes." },
  { id: "music", title: "Musique", emoji: "🎼", accent: "#f59e0b", description: "Histoire de la musique, styles, compositeurs et révolutions sonores." }
];

const DISCIPLINE_OUTLINES = {
  art: {
    groups: [
      { id: "art-reading", title: "Hors-série · Lire une œuvre", range: "méthode", description: "Composition, couleur, perspective, symbole : un module utile pour analyser une image sans réciter une fiche." },
      { id: "art-ancient-medieval", title: "2. Antiquité et Moyen Âge", range: "Antiquité → XVe siècle", description: "Temples, statues, icônes, manuscrits, vitraux et arts religieux." },
      { id: "art-renaissance-classical", title: "3. Renaissance et classicisme", range: "XVe → XVIIIe siècle", description: "Perspective, humanisme, baroque, académies, pouvoir et grands décors." },
      { id: "art-modern", title: "4. Modernités", range: "XIXe → XXe siècle", description: "Impressionnisme, avant-gardes, abstraction, photographie et rupture avec l’académie." },
      { id: "art-contemporary", title: "5. Art contemporain", range: "1945 → aujourd’hui", description: "Installations, performance, design, street art, marché et musées contemporains." }
    ],
    worlds: [
      { id: "art-read-image", title: "Lire une image", emoji: "👁️", subtitle: "Voir avant de juger", timeframe: "bases", accent: "#fb7185", group: "art-reading", sortStart: 1 },
      { id: "art-composition-color", title: "Composition et couleur", emoji: "🎛️", subtitle: "Cadre, lumière, rythme", timeframe: "bases", accent: "#f97316", group: "art-reading", sortStart: 2 },
      { id: "art-antiquity", title: "Arts antiques", emoji: "🏺", subtitle: "Égypte, Grèce, Rome", timeframe: "Antiquité", accent: "#facc15", group: "art-ancient-medieval", sortStart: 10 },
      { id: "art-medieval", title: "Images médiévales", emoji: "⛪", subtitle: "Vitraux, icônes, manuscrits", timeframe: "Ve → XVe siècle", accent: "#38bdf8", group: "art-ancient-medieval", sortStart: 11 },
      { id: "art-renaissance", title: "Renaissance", emoji: "🖼️", subtitle: "Perspective, corps, humanisme", timeframe: "XVe → XVIe siècle", accent: "#fb7185", group: "art-renaissance-classical", sortStart: 20 },
      { id: "art-baroque-classicism", title: "Baroque et classicisme", emoji: "🏛️", subtitle: "Pouvoir, mouvement, règles", timeframe: "XVIIe → XVIIIe siècle", accent: "#c084fc", group: "art-renaissance-classical", sortStart: 21 },
      { id: "art-impressionism", title: "Impressionnisme", emoji: "🌤️", subtitle: "Lumière, modernité, plein air", timeframe: "XIXe siècle", accent: "#f472b6", group: "art-modern", sortStart: 30 },
      { id: "art-avantgardes", title: "Avant-gardes", emoji: "⚡", subtitle: "Cubisme, dada, abstraction", timeframe: "1900 → 1945", accent: "#a78bfa", group: "art-modern", sortStart: 31 },
      { id: "art-contemporary-practices", title: "Pratiques contemporaines", emoji: "🧩", subtitle: "Installation, performance, street art", timeframe: "1945 → aujourd’hui", accent: "#22c55e", group: "art-contemporary", sortStart: 40 }
    ]
  },
  cinema: {
    groups: [
      { id: "cinema-language", title: "Hors-série · Langage du cinéma", range: "méthode", description: "Plan, cadre, montage et son pour mieux lire les films historiques du parcours." },
      { id: "cinema-birth", title: "1. Naissance et muet", range: "1895 → 1929", description: "Premières projections, Lumière, Méliès, burlesque, montage soviétique et grandes formes du muet." },
      { id: "cinema-classical", title: "3. Âge classique", range: "1930 → 1960", description: "Hollywood, genres, studios, stars, film noir et grands récits populaires." },
      { id: "cinema-new-waves", title: "4. Nouveaux cinémas", range: "1945 → 1980", description: "Néoréalisme, Nouvelle Vague, cinéma d’auteur et ruptures de mise en scène." },
      { id: "cinema-contemporary", title: "5. Cinéma contemporain", range: "1980 → aujourd’hui", description: "Blockbusters, animation, séries, plateformes, franchises et cinéma mondial." }
    ],
    worlds: [
      { id: "cinema-shot-frame", title: "Plan et cadrage", emoji: "🎥", subtitle: "Ce que la caméra choisit", timeframe: "bases", accent: "#a78bfa", group: "cinema-language", sortStart: 1 },
      { id: "cinema-editing-sound", title: "Montage et son", emoji: "✂️", subtitle: "Rythme, ellipses, musique", timeframe: "bases", accent: "#f472b6", group: "cinema-language", sortStart: 2 },
      { id: "cinema-early", title: "Naissance du cinéma", emoji: "🎞️", subtitle: "Lumière, Méliès, attractions", timeframe: "1895 → 1914", accent: "#f59e0b", group: "cinema-birth", sortStart: 10 },
      { id: "cinema-silent", title: "Grand muet", emoji: "🤍", subtitle: "Burlesque, expressionnisme, montage", timeframe: "1914 → 1929", accent: "#94a3b8", group: "cinema-birth", sortStart: 11 },
      { id: "cinema-hollywood", title: "Hollywood classique", emoji: "⭐", subtitle: "Studios, genres, stars", timeframe: "1930 → 1960", accent: "#facc15", group: "cinema-classical", sortStart: 20 },
      { id: "cinema-film-noir", title: "Film noir et genres", emoji: "🌃", subtitle: "Polar, western, mélodrame", timeframe: "1940 → 1960", accent: "#64748b", group: "cinema-classical", sortStart: 21 },
      { id: "cinema-neorealism-newwave", title: "Néoréalisme et Nouvelle Vague", emoji: "🚲", subtitle: "Rue, auteur, liberté", timeframe: "1945 → 1968", accent: "#38bdf8", group: "cinema-new-waves", sortStart: 30 },
      { id: "cinema-blockbuster", title: "Blockbuster et franchises", emoji: "🚀", subtitle: "Spectacle, marketing, univers", timeframe: "1975 → aujourd’hui", accent: "#ef4444", group: "cinema-contemporary", sortStart: 40 },
      { id: "cinema-animation-world", title: "Animation et cinémas du monde", emoji: "🌍", subtitle: "Studios, styles, circulations", timeframe: "XXe → XXIe siècle", accent: "#22c55e", group: "cinema-contemporary", sortStart: 41 }
    ]
  },
  "science-inventions": {
    groups: [
      { id: "sci-method", title: "Hors-série · Méthode et preuves", range: "méthode", description: "Comment les savants observent, mesurent, testent et corrigent leurs idées." },
      { id: "sci-earth-life", title: "1. Ciel, Terre et vivant", range: "Antiquité → aujourd’hui", description: "Histoire de l’astronomie, de la Terre, de l’évolution, des microbes et du vivant." },
      { id: "sci-energy-matter", title: "2. Énergie, matière et grandes lois", range: "XVIIe → XXe siècle", description: "Mécanique, électricité, chimie, atome, lumière et inventions liées aux lois physiques." },
      { id: "sci-medicine-tech", title: "3. Médecine, machines et industrie", range: "XVIIIe → XXe siècle", description: "Vaccins, hygiène, vapeur, moteurs, transports et innovations qui changent les sociétés." },
      { id: "sci-digital-space", title: "5. Informatique et espace", range: "XXe → XXIe siècle", description: "Ordinateurs, réseaux, IA, satellites, fusées et exploration spatiale." }
    ],
    worlds: [
      { id: "sci-method-proof", title: "Méthode scientifique", emoji: "🔎", subtitle: "Observer, tester, corriger", timeframe: "bases", accent: "#56d6ff", group: "sci-method", sortStart: 1 },
      { id: "sci-instruments", title: "Instruments et mesures", emoji: "📏", subtitle: "Voir plus loin, mesurer mieux", timeframe: "bases", accent: "#38bdf8", group: "sci-method", sortStart: 2 },
      { id: "sci-astronomy", title: "Copernic, Galilée et le ciel", emoji: "🪐", subtitle: "Quand l’observation change le monde", timeframe: "XVIe → XVIIe siècle", accent: "#818cf8", group: "sci-earth-life", sortStart: 10 },
      { id: "sci-evolution", title: "Évolution et vivant", emoji: "🧬", subtitle: "Espèces, sélection, biodiversité", timeframe: "XIXe → aujourd’hui", accent: "#22c55e", group: "sci-earth-life", sortStart: 11 },
      { id: "sci-mechanics-electricity", title: "Mécanique et électricité", emoji: "⚙️", subtitle: "Forces, machines, courant", timeframe: "XVIIe → XIXe siècle", accent: "#facc15", group: "sci-energy-matter", sortStart: 20 },
      { id: "sci-atom-energy", title: "Atome et énergie", emoji: "⚛️", subtitle: "Matière, radioactivité, nucléaire", timeframe: "XIXe → XXe siècle", accent: "#f97316", group: "sci-energy-matter", sortStart: 21 },
      { id: "sci-vaccines-microbes", title: "Microbes et vaccins", emoji: "🦠", subtitle: "Pasteur, hygiène, médecine", timeframe: "XIXe → XXe siècle", accent: "#10b981", group: "sci-medicine-tech", sortStart: 30 },
      { id: "sci-industry-transport", title: "Machines et transports", emoji: "🚂", subtitle: "Vapeur, moteur, aviation", timeframe: "XVIIIe → XXe siècle", accent: "#f59e0b", group: "sci-medicine-tech", sortStart: 31 },
      { id: "sci-computers-space", title: "Informatique et espace", emoji: "🛰️", subtitle: "Ordinateurs, réseaux, fusées", timeframe: "XXe → XXIe siècle", accent: "#a78bfa", group: "sci-digital-space", sortStart: 40 }
    ]
  },
  economy: {
    groups: [
      { id: "eco-basics", title: "1. Notions de base", range: "bases", description: "Rareté, choix, prix, offre, demande, valeur, travail et productivité." },
      { id: "eco-markets-firms", title: "2. Marchés et entreprises", range: "bases → moderne", description: "Concurrence, monopoles, coûts, innovation, entreprise et organisation du travail." },
      { id: "eco-money", title: "3. Monnaie, banques et inflation", range: "Antiquité → aujourd’hui", description: "Monnaie, crédit, banques centrales, inflation, taux et confiance." },
      { id: "eco-crises-policy", title: "4. Crises et politiques publiques", range: "XIXe → XXIe siècle", description: "Crises financières, chômage, État, impôts, dette et politiques économiques." },
      { id: "eco-global", title: "5. Mondialisation et inégalités", range: "XIXe → XXIe siècle", description: "Commerce mondial, développement, inégalités, ressources et modèles économiques." }
    ],
    worlds: [
      { id: "eco-supply-demand", title: "Prix, offre et demande", emoji: "⚖️", subtitle: "Pourquoi les prix bougent", timeframe: "bases", accent: "#48d597", group: "eco-basics", sortStart: 1 },
      { id: "eco-work-productivity", title: "Travail et productivité", emoji: "🛠️", subtitle: "Produire plus, produire autrement", timeframe: "bases", accent: "#84cc16", group: "eco-basics", sortStart: 2 },
      { id: "eco-firms", title: "Entreprises et concurrence", emoji: "🏢", subtitle: "Coûts, stratégie, monopoles", timeframe: "bases", accent: "#22c55e", group: "eco-markets-firms", sortStart: 10 },
      { id: "eco-innovation", title: "Innovation et croissance", emoji: "💡", subtitle: "Technique, capital, institutions", timeframe: "moderne", accent: "#facc15", group: "eco-markets-firms", sortStart: 11 },
      { id: "eco-money-banks", title: "Monnaie et banques", emoji: "🏦", subtitle: "Crédit, confiance, banques centrales", timeframe: "Antiquité → aujourd’hui", accent: "#38bdf8", group: "eco-money", sortStart: 20 },
      { id: "eco-inflation-rates", title: "Inflation et taux", emoji: "📉", subtitle: "Pouvoir d’achat, crédit, prix", timeframe: "XXe → XXIe siècle", accent: "#fb7185", group: "eco-money", sortStart: 21 },
      { id: "eco-crises", title: "Crises économiques", emoji: "🌪️", subtitle: "Bulles, paniques, récessions", timeframe: "XIXe → XXIe siècle", accent: "#ef4444", group: "eco-crises-policy", sortStart: 30 },
      { id: "eco-state-debt", title: "État, dette et impôts", emoji: "📜", subtitle: "Choix collectifs et arbitrages", timeframe: "moderne", accent: "#a78bfa", group: "eco-crises-policy", sortStart: 31 },
      { id: "eco-globalization", title: "Mondialisation et inégalités", emoji: "🌐", subtitle: "Commerce, développement, écarts", timeframe: "XIXe → XXIe siècle", accent: "#14b8a6", group: "eco-global", sortStart: 40 }
    ]
  },
  geography: {
    groups: [
      { id: "geo-reading", title: "1. Lire le monde", range: "bases", description: "Cartes, échelles, coordonnées, projections, paysages et vocabulaire géographique." },
      { id: "geo-environments", title: "2. Milieux et climats", range: "planète", description: "Reliefs, océans, climats, risques, biodiversité et changement global." },
      { id: "geo-population-cities", title: "3. Populations et villes", range: "monde contemporain", description: "Démographie, migrations, urbanisation, métropoles et fractures urbaines." },
      { id: "geo-power", title: "4. États, frontières et puissance", range: "monde contemporain", description: "Territoires, frontières, mers, puissance, conflits et organisations régionales." },
      { id: "geo-resources", title: "5. Ressources et mondialisation", range: "monde contemporain", description: "Énergie, eau, agriculture, transports, flux, production et dépendances." }
    ],
    worlds: [
      { id: "geo-maps", title: "Cartes et échelles", emoji: "🧭", subtitle: "Lire une carte sans se faire piéger", timeframe: "bases", accent: "#84cc16", group: "geo-reading", sortStart: 1 },
      { id: "geo-landscapes", title: "Paysages et territoires", emoji: "🏞️", subtitle: "Observer, décrire, expliquer", timeframe: "bases", accent: "#22c55e", group: "geo-reading", sortStart: 2 },
      { id: "geo-climates", title: "Climats et milieux", emoji: "🌦️", subtitle: "Zones, contraintes, adaptations", timeframe: "planète", accent: "#38bdf8", group: "geo-environments", sortStart: 10 },
      { id: "geo-risks", title: "Risques et changement global", emoji: "🌋", subtitle: "Aléas, vulnérabilités, prévention", timeframe: "planète", accent: "#f97316", group: "geo-environments", sortStart: 11 },
      { id: "geo-population", title: "Population et migrations", emoji: "👥", subtitle: "Densités, transitions, mobilités", timeframe: "monde contemporain", accent: "#facc15", group: "geo-population-cities", sortStart: 20 },
      { id: "geo-cities", title: "Villes et métropoles", emoji: "🏙️", subtitle: "Urbanisation, réseaux, inégalités", timeframe: "monde contemporain", accent: "#a78bfa", group: "geo-population-cities", sortStart: 21 },
      { id: "geo-borders", title: "Frontières et puissance", emoji: "🛂", subtitle: "États, mers, conflits, alliances", timeframe: "monde contemporain", accent: "#fb7185", group: "geo-power", sortStart: 30 },
      { id: "geo-resources-energy", title: "Ressources et énergie", emoji: "⛽", subtitle: "Eau, sols, pétrole, transition", timeframe: "monde contemporain", accent: "#10b981", group: "geo-resources", sortStart: 40 },
      { id: "geo-flows", title: "Flux et mondialisation", emoji: "🚢", subtitle: "Routes, ports, câbles, échanges", timeframe: "monde contemporain", accent: "#14b8a6", group: "geo-resources", sortStart: 41 }
    ]
  },

  music: {
    groups: [
      { id: "music-origins-medieval", title: "1. Des rites anciens au Moyen Âge", range: "Antiquité → XVe siècle", description: "Musique rituelle, chant, notation, Église, transmission orale et premières polyphonies." },
      { id: "music-renaissance-baroque", title: "2. Renaissance et baroque", range: "XVe → XVIIIe siècle", description: "Polyphonie, naissance de l’opéra, instruments, mécènes, Bach, Vivaldi et grands styles européens." },
      { id: "music-classical-romantic", title: "3. Classique et romantique", range: "XVIIIe → XIXe siècle", description: "Symphonie, sonate, orchestre, Beethoven, émotions romantiques et virtuosité." },
      { id: "music-modern-recording", title: "4. Musique enregistrée", range: "XXe siècle", description: "Jazz, blues, rock, studio, disque, radio et transformation de l’écoute." },
      { id: "music-contemporary", title: "5. Pop, électronique et musiques mondiales", range: "XXe → XXIe siècle", description: "Pop, rap, électronique, samples, streaming, scènes mondiales et nouvelles circulations." }
    ],
    worlds: [
      { id: "music-medieval", title: "Chant médiéval", emoji: "⛪", subtitle: "Du chant grégorien à la polyphonie", timeframe: "Moyen Âge", accent: "#f59e0b", group: "music-origins-medieval", sortStart: 10 },
      { id: "music-renaissance", title: "Renaissance musicale", emoji: "🎶", subtitle: "Voix, polyphonies, cours", timeframe: "XVe → XVIe siècle", accent: "#fb7185", group: "music-renaissance-baroque", sortStart: 20 },
      { id: "music-baroque", title: "Baroque et opéra", emoji: "🎻", subtitle: "Bach, Vivaldi, théâtre musical", timeframe: "XVIIe → XVIIIe siècle", accent: "#c084fc", group: "music-renaissance-baroque", sortStart: 21 },
      { id: "music-classical", title: "Classicisme", emoji: "🎼", subtitle: "Mozart, Haydn, formes claires", timeframe: "XVIIIe siècle", accent: "#facc15", group: "music-classical-romantic", sortStart: 30 },
      { id: "music-romantic", title: "Romantisme", emoji: "🌙", subtitle: "Beethoven, Chopin, orchestre", timeframe: "XIXe siècle", accent: "#a78bfa", group: "music-classical-romantic", sortStart: 31 },
      { id: "music-jazz-blues", title: "Jazz et blues", emoji: "🎷", subtitle: "Improvisation, swing, clubs", timeframe: "XXe siècle", accent: "#38bdf8", group: "music-modern-recording", sortStart: 40 },
      { id: "music-rock-pop", title: "Rock et pop", emoji: "🎸", subtitle: "Studio, radio, culture jeune", timeframe: "XXe siècle", accent: "#ef4444", group: "music-modern-recording", sortStart: 41 },
      { id: "music-rap-electronic", title: "Rap et électronique", emoji: "🎧", subtitle: "Samples, machines, streaming", timeframe: "XXe → XXIe siècle", accent: "#22c55e", group: "music-contemporary", sortStart: 50 }
    ]
  }
};

const PLANNED_DISCIPLINE_GROUPS = Object.fromEntries(Object.entries(DISCIPLINE_OUTLINES).map(([id, value]) => [id, value.groups || []]));
const PLANNED_DISCIPLINE_WORLDS = Object.fromEntries(Object.entries(DISCIPLINE_OUTLINES).map(([id, value]) => [id, (value.worlds || []).map(world => ({ ...world, discipline: id, planned: true, unlockedByDefault: false }))]));


const SCORE_BASE = HISTODAILY_CORE.scoring?.base || { facile: 95, moyen: 120, difficile: 150, expert: 180 };
const SCORE_FLOOR = HISTODAILY_CORE.scoring?.floor || { facile: 35, moyen: 45, difficile: 55, expert: 70 };
const SCORE_PENALTY_HINT = HISTODAILY_CORE.scoring?.penalties?.hint ?? 20;
const SCORE_PENALTY_EXTRA_TRY = HISTODAILY_CORE.scoring?.penalties?.extraTry ?? 10;
const LESSON_QUIZ_PASS_RATIO = 0.8;
function lessonQuizPassThreshold(total = 5) { return Math.max(1, Math.ceil(Number(total || 0) * LESSON_QUIZ_PASS_RATIO)); }

const PWA_ASSETS_VERSION = HISTODAILY_CORE.assetsVersion || APP_VERSION;
function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`service-worker.js?v=${PWA_ASSETS_VERSION}`).catch(() => {});
  });
}
registerServiceWorker();

let installPromptEvent = null;
let isOnline = typeof navigator === "undefined" ? true : navigator.onLine !== false;
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPromptEvent = event;
  if (state?.tab === "home" || state?.tab === "profile") render();
});
window.addEventListener("online", () => { isOnline = true; render(); });
window.addEventListener("offline", () => { isOnline = false; render(); });

const defaultState = {
  tab: "home",
  xp: 180,
  streak: 0,
  gems: 12,
  pseudo: "Invité",
  completedLessons: {},
  quizProgress: {},
  quizFeedback: {},
  solvedMysteries: {},
  currentDiscipline: "history",
  currentGroup: "origins",
  currentWorld: "prehistory",
  currentLessonId: null,
  currentMysteryId: null,
  currentMysteryDiscipline: "history",
  lessonFocus: null,
  lessonView: "express",
  seenHints: {},
  mysteryTries: {},
  mysteryFeedback: {},
  archiveFeedback: "",
  unlockedMysteries: {},
  dailyClaims: {},
  dailyHistory: {},
  lastDailySolvedKey: null,
  rewardFeedback: {},
  rankScope: "daily",
  readingMode: "express",
  profileFeedback: "",
  shareFeedback: {},
  installDismissed: false,
  installFeedback: "",
  backupFeedback: "",
  inviteFeedback: "",
  friendFeedback: "",
  socialSubmitFeedback: "",
  lastScoreSubmit: {},
  serverLeaderboards: {},
  serverLeaderboardStatus: {},
  serverFriendsStatus: {},
  friends: {},
  selectedProfileId: null,
  performanceMode: "light",
  performanceMigrationVersion: "",
  learnFilter: "all",
  learnSearch: "",
  dismissedReleaseVersion: "",
  dismissedCoachVersion: "",
  achievements: { firstLesson: false, firstMystery: false, streak3: false, streak7: false, noHint: false, expertMystery: false, firstArchive: false },
  discoverOffset: 0
};

function applyStartupMaintenanceActions() {
  try {
    const params = new URLSearchParams(window.location.search);
    const shouldReset = params.get("reset") === "1" || params.get("clear") === "1" || params.get("resetLocal") === "1";
    if (!shouldReset) return;
    [STORAGE_KEY, `${STORAGE_KEY}_backup`, `${STORAGE_KEY}_last_ok`, ...(HISTODAILY_CORE.legacyStorageKeys || [])].forEach(key => localStorage.removeItem(key));
    params.delete("reset");
    params.delete("clear");
    params.delete("resetLocal");
    const next = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}${window.location.hash || ""}`;
    window.history.replaceState({}, "", next);
  } catch {}
}
applyStartupMaintenanceActions();
let state = loadState();
if (state.performanceMigrationVersion !== APP_VERSION) {
  state.performanceMode = "light";
  state.performanceMigrationVersion = APP_VERSION;
  try { saveState(); } catch {}
}
const leaderboardFetchInFlight = new Set();
let friendsFetchInFlight = false;
applyStartupSocialLinks();

function cleanStoredFriendsMap(raw = {}) {
  const out = {};
  Object.values(raw || {}).forEach(friend => {
    if (!friend || typeof friend !== "object") return;
    const parsed = parseFriendCode(friend.code || friend.id || friend.friendCode || "");
    if (!parsed) return;
    const id = parsed.id;
    out[id] = {
      id,
      code: parsed.code,
      name: sanitizePseudo(friend.name || friend.pseudo || parsed.pseudo || "Ami") || "Ami",
      addedAt: Number(friend.addedAt || Date.now()),
      playerId: friend.playerId || friend.friend_player_id || "",
      level: Number(friend.level || 1),
      xp: Number(friend.xp || 0),
      solved: Number(friend.solved || friend.solved_count || 0),
      streak: Number(friend.streak || 0),
      daily: Number(friend.daily || 0),
      week: Number(friend.week || 0),
      year: Number(friend.year || 0),
      server: Boolean(friend.server),
      syncedAt: friend.syncedAt || 0
    };
  });
  return out;
}
function mergeState(base, stored) {
  const merged = { ...base, ...(stored || {}) };
  merged.completedLessons = { ...base.completedLessons, ...(stored?.completedLessons || {}) };
  merged.quizProgress = typeof stored?.quizProgress === "object" && stored.quizProgress ? { ...base.quizProgress, ...stored.quizProgress } : { ...base.quizProgress };
  merged.quizFeedback = typeof stored?.quizFeedback === "object" && stored.quizFeedback ? { ...base.quizFeedback, ...stored.quizFeedback } : { ...base.quizFeedback };
  merged.solvedMysteries = { ...base.solvedMysteries, ...(stored?.solvedMysteries || {}) };
  merged.seenHints = { ...base.seenHints, ...(stored?.seenHints || {}) };
  merged.mysteryTries = { ...base.mysteryTries, ...(stored?.mysteryTries || {}) };
  merged.mysteryFeedback = { ...base.mysteryFeedback, ...(stored?.mysteryFeedback || {}) };
  merged.unlockedMysteries = { ...base.unlockedMysteries, ...(stored?.unlockedMysteries || {}) };
  merged.dailyClaims = { ...base.dailyClaims, ...(stored?.dailyClaims || {}) };
  merged.dailyHistory = { ...base.dailyHistory, ...(stored?.dailyHistory || {}) };
  merged.rewardFeedback = typeof stored?.rewardFeedback === "object" && stored.rewardFeedback ? { ...base.rewardFeedback, ...stored.rewardFeedback } : { ...base.rewardFeedback };
  merged.shareFeedback = typeof stored?.shareFeedback === "object" && stored.shareFeedback ? { ...base.shareFeedback, ...stored.shareFeedback } : { ...base.shareFeedback };
  merged.friends = typeof stored?.friends === "object" && stored.friends ? { ...base.friends, ...cleanStoredFriendsMap(stored.friends) } : { ...base.friends };
  merged.lastScoreSubmit = typeof stored?.lastScoreSubmit === "object" && stored.lastScoreSubmit ? { ...base.lastScoreSubmit, ...stored.lastScoreSubmit } : { ...base.lastScoreSubmit };
  merged.serverLeaderboards = typeof stored?.serverLeaderboards === "object" && stored.serverLeaderboards ? { ...base.serverLeaderboards, ...stored.serverLeaderboards } : { ...base.serverLeaderboards };
  merged.serverLeaderboardStatus = typeof stored?.serverLeaderboardStatus === "object" && stored.serverLeaderboardStatus ? { ...base.serverLeaderboardStatus, ...stored.serverLeaderboardStatus } : { ...base.serverLeaderboardStatus };
  merged.serverFriendsStatus = typeof stored?.serverFriendsStatus === "object" && stored.serverFriendsStatus ? { ...base.serverFriendsStatus, ...stored.serverFriendsStatus } : { ...base.serverFriendsStatus };
  merged.achievements = { ...base.achievements, ...(stored?.achievements || {}) };
  return merged;
}
function loadState() {
  const backupKey = `${STORAGE_KEY}_backup`;
  const raw = HISTODAILY_CORE.storage?.safeRead ? HISTODAILY_CORE.storage.safeRead(STORAGE_KEY, backupKey) : null;
  try { return mergeState(defaultState, JSON.parse(raw) || {}); }
  catch {
    try { return mergeState(defaultState, JSON.parse(localStorage.getItem(backupKey)) || {}); }
    catch { return mergeState(defaultState, {}); }
  }
}
let saveStateTimer = null;
const NAVIGATION_ONLY_STATE_KEYS = new Set([
  "tab", "currentLessonId", "currentMysteryId", "currentMysteryDiscipline",
  "currentWorld", "currentGroup", "lessonFocus", "lessonView",
  "learnFilter", "learnSearch", "rankScope", "selectedProfileId",
  "profileFeedback", "archiveFeedback", "installFeedback", "backupFeedback",
  "inviteFeedback", "friendFeedback", "socialSubmitFeedback"
]);
function saveState() {
  try {
    const serialized = JSON.stringify(state);
    if (HISTODAILY_CORE.storage?.safeWrite) HISTODAILY_CORE.storage.safeWrite(STORAGE_KEY, `${STORAGE_KEY}_backup`, serialized);
    else {
      localStorage.setItem(STORAGE_KEY, serialized);
      localStorage.setItem(`${STORAGE_KEY}_backup`, serialized);
    }
  } catch {}
}
function queueSaveState(delay = 180) {
  try { window.clearTimeout(saveStateTimer); } catch {}
  saveStateTimer = window.setTimeout(() => { saveStateTimer = null; saveState(); }, delay);
}
function patchNeedsPersistentSave(patch = {}) {
  const keys = Object.keys(patch || {});
  if (!keys.length) return false;
  return keys.some(key => !NAVIGATION_ONLY_STATE_KEYS.has(key));
}
function setState(patch, options = {}) {
  if (!patch || typeof patch !== "object") return;
  state = { ...state, ...patch };
  if (options.save !== false && patchNeedsPersistentSave(patch)) queueSaveState();
  render();
}
function escapeHtml(value = "") { return String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#039;","\"":"&quot;"}[c])); }
function normalize(value = "") { return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }
function percent(done, total) { return total ? Math.round((done / total) * 100) : 0; }
function level() { return Math.floor(state.xp / 250) + 1; }
function levelProgress() { return Math.round(((state.xp % 250) / 250) * 100); }
function allLessons() { return Object.values(data.lessons).flat(); }
function lessonsFor(worldId) { return data.lessons[worldId] || []; }
function lessonDone(id) { return Boolean(state.completedLessons[id]); }
function activeWorld() { return data.worlds.find(w => w.id === state.currentWorld) || data.worlds[0] || {}; }
function mysterySolved(id) { return Boolean(state.solvedMysteries[id]); }
function short(text, n = 110) { return String(text || "").length > n ? String(text).slice(0, n - 1) + "…" : String(text || ""); }
function mysteryDisplayTitle(mystery) {
  if (!mystery) return "Mystère";
  return mysterySolved(mystery.id) ? mystery.title : (mystery.caseTitle || "Sujet à identifier");
}
function mysteryTeaser(mystery) {
  if (!mystery) return "";
  return mystery.teaser || mystery.prompt || "Un dossier historique à résoudre.";
}
function mysterySolvedTitleLine(mystery) {
  return mystery?.title ? `<p class="solved-case-title">${escapeHtml(mystery.title)}</p>` : "";
}

const ARCHIVE_DAYS_VISIBLE = HISTODAILY_CORE.archive?.daysVisible ?? 7;
const ARCHIVE_UNLOCK_COST = HISTODAILY_CORE.archive?.unlockCost ?? 2;
const DAY_MS = 86400000;

function startOfLocalDay(ts = Date.now()) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}
function localDayKey(ts = Date.now()) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function dayKeyToTime(key) {
  if (!key || typeof key !== "string") return 0;
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year || 1970, (month || 1) - 1, day || 1).getTime();
}
function dayDiff(fromKey, toKey) {
  const from = dayKeyToTime(fromKey);
  const to = dayKeyToTime(toKey);
  if (!from || !to) return 999;
  return Math.round((to - from) / DAY_MS);
}
function timeToNextDaily() {
  const now = Date.now();
  const next = startOfLocalDay(now) + DAY_MS;
  const remaining = Math.max(0, next - now);
  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.round((remaining % 3600000) / 60000);
  if (hours <= 0) return `${minutes} min`;
  return `${hours} h ${String(minutes).padStart(2, "0")}`;
}
function todayClaim() { return state.dailyClaims?.[localDayKey()] || null; }
function dailySolvedToday() {
  const mystery = dailyMystery();
  return Boolean(mystery && mysterySolved(mystery.id));
}
function dailyRewardPreview() {
  const nextStreak = state.lastDailySolvedKey === localDayKey() ? state.streak : (dayDiff(state.lastDailySolvedKey, localDayKey()) === 1 ? (state.streak || 0) + 1 : 1);
  const bonus = nextStreak > 0 && nextStreak % 7 === 0 ? 3 : 0;
  return { gems: 1 + bonus, nextStreak, bonus };
}
function applyDailyReward(mysteryId, score) {
  const dayKey = localDayKey();
  if (!isTodayMystery(mysteryId) || state.dailyClaims?.[dayKey]) return null;
  const previousKey = state.lastDailySolvedKey;
  const diff = dayDiff(previousKey, dayKey);
  const nextStreak = previousKey ? (diff === 1 ? (state.streak || 0) + 1 : diff === 0 ? (state.streak || 1) : 1) : 1;
  const streakBonus = nextStreak > 0 && nextStreak % 7 === 0 ? 3 : 0;
  const gems = 1 + streakBonus;
  state.streak = nextStreak;
  state.gems = (state.gems || 0) + gems;
  state.lastDailySolvedKey = dayKey;
  state.dailyClaims = { ...(state.dailyClaims || {}), [dayKey]: { mysteryId, score, gems, streak: nextStreak, at: Date.now() } };
  state.dailyHistory = { ...(state.dailyHistory || {}), [dayKey]: { mysteryId, score, gems, streak: nextStreak, at: Date.now() } };
  if (nextStreak >= 3) state.achievements.streak3 = true;
  if (nextStreak >= 7) state.achievements.streak7 = true;
  const bonusText = streakBonus ? ` dont ${streakBonus} de bonus série` : "";
  return `+${gems} 💎${bonusText} · série ${nextStreak} jour${nextStreak > 1 ? "s" : ""}`;
}
function todayIndex() {
  const d = new Date();
  return Math.abs(Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY_MS)));
}
function publicMysteries() {
  const curatedIds = new Set(curatedLessons().map(lesson => lesson.id));
  const linked = (data.mysteries || []).filter(mystery => mystery?.lessonId && curatedIds.has(mystery.lessonId));
  return linked.length ? linked : (data.mysteries || []);
}
function mysteryForDayOffset(offset = 0) {
  const pool = publicMysteries();
  if (!pool.length) return null;
  const index = ((todayIndex() - offset) % pool.length + pool.length) % pool.length;
  return pool[index];
}
function dailyMystery() { return mysteryForDayOffset(0); }
function isTodayMystery(id) { return Boolean(id && dailyMystery()?.id === id); }
function isUnlockedMystery(id) { return Boolean(state.unlockedMysteries?.[id]); }
function isAccessibleMystery(id) { return Boolean(isTodayMystery(id) || mysterySolved(id) || isUnlockedMystery(id)); }
function currentMystery() {
  const pool = publicMysteries();
  const selected = pool.find(m => m.id === state.currentMysteryId);
  return selected && isAccessibleMystery(selected.id) ? selected : dailyMystery();
}
function mysteryById(id) { return publicMysteries().find(m => m.id === id); }
function archiveEntries() {
  const seen = new Set();
  const entries = [];
  for (let offset = 1; offset <= ARCHIVE_DAYS_VISIBLE; offset += 1) {
    const mystery = mysteryForDayOffset(offset);
    if (!mystery || seen.has(mystery.id)) continue;
    seen.add(mystery.id);
    entries.push({ mystery, offset });
  }
  return entries;
}
function archiveUnlockedCount() { return Object.keys(state.unlockedMysteries || {}).length; }
function archiveSolvedCount() {
  return archiveEntries().filter(entry => mysterySolved(entry.mystery.id)).length;
}
function unlockPastMystery(id) {
  const mystery = mysteryById(id);
  if (!mystery) return;
  if (isAccessibleMystery(id)) {
    setState({ currentMysteryId: id, archiveFeedback: "" });
    return;
  }
  if ((state.gems || 0) < ARCHIVE_UNLOCK_COST) {
    setState({ archiveFeedback: `Il te faut ${ARCHIVE_UNLOCK_COST} gemmes pour ouvrir une archive. Tu en as ${state.gems || 0}.` });
    return;
  }
  state.gems = Math.max(0, (state.gems || 0) - ARCHIVE_UNLOCK_COST);
  state.unlockedMysteries = { ...(state.unlockedMysteries || {}), [id]: { at: Date.now(), cost: ARCHIVE_UNLOCK_COST } };
  state.currentMysteryId = id;
  state.archiveFeedback = "Archive débloquée. Elle reste disponible.";
  state.achievements.firstArchive = true;
  saveState();
  render();
}
function mysteryStats() {
  const solved = Object.keys(state.solvedMysteries || {}).length;
  const total = publicMysteries().length || 0;
  const expertSolved = data.mysteries.filter(m => m.difficulty === "expert" && mysterySolved(m.id)).length;
  const expertTotal = data.mysteries.filter(m => m.difficulty === "expert").length;
  const avgScore = solved ? Math.round(Object.values(state.solvedMysteries).reduce((sum, item) => sum + (item.score || 0), 0) / solved) : 0;
  return { solved, total, expertSolved, expertTotal, avgScore };
}
function canShowNextHint(mysteryId) {
  const mystery = mysteryById(mysteryId);
  return (state.seenHints[mysteryId] || 0) < Math.min(3, (mystery?.clues || []).length);
}

function showXPToast(amount, label) {
  const toast = document.createElement("div");
  toast.className = "toast-xp";
  toast.textContent = `+${amount} XP · ${label}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1400);
}
function awardXP(amount, label) {
  state.xp += amount;
  saveState();
  showXPToast(amount, label);
}

function lessonQuizState(id) {
  const key = String(id);
  const current = state.quizProgress?.[key];
  if (current && typeof current === "object") {
    return { answers: {}, correct: {}, attempts: 0, passed: false, ...current };
  }
  return { answers: {}, correct: {}, attempts: 0, passed: false };
}
function lessonQuizPassed(id) {
  if (lessonDone(id)) return true;
  const progress = lessonQuizState(id);
  if (progress.passed) return true;
  const lesson = allLessons().find(l => l.id === id);
  if (!lesson) return false;
  const content = buildLessonContent(lesson);
  if (content.unavailable) return false;
  const total = normalizeQuizPack(content.quiz, lesson, content).length;
  const answeredCount = Object.keys(progress.answers || {}).length;
  const correctCount = Object.values(progress.correct || {}).filter(Boolean).length;
  return answeredCount >= total && correctCount >= lessonQuizPassThreshold(total);
}
function completeLesson(id) {
  const lesson = allLessons().find(l => l.id === id);
  if (!lesson) return;
  if (!lessonQuizPassed(id)) {
    const content = buildLessonContent(lesson);
    if (content.unavailable) return renderCourseUnavailable(lesson);
    const total = normalizeQuizPack(content.quiz, lesson, content).length;
    const threshold = lessonQuizPassThreshold(total);
    const quizFeedback = { ...(state.quizFeedback || {}), [id]: `Réussis au moins ${threshold}/${total} questions pour valider ce cours.` };
    setState({ tab: "lesson", currentLessonId: id, lessonView: "quiz", lessonFocus: null, quizFeedback });
    return;
  }
  if (!lessonDone(id)) {
    state.completedLessons[id] = true;
    state.achievements.firstLesson = true;
    awardXP(lesson?.xp || 55, "leçon terminée");
  }
  saveState();
  render();
}


function readingMode() {
  return state.readingMode === "complete" ? "complete" : "express";
}
function readingModeLabel() {
  return readingMode() === "complete" ? "mode approfondi" : "mode rapide";
}
function readingModeHint() {
  return readingMode() === "complete"
    ? "Tu préfères le complet, mais chaque cours te demande maintenant explicitement Express / Complet / Quiz."
    : "Les cours s’ouvrent en Express : pas de pavé imposé, Complet et Quiz sont des choix séparés.";
}
function setReadingMode(mode) {
  if (!["express", "complete"].includes(mode)) return;
  setState({ readingMode: mode, lessonView: mode === "complete" ? "complete" : "express" });
}
function lessonSpoilsMystery(lesson, mystery) {
  if (!lesson || !mystery) return false;
  if (mystery.lessonId && lesson.id === mystery.lessonId) return true;
  const pack = READY_LESSON_PACKS?.[lesson.id] || {};
  const fields = [
    lesson.id, lesson.title, lesson.shortTitle, lesson.period, lesson.location,
    pack.hook,
    ...(Array.isArray(pack.keyFacts) ? pack.keyFacts : []),
    ...(Array.isArray(pack.express) ? pack.express : [])
  ];
  const text = fields.filter(Boolean).join(" ");
  if (textLeaksMystery(text, mystery)) return true;
  const linked = relatedMysteryForLesson(lesson.id);
  return Boolean(linked && linked.id === mystery.id);
}
function dailyLesson() {
  const mystery = dailyMystery();
  const candidates = curatedLessons().filter(lesson => !lessonSpoilsMystery(lesson, mystery));
  if (!candidates.length) return null;
  // Décalage volontaire : le cours du jour n'est jamais le cours-réponse du mystère.
  // On avance si le choix tombe malgré tout sur un cours qui contient la réponse dans son titre/contenu.
  let index = ((todayIndex() * 13 + 17) % candidates.length + candidates.length) % candidates.length;
  for (let guard = 0; guard < candidates.length; guard += 1) {
    const lesson = candidates[(index + guard) % candidates.length];
    if (!lessonSpoilsMystery(lesson, mystery)) return lesson;
  }
  return candidates[index];
}

const HOME_DISCOVERY_ROTATION_MS = 2 * 60 * 60 * 1000;
const HOME_DISCOVERY_OVERRIDES = {
  "latin-america-independent-caudillos": {
    question: "Pourquoi certains pays d’Amérique latine restent-ils instables après l’indépendance ?",
    subtitle: "Caudillos, chefs militaires, fidélités personnelles et États fragiles.",
    intro: "On part de zéro : un caudillo est un chef fort, souvent militaire, qui s’impose quand les jeunes États manquent d’administration, d’argent et d’autorité stable."
  },
  "africa-independences-frontieres-heritees": {
    question: "Pourquoi les nouveaux États africains gardent-ils souvent les frontières coloniales ?",
    subtitle: "Indépendances, héritage colonial, unité africaine et risque de guerre.",
    intro: "Le sujet explique pourquoi une frontière tracée avant l’indépendance peut rester en place même quand elle paraît injuste ou artificielle."
  },
  "africa-independences-partis-uniques": {
    question: "Pourquoi des pays indépendants choisissent-ils parfois le parti unique ?",
    subtitle: "Promesse d’unité nationale, parti-État, opposition contrôlée et autoritarisme.",
    intro: "On explique le raisonnement des nouveaux pouvoirs : unir le pays, contrôler les rivalités, puis parfois verrouiller durablement la vie politique."
  }
};
function seededHash(value = "") {
  let hash = 2166136261;
  const text = String(value);
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
function discoverySlot(now = Date.now()) {
  return Math.floor(now / HOME_DISCOVERY_ROTATION_MS) + (Number(state.discoverOffset) || 0);
}
function timeToNextDiscovery(now = Date.now()) {
  const next = (Math.floor(now / HOME_DISCOVERY_ROTATION_MS) + 1) * HOME_DISCOVERY_ROTATION_MS;
  const remaining = Math.max(0, next - now);
  const minutes = Math.max(1, Math.ceil(remaining / 60000));
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest ? `${hours} h ${String(rest).padStart(2, "0")}` : `${hours} h`;
  }
  return `${minutes} min`;
}
function lessonEpochLabel(world = {}) {
  const start = Number.isFinite(Number(world.sortStart)) ? Number(world.sortStart) : 0;
  const end = Number.isFinite(Number(world.sortEnd)) ? Number(world.sortEnd) : start;
  const mid = (start + end) / 2;
  if (mid < -900) return "Origines";
  if (end <= 500) return "Antiquité";
  if (start < 500 && end <= 800) return "Antiquité tardive";
  if (mid < 1500) return "Moyen Âge";
  if (mid < 1800) return "Temps modernes";
  return "Époque contemporaine";
}
function lessonInterestScore(lesson = {}) {
  let score = 0;
  if (!lessonDone(lesson.id)) score += 30;
  if (READY_LESSON_PACKS[lesson.id]) score += 20;
  if (relatedMysteryForLesson(lesson.id)) score += 8;
  const title = normalize(lesson.title || "");
  if (/peste|rome|guerre|revolution|empire|viking|pharaon|pyramide|samourai|nazis|cold|froide|napoleon|azteque|inca|maya/.test(title)) score += 6;
  return score;
}
function discoveryCandidatesByEpoch() {
  const mystery = dailyMystery();
  const base = curatedLessons().filter(lesson => !lessonSpoilsMystery(lesson, mystery) && !lessonLockedByDailyMystery(lesson));
  const preferred = base.filter(lesson => !lessonDone(lesson.id));
  const pool = preferred.length >= 3 ? preferred : base;
  return pool.reduce((map, lesson) => {
    const world = lessonWorld(lesson);
    const epoch = lessonEpochLabel(world);
    if (!map[epoch]) map[epoch] = [];
    map[epoch].push(lesson);
    return map;
  }, {});
}
function homeDiscoveryLessons() {
  const byEpoch = discoveryCandidatesByEpoch();
  const slot = discoverySlot();
  const epochOrder = ["Origines", "Antiquité", "Antiquité tardive", "Moyen Âge", "Temps modernes", "Époque contemporaine"];
  const rotated = epochOrder.slice(slot % epochOrder.length).concat(epochOrder.slice(0, slot % epochOrder.length));
  const selected = [];
  const usedIds = new Set();
  for (const epoch of rotated) {
    const candidates = (byEpoch[epoch] || []).slice().sort((a, b) => lessonInterestScore(b) - lessonInterestScore(a) || String(a.id).localeCompare(String(b.id)));
    if (!candidates.length) continue;
    const top = candidates.slice(0, Math.min(24, candidates.length));
    const pick = top[seededHash(`${APP_VERSION}:${slot}:${epoch}`) % top.length];
    if (pick && !usedIds.has(pick.id)) {
      selected.push(pick);
      usedIds.add(pick.id);
    }
    if (selected.length >= 3) break;
  }
  if (selected.length < 3) {
    const fallback = curatedLessons().filter(lesson => !usedIds.has(lesson.id) && !lessonLockedByDailyMystery(lesson));
    fallback.sort((a, b) => lessonInterestScore(b) - lessonInterestScore(a) || String(a.id).localeCompare(String(b.id)));
    for (const lesson of fallback) {
      selected.push(lesson);
      usedIds.add(lesson.id);
      if (selected.length >= 3) break;
    }
  }
  return selected;
}
function homeLessonPreview(lesson) {
  const world = lessonWorld(lesson);
  const content = buildLessonContent(lesson);
  const override = HOME_DISCOVERY_OVERRIDES[lesson.id] || null;
  const plainTitle = String(lesson.title || content.title || "ce sujet").replace(/\s+/g, " ").trim();
  const question = override?.question || `De quoi parle-t-on avec « ${plainTitle} » ?`;
  const subtitle = override?.subtitle || `${world.title || "Histoire"} · ${content.period || lesson.period || world.timeframe || "repère historique"}`;
  const intro = override?.intro || short((content.express && content.express[0]) || content.hook || "Un cours court pour comprendre le sujet avant le quiz.", 165);
  return { question, subtitle, intro, epoch: lessonEpochLabel(world), world, content };
}
function homeDiscoveryMarkup(lessons = homeDiscoveryLessons()) {
  if (!lessons.length) return "";
  return `<section class="card home-main-card home-discovery-card">
    <div class="section-title-row">
      <div><span class="card-label">📚 À découvrir maintenant</span><h2>Choisis ce qui te donne envie</h2></div>
      <small>renouvelé dans ${escapeHtml(timeToNextDiscovery())}</small>
    </div>
    <p>Trois portes d’entrée courtes, chacune dans une époque différente.</p>
    <div class="home-discovery-grid">
      ${lessons.map((lesson, index) => {
        const preview = homeLessonPreview(lesson);
        const done = lessonDone(lesson.id);
        return `<article class="home-discovery-item ${done ? "done" : ""}" data-home-discovery="${escapeHtml(lesson.id)}" tabindex="0" role="button">
          <span class="home-discovery-kicker">${escapeHtml(preview.epoch)} · choix ${index + 1}</span>
          <h3>${lesson.emoji || "📜"} ${escapeHtml(preview.question)}</h3>
          <p>${escapeHtml(preview.intro)}</p>
          <small>${escapeHtml(preview.subtitle)}</small>
          <button type="button" data-home-discovery-open="${escapeHtml(lesson.id)}">${done ? "Revoir" : "Commencer"}</button>
        </article>`;
      }).join("")}
    </div>
    <div class="home-card-footer"><span>Tu peux changer les propositions quand rien ne t’accroche.</span><button class="ghost" type="button" data-refresh-discovery>Voir 3 autres cours</button></div>
  </section>`;
}
function openLessonFromHome(lessonId, view = "express") {
  const lesson = curatedLessonById(lessonId);
  if (!lesson || lessonLockedByDailyMystery(lesson)) {
    setState({ tab: "learn", lessonFocus: null, lessonView: "express" });
    return;
  }
  setState({
    tab: "lesson",
    currentLessonId: lesson.id,
    currentWorld: lessonWorldId(lesson.id),
    lessonFocus: view,
    lessonView: view
  });
}
function openDiscoveredLesson(lessonId) {
  openLessonFromHome(lessonId, "express");
}
function homeContinueLesson() {
  const current = allLessons().find(item => item.id === state.currentLessonId);
  if (current && isCuratedLesson(current) && !lessonDone(current.id) && !lessonLockedByDailyMystery(current)) return current;

  const startedIds = Object.keys(state.quizProgress || {}).filter(id => !lessonDone(id));
  for (const id of startedIds) {
    const lesson = allLessons().find(item => item.id === id);
    if (lesson && isCuratedLesson(lesson) && !lessonLockedByDailyMystery(lesson)) return lesson;
  }

  const daily = dailyLesson();
  if (daily && !lessonDone(daily.id) && !lessonLockedByDailyMystery(daily)) return daily;

  return curatedLessons().find(lesson => !lessonDone(lesson.id) && !lessonLockedByDailyMystery(lesson)) || null;
}
function visibleCompletedLessonCount() {
  return curatedLessons().filter(lesson => lessonDone(lesson.id)).length;
}
function homeContinueMarkup() {
  const lesson = homeContinueLesson();
  const completed = visibleCompletedLessonCount();
  const total = curatedLessons().length;
  const ratio = percent(completed, total);
  if (!lesson) {
    return `<section class="card home-main-card home-continue-card">
      <div class="section-title-row"><div><span class="card-label">▶️ Continuer</span><h2>Tout est validé pour l’instant.</h2></div><small>${ratio}%</small></div>
      <p>Tu peux explorer les autres périodes ou revenir au mystère du jour.</p>
      <div class="progress"><i style="width:${ratio}%"></i></div>
      <div class="home-card-footer"><span>${completed}/${total} cours validés</span><button type="button" data-go-learn>Parcours</button></div>
    </section>`;
  }
  const world = lessonWorld(lesson);
  const content = buildLessonContent(lesson);
  const quizItems = normalizeQuizPack(content.quiz, lesson, content);
  const progress = quizProgressForLesson(lesson.id, quizItems.length);
  const started = progress.answeredCount > 0;
  const action = started ? `Reprendre le quiz (${progress.answeredCount}/${progress.total})` : "Reprendre le cours";
  const view = started && !progress.passed ? "quiz" : "express";
  const detail = started
    ? `${progress.correctCount}/${progress.total} bonnes réponses · validation à ${progress.threshold}/${progress.total}`
    : `${lessonEpochLabel(world)} · ${world.title || "Parcours"} · Express ou complet avant quiz`;
  return `<section class="card home-main-card home-continue-card">
    <div class="section-title-row"><div><span class="card-label">▶️ Continuer</span><h2>${lesson.emoji || "📜"} ${escapeHtml(content.title || lesson.title)}</h2></div><small>${ratio}%</small></div>
    <p>${escapeHtml(short(content.hook || (content.express && content.express[0]) || "Reprends exactement là où tu en étais.", 175))}</p>
    <div class="progress"><i style="width:${ratio}%"></i></div>
    <div class="home-card-footer"><span>${escapeHtml(detail)}</span><button type="button" data-home-continue="${escapeHtml(lesson.id)}" data-home-continue-view="${escapeHtml(view)}">${escapeHtml(action)}</button></div>
  </section>`;
}
function dailyChecklistMarkup() {
  const mystery = dailyMystery();
  const lesson = dailyLesson();
  const mysteryDone = Boolean(mystery && mysterySolved(mystery.id));
  const lessonDoneToday = Boolean(lesson && lessonDone(lesson.id));
  const quizLabel = lessonDoneToday ? "cours validé" : (lesson ? "quiz à réussir" : "cours lié absent");
  const items = [
    { ok: mysteryDone, label: mysteryDone ? "Mystère résolu" : "Résoudre le mystère", sub: mysteryDone ? "Rituel validé" : "2 minutes, score maximum sans indice" },
    { ok: lessonDoneToday, label: lessonDoneToday ? "Cours validé" : "Lire l’express", sub: lesson ? "intro courte avant le complet" : "Cours indépendant absent" },
    { ok: lessonDoneToday, label: quizLabel, sub: lessonDoneToday ? "+XP et progression" : "obligatoire pour valider le cours" }
  ];
  return `<section class="card daily-checklist-card soft-panel"><div class="section-title-row"><div><span class="card-label">Aujourd’hui</span><h2>Un mystère, un express court, puis un vrai quiz pour valider.</h2></div><small>${readingModeLabel()}</small></div><div class="daily-checklist">${items.map(item => `<div class="${item.ok ? "done" : ""}"><b>${item.ok ? "✓" : "•"}</b><span>${escapeHtml(item.label)}<small>${escapeHtml(item.sub)}</small></span></div>`).join("")}</div></section>`;
}

function nextActionMarkup() {
  const mystery = dailyMystery();
  const lesson = dailyLesson();
  const mysteryDone = Boolean(mystery && mysterySolved(mystery.id));
  const lessonDoneToday = Boolean(lesson && lessonDone(lesson.id));
  let title = "Joue sans indice d’abord";
  let text = "Le meilleur score vient d’une réponse précise, sans aide automatique. Les indices restent un choix volontaire.";
  let action = "Lancer le dossier";
  let attr = "data-next-mystery";
  if (mysteryDone && lesson && !lessonDoneToday) {
    title = "Continue avec le cours du jour";
    text = "Commence par l’express, puis passe au cours complet et au quiz si tu veux valider la leçon.";
    action = "Ouvrir le cours";
    attr = `data-next-lesson="${escapeHtml(lesson.id)}"`;
  } else if (mysteryDone) {
    title = "Rituel terminé";
    text = `Tu as fait le cœur du jeu. Nouveau dossier dans ${timeToNextDaily()} ; les archives restent un rattrapage, pas un mode infini.`;
    action = "Voir les archives";
    attr = "data-next-archives";
  }
  return `<section class="card next-action-card"><div><span class="card-label">À faire maintenant</span><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p></div><button ${attr}>${escapeHtml(action)}</button></section>`;
}
function dailyRoadmapMarkup() {
  const todaySolved = dailySolvedToday();
  const rows = [0, 1, 2, 3].map(offset => {
    const mystery = mysteryForDayOffset(-offset);
    if (!mystery) return "";
    const label = offset === 0 ? "Aujourd’hui" : offset === 1 ? "Hier" : offset === 2 ? "Avant-hier" : `J-${offset}`;
    const stateLabel = offset === 0 ? (todaySolved ? "validé" : "à jouer") : (mysterySolved(mystery.id) ? "résolu" : "manqué");
    const reward = offset === 0 ? `${dailyRewardPreview().gems} 💎` : "archive";
    return `<div class="roadmap-day ${offset === 0 ? "today" : "past"}"><b>${escapeHtml(label)}</b><span>${difficultyStars(mystery.difficulty)} ${difficultyLabel(mystery.difficulty)}</span><small>${escapeHtml(stateLabel)} · ${escapeHtml(reward)}</small></div>`;
  }).join("");
  return `<section class="card daily-roadmap-card soft-panel"><div class="section-title-row"><div><span class="card-label">Rythme quotidien</span><h2>Les derniers dossiers, sans promesse de contenu vide.</h2></div><small>prochain dans ${timeToNextDaily()}</small></div><div class="roadmap-grid">${rows}</div></section>`;
}

function recentDailyCalendarMarkup({ compact = false } = {}) {
  const today = startOfLocalDay();
  const cells = [];
  for (let i = 6; i >= 0; i -= 1) {
    const ts = today - i * DAY_MS;
    const key = localDayKey(ts);
    const claim = state.dailyHistory?.[key] || state.dailyClaims?.[key] || null;
    const date = new Date(ts);
    const label = i === 0 ? "auj." : date.toLocaleDateString("fr-FR", { weekday: "short" }).replace(".", "");
    cells.push(`<div class="daily-cell ${claim ? "done" : "missed"} ${i === 0 ? "today" : ""}"><b>${escapeHtml(label)}</b><span>${claim ? "✓" : "·"}</span><small>${claim ? `${claim.score || 0} XP` : "—"}</small></div>`);
  }
  const solved7 = cells.filter(cell => cell.includes('done')).length;
  return `<section class="card calendar-card soft-panel ${compact ? "compact" : ""}"><div class="section-title-row"><div><span class="card-label">Rythme réel</span><h2>7 derniers jours</h2></div><small>${solved7}/7 joués</small></div><div class="daily-calendar">${cells.join("")}</div></section>`;
}
function weeklyScoreDetails() {
  const start = rangeForScope("week").start;
  const today = startOfLocalDay();
  const rows = [];
  for (let ts = start; ts <= today; ts += DAY_MS) {
    const key = localDayKey(ts);
    const claim = state.dailyHistory?.[key] || null;
    const date = new Date(ts);
    rows.push({ label: date.toLocaleDateString("fr-FR", { weekday: "short" }).replace(".", ""), score: claim?.score || 0, played: Boolean(claim) });
  }
  return rows;
}
function weeklyScoreMarkup() {
  const rows = weeklyScoreDetails();
  return `<section class="card weekly-detail-card"><div class="section-title-row"><div><span class="card-label">Contrôle score</span><h2>Détail de ta semaine</h2></div><small>${scoreForScope("week")} XP</small></div><div class="week-score-strip">${rows.map(row => `<div class="${row.played ? "played" : ""}"><b>${escapeHtml(row.label)}</b><span>${row.score}</span></div>`).join("")}</div></section>`;
}
function lessonQualityLabel(lesson) {
  return isCuratedLesson(lesson) ? "cours prêt" : "en reprise";
}
function nextReadyLesson() {
  const ready = readyLessons();
  return ready.find(lesson => !lessonDone(lesson.id)) || ready[0] || null;
}
function readySpotlightMarkup() {
  const lesson = nextReadyLesson();
  if (!lesson) return "";
  const world = lessonWorld(lesson);
  return `<section class="card ready-spotlight-card soft-panel"><div><span class="card-label">Cours recommandé</span><h2>${escapeHtml(lesson.title)}</h2><p>${escapeHtml(world.title || "Parcours")} · ${lessonQualityLabel(lesson)} · bon point d’entrée.</p></div><button data-ready-spotlight="${escapeHtml(lesson.id)}">Ouvrir</button></section>`;
}
function archiveBacklogCount() {
  return archiveEntries().filter(entry => isUnlockedMystery(entry.mystery.id) && !mysterySolved(entry.mystery.id)).length;
}
function archiveBacklogMarkup() {
  const backlog = archiveBacklogCount();
  if (!backlog) return "";
  return `<section class="card archive-backlog-card"><div><span class="card-label">Archive ouverte</span><h2>${backlog} dossier${backlog > 1 ? "s" : ""} à finir</h2><p>Tu as déjà payé les gemmes : autant le résoudre quand tu as deux minutes.</p></div><button data-scroll-archives>Voir</button></section>`;
}

function sessionCoachMarkup() {
  if (state.dismissedCoachVersion === APP_VERSION || typeof HISTODAILY_ONBOARDING.sessionTip !== "function") return "";
  const lesson = dailyLesson();
  const tip = HISTODAILY_ONBOARDING.sessionTip({
    state,
    data,
    readyIds: Object.keys(READY_LESSON_PACKS || {}),
    counts: {
      todayDone: dailySolvedToday(),
      linkedLessonDone: Boolean(lesson && lessonDone(lesson.id)),
      archiveBacklog: archiveBacklogCount()
    }
  });
  if (!tip) return "";
  return `<section class="card coach-card soft-panel"><div><span class="card-label">${escapeHtml(tip.label || "Conseil")}</span><h2>${escapeHtml(tip.title || "Que faire maintenant ?")}</h2><p>${escapeHtml(tip.text || "")}</p></div><div class="coach-actions"><button data-coach-action="${escapeHtml(tip.action || "mystery")}">${escapeHtml(tip.cta || "Continuer")}</button><button class="ghost" data-dismiss-coach>Masquer</button></div></section>`;
}
function handleCoachAction(action) {
  const mystery = dailyMystery();
  const lesson = dailyLesson();
  const backlog = archiveEntries().find(entry => isUnlockedMystery(entry.mystery.id) && !mysterySolved(entry.mystery.id));
  if (action === "daily-lesson" && lesson) return setState({ tab: "lesson", currentLessonId: lesson.id, lessonFocus: "express", lessonView: "express" });
  if (action === "ready") {
    const ready = nextReadyLesson();
    if (ready) return setState({ tab: "lesson", currentLessonId: ready.id, lessonFocus: "express", lessonView: "express" });
  }
  if (action === "archive" && backlog) return setState({ tab: "mystery", currentMysteryId: backlog.mystery.id, archiveFeedback: "" });
  if (action === "home") return setState({ tab: "home" });
  return setState({ tab: "mystery", currentMysteryId: mystery?.id || null });
}
function readyProgressMarkup() {
  const ready = readyLessons();
  if (!ready.length) return "";
  const done = ready.filter(lesson => lessonDone(lesson.id)).length;
  const ratio = percent(done, ready.length);
  return `<section class="card ready-progress-card soft-panel"><div class="section-title-row"><div><span class="card-label">Cours prêts</span><h2>${done}/${ready.length} cours validés</h2></div><small>${ratio}%</small></div><p>Les parcours proposés ici sont les plus solides : lecture claire, détails utiles, quiz cohérent.</p><div class="progress"><i style="width:${ratio}%"></i></div><button class="ghost wide" data-open-ready-list>Voir les cours</button></section>`;
}
function learnFilter() {
  const allowed = ["all", "ready", "linked", "todo"];
  if (state.learnFilter === ("pre" + "mium")) return "ready";
  return allowed.includes(state.learnFilter) ? state.learnFilter : "all";
}
function learnSearchQuery() {
  return String(state.learnSearch || "").trim();
}
function lessonSearchText(lesson) {
  const pack = READY_LESSON_PACKS[lesson?.id] || {};
  const mystery = relatedMysteryForLesson(lesson?.id) || {};
  const fields = [
    lesson?.id,
    lesson?.title,
    lesson?.period,
    lesson?.location,
    mystery.answer,
    mystery.title,
    pack.hook,
    ...(Array.isArray(pack.keyFacts) ? pack.keyFacts : []),
    ...(Array.isArray(pack.express) ? pack.express : [])
  ];
  return normalize(fields.filter(Boolean).join(" "));
}
function matchesLearnSearch(lesson, query) {
  const normalized = normalize(query);
  if (!normalized) return true;
  const haystack = lessonSearchText(lesson);
  return normalized.split(" ").filter(Boolean).every(token => haystack.includes(token));
}
function filterLessons(lessons) {
  const filter = learnFilter();
  const query = learnSearchQuery();
  let filtered = lessons;
  if (filter === "ready") filtered = filtered.filter(lesson => READY_LESSON_PACKS[lesson.id]);
  if (filter === "linked") filtered = filtered.filter(lesson => relatedMysteryForLesson(lesson.id));
  if (filter === "todo") filtered = filtered.filter(lesson => !lessonDone(lesson.id));
  if (query) filtered = filtered.filter(lesson => matchesLearnSearch(lesson, query));
  return filtered;
}
function learnFilterMarkup(all, shown) {
  if (!all.length) {
    return `<section class="card learn-filter-card planned-lessons-note"><div><span class="card-label">Cours à écrire</span><h2>Le squelette du domaine est posé.</h2><p>Les grands chapitres sont rangés. Il reste à remplir les vrais cours, sans ajouter de contenu vide juste pour faire nombre.</p></div></section>`;
  }
  const filter = learnFilter();
  const search = learnSearchQuery();
  const counts = {
    all: all.length,
    ready: all.filter(isCuratedLesson).length,
    linked: all.filter(lesson => relatedMysteryForLesson(lesson.id)).length,
    todo: all.filter(lesson => !lessonDone(lesson.id)).length
  };
  const item = (id, label) => `<button data-learn-filter="${id}" class="${filter === id ? "active" : ""}">${label} <small>${counts[id]}</small></button>`;
  return `<section class="card learn-filter-card"><div><span class="card-label">Parcours</span><h2>${shown.length} cours disponible${shown.length > 1 ? "s" : ""}</h2><p>Choisis un parcours clair : chaque cours proposé ici peut être lu puis validé par son quiz.</p></div><form class="learn-search" data-learn-search-form><input name="learnSearch" value="${escapeHtml(search)}" placeholder="Chercher : Égypte, droit, feu, révolution…" aria-label="Rechercher un cours"/><button>Rechercher</button>${search ? `<button type="button" class="ghost" data-clear-learn-search>Effacer</button>` : ""}</form>${search ? `<p class="learn-search-note">Recherche active : <b>${escapeHtml(search)}</b></p>` : ""}<div class="learn-filter-actions">${item("all", "Tous")}${item("linked", "Mystères")}${item("todo", "À faire")}</div></section>`;
}

function stateHealthReport() {
  const solved = Object.keys(state.solvedMysteries || {}).length;
  const ready = readyLessonCount();
  let lastOk = "jamais";
  try {
    const stamp = Number(localStorage.getItem(`${STORAGE_KEY}_last_ok`) || 0);
    if (stamp) lastOk = new Date(stamp).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  } catch {}
  return {
    solved,
    ready,
    backup: true,
    lastOk,
    status: publicMysteries().length && allLessons().length ? "OK" : "contenu incomplet"
  };
}

function revealHint(mysteryId) {
  const mystery = data.mysteries.find(m => m.id === mysteryId);
  const maxHints = Math.min(3, (mystery?.clues || []).length);
  const count = state.seenHints[mysteryId] || 0;
  state.seenHints[mysteryId] = Math.min(count + 1, maxHints);
  saveState();
  render();
}

function mysteryScoreBreakdown(mysteryId) {
  const mystery = data.mysteries.find(m => m.id === mysteryId) || {};
  const hints = state.seenHints[mysteryId] || 0;
  const tries = state.mysteryTries[mysteryId] || 0;
  if (typeof HISTODAILY_CORE.scoreBreakdown === "function") {
    return HISTODAILY_CORE.scoreBreakdown({ difficulty: mystery.difficulty, hints, tries });
  }
  const base = SCORE_BASE[mystery.difficulty] || SCORE_BASE.moyen;
  const floor = SCORE_FLOOR[mystery.difficulty] || SCORE_FLOOR.moyen;
  const hintPenalty = hints * SCORE_PENALTY_HINT;
  const extraTries = Math.max(0, tries - 1);
  const tryPenalty = extraTries * SCORE_PENALTY_EXTRA_TRY;
  return { base, floor, hints, extraTries, hintPenalty, tryPenalty, score: Math.max(floor, base - hintPenalty - tryPenalty) };
}
function mysteryScore(mysteryId) {
  return mysteryScoreBreakdown(mysteryId).score;
}
function scoreBreakdownMarkup(mysteryId) {
  const b = mysteryScoreBreakdown(mysteryId);
  return `<div class="score-breakdown"><span>Base ${b.base}</span><span>Indices -${b.hintPenalty}</span><span>Essais -${b.tryPenalty}</span><strong>${b.score} XP</strong></div>`;
}

function resultShareText(mysteryId) {
  const mystery = data.mysteries.find(m => m.id === mysteryId) || {};
  const solvedData = state.solvedMysteries?.[mysteryId] || {};
  const daily = isTodayMystery(mysteryId);
  const label = daily ? "mystère du jour" : "mystère d’archive";
  const score = solvedData.score || mysteryScore(mysteryId);
  const tries = solvedData.tries || state.mysteryTries?.[mysteryId] || 1;
  const hints = solvedData.hints || state.seenHints?.[mysteryId] || 0;
  const precision = hints === 0 ? "sans indice" : `${hints} indice${hints > 1 ? "s" : ""}`;
  return `J’ai résolu le ${label} HistoDaily (${difficultyLabel(mystery.difficulty)}) : ${score} XP, ${tries} essai${tries > 1 ? "s" : ""}, ${precision}. À toi de jouer demain.`;
}
async function shareMysteryResult(mysteryId) {
  const text = resultShareText(mysteryId);
  let ok = false;
  try {
    if (navigator.share) { await navigator.share({ title: "HistoDaily", text }); ok = true; }
    else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); ok = true; }
  } catch {}
  state.shareFeedback = { ...(state.shareFeedback || {}), [mysteryId]: ok ? "Score partagé / copié sans spoiler la réponse." : text };
  saveState();
  render();
}
function shareResultMarkup(mysteryId) {
  const feedback = state.shareFeedback?.[mysteryId] || "";
  return `<div class="share-result-card"><div><b>Faire venir quelqu’un demain</b><span>Partage ton score sans spoiler la réponse du jour.</span></div><button data-share-result="${escapeHtml(mysteryId)}">Partager</button>${feedback ? `<p>${escapeHtml(feedback)}</p>` : ""}</div>`;
}


function isAcceptedGuess(rawGuess, mystery) {
  const guess = normalize(rawGuess);
  if (!guess || guess.length < 3) return false;
  const blocked = (mystery.blockedGuesses || []).map(normalize).filter(Boolean);
  if (blocked.includes(guess)) return false;
  const candidates = [mystery.answer, ...(mystery.aliases || [])]
    .map(normalize)
    .filter(candidate => candidate && candidate.length >= 3);
  return candidates.some(candidate => {
    if (guess === candidate) return true;
    const candidateTokens = candidate.split(" ").filter(Boolean);
    if (candidateTokens.length === 1) return guess.split(" ").includes(candidate);
    return guess.length >= candidate.length && (` ${guess} `).includes(` ${candidate} `);
  });
}

function guessFeedback(rawGuess, mystery) {
  const guess = normalize(rawGuess);
  if (!guess) return "Écris une vraie proposition : un nom, un lieu, un événement ou un concept précis.";
  const blocked = (mystery.blockedGuesses || []).map(normalize).filter(Boolean);
  if (blocked.includes(guess)) return "Trop large : tu es dans la bonne zone, mais le jeu attend le nom précis du dossier.";
  const candidates = [mystery.answer, ...(mystery.aliases || [])].map(normalize).filter(Boolean);
  const tokens = guess.split(" ").filter(t => t.length > 3);
  const overlap = candidates.some(candidate => tokens.some(token => candidate.includes(token)));
  if (overlap) return "Tu chauffes, mais ta réponse est encore incomplète ou mal ciblée.";
  const tries = state.mysteryTries[mystery.id] || 0;
  if (tries >= 2 && canShowNextHint(mystery.id)) return "Pas ça. Tu peux choisir un indice, mais rien n’est donné automatiquement : sans indice, le score reste meilleur.";
  return "Non. Aucun indice automatique : cherche plutôt ce que toutes les traces du dossier ont en commun.";
}
function submitGuess(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  const form = event?.currentTarget?.matches?.("[data-guess]") ? event.currentTarget : document.querySelector("[data-guess]");
  const input = form?.querySelector("input") || document.querySelector("[data-guess-input]");
  const selected = state.currentMysteryId ? mysteryById(state.currentMysteryId) : null;
  const mystery = (selected && isSelectedMysteryPlayable(selected)) ? selected : currentMystery();
  if (!mystery?.id) return;
  const guess = input?.value || "";
  state.mysteryTries[mystery.id] = (state.mysteryTries[mystery.id] || 0) + 1;
  if (isAcceptedGuess(guess, mystery)) {
    const score = mysteryScore(mystery.id);
    const dailyReward = applyDailyReward(mystery.id, score);
    const isArchive = !isTodayMystery(mystery.id);
    state.solvedMysteries[mystery.id] = { at: Date.now(), tries: state.mysteryTries[mystery.id], hints: state.seenHints[mystery.id] || 0, score, difficulty: mystery.difficulty, daily: isTodayMystery(mystery.id), archive: isArchive };
    state.achievements.firstMystery = true;
    if (mystery.difficulty === "expert") state.achievements.expertMystery = true;
    if ((state.seenHints[mystery.id] || 0) === 0) state.achievements.noHint = true;
    if (isArchive) state.achievements.firstArchive = true;
    state.rewardFeedback = { ...(state.rewardFeedback || {}), [mystery.id]: dailyReward || (isArchive ? "Archive résolue : XP gagné, mais les gemmes restent réservées au rendez-vous quotidien." : "") };
    if (state.mysteryFeedback) delete state.mysteryFeedback[mystery.id];
    awardXP(score, "mystère résolu");
    saveState();
    queueScoreSubmit(mystery.id);
    render();
  } else {
    state.mysteryFeedback = { ...(state.mysteryFeedback || {}), [mystery.id]: guessFeedback(guess, mystery) };
    saveState();
    if (input) {
      input.value = "";
      input.placeholder = "Réponse plus précise…";
      input.classList.add("shake");
      setTimeout(() => input.classList.remove("shake"), 450);
    }
    render();
  }
}


function systemStatusMarkup() {
  if (!isOnline) {
    return `<section class="app-status-banner offline"><b>Mode hors-ligne</b><span>L’app reste utilisable. Les scores seront locaux jusqu’au retour réseau.</span></section>`;
  }
  return "";
}
function platformInstallHint() {
  const ua = navigator.userAgent || "";
  if (/iphone|ipad|ipod/i.test(ua)) return "Sur iPhone : bouton Partager → Sur l’écran d’accueil.";
  return installPromptEvent ? "Installation disponible sur cet appareil." : "Si le bouton n’apparaît pas, utilise le menu du navigateur → Installer l’application.";
}
function installPromptMarkup() {
  if (state.installDismissed) return "";
  const canPrompt = Boolean(installPromptEvent);
  return `<section class="card install-card soft-panel"><div><span class="card-label">App mobile</span><h2>Installe HistoDaily en raccourci.</h2><p>${platformInstallHint()} C’est plus rapide pour revenir au mystère du jour.</p></div><div class="install-actions"><button data-install-app>${canPrompt ? "Installer" : "Comment faire"}</button><button class="ghost" data-dismiss-install>Plus tard</button></div>${state.installFeedback ? `<p>${escapeHtml(state.installFeedback)}</p>` : ""}</section>`;
}

function releaseNotesMarkup({ home = false } = {}) {
  const notes = HISTODAILY_CORE.ui?.releaseNotes || [];
  if (!notes.length || state.dismissedReleaseVersion === APP_VERSION) return "";
  const versionLabel = HISTODAILY_CORE.ui?.versionLabel || APP_VERSION;
  return `<section class="card release-card soft-panel ${home ? "home-release-card" : ""}"><div class="section-title-row"><div><span class="card-label">Journal de version</span><h2>Version ${escapeHtml(versionLabel)}</h2></div><small>Dernière maj</small></div><p>Ce qui a changé dans cette version :</p><ul>${notes.map(note => `<li>${escapeHtml(note)}</li>`).join("")}</ul><div class="home-card-footer"><span>${escapeHtml(APP_VERSION)}</span><button class="ghost" data-dismiss-release>OK</button></div></section>`;
}
function homeVersionPillMarkup() {
  const versionLabel = HISTODAILY_CORE.ui?.versionLabel || APP_VERSION;
  return `<span class="version-pill">${escapeHtml(versionLabel)}</span>`;
}
function performanceMode() { return state.performanceMode === "balanced" ? "balanced" : "light"; }
function applyPerformanceMode() {
  if (typeof document === "undefined") return;
  const mode = performanceMode();
  document.body.classList.toggle("performance-light", mode === "light");
  document.body.dataset.performanceMode = mode;
}
function setPerformanceMode(mode) {
  setState({ performanceMode: mode === "balanced" ? "balanced" : "light" });
}
function performanceSettingsMarkup() {
  const mode = performanceMode();
  const label = mode === "light" ? "Mode fluide" : "Animations visuelles";
  return `<section class="card performance-card"><div><span class="card-label">Performance mobile</span><h2>${escapeHtml(label)}</h2><p>${mode === "light" ? "Mode recommandé : navigation plus rapide, flous coupés, animations désactivées et sauvegarde moins bloquante." : "Mode plus joli mais plus lourd : à garder seulement si le téléphone reste parfaitement fluide."}</p></div><div class="performance-actions"><button data-performance-mode="light" class="${mode === "light" ? "active" : ""}">⚡ Fluide</button><button data-performance-mode="balanced" class="${mode === "balanced" ? "active" : ""}">✨ Visuel</button></div></section>`;
}
async function installApp() {
  if (!installPromptEvent) {
    setState({ installFeedback: platformInstallHint() });
    return;
  }
  const prompt = installPromptEvent;
  installPromptEvent = null;
  try {
    prompt.prompt();
    const choice = await prompt.userChoice;
    setState({ installFeedback: choice?.outcome === "accepted" ? "Installation lancée." : "Installation annulée. Tu pourras réessayer plus tard.", installDismissed: choice?.outcome === "accepted" });
  } catch {
    setState({ installFeedback: platformInstallHint() });
  }
}
function isTextControl(element) {
  return Boolean(element && element.closest && element.closest("input, textarea, select, [contenteditable='true']"));
}
function activateTextControls(root = document) {
  root.querySelectorAll("input, textarea, select").forEach(control => {
    control.classList.add("text-entry-safe");
    control.setAttribute("data-text-entry-safe", "true");
    control.addEventListener("pointerdown", event => event.stopPropagation(), true);
    control.addEventListener("mousedown", event => event.stopPropagation(), true);
    control.addEventListener("touchstart", event => event.stopPropagation(), { capture: true, passive: true });
    control.addEventListener("click", event => { event.stopPropagation(); event.currentTarget.focus(); }, true);
  });
}
document.addEventListener("pointerdown", event => { if (isTextControl(event.target)) event.stopPropagation(); }, true);
document.addEventListener("mousedown", event => { if (isTextControl(event.target)) event.stopPropagation(); }, true);
document.addEventListener("click", event => { if (isTextControl(event.target)) event.stopPropagation(); }, true);

function renderShell(content) {
  applyPerformanceMode();
  const immersiveLesson = state.tab === "lesson";
  const navMarkup = immersiveLesson ? "" : `<nav class="bottom-nav">
        ${navButton("home", "⌂", "Accueil")}
        ${navButton("learn", "📖", "Cours")}
        ${navButton("mystery", "🕵️", "Mystère")}
        ${navButton("rank", "🏆", "Classement")}
        ${navButton("profile", "👤", "Profil")}
      </nav>`;
  app.innerHTML = `
    <main class="app-shell tab-${state.tab} ${immersiveLesson ? "course-fullscreen-shell" : ""}">
      ${systemStatusMarkup()}
      ${content}
      ${navMarkup}
    </main>`;
  app.querySelectorAll("[data-tab]").forEach(btn => btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;
    if (!tab || tab === state.tab) return;
    const patch = { tab };
    if (tab === "mystery") patch.currentMysteryId = dailyMystery()?.id || null;
    setState(patch, { save: false });
  }));
  activateTextControls(app);
}
function navButton(tab, icon, label) { return `<button data-tab="${tab}" class="nav-item ${state.tab === tab ? "active" : ""}"><span>${icon}</span><small>${label}</small></button>`; }

function renderHome() {
  const mystery = dailyMystery();
  const reward = dailyRewardPreview();
  const discoveries = homeDiscoveryLessons();
  const solvedToday = Boolean(mystery && mysterySolved(mystery.id));
  const nextLabel = solvedToday ? `Nouveau dossier dans ${timeToNextDaily()}` : `+${reward.gems} 💎 si tu résous aujourd’hui`;
  renderShell(`
    <header class="hero compact home-clean-hero">
      <div>
        <p class="eyebrow">HistoDaily</p>
        <h1>Un mystère historique par jour, puis le cours qui va avec.</h1>
        <div class="hero-metrics"><span>🔥 ${state.streak || 0}</span><span>💎 ${state.gems || 0}</span><span>Niv. ${level()}</span>${homeVersionPillMarkup()}</div>
      </div>
    </header>

    ${mystery ? `<section class="card home-main-card home-mystery-card" data-home-mystery role="button" tabindex="0">
      <div class="section-title-row">
        <div><span class="card-label">🕵️ Mystère du jour</span><h2>${escapeHtml(mysteryDisplayTitle(mystery))}</h2></div>
        <small>${solvedToday ? "résolu" : difficultyStars(mystery.difficulty)}</small>
      </div>
      <p>${escapeHtml(short(mysteryTeaser(mystery), 190))}</p>
      <div class="home-card-footer"><span>${escapeHtml(nextLabel)}</span><button>${solvedToday ? "Revoir" : "Jouer"}</button></div>
    </section>` : `<section class="card home-main-card"><h2>Aucun mystère chargé</h2><p>La donnée mystère est vide ou inaccessible.</p></section>`}

    ${homeContinueMarkup()}

    ${homeDiscoveryMarkup(discoveries)}

    ${releaseNotesMarkup({ home: true })}

    <section class="home-secondary-actions">
      <button class="ghost" data-go-learn>Parcours complet</button>
      <button class="ghost" data-home-rank>Classement</button>
      <button class="ghost" data-home-profile>Profil</button>
    </section>`);

  const openMystery = () => { const did = typeof disciplineId !== "undefined" ? disciplineId : activeDisciplineId(); return mystery && setState({ tab: "mystery", currentMysteryId: mystery.id, currentMysteryDiscipline: did, currentDiscipline: did }); };
  const mysteryCard = $(`[data-home-mystery]`);
  mysteryCard?.addEventListener("click", openMystery);
  mysteryCard?.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openMystery(); } });
  document.querySelectorAll("[data-home-mystery-button]").forEach(btn => btn.addEventListener("click", event => { event.stopPropagation(); openMystery(); }));
  document.querySelectorAll("[data-home-continue]").forEach(btn => btn.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    openLessonFromHome(btn.dataset.homeContinue, btn.dataset.homeContinueView || "express");
  }));
  document.querySelectorAll("[data-home-discovery]").forEach(card => card.addEventListener("click", event => {
    event.stopPropagation();
    openDiscoveredLesson(card.dataset.homeDiscovery);
  }));
  document.querySelectorAll("[data-home-discovery]").forEach(card => card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openDiscoveredLesson(card.dataset.homeDiscovery); }
  }));
  document.querySelectorAll("[data-home-discovery-open]").forEach(btn => btn.addEventListener("click", event => {
    event.stopPropagation();
    openDiscoveredLesson(btn.dataset.homeDiscoveryOpen);
  }));
  $(`[data-refresh-discovery]`)?.addEventListener("click", event => {
    event.preventDefault();
    setState({ discoverOffset: (Number(state.discoverOffset) || 0) + 1 });
  });
  document.querySelectorAll("[data-go-learn]").forEach(btn => btn.addEventListener("click", () => setState({ tab: "learn" })));
  $(`[data-home-rank]`)?.addEventListener("click", () => setState({ tab: "rank" }));
  $(`[data-home-profile]`)?.addEventListener("click", () => setState({ tab: "profile" }));
  $(`[data-dismiss-release]`)?.addEventListener("click", () => setState({ dismissedReleaseVersion: APP_VERSION }));
}

function renderLearn() {
  const worlds = visibleWorlds(20);
  let world = activeWorld();
  if (!worlds.some(w => w.id === world.id)) world = worlds[0] || world;
  const lessons = curatedLessonsFor(world.id);
  const shownLessons = filterLessons(lessons);
  const curatedInWorld = lessons.filter(isCuratedLesson);
  renderShell(`
    <header class="topbar"><button data-back-home>←</button><div><p class="eyebrow">Parcours</p><h1>${escapeHtml(world.title || "Histoire")}</h1></div></header>
    <section class="chips">${worlds.map(w => `<button data-world="${w.id}" class="chip ${w.id === world.id ? "active" : ""}">${w.emoji || "📚"} ${escapeHtml(w.title)}</button>`).join("")}</section>
    ${learnFilterMarkup(lessons, shownLessons)}
    ${curatedInWorld.length ? `<section class="card ready-strip"><div><span class="card-label">À commencer ici</span><h2>${curatedInWorld.length} cours prêt${curatedInWorld.length > 1 ? "s" : ""} dans ce chapitre</h2><p>Quelques cours prêts pour entrer dans le chapitre sans se perdre.</p></div><div class="ready-mini-list">${curatedInWorld.slice(0,3).map(lesson => `<button data-ready-lesson="${lesson.id}">${lesson.emoji || "📜"} ${escapeHtml(lesson.title)}</button>`).join("")}</div></section>` : ""}
    <section class="lesson-list">
      ${shownLessons.map((lesson, index) => lessonCard(lesson, index)).join("") || `<div class="card empty-filter-card"><h2>Aucun cours trouvé.</h2><p>${learnSearchQuery() ? "Essaie un mot plus large ou efface la recherche." : "Change de chapitre : les autres cours sont encore en reprise."}</p><button data-learn-filter="all">Voir tous les cours disponibles</button></div>`}
    </section>`);
  $("[data-back-home]")?.addEventListener("click", () => setState({ tab: "home" }));
  document.querySelectorAll("[data-world]").forEach(btn => btn.addEventListener("click", () => setState({ currentWorld: btn.dataset.world })));
  document.querySelectorAll("[data-learn-filter]").forEach(btn => btn.addEventListener("click", () => setState({ learnFilter: btn.dataset.learnFilter })));
  $(`[data-learn-search-form]`)?.addEventListener("submit", event => {
    event.preventDefault();
    const input = event.currentTarget.querySelector("input[name='learnSearch']");
    setState({ learnSearch: String(input?.value || "").trim() });
  });
  $(`[data-clear-learn-search]`)?.addEventListener("click", () => setState({ learnSearch: "" }));
  document.querySelectorAll("[data-ready-lesson]").forEach(btn => btn.addEventListener("click", () => setState({ tab: "lesson", currentLessonId: btn.dataset.readyLesson, lessonFocus: "express", lessonView: "express" })));
  document.querySelectorAll("[data-lesson]").forEach(btn => btn.addEventListener("click", () => setState({ tab: "lesson", currentLessonId: btn.dataset.lesson, lessonFocus: "express", lessonView: "express" })));
  document.querySelectorAll("[data-locked-lesson]").forEach(btn => btn.addEventListener("click", () => setState({ tab: "mystery", currentMysteryId: dailyMystery()?.id || null, currentMysteryDiscipline: activeDisciplineId() })));
}
function lessonCard(lesson, index) {
  const done = lessonDone(lesson.id);
  const mystery = relatedMysteryForLesson(lesson.id);
  const ready = Boolean(READY_LESSON_PACKS[lesson.id]);
  const locked = lessonLockedByDailyMystery(lesson);
  if (locked) {
    return `<article class="card lesson-card locked" data-locked-lesson="${escapeHtml(lesson.id)}">
      <span class="lesson-index">🔒</span>
      <div><h2>Cours verrouillé anti-spoil</h2><p>Ce cours explique le mystère du jour. Résous le dossier pour l’ouvrir.</p><small>🕵️ mystère d’abord · 📚 cours après résolution</small></div>
      <strong>bloqué</strong>
    </article>`;
  }
  return `<article class="card lesson-card ${done ? "done" : ""}" data-lesson="${escapeHtml(lesson.id)}">
    <span class="lesson-index">${done ? "✓" : index + 1}</span>
    <div><h2>${lesson.emoji || "📜"} ${escapeHtml(lesson.title)}</h2><p>${escapeHtml(lesson.period || lesson.location || "Leçon courte")}</p><small>${mystery ? "🕵️ mystère lié · " : ""}⚡ express · 📚 complet · ✅ quiz</small></div>
    <strong>${done ? "fait" : `${lesson.xp || 55} XP`}</strong>
  </article>`;
}

function lessonWorldId(lessonId) {
  const entry = Object.entries(data.lessons).find(([, lessons]) => lessons.some(lesson => lesson.id === lessonId));
  return entry ? entry[0] : state.currentWorld;
}
function lessonWorld(lesson) {
  const id = lessonWorldId(lesson.id);
  return data.worlds.find(world => world.id === id) || activeWorld() || {};
}
function relatedMysteryForLesson(lessonId) {
  return data.mysteries.find(mystery => mystery.lessonId === lessonId);
}
function relatedLessonForMystery(mystery) {
  if (!mystery?.lessonId) return null;
  return allLessons().find(lesson => lesson.id === mystery.lessonId) || null;
}
function sentenceList(items) {
  const clean = items.filter(Boolean).map(item => String(item).trim()).filter(Boolean);
  if (!clean.length) return "les repères du chapitre";
  if (clean.length === 1) return clean[0];
  return `${clean.slice(0, -1).join(", ")} et ${clean.at(-1)}`;
}
function normalizeDetailText(text) { return String(text || "").replace(/\s+/g, " ").trim(); }
function safeLower(text) { return String(text || "").toLocaleLowerCase("fr-FR"); }
const PUBLISHED_LESSON_IDS = new Set([
  "prehistory-hominids",
  "prehistory-habilis",
  "prehistory-fire",
  "prehistory-hunt",
  "prehistory-agriculture",
  "prehistory-sapiens",
  "civilizations-fertile-crescent",
  "aegean-mediterranean-minoens-crete",
  "aegean-mediterranean-myceniens-palais",
  "aegean-mediterranean-effondrement-egeen",
  "egypt-nile",
  "egypt-two-lands",
  "egypt-pharaoh-maat",
  "egypt-pyramids",
  "egypt-ramses",
  "egypt-connected",
  "greece-athens-democracy",
  "greece-persian-wars",
  "greece-peloponnesian-war",
  "rome-foundation-kings",
  "rome-italy-expansion",
  "rome-punic-wars",
  "rome-republic-crisis",
  "rome-augustus-principate",
  "rome-christianity-late-empire",
  "northern-viking-worlds-scandinavie",
  "northern-viking-worlds-raids-vikings",
  "northern-viking-worlds-navires-vikings",
  "northern-viking-worlds-colonisation-atlantique",
  "northern-viking-worlds-viking-commerce",
  "northern-viking-worlds-christianisation-nord",
  "northern-viking-worlds-vie-quotidienne",
  "northern-viking-worlds-societe-droit-femmes",
  "northern-viking-worlds-croyances-sagas-runes",
  "atlantic-revolutions-revolution-francaise-1789",
  "1789-crisis",
  "rights-new-france",
  "republic-terror-war",
  "napoleon-empire",
  "europe-after-napoleon",
  "russian-revolution-postwar",
  "second-world-war-detail-resistances-collaborations"
]);

function isPublishedLesson(lesson = {}) {
  return Boolean(lesson?.id && PUBLISHED_LESSON_IDS.has(lesson.id));
}

function qualityWordCount(text = "") {
  return String(text || "").split(/\s+/).filter(Boolean).length;
}

function contentBlockWordCount(blocks = []) {
  return blocks.map(block => `${block?.title || ""} ${block?.text || block || ""}`).join(" ").split(/\s+/).filter(Boolean).length;
}

function extendExpressForPublished(pack = {}, lesson = {}, world = {}, profile = {}) {
  // Un cours publié doit rester publié uniquement si son express est assez solide dans les données sources.
  return Array.isArray(pack.express) ? pack.express.slice() : [];
}

function rawPublishedQuality(pack = {}) {
  const countWords = text => String(text || "").split(/\s+/).filter(Boolean).length;
  const expressWords = countWords(Array.isArray(pack.express) ? pack.express.join(" ") : "");
  const completeWords = countWords(Array.isArray(pack.complete) ? pack.complete.map(block => `${block?.title || ""} ${block?.text || block || ""}`).join(" ") : "");
  const quizCount = Array.isArray(pack.quiz) ? pack.quiz.length : 0;
  return { expressWords, completeWords, quizCount, pass: expressWords >= 80 && completeWords >= 170 && quizCount === 5 };
}

function extendCompleteForPublished(pack = {}, lesson = {}, world = {}, profile = {}, context = {}) {
  // Si le cours source est trop court, il est masqué par isCuratedLesson au lieu d’être artificiellement gonflé.
  return Array.isArray(pack.complete) ? pack.complete.slice() : [];
}

function extendQuizForPublished(pack = {}, lesson = {}, world = {}) {
  // Ne jamais rallonger une réponse courte par une phrase artificielle.
  return Array.isArray(pack.quiz) ? pack.quiz.slice(0, 5) : [];
}

function publishedLessonPack(pack = {}, lesson = {}, world = {}, profile = {}, context = {}) {
  if (!pack || !isPublishedLesson(lesson)) return pack;
  return {
    ...pack,
    express: extendExpressForPublished(pack, lesson, world, profile),
    complete: extendCompleteForPublished(pack, lesson, world, profile, context),
    quiz: extendQuizForPublished(pack, lesson, world),
    editorialStatus: "published"
  };
}

function isCuratedLesson(lesson = {}) {
  const pack = lesson && READY_LESSON_PACKS[lesson.id];
  return Boolean(lesson && pack && PUBLISHED_LESSON_IDS.has(lesson.id) && rawPublishedQuality(pack).pass);
}
function curatedLessons() {
  return allLessons().filter(isCuratedLesson);
}
function curatedLessonsFor(worldId) {
  return lessonsFor(worldId).filter(isCuratedLesson);
}
function curatedLessonById(id) {
  return curatedLessons().find(lesson => lesson.id === id) || null;
}
function curatedWorlds() {
  return data.worlds.filter(world => curatedLessonsFor(world.id).length > 0);
}
function visibleWorlds(limit = 20) {
  const worlds = curatedWorlds();
  return (worlds.length ? worlds : data.worlds).slice(0, limit);
}

function significantTokens(text = "") {
  const stop = new Set(["les","des","une","un","le","la","du","de","d","l","et","ou","en","au","aux","dans","sur","par","pour","avec","sans","vers","apres","avant","entre","monde","guerre","revolution","empire","royaume","ville","civilisation","histoire"]);
  return normalize(text).split(" ").filter(token => token.length >= 4 && !stop.has(token));
}
function answerLeakTokens(mystery = {}) {
  return Array.from(new Set([...(significantTokens(mystery.answer || "")), ...(significantTokens(mystery.title || ""))])).slice(0, 8);
}
function textLeaksMystery(text = "", mystery = {}) {
  const haystack = normalize(text);
  if (!haystack || !mystery) return false;
  const answer = normalize(mystery.answer || "");
  const title = normalize(mystery.title || "");
  if (answer && haystack.includes(answer)) return true;
  if (title && haystack.includes(title)) return true;
  const tokens = answerLeakTokens(mystery);
  return tokens.length >= 2 && tokens.filter(token => haystack.includes(token)).length >= 2;
}
function maskMysteryAnswer(text = "", mystery = {}) {
  let out = String(text || "");
  const replacements = [mystery.answer, mystery.title, ...(mystery.aliases || [])]
    .filter(Boolean)
    .sort((a, b) => String(b).length - String(a).length);
  replacements.forEach(value => {
    const escaped = String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (escaped.length > 2) out = out.replace(new RegExp(escaped, "gi"), "le sujet");
  });
  return out.replace(/\s+/g, " ").trim();
}
function lessonLockedByDailyMystery(lesson = {}) {
  const mystery = dailyMystery();
  return Boolean(lesson && mystery && !mysterySolved(mystery.id) && mystery.lessonId && lesson.id === mystery.lessonId);
}
function lessonLockMarkup(lesson) {
  const mystery = dailyMystery();
  return `<header class="topbar"><button data-back-learn>←</button><div><p class="eyebrow">Anti-spoil</p><h1>🔒 Cours verrouillé</h1></div></header>
    <section class="card locked-course-card"><span class="card-label">Mystère du jour d’abord</span><h2>Ce cours contient la réponse ou son explication.</h2><p>Pour garder le jeu intéressant, il ne s’ouvre qu’après résolution du mystère du jour. Tu peux tenter le dossier maintenant ou choisir un autre cours dans le parcours.</p><div class="after-actions"><button data-open-daily-mystery>Résoudre le mystère</button><button class="ghost" data-back-learn>Autre cours</button></div></section>`;
}
function mysteryPromptKernel(mystery = {}) {
  const prompt = maskMysteryAnswer(mystery.prompt || mystery.explanation || mystery.caseTitle || "", mystery);
  const chunks = prompt.split(/[.!?]/).map(s => s.trim()).filter(Boolean);
  const best = chunks.find(chunk => chunk.length > 70) || chunks[0] || prompt;
  return short(best, 210);
}

const MYSTERY_SIGNAL_STOPWORDS = new Set([
  "alors", "apres", "avant", "autour", "autres", "avec", "avoir", "cette", "comme", "dans", "depuis", "donc", "dont", "entre", "etre", "leurs", "mais", "moins", "monde", "nom", "peut", "plus", "pour", "quand", "sans", "sont", "sous", "tout", "tres", "vers", "dossier", "historique", "precis", "precise", "reponse", "attend", "attendue", "cherche", "identifier", "bonne", "exact", "exacte", "guerre", "objet", "seulement", "plusieurs", "forme", "donne", "cadre", "niveau", "niveaux", "change", "changent", "acteurs", "traces", "consequences", "periode", "espace", "question", "theme", "grand", "grande", "retrouve", "retrouver", "plusieurs", "niveaux", "occupation", "zones", "suggere", "suggerent", "indique", "indiquent", "suppose", "supposent", "pourtant", "surtout", "domine", "controle", "transforme", "forme", "donner", "devient", "devenir", "continue", "possible", "capable", "capables", "cadre", "pouvoir", "politique", "raconte", "racontent", "cherche", "croiser", "mots", "compter", "siecle", "civil", "civils", "puis", "peuple", "nécessaire", "necessaire"
]);

const MYSTERY_META_PATTERNS = [
  /\bLe dossier attend[^.?!]*[.?!]?/gi,
  /\bLe dossier attend une réponse précise\.?/gi,
  /\bLe dossier cherche un(?:e)? [^.?!]{0,90}?précis(?:e)?\.?/gi,
  /\bNe réponds pas par [^.?!]+[.?!]?/gi,
  /\bResserre progressivement [^.?!]+[.?!]?/gi,
  /\bResserre avec les repères du texte [^.?!]+[.?!]?/gi,
  /\bDernier verrou\s*:?\s*/gi,
  /\bType de réponse\s*:?\s*/gi,
  /\bCadre à resserrer\s*[—:-]?\s*/gi,
  /\bLa réponse doit être [^.?!]+[.?!]?/gi,
  /\bDans ce cadre, cherche ce qui relie les acteurs, les traces et les conséquences\.?/gi
];

function cleanMysteryCopy(text = "", mystery = {}) {
  let out = maskMysteryAnswer(String(text || ""), mystery);
  MYSTERY_META_PATTERNS.forEach(pattern => { out = out.replace(pattern, " "); });
  out = out.replace(/\s+([,.!?;:])/g, "$1").replace(/\s+/g, " ").trim();
  return out.replace(/^[,.;:—-]+\s*/, "").trim();
}

function mysteryPublicPrompt(mystery = {}) {
  const prompt = cleanMysteryCopy(mystery.prompt || "", mystery);
  if (prompt.length >= 55) return prompt;
  const explanation = cleanMysteryCopy(mystery.explanation || "", mystery);
  if (explanation.length >= 55) return explanation;
  return mystery.caseTitle ? cleanMysteryCopy(mystery.caseTitle, mystery) : "Observe les indices et retrouve le sujet historique caché.";
}

function sentenceChunks(text = "") {
  return String(text || "")
    .split(/(?<=[.!?])\s+|[;:]/)
    .map(s => s.trim())
    .filter(s => s.length >= 28 && !/dossier|réponse|nom exact|nom historique/i.test(s));
}

function mysteryKindLabel(mystery = {}, lesson = {}) {
  const t = normalize(`${mystery.id || ""} ${mystery.answer || ""} ${mystery.title || ""} ${lesson.title || ""}`);
  if (/mansa|napoleon|alexandre|auguste|constantin|charlemagne|ashoka|sundiata|toussaint|hammurabi/.test(t)) return "Personnage à identifier";
  if (/feu|outil|bronze|fer|imprimerie|presse|internet|arpanet|intelligence artificielle|modeles de langage|navire|quipu|ecriture|cuneiforme|hieroglyphe|lineaire b|calendrier/.test(t)) return "Technique, support ou système de signes";
  if (/democratie|republique|empire|construction europeenne|ceca|bipolarisation|decolonisation|societe seigneuriale|universites|accord de paris|cop21/.test(t)) return "Institution, régime ou organisation politique";
  if (/revolution|guerre|peste|pandemie|shoah|11 septembre|chute|crise|conquete|terreur|mediques|punique/.test(t)) return "Événement ou rupture historique";
  if (/uruk|harappa|indus|carthage|byzance|hattusa|persepolis|etrurie|angkor|teotihuacan|tenochtitlan|axoum|aksum|bagdad|cordoue|cnossos|zimbabwe|saint-domingue|berlin/.test(t)) return "Lieu, cité ou espace de pouvoir";
  if (/vikings|pheniciens|minoens|myceniens|mayas|mexicas|shang|qin|hittites|assyrie|pharaons|rus|khmer|neandertal|hominides/.test(t)) return "Peuple, civilisation ou groupe historique";
  if (/islam|predication|christianisme|religion|croyance/.test(t)) return "Religion, croyance ou communauté";
  if (/pyramide|maitrise|domestication|agriculture|art parietal|nil|maat|lumiere/.test(t)) return "Pratique, idée ou transformation durable";
  return "Sujet historique précis";
}

function cleanSignalToken(token = "") {
  return String(token || "")
    .replace(/^[dDlL][’']/, "")
    .replace(/^[,.;:!?«»()\[\]{}-]+|[,.;:!?«»()\[\]{}-]+$/g, "")
    .trim();
}

function mysterySignalWords(mystery = {}, max = 6) {
  const source = cleanMysteryCopy(`${mystery.prompt || ""} ${mystery.explanation || ""} ${(mystery.originalClues || []).join(" ")}`, mystery);
  const blocked = new Set([...significantTokens(mystery.answer || ""), ...significantTokens(mystery.title || "")]);
  const raw = source.match(/[\p{L}0-9][\p{L}0-9’'-]*/gu) || [];
  const out = [];
  const seen = new Set();
  raw.forEach(original => {
    if (out.length >= max) return;
    const token = cleanSignalToken(original);
    const key = normalize(token);
    if (key.length < 4 || /^\d+$/.test(key) || /^[ivxlcdm]+e?$/i.test(key) || MYSTERY_SIGNAL_STOPWORDS.has(key) || blocked.has(key) || seen.has(key)) return;
    if (/^(etre|avoir|faire|fait|font|peuvent|peut|dont|avec|sans|dans|comme|cette|celui|celle|leurs|apres|avant|moins|plus|n’est|nest|dune|dun|dun|lors|tout|toute|tous|trop)$/i.test(key)) return;
    if (/^(l|d|qu)[’']/.test(normalize(original))) return;
    seen.add(key);
    out.push(token);
  });
  return out;
}

function mysterySignalPhrase(mystery = {}) {
  const prompt = mysteryPublicPrompt(mystery);
  const explanation = cleanMysteryCopy(mystery.explanation || "", mystery);
  const chunks = [...sentenceChunks(prompt), ...sentenceChunks(explanation)];
  const best = chunks.find(chunk => !textLeaksMystery(chunk, mystery)) || chunks[0] || prompt || explanation;
  return short(cleanMysteryCopy(best, mystery), 150);
}

function cleanMysteryReperePart(value = "", mystery = {}) {
  const cleaned = cleanMysteryCopy(value, mystery).replace(/\ble sujet\b,?\s*/gi, "").replace(/\s+/g, " ").trim();
  if (!cleaned || cleaned.length < 4) return "";
  if (/^(et|ou|de|des|du|la|le)\b/i.test(cleaned) || /^réseaux?\s+marchands?$/i.test(cleaned)) return "";
  return cleaned;
}

function inferredMysteryFrame(mystery = {}) {
  const t = normalize(`${mystery.prompt || ""} ${mystery.explanation || ""} ${mystery.title || ""}`);
  if (/harappa|indus|briques calibrees|sceaux graves/.test(t)) return "vallée de l’Indus";
  if (/saint-domingue|haiti|esclavage|colonie extremement rentable/.test(t)) return "Saint-Domingue · Atlantique révolutionnaire";
  if (/attentat|alliances rigides|nationalismes|mobilisation industrielle/.test(t)) return "Europe des alliances";
  if (/mediterranee/.test(t) && /afrique du nord/.test(t)) return "Méditerranée antique · Afrique du Nord";
  if (/mediterranee/.test(t)) return "Méditerranée antique";
  if (/peninsule arabique|arabie/.test(t)) return "VIIe siècle · péninsule Arabique";
  if (/atlantique|groenland|islande|vinland/.test(t)) return "Atlantique Nord";
  if (/europe occidentale|iles britanniques|franc/.test(t)) return "Europe occidentale";
  if (/mesopotamie|argile|tablettes/.test(t)) return "Mésopotamie";
  if (/gizeh|pharaon|nil|crues/.test(t)) return "Égypte ancienne";
  if (/rome|romain|romaine/.test(t)) return "Monde romain";
  return "";
}

function mysteryRepereLine(mystery = {}, lesson = {}) {
  const parts = [];
  const period = cleanMysteryReperePart(lesson.period || "", mystery);
  const location = cleanMysteryReperePart(lesson.location || "", mystery);
  if (period) parts.push(period);
  if (location) parts.push(location);
  if (parts.length) {
    const inferred = inferredMysteryFrame(mystery);
    const current = parts.join(" · ");
    if (inferred && current.length < 24 && !normalize(current).includes(normalize(inferred))) parts.push(inferred);
    return parts.join(" · ");
  }
  if (mystery.originalClues) {
    const old = mystery.originalClues.find(clue => /période|periode|espace|cadre/i.test(clue));
    const cleaned = cleanMysteryCopy(old || "", mystery);
    if (cleaned.length >= 12 && !/dossier|reponse|réponse|grand thème/i.test(cleaned)) return cleaned;
  }
  return inferredMysteryFrame(mystery) || "Sujet à déduire du vocabulaire et des traces citées";
}

function mysteryContextNudge(mystery = {}) {
  const words = mysterySignalWords(mystery, 6);
  if (words.length >= 3) return `${words.slice(0, 5).join(" · ")}.`;
  const signal = mysterySignalPhrase(mystery);
  return signal ? short(signal, 120) : "Cherche le mot qui relie la période, le lieu et la trace principale.";
}

function mysteryHintLabels() { return ["Nature", "Cadre", "Déclic"]; }

function maskMysteryAnswerOnly(text = "", mystery = {}) {
  let out = String(text || "");
  const replacements = [mystery.answer, ...(mystery.aliases || [])]
    .filter(Boolean)
    .sort((a, b) => String(b).length - String(a).length);
  replacements.forEach(value => {
    const escaped = String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (escaped.length > 2) out = out.replace(new RegExp(escaped, "gi"), "le sujet");
  });
  return out.replace(/\s+/g, " ").trim();
}

function mysterySafeCaseTitle(mystery = {}) {
  const fromTitle = maskMysteryAnswerOnly(mystery.title || "", mystery).replace(/^Dossier\s*:\s*/i, "").trim();
  if (fromTitle && fromTitle.length >= 12 && !/^le sujet$/i.test(fromTitle)) return fromTitle;
  const fromCase = maskMysteryAnswerOnly(mystery.caseTitle || "Sujet à identifier", mystery).replace(/^Dossier\s*:\s*/i, "").trim();
  return fromCase || "Sujet à identifier";
}

function buildProgressiveClues(mystery = {}) {
  if (mystery.manualCluesB97 && Array.isArray(mystery.clues) && mystery.clues.length >= 3) {
    return mystery.clues
      .slice(0, 3)
      .map(clue => cleanMysteryCopy(clue, mystery))
      .map(clue => clue.replace(/\s+/g, " ").replace(/\s+([,.])/g, "$1").trim())
      .filter(Boolean);
  }
  const lesson = relatedLessonForMystery(mystery) || {};
  const kind = mysteryKindLabel(mystery, lesson);
  const repere = mysteryRepereLine(mystery, lesson);
  const nudge = mysteryContextNudge(mystery);
  const clues = [
    `${kind.replace(/ à identifier$/i, "")}.`,
    `${repere}.`,
    nudge
  ];
  return clues
    .map(clue => cleanMysteryCopy(clue, mystery))
    .map(clue => clue.replace(/\s+/g, " ").replace(/\s+([,.])/g, "$1").trim())
    .filter(Boolean)
    .slice(0, 3);
}

function applyContentQualityPass() {
  (data.mysteries || []).forEach(mystery => {
    mystery.originalClues = mystery.originalClues || (mystery.clues || []).slice(0, 3);
    mystery.prompt = mysteryPublicPrompt(mystery);
    mystery.clues = buildProgressiveClues(mystery);
    mystery.caseTitle = mysterySafeCaseTitle(mystery);
    mystery.cluesCleaned = true;
  });
}

applyContentQualityPass();

const READY_LESSON_PACKS = {
  "prehistory-hominids": {
    "hook": "Avant Sapiens, il n’y a pas une marche triomphale vers nous, mais plusieurs lignées humaines, adaptées à des milieux différents, parfois contemporaines les unes des autres.",
    "keyFacts": [
      "Quand : plusieurs millions d’années avant notre ère",
      "Où : surtout Afrique au départ, puis extensions progressives",
      "Acteurs : Australopithèques, Homo habilis, Homo erectus et autres lignées",
      "Enjeu : penser l’évolution comme un buisson, pas une échelle"
    ],
    "express": [
      "Les premiers hominidés ne sont pas des “hommes incomplets”. Ce sont des espèces adaptées à leur environnement, avec des corps, des déplacements et des capacités différentes.",
      "La bipédie est un repère majeur, mais elle ne signifie pas immédiatement langage, feu, outils complexes ou grande intelligence technique. Les changements se combinent lentement.",
      "Le piège classique est l’image de la frise où un singe devient progressivement un homme moderne. L’histoire humaine ressemble plutôt à un buisson de lignées, avec des coexistences, des disparitions et des métissages."
    ],
    "complete": [
      {
        "title": "1. Le problème de la frise simpliste",
        "text": "Les manuels ont longtemps donné l’impression d’une progression droite : singe, homme préhistorique, humain moderne. Cette image est fausse. Les chercheurs travaillent plutôt sur des lignées nombreuses, parfois proches, parfois éloignées, dont certaines disparaissent sans être des “échecs”."
      },
      {
        "title": "2. La bipédie ne fait pas tout",
        "text": "Marcher sur deux jambes change le rapport au milieu : vision plus haute, mains disponibles, déplacements différents. Mais la bipédie n’entraîne pas automatiquement une culture complexe. Il faut distinguer corps, outils, alimentation, coopération et langage."
      },
      {
        "title": "3. Des preuves fragmentaires",
        "text": "On raisonne à partir d’ossements incomplets, d’empreintes, d’outils associés, de couches géologiques et parfois d’ADN ancien pour les périodes plus récentes. Chaque découverte peut déplacer une partie du scénario."
      },
      {
        "title": "4. Plusieurs humanités",
        "text": "La préhistoire récente montre que Sapiens a coexisté avec d’autres humains, comme Néandertal et Denisova. Cela oblige à abandonner l’idée d’une humanité unique apparaissant d’un seul bloc."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "Les hominidés servent à apprendre une méthode : ne pas chercher un ancêtre unique et héroïque, mais comprendre des adaptations, des branches, des environnements et des traces parfois très maigres."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Hominidé est un terme de classification biologique. En histoire scolaire, il sert souvent à parler des formes humaines et préhumaines proches de notre lignée."
      },
      {
        "title": "Erreur fréquente",
        "text": "Dire “l’homme descend du singe” est trompeur : humains et grands singes actuels partagent des ancêtres communs plus anciens."
      },
      {
        "title": "Point notable",
        "text": "Chaque fragment d’os ou d’empreinte peut changer la chronologie, mais il doit être replacé dans un faisceau de preuves."
      }
    ],
    "quiz": [
      {
        "kind": "piège",
        "q": "Pourquoi la frise “du singe à l’homme” est-elle mauvaise ?",
        "a": "Parce qu’elle suggère une progression linéaire alors que l’évolution humaine ressemble à un buisson de lignées.",
        "why": "C’est l’idée centrale pour éviter un récit téléologique.",
        "trap": "Croire que tout mène forcément à Sapiens.",
        "evidence": "Le cours oppose frise simpliste et lignées multiples."
      },
      {
        "kind": "concept",
        "q": "La bipédie signifie-t-elle immédiatement langage et outils complexes ?",
        "a": "Non, elle est un changement important du corps, mais les autres capacités se développent séparément et progressivement.",
        "why": "Cela oblige à distinguer plusieurs critères d’hominisation.",
        "trap": "Tout mettre dans un seul “progrès”.",
        "evidence": "Le bloc sur la bipédie ne fait pas tout."
      },
      {
        "kind": "source",
        "q": "Quelles traces permettent d’étudier ces périodes très anciennes ?",
        "a": "Ossements, empreintes, couches géologiques, outils associés et parfois données génétiques pour les périodes récentes.",
        "why": "La préhistoire se construit sur des traces fragmentaires.",
        "trap": "Imaginer qu’on dispose de récits écrits.",
        "evidence": "Le cours parle de preuves fragmentaires."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi parler de plusieurs humanités ?",
        "a": "Parce que plusieurs espèces humaines ont coexisté, notamment Sapiens, Néandertal et Denisova pour les périodes récentes.",
        "why": "Cela casse l’idée d’une humanité unique apparue d’un bloc.",
        "trap": "Confondre humanité biologique et notre seule espèce actuelle.",
        "evidence": "Le bloc “Plusieurs humanités”."
      },
      {
        "kind": "synthèse",
        "q": "Quelle méthode faut-il retenir ?",
        "a": "Chercher des adaptations et des lignées plutôt qu’un ancêtre unique et une progression simple.",
        "why": "C’est le réflexe historique utile pour tout le chapitre.",
        "trap": "Raconter une légende d’origine trop nette.",
        "evidence": "Le dernier bloc du cours."
      }
    ]
  },
  "prehistory-habilis": {
    "hook": "Homo habilis n’est pas intéressant parce qu’il aurait été le premier “bricoleur malin”, mais parce que ses outils obligent à lire la pensée dans des éclats de pierre.",
    "keyFacts": [
      "Quand : environ -2,4 à -1,4 million d’années",
      "Où : surtout Afrique de l’Est",
      "Acteurs : groupes d’hominines, charognards, chasseurs opportunistes",
      "Preuves : galets taillés, éclats, os marqués, sites d’atelier",
      "Enjeu : comprendre l’apparition de chaînes opératoires techniques"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "Un outil préhistorique est une séquence de gestes, pas seulement un caillou coupant."
      },
      {
        "label": "Preuve",
        "text": "Les éclats, nucléus et traces de découpe montrent des gestes répétés et transmis."
      },
      {
        "label": "Piège",
        "text": "Imaginer Homo habilis comme un petit Sapiens : ce n’est pas notre monde mental projeté dans le passé."
      }
    ],
    "express": [
      "Homo habilis est associé à certaines des plus anciennes industries de pierre, notamment des galets aménagés et des éclats coupants. Le sujet n’est pas de lui attribuer tout seul une invention héroïque, mais de comprendre comment un geste technique devient reproductible.",
      "Les outils servent probablement à couper, racler, fracturer ou accéder à de la nourriture. Les archéologues croisent les pierres taillées avec les os portant des marques de découpe ou de percussion.",
      "Le piège est de croire qu’un outil prouve automatiquement une intelligence moderne. Il prouve surtout une chaîne de gestes : choisir une matière, frapper, obtenir un éclat, l’utiliser, puis transmettre le savoir-faire."
    ],
    "complete": [
      {
        "title": "1. Le problème des premiers outils",
        "text": "Dire “premier outil” est toujours risqué : des objets plus anciens, en bois ou fibres, ont pu disparaître. Les pierres, elles, se conservent. Homo habilis est donc surtout une fenêtre matérielle sur des comportements techniques très anciens."
      },
      {
        "title": "2. Galets, éclats et chaînes opératoires",
        "text": "Un galet taillé n’est pas seulement un objet final. Il conserve les impacts, l’angle des coups, le choix de la matière et les gestes successifs. C’est ce qu’on appelle une chaîne opératoire."
      },
      {
        "title": "3. Manger autrement",
        "text": "Les éclats peuvent couper la viande, racler des peaux ou ouvrir des carcasses. Ces gestes modifient l’accès aux ressources, même si l’on ne doit pas imaginer une chasse organisée comme au Paléolithique récent."
      },
      {
        "title": "4. Une humanité plurielle",
        "text": "Homo habilis n’est pas une étape simple entre singe et humain moderne. Plusieurs lignées coexistent, et l’évolution humaine ressemble davantage à un buisson qu’à une échelle."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "Le plus important n’est pas le nom “habilis”, mais la méthode : à partir de pierres très simples, on reconstitue des gestes, des besoins, des apprentissages et des formes élémentaires de culture technique."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Chaîne opératoire : suite de gestes nécessaires pour produire et utiliser un objet technique."
      },
      {
        "title": "Comment le lire",
        "text": "Ne juge pas un outil par son apparence. Observe les traces de fabrication, d’usage et le contexte où il a été trouvé."
      },
      {
        "title": "Erreur fréquente",
        "text": "Dire “Homo habilis invente les outils” est trop net : les preuves sont fragmentaires et d’autres hominines ont pu participer à ces traditions techniques."
      }
    ],
    "quiz": [
      {
        "kind": "preuve",
        "q": "Pourquoi un éclat de pierre peut-il être une trace historique ?",
        "a": "Parce qu’il garde les traces d’un geste volontaire : choix de matière, percussion, forme coupante et usage possible.",
        "why": "Cela permet de reconstruire une action à partir d’un objet très simple.",
        "trap": "Voir seulement un caillou sans lire les impacts.",
        "evidence": "Blocs 1 et 2."
      },
      {
        "kind": "concept",
        "q": "Que signifie chaîne opératoire ?",
        "a": "La suite des gestes qui va du choix de la matière à la fabrication puis à l’usage de l’outil.",
        "why": "Le cours insiste sur les gestes plutôt que sur l’objet isolé.",
        "trap": "Répondre seulement “outil en pierre”.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi faut-il éviter de dire qu’Homo habilis est le premier inventeur des outils ?",
        "a": "Parce que les preuves conservées sont surtout en pierre et que d’autres objets ou hominines ont pu exister.",
        "why": "La préhistoire ancienne repose sur des traces très incomplètes.",
        "trap": "Transformer une hypothèse en certitude héroïque.",
        "evidence": "Bloc 1 et erreur fréquente."
      },
      {
        "kind": "source",
        "q": "Quelle trace peut relier outil et alimentation ?",
        "a": "Des os portant des marques de découpe ou de percussion associés aux pierres taillées.",
        "why": "Cette association relie l’objet à un usage possible.",
        "trap": "Déduire l’usage seulement de la forme de l’outil.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "synthèse",
        "q": "Quelle idée retenir sur Homo habilis ?",
        "a": "Il sert surtout à comprendre l’émergence de gestes techniques transmis, pas à raconter un génie isolé.",
        "why": "C’est la synthèse du cours.",
        "trap": "Le présenter comme un Sapiens miniature.",
        "evidence": "Conclusion."
      }
    ]
  },
  "prehistory-fire": {
    "hook": "Une trace de feu n’est jamais seulement un vieux charbon : c’est la preuve possible d’un changement énorme dans la manière de vivre, manger, se protéger et se réunir.",
    "express": [
      "La maîtrise du feu ne se résume pas à “l’homme découvre le feu”. Les humains ont probablement rencontré des feux naturels très tôt ; le vrai basculement est d’apprendre à le conserver, l’entretenir, le transporter et l’utiliser régulièrement.",
      "Les archéologues cherchent des foyers, des charbons, des os brûlés, des sols rougis par la chaleur et des pierres chauffées. Ces traces sont difficiles à interpréter, car un incendie naturel peut aussi laisser du brûlé.",
      "Ce que le feu change : cuisson, chaleur, défense, lumière, sociabilité du soir, transformation des matériaux. Le piège est de croire à une invention unique et datée : c’est une maîtrise progressive, inégale selon les lieux."
    ],
    "complete": [
      {
        "title": "1. Le vrai problème : utiliser, pas seulement voir",
        "text": "Des groupes humains ont vu le feu bien avant de le maîtriser. La question historique est donc moins “qui l’a découvert ?” que “à partir de quand des groupes savent-ils l’utiliser régulièrement ?”. Entre ramasser une branche brûlante après un incendie et produire ou entretenir un foyer stable, il y a un immense écart technique."
      },
      {
        "title": "2. Des preuves fragiles",
        "text": "Les traces de feu sont délicates : charbon, rubéfaction du sol, os brûlés, silex chauffés. Mais il faut distinguer feu naturel, feu accidentel et foyer entretenu. C’est pour ça que les archéologues regardent la répétition des traces, leur position dans l’habitat, et leur association avec des activités humaines."
      },
      {
        "title": "3. Une révolution du quotidien",
        "text": "Le feu permet de cuire, d’attendrir certains aliments, de réduire certains risques sanitaires, de se chauffer, d’éloigner des animaux, de prolonger les activités après la nuit et de transformer des matériaux. Il change donc à la fois la biologie, la technique et la vie sociale."
      },
      {
        "title": "4. Pas un bouton magique",
        "text": "Il ne faut pas imaginer un jour précis où “l’humanité” bascule. Les usages sont progressifs, régionaux, parfois intermittents. Ce qui compte, c’est la stabilisation d’un savoir-faire transmis dans le groupe."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "Le feu est un bon exemple d’histoire préhistorique : on part de traces matérielles minuscules pour comprendre une transformation énorme. Il apprend à raisonner en faisceaux d’indices plutôt qu’en légende simple."
      }
    ],
    "deeper": [
      {
        "title": "Pourquoi c’est difficile à dater",
        "text": "Les foyers anciens peuvent être détruits, déplacés ou confondus avec des feux naturels. Plus on remonte dans le temps, plus les traces sont rares et discutées."
      },
      {
        "title": "Le mot important",
        "text": "Rubéfaction : coloration rougeâtre d’un sol ou d’une pierre chauffée fortement. C’est un indice, pas une preuve automatique."
      },
      {
        "title": "Erreur fréquente",
        "text": "Dire “l’homme a inventé le feu” est trop vague. Il vaut mieux dire : certains groupes humains apprennent progressivement à contrôler et utiliser le feu."
      }
    ],
    "quiz": [
      {
        "q": "Pourquoi “découvrir le feu” est-il une mauvaise formulation ?",
        "a": "Parce que le vrai enjeu est la maîtrise régulière : conserver, entretenir, transporter ou produire un feu, pas seulement le voir dans la nature."
      },
      {
        "q": "Cite deux traces archéologiques possibles d’un foyer.",
        "a": "Charbons, os brûlés, sol rubéfié, pierres chauffées ou concentration de cendres."
      },
      {
        "q": "Quel changement social le feu rend-il possible ?",
        "a": "Il prolonge les activités après la nuit et peut favoriser les rassemblements autour du foyer."
      },
      {
        "q": "Pourquoi une trace brûlée ne suffit-elle pas toujours ?",
        "a": "Parce qu’un incendie naturel ou accidentel peut aussi produire du brûlé."
      },
      {
        "q": "Quelle idée faut-il retenir ?",
        "a": "La maîtrise du feu est progressive, inégale et révélée par plusieurs indices concordants."
      }
    ]
  },
  "prehistory-hunt": {
    "hook": "Chasser et cueillir, ce n’est pas vivre au hasard dans une nature vide : c’est lire les saisons, suivre des traces, connaître les plantes et coopérer sans État ni écriture.",
    "keyFacts": [
      "Quand : surtout Paléolithique",
      "Où : milieux très variés selon les climats",
      "Acteurs : groupes humains mobiles, chasseurs, cueilleurs, enfants, anciens",
      "Preuves : ossements animaux, outils, foyers, pollens, traces de découpe",
      "Enjeu : comprendre une économie de connaissance, pas une survie primitive"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "La chasse-cueillette repose sur un savoir très fin des milieux, pas sur l’improvisation."
      },
      {
        "label": "Preuve",
        "text": "Os marqués, outils spécialisés, foyers et restes végétaux permettent de reconstituer les pratiques."
      },
      {
        "label": "Piège",
        "text": "Imaginer des hommes qui chassent pendant que les femmes attendent : les rôles varient selon les sociétés et les tâches."
      }
    ],
    "express": [
      "Les sociétés de chasseurs-cueilleurs vivent de ressources sauvages, mais cela ne veut pas dire qu’elles vivent au hasard. Il faut connaître les migrations animales, les saisons, les plantes comestibles, les zones dangereuses et les matières premières utiles.",
      "L’archéologie ne retrouve qu’une partie de ces mondes : beaucoup de végétaux, paniers, cordes ou peaux disparaissent. Les os, foyers, outils et pollens permettent pourtant de lire des choix alimentaires et techniques.",
      "Le piège est de parler de “survie primitive”. Ces groupes peuvent avoir des règles, des échanges, des rituels, des savoirs précis et des formes d’organisation souples, sans ressembler à nos États modernes."
    ],
    "complete": [
      {
        "title": "1. Une économie de mobilité",
        "text": "La mobilité n’est pas une errance. Elle peut être saisonnière, organisée autour des troupeaux, points d’eau, abris, ressources végétales ou pierres taillables. Se déplacer, c’est aussi connaître un territoire."
      },
      {
        "title": "2. Chasser ne suffit pas à expliquer l’alimentation",
        "text": "La chasse est visible dans les os et les armes, mais la cueillette, les tubercules, fruits, graines ou petits animaux comptent souvent beaucoup. L’invisible archéologique ne doit pas être confondu avec l’inexistant."
      },
      {
        "title": "3. Lire les traces",
        "text": "Des os portant des marques de découpe, des foyers, des outils en pierre, des restes de pollen ou de charbon racontent des gestes : découper, cuire, transporter, sélectionner, réparer."
      },
      {
        "title": "4. Des groupes sociaux, pas des individus isolés",
        "text": "Survivre dépend de la coopération : partage, apprentissage, soin, garde des enfants, mémoire des lieux. Les personnes âgées peuvent transmettre un savoir essentiel."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "La chasse-cueillette montre que l’histoire humaine ne commence pas avec l’agriculture. Avant les villages, il existe déjà des savoirs, des techniques, des réseaux et des choix sociaux."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Mobilité saisonnière : déplacement régulier lié aux ressources disponibles selon les moments de l’année."
      },
      {
        "title": "Comment le lire",
        "text": "Ne déduis pas toute l’économie d’un seul type de trace : croise os, plantes, outils, climat et organisation du site."
      },
      {
        "title": "Erreur fréquente",
        "text": "Dire que ces sociétés sont “sans culture” parce qu’elles n’ont pas d’écriture ou de villes."
      }
    ],
    "quiz": [
      {
        "kind": "piège",
        "q": "Pourquoi l’expression “survie primitive” est-elle mauvaise ?",
        "a": "Parce qu’elle efface les savoirs précis, les coopérations, les règles et les choix techniques des groupes chasseurs-cueilleurs.",
        "why": "Le cours insiste sur la connaissance des milieux.",
        "trap": "Croire que sans agriculture, il n’y a ni organisation ni culture.",
        "evidence": "Express 1 et conclusion."
      },
      {
        "kind": "source",
        "q": "Quelles traces peuvent renseigner sur l’alimentation ?",
        "a": "Os marqués, foyers, outils, pollens, charbons, restes végétaux et organisation du site.",
        "why": "Il faut croiser plusieurs indices.",
        "trap": "Ne regarder que les armes de chasse.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi la cueillette est-elle parfois sous-estimée ?",
        "a": "Parce que beaucoup de restes végétaux ou objets périssables se conservent moins bien que les os et la pierre.",
        "why": "La conservation influence ce que l’on croit voir.",
        "trap": "Confondre absence de trace et absence de pratique.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "société",
        "q": "Pourquoi la coopération est-elle centrale ?",
        "a": "Parce que partage, apprentissage, soin et mémoire des lieux conditionnent la survie du groupe.",
        "why": "Le sujet n’est pas seulement alimentaire, il est social.",
        "trap": "Imaginer des chasseurs isolés et autonomes.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Quelle idée faut-il retenir ?",
        "a": "Avant l’agriculture, il existe déjà des sociétés complexes par leurs savoirs, leurs gestes et leurs relations aux milieux.",
        "why": "C’est la thèse du cours.",
        "trap": "Faire commencer l’histoire avec les villages.",
        "evidence": "Conclusion."
      }
    ]
  },
  "prehistory-agriculture": {
    "hook": "L’agriculture n’est pas juste une bonne idée qui rend la vie meilleure : elle transforme le temps, le travail, les maladies, les paysages et les inégalités.",
    "keyFacts": [
      "Quand : à partir d’environ -10 000 dans plusieurs foyers",
      "Où : Croissant fertile, Chine, Mésoamérique, Andes, Afrique, Nouvelle-Guinée…",
      "Acteurs : communautés villageoises, agriculteurs, éleveurs, artisans",
      "Enjeu : une révolution lente, pas un progrès simple"
    ],
    "express": [
      "Le Néolithique correspond à l’apparition progressive de l’agriculture, de l’élevage, de villages plus stables et de nouvelles techniques. Il ne se produit pas partout au même moment.",
      "Produire sa nourriture permet des stocks, des habitats durables et une croissance démographique. Mais cela apporte aussi plus de travail, des maladies liées à la proximité des animaux, des conflits sur les terres et des inégalités plus visibles.",
      "Le piège est de dire : “avant ils survivaient, après ils progressent”. En réalité, les chasseurs-cueilleurs ont aussi des savoirs complexes, et l’agriculture impose de nouvelles contraintes."
    ],
    "complete": [
      {
        "title": "1. Une révolution très lente",
        "text": "Le mot révolution est pratique, mais trompeur si on imagine un changement brusque. Les plantes et animaux sont domestiqués progressivement, dans plusieurs régions du monde, selon des rythmes différents."
      },
      {
        "title": "2. Les stocks changent la société",
        "text": "Les céréales stockables permettent de nourrir plus de personnes et de passer les saisons difficiles. Mais stocker signifie aussi surveiller, compter, défendre et parfois redistribuer. C’est un point de départ pour des hiérarchies."
      },
      {
        "title": "3. Le village n’est pas seulement une maison fixe",
        "text": "La sédentarisation transforme les rapports sociaux : voisinage durable, cimetières, héritage, conflits de limites, mémoire locale. Elle fixe les groupes dans des paysages qu’ils transforment."
      },
      {
        "title": "4. Un coût humain réel",
        "text": "L’alimentation devient parfois moins variée, le travail agricole peut être très lourd et la proximité avec les animaux favorise certaines maladies. Le Néolithique n’est donc pas un “niveau supérieur” automatique."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "L’agriculture est une mutation de longue durée : elle donne de nouvelles possibilités mais crée aussi des dépendances, des contraintes et des inégalités."
      }
    ],
    "deeper": [
      {
        "title": "Domestication",
        "text": "Domestiquer n’est pas simplement utiliser : c’est transformer une espèce sur plusieurs générations, par sélection et reproduction contrôlée."
      },
      {
        "title": "Foyers multiples",
        "text": "Il existe plusieurs foyers agricoles indépendants. Cela évite de raconter une diffusion unique depuis un centre vers le monde entier."
      },
      {
        "title": "Erreur fréquente",
        "text": "Opposer “sauvages nomades” et “civilisés agriculteurs” est une caricature."
      }
    ],
    "quiz": [
      {
        "kind": "concept",
        "q": "Pourquoi le mot révolution est-il à manier avec prudence ?",
        "a": "Parce que les changements néolithiques sont progressifs, régionaux et étalés dans le temps.",
        "why": "Cela évite de penser un basculement instantané.",
        "trap": "Imaginer une date unique de naissance de l’agriculture.",
        "evidence": "Le cours parle d’une révolution très lente."
      },
      {
        "kind": "preuve",
        "q": "Pourquoi les stocks sont-ils politiquement importants ?",
        "a": "Parce qu’ils doivent être comptés, protégés, redistribués et peuvent créer des hiérarchies.",
        "why": "Le stockage relie économie et pouvoir.",
        "trap": "Voir les stocks comme un simple garde-manger.",
        "evidence": "Le bloc sur les stocks."
      },
      {
        "kind": "nuance",
        "q": "Cite deux coûts possibles de l’agriculture.",
        "a": "Travail plus lourd, alimentation parfois moins variée, maladies liées aux animaux, conflits sur les terres ou inégalités.",
        "why": "Un progrès technique peut avoir des effets ambivalents.",
        "trap": "Dire que l’agriculture améliore forcément la vie de tous.",
        "evidence": "Le bloc sur le coût humain."
      },
      {
        "kind": "carte",
        "q": "Pourquoi faut-il parler de plusieurs foyers agricoles ?",
        "a": "Parce que l’agriculture apparaît indépendamment dans plusieurs régions du monde.",
        "why": "Cela rend le récit moins eurocentré et moins simpliste.",
        "trap": "Tout faire venir du seul Croissant fertile.",
        "evidence": "Le bloc “Foyers multiples”."
      },
      {
        "kind": "synthèse",
        "q": "Quelle idée générale retenir ?",
        "a": "L’agriculture crée possibilités, dépendances et inégalités : c’est une mutation sociale autant que technique.",
        "why": "C’est le sens historique du cours.",
        "trap": "Résumer le Néolithique à “on plante des graines”.",
        "evidence": "Le dernier bloc."
      }
    ]
  },
  "prehistory-sapiens": {
    "hook": "Homo sapiens n’est pas le héros final d’une marche triomphale : c’est une espèce humaine parmi d’autres, devenue dominante par migrations, adaptations, échanges et hasards.",
    "keyFacts": [
      "Quand : apparition en Afrique vers -300 000 ans",
      "Où : Afrique puis diffusions vers l’Eurasie, l’Océanie et les Amériques",
      "Acteurs : groupes de Sapiens, Néandertaliens, Denisoviens, milieux climatiques",
      "Preuves : fossiles, génomes anciens, outils, parures, sites d’habitat",
      "Enjeu : éviter le récit simpliste d’un progrès linéaire"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "Sapiens ne remplace pas tout d’un coup : il migre, rencontre, se mélange parfois et s’adapte à des environnements variés."
      },
      {
        "label": "Preuve",
        "text": "Les fossiles donnent des formes corporelles ; l’ADN ancien révèle aussi des croisements avec d’autres humanités."
      },
      {
        "label": "Piège",
        "text": "Présenter Sapiens comme supérieur par nature : l’histoire humaine est buissonnante, pas une ligne droite."
      }
    ],
    "express": [
      "Homo sapiens apparaît en Afrique vers -300 000 ans. Il n’est pas seul : d’autres humanités existent encore, notamment les Néandertaliens et les Denisoviens.",
      "Son histoire se lit dans les fossiles, les outils, les habitats, les parures et l’ADN ancien. Ces traces montrent des migrations longues, des adaptations locales et parfois des métissages.",
      "Le point important n’est pas “Sapiens gagne parce qu’il est parfait”, mais comment des groupes mobiles coopèrent, transmettent des techniques et occupent progressivement des milieux très différents."
    ],
    "complete": [
      {
        "title": "1. Une apparition africaine, pas un départ unique",
        "text": "Les plus anciens fossiles attribués à Homo sapiens replacent l’origine de notre espèce en Afrique. Mais il ne faut pas imaginer un seul berceau simple puis une sortie nette : les populations se déplacent, se fragmentent, se retrouvent et s’adaptent."
      },
      {
        "title": "2. Des humanités contemporaines",
        "text": "Pendant longtemps, Sapiens coexiste avec d’autres humains. Les Néandertaliens en Europe et en Asie occidentale, les Denisoviens en Asie, montrent que l’histoire humaine ressemble à un réseau de lignées, pas à une succession propre."
      },
      {
        "title": "3. Ce que change l’ADN ancien",
        "text": "La génétique a bouleversé le récit : des populations actuelles portent une part d’héritage néandertalien ou denisovien. Cela ne remplace pas l’archéologie, mais ajoute une preuve invisible dans les os seuls."
      },
      {
        "title": "4. Techniques et cultures matérielles",
        "text": "Outils, foyers, pigments, parures, abris et sépultures montrent des comportements variés. Le danger est de chercher un seul signe magique de modernité : les innovations apparaissent par paquets, selon les lieux et les besoins."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "Homo sapiens devient dominant par une combinaison de mobilités, coopérations, transmissions et circonstances écologiques. Ce n’est ni une destinée, ni un progrès automatique."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Lignée : ensemble de populations reliées par une histoire évolutive. Chez les humains, plusieurs lignées ont coexisté."
      },
      {
        "title": "Comment le lire",
        "text": "Croise fossiles, outils et ADN : chacun donne une partie du puzzle, aucun ne suffit seul."
      },
      {
        "title": "Erreur fréquente",
        "text": "Dire “l’homme descend du singe” ou “Sapiens est l’aboutissement” : ce sont des raccourcis trompeurs."
      }
    ],
    "quiz": [
      {
        "kind": "concept",
        "q": "Pourquoi Homo sapiens ne doit-il pas être présenté comme le point final de l’évolution ?",
        "a": "Parce que plusieurs humanités ont coexisté et que l’évolution humaine ressemble à un buisson de lignées.",
        "why": "Cela évite un récit téléologique où tout mènerait naturellement à nous.",
        "trap": "Dire que Sapiens était simplement plus évolué.",
        "evidence": "Le cours insiste sur Néandertaliens, Denisoviens et coexistences."
      },
      {
        "kind": "preuve",
        "q": "Quelle preuve a profondément changé notre vision des rencontres entre humanités ?",
        "a": "L’ADN ancien, qui montre des héritages néandertaliens ou denisoviens dans certaines populations actuelles.",
        "why": "Il révèle des croisements que les objets seuls ne prouvent pas toujours.",
        "trap": "S’appuyer seulement sur la forme des outils.",
        "evidence": "Bloc sur l’ADN ancien."
      },
      {
        "kind": "carte",
        "q": "Où replacer l’apparition ancienne de Sapiens ?",
        "a": "En Afrique, vers -300 000 ans, avant des diffusions progressives vers d’autres continents.",
        "why": "Le cadre spatial empêche de raconter une origine vague.",
        "trap": "Imaginer une sortie unique et simple.",
        "evidence": "Express et premier bloc."
      },
      {
        "kind": "piège",
        "q": "Pourquoi chercher un seul signe de modernité est-il risqué ?",
        "a": "Parce que les comportements techniques et symboliques apparaissent progressivement et différemment selon les lieux.",
        "why": "La culture matérielle ne bascule pas d’un coup partout.",
        "trap": "Chercher un bouton magique : art, langage ou outil unique.",
        "evidence": "Bloc techniques et cultures matérielles."
      },
      {
        "kind": "synthèse",
        "q": "Quelle formule résume le mieux le cours ?",
        "a": "Sapiens devient dominant par mobilités, coopérations, transmissions et circonstances, pas par supériorité naturelle simple.",
        "why": "C’est l’idée forte à retenir.",
        "trap": "Transformer l’histoire humaine en compétition sportive.",
        "evidence": "Dernier bloc."
      }
    ]
  },
  "civilizations-fertile-crescent": {
    "hook": "Le Croissant fertile n’est pas un décor de carte : c’est un ensemble de milieux où l’eau, les céréales, les villages puis les villes rendent possibles des sociétés très organisées.",
    "keyFacts": [
      "Quand : surtout du Néolithique aux premières cités",
      "Où : Levant, Mésopotamie, piémonts et vallées du Proche-Orient",
      "Acteurs : agriculteurs, éleveurs, communautés villageoises, temples, palais",
      "Enjeu : comprendre le lien entre milieux, surplus et organisation sociale"
    ],
    "express": [
      "Le Croissant fertile désigne une zone du Proche-Orient où plusieurs transformations majeures se concentrent : domestication de plantes et d’animaux, villages, irrigation, surplus, puis villes et écritures.",
      "Il ne faut pas l’imaginer comme un paradis uniforme. Les milieux sont variés : vallées, piémonts, zones arides, espaces irrigués. Les sociétés doivent s’adapter à l’eau disponible et aux contraintes agricoles.",
      "Son intérêt historique est de montrer comment des choix techniques et sociaux peuvent produire de nouvelles formes de pouvoir, sans réduire tout à une cause naturelle."
    ],
    "complete": [
      {
        "title": "1. Un espace, pas une civilisation unique",
        "text": "Le Croissant fertile regroupe plusieurs régions du Proche-Orient. On y trouve des trajectoires différentes : villages du Levant, cités mésopotamiennes, zones d’élevage, vallées irriguées. Le terme aide à situer, mais ne doit pas écraser la diversité."
      },
      {
        "title": "2. L’eau comme contrainte et ressource",
        "text": "Dans certaines zones, l’agriculture dépend fortement de l’irrigation. Organiser l’eau suppose des travaux, des calendriers, des conflits, des accords et parfois des autorités capables de coordonner."
      },
      {
        "title": "3. Surplus et spécialisation",
        "text": "Quand la production permet des surplus, certaines personnes peuvent se spécialiser : artisans, administrateurs, prêtres, marchands. Cela ne veut pas dire que tout le monde devient plus riche, mais que la société se différencie."
      },
      {
        "title": "4. Vers les villes et les États",
        "text": "Les cités mésopotamiennes ne naissent pas seulement parce que le sol est fertile. Elles résultent aussi d’organisation, d’échanges, de croyances, de conflits et de gestion des ressources."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "Le Croissant fertile montre que l’histoire naît de l’interaction entre environnement, techniques, pouvoir et société. Ce n’est ni un miracle géographique ni une simple suite naturelle."
      }
    ],
    "deeper": [
      {
        "title": "Pourquoi ce nom ?",
        "text": "La forme de la zone évoque un croissant sur les cartes modernes, mais le terme est une construction d’historien et de géographe."
      },
      {
        "title": "Piège déterministe",
        "text": "Dire “la géographie crée la civilisation” est trop simple : les sociétés font des choix et entrent en conflit."
      },
      {
        "title": "À relier",
        "text": "Ce cours prépare Uruk, l’écriture, les temples, les rois et les premières lois."
      }
    ],
    "quiz": [
      {
        "kind": "carte",
        "q": "Pourquoi le Croissant fertile n’est-il pas une civilisation unique ?",
        "a": "Parce qu’il regroupe plusieurs régions et trajectoires différentes du Proche-Orient.",
        "why": "Le terme situe un espace, pas un peuple homogène.",
        "trap": "Parler du Croissant fertile comme d’un État.",
        "evidence": "Le premier bloc du cours."
      },
      {
        "kind": "mécanisme",
        "q": "Pourquoi l’eau peut-elle favoriser l’organisation politique ?",
        "a": "Parce que l’irrigation demande coordination, entretien, règles et arbitrages.",
        "why": "La ressource devient un problème social.",
        "trap": "Dire seulement “il y a de l’eau donc ça pousse”.",
        "evidence": "Le bloc sur l’eau."
      },
      {
        "kind": "concept",
        "q": "Que permet le surplus agricole ?",
        "a": "Il permet la spécialisation de certains métiers et le développement d’administrations ou de pouvoirs.",
        "why": "Le surplus est un moteur de différenciation sociale.",
        "trap": "Croire que surplus signifie égalité et abondance pour tous.",
        "evidence": "Le bloc sur surplus et spécialisation."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi faut-il éviter le déterminisme géographique ?",
        "a": "Parce que les sociétés ne subissent pas seulement leur milieu : elles l’organisent, le transforment et se disputent ses ressources.",
        "why": "C’est une nuance historique essentielle.",
        "trap": "Faire de la géographie une cause automatique.",
        "evidence": "Le bloc “Piège déterministe”."
      },
      {
        "kind": "synthèse",
        "q": "Quelle grande interaction retenir ?",
        "a": "Environnement, techniques, pouvoir et société se combinent pour produire de nouvelles formes d’organisation.",
        "why": "C’est le fil conducteur du cours.",
        "trap": "Réduire le sujet à une carte fertile.",
        "evidence": "Le dernier bloc."
      }
    ]
  },
  "aegean-mediterranean-minoens-crete": {
    "hook": "Avant les cités grecques classiques, la Crète minoenne montre un autre visage du monde égéen : palais, fresques, routes maritimes et pouvoir sans armée monumentale évidente.",
    "keyFacts": [
      "Quand : surtout vers -2000 à -1450",
      "Où : Crète, notamment Cnossos, Phaistos, Malia et Zakros",
      "Acteurs : élites palatiales, artisans, marchands, scribes, communautés crétoises",
      "Traces : palais, fresques, sceaux, tablettes en linéaire A, ateliers, objets importés",
      "Piège : imaginer une Grèce classique déjà formée à l’époque minoenne"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "Les palais minoens sont des centres de stockage, production, redistribution, rituels et prestige."
      },
      {
        "label": "Nuance",
        "text": "La Crète minoenne appartient au monde égéen de l’âge du Bronze, pas à la cité grecque classique."
      },
      {
        "label": "Trace",
        "text": "Fresques, sceaux, jarres, ateliers et écritures non déchiffrées montrent une société complexe."
      }
    ],
    "express": [
      "La Crète minoenne se développe à l’âge du Bronze, surtout entre -2000 et -1450. Elle n’est pas une démocratie grecque ancienne : c’est un monde de palais, de stockage, d’ateliers, de fresques, de rituels et d’échanges maritimes.",
      "Les grands palais comme Cnossos ne sont pas seulement des résidences. Ils organisent des réserves, des productions artisanales, des cérémonies et des circulations de biens. Les jarres, sceaux et tablettes montrent un pouvoir capable d’enregistrer et de contrôler.",
      "Le linéaire A reste largement non déchiffré, ce qui impose de la prudence. On connaît les Minoens par l’archéologie plus que par des récits lisibles. Le vrai intérêt est de comprendre un monde égéen complexe avant Athènes, Sparte et les cités classiques."
    ],
    "complete": [
      {
        "title": "1. Une Crète de l’âge du Bronze",
        "text": "Les Minoens vivent plusieurs siècles avant la Grèce classique. Leur histoire appartient à l’âge du Bronze égéen, dans une Méditerranée où circulent métaux, céramiques, idées, techniques et objets de prestige. Les appeler simplement “Grecs” serait trompeur : ils précèdent les cités grecques que l’on connaît mieux."
      },
      {
        "title": "2. Le palais comme centre",
        "text": "Les palais crétois sont des lieux de pouvoir, mais pas seulement des maisons royales. Ils regroupent magasins, ateliers, cours, salles décorées, espaces rituels et zones de circulation. Ils rendent visible une organisation capable de concentrer et redistribuer des biens."
      },
      {
        "title": "3. Une puissance maritime",
        "text": "La Crète est au cœur des routes de la mer Égée et de la Méditerranée orientale. Objets importés, influences artistiques et réseaux commerciaux montrent que les Minoens ne vivent pas isolés : ils participent à un monde connecté par bateau."
      },
      {
        "title": "4. Sources et prudence",
        "text": "Les fresques, sceaux, jarres, ateliers et bâtiments sont abondants, mais l’écriture appelée linéaire A n’est pas vraiment lue. L’historien doit donc éviter les certitudes trop fortes sur la langue, les récits politiques ou les noms des dirigeants."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "La Crète minoenne est essentielle parce qu’elle montre que le monde grec a des racines égéennes plus anciennes et variées. Avant la polis, il existe déjà des palais, des réseaux, des techniques, des cultes et des sociétés hiérarchisées."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Linéaire A : écriture utilisée en Crète minoenne, encore non déchiffrée de manière satisfaisante."
      },
      {
        "title": "Comment le lire",
        "text": "Quand les textes manquent, on raisonne avec l’architecture, les objets, les images et les traces de stockage."
      },
      {
        "title": "Erreur fréquente",
        "text": "Projeter directement Athènes, la démocratie ou la philosophie classique sur la Crète minoenne."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "À quelle période appartient surtout la Crète minoenne ?",
        "a": "À l’âge du Bronze égéen, avant la Grèce classique des cités.",
        "choices": [
          "À la période des royaumes francs médiévaux.",
          "À l’époque de la République romaine tardive.",
          "Au temps des États industriels du XIXe siècle."
        ],
        "why": "Le cours situe les Minoens avant Athènes et Sparte classiques.",
        "trap": "Faire de Cnossos une cité grecque classique.",
        "evidence": "Express et bloc 1."
      },
      {
        "kind": "concept",
        "q": "Pourquoi le palais minoen n’est-il pas seulement une résidence ?",
        "a": "Parce qu’il concentre stockage, ateliers, rituels, circulation de biens et prestige politique.",
        "choices": [
          "Parce qu’il sert uniquement de forteresse frontalière.",
          "Parce qu’il remplace toute activité artisanale.",
          "Parce qu’il interdit tout échange maritime."
        ],
        "why": "Le palais est un centre d’organisation sociale et économique.",
        "trap": "Le réduire à un logement monumental.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "connexion",
        "q": "Que montrent les objets importés et les influences artistiques ?",
        "a": "Que la Crète minoenne participe à des réseaux maritimes égéens et méditerranéens.",
        "choices": [
          "Que l’île est totalement coupée des routes de mer.",
          "Que les palais ne contrôlent aucun objet.",
          "Que les échanges apparaissent seulement après Alexandre."
        ],
        "why": "La mer relie la Crète à d’autres espaces.",
        "trap": "Confondre île et isolement.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "source",
        "q": "Pourquoi faut-il rester prudent avec les Minoens ?",
        "a": "Parce que le linéaire A n’est pas vraiment déchiffré et que beaucoup d’informations viennent de l’archéologie.",
        "choices": [
          "Parce que toutes les archives politiques sont parfaitement lisibles.",
          "Parce que les palais ont disparu sans aucune trace matérielle.",
          "Parce que les fresques suffisent à connaître chaque roi par son nom."
        ],
        "why": "L’état des sources limite les certitudes.",
        "trap": "Inventer une histoire trop précise.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Quelle idée résume le mieux le cours ?",
        "a": "La Crète minoenne montre un monde égéen complexe avant la polis grecque classique.",
        "choices": [
          "La Crète minoenne est déjà une démocratie athénienne.",
          "Les Minoens ne connaissent ni ateliers, ni stockage, ni échanges.",
          "L’âge du Bronze égéen n’a aucun lien avec la Méditerranée."
        ],
        "why": "Le cours relie complexité palatiale et chronologie.",
        "trap": "Coller trop vite le modèle classique à une période plus ancienne.",
        "evidence": "Conclusion."
      }
    ]
  },
  "aegean-mediterranean-myceniens-palais": {
    "hook": "Les Mycéniens ne sont pas seulement des guerriers de légende. Ce sont aussi des sociétés de palais, de scribes, de stocks, de terres et de réseaux, connues grâce à l’archéologie et au linéaire B.",
    "keyFacts": [
      "Quand : surtout vers -1600 à -1200",
      "Où : Grèce continentale, Mycènes, Pylos, Tirynthe, Thèbes",
      "Acteurs : rois palatiaux, guerriers, scribes, artisans, paysans, dépendants",
      "Traces : palais fortifiés, tombes, armes, tablettes en linéaire B, céramiques",
      "Piège : lire l’Iliade comme un reportage direct sur les palais mycéniens"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "Les palais mycéniens administrent terres, productions, personnes et redistributions."
      },
      {
        "label": "Preuve",
        "text": "Le linéaire B est déchiffré : il note une forme ancienne de grec et des comptes palatiaux."
      },
      {
        "label": "Nuance",
        "text": "Les héros homériques gardent une mémoire de l’âge du Bronze, mais les poèmes sont beaucoup plus tardifs."
      }
    ],
    "express": [
      "Les Mycéniens dominent une partie de la Grèce continentale à la fin de l’âge du Bronze, surtout entre -1600 et -1200. Mycènes, Pylos ou Tirynthe sont liées à des palais fortifiés, des tombes riches, des armes et une élite guerrière.",
      "Mais le cœur du sujet n’est pas seulement militaire. Les tablettes en linéaire B montrent une administration qui enregistre terres, rations, artisans, troupeaux, produits et dépendants. Le palais gère, compte et redistribue.",
      "Homère évoque un monde héroïque, mais ses poèmes sont plus tardifs. Pour comprendre les Mycéniens, il faut croiser récits, archéologie et tablettes : les héros fascinent, les archives expliquent le fonctionnement réel des palais."
    ],
    "complete": [
      {
        "title": "1. Des palais fortifiés",
        "text": "Les sites mycéniens impressionnent par leurs murs, portes, tombes et espaces palatiaux. Ils ne forment pas un État grec unifié : plusieurs centres dominent des territoires, rivalisent ou coopèrent. La fortification montre l’importance du pouvoir, du prestige et de la protection."
      },
      {
        "title": "2. Une administration lisible",
        "text": "Le linéaire B est une écriture syllabique utilisée pour des comptes. Son déchiffrement a montré qu’elle note une forme ancienne de grec. Les tablettes parlent de produits, terres, artisans, rations, offrandes et personnes dépendantes."
      },
      {
        "title": "3. Le palais comme machine économique",
        "text": "Le palais collecte, stocke, commande et redistribue. Il peut contrôler des ateliers, des troupeaux, des terres et des produits spécialisés. Ce système rend visible une société très organisée, où l’écriture sert d’abord à administrer."
      },
      {
        "title": "4. Guerre, prestige et réseaux",
        "text": "Les armes et tombes riches montrent des élites guerrières, mais les Mycéniens participent aussi à des échanges égéens et méditerranéens. Céramiques, objets précieux et contacts rappellent que la puissance se construit autant par réseau que par combat."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "Les Mycéniens sont importants parce qu’ils relient la Grèce à l’âge du Bronze palatial. Ils donnent un arrière-plan aux récits héroïques, mais leur histoire concrète se comprend surtout par palais, tablettes, tombes et objets."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Linéaire B : écriture administrative déchiffrée, utilisée dans des palais mycéniens et notant une forme ancienne de grec."
      },
      {
        "title": "Nuance",
        "text": "Un poème peut garder une mémoire du passé sans être un document administratif contemporain."
      },
      {
        "title": "Erreur fréquente",
        "text": "Réduire Mycènes à la guerre de Troie et oublier les scribes, les terres, les stocks et les dépendants."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "À quelle période appartiennent surtout les Mycéniens ?",
        "a": "À la fin de l’âge du Bronze égéen, avant les cités grecques classiques.",
        "choices": [
          "À la période de l’empire carolingien.",
          "À l’époque des monarchies absolues modernes.",
          "Au lendemain de la guerre froide."
        ],
        "why": "La chronologie évite de confondre palais mycéniens et cité classique.",
        "trap": "Mettre Mycènes au temps de Périclès.",
        "evidence": "Express et bloc 1."
      },
      {
        "kind": "source",
        "q": "Pourquoi le linéaire B est-il essentiel ?",
        "a": "Parce qu’il note une forme ancienne de grec et donne accès à des comptes palatiaux.",
        "choices": [
          "Parce qu’il décrit les débats de l’assemblée athénienne.",
          "Parce qu’il est une écriture inventée par les empereurs romains.",
          "Parce qu’il est uniquement une décoration murale sans texte."
        ],
        "why": "Il rend l’administration mycénienne partiellement lisible.",
        "trap": "Ignorer les archives au profit des seuls héros.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "fonction",
        "q": "Que fait le palais mycénien dans l’économie ?",
        "a": "Il collecte, stocke, commande des productions et redistribue des biens.",
        "choices": [
          "Il sert seulement de théâtre public.",
          "Il supprime toutes les terres agricoles.",
          "Il interdit la présence de scribes et d’artisans."
        ],
        "why": "Le palais est une machine de gestion.",
        "trap": "Le voir seulement comme décor militaire.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi ne pas lire Homère comme un reportage direct ?",
        "a": "Parce que les poèmes sont plus tardifs et transforment la mémoire de l’âge du Bronze en récit héroïque.",
        "choices": [
          "Parce que les poèmes sont des tablettes comptables du palais de Pylos.",
          "Parce que les récits héroïques donnent tous les impôts exacts.",
          "Parce que les tombes remplacent entièrement toute tradition orale."
        ],
        "why": "Il faut distinguer mémoire, poésie et sources contemporaines.",
        "trap": "Confondre mythe et archive.",
        "evidence": "Deeper et conclusion."
      },
      {
        "kind": "synthèse",
        "q": "Quelle formule résume le mieux les Mycéniens ?",
        "a": "Des sociétés palatiales grecques de l’âge du Bronze, connues par palais, tombes, objets et tablettes.",
        "choices": [
          "Une cité démocratique classique centrée sur l’assemblée.",
          "Un peuple sans écriture, sans palais et sans réseaux.",
          "Une province romaine administrée depuis le Sénat."
        ],
        "why": "La réponse combine chronologie, organisation et sources.",
        "trap": "Les réduire aux guerriers de légende.",
        "evidence": "Conclusion."
      }
    ]
  },
  "aegean-mediterranean-effondrement-egeen": {
    "hook": "Autour de -1200, le monde égéen et méditerranéen oriental connaît une crise majeure. Ce n’est pas une catastrophe simple : c’est un enchaînement de fragilités, de violences, de ruptures et de recompositions.",
    "keyFacts": [
      "Quand : surtout vers -1250 à -1100",
      "Où : Égée, Anatolie, Levant, Méditerranée orientale",
      "Acteurs : palais mycéniens, Hittites, cités du Levant, groupes mobiles, élites locales",
      "Traces : destructions, abandons, raréfaction des archives, changements matériels, récits égyptiens",
      "Piège : expliquer toute la crise par une seule cause magique ou un seul peuple"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "La crise de -1200 touche plusieurs sociétés de l’âge du Bronze, mais de façon inégale."
      },
      {
        "label": "Nuance",
        "text": "Invasions, tensions internes, climat, réseaux fragiles et guerres peuvent se combiner."
      },
      {
        "label": "Conséquence",
        "text": "Après la crise, le monde égéen se réorganise avant l’émergence progressive des cités grecques."
      }
    ],
    "express": [
      "Vers -1200, plusieurs centres de l’âge du Bronze en Méditerranée orientale sont détruits, abandonnés ou profondément transformés. Les palais mycéniens disparaissent, l’empire hittite s’effondre, des routes se fragilisent et les archives deviennent plus rares.",
      "Il ne faut pas chercher une cause unique. Guerres, mouvements de populations, tensions sociales, difficultés économiques, sécheresses possibles, dépendance aux réseaux et fragilité des systèmes palatiaux peuvent se combiner différemment selon les régions.",
      "La crise n’est pas la fin de l’histoire grecque. Elle ouvre une période de recomposition : moins de grands palais, d’autres formes d’habitat, de mémoire et de pouvoir, puis, plus tard, l’émergence des cités du monde archaïque."
    ],
    "complete": [
      {
        "title": "1. Une crise régionale",
        "text": "Autour de -1200, la Méditerranée orientale connaît de fortes perturbations. Les palais mycéniens disparaissent, l’empire hittite s’effondre, certaines cités sont détruites ou abandonnées, et plusieurs réseaux de longue distance sont bouleversés."
      },
      {
        "title": "2. Des causes multiples",
        "text": "Aucune cause unique ne suffit. Les sociétés palatiales dépendent de chaînes d’échanges, de stocks, de scribes, de protection militaire et d’autorité centrale. Si plusieurs maillons se fragilisent en même temps, tout le système peut devenir instable."
      },
      {
        "title": "3. Les “peuples de la mer”",
        "text": "Les sources égyptiennes mentionnent des groupes que l’on appelle souvent peuples de la mer. Ils sont importants, mais ils ne doivent pas devenir une explication magique. Les noms, origines et rôles de ces groupes restent discutés."
      },
      {
        "title": "4. Ruptures et continuités",
        "text": "La crise ne détruit pas toute vie humaine. Des techniques, langues, mémoires et pratiques survivent, mais les formes de pouvoir changent. Les grands palais laissent place à des organisations plus locales et moins centralisées dans plusieurs régions égéennes."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "La crise de -1200 est utile pour comprendre le passage entre âge du Bronze et monde grec archaïque. Elle montre qu’une civilisation peut s’effondrer comme système sans que les populations, les cultures et les mémoires disparaissent totalement."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Système palatial : organisation centrée sur un palais qui administre ressources, productions, stocks, dépendants et échanges."
      },
      {
        "title": "Comment le lire",
        "text": "Pour expliquer une crise ancienne, on compare destructions, abandons, textes, climat possible, objets et changements d’habitat."
      },
      {
        "title": "Erreur fréquente",
        "text": "Dire “les peuples de la mer ont tout détruit” comme si une seule formule expliquait une crise très large."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "Quand situe-t-on la grande crise du monde égéen de l’âge du Bronze ?",
        "a": "Autour de -1200, surtout entre environ -1250 et -1100.",
        "choices": [
          "Au Ve siècle avec la guerre du Péloponnèse.",
          "Au temps de l’Empire napoléonien.",
          "Après la décolonisation du XXe siècle."
        ],
        "why": "Le cours donne un repère chronologique central.",
        "trap": "Mélanger l’âge du Bronze et l’époque classique.",
        "evidence": "Express et repères."
      },
      {
        "kind": "cause",
        "q": "Pourquoi faut-il éviter l’explication par une seule cause ?",
        "a": "Parce que guerres, réseaux fragiles, tensions internes, climat possible et crise des palais peuvent se combiner.",
        "choices": [
          "Parce qu’aucune trace de changement n’existe.",
          "Parce que les palais sont tous plus solides après la crise.",
          "Parce que la Méditerranée orientale est sans échanges."
        ],
        "why": "La crise est un enchaînement de fragilités.",
        "trap": "Chercher une cause miracle.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "source",
        "q": "Quelle prudence faut-il avoir avec les peuples de la mer ?",
        "a": "Ils sont mentionnés dans des sources, mais leurs origines et leurs rôles restent discutés.",
        "choices": [
          "Ils expliquent seuls chaque abandon et chaque transformation.",
          "Ils sont les magistrats réguliers des cités classiques.",
          "Ils remplacent toutes les autres preuves archéologiques."
        ],
        "why": "La formule est utile mais insuffisante.",
        "trap": "Transformer un nom en explication totale.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "conséquence",
        "q": "Que se passe-t-il après la disparition des grands palais ?",
        "a": "Des formes plus locales de pouvoir et d’habitat se développent dans plusieurs régions.",
        "choices": [
          "Toute présence humaine disparaît définitivement de l’Égée.",
          "Les cités classiques apparaissent immédiatement sans transition.",
          "Les tablettes administratives deviennent plus nombreuses partout."
        ],
        "why": "La crise entraîne recomposition, pas vide absolu.",
        "trap": "Confondre effondrement d’un système et fin des populations.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Pourquoi cette crise est-elle importante pour la Grèce ?",
        "a": "Parce qu’elle aide à comprendre le passage entre monde palatial de l’âge du Bronze et monde grec archaïque.",
        "choices": [
          "Parce qu’elle fonde directement la démocratie athénienne en un jour.",
          "Parce qu’elle n’a aucun lien avec l’évolution du monde égéen.",
          "Parce qu’elle transforme tous les palais en royaumes médiévaux."
        ],
        "why": "Elle éclaire une transition de longue durée.",
        "trap": "Sauter directement des héros à Athènes.",
        "evidence": "Conclusion."
      }
    ]
  },
  "egypt-nile": {
    "hook": "Sans le Nil, l’Égypte n’est pas un décor de pyramides : c’est un couloir de vie, de pouvoir et de calcul où l’eau organise presque tout.",
    "express": [
      "Le Nil n’est pas seulement un fleuve utile. Il structure l’espace égyptien : une vallée étroite fertile, des déserts protecteurs et une circulation nord-sud qui donne au royaume une colonne vertébrale politique.",
      "La crue annuelle dépose du limon et rend possible une agriculture très productive, mais elle exige aussi des mesures, des stocks, des prélèvements et une administration. Le fleuve nourrit donc à la fois les paysans et l’État.",
      "Le piège est de dire “le Nil rend l’Égypte riche” comme si tout était automatique. Il faut comprendre l’articulation entre environnement, travail humain, fiscalité, transport et pouvoir pharaonique."
    ],
    "complete": [
      {
        "title": "1. Un pays linéaire",
        "text": "L’Égypte ancienne se développe dans une vallée longue et étroite. Cette géographie facilite certaines communications, concentre les terres cultivables et rend les contrastes très forts entre le monde fertile du fleuve et les marges désertiques."
      },
      {
        "title": "2. La crue, ressource et incertitude",
        "text": "La crue du Nil apporte l’eau et le limon nécessaires aux cultures. Mais une crue trop faible ou trop forte peut provoquer famine, désorganisation et tensions. Le fleuve est donc une ressource, pas une garantie magique."
      },
      {
        "title": "3. Mesurer pour gouverner",
        "text": "Pour taxer, stocker et redistribuer, il faut connaître les terres, les récoltes, les calendriers et les obligations. Le Nil nourrit ainsi le développement d’une administration de scribes et de contrôles."
      },
      {
        "title": "4. Circuler et unir",
        "text": "Le fleuve est aussi une route. Il permet de transporter pierres, céréales, hommes, ordres et marchandises. Cette circulation contribue à maintenir un royaume relativement intégré malgré sa longueur."
      },
      {
        "title": "5. Un environnement transformé",
        "text": "Les Égyptiens n’attendent pas passivement la nature : ils creusent, entretiennent, répartissent, stockent et ritualisent la crue. Le Nil est un milieu travaillé par une société organisée."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Limon : dépôt fertile laissé par la crue, essentiel à l’agriculture avant les grands aménagements modernes."
      },
      {
        "title": "Erreur fréquente",
        "text": "Présenter l’Égypte comme un miracle naturel. Le fleuve compte énormément, mais l’organisation sociale et politique transforme cette ressource en puissance."
      },
      {
        "title": "Question d’historien",
        "text": "Qui contrôle l’eau, les stocks et les mesures ? Cette question relie directement environnement et pouvoir."
      }
    ],
    "quiz": [
      {
        "q": "Pourquoi le Nil est-il plus qu’une ressource agricole ?",
        "a": "Parce qu’il organise aussi les transports, la fiscalité, les stocks, l’administration et l’unité du royaume.",
        "why": "Le fleuve structure l’économie autant que le pouvoir.",
        "trap": "Dire seulement “il permet de cultiver”.",
        "evidence": "L’express parle de colonne vertébrale politique."
      },
      {
        "q": "Pourquoi la crue n’est-elle pas une garantie magique ?",
        "a": "Parce qu’elle peut être trop faible ou trop forte et exige une organisation humaine.",
        "why": "Une ressource naturelle devient utile grâce au travail et à la gestion.",
        "trap": "Imaginer une Égypte automatiquement prospère.",
        "evidence": "Le bloc “La crue, ressource et incertitude”."
      },
      {
        "q": "Quel groupe rend possible la mesure et le contrôle ?",
        "a": "Les scribes et l’administration.",
        "why": "Ils enregistrent terres, récoltes, prélèvements et obligations.",
        "trap": "Oublier l’administration derrière les monuments.",
        "evidence": "Le bloc “Mesurer pour gouverner”."
      },
      {
        "q": "Pourquoi la forme longue de l’Égypte compte-t-elle ?",
        "a": "Elle fait du fleuve une route centrale pour relier le royaume.",
        "why": "La circulation nord-sud est essentielle à l’intégration politique.",
        "trap": "Voir la carte comme un simple décor.",
        "evidence": "Le bloc “Circuler et unir”."
      },
      {
        "q": "Quelle idée faut-il retenir ?",
        "a": "Le Nil est un milieu travaillé : nature, agriculture, transport et État se combinent.",
        "why": "C’est cette combinaison qui explique la durée égyptienne.",
        "trap": "Opposer nature et société comme si elles étaient séparées.",
        "evidence": "Le dernier bloc du cours complet."
      }
    ]
  },
  "egypt-two-lands": {
    "hook": "Avant les pyramides, il faut comprendre comment l’Égypte devient un royaume : l’unification des Deux Terres transforme une vallée en État pharaonique.",
    "keyFacts": [
      "Quand : autour de -3100, avec une chronologie encore discutée",
      "Où : Haute-Égypte au sud, Basse-Égypte dans le delta",
      "Acteurs : élites locales, premiers rois, administration naissante, sanctuaires",
      "Traces : palettes cérémonielles, tombes d’Abydos, motifs des deux couronnes, premières inscriptions",
      "Piège : imaginer une unification instantanée par un seul héros"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "L’unification des Deux Terres est un processus politique, religieux et administratif, pas seulement une victoire militaire."
      },
      {
        "label": "Preuve",
        "text": "Les symboles des couronnes, les noms royaux, les tombes et les objets cérémoniels montrent la construction d’un pouvoir central."
      },
      {
        "label": "Nuance",
        "text": "Narmer est important dans la mémoire des débuts, mais il ne faut pas réduire toute la formation de l’État égyptien à un seul personnage."
      }
    ],
    "express": [
      "Les Égyptiens parlent souvent des Deux Terres : la Haute-Égypte, au sud de la vallée du Nil, et la Basse-Égypte, dans le delta. L’unification de ces espaces autour de -3100 est un moment fondateur, même si elle ne doit pas être imaginée comme une scène simple et instantanée.",
      "Les premiers rois construisent leur autorité avec des symboles puissants : couronnes, noms royaux, rites, images de domination, liens avec les dieux et contrôle des lieux importants. Le pouvoir pharaonique naît donc en associant guerre, religion, administration et mémoire officielle.",
      "Le piège est de raconter seulement Narmer comme un héros qui aurait “créé l’Égypte” d’un coup. Ce qui compte historiquement, c’est la formation progressive d’un État capable de contrôler les hommes, les terres, les récoltes, les cultes et les signes du pouvoir."
    ],
    "complete": [
      {
        "title": "1. Deux espaces à unir",
        "text": "La Haute-Égypte correspond à la vallée étroite du Nil vers le sud ; la Basse-Égypte correspond au delta, plus ouvert sur la Méditerranée. Les appeler Deux Terres montre que l’unité égyptienne est pensée comme la réunion de régions différentes."
      },
      {
        "title": "2. Un processus plus qu’un instant",
        "text": "Autour de -3100, les traces suggèrent une concentration du pouvoir. Mais l’unification n’est probablement pas un événement unique et limpide : elle combine rivalités entre élites, contrôle de territoires, conquêtes, alliances et mise en ordre symbolique."
      },
      {
        "title": "3. Narmer et les images du pouvoir",
        "text": "La palette de Narmer est célèbre parce qu’elle montre un roi dans des scènes de domination et de victoire. Elle est précieuse, mais ce n’est pas une photo de reportage : c’est un objet cérémoniel qui met en scène une idéologie royale."
      },
      {
        "title": "4. Naissance d’un État pharaonique",
        "text": "Unifier, ce n’est pas seulement battre des adversaires. Il faut compter, prélever, stocker, organiser des travaux, contrôler des sanctuaires, afficher l’autorité du roi et créer une mémoire commune. Les premiers signes d’écriture et d’administration deviennent donc essentiels."
      },
      {
        "title": "5. Une mémoire durable",
        "text": "L’idée des Deux Terres reste centrale pendant toute l’histoire pharaonique. Même des siècles plus tard, le pharaon est présenté comme celui qui tient ensemble la Haute et la Basse-Égypte. Le début du royaume devient ainsi une référence politique permanente."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Deux Terres : expression qui désigne la Haute et la Basse-Égypte, dont l’union symbolise l’autorité du pharaon."
      },
      {
        "title": "Source à manier",
        "text": "Une palette cérémonielle renseigne sur la mise en scène du pouvoir, mais pas directement sur tous les détails de l’événement représenté."
      },
      {
        "title": "Erreur fréquente",
        "text": "Croire qu’un seul roi fonde l’Égypte d’un geste simple. L’unification est aussi une construction administrative, religieuse et mémorielle."
      }
    ],
    "quiz": [
      {
        "kind": "concept",
        "q": "Que désignent les Deux Terres ?",
        "a": "La Haute-Égypte au sud et la Basse-Égypte dans le delta, réunies symboliquement sous l’autorité du roi.",
        "choices": [
          "Deux empires séparés entre Rome et Athènes.",
          "Deux pyramides construites par le même architecte.",
          "Deux routes commerciales entre Chine et Méditerranée."
        ],
        "why": "L’expression résume l’unité politique égyptienne.",
        "trap": "Croire qu’il s’agit seulement d’une formule poétique.",
        "evidence": "Express et bloc 1."
      },
      {
        "kind": "date",
        "q": "Pourquoi faut-il être prudent avec l’unification autour de -3100 ?",
        "a": "Parce qu’elle désigne un processus de formation de l’État plus qu’un événement unique parfaitement connu.",
        "choices": [
          "Parce que l’Égypte n’existe qu’après Alexandre.",
          "Parce que les pyramides sont déjà détruites à cette date.",
          "Parce que cette date correspond à la fin de l’Empire romain."
        ],
        "why": "Les débuts sont reconstruits à partir de traces partielles.",
        "trap": "Transformer une chronologie utile en scène simple.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "source",
        "q": "Que montre surtout la palette de Narmer ?",
        "a": "Une mise en scène cérémonielle de la victoire et de l’idéologie royale.",
        "choices": [
          "Un contrat fiscal complet avec les paysans du delta.",
          "Une carte précise de toutes les provinces égyptiennes.",
          "Un récit neutre écrit par un témoin extérieur."
        ],
        "why": "L’objet est précieux, mais il met en scène le pouvoir.",
        "trap": "La lire comme un reportage moderne.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "pouvoir",
        "q": "Pourquoi l’unification n’est-elle pas seulement militaire ?",
        "a": "Parce qu’elle implique aussi administration, rites, prélèvements, sanctuaires et symboles royaux.",
        "choices": [
          "Parce qu’aucune élite locale n’existe dans la vallée du Nil.",
          "Parce que l’écriture remplace entièrement le pouvoir royal.",
          "Parce que les temples n’ont aucun rôle politique."
        ],
        "why": "Un État durable doit organiser plus que des batailles.",
        "trap": "Réduire l’État à la guerre.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Quelle idée reste durable dans la monarchie pharaonique ?",
        "a": "Le pharaon est celui qui tient ensemble la Haute et la Basse-Égypte.",
        "choices": [
          "Le roi égyptien refuse tous les symboles religieux.",
          "La Basse-Égypte gouverne seule tout le royaume sans roi.",
          "L’unification est oubliée dès l’Ancien Empire."
        ],
        "why": "Les Deux Terres deviennent un langage permanent du pouvoir.",
        "trap": "Croire que les débuts ne comptent plus ensuite.",
        "evidence": "Bloc 5."
      }
    ]
  },
  "egypt-pharaoh-maat": {
    "hook": "Pharaon ne règne pas seulement parce qu’il commande : il doit maintenir Maât, c’est-à-dire l’ordre juste du monde, contre le chaos.",
    "express": [
      "Maât désigne à la fois l’ordre, la justice, l’équilibre cosmique et la vérité. Le pharaon est présenté comme celui qui garantit cet ordre entre les hommes, les dieux et la nature.",
      "Cette idée donne au pouvoir royal une dimension religieuse très forte. Gouverner, rendre la justice, construire des temples, vaincre les ennemis ou organiser les récoltes peuvent être présentés comme des manières de préserver Maât.",
      "Le piège est de croire que Maât est seulement une croyance abstraite. C’est aussi un langage politique : il justifie le pouvoir du roi et fixe ce qu’un bon souverain est censé accomplir."
    ],
    "complete": [
      {
        "title": "1. Un mot difficile à traduire",
        "text": "Maât n’est pas simplement la loi ou la morale. Le terme associe ordre du monde, vérité, justice, stabilité sociale et harmonie avec les dieux. C’est une notion religieuse et politique à la fois."
      },
      {
        "title": "2. Pharaon comme garant",
        "text": "Le roi est censé maintenir Maât. Cette fonction dépasse la gestion administrative : elle donne au pouvoir royal une place cosmique, comme si la stabilité du monde dépendait aussi de l’action royale."
      },
      {
        "title": "3. Le chaos comme menace",
        "text": "Les ennemis, les famines, les troubles, les mensonges ou les désordres peuvent être pensés comme des formes d’Isfet, le désordre. La propagande royale montre donc souvent pharaon vainqueur du chaos."
      },
      {
        "title": "4. Une idée dans les gestes concrets",
        "text": "Rendre la justice, financer des temples, organiser l’irrigation, protéger les frontières ou célébrer les rites sont autant de gestes qui peuvent être reliés à Maât. La théologie rejoint la pratique du gouvernement."
      },
      {
        "title": "5. Pourquoi c’est important",
        "text": "Comprendre Maât évite de séparer artificiellement religion et politique. En Égypte pharaonique, gouverner le royaume, honorer les dieux et maintenir l’ordre social sont profondément liés."
      }
    ],
    "deeper": [
      {
        "title": "Mot opposé",
        "text": "Isfet désigne le désordre, le chaos ou l’injustice, souvent présenté comme ce que le pouvoir royal doit repousser."
      },
      {
        "title": "Erreur fréquente",
        "text": "Décrire pharaon comme un simple roi absolu. Son autorité est pensée dans un système religieux où il a des devoirs d’ordre cosmique."
      },
      {
        "title": "Indice visuel",
        "text": "Les scènes où le roi terrasse des ennemis ne sont pas seulement militaires : elles mettent en image la victoire de l’ordre sur le chaos."
      }
    ],
    "quiz": [
      {
        "q": "Que signifie Maât dans ce cours ?",
        "a": "L’ordre juste du monde : vérité, justice, stabilité sociale et équilibre cosmique.",
        "why": "Le mot dépasse une simple règle juridique.",
        "trap": "Le traduire seulement par “loi”.",
        "evidence": "Le premier bloc explique la difficulté de traduction."
      },
      {
        "q": "Pourquoi pharaon est-il plus qu’un administrateur ?",
        "a": "Parce qu’il est présenté comme le garant religieux et politique de Maât.",
        "why": "Son pouvoir a une fonction cosmique.",
        "trap": "Le réduire à un chef d’État moderne.",
        "evidence": "Le bloc “Pharaon comme garant”."
      },
      {
        "q": "Que représente Isfet ?",
        "a": "Le désordre, le chaos ou l’injustice que le roi doit repousser.",
        "why": "L’opposition Maât/Isfet structure la propagande royale.",
        "trap": "Croire que les ennemis sont seulement des adversaires militaires.",
        "evidence": "Le bloc “Le chaos comme menace”."
      },
      {
        "q": "Cite un geste concret lié à Maât.",
        "a": "Rendre la justice, financer des temples, organiser l’irrigation ou protéger les frontières.",
        "why": "Maât s’incarne dans des pratiques de gouvernement.",
        "trap": "En faire une idée abstraite sans effet politique.",
        "evidence": "Le quatrième bloc."
      },
      {
        "q": "Quelle séparation moderne faut-il éviter ?",
        "a": "Séparer trop nettement religion et politique.",
        "why": "Dans l’Égypte pharaonique, les deux sont fortement liés.",
        "trap": "Appliquer nos catégories actuelles sans nuance.",
        "evidence": "Le dernier bloc."
      }
    ]
  },
  "egypt-pyramids": {
    "hook": "Une pyramide n’est pas seulement une tombe spectaculaire : c’est le point visible d’un système politique capable de mobiliser terres, travailleurs, scribes, ressources et croyances.",
    "express": [
      "Les pyramides d’Égypte appartiennent surtout à l’Ancien Empire. Elles sont liées au pouvoir du pharaon, à la religion funéraire et à l’idée que l’ordre du monde dépend aussi du roi.",
      "Elles demandent une organisation énorme : carrières, transport, nourriture, spécialistes, scribes, équipes de travail. Ce n’est pas seulement une prouesse architecturale, c’est une preuve d’État.",
      "Le piège est de les expliquer par le mystère ou par des clichés. L’intérêt historique est plus fort : elles montrent comment religion, administration, agriculture du Nil et autorité royale se combinent."
    ],
    "complete": [
      {
        "title": "1. Une tombe royale, mais pas seulement",
        "text": "La pyramide est un monument funéraire destiné au roi. Mais sa construction implique bien plus que la mort : elle affirme le pouvoir royal, l’ordre religieux et la capacité du royaume à organiser des ressources sur une longue durée."
      },
      {
        "title": "2. Le Nil et l’administration",
        "text": "L’Égypte vit au rythme du Nil. Les crues, les récoltes, l’impôt et les stocks donnent à l’État les moyens de mobiliser des travailleurs et des spécialistes. Sans administration, pas de chantier monumental durable."
      },
      {
        "title": "3. Les scribes rendent le chantier possible",
        "text": "Les scribes comptent, enregistrent, répartissent et contrôlent. Ils sont essentiels pour transformer une idée royale en chantier réel : matériaux, équipes, rations, temps de travail, transport."
      },
      {
        "title": "4. Une croyance rendue visible",
        "text": "Les pyramides matérialisent une vision du monde : le roi, la mort, l’éternité, le soleil, les dieux et la stabilité du royaume. L’architecture donne une forme durable à une croyance politique."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "Les pyramides impressionnent parce qu’elles sont grandes ; elles intéressent l’historien parce qu’elles révèlent un État, une économie, une religion et une administration."
      }
    ],
    "deeper": [
      {
        "title": "Pourquoi éviter le faux mystère ?",
        "text": "Plus une explication invoque le miracle ou l’énigme absolue, moins elle aide à comprendre les ouvriers, les techniques, les carrières, les rampes, les rations et l’administration."
      },
      {
        "title": "Repère",
        "text": "Ancien Empire : période majeure de l’Égypte pharaonique, associée aux grandes pyramides."
      },
      {
        "title": "Erreur fréquente",
        "text": "Réduire l’Égypte aux pyramides : le vrai sujet est l’articulation entre fleuve, État, scribes et religion."
      }
    ],
    "quiz": [
      {
        "q": "Pourquoi une pyramide est-elle aussi une preuve d’État ?",
        "a": "Parce qu’elle suppose une mobilisation organisée de ressources, travailleurs, scribes et matériaux."
      },
      {
        "q": "Quel rôle joue le Nil dans ce système ?",
        "a": "Il structure l’agriculture, les crues, les récoltes, les stocks et donc les ressources mobilisables."
      },
      {
        "q": "Pourquoi les scribes sont-ils indispensables ?",
        "a": "Ils comptent, enregistrent, répartissent et contrôlent le chantier et les ressources."
      },
      {
        "q": "Quel piège faut-il éviter ?",
        "a": "Présenter les pyramides comme un mystère inexplicable plutôt que comme un fait historique organisé."
      },
      {
        "q": "Quelle dimension religieuse porte la pyramide ?",
        "a": "Elle est liée à la mort royale, à l’éternité, au soleil, aux dieux et à l’ordre du monde."
      }
    ]
  },
  "egypt-ramses": {
    "hook": "Ramsès II est célèbre pour ses colosses, ses temples et Qadesh. Mais le plus intéressant n’est pas seulement sa gloire : c’est la fabrication politique de cette gloire.",
    "keyFacts": [
      "Quand : règne de Ramsès II, XIIIe siècle av. J.-C.",
      "Où : Égypte du Nouvel Empire, Levant, Qadesh, Abou Simbel, Pi-Ramsès",
      "Acteurs : Ramsès II, Hittites, armée égyptienne, scribes, artisans, prêtres",
      "Traces : inscriptions royales, reliefs de bataille, temples, traité égypto-hittite",
      "Piège : prendre la propagande de Qadesh comme une victoire totale et simple"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "Ramsès II montre comment un pharaon du Nouvel Empire construit son image par guerre, diplomatie, temples et inscriptions."
      },
      {
        "label": "Preuve",
        "text": "Les récits de Qadesh répétés sur les temples transforment un affrontement difficile en victoire royale mémorable."
      },
      {
        "label": "Nuance",
        "text": "Le traité avec les Hittites rappelle que la diplomatie compte autant que la bataille."
      }
    ],
    "express": [
      "Ramsès II règne au XIIIe siècle av. J.-C., pendant le Nouvel Empire. Son image est immense : temples, colosses, inscriptions, capitales et scènes militaires. Il devient un modèle de pharaon puissant, mais cette puissance est aussi soigneusement mise en scène.",
      "La bataille de Qadesh, contre les Hittites, est racontée comme un exploit personnel du roi. Pourtant, l’affrontement ne donne pas une victoire égyptienne simple et définitive. Les récits officiels montrent surtout comment le pouvoir transforme une situation militaire complexe en propagande royale.",
      "Ramsès II est aussi un acteur diplomatique. Le traité avec les Hittites montre que l’Égypte du Nouvel Empire vit dans un monde de grandes puissances, d’alliances, de rivalités et de négociations. Le pharaon n’est donc pas seulement un guerrier : il est aussi un constructeur d’image et d’équilibre politique."
    ],
    "complete": [
      {
        "title": "1. Un règne très long",
        "text": "Ramsès II règne longtemps, ce qui lui permet d’accumuler monuments, inscriptions et mémoire officielle. La durée du règne contribue à son prestige : plus le roi est visible partout, plus il semble incarner la stabilité du royaume."
      },
      {
        "title": "2. Le Nouvel Empire et le Levant",
        "text": "Au Nouvel Empire, l’Égypte projette sa puissance au-delà de la vallée du Nil, notamment vers le Levant. Elle y rencontre d’autres grandes puissances, dont les Hittites. Qadesh appartient à cette géopolitique, pas à un simple duel héroïque."
      },
      {
        "title": "3. Qadesh : bataille et propagande",
        "text": "Les inscriptions racontent Ramsès sauvant la situation par son courage. Cette image est politique. L’affrontement est difficile, et la répétition du récit sur plusieurs monuments montre que le roi veut imposer une mémoire de victoire."
      },
      {
        "title": "4. Diplomatie avec les Hittites",
        "text": "Après les affrontements, Égyptiens et Hittites concluent un traité. C’est essentiel : la puissance d’un roi ne se mesure pas seulement à ses victoires, mais aussi à sa capacité à stabiliser des frontières, négocier et être reconnu par d’autres souverains."
      },
      {
        "title": "5. Des monuments comme langage politique",
        "text": "Abou Simbel, Pi-Ramsès et les reliefs royaux ne servent pas seulement à décorer. Ils rendent le pouvoir visible, rappellent la protection divine du roi et fixent dans la pierre la version officielle de son règne."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Propagande royale : mise en forme officielle du pouvoir, destinée à montrer le roi comme vainqueur, protecteur et choisi par les dieux."
      },
      {
        "title": "Nuance",
        "text": "Un récit royal peut contenir des faits, mais il sélectionne et organise ces faits pour produire une image avantageuse du souverain."
      },
      {
        "title": "Erreur fréquente",
        "text": "Raconter Qadesh comme une victoire nette de Ramsès II. L’intérêt historique est justement l’écart entre bataille, diplomatie et mémoire officielle."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "À quelle période appartient Ramsès II ?",
        "a": "Au Nouvel Empire, au XIIIe siècle av. J.-C.",
        "choices": [
          "À l’époque de la Révolution française.",
          "Au temps de la République romaine tardive.",
          "Au Moyen Âge scandinave."
        ],
        "why": "Le cadre chronologique évite de mélanger les périodes.",
        "trap": "Traiter Ramsès comme un pharaon hors du temps.",
        "evidence": "Express et repères."
      },
      {
        "kind": "événement",
        "q": "Pourquoi Qadesh est-elle importante ?",
        "a": "Parce qu’elle oppose l’Égypte aux Hittites et devient un grand récit de propagande royale.",
        "choices": [
          "Parce qu’elle marque la construction de la première pyramide.",
          "Parce qu’elle fonde la démocratie athénienne.",
          "Parce qu’elle met fin à l’Empire romain d’Occident."
        ],
        "why": "Qadesh relie guerre, rivalité de puissances et mémoire officielle.",
        "trap": "La réduire à une simple bataille gagnée.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "source",
        "q": "Comment lire les inscriptions de Qadesh ?",
        "a": "Comme des récits officiels qui mettent en scène le courage du roi et organisent la mémoire de l’événement.",
        "choices": [
          "Comme des journaux neutres écrits par les soldats hittites.",
          "Comme des documents sans intention politique.",
          "Comme des preuves que la diplomatie n’existe pas."
        ],
        "why": "La source royale est précieuse mais orientée.",
        "trap": "Confondre inscription royale et reportage.",
        "evidence": "Deeper et bloc 3."
      },
      {
        "kind": "diplomatie",
        "q": "Que montre le traité avec les Hittites ?",
        "a": "Que la puissance de Ramsès II passe aussi par la diplomatie et la stabilisation des relations internationales.",
        "choices": [
          "Que l’Égypte ne connaît aucun voisin puissant.",
          "Que tous les conflits se règlent par des pyramides.",
          "Que les Hittites sont des scribes du delta."
        ],
        "why": "Le traité nuance l’image du roi uniquement guerrier.",
        "trap": "Opposer guerre et diplomatie.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Pourquoi les monuments de Ramsès II sont-ils politiques ?",
        "a": "Ils rendent visible une version officielle du pouvoir, de la protection divine et de la victoire royale.",
        "choices": [
          "Ils servent seulement d’abris agricoles pour la crue.",
          "Ils prouvent que les scribes dirigent seuls l’armée.",
          "Ils effacent tout lien entre roi et religion."
        ],
        "why": "Les monuments fixent la mémoire royale dans l’espace.",
        "trap": "Les voir comme de simples décorations.",
        "evidence": "Bloc 5."
      }
    ]
  },
  "egypt-connected": {
    "hook": "L’Égypte n’est pas une civilisation enfermée derrière ses déserts. Elle échange, combat, négocie et se transforme au contact de la Nubie, du Levant et de la Méditerranée.",
    "keyFacts": [
      "Quand : surtout du Moyen Empire à l’époque tardive, avec un accent sur le Nouvel Empire",
      "Où : vallée du Nil, Nubie, Sinaï, Levant, Méditerranée orientale",
      "Acteurs : Égyptiens, Nubiens, Hyksôs, Hittites, cités du Levant, marchands, diplomates",
      "Traces : lettres diplomatiques, objets importés, forteresses, reliefs, inscriptions, tombes",
      "Piège : imaginer l’Égypte comme un monde isolé et immobile"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "L’Égypte ancienne est connectée : les échanges, les guerres et la diplomatie font partie de son histoire."
      },
      {
        "label": "Preuve",
        "text": "Or nubien, bois du Levant, chevaux, chars, lettres diplomatiques et objets étrangers montrent ces circulations."
      },
      {
        "label": "Nuance",
        "text": "Les contacts ne sont pas toujours pacifiques : commerce, domination, emprunts, rivalités et alliances coexistent."
      }
    ],
    "express": [
      "Les déserts protègent partiellement l’Égypte, mais ils ne l’enferment pas. Le Nil ouvre vers la Nubie au sud, le delta regarde vers la Méditerranée, le Sinaï et le Levant relient l’Égypte au Proche-Orient. L’histoire égyptienne est donc aussi une histoire de contacts.",
      "Ces contacts prennent plusieurs formes : commerce de bois, d’or, de pierres ou de produits de luxe ; campagnes militaires ; forteresses ; mariages diplomatiques ; circulation d’objets, de techniques et d’idées. Le Nouvel Empire, notamment, est très engagé au Levant et en Nubie.",
      "Le piège est de présenter l’Égypte comme une civilisation pure, isolée et toujours identique à elle-même. Les Hyksôs, les Nubiens, les Hittites, les cités du Levant et les routes méditerranéennes montrent au contraire une Égypte puissante mais connectée, parfois dominante, parfois influencée."
    ],
    "complete": [
      {
        "title": "1. Des frontières qui filtrent",
        "text": "Les déserts et la mer créent des protections, mais pas des murs absolus. Les oasis, le Sinaï, la Nubie, le delta et les ports permettent des circulations. Une frontière ancienne est souvent un espace de contrôle et de passage, pas une ligne fermée."
      },
      {
        "title": "2. La Nubie, partenaire et enjeu",
        "text": "Au sud, la Nubie fournit notamment de l’or, des soldats, des produits africains et des routes. L’Égypte y construit parfois des forteresses et impose son contrôle, mais les royaumes nubiens ne sont pas de simples figurants : ils développent aussi leurs propres pouvoirs."
      },
      {
        "title": "3. Le Levant et les grandes puissances",
        "text": "Vers le nord-est, l’Égypte entre en relation avec les cités du Levant et les grands royaumes du Proche-Orient. Les guerres contre les Hittites, mais aussi les échanges diplomatiques, montrent une Égypte intégrée à un système international."
      },
      {
        "title": "4. Emprunter et transformer",
        "text": "Les contacts apportent des objets, des techniques, des mots, des styles et parfois des pratiques militaires. L’usage du cheval et du char, les produits importés ou certains motifs artistiques rappellent que les sociétés anciennes changent par circulation."
      },
      {
        "title": "5. Une puissance connectée",
        "text": "Dire que l’Égypte est connectée ne diminue pas son originalité. Au contraire, cela explique mieux sa durée : elle protège son cœur nilotique tout en utilisant des réseaux extérieurs pour obtenir ressources, prestige, alliés et informations."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Levant : région de la Méditerranée orientale, entre Égypte, Anatolie, Syrie-Palestine et grands royaumes du Proche-Orient."
      },
      {
        "title": "Nuance",
        "text": "Un contact peut être commercial, militaire, diplomatique, religieux ou artistique ; il ne signifie pas toujours domination dans un seul sens."
      },
      {
        "title": "Erreur fréquente",
        "text": "Imaginer une Égypte figée derrière le désert. Les sources montrent un royaume qui surveille, échange, emprunte, conquiert et négocie."
      }
    ],
    "quiz": [
      {
        "kind": "concept",
        "q": "Pourquoi l’Égypte n’est-elle pas isolée ?",
        "a": "Parce qu’elle est reliée à la Nubie, au Sinaï, au Levant et à la Méditerranée par des routes et des contacts variés.",
        "choices": [
          "Parce qu’elle se situe au centre de l’Europe médiévale.",
          "Parce que ses pyramides servent de ports maritimes.",
          "Parce qu’elle refuse tout échange avec ses voisins."
        ],
        "why": "La géographie protège mais permet aussi des passages.",
        "trap": "Confondre protection et isolement total.",
        "evidence": "Express et bloc 1."
      },
      {
        "kind": "lieu",
        "q": "Pourquoi la Nubie est-elle importante pour l’Égypte ?",
        "a": "Elle est liée à l’or, aux routes du Nil, aux soldats, aux forteresses et à des royaumes africains puissants.",
        "choices": [
          "Elle est une cité grecque inventée par Alexandre.",
          "Elle est le quartier central de Rome.",
          "Elle est uniquement une légende funéraire sans territoire."
        ],
        "why": "La Nubie est un espace réel d’échanges et de rivalités.",
        "trap": "La réduire à une marge passive.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "diplomatie",
        "q": "Que montre le Levant dans l’histoire égyptienne ?",
        "a": "L’intégration de l’Égypte à des guerres, alliances et échanges avec les puissances du Proche-Orient.",
        "choices": [
          "L’absence totale de voisins au nord-est.",
          "La fin immédiate de toute monarchie pharaonique.",
          "La naissance des chasseurs-cueilleurs paléolithiques."
        ],
        "why": "Le Levant connecte l’Égypte aux grands équilibres régionaux.",
        "trap": "Raconter l’Égypte seulement depuis la vallée du Nil.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "circulation",
        "q": "Quelle idée corrigent les emprunts techniques ou artistiques ?",
        "a": "Les sociétés anciennes changent aussi par circulation d’objets, de techniques, de styles et d’idées.",
        "choices": [
          "Une civilisation ne change jamais au contact d’une autre.",
          "Tous les objets étrangers sont automatiquement sans valeur.",
          "Le commerce supprime toutes les identités politiques."
        ],
        "why": "Les contacts transforment sans effacer l’originalité locale.",
        "trap": "Opposer pureté et influence.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Quelle formule résume le mieux le cours ?",
        "a": "L’Égypte est une puissance nilotique originale, mais connectée à des réseaux extérieurs.",
        "choices": [
          "L’Égypte est un monde fermé, sans échanges ni diplomatie.",
          "L’Égypte est seulement une copie des royaumes hittites.",
          "L’Égypte n’existe qu’à travers les récits grecs tardifs."
        ],
        "why": "La bonne réponse combine originalité et connexions.",
        "trap": "Choisir entre isolement total et absence d’identité propre.",
        "evidence": "Conclusion."
      }
    ]
  },
  "greece-athens-democracy": {
    "hook": "Athènes invente une forme célèbre de démocratie, mais elle oblige surtout à poser une question gênante : qui a vraiment le droit d’être le peuple ?",
    "express": [
      "La démocratie athénienne concerne les citoyens masculins adultes nés de parents citoyens. Cela exclut les femmes, les esclaves, les métèques et une grande partie des habitants.",
      "Le pouvoir se joue dans l’assemblée, les magistratures, les tribunaux et le tirage au sort. La participation directe est centrale : on ne vote pas seulement pour des représentants comme dans beaucoup de démocraties modernes.",
      "Le sujet est donc double : Athènes invente des pratiques politiques puissantes, mais dans une société profondément inégalitaire. C’est ce contraste qui rend le thème intéressant."
    ],
    "complete": [
      {
        "title": "1. Le peuple, mais lequel ?",
        "text": "Demos ne signifie pas tous les habitants. À Athènes, le citoyen est un statut limité. Les femmes, esclaves et étrangers résidents participent à la vie de la cité, mais pas à la décision politique comme citoyens."
      },
      {
        "title": "2. Une démocratie directe",
        "text": "L’assemblée permet aux citoyens de voter directement certaines décisions. Le tirage au sort limite la confiscation du pouvoir par une élite permanente. Les tribunaux populaires participent aussi à la vie politique."
      },
      {
        "title": "3. Une culture du débat",
        "text": "La parole publique, la rhétorique, la persuasion et le conflit d’opinions sont essentiels. La démocratie athénienne est autant une pratique sociale qu’un ensemble d’institutions."
      },
      {
        "title": "4. Une cité impériale",
        "text": "Athènes n’est pas seulement une démocratie interne : elle domine aussi des alliés et tire profit de son empire maritime. La liberté des citoyens peut donc coexister avec la domination extérieure."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "Athènes est importante parce qu’elle invente des formes de participation politique, mais elle ne doit jamais être idéalisée : sa démocratie repose sur des exclusions fortes."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Métèque : étranger libre vivant à Athènes, intégré économiquement mais exclu de la citoyenneté politique."
      },
      {
        "title": "Comparaison utile",
        "text": "La démocratie athénienne est directe et civique ; les démocraties modernes sont souvent représentatives et fondées sur une citoyenneté beaucoup plus large."
      },
      {
        "title": "Erreur fréquente",
        "text": "Dire “les Grecs ont inventé la démocratie” sans préciser Athènes, les citoyens et les exclusions."
      }
    ],
    "quiz": [
      {
        "q": "Qui est exclu de la citoyenneté athénienne ?",
        "a": "Les femmes, les esclaves, les métèques et les non-citoyens."
      },
      {
        "q": "Pourquoi parle-t-on de démocratie directe ?",
        "a": "Parce que les citoyens participent directement à certaines décisions dans l’assemblée."
      },
      {
        "q": "Quel mécanisme limite la professionnalisation du pouvoir ?",
        "a": "Le tirage au sort de certaines charges."
      },
      {
        "q": "Pourquoi Athènes ne doit-elle pas être idéalisée ?",
        "a": "Parce que la participation politique repose sur des exclusions sociales et civiques fortes."
      },
      {
        "q": "Quel contraste rend le sujet intéressant ?",
        "a": "Une innovation politique majeure dans une société très inégalitaire."
      }
    ]
  },
  "greece-persian-wars": {
    "hook": "Une poignée de cités grecques face au plus vaste empire de leur temps : les guerres médiques sont moins une légende héroïque qu’un laboratoire de choix politiques, de logistique et de mémoire.",
    "express": [
      "Les guerres médiques opposent au début du Ve siècle av. J.-C. l’Empire perse achéménide à plusieurs cités grecques, notamment Athènes et Sparte. Elles ne sont pas une guerre de “la Grèce entière” contre “l’Orient” : les cités grecques sont divisées, certaines résistent, d’autres composent avec les Perses.",
      "Marathon, les Thermopyles, Salamine et Platées deviennent des épisodes célèbres parce qu’ils combinent stratégie, propagande et mémoire politique. Marathon montre la capacité athénienne à se défendre ; Salamine révèle l’importance de la flotte et du choix du terrain ; les Thermopyles deviennent un récit de sacrifice.",
      "Le piège est de raconter cela comme une opposition simple entre liberté grecque et despotisme perse. C’est une lecture construite en partie par les vainqueurs. Le vrai intérêt historique est de comprendre comment les cités utilisent la guerre pour fabriquer une mémoire commune et renforcer certains régimes, surtout Athènes."
    ],
    "complete": [
      {
        "title": "1. Une guerre née d’un monde connecté",
        "text": "Les cités grecques d’Asie Mineure vivent déjà au contact de l’Empire perse. Les révoltes ioniennes, les alliances, les expéditions punitives et les rivalités entre cités expliquent mieux le conflit qu’une opposition abstraite entre deux civilisations."
      },
      {
        "title": "2. Marathon : victoire militaire et capital politique",
        "text": "En 490 av. J.-C., Marathon devient pour Athènes une victoire fondatrice. Militairement, c’est une bataille terrestre. Politiquement, elle nourrit l’idée que les citoyens-soldats peuvent défendre la cité sans attendre un sauveur extérieur."
      },
      {
        "title": "3. Salamine : l’intelligence du terrain",
        "text": "En 480 av. J.-C., les Grecs attirent la flotte perse dans un espace resserré. La bataille montre que la supériorité numérique ne suffit pas toujours : le terrain, la coordination et la connaissance maritime peuvent inverser le rapport de force."
      },
      {
        "title": "4. Les Thermopyles : défaite transformée en mémoire",
        "text": "Les Thermopyles sont une défaite grecque, mais deviennent un récit de courage. C’est un bon exemple de fabrication mémorielle : un événement perdu peut devenir symboliquement victorieux s’il sert une identité politique."
      },
      {
        "title": "5. Après la guerre : Athènes en sort renforcée",
        "text": "La victoire grecque ne produit pas une Grèce unie. Elle ouvre au contraire une période de rivalités où Athènes construit sa puissance maritime autour de la ligue de Délos, bientôt perçue par beaucoup comme un empire athénien."
      }
    ],
    "deeper": [
      {
        "title": "Nuance utile",
        "text": "Des Grecs combattent ou négocient avec les Perses. Le monde grec est fragmenté : cité, alliance et intérêt local comptent autant que l’identité culturelle."
      },
      {
        "title": "Repère",
        "text": "Médiser : soutenir ou accepter la domination perse. Le mot montre que les Grecs eux-mêmes ne sont pas tous dans le même camp."
      },
      {
        "title": "Trace durable",
        "text": "Les récits d’Hérodote donnent une source majeure, mais il faut les lire comme une enquête antique, pas comme un reportage neutre."
      }
    ],
    "quiz": [
      {
        "q": "Pourquoi faut-il éviter de parler d’une Grèce totalement unie ?",
        "a": "Parce que les cités grecques sont divisées et certaines composent avec les Perses.",
        "why": "La cité reste l’échelle politique principale.",
        "trap": "Imaginer une nation grecque moderne avant l’heure.",
        "evidence": "Le cours insiste sur les cités divisées et le verbe “médiser”."
      },
      {
        "q": "Pourquoi Salamine est-elle plus qu’une simple bataille navale ?",
        "a": "Elle montre le rôle du terrain, de la flotte et de la stratégie face à une puissance plus nombreuse.",
        "why": "La supériorité perse n’empêche pas une défaite dans un espace mal choisi.",
        "trap": "Réduire la bataille à du courage abstrait.",
        "evidence": "Le passage sur l’espace resserré de Salamine."
      },
      {
        "q": "Quel épisode est une défaite transformée en victoire mémorielle ?",
        "a": "Les Thermopyles, une défaite grecque devenue symbole de résistance.",
        "why": "La bataille est perdue, mais elle devient un récit de sacrifice.",
        "trap": "Croire que tous les épisodes célèbres sont des victoires militaires.",
        "evidence": "Le bloc “défaite transformée en mémoire”."
      },
      {
        "q": "Que gagne Athènes après les guerres médiques ?",
        "a": "Un prestige et une puissance maritime qui favorisent la ligue de Délos puis l’empire athénien.",
        "why": "La victoire sert à construire une domination politique.",
        "trap": "Penser que la paix grecque suit automatiquement la victoire.",
        "evidence": "Le cinquième bloc du cours complet."
      },
      {
        "q": "Quelle source majeure faut-il lire avec prudence ?",
        "a": "Hérodote, source majeure mais à lire comme une enquête antique située.",
        "why": "C’est une source précieuse mais construite par une enquête et une tradition grecques.",
        "trap": "Le lire comme un journal moderne neutre.",
        "evidence": "Le bloc “Trace durable”."
      }
    ]
  },
  "greece-peloponnesian-war": {
    "hook": "Athènes a vaincu les Perses, puis s’est épuisée contre d’autres Grecs : la guerre du Péloponnèse montre comment une démocratie peut devenir impériale et fragile.",
    "express": [
      "La guerre du Péloponnèse oppose surtout Athènes et ses alliés à Sparte et à la ligue du Péloponnèse entre 431 et 404 av. J.-C. Ce n’est pas un duel simple entre démocratie et oligarchie : c’est une guerre de puissances, d’alliances, de peur et de ressources.",
      "Athènes dispose d’une flotte, de murs, d’un empire maritime et de tributs. Sparte domine militairement sur terre. La guerre alterne sièges, raids, épidémie, expéditions lointaines et retournements diplomatiques.",
      "Le piège est de raconter seulement la chute d’Athènes comme une punition morale. Le conflit révèle surtout les tensions d’un monde de cités : autonomie proclamée, dépendances réelles, propagande et violence entre Grecs."
    ],
    "complete": [
      {
        "title": "1. Une guerre entre Grecs divisés",
        "text": "Après les guerres médiques, Athènes transforme la ligue de Délos en instrument de domination. Sparte et d’autres cités craignent cette puissance. La guerre naît donc d’un équilibre instable entre alliances et peur."
      },
      {
        "title": "2. Deux forces différentes",
        "text": "Athènes mise sur la mer, les Longs Murs et les ressources de son empire. Sparte s’appuie sur sa supériorité terrestre et son réseau péloponnésien. La stratégie de chaque camp dépend de son modèle de puissance."
      },
      {
        "title": "3. La démocratie en guerre",
        "text": "À Athènes, les décisions militaires se discutent dans les institutions civiques. Cela permet la mobilisation mais aussi les emballements, les procès politiques et les choix risqués, comme l’expédition de Sicile."
      },
      {
        "title": "4. Une violence politique grecque",
        "text": "Le conflit touche les alliés, les cités neutres, les prisonniers et les civils. Thucydide montre comment la guerre dégrade le langage politique, radicalise les factions et rend la nécessité plus forte que la justice proclamée."
      },
      {
        "title": "5. 404 av. J.-C. : une défaite qui ne clôt pas tout",
        "text": "Athènes perd son empire et doit accepter une domination spartiate. Mais la cité ne disparaît pas. La guerre marque surtout la fin d’un moment de suprématie athénienne et ouvre d’autres rivalités grecques."
      }
    ],
    "deeper": [
      {
        "title": "Source majeure",
        "text": "Thucydide est essentiel pour le conflit, mais il construit une analyse politique et rhétorique : il ne faut pas le lire comme une caméra neutre."
      },
      {
        "title": "Erreur fréquente",
        "text": "Opposer Athènes libre et Sparte autoritaire de manière trop simple. Athènes défend sa démocratie tout en imposant un empire à ses alliés."
      },
      {
        "title": "Épisode à retenir",
        "text": "L’expédition de Sicile montre le danger d’une décision ambitieuse, lointaine et mal maîtrisée : elle affaiblit gravement Athènes."
      }
    ],
    "quiz": [
      {
        "q": "Pourquoi la guerre n’est-elle pas seulement démocratie contre oligarchie ?",
        "a": "Parce qu’elle oppose aussi des puissances, des alliances, des intérêts et des ressources.",
        "why": "Les régimes comptent, mais ne suffisent pas à expliquer le conflit.",
        "trap": "Transformer la guerre en fable politique simpliste.",
        "evidence": "L’express insiste sur puissances et alliances."
      },
      {
        "q": "Quel est l’avantage stratégique principal d’Athènes ?",
        "a": "La flotte, les Longs Murs et les ressources de l’empire maritime.",
        "why": "Athènes pense la guerre depuis la mer.",
        "trap": "Imaginer une guerre uniquement terrestre.",
        "evidence": "Le bloc “Deux forces différentes”."
      },
      {
        "q": "Pourquoi l’expédition de Sicile est-elle importante ?",
        "a": "Elle montre un choix lointain et risqué qui affaiblit fortement Athènes.",
        "why": "La démocratie peut produire de grands débats mais aussi des décisions dangereuses.",
        "trap": "Croire que toutes les défaites viennent seulement de la force spartiate.",
        "evidence": "Le bloc “La démocratie en guerre”."
      },
      {
        "q": "Que montre Thucydide sur la guerre ?",
        "a": "Qu’elle radicalise le langage politique, les factions et la violence.",
        "why": "Le conflit abîme les normes de la cité.",
        "trap": "Réduire Thucydide à un chroniqueur de batailles.",
        "evidence": "Le quatrième bloc."
      },
      {
        "q": "Que signifie la défaite de 404 ?",
        "a": "La fin de la suprématie athénienne, pas la disparition d’Athènes.",
        "why": "La cité continue d’exister politiquement et culturellement.",
        "trap": "Voir 404 comme une fin totale de l’histoire grecque.",
        "evidence": "Le dernier bloc."
      }
    ]
  },
  "rome-foundation-kings": {
    "hook": "Rome ne naît pas comme une grande capitale impériale. Elle commence comme un ensemble de communautés du Latium, autour du Tibre, puis transforme des récits de fondation en mémoire politique.",
    "keyFacts": [
      "Quand : fondation légendaire en 753 av. J.-C. ; premiers siècles mal documentés",
      "Où : Latium, collines de Rome, vallée du Tibre",
      "Acteurs : Latins, Sabins, Étrusques, familles aristocratiques, rois légendaires",
      "Traces : archéologie du Palatin et du Forum, traditions littéraires tardives, rites et institutions",
      "Piège : prendre Romulus et Rémus comme un reportage historique"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "La fondation de Rome mélange archéologie, mémoire civique et légendes construites longtemps après les débuts de la ville."
      },
      {
        "label": "Preuve",
        "text": "Les traces matérielles montrent une urbanisation progressive, pas une ville née en un jour."
      },
      {
        "label": "Piège",
        "text": "La louve, Romulus et Rémus disent surtout comment les Romains veulent raconter leurs origines."
      }
    ],
    "express": [
      "La date de 753 av. J.-C. est une date traditionnelle, pas une photographie de naissance. Les récits de Romulus, Rémus, la louve ou l’enlèvement des Sabines appartiennent à la mémoire romaine : ils expliquent comment Rome veut se représenter, plus qu’ils ne décrivent directement les faits.",
      "L’archéologie montre plutôt une croissance progressive : des habitats sur les collines, des espaces communs, des contacts entre Latins, Sabins et Étrusques, puis l’aménagement du Forum. Rome devient peu à peu une cité organisée autour du Tibre, car ce fleuve relie l’intérieur et les échanges.",
      "Le piège est de choisir entre “tout est faux” et “tout est vrai”. Les légendes sont fausses comme reportage, mais vraies comme sources de mémoire politique : elles parlent de guerre, d’asile, d’intégration, de violence fondatrice et d’identité civique."
    ],
    "complete": [
      {
        "title": "1. Une ville qui ne naît pas en un jour",
        "text": "Les Romains aiment dater leur fondation en 753 av. J.-C., mais les débuts de Rome sont progressifs. Des villages et habitats se développent sur les collines, près d’un passage du Tibre. La ville se forme par rapprochement, aménagement et organisation d’espaces communs."
      },
      {
        "title": "2. Pourquoi le Tibre compte",
        "text": "Rome est placée sur un site utile : le Tibre permet des circulations, le passage entre rives, des échanges avec l’intérieur et le monde tyrrhénien. La géographie ne crée pas automatiquement la ville, mais elle donne des possibilités que des groupes humains exploitent."
      },
      {
        "title": "3. La légende comme mémoire",
        "text": "Romulus, Rémus, la louve ou le meurtre du frère ne doivent pas être lus comme un journal du VIIIe siècle av. J.-C. Ces récits, transmis et réécrits plus tard, construisent une identité : Rome se dit née de conflit, d’accueil, de force et de destin."
      },
      {
        "title": "4. Des influences multiples",
        "text": "Rome n’est pas isolée. Latins, Sabins et Étrusques participent à son environnement. Les Étrusques, notamment, influencent des formes de pouvoir, des rites, des techniques et des signes de prestige. Rome se construit par contacts autant que par opposition."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "Étudier la fondation de Rome, ce n’est pas demander si la louve a vraiment existé. C’est comprendre comment une communauté devenue puissante relit ses origines pour expliquer son identité, ses institutions et sa vocation à intégrer puis dominer."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Fondation légendaire : récit d’origine qui donne du sens politique à une communauté, même quand il ne correspond pas directement aux faits."
      },
      {
        "title": "Comment le lire",
        "text": "On croise les textes tardifs avec l’archéologie : aucun type de source ne suffit seul."
      },
      {
        "title": "Erreur fréquente",
        "text": "Dire seulement “Rome a été fondée par Romulus” revient à confondre mémoire civique et histoire des débuts urbains."
      }
    ],
    "quiz": [
      {
        "kind": "date",
        "q": "Pourquoi 753 av. J.-C. doit-elle être utilisée avec prudence ?",
        "a": "Parce que c’est une date traditionnelle de fondation, pas une preuve directe de naissance soudaine de la ville.",
        "choices": [
          "Parce que c’est la date de la destruction de Carthage.",
          "Parce que Rome existe déjà comme empire chrétien.",
          "Parce que cette date concerne Athènes et non le Latium."
        ],
        "why": "Le cours distingue date mémorielle et formation progressive.",
        "trap": "Lire la date comme une certitude archéologique.",
        "evidence": "Express et bloc 1."
      },
      {
        "kind": "lieu",
        "q": "Pourquoi le Tibre est-il important dans les débuts de Rome ?",
        "a": "Parce qu’il facilite passage, échanges et circulation entre l’intérieur du Latium et les réseaux voisins.",
        "choices": [
          "Parce qu’il isole Rome de tous les échanges méditerranéens.",
          "Parce qu’il remplace toute organisation politique.",
          "Parce qu’il prouve à lui seul l’existence de Romulus."
        ],
        "why": "Le site donne des possibilités que les sociétés exploitent.",
        "trap": "Faire de la géographie une cause automatique.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "source",
        "q": "Que peut apprendre la légende de Romulus et Rémus ?",
        "a": "Elle renseigne surtout la mémoire politique romaine et la manière dont Rome raconte ses origines.",
        "choices": [
          "Elle fournit un compte rendu neutre du VIIIe siècle av. J.-C.",
          "Elle remplace toutes les traces archéologiques.",
          "Elle prouve que les Étrusques n’ont joué aucun rôle."
        ],
        "why": "Une légende peut être utile sans être un reportage.",
        "trap": "Opposer naïvement vrai et faux.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "acteurs",
        "q": "Quels peuples faut-il garder en tête autour des débuts de Rome ?",
        "a": "Latins, Sabins et Étrusques, dans un espace de contacts et d’influences.",
        "choices": [
          "Francs, Vikings et Normands du XIe siècle.",
          "Aztèques, Incas et Mayas des Amériques.",
          "Huns, Mongols et Ottomans de l’époque médiévale."
        ],
        "why": "Rome se construit dans un environnement régional précis.",
        "trap": "Imaginer Rome isolée dès l’origine.",
        "evidence": "Repères et bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Quelle idée faut-il retenir sur la fondation de Rome ?",
        "a": "La ville se forme progressivement, tandis que les récits de fondation construisent une identité civique.",
        "choices": [
          "Rome devient capitale impériale dès le premier jour.",
          "La fondation est seulement une fable inutile pour l’historien.",
          "L’archéologie confirme chaque détail du récit de la louve."
        ],
        "why": "La bonne réponse combine formation urbaine et mémoire politique.",
        "trap": "Choisir tout vrai ou tout faux.",
        "evidence": "Conclusion."
      }
    ]
  },
  "rome-italy-expansion": {
    "hook": "Avant de dominer la Méditerranée, Rome doit d’abord dominer l’Italie. Cette étape est décisive : Rome gagne par la guerre, mais aussi par des alliances, des statuts différenciés et une intégration politique très pragmatique.",
    "keyFacts": [
      "Quand : Ve → IIIe siècles av. J.-C., avant les guerres puniques",
      "Où : Latium, Italie centrale, Italie du Sud",
      "Acteurs : Romains, Latins, Samnites, cités grecques du Sud, alliés italiens",
      "Traces : traités, récits de Tite-Live, colonies, voies, statuts juridiques",
      "Piège : croire que Rome conquiert l’Italie seulement par des victoires militaires"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "La conquête de l’Italie repose sur un mélange de guerre, alliances, colonies et statuts juridiques."
      },
      {
        "label": "Repère",
        "text": "Il faut regarder comment Rome traite différemment les vaincus : certains deviennent citoyens, alliés ou communautés liées par traité."
      },
      {
        "label": "Conséquence",
        "text": "Cette intégration donne à Rome des soldats, des ressources et une profondeur stratégique."
      }
    ],
    "express": [
      "Rome ne passe pas directement du petit Latium à l’empire méditerranéen. Elle construit d’abord sa domination en Italie, du Ve au IIIe siècle av. J.-C., face aux peuples voisins, aux Samnites et aux cités grecques du Sud.",
      "Sa force n’est pas seulement militaire. Rome impose ou négocie des statuts variés : citoyenneté complète, citoyenneté limitée, alliances, colonies, obligations militaires. Les vaincus ne sont pas tous traités pareil, ce qui permet de diviser, intégrer et mobiliser.",
      "Le point à retenir est stratégique : Rome fabrique un réseau italien. Quand les guerres puniques commencent, elle peut appeler des alliés, lever des soldats et encaisser des défaites parce que sa puissance repose sur une Italie déjà organisée autour d’elle."
    ],
    "complete": [
      {
        "title": "1. Une expansion par étapes",
        "text": "Rome commence par affirmer sa position dans le Latium, puis affronte des voisins plus puissants ou mieux installés. Les guerres ne suivent pas une ligne droite : il y a défaites, traités, reprises, colonies et rivalités régionales."
      },
      {
        "title": "2. Les Samnites, adversaires majeurs",
        "text": "Les guerres samnites montrent que la conquête de l’Italie n’est pas facile. Les Samnites contrôlent des espaces montagneux et obligent Rome à s’adapter militairement et politiquement."
      },
      {
        "title": "3. Les cités grecques du Sud",
        "text": "En Italie du Sud, Rome rencontre des cités grecques anciennes et riches. L’intervention de Pyrrhus montre que le monde italien est lié à des puissances plus larges. Rome apprend à gérer des conflits qui dépassent son voisinage immédiat."
      },
      {
        "title": "4. Intégrer pour dominer",
        "text": "La vraie originalité romaine est d’organiser les vaincus. Certains reçoivent la citoyenneté, d’autres gardent une autonomie sous contrainte, d’autres fournissent des soldats. Rome transforme ainsi la conquête en réseau durable d’obligations."
      },
      {
        "title": "5. Préparer l’empire",
        "text": "La domination de l’Italie donne à Rome une base humaine et matérielle immense. Ce n’est pas encore l’empire, mais c’est la condition de l’expansion méditerranéenne : sans l’Italie mobilisée, Rome ne résisterait pas aux guerres longues."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Allié italien : communauté liée à Rome par des obligations, notamment militaires, sans être nécessairement composée de citoyens romains complets."
      },
      {
        "title": "Nuance",
        "text": "L’intégration romaine n’est pas égalitaire : elle donne des avantages à certains groupes et impose des contraintes fortes à d’autres."
      },
      {
        "title": "Erreur fréquente",
        "text": "Raconter seulement des batailles : la domination romaine dépend aussi du droit, des statuts, des routes, des colonies et de la mobilisation."
      }
    ],
    "quiz": [
      {
        "kind": "mécanisme",
        "q": "Pourquoi la conquête de l’Italie ne se résume-t-elle pas à des batailles ?",
        "a": "Parce que Rome combine guerre, alliances, colonies, statuts juridiques et obligations militaires.",
        "choices": [
          "Parce que Rome évite totalement la guerre en Italie.",
          "Parce que les cités grecques du Sud contrôlent directement le Sénat.",
          "Parce que les Samnites deviennent empereurs de Rome."
        ],
        "why": "La domination repose sur un réseau politique et militaire.",
        "trap": "Raconter uniquement une suite de victoires.",
        "evidence": "Express et bloc 4."
      },
      {
        "kind": "acteurs",
        "q": "Quel adversaire montre que la conquête italienne est difficile ?",
        "a": "Les Samnites, notamment dans les espaces montagneux d’Italie centrale.",
        "choices": [
          "Les Vikings de la mer du Nord.",
          "Les califes abbassides de Bagdad.",
          "Les armées napoléoniennes du XIXe siècle."
        ],
        "why": "Les Samnites obligent Rome à s’adapter.",
        "trap": "Imaginer une expansion automatique.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "concept",
        "q": "Que signifie intégrer pour dominer dans le cas romain ?",
        "a": "Traiter différemment les vaincus pour obtenir fidélité, soldats, ressources et contrôle durable.",
        "choices": [
          "Accorder immédiatement la même égalité politique à toute l’Italie.",
          "Détruire chaque cité vaincue pour éviter toute alliance.",
          "Refuser toute obligation militaire aux communautés italiennes."
        ],
        "why": "Rome varie les statuts au lieu d’uniformiser tout le monde.",
        "trap": "Confondre intégration et égalité.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "conséquence",
        "q": "Pourquoi cette conquête prépare-t-elle les guerres méditerranéennes ?",
        "a": "Elle donne à Rome une base italienne de soldats, ressources et alliés mobilisables.",
        "choices": [
          "Elle rend Rome définitivement pacifique.",
          "Elle supprime le besoin d’institutions politiques.",
          "Elle transforme immédiatement Rome en monarchie chrétienne."
        ],
        "why": "La profondeur italienne permet de tenir les conflits longs.",
        "trap": "Séparer conquête italienne et expansion impériale.",
        "evidence": "Bloc 5."
      },
      {
        "kind": "piège",
        "q": "Quel piège faut-il éviter ?",
        "a": "Croire que Rome domine l’Italie seulement par une supériorité militaire simple.",
        "choices": [
          "Chercher des alliances et des statuts dans l’explication.",
          "Situer la conquête avant les guerres puniques.",
          "Distinguer citoyens, alliés et cités dépendantes."
        ],
        "why": "La conquête romaine est aussi juridique et politique.",
        "trap": "Rendre Rome invincible par nature.",
        "evidence": "Deeper et synthèse."
      }
    ]
  },
  "rome-punic-wars": {
    "hook": "Les guerres puniques font passer Rome du rang de puissance italienne à celui de puissance méditerranéenne. Elles opposent Rome à Carthage, mais l’enjeu dépasse le duel : mer, îles, ressources, alliances, provinces et capacité à continuer une guerre longue.",
    "keyFacts": [
      "Quand : 264 → 146 av. J.-C.",
      "Où : Sicile, Méditerranée occidentale, Espagne, Italie, Afrique du Nord",
      "Acteurs : Rome, Carthage, Hannibal, Scipion, alliés italiens, populations provinciales",
      "Repères : Cannes en 216 av. J.-C. ; Zama en 202 ; destruction de Carthage en 146",
      "Piège : faire des guerres puniques seulement l’histoire d’Hannibal"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "Rome gagne parce qu’elle sait mobiliser longtemps, pas parce qu’elle remporte toutes les batailles."
      },
      {
        "label": "Preuve",
        "text": "Après Cannes, Rome subit une catastrophe mais continue la guerre, conserve des alliances et déplace le conflit."
      },
      {
        "label": "Conséquence",
        "text": "La victoire crée un empire méditerranéen, avec provinces, richesses, esclaves et tensions internes."
      }
    ],
    "express": [
      "Les guerres puniques opposent Rome et Carthage entre 264 et 146 av. J.-C. Elles commencent autour de la Sicile, espace stratégique entre Italie et Afrique du Nord, puis s’élargissent à l’Espagne, à l’Italie et à l’Afrique.",
      "La deuxième guerre punique est célèbre grâce à Hannibal, qui franchit les Alpes et écrase Rome à Cannes en 216 av. J.-C. Mais Hannibal ne suffit pas à expliquer l’ensemble : Rome perd des batailles, mais conserve assez d’alliés, de soldats et d’institutions pour continuer.",
      "En 146 av. J.-C., Carthage est détruite. Rome domine la Méditerranée occidentale, mais cette victoire transforme aussi Rome elle-même : provinces, butin, esclavage, grands généraux et inégalités nourrissent les crises de la République."
    ],
    "complete": [
      {
        "title": "1. Carthage et Rome, deux puissances",
        "text": "Carthage est une grande cité d’Afrique du Nord, héritière du monde phénicien, puissante par la mer, le commerce et ses possessions. Rome est d’abord une puissance italienne. Leur affrontement force Rome à apprendre la guerre navale et l’administration de territoires extérieurs."
      },
      {
        "title": "2. La Sicile comme verrou",
        "text": "La Sicile contrôle routes maritimes, ports et ressources agricoles. La première guerre punique oblige Rome à construire une flotte et à sortir de son cadre italien. C’est un changement d’échelle."
      },
      {
        "title": "3. Hannibal et la guerre d’usure",
        "text": "Hannibal remporte de grandes victoires grâce à sa mobilité et à sa tactique. Mais après Cannes, Rome ne capitule pas. Elle évite parfois l’affrontement direct, reconstitue des armées et attaque les bases carthaginoises ailleurs."
      },
      {
        "title": "4. Scipion et la bascule africaine",
        "text": "Le conflit se déplace en Espagne puis en Afrique. Scipion l’Africain bat Hannibal à Zama en 202 av. J.-C. Rome impose ensuite sa supériorité, mais laisse Carthage affaiblie avant la destruction finale de 146."
      },
      {
        "title": "5. Une victoire qui change Rome",
        "text": "Les guerres puniques donnent à Rome des provinces, des tributs, des terres, des esclaves et un prestige immense. Mais elles renforcent aussi les écarts sociaux et le pouvoir des généraux, préparant les tensions de la fin de la République."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Punique vient de Punicus, terme latin lié aux Phéniciens ; Carthage est une puissance issue de ce monde méditerranéen."
      },
      {
        "title": "Nuance",
        "text": "Cannes est une victoire éclatante d’Hannibal, mais une grande victoire tactique ne suffit pas toujours à gagner une guerre longue."
      },
      {
        "title": "Erreur fréquente",
        "text": "Transformer les guerres puniques en duel de héros entre Hannibal et Rome, en oubliant mer, ressources, alliances et provinces."
      }
    ],
    "quiz": [
      {
        "kind": "lieu",
        "q": "Pourquoi la Sicile est-elle importante dans la première guerre punique ?",
        "a": "Parce qu’elle contrôle des ports, routes maritimes et ressources entre l’Italie et l’Afrique du Nord.",
        "choices": [
          "Parce qu’elle est le centre politique du Sénat romain.",
          "Parce qu’elle est déjà une province chrétienne de l’Empire tardif.",
          "Parce qu’elle empêche Rome de construire des routes terrestres."
        ],
        "why": "La Sicile oblige Rome à changer d’échelle maritime.",
        "trap": "La voir comme un simple décor militaire.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "personnage",
        "q": "Pourquoi Hannibal ne suffit-il pas à expliquer les guerres puniques ?",
        "a": "Parce que l’enjeu inclut mer, alliances, ressources, provinces et capacité romaine à continuer la guerre.",
        "choices": [
          "Parce qu’Hannibal n’a jamais combattu Rome.",
          "Parce que Carthage est une cité grecque sans flotte.",
          "Parce que Rome gagne toutes les batailles sans difficulté."
        ],
        "why": "Une guerre longue ne se résume pas à un général brillant.",
        "trap": "Faire une biographie d’Hannibal au lieu d’une histoire impériale.",
        "evidence": "Express et deeper."
      },
      {
        "kind": "date",
        "q": "Que montre la bataille de Cannes en 216 av. J.-C. ?",
        "a": "Rome peut subir une défaite énorme sans s’effondrer immédiatement.",
        "choices": [
          "Rome détruit Carthage ce jour-là.",
          "La République romaine devient officiellement un empire.",
          "Hannibal est battu définitivement en Afrique."
        ],
        "why": "La capacité de mobilisation romaine est décisive.",
        "trap": "Croire qu’une bataille suffit toujours à finir une guerre.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "repère",
        "q": "Que se passe-t-il à Zama en 202 av. J.-C. ?",
        "a": "Scipion l’Africain bat Hannibal et fait basculer la deuxième guerre punique.",
        "choices": [
          "Romulus fonde Rome sur le Palatin.",
          "Carthage signe le traité de Verdun.",
          "Auguste reçoit le titre de princeps."
        ],
        "why": "Zama déplace l’avantage décisif vers Rome.",
        "trap": "Mélanger les repères romains célèbres.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "conséquence",
        "q": "Quel effet les guerres puniques ont-elles sur Rome ?",
        "a": "Elles renforcent Rome mais créent aussi provinces, richesses, esclavage et tensions sociales.",
        "choices": [
          "Elles ramènent Rome à un simple village du Latium.",
          "Elles suppriment les inégalités entre citoyens et esclaves.",
          "Elles interdisent toute expansion romaine hors d’Italie."
        ],
        "why": "La victoire impériale nourrit aussi la crise républicaine.",
        "trap": "Voir la conquête comme un bénéfice sans coût interne.",
        "evidence": "Bloc 5."
      }
    ]
  },
  "rome-republic-crisis": {
    "hook": "La République romaine ne s’effondre pas parce que les Romains auraient soudain oublié leurs institutions. Elle entre en crise parce que conquêtes, inégalités, armées personnelles et rivalités aristocratiques rendent les anciens équilibres intenables.",
    "keyFacts": [
      "Quand : surtout IIe → Ier siècle av. J.-C.",
      "Où : Rome, Italie, provinces méditerranéennes",
      "Acteurs : Sénat, plèbe, Gracques, Marius, Sylla, Pompée, César, soldats, alliés italiens",
      "Enjeux : terres, citoyenneté, armées, violences politiques, commandements provinciaux",
      "Piège : expliquer la crise uniquement par l’ambition de César"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "Les conquêtes enrichissent Rome mais déstabilisent la République par les inégalités, l’armée et la compétition politique."
      },
      {
        "label": "Mécanisme",
        "text": "Des généraux commandent longtemps des armées fidèles à leur personne, ce qui fragilise les institutions."
      },
      {
        "label": "Conséquence",
        "text": "La violence politique devient une manière de résoudre des conflits que les institutions ne contiennent plus."
      }
    ],
    "express": [
      "Aux IIe et Ier siècles av. J.-C., Rome domine un espace immense, mais la République souffre de ses succès. Les conquêtes apportent richesses, esclaves, provinces et prestige, tout en creusant les tensions sociales et politiques.",
      "Les conflits portent sur la terre, la citoyenneté italienne, le poids du Sénat, le rôle des tribuns, les commandements militaires et la fidélité des soldats. Les Gracques, Marius, Sylla, Pompée et César ne sont pas des accidents isolés : ils incarnent une crise structurelle.",
      "Le piège est de dire “César détruit la République” comme si tout dépendait d’un homme. César joue un rôle décisif, mais il arrive dans une République déjà fragilisée par les guerres civiles, les violences politiques et les armées personnelles."
    ],
    "complete": [
      {
        "title": "1. Une République enrichie par la conquête",
        "text": "Rome gagne des provinces, des butins, des esclaves et des commandements prestigieux. Cette richesse n’est pas répartie également. Les élites peuvent accroître leurs domaines et leur influence, tandis que des petits citoyens-soldats sont fragilisés."
      },
      {
        "title": "2. La question agraire",
        "text": "Les réformes des Gracques cherchent à répondre au problème des terres et de la pauvreté civique. Leur destin violent montre que les institutions républicaines ont de plus en plus de mal à arbitrer les conflits sociaux."
      },
      {
        "title": "3. L’armée et les fidélités personnelles",
        "text": "Les campagnes lointaines et les commandements prolongés donnent aux généraux un poids immense. Des soldats attendent solde, butin et terres de leur chef. La fidélité à Rome se mêle à la fidélité personnelle au général."
      },
      {
        "title": "4. Violence et guerres civiles",
        "text": "Sylla marche sur Rome, des proscriptions éliminent des adversaires, les rivalités entre grands hommes deviennent armées. La politique républicaine se militarise : les conflits ne restent plus confinés aux débats et aux votes."
      },
      {
        "title": "5. César dans une crise déjà avancée",
        "text": "César franchit le Rubicon en 49 av. J.-C. et ouvre une nouvelle guerre civile. Il accélère la fin de la République, mais il n’en est pas la seule cause. Son ascension est possible parce que les équilibres anciens sont déjà brisés."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Guerre civile : conflit armé entre membres d’une même communauté politique, ici des Romains contre des Romains."
      },
      {
        "title": "Nuance",
        "text": "La République garde longtemps ses mots et ses magistratures, mais les pratiques politiques changent en profondeur."
      },
      {
        "title": "Erreur fréquente",
        "text": "Réduire la crise à une lutte de personnalités : les structures sociales et militaires comptent autant que les ambitions individuelles."
      }
    ],
    "quiz": [
      {
        "kind": "cause",
        "q": "Pourquoi les conquêtes fragilisent-elles aussi la République ?",
        "a": "Parce qu’elles apportent richesses, provinces, esclaves et commandements qui creusent les tensions sociales et politiques.",
        "choices": [
          "Parce qu’elles font disparaître toutes les élites romaines.",
          "Parce qu’elles rendent le Sénat parfaitement égalitaire.",
          "Parce qu’elles empêchent tout général d’obtenir du prestige."
        ],
        "why": "Le succès extérieur produit des déséquilibres internes.",
        "trap": "Voir la conquête uniquement comme une réussite.",
        "evidence": "Express et bloc 1."
      },
      {
        "kind": "réforme",
        "q": "Que révèle la violence autour des Gracques ?",
        "a": "Les institutions républicaines peinent à arbitrer des conflits sociaux devenus explosifs.",
        "choices": [
          "La République romaine fonctionne sans conflit politique.",
          "Les Gracques imposent immédiatement un empire monarchique.",
          "La question des terres ne concerne jamais les citoyens."
        ],
        "why": "Les réformes agraires montrent une crise sociale et institutionnelle.",
        "trap": "Réduire l’épisode à deux biographies.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "armée",
        "q": "Pourquoi les armées personnelles sont-elles dangereuses pour la République ?",
        "a": "Parce que les soldats peuvent dépendre de leur général pour solde, butin, terres et carrière.",
        "choices": [
          "Parce que les soldats romains ne participent jamais aux guerres.",
          "Parce que les généraux n’ont aucun pouvoir hors de Rome.",
          "Parce que la République interdit toute campagne militaire."
        ],
        "why": "La fidélité militaire se personnalise.",
        "trap": "Penser que l’armée reste extérieure à la politique.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "événement",
        "q": "Que signifie la marche de Sylla sur Rome ?",
        "a": "La violence militaire entre dans la politique romaine au cœur même de la cité.",
        "choices": [
          "La conversion officielle de Rome au christianisme.",
          "La fin des guerres civiles par consensus.",
          "La fondation légendaire de Rome par les jumeaux."
        ],
        "why": "La guerre civile touche directement le centre politique.",
        "trap": "Ne voir Sylla que comme un nom de général.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Pourquoi César n’explique-t-il pas à lui seul la fin de la République ?",
        "a": "Parce qu’il arrive dans une République déjà fragilisée par inégalités, violences et armées personnelles.",
        "choices": [
          "Parce que César ne joue aucun rôle dans les guerres civiles.",
          "Parce que la République reste stable jusqu’au IIIe siècle ap. J.-C.",
          "Parce que tout commence seulement avec Auguste."
        ],
        "why": "César accélère une crise déjà profonde.",
        "trap": "Chercher un responsable unique.",
        "evidence": "Bloc 5."
      }
    ]
  },
  "rome-augustus-principate": {
    "hook": "Auguste ne dit pas “j’ai fondé une monarchie” : il prétend restaurer la République tout en concentrant les pouvoirs. C’est toute la finesse du principat.",
    "express": [
      "Après les guerres civiles, Octavien, devenu Auguste en 27 av. J.-C., installe un régime nouveau. Il conserve les mots et certaines institutions de la République, mais les pouvoirs essentiels se concentrent autour de lui.",
      "Le principat repose sur un équilibre subtil : le princeps se présente comme le premier des citoyens, protecteur de la paix, restaurateur des traditions et chef militaire. Cette mise en scène évite l’image détestée du roi.",
      "Le piège est de dire simplement “Auguste devient empereur”. Historiquement, le plus intéressant est la dissimulation institutionnelle : une monarchie de fait dans un décor républicain."
    ],
    "complete": [
      {
        "title": "1. Sortir des guerres civiles",
        "text": "La fin de la République est marquée par violences, proscriptions, rivalités de généraux et crises politiques. Auguste tire sa légitimité de la promesse d’ordre après des décennies d’instabilité."
      },
      {
        "title": "2. Garder les formes républicaines",
        "text": "Sénat, magistratures, titres et cérémonies ne disparaissent pas. Auguste évite de se présenter comme roi. Il préfère accumuler des pouvoirs, des honneurs et des autorités sous une apparence de continuité."
      },
      {
        "title": "3. Princeps, armée et provinces",
        "text": "Le contrôle des armées et de provinces stratégiques donne au prince une puissance décisive. La paix intérieure dépend largement d’une supériorité militaire canalisée par une figure centrale."
      },
      {
        "title": "4. La propagande de la paix",
        "text": "La Pax Augusta, les monuments, les monnaies, la poésie et les rites mettent en scène un retour de l’ordre. La paix n’est pas seulement un fait : c’est un récit politique fabriqué."
      },
      {
        "title": "5. Une invention durable",
        "text": "Le principat devient un modèle : concentrer le pouvoir tout en maintenant des formes anciennes. C’est une solution romaine à la crise républicaine, mais aussi une transformation profonde du régime."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Princeps signifie “premier”. Le terme permet d’éviter le mot roi tout en signalant une supériorité politique."
      },
      {
        "title": "Erreur fréquente",
        "text": "Imaginer un basculement brutal et assumé vers l’empire. Auguste avance par compromis, titres et légitimation progressive."
      },
      {
        "title": "Source visuelle",
        "text": "L’Ara Pacis ou les monnaies augustéennes montrent comment l’ordre, la famille, les dieux et la paix sont liés à l’image du prince."
      }
    ],
    "quiz": [
      {
        "q": "Pourquoi Auguste garde-t-il des formes républicaines ?",
        "a": "Pour légitimer son pouvoir et éviter l’image d’une royauté rejetée par la tradition romaine.",
        "why": "Le nouveau régime doit paraître acceptable après les guerres civiles.",
        "trap": "Croire que toutes les anciennes institutions disparaissent.",
        "evidence": "Le deuxième bloc."
      },
      {
        "q": "Que signifie princeps ?",
        "a": "Premier, c’est-à-dire premier citoyen plutôt que roi affiché.",
        "why": "Le vocabulaire sert la stratégie politique.",
        "trap": "Traduire directement par empereur au sens moderne.",
        "evidence": "Le cours."
      },
      {
        "q": "Quel pouvoir rend Auguste décisif ?",
        "a": "Le contrôle des armées et de provinces stratégiques.",
        "why": "La force militaire stabilise le régime.",
        "trap": "Ne voir que les titres honorifiques.",
        "evidence": "Le troisième bloc."
      },
      {
        "q": "Pourquoi la paix augustéenne est-elle aussi un récit ?",
        "a": "Parce qu’elle est mise en scène par monuments, monnaies, poésie et rites.",
        "why": "Le pouvoir a besoin d’images et de mots pour convaincre.",
        "trap": "Confondre propagande et simple décoration.",
        "evidence": "Le quatrième bloc."
      },
      {
        "q": "Quelle formule résume le principat ?",
        "a": "Une monarchie de fait dans un décor républicain.",
        "why": "C’est le cœur de la transformation augustéenne.",
        "trap": "Dire seulement “la République continue” ou “la monarchie apparaît d’un coup”.",
        "evidence": "L’express formule explicitement cette idée."
      }
    ]
  },
  "rome-christianity-late-empire": {
    "hook": "Le christianisme ne devient pas religion impériale par un simple déclic spirituel. Dans l’Empire tardif, il transforme les alliances politiques, les institutions, les villes, les conflits religieux et la manière de penser l’autorité.",
    "keyFacts": [
      "Quand : Ier → IVe siècles, puis Empire tardif",
      "Où : Empire romain, villes méditerranéennes, Orient et Occident",
      "Acteurs : communautés chrétiennes, évêques, empereurs, élites urbaines, païens, hérétiques désignés",
      "Repères : persécutions ponctuelles ; Constantin ; édit de Milan en 313 ; Théodose à la fin du IVe siècle",
      "Piège : croire que tout l’Empire devient chrétien instantanément"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "La christianisation de l’Empire est progressive, conflictuelle et politique autant que religieuse."
      },
      {
        "label": "Preuve",
        "text": "Édits, conciles, basiliques, inscriptions et rôle des évêques montrent l’entrée du christianisme dans l’espace public."
      },
      {
        "label": "Nuance",
        "text": "La conversion impériale ne signifie pas disparition immédiate des cultes anciens ni accord entre tous les chrétiens."
      }
    ],
    "express": [
      "Au départ, les chrétiens forment des communautés minoritaires dans l’Empire romain. Ils peuvent être tolérés, ignorés ou persécutés selon les périodes et les lieux. Il ne faut donc pas imaginer une persécution permanente et uniforme.",
      "Le tournant majeur est Constantin : après le début du IVe siècle, le christianisme obtient une reconnaissance impériale, des privilèges et une visibilité nouvelle. L’édit de Milan en 313 symbolise cette légalisation, même si l’évolution reste progressive.",
      "À la fin du IVe siècle, avec Théodose, le christianisme nicéen devient central dans l’ordre impérial. Mais la christianisation reste conflictuelle : débats théologiques, conciles, tensions avec les cultes anciens, rôle croissant des évêques et différences entre régions."
    ],
    "complete": [
      {
        "title": "1. Des communautés minoritaires",
        "text": "Les premiers chrétiens vivent dans un empire polythéiste où la religion est liée aux cités, aux familles, à l’empereur et aux rites publics. Ils ne forment pas un bloc social unique : on trouve des pauvres, des femmes, des artisans, mais aussi progressivement des élites."
      },
      {
        "title": "2. Des persécutions réelles mais discontinues",
        "text": "Certaines persécutions sont violentes, notamment quand l’État exige des gestes de loyauté religieuse. Mais elles ne sont pas permanentes dans tout l’Empire. Selon les empereurs, les provinces et les moments, la situation varie."
      },
      {
        "title": "3. Constantin et la légalisation",
        "text": "Constantin ne rend pas tout l’Empire chrétien en un jour. Il donne au christianisme un statut favorable, soutient l’Église, intervient dans les débats et associe progressivement pouvoir impérial et religion chrétienne."
      },
      {
        "title": "4. Évêques, conciles et débats",
        "text": "Les évêques deviennent des acteurs urbains majeurs. Les conciles cherchent à définir la doctrine, mais les désaccords montrent que le christianisme antique n’est pas uniforme. Le pouvoir impérial intervient souvent pour stabiliser l’unité religieuse."
      },
      {
        "title": "5. Une transformation de l’Empire",
        "text": "La christianisation change les monuments, les calendriers, les lois, les formes de charité, les conflits et la légitimité politique. Elle ne fait pas disparaître immédiatement l’Empire romain : elle participe à sa transformation tardive."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Concile : assemblée d’évêques réunie pour trancher des questions de doctrine, de discipline ou d’organisation de l’Église."
      },
      {
        "title": "Nuance",
        "text": "Le mot paganisme regroupe des cultes très variés ; il ne désigne pas une religion unique comparable à une Église centralisée."
      },
      {
        "title": "Erreur fréquente",
        "text": "Dire “Constantin convertit l’Empire” est trop rapide : il légalise, favorise et politise une évolution plus longue."
      }
    ],
    "quiz": [
      {
        "kind": "nuance",
        "q": "Pourquoi faut-il nuancer l’idée de persécution permanente ?",
        "a": "Parce que les persécutions chrétiennes sont réelles mais variables selon les périodes, lieux et empereurs.",
        "choices": [
          "Parce que les chrétiens gouvernent l’Empire dès le Ier siècle.",
          "Parce que Rome ignore toujours les questions religieuses.",
          "Parce que toutes les provinces suivent exactement la même politique."
        ],
        "why": "Le cours refuse l’idée d’une situation uniforme.",
        "trap": "Transformer toute l’histoire chrétienne antique en récit unique de persécution.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "repère",
        "q": "Que symbolise l’édit de Milan en 313 ?",
        "a": "La légalisation et la reconnaissance du christianisme dans l’Empire romain.",
        "choices": [
          "La destruction de Carthage par Rome.",
          "La fondation légendaire de Rome.",
          "La victoire d’Hannibal à Cannes."
        ],
        "why": "313 marque un tournant juridique et politique.",
        "trap": "Le confondre avec une conversion instantanée de tous les habitants.",
        "evidence": "Express et bloc 3."
      },
      {
        "kind": "acteur",
        "q": "Pourquoi les évêques deviennent-ils importants ?",
        "a": "Ils deviennent des acteurs urbains, religieux et politiques capables d’organiser des communautés et de peser dans les débats.",
        "choices": [
          "Ils remplacent immédiatement tous les magistrats romains.",
          "Ils commandent seuls toutes les légions de frontière.",
          "Ils abolissent les villes et les institutions."
        ],
        "why": "La christianisation transforme aussi le pouvoir local.",
        "trap": "Voir les évêques comme de simples prêtres sans poids social.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "concept",
        "q": "À quoi servent les conciles ?",
        "a": "À réunir des évêques pour trancher des questions de doctrine, discipline ou organisation de l’Église.",
        "choices": [
          "À élire les consuls de la République romaine.",
          "À organiser les courses de chars du cirque.",
          "À répartir les terres conquises aux vétérans."
        ],
        "why": "Les conciles montrent que l’unité doctrinale se construit.",
        "trap": "Imaginer un christianisme antique déjà totalement uniforme.",
        "evidence": "Deeper et bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Quelle idée retenir sur la christianisation de l’Empire ?",
        "a": "Elle est progressive, conflictuelle et transforme l’autorité impériale autant que la vie religieuse.",
        "choices": [
          "Elle se fait en une journée après Constantin.",
          "Elle met fin immédiatement à toutes les structures romaines.",
          "Elle ne concerne que des croyances privées sans effet politique."
        ],
        "why": "Le cours relie religion, institutions, villes et pouvoir.",
        "trap": "Séparer complètement croyance et politique.",
        "evidence": "Conclusion."
      }
    ]
  },
  "northern-viking-worlds-scandinavie": {
    "hook": "Avant les raids, la Scandinavie n’est pas un désert de guerriers. C’est un ensemble de sociétés rurales et maritimes : fermes, chefs locaux, assemblées, échanges, artisanat, esclavage et rivalités de prestige.",
    "keyFacts": [
      "Quand : surtout avant et autour de 700-800",
      "Où : Danemark, Norvège, Suède actuels, avec des régions très différentes",
      "Mode de vie : fermes, élevage, pêche, navigation, artisanat, commerce local",
      "Pouvoir : chefs, familles puissantes, assemblées, liens de fidélité",
      "Piège : croire que tout Scandinave est automatiquement un Viking"
    ],
    "expressLabels": [
      "Cadre",
      "Vie quotidienne",
      "Pouvoir",
      "À retenir"
    ],
    "express": [
      "Vers 700-800, la Scandinavie est surtout rurale : on vit dans des fermes, on cultive, on élève des animaux, on pêche, on coupe du bois, on fabrique des outils, des armes, des bijoux et des bateaux.",
      "La mer n’est pas une frontière : c’est une route. Les fjords, les côtes, les îles et la Baltique habituent les populations du Nord à naviguer, échanger, migrer et connaître des itinéraires lointains.",
      "Le pouvoir repose sur des chefs, des familles influentes, des alliances, des dons, des banquets et des fidélités. Un chef gagne du prestige en protégeant ses hommes, en redistribuant richesses et butin, et en réussissant des expéditions.",
      "À retenir : les raids vikings naissent dans des sociétés déjà organisées, rurales et maritimes, où navigation, prestige, commerce et compétition politique sont essentiels."
    ],
    "complete": [
      {
        "title": "1. Une région, pas un royaume unique",
        "text": "La Scandinavie du VIIIe siècle correspond grossièrement au Danemark, à la Norvège et à la Suède actuels, mais il ne faut pas imaginer un pays unifié. Les paysages sont très différents : plaines danoises, fjords norvégiens, forêts, lacs et côtes de la Baltique. Les pouvoirs sont locaux ou régionaux. Des rois existent parfois, mais leur autorité n’est pas comparable à celle d’un État moderne. Beaucoup de décisions passent par des chefs, des familles puissantes, des assemblées et des réseaux de fidélité."
      },
      {
        "title": "2. Fermes, familles et travail",
        "text": "La base de la vie quotidienne est la ferme. On y cultive des céréales adaptées au climat, on élève des bovins, des moutons, des porcs ou des chevaux, on produit du textile, on entretient les bâtiments et les outils. Les maisons longues rassemblent hommes, femmes, enfants, dépendants et parfois esclaves. La richesse ne se mesure pas seulement en monnaie : terres, bétail, armes, bijoux, navires, alliances matrimoniales et réputation comptent énormément."
      },
      {
        "title": "3. La mer comme route ordinaire",
        "text": "Pour les Scandinaves, la mer n’est pas seulement l’espace du danger. Elle permet de relier des communautés séparées par les fjords, les îles et les côtes. Savoir construire, réparer et manœuvrer un bateau est donc un avantage majeur. Cette familiarité maritime explique pourquoi certains groupes pourront ensuite mener des raids lointains, commercer vers la Baltique ou coloniser l’Atlantique Nord. Le raid n’invente pas la mobilité : il l’utilise dans un contexte plus violent et plus rentable."
      },
      {
        "title": "4. Chefs, dons et prestige",
        "text": "Un chef doit attirer des hommes. Pour cela, il protège, organise des expéditions, arbitre des conflits, donne des armes, des bijoux ou de l’argent, et célèbre des banquets. Le prestige est politique : un chef généreux et victorieux gagne des soutiens ; un chef pauvre ou incapable les perd. Les raids peuvent donc servir à obtenir des richesses à redistribuer. Cette logique aide à comprendre pourquoi des expéditions risquées deviennent attirantes pour certains jeunes hommes ou groupes armés."
      },
      {
        "title": "5. Commerce et artisanat avant les grandes attaques",
        "text": "Des places d’échange comme Ribe ou Birka montrent qu’il existe des réseaux commerciaux avant et pendant l’âge viking. On y trouve artisans, poids, monnaies, objets importés, peignes, perles, métal travaillé et produits venus de loin. Cela rappelle que les Scandinaves ne vivent pas isolés. Ils connaissent déjà des circuits d’échange qui facilitent ensuite la circulation des hommes, des objets et des informations."
      },
      {
        "title": "6. Esclavage et hiérarchies sociales",
        "text": "La société scandinave n’est pas égalitaire. Elle comprend des libres, des dépendants et des esclaves. Les captifs pris lors de raids peuvent alimenter ce système ou être vendus. Cette dimension est importante parce qu’elle évite une image romantique. Les Vikings ne sont pas seulement des aventuriers de série : leurs sociétés reposent aussi sur la domination, la violence, les statuts juridiques inégaux et la captation de richesses."
      },
      {
        "title": "7. Synthèse",
        "text": "Comprendre la Scandinavie avant les raids permet d’éviter deux erreurs. Première erreur : imaginer des barbares sans organisation. Deuxième erreur : idéaliser des navigateurs libres et pacifiques. Le vrai cadre est plus intéressant : des sociétés rurales, maritimes, hiérarchisées, capables d’échanger, de combattre, de migrer et de transformer la richesse en prestige politique."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Thing : assemblée locale où des hommes libres peuvent traiter de justice, d’accords et de conflits selon les régions."
      },
      {
        "title": "Lieu utile",
        "text": "Birka, en Suède, est un exemple important de place d’échange de l’âge viking."
      },
      {
        "title": "Erreur fréquente",
        "text": "Dire “les Vikings vivaient de pillage” oublie que la majorité de la vie se déroule dans des fermes et des réseaux locaux."
      }
    ],
    "quiz": [
      {
        "q": "Quelle est la base principale de la vie quotidienne en Scandinavie vers 700-800 ?",
        "a": "La ferme, avec agriculture, élevage, artisanat domestique et liens familiaux.",
        "choices": [
          "La grande ville industrielle organisée autour d’usines royales.",
          "Le camp militaire permanent sans agriculture ni familles.",
          "Le monastère chrétien qui contrôle toute la société scandinave."
        ],
        "why": "La vie quotidienne explique le cadre d’où partent certains raiders.",
        "trap": "Réduire toute la société au raid.",
        "evidence": "Blocs 1 et 2."
      },
      {
        "q": "Pourquoi la mer est-elle centrale avant même les raids ?",
        "a": "Parce qu’elle relie fjords, côtes, îles et routes d’échange, et habitue à la navigation.",
        "choices": [
          "Parce qu’elle isole totalement les Scandinaves du reste de l’Europe.",
          "Parce qu’elle empêche tout commerce avant le XIe siècle.",
          "Parce qu’elle remplace toutes les routes terrestres de Scandinavie."
        ],
        "why": "La mobilité maritime précède les grandes expéditions.",
        "trap": "Croire que les raids apparaissent sans savoir-faire préalable.",
        "evidence": "Bloc 3."
      },
      {
        "q": "Comment un chef local peut-il renforcer son prestige ?",
        "a": "En protégeant ses hommes, en redistribuant richesses et dons, et en réussissant des expéditions.",
        "choices": [
          "En refusant tout don pour éviter de créer des fidélités.",
          "En supprimant les alliances familiales et les banquets.",
          "En dépendant uniquement d’une bureaucratie écrite centralisée."
        ],
        "why": "Le prestige est une clé du pouvoir local.",
        "trap": "Penser le pouvoir uniquement comme un poste administratif.",
        "evidence": "Bloc 4."
      },
      {
        "q": "Que montrent des lieux comme Ribe ou Birka ?",
        "a": "L’existence de places d’échange, d’artisanat et de connexions commerciales avant et pendant l’âge viking.",
        "choices": [
          "L’absence complète d’artisanat en Scandinavie.",
          "La domination directe de Rome sur la Baltique au IXe siècle.",
          "La disparition de toute navigation avant les raids."
        ],
        "why": "Les réseaux commerciaux sont déjà importants.",
        "trap": "Imaginer une Scandinavie fermée sur elle-même.",
        "evidence": "Bloc 5."
      },
      {
        "q": "Quelle nuance sociale faut-il garder ?",
        "a": "La société comprend libres, dépendants et esclaves ; elle est hiérarchisée et parfois violente.",
        "choices": [
          "Tous les habitants ont exactement le même statut et les mêmes droits.",
          "Les esclaves n’existent pas dans le monde scandinave.",
          "La richesse ne joue aucun rôle dans les relations sociales."
        ],
        "why": "Le mode de vie ne doit pas être romantisé.",
        "trap": "Transformer les Vikings en aventuriers sympathiques hors société.",
        "evidence": "Bloc 6."
      }
    ]
  },
  "northern-viking-worlds-raids-vikings": {
    "hook": "À partir de 793, des groupes venus de Scandinavie frappent des côtes, des monastères et des villes d’Europe. Les raids vikings ne sont pas un folklore de casques et de haches : c’est un phénomène daté, organisé autour de bateaux rapides, de chefs de guerre, d’argent, de captifs et de routes maritimes.",
    "keyFacts": [
      "Quand : 793 est la date symbolique du raid de Lindisfarne ; le phénomène s’étend surtout du VIIIe au XIe siècle",
      "Où : Scandinavie au départ ; îles Britanniques, monde franc, mer du Nord, Atlantique et grands fleuves européens",
      "Qui : des équipages scandinaves menés par des chefs, pas toute la population du Nord",
      "Ce qu’ils cherchent : butin, argent, captifs, prestige, terres, tributs et parfois postes de pouvoir",
      "Piège : remplacer le cliché du barbare par le cliché inverse du commerçant pacifique"
    ],
    "takeaways": [
      {
        "label": "Définition",
        "text": "Un raid viking est une expédition armée, souvent maritime ou fluviale, menée par des Scandinaves pour obtenir butin, captifs, tribut ou prestige."
      },
      {
        "label": "Date",
        "text": "793, attaque du monastère de Lindisfarne, sert de repère symbolique au début de l’âge viking en Occident."
      },
      {
        "label": "Nuance",
        "text": "Les raids sont bien violents, mais ils s’inscrivent dans un monde plus large : commerce, colonisation, alliances, conversion et création de pouvoirs."
      }
    ],
    "expressLabels": [
      "Repère clair",
      "Ce qui se passe",
      "Exemple concret",
      "À retenir"
    ],
    "express": [
      "Les raids vikings commencent dans les sources occidentales avec un choc célèbre : en 793, le monastère de Lindisfarne, sur la côte nord-est de l’Angleterre, est attaqué. Pour des moines chrétiens, voir un lieu sacré pillé par des païens venus de la mer est un traumatisme énorme.",
      "Ces attaques ne sont pas des sorties désordonnées de “barbares”. Des chefs réunissent des équipages, utilisent des bateaux capables d’arriver vite puis de repartir, ciblent des lieux riches ou mal défendus, prennent de l’argent, des objets précieux, des captifs, et parfois imposent un tribut pour ne pas revenir.",
      "Au IXe siècle, les raids touchent les îles Britanniques, l’Irlande, les côtes franques et les fleuves comme la Seine ou la Loire. Paris est assiégée en 845 puis en 885-886. Certains groupes ne font plus que passer : ils hivernent, négocient, s’installent et finissent par entrer dans les jeux politiques locaux.",
      "La phrase à retenir : les raids vikings sont une violence réelle et organisée, mais ils ouvrent aussi sur une histoire plus large de mobilité scandinave, de commerce, de colonisation et de transformation politique de l’Europe du Nord."
    ],
    "complete": [
      {
        "title": "1. Situer les Vikings avant de raconter les raids",
        "text": "L’âge viking se place surtout entre la fin du VIIIe siècle et le XIe siècle. Le point de départ symbolique est le raid de Lindisfarne en 793, parce qu’il marque les chroniqueurs chrétiens d’Angleterre. Mais les hommes qui mènent ces expéditions ne sortent pas de nulle part. Ils viennent de sociétés scandinaves du Danemark, de Norvège et de Suède actuels, avec des chefs locaux, des paysans libres, des dépendants, des artisans, des marchands, des esclaves et des familles puissantes. Tous les Scandinaves ne partent pas en raid : beaucoup cultivent, pêchent, élèvent, commercent ou vivent dans des fermes. Le raid est une activité menée par certains groupes, à certains moments, dans un contexte de compétition et de recherche de richesse."
      },
      {
        "title": "2. Pourquoi les monastères sont des cibles",
        "text": "Les premiers récits occidentaux insistent sur les monastères, et ce n’est pas un hasard. Un monastère peut conserver des objets liturgiques précieux, des manuscrits, des réserves alimentaires et parfois de l’argent. Il est souvent situé sur une côte ou une île, donc accessible par bateau, et il n’est pas forcément défendu comme une forteresse. Pour les moines, l’attaque est scandaleuse parce qu’elle frappe un lieu sacré ; pour des raiders, c’est une cible riche et vulnérable. Cette différence de regard est essentielle : la source chrétienne voit une profanation, l’historien voit aussi une logique de cible, de transport, de risque et de gain."
      },
      {
        "title": "3. Le bateau comme arme stratégique",
        "text": "La force des raiders tient beaucoup aux navires. Les bateaux scandinaves sont légers, rapides, maniables, capables de naviguer en mer et de remonter certains fleuves. Ils permettent de choisir le lieu et le moment de l’attaque. Une flotte peut arriver brusquement, débarquer, piller, prendre des captifs, puis repartir avant qu’une armée locale ne se rassemble. Ce n’est pas une supériorité magique : c’est une combinaison de technique navale, d’expérience maritime, de renseignement, de mobilité et d’opportunisme. Les fleuves transforment l’intérieur des royaumes en espaces atteignables, ce qui inquiète fortement les pouvoirs francs ou anglo-saxons."
      },
      {
        "title": "4. Ce que les raids rapportent",
        "text": "Le butin n’est pas seulement constitué de bijoux spectaculaires. Les raiders cherchent de l’argent, des armes, du métal, des vêtements, du bétail, de la nourriture et des captifs. Les captifs peuvent être rançonnés, intégrés comme dépendants ou vendus comme esclaves dans des réseaux commerciaux. Les tributs comptent aussi : certains pouvoirs préfèrent payer pour éviter une attaque ou obtenir le départ d’une armée. Dans le monde franc, on parle souvent de paiements très lourds. Cela montre que le raid n’est pas seulement un acte de destruction : c’est aussi une forme de pression économique et politique."
      },
      {
        "title": "5. De petites bandes aux grandes armées",
        "text": "Au début, on imagine souvent des expéditions ponctuelles. Mais au IXe siècle, certaines forces deviennent plus importantes, restent plus longtemps et hivernent sur place. En Angleterre, la “Grande Armée” viking arrive en 865 et bouleverse plusieurs royaumes anglo-saxons. On ne parle plus seulement de coups de main côtiers : des groupes s’installent, contrôlent des terres, prélèvent des richesses et participent à la recomposition du pouvoir. C’est là que l’histoire des raids bascule vers l’histoire de la colonisation et des royaumes."
      },
      {
        "title": "6. Paris, la Seine et la réaction des pouvoirs",
        "text": "Les raids touchent aussi le monde franc. En 845, une flotte remonte la Seine et attaque Paris ; en 885-886, un autre siège marque les mémoires. Ces épisodes montrent la vulnérabilité des fleuves et la difficulté des rois à protéger tout le territoire. Les réponses varient : fortifications, ponts, armées locales, négociations, tributs, concessions de terres. La naissance de la Normandie au début du Xe siècle s’inscrit dans ce contexte : des chefs scandinaves peuvent être intégrés à un ordre politique chrétien et franc pour contrôler une zone plutôt que de rester des ennemis extérieurs."
      },
      {
        "title": "7. Les sources : peur chrétienne et traces matérielles",
        "text": "Une grande partie de notre image vient des chroniques chrétiennes, écrites par des sociétés qui subissent les raids. Elles sont indispensables pour dater les attaques, comprendre la peur et suivre les réactions politiques. Mais elles ne suffisent pas. L’archéologie ajoute d’autres traces : tombes, armes, bateaux, habitats, monnaies, poids de commerce, objets importés. Ces éléments montrent que les mêmes mondes scandinaves font aussi du commerce, circulent vers l’Est, fondent des ports et s’installent. Pour comprendre les Vikings, il faut donc tenir ensemble des textes de victimes et des traces plus variées."
      },
      {
        "title": "8. Pourquoi les raids déclinent",
        "text": "À partir du Xe et du XIe siècle, le monde change. Les royaumes européens se fortifient mieux, les pouvoirs scandinaves se structurent, des rois se convertissent au christianisme, et certains groupes sont déjà installés en Angleterre, en Normandie, en Irlande ou dans l’Atlantique Nord. Le raid ne disparaît pas d’un coup, mais il devient moins central. Quand les chefs du Nord deviennent eux-mêmes rois chrétiens, bâtisseurs d’États et acteurs diplomatiques, le modèle de l’expédition païenne extérieure perd une partie de son sens."
      },
      {
        "title": "9. Synthèse",
        "text": "Les raids vikings ne doivent pas être adoucis : ils sont violents, traumatisants et parfois dévastateurs. Mais ils ne doivent pas non plus être isolés du reste. Ils reposent sur des sociétés scandinaves, des bateaux, des chefs, des réseaux de commerce, des captifs, des tributs et des opportunités politiques. Ce cours sert donc à retenir une idée solide : le raid est la porte d’entrée la plus spectaculaire de l’âge viking, mais pas toute l’histoire des Vikings."
      }
    ],
    "deeper": [
      {
        "title": "Date à connaître",
        "text": "793 : attaque de Lindisfarne. 865 : arrivée de la Grande Armée en Angleterre. 885-886 : siège de Paris. 911 environ : accord autour de Rollon en Normandie."
      },
      {
        "title": "Repère",
        "text": "Tribut : paiement imposé ou négocié pour obtenir la paix, le départ d’une armée ou la protection d’un chef armé."
      },
      {
        "title": "Erreur fréquente",
        "text": "Dire seulement “ce n’étaient pas que des pillards” est trop pauvre. Il faut préciser : raids, captifs, tributs, bateaux, installation, commerce et intégration politique."
      }
    ],
    "quiz": [
      {
        "kind": "date",
        "q": "Pourquoi 793 est-elle une date repère dans l’histoire viking ?",
        "a": "Parce que le raid contre le monastère de Lindisfarne marque fortement les sources chrétiennes occidentales.",
        "choices": [
          "Parce que c’est la date de la fondation de la Normandie par Rollon.",
          "Parce que c’est l’année où les royaumes scandinaves deviennent officiellement chrétiens.",
          "Parce que c’est la fin de la Grande Armée viking en Angleterre."
        ],
        "why": "La date est symbolique : elle vient surtout de l’impact du raid dans les sources anglaises.",
        "trap": "Croire que 793 serait le début absolu de toute activité scandinave maritime.",
        "evidence": "Bloc 1 et Express 1."
      },
      {
        "kind": "mécanisme",
        "q": "Pourquoi les monastères sont-ils souvent visés par les premiers raids ?",
        "a": "Parce qu’ils peuvent être riches, accessibles par mer et moins défendus qu’une forteresse.",
        "choices": [
          "Parce qu’ils commandent directement toutes les armées royales d’Angleterre.",
          "Parce qu’ils sont toujours situés au centre de grandes capitales fortifiées.",
          "Parce qu’ils interdisent tout commerce avec les Scandinaves."
        ],
        "why": "La cible combine valeur symbolique, richesse et vulnérabilité.",
        "trap": "Répondre uniquement par la religion sans expliquer l’intérêt matériel et stratégique.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "technique",
        "q": "Quel avantage les bateaux donnent-ils aux raiders ?",
        "a": "Ils permettent d’arriver vite par mer ou par fleuve, de choisir la cible et de repartir avant une réaction organisée.",
        "choices": [
          "Ils servent surtout à transporter de lourdes murailles de siège permanentes.",
          "Ils rendent inutiles les alliances, le renseignement et les négociations.",
          "Ils limitent les raids aux ports scandinaves sans atteindre l’Europe occidentale."
        ],
        "why": "La mobilité explique une partie de l’efficacité des raids.",
        "trap": "Transformer le bateau en objet magique au lieu de comprendre son usage stratégique.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "économie",
        "q": "Que peuvent chercher les raiders en dehors des objets précieux ?",
        "a": "Des captifs, du bétail, de la nourriture, de l’argent, des armes et des tributs.",
        "choices": [
          "Uniquement des manuscrits pour créer des bibliothèques royales en Scandinavie.",
          "Seulement des terres agricoles déjà distribuées par les rois francs.",
          "Principalement des reliques pour devenir des évêques locaux."
        ],
        "why": "Le raid est aussi une opération économique et politique.",
        "trap": "Imaginer uniquement un pillage de trésors décoratifs.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Quelle phrase résume le mieux ce cours ?",
        "a": "Les raids vikings sont une violence réelle, mais liée aux bateaux, aux captifs, aux tributs, au commerce et parfois à l’installation.",
        "choices": [
          "Les raids vikings sont seulement une invention des chroniqueurs chrétiens.",
          "Les Vikings sont uniquement des marchands pacifiques mal compris par leurs voisins.",
          "Les raids disparaissent dès que les premiers monastères sont attaqués."
        ],
        "why": "La synthèse garde la violence sans réduire tout le phénomène à elle.",
        "trap": "Remplacer un cliché par son contraire.",
        "evidence": "Conclusion et Express 4."
      }
    ]
  },
  "northern-viking-worlds-navires-vikings": {
    "hook": "Les navires longs ne sont pas un détail décoratif : ils expliquent une partie de la puissance viking. Ils permettent d’attaquer, commercer, explorer, transporter des hommes et remonter les fleuves.",
    "keyFacts": [
      "Période : VIIIe-XIe siècle",
      "Objet central : navire long, léger, maniable, voile et avirons",
      "Usage : raids, transport, commerce, prestige, exploration",
      "Atout : passer de la mer aux fleuves et débarquer vite",
      "Piège : croire qu’un bateau suffit à tout expliquer"
    ],
    "expressLabels": [
      "Objet",
      "Fonction",
      "Conséquence",
      "À retenir"
    ],
    "express": [
      "Le navire long est l’un des grands outils de l’âge viking : coque souple, faible tirant d’eau, voile, avirons, vitesse et capacité à débarquer rapidement.",
      "Il sert à plusieurs choses : transporter un équipage armé, rejoindre une côte, remonter un fleuve, commercer, explorer ou montrer le prestige d’un chef.",
      "Grâce à ces bateaux, des zones qui semblaient protégées deviennent accessibles : monastères côtiers, villes fluviales, routes de la Baltique, Atlantique Nord.",
      "À retenir : le navire n’explique pas les Vikings à lui seul, mais sans lui les raids, le commerce lointain et la colonisation atlantique changent complètement d’échelle."
    ],
    "complete": [
      {
        "title": "1. Un outil technique et politique",
        "text": "Le navire long n’est pas seulement une belle image. C’est un outil technique qui donne de la mobilité, mais aussi un objet de prestige. Construire et entretenir un bateau demande du bois, du savoir-faire, des artisans, du temps et une organisation collective. Posséder ou commander un navire signifie donc disposer de ressources et d’hommes."
      },
      {
        "title": "2. Mer et fleuves",
        "text": "Le faible tirant d’eau permet à certains navires d’approcher les côtes, de débarquer sur des plages et de remonter des rivières. Cette capacité change la géographie militaire : une flotte peut menacer non seulement les ports, mais aussi des villes et monastères situés à l’intérieur des terres."
      },
      {
        "title": "3. Voile et avirons",
        "text": "La voile donne de la vitesse sur de longues distances ; les avirons permettent de manœuvrer quand le vent manque, dans les fjords, près des côtes ou sur les fleuves. Cette combinaison donne de la souplesse. Les équipages ne dépendent pas d’un seul mode de propulsion."
      },
      {
        "title": "4. Bateau de raid, bateau de commerce",
        "text": "Il ne faut pas séparer trop fortement guerre et échange. Les Scandinaves utilisent différents types de bateaux, et la même culture maritime permet le raid, le commerce, le transport de biens, l’exploration et parfois la migration. Les ports et les routes maritimes relient donc violence et économie."
      },
      {
        "title": "5. La preuve archéologique",
        "text": "Des découvertes comme les navires d’Oseberg, de Gokstad ou de Skuldelev montrent la qualité de la construction navale scandinave. Elles permettent d’étudier la forme des coques, les assemblages, les usages et parfois la dimension funéraire ou symbolique du bateau."
      },
      {
        "title": "6. Synthèse",
        "text": "Le navire long transforme les possibilités d’action : arriver vite, frapper, repartir, commercer loin, explorer, coloniser. Mais il ne faut pas oublier les hommes, les chefs, les ressources et les décisions politiques. Un bateau ouvre des possibilités ; une société les utilise."
      }
    ],
    "deeper": [
      {
        "title": "Exemples",
        "text": "Oseberg et Gokstad en Norvège, Skuldelev au Danemark, sont des découvertes majeures pour comprendre les bateaux vikings."
      },
      {
        "title": "Repère",
        "text": "Tirant d’eau : profondeur nécessaire à un bateau pour flotter. Un faible tirant d’eau facilite l’accès aux eaux peu profondes."
      },
      {
        "title": "Erreur fréquente",
        "text": "Dire “drakkar” pour tous les bateaux vikings. Le mot est courant en français, mais les types de navires sont plus variés."
      }
    ],
    "quiz": [
      {
        "q": "Quel avantage donne le faible tirant d’eau ?",
        "a": "Il permet d’approcher les côtes, de débarquer facilement et de remonter certains fleuves.",
        "choices": [
          "Il empêche totalement la navigation en rivière.",
          "Il oblige le bateau à rester dans les ports profonds.",
          "Il sert uniquement à transporter des pierres de construction."
        ],
        "why": "C’est un avantage stratégique concret.",
        "trap": "Employer “rapide” sans expliquer pourquoi cela change les attaques.",
        "evidence": "Bloc 2."
      },
      {
        "q": "Pourquoi la combinaison voile-avirons est-elle utile ?",
        "a": "Elle donne de la souplesse selon le vent, les côtes, les fjords et les fleuves.",
        "choices": [
          "Elle rend le navire dépendant d’un seul mode de propulsion.",
          "Elle empêche les manœuvres près des côtes.",
          "Elle interdit les longs trajets en mer."
        ],
        "why": "Le navire peut s’adapter aux situations.",
        "trap": "Croire que la voile suffit toujours.",
        "evidence": "Bloc 3."
      },
      {
        "q": "Pourquoi le navire est-il aussi un objet de prestige ?",
        "a": "Parce qu’il demande ressources, artisans, équipage et capacité d’organisation.",
        "choices": [
          "Parce qu’il est fabriqué gratuitement par chaque famille isolée.",
          "Parce qu’il n’a aucune utilité militaire ni économique.",
          "Parce qu’il appartient toujours à un monastère anglais."
        ],
        "why": "Le bateau signale aussi le pouvoir d’un chef.",
        "trap": "Voir le navire comme simple outil neutre.",
        "evidence": "Bloc 1."
      },
      {
        "q": "Que montrent Oseberg, Gokstad ou Skuldelev ?",
        "a": "Des preuves archéologiques de la qualité et de la diversité des constructions navales scandinaves.",
        "choices": [
          "Des traités de paix entre Charlemagne et les rois de Norvège.",
          "Des capitales urbaines entièrement construites sur des navires.",
          "Des preuves que les Scandinaves ne naviguaient pas."
        ],
        "why": "Ces découvertes matérialisent le sujet.",
        "trap": "Rester seulement dans l’image du bateau sans preuve.",
        "evidence": "Bloc 5."
      },
      {
        "q": "Quelle synthèse est correcte ?",
        "a": "Le navire ouvre des possibilités de raid, commerce et colonisation, mais il n’explique pas tout sans les sociétés qui l’utilisent.",
        "choices": [
          "Le navire suffit à expliquer toute l’histoire politique européenne.",
          "Les raids vikings se comprennent sans mobilité maritime.",
          "Les bateaux vikings servent uniquement aux funérailles."
        ],
        "why": "Technique et société doivent être liées.",
        "trap": "Faire une explication monocausale.",
        "evidence": "Synthèse."
      }
    ]
  },
  "northern-viking-worlds-colonisation-atlantique": {
    "hook": "Les Vikings ne se contentent pas de piller : certains partent vivre ailleurs. Islande, Groenland et Vinland montrent une autre histoire : migration, fermes, adaptation au climat, conflits et limites de la colonisation nordique.",
    "keyFacts": [
      "Islande : colonisation surtout à partir de la fin du IXe siècle",
      "Groenland : installation nordique à partir de la fin du Xe siècle",
      "Vinland : présence nordique brève en Amérique du Nord vers l’an 1000",
      "Acteurs : familles, chefs, colons, esclaves, équipages, populations autochtones",
      "Piège : raconter cela comme une simple aventure héroïque"
    ],
    "expressLabels": [
      "Où",
      "Comment",
      "Limites",
      "À retenir"
    ],
    "express": [
      "La colonisation atlantique conduit des Scandinaves vers les îles Féroé, l’Islande, le Groenland et même l’Amérique du Nord, appelée Vinland dans les sagas.",
      "Il ne s’agit pas seulement d’exploration : des familles s’installent, créent des fermes, amènent animaux et dépendants, organisent des assemblées, exploitent les ressources locales et gardent des liens avec l’Europe du Nord.",
      "Ces colonies sont fragiles. Le climat, l’éloignement, les conflits, les ressources limitées et les relations avec les populations autochtones pèsent fortement, surtout au Groenland et au Vinland.",
      "À retenir : la colonisation atlantique montre les Vikings comme migrants et colons, pas seulement comme raiders, mais elle révèle aussi les limites matérielles d’une expansion."
    ],
    "complete": [
      {
        "title": "1. Partir vers l’Ouest",
        "text": "À partir de la fin du IXe siècle, des Scandinaves s’installent dans l’Atlantique Nord. L’Islande devient un espace majeur de colonisation. Plus tard, des groupes gagnent le Groenland, puis atteignent brièvement l’Amérique du Nord. Ces mouvements supposent des bateaux, des connaissances de navigation, des réseaux familiaux, des animaux transportés et une capacité à survivre dans des milieux difficiles."
      },
      {
        "title": "2. L’Islande : une société de colons",
        "text": "L’Islande n’est pas seulement une escale. Des familles s’y établissent, exploitent les terres, créent des fermes et développent des institutions comme l’Althing, assemblée célèbre de l’île. La société islandaise conserve des liens culturels avec la Scandinavie tout en produisant une mémoire particulière, notamment les sagas rédigées plus tard."
      },
      {
        "title": "3. Le Groenland : installation et fragilité",
        "text": "La colonie nordique du Groenland est associée à Erik le Rouge à la fin du Xe siècle. Les colons y pratiquent l’élevage, chassent, commercent et dépendent de liens avec l’Europe. Mais l’environnement est rude. Le climat, l’isolement, les ressources disponibles et l’évolution des échanges rendent cette présence vulnérable sur la longue durée."
      },
      {
        "title": "4. Vinland : l’Amérique avant Colomb",
        "text": "Vers l’an 1000, des Scandinaves atteignent l’Amérique du Nord. Le site de L’Anse aux Meadows, à Terre-Neuve, donne une preuve archéologique forte de cette présence. Mais il ne s’agit pas d’un empire durable : la présence est limitée, probablement liée à l’exploration, aux ressources et aux contacts parfois tendus avec les populations autochtones."
      },
      {
        "title": "5. Coloniser, ce n’est pas seulement découvrir",
        "text": "Dire “les Vikings ont découvert l’Amérique” est insuffisant. Ce qui compte historiquement, c’est la différence entre atteindre un lieu, l’explorer, l’exploiter ponctuellement et y construire une société durable. L’Atlantique Nord montre toutes ces situations : installation solide en Islande, présence longue mais fragile au Groenland, tentative brève en Vinland."
      },
      {
        "title": "6. Synthèse",
        "text": "La colonisation atlantique élargit l’image des Vikings. Elle parle de familles, de fermes, de droit, d’adaptation écologique, de mémoire et de contacts interculturels. C’est moins spectaculaire qu’un raid, mais beaucoup plus riche pour comprendre la mobilité scandinave."
      }
    ],
    "deeper": [
      {
        "title": "Lieu à connaître",
        "text": "L’Anse aux Meadows, à Terre-Neuve, est le grand site archéologique attestant une présence nordique en Amérique du Nord."
      },
      {
        "title": "Repère",
        "text": "Saga : récit islandais médiéval, rédigé plus tard que les événements qu’il raconte ; utile, mais à croiser avec l’archéologie."
      },
      {
        "title": "Erreur fréquente",
        "text": "Transformer Vinland en conquête massive. La présence nordique en Amérique est réelle mais limitée."
      }
    ],
    "quiz": [
      {
        "q": "Quelle différence faut-il faire pour comprendre Vinland ?",
        "a": "Distinguer atteindre un lieu, l’explorer, l’exploiter et y créer une colonie durable.",
        "choices": [
          "Dire que tout voyage maritime devient automatiquement un empire.",
          "Confondre Vinland avec la conquête espagnole du XVIe siècle.",
          "Supposer que l’absence de grandes villes annule toute présence nordique."
        ],
        "why": "Cette distinction évite l’effet “découverte” trop vague.",
        "trap": "Transformer une présence réelle mais limitée en conquête massive.",
        "evidence": "Bloc 5."
      },
      {
        "q": "Pourquoi l’Islande est-elle importante ?",
        "a": "Parce qu’elle devient une société de colons avec fermes, institutions et mémoire propre.",
        "choices": [
          "Parce qu’elle reste seulement une base militaire sans habitants durables.",
          "Parce qu’elle est le centre de l’empire byzantin au XIe siècle.",
          "Parce qu’elle interdit toute assemblée locale."
        ],
        "why": "L’Islande montre l’installation, pas seulement le passage.",
        "trap": "Raconter uniquement des explorateurs isolés.",
        "evidence": "Bloc 2."
      },
      {
        "q": "Quel facteur rend la colonie du Groenland fragile ?",
        "a": "L’environnement rude, l’isolement, les ressources limitées et la dépendance aux échanges.",
        "choices": [
          "La proximité immédiate avec toutes les grandes capitales européennes.",
          "L’absence totale d’élevage et de commerce.",
          "La disparition de toute contrainte climatique."
        ],
        "why": "Les colonies dépendent de conditions matérielles.",
        "trap": "Imaginer une expansion sans limites.",
        "evidence": "Bloc 3."
      },
      {
        "q": "Que prouve L’Anse aux Meadows ?",
        "a": "Une présence nordique en Amérique du Nord, à Terre-Neuve, vers l’an 1000.",
        "choices": [
          "La fondation d’un royaume scandinave durable sur tout le continent américain.",
          "Le départ de tous les Scandinaves vers l’Amérique.",
          "L’inexistence des sagas islandaises."
        ],
        "why": "Le site fournit une preuve archéologique essentielle.",
        "trap": "Confondre preuve de présence et preuve d’empire.",
        "evidence": "Bloc 4."
      },
      {
        "q": "Quelle image des Vikings ce cours ajoute-t-il ?",
        "a": "Des migrants et colons capables de créer des fermes, institutions et réseaux dans l’Atlantique Nord.",
        "choices": [
          "Des raiders incapables de s’installer où que ce soit.",
          "Des moines sédentaires sans bateaux ni familles.",
          "Des explorateurs sans contraintes matérielles ni contacts avec d’autres populations."
        ],
        "why": "La colonisation complète l’histoire des raids.",
        "trap": "Réduire tout l’âge viking à la guerre.",
        "evidence": "Synthèse."
      }
    ]
  },
  "northern-viking-worlds-viking-commerce": {
    "hook": "Les mondes vikings sont aussi des mondes d’échanges : argent, fourrures, ambre, armes, esclaves, monnaies islamiques, routes de la Baltique et voies fluviales vers Byzance.",
    "keyFacts": [
      "Période : surtout IXe-XIe siècle",
      "Espaces : Baltique, monde slave, routes vers Byzance et monde musulman",
      "Produits : argent, fourrures, ambre, cire, armes, esclaves, objets de luxe",
      "Lieux : ports et comptoirs comme Birka, Hedeby, Staraya Ladoga",
      "Piège : séparer totalement commerce et violence"
    ],
    "expressLabels": [
      "Réseaux",
      "Produits",
      "Violence",
      "À retenir"
    ],
    "express": [
      "Les Vikings circulent aussi comme marchands. La Baltique, les fleuves de l’Est, les routes vers Byzance et les contacts avec le monde musulman montrent une Scandinavie connectée à de très grands réseaux.",
      "On échange de l’argent, des fourrures, de l’ambre, de la cire, des armes, des objets de luxe, mais aussi des êtres humains réduits en esclavage. Les monnaies islamiques retrouvées en Scandinavie sont un indice majeur de ces connexions.",
      "Commerce et violence ne sont pas séparés proprement : un même réseau peut transporter des marchandises, des captifs, du tribut, du butin ou des cadeaux diplomatiques.",
      "À retenir : les mondes vikings relient l’Europe du Nord à l’Orient par des routes commerciales où richesse, pouvoir et violence sont mêlés."
    ],
    "complete": [
      {
        "title": "1. Des ports et des routes",
        "text": "Des places comme Hedeby, Birka, Ribe ou Staraya Ladoga montrent l’existence de ports et de comptoirs actifs. On y trouve des artisans, des marchands, des poids, des monnaies, des objets importés. Ces lieux ne sont pas de simples villages : ce sont des nœuds qui relient la Scandinavie à la Baltique, au monde slave et à des circuits plus lointains."
      },
      {
        "title": "2. L’argent islamique en Scandinavie",
        "text": "Les dirhams, monnaies d’argent du monde islamique, retrouvés en grand nombre dans des dépôts scandinaves, prouvent l’ampleur des échanges vers l’Est. Ils ne signifient pas que les Scandinaves deviennent musulmans ; ils montrent que l’argent circule comme métal précieux, moyen d’échange et marque de richesse."
      },
      {
        "title": "3. Les routes de l’Est",
        "text": "Par les fleuves et les portages, des groupes scandinaves, souvent appelés Varègues dans les sources orientales, rejoignent les mondes slaves, la mer Noire, Constantinople et parfois les marchés liés au monde musulman. Ces routes exigent navigation, négociation, violence, adaptation linguistique et relations avec les pouvoirs locaux."
      },
      {
        "title": "4. Les esclaves dans les échanges",
        "text": "Un cours sérieux ne doit pas oublier l’esclavage. Les captifs pris lors de raids ou de conflits peuvent être vendus, transportés ou intégrés comme dépendants. Cela relie directement guerre et commerce. Les réseaux vikings ne sont donc pas seulement des routes d’objets : ils concernent aussi des corps, des statuts et des violences sociales."
      },
      {
        "title": "5. Commerce, dons et pouvoir",
        "text": "Dans les sociétés scandinaves, l’argent et les objets importés servent à commercer, mais aussi à afficher le prestige et à nourrir des fidélités. Un chef qui redistribue de l’argent, des armes ou des bijoux renforce son autorité. Les échanges lointains soutiennent donc la politique locale."
      },
      {
        "title": "6. Synthèse",
        "text": "Le commerce viking ne corrige pas simplement l’image du pillard. Il l’élargit : les mêmes mondes peuvent piller, vendre, négocier, servir comme mercenaires et redistribuer les richesses. La question centrale est la circulation : des objets, des personnes, de l’argent et du pouvoir."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Dirham : monnaie d’argent du monde islamique, souvent retrouvée dans des dépôts scandinaves."
      },
      {
        "title": "Acteurs",
        "text": "Les Varègues désignent des Scandinaves actifs vers l’Est, dans les mondes slaves et byzantins."
      },
      {
        "title": "Erreur fréquente",
        "text": "Opposer commerçant et guerrier. Dans ce contexte, les deux rôles peuvent se croiser."
      }
    ],
    "quiz": [
      {
        "q": "Pourquoi les dirhams sont-ils importants ?",
        "a": "Ils prouvent des connexions commerciales entre la Scandinavie et les réseaux du monde islamique.",
        "choices": [
          "Ils prouvent que tous les Scandinaves deviennent musulmans.",
          "Ils montrent que les Vikings n’ont jamais utilisé l’argent.",
          "Ils sont uniquement des décorations produites en Islande."
        ],
        "why": "Les monnaies sont des traces matérielles de circulation.",
        "trap": "Surinterpréter une monnaie comme conversion religieuse.",
        "evidence": "Bloc 2."
      },
      {
        "q": "Que sont les routes de l’Est ?",
        "a": "Des itinéraires par la Baltique, les fleuves et les portages vers les mondes slaves, Byzance et le monde musulman.",
        "choices": [
          "Des routes terrestres reliant uniquement Paris à Londres.",
          "Des frontières fermées empêchant toute circulation.",
          "Des chemins créés seulement après la fin du Moyen Âge."
        ],
        "why": "Ces routes élargissent l’espace viking.",
        "trap": "Limiter les Vikings à l’Atlantique et aux îles Britanniques.",
        "evidence": "Bloc 3."
      },
      {
        "q": "Pourquoi l’esclavage doit-il être mentionné ?",
        "a": "Parce que les captifs font partie des circulations économiques et relient guerre, commerce et domination sociale.",
        "choices": [
          "Parce qu’il est absent des sociétés scandinaves.",
          "Parce qu’il concerne uniquement les royaumes modernes.",
          "Parce qu’il prouve que le commerce n’existe pas."
        ],
        "why": "C’est une dimension dure mais centrale.",
        "trap": "Rendre le commerce trop propre et pacifique.",
        "evidence": "Bloc 4."
      },
      {
        "q": "Comment les objets importés renforcent-ils le pouvoir local ?",
        "a": "Ils peuvent être redistribués par un chef pour gagner prestige et fidélités.",
        "choices": [
          "Ils suppriment tous les liens de dépendance.",
          "Ils empêchent les chefs d’organiser des expéditions.",
          "Ils n’ont aucun rôle social une fois arrivés."
        ],
        "why": "La richesse circule dans des rapports politiques.",
        "trap": "Voir les objets comme de simples marchandises neutres.",
        "evidence": "Bloc 5."
      },
      {
        "q": "Quelle synthèse est correcte ?",
        "a": "Commerce, violence, captifs, argent et pouvoir sont souvent mêlés dans les mondes vikings.",
        "choices": [
          "Le commerce viking prouve que les raids n’ont jamais existé.",
          "Les Vikings ne commercent qu’avec leur village d’origine.",
          "Les échanges vikings excluent toute relation avec l’Est."
        ],
        "why": "Le cours refuse l’opposition simpliste entre pillard et marchand.",
        "trap": "Remplacer un cliché par son contraire.",
        "evidence": "Synthèse."
      }
    ]
  },
  "northern-viking-worlds-christianisation-nord": {
    "hook": "La fin de l’âge viking est liée à la christianisation du Nord. Des rois danois, norvégiens ou suédois adoptent le christianisme pour des raisons religieuses, mais aussi politiques : gouverner, négocier, écrire, construire un royaume reconnu.",
    "keyFacts": [
      "Période : surtout Xe-XIe siècle",
      "Espaces : Danemark, Norvège, Suède, Islande et colonies nordiques",
      "Acteurs : rois, missionnaires, élites locales, assemblées, familles, évêques",
      "Enjeu : conversion religieuse et construction du pouvoir royal",
      "Piège : croire que la conversion se fait d’un coup et partout pareil"
    ],
    "expressLabels": [
      "Changement",
      "Politique",
      "Rythme",
      "À retenir"
    ],
    "express": [
      "Entre le Xe et le XIe siècle, une partie du Nord scandinave se christianise. Cela transforme les rites, les alliances, les cimetières, les pouvoirs royaux et les liens avec l’Europe chrétienne.",
      "La conversion d’un roi n’est pas seulement une affaire intime : elle permet de se rapprocher d’autres souverains chrétiens, de créer une Église, d’appuyer l’autorité royale et d’intégrer des outils d’écriture et d’administration.",
      "Le changement est progressif. Des pratiques anciennes peuvent durer, se mélanger ou être réinterprétées. Selon les régions, la conversion passe par mission, pression politique, décision d’assemblée ou stratégie de chef.",
      "À retenir : la christianisation n’efface pas les Vikings en une nuit ; elle accompagne la formation de royaumes scandinaves plus stables et intégrés à l’Europe médiévale."
    ],
    "complete": [
      {
        "title": "1. Changer de religion, changer de monde politique",
        "text": "La christianisation du Nord se situe surtout entre le Xe et le XIe siècle. Elle ne signifie pas qu’un peuple entier change de croyance du jour au lendemain. Elle passe par des rois, des missionnaires, des élites, des familles et des communautés. Elle transforme les rites funéraires, les calendriers, les alliances, l’écriture et les relations diplomatiques."
      },
      {
        "title": "2. Le rôle des rois",
        "text": "Des souverains comme Harald à la Dent bleue au Danemark utilisent le christianisme pour affirmer leur pouvoir. Se dire roi chrétien permet d’entrer dans le langage politique de l’Europe médiévale, de traiter avec d’autres princes, de soutenir une Église organisée et de présenter l’unification du royaume comme un ordre voulu par Dieu."
      },
      {
        "title": "3. Missionnaires et résistances",
        "text": "La conversion peut passer par des missions, des évêques, des églises, mais elle rencontre aussi des résistances. Les anciens cultes, les fêtes, les récits et les pratiques funéraires ne disparaissent pas toujours immédiatement. Certaines régions changent vite ; d’autres gardent longtemps des formes hybrides. L’archéologie des tombes montre parfois cette transition."
      },
      {
        "title": "4. L’Islande et la décision collective",
        "text": "L’Islande offre un exemple célèbre : autour de l’an 1000, la conversion est présentée par la tradition comme une décision prise pour éviter la division de la société. L’épisode montre que christianisation et ordre politique sont liés. La question n’est pas seulement “quelle croyance est vraie ?”, mais “comment garder une communauté gouvernable ?”."
      },
      {
        "title": "5. Écriture, mémoire et sagas",
        "text": "Avec le christianisme viennent aussi des formes d’écriture latine, d’institutions ecclésiastiques et de mémoire écrite. Une partie des récits nordiques que nous connaissons est rédigée plus tard dans des sociétés christianisées. Cela pose un problème passionnant : beaucoup de mythes païens nous parviennent à travers des auteurs déjà chrétiens."
      },
      {
        "title": "6. Fin ou transformation de l’âge viking ?",
        "text": "La christianisation, la consolidation des royaumes et les meilleures défenses européennes contribuent à transformer les expéditions scandinaves. Les Scandinaves ne disparaissent pas : ils deviennent des acteurs ordinaires de l’Europe chrétienne, avec des rois, des évêques, des lois écrites et des alliances dynastiques."
      },
      {
        "title": "7. Synthèse",
        "text": "La christianisation du Nord est un changement religieux, mais aussi politique et culturel. Elle aide à comprendre pourquoi l’âge viking ne se termine pas seulement par la défaite des raiders : il se transforme en royaumes scandinaves intégrés au monde médiéval chrétien."
      }
    ],
    "deeper": [
      {
        "title": "Personnage",
        "text": "Harald à la Dent bleue, roi danois du Xe siècle, est associé à la christianisation et à l’affirmation du pouvoir royal."
      },
      {
        "title": "Comment le lire",
        "text": "Pour étudier une conversion, regarde les textes, mais aussi les tombes, les églises, les croix, les noms et les pratiques qui persistent."
      },
      {
        "title": "Erreur fréquente",
        "text": "Imaginer une conversion instantanée et purement spirituelle. Elle est progressive, sociale et politique."
      }
    ],
    "quiz": [
      {
        "q": "Pourquoi la conversion d’un roi scandinave est-elle politique ?",
        "a": "Parce qu’elle renforce son autorité, ses alliances chrétiennes et la construction d’institutions religieuses.",
        "choices": [
          "Parce qu’elle interdit automatiquement toute administration royale.",
          "Parce qu’elle supprime immédiatement toutes les anciennes pratiques partout.",
          "Parce qu’elle coupe le royaume de l’Europe chrétienne."
        ],
        "why": "Religion et pouvoir royal sont liés.",
        "trap": "Voir la conversion comme uniquement individuelle.",
        "evidence": "Bloc 2."
      },
      {
        "q": "Pourquoi la christianisation est-elle progressive ?",
        "a": "Parce que les pratiques anciennes, les résistances et les adaptations varient selon les régions et les groupes.",
        "choices": [
          "Parce qu’aucun Scandinave ne devient chrétien avant le XVe siècle.",
          "Parce que les missionnaires refusent toute conversion royale.",
          "Parce que les anciens cultes disparaissent partout en un jour."
        ],
        "why": "Les sociétés changent par étapes.",
        "trap": "Raconter une conversion instantanée.",
        "evidence": "Bloc 3."
      },
      {
        "q": "Que montre l’exemple islandais autour de l’an 1000 ?",
        "a": "La conversion peut être liée à la recherche d’un compromis politique et d’une unité sociale.",
        "choices": [
          "L’Islande devient une colonie directe de Constantinople.",
          "La religion n’a aucun lien avec l’ordre social.",
          "Tous les Islandais quittent l’île après la conversion."
        ],
        "why": "La décision religieuse peut servir la stabilité commune.",
        "trap": "Séparer totalement croyance et organisation politique.",
        "evidence": "Bloc 4."
      },
      {
        "q": "Pourquoi les sagas demandent-elles de la prudence ?",
        "a": "Parce qu’elles sont souvent rédigées plus tard dans des sociétés déjà christianisées.",
        "choices": [
          "Parce qu’elles sont toutes écrites au moment exact des premiers raids.",
          "Parce qu’elles ne parlent jamais du passé nordique.",
          "Parce qu’elles sont des archives administratives neutres."
        ],
        "why": "La date et le contexte d’écriture comptent.",
        "trap": "Lire les sagas comme des reportages immédiats.",
        "evidence": "Bloc 5."
      },
      {
        "q": "Quelle synthèse est correcte ?",
        "a": "La christianisation accompagne la transformation des sociétés vikings en royaumes scandinaves intégrés à l’Europe chrétienne.",
        "choices": [
          "La christianisation prouve que les raids n’ont jamais existé.",
          "La fin de l’âge viking signifie la disparition des Scandinaves.",
          "Le christianisme n’a aucun effet politique dans le Nord."
        ],
        "why": "C’est la transformation centrale.",
        "trap": "Parler seulement de fin au lieu de transformation.",
        "evidence": "Synthèse."
      }
    ]
  },
  "northern-viking-worlds-vie-quotidienne": {
    "hook": "Le monde viking ne se résume pas aux expéditions. Beaucoup de Scandinaves vivent dans des fermes, produisent leur nourriture, réparent des outils, élèvent des animaux et participent à des réseaux locaux. Comprendre ce quotidien évite de confondre une société entière avec ses guerriers les plus visibles.",
    "keyFacts": [
      "Période : VIIIe-XIe siècle",
      "Espaces : fermes, fjords, ports, îles et colonies nordiques",
      "Acteurs : familles, paysans libres, artisans, femmes, dépendants, esclaves et chefs",
      "Enjeu : voir la base matérielle des raids, du commerce et de la colonisation",
      "Piège : croire que tous les Vikings vivent en guerriers professionnels"
    ],
    "takeaways": [
      {
        "label": "Idée",
        "text": "La ferme est le cœur de nombreuses sociétés nordiques."
      },
      {
        "label": "Nuance",
        "text": "Les expéditions partent d’un monde rural de stocks, saisons et maisonnées."
      },
      {
        "label": "Trace",
        "text": "Maisons longues, outils, textiles, restes alimentaires et tombes éclairent le quotidien."
      }
    ],
    "express": [
      "La vie quotidienne viking est d’abord rurale. Beaucoup de Scandinaves vivent dans des fermes, parfois isolées, organisées autour d’une maison longue où l’on dort, cuisine, travaille, reçoit et stocke.",
      "Le foyer est aussi un lieu de production : on file, tisse, répare, prépare l’hiver, élève des animaux et organise la dépendance entre libres, serviteurs et esclaves. La richesse se voit autant dans les terres et les bêtes que dans les armes.",
      "Un même individu peut être paysan une partie de l’année, marchand ou combattant à un autre moment. Les bateaux relient ce monde rural aux ports, aux marchés et aux expéditions.",
      "À retenir : les raids sont spectaculaires, mais ils reposent sur des fermes, familles, stocks, artisanat et hiérarchies sociales."
    ],
    "complete": [
      {
        "title": "1. Une société de fermes",
        "text": "La ferme est souvent l’unité centrale du monde nordique. Elle rassemble famille, dépendants, animaux, réserves, outils et parfois ateliers. La maison longue n’est pas seulement un logement : elle sert à dormir, cuisiner, travailler, recevoir et montrer le rang du groupe."
      },
      {
        "title": "2. Produire pour survivre",
        "text": "Le climat impose des contraintes fortes. Il faut cultiver quand c’est possible, élever bovins, moutons ou chevaux, pêcher, sécher, saler et stocker. L’hiver rend les réserves décisives : une mauvaise récolte peut fragiliser toute une maisonnée."
      },
      {
        "title": "3. Objets et artisanat",
        "text": "Les objets retrouvés montrent une société techniquement active : couteaux, peignes, clés, aiguilles, poids de métier à tisser, outils agricoles, bijoux et rivets de bateau. Le textile compte beaucoup, car produire vêtements, voiles et couvertures demande temps et savoir-faire."
      },
      {
        "title": "4. Rôles sociaux variés",
        "text": "On trouve des hommes libres, des femmes qui gèrent une partie de l’économie domestique, des artisans, des chefs, des clients, des serviteurs et des esclaves. Qui possède terres, bêtes, armes, bijoux ou clés possède aussi une forme d’autorité."
      },
      {
        "title": "5. Le lien avec les expéditions",
        "text": "Les raids et voyages ne tombent pas du ciel. Il faut construire ou entretenir des navires, réunir des hommes, financer le départ, accepter les risques et espérer un retour profitable. Le spectaculaire part donc du quotidien."
      }
    ],
    "deeper": [
      {
        "title": "Objet",
        "text": "La clé peut symboliser la gestion du foyer et des biens domestiques."
      },
      {
        "title": "Comment le lire",
        "text": "Le quotidien se lit dans les déchets, outils, maisons et traces alimentaires."
      },
      {
        "title": "Erreur fréquente",
        "text": "Prendre les guerriers des récits pour l’ensemble de la société."
      }
    ],
    "quiz": [
      {
        "q": "Pourquoi la ferme est-elle centrale ?",
        "a": "Parce qu’elle organise nourriture, travail, stockage, famille, dépendances et statut social.",
        "choices": [
          "Parce qu’elle sert uniquement de caserne militaire.",
          "Parce qu’elle remplace tous les ports scandinaves.",
          "Parce qu’elle interdit toute navigation en mer."
        ],
        "why": "Le cours replace les expéditions dans une base rurale.",
        "trap": "Réduire les Vikings aux raids.",
        "evidence": "Bloc 1."
      },
      {
        "q": "Pourquoi l’hiver compte-t-il ?",
        "a": "Parce que les réserves, les récoltes et l’élevage conditionnent la survie de la maisonnée.",
        "choices": [
          "Parce qu’il rend les stocks inutiles.",
          "Parce qu’il supprime l’élevage dans tout le Nord.",
          "Parce qu’il transforme chaque ferme en monastère."
        ],
        "why": "Le climat structure le quotidien.",
        "trap": "Oublier les contraintes matérielles.",
        "evidence": "Bloc 2."
      },
      {
        "q": "Quelle trace aide à comprendre le quotidien ?",
        "a": "Maisons longues, outils, textiles, restes alimentaires, objets domestiques et tombes.",
        "choices": [
          "Uniquement les récits de batailles écrits le jour même.",
          "Seulement les couronnes royales modernes.",
          "Des plans cadastraux du XIXe siècle."
        ],
        "why": "Le quotidien se lit dans des traces matérielles variées.",
        "trap": "Chercher seulement des grands textes politiques.",
        "evidence": "Bloc 3."
      },
      {
        "q": "Pourquoi les rôles sociaux sont-ils importants ?",
        "a": "Parce que la société comprend libres, chefs, femmes gestionnaires, dépendants, artisans et esclaves.",
        "choices": [
          "Parce que tous les habitants ont exactement le même statut.",
          "Parce que les femmes sont totalement absentes du foyer.",
          "Parce que les esclaves n’existent jamais dans le monde viking."
        ],
        "why": "Le cours montre une hiérarchie sociale.",
        "trap": "Imaginer une société uniforme.",
        "evidence": "Bloc 4."
      },
      {
        "q": "Quelle synthèse est correcte ?",
        "a": "Les voyages vikings reposent sur un quotidien rural, domestique, artisanal et hiérarchisé.",
        "choices": [
          "Les raids prouvent que les Vikings ne cultivent jamais la terre.",
          "La vie quotidienne n’a aucun lien avec les expéditions.",
          "Les fermes vikings sont seulement des décors de sagas."
        ],
        "why": "Le spectaculaire dépend d’une organisation matérielle.",
        "trap": "Séparer totalement raid et société.",
        "evidence": "Synthèse."
      }
    ]
  },
  "northern-viking-worlds-societe-droit-femmes": {
    "hook": "La société viking n’est ni égalitaire ni totalement chaotique. Elle repose sur des statuts, des familles, des dépendances, des assemblées locales et des règles d’honneur. Les femmes peuvent exercer une vraie autorité domestique et économique, mais cela ne signifie pas égalité moderne.",
    "keyFacts": [
      "Statuts : chefs, hommes libres, femmes de maisonnée, clients, dépendants et esclaves",
      "Institutions : assemblées locales, serments, compensations et coutumes",
      "Femmes : gestion des biens, foyer, alliances et parfois héritage",
      "Esclavage : captifs et personnes non libres dans l’économie",
      "Piège : transformer une nuance sur les femmes en société égalitaire"
    ],
    "takeaways": [
      {
        "label": "Structure",
        "text": "Liberté, dépendance, richesse et réputation comptent énormément."
      },
      {
        "label": "Droit",
        "text": "Les assemblées évitent de réduire la société à la violence privée."
      },
      {
        "label": "Nuance",
        "text": "Certaines femmes ont du pouvoir, surtout domestique et patrimonial, dans une société dominée par les hommes libres."
      }
    ],
    "express": [
      "La société viking est organisée par des statuts. Certains sont chefs, propriétaires ou hommes libres ; d’autres dépendent d’une maisonnée ; certains sont esclaves. Le prestige vient des terres, richesses, alliances, armes, voyages et réputations.",
      "Il existe des assemblées locales, souvent appelées thing, où les hommes libres discutent de conflits, compensations ou règles communes. Cela ne rend pas la société pacifique, mais montre qu’elle possède des cadres collectifs.",
      "Les femmes peuvent jouer un rôle important dans le foyer, les biens, les alliances familiales et parfois l’héritage. Certaines tombes montrent un prestige élevé. Mais ce n’est pas une société égalitaire au sens moderne.",
      "À retenir : monde viking = hiérarchie, honneur, droit coutumier, familles puissantes et dépendances. Il faut éviter le cliché du chaos violent comme celui de la modernité avant l’heure."
    ],
    "complete": [
      {
        "title": "1. Des statuts inégaux",
        "text": "La société viking distingue chefs, familles puissantes, hommes libres, dépendants et esclaves. Les droits et marges d’action ne sont pas les mêmes. Les hommes libres peuvent défendre leurs intérêts, porter les armes et participer à certaines décisions locales."
      },
      {
        "title": "2. Honneur et réputation",
        "text": "La réputation compte beaucoup. Être généreux, courageux, capable de protéger les siens ou de tenir sa parole renforce le prestige. Mais cette logique peut aussi alimenter rivalités, vengeances et conflits."
      },
      {
        "title": "3. Le thing",
        "text": "Les communautés nordiques disposent d’assemblées locales, souvent désignées par le mot thing. On y règle des litiges, négocie des compensations et affirme des règles. Ce n’est pas une démocratie moderne, mais ce n’est pas non plus l’absence de procédure."
      },
      {
        "title": "4. Femmes, foyer et patrimoine",
        "text": "Les femmes peuvent gérer des biens, organiser le foyer, participer aux stratégies familiales et apparaître dans des tombes riches. Les clés, textiles, bijoux ou objets funéraires montrent parfois une autorité domestique et sociale."
      },
      {
        "title": "5. Esclavage et captifs",
        "text": "Les captifs et esclaves sont une dimension essentielle. Ils peuvent venir de raids, d’échanges ou de dépendances locales. Leur travail renforce la richesse des maisonnées et des chefs, ce qui évite de romantiser le monde viking."
      }
    ],
    "deeper": [
      {
        "title": "Mot important",
        "text": "Thing : assemblée locale où les hommes libres peuvent traiter conflits, règles et décisions collectives."
      },
      {
        "title": "Nuance",
        "text": "Pouvoir domestique ne veut pas dire égalité politique moderne."
      },
      {
        "title": "Erreur fréquente",
        "text": "Dire que les femmes vikings étaient libres comme aujourd’hui est anachronique."
      }
    ],
    "quiz": [
      {
        "q": "Pourquoi la société viking n’est-elle pas égalitaire ?",
        "a": "Parce qu’elle distingue chefs, hommes libres, dépendants, femmes de maisonnée et esclaves avec des droits différents.",
        "choices": [
          "Parce que tous les statuts sont identiques.",
          "Parce qu’aucune famille ne possède de biens.",
          "Parce que les assemblées suppriment toute hiérarchie."
        ],
        "why": "Le cours insiste sur les statuts.",
        "trap": "Confondre règles collectives et égalité.",
        "evidence": "Bloc 1."
      },
      {
        "q": "À quoi sert le thing ?",
        "a": "À traiter litiges, règles, compensations et décisions dans un cadre collectif limité aux groupes reconnus.",
        "choices": [
          "À construire uniquement des bateaux.",
          "À remplacer toutes les fermes par des villes.",
          "À interdire toute discussion entre hommes libres."
        ],
        "why": "C’est un cadre de régulation sociale.",
        "trap": "Croire que tout se règle seulement par violence.",
        "evidence": "Bloc 3."
      },
      {
        "q": "Quelle nuance faut-il apporter sur les femmes ?",
        "a": "Elles peuvent gérer biens, foyer et alliances, mais la société reste dominée par les hommes libres et les lignages.",
        "choices": [
          "Elles n’existent jamais dans les sources ou les tombes.",
          "Elles ont partout les mêmes droits politiques que dans une démocratie moderne.",
          "Elles vivent uniquement dans les monastères anglais."
        ],
        "why": "La bonne réponse évite les deux caricatures.",
        "trap": "Transformer une nuance en slogan moderne.",
        "evidence": "Bloc 4."
      },
      {
        "q": "Pourquoi parler de l’esclavage ?",
        "a": "Parce que captifs et esclaves participent à l’économie, au prestige et aux rapports de domination.",
        "choices": [
          "Parce que les Vikings n’ont jamais eu de captifs.",
          "Parce que l’esclavage annule l’existence du commerce.",
          "Parce que seuls les Romains connaissent la dépendance."
        ],
        "why": "C’est central pour ne pas romantiser.",
        "trap": "Nettoyer le sujet en retirant la violence sociale.",
        "evidence": "Bloc 5."
      },
      {
        "q": "Quelle synthèse évite les caricatures ?",
        "a": "La société viking est ordonnée par coutumes et assemblées, mais aussi hiérarchisée et violente.",
        "choices": [
          "Elle est uniquement un chaos sans règles.",
          "Elle est une démocratie moderne égalitaire.",
          "Elle n’a ni familles, ni statuts, ni conflits."
        ],
        "why": "La complexité est la bonne conclusion.",
        "trap": "Choisir un cliché contre un autre.",
        "evidence": "Synthèse."
      }
    ]
  },
  "northern-viking-worlds-croyances-sagas-runes": {
    "hook": "Les croyances nordiques ne sont pas un décor de fantasy. Elles donnent un langage pour penser le monde, la mort, le destin, l’honneur et la mémoire. Mais nos sources sont souvent tardives et parfois rédigées dans des sociétés déjà christianisées.",
    "keyFacts": [
      "Dieux : Odin, Thor, Freyja, Loki et autres figures nordiques",
      "Cosmos : Midgard, Asgard, Yggdrasil, géants, dieux et mondes des morts",
      "Runes : alphabet pour noms, mémoires, messages ou formules",
      "Sources : sagas et Eddas souvent écrites plus tard, surtout en Islande",
      "Piège : résumer toute la mort au Valhalla"
    ],
    "takeaways": [
      {
        "label": "Croyance",
        "text": "Les dieux nordiques structurent des récits sur guerre, sagesse, tonnerre, fertilité, ruse et destin."
      },
      {
        "label": "Repère",
        "text": "Il faut croiser textes tardifs, inscriptions runiques, tombes et objets."
      },
      {
        "label": "Nuance",
        "text": "Le Valhalla existe dans les récits, mais ne résume pas tous les destins des morts."
      }
    ],
    "express": [
      "Avant leur christianisation, les Scandinaves du Nord vivent dans un univers religieux peuplé de dieux comme Odin, Thor, Freyja ou Loki. Midgard désigne le monde des hommes ; Asgard celui des dieux ; Yggdrasil relie plusieurs espaces mythologiques.",
      "La mort est importante, mais il faut éviter le raccourci : tous les morts ne vont pas au Valhalla. Les récits parlent aussi d’autres destins, d’autres lieux et de figures comme Freyja ou Hel.",
      "Les runes sont un alphabet utilisé pour inscrire noms, mémoires, messages, pierres commémoratives ou formules. Elles peuvent avoir une dimension symbolique, mais elles ne sont pas seulement magiques.",
      "Nos connaissances viennent de textes souvent tardifs, comme sagas et Eddas, mais aussi de tombes, objets, amulettes, inscriptions et lieux cultuels. Il faut donc raconter les mythes et expliquer les sources."
    ],
    "complete": [
      {
        "title": "1. Un monde religieux non centralisé",
        "text": "Les croyances nordiques ne fonctionnent pas comme le christianisme médiéval. Il n’existe pas un livre sacré unique, une hiérarchie religieuse centralisée ou un dogme fixé partout. Les récits, rites, cultes locaux et traditions orales varient selon régions et périodes."
      },
      {
        "title": "2. Dieux et récits",
        "text": "Odin est associé à la sagesse, à la guerre, à la poésie et aux morts choisis. Thor protège et combat les forces du chaos. Freyja touche à la fertilité, au désir, au prestige et à certains morts. Loki est une figure ambiguë, rusée, liée au désordre."
      },
      {
        "title": "3. Cosmos et morts",
        "text": "Les récits évoquent plusieurs mondes : Midgard pour les humains, Asgard pour les dieux, d’autres espaces pour géants ou morts. Le Valhalla est célèbre, mais il ne doit pas écraser les autres traditions et destins possibles."
      },
      {
        "title": "4. Runes, objets et rites",
        "text": "Les runes forment un alphabet. Elles apparaissent sur pierres, armes, bijoux, objets du quotidien ou monuments commémoratifs. Les tombes, amulettes, dépôts et traces de rites montrent que les croyances passent par objets et gestes."
      },
      {
        "title": "5. Sagas, Eddas et sources",
        "text": "Beaucoup de récits connus sont écrits plus tard, surtout en Islande, dans un monde déjà christianisé. Les sagas et Eddas sont précieuses, mais elles ne sont pas des enregistrements directs de la religion du VIIIe siècle."
      }
    ],
    "deeper": [
      {
        "title": "Mot important",
        "text": "Edda : textes médiévaux islandais essentiels pour connaître une partie de la mythologie nordique."
      },
      {
        "title": "Piège",
        "text": "Dire que tous les morts vont au Valhalla simplifie trop la diversité des croyances."
      },
      {
        "title": "Comment le lire",
        "text": "Une saga raconte ; une tombe, une rune ou un objet permettent de vérifier autrement."
      }
    ],
    "quiz": [
      {
        "q": "Pourquoi les croyances nordiques ne fonctionnent-elles pas comme l’Église chrétienne ?",
        "a": "Parce qu’elles n’ont pas de livre sacré unique ni de clergé centralisé fixant partout le même dogme.",
        "choices": [
          "Parce qu’elles sont uniquement un code administratif romain.",
          "Parce qu’elles apparaissent seulement au XIXe siècle.",
          "Parce qu’elles interdisent toute tradition orale."
        ],
        "why": "Le cadre religieux est différent.",
        "trap": "Projeter le modèle chrétien sur tout.",
        "evidence": "Bloc 1."
      },
      {
        "q": "Quel dieu est associé au tonnerre et à la protection ?",
        "a": "Thor, dieu du tonnerre et protecteur associé au marteau Mjöllnir.",
        "choices": [
          "Odin.",
          "Freyja.",
          "Loki."
        ],
        "why": "C’est un repère mythologique de base.",
        "trap": "Mélanger mythe nordique et personnages historiques antiques.",
        "evidence": "Bloc 2."
      },
      {
        "q": "Pourquoi le Valhalla ne suffit-il pas à résumer la mort ?",
        "a": "Parce que les récits présentent plusieurs destins possibles et tous les morts ne sont pas des guerriers choisis par Odin.",
        "choices": [
          "Parce qu’il désigne une assemblée juridique locale.",
          "Parce qu’il correspond seulement à une route commerciale.",
          "Parce qu’il décrit un alphabet utilisé sur les pierres."
        ],
        "why": "La réponse évite le cliché unique.",
        "trap": "Réduire toute la religion au guerrier mort au combat.",
        "evidence": "Bloc 3."
      },
      {
        "q": "Que sont les runes dans le cours ?",
        "a": "Un alphabet utilisé pour inscrire noms, mémoires, messages, objets ou monuments.",
        "choices": [
          "Des bateaux de guerre à faible tirant d’eau.",
          "Des assemblées où l’on règle les litiges.",
          "Des poids utilisés pour peser l’argent."
        ],
        "why": "Il faut d’abord définir concrètement.",
        "trap": "Les présenter seulement comme magie floue.",
        "evidence": "Bloc 4."
      },
      {
        "q": "Pourquoi les sagas demandent-elles de la prudence ?",
        "a": "Parce qu’elles sont souvent rédigées plus tard dans des sociétés déjà christianisées.",
        "choices": [
          "Parce qu’elles sont toujours rédigées par les raiders eux-mêmes au VIIIe siècle.",
          "Parce qu’elles ne demandent aucun croisement avec l’archéologie.",
          "Parce qu’elles remplacent totalement les inscriptions runiques."
        ],
        "why": "Le contexte d’écriture compte.",
        "trap": "Lire les sagas comme des reportages immédiats.",
        "evidence": "Bloc 5."
      }
    ]
  },
  "atlantic-revolutions-revolution-francaise-1789": {
    "hook": "1789 n’est pas seulement une foule en colère : c’est le moment où l’autorité politique change de source, du roi vers la nation.",
    "express": [
      "La Révolution française commence dans une crise financière, sociale et politique. Le royaume est endetté, les privilèges sont contestés, et les États généraux ouvrent un espace politique que le pouvoir royal ne contrôle plus totalement.",
      "Le basculement majeur est la souveraineté nationale : l’idée que la loi doit exprimer la nation, et non seulement la volonté du roi. La Déclaration des droits de l’homme et du citoyen donne un langage nouveau à l’égalité civile, à la liberté et à la citoyenneté.",
      "Le piège est de réduire 1789 à la prise de la Bastille. C’est un symbole fort, mais la révolution est aussi juridique, sociale, fiscale et institutionnelle."
    ],
    "complete": [
      {
        "title": "1. Une crise de l’Ancien Régime",
        "text": "À la fin du XVIIIe siècle, la monarchie française affronte une crise de finances, de légitimité et d’inégalités. Les privilèges fiscaux et sociaux sont de plus en plus contestés dans un contexte de débats publics et de circulation des idées des Lumières."
      },
      {
        "title": "2. Les États généraux débordent le cadre prévu",
        "text": "Réunis en 1789, les États généraux devaient aider à résoudre la crise. Mais les députés du tiers état affirment représenter la nation. Le conflit devient alors une question de souveraineté : qui a le droit de faire la loi ?"
      },
      {
        "title": "3. La souveraineté change de camp",
        "text": "Avec l’Assemblée nationale, la nuit du 4 août et la Déclaration des droits, l’ordre ancien est ébranlé. Les privilèges sont remis en cause et les individus sont pensés comme citoyens égaux en droits."
      },
      {
        "title": "4. Violence et peur politique",
        "text": "La Révolution n’est pas un débat abstrait. Elle se déroule dans la peur, les mobilisations populaires, les rumeurs, la prise de la Bastille et les tensions avec le roi. L’événement combine idées, institutions et pression de la rue."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "1789 est un tournant parce que la légitimité politique se reformule autour de la nation, des droits et de la citoyenneté. Ce n’est pas un simple épisode parisien."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Souveraineté nationale : principe selon lequel le pouvoir politique appartient à la nation."
      },
      {
        "title": "Erreur fréquente",
        "text": "Réduire la Révolution française à la Bastille, alors que le vrai changement est aussi institutionnel et juridique."
      },
      {
        "title": "Pourquoi c’est fondateur",
        "text": "Les débats sur droits, citoyenneté, nation et égalité restent au cœur de la politique contemporaine."
      }
    ],
    "quiz": [
      {
        "q": "Quelle crise précède 1789 ?",
        "a": "Une crise financière, sociale et politique de la monarchie."
      },
      {
        "q": "Quel changement de souveraineté est central ?",
        "a": "La loi doit venir de la nation, pas seulement du roi."
      },
      {
        "q": "Pourquoi la Bastille ne suffit-elle pas à résumer 1789 ?",
        "a": "Parce que la Révolution transforme aussi les droits, les institutions, les privilèges et la citoyenneté."
      },
      {
        "q": "Quel texte donne un langage nouveau aux droits ?",
        "a": "La Déclaration des droits de l’homme et du citoyen."
      },
      {
        "q": "Quelle idée faut-il retenir ?",
        "a": "1789 transforme la légitimité politique autour de la nation et des citoyens."
      }
    ]
  },
  "1789-crisis": {
    "hook": "1789 n’éclate pas parce qu’un peuple se réveille soudain : la Révolution naît d’une crise financière, sociale, politique et symbolique qui rend l’Ancien Régime impossible à réparer simplement.",
    "keyFacts": [
      "Quand : 1788-1789, avec l’ouverture des États généraux en mai 1789",
      "Où : royaume de France, surtout Versailles et Paris au début",
      "Acteurs : roi, ministres, noblesse, clergé, tiers état, députés, peuple des villes et campagnes",
      "Traces : cahiers de doléances, débats des États généraux, serment du Jeu de paume, prise de la Bastille",
      "Piège : croire que la Révolution commence par une seule journée ou une seule cause"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "La crise de 1789 combine dette de l’État, inégalités d’ordres, blocage politique et politisation de la société."
      },
      {
        "label": "Moment clé",
        "text": "Le tiers état se proclame Assemblée nationale : la souveraineté commence à glisser du roi vers la nation."
      },
      {
        "label": "Nuance",
        "text": "La Révolution n’est pas seulement parisienne : les campagnes, les cahiers et les peurs collectives comptent aussi."
      }
    ],
    "express": [
      "En 1789, la France traverse une crise profonde. L’État est très endetté, l’impôt pèse surtout sur les roturiers, les privilèges d’ordres sont contestés et la monarchie n’arrive plus à faire accepter ses réformes.",
      "Louis XVI convoque les États généraux pour trouver une solution. Mais le tiers état refuse de rester un ordre dominé : ses députés se proclament Assemblée nationale, puis jurent de donner une constitution à la France lors du serment du Jeu de paume.",
      "La prise de la Bastille, le 14 juillet 1789, donne une dimension populaire et parisienne à la crise. Dans les campagnes, la Grande Peur et les attaques contre les droits seigneuriaux poussent les députés à abolir les privilèges dans la nuit du 4 août."
    ],
    "complete": [
      {
        "title": "1. Une monarchie endettée",
        "text": "La monarchie française sort du XVIIIe siècle avec une dette lourde, aggravée par les guerres et le coût de l’État. Pour réformer l’impôt, le roi doit affronter les privilégiés, les parlements et une opinion publique de plus en plus attentive aux affaires politiques."
      },
      {
        "title": "2. Une société d’ordres contestée",
        "text": "La société est officiellement divisée entre clergé, noblesse et tiers état. Cette organisation ne correspond plus aux aspirations d’une partie de la bourgeoisie, des professions urbaines et de nombreux paysans. Le problème n’est pas seulement la pauvreté : c’est l’inégalité juridique."
      },
      {
        "title": "3. Les cahiers et les États généraux",
        "text": "Avant la réunion des États généraux, les Français rédigent des cahiers de doléances. On y trouve des plaintes fiscales, des demandes de justice plus claire, des critiques des privilèges et l’espoir que le roi écoute enfin la nation."
      },
      {
        "title": "4. Le tiers état devient Assemblée nationale",
        "text": "Le conflit porte sur la manière de voter : par ordre ou par tête. En se proclamant Assemblée nationale, les députés du tiers état affirment qu’ils représentent la nation entière. C’est une rupture décisive avec la souveraineté royale traditionnelle."
      },
      {
        "title": "5. L’irruption populaire",
        "text": "La prise de la Bastille montre que la rue parisienne peut peser sur les événements. Dans les campagnes, la peur des complots aristocratiques et les violences contre les droits seigneuriaux accélèrent la décision d’abolir les privilèges. La Révolution devient à la fois politique, sociale et populaire."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Tiers état : ordre qui regroupe tous ceux qui ne sont ni nobles ni membres du clergé, donc l’immense majorité de la population."
      },
      {
        "title": "Comment le lire",
        "text": "Pour comprendre 1789, il faut relier finances publiques, institutions, hiérarchies sociales et événements de rue."
      },
      {
        "title": "Erreur fréquente",
        "text": "Résumer 1789 à la Bastille. Le 14 juillet est majeur, mais il vient après une crise politique déjà ouverte."
      }
    ],
    "quiz": [
      {
        "kind": "cause",
        "q": "Pourquoi la crise financière fragilise-t-elle la monarchie en 1789 ?",
        "a": "Parce que l’État est très endetté et ne parvient plus à faire accepter une réforme fiscale durable.",
        "choices": [
          "Parce que le roi décide volontairement de supprimer toutes les institutions.",
          "Parce que la France ne possède plus aucune administration locale.",
          "Parce que les députés refusent toute discussion sur les impôts avant même les États généraux."
        ],
        "why": "La dette rend nécessaire une réforme, mais le système politique bloque.",
        "trap": "Chercher une seule cause spectaculaire.",
        "evidence": "Bloc 1."
      },
      {
        "kind": "société",
        "q": "Qu’est-ce qui rend la société d’ordres contestable ?",
        "a": "L’existence d’inégalités juridiques et fiscales entre clergé, noblesse et tiers état.",
        "choices": [
          "L’égalité complète entre tous les habitants du royaume.",
          "L’absence de distinction sociale avant 1789.",
          "La domination politique exclusive des paysans sur la noblesse."
        ],
        "why": "La contestation porte sur les privilèges et les droits.",
        "trap": "Réduire la crise à une simple pénurie alimentaire.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "institution",
        "q": "Que signifie la proclamation de l’Assemblée nationale ?",
        "a": "Les députés du tiers état affirment représenter la nation et non plus seulement un ordre séparé.",
        "choices": [
          "Le roi renforce le vote par ordre sans opposition.",
          "Le clergé interdit toute constitution écrite.",
          "Les provinces remplacent immédiatement Paris comme capitale politique."
        ],
        "why": "C’est un déplacement de souveraineté.",
        "trap": "Confondre réunion des États généraux et révolution déjà achevée.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "événement",
        "q": "Pourquoi la prise de la Bastille compte-t-elle ?",
        "a": "Elle montre que le peuple parisien peut intervenir dans la crise politique et sauver la dynamique révolutionnaire.",
        "choices": [
          "Elle règle définitivement toutes les questions fiscales.",
          "Elle abolit à elle seule tous les privilèges du royaume.",
          "Elle marque la fin immédiate de la monarchie dès juillet 1789."
        ],
        "why": "L’événement donne une force populaire à la Révolution.",
        "trap": "Lui attribuer tous les effets de l’année 1789.",
        "evidence": "Bloc 5."
      },
      {
        "kind": "synthèse",
        "q": "Quelle formule résume le mieux 1789 ?",
        "a": "Une crise de l’État, des privilèges et de la souveraineté qui devient une révolution politique et sociale.",
        "choices": [
          "Une réforme fiscale calme, menée sans mobilisation collective.",
          "Une succession d’événements sans lien entre finances, société et politique.",
          "Une crise uniquement militaire provoquée par une invasion étrangère."
        ],
        "why": "La bonne réponse relie plusieurs niveaux de crise.",
        "trap": "Réduire 1789 à une date ou à une foule.",
        "evidence": "Conclusion."
      }
    ]
  },
  "rights-new-france": {
    "hook": "La Déclaration des droits de l’homme et du citoyen ne se contente pas d’annoncer de beaux principes : elle change la langue du pouvoir en plaçant la loi, la nation et l’égalité civile au centre.",
    "keyFacts": [
      "Quand : été 1789, Déclaration adoptée le 26 août",
      "Où : Assemblée nationale constituante, France révolutionnaire",
      "Acteurs : députés, clubs, citoyens actifs, presse, roi contraint de composer",
      "Traces : Déclaration des droits, abolition des privilèges, Constitution de 1791",
      "Piège : croire que droits proclamés = droits appliqués immédiatement à tous"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "La souveraineté nationale remplace progressivement l’idée que le pouvoir vient seulement du roi."
      },
      {
        "label": "Texte clé",
        "text": "La Déclaration affirme liberté, égalité civile, propriété, sûreté, résistance à l’oppression et loi commune."
      },
      {
        "label": "Limite",
        "text": "Femmes, pauvres, esclaves des colonies et opposants politiques ne bénéficient pas tous de la même manière de ces principes."
      }
    ],
    "express": [
      "Après l’été 1789, les députés cherchent à refonder la France. La nuit du 4 août abolit les privilèges, puis la Déclaration des droits de l’homme et du citoyen affirme que les hommes naissent libres et égaux en droits.",
      "Le pouvoir n’est plus pensé comme une propriété du roi. La souveraineté appartient à la nation, la loi doit être l’expression de la volonté générale, et les citoyens doivent être jugés selon des règles communes.",
      "Mais il faut distinguer principe et réalité. La Constitution de 1791 garde une monarchie constitutionnelle et limite la participation politique. Les femmes, les plus pauvres et les esclaves des colonies restent exclus ou marginalisés malgré le langage universel des droits."
    ],
    "complete": [
      {
        "title": "1. Abolir les privilèges",
        "text": "La nuit du 4 août 1789 marque une rupture majeure : les droits seigneuriaux et privilèges d’ordres sont attaqués. L’objectif est de construire une société de droits communs, même si l’application concrète reste progressive et négociée."
      },
      {
        "title": "2. Déclarer des droits",
        "text": "La Déclaration du 26 août 1789 énonce des principes généraux : liberté, égalité civile, propriété, sûreté, résistance à l’oppression. Elle donne aux révolutionnaires une grammaire politique nouvelle, opposable à l’arbitraire."
      },
      {
        "title": "3. La nation contre l’absolutisme",
        "text": "La souveraineté nationale signifie que le pouvoir légitime vient de la nation. Le roi n’est plus la source unique de la loi. Les députés veulent encadrer l’exécutif, écrire une constitution et limiter l’ancien arbitraire monarchique."
      },
      {
        "title": "4. Une France réorganisée",
        "text": "La Révolution transforme aussi l’espace politique : départements, nouvelles administrations, justice réformée, vente de biens du clergé, constitution civile du clergé. La nouvelle France n’est pas seulement un texte, c’est une réorganisation concrète."
      },
      {
        "title": "5. Des droits universels, des exclusions réelles",
        "text": "Le langage des droits est immense, mais son application est limitée. Le suffrage n’est pas universel, les femmes sont exclues du vote, l’esclavage colonial n’est pas aboli en 1789. Cette tension nourrit des débats et des luttes durables."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Souveraineté nationale : principe selon lequel le pouvoir politique appartient à la nation, représentée par des institutions."
      },
      {
        "title": "Nuance",
        "text": "Un principe proclamé peut devenir une arme politique même lorsqu’il n’est pas encore appliqué partout."
      },
      {
        "title": "Erreur fréquente",
        "text": "Dire que 1789 installe immédiatement la démocratie moderne complète. La rupture est forte, mais les exclusions restent nombreuses."
      }
    ],
    "quiz": [
      {
        "kind": "texte",
        "q": "Que proclame la Déclaration des droits de 1789 ?",
        "a": "Des principes comme liberté, égalité civile, propriété, sûreté et résistance à l’oppression.",
        "choices": [
          "La restauration complète des privilèges seigneuriaux.",
          "La suppression de toute loi commune au profit du roi seul.",
          "L’obligation pour chaque citoyen d’appartenir au clergé."
        ],
        "why": "Le texte fixe la nouvelle grammaire politique.",
        "trap": "Croire qu’il règle immédiatement tous les problèmes.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "concept",
        "q": "Que signifie la souveraineté nationale ?",
        "a": "Le pouvoir légitime vient de la nation et non plus seulement de la personne du roi.",
        "choices": [
          "Le roi peut décider seul sans constitution.",
          "Chaque province devient un royaume indépendant.",
          "La noblesse récupère le monopole de l’impôt."
        ],
        "why": "C’est une rupture avec l’absolutisme.",
        "trap": "Confondre nation et opinion unanime.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "réforme",
        "q": "Pourquoi la réorganisation administrative est-elle importante ?",
        "a": "Parce que la Révolution transforme aussi les institutions, la justice, les départements et les rapports avec l’Église.",
        "choices": [
          "Parce que les droits restent uniquement une poésie sans aucune décision concrète.",
          "Parce que les provinces d’Ancien Régime sont conservées sans changement.",
          "Parce que le clergé devient l’unique administration de l’État."
        ],
        "why": "La nouvelle France se construit par des mesures pratiques.",
        "trap": "Ne regarder que les grands discours.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "limite",
        "q": "Quelle limite faut-il retenir sur les droits de 1789 ?",
        "a": "Leur langage est universel, mais femmes, pauvres et esclaves coloniaux restent largement exclus.",
        "choices": [
          "Tous les habitants votent immédiatement dans les mêmes conditions.",
          "L’esclavage est aboli partout dans l’empire dès août 1789.",
          "Les femmes deviennent majoritaires dans toutes les assemblées."
        ],
        "why": "La tension entre principes et réalités est centrale.",
        "trap": "Confondre proclamation et application complète.",
        "evidence": "Bloc 5."
      },
      {
        "kind": "synthèse",
        "q": "Pourquoi 1789 change-t-il la langue du pouvoir ?",
        "a": "Parce que la loi, les droits, la nation et l’égalité civile deviennent des références centrales.",
        "choices": [
          "Parce que le pouvoir royal devient plus absolu qu’avant.",
          "Parce que les privilèges d’ordres deviennent la base officielle de la citoyenneté.",
          "Parce que la France renonce à écrire des textes politiques."
        ],
        "why": "Les mots du pouvoir changent avec les institutions.",
        "trap": "Ne voir que l’événementiel.",
        "evidence": "Hook et conclusion."
      }
    ]
  },
  "republic-terror-war": {
    "hook": "La Terreur ne se comprend pas comme une simple folie collective : elle naît d’une République en guerre, menacée aux frontières, divisée à l’intérieur et obsédée par le salut public.",
    "keyFacts": [
      "Quand : surtout 1792-1794",
      "Où : France républicaine, frontières, Paris, Vendée et provinces insurgées",
      "Acteurs : Convention, Montagnards, Girondins, sans-culottes, comités, armées, opposants",
      "Traces : chute de la monarchie, procès de Louis XVI, Comité de salut public, levée en masse, lois d’exception",
      "Piège : expliquer la Terreur sans la guerre ou réduire toute la Révolution à la guillotine"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "La République se radicalise dans un contexte de guerre extérieure, guerre civile et crise politique."
      },
      {
        "label": "Moment clé",
        "text": "La monarchie tombe en 1792, Louis XVI est jugé puis exécuté en janvier 1793."
      },
      {
        "label": "Nuance",
        "text": "La Terreur combine défense révolutionnaire, violence d’État, peur des complots et luttes de pouvoir."
      }
    ],
    "express": [
      "En 1792, la Révolution entre dans une phase plus radicale. La guerre contre les monarchies européennes, la méfiance envers Louis XVI et la pression populaire conduisent à la chute de la monarchie et à la proclamation de la République.",
      "L’exécution du roi en janvier 1793 aggrave le conflit avec l’Europe et les divisions françaises. La République doit affronter des ennemis extérieurs, des soulèvements intérieurs, la crise économique et les rivalités politiques entre Girondins, Montagnards et sans-culottes.",
      "La Terreur correspond à un gouvernement d’exception : Comité de salut public, surveillance, tribunaux révolutionnaires, répression des opposants. Elle ne résume pas toute la Révolution, mais elle montre jusqu’où un pouvoir peut aller lorsqu’il affirme défendre la République en danger."
    ],
    "complete": [
      {
        "title": "1. La monarchie tombe",
        "text": "La guerre commencée en 1792 fragilise la monarchie constitutionnelle. Le roi est soupçonné de double jeu avec les puissances ennemies. L’insurrection du 10 août 1792 renverse la monarchie et ouvre la voie à une République proclamée en septembre."
      },
      {
        "title": "2. Le procès du roi",
        "text": "Louis XVI devient Louis Capet devant la Convention. Son procès pose une question politique immense : peut-on fonder une République en laissant vivre l’ancien roi ? Son exécution en janvier 1793 rend la rupture irréversible."
      },
      {
        "title": "3. Une République encerclée",
        "text": "La France affronte une coalition européenne, tandis que des révoltes éclatent à l’intérieur, notamment en Vendée. La levée en masse mobilise les hommes et les ressources. La République devient une machine de guerre."
      },
      {
        "title": "4. Le gouvernement révolutionnaire",
        "text": "Le Comité de salut public, les représentants en mission, les tribunaux révolutionnaires et les mesures de surveillance créent un pouvoir d’exception. La logique est celle du salut public : vaincre les ennemis avant de revenir à une constitution ordinaire."
      },
      {
        "title": "5. Violence et héritage difficile",
        "text": "La Terreur laisse une mémoire lourde : répression, guillotine, guerres civiles, suspects. Mais elle ne doit pas être séparée du contexte de guerre et de peur politique. Comprendre n’est pas justifier : c’est expliquer les mécanismes de radicalisation."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Salut public : idée selon laquelle des mesures extraordinaires sont justifiées pour sauver la République en danger."
      },
      {
        "title": "Nuance",
        "text": "La Terreur n’est pas un bloc simple : elle varie selon les lieux, les moments et les acteurs."
      },
      {
        "title": "Erreur fréquente",
        "text": "Commencer et finir la Révolution par la guillotine. Cela écrase les enjeux de souveraineté, de droits et de guerre."
      }
    ],
    "quiz": [
      {
        "kind": "cause",
        "q": "Pourquoi la République se radicalise-t-elle à partir de 1792 ?",
        "a": "Parce qu’elle affronte la guerre extérieure, la chute de la monarchie, des révoltes et des divisions politiques.",
        "choices": [
          "Parce que la France connaît une paix stable avec toutes les monarchies européennes.",
          "Parce que Louis XVI reçoit des pouvoirs absolus renforcés par la Convention.",
          "Parce que les clubs politiques disparaissent avant toute crise."
        ],
        "why": "Plusieurs menaces alimentent la radicalisation.",
        "trap": "Isoler la Terreur de la guerre.",
        "evidence": "Express."
      },
      {
        "kind": "événement",
        "q": "Que provoque le 10 août 1792 ?",
        "a": "La chute de la monarchie constitutionnelle et l’ouverture de la voie républicaine.",
        "choices": [
          "La restauration de l’Ancien Régime sans constitution.",
          "La fin de toutes les mobilisations populaires à Paris.",
          "La création de l’Empire napoléonien le même jour."
        ],
        "why": "C’est une rupture politique majeure.",
        "trap": "Confondre 1792 avec 1789 ou 1804.",
        "evidence": "Bloc 1."
      },
      {
        "kind": "institution",
        "q": "À quoi sert le Comité de salut public dans ce contexte ?",
        "a": "À concentrer le gouvernement révolutionnaire pour défendre la République en guerre.",
        "choices": [
          "À rétablir le pouvoir personnel de Louis XVI.",
          "À organiser uniquement des fêtes sans rôle politique.",
          "À supprimer les armées alors que les frontières sont menacées."
        ],
        "why": "Il incarne un pouvoir d’exception.",
        "trap": "Le décrire comme une institution ordinaire.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi comprendre la Terreur ne veut-il pas dire la justifier ?",
        "a": "Parce qu’on peut expliquer ses mécanismes de guerre, de peur et de pouvoir sans approuver la violence.",
        "choices": [
          "Parce qu’il faut supprimer tout contexte historique.",
          "Parce que les violences n’ont laissé aucune trace.",
          "Parce que la Terreur est une période totalement inventée."
        ],
        "why": "L’histoire cherche des causes, pas des excuses automatiques.",
        "trap": "Confondre explication et approbation.",
        "evidence": "Bloc 5."
      },
      {
        "kind": "synthèse",
        "q": "Quelle idée résume le mieux le cours ?",
        "a": "La République en danger produit un gouvernement d’exception qui radicalise la Révolution.",
        "choices": [
          "La Terreur apparaît dans une France paisible et sans conflit.",
          "La Révolution s’arrête définitivement dès la Déclaration des droits.",
          "La République naît uniquement d’une réforme administrative locale."
        ],
        "why": "La bonne réponse relie République, guerre et exception.",
        "trap": "Réduire la période à une image de guillotine.",
        "evidence": "Conclusion."
      }
    ]
  },
  "napoleon-empire": {
    "hook": "Napoléon n’est pas seulement un général victorieux : il stabilise une partie de l’héritage révolutionnaire tout en construisant un pouvoir autoritaire et une Europe dominée par la guerre.",
    "keyFacts": [
      "Quand : Consulat à partir de 1799, Empire de 1804 à 1815",
      "Où : France, Europe continentale, Méditerranée et colonies",
      "Acteurs : Bonaparte/Napoléon, armée, préfets, notables, adversaires européens",
      "Traces : coup d’État du 18 Brumaire, Code civil, Concordat, préfets, plébiscites, grandes campagnes",
      "Piège : choisir entre héros modernisateur et tyran militaire sans tenir les deux dimensions"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "Le régime napoléonien consolide l’État et certains acquis de 1789, mais réduit fortement la liberté politique."
      },
      {
        "label": "Trace durable",
        "text": "Le Code civil organise propriété, famille, contrats et égalité civile masculine devant la loi."
      },
      {
        "label": "Limite",
        "text": "Les guerres napoléoniennes diffusent des réformes mais provoquent aussi occupation, résistances et épuisement."
      }
    ],
    "express": [
      "Après les années révolutionnaires, Bonaparte prend le pouvoir par le coup d’État du 18 Brumaire en 1799. Le Consulat promet l’ordre, la stabilité et la fin des divisions, puis Napoléon devient empereur en 1804.",
      "Le régime conserve une partie de l’héritage révolutionnaire : égalité civile, carrières ouvertes aux talents, vente des biens nationaux, État plus rationnel. Mais il limite la presse, contrôle les élections, surveille l’opinion et concentre le pouvoir autour de l’empereur.",
      "Le Code civil, les préfets, le Concordat et l’administration impériale marquent durablement la France. En Europe, les victoires diffusent des réformes, mais les occupations et la guerre permanente suscitent résistances, coalitions et finalement chute de l’Empire en 1815."
    ],
    "complete": [
      {
        "title": "1. Sortir du désordre révolutionnaire",
        "text": "Le Directoire apparaît fragile, contesté et dépendant de l’armée. Bonaparte profite de sa gloire militaire et du désir d’ordre pour prendre le pouvoir en 1799. Le Consulat présente l’autorité forte comme une solution à l’instabilité."
      },
      {
        "title": "2. Stabiliser certains acquis",
        "text": "Napoléon ne revient pas simplement à l’Ancien Régime. Il protège la propriété, l’égalité civile masculine, les carrières administratives et militaires ouvertes aux talents, ainsi que l’achat des biens nationaux par les nouveaux propriétaires."
      },
      {
        "title": "3. Construire un État autoritaire",
        "text": "Préfets, police, censure, plébiscites encadrés, administration centralisée : le régime donne une place majeure à l’efficacité et au contrôle. Les citoyens existent, mais la participation politique réelle est fortement limitée."
      },
      {
        "title": "4. Le Code civil et la société",
        "text": "Le Code civil de 1804 unifie le droit privé. Il consacre la propriété, les contrats et l’égalité civile des hommes, mais renforce l’autorité du père et du mari dans la famille. C’est un héritage durable, mais pas une démocratie sociale."
      },
      {
        "title": "5. L’Europe napoléonienne",
        "text": "Les conquêtes exportent des réformes et bousculent les anciens pouvoirs. Mais la domination française entraîne impôts, conscription, occupations et résistances nationales. L’Empire vit de la guerre, et cette dynamique finit par l’épuiser."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Plébiscite : vote demandé au peuple pour approuver une décision ou un pouvoir, souvent encadré par le régime."
      },
      {
        "title": "Nuance",
        "text": "Napoléon peut moderniser l’État tout en restreignant les libertés politiques : les deux ne s’annulent pas."
      },
      {
        "title": "Erreur fréquente",
        "text": "Faire de Napoléon seulement un héros ou seulement un dictateur. Historiquement, son régime combine stabilisation, autorité et guerre."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "Comment Bonaparte arrive-t-il au pouvoir en 1799 ?",
        "a": "Par le coup d’État du 18 Brumaire, dans un contexte de Directoire fragilisé.",
        "choices": [
          "Par une élection présidentielle au suffrage universel direct.",
          "Par l’héritage dynastique normal des Bourbons.",
          "Par une décision de la Convention en 1793."
        ],
        "why": "Le repère distingue Consulat, République et Empire.",
        "trap": "Confondre 1799 et le sacre de 1804.",
        "evidence": "Bloc 1."
      },
      {
        "kind": "héritage",
        "q": "Quel acquis révolutionnaire Napoléon stabilise-t-il en partie ?",
        "a": "L’égalité civile masculine et la protection de la propriété issue des transformations révolutionnaires.",
        "choices": [
          "Le retour complet des privilèges de naissance.",
          "La disparition de toute administration centralisée.",
          "Le pouvoir politique autonome des assemblées de village."
        ],
        "why": "Le régime consolide certains effets de 1789.",
        "trap": "Croire à une restauration pure et simple.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "institution",
        "q": "Pourquoi l’État napoléonien est-il autoritaire ?",
        "a": "Parce qu’il centralise l’administration, surveille l’opinion, limite la presse et encadre la participation politique.",
        "choices": [
          "Parce qu’il supprime toute police et toute administration.",
          "Parce qu’il laisse les provinces décider seules de la guerre.",
          "Parce qu’il interdit les préfets et les tribunaux."
        ],
        "why": "L’efficacité administrative s’accompagne de contrôle.",
        "trap": "Confondre ordre et liberté politique.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "droit",
        "q": "Pourquoi le Code civil est-il durable mais limité ?",
        "a": "Il unifie le droit et protège propriété et contrats, mais renforce aussi l’autorité masculine dans la famille.",
        "choices": [
          "Il abolit immédiatement toutes les inégalités entre hommes et femmes.",
          "Il concerne uniquement les opérations militaires.",
          "Il restaure les coutumes locales sans aucun cadre commun."
        ],
        "why": "Le Code mêle modernisation juridique et hiérarchies sociales.",
        "trap": "Le présenter comme un progrès total sans limites.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Quelle formule résume le mieux Napoléon ?",
        "a": "Un pouvoir qui stabilise certains acquis révolutionnaires tout en construisant un régime autoritaire et guerrier.",
        "choices": [
          "Un roi médiéval sans lien avec la Révolution française.",
          "Un dirigeant sans administration, sans armée et sans réforme juridique.",
          "Un président républicain gouvernant sans contrôle de l’opinion."
        ],
        "why": "La réponse tient ensemble héritage, autorité et guerre.",
        "trap": "Choisir une image simple au lieu d’une tension historique.",
        "evidence": "Hook et conclusion."
      }
    ]
  },
  "europe-after-napoleon": {
    "hook": "Après 1815, l’Europe ne revient pas simplement en arrière : les vainqueurs veulent restaurer l’ordre, mais les idées de nation, de droits et de constitution continuent de circuler.",
    "keyFacts": [
      "Quand : 1814-1815 puis première moitié du XIXe siècle",
      "Où : Europe, surtout Vienne, France, États allemands, Italie, Pologne, Balkans",
      "Acteurs : puissances victorieuses, diplomates, monarchies restaurées, libéraux, nationalistes",
      "Traces : congrès de Vienne, Sainte-Alliance, restaurations monarchiques, révolutions de 1830 et 1848",
      "Piège : croire que la défaite de Napoléon efface les transformations révolutionnaires"
    ],
    "takeaways": [
      {
        "label": "Idée forte",
        "text": "Le congrès de Vienne cherche l’équilibre entre puissances et la stabilité monarchique."
      },
      {
        "label": "Tension",
        "text": "La restauration politique se heurte aux attentes libérales, nationales et constitutionnelles."
      },
      {
        "label": "Héritage",
        "text": "L’Europe du XIXe siècle reste travaillée par les effets de 1789 et des guerres napoléoniennes."
      }
    ],
    "express": [
      "Après la chute de Napoléon, les vainqueurs se réunissent au congrès de Vienne. Ils veulent empêcher une nouvelle domination française, restaurer des monarchies et construire un équilibre entre grandes puissances.",
      "Mais l’Europe de 1815 n’est pas celle de 1788. Les guerres ont déplacé des frontières, diffusé des codes, réveillé des sentiments nationaux et rendu plus visibles les demandes de constitution et de libertés politiques.",
      "Le XIXe siècle européen naît de cette tension : les gouvernements cherchent l’ordre, tandis que des libéraux, des nationalistes et des républicains contestent les restaurations. Les révolutions de 1830 et 1848 montrent que l’héritage révolutionnaire reste actif."
    ],
    "complete": [
      {
        "title": "1. Vienne : restaurer et équilibrer",
        "text": "Le congrès de Vienne réunit les grandes puissances victorieuses. L’objectif n’est pas seulement de punir la France : il faut éviter qu’une puissance domine le continent. L’équilibre européen devient un principe diplomatique central."
      },
      {
        "title": "2. Le retour des monarchies",
        "text": "Plusieurs dynasties reviennent au pouvoir, dont les Bourbons en France. Cette restauration ne signifie pas effacer vingt-cinq ans de bouleversements : certaines réformes administratives, juridiques ou sociales demeurent."
      },
      {
        "title": "3. Libéralisme et constitution",
        "text": "Des groupes libéraux réclament des constitutions, des assemblées, la liberté de presse et des garanties contre l’arbitraire. Ils ne veulent pas toujours une République, mais ils refusent l’absolutisme pur."
      },
      {
        "title": "4. La question nationale",
        "text": "Les guerres napoléoniennes ont renforcé ou révélé des sentiments nationaux, notamment dans les espaces allemands, italiens ou polonais. Beaucoup contestent des frontières décidées par les diplomates sans consulter les peuples."
      },
      {
        "title": "5. Une Europe instable",
        "text": "Les révolutions de 1830 puis 1848 montrent que la restauration ne ferme pas la période révolutionnaire. L’Europe du XIXe siècle se construit dans un conflit durable entre ordre monarchique, droits politiques et aspirations nationales."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Équilibre européen : système diplomatique visant à empêcher qu’une seule puissance domine durablement le continent."
      },
      {
        "title": "Nuance",
        "text": "Restaurer un roi ne veut pas dire restaurer exactement l’Ancien Régime : les sociétés ont changé."
      },
      {
        "title": "Erreur fréquente",
        "text": "S’arrêter à Waterloo. La vraie question est ce que l’Europe fait ensuite de l’héritage révolutionnaire et impérial."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "Quel est l’objectif principal du congrès de Vienne ?",
        "a": "Restaurer un ordre monarchique et maintenir un équilibre entre les grandes puissances européennes.",
        "choices": [
          "Créer immédiatement une Europe républicaine fédérale.",
          "Proclamer Napoléon roi héréditaire de tous les États allemands.",
          "Supprimer toute diplomatie entre les puissances."
        ],
        "why": "Le congrès cherche stabilité et équilibre continental.",
        "trap": "Voir Vienne comme une simple vengeance contre la France.",
        "evidence": "Bloc 1."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi 1815 n’efface-t-il pas 1789 ?",
        "a": "Parce que certaines réformes, idées de droits, pratiques administratives et attentes politiques ont déjà transformé l’Europe.",
        "choices": [
          "Parce que l’Ancien Régime revient partout exactement comme avant.",
          "Parce que les guerres napoléoniennes n’ont touché aucun territoire.",
          "Parce que les populations oublient immédiatement les constitutions."
        ],
        "why": "Les changements sociaux et politiques ne disparaissent pas d’un coup.",
        "trap": "Confondre restauration dynastique et retour total en arrière.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "idée",
        "q": "Que demandent souvent les libéraux du XIXe siècle ?",
        "a": "Des constitutions, des libertés politiques, des assemblées et des garanties contre l’arbitraire.",
        "choices": [
          "Le rétablissement intégral des droits seigneuriaux.",
          "La suppression définitive de toute presse politique.",
          "L’interdiction de toute représentation nationale."
        ],
        "why": "Le libéralisme politique vise à limiter le pouvoir arbitraire.",
        "trap": "Confondre libéralisme et démocratie complète immédiate.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "nation",
        "q": "Pourquoi la question nationale devient-elle explosive ?",
        "a": "Parce que des peuples contestent des frontières et dominations décidées sans eux par les puissances.",
        "choices": [
          "Parce que toutes les frontières européennes deviennent unanimement acceptées.",
          "Parce que les identités politiques disparaissent après 1815.",
          "Parce que les diplomates renoncent à toute décision territoriale."
        ],
        "why": "Le nationalisme remet en cause l’ordre de Vienne.",
        "trap": "Croire que l’équilibre diplomatique suffit à satisfaire les populations.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Quelle idée résume l’Europe après Napoléon ?",
        "a": "Un ordre restauré tente de contenir des héritages révolutionnaires, libéraux et nationaux encore actifs.",
        "choices": [
          "Une Europe parfaitement immobile jusqu’en 1914.",
          "Une disparition complète des monarchies dès 1815.",
          "Une paix sociale totale sans révolutions ni contestations."
        ],
        "why": "La période est structurée par une tension durable.",
        "trap": "Croire à une parenthèse refermée sans conséquences.",
        "evidence": "Conclusion."
      }
    ]
  },
  "russian-revolution-postwar": {
    "hook": "La révolution russe ne commence pas par un plan bolchevique parfaitement maîtrisé : c’est l’effondrement d’un empire en guerre, puis une lutte brutale pour définir qui parle au nom du peuple.",
    "express": [
      "En 1917, la Russie connaît deux révolutions. En février, le tsar Nicolas II abdique après une crise nourrie par la guerre, les pénuries, les grèves et la perte de légitimité. Un gouvernement provisoire apparaît, mais il continue la guerre et peine à répondre aux attentes.",
      "En octobre, les bolcheviks prennent le pouvoir au nom des soviets avec des mots d’ordre efficaces : paix, terre, pain, pouvoir aux soviets. Leur victoire n’est pas seulement idéologique : elle s’appuie sur la crise de l’État, la guerre, la discipline du parti et la faiblesse des adversaires.",
      "Le piège est de raconter une révolution linéaire. Après octobre viennent guerre civile, terreur, armées blanches, interventions étrangères, famine et construction d’un État communiste autoritaire. La révolution ouvre une espérance et une violence d’État nouvelle."
    ],
    "complete": [
      {
        "title": "1. L’empire fragilisé par la guerre",
        "text": "La Première Guerre mondiale désorganise l’économie, l’armée, les transports et les villes. Les pertes militaires, les pénuries et le discrédit du tsarisme rendent le régime incapable de tenir le choc."
      },
      {
        "title": "2. Février : révolution sans pouvoir stable",
        "text": "Le tsar abdique, mais le pouvoir est partagé entre gouvernement provisoire et soviets. Cette dualité crée une instabilité permanente : qui représente vraiment le peuple, l’État ou les conseils ?"
      },
      {
        "title": "3. Octobre : prendre le moment",
        "text": "Les bolcheviks exploitent la fatigue de guerre et la colère sociale. Leur force vient d’une ligne claire, d’un parti discipliné et de slogans qui répondent aux urgences : paix, terre, pain."
      },
      {
        "title": "4. Guerre civile et radicalisation",
        "text": "La prise du pouvoir ne stabilise pas la Russie. Armée rouge, armées blanches, réquisitions, terreur, interventions étrangères et famine transforment la révolution en guerre de survie."
      },
      {
        "title": "5. Un nouveau type de régime",
        "text": "La révolution débouche sur un État qui prétend gouverner au nom du prolétariat, mais concentre rapidement le pouvoir autour du parti unique, de la police politique et d’une centralisation extrême."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "Soviet : conseil d’ouvriers, soldats ou paysans, apparu dans les crises révolutionnaires russes."
      },
      {
        "title": "Erreur fréquente",
        "text": "Confondre février et octobre. Février renverse le tsar ; octobre porte les bolcheviks au pouvoir."
      },
      {
        "title": "Question de fond",
        "text": "La révolution russe pose une tension durable : émancipation sociale proclamée, autoritarisme politique construit."
      }
    ],
    "quiz": [
      {
        "q": "Qu’est-ce qui fragilise le tsarisme en 1917 ?",
        "a": "La guerre, les pénuries, les grèves, les défaites et la perte de légitimité.",
        "why": "La révolution naît d’une crise d’État et de société.",
        "trap": "Tout expliquer par un complot bolchevique.",
        "evidence": "Le premier bloc."
      },
      {
        "q": "Quelle différence entre février et octobre ?",
        "a": "Février renverse le tsar ; octobre porte les bolcheviks au pouvoir.",
        "why": "Les deux moments n’ont pas les mêmes acteurs ni les mêmes conséquences.",
        "trap": "Fusionner les deux révolutions en un seul événement.",
        "evidence": "Le bloc “Erreur fréquente”."
      },
      {
        "q": "Pourquoi les slogans bolcheviks fonctionnent-ils ?",
        "a": "Ils répondent directement aux urgences : paix, terre, pain, pouvoir aux soviets.",
        "why": "Un slogan efficace condense des attentes sociales concrètes.",
        "trap": "Croire que l’idéologie seule suffit.",
        "evidence": "Le troisième bloc."
      },
      {
        "q": "Que se passe-t-il après octobre ?",
        "a": "Une guerre civile, la terreur, les réquisitions, la famine et la construction d’un État centralisé.",
        "why": "La prise du pouvoir ne stabilise pas le pays.",
        "trap": "Finir le récit le soir de la prise du palais d’Hiver.",
        "evidence": "Le quatrième bloc."
      },
      {
        "q": "Quelle tension politique naît de la révolution russe ?",
        "a": "Une émancipation sociale proclamée associée à une concentration autoritaire du pouvoir.",
        "why": "C’est un enjeu majeur du communisme soviétique.",
        "trap": "Ne voir que l’espoir ou que la dictature sans expliquer le lien historique.",
        "evidence": "Le dernier bloc et “Question de fond”."
      }
    ]
  },
  "second-world-war-detail-resistances-collaborations": {
    "hook": "Sous l’Occupation, personne ne vit dans un schéma simple héros/traîtres : contraintes, peur, intérêts, convictions et choix moraux se croisent brutalement.",
    "express": [
      "Résistance et collaboration ne sont pas seulement deux camps abstraits. Elles se déploient dans des situations concrètes : occupation militaire, pénuries, répression, propagande, antisémitisme d’État, surveillance et peur des représailles.",
      "La Résistance rassemble des profils divers : gaullistes, communistes, chrétiens, républicains, étrangers, réseaux de renseignement, maquis, presse clandestine, aides aux persécutés. Elle n’est pas massive dès 1940 et se transforme avec la guerre.",
      "Le piège est de juger tout le monde depuis la fin de l’histoire. Il faut comprendre les contraintes sans excuser les choix : collaborer, dénoncer, résister, attendre ou survivre n’ont ni les mêmes risques ni les mêmes responsabilités."
    ],
    "complete": [
      {
        "title": "1. L’Occupation comme cadre",
        "text": "La défaite, la présence allemande, Vichy, la propagande, les rationnements et la répression créent une situation où les choix sont rarement abstraits. Les possibilités d’action dépendent du lieu, du métier, du réseau et du moment."
      },
      {
        "title": "2. Collaborations multiples",
        "text": "Il existe une collaboration d’État, policière, économique, idéologique ou opportuniste. Vichy participe notamment à l’exclusion des Juifs et à la répression, ce qui engage une responsabilité politique propre."
      },
      {
        "title": "3. Résister : des gestes variés",
        "text": "Résister peut signifier imprimer un journal clandestin, transmettre un renseignement, cacher une personne, saboter, rejoindre un maquis ou organiser une filière. Tous les gestes n’ont pas la même visibilité ni le même danger."
      },
      {
        "title": "4. 1942-1944 : radicalisation",
        "text": "Le STO, les rafles, l’évolution militaire et la répression changent les comportements. Des jeunes rejoignent les maquis, les réseaux se structurent, mais les risques augmentent fortement."
      },
      {
        "title": "5. Mémoire et complexité",
        "text": "Après la guerre, les sociétés construisent des récits. Mettre en avant la Résistance peut aider à reconstruire l’unité nationale, mais risque aussi de masquer les collaborations et les persécutions."
      }
    ],
    "deeper": [
      {
        "title": "Repère",
        "text": "STO : Service du travail obligatoire, qui envoie des travailleurs français en Allemagne et pousse certains réfractaires vers les maquis."
      },
      {
        "title": "Erreur fréquente",
        "text": "Imaginer que la majorité de la population est immédiatement résistante ou collaboratrice militante. Entre les deux existent prudence, peur, attentisme, survie et ambiguïtés."
      },
      {
        "title": "Question morale",
        "text": "Comprendre les contraintes ne veut pas dire neutraliser les responsabilités. L’histoire explique sans effacer les choix."
      }
    ],
    "quiz": [
      {
        "q": "Pourquoi faut-il partir du cadre de l’Occupation ?",
        "a": "Parce que présence allemande, Vichy, répression, pénuries et propagande conditionnent les choix possibles.",
        "why": "Les comportements n’existent pas dans le vide.",
        "trap": "Jugement abstrait sans contexte.",
        "evidence": "Le premier bloc."
      },
      {
        "q": "Cite deux formes de collaboration.",
        "a": "Collaboration d’État, policière, économique, idéologique ou opportuniste.",
        "why": "Le phénomène est pluriel.",
        "trap": "Réduire la collaboration à quelques individus caricaturaux.",
        "evidence": "Le deuxième bloc."
      },
      {
        "q": "Cite deux gestes de résistance non militaires.",
        "a": "Presse clandestine, renseignement, cacher des persécutés, fausses cartes, filières d’évasion.",
        "why": "Résister ne signifie pas seulement prendre les armes.",
        "trap": "Confondre Résistance et maquis uniquement.",
        "evidence": "Le troisième bloc."
      },
      {
        "q": "Pourquoi le STO est-il important ?",
        "a": "Il pousse des réfractaires vers les maquis et modifie les engagements.",
        "why": "Une politique allemande/Vichy a des effets sociaux directs.",
        "trap": "Oublier les facteurs concrets d’entrée en résistance.",
        "evidence": "Le bloc “1942-1944”."
      },
      {
        "q": "Pourquoi la mémoire d’après-guerre est-elle délicate ?",
        "a": "Parce qu’elle peut valoriser la Résistance tout en masquant collaborations et persécutions.",
        "why": "La mémoire reconstruit un récit national.",
        "trap": "Confondre mémoire collective et histoire critique.",
        "evidence": "Le dernier bloc."
      }
    ]
  }
};

function quizKindFallback(index) {
  return ["concept", "preuve", "piège", "nuance", "synthèse"][index % 5];
}
function normalizeQuizPack(quiz = [], lesson = {}, content = {}) {
  const items = Array.isArray(quiz) ? quiz.slice(0, 5) : [];
  while (items.length < 5) items.push({ q: "Quelle idée faut-il retenir ?", a: content.hook || lesson.title || "Le sujet doit être relié à une trace concrète et à une nuance." });
  return items.map((item, index) => ({
    kind: item.kind || quizKindFallback(index),
    q: item.q || `Question ${index + 1}`,
    a: item.a || "Réponse à retrouver dans le cours.",
    why: item.why || "Cette question vérifie que tu as compris le mécanisme historique, pas seulement retenu un mot-clé.",
    trap: item.trap || "Répondre par une formule trop générale, sans date, lieu, acteur ou trace.",
    evidence: item.evidence || (content.ready ? "La réponse est explicitement formulée dans le cours." : "La réponse se trouve dans la version express ou dans le cours complet.")
  }));
}
function lessonKeyFacts(lesson = {}, content = {}) {
  const explicit = Array.isArray(content.keyFacts) ? content.keyFacts.filter(Boolean) : [];
  if (explicit.length) return explicit.slice(0, 5);
  const facts = [];
  if (content.period || lesson.period) facts.push(`Quand : ${content.period || lesson.period}`);
  if (content.place || lesson.location) facts.push(`Où : ${content.place || lesson.location}`);
  if (content.starter?.short) facts.push(`De quoi parle-t-on : ${content.starter.short}`);
  if (content.mystery?.answer) {
    const solved = Boolean(state.solvedMysteries?.[content.mystery.id]);
    facts.push(solved ? `Mystère lié : ${content.mystery.answer}` : "Mystère lié : masqué jusqu’à résolution");
  }
  if (content.profile?.actors) facts.push(`Qui regarder : ${content.profile.actors}`);
  if (content.profile?.traces) facts.push(`Sources utiles : ${content.profile.traces}`);
  return facts.slice(0, 5);
}
function lessonTakeaways(lesson = {}, content = {}) {
  const explicit = Array.isArray(content.takeaways) ? content.takeaways.filter(Boolean) : [];
  if (!explicit.length) return [];
  return explicit.slice(0, 5).map((item, index) => {
    const labels = ["Idée", "Repère", "Conséquence", "Nuance", "À retenir"];
    return typeof item === "string" ? { label: labels[index] || "À retenir", text: item } : { ...item, label: item.label || labels[index] || "À retenir" };
  });
}
function paragraphMarkup(text = "") {
  const parts = String(text || "").split(/\n\s*\n/).map(part => part.trim()).filter(Boolean);
  return (parts.length ? parts : [String(text || "").trim()].filter(Boolean)).map(part => `<p>${escapeHtml(part)}</p>`).join("");
}
function lessonTakeawayMarkup(takeaways = []) {
  const items = (takeaways || []).filter(item => item && item.text).slice(0, 5);
  if (!items.length) return "";
  return `<section class="lesson-retain-block"><h2>Ce qu’il faut retenir</h2><ul>${items.map(item => `<li><b>${escapeHtml(item.label || "À retenir")}</b><span>${escapeHtml(item.text)}</span></li>`).join("")}</ul></section>`;
}

const EDITORIAL_NOTE_BLOCKED_PATTERNS = [
  /pose quatre questions simples/i,
  /où \? quand \? qui agit/i,
  /squelette du cours/i,
  /le cours doit relier curiosité/i,
  /rattache toujours la réponse/i,
  /source : trace utilisée/i,
  /contexte : ensemble des conditions/i,
  /repère chronologique : période/i,
  /repère spatial : lieu/i,
  /n'est pas seulement “la bonne idée”/i,
  /n’est pas seulement “la bonne idée”/i,
  /ce point doit être lu comme un mécanisme/i,
  /traces concrètes : sources, objets, lieux/i
];

const EDITORIAL_NOTE_SIGNAL_PATTERNS = [
  /\b\d{3,4}\b/,
  /-\d{2,5}/,
  /\b[IVX]{1,5}e\b/i,
  /J\.-C\./i,
  /\b[A-ZÉÈÀÂÊÎÔÛÇ][a-zéèàâêîôûç]{3,}\b/,
  /:/,
  /;|—/,
  /site|source|trace|objet|inscription|traité|code|assemblée|fleuve|temple|palais|monnaie|tombe|écriture|tablette|relief|archive|texte|récit|route|port|bataille|roi|reine|citoyen|esclave|souveraineté|constitution|concile|saga|rune|linéaire|limon|tribut|dirham|thing/i
];

function editorialNoteIsConcrete(block = {}, lesson = {}, content = {}) {
  const title = String(block.title || "").trim();
  const text = String(block.text || block || "").trim();
  if (!title || !text || qualityWordCount(text) < 7) return false;
  const combined = `${title} ${text}`;
  if (EDITORIAL_NOTE_BLOCKED_PATTERNS.some(pattern => pattern.test(combined))) return false;
  if (/^(mot utile|méthode|methode|erreur fréquente|erreur frequente|bon réflexe|bon reflexe|question utile)$/i.test(title)) return false;
  if (EDITORIAL_NOTE_SIGNAL_PATTERNS.some(pattern => pattern.test(combined))) return true;
  const titleTokens = normalize(lesson.title || "").split(" ").filter(token => token.length >= 5);
  const haystack = normalize(combined);
  return titleTokens.some(token => haystack.includes(token));
}

function editorialNoteBlocks(content = {}, lesson = {}) {
  const raw = Array.isArray(content.deeper) ? content.deeper : [];
  return raw.filter(block => editorialNoteIsConcrete(block, lesson, content)).slice(0, 3);
}

function editorialNotesMarkup(content = {}, lesson = {}) {
  const notes = editorialNoteBlocks(content, lesson);
  if (!notes.length) return "";
  return `<section class="further-list notable-list"><h2>À noter</h2>${notes.map(block => `<details class="further"><summary>${escapeHtml(block.title)}</summary><p>${escapeHtml(block.text)}</p></details>`).join("")}</section>`;
}

function readyLessonPack(lesson, world, mystery, profile, context) {
  const rawPack = READY_LESSON_PACKS[lesson.id];
  if (!rawPack || !isPublishedLesson(lesson)) return null;
  const pack = publishedLessonPack(rawPack, lesson, world, profile, context);
  return {
    hook: pack.hook,
    keyFacts: pack.keyFacts,
    takeaways: pack.takeaways,
    express: pack.express,
    complete: pack.complete,
    deeper: pack.deeper,
    quiz: pack.quiz,
    ready: true,
    editorialStatus: pack.editorialStatus || "published"
  };
}
function readyLessonCount() { return curatedLessons().length; }
function readyLessons() { return curatedLessons(); }
function detectTopicProfile() {
  return null;
}

function buildLessonContent(lesson) {
  const world = lessonWorld(lesson);
  const mystery = relatedMysteryForLesson(lesson.id);
  const title = lesson.title || "Ce sujet";
  const period = lesson.period || world.timeframe || "";
  const place = lesson.location || world.subtitle || "";
  const ready = readyLessonPack(lesson, world, mystery, null, { title, period, place });
  if (ready) return { title, period, place, world, mystery, ...ready };
  return { title, period, place, world, mystery, unavailable: true, express: [], complete: [], deeper: [], quiz: [] };
}

function scrollLessonPart(focus) {
  const target = document.querySelector(`[data-focus-target="${focus}"]`);
  if (!target) return;
  if (target.tagName.toLowerCase() === "details") target.open = true;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}
function renderCourseUnavailable(lesson = {}) {
  const world = lessonWorld(lesson);
  renderShell(`<header class="topbar"><button data-back-learn>←</button><div><p class="eyebrow">${escapeHtml(world.title || "Parcours")}</p><h1>${lesson.emoji || "📜"} ${escapeHtml(lesson.title || "Cours")}</h1></div></header>
    <section class="card locked-course-card"><span class="card-label">À venir</span><h2>Ce parcours sera ajouté plus tard.</h2><p>Reviens au chapitre pour choisir un cours disponible dès maintenant.</p><div class="after-actions"><button data-back-learn>Retour au parcours</button><button class="ghost" data-go-home>Accueil</button></div></section>`);
  document.querySelectorAll("[data-back-learn]").forEach(btn => btn.addEventListener("click", () => setState({ tab: "learn", currentWorld: lessonWorldId(lesson.id), lessonFocus: null, lessonView: "express" })));
  document.querySelectorAll("[data-go-home]").forEach(btn => btn.addEventListener("click", () => setState({ tab: "home" })));
}
function renderLesson() {
  const lesson = allLessons().find(l => l.id === state.currentLessonId) || curatedLessonsFor(state.currentWorld)[0] || curatedLessons()[0];
  if (!lesson) return renderLearn();
  if (!isCuratedLesson(lesson)) return renderCourseUnavailable(lesson);
  if (lessonLockedByDailyMystery(lesson)) {
    renderShell(lessonLockMarkup(lesson));
    document.querySelectorAll("[data-back-learn]").forEach(btn => btn.addEventListener("click", () => setState({ tab: "learn", lessonFocus: null, lessonView: "express" })));
    $(`[data-open-daily-mystery]`)?.addEventListener("click", () => setState({ tab: "mystery", currentMysteryId: dailyMystery()?.id || null, currentMysteryDiscipline: activeDisciplineId() }));
    return;
  }
  const requestedLessonFocus = state.lessonFocus;
  if (requestedLessonFocus) {
    state.lessonView = ["express", "complete", "quiz"].includes(requestedLessonFocus) ? requestedLessonFocus : "express";
    state.lessonFocus = null;
    saveState();
  }
  if (!["express", "complete", "quiz"].includes(state.lessonView)) state.lessonView = "express";
  const content = buildLessonContent(lesson);
  if (content.unavailable) return renderCourseUnavailable(lesson);
  const quizPassed = lessonQuizPassed(lesson.id);
  const canComplete = lessonDone(lesson.id) || quizPassed;
  const footer = canComplete
    ? `<div class="lesson-validation-done"><b>✅ Cours validé</b><span>${lessonDone(lesson.id) ? "Progression enregistrée." : "Quiz réussi : validation en attente de synchronisation."}</span></div>`
    : ``;
  renderShell(`
    <header class="topbar lesson-full-topbar"><button data-back-learn>←</button><div><p class="eyebrow">${escapeHtml((typeof HISTO_WORLD_GROUPS !== "undefined" && Array.isArray(HISTO_WORLD_GROUPS) ? HISTO_WORLD_GROUPS.find(g => g.id === lessonWorld(lesson).group)?.title : "") || "Cours")} › ${escapeHtml(lessonWorld(lesson).title || "Parcours")} › ${escapeHtml(content.period)}</p><h1>${lesson.emoji || "📜"} ${escapeHtml(content.title)}</h1></div></header>
    <article class="card reading-card two-speed-course lesson-tabbed-card lesson-full-page">
      ${renderLessonText(lesson, content)}
      ${footer}
    </article>`);
  $("[data-back-learn]")?.addEventListener("click", () => setState({ tab: "learn", lessonFocus: null, lessonView: "express" }));
  $("[data-complete]")?.addEventListener("click", () => completeLesson(lesson.id));
  document.querySelectorAll("[data-quiz-choice]").forEach(btn => btn.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    handleQuizChoice(lesson.id, Number(btn.dataset.quizChoice), Number(btn.dataset.choiceIndex));
  }));
  $("[data-reset-quiz]")?.addEventListener("click", event => { event.preventDefault(); event.stopPropagation(); resetLessonQuiz(lesson.id); });
  document.querySelectorAll("[data-lesson-view]").forEach(btn => btn.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    const nextView = btn.dataset.lessonView;
    if (nextView && nextView !== state.lessonView) setState({ lessonView: nextView, lessonFocus: null });
  }));
  document.querySelectorAll("[data-reading-mode]").forEach(btn => btn.addEventListener("click", event => { event.stopPropagation(); setReadingMode(btn.dataset.readingMode); }));
  document.querySelectorAll("[data-open-linked-mystery]").forEach(btn => btn.addEventListener("click", event => { event.stopPropagation(); setState({ tab: "mystery", currentMysteryId: btn.dataset.openLinkedMystery, currentMysteryDiscipline: mysteryById(btn.dataset.openLinkedMystery) ? mysteryDisciplineId(mysteryById(btn.dataset.openLinkedMystery)) : activeDisciplineId() }); }));
  bindLessonDisclosureControls();
}
function bindLessonDisclosureControls() {
  document.querySelectorAll(".lesson-tabbed-card details").forEach(detail => {
    detail.addEventListener("click", event => event.stopPropagation());
    const summary = detail.querySelector("summary");
    if (summary) {
      summary.setAttribute("role", "button");
      summary.setAttribute("tabindex", "0");
      summary.addEventListener("click", event => event.stopPropagation());
      summary.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          detail.open = !detail.open;
        }
      });
    }
  });
}
function lessonMemoMarkup(lesson, content, takeaways, quizItems) {
  const mystery = content.mystery || relatedMysteryForLesson(lesson.id);
  const control = quizItems[0] || {};
  const proof = takeaways.find(item => /trace|preuve|indice/i.test(item.label || "")) || takeaways[1] || takeaways[0];
  const trap = takeaways.find(item => /erreur|pi[eè]ge|nuance/i.test(item.label || "")) || takeaways[2] || takeaways[0];
  return `<section class="lesson-memo-card" aria-label="Fiche mémo">
    <div class="section-title-row"><h2>🧠 Fiche mémo</h2><small>à relire avant le quiz</small></div>
    <div class="memo-grid">
      <div><b>Idée à maîtriser</b><span>${escapeHtml(proof?.text || proof || "Appuie ta réponse sur un élément du cours.")}</span></div>
      <div><b>Nuance importante</b><span>${escapeHtml(trap?.text || trap || "Garde une réponse située et précise.")}</span></div>
    </div>
    <details class="memo-question"><summary>Question de contrôle</summary><p>${escapeHtml(control.q || "Quelle idée faut-il retenir ?")}</p><p>Retrouve la réponse dans le cours puis vérifie-toi avec le quiz final.</p></details>
    ${mystery && isAccessibleMystery(mystery.id) ? `<button class="ghost wide" data-open-linked-mystery="${escapeHtml(mystery.id)}">🕵️ Revoir le mystère lié</button>` : ""}
  </section>`;
}

function lessonView() {
  return ["express", "complete", "quiz"].includes(state.lessonView) ? state.lessonView : "express";
}
function lessonTabButton(view, label, sub) {
  const active = lessonView() === view ? "active" : "";
  return `<button data-lesson-view="${view}" class="${active}"><b>${label}</b><span>${sub}</span></button>`;
}
function quizSeed(value = "") {
  let h = 2166136261;
  String(value).split("").forEach(ch => { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); });
  return h >>> 0;
}
function seededShuffle(items = [], seed = 1) {
  const arr = items.slice();
  let x = seed || 1;
  for (let i = arr.length - 1; i > 0; i -= 1) {
    x = (Math.imul(x, 1664525) + 1013904223) >>> 0;
    const j = x % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function compactAnswer(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}
function choiceLooksLikeQuestionAnswer(question = "") {
  const q = safeLower(question);
  if (/^pourquoi|en quoi|comment/.test(q)) return "why";
  if (/^que signifie|qu.est-ce|c.est quoi|définis|definis/.test(q)) return "definition";
  if (/^quelle trace|quelles traces|quelle source|quelles sources|que montre|que donnent/.test(q)) return "trace";
  if (/^où|ou situer|où situer|quel espace|dans quel espace/.test(q)) return "place";
  if (/^quand|à quel siècle|a quel siecle|quelle date|à quelle date|a quelle date/.test(q)) return "time";
  if (/^quels acteurs|qui/.test(q)) return "actors";
  if (/signifie-t-elle|signifie-t-il|forment-ils|forment-elles|est-il|est-elle|sont-ils|sont-elles|doit-il|doit-elle/.test(q)) return "yesno";
  if (/piège|piege|erreur|éviter|eviter|cliché|cliche|anachronisme/.test(q)) return "trap";
  if (/quelle idée|idée retenir|idee retenir|retenir|méthode|methode/.test(q)) return "takeaway";
  return "general";
}
function cleanWrongChoice(text = "") {
  return compactAnswer(String(text || "")
    .replace(/^Mauvaise piste\s*:\s*/i, "")
    .replace(/^Piège\s*:\s*/i, "")
    .replace(/^Répondre par\s+/i, "Réduire la réponse à ")
    .replace(/^Réciter\s+/i, "Réciter seulement ")
    .replace(/^Confondre\s+/i, "Confondre ")
    .replace(/^Imaginer\s+/i, "Imaginer ")
    .replace(/^Croire\s+/i, "Croire ")
    .trim());
}
function courseDistractorBank(lesson = {}, content = {}) {
  const worldId = lessonWorld(lesson)?.id || content.worldId || "";
  const title = safeLower(`${lesson.title || content.title || ""} ${lesson.id || ""}`);
  const banks = {
    prehistory: [
      "Des villes avec écriture, palais et impôts dès le Paléolithique.",
      "Une agriculture installée avant les premiers outils de pierre.",
      "Des royaumes centralisés dirigés par des rois dès Homo habilis.",
      "Une vie déjà entièrement urbaine, sans chasse ni cueillette.",
      "Des humains qui ne dépendraient ni des saisons ni des ressources locales.",
      "Une évolution identique partout, au même rythme et sans adaptations régionales."
    ],
    civilizations: [
      "Des villages sans villes, sans écriture et sans administration.",
      "Un pouvoir limité à la famille, sans temples, palais ni scribes.",
      "Des échanges réduits à une seule vallée, sans réseaux entre régions.",
      "Une société sans surplus agricoles ni spécialisation du travail.",
      "Une organisation qui ne dépendrait ni des fleuves ni des récoltes.",
      "Des chefs sans archives, sans impôts et sans lieux de pouvoir."
    ],
    "aegean-mediterranean": [
      "Une Égée sans palais, sans archives et sans circulation maritime.",
      "Des cités démocratiques déjà organisées comme Athènes au Ve siècle.",
      "Un monde isolé de la Crète, du continent grec et du Levant.",
      "Des palais qui ne stockeraient ni biens, ni archives, ni produits agricoles.",
      "Une crise expliquée par un seul événement, sans fragilités multiples.",
      "Une Méditerranée sans ports, sans échanges et sans contacts entre élites."
    ],
    egypt: [
      "Une Égypte sans crue du Nil, sans scribes et sans administration royale.",
      "Un pouvoir limité à quelques villages, sans temples ni monuments.",
      "Une société qui ne dépendrait ni du fleuve ni des récoltes.",
      "Des pharaons sans rituels, sans armée et sans contrôle des ressources.",
      "Un royaume isolé, sans contacts avec la Nubie, le Levant ou la Méditerranée.",
      "Des pyramides construites sans organisation du travail ni pouvoir royal."
    ],
    greece: [
      "Une Grèce unifiée en un seul État centralisé dès l’époque archaïque.",
      "Des cités sans citoyens, sans assemblées ni rivalités politiques.",
      "Une victoire qui supprimerait aussitôt toutes les tensions entre Grecs.",
      "Des guerres qui ne mobiliseraient ni alliances, ni flottes, ni hoplites.",
      "Une démocratie où tous les habitants auraient exactement les mêmes droits.",
      "Des mythes et sanctuaires sans rôle dans l’identité des cités."
    ],
    rome: [
      "Une Rome déjà impériale dès ses premiers villages.",
      "Une conquête sans alliances, sans citoyens et sans tensions sociales.",
      "Une République sans magistrats, sans Sénat et sans conflits politiques.",
      "Un Empire qui naîtrait sans armée, sans fiscalité et sans provinces.",
      "Des guerres qui n’auraient aucun effet sur les institutions romaines.",
      "Une christianisation immédiate, sans débats ni transformations progressives."
    ],
    "northern-viking-worlds": [
      "Des Scandinaves tous installés dans de grandes villes, sans fermes ni ports.",
      "Des raids impossibles parce que les navires ne pourraient pas remonter les fleuves.",
      "Une christianisation immédiate, identique dans tout le Nord.",
      "Un monde viking sans commerce, sans argent pesé et sans esclaves.",
      "Des croyances résumées à un seul dieu et à un seul destin après la mort.",
      "Des assemblées locales absentes de toute décision ou règlement de conflit."
    ],
    "atlantic-revolutions": [
      "Une monarchie absolue qui sortirait renforcée sans changement politique.",
      "Une souveraineté qui resterait entièrement attachée au roi.",
      "Des droits proclamés sans débat sur citoyens, privilèges et nation.",
      "Une révolution limitée à la cour, sans villes, clubs ni mobilisation populaire.",
      "Une crise financière sans lien avec les impôts et les privilèges.",
      "Une France qui ne serait pas touchée par la guerre européenne."
    ],
    revolutions: [
      "Une monarchie absolue qui sortirait renforcée sans changement politique.",
      "Une Déclaration qui maintiendrait les privilèges et l’inégalité juridique.",
      "Une République sans guerre, sans mobilisation et sans conflit intérieur.",
      "Un Empire sans armée, sans administration et sans guerre européenne.",
      "Une Europe de 1815 revenue exactement à la situation de 1788.",
      "Une crise de 1789 limitée à une mauvaise récolte, sans dette ni privilèges."
    ],
    "world-wars": [
      "Une guerre limitée à un seul front, sans mobilisation des sociétés.",
      "Des civils totalement absents des violences et des choix politiques.",
      "Une Russie restée stable, sans révolution ni guerre civile.",
      "Des traités de paix sans frontières redessinées ni tensions nouvelles.",
      "Une économie qui continuerait comme avant malgré la guerre totale.",
      "Des soldats isolés des décisions des États et des empires."
    ],
    "second-world-war-detail": [
      "Des sociétés occupées où personne n’aurait à choisir, subir ou s’adapter.",
      "Une collaboration limitée à quelques détails administratifs sans conséquences.",
      "Une résistance uniforme, visible partout de la même manière dès 1940.",
      "Des civils totalement séparés de la guerre, des pénuries et de la répression.",
      "Une occupation sans police, sans propagande et sans contraintes quotidiennes.",
      "Une libération sans mémoire conflictuelle ni débats après-guerre."
    ]
  };
  if (title.includes("nil") || title.includes("pharaon") || title.includes("pyramide") || title.includes("ramses") || title.includes("qadesh")) return banks.egypt;
  if (title.includes("viking") || title.includes("nord") || title.includes("scandinav") || title.includes("rune") || title.includes("saga")) return banks["northern-viking-worlds"];
  if (title.includes("rome") || title.includes("romain") || title.includes("punique") || title.includes("auguste")) return banks.rome;
  if (title.includes("athenes") || title.includes("sparte") || title.includes("grec") || title.includes("medique")) return banks.greece;
  if (title.includes("révolution") || title.includes("revolution") || title.includes("napoleon") || title.includes("1789")) return banks.revolutions;
  return banks[worldId] || [
    "Un changement présenté comme immédiat, identique partout et sans étapes.",
    "Une réponse qui inverse la chronologie du cours.",
    "Un acteur unique présenté comme responsable de toute l’évolution.",
    "Un lieu ou une période voisins, mais hors du cadre étudié.",
    "Une explication qui oublie les sources et les traces citées.",
    "Une conclusion séduisante, mais contraire aux exemples du cours."
  ];
}

function qtypeDistractors(item = {}, lesson = {}, content = {}) {
  const qtype = choiceLooksLikeQuestionAnswer(item.q || "");
  if (qtype === "time") return ["Plusieurs siècles après la période étudiée.", "À une date qui inverse causes et conséquences."];
  if (qtype === "place") return ["Dans un espace voisin, mais extérieur au cadre du cours.", "Dans une région sans lien direct avec les traces citées."];
  if (qtype === "definition") return ["Un simple surnom, sans mécanisme historique derrière.", "Une définition qui confond le mot avec une période voisine."];
  if (qtype === "trace") return ["Un récit tardif isolé, non croisé avec les traces du cours.", "Une tradition ou une image célèbre, mais sans appui dans le dossier."];
  if (qtype === "actors") return ["Un seul personnage qui déciderait de tout sans groupes sociaux.", "Des acteurs d’une autre période plaqués sur ce contexte."];
  if (qtype === "trap") return ["Retenir seulement l’image la plus connue en oubliant les nuances.", "Confondre deux périodes parce que les noms se ressemblent."];
  if (qtype === "takeaway") return ["Choisir l’anecdote la plus spectaculaire au lieu du mécanisme central.", "Retenir seulement un nom propre sans expliquer son rôle."];
  return ["Un changement présenté comme automatique et uniforme.", "Une explication qui ignore le lieu, la période et les acteurs."];
}

function topicWrongChoiceSet(item = {}, lesson = {}, content = {}, index = 0) {
  const choices = [];
  const add = text => {
    const clean = cleanWrongChoice(text);
    if (!clean || normalize(clean) === normalize(item.a || item.answer || "")) return;
    if (qualityWordCount(clean) < 4 || clean.length > 170) return;
    if (!choices.some(v => normalize(v) === normalize(clean))) choices.push(clean);
  };
  const bank = courseDistractorBank(lesson, content);
  const universal = [
    `Une datation placée hors de ${content.period || "la période du cours"}.`,
    `Un lieu confondu avec ${content.place || "un espace voisin"}.`,
    "Un exemple spectaculaire qui n’est pas celui du cours.",
    "Une évolution présentée comme immédiate alors qu’elle est progressive.",
    "Un groupe social absent du cours présenté comme acteur principal.",
    "Une interprétation contraire aux traces citées dans la leçon.",
    "Une conséquence placée avant sa cause.",
    "Un résumé qui oublie le pouvoir, les ressources ou les conflits."
  ];
  const fullBank = [...bank, ...qtypeDistractors(item, lesson, content), ...universal];
  const shuffled = seededShuffle(fullBank, quizSeed(`${lesson.id || lesson.title}-distractors`));
  const rotated = shuffled.slice((index * 3) % shuffled.length).concat(shuffled.slice(0, (index * 3) % shuffled.length));
  rotated.forEach(add);
  const trap = cleanWrongChoice(item.trap || "");
  if (trap && trap.length >= 18 && trap.length <= 150 && !/r[eé]pondre par|formule trop g[eé]n[eé]rale|mot-cl[eé]|rep[eè]res/i.test(trap)) add(trap);
  return choices.slice(0, 6);
}

function genericWrongChoices(item = {}, lesson = {}, content = {}, index = 0) {
  return topicWrongChoiceSet(item, lesson, content, index);
}
function quizChoicesFor(item = {}, quizItems = [], lesson = {}, content = {}, index = 0) {
  const correct = compactAnswer(item.a || item.answer || "Réponse à retrouver dans le cours.");
  const fromItem = Array.isArray(item.choices) ? item.choices : [];
  const generated = genericWrongChoices(item, lesson, content, index);
  const pool = [correct, ...fromItem, ...generated]
    .map(compactAnswer)
    .filter(Boolean);
  const unique = [];
  const seen = new Set();
  pool.forEach(text => {
    const key = normalize(text);
    if (!key || seen.has(key)) return;
    seen.add(key);
    unique.push({ text, correct: normalize(text) === normalize(correct) });
  });
  if (!unique.some(choice => choice.correct)) unique.unshift({ text: correct, correct: true });
  const correctChoice = unique.find(choice => choice.correct);
  const wrongChoices = unique.filter(choice => !choice.correct && choice.text.length <= 190).slice(0, 6);
  const four = [correctChoice, ...wrongChoices].filter(Boolean).slice(0, 4);
  while (four.length < 4) {
    const fallback = genericWrongChoices(item, lesson, content)[four.length] || "Une réponse voisine mais trop vague pour être juste.";
    const clean = compactAnswer(fallback);
    if (!four.some(choice => normalize(choice.text) === normalize(clean))) four.push({ text: clean, correct: false });
    else four.push({ text: `Une réponse incomplète sur ${safeLower(lesson.title || content.title || "le sujet")}.`, correct: false });
  }
  return seededShuffle(four, quizSeed(`${lesson.id || content.title}-${index}-${item.q || correct}`));
}
function quizProgressForLesson(lessonId, total = 5) {
  const progress = lessonQuizState(lessonId);
  const correctCount = Object.values(progress.correct || {}).filter(Boolean).length;
  const answeredCount = Object.keys(progress.answers || {}).length;
  const threshold = lessonQuizPassThreshold(total);
  return { ...progress, correctCount, answeredCount, total, threshold, passed: Boolean(progress.passed || (answeredCount >= total && correctCount >= threshold)) };
}
function quizItemMarkup(item, index, quizItems, lesson, content) {
  const progress = lessonQuizState(lesson.id);
  const selected = progress.answers?.[index];
  const selectedIsNumber = Number.isInteger(selected);
  const correctMap = progress.correct || {};
  const choices = quizChoicesFor(item, quizItems, lesson, content, index);
  const selectedChoice = selectedIsNumber ? choices[selected] : null;
  const isCorrect = Boolean(correctMap[index]);
  const isLocked = selectedIsNumber || Boolean(progress.passed) || lessonDone(lesson.id);
  const wrongSelected = selectedIsNumber && selectedChoice && !selectedChoice.correct;
  const status = isCorrect ? "correct" : wrongSelected ? "wrong" : "open";
  return `<article class="quiz-card ${status}">
    <div class="quiz-question-head"><b>${index + 1}</b><div>${item.kind ? `<em>${escapeHtml(item.kind)}</em>` : ""}<h3>${escapeHtml(item.q)}</h3></div></div>
    <div class="quiz-choices" role="group" aria-label="Question ${index + 1}">
      ${choices.map((choice, choiceIndex) => {
        const chosen = selected === choiceIndex;
        const cls = chosen ? (choice.correct ? "selected correct" : "selected wrong") : "";
        return `<button type="button" class="quiz-choice ${cls}" data-quiz-choice="${index}" data-choice-index="${choiceIndex}" ${isLocked ? "disabled" : ""}><span>${String.fromCharCode(65 + choiceIndex)}</span>${escapeHtml(choice.text)}</button>`;
      }).join("")}
    </div>
    ${isCorrect ? `<p class="quiz-result good"><b>Correct.</b> ${escapeHtml(item.why || "Tu as retrouvé l’idée importante du cours.")}</p>${item.evidence ? `<p class="quiz-evidence"><strong>À retrouver :</strong> ${escapeHtml(item.evidence)}</p>` : ""}` : wrongSelected ? `<p class="quiz-result bad"><b>Raté.</b> La réponse ne colle pas au cours. Recommence le quiz si le score final ne suffit pas ; je ne donne pas la correction complète ici.</p>${item.trap ? `<p class="quiz-trap"><strong>Piège :</strong> ${escapeHtml(item.trap)}</p>` : ""}` : `<p class="quiz-result neutral">Choisis une réponse. Tu fais le quiz comme une vraie étape : une réponse par question, puis score final.</p>`}
  </article>`;
}
function handleQuizChoice(lessonId, questionIndex, choiceIndex) {
  const lesson = allLessons().find(l => l.id === lessonId);
  if (!lesson) return;
  const content = buildLessonContent(lesson);
  const quizItems = normalizeQuizPack(content.quiz, lesson, content);
  const item = quizItems[questionIndex];
  if (!item) return;
  const key = String(lessonId);
  const progress = lessonQuizState(key);
  if (Number.isInteger(progress.answers?.[questionIndex]) || progress.passed || lessonDone(lesson.id)) return;
  const choices = quizChoicesFor(item, quizItems, lesson, content, questionIndex);
  const choice = choices[choiceIndex];
  if (!choice) return;
  const answers = { ...(progress.answers || {}), [questionIndex]: choiceIndex };
  const correct = { ...(progress.correct || {}) };
  if (choice.correct) correct[questionIndex] = true;
  const correctCount = Object.values(correct).filter(Boolean).length;
  const answeredCount = Object.keys(answers).length;
  const threshold = lessonQuizPassThreshold(quizItems.length);
  const passed = answeredCount >= quizItems.length && correctCount >= threshold;
  const failed = answeredCount >= quizItems.length && !passed;
  const nextQuizState = { ...progress, answers, correct, attempts: (progress.attempts || 0) + 1, passed };
  const quizProgress = { ...(state.quizProgress || {}), [key]: nextQuizState };
  const newlyCompleted = passed && !lessonDone(lesson.id);
  const completedLessons = newlyCompleted ? { ...(state.completedLessons || {}), [lesson.id]: true } : state.completedLessons;
  const achievements = newlyCompleted ? { ...(state.achievements || {}), firstLesson: true } : state.achievements;
  const xpGain = newlyCompleted ? (lesson?.xp || 55) : 0;
  const quizFeedback = { ...(state.quizFeedback || {}), [key]: passed ? `Quiz réussi : ${correctCount}/${quizItems.length}. Cours validé automatiquement.` : failed ? `Score : ${correctCount}/${quizItems.length}. Il faut au moins ${threshold}/${quizItems.length} pour valider.` : choice.correct ? `${correctCount}/${quizItems.length} bonne(s) réponse(s). Continue.` : `Réponse fausse. Continue le quiz : validation à ${threshold}/${quizItems.length}.` };
  setState({ quizProgress, quizFeedback, completedLessons, achievements, xp: state.xp + xpGain, lessonView: "quiz", lessonFocus: null });
  if (xpGain) showXPToast(xpGain, "leçon validée");
}
function resetLessonQuiz(lessonId) {
  const quizProgress = { ...(state.quizProgress || {}) };
  const quizFeedback = { ...(state.quizFeedback || {}) };
  delete quizProgress[String(lessonId)];
  delete quizFeedback[String(lessonId)];
  setState({ quizProgress, quizFeedback, lessonView: "quiz", lessonFocus: null });
}
function cleanCompleteBlockForDisplay(block = {}) {
  const title = String(block?.title || "").trim();
  let contentText = String(block?.text || block || "").trim();
  if (!title || !contentText) return null;
  const blocked = /Ce point doit être lu comme un mécanisme|Garde toujours quatre questions|rattache cette partie|traces concrètes : sources|une bonne réponse historique n’est pas seulement|une bonne réponse historique n'est pas seulement|Le raccourci à éviter|en cinq phrases : le cadre/i;
  if (blocked.test(`${title} ${contentText}`)) return null;
  contentText = contentText
    .replace(/\s*Ce point doit être lu comme un mécanisme[^.]+\./gi, "")
    .replace(/\s*Pour ne pas rester dans la formule[^.]+\./gi, "")
    .replace(/\s*Une trace ne parle jamais toute seule[^.]+\./gi, "")
    .replace(/\s*La bonne maîtrise n’est pas de réciter tout le cours[^.]+\./gi, "")
    .trim();
  if (qualityWordCount(contentText) < 18) return null;
  return { title, text: contentText };
}

function expandedCompleteBlocks(lesson = {}, content = {}) {
  const base = Array.isArray(content.complete) ? content.complete.filter(Boolean) : [];
  const cleaned = base.map(cleanCompleteBlockForDisplay).filter(Boolean);
  if (content.ready) return cleaned.slice(0, 10);
  // Les cours non publiés ne doivent plus être gonflés automatiquement : si le texte source est faible,
  // il reste indisponible dans l’interface au lieu d’être maquillé par du remplissage.
  return cleaned.slice(0, 8);
}

function renderLessonText(lesson, content) {
  const fastLabel = content.mystery ? "Après le mystère" : "Lecture rapide";
  const keyFacts = lessonKeyFacts(lesson, content);
  const takeaways = lessonTakeaways(lesson, content);
  const quizItems = normalizeQuizPack(content.quiz, lesson, content);
  const view = lessonView();
  const keyFactsMarkup = keyFacts.length ? `<div class="key-facts"><b>Repères clés</b>${keyFacts.map(fact => `<span>${escapeHtml(fact)}</span>`).join("")}</div>` : "";
  const progressForHeader = quizProgressForLesson(lesson.id, quizItems.length);
  const tabs = view === "quiz"
    ? `<section class="lesson-choice-panel quiz-flow-panel" aria-label="Quiz final">
      <div><span class="card-label">Étape finale</span><h2>Quiz final</h2><p>Réponds aux 5 questions. Le cours se valide automatiquement à ${progressForHeader.threshold}/${quizItems.length} bonnes réponses ou plus.</p></div>
      <div class="lesson-view-tabs">
        ${lessonTabButton("express", "⚡ Relire express", "court")}
        ${lessonTabButton("complete", "📚 Relire complet", "5 min")}
      </div>
    </section>`
    : `<section class="lesson-choice-panel" aria-label="Choisir le format du cours">
      <div><span class="card-label">Choisis ton format</span><h2>${view === "complete" ? "Cours complet" : "Cours express"}</h2><p>${view === "complete" ? "Une vraie lecture d’environ 5 minutes, avec contexte, acteurs, traces, pièges et synthèse." : "Le format court : dates, lieux, acteurs et exemple concret. Tu peux basculer vers le complet si tu veux plus d’infos."}</p></div>
      <div class="lesson-view-tabs">
        ${lessonTabButton("express", "⚡ Express", "court")}
        ${lessonTabButton("complete", "📚 Complet", "5 min")}
      </div>
    </section>`;
  const intro = `<section class="lesson-hook">
      <span class="card-label">${content.ready ? "⭐ Cours prêt" : fastLabel}</span>
      <p>${escapeHtml(content.hook)}</p>
      <div class="lesson-meta"><span>${content.ready ? "⭐ cours prêt" : "🧭 cours guidé"}</span><span>⚡ express court</span><span>📚 lecture complète</span><span>✅ quiz obligatoire</span></div>
    </section>`;
  if (view === "complete") {
    const completeBlocks = expandedCompleteBlocks(lesson, content);
    const estimatedMinutes = Math.max(4, Math.min(7, Math.round(completeBlocks.map(block => block.text || "").join(" ").split(/\s+/).filter(Boolean).length / 180)));
    return `${intro}${tabs}
      <section class="text-block express-block compact-reminder"><div class="section-title-row"><h2>Avant de creuser</h2><small>repères</small></div>${keyFactsMarkup || ""}<p>${escapeHtml(content.express[0] || content.hook)}</p></section>
      <section class="complete-course-panel" data-focus-target="complete">
        <div class="section-title-row"><h2>📚 Cours complet</h2><small>${estimatedMinutes} min de lecture</small></div>
        ${completeBlocks.map(block => `<section class="text-block deep-reading-block"><h2>${escapeHtml(block.title)}</h2><div class="deep-reading-text">${paragraphMarkup(block.text)}</div></section>`).join("")}
      </section>
      ${lessonTakeawayMarkup(takeaways)}
      <section class="lesson-next-choice"><button type="button" data-lesson-view="quiz">✅ Continuer vers le quiz</button></section>`;
  }
  if (view === "quiz") {
    const progress = quizProgressForLesson(lesson.id, quizItems.length);
    const feedback = state.quizFeedback?.[lesson.id] || state.quizFeedback?.[String(lesson.id)] || "";
    return `${intro}${tabs}${keyFactsMarkup}
      <section class="quiz-section isolated-quiz final-quiz" data-focus-target="quiz">
        <div class="section-title-row"><h2>Quiz final · 5 questions</h2><small>${progress.correctCount}/${quizItems.length} bonnes · seuil ${progress.threshold}/${quizItems.length}</small></div>
        <div class="quiz-coach"><b>Passage obligé</b><span>Le cours se valide automatiquement si tu fais au moins 80 %, soit ${progress.threshold}/${quizItems.length} bonnes réponses.</span></div>
        ${feedback ? `<p class="quiz-global-feedback ${progress.passed ? "good" : ""}">${escapeHtml(feedback)}</p>` : ""}
        ${quizItems.map((item, index) => quizItemMarkup(item, index, quizItems, lesson, content)).join("")}
        <div class="quiz-footer">
          <button type="button" class="ghost" data-reset-quiz>${progress.passed ? "Refaire pour réviser" : "Recommencer le quiz"}</button>
          ${progress.passed ? `<span class="quiz-auto-valid">✅ Cours validé automatiquement</span>` : progress.answeredCount >= quizItems.length ? `<span>Score insuffisant : ${progress.correctCount}/${quizItems.length}. Recommence pour valider.</span>` : `<span>Encore ${quizItems.length - progress.answeredCount} question(s) à faire.</span>`}
        </div>
      </section>`;
  }
  const expressBits = Array.isArray(content.express) && content.express.length ? content.express.slice(0, 3) : [content.hook || "Sujet à replacer dans son contexte."];
  const labels = Array.isArray(content.expressLabels) && content.expressLabels.length
    ? content.expressLabels
    : ["Le sujet", "Ce qui change", "La nuance"];
  const remember = content.deeper?.find(block => /question de fond|ce qu|erreur fréquente|date à connaître/i.test(block.title || ""))?.text
    || content.complete?.at(-1)?.text
    || content.hook
    || expressBits.at(-1);
  const expressCards = expressBits.map((bit, index) => `<div><b>${index + 1} · ${escapeHtml(labels[index] || `Point ${index + 1}`)}</b><p>${escapeHtml(bit)}</p></div>`).join("");
  const memoCard = "";
  return `${intro}${tabs}
    <section class="express-coach-card" data-focus-target="express">
      <div class="section-title-row"><div><span class="card-label">⚡ Express</span><h2>Express</h2></div><small>utile et concret</small></div>
      ${keyFactsMarkup}
      <div class="express-steps clean-express">${expressCards}${memoCard}</div>
    </section>
    <section class="lesson-next-choice"><button type="button" data-lesson-view="complete" class="ghost">📚 Passer au cours complet</button><button type="button" data-lesson-view="quiz">✅ Continuer vers le quiz</button></section>`;
}

function renderMystery() {
  const mystery = currentMystery();
  if (!mystery) return renderShell(`<div class="card"><p>Aucun mystère chargé.</p></div>`);
  const lesson = mystery?.lessonId ? curatedLessonById(mystery.lessonId) : null;
  const hints = Math.min(state.seenHints[mystery.id] || 0, (mystery.clues || []).length);
  const tries = state.mysteryTries[mystery.id] || 0;
  const solved = mysterySolved(mystery.id);
  const solvedData = state.solvedMysteries[mystery.id] || {};
  const feedback = state.mysteryFeedback?.[mystery.id];
  const rewardLine = state.rewardFeedback?.[mystery.id] || "";
  const stats = mysteryStats();
  const today = isTodayMystery(mystery.id);
  const claim = todayClaim();
  const reward = dailyRewardPreview();
  const archives = archiveEntries();
  renderShell(`
    <header class="topbar"><button data-home>←</button><div><p class="eyebrow">Mystère ${today ? "du jour" : "d’archive"} · ${stats.solved}/${stats.total} résolus</p><h1>${escapeHtml(mysteryDisplayTitle(mystery))}</h1></div></header>
    <section class="card mystery-card big quick-mystery case-file-card">
      <div class="card-label">${difficultyStars(mystery.difficulty)} · ${difficultyLabel(mystery.difficulty)} · ${today ? (solved ? "quotidien terminé" : `quotidien · +${reward.gems} 💎`) : "archive débloquée"}</div>
      <p class="case-title-hidden">${escapeHtml(mystery.caseTitle || "Sujet à identifier")}</p>
      <p class="prompt">${escapeHtml(mysteryPublicPrompt(mystery))}</p>
      <div class="mystery-meter"><span>🧠 réponse précise</span><span>💡 ${hints}/${Math.min(3, (mystery.clues || []).length)} indices choisis</span><span>🎯 ${tries} essai${tries > 1 ? "s" : ""}</span><span>⭐ ${mysteryScore(mystery.id)} XP possible</span></div>
      ${!solved ? `<div class="score-explain"><b>Barème clair</b><span>indice choisi : -${SCORE_PENALTY_HINT} XP potentiel · essai supplémentaire : -${SCORE_PENALTY_EXTRA_TRY} XP · aucune aide donnée automatiquement</span></div>${scoreBreakdownMarkup(mystery.id)}` : ""}
      <div class="hints">${(mystery.clues || []).slice(0, hints).map((c, index) => `<p><b>${escapeHtml(mysteryHintLabels()[index] || `Indice ${index + 1}`)}</b> · ${escapeHtml(c)}</p>`).join("")}</div>
      ${feedback && !solved ? `<p class="guess-feedback">${escapeHtml(feedback)}</p>` : ""}
      ${solved ? `<div class="solution"><strong>${escapeHtml(mystery.answer)}</strong>${mysterySolvedTitleLine(mystery)}<p>${escapeHtml(mystery.explanation || "")}</p><div class="score-pill">Score : ${solvedData.score || 90} XP · ${solvedData.hints || 0} indice(s) · ${solvedData.tries || tries || 1} essai(s)</div>${scoreBreakdownMarkup(mystery.id)}${rewardLine ? `<p class="reward-feedback">${escapeHtml(rewardLine)}</p>` : ""}${shareResultMarkup(mystery.id)}${scoreSyncMarkup(mystery.id)}<div class="after-actions"><button data-go-rank>Voir le classement</button><button class="ghost" data-open-profile-after>Profil</button></div></div>` : `<form class="guess" data-guess><label class="sr-only" for="mystery-guess">Réponse au mystère</label><input id="mystery-guess" name="mysteryGuess" data-guess-input type="text" autocomplete="off" autocapitalize="sentences" spellcheck="false" inputmode="text" enterkeyhint="done" placeholder="Ta réponse…" /><button type="submit" data-guess-submit>Valider</button></form><button class="ghost wide" data-hint>${hints ? "Indice suivant (-20 XP potentiel)" : "Choisir un indice (-20 XP potentiel)"}</button><p class="microcopy">Une mauvaise réponse ne donne jamais d’indice. Tu peux tenter plusieurs fois, ou choisir toi-même d’en prendre un en sacrifiant du score. Les gemmes viennent du mystère quotidien, pas des archives.</p>`}
    </section>
    ${solved && lesson ? `<section class="card after-mystery">
      <div class="card-label">Après le mystère</div>
      <h2>${lesson.emoji || "📜"} ${escapeHtml(lesson.title)}</h2>
      <p>Tu as débloqué la porte d’entrée. Maintenant tu choisis : stop, résumé express, ou cours complet. Rien n’est imposé.</p>
      <div class="after-actions">
        <button class="ghost" data-home-stop>Je m’arrête là</button>
        <button data-open-lesson="${escapeHtml(lesson.id)}" data-focus="express">⚡ Résumé 1 min</button>
        <button data-open-lesson="${escapeHtml(lesson.id)}" data-focus="complete">📚 Cours complet</button>
      </div>
    </section>` : ""}
    <section class="card mystery-progress-card daily-loop-card">
      <div class="card-label">Rendez-vous quotidien</div>
      <h2>${solved && today ? "Dossier du jour terminé" : today ? "Un dossier par jour" : "Archive ouverte"}</h2>
      <p>${solved && today ? `C’est volontaire : pas de binge. Nouveau dossier dans ${timeToNextDaily()}, avec une nouvelle chance de marquer fort.` : "Le mystère principal reste celui du jour. Les archives sont un rattrapage limité, pas un mode infini."}</p>
      <div class="mystery-progress-grid">
        <div><strong>${stats.solved}/${stats.total}</strong><span>mystères résolus</span></div>
        <div><strong>${state.gems || 0} 💎</strong><span>gemmes dispo</span></div>
        <div><strong>${state.streak || 0}</strong><span>série quotidienne</span></div>
      </div>
    </section>
    ${archiveBacklogMarkup()}
    <section class="mystery-shelf archive-shelf" data-archive-shelf>
      <div class="section-title-row"><h2>Archives récentes</h2><small>${archiveUnlockedCount()} ouverte(s) · ${ARCHIVE_UNLOCK_COST} 💎 par dossier</small></div>
      ${state.archiveFeedback ? `<p class="archive-feedback">${escapeHtml(state.archiveFeedback)}</p>` : ""}
      ${archives.map(entry => archiveCard(entry)).join("")}
    </section>
    <section class="card small-leader social-teaser"><div class="section-title-row"><h2>Classement du jour</h2><button class="ghost mini-button" data-go-rank>Voir</button></div>${leaderboardRows("daily").slice(0,5).map(row => `<div><span>${row.rank}. ${escapeHtml(row.name)}</span><strong>${row.score}</strong></div>`).join("")}</section>`);
  $("[data-home]")?.addEventListener("click", () => setState({ tab: "home" }));
  $("[data-home-stop]")?.addEventListener("click", () => setState({ tab: "home" }));
  const guessForm = $("[data-guess]");
  guessForm?.addEventListener("submit", submitGuess);
  $("[data-guess-submit]")?.addEventListener("click", event => {
    event.stopPropagation();
    if (guessForm?.requestSubmit) guessForm.requestSubmit();
    else submitGuess({ preventDefault() {}, stopPropagation() {}, currentTarget: guessForm });
  });
  const guessInput = $("[data-guess-input]");
  if (guessInput) {
    ["pointerdown", "mousedown", "click", "touchstart"].forEach(type => guessInput.addEventListener(type, event => event.stopPropagation(), { passive: true }));
    guessInput.addEventListener("click", event => { event.currentTarget.focus(); });
    guessInput.addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); guessForm?.requestSubmit ? guessForm.requestSubmit() : submitGuess({ preventDefault() {}, stopPropagation() {}, currentTarget: guessForm }); } });
    if (window.matchMedia && window.matchMedia("(pointer: fine)").matches) setTimeout(() => guessInput.focus({ preventScroll: true }), 90);
  }
  $("[data-hint]")?.addEventListener("click", () => revealHint(mystery.id));
  document.querySelectorAll("[data-share-result]").forEach(btn => btn.addEventListener("click", () => shareMysteryResult(btn.dataset.shareResult)));
  document.querySelectorAll("[data-open-lesson]").forEach(btn => btn.addEventListener("click", () => setState({
    tab: "lesson",
    currentLessonId: btn.dataset.openLesson,
    lessonFocus: btn.dataset.focus || "express",
    lessonView: btn.dataset.focus || "express"
  })));
  document.querySelectorAll("[data-open-mystery-id]").forEach(btn => btn.addEventListener("click", () => setState({ currentMysteryId: btn.dataset.openMysteryId, currentMysteryDiscipline: mysteryById(btn.dataset.openMysteryId) ? mysteryDisciplineId(mysteryById(btn.dataset.openMysteryId)) : activeDisciplineId(), archiveFeedback: "" })));
  document.querySelectorAll("[data-unlock-mystery]").forEach(btn => btn.addEventListener("click", () => unlockPastMystery(btn.dataset.unlockMystery)));
  $(`[data-scroll-archives]`)?.addEventListener("click", () => $(`[data-archive-shelf]`)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  $(`[data-go-rank]`)?.addEventListener("click", () => setState({ tab: "rank", rankScope: "daily" }));
  $(`[data-open-profile-after]`)?.addEventListener("click", () => setState({ tab: "profile" }));
}
function archiveCard({ mystery, offset }) {
  const solved = mysterySolved(mystery.id);
  const unlocked = isUnlockedMystery(mystery.id);
  const accessible = isAccessibleMystery(mystery.id);
  const label = solved ? "résolu" : unlocked ? "débloqué" : `J-${offset}`;
  return `<article class="card mystery-mini archive-mini tap-card ${solved ? "solved" : ""} ${!accessible ? "locked" : ""}">
    <div><span class="difficulty-pill">${difficultyStars(mystery.difficulty)} ${difficultyLabel(mystery.difficulty)} · ${label}</span><h3>${escapeHtml(accessible ? mysteryDisplayTitle(mystery) : (mystery.caseTitle || "Dossier verrouillé"))}</h3><p>${escapeHtml(short(mysteryTeaser(mystery), 118))}</p></div>
    ${accessible ? `<button data-open-mystery-id="${escapeHtml(mystery.id)}">${solved ? "Revoir" : "Ouvrir"}</button>` : `<button data-unlock-mystery="${escapeHtml(mystery.id)}">Débloquer · ${ARCHIVE_UNLOCK_COST} 💎</button>`}
  </article>`;
}
function scopeLabel(scope = state.rankScope || "daily") {
  return ({ daily: "Aujourd’hui", week: "Cette semaine", year: "Année", friends: "Amis" })[scope] || "Aujourd’hui";
}
function rangeForScope(scope = "daily") {
  const now = new Date();
  const todayStart = startOfLocalDay(now.getTime());
  if (scope === "week") {
    const d = new Date(todayStart);
    const day = d.getDay() || 7;
    d.setDate(d.getDate() - day + 1);
    d.setHours(0, 0, 0, 0);
    return { start: d.getTime(), end: todayStart + DAY_MS };
  }
  if (scope === "year") {
    const d = new Date(now.getFullYear(), 0, 1);
    return { start: d.getTime(), end: todayStart + DAY_MS };
  }
  return { start: todayStart, end: todayStart + DAY_MS };
}
function scoreForScope(scope = "daily") {
  const { start, end } = rangeForScope(scope);
  return Object.values(state.solvedMysteries || {}).reduce((sum, item) => {
    const at = Number(item.at || 0);
    return at >= start && at < end ? sum + (item.score || 0) : sum;
  }, 0);
}
function solvedCountForScope(scope = "daily") {
  const { start, end } = rangeForScope(scope);
  return Object.values(state.solvedMysteries || {}).filter(item => {
    const at = Number(item.at || 0);
    return at >= start && at < end;
  }).length;
}
function leaderboardSeed(scope = "daily") { return []; }
function remoteLeaderboardRows(scope = state.rankScope || "daily") {
  const bucket = state.serverLeaderboards?.[scope];
  if (!Array.isArray(bucket) || !bucket.length) return [];
  return bucket.map(row => {
    const friendCodeValue = normalizeFriendCode(row.friendCode || row.friend_code || row.friend_code_canonical || "");
    const id = row.id || row.player_id || row.playerId || friendCodeValue || row.pseudo;
    return {
      id,
      playerId: row.player_id || row.playerId || id,
      friendCode: friendCodeValue,
      name: row.name || row.pseudo || "Joueur",
      avatar: String(row.name || row.pseudo || "J").trim().charAt(0).toUpperCase() || "J",
      score: Number(row.score || 0),
      level: Number(row.level || 1),
      xp: Number(row.xp || 0),
      solved: Number(row.solved || row.solved_count || 0),
      streak: Number(row.streak || 0),
      hints: row.hints,
      tries: row.tries,
      daily: scope === "daily" || scope === "friends" ? Number(row.score || 0) : 0,
      week: scope === "week" ? Number(row.score || 0) : 0,
      year: scope === "year" ? Number(row.score || 0) : 0,
      badges: ["En ligne"],
      server: true
    };
  }).filter(row => row.id && row.score > 0);
}
function leaderboardRows(scope = state.rankScope || "daily") {
  const remote = remoteLeaderboardRows(scope);
  if (remote.length) {
    const me = myPlayerProfile();
    const myScore = scoreForScope(scope);
    const myCode = normalizeFriendCode(friendCode());
    const alreadyMe = remote.some(row => row.playerId === me.id || row.id === me.id || normalizeFriendCode(row.friendCode) === myCode);
    const rows = alreadyMe || myScore <= 0 ? remote : [...remote, { ...me, score: myScore, localOnly: true }];
    return rows
      .sort((a, b) => b.score - a.score || String(a.name).localeCompare(String(b.name), "fr"))
      .map((row, index) => ({ ...row, rank: index + 1, me: row.playerId === me.id || row.id === me.id || normalizeFriendCode(row.friendCode) === myCode }));
  }
  return leaderboardPlayers(scope)
    .map(player => ({ ...player, name: player.name, score: scoreOfPlayer(player, scope) }))
    .filter(row => Number(row.score || 0) > 0)
    .sort((a, b) => b.score - a.score || String(a.name).localeCompare(String(b.name), "fr"))
    .map((row, index) => ({ ...row, rank: index + 1, me: String(row.id) === String(playerIdMe()) }));
}
async function fetchServerLeaderboard(scope = "daily", { force = false } = {}) {
  if (!isOnline) return;
  const now = Date.now();
  const status = state.serverLeaderboardStatus?.[scope] || {};
  if (!force && status.loadedAt && now - status.loadedAt < 45000) return;
  if (leaderboardFetchInFlight.has(scope)) return;
  leaderboardFetchInFlight.add(scope);
  state.serverLeaderboardStatus = { ...(state.serverLeaderboardStatus || {}), [scope]: { ...status, loading: true } };
  queueSaveState(250);
  try {
    const friends = Object.values(state.friends || {});
    const friendCodes = friends.map(friend => friend.code || friend.id).filter(Boolean).join(",");
    const friendIds = friends.map(friend => friend.playerId || friend.friend_player_id).filter(Boolean).join(",");
    const response = await fetch(`/api/v1/leaderboard/daily?scope=${encodeURIComponent(scope)}&periodKey=${encodeURIComponent(localDayKey())}&playerId=${encodeURIComponent(playerIdMe())}&friendCodes=${encodeURIComponent(friendCodes)}&friendIds=${encodeURIComponent(friendIds)}&_=${Date.now()}`, { cache: "no-store" });
    const json = await response.json().catch(() => ({}));
    const mode = json?.mode || "unknown";
    const rows = Array.isArray(json?.rows) ? json.rows : [];
    const softFailure = !response.ok || json?.ok === false || mode === "supabase-error" || mode === "error";
    if (!softFailure) {
      state.serverLeaderboards = { ...(state.serverLeaderboards || {}), [scope]: rows };
    }
    state.serverLeaderboardStatus = { ...(state.serverLeaderboardStatus || {}), [scope]: { loading: false, loadedAt: Date.now(), mode: softFailure ? "error" : mode, note: softFailure ? "Classement en ligne indisponible : dernier score connu conservé." : (json?.note || "") } };
    queueSaveState(250);
    if (state.tab === "rank" && (state.rankScope || "daily") === scope) render();
  } catch (error) {
    state.serverLeaderboardStatus = { ...(state.serverLeaderboardStatus || {}), [scope]: { loading: false, loadedAt: Date.now(), mode: "error", note: "Classement en ligne indisponible : dernier score connu conservé." } };
    queueSaveState(250);
  } finally {
    leaderboardFetchInFlight.delete(scope);
  }
}
function ensureServerLeaderboard(scope = "daily") { fetchServerLeaderboard(scope).catch(() => {}); }
function normalizeFriendCode(value = "") {
  return String(value || "").trim().toUpperCase().replace(/\s+/g, "").replace(/[^A-Z0-9-]/g, "");
}
function friendCodeSuffix(value = "") {
  const parts = normalizeFriendCode(value).split("-").filter(Boolean);
  return parts[parts.length - 1] || "";
}
function mergeServerFriends(rows = []) {
  if (!Array.isArray(rows) || !rows.length) return false;
  const friends = { ...(state.friends || {}) };
  let changed = false;
  rows.forEach(row => {
    const serverFriend = normalizeServerFriend(row);
    if (!serverFriend?.code) return;
    const suffix = friendCodeSuffix(serverFriend.code);
    Object.keys(friends).forEach(key => {
      const existingSuffix = friendCodeSuffix(friends[key]?.code || key);
      if (suffix && existingSuffix === suffix && key !== serverFriend.id) {
        delete friends[key];
        changed = true;
      }
    });
    const previous = friends[serverFriend.id] || {};
    const next = { ...previous, ...serverFriend, syncedAt: Date.now() };
    if (JSON.stringify(previous) !== JSON.stringify(next)) changed = true;
    friends[serverFriend.id] = next;
  });
  if (changed) state.friends = friends;
  return changed;
}
function normalizeServerFriend(row = {}) {
  const code = normalizeFriendCode(row.friend_code || row.friendCode || row.code || row.id || "");
  if (!code || code === normalizeFriendCode(friendCode())) return null;
  const parsed = parseFriendCode(code);
  const pseudo = sanitizePseudo(row.profile_pseudo || row.pseudo || row.friend_pseudo || row.friendPseudo || row.name || parsed?.pseudo || "Ami");
  const id = code;
  return {
    id,
    code,
    playerId: row.friend_player_id || row.player_id || row.playerId || "",
    name: pseudo || "Ami",
    level: Number(row.level || 1),
    xp: Number(row.xp || 0),
    solved: Number(row.solved_count || row.solved || 0),
    streak: Number(row.streak || 0),
    daily: Number(row.daily || row.score || 0),
    week: Number(row.week || 0),
    year: Number(row.year || 0),
    server: true
  };
}
async function fetchServerFriends({ force = false } = {}) {
  if (!isOnline || friendsFetchInFlight) return;
  const now = Date.now();
  const status = state.serverFriendsStatus || {};
  if (!force && status.loadedAt && now - status.loadedAt < 45000) return;
  friendsFetchInFlight = true;
  state.serverFriendsStatus = { ...status, loading: true };
  queueSaveState(250);
  try {
    const response = await fetch(`/api/v1/friends/sync?playerId=${encodeURIComponent(playerIdMe())}&_=${Date.now()}`, { cache: "no-store" });
    const json = await response.json();
    const changed = mergeServerFriends(json?.friends || []);
    state.serverFriendsStatus = { loading: false, loadedAt: Date.now(), mode: json?.mode || "unknown", message: json?.message || "" };
    if (changed) {
      state.serverLeaderboards = { ...(state.serverLeaderboards || {}), friends: [] };
      state.serverLeaderboardStatus = { ...(state.serverLeaderboardStatus || {}), friends: { loadedAt: 0, mode: "refresh", note: "Liste d’amis actualisée." } };
      fetchServerLeaderboard("friends", { force: true }).catch(() => {});
    }
    queueSaveState(250);
    if (state.tab === "profile" || state.tab === "rank") render();
  } catch {
    state.serverFriendsStatus = { loading: false, loadedAt: Date.now(), mode: "error", message: "Amis en ligne indisponibles." };
    queueSaveState(250);
  } finally {
    friendsFetchInFlight = false;
  }
}
function ensureServerFriends() { fetchServerFriends().catch(() => {}); }
function userRank(scope = "daily") {
  return leaderboardRows(scope).find(row => row.me)?.rank || 999;
}
function renderRank() {
  const scope = state.rankScope || "daily";
  ensureServerLeaderboard(scope);
  if (scope === "friends") ensureServerFriends();
  const rows = leaderboardRows(scope);
  const myScore = scoreForScope(scope);
  const mySolved = solvedCountForScope(scope);
  const me = rows.find(row => row.me);
  const isFriends = scope === "friends";
  renderShell(`<header class="topbar"><button data-home>←</button><div><p class="eyebrow">Classements</p><h1>${scopeLabel(scope)}</h1></div></header>
    <section class="tabs-clean rank-tabs">
      <button data-rank-scope="daily" class="${scope === "daily" ? "active" : ""}">Aujourd’hui</button>
      <button data-rank-scope="week" class="${scope === "week" ? "active" : ""}">Semaine</button>
      <button data-rank-scope="year" class="${scope === "year" ? "active" : ""}">Année</button>
      <button data-rank-scope="friends" class="${scope === "friends" ? "active" : ""}">Amis</button>
    </section>
    <section class="card social-rank-hero"><div><span class="card-label">Classement</span><h2>${isFriends ? "Tes amis seulement" : "Classement général"}</h2><p>${isFriends ? socialStatusLine() : leaderboardIntroText(scope)}</p></div><button data-open-profile>${state.pseudo || "Profil"}</button></section>
    ${socialBackendMarkup()}
    <section class="card rank-summary">
      <div><span>Ton score</span><strong>${myScore} XP</strong></div>
      <div><span>Mystères comptés</span><strong>${mySolved}</strong></div>
      <div><span>Ta place</span><strong>#${me?.rank || "—"}</strong></div>
    </section>
    ${scope === "week" ? weeklyScoreMarkup() : ""}
    ${scope === "daily" ? recentDailyCalendarMarkup({ compact: true }) : ""}
    <section class="card leaderboard leaderboard-modern">${rows.length ? rows.map(row => `<button class="rank-row ${row.me ? "me" : ""}" data-view-profile="${escapeHtml(row.id)}"><span>${row.rank}</span><strong>${escapeHtml(row.name)}</strong><em>${row.score} XP</em></button>`).join("") : emptyRankMarkup(scope)}</section>
    ${scope === "daily" ? `<p class="rank-note">Le score du jour récompense surtout : résoudre sans indice, avec peu d’essais.</p>` : ""}
    ${scope === "week" ? `<p class="rank-note">La semaine additionne les mystères résolus depuis lundi.</p>` : ""}
    ${scope === "year" ? `<p class="rank-note">L’année cumulera les scores réels enregistrés. Aucun profil fictif n’est ajouté.</p>` : ""}
    ${isFriends ? `${addFriendMarkup()}${friendListMarkup()}` : `<p class="rank-note muted-note">Le classement affiche les scores reçus en ligne, plus ton score local si tu viens de jouer.</p>`}`);
  $(`[data-home]`)?.addEventListener("click", () => setState({ tab: "home" }));
  $(`[data-open-profile]`)?.addEventListener("click", () => setState({ tab: "profile" }));
  document.querySelectorAll("[data-rank-scope]").forEach(btn => btn.addEventListener("click", () => setState({ rankScope: btn.dataset.rankScope })));
  document.querySelectorAll("[data-view-profile]").forEach(btn => btn.addEventListener("click", () => viewProfile(btn.dataset.viewProfile)));
  document.querySelectorAll("[data-remove-friend]").forEach(btn => btn.addEventListener("click", event => { event.stopPropagation(); removeFriend(btn.dataset.removeFriend); }));
  $(`[data-add-friend]`)?.addEventListener("submit", addFriend);
  $(`[data-share-invite]`)?.addEventListener("click", shareInviteCode);
  $(`[data-copy-invite-link]`)?.addEventListener("click", copyInviteLink);
  $(`[data-refresh-social]`)?.addEventListener("click", () => { fetchServerFriends({ force: true }).catch(() => {}); ["daily", "week", "year", "friends"].forEach(scope => fetchServerLeaderboard(scope, { force: true }).catch(() => {})); });
}
function difficultyStars(difficulty = "moyen") {
  if (difficulty === "facile") return "★☆☆";
  if (difficulty === "difficile") return "★★★";
  if (difficulty === "expert") return "★★★★";
  return "★★☆";
}
function difficultyLabel(difficulty = "moyen") {
  if (difficulty === "facile") return "accessible";
  if (difficulty === "difficile") return "difficile";
  if (difficulty === "expert") return "expert";
  return "corsé";
}
function unlockedAchievements() { return Object.values(state.achievements).filter(Boolean).length; }


const DEMO_PLAYERS = [];

function playerIdMe() { return `me-${localUserId()}`; }
function myPlayerProfile() {
  return {
    id: playerIdMe(),
    name: state.pseudo || "Invité",
    avatar: String(state.pseudo || "I").trim().charAt(0).toUpperCase() || "I",
    bio: "Ton profil local HistoDaily.",
    level: level(),
    xp: state.xp || 0,
    solved: Object.keys(state.solvedMysteries || {}).length,
    streak: state.streak || 0,
    badges: myBadges(),
    daily: scoreForScope("daily"),
    week: scoreForScope("week"),
    year: scoreForScope("year"),
    me: true,
    friend: true
  };
}
function myBadges() {
  const badges = [];
  if (state.achievements?.noHint) badges.push("Sans indice");
  if ((state.streak || 0) >= 3) badges.push("Série");
  if (Object.keys(state.solvedMysteries || {}).length) badges.push("Mystère");
  if (!badges.length) badges.push("Débutant");
  return badges.slice(0, 3);
}
function stableHash(value = "") {
  let h = 0;
  String(value).split("").forEach(ch => { h = ((h << 5) - h + ch.charCodeAt(0)) | 0; });
  return Math.abs(h);
}
function friendCodeFromRawInput(raw = "") {
  let value = String(raw || "").trim();
  if (!value) return "";
  try {
    const url = new URL(value, (typeof location !== "undefined" && location.origin) ? location.origin : "https://histodaily.vercel.app");
    const queryCode = url.searchParams.get("friend") || url.searchParams.get("addFriend") || url.searchParams.get("invite");
    if (queryCode) value = queryCode;
  } catch {}
  value = value
    .replace(/^(code\s*ami|mon\s*code\s*ami|ajoute[-\s]*moi|invitation)\s*[:：-]?\s*/i, "")
    .replace(/^https?:\/\/\S*?\?/, "?");
  const queryMatch = value.match(/[?&](?:friend|addFriend|invite)=([^&\s]+)/i);
  if (queryMatch) value = decodeURIComponent(queryMatch[1]);
  return normalizeFriendCode(value);
}
function parseFriendCode(raw = "") {
  const cleaned = friendCodeFromRawInput(raw);
  if (!cleaned) return null;
  const full = cleaned.match(/^([A-Z0-9À-Ý-]{2,18})-([A-Z0-9]{4,10})$/i);
  if (full) {
    const pseudo = full[1].replace(/-/g, " ").slice(0, 18);
    const id = `${full[1]}-${full[2]}`.toUpperCase();
    return { id, pseudo: pseudo.charAt(0) + pseudo.slice(1).toLowerCase(), code: id, suffix: full[2].toUpperCase(), partial: false };
  }
  const suffixOnly = cleaned.match(/^[A-Z0-9]{4,10}$/i);
  if (suffixOnly) {
    const suffix = suffixOnly[0].toUpperCase();
    const id = `INVITE-${suffix}`;
    return { id, pseudo: "Ami", code: id, suffix, partial: true };
  }
  return null;
}
function friendProfileFromCode(code, pseudoOverride, meta = {}) {
  const normalizedCode = normalizeFriendCode(code || meta.code || meta.id || "");
  const parsed = parseFriendCode(normalizedCode) || { id: normalizedCode || String(code || ""), pseudo: pseudoOverride || "Ami", code: normalizedCode };
  const name = sanitizePseudo(meta.name || meta.pseudo || pseudoOverride || parsed.pseudo || "Ami");
  return {
    id: normalizedCode || parsed.id,
    playerId: meta.playerId || meta.friend_player_id || "",
    code: normalizedCode || parsed.code || parsed.id,
    name,
    avatar: String(name || "A").charAt(0).toUpperCase(),
    bio: meta.server ? "Ami ajouté. Ses stats se mettent à jour quand ses scores arrivent." : "Ami ajouté par code. Ses stats apparaîtront quand son score sera partagé.",
    level: Number(meta.level || 1),
    xp: Number(meta.xp || 0),
    solved: Number(meta.solved || meta.solved_count || 0),
    streak: Number(meta.streak || 0),
    badges: meta.server ? ["Ami", "En ligne"] : ["Ami"],
    daily: Number(meta.daily || 0),
    week: Number(meta.week || 0),
    year: Number(meta.year || 0),
    friend: true,
    pendingServerStats: !meta.server
  };
}
function friendProfiles() {
  return Object.values(state.friends || {}).map(friend => friendProfileFromCode(friend.code || friend.id, friend.name, friend));
}
function allKnownPlayers() { return [myPlayerProfile(), ...friendProfiles()]; }
function profileById(id) {
  const direct = allKnownPlayers().find(p => p.id === id || p.playerId === id || normalizeFriendCode(p.code) === normalizeFriendCode(id));
  if (direct) return direct;
  const remote = Object.values(state.serverLeaderboards || {}).flatMap(rows => Array.isArray(rows) ? rows : [])
    .map(row => remoteLeaderboardRowsForSingle(row))
    .find(p => p.id === id || p.playerId === id || normalizeFriendCode(p.friendCode) === normalizeFriendCode(id));
  return remote || myPlayerProfile();
}
function remoteLeaderboardRowsForSingle(row = {}) {
  const friendCodeValue = normalizeFriendCode(row.friendCode || row.friend_code || "");
  const name = row.name || row.pseudo || "Joueur";
  return {
    id: row.id || row.player_id || friendCodeValue || name,
    playerId: row.player_id || row.playerId || "",
    code: friendCodeValue,
    friendCode: friendCodeValue,
    name,
    avatar: String(name).charAt(0).toUpperCase(),
    bio: "Profil issu du classement en ligne.",
    level: Number(row.level || 1),
    xp: Number(row.xp || 0),
    solved: Number(row.solved || row.solved_count || 0),
    streak: Number(row.streak || 0),
    badges: ["En ligne"],
    daily: Number(row.score || 0),
    week: Number(row.score || 0),
    year: Number(row.score || 0),
    friend: Boolean(friendCodeValue && state.friends?.[friendCodeValue]),
    server: true
  };
}
function knownFriendByCode(code = "") {
  const normalized = normalizeFriendCode(code);
  const suffix = friendCodeSuffix(normalized);
  return Object.values(state.friends || {}).find(friend => {
    const friendCodeValue = normalizeFriendCode(friend.code || friend.id || "");
    return friendCodeValue === normalized || (suffix && friendCodeSuffix(friendCodeValue) === suffix);
  }) || null;
}
function addFriend(event) {
  event.preventDefault();
  const input = event.target.querySelector("input");
  const parsed = parseFriendCode(input?.value || "");
  if (!parsed) return setState({ friendFeedback: "Code ami invalide. Format attendu : PSEUDO-ABC123." });
  if (normalizeFriendCode(parsed.id) === normalizeFriendCode(friendCode())) return setState({ friendFeedback: "C’est ton propre code. Partage-le, mais ne l’ajoute pas à tes amis." });
  const already = knownFriendByCode(parsed.code);
  if (already) return setState({ friendFeedback: `${already.name || parsed.pseudo} est déjà dans tes amis.` });
  const friend = { id: parsed.id, code: parsed.code, name: parsed.pseudo, addedAt: Date.now() };
  const friends = { ...(state.friends || {}), [parsed.id]: friend };
  if (input) input.value = "";
  setState({ friends, friendFeedback: `${parsed.pseudo} ajouté. Synchronisation en cours…` });
  syncMyProfileToServer({ source: "friend-add" }).catch(() => {});
  syncFriendToServer(friend).catch(error => setState({ friendFeedback: `${parsed.pseudo} ajouté sur cet appareil, mais pas partagé en ligne : ${error?.message || "connexion indisponible"}.` }));
}
async function syncFriendToServer(friend) {
  if (!isOnline || !friend?.code) return;
  const response = await fetch("/api/v1/friends/sync", {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playerId: playerIdMe(), pseudo: currentPseudo(), myFriendCode: friendCode(), friendCode: friend.code, friendPseudo: friend.name })
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok || json?.ok === false || json?.mode === "supabase-error") throw new Error(json?.message || json?.note || `HTTP ${response.status}`);
  const changed = mergeServerFriends(json?.friends || []);
  state.serverFriendsStatus = { loading: false, loadedAt: Date.now(), mode: json?.mode || "unknown", message: json?.message || "" };
  state.friendFeedback = json?.mode === "supabase" ? `${friend.name || "Ami"} ajouté. Ses scores apparaîtront quand ils seront reçus.` : `${friend.name || "Ami"} ajouté sur cet appareil. ${json?.message || "Connexion en ligne inactive."}`;
  if (changed) state.serverLeaderboards = { ...(state.serverLeaderboards || {}), friends: [] };
  saveState();
  fetchServerLeaderboard("friends", { force: true }).catch(() => {});
  if (state.tab === "profile" || state.tab === "rank") render();
}
async function deleteFriendFromServer(friend) {
  if (!isOnline || !friend?.code) return;
  const response = await fetch("/api/v1/friends/sync", {
    method: "DELETE",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playerId: playerIdMe(), friendCode: friend.code, friendPlayerId: friend.playerId || friend.friend_player_id || "" })
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok || json?.ok === false || json?.mode === "supabase-error") throw new Error(json?.message || json?.note || `HTTP ${response.status}`);
  state.serverFriendsStatus = { loading: false, loadedAt: Date.now(), mode: json?.mode || "unknown", message: json?.message || "" };
  mergeServerFriends(json?.friends || []);
}
function removeFriend(id) {
  const friends = { ...(state.friends || {}) };
  const friend = friends[id];
  const name = friend?.name || "Ami";
  delete friends[id];
  state.serverLeaderboards = { ...(state.serverLeaderboards || {}), friends: [] };
  state.serverLeaderboardStatus = { ...(state.serverLeaderboardStatus || {}), friends: { loadedAt: 0, mode: "local", note: "Ami retiré." } };
  setState({ friends, friendFeedback: `${name} retiré des amis.` });
  deleteFriendFromServer(friend).then(() => {
    fetchServerLeaderboard("friends", { force: true }).catch(() => {});
  }).catch(() => {
    state.friendFeedback = `${name} retiré sur cet appareil. La liste en ligne se mettra à jour au prochain rafraîchissement.`;
    queueSaveState(250);
    if (state.tab === "profile" || state.tab === "rank") render();
  });
}
function viewProfile(id) { setState({ tab: "publicProfile", selectedProfileId: id || playerIdMe() }); }
function scoreOfPlayer(player, scope = "daily") {
  if (player.me) return scoreForScope(scope);
  if (scope === "week") return player.week || 0;
  if (scope === "year") return player.year || 0;
  return player.daily || 0;
}
function leaderboardPlayers(scope = "daily") {
  const me = myPlayerProfile();
  const friends = friendProfiles();
  if (scope === "friends") return [me, ...friends];
  return [me, ...friends];
}
function socialStatusLine() {
  const count = friendProfiles().length;
  return count ? `${count} ami${count > 1 ? "s" : ""} ajouté${count > 1 ? "s" : ""} · scores du jour` : "Ajoute un ami par code pour comparer le mystère du jour";
}
function emptyRankMarkup(scope = "daily") {
  if (scope === "friends") return `<div class="empty-rank"><h2>Aucun score ami aujourd’hui</h2><p>Ajoute un ami puis comparez vos scores après le mystère du jour.</p></div>`;
  return `<div class="empty-rank"><h2>Aucun score pour l’instant</h2><p>Résous le mystère du jour pour remplir ce classement.</p></div>`;
}
function friendListMarkup({ compact = false } = {}) {
  const friends = friendProfiles();
  if (!friends.length) return `<section class="card empty-friends-card"><span class="card-label">Amis</span><h2>Aucun ami ajouté</h2><p>Partage ton code avec quelqu’un, ou colle le code qu’il t’envoie pour l’ajouter.</p></section>`;
  return `<section class="card friends-list-card"><div class="section-title-row"><div><span class="card-label">Amis</span><h2>${friends.length} profil${friends.length > 1 ? "s" : ""}</h2></div><small>sans chat</small></div>${friends.slice(0, compact ? 3 : 20).map(friend => `<div class="friend-row"><button type="button" class="friend-main" data-view-profile="${escapeHtml(friend.id)}"><span class="avatar tiny">${escapeHtml(friend.avatar)}</span><span><strong>${escapeHtml(friend.name)}</strong><em>Niv. ${friend.level} · ${friend.solved} mystères · ${escapeHtml(friendComparison(friend))}</em></span></button><button class="ghost mini-button" data-remove-friend="${escapeHtml(friend.id)}">Retirer</button></div>`).join("")}</section>`;
}
function addFriendMarkup() {
  return `<section class="card add-friend-card"><div><span class="card-label">Ajouter un ami</span><h2>Code ami</h2><p>Ajoute un code ami pour comparer vos scores et retrouver son profil.</p></div><form data-add-friend class="friend-add-form"><input placeholder="CODE AMI" autocapitalize="characters" autocomplete="off"/><button>Ajouter</button></form><div class="friend-code"><strong>${escapeHtml(friendCode())}</strong><button type="button" data-share-invite>Partager mon code</button></div>${state.friendFeedback ? `<p class="profile-feedback">${escapeHtml(state.friendFeedback)}</p>` : ""}</section>`;
}
function publicProfileMarkup(player) {
  const badges = (player.badges || []).slice(0, 4);
  return `<section class="card public-profile-card ${player.me ? "me" : ""}"><div class="public-profile-head"><div class="avatar xl">${escapeHtml(player.avatar || "?")}</div><div><span class="card-label">${player.me ? "Ton profil" : player.friend ? "Ami" : "Joueur"}</span><h2>${escapeHtml(player.name)}</h2><p>${escapeHtml(player.bio || "Profil HistoDaily.")}</p></div></div><div class="public-stats-grid"><div><strong>Niv. ${player.level}</strong><span>Niveau</span></div><div><strong>${player.xp}</strong><span>XP</span></div><div><strong>${player.solved}</strong><span>Mystères</span></div><div><strong>${player.streak}</strong><span>Série</span></div></div><div class="badge-line">${badges.map(b => `<span>${escapeHtml(b)}</span>`).join("")}</div></section>`;
}

function sanitizePseudo(value = "") {
  return String(value).trim().replace(/\s+/g, " ").slice(0, 18);
}

function currentPseudo() {
  const fromInput = document.querySelector("[data-pseudo-input]")?.value;
  const pseudo = sanitizePseudo(fromInput || state.pseudo || "");
  return pseudo && !/^invité$/i.test(pseudo) ? pseudo : "Invité";
}
function pseudoInputValue(event) {
  const target = event?.target || event?.currentTarget || null;
  const form = target?.closest?.("form") || document.querySelector("[data-pseudo-form]");
  const input = document.querySelector("[data-pseudo-input]") || form?.querySelector("input[name='pseudo']") || target;
  return input?.value || "";
}
function savePseudoValue(rawValue, { source = "normal" } = {}) {
  const pseudo = sanitizePseudo(rawValue);
  if (pseudo.length < 3) {
    const input = document.querySelector("[data-pseudo-input]");
    input?.focus?.();
    setState({ profileFeedback: "Choisis un pseudo d’au moins 3 caractères." });
    return false;
  }
  const nextState = mergeState(defaultState, { ...state, pseudo, profileFeedback: `Pseudo enregistré : ${pseudo}` });
  state = nextState;
  state.serverLeaderboards = {};
  state.serverLeaderboardStatus = {};
  saveState();
  syncMyProfileToServer({ source }).then(() => {
    fetchServerFriends({ force: true }).catch(() => {});
    ["daily", "week", "year", "friends"].forEach(scope => fetchServerLeaderboard(scope, { force: true }).catch(() => {}));
  }).catch(() => {});
  render();
  return true;
}
function updatePseudo(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  return savePseudoValue(pseudoInputValue(event), { source: "form" });
}
function promptPseudoEdit() {
  const value = window.prompt("Ton pseudo HistoDaily", state.pseudo || "");
  if (value === null) return;
  savePseudoValue(value, { source: "prompt" });
}
async function syncMyProfileToServer({ source = "profile" } = {}) {
  if (!isOnline) return;
  try {
    await fetch("/api/v1/me", {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerId: playerIdMe(),
        pseudo: currentPseudo(),
        friendCode: friendCode(),
        level: level(),
        xp: state.xp || 0,
        solvedCount: Object.keys(state.solvedMysteries || {}).length,
        streak: state.streak || 0,
        source
      })
    });
  } catch {}
}

function appPublicUrl() {
  try { return `${location.origin}${location.pathname || "/"}`.replace(/\/?$/, "/"); }
  catch { return HISTODAILY_CORE.ui?.shareBaseUrl || "https://histodaily.vercel.app/"; }
}
function friendInviteLink() {
  return `${appPublicUrl()}?friend=${encodeURIComponent(friendCode())}`;
}
function applyStartupSocialLinks() {
  try {
    const params = new URLSearchParams(location.search || "");
    const raw = params.get("friend") || params.get("addFriend") || params.get("invite");
    if (!raw) return;
    const parsed = parseFriendCode(raw);
    if (!parsed) return;
    if (parsed.id === friendCode().toUpperCase()) {
      state.friendFeedback = "C’est ton propre lien ami. Partage-le à quelqu’un d’autre.";
    } else if (!knownFriendByCode(parsed.code)) {
      const friend = { id: parsed.id, code: parsed.code, name: parsed.pseudo, addedAt: Date.now(), source: "invite-link" };
      state.friends = { ...(state.friends || {}), [parsed.id]: friend };
      state.friendFeedback = `${parsed.pseudo} ajouté via lien d’invitation. Synchronisation en cours…`;
      state.tab = "profile";
      setTimeout(() => syncFriendToServer(friend).catch(() => {}), 0);
    }
    params.delete("friend"); params.delete("addFriend"); params.delete("invite");
    const clean = `${location.pathname}${params.toString() ? `?${params}` : ""}${location.hash || ""}`;
    history.replaceState(null, "", clean || "/");
    saveState();
  } catch {}
}
function leaderboardIntroText(scope = "daily") {
  const status = state.serverLeaderboardStatus?.[scope] || {};
  if (status.mode === "supabase") return "Classement à jour : les scores reçus sont affichés.";
  if (status.loading) return "Chargement du classement…";
  if (status.mode === "error" || status.mode === "supabase-error") return "Connexion instable : tes scores restent disponibles sur cet appareil.";
  return "Le classement se remplit quand des joueurs résolvent le mystère.";
}
function socialBackendMode() {
  if (!isOnline) return { label: "Hors ligne", detail: "Les scores restent sur ton appareil jusqu’au retour du réseau.", status: "offline" };
  const statuses = [...Object.values(state.serverLeaderboardStatus || {}), state.serverFriendsStatus].filter(Boolean);
  if (statuses.some(s => s.mode === "supabase")) return { label: "Scores en ligne", detail: "Les classements peuvent se mettre à jour entre joueurs.", status: "server" };
  if (statuses.some(s => s.loading)) return { label: "Mise à jour", detail: "Chargement du classement partagé…", status: "pending" };
  if (statuses.some(s => s.mode === "supabase-error" || s.mode === "error")) {
    const last = statuses.find(s => s.mode === "supabase-error" || s.mode === "error");
    return { label: "Connexion instable", detail: last?.message || last?.note || "Les scores restent disponibles localement.", status: "warning" };
  }
  return { label: "En attente de scores", detail: "Le classement se remplira avec les vrais scores reçus.", status: "local" };
}
function socialBackendMarkup() {
  const mode = socialBackendMode();
  return `<section class="card social-backend ${escapeHtml(mode.status)}"><div><span class="card-label">Multi</span><h2>${escapeHtml(mode.label)}</h2><p>${escapeHtml(mode.detail)}</p></div><div class="social-backend-actions"><strong>${friendProfiles().length} ami${friendProfiles().length > 1 ? "s" : ""}</strong><button type="button" class="ghost mini-button" data-refresh-social>Actualiser</button></div></section>`;
}
function socialInviteLinkMarkup() {
  return `<section class="card invite-link-card"><div><span class="card-label">Lien d’invitation</span><h2>Ajouter en un clic</h2><p>Tu peux envoyer ce lien à un ami : quand il l’ouvre, ton code est prêt à être ajouté. Pas de chat, pas de compte obligatoire.</p></div><div class="friend-code"><strong>${escapeHtml(friendInviteLink())}</strong><button type="button" data-copy-invite-link>Copier le lien</button></div>${state.inviteFeedback ? `<p>${escapeHtml(state.inviteFeedback)}</p>` : ""}</section>`;
}
async function copyInviteLink() {
  syncMyProfileToServer({ source: "invite-copy" }).catch(() => {});
  await copyText(friendInviteLink(), "Lien d’invitation copié.", "inviteFeedback");
}
function friendComparison(player) {
  const mine = scoreForScope("daily");
  const theirs = scoreOfPlayer(player, "daily");
  const delta = mine - theirs;
  if (player.me) return "toi";
  if (!theirs) return "pas encore de score reçu";
  if (delta === 0) return "égalité aujourd’hui";
  return delta > 0 ? `+${delta} XP vs toi` : `${Math.abs(delta)} XP devant toi`;
}
function scoreSyncMarkup(mysteryId) {
  const status = state.lastScoreSubmit?.[mysteryId];
  if (!status) return `<div class="score-sync-card"><b>Classement</b><span>Ton score sera pris en compte ici. Si la connexion n’est pas active, il reste visible sur ton appareil.</span></div>`;
  const label = status.stored ? "Score envoyé" : status.pending ? "Envoi du score…" : "Score gardé en local";
  const text = status.message || (status.stored ? "Score pris en compte." : "Le score reste local pour le moment.");
  return `<div class="score-sync-card ${status.stored ? "ok" : status.pending ? "pending" : "local"}"><b>${escapeHtml(label)}</b><span>${escapeHtml(text)}</span></div>`;
}
async function submitScoreToServer(payload) {
  const response = await fetch("/api/v1/leaderboard/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
function scorePayloadForMystery(mysteryId) {
  const mystery = data.mysteries.find(m => m.id === mysteryId) || {};
  const solved = state.solvedMysteries?.[mysteryId] || {};
  return {
    playerId: playerIdMe(),
    pseudo: currentPseudo(),
    friendCode: friendCode(),
    mysteryId,
    dayKey: localDayKey(solved.at || Date.now()),
    score: solved.score || mysteryScore(mysteryId),
    hints: solved.hints || 0,
    tries: solved.tries || 1,
    difficulty: mystery.difficulty || "moyen",
    solvedAt: solved.at || Date.now(),
    level: level(),
    xp: state.xp || 0,
    solvedCount: Object.keys(state.solvedMysteries || {}).length,
    streak: state.streak || 0
  };
}
function queueScoreSubmit(mysteryId) {
  if (!isOnline) {
    state.lastScoreSubmit = { ...(state.lastScoreSubmit || {}), [mysteryId]: { pending: false, stored: false, mode: "offline", message: "Hors ligne : score conservé localement." } };
    saveState();
    return;
  }
  state.lastScoreSubmit = { ...(state.lastScoreSubmit || {}), [mysteryId]: { pending: true, stored: false, mode: "sending", message: "Tentative d’envoi au classement…" } };
  saveState();
  submitScoreToServer(scorePayloadForMystery(mysteryId)).then(result => {
    state.lastScoreSubmit = { ...(state.lastScoreSubmit || {}), [mysteryId]: { pending: false, stored: Boolean(result?.stored), mode: result?.mode || "local-preview", message: result?.message || (result?.stored ? "Score enregistré." : "Score conservé localement.") } };
    saveState();
    fetchServerFriends({ force: true }).catch(() => {});
    ["daily", "week", "year", "friends"].forEach(scope => fetchServerLeaderboard(scope, { force: true }).catch(() => {}));
    if (state.tab === "mystery") render();
  }).catch(() => {
    state.lastScoreSubmit = { ...(state.lastScoreSubmit || {}), [mysteryId]: { pending: false, stored: false, mode: "error", message: "Connexion indisponible : score conservé localement." } };
    saveState();
    if (state.tab === "mystery") render();
  });
}

function localUserId() {
  const key = `${STORAGE_KEY}_local_user_id`;
  try {
    let id = localStorage.getItem(key);
    if (!id) {
      id = Math.random().toString(36).slice(2, 8).toUpperCase();
      localStorage.setItem(key, id);
    }
    return id;
  } catch { return "LOCAL"; }
}
function friendCode() {
  const key = `${STORAGE_KEY}_friend_code`;
  try {
    const stored = normalizeFriendCode(localStorage.getItem(key) || "");
    if (parseFriendCode(stored)) return stored;
  } catch {}
  const base = normalize(state.pseudo || "invite").replace(/\s+/g, "").slice(0, 6).toUpperCase() || "JOUEUR";
  const code = `${base}-${localUserId()}`.toUpperCase();
  try { localStorage.setItem(key, code); } catch {}
  return code;
}
async function copyText(text, okMessage, feedbackKey = "profileFeedback") {
  let ok = false;
  try {
    if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); ok = true; }
  } catch {}
  setState({ [feedbackKey]: ok ? okMessage : text });
}
function exportLocalSave() {
  const payload = {
    app: "HistoDaily",
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
    state
  };
  copyText(JSON.stringify(payload), "Sauvegarde copiée. Colle-la dans tes notes si tu veux garder une copie.", "backupFeedback");
}

function downloadLocalSave() {
  const payload = {
    app: "HistoDaily",
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
    state
  };
  try {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `histodaily-sauvegarde-${localDayKey()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setState({ backupFeedback: "Fichier de sauvegarde généré." });
  } catch {
    exportLocalSave();
  }
}
function importLocalSave() {
  const raw = window.prompt("Colle ici une sauvegarde HistoDaily exportée précédemment.");
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    const imported = parsed.state || parsed;
    state = mergeState(defaultState, imported);
    state.backupFeedback = "Sauvegarde restaurée localement.";
    saveState();
    render();
  } catch {
    setState({ backupFeedback: "Impossible de lire cette sauvegarde. Vérifie que tu as collé le texte complet." });
  }
}
async function shareInviteCode() {
  syncMyProfileToServer({ source: "invite-share" }).catch(() => {});
  const code = friendCode();
  const text = `Je joue à HistoDaily. Mon code ami : ${code}. Ajoute-moi ici : ${friendInviteLink()}`;
  let ok = false;
  try {
    if (navigator.share) { await navigator.share({ title: "HistoDaily", text }); ok = true; }
    else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); ok = true; }
  } catch {}
  setState({ inviteFeedback: ok ? "Invitation partagée / copiée." : text });
}
function resetProgressOnly({ silent = false } = {}) {
  if (!silent && !window.confirm("Réinitialiser ta progression locale tout en gardant pseudo, code ami et amis ?")) return;
  const preserved = {
    pseudo: state.pseudo,
    friends: { ...(state.friends || {}) },
    rankScope: state.rankScope || "daily",
    performanceMode: state.performanceMode,
    installDismissed: state.installDismissed
  };
  state = mergeState(defaultState, {
    ...preserved,
    tab: "home",
    xp: 0,
    streak: 0,
    gems: 0,
    completedLessons: {},
    solvedMysteries: {},
    seenHints: {},
    mysteryTries: {},
    mysteryFeedback: {},
    unlockedMysteries: {},
    dailyClaims: {},
    dailyHistory: {},
    lastDailySolvedKey: null,
    rewardFeedback: {},
    lastScoreSubmit: {},
    serverLeaderboards: {},
    serverLeaderboardStatus: {},
    serverFriendsStatus: state.serverFriendsStatus || {},
    achievements: { firstLesson: false, firstMystery: false, streak3: false, streak7: false, noHint: false, expertMystery: false, firstArchive: false },
    profileFeedback: "Progression locale réinitialisée. Tu peux refaire le mystère et relancer le classement."
  });
  saveState();
  render();
}

function backupToolsMarkup() {
  return `<section class="card backup-card"><div><span class="card-label">Sauvegarde locale</span><h2>Garde une copie de sécurité.</h2><p>Copie ou télécharge ta progression. Tu peux la restaurer plus tard sur le même navigateur.</p></div><div class="backup-actions"><button data-export-save>Copier sauvegarde</button><button class="ghost" data-download-save>Télécharger</button><button class="ghost" data-import-save>Restaurer</button></div>${state.backupFeedback ? `<p>${escapeHtml(state.backupFeedback)}</p>` : ""}</section>`;
}
function settingsInnerMarkup(markup, extraClass = "") {
  return String(markup || "")
    .replace(/<section class="card /, `<div class="settings-inner ${extraClass} `)
    .replace(/<section class="card"/, `<div class="settings-inner ${extraClass}"`)
    .replace(/<\/section>\s*$/, "</div>");
}
function profileSettingsMarkup() {
  return `<section class="card profile-settings-card"><div class="section-title-row"><div><span class="card-label">Réglages</span><h2>Préférences et contrôle</h2><p>J’ai retiré le panneau déroulant qui pouvait provoquer un plantage sur certains navigateurs mobiles.</p></div></div>${settingsInnerMarkup(performanceSettingsMarkup(), "performance-card")}${settingsInnerMarkup(recentDailyCalendarMarkup({ compact: true }), "calendar-card")}</section>`;
}
function inviteToolsMarkup() {
  return `<section class="card invite-card"><div><span class="card-label">Code ami</span><h2>Ton profil partageable</h2><p>Pas de chat. Ce code sert seulement à t’ajouter en ami et voir ton profil dans les classements.</p></div><div class="friend-code"><strong>${escapeHtml(friendCode())}</strong><button data-share-invite>Partager</button></div>${state.inviteFeedback ? `<p>${escapeHtml(state.inviteFeedback)}</p>` : ""}</section>`;
}
function renderProfile() {
  ensureServerFriends();
  const friends = friendProfiles();
  renderShell(`<header class="topbar"><button data-home>←</button><div><p class="eyebrow">Profil social</p><h1>${escapeHtml(state.pseudo)}</h1></div></header>
    ${publicProfileMarkup(myPlayerProfile())}
    ${disciplineWheelMarkup()}
    <section class="card pseudo-card"><div><span class="card-label">Identité</span><h2>Ton nom dans les classements</h2><p>Ce pseudo sert au profil, aux amis et au classement. Pas besoin de mail pour cette phase.</p></div><form data-pseudo-form novalidate><input data-pseudo-input name="pseudo" type="text" value="${escapeHtml(state.pseudo)}" maxlength="18" aria-label="Pseudo" autocomplete="nickname" autocapitalize="words" enterkeyhint="done"/><button type="button" data-save-pseudo>Enregistrer</button></form><button type="button" class="ghost wide" data-pseudo-prompt>Modifier via fenêtre simple</button>${state.profileFeedback ? `<p class="profile-feedback">${escapeHtml(state.profileFeedback)}</p>` : ""}</section>
    ${addFriendMarkup()}
    ${socialInviteLinkMarkup()}
    ${friendListMarkup()}
    <section class="card social-shortcuts"><div><span class="card-label">Classements</span><h2>Comparer les scores</h2><p>Compare tes scores avec tes amis et ouvre les profils depuis le classement.</p></div><div class="home-actions-row"><button data-profile-rank="daily">Classement jour</button><button class="ghost" data-profile-rank="friends">Mes amis</button></div></section>
    ${socialBackendMarkup()}
    ${backupToolsMarkup()}
    ${installPromptMarkup()}
    ${profileSettingsMarkup()}
    <section class="achievement-grid achievement-modern">
      ${achievement("🔥", "Série 3 jours", state.achievements.streak3)}
      ${achievement("⚡", "Série 7 jours", state.achievements.streak7)}
      ${achievement("📖", "Première leçon", state.achievements.firstLesson)}
      ${achievement("🕵️", "Premier mystère", state.achievements.firstMystery)}
      ${achievement("🎯", "Sans indice", state.achievements.noHint)}
      ${achievement("🧠", "Mystère expert", state.achievements.expertMystery)}
    </section>`);
  $(`[data-home]`)?.addEventListener("click", () => setState({ tab: "home" }));
  const pseudoForm = $(`[data-pseudo-form]`);
  const pseudoInput = $(`[data-pseudo-input]`);
  pseudoForm?.addEventListener("submit", updatePseudo);
  $(`[data-save-pseudo]`)?.addEventListener("click", updatePseudo);
  pseudoInput?.addEventListener("keydown", event => { if (event.key === "Enter") updatePseudo(event); });
  pseudoInput?.addEventListener("change", event => savePseudoValue(event.currentTarget.value, { source: "change" }));
  $(`[data-pseudo-prompt]`)?.addEventListener("click", promptPseudoEdit);
  $(`[data-add-friend]`)?.addEventListener("submit", addFriend);
  $(`[data-share-invite]`)?.addEventListener("click", shareInviteCode);
  $(`[data-copy-invite-link]`)?.addEventListener("click", copyInviteLink);
  $(`[data-refresh-social]`)?.addEventListener("click", () => { fetchServerFriends({ force: true }).catch(() => {}); ["daily", "week", "year", "friends"].forEach(scope => fetchServerLeaderboard(scope, { force: true }).catch(() => {})); });
  document.querySelectorAll("[data-view-profile]").forEach(btn => btn.addEventListener("click", () => viewProfile(btn.dataset.viewProfile)));
  document.querySelectorAll("[data-remove-friend]").forEach(btn => btn.addEventListener("click", event => { event.stopPropagation(); removeFriend(btn.dataset.removeFriend); }));
  document.querySelectorAll("[data-profile-rank]").forEach(btn => btn.addEventListener("click", () => setState({ tab: "rank", rankScope: btn.dataset.profileRank })));
  document.querySelectorAll("[data-performance-mode]").forEach(btn => btn.addEventListener("click", () => setPerformanceMode(btn.dataset.performanceMode)));
  $(`[data-export-save]`)?.addEventListener("click", exportLocalSave);
  $(`[data-download-save]`)?.addEventListener("click", downloadLocalSave);
  $(`[data-import-save]`)?.addEventListener("click", importLocalSave);
  $(`[data-reset-progress]`)?.addEventListener("click", () => resetProgressOnly());
  $(`[data-reset-server-score]`)?.addEventListener("click", resetTodayServerScore);
  $(`[data-install-app]`)?.addEventListener("click", installApp);
  $(`[data-dismiss-install]`)?.addEventListener("click", () => setState({ installDismissed: true }));
  $(`[data-dismiss-release]`)?.addEventListener("click", () => setState({ dismissedReleaseVersion: APP_VERSION }));
}
function renderPublicProfile() {
  const player = profileById(state.selectedProfileId);
  renderShell(`<header class="topbar"><button data-back-social>←</button><div><p class="eyebrow">Profil joueur</p><h1>${escapeHtml(player.name)}</h1></div></header>
    ${publicProfileMarkup(player)}
    <section class="card profile-score-card"><div class="section-title-row"><div><span class="card-label">Scores</span><h2>Classements</h2></div><small>${player.me ? "toi" : player.friend ? "ami" : "joueur"}</small></div><div class="public-stats-grid"><div><strong>${scoreOfPlayer(player, "daily")}</strong><span>Aujourd’hui</span></div><div><strong>${scoreOfPlayer(player, "week")}</strong><span>Semaine</span></div><div><strong>${scoreOfPlayer(player, "year")}</strong><span>Année</span></div><div><strong>#${leaderboardRows(state.rankScope || "daily").find(r => r.id === player.id)?.rank || "—"}</strong><span>Rang actuel</span></div></div></section>
    ${!player.me && player.friend ? `<section class="card"><button class="ghost wide" data-remove-friend="${escapeHtml(player.id)}">Retirer des amis</button></section>` : ""}
    <section class="card social-shortcuts"><div class="home-actions-row"><button data-open-rank="daily">Classement jour</button><button class="ghost" data-open-rank="friends">Classement amis</button></div></section>`);
  $(`[data-back-social]`)?.addEventListener("click", () => setState({ tab: "rank" }));
  document.querySelectorAll("[data-open-rank]").forEach(btn => btn.addEventListener("click", () => setState({ tab: "rank", rankScope: btn.dataset.openRank })));
  document.querySelectorAll("[data-remove-friend]").forEach(btn => btn.addEventListener("click", () => removeFriend(btn.dataset.removeFriend)));
}
function achievement(icon, label, on) { return `<div class="card achievement ${on ? "on" : "off"}"><b>${icon}</b><span>${label}</span></div>`; }



/* =========================================================
   Cours — choix de discipline puis parcours rangé
   Disciplines -> périodes -> thèmes -> cours -> express / complet / quiz
   ========================================================= */
function disciplineById(id) {
  return DISCIPLINES.find(item => item.id === id) || DISCIPLINES[0];
}
function activeDisciplineId() {
  return disciplineById(state.currentDiscipline || "history").id;
}
function worldDisciplineId(world = {}) {
  return world.discipline || "history";
}
function treeAvailableWorlds(disciplineId = activeDisciplineId()) {
  const worlds = curatedWorlds();
  const realWorlds = (worlds.length ? worlds : data.worlds)
    .filter(world => curatedLessonsFor(world.id).length > 0)
    .filter(world => worldDisciplineId(world) === disciplineId);
  const plannedWorlds = PLANNED_DISCIPLINE_WORLDS[disciplineId] || [];
  const realIds = new Set(realWorlds.map(world => world.id));
  return [...realWorlds, ...plannedWorlds.filter(world => !realIds.has(world.id))]
    .sort((a, b) => (a.sortStart ?? 999999) - (b.sortStart ?? 999999));
}
function treeGroups(disciplineId = activeDisciplineId()) {
  const historyGroups = typeof HISTO_WORLD_GROUPS !== "undefined" && Array.isArray(HISTO_WORLD_GROUPS) ? HISTO_WORLD_GROUPS : [];
  const baseGroups = PLANNED_DISCIPLINE_GROUPS[disciplineId]?.length ? PLANNED_DISCIPLINE_GROUPS[disciplineId] : historyGroups;
  const worlds = treeAvailableWorlds(disciplineId);
  const groupIds = new Set(worlds.map(world => world.group || "other"));
  const known = baseGroups.filter(group => groupIds.has(group.id));
  const missing = [...groupIds]
    .filter(id => !known.some(group => group.id === id))
    .map(id => ({ id, title: "Autres parcours", range: "hors période", description: "Cours rangés hors découpage principal." }));
  return [...known, ...missing];
}
function treeWorldsForGroup(groupId, disciplineId = activeDisciplineId()) {
  return treeAvailableWorlds(disciplineId).filter(world => (world.group || "other") === groupId);
}
function treeActiveGroupId(disciplineId = activeDisciplineId()) {
  const currentWorld = data.worlds.find(world => world.id === state.currentWorld);
  const preferred = state.currentGroup || currentWorld?.group || treeGroups(disciplineId)[0]?.id;
  if (preferred && treeWorldsForGroup(preferred, disciplineId).length) return preferred;
  return treeGroups(disciplineId)[0]?.id || preferred || "other";
}
function treeActiveWorld(groupId = treeActiveGroupId(), disciplineId = activeDisciplineId()) {
  const worlds = treeWorldsForGroup(groupId, disciplineId);
  return worlds.find(world => world.id === state.currentWorld) || worlds[0] || activeWorld();
}
function treeLessonsForWorld(worldId) {
  return curatedLessonsFor(worldId).sort((a, b) => (a.order || 999) - (b.order || 999));
}
function treeLessonCountForGroup(groupId, disciplineId = activeDisciplineId()) {
  return treeWorldsForGroup(groupId, disciplineId).reduce((sum, world) => sum + treeLessonsForWorld(world.id).length, 0);
}
function treeDoneCountForGroup(groupId, disciplineId = activeDisciplineId()) {
  return treeWorldsForGroup(groupId, disciplineId).reduce((sum, world) => sum + treeLessonsForWorld(world.id).filter(lesson => lessonDone(lesson.id)).length, 0);
}
function treeDoneCountForWorld(worldId) {
  return treeLessonsForWorld(worldId).filter(lesson => lessonDone(lesson.id)).length;
}
function treeMysteryCountForWorld(worldId) {
  const ids = new Set(treeLessonsForWorld(worldId).map(lesson => lesson.id));
  return data.mysteries.filter(mystery => ids.has(mystery.lessonId)).length;
}
function lessonsForDiscipline(disciplineId = activeDisciplineId()) {
  return treeAvailableWorlds(disciplineId).flatMap(world => treeLessonsForWorld(world.id));
}
function disciplineProgress(disciplineId = activeDisciplineId()) {
  const lessons = lessonsForDiscipline(disciplineId);
  const done = lessons.filter(lesson => lessonDone(lesson.id)).length;
  const worlds = treeAvailableWorlds(disciplineId);
  const groups = treeGroups(disciplineId);
  return {
    done,
    total: lessons.length,
    progress: percent(done, lessons.length),
    ready: lessons.length > 0,
    chapters: groups.length,
    themes: worlds.length,
    planned: worlds.length > 0 && lessons.length === 0
  };
}
function disciplineCard(discipline, active) {
  const stats = disciplineProgress(discipline.id);
  const status = stats.ready ? `${stats.done}/${stats.total} cours · ${stats.progress}%` : (stats.planned ? `${stats.chapters} grands chapitres · bientôt` : "bientôt");
  return `<button class="discipline-card ${active ? "active" : ""}" data-discipline="${escapeHtml(discipline.id)}" style="--discipline-accent:${escapeHtml(discipline.accent)}">
    <span class="discipline-icon">${discipline.emoji}</span>
    <strong>${escapeHtml(discipline.title)}</strong>
    <small>${escapeHtml(status)}</small>
    <em>${escapeHtml(discipline.description)}</em>
  </button>`;
}
function disciplineSelectorMarkup(selectedId = activeDisciplineId()) {
  return `<section class="discipline-picker card">
    <div class="section-title-row">
      <div><span class="card-label">Disciplines</span><h2>Choisis ce que tu veux apprendre</h2><p>Comme une langue dans Duolingo : tu choisis le domaine, puis tu avances dans ses cours.</p></div>
      <small>${DISCIPLINES.length} domaines</small>
    </div>
    <div class="discipline-grid">${DISCIPLINES.map(item => disciplineCard(item, item.id === selectedId)).join("")}</div>
  </section>`;
}
function selectDiscipline(disciplineId) {
  const discipline = disciplineById(disciplineId);
  const firstWorld = treeAvailableWorlds(discipline.id)[0];
  setState({
    currentDiscipline: discipline.id,
    currentGroup: firstWorld?.group || state.currentGroup || "origins",
    currentWorld: firstWorld?.id || state.currentWorld || "prehistory",
    learnFilter: "all",
    learnSearch: ""
  });
}
function disciplineEmptyMarkup(discipline) {
  return `<section class="card discipline-empty-card" style="--discipline-accent:${escapeHtml(discipline.accent)}">
    <div class="discipline-empty-icon">${discipline.emoji}</div>
    <div><span class="card-label">${escapeHtml(discipline.title)}</span><h2>La discipline est prête dans l’interface, pas encore remplie.</h2><p>On garde l’app légère : pas besoin d’ajouter cinquante cours vides. Dès qu’on écrira les contenus, ils apparaîtront ici avec le même système express, cours complet et quiz.</p></div>
  </section>`;
}
function treeGroupCard(group, active, disciplineId = activeDisciplineId()) {
  const total = treeLessonCountForGroup(group.id, disciplineId);
  const done = treeDoneCountForGroup(group.id, disciplineId);
  const progress = percent(done, total);
  return `<article class="tree-card period-card ${active ? "active" : ""}" data-tree-group="${escapeHtml(group.id)}" tabindex="0" role="button">
    <div class="tree-card-main">
      <span class="tree-kicker">${escapeHtml(group.range || "période")}</span>
      <h2>${escapeHtml(group.title || "Période")}</h2>
      <p>${escapeHtml(group.description || "Choisis une période pour voir ses peuples, civilisations et grands thèmes.")}</p>
    </div>
    <div class="tree-progress-line"><span>${done}/${total} cours</span><b>${progress}%</b></div>
    <div class="progress"><i style="width:${progress}%"></i></div>
  </article>`;
}
function treeWorldCard(world, active) {
  const lessons = treeLessonsForWorld(world.id);
  const done = treeDoneCountForWorld(world.id);
  const mysteries = treeMysteryCountForWorld(world.id);
  const progress = percent(done, lessons.length);
  return `<article class="tree-card theme-card ${active ? "active" : ""}" data-tree-world="${escapeHtml(world.id)}" tabindex="0" role="button">
    <div class="theme-icon" style="--theme-accent:${escapeHtml(world.accent || "#fbbf24")}">${world.emoji || "📚"}</div>
    <div>
      <h2>${escapeHtml(world.title)}</h2>
      <p>${escapeHtml(world.subtitle || world.timeframe || "Parcours")}</p>
      <small>${escapeHtml(world.timeframe || "")}${world.timeframe ? " · " : ""}${lessons.length ? `${lessons.length} cours` : "cours à écrire"}${mysteries ? ` · ${mysteries} mystère${mysteries > 1 ? "s" : ""}` : ""}</small>
      <div class="mini-progress"><i style="width:${progress}%"></i></div>
    </div>
  </article>`;
}
function treeLessonCard(lesson, index, world) {
  const done = lessonDone(lesson.id);
  const progress = quizProgressForLesson(lesson.id, normalizeQuizPack(buildLessonContent(lesson).quiz, lesson, buildLessonContent(lesson)).length);
  const mystery = relatedMysteryForLesson(lesson.id);
  const locked = lessonLockedByDailyMystery(lesson);
  if (locked) {
    return `<article class="tree-lesson locked" data-locked-lesson="${escapeHtml(lesson.id)}" tabindex="0" role="button">
      <span class="tree-lesson-number">🔒</span>
      <div><h3>Cours verrouillé anti-spoil</h3><p>Ce cours explique le mystère du jour. Résous le dossier pour l’ouvrir.</p><small>${escapeHtml(world.title)} · mystère d’abord</small></div>
      <strong>bloqué</strong>
    </article>`;
  }
  const status = done ? "Validé" : progress.passed ? "Quiz réussi" : progress.correctCount ? `${progress.correctCount}/5 quiz` : "À faire";
  return `<article class="tree-lesson ${done ? "done" : ""}" data-lesson="${escapeHtml(lesson.id)}" tabindex="0" role="button">
    <span class="tree-lesson-number">${done ? "✓" : index + 1}</span>
    <div><h3>${lesson.emoji || "📜"} ${escapeHtml(lesson.title)}</h3><p>${escapeHtml(lesson.period || lesson.location || world.title)}</p><small>${escapeHtml(world.title)} · ⚡ express · 📚 complet · ✅ quiz${mystery ? " · 🕵️ mystère lié" : ""}</small></div>
    <strong>${status}</strong>
  </article>`;
}
function polarPoint(cx, cy, radius, angleDeg) {
  const angle = (angleDeg - 90) * Math.PI / 180;
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
}
function ringSlicePath(index, total, innerRadius, outerRadius, gapDeg = 1.2) {
  const start = index * 360 / total + gapDeg;
  const end = (index + 1) * 360 / total - gapDeg;
  const outerStart = polarPoint(50, 50, outerRadius, start);
  const outerEnd = polarPoint(50, 50, outerRadius, end);
  const innerEnd = polarPoint(50, 50, innerRadius, end);
  const innerStart = polarPoint(50, 50, innerRadius, start);
  const large = end - start > 180 ? 1 : 0;
  return `M ${outerStart.x.toFixed(2)} ${outerStart.y.toFixed(2)} A ${outerRadius} ${outerRadius} 0 ${large} 1 ${outerEnd.x.toFixed(2)} ${outerEnd.y.toFixed(2)} L ${innerEnd.x.toFixed(2)} ${innerEnd.y.toFixed(2)} A ${innerRadius} ${innerRadius} 0 ${large} 0 ${innerStart.x.toFixed(2)} ${innerStart.y.toFixed(2)} Z`;
}
function disciplineWheelMarkup() {
  const total = DISCIPLINES.length;
  const allStats = DISCIPLINES.map(discipline => ({ discipline, stats: disciplineProgress(discipline.id) }));
  const average = Math.round(allStats.reduce((sum, item) => sum + item.stats.progress, 0) / Math.max(1, allStats.length));
  const slices = allStats.map(({ discipline, stats }, index) => {
    const mid = (index + 0.5) * 360 / total;
    const percentLabel = polarPoint(50, 50, 37, mid);
    const emojiLabel = polarPoint(50, 50, 27, mid);
    const fillOuter = 22 + (26 * stats.progress / 100);
    const fill = stats.progress > 0.5 ? `<path class="wheel-fill" d="${ringSlicePath(index, total, 22, fillOuter, 1.7)}" fill="${escapeHtml(discipline.accent)}"></path>` : "";
    return `<g class="wheel-segment" style="--discipline-accent:${escapeHtml(discipline.accent)}"><path class="wheel-back" d="${ringSlicePath(index, total, 22, 48, 1.7)}" fill="${escapeHtml(discipline.accent)}"></path>${fill}<text class="wheel-emoji" x="${emojiLabel.x.toFixed(1)}" y="${emojiLabel.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle">${discipline.emoji}</text><text class="wheel-percent" x="${percentLabel.x.toFixed(1)}" y="${percentLabel.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle">${stats.progress}%</text></g>`;
  }).join("");
  const legend = allStats.map(({ discipline, stats }) => {
    const meta = stats.ready ? `${stats.done}/${stats.total} cours` : `${stats.chapters || 0} chapitres`; 
    return `<div class="discipline-progress-row" style="--discipline-accent:${escapeHtml(discipline.accent)}"><span>${discipline.emoji}</span><strong>${escapeHtml(discipline.title)}</strong><em>${escapeHtml(meta)}</em><b>${stats.progress}%</b></div>`;
  }).join("");
  return `<section class="card trivial-profile-card culture-profile-card">
    <div class="section-title-row"><div><span class="card-label">Profil culturel</span><h2>Ton camembert de progression</h2><p>Chaque domaine garde sa tranche. Les cours validés remplissent progressivement la couleur, sans mélanger les disciplines.</p></div><small>${average}% moyen</small></div>
    <div class="trivial-profile-layout"><div class="trivial-wheel-wrap"><svg class="trivial-wheel culture-wheel" viewBox="0 0 100 100" role="img" aria-label="Progression par discipline"><circle class="wheel-halo" cx="50" cy="50" r="49"></circle>${slices}<circle class="wheel-core" cx="50" cy="50" r="17"></circle><text class="trivial-center" x="50" y="47" text-anchor="middle" dominant-baseline="middle">Culture</text><text class="wheel-average" x="50" y="56" text-anchor="middle" dominant-baseline="middle">${average}%</text></svg></div><div class="discipline-progress-list">${legend}</div></div>
  </section>`;
}
function renderLearn() {
  const disciplineId = activeDisciplineId();
  const discipline = disciplineById(disciplineId);
  const groups = treeGroups(disciplineId);
  if (!groups.length) {
    renderShell(`<header class="topbar tree-topbar"><button data-back-home>←</button><div><p class="eyebrow">Cours</p><h1>Choisis une discipline</h1><p class="tree-subtitle">Histoire, art, cinéma, sciences, économie ou géographie.</p></div></header>
      ${disciplineSelectorMarkup(disciplineId)}
      ${disciplineEmptyMarkup(discipline)}`);
    $(`[data-back-home]`)?.addEventListener("click", () => setState({ tab: "home" }));
    document.querySelectorAll("[data-discipline]").forEach(btn => btn.addEventListener("click", () => selectDiscipline(btn.dataset.discipline)));
    return;
  }
  const groupId = treeActiveGroupId(disciplineId);
  const group = groups.find(item => item.id === groupId) || groups[0] || {};
  const worlds = treeWorldsForGroup(groupId, disciplineId);
  const world = treeActiveWorld(groupId, disciplineId);
  const lessons = treeLessonsForWorld(world.id);
  const shownLessons = filterLessons(lessons);
  const groupDone = treeDoneCountForGroup(groupId, disciplineId);
  const groupTotal = treeLessonCountForGroup(groupId, disciplineId);
  const worldDone = treeDoneCountForWorld(world.id);
  const worldProgress = percent(worldDone, lessons.length);
  renderShell(`
    <header class="topbar tree-topbar"><button data-back-home>←</button><div><p class="eyebrow">Cours</p><h1>Choisis une discipline</h1><p class="tree-subtitle">Tu choisis d’abord le domaine, puis les chapitres disponibles.</p></div></header>
    ${disciplineSelectorMarkup(disciplineId)}
    <section class="tree-overview card">
      <div><span class="card-label">${escapeHtml(discipline.title)}</span><h2>${escapeHtml(group.title || "Période")}</h2><p>${escapeHtml(group.description || "Choisis une période puis un thème pour ne pas mélanger tous les cours.")}</p></div>
      <div class="tree-overview-stats"><div><b>${groupTotal ? `${groupDone}/${groupTotal}` : "plan"}</b><span>${groupTotal ? "cours terminés" : "chapitre posé"}</span></div><div><b>${lessons.length ? `${worldDone}/${lessons.length}` : "plan"}</b><span>${escapeHtml(world.title || "thème")}</span></div><div><b>${worldProgress}%</b><span>progression thème</span></div></div>
    </section>
    <section class="tree-section"><div class="section-title-row"><div><span class="card-label">1 · Grands chapitres</span><h2>Choisis le chapitre</h2></div><small>${groups.length} chapitres</small></div><div class="tree-grid periods-grid">${groups.map(item => treeGroupCard(item, item.id === groupId, disciplineId)).join("")}</div></section>
    <section class="tree-section"><div class="section-title-row"><div><span class="card-label">2 · Thèmes du chapitre</span><h2>${escapeHtml(group.title || "Parcours")}</h2></div><small>${worlds.length} thèmes</small></div><div class="tree-grid themes-grid">${worlds.map(item => treeWorldCard(item, item.id === world.id)).join("")}</div></section>
    ${learnFilterMarkup(lessons, shownLessons)}
    <section class="tree-section"><div class="section-title-row"><div><span class="card-label">3 · Cours</span><h2>${world.emoji || "📚"} ${escapeHtml(world.title || "Cours")}</h2><p class="tree-context-line">${escapeHtml(world.subtitle || "Un parcours rangé par ordre logique.")}</p></div><small>${shownLessons.length}/${lessons.length} visibles</small></div><div class="tree-lesson-list">${shownLessons.map((lesson, index) => treeLessonCard(lesson, index, world)).join("") || `<div class="card empty-filter-card"><h2>${lessons.length ? "Aucun cours trouvé." : "Cours à écrire."}</h2><p>${lessons.length ? (learnSearchQuery() ? "Essaie un mot plus large ou efface la recherche." : "Change de thème : les autres cours sont encore en reprise.") : "Le thème est placé dans la discipline. On ajoutera ensuite un vrai cours complet, son express et son quiz."}</p>${lessons.length ? `<button data-learn-filter="all">Voir tous les cours disponibles</button>` : ""}</div>`}</div></section>`);
  $(`[data-back-home]`)?.addEventListener("click", () => setState({ tab: "home" }));
  document.querySelectorAll("[data-discipline]").forEach(btn => btn.addEventListener("click", () => selectDiscipline(btn.dataset.discipline)));
  document.querySelectorAll("[data-tree-group]").forEach(card => {
    const open = () => {
      const nextGroup = card.dataset.treeGroup;
      const firstWorld = treeWorldsForGroup(nextGroup, disciplineId)[0];
      setState({ currentDiscipline: disciplineId, currentGroup: nextGroup, currentWorld: firstWorld?.id || state.currentWorld, learnFilter: "all", learnSearch: "" });
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } });
  });
  document.querySelectorAll("[data-tree-world]").forEach(card => {
    const open = () => setState({ currentDiscipline: disciplineId, currentGroup: groupId, currentWorld: card.dataset.treeWorld, learnFilter: "all", learnSearch: "" });
    card.addEventListener("click", open);
    card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } });
  });
  document.querySelectorAll("[data-learn-filter]").forEach(btn => btn.addEventListener("click", () => setState({ learnFilter: btn.dataset.learnFilter })));
  $(`[data-learn-search-form]`)?.addEventListener("submit", event => {
    event.preventDefault();
    const input = event.currentTarget.querySelector("input[name='learnSearch']");
    setState({ learnSearch: String(input?.value || "").trim() });
  });
  $(`[data-clear-learn-search]`)?.addEventListener("click", () => setState({ learnSearch: "" }));
  const openLesson = id => openLessonFromHome(id, "express");
  document.querySelectorAll("[data-lesson]").forEach(card => {
    const open = () => openLesson(card.dataset.lesson);
    card.addEventListener("click", open);
    card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } });
  });
  document.querySelectorAll("[data-locked-lesson]").forEach(card => {
    const open = () => setState({ tab: "mystery", currentMysteryId: dailyMystery()?.id || null, currentMysteryDiscipline: activeDisciplineId() });
    card.addEventListener("click", open);
    card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } });
  });
}

function render() {
  if (state.tab === "learn") return renderLearn();
  if (state.tab === "lesson") return renderLesson();
  if (state.tab === "mystery") return renderMystery();
  if (state.tab === "rank") return renderRank();
  if (state.tab === "profile") return renderProfile();
  if (state.tab === "publicProfile") return renderPublicProfile();
  return renderHome();
}


const ROME_EDITORIAL_LESSON_IDS = [
  "rome-foundation-kings",
  "rome-italy-expansion",
  "rome-punic-wars",
  "rome-republic-crisis",
  "rome-christianity-late-empire"
];
ROME_EDITORIAL_LESSON_IDS.forEach(id => PUBLISHED_LESSON_IDS.add(id));

Object.assign(READY_LESSON_PACKS, {
  "rome-foundation-kings": {
    hook: "Rome ne naît pas comme une grande capitale impériale. Elle commence comme un ensemble de communautés du Latium, autour du Tibre, puis transforme des récits de fondation en mémoire politique.",
    keyFacts: [
      "Quand : fondation légendaire en 753 av. J.-C. ; premiers siècles mal documentés",
      "Où : Latium, collines de Rome, vallée du Tibre",
      "Acteurs : Latins, Sabins, Étrusques, familles aristocratiques, rois légendaires",
      "Traces : archéologie du Palatin et du Forum, traditions littéraires tardives, rites et institutions",
      "Piège : prendre Romulus et Rémus comme un reportage historique"
    ],
    takeaways: [
      { label: "Idée forte", text: "La fondation de Rome mélange archéologie, mémoire civique et légendes construites longtemps après les débuts de la ville." },
      { label: "Preuve", text: "Les traces matérielles montrent une urbanisation progressive, pas une ville née en un jour." },
      { label: "Piège", text: "La louve, Romulus et Rémus disent surtout comment les Romains veulent raconter leurs origines." }
    ],
    express: [
      "La date de 753 av. J.-C. est une date traditionnelle, pas une photographie de naissance. Les récits de Romulus, Rémus, la louve ou l’enlèvement des Sabines appartiennent à la mémoire romaine : ils expliquent comment Rome veut se représenter, plus qu’ils ne décrivent directement les faits.",
      "L’archéologie montre plutôt une croissance progressive : des habitats sur les collines, des espaces communs, des contacts entre Latins, Sabins et Étrusques, puis l’aménagement du Forum. Rome devient peu à peu une cité organisée autour du Tibre, car ce fleuve relie l’intérieur et les échanges.",
      "Le piège est de choisir entre “tout est faux” et “tout est vrai”. Les légendes sont fausses comme reportage, mais vraies comme sources de mémoire politique : elles parlent de guerre, d’asile, d’intégration, de violence fondatrice et d’identité civique."
    ],
    complete: [
      { title: "1. Une ville qui ne naît pas en un jour", text: "Les Romains aiment dater leur fondation en 753 av. J.-C., mais les débuts de Rome sont progressifs. Des villages et habitats se développent sur les collines, près d’un passage du Tibre. La ville se forme par rapprochement, aménagement et organisation d’espaces communs." },
      { title: "2. Pourquoi le Tibre compte", text: "Rome est placée sur un site utile : le Tibre permet des circulations, le passage entre rives, des échanges avec l’intérieur et le monde tyrrhénien. La géographie ne crée pas automatiquement la ville, mais elle donne des possibilités que des groupes humains exploitent." },
      { title: "3. La légende comme mémoire", text: "Romulus, Rémus, la louve ou le meurtre du frère ne doivent pas être lus comme un journal du VIIIe siècle av. J.-C. Ces récits, transmis et réécrits plus tard, construisent une identité : Rome se dit née de conflit, d’accueil, de force et de destin." },
      { title: "4. Des influences multiples", text: "Rome n’est pas isolée. Latins, Sabins et Étrusques participent à son environnement. Les Étrusques, notamment, influencent des formes de pouvoir, des rites, des techniques et des signes de prestige. Rome se construit par contacts autant que par opposition." },
      { title: "5. Ce qu’il faut retenir", text: "Étudier la fondation de Rome, ce n’est pas demander si la louve a vraiment existé. C’est comprendre comment une communauté devenue puissante relit ses origines pour expliquer son identité, ses institutions et sa vocation à intégrer puis dominer." }
    ],
    deeper: [
      { title: "Repère", text: "Fondation légendaire : récit d’origine qui donne du sens politique à une communauté, même quand il ne correspond pas directement aux faits." },
      { title: "Comment le lire", text: "On croise les textes tardifs avec l’archéologie : aucun type de source ne suffit seul." },
      { title: "Erreur fréquente", text: "Dire seulement “Rome a été fondée par Romulus” revient à confondre mémoire civique et histoire des débuts urbains." }
    ],
    quiz: [
      { kind: "date", q: "Pourquoi 753 av. J.-C. doit-elle être utilisée avec prudence ?", a: "Parce que c’est une date traditionnelle de fondation, pas une preuve directe de naissance soudaine de la ville.", choices: ["Parce que c’est la date de la destruction de Carthage.", "Parce que Rome existe déjà comme empire chrétien.", "Parce que cette date concerne Athènes et non le Latium."], why: "Le cours distingue date mémorielle et formation progressive.", trap: "Lire la date comme une certitude archéologique.", evidence: "Express et bloc 1." },
      { kind: "lieu", q: "Pourquoi le Tibre est-il important dans les débuts de Rome ?", a: "Parce qu’il facilite passage, échanges et circulation entre l’intérieur du Latium et les réseaux voisins.", choices: ["Parce qu’il isole Rome de tous les échanges méditerranéens.", "Parce qu’il remplace toute organisation politique.", "Parce qu’il prouve à lui seul l’existence de Romulus."], why: "Le site donne des possibilités que les sociétés exploitent.", trap: "Faire de la géographie une cause automatique.", evidence: "Bloc 2." },
      { kind: "source", q: "Que peut apprendre la légende de Romulus et Rémus ?", a: "Elle renseigne surtout la mémoire politique romaine et la manière dont Rome raconte ses origines.", choices: ["Elle fournit un compte rendu neutre du VIIIe siècle av. J.-C.", "Elle remplace toutes les traces archéologiques.", "Elle prouve que les Étrusques n’ont joué aucun rôle."], why: "Une légende peut être utile sans être un reportage.", trap: "Opposer naïvement vrai et faux.", evidence: "Bloc 3." },
      { kind: "acteurs", q: "Quels peuples faut-il garder en tête autour des débuts de Rome ?", a: "Latins, Sabins et Étrusques, dans un espace de contacts et d’influences.", choices: ["Francs, Vikings et Normands du XIe siècle.", "Aztèques, Incas et Mayas des Amériques.", "Huns, Mongols et Ottomans de l’époque médiévale."], why: "Rome se construit dans un environnement régional précis.", trap: "Imaginer Rome isolée dès l’origine.", evidence: "Repères et bloc 4." },
      { kind: "synthèse", q: "Quelle idée faut-il retenir sur la fondation de Rome ?", a: "La ville se forme progressivement, tandis que les récits de fondation construisent une identité civique.", choices: ["Rome devient capitale impériale dès le premier jour.", "La fondation est seulement une fable inutile pour l’historien.", "L’archéologie confirme chaque détail du récit de la louve."], why: "La bonne réponse combine formation urbaine et mémoire politique.", trap: "Choisir tout vrai ou tout faux.", evidence: "Conclusion." }
    ]
  },

  "rome-italy-expansion": {
    hook: "Avant de dominer la Méditerranée, Rome doit d’abord dominer l’Italie. Cette étape est décisive : Rome gagne par la guerre, mais aussi par des alliances, des statuts différenciés et une intégration politique très pragmatique.",
    keyFacts: [
      "Quand : Ve → IIIe siècles av. J.-C., avant les guerres puniques",
      "Où : Latium, Italie centrale, Italie du Sud",
      "Acteurs : Romains, Latins, Samnites, cités grecques du Sud, alliés italiens",
      "Traces : traités, récits de Tite-Live, colonies, voies, statuts juridiques",
      "Piège : croire que Rome conquiert l’Italie seulement par des victoires militaires"
    ],
    takeaways: [
      { label: "Idée forte", text: "La conquête de l’Italie repose sur un mélange de guerre, alliances, colonies et statuts juridiques." },
      { label: "Repère", text: "Il faut regarder comment Rome traite différemment les vaincus : certains deviennent citoyens, alliés ou communautés liées par traité." },
      { label: "Conséquence", text: "Cette intégration donne à Rome des soldats, des ressources et une profondeur stratégique." }
    ],
    express: [
      "Rome ne passe pas directement du petit Latium à l’empire méditerranéen. Elle construit d’abord sa domination en Italie, du Ve au IIIe siècle av. J.-C., face aux peuples voisins, aux Samnites et aux cités grecques du Sud.",
      "Sa force n’est pas seulement militaire. Rome impose ou négocie des statuts variés : citoyenneté complète, citoyenneté limitée, alliances, colonies, obligations militaires. Les vaincus ne sont pas tous traités pareil, ce qui permet de diviser, intégrer et mobiliser.",
      "Le point à retenir est stratégique : Rome fabrique un réseau italien. Quand les guerres puniques commencent, elle peut appeler des alliés, lever des soldats et encaisser des défaites parce que sa puissance repose sur une Italie déjà organisée autour d’elle."
    ],
    complete: [
      { title: "1. Une expansion par étapes", text: "Rome commence par affirmer sa position dans le Latium, puis affronte des voisins plus puissants ou mieux installés. Les guerres ne suivent pas une ligne droite : il y a défaites, traités, reprises, colonies et rivalités régionales." },
      { title: "2. Les Samnites, adversaires majeurs", text: "Les guerres samnites montrent que la conquête de l’Italie n’est pas facile. Les Samnites contrôlent des espaces montagneux et obligent Rome à s’adapter militairement et politiquement." },
      { title: "3. Les cités grecques du Sud", text: "En Italie du Sud, Rome rencontre des cités grecques anciennes et riches. L’intervention de Pyrrhus montre que le monde italien est lié à des puissances plus larges. Rome apprend à gérer des conflits qui dépassent son voisinage immédiat." },
      { title: "4. Intégrer pour dominer", text: "La vraie originalité romaine est d’organiser les vaincus. Certains reçoivent la citoyenneté, d’autres gardent une autonomie sous contrainte, d’autres fournissent des soldats. Rome transforme ainsi la conquête en réseau durable d’obligations." },
      { title: "5. Préparer l’empire", text: "La domination de l’Italie donne à Rome une base humaine et matérielle immense. Ce n’est pas encore l’empire, mais c’est la condition de l’expansion méditerranéenne : sans l’Italie mobilisée, Rome ne résisterait pas aux guerres longues." }
    ],
    deeper: [
      { title: "Repère", text: "Allié italien : communauté liée à Rome par des obligations, notamment militaires, sans être nécessairement composée de citoyens romains complets." },
      { title: "Nuance", text: "L’intégration romaine n’est pas égalitaire : elle donne des avantages à certains groupes et impose des contraintes fortes à d’autres." },
      { title: "Erreur fréquente", text: "Raconter seulement des batailles : la domination romaine dépend aussi du droit, des statuts, des routes, des colonies et de la mobilisation." }
    ],
    quiz: [
      { kind: "mécanisme", q: "Pourquoi la conquête de l’Italie ne se résume-t-elle pas à des batailles ?", a: "Parce que Rome combine guerre, alliances, colonies, statuts juridiques et obligations militaires.", choices: ["Parce que Rome évite totalement la guerre en Italie.", "Parce que les cités grecques du Sud contrôlent directement le Sénat.", "Parce que les Samnites deviennent empereurs de Rome."], why: "La domination repose sur un réseau politique et militaire.", trap: "Raconter uniquement une suite de victoires.", evidence: "Express et bloc 4." },
      { kind: "acteurs", q: "Quel adversaire montre que la conquête italienne est difficile ?", a: "Les Samnites, notamment dans les espaces montagneux d’Italie centrale.", choices: ["Les Vikings de la mer du Nord.", "Les califes abbassides de Bagdad.", "Les armées napoléoniennes du XIXe siècle."], why: "Les Samnites obligent Rome à s’adapter.", trap: "Imaginer une expansion automatique.", evidence: "Bloc 2." },
      { kind: "concept", q: "Que signifie intégrer pour dominer dans le cas romain ?", a: "Traiter différemment les vaincus pour obtenir fidélité, soldats, ressources et contrôle durable.", choices: ["Accorder immédiatement la même égalité politique à toute l’Italie.", "Détruire chaque cité vaincue pour éviter toute alliance.", "Refuser toute obligation militaire aux communautés italiennes."], why: "Rome varie les statuts au lieu d’uniformiser tout le monde.", trap: "Confondre intégration et égalité.", evidence: "Bloc 4." },
      { kind: "conséquence", q: "Pourquoi cette conquête prépare-t-elle les guerres méditerranéennes ?", a: "Elle donne à Rome une base italienne de soldats, ressources et alliés mobilisables.", choices: ["Elle rend Rome définitivement pacifique.", "Elle supprime le besoin d’institutions politiques.", "Elle transforme immédiatement Rome en monarchie chrétienne."], why: "La profondeur italienne permet de tenir les conflits longs.", trap: "Séparer conquête italienne et expansion impériale.", evidence: "Bloc 5." },
      { kind: "piège", q: "Quel piège faut-il éviter ?", a: "Croire que Rome domine l’Italie seulement par une supériorité militaire simple.", choices: ["Chercher des alliances et des statuts dans l’explication.", "Situer la conquête avant les guerres puniques.", "Distinguer citoyens, alliés et cités dépendantes."], why: "La conquête romaine est aussi juridique et politique.", trap: "Rendre Rome invincible par nature.", evidence: "Deeper et synthèse." }
    ]
  },

  "rome-punic-wars": {
    hook: "Les guerres puniques font passer Rome du rang de puissance italienne à celui de puissance méditerranéenne. Elles opposent Rome à Carthage, mais l’enjeu dépasse le duel : mer, îles, ressources, alliances, provinces et capacité à continuer une guerre longue.",
    keyFacts: [
      "Quand : 264 → 146 av. J.-C.",
      "Où : Sicile, Méditerranée occidentale, Espagne, Italie, Afrique du Nord",
      "Acteurs : Rome, Carthage, Hannibal, Scipion, alliés italiens, populations provinciales",
      "Repères : Cannes en 216 av. J.-C. ; Zama en 202 ; destruction de Carthage en 146",
      "Piège : faire des guerres puniques seulement l’histoire d’Hannibal"
    ],
    takeaways: [
      { label: "Idée forte", text: "Rome gagne parce qu’elle sait mobiliser longtemps, pas parce qu’elle remporte toutes les batailles." },
      { label: "Preuve", text: "Après Cannes, Rome subit une catastrophe mais continue la guerre, conserve des alliances et déplace le conflit." },
      { label: "Conséquence", text: "La victoire crée un empire méditerranéen, avec provinces, richesses, esclaves et tensions internes." }
    ],
    express: [
      "Les guerres puniques opposent Rome et Carthage entre 264 et 146 av. J.-C. Elles commencent autour de la Sicile, espace stratégique entre Italie et Afrique du Nord, puis s’élargissent à l’Espagne, à l’Italie et à l’Afrique.",
      "La deuxième guerre punique est célèbre grâce à Hannibal, qui franchit les Alpes et écrase Rome à Cannes en 216 av. J.-C. Mais Hannibal ne suffit pas à expliquer l’ensemble : Rome perd des batailles, mais conserve assez d’alliés, de soldats et d’institutions pour continuer.",
      "En 146 av. J.-C., Carthage est détruite. Rome domine la Méditerranée occidentale, mais cette victoire transforme aussi Rome elle-même : provinces, butin, esclavage, grands généraux et inégalités nourrissent les crises de la République."
    ],
    complete: [
      { title: "1. Carthage et Rome, deux puissances", text: "Carthage est une grande cité d’Afrique du Nord, héritière du monde phénicien, puissante par la mer, le commerce et ses possessions. Rome est d’abord une puissance italienne. Leur affrontement force Rome à apprendre la guerre navale et l’administration de territoires extérieurs." },
      { title: "2. La Sicile comme verrou", text: "La Sicile contrôle routes maritimes, ports et ressources agricoles. La première guerre punique oblige Rome à construire une flotte et à sortir de son cadre italien. C’est un changement d’échelle." },
      { title: "3. Hannibal et la guerre d’usure", text: "Hannibal remporte de grandes victoires grâce à sa mobilité et à sa tactique. Mais après Cannes, Rome ne capitule pas. Elle évite parfois l’affrontement direct, reconstitue des armées et attaque les bases carthaginoises ailleurs." },
      { title: "4. Scipion et la bascule africaine", text: "Le conflit se déplace en Espagne puis en Afrique. Scipion l’Africain bat Hannibal à Zama en 202 av. J.-C. Rome impose ensuite sa supériorité, mais laisse Carthage affaiblie avant la destruction finale de 146." },
      { title: "5. Une victoire qui change Rome", text: "Les guerres puniques donnent à Rome des provinces, des tributs, des terres, des esclaves et un prestige immense. Mais elles renforcent aussi les écarts sociaux et le pouvoir des généraux, préparant les tensions de la fin de la République." }
    ],
    deeper: [
      { title: "Repère", text: "Punique vient de Punicus, terme latin lié aux Phéniciens ; Carthage est une puissance issue de ce monde méditerranéen." },
      { title: "Nuance", text: "Cannes est une victoire éclatante d’Hannibal, mais une grande victoire tactique ne suffit pas toujours à gagner une guerre longue." },
      { title: "Erreur fréquente", text: "Transformer les guerres puniques en duel de héros entre Hannibal et Rome, en oubliant mer, ressources, alliances et provinces." }
    ],
    quiz: [
      { kind: "lieu", q: "Pourquoi la Sicile est-elle importante dans la première guerre punique ?", a: "Parce qu’elle contrôle des ports, routes maritimes et ressources entre l’Italie et l’Afrique du Nord.", choices: ["Parce qu’elle est le centre politique du Sénat romain.", "Parce qu’elle est déjà une province chrétienne de l’Empire tardif.", "Parce qu’elle empêche Rome de construire des routes terrestres."], why: "La Sicile oblige Rome à changer d’échelle maritime.", trap: "La voir comme un simple décor militaire.", evidence: "Bloc 2." },
      { kind: "personnage", q: "Pourquoi Hannibal ne suffit-il pas à expliquer les guerres puniques ?", a: "Parce que l’enjeu inclut mer, alliances, ressources, provinces et capacité romaine à continuer la guerre.", choices: ["Parce qu’Hannibal n’a jamais combattu Rome.", "Parce que Carthage est une cité grecque sans flotte.", "Parce que Rome gagne toutes les batailles sans difficulté."], why: "Une guerre longue ne se résume pas à un général brillant.", trap: "Faire une biographie d’Hannibal au lieu d’une histoire impériale.", evidence: "Express et deeper." },
      { kind: "date", q: "Que montre la bataille de Cannes en 216 av. J.-C. ?", a: "Rome peut subir une défaite énorme sans s’effondrer immédiatement.", choices: ["Rome détruit Carthage ce jour-là.", "La République romaine devient officiellement un empire.", "Hannibal est battu définitivement en Afrique."], why: "La capacité de mobilisation romaine est décisive.", trap: "Croire qu’une bataille suffit toujours à finir une guerre.", evidence: "Bloc 3." },
      { kind: "repère", q: "Que se passe-t-il à Zama en 202 av. J.-C. ?", a: "Scipion l’Africain bat Hannibal et fait basculer la deuxième guerre punique.", choices: ["Romulus fonde Rome sur le Palatin.", "Carthage signe le traité de Verdun.", "Auguste reçoit le titre de princeps."], why: "Zama déplace l’avantage décisif vers Rome.", trap: "Mélanger les repères romains célèbres.", evidence: "Bloc 4." },
      { kind: "conséquence", q: "Quel effet les guerres puniques ont-elles sur Rome ?", a: "Elles renforcent Rome mais créent aussi provinces, richesses, esclavage et tensions sociales.", choices: ["Elles ramènent Rome à un simple village du Latium.", "Elles suppriment les inégalités entre citoyens et esclaves.", "Elles interdisent toute expansion romaine hors d’Italie."], why: "La victoire impériale nourrit aussi la crise républicaine.", trap: "Voir la conquête comme un bénéfice sans coût interne.", evidence: "Bloc 5." }
    ]
  },

  "rome-republic-crisis": {
    hook: "La République romaine ne s’effondre pas parce que les Romains auraient soudain oublié leurs institutions. Elle entre en crise parce que conquêtes, inégalités, armées personnelles et rivalités aristocratiques rendent les anciens équilibres intenables.",
    keyFacts: [
      "Quand : surtout IIe → Ier siècle av. J.-C.",
      "Où : Rome, Italie, provinces méditerranéennes",
      "Acteurs : Sénat, plèbe, Gracques, Marius, Sylla, Pompée, César, soldats, alliés italiens",
      "Enjeux : terres, citoyenneté, armées, violences politiques, commandements provinciaux",
      "Piège : expliquer la crise uniquement par l’ambition de César"
    ],
    takeaways: [
      { label: "Idée forte", text: "Les conquêtes enrichissent Rome mais déstabilisent la République par les inégalités, l’armée et la compétition politique." },
      { label: "Mécanisme", text: "Des généraux commandent longtemps des armées fidèles à leur personne, ce qui fragilise les institutions." },
      { label: "Conséquence", text: "La violence politique devient une manière de résoudre des conflits que les institutions ne contiennent plus." }
    ],
    express: [
      "Aux IIe et Ier siècles av. J.-C., Rome domine un espace immense, mais la République souffre de ses succès. Les conquêtes apportent richesses, esclaves, provinces et prestige, tout en creusant les tensions sociales et politiques.",
      "Les conflits portent sur la terre, la citoyenneté italienne, le poids du Sénat, le rôle des tribuns, les commandements militaires et la fidélité des soldats. Les Gracques, Marius, Sylla, Pompée et César ne sont pas des accidents isolés : ils incarnent une crise structurelle.",
      "Le piège est de dire “César détruit la République” comme si tout dépendait d’un homme. César joue un rôle décisif, mais il arrive dans une République déjà fragilisée par les guerres civiles, les violences politiques et les armées personnelles."
    ],
    complete: [
      { title: "1. Une République enrichie par la conquête", text: "Rome gagne des provinces, des butins, des esclaves et des commandements prestigieux. Cette richesse n’est pas répartie également. Les élites peuvent accroître leurs domaines et leur influence, tandis que des petits citoyens-soldats sont fragilisés." },
      { title: "2. La question agraire", text: "Les réformes des Gracques cherchent à répondre au problème des terres et de la pauvreté civique. Leur destin violent montre que les institutions républicaines ont de plus en plus de mal à arbitrer les conflits sociaux." },
      { title: "3. L’armée et les fidélités personnelles", text: "Les campagnes lointaines et les commandements prolongés donnent aux généraux un poids immense. Des soldats attendent solde, butin et terres de leur chef. La fidélité à Rome se mêle à la fidélité personnelle au général." },
      { title: "4. Violence et guerres civiles", text: "Sylla marche sur Rome, des proscriptions éliminent des adversaires, les rivalités entre grands hommes deviennent armées. La politique républicaine se militarise : les conflits ne restent plus confinés aux débats et aux votes." },
      { title: "5. César dans une crise déjà avancée", text: "César franchit le Rubicon en 49 av. J.-C. et ouvre une nouvelle guerre civile. Il accélère la fin de la République, mais il n’en est pas la seule cause. Son ascension est possible parce que les équilibres anciens sont déjà brisés." }
    ],
    deeper: [
      { title: "Repère", text: "Guerre civile : conflit armé entre membres d’une même communauté politique, ici des Romains contre des Romains." },
      { title: "Nuance", text: "La République garde longtemps ses mots et ses magistratures, mais les pratiques politiques changent en profondeur." },
      { title: "Erreur fréquente", text: "Réduire la crise à une lutte de personnalités : les structures sociales et militaires comptent autant que les ambitions individuelles." }
    ],
    quiz: [
      { kind: "cause", q: "Pourquoi les conquêtes fragilisent-elles aussi la République ?", a: "Parce qu’elles apportent richesses, provinces, esclaves et commandements qui creusent les tensions sociales et politiques.", choices: ["Parce qu’elles font disparaître toutes les élites romaines.", "Parce qu’elles rendent le Sénat parfaitement égalitaire.", "Parce qu’elles empêchent tout général d’obtenir du prestige."], why: "Le succès extérieur produit des déséquilibres internes.", trap: "Voir la conquête uniquement comme une réussite.", evidence: "Express et bloc 1." },
      { kind: "réforme", q: "Que révèle la violence autour des Gracques ?", a: "Les institutions républicaines peinent à arbitrer des conflits sociaux devenus explosifs.", choices: ["La République romaine fonctionne sans conflit politique.", "Les Gracques imposent immédiatement un empire monarchique.", "La question des terres ne concerne jamais les citoyens."], why: "Les réformes agraires montrent une crise sociale et institutionnelle.", trap: "Réduire l’épisode à deux biographies.", evidence: "Bloc 2." },
      { kind: "armée", q: "Pourquoi les armées personnelles sont-elles dangereuses pour la République ?", a: "Parce que les soldats peuvent dépendre de leur général pour solde, butin, terres et carrière.", choices: ["Parce que les soldats romains ne participent jamais aux guerres.", "Parce que les généraux n’ont aucun pouvoir hors de Rome.", "Parce que la République interdit toute campagne militaire."], why: "La fidélité militaire se personnalise.", trap: "Penser que l’armée reste extérieure à la politique.", evidence: "Bloc 3." },
      { kind: "événement", q: "Que signifie la marche de Sylla sur Rome ?", a: "La violence militaire entre dans la politique romaine au cœur même de la cité.", choices: ["La conversion officielle de Rome au christianisme.", "La fin des guerres civiles par consensus.", "La fondation légendaire de Rome par les jumeaux."], why: "La guerre civile touche directement le centre politique.", trap: "Ne voir Sylla que comme un nom de général.", evidence: "Bloc 4." },
      { kind: "synthèse", q: "Pourquoi César n’explique-t-il pas à lui seul la fin de la République ?", a: "Parce qu’il arrive dans une République déjà fragilisée par inégalités, violences et armées personnelles.", choices: ["Parce que César ne joue aucun rôle dans les guerres civiles.", "Parce que la République reste stable jusqu’au IIIe siècle ap. J.-C.", "Parce que tout commence seulement avec Auguste."], why: "César accélère une crise déjà profonde.", trap: "Chercher un responsable unique.", evidence: "Bloc 5." }
    ]
  },

  "rome-christianity-late-empire": {
    hook: "Le christianisme ne devient pas religion impériale par un simple déclic spirituel. Dans l’Empire tardif, il transforme les alliances politiques, les institutions, les villes, les conflits religieux et la manière de penser l’autorité.",
    keyFacts: [
      "Quand : Ier → IVe siècles, puis Empire tardif",
      "Où : Empire romain, villes méditerranéennes, Orient et Occident",
      "Acteurs : communautés chrétiennes, évêques, empereurs, élites urbaines, païens, hérétiques désignés",
      "Repères : persécutions ponctuelles ; Constantin ; édit de Milan en 313 ; Théodose à la fin du IVe siècle",
      "Piège : croire que tout l’Empire devient chrétien instantanément"
    ],
    takeaways: [
      { label: "Idée forte", text: "La christianisation de l’Empire est progressive, conflictuelle et politique autant que religieuse." },
      { label: "Preuve", text: "Édits, conciles, basiliques, inscriptions et rôle des évêques montrent l’entrée du christianisme dans l’espace public." },
      { label: "Nuance", text: "La conversion impériale ne signifie pas disparition immédiate des cultes anciens ni accord entre tous les chrétiens." }
    ],
    express: [
      "Au départ, les chrétiens forment des communautés minoritaires dans l’Empire romain. Ils peuvent être tolérés, ignorés ou persécutés selon les périodes et les lieux. Il ne faut donc pas imaginer une persécution permanente et uniforme.",
      "Le tournant majeur est Constantin : après le début du IVe siècle, le christianisme obtient une reconnaissance impériale, des privilèges et une visibilité nouvelle. L’édit de Milan en 313 symbolise cette légalisation, même si l’évolution reste progressive.",
      "À la fin du IVe siècle, avec Théodose, le christianisme nicéen devient central dans l’ordre impérial. Mais la christianisation reste conflictuelle : débats théologiques, conciles, tensions avec les cultes anciens, rôle croissant des évêques et différences entre régions."
    ],
    complete: [
      { title: "1. Des communautés minoritaires", text: "Les premiers chrétiens vivent dans un empire polythéiste où la religion est liée aux cités, aux familles, à l’empereur et aux rites publics. Ils ne forment pas un bloc social unique : on trouve des pauvres, des femmes, des artisans, mais aussi progressivement des élites." },
      { title: "2. Des persécutions réelles mais discontinues", text: "Certaines persécutions sont violentes, notamment quand l’État exige des gestes de loyauté religieuse. Mais elles ne sont pas permanentes dans tout l’Empire. Selon les empereurs, les provinces et les moments, la situation varie." },
      { title: "3. Constantin et la légalisation", text: "Constantin ne rend pas tout l’Empire chrétien en un jour. Il donne au christianisme un statut favorable, soutient l’Église, intervient dans les débats et associe progressivement pouvoir impérial et religion chrétienne." },
      { title: "4. Évêques, conciles et débats", text: "Les évêques deviennent des acteurs urbains majeurs. Les conciles cherchent à définir la doctrine, mais les désaccords montrent que le christianisme antique n’est pas uniforme. Le pouvoir impérial intervient souvent pour stabiliser l’unité religieuse." },
      { title: "5. Une transformation de l’Empire", text: "La christianisation change les monuments, les calendriers, les lois, les formes de charité, les conflits et la légitimité politique. Elle ne fait pas disparaître immédiatement l’Empire romain : elle participe à sa transformation tardive." }
    ],
    deeper: [
      { title: "Repère", text: "Concile : assemblée d’évêques réunie pour trancher des questions de doctrine, de discipline ou d’organisation de l’Église." },
      { title: "Nuance", text: "Le mot paganisme regroupe des cultes très variés ; il ne désigne pas une religion unique comparable à une Église centralisée." },
      { title: "Erreur fréquente", text: "Dire “Constantin convertit l’Empire” est trop rapide : il légalise, favorise et politise une évolution plus longue." }
    ],
    quiz: [
      { kind: "nuance", q: "Pourquoi faut-il nuancer l’idée de persécution permanente ?", a: "Parce que les persécutions chrétiennes sont réelles mais variables selon les périodes, lieux et empereurs.", choices: ["Parce que les chrétiens gouvernent l’Empire dès le Ier siècle.", "Parce que Rome ignore toujours les questions religieuses.", "Parce que toutes les provinces suivent exactement la même politique."], why: "Le cours refuse l’idée d’une situation uniforme.", trap: "Transformer toute l’histoire chrétienne antique en récit unique de persécution.", evidence: "Bloc 2." },
      { kind: "repère", q: "Que symbolise l’édit de Milan en 313 ?", a: "La légalisation et la reconnaissance du christianisme dans l’Empire romain.", choices: ["La destruction de Carthage par Rome.", "La fondation légendaire de Rome.", "La victoire d’Hannibal à Cannes."], why: "313 marque un tournant juridique et politique.", trap: "Le confondre avec une conversion instantanée de tous les habitants.", evidence: "Express et bloc 3." },
      { kind: "acteur", q: "Pourquoi les évêques deviennent-ils importants ?", a: "Ils deviennent des acteurs urbains, religieux et politiques capables d’organiser des communautés et de peser dans les débats.", choices: ["Ils remplacent immédiatement tous les magistrats romains.", "Ils commandent seuls toutes les légions de frontière.", "Ils abolissent les villes et les institutions."], why: "La christianisation transforme aussi le pouvoir local.", trap: "Voir les évêques comme de simples prêtres sans poids social.", evidence: "Bloc 4." },
      { kind: "concept", q: "À quoi servent les conciles ?", a: "À réunir des évêques pour trancher des questions de doctrine, discipline ou organisation de l’Église.", choices: ["À élire les consuls de la République romaine.", "À organiser les courses de chars du cirque.", "À répartir les terres conquises aux vétérans."], why: "Les conciles montrent que l’unité doctrinale se construit.", trap: "Imaginer un christianisme antique déjà totalement uniforme.", evidence: "Deeper et bloc 4." },
      { kind: "synthèse", q: "Quelle idée retenir sur la christianisation de l’Empire ?", a: "Elle est progressive, conflictuelle et transforme l’autorité impériale autant que la vie religieuse.", choices: ["Elle se fait en une journée après Constantin.", "Elle met fin immédiatement à toutes les structures romaines.", "Elle ne concerne que des croyances privées sans effet politique."], why: "Le cours relie religion, institutions, villes et pouvoir.", trap: "Séparer complètement croyance et politique.", evidence: "Conclusion." }
    ]
  }
});


const EGYPT_EDITORIAL_LESSON_IDS = [
  "egypt-two-lands",
  "egypt-ramses",
  "egypt-connected"
];
EGYPT_EDITORIAL_LESSON_IDS.forEach(id => PUBLISHED_LESSON_IDS.add(id));

Object.assign(READY_LESSON_PACKS, {
  "egypt-two-lands": {
    hook: "Avant les pyramides, il faut comprendre comment l’Égypte devient un royaume : l’unification des Deux Terres transforme une vallée en État pharaonique.",
    keyFacts: [
      "Quand : autour de -3100, avec une chronologie encore discutée",
      "Où : Haute-Égypte au sud, Basse-Égypte dans le delta",
      "Acteurs : élites locales, premiers rois, administration naissante, sanctuaires",
      "Traces : palettes cérémonielles, tombes d’Abydos, motifs des deux couronnes, premières inscriptions",
      "Piège : imaginer une unification instantanée par un seul héros"
    ],
    takeaways: [
      { label: "Idée forte", text: "L’unification des Deux Terres est un processus politique, religieux et administratif, pas seulement une victoire militaire." },
      { label: "Preuve", text: "Les symboles des couronnes, les noms royaux, les tombes et les objets cérémoniels montrent la construction d’un pouvoir central." },
      { label: "Nuance", text: "Narmer est important dans la mémoire des débuts, mais il ne faut pas réduire toute la formation de l’État égyptien à un seul personnage." }
    ],
    express: [
      "Les Égyptiens parlent souvent des Deux Terres : la Haute-Égypte, au sud de la vallée du Nil, et la Basse-Égypte, dans le delta. L’unification de ces espaces autour de -3100 est un moment fondateur, même si elle ne doit pas être imaginée comme une scène simple et instantanée.",
      "Les premiers rois construisent leur autorité avec des symboles puissants : couronnes, noms royaux, rites, images de domination, liens avec les dieux et contrôle des lieux importants. Le pouvoir pharaonique naît donc en associant guerre, religion, administration et mémoire officielle.",
      "Le piège est de raconter seulement Narmer comme un héros qui aurait “créé l’Égypte” d’un coup. Ce qui compte historiquement, c’est la formation progressive d’un État capable de contrôler les hommes, les terres, les récoltes, les cultes et les signes du pouvoir."
    ],
    complete: [
      { title: "1. Deux espaces à unir", text: "La Haute-Égypte correspond à la vallée étroite du Nil vers le sud ; la Basse-Égypte correspond au delta, plus ouvert sur la Méditerranée. Les appeler Deux Terres montre que l’unité égyptienne est pensée comme la réunion de régions différentes." },
      { title: "2. Un processus plus qu’un instant", text: "Autour de -3100, les traces suggèrent une concentration du pouvoir. Mais l’unification n’est probablement pas un événement unique et limpide : elle combine rivalités entre élites, contrôle de territoires, conquêtes, alliances et mise en ordre symbolique." },
      { title: "3. Narmer et les images du pouvoir", text: "La palette de Narmer est célèbre parce qu’elle montre un roi dans des scènes de domination et de victoire. Elle est précieuse, mais ce n’est pas une photo de reportage : c’est un objet cérémoniel qui met en scène une idéologie royale." },
      { title: "4. Naissance d’un État pharaonique", text: "Unifier, ce n’est pas seulement battre des adversaires. Il faut compter, prélever, stocker, organiser des travaux, contrôler des sanctuaires, afficher l’autorité du roi et créer une mémoire commune. Les premiers signes d’écriture et d’administration deviennent donc essentiels." },
      { title: "5. Une mémoire durable", text: "L’idée des Deux Terres reste centrale pendant toute l’histoire pharaonique. Même des siècles plus tard, le pharaon est présenté comme celui qui tient ensemble la Haute et la Basse-Égypte. Le début du royaume devient ainsi une référence politique permanente." }
    ],
    deeper: [
      { title: "Repère", text: "Deux Terres : expression qui désigne la Haute et la Basse-Égypte, dont l’union symbolise l’autorité du pharaon." },
      { title: "Source à manier", text: "Une palette cérémonielle renseigne sur la mise en scène du pouvoir, mais pas directement sur tous les détails de l’événement représenté." },
      { title: "Erreur fréquente", text: "Croire qu’un seul roi fonde l’Égypte d’un geste simple. L’unification est aussi une construction administrative, religieuse et mémorielle." }
    ],
    quiz: [
      { kind: "concept", q: "Que désignent les Deux Terres ?", a: "La Haute-Égypte au sud et la Basse-Égypte dans le delta, réunies symboliquement sous l’autorité du roi.", choices: ["Deux empires séparés entre Rome et Athènes.", "Deux pyramides construites par le même architecte.", "Deux routes commerciales entre Chine et Méditerranée."], why: "L’expression résume l’unité politique égyptienne.", trap: "Croire qu’il s’agit seulement d’une formule poétique.", evidence: "Express et bloc 1." },
      { kind: "date", q: "Pourquoi faut-il être prudent avec l’unification autour de -3100 ?", a: "Parce qu’elle désigne un processus de formation de l’État plus qu’un événement unique parfaitement connu.", choices: ["Parce que l’Égypte n’existe qu’après Alexandre.", "Parce que les pyramides sont déjà détruites à cette date.", "Parce que cette date correspond à la fin de l’Empire romain."], why: "Les débuts sont reconstruits à partir de traces partielles.", trap: "Transformer une chronologie utile en scène simple.", evidence: "Bloc 2." },
      { kind: "source", q: "Que montre surtout la palette de Narmer ?", a: "Une mise en scène cérémonielle de la victoire et de l’idéologie royale.", choices: ["Un contrat fiscal complet avec les paysans du delta.", "Une carte précise de toutes les provinces égyptiennes.", "Un récit neutre écrit par un témoin extérieur."], why: "L’objet est précieux, mais il met en scène le pouvoir.", trap: "La lire comme un reportage moderne.", evidence: "Bloc 3." },
      { kind: "pouvoir", q: "Pourquoi l’unification n’est-elle pas seulement militaire ?", a: "Parce qu’elle implique aussi administration, rites, prélèvements, sanctuaires et symboles royaux.", choices: ["Parce qu’aucune élite locale n’existe dans la vallée du Nil.", "Parce que l’écriture remplace entièrement le pouvoir royal.", "Parce que les temples n’ont aucun rôle politique."], why: "Un État durable doit organiser plus que des batailles.", trap: "Réduire l’État à la guerre.", evidence: "Bloc 4." },
      { kind: "synthèse", q: "Quelle idée reste durable dans la monarchie pharaonique ?", a: "Le pharaon est celui qui tient ensemble la Haute et la Basse-Égypte.", choices: ["Le roi égyptien refuse tous les symboles religieux.", "La Basse-Égypte gouverne seule tout le royaume sans roi.", "L’unification est oubliée dès l’Ancien Empire."], why: "Les Deux Terres deviennent un langage permanent du pouvoir.", trap: "Croire que les débuts ne comptent plus ensuite.", evidence: "Bloc 5." }
    ]
  },

  "egypt-ramses": {
    hook: "Ramsès II est célèbre pour ses colosses, ses temples et Qadesh. Mais le plus intéressant n’est pas seulement sa gloire : c’est la fabrication politique de cette gloire.",
    keyFacts: [
      "Quand : règne de Ramsès II, XIIIe siècle av. J.-C.",
      "Où : Égypte du Nouvel Empire, Levant, Qadesh, Abou Simbel, Pi-Ramsès",
      "Acteurs : Ramsès II, Hittites, armée égyptienne, scribes, artisans, prêtres",
      "Traces : inscriptions royales, reliefs de bataille, temples, traité égypto-hittite",
      "Piège : prendre la propagande de Qadesh comme une victoire totale et simple"
    ],
    takeaways: [
      { label: "Idée forte", text: "Ramsès II montre comment un pharaon du Nouvel Empire construit son image par guerre, diplomatie, temples et inscriptions." },
      { label: "Preuve", text: "Les récits de Qadesh répétés sur les temples transforment un affrontement difficile en victoire royale mémorable." },
      { label: "Nuance", text: "Le traité avec les Hittites rappelle que la diplomatie compte autant que la bataille." }
    ],
    express: [
      "Ramsès II règne au XIIIe siècle av. J.-C., pendant le Nouvel Empire. Son image est immense : temples, colosses, inscriptions, capitales et scènes militaires. Il devient un modèle de pharaon puissant, mais cette puissance est aussi soigneusement mise en scène.",
      "La bataille de Qadesh, contre les Hittites, est racontée comme un exploit personnel du roi. Pourtant, l’affrontement ne donne pas une victoire égyptienne simple et définitive. Les récits officiels montrent surtout comment le pouvoir transforme une situation militaire complexe en propagande royale.",
      "Ramsès II est aussi un acteur diplomatique. Le traité avec les Hittites montre que l’Égypte du Nouvel Empire vit dans un monde de grandes puissances, d’alliances, de rivalités et de négociations. Le pharaon n’est donc pas seulement un guerrier : il est aussi un constructeur d’image et d’équilibre politique."
    ],
    complete: [
      { title: "1. Un règne très long", text: "Ramsès II règne longtemps, ce qui lui permet d’accumuler monuments, inscriptions et mémoire officielle. La durée du règne contribue à son prestige : plus le roi est visible partout, plus il semble incarner la stabilité du royaume." },
      { title: "2. Le Nouvel Empire et le Levant", text: "Au Nouvel Empire, l’Égypte projette sa puissance au-delà de la vallée du Nil, notamment vers le Levant. Elle y rencontre d’autres grandes puissances, dont les Hittites. Qadesh appartient à cette géopolitique, pas à un simple duel héroïque." },
      { title: "3. Qadesh : bataille et propagande", text: "Les inscriptions racontent Ramsès sauvant la situation par son courage. Cette image est politique. L’affrontement est difficile, et la répétition du récit sur plusieurs monuments montre que le roi veut imposer une mémoire de victoire." },
      { title: "4. Diplomatie avec les Hittites", text: "Après les affrontements, Égyptiens et Hittites concluent un traité. C’est essentiel : la puissance d’un roi ne se mesure pas seulement à ses victoires, mais aussi à sa capacité à stabiliser des frontières, négocier et être reconnu par d’autres souverains." },
      { title: "5. Des monuments comme langage politique", text: "Abou Simbel, Pi-Ramsès et les reliefs royaux ne servent pas seulement à décorer. Ils rendent le pouvoir visible, rappellent la protection divine du roi et fixent dans la pierre la version officielle de son règne." }
    ],
    deeper: [
      { title: "Repère", text: "Propagande royale : mise en forme officielle du pouvoir, destinée à montrer le roi comme vainqueur, protecteur et choisi par les dieux." },
      { title: "Nuance", text: "Un récit royal peut contenir des faits, mais il sélectionne et organise ces faits pour produire une image avantageuse du souverain." },
      { title: "Erreur fréquente", text: "Raconter Qadesh comme une victoire nette de Ramsès II. L’intérêt historique est justement l’écart entre bataille, diplomatie et mémoire officielle." }
    ],
    quiz: [
      { kind: "repère", q: "À quelle période appartient Ramsès II ?", a: "Au Nouvel Empire, au XIIIe siècle av. J.-C.", choices: ["À l’époque de la Révolution française.", "Au temps de la République romaine tardive.", "Au Moyen Âge scandinave."], why: "Le cadre chronologique évite de mélanger les périodes.", trap: "Traiter Ramsès comme un pharaon hors du temps.", evidence: "Express et repères." },
      { kind: "événement", q: "Pourquoi Qadesh est-elle importante ?", a: "Parce qu’elle oppose l’Égypte aux Hittites et devient un grand récit de propagande royale.", choices: ["Parce qu’elle marque la construction de la première pyramide.", "Parce qu’elle fonde la démocratie athénienne.", "Parce qu’elle met fin à l’Empire romain d’Occident."], why: "Qadesh relie guerre, rivalité de puissances et mémoire officielle.", trap: "La réduire à une simple bataille gagnée.", evidence: "Bloc 3." },
      { kind: "source", q: "Comment lire les inscriptions de Qadesh ?", a: "Comme des récits officiels qui mettent en scène le courage du roi et organisent la mémoire de l’événement.", choices: ["Comme des journaux neutres écrits par les soldats hittites.", "Comme des documents sans intention politique.", "Comme des preuves que la diplomatie n’existe pas."], why: "La source royale est précieuse mais orientée.", trap: "Confondre inscription royale et reportage.", evidence: "Deeper et bloc 3." },
      { kind: "diplomatie", q: "Que montre le traité avec les Hittites ?", a: "Que la puissance de Ramsès II passe aussi par la diplomatie et la stabilisation des relations internationales.", choices: ["Que l’Égypte ne connaît aucun voisin puissant.", "Que tous les conflits se règlent par des pyramides.", "Que les Hittites sont des scribes du delta."], why: "Le traité nuance l’image du roi uniquement guerrier.", trap: "Opposer guerre et diplomatie.", evidence: "Bloc 4." },
      { kind: "synthèse", q: "Pourquoi les monuments de Ramsès II sont-ils politiques ?", a: "Ils rendent visible une version officielle du pouvoir, de la protection divine et de la victoire royale.", choices: ["Ils servent seulement d’abris agricoles pour la crue.", "Ils prouvent que les scribes dirigent seuls l’armée.", "Ils effacent tout lien entre roi et religion."], why: "Les monuments fixent la mémoire royale dans l’espace.", trap: "Les voir comme de simples décorations.", evidence: "Bloc 5." }
    ]
  },

  "egypt-connected": {
    hook: "L’Égypte n’est pas une civilisation enfermée derrière ses déserts. Elle échange, combat, négocie et se transforme au contact de la Nubie, du Levant et de la Méditerranée.",
    keyFacts: [
      "Quand : surtout du Moyen Empire à l’époque tardive, avec un accent sur le Nouvel Empire",
      "Où : vallée du Nil, Nubie, Sinaï, Levant, Méditerranée orientale",
      "Acteurs : Égyptiens, Nubiens, Hyksôs, Hittites, cités du Levant, marchands, diplomates",
      "Traces : lettres diplomatiques, objets importés, forteresses, reliefs, inscriptions, tombes",
      "Piège : imaginer l’Égypte comme un monde isolé et immobile"
    ],
    takeaways: [
      { label: "Idée forte", text: "L’Égypte ancienne est connectée : les échanges, les guerres et la diplomatie font partie de son histoire." },
      { label: "Preuve", text: "Or nubien, bois du Levant, chevaux, chars, lettres diplomatiques et objets étrangers montrent ces circulations." },
      { label: "Nuance", text: "Les contacts ne sont pas toujours pacifiques : commerce, domination, emprunts, rivalités et alliances coexistent." }
    ],
    express: [
      "Les déserts protègent partiellement l’Égypte, mais ils ne l’enferment pas. Le Nil ouvre vers la Nubie au sud, le delta regarde vers la Méditerranée, le Sinaï et le Levant relient l’Égypte au Proche-Orient. L’histoire égyptienne est donc aussi une histoire de contacts.",
      "Ces contacts prennent plusieurs formes : commerce de bois, d’or, de pierres ou de produits de luxe ; campagnes militaires ; forteresses ; mariages diplomatiques ; circulation d’objets, de techniques et d’idées. Le Nouvel Empire, notamment, est très engagé au Levant et en Nubie.",
      "Le piège est de présenter l’Égypte comme une civilisation pure, isolée et toujours identique à elle-même. Les Hyksôs, les Nubiens, les Hittites, les cités du Levant et les routes méditerranéennes montrent au contraire une Égypte puissante mais connectée, parfois dominante, parfois influencée."
    ],
    complete: [
      { title: "1. Des frontières qui filtrent", text: "Les déserts et la mer créent des protections, mais pas des murs absolus. Les oasis, le Sinaï, la Nubie, le delta et les ports permettent des circulations. Une frontière ancienne est souvent un espace de contrôle et de passage, pas une ligne fermée." },
      { title: "2. La Nubie, partenaire et enjeu", text: "Au sud, la Nubie fournit notamment de l’or, des soldats, des produits africains et des routes. L’Égypte y construit parfois des forteresses et impose son contrôle, mais les royaumes nubiens ne sont pas de simples figurants : ils développent aussi leurs propres pouvoirs." },
      { title: "3. Le Levant et les grandes puissances", text: "Vers le nord-est, l’Égypte entre en relation avec les cités du Levant et les grands royaumes du Proche-Orient. Les guerres contre les Hittites, mais aussi les échanges diplomatiques, montrent une Égypte intégrée à un système international." },
      { title: "4. Emprunter et transformer", text: "Les contacts apportent des objets, des techniques, des mots, des styles et parfois des pratiques militaires. L’usage du cheval et du char, les produits importés ou certains motifs artistiques rappellent que les sociétés anciennes changent par circulation." },
      { title: "5. Une puissance connectée", text: "Dire que l’Égypte est connectée ne diminue pas son originalité. Au contraire, cela explique mieux sa durée : elle protège son cœur nilotique tout en utilisant des réseaux extérieurs pour obtenir ressources, prestige, alliés et informations." }
    ],
    deeper: [
      { title: "Repère", text: "Levant : région de la Méditerranée orientale, entre Égypte, Anatolie, Syrie-Palestine et grands royaumes du Proche-Orient." },
      { title: "Nuance", text: "Un contact peut être commercial, militaire, diplomatique, religieux ou artistique ; il ne signifie pas toujours domination dans un seul sens." },
      { title: "Erreur fréquente", text: "Imaginer une Égypte figée derrière le désert. Les sources montrent un royaume qui surveille, échange, emprunte, conquiert et négocie." }
    ],
    quiz: [
      { kind: "concept", q: "Pourquoi l’Égypte n’est-elle pas isolée ?", a: "Parce qu’elle est reliée à la Nubie, au Sinaï, au Levant et à la Méditerranée par des routes et des contacts variés.", choices: ["Parce qu’elle se situe au centre de l’Europe médiévale.", "Parce que ses pyramides servent de ports maritimes.", "Parce qu’elle refuse tout échange avec ses voisins."], why: "La géographie protège mais permet aussi des passages.", trap: "Confondre protection et isolement total.", evidence: "Express et bloc 1." },
      { kind: "lieu", q: "Pourquoi la Nubie est-elle importante pour l’Égypte ?", a: "Elle est liée à l’or, aux routes du Nil, aux soldats, aux forteresses et à des royaumes africains puissants.", choices: ["Elle est une cité grecque inventée par Alexandre.", "Elle est le quartier central de Rome.", "Elle est uniquement une légende funéraire sans territoire."], why: "La Nubie est un espace réel d’échanges et de rivalités.", trap: "La réduire à une marge passive.", evidence: "Bloc 2." },
      { kind: "diplomatie", q: "Que montre le Levant dans l’histoire égyptienne ?", a: "L’intégration de l’Égypte à des guerres, alliances et échanges avec les puissances du Proche-Orient.", choices: ["L’absence totale de voisins au nord-est.", "La fin immédiate de toute monarchie pharaonique.", "La naissance des chasseurs-cueilleurs paléolithiques."], why: "Le Levant connecte l’Égypte aux grands équilibres régionaux.", trap: "Raconter l’Égypte seulement depuis la vallée du Nil.", evidence: "Bloc 3." },
      { kind: "circulation", q: "Quelle idée corrigent les emprunts techniques ou artistiques ?", a: "Les sociétés anciennes changent aussi par circulation d’objets, de techniques, de styles et d’idées.", choices: ["Une civilisation ne change jamais au contact d’une autre.", "Tous les objets étrangers sont automatiquement sans valeur.", "Le commerce supprime toutes les identités politiques."], why: "Les contacts transforment sans effacer l’originalité locale.", trap: "Opposer pureté et influence.", evidence: "Bloc 4." },
      { kind: "synthèse", q: "Quelle formule résume le mieux le cours ?", a: "L’Égypte est une puissance nilotique originale, mais connectée à des réseaux extérieurs.", choices: ["L’Égypte est un monde fermé, sans échanges ni diplomatie.", "L’Égypte est seulement une copie des royaumes hittites.", "L’Égypte n’existe qu’à travers les récits grecs tardifs."], why: "La bonne réponse combine originalité et connexions.", trap: "Choisir entre isolement total et absence d’identité propre.", evidence: "Conclusion." }
    ]
  }
});


const GREECE_AEGEAN_EDITORIAL_LESSON_IDS = [
  "aegean-mediterranean-minoens-crete",
  "aegean-mediterranean-myceniens-palais",
  "aegean-mediterranean-effondrement-egeen"
];
GREECE_AEGEAN_EDITORIAL_LESSON_IDS.forEach(id => PUBLISHED_LESSON_IDS.add(id));

Object.assign(READY_LESSON_PACKS, {
  "aegean-mediterranean-minoens-crete": {
    hook: "Avant les cités grecques classiques, la Crète minoenne montre un autre visage du monde égéen : palais, fresques, routes maritimes et pouvoir sans armée monumentale évidente.",
    keyFacts: [
      "Quand : surtout vers -2000 à -1450",
      "Où : Crète, notamment Cnossos, Phaistos, Malia et Zakros",
      "Acteurs : élites palatiales, artisans, marchands, scribes, communautés crétoises",
      "Traces : palais, fresques, sceaux, tablettes en linéaire A, ateliers, objets importés",
      "Piège : imaginer une Grèce classique déjà formée à l’époque minoenne"
    ],
    takeaways: [
      { label: "Idée forte", text: "Les palais minoens sont des centres de stockage, production, redistribution, rituels et prestige." },
      { label: "Nuance", text: "La Crète minoenne appartient au monde égéen de l’âge du Bronze, pas à la cité grecque classique." },
      { label: "Trace", text: "Fresques, sceaux, jarres, ateliers et écritures non déchiffrées montrent une société complexe." }
    ],
    express: [
      "La Crète minoenne se développe à l’âge du Bronze, surtout entre -2000 et -1450. Elle n’est pas une démocratie grecque ancienne : c’est un monde de palais, de stockage, d’ateliers, de fresques, de rituels et d’échanges maritimes.",
      "Les grands palais comme Cnossos ne sont pas seulement des résidences. Ils organisent des réserves, des productions artisanales, des cérémonies et des circulations de biens. Les jarres, sceaux et tablettes montrent un pouvoir capable d’enregistrer et de contrôler.",
      "Le linéaire A reste largement non déchiffré, ce qui impose de la prudence. On connaît les Minoens par l’archéologie plus que par des récits lisibles. Le vrai intérêt est de comprendre un monde égéen complexe avant Athènes, Sparte et les cités classiques."
    ],
    complete: [
      { title: "1. Une Crète de l’âge du Bronze", text: "Les Minoens vivent plusieurs siècles avant la Grèce classique. Leur histoire appartient à l’âge du Bronze égéen, dans une Méditerranée où circulent métaux, céramiques, idées, techniques et objets de prestige. Les appeler simplement “Grecs” serait trompeur : ils précèdent les cités grecques que l’on connaît mieux." },
      { title: "2. Le palais comme centre", text: "Les palais crétois sont des lieux de pouvoir, mais pas seulement des maisons royales. Ils regroupent magasins, ateliers, cours, salles décorées, espaces rituels et zones de circulation. Ils rendent visible une organisation capable de concentrer et redistribuer des biens." },
      { title: "3. Une puissance maritime", text: "La Crète est au cœur des routes de la mer Égée et de la Méditerranée orientale. Objets importés, influences artistiques et réseaux commerciaux montrent que les Minoens ne vivent pas isolés : ils participent à un monde connecté par bateau." },
      { title: "4. Sources et prudence", text: "Les fresques, sceaux, jarres, ateliers et bâtiments sont abondants, mais l’écriture appelée linéaire A n’est pas vraiment lue. L’historien doit donc éviter les certitudes trop fortes sur la langue, les récits politiques ou les noms des dirigeants." },
      { title: "5. Ce qu’il faut retenir", text: "La Crète minoenne est essentielle parce qu’elle montre que le monde grec a des racines égéennes plus anciennes et variées. Avant la polis, il existe déjà des palais, des réseaux, des techniques, des cultes et des sociétés hiérarchisées." }
    ],
    deeper: [
      { title: "Repère", text: "Linéaire A : écriture utilisée en Crète minoenne, encore non déchiffrée de manière satisfaisante." },
      { title: "Comment le lire", text: "Quand les textes manquent, on raisonne avec l’architecture, les objets, les images et les traces de stockage." },
      { title: "Erreur fréquente", text: "Projeter directement Athènes, la démocratie ou la philosophie classique sur la Crète minoenne." }
    ],
    quiz: [
      { kind: "repère", q: "À quelle période appartient surtout la Crète minoenne ?", a: "À l’âge du Bronze égéen, avant la Grèce classique des cités.", choices: ["À la période des royaumes francs médiévaux.", "À l’époque de la République romaine tardive.", "Au temps des États industriels du XIXe siècle."], why: "Le cours situe les Minoens avant Athènes et Sparte classiques.", trap: "Faire de Cnossos une cité grecque classique.", evidence: "Express et bloc 1." },
      { kind: "concept", q: "Pourquoi le palais minoen n’est-il pas seulement une résidence ?", a: "Parce qu’il concentre stockage, ateliers, rituels, circulation de biens et prestige politique.", choices: ["Parce qu’il sert uniquement de forteresse frontalière.", "Parce qu’il remplace toute activité artisanale.", "Parce qu’il interdit tout échange maritime."], why: "Le palais est un centre d’organisation sociale et économique.", trap: "Le réduire à un logement monumental.", evidence: "Bloc 2." },
      { kind: "connexion", q: "Que montrent les objets importés et les influences artistiques ?", a: "Que la Crète minoenne participe à des réseaux maritimes égéens et méditerranéens.", choices: ["Que l’île est totalement coupée des routes de mer.", "Que les palais ne contrôlent aucun objet.", "Que les échanges apparaissent seulement après Alexandre."], why: "La mer relie la Crète à d’autres espaces.", trap: "Confondre île et isolement.", evidence: "Bloc 3." },
      { kind: "source", q: "Pourquoi faut-il rester prudent avec les Minoens ?", a: "Parce que le linéaire A n’est pas vraiment déchiffré et que beaucoup d’informations viennent de l’archéologie.", choices: ["Parce que toutes les archives politiques sont parfaitement lisibles.", "Parce que les palais ont disparu sans aucune trace matérielle.", "Parce que les fresques suffisent à connaître chaque roi par son nom."], why: "L’état des sources limite les certitudes.", trap: "Inventer une histoire trop précise.", evidence: "Bloc 4." },
      { kind: "synthèse", q: "Quelle idée résume le mieux le cours ?", a: "La Crète minoenne montre un monde égéen complexe avant la polis grecque classique.", choices: ["La Crète minoenne est déjà une démocratie athénienne.", "Les Minoens ne connaissent ni ateliers, ni stockage, ni échanges.", "L’âge du Bronze égéen n’a aucun lien avec la Méditerranée."], why: "Le cours relie complexité palatiale et chronologie.", trap: "Coller trop vite le modèle classique à une période plus ancienne.", evidence: "Conclusion." }
    ]
  },

  "aegean-mediterranean-myceniens-palais": {
    hook: "Les Mycéniens ne sont pas seulement des guerriers de légende. Ce sont aussi des sociétés de palais, de scribes, de stocks, de terres et de réseaux, connues grâce à l’archéologie et au linéaire B.",
    keyFacts: [
      "Quand : surtout vers -1600 à -1200",
      "Où : Grèce continentale, Mycènes, Pylos, Tirynthe, Thèbes",
      "Acteurs : rois palatiaux, guerriers, scribes, artisans, paysans, dépendants",
      "Traces : palais fortifiés, tombes, armes, tablettes en linéaire B, céramiques",
      "Piège : lire l’Iliade comme un reportage direct sur les palais mycéniens"
    ],
    takeaways: [
      { label: "Idée forte", text: "Les palais mycéniens administrent terres, productions, personnes et redistributions." },
      { label: "Preuve", text: "Le linéaire B est déchiffré : il note une forme ancienne de grec et des comptes palatiaux." },
      { label: "Nuance", text: "Les héros homériques gardent une mémoire de l’âge du Bronze, mais les poèmes sont beaucoup plus tardifs." }
    ],
    express: [
      "Les Mycéniens dominent une partie de la Grèce continentale à la fin de l’âge du Bronze, surtout entre -1600 et -1200. Mycènes, Pylos ou Tirynthe sont liées à des palais fortifiés, des tombes riches, des armes et une élite guerrière.",
      "Mais le cœur du sujet n’est pas seulement militaire. Les tablettes en linéaire B montrent une administration qui enregistre terres, rations, artisans, troupeaux, produits et dépendants. Le palais gère, compte et redistribue.",
      "Homère évoque un monde héroïque, mais ses poèmes sont plus tardifs. Pour comprendre les Mycéniens, il faut croiser récits, archéologie et tablettes : les héros fascinent, les archives expliquent le fonctionnement réel des palais."
    ],
    complete: [
      { title: "1. Des palais fortifiés", text: "Les sites mycéniens impressionnent par leurs murs, portes, tombes et espaces palatiaux. Ils ne forment pas un État grec unifié : plusieurs centres dominent des territoires, rivalisent ou coopèrent. La fortification montre l’importance du pouvoir, du prestige et de la protection." },
      { title: "2. Une administration lisible", text: "Le linéaire B est une écriture syllabique utilisée pour des comptes. Son déchiffrement a montré qu’elle note une forme ancienne de grec. Les tablettes parlent de produits, terres, artisans, rations, offrandes et personnes dépendantes." },
      { title: "3. Le palais comme machine économique", text: "Le palais collecte, stocke, commande et redistribue. Il peut contrôler des ateliers, des troupeaux, des terres et des produits spécialisés. Ce système rend visible une société très organisée, où l’écriture sert d’abord à administrer." },
      { title: "4. Guerre, prestige et réseaux", text: "Les armes et tombes riches montrent des élites guerrières, mais les Mycéniens participent aussi à des échanges égéens et méditerranéens. Céramiques, objets précieux et contacts rappellent que la puissance se construit autant par réseau que par combat." },
      { title: "5. Ce qu’il faut retenir", text: "Les Mycéniens sont importants parce qu’ils relient la Grèce à l’âge du Bronze palatial. Ils donnent un arrière-plan aux récits héroïques, mais leur histoire concrète se comprend surtout par palais, tablettes, tombes et objets." }
    ],
    deeper: [
      { title: "Repère", text: "Linéaire B : écriture administrative déchiffrée, utilisée dans des palais mycéniens et notant une forme ancienne de grec." },
      { title: "Nuance", text: "Un poème peut garder une mémoire du passé sans être un document administratif contemporain." },
      { title: "Erreur fréquente", text: "Réduire Mycènes à la guerre de Troie et oublier les scribes, les terres, les stocks et les dépendants." }
    ],
    quiz: [
      { kind: "repère", q: "À quelle période appartiennent surtout les Mycéniens ?", a: "À la fin de l’âge du Bronze égéen, avant les cités grecques classiques.", choices: ["À la période de l’empire carolingien.", "À l’époque des monarchies absolues modernes.", "Au lendemain de la guerre froide."], why: "La chronologie évite de confondre palais mycéniens et cité classique.", trap: "Mettre Mycènes au temps de Périclès.", evidence: "Express et bloc 1." },
      { kind: "source", q: "Pourquoi le linéaire B est-il essentiel ?", a: "Parce qu’il note une forme ancienne de grec et donne accès à des comptes palatiaux.", choices: ["Parce qu’il décrit les débats de l’assemblée athénienne.", "Parce qu’il est une écriture inventée par les empereurs romains.", "Parce qu’il est uniquement une décoration murale sans texte."], why: "Il rend l’administration mycénienne partiellement lisible.", trap: "Ignorer les archives au profit des seuls héros.", evidence: "Bloc 2." },
      { kind: "fonction", q: "Que fait le palais mycénien dans l’économie ?", a: "Il collecte, stocke, commande des productions et redistribue des biens.", choices: ["Il sert seulement de théâtre public.", "Il supprime toutes les terres agricoles.", "Il interdit la présence de scribes et d’artisans."], why: "Le palais est une machine de gestion.", trap: "Le voir seulement comme décor militaire.", evidence: "Bloc 3." },
      { kind: "nuance", q: "Pourquoi ne pas lire Homère comme un reportage direct ?", a: "Parce que les poèmes sont plus tardifs et transforment la mémoire de l’âge du Bronze en récit héroïque.", choices: ["Parce que les poèmes sont des tablettes comptables du palais de Pylos.", "Parce que les récits héroïques donnent tous les impôts exacts.", "Parce que les tombes remplacent entièrement toute tradition orale."], why: "Il faut distinguer mémoire, poésie et sources contemporaines.", trap: "Confondre mythe et archive.", evidence: "Deeper et conclusion." },
      { kind: "synthèse", q: "Quelle formule résume le mieux les Mycéniens ?", a: "Des sociétés palatiales grecques de l’âge du Bronze, connues par palais, tombes, objets et tablettes.", choices: ["Une cité démocratique classique centrée sur l’assemblée.", "Un peuple sans écriture, sans palais et sans réseaux.", "Une province romaine administrée depuis le Sénat."], why: "La réponse combine chronologie, organisation et sources.", trap: "Les réduire aux guerriers de légende.", evidence: "Conclusion." }
    ]
  },

  "aegean-mediterranean-effondrement-egeen": {
    hook: "Autour de -1200, le monde égéen et méditerranéen oriental connaît une crise majeure. Ce n’est pas une catastrophe simple : c’est un enchaînement de fragilités, de violences, de ruptures et de recompositions.",
    keyFacts: [
      "Quand : surtout vers -1250 à -1100",
      "Où : Égée, Anatolie, Levant, Méditerranée orientale",
      "Acteurs : palais mycéniens, Hittites, cités du Levant, groupes mobiles, élites locales",
      "Traces : destructions, abandons, raréfaction des archives, changements matériels, récits égyptiens",
      "Piège : expliquer toute la crise par une seule cause magique ou un seul peuple"
    ],
    takeaways: [
      { label: "Idée forte", text: "La crise de -1200 touche plusieurs sociétés de l’âge du Bronze, mais de façon inégale." },
      { label: "Nuance", text: "Invasions, tensions internes, climat, réseaux fragiles et guerres peuvent se combiner." },
      { label: "Conséquence", text: "Après la crise, le monde égéen se réorganise avant l’émergence progressive des cités grecques." }
    ],
    express: [
      "Vers -1200, plusieurs centres de l’âge du Bronze en Méditerranée orientale sont détruits, abandonnés ou profondément transformés. Les palais mycéniens disparaissent, l’empire hittite s’effondre, des routes se fragilisent et les archives deviennent plus rares.",
      "Il ne faut pas chercher une cause unique. Guerres, mouvements de populations, tensions sociales, difficultés économiques, sécheresses possibles, dépendance aux réseaux et fragilité des systèmes palatiaux peuvent se combiner différemment selon les régions.",
      "La crise n’est pas la fin de l’histoire grecque. Elle ouvre une période de recomposition : moins de grands palais, d’autres formes d’habitat, de mémoire et de pouvoir, puis, plus tard, l’émergence des cités du monde archaïque."
    ],
    complete: [
      { title: "1. Une crise régionale", text: "Autour de -1200, la Méditerranée orientale connaît de fortes perturbations. Les palais mycéniens disparaissent, l’empire hittite s’effondre, certaines cités sont détruites ou abandonnées, et plusieurs réseaux de longue distance sont bouleversés." },
      { title: "2. Des causes multiples", text: "Aucune cause unique ne suffit. Les sociétés palatiales dépendent de chaînes d’échanges, de stocks, de scribes, de protection militaire et d’autorité centrale. Si plusieurs maillons se fragilisent en même temps, tout le système peut devenir instable." },
      { title: "3. Les “peuples de la mer”", text: "Les sources égyptiennes mentionnent des groupes que l’on appelle souvent peuples de la mer. Ils sont importants, mais ils ne doivent pas devenir une explication magique. Les noms, origines et rôles de ces groupes restent discutés." },
      { title: "4. Ruptures et continuités", text: "La crise ne détruit pas toute vie humaine. Des techniques, langues, mémoires et pratiques survivent, mais les formes de pouvoir changent. Les grands palais laissent place à des organisations plus locales et moins centralisées dans plusieurs régions égéennes." },
      { title: "5. Ce qu’il faut retenir", text: "La crise de -1200 est utile pour comprendre le passage entre âge du Bronze et monde grec archaïque. Elle montre qu’une civilisation peut s’effondrer comme système sans que les populations, les cultures et les mémoires disparaissent totalement." }
    ],
    deeper: [
      { title: "Repère", text: "Système palatial : organisation centrée sur un palais qui administre ressources, productions, stocks, dépendants et échanges." },
      { title: "Comment le lire", text: "Pour expliquer une crise ancienne, on compare destructions, abandons, textes, climat possible, objets et changements d’habitat." },
      { title: "Erreur fréquente", text: "Dire “les peuples de la mer ont tout détruit” comme si une seule formule expliquait une crise très large." }
    ],
    quiz: [
      { kind: "repère", q: "Quand situe-t-on la grande crise du monde égéen de l’âge du Bronze ?", a: "Autour de -1200, surtout entre environ -1250 et -1100.", choices: ["Au Ve siècle avec la guerre du Péloponnèse.", "Au temps de l’Empire napoléonien.", "Après la décolonisation du XXe siècle."], why: "Le cours donne un repère chronologique central.", trap: "Mélanger l’âge du Bronze et l’époque classique.", evidence: "Express et repères." },
      { kind: "cause", q: "Pourquoi faut-il éviter l’explication par une seule cause ?", a: "Parce que guerres, réseaux fragiles, tensions internes, climat possible et crise des palais peuvent se combiner.", choices: ["Parce qu’aucune trace de changement n’existe.", "Parce que les palais sont tous plus solides après la crise.", "Parce que la Méditerranée orientale est sans échanges."], why: "La crise est un enchaînement de fragilités.", trap: "Chercher une cause miracle.", evidence: "Bloc 2." },
      { kind: "source", q: "Quelle prudence faut-il avoir avec les peuples de la mer ?", a: "Ils sont mentionnés dans des sources, mais leurs origines et leurs rôles restent discutés.", choices: ["Ils expliquent seuls chaque abandon et chaque transformation.", "Ils sont les magistrats réguliers des cités classiques.", "Ils remplacent toutes les autres preuves archéologiques."], why: "La formule est utile mais insuffisante.", trap: "Transformer un nom en explication totale.", evidence: "Bloc 3." },
      { kind: "conséquence", q: "Que se passe-t-il après la disparition des grands palais ?", a: "Des formes plus locales de pouvoir et d’habitat se développent dans plusieurs régions.", choices: ["Toute présence humaine disparaît définitivement de l’Égée.", "Les cités classiques apparaissent immédiatement sans transition.", "Les tablettes administratives deviennent plus nombreuses partout."], why: "La crise entraîne recomposition, pas vide absolu.", trap: "Confondre effondrement d’un système et fin des populations.", evidence: "Bloc 4." },
      { kind: "synthèse", q: "Pourquoi cette crise est-elle importante pour la Grèce ?", a: "Parce qu’elle aide à comprendre le passage entre monde palatial de l’âge du Bronze et monde grec archaïque.", choices: ["Parce qu’elle fonde directement la démocratie athénienne en un jour.", "Parce qu’elle n’a aucun lien avec l’évolution du monde égéen.", "Parce qu’elle transforme tous les palais en royaumes médiévaux."], why: "Elle éclaire une transition de longue durée.", trap: "Sauter directement des héros à Athènes.", evidence: "Conclusion." }
    ]
  }
});


const REVOLUTION_EDITORIAL_LESSON_IDS = [
  "1789-crisis",
  "rights-new-france",
  "republic-terror-war",
  "napoleon-empire",
  "europe-after-napoleon"
];
REVOLUTION_EDITORIAL_LESSON_IDS.forEach(id => PUBLISHED_LESSON_IDS.add(id));

Object.assign(READY_LESSON_PACKS, {
  "1789-crisis": {
    hook: "1789 n’éclate pas parce qu’un peuple se réveille soudain : la Révolution naît d’une crise financière, sociale, politique et symbolique qui rend l’Ancien Régime impossible à réparer simplement.",
    keyFacts: [
      "Quand : 1788-1789, avec l’ouverture des États généraux en mai 1789",
      "Où : royaume de France, surtout Versailles et Paris au début",
      "Acteurs : roi, ministres, noblesse, clergé, tiers état, députés, peuple des villes et campagnes",
      "Traces : cahiers de doléances, débats des États généraux, serment du Jeu de paume, prise de la Bastille",
      "Piège : croire que la Révolution commence par une seule journée ou une seule cause"
    ],
    takeaways: [
      { label: "Idée forte", text: "La crise de 1789 combine dette de l’État, inégalités d’ordres, blocage politique et politisation de la société." },
      { label: "Moment clé", text: "Le tiers état se proclame Assemblée nationale : la souveraineté commence à glisser du roi vers la nation." },
      { label: "Nuance", text: "La Révolution n’est pas seulement parisienne : les campagnes, les cahiers et les peurs collectives comptent aussi." }
    ],
    express: [
      "En 1789, la France traverse une crise profonde. L’État est très endetté, l’impôt pèse surtout sur les roturiers, les privilèges d’ordres sont contestés et la monarchie n’arrive plus à faire accepter ses réformes.",
      "Louis XVI convoque les États généraux pour trouver une solution. Mais le tiers état refuse de rester un ordre dominé : ses députés se proclament Assemblée nationale, puis jurent de donner une constitution à la France lors du serment du Jeu de paume.",
      "La prise de la Bastille, le 14 juillet 1789, donne une dimension populaire et parisienne à la crise. Dans les campagnes, la Grande Peur et les attaques contre les droits seigneuriaux poussent les députés à abolir les privilèges dans la nuit du 4 août."
    ],
    complete: [
      { title: "1. Une monarchie endettée", text: "La monarchie française sort du XVIIIe siècle avec une dette lourde, aggravée par les guerres et le coût de l’État. Pour réformer l’impôt, le roi doit affronter les privilégiés, les parlements et une opinion publique de plus en plus attentive aux affaires politiques." },
      { title: "2. Une société d’ordres contestée", text: "La société est officiellement divisée entre clergé, noblesse et tiers état. Cette organisation ne correspond plus aux aspirations d’une partie de la bourgeoisie, des professions urbaines et de nombreux paysans. Le problème n’est pas seulement la pauvreté : c’est l’inégalité juridique." },
      { title: "3. Les cahiers et les États généraux", text: "Avant la réunion des États généraux, les Français rédigent des cahiers de doléances. On y trouve des plaintes fiscales, des demandes de justice plus claire, des critiques des privilèges et l’espoir que le roi écoute enfin la nation." },
      { title: "4. Le tiers état devient Assemblée nationale", text: "Le conflit porte sur la manière de voter : par ordre ou par tête. En se proclamant Assemblée nationale, les députés du tiers état affirment qu’ils représentent la nation entière. C’est une rupture décisive avec la souveraineté royale traditionnelle." },
      { title: "5. L’irruption populaire", text: "La prise de la Bastille montre que la rue parisienne peut peser sur les événements. Dans les campagnes, la peur des complots aristocratiques et les violences contre les droits seigneuriaux accélèrent la décision d’abolir les privilèges. La Révolution devient à la fois politique, sociale et populaire." }
    ],
    deeper: [
      { title: "Repère", text: "Tiers état : ordre qui regroupe tous ceux qui ne sont ni nobles ni membres du clergé, donc l’immense majorité de la population." },
      { title: "Comment le lire", text: "Pour comprendre 1789, il faut relier finances publiques, institutions, hiérarchies sociales et événements de rue." },
      { title: "Erreur fréquente", text: "Résumer 1789 à la Bastille. Le 14 juillet est majeur, mais il vient après une crise politique déjà ouverte." }
    ],
    quiz: [
      { kind: "cause", q: "Pourquoi la crise financière fragilise-t-elle la monarchie en 1789 ?", a: "Parce que l’État est très endetté et ne parvient plus à faire accepter une réforme fiscale durable.", choices: ["Parce que le roi décide volontairement de supprimer toutes les institutions.", "Parce que la France ne possède plus aucune administration locale.", "Parce que les députés refusent toute discussion sur les impôts avant même les États généraux."], why: "La dette rend nécessaire une réforme, mais le système politique bloque.", trap: "Chercher une seule cause spectaculaire.", evidence: "Bloc 1." },
      { kind: "société", q: "Qu’est-ce qui rend la société d’ordres contestable ?", a: "L’existence d’inégalités juridiques et fiscales entre clergé, noblesse et tiers état.", choices: ["L’égalité complète entre tous les habitants du royaume.", "L’absence de distinction sociale avant 1789.", "La domination politique exclusive des paysans sur la noblesse."], why: "La contestation porte sur les privilèges et les droits.", trap: "Réduire la crise à une simple pénurie alimentaire.", evidence: "Bloc 2." },
      { kind: "institution", q: "Que signifie la proclamation de l’Assemblée nationale ?", a: "Les députés du tiers état affirment représenter la nation et non plus seulement un ordre séparé.", choices: ["Le roi renforce le vote par ordre sans opposition.", "Le clergé interdit toute constitution écrite.", "Les provinces remplacent immédiatement Paris comme capitale politique."], why: "C’est un déplacement de souveraineté.", trap: "Confondre réunion des États généraux et révolution déjà achevée.", evidence: "Bloc 4." },
      { kind: "événement", q: "Pourquoi la prise de la Bastille compte-t-elle ?", a: "Elle montre que le peuple parisien peut intervenir dans la crise politique et sauver la dynamique révolutionnaire.", choices: ["Elle règle définitivement toutes les questions fiscales.", "Elle abolit à elle seule tous les privilèges du royaume.", "Elle marque la fin immédiate de la monarchie dès juillet 1789."], why: "L’événement donne une force populaire à la Révolution.", trap: "Lui attribuer tous les effets de l’année 1789.", evidence: "Bloc 5." },
      { kind: "synthèse", q: "Quelle formule résume le mieux 1789 ?", a: "Une crise de l’État, des privilèges et de la souveraineté qui devient une révolution politique et sociale.", choices: ["Une réforme fiscale calme, menée sans mobilisation collective.", "Une succession d’événements sans lien entre finances, société et politique.", "Une crise uniquement militaire provoquée par une invasion étrangère."], why: "La bonne réponse relie plusieurs niveaux de crise.", trap: "Réduire 1789 à une date ou à une foule.", evidence: "Conclusion." }
    ]
  },
  "rights-new-france": {
    hook: "La Déclaration des droits de l’homme et du citoyen ne se contente pas d’annoncer de beaux principes : elle change la langue du pouvoir en plaçant la loi, la nation et l’égalité civile au centre.",
    keyFacts: [
      "Quand : été 1789, Déclaration adoptée le 26 août",
      "Où : Assemblée nationale constituante, France révolutionnaire",
      "Acteurs : députés, clubs, citoyens actifs, presse, roi contraint de composer",
      "Traces : Déclaration des droits, abolition des privilèges, Constitution de 1791",
      "Piège : croire que droits proclamés = droits appliqués immédiatement à tous"
    ],
    takeaways: [
      { label: "Idée forte", text: "La souveraineté nationale remplace progressivement l’idée que le pouvoir vient seulement du roi." },
      { label: "Texte clé", text: "La Déclaration affirme liberté, égalité civile, propriété, sûreté, résistance à l’oppression et loi commune." },
      { label: "Limite", text: "Femmes, pauvres, esclaves des colonies et opposants politiques ne bénéficient pas tous de la même manière de ces principes." }
    ],
    express: [
      "Après l’été 1789, les députés cherchent à refonder la France. La nuit du 4 août abolit les privilèges, puis la Déclaration des droits de l’homme et du citoyen affirme que les hommes naissent libres et égaux en droits.",
      "Le pouvoir n’est plus pensé comme une propriété du roi. La souveraineté appartient à la nation, la loi doit être l’expression de la volonté générale, et les citoyens doivent être jugés selon des règles communes.",
      "Mais il faut distinguer principe et réalité. La Constitution de 1791 garde une monarchie constitutionnelle et limite la participation politique. Les femmes, les plus pauvres et les esclaves des colonies restent exclus ou marginalisés malgré le langage universel des droits."
    ],
    complete: [
      { title: "1. Abolir les privilèges", text: "La nuit du 4 août 1789 marque une rupture majeure : les droits seigneuriaux et privilèges d’ordres sont attaqués. L’objectif est de construire une société de droits communs, même si l’application concrète reste progressive et négociée." },
      { title: "2. Déclarer des droits", text: "La Déclaration du 26 août 1789 énonce des principes généraux : liberté, égalité civile, propriété, sûreté, résistance à l’oppression. Elle donne aux révolutionnaires une grammaire politique nouvelle, opposable à l’arbitraire." },
      { title: "3. La nation contre l’absolutisme", text: "La souveraineté nationale signifie que le pouvoir légitime vient de la nation. Le roi n’est plus la source unique de la loi. Les députés veulent encadrer l’exécutif, écrire une constitution et limiter l’ancien arbitraire monarchique." },
      { title: "4. Une France réorganisée", text: "La Révolution transforme aussi l’espace politique : départements, nouvelles administrations, justice réformée, vente de biens du clergé, constitution civile du clergé. La nouvelle France n’est pas seulement un texte, c’est une réorganisation concrète." },
      { title: "5. Des droits universels, des exclusions réelles", text: "Le langage des droits est immense, mais son application est limitée. Le suffrage n’est pas universel, les femmes sont exclues du vote, l’esclavage colonial n’est pas aboli en 1789. Cette tension nourrit des débats et des luttes durables." }
    ],
    deeper: [
      { title: "Repère", text: "Souveraineté nationale : principe selon lequel le pouvoir politique appartient à la nation, représentée par des institutions." },
      { title: "Nuance", text: "Un principe proclamé peut devenir une arme politique même lorsqu’il n’est pas encore appliqué partout." },
      { title: "Erreur fréquente", text: "Dire que 1789 installe immédiatement la démocratie moderne complète. La rupture est forte, mais les exclusions restent nombreuses." }
    ],
    quiz: [
      { kind: "texte", q: "Que proclame la Déclaration des droits de 1789 ?", a: "Des principes comme liberté, égalité civile, propriété, sûreté et résistance à l’oppression.", choices: ["La restauration complète des privilèges seigneuriaux.", "La suppression de toute loi commune au profit du roi seul.", "L’obligation pour chaque citoyen d’appartenir au clergé."], why: "Le texte fixe la nouvelle grammaire politique.", trap: "Croire qu’il règle immédiatement tous les problèmes.", evidence: "Bloc 2." },
      { kind: "concept", q: "Que signifie la souveraineté nationale ?", a: "Le pouvoir légitime vient de la nation et non plus seulement de la personne du roi.", choices: ["Le roi peut décider seul sans constitution.", "Chaque province devient un royaume indépendant.", "La noblesse récupère le monopole de l’impôt."], why: "C’est une rupture avec l’absolutisme.", trap: "Confondre nation et opinion unanime.", evidence: "Bloc 3." },
      { kind: "réforme", q: "Pourquoi la réorganisation administrative est-elle importante ?", a: "Parce que la Révolution transforme aussi les institutions, la justice, les départements et les rapports avec l’Église.", choices: ["Parce que les droits restent uniquement une poésie sans aucune décision concrète.", "Parce que les provinces d’Ancien Régime sont conservées sans changement.", "Parce que le clergé devient l’unique administration de l’État."], why: "La nouvelle France se construit par des mesures pratiques.", trap: "Ne regarder que les grands discours.", evidence: "Bloc 4." },
      { kind: "limite", q: "Quelle limite faut-il retenir sur les droits de 1789 ?", a: "Leur langage est universel, mais femmes, pauvres et esclaves coloniaux restent largement exclus.", choices: ["Tous les habitants votent immédiatement dans les mêmes conditions.", "L’esclavage est aboli partout dans l’empire dès août 1789.", "Les femmes deviennent majoritaires dans toutes les assemblées."], why: "La tension entre principes et réalités est centrale.", trap: "Confondre proclamation et application complète.", evidence: "Bloc 5." },
      { kind: "synthèse", q: "Pourquoi 1789 change-t-il la langue du pouvoir ?", a: "Parce que la loi, les droits, la nation et l’égalité civile deviennent des références centrales.", choices: ["Parce que le pouvoir royal devient plus absolu qu’avant.", "Parce que les privilèges d’ordres deviennent la base officielle de la citoyenneté.", "Parce que la France renonce à écrire des textes politiques."], why: "Les mots du pouvoir changent avec les institutions.", trap: "Ne voir que l’événementiel.", evidence: "Hook et conclusion." }
    ]
  },
  "republic-terror-war": {
    hook: "La Terreur ne se comprend pas comme une simple folie collective : elle naît d’une République en guerre, menacée aux frontières, divisée à l’intérieur et obsédée par le salut public.",
    keyFacts: [
      "Quand : surtout 1792-1794",
      "Où : France républicaine, frontières, Paris, Vendée et provinces insurgées",
      "Acteurs : Convention, Montagnards, Girondins, sans-culottes, comités, armées, opposants",
      "Traces : chute de la monarchie, procès de Louis XVI, Comité de salut public, levée en masse, lois d’exception",
      "Piège : expliquer la Terreur sans la guerre ou réduire toute la Révolution à la guillotine"
    ],
    takeaways: [
      { label: "Idée forte", text: "La République se radicalise dans un contexte de guerre extérieure, guerre civile et crise politique." },
      { label: "Moment clé", text: "La monarchie tombe en 1792, Louis XVI est jugé puis exécuté en janvier 1793." },
      { label: "Nuance", text: "La Terreur combine défense révolutionnaire, violence d’État, peur des complots et luttes de pouvoir." }
    ],
    express: [
      "En 1792, la Révolution entre dans une phase plus radicale. La guerre contre les monarchies européennes, la méfiance envers Louis XVI et la pression populaire conduisent à la chute de la monarchie et à la proclamation de la République.",
      "L’exécution du roi en janvier 1793 aggrave le conflit avec l’Europe et les divisions françaises. La République doit affronter des ennemis extérieurs, des soulèvements intérieurs, la crise économique et les rivalités politiques entre Girondins, Montagnards et sans-culottes.",
      "La Terreur correspond à un gouvernement d’exception : Comité de salut public, surveillance, tribunaux révolutionnaires, répression des opposants. Elle ne résume pas toute la Révolution, mais elle montre jusqu’où un pouvoir peut aller lorsqu’il affirme défendre la République en danger."
    ],
    complete: [
      { title: "1. La monarchie tombe", text: "La guerre commencée en 1792 fragilise la monarchie constitutionnelle. Le roi est soupçonné de double jeu avec les puissances ennemies. L’insurrection du 10 août 1792 renverse la monarchie et ouvre la voie à une République proclamée en septembre." },
      { title: "2. Le procès du roi", text: "Louis XVI devient Louis Capet devant la Convention. Son procès pose une question politique immense : peut-on fonder une République en laissant vivre l’ancien roi ? Son exécution en janvier 1793 rend la rupture irréversible." },
      { title: "3. Une République encerclée", text: "La France affronte une coalition européenne, tandis que des révoltes éclatent à l’intérieur, notamment en Vendée. La levée en masse mobilise les hommes et les ressources. La République devient une machine de guerre." },
      { title: "4. Le gouvernement révolutionnaire", text: "Le Comité de salut public, les représentants en mission, les tribunaux révolutionnaires et les mesures de surveillance créent un pouvoir d’exception. La logique est celle du salut public : vaincre les ennemis avant de revenir à une constitution ordinaire." },
      { title: "5. Violence et héritage difficile", text: "La Terreur laisse une mémoire lourde : répression, guillotine, guerres civiles, suspects. Mais elle ne doit pas être séparée du contexte de guerre et de peur politique. Comprendre n’est pas justifier : c’est expliquer les mécanismes de radicalisation." }
    ],
    deeper: [
      { title: "Repère", text: "Salut public : idée selon laquelle des mesures extraordinaires sont justifiées pour sauver la République en danger." },
      { title: "Nuance", text: "La Terreur n’est pas un bloc simple : elle varie selon les lieux, les moments et les acteurs." },
      { title: "Erreur fréquente", text: "Commencer et finir la Révolution par la guillotine. Cela écrase les enjeux de souveraineté, de droits et de guerre." }
    ],
    quiz: [
      { kind: "cause", q: "Pourquoi la République se radicalise-t-elle à partir de 1792 ?", a: "Parce qu’elle affronte la guerre extérieure, la chute de la monarchie, des révoltes et des divisions politiques.", choices: ["Parce que la France connaît une paix stable avec toutes les monarchies européennes.", "Parce que Louis XVI reçoit des pouvoirs absolus renforcés par la Convention.", "Parce que les clubs politiques disparaissent avant toute crise."], why: "Plusieurs menaces alimentent la radicalisation.", trap: "Isoler la Terreur de la guerre.", evidence: "Express." },
      { kind: "événement", q: "Que provoque le 10 août 1792 ?", a: "La chute de la monarchie constitutionnelle et l’ouverture de la voie républicaine.", choices: ["La restauration de l’Ancien Régime sans constitution.", "La fin de toutes les mobilisations populaires à Paris.", "La création de l’Empire napoléonien le même jour."], why: "C’est une rupture politique majeure.", trap: "Confondre 1792 avec 1789 ou 1804.", evidence: "Bloc 1." },
      { kind: "institution", q: "À quoi sert le Comité de salut public dans ce contexte ?", a: "À concentrer le gouvernement révolutionnaire pour défendre la République en guerre.", choices: ["À rétablir le pouvoir personnel de Louis XVI.", "À organiser uniquement des fêtes sans rôle politique.", "À supprimer les armées alors que les frontières sont menacées."], why: "Il incarne un pouvoir d’exception.", trap: "Le décrire comme une institution ordinaire.", evidence: "Bloc 4." },
      { kind: "nuance", q: "Pourquoi comprendre la Terreur ne veut-il pas dire la justifier ?", a: "Parce qu’on peut expliquer ses mécanismes de guerre, de peur et de pouvoir sans approuver la violence.", choices: ["Parce qu’il faut supprimer tout contexte historique.", "Parce que les violences n’ont laissé aucune trace.", "Parce que la Terreur est une période totalement inventée."], why: "L’histoire cherche des causes, pas des excuses automatiques.", trap: "Confondre explication et approbation.", evidence: "Bloc 5." },
      { kind: "synthèse", q: "Quelle idée résume le mieux le cours ?", a: "La République en danger produit un gouvernement d’exception qui radicalise la Révolution.", choices: ["La Terreur apparaît dans une France paisible et sans conflit.", "La Révolution s’arrête définitivement dès la Déclaration des droits.", "La République naît uniquement d’une réforme administrative locale."], why: "La bonne réponse relie République, guerre et exception.", trap: "Réduire la période à une image de guillotine.", evidence: "Conclusion." }
    ]
  },
  "napoleon-empire": {
    hook: "Napoléon n’est pas seulement un général victorieux : il stabilise une partie de l’héritage révolutionnaire tout en construisant un pouvoir autoritaire et une Europe dominée par la guerre.",
    keyFacts: [
      "Quand : Consulat à partir de 1799, Empire de 1804 à 1815",
      "Où : France, Europe continentale, Méditerranée et colonies",
      "Acteurs : Bonaparte/Napoléon, armée, préfets, notables, adversaires européens",
      "Traces : coup d’État du 18 Brumaire, Code civil, Concordat, préfets, plébiscites, grandes campagnes",
      "Piège : choisir entre héros modernisateur et tyran militaire sans tenir les deux dimensions"
    ],
    takeaways: [
      { label: "Idée forte", text: "Le régime napoléonien consolide l’État et certains acquis de 1789, mais réduit fortement la liberté politique." },
      { label: "Trace durable", text: "Le Code civil organise propriété, famille, contrats et égalité civile masculine devant la loi." },
      { label: "Limite", text: "Les guerres napoléoniennes diffusent des réformes mais provoquent aussi occupation, résistances et épuisement." }
    ],
    express: [
      "Après les années révolutionnaires, Bonaparte prend le pouvoir par le coup d’État du 18 Brumaire en 1799. Le Consulat promet l’ordre, la stabilité et la fin des divisions, puis Napoléon devient empereur en 1804.",
      "Le régime conserve une partie de l’héritage révolutionnaire : égalité civile, carrières ouvertes aux talents, vente des biens nationaux, État plus rationnel. Mais il limite la presse, contrôle les élections, surveille l’opinion et concentre le pouvoir autour de l’empereur.",
      "Le Code civil, les préfets, le Concordat et l’administration impériale marquent durablement la France. En Europe, les victoires diffusent des réformes, mais les occupations et la guerre permanente suscitent résistances, coalitions et finalement chute de l’Empire en 1815."
    ],
    complete: [
      { title: "1. Sortir du désordre révolutionnaire", text: "Le Directoire apparaît fragile, contesté et dépendant de l’armée. Bonaparte profite de sa gloire militaire et du désir d’ordre pour prendre le pouvoir en 1799. Le Consulat présente l’autorité forte comme une solution à l’instabilité." },
      { title: "2. Stabiliser certains acquis", text: "Napoléon ne revient pas simplement à l’Ancien Régime. Il protège la propriété, l’égalité civile masculine, les carrières administratives et militaires ouvertes aux talents, ainsi que l’achat des biens nationaux par les nouveaux propriétaires." },
      { title: "3. Construire un État autoritaire", text: "Préfets, police, censure, plébiscites encadrés, administration centralisée : le régime donne une place majeure à l’efficacité et au contrôle. Les citoyens existent, mais la participation politique réelle est fortement limitée." },
      { title: "4. Le Code civil et la société", text: "Le Code civil de 1804 unifie le droit privé. Il consacre la propriété, les contrats et l’égalité civile des hommes, mais renforce l’autorité du père et du mari dans la famille. C’est un héritage durable, mais pas une démocratie sociale." },
      { title: "5. L’Europe napoléonienne", text: "Les conquêtes exportent des réformes et bousculent les anciens pouvoirs. Mais la domination française entraîne impôts, conscription, occupations et résistances nationales. L’Empire vit de la guerre, et cette dynamique finit par l’épuiser." }
    ],
    deeper: [
      { title: "Repère", text: "Plébiscite : vote demandé au peuple pour approuver une décision ou un pouvoir, souvent encadré par le régime." },
      { title: "Nuance", text: "Napoléon peut moderniser l’État tout en restreignant les libertés politiques : les deux ne s’annulent pas." },
      { title: "Erreur fréquente", text: "Faire de Napoléon seulement un héros ou seulement un dictateur. Historiquement, son régime combine stabilisation, autorité et guerre." }
    ],
    quiz: [
      { kind: "repère", q: "Comment Bonaparte arrive-t-il au pouvoir en 1799 ?", a: "Par le coup d’État du 18 Brumaire, dans un contexte de Directoire fragilisé.", choices: ["Par une élection présidentielle au suffrage universel direct.", "Par l’héritage dynastique normal des Bourbons.", "Par une décision de la Convention en 1793."], why: "Le repère distingue Consulat, République et Empire.", trap: "Confondre 1799 et le sacre de 1804.", evidence: "Bloc 1." },
      { kind: "héritage", q: "Quel acquis révolutionnaire Napoléon stabilise-t-il en partie ?", a: "L’égalité civile masculine et la protection de la propriété issue des transformations révolutionnaires.", choices: ["Le retour complet des privilèges de naissance.", "La disparition de toute administration centralisée.", "Le pouvoir politique autonome des assemblées de village."], why: "Le régime consolide certains effets de 1789.", trap: "Croire à une restauration pure et simple.", evidence: "Bloc 2." },
      { kind: "institution", q: "Pourquoi l’État napoléonien est-il autoritaire ?", a: "Parce qu’il centralise l’administration, surveille l’opinion, limite la presse et encadre la participation politique.", choices: ["Parce qu’il supprime toute police et toute administration.", "Parce qu’il laisse les provinces décider seules de la guerre.", "Parce qu’il interdit les préfets et les tribunaux."], why: "L’efficacité administrative s’accompagne de contrôle.", trap: "Confondre ordre et liberté politique.", evidence: "Bloc 3." },
      { kind: "droit", q: "Pourquoi le Code civil est-il durable mais limité ?", a: "Il unifie le droit et protège propriété et contrats, mais renforce aussi l’autorité masculine dans la famille.", choices: ["Il abolit immédiatement toutes les inégalités entre hommes et femmes.", "Il concerne uniquement les opérations militaires.", "Il restaure les coutumes locales sans aucun cadre commun."], why: "Le Code mêle modernisation juridique et hiérarchies sociales.", trap: "Le présenter comme un progrès total sans limites.", evidence: "Bloc 4." },
      { kind: "synthèse", q: "Quelle formule résume le mieux Napoléon ?", a: "Un pouvoir qui stabilise certains acquis révolutionnaires tout en construisant un régime autoritaire et guerrier.", choices: ["Un roi médiéval sans lien avec la Révolution française.", "Un dirigeant sans administration, sans armée et sans réforme juridique.", "Un président républicain gouvernant sans contrôle de l’opinion."], why: "La réponse tient ensemble héritage, autorité et guerre.", trap: "Choisir une image simple au lieu d’une tension historique.", evidence: "Hook et conclusion." }
    ]
  },
  "europe-after-napoleon": {
    hook: "Après 1815, l’Europe ne revient pas simplement en arrière : les vainqueurs veulent restaurer l’ordre, mais les idées de nation, de droits et de constitution continuent de circuler.",
    keyFacts: [
      "Quand : 1814-1815 puis première moitié du XIXe siècle",
      "Où : Europe, surtout Vienne, France, États allemands, Italie, Pologne, Balkans",
      "Acteurs : puissances victorieuses, diplomates, monarchies restaurées, libéraux, nationalistes",
      "Traces : congrès de Vienne, Sainte-Alliance, restaurations monarchiques, révolutions de 1830 et 1848",
      "Piège : croire que la défaite de Napoléon efface les transformations révolutionnaires"
    ],
    takeaways: [
      { label: "Idée forte", text: "Le congrès de Vienne cherche l’équilibre entre puissances et la stabilité monarchique." },
      { label: "Tension", text: "La restauration politique se heurte aux attentes libérales, nationales et constitutionnelles." },
      { label: "Héritage", text: "L’Europe du XIXe siècle reste travaillée par les effets de 1789 et des guerres napoléoniennes." }
    ],
    express: [
      "Après la chute de Napoléon, les vainqueurs se réunissent au congrès de Vienne. Ils veulent empêcher une nouvelle domination française, restaurer des monarchies et construire un équilibre entre grandes puissances.",
      "Mais l’Europe de 1815 n’est pas celle de 1788. Les guerres ont déplacé des frontières, diffusé des codes, réveillé des sentiments nationaux et rendu plus visibles les demandes de constitution et de libertés politiques.",
      "Le XIXe siècle européen naît de cette tension : les gouvernements cherchent l’ordre, tandis que des libéraux, des nationalistes et des républicains contestent les restaurations. Les révolutions de 1830 et 1848 montrent que l’héritage révolutionnaire reste actif."
    ],
    complete: [
      { title: "1. Vienne : restaurer et équilibrer", text: "Le congrès de Vienne réunit les grandes puissances victorieuses. L’objectif n’est pas seulement de punir la France : il faut éviter qu’une puissance domine le continent. L’équilibre européen devient un principe diplomatique central." },
      { title: "2. Le retour des monarchies", text: "Plusieurs dynasties reviennent au pouvoir, dont les Bourbons en France. Cette restauration ne signifie pas effacer vingt-cinq ans de bouleversements : certaines réformes administratives, juridiques ou sociales demeurent." },
      { title: "3. Libéralisme et constitution", text: "Des groupes libéraux réclament des constitutions, des assemblées, la liberté de presse et des garanties contre l’arbitraire. Ils ne veulent pas toujours une République, mais ils refusent l’absolutisme pur." },
      { title: "4. La question nationale", text: "Les guerres napoléoniennes ont renforcé ou révélé des sentiments nationaux, notamment dans les espaces allemands, italiens ou polonais. Beaucoup contestent des frontières décidées par les diplomates sans consulter les peuples." },
      { title: "5. Une Europe instable", text: "Les révolutions de 1830 puis 1848 montrent que la restauration ne ferme pas la période révolutionnaire. L’Europe du XIXe siècle se construit dans un conflit durable entre ordre monarchique, droits politiques et aspirations nationales." }
    ],
    deeper: [
      { title: "Repère", text: "Équilibre européen : système diplomatique visant à empêcher qu’une seule puissance domine durablement le continent." },
      { title: "Nuance", text: "Restaurer un roi ne veut pas dire restaurer exactement l’Ancien Régime : les sociétés ont changé." },
      { title: "Erreur fréquente", text: "S’arrêter à Waterloo. La vraie question est ce que l’Europe fait ensuite de l’héritage révolutionnaire et impérial." }
    ],
    quiz: [
      { kind: "repère", q: "Quel est l’objectif principal du congrès de Vienne ?", a: "Restaurer un ordre monarchique et maintenir un équilibre entre les grandes puissances européennes.", choices: ["Créer immédiatement une Europe républicaine fédérale.", "Proclamer Napoléon roi héréditaire de tous les États allemands.", "Supprimer toute diplomatie entre les puissances."], why: "Le congrès cherche stabilité et équilibre continental.", trap: "Voir Vienne comme une simple vengeance contre la France.", evidence: "Bloc 1." },
      { kind: "nuance", q: "Pourquoi 1815 n’efface-t-il pas 1789 ?", a: "Parce que certaines réformes, idées de droits, pratiques administratives et attentes politiques ont déjà transformé l’Europe.", choices: ["Parce que l’Ancien Régime revient partout exactement comme avant.", "Parce que les guerres napoléoniennes n’ont touché aucun territoire.", "Parce que les populations oublient immédiatement les constitutions."], why: "Les changements sociaux et politiques ne disparaissent pas d’un coup.", trap: "Confondre restauration dynastique et retour total en arrière.", evidence: "Bloc 2." },
      { kind: "idée", q: "Que demandent souvent les libéraux du XIXe siècle ?", a: "Des constitutions, des libertés politiques, des assemblées et des garanties contre l’arbitraire.", choices: ["Le rétablissement intégral des droits seigneuriaux.", "La suppression définitive de toute presse politique.", "L’interdiction de toute représentation nationale."], why: "Le libéralisme politique vise à limiter le pouvoir arbitraire.", trap: "Confondre libéralisme et démocratie complète immédiate.", evidence: "Bloc 3." },
      { kind: "nation", q: "Pourquoi la question nationale devient-elle explosive ?", a: "Parce que des peuples contestent des frontières et dominations décidées sans eux par les puissances.", choices: ["Parce que toutes les frontières européennes deviennent unanimement acceptées.", "Parce que les identités politiques disparaissent après 1815.", "Parce que les diplomates renoncent à toute décision territoriale."], why: "Le nationalisme remet en cause l’ordre de Vienne.", trap: "Croire que l’équilibre diplomatique suffit à satisfaire les populations.", evidence: "Bloc 4." },
      { kind: "synthèse", q: "Quelle idée résume l’Europe après Napoléon ?", a: "Un ordre restauré tente de contenir des héritages révolutionnaires, libéraux et nationaux encore actifs.", choices: ["Une Europe parfaitement immobile jusqu’en 1914.", "Une disparition complète des monarchies dès 1815.", "Une paix sociale totale sans révolutions ni contestations."], why: "La période est structurée par une tension durable.", trap: "Croire à une parenthèse refermée sans conséquences.", evidence: "Conclusion." }
    ]
  }
});


function publicMysteryIds() {
  return new Set(publicMysteries().map(mystery => mystery.id));
}
function keepAllowedKeys(record = {}, allowed = new Set()) {
  const next = {};
  Object.entries(record || {}).forEach(([key, value]) => {
    if (allowed.has(key)) next[key] = value;
  });
  return next;
}
function shallowDifferentKeys(a = {}, b = {}) {
  const ak = Object.keys(a || {});
  const bk = Object.keys(b || {});
  if (ak.length !== bk.length) return true;
  return ak.some(key => !(key in (b || {})));
}
function clampInt(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.min(max, Math.max(min, Math.round(number)));
}
function cleanDailyRecords(record = {}, allowedMysteries = new Set()) {
  const next = {};
  Object.entries(record || {}).forEach(([day, entry]) => {
    if (!entry || typeof entry !== "object") return;
    if (entry.mysteryId && !allowedMysteries.has(entry.mysteryId)) return;
    next[day] = entry;
  });
  return next;
}
function visibleStateGuardReport() {
  const curatedIds = new Set(curatedLessons().map(lesson => lesson.id));
  const mysteryIds = publicMysteryIds();
  const completedVisible = Object.keys(state.completedLessons || {}).filter(id => curatedIds.has(id)).length;
  const completedHidden = Object.keys(state.completedLessons || {}).filter(id => !curatedIds.has(id)).length;
  const solvedVisible = Object.keys(state.solvedMysteries || {}).filter(id => mysteryIds.has(id)).length;
  const solvedHidden = Object.keys(state.solvedMysteries || {}).filter(id => !mysteryIds.has(id)).length;
  const currentLessonHidden = Boolean(state.currentLessonId && !curatedIds.has(state.currentLessonId));
  const currentMysteryHidden = Boolean(state.currentMysteryId && !mysteryIds.has(state.currentMysteryId));
  return { curated: curatedIds.size, completedVisible, completedHidden, solvedVisible, solvedHidden, currentLessonHidden, currentMysteryHidden };
}
function applyVisibleStateGuard({ save = true } = {}) {
  const curatedIds = new Set(curatedLessons().map(lesson => lesson.id));
  const mysteryIds = publicMysteryIds();
  const visibleWorlds = curatedWorlds();
  const visibleWorldIds = new Set(visibleWorlds.map(world => world.id));
  let changed = false;

  const nextCompleted = keepAllowedKeys(state.completedLessons, curatedIds);
  if (shallowDifferentKeys(state.completedLessons, nextCompleted)) { state.completedLessons = nextCompleted; changed = true; }
  const nextQuizProgress = keepAllowedKeys(state.quizProgress, curatedIds);
  if (shallowDifferentKeys(state.quizProgress, nextQuizProgress)) { state.quizProgress = nextQuizProgress; changed = true; }
  const nextQuizFeedback = keepAllowedKeys(state.quizFeedback, curatedIds);
  if (shallowDifferentKeys(state.quizFeedback, nextQuizFeedback)) { state.quizFeedback = nextQuizFeedback; changed = true; }

  const nextSolved = keepAllowedKeys(state.solvedMysteries, mysteryIds);
  if (shallowDifferentKeys(state.solvedMysteries, nextSolved)) { state.solvedMysteries = nextSolved; changed = true; }
  ["seenHints", "mysteryTries", "mysteryFeedback", "unlockedMysteries", "rewardFeedback", "shareFeedback", "lastScoreSubmit"].forEach(key => {
    const next = keepAllowedKeys(state[key], mysteryIds);
    if (shallowDifferentKeys(state[key], next)) { state[key] = next; changed = true; }
  });

  const nextDailyClaims = cleanDailyRecords(state.dailyClaims, mysteryIds);
  if (shallowDifferentKeys(state.dailyClaims, nextDailyClaims)) { state.dailyClaims = nextDailyClaims; changed = true; }
  const nextDailyHistory = cleanDailyRecords(state.dailyHistory, mysteryIds);
  if (shallowDifferentKeys(state.dailyHistory, nextDailyHistory)) { state.dailyHistory = nextDailyHistory; changed = true; }
  if (state.lastDailySolvedKey && !state.dailyHistory?.[state.lastDailySolvedKey] && !state.dailyClaims?.[state.lastDailySolvedKey]) {
    state.lastDailySolvedKey = null;
    state.streak = 0;
    changed = true;
  }

  const cleanXp = clampInt(state.xp, 0, 999999);
  if (cleanXp !== state.xp) { state.xp = cleanXp; changed = true; }
  const cleanGems = clampInt(state.gems, 0, 9999);
  if (cleanGems !== state.gems) { state.gems = cleanGems; changed = true; }
  const cleanStreak = clampInt(state.streak, 0, 9999);
  if (cleanStreak !== state.streak) { state.streak = cleanStreak; changed = true; }
  if (!Number.isFinite(Number(state.discoverOffset))) { state.discoverOffset = 0; changed = true; }
  if (!DISCIPLINES.some(item => item.id === state.currentDiscipline)) { state.currentDiscipline = "history"; changed = true; }

  if (state.currentLessonId && !curatedIds.has(state.currentLessonId)) {
    state.currentLessonId = null;
    if (state.tab === "lesson") state.tab = "learn";
    state.lessonFocus = null;
    state.lessonView = "express";
    changed = true;
  }
  if (state.currentMysteryId && !mysteryIds.has(state.currentMysteryId)) {
    state.currentMysteryId = dailyMystery()?.id || null;
    changed = true;
  }
  if (state.currentWorld && !visibleWorldIds.has(state.currentWorld)) {
    const firstWorld = visibleWorlds[0];
    if (firstWorld) { state.currentWorld = firstWorld.id; changed = true; }
  }
  const allowedTabs = new Set(["home", "learn", "lesson", "mystery", "rank", "profile", "publicProfile"]);
  if (!allowedTabs.has(state.tab)) { state.tab = "home"; changed = true; }
  if (!["express", "complete", "quiz"].includes(state.lessonView)) { state.lessonView = "express"; changed = true; }
  if (!["all", "ready", "done", "todo"].includes(state.learnFilter)) { state.learnFilter = "all"; changed = true; }
  if (changed && save) saveState();
}

/* =========================================================
   Beta 104 — disciplines + cours plein écran + contenus longform de départ
   ========================================================= */
const HISTODAILY_LONGFORM_OVERRIDES = {
  "prehistory-hominids": {
    express: [
      "Les premiers hominines ne forment pas une ligne droite qui mènerait simplement à Homo sapiens. Pendant des millions d’années, plusieurs espèces proches de la lignée humaine apparaissent, coexistent parfois, puis disparaissent.",
      "La bipédie est un changement majeur, mais elle ne signifie pas immédiatement langage, feu, outils complexes ou vie sociale moderne. L’évolution avance par combinaisons lentes : corps, alimentation, environnement, outils et coopération.",
      "À retenir : l’histoire humaine ressemble à un buisson de lignées, pas à une échelle. Le bon réflexe est de parler d’adaptations et de traces, pas d’un progrès automatique vers nous."
    ],
    complete: [
      { title: "1. Sortir de l’image du singe qui devient homme", text: "On a longtemps représenté l’évolution humaine comme une frise très simple : un singe courbé, puis un être de plus en plus droit, jusqu’à l’humain moderne. Cette image est pratique, mais elle raconte mal l’histoire. Les humains actuels ne descendent pas des singes actuels : ils partagent avec eux des ancêtres plus anciens. Surtout, la lignée humaine n’est pas une file indienne où chaque espèce remplace proprement la précédente.\n\nLes paléoanthropologues travaillent plutôt sur un ensemble de branches. Certaines lignées durent longtemps, d’autres disparaissent, certaines se chevauchent dans le temps. Il faut donc abandonner l’idée d’un escalier régulier. La préhistoire ancienne est une histoire d’essais évolutifs, d’adaptations locales et de traces fragmentaires." },
      { title: "2. La bipédie, un changement majeur mais pas magique", text: "La bipédie compte beaucoup parce qu’elle modifie le rapport au corps et au milieu. Marcher sur deux jambes libère partiellement les mains, change la manière de se déplacer, permet de voir plus loin dans certains environnements et transforme le bassin, les jambes et la colonne vertébrale. Mais il ne faut pas lui faire dire trop de choses.\n\nÊtre bipède ne veut pas dire parler comme un humain moderne, fabriquer des outils complexes ou maîtriser le feu. Plusieurs caractères évoluent à des rythmes différents. Une espèce peut marcher sur deux jambes sans avoir un cerveau comparable au nôtre. C’est justement cette dissociation qui rend l’évolution humaine intéressante : il n’y a pas un bouton unique appelé “devenir humain”." },
      { title: "3. Des espèces adaptées à des milieux différents", text: "Les premiers hominines vivent dans des environnements variés : zones boisées, savanes plus ouvertes, rives de lacs, régions où les ressources changent selon les saisons. Leur corps, leurs dents, leurs déplacements et leur alimentation sont liés à ces milieux. On ne doit donc pas les juger comme des versions ratées de nous-mêmes.\n\nUne espèce qui disparaît n’est pas forcément une impasse ridicule. Elle a pu être très bien adaptée pendant longtemps, puis être fragilisée par des changements climatiques, des concurrences, des migrations ou des transformations de son environnement. La disparition fait partie de l’histoire du vivant." },
      { title: "4. Comment sait-on tout cela ?", text: "Pour ces périodes très anciennes, il n’existe évidemment aucun texte. Les chercheurs s’appuient sur des ossements, des dents, des empreintes, des outils parfois associés, des couches géologiques et des datations. Un fragment de mâchoire, une forme de bassin ou une trace de pas peuvent donner des informations importantes, mais jamais isolément.\n\nC’est pour cela que les scénarios changent avec les découvertes. Une nouvelle datation, un fossile trouvé dans une région inattendue ou une meilleure analyse d’un os déjà connu peuvent déplacer une hypothèse. Le cours ne doit donc pas donner l’impression d’un récit parfaitement fermé : il faut apprendre à penser avec des preuves incomplètes." },
      { title: "5. Plusieurs humanités avant la nôtre", text: "La préhistoire récente confirme cette idée de pluralité. Homo sapiens a coexisté avec d’autres humains, comme Néandertal et Denisova. Ces groupes ne sont pas seulement des silhouettes de musée : ils avaient leurs propres adaptations, leurs techniques, leurs territoires et parfois des contacts avec Sapiens.\n\nCette coexistence oblige à parler de “plusieurs humanités”. Notre espèce n’apparaît pas dans un monde vide. Elle arrive dans un paysage déjà occupé par d’autres formes humaines. C’est une idée importante, parce qu’elle empêche de raconter l’histoire comme si tout avait toujours été destiné à nous produire." },
      { title: "6. Ce que cette leçon change", text: "Le point essentiel n’est pas de retenir une liste de noms. Il faut retenir une manière de penser : l’évolution humaine est ramifiée, lente, inégale et reconstruite à partir de traces. Les premiers hominines ne sont pas des brouillons d’humains modernes, mais des espèces qui ont vécu dans des conditions précises.\n\nQuand tu verras ensuite Homo habilis, Homo erectus, Néandertal ou Sapiens, garde ce cadre en tête. Chaque espèce doit être comprise dans son environnement, avec ses capacités propres, ses limites et les preuves disponibles." }
    ],
    deeper: [],
    takeaways: [
      { label: "Idée forte", text: "L’évolution humaine ressemble à un buisson de lignées, pas à une progression droite vers Sapiens." },
      { label: "Nuance", text: "La bipédie est majeure, mais elle ne déclenche pas automatiquement langage, feu ou outils complexes." },
      { label: "Preuves", text: "On travaille avec des os, dents, empreintes, outils associés et couches géologiques." },
      { label: "À éviter", text: "Présenter les espèces disparues comme des échecs ou des humains incomplets." }
    ]
  },
  "prehistory-habilis": {
    express: [
      "Homo habilis vit surtout en Afrique de l’Est, entre environ 2,4 et 1,4 million d’années. Son nom signifie “homme habile”, car on l’a longtemps associé aux premiers outils de pierre.",
      "Ces outils sont simples : des galets taillés et des éclats coupants. Ils servent à découper, casser des os, racler ou travailler des matières. Même rudimentaires, ils marquent une étape majeure : certains hominines commencent à transformer volontairement leur environnement.",
      "Il faut rester prudent : Homo habilis n’a peut-être pas inventé les outils seul. Mais cette période montre que la technique devient un vrai avantage pour survivre."
    ],
    complete: [
      { title: "1. Un nom célèbre, mais à manier avec prudence", text: "Homo habilis vit surtout en Afrique de l’Est il y a environ 2,4 à 1,4 million d’années. Son nom signifie “homme habile”, parce qu’on l’a longtemps associé aux premiers outils de pierre. Ce nom a beaucoup marqué les récits sur la Préhistoire : il donne l’impression d’un moment clair où un ancêtre humain aurait soudain compris comment fabriquer un outil.\n\nMais cette image est trop simple. Les plus anciens outils connus peuvent être plus anciens que les fossiles attribués à Homo habilis, et plusieurs espèces d’hominines ont pu fabriquer ou utiliser des objets transformés. Il ne faut donc pas chercher un inventeur unique. Ce qui compte, c’est de comprendre qu’à cette période la technique devient de plus en plus importante dans la survie." },
      { title: "2. Des outils simples en apparence", text: "Les outils associés à cette période sont souvent appelés oldowayens. Ils peuvent sembler rudimentaires : des galets frappés pour obtenir un bord tranchant, des éclats de pierre coupants, des blocs servant à casser ou découper. Pourtant, leur simplicité apparente est trompeuse. Pour produire un éclat utilisable, il faut choisir une matière qui se fracture correctement, tenir compte de la forme du galet, frapper au bon endroit et obtenir un tranchant.\n\nL’objet final n’est donc qu’une partie de l’histoire. Ce qui intéresse les archéologues, c’est aussi la suite des gestes : choisir, frapper, détacher, utiliser, parfois transporter. Cette suite s’appelle une chaîne opératoire. Le terme n’a pas besoin d’être appris comme une définition scolaire : il désigne simplement le fait qu’un outil est le résultat d’une série d’actions organisées." },
      { title: "3. À quoi servaient ces outils ?", text: "Ces outils ont probablement servi à découper de la viande, casser des os pour atteindre la moelle, racler des peaux ou travailler certains végétaux. Ils ne prouvent pas qu’Homo habilis était un grand chasseur organisé. Il pouvait aussi récupérer des carcasses laissées par de grands prédateurs, puis utiliser les éclats pour accéder rapidement à des ressources précieuses.\n\nC’est un point important : l’outil change la place de l’hominine dans son environnement. Avec une main nue ou des dents, certaines ressources restent difficiles à exploiter. Avec un éclat coupant ou une pierre de percussion, il devient possible d’ouvrir, de découper, de briser, de transformer. L’outil n’est pas seulement un objet : c’est une nouvelle manière d’agir sur le monde." },
      { title: "4. Lire l’intelligence dans la pierre", text: "Un galet taillé ne permet pas de connaître directement les pensées d’Homo habilis. Mais il montre qu’un geste peut être anticipé : on frappe maintenant pour obtenir un tranchant qui servira ensuite. Cela suppose de l’observation, une mémoire des gestes efficaces, peut-être une forme d’apprentissage entre individus et une capacité à répéter un résultat utile.\n\nIl faut rester mesuré. Ces outils ne prouvent pas une intelligence moderne, un langage élaboré ou une culture comparable à celle de Sapiens. Ils montrent plutôt une première culture technique : des gestes simples, mais répétés, transmis et efficaces. C’est moins spectaculaire qu’une invention soudaine, mais historiquement beaucoup plus intéressant." },
      { title: "5. Un monde avec plusieurs hominines", text: "Homo habilis ne vit pas dans une histoire où une seule espèce avance tranquillement vers nous. Plusieurs lignées humaines ou préhumaines coexistent, et les classifications restent discutées. Certains fossiles sont difficiles à attribuer, certaines découvertes déplacent les dates, et les outils ne sont pas toujours retrouvés directement avec l’espèce qui les a fabriqués.\n\nC’est pour cela qu’il faut éviter les phrases trop nettes du type : “Homo habilis invente les outils.” La réalité est plus prudente : Homo habilis appartient à un moment où des hominines fabriquent et utilisent des outils de pierre de manière régulière. Cette nuance est essentielle, parce qu’elle montre comment on raisonne en Préhistoire avec des traces incomplètes." },
      { title: "6. Ce qu’il faut vraiment retenir", text: "Homo habilis est important parce qu’il appartient au moment où la technique devient une stratégie de survie. Les outils permettent d’accéder à de nouvelles ressources, de modifier les gestes du quotidien et peut-être de transmettre un savoir-faire. Même très simples, ils ouvrent une voie immense : plus tard viendront des bifaces, des lames, des pointes, des aiguilles, puis des techniques de plus en plus complexes.\n\nLa grande idée n’est donc pas “un homme malin invente le caillou coupant”. La grande idée, c’est qu’un objet fabriqué garde la trace d’un comportement : un besoin, un geste, un apprentissage et une relation nouvelle avec l’environnement." }
    ],
    deeper: [],
    takeaways: [
      { label: "Repère", text: "Homo habilis vit surtout en Afrique de l’Est entre environ 2,4 et 1,4 million d’années." },
      { label: "Idée forte", text: "Un outil est une suite de gestes organisés, pas seulement un caillou coupant." },
      { label: "Usages", text: "Les éclats servent à découper, casser, racler et accéder à de nouvelles ressources." },
      { label: "Nuance", text: "Il ne faut pas dire trop vite qu’Homo habilis a inventé les outils seul." },
      { label: "À retenir", text: "La technique devient un avantage majeur dans l’évolution humaine." }
    ]
  },
  "prehistory-fire": {
    express: [
      "La maîtrise du feu ne veut pas dire qu’un humain “découvre” le feu un jour précis. Le vrai basculement est d’apprendre à l’utiliser régulièrement : l’entretenir, le contrôler, le transporter parfois et organiser des activités autour du foyer.",
      "Les preuves sont délicates : charbons, sols rougis, os brûlés, pierres chauffées. Les archéologues doivent distinguer un incendie naturel d’un foyer réellement entretenu par des humains.",
      "Le feu change le quotidien : cuisson, chaleur, lumière, protection, vie sociale du soir et transformation des matériaux. C’est une maîtrise progressive, pas une invention unique et simple."
    ],
    complete: [
      { title: "1. Voir le feu n’est pas le maîtriser", text: "Les humains ont forcément rencontré des feux naturels très tôt : incendies provoqués par la foudre, braises après un feu de brousse, branches brûlantes dans le paysage. Mais voir le feu ne signifie pas le maîtriser. La vraie question historique n’est donc pas “qui a découvert le feu ?”, mais à partir de quand des groupes humains savent-ils l’utiliser de manière régulière.\n\nEntre ramasser une branche enflammée et entretenir un foyer stable, il existe un grand écart technique. Il faut garder des braises, ajouter du combustible, contrôler l’espace, éviter que le feu s’éteigne ou devienne dangereux. C’est cette capacité à faire du feu un outil du quotidien qui transforme la vie humaine." },
      { title: "2. Des traces difficiles à interpréter", text: "Étudier le feu ancien est compliqué. Les chercheurs cherchent des charbons, des os brûlés, des pierres chauffées, des foyers, des sols rougis par la chaleur. Mais un incendie naturel peut aussi produire du brûlé. Une trace noire ne suffit donc pas à prouver un foyer humain.\n\nCe qui compte, c’est le contexte : les traces sont-elles répétées ? Sont-elles situées dans un espace d’habitat ? Sont-elles associées à des outils, des os travaillés ou des activités humaines ? Plus les indices se croisent, plus l’hypothèse d’une maîtrise régulière devient solide." },
      { title: "3. Manger, digérer, se protéger", text: "Le feu modifie profondément l’alimentation. La cuisson attendrit certains aliments, rend certaines ressources plus digestes, change les goûts et peut réduire certains risques sanitaires. Elle permet aussi de traiter des végétaux, de cuire de la viande ou de rendre exploitables des aliments qui seraient difficiles à consommer crus.\n\nLe feu protège également du froid et peut éloigner certains animaux. Dans des milieux plus rudes ou lors de nuits froides, cette chaleur n’est pas un détail : elle peut rendre possible l’occupation de lieux et de saisons auparavant plus difficiles." },
      { title: "4. Lumière, temps social et techniques", text: "Le feu prolonge la journée. Autour d’un foyer, les activités peuvent continuer après la tombée de la nuit : préparer des aliments, entretenir des outils, surveiller le groupe, échanger. On ne peut pas prouver facilement les conversations ou les récits, mais le foyer crée un espace de rassemblement.\n\nIl permet aussi de transformer des matériaux. Chauffer une pierre, durcir une pointe en bois, travailler certaines matières : le feu devient peu à peu un outil technique. Il ne sert pas seulement à se réchauffer ; il change la manière de fabriquer, de vivre et d’occuper l’espace." },
      { title: "5. Une progression inégale", text: "Il ne faut pas imaginer une invention mondiale et immédiate. La maîtrise du feu est probablement progressive, variable selon les régions et les périodes. Certains groupes ont pu l’utiliser occasionnellement, d’autres de manière plus régulière. Les preuves ne sont pas toujours conservées, et leur interprétation reste discutée pour les périodes les plus anciennes.\n\nCette prudence est importante : elle évite le récit trop simple où “l’homme découvre le feu” comme dans une scène de film. L’histoire réelle est faite d’usages, d’apprentissages, de pertes, de reprises et d’adaptations." },
      { title: "6. Ce qu’il faut retenir", text: "La maîtrise du feu est une révolution parce qu’elle touche plusieurs dimensions à la fois : alimentation, protection, chaleur, lumière, sociabilité et technique. C’est l’un de ces changements qui ne se résume pas à un objet, mais transforme tout un mode de vie.\n\nLa bonne idée à garder est donc simple : le feu devient important quand il devient contrôlé et régulier. Ce n’est pas seulement une flamme ; c’est un nouvel outil pour habiter le monde." }
    ],
    deeper: [],
    takeaways: [
      { label: "Idée forte", text: "Le sujet n’est pas la découverte du feu, mais sa maîtrise régulière." },
      { label: "Preuves", text: "Charbons, foyers, sols rougis, os brûlés et pierres chauffées doivent être interprétés ensemble." },
      { label: "Effets", text: "Le feu change alimentation, chaleur, protection, lumière et sociabilité." },
      { label: "Nuance", text: "La maîtrise est progressive et inégale selon les lieux." }
    ]
  },
  "prehistory-hunt": {
    express: [
      "Les chasseurs-cueilleurs ne vivent pas seulement de chasse spectaculaire. Leur survie repose sur une connaissance fine des saisons, des animaux, des plantes, des points d’eau et des déplacements.",
      "Ils combinent chasse, pêche, collecte, charognage parfois, fabrication d’outils et coopération. La mobilité n’est pas de l’errance : c’est une stratégie pour suivre les ressources.",
      "À retenir : ces sociétés ne sont pas “primitives”. Elles ont des savoirs précis, adaptés à leur environnement, même si elles ne construisent pas encore de villes ni d’États."
    ],
    complete: [
      { title: "1. Une économie de connaissance", text: "On imagine souvent les chasseurs-cueilleurs comme des groupes qui suivent au hasard les animaux. C’est faux. Leur survie dépend d’une connaissance très précise du milieu : saisons, migrations, fruits disponibles, plantes comestibles, points d’eau, pierres utiles, abris possibles, dangers.\n\nCette connaissance n’est pas écrite, mais elle est transmise par l’expérience, l’observation et l’apprentissage. Dans un monde sans agriculture, savoir où et quand trouver une ressource est aussi important que posséder un outil." },
      { title: "2. Chasser, mais pas seulement", text: "La chasse est importante, surtout dans certaines régions et à certaines périodes, mais elle ne résume pas toute l’alimentation. Les groupes collectent des végétaux, ramassent des fruits, tubercules ou graines, pêchent parfois, exploitent des coquillages, récupèrent des œufs ou utilisent des carcasses.\n\nCette diversité est une force. Elle évite de dépendre d’une seule ressource. Selon les saisons, les groupes peuvent changer de campement, modifier leurs activités ou cibler d’autres aliments." },
      { title: "3. La mobilité comme stratégie", text: "Être mobile ne signifie pas errer sans but. Les déplacements suivent souvent des logiques connues : retour vers certains lieux, circulation entre zones de chasse, campements temporaires, halte près d’un point d’eau ou d’une source de pierre.\n\nCette mobilité permet d’éviter l’épuisement local des ressources et de s’adapter aux variations du climat. Elle demande aussi une organisation : transporter ce qui est utile, abandonner ce qui ne vaut pas l’effort, savoir quand repartir." },
      { title: "4. Coopération et techniques", text: "La chasse, la découpe, le transport, la préparation des peaux ou la fabrication des outils supposent des gestes coordonnés. Même sans institutions visibles comme un État ou une ville, ces groupes ont des règles, des apprentissages et des formes d’entraide.\n\nLes outils ne sont pas seulement des armes. Ils servent à couper, racler, percer, préparer, réparer. Une société de chasseurs-cueilleurs est donc aussi une société technique, capable d’adapter ses objets aux ressources disponibles." },
      { title: "5. Éviter le cliché du “primitif”", text: "Le mot “primitif” donne une image fausse, comme si ces sociétés étaient simples ou inférieures. Elles n’ont pas les mêmes formes d’organisation que les sociétés agricoles, mais elles possèdent des savoirs très élaborés sur leur environnement.\n\nLeur mode de vie peut durer très longtemps parce qu’il est efficace dans certains milieux. Il ne faut donc pas le présenter comme une étape ratée avant les villages. C’est une manière cohérente de vivre avec les ressources disponibles." },
      { title: "6. Ce qu’il faut retenir", text: "Les chasseurs-cueilleurs vivent d’un équilibre entre mobilité, diversité alimentaire, savoir écologique et coopération. Leur histoire montre que l’intelligence humaine ne se mesure pas seulement aux monuments ou à l’écriture.\n\nAvant l’agriculture, les humains ont déjà transformé leurs milieux, transmis des techniques et organisé leur vie sociale. C’est ce socle qui permet de comprendre la suite du Néolithique." }
    ],
    deeper: [],
    takeaways: [
      { label: "Idée forte", text: "La chasse-cueillette repose sur une connaissance précise des milieux." },
      { label: "Nuance", text: "La chasse ne résume pas toute l’alimentation : collecte, pêche et ressources variées comptent aussi." },
      { label: "Mobilité", text: "Se déplacer est une stratégie organisée, pas une errance." },
      { label: "À éviter", text: "Décrire ces sociétés comme simples ou inférieures." }
    ]
  },
  "prehistory-agriculture": {
    express: [
      "Le Néolithique correspond au développement progressif de l’agriculture, de l’élevage et de villages plus stables. Ce n’est pas un passage immédiat à une vie meilleure, mais une transformation lente des rapports au milieu.",
      "Cultiver et élever permet de produire davantage, de stocker, de rester plus longtemps au même endroit. Mais cela apporte aussi de nouvelles contraintes : travail régulier, dépendance aux récoltes, maladies, inégalités possibles.",
      "À retenir : l’agriculture change tout — alimentation, habitat, population, propriété, temps de travail et organisation sociale — mais elle ne remplace pas partout la chasse-cueillette au même rythme."
    ],
    complete: [
      { title: "1. Une transformation, pas un miracle", text: "Le Néolithique est souvent présenté comme une “révolution”, parce que ses conséquences sont immenses. Mais sur le terrain, le changement est progressif. Les humains ne se réveillent pas un matin en décidant d’abandonner la chasse-cueillette. Dans plusieurs régions du monde, des groupes commencent peu à peu à sélectionner des plantes, contrôler des animaux, rester plus longtemps au même endroit et stocker des ressources.\n\nCette transformation ne se produit pas partout en même temps. Le Croissant fertile est un foyer majeur, mais il existe d’autres foyers de domestication. Le rythme dépend des milieux, des espèces disponibles, des contacts et des choix des groupes humains." },
      { title: "2. Domestiquer les plantes et les animaux", text: "Domestiquer, ce n’est pas seulement utiliser une plante ou capturer un animal. C’est modifier progressivement une espèce par sélection. Les humains gardent les graines les plus utiles, favorisent certaines plantes, contrôlent la reproduction d’animaux plus dociles ou plus rentables.\n\nAvec le temps, les espèces domestiques changent. Les céréales cultivées, les moutons, chèvres, bovins ou porcs ne sont plus exactement leurs formes sauvages. La domestication transforme donc à la fois les sociétés humaines et le vivant qui les entoure." },
      { title: "3. Villages, stockage et nouvelles contraintes", text: "L’agriculture favorise des habitats plus stables. Les groupes peuvent construire des maisons plus durables, stocker des céréales, protéger des réserves et organiser les travaux selon les saisons. Cela permet parfois une croissance de la population, car les ressources produites sont plus prévisibles.\n\nMais cette stabilité crée aussi des contraintes. Les champs demandent du travail régulier. Les récoltes peuvent échouer. Le stockage attire des vols ou des conflits. La proximité avec les animaux favorise certaines maladies. Il ne faut donc pas raconter l’agriculture comme un progrès simple et confortable." },
      { title: "4. Des sociétés qui se complexifient", text: "Quand les populations augmentent et que les réserves deviennent importantes, les relations sociales changent. Il peut apparaître des différences de richesse, des tensions autour des terres, des formes de spécialisation du travail et des lieux de pouvoir plus visibles.\n\nCela ne signifie pas que tous les villages deviennent immédiatement des États. Mais le Néolithique prépare des conditions nouvelles : surplus, stockage, sédentarisation relative, échanges, conflits et organisation collective. Ces éléments seront essentiels pour comprendre les premières civilisations." },
      { title: "5. Une diffusion lente et inégale", text: "L’agriculture se diffuse par migrations, contacts, imitations et adaptations locales. Certains groupes adoptent vite des pratiques agricoles, d’autres conservent longtemps des modes de vie fondés sur la chasse, la pêche ou la collecte. Il peut aussi y avoir des mélanges.\n\nC’est une nuance importante : l’histoire n’avance pas au même rythme partout. Le Néolithique n’est pas une date unique, mais un ensemble de transformations qui touchent les régions à des moments différents." },
      { title: "6. Ce qu’il faut retenir", text: "Le Néolithique change la relation entre humains et nature. Au lieu de seulement prélever des ressources, certains groupes les produisent, les sélectionnent et les stockent. Cette nouvelle stratégie transforme l’habitat, la démographie, le travail et les rapports sociaux.\n\nLa grande idée n’est pas “l’agriculture est un progrès”. La grande idée est plus intéressante : produire sa nourriture donne de nouvelles possibilités, mais crée aussi de nouvelles dépendances." }
    ],
    deeper: [],
    takeaways: [
      { label: "Idée forte", text: "Le Néolithique transforme la production de nourriture, l’habitat et l’organisation sociale." },
      { label: "Nuance", text: "L’agriculture n’est pas un progrès simple : elle apporte aussi contraintes et dépendances." },
      { label: "Repère", text: "La transformation est progressive et inégale selon les régions." },
      { label: "Suite", text: "Stockage, villages et surplus préparent les premières civilisations." }
    ]
  },
  "prehistory-sapiens": {
    express: [
      "Homo sapiens apparaît en Afrique puis se diffuse progressivement dans plusieurs régions du monde. Il n’arrive pas dans un monde vide : il rencontre parfois d’autres humanités, comme Néandertal ou Denisova.",
      "Son succès ne tient pas à un seul “super-pouvoir”. Il combine mobilité, adaptation, outils, langage probable, coopération, transmission culturelle et capacité à vivre dans des milieux très différents.",
      "À retenir : Sapiens n’est pas la fin logique d’une échelle. C’est une espèce humaine parmi d’autres, devenue dominante dans une histoire faite de migrations, contacts et disparitions."
    ],
    complete: [
      { title: "1. Une espèce venue d’Afrique", text: "Homo sapiens apparaît en Afrique avant de se diffuser progressivement hors du continent. Cette origine africaine est importante, parce qu’elle casse les anciens récits qui imaginaient une naissance séparée des humains modernes dans chaque région du monde. Les données fossiles et génétiques montrent plutôt une histoire de départs, de migrations et de mélanges.\n\nCela ne veut pas dire qu’un seul groupe part un jour pour conquérir la planète. Les sorties d’Afrique sont complexes, étalées, parfois suivies d’échecs ou de retours. L’expansion de Sapiens est un processus long, pas une marche militaire." },
      { title: "2. Un monde déjà habité", text: "Quand Sapiens se déplace, il ne rencontre pas toujours des territoires vides. D’autres humanités existent, notamment Néandertal en Europe et en Asie occidentale, Denisova en Asie, et probablement d’autres groupes encore mal connus. Certaines de ces rencontres laissent des traces génétiques chez les humains actuels.\n\nCette coexistence change le récit. Sapiens n’est pas simplement “l’homme moderne” arrivant après tous les autres. Il est une espèce humaine parmi d’autres, qui finit par devenir dominante dans des conditions historiques et environnementales particulières." },
      { title: "3. Pourquoi Sapiens réussit-il ?", text: "Il n’y a pas une cause unique. Le succès de Sapiens tient probablement à une combinaison : mobilité, réseaux sociaux, techniques variées, langage élaboré, coopération, capacité d’apprentissage et adaptation à des milieux très différents. Ces éléments se renforcent les uns les autres.\n\nIl faut se méfier des explications trop simples : un cerveau plus gros, une arme meilleure, une supériorité automatique. L’histoire est faite de petits avantages cumulés, de contextes climatiques, de rencontres et de transmissions culturelles." },
      { title: "4. Techniques, symboles et culture", text: "Sapiens fabrique des outils, travaille des matières variées, se déplace sur de longues distances et développe des formes symboliques : parures, pigments, images, sépultures selon les périodes et les régions. Ces traces ne doivent pas être lues comme une apparition soudaine de “l’esprit moderne”, mais comme des indices d’une culture de plus en plus riche.\n\nLa culture permet de transmettre des solutions sans tout réinventer. Un groupe peut apprendre des gestes, des itinéraires, des récits, des techniques. C’est un avantage immense pour vivre dans des milieux changeants." },
      { title: "5. Disparitions et métissages", text: "Les autres humanités disparaissent progressivement, mais l’histoire n’est pas seulement celle d’un remplacement brutal. Il y a aussi des contacts et des métissages. Une partie de l’ADN de Néandertal ou de Denisova se retrouve chez certains humains actuels.\n\nCela oblige à nuancer la notion de victoire de Sapiens. Il devient dominant, mais il porte aussi des traces de ces rencontres. L’humanité actuelle est donc liée à une histoire plus large que notre seule espèce prise isolément." },
      { title: "6. Ce qu’il faut retenir", text: "Homo sapiens est important parce qu’il permet de comprendre migrations, adaptations, culture et coexistence entre humanités. Son histoire n’est pas une conclusion écrite d’avance : c’est le résultat d’une expansion progressive dans un monde complexe.\n\nLa grande idée est de refuser deux clichés : Sapiens comme héros supérieur depuis toujours, ou Sapiens comme simple étape finale. Il faut le comprendre comme une espèce très adaptable, prise dans des réseaux de contacts, d’apprentissages et de milieux." }
    ],
    deeper: [],
    takeaways: [
      { label: "Repère", text: "Sapiens apparaît en Afrique puis se diffuse progressivement." },
      { label: "Nuance", text: "Il coexiste avec d’autres humanités et conserve des traces de certains métissages." },
      { label: "Idée forte", text: "Son succès vient d’une combinaison d’adaptation, coopération, culture et mobilité." },
      { label: "À éviter", text: "Présenter Sapiens comme l’aboutissement automatique de l’évolution." }
    ]
  }
};
Object.entries(HISTODAILY_LONGFORM_OVERRIDES).forEach(([id, patch]) => {
  READY_LESSON_PACKS[id] = { ...(READY_LESSON_PACKS[id] || {}), ...patch };
});


/*
   Beta 106 — modes disciplinaires pilotés depuis l’accueil
   Objectif : l’accueil devient le vrai hub de choix du domaine. Le mystère,
   les propositions de cours et les raccourcis suivent le mode actif.
*/
const DISCIPLINE_MODE_COPY = {
  history: {
    label: "Mode Histoire",
    shortLabel: "Histoire",
    noun: "historique",
    headline: "Un mystère historique par jour, puis le cours qui va avec.",
    promise: "Périodes, événements et grands repères avancent ensemble.",
    discoveryTitle: "Des cours d’histoire à reprendre",
    discoveryIntro: "Trois portes d’entrée courtes, dans des époques différentes."
  },
  art: {
    label: "Mode Art",
    shortLabel: "Art",
    noun: "artistique",
    headline: "Parcours l’histoire de l’art par périodes, œuvres et ruptures visuelles.",
    promise: "Les mouvements, artistes et œuvres avancent dans une logique historique ; l’analyse d’image reste un hors-série utile.",
    discoveryTitle: "Cours d’histoire de l’art",
    discoveryIntro: "On privilégie quelques vrais cours bien écrits : Renaissance, impressionnisme, avant-gardes, contemporain."
  },
  cinema: {
    label: "Mode Cinéma",
    shortLabel: "Cinéma",
    noun: "de cinéma",
    headline: "Suis l’histoire du cinéma, de l’attraction Lumière aux plateformes.",
    promise: "Périodes, inventions, genres et réalisateurs passent avant les fiches de technique pure.",
    discoveryTitle: "Cours d’histoire du cinéma",
    discoveryIntro: "On part des premières projections, puis on avance vers le muet, Hollywood, les nouvelles vagues et le contemporain."
  },
  "science-inventions": {
    label: "Mode Sciences & inventions",
    shortLabel: "Sciences",
    noun: "scientifique",
    headline: "Découvre l’histoire des sciences et des inventions, pas seulement des notions abstraites.",
    promise: "Savants, instruments, machines, médecine, énergie et espace suivent une chronologie lisible.",
    discoveryTitle: "Cours d’histoire des sciences",
    discoveryIntro: "On raconte les découvertes et les inventions comme des épisodes historiques, avec contexte, conflits et conséquences."
  },
  economy: {
    label: "Mode Économie",
    shortLabel: "Économie",
    noun: "économique",
    headline: "Comprends les prix, crises et choix collectifs sans jargon inutile.",
    promise: "Notions, monnaie, entreprises, crises et mondialisation sont rangées par niveaux.",
    discoveryTitle: "Entrées possibles en économie",
    discoveryIntro: "Des notions de base aux crises et inégalités, avec une progression lisible."
  },
  geography: {
    label: "Mode Géographie",
    shortLabel: "Géographie",
    noun: "géographique",
    headline: "Lis le monde : cartes, territoires, villes, frontières et ressources.",
    promise: "Chaque thème part d’une question concrète sur l’espace et les sociétés.",
    discoveryTitle: "Entrées possibles en géographie",
    discoveryIntro: "On prépare un parcours par cartes, milieux, villes, puissances et ressources."
  },
  music: {
    label: "Mode Musique",
    shortLabel: "Musique",
    noun: "musical",
    headline: "Traverse l’histoire de la musique, des chants médiévaux au streaming.",
    promise: "Styles, instruments, lieux d’écoute et révolutions techniques avancent ensemble.",
    discoveryTitle: "Entrées possibles en musique",
    discoveryIntro: "On commence par quelques vrais cours d’histoire de la musique, pas un catalogue vide de genres."
  }
};

const DISCIPLINE_MODE_MYSTERIES = [
  {
    id: "art-mystery-impressionism-mode",
    discipline: "art",
    difficulty: "moyen",
    title: "Une peinture qui garde la trace de la lumière",
    caseTitle: "Mouvement artistique à identifier",
    prompt: "Des peintres sortent de l’atelier, travaillent par touches visibles et s’intéressent moins au contour parfait qu’à la lumière changeante, aux reflets et à l’instant perçu.",
    answer: "L’impressionnisme",
    aliases: ["impressionnisme", "les impressionnistes", "mouvement impressionniste"],
    clues: [
      "Mouvement artistique lié à la lumière, aux touches visibles et aux scènes modernes.",
      "France · seconde moitié du XIXe siècle · Monet, Renoir, Degas ou Pissarro.",
      "Le nom vient d’un tableau de Monet et d’une critique moqueuse devenue étiquette."
    ],
    explanation: "L’impressionnisme rompt avec la peinture académique en privilégiant la sensation visuelle, la lumière et la modernité des sujets.",
    blockedGuesses: ["monet", "peinture", "art moderne", "lumiere"]
  },
  {
    id: "cinema-mystery-melies-mode",
    discipline: "cinema",
    difficulty: "moyen",
    title: "Le magicien qui envoie le cinéma dans la Lune",
    caseTitle: "Pionnier du cinéma à identifier",
    prompt: "Ancien illusionniste, il comprend très vite que la caméra peut créer des disparitions, des décors impossibles et des voyages imaginaires. Son nom reste lié au cinéma de trucage et au Voyage dans la Lune.",
    answer: "Georges Méliès",
    aliases: ["georges melies", "georges méliès", "melies", "méliès"],
    clues: [
      "Pionnier français du cinéma, venu de la magie et du spectacle.",
      "Il utilise décors, arrêts de caméra et trucages pour inventer des mondes.",
      "Son film le plus célèbre montre une fusée plantée dans l’œil de la Lune."
    ],
    explanation: "Georges Méliès montre que le cinéma peut inventer l’impossible, pas seulement enregistrer le réel. Il ouvre une voie majeure vers la fiction, les effets spéciaux et le spectacle filmé.",
    blockedGuesses: ["cinema", "lune", "trucage", "voyage dans la lune"]
  },
  {
    id: "science-mystery-galileo-mode",
    discipline: "science-inventions",
    difficulty: "moyen",
    title: "Un ciel qui ne tourne plus simplement autour de nous",
    caseTitle: "Savant à identifier",
    prompt: "Avec une lunette, il observe des reliefs sur la Lune, des satellites autour de Jupiter et des phénomènes qui fragilisent l’idée d’un ciel parfait organisé autour de la Terre.",
    answer: "Galilée",
    aliases: ["galilee", "galilée", "galileo", "galileo galilei", "galilée galilei"],
    clues: [
      "Savant associé à la lunette astronomique et aux débats autour de l’héliocentrisme.",
      "Italie · début du XVIIe siècle · observations de la Lune et de Jupiter.",
      "Son conflit avec l’Église devient l’un des épisodes célèbres de l’histoire des sciences."
    ],
    explanation: "Galilée utilise l’observation instrumentée pour défendre une nouvelle manière de comprendre le ciel. Son importance vient autant des observations que de la méthode et du conflit intellectuel qu’elles déclenchent.",
    blockedGuesses: ["lunette", "jupiter", "heliocentrisme", "copernic"]
  },
  {
    id: "economy-mystery-inflation-mode",
    discipline: "economy",
    difficulty: "facile",
    title: "Quand la monnaie achète moins qu’avant",
    caseTitle: "Notion économique à identifier",
    prompt: "Les prix augmentent de manière générale. Le problème n’est pas seulement qu’un produit coûte plus cher, mais que le pouvoir d’achat de la monnaie diminue dans l’ensemble de l’économie.",
    answer: "L’inflation",
    aliases: ["inflation", "l inflation", "hausse generale des prix", "hausse générale des prix"],
    clues: [
      "Notion économique liée à une hausse générale et durable des prix.",
      "Elle touche le pouvoir d’achat, les salaires, l’épargne, les taux et les choix des banques centrales.",
      "Il ne faut pas la confondre avec la hausse isolée du prix d’un seul bien."
    ],
    explanation: "L’inflation désigne une augmentation générale des prix qui réduit le pouvoir d’achat de la monnaie. Elle se mesure, s’explique et se combat avec des outils économiques différents selon les causes.",
    blockedGuesses: ["prix", "argent", "euro", "crise"]
  },
  {
    id: "geography-mystery-mercator-mode",
    discipline: "geography",
    difficulty: "moyen",
    title: "Une carte utile aux marins, mais trompeuse pour les tailles",
    caseTitle: "Projection cartographique à identifier",
    prompt: "Elle conserve les angles et facilite la navigation, mais agrandit fortement les régions proches des pôles. Le Groenland paraît alors beaucoup plus comparable à l’Afrique qu’il ne l’est réellement.",
    answer: "La projection de Mercator",
    aliases: ["projection de mercator", "mercator", "carte de mercator", "projection mercator"],
    clues: [
      "Notion de cartographie : représenter une sphère sur une surface plane impose des déformations.",
      "Cette projection est très utile pour les routes maritimes car elle conserve les angles.",
      "Elle grossit les hautes latitudes : Groenland, Europe du Nord ou Russie paraissent très grands."
    ],
    explanation: "La projection de Mercator est pratique pour la navigation, mais elle déforme fortement les surfaces près des pôles. Elle montre qu’une carte est toujours un choix, jamais une copie neutre du monde.",
    blockedGuesses: ["carte", "projection", "groenland", "planisphere"]
  }
  ,{
    id: "music-mystery-jazz-mode",
    discipline: "music",
    difficulty: "moyen",
    title: "Une musique née du blues, du rythme et de l’improvisation",
    caseTitle: "Genre musical à identifier",
    prompt: "Née aux États-Unis au tournant du XXe siècle, cette musique mêle héritages afro-américains, improvisation, swing, clubs, orchestres, solos et transformations constantes.",
    answer: "Le jazz",
    aliases: ["jazz", "le jazz"],
    clues: [
      "Genre majeur de l’histoire de la musique du XXe siècle.",
      "Improvisation, swing, blues et clubs sont des indices importants.",
      "Louis Armstrong, Duke Ellington ou Miles Davis appartiennent à son histoire."
    ],
    explanation: "Le jazz naît dans un contexte afro-américain et devient une révolution musicale mondiale : improvisation, rythme, timbre, enregistrement et liberté d’interprétation transforment l’écoute.",
    blockedGuesses: ["blues", "swing", "musique", "improvisation"]
  }
];

(function registerDisciplineModeMysteries() {
  if (!Array.isArray(data.mysteries)) data.mysteries = [];
  const known = new Set(data.mysteries.map(item => item.id));
  DISCIPLINE_MODE_MYSTERIES.forEach(item => {
    if (!known.has(item.id)) data.mysteries.push({ ...item, modeMystery: true, manualCluesB97: true, cluesCleaned: true });
  });
})();

function disciplineModeCopy(disciplineId = activeDisciplineId()) {
  return DISCIPLINE_MODE_COPY[disciplineById(disciplineId).id] || DISCIPLINE_MODE_COPY.history;
}
function mysteryDisciplineId(mystery = {}) {
  if (mystery.discipline) return disciplineById(mystery.discipline).id;
  const lesson = mystery?.lessonId ? allLessons().find(item => item.id === mystery.lessonId) : null;
  if (lesson) return worldDisciplineId(lessonWorld(lesson));
  return "history";
}
function historyMysteryPool() {
  const curatedIds = new Set(curatedLessons().map(lesson => lesson.id));
  const historyMysteries = (data.mysteries || []).filter(mystery => mysteryDisciplineId(mystery) === "history");
  const linked = historyMysteries.filter(mystery => mystery?.lessonId && curatedIds.has(mystery.lessonId));
  return linked.length ? linked : historyMysteries;
}
function publicMysteries(disciplineId = activeDisciplineId()) {
  const id = disciplineById(disciplineId || "history").id;
  if (id === "history") return historyMysteryPool();
  const pool = (data.mysteries || []).filter(mystery => mysteryDisciplineId(mystery) === id);
  return pool.length ? pool : historyMysteryPool();
}
function mysteryForDisciplineDayOffset(disciplineId = activeDisciplineId(), offset = 0) {
  const pool = publicMysteries(disciplineId);
  if (!pool.length) return null;
  const index = ((todayIndex() - offset) % pool.length + pool.length) % pool.length;
  return pool[index];
}
function mysteryForDayOffset(offset = 0) { return mysteryForDisciplineDayOffset(activeDisciplineId(), offset); }
function dailyMystery() { return mysteryForDayOffset(0); }
function isTodayMystery(id) { return Boolean(id && dailyMystery()?.id === id); }
function mysteryById(id) { return publicMysteries().find(m => m.id === id) || (data.mysteries || []).find(m => m.id === id); }
function mysteryDisciplineMatchesCurrent(mystery = {}) {
  return mysteryDisciplineId(mystery) === activeDisciplineId();
}
function isSelectedMysteryPlayable(mystery = {}) {
  if (!mystery?.id) return false;
  if (mysterySolved(mystery.id) || state.unlockedMysteries?.[mystery.id]) return true;
  if (mysteryDisciplineMatchesCurrent(mystery) && isTodayMystery(mystery.id)) return true;
  return Boolean(state.currentMysteryId === mystery.id && state.currentMysteryDiscipline === mysteryDisciplineId(mystery));
}
function currentMystery() {
  const selected = state.currentMysteryId ? mysteryById(state.currentMysteryId) : null;
  if (selected && isSelectedMysteryPlayable(selected)) return selected;
  return dailyMystery();
}
function mysteryStats() {
  const pool = publicMysteries();
  const solved = pool.filter(m => mysterySolved(m.id)).length;
  const expertSolved = pool.filter(m => m.difficulty === "expert" && mysterySolved(m.id)).length;
  const expertTotal = pool.filter(m => m.difficulty === "expert").length;
  const solvedItems = pool.map(m => state.solvedMysteries?.[m.id]).filter(Boolean);
  const avgScore = solvedItems.length ? Math.round(solvedItems.reduce((sum, item) => sum + (item.score || 0), 0) / solvedItems.length) : 0;
  return { solved, total: pool.length || 0, expertSolved, expertTotal, avgScore };
}

function disciplineHomeStats(disciplineId = activeDisciplineId()) {
  const discipline = disciplineById(disciplineId);
  const progress = disciplineProgress(discipline.id);
  const groups = treeGroups(discipline.id);
  const worlds = treeAvailableWorlds(discipline.id);
  const readyLessons = lessonsForDiscipline(discipline.id).filter(isCuratedLesson);
  return { discipline, progress, groups, worlds, readyLessons };
}
function firstWorldForDiscipline(disciplineId = activeDisciplineId()) {
  return treeAvailableWorlds(disciplineId)[0] || null;
}
function switchHomeDiscipline(disciplineId) {
  const discipline = disciplineById(disciplineId);
  const firstWorld = firstWorldForDiscipline(discipline.id);
  const nextMystery = mysteryForDisciplineDayOffset(discipline.id, 0);
  setState({
    tab: "home",
    currentDiscipline: discipline.id,
    currentGroup: firstWorld?.group || treeGroups(discipline.id)[0]?.id || state.currentGroup,
    currentWorld: firstWorld?.id || state.currentWorld,
    currentMysteryId: nextMystery?.id || null,
    learnFilter: "all",
    learnSearch: "",
    discoverOffset: 0
  });
}
function openModeLearn(disciplineId = activeDisciplineId(), worldId = null) {
  const discipline = disciplineById(disciplineId);
  const targetWorld = (worldId && treeAvailableWorlds(discipline.id).find(world => world.id === worldId)) || firstWorldForDiscipline(discipline.id);
  setState({
    tab: "learn",
    currentDiscipline: discipline.id,
    currentGroup: targetWorld?.group || treeGroups(discipline.id)[0]?.id || state.currentGroup,
    currentWorld: targetWorld?.id || state.currentWorld,
    learnFilter: "all",
    learnSearch: ""
  });
}
function modeSwitcherMarkup() {
  return `<section class="home-mode-switcher" aria-label="Choix du domaine">
    ${DISCIPLINES.map(item => {
      const active = item.id === activeDisciplineId();
      const stats = disciplineProgress(item.id);
      return `<button type="button" class="mode-pill ${active ? "active" : ""}" data-home-discipline="${escapeHtml(item.id)}" style="--discipline-accent:${escapeHtml(item.accent)}"><span>${item.emoji}</span><strong>${escapeHtml(disciplineModeCopy(item.id).shortLabel)}</strong><small>${stats.progress}%</small></button>`;
    }).join("")}
  </section>`;
}
function modeSnapshotMarkup(disciplineId = activeDisciplineId()) {
  const { discipline, progress, groups, worlds, readyLessons } = disciplineHomeStats(disciplineId);
  const mode = disciplineModeCopy(discipline.id);
  const readyText = readyLessons.length ? `${readyLessons.length} cours prêts` : `${worlds.length} thèmes posés`;
  return `<section class="card home-mode-card" style="--discipline-accent:${escapeHtml(discipline.accent)}">
    <div class="home-mode-card-main"><span class="mode-badge">${discipline.emoji} ${escapeHtml(mode.label)}</span><h2>${escapeHtml(mode.promise)}</h2><p>${escapeHtml(groups.slice(0, 3).map(group => String(group.title || "").replace(/^\d+\.\s*/, "")).join(" · ") || discipline.description)}</p></div>
    <div class="mode-stat-grid"><div><b>${progress.progress}%</b><span>progression</span></div><div><b>${groups.length}</b><span>grands chapitres</span></div><div><b>${readyText}</b><span>${readyLessons.length ? "contenu" : "structure"}</span></div></div>
  </section>`;
}
function modeContinueMarkup(disciplineId = activeDisciplineId()) {
  if (disciplineId === "history") return homeContinueMarkup();
  const { discipline, groups, worlds } = disciplineHomeStats(disciplineId);
  const first = worlds[0] || null;
  const group = first ? (groups.find(item => item.id === first.group) || groups[0]) : groups[0];
  return `<section class="card home-main-card home-continue-card mode-continue-card" style="--discipline-accent:${escapeHtml(discipline.accent)}">
    <div class="section-title-row"><div><span class="card-label">▶️ Continuer en ${escapeHtml(discipline.title)}</span><h2>${first ? `${first.emoji || discipline.emoji} ${escapeHtml(first.title)}` : "Parcours prêt"}</h2></div><small>${groups.length} chapitres</small></div>
    <p>${escapeHtml(first?.subtitle || group?.description || discipline.description)} ${first?.planned ? "Le thème est posé : on pourra ensuite écrire le vrai cours express, complet et quiz." : ""}</p>
    <div class="mode-progress-line"><i style="width:${Math.max(4, disciplineProgress(discipline.id).progress)}%"></i></div>
    <div class="home-card-footer"><span>${escapeHtml(group?.title || "Grand chapitre")}</span><button type="button" data-open-mode-learn="${escapeHtml(discipline.id)}">Voir les chapitres</button></div>
  </section>`;
}
function modeRecommendationItems(disciplineId = activeDisciplineId()) {
  const worlds = treeAvailableWorlds(disciplineId).slice();
  if (!worlds.length) return [];
  const groups = treeGroups(disciplineId);
  const slot = discoverySlot();
  const selected = [];
  const usedGroups = new Set();
  const ordered = worlds.sort((a, b) => (Number(a.sortStart) || 0) - (Number(b.sortStart) || 0) || String(a.id).localeCompare(String(b.id)));
  for (let i = 0; i < ordered.length && selected.length < 3; i += 1) {
    const world = ordered[(i + slot) % ordered.length];
    if (usedGroups.has(world.group) && selected.length < Math.min(3, groups.length)) continue;
    usedGroups.add(world.group);
    selected.push(world);
  }
  for (const world of ordered) {
    if (selected.length >= 3) break;
    if (!selected.some(item => item.id === world.id)) selected.push(world);
  }
  return selected.slice(0, 3);
}
function modeRecommendationsMarkup(disciplineId = activeDisciplineId()) {
  if (disciplineId === "history") return homeDiscoveryMarkup(homeDiscoveryLessons());
  const discipline = disciplineById(disciplineId);
  const mode = disciplineModeCopy(discipline.id);
  const groups = treeGroups(discipline.id);
  const items = modeRecommendationItems(discipline.id);
  return `<section class="card home-main-card home-discovery-card mode-recommend-card" style="--discipline-accent:${escapeHtml(discipline.accent)}">
    <div class="section-title-row"><div><span class="card-label">📚 ${escapeHtml(mode.shortLabel)} · cours proposés</span><h2>${escapeHtml(mode.discoveryTitle)}</h2></div><small>${items.length} pistes</small></div>
    <p>${escapeHtml(mode.discoveryIntro)}</p>
    <div class="home-discovery-grid">
      ${items.map((world, index) => {
        const group = groups.find(item => item.id === world.group) || {};
        return `<article class="home-discovery-item mode-world-item" data-mode-world="${escapeHtml(world.id)}" tabindex="0" role="button">
          <span class="home-discovery-kicker">${escapeHtml(String(group.title || "Chapitre").replace(/^\d+\.\s*/, ""))} · piste ${index + 1}</span>
          <h3>${world.emoji || discipline.emoji} ${escapeHtml(world.title)}</h3>
          <p>${escapeHtml(world.subtitle || group.description || discipline.description)}</p>
          <small>${escapeHtml(world.timeframe || group.range || "parcours")}</small>
          <button type="button" data-open-mode-world="${escapeHtml(world.id)}">Ouvrir</button>
        </article>`;
      }).join("")}
    </div>
    <div class="home-card-footer"><span>On garde des contenus propres : structure d’abord, vrais cours ensuite.</span><button class="ghost" type="button" data-open-mode-learn="${escapeHtml(discipline.id)}">Voir tout le parcours</button></div>
  </section>`;
}
function renderHome() {
  const disciplineId = activeDisciplineId();
  const discipline = disciplineById(disciplineId);
  const mode = disciplineModeCopy(disciplineId);
  const mystery = dailyMystery();
  const reward = dailyRewardPreview();
  const solvedToday = Boolean(mystery && mysterySolved(mystery.id));
  const nextLabel = solvedToday ? `Nouveau dossier dans ${timeToNextDaily()}` : `+${reward.gems} 💎 si tu résous aujourd’hui`;
  renderShell(`
    <header class="hero compact home-clean-hero home-mode-hero" style="--discipline-accent:${escapeHtml(discipline.accent)}">
      <div>
        <p class="eyebrow">HistoDaily · ${escapeHtml(mode.label)}</p>
        <h1>${escapeHtml(mode.headline)}</h1>
        <div class="hero-metrics"><span>🔥 ${state.streak || 0}</span><span>💎 ${state.gems || 0}</span><span>Niv. ${level()}</span>${homeVersionPillMarkup()}</div>
      </div>
    </header>

    ${modeSwitcherMarkup()}
    ${modeSnapshotMarkup(disciplineId)}

    ${mystery ? `<section class="card home-main-card home-mystery-card mode-mystery-card" data-home-mystery role="button" tabindex="0" style="--discipline-accent:${escapeHtml(discipline.accent)}">
      <div class="section-title-row">
        <div><span class="card-label">🕵️ Mystère ${escapeHtml(mode.noun)} du jour</span><h2>${escapeHtml(mysteryDisplayTitle(mystery))}</h2></div>
        <small>${solvedToday ? "résolu" : difficultyStars(mystery.difficulty)}</small>
      </div>
      <p>${escapeHtml(short(mysteryTeaser(mystery), 205))}</p>
      <div class="home-card-footer"><span>${escapeHtml(nextLabel)}</span><button>${solvedToday ? "Revoir" : "Jouer"}</button></div>
    </section>` : `<section class="card home-main-card"><h2>Aucun mystère chargé</h2><p>La donnée mystère est vide ou inaccessible.</p></section>`}

    ${modeContinueMarkup(disciplineId)}
    ${modeRecommendationsMarkup(disciplineId)}

    ${releaseNotesMarkup({ home: true })}

    <section class="home-secondary-actions">
      <button class="ghost" data-open-mode-learn="${escapeHtml(disciplineId)}">Parcours ${escapeHtml(mode.shortLabel)}</button>
      <button class="ghost" data-home-rank>Classement</button>
      <button class="ghost" data-home-profile>Profil</button>
    </section>`);

  document.querySelectorAll("[data-home-discipline]").forEach(btn => btn.addEventListener("click", () => switchHomeDiscipline(btn.dataset.homeDiscipline)));
  const openMystery = () => mystery && setState({ tab: "mystery", currentMysteryId: mystery.id, currentMysteryDiscipline: disciplineId, currentDiscipline: disciplineId });
  const mysteryCard = $(`[data-home-mystery]`);
  mysteryCard?.addEventListener("click", openMystery);
  mysteryCard?.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openMystery(); } });
  document.querySelectorAll("[data-home-continue]").forEach(btn => btn.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    openLessonFromHome(btn.dataset.homeContinue, btn.dataset.homeContinueView || "express");
  }));
  document.querySelectorAll("[data-home-discovery]").forEach(card => card.addEventListener("click", event => {
    event.stopPropagation();
    openDiscoveredLesson(card.dataset.homeDiscovery);
  }));
  document.querySelectorAll("[data-home-discovery]").forEach(card => card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openDiscoveredLesson(card.dataset.homeDiscovery); }
  }));
  document.querySelectorAll("[data-home-discovery-open]").forEach(btn => btn.addEventListener("click", event => {
    event.stopPropagation();
    openDiscoveredLesson(btn.dataset.homeDiscoveryOpen);
  }));
  $(`[data-refresh-discovery]`)?.addEventListener("click", event => {
    event.preventDefault();
    setState({ discoverOffset: (Number(state.discoverOffset) || 0) + 1 });
  });
  document.querySelectorAll("[data-open-mode-learn]").forEach(btn => btn.addEventListener("click", () => openModeLearn(btn.dataset.openModeLearn || disciplineId)));
  document.querySelectorAll("[data-mode-world]").forEach(card => {
    const open = () => openModeLearn(disciplineId, card.dataset.modeWorld);
    card.addEventListener("click", event => { event.stopPropagation(); open(); });
    card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } });
  });
  document.querySelectorAll("[data-open-mode-world]").forEach(btn => btn.addEventListener("click", event => {
    event.stopPropagation();
    openModeLearn(disciplineId, btn.dataset.openModeWorld);
  }));
  $(`[data-home-rank]`)?.addEventListener("click", () => setState({ tab: "rank" }));
  $(`[data-home-profile]`)?.addEventListener("click", () => setState({ tab: "profile" }));
  $(`[data-dismiss-release]`)?.addEventListener("click", () => setState({ dismissedReleaseVersion: APP_VERSION }));
}

function disciplineWheelMarkup() {
  const total = DISCIPLINES.length;
  const allStats = DISCIPLINES.map(discipline => ({ discipline, stats: disciplineProgress(discipline.id) }));
  const average = Math.round(allStats.reduce((sum, item) => sum + item.stats.progress, 0) / Math.max(1, allStats.length));
  const slices = allStats.map(({ discipline, stats }, index) => {
    const mid = (index + 0.5) * 360 / total;
    const label = polarPoint(50, 50, 34, mid);
    const fillOuter = 15 + (31 * stats.progress / 100);
    const main = ringSlicePath(index, total, 14, 47, 2.4);
    const fill = stats.progress > 0 ? ringSlicePath(index, total, 14, Math.max(18, fillOuter), 2.4) : "";
    return `<g class="culture-token-segment" style="--discipline-accent:${escapeHtml(discipline.accent)}">
      <path class="token-back" d="${main}" fill="${escapeHtml(discipline.accent)}"></path>
      ${fill ? `<path class="token-fill" d="${fill}" fill="${escapeHtml(discipline.accent)}"></path>` : ""}
      <text class="token-percent" x="${label.x.toFixed(1)}" y="${label.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle">${stats.progress}%</text>
    </g>`;
  }).join("");
  const legend = allStats.map(({ discipline, stats }) => {
    const meta = stats.ready ? `${stats.done}/${stats.total} cours` : `${stats.chapters || 0} chapitres`; 
    return `<div class="discipline-progress-row token-row" style="--discipline-accent:${escapeHtml(discipline.accent)}"><span>${discipline.emoji}</span><strong>${escapeHtml(discipline.title)}</strong><em>${escapeHtml(meta)}</em><b>${stats.progress}%</b></div>`;
  }).join("");
  return `<section class="card trivial-profile-card culture-profile-card culture-token-card">
    <div class="section-title-row"><div><span class="card-label">Profil culturel</span><h2>Ton jeton de culture</h2><p>Chaque tranche représente une discipline. Les pourcentages montent avec les cours réellement validés.</p></div><small>${average}% moyen</small></div>
    <div class="trivial-profile-layout"><div class="trivial-wheel-wrap"><svg class="trivial-wheel culture-wheel culture-token" viewBox="0 0 100 100" role="img" aria-label="Progression par discipline"><circle class="token-outer" cx="50" cy="50" r="49"></circle>${slices}<circle class="token-core" cx="50" cy="50" r="18"></circle><text class="trivial-center token-center" x="50" y="46" text-anchor="middle" dominant-baseline="middle">Profil</text><text class="wheel-average token-average" x="50" y="56" text-anchor="middle" dominant-baseline="middle">${average}%</text></svg></div><div class="discipline-progress-list">${legend}</div></div>
  </section>`;
}


/* =========================================================
   Beta 107 — thèmes par discipline + premiers vrais cours transversaux
   Objectif : chaque mode a sa couleur, et chaque discipline reçoit peu de contenu,
   mais du contenu vraiment lisible : express court, complet narratif, quiz 5 questions.
   ========================================================= */
const BETA107_DISCIPLINE_THEME = {
  history: { accent: "#f6c453", bg1: "#19395c", bg2: "#07111f", bg3: "#050914", glow1: "rgba(246,196,83,.20)", glow2: "rgba(86,214,255,.16)" },
  art: { accent: "#fb7185", bg1: "#3d1631", bg2: "#120b1d", bg3: "#070711", glow1: "rgba(251,113,133,.24)", glow2: "rgba(192,132,252,.17)" },
  cinema: { accent: "#a78bfa", bg1: "#24184f", bg2: "#100b22", bg3: "#05050d", glow1: "rgba(167,139,250,.25)", glow2: "rgba(239,68,68,.13)" },
  "science-inventions": { accent: "#56d6ff", bg1: "#0a3c52", bg2: "#071827", bg3: "#040b12", glow1: "rgba(86,214,255,.26)", glow2: "rgba(34,197,94,.13)" },
  economy: { accent: "#48d597", bg1: "#0b3d2e", bg2: "#071b18", bg3: "#04100f", glow1: "rgba(72,213,151,.24)", glow2: "rgba(250,204,21,.11)" },
  geography: { accent: "#84cc16", bg1: "#29420b", bg2: "#101b0a", bg3: "#061005", glow1: "rgba(132,204,22,.24)", glow2: "rgba(56,189,248,.13)" },
  music: { accent: "#f59e0b", bg1: "#4a2507", bg2: "#1f1208", bg3: "#0d0905", glow1: "rgba(245,158,11,.25)", glow2: "rgba(251,113,133,.14)" }
};
function applyDisciplineTheme(disciplineId = activeDisciplineId()) {
  const id = disciplineById(disciplineId || "history").id;
  const theme = BETA107_DISCIPLINE_THEME[id] || BETA107_DISCIPLINE_THEME.history;
  const root = document.documentElement;
  if (!root) return;
  root.dataset.discipline = id;
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--theme-accent", theme.accent);
  root.style.setProperty("--theme-bg1", theme.bg1);
  root.style.setProperty("--theme-bg2", theme.bg2);
  root.style.setProperty("--theme-bg3", theme.bg3);
  root.style.setProperty("--theme-glow1", theme.glow1);
  root.style.setProperty("--theme-glow2", theme.glow2);
  document.body?.setAttribute("data-discipline", id);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme.bg3);
}
function renderShell(content) {
  applyPerformanceMode();
  applyDisciplineTheme();
  const immersiveLesson = state.tab === "lesson";
  const navMarkup = immersiveLesson ? "" : `<nav class="bottom-nav">
        ${navButton("home", "⌂", "Accueil")}
        ${navButton("learn", "📖", "Cours")}
        ${navButton("mystery", "🕵️", "Mystère")}
        ${navButton("rank", "🏆", "Classement")}
        ${navButton("profile", "👤", "Profil")}
      </nav>`;
  app.innerHTML = `
    <main class="app-shell tab-${state.tab} discipline-${activeDisciplineId()} ${immersiveLesson ? "course-fullscreen-shell" : ""}">
      ${systemStatusMarkup()}
      ${content}
      ${navMarkup}
    </main>`;
  app.querySelectorAll("[data-tab]").forEach(btn => btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;
    if (!tab || tab === state.tab) return;
    const patch = { tab };
    if (tab === "mystery") patch.currentMysteryId = dailyMystery()?.id || null;
    setState(patch, { save: false });
  }));
  activateTextControls(app);
}
const BETA107_LESSONS = {
  "art-read-image": [
    {
      "id": "art-read-image-basics",
      "title": "Hors-série — Lire une œuvre sans réciter une fiche",
      "period": "Hors-série · méthode de lecture",
      "location": "Musée, livre, écran",
      "emoji": "👁️",
      "xp": 60,
      "order": 80
    }
  ],
  "cinema-shot-frame": [
    {
      "id": "cinema-shot-frame-basics",
      "title": "Hors-série — Plan et cadrage",
      "period": "Hors-série · langage du cinéma",
      "location": "Cinéma",
      "emoji": "🎥",
      "xp": 60,
      "order": 80
    }
  ],
  "sci-method-proof": [
    {
      "id": "sci-method-proof-basics",
      "title": "Hors-série — La méthode scientifique",
      "period": "Hors-série · méthode et preuves",
      "location": "Sciences",
      "emoji": "🔎",
      "xp": 60,
      "order": 80
    }
  ],
  "eco-supply-demand": [
    {
      "id": "eco-supply-demand-basics",
      "title": "Prix, offre et demande : pourquoi les prix bougent",
      "period": "Bases économiques",
      "location": "Marchés",
      "emoji": "⚖️",
      "xp": 60,
      "order": 1
    }
  ],
  "geo-maps": [
    {
      "id": "geo-maps-scale-basics",
      "title": "Cartes et échelles : une carte n’est jamais neutre",
      "period": "Bases géographiques",
      "location": "Monde",
      "emoji": "🧭",
      "xp": 60,
      "order": 1
    }
  ],
  "art-renaissance": [
    {
        "id": "art-renaissance-perspective",
        "title": "Renaissance : perspective et nouveau regard",
        "period": "XVe → XVIe siècle",
        "location": "Italie puis Europe",
        "emoji": "🖼️",
        "xp": 65,
        "order": 1
    }
],
  "cinema-early": [
    {
        "id": "cinema-early-lumiere-melies",
        "title": "Naissance du cinéma : Lumière et Méliès",
        "period": "1895 → 1914",
        "location": "France puis monde",
        "emoji": "🎞️",
        "xp": 65,
        "order": 1
    }
],
  "sci-astronomy": [
    {
        "id": "sci-galileo-revolution",
        "title": "Galilée et la lunette : le ciel devient observable",
        "period": "XVIIe siècle",
        "location": "Italie",
        "emoji": "🪐",
        "xp": 65,
        "order": 1
    }
],
  "music-medieval": [
    {
        "id": "music-gregorian-polyphony",
        "title": "Du chant grégorien aux premières polyphonies",
        "period": "Moyen Âge",
        "location": "Europe chrétienne",
        "emoji": "⛪",
        "xp": 65,
        "order": 1
    }
]
};
const BETA107_READY_PACKS = {
  "art-read-image-basics": {
    "hook": "Une œuvre ne se comprend pas en récitant tout de suite le nom de l’artiste. Avant l’étiquette, il faut apprendre à regarder : cadrage, composition, lumière, matière, sujet et contexte.",
    "keyFacts": [
      "Question de départ : qu’est-ce que l’image me fait voir en premier ?",
      "Outils : composition, lignes, couleurs, lumière, matière, format",
      "Contexte : époque, commande, lieu d’exposition, public visé",
      "Piège : réduire l’œuvre à “c’est beau” ou à une biographie d’artiste"
    ],
    "express": [
      "Lire une œuvre, ce n’est pas deviner une signification cachée au hasard. Le bon réflexe est de commencer par ce qui se voit : le format, les personnages ou objets, les lignes fortes, la lumière, les couleurs et l’endroit où l’œil est attiré en premier.",
      "Ensuite seulement, on interprète. Une couleur, un geste, un regard, un décor ou un symbole peuvent avoir du sens, mais ils doivent être reliés à l’image elle-même et à son contexte : époque, commande, fonction religieuse, politique, décorative ou marchande.",
      "À retenir : une bonne lecture d’œuvre suit un chemin simple. Observer précisément, décrire sans inventer, expliquer avec le contexte, puis formuler une idée. Ce n’est ni une fiche Wikipédia, ni un avis du type “j’aime / je n’aime pas”."
    ],
    "complete": [
      {
        "title": "1. Regarder avant de nommer",
        "text": "Le premier piège, face à une œuvre, est de vouloir immédiatement reconnaître un artiste, un style ou un mouvement. C’est rassurant, mais cela peut empêcher de voir l’image. Avant de dire “c’est de la Renaissance”, “c’est impressionniste” ou “c’est moderne”, il faut décrire ce qui est réellement sous les yeux.\n\nOn commence donc par les faits visibles : format horizontal ou vertical, scène pleine ou vide, personnages nombreux ou isolés, décor intérieur ou extérieur, couleurs dominantes, lumière douce ou violente, gestes, regards, objets importants. Cette description n’est pas une étape scolaire inutile : elle évite d’interpréter dans le vide."
      },
      {
        "title": "2. La composition dirige le regard",
        "text": "Une image est organisée. Même quand elle semble spontanée, elle propose souvent un chemin pour l’œil. Des lignes verticales peuvent donner une impression de stabilité, des diagonales créer du mouvement, une figure centrale attirer l’attention, un vide produire du silence ou de la tension.\n\nRegarder la composition, c’est se demander où l’artiste place les éléments et pourquoi. Ce qui est grand, lumineux, central ou isolé n’a pas le même poids que ce qui reste dans l’ombre ou au bord du cadre. Une œuvre ne raconte donc pas seulement par son sujet, mais aussi par la manière dont elle range les formes."
      },
      {
        "title": "3. Couleur, lumière et matière",
        "text": "Les couleurs ne servent pas seulement à décorer. Elles créent une atmosphère, hiérarchisent les éléments, suggèrent une émotion ou rappellent des codes. Une lumière très contrastée peut dramatiser une scène ; une lumière diffuse peut donner une impression de calme ; une palette froide peut produire de la distance.\n\nLa matière compte aussi. Une peinture lisse, une touche visible, une sculpture polie, un collage, une photographie ou une installation ne donnent pas le même rapport au spectateur. Dans l’art, le “comment c’est fait” fait partie du sens autant que le “ce que ça représente”."
      },
      {
        "title": "4. Sujet, symboles et contexte",
        "text": "Une fois l’observation posée, on peut interpréter. Le sujet apparent ne suffit pas toujours : une scène religieuse peut aussi parler de pouvoir, un portrait peut construire une image sociale, une nature morte peut évoquer le temps qui passe, une abstraction peut chercher à libérer la couleur ou la forme.\n\nLe contexte aide à ne pas plaquer n’importe quelle idée. Qui commande l’œuvre ? Où devait-elle être vue ? À quelle époque ? Pour quel public ? Une image placée dans une église, un palais, un salon bourgeois, un musée ou une rue ne fonctionne pas de la même manière."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "Lire une œuvre, c’est articuler trois niveaux : ce que je vois, comment c’est organisé, ce que cela peut signifier dans un contexte. Le but n’est pas de produire une phrase compliquée, mais une explication solide.\n\nLa meilleure méthode reste simple : observer, décrire, relier, interpréter. Une bonne analyse ne commence pas par un jugement de goût, mais par des indices précis visibles dans l’œuvre."
      }
    ],
    "deeper": [],
    "takeaways": [
      {
        "label": "Méthode",
        "text": "Observer précisément avant d’interpréter."
      },
      {
        "label": "Composition",
        "text": "Le placement des formes dirige le regard et construit du sens."
      },
      {
        "label": "Contexte",
        "text": "Époque, commande et lieu d’exposition changent la lecture."
      },
      {
        "label": "Piège",
        "text": "Ne pas remplacer l’analyse par une biographie ou un simple avis de goût."
      }
    ],
    "quiz": [
      {
        "kind": "méthode",
        "q": "Quel est le premier réflexe pour lire une œuvre ?",
        "a": "Commencer par observer et décrire précisément ce qui se voit avant de donner une interprétation.",
        "why": "Cela évite d’inventer un sens sans appui visuel.",
        "trap": "Commencer directement par le nom de l’artiste ou par un avis personnel.",
        "evidence": "Bloc 1."
      },
      {
        "kind": "composition",
        "q": "Pourquoi la composition est-elle importante ?",
        "a": "Parce qu’elle organise l’image, dirige le regard et donne un poids différent aux éléments.",
        "why": "Le sens vient aussi de l’organisation visuelle.",
        "trap": "Croire que seul le sujet représenté compte.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "matière",
        "q": "Que peuvent apporter couleur, lumière et matière ?",
        "a": "Elles créent une atmosphère, hiérarchisent les éléments et participent au sens de l’œuvre.",
        "why": "La forme visuelle n’est pas une décoration secondaire.",
        "trap": "Les traiter comme de simples détails esthétiques.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "contexte",
        "q": "Pourquoi faut-il replacer l’œuvre dans son contexte ?",
        "a": "Parce que la commande, l’époque, le lieu et le public modifient ce que l’image cherche à produire.",
        "why": "Une œuvre ne fonctionne pas pareil dans une église, un palais, un musée ou la rue.",
        "trap": "Lire toutes les images comme si elles avaient la même fonction.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Quelle formule résume la bonne méthode ?",
        "a": "Observer, décrire, relier au contexte, puis interpréter.",
        "why": "C’est le chemin le plus solide pour éviter le commentaire vague.",
        "trap": "Faire une fiche de noms ou dire seulement “j’aime / je n’aime pas”.",
        "evidence": "Conclusion."
      }
    ]
  },
  "cinema-shot-frame-basics": {
    "hook": "Au cinéma, la caméra ne montre jamais tout. Un plan est déjà un choix : ce qui entre dans le cadre, ce qui reste hors champ, la distance au personnage et la place donnée au spectateur.",
    "keyFacts": [
      "Notion : le plan est une portion de film entre deux coupes",
      "Cadrage : ce que l’image inclut ou exclut",
      "Effets : proximité, tension, information, point de vue",
      "Piège : croire que la caméra enregistre seulement la réalité"
    ],
    "express": [
      "Un plan n’est pas une simple image. C’est une décision de mise en scène : la caméra choisit une distance, un angle, un cadre et une durée. Elle décide ce que le spectateur peut voir, mais aussi ce qu’il ne peut pas voir.",
      "Un gros plan rapproche d’un visage ou d’un détail ; un plan large situe un personnage dans un décor ; une plongée peut fragiliser ; une contre-plongée peut donner de la puissance. Le hors-champ compte aussi, car une menace invisible peut être plus forte qu’un objet montré clairement.",
      "À retenir : comprendre le cadrage, c’est comprendre comment un film fabrique notre regard. Le cinéma ne raconte pas seulement par son scénario, mais par l’organisation concrète des images."
    ],
    "complete": [
      {
        "title": "1. Un plan est un choix",
        "text": "On peut définir simplement un plan comme une portion de film comprise entre deux coupes. Mais cette définition technique ne suffit pas. Un plan est surtout un choix de regard : où placer la caméra, à quelle distance, avec quel angle, pendant combien de temps, et avec quoi dans le cadre.\n\nLe spectateur a souvent l’impression de “voir la scène”, comme s’il était libre. En réalité, le film organise fortement ce qu’il regarde. Le cadre décide ce qui est visible, ce qui est caché, ce qui paraît important et ce qui reste secondaire."
      },
      {
        "title": "2. La distance change la relation aux personnages",
        "text": "Un plan large montre un espace. Il situe un personnage dans un décor, une ville, une foule, un désert ou une pièce. Il peut donner une impression de solitude, de menace ou au contraire d’ampleur. Un plan moyen rapproche l’action. Un gros plan attire l’attention sur un visage, une main, un objet, une larme, une arme ou un détail.\n\nLa distance n’est donc pas neutre. Plus la caméra s’approche, plus elle impose une proximité émotionnelle ou une information précise. Plus elle s’éloigne, plus elle peut replacer l’individu dans un monde plus vaste."
      },
      {
        "title": "3. Angle, hauteur et point de vue",
        "text": "L’angle de prise de vue influence aussi la perception. Une plongée, filmée d’en haut, peut rendre un personnage plus fragile, surveillé ou écrasé par l’espace. Une contre-plongée, filmée d’en bas, peut le rendre plus imposant, inquiétant ou héroïque. Ces effets ne sont pas automatiques, mais ils orientent la sensation.\n\nLe point de vue est tout aussi important. La caméra peut sembler extérieure à l’action, ou au contraire adopter la perception d’un personnage. Elle peut nous faire savoir plus que lui, moins que lui, ou exactement ce qu’il sait. C’est une manière de fabriquer suspense, surprise ou empathie."
      },
      {
        "title": "4. Le hors-champ : ce qu’on ne voit pas",
        "text": "Le cadre crée toujours un hors-champ : tout ce qui existe dans l’univers du film mais n’apparaît pas dans l’image. Le cinéma utilise énormément cette zone invisible. Un bruit derrière une porte, un regard vers un espace vide, une ombre ou une réaction de personnage peuvent faire exister quelque chose sans le montrer.\n\nC’est particulièrement fort dans le suspense ou l’horreur, mais pas seulement. Le hors-champ peut suggérer la violence, la foule, le pouvoir, le danger ou le passé. Ce qui n’est pas montré peut parfois produire plus d’effet que ce qui est frontalement visible."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "Analyser un film, ce n’est pas seulement résumer l’histoire. Il faut regarder comment l’histoire est montrée. Le plan et le cadrage sont les premières briques de cette fabrication : distance, angle, durée, champ, hors-champ.\n\nLa grande idée est simple : la caméra construit notre regard. Quand on comprend ce choix, on commence à lire le cinéma comme un langage, pas seulement comme un scénario illustré."
      }
    ],
    "deeper": [],
    "takeaways": [
      {
        "label": "Définition",
        "text": "Un plan est une portion de film entre deux coupes, mais aussi un choix de regard."
      },
      {
        "label": "Distance",
        "text": "Plan large, plan moyen et gros plan ne produisent pas la même relation au personnage."
      },
      {
        "label": "Hors-champ",
        "text": "Ce qui n’est pas visible peut produire tension, menace ou attente."
      },
      {
        "label": "Idée forte",
        "text": "Le cinéma raconte aussi par la manière dont il cadre."
      }
    ],
    "quiz": [
      {
        "kind": "définition",
        "q": "Qu’est-ce qu’un plan au cinéma ?",
        "a": "Une portion de film entre deux coupes, mais aussi un choix de cadrage, de distance, d’angle et de durée.",
        "why": "Le cours insiste sur la dimension technique et expressive du plan.",
        "trap": "Le réduire à une image isolée sans intention.",
        "evidence": "Bloc 1."
      },
      {
        "kind": "effet",
        "q": "Que produit souvent un gros plan ?",
        "a": "Il rapproche le spectateur d’un visage, d’un détail ou d’une émotion en imposant une forte attention.",
        "why": "La distance change la relation au personnage ou à l’objet.",
        "trap": "Croire qu’un gros plan sert seulement à faire joli.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "angle",
        "q": "Pourquoi l’angle de caméra compte-t-il ?",
        "a": "Parce qu’une plongée ou une contre-plongée peut orienter la perception d’un personnage ou d’une situation.",
        "why": "La hauteur de caméra influence la sensation de fragilité, de puissance ou de menace.",
        "trap": "Penser que tous les angles racontent la même chose.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "notion",
        "q": "Qu’appelle-t-on le hors-champ ?",
        "a": "Ce qui existe dans l’univers du film mais reste en dehors de l’image visible.",
        "why": "Le hors-champ est créé par le cadre lui-même.",
        "trap": "Le confondre avec une erreur ou un élément absent du récit.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Pourquoi le cadrage est-il central dans l’analyse d’un film ?",
        "a": "Parce qu’il construit le regard du spectateur et participe au récit autant que le scénario.",
        "why": "C’est la conclusion du cours.",
        "trap": "Résumer seulement l’histoire sans regarder la mise en scène.",
        "evidence": "Conclusion."
      }
    ]
  },
  "sci-method-proof-basics": {
    "hook": "La science n’est pas une collection de vérités apprises par cœur. C’est une manière de produire des connaissances en acceptant de tester, mesurer, corriger et parfois abandonner une idée séduisante.",
    "keyFacts": [
      "Point de départ : une question ou une observation",
      "Outils : hypothèse, expérience, mesure, comparaison, reproductibilité",
      "Force : accepter la correction par les faits et par d’autres chercheurs",
      "Piège : confondre opinion, intuition et preuve"
    ],
    "express": [
      "La méthode scientifique commence souvent par une observation ou une question. On propose ensuite une hypothèse, c’est-à-dire une explication possible, puis on cherche un moyen de la tester. Une idée scientifique doit pouvoir être confrontée à des faits, pas seulement sembler convaincante.",
      "L’expérience, la mesure et la comparaison servent à limiter les impressions personnelles. Un résultat devient plus solide s’il est vérifié, critiqué, reproduit ou confirmé par plusieurs approches. La science avance donc aussi par erreurs corrigées.",
      "À retenir : la science n’est pas “croire les savants”. C’est organiser le doute pour construire des connaissances plus fiables que l’opinion, même si ces connaissances peuvent être améliorées avec de nouvelles preuves."
    ],
    "complete": [
      {
        "title": "1. Partir d’un problème",
        "text": "Une démarche scientifique ne commence pas forcément par une grande théorie. Elle peut partir d’une observation simple : un astre se déplace, une maladie se transmet, une plante pousse mieux dans certaines conditions, un matériau réagit à la chaleur. L’important est de transformer cette observation en question précise.\n\nPlus la question est claire, plus on peut la tester. “Pourquoi les gens tombent-ils malades ?” est immense. “Ce microbe est-il présent chez les patients atteints de cette maladie ?” devient plus contrôlable. La science gagne en force quand elle rend les problèmes examinables."
      },
      {
        "title": "2. Hypothèse ne veut pas dire devinette",
        "text": "Une hypothèse est une explication possible, mais elle doit être formulée de manière à pouvoir être mise à l’épreuve. Si aucune observation imaginable ne peut la contredire, elle sort du terrain scientifique.\n\nCela ne veut pas dire qu’une hypothèse est faible. Au contraire, c’est souvent une idée forte, mais exposée au risque d’être fausse. La science accepte ce risque : une idée qui résiste à des tests exigeants devient plus robuste qu’une idée protégée de toute critique."
      },
      {
        "title": "3. Mesurer pour sortir de l’impression",
        "text": "Les sens humains sont utiles, mais ils trompent facilement. On peut mal estimer une distance, confondre corrélation et cause, se souvenir surtout des cas spectaculaires, ou voir ce qu’on s’attend à voir. Les instruments et les mesures servent à réduire ces pièges.\n\nMesurer ne suffit pas automatiquement : il faut aussi comparer, définir les conditions, répéter, contrôler les biais. Une expérience bien construite cherche à isoler ce qui varie réellement, afin de ne pas attribuer un effet à la mauvaise cause."
      },
      {
        "title": "4. La correction fait partie de la méthode",
        "text": "Une connaissance scientifique n’est pas sacrée. Elle peut être discutée, corrigée, précisée ou remplacée si de meilleures preuves apparaissent. C’est parfois déroutant, car on peut croire qu’un changement signifie que “la science s’est trompée”. En réalité, cette capacité de correction est l’une de ses forces.\n\nLa critique par d’autres chercheurs compte beaucoup : refaire un calcul, tester un résultat, chercher une erreur, proposer une autre interprétation. La science n’avance pas seulement grâce aux génies isolés, mais grâce à des communautés qui vérifient et discutent."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "La méthode scientifique n’est pas une recette magique, mais une discipline du doute. Elle transforme des questions en hypothèses testables, utilise mesures et comparaisons, puis accepte la correction.\n\nLa grande différence avec une opinion n’est pas que la science serait toujours définitive. C’est qu’elle s’oblige à donner des raisons, des preuves et des procédures permettant à d’autres de vérifier ou de contester."
      }
    ],
    "deeper": [],
    "takeaways": [
      {
        "label": "Méthode",
        "text": "Une hypothèse scientifique doit pouvoir être testée."
      },
      {
        "label": "Preuve",
        "text": "Mesure, comparaison et reproductibilité rendent une idée plus solide."
      },
      {
        "label": "Doute",
        "text": "Corriger une théorie n’est pas une faiblesse : c’est le fonctionnement normal de la science."
      },
      {
        "label": "Piège",
        "text": "Une intuition convaincante n’est pas une preuve."
      }
    ],
    "quiz": [
      {
        "kind": "définition",
        "q": "Qu’est-ce qu’une hypothèse scientifique ?",
        "a": "Une explication possible formulée de manière à pouvoir être testée par des faits ou des observations.",
        "why": "Elle doit être exposée au risque d’être contredite.",
        "trap": "La confondre avec une simple opinion séduisante.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "méthode",
        "q": "Pourquoi mesure-t-on ?",
        "a": "Pour sortir des impressions personnelles, comparer correctement et limiter les biais.",
        "why": "Les sens et la mémoire peuvent tromper.",
        "trap": "Croire qu’une impression forte suffit comme preuve.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "preuve",
        "q": "Qu’est-ce qui rend un résultat plus solide ?",
        "a": "Le fait qu’il soit vérifié, discuté, répété ou confirmé par plusieurs approches.",
        "why": "La robustesse vient de la confrontation aux tests.",
        "trap": "Le croire vrai seulement parce qu’une personne connue l’affirme.",
        "evidence": "Blocs 3 et 4."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi une connaissance scientifique peut-elle changer ?",
        "a": "Parce qu’elle peut être corrigée ou précisée quand de nouvelles preuves ou de meilleures méthodes apparaissent.",
        "why": "La correction est une force de la démarche scientifique.",
        "trap": "Dire que changer d’avis prouve que tout se vaut.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Quelle différence avec une opinion ?",
        "a": "La science doit fournir des preuves et des procédures que d’autres peuvent vérifier ou contester.",
        "why": "C’est la discipline du doute organisé.",
        "trap": "Résumer la science à “croire les savants”.",
        "evidence": "Conclusion."
      }
    ]
  },
  "eco-supply-demand-basics": {
    "hook": "Un prix n’est pas seulement un chiffre posé sur une étiquette. Il signale des raretés, des coûts, des envies, des anticipations, des rapports de force et parfois des paniques.",
    "keyFacts": [
      "Offre : quantité que les vendeurs sont prêts à proposer",
      "Demande : quantité que les acheteurs veulent ou peuvent acheter",
      "Prix : résultat d’un équilibre, mais aussi d’un contexte",
      "Piège : croire que le prix reflète toujours la valeur morale ou l’utilité réelle"
    ],
    "express": [
      "L’offre désigne ce que les vendeurs peuvent ou veulent mettre sur le marché. La demande désigne ce que les acheteurs veulent et peuvent acheter. Quand la demande augmente fortement ou que l’offre se réduit, le prix a souvent tendance à monter.",
      "Mais ce mécanisme n’explique pas tout tout seul. Les coûts de production, les stocks, la concurrence, les taxes, les anticipations, la saison, les pénuries ou la mode peuvent aussi modifier les prix. Un marché réel est rarement un schéma parfaitement propre.",
      "À retenir : offre et demande donnent une base très utile pour comprendre les prix, mais il faut toujours demander ce qui bouge concrètement : quantité disponible, nombre d’acheteurs, pouvoir d’achat, coûts et contexte."
    ],
    "complete": [
      {
        "title": "1. Le prix comme signal",
        "text": "Dans la vie quotidienne, on voit le prix comme une somme à payer. En économie, il sert aussi de signal. Il indique qu’un bien est plus ou moins rare, plus ou moins demandé, plus ou moins coûteux à produire ou à transporter. Quand un prix change, il raconte souvent qu’un élément du marché a bougé.\n\nCe signal n’est pas parfait. Un prix peut être influencé par une mode, une taxe, une situation de monopole, une panique, une spéculation ou une règle publique. Mais il reste une information centrale pour comprendre les choix des producteurs et des consommateurs."
      },
      {
        "title": "2. L’offre : ce qui arrive sur le marché",
        "text": "L’offre correspond à la quantité que les vendeurs sont prêts à proposer à différents prix. Elle dépend des coûts de production, des salaires, des matières premières, de l’énergie, des machines, de la météo, des stocks ou des capacités de transport.\n\nSi produire devient plus cher, certains vendeurs réduisent leur offre ou demandent un prix plus élevé. Si une innovation rend la production plus facile, l’offre peut augmenter. L’offre n’est donc pas seulement une volonté : elle dépend de contraintes très concrètes."
      },
      {
        "title": "3. La demande : envie et pouvoir d’achat",
        "text": "La demande n’est pas simplement le désir. Beaucoup de gens peuvent vouloir un produit sans pouvoir l’acheter. En économie, la demande dépend à la fois des préférences, du revenu, du prix, des alternatives disponibles et des anticipations.\n\nSi un produit devient à la mode, si les revenus augmentent ou si les acheteurs craignent une pénurie, la demande peut monter. À l’inverse, si le prix devient trop élevé ou si un substitut apparaît, elle peut baisser. La demande est donc une combinaison d’envie, de moyens et de contexte."
      },
      {
        "title": "4. Pourquoi les prix bougent",
        "text": "Quand la demande augmente plus vite que l’offre, le prix monte souvent : beaucoup d’acheteurs se disputent une quantité limitée. Quand l’offre augmente ou que la demande baisse, le prix peut diminuer. Ce raisonnement donne une grille simple et puissante.\n\nMais il faut rester prudent. Dans certains secteurs, les prix sont réglementés, subventionnés ou dominés par quelques grandes entreprises. Dans d’autres, ils dépendent fortement des marchés mondiaux. L’offre et la demande restent utiles, mais elles doivent être replacées dans des institutions et des rapports de force."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "Offre et demande ne sont pas une formule magique, mais une première carte pour comprendre les prix. La bonne question n’est pas seulement “le prix monte-t-il ?”, mais “qu’est-ce qui a changé du côté des vendeurs, des acheteurs, des coûts ou des règles ?”.\n\nUn prix ne dit pas forcément ce qu’une chose “vaut vraiment”. Il dit surtout comment un marché organise à un moment donné une rencontre entre rareté, coûts, désir, pouvoir d’achat et contexte."
      }
    ],
    "deeper": [],
    "takeaways": [
      {
        "label": "Offre",
        "text": "Quantité que les vendeurs peuvent ou veulent proposer."
      },
      {
        "label": "Demande",
        "text": "Envie d’acheter combinée au pouvoir d’achat."
      },
      {
        "label": "Prix",
        "text": "Signal utile, mais influencé par le contexte et les règles."
      },
      {
        "label": "Nuance",
        "text": "Un marché réel n’est pas toujours un schéma pur."
      }
    ],
    "quiz": [
      {
        "kind": "définition",
        "q": "Que désigne l’offre ?",
        "a": "La quantité que les vendeurs sont prêts à proposer sur un marché à différents prix.",
        "why": "Elle dépend notamment des coûts, stocks et capacités de production.",
        "trap": "La confondre avec la demande des acheteurs.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "définition",
        "q": "Pourquoi la demande n’est-elle pas seulement l’envie ?",
        "a": "Parce qu’elle dépend aussi du pouvoir d’achat, du prix, des alternatives et du contexte.",
        "why": "Vouloir un produit ne signifie pas pouvoir l’acheter.",
        "trap": "Réduire la demande au désir pur.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "mécanisme",
        "q": "Que se passe-t-il souvent si la demande augmente alors que l’offre reste limitée ?",
        "a": "Le prix a tendance à monter, car davantage d’acheteurs se disputent une quantité limitée.",
        "why": "C’est le mécanisme central du cours.",
        "trap": "Dire que le prix baisse automatiquement.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "nuance",
        "q": "Pourquoi le schéma offre-demande ne suffit-il pas toujours ?",
        "a": "Parce que les prix peuvent aussi dépendre des taxes, règles publiques, monopoles, subventions ou marchés mondiaux.",
        "why": "Les marchés réels sont encadrés par des institutions.",
        "trap": "Imaginer un marché toujours parfaitement libre et simple.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Quelle question faut-il poser quand un prix bouge ?",
        "a": "Qu’est-ce qui a changé du côté de l’offre, de la demande, des coûts, des règles ou du contexte ?",
        "why": "C’est la méthode la plus utile pour analyser un prix.",
        "trap": "Dire seulement “c’est cher” ou “c’est la faute des vendeurs”.",
        "evidence": "Conclusion."
      }
    ]
  },
  "geo-maps-scale-basics": {
    "hook": "Une carte a l’air objective, mais elle résulte toujours de choix : projection, échelle, centrage, couleurs, figurés et informations gardées ou supprimées.",
    "keyFacts": [
      "Carte : représentation simplifiée d’un espace",
      "Échelle : rapport entre distance sur la carte et distance réelle",
      "Projection : méthode pour représenter une sphère sur un plan",
      "Piège : croire qu’une carte est une copie neutre du monde"
    ],
    "express": [
      "Une carte simplifie le monde pour le rendre lisible. Elle choisit ce qu’elle montre : routes, reliefs, frontières, densités, climats, flux, richesses ou risques. Ce choix dépend du but de la carte, pas seulement de la réalité du terrain.",
      "L’échelle change tout. Une carte mondiale montre les grands contrastes mais écrase les détails locaux. Une carte de quartier montre beaucoup de précision mais ne permet pas de comprendre les grands ensembles. Aucune échelle ne dit tout.",
      "À retenir : une carte est un outil très puissant, mais jamais neutre. Pour la lire, il faut regarder le titre, la légende, l’échelle, la projection et se demander ce que la carte montre — et ce qu’elle cache."
    ],
    "complete": [
      {
        "title": "1. Une carte simplifie",
        "text": "Le monde est trop complexe pour être représenté entièrement. Une carte sélectionne donc des informations : routes, villes, fleuves, frontières, reliefs, climats, densités de population, flux commerciaux ou zones de conflit. Ce tri rend la carte lisible, mais il crée aussi un point de vue.\n\nUne carte routière, une carte météo, une carte militaire et une carte scolaire du monde ne répondent pas à la même question. Elles peuvent représenter le même espace, mais pas le même problème. Lire une carte commence donc par une question simple : pourquoi cette carte a-t-elle été faite ?"
      },
      {
        "title": "2. L’échelle change le raisonnement",
        "text": "L’échelle indique le rapport entre la distance sur la carte et la distance réelle. Une grande échelle montre un petit espace avec beaucoup de détails, comme une ville ou une vallée. Une petite échelle montre un espace très vaste avec moins de détails, comme un continent ou le monde.\n\nChanger d’échelle peut changer l’explication. Un quartier peut sembler favorisé à l’échelle d’une ville, mais appartenir à une région en difficulté à l’échelle nationale. Une frontière peut paraître nette sur une carte du monde, mais beaucoup plus complexe localement."
      },
      {
        "title": "3. Représenter une sphère sur un plan déforme forcément",
        "text": "La Terre est proche d’une sphère, alors qu’une carte est plane. Pour passer de l’une à l’autre, il faut utiliser une projection. Aucune projection ne conserve parfaitement à la fois les formes, les surfaces, les distances et les angles. Il y a toujours un compromis.\n\nCertaines projections sont utiles pour la navigation, d’autres pour comparer les surfaces, d’autres pour montrer les continents de manière plus équilibrée. Le problème n’est pas qu’une projection “ment” forcément, mais qu’elle sert un usage précis et déforme autre chose."
      },
      {
        "title": "4. Légende, couleurs et catégories",
        "text": "La légende est la grammaire de la carte. Elle explique les couleurs, les figurés, les seuils et les catégories. Deux cartes peuvent donner une impression très différente simplement parce qu’elles ne découpent pas les données de la même manière.\n\nPar exemple, choisir trois catégories de richesse ou sept catégories ne produit pas le même effet visuel. Utiliser du rouge pour un phénomène peut suggérer l’urgence ou le danger. La carte est donc aussi un langage graphique."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "Une carte n’est pas une copie neutre du monde : c’est une représentation construite pour répondre à une question. Elle simplifie, sélectionne, déforme et hiérarchise. C’est ce qui la rend utile, mais aussi ce qui oblige à la lire avec méthode.\n\nLe bon réflexe est de vérifier le titre, la source, l’échelle, la légende, la projection et les choix de catégories. Une carte bien lue ne donne pas seulement une réponse : elle révèle aussi la manière dont on a posé la question."
      }
    ],
    "deeper": [],
    "takeaways": [
      {
        "label": "Échelle",
        "text": "Changer d’échelle change souvent l’explication."
      },
      {
        "label": "Projection",
        "text": "Mettre une sphère à plat impose toujours des déformations."
      },
      {
        "label": "Légende",
        "text": "Elle donne les règles de lecture de la carte."
      },
      {
        "label": "Piège",
        "text": "Une carte est utile, mais jamais totalement neutre."
      }
    ],
    "quiz": [
      {
        "kind": "définition",
        "q": "Pourquoi une carte simplifie-t-elle forcément le monde ?",
        "a": "Parce qu’elle sélectionne certaines informations pour rendre un espace lisible selon un objectif précis.",
        "why": "Toute carte fait un tri.",
        "trap": "Croire qu’elle montre tout le réel.",
        "evidence": "Bloc 1."
      },
      {
        "kind": "échelle",
        "q": "Que change l’échelle d’une carte ?",
        "a": "Elle change le niveau de détail et peut modifier l’explication d’un phénomène.",
        "why": "Un même espace ne se comprend pas pareil localement et mondialement.",
        "trap": "Penser qu’une seule échelle suffit toujours.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "projection",
        "q": "Pourquoi une projection déforme-t-elle toujours quelque chose ?",
        "a": "Parce qu’elle transforme une surface proche d’une sphère en surface plane.",
        "why": "On ne peut pas conserver parfaitement formes, surfaces, distances et angles à la fois.",
        "trap": "Chercher une carte plane totalement exacte.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "légende",
        "q": "Pourquoi la légende est-elle essentielle ?",
        "a": "Parce qu’elle explique les couleurs, figurés, seuils et catégories utilisés par la carte.",
        "why": "C’est la grammaire de la carte.",
        "trap": "Lire seulement les couleurs sans vérifier leur signification.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Quel réflexe faut-il avoir devant une carte ?",
        "a": "Regarder le titre, la source, l’échelle, la légende, la projection et ce que la carte choisit de montrer ou de cacher.",
        "why": "C’est la méthode de lecture critique.",
        "trap": "La prendre comme une copie neutre du monde.",
        "evidence": "Conclusion."
      }
    ]
  },
  "art-renaissance-perspective": {
    "hook": "À la Renaissance, l’art européen ne change pas seulement de style : il change de manière de regarder le monde. Le corps, l’espace, la lumière et l’Antiquité redeviennent des terrains d’expérience.",
    "keyFacts": [
        "Repère : XVe-XVIe siècles, d’abord en Italie puis en Europe",
        "Idée forte : la perspective donne une profondeur mathématique à l’image",
        "Contexte : humanisme, redécouverte de l’Antiquité, mécénat des villes et des princes",
        "Piège : croire que la Renaissance efface brutalement tout le Moyen Âge"
    ],
    "express": [
        "La Renaissance artistique naît surtout en Italie aux XVe et XVIe siècles. Les artistes s’intéressent davantage au corps humain, à l’espace, aux ruines antiques, à la lumière et à la place de l’homme dans le monde.",
        "La perspective est l’une des grandes nouveautés : elle permet de construire une impression de profondeur avec des lignes, un point de fuite et des proportions cohérentes. L’image semble devenir un espace organisé, presque mesurable.",
        "À retenir : la Renaissance n’est pas juste un retour à l’Antiquité. C’est une nouvelle ambition : représenter le monde de façon plus construite, plus humaine, plus savante, tout en restant liée aux commandes religieuses et politiques."
    ],
    "complete": [
        {
            "title": "1. Un changement de regard",
            "text": "Quand on parle de Renaissance en art, on pense souvent à des noms immenses : Léonard de Vinci, Michel-Ange, Raphaël, Botticelli. Mais le plus important n’est pas seulement la liste des artistes. Ce qui change, c’est le regard porté sur le monde. Les peintres et sculpteurs veulent représenter des corps plus crédibles, des espaces plus profonds, des émotions plus lisibles et des scènes mieux organisées.\n\nCette transformation naît surtout dans les villes italiennes, où les commanditaires religieux, les familles puissantes et les princes utilisent l’art pour montrer leur prestige. L’artiste reste souvent au service d’une commande, mais son statut grandit : il n’est plus seulement un artisan anonyme, il devient parfois une figure reconnue pour son invention et son savoir."
        },
        {
            "title": "2. La perspective, une révolution discrète",
            "text": "La perspective linéaire donne à l’image une profondeur organisée. Des lignes convergent vers un point de fuite ; les objets diminuent avec la distance ; l’espace semble obéir à une logique géométrique. Pour le spectateur, le tableau devient presque une fenêtre ouverte sur un monde construit.\n\nCette technique n’est pas seulement un truc de dessin. Elle traduit une idée très forte : le monde peut être observé, mesuré et ordonné par l’intelligence humaine. L’art rejoint alors les mathématiques, l’architecture et l’étude de la nature. Une peinture de la Renaissance n’est donc pas seulement belle : elle est souvent savante."
        },
        {
            "title": "3. Le corps humain reprend de l’importance",
            "text": "Les artistes de la Renaissance étudient davantage l’anatomie, les proportions et le mouvement. Le corps n’est plus seulement un signe religieux ou symbolique : il devient un sujet d’observation. Même dans les scènes bibliques, les personnages prennent du poids, du volume, des gestes et des émotions.\n\nCe retour au corps s’appuie aussi sur l’admiration pour l’Antiquité grecque et romaine. Les statues antiques, les ruines et les textes anciens nourrissent un idéal de beauté, d’équilibre et de dignité humaine. Mais il ne s’agit pas de copier mécaniquement le passé : les artistes réinventent ces modèles pour répondre aux besoins de leur temps."
        },
        {
            "title": "4. Religion, pouvoir et humanisme",
            "text": "La Renaissance ne remplace pas le religieux par le moderne du jour au lendemain. Une grande partie des œuvres reste chrétienne : Vierges, saints, fresques d’églises, retables, scènes bibliques. La nouveauté vient plutôt de la manière de représenter ces sujets : décors plus crédibles, corps plus humains, émotions plus présentes, composition plus stable.\n\nLe contexte humaniste compte aussi. Les élites valorisent l’étude, les langues anciennes, la philosophie, l’histoire et la dignité de l’homme. L’art devient un lieu où se rencontrent foi, prestige politique, savoir antique et curiosité pour le monde réel."
        },
        {
            "title": "5. Ce qu’il faut retenir",
            "text": "La Renaissance artistique est une étape majeure parce qu’elle transforme la manière de construire une image. Perspective, anatomie, lumière, composition et références antiques donnent aux œuvres une ambition nouvelle.\n\nIl faut cependant éviter une vision trop brutale : le Moyen Âge ne disparaît pas d’un coup, et les artistes de la Renaissance continuent souvent à travailler pour l’Église ou les puissants. La nouveauté tient surtout à l’alliance entre tradition, observation, savoir et confiance dans les capacités humaines."
        }
    ],
    "deeper": [],
    "takeaways": [
        {
            "label": "Repère",
            "text": "La Renaissance artistique se développe surtout en Italie aux XVe-XVIe siècles."
        },
        {
            "label": "Perspective",
            "text": "Elle organise la profondeur de l’image avec une logique géométrique."
        },
        {
            "label": "Humanisme",
            "text": "Le corps, l’homme et l’Antiquité prennent une place nouvelle."
        },
        {
            "label": "Nuance",
            "text": "La Renaissance reste liée aux commandes religieuses et politiques."
        }
    ],
    "quiz": [
        {
            "kind": "repère",
            "q": "Où la Renaissance artistique se développe-t-elle d’abord fortement ?",
            "a": "Surtout dans les villes italiennes, avant de se diffuser en Europe.",
            "why": "Le cours insiste sur le rôle des villes italiennes et des commanditaires.",
            "trap": "Dire simplement “partout en Europe en même temps”.",
            "evidence": "Bloc 1."
        },
        {
            "kind": "notion",
            "q": "À quoi sert la perspective linéaire ?",
            "a": "À organiser la profondeur de l’image grâce à des lignes, un point de fuite et des proportions cohérentes.",
            "why": "Elle donne l’impression d’un espace mesurable.",
            "trap": "La réduire à une couleur ou à un décor.",
            "evidence": "Bloc 2."
        },
        {
            "kind": "analyse",
            "q": "Pourquoi la perspective est-elle plus qu’un simple truc de dessin ?",
            "a": "Parce qu’elle montre l’idée que le monde peut être observé, mesuré et organisé par l’intelligence humaine.",
            "why": "Elle relie l’art aux mathématiques et à l’observation.",
            "trap": "Croire que c’est seulement décoratif.",
            "evidence": "Bloc 2."
        },
        {
            "kind": "contexte",
            "q": "Quel rôle joue l’Antiquité dans la Renaissance ?",
            "a": "Elle fournit des modèles de beauté, de proportions et de dignité humaine que les artistes réinventent.",
            "why": "Les artistes s’inspirent des statues, ruines et textes anciens.",
            "trap": "Dire qu’ils copient simplement le passé.",
            "evidence": "Bloc 3."
        },
        {
            "kind": "nuance",
            "q": "Pourquoi ne faut-il pas dire que la Renaissance efface totalement le Moyen Âge ?",
            "a": "Parce que beaucoup d’œuvres restent religieuses et commandées par l’Église ou les puissants, même si la manière de représenter change.",
            "why": "La rupture est réelle, mais progressive et mélangée à des continuités.",
            "trap": "Présenter la Renaissance comme un redémarrage total.",
            "evidence": "Bloc 4."
        }
    ]
},
  "cinema-early-lumiere-melies": {
    "hook": "Le cinéma ne naît pas immédiatement comme un art du grand récit. Il commence comme une attraction : une machine qui montre le réel, surprend le public et invente peu à peu ses propres pouvoirs.",
    "keyFacts": [
        "Repère : 1895, premières projections publiques des frères Lumière",
        "Lumière : vues du réel, scènes brèves, effet de présence",
        "Méliès : trucages, féerie, studio, imaginaire",
        "Piège : croire que le cinéma devient tout de suite un film narratif moderne"
    ],
    "express": [
        "À la fin du XIXe siècle, le cinéma apparaît comme une invention technique et un spectacle. Les frères Lumière filment des scènes courtes du quotidien : sortie d’usine, train, repas, rue, gestes ordinaires. Le choc vient de voir le réel bouger sur un écran.",
        "Georges Méliès comprend très vite que la caméra peut aussi fabriquer de l’imaginaire. Il utilise décors, trucages, arrêts de caméra, surimpressions et mise en scène pour créer des films féeriques, dont Le Voyage dans la Lune.",
        "À retenir : le cinéma naît entre deux pôles qui resteront essentiels : enregistrer le monde et inventer un monde. Le documentaire, la fiction, le trucage et le spectacle sont déjà en germe."
    ],
    "complete": [
        {
            "title": "1. Une invention et un spectacle",
            "text": "Le cinéma naît à la fin du XIXe siècle dans un monde fasciné par les machines, la photographie, l’électricité, les expositions et les attractions. Il ne se présente pas tout de suite comme un art comparable au roman ou au théâtre. Au départ, c’est aussi une curiosité technique : des images photographiques qui bougent devant un public.\n\nLes premières séances impressionnent parce qu’elles donnent une sensation de présence. Voir des ouvriers sortir d’une usine, un train entrer en gare ou une famille à table peut sembler banal aujourd’hui. Pour les premiers spectateurs, c’est un événement : le réel paraît revenir sous forme de mouvement."
        },
        {
            "title": "2. Les frères Lumière : capter le monde",
            "text": "Les frères Lumière ne filment pas des histoires longues. Ils réalisent des vues courtes : une action simple, souvent prise sur le vif ou légèrement organisée. Leur cinéma montre le quotidien, les gestes, les lieux, les foules, les machines, les déplacements.\n\nCe cinéma est important parce qu’il installe l’un des grands pouvoirs du film : enregistrer une trace du monde. Même quand une scène est choisie ou composée, elle garde une force documentaire. Le cinéma devient une manière de conserver des gestes, des visages et des espaces."
        },
        {
            "title": "3. Méliès : inventer l’impossible",
            "text": "Georges Méliès vient du spectacle et de la magie. Il comprend que le cinéma ne sert pas seulement à montrer ce qui existe : il peut aussi faire apparaître ce qui n’existe pas. Avec des décors peints, des costumes, des machines, des arrêts de caméra et des trucages, il transforme l’écran en scène d’illusion.\n\nSes films ouvrent la voie à la fiction spectaculaire. Le Voyage dans la Lune, avec son imaginaire scientifique et féerique, montre déjà que le cinéma peut construire un univers. Méliès n’est pas seulement un bricoleur amusant : il invente une partie du langage du spectacle filmé."
        },
        {
            "title": "4. Deux directions qui restent vivantes",
            "text": "Lumière et Méliès sont souvent opposés : d’un côté le réel, de l’autre l’imaginaire. Cette opposition est simple, mais elle aide à comprendre la naissance du cinéma. Très tôt, le film peut être document, fiction, attraction, trucage, souvenir ou rêve.\n\nToute l’histoire du cinéma gardera cette tension. Un film peut chercher à capter une ville telle qu’elle est, ou construire un monde totalement artificiel. Il peut observer, manipuler, raconter, émerveiller. Dès ses débuts, le cinéma n’a donc pas une seule identité."
        },
        {
            "title": "5. Ce qu’il faut retenir",
            "text": "La naissance du cinéma n’est pas seulement une date technique. C’est l’apparition d’un nouveau rapport aux images : le mouvement, la projection collective et la possibilité de faire croire à une présence.\n\nLes frères Lumière montrent la puissance d’enregistrement du réel ; Méliès montre la puissance d’invention. Entre ces deux pôles, l’histoire du cinéma va développer le documentaire, la fiction, le montage, les genres, les studios et les grands spectacles."
        }
    ],
    "deeper": [],
    "takeaways": [
        {
            "label": "Repère",
            "text": "Les projections Lumière de 1895 marquent un moment fondateur."
        },
        {
            "label": "Lumière",
            "text": "Le cinéma capte le réel, les gestes et les lieux."
        },
        {
            "label": "Méliès",
            "text": "Le cinéma invente des mondes grâce au décor et au trucage."
        },
        {
            "label": "Idée forte",
            "text": "Le cinéma naît entre document et imaginaire."
        }
    ],
    "quiz": [
        {
            "kind": "repère",
            "q": "Pourquoi les premières vues Lumière impressionnent-elles le public ?",
            "a": "Parce qu’elles montrent des images photographiques en mouvement, donnant une forte sensation de présence du réel.",
            "why": "Le choc vient de voir le réel bouger sur un écran.",
            "trap": "Croire qu’elles impressionnent par des scénarios complexes.",
            "evidence": "Bloc 1."
        },
        {
            "kind": "notion",
            "q": "Que filment surtout les frères Lumière ?",
            "a": "Des scènes courtes du quotidien, des gestes, des lieux, des foules ou des machines.",
            "why": "Leur cinéma installe la puissance d’enregistrement du monde.",
            "trap": "Dire qu’ils tournent surtout des longs métrages de fiction.",
            "evidence": "Bloc 2."
        },
        {
            "kind": "personnage",
            "q": "Qu’apporte Méliès à la naissance du cinéma ?",
            "a": "Il montre que la caméra peut inventer l’impossible avec décors, trucages, arrêts de caméra et mise en scène.",
            "why": "Il vient de la magie et du spectacle.",
            "trap": "Le réduire à un simple opérateur d’actualités.",
            "evidence": "Bloc 3."
        },
        {
            "kind": "exemple",
            "q": "Quel film de Méliès est cité comme exemple d’imaginaire scientifique et féerique ?",
            "a": "Le Voyage dans la Lune.",
            "why": "Le cours l’utilise pour montrer la fiction spectaculaire.",
            "trap": "Répondre Sortie d’usine, qui renvoie plutôt aux Lumière.",
            "evidence": "Bloc 3."
        },
        {
            "kind": "synthèse",
            "q": "Quels sont les deux grands pôles présents dès la naissance du cinéma ?",
            "a": "Enregistrer le monde et inventer un monde.",
            "why": "Lumière et Méliès symbolisent ces deux directions.",
            "trap": "Dire seulement “divertir” ou “informer”.",
            "evidence": "Conclusion."
        }
    ]
},
  "sci-galileo-revolution": {
    "hook": "Galilée ne change pas le ciel en regardant plus fort à l’œil nu. Il le change en utilisant un instrument, en observant des détails inattendus et en obligeant les savants à discuter avec les faits.",
    "keyFacts": [
        "Repère : début du XVIIe siècle",
        "Instrument : lunette astronomique améliorée",
        "Observations : relief de la Lune, satellites de Jupiter, phases de Vénus",
        "Enjeu : fragiliser l’idée d’un ciel parfait centré sur la Terre"
    ],
    "express": [
        "Au début du XVIIe siècle, Galilée améliore et utilise la lunette astronomique pour observer le ciel. Il voit des reliefs sur la Lune, des satellites autour de Jupiter et des phénomènes qui ne s’accordent pas bien avec l’idée d’un univers parfaitement centré sur la Terre.",
        "Son importance ne vient pas seulement d’une découverte isolée. Galilée montre la force d’une science instrumentée : un objet technique permet de voir ce que l’œil ne voyait pas, puis ces observations deviennent des arguments dans un débat savant.",
        "À retenir : Galilée appartient à la révolution scientifique parce qu’il associe observation, instruments, mathématiques, publication et controverse. L’histoire des sciences avance ici avec des preuves, mais aussi avec des conflits d’idées."
    ],
    "complete": [
        {
            "title": "1. Un ciel ancien remis en question",
            "text": "Pendant longtemps, la représentation dominante du cosmos place la Terre au centre. Le ciel est souvent imaginé comme un domaine parfait, régulier, différent du monde terrestre. Cette vision n’est pas absurde pour son époque : à l’œil nu, la Terre semble immobile et les astres paraissent tourner autour de nous.\n\nAvant Galilée, Copernic a déjà proposé un modèle héliocentrique, où la Terre tourne autour du Soleil. Mais une idée ne s’impose pas seulement parce qu’elle est élégante. Il faut des arguments, des observations, des calculs et une communauté capable d’en discuter."
        },
        {
            "title": "2. La lunette transforme l’observation",
            "text": "Galilée n’invente pas seul la lunette, mais il l’améliore et l’oriente vers le ciel. Ce geste est décisif. L’instrument agrandit, révèle des détails et rend visibles des phénomènes que l’œil nu ne pouvait pas saisir correctement.\n\nLa science change alors de dimension : voir ne signifie plus seulement regarder directement. Voir peut passer par un instrument, donc par une technique. La qualité de l’observation dépend de l’objet utilisé, de son réglage et de la manière d’interpréter ce qu’il montre."
        },
        {
            "title": "3. Des observations qui dérangent",
            "text": "Galilée observe que la Lune n’est pas une sphère parfaitement lisse : elle semble avoir des reliefs, des ombres, des irrégularités. Il observe aussi des points lumineux qui tournent autour de Jupiter. Cela montre qu’il existe des corps célestes qui ne tournent pas directement autour de la Terre.\n\nLes phases de Vénus renforcent également les difficultés du vieux modèle géocentrique. Chaque observation ne détruit pas tout à elle seule, mais l’ensemble fragilise une vision ancienne du cosmos. Le ciel devient un espace physique observable, moins parfait et plus complexe."
        },
        {
            "title": "4. Science, publication et conflit",
            "text": "Galilée publie, défend ses idées et entre dans des débats très tendus. Son histoire est célèbre à cause du conflit avec l’Église, mais il ne faut pas la réduire à une opposition simple entre science et religion. Les enjeux mêlent interprétation des textes, autorité intellectuelle, preuves disponibles, politique et prestige.\n\nCe qui compte pour l’histoire des sciences, c’est que les observations instrumentées deviennent des arguments publics. Les savants ne discutent plus seulement à partir de traditions : ils doivent tenir compte de ce que les instruments rendent visible."
        },
        {
            "title": "5. Ce qu’il faut retenir",
            "text": "Galilée incarne un moment où l’histoire des sciences s’accélère. L’instrument, l’observation, le calcul, la publication et la controverse transforment la manière de produire du savoir.\n\nLa grande idée n’est pas que Galilée aurait tout découvert seul. Il s’inscrit dans une chaîne de savants, de techniques et de débats. Mais il montre de façon spectaculaire qu’une invention optique peut modifier notre place dans l’univers."
        }
    ],
    "deeper": [],
    "takeaways": [
        {
            "label": "Instrument",
            "text": "La lunette permet de voir des phénomènes invisibles à l’œil nu."
        },
        {
            "label": "Observations",
            "text": "Lune irrégulière, satellites de Jupiter et phases de Vénus fragilisent l’ancien cosmos."
        },
        {
            "label": "Histoire",
            "text": "Galilée s’inscrit dans la révolution scientifique, après Copernic."
        },
        {
            "label": "Nuance",
            "text": "Le conflit ne se résume pas à science contre religion de manière simpliste."
        }
    ],
    "quiz": [
        {
            "kind": "repère",
            "q": "À quelle période Galilée utilise-t-il la lunette pour observer le ciel ?",
            "a": "Au début du XVIIe siècle.",
            "why": "C’est le moment de ses observations astronomiques majeures.",
            "trap": "Le placer dans l’Antiquité.",
            "evidence": "Express et bloc 1."
        },
        {
            "kind": "instrument",
            "q": "Pourquoi la lunette est-elle décisive ?",
            "a": "Parce qu’elle révèle des détails et des phénomènes que l’œil nu ne voyait pas correctement.",
            "why": "Elle transforme la manière d’observer.",
            "trap": "Dire qu’elle sert seulement à confirmer des traditions anciennes.",
            "evidence": "Bloc 2."
        },
        {
            "kind": "observation",
            "q": "Que montrent les satellites observés autour de Jupiter ?",
            "a": "Qu’il existe des corps célestes qui ne tournent pas directement autour de la Terre.",
            "why": "Cela fragilise l’idée que tout tourne autour de nous.",
            "trap": "Dire qu’ils prouvent que Jupiter tourne autour de la Terre.",
            "evidence": "Bloc 3."
        },
        {
            "kind": "nuance",
            "q": "Pourquoi le conflit autour de Galilée est-il complexe ?",
            "a": "Parce qu’il mêle interprétation religieuse, autorité, preuves, politique et prestige intellectuel.",
            "why": "Le cours évite le résumé simpliste science contre religion.",
            "trap": "Le réduire à un duel caricatural.",
            "evidence": "Bloc 4."
        },
        {
            "kind": "synthèse",
            "q": "Quelle grande leçon historique donne l’épisode Galilée ?",
            "a": "Un instrument technique peut transformer les observations disponibles et donc notre vision du monde.",
            "why": "La lunette modifie la place de la Terre dans les débats savants.",
            "trap": "Dire seulement que Galilée a regardé le ciel.",
            "evidence": "Conclusion."
        }
    ]
},
  "music-gregorian-polyphony": {
    "hook": "Avant les orchestres, les albums et les concerts modernes, une grande partie de la musique européenne se transmet par la voix, le rite et la mémoire. Puis l’écriture musicale change lentement la manière de composer.",
    "keyFacts": [
        "Repère : Moyen Âge européen",
        "Chant grégorien : chant religieux monodique, sans accompagnement instrumental dominant",
        "Notation : outil pour fixer et transmettre les mélodies",
        "Polyphonie : plusieurs voix différentes chantées ensemble"
    ],
    "express": [
        "Au Moyen Âge, la musique européenne est très liée à la religion. Le chant grégorien est un chant d’Église, généralement monodique : une seule ligne mélodique, chantée par des voix, sans logique d’orchestre moderne.",
        "L’écriture musicale devient essentielle. Les signes notés aident à transmettre les mélodies plus fidèlement et à organiser le chant dans des communautés éloignées. La musique commence à se conserver autrement que par la seule mémoire.",
        "À retenir : l’apparition progressive de la polyphonie change tout. Quand plusieurs voix indépendantes se superposent, la musique devient un espace construit, avec des rapports entre lignes, tensions et accords naissants."
    ],
    "complete": [
        {
            "title": "1. Une musique liée au rite",
            "text": "Au Moyen Âge, une grande partie de la musique savante européenne est liée à l’Église. Elle accompagne la prière, les offices, les fêtes religieuses et l’organisation du temps liturgique. Il ne faut pas l’imaginer comme un concert moderne : elle a d’abord une fonction rituelle et collective.\n\nLe chant grégorien est l’un des repères majeurs de cette histoire. Il s’agit d’un chant généralement monodique : plusieurs chanteurs peuvent chanter ensemble, mais ils suivent une même ligne mélodique. L’effet recherché n’est pas la virtuosité individuelle, mais l’unité, la clarté du texte et la continuité du rite."
        },
        {
            "title": "2. La mémoire ne suffit plus",
            "text": "Dans les sociétés où l’écriture musicale est limitée, la transmission repose beaucoup sur l’oralité, l’apprentissage et la mémoire. Mais à mesure que les répertoires grandissent et que les pratiques doivent circuler entre monastères, écoles et cathédrales, il devient utile de fixer davantage les mélodies.\n\nLes premiers systèmes de notation ne ressemblent pas immédiatement aux partitions modernes. Ils indiquent progressivement les mouvements de la voix, les hauteurs relatives, puis des repères plus précis. Cette évolution est décisive : écrire la musique permet de la conserver, de l’enseigner et de la complexifier."
        },
        {
            "title": "3. La polyphonie change l’écoute",
            "text": "La grande transformation vient de la polyphonie. Au lieu d’une seule ligne mélodique, plusieurs voix différentes peuvent se superposer. Elles ne chantent pas toutes exactement la même chose : elles se répondent, se croisent, se soutiennent. La musique devient un espace vertical et horizontal à la fois.\n\nCette nouveauté demande une organisation plus fine. Il faut penser les intervalles, les entrées des voix, les consonances, les tensions et les résolutions. La polyphonie n’est donc pas seulement un effet plus riche : elle transforme la composition musicale."
        },
        {
            "title": "4. Des écoles et des lieux",
            "text": "Les grandes églises, les monastères et les cathédrales jouent un rôle majeur dans cette histoire. Les lieux d’enseignement et de pratique permettent de transmettre des techniques, d’expérimenter et de stabiliser des formes. La musique savante médiévale n’est pas seulement un héritage flou : elle se construit dans des institutions.\n\nIl existe aussi des musiques profanes, des chants de troubadours, de trouvères, de fêtes ou de cours. Mais le chant religieux et la notation liturgique restent essentiels pour comprendre la naissance d’une tradition écrite qui influencera longtemps la musique européenne."
        },
        {
            "title": "5. Ce qu’il faut retenir",
            "text": "L’histoire de la musique médiévale montre un passage important : de la transmission surtout orale vers une musique de plus en plus notée, organisée et construite. Le chant grégorien donne un repère de musique monodique liée au rite ; la polyphonie ouvre la voie à des architectures sonores plus complexes.\n\nIl ne faut pas juger cette musique comme une version primitive de la musique moderne. Elle répond à d’autres fonctions, d’autres lieux et d’autres manières d’écouter. Mais elle pose des bases fondamentales : notation, composition, rapports entre voix et mémoire écrite du son."
        }
    ],
    "deeper": [],
    "takeaways": [
        {
            "label": "Chant grégorien",
            "text": "Chant religieux généralement monodique, lié au rite."
        },
        {
            "label": "Notation",
            "text": "Elle aide à transmettre, conserver et complexifier les mélodies."
        },
        {
            "label": "Polyphonie",
            "text": "Plusieurs voix différentes se superposent et transforment la composition."
        },
        {
            "label": "Nuance",
            "text": "La musique médiévale n’est pas primitive : elle répond à d’autres fonctions."
        }
    ],
    "quiz": [
        {
            "kind": "définition",
            "q": "Qu’est-ce qu’un chant monodique ?",
            "a": "Un chant organisé autour d’une seule ligne mélodique.",
            "why": "Le chant grégorien est présenté comme généralement monodique.",
            "trap": "Le confondre avec plusieurs voix indépendantes.",
            "evidence": "Bloc 1."
        },
        {
            "kind": "contexte",
            "q": "À quoi sert principalement le chant grégorien dans le cours ?",
            "a": "À accompagner la prière, les offices et le temps liturgique de l’Église.",
            "why": "Il a d’abord une fonction rituelle.",
            "trap": "L’imaginer comme un concert moderne.",
            "evidence": "Bloc 1."
        },
        {
            "kind": "invention",
            "q": "Pourquoi la notation musicale devient-elle importante ?",
            "a": "Parce qu’elle permet de transmettre, conserver, enseigner et complexifier les mélodies.",
            "why": "La mémoire seule devient insuffisante pour des répertoires plus vastes.",
            "trap": "Dire qu’elle sert seulement à décorer les manuscrits.",
            "evidence": "Bloc 2."
        },
        {
            "kind": "notion",
            "q": "Qu’est-ce que la polyphonie change ?",
            "a": "Elle superpose plusieurs voix différentes et oblige à penser leurs relations, tensions et résolutions.",
            "why": "Elle transforme la composition.",
            "trap": "Dire qu’elle signifie seulement chanter plus fort.",
            "evidence": "Bloc 3."
        },
        {
            "kind": "synthèse",
            "q": "Quelle grande évolution résume ce cours ?",
            "a": "Le passage d’une musique surtout transmise par la voix et le rite vers une musique plus notée, organisée et polyphonique.",
            "why": "C’est l’idée centrale de la leçon.",
            "trap": "Résumer le Moyen Âge musical à une absence de technique.",
            "evidence": "Conclusion."
        }
    ]
}
};
(function registerBeta107Content() {
  Object.entries(BETA107_LESSONS).forEach(([worldId, items]) => {
    if (!Array.isArray(data.lessons[worldId])) data.lessons[worldId] = [];
    const known = new Set(data.lessons[worldId].map(item => item.id));
    items.forEach(item => { if (!known.has(item.id)) data.lessons[worldId].push(item); });
  });
  ["art-read-image-basics", "cinema-shot-frame-basics", "sci-method-proof-basics", "eco-supply-demand-basics", "geo-maps-scale-basics", "art-renaissance-perspective", "cinema-early-lumiere-melies", "sci-galileo-revolution", "music-gregorian-polyphony"].forEach(id => PUBLISHED_LESSON_IDS.add(id));
  Object.assign(READY_LESSON_PACKS, BETA107_READY_PACKS);
})();


// Beta 109 — quelques vrais cours supplémentaires, sans remplissage artificiel.
const BETA109_LESSONS = {
  "art-impressionism": [
    {
      "id": "art-impressionism-modern-life",
      "title": "Impressionnisme : peindre la lumière et la vie moderne",
      "period": "XIXe siècle",
      "location": "France",
      "emoji": "🌤️",
      "xp": 65,
      "order": 1
    }
  ],
  "cinema-hollywood": [
    {
      "id": "cinema-hollywood-studio-system",
      "title": "Hollywood classique : studios, genres et stars",
      "period": "1930 → 1960",
      "location": "États-Unis",
      "emoji": "⭐",
      "xp": 65,
      "order": 1
    }
  ],
  "sci-vaccines-microbes": [
    {
      "id": "sci-pasteur-microbes-vaccines",
      "title": "Pasteur, microbes et vaccins : une révolution médicale",
      "period": "XIXe siècle",
      "location": "France puis monde",
      "emoji": "🦠",
      "xp": 65,
      "order": 1
    }
  ],
  "eco-inflation-rates": [
    {
      "id": "eco-inflation-money-value",
      "title": "Inflation : quand l’argent perd de sa valeur",
      "period": "XXe → XXIe siècle",
      "location": "Économies modernes",
      "emoji": "📉",
      "xp": 65,
      "order": 1
    }
  ],
  "geo-maps": [
    {
      "id": "geo-mercator-projection",
      "title": "Mercator : la carte utile qui déforme le monde",
      "period": "XVIe siècle → aujourd’hui",
      "location": "Monde",
      "emoji": "🧭",
      "xp": 65,
      "order": 2
    }
  ],
  "music-jazz-blues": [
    {
      "id": "music-jazz-birth",
      "title": "Naissance du jazz : blues, swing et improvisation",
      "period": "Début du XXe siècle",
      "location": "États-Unis",
      "emoji": "🎷",
      "xp": 65,
      "order": 1
    }
  ]
};
const BETA109_READY_PACKS = {
  "art-impressionism-modern-life": {
    "hook": "L’impressionnisme n’est pas seulement une peinture floue et jolie. C’est une rupture : des artistes quittent l’atelier, regardent la ville moderne, les loisirs, la lumière changeante, et acceptent que le tableau garde la trace d’un instant.",
    "keyFacts": [
      "Contexte : France du XIXe siècle, villes transformées, loisirs modernes, peinture en plein air",
      "Idée forte : saisir une impression visuelle plutôt que finir une scène parfaitement lisse",
      "Technique : touches visibles, couleurs claires, ombres colorées, cadrages parfois inspirés de la photographie",
      "Piège : croire que les impressionnistes peignent mal ; ils choisissent une autre manière de voir"
    ],
    "express": [
      "L’impressionnisme apparaît en France dans la seconde moitié du XIXe siècle. Des peintres comme Monet, Renoir, Degas ou Pissarro veulent représenter la lumière, les effets atmosphériques, les loisirs et la ville moderne plutôt que les grands sujets historiques ou mythologiques attendus par l’art officiel.",
      "Leur peinture choque parce qu’elle paraît inachevée : les touches restent visibles, les contours sont moins fermés, les couleurs sont plus claires. En réalité, ce choix permet de saisir un instant : un reflet sur l’eau, une gare pleine de vapeur, une danse, une rue, un déjeuner, un paysage qui change avec l’heure.",
      "À retenir : l’impressionnisme marque une étape essentielle vers l’art moderne. Il ne cherche plus seulement à représenter proprement un sujet, mais à montrer comment le monde est perçu dans un moment précis."
    ],
    "complete": [
      {
        "title": "1. Rompre avec la peinture officielle",
        "text": "Au XIXe siècle, la peinture reconnue par les institutions valorise souvent les grands sujets : histoire antique, mythologie, scènes religieuses ou portraits très travaillés. Les tableaux doivent paraître finis, maîtrisés, dignes d’être exposés au Salon officiel. L’impressionnisme arrive comme une provocation parce qu’il semble refuser cette finition classique.\n\nLes impressionnistes ne sont pas des amateurs incapables de peindre proprement. Ils choisissent de déplacer l’attention. Le sujet compte moins que l’effet visuel : la lumière d’un matin, le brouillard, la vitesse d’une foule, les reflets sur l’eau, la vibration d’un paysage. Le tableau devient le témoignage d’un regard situé dans un instant."
      },
      {
        "title": "2. Peindre la lumière et l’instant",
        "text": "Ce qui intéresse beaucoup ces peintres, c’est la manière dont la lumière transforme tout. Un même lieu peut changer selon l’heure, la météo, la saison ou la position du spectateur. Monet pousse cette idée très loin avec ses séries : cathédrales, meules, nymphéas. Le motif reste comparable, mais la perception change.\n\nPour rendre ces variations, la touche devient visible. Les couleurs se juxtaposent plutôt que d’être toujours fondues. Les ombres ne sont pas simplement noires ; elles peuvent devenir bleutées, violettes, colorées. Le tableau demande alors au regard du spectateur de recomposer l’impression d’ensemble."
      },
      {
        "title": "3. La vie moderne entre dans le tableau",
        "text": "L’impressionnisme accompagne aussi les transformations de la société. Paris se modernise, les gares, les boulevards, les cafés, les théâtres et les loisirs deviennent des sujets possibles. On peint des promeneurs, des danseuses, des canotiers, des terrasses, des champs ou des trains. Ce ne sont pas toujours des scènes héroïques, mais elles racontent une époque.\n\nLa photographie et les estampes japonaises influencent aussi les cadrages. Certains tableaux coupent les corps, décentrent le sujet ou donnent une impression de moment saisi sur le vif. La modernité n’est donc pas seulement dans le thème : elle est aussi dans la manière de cadrer et de regarder."
      },
      {
        "title": "4. Un scandale devenu classique",
        "text": "Aujourd’hui, l’impressionnisme est très populaire, parfois au point de paraître décoratif. Mais à ses débuts, il est critiqué. On reproche aux tableaux leur aspect rapide, leur manque de contours, leur indifférence aux sujets nobles. Le mot “impressionnisme” lui-même vient d’abord d’une moquerie autour du tableau de Monet Impression, soleil levant.\n\nCette histoire montre un mécanisme important de l’art : ce qui paraît scandaleux à une époque peut devenir central ensuite. L’impressionnisme ouvre la voie à d’autres ruptures modernes, parce qu’il affirme que peindre, ce n’est pas seulement copier le monde, mais traduire une perception."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "L’impressionnisme transforme la peinture en mettant au premier plan la lumière, l’instant et la sensation visuelle. Il s’intéresse à la vie moderne autant qu’aux paysages, et il accepte que la touche du peintre reste visible.\n\nLa grande idée n’est pas “ils peignent flou”. La vraie idée est plus forte : le tableau peut montrer la manière dont un regard perçoit le monde à un moment donné. C’est pour cela que l’impressionnisme est une étape majeure de l’histoire de l’art moderne."
      }
    ],
    "deeper": [],
    "takeaways": [
      {
        "label": "Rupture",
        "text": "L’impressionnisme refuse la finition lisse et les seuls grands sujets officiels."
      },
      {
        "label": "Technique",
        "text": "Touches visibles, couleurs claires et ombres colorées servent à rendre la lumière."
      },
      {
        "label": "Modernité",
        "text": "La ville, les loisirs, les gares et les instants ordinaires deviennent dignes d’être peints."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "Dans quel pays l’impressionnisme apparaît-il surtout ?",
        "a": "En France.",
        "why": "Le cours situe le mouvement en France au XIXe siècle.",
        "trap": "Le présenter comme un mouvement d’abord italien ou grec antique.",
        "evidence": "Express et bloc 1."
      },
      {
        "kind": "compréhension",
        "q": "Pourquoi les tableaux impressionnistes ont-ils pu paraître inachevés ?",
        "a": "Parce que les touches restent visibles, les contours sont moins fermés et l’effet d’instant prime sur la finition lisse.",
        "why": "C’est une critique centrale faite aux impressionnistes.",
        "trap": "Dire qu’ils ne savaient pas peindre.",
        "evidence": "Express et bloc 4."
      },
      {
        "kind": "notion",
        "q": "Que cherchent-ils souvent à saisir ?",
        "a": "La lumière, l’atmosphère et la perception d’un instant.",
        "why": "C’est l’idée principale du mouvement.",
        "trap": "Seulement raconter des scènes mythologiques.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "contexte",
        "q": "Quels sujets modernes entrent dans leurs tableaux ?",
        "a": "Les gares, boulevards, loisirs, cafés, danseuses, promenades ou scènes ordinaires de la vie moderne.",
        "why": "Le cours insiste sur la modernisation des sujets.",
        "trap": "Limiter le mouvement aux paysages vides.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "synthèse",
        "q": "Pourquoi l’impressionnisme compte-t-il dans l’histoire de l’art ?",
        "a": "Il ouvre une voie moderne en montrant que peindre peut traduire une perception, pas seulement copier un sujet.",
        "why": "C’est la conclusion du cours.",
        "trap": "Réduire le mouvement à une peinture décorative.",
        "evidence": "Bloc 5."
      }
    ]
  },
  "cinema-hollywood-studio-system": {
    "hook": "Hollywood classique n’est pas seulement un âge d’or nostalgique. C’est un système industriel complet : studios, contrats, stars, genres, décors, scénarios et salles organisent une machine à produire des films très lisibles et très efficaces.",
    "keyFacts": [
      "Période forte : surtout des années 1930 aux années 1950",
      "Organisation : grands studios, contrats, équipes techniques, vedettes et genres codifiés",
      "Genres : western, comédie musicale, film noir, mélodrame, comédie, aventure",
      "Piège : croire que le cinéma classique est seulement vieux ; il invente beaucoup de règles encore utilisées"
    ],
    "express": [
      "Entre les années 1930 et 1950, Hollywood fonctionne comme une grande industrie du cinéma. Les studios contrôlent une grande partie de la fabrication : acteurs sous contrat, réalisateurs, scénaristes, techniciens, décors, promotion et parfois salles de projection.",
      "Ce système produit des films très codifiés. Le western, la comédie musicale, le film noir, le mélodrame ou la comédie ont leurs décors, leurs personnages et leurs attentes. Le spectateur sait souvent dans quel monde il entre, mais chaque film peut varier la formule.",
      "À retenir : Hollywood classique construit une grammaire populaire du cinéma. Beaucoup de règles de récit, de montage, de star-system et de genres viennent de cette période, même quand le cinéma contemporain les détourne."
    ],
    "complete": [
      {
        "title": "1. Un cinéma devenu industrie",
        "text": "Le cinéma naît comme attraction et spectacle populaire, puis devient progressivement une industrie massive. À Hollywood, les grands studios organisent la production de manière très structurée. Ils possèdent des plateaux, emploient des équipes, signent des contrats avec les acteurs et planifient les films comme des produits culturels destinés à un large public.\n\nCette organisation permet de produire beaucoup de films, vite, avec une qualité technique élevée. Le cinéma classique hollywoodien n’est donc pas seulement une affaire d’artistes isolés. C’est une machine collective où le scénario, la lumière, le décor, le montage, le jeu d’acteur et la promotion sont pensés ensemble."
      },
      {
        "title": "2. Le règne des genres",
        "text": "Un élément central de Hollywood classique est le genre. Le western promet des frontières, des duels, des chevaux et des conflits moraux. La comédie musicale promet danse, chant et spectacle. Le film noir installe des rues sombres, des crimes, des détectives et une atmosphère trouble. Le mélodrame travaille les émotions familiales ou amoureuses.\n\nLe genre n’est pas une prison : c’est un contrat avec le spectateur. On sait à peu près ce qu’on vient voir, mais le plaisir vient de la variation. Un bon film classique donne une impression de clarté, tout en jouant avec les attentes."
      },
      {
        "title": "3. Stars et récits lisibles",
        "text": "Hollywood développe aussi le star-system. Les acteurs deviennent des images publiques : leur visage, leur voix, leur silhouette et leur réputation attirent les spectateurs. Une star n’est pas seulement une personne qui joue dans un film ; c’est une promesse. Voir Humphrey Bogart, Marilyn Monroe, John Wayne ou Audrey Hepburn donne déjà une direction imaginaire.\n\nLes récits sont souvent construits pour être lisibles. Les objectifs des personnages sont clairs, les scènes s’enchaînent efficacement, le montage évite de perdre le spectateur. Cette fluidité peut sembler naturelle, mais elle repose sur un énorme savoir-faire."
      },
      {
        "title": "4. Un système puissant mais limité",
        "text": "Le système des studios donne une efficacité impressionnante, mais il a aussi des limites. Il peut enfermer les acteurs dans des rôles, formater les histoires, contrôler les carrières et reproduire des visions sociales dominantes. Les règles morales de censure limitent aussi ce qui peut être montré ou raconté.\n\nPourtant, de nombreux réalisateurs et techniciens réussissent à créer des œuvres fortes à l’intérieur de ces contraintes. C’est l’un des intérêts de cette période : comprendre comment une industrie très organisée peut produire à la fois des formules répétées et des films majeurs."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "Hollywood classique est un moment où le cinéma devient une industrie culturelle extrêmement efficace. Les studios, les stars, les genres et les récits lisibles construisent une langue populaire du cinéma mondial.\n\nCe n’est pas seulement du “vieux cinéma”. Beaucoup de blockbusters, séries, franchises et films de genre actuels héritent encore de cette organisation : promettre un monde identifiable, guider le spectateur et renouveler une formule sans la casser complètement."
      }
    ],
    "deeper": [],
    "takeaways": [
      {
        "label": "Industrie",
        "text": "Les studios organisent la production avec des équipes, contrats, décors et stratégies de diffusion."
      },
      {
        "label": "Genres",
        "text": "Western, comédie musicale, film noir ou mélodrame servent de contrats avec le public."
      },
      {
        "label": "Héritage",
        "text": "Le cinéma actuel reprend encore beaucoup de règles du récit classique hollywoodien."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "Quelle période correspond surtout au Hollywood classique présenté ici ?",
        "a": "Des années 1930 aux années 1950 environ.",
        "why": "Le cours situe ce système au cœur du XXe siècle.",
        "trap": "Le placer uniquement avant 1900.",
        "evidence": "Express."
      },
      {
        "kind": "organisation",
        "q": "Que contrôlent les grands studios ?",
        "a": "Une grande partie de la fabrication : acteurs, équipes, décors, scénarios, promotion et parfois salles.",
        "why": "C’est l’idée d’un système industriel.",
        "trap": "Croire que chaque film est fabriqué sans organisation collective.",
        "evidence": "Bloc 1."
      },
      {
        "kind": "notion",
        "q": "Pourquoi les genres sont-ils importants ?",
        "a": "Ils créent un contrat avec le spectateur et organisent les attentes autour de décors, personnages et situations.",
        "why": "Le cours explique le rôle des genres.",
        "trap": "Dire qu’un genre empêche toute variation.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "compréhension",
        "q": "Qu’est-ce que le star-system ?",
        "a": "La construction d’acteurs comme images publiques capables d’attirer le public et de promettre un type de film.",
        "why": "La star dépasse la simple présence d’un acteur.",
        "trap": "Réduire la star à son salaire.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "synthèse",
        "q": "Pourquoi Hollywood classique influence-t-il encore le cinéma actuel ?",
        "a": "Parce qu’il a fixé des règles de récit, de genres, de stars et d’efficacité narrative encore reprises ou détournées.",
        "why": "C’est la conclusion du cours.",
        "trap": "Le considérer comme un cinéma sans héritage.",
        "evidence": "Bloc 5."
      }
    ]
  },
  "sci-pasteur-microbes-vaccines": {
    "hook": "Au XIXe siècle, comprendre que des êtres microscopiques peuvent provoquer des maladies change la médecine, l’hygiène, l’industrie alimentaire et la manière de penser la prévention. Pasteur incarne cette révolution, même s’il s’inscrit dans une histoire collective.",
    "keyFacts": [
      "Contexte : XIXe siècle, progrès du microscope, débats sur les causes des maladies",
      "Idée forte : les microbes peuvent être liés à la fermentation, aux infections et à certaines maladies",
      "Applications : pasteurisation, hygiène, vaccination, laboratoire expérimental",
      "Piège : croire que Pasteur découvre seul toute la microbiologie"
    ],
    "express": [
      "Au XIXe siècle, les savants comprennent progressivement que des micro-organismes invisibles à l’œil nu jouent un rôle dans la fermentation, les infections et certaines maladies. Cette idée transforme la médecine : les maladies ne sont plus seulement expliquées par l’air mauvais ou les déséquilibres du corps.",
      "Louis Pasteur devient célèbre parce qu’il relie expériences de laboratoire, applications concrètes et prévention. Ses travaux sur les fermentations, la pasteurisation et certains vaccins montrent qu’une découverte scientifique peut changer l’agriculture, l’alimentation, la chirurgie et la santé publique.",
      "À retenir : la révolution microbienne ne vient pas d’un seul homme, mais Pasteur en est une figure majeure. Elle impose une nouvelle idée : prévenir, stériliser, vacciner et contrôler les microbes peut sauver des vies."
    ],
    "complete": [
      {
        "title": "1. Avant les microbes : des explications floues",
        "text": "Pendant longtemps, les maladies sont expliquées par des causes très générales : mauvais air, humeurs déséquilibrées, faiblesse du corps, corruption des lieux. Certaines observations sont justes, mais les mécanismes restent mal compris. On sait parfois qu’une maladie se transmet, sans savoir exactement par quoi.\n\nAu XIXe siècle, l’amélioration des microscopes, des laboratoires et des méthodes expérimentales permet de mieux étudier les êtres minuscules. La grande bascule consiste à relier des micro-organismes précis à des phénomènes précis : fermentation, putréfaction, infection, maladies animales ou humaines."
      },
      {
        "title": "2. Pasteur et la preuve expérimentale",
        "text": "Pasteur ne travaille pas seulement avec des idées abstraites. Il met en place des expériences pour tester des hypothèses. Ses recherches sur la fermentation montrent que des micro-organismes vivants peuvent transformer des matières. Il combat aussi l’idée que la vie microscopique apparaîtrait spontanément dans certaines conditions.\n\nCe point est important pour l’histoire des sciences : la preuve ne vient pas d’une intuition géniale isolée, mais d’un dispositif. Il faut comparer, contrôler, montrer que telle condition produit tel résultat. La microbiologie se construit donc avec des instruments, des gestes de laboratoire et des débats."
      },
      {
        "title": "3. De la science à la vie quotidienne",
        "text": "Les conséquences dépassent largement le laboratoire. La pasteurisation consiste à chauffer certains liquides pour limiter les micro-organismes dangereux ou indésirables. Cela transforme la conservation alimentaire et la sécurité de produits comme le lait.\n\nL’idée microbienne transforme aussi l’hygiène. Si des microbes peuvent provoquer des infections, alors nettoyer, stériliser les instruments, protéger les plaies et organiser les espaces de soin deviennent des gestes essentiels. La médecine moderne ne repose pas seulement sur des médicaments : elle repose aussi sur la prévention."
      },
      {
        "title": "4. Vaccins et prévention",
        "text": "Pasteur est aussi associé à la vaccination, notamment contre des maladies animales et à l’épisode célèbre de la rage. Le principe général est de préparer l’organisme à résister à une maladie, en utilisant une forme affaiblie ou contrôlée de l’agent responsable ou de ses effets.\n\nIl faut cependant éviter le récit trop héroïque. D’autres savants, médecins et traditions expérimentales comptent énormément dans l’histoire des vaccins et de la microbiologie. Pasteur est une figure majeure parce qu’il réunit recherche, démonstration publique, applications et institution scientifique."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "La révolution microbienne change la façon de penser les maladies. Elle montre que l’invisible peut avoir des effets massifs et que l’on peut agir avant la catastrophe : stériliser, vacciner, surveiller, isoler, contrôler les contaminations.\n\nL’importance de Pasteur vient donc autant de ses découvertes que de la nouvelle culture scientifique qu’il représente : laboratoire, expérimentation, preuve, application industrielle et médecine préventive."
      }
    ],
    "deeper": [],
    "takeaways": [
      {
        "label": "Révolution",
        "text": "Les microbes deviennent des acteurs essentiels pour comprendre fermentations, infections et maladies."
      },
      {
        "label": "Prévention",
        "text": "Hygiène, stérilisation, pasteurisation et vaccination transforment la santé publique."
      },
      {
        "label": "Nuance",
        "text": "Pasteur est central, mais la microbiologie est une histoire collective."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "À quel siècle Pasteur appartient-il principalement ?",
        "a": "Au XIXe siècle.",
        "why": "Le cours situe la révolution microbienne dans ce contexte.",
        "trap": "Le placer dans l’Antiquité.",
        "evidence": "Express."
      },
      {
        "kind": "notion",
        "q": "Quelle idée transforme la médecine ?",
        "a": "Des micro-organismes peuvent être liés aux fermentations, infections et maladies.",
        "why": "C’est le cœur de la révolution microbienne.",
        "trap": "Dire que seules les humeurs expliquent les maladies.",
        "evidence": "Bloc 1."
      },
      {
        "kind": "méthode",
        "q": "Pourquoi le laboratoire est-il important ?",
        "a": "Parce qu’il permet de tester, comparer et contrôler les conditions pour produire des preuves.",
        "why": "Le cours insiste sur la preuve expérimentale.",
        "trap": "Réduire Pasteur à une intuition sans expérience.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "application",
        "q": "À quoi sert la pasteurisation ?",
        "a": "À chauffer certains liquides pour limiter des micro-organismes dangereux ou indésirables.",
        "why": "C’est une application concrète des travaux sur les microbes.",
        "trap": "La confondre avec une vaccination.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "synthèse",
        "q": "Pourquoi cette révolution dépasse-t-elle le laboratoire ?",
        "a": "Parce qu’elle change l’alimentation, l’hygiène, la chirurgie, la prévention et la santé publique.",
        "why": "Le cours montre les conséquences sociales et médicales.",
        "trap": "La limiter à une découverte théorique.",
        "evidence": "Bloc 5."
      }
    ]
  },
  "eco-inflation-money-value": {
    "hook": "L’inflation est souvent vécue comme une simple hausse de prix au supermarché. En réalité, c’est un phénomène plus large : quand les prix augmentent de manière générale, la monnaie ne permet plus d’acheter la même quantité de biens et de services.",
    "keyFacts": [
      "Définition : hausse générale et durable des prix",
      "Effet : baisse du pouvoir d’achat de la monnaie si les revenus ne suivent pas",
      "Causes possibles : demande forte, coûts de production, énergie, monnaie, anticipations",
      "Piège : confondre inflation et hausse isolée du prix d’un seul produit"
    ],
    "express": [
      "L’inflation désigne une hausse générale et durable des prix. Si une seule baguette augmente dans une boulangerie, ce n’est pas forcément de l’inflation. Si beaucoup de prix montent dans l’économie, alors chaque euro permet d’acheter un peu moins qu’avant.",
      "Elle peut venir de plusieurs sources : demande trop forte, énergie plus chère, salaires ou matières premières en hausse, problèmes de production, création monétaire, anticipations des entreprises et des ménages. Une inflation faible peut accompagner l’activité, mais une inflation trop forte désorganise les choix.",
      "À retenir : l’inflation n’est pas seulement “les prix montent”. C’est une perte de valeur de la monnaie dans l’ensemble de l’économie, avec des effets sur salaires, épargne, crédits, taux d’intérêt et pouvoir d’achat."
    ],
    "complete": [
      {
        "title": "1. Une hausse générale, pas un prix isolé",
        "text": "Le premier réflexe est de confondre inflation et hausse d’un prix. Or un prix peut augmenter pour une raison locale : une récolte mauvaise, une pénurie temporaire, une marque plus chère, une taxe spécifique. L’inflation commence quand la hausse touche largement l’économie et se prolonge.\n\nC’est pour cela qu’on la mesure avec des paniers de biens et de services. On observe l’évolution de nombreux prix : alimentation, logement, énergie, transports, loisirs, services. L’indicateur reste imparfait, car chacun ne consomme pas exactement le même panier, mais il donne une vision d’ensemble."
      },
      {
        "title": "2. La monnaie perd du pouvoir d’achat",
        "text": "Dire que les prix montent revient aussi à dire que la monnaie achète moins. Si ton revenu reste identique alors que les prix augmentent, ton pouvoir d’achat baisse. Tu possèdes le même nombre d’euros, mais ces euros donnent accès à moins de choses.\n\nCette idée est essentielle : l’inflation n’est pas seulement un problème de chiffres. Elle modifie les arbitrages quotidiens, l’épargne, les négociations salariales et les décisions d’achat. Elle peut toucher plus durement les ménages qui consacrent une grande part de leur budget aux dépenses indispensables."
      },
      {
        "title": "3. Plusieurs causes possibles",
        "text": "Il n’existe pas une seule inflation. Une économie peut connaître une inflation de demande si beaucoup d’acheteurs veulent consommer alors que l’offre ne suit pas. Elle peut connaître une inflation par les coûts si l’énergie, les matières premières ou les salaires augmentent fortement pour les entreprises.\n\nLes anticipations comptent aussi. Si les entreprises pensent que les coûts vont continuer à monter, elles peuvent augmenter leurs prix. Si les salariés anticipent une hausse durable des prix, ils demandent des salaires plus élevés. L’inflation peut donc s’entretenir en partie par les comportements."
      },
      {
        "title": "4. Pourquoi les banques centrales réagissent",
        "text": "Les banques centrales surveillent l’inflation parce qu’une monnaie trop instable rend les décisions difficiles. Quand les prix augmentent vite, il devient plus compliqué de comparer, d’épargner, d’investir ou de fixer des contrats. Pour ralentir l’inflation, une banque centrale peut relever ses taux, ce qui rend le crédit plus cher et freine une partie de la demande.\n\nMais l’action est délicate. Freiner trop brutalement peut ralentir l’économie et peser sur l’emploi. Ne rien faire peut laisser l’inflation s’installer. L’économie est donc souvent une affaire d’arbitrages, pas de bouton magique."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "L’inflation est une hausse générale des prix qui diminue le pouvoir d’achat de la monnaie. Elle peut avoir des causes différentes et ne touche pas tout le monde de la même manière.\n\nLa bonne question n’est pas seulement “quel prix a augmenté ?”, mais “est-ce que l’ensemble des prix, des revenus, des crédits et de l’épargne est en train de changer ?”. C’est ce qui fait de l’inflation une notion centrale pour comprendre l’économie quotidienne."
      }
    ],
    "deeper": [],
    "takeaways": [
      {
        "label": "Définition",
        "text": "L’inflation est une hausse générale et durable des prix."
      },
      {
        "label": "Pouvoir d’achat",
        "text": "Si les revenus ne suivent pas, chaque euro achète moins de choses."
      },
      {
        "label": "Arbitrage",
        "text": "La lutte contre l’inflation peut aussi ralentir l’activité économique."
      }
    ],
    "quiz": [
      {
        "kind": "définition",
        "q": "Qu’est-ce que l’inflation ?",
        "a": "Une hausse générale et durable des prix.",
        "why": "C’est la définition centrale du cours.",
        "trap": "La confondre avec la hausse isolée d’un seul prix.",
        "evidence": "Express et bloc 1."
      },
      {
        "kind": "compréhension",
        "q": "Pourquoi l’inflation réduit-elle le pouvoir d’achat ?",
        "a": "Parce que la même somme d’argent permet d’acheter moins de biens et services.",
        "why": "Le cours explique la perte de valeur de la monnaie.",
        "trap": "Dire qu’on a forcément moins d’euros sur son compte.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "causes",
        "q": "Cite deux causes possibles d’inflation.",
        "a": "Une demande trop forte, des coûts de production plus élevés, l’énergie chère ou les anticipations.",
        "why": "Le cours présente plusieurs sources possibles.",
        "trap": "Croire qu’il n’existe qu’une seule cause.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "institution",
        "q": "Pourquoi les banques centrales peuvent-elles relever les taux ?",
        "a": "Pour rendre le crédit plus cher, freiner une partie de la demande et ralentir l’inflation.",
        "why": "C’est un outil classique de politique monétaire.",
        "trap": "Dire que cela augmente directement tous les salaires.",
        "evidence": "Bloc 4."
      },
      {
        "kind": "synthèse",
        "q": "Pourquoi l’inflation est-elle une notion quotidienne ?",
        "a": "Parce qu’elle touche prix, revenus, épargne, crédits et choix de consommation.",
        "why": "Le cours relie la notion à la vie économique concrète.",
        "trap": "La réduire à un débat technique réservé aux banques.",
        "evidence": "Bloc 5."
      }
    ]
  },
  "geo-mercator-projection": {
    "hook": "Une carte paraît souvent évidente : on croit voir le monde tel qu’il est. La projection de Mercator montre l’inverse. Elle est très utile pour naviguer, mais elle déforme fortement les surfaces et change notre perception des continents.",
    "keyFacts": [
      "Problème : représenter une sphère sur un plan impose des déformations",
      "Mercator : projection utile aux marins parce qu’elle conserve les angles",
      "Limite : les hautes latitudes sont agrandies, comme le Groenland ou le nord de l’Europe",
      "Piège : croire qu’une carte est une copie neutre du monde"
    ],
    "express": [
      "La Terre est presque sphérique, mais une carte est plane. Pour passer de l’une à l’autre, il faut choisir une projection. Ce choix conserve certains éléments et en déforme d’autres : les formes, les distances, les angles ou les surfaces.",
      "La projection de Mercator, créée au XVIe siècle, est très utile pour la navigation parce qu’elle conserve les angles. Les routes maritimes peuvent être suivies plus facilement. Mais elle agrandit énormément les régions proches des pôles : le Groenland, le Canada ou la Russie paraissent beaucoup plus grands qu’ils ne le sont par rapport aux zones tropicales.",
      "À retenir : Mercator n’est pas une “mauvaise carte”. C’est une carte faite pour un usage. Le problème commence quand on l’utilise comme image neutre des tailles réelles du monde."
    ],
    "complete": [
      {
        "title": "1. Le problème de toute carte",
        "text": "Une carte du monde doit résoudre un problème impossible parfaitement : représenter une surface courbe sur une surface plane. C’est comme essayer d’aplatir une peau d’orange sans la déchirer ni la déformer. Il faut forcément accepter des compromis.\n\nUne projection cartographique choisit donc ce qu’elle préserve le mieux. Certaines projections respectent davantage les surfaces, d’autres les formes locales, les distances ou les angles. Aucune ne donne tout parfaitement. Lire une carte, c’est comprendre le choix qui a été fait."
      },
      {
        "title": "2. Pourquoi Mercator est utile",
        "text": "La projection de Mercator est mise au point au XVIe siècle, dans un contexte où la navigation maritime prend une importance majeure. Son intérêt est de conserver les angles. Pour un marin, cela permet de tracer plus simplement une direction constante sur la carte.\n\nCet avantage explique son immense succès. Mercator n’est donc pas une erreur absurde : c’est un outil puissant pour un usage précis. Beaucoup de problèmes viennent du fait que cette carte est devenue une image familière du monde, utilisée bien au-delà de son objectif de départ."
      },
      {
        "title": "3. La déformation des surfaces",
        "text": "Le défaut célèbre de Mercator concerne les surfaces. Plus on s’approche des pôles, plus les régions sont agrandies. Le Groenland paraît énorme, l’Europe du Nord et la Russie prennent beaucoup de place, tandis que les régions proches de l’équateur paraissent relativement réduites.\n\nCette déformation influence notre imagination géographique. Un territoire qui semble grand sur une carte paraît spontanément plus important. À l’inverse, certains espaces d’Afrique, d’Amérique du Sud ou d’Asie du Sud-Est peuvent paraître moins vastes qu’ils ne le sont réellement."
      },
      {
        "title": "4. Une carte est toujours un point de vue",
        "text": "La leçon importante dépasse Mercator. Une carte n’est jamais seulement une fenêtre neutre. Elle sélectionne, simplifie, nomme, centre, colore et hiérarchise. Le choix du centre du planisphère, de l’échelle, des frontières, des couleurs ou de la projection produit déjà un message.\n\nCela ne veut pas dire que toutes les cartes mentent. Cela veut dire qu’elles répondent à une question. Une carte routière, une carte météo, une carte militaire ou une carte scolaire ne montrent pas le monde de la même manière, parce qu’elles ne servent pas au même usage."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "Mercator est une projection très utile pour la navigation, mais trompeuse si on la prend comme représentation fidèle des surfaces. Elle conserve les angles, mais agrandit les hautes latitudes.\n\nLa grande idée géographique est simple : avant de croire une carte, il faut demander à quoi elle sert. Une carte n’est pas le monde ; c’est une représentation choisie du monde."
      }
    ],
    "deeper": [],
    "takeaways": [
      {
        "label": "Projection",
        "text": "Passer de la sphère au plan impose toujours des déformations."
      },
      {
        "label": "Usage",
        "text": "Mercator est excellent pour certains usages de navigation."
      },
      {
        "label": "Esprit critique",
        "text": "Une carte doit toujours être lue comme un choix de représentation."
      }
    ],
    "quiz": [
      {
        "kind": "définition",
        "q": "Pourquoi une projection cartographique est-elle nécessaire ?",
        "a": "Parce qu’il faut représenter une surface courbe sur une surface plane.",
        "why": "C’est le problème de base de toute carte du monde.",
        "trap": "Croire qu’une carte peut tout conserver parfaitement.",
        "evidence": "Bloc 1."
      },
      {
        "kind": "repère",
        "q": "À quel usage la projection de Mercator est-elle particulièrement utile ?",
        "a": "À la navigation maritime.",
        "why": "Elle conserve les angles, ce qui aide les marins.",
        "trap": "Dire qu’elle sert d’abord à comparer les surfaces réelles.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "limite",
        "q": "Quelle grande déformation produit Mercator ?",
        "a": "Elle agrandit fortement les régions proches des pôles.",
        "why": "C’est le défaut principal présenté dans le cours.",
        "trap": "Dire qu’elle réduit le Groenland.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "compréhension",
        "q": "Pourquoi cette déformation peut-elle influencer notre vision du monde ?",
        "a": "Parce qu’un territoire qui paraît plus grand peut sembler plus important.",
        "why": "Le cours relie carte et imagination géographique.",
        "trap": "Croire que la taille visuelle n’a aucun effet.",
        "evidence": "Bloc 3."
      },
      {
        "kind": "synthèse",
        "q": "Quelle question faut-il poser devant une carte ?",
        "a": "À quoi sert cette carte et quels choix de représentation fait-elle ?",
        "why": "C’est la conclusion méthodologique du cours.",
        "trap": "Prendre toute carte comme une copie neutre du monde.",
        "evidence": "Bloc 5."
      }
    ]
  },
  "music-jazz-birth": {
    "hook": "Le jazz naît dans un monde de métissages, de violences sociales, de fêtes, de clubs, de fanfares, de blues et de spirituals. Son histoire n’est pas seulement celle d’un style : c’est une révolution de la manière de jouer, d’écouter et d’improviser.",
    "keyFacts": [
      "Contexte : États-Unis, héritages afro-américains, Nouvelle-Orléans, début du XXe siècle",
      "Éléments : blues, ragtime, swing, improvisation, timbres, rythmes syncopés",
      "Diffusion : clubs, disques, radio, orchestres, tournées",
      "Piège : réduire le jazz à une musique de fond calme"
    ],
    "express": [
      "Le jazz apparaît aux États-Unis au tournant du XXe siècle, dans un contexte afro-américain marqué par le blues, les chants religieux, les fanfares, les rythmes syncopés et les musiques de danse. La Nouvelle-Orléans occupe une place importante dans ce récit, même si l’histoire du jazz est plus large.",
      "Sa grande nouveauté est l’importance donnée à l’improvisation, au swing, au timbre et à l’interaction entre musiciens. Une mélodie peut servir de point de départ, puis chaque instrument transforme, répond, relance et invente dans le moment.",
      "À retenir : le jazz n’est pas une musique figée. C’est une tradition de transformation permanente. Il influence ensuite le blues moderne, le rock, la soul, le funk, le rap et une grande partie des musiques populaires du XXe siècle."
    ],
    "complete": [
      {
        "title": "1. Des racines afro-américaines",
        "text": "Le jazz naît dans l’histoire afro-américaine des États-Unis. Il hérite de chants de travail, de spirituals, du blues, de fanfares, de musiques de danse et de traditions rythmiques africaines transformées par l’histoire de l’esclavage, de la ségrégation et des villes américaines.\n\nIl faut éviter l’image d’une invention soudaine par un seul musicien. Le jazz apparaît par croisements : instruments européens, rythmes syncopés, mémoire du blues, culture des rues, fêtes, clubs et communautés. La Nouvelle-Orléans est souvent présentée comme un lieu majeur parce qu’elle concentre fanfares, brass bands, danse et circulation musicale."
      },
      {
        "title": "2. Improviser sans jouer au hasard",
        "text": "L’improvisation est l’un des grands marqueurs du jazz, mais improviser ne signifie pas jouer n’importe quoi. Les musiciens s’appuient sur une grille, une mélodie, un rythme, une mémoire du style et une écoute très fine des autres. L’invention se fait dans un cadre.\n\nC’est ce qui rend cette musique vivante : une même pièce peut changer d’un concert à l’autre. Le soliste propose une phrase, la rythmique répond, un autre instrument relance. Le morceau devient une conversation organisée autant qu’une composition."
      },
      {
        "title": "3. Swing, timbre et corps",
        "text": "Le jazz transforme aussi la sensation du rythme. Le swing donne une pulsation souple, difficile à réduire à une simple écriture sur partition. Le corps compte : on danse, on marque le tempo, on ressent un balancement.\n\nLe timbre est tout aussi important. Une trompette, un saxophone ou une voix ne cherchent pas seulement une note “pure”. Ils peuvent plier le son, le salir, le faire crier, sourire ou pleurer. Dans le jazz, la personnalité sonore devient presque une signature."
      },
      {
        "title": "4. Disques, clubs et diffusion mondiale",
        "text": "Au XXe siècle, le jazz se diffuse grâce aux clubs, aux orchestres, aux tournées, aux disques et à la radio. Des figures comme Louis Armstrong, Duke Ellington, Billie Holiday, Charlie Parker ou Miles Davis montrent que le jazz change sans cesse : New Orleans, swing, bebop, cool, hard bop, free jazz, fusion.\n\nChaque période invente une nouvelle manière de jouer. Le jazz devient donc une histoire de styles successifs, mais aussi une méthode : reprendre un matériau, le transformer, y inscrire une voix personnelle."
      },
      {
        "title": "5. Ce qu’il faut retenir",
        "text": "Le jazz est une révolution musicale parce qu’il place l’improvisation, le rythme, le timbre et l’interaction au centre. Il naît d’une histoire sociale précise, mais devient rapidement une langue mondiale.\n\nLa grande idée à garder : le jazz n’est pas une musique de fond élégante. C’est une musique d’invention, de tension et de liberté contrôlée, qui a profondément influencé la musique du XXe siècle."
      }
    ],
    "deeper": [],
    "takeaways": [
      {
        "label": "Racines",
        "text": "Le jazz naît d’héritages afro-américains et de croisements culturels."
      },
      {
        "label": "Improvisation",
        "text": "Inventer dans le moment ne veut pas dire jouer au hasard."
      },
      {
        "label": "Influence",
        "text": "Le jazz transforme durablement les musiques populaires du XXe siècle."
      }
    ],
    "quiz": [
      {
        "kind": "repère",
        "q": "Dans quel pays le jazz apparaît-il ?",
        "a": "Aux États-Unis.",
        "why": "Le cours situe sa naissance dans un contexte afro-américain américain.",
        "trap": "Le présenter comme une invention française médiévale.",
        "evidence": "Express."
      },
      {
        "kind": "contexte",
        "q": "Quelle ville est souvent associée aux débuts du jazz ?",
        "a": "La Nouvelle-Orléans.",
        "why": "Le cours la présente comme un lieu majeur de brassage musical.",
        "trap": "Dire que toute l’histoire du jazz se limite à cette ville.",
        "evidence": "Bloc 1."
      },
      {
        "kind": "notion",
        "q": "Pourquoi l’improvisation n’est-elle pas du hasard ?",
        "a": "Parce qu’elle s’appuie sur un cadre, une écoute, une grille, une mélodie et une mémoire du style.",
        "why": "Le cours insiste sur la liberté contrôlée.",
        "trap": "Croire que les musiciens jouent sans règles.",
        "evidence": "Bloc 2."
      },
      {
        "kind": "style",
        "q": "Quels éléments sont centraux dans le jazz ?",
        "a": "L’improvisation, le swing, le timbre, le rythme et l’interaction entre musiciens.",
        "why": "Ce sont les marqueurs récurrents du cours.",
        "trap": "Réduire le jazz à une musique calme de restaurant.",
        "evidence": "Express et bloc 3."
      },
      {
        "kind": "synthèse",
        "q": "Pourquoi le jazz influence-t-il autant le XXe siècle musical ?",
        "a": "Parce qu’il invente une manière de transformer les matériaux, d’improviser et de faire entendre une voix personnelle.",
        "why": "C’est la conclusion du cours.",
        "trap": "Le voir comme un style figé.",
        "evidence": "Bloc 5."
      }
    ]
  }
};
const BETA109_MODE_MYSTERIES = [
  {
    "id": "art-mystery-impressionism-mode",
    "discipline": "art",
    "difficulty": "facile",
    "title": "Des touches visibles et une lumière qui change",
    "caseTitle": "Mouvement artistique à identifier",
    "prompt": "Ces peintres français du XIXe siècle choquent d’abord parce que leurs tableaux semblent inachevés. Ils veulent saisir les effets de lumière, les loisirs modernes et la sensation d’un instant.",
    "answer": "L’impressionnisme",
    "aliases": [
      "impressionnisme",
      "l impressionnisme",
      "l’impressionnisme",
      "impressionnistes"
    ],
    "clues": [
      "Monet, Renoir, Degas ou Pissarro y sont associés.",
      "Touches visibles, couleurs claires, ombres colorées.",
      "Le nom vient d’abord d’une moquerie autour d’Impression, soleil levant."
    ],
    "explanation": "L’impressionnisme marque une rupture vers l’art moderne : peindre la perception, la lumière et l’instant plutôt qu’un sujet parfaitement lissé.",
    "blockedGuesses": [
      "monet",
      "peinture",
      "lumiere",
      "renoir"
    ]
  },
  {
    "id": "cinema-mystery-hollywood-studios",
    "discipline": "cinema",
    "difficulty": "moyen",
    "title": "La grande machine à rêves des studios",
    "caseTitle": "Période du cinéma à identifier",
    "prompt": "Entre les années 1930 et 1950, grands studios, stars sous contrat, genres codifiés et récits très lisibles structurent une industrie du film devenue mondiale.",
    "answer": "Hollywood classique",
    "aliases": [
      "hollywood classique",
      "age classique hollywoodien",
      "âge classique hollywoodien",
      "cinema classique hollywoodien",
      "cinéma classique hollywoodien"
    ],
    "clues": [
      "Studios, stars, westerns, comédies musicales et films noirs.",
      "Un cinéma très industriel, mais aussi très efficace narrativement.",
      "Beaucoup de blockbusters actuels héritent encore de ses règles."
    ],
    "explanation": "Hollywood classique construit une grammaire populaire du cinéma : genres, stars, montage fluide, récits lisibles et production industrielle.",
    "blockedGuesses": [
      "hollywood",
      "studio",
      "western",
      "star"
    ]
  },
  {
    "id": "science-mystery-pasteur-microbes",
    "discipline": "science-inventions",
    "difficulty": "facile",
    "title": "L’invisible qui change la médecine",
    "caseTitle": "Savant à identifier",
    "prompt": "Ses travaux sur les fermentations, les microbes, la pasteurisation et certains vaccins incarnent la révolution microbienne du XIXe siècle.",
    "answer": "Louis Pasteur",
    "aliases": [
      "pasteur",
      "louis pasteur"
    ],
    "clues": [
      "Figure française du XIXe siècle.",
      "Son nom est associé à un procédé de chauffage de liquides pour limiter certains micro-organismes.",
      "Il est aussi lié à l’histoire des vaccins et de la rage."
    ],
    "explanation": "Pasteur représente la révolution microbienne : comprendre, contrôler et prévenir l’action des micro-organismes dans la médecine et la vie quotidienne.",
    "blockedGuesses": [
      "microbe",
      "vaccin",
      "rage",
      "pasteurisation"
    ]
  },
  {
    "id": "music-mystery-jazz-birth-109",
    "discipline": "music",
    "difficulty": "facile",
    "title": "Improviser sans jouer au hasard",
    "caseTitle": "Genre musical à identifier",
    "prompt": "Né aux États-Unis au tournant du XXe siècle, il mêle blues, swing, timbres expressifs, clubs et improvisation dans un cadre partagé.",
    "answer": "Le jazz",
    "aliases": [
      "jazz",
      "le jazz"
    ],
    "clues": [
      "Nouvelle-Orléans est souvent associée à ses débuts.",
      "Louis Armstrong et Duke Ellington sont des figures majeures.",
      "L’improvisation, le swing et l’interaction y sont essentiels."
    ],
    "explanation": "Le jazz est une révolution musicale afro-américaine qui place l’invention dans le moment, le rythme et la personnalité sonore au centre.",
    "blockedGuesses": [
      "blues",
      "swing",
      "improvisation",
      "nouvelle orleans"
    ]
  }
];
(function registerBeta109Content() {
  Object.entries(BETA109_LESSONS).forEach(([worldId, items]) => {
    if (!Array.isArray(data.lessons[worldId])) data.lessons[worldId] = [];
    const known = new Set(data.lessons[worldId].map(item => item.id));
    items.forEach(item => { if (!known.has(item.id)) data.lessons[worldId].push(item); });
  });
  ["art-impressionism-modern-life", "cinema-hollywood-studio-system", "sci-pasteur-microbes-vaccines", "eco-inflation-money-value", "geo-mercator-projection", "music-jazz-birth"].forEach(id => PUBLISHED_LESSON_IDS.add(id));
  Object.assign(READY_LESSON_PACKS, BETA109_READY_PACKS);
  if (!Array.isArray(data.mysteries)) data.mysteries = [];
  const knownMysteries = new Set(data.mysteries.map(item => item.id));
  BETA109_MODE_MYSTERIES.forEach(item => { if (!knownMysteries.has(item.id)) data.mysteries.push({ ...item, modeMystery: true, beta109: true, manualCluesB97: true, cluesCleaned: true }); });
})();

function allDisciplineWorlds() {
  const planned = Object.values(PLANNED_DISCIPLINE_WORLDS || {}).flat();
  const map = new Map();
  [...(data.worlds || []), ...planned].forEach(world => { if (world?.id && !map.has(world.id)) map.set(world.id, world); });
  return Array.from(map.values());
}
function activeWorld() {
  return allDisciplineWorlds().find(w => w.id === state.currentWorld) || data.worlds[0] || allDisciplineWorlds()[0] || {};
}
function curatedWorlds() {
  const ids = new Set(curatedLessons().map(lesson => lessonWorldId(lesson.id)));
  return allDisciplineWorlds().filter(world => ids.has(world.id));
}
function visibleWorlds(limit = 20) {
  const worlds = curatedWorlds();
  return (worlds.length ? worlds : allDisciplineWorlds()).slice(0, limit);
}
function lessonWorld(lesson = {}) {
  const id = lessonWorldId(lesson.id);
  return allDisciplineWorlds().find(world => world.id === id) || activeWorld() || {};
}
function lessonDisciplineId(lesson = {}) {
  return worldDisciplineId(lessonWorld(lesson));
}
function publicMysteryIds() {
  return new Set((data.mysteries || []).map(mystery => mystery.id));
}
function readyLessonsForDiscipline(disciplineId = activeDisciplineId()) {
  return lessonsForDiscipline(disciplineId)
    .filter(isCuratedLesson)
    .sort((a, b) => (a.order || 999) - (b.order || 999) || String(a.id).localeCompare(String(b.id)));
}
function pickModeLesson(disciplineId = activeDisciplineId()) {
  const lessons = readyLessonsForDiscipline(disciplineId);
  if (!lessons.length) return null;
  const current = lessons.find(item => item.id === state.currentLessonId && !lessonDone(item.id));
  if (current) return current;
  return lessons.find(item => !lessonDone(item.id) && !lessonLockedByDailyMystery(item)) || lessons.find(item => !lessonDone(item.id)) || lessons[0];
}
function modeContinueMarkup(disciplineId = activeDisciplineId()) {
  if (disciplineId === "history") return homeContinueMarkup();
  const discipline = disciplineById(disciplineId);
  const lessons = readyLessonsForDiscipline(discipline.id);
  if (!lessons.length) {
    const { groups, worlds } = disciplineHomeStats(disciplineId);
    const first = worlds[0] || null;
    const group = first ? (groups.find(item => item.id === first.group) || groups[0]) : groups[0];
    return `<section class="card home-main-card home-continue-card mode-continue-card" style="--discipline-accent:${escapeHtml(discipline.accent)}">
      <div class="section-title-row"><div><span class="card-label">▶️ Continuer en ${escapeHtml(discipline.title)}</span><h2>${first ? `${first.emoji || discipline.emoji} ${escapeHtml(first.title)}` : "Parcours prêt"}</h2></div><small>${groups.length} chapitres</small></div>
      <p>${escapeHtml(first?.subtitle || group?.description || discipline.description)} Le thème est posé : on ajoutera ensuite un vrai cours express, complet et quiz.</p>
      <div class="mode-progress-line"><i style="width:${Math.max(4, disciplineProgress(discipline.id).progress)}%"></i></div>
      <div class="home-card-footer"><span>${escapeHtml(group?.title || "Grand chapitre")}</span><button type="button" data-open-mode-learn="${escapeHtml(discipline.id)}">Voir les chapitres</button></div>
    </section>`;
  }
  const lesson = pickModeLesson(discipline.id);
  const content = buildLessonContent(lesson);
  const done = lessons.filter(item => lessonDone(item.id)).length;
  const ratio = percent(done, lessons.length);
  const progress = quizProgressForLesson(lesson.id, normalizeQuizPack(content.quiz, lesson, content).length);
  const action = progress.answeredCount && !progress.passed ? `Reprendre le quiz (${progress.answeredCount}/${progress.total})` : (lessonDone(lesson.id) ? "Revoir" : "Commencer");
  const view = progress.answeredCount && !progress.passed ? "quiz" : "express";
  return `<section class="card home-main-card home-continue-card mode-continue-card mode-course-card" style="--discipline-accent:${escapeHtml(discipline.accent)}">
    <div class="section-title-row"><div><span class="card-label">▶️ Continuer en ${escapeHtml(discipline.title)}</span><h2>${lesson.emoji || discipline.emoji} ${escapeHtml(content.title || lesson.title)}</h2></div><small>${ratio}%</small></div>
    <p>${escapeHtml(short(content.hook || content.express?.[0] || discipline.description, 190))}</p>
    <div class="mode-progress-line"><i style="width:${Math.max(5, ratio)}%"></i></div>
    <div class="home-card-footer"><span>${done}/${lessons.length} cours validés</span><button type="button" data-home-continue="${escapeHtml(lesson.id)}" data-home-continue-view="${escapeHtml(view)}">${escapeHtml(action)}</button></div>
  </section>`;
}
function rotatedModeLessons(disciplineId = activeDisciplineId(), max = 3) {
  const lessons = readyLessonsForDiscipline(disciplineId);
  if (!lessons.length) return [];
  const start = (Number(state.discoverOffset) || 0) % lessons.length;
  return lessons.slice(start).concat(lessons.slice(0, start)).slice(0, max);
}
function modeRecommendationsMarkup(disciplineId = activeDisciplineId()) {
  if (disciplineId === "history") return homeDiscoveryMarkup(homeDiscoveryLessons());
  const discipline = disciplineById(disciplineId);
  const mode = disciplineModeCopy(discipline.id);
  const lessons = rotatedModeLessons(discipline.id, 3);
  if (lessons.length) {
    return `<section class="card home-main-card home-discovery-card mode-recommend-card mode-course-recommend-card" style="--discipline-accent:${escapeHtml(discipline.accent)}">
      <div class="section-title-row"><div><span class="card-label">📚 ${escapeHtml(mode.shortLabel)} · cours proposés</span><h2>Peu de cours, mais vraiment écrits</h2></div><small>${lessons.length} cours prêt${lessons.length > 1 ? "s" : ""}</small></div>
      <p>On ajoute progressivement des cours complets : express court, vrai texte de lecture et quiz directement tiré du contenu.</p>
      <div class="home-discovery-grid">
        ${lessons.map((lesson, index) => {
          const world = lessonWorld(lesson);
          const content = buildLessonContent(lesson);
          const done = lessonDone(lesson.id);
          return `<article class="home-discovery-item ${done ? "done" : ""} mode-lesson-item" data-home-discovery="${escapeHtml(lesson.id)}" tabindex="0" role="button">
            <span class="home-discovery-kicker">${escapeHtml(world.title || discipline.title)} · cours ${index + 1}</span>
            <h3>${lesson.emoji || discipline.emoji} ${escapeHtml(content.title || lesson.title)}</h3>
            <p>${escapeHtml(short(content.hook || content.express?.[0] || "Un vrai cours à lire avant le quiz.", 165))}</p>
            <small>⚡ express · 📚 complet · ✅ quiz</small>
            <button type="button" data-home-discovery-open="${escapeHtml(lesson.id)}">${done ? "Revoir" : "Commencer"}</button>
          </article>`;
        }).join("")}
      </div>
      <div class="home-card-footer"><span>Le reste du domaine reste structuré en chapitres.</span><button class="ghost" type="button" data-open-mode-learn="${escapeHtml(discipline.id)}">Voir tout le parcours</button></div>
    </section>`;
  }
  const groups = treeGroups(discipline.id);
  const items = modeRecommendationItems(discipline.id);
  return `<section class="card home-main-card home-discovery-card mode-recommend-card" style="--discipline-accent:${escapeHtml(discipline.accent)}">
    <div class="section-title-row"><div><span class="card-label">📚 ${escapeHtml(mode.shortLabel)} · pistes</span><h2>${escapeHtml(mode.discoveryTitle)}</h2></div><small>${items.length} pistes</small></div>
    <p>${escapeHtml(mode.discoveryIntro)}</p>
    <div class="home-discovery-grid">
      ${items.map((world, index) => {
        const group = groups.find(item => item.id === world.group) || {};
        return `<article class="home-discovery-item mode-world-item" data-mode-world="${escapeHtml(world.id)}" tabindex="0" role="button">
          <span class="home-discovery-kicker">${escapeHtml(String(group.title || "Chapitre").replace(/^\d+\.\s*/, ""))} · piste ${index + 1}</span>
          <h3>${world.emoji || discipline.emoji} ${escapeHtml(world.title)}</h3>
          <p>${escapeHtml(world.subtitle || group.description || discipline.description)}</p>
          <small>${escapeHtml(world.timeframe || group.range || "parcours")}</small>
          <button type="button" data-open-mode-world="${escapeHtml(world.id)}">Ouvrir</button>
        </article>`;
      }).join("")}
    </div>
    <div class="home-card-footer"><span>On garde des contenus propres : structure d’abord, vrais cours ensuite.</span><button class="ghost" type="button" data-open-mode-learn="${escapeHtml(discipline.id)}">Voir tout le parcours</button></div>
  </section>`;
}


/* =========================================================
   Beta 113 — animations intelligentes sans lag
   - Le mode "light" historique devient "smart" : fluide mais vivant.
   - Les gros effets coûteux restent coupés sur mobile.
   - Les rendus successifs sont regroupés sur une frame.
   ========================================================= */
let beta113PendingScreenMotion = true;
let beta113RenderFrame = 0;
function beta113ReducedMotion() {
  try { return Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
  catch { return false; }
}
function performanceMode() {
  if (state.performanceMode === "balanced") return "balanced";
  if (state.performanceMode === "static") return "static";
  return "smart";
}
function applyPerformanceMode() {
  if (typeof document === "undefined") return;
  const mode = performanceMode();
  document.body.classList.toggle("performance-light", false);
  document.body.classList.toggle("performance-smart", mode === "smart");
  document.body.classList.toggle("performance-static", mode === "static");
  document.body.classList.toggle("performance-balanced", mode === "balanced");
  document.body.dataset.performanceMode = mode;
}
function setPerformanceMode(mode) {
  const next = mode === "balanced" ? "balanced" : (mode === "static" ? "static" : "smart");
  setState({ performanceMode: next });
}
function performanceSettingsMarkup() {
  const mode = performanceMode();
  const copy = {
    smart: {
      label: "Fluide animé",
      text: "Recommandé : petites transitions transform/opacity, pas de gros flous, rendu cadencé pour garder l’app nerveuse sur mobile."
    },
    static: {
      label: "Statique",
      text: "Zéro animation décorative. À utiliser si un téléphone ancien rame encore ou si tu veux tester la stabilité brute."
    },
    balanced: {
      label: "Visuel",
      text: "Plus joli, mais plus lourd : à garder seulement si les onglets restent parfaitement fluides."
    }
  }[mode] || { label: "Fluide animé", text: "Mode recommandé." };
  return `<section class="card performance-card"><div><span class="card-label">Performance mobile</span><h2>${escapeHtml(copy.label)}</h2><p>${escapeHtml(copy.text)}</p></div><div class="performance-actions three"><button data-performance-mode="smart" class="${mode === "smart" ? "active" : ""}">⚡ Animé</button><button data-performance-mode="static" class="${mode === "static" ? "active" : ""}">🧊 Statique</button><button data-performance-mode="balanced" class="${mode === "balanced" ? "active" : ""}">✨ Visuel</button></div></section>`;
}
function beta113ScreenChanged(previous, next, patch = {}) {
  if (!previous || !next) return true;
  return previous.tab !== next.tab || previous.currentDiscipline !== next.currentDiscipline || previous.currentWorld !== next.currentWorld || previous.currentGroup !== next.currentGroup || Boolean(patch.currentLessonId && patch.currentLessonId !== previous.currentLessonId) || Boolean(patch.currentMysteryId && patch.currentMysteryId !== previous.currentMysteryId);
}
function beta113MarkMotion(previous, next, patch) {
  if (performanceMode() === "static" || beta113ReducedMotion()) return;
  if (beta113ScreenChanged(previous, next, patch)) beta113PendingScreenMotion = true;
}
function beta113ConsumeMotionClass() {
  if (performanceMode() === "static" || beta113ReducedMotion()) {
    beta113PendingScreenMotion = false;
    return "";
  }
  if (!beta113PendingScreenMotion) return "";
  beta113PendingScreenMotion = false;
  return "motion-enter";
}
function setState(patch, options = {}) {
  if (!patch || typeof patch !== "object") return;
  const previous = state;
  state = { ...state, ...patch };
  beta113MarkMotion(previous, state, patch);
  if (options.save !== false && patchNeedsPersistentSave(patch)) queueSaveState();
  render();
}
function renderShell(content) {
  applyPerformanceMode();
  applyDisciplineTheme();
  const immersiveLesson = state.tab === "lesson";
  const motionClass = beta113ConsumeMotionClass();
  const navMarkup = immersiveLesson ? "" : `<nav class="bottom-nav" aria-label="Navigation principale">
        ${navButton("home", "⌂", "Accueil")}
        ${navButton("learn", "📖", "Cours")}
        ${navButton("mystery", "🕵️", "Mystère")}
        ${navButton("rank", "🏆", "Classement")}
        ${navButton("profile", "👤", "Profil")}
      </nav>`;
  app.innerHTML = `
    <main class="app-shell tab-${state.tab} discipline-${activeDisciplineId()} ${motionClass} ${immersiveLesson ? "course-fullscreen-shell" : ""}">
      ${systemStatusMarkup()}
      ${content}
      ${navMarkup}
    </main>`;
  app.querySelectorAll("[data-tab]").forEach(btn => btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;
    if (!tab || tab === state.tab) return;
    const patch = { tab };
    if (tab === "mystery") patch.currentMysteryId = dailyMystery()?.id || null;
    setState(patch, { save: false });
  }));
  activateTextControls(app);
}
const beta113DirectRender = render;
render = function beta113ScheduledRender(options = {}) {
  if (options && options.immediate) return beta113DirectRender();
  if (typeof requestAnimationFrame !== "function") return beta113DirectRender();
  if (beta113RenderFrame) return;
  beta113RenderFrame = requestAnimationFrame(() => {
    beta113RenderFrame = 0;
    beta113DirectRender();
  });
};

applyVisibleStateGuard({ save: false });
window.addEventListener("DOMContentLoaded", render);
