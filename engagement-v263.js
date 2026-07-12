/* HistoDaily beta 263 — finite daily engagement loop
   A clear daily objective, weekly rhythm and a small collectible reward.
   No infinite feed, no autoplay and no social engine changes. */
(function histodailyEngagement263(){
  "use strict";

  const VERSION = "1.0.0-beta.263.0";
  const STORAGE_KEY = "histodaily.engagement.v263";
  let mountTimer = null;
  let previousSignature = "";

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

  function dateKey(date = new Date()){
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function offsetDateKey(offset){
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + offset);
    return dateKey(date);
  }

  function readStore(){
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {
        capsules: parsed && typeof parsed.capsules === "object" ? parsed.capsules : {},
        lastCelebrated: String(parsed?.lastCelebrated || "")
      };
    } catch {
      return { capsules: {}, lastCelebrated: "" };
    }
  }

  function writeStore(store){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(store)); } catch {}
  }

  function disciplineName(id){
    const map = {
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
    return map[id] || "Culture";
  }

  function capsuleName(id){
    const map = {
      history: "Fragment de chronologie",
      art: "Éclat de palette",
      cinema: "Photogramme rare",
      "science-inventions": "Étincelle d’invention",
      astronomy: "Poussière d’étoile",
      economy: "Jeton d’échange",
      geography: "Éclat de carte",
      music: "Note suspendue",
      literature: "Page enluminée"
    };
    return map[id] || "Éclat de curiosité";
  }

  function capsuleIcon(id){
    const map = {
      history: "⌛",
      art: "✦",
      cinema: "◫",
      "science-inventions": "⚡",
      astronomy: "✺",
      economy: "◇",
      geography: "⌖",
      music: "♪",
      literature: "▤"
    };
    return map[id] || "✦";
  }

  function hash(text){
    let value = 2166136261;
    for (const char of String(text || "")) {
      value ^= char.charCodeAt(0);
      value = Math.imul(value, 16777619);
    }
    return Math.abs(value >>> 0);
  }

  function lessonInfo(lesson){
    if (!lesson) return null;
    const disciplineId = safe(() => lessonDisciplineId(lesson), safe(() => activeDisciplineId(), "history"));
    const world = safe(() => lessonWorld(lesson), {}) || {};
    const content = safe(() => buildLessonContent(lesson), null);
    return {
      id: String(lesson.id || ""),
      title: content?.title || lesson.title || "Cours du jour",
      disciplineId,
      worldId: world.id || "",
      groupId: world.group || ""
    };
  }

  function bonusLesson(disciplineId, linkedLessonId){
    const lessons = safe(() => curatedLessons(), []) || [];
    const candidates = lessons.filter(lesson => {
      const sameDiscipline = safe(() => lessonDisciplineId(lesson), "history") === disciplineId;
      const notLinked = String(lesson.id || "") !== String(linkedLessonId || "");
      const notDone = !safe(() => lessonDone(lesson.id), false);
      return sameDiscipline && notLinked && notDone;
    });
    const fallback = lessons.filter(lesson => safe(() => lessonDisciplineId(lesson), "history") === disciplineId && String(lesson.id || "") !== String(linkedLessonId || ""));
    const pool = candidates.length ? candidates : fallback;
    if (!pool.length) return null;
    return pool[hash(`${dateKey()}-${disciplineId}`) % pool.length];
  }

  function missionData(){
    const disciplineId = safe(() => activeDisciplineId(), safe(() => state.currentDiscipline, "history")) || "history";
    const mystery = safe(() => dailyMystery(), null);
    const lesson = mystery?.lessonId ? safe(() => lessonById(mystery.lessonId), null) : null;
    const problemDone = Boolean(mystery?.id && safe(() => mysterySolved(mystery.id), false));
    const lessonDoneNow = Boolean(lesson?.id && safe(() => lessonRead(lesson.id), false));
    const quizDone = Boolean(lesson?.id && safe(() => lessonQuizPassed(lesson.id), false));
    const steps = [
      { key: "mystery", label: "Résoudre", detail: mystery ? "Le dossier du jour" : "Choisir un dossier", done: problemDone, unlocked: Boolean(mystery) },
      { key: "lesson", label: "Comprendre", detail: lesson ? "Lire le cours lié" : "Explorer un cours", done: lessonDoneNow, unlocked: Boolean(lesson && problemDone) },
      { key: "quiz", label: "Retenir", detail: lesson ? "Révision en 5 questions" : "Valider les acquis", done: quizDone, unlocked: Boolean(lesson && lessonDoneNow) }
    ];
    const done = steps.filter(step => step.done).length;
    const next = steps.find(step => !step.done) || null;
    const linked = lessonInfo(lesson);
    const bonus = lessonInfo(bonusLesson(disciplineId, lesson?.id));
    return { disciplineId, mystery, lesson, linked, bonus, steps, done, complete: done === steps.length, next };
  }

  function weeklyData(){
    const labels = ["L", "M", "M", "J", "V", "S", "D"];
    return Array.from({ length: 7 }, (_, index) => {
      const offset = index - 6;
      const key = offsetDateKey(offset);
      const date = new Date();
      date.setHours(12, 0, 0, 0);
      date.setDate(date.getDate() + offset);
      const claim = safe(() => state.dailyHistory?.[key] || state.dailyClaims?.[key], null);
      return {
        key,
        label: labels[(date.getDay() + 6) % 7],
        done: Boolean(claim),
        today: offset === 0
      };
    });
  }

  function nextMilestone(){
    const streak = Math.max(0, Number(safe(() => state.streak, 0)) || 0);
    const milestones = [3, 7, 14, 30, 60, 100, 180, 365];
    const target = milestones.find(value => value > streak) || (Math.ceil((streak + 1) / 100) * 100);
    const previous = [...milestones].reverse().find(value => value <= streak) || 0;
    const progress = target > previous ? ((streak - previous) / (target - previous)) * 100 : 100;
    return { streak, target, remaining: Math.max(0, target - streak), progress: clamp(progress, 0, 100) };
  }

  function maybeUnlockCapsule(data){
    if (!data.complete) return { unlocked: false, count: Object.keys(readStore().capsules).length };
    const key = dateKey();
    const store = readStore();
    let unlocked = false;
    if (!store.capsules[key]) {
      store.capsules[key] = {
        disciplineId: data.disciplineId,
        name: capsuleName(data.disciplineId),
        at: Date.now()
      };
      unlocked = true;
    }
    const celebrate = unlocked || store.lastCelebrated !== key;
    if (celebrate) store.lastCelebrated = key;
    writeStore(store);
    return { unlocked: celebrate, count: Object.keys(store.capsules).length };
  }

  function nextAction(data){
    if (!data.next) return data.bonus ? { action: "bonus", label: "Prolonger 3 minutes", detail: data.bonus.title } : { action: "catalog", label: "Explorer librement", detail: "Choisir un nouveau sujet" };
    if (data.next.key === "mystery") return { action: "mystery", label: "Commencer maintenant", detail: "Résoudre le dossier du jour" };
    if (data.next.key === "lesson") return { action: "lesson", label: "Continuer l’expédition", detail: data.linked?.title || "Lire le cours associé" };
    return { action: "quiz", label: "Boucler l’expédition", detail: "Faire la révision finale" };
  }

  function stepMarkup(step, index){
    const stateClass = step.done ? "done" : step.unlocked ? "current" : "locked";
    const icon = step.done ? "✓" : index + 1;
    return `<button type="button" class="hd263-step ${stateClass}" data-hd263-action="${esc(step.key)}" ${step.unlocked || step.done ? "" : "disabled"} aria-label="${esc(step.label)} : ${step.done ? "terminé" : step.unlocked ? "disponible" : "verrouillé"}">
      <span>${icon}</span><div><b>${esc(step.label)}</b><small>${esc(step.detail)}</small></div>
    </button>`;
  }

  function renderMarkup(data, reward){
    const week = weeklyData();
    const weekDone = week.filter(day => day.done).length;
    const milestone = nextMilestone();
    const pct = Math.round(data.done / data.steps.length * 100);
    const capsuleLabel = capsuleName(data.disciplineId);
    const remaining = data.steps.length - data.done;
    const completeCopy = data.complete
      ? `Mission terminée. Ton ${capsuleLabel.toLowerCase()} rejoint ta collection.`
      : data.done === 0
        ? "Le dossier, le cours, puis cinq questions : environ dix minutes."
        : `Encore ${remaining} étape${remaining > 1 ? "s" : ""} pour fermer la boucle du jour.`;

    return `<section class="hd263-engagement ${data.complete ? "is-complete" : ""}" style="--hd263-progress:${pct}%" aria-label="Rythme quotidien">
      <header class="hd263-head">
        <div><span class="card-label">Ton rythme</span><h2>${data.complete ? "Boucle du jour terminée" : "Garde l’élan"}</h2><p>${esc(completeCopy)}</p></div>
        <div class="hd263-score" aria-label="${data.done} étapes sur ${data.steps.length}"><strong>${data.done}/${data.steps.length}</strong><small>étapes</small></div>
      </header>

      <div class="hd263-progress" aria-hidden="true"><i></i></div>

      <div class="hd263-footer">
        <div class="hd263-week"><div><small>7 derniers jours</small><b>${weekDone}/7</b></div><span>${week.map(day => `<i class="${day.done ? "done" : ""} ${day.today ? "today" : ""}" title="${esc(day.key)}"><em>${day.label}</em></i>`).join("")}</span></div>
        <div class="hd263-milestone"><div><small>Prochain palier</small><b>${milestone.target} jours</b></div><span><i style="width:${milestone.progress}%"></i></span><em>${milestone.remaining} jour${milestone.remaining > 1 ? "s" : ""} à tenir</em></div>
        <div class="hd263-capsule ${data.complete ? "earned" : ""}"><span>${capsuleIcon(data.disciplineId)}</span><div><small>${data.complete ? "Capsule obtenue" : "À débloquer aujourd’hui"}</small><b>${esc(capsuleLabel)}</b><em>${reward.count} collectionnée${reward.count > 1 ? "s" : ""}</em></div></div>
      </div>

      ${data.complete ? `<button type="button" class="hd263-main-action" data-hd263-action="${data.bonus ? "bonus" : "catalog"}">
        <span>${capsuleIcon(data.disciplineId)}</span>
        <div><small>Bonus facultatif</small><b>${data.bonus ? "Une dernière découverte" : "Explorer librement"}</b><em>${esc(data.bonus?.title || "Choisir un nouveau sujet")}</em></div>
        <strong>3 min</strong>
      </button>` : ""}
    </section>`;
  }

  function openLessonByInfo(info, view){
    if (!info?.id) return false;
    setState({
      tab: "lesson",
      currentLessonId: info.id,
      currentDiscipline: info.disciplineId || safe(() => activeDisciplineId(), "history"),
      currentWorld: info.worldId || safe(() => state.currentWorld, ""),
      currentGroup: info.groupId || safe(() => state.currentGroup, ""),
      lessonView: view,
      lessonFocus: null
    });
    return true;
  }

  function celebrate(root, data){
    root.classList.add("just-completed");
    safe(() => window.HDSound?.play?.("complete", { force: true }));
    const toast = document.createElement("div");
    toast.className = "hd263-toast";
    toast.innerHTML = `<span>${capsuleIcon(data.disciplineId)}</span><div><b>Mission du jour terminée</b><small>${esc(capsuleName(data.disciplineId))} ajouté à ta collection</small></div>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    window.setTimeout(() => {
      toast.classList.remove("show");
      window.setTimeout(() => toast.remove(), 260);
    }, 2900);
  }

  function mount(){
    const expedition = document.querySelector(".app-shell.tab-home .hd222-expedition");
    if (!expedition) return;
    const data = missionData();
    const reward = maybeUnlockCapsule(data);
    const signature = JSON.stringify({
      mystery: data.mystery?.id || "",
      discipline: data.disciplineId,
      done: data.done,
      streak: safe(() => state.streak, 0),
      day: dateKey(),
      capsuleCount: reward.count
    });
    let root = expedition.parentElement?.querySelector(":scope > .hd263-engagement");
    if (root && signature === previousSignature) return;
    const holder = document.createElement("div");
    holder.innerHTML = renderMarkup(data, reward).trim();
    const nextRoot = holder.firstElementChild;
    if (!nextRoot) return;
    if (root) root.replaceWith(nextRoot);
    else expedition.insertAdjacentElement("afterend", nextRoot);
    previousSignature = signature;
    if (reward.unlocked) window.setTimeout(() => celebrate(nextRoot, data), 120);
  }

  function scheduleMount(){
    if (mountTimer) return;
    mountTimer = window.setTimeout(() => {
      mountTimer = null;
      mount();
    }, 32);
  }

  document.addEventListener("click", event => {
    const button = event.target.closest?.("[data-hd263-action]");
    if (!button || button.disabled) return;
    const data = missionData();
    const action = button.dataset.hd263Action;
    safe(() => window.HDSound?.play?.(action === "mystery" ? "launch" : "nav"));
    if (action === "mystery") {
      setState({ tab: "mystery", currentMysteryId: data.mystery?.id || null, currentMysteryDiscipline: data.disciplineId, currentDiscipline: data.disciplineId });
      return;
    }
    if (action === "lesson") {
      if (!openLessonByInfo(data.linked, "express")) setState({ tab: "learn", currentDiscipline: data.disciplineId });
      return;
    }
    if (action === "quiz") {
      if (!openLessonByInfo(data.linked, "quiz")) setState({ tab: "learn", currentDiscipline: data.disciplineId });
      return;
    }
    if (action === "bonus") {
      if (!openLessonByInfo(data.bonus, "express")) setState({ tab: "learn", currentDiscipline: data.disciplineId });
      return;
    }
    if (action === "catalog") setState({ tab: "learn", currentDiscipline: data.disciplineId, learnDrill: "chapters", learnFilter: "all", learnSearch: "" });
  }, true);

  const observer = new MutationObserver(scheduleMount);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) scheduleMount(); });
  window.addEventListener("focus", scheduleMount);
  window.setInterval(() => {
    const current = document.querySelector(".app-shell.tab-home .hd263-engagement");
    if (current) scheduleMount();
  }, 60000);

  document.documentElement.classList.add("hd263-engagement-ready");
  window.HDEngagement = Object.freeze({ VERSION, mount, missionData, weeklyData, readStore });
  scheduleMount();
})();
