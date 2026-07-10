window.HISTODAILY_CORE = {
  version: "1.0.0-beta.198",
  assetsVersion: "1.0.0-beta.198",
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
    versionLabel: "beta 198",
    shareBaseUrl: "https://histodaily.vercel.app",
    releaseNotes: [
      "Correctif classement : le résumé et la ligne personnelle utilisent désormais exactement le même score de période.",
      "Les mystères résolus le même jour sont additionnés correctement dans le classement en ligne.",
      "Les anciens scores serveur impossibles issus de l’XP totale sont détectés et réparés automatiquement."
    ]
  },
  clamp(value, min, max) { return Math.min(max, Math.max(min, value)); },
  storage: {
    safeRead(primaryKey, backupKey) {
      try {
        const keys = [primaryKey, backupKey, ...(window.HISTODAILY_CORE?.legacyStorageKeys || [])].filter(Boolean);
        for (const key of keys) {
          const value = localStorage.getItem(key);
          if (value) return value;
        }
      } catch {}
      return null;
    },
    safeWrite(primaryKey, backupKey, value) {
      try {
        localStorage.setItem(primaryKey, value);
        localStorage.setItem(backupKey, value);
        localStorage.setItem(`${primaryKey}_last_ok`, String(Date.now()));
        return true;
      } catch { return false; }
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
