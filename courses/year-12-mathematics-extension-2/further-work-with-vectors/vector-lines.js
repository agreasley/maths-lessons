/* Lesson 3: position vectors, line construction and parameter values.
   Diagram labels use native SVG paths in the diagram coordinate system. */
(() => {
  'use strict';
  if (!document.querySelector('.line-lesson')) return;
  const v = s => '\\underset{\\sim}{' + s + '}';
  const col = (a,b) => '\\begin{bmatrix}' + a + '\\\\' + b + '\\end{bmatrix}';
  const C = {ink:'#152e3b',green:'#217864',blue:'#315985',gold:'#ad6e32',grey:'#bdc9ce'};
  window.MathJax.startup.promise.then(() => {
    const M=window.VectorDiagramMath, math=window.MathsLesson.math;
    const label=(x,y,t,c=C.ink,s=22)=>M.label(x,y,t,c,s);
    const segment=(a,b,c,width=3,extra='')=>'<path d="M'+a.join(' ')+' L'+b.join(' ')+'" fill="none" stroke="'+c+'" stroke-width="'+width+'" '+extra+'/>';
    const dot=(a,c=C.blue)=>'<circle cx="'+a[0]+'" cy="'+a[1]+'" r="5" fill="'+c+'"/>';
    function defs(id) {return '<defs>'+['green','blue','gold'].map(n=>'<marker id="'+id+'-'+n+'" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="'+C[n]+'"/></marker>').join('')+'</defs>';}
    function arrow(a,b,n,id,w=4) {return Math.hypot(a[0]-b[0],a[1]-b[1])<.01?'':segment(a,b,C[n],w,'marker-end="url(#'+id+'-'+n+')"');}
    function svg(content,id,width,height,description) {return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+width+' '+height+'" role="img" aria-label="'+description+'">'+defs(id)+content+'</svg>';}
    function axes(map,xmin,xmax,ymin,ymax,step=1) {
      let s='';
      for(let x=xmin;x<=xmax;x+=step) {
        s+=segment(map(x,ymin),map(x,ymax),'#e5ebed',1);
        if(x!==0) {const a=map(x,0);s+=label(a[0],a[1]+17,String(x),'#66777f',14);}
      }
      for(let y=ymin;y<=ymax;y+=step) {
        s+=segment(map(xmin,y),map(xmax,y),'#e5ebed',1);
        if(y!==0) {const a=map(0,y);s+=label(a[0]-17,a[1],String(y),'#66777f',14);}
      }
      s+=segment(map(xmin,0),map(xmax,0),'#80939d',1.6)+segment(map(0,ymin),map(0,ymax),'#80939d',1.6);
      const O=map(0,0),X=map(xmax,0),Y=map(0,ymax);
      return s+label(O[0]-15,O[1]+19,'O',C.ink,18)+label(X[0]+13,X[1],'x',C.ink,18)+label(Y[0],Y[1]-14,'y',C.ink,18);
    }
    document.querySelectorAll('[data-line-points]').forEach(el=>{
      const values=[0,.5,1,2], vectors=['3'+v('i'),'2.5'+v('i')+'+'+v('j'),'2'+v('i')+'+2'+v('j'),v('i')+'+4'+v('j')];
      // Two separate reveals per parameter: first the point, then its position vector.
      let step=0;
      el.innerHTML='<div class="line-points-layout"><div><div class="line-points-graph"></div><div class="line-position-caption" aria-live="polite"></div></div><div><div class="line-calculation" aria-live="polite"></div><table class="line-points-table"><thead><tr><th>'+math('t')+'</th><th class="line-gold">Point</th><th class="line-blue">Position vector</th></tr></thead><tbody></tbody></table></div></div><div class="line-controls"><button data-action="previous">Previous step</button><button data-action="next" class="primary">Show point</button><button data-action="reset">Reset</button><output></output></div>';
      const map=(x,y)=>[70+52*x,300-52*y];
      function draw(){
        const index=Math.ceil(step/2)-1, vectorShown=step>0&&step%2===0;
        let g=axes(map,-1,6,-1,5);
        if(step===8)g+=segment(map(.5,5),map(3.5,-1),C.grey,2,'stroke-dasharray="6 6"');
        if(index>=0) {
          const t=values[index],x=3-t,y=2*t,O=map(0,0),P=map(x,y);
          if(vectorShown)g+=arrow(O,P,'blue','fv3points');
          // Draw the amber point over the blue arrowhead so they remain distinct.
          for(let j=0;j<=index;j++){
            const q=map(3-values[j],2*values[j]);
            g+='<g opacity="'+(j===index?'1':'.5')+'">'+dot(q,C.gold)+'</g>';
          }
          g+=label(P[0]+43,P[1]-20,'('+x+','+y+')',C.gold,21);
          el.querySelector('.line-calculation').innerHTML=math('t='+t)+':<br>'+math('x=3-'+t+'='+x)+'<br>'+math('y=2('+t+')='+y);
          el.querySelector('.line-position-caption').innerHTML=vectorShown?math(v('r')+'('+t+')='+vectors[index]):'';
        } else {
          el.querySelector('.line-calculation').innerHTML='Start with '+math('t=0')+'.<br>What are the coordinates of the point?';
          el.querySelector('.line-position-caption').innerHTML='';
        }
        const description=index<0?'Coordinate axes. Predict the first point.':vectorShown?'Amber point and blue position vector from the origin, with its parameter label below.':'Amber point only. The position vector is not yet shown.';
        el.querySelector('.line-points-graph').innerHTML=svg(g,'fv3points',445,370,description);
        el.querySelector('tbody').innerHTML=values.map((t,j)=>{
          const pointRevealed=step>=2*j+1, vectorRevealed=step>=2*j+2;
          return '<tr class="'+(j===index?'current':'')+'"><td>'+math(String(t))+'</td><td class="line-gold">'+(pointRevealed?math('('+(3-t)+','+(2*t)+')'):'—')+'</td><td class="line-blue">'+(vectorRevealed?math(v('r')+'('+t+')='+vectors[j]):'—')+'</td></tr>';
        }).join('');
        el.querySelector('[data-action="previous"]').disabled=step===0;
        const next=el.querySelector('[data-action="next"]');
        next.disabled=step===8;
        next.textContent=step===8?'Complete':step%2===0?'Show point':'Show position vector';
        next.setAttribute('aria-label',step===8?'Complete':step%2===0?'Show point for t = '+values[step/2]:'Show position vector for t = '+values[index]);
        el.querySelector('output').innerHTML=index<0?'Predict, then reveal.':math('t='+values[index])+' · '+(vectorShown?'Position vector':'Point');
        el.dataset.step=String(step);
        el.dataset.phase=step===0?'initial':vectorShown?'vector':'point';
      }
      el.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{
        step=b.dataset.action==='reset'?0:b.dataset.action==='next'?Math.min(8,step+1):Math.max(0,step-1);
        draw();
      }));
      draw();
    });
    const fmt=x=>String(Math.round(x*100)/100);
    document.querySelectorAll('[data-line-construction]').forEach(el=>{
      let lambda=1;
      const map=(x,y)=>[80+42*x,215-42*y];
      el.innerHTML='<div class="line-live-construction"><div class="line-construction-graph"></div><div class="line-live-algebra"><p>Take the fixed point '+math('A(3,0)')+' and direction '+math(v('d')+'=-'+v('i')+'+2'+v('j'))+'.</p><div class="fv-equation">'+math(v('r')+'=\\overrightarrow{OA}+\\lambda'+v('d'))+'</div><div class="fv-equation">'+math(v('r')+'=3'+v('i')+'+\\lambda(-'+v('i')+'+2'+v('j')+')')+'</div><p>As '+math('\\lambda')+' varies, the tip of '+math(v('r'))+' traces a line through '+math('A')+'.</p><div class="line-construction-value" aria-live="polite"></div></div></div><div class="line-slider"><label for="fv3-construction-lambda"><span>Adjust '+math('\\lambda')+'</span><output></output></label><input id="fv3-construction-lambda" aria-label="Construction parameter lambda" type="range" min="-1" max="2" step="0.05" value="1"></div><div class="line-controls">'+[-1,0,1,2].map(t=>'<button data-lambda="'+t+'">'+math('\\lambda='+t)+'</button>').join('')+'<button data-reset>Reset</button></div>';
      function draw(){
        const O=map(0,0),A=map(3,0),P=map(3-lambda,2*lambda);
        let g=segment(map(4.2,-2.4),map(.5,5),C.grey,3);
        g+=arrow(O,A,'green','fv3construct',6)+arrow(A,P,'gold','fv3construct',5)+arrow(O,P,'blue','fv3construct',3);
        g+=dot(O,C.ink)+dot(A,C.green)+dot(P,C.gold)+label(O[0]-17,O[1]+20,'O');
        g+=label((O[0]+A[0])/2,O[1]+(lambda<0?-25:26),'\\overrightarrow{OA}',C.green,22);
        if(Math.abs(lambda)<.001)g+=label(A[0]+39,A[1]-20,'P=A',C.gold,21);
        else{
          g+=label(A[0],A[1]+23,'A',C.green);
          g+=label(P[0]+(Math.abs(lambda)<.5?42:25),P[1]-12,'P',C.gold);
          g+=label((A[0]+P[0])/2+37,(A[1]+P[1])/2+(Math.abs(lambda)<.5?26:3),'\\lambda'+v('d'),C.gold,22);
        }
        g+=label((O[0]+P[0])/2-17,(O[1]+P[1])/2+(lambda<0?29:-25),v('r'),C.blue,25);
        el.querySelector('.line-construction-graph').innerHTML=svg(g,'fv3construct',400,350,'The fixed vector OA plus lambda times d gives the blue position vector OP. Lambda is '+fmt(lambda)+'.');
        el.querySelector('.line-construction-value').innerHTML=math('P('+fmt(3-lambda)+','+fmt(2*lambda)+')');
        el.querySelector('output').innerHTML=math('\\lambda='+fmt(lambda));
        el.querySelector('input').value=String(lambda);
        el.querySelectorAll('[data-lambda]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.lambda===lambda)));
        el.dataset.lambda=fmt(lambda);
      }
      el.querySelector('input').addEventListener('input',e=>{lambda=+e.target.value;draw();});
      el.querySelectorAll('[data-lambda]').forEach(b=>b.addEventListener('click',()=>{lambda=+b.dataset.lambda;draw();}));
      el.querySelector('[data-reset]').addEventListener('click',()=>{lambda=1;draw();});
      draw();
    });
    document.querySelectorAll('[data-line-two-points]').forEach(el=>{
      let shown=false;
      el.innerHTML='<div class="line-two-points-layout"><div class="line-two-points-graph"></div><div class="line-two-points-answer" aria-live="polite"></div></div><div class="line-controls"><button data-direction-reveal class="primary">Show a direction vector</button></div>';
      function draw(){
        const O=[80,250],P=[240,210],Q=[400,80];
        let g=segment([200,242.5],[455,35.3],C.grey,3)+arrow(O,P,'green','fv3two')+arrow(O,Q,'blue','fv3two');
        if(shown)g+=arrow(P,Q,'gold','fv3two')+label(350,168,v('q')+'-'+v('p'),C.gold,22);
        g+=dot(O,C.ink)+dot(P,C.green)+dot(Q,C.blue)+label(60,266,'O')+label(255,235,'P',C.green)+label(416,65,'Q',C.blue);
        g+=label(153,250,v('p'),C.green)+label(220,139,v('q'),C.blue);
        el.querySelector('.line-two-points-graph').innerHTML=svg(g,'fv3two',510,300,'The line passes through P and Q, with position vectors p and q.'+(shown?' Its direction PQ is q minus p.':''));
        el.querySelector('.line-two-points-answer').innerHTML=shown?'<p>One direction vector is</p><div class="fv-equation">'+math('\\overrightarrow{PQ}='+v('q')+'-'+v('p'))+'</div><p>Using '+math('P')+' as the fixed point:</p><div class="fv-equation">'+math(v('r')+'='+v('p')+'+\\lambda('+v('q')+'-'+v('p')+')')+'</div>':'';
        el.querySelector('button').textContent=shown?'Hide direction vector':'Show a direction vector';
        el.querySelector('button').setAttribute('aria-expanded',String(shown));
        el.dataset.revealed=String(shown);
      }
      el.querySelector('button').addEventListener('click',()=>{shown=!shown;draw();});draw();
    });
    document.querySelectorAll('[data-line-constant]').forEach(el=>{
      // A fixed linear projection keeps all three labelled points exactly on the plane.
      const project=(x,y,z)=>[210-45*x+68*y,310+22*x+8*y-95*z];
      const polygon=(vertices,fill,opacity)=>'<polygon points="'+vertices.map(a=>project(...a).join(',')).join(' ')+'" fill="'+fill+'" fill-opacity="'+opacity+'" stroke="'+fill+'" stroke-opacity=".35" stroke-width="1.5"/>';
      let g=polygon([[0,0,0],[2.5,0,0],[2.5,2.5,0],[0,2.5,0]],C.grey,.12);
      g+=polygon([[-.3,-.3,1],[2.5,-.3,1],[2.5,2.5,1],[-.3,2.5,1]],C.green,.13);
      const O=project(0,0,0);
      for(const a of [[3,0,0],[0,3.3,0],[0,0,2.4]])g+=segment(O,project(...a),'#82959d',1.5);
      g+=label(62,383,'x',C.ink,20)+label(449,337,'y',C.ink,20)+label(210,68,'z',C.ink,20)+label(193,323,'O',C.ink,20);
      g+=label(184,215,'1',C.green,20)+label(425,166,'z=1',C.green,25);
      g+=segment(project(-.3,2.3,1),project(2.3,-.3,1),C.blue,4);
      const points=[[0,2,1],[1,1,1],[2,0,1]],offsets=[[7,-25],[50,33],[-15,28]];
      points.forEach((pt,i)=>{const pos=project(...pt);g+=dot(pos,C.blue)+label(pos[0]+offsets[i][0],pos[1]+offsets[i][1],'('+pt.join(',')+')',C.blue,21);});
      g+=segment(project(1,1,1),project(1,1,0),C.green,1.5,'stroke-dasharray="4 5"');
      g+=label(318,364,'z=0','#66777f',20);
      el.innerHTML=svg(g,'fv3constant',480,405,'The line x plus y equals 2 lies in the plane z equals 1, above the xy-plane. Points zero two one, one one one and two zero one all have height one.');
    });
    document.querySelectorAll('[data-line-position]').forEach(el=>{
      let lambda=.5;
      const project=(x,y,z)=>[170-35*x+65*y,290+18*x-80*z];
      const point=t=>project(1,1+3*t,1+t),O=project(0,0,0),P=point(0),Q=point(1);
      el.innerHTML='<div class="line-position-layout"><div class="line-position-graph"></div><div class="line-position-details" aria-live="polite"></div></div><div class="line-slider"><label for="fv3-position-lambda"><span>Adjust '+math('\\lambda')+'</span><output></output></label><input id="fv3-position-lambda" aria-label="Position parameter lambda" type="range" min="-0.75" max="1.75" step="0.05" value="0.5"></div><div class="line-controls">'+[-.5,0,.5,1,1.5].map(t=>'<button data-position="'+t+'">'+math('\\lambda='+(t===.5?'\\frac12':t))+'</button>').join('')+'<button data-reset>Reset</button></div>';
      function draw(){
        const R=point(lambda),atP=Math.abs(lambda)<1e-8,atQ=Math.abs(lambda-1)<1e-8,inside=lambda>0&&lambda<1;
        let g='';
        for(const a of [[3.2,0,0],[0,6,0],[0,0,3]])g+=segment(O,project(...a),'#c3cdd2',1.5);
        g+=label(44,355,'x','#75868e',19)+label(575,290,'y','#75868e',19)+label(170,36,'z','#75868e',19)+label(O[0]-16,O[1]+19,'O',C.ink,20);
        g+=segment(point(-.9),point(1.9),'#9eafb8',2.5)+segment(P,Q,C.green,7);
        g+=arrow(P,R,'gold','fv3position',4)+arrow(O,R,'blue','fv3position',3);
        g+=dot(P,C.green)+dot(Q,C.green)+dot(R,C.gold);
        g+=label(P[0]-12,P[1]+26,atP?'P=R':'P',atP?C.gold:C.green,23);
        g+=label(Q[0]+18,Q[1]+25,atQ?'Q=R':'Q',atQ?C.gold:C.green,23);
        if(!atP&&!atQ)g+=label(R[0]+14,R[1]+((Math.abs(lambda)<.15||Math.abs(lambda-1)<.15)?-27:24),'R',C.gold,23);
        g+=label((O[0]+R[0])/2+(lambda<0?-15:18),(O[1]+R[1])/2+(lambda<0?18:21),v('r'),C.blue,24);
        const region=(t,tex,active)=>{const a=point(t);return label(a[0],a[1]-32,tex,active?C.gold:'#75868e',21);};
        g+=region(-.5,'\\lambda<0',lambda<0)+region(.5,'0<\\lambda<1',inside)+region(1.5,'\\lambda>1',lambda>1);
        el.querySelector('.line-position-graph').innerHTML=svg(g,'fv3position',610,365,'Fixed spatial view of P and Q on a line. R has parameter '+fmt(lambda)+'. The green segment is PQ and the blue arrow is its position vector OR.');
        let message=atP?'At '+math('P')+': '+math('R=P')+'.':atQ?'At '+math('Q')+': '+math('R=Q')+'.':lambda<0?'Beyond '+math('P')+', away from '+math('Q')+'.':lambda>1?'Beyond '+math('Q')+', away from '+math('P')+'.':'Between '+math('P')+' and '+math('Q')+'.';
        let ratio='';
        if(inside){
          const n=Math.round(lambda*20),gcd=(a,b)=>b?gcd(b,a%b):a,k=gcd(n,20-n);
          ratio='<p>'+math('PR:RQ=\\lambda:(1-\\lambda)')+'</p><div class="fv-equation">'+math('PR:RQ='+n/k+':'+(20-n)/k)+'</div>';
          if(Math.abs(lambda-.5)<1e-8)ratio+='<p>'+math('R')+' is the midpoint.</p>';
        }
        el.querySelector('.line-position-details').innerHTML='<div class="fv-equation">'+math('\\overrightarrow{PR}=\\lambda\\overrightarrow{PQ}')+'</div><p class="line-position-message">'+message+'</p>'+ratio;
        el.querySelector('output').innerHTML=math('\\lambda='+fmt(lambda));
        el.querySelector('input').value=String(lambda);
        el.querySelectorAll('[data-position]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.position===lambda)));
        el.dataset.lambda=fmt(lambda);el.dataset.region=atP?'P':atQ?'Q':inside?'between':lambda<0?'before':'beyond';
      }
      el.querySelector('input').addEventListener('input',e=>{lambda=+e.target.value;draw();});
      el.querySelectorAll('[data-position]').forEach(b=>b.addEventListener('click',()=>{lambda=+b.dataset.position;draw();}));
      el.querySelector('[data-reset]').addEventListener('click',()=>{lambda=.5;draw();});
      draw();
    });
    document.querySelectorAll('[data-line-parameter]').forEach(el=>{
      const vals=[-1,0,1/3,1,2], tex=['-1','0','\\frac13','1','2'];
      let index=-1,seen=new Set();
      const map=(x,y)=>[350+27*x,265-27*y];
      el.innerHTML='<div class="line-parameter-graph"></div><div class="line-controls line-parameter-controls">'+vals.map((t,i)=>'<button data-index="'+i+'">'+math('\\lambda='+tex[i])+'</button>').join('')+'<button data-reset>Reset</button><output aria-live="polite"></output></div>';
      function draw(){
        let g=axes(map,-8,16,-2,8,2);
        g+=segment(map(-7,-2),map(13,8),C.grey,3);
        const O=map(0,0),P=map(1,2),Q=map(7,5);
        g+=dot(P,C.green)+dot(Q,C.green)+label(P[0]-18,P[1]-23,'P(1,2)',C.green,22)+label(Q[0],Q[1]-25,'Q(7,5)',C.green,22);
        [...seen].forEach(i=>{const t=vals[i],x=1+6*t,y=2+3*t,R=map(x,y);g+=dot(R,i===index?C.blue:C.grey);if(i!==1&&i!==3)g+=label(R[0],R[1]+25,'('+x+','+y+')',C.blue,21);});
        if(index>=0){
          const t=vals[index],x=1+6*t,y=2+3*t,R=map(x,y);
          g+=arrow(O,R,'blue','fv3parameter',3)+arrow(P,R,'gold','fv3parameter',4)+dot(R);
          el.querySelector('output').innerHTML=math('R('+x+','+y+')');
        }else el.querySelector('output').textContent='Calculate, then select a value.';
        el.querySelector('.line-parameter-graph').innerHTML=svg(g,'fv3parameter',850,335,'The line through P and Q with the selected point R and its position vector from O. Previously selected points remain visible.');
        el.querySelectorAll('[data-index]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.index===index)));
        el.dataset.index=String(index);el.dataset.visited=[...seen].join(',');
      }
      el.querySelectorAll('[data-index]').forEach(b=>b.addEventListener('click',()=>{index=+b.dataset.index;seen.add(index);draw();}));
      el.querySelector('[data-reset]').addEventListener('click',()=>{index=-1;seen.clear();draw();});
      draw();
    });
  });
})();
