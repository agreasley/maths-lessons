/* Coordinates and component operations. All diagrams use mathematical coordinates. */
(() => {
  'use strict';
  const C={ink:'#152e3b',x:'#007f78',y:'#3b66a8',z:'#b55224',rule:'#d7d8ce',muted:'#607078'};
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const M=t=>window.MathsLesson.math(t);
  const V=(v)=>'\\begin{bmatrix}'+v.join('\\\\')+'\\end{bmatrix}';
  const tuple=v=>'('+v.join(',')+')';
  const add=(a,b)=>a.map((n,i)=>n+b[i]);
  const mul=(k,a)=>a.map(n=>k*n);
  const clean=n=>Math.abs(n)<1e-9?0:Number(n.toFixed(2));
  const nf=n=>Number.isInteger(n)?String(n):n===.5?'\\tfrac12':n===-.5?'-\\tfrac12':String(n);
  const signed=n=>n<0?'('+n+')':String(n);
  function expression(v){let out='';v.forEach((n,i)=>{if(n===0)return;out+=(n<0?'-':out?'+':'')+(Math.abs(n)===1?'':nf(Math.abs(n)))+'\\mathbf '+['i','j','k'][i];});return out||'\\mathbf0';}
  const btn=(a,t)=>`<button data-action="${a}" aria-pressed="false">${t}</button>`;
  const slider=(a,t,min,max,step,value)=>`<label>${t}<input type="range" data-control="${a}" aria-label="${esc(t.replace(/<[^>]*>/g,''))}" min="${min}" max="${max}" step="${step}" value="${value}"></label>`;
  const press=(m,a,on)=>{const b=m.querySelector(`[data-action="${a}"]`);if(b)b.setAttribute('aria-pressed',String(on));};
  const action=(m,f)=>m.addEventListener('click',e=>{const b=e.target.closest('button[data-action]');if(b&&!b.disabled)f(b.dataset.action,b);});
  const input=(m,f)=>m.addEventListener('input',e=>{if(e.target.dataset.control)f(e.target.dataset.control,Number(e.target.value));});
  function frame(m,controls='',sliders='',side=true){
    m.innerHTML=`<div class="c-demonstration${side?'':' c-full'}"><div class="c-plot"></div>${side?'<div class="c-equations"></div>':''}</div>${sliders?'<div class="c-sliders">'+sliders+'</div>':''}<div class="toolbar c-controls">${controls}</div><div class="c-status" aria-live="polite"></div>`;
    return {plot:s=>m.querySelector('.c-plot').innerHTML=s,eq:s=>{const e=m.querySelector('.c-equations');if(e)e.innerHTML=s;},status:s=>m.querySelector('.c-status').innerHTML=s};
  }
  function chart(bounds=[-5,5,-3,5],height=320,width=690,pad=45){
    const scale=Math.min((width-pad*2)/(bounds[1]-bounds[0]),(height-pad*2)/(bounds[3]-bounds[2]));
    const ox=(width-scale*(bounds[1]+bounds[0]))/2,oy=(height+scale*(bounds[3]+bounds[2]))/2;
    const P=v=>[ox+scale*v[0],oy-scale*v[1]],body=[];
    function line(p,q,color=C.rule,dash='',w=2){const a=P(p),b=P(q);body.push(`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${color}" stroke-width="${w}"${dash?` stroke-dasharray="${dash}"`:''}/>`);}
    function label(p,t,color=C.ink,dx=0,dy=0,w=150){const a=P(p);body.push(`<foreignObject x="${a[0]-w/2+dx}" y="${a[1]-19+dy}" width="${w}" height="38"><div xmlns="http://www.w3.org/1999/xhtml" class="c-label" style="color:${color}">${M(t)}</div></foreignObject>`);}
    function dot(p,t='',color=C.ink,dx=0,dy=-26){const a=P(p);body.push(`<circle cx="${a[0]}" cy="${a[1]}" r="4.5" fill="${color}"/>`);if(t)label(p,t,color,dx,dy,230);}
    function arrow(p,q,t='',color=C.x,o={}){const a=P(p),b=P(q),len=Math.hypot(b[0]-a[0],b[1]-a[1]);if(len<.1){dot(p,t,color,o.dx||0,o.dy||25);return;}const ux=(b[0]-a[0])/len,uy=(b[1]-a[1])/len,h=Math.min(13,len*.3),s=h*.43;body.push(`<g${o.cls?` class="${o.cls}"`:''}${o.opacity?` opacity="${o.opacity}"`:''}>`);line(p,[(b[0]-ux*h*.65-ox)/scale,(oy-b[1]+uy*h*.65)/scale],color,o.dash?'4 6':'',o.width||4);body.push(`<polygon points="${b[0]},${b[1]} ${b[0]-ux*h-uy*s},${b[1]-uy*h+ux*s} ${b[0]-ux*h+uy*s},${b[1]-uy*h-ux*s}" fill="${color}"/></g>`);if(t)label([(p[0]+q[0])/2,(p[1]+q[1])/2],t,color,o.dx??uy*24,o.dy??-ux*24,o.labelWidth||150);}
    function polygon(points,color){body.push(`<polygon points="${points.map(p=>P(p).join(',')).join(' ')}" fill="${color}" fill-opacity=".13" stroke="${color}" stroke-width="1.3"/>`);}
    function grid(){for(let x=Math.ceil(bounds[0]);x<=bounds[1];x++)line([x,bounds[2]],[x,bounds[3]],C.rule,'',.8);for(let y=Math.ceil(bounds[2]);y<=bounds[3];y++)line([bounds[0],y],[bounds[1],y],C.rule,'',.8);}
    function axes2(n=5){const xmin=Math.max(-n,bounds[0]+.3),xmax=Math.min(n,bounds[1]-.3),ymin=Math.max(-n,bounds[2]+.3),ymax=Math.min(n,bounds[3]-.3);arrow([xmin,0],[xmax,0],'',C.muted,{width:1.7});arrow([0,ymin],[0,ymax],'',C.muted,{width:1.7});label([xmax,0],'x',C.muted,18,15,40);label([0,ymax],'y',C.muted,-18,-10,40);dot([0,0],'O',C.muted,-15,20);}
    return {P,line,label,dot,arrow,polygon,grid,axes2,svg:desc=>`<svg class="c-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(desc)}"><title>${esc(desc)}</title>${body.join('')}</svg>`};
  }
  // Fixed parallel projection of a right-handed coordinate system, matching the booklet orientation.
  // Spatial coordinates are exact; screen lengths and angles are not spatial measurements.
  const project=v=>[-.65*v[0]+v[1],-.4*v[0]+v[2]];
  function axes3(p,n=4,az=42){const O=[0,0];for(let i=0;i<3;i++){const a=[0,0,0],b=[0,0,0];a[i]=-n*.55;b[i]=n;p.line(project(a,az),O,C.muted,'4 6',1.3);p.arrow(O,project(b,az),'',C.muted,{width:1.7});p.label(project(b,az),['x','y','z'][i],C.muted,i===0?-20:i===1?20:14,i===2?-13:12,40);}p.dot(O,'O',C.muted,-14,18);}
  function prism(p,v,az=42){const vs=[];for(let mask=0;mask<8;mask++)vs.push(v.map((n,i)=>mask&(1<<i)?n:0));for(let mask=0;mask<8;mask++)for(let i=0;i<3;i++)if(!(mask&(1<<i)))p.line(project(vs[mask],az),project(vs[mask|(1<<i)],az),C.rule,'5 6',1.8);}
  function path(p,v,stage=v.length,three=false,options={}){let start=three?[0,0,0]:[0,0];const proj=a=>three?project(a):a;v.forEach((n,i)=>{const end=[...start];end[i]+=n;if(i<stage)p.arrow(proj(start),proj(end),options.labels===false?'':expression(v.map((k,j)=>i===j?n:0)),[C.x,C.y,C.z][i],{dx:i===2?38:three&&i===0?-28:undefined,dy:i===1?25:three&&i===0?-12:undefined,labelWidth:130});start=end;});return start;}
  function cover(m){const p=chart([-1.8,3.5,-1.9,3.5],440,530,20),v=[2,4,3],O=[0,0];prism(p,v);path(p,v,3,true);p.arrow(O,project(v),'\\mathbf a','#efba79',{width:6,dx:0,dy:-35});m.innerHTML=p.svg('A three-dimensional vector built from three perpendicular components.').replaceAll(C.x,'#8cddd0').replaceAll(C.y,'#93b9ef').replaceAll(C.z,'#efba79');m.querySelectorAll('[stroke="'+C.rule+'"]').forEach(e=>e.setAttribute('stroke','#55727f'));m.querySelectorAll('[style]').forEach(e=>{if(e.style.color==='rgb(0, 127, 120)')e.style.color='#8cddd0';else if(e.style.color==='rgb(59, 102, 168)')e.style.color='#93b9ef';else if(e.style.color==='rgb(181, 82, 36)')e.style.color='#efba79';});}
  function coordinates(m){let dim=2,stage=0,guides=false;const ui=frame(m,btn('2d','2D')+btn('3d','3D')+btn('next','Show next coordinate')+btn('guides','Show guides')+btn('reset','Reset'));
    function draw(){const v=(dim===2?[3,2]:[2,3,3]),three=dim===3,p=chart(three?[-4,4,-2.1,4]:[-1,5,-1,4],300,690,44);if(three){if(guides)prism(p,v);axes3(p,4.2);}else p.axes2(4.2);let end=Array(dim).fill(0);v.forEach((n,i)=>{if(i<stage){const next=[...end];next[i]=n;p.arrow(three?project(end):end,three?project(next):next,String(n),[C.x,C.y,C.z][i]);end=next;}});if(stage)p.dot(three?project(end):end,stage===dim?'P':'',C.ink,45,-20);ui.plot(p.svg(`Locating P${tuple(v)} in ${dim}D, ${stage} coordinates shown.`));ui.eq('<p class="c-large">'+M('P'+tuple(v))+'</p>'+v.map((n,i)=>'<p class="c-coordinate-step'+(i<stage?' is-shown':'')+'">'+M(['x','y','z'][i]+'='+n)+'</p>').join(''));ui.status(stage===dim?'The coordinates locate the point along all '+(three?'three':'two')+' axes.':'Predict the next step before revealing it.');m.querySelector('[data-action=next]').disabled=stage===dim;m.querySelector('[data-action=guides]').disabled=!three;press(m,'2d',dim===2);press(m,'3d',three);press(m,'guides',guides);m.dataset.dimension=dim;m.dataset.stage=stage;}
    action(m,a=>{if(a==='2d'||a==='3d'){dim=a==='2d'?2:3;stage=0;guides=false;}if(a==='next')stage=Math.min(dim,stage+1);if(a==='guides')guides=!guides;if(a==='reset'){stage=0;guides=false;}draw();});draw();}
  function planes(m){
    let plane='xy',offset=0,reveal=false,along=[2,2];
    const letters=['x','y','z'];
    const ui=frame(m,btn('xy',M('xy')+'-plane')+btn('xz',M('xz')+'-plane')+btn('yz',M('yz')+'-plane')+btn('equation','Show equation')+btn('reset','Reset'),
      slider('along0','Move first coordinate',-3,3,1,2)+slider('along1','Move second coordinate',-3,3,1,2)+slider('offset','Move off the plane',-3,3,1,0));
    m.querySelector('.c-sliders').classList.add('c-plane-sliders');
    // Keep native range inputs mounted while dragging; only their labels and values change.
    m.querySelectorAll('.c-sliders label').forEach(label=>{const text=label.firstChild,span=document.createElement('span');span.className='c-plane-slider-label';text.replaceWith(span);});
    function draw(){
      const absent={xy:2,xz:1,yz:0}[plane],inds=[0,1,2].filter(i=>i!==absent),v=[0,0,0];
      v[inds[0]]=along[0];v[inds[1]]=along[1];v[absent]=offset;
      const p=chart([-5.8,5.8,-4.5,5],300,690,42),vertices=[[-3,-3],[3,-3],[3,3],[-3,3]].map(q=>{const a=[0,0,0];a[inds[0]]=q[0];a[inds[1]]=q[1];return project(a);});
      p.polygon(vertices,[C.z,C.y,C.x][absent]);axes3(p,4);
      const foot=[...v];foot[absent]=0;
      // Two guides locate the point within the plane; the third shows its offset.
      inds.forEach(i=>{const onAxis=[0,0,0];onAxis[i]=foot[i];p.line(project(onAxis),project(foot),C.muted,'4 6',1.4);});
      if(offset!==0){p.dot(project(foot),'',C.muted);p.line(project(foot),project(v),C.z,'4 6',3);}
      const projected=project(v);p.dot(projected,'P',C.ink,projected[0]<0?-24:24,projected[1]<0?24:-24);
      ui.plot(p.svg(`The ${plane} plane and point P${tuple(v)}. ${offset===0?'The point is on the plane.':'The point is off the plane.'}`));
      const letter=letters[absent],point='P\\left('+v.map((n,i)=>i===absent?'{\\color{'+(offset===0?C.x:C.z)+'}\\mathbf{'+n+'}}':n).join(',')+'\\right)';
      ui.eq('<h3>'+M(plane)+'-plane</h3><p class="c-large">'+M(point)+'</p><p>Missing coordinate: '+M(letter)+'</p>'+(reveal?'<p class="c-large">'+M(letter+'=0')+'</p>':'<p class="c-predict">What is its equation?</p>'));
      ui.status(offset===0?'Move '+M(letters[inds[0]])+' and '+M(letters[inds[1]])+': '+M(letter)+' stays at '+M('0')+'.':'The point is off the '+M(plane)+'-plane: '+M(letter+'='+offset)+'. Return this coordinate to zero to rejoin the plane.');
      inds.forEach((i,j)=>{const el=m.querySelector(`[data-control="along${j}"]`);el.value=along[j];el.setAttribute('aria-label','Move '+letters[i]+' within the '+plane+' plane');el.previousElementSibling.innerHTML='Move '+M(letters[i]+'='+along[j]);});
      const off=m.querySelector('[data-control=offset]');off.value=offset;off.setAttribute('aria-label','Move off the '+plane+' plane: '+letter);off.previousElementSibling.innerHTML='Move off the plane '+M('('+letter+'='+offset+')');
      ['xy','xz','yz'].forEach(a=>press(m,a,a===plane));press(m,'equation',reveal);m.querySelector('[data-action=equation]').textContent=reveal?'Hide equation':'Show equation';
      m.dataset.plane=plane;m.dataset.offset=offset;m.dataset.point=JSON.stringify(v);
    }
    action(m,a=>{if(['xy','xz','yz'].includes(a)){plane=a;offset=0;along=[2,2];reveal=false;}if(a==='equation')reveal=!reveal;if(a==='reset'){offset=0;along=[2,2];reveal=false;}draw();});
    input(m,(a,v)=>{if(a==='offset')offset=v;else if(a==='along0')along[0]=v;else if(a==='along1')along[1]=v;draw();});draw();
  }
  function classify(m){const points=['A(3,-2,0)','B(4,0,-1)','C(0,-3,5)','D(0,0,2)','E(0,0,0)','F(1,2,3)'],answers=['xy','xz','yz','xz\\text{ and }yz','xy,\\ xz\\text{ and }yz','\\text{None}'];m.innerHTML='<div class="c-plane-questions">'+points.map((p,i)=>`<div class="c-plane-question"><span><strong>${'abcdef'[i]})</strong> ${M(p)}</span><button data-action="${i}" aria-pressed="false">Reveal</button><span class="c-plane-answer" data-row="${i}" hidden>${M(answers[i])}</span></div>`).join('')+'</div><div class="toolbar"><button data-action="reset">Reset all</button></div>';action(m,(a,b)=>{if(a==='reset'){m.querySelectorAll('.c-plane-answer').forEach(e=>e.hidden=true);m.querySelectorAll('[aria-pressed]').forEach(e=>{e.setAttribute('aria-pressed','false');e.textContent='Reveal';});}else{const e=m.querySelector(`[data-row="${a}"]`);e.hidden=!e.hidden;b.textContent=e.hidden?'Reveal':'Hide';b.setAttribute('aria-pressed',String(!e.hidden));}});}
  function basis(m){let dim=2,stage=0;const ui=frame(m,btn('2d','2D')+btn('3d','3D')+btn('next','Add next component')+btn('reset','Reset'));
    function draw(){const three=dim===3,v=(three?[2,3,3]:[3,2]),p=chart(three?[-4.4,4.4,-2.3,4]:[-1,5,-1,4],355,690,45);if(three)axes3(p,4);else p.axes2(4.2);const proj=a=>three?project(a):a;if(stage===0){for(let i=0;i<dim;i++){const a=Array(dim).fill(0);a[i]=1;p.arrow(proj(Array(dim).fill(0)),proj(a),'\\mathbf '+['i','j','k'][i],[C.x,C.y,C.z][i],{dx:i===2?-26:undefined,dy:i===1?27:undefined,width:6});}}else{path(p,v,stage,three);if(stage===dim)p.arrow([0,0],proj(v),'\\mathbf a',C.ink,{dx:0,dy:-35});}ui.plot(p.svg(`Standard unit vectors in ${dim}D and a vector assembled from ${stage} components.`));ui.eq(Array.from({length:dim},(_,i)=>'<p>'+M('\\mathbf '+['i','j','k'][i]+'='+V(Array.from({length:dim},(_,j)=>i===j?1:0)))+'</p>').join(''));ui.status(stage?M('\\mathbf a='+expression(v.slice(0,stage)))+(stage<dim?' …':''):'Each standard unit vector has magnitude 1.');m.querySelector('[data-action=next]').disabled=stage===dim;press(m,'2d',dim===2);press(m,'3d',three);m.dataset.dimension=dim;m.dataset.stage=stage;}
    action(m,a=>{if(a==='2d'||a==='3d'){dim=a==='2d'?2:3;stage=0;}if(a==='next')stage=Math.min(dim,stage+1);if(a==='reset')stage=0;draw();});draw();}
  function forms(m){
    let dim=2,v=[3,2,2],form='component';
    const ui=frame(m,'<div class="c-form-presets" role="group" aria-label="Vector settings">'+btn('2d','2D')+btn('3d','3D')+btn('mixed','Mixed signs')+btn('zero','Zero component')+btn('reset','Reset')+'</div><div class="c-form-types" role="group" aria-label="Vector notation">'+btn('component','Component')+btn('tuple','Ordered pair / triple')+btn('column','Column')+'</div>');
    function draw(){
      const a=v.slice(0,dim),three=dim===3,p=chart(three?[-3.8,4.2,-2.8,4.3]:[-1,5,-3,4],345,690,42);
      if(three)axes3(p,3.5);else{p.grid();p.axes2(4.3);}
      const proj=v=>three?project(v):v;let at=Array(dim).fill(0);
      a.forEach((n,i)=>{const next=[...at];next[i]+=n;if(n!==0)p.arrow(proj(at),proj(next),expression(a.map((_,j)=>i===j?n:0)),[C.x,C.y,C.z][i],{dx:three?(i===0?-38:i===2?(proj(next)[0]<0?-40:40):0):i===1?35:0,dy:i===1&&three?28:!three&&i===0?25:0});at=next;});
      const end=proj(a);p.arrow([0,0],end,'',C.ink);p.dot(end,'P'+tuple(a),C.ink,three&&end[0]<0?-65:60,-25);
      ui.plot(p.svg(`Vector ${tuple(a)} from the origin to P${tuple(a)}, displayed in ${form} notation.`));
      ui.eq('<h3>'+({component:'Component form',tuple:dim===2?'Ordered pair':'Ordered triple',column:'Column vector'}[form])+'</h3><p class="c-large">'+M('\\mathbf a='+({component:expression(a),tuple:tuple(a),column:V(a)}[form]))+'</p>');
      ui.status('Keep the order '+M(three?'x,\\ y,\\ z':'x,\\ y')+' in every form.');
      ['2d','3d','component','tuple','column'].forEach(a=>press(m,a,a===(three?'3d':'2d')||a===form));m.dataset.dimension=dim;m.dataset.vector=JSON.stringify(a);m.dataset.form=form;
    }
    action(m,a=>{if(a==='2d')dim=2;if(a==='3d'){dim=3;v=[2,3,3];}if(['component','tuple','column'].includes(a))form=a;if(a==='mixed')v=[2,-1,3];if(a==='zero')v=[3,0,2];if(a==='reset'){dim=2;v=[3,2,2];form='component';}draw();});draw();
  }
  function unitSteps(m){
    // Original booklet tails and heads, including b's leftward direction.
    const vectors=[{name:'a',tail:[0,1],head:[1,3]},{name:'b',tail:[2,-2],head:[-3,-3]},{name:'c',tail:[-2,1],head:[-3,4]}];
    let shown=[false,false,false];const ui=frame(m,btn('reset','Reset all'));
    const symbol=name=>'\\underset{\\sim}{'+name+'}';
    function draw(){
      const p=chart([-4.4,3.5,-4,5],420,650,32);p.grid();p.axes2(5);
      // Integer ticks give the original grid a readable scale.
      for(let n=-3;n<=3;n++)if(n){p.label([n,0],String(n),C.muted,0,16,38);}
      for(let n=-3;n<=4;n++)if(n){p.label([0,n],String(n),C.muted,16,0,38);}
      vectors.forEach((a,i)=>{
        p.arrow(a.tail,a.head,symbol(a.name),C.ink,{width:3.5,dx:i===1?0:i===2?30:-25,dy:i===1?27:-4});
        if(!shown[i])return;
        let at=[...a.tail];const delta=add(a.head,mul(-1,a.tail));
        delta.forEach((n,axis)=>{for(let j=0;j<Math.abs(n);j++){
          const next=[...at];next[axis]+=Math.sign(n);
          p.arrow(at,next,(n<0?'-':'')+'\\mathbf '+['i','j'][axis],[C.x,C.y][axis],{width:3,dx:axis?(i===2?-25:25):0,dy:axis?0:(i===0?24:-23),labelWidth:70,cls:'c-unit-step c-unit-'+a.name});at=next;
        }});
      });
      ui.plot(p.svg('Booklet Example 3.2: vectors a, b and c with optional head-to-tail unit-vector steps.'));
      ui.eq(vectors.map((a,i)=>{
        const delta=add(a.head,mul(-1,a.tail));
        const answer=shown[i]?'<p>'+M(symbol(a.name)+'='+expression(delta))+'</p><p>'+M('='+V(delta))+'</p>':'<p class="c-predict">Count from its own tail.</p>';
        return '<div class="c-unit-answer">'+btn('show-'+i,(shown[i]?'Hide ':'Show ')+M(symbol(a.name)))+answer+'</div>';
      }).join(''));
      shown.forEach((on,i)=>press(m,'show-'+i,on));ui.status('Add each unit step head to tail: '+M('\\mathbf i')+' horizontally, '+M('\\mathbf j')+' vertically.');m.dataset.revealed=JSON.stringify(shown);
    }
    action(m,a=>{if(a==='reset')shown=[false,false,false];else if(a.startsWith('show-')){const i=Number(a.slice(5));shown[i]=!shown[i];}draw();});draw();
  }
  function resolving(m){let theta=35,reveal=false;const ui=frame(m,btn('35',M('35^\\circ'))+btn('90',M('90^\\circ'))+btn('150',M('150^\\circ'))+btn('240',M('240^\\circ'))+btn('components','Show components')+btn('reset','Reset'),slider('theta','Angle (degrees)',0,360,1,35));
    function draw(){const magnitude=6,t=theta*Math.PI/180,v=[clean(magnitude*Math.cos(t)),clean(magnitude*Math.sin(t))],p=chart([-7.6,7.6,-7.6,7.6],365,690,33);p.axes2(7);if(reveal){p.line(v,[v[0],0],C.muted,'5 6');p.arrow([0,0],[v[0],0],'x',C.x,{dy:v[1]<0?-25:25});p.arrow([v[0],0],v,'y',C.y,{dx:v[0]<0?-28:28,dy:0});}const outside=Math.sin(t)*Math.cos(t)<0?-1:1,nx=-Math.sin(t)*outside,ny=-Math.cos(t)*outside;p.arrow([0,0],v,'\\mathbf a',C.ink,{dx:nx*28,dy:ny*28,width:5});p.label(mul(.85,v),'\\lvert\\mathbf a\\rvert=6',C.ink,nx*65,ny*65,185);const count=Math.max(2,Math.ceil(theta/6)+1),pts=Array.from({length:count},(_,i)=>{const angle=t*i/(count-1);return [1.25*Math.cos(angle),1.25*Math.sin(angle)];});for(let i=1;i<pts.length;i++)p.line(pts[i-1],pts[i],C.z,'',2);p.label([2.1*Math.cos(t/2),2.1*Math.sin(t/2)],theta+'^\\circ',C.z,0,-5,95);ui.plot(p.svg(`Vector of magnitude 6 at ${theta} degrees, components ${v[0]} and ${v[1]}.`));ui.eq('<p>'+M('|\\mathbf a|=6')+'</p><p>'+M('x=\\lvert\\mathbf a\\rvert\\cos\\theta')+'</p><p>'+M('y=\\lvert\\mathbf a\\rvert\\sin\\theta')+'</p>'+(reveal?'<p class="c-component-value">'+M('x=6\\cos'+theta+'^\\circ\\approx'+v[0].toFixed(2))+'</p><p class="c-component-value">'+M('y=6\\sin'+theta+'^\\circ\\approx'+v[1].toFixed(2))+'</p>':'<p class="c-predict">Predict the signs of the components.</p>'));ui.status(M('\\mathbf a=\\lvert\\mathbf a\\rvert\\cos\\theta\\,\\mathbf i+\\lvert\\mathbf a\\rvert\\sin\\theta\\,\\mathbf j'));m.querySelector('input').value=theta;m.querySelector('[data-action=components]').textContent=reveal?'Hide components':'Show components';press(m,'components',reveal);['35','90','150','240'].forEach(a=>press(m,a,+a===theta));m.dataset.angle=theta;m.dataset.displacement=JSON.stringify(v);m.dataset.revealed=reveal;}
    action(m,a=>{if(['35','90','150','240'].includes(a))theta=+a;if(a==='components')reveal=!reveal;if(a==='reset'){theta=35;reveal=false;}draw();});input(m,(a,v)=>{theta=v;draw();});draw();}
  function equality(m){let t=0;const ui=frame(m,btn('translate','Translate the copy')+btn('reset','Reset'),'',false);function draw(){const p=chart([-5,5,-2,5],300,1100,35),starts=[[-4,0],[0,2],[1,-1]],a=[3,2];p.grid();p.arrow([-4,0],[-1,2],'\\mathbf a=(3,2)',C.x,{labelWidth:240,dy:-30});p.arrow(starts[(t%2)+1],add(starts[(t%2)+1],a),'\\mathbf b=(3,2)',C.y,{labelWidth:240,dy:-30});ui.plot(p.svg('Equal vectors (3,2) at different starting points.'));ui.status(M('\\mathbf a=\\mathbf b\\quad\\Longleftrightarrow\\quad a_x=b_x\\text{ and }a_y=b_y'));m.dataset.translation=t;}action(m,a=>{t=a==='reset'?0:t+1;draw();});draw();}
  function operations(m,three=false){let mode='add',placement=0,negative=false,revealed=0,parallelogram=false;const a=three?[2,0,1]:[3,1],b=three?[0,3,2]:[1,2],max=three?1:2;
    const ui=frame(m,btn('add','Addition')+btn('subtract','Subtraction')+btn('negative',M('-\\mathbf b'))+btn('move','Move head to tail')+btn('parallelogram','Parallelogram')+btn('reveal',three?'Reveal calculation':'Reveal next component')+btn('reset','Reset'),slider('placement','Move the second vector',0,1,.01,0));
    function draw(){const subtract=mode==='subtract',v=mul(subtract?-1:1,b),r=add(a,v),origin=a.map(()=>0),start=mul(placement,a),end=add(start,v),proj=v=>three?project(v):v,p=chart(three?[-5,4.5,-2.5,4.5]:[-1.5,5.5,-3,4.5],335,690,45);if(three)axes3(p,4);else{p.grid();p.axes2(4.7);}p.arrow(proj(origin),proj(a),'\\mathbf a',C.x,{dx:three?-35:undefined,dy:subtract?-28:27});
      if(subtract)p.arrow(proj(origin),proj(b),'\\mathbf b',C.y,{dash:negative,opacity:negative?.3:1});
      const visible=!subtract||negative;
      if(visible){if(parallelogram){p.arrow(proj(origin),proj(v),subtract?'-\\mathbf b':'\\mathbf b',C.y,{dy:-25});p.arrow(proj(a),proj(r),'',C.y,{dash:true,opacity:.5});p.arrow(proj(v),proj(r),'',C.x,{dash:true,opacity:.5});}else{if(placement>0&&!subtract)p.arrow(proj(origin),proj(b),'',C.y,{dash:true,opacity:.25});p.arrow(proj(start),proj(end),subtract?'-\\mathbf b':'\\mathbf b',C.y,{dx:subtract?45:40,dy:subtract?22:0});}}
      if(revealed)p.arrow(proj(origin),proj(r),'\\mathbf a'+(subtract?'-':'+')+'\\mathbf b',C.z,{dx:three?90:0,dy:subtract?38:three?-45:-30,labelWidth:220,width:5});ui.plot(p.svg(`${three?'3D':'2D'} ${mode} construction. Second vector placement ${placement}. ${revealed?'Result shown.':'Result hidden.'}`));
      const symbol=subtract?'-':'+',rows=a.map((n,i)=>`${n}${symbol}${signed(b[i])}=${r[i]}`),shown=three?(revealed?3:0):revealed;
      ui.eq('<p>'+M('\\mathbf a='+V(a))+'</p><p>'+M('\\mathbf b='+V(b))+'</p>'+rows.map((s,i)=>'<p class="c-calculation '+(i<shown?'is-shown':'is-pending')+'">'+M(['x','y','z'][i]+':\\quad'+(i<shown?s:'\\ ?'))+'</p>').join(''));
      ui.status(revealed===max?M('\\mathbf a'+symbol+'\\mathbf b='+V(r)):subtract&&!negative?'Reverse the second vector first.':placement<1&&!parallelogram?'Place the vectors head to tail before calculating.':'Predict each component, then reveal.');
      m.querySelector('[data-action=negative]').disabled=!subtract;m.querySelector('[data-action=negative]').innerHTML=(negative?'Hide ':'Show ')+M('-\\mathbf b');press(m,'negative',negative);m.querySelector('[data-action=move]').disabled=!visible||placement===1||parallelogram;m.querySelector('[data-action=parallelogram]').disabled=!visible;m.querySelector('[data-action=reveal]').disabled=!visible||(!parallelogram&&placement<1)||revealed===max;m.querySelector('input').disabled=!visible||parallelogram;m.querySelector('input').value=placement;press(m,'add',!subtract);press(m,'subtract',subtract);press(m,'parallelogram',parallelogram);press(m,'reveal',revealed>0);m.dataset.mode=mode;m.dataset.placement=placement;m.dataset.revealed=revealed;m.dataset.result=JSON.stringify(r);m.dataset.negative=negative;}
    function reset(){placement=0;negative=false;revealed=0;parallelogram=false;}
    action(m,x=>{if(x==='add'||x==='subtract'){mode=x;reset();}if(x==='negative'){negative=!negative;placement=0;revealed=0;parallelogram=false;}if(x==='move')placement=1;if(x==='parallelogram'){parallelogram=!parallelogram;revealed=0;}if(x==='reveal')revealed=Math.min(max,revealed+1);if(x==='reset'){mode='add';reset();}draw();});input(m,(x,v)=>{placement=v;if(v<1)revealed=0;draw();});draw();}
  function scaling(m){let k=1;const a=[2,1],ui=frame(m,[-2,-.5,0,.5,1,2].map(n=>btn(String(n),M('k='+nf(n)))).join(''),slider('scalar','Scalar multiplier',-3,3,.5,1));function draw(){const v=mul(k,a),p=chart([-7,7,-3.8,3.8],335,690,38);p.grid();p.axes2(6.5);p.arrow([0,0],a,'\\mathbf a',C.x,{dash:true,dy:-28});p.arrow([0,0],v,k===0?'\\mathbf0':nf(k)+'\\mathbf a',C.z,{dy:30,width:5});ui.plot(p.svg(`Vector (2,1) scaled by ${k} to ${tuple(v)}.`));ui.eq('<p>'+M('\\mathbf a='+V(a))+'</p><p>'+M('k='+nf(k))+'</p><p class="c-large">'+M(nf(k)+V(a)+'='+V(v))+'</p>');ui.status(k===0?'Zero magnitude; no direction.':(k>0?'Same':'Opposite')+' direction, '+Math.abs(k)+' times the original length.');m.querySelector('input').value=k;[-2,-.5,0,.5,1,2].forEach(n=>press(m,String(n),n===k));m.dataset.scalar=k;m.dataset.multiple=JSON.stringify(v);}action(m,a=>{k=+a;draw();});input(m,(a,v)=>{k=v;draw();});draw();}
  function check(m){const b=m.querySelector('button'),answer=m.querySelector('.c-check-answer'),initial=b.textContent;action(m,()=>{answer.hidden=!answer.hidden;b.setAttribute('aria-pressed',String(!answer.hidden));b.textContent=answer.hidden?initial:'Hide check';});}
  function key(m,kind){const p=chart(kind==='scale'?[-1,5,-1,2]:[-2.8,4,-1.8,3.5],185,460,25);if(kind==='components'){const v=[2,2,2];prism(p,v);path(p,v,3,true,{labels:false});p.arrow([0,0],project(v),'\\mathbf a',C.ink,{dx:32,dy:-22});}else if(kind==='add'){p.arrow([0,0],[2.5,0],'\\mathbf a',C.x,{dy:24});p.arrow([2.5,0],[3.5,2],'\\mathbf b',C.y,{dx:27,dy:0});p.arrow([0,0],[3.5,2],'\\mathbf a+\\mathbf b',C.z,{dy:-28,labelWidth:220});}else{p.arrow([0,.3],[2,.3],'\\mathbf a',C.x,{dy:25});p.arrow([0,1.3],[4,1.3],'2\\mathbf a',C.z,{dy:-26});}m.innerHTML=p.svg('Key idea: '+kind+'.');}
  function init(){if(!window.MathsLesson){setTimeout(init,30);return;}const modules={cover,coordinates,planes,classify,basis,forms,unitSteps,resolving,equality,operations,operations3d:m=>operations(m,true),scaling,check,'key-components':m=>key(m,'components'),'key-add':m=>key(m,'add'),'key-scale':m=>key(m,'scale')};document.querySelectorAll('[data-components]').forEach(m=>{if(m.dataset.componentsReady)return;m.dataset.componentsReady='true';modules[m.dataset.components]?.(m);});window.MathsLesson.typeset(document);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
