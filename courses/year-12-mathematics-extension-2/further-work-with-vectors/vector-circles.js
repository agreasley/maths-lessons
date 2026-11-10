/* Lesson 6: circles on equal-scale axes. All diagram labels are native SVG paths. */
(() => {
  'use strict';
  if (!document.querySelector('.circle-lesson')) return;
  const v = s => '\\underset{\\sim}{' + s + '}';
  const C = {ink:'#152e3b', blue:'#315985', green:'#217864', gold:'#ad6e32', grey:'#b1c0c6'};
  const fmt = x => String(Math.abs(x)<0.005 ? 0 : Math.round(x*100)/100);
  const gcd = (a,b) => b ? gcd(b,a%b) : a;
  function angle(d) {
    if (d===0) return '0';
    const g=gcd(d,180), n=d/g, den=180/g;
    return den===1 ? (n===1?'':n)+'\\pi' : '\\frac{'+(n===1?'':n)+'\\pi}{'+den+'}';
  }
  function point(d,centre=[0,0],swapped=false) {
    const t=d*Math.PI/180;
    return [centre[0]+3*(swapped?Math.sin(t):Math.cos(t)),centre[1]+3*(swapped?Math.cos(t):Math.sin(t))];
  }
  window.MathJax.startup.promise.then(() => {
    const math=window.MathsLesson.math, M=window.VectorDiagramMath;
    const label=(x,y,t,c=C.ink,s=23)=>M.label(x,y,t,c,s);
    const segment=(a,b,c,w=3,extra='')=>`<path d="M${a.join(' ')} L${b.join(' ')}" fill="none" stroke="${c}" stroke-width="${w}" ${extra}/>`;
    const dot=(p,c=C.gold,r=5)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${c}"/>`;
    function svg(content,id,description,w=480,h=405) {
      const defs=Object.keys(C).map(n=>`<marker id="${id}-${n}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="${C[n]}"/></marker>`).join('');
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${description}"><defs>${defs}</defs>${content}</svg>`;
    }
    const arrow=(a,b,n,id,w=3)=>Math.hypot(a[0]-b[0],a[1]-b[1])<0.01?'':segment(a,b,C[n],w,`marker-end="url(#${id}-${n})"`);
    function axes(map,xmin,xmax,ymin,ymax) {
      let s='';
      for(let x=xmin;x<=xmax;x++) {
        s+=segment(map(x,ymin),map(x,ymax),'#e6ebec',1);
        if(x!==0&&x%2===0){const a=map(x,0);s+=label(a[0],a[1]+16,String(x),'#75858b',19);}
      }
      for(let y=ymin;y<=ymax;y++) {
        s+=segment(map(xmin,y),map(xmax,y),'#e6ebec',1);
        if(y!==0&&y%2===0){const a=map(0,y);s+=label(a[0]-14,a[1],String(y),'#75858b',19);}
      }
      s+=segment(map(xmin,0),map(xmax,0),'#82979f',1.5)+segment(map(0,ymin),map(0,ymax),'#82979f',1.5);
      const o=map(0,0),x=map(xmax,0),y=map(0,ymax);
      return s+label(o[0]-12,o[1]+19,'O',C.ink,18)+label(x[0]+16,x[1],'x',C.ink,19)+label(y[0],y[1]-17,'y',C.ink,19);
    }
    function circle(map,centre,colour=C.grey) {
      const p=map(...centre),q=map(centre[0]+3,centre[1]);
      return `<circle cx="${p[0]}" cy="${p[1]}" r="${q[0]-p[0]}" fill="none" stroke="${colour}" stroke-width="2.5"/>`;
    }
    const coords=p=>'('+fmt(p[0])+','+fmt(p[1])+')';
    const column=p=>'\\begin{bmatrix}'+fmt(p[0])+'\\\\'+fmt(p[1])+'\\end{bmatrix}';
    const quarterButtons=()=>[0,90,180,270,360].map(d=>`<button data-angle="${d}">${math(angle(d))}</button>`).join('');
    function angleControls(id) {
      return `<div class="circle-slider"><label for="${id}-angle"><span>Adjust ${math('\\theta')}</span> <output class="circle-angle"></output></label><input id="${id}-angle" aria-label="Angle theta" type="range" min="0" max="360" step="1" value="0"></div><div class="circle-controls circle-quarters">${quarterButtons()}</div>`;
    }
    document.querySelectorAll('[data-circle-recap]').forEach((el,i)=>{
      const isLine=el.dataset.circleRecap==='line', id='fv6-recap-'+i;
      const O=[75,192],P=isLine?[297,75]:[295,110];
      let s=segment([30,192],[400,192],C.grey,1.4)+segment([75,220],[75,20],C.grey,1.4);
      s+=isLine?segment([100,153],[373,45],C.green,3):'<circle cx="220" cy="110" r="75" fill="none" stroke="'+C.green+'" stroke-width="3"/>';
      s+=arrow(O,P,'blue',id)+dot(P)+label(55,210,'O')+label(P[0]+18,P[1]-17,'P',C.gold)+label(164,128,v('r'),C.blue);
      el.innerHTML=svg(s,id,isLine?'A position vector points to a point on a rising straight line.':'A position vector points to a point on a circle.',430,240);
    });
    document.querySelectorAll('[data-circle-visual]').forEach(el=>{
      const mode=el.dataset.circleVisual, id='fv6-'+mode;
      const atOrigin=mode==='origin', distance=mode==='distance', centre=atOrigin?[0,0]:[2,-1];
      let degrees=atOrigin?0:60, stage=distance?3:0;
      const map=atOrigin?(x,y)=>[230+39*x,195-39*y]:(x,y)=>[170+36*x,180-36*y];
      const maxStage=atOrigin?2:3;
      el.innerHTML=`<div class="circle-layout"><div><div class="circle-graph"></div><div class="circle-point-caption"></div><div class="circle-vector-caption"></div></div><div class="circle-algebra" aria-live="polite"></div></div>${angleControls(id)}${distance?'':`<div class="circle-controls circle-reveals"><button data-action="previous">Previous</button><button data-action="next" class="primary">Next</button><button data-action="reset">Reset</button></div>`}`;
      function draw() {
        const p=point(degrees,centre),O=map(0,0),P=map(...p),c=map(...centre);
        let s=atOrigin?axes(map,-4,4,-4,4):axes(map,-3,7,-5,4);
        s+=circle(map,centre);
        if(!atOrigin) {
          if(stage>=1&&!distance)s+=arrow(O,c,'green',id,4);
          if(stage>=2)s+=arrow(c,P,'gold',id,4);
          if(stage>=3)s+=arrow(O,P,'blue',id,3);
          s+=dot(c,C.green,4)+label(c[0]-19,c[1]+19,'C',C.green,22);
        } else if(stage>=2)s+=arrow(O,P,'blue',id,4);
        const showPoint=!atOrigin||stage>=1;
        if(showPoint)s+=dot(P)+label(P[0]+(p[0]>=centre[0]?19:-19),P[1]+(p[1]>=centre[1]?-19:20),'P',C.gold,22);
        el.querySelector('.circle-graph').innerHTML=svg(s,id,`Circle of radius 3, centre ${coords(centre)}. ${showPoint?'Amber point '+coords(p)+'.':'Predict the point before revealing it.'} ${stage>=maxStage?'Blue position vector from the origin.':''}`);
        el.querySelector('.circle-point-caption').innerHTML=showPoint?math('P'+coords(p)):'Predict the point, then reveal.';
        el.querySelector('.circle-vector-caption').innerHTML=stage>=maxStage?math(v('r')+'('+angle(degrees)+')'+(p.every(n=>Math.abs(n-Math.round(n*100)/100)<1e-9)?'=':'\\approx ')+column(p)):'';
        let algebra='';
        if(atOrigin) {
          algebra='<p>For this circle, '+math('R=3')+'.</p>'+math('x=3\\cos\\theta,\\quad y=3\\sin\\theta');
          if(stage>=1)algebra+='<p class="circle-gold">Point '+math('P'+coords(p))+'</p>';
          if(stage>=2)algebra+='<div class="circle-blue"><p>The position vector points from '+math('O')+' to '+math('P')+'.</p>'+math(v('r')+'(\\theta)=R\\cos\\theta\\,'+v('i')+'+R\\sin\\theta\\,'+v('j'))+'</div>';
        } else if(distance) {
          algebra='<div class="circle-gold"><p>Radius vector</p>'+math('\\overrightarrow{CP}='+v('r')+'-'+v('c'))+'<p>'+math('|'+v('r')+'-'+v('c')+'|=3')+' always</p></div><div class="circle-blue"><p>Position vector</p>'+math('|'+v('r')+'|\\approx '+fmt(Math.hypot(...p)))+'</div><div class="circle-distance-key">'+math('|'+v('r')+'-'+v('c')+'|=R')+'<p>If the centre is '+math('O')+': '+math('|'+v('r')+'|=R')+'.</p></div>';
        } else {
          algebra='<p>Centre '+math('C(2,-1)')+', radius '+math('R=3')+'.</p>';
          const rows=[['green','Centre vector',math('\\overrightarrow{OC}='+v('c')+'=2'+v('i')+'-'+v('j'))],['gold','Add the radius vector',math('\\overrightarrow{CP}=3\\cos\\theta\\,'+v('i')+'+3\\sin\\theta\\,'+v('j'))],['blue','The position vector',math(v('r')+'=\\overrightarrow{OC}+\\overrightarrow{CP}')+'<br>'+math(v('r')+'(\\theta)=(2+3\\cos\\theta)'+v('i')+'+(-1+3\\sin\\theta)'+v('j'))]];
          algebra+=rows.map((row,i)=>'<div class="circle-construction-row circle-'+row[0]+'"'+(stage<i+1?' hidden':'')+'><p>'+row[1]+'</p>'+row[2]+'</div>').join('');
          if(stage===0)algebra+='<p>How could we construct a vector from '+math('O')+' to '+math('P')+'?</p>';
        }
        el.querySelector('.circle-algebra').innerHTML=algebra;
        el.querySelector('.circle-angle').innerHTML=math('\\theta='+angle(degrees));
        el.querySelector('input').value=degrees;
        el.querySelectorAll('[data-angle]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.angle===degrees)));
        if(!distance) {
          el.querySelector('[data-action="previous"]').disabled=stage===0;
          const next=el.querySelector('[data-action="next"]');
          next.disabled=stage===maxStage;
          next.textContent=stage===maxStage?'Complete':atOrigin?(stage===0?'Show point':'Show position vector'):['Show centre vector','Add radius vector','Show position vector'][stage];
        }
        el.dataset.stage=stage;el.dataset.angle=degrees;el.dataset.point=coords(p);
      }
      el.querySelector('input').addEventListener('input',e=>{degrees=+e.target.value;draw();});
      el.querySelectorAll('[data-angle]').forEach(b=>b.addEventListener('click',()=>{degrees=+b.dataset.angle;draw();}));
      el.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{
        if(b.dataset.action==='reset'){stage=0;degrees=atOrigin?0:60;}
        else stage=Math.max(0,Math.min(maxStage,stage+(b.dataset.action==='next'?1:-1)));
        draw();
      }));
      draw();
    });
    document.querySelectorAll('[data-circle-tracing]').forEach(el=>{
      let swapped=false,step=-1;
      const id='fv6-trace',map=(x,y)=>[230+39*x,195-39*y];
      el.innerHTML='<div class="circle-controls circle-equation-presets"><button data-order="standard" aria-pressed="true">'+math(v('r')+'(t)=3\\cos t\\,'+v('i')+'+3\\sin t\\,'+v('j'))+'</button><button data-order="swapped" aria-pressed="false">'+math(v('r')+'(t)=3\\sin t\\,'+v('i')+'+3\\cos t\\,'+v('j'))+'</button></div><div class="circle-layout"><div class="circle-graph"></div><div class="circle-trace-record" aria-live="polite"></div></div><div class="circle-controls"><button data-action="previous">Previous</button><button data-action="next" class="primary">Show starting point</button><button data-action="reset">Reset</button></div>';
      function draw() {
        let s=axes(map,-4,4,-4,4)+circle(map,[0,0]);
        if(step>=0) {
          const points=Array.from({length:step*30+1},(_,j)=>map(...point(j*3,[0,0],swapped)));
          if(step>0)s+='<path d="M'+points.map(p=>p.join(' ')).join(' L')+'" fill="none" stroke="'+C.green+'" stroke-width="4" marker-end="url(#'+id+'-green)"/>';
          for(let j=0;j<=step;j++)s+=dot(map(...point(j*90,[0,0],swapped)),j===step?C.gold:C.green,j===step?6:4);
        }
        el.querySelector('.circle-graph').innerHTML=svg(s,id,step<0?'Predict the starting point and direction.':(swapped?'Clockwise':'Anticlockwise')+' circle, revealed through t = '+angle(step*90));
        el.querySelector('.circle-trace-record').innerHTML=step<0?'<p>Start with '+math('t=0')+'.<br>Where will the point be?</p>':'<table><thead><tr><th>'+math('t')+'</th><th>Point</th></tr></thead><tbody>'+Array.from({length:step+1},(_,j)=>'<tr'+(j===step?' class="current"':'')+'><td>'+math(angle(j*90))+'</td><td>'+math(coords(point(j*90,[0,0],swapped)))+'</td></tr>').join('')+'</tbody></table>'+(step>=1?'<p class="circle-green">'+(swapped?'Clockwise':'Anticlockwise')+'</p>':'<p>Predict the next point.</p>');
        el.querySelector('[data-action="previous"]').disabled=step===-1;
        const next=el.querySelector('[data-action="next"]');next.disabled=step===4;next.textContent=step===-1?'Show starting point':step===4?'Complete turn':'Next quarter-turn';
        el.querySelectorAll('[data-order]').forEach(b=>b.setAttribute('aria-pressed',String((b.dataset.order==='swapped')===swapped)));
        el.dataset.step=step;el.dataset.order=swapped?'swapped':'standard';
      }
      el.querySelectorAll('[data-order]').forEach(b=>b.addEventListener('click',()=>{swapped=b.dataset.order==='swapped';step=-1;draw();}));
      el.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{step=b.dataset.action==='reset'?-1:Math.max(-1,Math.min(4,step+(b.dataset.action==='next'?1:-1)));draw();}));
      draw();
    });
  });
})();
