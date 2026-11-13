/* Lesson 8: component functions, restrictions and an informal spiral introduction. */
(() => {
  'use strict';
  if (!document.querySelector('.curve-lesson')) return;
  const v=s=>'\\underset{\\sim}{'+s+'}';
  const C={ink:'#152e3b',blue:'#315985',green:'#217864',gold:'#ad6e32',grey:'#a7b7bc'};
  const TAU=2*Math.PI;
  const fmt=n=>String(Math.abs(n)<0.005?0:Math.round(n*100)/100);
  function parameter(t,trig) {
    if(!trig)return fmt(t);
    const n=Math.round(t/(Math.PI/2));
    if(Math.abs(t-n*Math.PI/2)<0.001){
      if(!n)return '0';
      if(n%2===0)return (n===2?'':n/2)+'\\pi';
      return '\\frac{'+(n===1?'':n)+'\\pi}{2}';
    }
    return fmt(t);
  }
  const point=(kind,t,changed)=>{
    if(kind==='parabola')return [1-t,t*t];
    if(kind==='bounded')return [Math.cos(2*t),Math.sin(t)];
    if(kind==='horizontal')return [2*Math.cos(t),2*Math.sin(t),1];
    const radius=(kind==='planar'||kind==='widening')&&changed?t:2;
    const z=kind==='widening'||(kind==='helix'&&changed)?t/Math.PI:0;
    return kind==='planar'?[radius*Math.cos(t),radius*Math.sin(t)]:[radius*Math.cos(t),radius*Math.sin(t),z];
  };
  window.MathJax.startup.promise.then(()=>{
    const math=window.MathsLesson.math,M=window.VectorDiagramMath;
    const label=(x,y,s,c=C.ink,size=22)=>M.label(x,y,s,c,size);
    const line=(a,b,c=C.grey,w=1.5,extra='')=>`<path d="M${a.join(' ')}L${b.join(' ')}" stroke="${c}" stroke-width="${w}" fill="none" ${extra}/>`;
    const dot=(p,c=C.gold,r=5)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${c}"/>`;
    const path=(pts,c=C.green,w=3,extra='')=>`<path d="M${pts.map(p=>p.join(' ')).join('L')}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
    const sample=(fn,a,b,n=180)=>Array.from({length:n+1},(_,j)=>fn(a+(b-a)*j/n));
    function svg(s,id,description,w=500,h=400){
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${description}"><defs><marker id="${id}-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="${C.blue}"/></marker><marker id="${id}-trace" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="3.5" markerHeight="3.5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="${C.green}"/></marker></defs>${s}</svg>`;
    }
    function mapFor(kind,top=false){
      if(kind==='parabola')return p=>[250+31*p[0],340-31*p[1]];
      if(kind==='bounded')return p=>[250+115*p[0],200-115*p[1]];
      const big=kind==='planar'||kind==='widening',scale=big?13:65;
      if(kind==='planar'||top)return p=>[250+scale*p[0],200-scale*p[1]];
      return p=>[250+scale*(p[0]-p[1])/Math.SQRT2,285+scale*((p[0]+p[1])/Math.sqrt(6)-(p[2]||0)*Math.sqrt(2/3))];
    }
    function axes2(map,xmin,xmax,ymin,ymax,step){
      let s='';
      for(let x=Math.ceil(xmin/step)*step;x<=xmax;x+=step){
        s+=line(map([x,ymin]),map([x,ymax]),'#e4eaeb',0.8);
        if(x)s+=label(map([x,0])[0],map([x,0])[1]+20,String(x),'#6b7e86',19);
      }
      for(let y=Math.ceil(ymin/step)*step;y<=ymax;y+=step){
        s+=line(map([xmin,y]),map([xmax,y]),'#e4eaeb',0.8);
        if(y)s+=label(map([0,y])[0]-20,map([0,y])[1],String(y),'#6b7e86',19);
      }
      s+=line(map([xmin,0]),map([xmax,0]),'#8c9fa6')+line(map([0,ymin]),map([0,ymax]),'#8c9fa6');
      const O=map([0,0]),X=map([xmax,0]),Y=map([0,ymax]);
      return s+label(O[0]-14,O[1]+20,'O',C.ink,19)+label(X[0]+16,X[1],'x')+label(Y[0],Y[1]-18,'y');
    }
    function axes3(map,kind){
      const big=kind==='widening',l=big?15:2.8,zmax=big?6:kind==='horizontal'?2.4:4.5;
      let s='';
      if(kind==='horizontal'){
        const corners=[[-2.6,-2.6,1],[2.6,-2.6,1],[2.6,2.6,1],[-2.6,2.6,1]].map(map);
        s+='<polygon points="'+corners.map(p=>p.join(',')).join(' ')+'" fill="#e7f1ec" stroke="#c3d8ce" stroke-width="1"/>';
        s+=line(map([0,0,0]),map([0,0,1]),C.green,2,'stroke-dasharray="5 5"');
        const c=map([0,0,1]);s+=dot(c,C.green,3)+label(398,139,'z=1',C.green,21);
      }
      s+=line(map([-l,0,0]),map([l,0,0]))+line(map([0,-l,0]),map([0,l,0]))+line(map([0,0,0]),map([0,0,zmax]));
      const O=map([0,0,0]),X=map([l,0,0]),Y=map([0,l,0]),Z=map([0,0,zmax]);
      s+=label(O[0]-15,O[1]+16,'O',C.ink,18)+label(X[0]+15,X[1]+10,'x')+label(Y[0]-15,Y[1]+10,'y')+label(Z[0],Z[1]-18,'z');
      if(!big){for(const k of [1,2,4].filter(k=>k<zmax)){const p=map([0,0,k]);s+=label(p[0]-15,p[1],String(k),'#6b7e86',18);}}
      else {const p=map([0,0,4]);s+=label(p[0]-15,p[1],'4','#6b7e86',18);}
      return s;
    }
    function base(kind,map,top){
      if(kind==='parabola')return axes2(map,-6,6,-1,10,2);
      if(kind==='bounded')return axes2(map,-1.6,1.6,-1.5,1.5,1);
      if(kind==='planar')return axes2(map,-14,14,-14,14,5);
      if(top)return axes2(map,kind==='widening'?-14:-2.8,kind==='widening'?14:2.8,kind==='widening'?-14:-2.5,kind==='widening'?14:2.5,kind==='widening'?5:1);
      return axes3(map,kind);
    }
    const equation=(kind,changed)=>{
      const a=changed?'t':'2';
      if(kind==='planar')return v('r')+'(t)='+a+'\\cos t\\,'+v('i')+'+'+a+'\\sin t\\,'+v('j');
      if(kind==='helix')return v('r')+'(t)=2\\cos t\\,'+v('i')+'+2\\sin t\\,'+v('j')+(changed?'+\\frac{t}{\\pi}'+v('k'):'');
      return v('r')+'(t)='+a+'\\cos t\\,'+v('i')+'+'+a+'\\sin t\\,'+v('j')+'+\\frac{t}{\\pi}'+v('k');
    };
    const descriptions={
      planar:['Circle: the radius stays fixed.','Planar spiral: the radius changes as it turns.'],
      helix:['Circle: the height stays fixed.','Helix: the height changes as it turns.'],
      widening:['Helix: fixed radius, increasing height.','The curve widens as it rises.']
    };
    const prompts={planar:'What happens if the 2 becomes t in both components?',helix:'Will it close up into a circle if the height keeps increasing?',widening:'Which part would you change to make it widen as it rises?'};
    document.querySelectorAll('[data-curve-visual]').forEach((el,index)=>{
      const kind=el.dataset.curveVisual,id='fv8-curve-'+index,concealed=el.dataset.concealed==='true';
      const spiral=!concealed,trig=kind!=='parabola',three=['horizontal','helix','widening'].includes(kind);
      const max=kind==='parabola'?3:concealed?TAU:2*TAU;
      let t=0,changed=false,shown=!concealed,showPoint=false,showVector=false,full=false,top=false,playing=false,raf=0,last=0;
      const modeLabels=kind==='planar'?['Circle','Changing radius']:kind==='helix'?['Fixed height','Rising height']:['Fixed radius','Widening radius'];
      const presets=kind==='parabola'?[0,1,2,3]:concealed?[0,Math.PI/2,Math.PI,3*Math.PI/2,TAU]:[0,Math.PI,TAU,3*Math.PI,4*Math.PI];
      const modeHTML=spiral?'<div class="curve-modes">'+modeLabels.map((s,i)=>`<button data-mode="${i}" aria-pressed="${i===0}">${s}</button>`).join('')+'</div>':'';
      const toolbar=`<div class="curve-controls"><button data-action="play">Play</button><button data-action="reset">Reset</button><button data-action="point" aria-pressed="false">Show point</button><button data-action="vector" aria-pressed="false">Show vector</button></div>`;
      const slider=`<div class="curve-slider"><label for="${id}-t">${math('t')} <output></output></label><input id="${id}-t" type="range" min="0" max="${max}" step="${max/400}" value="0" aria-label="Parameter t"></div>`;
      const buttons='<div class="curve-presets">'+presets.map(n=>`<button data-t="${n}">${math(parameter(n,trig))}</button>`).join('')+'</div>';
      const graph='<div class="curve-graph"></div><div class="curve-readouts"><div class="curve-point-value"></div><div class="curve-vector-value"></div></div>';
      const options=(three?'<button class="curve-view" data-action="view" aria-pressed="false">Top view</button>':'')+(['parabola','bounded'].includes(kind)?'<label class="curve-compare"><input type="checkbox"> Full parabola</label>':'');
      if(spiral){
        el.classList.add('curve-wide');
        el.innerHTML='<div class="curve-visual-layout"><div>'+graph+'</div><div class="curve-explore">'+modeHTML+'<div class="curve-formula"></div><div class="curve-interval">'+math('0\\le t\\le4\\pi')+'</div><p class="curve-prompt"></p><p class="curve-description" aria-live="polite"></p>'+slider+toolbar+buttons+'<div class="curve-options">'+options+'</div></div></div>';
        el.querySelector('.curve-prompt').innerHTML=kind==='planar'?'What happens if the '+math('2')+' becomes '+math('t')+' in both components?':prompts[kind];
      }else{
        el.classList.add('curve-compact');
        el.innerHTML='<div class="curve-placeholder">Complete your sketch, then check the curve.</div><div class="curve-body" hidden>'+graph+slider+toolbar+buttons+'<div class="curve-options">'+options+'<span class="curve-window"></span></div></div><button class="curve-reveal" data-action="reveal">Show graph</button>';
      }
      let cachedBase='',baseKey='';
      function draw(){
        el.dataset.t=String(t);el.dataset.changed=String(changed);el.dataset.pointVisible=String(showPoint);el.dataset.vectorVisible=String(showVector);el.dataset.playing=String(playing);el.dataset.view=top?'top':'3d';
        if(!spiral){el.querySelector('.curve-body').hidden=!shown;el.querySelector('.curve-placeholder').hidden=shown;el.querySelector('[data-action="reveal"]').textContent=shown?'Hide graph':'Show graph';}
        if(!shown)return;
        const map=mapFor(kind,top),p=point(kind,t,changed),P=map(p),O=map([0,0,0]);
        const newKey=kind+top;
        if(newKey!==baseKey){baseKey=newKey;cachedBase=base(kind,map,top);}
        let s=cachedBase;
        if(full&&kind==='parabola')s+=path(sample(u=>map([1-u,u*u]),-Math.sqrt(10),Math.sqrt(10)),C.grey,2,'stroke-dasharray="6 5"');
        if(full&&kind==='bounded')s+=path(sample(y=>map([1-2*y*y,y]),-1.14,1.14),C.grey,2,'stroke-dasharray="6 5"');
        if(kind==='parabola')s+=path(sample(u=>map(point(kind,u,false)),0,Math.sqrt(10)),C.green,2,'opacity="0.28" marker-end="url(#'+id+'-trace)"');
        if(kind==='bounded')s+=path(sample(y=>map([1-2*y*y,y]),-1,1),C.green,2,'opacity="0.28"');
        if(kind==='horizontal')s+=path(sample(u=>map(point(kind,u,false)),0,TAU),C.green,2,'opacity="0.28"');
        if(t>0)s+=path(sample(u=>map(point(kind,u,changed)),0,t,Math.max(2,Math.ceil(t*32))),C.green,4);
        if(showVector&&Math.hypot(P[0]-O[0],P[1]-O[1])>0.01)s+=line(O,P,C.blue,3,'marker-end="url(#'+id+'-arrow)"');
        if(showPoint)s+=dot(P)+label(P[0]+(P[0]>430?-18:18),P[1]+(P[1]<40?20:-17),'P',C.gold,22);
        const caption=kind==='parabola'?'The path y=(1−x)² for x≤1.':kind==='bounded'?'The path x=1−2y² for −1≤y≤1, retraced as t increases.':kind==='horizontal'?'A circle in the plane z=1.':descriptions[kind][Number(changed)];
        el.querySelector('.curve-graph').innerHTML=svg(s,id,caption+(top?' Top view along the z-axis.':'')+' Current t '+fmt(t)+'.');
        const values=p.map(fmt),exact=p.every((n,i)=>Math.abs(n-Number(values[i]))<1e-8),pt='P\\,('+values.join(',')+')',vec=v('r')+'('+parameter(t,trig)+')'+(exact?'=':'\\approx')+'('+values.join(',')+')';
        el.querySelector('.curve-point-value').innerHTML=showPoint?math(pt):'';
        el.querySelector('.curve-vector-value').innerHTML=showVector?math(vec):'';
        el.querySelector('output').innerHTML=math(parameter(t,trig));el.querySelector('input[type="range"]').value=String(t);
        el.querySelector('[data-action="play"]').textContent=playing?'Pause':t>=max-1e-8?'Replay':'Play';
        for(const [action,state] of [['point',showPoint],['vector',showVector]]){const b=el.querySelector('[data-action="'+action+'"]');b.textContent=(state?'Hide ':'Show ')+(action==='vector'?'vector':'point');b.setAttribute('aria-pressed',String(state));}
        el.querySelectorAll('[data-t]').forEach(b=>b.setAttribute('aria-pressed',String(Math.abs(+b.dataset.t-t)<0.001)));
        if(three){const b=el.querySelector('[data-action="view"]');b.textContent=top?'3D view':'Top view';b.setAttribute('aria-pressed',String(top));}
        if(spiral){
          el.querySelector('.curve-formula').innerHTML=math(equation(kind,changed));
          el.querySelector('.curve-description').textContent=t>0?descriptions[kind][Number(changed)]:'';
          el.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String((b.dataset.mode==='1')===changed)));
        }else el.querySelector('.curve-window').textContent=kind==='parabola'?'The path continues.':'One period shown; the path repeats.';
      }
      function stop(){playing=false;cancelAnimationFrame(raf);last=0;draw();}
      function tick(now){
        if(!playing)return;
        if(!el.closest('section')?.classList.contains('present')||document.querySelector('#lesson-slide-map[open]')){stop();return;}
        if(!last)last=now;
        if(now-last>=65){t=Math.min(max,t+(now-last)*max/14000);last=now;draw();}
        if(t>=max){stop();return;}
        raf=requestAnimationFrame(tick);
      }
      el.querySelector('input[type="range"]').addEventListener('input',e=>{const value=+e.target.value;stop();t=value;draw();});
      el.querySelectorAll('[data-t]').forEach(b=>b.addEventListener('click',()=>{stop();t=+b.dataset.t;draw();}));
      el.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{stop();changed=b.dataset.mode==='1';draw();}));
      el.querySelector('input[type="checkbox"]')?.addEventListener('change',e=>{full=e.target.checked;draw();});
      el.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{
        const a=b.dataset.action;
        if(a==='play'){if(playing)stop();else{if(t>=max)t=0;playing=true;last=0;draw();raf=requestAnimationFrame(tick);}return;}
        if(a==='reset'){stop();t=0;showPoint=false;showVector=false;full=false;top=false;changed=false;const cb=el.querySelector('input[type="checkbox"]');if(cb)cb.checked=false;}
        if(a==='point')showPoint=!showPoint;
        if(a==='vector')showVector=!showVector;
        if(a==='view')top=!top;
        if(a==='reveal'){stop();shown=!shown;}
        draw();
      }));
      // Animations pause on navigation, slide-map entry and backgrounding.
      window.Reveal?.on('slidechanged',()=>{if(playing)stop();});
      window.Reveal?.on('overviewshown',()=>{if(playing)stop();});
      document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)stop();});
      // The shared map may be created after MathJax finishes. Capture its trigger
      // before it clones slides, so the preview contains the paused state.
      document.addEventListener('click',e=>{if(e.target.closest('[aria-controls="lesson-slide-map"]')&&playing)stop();},true);
      const mapDialog=document.querySelector('#lesson-slide-map');
      if(mapDialog)new MutationObserver(()=>{if(mapDialog.open&&playing)stop();}).observe(mapDialog,{attributes:true,attributeFilter:['open']});
      draw();
    });
    document.querySelectorAll('[data-curve-thumbnail]').forEach((el,i)=>{
      const mode=el.dataset.curveThumbnail,isHelix=mode==='helix',kind=mode==='circle'?'horizontal':mode;
      const map=isHelix?p=>[150+35*(p[0]-p[1])/Math.SQRT2,190+35*((p[0]+p[1])/Math.sqrt(6)-p[2]*Math.sqrt(2/3))]:p=>[150+(mode==='circle'?45:8)*p[0],125-(mode==='circle'?45:8)*p[1]];
      let s=line([20,125],[280,125])+line([150,225],[150,20]);
      if(isHelix)s=line(map([-2.8,0,0]),map([2.8,0,0]))+line(map([0,-2.8,0]),map([0,2.8,0]))+line(map([0,0,0]),map([0,0,4.8]));
      s+=path(sample(t=>map(point(kind,t,true)),0,mode==='circle'?TAU:2*TAU),C.green,3.3);
      el.innerHTML=svg(s,'fv8-thumb-'+i,mode==='circle'?'A circle.':isHelix?'A helix rising around a vertical axis.':'A planar spiral widening around the origin.',300,250);
    });
  });
})();
