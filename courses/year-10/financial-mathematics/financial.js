/* Financial Mathematics: local, touch-friendly models. No external services or storage. */
(() => {
  'use strict';
  const {math, typeset, makeSvg, text} = window.MathsLesson;
  const $ = (root, selector) => root.querySelector(selector);
  const $$ = (root, selector) => [...root.querySelectorAll(selector)];
  const money = n => '$' + n.toLocaleString('en-AU', {minimumFractionDigits:2, maximumFractionDigits:2});
  const number = n => n.toLocaleString('en-AU', {maximumFractionDigits:4});
  const read = (input, fallback) => {
    const value = input.value.trim() === '' ? NaN : Number(input.value);
    const result = Number.isFinite(value) ? Math.min(Number(input.max || Infinity), Math.max(Number(input.min || -Infinity), value)) : fallback;
    input.value = String(result);
    return result;
  };
  const placeholder = message => '<div class="fm-prediction">' + message + '</div>';
  const buttonState = (button, visible, noun) => {
    button.textContent = (visible ? 'Hide ' : 'Reveal ') + noun;
    button.setAttribute('aria-expanded', String(visible));
  };
  const signed = value => (value >= 0 ? '+' : '−') + number(Math.abs(value)) + '%';
  function graph(series, options = {}) {
    const W=860, H=340, L=100, R=830, T=26, B=272;
    const xmax=options.xmax || 10, ymax=options.ymax || 100;
    const sx=x=>L+x/xmax*(R-L), sy=y=>B-y/ymax*(B-T);
    let body='';
    for(let i=0;i<=4;i++){
      const v=ymax*i/4, y=sy(v);
      body+='<line x1="'+L+'" y1="'+y+'" x2="'+R+'" y2="'+y+'" stroke="#d7d8ce"/>';
      body+=text(L-12,y+7,number(v/(options.thousands?1000:1)),'text-anchor="end" font-size="20"');
    }
    const xstep=xmax<=12?1:Math.ceil(xmax/8);
    for(let x=0;x<=xmax;x+=xstep)body+=text(sx(x),B+28,x,'text-anchor="middle" font-size="20"');
    body+='<path d="M'+L+' '+T+'V'+B+'H'+R+'" fill="none" stroke="#152e3b" stroke-width="2"/>';
    body+=text((L+R)/2,H-10,options.xlabel||'Time','text-anchor="middle" font-size="23"');
    body+=text(24,(T+B)/2,options.ylabel||'Amount','transform="rotate(-90 24 '+((T+B)/2)+')" text-anchor="middle" font-size="23"');
    if(options.target!==undefined){
      body+='<line x1="'+L+'" x2="'+R+'" y1="'+sy(options.target)+'" y2="'+sy(options.target)+'" stroke="#b55224" stroke-width="2.5" stroke-dasharray="9 6"/>';
      body+=text(R-8,sy(options.target)-10,options.targetLabel||number(options.target),'text-anchor="end" font-size="20" fill="#b55224"');
    }
    for(const seriesItem of series){
      const points=seriesItem.points;
      if(points.length>1)body+='<polyline points="'+points.map(([x,y])=>sx(x)+','+sy(y)).join(' ')+'" fill="none" stroke="'+seriesItem.color+'" stroke-width="3"/>';
      if(seriesItem.markers)for(const [x,y] of points)body+='<circle cx="'+sx(x)+'" cy="'+sy(y)+'" r="4" fill="'+seriesItem.color+'"/>';
    }
    if(options.point)body+='<circle class="fm-selected-point" cx="'+sx(options.point[0])+'" cy="'+sy(options.point[1])+'" r="7" fill="#b55224" stroke="#fff" stroke-width="2"/>';
    return makeSvg(body,options.label||'Model graph',H,W);
  }
  function percentage(m){
    let principal=60, first=5, second=-10, stage=0;
    m.innerHTML='<div class="toolbar fm-inputs"><label>Starting amount $ <input class="fm-principal" type="number" min="1" max="1000000" step="any" value="60"></label><label>First change % <input class="fm-first" type="number" min="-90" max="100" step="any" value="5"></label><label>Second change % <input class="fm-second" type="number" min="-90" max="100" step="any" value="-10"></label></div><div class="fm-percent-rows" aria-live="polite"></div><div class="toolbar"><button class="fm-next primary">Reveal first change</button><button class="fm-reset">Reset</button></div><p class="fm-explain"></p>';
    const draw=()=>{
      const values=[principal,principal*(1+first/100),principal*(1+first/100)*(1+second/100)];
      const max=Math.max(...values)*1.06;
      $(m,'.fm-percent-rows').innerHTML=values.map((value,i)=>'<div class="fm-percent-row"><div>'+['Original','First change: '+signed(first),'Second change: '+signed(second)][i]+'</div><div class="fm-percent-bar">'+(i<=stage?'<span style="width:'+(value/max*100)+'%;background:'+['#3b66a8','#007f78','#b55224'][i]+'"></span>':'')+'</div><strong>'+(i<=stage?money(value):'?')+'</strong></div>').join('');
      $(m,'.fm-next').disabled=stage===2;
      $(m,'.fm-next').textContent=['Reveal first change','Reveal second change','Both changes shown'][stage];
      $(m,'.fm-explain').innerHTML=stage===0?'Predict the amount after the first change.':stage===1?'The second percentage uses <strong>'+money(values[1])+'</strong> as its base.':math(number(principal)+'\\times'+number(1+first/100)+'\\times'+number(1+second/100))+' = <strong>'+money(values[2])+'</strong>';
      m.dataset.stage=String(stage); m.dataset.final=String(values[2]); typeset(m);
    };
    $$(m,'input').forEach(input=>input.onchange=()=>{principal=read($(m,'.fm-principal'),60);first=read($(m,'.fm-first'),5);second=read($(m,'.fm-second'),-10);stage=0;draw();});
    $(m,'.fm-next').onclick=()=>{stage=Math.min(2,stage+1);draw();};
    $(m,'.fm-reset').onclick=()=>{principal=60;first=5;second=-10;stage=0;$(m,'.fm-principal').value='60';$(m,'.fm-first').value='5';$(m,'.fm-second').value='-10';draw();};
    draw();
  }
  function compound(m){
    const initialP=Number(m.dataset.principal), initialRate=Number(m.dataset.rate), max=Number(m.dataset.max);
    let principal=initialP, rate=initialRate, stage=0;
    m.innerHTML='<div class="toolbar fm-inputs"><label>Principal $ <input class="fm-principal" type="number" min="1" max="1000000" step="any" value="'+principal+'"></label><label>Annual rate % <input class="fm-rate" type="number" min="0" max="50" step="any" value="'+rate+'"></label><span class="fm-control-note">Annual compounding</span></div><div class="fm-compound-table" aria-live="polite"></div><div class="toolbar"><button class="fm-next primary">Reveal interest</button><button class="fm-reset">Reset</button></div><p class="fm-explain"></p>';
    const draw=()=>{
      let html='<table><thead><tr><th rowspan="2">Year</th><th colspan="2" class="fm-simple">Simple interest</th><th colspan="3" class="fm-compound">Compound interest</th></tr><tr><th>Interest</th><th>Balance</th><th>Opening balance</th><th>Interest</th><th>Balance</th></tr></thead><tbody>';
      for(let year=1;year<=max;year++){
        const opening=principal*(1+rate/100)**(year-1), interest=opening*rate/100;
        const interestVisible=stage>=2*year-1, balanceVisible=stage>=2*year;
        html+='<tr><th>'+year+'</th><td class="fm-simple">'+(interestVisible?money(principal*rate/100):'?')+'</td><td class="fm-simple">'+(balanceVisible?money(principal*(1+year*rate/100)):'?')+'</td><td>'+(stage>=2*(year-1)?money(opening):'?')+'</td><td class="fm-compound">'+(interestVisible?money(interest):'?')+'</td><td class="fm-compound">'+(balanceVisible?money(opening+interest):'?')+'</td></tr>';
      }
      $(m,'.fm-compound-table').innerHTML=html+'</tbody></table>';
      const nextYear=Math.min(max,Math.floor(stage/2)+1);
      $(m,'.fm-next').textContent=stage===2*max?'All periods shown':stage%2?'Reveal year '+nextYear+' balances':'Reveal year '+nextYear+' interest';
      $(m,'.fm-next').disabled=stage===2*max;
      $(m,'.fm-explain').textContent=stage===2*max?'Simple interest uses the original principal. Compound interest uses the current balance.':stage%2?'Add each interest payment to the current balance.':'Predict the interest in year '+nextYear+' before revealing.';
      m.dataset.stage=String(stage);m.dataset.compoundFinal=String(principal*(1+rate/100)**max);typeset(m);
    };
    $$(m,'input').forEach(input=>input.onchange=()=>{principal=read($(m,'.fm-principal'),initialP);rate=read($(m,'.fm-rate'),initialRate);stage=0;draw();});
    $(m,'.fm-next').onclick=()=>{stage=Math.min(max*2,stage+1);draw();};
    $(m,'.fm-reset').onclick=()=>{principal=initialP;rate=initialRate;stage=0;$(m,'.fm-principal').value=principal;$(m,'.fm-rate').value=rate;draw();};
    draw();
  }
  function frequency(m){
    const periods=[1,2,12,365], labels=['Annual','Semi-annual','Monthly','Daily'];
    let current=1;
    const revealed=new Set();
    m.innerHTML='<p class="fm-control-note">$8000 · 5% p.a. · 4 years</p><div class="toolbar"><label>Compounding <select class="fm-frequency">'+periods.map((k,i)=>'<option value="'+k+'">'+labels[i]+'</option>').join('')+'</select></label><button class="fm-reveal primary">Reveal this balance</button><button class="fm-reset">Reset</button></div><div class="fm-frequency-table" aria-live="polite"></div><p class="fm-small">Daily compounding assumes 365 periods per year.</p>';
    const draw=()=>{
      $(m,'.fm-frequency-table').innerHTML='<table><thead><tr><th>Compounding</th><th>Percentage rate per period</th><th>Number of periods</th><th>Final balance</th></tr></thead><tbody>'+periods.map((k,i)=>'<tr'+(k===current?' class="fm-current"':'')+'><td>'+labels[i]+'</td><td>'+math(k===1?'5':'\\frac{5}{'+k+'}')+'</td><td>'+4*k+'</td><td>'+(revealed.has(k)?money(8000*(1+.05/k)**(4*k)):'?')+'</td></tr>').join('')+'</tbody></table>';
      $(m,'.fm-reveal').disabled=revealed.has(current);
      $(m,'.fm-frequency').value=String(current);
      m.dataset.revealed=String(revealed.size);typeset(m);
    };
    $(m,'.fm-frequency').onchange=e=>{current=Number(e.target.value);draw();};
    $(m,'.fm-reveal').onclick=()=>{revealed.add(current);draw();};
    $(m,'.fm-reset').onclick=()=>{current=1;revealed.clear();draw();};
    draw();
  }
  function investment(m){
    let year=11, visible=false;
    m.innerHTML='<div class="toolbar"><label>Whole-year checkpoint <select class="fm-year">'+Array.from({length:12},(_,n)=>'<option value="'+n+'"'+(n===11?' selected':'')+'>'+n+'</option>').join('')+'</select></label><button class="fm-reveal primary" aria-expanded="false">Reveal graph</button><button class="fm-reset">Reset</button></div><div class="fm-investment-plot"></div><div class="fm-readout" aria-live="polite"></div><p class="fm-small"><span class="fm-simple">Blue: simple interest</span> · <span class="fm-compound">Teal: monthly compound interest</span><br>Both graphs show total amounts. Points mark whole-year checkpoints.</p>';
    const draw=()=>{
      const simple=16000*(1+.12*year), compound=16000*1.01**(12*year);
      $(m,'.fm-investment-plot').innerHTML=visible?graph([
        {color:'#3b66a8',markers:true,points:Array.from({length:12},(_,n)=>[n,16000*(1+.12*n)])},
        {color:'#007f78',markers:true,points:Array.from({length:12},(_,n)=>[n,16000*1.01**(12*n)])}
      ],{xmax:11,ymax:60000,thousands:true,xlabel:'Time (years)',ylabel:'Total amount ($000)',point:[year,compound],label:'Simple and monthly compound balances for Example 4.3. Lines join whole-year checkpoints.'}):placeholder('Predict the shapes of the simple and compound graphs.');
      $(m,'.fm-readout').innerHTML=visible?'Year '+year+': simple <strong>'+money(simple)+'</strong>; compound <strong>'+money(compound)+'</strong>; difference <strong>'+money(compound-simple)+'</strong>.':'';
      buttonState($(m,'.fm-reveal'),visible,'graph');
      m.dataset.year=String(year);m.dataset.visible=String(visible);m.dataset.difference=String(compound-simple);
    };
    $(m,'.fm-year').onchange=e=>{year=Number(e.target.value);visible=false;draw();};
    $(m,'.fm-reveal').onclick=()=>{visible=!visible;draw();};
    $(m,'.fm-reset').onclick=()=>{year=11;visible=false;$(m,'.fm-year').value='11';draw();};
    draw();
  }
  function depreciation(m){
    let principal=38000, rate=14, stage=0;
    m.innerHTML='<div class="toolbar fm-inputs"><label>Initial value $ <input class="fm-principal" type="number" min="1" max="1000000" step="any" value="38000"></label><label>Annual loss % <input class="fm-rate" type="number" min="0" max="99" step="any" value="14"></label><button class="fm-next primary">Reveal year 1</button><button class="fm-reset">Reset</button></div><div class="fm-depreciation-table" aria-live="polite"></div><p class="fm-small">Predict the next dollar loss before revealing it.</p>';
    const draw=()=>{
      let html='<table><thead><tr><th>Year</th><th>Opening value</th><th>Dollar loss</th><th>Remaining value</th></tr></thead><tbody>';
      for(let n=1;n<=5;n++){
        const opening=principal*(1-rate/100)**(n-1), loss=opening*rate/100, value=opening-loss;
        html+='<tr><th>'+n+'</th><td>'+(n<=stage+1?money(opening):'?')+'</td><td>'+(n<=stage?money(loss):'?')+'</td><td>'+(n<=stage?'<div class="fm-value-bar"><span style="width:'+(value/principal*100)+'%"></span><strong>'+money(value)+'</strong></div>':'?')+'</td></tr>';
      }
      $(m,'.fm-depreciation-table').innerHTML=html+'</tbody></table>';
      $(m,'.fm-next').disabled=stage===5;
      $(m,'.fm-next').textContent=stage===5?'All years shown':'Reveal year '+(stage+1);
      m.dataset.stage=String(stage);m.dataset.final=String(principal*(1-rate/100)**5);
    };
    $$(m,'input').forEach(input=>input.onchange=()=>{principal=read($(m,'.fm-principal'),38000);rate=read($(m,'.fm-rate'),14);stage=0;draw();});
    $(m,'.fm-next').onclick=()=>{stage=Math.min(5,stage+1);draw();};
    $(m,'.fm-reset').onclick=()=>{principal=38000;rate=14;stage=0;$(m,'.fm-principal').value='38000';$(m,'.fm-rate').value='14';draw();};
    draw();
  }
  function target(m){
    let history=[], visible=false;
    m.innerHTML='<p class="fm-model">'+math('V=300000(0.85)^t')+' &nbsp; Target: <strong>$180,000</strong></p><div class="toolbar"><label>Estimate (years) <input class="fm-estimate" type="number" min="0" max="20" step="any" value="3"></label><button class="fm-test primary">Test estimate</button><button class="fm-reveal" aria-expanded="false">Reveal graph</button><button class="fm-reset">Reset</button></div><div class="fm-target-layout"><div class="fm-trials" aria-live="polite"></div><div class="fm-target-plot"></div></div><p class="fm-small">Whole-year valuations are discrete. The smooth curve interpolates between them.<br>Latest six trials are shown.</p>';
    const draw=()=>{
      $(m,'.fm-trials').innerHTML='<table><thead><tr><th>Years</th><th>Value</th><th>Target</th></tr></thead><tbody>'+history.map(row=>'<tr><td>'+number(row.t)+'</td><td>'+money(row.value)+'</td><td>'+(Math.abs(row.value-180000)<.005?'At target':row.value>180000?'Above':'Below')+'</td></tr>').join('')+'</tbody></table>';
      const xmax=Math.max(8,...history.map(row=>Math.ceil(row.t))), last=history.at(-1);
      $(m,'.fm-target-plot').innerHTML=visible?graph([{color:'#007f78',points:Array.from({length:161},(_,i)=>[xmax*i/160,300000*.85**(xmax*i/160)])}],{xmax,ymax:300000,thousands:true,xlabel:'Time (years)',ylabel:'Value ($000)',target:180000,targetLabel:'$180,000',point:last?[last.t,last.value]:null,label:'Interpolated portfolio value with a target line at $180,000.'}):placeholder('Test estimates before revealing the graph.');
      buttonState($(m,'.fm-reveal'),visible,'graph');
      m.dataset.trials=String(history.length);m.dataset.visible=String(visible);if(last)m.dataset.lastValue=String(last.value);else delete m.dataset.lastValue;
    };
    $(m,'.fm-test').onclick=()=>{const t=read($(m,'.fm-estimate'),3);history.push({t,value:300000*.85**t});history=history.slice(-6);draw();};
    $(m,'.fm-reveal').onclick=()=>{visible=!visible;draw();};
    $(m,'.fm-reset').onclick=()=>{history=[];visible=false;$(m,'.fm-estimate').value='3';draw();};
    draw();
  }
  function tank(m){
    let hours=0, rate=6, visible=false;
    m.innerHTML='<div class="toolbar fm-tank-controls"><label>Hours <input class="fm-hours" type="range" min="0" max="24" step="1" value="0"><output class="fm-hour-output">0</output></label><label>Hourly loss % <input class="fm-rate" type="number" min="1" max="50" step="any" value="6"></label><button class="fm-two">2 hours</button><button class="fm-five">5 hours</button><button class="fm-reveal primary" aria-expanded="false">Reveal model</button><button class="fm-reset">Reset</button></div><div class="fm-tank-layout"><div class="fm-tank-picture"></div><div class="fm-tank-plot"></div></div><div class="fm-readout" aria-live="polite"></div>';
    const draw=()=>{
      const volume=15000*(1-rate/100)**hours, height=240*volume/15000;
      $(m,'.fm-hours').value=String(hours);$(m,'.fm-hour-output').textContent=String(hours);
      $(m,'.fm-tank-picture').innerHTML=visible?'<svg viewBox="0 0 230 340" role="img" aria-label="Tank containing '+number(volume)+' litres out of 15000 litres" xmlns="http://www.w3.org/2000/svg"><text x="115" y="28" text-anchor="middle" font-family="Arial" font-size="22" fill="#152e3b">15 000 L</text><rect x="36" y="'+(290-height)+'" width="158" height="'+height+'" fill="#3b66a8" fill-opacity=".75"/><path d="M36 50V290H194V50" fill="none" stroke="#152e3b" stroke-width="4"/><path d="M30 50H200" fill="none" stroke="#607078" stroke-dasharray="6 5"/><text x="115" y="325" text-anchor="middle" font-family="Arial" font-size="22" fill="#152e3b">0 L</text></svg>':placeholder('Predict the water level.');
      $(m,'.fm-tank-plot').innerHTML=visible?graph([{color:'#3b66a8',points:Array.from({length:193},(_,i)=>[i/8,15000*(1-rate/100)**(i/8)])}],{xmax:24,ymax:16000,xlabel:'Time (hours)',ylabel:'Volume (litres)',point:[hours,volume],label:'Exponential water volume model at '+rate+' percent loss per hour, beginning at 15000 litres.'}):placeholder('Predict the graph and the volume.');
      $(m,'.fm-readout').innerHTML=visible?math('V('+hours+')=15000('+number(1-rate/100)+')^{'+hours+'}')+' ≈ <strong>'+volume.toLocaleString('en-AU',{minimumFractionDigits:2,maximumFractionDigits:2})+' L</strong>':'Initial volume: 15 000 L. Which quantity stays constant as time passes?';
      buttonState($(m,'.fm-reveal'),visible,'model');
      m.dataset.hours=String(hours);m.dataset.volume=String(volume);m.dataset.visible=String(visible);typeset(m);
    };
    $(m,'.fm-hours').oninput=e=>{hours=Number(e.target.value);visible=false;draw();};
    $(m,'.fm-rate').onchange=()=>{rate=read($(m,'.fm-rate'),6);visible=false;draw();};
    $(m,'.fm-two').onclick=()=>{hours=2;visible=false;draw();};
    $(m,'.fm-five').onclick=()=>{hours=5;visible=false;draw();};
    $(m,'.fm-reveal').onclick=()=>{visible=!visible;draw();};
    $(m,'.fm-reset').onclick=()=>{hours=0;rate=6;visible=false;$(m,'.fm-rate').value='6';draw();};
    draw();
  }
  function init(){
    const modules={percentage,compound,frequency,investment,depreciation,target,tank};
    $$(document,'[data-finance]').forEach(m=>{
      if(m.dataset.financeReady)return;
      m.dataset.financeReady='true';
      m.addEventListener('keydown',e=>{if(e.target.closest('button,input,select'))e.stopPropagation();});
      modules[m.dataset.finance]?.(m);
    });
    typeset(document);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
