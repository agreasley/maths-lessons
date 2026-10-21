/* Lesson 7: exact cake shares and discrete geometric terms/partial sums. */
(() => {
  'use strict';
  const blue='#3b66a8', orange='#b55224', teal='#007f78', ink='#152e3b', rule='#d7d8ce';
  function init() {
    if (!window.MathsLesson) return;
    const {math,typeset}=window.MathsLesson;
    const frac=(n,d)=>n===0?'0':d===1?String(n):`\\frac{${n}}{${d}}`;
    function chart(values,{min=0,max=1,limit=null,color=blue,label='Sequence values',ticks=null}={}) {
      const w=560,h=275,left=66,right=20,top=25,bottom=44;
      const x=n=>left+(n-1)*(w-left-right)/(values.length-1), y=v=>h-bottom-(v-min)*(h-top-bottom)/(max-min);
      const ts=ticks||[min,(min+max)/2,max];
      let body=ts.map(v=>`<path d="M${left} ${y(v)}H${w-right}" stroke="${rule}"/><text x="${left-10}" y="${y(v)+6}" text-anchor="end">${Number(v.toFixed(2))}</text>`).join('');
      body+=`<path d="M${left} ${top}V${h-bottom}H${w-right}" fill="none" stroke="${ink}"/>`;
      if(limit!==null)body+=`<path d="M${left} ${y(limit)}H${w-right}" stroke="${teal}" stroke-width="2" stroke-dasharray="7 6"/>`;
      body+=values.map((v,i)=>`<circle cx="${x(i+1)}" cy="${y(v)}" r="5" fill="${color}"><title>n = ${i+1}, value = ${Number(v.toFixed(6))}</title></circle>`).join('');
      const indices=values.length===6?[1,2,3,4,5,6]:[1,3,6,9,12];
      body+=indices.map(n=>`<text x="${x(n)}" y="${h-bottom+26}" text-anchor="middle">${n}</text>`).join('');
      return `<svg class="lim-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg"><g fill="${ink}" font-family="Arial,sans-serif" font-size="19">${body}</g></svg><div class="lim-axis-label">${math('n')}</div>`;
    }
    document.querySelectorAll('[data-module="cake-sharing"]').forEach(m=>{
      if(m.dataset.ready)return;m.dataset.ready='true';
      let n=0;
      m.innerHTML='<div class="toolbar"><button class="lim-share primary">Share again</button><button class="lim-reset">Reset</button><span class="lim-round" aria-live="polite"></span></div><div class="lim-cake-legend"><span class="lim-student-one">Student 1</span><span class="lim-teacher">Mr Greasley</span><span class="lim-student-two">Student 2</span></div><div class="lim-cake-picture"></div><div class="lim-cake-sums" aria-live="polite"></div>';
      const $=s=>m.querySelector(s);
      function draw(){
        const denominator=3**n,totalNumerator=(denominator-1)/2;
        let blocks=`<rect x="40" y="8" width="1080" height="90" fill="${teal}"/>`;
        for(let k=1;k<=n;k++){
          const previous=1080/3**(k-1),start=40+(1080-previous)/2,piece=previous/3;
          blocks+=`<g class="${k===n?'lim-new-piece':''}"><rect x="${start}" y="8" width="${piece}" height="90" fill="${blue}"/><rect x="${start+2*piece}" y="8" width="${piece}" height="90" fill="${orange}"/></g>`;
          if(k<=4)blocks+=`<path d="M${start+piece} 8v90M${start+2*piece} 8v90" stroke="#f7f5ef" stroke-width="1"/>`;
        }
        blocks+='<rect x="40" y="8" width="1080" height="90" fill="none" stroke="#152e3b" stroke-width="2"/>';
        $('.lim-cake-picture').innerHTML=`<svg viewBox="0 0 1160 108" role="img" aria-label="Round ${n}. One whole cake at a fixed scale. Blue and orange show the students’ shares. Teal shows the teacher’s remaining piece." xmlns="http://www.w3.org/2000/svg">${blocks}</svg>`;
        const pieces=Array.from({length:n},(_,i)=>frac(1,3**(i+1)));
        const total=frac(totalNumerator,denominator);
        const studentSum=n>1?`${pieces.join('+')}=${total}`:total;
        $('.lim-cake-sums').innerHTML=`<div class="lim-cake-sum-row lim-student-one"><strong>Student 1 total</strong><div class="lim-cake-equation">${math('\\displaystyle '+studentSum)}</div></div><div class="lim-cake-sum-row lim-student-two"><strong>Student 2 total</strong><div class="lim-cake-equation">${math('\\displaystyle '+studentSum)}</div></div><div class="lim-cake-sum-row lim-teacher"><strong>Mr Greasley has</strong><div class="lim-cake-equation">${math('\\displaystyle '+frac(1,denominator))}</div></div>`;
        $('.lim-round').textContent=`Round ${n} of 6`;
        $('.lim-share').disabled=n===6;
        m.dataset.round=String(n);m.dataset.denominator=String(denominator);m.dataset.studentNumerator=String(totalNumerator);
        typeset(m);
      }
      $('.lim-share').addEventListener('click',()=>{n=Math.min(6,n+1);draw();});
      $('.lim-reset').addEventListener('click',()=>{n=0;draw();});
      draw();
    });
    document.querySelectorAll('[data-module="cake-limits"]').forEach(m=>{
      if(m.dataset.ready)return;m.dataset.ready='true';
      const terms=Array.from({length:6},(_,i)=>3**(-i-1)),sums=terms.map((_,i)=>(1-3**(-i-1))/2);
      m.innerHTML=`<div><h3>New piece ${math('a_n')}</h3>${chart(terms,{max:.5,limit:0,ticks:[0,.25,.5],label:'New pieces decrease towards zero'})}</div><div><h3>Each student’s total ${math('S_n')}</h3>${chart(sums,{max:.5,limit:.5,ticks:[0,.25,.5],color:orange,label:'Accumulated shares increase towards one half'})}</div>`;
      typeset(m);
    });
    document.querySelectorAll('[data-module="limiting-ratios"]').forEach(m=>{
      if(m.dataset.ready)return;m.dataset.ready='true';
      const cases=[
        {r:.5,tex:'\\frac12',min:0,max:2,ticks:[0,1,2],limit:2,explain:()=>`The terms approach ${math('0')}. The partial sums approach ${math('2')}.`},
        {r:-.5,tex:'-\\frac12',min:-1,max:1.5,ticks:[-1,0,1],limit:2/3,explain:()=>`The terms alternate and approach ${math('0')}. The partial sums oscillate towards ${math('\\frac23')}.`},
        {r:1,tex:'1',min:0,max:12,ticks:[0,6,12],limit:null,explain:()=>`The terms stay at ${math('1')}. The partial sums increase without bound.`},
        {r:-1,tex:'-1',min:-1,max:1.5,ticks:[-1,0,1],limit:null,explain:()=>`The partial sums alternate between ${math('1')} and ${math('0')}. There is no single limit.`},
        {r:1.5,tex:'\\frac32',min:0,max:260,ticks:[0,130,260],limit:null,explain:()=>`The terms and partial sums increase without bound. There is no limiting sum.`},
        {r:-1.5,tex:'-\\frac32',min:-100,max:100,ticks:[-100,0,100],limit:null,explain:()=>`The terms alternate and grow in magnitude. The partial sums have no finite limit.`}
      ];
      let index=0,visible=false;
      m.innerHTML=`<div class="toolbar lim-ratio-buttons"><span>${math('r=')}</span>${cases.map((c,i)=>`<button data-ratio-index="${i}" aria-pressed="${i===0}">${math(c.tex)}</button>`).join('')}<button class="lim-ratio-reset">Reset</button></div><div class="lim-paired-plots"></div><div class="lim-behaviour-row"><button class="lim-behaviour primary" aria-expanded="false">Reveal behaviour</button><div class="lim-behaviour-text" aria-live="polite"></div></div>`;
      const $=s=>m.querySelector(s);
      function draw(){
        const c=cases[index],terms=Array.from({length:12},(_,i)=>c.r**i);let total=0;
        const sums=terms.map(v=>total+=v),opts={min:c.min,max:c.max,ticks:c.ticks};
        $('.lim-paired-plots').innerHTML=`<div><h3>Terms ${math('a_n')}</h3>${chart(terms,{...opts,color:blue,limit:visible&&Math.abs(c.r)<1?0:null,label:`First twelve terms for ratio ${c.r}`})}</div><div><h3>Partial sums ${math('S_n')}</h3>${chart(sums,{...opts,color:orange,limit:visible?c.limit:null,label:`First twelve partial sums for ratio ${c.r}`})}</div>`;
        m.querySelectorAll('[data-ratio-index]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.ratioIndex)===index)));
        $('.lim-behaviour-text').innerHTML=visible?c.explain():'What do you predict as more terms are included?';
        $('.lim-behaviour').textContent=visible?'Hide behaviour':'Reveal behaviour';
        $('.lim-behaviour').setAttribute('aria-expanded',String(visible));
        m.dataset.ratio=String(c.r);m.dataset.behaviourVisible=String(visible);typeset(m);
      }
      m.querySelectorAll('[data-ratio-index]').forEach(b=>b.addEventListener('click',()=>{index=Number(b.dataset.ratioIndex);visible=false;draw();}));
      $('.lim-behaviour').addEventListener('click',()=>{visible=!visible;draw();});
      $('.lim-ratio-reset').addEventListener('click',()=>{index=0;visible=false;draw();});draw();
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
