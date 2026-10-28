const body=document.body;
const themeBtn=document.getElementById('themeBtn');
const menuBtn=document.getElementById('menuBtn');
const nav=document.getElementById('nav');
const typed=document.getElementById('typed');
const topBtn=document.getElementById('topBtn');

themeBtn.addEventListener('click',()=>{
  body.classList.toggle('light');
  themeBtn.textContent=body.classList.contains('light')?'☀':'☾';
});

menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const words=['Front-End Developer','Full Stack Developer','UI Developer','Web Designer'];
let wi=0,ci=0,deleting=false;
function type(){
  const word=words[wi];
  typed.textContent=deleting?word.substring(0,ci--):word.substring(0,ci++);
  if(!deleting && ci>word.length){deleting=true;setTimeout(type,1100);return}
  if(deleting && ci<0){deleting=false;wi=(wi+1)%words.length;ci=0}
  setTimeout(type,deleting?45:80);
}
type();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const filters=document.querySelectorAll('.filter');
const projects=document.querySelectorAll('.project');
filters.forEach(btn=>{
  btn.addEventListener('click',()=>{
    filters.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    projects.forEach(p=>p.classList.toggle('hidden',f!=='all'&&p.dataset.category!==f));
  });
});

window.addEventListener('scroll',()=>{
  topBtn.classList.toggle('show',window.scrollY>500);
});
topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('formMessage').textContent='Thanks! This demo form is front-end only.';
});

document.getElementById('year').textContent=new Date().getFullYear();

const cursor=document.querySelector('.cursor'),dot=document.querySelector('.cursor-dot');
window.addEventListener('mousemove',e=>{
  cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';
  dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';
});
document.querySelectorAll('a,button,.card,.project,input,textarea').forEach(el=>{
  el.addEventListener('mouseenter',()=>body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave',()=>body.classList.remove('cursor-hover'));
});

function demoProject(e){
  e.preventDefault();
  alert('Demo project link — replace this with your real project URL.');
}
