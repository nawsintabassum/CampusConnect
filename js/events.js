document.addEventListener('DOMContentLoaded',()=>{
  if(document.body.dataset.page!=='events')return; CC.requireAuth();
  const events=CC.get('cc_events',[]), regs=CC.get(CC.keys.registrations,[]);
  const list=document.querySelector('#eventList'), q=document.querySelector('#eventSearch'), cat=document.querySelector('#eventCategory');
  function render(){
    const x=events.filter(e=>(!q.value||(e.title+e.description+e.organizer).toLowerCase().includes(q.value.toLowerCase()))&&(!cat.value||e.category===cat.value));
    list.innerHTML=x.map(e=>{const registered=regs.includes(e.id);return `<article class="card event-card"><div class="card-top"><div><span class="badge badge-blue">${CC.escape(e.category)}</span><h3>${CC.escape(e.title)}</h3></div><span class="countdown" data-countdown="${e.date}T${to24(e.time)}:00"></span></div><div class="meta">📅 ${CC.formatDate(e.date)} · 🕒 ${CC.escape(e.time)} · 📍 ${CC.escape(e.venue)}</div><p class="muted">${CC.escape(e.description)}</p><small class="muted">Organizer: ${CC.escape(e.organizer)}</small><div class="card-actions" style="margin-top:15px"><button class="btn btn-secondary btn-sm" data-details="${e.id}">Details</button><button class="btn ${registered?'btn-secondary':'btn-primary'} btn-sm" data-register="${e.id}">${registered?'Registered ✓':'Register'}</button></div></article>`}).join('');
  }
  function to24(t){let m=t.match(/(\d+):(\d+)\s*(AM|PM)/i);if(!m)return '00:00';let h=+m[1];if(m[3].toUpperCase()==='PM'&&h!==12)h+=12;if(m[3].toUpperCase()==='AM'&&h===12)h=0;return String(h).padStart(2,'0')+':'+m[2]}
  function countdown(){
    document.querySelectorAll('[data-countdown]').forEach(el=>{const d=new Date(el.dataset.countdown);let s=Math.max(0,d-new Date())/1000;const days=Math.floor(s/86400);s%=86400;const hrs=Math.floor(s/3600);s%=3600;const min=Math.floor(s/60);el.textContent=d-new Date()>0?`${days}d ${hrs}h ${min}m`:'Started';});
  }
  [q,cat].forEach(x=>x.addEventListener('input',render));
  list.addEventListener('click',e=>{
    const det=e.target.closest('[data-details]'), reg=e.target.closest('[data-register]');
    if(det){const x=events.find(v=>v.id==det.dataset.details);CC.modal(x.title,`<p><b>Date:</b> ${CC.formatDate(x.date)}<br><b>Time:</b> ${CC.escape(x.time)}<br><b>Venue:</b> ${CC.escape(x.venue)}<br><b>Organizer:</b> ${CC.escape(x.organizer)}</p><p>${CC.escape(x.description)}</p>`);}
    if(reg){const id=+reg.dataset.register;if(!regs.includes(id)){regs.push(id);CC.set(CC.keys.registrations,regs);CC.toast('Registration simulated successfully');render();}else CC.toast('You are already registered','error');}
  });
  render();countdown();setInterval(countdown,60000);
});
