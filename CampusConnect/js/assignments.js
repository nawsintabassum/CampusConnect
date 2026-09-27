document.addEventListener('DOMContentLoaded',()=>{
  if(document.body.dataset.page!=='assignments')return;
  CC.requireAuth();
  let data=CC.get(CC.keys.assignments,[]);
  const list=document.querySelector('#assignmentList'), search=document.querySelector('#assignmentSearch'), status=document.querySelector('#statusFilter'), priority=document.querySelector('#priorityFilter');
  function render(){
    const q=search.value.toLowerCase();
    const filtered=data.filter(a=>(!q||(a.title+a.course+a.description).toLowerCase().includes(q))&&(!status.value||a.status===status.value)&&(!priority.value||a.priority===priority.value)).sort((a,b)=>a.deadline.localeCompare(b.deadline));
    document.querySelector('#resultCount').textContent=`${filtered.length} assignment${filtered.length!==1?'s':''}`;
    list.innerHTML=filtered.length?filtered.map(a=>`<div class="card section"><div class="card-top"><div><div class="meta">${CC.escape(a.course)} · Due ${CC.formatDate(a.deadline)}</div><h3 style="margin:0">${CC.escape(a.title)}</h3><p class="muted">${CC.escape(a.description||'')}</p></div><span class="badge ${a.priority==='High'?'badge-red':a.priority==='Medium'?'badge-orange':'badge-green'}">${CC.escape(a.priority)}</span></div><div class="card-actions" style="margin-top:14px"><span class="badge ${a.status==='Completed'?'badge-green':a.status==='In Progress'?'badge-blue':'badge-gray'}">${CC.escape(a.status)}</span><button class="btn btn-secondary btn-sm" data-edit="${a.id}">Edit</button><button class="btn btn-danger btn-sm" data-delete="${a.id}">Delete</button><button class="btn btn-primary btn-sm" data-complete="${a.id}">${a.status==='Completed'?'Mark Pending':'Mark Completed'}</button></div></div>`).join(''):`<div class="card empty"><div class="empty-icon">📚</div>No assignments match your filters.</div>`;
  }
  function openForm(item){
    const isEdit=!!item;
    const m=CC.modal(isEdit?'Edit Assignment':'Add Assignment',`<form id="assignmentForm"><div class="grid grid-2"><div class="form-group"><label>Assignment Title</label><input class="input" name="title" required value="${CC.escape(item?.title||'')}"></div><div class="form-group"><label>Course</label><input class="input" name="course" required value="${CC.escape(item?.course||'')}"></div><div class="form-group"><label>Deadline</label><input class="input" type="date" name="deadline" required value="${item?.deadline||''}"></div><div class="form-group"><label>Priority</label><select class="select" name="priority"><option ${item?.priority==='Low'?'selected':''}>Low</option><option ${item?.priority==='Medium'?'selected':''}>Medium</option><option ${item?.priority==='High'?'selected':''}>High</option></select></div><div class="form-group"><label>Status</label><select class="select" name="status"><option ${item?.status==='Pending'?'selected':''}>Pending</option><option ${item?.status==='In Progress'?'selected':''}>In Progress</option><option ${item?.status==='Completed'?'selected':''}>Completed</option></select></div></div><div class="form-group"><label>Description</label><textarea class="textarea" name="description">${CC.escape(item?.description||'')}</textarea></div><button class="btn btn-primary" type="submit">${isEdit?'Save Changes':'Add Assignment'}</button></form>`);
    m.querySelector('#assignmentForm').addEventListener('submit',e=>{
      e.preventDefault();const f=new FormData(e.target);
      const obj={id:item?.id||Date.now(),title:f.get('title'),course:f.get('course'),deadline:f.get('deadline'),priority:f.get('priority'),status:f.get('status'),description:f.get('description')};
      if(isEdit)data=data.map(x=>x.id===item.id?obj:x);else data.push(obj);
      CC.set(CC.keys.assignments,data);m.remove();render();CC.toast(isEdit?'Assignment updated':'Assignment added');
    });
  }
  document.querySelector('#addAssignment').addEventListener('click',()=>openForm());
  [search,status,priority].forEach(e=>e.addEventListener('input',render));
  list.addEventListener('click',e=>{
    const edit=e.target.closest('[data-edit]'), del=e.target.closest('[data-delete]'), comp=e.target.closest('[data-complete]');
    if(edit)openForm(data.find(x=>x.id==edit.dataset.edit));
    if(del){const id=+del.dataset.delete;if(confirm('Delete this assignment?')){data=data.filter(x=>x.id!==id);CC.set(CC.keys.assignments,data);render();CC.toast('Assignment deleted');}}
    if(comp){const id=+comp.dataset.complete;data=data.map(x=>x.id===id?{...x,status:x.status==='Completed'?'Pending':'Completed'}:x);CC.set(CC.keys.assignments,data);render();CC.toast('Assignment status updated');}
  });
  render();
});
