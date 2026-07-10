
(function(){
  const PATHS = {
    home: 'M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1v-10.5Z',
    courses: 'M4 5.5C4 4.12 5.12 3 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5V5.5Zm2.5-.5A1.5 1.5 0 0 0 5 6.5v12.55A4 4 0 0 1 6.5 18H18V5H6.5Z',
    ranking: 'M4 20h4v-7H4v7Zm6 0h4V4h-4v16Zm6 0h4v-10h-4v10Z',
    profile: 'M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2c-4.14 0-7.5 2.46-7.5 5.5V21h15v-1.5C19.5 16.46 16.14 14 12 14Z',
    history: 'M5 20h14v-2H5v2Zm1-4h3V6H6v10Zm5 0h3V6h-3v10Zm5 0h3V6h-3v10ZM4 4h16v1H4V4Z',
    art: 'M12 3.5C7.31 3.5 3.5 7.31 3.5 12A8.5 8.5 0 0 0 12 20.5h.44a2.06 2.06 0 0 0 1.46-3.52 1.33 1.33 0 0 1 .93-2.28H17A3.5 3.5 0 0 0 20.5 11C20.5 6.86 16.64 3.5 12 3.5Zm-4 9a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm3-4A1.25 1.25 0 1 1 11 6a1.25 1.25 0 0 1 0 2.5Zm4 0A1.25 1.25 0 1 1 15 6a1.25 1.25 0 0 1 0 2.5Zm2 4A1.25 1.25 0 1 1 17 10a1.25 1.25 0 0 1 0 2.5Z',
    cinema: 'M4 6.5h16A1.5 1.5 0 0 1 21.5 8v8A1.5 1.5 0 0 1 20 17.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5Zm1.2-3h2.4l1.2 2H6.4l-1.2-2Zm5 0h2.4l1.2 2h-2.4l-1.2-2Zm5 0h2.4l1.2 2h-2.4l-1.2-2Z',
    science: 'M9 3h6v2h-1v4.1l4.5 7.2A2.5 2.5 0 0 1 16.38 20H7.62a2.5 2.5 0 0 1-2.12-3.7L10 9.1V5H9V3Zm1.64 8-3.3 5.3a.5.5 0 0 0 .42.7h8.48a.5.5 0 0 0 .42-.74L13.36 11h-2.72Z',
    economy: 'M5 19h14v2H5v-2Zm2-2V9h3v8H7Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z',
    geography: 'M12 3.5a8.5 8.5 0 1 0 8.5 8.5A8.51 8.51 0 0 0 12 3.5Zm5.73 5h-2.46a12.9 12.9 0 0 0-1.11-2.85 6.54 6.54 0 0 1 3.57 2.85ZM12 5.22A10.93 10.93 0 0 1 13.29 8.5h-2.58A10.93 10.93 0 0 1 12 5.22ZM5.27 8.5a6.54 6.54 0 0 1 3.57-2.85A12.9 12.9 0 0 0 7.73 8.5H5.27Zm0 7h2.46a12.9 12.9 0 0 0 1.11 2.85A6.54 6.54 0 0 1 5.27 15.5ZM12 18.78A10.93 10.93 0 0 1 10.71 15.5h2.58A10.93 10.93 0 0 1 12 18.78Zm1.71-5.28h-3.42a11.35 11.35 0 0 1 0-3h3.42a11.35 11.35 0 0 1 0 3Zm.45 4.85a12.9 12.9 0 0 0 1.11-2.85h2.46a6.54 6.54 0 0 1-3.57 2.85Z',
    music: 'M15 4v10.2A3.2 3.2 0 1 1 13 11.2V6.2l7-1.6v7.6a3.2 3.2 0 1 1-2-3V7.1l-3 .69Z',
    astronomy: 'M12 4.5a7.5 7.5 0 0 0-6.8 4.3H3.5v2h1.16A7.5 7.5 0 0 0 12 19.5c2.74 0 5.14-1.47 6.46-3.66H21v-2h-1.84A7.49 7.49 0 0 0 12 4.5Zm0 2a5.5 5.5 0 1 1-5.5 5.5A5.51 5.51 0 0 1 12 6.5Zm0 2.5a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z',
    search: 'M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.44 4.44 1.41-1.41-4.44-4.44A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 10.5 6Z',
    map: 'M15 4 9 6 4 4v16l5 2 6-2 5 2V6l-5-2Zm0 2.2 3 1.2v11.76l-3-1.2V6.2Zm-2 .08v11.68l-4 1.33V7.61l4-1.33ZM6 7.24l1 .4v11.72l-1-.4V7.24Z',
    catalog: 'M4 5h16v3H4V5Zm0 5h16v3H4v-3Zm0 5h16v3H4v-3Z',
    mystery: 'M12 3.5A6.5 6.5 0 0 0 7 14.22V17a1 1 0 0 0 .29.71l1 1A1 1 0 0 0 9 19h6a1 1 0 0 0 .71-.29l1-1A1 1 0 0 0 17 17v-2.78A6.5 6.5 0 0 0 12 3.5Zm0 2A4.5 4.5 0 0 1 15 13.4l-.5.39V16h-5v-2.21L9 13.4A4.5 4.5 0 0 1 12 5.5Zm-2 13.5h4v1h-4v-1Z',
    medal: 'M7 3h4l1 3h0l1-3h4l-2 6 3.5 4.4L12 21l-6.5-7.6L9 9 7 3Zm3.46 8.5L12 13.54l1.54-2.04-2.04.79-.79-2.04-.79 2.04-2.04-.79 1.54 2.04-1.54 2.04 2.04-.79.79 2.04.79-2.04 2.04.79-1.54-2.04Z',
    trophy: 'M7 4h10v2h2a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4h-.28A5.01 5.01 0 0 1 13 15.9V18h3v2H8v-2h3v-2.1A5.01 5.01 0 0 1 8.28 12H8a4 4 0 0 1-4-4V7a1 1 0 0 1 1-1h2V4Zm10 4V8h1a2 2 0 0 1-2 2 4.97 4.97 0 0 0 1-2Zm-10 0a4.97 4.97 0 0 0 1 2 2 2 0 0 1-2-2h1Z',
    users: 'M9 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm6 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM3.5 19.5a4.5 4.5 0 0 1 9 0v.5h-9Zm8 0a4.95 4.95 0 0 1 .78-2.67A4.5 4.5 0 0 1 20.5 19.5v.5h-9Z',
    settings: 'M10.58 3h2.84l.4 2.02a7.2 7.2 0 0 1 1.62.67l1.73-1.12 2 2-1.12 1.73a7.2 7.2 0 0 1 .67 1.62L21 10.58v2.84l-2.02.4a7.2 7.2 0 0 1-.67 1.62l1.12 1.73-2 2-1.73-1.12a7.2 7.2 0 0 1-1.62.67L13.42 21h-2.84l-.4-2.02a7.2 7.2 0 0 1-1.62-.67L6.83 19.43l-2-2 1.12-1.73a7.2 7.2 0 0 1-.67-1.62L3 13.42v-2.84l2.02-.4a7.2 7.2 0 0 1 .67-1.62L4.57 6.83l2-2 1.73 1.12a7.2 7.2 0 0 1 1.62-.67L10.58 3ZM12 9a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z',
    spark: 'M13 3 5 14h5l-1 7 8-11h-5l1-7Z',
    check: 'M5 12.5 9.2 17 19 7.5l-1.4-1.4-8.3 8.05-2.9-3.1L5 12.5Z',
    warning: 'M12 4 3.34 19h17.32L12 4Zm1 11h-2v-2h2v2Zm0-4h-2V8h2v3Z',
    lock: 'M7 10V8a5 5 0 0 1 10 0v2h1.5A1.5 1.5 0 0 1 20 11.5v7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-7A1.5 1.5 0 0 1 5.5 10H7Zm2 0h6V8a3 3 0 0 0-6 0v2Z',
    lesson: 'M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3V4Zm3 17h9V7a1 1 0 0 0-1-1H7v14a2.98 2.98 0 0 1 1-.17Z',
    review: 'M12 5a7 7 0 1 0 6.65 9.18l1.9.63A9 9 0 1 1 12 3v2Zm1-2 5 4-5 4V8H8V6h5V3Z'
  };
  const disciplineMap = {history:'history', art:'art', cinema:'cinema', 'science-inventions':'science', economy:'economy', geography:'geography', music:'music', astronomy:'astronomy'};
  const titleHints = [
    ['myst', 'mystery'], ['quiz', 'spark'], ['révision', 'review'], ['recherche', 'search'], ['carte', 'map'], ['catalog', 'catalog'], ['profil', 'profile'], ['social', 'users'], ['réglage', 'settings'],
    ['galax', 'astronomy'], ['planète', 'astronomy'], ['étoile', 'astronomy'], ['univers', 'astronomy'],
    ['art', 'art'], ['cinéma','cinema'], ['film','cinema'], ['musique','music'], ['histoire','history'], ['géo','geography'], ['carte','geography'], ['science','science'], ['économie','economy']
  ];
  
  function svg(name){ return PATHS[name] || PATHS.lesson; }
  function render(name, cls='', label=''){
    const safe = String(name || 'lesson').replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    return `<span class="hd-icon ${cls} hd-icon--${safe}" aria-hidden="true"${label?` data-label="${String(label).replace(/"/g,'&quot;')}"`:''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="${svg(name)}"/></svg></span>`;
  }
  function discipline(d){ const id = typeof d === 'string' ? d : d?.id; return render(disciplineMap[id] || 'lesson', 'hd-icon-chip hd-icon-premium'); }
  function fromText(text, fallback='lesson'){ const t=(text||'').toLowerCase(); for(const [needle,name] of titleHints){ if(t.includes(needle)) return name; } return fallback; }
  function world(worldObj, disciplineObj){ const base = disciplineObj?.id || worldObj?.disciplineId || worldObj?.id?.split('-')[0]; return render(disciplineMap[base] || fromText(worldObj?.title, 'lesson'), 'hd-icon-chip hd-icon-premium'); }
  function lesson(lessonObj, worldObj, disciplineObj){ const base = disciplineObj?.id || worldObj?.disciplineId || lessonObj?.disciplineId || worldObj?.id?.split('-')[0]; return render(disciplineMap[base] || fromText(lessonObj?.title, 'lesson'), 'hd-icon-chip hd-icon-premium'); }
  function action(name){ return render(name, 'hd-icon-chip hd-icon-premium'); }
  function rawDiscipline(d){ const id = typeof d === "string" ? d : d?.id; return render(disciplineMap[id] || "lesson", "hd-icon-plain"); }
window.HD_ICONS = { render, discipline, world, lesson, action, rawDiscipline, fromText };
})();
