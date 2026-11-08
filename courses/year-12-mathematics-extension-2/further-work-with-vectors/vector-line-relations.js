/* Lesson 4: fixed spatial reference diagrams and a 2D parallel-line comparison. */
(() => {
  'use strict';
  if (!document.querySelector('.relation-lesson')) return;
  window.MathJax.startup.promise.then(() => {
    const M = window.VectorDiagramMath, math = window.MathsLesson.math;
    const C = {ink:'#152e3b', blue:'#315985', green:'#217864', gold:'#ad6e32', grey:'#aebdc4'};
    const v = s => '\\underset{\\sim}{'+s+'}';
    const col = (a,b) => '\\begin{bmatrix}'+a+'\\\\'+b+'\\end{bmatrix}';
    const label = (x,y,t,c=C.ink,size=22) => M.label(x,y,t,c,size);
    const path = (a,b,c,width=3,extra='') => '<path d="M'+a.join(' ')+' L'+b.join(' ')+'" fill="none" stroke="'+c+'" stroke-width="'+width+'" '+extra+'/>';
    const dot = (p,c=C.ink) => '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="5" fill="'+c+'"/>';
    const svg = (body,w,h,description) => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+description+'">'+body+'</svg>';

    document.querySelectorAll('[data-parallel-lines]').forEach(el => {
      let onLine = false;
      const map = (x,y) => [80+42*x,360-42*y];
      el.innerHTML='<div class="relation-compare-layout"><div class="relation-compare-graph"></div><div class="relation-compare-working"><div class="relation-line-one"></div><div class="relation-line-two"></div><div class="relation-line-result" aria-live="polite"></div></div></div><div class="line-controls"><button data-line-state="on">Fixed point on '+math('\\ell_1')+'</button><button data-line-state="off">Fixed point off '+math('\\ell_1')+'</button><button data-reset>Reset</button></div>';
      function draw() {
        let g='';
        for(let x=-1;x<=10;x++) g+=path(map(x,-1),map(x,7),'#e5ebed',1);
        for(let y=-1;y<=7;y++) g+=path(map(-1,y),map(10,y),'#e5ebed',1);
        g+=path(map(-1,0),map(10,0),'#80939d',1.5)+path(map(0,-1),map(0,7),'#80939d',1.5);
        for(let x=2;x<=10;x+=2) {const p=map(x,0);g+=label(p[0],p[1]+18,String(x),'#66777f',16);}
        for(let y=2;y<=6;y+=2) {const p=map(0,y);g+=label(p[0]-18,p[1],String(y),'#66777f',16);}
        g+=label(65,378,'O',C.ink,18)+label(521,360,'x',C.ink,20)+label(80,43,'y',C.ink,20);
        const A=map(1,2),B=onLine?map(5,4):map(1,3),offset=onLine?1.5:2.5;
        g+=path(map(-1,1),map(9.2,6.1),C.blue,6);
        g+=path(map(-1,-.5+offset),map(9.2,4.6+offset),C.green,3.5,'stroke-dasharray="10 7"');
        g+=dot(A,C.blue)+dot(B,C.green);
        g+=label(A[0]+45,A[1]+23,'A(1,2)',C.blue,21);
        g+=label(B[0]+20,B[1]-40,onLine?'B(5,4)':'B(1,3)',C.green,21);
        if(onLine) g+=label(512,103,'\\ell_1,\\ell_2',C.ink,23);
        else g+=label(503,104,'\\ell_1',C.blue,23)+label(503,62,'\\ell_2',C.green,23);
        el.querySelector('.relation-compare-graph').innerHTML=svg(g,560,420,onLine?'The dashed green line and blue line coincide. A is one two and B is five four.':'Two distinct parallel lines. A is one two on the blue line and B is one three on the dashed green line.');
        el.querySelector('.relation-line-one').innerHTML=math('\\ell_1:\\quad '+v('r_1')+'='+col(1,2)+'+\\lambda'+col(2,1));
        el.querySelector('.relation-line-two').innerHTML=math('\\ell_2:\\quad '+v('r_2')+'='+col(onLine?5:1,onLine?4:3)+'+\\mu'+col(-4,-2));
        el.querySelector('.relation-line-result').innerHTML=onLine?'<h3>Coincident lines</h3><p>'+math('B')+' lies on '+math('\\ell_1')+': '+math('\\lambda=2')+' works in both components.</p><p>Every point is common to both lines.</p>':'<h3>Distinct parallel lines</h3><p>For '+math('B')+' on '+math('\\ell_1')+': '+math('x')+' gives '+math('\\lambda=0')+', but '+math('y')+' gives '+math('\\lambda=1')+'.</p><p>There is no common point.</p>';
        el.querySelectorAll('[data-line-state]').forEach(b=>b.setAttribute('aria-pressed',String((b.dataset.lineState==='on')===onLine)));
        el.dataset.state=onLine?'coincident':'distinct';
      }
      el.querySelectorAll('[data-line-state]').forEach(b=>b.addEventListener('click',()=>{onLine=b.dataset.lineState==='on';draw();}));
      el.querySelector('[data-reset]').addEventListener('click',()=>{onLine=false;draw();});
      draw();
    });

    document.querySelectorAll('[data-coordinate-plane]').forEach(el => {
      const plane=el.dataset.coordinatePlane,project=(x,y,z)=>[150-36*x+50*y,190+18*x-50*z];
      const O=project(0,0,0),corners={yz:[[0,0,0],[0,3,0],[0,3,3],[0,0,3]],xz:[[0,0,0],[3,0,0],[3,0,3],[0,0,3]],xy:[[0,0,0],[3,0,0],[3,3,0],[0,3,0]]};
      const color={yz:C.blue,xz:C.green,xy:C.gold}[plane];
      let g='<polygon points="'+corners[plane].map(p=>project(...p).join(',')).join(' ')+'" fill="'+color+'" fill-opacity=".14" stroke="'+color+'" stroke-width="2"/>';
      for(const a of [[3.2,0,0],[0,3.2,0],[0,0,3.2]])g+=path(O,project(...a),'#82959d',1.8);
      g+=dot(O,C.ink)+label(25,260,'x',C.ink,22)+label(325,190,'y',C.ink,22)+label(150,12,'z',C.ink,22)+label(135,211,'O',C.ink,22);
      el.innerHTML=svg(g,345,285,'The '+plane+' coordinate plane. Every point has '+({yz:'x',xz:'y',xy:'z'}[plane])+' coordinate zero.');
    });

    document.querySelectorAll('[data-collinearity-diagram]').forEach(el => {
      const A=[65,225],B=[245,165],D=[425,105];
      let g='<defs>'+['blue','green'].map(n=>'<marker id="fv4-collinear-'+n+'" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="'+C[n]+'"/></marker>').join('')+'</defs>';
      g+=path([25,238.333],[475,88.333],C.grey,2);
      g+=path(A,D,C.green,7,'marker-end="url(#fv4-collinear-green)"')+path(A,B,C.blue,4,'marker-end="url(#fv4-collinear-blue)"');
      g+=dot(A)+dot(B,C.blue)+dot(D,C.green)+label(51,251,'A')+label(250,195,'B',C.blue)+label(434,132,'C',C.green);
      g+=label(154,228,'\\overrightarrow{AB}',C.blue,26)+label(292,110,'\\overrightarrow{AC}',C.green,26);
      el.innerHTML=svg(g,510,300,'Collinear points A, B and C. Both vectors AB and AC start at A and follow the same line.');
    });
  });
})();
