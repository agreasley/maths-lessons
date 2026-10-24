/* Locally drawn, teacher-controlled models for Further Graph Transformations 2. */
(() => {
  'use strict';
  const C={ink:'#213b3a',muted:'#647572',grid:'#dce4df',paper:'#fbfaf6',a:'#b55224',n:'#007f78',k:'#3b66a8',billie:'#82529c'};
  const TAU=2*Math.PI;
  const tide=t=>1.2+0.6*Math.cos(Math.PI*t/8);
  const anna=t=>21-18*Math.cos(Math.PI*t/24);
  const billie=t=>21-18*Math.cos(Math.PI*(t-6)/24);
  const firstCrossing=8*Math.acos(-2/3)/Math.PI;
  const crossings=[firstCrossing,16-firstCrossing,16+firstCrossing];
  const math=tex=>window.MathsLesson.math(tex);
  const typeset=root=>window.MathsLesson.typeset(root);
  const colour=(tex,c)=>`\\textcolor{${c}}{${tex}}`;
  const line=(x1,y1,x2,y2,c=C.grid,width=1.5,dash='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${width}"${dash?` stroke-dasharray="${dash}"`:''}/>`;
  const text=(x,y,s,anchor='middle',c=C.ink,size=21)=>`<text x="${x}" y="${y}" text-anchor="${anchor}" style="fill:${c}" font-size="${size}">${s}</text>`;
  const mtext=(x,y,tex,w=150,h=40)=>`<foreignObject x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" class="periodic-svg-math">${math(tex)}</div></foreignObject>`;
  const dot=(x,y,c=C.n,r=5,open=false)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${open?C.paper:c}" stroke="${c}" stroke-width="2.5"/>`;
  function arrow(x1,y1,x2,y2,c){
    const a=Math.atan2(y2-y1,x2-x1),s=Math.min(9,Math.hypot(x2-x1,y2-y1)*.35);
    const head=(x,y,t)=>`<path d="M${x+s*Math.cos(t-.45)},${y+s*Math.sin(t-.45)} L${x},${y} L${x+s*Math.cos(t+.45)},${y+s*Math.sin(t+.45)}" fill="none" stroke="${c}" stroke-width="3"/>`;
    return line(x1,y1,x2,y2,c,3)+head(x1,y1,a)+head(x2,y2,a+Math.PI);
  }
  const svg=(body,w,h,label,cls='')=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" class="periodic-plot ${cls}" role="img" aria-label="${label}"><title>${label}</title>${body}</svg>`;
  function plot({w=1120,h=300,xmax=24,ymax=2,xticks=[0,4,8,12,16,20,24],yticks=[0,.6,1.2,1.8],unit='hours',left=75,right=35,top=35,bottom=55}={}){
    const x=t=>left+t/xmax*(w-left-right),y=v=>h-bottom-v/ymax*(h-top-bottom);
    let body='';
    xticks.forEach(t=>{body+=line(x(t),top,x(t),y(0))+text(x(t),y(0)+28,t);});
    yticks.forEach(v=>{body+=line(left,y(v),w-right,y(v))+text(left-14,y(v)+7,v,'end');});
    body+=line(left,top,left,y(0),C.ink,2)+line(left,y(0),w-right,y(0),C.ink,2);
    body+=text(left,22,'Height (m)','start',C.muted,20)+mtext(w-right-58,h-16,unit?`t\\text{ (${unit})}`:'t',170,32);
    const path=(fn,c=C.n,width=3.5,from=0,to=xmax)=>{
      const points=Array.from({length:401},(_,i)=>{const t=from+(to-from)*i/400;return `${i?'L':'M'}${x(t).toFixed(2)},${y(fn(t)).toFixed(2)}`;}).join(' ');
      return `<path d="${points}" fill="none" stroke="${c}" stroke-width="${width}" stroke-linejoin="round"/>`;
    };
    return {x,y,body,path,w,h,top,left,right};
  }
  function featureDiagram(showExtrema=false){
    const w=1120,h=280,x=t=>85+t*750,y=v=>245-v*60;
    let s=line(85,24,85,245,C.ink,2)+line(85,245,1090,245,C.ink,2);
    s+=mtext(71,17,'y',40)+mtext(1100,247,showExtrema?'x':'t',40)+text(70,265,'0');
    if(showExtrema){
      s+=line(85,y(3),1090,y(3),C.muted,1.4,'5 6')+line(85,y(1),1090,y(1),C.muted,1.4,'5 6');
      s+=mtext(52,y(3),'h',50)+mtext(52,y(1),'l',50);
    }
    s+=line(85,y(2),1090,y(2),C.k,2,'9 6');
    let d='';
    for(let i=0;i<=350;i++){const t=i/350*1.3;d+=`${i?'L':'M'}${x(t)},${y(2+Math.cos(TAU*t))} `;}
    s+=`<path d="${d}" fill="none" stroke="${C.n}" stroke-width="4"/>`;
    s+=arrow(x(1),y(2),x(1),y(3),C.a)+mtext(x(1)-42,y(2.5),colour('|a|',C.a),75);
    s+=arrow(x(0),y(.35),x(1),y(.35),C.n)+mtext(x(.5),y(.35)-20,colour('T',C.n),65);
    s+=mtext(1030,y(2)-21,colour(showExtrema?'y=b':'y=k',C.k),125);
    return svg(s,w,h,'Cosine graph with a dashed midline, a vertical amplitude arrow and a horizontal full-period arrow');
  }
  const controls=(main,extra='')=>`<div class="periodic-controls"><button class="primary periodic-reveal">${main}</button>${extra}<button class="periodic-reset">Reset</button></div>`;
  function simpleReveal(m,{button,initial,answer,diagram='',after=''}){
    m.innerHTML=`${diagram}${controls(button)}<div class="periodic-result" aria-live="polite">${initial}</div>${after}`;
    const result=m.querySelector('.periodic-result'),reveal=m.querySelector('.periodic-reveal');
    reveal.addEventListener('click',()=>{result.innerHTML=answer;reveal.disabled=true;typeset(result);});
    m.querySelector('.periodic-reset').addEventListener('click',()=>{result.innerHTML=initial;reveal.disabled=false;typeset(result);});
    typeset(m);
  }
  function parameters(m){
    simpleReveal(m,{button:'Reveal parameter rules',diagram:featureDiagram(true),
      initial:'Use the maximum, minimum and full period. The booklet uses '+math('b')+' for the midline.',
      answer:`<div class="parameter-strip"><p>${math(colour('a=\\dfrac{h-l}{2}',C.a))}</p><p>${math(colour('n=\\dfrac{2\\pi}{T}',C.n))}</p><p>${math(colour('b=\\dfrac{h+l}{2}',C.k))}</p></div>`});
  }
  function clock(t){
    const minutes=Math.round((5+t)*60),hours=Math.floor(minutes/60)%24;
    return `${hours%12||12}:${String(minutes%60).padStart(2,'0')} ${hours<12?'am':'pm'}${minutes>=1440?' next day':''}`;
  }
  function tideDemo(m){
    const mode=m.dataset.mode;
    let time=0,stage=0,threshold=mode==='intervals',cross=false,shade=false,showClock=false;
    m.innerHTML=`<div class="periodic-graph"></div>
      ${controls(mode==='sketch'?'Reveal key points':mode==='threshold'?'Show threshold':'Reveal intervals',mode==='threshold'?'<button class="periodic-secondary" disabled>Reveal crossings</button>':mode==='intervals'?'<button class="periodic-secondary" disabled>Reveal clock times</button>':'')}
      <div class="periodic-slider"><label>Elapsed time</label><input type="range" min="0" max="24" step="0.05" value="0" aria-label="Hours since high tide"><output></output></div>
      <div class="periodic-live" aria-live="off"></div><div class="periodic-result" aria-live="polite"></div>`;
    const graph=m.querySelector('.periodic-graph'),primary=m.querySelector('.periodic-reveal'),secondary=m.querySelector('.periodic-secondary'),slider=m.querySelector('input'),out=m.querySelector('output'),live=m.querySelector('.periodic-live'),result=m.querySelector('.periodic-result');
    function draw(){
      const p=plot({h:mode==='intervals'?250:300});
      let s=p.body;
      if(shade){
        [[crossings[0],crossings[1]],[crossings[2],24]].forEach(([a,b])=>{
          s+=`<rect x="${p.x(a)}" y="${p.top}" width="${p.x(b)-p.x(a)}" height="${p.y(0)-p.top}" fill="${C.a}" opacity=".13"/>`;
          s+=line(p.x(a),p.y(0),p.x(b),p.y(0),C.a,6)+dot(p.x(a),p.y(0),C.a,5,true)+dot(p.x(b),p.y(0),C.a,5,b!==24);
        });
      }
      if(mode!=='sketch'||stage>0){
        s+=line(p.left,p.y(1.2),p.w-p.right,p.y(1.2),C.k,2,'8 6');
        if(mode==='sketch') [0,4,8,12,16,20,24].forEach(t=>{s+=dot(p.x(t),p.y(tide(t)),C.n,5);});
      }
      if(mode!=='sketch'||stage===2)s+=p.path(tide);
      if(threshold){
        s+=line(p.left,p.y(.8),p.w-p.right,p.y(.8),C.a,2.5,'10 6');
        s+=mtext(p.x(16),p.y(.8)-20,colour('h=0.8',C.a),150);
      }
      if(cross||shade)crossings.forEach(t=>{s+=dot(p.x(t),p.y(.8),C.a,5,true);});
      if(mode!=='sketch'||stage===2)s+=line(p.x(time),p.y(0),p.x(time),p.y(tide(time)),C.ink,1.5,'4 5')+dot(p.x(time),p.y(tide(time)),C.ink,6);
      graph.innerHTML=svg(s,p.w,p.h,'Tide height over 24 hours; horizontal axis is hours since high tide');
      slider.disabled=mode==='sketch'&&stage<2;
      out.innerHTML=math(`t=${time.toFixed(2)}\\text{ h}`);
      live.innerHTML=slider.disabled?'Move the time marker after revealing the curve.':`${math(`h=${tide(time).toFixed(2)}\\text{ m}`)}${mode==='intervals'?`<span>Clock time: ${clock(time)} (rounded)</span>`:''}`;
      if(mode==='sketch'){
        result.innerHTML=stage===0?'Sketch first. Mark the quarter-period times before joining the curve.':stage===1?`Quarter period: ${math('4\\text{ h}')} &nbsp; · &nbsp; Midline: ${math(colour('h=1.2',C.k))}`:`${math(`h=${colour('0.6',C.a)}\\cos\\left(${colour('\\pi/8',C.n)}t\\right)+${colour('1.2',C.k)}`)} &nbsp; · &nbsp; 24 hours contains 1½ cycles.`;
        primary.textContent=stage===0?'Reveal key points':stage===1?'Reveal curve':'Curve shown';primary.disabled=stage===2;
      }else if(mode==='threshold'){
        result.innerHTML=cross?`Boundary times: ${math('t\\approx5.858,\\ 10.142,\\ 21.858\\text{ hours}')}<br><span class="result-small">Include the next cycle. These are crossings, not yet the sailing intervals.</span>`:threshold?`${math('0.6\\cos(\\pi t/8)+1.2=0.8')} &nbsp; ⇒ &nbsp; ${math('\\cos(\\pi t/8)=-\\tfrac23')}`:'Predict the crossings, then show the threshold and solve in radians.';
        primary.disabled=threshold;secondary.disabled=!threshold||cross;
      }else{
        result.innerHTML=showClock?'<p>Approximately <strong>10:51 am–3:09 pm</strong>, then <strong>2:51 am–5:00 am next day</strong>.</p><p class="result-small">Boundary times rounded to the nearest minute. At exactly 0.8 m the yacht can sail.</p>':shade?`Unable to sail where ${math('h<0.8')}. Include both shaded intervals.<br><span class="result-small">Open endpoints exclude equality; the 24-hour window ends at 5:00 am next day.</span>`:`Which parts of the graph satisfy ${math('h<0.8')}? Add the elapsed time to 5:00 am.`;
        primary.disabled=shade;secondary.disabled=!shade||showClock;
      }
      typeset(m);
    }
    primary.addEventListener('click',()=>{if(mode==='sketch')stage=Math.min(2,stage+1);else if(mode==='threshold')threshold=true;else shade=true;draw();});
    secondary?.addEventListener('click',()=>{if(mode==='threshold')cross=true;else showClock=true;draw();});
    slider.addEventListener('input',()=>{time=Number(slider.value);draw();});
    slider.addEventListener('keydown',e=>e.stopPropagation());
    m.querySelector('.periodic-reset').addEventListener('click',()=>{time=0;stage=0;threshold=mode==='intervals';cross=false;shade=false;showClock=false;slider.value='0';draw();});
    draw();
  }
  function ferrisPeriod(m){
    m.innerHTML=`${controls('Reveal one revolution')}<div class="periodic-result" aria-live="polite">Find the time from the bottom, through the top, back to the bottom.</div><div class="periodic-graph"></div>`;
    const button=m.querySelector('.periodic-reveal'),result=m.querySelector('.periodic-result'),graph=m.querySelector('.periodic-graph');
    button.addEventListener('click',()=>{
      const p=plot({xmax:48,ymax:45,xticks:[0,12,24,36,48],yticks:[3,21,39],unit:'seconds',h:330,top:35});
      let s=p.body+p.path(anna)+line(p.left,p.y(21),p.w-p.right,p.y(21),C.k,2,'8 6');
      s+=arrow(p.x(0),p.y(43),p.x(48),p.y(43),C.n)+mtext(p.x(24),p.y(43)-20,colour('T=48\\text{ s}',C.n),180);
      [0,24,48].forEach(t=>{s+=dot(p.x(t),p.y(anna(t)),C.n);});
      graph.innerHTML=svg(s,p.w,p.h,'Anna’s height over one full 48-second revolution');
      result.innerHTML=math(`T=\\dfrac{2\\pi}{\\pi/24}=${colour('48\\text{ seconds}',C.n)}`);button.disabled=true;typeset(m);
    });
    m.querySelector('.periodic-reset').addEventListener('click',()=>{button.disabled=false;graph.innerHTML='';result.textContent='Find the time from the bottom, through the top, back to the bottom.';});
  }
  function wheel(time,showBillie,matching){
    const cx=165,cy=155,r=120,ground=295,sy=v=>ground-v*(240/36);
    let s=line(25,ground,306,ground,C.muted,2)+line(cx,cy,110,ground,C.grid,7)+line(cx,cy,220,ground,C.grid,7);
    s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.grid}" stroke-width="3"/>`;
    for(let i=0;i<8;i++){
      const angle=TAU*i/8+Math.PI*time/24;
      s+=line(cx,cy,cx+r*Math.sin(angle),cy+r*Math.cos(angle),C.grid,1.5);
    }
    s+=dot(cx,cy,C.muted,4)+text(13,sy(39)+6,'39','start',C.muted,19)+text(13,sy(3)+6,'3','start',C.muted,19)+text(13,ground+23,'Ground','start',C.muted,18);
    if(matching)s+=line(30,sy(anna(time)),307,sy(anna(time)),C.a,2,'6 5');
    const ax=cx+r*Math.sin(Math.PI*time/24),ay=sy(anna(time));
    s+=`<g class="anna-height" data-height="${anna(time)}">${line(ax,ay,315,ay,C.a,1.5,'5 4')}${line(300,ground,326,ground,C.muted,2)}${arrow(315,ground,315,ay,C.a)}${mtext(360,(ground+ay)/2,colour('A(t)',C.a),82,38)}</g>`;
    const carriage=(phase,c,label)=>{
      const angle=Math.PI*phase/24,x=cx+r*Math.sin(angle),y=cy+r*Math.cos(angle);
      return `<rect x="${x-11}" y="${y}" width="22" height="16" rx="3" fill="${C.paper}" stroke="${c}" stroke-width="2"/>`+dot(x,y,c,5)+text(x+(x<cx?-20:20),y-9,label,x<cx?'end':'start',c,22);
    };
    s+=carriage(time,C.n,'A');if(showBillie)s+=carriage(time-6,C.billie,'B');
    return svg(s,405,325,'Schematic Ferris wheel. The orange vertical arrow measures Anna’s carriage-top height above the ground.','ferris-wheel');
  }
  function ferrisDemo(m){
    const equality=m.dataset.mode==='equality',constants=m.dataset.mode==='constants';
    let time=0,showBillie=equality,revealed=false;
    m.innerHTML=`<div class="ferris-layout"><div class="ferris-picture"></div><div><div class="ferris-legend"><span class="anna"><i></i>Anna</span><span class="billie"><i></i>Billie</span></div><div class="periodic-graph"></div></div></div>
      <div class="periodic-slider"><label>${constants?'Turn wheel':'Time'}</label><input type="range" min="0" max="48" step="0.1" value="0" aria-label="${constants?'Anna’s position in one revolution':'Time in seconds since Anna first reaches the bottom'}"><output></output></div>
      <div class="periodic-action-row">${constants?'':controls(equality?'Reveal equal heights':'Show Billie',equality?'<button class="match-lower" hidden>Lower match</button><button class="match-upper" hidden>Upper match</button>':'')}
      <div class="periodic-result" aria-live="polite"></div></div>`;
    const graph=m.querySelector('.periodic-graph'),picture=m.querySelector('.ferris-picture'),slider=m.querySelector('input'),out=m.querySelector('output'),button=m.querySelector('.periodic-reveal'),result=m.querySelector('.periodic-result');
    function draw(){
      const p=plot({w:760,h:equality?280:240,xmax:48,ymax:44,xticks:constants?[0]:[0,12,24,36,48],yticks:constants?[3,39]:[3,21,39],unit:constants?'':'seconds',left:60,right:25,top:35,bottom:50});
      let s=p.body+p.path(anna);
      if(!constants)s+=line(p.left,p.y(21),p.w-p.right,p.y(21),C.k,1.5,'8 6');
      if(showBillie)s+=p.path(billie,C.billie);
      if(!equality&&showBillie){s+=arrow(p.x(0),p.y(8),p.x(6),p.y(8),C.a)+text(p.x(3),p.y(8)-12,'6 s','middle',C.a,20);}
      if(revealed)[3,27].forEach(t=>{s+=dot(p.x(t),p.y(anna(t)),C.a,6,true);});
      const heightY=p.y(anna(time)),labelX=p.x(time)+(time<24?45:-45),labelY=Math.min((p.y(0)+heightY)/2,p.y(0)-24);
      s+=`<g class="anna-height" data-height="${anna(time)}">${arrow(p.x(time),p.y(0),p.x(time),heightY,C.a)}<rect x="${labelX-38}" y="${labelY-16}" width="76" height="32" rx="4" fill="${C.paper}" opacity=".9"/>${mtext(labelX,labelY,colour('A(t)',C.a),76,32)}</g>`+dot(p.x(time),heightY,C.n,6);
      if(showBillie)s+=dot(p.x(time),p.y(billie(time)),C.billie,6);
      graph.innerHTML=svg(s,p.w,p.h,'Carriage height against time over a 48-second revolution','ferris-graph');
      picture.innerHTML=wheel(time,showBillie,revealed&&Math.abs(anna(time)-billie(time))<1e-8);
      m.querySelector('.ferris-legend .billie').hidden=!showBillie;
      out.innerHTML=math(constants?`A(t)=${anna(time).toFixed(2)}\\text{ m}`:`t=${time.toFixed(1)}\\text{ s}`);
      m.querySelector('.ferris-legend .anna').innerHTML=constants?'<i></i>Anna':`<i></i>Anna: ${math(`${anna(time).toFixed(2)}\\text{ m}`)}`;
      m.querySelector('.ferris-legend .billie').innerHTML=`<i></i>Billie: ${math(`${billie(time).toFixed(2)}\\text{ m}`)}`;
      if(constants){
        result.innerHTML='Hint: What are the <span class="parameter-k">midline</span> and <span class="parameter-a">amplitude</span>?';
      }else if(equality){
        result.innerHTML=revealed?`${math('t=3\\text{ s}')} → <strong>4.37 m</strong> &nbsp; · &nbsp; ${math('t=27\\text{ s}')} → <strong>37.63 m</strong><br><span class="result-small">The question asks for the two heights.</span>`:`Find the intersections: ${math('A(t)=B(t)')}. Then calculate the heights.`;
        m.querySelector('.match-lower').hidden=!revealed;m.querySelector('.match-upper').hidden=!revealed;
        button.hidden=revealed;
      }else{
        result.innerHTML=showBillie?'Billie reaches the bottom 6 seconds later. Her graph is shifted 6 seconds to the right.':'Predict when Billie reaches the bottom and where her graph will lie.';
        button.disabled=showBillie;
      }
      typeset(m);
    }
    button?.addEventListener('click',()=>{if(equality)revealed=true;else showBillie=true;draw();});
    slider.addEventListener('input',()=>{time=Number(slider.value);draw();});
    slider.addEventListener('keydown',e=>e.stopPropagation());
    if(equality){
      m.querySelector('.match-lower').addEventListener('click',()=>{time=3;slider.value='3';draw();});
      m.querySelector('.match-upper').addEventListener('click',()=>{time=27;slider.value='27';draw();});
    }
    m.querySelector('.periodic-reset')?.addEventListener('click',()=>{time=0;showBillie=equality;revealed=false;slider.value='0';draw();});
    draw();
  }
  function cosineEquality(m){
    let step=8,mode='same';
    const theta1=colour('\\theta_1',C.n),theta2=colour('\\theta_2',C.billie);
    const fraction=n=>{let a=n,b=24;while(b){const r=a%b;a=b;b=r;}const top=n/a,bottom=24/a;return bottom===1?(top===1?'\\pi':`${top}\\pi`):`\\frac{${top===1?'':top}\\pi}{${bottom}}`;};
    m.innerHTML=`<div class="unit-circle-layout"><div><div class="unit-circle-picture"></div><div class="periodic-slider"><label>${math(theta1)}</label><input type="range" min="1" max="47" step="1" value="8" aria-label="First angle in steps of pi over 24"><output></output></div></div>
      <div class="unit-circle-explanation"><div class="periodic-controls"><button class="circle-same" aria-pressed="true">Same angle</button><button class="circle-turn" aria-pressed="false">Full turn</button><button class="circle-reflected" aria-pressed="false">Reflected angle</button><button class="circle-reset">Reset</button></div>
      <div class="circle-reading" aria-live="polite"></div><div class="periodic-result circle-value"></div>
      <p>Adding full turns gives both families:</p><div class="circle-rules">${math(`${theta2}=${theta1}+2m\\pi`)}<span>or</span>${math(`${theta2}=-${theta1}+2m\\pi,\\quad m\\in\\mathbb Z`)}</div>
      <div class="circle-application"><strong>For Example 2.6(c)</strong><p>${math(`${theta1}=\\frac{\\pi t}{24},\\qquad ${theta2}=\\frac{\\pi(t-6)}{24}`)}</p></div></div></div>`;
    const slider=m.querySelector('input'),picture=m.querySelector('.unit-circle-picture');
    const arc=(cx,cy,r,end,c,growth=0)=>{
      const n=Math.ceil(100*end/TAU),radius=t=>r+growth*t/TAU;
      const d=Array.from({length:n+1},(_,i)=>{const t=end*i/n;return `${i?'L':'M'}${cx+radius(t)*Math.cos(t)},${cy-radius(t)*Math.sin(t)}`;}).join(' ');
      const rr=radius(end),dr=growth/TAU,ex=cx+rr*Math.cos(end),ey=cy-rr*Math.sin(end),heading=Math.atan2(-dr*Math.sin(end)-rr*Math.cos(end),dr*Math.cos(end)-rr*Math.sin(end)),s=7;
      return `<path d="${d}" fill="none" stroke="${c}" stroke-width="2.5"/><path d="M${ex-s*Math.cos(heading-.45)},${ey-s*Math.sin(heading-.45)} L${ex},${ey} L${ex-s*Math.cos(heading+.45)},${ey-s*Math.sin(heading+.45)}" fill="none" stroke="${c}" stroke-width="2.5"/>`;
    };
    function draw(){
      const reflected=mode==='reflected',fullTurn=mode==='turn';
      const t1=step*Math.PI/24,t2=reflected?TAU-t1:t1+(fullTurn?TAU:0),x=Math.cos(t1),y=Math.sin(t1),cx=265,cy=225,r=165,px=cx+r*x,py1=cy-r*y,py2=cy-r*Math.sin(t2),same=Math.abs(py1-py2)<1e-8;
      let s=line(48,cy,482,cy,C.muted,1.6)+line(cx,20,cx,427,C.muted,1.6);
      s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.grid}" stroke-width="3"/>`;
      s+=text(cx-13,cy+25,'0','end',C.muted,20)+text(cx+r+12,cy+24,'1','middle',C.muted,20)+text(cx-r-18,cy+24,'−1','middle',C.muted,20)+text(cx+15,cy-r-10,'1','start',C.muted,20)+text(cx+15,cy+r+20,'−1','start',C.muted,20);
      s+=mtext(493,cy,'x',32)+mtext(cx,11,'y',32);
      s+=line(px,py1,px,reflected?py2:cy,C.a,2,'6 5');
      s+=line(cx,cy,px,cy,C.a,5)+line(px,cy-7,px,cy+7,C.a,2);
      s+=line(cx,cy,px,py1,C.n,3)+arc(cx,cy,46,t1,C.n);
      if(reflected)s+=line(cx,cy,px,py2,C.billie,3);
      s+=arc(cx,cy,68,t2,C.billie,fullTurn?22:0);
      s+=`<circle class="circle-point-1" cx="${px}" cy="${py1}" r="${same?9:6}" fill="${same?C.paper:C.n}" stroke="${C.n}" stroke-width="3"/>`;
      s+=`<circle class="circle-point-2" cx="${px}" cy="${py2}" r="${same?4:6}" fill="${C.billie}" stroke="${C.billie}" stroke-width="2"/>`;
      const label=(angle,tex)=>{
        const sine=Math.sin(angle),offset=Math.max(44,Math.abs((r+31)*sine));
        return mtext(cx+(r+31)*Math.cos(angle),cy-(sine>=0?offset:-offset),tex,125,38);
      };
      s+=label(t1,same?(fullTurn?`${theta1},\\,${theta2}`:`${theta1}=${theta2}`):theta1);if(!same)s+=label(t2,theta2);
      picture.innerHTML=svg(s,530,450,fullTurn?'Unit circle: the second angle makes one extra full revolution and ends at the same point, so the cosine is unchanged.':'Unit circle: the two angles have the same horizontal coordinate and therefore the same cosine.','unit-circle-plot');
      m.querySelector('output').innerHTML=math(fraction(step));
      ['same','turn','reflected'].forEach(value=>m.querySelector('.circle-'+value).setAttribute('aria-pressed',String(mode===value)));
      const quadrant=step===12||step===36?'The points lie on the vertical axis.':step===24?'On the horizontal axis, the reflected points coincide.':x>0?'Quadrants I and IV have the same positive cosine.':'Quadrants II and III have the same negative cosine.';
      m.querySelector('.circle-reading').innerHTML=`<p><strong>${reflected?'Reflection in the horizontal axis':fullTurn?'One full revolution further':'The same point on the circle'}</strong></p><p>${math(`${theta2}=${reflected?`2\\pi-${theta1}`:fullTurn?`${theta1}+2\\pi`:theta1}=${fraction(reflected?48-step:step+(fullTurn?48:0))}`)}</p><p class="periodic-note">${reflected?quadrant:fullTurn?'Different angles; the same point and cosine value.':'Both angles end at the same point.'}</p>`;
      const value=Math.abs(x)<1e-10?'0':x.toFixed(3);
      m.querySelector('.circle-value').innerHTML=`Same horizontal coordinate:<br>${math(`\\cos${theta1}=\\cos${theta2}${Math.abs(x)<1e-10?'=':'\\approx'}${value}`)}`;
      typeset(m);
    }
    ['same','turn','reflected'].forEach(value=>m.querySelector('.circle-'+value).addEventListener('click',()=>{mode=value;draw();}));
    m.querySelector('.circle-reset').addEventListener('click',()=>{step=8;mode='same';slider.value='8';draw();});
    slider.addEventListener('input',()=>{step=Number(slider.value);draw();});slider.addEventListener('keydown',e=>e.stopPropagation());
    draw();
  }
  function init(){
    if(!window.MathsLesson){setTimeout(init,30);return;}
    document.querySelectorAll('[data-periodic]').forEach(m=>{
      if(m.dataset.periodicReady)return;
      m.dataset.periodicReady='true';
      ({recap:el=>{el.innerHTML=featureDiagram();},parameters,tide:tideDemo,'ferris-period':ferrisPeriod,ferris:ferrisDemo,'cosine-equality':cosineEquality}[m.dataset.periodic])?.(m);
    });
    typeset(document);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
