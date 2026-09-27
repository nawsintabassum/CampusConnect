document.addEventListener('DOMContentLoaded',()=>{
  if(document.body.dataset.page!=='profile')return; CC.requireAuth();
  const form=document.querySelector('#profileForm'), p=CC.get(CC.keys.profile);
  for(const [k,v] of Object.entries(p)){const el=form.elements[k];if(el)el.value=v}
  form.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(form), obj={};for(const [k,v] of f.entries())obj[k]=v;CC.set(CC.keys.profile,obj);document.querySelectorAll('[data-user-name]').forEach(x=>x.textContent=obj.name);document.querySelectorAll('[data-user-initial]').forEach(x=>x.textContent=obj.name.charAt(0).toUpperCase());CC.toast('Profile saved successfully');});
});
