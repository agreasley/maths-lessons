/* Lesson 5: all geometry and mathematical labels share native SVG coordinates. */
(() => {
  'use strict';
  const C={ink:'#152e3b',teal:'#007f78',blue:'#3b66a8',orange:'#b55224',muted:'#607078',pale:'#a5c1e8'};
  const V=s=>'\\underset{\\sim}{'+s+'}';
  const label=(x,y,tex,c=C.ink,size=25)=>window.VectorDiagramMath.label(x,y,tex,c,size);
  const math=tex=>window.MathsLesson.math(tex);
  const line=(p,q,c,width=3)=>'<path d="M'+p.join(' ')+' L'+q.join(' ')+'" stroke="'+c+'" stroke-width="'+width+'" fill="none"/>';
  const arrow=(p,q,c,width=4)=>{
    const dx=q[0]-p[0],dy=q[1]-p[1],length=Math.hypot(dx,dy),ux=dx/length,uy=dy/length;
    const h=13,w=6;
    return line(p,[q[0]-ux*h*.7,q[1]-uy*h*.7],c,width)+'<path d="M'+q.join(' ')+' L'+[q[0]-ux*h-uy*w,q[1]-uy*h+ux*w].join(' ')+' L'+[q[0]-ux*h+uy*w,q[1]-uy*h-ux*w].join(' ')+' Z" fill="'+c+'"/>';
  };
  const svg=(body,description,height=330,width=600)=>'<svg class="g-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+width+' '+height+'" role="img" aria-label="'+description+'"><title>'+description+'</title>'+body+'</svg>';
  const arc=(o,r,start,end,c=C.orange)=>{
    if(Math.abs(end-start)<.001)return '';
    const p=t=>[o[0]+r*Math.cos(t),o[1]-r*Math.sin(t)];
    return '<path d="M'+p(start).join(' ')+' A'+r+' '+r+' 0 0 0 '+p(end).join(' ')+'" fill="none" stroke="'+c+'" stroke-width="2.5"/>';
  };
  function triangle(){
    const o=[90,285],a=[490,235],b=[275,50];
    const start=Math.atan2(o[1]-a[1],a[0]-o[0]),end=Math.atan2(o[1]-b[1],b[0]-o[0]);
    return svg(arrow(o,a,C.teal)+arrow(o,b,C.blue)+line(a,b,C.orange)+arc(o,53,start,end)+label(68,308,'O')+label(510,250,'A')+label(278,24,'B')+label(290,286,'|'+V('a')+'|',C.teal,30)+label(132,151,'|'+V('b')+'|',C.blue,30)+label(441,118,'|'+V('b')+'-'+V('a')+'|',C.orange,27)+label(160,243,'\\theta',C.orange,29),'The cosine-rule triangle has sides magnitude a, magnitude b and magnitude b minus a; theta is between the position vectors.');
  }
  function cover(){
    const o=[85,300],a=[460,300],b=[245,70];
    return svg(arrow(o,a,'#8cddd0',5)+arrow(o,b,'#9ebff0',5)+line(a,b,'#d4a16b',3)+arc(o,60,0,Math.atan2(230,160),'#d4a16b')+label(285,332,V('a'),'#8cddd0',31)+label(125,155,V('b'),'#9ebff0',31)+label(165,260,'\\theta','#d4a16b',31),'Two tail-to-tail vectors and the angle between them.',365,520);
  }
  function explore(m){
    let angle=60,shown=false;
    m.innerHTML='<div class="g-explore-layout"><div class="g-angle-plot"></div><div class="g-angle-values"></div></div><div class="g-angle-toolbar"><label>Angle <input type="range" min="0" max="180" step="1" value="60" aria-label="Angle between vectors in degrees"></label><button type="button" data-angle="0">0°</button><button type="button" data-angle="90">90°</button><button type="button" data-angle="180">180°</button><button type="button" data-action="reset">Reset</button></div><div class="g-angle-actions"><button type="button" data-action="reveal" aria-pressed="false">Reveal scalar product</button><div class="g-angle-result" aria-live="polite" hidden></div></div>';
    const draw=()=>{
      const t=angle*Math.PI/180,o=[300,270],a=[390,270],b=[o[0]+225*Math.cos(t),o[1]-225*Math.sin(t)];
      let body=arrow(o,b,C.blue,7)+arrow(o,a,C.teal,4);
      body+=arc(o,40,0,t)+label(280,299,'O',C.muted,22);
      body+=label(345,304,V('a'),C.teal,28);
      body+=label((o[0]+b[0])/2+Math.sin(t)*28,(o[1]+b[1])/2+Math.cos(t)*-28,V('b'),C.blue,28);
      body+=label(o[0]+65*Math.cos(t/2),o[1]-65*Math.sin(t/2)-(angle===0?27:0),angle+'^\\circ',C.orange,25);
      m.querySelector('.g-angle-plot').innerHTML=svg(body,'Two vectors with fixed magnitudes 2 and 5, at a tail-to-tail angle of '+angle+' degrees.');
      m.querySelector('.g-angle-values').innerHTML='<p>'+math('|'+V('a')+'|=2')+'</p><p>'+math('|'+V('b')+'|=5')+'</p><p>'+math('\\theta='+angle+'^\\circ')+'</p><p class="small-note">Positive, zero or negative?</p>';
      let value=10*Math.cos(t);if(Math.abs(value)<1e-10)value=0;
      const exact=[0,60,90,120,180].includes(angle),number=exact?String(Math.round(value)):value.toFixed(2);
      const result=m.querySelector('.g-angle-result');
      result.innerHTML=math(V('a')+'\\cdot'+V('b')+'=10\\cos'+angle+'^\\circ'+(exact?'=':'\\approx')+number);
      result.hidden=!shown;
      const button=m.querySelector('[data-action=reveal]');
      button.setAttribute('aria-pressed',String(shown));button.textContent=shown?'Hide scalar product':'Reveal scalar product';
      for(const p of m.querySelectorAll('[data-angle]'))p.setAttribute('aria-pressed',String(Number(p.dataset.angle)===angle));
      m.dataset.angle=String(angle);m.dataset.scalarValue=String(value);m.dataset.answerShown=String(shown);
    };
    const set=n=>{angle=n;shown=false;m.querySelector('input').value=String(n);draw();};
    m.querySelector('input').addEventListener('input',e=>set(Number(e.target.value)));
    m.querySelectorAll('[data-angle]').forEach(b=>b.addEventListener('click',()=>set(Number(b.dataset.angle))));
    m.querySelector('[data-action=reset]').addEventListener('click',()=>set(60));
    m.querySelector('[data-action=reveal]').addEventListener('click',()=>{shown=!shown;draw();});
    draw();
  }
  function special(kind,large=false){
    let body='';
    if(kind==='same'||kind==='equal'){
      const o=[65,85],a=[440,85],b=kind==='equal'?a:[285,85];
      body=arrow(o,a,kind==='equal'?C.pale:C.teal,kind==='equal'?9:4)+arrow(o,b,kind==='equal'?C.teal:C.blue,4);
      if(kind==='equal')body+=label(265,49,V('a')+'='+V('b'),C.teal,27);
      else body+=label(371,53,V('a'),C.teal,27)+label(191,113,V('b'),C.blue,27);
      body+=label(83,126,'0^\\circ',C.orange,23);
    }else if(kind==='opposite'){
      const o=[250,90];
      body=arrow(o,[450,90],C.teal)+arrow(o,[50,90],C.blue)+arc(o,28,0,Math.PI)+label(350,120,V('a'),C.teal,27)+label(145,120,V('b'),C.blue,27)+label(250,36,'180^\\circ',C.orange,24);
    }else{
      const o=[140,115];
      body=arrow(o,[410,115],C.teal)+arrow(o,[140,20],C.blue)+'<path d="M140 97h18v18" fill="none" stroke="'+C.orange+'" stroke-width="2.5"/>'+label(300,142,V('a'),C.teal,27)+label(108,59,V('b'),C.blue,27)+label(203,88,'90^\\circ',C.orange,24);
    }
    return svg(body,{same:'Parallel vectors in the same direction have angle zero.',equal:'Equal vectors coincide, so their angle is zero.',opposite:'Opposite-direction parallel vectors have angle 180 degrees.',perpendicular:'Perpendicular vectors have angle 90 degrees.'}[kind],160,520);
  }
  function sameVector(){
    const o=[65,180],end=[490,180];
    return svg(arrow(o,end,C.pale,10)+arrow(o,end,C.teal,4)+label(277,130,V('a'),C.teal,36)+label(115,225,'\\theta=0^\\circ',C.orange,28),'Two copies of the same vector coincide exactly and have angle zero.',285);
  }
  function keyAngle(){
    const o=[60,115],a=[315,115],b=[220,25];
    return svg(arrow(o,a,C.teal)+arrow(o,b,C.blue)+arc(o,42,0,Math.atan2(90,160))+label(184,141,V('a'),C.teal,25)+label(131,43,V('b'),C.blue,25)+label(118,94,'\\theta',C.orange,25),'The angle for the scalar product is measured tail-to-tail.',165,400);
  }
  function init(){
    if(!window.MathsLesson||!window.VectorDiagramMath?.ready){setTimeout(init,30);return;}
    document.querySelectorAll('[data-geometric]:not([data-geometric-ready])').forEach(m=>{
      const kind=m.dataset.geometric;m.dataset.geometricReady='true';
      if(kind==='explore')explore(m);
      else m.innerHTML=kind==='cover'?cover():kind==='triangle'?triangle():kind==='same-vector'?sameVector():kind==='key-angle'?keyAngle():special(kind.replace('case-',''));
    });
    window.MathsLesson.typeset(document);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
