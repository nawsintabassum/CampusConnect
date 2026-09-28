document.addEventListener('DOMContentLoaded',()=>{
  if(document.body.dataset.page!=='dashboard')return;
  CC.requireAuth();
  const assignments=CC.get(CC.keys.assignments,[]);
  const events=CC.get('cc_events',[]);
  const profile=CC.get(CC.keys.profile);
  const pending=assignments.filter(a=>a.status!=='Completed').length;
  document.querySelector('#statCourses').textContent='6';
  document.querySelector('#statAssignments').textContent=pending;
  document.querySelector('#statEvents').textContent=events.length;
  document.querySelector('#statAttendance').textContent='87%';
  document.querySelector('#dashName').textContent=profile.name;
  document.querySelector('#dashId').textContent=profile.studentId;
  const aBox=document.querySelector('#dashAssignments');
  aBox.innerHTML=assignments.filter(a=>a.status!=='Completed').sort((a,b)=>a.deadline.localeCompare(b.deadline)).slice(0,4).map(a=>`
    <div class="list-item"><div class="card-top"><div><strong>${CC.escape(a.title)}</strong><div class="meta">${CC.escape(a.course)} · ${CC.formatDate(a.deadline)}</div></div><span class="badge ${a.priority==='High'?'badge-red':a.priority==='Medium'?'badge-orange':'badge-green'}">${CC.escape(a.priority)}</span></div></div>`).join('') || `<div class="empty">No pending assignments 🎉</div>`;
  const nBox=document.querySelector('#dashNotices');
  const notices=CC.get(CC.keys.notices,[]).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3);
  nBox.innerHTML=notices.map(n=>`<div class="list-item"><div class="card-top"><strong>${CC.escape(n.title)}</strong>${n.important?'<span class="badge badge-red">Important</span>':''}</div><div class="meta">${CC.escape(n.category)} · ${CC.formatDate(n.date)}</div></div>`).join('');
  const eBox=document.querySelector('#dashEvents');
  eBox.innerHTML=events.slice(0,3).map(e=>`<div class="list-item"><strong>${CC.escape(e.title)}</strong><div class="meta">${CC.formatDate(e.date)} · ${CC.escape(e.venue)}</div></div>`).join('');
});
