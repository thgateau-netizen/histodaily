/* HistoDaily RC40 — global discipline difficulty ramp metadata and starter content. */
(function histodailyRc40DifficultyContent(){
  "use strict";
  const VERSION = "1.0.0-rc.40.0";

  const starterMysteries = {
    history: [
      "history-mystery-industrial-revolution-236", "history-mystery-cold-war-236",
      "mystery-1789-rc39", "mystery-napoleon", "mystery-pyramids", "mystery-athens"
    ],
    art: [
      "art-mystery-linear-perspective-235", "art-mystery-composition-122", "art-mystery-cubism-177",
      "art-mystery-chiaroscuro-236", "art-mystery-daguerreotype-233", "art-mystery-automatic-writing-237"
    ],
    cinema: [
      "cinema-mystery-documentary-233", "cinema-mystery-stop-motion-234", "cinema-mystery-offscreen-sound-237",
      "cinema-mystery-cadrage-122", "cinema-mystery-montage-177", "cinema-mystery-kuleshov-235"
    ],
    "science-inventions": [
      "science-mystery-hypothesis-122", "science-mystery-experimental-proof-121",
      "science-mystery-double-helix-233", "science-mystery-immune-memory-235",
      "science-mystery-universal-gravity-236", "science-mystery-atomic-number-237"
    ],
    astronomy: [
      "astro-mystery-aurora-186", "astro-mystery-orbit-186", "astronomy-mystery-transit-method-235",
      "astronomy-mystery-synchronous-rotation-236", "astronomy-mystery-apollo11-236", "astronomy-mystery-solstice-237"
    ],
    economy: [
      "economy-mystery-inflation-235", "economy-mystery-gdp-236", "economy-mystery-scarcity-122",
      "economy-mystery-supply-demand-121", "economy-mystery-opportunity-cost-175", "economy-mystery-inflation-mode"
    ],
    geography: [
      "geography-mystery-map-scale-121", "geography-mystery-coordinates-122", "geography-mystery-map-projection-175",
      "geography-mystery-climate-risk-236", "geography-mystery-food-security-234", "geography-mystery-metropolization-235"
    ],
    music: [
      "music-mystery-riff-236", "music-mystery-midi-237", "music-mystery-sampling-177",
      "music-mystery-multitrack-233", "music-mystery-gregorian-chant-122", "music-mystery-swing-235"
    ],
    literature: [
      "literature-mystery-windmills-232", "literature-mystery-science-fiction-236", "literature-mystery-encyclopedia-237",
      "literature-mystery-press-232", "literature-mystery-newspeak-232", "literature-mystery-chorus-232"
    ],
    english: [
      "english-mystery-actually-318", "english-mystery-eventually-318", "english-mystery-afraid-318",
      "english-mystery-yet-318", "english-mystery-sensible-rc19", "english-mystery-one-reference-rc19"
    ],
    philosophy: [
      "philo-mystery-strawman-318", "philo-mystery-control-318", "philo-mystery-validity-rc19",
      "philo-mystery-assent-rc19", "philo-mystery-counterexample-rc19", "philo-mystery-necessary-rc19"
    ]
  };

  const starterLessons = {
    history: ["prehistory-hominids", "prehistory-habilis"],
    art: ["art-read-image-basics", "art-renaissance-perspective"],
    cinema: ["cinema-shot-frame-basics", "cinema-montage-meaning"],
    "science-inventions": ["sci-method-proof-basics", "sci-galileo-revolution"],
    astronomy: ["astro-moon-phases-eclipses-tides", "astro-seasons-tilt-solstice-equinox"],
    economy: ["eco-supply-demand-basics", "eco-gdp-growth-limits"],
    geography: ["geo-maps-scale-basics", "geo-mercator-projection"],
    music: ["music-gregorian-polyphony", "music-baroque-opera"],
    literature: ["lit-epic-oral-traditions", "lit-greek-tragedy"],
    philosophy: ["philo-argument-thesis-objection", "philo-argument-validity"],
    english: ["eng-context-inference", "eng-context-reference"]
  };

  const starterLookup = new Map();
  Object.entries(starterMysteries).forEach(([disciplineId, ids]) => ids.forEach(id => starterLookup.set(id, disciplineId)));
  (data.mysteries || []).forEach(mystery => {
    const disciplineId = starterLookup.get(mystery?.id);
    if (!disciplineId) return;
    if (!mystery.difficultyBeforeRC40) mystery.difficultyBeforeRC40 = mystery.difficulty || "moyen";
    mystery.difficulty = "facile";
    mystery.difficultyRampRC40 = "discovery";
    mystery.starterDisciplineRC40 = disciplineId;
  });

  Object.entries(starterLessons).forEach(([disciplineId, ids]) => ids.forEach((id, index) => {
    const pack = typeof READY_LESSON_PACKS !== "undefined" ? READY_LESSON_PACKS[id] : null;
    if (!pack) return;
    pack.learningRampRC40 = {
      stage: "discovery",
      order: index + 1,
      disciplineId,
      principle: "comprendre avant de complexifier"
    };
  }));

  const config = Object.freeze({
    version: VERSION,
    starterMysteries: Object.freeze(Object.fromEntries(Object.entries(starterMysteries).map(([id, ids]) => [id, Object.freeze([...ids])]))),
    starterLessons: Object.freeze(Object.fromEntries(Object.entries(starterLessons).map(([id, ids]) => [id, Object.freeze([...ids])]))),
    thresholds: Object.freeze({ discoveryPoints: 8, confidencePoints: 20, intermediatePoints: 38 }),
    principles: Object.freeze(["foundations-first", "guided-first", "discipline-specific", "no-expert-at-start", "difficulty-earned"])
  });
  window.HD_GLOBAL_RAMP_RC40 = config;
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, globalDifficultyRampRC40: true }; } catch {}
})();
