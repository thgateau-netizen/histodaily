/* HistoDaily LTS — configuration, onboarding, icônes et illustrations */

/* ===== app-core.js ===== */

window.HISTODAILY_CORE = {
  version: "1.0.0-beta.265.0",
  assetsVersion: "1.0.0-beta.265.0",
  storageKey: "histodaily_state",
  legacyStorageKeys: ["histodaily_v100_state", "histodaily_v100_state_backup", "histodaily_state_backup", "histodaily_beta_state", "histodaily_save"],
  scoring: {
    base: { facile: 95, moyen: 120, difficile: 150, expert: 180 },
    floor: { facile: 35, moyen: 45, difficile: 55, expert: 70 },
    penalties: { hint: 20, extraTry: 10 }
  },
  archive: { daysVisible: 7, unlockCost: 2 },
  daily: { baseGems: 1, streakBonusEvery: 7, streakBonusGems: 3 },
  ranking: {
    demoNames: [],
    friendNames: []
  },
  ui: {
    versionLabel: "beta 265",
    shareBaseUrl: "https://histodaily.vercel.app",
    releaseNotes: [
      "Expédition du jour reconstruite comme un vrai parcours : observation, déduction et révélation.",
      "Le score potentiel, le chrono, les indices choisis et les essais restent visibles pendant toute la résolution.",
      "La révélation affiche désormais score, temps, précision et rang du jour avant de poursuivre vers le cours lié."
    ]
  },
  clamp(value, min, max) { return Math.min(max, Math.max(min, value)); },
  storage: {
    safeRead(primaryKey, backupKey) {
      try {
        const keys = [
          primaryKey,
          `${primaryKey}_snapshot`,
          backupKey,
          `${primaryKey}_tmp`,
          ...(window.HISTODAILY_CORE?.legacyStorageKeys || [])
        ].filter(Boolean);
        const candidates = [];
        for (const key of [...new Set(keys)]) {
          const value = localStorage.getItem(key);
          if (!value) continue;
          try {
            const parsed = JSON.parse(value);
            if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) continue;
            const revision = Number(parsed._hdRevision || 0);
            const savedAt = Number(parsed._hdSavedAt || 0);
            const richness = Object.keys(parsed.completedLessons || {}).length
              + Object.keys(parsed.solvedMysteries || {}).length
              + Object.keys(parsed.quizProgress || {}).length;
            candidates.push({ key, value, revision, savedAt, richness, priority: key === primaryKey ? 4 : key.endsWith("_snapshot") ? 3 : key === backupKey ? 2 : 1 });
          } catch {}
        }
        candidates.sort((a, b) => b.revision - a.revision || b.savedAt - a.savedAt || b.richness - a.richness || b.priority - a.priority);
        return candidates[0]?.value || null;
      } catch {}
      return null;
    },
    safeWrite(primaryKey, backupKey, value) {
      try {
        const parsed = JSON.parse(value);
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return false;
        const previousValues = [primaryKey, `${primaryKey}_snapshot`, backupKey]
          .map(key => {
            try { return JSON.parse(localStorage.getItem(key) || "null"); } catch { return null; }
          })
          .filter(item => item && typeof item === "object" && !Array.isArray(item));
        const nextRevision = Math.max(0, ...previousValues.map(item => Number(item._hdRevision || 0))) + 1;
        parsed._hdRevision = nextRevision;
        parsed._hdSavedAt = Date.now();
        const serialized = JSON.stringify(parsed);
        const tempKey = `${primaryKey}_tmp`;
        const snapshotKey = `${primaryKey}_snapshot`;
        localStorage.setItem(tempKey, serialized);
        JSON.parse(localStorage.getItem(tempKey) || "null");
        const previousPrimary = localStorage.getItem(primaryKey);
        if (previousPrimary) {
          try { JSON.parse(previousPrimary); localStorage.setItem(backupKey, previousPrimary); } catch {}
        }
        localStorage.setItem(primaryKey, serialized);
        localStorage.setItem(snapshotKey, serialized);
        localStorage.removeItem(tempKey);
        localStorage.setItem(`${primaryKey}_last_ok`, String(parsed._hdSavedAt));
        return true;
      } catch {
        try {
          localStorage.setItem(primaryKey, value);
          localStorage.setItem(backupKey, value);
          localStorage.setItem(`${primaryKey}_last_ok`, String(Date.now()));
          return true;
        } catch { return false; }
      }
    }
  },
  date: {
    dayMs: 86400000,
    startOfLocalDay(ts = Date.now()) {
      const d = new Date(ts);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    },
    localDayKey(ts = Date.now()) {
      const d = new Date(ts);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    },
    dayKeyToTime(key) {
      if (!key || typeof key !== "string") return 0;
      const [year, month, day] = key.split("-").map(Number);
      return new Date(year || 1970, (month || 1) - 1, day || 1).getTime();
    },
    weekStart(ts = Date.now()) {
      const todayStart = this.startOfLocalDay(ts);
      const d = new Date(todayStart);
      const day = d.getDay() || 7;
      d.setDate(d.getDate() - day + 1);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    }
  },
  scoreBreakdown({ difficulty = "moyen", hints = 0, tries = 0 } = {}) {
    const base = this.scoring.base[difficulty] || this.scoring.base.moyen;
    const floor = this.scoring.floor[difficulty] || this.scoring.floor.moyen;
    const hintPenalty = Math.max(0, hints) * this.scoring.penalties.hint;
    const extraTries = Math.max(0, tries - 1);
    const tryPenalty = extraTries * this.scoring.penalties.extraTry;
    const raw = base - hintPenalty - tryPenalty;
    return { difficulty, base, floor, hints, extraTries, hintPenalty, tryPenalty, score: Math.max(floor, raw), raw };
  },
  demoScoreCap(scope = "daily") {
    if (scope === "daily") return this.scoring.base.expert;
    if (scope === "week" || scope === "friends") return this.scoring.base.expert * 7;
    return this.scoring.base.expert * 365;
  }
};


