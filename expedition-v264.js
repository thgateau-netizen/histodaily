/* HistoDaily beta 264 — premium daily expedition
   Visual and interaction layer only: the mystery engine, scores, social routes and data remain unchanged. */
(function histodailyExpedition264(){
  "use strict";

  const VERSION = "1.0.0-beta.266.0";
  const STORAGE_KEY = "histodaily.expedition.v264";
  let timerId = 0;
  let scheduled = false;

  const safe = (fn, fallback = null) => {
    try {
      const value = fn();
      return value == null ? fallback : value;
    } catch {
      return fallback;
    }
  };
  const esc = value => {
    try { return escapeHtml(String(value ?? "")); }
    catch { return String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[char]); }
  };
  const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));

  function normalized(value){
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("fr-FR")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function readStore(){
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function writeStore(store){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(store)); } catch {}
  }

  function localDayKey(date = new Date()){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function timingFor(mystery, solved, solvedAt){
    if (!mystery?.id) return { startedAt: 0, endedAt: 0, elapsed: 0 };
    const store = readStore();
    const id = String(mystery.id);
    const today = localDayKey();
    const current = store[id] && typeof store[id] === "object" ? store[id] : {};
    let startedAt = Number(current.startedAt || 0);
    let endedAt = Number(current.endedAt || 0);

    if (!startedAt && !solved) startedAt = Date.now();
    if (solved && !endedAt) endedAt = Number(solvedAt || Date.now());
    if (startedAt && endedAt && endedAt < startedAt) startedAt = 0;

    const next = { ...current, startedAt, endedAt, day: current.day || today };
    if (JSON.stringify(next) !== JSON.stringify(current)) {
      store[id] = next;
      const keys = Object.keys(store);
      if (keys.length > 80) keys.slice(0, keys.length - 80).forEach(key => delete store[key]);
      writeStore(store);
    }
    const stop = endedAt || Date.now();
    return { startedAt, endedAt, elapsed: startedAt ? Math.max(0, stop - startedAt) : 0 };
  }

  function durationLabel(milliseconds){
    if (!milliseconds) return "—";
    const seconds = Math.max(0, Math.floor(milliseconds / 1000));
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    if (minutes >= 60) return `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, "0")}`;
    return `${minutes}:${String(remainder).padStart(2, "0")}`;
  }

  function disciplineData(mystery){
    const id = safe(() => mysteryDisciplineId(mystery), safe(() => activeDisciplineId(), state?.currentDiscipline || "history")) || "history";
    const discipline = safe(() => disciplineById(id), null) || safe(() => DISCIPLINES.find(item => item.id === id), null) || {};
    const labels = {
      history: "Histoire",
      art: "Art",
      cinema: "Cinéma",
      "science-inventions": "Sciences",
      astronomy: "Astronomie",
      economy: "Économie",
      geography: "Géographie",
      music: "Musique",
      literature: "Littérature"
    };
    return {
      id,
      label: labels[id] || discipline.title || "Culture",
      accent: discipline.accent || "#f6c453",
      icon: safe(() => HD_ICONS.discipline(discipline), discipline.emoji || "✦") || "✦"
    };
  }

  function rankForToday(){
    const rows = safe(() => leaderboardRows("daily"), []) || [];
    const pseudo = normalized(safe(() => state.pseudo, ""));
    const row = rows.find(item => item?.me || item?.isMe || (pseudo && normalized(item?.name) === pseudo));
    const rank = Number(row?.rank || 0);
    return rank > 0 ? rank : null;
  }

  function scoreData(mystery){
    const breakdown = safe(() => mysteryScoreBreakdown(mystery.id), null) || {};
    const base = Math.max(1, Number(breakdown.base || breakdown.score || 100));
    const score = Math.max(0, Number(breakdown.score || safe(() => mysteryScore(mystery.id), 0)));
    return { ...breakdown, base, score, percent: clamp((score / base) * 100, 0, 100) };
  }

  function phaseData({ solved, hints, tries }){
    const phase = solved ? 3 : (hints > 0 || tries > 0) ? 2 : 1;
    return [
      { label: "Observer", detail: "Lire le dossier", status: phase > 1 ? "done" : "current" },
      { label: "Déduire", detail: "Croiser les indices", status: phase > 2 ? "done" : phase === 2 ? "current" : "future" },
      { label: "Révéler", detail: "Valider la réponse", status: solved ? "done" : "future" }
    ];
  }

  function dashboardMarkup(data){
    const { mystery, discipline, solved, hints, tries, score, timing } = data;
    const phases = phaseData({ solved, hints, tries });
    return `<section class="hd264-dashboard" aria-label="Tableau de l’expédition">
      <div class="hd264-dashboard-top">
        <div class="hd264-mission-name"><span>${discipline.icon}</span><div><small>${solved ? "Expédition résolue" : "Expédition en cours"}</small><b>${esc(discipline.label)}</b></div></div>
        <div class="hd264-live-metrics">
          <div class="hd264-live-score"><small>${solved ? "Score final" : "Score potentiel"}</small><strong>${score.score}</strong><span>XP</span></div>
          <div class="hd264-live-time"><small>Chrono</small><strong data-hd264-timer data-started-at="${timing.startedAt}" data-ended-at="${timing.endedAt}">${durationLabel(timing.elapsed)}</strong></div>
        </div>
      </div>
      <div class="hd264-score-track" aria-label="${Math.round(score.percent)} % du score maximal conservé"><i style="width:${score.percent.toFixed(1)}%"></i></div>
      <div class="hd264-phase-line">
        ${phases.map((phase, index) => `<div class="${phase.status}"><span>${phase.status === "done" ? "✓" : index + 1}</span><p><b>${phase.label}</b><small>${phase.detail}</small></p></div>`).join("")}
      </div>
      <div class="hd264-cost-line"><span>${hints ? `${hints} indice${hints > 1 ? "s" : ""} utilisé${hints > 1 ? "s" : ""}` : "Aucun indice utilisé"}</span><span>${tries ? `${tries} essai${tries > 1 ? "s" : ""}` : "Premier essai disponible"}</span><strong>${esc(safe(() => difficultyLabel(mystery.difficulty), mystery.difficulty || "moyen"))}</strong></div>
    </section>`;
  }

  function clueBoardMarkup(mystery, hints, solved){
    const clues = Array.isArray(mystery.clues) ? mystery.clues.slice(0, 3) : [];
    if (!clues.length) return "";
    const labels = safe(() => mysteryHintLabels(), ["Situer l’époque", "Trouver la piste", "Confirmer la réponse"]);
    return `<section class="hd264-clue-board" aria-label="Progression des indices">
      <header><div><span class="card-label">Dossier d’indices</span><h2>${solved ? "Les pistes du dossier" : "Débloque seulement ce dont tu as besoin"}</h2></div><small>${hints}/${clues.length} consulté${hints > 1 ? "s" : ""}</small></header>
      <div class="hd264-clue-list">
        ${clues.map((clue, index) => {
          const revealed = index < hints;
          const available = !solved && index === hints;
          const unused = solved && !revealed;
          const status = revealed ? "revealed" : available ? "available" : unused ? "unused" : "locked";
          const detail = revealed
            ? esc(clue)
            : unused
              ? "Non utilisé · bonus de précision conservé"
              : available
                ? `Ouvrir cet indice · -${safe(() => SCORE_PENALTY_HINT, 20)} XP potentiel`
                : "Verrouillé jusqu’à l’indice précédent";
          return `<button type="button" class="hd264-clue ${status}" data-hd264-clue="${index}" ${available ? "" : "disabled"} aria-label="${esc(labels[index] || `Indice ${index + 1}`)} : ${esc(detail)}"><span>${revealed ? "✓" : index + 1}</span><div><b>${esc(labels[index] || `Indice ${index + 1}`)}</b><p>${detail}</p></div>${available ? "<em>Ouvrir</em>" : unused ? "<em>Bonus</em>" : ""}</button>`;
        }).join("")}
      </div>
    </section>`;
  }

  function resultMarkup(data){
    const { mystery, solvedData, hints, tries, timing, score } = data;
    const rank = rankForToday();
    const finalScore = Number(solvedData.score || score.score || 0);
    const finalHints = Number(solvedData.hints ?? hints ?? 0);
    const finalTries = Number(solvedData.tries || tries || 1);
    const precision = finalHints === 0 ? "Sans indice" : `${finalHints} indice${finalHints > 1 ? "s" : ""}`;
    const title = mystery.title && normalized(mystery.title) !== normalized(mystery.answer) ? mystery.title : "Dossier identifié";
    return `<section class="hd264-result" aria-label="Résultat de l’expédition">
      <div class="hd264-result-orbit" aria-hidden="true"><i></i><i></i><i></i></div>
      <span class="hd264-result-kicker">Expédition réussie</span>
      <h2>${esc(mystery.answer)}</h2>
      <p>${esc(title)}</p>
      <div class="hd264-result-stats">
        <div><strong>${finalScore}</strong><span>XP</span></div>
        <div><strong>${durationLabel(timing.elapsed)}</strong><span>temps</span></div>
        <div><strong>${esc(precision)}</strong><span>précision</span></div>
        <div><strong>${rank ? `#${rank}` : "—"}</strong><span>rang du jour</span></div>
      </div>
      <div class="hd264-result-note"><span>${finalTries === 1 ? "Résolu au premier essai" : `${finalTries} essais nécessaires`}</span><b>${rank ? `Top du jour : #${rank}` : "Classement en synchronisation"}</b></div>
    </section>`;
  }

  function enhanceMystery(){
    const shell = document.querySelector(".app-shell.tab-mystery");
    const card = shell?.querySelector(".mystery-card");
    const mystery = safe(() => currentMystery(), null);
    if (!shell || !card || !mystery?.id) {
      stopTimer();
      return;
    }
    if (card.dataset.hd264Enhanced === String(mystery.id)) {
      startTimer();
      return;
    }

    const solved = Boolean(safe(() => mysterySolved(mystery.id), false));
    const solvedData = safe(() => state.solvedMysteries?.[mystery.id], {}) || {};
    const hints = Math.min(Number(safe(() => state.seenHints?.[mystery.id], 0)) || 0, Math.min(3, mystery.clues?.length || 0));
    const tries = Number(safe(() => state.mysteryTries?.[mystery.id], 0)) || 0;
    const discipline = disciplineData(mystery);
    const score = scoreData(mystery);
    const timing = timingFor(mystery, solved, solvedData.at);
    const data = { mystery, solved, solvedData, hints, tries, discipline, score, timing };

    shell.classList.add("hd264-expedition-shell", `hd264-${discipline.id}`);
    shell.style.setProperty("--hd264-accent", discipline.accent);
    card.classList.add("hd264-case", solved ? "is-solved" : "is-active");
    card.style.setProperty("--hd264-score", `${score.percent}%`);
    card.dataset.hd264Enhanced = String(mystery.id);

    const topbar = shell.querySelector(":scope > .topbar");
    if (topbar) {
      topbar.classList.add("hd264-topbar");
      if (!topbar.querySelector(".hd264-topbar-state")) {
        const stateNode = document.createElement("span");
        stateNode.className = `hd264-topbar-state ${solved ? "done" : "live"}`;
        stateNode.textContent = solved ? "Résolu" : "En direct";
        topbar.appendChild(stateNode);
      }
    }

    const label = card.querySelector(":scope > .card-label");
    const dashboard = document.createElement("div");
    dashboard.innerHTML = dashboardMarkup(data);
    const dashboardNode = dashboard.firstElementChild;
    if (label) label.insertAdjacentElement("afterend", dashboardNode);
    else card.prepend(dashboardNode);

    const prompt = card.querySelector(":scope > .prompt");
    prompt?.classList.add("hd264-prompt");
    const brief = card.querySelector(":scope > .mystery-brief");
    brief?.classList.add("hd264-brief");

    const originalHints = card.querySelector(":scope > .hints");
    if (originalHints) {
      const clueWrap = document.createElement("div");
      clueWrap.innerHTML = clueBoardMarkup(mystery, hints, solved);
      const clueBoard = clueWrap.firstElementChild;
      if (clueBoard) originalHints.insertAdjacentElement("beforebegin", clueBoard);
      originalHints.classList.add("hd264-original-hints");
      originalHints.setAttribute("aria-hidden", "true");
    }

    card.querySelectorAll("[data-hd264-clue]").forEach(button => button.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      const original = card.querySelector("[data-hint]");
      if (original && !original.hidden) original.click();
    }));

    const form = card.querySelector(":scope > .guess");
    if (form) {
      form.classList.add("hd264-answer-form");
      const zone = document.createElement("section");
      zone.className = "hd264-answer-zone";
      zone.innerHTML = `<header><span class="card-label">Ta déduction</span><h2>Quel sujet relie tous les éléments ?</h2></header>`;
      form.insertAdjacentElement("beforebegin", zone);
      zone.appendChild(form);
      const feedback = card.querySelector(":scope > .guess-feedback");
      if (feedback) zone.insertBefore(feedback, form);
      const rules = card.querySelector(":scope > .hd183-rules-details");
      if (rules) zone.appendChild(rules);
    }

    const hintButton = card.querySelector("[data-hint]");
    hintButton?.classList.add("hd264-native-hint");

    if (solved) {
      const solution = card.querySelector(":scope > .solution");
      if (solution) {
        solution.classList.add("hd264-solution");
        const resultWrap = document.createElement("div");
        resultWrap.innerHTML = resultMarkup(data);
        solution.prepend(resultWrap.firstElementChild);
      }
      shell.querySelector(".after-mystery")?.classList.add("hd264-next-chapter");
    }

    shell.querySelector(".mystery-progress-card")?.classList.add("hd264-secondary-card");
    shell.querySelector(".archive-shelf")?.classList.add("hd264-archives");
    shell.querySelector(".small-leader")?.classList.add("hd264-mini-ranking");

    startTimer();
  }

  function updateTimers(){
    const now = Date.now();
    document.querySelectorAll("[data-hd264-timer]").forEach(node => {
      const startedAt = Number(node.dataset.startedAt || 0);
      const endedAt = Number(node.dataset.endedAt || 0);
      node.textContent = durationLabel(startedAt ? Math.max(0, (endedAt || now) - startedAt) : 0);
    });
  }

  function startTimer(){
    updateTimers();
    if (timerId || !document.querySelector(".app-shell.tab-mystery [data-hd264-timer][data-ended-at='0']")) return;
    timerId = window.setInterval(updateTimers, 1000);
  }

  function stopTimer(){
    if (!timerId) return;
    window.clearInterval(timerId);
    timerId = 0;
  }

  function scheduleEnhance(){
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      enhanceMystery();
    });
  }

  try {
    const previousRenderMystery = renderMystery;
    renderMystery = function beta264RenderMystery(){
      const output = previousRenderMystery();
      scheduleEnhance();
      window.setTimeout(scheduleEnhance, 40);
      return output;
    };
  } catch {}

  const observer = new MutationObserver(() => {
    if (document.querySelector(".app-shell.tab-mystery")) scheduleEnhance();
    else stopTimer();
  });
  observer.observe(document.getElementById("app") || document.body, { childList: true, subtree: true });
  document.addEventListener("visibilitychange", () => document.hidden ? stopTimer() : scheduleEnhance());

  document.documentElement.classList.add("hd264-premium-expedition");
  window.HistoDaily = { ...(window.HistoDaily || {}), expeditionVersion: VERSION };
  scheduleEnhance();
})();
