/* Shared classroom interactions. No network calls, accounts or student data storage. */
(() => {
  'use strict';
  const $ = (root, selector) => root.querySelector(selector);
  const $$ = (root, selector) => [...root.querySelectorAll(selector)];
  const sum = a => a.reduce((x, y) => x + y, 0);
  const fmt = n => Number(n.toFixed(4)).toString();
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text = (x, y, value, extras = '') => `<text x="${x}" y="${y}" ${extras}>${esc(value)}</text>`;
  const datasets = {
    pets: {values:[0,1,2,3,4], f:[15,20,10,4,1], label:'Number of pets'},
    siblings: {values:[0,1,2,3,4,5], f:[3,6,8,5,2,1], label:'Number of siblings'},
    scores: {values:[5,6,7,8,9,10], f:[3,1,1,2,5,4], label:'Test score'},
    sheets: {values:[1,2,3,4,5], f:[4,8,12,6,2], label:'Score'},
    lions: {values:[1,2,3,4,5,6], f:[10,0,4,0,3,8], label:'Visible lions'},
    quiz: {values:[1,2,3,4,5,6,7,8,9,10], f:[2,4,2,1,6,8,7,6,2,2], label:'Quiz score'},
    median: {values:[1,2,3], f:[1,3,4], label:'Value'},
    haemoglobin: {values:[9.5,10.5,11.5,12.5,13.5,14.5,15.5,16.5], f:[1,2,5,2,7,5,2,1], label:'Haemoglobin level', grouped:true},
    dice: {values:[1,2,3,4,5,6], f:[7,5,6,7,8,17], label:'Die outcome'},
    histX: {values:[3,4,5,6,7,8,9], f:[4,4,3,2,3,4,5], label:'Score'},
    histY: {values:[5,6,7,8,9,10,11], f:[2,3,4,5,4,3,2], label:'Score'}
  };
  const cumulative = f => { let n = 0; return f.map(v => n += v); };
  const binData = (d, width = 1) => {
    const bins = [];
    for (let i = 0; i < d.values.length; i += width) {
      const values = d.values.slice(i, i + width);
      const left = values[0] - .5, right = values.at(-1) + .5;
      bins.push({left, right, centre:(left + right) / 2, f:sum(d.f.slice(i, i + width))});
    }
    return bins;
  };
  const makeSvg = (body, label, height = 390) => `<svg class="chart-svg" viewBox="0 0 900 ${height}" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg"><g font-family="Arial,sans-serif" font-size="22" fill="#152e3b">${body}</g></svg>`;
  function chart(m) {
    const d = datasets[m.dataset.set];
    const modes = (m.dataset.modes || 'frequency,relative,cumulative').split(',');
    let mode = modes[0], width = 1, polygon = false, visible = m.dataset.reveal !== 'true';
    const labels = {frequency:'Frequency', relative:'Relative frequency', cumulative:'Cumulative frequency'};
    const isStatic = m.dataset.static === 'true';
    m.innerHTML = (isStatic ? '' : `<div class="chart-toolbar"><label>Display <select aria-label="Graph vertical scale">${modes.map(x=>`<option value="${x}">${labels[x]}</option>`).join('')}</select></label><label><input type="checkbox" class="polygon"> Polygon</label>${m.dataset.group === 'true' ? '<label>Class width <select class="width" aria-label="Class width"><option value="1">1</option><option value="2">2</option></select></label>' : ''}${!visible ? '<button class="show-chart primary">Show graph</button>' : ''}</div>`) + '<div class="plot"></div><p class="chart-caption" aria-live="polite"></p>';
    const draw = () => {
      const bins = binData(d, width), n = sum(d.f), cf = cumulative(bins.map(b=>b.f));
      const yvalues = bins.map((b,i)=>mode==='relative'?b.f/n:mode==='cumulative'?cf[i]:b.f);
      const max = Math.max(...yvalues), step = mode==='relative' ? (max<=.5?.1:.2) : max<=6?1:max<=12?2:max<=30?5:max<=60?10:20;
      const ymax = Math.ceil(max / step) * step || 1;
      const L=82,R=866,T=23,B=320;
      const xmin=bins[0].left-width*.5, xmax=bins.at(-1).right+width*.5;
      const sx=x=>L+(x-xmin)/(xmax-xmin)*(R-L), sy=y=>B-y/ymax*(B-T);
      let body='';
      for(let y=0;y<=ymax+step*.01;y+=step){body+=`<line x1="${L}" y1="${sy(y)}" x2="${R}" y2="${sy(y)}" stroke="#d7d8ce" stroke-width="1"/>`+text(L-13,sy(y)+7,fmt(y),'text-anchor="end"');}
      body+=`<path d="M${L} ${T}V${B}H${R}" fill="none" stroke="#152e3b" stroke-width="2"/>`;
      const ticks = d.grouped || width>1 ? [...bins.map(b=>b.left), bins.at(-1).right] : d.values;
      for(const x of ticks)body+=text(sx(x),B+31,fmt(x),'text-anchor="middle"');
      body+=text((L+R)/2,380,d.label,'text-anchor="middle" font-size="24"');
      body+=text(25,(T+B)/2,labels[mode],`transform="rotate(-90 25 ${(T+B)/2})" text-anchor="middle" font-size="23"`);
      if(visible){
        bins.forEach((b,i)=>{body+=`<rect x="${sx(b.left)}" y="${sy(yvalues[i])}" width="${sx(b.right)-sx(b.left)}" height="${B-sy(yvalues[i])}" fill="#007f78" fill-opacity=".72" stroke="#f7f5ef" stroke-width="1.4"><title>${esc(d.grouped||width>1?`${fmt(b.left)} ≤ x < ${fmt(b.right)}`:fmt(b.centre))}: ${fmt(yvalues[i])}</title></rect>`;});
        if(polygon){
          const pts=mode==='cumulative'?[[bins[0].left,0],...bins.map((b,i)=>[b.right,yvalues[i]])]:[[bins[0].centre-width,0],...bins.map((b,i)=>[b.centre,yvalues[i]]),[bins.at(-1).centre+width,0]];
          body+=`<polyline points="${pts.map(([x,y])=>`${sx(x)},${sy(y)}`).join(' ')}" stroke="#b55224" fill="none" stroke-width="4"/>`;
          body+=pts.map(([x,y])=>`<circle cx="${sx(x)}" cy="${sy(y)}" r="4" fill="#b55224"/>`).join('');
        }
      }
      $(m,'.plot').innerHTML=makeSvg(body,`${labels[mode]} histogram of ${d.label}; ${n} observations. ${polygon?'Polygon shown.':''}`);
      $(m,'.chart-caption').textContent = isStatic ? `n = ${n}` : visible ? `n = ${n}. ${mode==='cumulative'?'Polygon points use upper class boundaries.':mode==='relative'?'Heights are proportions; the distribution has the same shape.':'Polygon points use value or class centres.'}` : 'Draw your graph in the booklet, then reveal to compare.';
      m.dataset.mode=mode;m.dataset.width=width;m.dataset.n=n;
    };
    if(!isStatic){
      $(m,'select').addEventListener('change',e=>{mode=e.target.value;draw();});
      $(m,'.polygon').addEventListener('change',e=>{polygon=e.target.checked;draw();});
      $(m,'.width')?.addEventListener('change',e=>{width=Number(e.target.value);draw();});
      $(m,'.show-chart')?.addEventListener('click',e=>{visible=!visible;e.target.textContent=visible?'Hide graph':'Show graph';draw();});
    }
    draw();
  }
  function frequencyTable(m) {
    const d=datasets[m.dataset.set], n=sum(d.f), cf=cumulative(d.f);
    const columns=(m.dataset.columns||'rf,cf,crf').split(',');
    const names={centre:'Class centre',rf:'Relative frequency',cf:'Cumulative frequency',crf:'Cumulative relative frequency'};
    const revealed=new Set();
    m.innerHTML='<div class="table-wrap"></div><div class="toolbar">'+columns.map(c=>`<button data-column="${c}" aria-pressed="false">Reveal ${names[c].toLowerCase()}</button>`).join('')+'</div>';
    const draw=()=>{
      let h=`<table class="${d.values.length>6?'small-table':''}"><thead><tr><th>${d.grouped?'Class interval':'Value, x'}</th><th>Frequency, f</th>${columns.map(c=>`<th>${names[c]}</th>`).join('')}</tr></thead><tbody>`;
      d.values.forEach((x,i)=>{
        const values={centre:x,rf:d.f[i]/n,cf:cf[i],crf:cf[i]/n};
        h+=`<tr><td>${d.grouped?`${fmt(x-.5)} ≤ x < ${fmt(x+.5)}`:x}</td><td>${d.f[i]}</td>${columns.map(c=>`<td class="${revealed.has(c)?'revealed':'blank'}">${revealed.has(c)?fmt(values[c]):'…'}</td>`).join('')}</tr>`;
      });
      h+=`</tbody><tfoot><tr><td>Total</td><td>${m.dataset.hideTotal==='true'&&!revealed.size?'…':n}</td>${columns.map(c=>`<td>${c==='rf'?(revealed.has(c)?'1':'…'):'—'}</td>`).join('')}</tr></tfoot></table>`;
      $(m,'.table-wrap').innerHTML=h;
    };
    $$(m,'button').forEach(b=>b.addEventListener('click',()=>{
      const c=b.dataset.column;if(revealed.has(c))revealed.delete(c);else revealed.add(c);
      b.setAttribute('aria-pressed',revealed.has(c));b.textContent=`${revealed.has(c)?'Hide':'Reveal'} ${names[c].toLowerCase()}`;draw();
    }));draw();
  }
  const timers=[];
  function hinge(m) {
    const answer=m.dataset.correct;
    let selected=null,revealed=false,remaining=60000,deadline=0,interval=null;
    const timer=$(m,'.time'), start=$(m,'.timer-start'), duration=$(m,'.timer-duration');
    if(duration)remaining=Number(duration.value)*1000;
    const showTime=()=>{if(!timer)return;const s=Math.ceil(remaining/1000);timer.textContent=s?`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`:'Time up';timer.classList.toggle('up',!s);m.dataset.remaining=String(s);};
    const pause=()=>{if(interval!==null){remaining=Math.max(0,deadline-performance.now());clearInterval(interval);interval=null;if(start)start.textContent=remaining?'Resume':'Start';showTime();}};
    const clearAnswers=()=>{selected=null;revealed=false;$$(m,'.choice').forEach(b=>{b.classList.remove('selected','correct','incorrect');b.setAttribute('aria-pressed','false');});$(m,'.hinge-explanation').hidden=true;$(m,'.reveal-answer').disabled=false;};
    const reset=()=>{pause();remaining=Number(duration?.value||60)*1000;if(start)start.textContent='Start';showTime();clearAnswers();};
    start?.addEventListener('click',()=>{
      if(interval!==null){pause();return;}if(remaining<=0)remaining=Number(duration.value)*1000;
      deadline=performance.now()+remaining;start.textContent='Pause';
      interval=setInterval(()=>{remaining=Math.max(0,deadline-performance.now());showTime();if(!remaining){clearInterval(interval);interval=null;start.textContent='Start';}},150);
    });
    duration?.addEventListener('change',()=>{pause();remaining=Number(duration.value)*1000;start.textContent='Start';showTime();});
    $(m,'.reset-question')?.addEventListener('click',reset);
    $$(m,'.choice').forEach(b=>b.addEventListener('click',()=>{if(revealed)return;selected=b.dataset.answer;$$(m,'.choice').forEach(c=>{const active=c===b;c.classList.toggle('selected',active);c.setAttribute('aria-pressed',String(active));});}));
    $(m,'.reveal-answer').addEventListener('click',()=>{
      pause();revealed=true;$$(m,'.choice').forEach(b=>{b.classList.add(b.dataset.answer===answer?'correct':selected===b.dataset.answer?'incorrect':'unselected');});$(m,'.hinge-explanation').hidden=false;$(m,'.reveal-answer').disabled=true;
    });
    timers.push({element:m,pause});showTime();
  }
  function outcomes(m){
    const all=Array.from({length:16},(_,i)=>i.toString(2).padStart(4,'0').replace(/0/g,'T').replace(/1/g,'H'));
    m.innerHTML='<div class="outcomes">'+all.map(s=>`<div class="outcome" data-heads="${[...s].filter(x=>x==='H').length}">${s}</div>`).join('')+'</div><div class="toolbar"><span class="small">Highlight X =</span>'+[0,1,2,3,4].map(n=>`<button data-k="${n}" aria-pressed="false">${n}</button>`).join('')+'<button data-k="all">All outcomes</button></div><div class="feedback" aria-live="polite">16 ordered outcomes. Five possible values of X.</div>';
    $$(m,'button').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.k;$$(m,'.outcome').forEach(c=>{c.classList.toggle('active',c.dataset.heads===k);c.classList.toggle('dim',k!=='all'&&c.dataset.heads!==k);});$$(m,'button').forEach(c=>c.setAttribute('aria-pressed',String(c===b)));$(m,'.feedback').textContent=k==='all'?'16 ordered outcomes. Five possible values of X.':`${all.filter(s=>[...s].filter(x=>x==='H').length===Number(k)).length} ordered outcome(s) give X = ${k}. Different outcomes can give the same value.`;}));
  }
  function classifier(m){
    const cards=[
      ['Let T be a runner’s actual finishing time, recorded to the nearest tenth of a second.','continuous','The underlying quantity is measured on a continuum. Rounding the measurement does not turn time into a count.'],
      ['Let W be winnings from a game: $0, $2.50 or $10.','discrete','There are three possible values. Discrete values do not have to be integers.'],
      ['Let N be the number of emails arriving in the next hour.','discrete','N takes countable non-negative integer values.'],
      ['Let H be the actual height of a randomly selected seedling.','continuous','Height can vary continuously within a range.']
    ];let i=0;
    m.innerHTML='<p class="small-note counter"></p><div class="classifier-scenario"></div><div class="toolbar"><button data-answer="discrete">Discrete</button><button data-answer="continuous">Continuous</button><button class="next-card ghost">Next situation →</button></div><div class="feedback" aria-live="polite"></div>';
    const show=()=>{$(m,'.counter').textContent=`Situation ${i+1} of ${cards.length}`;$(m,'.classifier-scenario').textContent=cards[i][0];$(m,'.feedback').textContent='';$$(m,'[data-answer]').forEach(b=>b.setAttribute('aria-pressed','false'));};
    $$(m,'[data-answer]').forEach(b=>b.addEventListener('click',()=>{$$(m,'[data-answer]').forEach(c=>c.setAttribute('aria-pressed',String(c===b)));$(m,'.feedback').textContent=`${b.dataset.answer===cards[i][1]?'Yes.':'Reconsider.'} ${cards[i][2]}`;}));
    $(m,'.next-card').addEventListener('click',()=>{i=(i+1)%cards.length;show();});show();
  }
  function subset(m){
    const d=datasets.pets;
    m.innerHTML='<table><thead><tr><th>Pets, x</th>'+d.values.map(x=>`<th>${x}</th>`).join('')+'</tr></thead><tbody><tr><th>Frequency</th>'+d.f.map((f,i)=>`<td data-i="${i}">${f}</td>`).join('')+'</tr></tbody></table><div class="toolbar"><button data-kind="exact">Exactly 2</button><button data-kind="at-most">At most 2</button><button data-kind="more">More than 2</button></div><div class="feedback" aria-live="polite">Choose an event. Which frequencies belong in the numerator?</div>';
    $$(m,'button').forEach(b=>b.addEventListener('click',()=>{const predicate=b.dataset.kind==='exact'?x=>x===2:b.dataset.kind==='at-most'?x=>x<=2:x=>x>2;let count=0;$$(m,'td').forEach(c=>{const i=Number(c.dataset.i),on=predicate(d.values[i]);c.style.background=on?'#dceee4':'';if(on)count+=d.f[i];});$$(m,'button').forEach(c=>c.setAttribute('aria-pressed',String(c===b)));$(m,'.feedback').textContent=`${b.textContent}: ${count} of 50 households. Estimated probability = ${count}/50 = ${fmt(count/50)}.`;}));
  }
  function median(m){
    const values=[1,2,2,2,3,3,3,3];
    m.innerHTML='<div class="dots">'+values.map((v,i)=>`<div class="dot-value" data-i="${i}"><b>${v}</b><small>position ${i+1}</small></div>`).join('')+'</div><div class="toolbar"><button class="middle">Locate the middle</button><button class="modal">Locate the mode</button><button class="clear">Reset</button></div><div class="feedback" aria-live="polite">Eight observations: which two positions are in the middle?</div>';
    const clear=()=>{$$(m,'.dot-value').forEach(x=>x.classList.remove('middle','modal'));};
    $(m,'.middle').addEventListener('click',()=>{clear();$$(m,'.dot-value').forEach(x=>x.classList.toggle('middle',[3,4].includes(Number(x.dataset.i))));$(m,'.feedback').textContent='Positions 4 and 5 contain 2 and 3. Median = (2 + 3)/2 = 2.5.';});
    $(m,'.modal').addEventListener('click',()=>{clear();$$(m,'.dot-value').forEach(x=>x.classList.toggle('modal',values[Number(x.dataset.i)]===3));$(m,'.feedback').textContent='Mode = 3. It occurs four times; the mode is a value, not its frequency.';});
    $(m,'.clear').addEventListener('click',()=>{clear();$(m,'.feedback').textContent='Eight observations: which two positions are in the middle?';});
  }
  function boundary(m){
    m.innerHTML='<label class="small" for="boundary-value">Measured value: <strong class="boundary-value">13.0</strong></label><input id="boundary-value" type="range" min="11" max="14.9" step="0.1" value="13" aria-label="Measured value"><div class="boundary-bins">'+[11,12,13,14].map(x=>`<div class="boundary-bin" data-left="${x}">${x} ≤ x &lt; ${x+1}</div>`).join('')+'</div><div class="toolbar"><button class="exact-boundary">Set x = 13</button></div><div class="feedback" aria-live="polite"></div>';
    const draw=()=>{const value=Number($(m,'input').value),lower=Math.floor(value);$(m,'.boundary-value').textContent=value.toFixed(1);$$(m,'.boundary-bin').forEach(x=>x.classList.toggle('active',Number(x.dataset.left)===lower));$(m,'.feedback').textContent=`${value.toFixed(1)} belongs to ${lower} ≤ x < ${lower+1}. Include the lower boundary; exclude the upper boundary.`;};
    $(m,'input').addEventListener('input',draw);$(m,'button').addEventListener('click',()=>{$(m,'input').value=13;draw();});draw();
  }
  function coin(m){
    let seed=31337,n=0,heads=0,history=[],last=[];
    const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
    m.innerHTML='<div class="toolbar">'+[1,5,50,500].map(k=>`<button data-trials="${k}">Toss ${k===1?'once':k+' times'}</button>`).join('')+'<button class="new-run">New run</button></div><div class="stat-row"><span>Tosses<strong class="n">0</strong></span><span>Heads<strong class="heads">0</strong></span><span>Relative frequency<strong class="rf">—</strong></span></div><div class="coin-plot"></div><div class="last-tosses" aria-label="Most recent ten tosses"></div><p class="small-note">Teal: observed proportion of heads. Orange: theoretical probability 0.5. Maximum 5,000 tosses per run.</p>';
    const draw=()=>{
      $(m,'.n').textContent=n;$(m,'.heads').textContent=heads;$(m,'.rf').textContent=n?fmt(heads/n):'—';m.dataset.n=n;m.dataset.heads=heads;
      const L=75,R=865,T=18,B=260,maxN=Math.max(20,n),sx=x=>L+x/maxN*(R-L),sy=y=>B-y*(B-T);
      let body='';for(const y of [0,.25,.5,.75,1])body+=`<line x1="${L}" y1="${sy(y)}" x2="${R}" y2="${sy(y)}" stroke="#d7d8ce"/>`+text(L-12,sy(y)+7,fmt(y),'text-anchor="end"');
      body+=`<path d="M${L} ${T}V${B}H${R}" stroke="#152e3b" fill="none" stroke-width="2"/><line x1="${L}" y1="${sy(.5)}" x2="${R}" y2="${sy(.5)}" stroke="#b55224" stroke-width="3" stroke-dasharray="9 6"/>`;
      [0,Math.round(maxN/2),maxN].forEach(x=>body+=text(sx(x),B+29,x,'text-anchor="middle"'));
      body+=text((L+R)/2,325,'Number of tosses','text-anchor="middle" font-size="24"');
      if(history.length)body+=`<polyline points="${history.map((p,i)=>`${sx(i+1)},${sy(p)}`).join(' ')}" fill="none" stroke="#007f78" stroke-width="3"/>`;
      $(m,'.coin-plot').innerHTML=makeSvg(body,'Observed relative frequency of heads as the number of fair-coin tosses increases',345).replace('class="chart-svg"','class="coin-svg"');
      $(m,'.last-tosses').innerHTML=last.map(h=>`<span class="${h?'':'tail'}">${h?'H':'T'}</span>`).join('');
      $$(m,'[data-trials]').forEach(b=>b.disabled=n>=5000);
    };
    $$(m,'[data-trials]').forEach(b=>b.addEventListener('click',()=>{const count=Math.min(Number(b.dataset.trials),5000-n);for(let i=0;i<count;i++){const h=random()<.5;n++;heads+=Number(h);history.push(heads/n);last.push(h);if(last.length>10)last.shift();}draw();}));
    $(m,'.new-run').addEventListener('click',()=>{n=0;heads=0;history=[];last=[];seed=(seed+137)>>>0;draw();});draw();
  }
  function classEstimate(m){
    m.innerHTML='<div class="toolbar"><label>Class heads <input class="class-heads" type="number" min="0" step="1" value="0" aria-label="Total heads for the class"></label><label>Class tosses <input class="class-n" type="number" min="1" step="1" value="0" aria-label="Total coin tosses for the class"></label><button class="calculate primary">Calculate class estimate</button></div><div class="class-result" aria-live="polite"></div>';
    $(m,'.calculate').addEventListener('click',()=>{const h=Number($(m,'.class-heads').value),n=Number($(m,'.class-n').value);$(m,'.class-result').textContent=Number.isInteger(h)&&Number.isInteger(n)&&n>0&&h>=0&&h<=n?`Class estimate: ${h}/${n} = ${fmt(h/n)}. Compare this with 0.5.`:'Enter whole-number totals with 0 ≤ heads ≤ tosses and tosses > 0.';});
  }
  function init(){
    const modules={chart,table:frequencyTable,hinge,quiz:hinge,outcomes,classifier,subset,median,boundary,coin,'class-estimate':classEstimate};
    $$ (document,'[data-module]').forEach(m=>{const fn=modules[m.dataset.module];if(fn&&!m.dataset.ready){m.dataset.ready='true';fn(m);}});
    document.addEventListener('keydown',e=>{if(e.target.closest('button,input,select,textarea'))e.stopPropagation();});
    const wait=()=>{
      if(!window.Reveal?.isReady()){setTimeout(wait,50);return;}
      const nav=document.createElement('nav');nav.id='lesson-navigation';nav.setAttribute('aria-label','Lesson navigation');
      nav.innerHTML='<div class="nav-group"><a href="../../index.html">All lessons</a><button class="overview">Slide map</button></div><div class="nav-group"><button class="prev">← Previous</button><button class="next">Next →</button></div>';
      document.body.append(nav);$(nav,'.prev').onclick=()=>Reveal.prev();$(nav,'.next').onclick=()=>Reveal.next();$(nav,'.overview').onclick=()=>Reveal.toggleOverview();
      const refresh=()=>{$(nav,'.prev').disabled=Reveal.isFirstSlide();$(nav,'.next').disabled=Reveal.isLastSlide();timers.forEach(t=>{if(!Reveal.getCurrentSlide().contains(t.element))t.pause();});};
      Reveal.on('slidechanged',refresh);refresh();
    };wait();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
