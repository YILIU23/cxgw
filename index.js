/* Home modules. Keep the original module names and env.js array shapes. */
(function () {
  'use strict';
  const {$,$$,esc,config,enabled,url,icon,external,image,projectRow,setText} = window.CX;
  $$('[data-module]').forEach(el => { el.hidden = !enabled(el.dataset.module); });
  $$('[data-nav-module]').forEach(el => { el.hidden = !enabled(el.dataset.navModule); });
  setText('#team-name',config('teamname','上官程星'));
  setText('#hero-description',config('blk1stitle','聊日常，分享学习，也放一些我们做的东西。'));
  const year = String(config('teamday','')).trim();
  $('#founding-year').hidden = !/^\d{4}$/.test(year);
  setText('#founding-year',year ? '// 本群于'+year+'年建立' : '');
  const contacts = config('contacts',[]);
  const group = contacts.find(item => /QQ群|QQ 群|交流群/.test(item[1])) || contacts.find(item => url(item[2],false));
  const groupUrl = group && url(group[2],false);
  if (groupUrl) { $('#join-hero').href = groupUrl; $('#join-hero').target = '_blank'; $('#join-hero').rel = 'noopener noreferrer'; }
  else $('#join-hero').hidden = true;
  const footerJoin = $('#join-footer');
  footerJoin.hidden = !groupUrl || !enabled('contact');
  if (groupUrl) {footerJoin.href=groupUrl;footerJoin.target='_blank';footerJoin.rel='noopener noreferrer';}
  const projects = config('cont',[]);
  if (enabled('work') && projects.length) {
    $('#project-list').innerHTML = projects.map(projectRow).join('');
    $('#work').classList.toggle('is-expanded',projects.length>3);
    setText('#project-count',projects.length+' entries / projects');
  } else {
    $('#work').hidden = true;
    $('#hero-directory [data-nav-module="work"]').hidden = true;
  }

  // This action always opens the work directory when it exists.
  if ($('#work').hidden) setText('#gst','看看社群');
  if (enabled('member')) {
    const members = config('memb',[]);
    $('#member').classList.toggle('is-expanded',members.length>2);
    $('#member-list').innerHTML = members.map((member,index) => {
      const links = member[4] || [];
      const qq = /^\d+$/.test(String(links[0])) ? external('https://wpa.qq.com/msgrd?v=3&uin='+links[0]+'&site=qq&menu=yes&jumpflag=1',icon('message')+'<span>QQ</span>') : '';
      const web = external(links[1],icon('link')+'<span>网站</span>');
      const mail = links[2] ? external('mailto:'+links[2],icon('mail')+'<span>邮件</span>') : '';
      return '<article class="person card"><div class="person-top">'+image(member[1],member[2]+'的头像','avatar')+'<span class="person-index">@'+String(index+1).padStart(2,'0')+'</span></div><h3>'+esc(member[2])+'</h3><p class="person-role">'+esc(member[3])+'</p><div class="person-links">'+qq+web+mail+'</div></article>';
    }).join('');
    if (!members.length) $('#member').hidden = true;
  }
  if (enabled('feature')) $('#feature').innerHTML = config('aboutmod',[]).map(item => '<div class="feature-item">'+icon(item[0])+'<div><strong class="feature-title">'+esc(item[1])+'</strong><p>'+esc(item[2])+'</p></div></div>').join('');
  if (enabled('zone')) $('#community-notes').innerHTML = config('zone',[]).map(item => '<p>'+esc(item[2])+'</p>').join('');
  $('#about').hidden = !['feature','zone','hito'].some(enabled);
  if (!enabled('feature') || !enabled('zone')) $('.about-layout').classList.add('single-column');
  if (enabled('contact')) $('#contact-links').innerHTML = contacts.map(item => external(item[2],icon(item[0])+'<span><strong>'+esc(item[1])+'</strong><small>'+esc(String(item[2]).startsWith('mailto:') ? String(item[2]).slice(7) : '打开群聊，一起交流')+'</small></span>'+icon('arrow-up-right'),'contact-link')).join('');
  if (enabled('flinks')) $('#friend-list').innerHTML = config('flinks',[]).map(item => external(item[3],image(item[0],'','friend-logo',40,'./assets/star.svg')+'<span><strong>'+esc(item[1])+'</strong><small>'+esc(item[2])+'</small></span>'+icon('arrow-up-right'),'friend')).join('');
  const hasContact = enabled('contact') || enabled('flinks');
  $('#contact').classList.toggle('legal-only',!hasContact);
  $('#contact .section-head').hidden = !hasContact;
  if (!enabled('contact') && enabled('flinks')) { setText('#contact-heading','我们的友邻。'); setText('#contact .section-intro','和程星社群有关的网站。'); }
  // Prune navigation to disabled or empty modules and preserve genuine fragment links.
  $$('#site-navigation a').forEach(a => { const section = document.getElementById(a.hash.slice(1)); if (!section || section.hidden) a.remove(); });
  const firstSection = ['work','member','about','contact'].find(id => !$('#'+id).hidden && (id !== 'contact' || hasContact));
  ['#gst','#hero-scroll'].forEach(selector => { if (firstSection) $(selector).href = '#'+firstSection; else $(selector).hidden = true; });
  if (enabled('hito')) {
    const fallback = config('jrsc','江天一色无纤尘，皎皎空中孤月轮。');
    const fallbackText = fallback === 'api' ? '日常交流与学习分享，在群里继续。' : fallback;
    setText('#hitokoto_text',fallbackText);
    if (fallback !== 'api') { document.documentElement.dataset.ready = 'true'; return; }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(),3500);
    fetch('https://v1.hitokoto.cn', {signal:controller.signal}).then(response => {
      if (!response.ok) throw new Error('Quote service unavailable');
      return response.json();
    }).then(data => {
      if (!data.hitokoto) return;
      setText('#hitokoto_text',data.hitokoto);
      setText('#hitokoto_from',data.from_who || data.from || '一言');
    }).catch(() => { setText('#hitokoto_text',fallbackText); setText('#hitokoto_from','一言'); }).finally(() => clearTimeout(timer));
  }
  document.documentElement.dataset.ready = 'true';
})();