/* ===== app-onboarding.js ===== */

window.HISTODAILY_ONBOARDING = {
  version: "1.0.0-beta.265.0",
  sessionTip({ state = {}, data = {}, readyIds = [], counts = {} } = {}) {
    const solved = Object.keys(state.solvedMysteries || {}).length;
    const completed = Object.keys(state.completedLessons || {}).length;
    const todayDone = Boolean(counts.todayDone);
    const linkedLessonDone = Boolean(counts.linkedLessonDone);
    const backlog = Number(counts.archiveBacklog || 0);
    if (!solved && !completed) {
      return { label: "Démarrage", title: "Commence par jouer, pas par lire.", text: "Le meilleur premier contact reste le dossier du jour : une énigme courte, puis seulement ensuite le résumé ou le cours.", action: "mystery", cta: "Lancer le mystère" };
    }
    if (todayDone && !linkedLessonDone) {
      return { label: "Après résolution", title: "Profite du moment où le sujet est frais.", text: "Une fois le mystère résolu, l’express lié donne les repères essentiels sans transformer la session en pavé.", action: "daily-lesson", cta: "Lire l’express" };
    }
    if (backlog > 0) {
      return { label: "Archive", title: "Tu as un dossier déjà payé en gemmes.", text: "Mieux vaut finir une archive ouverte plutôt que dépenser encore : ça garde le rythme clair et évite d’enchaîner sans vraie attention.", action: "archive", cta: "Voir l’archive" };
    }
    if ((readyIds || []).length && completed < 3) {
      return { label: "Parcours", title: "Teste un cours solide.", text: "Choisis un sujet court : un exemple précis, quelques repères, puis un quiz qui valide vraiment la lecture.", action: "ready", cta: "Ouvrir un cours" };
    }
    return { label: "Rituel", title: todayDone ? "Rituel validé, reviens demain." : "Un bon score vient d’une réponse précise.", text: todayDone ? "L’app doit donner envie de revenir, pas tout consommer d’un coup. Les archives restent du rattrapage." : "Tente d’abord sans indice. Tu peux te tromper : l’indice reste un choix volontaire et coûte plus cher qu’un essai raté.", action: todayDone ? "home" : "mystery", cta: todayDone ? "Voir mon rythme" : "Jouer" };
  },
  firstRunSteps() {
    return [
      "Résoudre le dossier sans titre révélé",
      "Choisir un indice seulement si nécessaire",
      "Lire l’express après la réponse",
      "Ouvrir le cours complet seulement si le sujet accroche"
    ];
  }
};


/* ===== app-icons.js ===== */


