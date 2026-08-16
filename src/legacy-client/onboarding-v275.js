/* HistoDaily beta 275 — vraie première ouverture, sans gêner les joueurs existants. */
(function histodailyBeta275FirstRun(){
  "use strict";
  const VERSION = "1.0.0-beta.275.0";
  const GUIDE_VERSION = "first-mystery-v1";
  let overlay = null;
  let step = 0;
  let selectedDiscipline = "history";
  let lastFocused = null;
  let replayMode = false;
  let backgroundState = [];

  const safe = (fn, fallback = null) => { try { const value = fn(); return value == null ? fallback : value; } catch { return fallback; } };
  const esc = value => String(value ?? "").replace(/[&<>\"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));

  function meaningfulActivity(){
    const maps = [state?.solvedMysteries, state?.completedLessons, state?.readLessons, state?.quizProgress, state?.friends];
    if (maps.some(map => map && Object.keys(map).length > 0)) return true;
    if (String(state?.pseudo || "").trim() && !/^invité$/i.test(String(state.pseudo).trim())) return true;
    if (state?.playerId || state?.friendCode || state?.socialIdentity?.playerId) return true;
    return false;
  }

  function shouldOpenAutomatically(){
    if (!state || state.onboardingCompletedAt || state.onboardingVersion) return false;
    if (meaningfulActivity()) return false;
    return true;
  }

  function readyDisciplines(){
    const list = safe(() => DISCIPLINES.filter(item => {
      const worlds = typeof treeAvailableWorlds === "function" ? treeAvailableWorlds(item.id) : [];
      return worlds.some(world => (typeof treeLessonsForWorld === "function" ? treeLessonsForWorld(world.id) : []).length > 0);
    }), []) || [];
    const preferred = ["history", "english", "philosophy", "astronomy", "art", "science-inventions"];
    const priority = id => {
      const index = preferred.indexOf(id);
      return index >= 0 ? index : preferred.length;
    };
    return list.sort((a, b) => priority(a.id) - priority(b.id) || String(a.title || "").localeCompare(String(b.title || ""), "fr")).slice(0, 6);
  }

  function disciplineInfo(item){
    const lessons = safe(() => lessonsForDiscipline(item.id), []) || [];
    const icon = safe(() => HD_ICONS.rawDiscipline(item), item.emoji || "✦");
    return { ...item, lessons: lessons.length, icon };
  }

  function viewMarkup(){
    const disciplines = readyDisciplines().map(disciplineInfo);
    const selected = disciplines.find(item => item.id === selectedDiscipline) || disciplines[0];
    if (selected) selectedDiscipline = selected.id;
    return `<div class="hd275-onboarding-inner hd35-onboarding-one" style="--hd275-accent:${esc(selected?.accent || "#f6c453")}">
      <div class="hd275-onboarding-top"><div class="hd275-logo"><i>⌛</i><span>HistoDaily</span></div></div>
      <p class="hd275-kicker">Ta dose quotidienne de culture</p>
      <h1>Un dossier.<br>Quelques minutes.<br>Une chose retenue.</h1>
      <p class="hd275-lead">Lis le contexte, choisis la réponse qui te paraît la plus logique, puis comprends pourquoi. Commence simplement par l’univers qui t’attire.</p>
      <div class="hd275-disciplines">${disciplines.map(item => `<button type="button" class="hd275-discipline ${item.id === selectedDiscipline ? "is-selected" : ""}" data-hd275-discipline="${esc(item.id)}" style="--discipline-accent:${esc(item.accent || "#f6c453")}"><span>${item.icon}</span><div><b>${esc(item.title)}</b><small>${item.lessons} cours</small></div></button>`).join("")}</div>
      ${selected?.id === "english" ? '<div class="hd275-selected-note"><b>Anglais</b><span>Comprendre le sens, le registre et l’implicite — pas réciter des listes de mots.</span></div>' : selected?.id === "philosophy" ? '<div class="hd275-selected-note"><b>Philosophie</b><span>Raisonner, distinguer et objecter avant de réciter des auteurs.</span></div>' : ""}
      <div class="hd275-actions"><button type="button" class="hd275-next" data-hd275-next>${replayMode ? "Fermer" : "Lancer mon expédition"}</button></div>
      ${!replayMode ? '<button type="button" class="hd275-skip" data-hd275-home>Voir d’abord l’accueil</button>' : ""}
    </div>`;
  }

  function bindOverlay(){
    overlay?.querySelector("[data-hd275-next]")?.addEventListener("click", () => {
      if (replayMode) close();
      else complete("mystery");
    });
    overlay?.querySelector("[data-hd275-home]")?.addEventListener("click", () => complete("home"));
    overlay?.querySelectorAll("[data-hd275-discipline]").forEach(button => button.addEventListener("click", () => {
      selectedDiscipline = button.dataset.hd275Discipline || "history";
      draw();
    }));
  }

  function draw(){
    if (!overlay) return;
    const panel = overlay.querySelector(".hd275-onboarding");
    panel.innerHTML = viewMarkup();
    bindOverlay();
    panel.scrollTop = 0;
    window.requestAnimationFrame?.(() => panel.querySelector("[data-hd275-next]")?.focus({ preventScroll:true }));
  }

  function isolateBackground(){
    const nodes = [document.getElementById("app"), document.querySelector(".skip-link")].filter(Boolean);
    backgroundState = nodes.map(node => ({
      node,
      inert: Boolean(node.inert),
      ariaHidden: node.getAttribute("aria-hidden")
    }));
    try { lastFocused?.blur?.(); } catch {}
    nodes.forEach(node => {
      try { node.inert = true; } catch {}
      node.setAttribute("aria-hidden", "true");
    });
  }

  function restoreBackground(){
    backgroundState.forEach(({ node, inert, ariaHidden }) => {
      if (!node?.isConnected) return;
      try { node.inert = inert; } catch {}
      if (ariaHidden === null) node.removeAttribute("aria-hidden");
      else node.setAttribute("aria-hidden", ariaHidden);
    });
    backgroundState = [];
  }

  function trapFocus(event){
    if (!overlay || event.key !== "Tab") return;
    const focusable = [...overlay.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter(node => node.getClientRects().length > 0);
    if (!focusable.length) { event.preventDefault(); return; }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function close(){
    if (!overlay) return;
    overlay.remove();
    overlay = null;
    document.body.classList.remove("hd275-onboarding-open");
    restoreBackground();
    try { lastFocused?.focus?.({ preventScroll:true }); } catch {}
  }

  function selectedContext(){
    const worlds = safe(() => treeAvailableWorlds(selectedDiscipline), []) || [];
    const firstWorld = worlds.find(world => safe(() => treeLessonsForWorld(world.id).length, 0) > 0) || worlds[0] || null;
    const mystery = safe(() => mysteryForDisciplineDayOffset(selectedDiscipline, 0), null) || safe(() => dailyMystery(), null);
    return { firstWorld, mystery };
  }

  function complete(destination){
    const { firstWorld, mystery } = selectedContext();
    const patch = {
      onboardingVersion: VERSION,
      onboardingCompletedAt: new Date().toISOString(),
      currentDiscipline: selectedDiscipline,
      currentGroup: firstWorld?.group || state.currentGroup,
      currentWorld: firstWorld?.id || state.currentWorld,
      firstMysteryGuideVersion: GUIDE_VERSION,
      firstMysteryGuideDismissed: true,
      tab: destination === "mystery" && mystery ? "mystery" : "home",
      currentMysteryId: destination === "mystery" && mystery ? mystery.id : state.currentMysteryId,
      currentMysteryDiscipline: destination === "mystery" && mystery ? selectedDiscipline : state.currentMysteryDiscipline
    };
    close();
    try { setState(patch); } catch { Object.assign(state, patch); safe(() => saveState()); safe(() => render({ immediate:true })); }
  }

  function open({ replay = false } = {}){
    if (overlay) return;
    lastFocused = document.activeElement;
    step = 0;
    replayMode = Boolean(replay);
    selectedDiscipline = activeDisciplineId?.() || state?.currentDiscipline || "history";
    overlay = document.createElement("div");
    overlay.className = "hd275-onboarding-layer";
    overlay.setAttribute("role", "presentation");
    overlay.innerHTML = `<section class="hd275-onboarding" role="dialog" aria-modal="true" aria-label="Découvrir HistoDaily"></section>`;
    document.body.appendChild(overlay);
    document.body.classList.add("hd275-onboarding-open");
    isolateBackground();
    overlay.addEventListener("keydown", trapFocus);
    draw();
  }

  function maybeOpen(){
    if (!shouldOpenAutomatically()) return;
    window.requestAnimationFrame?.(() => open());
  }

  function mountFirstMysteryGuide(){
    // RC17 : supprimé. Le jeu lui-même enseigne maintenant son fonctionnement, sans panneau supplémentaire.
    return;
  }

  function mountReplayControl(){
    const shell = document.querySelector(".app-shell.tab-profile");
    if (!shell || shell.querySelector("[data-hd275-replay]")) return;
    const target = shell.querySelector('[data-beta182-fold="settings"] .beta182-fold-content') || shell.querySelector(".profile-settings-card") || shell.querySelector(".hd220-profile");
    if (!target) return;
    const block = document.createElement("div");
    block.className = "hd275-replay-card";
    block.innerHTML = `<div><b>Introduction</b><small>Revoir le fonctionnement du rituel quotidien.</small></div><button type="button" class="ghost" data-hd275-replay>Revoir</button>`;
    target.appendChild(block);
    block.querySelector("[data-hd275-replay]")?.addEventListener("click", () => open({ replay:true }));
  }

  const previousHome = typeof renderHome === "function" ? renderHome : null;
  if (previousHome) renderHome = function beta275RenderHome(){ const result = previousHome(); maybeOpen(); return result; };
  const previousMystery = typeof renderMystery === "function" ? renderMystery : null;
  if (previousMystery) renderMystery = function beta275RenderMystery(){ const result = previousMystery(); mountFirstMysteryGuide(); return result; };
  const previousProfile = typeof renderProfile === "function" ? renderProfile : null;
  if (previousProfile) renderProfile = function beta275RenderProfile(){ const result = previousProfile(); window.requestAnimationFrame?.(mountReplayControl); return result; };

  window.HistoDailyOnboarding = { version: VERSION, open: () => open({ replay:true }), shouldOpenAutomatically };
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version:VERSION, firstRunV1:true, guidedFirstMystery:false }; } catch {}
})();
