/* Lesson 9: radius–height hints and curves on containing surfaces. */
(() => {
  'use strict';
  if(!document.querySelector('.spiral-lesson'))return;
  const C={ink:'#152e3b',teal:'#217864',gold:'#ad6e32',blue:'#315985',grey:'#a3b4bb',pale:'#dbe9e3'};
  const v=s=>'\\underset{\\sim}{'+s+'}', fmt=x=>String(Math.abs(x)<0.00001?0:Math.round(x*100)/100);
  const radius=(shape,z)=>shape==='cone'?z/2:shape==='sphere'?Math.sqrt(Math.max(0,4-z*z)):2;
  const bounds=shape=>shape==='sphere'?[-2,2]:[0,4];
  const sample=(fn,a,b,n=160)=>Array.from({length:n+1},(_,i)=>fn(a+(b-a)*i/n));
  window.MathJax.startup.promise.then(()=>{
    const math=window.MathsLesson.math,M=window.VectorDiagramMath;
    const label=(x,y,s,c=C.ink,size=25)=>M.label(x,y,s,c,size);
    const path=(pts,c=C.teal,w=3,attrs='')=>'<path d="M'+pts.map(p=>p.join(' ')).join('L')+'" fill="none" stroke="'+c+'" stroke-width="'+w+'" '+attrs+'/>';
    const line=(a,b,c=C.grey,w=1.5,attrs='')=>path([a,b],c,w,attrs);
    const dot=(p,c=C.gold,r=5)=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+r+'" fill="'+c+'"/>';
    const svg=(body,desc)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 440" role="img" aria-label="'+desc+'">'+body+'</svg>';
    function projection(shape){const scale=shape==='sphere'?77:65,cy=shape==='sphere'?220:335;return p=>[240+scale*(p[0]-p[1])/Math.SQRT2,cy+scale*((p[0]+p[1])/Math.sqrt(6)-p[2]*Math.sqrt(2/3))];}
    const ring=(map,r,z)=>sample(a=>map([r*Math.cos(a),r*Math.sin(a),z]),0,2*Math.PI,100);
    function axes(map,shape){
      const l=2.7,[lo,hi]=bounds(shape);let s='';
      s+=line(map([-l,0,0]),map([l,0,0]))+line(map([0,-l,0]),map([0,l,0]))+line(map([0,0,lo]),map([0,0,hi+.5]));
      for(const [p,t,dx,dy] of [[[l,0,0],'x',15,10],[[0,l,0],'y',-15,10],[[0,0,hi+.5],'z',0,-18]]){const a=map(p);s+=label(a[0]+dx,a[1]+dy,t);}
      const o=map([0,0,0]);return s+label(o[0]-14,o[1]+20,'O',C.ink,21);
    }
    function hull(points){
      const p=points.slice().sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
      const cross=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);
      const lower=[],upper=[];
      for(const q of p){while(lower.length>1&&cross(lower.at(-2),lower.at(-1),q)<=0)lower.pop();lower.push(q);}
      for(const q of p.reverse()){while(upper.length>1&&cross(upper.at(-2),upper.at(-1),q)<=0)upper.pop();upper.push(q);}
      return lower.slice(0,-1).concat(upper.slice(0,-1));
    }
    function surface(map,shape,fill=true){
      const [lo,hi]=bounds(shape);let s='';
      const points=[];for(let j=0;j<=24;j++){const z=lo+(hi-lo)*j/24;points.push(...ring(map,radius(shape,z),z));}
      if(fill)s+='<polygon points="'+hull(points).map(p=>p.join(',')).join(' ')+'" fill="'+C.pale+'" fill-opacity="0.7" stroke="none"/>';
      for(let j=0;j<=4;j++){const z=lo+(hi-lo)*j/4;s+=path(ring(map,radius(shape,z),z),C.teal,j===0||j===4?1.8:1,'opacity="0.3"');}
      for(let i=0;i<8;i++){const a=i*Math.PI/4;s+=path(sample(z=>map([radius(shape,z)*Math.cos(a),radius(shape,z)*Math.sin(a),z]),lo,hi,70),C.teal,1,'opacity="0.2"');}
      return s;
    }
    function spiral(map,shape,n){const [lo,hi]=bounds(shape);return path(sample(z=>map([radius(shape,z)*Math.cos(n*Math.PI*z),radius(shape,z)*Math.sin(n*Math.PI*z),z]),lo,hi,Math.max(300,n*140)),C.gold,3.5);}
    const slider=(id,min,max,val,step,word)=>'<div class="spiral-slider"><label for="'+id+'">'+math(word)+' <output></output></label><input id="'+id+'" type="range" min="'+min+'" max="'+max+'" value="'+val+'" step="'+step+'" aria-label="'+(word==='z'?'Height z':'Angular multiplier n')+'"></div>';
    const controls='<div class="spiral-controls"><button data-hint="previous">Previous hint</button><button data-hint="next" class="primary">Next hint</button><button data-hint="reset">Reset</button></div>';
    document.querySelectorAll('[data-spiral-slice]').forEach(el=>{
      let z=2;const map=projection('cylinder');
      el.innerHTML='<div class="spiral-two"><div class="spiral-graph"></div><div class="spiral-slice-text"><p class="spiral-gold">'+math('\\rho')+' is the horizontal distance from the axis.</p><div>'+math('x=\\rho\\cos\\theta')+'</div><div>'+math('y=\\rho\\sin\\theta')+'</div><p>The shape tells us how '+math('\\rho')+' depends on '+math('z')+'.</p><div class="spiral-key">Then substitute your height function '+math('z=z(t)')+'.</div></div></div>'+slider('fv9-slice-z',0,4,2,.05,'z');
      function draw(){
        const O=map([0,0,0]),A=map([0,0,z]),P=map([2,0,z]);
        let s=axes(map,'cylinder');
        const plane=[[-2.3,-2.3,z],[2.3,-2.3,z],[2.3,2.3,z],[-2.3,2.3,z]].map(map);
        s+='<polygon points="'+plane.map(p=>p.join(',')).join(' ')+'" fill="'+C.pale+'" opacity="0.55"/>';
        s+=path(ring(map,2,z),C.grey,2)+line(O,P,C.blue,1.5,'stroke-dasharray="5 6"')+line(O,A,C.teal,4)+line(A,P,C.gold,4)+dot(P)+dot(A,C.teal,4);
        s+=label((A[0]+P[0])/2+8,(A[1]+P[1])/2-18,'\\rho',C.gold,29)+label(P[0]+22,P[1],'P',C.gold,26);
        if(z>.15)s+=label(A[0]-24,(O[1]+A[1])/2,'z',C.teal,28);
        el.querySelector('.spiral-graph').innerHTML=svg(s,'Horizontal circle of radius 2 at height '+fmt(z)+'. Amber radius is measured from the z-axis.');
        el.querySelector('output').innerHTML=math('z='+fmt(z));el.dataset.z=String(z);
      }
      el.querySelector('input').addEventListener('input',e=>{z=+e.target.value;draw();});draw();
    });
    document.querySelectorAll('[data-spiral-radius]').forEach(el=>{
      const shape=el.dataset.spiralRadius,isCone=shape==='cone',[lo,hi]=bounds(shape),map=projection(shape);let z=isCone?2:1,stage=0;
      el.innerHTML='<div class="spiral-diagrams"><div><h3>Horizontal slice</h3><div class="spiral-space"></div></div><div><h3>Central vertical section</h3><div class="spiral-section"></div></div></div><div class="spiral-working" aria-live="polite"></div><div class="spiral-bottom">'+slider('fv9-'+shape+'-z',lo,hi,z,.05,'z')+controls+'</div>';
      function draw(){
        const rho=radius(shape,z),A=map([0,0,z]),P=map([rho,0,z]),O=map([0,0,0]);
        let s=surface(map,shape)+axes(map,shape)+path(ring(map,rho,z),C.gold,3.5)+line(A,P,C.gold,4)+line(O,A,C.teal,3);
        s+=dot(P,C.gold,4);if(rho>.15)s+=label((A[0]+P[0])/2+12,(A[1]+P[1])/2-15,'\\rho',C.gold,27);
        el.querySelector('.spiral-space').innerHTML=svg(s,(isCone?'Cone of height 4 and base radius 2':'Sphere of radius 2')+', slice at z='+fmt(z)+'.');
        let section='';
        if(isCone){
          const m=(x,y)=>[165+70*x,375-70*y],O=m(0,0),B=m(0,4),D=m(2,4),A=m(0,z),P=m(rho,z);
          section+=path([m(-2,4),O,D,m(-2,4)],C.grey,2)+line(O,B,C.grey,1.5,'stroke-dasharray="5 5"');
          if(stage>=1)section+='<polygon points="'+[O,B,D].map(p=>p.join(',')).join(' ')+'" fill="'+C.pale+'" opacity="0.5"/>';
          section+=line(B,D,C.blue,3)+label(235,70,'R=2',C.blue,26);
          section+=line([330,375],[330,95],C.blue,2)+line([323,95],[337,95],C.blue,2)+line([323,375],[337,375],C.blue,2)+label(370,235,'H=4',C.blue,25);
          section+=line(O,A,C.teal,4)+line(A,P,C.gold,4)+line(O,P,C.gold,2)+dot(P);
          section+=label(O[0]-15,O[1]+23,'O',C.ink,22);
          if(z>.15)section+=label(145,(O[1]+A[1])/2,'z',C.teal,28);
          if(rho>.15)section+=label((A[0]+P[0])/2,A[1]+24,'\\rho',C.gold,29);
          if(z>.2)section+=path([[A[0],A[1]+12],[A[0]+12,A[1]+12],[A[0]+12,A[1]]],C.ink,1.3);
        }else{
          const m=(x,y)=>[220+82*x,220-82*y],O=m(0,0),A=m(0,z),P=m(rho,z);
          section+='<circle cx="220" cy="220" r="164" fill="none" stroke="'+C.grey+'" stroke-width="2"/>'+line(m(0,-2.25),m(0,2.25),C.grey,1.5);
          section+=line(O,P,C.blue,3)+line(O,A,C.teal,4)+line(A,P,C.gold,4)+dot(P);
          section+=label(220,25,'z',C.ink,26)+label(201,242,'O',C.ink,22)+label((O[0]+P[0])/2+10,(O[1]+P[1])/2+(z>=0?24:-24),'R=2',C.blue,26);
          if(Math.abs(z)>.15)section+=label(195,(O[1]+A[1])/2,'|z|',C.teal,27);
          if(rho>.15)section+=label((A[0]+P[0])/2,A[1]-(z>=0?22:-24),'\\rho',C.gold,29);
          if(rho>.15&&Math.abs(z)>.15){const d=z>0?12:-12;section+=path([[A[0],A[1]+d],[A[0]+12,A[1]+d],[A[0]+12,A[1]]],C.ink,1.3);}
        }
        el.querySelector('.spiral-section').innerHTML=svg(section,'Vertical section with horizontal radius rho, signed height z and fixed '+(isCone?'cone dimensions.':'sphere radius.'));
        const cone=[['Which triangles are similar?',''],['For '+math('z>0')+', similar triangles give',math('\\frac{\\rho}{z}=\\frac{R}{H}')],['Radius as a function of height',math('\\rho=\\frac{R}{H}z=\\frac z2,\\qquad 0\\le z\\le4')],['If '+math('z=t/\\pi')+', substitute into the radius function:',math('\\rho(t)=\\frac{t}{2\\pi},\\qquad 0\\le t\\le4\\pi')]];
        const sphere=[['Which lengths form a right triangle?',''],['Pythagoras gives',math('\\rho^2+z^2=R^2')],['Take the nonnegative radius:',math('\\rho=\\sqrt{R^2-z^2}=\\sqrt{4-z^2},\\quad -2\\le z\\le2')],['If '+math('z=t/\\pi')+', substitute and adjust the interval:',math('\\rho(t)=\\sqrt{4-(t/\\pi)^2},\\quad -2\\pi\\le t\\le2\\pi')]];
        const row=(isCone?cone:sphere)[stage];el.querySelector('.spiral-working').innerHTML='<p>'+row[0]+'</p><div>'+row[1]+'</div>';
        el.querySelector('output').innerHTML=math('z='+fmt(z))+(stage>=2?' &nbsp; '+math('\\rho\\approx'+fmt(rho)):'');
        el.querySelector('input').value=z;el.querySelector('[data-hint="previous"]').disabled=stage===0;el.querySelector('[data-hint="next"]').disabled=stage===3;
        el.dataset.z=String(z);el.dataset.rho=String(rho);el.dataset.stage=String(stage);
      }
      el.querySelector('input').addEventListener('input',e=>{z=+e.target.value;draw();});
      el.querySelectorAll('[data-hint]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.hint;if(a==='reset'){stage=0;z=isCone?2:1;}else stage=Math.max(0,Math.min(3,stage+(a==='next'?1:-1)));draw();}));draw();
    });
    document.querySelectorAll('[data-spiral-turns]').forEach(el=>{
      let n=1,shown=false;const map=projection('cylinder');
      el.innerHTML='<div class="spiral-two"><div class="spiral-graph"></div><div><div class="spiral-formula">'+math(v('r')+'(t)=2\\cos(nt)'+v('i')+'+2\\sin(nt)'+v('j')+'+\\frac t\\pi'+v('k'))+'</div><p>'+math('0\\le t\\le4\\pi')+'</p><p>Keep the radius, height function and interval fixed.</p>'+slider('fv9-turn-n',1,6,1,1,'n')+'<p class="spiral-predict">Predict the number of turns before changing '+math('n')+'.</p><button class="spiral-period-toggle">Show period and spacing</button><div class="spiral-period" hidden></div></div></div>';
      function draw(){el.querySelector('.spiral-graph').innerHTML=svg(axes(map,'cylinder')+spiral(map,'cylinder',n),'Helix of radius 2 and height 4 with '+(2*n)+' turns.');el.querySelector('output').innerHTML=math('n='+n);el.querySelector('.spiral-period').hidden=!shown;el.querySelector('.spiral-period').innerHTML='<p>Period of the circular components:</p>'+math('T=\\frac{2\\pi}{n}')+'<p>Rise per turn: '+math('\\frac{T}{\\pi}=\\frac2n')+'</p><p>Number of turns: '+math('2n='+2*n)+'</p>';el.querySelector('button').textContent=(shown?'Hide':'Show')+' period and spacing';el.dataset.n=String(n);el.dataset.revealed=String(shown);}
      el.querySelector('input').addEventListener('input',e=>{n=+e.target.value;draw();});el.querySelector('button').addEventListener('click',()=>{shown=!shown;draw();});draw();
    });
    document.querySelectorAll('[data-spiral-surface]').forEach(el=>{
      let shape='cylinder',n=1,showSurface=false,showCurve=true,explain=false;
      el.innerHTML='<div class="spiral-shapes"><button data-shape="cylinder">Cylinder</button><button data-shape="cone">Cone</button><button data-shape="sphere">Sphere</button></div><div class="spiral-two"><div><div class="spiral-graph"></div><div class="spiral-controls"><button data-toggle="surface">Show surface</button><button data-toggle="curve">Hide spiral</button><button data-toggle="reset">Reset</button></div></div><div><div class="spiral-cartesian"></div><p class="spiral-key">The curve lies on this surface.</p>'+slider('fv9-surface-n',1,6,1,1,'n')+'<p>Change the number of turns.<br>Does the surface change?</p><button data-toggle="explain">Why does the surface contain extra points?</button><div class="spiral-explanation" hidden></div></div></div>';
      function draw(){
        const map=projection(shape);let s=axes(map,shape);if(showSurface)s+=surface(map,shape);if(showCurve)s+=spiral(map,shape,n);
        el.querySelector('.spiral-graph').innerHTML=svg(s,(showCurve?'Spiral with '+2*n+' turns':'Spiral hidden')+(showSurface?' on its translucent containing '+shape+' surface.':'; containing surface hidden.'));
        const eq=shape==='cylinder'?'x^2+y^2=4,\\quad0\\le z\\le4':shape==='cone'?'x^2+y^2=\\frac{z^2}{4},\\quad0\\le z\\le4':'x^2+y^2+z^2=4';
        el.querySelector('.spiral-cartesian').innerHTML='<h3>Containing surface</h3>'+math(eq);
        el.querySelector('output').innerHTML=math('n='+n);el.querySelector('input').value=n;
        for(const [a,state] of [['surface',showSurface],['curve',showCurve]]){const b=el.querySelector('[data-toggle="'+a+'"]');b.textContent=(state?'Hide ':'Show ')+(a==='curve'?'spiral':'surface');b.setAttribute('aria-pressed',String(state));}
        el.querySelectorAll('[data-shape]').forEach(b=>b.setAttribute('aria-pressed',String(shape===b.dataset.shape)));
        el.querySelector('.spiral-explanation').hidden=!explain;el.querySelector('[data-toggle="explain"]').textContent=explain?'Hide explanation':'Why does the surface contain extra points?';
        let text='The Cartesian relationship keeps the radius–height rule but loses the angle–height link.';
        if(shape==='cylinder')text+='<p>At '+math('z=0')+', the spiral gives '+math('(2,0,0)')+' only; the surface also includes '+math('(-2,0,0)')+'.</p>';
        else text+='<p>At an intermediate height, the surface includes a whole circle. The spiral selects one point.</p>';
        el.querySelector('.spiral-explanation').innerHTML=text;
        el.dataset.shape=shape;el.dataset.n=String(n);el.dataset.surfaceVisible=String(showSurface);el.dataset.curveVisible=String(showCurve);el.dataset.explained=String(explain);
      }
      el.querySelectorAll('[data-shape]').forEach(b=>b.addEventListener('click',()=>{shape=b.dataset.shape;draw();}));
      el.querySelector('input').addEventListener('input',e=>{n=+e.target.value;draw();});
      el.querySelectorAll('[data-toggle]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.toggle;if(a==='surface')showSurface=!showSurface;if(a==='curve')showCurve=!showCurve;if(a==='explain')explain=!explain;if(a==='reset'){shape='cylinder';n=1;showSurface=false;showCurve=true;explain=false;}draw();}));draw();
    });
  });
})();
