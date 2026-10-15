/* Shared classroom interactions. No network calls or accounts; class records stay in page memory. */
(() => {
  'use strict';
  const $ = (root, selector) => root.querySelector(selector);
  const $$ = (root, selector) => [...root.querySelectorAll(selector)];
  const sum = a => a.reduce((x, y) => x + y, 0);
  const fmt = n => Number(n.toFixed(4)).toString();
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const math = tex => `<span class="math-token" data-math="${esc(tex)}">${window.katex ? window.katex.renderToString(tex, {throwOnError:false}) : esc(tex)}</span>`;
  const typeset = root => {
    if (!window.katex) return;
    $$(root, '[data-math]').forEach(el => {
      el.classList.add('math-token');
      window.katex.render(el.dataset.math, el, {throwOnError:false});
    });
  };
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
  const makeSvg = (body, label, height = 390, width = 900) => `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg"><g font-family="Arial,sans-serif" font-size="22" fill="#152e3b">${body}</g></svg>`;
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
        bins.forEach((b,i)=>{body+=`<rect x="${sx(b.left)}" y="${sy(yvalues[i])}" width="${sx(b.right)-sx(b.left)}" height="${B-sy(yvalues[i])}" fill="#007f78" fill-opacity=".72" stroke="#f7f5ef" stroke-width="1.4"><title>${esc(d.grouped||width>1?(m.dataset.intervalNotation?`${fmt(b.left)}${m.dataset.intervalNotation==='upper'?'>–':'–<'}${fmt(b.right)}`:`${fmt(b.left)} ≤ x < ${fmt(b.right)}`):fmt(b.centre))}: ${fmt(yvalues[i])}</title></rect>`;});
        if(polygon){
          const pts=mode==='cumulative'?[[bins[0].left,0],...bins.map((b,i)=>[b.right,yvalues[i]])]:[[bins[0].centre-width,0],...bins.map((b,i)=>[b.centre,yvalues[i]]),[bins.at(-1).centre+width,0]];
          body+=`<polyline points="${pts.map(([x,y])=>`${sx(x)},${sy(y)}`).join(' ')}" stroke="#b55224" fill="none" stroke-width="4"/>`;
          body+=pts.map(([x,y])=>`<circle cx="${sx(x)}" cy="${sy(y)}" r="4" fill="#b55224"/>`).join('');
        }
      }
      $(m,'.plot').innerHTML=makeSvg(body,`${labels[mode]} histogram of ${d.label}; ${n} observations. ${polygon?'Polygon shown.':''}`);
      $(m,'.chart-caption').textContent = isStatic ? `n = ${n}` : visible ? `n = ${n}. ${mode==='cumulative'?'Polygon points use upper class boundaries.':mode==='relative'?'Heights are proportions; the distribution has the same shape.':'Polygon points use value or class centres.'}` : 'Draw your graph in the booklet, then reveal to compare.';
      if(m.dataset.intervalNotation&&visible){
        const b=bins[0],upper=m.dataset.intervalNotation==='upper';
        $(m,'.chart-caption').insertAdjacentHTML('beforeend',' First class: '+math(intervalTex(b.left,b.right,upper))+'.');
        typeset(m);
      }
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
      let h=`<table class="${d.values.length>6?'small-table':''}"><thead><tr><th>${d.grouped?'Class interval':`Value, ${math('x')}`}</th><th>Frequency, ${math('f')}</th>${columns.map(c=>`<th>${names[c]}</th>`).join('')}</tr></thead><tbody>`;
      d.values.forEach((x,i)=>{
        const values={centre:x,rf:d.f[i]/n,cf:cf[i],crf:cf[i]/n};
        h+=`<tr><td>${d.grouped?(m.dataset.intervalNotation?math(intervalTex(x-.5,x+.5,m.dataset.intervalNotation==='upper')):`${fmt(x-.5)} ≤ x < ${fmt(x+.5)}`):x}</td><td>${d.f[i]}</td>${columns.map(c=>`<td class="${revealed.has(c)?'revealed':'blank'}">${revealed.has(c)?fmt(values[c]):'…'}</td>`).join('')}</tr>`;
      });
      h+=`</tbody><tfoot><tr><td>Total</td><td>${m.dataset.hideTotal==='true'&&!revealed.size?'…':n}</td>${columns.map(c=>`<td>${c==='rf'?(revealed.has(c)?'1':'…'):'—'}</td>`).join('')}</tr></tfoot></table>`;
      $(m,'.table-wrap').innerHTML=h;typeset(m);
    };
    $$(m,'button').forEach(b=>b.addEventListener('click',()=>{
      const c=b.dataset.column;if(revealed.has(c))revealed.delete(c);else revealed.add(c);
      b.setAttribute('aria-pressed',revealed.has(c));b.textContent=`${revealed.has(c)?'Hide':'Reveal'} ${names[c].toLowerCase()}`;draw();
    }));draw();
  }
  const timers=[];
  function hinge(m) {
    const answer=m.dataset.correct;
    $$(m, '.choice').forEach(choice => {
      const label = $(choice, 'b');
      label.classList.add('finger-choice-label');
      label.insertAdjacentHTML('beforeend', `<span class="finger-icon fingers-${choice.dataset.answer}" aria-hidden="true"></span>`);
    });
    let selected=null,revealed=false,remaining=60000,deadline=0,interval=null;
    const timer=$(m,'.time'), start=$(m,'.timer-start'), duration=$(m,'.timer-duration');
    if(duration)remaining=Number(duration.value)*1000;
    const showTime=()=>{if(!timer)return;const s=Math.ceil(remaining/1000);timer.textContent=s?`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`:'Time up';timer.classList.toggle('up',!s);m.dataset.remaining=String(s);};
    const pause=()=>{if(interval!==null){remaining=Math.max(0,deadline-performance.now());clearInterval(interval);interval=null;if(start)start.textContent=remaining?'Resume':'Start';showTime();}};
    const clearAnswers=()=>{selected=null;revealed=false;$$(m,'.choice').forEach(b=>{b.classList.remove('selected','correct','incorrect','unselected');b.setAttribute('aria-pressed','false');});$(m,'.hinge-explanation').hidden=true;$(m,'.reveal-answer').disabled=false;};
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
  function variableComparison(m) {
    const purchases = [3, 5, 7, 2, 6, 4, 8];
    const price = 4;
    let purchaseIndex = 0, purchaseRecorded = false, coins = null, trial = 0, coinRecorded = false;
    let penHistory = [], coinHistory = [];
    m.innerHTML = `<div class="variable-panels">
      <div class="variable-panel pen-panel" role="group" aria-label="Algebra: buying pens">
        <div class="variable-kicker">Algebra · a fixed unknown</div><h3>Buying pens</h3>
        <p class="variable-definition">Let ${math('x')} be the cost of one pen, in dollars.</p>
        <p class="variable-context">Same shop. Same pens. Unchanged price.</p>
        <div class="variable-situation"><span class="purchase-description"></span><strong class="purchase-equation"></strong></div>
        <div class="variable-box" role="status" aria-live="polite" aria-label="Pen price">${math('x')}<span class="box-value">?</span></div>
        <div class="variable-actions"><button class="pen-reveal primary" aria-expanded="false">Look inside ${math('x')}</button><button class="new-purchase">New purchase</button></div>
        <div class="variable-history"><div class="history-heading">Last revealed purchases</div><ol class="pen-history"></ol></div>
      </div>
      <div class="variable-panel coin-panel" role="group" aria-label="Probability: tossing coins">
        <div class="variable-kicker">Probability · a random variable</div><h3>Tossing four coins</h3>
        <p class="variable-definition">Let ${math('X')} be the number of heads when four coins are tossed.</p>
        <p class="variable-context">Four fair, independent coins on each trial.</p>
        <div class="variable-situation"><span class="trial-label">Toss to begin</span><div class="comparison-coins" role="img" aria-label="Four coins, not yet tossed"></div></div>
        <div class="variable-box" role="status" aria-live="polite" aria-label="Head count for this trial">${math('X')}<span class="box-value">?</span></div>
        <div class="variable-actions"><button class="coin-reveal primary" aria-expanded="false" disabled>Look inside ${math('X')}</button><button class="toss-four">Toss four coins</button></div>
        <div class="variable-history"><div class="history-heading">Last revealed trials</div><ol class="coin-history"></ol></div>
      </div>
    </div><div class="variable-footer"><p>Predict before we look: what could be inside each box?</p><button class="reset-variables ghost">Reset both</button></div>`;
    const penPanel = $(m, '.pen-panel'), coinPanel = $(m, '.coin-panel');
    const setBox = (panel, open, value, symbol) => {
      const box = $(panel, '.variable-box'), button = $(panel, '.primary');
      box.classList.toggle('is-open', open);
      $(box, '.box-value').textContent = open ? value : '?';
      button.setAttribute('aria-expanded', String(open));
      button.innerHTML = open ? 'Close box' : `Look inside ${math(symbol)}`;
    };
    const drawHistory = (panel, history) => {
      $(panel, 'ol').innerHTML = history.length
        ? history.slice(-3).map(row => `<li>${esc(row.label)} ${math(row.tex)}</li>`).join('')
        : '<li class="history-empty">Reveal a value to record it here.</li>';
    };
    const showPurchase = () => {
      const n = purchases[purchaseIndex];
      $(m, '.purchase-description').textContent = `${n} pens cost $${n * price}`;
      $(m, '.purchase-equation').innerHTML = math(`${n}x = ${n * price}`);
      setBox(penPanel, false, price, 'x');
      purchaseRecorded = false;
    };
    const showCoins = () => {
      $(m, '.trial-label').textContent = coins ? `Trial ${trial}` : 'Toss to begin';
      const display = $(m, '.comparison-coins');
      display.innerHTML = (coins || ['?', '?', '?', '?']).map(c => `<span class="comparison-coin ${c === 'H' ? 'head' : c === 'T' ? 'tail' : 'untossed'}">${c}</span>`).join('');
      display.setAttribute('aria-label', coins ? `Coin outcomes: ${coins.map(c => c === 'H' ? 'heads' : 'tails').join(', ')}` : 'Four coins, not yet tossed');
      $(m, '.coin-reveal').disabled = !coins;
      setBox(coinPanel, false, '', 'X');
      coinRecorded = false;
    };
    $(m, '.pen-reveal').addEventListener('click', () => {
      const open = $(m, '.pen-reveal').getAttribute('aria-expanded') !== 'true';
      setBox(penPanel, open, price, 'x');
      if (open && !purchaseRecorded) {
        const n = purchases[purchaseIndex];
        penHistory.push({label:`${n} pens · $${n * price} →`, tex:`x = ${price}`});
        penHistory = penHistory.slice(-3); purchaseRecorded = true;
        drawHistory(penPanel, penHistory);
      }
    });
    $(m, '.new-purchase').addEventListener('click', () => {
      purchaseIndex = (purchaseIndex + 1) % purchases.length; showPurchase();
    });
    $(m, '.toss-four').addEventListener('click', () => {
      coins = Array.from({length: 4}, () => Math.random() < .5 ? 'H' : 'T');
      trial++; showCoins();
    });
    $(m, '.coin-reveal').addEventListener('click', () => {
      if (!coins) return;
      const open = $(m, '.coin-reveal').getAttribute('aria-expanded') !== 'true';
      const heads = coins.filter(c => c === 'H').length;
      setBox(coinPanel, open, heads, 'X');
      if (open && !coinRecorded) {
        coinHistory.push({label:`${trial}. ${coins.join('')} →`, tex:`X = ${heads}`});
        coinHistory = coinHistory.slice(-3); coinRecorded = true;
        drawHistory(coinPanel, coinHistory);
      }
    });
    const reset = () => {
      purchaseIndex = 0; coins = null; trial = 0; penHistory = []; coinHistory = [];
      showPurchase(); showCoins(); drawHistory(penPanel, penHistory); drawHistory(coinPanel, coinHistory);
    };
    $(m, '.reset-variables').addEventListener('click', reset);
    reset();
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
  // Explicit interval shorthands are opt-in for the Lesson 3 examples.
  const intervalTex = (a,b,upper=false) => upper
    ? `${fmt(a)}>\\text{–}${fmt(b)}`
    : `${fmt(a)}\\text{–}<${fmt(b)}`;
  function boundary(m){
    let upper=false;
    m.innerHTML='<div class="toolbar boundary-conventions"><button data-convention="lower" aria-pressed="true">Include lower endpoint</button><button data-convention="upper" aria-pressed="false">Include upper endpoint</button></div><p class="boundary-rule"></p><label class="small">Measured value: <strong class="boundary-value"></strong><input class="boundary-slider" type="range" min="11.1" max="14.9" step="0.1" value="13" aria-label="Measured value"></label><div class="boundary-bins">'+[11,12,13,14].map(x=>`<div class="boundary-bin" data-left="${x}"></div>`).join('')+'</div><div class="toolbar"><button class="exact-boundary">Set '+math('x=13')+'</button></div><div class="feedback" aria-live="polite"></div>';
    const draw=()=>{
      const value=Number($(m,'.boundary-slider').value),lower=upper?Math.ceil(value)-1:Math.floor(value);
      $(m,'.boundary-value').innerHTML=math('x='+value.toFixed(1));
      $(m,'.boundary-rule').innerHTML=upper
        ? math('a>\\text{–}b\\quad\\Longleftrightarrow\\quad a<x\\le b')
        : math('a\\text{–}<b\\quad\\Longleftrightarrow\\quad a\\le x<b');
      $$(m,'.boundary-bin').forEach(bin=>{
        const left=Number(bin.dataset.left),active=left===lower;
        bin.classList.toggle('active',active);
        bin.innerHTML=math(intervalTex(left,left+1,upper));
        bin.setAttribute('aria-label',`${left} ${upper?'less than':'less than or equal to'} x ${upper?'less than or equal to':'less than'} ${left+1}${active?'; contains the measured value':''}`);
      });
      $(m,'.feedback').innerHTML=math('x='+value.toFixed(1))+' belongs to '+math(intervalTex(lower,lower+1,upper))+'. '+(upper?'Exclude the lower endpoint; include the upper endpoint.':'Include the lower endpoint; exclude the upper endpoint.');
      $$(m,'[data-convention]').forEach(b=>b.setAttribute('aria-pressed',String((b.dataset.convention==='upper')===upper)));
      typeset(m);
    };
    $$(m,'[data-convention]').forEach(b=>b.addEventListener('click',()=>{upper=b.dataset.convention==='upper';draw();}));
    $(m,'.boundary-slider').addEventListener('input',draw);
    $(m,'.exact-boundary').addEventListener('click',()=>{$(m,'.boundary-slider').value='13';draw();});draw();
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
  // Exactly five tosses per student in Example 3.13. Data stays in page memory.
  function classCoinSummary(records){
    let heads=0;
    const history=records.map((row,i)=>{heads+=row.heads;return {students:i+1,heads,tosses:5*(i+1),probability:heads/(5*(i+1))};});
    return {students:records.length,heads,tosses:records.length*5,probability:records.length?heads/(records.length*5):null,history};
  }
  function classCoinModel(){
    let records=[],nextId=1,classVisible=false;
    const undoStack=[],copy=()=>records.map(row=>({...row}));
    const checkpoint=()=>undoStack.push({records:copy(),nextId});
    return {
      state:()=>({records:copy(),...classCoinSummary(records),classVisible,canUndo:undoStack.length>0}),
      save(heads,label='',id=null){
        if(!Number.isInteger(heads)||heads<0||heads>5)throw new RangeError('Choose a whole number of heads from 0 to 5.');
        const index=id===null?-1:records.findIndex(row=>row.id===id);
        if(id!==null&&index<0)throw new RangeError('Choose an existing student to edit.');
        label=String(label).trim().slice(0,40);checkpoint();
        if(id===null)records.push({id:nextId++,label,heads,revealed:false});
        else records[index]={...records[index],label,heads,revealed:false};
        classVisible=false;
      },
      toggleIndividual(id){const row=records.find(row=>row.id===id);if(row)row.revealed=!row.revealed;},
      toggleClass(){if(records.length)classVisible=!classVisible;},
      undo(){const previous=undoStack.pop();if(!previous)return;records=previous.records;nextId=previous.nextId;classVisible=false;},
      reset(){if(!records.length)return;checkpoint();records=[];nextId=1;classVisible=false;}
    };
  }
  function classEstimate(m){
    const model=classCoinModel();
    let selectedHeads=null,editingId=null,graphVisible=true,choosingEdit=false;
    m.innerHTML=`<p class="class-instruction">Five tosses each. Choose the number of heads, then add the student.</p>
      <form class="class-entry">
        <label class="class-name-label">Label (optional)<input class="class-label" type="text" maxlength="40" autocomplete="off" placeholder="Student 1"></label>
        <fieldset class="class-heads-picker"><legend>Heads out of 5</legend><div>${[0,1,2,3,4,5].map(h=>`<button type="button" data-heads="${h}" aria-pressed="false" aria-label="${h} heads out of 5 tosses">${h}</button>`).join('')}</div></fieldset>
        <button type="submit" class="class-add primary" disabled>Add student</button>
        <button type="button" class="class-cancel" hidden>Cancel edit</button>
      </form>
      <div class="class-totals" aria-label="Running class totals"><span>Students<strong class="class-students">0</strong></span><span>Heads<strong class="class-heads">0</strong></span><span>Tosses<strong class="class-tosses">0</strong></span><div class="class-combined"><button type="button" class="class-reveal primary" aria-expanded="false" disabled>Reveal class probability</button><div class="class-result" aria-live="polite"></div></div></div>
      <div class="class-tracker-grid">
        <div><div class="class-record-heading"><div><h3>Student record</h3><p class="class-record-help">H = heads · Tap a student to reveal or hide.</p></div><button type="button" class="class-edit-record" aria-pressed="false" disabled>Edit a record</button></div><div class="class-history" tabindex="0" role="region" aria-label="Student records; five tosses each"><div class="class-records"></div></div></div>
        <div class="class-graph-panel"><div class="class-graph-heading"><h3>Class estimate</h3><button type="button" class="class-graph-toggle" aria-pressed="true">Hide graph</button></div><div class="class-plot"></div><p class="class-graph-key">Teal: combined class estimate<br>Dashed orange: fair coin, 0.5</p></div>
      </div>
      <div class="class-footer"><div class="toolbar"><button type="button" class="class-undo" disabled>Undo</button><button type="button" class="class-reset" disabled>Reset class</button></div><p class="class-status" role="status">Ready for Student 1.</p></div>`;
    const label=$(m,'.class-label'),historyPane=$(m,'.class-history');
    const name=row=>row.label||`Student ${row.id}`;
    const estimate=(h,n)=>math(`\\frac{${h}}{${n}}${Number(fmt(h/n))===h/n?'=':'\\approx'}${fmt(h/n)}`);
    const announce=message=>{$(m,'.class-status').textContent=message;};
    const drawEntry=()=>{
      $$(m,'[data-heads]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.heads)===selectedHeads)));
      $(m,'.class-add').disabled=selectedHeads===null;
      $(m,'.class-add').textContent=editingId===null?'Add student':'Save changes';
      $(m,'.class-cancel').hidden=editingId===null;
      label.placeholder=editingId===null?`Student ${model.state().records.length+1}`:`Student ${editingId}`;
    };
    const clearEntry=()=>{selectedHeads=null;editingId=null;choosingEdit=false;label.value='';drawEntry();};
    const drawGraph=state=>{
      const plot=$(m,'.class-plot');
      $(m,'.class-graph-toggle').textContent=graphVisible?'Hide graph':'Show graph';
      $(m,'.class-graph-toggle').setAttribute('aria-pressed',String(graphVisible));
      $(m,'.class-graph-key').hidden=!graphVisible;
      if(!graphVisible){plot.innerHTML='<p class="class-graph-empty">Graph hidden. Predict how the next result will change the class estimate.</p>';return;}
      if(!state.students){plot.innerHTML='<p class="class-graph-empty">Add the first student to begin the graph.</p>';return;}
      const L=94,R=574,T=26,B=325,maxN=Math.max(5,state.students),sx=x=>L+x/maxN*(R-L),sy=y=>B-y*(B-T);
      let body='';
      for(const y of [0,.25,.5,.75,1])body+=`<line x1="${L}" y1="${sy(y)}" x2="${R}" y2="${sy(y)}" stroke="#d7d8ce"/>`+text(L-16,sy(y)+9,fmt(y),'text-anchor="end" font-size="27"');
      body+=`<path d="M${L} ${T}V${B}H${R}" stroke="#152e3b" fill="none" stroke-width="2"/><line x1="${L}" y1="${sy(.5)}" x2="${R}" y2="${sy(.5)}" stroke="#b55224" stroke-width="3" stroke-dasharray="10 7"/>`;
      const ticks=maxN<=10?Array.from({length:maxN+1},(_,i)=>i):[0,Math.round(maxN/4),Math.round(maxN/2),Math.round(3*maxN/4),maxN];
      ticks.forEach(x=>body+=text(sx(x),B+36,x,'text-anchor="middle" font-size="27"'));
      body+=text((L+R)/2,405,'Number of students','text-anchor="middle" font-size="29"');
      body+=text(26,(T+B)/2,'Experimental probability',`transform="rotate(-90 26 ${(T+B)/2})" text-anchor="middle" font-size="28"`);
      if(state.history.length>1)body+=`<polyline points="${state.history.map(p=>`${sx(p.students)},${sy(p.probability)}`).join(' ')}" fill="none" stroke="#007f78" stroke-width="4"/>`;
      state.history.forEach(p=>body+=`<circle cx="${sx(p.students)}" cy="${sy(p.probability)}" r="6" fill="#007f78"><title>${p.students} student${p.students===1?'':'s'}: ${p.heads}/${p.tosses} ${Number(fmt(p.probability))===p.probability?'=':'≈'} ${fmt(p.probability)}</title></circle>`);
      plot.innerHTML=makeSvg(body,`Combined experimental probability after each student; ${state.students} students and ${state.tosses} tosses. The dashed line marks theoretical probability 0.5.`,430,600);
    };
    const draw=()=>{
      const state=model.state(),scrollTop=historyPane.scrollTop;
      $(m,'.class-students').textContent=state.students;
      $(m,'.class-heads').textContent=state.heads;
      $(m,'.class-tosses').textContent=state.tosses;
      $(m,'.class-reveal').disabled=!state.students;
      $(m,'.class-reveal').textContent=state.classVisible?'Hide class probability':'Reveal class probability';
      $(m,'.class-reveal').setAttribute('aria-expanded',String(state.classVisible));
      $(m,'.class-result').innerHTML=state.classVisible?estimate(state.heads,state.tosses):state.students?'Predict from the totals.':'Awaiting results.';
      $(m,'.class-edit-record').disabled=!state.students;
      $(m,'.class-edit-record').textContent=choosingEdit?'Cancel selection':'Edit a record';
      $(m,'.class-edit-record').setAttribute('aria-pressed',String(choosingEdit));
      $(m,'.class-record-help').textContent=choosingEdit?'Choose a student to correct their result.':'H = heads · Tap a student to reveal or hide.';
      $(m,'.class-records').classList.toggle('class-selecting',choosingEdit);
      $(m,'.class-records').innerHTML=state.records.length?state.records.map(row=>`<button type="button" class="student-card ${row.id===editingId?'class-editing':''} ${row.revealed?'student-revealed':''}" data-reveal-student="${row.id}" aria-expanded="${row.revealed}" aria-label="${choosingEdit?'Edit':row.revealed?'Hide probability for':'Reveal probability for'} ${esc(name(row))}; ${row.heads} heads from 5 tosses"><span class="student-card-top"><span class="student-name" title="${esc(name(row))}">${esc(name(row))}</span><span class="student-heads">${row.heads} H</span></span><span class="student-estimate">${row.revealed?estimate(row.heads,5):'<span class="class-hidden-estimate">Reveal</span>'}</span></button>`).join(''):'<p class="class-empty">No results yet.</p>';
      historyPane.scrollTop=scrollTop;
      $(m,'.class-undo').disabled=!state.canUndo;
      $(m,'.class-reset').disabled=!state.students;
      drawEntry();drawGraph(state);typeset(m);
    };
    $$(m,'[data-heads]').forEach(b=>b.addEventListener('click',()=>{selectedHeads=Number(b.dataset.heads);drawEntry();}));
    $(m,'.class-entry').addEventListener('submit',event=>{
      event.preventDefault();
      if(selectedHeads===null){announce('Choose the number of heads from 0 to 5.');return;}
      const editing=editingId!==null,who=label.value.trim()||`Student ${editingId??model.state().records.length+1}`;
      model.save(selectedHeads,label.value,editingId);clearEntry();draw();
      if(!editing)historyPane.scrollTop=historyPane.scrollHeight;
      announce(`${editing?'Updated':'Added'} ${who}. Class probability is ready to reveal.`);
    });
    $(m,'.class-cancel').addEventListener('click',()=>{clearEntry();draw();announce('Edit cancelled.');});
    $(m,'.class-edit-record').addEventListener('click',()=>{choosingEdit=!choosingEdit;draw();announce(choosingEdit?'Choose a student card to edit.':'Selection cancelled. Tap a student to reveal their estimate.');});
    $(m,'.class-records').addEventListener('click',event=>{
      const card=event.target.closest('[data-reveal-student]');if(!card)return;
      const id=Number(card.dataset.revealStudent);
      if(choosingEdit){
        const row=model.state().records.find(r=>r.id===id);if(!row)return;
        choosingEdit=false;editingId=row.id;selectedHeads=row.heads;label.value=row.label;draw();
        label.focus({preventScroll:true});announce(`Editing ${name(row)}. Choose heads, then save changes.`);
      }else{
        model.toggleIndividual(id);draw();
        $(m,`[data-reveal-student="${id}"]`)?.focus({preventScroll:true});
      }
    });
    $(m,'.class-reveal').addEventListener('click',()=>{model.toggleClass();draw();});
    $(m,'.class-graph-toggle').addEventListener('click',()=>{graphVisible=!graphVisible;drawGraph(model.state());});
    $(m,'.class-undo').addEventListener('click',()=>{model.undo();clearEntry();draw();announce('Last data change undone.');});
    $(m,'.class-reset').addEventListener('click',()=>{model.reset();clearEntry();draw();announce('Class cleared. Undo restores the previous records.');});
    draw();
  }
  function slideMap(trigger){
    const dialog=document.createElement('dialog');
    dialog.id='lesson-slide-map';
    dialog.setAttribute('aria-labelledby','slide-map-title');
    dialog.setAttribute('aria-describedby','slide-map-help');
    dialog.innerHTML='<header class="slide-map-header"><div><h2 id="slide-map-title">Slide map</h2><p id="slide-map-help">Tap a slide to jump to it.</p></div><button class="slide-map-close" type="button" autofocus>Back to lesson</button></header><div class="slide-map-grid"></div>';
    document.body.append(dialog);
    trigger.setAttribute('aria-haspopup','dialog');
    trigger.setAttribute('aria-controls',dialog.id);
    trigger.setAttribute('aria-expanded','false');
    const grid=$(dialog,'.slide-map-grid');
    const sizePreviews=()=>{
      if(!dialog.open)return;
      const {width,height}=Reveal.getComputedSlideSize();
      $$(grid,'.slide-map-preview').forEach(preview=>{
        preview.style.aspectRatio=`${width} / ${height}`;
        const canvas=$(preview,'.slides');
        canvas.style.setProperty('width',`${width}px`,'important');
        canvas.style.height=`${height}px`;
        canvas.style.transform=`scale(${preview.clientWidth/width})`;
      });
    };
    new ResizeObserver(sizePreviews).observe(grid);
    const close=()=>dialog.close();
    $(dialog,'.slide-map-close').addEventListener('click',close);
    dialog.addEventListener('close',()=>{
      trigger.setAttribute('aria-expanded','false');
      grid.replaceChildren();
      trigger.focus({preventScroll:true});
    });
    // Keep keyboard navigation inside the modal; Escape retains native dialog behaviour.
    dialog.addEventListener('keydown',e=>{
      e.stopPropagation();
      if(e.key.toLowerCase()==='o'&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.preventDefault();close();}
    });
    const open=()=>{
      if(dialog.open)return;
      timers.forEach(t=>t.pause());
      const slides=Reveal.getSlides(),current=Reveal.getCurrentSlide();
      $(dialog,'#slide-map-help').textContent=`${slides.length} slides · Tap a slide to jump to it.`;
      slides.forEach((slide,index)=>{
        const heading=($(slide,'.cover-title')||$(slide,'h1,h2,h3'))?.cloneNode(true);
        if(heading){
          $$(heading,'.katex-mathml').forEach(el=>el.remove());
          $$(heading,'br').forEach(el=>el.replaceWith(' '));
        }
        const title=heading?.textContent.replace(/\s+/g,' ').trim()||`Slide ${index+1}`;
        const card=document.createElement('article');card.className='slide-map-card';
        const preview=document.createElement('div');preview.className='slide-map-preview reveal';
        preview.setAttribute('aria-hidden','true');preview.inert=true;
        const canvas=document.createElement('div');canvas.className='slides';
        const snapshot=slide.cloneNode(true);
        snapshot.dataset.previewOf=slide.id;
        snapshot.removeAttribute('hidden');snapshot.removeAttribute('aria-hidden');
        snapshot.classList.remove('past','future');snapshot.classList.add('present');
        // Snapshots have no live controls or speaker notes. Hidden answers stay hidden.
        $$(snapshot,'aside.notes,script,iframe,video,audio').forEach(el=>el.remove());
        [snapshot,...$$(snapshot,'[id]')].forEach(el=>el.removeAttribute('id'));
        canvas.append(snapshot);preview.append(canvas);card.append(preview);
        const jump=document.createElement('button');jump.type='button';jump.className='slide-map-jump';
        jump.innerHTML=`<span class="slide-map-caption"><span class="slide-map-number">${index+1}</span><span>${esc(title)}</span></span>`;
        jump.setAttribute('aria-label',`Slide ${index+1}: ${title}${slide===current?' (current slide)':''}`);
        if(slide===current){card.classList.add('is-current');jump.setAttribute('aria-current','step');}
        jump.addEventListener('click',()=>{
          const {h,v}=Reveal.getIndices(slide);
          close();Reveal.slide(h,v);
        });
        card.append(jump);grid.append(card);
      });
      dialog.showModal();trigger.setAttribute('aria-expanded','true');sizePreviews();
      $(grid,'.is-current')?.scrollIntoView({block:'nearest'});
    };
    trigger.addEventListener('click',open);
    trigger.addEventListener('keydown',e=>{
      if((e.key==='Escape'||e.key.toLowerCase()==='o')&&!e.ctrlKey&&!e.metaKey&&!e.altKey){
        e.preventDefault();e.stopPropagation();open();
      }
    });
    // The standard O / Escape shortcuts open the same map as the touch button.
    Reveal.on('overviewshown',()=>{Reveal.toggleOverview(false);open();});
  }
  function revealPanel(m){
    const button=$(m,'.toggle-panel'),label=button.textContent;let shown=false;
    button.addEventListener('click',()=>{shown=!shown;$$(m,'.panel-answer').forEach(el=>el.hidden=!shown);button.setAttribute('aria-pressed',String(shown));button.textContent=shown?label.replace('Show','Hide'):label;});
  }
  function tableBuilder(m){
    const d=datasets[m.dataset.set],n=sum(d.f),cf=cumulative(d.f),rows=d.values.length;
    const stages=m.dataset.stages.split(','),complete=(m.dataset.complete||'').split(',').filter(Boolean);
    const names={cf:'Cumulative frequency',rf:'Relative frequency',crf:'Cumulative relative frequency',fx:'Product'};
    let step=0;const last=stages.length*rows;
    m.innerHTML='<div class="step-status"></div><div class="table-wrap"></div><div class="builder-controls toolbar"><button class="build-back">← Back</button><button class="build-next primary">Next entry</button><button class="build-column">Complete column</button><button class="build-reset">Reset</button></div><div class="step-explanation" aria-live="polite"></div><div class="table-mean"></div>';
    const draw=()=>{
      const count=Object.fromEntries(complete.map(c=>[c,rows]));
      stages.forEach((c,i)=>count[c]=Math.max(0,Math.min(rows,step-i*rows)));
      const active=step?stages[Math.floor((step-1)/rows)]:null,ri=step?(step-1)%rows:-1;
      const columns=['fx','cf','rf','crf'].filter(c=>count[c]>0);
      const header=c=>`${math(c)}<small>${names[c]}</small>`;
      let h=`<table><thead><tr><th>${math('x')}<small>Number of pets</small></th><th>${math('f')}<small>Frequency</small></th>${columns.map(c=>`<th>${header(c)}</th>`).join('')}</tr></thead><tbody>`;
      d.values.forEach((x,i)=>{
        const prefix=active==='crf'&&i<=ri,one=(active==='cf'||active==='rf'||active==='fx')&&i===ri;
        const values={fx:x*d.f[i],cf:cf[i],rf:(d.f[i]/n).toFixed(2),crf:(cf[i]/n).toFixed(2)};
        h+=`<tr><td class="${i===ri?'current-value':''}">${x}</td><td class="${prefix||one?'input-highlight':''}">${d.f[i]}</td>${columns.map(c=>`<td data-column="${c}" class="${i===ri&&c===active?'current-cell':active==='cf'&&c==='cf'&&i===ri-1?'input-highlight':''}">${i<count[c]?values[c]:'…'}</td>`).join('')}</tr>`;
      });
      h+=`</tbody><tfoot><tr><td>Total</td><td>${n}</td>${columns.map(c=>`<td>${c==='fx'?(count.fx===rows?sum(d.values.map((x,i)=>x*d.f[i])):'…'):c==='rf'?(count.rf===rows?'1.00':'…'):'—'}</td>`).join('')}</tr></tfoot></table>`;
      $(m,'.table-wrap').innerHTML=h;
      $(m,'.step-status').textContent=active?`${names[active]} · entry ${ri+1} of ${rows}`:complete.length?'Add the product column after frequency':'Start with the value and its frequency';
      let explanation='Predict the next entry, then reveal its calculation.';
      if(active){
        const x=d.values[ri],f=d.f[ri],c=cf[ri];let equation,meaning;
        if(active==='cf'){equation=`${ri?cf[ri-1]:0}+${f}=${c}`;meaning=`${c} of the ${n} households have at most ${x} ${x===1?'pet':'pets'}.`;}
        if(active==='rf'){equation=`\\frac{${f}}{${n}}=${(f/n).toFixed(2)}`;meaning=`${Math.round(f/n*100)}% of households have exactly ${x} ${x===1?'pet':'pets'}.`;}
        if(active==='crf'){equation=`\\frac{${c}}{${n}}=${(c/n).toFixed(2)}`;meaning=`${Math.round(c/n*100)}% of households have at most ${x} ${x===1?'pet':'pets'}.`;}
        if(active==='fx'){equation=`${f}\\times ${x}=${f*x}`;meaning=`${f} ${f===1?'household':'households'} with ${x} ${x===1?'pet':'pets'} each ${f===1?'contributes':'contribute'} ${f*x} pets in total.`;}
        explanation=`<div>${math(equation)}</div><p>${meaning}</p>`;
      }
      $(m,'.step-explanation').innerHTML=explanation;
      $(m,'.table-mean').innerHTML=stages.includes('fx')&&step===last?math('\\bar{x}=\\frac{\\sum fx}{\\sum f}=\\frac{56}{50}=1.12')+' pets per household<div class=\"sigma-key\">'+math('\\sum fx')+' = sum of '+math('fx')+' values; '+math('\\sum f')+' = sum of '+math('f')+' values.</div>':'';
      $(m,'.build-back').disabled=step===0;$(m,'.build-next').disabled=step===last;$(m,'.build-column').disabled=step===last;
      $(m,'.build-next').innerHTML=step===last?'Table complete':step%rows===0?`Build ${math(stages[Math.floor(step/rows)])}`:'Next entry';
      m.dataset.step=step;typeset(m);
    };
    $(m,'.build-next').onclick=()=>{step=Math.min(last,step+1);draw();};
    $(m,'.build-back').onclick=()=>{step=Math.max(0,step-1);draw();};
    $(m,'.build-column').onclick=()=>{step=Math.min(last,(Math.floor(step/rows)+1)*rows);draw();};
    $(m,'.build-reset').onclick=()=>{step=0;draw();};draw();
  }
  function statLocator(m){
    const d=datasets[m.dataset.set],cf=cumulative(d.f),n=sum(d.f);let chosen='';
    m.innerHTML='<div class="table-wrap"></div><div class="toolbar"><button data-stat="mode">Mode</button><button data-stat="range">Range</button><button data-stat="median">Median</button><button data-stat="quartiles">Quartiles and IQR</button><button class="stat-reset">Reset</button></div><div class="stat-working" aria-live="polite"></div>';
    const rowFor=p=>cf.findIndex(c=>c>=p);
    const draw=()=>{
      let selected=[],working='Choose a statistic. Which rows or ordered positions matter?';
      if(chosen==='mode'){selected=[d.f.indexOf(Math.max(...d.f))];working=`The greatest frequency is 20, belonging to ${math('x=1')}. <strong>Mode = 1 pet.</strong>`;}
      if(chosen==='range'){selected=[0,d.values.length-1];working=`Maximum − minimum: ${math('4-0=4')}. <strong>Range = 4 pets.</strong>`;}
      if(chosen==='median'){selected=[rowFor(n/2),rowFor(n/2+1)];working=`${math('n=50')}: locate observations <strong>25 and 26</strong>. Both are in positions 16–35, where ${math('x=1')}.<br>${math('\\mathrm{Median}=\\frac{1+1}{2}=1')}`;}
      if(chosen==='quartiles'){selected=[rowFor(13),rowFor(38)];working=`The lower half has median at position <strong>13</strong>; the upper half at position <strong>38</strong>.<br>${math('Q_1=0,\\quad Q_3=2,\\quad \\mathrm{IQR}=2-0=2')}`;}
      $(m,'.table-wrap').innerHTML='<table><thead><tr><th>'+math('x')+'</th><th>'+math('f')+'</th><th>'+math('cf')+'</th><th>Positions in the ordered data</th></tr></thead><tbody>'+d.values.map((x,i)=>`<tr class="${selected.includes(i)?'stat-active':''}"><td>${x}</td><td>${d.f[i]}</td><td>${cf[i]}</td><td>${(cf[i]-d.f[i]+1)===cf[i]?cf[i]:`${cf[i]-d.f[i]+1}–${cf[i]}`}</td></tr>`).join('')+'</tbody></table>';
      $(m,'.stat-working').innerHTML=working;$$(m,'[data-stat]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.stat===chosen)));typeset(m);
    };
    $$(m,'[data-stat]').forEach(b=>b.onclick=()=>{chosen=b.dataset.stat;draw();});$(m,'.stat-reset').onclick=()=>{chosen='';draw();};draw();
  }
  function histogramFeatures(m){
    let continuous=false;
    m.innerHTML='<div class="toolbar"><button data-kind="discrete" aria-pressed="true">Discrete integer data</button><button data-kind="continuous" aria-pressed="false">Continuous data</button></div><div class="feature-plot"></div><div class="feature-caption" aria-live="polite"></div>';
    const draw=()=>{
      const f=[2,5,4,1],L=100,R=850,T=32,B=305,xmin=continuous?-.5:0,xmax=continuous?4.5:5,sx=x=>L+(x-xmin)/(xmax-xmin)*(R-L),sy=y=>B-y/6*(B-T);
      let g='';for(let y=0;y<=6;y++)g+=`<line x1="${L}" y1="${sy(y)}" x2="${R}" y2="${sy(y)}" stroke="#d7d8ce"/>`+text(L-18,sy(y)+7,y,'text-anchor="end"');
      f.forEach((v,i)=>{const left=continuous?i:i+.5,right=left+1;g+=`<rect x="${sx(left)}" y="${sy(v)}" width="${sx(right)-sx(left)}" height="${B-sy(v)}" fill="#007f78" fill-opacity=".7" stroke="white" stroke-width="2"/>`;});
      g+=`<path d="M${L} ${T}V${B}H${R}" stroke="#152e3b" stroke-width="2" fill="none"/>`;
      for(let x=0;x<=4;x++)g+=`<line x1="${sx(x)}" y1="${B}" x2="${sx(x)}" y2="${B+7}" stroke="#152e3b"/>`+text(sx(x),B+30,x,'text-anchor="middle"');
      g+=text(27,(T+B)/2,'Frequency',`transform="rotate(-90 27 ${(T+B)/2})" text-anchor="middle" font-size="26"`);
      g+=text((L+R)/2,392,continuous?'Time (seconds)':'Number of items','text-anchor="middle" font-size="26"');
      const firstEdge=continuous?0:.5;
      g+=`<path class="leading-gap" d="M${L} 348v12H${sx(firstEdge)}v-12" fill="none" stroke="#b55224" stroke-width="3"/>`+text(L,390,'½-column gap','font-size="20" fill="#b55224"');
      if(continuous){const mid=(L+sx(0))/2;g+=`<path class="axis-break" d="M${mid-9} ${B+5}l7 -10m1 10l7 -10" stroke="#152e3b" stroke-width="2" fill="none"/>`;}
      if(!continuous){
        g+=text(sx(2),28,'Values at bar centres','text-anchor="middle" font-size="23" fill="#3b66a8"');
        g+=`<line x1="${sx(2)}" y1="40" x2="${sx(2)}" y2="${B}" stroke="#3b66a8" stroke-dasharray="7 5" stroke-width="2"/>`;
      }else{
        [1,2].forEach(x=>g+=`<line x1="${sx(x)}" y1="38" x2="${sx(x)}" y2="${B}" stroke="#3b66a8" stroke-dasharray="7 5" stroke-width="2"/>`);
        g+=text(sx(1.5),27,'Class: 1 ≤ t < 2','text-anchor="middle" font-size="23" fill="#3b66a8"');
      }
      $(m,'.feature-plot').innerHTML=makeSvg(g,continuous?'Continuous histogram with a half-column leading gap before boundary zero; class labels at the boundaries':'Discrete histogram with centred integer values and half-column leading gap',420);
      $(m,'.feature-caption').innerHTML=continuous?'Keep a <strong>half-column gap before 0</strong>. The labels still mark the correct <strong>lower and upper class boundaries</strong>.':'The integer labels sit at <strong>bar centres</strong>. The half-column gap is before the first bar; adjacent bars touch.';
      $$(m,'[data-kind]').forEach(b=>b.setAttribute('aria-pressed',String((b.dataset.kind==='continuous')===continuous)));
    };
    $$(m,'[data-kind]').forEach(b=>b.onclick=()=>{continuous=b.dataset.kind==='continuous';draw();});draw();
  }
  function ogiveIntro(m){
    const bounds=[.5,1.5,2.5,3.5,4.5],counts=[0,2,7,11,12];
    const L=110,R=835,T=48,B=365,xmin=bounds[0]-.5,xmax=bounds.at(-1)+.5,sx=x=>L+(x-xmin)/(xmax-xmin)*(R-L),sy=y=>B-y/12*(B-T);
    let g='';
    for(let y=0;y<=12;y+=2)g+=`<line x1="${L}" y1="${sy(y)}" x2="${R}" y2="${sy(y)}" stroke="#d7d8ce"/>`+text(L-20,sy(y)+8,y,'text-anchor="end" font-size="25"');
    bounds.slice(0,-1).forEach((left,i)=>{
      g+=`<rect class="ogive-intro-bar" x="${sx(left)}" y="${sy(counts[i+1])}" width="${sx(bounds[i+1])-sx(left)}" height="${B-sy(counts[i+1])}" fill="#007f78" fill-opacity=".16" stroke="#007f78" stroke-opacity=".3" stroke-width="2"><title>Cumulative frequency ${counts[i+1]} at upper boundary ${bounds[i+1]}</title></rect>`;
    });
    g+=`<path d="M${L} ${T}V${B}H${R}" stroke="#152e3b" stroke-width="3" fill="none"/>`;
    bounds.forEach(x=>g+=text(sx(x),B+38,fmt(x),'text-anchor="middle" font-size="26"'));
    g+=`<polyline points="${bounds.map((x,i)=>`${sx(x)},${sy(counts[i])}`).join(' ')}" stroke="#007f78" stroke-width="5" fill="none"/>`;
    bounds.forEach((x,i)=>g+=`<circle cx="${sx(x)}" cy="${sy(counts[i])}" r="7" fill="#007f78"/>`);
    g+=text(sx(2.5)+20,sy(7)+4,'cf = 7','font-size="28" fill="#007f78"');
    g+=`<path class="cumulative-leading-gap" d="M${L} 416v10H${sx(bounds[0])}v-10" fill="none" stroke="#b55224" stroke-width="3"/>`+text(L,452,'½-column gap','font-size="22" fill="#b55224"');
    g+=text((L+R)/2,452,'Upper class boundary','text-anchor="middle" font-size="29"');
    g+=text(32,(T+B)/2,'Cumulative frequency',`transform="rotate(-90 32 ${(T+B)/2})" text-anchor="middle" font-size="28"`);
    m.innerHTML=makeSvg(g,'Cumulative frequency histogram with a half-column leading gap and heights 2, 7, 11 and 12; an ogive joins the initial zero point and the top-right corner of each bar, at upper boundaries 1.5, 2.5, 3.5 and 4.5',485);
  }
  function ogive(m){
    const d=datasets[m.dataset.set],n=sum(d.f);let width=1,built=0,points=false,joined=false,median=false,selected=-1;
    m.innerHTML='<div class="ogive-controls toolbar"><button class="ogive-next primary">Next bar</button><button class="ogive-all">Show all bars</button><button class="ogive-points" aria-pressed="false">Show points</button><button class="ogive-join" aria-pressed="false">Join ogive</button><button class="ogive-median" aria-pressed="false">Median guides</button><label>Class width <select class="ogive-width"><option value="1">1</option><option value="2">2</option></select></label><button class="ogive-reset">Reset</button></div><div class="ogive-layout"><div class="ogive-table"></div><div class="ogive-plot"></div></div><div class="ogive-reading" aria-live="polite"></div>';
    const draw=()=>{
      const bins=binData(d,width),cf=cumulative(bins.map(b=>b.f));built=Math.min(built,bins.length);
      const middle=[n/2,n/2+1],middleRows=middle.map(p=>cf.findIndex(c=>c>=p));
      let h='<table><thead><tr><th>'+(width===1?'Score':'Scores')+'</th><th>'+math('f')+'</th><th>'+math('cf')+'</th></tr></thead><tbody>';
      bins.forEach((b,i)=>h+=`<tr class="${i===selected?'ogive-selected':''} ${median&&middleRows.includes(i)?'median-row':''}"><td><button class="ogive-row" data-row="${i}" aria-pressed="${i===selected}">${width===1?d.values[i]:`${b.left+.5}–${b.right-.5}`}</button></td><td>${b.f}</td><td>${cf[i]}</td></tr>`);
      $(m,'.ogive-table').innerHTML=h+'</tbody></table>';
      const L=83,R=835,T=28,B=350,xmin=bins[0].left-width/2,xmax=bins.at(-1).right+width/2,sx=x=>L+(x-xmin)/(xmax-xmin)*(R-L),sy=y=>B-y/n*(B-T);
      let g='';for(let y=0;y<=n;y+=10)g+=`<line x1="${L}" y1="${sy(y)}" x2="${R}" y2="${sy(y)}" stroke="#d7d8ce"/>`+text(L-14,sy(y)+7,y,'text-anchor="end"');
      bins.slice(0,built).forEach((b,i)=>{g+=`<rect class="ogive-bar" data-row="${i}" x="${sx(b.left)}" y="${sy(cf[i])}" width="${sx(b.right)-sx(b.left)}" height="${B-sy(cf[i])}" fill="${median&&middleRows.includes(i)?'#b55224':i===selected?'#3b66a8':'#007f78'}" fill-opacity=".48" stroke="white" stroke-width="2"><title>${cf[i]} observations up to ${b.right-.5}</title></rect>`;});
      g+=`<path d="M${L} ${T}V${B}H${R}" stroke="#152e3b" stroke-width="2" fill="none"/>`;
      const edges=[bins[0].left,...bins.map(b=>b.right)];edges.forEach(x=>g+=text(sx(x),B+29,fmt(x),'text-anchor="middle" font-size="20"'));
      g+=text((L+R)/2,417,'Score (class boundaries)','text-anchor="middle" font-size="25"')+text(22,(T+B)/2,'Cumulative frequency',`transform="rotate(-90 22 ${(T+B)/2})" text-anchor="middle" font-size="23"`);
      const coords=[[bins[0].left,0],...bins.map((b,i)=>[b.right,cf[i]])];
      if(joined)g+=`<polyline points="${coords.map(([x,y])=>`${sx(x)},${sy(y)}`).join(' ')}" stroke="#3b66a8" stroke-width="3" fill="none"/>`;
      if(points)coords.forEach(([x,y])=>g+=`<circle cx="${sx(x)}" cy="${sy(y)}" r="5" fill="#3b66a8"/>`);
      let reading='Build the running totals. Select a table row or bar to interpret it.';
      if(selected>=0){const b=bins[selected],prior=selected?cf[selected-1]:0;reading=`${cf[selected]} students scored at most ${b.right-.5}. This row contains observations ${prior+1}–${cf[selected]}.`;}
      if(median){
        const i=cf.findIndex(c=>c>=n/2),prior=i?cf[i-1]:0,estimate=bins[i].left+(n/2-prior)/bins[i].f*width;
        g+=`<path d="M${L} ${sy(n/2)}H${sx(estimate)}V${B}" stroke="#b55224" stroke-width="3" stroke-dasharray="8 5" fill="none"/>`+text(L+8,sy(n/2)-12,'20 = 50% of 40','font-size="22" fill="#b55224"');
        g+=`<circle cx="${sx(estimate)}" cy="${sy(n/2)}" r="6" fill="#b55224"/>`;
        reading=width===1?`<strong>Exact median:</strong> observations 20 and 21 are both 6 (positions 16–23). ${math('\\mathrm{Median}=6')}. <strong>Ogive estimate:</strong> ${math('\\approx 6.1')}.`:`<strong>Grouped table:</strong> observations 20 and 21 lie in the 5–6 group. The exact median cannot be recovered from these groups alone. <strong>Ogive estimate:</strong> ${math('\\approx 6.07')}.`;
      }
      $(m,'.ogive-plot').innerHTML=makeSvg(g,'Cumulative frequency histogram with a half-column leading gap and optional upper-boundary ogive for 40 quiz scores',440);
      $(m,'.ogive-reading').innerHTML=reading;
      $(m,'.ogive-next').disabled=built===bins.length;$(m,'.ogive-all').disabled=built===bins.length;
      [['points',points],['join',joined],['median',median]].forEach(([name,on])=>$(m,`.ogive-${name}`).setAttribute('aria-pressed',String(on)));
      m.dataset.built=built;m.dataset.width=width;m.dataset.median=String(median);
      $$(m,'[data-row]').forEach(el=>el.onclick=()=>{selected=Number(el.dataset.row);built=Math.max(built,selected+1);draw();});typeset(m);
    };
    $(m,'.ogive-next').onclick=()=>{selected=built;built++;draw();};
    $(m,'.ogive-all').onclick=()=>{built=binData(d,width).length;selected=-1;draw();};
    $(m,'.ogive-points').onclick=()=>{points=!points;if(!points){joined=false;median=false;}else built=binData(d,width).length;draw();};
    $(m,'.ogive-join').onclick=()=>{joined=!joined;if(joined){points=true;built=binData(d,width).length;}else median=false;draw();};
    $(m,'.ogive-median').onclick=()=>{median=!median;if(median){points=true;joined=true;built=binData(d,width).length;selected=-1;}draw();};
    $(m,'.ogive-width').onchange=e=>{width=Number(e.target.value);built=0;points=false;joined=false;median=false;selected=-1;draw();};
    $(m,'.ogive-reset').onclick=()=>{width=1;built=0;points=false;joined=false;median=false;selected=-1;$(m,'.ogive-width').value='1';draw();};draw();
  }
  function fibonacci(m){
    const values=[1,1,2,3,5,8,13,21];let shown=2;
    const previous=tex=>`\\textcolor{#3b66a8}{${tex}}`;
    const before=tex=>`\\textcolor{#b55224}{${tex}}`;
    const rule=`a_n&=${previous('a_{n-1}')}+${before('a_{n-2}')}`;
    m.innerHTML='<div class="fibonacci-terms"></div><div class="toolbar"><button class="fibonacci-next primary">Next term</button><button class="fibonacci-reset">Reset</button><span class="fibonacci-domain">'+math('n\\ge3')+'</span></div><div class="fibonacci-working" aria-live="polite"></div>';
    const draw=()=>{
      $(m,'.fibonacci-terms').innerHTML=values.map((v,i)=>{
        const role=shown>2?(i===shown-2?' previous':i===shown-3?' before':i===shown-1?' newest':''):'';
        return `<div class="fibonacci-term${role}"><span class="term-index">${math(`a_{${i+1}}`)}</span><span class="term-value">${i<shown?math(String(v)):'?'}</span></div>`;
      }).join('');
      const lines=[rule];
      if(shown>2){
        lines.push(`a_{${shown}}&=${previous(`a_{${shown-1}}`)}+${before(`a_{${shown-2}}`)}`);
        lines.push(`a_{${shown}}&=${previous(String(values[shown-2]))}+${before(String(values[shown-3]))}`);
        lines.push(`a_{${shown}}&=${values[shown-1]}`);
      }
      $(m,'.fibonacci-working').innerHTML='<div class="fibonacci-calculation">'+math('\\begin{aligned}'+lines.join('\\\\')+'\\end{aligned}')+'</div><p class="fibonacci-explanation">'+(shown===2?'Predict the next term. ':'')+'Add the <span class="previous">previous term</span> and the <span class="before">term before it</span>.</p>';
      $(m,'.fibonacci-next').disabled=shown===values.length;m.dataset.shown=String(shown);typeset(m);
    };
    $(m,'.fibonacci-next').addEventListener('click',()=>{if(shown<values.length)shown++;draw();});
    $(m,'.fibonacci-reset').addEventListener('click',()=>{shown=2;draw();});draw();
  }
  function oddSquare(m){
    const limit=6;let n=1;const revealed=new Set([1]);
    m.innerHTML='<div class="toolbar"><button class="square-back">Previous layer</button><button class="square-next primary">Next layer</button><button class="square-reveal">Reveal counts</button><button class="square-reset">Reset</button></div><div class="square-build-layout"><div><div class="square-plot"></div><p class="square-legend"><span class="old-layer-key">Earlier dots</span><span class="new-layer-key">New layer</span></p></div><div class="square-record"></div></div><div class="square-total" aria-live="polite"></div>';
    const draw=()=>{
      const step=44,x0=210-(n-1)*step/2,y0=171+(n-1)*step/2;let dots='';
      for(let row=0;row<n;row++)for(let col=0;col<n;col++){
        const isNew=row===n-1||col===n-1;
        dots+=`<circle cx="${x0+col*step}" cy="${y0-row*step}" r="14" fill="${isNew?'#b55224':'#007f78'}" data-new="${isNew}"/>`;
      }
      $(m,'.square-plot').innerHTML=`<svg class="square-build-svg" viewBox="0 0 420 342" role="img" aria-label="Square pattern at stage ${n}; the newly added top row and right column are orange" xmlns="http://www.w3.org/2000/svg">${dots}</svg>`;
      const rows=Array.from({length:limit},(_,i)=>{
        const k=i+1,known=k<=n&&revealed.has(k),pending=k===n&&!known;
        return `<tr class="${k===n?'square-current':k>n?'square-future':''}"><th scope="row">${k}</th><td>${known?2*k-1:pending?'?':'—'}</td><td>${known?k*k:pending?'?':'—'}</td></tr>`;
      }).join('');
      $(m,'.square-record').innerHTML=`<table><thead><tr><th scope="col">Stage</th><th scope="col">Added</th><th scope="col">Total</th></tr></thead><tbody>${rows}</tbody></table><p class="small-note">What changes? What stays the same?</p>`;
      $(m,'.square-total').innerHTML=revealed.has(n)?math(Array.from({length:n},(_,i)=>2*i+1).join('+')+'='+n*n):'Count the new layer and the total, then reveal.';
      $(m,'.square-back').disabled=n===1;$(m,'.square-next').disabled=n===limit;
      $(m,'.square-reveal').disabled=revealed.has(n);$(m,'.square-reveal').textContent=revealed.has(n)?'Counts shown':'Reveal counts';
      m.dataset.stage=String(n);m.dataset.countsVisible=String(revealed.has(n));typeset(m);
    };
    $(m,'.square-next').onclick=()=>{if(n<limit)n++;draw();};
    $(m,'.square-back').onclick=()=>{if(n>1)n--;draw();};
    $(m,'.square-reveal').onclick=()=>{revealed.add(n);draw();};
    $(m,'.square-reset').onclick=()=>{n=1;revealed.clear();revealed.add(1);draw();};draw();
  }
  function sigmaIndices(m){
    let first=3,last=7,revealed=false;
    const options=Array.from({length:10},(_,i)=>`<option value="${i+1}">${i+1}</option>`).join('');
    m.innerHTML=`<div class="toolbar"><label>First index <select class="sigma-first" aria-label="First index">${options}</select></label><label>Last index <select class="sigma-last" aria-label="Last index">${options}</select></label><button class="sigma-count primary" aria-expanded="false">Reveal count</button><button class="sigma-reset">Reset</button></div><div class="sigma-live-expression"></div><div class="sigma-index-strip" aria-label="Included indices"></div><div class="sigma-expanded"></div><div class="sigma-count-result" aria-live="polite"></div>`;
    const draw=()=>{
      const indices=Array.from({length:last-first+1},(_,i)=>first+i);
      $(m,'.sigma-first').value=String(first);$(m,'.sigma-last').value=String(last);
      $(m,'.sigma-live-expression').innerHTML=math(`\\displaystyle\\sum_{\\textcolor{#3b66a8}{k=${first}}}^{\\textcolor{#3b66a8}{${last}}}a_k`);
      $(m,'.sigma-index-strip').innerHTML=indices.map(k=>`<span class="sigma-index">${math(`k=${k}`)}</span>`).join('');
      $(m,'.sigma-expanded').innerHTML=math(indices.map(k=>`a_{${k}}`).join('+'));
      $(m,'.sigma-count-result').innerHTML=revealed?math(`${last}-${first}+1=${indices.length}`)+' term'+(indices.length===1?'':'s')+'<p>Upper limit − lower limit + 1</p>':'How many terms are included?';
      $(m,'.sigma-count').textContent=revealed?'Hide count':'Reveal count';$(m,'.sigma-count').setAttribute('aria-expanded',String(revealed));
      m.dataset.first=String(first);m.dataset.last=String(last);m.dataset.count=String(indices.length);m.dataset.revealed=String(revealed);typeset(m);
    };
    $(m,'.sigma-first').onchange=e=>{first=Number(e.target.value);last=Math.max(first,last);revealed=false;draw();};
    $(m,'.sigma-last').onchange=e=>{last=Number(e.target.value);first=Math.min(first,last);revealed=false;draw();};
    $(m,'.sigma-count').onclick=()=>{revealed=!revealed;draw();};
    $(m,'.sigma-reset').onclick=()=>{first=3;last=7;revealed=false;draw();};draw();
  }
  function arithmeticGraph(m){
    let first=2,difference=5,lineVisible=false;
    m.innerHTML=`<div class="ap-controls"><label>First term ${math('a')} <output class="ap-first-value"></output><input class="ap-first" type="range" min="-10" max="30" step="1" value="2" aria-label="First term a"></label><label>Common difference ${math('d')} <output class="ap-difference-value"></output><input class="ap-difference" type="range" min="-6" max="6" step="1" value="5" aria-label="Common difference d"></label><button class="ap-line-toggle primary" aria-pressed="false">Show generating line</button><button class="ap-reset">Reset</button></div><div class="ap-presets"><span>Try:</span><button data-ap-preset="increasing">Increasing</button><button data-ap-preset="decreasing">Decreasing</button><button data-ap-preset="constant">Constant</button></div><div class="ap-graph-layout"><div class="ap-plot-wrap"><div class="ap-plot"></div><span class="ap-axis-horizontal"></span><span class="ap-axis-vertical"></span><p class="ap-plot-caption">Eight sequence terms shown; the first term is blue.</p></div><div class="ap-graph-summary" aria-live="polite"><div class="ap-sequence-rule"></div><div class="ap-first-term"></div><div class="ap-line-summary" hidden></div></div></div>`;
    const linear=(variable)=>{
      const intercept=first-difference;
      if(difference===0)return String(first);
      const coefficient=difference===1?'':difference===-1?'-':String(difference);
      return coefficient+variable+(intercept===0?'':(intercept>0?'+':'-')+Math.abs(intercept));
    };
    const draw=()=>{
      $(m,'.ap-first').value=String(first);$(m,'.ap-difference').value=String(difference);
      $(m,'.ap-first-value').innerHTML=math(String(first));$(m,'.ap-difference-value').innerHTML=math(String(difference));
      const rule=difference===0?String(first):`${first}${difference<0?'-':'+'}${Math.abs(difference)}(n-1)`;
      $(m,'.ap-sequence-rule').innerHTML='<h3>Sequence rule</h3>'+math(`a_n=${rule}`);
      $(m,'.ap-first-term').innerHTML='<h3>First term</h3>'+math(`a_1=${first}`);
      $(m,'.ap-line-summary').hidden=!lineVisible;
      $(m,'.ap-line-summary').innerHTML='<h3>Generating line</h3>'+math(`y=${linear('x')}`)+'<p>'+math(`m=d=${difference}`)+'</p><h3>Line intercept</h3>'+math(`f(0)=a-d=${first-difference}`);
      $(m,'.ap-line-toggle').textContent=lineVisible?'Hide generating line':'Show generating line';
      $(m,'.ap-line-toggle').setAttribute('aria-pressed',String(lineVisible));
      $(m,'.ap-axis-horizontal').innerHTML=math(lineVisible?'x':'n');
      $(m,'.ap-axis-vertical').innerHTML=math(lineVisible?'y':'a_n');
      const L=70,R=780,T=25,B=330,sx=x=>L+x/8.5*(R-L),sy=y=>B-(y+60)/140*(B-T);
      let body='';
      for(let y=-60;y<=80;y+=20)body+=`<line x1="${L}" y1="${sy(y)}" x2="${R}" y2="${sy(y)}" stroke="#d7d8ce"/>`+text(L-12,sy(y)+7,String(y),'text-anchor="end" font-size="21"');
      for(let n=1;n<=8;n++)body+=`<line x1="${sx(n)}" y1="${T}" x2="${sx(n)}" y2="${B}" stroke="#e8e7df"/>`+text(sx(n),B+29,String(n),'text-anchor="middle" font-size="21"');
      body+=text(L,B+29,'0','text-anchor="middle" font-size="21"');
      body+=`<path d="M${L} ${T}V${B}M${L} ${sy(0)}H${R}" fill="none" stroke="#152e3b" stroke-width="2"/>`;
      if(lineVisible){
        body+=`<line class="ap-generating-line" x1="${sx(0)}" y1="${sy(first-difference)}" x2="${sx(8.5)}" y2="${sy(first+7.5*difference)}" stroke="#b55224" stroke-width="3"/><circle class="ap-intercept" cx="${sx(0)}" cy="${sy(first-difference)}" r="6" fill="#f7f5ef" stroke="#b55224" stroke-width="3"><title>Line intercept: (0, ${first-difference}); not a sequence term</title></circle>`;
      }
      const values=Array.from({length:8},(_,i)=>first+i*difference);
      values.forEach((value,i)=>{body+=`<circle class="ap-term-point" data-index="${i+1}" data-value="${value}" cx="${sx(i+1)}" cy="${sy(value)}" r="${i===0?7:6}" fill="${i===0?'#3b66a8':'#007f78'}" stroke="#f7f5ef" stroke-width="2"><title>Term ${i+1}: ${value}</title></circle>`;});
      $(m,'.ap-plot').innerHTML=makeSvg(body,`First eight terms: ${values.join(', ')}. Common difference ${difference}. ${lineVisible?'Generating line and its intercept shown.':'Generating line hidden.'}`,390,820);
      m.dataset.first=String(first);m.dataset.difference=String(difference);m.dataset.lineVisible=String(lineVisible);m.dataset.intercept=String(first-difference);
      typeset(m);
    };
    $(m,'.ap-first').addEventListener('input',e=>{first=Number(e.target.value);draw();});
    $(m,'.ap-difference').addEventListener('input',e=>{difference=Number(e.target.value);draw();});
    $(m,'.ap-line-toggle').onclick=()=>{lineVisible=!lineVisible;draw();};
    $(m,'.ap-reset').onclick=()=>{first=2;difference=5;lineVisible=false;draw();};
    $$(m,'[data-ap-preset]').forEach(button=>button.onclick=()=>{
      [first,difference]=({increasing:[2,5],decreasing:[20,-3],constant:[7,0]})[button.dataset.apPreset];draw();
    });draw();
  }
  function geometricGraph(m){
    let first=3,ratio=2,curveVisible=false;
    const firstChoices=[-12,-6,-3,-1,1,2,3,5,6,12,24,48];
    const ratioChoices=[-2,-1,-.5,.25,.5,1,1.5,2,3];
    const options=values=>values.map(value=>`<option value="${value}">${value}</option>`).join('');
    const ratioTex=()=>({'-0.5':'-\\frac12','0.25':'\\frac14','0.5':'\\frac12','1.5':'\\frac32'})[String(ratio)]||String(ratio);
    const rule=variable=>ratio===1?String(first):`${first}\\left(${ratioTex()}\\right)^{${variable}-1}`;
    m.addEventListener('keydown',e=>{if(e.target.closest('button,select'))e.stopPropagation();});
    m.innerHTML=`<div class="gp-controls"><label>First term ${math('a')} <select class="gp-first" aria-label="First term a">${options(firstChoices)}</select></label><label>Common ratio ${math('r')} <select class="gp-ratio" aria-label="Common ratio r">${options(ratioChoices)}</select></label><button class="gp-curve-toggle primary" aria-pressed="false">Show generating curve</button><button class="gp-reset">Reset</button></div><div class="gp-presets"><span>Try:</span><button data-gp-preset="growth">Growth</button><button data-gp-preset="decay">Decay</button><button data-gp-preset="constant">Constant</button><button data-gp-preset="alternating">Alternating</button></div><div class="gp-graph-layout"><div class="gp-plot-wrap"><div class="gp-plot"></div><span class="gp-axis-horizontal"></span><span class="gp-axis-vertical"></span><p class="gp-plot-caption">Eight terms shown. First term in blue. Vertical scale adjusts.</p></div><div class="gp-graph-summary" aria-live="polite"><h3>Sequence rule</h3><div class="gp-sequence-rule"></div><h3>First four terms</h3><div class="gp-four-terms"></div><p class="gp-behaviour"></p><div class="gp-curve-summary" hidden></div><p class="gp-negative-note" hidden>Negative ratio: alternating points, with no ordinary real exponential curve.</p></div></div>`;
    const draw=()=>{
      if(ratio<0)curveVisible=false;
      const values=Array.from({length:8},(_,i)=>first*Math.pow(ratio,i));
      $(m,'.gp-first').value=String(first);$(m,'.gp-ratio').value=String(ratio);
      $(m,'.gp-sequence-rule').innerHTML=math(`a_n=${rule('n')}`);
      $(m,'.gp-four-terms').innerHTML=math(values.slice(0,4).map(String).join(',\\ '));
      $$(m,'[data-gp-preset]').forEach(button=>{
        const pair=({growth:[3,2],decay:[48,.5],constant:[5,1],alternating:[5,-1]})[button.dataset.gpPreset];
        button.setAttribute('aria-pressed',String(first===pair[0]&&ratio===pair[1]));
      });
      let behaviour;
      if(ratio===1)behaviour='All terms are equal.';
      else if(ratio===-1)behaviour='Signs alternate and magnitudes stay constant.';
      else if(Math.abs(ratio)<1)behaviour=ratio<0?'Signs alternate and magnitudes approach zero.':`Terms approach zero from ${first>0?'above':'below'}.`;
      else behaviour=ratio<0?'Signs alternate and magnitudes grow.':`Terms move away from zero ${first>0?'above':'below'} the axis.`;
      $(m,'.gp-behaviour').textContent=behaviour;
      const toggle=$(m,'.gp-curve-toggle');toggle.disabled=ratio<0;
      toggle.textContent=ratio<0?'No real exponential curve':curveVisible?'Hide generating curve':'Show generating curve';
      toggle.setAttribute('aria-pressed',String(curveVisible));
      $(m,'.gp-negative-note').hidden=ratio>0;
      $(m,'.gp-curve-summary').hidden=!curveVisible;
      $(m,'.gp-curve-summary').innerHTML='<h3>Generating '+(ratio===1?'line':'curve')+'</h3>'+math(`f(x)=${rule('x')}`);
      $(m,'.gp-axis-horizontal').innerHTML=math(curveVisible?'x':'n');
      $(m,'.gp-axis-vertical').innerHTML=math(curveVisible?'y':'a_n');
      // Stable numeric bounds for a given sequence, regardless of curve visibility.
      const magnitude=Math.max(...values.map(Math.abs));
      const rawStep=magnitude/4,power=10**Math.floor(Math.log10(rawStep));
      const step=[1,2,2.5,5,10].find(v=>v>=rawStep/power)*power;
      const bound=Math.ceil(magnitude/step)*step;
      const ymin=Math.min(...values)<0?-bound:0,ymax=Math.max(...values)>0?bound:0;
      const L=84,R=790,T=28,B=330,sx=x=>L+x/8.5*(R-L),sy=y=>B-(y-ymin)/(ymax-ymin)*(B-T);
      let body='';
      for(let y=ymin;y<=ymax+step/100;y+=step){
        const label=fmt(Math.abs(y)<step/100?0:y);
        body+=`<line x1="${L}" y1="${sy(y)}" x2="${R}" y2="${sy(y)}" stroke="#d7d8ce"/>`+text(L-12,sy(y)+7,label,'text-anchor="end" font-size="20"');
      }
      for(let n=1;n<=8;n++)body+=`<line x1="${sx(n)}" y1="${T}" x2="${sx(n)}" y2="${B}" stroke="#e8e7df"/>`+text(sx(n),B+29,String(n),'text-anchor="middle" font-size="21"');
      body+=text(L,B+29,'0','text-anchor="middle" font-size="21"');
      body+=`<path d="M${L} ${T}V${B}M${L} ${sy(0)}H${R}" fill="none" stroke="#152e3b" stroke-width="2"/>`;
      if(curveVisible){
        const path=Array.from({length:281},(_,i)=>{const x=1+i/40;return `${i?'L':'M'}${sx(x)} ${sy(first*Math.pow(ratio,x-1))}`;}).join(' ');
        body+=`<path class="gp-generating-curve" d="${path}" fill="none" stroke="#b55224" stroke-width="3"/>`;
      }
      values.forEach((value,i)=>{body+=`<circle class="gp-term-point" data-index="${i+1}" data-value="${value}" cx="${sx(i+1)}" cy="${sy(value)}" r="${i===0?7:6}" fill="${i===0?'#3b66a8':'#007f78'}" stroke="#f7f5ef" stroke-width="2"><title>Term ${i+1}: ${value}</title></circle>`;});
      $(m,'.gp-plot').innerHTML=makeSvg(body,`First eight terms: ${values.join(', ')}. Common ratio ${ratio}. ${curveVisible?'Continuous generating curve shown for inputs 1 through 8.':'Discrete points only.'}`,390,830);
      m.dataset.first=String(first);m.dataset.ratio=String(ratio);m.dataset.curveVisible=String(curveVisible);
      m.dataset.ymin=String(ymin);m.dataset.ymax=String(ymax);typeset(m);
    };
    $(m,'.gp-first').onchange=e=>{first=Number(e.target.value);draw();};
    $(m,'.gp-ratio').onchange=e=>{ratio=Number(e.target.value);draw();};
    $(m,'.gp-curve-toggle').onclick=()=>{if(ratio>0)curveVisible=!curveVisible;draw();};
    $(m,'.gp-reset').onclick=()=>{first=3;ratio=2;curveVisible=false;draw();};
    $$(m,'[data-gp-preset]').forEach(button=>button.onclick=()=>{
      [first,ratio]=({growth:[3,2],decay:[48,.5],constant:[5,1],alternating:[5,-1]})[button.dataset.gpPreset];draw();
    });draw();
  }
  function gaussPairing(m){
    m.addEventListener('keydown',e=>{if(e.target.closest('button,input,select'))e.stopPropagation();});
    let n=100,stage=0;
    const choices=[5,6,9,10,100];
    m.innerHTML=`<div class="ar-pair-toolbar"><label>Number of terms ${math('n')} <select class="ar-pair-n" aria-label="Number of terms">${choices.map(v=>`<option value="${v}"${v===100?' selected':''}>${v}</option>`).join('')}</select></label><button class="ar-pair-prev">Previous step</button><button class="ar-pair-next primary">Show reversed sum</button><button class="ar-pair-reset">Reset</button></div><div class="ar-pair-rows"></div><div class="ar-pair-explanation" aria-live="polite"></div><div class="ar-pair-result" hidden></div>`;
    const draw=()=>{
      const indices=n<=6?Array.from({length:n},(_,i)=>i+1):[1,2,3,null,n-1,n];
      const color=k=>k===null?'#607078':Math.min(k-1,n-k)===0?'#3b66a8':Math.min(k-1,n-k)===1?'#007f78':'#b55224';
      const row=(label,reverse,total,visible)=>`<div class="ar-pair-row${total?' ar-pair-total':''}" style="grid-template-columns:110px repeat(${indices.length},minmax(0,1fr))"${visible?'':' hidden'}><span class="ar-pair-label">${math(label)}</span>${indices.map((k,i)=>`<span class="ar-pair-cell${i?' ar-pair-plus':''}"${k===null?'':` data-column="${k}" data-value="${total?n+1:reverse?n+1-k:k}"`}>${math(k===null?'\\cdots':`\\textcolor{${color(k)}}{${total?n+1:reverse?n+1-k:k}}`)}</span>`).join('')}</div>`;
      $(m,'.ar-pair-rows').innerHTML=row('S=',false,false,true)+row('S=',true,false,stage>=1)+row('2S=',false,true,stage>=2);
      const explain=[`One copy of ${math('S')}. Predict what changes when we reverse the order.`,`Both rows have the same total ${math('S')}. What will each column add to?`,`All ${math(String(n))} columns total ${math(String(n+1))}.`,`We have two copies of ${math('S')}, so divide by ${math('2')}.`];
      $(m,'.ar-pair-explanation').innerHTML=explain[stage];
      const result=$(m,'.ar-pair-result');result.hidden=stage<3;
      result.innerHTML=`<div>${math(`2S=${n}\\times${n+1}=${n*(n+1)}`)}</div><div>${math(`S=\\frac{${n}\\times${n+1}}{2}=${n*(n+1)/2}`)}</div>`;
      $(m,'.ar-pair-n').value=String(n);$(m,'.ar-pair-prev').disabled=stage===0;$(m,'.ar-pair-next').disabled=stage===3;
      $(m,'.ar-pair-next').textContent=['Show reversed sum','Show column totals','Show sum','Complete'][stage];
      m.dataset.n=String(n);m.dataset.stage=String(stage);m.dataset.sum=String(n*(n+1)/2);typeset(m);
    };
    $(m,'.ar-pair-n').onchange=e=>{n=Number(e.target.value);stage=0;draw();};
    $(m,'.ar-pair-prev').onclick=()=>{stage=Math.max(0,stage-1);draw();};
    $(m,'.ar-pair-next').onclick=()=>{stage=Math.min(3,stage+1);draw();};
    $(m,'.ar-pair-reset').onclick=()=>{n=100;stage=0;draw();};draw();
  }
  function waterTank(m){
    m.addEventListener('keydown',e=>{if(e.target.closest('button,input,select'))e.stopPropagation();});
    let hours=0,remainingVisible=false,pumpedVisible=false;
    m.innerHTML=`<div class="ar-water-time"><label>Hours <output class="ar-water-hours"></output><input class="ar-water-slider" type="range" min="0" max="25" step="1" value="0" aria-label="Hours since pumping began"></label><button class="ar-water-ten">10 hours</button><button class="ar-water-reset">Reset</button></div><div class="ar-water-display"><div class="ar-water-picture"></div><div class="ar-water-readings" aria-live="polite"><div><h3>Remaining</h3><div class="ar-water-remaining"></div></div><div><h3>Pumped out</h3><div class="ar-water-pumped"></div></div></div></div><div class="ar-water-reveals"><button class="ar-water-show-remaining" aria-expanded="false">Reveal remaining</button><button class="ar-water-show-pumped" aria-expanded="false">Reveal pumped out</button></div>`;
    const draw=()=>{
      const remaining=1500-60*hours,pumped=60*hours,height=200*remaining/1500;
      $(m,'.ar-water-slider').value=String(hours);$(m,'.ar-water-hours').innerHTML=math(`n=${hours}`);
      $(m,'.ar-water-picture').innerHTML=`<svg viewBox="0 0 190 255" role="img" aria-label="Water level after ${hours} hours${hours===25?'; tank empty':''}" xmlns="http://www.w3.org/2000/svg"><text x="90" y="18" text-anchor="middle" fill="#607078" font-family="Arial,sans-serif" font-size="19">1500 L</text><rect class="ar-water-fill" x="30" y="${224-height}" width="120" height="${height}" fill="#3b66a8" fill-opacity=".72"/><path d="M30 24V224H150V24" fill="none" stroke="#152e3b" stroke-width="4"/><line x1="24" y1="24" x2="156" y2="24" stroke="#607078" stroke-dasharray="4 5"/><text x="90" y="249" text-anchor="middle" fill="#607078" font-family="Arial,sans-serif" font-size="19">0 L</text></svg>`;
      $(m,'.ar-water-remaining').innerHTML=remainingVisible?math(`V_{${hours}}=${remaining}\\text{ L}`):'<span class="ar-water-hidden">?</span>';
      $(m,'.ar-water-pumped').innerHTML=pumpedVisible?math(`${pumped}\\text{ L}`):'<span class="ar-water-hidden">?</span>';
      $(m,'.ar-water-show-remaining').textContent=remainingVisible?'Hide remaining':'Reveal remaining';
      $(m,'.ar-water-show-pumped').textContent=pumpedVisible?'Hide pumped out':'Reveal pumped out';
      $(m,'.ar-water-show-remaining').setAttribute('aria-expanded',String(remainingVisible));
      $(m,'.ar-water-show-pumped').setAttribute('aria-expanded',String(pumpedVisible));
      m.dataset.hours=String(hours);m.dataset.remaining=String(remaining);m.dataset.pumped=String(pumped);m.dataset.remainingVisible=String(remainingVisible);m.dataset.pumpedVisible=String(pumpedVisible);typeset(m);
    };
    $(m,'.ar-water-slider').addEventListener('input',e=>{hours=Number(e.target.value);draw();});
    $(m,'.ar-water-ten').onclick=()=>{hours=10;draw();};
    $(m,'.ar-water-reset').onclick=()=>{hours=0;remainingVisible=false;pumpedVisible=false;draw();};
    $(m,'.ar-water-show-remaining').onclick=()=>{remainingVisible=!remainingVisible;draw();};
    $(m,'.ar-water-show-pumped').onclick=()=>{pumpedVisible=!pumpedVisible;draw();};draw();
  }
  function init(){
    const modules={chart,table:frequencyTable,hinge,quiz:hinge,outcomes,classifier,subset,median,boundary,coin,'class-estimate':classEstimate,'variable-comparison':variableComparison,'reveal-panel':revealPanel,'table-builder':tableBuilder,'stat-locator':statLocator,'histogram-features':histogramFeatures,'ogive-intro':ogiveIntro,ogive,fibonacci,'odd-square':oddSquare,'sigma-indices':sigmaIndices,'arithmetic-graph':arithmeticGraph,'geometric-graph':geometricGraph,'gauss-pairing':gaussPairing,'water-tank':waterTank};
    $$ (document,'[data-module]').forEach(m=>{const fn=modules[m.dataset.module];if(fn&&!m.dataset.ready){m.dataset.ready='true';fn(m);}});
    typeset(document);
    if (!window.katex) window.addEventListener('load', () => typeset(document), {once:true});
    document.addEventListener('keydown',e=>{if(e.target.closest('button,input,select,textarea'))e.stopPropagation();});
    const wait=()=>{
      if(!window.Reveal?.isReady()){setTimeout(wait,50);return;}
      const nav=document.createElement('nav');nav.id='lesson-navigation';nav.setAttribute('aria-label','Lesson navigation');
      nav.innerHTML='<div class="nav-group"><a class="topic-link" href="index.html">Topic lessons</a><button class="overview">Slide map</button></div><div class="nav-group"><button class="prev">← Previous</button><button class="next">Next →</button></div>';
      $(nav,'.topic-link').setAttribute('href',document.querySelector('meta[name="lesson-topic-url"]')?.content || 'index.html');
      document.body.append(nav);$(nav,'.prev').onclick=()=>Reveal.prev();$(nav,'.next').onclick=()=>Reveal.next();slideMap($(nav,'.overview'));
      const refresh=()=>{$(nav,'.prev').disabled=Reveal.isFirstSlide();$(nav,'.next').disabled=Reveal.isLastSlide();timers.forEach(t=>{if(!Reveal.getCurrentSlide().contains(t.element))t.pause();});};
      Reveal.on('slidechanged',refresh);refresh();
    };wait();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
