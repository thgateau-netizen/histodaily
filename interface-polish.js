/* HistoDaily beta 182 — interface allégée, hiérarchie claire et rendu mobile fluide. */
(function histodailyBeta182Interface(){
  "use strict";

  const VERSION = "1.0.0-beta.182";
  const esc = value => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function lessonTitle(lesson) {
    try { return buildLessonContent(lesson)?.title || lesson?.title || "Cours"; }
    catch { return lesson?.title || "Cours"; }
  }

  function availableDisciplineLessons(disciplineId) {
    try {
      return (lessonsForDiscipline(disciplineId) || [])
        .filter(lesson => typeof isCuratedLesson !== "function" || isCuratedLesson(lesson))
        .filter(lesson => typeof lessonLockedByDailyMystery !== "function" || !lessonLockedByDailyMystery(lesson));
    } catch { return []; }
  }

  function lessonIsDone(lesson) {
    try { return Boolean(lesson && lessonDone(lesson.id)); }
    catch { return false; }
  }

  function activeNextLesson(disciplineId) {
    const lessons = availableDisciplineLessons(disciplineId);
    const current = lessons.find(lesson => String(lesson.id) === String(state.currentLessonId || ""));
    if (current && !lessonIsDone(current)) return current;
    try {
      const started = lessons.find(lesson => {
        const progress = state.quizProgress?.[lesson.id];
        return !lessonIsDone(lesson) && Number(progress?.answeredCount || 0) > 0;
      });
      if (started) return started;
    } catch {}
    return lessons.find(lesson => !lessonIsDone(lesson)) || lessons[0] || null;
  }

  // La progression est déjà visible dans les pastilles de discipline et dans le parcours.
  // Supprimer la grosse carte évite de raconter trois fois la même chose sur l’accueil.
  try { modeSnapshotMarkup = function beta182ModeSnapshotMarkup(){ return ""; }; } catch {}

  try {
    modeContinueMarkup = function beta182ModeContinueMarkup(disciplineId = activeDisciplineId()) {
      const discipline = disciplineById(disciplineId);
      let totalLessons = [];
      try {
        totalLessons = (lessonsForDiscipline(discipline.id) || []).filter(lesson => typeof isCuratedLesson !== "function" || isCuratedLesson(lesson));
      } catch { totalLessons = availableDisciplineLessons(discipline.id); }
      const done = totalLessons.filter(lessonIsDone).length;
      const next = activeNextLesson(discipline.id);
      const progress = totalLessons.length ? Math.round((done / totalLessons.length) * 100) : 0;

      if (!next) {
        return `<section class="card beta182-next-card complete" style="--discipline-accent:${esc(discipline.accent)}">
          <div class="beta182-next-icon">${HD_ICONS.action("check")}</div>
          <div><span class="card-label">Parcours</span><h2>${esc(discipline.title)} terminé</h2><p>Tout le contenu disponible est validé.</p></div>
          <button type="button" data-open-mode-learn="${esc(discipline.id)}">Revoir</button>
        </section>`;
      }

      let world = {};
      try { world = lessonWorld(next) || {}; } catch {}
      const started = Number(state.quizProgress?.[next.id]?.answeredCount || 0) > 0;
      return `<section class="card beta182-next-card" style="--discipline-accent:${esc(discipline.accent)}">
        <div class="beta182-next-icon">${HD_ICONS.lesson(next, world, discipline)}</div>
        <div class="beta182-next-copy"><span class="card-label">À continuer · ${done}/${totalLessons.length || 0}</span><h2>${esc(lessonTitle(next))}</h2><p>${esc(world.title || discipline.title)} · ${progress}% du domaine validé</p></div>
        <button type="button" data-home-continue="${esc(next.id)}" data-home-continue-view="${started ? "quiz" : "express"}">${started ? "Reprendre" : "Commencer"}</button>
      </section>`;
    };
  } catch {}

  try {
    modeRecommendationsMarkup = function beta182ModeRecommendationsMarkup(disciplineId = activeDisciplineId()) {
      const discipline = disciplineById(disciplineId);
      const all = availableDisciplineLessons(discipline.id);
      const unfinished = all.filter(lesson => !lessonIsDone(lesson));
      const pool = unfinished.length ? unfinished : all;
      if (!pool.length) return "";
      const offset = Math.max(0, Number(state.discoverOffset || 0)) % pool.length;
      const choices = [];
      for (let i = 0; i < pool.length && choices.length < 3; i += 1) {
        const lesson = pool[(offset + i) % pool.length];
        if (lesson && !choices.some(item => item.id === lesson.id)) choices.push(lesson);
      }
      return `<section class="card beta182-discovery-card" style="--discipline-accent:${esc(discipline.accent)}">
        <div class="section-title-row"><div><span class="card-label">À découvrir</span><h2>Trois cours, sans surcharge</h2></div><button type="button" class="ghost mini-button" data-open-mode-learn="${esc(discipline.id)}">Tout voir</button></div>
        <div class="beta182-discovery-row">${choices.map(lesson => {
          let world = {};
          try { world = lessonWorld(lesson) || {}; } catch {}
          return `<article class="beta182-discovery-item ${lessonIsDone(lesson) ? "done" : ""}" data-home-discovery="${esc(lesson.id)}" tabindex="0" role="button">
            <span>${HD_ICONS.lesson(lesson, world, discipline)}</span>
            <strong>${esc(lessonTitle(lesson))}</strong>
            <small>${lessonIsDone(lesson) ? "Déjà validé" : esc(world.title || discipline.title)}</small>
          </article>`;
        }).join("")}</div>
      </section>`;
    };
  } catch {}

  try {
    disciplineSelectorMarkup = function beta182DisciplineSelectorMarkup(selectedId = activeDisciplineId()) {
      const selected = disciplineById(selectedId);
      return `<section class="discipline-picker card beta182-discipline-picker" style="--discipline-accent:${esc(selected.accent)}">
        <div class="beta182-picker-heading"><div><span class="card-label">Discipline</span><h2>${HD_ICONS.discipline(selected)} ${esc(selected.title)}</h2></div><small>Glisse pour changer</small></div>
        <div class="beta182-discipline-tabs" role="list" aria-label="Disciplines">${DISCIPLINES.map(item => {
          const stats = disciplineProgress(item.id);
          const active = item.id === selected.id;
          return `<button type="button" role="listitem" class="${active ? "active" : ""}" data-discipline="${esc(item.id)}" style="--discipline-accent:${esc(item.accent)}" aria-pressed="${active ? "true" : "false"}"><span class="mode-pill-icon">${HD_ICONS.rawDiscipline ? HD_ICONS.rawDiscipline(item) : HD_ICONS.discipline(item)}</span><strong>${esc(disciplineModeCopy(item.id).shortLabel || item.title)}</strong><small>${stats.progress}%</small></button>`;
        }).join("")}</div>
      </section>`;
    };
  } catch {}

  const previousReleaseNotesMarkup = typeof releaseNotesMarkup === "function" ? releaseNotesMarkup : null;
  if (previousReleaseNotesMarkup) {
    releaseNotesMarkup = function beta182ReleaseNotesMarkup({ home = false } = {}) {
      if (!home) return previousReleaseNotesMarkup({ home });
      const notes = HISTODAILY_CORE.ui?.releaseNotes || [];
      if (!notes.length || state.dismissedReleaseVersion === APP_VERSION) return "";
      return `<section class="card beta182-update-card"><details><summary><span>Nouveautés de la ${esc(HISTODAILY_CORE.ui?.versionLabel || "mise à jour")}</span><small>Voir</small></summary><div><ul>${notes.map(note => `<li>${esc(note)}</li>`).join("")}</ul><button type="button" class="ghost wide" data-dismiss-release>J’ai compris</button></div></details></section>`;
    };
  }

  function directShellChildren(shell, selectors) {
    const selector = selectors.join(",");
    return Array.from(shell?.children || []).filter(node => node.matches?.(selector));
  }

  function makeFold(shell, nodes, { id, icon, title, subtitle, open = false } = {}) {
    const unique = [...new Set(nodes)].filter(node => node?.parentElement === shell);
    if (!unique.length || shell.querySelector(`[data-beta182-fold="${id}"]`)) return null;
    const fold = document.createElement("details");
    fold.className = "card beta182-profile-fold";
    fold.dataset.beta182Fold = id;
    fold.open = open;
    fold.innerHTML = `<summary><span class="beta182-fold-icon">${icon}</span><span><strong>${esc(title)}</strong><small>${esc(subtitle)}</small></span><b aria-hidden="true">⌄</b></summary><div class="beta182-fold-content"></div>`;
    unique[0].insertAdjacentElement("beforebegin", fold);
    const content = fold.querySelector(".beta182-fold-content");
    unique.forEach(node => content.appendChild(node));
    return fold;
  }

  function revealActiveHorizontal(containerSelector, activeSelector) {
    window.requestAnimationFrame(() => {
      const container = document.querySelector(containerSelector);
      const active = container?.querySelector(activeSelector);
      if (!container || !active) return;
      const target = active.offsetLeft - Math.max(0, (container.clientWidth - active.offsetWidth) / 2);
      container.scrollLeft = Math.max(0, target);
    });
  }

  function polishHome() {
    const shell = document.querySelector(".app-shell.tab-home");
    if (!shell) return;
    shell.classList.add("beta182-home-shell");
    shell.querySelector(".home-secondary-actions")?.remove();
    shell.querySelector(".home-mode-card")?.remove();
    shell.querySelector(".home-clean-hero h1")?.setAttribute("aria-label", "HistoDaily, un rendez-vous quotidien de culture générale");
    revealActiveHorizontal(".beta182-home-shell .home-mode-switcher", ".mode-pill.active");
    const plan = shell.querySelector(".beta180-daily-plan");
    if (plan) {
      plan.classList.add("beta182-daily-plan");
      plan.querySelectorAll(".beta180-plan-steps button small").forEach(node => node.setAttribute("aria-hidden", "true"));
    }
  }

  function polishLearn() {
    const shell = document.querySelector(".app-shell.tab-learn");
    if (!shell) return;
    shell.classList.add("beta182-learn-shell");
    const picker = shell.querySelector(".beta182-discipline-picker");
    const hub = shell.querySelector(".beta181-learning-hub");
    if (picker && hub && hub.nextElementSibling === picker) hub.insertAdjacentElement("beforebegin", picker);
    shell.querySelectorAll(".tree-card").forEach(card => card.classList.add("beta182-tree-card"));
    revealActiveHorizontal(".beta182-learn-shell .beta182-discipline-tabs", "button.active");
  }

  function polishProfile() {
    const shell = document.querySelector(".app-shell.tab-profile");
    if (!shell) return;
    shell.classList.add("beta182-profile-shell");

    const culture = directShellChildren(shell, [".culture-profile-card"]);
    makeFold(shell, culture, {
      id: "culture",
      icon: HD_ICONS.action("ranking"),
      title: "Progression détaillée",
      subtitle: "Voir le jeton et les pourcentages par discipline"
    });

    const social = directShellChildren(shell, [
      ".pseudo-card", ".beta125-requests-card", ".add-friend-card", ".invite-link-card",
      ".invite-card", ".friends-list-card", ".empty-friends-card", ".social-shortcuts", ".social-backend"
    ]);
    makeFold(shell, social, {
      id: "social",
      icon: HD_ICONS.action("users"),
      title: "Social et classements",
      subtitle: "Pseudo, amis, invitations et comparaison des scores"
    });

    const settings = directShellChildren(shell, [
      ".backup-card", ".install-card", ".profile-settings-card", ".beta115-health-card"
    ]);
    makeFold(shell, settings, {
      id: "settings",
      icon: HD_ICONS.action("settings"),
      title: "Réglages et données",
      subtitle: "Affichage, installation, sauvegarde et réparation"
    });
  }

  function polishGenericScreen(tab) {
    const shell = document.querySelector(`.app-shell.tab-${tab}`);
    if (!shell) return;
    shell.classList.add("beta182-clean-shell");
  }

  const previousRenderHome = typeof renderHome === "function" ? renderHome : null;
  if (previousRenderHome) renderHome = function beta182RenderHome(){ const out = previousRenderHome(); polishHome(); return out; };

  const previousRenderLearn = typeof renderLearn === "function" ? renderLearn : null;
  if (previousRenderLearn) renderLearn = function beta182RenderLearn(){ const out = previousRenderLearn(); polishLearn(); return out; };

  const previousRenderProfile = typeof renderProfile === "function" ? renderProfile : null;
  if (previousRenderProfile) renderProfile = function beta182RenderProfile(){ const out = previousRenderProfile(); polishProfile(); return out; };

  try {
    const previousRenderMystery = renderMystery;
    renderMystery = function beta182RenderMystery(){ const out = previousRenderMystery(); polishGenericScreen("mystery"); return out; };
  } catch {}
  try {
    const previousRenderRank = renderRank;
    renderRank = function beta182RenderRank(){ const out = previousRenderRank(); polishGenericScreen("rank"); return out; };
  } catch {}
  try {
    const previousRenderPublicProfile = renderPublicProfile;
    renderPublicProfile = function beta182RenderPublicProfile(){ const out = previousRenderPublicProfile(); polishGenericScreen("publicProfile"); return out; };
  } catch {}

  const style = document.createElement("style");
  style.id = "beta182-interface-style";
  style.textContent = `
    :root{--beta182-gap:12px;--beta182-radius:18px}
    html{scrollbar-gutter:stable;overscroll-behavior-y:none}
    body{overscroll-behavior-y:none}
    .app-shell{gap:var(--beta182-gap);padding-bottom:calc(92px + env(safe-area-inset-bottom))}
    .app-shell>.card,.app-shell>.tree-section{margin-block:0}
    .card{border-radius:var(--beta182-radius);box-shadow:0 9px 28px rgba(0,0,0,.14)}
    .performance-light .card{box-shadow:0 5px 18px rgba(0,0,0,.11);backdrop-filter:none!important}
    button,.tree-card,[role="button"]{touch-action:manipulation;-webkit-tap-highlight-color:transparent}
    button{min-height:44px;transition:transform .12s ease,border-color .12s ease,background-color .12s ease,opacity .12s ease}
    button:active{transform:scale(.985)}
    .bottom-nav{background:rgba(5,10,18,.92)!important;backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,.08);box-shadow:0 -12px 32px rgba(0,0,0,.22)}
    .bottom-nav .nav-item{min-height:54px;border-radius:14px}
    .bottom-nav .nav-item.active{background:color-mix(in srgb,var(--discipline-accent,var(--accent)) 15%,rgba(255,255,255,.04));box-shadow:none}
    .home-secondary-actions{display:none!important}

    .beta182-home-shell .home-clean-hero{padding:15px 16px;min-height:0}
    .beta182-home-shell .home-clean-hero h1{max-width:520px;margin:.15rem 0 .5rem;font-size:clamp(1.65rem,6.4vw,2.35rem);line-height:1.02;letter-spacing:-.035em}
    .beta182-home-shell .hero-metrics{gap:7px}
    .beta182-home-shell .hero-metrics span{padding:5px 8px;font-size:.72rem}
    .beta182-home-shell .home-mode-switcher{margin:0;padding:2px 0 5px;gap:7px;scroll-snap-type:x proximity;scrollbar-width:none}
    .beta182-home-shell .home-mode-switcher::-webkit-scrollbar{display:none}
    .beta182-home-shell .mode-pill{min-width:auto;padding:8px 10px;border-radius:14px;scroll-snap-align:start}
    .beta182-home-shell .mode-pill span{font-size:1rem}.beta182-home-shell .mode-pill strong{font-size:.72rem}.beta182-home-shell .mode-pill small{font-size:.63rem}
    .beta182-home-shell .home-mystery-card{padding:15px 16px}
    .beta182-home-shell .home-mystery-card>p{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin:.45rem 0 .7rem}
    .beta182-home-shell .home-mystery-card .section-title-row{gap:8px}
    .beta182-home-shell .home-mystery-card h2{font-size:1.1rem}

    .beta182-daily-plan{padding:14px 15px!important}
    .beta182-daily-plan .beta180-plan-head h2{font-size:1rem;margin:.1rem 0}
    .beta182-daily-plan .beta180-plan-head p{display:none!important}
    .beta182-daily-plan .beta180-plan-head>strong{padding:5px 8px;font-size:.68rem}
    .beta182-daily-plan .beta180-plan-meter{height:5px;margin:9px 0}
    .beta182-daily-plan .beta180-plan-steps{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px}
    .beta182-daily-plan .beta180-plan-steps button{display:flex!important;flex-direction:column;align-items:flex-start;gap:6px;padding:8px!important;min-height:72px}
    .beta182-daily-plan .beta180-plan-steps button>b{width:24px;height:24px;font-size:.68rem;flex:0 0 auto}
    .beta182-daily-plan .beta180-plan-steps button span{font-size:.7rem;line-height:1.2}
    .beta182-daily-plan .beta180-plan-steps button small{display:none!important}
    .beta182-daily-plan .beta180-plan-footer{margin-top:8px}
    .beta182-daily-plan .beta180-plan-footer>span{display:none}
    .beta182-daily-plan .beta180-plan-footer>button{width:100%;padding:8px 12px;min-height:40px}
    .beta182-daily-plan .beta181-week-strip{margin-top:9px;padding-top:8px}

    .beta182-next-card{display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:11px;align-items:center;padding:14px 15px;border-color:color-mix(in srgb,var(--discipline-accent) 28%,rgba(255,255,255,.08));background:linear-gradient(135deg,color-mix(in srgb,var(--discipline-accent) 8%,rgba(255,255,255,.035)),rgba(255,255,255,.025))}
    .beta182-next-icon{display:grid;place-items:center;width:44px;height:44px;border-radius:14px;background:color-mix(in srgb,var(--discipline-accent) 15%,rgba(255,255,255,.05));font-size:1.25rem}
    .beta182-next-card h2{margin:2px 0 3px;font-size:1rem;line-height:1.2}.beta182-next-card p{margin:0;font-size:.74rem;color:var(--muted)}
    .beta182-next-card>button{padding:9px 12px;white-space:nowrap}
    .beta182-next-card.complete{border-color:rgba(72,213,151,.25)}

    .beta182-discovery-card{padding:14px 15px}
    .beta182-discovery-card .section-title-row{margin-bottom:9px}.beta182-discovery-card h2{font-size:1rem;margin-top:2px}
    .beta182-discovery-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
    .beta182-discovery-item{display:grid;grid-template-columns:auto minmax(0,1fr);grid-template-areas:"icon title" "icon meta";align-items:center;gap:2px 8px;min-height:70px;padding:9px;text-align:left;border:1px solid rgba(255,255,255,.075);border-radius:14px;background:rgba(255,255,255,.028);color:inherit}
    .beta182-discovery-item>span{grid-area:icon;font-size:1.2rem}.beta182-discovery-item>strong{grid-area:title;font-size:.75rem;line-height:1.22}.beta182-discovery-item>small{grid-area:meta;font-size:.64rem;opacity:.58;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .beta182-discovery-item.done{border-color:rgba(72,213,151,.22)}

    .beta182-update-card{padding:0!important;background:rgba(255,255,255,.025)}
    .beta182-update-card details>summary{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 14px;cursor:pointer;list-style:none;font-weight:850}
    .beta182-update-card summary::-webkit-details-marker{display:none}.beta182-update-card summary small{opacity:.55}
    .beta182-update-card details>div{padding:0 14px 14px;border-top:1px solid rgba(255,255,255,.07)}
    .beta182-update-card ul{margin:12px 0;padding-left:18px;color:var(--muted);font-size:.8rem;line-height:1.45}

    .beta182-discipline-picker{padding:11px 12px!important;overflow:hidden}
    .beta182-picker-heading{display:flex;justify-content:space-between;align-items:end;gap:12px;margin-bottom:9px}
    .beta182-picker-heading h2{margin:2px 0 0;font-size:1rem}.beta182-picker-heading>small{font-size:.67rem;color:var(--muted)}
    .beta182-discipline-tabs{display:flex;gap:7px;overflow-x:auto;padding:1px 1px 5px;scroll-snap-type:x proximity;scrollbar-width:none}
    .beta182-discipline-tabs::-webkit-scrollbar{display:none}
    .beta182-discipline-tabs button{display:grid;grid-template-columns:auto auto;grid-template-areas:"icon title" "icon pct";gap:0 6px;align-items:center;flex:0 0 auto;min-height:48px;padding:7px 10px;border:1px solid rgba(255,255,255,.075);border-radius:14px;background:rgba(255,255,255,.025);color:inherit;text-align:left;scroll-snap-align:start}
    .beta182-discipline-tabs button>span{grid-area:icon;font-size:1.05rem}.beta182-discipline-tabs button>strong{grid-area:title;font-size:.72rem}.beta182-discipline-tabs button>small{grid-area:pct;font-size:.61rem;color:var(--muted)}
    .beta182-discipline-tabs button.active{border-color:color-mix(in srgb,var(--discipline-accent) 52%,rgba(255,255,255,.1));background:color-mix(in srgb,var(--discipline-accent) 11%,rgba(255,255,255,.025))}

    .beta182-learn-shell .tree-topbar{padding-bottom:6px}.beta182-learn-shell .tree-topbar .tree-subtitle{margin-top:2px}
    .beta182-learn-shell .beta181-learning-hub{padding:14px 15px}
    .beta182-learn-shell .beta181-learning-hub>.section-title-row p{display:none}
    .beta182-learn-shell .beta179-master-bar{height:6px;margin:9px 0}
    .beta182-learn-shell .beta181-path-card{padding:11px;border-radius:15px;grid-template-columns:38px minmax(0,1fr) auto}
    .beta182-learn-shell .beta181-path-icon{width:38px;height:38px;border-radius:12px;font-size:1.1rem}
    .beta182-learn-shell .beta181-path-card h3{font-size:.9rem}.beta182-learn-shell .beta181-path-card p{font-size:.68rem}
    .beta182-learn-shell .beta181-progress-actions{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
    .beta182-learn-shell .beta181-progress-actions button{padding:8px;min-height:56px}
    .beta182-learn-shell .beta181-progress-actions button b{font-size:.68rem}.beta182-learn-shell .beta181-progress-actions button span{display:none}
    .beta182-learn-shell .beta117-chapter-list>.section-title-row{margin:3px 0 9px}
    .beta182-learn-shell .periods-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}
    .beta182-learn-shell .tree-card.period-card{content-visibility:visible!important;contain:none!important;min-height:0;padding:13px;gap:9px;border-radius:16px}
    .beta182-learn-shell .tree-card.period-card h2{font-size:1rem;margin:.15rem 0}.beta182-learn-shell .tree-card.period-card p{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;font-size:.76rem;line-height:1.35}
    .beta182-learn-shell .tree-card.period-card .tree-kicker{font-size:.62rem}

    .beta182-profile-shell>.topbar{margin-bottom:0}
    .beta182-profile-shell .public-profile-card{padding:15px}
    .beta182-profile-shell .beta181-weekly-card,.beta182-profile-shell .beta179-profile-mastery,.beta182-profile-shell .beta179-profile-collections{padding:14px 15px}
    .beta182-profile-shell .beta181-weekly-card>.section-title-row p,.beta182-profile-shell .beta179-profile-mastery>.section-title-row p,.beta182-profile-shell .beta179-profile-collections>.section-title-row p{display:none}
    .beta182-profile-shell .beta179-mastery-list{gap:9px}.beta182-profile-shell .beta179-mastery-row{gap:8px}.beta182-profile-shell .beta179-mastery-row small{display:none}
    .beta182-profile-shell .beta179-collection-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
    .beta182-profile-shell .beta179-collection-card{padding:10px;grid-template-columns:38px minmax(0,1fr);gap:8px;border-radius:14px}.beta182-profile-shell .beta179-medal{width:38px;height:38px;font-size:1.1rem}.beta182-profile-shell .beta179-collection-card p{display:none}
    .beta182-profile-fold{padding:0!important;overflow:hidden;background:rgba(255,255,255,.025)}
    .beta182-profile-fold>summary{display:grid;grid-template-columns:40px minmax(0,1fr) auto;gap:10px;align-items:center;padding:13px 14px;cursor:pointer;list-style:none}
    .beta182-profile-fold>summary::-webkit-details-marker{display:none}.beta182-fold-icon{display:grid;place-items:center;width:40px;height:40px;border-radius:13px;background:rgba(255,255,255,.055);font-size:1.15rem}
    .beta182-profile-fold>summary strong{display:block;font-size:.9rem}.beta182-profile-fold>summary small{display:block;margin-top:2px;color:var(--muted);font-size:.7rem}.beta182-profile-fold>summary>b{font-size:1rem;transition:transform .15s ease}
    .beta182-profile-fold[open]>summary>b{transform:rotate(180deg)}
    .beta182-fold-content{display:grid;gap:9px;padding:0 9px 9px;border-top:1px solid rgba(255,255,255,.065)}
    .beta182-fold-content>.card,.beta182-fold-content>.achievement-grid{margin:0;border-radius:14px;box-shadow:none;background:rgba(3,8,18,.28)}
    .beta182-fold-content>.card:first-child{margin-top:9px}
    .beta182-profile-shell .achievement-modern{grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
    .beta182-profile-shell .achievement{min-height:68px;padding:9px;border-radius:14px}

    .beta182-clean-shell>.topbar,.beta182-profile-shell>.topbar,.beta182-learn-shell>.topbar{position:sticky;top:0;z-index:20;margin-inline:-1px;padding-top:calc(8px + env(safe-area-inset-top));background:linear-gradient(180deg,rgba(5,12,22,.97),rgba(5,12,22,.88) 75%,transparent);backdrop-filter:blur(12px)}

    @media(max-width:700px){
      .app-shell{gap:10px}
      .card{border-radius:16px}
      .beta182-next-card{grid-template-columns:40px minmax(0,1fr);padding:12px}
      .beta182-next-card>button{grid-column:1/-1;width:100%;min-height:40px}
      .beta182-next-icon{width:40px;height:40px}
      .beta182-discovery-row{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:3px;scrollbar-width:none}
      .beta182-discovery-row::-webkit-scrollbar{display:none}
      .beta182-discovery-item{flex:0 0 min(78vw,260px);scroll-snap-align:start}
      .beta182-learn-shell .periods-grid{grid-template-columns:1fr}
      .beta182-learn-shell .beta181-path-card{grid-template-columns:38px minmax(0,1fr)}
      .beta182-learn-shell .beta181-path-card button{grid-column:1/-1;width:100%;min-height:40px}
      .beta182-learn-shell .beta181-progress-actions{grid-template-columns:repeat(3,minmax(0,1fr))!important}
      .beta182-learn-shell .beta181-progress-actions button:last-child{grid-column:auto!important}
      .beta182-profile-shell .beta181-week-goals{grid-template-columns:repeat(3,minmax(0,1fr))}
      .beta182-profile-shell .beta181-week-goal{grid-template-columns:auto 1fr;padding:8px;gap:6px}.beta182-profile-shell .beta181-week-goal>strong{grid-column:2}.beta182-profile-shell .beta181-week-goal>span{font-size:.9rem}
      .beta182-profile-shell .achievement-modern{grid-template-columns:repeat(2,minmax(0,1fr))}
    }

    @media(max-width:390px){
      .beta182-home-shell .home-clean-hero h1{font-size:1.55rem}
      .beta182-daily-plan .beta180-plan-steps button span{font-size:.66rem}
      .beta182-profile-shell .beta181-week-goals{grid-template-columns:1fr}
    }

    @media(prefers-reduced-motion:reduce){
      *,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
    }
  `;
  if (!document.getElementById(style.id)) document.head.appendChild(style);

  try {
    window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, interfacePolish: true };
    state.beta182InterfaceVersion = VERSION;
    if (typeof queueSaveState === "function") queueSaveState(100);
    if (typeof renderSoon === "function") renderSoon();
    else if (typeof render === "function") render({ immediate: true });
  } catch {}
})();