(function(){
  const PATHS = {
    home: 'M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1v-10.5Z',
    courses: 'M4 5.5C4 4.12 5.12 3 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5V5.5Zm2.5-.5A1.5 1.5 0 0 0 5 6.5v12.55A4 4 0 0 1 6.5 18H18V5H6.5Z',
    ranking: 'M4 20h4v-7H4v7Zm6 0h4V4h-4v16Zm6 0h4v-10h-4v10Z',
    profile: 'M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2c-4.14 0-7.5 2.46-7.5 5.5V21h15v-1.5C19.5 16.46 16.14 14 12 14Z',
    history: 'M5 20h14v-2H5v2Zm1-4h3V6H6v10Zm5 0h3V6h-3v10Zm5 0h3V6h-3v10ZM4 4h16v1H4V4Z',
    art: 'M12 3.5C7.31 3.5 3.5 7.31 3.5 12A8.5 8.5 0 0 0 12 20.5h.44a2.06 2.06 0 0 0 1.46-3.52 1.33 1.33 0 0 1 .93-2.28H17A3.5 3.5 0 0 0 20.5 11C20.5 6.86 16.64 3.5 12 3.5Zm-4 9a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm3-4A1.25 1.25 0 1 1 11 6a1.25 1.25 0 0 1 0 2.5Zm4 0A1.25 1.25 0 1 1 15 6a1.25 1.25 0 0 1 0 2.5Zm2 4A1.25 1.25 0 1 1 17 10a1.25 1.25 0 0 1 0 2.5Z',
    cinema: 'M7.5 4.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm7 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM4 11.5h13a2 2 0 0 1 2 2V19H4v-7.5Zm15 2 3-2v7l-3-2v-3Z',
    science: 'M9 3h6v2h-1v4.1l4.5 7.2A2.5 2.5 0 0 1 16.38 20H7.62a2.5 2.5 0 0 1-2.12-3.7L10 9.1V5H9V3Zm1.64 8-3.3 5.3a.5.5 0 0 0 .42.7h8.48a.5.5 0 0 0 .42-.74L13.36 11h-2.72Z',
    economy: 'M4 19h16M6 16v-4h3v4m3 0V9h3v7m3 0V6h2v10M6 8l4-3 4 2 5-4',
    geography: 'M12 3.5a8.5 8.5 0 1 0 8.5 8.5A8.51 8.51 0 0 0 12 3.5Zm5.73 5h-2.46a12.9 12.9 0 0 0-1.11-2.85 6.54 6.54 0 0 1 3.57 2.85ZM12 5.22A10.93 10.93 0 0 1 13.29 8.5h-2.58A10.93 10.93 0 0 1 12 5.22ZM5.27 8.5a6.54 6.54 0 0 1 3.57-2.85A12.9 12.9 0 0 0 7.73 8.5H5.27Zm0 7h2.46a12.9 12.9 0 0 0 1.11 2.85A6.54 6.54 0 0 1 5.27 15.5ZM12 18.78A10.93 10.93 0 0 1 10.71 15.5h2.58A10.93 10.93 0 0 1 12 18.78Zm1.71-5.28h-3.42a11.35 11.35 0 0 1 0-3h3.42a11.35 11.35 0 0 1 0 3Zm.45 4.85a12.9 12.9 0 0 0 1.11-2.85h2.46a6.54 6.54 0 0 1-3.57 2.85Z',
    music: 'M5 9v6m4-9v12m4-9v6m4-11v16m4-9v6M3 12h4m4 0h4m4 0h4',
    astronomy: 'M12 4.5a7.5 7.5 0 0 0-6.8 4.3H3.5v2h1.16A7.5 7.5 0 0 0 12 19.5c2.74 0 5.14-1.47 6.46-3.66H21v-2h-1.84A7.49 7.49 0 0 0 12 4.5Zm0 2a5.5 5.5 0 1 1-5.5 5.5A5.51 5.51 0 0 1 12 6.5Zm0 2.5a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z',
    search: 'M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.44 4.44 1.41-1.41-4.44-4.44A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 10.5 6Z',
    map: 'M15 4 9 6 4 4v16l5 2 6-2 5 2V6l-5-2Zm0 2.2 3 1.2v11.76l-3-1.2V6.2Zm-2 .08v11.68l-4 1.33V7.61l4-1.33ZM6 7.24l1 .4v11.72l-1-.4V7.24Z',
    catalog: 'M4 5h16v3H4V5Zm0 5h16v3H4v-3Zm0 5h16v3H4v-3Z',
    mystery: 'M12 3.5A6.5 6.5 0 0 0 7 14.22V17a1 1 0 0 0 .29.71l1 1A1 1 0 0 0 9 19h6a1 1 0 0 0 .71-.29l1-1A1 1 0 0 0 17 17v-2.78A6.5 6.5 0 0 0 12 3.5Zm0 2A4.5 4.5 0 0 1 15 13.4l-.5.39V16h-5v-2.21L9 13.4A4.5 4.5 0 0 1 12 5.5Zm-2 13.5h4v1h-4v-1Z',
    medal: 'M7 3h4l1 3h0l1-3h4l-2 6 3.5 4.4L12 21l-6.5-7.6L9 9 7 3Zm3.46 8.5L12 13.54l1.54-2.04-2.04.79-.79-2.04-.79 2.04-2.04-.79 1.54 2.04-1.54 2.04 2.04-.79.79 2.04.79-2.04 2.04.79-1.54-2.04Z',
    trophy: 'M7 4h10v2h2a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4h-.28A5.01 5.01 0 0 1 13 15.9V18h3v2H8v-2h3v-2.1A5.01 5.01 0 0 1 8.28 12H8a4 4 0 0 1-4-4V7a1 1 0 0 1 1-1h2V4Zm10 4V8h1a2 2 0 0 1-2 2 4.97 4.97 0 0 0 1-2Zm-10 0a4.97 4.97 0 0 0 1 2 2 2 0 0 1-2-2h1Z',
    users: 'M9 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm6 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM3.5 19.5a4.5 4.5 0 0 1 9 0v.5h-9Zm8 0a4.95 4.95 0 0 1 .78-2.67A4.5 4.5 0 0 1 20.5 19.5v.5h-9Z',
    settings: 'M10.58 3h2.84l.4 2.02a7.2 7.2 0 0 1 1.62.67l1.73-1.12 2 2-1.12 1.73a7.2 7.2 0 0 1 .67 1.62L21 10.58v2.84l-2.02.4a7.2 7.2 0 0 1-.67 1.62l1.12 1.73-2 2-1.73-1.12a7.2 7.2 0 0 1-1.62.67L13.42 21h-2.84l-.4-2.02a7.2 7.2 0 0 1-1.62-.67L6.83 19.43l-2-2 1.12-1.73a7.2 7.2 0 0 1-.67-1.62L3 13.42v-2.84l2.02-.4a7.2 7.2 0 0 1 .67-1.62L4.57 6.83l2-2 1.73 1.12a7.2 7.2 0 0 1 1.62-.67L10.58 3ZM12 9a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z',
    spark: 'M13 3 5 14h5l-1 7 8-11h-5l1-7Z',
    check: 'M5 12.5 9.2 17 19 7.5l-1.4-1.4-8.3 8.05-2.9-3.1L5 12.5Z',
    warning: 'M12 4 3.34 19h17.32L12 4Zm1 11h-2v-2h2v2Zm0-4h-2V8h2v3Z',
    lock: 'M7 10V8a5 5 0 0 1 10 0v2h1.5A1.5 1.5 0 0 1 20 11.5v7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-7A1.5 1.5 0 0 1 5.5 10H7Zm2 0h6V8a3 3 0 0 0-6 0v2Z',
    lesson: 'M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3V4Zm3 17h9V7a1 1 0 0 0-1-1H7v14a2.98 2.98 0 0 1 1-.17Z',
    review: 'M12 5a7 7 0 1 0 6.65 9.18l1.9.63A9 9 0 1 1 12 3v2Zm1-2 5 4-5 4V8H8V6h5V3Z'
  };
  const disciplineMap = {history:'history', art:'art', cinema:'cinema', 'science-inventions':'science', economy:'economy', geography:'geography', music:'music', astronomy:'astronomy'};
  const titleHints = [
    ['myst', 'mystery'], ['quiz', 'spark'], ['révision', 'review'], ['recherche', 'search'], ['carte', 'map'], ['catalog', 'catalog'], ['profil', 'profile'], ['social', 'users'], ['réglage', 'settings'],
    ['galax', 'astronomy'], ['planète', 'astronomy'], ['étoile', 'astronomy'], ['univers', 'astronomy'],
    ['art', 'art'], ['cinéma','cinema'], ['film','cinema'], ['musique','music'], ['histoire','history'], ['géo','geography'], ['carte','geography'], ['science','science'], ['économie','economy']
  ];
  
  function svg(name){ return PATHS[name] || PATHS.lesson; }
  function render(name, cls='', label=''){
    const safe = String(name || 'lesson').replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    return `<span class="hd-icon ${cls} hd-icon--${safe}" aria-hidden="true"${label?` data-label="${String(label).replace(/"/g,'&quot;')}"`:''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="${svg(name)}"/></svg></span>`;
  }
  function discipline(d){ const id = typeof d === 'string' ? d : d?.id; return render(disciplineMap[id] || 'lesson', 'hd-icon-chip hd-icon-premium'); }
  function fromText(text, fallback='lesson'){ const t=(text||'').toLowerCase(); for(const [needle,name] of titleHints){ if(t.includes(needle)) return name; } return fallback; }
  function world(worldObj, disciplineObj){ const base = disciplineObj?.id || worldObj?.disciplineId || worldObj?.id?.split('-')[0]; return render(disciplineMap[base] || fromText(worldObj?.title, 'lesson'), 'hd-icon-chip hd-icon-premium'); }
  function lesson(lessonObj, worldObj, disciplineObj){ const base = disciplineObj?.id || worldObj?.disciplineId || lessonObj?.disciplineId || worldObj?.id?.split('-')[0]; return render(disciplineMap[base] || fromText(lessonObj?.title, 'lesson'), 'hd-icon-chip hd-icon-premium'); }
  function action(name){ return render(name, 'hd-icon-chip hd-icon-premium'); }
  function rawDiscipline(d){ const id = typeof d === "string" ? d : d?.id; return render(disciplineMap[id] || "lesson", "hd-icon-plain"); }
