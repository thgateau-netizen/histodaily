(function(){
  function esc(s){ return String(s||'').replace(/[&<>\"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m])); }
  const THEMES = {
    history: ['#f59e0b','#fb923c'],
    art: ['#ec4899','#f97316'],
    cinema: ['#8b5cf6','#6366f1'],
    'science-inventions': ['#06b6d4','#22d3ee'],
    economy: ['#10b981','#34d399'],
    geography: ['#22c55e','#84cc16'],
    music: ['#f97316','#fb7185'],
    astronomy: ['#4f46e5','#38bdf8'],
    mystery: ['#7c3aed','#c084fc'],
    season: ['#f59e0b','#fb7185']
  };
  function baseFrame(a,b, inner){
    return `<svg viewBox="0 0 180 120" class="hd-art-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${a}"/><stop offset="100%" stop-color="${b}"/></linearGradient>
        <linearGradient id="g2" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="rgba(255,255,255,.15)"/><stop offset="100%" stop-color="rgba(255,255,255,.02)"/></linearGradient>
      </defs>
      <rect x="1" y="1" width="178" height="118" rx="28" fill="url(#g)" opacity=".18" stroke="rgba(255,255,255,.12)"/>
      <circle cx="150" cy="26" r="28" fill="rgba(255,255,255,.10)"/>
      <circle cx="24" cy="95" r="20" fill="rgba(255,255,255,.08)"/>
      ${inner}
    </svg>`;
  }
  function illustration(kind){
    switch(kind){
      case 'history': return baseFrame(...THEMES.history, `<path d="M46 83h88" stroke="#fff" stroke-opacity=".82" stroke-width="6" stroke-linecap="round"/><path d="M54 79V44m24 35V44m24 35V44m24 35V44" stroke="#fff" stroke-opacity=".78" stroke-width="6" stroke-linecap="round"/><path d="M48 41h84" stroke="#fff" stroke-opacity=".9" stroke-width="6" stroke-linecap="round"/><path d="M60 34l30-12 30 12" stroke="#fff" stroke-opacity=".92" stroke-width="6" fill="none" stroke-linejoin="round"/>`);
      case 'art': return baseFrame(...THEMES.art, `<path d="M74 28c-25 0-44 18-44 40 0 20 16 36 38 36h12c8 0 13-8 9-15-3-6 2-12 9-12h13c18 0 31-12 31-28 0-22-28-49-68-21Z" fill="rgba(255,255,255,.16)" stroke="#fff" stroke-opacity=".78" stroke-width="5"/><circle cx="59" cy="59" r="6" fill="#fff" fill-opacity=".88"/><circle cx="79" cy="45" r="6" fill="#fff" fill-opacity=".88"/><circle cx="101" cy="52" r="6" fill="#fff" fill-opacity=".88"/><path d="M119 91c8-16 20-28 36-36" stroke="#fff" stroke-opacity=".82" stroke-width="8" stroke-linecap="round"/><path d="M130 84l20 12" stroke="#fff" stroke-opacity=".65" stroke-width="8" stroke-linecap="round"/>`);
      case 'cinema': return baseFrame(...THEMES.cinema, `<rect x="34" y="34" width="96" height="56" rx="14" fill="rgba(255,255,255,.10)" stroke="#fff" stroke-opacity=".78" stroke-width="5"/><path d="M42 34l10 15m16-15 10 15m16-15 10 15m16-15 10 15" stroke="#fff" stroke-opacity=".84" stroke-width="5"/><path d="M49 67h66" stroke="#fff" stroke-opacity=".92" stroke-width="8" stroke-linecap="round"/><circle cx="139" cy="66" r="16" fill="rgba(255,255,255,.14)" stroke="#fff" stroke-opacity=".84" stroke-width="5"/>`);
      case 'science-inventions': return baseFrame(...THEMES['science-inventions'], `<path d="M64 28h34m-8 0v22l22 35a12 12 0 0 1-10 18H60a12 12 0 0 1-10-18l22-35V28" stroke="#fff" stroke-opacity=".88" stroke-width="6" fill="rgba(255,255,255,.10)" stroke-linecap="round" stroke-linejoin="round"/><path d="M60 83h42" stroke="#fff" stroke-opacity=".82" stroke-width="6" stroke-linecap="round"/><circle cx="128" cy="38" r="6" fill="#fff" fill-opacity=".85"/><circle cx="143" cy="57" r="10" fill="rgba(255,255,255,.20)" stroke="#fff" stroke-opacity=".72" stroke-width="4"/>`);
      case 'economy': return baseFrame(...THEMES.economy, `<path d="M38 82h96" stroke="#fff" stroke-opacity=".82" stroke-width="6" stroke-linecap="round"/><rect x="46" y="56" width="16" height="26" rx="6" fill="rgba(255,255,255,.14)" stroke="#fff" stroke-opacity=".76" stroke-width="4"/><rect x="70" y="42" width="16" height="40" rx="6" fill="rgba(255,255,255,.16)" stroke="#fff" stroke-opacity=".8" stroke-width="4"/><rect x="94" y="31" width="16" height="51" rx="6" fill="rgba(255,255,255,.20)" stroke="#fff" stroke-opacity=".84" stroke-width="4"/><path d="M118 66l14-14 12 8 14-20" stroke="#fff" stroke-opacity=".94" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
      case 'geography': return baseFrame(...THEMES.geography, `<circle cx="88" cy="60" r="34" fill="rgba(255,255,255,.10)" stroke="#fff" stroke-opacity=".8" stroke-width="5"/><path d="M54 60h68M88 26a58 58 0 0 0 0 68M88 26a58 58 0 0 1 0 68" stroke="#fff" stroke-opacity=".72" stroke-width="4"/><path d="M136 38l18 9-3 24-20 11-18-9 3-24 20-11Z" fill="rgba(255,255,255,.16)" stroke="#fff" stroke-opacity=".82" stroke-width="4"/><circle cx="133" cy="60" r="4" fill="#fff" fill-opacity=".92"/>`);
      case 'music': return baseFrame(...THEMES.music, `<path d="M82 32v45.5a14 14 0 1 1-8-12.7V44l44-10v39.5a14 14 0 1 1-8-12.7V41l-28 6.2Z" fill="rgba(255,255,255,.12)" stroke="#fff" stroke-opacity=".86" stroke-width="5" stroke-linejoin="round"/><path d="M38 86c13-7 23-7 36 0s23 7 36 0" stroke="#fff" stroke-opacity=".72" stroke-width="5" fill="none" stroke-linecap="round"/>`);
      case 'astronomy': return baseFrame(...THEMES.astronomy, `<circle cx="88" cy="61" r="16" fill="rgba(255,255,255,.16)" stroke="#fff" stroke-opacity=".86" stroke-width="4"/><ellipse cx="88" cy="61" rx="42" ry="18" fill="none" stroke="#fff" stroke-opacity=".78" stroke-width="4"/><ellipse cx="88" cy="61" rx="26" ry="42" fill="none" stroke="#fff" stroke-opacity=".58" stroke-width="3.5" transform="rotate(-24 88 61)"/><circle cx="121" cy="49" r="5" fill="#fff" fill-opacity=".9"/><circle cx="54" cy="38" r="3" fill="#fff" fill-opacity=".85"/><circle cx="133" cy="82" r="3" fill="#fff" fill-opacity=".72"/><path d="M145 24l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6Z" fill="rgba(255,255,255,.55)"/>`);
      case 'mystery': return baseFrame(...THEMES.mystery, `<path d="M90 28c-21 0-38 15-38 34 0 12 7 21 17 28v10h42V90c10-7 17-16 17-28 0-19-17-34-38-34Z" fill="rgba(255,255,255,.14)" stroke="#fff" stroke-opacity=".82" stroke-width="5"/><path d="M79 55c2-8 9-12 18-12 12 0 20 8 20 18 0 7-3 12-12 16-6 3-7 6-7 10" stroke="#fff" stroke-opacity=".92" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="98" cy="94" r="4" fill="#fff" fill-opacity=".9"/>`);
      default: return baseFrame(...THEMES.season, `<circle cx="66" cy="60" r="24" fill="rgba(255,255,255,.12)" stroke="#fff" stroke-opacity=".82" stroke-width="5"/><path d="M94 48c8-8 18-12 32-12 0 18-4 29-12 37-7 7-17 11-29 12 1-14 3-26 9-37Z" fill="rgba(255,255,255,.16)" stroke="#fff" stroke-opacity=".8" stroke-width="5"/><path d="M57 61h31" stroke="#fff" stroke-opacity=".84" stroke-width="6" stroke-linecap="round"/>`);
    }
  }
  function discipline(id){ return `<div class="hd-art hd-art--discipline hd-art--${esc(id)}">${illustration(id)}</div>`; }
  function season(key){
    const mapped = ({astronomy:'astronomy', science:'science-inventions', art:'art', mystery:'mystery'})[String(key||'').toLowerCase()] || 'season';
    return `<div class="hd-art hd-art--season hd-art--${esc(mapped)}">${illustration(mapped)}</div>`;
  }
  function hero(id){ return `<div class="hd-art hd-art--hero hd-art--${esc(id)}">${illustration(id)}</div>`; }
  window.HD_ART = { discipline, season, hero };
})();