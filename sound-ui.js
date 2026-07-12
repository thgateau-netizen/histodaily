/* HistoDaily beta 262 — lightweight procedural audio
   No external files, no autoplay, local preference, iOS/PWA friendly. */
(function histodailyAudio262(){
  "use strict";

  const VERSION = "1.0.0-beta.262.0";
  const STORAGE_KEY = "histodaily.sound.mode.v1";
  const MODES = new Set(["off", "soft", "normal"]);
  let context = null;
  let master = null;
  let mode = readMode();
  let lastSoundAt = 0;

  function readMode(){
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return MODES.has(stored) ? stored : "soft";
    } catch { return "soft"; }
  }

  function volume(){
    if (mode === "normal") return 0.105;
    if (mode === "soft") return 0.045;
    return 0;
  }

  function ensureContext(){
    if (mode === "off") return null;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      if (!context) {
        try { context = new AudioContextClass({ latencyHint: "interactive" }); }
        catch { context = new AudioContextClass(); }
        master = context.createGain();
        master.gain.value = volume();
        master.connect(context.destination);
      }
      if (context.state === "suspended") context.resume().catch(() => {});
      if (master) master.gain.setTargetAtTime(volume(), context.currentTime, .015);
      return context;
    } catch { return null; }
  }

  function tone({ frequency = 440, endFrequency = null, duration = .08, delay = 0, type = "sine", gain = 1 }){
    const ctx = ensureContext();
    if (!ctx || !master || mode === "off") return;
    const now = ctx.currentTime + Math.max(0, delay);
    const oscillator = ctx.createOscillator();
    const envelope = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(Math.max(40, frequency), now);
    if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(Math.max(40, endFrequency), now + duration);
    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), now + Math.min(.018, duration * .25));
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(envelope);
    envelope.connect(master);
    oscillator.start(now);
    oscillator.stop(now + duration + .025);
  }

  function noise({ duration = .06, delay = 0, gain = .12 }){
    const ctx = ensureContext();
    if (!ctx || !master || mode === "off") return;
    const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const envelope = ctx.createGain();
    filter.type = "highpass";
    filter.frequency.value = 1200;
    const now = ctx.currentTime + delay;
    envelope.gain.setValueAtTime(gain, now);
    envelope.gain.exponentialRampToValueAtTime(.0001, now + duration);
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(envelope);
    envelope.connect(master);
    source.start(now);
  }

  function play(name, options = {}){
    if (mode === "off") return false;
    const nowMs = performance.now();
    if (!options.force && nowMs - lastSoundAt < 34 && name === "tap") return false;
    lastSoundAt = nowMs;
    ensureContext();
    switch (name) {
      case "tap":
        tone({ frequency: 520, endFrequency: 465, duration: .045, type: "sine", gain: .28 });
        break;
      case "back":
        tone({ frequency: 390, endFrequency: 300, duration: .075, type: "sine", gain: .34 });
        break;
      case "nav":
        tone({ frequency: 330, endFrequency: 390, duration: .065, type: "triangle", gain: .30 });
        tone({ frequency: 495, duration: .055, delay: .045, type: "sine", gain: .22 });
        break;
      case "choice":
        tone({ frequency: 610, endFrequency: 690, duration: .06, type: "triangle", gain: .30 });
        break;
      case "launch":
        tone({ frequency: 245, endFrequency: 355, duration: .12, type: "triangle", gain: .36 });
        tone({ frequency: 490, duration: .10, delay: .075, type: "sine", gain: .24 });
        noise({ duration: .07, delay: .02, gain: .035 });
        break;
      case "correct":
        tone({ frequency: 659.25, duration: .09, type: "sine", gain: .40 });
        tone({ frequency: 880, duration: .13, delay: .075, type: "sine", gain: .36 });
        break;
      case "wrong":
        tone({ frequency: 220, endFrequency: 145, duration: .16, type: "triangle", gain: .35 });
        break;
      case "reward":
        tone({ frequency: 523.25, duration: .085, type: "sine", gain: .34 });
        tone({ frequency: 659.25, duration: .095, delay: .065, type: "sine", gain: .32 });
        tone({ frequency: 783.99, duration: .14, delay: .135, type: "sine", gain: .30 });
        break;
      case "complete":
        tone({ frequency: 523.25, duration: .11, type: "triangle", gain: .35 });
        tone({ frequency: 659.25, duration: .12, delay: .07, type: "triangle", gain: .34 });
        tone({ frequency: 783.99, duration: .17, delay: .145, type: "sine", gain: .36 });
        break;
      case "mystery":
        tone({ frequency: 392, endFrequency: 523.25, duration: .16, type: "triangle", gain: .38 });
        tone({ frequency: 659.25, duration: .17, delay: .10, type: "sine", gain: .33 });
        tone({ frequency: 783.99, duration: .22, delay: .20, type: "sine", gain: .32 });
        noise({ duration: .10, delay: .10, gain: .025 });
        break;
      default:
        tone({ frequency: 480, duration: .05, type: "sine", gain: .25 });
    }
    return true;
  }

  function setMode(next, { preview = true } = {}){
    if (!MODES.has(next)) return mode;
    mode = next;
    try { localStorage.setItem(STORAGE_KEY, mode); } catch {}
    document.documentElement.dataset.hdSoundMode = mode;
    if (master && context) master.gain.setTargetAtTime(volume(), context.currentTime, .015);
    syncControls();
    if (mode !== "off") ensureContext();
    if (preview && mode !== "off") window.setTimeout(() => play("correct", { force: true }), 25);
    return mode;
  }

  function label(){
    if (mode === "normal") return "Normal";
    if (mode === "soft") return "Discret";
    return "Silencieux";
  }

  function description(){
    if (mode === "normal") return "Clics, réponses et révélations sont plus présents, sans musique automatique.";
    if (mode === "soft") return "Effets très légers pour les actions, les bonnes réponses et les récompenses.";
    return "Aucun effet sonore. Tu peux réactiver l’audio à tout moment.";
  }

  function settingsMarkup(){
    return `<section class="card hd262-sound-card"><div><span class="card-label">Audio</span><h2>Son ${label().toLowerCase()}</h2><p>${description()}</p></div><div class="hd262-sound-actions" role="group" aria-label="Niveau des effets sonores"><button type="button" data-hd-sound-mode="off" class="${mode === "off" ? "active" : ""}" aria-pressed="${mode === "off"}">Muet</button><button type="button" data-hd-sound-mode="soft" class="${mode === "soft" ? "active" : ""}" aria-pressed="${mode === "soft"}">Discret</button><button type="button" data-hd-sound-mode="normal" class="${mode === "normal" ? "active" : ""}" aria-pressed="${mode === "normal"}">Normal</button></div><small class="hd262-sound-note">Pas de musique lancée automatiquement. Les sons commencent seulement après une action.</small></section>`;
  }

  function syncControls(){
    document.documentElement.dataset.hdSoundMode = mode;
    document.querySelectorAll("[data-hd-sound-mode]").forEach(button => {
      const active = button.dataset.hdSoundMode === mode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".hd262-sound-card h2").forEach(node => { node.textContent = `Son ${label().toLowerCase()}`; });
    document.querySelectorAll(".hd262-sound-card p").forEach(node => { node.textContent = description(); });
  }

  function classifyButton(target){
    const button = target.closest?.("button, [role='button'], a[href]");
    if (!button || button.matches(":disabled, [aria-disabled='true']")) return null;
    if (button.matches("[data-hd-sound-mode]")) return "setting";
    if (button.matches("[data-home], [data-back], .back-button") || /^(retour|←)$/i.test(button.textContent.trim())) return "back";
    if (button.matches(".nav-item, [data-hd220-discipline], [data-profile-rank], [data-rank-scope], [data-lesson-view]")) return "nav";
    if (button.matches("[data-hd220-expedition], [data-open-mystery-id], [data-go-mystery], [data-start-mystery]")) return "launch";
    if (button.matches("[data-quiz-choice], .quiz-choice, .answer-option")) return "choice";
    return "tap";
  }

  document.addEventListener("pointerdown", () => { ensureContext(); }, { capture: true, passive: true });
  document.addEventListener("click", event => {
    const kind = classifyButton(event.target);
    if (!kind) return;
    if (kind === "setting") {
      setMode(event.target.closest("[data-hd-sound-mode]").dataset.hdSoundMode, { preview: true });
      return;
    }
    play(kind);
  }, true);

  document.addEventListener("histodaily:sound", event => play(event.detail?.name || event.detail || "tap", { force: true }));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && context?.state === "running") context.suspend().catch(() => {});
  });

  document.documentElement.dataset.hdSoundMode = mode;
  window.HDSound = Object.freeze({ VERSION, play, setMode, getMode: () => mode, settingsMarkup, syncControls, unlock: ensureContext });
})();
