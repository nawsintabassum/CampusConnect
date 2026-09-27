const CC = (() => {
  const keys = {
    user:'cc_user', assignments:'cc_assignments', registrations:'cc_registrations',
    bookmarks:'cc_bookmarks', theme:'cc_theme', notices:'cc_notices', profile:'cc_profile',
    notifications:'cc_notifications'
  };

  const sample = {
    assignments:[
      {id:1,title:'Software Requirements Specification',course:'SWE 212',deadline:'2026-10-03',priority:'High',status:'In Progress',description:'Finalize use cases and non-functional requirements.'},
      {id:2,title:'Database Design ERD',course:'CSE 221',deadline:'2026-10-07',priority:'Medium',status:'Pending',description:'Prepare normalized ER diagram for the course project.'},
      {id:3,title:'Computer Networks Lab Report',course:'CSE 231',deadline:'2026-09-30',priority:'High',status:'Pending',description:'Submit the Wireshark analysis and findings.'}
    ],
    notices:[
      {id:1,title:'Midterm Examination Schedule Published',category:'Academic',date:'2026-09-25',description:'The midterm examination schedule has been published. Students should check their course sections.',important:true},
      {id:2,title:'Programming Contest Registration',category:'Competition',date:'2026-09-23',description:'Registration is open for the upcoming inter-department programming contest.',important:false},
      {id:3,title:'Library Hours Extended',category:'General',date:'2026-09-20',description:'The central library will remain open until 9:00 PM during the examination preparation period.',important:false},
      {id:4,title:'Tuition Payment Reminder',category:'Finance',date:'2026-09-18',description:'Students are requested to complete their semester payment within the published deadline.',important:true},
      {id:5,title:'Career Workshop: Git & GitHub',category:'Workshop',date:'2026-09-16',description:'Join the career development workshop on collaborative software development workflows.',important:false}
    ],
    events:[
      {id:1,title:'Software Engineering Career Workshop',category:'Workshop',date:'2026-10-02',time:'10:00 AM',venue:'Auditorium 2',organizer:'Career Development Center',description:'A practical workshop on Git, GitHub, CV building and interview preparation.'},
      {id:2,title:'Inter-University Programming Contest',category:'Competition',date:'2026-10-12',time:'9:00 AM',venue:'Innovation Lab',organizer:'CSE Programming Club',description:'Competitive programming contest for university students.'},
      {id:3,title:'AI & Future of Work Seminar',category:'Seminar',date:'2026-10-18',time:'3:00 PM',venue:'Seminar Hall',organizer:'SWE Department',description:'Industry speakers discuss AI-assisted software development and career skills.'},
      {id:4,title:'Tech Club Networking Night',category:'Club',date:'2026-10-24',time:'5:30 PM',venue:'Student Lounge',organizer:'Tech Club',description:'Meet student developers, project teams and campus tech communities.'}
    ],
    resources:[
      {id:1,title:'Software Requirements Engineering Notes',category:'Lecture Notes',course:'SWE 212',url:'https://www.istqb.org/',description:'Requirements engineering concepts, examples and terminology.'},
      {id:2,title:'MDN Web Development Guide',category:'Programming',course:'Web Engineering',url:'https://developer.mozilla.org/',description:'Reliable reference for HTML, CSS and JavaScript.'},
      {id:3,title:'Git & GitHub Documentation',category:'Useful Websites',course:'Software Engineering',url:'https://docs.github.com/',description:'Official documentation for GitHub workflows and collaboration.'},
      {id:4,title:'Database System Concepts',category:'Course Materials',course:'CSE 221',url:'https://www.db-book.com/',description:'Database concepts, relational models and transaction fundamentals.'},
      {id:5,title:'Python Official Tutorial',category:'Tutorials',course:'Programming',url:'https://docs.python.org/3/tutorial/',description:'Official beginner-to-intermediate Python tutorial.'}
    ]
  };

  function get(key, fallback=null){
    try{ const v=localStorage.getItem(key); return v===null?fallback:JSON.parse(v); }
    catch(e){ return fallback; }
  }
  function set(key,val){ localStorage.setItem(key,JSON.stringify(val)); }
  function initData(){
    if(!get(keys.assignments)) set(keys.assignments,sample.assignments);
    if(!get(keys.notices)) set(keys.notices,sample.notices);
    if(!get('cc_events')) set('cc_events',sample.events);
    if(!get('cc_resources')) set('cc_resources',sample.resources);
    if(!get(keys.registrations)) set(keys.registrations,[]);
    if(!get(keys.bookmarks)) set(keys.bookmarks,[]);
    if(!get(keys.profile)) set(keys.profile,{
      name:'Nawrin Tarannum',studentId:'DIU-SWE-2024-001',
      department:'Software Engineering',university:'Daffodil International University',
      semester:'6th Semester',email:'student@campusconnect.edu',skills:'HTML, CSS, JavaScript, Git, SQL',
      interests:'Full-Stack Development, UI/UX, Software Engineering'
    });
  }
  function applyTheme(){
    const theme=localStorage.getItem(keys.theme)||'light';
    document.documentElement.dataset.theme=theme;
    document.querySelectorAll('[data-theme-toggle]').forEach(el=>el.checked=theme==='dark');
  }
  function toggleTheme(on){localStorage.setItem(keys.theme,on?'dark':'light');applyTheme();}
  function toast(message,type='success'){
    let box=document.querySelector('.toast-container');
    if(!box){box=document.createElement('div');box.className='toast-container';document.body.appendChild(box);}
    const t=document.createElement('div');t.className=`toast ${type}`;t.textContent=message;box.appendChild(t);
    setTimeout(()=>t.remove(),3200);
  }
  function escape(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
  function formatDate(v){return new Date(v+'T00:00:00').toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'});}
  function todayName(){return new Date().toLocaleDateString('en-US',{weekday:'long'});}
  function requireAuth(){
    if(!get(keys.user)) location.href='login.html';
  }
  function logout(){localStorage.removeItem(keys.user);location.href='login.html';}
  function setupShell(){
    initData(); applyTheme();
    const page=document.body.dataset.page;
    document.querySelectorAll('.nav-link').forEach(a=>{
      if(a.dataset.page===page)a.classList.add('active');
    });
    const profile=get(keys.profile);
    document.querySelectorAll('[data-user-name]').forEach(e=>e.textContent=profile?.name||'Student');
    document.querySelectorAll('[data-user-initial]').forEach(e=>e.textContent=(profile?.name||'S').charAt(0).toUpperCase());
    document.querySelectorAll('[data-theme-toggle]').forEach(e=>e.addEventListener('change',()=>toggleTheme(e.checked)));
    document.querySelectorAll('[data-logout]').forEach(e=>e.addEventListener('click',logout));
    const menu=document.querySelector('.menu-toggle'), side=document.querySelector('.sidebar');
    if(menu&&side) menu.addEventListener('click',()=>side.classList.toggle('open'));
  }
  function modal(title,body){
    const wrap=document.createElement('div');wrap.className='modal-backdrop';
    wrap.innerHTML=`<div class="modal"><div class="modal-head"><h2>${escape(title)}</h2><button class="icon-btn" data-close>✕</button></div>${body}</div>`;
    document.body.appendChild(wrap);
    wrap.addEventListener('click',e=>{if(e.target===wrap||e.target.closest('[data-close]'))wrap.remove()});
    return wrap;
  }
  function updateNotificationCount(){
    const count=(get(keys.notifications,[])||[]).filter(x=>!x.read).length;
    document.querySelectorAll('[data-notification-count]').forEach(e=>e.textContent=count);
  }
  return {keys,sample,get,set,initData,applyTheme,toggleTheme,toast,escape,formatDate,todayName,requireAuth,logout,setupShell,modal,updateNotificationCount};
})();
document.addEventListener('DOMContentLoaded',()=>{CC.setupShell();CC.updateNotificationCount();});
