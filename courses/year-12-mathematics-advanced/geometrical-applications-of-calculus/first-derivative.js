/* Lesson 3: one-parameter loss illustration and a derivative-graph hinge.
   All diagram labels use native SVG paths; no foreignObject or hover controls. */
(() => {
  'use strict';
  if (!document.querySelector('.slides [data-gac3-loss], .slides [data-gac3-hinge]')) return;
  const C={ink:'#152e3b',muted:'#607078',rule:'#d7d8ce',teal:'#007f78',orange:'#b55224'};
  const label=(x,y,tex,c=C.ink,size=24)=>window.VectorDiagramMath.label(x,y,tex,c,size);
  const line=(x1,y1,x2,y2,c=C.muted,w=1.5,extra='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" ${extra}/>`;
  const text=(x,y,value,c=C.muted,size=20,anchor='start')=>`<text x="${x}" y="${y}" fill="${c}" font-family="Arial, sans-serif" font-size="${size}" text-anchor="${anchor}">${value}</text>`;
  const curve=(d,c=C.teal,w=3.5)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/>`;
  function path(f,a,b,sx,sy,n=240){let d='';for(let i=0;i<=n;i++){const x=a+(b-a)*i/n;d+=`${i?'L':'M'}${sx(x)} ${sy(f(x))}`;}return d;}
  const math=tex=>window.katex.renderToString(tex,{throwOnError:true});
  const fmt=n=>String(Number(n.toFixed(2)));
  function loss(root){
    const svg=root.querySelector('svg'),slider=root.querySelector('input'),output=root.querySelector('output'),show=root.querySelector('.gac3-loss-show'),result=root.querySelector('.gac3-loss-result');
    const sx=x=>60+130*x,sy=y=>305-50*y,f=x=>(x-2)**2+1;
    let shown=false;
    let fixed=line(45,sy(0),595,sy(0))+line(sx(0),320,sx(0),35);
    fixed+=text(60,23,'Prediction error',C.ink,22)+text(320,361,'Model parameter',C.ink,22,'middle')+label(422,361,'x',C.ink,25);
    for(let x=0;x<=4;x++)fixed+=line(sx(x),sy(0)-4,sx(x),sy(0)+4)+text(sx(x),sy(0)+26,x,C.muted,20,'middle');
    for(let y=1;y<=5;y++)fixed+=line(sx(0)-4,sy(y),sx(0)+4,sy(y))+text(sx(0)-13,sy(y)+7,y,C.muted,20,'end');
    fixed+=curve(path(f,0,4,sx,sy));
    function draw(){
      const x=Number(slider.value),y=f(x),m=2*(x-2);
      const a=Math.max(0,x-.42),b=Math.min(4,x+.42);
      svg.innerHTML=fixed+line(sx(x),sy(0),sx(x),sy(y),C.rule,1.5,'stroke-dasharray="5 5"')+line(sx(a),sy(y+m*(a-x)),sx(b),sy(y+m*(b-x)),C.orange,4)+`<circle cx="${sx(x)}" cy="${sy(y)}" r="6" fill="${C.orange}"/>`;
      Object.assign(svg.dataset,{parameter:fmt(x),loss:fmt(y),gradient:fmt(m)});
      output.textContent=x.toFixed(2);
      root.querySelectorAll('[data-loss-x]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.lossX)===x)));
      result.hidden=!shown;
      if(shown){
        const state=m<0?'Decreasing':m>0?'Increasing':'Stationary';
        const message=m<0?'A small increase in the parameter reduces error.':m>0?'A small decrease in the parameter reduces error.':'A horizontal tangent alone does not establish a minimum.';
        result.innerHTML=`<p>${math(`f'(${fmt(x)})=${fmt(m)}`)}</p><p><strong>${state}.</strong> ${message}</p>`;
      }
    }
    function hide(){shown=false;result.hidden=true;show.textContent='Show';show.setAttribute('aria-expanded','false');}
    slider.addEventListener('input',()=>{hide();draw();});
    root.querySelectorAll('[data-loss-x]').forEach(button=>button.addEventListener('click',()=>{slider.value=button.dataset.lossX;hide();draw();}));
    show.addEventListener('click',()=>{shown=!shown;show.textContent=shown?'Hide':'Show';show.setAttribute('aria-expanded',String(shown));draw();});
    root.querySelector('.gac3-loss-reset').addEventListener('click',()=>{slider.value='1';hide();draw();});
    draw();
  }
  function hinge(svg){
    const sx=x=>125+70*x,sy=y=>70-70*y;
    let out=line(45,sy(0),385,sy(0))+line(sx(0),300,sx(0),25);
    out+=label(407,sy(0),'x',C.ink,25)+label(sx(0),12,'y',C.ink,25)+label(320,30,"y=f'(x)",C.teal,29);
    out+=label(sx(0)-15,sy(0)+22,'0',C.muted,20);
    for(const x of [1,2,3])out+=line(sx(x),sy(0)-4,sx(x),sy(0)+4)+label(sx(x),sy(0)+24,String(x),C.muted,21);
    for(const y of [-1,-2,-3])out+=line(sx(0)-4,sy(y),sx(0)+4,sy(y))+label(sx(0)-24,sy(y),String(y),C.muted,21);
    out+=curve(path(x=>-((x-1)**2),-.8,2.8,sx,sy))+`<circle cx="${sx(1)}" cy="${sy(0)}" r="5" fill="${C.teal}"/>`;
    svg.innerHTML=out;
  }
  function boot(){
    if(!window.VectorDiagramMath?.ready||!window.Reveal?.isReady()||!window.katex){setTimeout(boot,40);return;}
    document.querySelectorAll('.slides [data-gac3-loss]').forEach(loss);
    document.querySelectorAll('.slides [data-gac3-hinge]').forEach(hinge);
    document.body.dataset.gac3Ready='true';
  }
  boot();
})();
