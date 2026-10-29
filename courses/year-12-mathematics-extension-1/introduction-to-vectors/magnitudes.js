/* Lesson 4: geometry and labels share native SVG coordinates on every browser. */
(() => {
  'use strict';
  const C={ink:'#152e3b',teal:'#007f78',orange:'#b55224',blue:'#3b66a8',muted:'#607078',rule:'#d7d8ce'};
  const V=s=>`\\underset{\\sim}{${s}}`;
  const label=(x,y,t,c=C.ink,size=24)=>VectorDiagramMath.label(x,y,t,c,size);
  const math=t=>MathsLesson.math(t);
  const line=(a,b,c=C.muted,width=2,dash='')=>`<path d="M${a.join(' ')}L${b.join(' ')}" fill="none" stroke="${c}" stroke-width="${width}"${dash?` stroke-dasharray="${dash}"`:''}/>`;
  const arrow=(a,b,c=C.ink,dash='')=>{
    const dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy);if(!len)return '';
    const x=dx/len,y=dy/len;
    return line(a,b,c,4,dash)+`<path d="M${b.join(' ')}L${b[0]-13*x-5*y} ${b[1]-13*y+5*x}L${b[0]-13*x+5*y} ${b[1]-13*y-5*x}Z" fill="${c}"/>`;
  };
  const point=(a,c=C.ink)=>`<circle cx="${a[0]}" cy="${a[1]}" r="4" fill="${c}"/>`;
  const svg=(body,description,height=350)=>`<svg class="m-svg" viewBox="0 0 600 ${height}" role="img" aria-label="${description}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  const polygon=(pts,fill,opacity=.18)=>`<polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="${fill}" fill-opacity="${opacity}" stroke="${C.rule}" stroke-width="1.5"/>`;
  function twoD(){
    const o=[65,300],x=[475,300],q=[475,65];
    return svg(line(o,x)+line(x,q)+line(o,q,C.teal,5)+`<path d="M455 300v-20h20" fill="none" stroke="${C.muted}" stroke-width="2"/>`+label(48,326,'O')+label(475,35,'Q(x,y)')+label(270,327,'|x|')+label(516,185,'|y|')+label(245,160,'d',C.teal,30),'A right triangle with perpendicular sides absolute x and absolute y, and teal diagonal d.');
  }
  function threeD(cover=false){
    const o=[60,270],x=[350,330],y=[240,205],q=[530,265],p=[530,60],ink=cover?'#ffffff':C.ink,teal=cover?'#8cddd0':C.teal,orange=cover?'#d4a16b':C.orange;
    const len=Math.hypot(o[0]-q[0],o[1]-q[1]),ux=(o[0]-q[0])/len*22,uy=(o[1]-q[1])/len*22;
    const angle=`<path d="M${q[0]+ux} ${q[1]+uy}v-22l${-ux} ${-uy}" fill="none" stroke="${ink}" stroke-width="2"/>`;
    return svg(polygon([o,x,q,y],cover?'#8cddd0':C.rule)+line(o,q,teal,5)+line(q,p,orange,5)+arrow(o,p,ink)+angle+label(40,290,'O',ink)+label(465,30,'P(x,y,z)',ink)+label(505,297,'Q(x,y,0)',ink)+label(565,165,'|z|',orange)+label(295,295,'d',teal,30)+label(265,140,'|\\mathbf a|',ink,30), 'The vector OP is the hypotenuse of right triangle OQP. Its teal base OQ has length d from the 2D result; the orange vertical side has length absolute z.',360);
  }
  function distance(){
    const o=[75,300],a=[200,230],b=[495,65];
    // Separate O from line AB so the sketch shows three distinct vectors.
    a[1]=270;
    return svg(arrow(o,a,C.blue)+arrow(o,b,C.muted)+arrow(a,b,C.teal)+label(50,315,'O')+label(195,305,'A')+label(510,40,'B')+label(125,255,'\\mathbf a',C.blue)+label(265,135,'\\mathbf b',C.muted)+label(390,200,'\\mathbf b-\\mathbf a',C.teal), 'Position vectors a and b start at O. The vector from A to B is b minus a.');
  }
  function midpoint(m){
    m.innerHTML='<div class="m-plot"></div><div class="m-controls"><label>Move '+math('B')+' <input type="range" min="360" max="520" step="10" value="490" aria-label="Move endpoint B"></label><button type="button" data-action="reset">Reset</button></div>';
    const draw=()=>{
      const o=[70,60],a=[145,265],b=[Number(m.querySelector('input').value),155],mid=[(a[0]+b[0])/2,(a[1]+b[1])/2];
      m.querySelector('.m-plot').innerHTML=svg(arrow(o,a,C.blue)+arrow(o,b,C.muted)+line(a,b,C.muted,2,'6 6')+arrow(a,mid,C.teal)+arrow(o,mid,C.orange)+point(mid,C.orange)+label(50,36,'O')+label(120,285,'A')+label(b[0]+25,b[1]-5,'B')+label(mid[0]+10,mid[1]+24,'M')+label(76,184,'\\mathbf a',C.blue)+label((o[0]+b[0])/2,82,'\\mathbf b',C.muted)+label(285,285,'\\overrightarrow{AM}=\\tfrac12\\overrightarrow{AB}',C.teal,22),'M stays halfway between A and B. The path O to A to M gives a plus one half of b minus a.',320);
      m.dataset.midpoint=JSON.stringify(mid);m.dataset.endpointB=JSON.stringify(b);
    };
    m.querySelector('input').addEventListener('input',draw);
    m.querySelector('button').addEventListener('click',()=>{m.querySelector('input').value='490';draw();});draw();
  }
  function ratio(){
    const a=[60,210],step=[155,-35],points=Array.from({length:4},(_,i)=>[a[0]+i*step[0],a[1]+i*step[1]]);
    let b='';for(let i=0;i<3;i++)b+=arrow(points[i],points[i+1],C.teal);
    points.forEach(p=>b+=point(p));
    b+=label(60,253,'A(-2,3)')+label(points[1][0],points[1][1]-32,'P(1,1)')+label(points[3][0],points[3][1]-32,'B')+label(300,305,'\\overrightarrow{AB}=3\\overrightarrow{AP}',C.teal);
    return svg(b,'A, P and B lie on a line. AP is one of three equal vector steps from A to B.');
  }
  function unit(m){
    let shown=false;
    m.innerHTML='<div class="m-plot"></div><div class="m-controls"><button data-action="unit" aria-pressed="false">Show unit vector</button><button data-action="reset">Reset</button></div><div class="m-unit-result"></div>';
    const draw=()=>{
      const o=[60,65],a=[460,365],u=[140,125];
      let b=arrow(o,a,shown?C.muted:C.ink,shown?'7 7':'')+label(41,42,'O')+label(405,275,V('a'))+label(420,405,'|'+V('a')+'|=5');
      if(shown)b+=arrow(o,u,C.teal)+label(155,75,'\\widehat{'+V('a')+'}',C.teal)+label(105,174,'1',C.teal);
      m.querySelector('.m-plot').innerHTML=svg(b,'Vector a equals 4i minus 3j and has magnitude 5. Its unit vector has one fifth the length and the same direction.',430);
      m.querySelector('.m-unit-result').innerHTML=shown?math('\\widehat{'+V('a')+'}=\\tfrac45'+V('i')+'-\\tfrac35'+V('j')):math(V('a')+'=4'+V('i')+'-3'+V('j'));
      const button=m.querySelector('[data-action=unit]');button.textContent=shown?'Hide unit vector':'Show unit vector';button.setAttribute('aria-pressed',String(shown));m.dataset.unitVisible=String(shown);
    };
    m.querySelector('[data-action=unit]').onclick=()=>{shown=!shown;draw();};m.querySelector('[data-action=reset]').onclick=()=>{shown=false;draw();};draw();
  }
  function example11(){
    const project=([x,y,z])=>[200+65*x+42*y,305+18*x-20*y-48*z],o=project([0,0,0]),a=project([1,3,4]),b=project([-1,3,2]);
    let body=arrow(o,project([3,0,0]),C.rule)+arrow(o,project([0,5,0]),C.rule)+arrow(o,project([0,0,5]),C.rule);
    body+=label(410,357,'x',C.muted,20)+label(430,200,'y',C.muted,20)+label(180,46,'z',C.muted,20);
    body+=arrow(o,a,C.blue)+arrow(o,b,C.teal)+arrow(a,b,C.orange)+label(185,330,'O')+label(a[0]+45,a[1]-28,'A(1,3,4)',C.ink,22)+label(b[0]-80,b[1]-15,'B(-1,3,2)',C.ink,22)+label(365,210,V('a'),C.blue)+label(210,235,V('b'),C.teal)+label(310,110,V('e'),C.orange);
    return svg(body,'Three-dimensional position vectors a=OA and b=OB; the vector e=AB equals b minus a. A is (1,3,4) and B is (-1,3,2).',380);
  }
  function dot(m){
    let dimensions=2,shown=false;
    m.innerHTML='<div class="m-controls"><button data-action="2d" aria-pressed="true">2D</button><button data-action="3d" aria-pressed="false">3D</button><button data-action="sum" aria-pressed="false">Show sum</button><button data-action="reset">Reset</button></div><div class="m-dot-vectors"></div><div class="m-dot-sum" hidden></div>';
    const colour=(s,c)=>`\\textcolor{${c}}{${s}}`;
    const draw=()=>{
      const colours=[C.teal,C.orange,C.blue],letters=['x','y','z'];
      const entries=n=>letters.slice(0,dimensions).map((v,i)=>colour(v+'_'+n,colours[i])).join(',\\ ');
      const terms=letters.slice(0,dimensions).map((v,i)=>colour(v+'_1'+v+'_2',colours[i])).join('+');
      m.querySelector('.m-dot-vectors').innerHTML=math('\\mathbf a=('+entries(1)+'),\\qquad\\mathbf b=('+entries(2)+')');
      m.querySelector('.m-dot-sum').innerHTML=math('\\mathbf a\\cdot\\mathbf b='+terms);m.querySelector('.m-dot-sum').hidden=!shown;
      for(const dim of [2,3])m.querySelector(`[data-action="${dim}d"]`).setAttribute('aria-pressed',String(dim===dimensions));
      const button=m.querySelector('[data-action=sum]');button.setAttribute('aria-pressed',String(shown));button.textContent=shown?'Hide sum':'Show sum';
      m.dataset.dimensions=String(dimensions);m.dataset.sumVisible=String(shown);
    };
    for(const dim of [2,3])m.querySelector(`[data-action="${dim}d"]`).onclick=()=>{dimensions=dim;shown=false;draw();};
    m.querySelector('[data-action=sum]').onclick=()=>{shown=!shown;draw();};m.querySelector('[data-action=reset]').onclick=()=>{dimensions=2;shown=false;draw();};draw();
  }
  function key(kind){
    let b='';
    if(kind==='key-length')b=line([110,120],[410,120])+line([410,120],[410,30])+arrow([110,120],[410,30],C.teal)+label(100,145,'A')+label(430,30,'B')+label(280,40,'|\\mathbf b-\\mathbf a|',C.teal,26);
    if(kind==='key-midpoint')b=line([90,100],[480,55],C.teal,3)+point([90,100])+point([285,77],C.orange)+point([480,55])+label(75,128,'A')+label(285,45,'M',C.orange)+label(495,80,'B');
    if(kind==='key-unit')b=arrow([70,120],[470,40],C.muted,'7 7')+arrow([70,120],[170,100],C.teal)+label(390,25,'\\mathbf a')+label(130,65,'\\widehat{\\mathbf a}',C.teal)+label(125,145,'1',C.teal);
    if(kind==='key-dot')b=label(110,75,'\\begin{bmatrix}2\\\\3\\end{bmatrix}',C.teal,31)+label(185,75,'\\cdot',C.ink,31)+label(255,75,'\\begin{bmatrix}4\\\\1\\end{bmatrix}',C.orange,31)+label(395,75,'=8+3=11',C.ink,31);
    return svg(b,{ 'key-length':'Distance AB is the magnitude of b minus a.','key-midpoint':'M is halfway between A and B.','key-unit':'The unit vector has length one in the direction of a.','key-dot':'Two column vectors multiply by the dot product to give the scalar eleven.'}[kind],170);
  }
  function init(){
    if(!window.MathsLesson||!window.VectorDiagramMath?.ready){setTimeout(init,30);return;}
    document.querySelectorAll('[data-magnitude]:not([data-magnitude-ready])').forEach(m=>{
      m.dataset.magnitudeReady='true';const kind=m.dataset.magnitude;
      if(kind==='midpoint')midpoint(m);else if(kind==='unit')unit(m);else if(kind==='dot')dot(m);
      else m.innerHTML=kind==='2d'?twoD():kind==='3d'?threeD():kind==='cover'?threeD(true):kind==='distance'?distance():kind==='ratio'?ratio():kind==='example11'?example11():key(kind);
    });MathsLesson.typeset(document);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
