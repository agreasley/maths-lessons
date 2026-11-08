/* Lesson 5: independent parameters, skew lines and fixed vector diagrams. */
(() => {
  'use strict';
  if (!document.querySelector('.intersection-lesson')) return;
  window.MathJax.startup.promise.then(() => {
    const M=window.VectorDiagramMath,math=window.MathsLesson.math;
    const C={ink:'#152e3b',blue:'#315985',green:'#217864',gold:'#ad6e32',grey:'#aebdc4'};
    const v=n=>'\\underset{\\sim}{'+n+'}';
    const number=n=>String(Math.abs(n)<1e-8?0:Math.round(n*100)/100);
    const col=a=>'\\begin{bmatrix}'+a.map(number).join('\\\\')+'\\end{bmatrix}';
    const label=(x,y,t,c=C.ink,size=23)=>M.label(x,y,t,c,size);
    const path=(a,b,c,width=3,extra='')=>'<path d="M'+a.join(' ')+' L'+b.join(' ')+'" fill="none" stroke="'+c+'" stroke-width="'+width+'" '+extra+'/>';
    const dot=(p,c,r=5)=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+r+'" fill="'+c+'"/>';
    const svg=(body,w,h,desc)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+desc+'">'+body+'</svg>';
    const marker=(id,c)=>'<marker id="'+id+'" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="'+c+'"/></marker>';

    document.querySelectorAll('[data-independent-parameters]').forEach(el=>{
      let s=0,t=0;
      const map=(x,y)=>[80+40*x,340-40*y];
      el.innerHTML='<div class="inter-live-layout"><div class="inter-live-graph"></div><div class="inter-live-algebra"><div class="inter-line-blue">'+math(v('r_1')+'(s)='+col([1,2])+'+s'+col([2,1]))+'</div><div class="inter-line-green">'+math(v('r_2')+'(t)='+col([6,1])+'+t'+col([-1,3]))+'</div><div class="inter-parameter-controls"><label for="fv5-s">'+math('s')+' <output data-s-output></output></label><input id="fv5-s" aria-label="Parameter s" type="range" min="-0.5" max="3.5" step="0.25" value="0"><label for="fv5-t">'+math('t')+' <output data-t-output></output></label><input id="fv5-t" aria-label="Parameter t" type="range" min="-0.5" max="2" step="0.25" value="0"></div><div class="inter-live-values" aria-live="polite"></div></div></div><div class="inter-controls"><button data-common>Show common point</button><button data-reset>Reset</button><span class="inter-live-status" aria-live="polite"></span></div>';
      const sInput=el.querySelector('#fv5-s'),tInput=el.querySelector('#fv5-t');
      function draw(){
        const P=[1+2*s,2+s],Q=[6-t,1+3*t];
        const same=Math.hypot(P[0]-Q[0],P[1]-Q[1])<1e-8;
        let g='';
        for(let x=-1;x<=10;x++)g+=path(map(x,-1),map(x,8),'#e7ecee',1);
        for(let y=-1;y<=8;y++)g+=path(map(-1,y),map(10,y),'#e7ecee',1);
        g+=path(map(-1,0),map(10,0),'#879aa3',1.5)+path(map(0,-1),map(0,8),'#879aa3',1.5);
        for(let x=2;x<=10;x+=2)g+=label(map(x,0)[0],360,String(x),'#667b85',17);
        for(let y=2;y<=8;y+=2)g+=label(60,map(0,y)[1],String(y),'#667b85',17);
        g+=label(62,360,'O',C.ink,18)+label(501,340,'x')+label(80,7,'y');
        g+=path(map(-1,1),map(9,6),C.blue,3)+path(map(20/3,-1),map(11/3,8),C.green,3);
        g+=label(460,85,'\\ell_1',C.blue,24)+label(202,32,'\\ell_2',C.green,24);
        const p=map(...P),q=map(...Q);
        if(same){g+=dot(p,C.blue,8)+dot(p,C.green,4)+label(p[0]+58,p[1]-24,'P(5,4)',C.ink,24);}
        else{g+=dot(p,C.blue,6)+dot(q,C.green,6)+label(p[0]-18,p[1]+27,'P_1',C.blue,25)+label(q[0]+24,q[1]-20,'P_2',C.green,25);}
        el.querySelector('.inter-live-graph').innerHTML=svg(g,530,400,same?'Both points coincide at five four. Parameter s is two and parameter t is one.':'Two intersecting lines, each with a point controlled by its own parameter.');
        el.querySelector('[data-s-output]').innerHTML=math(number(s));
        el.querySelector('[data-t-output]').innerHTML=math(number(t));
        el.querySelector('.inter-live-values').innerHTML='<div class="inter-line-blue">'+math(v('r_1')+'('+number(s)+')='+col(P))+'</div><div class="inter-line-green">'+math(v('r_2')+'('+number(t)+')='+col(Q))+'</div>';
        el.querySelector('.inter-live-status').innerHTML=same?math(v('r_1')+'(2)='+v('r_2')+'(1)'):'Move each point independently.';
        el.dataset.state=same?'intersection':'separate';el.dataset.s=String(s);el.dataset.t=String(t);
      }
      sInput.addEventListener('input',()=>{s=Number(sInput.value);draw();});
      tInput.addEventListener('input',()=>{t=Number(tInput.value);draw();});
      el.querySelector('[data-common]').addEventListener('click',()=>{s=2;t=1;sInput.value=s;tInput.value=t;draw();});
      el.querySelector('[data-reset]').addEventListener('click',()=>{s=0;t=0;sInput.value=s;tInput.value=t;draw();});
      draw();
    });

    document.querySelectorAll('[data-skew-visual]').forEach(el=>{
      let height=0;
      const project=([x,y,z])=>[200+60*x-40*y,240+12*x+24*y-60*z];
      el.innerHTML='<div class="inter-skew-layout"><div class="inter-skew-graph"></div><div class="inter-skew-explanation" aria-live="polite"></div></div><div class="inter-controls"><button data-skew-state="intersecting">Intersecting</button><button data-skew-state="skew">Skew</button><button data-reset>Reset</button></div>';
      function draw(){
        let g='<polygon points="'+[[0,0,0],[4,0,0],[4,3,0],[0,3,0]].map(p=>project(p).join(',')).join(' ')+'" fill="#edf1f2" stroke="#dbe3e5" stroke-width="1"/>';
        const O=project([0,0,0]);
        for(const p of [[4.5,0,0],[0,3.75,0],[0,0,3.3]])g+=path(O,project(p),'#b0bec4',1.5);
        g+=label(492,300,'x','#72858d',21)+label(34,340,'y','#72858d',21)+label(200,24,'z','#72858d',21)+label(228,240,'O','#72858d',19);
        const P=project([2,1,0]),Q=project([2,1,height]);
        if(height)g+=path(P,Q,C.gold,2,'stroke-dasharray="6 5"');
        g+=path(project([-.5,1,0]),project([4.5,1,0]),C.blue,4);
        g+=path(project([2,-.4,height]),project([2,3.5,height]),C.green,4);
        g+=label(454,320,'\\ell_1',C.blue,25)+label(158, height?227:347,'\\ell_2',C.green,25);
        if(height)g+=dot(P,C.blue,6)+dot(Q,C.green,6)+label(P[0]+20,P[1]+25,'P',C.blue,25)+label(Q[0]+25,Q[1]-12,'Q',C.green,25);
        else g+=dot(P,C.ink,6)+label(P[0]+20,P[1]-24,'P',C.ink,25);
        el.querySelector('.inter-skew-graph').innerHTML=svg(g,540,400,height?'Two non-parallel lines at different heights. Points P and Q have the same x and y coordinates but different z coordinates.':'Two non-parallel lines in the xy-plane intersect at P.');
        el.querySelector('.inter-skew-explanation').innerHTML=height?'<h3>Skew</h3><p>'+math('P=(2,1,0)')+'</p><p>'+math('Q=(2,1,2)')+'</p><p>The matching '+math('x')+' and '+math('y')+' values give different heights.</p><p class="inter-key">No common point.</p>':'<h3>Intersecting</h3><p>Both lines pass through</p><div class="fv-equation">'+math('P=(2,1,0)')+'</div><p>The same point has the same '+math('x')+', '+math('y')+' and '+math('z')+' coordinates.</p>';
        el.querySelectorAll('[data-skew-state]').forEach(b=>b.setAttribute('aria-pressed',String((b.dataset.skewState==='skew')===Boolean(height))));
        el.dataset.state=height?'skew':'intersecting';
      }
      el.querySelectorAll('[data-skew-state]').forEach(b=>b.addEventListener('click',()=>{height=b.dataset.skewState==='skew'?2:0;draw();}));
      el.querySelector('[data-reset]').addEventListener('click',()=>{height=0;draw();});
      draw();
    });

    document.querySelectorAll('[data-concurrent-diagram]').forEach(el=>{
      const P=[265,180];
      let g=path([75,269],[455,91],C.blue,3)+path([65,108],[465,252],C.green,3)+path([240,345],[290,15],C.gold,3);
      g+=dot(P,C.ink,6)+label(245,202,'P',C.ink,27)+label(477,83,'\\ell_1',C.blue,26)+label(484,262,'\\ell_2',C.green,26)+label(311,26,'\\ell_3',C.gold,26);
      el.innerHTML=svg(g,540,370,'Three lines concurrent at the same point P.');
    });

    document.querySelectorAll('[data-distance-connection]').forEach(el=>{
      const O=[65,330],A=[140,90],H=[360,200];
      let g='<defs>'+marker('fv5-position-blue',C.blue)+marker('fv5-position-green',C.green)+marker('fv5-distance-gold',C.gold)+marker('fv5-direction-ink',C.ink)+'</defs>';
      g+=path([283,354],[437,46],C.ink,2.5);
      g+=path(O,A,C.blue,3,'marker-end="url(#fv5-position-blue)"')+path(O,H,C.green,3,'marker-end="url(#fv5-position-green)"')+path(A,H,C.gold,3.5,'marker-end="url(#fv5-distance-gold)"');
      g+=path([377.5,165],[405.5,109],C.ink,5,'marker-end="url(#fv5-direction-ink)"');
      const u=[-2/Math.sqrt(5),-1/Math.sqrt(5)],w=[1/Math.sqrt(5),-2/Math.sqrt(5)];
      const p=[H[0]+18*u[0],H[1]+18*u[1]],q=[p[0]+18*w[0],p[1]+18*w[1]],r=[H[0]+18*w[0],H[1]+18*w[1]];
      g+=path(p,q,C.ink,1.5)+path(q,r,C.ink,1.5);
      g+=dot(O,C.ink,4)+dot(A,C.blue,4)+dot(H,C.green,4);
      g+=label(45,349,'O')+label(123,69,'A',C.blue)+label(381,215,'H',C.green)+label(454,41,'\\ell');
      g+=label(79,203,v('p'),C.blue,27)+label(229,283,v('r')+'(t)',C.green,27)+label(242,122,'\\overrightarrow{AH}',C.gold,27)+label(431,145,v('d'),C.ink,27);
      el.innerHTML=svg(g,510,385,'Point A and its perpendicular foot H on line ell. Position vectors p and r of t start at O. Vector AH equals r of t minus p and is perpendicular to direction d.');
    });
  });
})();
