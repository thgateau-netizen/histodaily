/* HistoDaily beta 276 — livraison du mystère en écrans successifs. */
(function histodailyExpeditionDelivery276(){
  "use strict";

  const VERSION = "1.0.0-rc.13.1";
  const STORE_KEY = "histodaily.delivery.v276";
  const AUTO_OPEN_WINDOW_MS = 30000;
  let scheduled = false;
  let lastTrigger = "";

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
  const clip = (value, max = 430) => {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    if (text.length <= max) return text;
    return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
  };

  function readStore(){
    try {
      const parsed = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function remember(mysteryId){
    const store = readStore();
    const seen = store.seen && typeof store.seen === "object" ? { ...store.seen } : {};
    seen[String(mysteryId)] = Date.now();
    const entries = Object.entries(seen).sort((a, b) => Number(b[1]) - Number(a[1])).slice(0, 60);
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ version: VERSION, seen: Object.fromEntries(entries) })); } catch {}
  }

  function alreadySeen(mysteryId){
    return Boolean(readStore().seen?.[String(mysteryId)]);
  }

  function timingLabel(mysteryId){
    try {
      const store = JSON.parse(localStorage.getItem("histodaily.expedition.v264") || "{}");
      const timing = store?.[String(mysteryId)] || {};
      const start = Number(timing.startedAt || 0);
      const end = Number(timing.endedAt || 0);
      if (!start || !end || end < start) return "—";
      const seconds = Math.max(0, Math.floor((end - start) / 1000));
      const minutes = Math.floor(seconds / 60);
      return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
    } catch {
      return "—";
    }
  }

  function rankForToday(){
    const rows = safe(() => leaderboardRows("daily"), []) || [];
    const pseudo = String(safe(() => state.pseudo, "")).trim().toLocaleLowerCase("fr-FR");
    const row = rows.find(item => item?.me || item?.isMe || (pseudo && String(item?.name || "").trim().toLocaleLowerCase("fr-FR") === pseudo));
    const rank = Number(row?.rank || 0);
    return rank > 0 ? rank : null;
  }

  function currentData(){
    const mystery = safe(() => currentMystery(), null);
    if (!mystery?.id) return null;
    const solved = safe(() => state.solvedMysteries?.[mystery.id], null);
    if (!solved || solved.archive || solved.daily === false || !safe(() => isTodayMystery(mystery.id), true)) return null;
    const lesson = mystery.lessonId ? safe(() => curatedLessonById(mystery.lessonId), null) : null;
    const claim = safe(() => todayClaim(), null) || {};
    const rank = rankForToday();
    const hints = Math.max(0, Number(solved.hints || 0));
    const tries = Math.max(1, Number(solved.tries || 1));
    return {
      mystery,
      solved,
      lesson,
      claim,
      rank,
      hints,
      tries,
      score: Math.max(0, Number(solved.score || 0)),
      duration: timingLabel(mystery.id),
      explanation: clip(mystery.explanation || "Le dossier est identifié. Le cours associé permet maintenant de comprendre pourquoi cette réponse relie tous les indices."),
      discipline: safe(() => disciplineById(mysteryDisciplineId(mystery)), null)
    };
  }

  function progressMarkup(step){
    return `<div class="hd276-delivery-progress" aria-label="Étape ${step + 1} sur 3">${[0,1,2].map(index => `<i class="${index < step ? "done" : index === step ? "current" : ""}"></i>`).join("")}</div>`;
  }

  function screenMarkup(data, step){
    const disciplineLabel = data.discipline?.title || "Culture générale";
    if (step === 0) {
      return `<section class="hd276-delivery-screen reveal" data-hd276-screen="reveal">
        <div class="hd276-delivery-symbol" aria-hidden="true">✓</div>
        <span class="hd276-delivery-kicker">Dossier résolu</span>
        <h2>${esc(data.mystery.answer || data.mystery.title || "Réponse trouvée")}</h2>
        <p class="hd276-delivery-domain">${esc(disciplineLabel)}</p>
        <p class="hd276-delivery-explanation">${esc(data.explanation)}</p>
        <button type="button" class="hd276-delivery-primary" data-hd276-next>Voir mon résultat <b aria-hidden="true">→</b></button>
      </section>`;
    }
    if (step === 1) {
      const precision = data.hints === 0 ? "Sans indice" : `${data.hints} indice${data.hints > 1 ? "s" : ""}`;
      const claimText = data.claim?.gems
        ? `+${Number(data.claim.gems)} gemme${Number(data.claim.gems) > 1 ? "s" : ""} · série ${Number(data.claim.streak || 1)} jour${Number(data.claim.streak || 1) > 1 ? "s" : ""}`
        : "Récompense quotidienne enregistrée";
      return `<section class="hd276-delivery-screen performance" data-hd276-screen="performance">
        <span class="hd276-delivery-kicker">Ta performance</span>
        <h2>Un résultat lisible, sans tout mélanger.</h2>
        <div class="hd276-delivery-stats">
          <article><strong>${data.score}</strong><span>XP</span></article>
          <article><strong>${esc(data.duration)}</strong><span>temps</span></article>
          <article><strong>${esc(precision)}</strong><span>précision</span></article>
          <article><strong>${data.rank ? `#${data.rank}` : "…"}</strong><span>${data.rank ? "rang du jour" : "synchronisation"}</span></article>
        </div>
        <div class="hd276-delivery-reward"><span aria-hidden="true">◆</span><div><small>Récompense du jour</small><b>${esc(claimText)}</b></div></div>
        <div class="hd276-delivery-nav"><button type="button" class="ghost" data-hd276-prev>Retour</button><button type="button" class="hd276-delivery-primary" data-hd276-next>Poursuivre l’expédition <b aria-hidden="true">→</b></button></div>
      </section>`;
    }
    return `<section class="hd276-delivery-screen next" data-hd276-screen="next">
      <span class="hd276-delivery-kicker">Étape suivante</span>
      <h2>${data.lesson ? "Comprendre ce que tu viens de trouver" : "Le dossier est maintenant classé"}</h2>
      ${data.lesson ? `<article class="hd276-delivery-lesson"><span aria-hidden="true">↗</span><div><small>Cours associé</small><h3>${esc(data.lesson.title)}</h3><p>Commence par l’essentiel ou ouvre directement le cours complet.</p></div></article>
      <div class="hd276-delivery-course-actions"><button type="button" class="ghost" data-hd276-lesson="express">Résumé express</button><button type="button" class="hd276-delivery-primary" data-hd276-lesson="complete">Cours complet <b aria-hidden="true">→</b></button></div>` : `<p class="hd276-delivery-explanation">Tu peux revenir à l’accueil ou consulter le classement du jour.</p>`}
      <div class="hd276-delivery-secondary-actions"><button type="button" data-hd276-share>Partager</button><button type="button" data-hd276-rank>Classement</button><button type="button" data-hd276-home>Retour à l’accueil</button></div>
      <button type="button" class="hd276-delivery-backlink" data-hd276-prev>← Revoir mon résultat</button>
    </section>`;
  }

  function openDelivery(data, { replay = false } = {}){
    if (!data?.mystery?.id || document.querySelector(".hd276-delivery-layer, .hd275-onboarding-layer")) return null;
    remember(data.mystery.id);
    const returnFocus = document.activeElement;
    let step = 0;
    const overlay = document.createElement("div");
    overlay.className = "hd276-delivery-layer";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "hd276-delivery-title");
    overlay.innerHTML = `<div class="hd276-delivery-shell">
      <header class="hd276-delivery-head"><div><small>HistoDaily · livraison du dossier</small><h1 id="hd276-delivery-title">${replay ? "Revoir la résolution" : "Expédition du jour"}</h1></div><button type="button" data-hd276-close aria-label="Fermer">×</button></header>
      <main class="hd276-delivery-body"></main>
      <footer>${progressMarkup(step)}</footer>
    </div>`;
    document.body.appendChild(overlay);
    document.body.classList.add("hd276-delivery-open");

    let closed = false;
    const close = () => {
      if (closed) return;
      closed = true;
      overlay.remove();
      document.body.classList.remove("hd276-delivery-open");
      try { returnFocus?.focus?.({ preventScroll: true }); } catch {}
    };
    const goHome = () => {
      close();
      try { setState({ tab: "home" }, { renderImmediate: true, save: true }); }
      catch { try { setState({ tab: "home" }); } catch {} }
    };
    const show = nextStep => {
      step = Math.max(0, Math.min(2, Number(nextStep) || 0));
      const body = overlay.querySelector(".hd276-delivery-body");
      if (!overlay.isConnected || closed) return;
      if (step === 1 && !data.rank) {
        try {
          const refreshed = rankForToday();
          if (refreshed) data.rank = refreshed;
          else if (typeof refreshServerLeaderboard === "function") refreshServerLeaderboard("daily", true).catch?.(() => {});
        } catch {}
      }
      body.innerHTML = screenMarkup(data, step);
      overlay.querySelector("footer").innerHTML = progressMarkup(step);
      body.querySelectorAll("[data-hd276-next]").forEach(button => button.addEventListener("click", () => show(step + 1)));
      body.querySelectorAll("[data-hd276-prev]").forEach(button => button.addEventListener("click", () => show(step - 1)));
      body.querySelector("[data-hd276-home]")?.addEventListener("click", goHome);
      body.querySelector("[data-hd276-rank]")?.addEventListener("click", () => {
        close();
        try { setState({ tab: "rank", rankScope: "daily" }, { renderImmediate: true, save: true }); }
        catch { try { setState({ tab: "rank", rankScope: "daily" }); } catch {} }
      });
      body.querySelector("[data-hd276-share]")?.addEventListener("click", () => {
        try { shareMysteryResult(data.mystery.id); } catch {}
      });
      body.querySelectorAll("[data-hd276-lesson]").forEach(button => button.addEventListener("click", () => {
        if (!data.lesson?.id) return goHome();
        const focus = button.dataset.hd276Lesson || "express";
        close();
        try { setState({ tab: "lesson", currentLessonId: data.lesson.id, lessonFocus: focus, lessonView: focus }, { renderImmediate: true, save: true }); }
        catch { try { setState({ tab: "lesson", currentLessonId: data.lesson.id, lessonFocus: focus, lessonView: focus }); } catch {} }
      }));
      window.requestAnimationFrame(() => body.querySelector("button")?.focus?.({ preventScroll: true }));
    };

    overlay.querySelector("[data-hd276-close]")?.addEventListener("click", close);
    overlay.addEventListener("keydown", event => {
      if (event.key === "Escape") { event.preventDefault(); close(); return; }
      if (event.key === "ArrowRight" && step < 2) { event.preventDefault(); show(step + 1); return; }
      if (event.key === "ArrowLeft" && step > 0) { event.preventDefault(); show(step - 1); return; }
      if (event.key === "Tab") {
        const focusable = [...overlay.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(node => node.offsetParent !== null);
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    show(0);
    try { navigator.vibrate?.([16, 35, 24]); } catch {}
    return overlay;
  }

  function mountSolvedView(){
    const shell = document.querySelector(".app-shell.tab-mystery");
    const data = currentData();
    if (!shell || !data) return;
    shell.classList.add("hd276-solved-shell");
    const solution = shell.querySelector(".mystery-card .solution");
    if (solution && !solution.querySelector("[data-hd276-replay]")) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "hd276-replay-button";
      button.dataset.hd276Replay = "1";
      button.innerHTML = `<span aria-hidden="true">▣</span><div><b>Revoir la livraison</b><small>Révélation, résultat et prochaine étape</small></div><em aria-hidden="true">→</em>`;
      button.addEventListener("click", () => openDelivery(currentData(), { replay: true }));
      solution.appendChild(button);
    }

    const rawSolvedAt = data.solved.at;
    const solvedAt = Number(rawSolvedAt) || Date.parse(String(rawSolvedAt || "")) || 0;
    const trigger = `${data.mystery.id}:${solvedAt}`;
    if (trigger === lastTrigger || alreadySeen(data.mystery.id)) return;
    if (!solvedAt || Date.now() - solvedAt > AUTO_OPEN_WINDOW_MS) return;
    lastTrigger = trigger;
    window.setTimeout(() => openDelivery(currentData()), 90);
  }

  function schedule(){
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      mountSolvedView();
    });
  }

  try {
    const previousRenderMystery = renderMystery;
    renderMystery = function beta276RenderMystery(){
      const output = previousRenderMystery();
      schedule();
      window.setTimeout(schedule, 80);
      window.setTimeout(schedule, 180);
      return output;
    };
  } catch {}

  const root = document.getElementById("app") || document.body;
  new MutationObserver(() => {
    const mysteryOpen = Boolean(document.querySelector(".app-shell.tab-mystery"));
    if (mysteryOpen) schedule();
    else {
      document.querySelector(".hd276-delivery-layer")?.remove();
      document.body.classList.remove("hd276-delivery-open");
    }
  }).observe(root, { childList: true, subtree: true });
  window.addEventListener("pageshow", () => document.body.classList.toggle("hd276-delivery-open", Boolean(document.querySelector(".hd276-delivery-layer"))));

  window.HistoDailyDelivery = { version: VERSION, open: () => openDelivery(currentData(), { replay: true }), data: currentData };
  try { window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, splitMysteryDelivery: true }; } catch {}
  schedule();
})();
