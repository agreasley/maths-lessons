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
      let index=-1;
      el.innerHTML='<div class="line-points-layout"><div class="line-points-graph"></div><div><div class="line-calculation" aria-live="polite"></div><table class="line-points-table"><thead><tr><th>'+math('t')+'</th><th>Point</th><th>Position vector</th></tr></thead><tbody></tbody></table></div></div><div class="line-controls"><button data-action="previous">Previous value</button><button data-action="next" class="primary">Next value</button><button data-action="reset">Reset</button><output></output></div>';
      const map=(x,y)=>[70+52*x,300-52*y];
      function draw(){
        let g=axes(map,-1,6,-1,5);
        for(let j=0;j<=index;j++){const t=values[j],x=3-t,y=2*t;g+=dot(map(x,y),j===index?C.blue:C.grey);}
        if(index>=0) {
          const t=values[index],x=3-t,y=2*t,O=map(0,0),P=map(x,y);
          g+=arrow(O,P,'blue','fv3points')+dot(P);
          g+=label(P[0]+43,P[1]-20,'('+x+','+y+')',C.blue,21);
          if(index===3)g+=segment(map(.5,5),map(3.5,-1),C.blue,2,'stroke-dasharray="6 6"');
          el.querySelector('.line-calculation').innerHTML=math('t='+t)+':<br>'+math('x=3-'+t+'='+x)+'<br>'+math('y=2('+t+')='+y);
        } else el.querySelector('.line-calculation').innerHTML='Start with '+math('t=0')+'.<br>What point will the vector point to?';
        el.querySelector('.line-points-graph').innerHTML=svg(g,'fv3points',445,370,'Coordinate axes with previously calculated points and the current position vector from the origin.');
        el.querySelector('tbody').innerHTML=values.map((t,j)=>'<tr class="'+(j===index?'current':'')+'"><td>'+math(String(t))+'</td><td>'+(j<=index?math('('+(3-t)+','+(2*t)+')'):'—')+'</td><td>'+(j<=index?math(vectors[j]):'—')+'</td></tr>').join('');
        el.querySelector('[data-action="previous"]').disabled=index<0;
        el.querySelector('[data-action="next"]').disabled=index===3;
        el.querySelector('output').textContent=index<0?'Predict, then reveal.':'Value '+(index+1)+' of 4';
        el.dataset.step=String(index+1);
      }
      el.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{index=b.dataset.action==='reset'?-1:b.dataset.action==='next'?Math.min(3,index+1):Math.max(-1,index-1);draw();}));
      draw();
    });
    document.querySelectorAll('[data-line-construction]').forEach(el=>{
      let step=0,lambda=1;
      const map=(x,y)=>[80+42*x,235-42*y];
      el.innerHTML='<div class="line-construction-layout"><div class="line-construction-graph"></div><div class="line-construction-working" aria-live="polite"></div></div><div class="line-controls"><button data-step="previous">Previous step</button><button data-step="next" class="primary">Next step</button><button data-step="reset">Reset</button><output></output></div><div class="line-presets" hidden><span>'+math('\\lambda')+':</span>'+[-1,0,1,2].map(t=>'<button data-lambda="'+t+'">'+math(String(t))+'</button>').join('')+'</div>';
      function draw(){
        const O=map(0,0),A=map(3,0),P=map(3-lambda,2*lambda),B=map(2,2);
        let g=segment(map(4.2,-2.4),map(.5,5),C.grey,3)+dot(O,C.ink)+label(O[0]-17,O[1]+20,'O')+arrow(O,A,'green','fv3construct',6)+dot(A,C.green)+label(A[0],A[1]+24,'A',C.green)+label((O[0]+A[0])/2,O[1]+26,v('a'),C.green);
        if(step===1)g+=arrow(A,B,'gold','fv3construct')+label((A[0]+B[0])/2+30,(A[1]+B[1])/2,v('d'),C.gold);
        if(step>=2){
          g+=arrow(A,P,'gold','fv3construct',5)+dot(P,C.gold);
          if(lambda!==0)g+=label(P[0]+27,P[1], 'P',C.gold)+label((A[0]+P[0])/2+35,(A[1]+P[1])/2,'\\lambda'+v('d'),C.gold,21);
          else g+=label(A[0]+47,A[1]-19,'P=A',C.gold,20);
        }
        if(step>=3){
          g+=arrow(O,P,'blue','fv3construct',3);
          g+=label((O[0]+P[0])/2-17,(O[1]+P[1])/2+(lambda<0?27:-25),v('r'),C.blue,24);
        }
        el.querySelector('.line-construction-graph').innerHTML=svg(g,'fv3construct',400,360,'Known point A on a line. The vector OA plus lambda times direction d gives the position vector OP.');
        const work=[
          '<p class="line-green">Known point '+math('A(3,0)')+'</p>'+math(v('a')+'=\\overrightarrow{OA}=3'+v('i')),
          '<p class="line-gold">Choose a direction parallel to the line.</p>'+math(v('d')+'=-'+v('i')+'+2'+v('j')),
          '<p>Every point '+math('P')+' on the line satisfies</p>'+math('\\overrightarrow{AP}=\\lambda'+v('d')),
          '<p class="line-blue">The position vector points from '+math('O')+' to '+math('P')+'.</p>'+math(v('r')+'=\\overrightarrow{OA}+\\overrightarrow{AP}')+'<br>'+math(v('r')+'='+v('a')+'+\\lambda'+v('d'))
        ];
        el.querySelector('.line-construction-working').innerHTML=work.slice(0,step+1).map((x,i)=>'<div class="'+(i===step?'current':'')+'">'+x+'</div>').join('');
        el.querySelector('[data-step="previous"]').disabled=step===0;
        el.querySelector('[data-step="next"]').disabled=step===3;
        el.querySelector('output').textContent='Step '+step+' of 3';
        el.querySelector('.line-presets').hidden=step<2;
        el.querySelectorAll('[data-lambda]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.lambda===lambda)));
        el.dataset.step=String(step);el.dataset.lambda=String(lambda);
      }
      el.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{step=b.dataset.step==='reset'?0:b.dataset.step==='next'?Math.min(3,step+1):Math.max(0,step-1);if(b.dataset.step==='reset')lambda=1;draw();}));
      el.querySelectorAll('[data-lambda]').forEach(b=>b.addEventListener('click',()=>{lambda=+b.dataset.lambda;draw();}));
      draw();
    });
    document.querySelectorAll('[data-line-two-points]').forEach(el=>{
      const O=[90,245],P=[270,205],Q=[430,80];
      let g=segment([220,244],[480,41],C.grey,3)+arrow(O,P,'green','fv3two')+arrow(O,Q,'blue','fv3two')+arrow(P,Q,'gold','fv3two')+dot(O,C.ink)+dot(P,C.green)+dot(Q,C.blue);
      g+=label(70,260,'O')+label(288,228,'P',C.green)+label(448,63,'Q',C.blue);
      g+=label(175,245,v('p'),C.green)+label(235,134,v('q'),C.blue)+label(385,157,v('q')+'-'+v('p'),C.gold);
      el.innerHTML=svg(g,'fv3two',570,290,'Position vectors p and q from O to P and Q, with direction vector PQ equal to q minus p.');
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
