/* Lesson 1: mathematical diagrams with native SVG labels and touch controls. */
(() => {
  'use strict';
  const C={ink:'#152e3b',muted:'#607078',rule:'#d7d8ce',teal:'#007f78',blue:'#3b66a8',orange:'#b55224',paper:'#f7f5ef'};
  const label=(x,y,tex,c=C.ink,size=24)=>window.VectorDiagramMath.label(x,y,tex,c,size);
  const line=(x1,y1,x2,y2,c=C.muted,w=1.5,extra='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" ${extra}/>`;
  const curve=(d,c=C.teal,w=3)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/>`;
  const point=(x,y,c,r=5,open=false)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${open?C.paper:c}" stroke="${c}" stroke-width="2.5"/>`;
  const text=(x,y,value,c=C.muted,size=19)=>`<text x="${x}" y="${y}" fill="${c}" font-family="Arial, sans-serif" font-size="${size}">${value}</text>`;
  function path(f,start,end,sx,sy,n=300){let d='';for(let i=0;i<=n;i++){const x=start+(end-start)*i/n;d+=`${i?'L':'M'}${sx(x)} ${sy(f(x))}`;}return d;}
  function maths(tex){return window.katex.renderToString(tex,{throwOnError:true});}
  function initWaves(root){
    const svg=root.querySelector('svg'),select=root.querySelector('select');
    const sx=x=>65+(x+Math.PI)*970/(2*Math.PI),sy=y=>139-56*y;
    let fixed=line(40,sy(0),1063,sy(0))+line(sx(0),20,sx(0),262);
    fixed+=label(1080,sy(0),'x')+label(sx(0)+19,16,'y');
    for(const x of [-Math.PI,-Math.PI/2,Math.PI/2,Math.PI]){fixed+=line(sx(x),sy(0)-4,sx(x),sy(0)+4);fixed+=label(sx(x),sy(0)+23,x===Math.PI?'\\pi':x===-Math.PI?'-\\pi':x>0?'\\frac{\\pi}{2}':'-\\frac{\\pi}{2}',C.muted,20);}
    for(const y of [-2,-1,1,2]){fixed+=line(sx(0)-4,sy(y),sx(0)+4,sy(y))+text(sx(0)-27,sy(y)+6,y);}
    function draw(){const n=Number(select.value);const f=x=>{let total=0;for(let i=0;i<n;i++)total+=2**(-i)*Math.cos(3**i*x);return total;};svg.innerHTML=fixed+curve(path(f,-Math.PI,Math.PI,sx,sy,5000),C.teal,2.5);svg.dataset.waves=String(n);svg.dataset.valueAtZero=String(f(0));}
    select.addEventListener('change',draw);root.querySelector('.gac-wave-reset').addEventListener('click',()=>{select.value='4';draw();});draw();
  }
  function initSecants(root){
    const svg=root.querySelector('svg'),slider=root.querySelector('input'),select=root.querySelector('select'),reveal=root.querySelector('.gac-reveal'),values=root.querySelector('.gac-gradient-values');
    let shown=false;
    const sx=x=>280+100*x,sy=y=>282-100*y;
    function draw(){
      const h=10**(-Number(slider.value)/50),isAbs=select.value==='abs',f=isAbs?Math.abs:x=>x*x;
      const left=(f(-h)-f(0))/(-h),right=(f(h)-f(0))/h;
      let out=line(45,sy(0),525,sy(0))+line(sx(0),325,sx(0),25);
      out+=label(540,sy(0),'x')+label(sx(0),13,'y')+label(sx(0)-16,sy(0)+20,'0',C.muted,20);
      for(const x of [-2,-1,1,2])out+=line(sx(x),sy(0)-4,sx(x),sy(0)+4)+text(sx(x)-7,sy(0)+23,x);
      for(const y of [1,2])out+=line(sx(0)-4,sy(y),sx(0)+4,sy(y))+text(sx(0)+9,sy(y)+6,y);
      const end=isAbs?2.15:1.55;
      out+=curve(path(f,-end,0,sx,sy),C.teal,4)+curve(path(f,0,end,sx,sy),C.teal,4);
      // Secants extend through the origin; left/right points are defined by positive distance h.
      out+=line(sx(-1.9),sy(-1.9*left),sx(.35),sy(.35*left),C.blue,2.5,'stroke-dasharray="8 5"');
      out+=line(sx(-.35),sy(-.35*right),sx(1.9),sy(1.9*right),C.orange,2.5,'stroke-dasharray="8 5"');
      out+=point(sx(-h),sy(f(-h)),C.blue,6)+point(sx(h),sy(f(h)),C.orange,6)+point(sx(0),sy(0),C.ink,4);
      out+=label(110,30,isAbs?'y=|x|':'y=x^2',C.teal,27);
      out+=text(35,340,'Left approach',C.blue,19)+text(390,340,'Right approach',C.orange,19);
      svg.innerHTML=out;
      Object.assign(svg.dataset,{distance:String(h),function:select.value,leftGradient:String(left),rightGradient:String(right)});
      root.querySelector('output').textContent=h.toFixed(2);
      values.hidden=!shown;
      if(shown)values.innerHTML=`<span class="gac-left">Left: ${maths(Number(left.toFixed(3)).toString())}</span><span class="gac-right">Right: ${maths(Number(right.toFixed(3)).toString())}</span>`;
    }
    function hide(){shown=false;reveal.textContent='Reveal gradients';reveal.setAttribute('aria-expanded','false');}
    slider.addEventListener('input',draw);
    select.addEventListener('change',()=>{hide();draw();});
    root.querySelector('.gac-closer').addEventListener('click',()=>{slider.value=String(Math.min(100,Number(slider.value)+25));draw();});
    reveal.addEventListener('click',()=>{shown=!shown;reveal.textContent=shown?'Hide gradients':'Reveal gradients';reveal.setAttribute('aria-expanded',String(shown));draw();});
    root.querySelector('.gac-secant-reset').addEventListener('click',()=>{select.value='abs';slider.value='0';hide();draw();});draw();
  }
  function failure(svg){
    const kind=svg.dataset.gacFailure,sx=x=>260+83*x,sy=y=>(kind==='vertical'?90:125)-43*y;
    let out=line(42,sy(0),475,sy(0))+line(sx(0),166,sx(0),16);
    out+=label(489,sy(0),'x',C.ink,20)+label(sx(0),8,'y',C.ink,20);
    if(kind==='vertical'){
      // Parametrise x=t^3, y=t so the vertical tangent is drawn accurately near zero.
      let d='';for(let i=0;i<=400;i++){const t=-1.35+2.7*i/400;d+=`${i?'L':'M'}${sx(t**3)} ${sy(t)}`;}out+=curve(d);
      out+=line(sx(0),20,sx(0),166,C.orange,2,'stroke-dasharray="5 4"');
    }else{
      const f=kind==='corner'?Math.abs:kind==='cusp'?x=>Math.abs(x)**(2/3):x=>.35*x;
      out+=curve(path(f,-2.5,0,sx,sy))+curve(path(f,0,2.5,sx,sy));
    }
    out+=point(sx(0),sy(0),kind==='hole'?C.teal:C.ink,4,kind==='hole');
    svg.innerHTML=out;
  }
  function hingeGraph(svg){
    const sx=x=>65+65*x,sy=y=>275-65*y;
    let out=line(30,sy(0),390,sy(0))+line(sx(0),300,sx(0),30);
    out+=label(408,sy(0),'x')+label(sx(0),15,'y')+label(sx(0)-15,sy(0)+19,'0',C.muted,20);
    out+=line(sx(2),sy(0)-4,sx(2),sy(0)+4)+label(sx(2),sy(0)+24,'2');
    out+=line(sx(2),sy(0),sx(2),sy(3),C.rule,1.5,'stroke-dasharray="4 5"');
    out+=curve(`M${sx(-.5)} ${sy(.5)}L${sx(2)} ${sy(3)}L${sx(4.5)} ${sy(.5)}`,C.teal,4)+point(sx(2),sy(3),C.teal,5);
    out+=label(320,47,'y=f(x)',C.teal,25);svg.innerHTML=out;
  }
  function boot(){
    if(!window.VectorDiagramMath?.ready||!window.Reveal?.isReady()||!window.katex){setTimeout(boot,40);return;}
    document.querySelectorAll('.slides [data-gac-weierstrass]').forEach(initWaves);
    document.querySelectorAll('.slides [data-gac-secants]').forEach(initSecants);
    document.querySelectorAll('.slides [data-gac-failure]').forEach(failure);
    document.querySelectorAll('.slides [data-gac-hinge-graph]').forEach(hingeGraph);
    document.body.dataset.gacReady='true';
  }
  boot();
})();
