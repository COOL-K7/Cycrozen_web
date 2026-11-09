'use strict';
const el=id=>document.getElementById(id);
const letters=['①','②','③','④','⑤'];
let bank={}, queue=[], position=0, selection=null;
let mistakes={};
try { mistakes=JSON.parse(localStorage.getItem('history-wrong-v1'))||{}; } catch {}
function persist(){try{localStorage.setItem('history-wrong-v1',JSON.stringify(mistakes));}catch{el('status').textContent+=' · 이 브라우저에서 저장할 수 없어요.';}}
function switchTab(id){
  for(const b of document.querySelectorAll('[data-tab]')){
    const active=b.dataset.tab===id;
    el(b.dataset.tab).hidden=!active;
    b.setAttribute('aria-pressed',active);
  }
  if(id==='mistakes') renderWrong();
}
document.querySelector('nav').onclick=e=>{if(e.target.dataset.tab)switchTab(e.target.dataset.tab);};
function title(id){const [exam,n]=id.split('-');return '제'+exam+'회 · '+Number(n)+'번';}
function renderWrong(){
  const list=el('wrong');list.replaceChildren();
  const ids=Object.keys(mistakes).filter(id=>Object.hasOwn(bank,id)).sort();
  if(!ids.length){list.textContent='아직 다시 풀 문제가 없어요. 틀린 문항은 여기에 모여요.';return;}
  list.className='wrong-list';
  for(const [i,id] of ids.entries()){
    const b=document.createElement('button');b.textContent=title(id)+' 다시 풀기';
    b.onclick=()=>{queue=ids.slice(i);position=0;selection=null;switchTab('practice');render();};list.append(b);
  }
}
function start(){
  const exam=el('exam').value;
  queue=Object.keys(bank).filter(id=>exam==='random'||id.startsWith(exam+'-')).sort();
  if(exam==='random'){for(let i=queue.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[queue[i],queue[j]]=[queue[j],queue[i]];}}
  position=0;selection=null;render();
}
function render(){
  const id=queue[position], host=el('play');
  if(!id){host.innerHTML='<p class="empty">선택한 문제를 모두 풀었어요.</p>';return;}
  host.innerHTML='<article class="sheet"><small></small><h2></h2><img><div class="options"></div><p id="status" class="result" role="status"></p><button class="next" hidden></button></article>';
  host.querySelector('small').textContent=(position+1)+' / '+queue.length;
  host.querySelector('h2').textContent=title(id);
  const img=host.querySelector('img');img.alt=title(id)+' 기출 원본';img.src='https://www.cycrozen.com/exam-images/'+id+'.webp';
  const next=host.querySelector('.next');next.textContent=position+1===queue.length?'마치기':'다음 문제 →';
  next.onclick=()=>{position++;selection=null;render();};
  const choices=host.querySelector('.options');
  for(let i=1;i<=5;i++){
    const b=document.createElement('button');b.textContent=letters[i-1];b.setAttribute('aria-label',i+'번 선택');b.disabled=true;choices.append(b);
    b.onclick=()=>{if(selection!==null)return;selection=i;const answer=bank[id];const correct=answer===0||i===answer;
      for(const [j,btn] of [...choices.children].entries()){btn.disabled=true;if(j+1===answer)btn.className='right';else if(!correct&&j+1===i)btn.className='miss';}
      el('status').textContent=answer===0?'공식 정정 · 전원 정답 처리된 문항이에요.':correct?'정답이에요.':'정답은 '+letters[answer-1]+'입니다.';
      if(correct)delete mistakes[id];else mistakes[id]=true;
      persist();next.hidden=false;
    };
  }
  const enable=()=>{for(const b of choices.children)b.disabled=false;};img.onload=enable;
  img.onerror=()=>{host.querySelector('#status').textContent='시험지 이미지를 불러오지 못했어요. 다시 불러와 주세요.';};
  if(img.complete&&img.naturalWidth)enable();
}
const today=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul'}).format(new Date());
const left=Math.round((Date.parse('2026-11-28')-Date.parse(today))/86400000);
el('days').textContent=left>0?'D−'+left:left===0?'D-DAY':'시험 종료';
for(let e=80;e>=57;e--){el('exam').add(new Option('제'+e+'회',e));}
el('start').disabled=true;switchTab('practice');
fetch('keys.json').then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{bank=data;el('start').disabled=false;el('start').onclick=start;start();}).catch(()=>el('play').textContent='문제를 불러올 수 없어요. 새로고침해 주세요.');
fetch('topics.json').then(r=>r.json()).then(topics=>{
 for(const [era,...sections] of topics){const details=document.createElement('details'),summary=document.createElement('summary');details.className='topic';summary.textContent=era;details.append(summary);
 for(const [name,text] of sections){const h=document.createElement('h3'),p=document.createElement('p');h.textContent=name;p.textContent=text;details.append(h,p);}el('topics').append(details);}
}).catch(()=>el('topics').textContent='정리를 불러올 수 없어요. 새로고침해 주세요.');
