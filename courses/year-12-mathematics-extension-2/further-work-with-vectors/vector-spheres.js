/* Lesson 7: fixed orthographic views and equal-scale central cross-sections. */
(() => {
  'use strict';
  if (!document.querySelector('.sphere-lesson')) return;
  const C={ink:'#152e3b',blue:'#315985',green:'#217864',gold:'#ad6e32',grey:'#9baeb6'};
  const v=s=>'\\underset{\\sim}{'+s+'}';
  const fmt=x=>String(Math.abs(x)<.0005?0:Math.round(x*100)/100);
  const rt=Math.sqrt(3),n=[rt/4,3/4,1/2];
  // The two screen basis vectors are orthonormal: sphere silhouettes stay circular.
  const project=(p,origin=[240,225],scale=38)=>[origin[0]+scale*(rt/2*p[0]-.5*p[1]),origin[1]+scale*(.25*p[0]+rt/4*p[1]-rt/2*p[2])];
  const plus=(a,b)=>a.map((x,i)=>x+b[i]);
  window.MathJax.startup.promise.then(()=>{
    const math=window.MathsLesson.math,M=window.VectorDiagramMath;
    const label=(p,t,c=C.ink,size=24)=>M.label(...p,t,c,size);
    const seg=(a,b,c=C.grey,w=2,extra='')=>`<path d="M${a.join(' ')}L${b.join(' ')}" stroke="${c}" stroke-width="${w}" fill="none" ${extra}/>`;
    const dot=(p,c=C.gold,r=5)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${c}"/>`;
    const circle=(p,r,c=C.grey,w=2,fill='none')=>`<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${fill}" stroke="${c}" stroke-width="${w}"/>`;
    const path=(pts,c=C.green,w=2,extra='')=>`<path d="M${pts.map(p=>p.join(' ')).join(' L')}" fill="none" stroke="${c}" stroke-width="${w}" ${extra}/>`;
    const text=(p,s,c=C.ink,size=20)=>`<text x="${p[0]}" y="${p[1]}" text-anchor="middle" fill="${c}" font-family="Arial,sans-serif" font-size="${size}">${s}</text>`;
    const arrow=(a,b,c,id,w=3)=>seg(a,b,C[c],w,`marker-end="url(#${id}-${c})"`);
    function svg(g,id,description,width=480,height=450){
      const defs=Object.keys(C).map(c=>`<marker id="${id}-${c}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="${C[c]}"/></marker>`).join('');
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${description}"><defs>${defs}<radialGradient id="${id}-shade" cx="32%" cy="25%"><stop offset="0" stop-color="#e2eeeb" stop-opacity=".3"/><stop offset="1" stop-color="#c4d9d3" stop-opacity=".5"/></radialGradient><clipPath id="${id}-clip"><rect x="20" y="20" width="440" height="400"/></clipPath></defs>${g}</svg>`;
    }
    function latitude(h,r=3,origin=[240,225],scale=38,colour=C.green,width=3){
      if(Math.abs(h)>r+1e-9)return '';
      const rho=Math.sqrt(Math.max(0,r*r-h*h));
      if(rho<1e-6)return dot(project([0,0,h],origin,scale),colour,5);
      let g='';
      // Front and back arcs are distinguished using the same viewing direction.
      for(let j=0;j<120;j++){
        const t1=j*Math.PI/60,t2=(j+1)*Math.PI/60,tm=(t1+t2)/2;
        const p1=[rho*Math.cos(t1),rho*Math.sin(t1),h],p2=[rho*Math.cos(t2),rho*Math.sin(t2),h];
        const front=rho*(n[0]*Math.cos(tm)+n[1]*Math.sin(tm))+n[2]*h>=0;
        if(front||j%4<2)g+=seg(project(p1,origin,scale),project(p2,origin,scale),colour,width);
      }
      return g;
    }
    function ball(origin,scale,r,id,colour=C.grey){
      return circle(origin,r*scale,colour,2,`url(#${id}-shade)`)+latitude(0,r,origin,scale,colour,1.5);
    }
    document.querySelectorAll('[data-sphere-static]').forEach(el=>{
      const kind=el.dataset.sphereStatic,id='fv7-static-'+kind;let g='',w=480,h=390,desc='';
      if(kind==='circle'||kind==='sphere'){
        const O=[40,330],centre=[245,180],r=112;
        const P=kind==='circle'?[centre[0]-r*.6,centre[1]-r*.8]:project([-2,1,2],centre,r/3);
        g=kind==='circle'?circle(centre,r,C.green,2.5):ball(centre,r/3,3,id);
        g+=arrow(O,centre,'green',id)+arrow(centre,P,'gold',id,4)+arrow(O,P,'blue',id);
        g+=dot(O,C.ink,3)+dot(centre,C.green,4)+dot(P)+label([O[0]-14,O[1]+20],'O')+label([centre[0]-16,centre[1]+20],'C',C.green)+label([P[0]+18,P[1]-17],'P',C.gold);
        g+=label([151,270],v('c'),C.green)+label([(O[0]+P[0])/2-20,(O[1]+P[1])/2-5],v('r'),C.blue)+label([(centre[0]+P[0])/2+18,(centre[1]+P[1])/2-15],'R',C.gold);
        desc=(kind==='circle'?'Circle':'Sphere')+' with centre C, point P, blue position vector OP, teal centre vector OC and gold radius vector CP.';
      }else if(kind==='classification'){
        const centre=[195,180],inside=[225,215],on=[255,100],outside=[350,195];
        g=circle(centre,100,C.green,2.5,'#edf3ee')+dot(centre,C.ink,4)+label([176,188],'C');
        for(const [p,name] of [[inside,'Inside'],[on,'On'],[outside,'Outside']])g+=seg(centre,p,C.grey,1.5)+dot(p)+text([p[0]+(name==='Inside'?20:5),p[1]+(name==='On'?-15:28)],name,C.gold,23);
        g+=text([240,335],'Central cross-section',C.grey,21);
        desc='Central cross-section with points inside, on and outside the sphere, compared by distance from C.';
      }else if(kind==='two-spheres'){
        const scale=31,a=[220,265],b=project([0,0,4],a,scale),q=project([0,0,9/8],a,scale);
        g=circle(a,3*scale,C.blue,2,'#e8eef340')+circle(b,4*scale,C.green,2,'#e6eee840');
        g+=seg(project([0,0,-3.5],a,scale),project([0,0,8.2],a,scale),C.grey,1.5);
        const rho=3*Math.sqrt(55)/8;
        const ring=Array.from({length:121},(_,j)=>project([rho*Math.cos(j*Math.PI/60),rho*Math.sin(j*Math.PI/60),9/8],a,scale));
        g+=path(ring,C.gold,4)+dot(a,C.blue,4)+dot(b,C.green,4)+label([a[0]-28,a[1]+16],'C_1',C.blue)+label([b[0]-28,b[1]-14],'C_2',C.green);
        g+=seg(q,[370,q[1]],C.gold,1.5,'stroke-dasharray="5 5"')+label([397,q[1]],'z=h',C.gold,21);
        desc='Transparent fixed views of the two spheres in Example 3.26. Their common circle lies in a horizontal plane z=h.';
      }
      el.innerHTML=svg(g,id,desc,w,h);
    });

    document.querySelectorAll('[data-sphere-section]').forEach(el=>{
      let height=0;
      const id='fv7-section',origin=[240,225],scale=38;
      el.innerHTML='<div class="sphere-paired"><div><h3>Sphere and cutting plane</h3><div class="sphere-section-graph"></div></div><div><h3>View within the plane</h3><div class="sphere-face-graph"></div></div></div><div class="sphere-section-status" aria-live="polite"></div><div class="sphere-slider"><label for="fv7-height"><span>Plane height '+math('z')+'</span><output></output></label><input id="fv7-height" type="range" min="-4" max="4" step="0.05" value="0" aria-label="Plane height z"></div><div class="sphere-controls">'+[0,1,2,3,4].map(x=>'<button data-height="'+x+'">'+math('z='+x)+'</button>').join('')+'<button data-section-reset>Reset</button></div>';
      function draw(){
        const has=height*height<=9+1e-9,rho=has?Math.sqrt(Math.max(0,9-height*height)):0;
        let left=ball(origin,scale,3,id);
        const plane=[[-3.25,-3.25,height],[3.25,-3.25,height],[3.25,3.25,height],[-3.25,3.25,height]].map(p=>project(p,origin,scale));
        left+='<polygon points="'+plane.map(p=>p.join(',')).join(' ')+'" fill="#dbe8f1" fill-opacity=".38" stroke="#88a5b9" stroke-width="1.5"/>';
        left+=seg(project([0,0,-4.6],origin,scale),project([0,0,4.6],origin,scale),C.grey,1.4)+label([240,57],'z',C.ink,22);
        left+=latitude(height,3,origin,scale,C.gold,3.5)+dot(origin,C.ink,3)+label([222,243],'O',C.ink,20);
        const planeC=project([0,0,height],origin,scale);
        left+=seg(planeC,[424,planeC[1]],C.blue,1.3,'stroke-dasharray="4 5"')+label([433,planeC[1]-16],'z='+fmt(height),C.blue,20);
        let right=seg([95,225],[385,225],C.grey,1)+seg([240,80],[240,370],C.grey,1);
        right+=label([402,225],'x',C.ink,22)+label([240,65],'y',C.ink,22);
        if(has&&rho>1e-6){
          right+=circle(origin,rho*scale,C.gold,3)+dot(origin,C.ink,3);
          right+=label([240,395],'z='+fmt(height),C.blue,23);
        }else if(has){right+=dot(origin,C.gold,6)+label([240,268],'(0,0,'+fmt(height)+')',C.gold,23);}
        else right+=text([240,200],'No intersection',C.ink,25);
        const state=!has?'No intersection':rho<1e-6?'One point':'Circle';
        el.querySelector('.sphere-section-graph').innerHTML=svg(left,id,'Sphere of radius 3 cut by plane z='+fmt(height)+'. '+state+'.');
        el.querySelector('.sphere-face-graph').innerHTML=svg(right,id+'-face','Face-on cross-section in z='+fmt(height)+'. '+state+'. The same unit scale is used as in the sphere view.');
        // Height has two decimal places, so the exact squared remainder needs at most four.
        const remainder=Math.round((9-height*height)*10000)/10000;
        const substitution='x^2+y^2+('+fmt(height)+')^2=9\\quad\\Longrightarrow\\quad x^2+y^2='+remainder;
        const interpretation=has&&rho>1e-6?'A circle in the plane '+math('z='+fmt(height))+'.':has?'Only '+math('(0,0,'+fmt(height)+')')+': the plane is tangent to the sphere.':math('x^2+y^2')+' cannot be negative, so there is no intersection.';
        el.querySelector('.sphere-section-status').innerHTML='<div>Substitute '+math('z='+fmt(height))+': &nbsp;'+math(substitution)+'</div><div class="sphere-section-interpretation">'+interpretation+'</div>';
        el.querySelector('output').innerHTML=math('z='+fmt(height));el.querySelector('input').value=height;
        el.querySelectorAll('[data-height]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.height===height)));
        el.dataset.height=height;el.dataset.radius=has?fmt(rho):'none';el.dataset.remainder=remainder;
      }
      el.querySelector('input').addEventListener('input',e=>{height=+e.target.value;draw();});
      el.querySelectorAll('[data-height]').forEach(b=>b.addEventListener('click',()=>{height=+b.dataset.height;draw();}));
      el.querySelector('[data-section-reset]').addEventListener('click',()=>{height=0;draw();});draw();
    });

    document.querySelectorAll('[data-sphere-line]').forEach(el=>{
      const id='fv7-line',map=p=>[240+38*p[0],225-38*p[1]],phi=25*Math.PI/180,d=[Math.cos(phi),Math.sin(phi)],normal=[-Math.sin(phi),Math.cos(phi)];
      let distance=2;
      el.innerHTML='<div class="sphere-split"><div><div class="sphere-line-graph"></div><p class="sphere-small sphere-centred">Central cross-section through the line</p></div><div><p>Compare the perpendicular distance '+math('D')+' with '+math('R=3')+'.</p><div class="sphere-line-cases"><div data-case="2">'+math('D<R')+' · two points<br><span>Two real parameter values; '+math('\\Delta>0')+'.</span></div><div data-case="1">'+math('D=R')+' · one point<br><span>One repeated real value; '+math('\\Delta=0')+'.</span></div><div data-case="0">'+math('D>R')+' · no points<br><span>No real values; '+math('\\Delta<0')+'.</span></div></div></div></div><div class="sphere-slider"><label for="fv7-line-distance"><span>Distance from centre '+math('D')+'</span><output></output></label><input id="fv7-line-distance" type="range" min="0" max="4" step="0.05" value="2" aria-label="Distance from centre D"></div><div class="sphere-controls">'+[0,2,3,4].map(x=>'<button data-distance="'+x+'">'+math('D='+x)+'</button>').join('')+'<button data-line-reset>Reset</button></div>';
      function draw(){
        const H=normal.map(x=>x*distance),centre=map([0,0]),foot=map(H),count=distance<3-1e-9?2:Math.abs(distance-3)<1e-9?1:0;
        let g=circle(centre,114,C.green,2.5,'#edf3ee');
        const endpoints=[-7,7].map(t=>map(plus(H,d.map(x=>x*t))));
        g+='<g clip-path="url(#'+id+'-clip)">'+seg(...endpoints,C.blue,3)+'</g>';
        g+=dot(centre,C.ink,4)+label([centre[0]+14,centre[1]+22],'C');
        if(distance>.01){
          g+=seg(centre,foot,C.gold,3)+label([(centre[0]+foot[0])/2-23,(centre[1]+foot[1])/2],'D',C.gold,24);
          const a=plus(H,d.map(x=>x*.28)),b=plus(a,normal.map(x=>-x*.28)),c=plus(H,normal.map(x=>-x*.28));
          g+=path([map(a),map(b),map(c)],C.ink,1.5);
        }
        if(count===2){const q=Math.sqrt(9-distance*distance);[-q,q].forEach((t,i)=>{const p=map(plus(H,d.map(x=>x*t)));g+=dot(p,C.gold,5)+label([p[0]+(i?15:-15),p[1]-20],i?'Q':'P',C.gold,22);});}
        else if(count===1)g+=dot(foot,C.gold,6)+label([foot[0]+20,foot[1]-16],'T',C.gold,22);
        el.querySelector('.sphere-line-graph').innerHTML=svg(g,id,count+' intersection '+(count===1?'point':'points')+'. An angled line is distance '+fmt(distance)+' from the centre of a radius 3 sphere.');
        el.querySelectorAll('[data-case]').forEach(row=>row.classList.toggle('current',+row.dataset.case===count));
        el.querySelector('output').innerHTML=math('D='+fmt(distance));el.querySelector('input').value=distance;
        el.querySelectorAll('[data-distance]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.distance===distance)));
        el.dataset.distance=distance;el.dataset.intersections=count;
      }
      el.querySelector('input').addEventListener('input',e=>{distance=+e.target.value;draw();});
      el.querySelectorAll('[data-distance]').forEach(b=>b.addEventListener('click',()=>{distance=+b.dataset.distance;draw();}));
      el.querySelector('[data-line-reset]').addEventListener('click',()=>{distance=2;draw();});draw();
    });

    document.querySelectorAll('[data-sphere-diameter]').forEach(el=>{
      let stage=0;const id='fv7-diameter',A=[105,225],B=[375,225],O=[240,225],P=[307.5,225-135*Math.sqrt(3)/2];
      el.innerHTML='<div class="sphere-split"><div class="sphere-diameter-graph"></div><div class="sphere-diameter-text" aria-live="polite"></div></div><div class="sphere-controls"><button data-diameter-action="previous">Previous</button><button data-diameter-action="next" class="primary">Reveal sphere</button><button data-diameter-action="reset">Reset</button></div>';
      function draw(){
        let g=circle(O,135,C.green,2.5,stage?`url(#${id}-shade)`:'none');
        if(stage)for(const k of [.25,.5,.8])g+=`<ellipse cx="240" cy="225" rx="135" ry="${135*k}" stroke="${C.grey}" stroke-width="1.2" fill="none" stroke-dasharray="5 4"/>`;
        g+=seg(A,B,C.ink,2)+arrow(A,P,'blue',id)+arrow(B,P,'gold',id)+dot(A,C.ink)+dot(B,C.ink)+dot(P,C.gold);
        const pa=A.map((x,i)=>x-P[i]),pb=B.map((x,i)=>x-P[i]),la=Math.hypot(...pa),lb=Math.hypot(...pb),da=pa.map(x=>x/la*15),db=pb.map(x=>x/lb*15);
        g+=path([plus(P,da),plus(plus(P,da),db),plus(P,db)],C.ink,1.6);
        g+=label([A[0]-16,A[1]+22],'A')+label([B[0]+16,B[1]+22],'B')+label([P[0]+18,P[1]-20],'P',C.gold);
        if(stage)g+=dot(O,C.green,4)+label([O[0],O[1]+22],'C',C.green);
        el.querySelector('.sphere-diameter-graph').innerHTML=svg(g,id,stage?'A sphere is formed by circles in planes through the fixed diameter AB.':'A right angle APB on a circle with diameter AB.');
        el.querySelector('.sphere-diameter-text').innerHTML=stage?'<p>Take circles in every plane through '+math('AB')+'.</p><p>Together they form the sphere with diameter '+math('AB')+'.</p><div class="sphere-key">'+math(v('c')+'=\\frac{'+v('a')+'+'+v('b')+'}{2}')+'<br>'+math('R=\\frac{|'+v('b')+'-'+v('a')+'|}{2}')+'</div><p class="sphere-small">Here '+math(v('a')+'=\\overrightarrow{OA}')+' and '+math(v('b')+'=\\overrightarrow{OB}')+'.</p>':'<p>In the plane '+math('APB')+', the right angle places '+math('P')+' on the circle with diameter '+math('AB')+'.</p><p>What changes when '+math('P')+' can vary in three dimensions?</p>';
        el.querySelector('[data-diameter-action="previous"]').disabled=stage===0;el.querySelector('[data-diameter-action="next"]').disabled=stage===1;el.dataset.stage=stage;
      }
      el.querySelectorAll('[data-diameter-action]').forEach(b=>b.addEventListener('click',()=>{stage=b.dataset.diameterAction==='next'?1:0;draw();}));draw();
    });
  });
})();
