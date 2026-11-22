/* Lesson 4: exact model values and native SVG labels, shared with the existing renderer. */
(() => {
  'use strict';
  const C = {ink:'#152e3b', muted:'#607078', rule:'#d7d8ce', teal:'#007f78', orange:'#b55224', blue:'#3b66a8'};
  const label = (x,y,tex,c=C.ink,size=24) => window.VectorDiagramMath.label(x,y,tex,c,size);
  const line = (x1,y1,x2,y2,c=C.muted,w=2,extra='') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" ${extra}/>`;
  function path(f,start,end,sx,sy,n=180) {
    let d='';
    for(let i=0;i<=n;i++){const x=start+(end-start)*i/n;d+=`${i?'L':'M'}${sx(x)} ${sy(f(x))}`;}
    return d;
  }
  function curve(d,c,w=3,extra=''){return `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" ${extra}/>`;}
  function initDamped(root){
    const svg=root.querySelector('svg'), slider=root.querySelector('input'), play=root.querySelector('.dc4-play'), output=root.querySelector('output'), section=root.closest('section');
    const sx=t=>64+95*t, sy=s=>300-17*s;
    const position=t=>5*Math.exp(-t/2)*Math.cos(4*t);
    const velocity=t=>Math.exp(-t/2)*(-2.5*Math.cos(4*t)-20*Math.sin(4*t));
    let t=0,running=false,last=null,frame=0;
    let fixed=line(64,198,64,403)+line(64,300,649,300);
    for(const y of [-5,0,5])fixed+=line(59,sy(y),64,sy(y))+label(43,sy(y),String(y),C.muted,20);
    for(let x=0;x<=6;x++)fixed+=line(sx(x),296,sx(x),304)+label(sx(x),419,String(x),C.muted,20);
    fixed+=label(76,180,'s\\;(\\mathrm{cm})',C.ink,23)+label(628,180,'t\\;(\\mathrm{s})',C.ink,23);
    fixed+=curve(path(position,0,6,sx,sy,320),C.teal,3.5);
    for(const sign of [-1,1])fixed+=curve(path(t=>sign*5*Math.exp(-t/2),0,6,sx,sy),C.orange,2,'stroke-dasharray="7 5"');
    fixed+=line(353,20,353,142,C.rule,2,'stroke-dasharray="5 5"')+'<text x="353" y="16" text-anchor="middle" fill="'+C.muted+'" font-size="19">Equilibrium</text>';
    fixed+='<path d="M45 45V120M30 45L45 60M30 65L45 80M30 85L45 100M30 105L45 120" stroke="'+C.muted+'" stroke-width="3" fill="none"/>'+line(45,128,647,128,C.rule);
    svg.innerHTML=fixed+'<g class="dc4-motion"></g>';
    const moving=svg.querySelector('.dc4-motion');
    function draw(){
      const s=position(t),v=velocity(t),mass=353+30*s,end=mass-27,start=45;
      let coil=`M${start} 87L${start+15} 87`;
      for(let i=0;i<20;i++)coil+=`L${start+15+(end-start-30)*(i+1)/21} ${87+(i%2?12:-12)}`;
      coil+=`L${end-15} 87L${end} 87`;
      moving.innerHTML=curve(coil,C.teal,3)+`<rect x="${mass-27}" y="59" width="54" height="64" rx="5" fill="${C.teal}"/>`+line(sx(t),198,sx(t),403,C.blue,1.5,'stroke-dasharray="4 4"')+`<circle cx="${sx(t)}" cy="${sy(s)}" r="6" fill="${C.blue}"/>`;
      svg.dataset.time=String(t);svg.dataset.displacement=String(s);svg.dataset.velocity=String(v);
      slider.value=String(t);output.textContent=t.toFixed(2)+' s';
    }
    function pause(){running=false;cancelAnimationFrame(frame);last=null;play.textContent='Play';play.setAttribute('aria-pressed','false');}
    function tick(now){if(!running)return;if(last!==null)t=Math.min(6,t+Math.min(now-last,100)/1000);last=now;draw();if(t>=6){pause();return;}frame=requestAnimationFrame(tick);}
    play.addEventListener('click',()=>{if(running){pause();return;}if(t>=6)t=0;running=true;last=null;play.textContent='Pause';play.setAttribute('aria-pressed','true');frame=requestAnimationFrame(tick);});
    root.querySelector('.dc4-reset').addEventListener('click',()=>{pause();t=0;draw();});
    slider.addEventListener('input',()=>{pause();t=Math.max(0,Math.min(6,Number(slider.value)));draw();});
    Reveal.on('slidechanged',()=>{if(Reveal.getCurrentSlide()!==section)pause();});
    Reveal.on('overviewshown',pause);
    document.addEventListener('click',e=>{if(e.target.closest('#lesson-navigation .overview'))pause();});
    const map=document.getElementById('lesson-slide-map');
    if(map)new MutationObserver(()=>{if(map.open)pause();}).observe(map,{attributes:true,attributeFilter:['open']});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
    draw();
  }
  function tangentRecap(svg){
    const sx=x=>80+62*x,sy=y=>330-62*y;
    let out=line(sx(-.7),sy(0),sx(5.8),sy(0))+line(sx(0),sy(-1.2),sx(0),sy(4.7));
    out+=label(sx(5.9),sy(0),'x')+label(sx(0),sy(4.9),'y')+label(sx(0)-15,sy(0)+18,'0',C.muted,20);
    out+=curve(path(x=>x*x/4,-.7,4.3,sx,sy),C.teal,3.5);
    out+=line(sx(-.1),sy(-1.1),sx(5.2),sy(4.2),C.blue,3)+line(sx(-.7),sy(3.7),sx(4.1),sy(-1.1),C.orange,3);
    const px=sx(2),py=sy(1),d=13;
    out+=`<path d="M${px+d} ${py-d}L${px+2*d} ${py}L${px+d} ${py+d}" fill="none" stroke="${C.muted}" stroke-width="2"/><circle cx="${px}" cy="${py}" r="5" fill="${C.ink}"/>`;
    out+=label(px,py-43,'P(x_1,y_1)',C.ink,23)+label(287,53,'y=f(x)',C.teal,25);
    out+='<text x="389" y="112" fill="'+C.blue+'" font-size="22">Tangent</text><text x="109" y="113" fill="'+C.orange+'" font-size="22">Normal</text>';
    svg.innerHTML=out;
  }
  function tangentOrigin(svg){
    const sx=x=>72+530*x,sy=y=>390-42*y;
    let out=line(50,390,577,390)+line(72,410,72,40);
    out+=label(596,390,'x')+label(72,24,'y')+label(54,409,'0',C.muted,20);
    out+=curve(path(x=>Math.exp(3*x),-.02,.68,sx,sy),C.teal,3.5)+line(sx(0),sy(0),sx(.83),sy(3*Math.E*.83),C.blue,3);
    out+=`<circle cx="${sx(1/3)}" cy="${sy(Math.E)}" r="5" fill="${C.orange}"/>`+label(sx(1/3)+25,sy(Math.E)+23,'P',C.orange,25);
    out+=label(338,45,'y=e^{3x}',C.teal,27)+label(522,160,'y=mx',C.blue,27);
    svg.innerHTML=out;
  }
  function boot(){
    if(!window.VectorDiagramMath?.ready||!window.Reveal?.isReady()){setTimeout(boot,40);return;}
    document.querySelectorAll('.slides [data-dc-damped]').forEach(initDamped);
    document.querySelectorAll('.slides [data-dc-tangent-recap]').forEach(tangentRecap);
    document.querySelectorAll('.slides [data-dc-tangent-origin]').forEach(tangentOrigin);
  }
  boot();
})();
