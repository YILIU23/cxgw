/* Project details keep the existing works.html?id=N route and env.js content. */
(function () {
  'use strict';
  const {$,$$,esc,config,url,icon,external,rich,projectRow,setText,applyMeta} = window.CX;
  const projects = config('cont',[]);
  const raw = new URLSearchParams(location.search).get('id');
  const id = raw !== null && /^(0|[1-9]\d*)$/.test(raw) ? Number(raw) : -1;
  const project = Number.isSafeInteger(id) ? projects[id] : null;
  if (!project) {
    applyMeta('作品未找到 · '+config('teamname','上官程星'),'这个作品链接不存在，请返回目录查看其他作品。');
    setText('#detail-heading','作品未找到');
    setText('#detail-summary','这个链接没有对应的作品。回到作品目录，重新选一个吧。');
    $('#detail-actions').innerHTML = '<a class="btn btn--primary" href="./index.html#work">返回作品目录 '+icon('back')+'</a>';
    $('#detail-path').textContent = '❯ project not found';
    $('#project-content').hidden = true;
    $('#related').classList.add('legal-only');
    $('#related .section-head').hidden = true;
    $('.detail-visual').hidden = true;
    $('#project-meta').hidden = true;
    document.documentElement.dataset.ready = 'true';
    return;
  }
  const meta = project[5] || [], content = project[6] || [];
  applyMeta(project[2]+' · '+config('teamname','上官程星'), project[3]);
  setText('#detail-heading',project[2]);
  setText('#detail-summary',project[3]);
  setText('#detail-path','❯ open ./projects/'+String(id+1).padStart(2,'0'));
  setText('#detail-type',meta[0]+' / project');
  const visitUrl = url(project[4],false), downloadUrl = url(meta[4],false);
  $('#detail-actions').innerHTML = (visitUrl ? external(visitUrl,'前往体验 '+icon('arrow-up-right'),'btn btn--primary') : '') + (downloadUrl && downloadUrl !== visitUrl ? external(downloadUrl,'下载作品 '+icon('arrow'),'btn btn--secondary') : '');
  const facts = [['作品类型',meta[0]],['当前版本',meta[2]],['费用',String(meta[1])==='0' ? '免费' : meta[1]],['配置状态',meta[3] ? '正常' : '异常']].filter(item => item[1] !== undefined && item[1] !== '');
  $('#project-meta').innerHTML = facts.map(item => '<div class="meta-item"><dt>'+esc(item[0])+'</dt><dd>'+esc(item[1])+'</dd></div>').join('');
  $('#project-article').innerHTML = String(content[1] || project[3]).split(/\r?\n/).filter(Boolean).map(line => '<p>'+rich(line)+'</p>').join('');
  $('#project-resources').innerHTML = (visitUrl ? external(visitUrl,'访问网站 '+icon('arrow-up-right'),'resource-link') : '') + (downloadUrl && downloadUrl !== visitUrl ? external(downloadUrl,'获取作品 '+icon('arrow-up-right'),'resource-link') : '');
  // Repeated template landscape images are decoration, not project screenshots.
  // Real, unique images configured by the owner still receive a working native lightbox.
  const images = [...new Set(content.slice(2,5).filter(src => url(src,false) && !/zxmacc-staticr.*day02\.png/.test(src)))];
  if (images.length) {
    $('#vi').hidden = false;
    $('#vi').innerHTML = images.map((src,index) => '<button type="button" data-image="'+esc(url(src,false))+'" aria-label="查看'+esc(project[2])+'图片'+(index+1)+'"><img src="'+esc(url(src,false))+'" alt="'+esc(project[2])+'图片'+(index+1)+'" loading="lazy" width="480" height="320" data-fallback="./assets/star.svg"></button>').join('');
  }
  const viewer = $('#image-viewer');
  $('#vi').addEventListener('click',e => {
    const button = e.target.closest('[data-image]');
    if (!button) return;
    $('#viewer-image').src = button.dataset.image;
    $('#viewer-image').alt = button.getAttribute('aria-label');
    setText('#viewer-caption',project[2]);
    viewer.showModal();
  });
  $('#viewer-close').addEventListener('click',() => viewer.close());
  viewer.addEventListener('click',e => { if (e.target === viewer) { const b=viewer.getBoundingClientRect(); if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom) viewer.close(); } });
  const related = projects.map((item,index) => ({item,index})).filter(item => item.index !== id).slice(0,3);
  $('#related-list').innerHTML = related.map(({item,index}) => projectRow(item,index)).join('');
  if (!related.length) { $('#related').classList.add('legal-only'); $('#related .section-head').hidden = true; }
  document.documentElement.dataset.ready = 'true';
})();
