/* HistoDaily beta 222 — Visual V4
   Accueil premium : univers actif toujours visible, illustrations contenues,
   composition plus proche d'une application native et aucun effet permanent. */
(function histodailyBeta222VisualV4(){
  "use strict";
  const VERSION = "1.0.0-beta.246.0";
  const esc = value => {
    try { return escapeHtml(String(value ?? "")); }
    catch { return String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[char]); }
  };
  const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
  const safe = (fn, fallback = null) => { try { const value = fn(); return value ?? fallback; } catch { return fallback; } };
  let profileMountGeneration = 0;

  document.documentElement.classList.add("hd220-visual", "hd222-visual", "hd223-visual", "hd224-visual", "hd225-visual", "hd226-visual", "hd227-visual", "hd228-visual", "hd229-visual", "hd230-visual", "hd231-visual");

  function disciplineLabel(discipline){
    const labels = { history:"Histoire", art:"Art", cinema:"Cinéma", "science-inventions":"Sciences & inventions", astronomy:"Astronomie", economy:"Économie", geography:"Géographie", music:"Musique", literature:"Littérature" };
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
    const courseDone = Boolean(lesson?.id && safe(() => lessonRead(lesson.id), false));
    const quizDone = Boolean(lesson?.id && safe(() => lessonQuizPassed(lesson.id), false));
    if (!mystery) return { index:1, type:"catalog", eyebrow:"Exploration libre", title:"Choisis une nouvelle destination", text:"Tous les parcours restent ouverts, même sans dossier quotidien.", action:"Explorer les cours", meta:"Accès libre" };
    if (!solved) return {
      index:1,
      type:"mystery",
      eyebrow:"Problème du jour",
      title:safe(() => mysteryDisplayTitle(mystery), mystery.title || "Le mystère du jour"),
      text:safe(() => mysteryTeaser(mystery), mystery.teaser || mystery.prompt || "Observe les indices et trouve la réponse."),
      action:"Ouvrir l’expédition",
      meta:`+${safe(() => dailyRewardPreview().gems, 1)} gemme aujourd’hui`
    };
    if (lesson && !courseDone) return { index:2, type:"lesson", view:"express", eyebrow:"Cours", title:lessonTitle(lesson), text:"Le problème est résolu. Passe au cours pour comprendre pourquoi cette réponse est juste.", action:"Lire le cours", meta:"Express ou complet" };
    if (lesson && !quizDone) return { index:3, type:"lesson", view:"quiz", eyebrow:"Révision", title:"Vérifie que le raisonnement tient", text:`Cinq questions directement reliées au cours « ${lessonTitle(lesson)} ».`, action:"Commencer la révision", meta:"5 questions" };
    return { index:4, type:lesson ? "lesson" : "mystery", view:"complete", eyebrow:"Parcours terminé", title:"Problème, cours et révision validés", text:lesson ? `Tu as résolu le problème puis validé « ${lessonTitle(lesson)} » par la révision.` : "Le problème du jour est résolu.", action:lesson ? "Revoir le cours" : "Revoir le problème", meta:`Nouveau problème dans ${safe(() => timeToNextDaily(), "quelques heures")}` };
  }

  function cleanDossierTitle(value){
    const cleaned = String(value || "")
      .replace(/\s+à identifier$/i, "")
      .replace(/^Sujet du jour$/i, "Dossier du jour")
      .trim();
    return cleaned || "Dossier du jour";
  }

  function stageForDiscipline(stage){
    return {
      ...stage,
      title: cleanDossierTitle(stage?.title)
    };
  }

  function astronomyJourneyData(resume, discovery){
    return {
      total: 6,
      resumeTitle: resume ? lessonTitle(resume) : "Regarder loin, voir le passé",
      resumeMeta: resume ? lessonMeta(resume) : "Lumière, distance et temps cosmique",
      discoveryTitle: discovery ? lessonTitle(discovery) : "Étoiles, galaxies et trous noirs",
      discoveryMeta: discovery ? lessonMeta(discovery) : "Exploration spatiale",
      progressLabel: "0% exploré"
    };
  }

  function disciplineSelector(activeId){
    return `<nav class="hd220-world-switcher hd222-world-switcher" aria-label="Choisir une discipline">
      ${DISCIPLINES.map(discipline => {
        const active = discipline.id === activeId;
        const lessons = disciplineLessons(discipline.id);
        const done = lessons.filter(lesson => safe(() => lessonDone(lesson.id), false)).length;
        const progress = lessons.length ? Math.round(done / lessons.length * 100) : 0;
        const icon = safe(() => HD_ICONS.rawDiscipline(discipline), "") || safe(() => HD_ICONS.discipline(discipline), discipline.emoji || "•");
        return `<button type="button" class="hd220-world hd222-world ${active ? "active" : ""}" data-hd220-discipline="${esc(discipline.id)}" style="--world:${esc(discipline.accent)}" aria-pressed="${active}" ${active ? 'aria-current="true"' : ""}>
          <span>${icon}</span><b>${esc(disciplineLabel(discipline))}</b><i>${progress}%</i>
        </button>`;
      }).join("")}
    </nav>`;
  }

  function heroArtwork(disciplineId, title = ""){
    if (disciplineId === "astronomy") {
      return `<div class="hd225-astro-hero" role="img" aria-label="Illustration d’un trou noir stylisé">
        <div class="hd225-astro-visual"></div>
        <div class="hd225-astro-overlay"></div>
        <div class="hd225-astro-dust"></div>
      </div>`;
    }
    const uid = `hd222-${String(disciplineId || "world").replace(/[^a-z0-9-]/gi, "")}`;
    const commonStart = `<svg class="hd222-hero-svg" viewBox="0 0 420 320" role="img" aria-label="Illustration ${esc(disciplineLabel(disciplineById(disciplineId)))}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${uid}-stroke" x1="40" y1="40" x2="370" y2="280" gradientUnits="userSpaceOnUse">
          <stop stop-color="#ffffff" stop-opacity=".96"/>
          <stop offset=".34" stop-color="var(--world)" stop-opacity=".98"/>
          <stop offset="1" stop-color="var(--world)" stop-opacity=".42"/>
        </linearGradient>
        <radialGradient id="${uid}-halo" cx="50%" cy="50%" r="50%">
          <stop stop-color="var(--world)" stop-opacity=".22"/>
          <stop offset="1" stop-color="var(--world)" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <g fill="none" stroke="url(#${uid}-stroke)" stroke-linecap="round" stroke-linejoin="round">`;
    const commonEnd = `</g>
      <g fill="var(--world)">
        <circle cx="349" cy="59" r="3" opacity=".78"/>
        <circle cx="373" cy="99" r="2" opacity=".52"/>
        <circle cx="306" cy="44" r="2.5" opacity=".66"/>
      </g>
    </svg>`;

    let drawing = "";
    switch (disciplineId) {
      case "cinema":
        drawing = `
          <circle cx="210" cy="104" r="46" stroke-width="7"/>
          <circle cx="210" cy="104" r="11" stroke-width="6"/>
          <circle cx="195" cy="88" r="7" stroke-width="5"/><circle cx="226" cy="88" r="7" stroke-width="5"/>
          <circle cx="195" cy="120" r="7" stroke-width="5"/><circle cx="226" cy="120" r="7" stroke-width="5"/>
          <circle cx="304" cy="94" r="39" stroke-width="7"/>
          <circle cx="304" cy="94" r="9" stroke-width="6"/>
          <circle cx="291" cy="81" r="6" stroke-width="4.5"/><circle cx="317" cy="81" r="6" stroke-width="4.5"/>
          <circle cx="291" cy="107" r="6" stroke-width="4.5"/><circle cx="317" cy="107" r="6" stroke-width="4.5"/>
          <path d="M175 147h155a18 18 0 0 1 18 18v62a18 18 0 0 1-18 18H175a18 18 0 0 1-18-18v-62a18 18 0 0 1 18-18Z" stroke-width="8"/>
          <path d="M348 170l53-27v83l-53-25" stroke-width="8"/>
          <path d="M226 245v40m-38 0h78" stroke-width="8"/>
          <path d="M76 221h125l12 57H88Z" stroke-width="7"/>
          <path d="M87 221l16-28h104l-6 28M107 193l22 28m21-28l22 28" stroke-width="6"/>
          <path d="M100 247h92" stroke-width="6"/>
          <path d="M355 254c19-5 32-2 42 8" stroke-width="5" opacity=".55"/>`;
        break;
      case "science-inventions":
        drawing = `
          <path d="M231 57h76m-56 0v77l-61 102a25 25 0 0 0 21 38h136a25 25 0 0 0 21-38l-61-102V57" stroke-width="9"/>
          <path d="M211 220c30 14 66-12 96 3 20 10 39 9 58 1" stroke-width="7"/>
          <path d="M244 134h64" stroke-width="7" opacity=".7"/>
          <path d="M85 112v133m40-133v133m40-133v133" stroke-width="8"/>
          <path d="M70 112h110M62 245h127" stroke-width="8"/>
          <path d="M85 201c13 7 27-7 40 0 13 7 27-7 40 0" stroke-width="6"/>
          <ellipse cx="136" cy="71" rx="52" ry="20" stroke-width="5" opacity=".72"/>
          <ellipse cx="136" cy="71" rx="20" ry="52" stroke-width="5" opacity=".72" transform="rotate(55 136 71)"/>
          <ellipse cx="136" cy="71" rx="20" ry="52" stroke-width="5" opacity=".72" transform="rotate(-55 136 71)"/>
          <circle cx="136" cy="71" r="7" fill="var(--world)" stroke="none"/>
          <path d="M330 154c29-8 43-24 47-50M337 173c23 3 40 15 51 36" stroke-width="5" opacity=".52"/>`;
        break;
      case "economy":
        drawing = `
          <path d="M112 127l105-65 105 65" stroke-width="9"/>
          <path d="M130 133h175M143 145v93m42-93v93m64-93v93m42-93v93M122 245h204" stroke-width="8"/>
          <circle cx="105" cy="222" r="58" stroke-width="8"/>
          <path d="M119 192c-23-14-47-2-47 24 0 28 30 40 54 24M70 210h54M70 226h46" stroke-width="7"/>
          <path d="M254 202l32-32 25 18 55-68" stroke-width="9"/>
          <path d="M346 121h29v29" stroke-width="8"/>
          <path d="M244 274h130" stroke-width="6" opacity=".45"/>
          <path d="M275 257v17m30-31v31m30-48v48m30-76v76" stroke-width="8" opacity=".72"/>`;
        break;
      case "art":
        drawing = `
          <path d="M202 53c-82 0-143 54-143 126 0 61 47 108 110 108h28c24 0 38-24 25-43-11-17 1-37 22-37h42c52 0 89-35 89-82 0-59-74-72-173-72Z" stroke-width="9"/>
          <circle cx="132" cy="137" r="14" stroke-width="7"/>
          <circle cx="186" cy="101" r="14" stroke-width="7"/>
          <circle cx="247" cy="116" r="14" stroke-width="7"/>
          <circle cx="295" cy="157" r="14" stroke-width="7"/>
          <path d="M286 270c18-52 44-94 86-137" stroke-width="11"/>
          <path d="M337 183l38 33" stroke-width="14"/>
          <path d="M89 252c41-26 87-25 133 3" stroke-width="5" opacity=".48"/>`;
        break;
      case "geography":
        drawing = `
          <circle cx="224" cy="163" r="112" stroke-width="8"/>
          <path d="M112 163h224M224 51c45 53 45 171 0 224M224 51c-45 53-45 171 0 224" stroke-width="6" opacity=".76"/>
          <path d="M137 104c48 27 126 27 174 0M137 222c48-27 126-27 174 0" stroke-width="5" opacity=".54"/>
          <path d="M339 77c38 0 69 31 69 69 0 51-69 111-69 111s-69-60-69-111c0-38 31-69 69-69Z" stroke-width="8"/>
          <circle cx="339" cy="146" r="24" stroke-width="7"/>
          <path d="M74 271c74-30 151-31 230-4" stroke-width="5" opacity=".42"/>`;
        break;
      case "music":
        drawing = `
          <circle cx="157" cy="169" r="94" stroke-width="8"/>
          <circle cx="157" cy="169" r="23" stroke-width="8"/>
          <circle cx="157" cy="169" r="58" stroke-width="4" opacity=".42"/>
          <path d="M277 73v130a34 34 0 1 1-22-32V97l94-24v106a34 34 0 1 1-22-32V91" stroke-width="9"/>
          <path d="M63 280c68-22 136-22 204 0" stroke-width="5" opacity=".42"/>`;
        break;
      case "literature":
        drawing = `
          <path d="M82 86c54-18 100-8 140 25v145c-40-29-86-39-140-21Z" stroke-width="8"/>
          <path d="M362 86c-54-18-100-8-140 25v145c40-29 86-39 140-21Z" stroke-width="8"/>
          <path d="M222 111v145" stroke-width="6" opacity=".72"/>
          <path d="M105 126c31-8 61-3 91 14M105 156c31-8 61-3 91 14M105 186c31-8 61-3 91 14" stroke-width="5" opacity=".55"/>
          <path d="M338 126c-31-8-61-3-91 14M338 156c-31-8-61-3-91 14" stroke-width="5" opacity=".55"/>
          <path d="M305 46c-37 16-58 47-63 92 30-9 57-28 76-59 8-13 4-26-13-33Z" stroke-width="7"/>
          <path d="M248 137c16-27 36-48 61-64" stroke-width="6"/>
          <path d="M75 273c92-24 190-24 294 0" stroke-width="5" opacity=".42"/>`;
        break;
      case "history":
      default: {
        const nautical = /navire|bateau|viking|drakkar|mer|frontière/i.test(String(title));
        drawing = nautical ? `
          <path d="M72 214c58 31 176 36 273 4-17 44-71 72-143 72-69 0-113-27-130-76Z" stroke-width="9"/>
          <path d="M202 58v157M202 67l107 75H202" stroke-width="8"/>
          <path d="M202 82l-86 68h86" stroke-width="8" opacity=".78"/>
          <path d="M95 220V113l-24-27M309 220V113l24-27" stroke-width="7"/>
          <path d="M70 214h284" stroke-width="7"/>
          <path d="M105 247c29 13 56 13 84 0 29 13 57 13 85 0 29 13 57 13 85 0" stroke-width="5" opacity=".55"/>`
        : `
          <path d="M92 259h245M111 241h207M127 224V122m48 102V122m68 102V122m48 102V122" stroke-width="9"/>
          <path d="M111 110h207M126 91l88-46 89 46" stroke-width="9"/>
          <path d="M88 276h253" stroke-width="7" opacity=".54"/>
          <circle cx="345" cy="79" r="28" stroke-width="5" opacity=".55"/>`;
      }
    }
    return `${commonStart}${drawing}${commonEnd}`;
  }

  function expeditionRoute(index){
    const labels = ["Problème", "Cours", "Révision"];
    return `<div class="hd220-route" aria-label="Parcours du jour">
      ${labels.map((label, i) => {
        const step = i + 1;
        const status = step < index ? "done" : step === index ? "current" : "future";
        return `<div class="${status}" ${status === "current" ? 'aria-current="step"' : ""}><span>${step < index ? "✓" : step}</span><b>${esc(label)}</b></div>`;
      }).join("")}
    </div>`;
  }

  function renderHomeV3(){
    const disciplineId = activeDisciplineId();
    const discipline = disciplineById(disciplineId);
    const mystery = safe(() => dailyMystery(), null);
    const linkedLesson = mystery?.lessonId ? safe(() => lessonById(mystery.lessonId), null) : null;
    const stage = homeStage(mystery, linkedLesson);
    const stageView = stageForDiscipline(stage, disciplineId);
    const lessons = disciplineLessons(disciplineId);
    const completed = lessons.filter(lesson => safe(() => lessonDone(lesson.id), false)).length;
    const progress = lessons.length ? Math.round(completed / lessons.length * 100) : 0;
    const unfinished = lessons.filter(lesson => !safe(() => lessonDone(lesson.id), false) && String(lesson.id) !== String(linkedLesson?.id || ""));
    const resume = unfinished[0] || lessons[0] || null;
    const discovery = unfinished.find(lesson => String(lesson.id) !== String(resume?.id || "")) || lessons[1] || resume;
    const astroData = disciplineId === "astronomy" ? astronomyJourneyData(resume, discovery) : null;
    const progressTotal = astroData ? Math.max(astroData.total, lessons.length || 0) : (lessons.length || 0);
    const progressPercentText = astroData ? astroData.progressLabel : `${progress}% exploré`;
    const pseudo = String(state.pseudo || "").trim();
    const greeting = pseudo && !/^invité$/i.test(pseudo) ? `Salut ${pseudo}` : "Bonjour";
    const art = heroArtwork(disciplineId, stageView.title);
    const heroIcon = safe(() => HD_ICONS.discipline(discipline), discipline.emoji || "✦");

    const titleClass = String(stageView.title || "").length > 34 ? "is-long" : "";
    renderShell(`<div class="hd220-home hd222-home" style="--world:${esc(discipline.accent)}">
      <header class="hd220-home-head hd222-home-head">
        <div class="hd220-brand"><span>HistoDaily</span><h1>${esc(greeting)}</h1></div>
        <div class="hd220-head-metrics"><button type="button" data-hd220-profile aria-label="Ouvrir le profil"><span>🔥</span><b>${state.streak || 0}</b></button><button type="button" data-hd220-profile aria-label="Ouvrir le profil, niveau ${level()}"><span>Niv.</span><b>${level()}</b></button></div>
      </header>

      <section class="hd220-worlds hd222-worlds">
        <div class="hd220-section-cap hd222-section-cap"><span>Ton univers</span><small>Fais glisser pour changer</small></div>
        ${disciplineSelector(disciplineId)}
      </section>

      <section class="hd220-expedition hd222-expedition ${titleClass}" aria-labelledby="hd220-expedition-title">
        <div class="hd220-expedition-glow" aria-hidden="true"></div>
        <div class="hd220-expedition-top"><span>${esc(stageView.eyebrow)}</span><b><i>${stageView.index}</i>/4</b></div>
        <div class="hd222-expedition-body">
          <div class="hd220-expedition-copy hd222-expedition-copy">
            <div class="hd220-expedition-symbol">${heroIcon}</div>
            <h2 id="hd220-expedition-title">${esc(stageView.title)}</h2>
            <p>${esc(stageView.text)}</p>
          </div>
          <div class="hd222-expedition-art" aria-hidden="true">${art}</div>
        </div>
        <div class="hd220-expedition-action hd222-expedition-action">
          <button type="button" data-hd220-expedition><span>${esc(stageView.action)}</span><b>↗</b></button>
          <small>${esc(stageView.meta)}</small>
        </div>
        ${expeditionRoute(stageView.index)}
      </section>

      <section class="hd220-progress-strip hd222-progress-strip">
        <div class="hd222-progress-title"><span>${heroIcon}</span><b>Parcours ${esc(disciplineLabel(discipline))}</b><em>${completed}/${progressTotal}</em></div>
        <i><em style="width:${clamp(progress, 0, 100)}%"></em></i>
        <button type="button" data-hd220-catalog>Voir la carte</button>
      </section>

      <section class="hd220-next hd222-next">
        <div class="hd220-section-cap hd222-section-cap"><span>Prochaines escales</span><b>${progressPercentText}</b></div>
        <div class="hd220-next-rail hd222-next-grid">
          <article class="hd220-next-card primary" data-hd220-open-lesson="${esc(resume?.id || "")}" role="button" tabindex="0">
            <div class="hd220-next-icon">${resume ? safe(() => HD_ICONS.lesson(resume, lessonWorld(resume), discipline), heroIcon) : heroIcon}</div>
            <div><small>À continuer</small><h3>${esc(astroData ? astroData.resumeTitle : lessonTitle(resume))}</h3><p>${esc(astroData ? astroData.resumeMeta : lessonMeta(resume))}</p></div><span aria-hidden="true">→</span>
          </article>
          <article class="hd220-next-card" data-hd220-open-lesson="${esc(discovery?.id || "")}" role="button" tabindex="0">
            <div class="hd220-next-icon">${discovery ? safe(() => HD_ICONS.lesson(discovery, lessonWorld(discovery), discipline), heroIcon) : heroIcon}</div>
            <div><small>À découvrir</small><h3>${esc(astroData ? astroData.discoveryTitle : lessonTitle(discovery))}</h3><p>${esc(astroData ? astroData.discoveryMeta : lessonMeta(discovery))}</p></div><span aria-hidden="true">→</span>
          </article>
        </div>
      </section>
    </div>`);

    const shell = document.querySelector(".app-shell.tab-home");
    shell?.classList.add("hd220-home-shell", "hd222-home-shell");
    if (shell) shell.dataset.hd187Enhanced = "1";

    const switcher = shell?.querySelector(".hd222-world-switcher");
    const activeWorld = switcher?.querySelector(".hd222-world.active");
    if (switcher && activeWorld) {
      const targetLeft = Math.max(0, activeWorld.offsetLeft);
      const previousId = switcher.dataset.lastCentered;
      switcher.dataset.lastCentered = disciplineId;
      window.requestAnimationFrame?.(() => {
        try { switcher.scrollTo({ left: targetLeft, behavior: previousId && previousId !== disciplineId ? "smooth" : "auto" }); }
        catch { switcher.scrollLeft = targetLeft; }
      });
    }

    shell?.querySelectorAll("[data-hd220-discipline]").forEach(button => button.addEventListener("click", () => {
      const nextId = button.dataset.hd220Discipline;
      if (typeof switchHomeDiscipline === "function") return switchHomeDiscipline(nextId);
      const first = disciplineLessons(nextId)[0];
      const world = first ? safe(() => lessonWorld(first), {}) : {};
      const nextMystery = typeof mysteryForDisciplineDayOffset === "function" ? mysteryForDisciplineDayOffset(nextId, 0) : null;
      setState({
        currentDiscipline: nextId,
        currentWorld: world?.id || state.currentWorld,
        currentGroup: world?.group || state.currentGroup,
        currentMysteryId: nextMystery?.id || null,
        currentMysteryDiscipline: nextId
      });
    }));
    shell?.querySelectorAll("[data-hd220-profile]").forEach(button => button.addEventListener("click", () => setState({ tab:"profile" })));
    shell?.querySelector("[data-hd220-catalog]")?.addEventListener("click", () => openCatalog(disciplineId));
    shell?.querySelector("[data-hd220-expedition]")?.addEventListener("click", () => {
      if (stageView.type === "mystery") return setState({ tab:"mystery", currentMysteryId:mystery?.id || null, currentMysteryDiscipline:disciplineId, currentDiscipline:disciplineId });
      if (stageView.type === "lesson" && linkedLesson) return openLesson(linkedLesson, stageView.view || "express");
      if (stageView.type === "catalog") return openCatalog(disciplineId);
      if (linkedLesson) return openLesson(linkedLesson, stageView.view || "complete");
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
            <div class="hd220-medal-icon">${item.icon}</div><small>${item.unlocked ? "Débloquée" : "En progression"}</small><h3>${esc(item.title)}</h3><i><em style="width:${clamp(item.progress, 0, 100)}%"></em></i><p>${esc(item.meta)}</p>
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

    // Tout l’ancien profil reste disponible dans les volets utiles, mais les
    // anciennes cartes de premier niveau ne doivent jamais apparaître derrière
    // la V3. Le marquage JS complète la règle CSS générique.
    [...shell.children].forEach(node => {
      if (node === root || node.matches?.(".system-status,.beta115-status,.beta182-profile-fold,.bottom-nav")) return;
      node.classList.add("hd220-legacy-hidden");
    });
    shell.dataset.hd220ProfileReady = "1";

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
    renderProfile = function beta221RenderProfile(){
      const generation = ++profileMountGeneration;
      const result = previousRenderProfile();
      // Montage immédiat, puis une seule vérification au prochain frame.
      // L’ancienne triple temporisation reconstruisait le DOM plusieurs fois.
      mountProfileV3();
      window.requestAnimationFrame?.(() => {
        if (generation === profileMountGeneration && state?.tab === "profile") mountProfileV3();
      });
      return result;
    };
  }

  renderHome = renderHomeV3;

  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version:VERSION, visualV3:true, visualV3Home:true, visualV3Profile:true, visualV4:true, visualV4Home:true };
  } catch {}

  try {
    window.setTimeout(() => {
      if (state?.tab === "home") render({ immediate:true });
      else if (state?.tab === "profile") mountProfileV3();
    }, 0);
  } catch {}
})();
