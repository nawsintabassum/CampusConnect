document.addEventListener('DOMContentLoaded',()=>{
  if(document.body.dataset.page!=='notices')return; CC.requireAuth();
  let notices=CC.get(CC.keys.notices,[]);
  const list=document.querySelector('#noticeList'),q=document.querySelector('#noticeSearch'),cat=document.querySelector('#noticeCategory'),sort=document.querySelector('#noticeSort');
  function render(){
    const term=q.value.toLowerCase();
    let x=notices.filter(n=>(!term||(n.title+n.description+n.category).toLowerCase().includes(term))&&(!cat.value||n.category===cat.value));
    x.sort((a,b)=>sort.value==='oldest'?a.date.localeCompare(b.date):b.date.localeCompare(a.date));
    list.innerHTML=x.length?x.map(n=>`<article class="card notice-card"><div class="card-top"><div><div class="meta">${CC.escape(n.category)} · ${CC.formatDate(n.date)}</div><h3 style="margin:0 0 7px">${CC.escape(n.title)}</h3></div>${n.important?'<span class="badge badge-red">Important</span>':''}</div><p class="muted">${CC.escape(n.description)}</p><button class="btn btn-secondary btn-sm" data-view="${n.id}">View Details</button><button class="btn btn-secondary btn-sm" data-important="${n.id}">${n.important?'Remove Important':'Mark Important'}</button></article>`).join(''):`<div class="card empty">No notices found.</div>`;
  }
  [q,cat,sort].forEach(x=>x.addEventListener('input',render));
  list.addEventListener('click',e=>{
    const view=e.target.closest('[data-view]'), imp=e.target.closest('[data-important]');
    if(view){const n=notices.find(x=>x.id==view.dataset.view);CC.modal(n.title,`<p class="muted">${CC.escape(n.category)} · ${CC.formatDate(n.date)}</p><p>${CC.escape(n.description)}</p>`);}
    if(imp){notices=notices.map(x=>x.id==imp.dataset.important?{...x,important:!x.important}:x);CC.set(CC.keys.notices,notices);render();CC.toast('Notice updated');}
  });
  render();
});
