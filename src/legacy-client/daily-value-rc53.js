/* HistoDaily RC53 — Daily value: the short ritual must leave three memorable anchors,
   and tomorrow's teaser must create curiosity instead of repeating a generic mission label. */
(function histodailyRc53DailyValue(){
  "use strict";
  const VERSION = "1.0.0-rc.54.0";
  const safe = (fn, fallback = null) => { try { const value = fn(); return value == null ? fallback : value; } catch { return fallback; } };
  const clean = value => String(value || "").replace(/\s+/g, " ").trim();
  const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const normalize = value => clean(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

  function sentences(text){
    const value=clean(text);
    if(!value) return [];
    return (value.match(/[^.!?]+[.!?]?/g)||[value]).map(clean).filter(Boolean);
  }
  function stripRescue(text){
    return clean(String(text||"")
      .replace(/\s*Dernier coup de pouce\s*:[\s\S]*$/i, "")
      .replace(/\s*Last hint\s*:[\s\S]*$/i, ""));
  }
  function uniquePush(out, item){
    const text=clean(item?.text); if(!text) return;
    const key=normalize(text); if(!key) return;
    if(out.some(row=>{ const k=normalize(row.text); return k===key || (k.length>28 && key.includes(k)) || (key.length>28 && k.includes(key)); })) return;
    out.push({label:clean(item.label)||"À retenir",text});
  }
  function knowledgePack(mystery){
    if(!mystery || mystery.discipline==="english") return [];
    const out=[];
    const answer=clean(mystery.answer);
    const period=clean(mystery.periodHint);
    const subject=clean(mystery.subjectType);
    if(answer) uniquePush(out,{label:"Repère",text:period?`${answer} — ${period}`:answer});

    const exp=sentences(mystery.explanation||"");
    if(exp[0]) uniquePush(out,{label:"Idée clé",text:exp[0]});

    const clues=(Array.isArray(mystery.clues)?mystery.clues:[]).map(stripRescue).filter(Boolean);
    const concrete=clues.find((text,index)=>index>0 && text.length>=38) || clues.find(text=>text.length>=38) || "";
    if(concrete) uniquePush(out,{label:"Indice concret",text:concrete});
    if(out.length<3 && exp[1]) uniquePush(out,{label:"Pourquoi ça compte",text:exp[1]});
    if(out.length<3 && subject) uniquePush(out,{label:"Type",text:`À reconnaître comme ${subject}.`});
    return out.slice(0,3);
  }
  function curiosityTeaser(mystery){
    if(!mystery) return "Un nouveau dossier t’attendra demain.";
    const title=clean(mystery.title||mystery.caseTitle);
    const period=clean(mystery.periodHint);
    const subject=clean(mystery.subjectType);
    let hook=title || subject || "Un nouveau dossier";
    const answer=normalize(mystery.answer);
    if(answer && normalize(hook).includes(answer)) hook=subject || "Un nouveau dossier";
    const suffix=period && !normalize(hook).includes(normalize(period)) ? ` · ${period}` : "";
    return `${hook}${suffix}`;
  }
  function packMarkup(items){
    if(!items.length) return "";
    return `<small>3 choses à garder</small><ul>${items.map(item=>`<li><b>${esc(item.label)}</b><span>${esc(item.text)}</span></li>`).join("")}</ul>`;
  }
  function tomorrowMystery(){ return safe(()=>window.HistoDailyDailyHookRC49?.ensureTomorrowTeaser?.(),null); }

  function enhanceSolved(){
    const mystery=safe(()=>currentMystery(),null);
    if(!mystery?.id || mystery.discipline==="english" || !safe(()=>mysterySolved(mystery.id),false)) return;
    const solution=document.querySelector(".hd300-solution"); if(!solution) return;
    const items=knowledgePack(mystery); if(!items.length) return;
    let block=solution.querySelector("[data-rc47-takeaway]");
    if(!block){ block=document.createElement("div"); block.className="rc47-takeaway"; block.dataset.rc47Takeaway="true"; const anchor=solution.querySelector(".hd300-result-line"); if(anchor) anchor.insertAdjacentElement("beforebegin",block); else solution.append(block); }
    block.classList.add("rc53-knowledge-pack"); block.dataset.rc53KnowledgePack="true"; block.innerHTML=packMarkup(items);
    const teaser=solution.querySelector(".rc47-tomorrow-teaser p"); const tomorrow=tomorrowMystery();
    if(teaser&&tomorrow){ teaser.textContent=curiosityTeaser(tomorrow); teaser.closest(".rc47-tomorrow-teaser")?.setAttribute("data-rc53-curiosity","true"); }
  }
  function enhanceHome(){
    const home=document.querySelector(".rc24-home"); if(!home) return;
    const teaser=home.querySelector(".rc47-home-teaser strong"); if(!teaser) return;
    const tomorrow=tomorrowMystery(); if(!tomorrow) return;
    teaser.textContent=curiosityTeaser(tomorrow); teaser.closest(".rc47-home-teaser")?.setAttribute("data-rc53-curiosity","true");
  }

  const previousRenderMystery=typeof renderMystery==="function"?renderMystery:null;
  if(previousRenderMystery) renderMystery=function rc53RenderMystery(){ const out=previousRenderMystery(); window.setTimeout(enhanceSolved,0); return out; };
  const previousRenderHome=typeof renderHome==="function"?renderHome:null;
  if(previousRenderHome) renderHome=function rc53RenderHome(){ const out=previousRenderHome(); window.setTimeout(enhanceHome,0); return out; };

  const api=Object.freeze({version:VERSION,knowledgePack,curiosityTeaser,enhanceSolved,enhanceHome});
  window.HistoDailyDailyValueRC53=api;
  try { window.HistoDaily={...(window.HistoDaily||{}),version:VERSION,dailyValueRC53:api}; } catch {}
})();
