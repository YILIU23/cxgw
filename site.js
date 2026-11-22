/* Shared static presentation helpers; env.js remains the sole content configuration. */
(function () {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const text = value => String(value == null ? '' : value);
  const esc = value => text(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const config = (key, fallback) => typeof window[key] === 'undefined' ? fallback : window[key];
  const modules = config('modules', []);
  const enabled = name => Array.isArray(modules) && modules.includes(name);
  function url(value, allowMail = true) {
    try {
      if (!text(value).trim()) return '';
      const parsed = new URL(value, location.href);
      return ['http:', 'https:', ...(allowMail ? ['mailto:'] : [])].includes(parsed.protocol) ? parsed.href : '';
    } catch (_) { return ''; }
  }
  function icon(name, className = '') {
    const valid = ['arrow','arrow-up-right','folder','message','mail','users','code','link','sun','moon','menu','close','back','shield','terminal','copy','check'];
    const known = valid.includes(name) ? name : 'terminal';
    return '<svg class="icon '+esc(className)+'" aria-hidden="true"><use href="#ui-'+known+'"></use></svg>';
  }
  function external(value, label, className = '') {
    const href = url(value);
    if (!href) return '';
    return '<a class="'+esc(className)+'" href="'+esc(href)+'"'+(href.startsWith('mailto:') ? '' : ' target="_blank" rel="noopener noreferrer"')+'>'+label+'</a>';
  }
  function image(value, alt, className, size = 80, fallback = './assets/avatar.svg') {
    const src = /^\.\/assets\/[a-zA-Z0-9_./-]+$/.test(text(value)) ? text(value) : (url(value, false) || fallback);
    return '<img class="'+esc(className)+'" src="'+esc(src)+'" alt="'+esc(alt)+'" width="'+size+'" height="'+size+'" loading="lazy" data-fallback="'+esc(fallback)+'">';
  }
  function rich(value) {
    const tags = {s:['strong','strong'],i:['em','em'],m:['mark','mark'],d:['del','del'],r:['span class="text-danger"','span'],b:['span class="text-info"','span']};
    return esc(value).replace(/\$(s|i|m|d|r|b)\$([\s\S]*?)\$\1\$/g, (_, type, content) => '<'+tags[type][0]+'>'+content+'</'+tags[type][1]+'>');
  }
  function projectRow(project, index) {
    const type = project[5] && project[5][0] || '项目';
    return '<a class="project-row" href="./works.html?id='+index+'"><span class="project-number" aria-hidden="true">'+String(index+1).padStart(2,'0')+'</span><div class="project-copy"><h3 class="project-name">'+icon('folder')+esc(project[2])+'</h3><p class="project-description">'+esc(project[3])+'</p><span class="project-kind">'+esc(type)+'</span></div>'+icon('arrow-up-right','project-arrow')+'</a>';
  }
  function setText(selector, value) { const el = $(selector); if (el) el.textContent = text(value); }
  function applyMeta(title, description) {
    document.title = title;
    $('meta[property="og:title"]').content = title;
    $('meta[name="description"]').content = description;
    $('meta[property="og:description"]').content = description;
    $('meta[name="keywords"]').content = config('keywords','');
  }
  const home = !location.pathname.endsWith('/works.html');
  const favicon = config('ico','./favicon.svg');
  if (url(favicon,false)) $('link[rel="icon"]').href = url(favicon,false);
  const name = config('teamname', '上官程星');
  setText('#headtitle', config('headtitle', name));
  applyMeta(config('dctitle',name)+' · 交流群官网', config('descrp','程星社群的作品、成员和联系方式。'));
  setText('#copyright', '© '+new Date().getFullYear()+' '+name);
  const filing = $('#filings');
  if (filing) {
    const icp = text(config('beiancode', '')).trim();
    const icpUrl = config('beianurl','https://beian.miit.gov.cn/');
    const police = text(config('gongancode','')).trim();
    const policeUrl = url(config('gonganurl',''), false);
    filing.innerHTML = (icp ? external(icpUrl,icon('shield')+esc(icp)) : '') + (police && policeUrl ? external(policeUrl,icon('shield')+esc(police)) : '');
    filing.hidden = !filing.children.length;
  }
  const nav = $('#site-navigation');
  const navItems = config('headbuts',[]).filter(item => item[0] === 'topd' || enabled(item[0]));
  if (nav) nav.innerHTML = navItems.map(item => '<a class="nav__link" href="'+(home ? '' : './index.html')+'#'+esc(item[0])+'">'+esc(item[2])+'</a>').join('');
  const toggle = $('#menu-toggle');
  const theme = $('#theme-toggle');
  function menu(open) {
    nav.classList.toggle('is-open',open);
    document.body.classList.toggle('menu-open',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open ? '关闭导航菜单' : '打开导航菜单');
    toggle.innerHTML = icon(open ? 'close' : 'menu');
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    menu(open);
    if (open) nav.querySelector('a')?.focus();
  });
  nav.addEventListener('click', e => { if (e.target.closest('a')) menu(false); });
  document.addEventListener('keydown', e => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (e.key === 'Escape') { menu(false); toggle.focus(); }
    if (e.key === 'Tab') {
      const items = [...nav.querySelectorAll('a'),theme,toggle];
      const first = items[0], last = items[items.length-1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  matchMedia('(min-width:768px)').addEventListener('change', e => { if (e.matches) menu(false); });
  function syncTheme() {
    const light = document.documentElement.dataset.theme === 'light';
    theme.innerHTML = icon(light ? 'moon' : 'sun');
    theme.setAttribute('aria-pressed', String(light));
    theme.setAttribute('aria-label',light ? '切换到深色模式' : '切换到浅色模式');
    $('meta[name="theme-color"]').content = light ? '#f4f0e8' : '#171715';
  }
  theme.addEventListener('click', () => {
    const value = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = value;
    try { localStorage.setItem('cx-theme',value); } catch (_) { /* Private browsing can deny storage. */ }
    syncTheme();
  });
  syncTheme();
  // Capture image errors, including lazy images that fail after initialization.
  document.addEventListener('error', e => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement)) return;
    const fallback = img.dataset.fallback;
    if (fallback) { delete img.dataset.fallback; img.src = fallback; }
  },true);
  if (home && typeof IntersectionObserver !== 'undefined') {
    const observedLinks = [...nav.querySelectorAll('a')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observedLinks.forEach(a => {
          if (a.hash === '#'+entry.target.id) a.setAttribute('aria-current','location');
          else a.removeAttribute('aria-current');
        });
      });
    }, {rootMargin:'-15% 0px -60% 0px',threshold:0});
    observedLinks.forEach(a => {const target=document.getElementById(a.hash.slice(1));if(target)observer.observe(target)});
  }
  window.CX = {$,$$,esc,text,config,enabled,url,icon,external,image,rich,projectRow,setText,applyMeta};
})();
