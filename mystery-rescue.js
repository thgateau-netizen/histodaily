/* HistoDaily beta 177 — aide anti-frustration des mystères. */
(function histodailyBeta177MysteryRescue(){
  const VERSION = "1.0.0-beta.177";
  const RESCUE_LABEL = "Je l’ai sur le bout de la langue";

  state.mysteryRescue = (state.mysteryRescue && typeof state.mysteryRescue === "object") ? state.mysteryRescue : {};
  state.mysteryRescueWrong = (state.mysteryRescueWrong && typeof state.mysteryRescueWrong === "object") ? state.mysteryRescueWrong : {};

  function rescueNormalize(value = "") {
    return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  }
  function rescueHash(value = "") {
    let hash = 2166136261;
    for (const char of String(value)) {
      hash ^= char.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }
  function answerShape(answer = "") {
    const words = String(answer).trim().split(/\s+/).map(word => word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "")).filter(Boolean);
    const initials = words.map(word => word[0]?.toUpperCase() || "?").join(" · ");
    const lengths = words.map(word => Array.from(word).filter(char => /[\p{L}\p{N}]/u.test(char)).length).join(" / ");
    return `${words.length} mot${words.length > 1 ? "s" : ""} · initiales ${initials} · ${lengths} lettre${words.length > 1 ? "s par mot" : "s"}`;
  }
  function rescueChoicePool(mystery) {
    const disciplineId = mysteryDisciplineId(mystery);
    const subject = rescueNormalize(mystery.subjectType || "");
    const candidates = (data.mysteries || [])
      .filter(item => item?.id !== mystery.id && mysteryDisciplineId(item) === disciplineId && item.answer)
      .map(item => ({
        answer: String(item.answer).trim(),
        affinity: subject && rescueNormalize(item.subjectType || "") === subject ? 0 : 1,
        hash: rescueHash(`${mystery.id}|${item.id}|${item.answer}`)
      }))
      .sort((a, b) => a.affinity - b.affinity || a.hash - b.hash);
    const unique = [];
    const seen = new Set([rescueNormalize(mystery.answer)]);
    for (const candidate of candidates) {
      const key = rescueNormalize(candidate.answer);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      unique.push(candidate.answer);
      if (unique.length >= 3) break;
    }
    const genericByDiscipline = {
      history: ["La révolution industrielle", "L’Empire romain", "La guerre froide"],
      art: ["Le romantisme", "La perspective linéaire", "Le clair-obscur"],
      cinema: ["Le plan-séquence", "Le hors-champ", "Le cinéma expressionniste"],
      "science-inventions": ["La dérive génétique", "La théorie microbienne", "L’héliocentrisme"],
      economy: ["Le coût d’opportunité", "La déflation", "La productivité"],
      geography: ["L’échelle cartographique", "La projection de Mercator", "La transition démographique"],
      music: ["La polyphonie", "Le swing", "Le chant grégorien"]
    };
    for (const fallback of genericByDiscipline[disciplineId] || []) {
      const key = rescueNormalize(fallback);
      if (!seen.has(key)) { seen.add(key); unique.push(fallback); }
      if (unique.length >= 3) break;
    }
    const answers = [String(mystery.answer).trim(), ...unique.slice(0, 3)];
    return answers
      .map(answer => ({ answer, hash: rescueHash(`${mystery.id}|choice|${answer}`) }))
      .sort((a, b) => a.hash - b.hash)
      .map(item => item.answer);
  }

  const originalMysteryScoreBreakdown = mysteryScoreBreakdown;
  mysteryScoreBreakdown = function beta177MysteryScoreBreakdown(mysteryId) {
    const breakdown = originalMysteryScoreBreakdown(mysteryId);
    const rescue = Boolean(state.mysteryRescue?.[mysteryId]);
    if (!rescue) return { ...breakdown, rescue: false, rescuePenalty: 0 };
    const floor = Number(breakdown.floor || SCORE_FLOOR[mysteryById(mysteryId)?.difficulty] || 35);
    const current = Number(breakdown.score || floor);
    return {
      ...breakdown,
      rescue: true,
      rescuePenalty: Math.max(0, current - floor),
      score: floor
    };
  };

  scoreBreakdownMarkup = function beta177ScoreBreakdownMarkup(mysteryId) {
    const b = mysteryScoreBreakdown(mysteryId);
    return `<div class="score-breakdown"><span>Base ${b.base}</span><span>Indices -${b.hintPenalty}</span><span>Essais -${b.tryPenalty}</span>${b.rescue ? `<span>Aide mémoire → score plancher</span>` : ""}<strong>${b.score} XP</strong></div>`;
  };

  const originalSubmitGuess = submitGuess;
  submitGuess = function beta177SubmitGuess(event) {
    const selected = state.currentMysteryId ? mysteryById(state.currentMysteryId) : currentMystery();
    const mysteryId = selected?.id;
    const rescueWasActive = Boolean(mysteryId && state.mysteryRescue?.[mysteryId]);
    originalSubmitGuess(event);
    if (rescueWasActive && mysteryId && state.solvedMysteries?.[mysteryId]) {
      state.solvedMysteries[mysteryId] = { ...state.solvedMysteries[mysteryId], rescue: true };
      saveState();
    }
  };

  function activateRescue(mystery) {
    const maxHints = Math.min(3, (mystery.clues || []).length);
    if ((state.seenHints?.[mystery.id] || 0) < maxHints) return;
    state.mysteryRescue = { ...(state.mysteryRescue || {}), [mystery.id]: true };
    state.mysteryRescueWrong = { ...(state.mysteryRescueWrong || {}), [mystery.id]: state.mysteryRescueWrong?.[mystery.id] || [] };
    state.mysteryFeedback = { ...(state.mysteryFeedback || {}), [mystery.id]: "Aide mémoire ouverte : reconnais le bon nom parmi des notions du même domaine. Tu peux éliminer les mauvaises sans bloquer le dossier." };
    saveState();
    render();
  }

  function chooseRescueAnswer(mystery, answer) {
    if (!isAcceptedGuess(answer, mystery)) {
      const previous = Array.isArray(state.mysteryRescueWrong?.[mystery.id]) ? state.mysteryRescueWrong[mystery.id] : [];
      const key = rescueNormalize(answer);
      state.mysteryRescueWrong = {
        ...(state.mysteryRescueWrong || {}),
        [mystery.id]: [...new Set([...previous, key])]
      };
    }
    const input = document.querySelector("[data-guess-input]");
    const form = document.querySelector("[data-guess]");
    if (!input || !form) return;
    input.value = answer;
    if (typeof form.requestSubmit === "function") form.requestSubmit();
    else submitGuess({ preventDefault(){}, stopPropagation(){}, currentTarget: form });
  }

  function rescuePanelMarkup(mystery) {
    const wrong = new Set(Array.isArray(state.mysteryRescueWrong?.[mystery.id]) ? state.mysteryRescueWrong[mystery.id] : []);
    const choices = rescueChoicePool(mystery);
    return `<section class="mystery-rescue-panel" data-rescue-panel>
      <div class="mystery-rescue-head"><span>🛟 Aide anti-frustration</span><strong>Retrouve le nom, sans révélation directe</strong></div>
      <p>Type attendu : <b>${escapeHtml(mystery.subjectType || mystery.caseTitle || "notion précise")}</b></p>
      <p class="mystery-answer-shape">Forme du nom : ${escapeHtml(answerShape(mystery.answer || ""))}</p>
      <div class="mystery-rescue-choices" role="group" aria-label="Aide mémoire à quatre choix">
        ${choices.map((choice, index) => {
          const disabled = wrong.has(rescueNormalize(choice));
          return `<button type="button" data-rescue-choice="${index}" ${disabled ? "disabled" : ""} class="${disabled ? "eliminated" : ""}"><span>${String.fromCharCode(65 + index)}</span>${escapeHtml(choice)}${disabled ? `<small>éliminé</small>` : ""}</button>`;
        }).join("")}
      </div>
      <p class="microcopy rescue-note">Une mauvaise option est simplement éliminée. En utilisant cette aide, ton score descend au plancher du niveau, mais tu peux toujours terminer et apprendre la réponse.</p>
    </section>`;
  }

  function injectMysteryRescue() {
    const mystery = currentMystery();
    if (!mystery?.id || mysterySolved(mystery.id)) return;
    const maxHints = Math.min(3, (mystery.clues || []).length);
    const hints = Math.min(state.seenHints?.[mystery.id] || 0, maxHints);
    if (!maxHints || hints < maxHints) return;
    const card = document.querySelector(".mystery-card");
    if (!card || card.querySelector("[data-rescue-panel], [data-activate-rescue]")) return;
    const hintButton = card.querySelector("[data-hint]");
    if (hintButton) hintButton.hidden = true;
    const anchor = card.querySelector(".microcopy");
    if (!anchor) return;
    const rescueActive = Boolean(state.mysteryRescue?.[mystery.id]);
    const wrapper = document.createElement("div");
    wrapper.className = "mystery-rescue-slot";
    if (!rescueActive) {
      wrapper.innerHTML = `<button type="button" class="wide mystery-rescue-open" data-activate-rescue>🛟 ${RESCUE_LABEL}</button><p class="microcopy">Trois indices utilisés : cette dernière aide ne donne pas la solution, mais transforme le souvenir bloqué en choix guidé et garantit que le dossier reste finissable.</p>`;
      wrapper.querySelector("[data-activate-rescue]")?.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        activateRescue(mystery);
      });
    } else {
      wrapper.innerHTML = rescuePanelMarkup(mystery);
      const choices = rescueChoicePool(mystery);
      wrapper.querySelectorAll("[data-rescue-choice]").forEach(button => {
        button.addEventListener("click", event => {
          event.preventDefault();
          event.stopPropagation();
          const choice = choices[Number(button.dataset.rescueChoice)];
          if (choice) chooseRescueAnswer(mystery, choice);
        });
      });
      card.querySelector(".mystery-meter")?.insertAdjacentHTML("beforeend", "<span>🛟 aide mémoire active</span>");
      const explain = card.querySelector(".score-explain span");
      if (explain) explain.textContent = "Les trois indices ont été utilisés. L’aide mémoire garantit une résolution, avec le score plancher du niveau.";
    }
    anchor.before(wrapper);
  }

  const originalRenderMystery = renderMystery;
  renderMystery = function beta177RenderMystery() {
    originalRenderMystery();
    try { injectMysteryRescue(); } catch (error) { try { console.warn("HistoDaily rescue", error); } catch {} }
  };

  try { window.HistoDaily = { ...(window.HistoDaily || {}), version: VERSION, mysteryRescueVersion: VERSION }; } catch {}
})();
