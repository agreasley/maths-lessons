/* Teacher-controlled logarithmic-scale diagrams for Further Graph Transformations 3. */
(() => {
  'use strict';
  const C={ink:'#213b3a',muted:'#647572',grid:'#d7d8ce',paper:'#f7f5ef',linear:'#3b66a8',log:'#007f78',point:'#b55224'};
  const math=tex=>window.MathsLesson.math(tex),typeset=root=>window.MathsLesson.typeset(root);
  const colour=(tex,c)=>`\\textcolor{${c}}{${tex}}`;
  const line=(x1,y1,x2,y2,c=C.grid,w=2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}"/>`;
  const text=(x,y,s,anchor='middle',c=C.ink,size=23)=>`<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${c}" font-size="${size}">${s}</text>`;
  const mtext=(x,y,tex,w=150,h=42)=>`<foreignObject x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" class="log-svg-math">${math(tex)}</div></foreignObject>`;
  const dot=(x,y,c=C.point,r=7)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="${C.paper}" stroke-width="2"/>`;
  const svg=(body,w,h,label,cls='')=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" class="log-plot ${cls}" role="img" aria-label="${label}"><title>${label}</title>${body}</svg>`;
  const controls=(next,previous)=>`<div class="log-controls"><button class="log-next primary">${next}</button><button class="log-previous" disabled>${previous}</button><button class="log-reset">Reset</button></div>`;
  const formatted=value=>Number(value.toPrecision(4)).toLocaleString('en-AU',{maximumFractionDigits:3});
  const bracket=(a,b,y,label,c)=>line(a,y+7,a,y,c)+line(a,y,b,y,c)+line(b,y,b,y+7,c)+mtext((a+b)/2,y-19,colour(label,c),160,34);
  function scales(m){
    let exponent=2;
    m.innerHTML=`<div class="log-picture"></div><div class="log-slider"><label>Move the value</label><input type="range" min="0" max="4" step="0.01" value="2" aria-label="Base-10 exponent of the shared value"><output></output></div><div class="log-controls"><button class="scale-down">÷10</button><button class="scale-up">×10</button><button class="log-reset">Reset</button><span class="log-state" aria-live="polite"></span></div>`;
    const slider=m.querySelector('input');
    function draw(){
      const value=10**exponent,left=105,width=990,linear=v=>left+width*v/10000,log=v=>left+width*Math.log10(v)/4;
      let s=text(left,28,'Linear scale','start',C.linear,25)+line(left,110,left+width,110,C.linear,2.5);
      [0,2500,5000,7500,10000].forEach((v,i,a)=>{s+=line(linear(v),101,linear(v),119,C.linear)+text(linear(v),147,v.toLocaleString('en-AU'));if(i<4)s+=bracket(linear(v),linear(a[i+1]),76,'+2500',C.linear);});
      s+=text(left,208,'Base-10 logarithmic scale','start',C.log,25)+line(left,290,left+width,290,C.log,2.5);
      [1,10,100,1000,10000].forEach((v,i,a)=>{s+=line(log(v),281,log(v),299,C.log)+text(log(v),327,v.toLocaleString('en-AU'));if(i<4)s+=bracket(log(v),log(a[i+1]),256,'\\times10',C.log);});
      s+=`<g class="scale-marker linear-marker" data-value="${value}">${line(linear(value),90,linear(value),130,C.point,3)}${dot(linear(value),110)}</g>`;
      s+=`<g class="scale-marker logarithmic-marker" data-value="${value}">${line(log(value),270,log(value),310,C.point,3)}${dot(log(value),290)}</g>`;
      m.querySelector('.log-picture').innerHTML=svg(s,1180,350,`The same value, ${formatted(value)}, shown on a linear axis and a base-10 logarithmic axis.`,'log-scale-pair');
      const p=Number(exponent.toFixed(2));
      m.querySelector('output').innerHTML=math(`10^{${p}}${Number.isInteger(p)?'=':'\\approx'}${formatted(value).replaceAll(',','\\,')}`);
      m.querySelector('.scale-down').disabled=exponent<1;
      m.querySelector('.scale-up').disabled=exponent>3;
      m.querySelector('.log-state').textContent='One full log interval represents a factor of 10.';
      slider.value=String(exponent);typeset(m);
    }
    m.querySelector('.scale-down').addEventListener('click',()=>{if(exponent>=1){exponent=Math.max(0,exponent-1);draw();}});
    m.querySelector('.scale-up').addEventListener('click',()=>{if(exponent<=3){exponent=Math.min(4,exponent+1);draw();}});
    m.querySelector('.log-reset').addEventListener('click',()=>{exponent=2;draw();});
    slider.addEventListener('input',()=>{exponent=Number(slider.value);draw();});slider.addEventListener('keydown',e=>e.stopPropagation());draw();
  }
  function positions(m){
    const values=[2,5,20,50];let stage=0;
    m.innerHTML=`<div class="log-picture"></div>${controls('Show 2','Previous point')}<div class="log-result" aria-live="polite"></div>`;
    function draw(){
      const pos=v=>95+990*Math.log10(v)/2;
      let s=bracket(pos(1),pos(10),50,'\\times10',C.log)+bracket(pos(10),pos(100),50,'\\times10',C.log)+line(pos(1),150,pos(100),150,C.log,2.5);
      [1,10,100].forEach(v=>{s+=line(pos(v),139,pos(v),161,C.log)+text(pos(v),194,v);});
      values.slice(0,stage).forEach((v,i)=>{const c=i%2?C.linear:C.point;s+=`<g class="log-position" data-value="${v}">${line(pos(v),112,pos(v),150,c,2)}${dot(pos(v),150,c)}${mtext(pos(v),94,colour(String(v),c),90,35)}</g>`;});
      m.querySelector('.log-picture').innerHTML=svg(s,1180,225,'Base-10 logarithmic axis from 1 to 100. Values 2, 5, 20 and 50 are revealed in order.','log-position-plot');
      const v=values[stage-1];
      m.querySelector('.log-result').innerHTML=stage?`${math(`\\log_{10}${v}\\approx${Math.log10(v).toFixed(3)}`)}<span>${stage<3?'Estimate its position within the first interval.':'Multiplying by 10 adds 1 to the logarithm.'}</span>`:'Estimate the four positions before revealing them.';
      const next=m.querySelector('.log-next');next.textContent=stage===4?'All points shown':'Show '+values[stage];next.disabled=stage===4;m.querySelector('.log-previous').disabled=stage===0;typeset(m);
    }
    m.querySelector('.log-next').addEventListener('click',()=>{stage=Math.min(4,stage+1);draw();});m.querySelector('.log-previous').addEventListener('click',()=>{stage=Math.max(0,stage-1);draw();});m.querySelector('.log-reset').addEventListener('click',()=>{stage=0;draw();});draw();
  }
  function midpoint(m){
    let shown=false;
    m.innerHTML=`<div class="log-picture"></div><div class="log-controls"><button class="midpoint-reveal primary">Show midpoints</button><button class="log-reset">Reset</button></div>`;
    function draw(){
      const left=65,right=605,centre=(left+right)/2;
      let s='';
      [['Logarithmic',C.log,72,'10\\sqrt{10}'],['Linear',C.linear,202,'55']].forEach(([label,c,y,value],i)=>{
        s+=text(left,y-40,label,'start',c,24)+line(left,y,right,y,c,2.5);
        [left,right].forEach((x,j)=>{s+=line(x,y-8,x,y+8,c)+text(x,y+31,j?100:10);});
        s+=line(centre,y-10,centre,y+10,c,2)+dot(centre,y,c,6)+mtext(centre,y+37,shown?colour(value,c):'?',180,45);
        if(shown)s+=`<g class="midpoint-value" data-scale="${i?'linear':'logarithmic'}" data-value="${i?55:Math.sqrt(1000)}"></g>`;
      });
      m.querySelector('.log-picture').innerHTML=svg(s,670,268,shown?'Halfway from 10 to 100 is 10 square root 10 on the logarithmic scale and 55 on the linear scale.':'Compare the midpoint between 10 and 100 on logarithmic and linear scales.','log-midpoint-plot');
      m.querySelector('.midpoint-reveal').disabled=shown;typeset(m);
    }
    m.querySelector('.midpoint-reveal').addEventListener('click',()=>{shown=true;draw();});m.querySelector('.log-reset').addEventListener('click',()=>{shown=false;draw();});draw();
  }
  function comparison(m){
    let stage=0;
    const rows=[
      ['Decibels (Sound)','\\text{Intensity }(I)','L=10\\log_{10}\\!\\left(\\frac I{I_0}\\right)','\\times10^{1/10}\\approx\\times1.259'],
      ['Seismic (Richter)','\\text{Amplitude }(A)','M=\\log_{10}\\!\\left(\\frac A{A_0}\\right)','\\times10'],
      ['Astronomy','\\text{Brightness }(B)','m_1-m_2=-2.5\\log_{10}\\!\\left(\\frac{B_1}{B_2}\\right)','\\times10^{-0.4}\\approx\\times0.398'],
      ['Acidity (pH)','[\\mathrm H^+]\\text{ concentration}','\\mathrm{pH}=-\\log_{10}([\\mathrm H^+])','\\times10^{-1}=\\times0.1']
    ];
    m.innerHTML=`<table class="log-comparison"><thead><tr><th>Context</th><th>Underlying quantity</th><th>Logarithmic model</th><th>Change for a +1 unit<br>scale increase</th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td>${r[0]}</td><td>${math(r[1])}</td><td>${math(r[2])}</td><td class="log-factor" data-row="${i}"></td></tr>`).join('')}</tbody></table>${controls('Reveal decibels','Previous row')}<p class="log-note">For the pH shorthand, ${math('[\\mathrm H^+]')} is the numerical concentration in mol/L.</p>`;
    const labels=['decibels','seismic amplitude','stellar brightness','pH'];
    function draw(){
      m.querySelectorAll('.log-factor').forEach((cell,i)=>{cell.innerHTML=i<stage?math(rows[i][3]):'<span class="log-blank">?</span>';cell.classList.toggle('is-revealed',i<stage);});
      const next=m.querySelector('.log-next');next.textContent=stage===4?'All factors shown':'Reveal '+labels[stage];next.disabled=stage===4;m.querySelector('.log-previous').disabled=stage===0;typeset(m);
    }
    m.querySelector('.log-next').addEventListener('click',()=>{stage=Math.min(4,stage+1);draw();});m.querySelector('.log-previous').addEventListener('click',()=>{stage=Math.max(0,stage-1);draw();});m.querySelector('.log-reset').addEventListener('click',()=>{stage=0;draw();});draw();
  }
  function reason(m){
    let stage=0;
    const d=colour('S_2-S_1',C.linear),ratio=colour('\\dfrac{Q_2}{Q_1}',C.point);
    const steps=[
      ['Subtract the readings',`${d}=c\\left[\\log_{10}\\!\\left(\\frac{Q_2}{Q_0}\\right)-\\log_{10}\\!\\left(\\frac{Q_1}{Q_0}\\right)\\right]`],
      ['Use the quotient law',`${d}=c\\log_{10}\\!\\left(${ratio}\\right)`],
      ['Convert to exponential form',`${ratio}=10^{\\frac{${d}}{c}}`]
    ];
    m.innerHTML=`<div class="log-general-model">${math('S=c\\log_{10}\\!\\left(\\frac Q{Q_0}\\right)')}<span>${math('Q,Q_0>0,\\quad c\\ne0')} &nbsp; (fixed reference and coefficient)</span></div><div class="log-proof">${steps.map(([label,tex],i)=>`<div class="log-proof-row" data-step="${i+1}"><span>${i+1}. ${label}</span><div class="log-proof-equation">${math(tex)}</div></div>`).join('')}</div>${controls('Subtract the readings','Previous step')}<div class="log-result log-conclusion" aria-live="polite"></div>`;
    function draw(){
      m.querySelectorAll('.log-proof-row').forEach((row,i)=>{const visible=i<stage;row.classList.toggle('is-shown',visible);row.setAttribute('aria-hidden',String(!visible));});
      const next=m.querySelector('.log-next');next.textContent=stage===3?'Explanation complete':steps[stage][0];next.disabled=stage===3;m.querySelector('.log-previous').disabled=stage===0;
      m.querySelector('.log-conclusion').innerHTML=stage===3?'For a fixed model, the same difference in readings gives the same multiplier.':'Compare two readings from the same logarithmic model.';typeset(m);
    }
    m.querySelector('.log-next').addEventListener('click',()=>{stage=Math.min(3,stage+1);draw();});m.querySelector('.log-previous').addEventListener('click',()=>{stage=Math.max(0,stage-1);draw();});m.querySelector('.log-reset').addEventListener('click',()=>{stage=0;draw();});draw();
  }
  function init(){
    if(!document.querySelector('[data-log]'))return;
    if(!window.MathsLesson){setTimeout(init,30);return;}
    document.querySelectorAll('[data-log]').forEach(m=>{if(m.dataset.logReady)return;m.dataset.logReady='true';({scales,positions,midpoint,comparison,reason}[m.dataset.log])?.(m);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
