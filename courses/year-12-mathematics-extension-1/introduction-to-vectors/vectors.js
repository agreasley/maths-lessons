/* Geometric vector demonstrations. Components remain internal to the diagrams. */
(() => {
  'use strict';
  const C={ink:'#152e3b',a:'#007f78',b:'#3b66a8',c:'#b55224',rule:'#d7d8ce',muted:'#607078'};
  const add=(a,b)=>a.map((x,i)=>x+b[i]);
  const mul=(k,a)=>a.map(x=>k*x);
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const math=t=>window.MathsLesson.math(t);
  const button=(action,label,cls='')=>`<button data-action="${action}" class="${cls}">${label}</button>`;
  const range=(name,label,min,max,step,value)=>`<label>${label}<input type="range" data-control="${name}" aria-label="${escape(label)}" min="${min}" max="${max}" step="${step}" value="${value}"></label>`;
  const number=k=>Number.isInteger(k)?String(k):k===.5?'\\tfrac12':k===-.5?'-\\tfrac12':String(k);
  const vecName=(k,v='\\mathbf a')=>k===0?'\\mathbf0':k===1?v:k===-1?'-'+v:number(k)+v;
  function canvas(bounds=[-1,6,-1,4],height=300,pad=45,width=960){
    const scale=Math.min((width-2*pad)/(bounds[1]-bounds[0]),(height-2*pad)/(bounds[3]-bounds[2]));
    const ox=(width-scale*(bounds[1]+bounds[0]))/2,oy=(height+scale*(bounds[3]+bounds[2]))/2;
    const P=p=>[ox+p[0]*scale,oy-p[1]*scale];
    const body=[];
    const line=(p,q,colour=C.rule,dash='',thickness=2)=>{const [x,y]=P(p),[u,v]=P(q);body.push(`<line x1="${x}" y1="${y}" x2="${u}" y2="${v}" stroke="${colour}" stroke-width="${thickness}"${dash?` stroke-dasharray="${dash}"`:''}/>`);};
    const label=(p,tex,colour=C.ink,dx=0,dy=0,w=160)=>{const [x,y]=P(p);body.push(window.VectorDiagramMath.label(x+dx,y+dy,tex,colour,25));};
    const dot=(p,tex='',colour=C.ink,dx=0,dy=25)=>{const [x,y]=P(p);body.push(`<circle cx="${x}" cy="${y}" r="4" fill="${colour}"/>`);if(tex)label(p,tex,colour,dx,dy);};
    const arrow=(p,q,tex='',colour=C.a,options={})=>{
      const [x,y]=P(p),[u,v]=P(q),len=Math.hypot(u-x,v-y);if(len<.1){dot(p,tex,colour,options.dx||0,options.dy||25);return;}
      const ux=(u-x)/len,uy=(v-y)/len,head=Math.min(15,len*.28),half=head*.43;
      body.push(`<g${options.opacity?` opacity="${options.opacity}"`:''}><line x1="${x}" y1="${y}" x2="${u-ux*head*.65}" y2="${v-uy*head*.65}" stroke="${colour}" stroke-width="${options.width||4}"${options.dotted?' stroke-dasharray="1 8" stroke-linecap="round"':options.dash?' stroke-dasharray="7 6"':''}/><polygon points="${u},${v} ${u-ux*head-uy*half},${v-uy*head+ux*half} ${u-ux*head+uy*half},${v-uy*head-ux*half}" fill="${colour}"/></g>`);
      if(options.drag)body.push(`<line data-drag="copy" x1="${x}" y1="${y}" x2="${u}" y2="${v}" stroke="transparent" stroke-width="42" class="v-drag-target"/>`);
      if(tex)label([(p[0]+q[0])/2,(p[1]+q[1])/2],tex,colour,options.dx??uy*27,options.dy??-ux*27,options.labelWidth||160);
    };
    const grid=()=>{for(let x=Math.ceil(bounds[0]);x<=bounds[1];x++)line([x,bounds[2]],[x,bounds[3]],C.rule,'',1);for(let y=Math.ceil(bounds[2]);y<=bounds[3];y++)line([bounds[0],y],[bounds[1],y],C.rule,'',1);};
    const group=(attributes,draw)=>{body.push(`<g ${attributes}>`);draw();body.push('</g>');};
    const svg=description=>`<svg class="v-diagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(description)}"><title>${escape(description)}</title>${body.join('')}</svg>`;
    return {line,label,dot,arrow,grid,group,svg,scale,ox,oy};
  }
  function mount(m,controls='',sliders=''){
    m.innerHTML='<div class="v-plot"></div>'+ (sliders?`<div class="v-sliders">${sliders}</div>`:'')+`<div class="toolbar v-controls">${controls}</div><div class="v-status" aria-live="polite"></div>`;
    return {plot:html=>m.querySelector('.v-plot').innerHTML=html,status:html=>m.querySelector('.v-status').innerHTML=html};
  }
  function onAction(m,fn){m.addEventListener('click',e=>{const b=e.target.closest('button[data-action]');if(b)fn(b.dataset.action,b);});}
  function press(m,action,state){const b=m.querySelector(`[data-action="${action}"]`);if(b)b.setAttribute('aria-pressed',String(state));}
  function motion(m,turn=false){
    let stage=0,result=false;
    const ui=mount(m,button('next','Show first movement','primary')+button('result','Reveal displacement')+button('reset','Reset'));
    function draw(){
      const p=canvas(turn?[-.8,6,-.8,2.7]:[-.6,6,-1.3,1.2],turn?265:225);
      if(turn){p.line([0,0],[5.8,0]);p.line([0,0],[0,2.6]);p.label([5.7,0],'\\text{East}',C.muted,0,30);p.label([0,2.5],'\\text{North}',C.muted,0,-20);}
      else {p.line([0,0],[6,0],C.muted);for(let x=0;x<=6;x++){p.line([x,-.06],[x,.06],C.muted);p.label([x,0],String(x),C.muted,0,25);}p.label([5.5,0],'\\text{metres}',C.muted,0,58);}
      p.dot([0,0],'\\text{Start}',C.ink,-35,-25);
      if(stage>=1)p.arrow([0,turn?0:.5],[5,turn?0:.5],turn?'5\\text{ m east}':'+5\\text{ m}',C.a,{dy:-26});
      if(stage>=2)p.arrow([5,turn?0:1],[turn?5:3,turn?2:1],turn?'2\\text{ m north}':'-2\\text{ m}',C.b,{dx:turn?90:0,dy:turn?0:-26,labelWidth:200});
      if(result){p.arrow([0,turn?0:-.7],turn?[5,2]:[3,-.7],turn?'\\text{Displacement}':'+3\\text{ m}',C.c,{dy:turn?-27:25,labelWidth:220});p.dot(turn?[5,2]:[3,0]);}
      ui.plot(p.svg(turn?'Five metres east then two metres north, with a separately revealed displacement.':'Signed motion along a line: five metres right then two metres left.'));
      ui.status(result?(turn?'Distance travelled: '+math('7\\text{ m}')+'. The displacement also has a direction.':math('+5+(-2)=+3\\text{ m}')+' — 3 metres to the right.'):'Predict the endpoint before revealing the displacement.');
      const next=m.querySelector('[data-action="next"]');next.disabled=stage===2;next.textContent=stage===0?'Show first movement':stage===1?'Show second movement':'Both movements shown';
      m.querySelector('[data-action="result"]').disabled=stage<2;press(m,'result',result);m.dataset.stage=stage;m.dataset.result=result;
    }
    onAction(m,a=>{if(a==='next')stage=Math.min(2,stage+1);if(a==='result')result=!result;if(a==='reset'){stage=0;result=false;}draw();});draw();
  }
  function cover(m){
    const p=canvas([-.5,4.5,-.7,3.4],400,50,520),O=[0,0],a=[3,.6],b=[.9,2.2],r=add(a,b);
    p.line(O,b,'#55727f','5 8');p.line(b,r,'#55727f','5 8');
    p.arrow(O,a,'\\mathbf a','#8cddd0',{width:6,dy:30});
    p.arrow(a,r,'\\mathbf b','#93b9ef',{width:6,dx:34,dy:0});
    p.arrow(O,r,'\\mathbf a+\\mathbf b','#efba79',{width:6,dx:-38,dy:-20});
    p.dot(O,'','#e0e9eb');m.innerHTML=p.svg('Two vectors a and b placed head to tail, with their resultant a plus b.');
  }
  function keyDiagram(m,kind){
    const p=canvas(kind==='subtraction'?[-.6,4.7,-1.5,1.3]:[-.6,4.7,-.55,1.8],172,28,620),O=[0,0];
    if(kind==='addition'){
      const a=[3,0],r=[4,1.3];
      p.arrow(O,a,'\\mathbf a',C.a,{dy:26});p.arrow(a,r,'\\mathbf b',C.b,{dx:28,dy:0});
      p.arrow(O,r,'\\mathbf a+\\mathbf b',C.c,{dy:-28,labelWidth:220});
    }else if(kind==='opposite'){
      p.arrow([0,1.2],[4,1.2],'\\mathbf a',C.a,{dy:-25});
      p.arrow([4,0],[0,0],'-\\mathbf a',C.b,{dy:26});
      p.line([0,0],[0,1.2],C.rule,'3 5');p.line([4,0],[4,1.2],C.rule,'3 5');
    }else{
      const a=[3.5,.7],d=[2.5,-.9];
      p.arrow(O,a,'\\mathbf a',C.a,{dy:-28});p.arrow(a,d,'-\\mathbf b',C.b,{dx:35,dy:0});
      p.arrow(O,d,'\\mathbf a-\\mathbf b',C.c,{dy:29,labelWidth:220});
    }
    m.innerHTML=p.svg({addition:'Add head to tail: a followed by b, with resultant a plus b.',opposite:'Vectors a and negative a have equal lengths and opposite directions.',subtraction:'Subtract b by placing negative b at the head of a, with resultant a minus b.'}[kind]);
  }
  function notation(m){const p=canvas([-1,5,-.7,2.5],185,25);p.arrow([0,0],[4,2],'\\mathbf a',C.a,{dy:-30});p.dot([0,0],'A',C.ink,-25,15);p.dot([4,2],'B',C.ink,25,-10);m.innerHTML=p.svg('A directed line segment with tail A and head B, labelled vector a.');}
  function equal(m){
    let t=[1,-2],drag=null;
    const a=[3,2],base=[-3,-.5],initial=[1,-2];
    const ui=mount(m,button('left','← Move left')+button('right','Move right →')+button('up','Move up ↑')+button('down','Move down ↓')+button('reset','Reset'));
    const current=canvas([-5,5,-3,4],280);current.grid();current.arrow(base,add(base,a),'\\mathbf a',C.a);
    current.group('data-moving-copy=""',()=>current.arrow(initial,add(initial,a),'\\mathbf a',C.c,{drag:true}));
    ui.plot(current.svg('Two equal vectors at different starting points. Drag the orange copy or use the movement buttons.'));
    const copy=m.querySelector('[data-moving-copy]');
    // Keep the touched SVG node in the DOM throughout a drag so the next tap still produces a click.
    function draw(){copy.setAttribute('transform',`translate(${(t[0]-initial[0])*current.scale} ${-(t[1]-initial[1])*current.scale})`);ui.status('Drag the orange arrow, or use the move buttons.');m.dataset.translation=JSON.stringify(t);m.dataset.displacement=JSON.stringify(a);}
    function move(x,y){t=[Math.max(-4.5,Math.min(1.7,x)),Math.max(-2.5,Math.min(1.5,y))];draw();}
    function world(e){const svg=m.querySelector('svg'),p=new DOMPoint(e.clientX,e.clientY).matrixTransform(svg.getScreenCTM().inverse());return [(p.x-current.ox)/current.scale,(current.oy-p.y)/current.scale];}
    m.addEventListener('pointerdown',e=>{if(!e.target.closest('[data-drag]'))return;e.preventDefault();drag={point:world(e),initial:[...t],id:e.pointerId};m.setPointerCapture(e.pointerId);});
    m.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;e.preventDefault();const p=world(e);move(drag.initial[0]+p[0]-drag.point[0],drag.initial[1]+p[1]-drag.point[1]);});
    const stop=()=>{drag=null;};m.addEventListener('pointerup',stop);m.addEventListener('pointercancel',stop);
    // A touch drag can suppress the following compatibility click in some browsers.
    // Complete a stationary button tap explicitly and cancel its native duplicate.
    let buttonTouch=null;
    m.addEventListener('touchstart',e=>{
      const b=e.target.closest('button[data-action]'),touch=e.touches[0];
      buttonTouch=b&&e.touches.length===1?{b,id:touch.identifier,x:touch.clientX,y:touch.clientY}:null;
    },{passive:true});
    m.addEventListener('touchend',e=>{
      const saved=buttonTouch;buttonTouch=null;if(!saved)return;
      const touch=[...e.changedTouches].find(touch=>touch.identifier===saved.id);
      if(touch&&Math.hypot(touch.clientX-saved.x,touch.clientY-saved.y)<12&&document.elementFromPoint(touch.clientX,touch.clientY)?.closest('button')===saved.b){e.preventDefault();saved.b.click();}
    },{passive:false});
    m.addEventListener('touchcancel',()=>{buttonTouch=null;});
    onAction(m,a=>{if(a==='reset'){t=[1,-2];draw();return;}const delta={left:[-.5,0],right:[.5,0],up:[0,.5],down:[0,-.5]}[a];if(delta)move(t[0]+delta[0],t[1]+delta[1]);});draw();
  }
  function special(m){
    let mode='opposite';const ui=mount(m,button('opposite','Opposite vector')+button('zero','Zero vector')+button('unit','Unit vector'));
    function draw(){const p=canvas([-3.6,4.5,-2.6,2.8],205),a=[3,2];p.arrow([0,0],a,'\\mathbf a',C.a);if(mode==='opposite')p.arrow([0,0],mul(-1,a),'-\\mathbf a',C.c);if(mode==='zero')p.dot([0,0],'\\mathbf0',C.c,0,32);if(mode==='unit')p.arrow([0,0],mul(1/Math.hypot(...a),a),'\\hat{\\mathbf a}',C.c,{dx:0,dy:30,width:6});p.line([3,-1.6],[4,-1.6],C.muted);p.line([3,-1.7],[3,-1.5],C.muted);p.line([4,-1.7],[4,-1.5],C.muted);p.label([3.5,-1.6],'1\\text{ unit}',C.muted,0,28);ui.plot(p.svg(`Vector a compared with its ${mode} vector, using a one-unit scale.`));ui.status('');['opposite','zero','unit'].forEach(x=>press(m,x,x===mode));m.dataset.mode=mode;}
    onAction(m,a=>{mode=a;draw();});draw();
  }
  function addition(m){
    let mode='triangle',placement=0,result=false,swapped=false;
    const ui=mount(m,button('triangle','Triangle law')+button('parallelogram','Parallelogram law')+button('swap','Swap order')+button('result','Reveal resultant')+button('reset','Reset'),range('placement','Move the second vector head-to-tail',0,1,.01,0));
    function draw(){const p=canvas([-.5,5,-.6,3.8],290),a=[3,1],b=[1,2],r=add(a,b),u=swapped?b:a,v=swapped?a:b,uc=swapped?C.b:C.a,vc=swapped?C.a:C.b,un=swapped?'\\mathbf b':'\\mathbf a',vn=swapped?'\\mathbf a':'\\mathbf b';
      p.dot([0,0],'\\text{Start}',C.ink,-20,26);p.arrow([0,0],u,un,uc);
      if(mode==='parallelogram'){p.arrow([0,0],v,vn,vc);p.arrow(u,r,'',vc,{dash:true,opacity:.45});p.arrow(v,r,'',uc,{dash:true,opacity:.45});}
      else{const t=mul(placement,u);if(placement>0)p.arrow([0,0],v,'',vc,{dash:true,opacity:.18});p.arrow(t,add(t,v),vn,vc);if(result&&placement<1)p.arrow(u,r,'',vc,{dash:true,opacity:.3});}
      if(result)p.arrow([0,0],r,'\\mathbf a+\\mathbf b',C.c,{dx:0,dy:-36,labelWidth:230});ui.plot(p.svg(`${mode} construction for vector addition; resultant ${result?'shown':'hidden'}.`));
      ui.status(result?math(swapped?'\\mathbf b+\\mathbf a=\\mathbf a+\\mathbf b':'\\mathbf a+\\mathbf b'):'Predict the starting point and endpoint of the resultant.');
      m.querySelector('[data-control="placement"]').disabled=mode!=='triangle';m.querySelector('[data-action="result"]').textContent=result?'Hide resultant':'Reveal resultant';press(m,'triangle',mode==='triangle');press(m,'parallelogram',mode==='parallelogram');press(m,'swap',swapped);press(m,'result',result);m.dataset.result=result;m.dataset.sum=JSON.stringify(r);m.dataset.placement=placement;
    }
    m.addEventListener('input',e=>{if(e.target.dataset.control==='placement'){placement=Number(e.target.value);draw();}});
    onAction(m,a=>{if(a==='triangle'){mode='triangle';placement=1;}if(a==='parallelogram')mode='parallelogram';if(a==='swap')swapped=!swapped;if(a==='result')result=!result;if(a==='reset'){mode='triangle';placement=0;result=false;swapped=false;}m.querySelector('[data-control="placement"]').value=placement;draw();});draw();
  }
  function parallelogram(m){
    let target='';const ui=mount(m,button('DA','Highlight (a)')+button('AC','Highlight (b)')+button('BD','Highlight (c)')+button('reset','Clear highlight'));
    function draw(){const p=canvas([-1,6,-.7,3.4],245,40),A=[0,0],B=[4,0],D=[1,2.5],Cpt=[5,2.5];p.line(A,D,C.muted);p.line(D,Cpt,C.muted);p.arrow(A,B,'\\mathbf a',C.a,{dy:26});p.arrow(B,Cpt,'\\mathbf b',C.b,{dx:30,dy:0});for(const [name,point,dx,dy] of [['A',A,-20,15],['B',B,20,20],['C',Cpt,18,-15],['D',D,-15,-25]])p.dot(point,name,C.ink,dx,dy);const pairs={DA:[D,A],AC:[A,Cpt],BD:[B,D]};if(target)p.arrow(...pairs[target],'',C.c,{width:5});ui.plot(p.svg(`Parallelogram ABCD with AB=a and BC=b. ${target?'Requested vector '+target+' highlighted.':''}`));ui.status(target?'Highlighted: '+math('\\overrightarrow{'+target+'}'):'Choose a part to highlight its requested vector.');m.dataset.target=target;}
    onAction(m,a=>{target=a==='reset'?'':a;draw();});draw();
  }
  function subtraction(m){
    let opposite=false,placement=0,result=false,swapped=false;
    const ui=mount(m,button('opposite','Show opposite')+button('move','Move head to tail')+button('result','Reveal difference')+button('swap','Swap order')+button('reset','Reset'),range('placement','Move the negative vector head to tail',0,1,.01,0));
    function draw(){
      const p=canvas([-1.6,3.8,-2.5,2.5],300,25),a=[3,1],b=[1,2],u=swapped?b:a,v=swapped?a:b,d=add(u,mul(-1,v));
      const un=swapped?'\\mathbf b':'\\mathbf a',vn=swapped?'\\mathbf a':'\\mathbf b',uc=swapped?C.b:C.a,vc=swapped?C.a:C.b,t=mul(placement,u),head=add(t,mul(-1,v));
      p.dot([0,0]);p.arrow([0,0],u,un,uc,{dy:-30});
      p.group('data-sub-original=""',()=>p.arrow([0,0],v,vn,vc,opposite?{dotted:true,opacity:.3,dx:-30,dy:-8}:{dx:-30,dy:-8}));
      if(opposite){
        if(placement>0)p.arrow([0,0],mul(-1,v),'',vc,{dotted:true,opacity:.16});
        p.group('data-sub-negative=""',()=>p.arrow(t,head,'-'+vn,vc,{dx:35,dy:10}));
        p.dot(t,'',vc);
      }
      if(result)p.group('data-sub-result=""',()=>p.arrow([0,0],d,un+'-'+vn,C.c,{dy:38,labelWidth:230,width:5}));
      ui.plot(p.svg(!opposite?'Vectors a and b with a common tail.':`Original vector ${swapped?'a':'b'} dotted; its opposite translated ${Math.round(placement*100)} percent of the way to the head of ${swapped?'b':'a'}. Difference ${result?'revealed':'hidden'}.`));
      ui.status(!opposite?'Start with '+math(un)+' and '+math(vn)+'. Which vector must reverse?':placement<1?'Move '+math('-'+vn)+' without changing its length or direction.':result?math(un+'-'+vn+'='+un+'+(-'+vn+')'):'Now add head to tail. Predict the resultant before revealing it.');
      m.closest('section').querySelector('.v-sub-equation').innerHTML=math(un+'-'+vn+'='+un+'+(-'+vn+')');
      m.querySelector('[data-action="opposite"]').innerHTML=(opposite?'Hide ':'Show ')+math('-'+vn);
      m.querySelector('[data-control="placement"]').disabled=!opposite;
      m.querySelector('[data-control="placement"]').value=placement;
      m.querySelector('[data-action="move"]').disabled=!opposite||placement===1;
      m.querySelector('[data-action="result"]').disabled=!opposite||placement!==1;
      m.querySelector('[data-action="result"]').textContent=result?'Hide difference':'Reveal difference';
      press(m,'opposite',opposite);press(m,'swap',swapped);press(m,'result',result);
      m.dataset.opposite=opposite;m.dataset.placement=placement;m.dataset.result=result;m.dataset.difference=JSON.stringify(d);m.dataset.negativeTail=JSON.stringify(t);m.dataset.negativeHead=JSON.stringify(head);
    }
    m.addEventListener('input',e=>{if(e.target.dataset.control==='placement'){placement=Number(e.target.value);if(placement<1)result=false;draw();}});
    onAction(m,action=>{
      if(action==='opposite'){opposite=!opposite;placement=0;result=false;}
      if(action==='move'&&opposite)placement=1;
      if(action==='result'&&opposite&&placement===1)result=!result;
      if(action==='swap'){swapped=!swapped;opposite=false;placement=0;result=false;}
      if(action==='reset'){swapped=false;opposite=false;placement=0;result=false;}
      draw();
    });draw();
  }
  function closed(m){
    let stage=0,result=false;const ui=mount(m,button('next','Show next movement','primary')+button('result','Reveal resultant')+button('reset','Reset'));
    function draw(){const p=canvas([-1,5,-1,3],290),O=[0,0],A=[3,0],B=[4,2];p.dot(O,'\\text{Start}',C.ink,-30,30);if(stage>=1)p.arrow(O,A,'\\mathbf a',C.a,{dy:28});if(stage>=2)p.arrow(A,B,'\\mathbf b',C.b,{dx:35,dy:0});if(stage>=3)p.arrow(B,O,'\\mathbf c',C.c);if(result)p.dot(O,'\\mathbf0',C.c,0,-30);ui.plot(p.svg('Three directed vectors form a closed triangular path.'));ui.status(result?math('\\mathbf a+\\mathbf b+\\mathbf c=\\mathbf0'):'Where is the finish relative to the start?');m.querySelector('[data-action="next"]').disabled=stage===3;m.querySelector('[data-action="result"]').disabled=stage<3;press(m,'result',result);m.dataset.stage=stage;m.dataset.result=result;}
    onAction(m,a=>{if(a==='next')stage=Math.min(3,stage+1);if(a==='result')result=!result;if(a==='reset'){stage=0;result=false;}draw();});draw();
  }
  function scaling(m){
    let k=1;const ui=mount(m,[-2,-.5,0,.5,1,2].map(x=>button(String(x),math('k='+number(x)))).join(''),range('scalar','Scalar multiplier',-3,3,.5,k));
    function draw(){const a=[2,.5],p=canvas([-6.7,6.7,-2,2],270,25);p.group('data-scaling-base=""',()=>p.arrow([0,0],a,'\\mathbf a',C.a,{width:7,dy:-32}));if(k===0)p.dot([0,0],'\\mathbf0',C.c,0,35);else p.arrow([0,0],mul(k,a),vecName(k),C.c,{dy:k>0?30:-30});ui.plot(p.svg(`Vector a and its scalar multiple with k=${k}.`));ui.status(math('k='+number(k))+': '+(k===0?'magnitude zero; no direction.':`${k>0?'Same':'Opposite'} direction; ${Math.abs(k)} times the original length.`));m.querySelector('[data-control="scalar"]').value=k;[...m.querySelectorAll('button')].forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.action)===k)));m.dataset.scalar=k;m.dataset.multiple=JSON.stringify(mul(k,a));}
    m.addEventListener('input',e=>{if(e.target.dataset.control==='scalar'){k=Number(e.target.value);draw();}});onAction(m,a=>{k=Number(a);draw();});draw();
  }
  function init(){if(!window.MathsLesson||!window.VectorDiagramMath?.ready){setTimeout(init,30);return;}const modules={signed:m=>motion(m),turn:m=>motion(m,true),cover,notation,equal,special,addition,parallelogram,subtraction,closed,scaling,'key-addition':m=>keyDiagram(m,'addition'),'key-opposite':m=>keyDiagram(m,'opposite'),'key-subtraction':m=>keyDiagram(m,'subtraction')};document.querySelectorAll('[data-vector]').forEach(m=>{if(m.dataset.vectorReady)return;m.dataset.vectorReady='true';modules[m.dataset.vector]?.(m);});window.MathsLesson.typeset(document);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