window.HD_ICONS = { render, discipline, world, lesson, action, rawDiscipline, fromText };
})();


/* ===== app-art.js ===== */

(function(){
  function esc(s){ return String(s||'').replace(/[&<>\"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m])); }
  const THEMES = {
    history: ['#f59e0b','#fb923c'],
    art: ['#ec4899','#f97316'],
    cinema: ['#312e81','#8b5cf6'],
    'science-inventions': ['#06b6d4','#22d3ee'],
    economy: ['#065f46','#10b981'],
    geography: ['#22c55e','#84cc16'],
    music: ['#7c2d12','#fb7185'],
    astronomy: ['#0b1020','#fbbf24'],
    mystery: ['#7c3aed','#c084fc'],
    season: ['#f59e0b','#fb7185']
  };
  function baseFrame(a,b, inner, opts={}){
    const bgOpacity = opts.bgOpacity ?? '.18';
    const circle1 = opts.circle1 ?? 'rgba(255,255,255,.10)';
    const circle2 = opts.circle2 ?? 'rgba(255,255,255,.08)';
    return `<svg viewBox="0 0 180 120" class="hd-art-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${a}"/><stop offset="100%" stop-color="${b}"/></linearGradient>
      </defs>
      <rect x="1" y="1" width="178" height="118" rx="28" fill="url(#g)" opacity="${bgOpacity}" stroke="rgba(255,255,255,.12)"/>
      <circle cx="150" cy="26" r="28" fill="${circle1}"/>
      <circle cx="24" cy="95" r="20" fill="${circle2}"/>
      ${inner}
    </svg>`;
  }
  function illustration(kind){
    switch(kind){
      case 'history': return baseFrame(...THEMES.history, `<path d="M46 83h88" stroke="#fff" stroke-opacity=".82" stroke-width="6" stroke-linecap="round"/><path d="M54 79V44m24 35V44m24 35V44m24 35V44" stroke="#fff" stroke-opacity=".78" stroke-width="6" stroke-linecap="round"/><path d="M48 41h84" stroke="#fff" stroke-opacity=".9" stroke-width="6" stroke-linecap="round"/><path d="M60 34l30-12 30 12" stroke="#fff" stroke-opacity=".92" stroke-width="6" fill="none" stroke-linejoin="round"/>`);
      case 'art': return baseFrame(...THEMES.art, `<path d="M74 28c-25 0-44 18-44 40 0 20 16 36 38 36h12c8 0 13-8 9-15-3-6 2-12 9-12h13c18 0 31-12 31-28 0-22-28-49-68-21Z" fill="rgba(255,255,255,.16)" stroke="#fff" stroke-opacity=".78" stroke-width="5"/><circle cx="59" cy="59" r="6" fill="#fff" fill-opacity=".88"/><circle cx="79" cy="45" r="6" fill="#fff" fill-opacity=".88"/><circle cx="101" cy="52" r="6" fill="#fff" fill-opacity=".88"/><path d="M119 91c8-16 20-28 36-36" stroke="#fff" stroke-opacity=".82" stroke-width="8" stroke-linecap="round"/><path d="M130 84l20 12" stroke="#fff" stroke-opacity=".65" stroke-width="8" stroke-linecap="round"/>`);
      case 'cinema': return baseFrame(...THEMES.cinema, `
        <circle cx="52" cy="48" r="18" fill="rgba(255,255,255,.14)" stroke="#fff" stroke-opacity=".82" stroke-width="4"/>
        <circle cx="52" cy="48" r="5" fill="#fff" fill-opacity=".86"/>
        <circle cx="45" cy="41" r="2.6" fill="#fff" fill-opacity=".82"/><circle cx="59" cy="41" r="2.6" fill="#fff" fill-opacity=".82"/><circle cx="45" cy="55" r="2.6" fill="#fff" fill-opacity=".82"/><circle cx="59" cy="55" r="2.6" fill="#fff" fill-opacity=".82"/>
        <path d="M74 44l34 10-34 10Z" fill="rgba(255,255,255,.20)" stroke="#fff" stroke-opacity=".72" stroke-width="3" stroke-linejoin="round"/>
        <rect x="104" y="33" width="40" height="54" rx="11" fill="rgba(255,255,255,.10)" stroke="#fff" stroke-opacity=".84" stroke-width="4"/>
        <path d="M114 47h18m-18 11h20m-20 11h12" stroke="#fff" stroke-opacity=".92" stroke-width="4" stroke-linecap="round"/>
        <path d="M90 81h44" stroke="#c4b5fd" stroke-opacity=".5" stroke-width="4" stroke-linecap="round"/>
      `);
      case 'science-inventions': return baseFrame(...THEMES['science-inventions'], `<path d="M64 28h34m-8 0v22l22 35a12 12 0 0 1-10 18H60a12 12 0 0 1-10-18l22-35V28" stroke="#fff" stroke-opacity=".88" stroke-width="6" fill="rgba(255,255,255,.10)" stroke-linecap="round" stroke-linejoin="round"/><path d="M60 83h42" stroke="#fff" stroke-opacity=".82" stroke-width="6" stroke-linecap="round"/><circle cx="128" cy="38" r="6" fill="#fff" fill-opacity=".85"/><circle cx="143" cy="57" r="10" fill="rgba(255,255,255,.20)" stroke="#fff" stroke-opacity=".72" stroke-width="4"/>`);
      case 'economy': return baseFrame(...THEMES.economy, `
        <rect x="34" y="66" width="14" height="20" rx="5" fill="rgba(255,255,255,.14)" stroke="#fff" stroke-opacity=".74" stroke-width="3.5"/>
        <rect x="54" y="56" width="14" height="30" rx="5" fill="rgba(255,255,255,.16)" stroke="#fff" stroke-opacity=".78" stroke-width="3.5"/>
        <rect x="74" y="46" width="14" height="40" rx="5" fill="rgba(255,255,255,.18)" stroke="#fff" stroke-opacity=".82" stroke-width="3.5"/>
        <circle cx="56" cy="38" r="11" fill="rgba(255,214,102,.22)" stroke="#fef3c7" stroke-opacity=".9" stroke-width="3.5"/>
        <path d="M52 38h8m-4-4v8" stroke="#fff7ed" stroke-opacity=".95" stroke-width="3" stroke-linecap="round"/>
        <path d="M101 78l14-14 10 8 19-25" stroke="#fff" stroke-opacity=".94" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M136 47h14v14" stroke="#fff" stroke-opacity=".94" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M32 92h120" stroke="#d1fae5" stroke-opacity=".38" stroke-width="4" stroke-linecap="round"/>
      `,{bgOpacity:'.22'});
      case 'geography': return baseFrame(...THEMES.geography, `<circle cx="88" cy="60" r="34" fill="rgba(255,255,255,.10)" stroke="#fff" stroke-opacity=".8" stroke-width="5"/><path d="M54 60h68M88 26a58 58 0 0 0 0 68M88 26a58 58 0 0 1 0 68" stroke="#fff" stroke-opacity=".72" stroke-width="4"/><path d="M136 38l18 9-3 24-20 11-18-9 3-24 20-11Z" fill="rgba(255,255,255,.16)" stroke="#fff" stroke-opacity=".82" stroke-width="4"/><circle cx="133" cy="60" r="4" fill="#fff" fill-opacity=".92"/>`);
      case 'music': return baseFrame(...THEMES.music, `
        <circle cx="56" cy="58" r="26" fill="rgba(255,255,255,.12)" stroke="#fff" stroke-opacity=".84" stroke-width="4"/>
        <circle cx="56" cy="58" r="7" fill="#fff" fill-opacity=".86"/>
        <path d="M56 32a26 26 0 0 1 0 52" stroke="#fff" stroke-opacity=".42" stroke-width="4" fill="none"/>
        <path d="M104 35v40a11 11 0 1 1-6.5-10.2V44l24-6v28a11 11 0 1 1-6.5-10.2V46l-11 2.8Z" fill="rgba(255,255,255,.13)" stroke="#fff" stroke-opacity=".9" stroke-width="4.2" stroke-linejoin="round"/>
        <path d="M35 89c8-4 15-4 23 0 8 4 15 4 23 0" stroke="#fff" stroke-opacity=".74" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M132 43c6 3 10 8 12 15" stroke="#ffd5df" stroke-opacity=".6" stroke-width="4" fill="none" stroke-linecap="round"/>
      `,{bgOpacity:'.24'});
      case 'astronomy': return baseFrame(...THEMES.astronomy, `
        <circle cx="89" cy="61" r="18" fill="#05070d" stroke="#fbbf24" stroke-opacity=".45" stroke-width="3"/>
        <ellipse cx="89" cy="61" rx="44" ry="15" fill="none" stroke="#fbbf24" stroke-opacity=".95" stroke-width="6"/>
        <ellipse cx="89" cy="61" rx="30" ry="30" fill="none" stroke="#fcd34d" stroke-opacity=".28" stroke-width="3"/>
        <path d="M45 61c11-8 23-12 44-12 19 0 35 4 44 12-11 8-25 12-44 12-21 0-33-4-44-12Z" fill="rgba(251,191,36,.14)"/>
        <circle cx="48" cy="34" r="2.6" fill="#fde68a"/>
        <circle cx="132" cy="31" r="2.3" fill="#fff7ed"/>
        <circle cx="145" cy="78" r="2.6" fill="#fcd34d"/>
        <path d="M144 21l2.5 5 5 2.5-5 2.5-2.5 5-2.5-5-5-2.5 5-2.5 2.5-5Z" fill="#fde68a" fill-opacity=".72"/>
      `,{bgOpacity:'.30', circle1:'rgba(251,191,36,.10)', circle2:'rgba(255,255,255,.05)'});
      case 'mystery': return baseFrame(...THEMES.mystery, `<path d="M90 28c-21 0-38 15-38 34 0 12 7 21 17 28v10h42V90c10-7 17-16 17-28 0-19-17-34-38-34Z" fill="rgba(255,255,255,.14)" stroke="#fff" stroke-opacity=".82" stroke-width="5"/><path d="M79 55c2-8 9-12 18-12 12 0 20 8 20 18 0 7-3 12-12 16-6 3-7 6-7 10" stroke="#fff" stroke-opacity=".92" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="98" cy="94" r="4" fill="#fff" fill-opacity=".9"/>`);
      default: return baseFrame(...THEMES.season, `<circle cx="66" cy="60" r="24" fill="rgba(255,255,255,.12)" stroke="#fff" stroke-opacity=".82" stroke-width="5"/><path d="M94 48c8-8 18-12 32-12 0 18-4 29-12 37-7 7-17 11-29 12 1-14 3-26 9-37Z" fill="rgba(255,255,255,.16)" stroke="#fff" stroke-opacity=".8" stroke-width="5"/><path d="M57 61h31" stroke="#fff" stroke-opacity=".84" stroke-width="6" stroke-linecap="round"/>`);
    }
  }
  function discipline(id){ return `<div class="hd-art hd-art--discipline hd-art--${esc(id)}">${illustration(id)}</div>`; }
  function season(key){
    const mapped = ({astronomy:'astronomy', science:'science-inventions', art:'art', mystery:'mystery'})[String(key||'').toLowerCase()] || 'season';
    return `<div class="hd-art hd-art--season hd-art--${esc(mapped)}">${illustration(mapped)}</div>`;
  }
  function hero(id){ return `<div class="hd-art hd-art--hero hd-art--${esc(id)}">${illustration(id)}</div>`; }
  window.HD_ART = { discipline, season, hero };
})();
