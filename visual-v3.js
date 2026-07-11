/* HistoDaily beta 220 — Visual V3
   Refonte visuelle nette, immersive et légère. */
(function histodailyBeta220VisualV3(){
  "use strict";
  const VERSION = "1.0.0-beta.220.0";
  const esc = value => {
    try { return escapeHtml(String(value ?? "")); }
    catch { return String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[char]); }
  };
  const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
  const safe = (fn, fallback = null) => { try { const value = fn(); return value ?? fallback; } catch { return fallback; } };

  document.documentElement.classList.add("hd220-visual");

  function disciplineLabel(discipline){
    const labels = { history:"Histoire", art:"Art", cinema:"Cinéma", "science-inventions":"Sciences", economy:"Économie", geography:"Géo", music:"Musique" };
    return labels[discipline?.id] || discipline?.title || "Explorer";
  }

  function disciplineLessons(id){
    const lessons = safe(() => curatedLessons(), []) || [];
    return lessons.filter(lesson => safe(() => lessonDisciplineId(lesson), "history") === id);
  }

  function lessonTitle(lesson){
    if (!lesson) return "Choisis ton prochain cours";
    const content = safe(() => buildLessonContent(lesson), null);
    return content?.title || lesson.title || "Nouveau cours";
  }

  function lessonMeta(lesson){
    if (!lesson) return "Tout le catalogue reste accessible";
    const world = safe(() => lessonWorld(lesson), null);
    return [world?.title, lesson.period || lesson.location].filter(Boolean).slice(0, 2).join(" · ") || "3 min de lecture";
  }

  function openLesson(lesson, view = "express"){
    if (!lesson) return;
    const world = safe(() => lessonWorld(lesson), {}) || {};
    const disciplineId = safe(() => lessonDisciplineId(lesson), activeDisciplineId()) || activeDisciplineId();
    setState({
      tab: "lesson",
      currentLessonId: lesson.id,
      currentDiscipline: disciplineId,
      currentWorld: world.id || state.currentWorld,
      currentGroup: world.group || state.currentGroup,
      lessonView: view,
      lessonFocus: null
    });
  }

  function openCatalog(disciplineId){
    const lessons = disciplineLessons(disciplineId);
    const first = lessons[0];
    const world = first ? safe(() => lessonWorld(first), {}) : {};
    setState({
      tab: "learn",
      currentDiscipline: disciplineId,
      currentWorld: world?.id || state.currentWorld,
      currentGroup: world?.group || state.currentGroup,
      learnDrill: "chapters",
      learnFilter: "all",
      learnSearch: ""
    });
  }

  function homeStage(mystery, lesson){
    const solved = Boolean(mystery?.id && safe(() => mysterySolved(mystery.id), false));
    const courseDone = Boolean(lesson?.id && safe(() => lessonDone(lesson.id), false));
    const quizDone = Boolean(lesson?.id && safe(() => lessonQuizPassed(lesson.id), false));
    if (!mystery) return { index:1, type:"catalog", eyebrow:"Exploration libre", title:"Choisis une nouvelle destination", text:"Tous les parcours restent ouverts, même sans dossier quotidien.", action:"Explorer les cours", meta:"Accès libre" };
    if (!solved) return {
      index:1,
      type:"mystery",
      eyebrow:"Dossier du jour",
      title:safe(() => mysteryDisplayTitle(mystery), mystery.title || "Le mystère du jour"),
      text:safe(() => mysteryTeaser(mystery), mystery.teaser || mystery.prompt || "Observe les indices et trouve la réponse."),
      action:"Ouvrir l’expédition",
      meta:`+${safe(() => dailyRewardPreview().gems, 1)} gemme aujourd’hui`
    };
    if (lesson && !courseDone) return { index:2, type:"lesson", view:"express", eyebrow:"Comprendre", title:lessonTitle(lesson), text:"Le dossier est résolu. Découvre maintenant pourquoi cette réponse a changé son époque.", action:"Lire le cours", meta:"3 min environ" };
    if (lesson && !quizDone) return { index:3, type:"lesson", view:"quiz", eyebrow:"Relier", title:"Transforme l’idée en souvenir", text:`Cinq questions pour fixer l’essentiel de « ${lessonTitle(lesson)} » sans tout relire.`, action:"Lancer le quiz", meta:"5 questions" };
    return { index:4, type:lesson ? "lesson" : "mystery", view:"complete", eyebrow:"Expédition terminée", title:"Mission accomplie", text:lesson ? `Le dossier et « ${lessonTitle(lesson)} » sont validés.` : "Le dossier du jour est validé.", action:lesson ? "Revoir le cours" : "Revoir le dossier", meta:`Nouveau dossier dans ${safe(() => timeToNextDaily(), "quelques heures")}` };
  }

  function disciplineSelector(activeId){
    return `<nav class="hd220-world-switcher" aria-label="Choisir une discipline">
      ${DISCIPLINES.map(discipline => {
        const active = discipline.id === activeId;
        const lessons = disciplineLessons(discipline.id);
        const done = lessons.filter(lesson => safe(() => lessonDone(lesson.id), false)).length;
        const progress = lessons.length ? Math.round(done / lessons.length * 100) : 0;
        const icon = safe(() => HD_ICONS.rawDiscipline(discipline), "") || safe(() => HD_ICONS.discipline(discipline), discipline.emoji || "•");
        return `<button type="button" class="hd220-world ${active ? "active" : ""}" data-hd220-discipline="${esc(discipline.id)}" style="--world:${esc(discipline.accent)}" aria-pressed="${active}">
          <span>${icon}</span><b>${esc(disciplineLabel(discipline))}</b><i>${progress}%</i>
        </button>`;
      }).join("")}
    </nav>`;
  }

  function expeditionRoute(index){
    const labels = ["Résoudre", "Comprendre", "Relier", "Retenir"];
    return `<div class="hd220-route" aria-label="Parcours du jour">
      ${labels.map((label, i) => {
        const step = i + 1;
        const status = step < index ? "done" : step === index ? "current" : "future";
        return `<div class="${status}"><span>${step < index ? "✓" : step}</span><b>${esc(label)}</b></div>`;
      }).join("")}
    </div>`;
  }

  function renderHomeV3(){
    const disciplineId = activeDisciplineId();
    const discipline = disciplineById(disciplineId);
    const mystery = safe(() => dailyMystery(), null);
    const linkedLesson = mystery?.lessonId ? safe(() => lessonById(mystery.lessonId), null) : null;
    const stage = homeStage(mystery, linkedLesson);
    const lessons = disciplineLessons(disciplineId);
    const completed = lessons.filter(lesson => safe(() => lessonDone(lesson.id), false)).length;
    const progress = lessons.length ? Math.round(completed / lessons.length * 100) : 0;
    const unfinished = lessons.filter(lesson => !safe(() => lessonDone(lesson.id), false) && String(lesson.id) !== String(linkedLesson?.id || ""));
    const resume = unfinished[0] || lessons[0] || null;
    const discovery = unfinished.find(lesson => String(lesson.id) !== String(resume?.id || "")) || lessons[1] || resume;
    const pseudo = String(state.pseudo || "").trim();
    const greeting = pseudo && !/^invité$/i.test(pseudo) ? `Salut ${pseudo}` : "Bonjour";
    const art = safe(() => HD_ART.hero(disciplineId), "");
    const heroIcon = safe(() => HD_ICONS.discipline(discipline), discipline.emoji || "✦");

    renderShell(`<div class="hd220-home" style="--world:${esc(discipline.accent)}">
      <header class="hd220-home-head">
        <div class="hd220-brand"><span>HistoDaily</span><h1>${esc(greeting)}</h1></div>
        <div class="hd220-head-metrics"><button type="button" data-hd220-profile aria-label="Ouvrir le profil"><span>🔥</span><b>${state.streak || 0}</b></button><button type="button" data-hd220-profile><span>Niv.</span><b>${level()}</b></button></div>
      </header>

      <section class="hd220-worlds">
        <div class="hd220-section-cap"><span>Ton univers</span><b>${esc(discipline.title)}</b></div>
        ${disciplineSelector(disciplineId)}
      </section>

      <section class="hd220-expedition" aria-labelledby="hd220-expedition-title">
        <div class="hd220-expedition-glow" aria-hidden="true"></div>
        <div class="hd220-expedition-art" aria-hidden="true">${art}</div>
        <div class="hd220-expedition-top"><span>${esc(stage.eyebrow)}</span><b><i>${stage.index}</i>/4</b></div>
        <div class="hd220-expedition-copy">
          <div class="hd220-expedition-symbol">${heroIcon}</div>
          <h2 id="hd220-expedition-title">${esc(stage.title)}</h2>
          <p>${esc(stage.text)}</p>
        </div>
        <div class="hd220-expedition-action">
          <button type="button" data-hd220-expedition><span>${esc(stage.action)}</span><b>↗</b></button>
          <small>${esc(stage.meta)}</small>
        </div>
        ${expeditionRoute(stage.index)}
      </section>

      <section class="hd220-progress-strip">
        <div><span>Parcours ${esc(disciplineLabel(discipline))}</span><b>${completed}/${lessons.length || 0}</b></div>
        <i><em style="width:${clamp(progress, 2, 100)}%"></em></i>
        <button type="button" data-hd220-catalog>Voir la carte</button>
      </section>

      <section class="hd220-next">
        <div class="hd220-section-cap"><span>Prochaines escales</span><b>${progress}% exploré</b></div>
        <div class="hd220-next-rail">
          <article class="hd220-next-card primary" data-hd220-open-lesson="${esc(resume?.id || "")}" role="button" tabindex="0">
            <div class="hd220-next-icon">${resume ? safe(() => HD_ICONS.lesson(resume, lessonWorld(resume), discipline), heroIcon) : heroIcon}</div>
            <small>À continuer</small><h3>${esc(lessonTitle(resume))}</h3><p>${esc(lessonMeta(resume))}</p><span>Reprendre <b>→</b></span>
          </article>
          <article class="hd220-next-card" data-hd220-open-lesson="${esc(discovery?.id || "")}" role="button" tabindex="0">
            <div class="hd220-next-icon">${discovery ? safe(() => HD_ICONS.lesson(discovery, lessonWorld(discovery), discipline), heroIcon) : heroIcon}</div>
            <small>À découvrir</small><h3>${esc(lessonTitle(discovery))}</h3><p>${esc(lessonMeta(discovery))}</p><span>Découvrir <b>→</b></span>
          </article>
        </div>
      </section>
    </div>`);

    const shell = document.querySelector(".app-shell.tab-home");
    shell?.classList.add("hd220-home-shell");
    if (shell) shell.dataset.hd187Enhanced = "1";

    shell?.querySelectorAll("[data-hd220-discipline]").forEach(button => button.addEventListener("click", () => {
      const nextId = button.dataset.hd220Discipline;
      const first = disciplineLessons(nextId)[0];
      const world = first ? safe(() => lessonWorld(first), {}) : {};
      setState({ currentDiscipline: nextId, currentWorld: world?.id || state.currentWorld, currentGroup: world?.group || state.currentGroup });
    }));
    shell?.querySelectorAll("[data-hd220-profile]").forEach(button => button.addEventListener("click", () => setState({ tab:"profile" })));
    shell?.querySelector("[data-hd220-catalog]")?.addEventListener("click", () => openCatalog(disciplineId));
    shell?.querySelector("[data-hd220-expedition]")?.addEventListener("click", () => {
      if (stage.type === "mystery") return setState({ tab:"mystery", currentMysteryId:mystery?.id || null, currentMysteryDiscipline:disciplineId, currentDiscipline:disciplineId });
      if (stage.type === "lesson" && linkedLesson) return openLesson(linkedLesson, stage.view || "express");
      if (stage.type === "catalog") return openCatalog(disciplineId);
      if (linkedLesson) return openLesson(linkedLesson, stage.view || "complete");
      return setState({ tab:"mystery" });
    });
    shell?.querySelectorAll("[data-hd220-open-lesson]").forEach(card => {
      const launch = () => {
        const id = card.dataset.hd220OpenLesson;
        const lesson = id ? safe(() => lessonById(id), null) : null;
        lesson ? openLesson(lesson, "express") : openCatalog(disciplineId);
      };
      card.addEventListener("click", launch);
      card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); launch(); } });
    });
  }

  function initials(name){
    const parts = String(name || "Invité").trim().split(/\s+/).filter(Boolean);
    return (parts.slice(0,2).map(part => part[0]).join("") || "H").toUpperCase();
  }

  function extractCollections(shell){
    return [...shell.querySelectorAll(".beta179-profile-collections .beta179-collection-card")].slice(0, 6).map(card => ({
      icon: card.querySelector(".beta179-medal")?.innerHTML || safe(() => HD_ICONS.action("lock"), "◆"),
      title: card.querySelector("h3")?.textContent?.trim() || "Collection",
      meta: card.querySelector("small")?.textContent?.trim() || "À explorer",
      progress: parseFloat(card.querySelector(".beta179-mini-progress i")?.style?.width || "0") || 0,
      unlocked: card.classList.contains("unlocked"),
      accent: card.style.getPropertyValue("--collection-accent") || "#f6c453"
    }));
  }

  function extractAchievements(shell){
    return [...shell.querySelectorAll(".achievement-grid .achievement")].slice(0, 8).map(card => ({
      icon: card.querySelector("b")?.innerHTML || "✦",
      label: card.querySelector("span")?.textContent?.trim() || "Succès",
      unlocked: card.classList.contains("on")
    }));
  }

  function extractMastery(shell){
    return [...shell.querySelectorAll(".beta179-profile-mastery .beta179-mastery-row")].slice(0, 4).map(row => ({
      icon: row.querySelector(":scope > span")?.innerHTML || "•",
      title: row.querySelector("strong")?.textContent?.trim() || "Domaine",
      score: parseFloat(row.querySelector("b")?.textContent || "0") || 0,
      accent: row.style.getPropertyValue("--mastery-accent") || "#56d6ff"
    }));
  }

  function curiosityModel(){
    const data = safe(() => window.HistoDaily?.conceptDebug?.curiosityData?.(), null) || {};
    const favorites = (data.favorites || []).slice(0, 3);
    const fallback = DISCIPLINES.slice(0, 3).map(discipline => ({ discipline, completed:0, reviews:0 }));
    return {
      favorites: favorites.length ? favorites : fallback,
      weak: data.weak || null,
      unexplored: data.unexplored || null
    };
  }

  function mountProfileV3(){
    const shell = document.querySelector(".app-shell.tab-profile");
    if (!shell) return;
    shell.classList.add("hd220-profile-shell");
    const collections = extractCollections(shell);
    const achievements = extractAchievements(shell);
    const mastery = extractMastery(shell);
    const curiosity = curiosityModel();
    const name = String(state.pseudo || "Invité").trim() || "Invité";
    const xp = Number(state.xp || 0);
    const currentLevel = level();
    const base = Math.max(0, (currentLevel - 1) * 250);
    const next = Math.max(base + 250, currentLevel * 250);
    const levelPct = clamp(Math.round((xp - base) / Math.max(1, next - base) * 100), 3, 100);
    const solved = Object.keys(state.solvedMysteries || {}).length;
    const completed = safe(() => curatedLessons().filter(lesson => lessonDone(lesson.id)).length, 0);
    const fav = curiosity.favorites[0]?.discipline || disciplineById(activeDisciplineId());
    const weak = curiosity.weak?.discipline || fav;
    const nextDisc = curiosity.unexplored?.discipline || curiosity.favorites[1]?.discipline || DISCIPLINES.find(item => item.id !== fav.id) || fav;
    let root = shell.querySelector(".hd220-profile");
    if (!root) {
      root = document.createElement("div");
      root.className = "hd220-profile";
      const status = shell.querySelector(":scope > .system-status, :scope > .beta115-status");
      if (status) status.insertAdjacentElement("afterend", root); else shell.insertAdjacentElement("afterbegin", root);
    }
    root.style.setProperty("--world", fav.accent || "#f6c453");
    root.innerHTML = `
      <header class="hd220-profile-head"><div><span>Espace joueur</span><h1>Ton profil</h1></div><button type="button" data-hd220-edit-profile>Modifier</button></header>
      <section class="hd220-player-hero">
        <div class="hd220-avatar-ring" style="--level:${levelPct * 3.6}deg"><div>${esc(initials(name))}</div></div>
        <div class="hd220-player-copy"><span>Explorateur · Niveau ${currentLevel}</span><h2>${esc(name)}</h2><p>Ton parcours de curiosité se construit à chaque cours.</p></div>
        <div class="hd220-player-stats"><div><b>${xp}</b><span>XP</span></div><div><b>${state.streak || 0}</b><span>Série</span></div><div><b>${solved}</b><span>Mystères</span></div></div>
        <div class="hd220-xp"><div><span>Niveau ${currentLevel}</span><b>${levelPct}%</b></div><i><em style="width:${levelPct}%"></em></i></div>
      </section>

      <section class="hd220-curiosity-v3">
        <div class="hd220-section-cap"><span>Carte de curiosité</span><button type="button" data-hd220-map>Ouvrir la carte</button></div>
        <div class="hd220-constellation">
          <div class="hd220-orbit one"></div><div class="hd220-orbit two"></div>
          <div class="hd220-you"><b>${esc(initials(name))}</b><span>Toi</span></div>
          <article class="hd220-star favorite" style="--star:${esc(fav.accent)}"><span>${safe(() => HD_ICONS.discipline(fav), fav.emoji || "✦")}</span><small>Affinité</small><b>${esc(disciplineLabel(fav))}</b></article>
          <article class="hd220-star memory" style="--star:${esc(weak.accent)}"><span>${safe(() => HD_ICONS.discipline(weak), weak.emoji || "↻")}</span><small>À renforcer</small><b>${esc(disciplineLabel(weak))}</b></article>
          <article class="hd220-star discovery" style="--star:${esc(nextDisc.accent)}"><span>${safe(() => HD_ICONS.discipline(nextDisc), nextDisc.emoji || "◇")}</span><small>Prochaine piste</small><b>${esc(disciplineLabel(nextDisc))}</b></article>
        </div>
      </section>

      <section class="hd220-collection-v3">
        <div class="hd220-section-cap"><div><span>Collections</span><h2>Tes trophées d’exploration</h2></div><button type="button" data-hd220-all-collections>Tout voir</button></div>
        <div class="hd220-collection-rail">
          ${(collections.length ? collections : [{icon:"◇",title:"Première collection",meta:"Commence un parcours",progress:0,unlocked:false,accent:"#f6c453"}]).map(item => `<article class="hd220-medal-card ${item.unlocked ? "unlocked" : ""}" style="--medal:${esc(item.accent)}">
            <div class="hd220-medal-icon">${item.icon}</div><small>${item.unlocked ? "Débloquée" : "En progression"}</small><h3>${esc(item.title)}</h3><i><em style="width:${clamp(item.progress, 2, 100)}%"></em></i><p>${esc(item.meta)}</p>
          </article>`).join("")}
        </div>
      </section>

      <section class="hd220-progress-v3">
        <div class="hd220-section-cap"><div><span>Maîtrise</span><h2>Ce qui devient solide</h2></div><button type="button" data-hd220-review>Réviser</button></div>
        <div class="hd220-mastery-grid">
          ${(mastery.length ? mastery : DISCIPLINES.slice(0,4).map(discipline => ({icon:HD_ICONS.discipline(discipline),title:disciplineLabel(discipline),score:0,accent:discipline.accent}))).map(item => `<article style="--mastery:${esc(item.accent)}"><div class="hd220-score-ring" style="--score:${clamp(item.score,0,100) * 3.6}deg"><span>${item.icon}</span></div><div><b>${esc(item.title)}</b><small>${Math.round(item.score)}% maîtrisé</small></div></article>`).join("")}
        </div>
      </section>

      <section class="hd220-achievements-v3">
        <div class="hd220-section-cap"><div><span>Succès</span><h2>Étapes marquantes</h2></div><b>${achievements.filter(item => item.unlocked).length}/${achievements.length || 6}</b></div>
        <div class="hd220-badge-rail">${(achievements.length ? achievements : [{icon:"✦",label:"Première victoire",unlocked:false}]).map(item => `<article class="${item.unlocked ? "on" : "off"}"><div>${item.icon}</div><span>${esc(item.label)}</span></article>`).join("")}</div>
      </section>

      <section class="hd220-profile-summary"><div><b>${completed}</b><span>Cours validés</span></div><div><b>${collections.filter(item => item.unlocked).length}</b><span>Collections</span></div><div><b>${Object.values(state.achievements || {}).filter(Boolean).length}</b><span>Succès</span></div></section>
    `;

    const legacySelectors = [
      ":scope > .topbar", ":scope > .public-profile-card", ":scope > .discipline-wheel", ":scope > .hd187-curiosity-card", ":scope > .hd217-curiosity-card",
      ":scope > .beta179-profile-collections", ":scope > .beta181-weekly-card", ":scope > .beta179-profile-mastery", ":scope > .culture-profile-card", ":scope > .achievement-grid"
    ];
    legacySelectors.forEach(selector => shell.querySelectorAll(selector).forEach(node => node.classList.add("hd220-legacy-hidden")));

    const openFold = id => {
      const fold = shell.querySelector(`[data-beta182-fold="${id}"]`);
      if (!fold) return;
      fold.open = true;
      fold.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    root.querySelector("[data-hd220-edit-profile]")?.addEventListener("click", () => openFold("social"));
    root.querySelector("[data-hd220-map]")?.addEventListener("click", () => {
      const action = window.HistoDaily?.conceptDebug?.openKnowledgeMap;
      if (typeof action === "function") action(); else openCatalog(activeDisciplineId());
    });
    root.querySelector("[data-hd220-all-collections]")?.addEventListener("click", () => {
      const old = shell.querySelector("[data-beta180-collections-all]");
      old ? old.click() : openCatalog(activeDisciplineId());
    });
    root.querySelector("[data-hd220-review]")?.addEventListener("click", () => {
      const old = shell.querySelector("[data-beta179-review]");
      old ? old.click() : openCatalog(activeDisciplineId());
    });
  }

  const previousRenderProfile = typeof renderProfile === "function" ? renderProfile : null;
  if (previousRenderProfile) {
    renderProfile = function beta220RenderProfile(){
      const result = previousRenderProfile();
      [0, 90, 240].forEach(delay => window.setTimeout(mountProfileV3, delay));
      return result;
    };
  }

  renderHome = renderHomeV3;

  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version:VERSION, visualV3:true, visualV3Home:true, visualV3Profile:true };
  } catch {}

  try {
    window.setTimeout(() => {
      if (state?.tab === "home") render({ immediate:true });
      else if (state?.tab === "profile") mountProfileV3();
    }, 0);
  } catch {}
})();
