'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths={
grid:'<rect x="3" y="3" width="7" height="7" rx="1.7"/><rect x="14" y="3" width="7" height="7" rx="1.7"/><rect x="3" y="14" width="7" height="7" rx="1.7"/><rect x="14" y="14" width="7" height="7" rx="1.7"/>',
sprout:'<path d="M12 21v-9M12 15C5 15 3 11 3 6c6 0 9 3 9 9ZM12 12c0-6 4-9 9-9 0 6-3 9-9 9Z"/>',
mic:'<rect x="8" y="2" width="8" height="13" rx="4"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"/>',
chart:'<path d="M4 3v17h17M8 15v-4M13 15V7M18 15V4"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.6 2.6 0 1 1 4.3 2c-1.3.7-1.8 1.3-1.8 2.5M12 17h.01"/>',
chevron:'<path d="m8 10 4 4 4-4"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
play:'<path d="m9 5 11 7-11 7Z" fill="currentColor" stroke="none"/>',volume:'<path d="m11 4-5 4H2v8h4l5 4ZM15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14"/>',
plus:'<path d="M12 5v14M5 12h14"/>',heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
people:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6M18 15a5 5 0 0 1 3 5"/>',
globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
check:'<path d="m5 12 4 4L19 6"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',edit:'<path d="m16 3 5 5L9 20l-6 1 1-6ZM13 6l5 5"/>',
book:'<path d="M12 5C8 2 4 3 2 4v16c4-1 7-1 10 1 3-2 6-2 10-1V4c-2-1-6-2-10 1Zm0 0v16"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',upload:'<path d="M12 16V4m-5 5 5-5 5 5M4 16v5h16v-5"/>',
stop:'<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" stroke="none"/>',spark:'<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/>',
back:'<path d="M20 12H4m6-6-6 6 6 6"/>',settings:'<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="2" fill="currentColor"/><circle cx="16" cy="12" r="2" fill="currentColor"/><circle cx="10" cy="18" r="2" fill="currentColor"/>'
};
function icon(name){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">'+(paths[name]||paths.heart)+'</svg>'}
const drawings={
water:'<path d="M26 22h30l-4 43H30Z" fill="#d8e7e8" stroke="#6b9395"/><path d="m29 39 5 23h14l3-23" fill="#9fc9d0" stroke="none"/><path d="M23 22h36M35 14l4-6M45 15l3-7" stroke="#6b9395"/><path d="M36 42v11" stroke="#ecf6f5" stroke-width="3"/>',
food:'<ellipse cx="40" cy="42" rx="25" ry="22" fill="#f5eee0" stroke="#b3976b"/><ellipse cx="40" cy="42" rx="17" ry="15" fill="#e6d3af" stroke="#c3ab80"/><path d="M36 42c0-9 17-13 17-3 0 8-9 14-17 9" fill="#d1aa75" stroke="#ac8153"/><path d="M29 43c-4-8-1-14 5-15 8 4 5 12-5 15Z" fill="#9eb786" stroke="#7f9c63"/><path d="M8 21v16m-4-16v10c0 5 8 5 8 0V21M8 37v27M70 21c-7 6-7 19 0 20v23M70 21v20" stroke="#9a9d85"/>',
toilet:'<path d="M25 13h31v28H25Z" fill="#d2e2d4" stroke="#7f9a81"/><path d="M22 40h41v7c0 9-8 16-18 16H32V52c-6 0-10-4-10-12Z" fill="#f3f4e9" stroke="#7f9a81"/><path d="M36 63v5h21l-4-9" fill="#d2e2d4" stroke="#7f9a81"/><path d="M44 22h6" stroke="#7f9a81" stroke-width="3"/>',
pain:'<path d="M55 23c10 1 10 14 0 23L40 61 25 46c-16-15-4-32 9-24l6 5 5-5" fill="#eac5b9" stroke="#b47d6a"/><path d="m44 7-9 18h11l-9 17 22-26H47l5-9" fill="#c59367" stroke="#a67e54"/><path d="m17 19-4-5M13 30H7M20 12l-1-6" stroke="#cbb09e"/>',
rest:'<path d="M10 29v34M10 54h60v9M10 48h60v6M22 33h34a14 14 0 0 1 14 14v1H22Z" fill="#d0d9c4" stroke="#8a9979"/><path d="M10 40h21v8H10Z" fill="#f3eedf" stroke="#b5ad94"/><path d="m49 11 8 0-8 10h8m7-16h6l-6 8h6" stroke="#a3ad91"/>',
family:'<path d="M13 65V53c0-9 22-9 22 0v12M45 65V53c0-9 22-9 22 0v12" fill="#d7c3a5" stroke="#a58c6a"/><circle cx="24" cy="32" r="11" fill="#eddbc4" stroke="#a58c6a"/><circle cx="56" cy="32" r="11" fill="#dfc9b0" stroke="#a58c6a"/><path d="M13 29c1-14 22-15 22 0M45 28c2-13 22-13 22 3" fill="#9b8d71" stroke="#9b8d71"/><path d="M29 68V58c0-10 22-10 22 0v10" fill="#a9be95" stroke="#7f996a"/><circle cx="40" cy="44" r="9" fill="#f0dcc2" stroke="#a58c6a"/>',
yes:'<circle cx="40" cy="40" r="27" fill="#d2e3bf" stroke="#7c9e62"/><path d="m26 40 10 10 20-22" stroke="#6a8e50" stroke-width="4"/>',
no:'<circle cx="40" cy="40" r="27" fill="#ecd5c9" stroke="#b28c78"/><path d="m29 29 22 22M51 29 29 51" stroke="#ad7e68" stroke-width="4"/>',
help:'<path d="M24 64V38a4 4 0 0 1 8 0V20a4 4 0 0 1 8 0v15-21a4 4 0 0 1 8 0v23-17a4 4 0 0 1 8 0v21-10a4 4 0 0 1 8 0v22c0 10-7 16-17 16H34Z" fill="#e5d6b8" stroke="#ad9671"/><path d="M23 47 15 39c-5-4-9 1-6 6l15 19M13 17l-4-5M66 17l5-5" fill="#e5d6b8" stroke="#ad9671"/>',
happy:'<circle cx="40" cy="40" r="27" fill="#efdfab" stroke="#b7a270"/><path d="M25 43c3 20 26 20 30 0" fill="#f9f1d8" stroke="#a48e5f"/><circle cx="29" cy="32" r="2" fill="#a48e5f" stroke="none"/><circle cx="51" cy="32" r="2" fill="#a48e5f" stroke="none"/><path d="M20 42h6M54 42h6" stroke="#d6b58b" stroke-width="4"/>',
sad:'<circle cx="40" cy="40" r="27" fill="#d9dfe9" stroke="#929eb1"/><path d="M29 54c3-10 19-10 22 0M24 28l9 3M47 31l9-3" stroke="#8491a8"/><circle cx="29" cy="35" r="2" fill="#8491a8"/><circle cx="51" cy="35" r="2" fill="#8491a8"/><path d="M58 40c-6 7-8 12-4 14 8 2 7-6 4-14Z" fill="#a3bfd3" stroke="#8facc3"/>',
cold:'<path d="M40 9v62M13 24l54 32M13 56l54-32M31 15l9 8 9-8M31 65l9-8 9 8M13 35l14-3-2-13M55 61l-2-13 14-3M13 45l14 3-2 13M55 19l-2 13 14 3" stroke="#8daeb6" stroke-width="3"/>',
tea:'<path d="M20 30h35v23c0 15-35 15-35 0Z" fill="#e4d9bc" stroke="#ab9671"/><path d="M55 32h6c16 0 11 21-6 18M16 67h45M29 22c-8-8 6-9 0-16M42 22c-8-8 6-9 0-16" stroke="#ab9671"/>',
heart:'<path d="M40 65 17 43C-4 20 27 3 40 24 53 3 84 20 63 43Z" fill="#e1bdb4" stroke="#b98c80"/>',
home:'<path d="m8 35 32-27 32 27M17 30v39h46V30" fill="#e2d6b8" stroke="#ac9770"/><path d="M32 69V46h16v23" fill="#b1c29d" stroke="#839a6b"/><path d="M25 15v-5h8" stroke="#ac9770"/>'
};
const tints={water:'#e5eff0',food:'#f5ede0',toilet:'#e6eee5',pain:'#f6e9e2',rest:'#eceee3',family:'#f2ebdf',yes:'#e8f0df',no:'#f3e7e0',help:'#f1ecdd',happy:'#f6efd9',sad:'#e9edf3',cold:'#e8eff1',tea:'#f4edde',heart:'#f4e6e1',home:'#f1eddf'};
const defaults=[
{id:'water',label:'Water',phrase:'I would like some water.',category:'Essentials',symbol:'water',cue:'W…'},
{id:'food',label:'Food',phrase:'I am hungry. I would like some food.',category:'Essentials',symbol:'food',cue:'F…'},
{id:'toilet',label:'Toilet',phrase:'I need to use the toilet.',category:'Essentials',symbol:'toilet',cue:'T…'},
{id:'pain',label:'Pain',phrase:'I am in pain. Please help me.',category:'Comfort',symbol:'pain',cue:'P…'},
{id:'rest',label:'Rest',phrase:'I would like to rest.',category:'Comfort',symbol:'rest',cue:'R…'},
{id:'family',label:'Family',phrase:'I would like to see my family.',category:'People',symbol:'family',cue:'F…'},
{id:'yes',label:'Yes',phrase:'Yes.',category:'Essentials',symbol:'yes',cue:'Y…'},
{id:'no',label:'No',phrase:'No.',category:'Essentials',symbol:'no',cue:'N…'},
{id:'help',label:'Help me',phrase:'Please help me.',category:'People',symbol:'help',cue:'H…'},
{id:'happy',label:'Happy',phrase:'I am feeling happy.',category:'Feelings',symbol:'happy',cue:'H…'},
{id:'sad',label:'Sad',phrase:'I am feeling sad.',category:'Feelings',symbol:'sad',cue:'S…'},
{id:'cold',label:'Cold',phrase:'I am feeling cold. I would like a blanket.',category:'Comfort',symbol:'cold',cue:'C…'}
];
let state={version:1,profile:{patient:'Mama Wanjiku',caregiver:'Grace',language:'Kikuyu',pace:.8},phrases:structuredClone(defaults),sessions:[],uses:[],level:1};
try{const saved=JSON.parse(localStorage.getItem('sauti-v1'));if(saved?.version===1&&Array.isArray(saved.phrases)&&saved.profile)state={...state,...saved}}catch{}
let category='All needs',selectedId=state.phrases[0]?.id,route='need',session=null,search='',db=null;
let mediaRecorder=null,mediaStream=null,recordTimer=null,recordSeconds=0,pendingBlob=null,pendingPhoto=null,recordUrl=null,audioPlayer=null,audioUrl=null,playGeneration=0,recordingIds=new Set(),toastTimer=null;
const main=$('#main'),modal=$('#modal');
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),4200)}
function persist(){try{localStorage.setItem('sauti-v1',JSON.stringify(state));return true}catch{toast('This browser could not save changes. Export a backup before leaving.');return false}}
function openDatabase(){return new Promise((resolve,reject)=>{const r=indexedDB.open('sauti-recordings',1);r.onupgradeneeded=()=>r.result.createObjectStore('audio',{keyPath:'id'});r.onerror=()=>reject(r.error);r.onsuccess=()=>resolve(r.result)})}
function recordingStore(mode,action){return new Promise((resolve,reject)=>{if(!db){reject(new Error('Audio storage unavailable'));return}const tx=db.transaction('audio',mode),r=action(tx.objectStore('audio'));let result;r.onsuccess=()=>result=r.result;r.onerror=()=>reject(r.error);tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error)})}
const getRecording=id=>recordingStore('readonly',s=>s.get(id)),allRecordings=()=>recordingStore('readonly',s=>s.getAll());
async function refreshRecordings(){if(db)recordingIds=new Set((await allRecordings()).map(x=>x.id))}
function art(p){if(p.photo&&/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+\/=\r\n]+$/.test(p.photo))return '<span class="phrase-illustration"><img src="'+p.photo+'" alt=""></span>';const s=Object.hasOwn(drawings,p.symbol)?p.symbol:'heart';return '<span class="phrase-illustration" style="--tint:'+tints[s]+'"><svg viewBox="0 0 80 80" fill="none" aria-hidden="true">'+drawings[s]+'</svg></span>'}
function waveform(){return '<span class="waveform" aria-hidden="true">'+[9,14,23,16,32,22,40,27,34,20,14,27,19,33,23,11,20,14,9].map(h=>'<i style="--h:'+h+'px"></i>').join('')+'</span>'}
function profileUi(){const p=state.profile;$('#household-name').textContent=p.patient;$('#caregiver-name').textContent=p.caregiver;$('.household .avatar').textContent=p.patient.trim().split(/\s+/).pop().slice(0,1).toUpperCase();$('.profile-button .avatar').textContent=p.caregiver.slice(0,1).toUpperCase();$('#sidebar-practice').textContent=state.sessions.length?state.sessions.length+' practice '+(state.sessions.length===1?'moment':'moments')+' together.':'Let’s begin together.'}
function languageButton(){return '<button class="language-pill" data-action="settings" aria-label="Edit household language">'+icon('globe')+'<strong>'+esc(state.profile.language)+'</strong>'+icon('chevron')+'</button>'}
function heading(eyebrow,title,subtitle){return '<div class="page-heading"><p class="eyebrow">'+eyebrow+'</p><div class="heading-row"><div><h1>'+title+'</h1><p class="subtext">'+subtitle+'</p></div>'+languageButton()+'</div></div>'}

