document.addEventListener('DOMContentLoaded',()=>{
  const form=document.querySelector('#loginForm'); if(!form)return;
  const toggle=document.querySelector('#showPassword');
  toggle?.addEventListener('change',()=>document.querySelector('#password').type=toggle.checked?'text':'password');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const identity=document.querySelector('#identity').value.trim();
    const password=document.querySelector('#password').value;
    const err=document.querySelector('#loginError');
    if(!identity||!password){err.textContent='Please enter your email/student ID and password.';err.classList.remove('hidden');return;}
    if(password.length<4){err.textContent='Password must contain at least 4 characters.';err.classList.remove('hidden');return;}
    const profile=CC.get(CC.keys.profile);
    CC.set(CC.keys.user,{identity,loginAt:new Date().toISOString(),remember:document.querySelector('#remember').checked});
    CC.toast('Login successful. Welcome back!');
    setTimeout(()=>location.href='dashboard.html',500);
  });
});
