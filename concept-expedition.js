/* HistoDaily beta 187 — expédition quotidienne, recherche libre, saisons et carte du savoir. */
(function histodailyBeta187Concept(){
  "use strict";

  const VERSION = "1.0.0-beta.187";
  const ROOT_ID = "hd187-layer";
  const SEARCH_LIMIT = 24;
  const appRoot = document.getElementById("app");
  if (!appRoot || typeof state !== "object" || typeof curatedLessons !== "function") return;

  const esc = value => typeof escapeHtml === "function"
    ? escapeHtml(String(value ?? ""))
    : String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const norm = value => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const pct = (value, total) => total > 0 ? Math.max(0, Math.min(100, Math.round((Number(value) || 0) * 100 / total))) : 0;
  const safeArray = value => Array.isArray(value) ? value : [];
  const unique = items => [...new Map(items.filter(Boolean).map(item => [String(item.id), item])).values()];

  state.expeditionPreferences = state.expeditionPreferences && typeof state.expeditionPreferences === "object"
    ? state.expeditionPreferences
    : {};
  state.expeditionPreferences.version = VERSION;

  // L'accès libre est une règle produit : le cours peut prévenir du spoil, mais ne se verrouille jamais.
  try {
    lessonLockedByDailyMystery = function beta187NoCourseLock(){ return false; };
  } catch {}

  function allLessonsIndex(){
    return unique(curatedLessons()).map(lesson => {
      const world = typeof lessonWorld === "function" ? lessonWorld(lesson) : {};
      const disciplineId = typeof lessonDisciplineId === "function" ? lessonDisciplineId(lesson) : (world?.discipline || "history");
      const discipline = typeof disciplineById === "function" ? disciplineById(disciplineId) : (DISCIPLINES.find(item => item.id === disciplineId) || DISCIPLINES[0]);
      let pack = {};
      try { pack = (typeof READY_LESSON_PACKS === "object" && READY_LESSON_PACKS?.[lesson.id]) || {}; } catch {}
      const searchable = norm([
        lesson.title, pack?.title, pack?.hook,
        safeArray(pack?.express).join(" "),
        world?.title, world?.subtitle, discipline?.title,
        lesson?.period, lesson?.location
      ].filter(Boolean).join(" "));
      return { lesson, world, discipline, disciplineId, searchable };
    });
  }

  let searchIndexCache = null;
  function searchIndex(){
    const expected = curatedLessons().length;
    if (!searchIndexCache || searchIndexCache.length !== expected) searchIndexCache = allLessonsIndex();
    return searchIndexCache;
  }

  function openCourse(lessonId, source = "beta187"){
    const lesson = typeof lessonById === "function" ? lessonById(lessonId) : null;
    if (!lesson) return false;
    closeLayer();
    try {
      if (typeof beta118OpenLessonById === "function") return beta118OpenLessonById(lesson.id, { source });
    } catch {}
    const world = typeof lessonWorld === "function" ? lessonWorld(lesson) : {};
    const disciplineId = typeof lessonDisciplineId === "function" ? lessonDisciplineId(lesson) : (world?.discipline || "history");
    setState({
      tab: "lesson",
      currentLessonId: lesson.id,
      currentDiscipline: disciplineId,
      currentWorld: world?.id || state.currentWorld,
      currentGroup: world?.group || state.currentGroup,
      lessonView: "express",
      lessonFocus: "express",
      learnDrill: "courses"
    }, { renderImmediate: true });
    return true;
  }

  function openDiscipline(disciplineId){
    closeLayer();
    const discipline = DISCIPLINES.find(item => item.id === disciplineId) || DISCIPLINES[0];
    const worlds = typeof treeAvailableWorlds === "function" ? treeAvailableWorlds(discipline.id) : [];
    const first = worlds[0] || {};
    setState({
      tab: "learn",
      currentDiscipline: discipline.id,
      currentGroup: first.group || state.currentGroup,
      currentWorld: first.id || state.currentWorld,
      learnDrill: "chapters",
      learnFilter: "all",
      learnSearch: ""
    }, { renderImmediate: true });
  }

  function currentMysterySafe(){
    try { return typeof dailyMystery === "function" ? dailyMystery() : null; }
    catch { return null; }
  }

  function progressDebug(){
    try { return window.HistoDaily?.progressionDebug || null; }
    catch { return null; }
  }

  function dailyStatus(){
    try { return progressDebug()?.dailyPlanStatus?.() || null; }
    catch { return null; }
  }

  function relatedFor(lesson, limit = 3){
    if (!lesson) return [];
    const index = searchIndex();
    const current = index.find(item => item.lesson.id === lesson.id);
    if (!current) return [];
    const titleTokens = new Set(norm(current.lesson.title).split(" ").filter(token => token.length > 4));
    return index
      .filter(item => item.lesson.id !== lesson.id)
      .map(item => {
        let score = 0;
        if (item.disciplineId === current.disciplineId) score += 24;
        if (item.world?.id && item.world.id === current.world?.id) score += 90;
        if (item.world?.group && item.world.group === current.world?.group) score += 42;
        const candidateTokens = norm(item.lesson.title).split(" ").filter(token => token.length > 4);
        score += candidateTokens.filter(token => titleTokens.has(token)).length * 9;
        if (!lessonDone(item.lesson.id)) score += 12;
        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score || Number(lessonDone(a.lesson.id)) - Number(lessonDone(b.lesson.id)) || a.lesson.title.localeCompare(b.lesson.title, "fr"))
      .slice(0, limit)
      .map(item => item.lesson);
  }

  function expeditionData(){
    const mystery = currentMysterySafe();
    const primary = mystery?.lessonId ? lessonById(mystery.lessonId) : null;
    const fallback = searchIndex().find(item => !lessonDone(item.lesson.id))?.lesson || searchIndex()[0]?.lesson || null;
    const lesson = primary || fallback;
    const connection = relatedFor(lesson, 1)[0] || null;
    const daily = dailyStatus();
    const mysteryDone = Boolean(mystery?.id && mysterySolved(mystery.id));
    const lessonDoneNow = Boolean(lesson?.id && lessonDone(lesson.id));
    const connectionDone = Boolean(connection?.id && lessonDone(connection.id));
    const recallDone = Boolean(daily?.practiceDone);
    const done = [mysteryDone, lessonDoneNow, connectionDone, recallDone].filter(Boolean).length;
    return { mystery, lesson, connection, daily, mysteryDone, lessonDoneNow, connectionDone, recallDone, done };
  }

  function stageMarkup({ number, icon, title, text, done, current, action, disabled = false }){
    return `<button type="button" class="hd187-expedition-step ${done ? "done" : ""} ${current ? "current" : ""}" ${action ? `data-hd187-action="${esc(action)}"` : ""} ${disabled ? "disabled" : ""}>
      <span class="hd187-step-number">${done ? HD_ICONS.action("check") : icon || number}</span>
      <span><b>${esc(title)}</b><small>${esc(text)}</small></span>
    </button>`;
  }

  function expeditionMarkup(){
    const info = expeditionData();
    const mysteryTitle = info.mystery ? (typeof mysteryDisplayTitle === "function" ? mysteryDisplayTitle(info.mystery) : info.mystery.title) : "Mystère du jour";
    const lessonTitle = info.lesson?.title || "Cours associé";
    const connectionTitle = info.connection?.title || "Connexion à découvrir";
    const next = !info.mysteryDone ? "mystery" : !info.lessonDoneNow ? "lesson" : !info.connectionDone ? "connection" : !info.recallDone ? "recall" : "done";
    return `<section class="card hd187-expedition-card hd184-feature-card" style="--discipline-accent:${esc(disciplineById(activeDisciplineId()).accent)}">
      <div class="hd187-expedition-head">
        <div><span class="card-label">Expédition du jour</span><h2>Résous, comprends, relie, retiens</h2><p>Une session guidée de quelques minutes. Tu peux quitter ce parcours à tout moment et ouvrir librement n’importe quel cours.</p></div>
        <strong>${info.done}/4</strong>
      </div>
      <div class="hd187-expedition-meter"><i style="width:${pct(info.done, 4)}%"></i></div>
      <div class="hd187-expedition-steps">
        ${stageMarkup({ number: 1, icon: "?", title: "Résoudre", text: mysteryTitle, done: info.mysteryDone, current: next === "mystery", action: "mystery", disabled: !info.mystery })}
        ${stageMarkup({ number: 2, icon: "↗", title: "Comprendre", text: lessonTitle, done: info.lessonDoneNow, current: next === "lesson", action: info.lesson ? `lesson:${info.lesson.id}` : "catalog", disabled: !info.lesson })}
        ${stageMarkup({ number: 3, icon: "∞", title: "Relier", text: connectionTitle, done: info.connectionDone, current: next === "connection", action: info.connection ? `lesson:${info.connection.id}` : "map", disabled: !info.connection })}
        ${stageMarkup({ number: 4, icon: "↻", title: "Retenir", text: info.daily?.log?.planType === "review" ? "Une notion ancienne à consolider" : "Un rappel ou un second cours", done: info.recallDone, current: next === "recall", action: "recall" })}
      </div>
      <div class="hd187-expedition-footer">
        <span>${next === "done" ? "Expédition terminée pour aujourd’hui." : "Le parcours est conseillé, jamais obligatoire."}</span>
        <button type="button" data-hd187-action="${next}">${next === "mystery" ? "Commencer" : next === "lesson" ? "Voir le cours" : next === "connection" ? "Faire la connexion" : next === "recall" ? "Consolider" : "Terminé"}</button>
      </div>
    </section>`;
  }

  function seasonDefinitions(){
    const index = searchIndex();
    const byIds = ids => ids.map(id => index.find(item => item.lesson.id === id)?.lesson).filter(Boolean);
    const byTerms = (terms, max = 8) => index.filter(item => terms.some(term => item.searchable.includes(norm(term)))).map(item => item.lesson).slice(0, max);
    return [
      {
        id: "solar-frontiers",
        title: "Aux frontières du Système solaire",
        icon: "astronomy",
        description: "Planètes géantes, lunes océaniques, comètes et exploration des mondes lointains.",
        lessons: byIds(["astro-solar-system-formation", "astro-rocky-planets", "astro-giant-planets", "astro-ocean-moons", "astro-asteroids-comets", "astro-meteors-impacts", "astro-rockets-orbits", "astro-moon-mars-exploration"])
      },
      {
        id: "change-the-world",
        title: "Les idées qui ont changé le monde",
        icon: "science",
        description: "Découvertes, techniques et ruptures intellectuelles qui transforment notre façon de comprendre.",
        lessons: byTerms(["imprimerie", "radioactiv", "ordinateur", "galilee", "vaccin", "monnaie", "perspective"], 8)
      },
      {
        id: "images-and-power",
        title: "Images, récits et pouvoir",
        icon: "art",
        description: "Art, cinéma, symboles et récits collectifs : comment les images façonnent une société.",
        lessons: byTerms(["cinema", "film", "art", "image", "propagande", "architecture", "cubisme", "street art"], 8)
      }
    ].map(season => ({ ...season, lessons: unique(season.lessons) })).filter(season => season.lessons.length);
  }

  function seasonProgress(season){
    const done = season.lessons.filter(lesson => lessonDone(lesson.id)).length;
    return { done, total: season.lessons.length, progress: pct(done, season.lessons.length), next: season.lessons.find(lesson => !lessonDone(lesson.id)) || season.lessons[0] };
  }

  function currentSeason(){ return seasonDefinitions()[0] || null; }

  function seasonMarkup(){
    const season = currentSeason();
    if (!season) return "";
    const progress = seasonProgress(season);
    return `<section class="card hd187-season-card">
      <div class="section-title-row"><div><span class="card-label">Saison éditoriale</span><h2>${HD_ICONS.action(season.icon || HD_ICONS.fromText(season.title, "spark"))} ${esc(season.title)}</h2><p>${esc(season.description)}</p></div><strong>${progress.progress}%</strong></div>
      <div class="hd187-season-progress"><i style="width:${progress.progress}%"></i></div>
      <div class="hd187-season-footer"><span>${progress.done}/${progress.total} cours · tous restent accessibles dans le catalogue</span><div><button type="button" class="ghost" data-hd187-open-seasons>Voir la saison</button><button type="button" data-hd187-season-next="${esc(progress.next?.id || "")}">${progress.done >= progress.total ? "Revoir" : "Continuer"}</button></div></div>
    </section>`;
  }

  function freeExploreMarkup(){
    const lessons = searchIndex();
    return `<section class="card hd187-free-card">
      <div class="section-title-row"><div><span class="card-label">Explorer librement</span><h2>Tu cherches un sujet précis ?</h2><p>${lessons.length} cours restent disponibles à tout moment, indépendamment de l’expédition et de la saison.</p></div><small>Accès libre</small></div>
      <div class="hd187-free-actions">
        <button type="button" data-hd187-open-search><span>⌕</span><b>Rechercher un cours</b><small>Titre, thème, discipline ou mot-clé</small></button>
        <button type="button" data-hd187-open-map><span>${HD_ICONS.action("map")}</span><b>Carte du savoir</b><small>Voir les domaines et leurs connexions</small></button>
        <button type="button" data-hd187-open-catalog><span>${HD_ICONS.action("catalog")}</span><b>Catalogue complet</b><small>Parcourir librement les chapitres</small></button>
      </div>
    </section>`;
  }

  function removeOldHomeBlocks(shell){
    shell.querySelectorAll(".beta180-daily-plan,.home-continue-card,.home-discovery-card,.home-secondary-actions").forEach(node => node.remove());
  }

  function enhanceHome(){
    const shell = document.querySelector(".app-shell.tab-home");
    if (!shell || shell.dataset.hd187Enhanced === "1") return;
    shell.dataset.hd187Enhanced = "1";
    removeOldHomeBlocks(shell);
    const mysteryCard = shell.querySelector(".home-mystery-card") || shell.querySelector(".home-main-card");
    if (mysteryCard) {
      mysteryCard.insertAdjacentHTML("beforebegin", expeditionMarkup());
      // Le mystère reste consultable dans l'expédition, donc sa carte séparée devient inutile.
      if (mysteryCard.classList.contains("home-mystery-card")) mysteryCard.remove();
    } else {
      shell.querySelector(".hero")?.insertAdjacentHTML("afterend", expeditionMarkup());
    }
    const release = shell.querySelector(".release-notes-card,.release-card");
    const anchor = release || shell.querySelector(".bottom-nav");
    if (anchor) anchor.insertAdjacentHTML("beforebegin", `${seasonMarkup()}${freeExploreMarkup()}`);
    else shell.insertAdjacentHTML("beforeend", `${seasonMarkup()}${freeExploreMarkup()}`);
    bindShellActions(shell);
  }

  function globalSearchBarMarkup(){
    return `<section class="card hd187-search-entry">
      <button type="button" data-hd187-open-search><span>⌕</span><div><b>Rechercher dans tous les cours</b><small>Ouvre directement n’importe quel sujet, quelle que soit la discipline.</small></div><em>${searchIndex().length}</em></button>
    </section>`;
  }

  function enhanceLearn(){
    const shell = document.querySelector(".app-shell.tab-learn");
    if (!shell || shell.dataset.hd187Enhanced === "1") return;
    shell.dataset.hd187Enhanced = "1";
    const picker = shell.querySelector(".beta182-discipline-picker,.discipline-picker,.topbar");
    if (picker) picker.insertAdjacentHTML("beforebegin", globalSearchBarMarkup());
    else shell.insertAdjacentHTML("afterbegin", globalSearchBarMarkup());
    bindShellActions(shell);
  }

  function curiosityData(){
    const rows = DISCIPLINES.map(discipline => {
      const lessons = searchIndex().filter(item => item.disciplineId === discipline.id).map(item => item.lesson);
      const completed = lessons.filter(lesson => lessonDone(lesson.id)).length;
      const attempts = lessons.reduce((sum, lesson) => {
        const progress = state.quizProgress?.[lesson.id] || {};
        return sum + Object.keys(progress.answers || {}).length;
      }, 0);
      const reviews = Object.values(state.reviewQueue || {}).filter(entry => {
        const lesson = lessonById(entry?.lessonId);
        return lesson && lessonDisciplineId(lesson) === discipline.id;
      }).length;
      return { discipline, total: lessons.length, completed, attempts, reviews, interest: completed * 5 + attempts };
    }).filter(row => row.total);
    const favorites = rows.slice().sort((a, b) => b.interest - a.interest || b.completed - a.completed).slice(0, 3);
    const weak = rows.filter(row => row.reviews > 0).sort((a, b) => b.reviews - a.reviews)[0] || rows.slice().sort((a, b) => pct(a.completed, a.total) - pct(b.completed, b.total))[0];
    const unexplored = rows.filter(row => row.completed === 0).sort((a, b) => b.total - a.total)[0] || null;
    return { rows, favorites, weak, unexplored };
  }

  function curiosityMarkup(){
    const data = curiosityData();
    const favorite = data.favorites[0];
    return `<section class="card hd187-curiosity-card">
      <div class="section-title-row"><div><span class="card-label">Profil de curiosité</span><h2>${favorite ? `${HD_ICONS.discipline(favorite.discipline)} Ton univers personnel se dessine` : "Commence à construire ton profil"}</h2><p>Les recommandations combinent tes goûts, les notions à consolider et une part de découverte inattendue.</p></div><button type="button" class="ghost" data-hd187-open-map>Voir la carte</button></div>
      <div class="hd187-curiosity-grid">
        <div><span>Affinités</span><b>${data.favorites.length ? data.favorites.map(row => `${HD_ICONS.discipline(row.discipline)} ${row.discipline.title}`).join(" · ") : "Encore aucune tendance"}</b></div>
        <div><span>À consolider</span><b>${data.weak ? `${HD_ICONS.discipline(data.weak.discipline)} ${data.weak.discipline.title}${data.weak.reviews ? ` · ${data.weak.reviews} rappel${data.weak.reviews > 1 ? "s" : ""}` : ""}` : "Mémoire à jour"}</b></div>
        <div><span>Découverte proposée</span><b>${data.unexplored ? `${HD_ICONS.discipline(data.unexplored.discipline)} ${data.unexplored.discipline.title}` : "Explorer une connexion inattendue"}</b></div>
      </div>
    </section>`;
  }

  function enhanceProfile(){
    const shell = document.querySelector(".app-shell.tab-profile");
    if (!shell || shell.dataset.hd187Enhanced === "1") return;
    shell.dataset.hd187Enhanced = "1";
    const target = shell.querySelector(".beta181-weekly-card,.beta179-profile-mastery,.public-profile-card,.topbar");
    if (target) target.insertAdjacentHTML("beforebegin", curiosityMarkup());
    else shell.insertAdjacentHTML("afterbegin", curiosityMarkup());
    bindShellActions(shell);
  }

  function injectSpoilerChoice(){
    const shell = document.querySelector(".app-shell.tab-lesson");
    if (!shell || shell.querySelector(".hd187-spoiler-note")) return;
    const mystery = currentMysterySafe();
    if (!mystery?.lessonId || mysterySolved(mystery.id) || String(mystery.lessonId) !== String(state.currentLessonId)) return;
    const note = document.createElement("aside");
    note.className = "hd187-spoiler-note";
    note.innerHTML = `<span>!</span><div><b>Ce cours peut révéler le mystère du jour.</b><p>Tu as demandé un accès totalement libre : le cours reste ouvert. Tu peux aussi revenir au mystère avant de poursuivre.</p></div><button type="button" data-hd187-action="mystery">Voir le mystère</button>`;
    const reading = shell.querySelector(".reading-card,.lesson-full-page");
    reading?.insertAdjacentElement("beforebegin", note);
    bindShellActions(shell);
  }

  function closeLayer(){
    document.getElementById(ROOT_ID)?.remove();
    document.body.classList.remove("hd187-layer-open");
  }

  function layer(title, subtitle, body, extraClass = ""){
    closeLayer();
    const overlay = document.createElement("div");
    overlay.id = ROOT_ID;
    overlay.className = `hd187-layer ${extraClass}`;
    overlay.innerHTML = `<div class="hd187-layer-backdrop" data-hd187-close></div><section class="hd187-layer-panel" role="dialog" aria-modal="true" aria-labelledby="hd187-layer-title"><header><div><span>HistoDaily</span><h2 id="hd187-layer-title">${esc(title)}</h2><p>${esc(subtitle)}</p></div><button type="button" class="ghost" data-hd187-close aria-label="Fermer">×</button></header><div class="hd187-layer-body">${body}</div></section>`;
    document.body.appendChild(overlay);
    document.body.classList.add("hd187-layer-open");
    overlay.querySelectorAll("[data-hd187-close]").forEach(node => node.addEventListener("click", closeLayer));
    overlay.addEventListener("keydown", event => { if (event.key === "Escape") closeLayer(); });
    window.setTimeout(() => overlay.querySelector("input,button")?.focus(), 0);
    return overlay;
  }

  let searchDiscipline = "all";
  function searchResults(query = "", disciplineId = searchDiscipline){
    const q = norm(query);
    const terms = q.split(" ").filter(Boolean);
    return searchIndex()
      .filter(item => disciplineId === "all" || item.disciplineId === disciplineId)
      .map(item => {
        if (!terms.length) return { ...item, score: lessonDone(item.lesson.id) ? 0 : 1 };
        let score = 0;
        const title = norm(item.lesson.title);
        terms.forEach(term => {
          if (title === term) score += 100;
          else if (title.startsWith(term)) score += 45;
          else if (title.includes(term)) score += 25;
          if (norm(item.world?.title).includes(term)) score += 12;
          if (norm(item.discipline?.title).includes(term)) score += 9;
          if (item.searchable.includes(term)) score += 4;
        });
        return { ...item, score };
      })
      .filter(item => !terms.length || item.score > 0)
      .sort((a, b) => b.score - a.score || Number(lessonDone(a.lesson.id)) - Number(lessonDone(b.lesson.id)) || a.lesson.title.localeCompare(b.lesson.title, "fr"))
      .slice(0, SEARCH_LIMIT);
  }

  function searchResultsMarkup(query = "", disciplineId = searchDiscipline){
    const results = searchResults(query, disciplineId);
    if (!results.length) return `<div class="hd187-empty"><b>Aucun cours trouvé</b><p>Essaie un mot plus large, comme « étoile », « Rome », « inflation » ou « cubisme ».</p></div>`;
    return `<div class="hd187-search-results">${results.map(item => `<button type="button" data-hd187-course="${esc(item.lesson.id)}" class="${lessonDone(item.lesson.id) ? "done" : ""}"><span>${HD_ICONS.lesson(item.lesson, item.world, item.discipline)}</span><div><b>${esc(item.lesson.title)}</b><small>${esc(item.discipline?.title || "Cours")} · ${esc(item.world?.title || "Parcours")}</small></div><em>${lessonDone(item.lesson.id) ? "Validé" : "Ouvrir"}</em></button>`).join("")}</div>`;
  }

  function openSearch(initial = ""){
    searchDiscipline = "all";
    const filters = [`<button type="button" data-hd187-search-discipline="all" class="active">Tout</button>`]
      .concat(DISCIPLINES.map(d => `<button type="button" data-hd187-search-discipline="${esc(d.id)}">${HD_ICONS.discipline(d)} ${esc(d.title)}</button>`)).join("");
    const overlay = layer("Rechercher un cours", "Tous les sujets restent accessibles librement.", `<div class="hd187-search-box"><span>⌕</span><input type="search" data-hd187-search-input value="${esc(initial)}" placeholder="Ex. trous noirs, Vikings, inflation…" autocomplete="off" /></div><div class="hd187-search-filters">${filters}</div><div data-hd187-search-output>${searchResultsMarkup(initial)}</div>`, "hd187-search-layer");
    const input = overlay.querySelector("[data-hd187-search-input]");
    const output = overlay.querySelector("[data-hd187-search-output]");
    const redraw = () => {
      output.innerHTML = searchResultsMarkup(input.value, searchDiscipline);
      output.querySelectorAll("[data-hd187-course]").forEach(button => button.addEventListener("click", () => openCourse(button.dataset.hd187Course, "global-search")));
    };
    overlay.querySelectorAll("[data-hd187-search-discipline]").forEach(button => button.addEventListener("click", () => {
      searchDiscipline = button.dataset.hd187SearchDiscipline;
      overlay.querySelectorAll("[data-hd187-search-discipline]").forEach(item => item.classList.toggle("active", item === button));
      redraw();
    }));
    input.addEventListener("input", redraw);
    redraw();
    input.focus();
  }

  function knowledgeMapMarkup(){
    const rows = curiosityData().rows;
    const activeId = typeof activeDisciplineId === "function" ? activeDisciplineId() : state.currentDiscipline;
    const active = rows.find(row => row.discipline.id === activeId) || rows[0];
    const activeLessons = searchIndex().filter(item => item.disciplineId === active?.discipline.id);
    const nodes = activeLessons.filter(item => lessonDone(item.lesson.id)).slice(-3).concat(activeLessons.filter(item => !lessonDone(item.lesson.id)).slice(0, 4));
    return `<div class="hd187-map-intro"><b>Ta carte grandit avec chaque cours validé.</b><p>Les domaines restent des portes d’entrée libres ; les connexions servent seulement à te proposer le chemin suivant.</p></div>
      <div class="hd187-map-domains">${rows.map(row => `<button type="button" data-hd187-map-discipline="${esc(row.discipline.id)}" class="${row.discipline.id === active?.discipline.id ? "active" : ""}" style="--node-accent:${esc(row.discipline.accent)}"><span>${HD_ICONS.discipline(row.discipline)}</span><b>${esc(row.discipline.title)}</b><small>${row.completed}/${row.total} · ${pct(row.completed, row.total)}%</small></button>`).join("")}</div>
      ${active ? `<section class="hd187-constellation" style="--node-accent:${esc(active.discipline.accent)}"><div class="hd187-constellation-core"><span>${HD_ICONS.discipline(active.discipline)}</span><b>${esc(active.discipline.title)}</b></div><div class="hd187-constellation-nodes">${nodes.map((item, index) => `<button type="button" data-hd187-course="${esc(item.lesson.id)}" class="${lessonDone(item.lesson.id) ? "done" : ""}" style="--orbit:${index}"><span>${HD_ICONS.lesson(item.lesson, item.world, active.discipline)}</span><b>${esc(item.lesson.title)}</b><small>${lessonDone(item.lesson.id) ? "Acquis" : "À explorer"}</small></button>`).join("")}</div></section>` : ""}`;
  }

  function openKnowledgeMap(){
    const overlay = layer("Carte du savoir", "Une navigation visuelle entre les domaines et les notions.", knowledgeMapMarkup(), "hd187-map-layer");
    overlay.querySelectorAll("[data-hd187-course]").forEach(button => button.addEventListener("click", () => openCourse(button.dataset.hd187Course, "knowledge-map")));
    overlay.querySelectorAll("[data-hd187-map-discipline]").forEach(button => button.addEventListener("click", () => openDiscipline(button.dataset.hd187MapDiscipline)));
  }

  function seasonsMarkup(){
    return `<div class="hd187-season-list">${seasonDefinitions().map((season, index) => {
      const progress = seasonProgress(season);
      return `<section class="hd187-season-detail ${index === 0 ? "current" : ""}"><div><span>${HD_ICONS.action(season.icon || HD_ICONS.fromText(season.title, "spark"))}</span><div><small>${index === 0 ? "Saison actuelle" : "Collection éditoriale"}</small><h3>${esc(season.title)}</h3><p>${esc(season.description)}</p></div><strong>${progress.progress}%</strong></div><i><em style="width:${progress.progress}%"></em></i><div class="hd187-season-lessons">${season.lessons.map(lesson => `<button type="button" data-hd187-course="${esc(lesson.id)}" class="${lessonDone(lesson.id) ? "done" : ""}"><span>${lessonDone(lesson.id) ? HD_ICONS.action("check") : HD_ICONS.lesson(lesson, null, null)}</span><b>${esc(lesson.title)}</b></button>`).join("")}</div></section>`;
    }).join("")}</div>`;
  }

  function openSeasons(){
    const overlay = layer("Saisons éditoriales", "Des sélections pour donner un fil conducteur, jamais pour fermer le catalogue.", seasonsMarkup(), "hd187-seasons-layer");
    overlay.querySelectorAll("[data-hd187-course]").forEach(button => button.addEventListener("click", () => openCourse(button.dataset.hd187Course, "season")));
  }

  function runAction(action){
    if (!action || action === "done") return;
    if (action === "mystery") {
      const mystery = currentMysterySafe();
      if (mystery) setState({ tab: "mystery", currentMysteryId: mystery.id, currentMysteryDiscipline: mystery.discipline || activeDisciplineId() }, { renderImmediate: true });
      return;
    }
    if (action.startsWith("lesson:")) return openCourse(action.slice(7), "daily-expedition");
    if (action === "recall") {
      try {
        const debug = progressDebug();
        const status = debug?.dailyPlanStatus?.();
        const due = Object.values(state.reviewQueue || {}).some(entry => Number(entry?.dueAt || 0) <= Date.now());
        if (due || status?.log?.planType === "review") {
          if (typeof debug?.openReviewSession === "function") return debug.openReviewSession("");
          setState({ tab: "learn", currentDiscipline: activeDisciplineId(), learnDrill: "chapters" });
        } else {
          const next = searchIndex().find(item => !lessonDone(item.lesson.id));
          if (next) openCourse(next.lesson.id, "daily-recall-fallback");
        }
      } catch { openDiscipline(activeDisciplineId()); }
      return;
    }
    if (action === "search") return openSearch();
    if (action === "map") return openKnowledgeMap();
    if (action === "catalog") return openDiscipline(activeDisciplineId());
  }

  function bindShellActions(root = document){
    root.querySelectorAll("[data-hd187-action]").forEach(button => {
      if (button.dataset.hd187Bound === "1") return;
      button.dataset.hd187Bound = "1";
      button.addEventListener("click", event => { event.preventDefault(); event.stopPropagation(); runAction(button.dataset.hd187Action); });
    });
    root.querySelectorAll("[data-hd187-open-search]").forEach(button => {
      if (button.dataset.hd187Bound === "1") return;
      button.dataset.hd187Bound = "1";
      button.addEventListener("click", () => openSearch());
    });
    root.querySelectorAll("[data-hd187-open-map]").forEach(button => {
      if (button.dataset.hd187Bound === "1") return;
      button.dataset.hd187Bound = "1";
      button.addEventListener("click", openKnowledgeMap);
    });
    root.querySelectorAll("[data-hd187-open-catalog]").forEach(button => {
      if (button.dataset.hd187Bound === "1") return;
      button.dataset.hd187Bound = "1";
      button.addEventListener("click", () => openDiscipline(activeDisciplineId()));
    });
    root.querySelectorAll("[data-hd187-open-seasons]").forEach(button => {
      if (button.dataset.hd187Bound === "1") return;
      button.dataset.hd187Bound = "1";
      button.addEventListener("click", openSeasons);
    });
    root.querySelectorAll("[data-hd187-season-next]").forEach(button => {
      if (button.dataset.hd187Bound === "1") return;
      button.dataset.hd187Bound = "1";
      button.addEventListener("click", () => openCourse(button.dataset.hd187SeasonNext, "season-home"));
    });
  }

  function enhanceCurrentScreen(){
    const shell = document.querySelector(".app-shell");
    if (!shell) return;
    if (shell.classList.contains("tab-home")) enhanceHome();
    else if (shell.classList.contains("tab-learn")) enhanceLearn();
    else if (shell.classList.contains("tab-profile")) enhanceProfile();
    else if (shell.classList.contains("tab-lesson")) injectSpoilerChoice();
    bindShellActions(shell);
  }

  let scheduled = false;
  function schedule(){
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; enhanceCurrentScreen(); });
  }

  const previousRenderHome = typeof renderHome === "function" ? renderHome : null;
  if (previousRenderHome) renderHome = function beta187RenderHome(){ const out = previousRenderHome(); schedule(); return out; };
  const previousRenderLearn = typeof renderLearn === "function" ? renderLearn : null;
  if (previousRenderLearn) renderLearn = function beta187RenderLearn(){ const out = previousRenderLearn(); schedule(); return out; };
  const previousRenderProfile = typeof renderProfile === "function" ? renderProfile : null;
  if (previousRenderProfile) renderProfile = function beta187RenderProfile(){ const out = previousRenderProfile(); schedule(); return out; };
  try {
    const previousRenderLesson = renderLesson;
    renderLesson = function beta187RenderLesson(){ const out = previousRenderLesson(); schedule(); return out; };
  } catch {}

  const observer = new MutationObserver(schedule);
  observer.observe(appRoot, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", schedule, { once: true });
  window.addEventListener("pageshow", schedule, { passive: true });
  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); }
    if (event.key === "Escape") closeLayer();
  });

  try {
    window.HistoDaily = {
      ...(window.HistoDaily || {}),
      version: VERSION,
      dailyExpedition: true,
      freeCourseAccess: true,
      globalCourseSearch: true,
      knowledgeMap: true,
      editorialSeasons: true,
      curiosityProfile: true,
      conceptDebug: {
        searchIndex,
        expeditionData,
        seasonDefinitions,
        curiosityData,
        openSearch,
        openKnowledgeMap
      }
    };
  } catch {}

  try {
    if (typeof renderSoon === "function") renderSoon();
    else if (typeof render === "function") render({ immediate: true });
  } catch {}
  schedule();
})();
