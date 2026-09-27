document.addEventListener('DOMContentLoaded',()=>{
  if(document.body.dataset.page!=='resources')return; CC.requireAuth();
  const resources=CC.get('cc_resources',[]); let bookmarks=CC.get(CC.keys.bookmarks,[]);
  const list=document.querySelector('#resourceList'),q=document.querySelector('#resourceSearch'),cat=document.querySelector('#resourceCategory'),only=document.querySelector('#bookmarkedOnly');
  function render(){
    const x=resources.filter(r=>(!q.value||(r.title+r.course+r.description).toLowerCase().includes(q.value.toLowerCase()))&&(!cat.value||r.category===cat.value)&&(!only.checked||bookmarks.includes(r.id)));
    list.innerHTML=x.length?x.map(r=>{const b=bookmarks.includes(r.id);return `<article class="card resource-card"><div class="card-top"><div><span class="badge badge-blue">${CC.escape(r.category)}</span><h3>${CC.escape(r.title)}</h3></div><button class="icon-btn" title="Bookmark" data-bookmark="${r.id}">${b?'★':'☆'}</button></div><div class="meta">${CC.escape(r.course)}</div><p class="muted">${CC.escape(r.description)}</p><a class="btn btn-primary btn-sm" href="${r.url}" target="_blank" rel="noopener">Open Resource ↗</a></article>`}).join(''):`<div class="card empty">No resources found.</div>`;
  }
  [q,cat,only].forEach(x=>x.addEventListener('input',render));
  list.addEventListener('click',e=>{const b=e.target.closest('[data-bookmark]');if(!b)return;const id=+b.dataset.bookmark;bookmarks=bookmarks.includes(id)?bookmarks.filter(x=>x!==id):[...bookmarks,id];CC.set(CC.keys.bookmarks,bookmarks);render();CC.toast(bookmarks.includes(id)?'Resource bookmarked':'Bookmark removed');});
  render();
});
