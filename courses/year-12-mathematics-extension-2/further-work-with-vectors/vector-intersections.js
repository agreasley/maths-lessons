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

    // A rigid rotation tilts the diagram while preserving lengths and right angles.
    // Mathematical labels stay upright at their transformed anchor points.
    // HTML fragments control matching SVG stages; no SVG foreignObject is used.
    function distanceDiagram(el,projection){
      const section=el.closest('section');
      const angle=-Math.PI/9,cos=Math.cos(angle),sin=Math.sin(angle);
      const tilt=([x,y])=>[265+cos*(x-265)-sin*(y-230),210+sin*(x-265)+cos*(y-230)];
      const edge=(a,b,...style)=>path(tilt(a),tilt(b),...style);
      const point=(p,...style)=>dot(tilt(p),...style);
      const tag=(x,y,...style)=>label(...tilt([x,y]),...style);
      const B=[65,300],A=[340,85],H=[340,300];
      const prefix=projection?'fv5-projection':'fv5-perpendicularity';
      const arrow=(a,b,c,name,width=3.5)=>edge(a,b,c,width,'marker-end="url(#'+prefix+'-'+name+')"');
      function draw(){
        const visible=[...section.querySelectorAll('[data-distance-reveal].visible')];
        const stage=visible.reduce((n,f)=>Math.max(n,Number(f.dataset.distanceReveal)),0);
        let g='<defs>'+marker(prefix+'-blue',C.blue)+marker(prefix+'-green',C.green)+marker(prefix+'-gold',C.gold)+marker(prefix+'-ink',C.ink)+'</defs>';
        g+=edge([25,300],[490,300],C.ink,2);
        g+=arrow([400,300],[465,300],C.ink,'ink',4)+tag(432,274,v('d'),C.ink,25)+tag(503,300,'\\ell');
        g+=arrow(B,A,C.blue,'blue')+point(B,C.ink,4)+point(A,C.blue,4);
        g+=tag(53,330,'B',C.ink,25)+tag(359,65,'A',C.blue,25)+tag(151,154,v('u')+'=\\overrightarrow{BA}',C.blue,24);
        if(projection){
          if(stage>=1){
            g+=arrow(B,H,C.green,'green',4)+point(H,C.green,4)+tag(350,330,'H',C.green,25)+tag(200,332,'\\overrightarrow{BH}',C.green,25);
            g+=stage>=2?arrow(H,A,C.gold,'gold',4):edge(H,A,C.grey,2,'stroke-dasharray="6 5"');
            g+=edge([324,300],[324,284],stage>=2?C.gold:C.grey,1.5)+edge([324,284],[340,284],stage>=2?C.gold:C.grey,1.5);
          }
          if(stage>=2)g+=tag(380,192,'\\overrightarrow{HA}',C.gold,27);
        }else{
          const P=stage?H:[210,300];
          g+=arrow(B,P,C.green,'green',4)+arrow(P,A,C.gold,'gold',4)+point(P,C.green,4);
          g+=tag(stage?350:217,330,stage?'H':'P(t)',C.green,25);
          g+=tag(stage?200:134,354,stage?'\\overrightarrow{BH}=t'+v('d'):'\\overrightarrow{BP}=t'+v('d'),C.green,24);
          g+=tag(stage?380:310,204,stage?'\\overrightarrow{HA}':'\\overrightarrow{PA}',C.gold,27);
          if(stage)g+=edge([324,300],[324,284],C.gold,1.5)+edge([324,284],[340,284],C.gold,1.5);
        }
        el.dataset.stage=String(stage);
        const desc=projection?(stage===0?'Vector BA joins known point B on the line to given point A.':stage===1?'BH is the projection of BA onto the line; H is the perpendicular foot.':'BA equals BH plus HA. The minimum distance is the magnitude of perpendicular vector HA.'):(stage?'The closest point is H. HA equals u minus t d and is perpendicular to the line.':'General point P of t lies on the line. BP equals t d and PA equals u minus t d.');
        el.innerHTML=svg(g,530,400,desc);
      }
      const observer=new MutationObserver(draw);
      section.querySelectorAll('[data-distance-reveal]').forEach(f=>observer.observe(f,{attributes:true,attributeFilter:['class']}));
      draw();
    }
    document.querySelectorAll('[data-distance-projection]').forEach(el=>distanceDiagram(el,true));
    document.querySelectorAll('[data-distance-perpendicularity]').forEach(el=>distanceDiagram(el,false));

  });
})();
