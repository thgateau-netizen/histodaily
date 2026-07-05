const storeKey = "histodaily_v02";
let state = JSON.parse(localStorage.getItem(storeKey) || "{}") || {};
state.done ||= [];
state.xp ||= 0;
state.streak ||= 0;
state.lastDay ||= "";
state.reviews ||= [];
let screen = "home";
let currentLesson = null;
let pageIndex = 0;
let quizIndex = 0;
let score = 0;
let locked = false;

function save(){ localStorage.setItem(storeKey, JSON.stringify(state)); }
function today(){ return new Date().toISOString().slice(0,10); }
function setScreen(s){ screen=s; render(); }
function chapterProgress(ch){ const total=ch.lessons.length; const done=ch.lessons.filter(id=>state.done.includes(id)).length; return {done,total,pct:Math.round(done/total*100)}; }
function startLesson(id){ const l=LESSONS[id]; if(!l.pages?.length){ alert("Cette leçon arrive dans la prochaine version."); return; } currentLesson=id; pageIndex=0; quizIndex=0; score=0; locked=false; screen="lesson"; render(); }
function completeLesson(){ if(!state.done.includes(currentLesson)){ state.done.push(currentLesson); state.xp += 40 + score*5; if(state.lastDay !== today()){ state.streak += 1; state.lastDay = today(); } }
 save(); screen="result"; render(); }
function nav(){ return `<div class="bottomnav"><div class="bottomnavInner"><button class="navbtn ${screen==='home'?'active':''}" onclick="setScreen('home')">Accueil</button><button class="navbtn ${screen==='path'?'active':''}" onclick="setScreen('path')">Parcours</button><button class="navbtn ${screen==='review'?'active':''}" onclick="setScreen('review')">Réviser</button><button class="navbtn ${screen==='profile'?'active':''}" onclick="setScreen('profile')">Profil</button></div></div>` }
function layout(html){ document.getElementById('app').innerHTML = `<main class="app"><div class="top"><div class="brand">HistoDaily</div><div class="pill">v${APP_VERSION}</div></div>${html}<div class="version">HistoDaily — version ${APP_VERSION} — ${UPDATED_AT}</div></main>${nav()}`; }
function home(){ const ch=CHAPTERS[0], p=chapterProgress(ch); layout(`<section class="card hero"><span class="badge">Chapitre en cours</span><h1>${ch.icon} ${ch.title}</h1><p>${ch.subtitle}</p><div class="stats"><div class="stat"><b>${state.xp}</b><span>XP</span></div><div class="stat"><b>${state.streak}</b><span>série</span></div><div class="stat"><b>${p.pct}%</b><span>chapitre</span></div></div><div class="progressbar"><div style="width:${p.pct}%"></div></div><button class="btn" onclick="setScreen('path')">Continuer le parcours</button></section><section class="card"><h2>Format validé</h2><p class="muted">Des leçons plus longues, organisées par sous-sujets dans le thème Préhistoire, avec des réponses de quiz plus plausibles.</p></section>`); }
function path(){ const ch=CHAPTERS[0], p=chapterProgress(ch); let items=ch.lessons.map((id,i)=>{ const l=LESSONS[id], done=state.done.includes(id), ready=l.pages?.length; return `<div class="lessonItem ${ready?'':'locked'}" onclick="${ready?`startLesson('${id}')`:''}"><h3>${done?'✅':ready?'🔓':'🔒'} ${i+1}. ${l.title}</h3><p>${l.intro}</p><span class="tag">${l.duration}</span></div>`}).join(''); layout(`<section class="card chapter"><div class="chapterIcon">${ch.icon}</div><div><h2>${ch.title}</h2><p class="muted">${p.done}/${p.total} leçons terminées</p></div></section>${items}`); }
function lesson(){ const l=LESSONS[currentLesson]; const pg=l.pages[pageIndex]; const last=pageIndex===l.pages.length-1; layout(`<section class="card"><p class="muted">${l.theme} · page ${pageIndex+1}/${l.pages.length}</p><h1 class="pageTitle">${pg.title}</h1><p class="pageText">${pg.text}</p>${pg.fact?`<div class="factbox">${pg.fact}</div>`:''}<div class="navrow"><button class="btn secondary" onclick="${pageIndex===0?`setScreen('path')`:`pageIndex--;render()`}">Retour</button><button class="btn" onclick="${last?`screen='quiz';render()`:`pageIndex++;render()`}">${last?'Passer au quiz':'Suivant'}</button></div></section>`); }
function quiz(){ const l=LESSONS[currentLesson]; const q=l.quiz[quizIndex]; locked=false; layout(`<section class="card"><p class="muted">Question ${quizIndex+1}/${l.quiz.length}</p><div class="question">${q.q}</div><div id="answers">${q.options.map(o=>`<button class="answer" onclick="answer(this, '${encodeURIComponent(o)}')">${o}</button>`).join('')}</div><div id="feedback" class="feedback"></div></section>`); }
function answer(btn, encoded){ if(locked) return; locked=true; const picked=decodeURIComponent(encoded); const l=LESSONS[currentLesson]; const q=l.quiz[quizIndex]; const ok=picked===q.a; if(ok) score++; [...document.querySelectorAll('.answer')].forEach(b=>{ if(b.textContent===q.a)b.classList.add('correct'); else if(b===btn)b.classList.add('wrong'); }); document.getElementById('feedback').innerHTML = `${ok?'Bonne réponse.':'Pas exactement.'} ${q.explain}<button class="btn" onclick="nextQ()">Continuer</button>`; }
function nextQ(){ const l=LESSONS[currentLesson]; if(quizIndex<l.quiz.length-1){ quizIndex++; render(); } else completeLesson(); }
function result(){ const l=LESSONS[currentLesson]; layout(`<section class="card hero"><h1>Leçon terminée</h1><p>${l.title}</p><div class="stats"><div class="stat"><b>${score}/${l.quiz.length}</b><span>score</span></div><div class="stat"><b>${state.xp}</b><span>XP</span></div><div class="stat"><b>${state.streak}</b><span>série</span></div></div><button class="btn" onclick="setScreen('path')">Retour au chapitre</button></section>`); }
function review(){ layout(`<section class="card"><h1>Révisions</h1><p class="muted">Pour l’instant, relis les leçons terminées. La vraie révision intelligente arrivera quand on aura plus de contenu.</p>${state.done.map(id=>`<button class="btn secondary" onclick="startLesson('${id}')">${LESSONS[id].title}</button>`).join('') || '<p>Aucune leçon terminée.</p>'}</section>`); }
function profile(){ layout(`<section class="card hero"><h1>Profil</h1><div class="stats"><div class="stat"><b>${state.xp}</b><span>XP</span></div><div class="stat"><b>${state.streak}</b><span>série</span></div><div class="stat"><b>${state.done.length}</b><span>leçons</span></div></div><button class="btn secondary" onclick="if(confirm('Réinitialiser la progression ?')){localStorage.removeItem(storeKey);location.reload()}">Réinitialiser</button></section>`); }
function render(){ if(screen==='home')home(); if(screen==='path')path(); if(screen==='lesson')lesson(); if(screen==='quiz')quiz(); if(screen==='result')result(); if(screen==='review')review(); if(screen==='profile')profile(); }
render();
