/* HistoDaily RC24 — premium editorial home. */
(function histodailyRC24PremiumHome(){
  "use strict";
  const VERSION = "1.0.0-rc.29.0";
  const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const safe = (fn, fallback = null) => { try { const v = fn(); return v == null ? fallback : v; } catch { return fallback; } };
  const clamp = (value,min,max) => Math.max(min,Math.min(max,Number(value)||0));
  const labels = {history:"Histoire",art:"Art",cinema:"Cinéma","science-inventions":"Sciences",astronomy:"Astronomie",economy:"Économie",geography:"Géographie",music:"Musique",literature:"Littérature",philosophy:"Philosophie",english:"Anglais"};
  const artIds = new Set(["history","art","cinema","science-inventions","astronomy","economy","geography","music","literature","philosophy","english"]);

  function activeId(){ return safe(() => activeDisciplineId(), String(state?.currentDiscipline || "history")); }
  function discipline(id){ return safe(() => disciplineById(id), {id,title:labels[id]||id,accent:"#f5c451",emoji:"✦"}); }
  function disciplineName(item){ return labels[item?.id] || item?.title || "Explorer"; }
  function lessonsFor(id){
    const all = safe(() => curatedLessons(), []) || [];
    return all.filter(l => safe(() => lessonDisciplineId(l), "history") === id);
  }
  function titleOf(lesson){
    if (!lesson) return "Nouveau cours";
    const content = safe(() => buildLessonContent(lesson), null);
    return content?.title || lesson.title || "Nouveau cours";
  }
  function metaOf(lesson){
    if (!lesson) return "3 min";
    const world = safe(() => lessonWorld(lesson), null);
    return [world?.title, lesson.period || lesson.location || "3 min"].filter(Boolean).slice(0,2).join(" · ");
  }
  function openLesson(lesson, view="express"){
    if (!lesson) return;
    const world = safe(() => lessonWorld(lesson), {}) || {};
    const did = safe(() => lessonDisciplineId(lesson), activeId());
    setState({tab:"lesson",currentLessonId:lesson.id,currentDiscipline:did,currentWorld:world.id||state.currentWorld,currentGroup:world.group||state.currentGroup,lessonView:view,lessonFocus:null});
  }
  function openCatalog(id){
    const first = lessonsFor(id)[0];
    const world = first ? safe(() => lessonWorld(first), {}) : {};
    setState({tab:"learn",currentDiscipline:id,currentWorld:world?.id||state.currentWorld,currentGroup:world?.group||state.currentGroup,learnDrill:"chapters",learnFilter:"all",learnSearch:""});
  }
  function currentMystery(){ return safe(() => dailyMystery(), null); }
  function mysteryTitle(m){
    const raw = safe(() => mysteryDisplayTitle(m), m?.title || "Le problème du jour");
    return String(raw || "Le problème du jour").replace(/\s+à identifier$/i,"").replace(/^Sujet du jour$/i,"Dossier du jour").trim();
  }
  function mysteryTeaserText(m){
    return safe(() => mysteryTeaser(m), m?.teaser || m?.prompt || "Observe les indices, formule une hypothèse et trouve la réponse.");
  }
  function stage(mystery, lesson){
    const solved = Boolean(mystery?.id && safe(() => mysterySolved(mystery.id), false));
    const read = Boolean(lesson?.id && safe(() => lessonRead(lesson.id), false));
    const quiz = Boolean(lesson?.id && safe(() => lessonQuizPassed(lesson.id), false));
    if (!mystery) return {index:1,type:"catalog",kicker:"Exploration libre",title:"Choisis ta prochaine destination",text:"Le catalogue est ouvert : pioche un cours qui t’attire.",action:"Explorer les cours"};
    if (!solved) return {index:1,type:"mystery",kicker:"Expédition du jour",title:mysteryTitle(mystery),text:mysteryTeaserText(mystery),action:"Commencer l’expédition"};
    if (lesson && !read) return {index:2,type:"lesson",view:"express",kicker:"Étape 2 · Comprendre",title:titleOf(lesson),text:"Trouvé. Comprends maintenant pourquoi cette réponse tient.",action:"Lire le cours"};
    if (lesson && !quiz) return {index:3,type:"lesson",view:"quiz",kicker:"Étape 3 · Vérifier",title:"Ancre ce que tu viens d’apprendre",text:`5 questions pour ancrer l’essentiel de « ${titleOf(lesson)} ».`,action:"Faire le quiz"};
    return {index:4,type:lesson?"lesson":"mystery",view:"complete",kicker:"Parcours du jour terminé",title:"Bien joué — la boucle est complète",text:"Expédition, cours et quiz : rituel terminé.",action:lesson?"Revoir le cours":"Revoir l’expédition"};
  }
  function memoryApi(){ return window.HistoDaily?.memory || null; }
  function nextAction(id, linkedLesson){
    const mem = memoryApi();
    const due = safe(() => mem?.validReviewEntries?.(id), []) || [];
    if (due.length) return {kind:"review",eyebrow:"À faire maintenant",title:`${due.length} notion${due.length>1?"s":""} à revoir`,meta:`Séance courte · ${Math.min(5,due.length)} rappel${Math.min(5,due.length)>1?"s":""} max`,action:"Réviser",count:due.length};
    const lessons = lessonsFor(id);
    let resume = null;
    const current = state?.currentLessonId ? safe(() => lessonById(state.currentLessonId), null) : null;
    if (current && safe(() => lessonDisciplineId(current), "") === id && !safe(() => lessonDone(current.id), false)) resume = current;
    if (!resume) resume = lessons.find(l => !safe(() => lessonDone(l.id), false) && String(l.id)!==String(linkedLesson?.id||"")) || lessons.find(l => !safe(() => lessonDone(l.id), false)) || lessons[0] || null;
    if (!resume) return {kind:"catalog",eyebrow:"À explorer",title:"Choisis un nouveau parcours",meta:"Tous les cours sont accessibles",action:"Voir les cours"};
    return {kind:"lesson",lesson:resume,eyebrow:"Prochaine étape",title:titleOf(resume),meta:metaOf(resume),action:safe(() => lessonDone(resume.id), false)?"Revoir":"Continuer"};
  }
  function mastery(id){
    const mem = memoryApi();
    const m = safe(() => mem?.disciplineMastery?.(id), null);
    if (m) return m;
    const lessons = lessonsFor(id); const done = lessons.filter(l => safe(() => lessonDone(l.id), false)).length;
    return {score:lessons.length?Math.round(done/lessons.length*100):0,total:lessons.length,done,mastered:0,reviews:0};
  }
  function icon(item){ return safe(() => HD_ICONS.rawDiscipline(item), "") || safe(() => HD_ICONS.discipline(item), item?.emoji || "✦"); }
  function universeMarkup(active){
    const list = (typeof DISCIPLINES !== "undefined" ? DISCIPLINES : []).map(item => {
      const isActive = item.id === active;
      const m = mastery(item.id);
      const art = artIds.has(item.id) ? " has-art" : "";
      return `<button type="button" class="rc24-world${isActive?" active":""}${art}" data-rc24-world="${esc(item.id)}" style="--world:${esc(item.accent||"#f5c451")}" aria-pressed="${isActive}">
        <span class="rc24-world-art" aria-hidden="true"></span><span class="rc24-world-icon">${icon(item)}</span>
        <span class="rc24-world-copy"><b>${esc(disciplineName(item))}</b><small>${Number(m.score||0)}% maîtrisé</small></span>
      </button>`;
    }).join("");
    return `<div class="rc24-world-grid">${list}</div>`;
  }

  function renderPremiumHome(){
    const id = activeId();
    const d = discipline(id);
    const mystery = currentMystery();
    const linked = mystery?.lessonId ? safe(() => lessonById(mystery.lessonId), null) : null;
    const s = stage(mystery, linked);
    const next = nextAction(id, linked);
    const m = mastery(id);
    const streak = Math.max(0, Number(safe(() => currentStreakValue(), state?.streak || 0)) || 0);
    const lvl = Number(safe(() => level(), 1)) || 1;
    const greeting = String(state?.pseudo||"").trim() && !/^invité$/i.test(String(state.pseudo)) ? `Bonjour ${String(state.pseudo).trim()}` : "Bonjour";
    const routeIndex = clamp(s.index,1,3);
    const steps = ["Expédition","Cours","Quiz"];
    const heroClass = artIds.has(id) ? ` has-art art-${esc(id)}` : "";
    const nextThumbClass = artIds.has(id) ? ` art-${esc(id)}` : "";

    document.documentElement.classList.add("hd324-premium-home");
    renderShell(`<div class="rc24-home" style="--world:${esc(d.accent||"#f5c451")}" data-rc24-discipline="${esc(id)}">
      <header class="rc24-head">
        <div class="rc24-brand"><span>✦ HISTODAILY</span><h1>${esc(greeting)}</h1></div>
        <div class="rc24-metrics"><button type="button" data-rc24-profile><span>🔥</span><b>${streak}</b></button><button type="button" data-rc24-profile><span>♛</span><b>Niv. ${lvl}</b></button></div>
      </header>

      <section class="rc24-hero${heroClass}" aria-labelledby="rc24-hero-title">
        <div class="rc24-hero-image" aria-hidden="true"></div>
        <div class="rc24-hero-vignette" aria-hidden="true"></div>
        <div class="rc24-hero-top"><span>Aujourd’hui · ${esc(disciplineName(d))}</span><small>${s.index>3?"✓":`${routeIndex}/3`}</small></div>
        <div class="rc24-hero-content">
          <p>${esc(s.kicker)}</p>
          <h2 id="rc24-hero-title">${esc(s.title)}</h2>
          <span>${esc(s.text)}</span>
          <button type="button" class="rc24-hero-cta" data-rc24-primary><b>${esc(s.action)}</b><i>→</i></button>
        </div>
        <div class="rc24-route" aria-label="Parcours du jour">${steps.map((label,i)=>{const step=i+1;const status=s.index>3||step<routeIndex?"done":step===routeIndex?"current":"future";return `<div class="${status}"><i>${status==="done"?"✓":step}</i><span>${label}</span></div>`;}).join("")}</div>
      </section>

      <section class="rc24-dashboard" aria-label="Ta progression">
        <button type="button" class="rc24-next" data-rc24-next>
          <span class="rc24-next-thumb${nextThumbClass}" aria-hidden="true">${next.kind==="review"?"↻":icon(d)}</span>
          <span class="rc24-next-copy"><small>${esc(next.eyebrow)}</small><b>${esc(next.title)}</b><em>${esc(next.meta)}</em></span>
          <span class="rc24-next-arrow">→</span>
        </button>
        <button type="button" class="rc24-mastery" data-rc24-catalog aria-label="Voir le parcours ${esc(disciplineName(d))}">
          <span class="rc24-ring" style="--p:${clamp(m.score,0,100)}"><i>${Number(m.score||0)}%</i></span>
          <span><small>Maîtrise</small><b>${Number(m.mastered||0)} maîtrisé${Number(m.mastered||0)>1?"s":""}</b><em>${Number(m.done||0)}/${Number(m.total||0)} cours validés</em></span>
        </button>
      </section>

      <details class="rc24-universes">
        <summary><span>Univers</span><b>${esc(disciplineName(d))}</b><em>Changer</em></summary>
        ${universeMarkup(id)}
      </details>
    </div>`);

    const shell = document.querySelector(".app-shell.tab-home");
    shell?.classList.add("rc24-home-shell");
    shell?.querySelectorAll("[data-rc24-profile]").forEach(b => b.addEventListener("click",()=>setState({tab:"profile"})));
    shell?.querySelector("[data-rc24-catalog]")?.addEventListener("click",()=>openCatalog(id));
    shell?.querySelector("[data-rc24-primary]")?.addEventListener("click",()=>{
      if (s.type==="mystery") return setState({tab:"mystery",currentMysteryId:mystery?.id||null,currentMysteryDiscipline:id,currentDiscipline:id});
      if (s.type==="lesson" && linked) return openLesson(linked,s.view||"express");
      if (s.type==="catalog") return openCatalog(id);
      if (linked) return openLesson(linked,s.view||"complete");
      return setState({tab:"mystery"});
    });
    shell?.querySelector("[data-rc24-next]")?.addEventListener("click",()=>{
      if (next.kind==="review") return safe(()=>memoryApi()?.openReviewSession?.(id),null);
      if (next.kind==="lesson" && next.lesson) return openLesson(next.lesson,"express");
      return openCatalog(id);
    });
    shell?.querySelectorAll("[data-rc24-world]").forEach(button=>button.addEventListener("click",()=>{
      const nextId=button.dataset.rc24World;
      if (!nextId || nextId===id) return;
      if (typeof switchHomeDiscipline === "function") return switchHomeDiscipline(nextId);
      const first=lessonsFor(nextId)[0]; const world=first?safe(()=>lessonWorld(first),{}):{};
      const nextMystery=typeof mysteryForDisciplineDayOffset==="function"?safe(()=>mysteryForDisciplineDayOffset(nextId,0),null):null;
      setState({currentDiscipline:nextId,currentWorld:world?.id||state.currentWorld,currentGroup:world?.group||state.currentGroup,currentMysteryId:nextMystery?.id||null,currentMysteryDiscipline:nextId,tab:"home"});
    }));
    try { window.HistoDaily={...(window.HistoDaily||{}),version:VERSION,premiumHomeRC24:true}; } catch {}
  }

  renderHome = renderPremiumHome;
  try { if (state?.tab === "home") window.setTimeout(renderPremiumHome,0); } catch {}
})();
