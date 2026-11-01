/* Lesson 7: native SVG projection diagrams and reversible teaching reveals. */
(()=>{'use strict';
const C={ink:'#152e3b',a:'#3b66a8',c:'#007f78',p:'#b55224',muted:'#607078',rule:'#a8b7bc'};
const V=s=>'\\underset{\\sim}{'+s+'}';
const label=(x,y,t,c=C.ink,size=27)=>window.VectorDiagramMath.label(x,y,t,c,size);
const path=(p,q,c=C.rule,w=3,extra='')=>`<path d="M${p.join(' ')} L${q.join(' ')}" stroke="${c}" stroke-width="${w}" fill="none" ${extra}/>`;
const arrow=(p,q,c=C.a,w=5,extra='')=>{const dx=q[0]-p[0],dy=q[1]-p[1],len=Math.hypot(dx,dy);if(len<.01)return `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="${c}"/>`;const u=dx/len,v=dy/len,h=Math.min(15,len*.5),k=h*.45;return path(p,[q[0]-u*h*.6,q[1]-v*h*.6],c,w,extra)+`<path d="M${q.join(' ')} L${q[0]-u*h-v*k} ${q[1]-v*h+u*k} L${q[0]-u*h+v*k} ${q[1]-v*h-u*k} Z" fill="${c}"/>`;};
const circle=(p,c=C.ink)=>`<circle cx="${p[0]}" cy="${p[1]}" r="4.5" fill="${c}"/>`;
const svg=(body,desc,w=720,h=430)=>`<svg class="pr-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${desc}"><title>${desc}</title>${body}</svg>`;
const arc=(o,r,s,e,c=C.p)=>{const pt=t=>[o[0]+r*Math.cos(t),o[1]-r*Math.sin(t)];return `<path d="M${pt(s).join(' ')} A${r} ${r} 0 ${e-s>Math.PI?1:0} 0 ${pt(e).join(' ')}" stroke="${c}" stroke-width="2.5" fill="none"/>`;};
const right=(h,dx=-1,dy=-1,col=C.muted)=>`<path d="M${h[0]+dx*16} ${h[1]} v${dy*16} h${-dx*16}" stroke="${col}" fill="none" stroke-width="2"/>`;
function projection({theta=60,length=4,drop=true,parallel=true,perp=false,dark=false,staged=false,numeric=false}={}){
 const t=theta*Math.PI/180,L=length*55,o=[330,335],q=[o[0]+L*Math.cos(t),o[1]-L*Math.sin(t)],h=[q[0],o[1]],end=[670,335];
 const colors=dark?{a:'#9ebff0',c:'#8cddd0',p:'#efb783',muted:'#b3c5cc'}:C;
 const shortPerp=Math.abs(q[1]-h[1])<80;
 const perpLabelX=shortPerp?(theta>90?Math.max(75,h[0]-65):Math.min(670,h[0]+65)):h[0]+33;
 const group=(level,body,show)=>show?`<g${staged?` class="pr-stage pr-stage-${level}"`:''}>${body}</g>`:'';
 let s=path([60,335],[690,335],colors.muted,1.6,'stroke-dasharray="5 6"')+arrow(o,end,colors.muted,3)+label(635,377,V('b'),colors.muted,32);
 if(theta>0)s+=arc(o,Math.min(54,L*.45),0,t,colors.p)+label(o[0]+Math.min(87,L*.45+32)*Math.cos(t/2),o[1]-Math.min(87,L*.45+32)*Math.sin(t/2),numeric?`${theta}^\\circ`:'\\theta',colors.p,25);
 else s+=label(375,285,'0^\\circ',colors.p,25);
 s+=group(1,path(q,h,colors.muted,2,'stroke-dasharray="6 6"')+(theta!==0&&theta!==180&&theta!==90?right(h,theta<90?-1:1,-1,colors.muted):''),drop);
 s+=group(1,arrow(o,h,colors.c,8,'class="pr-draw" pathLength="1"')+label(Math.abs(h[0]-o[0])<25?o[0]-85:(o[0]+h[0])/2,377,V('c')+(theta===90?'='+V('0'):''),colors.c,30),parallel);
 s+=group(2,arrow(h,q,colors.p,8,'class="pr-draw" pathLength="1"')+label(perpLabelX,(shortPerp?245:(h[1]+q[1])/2),V('p')+(theta===0||theta===180?'='+V('0'):''),colors.p,30),perp);
 s+=arrow(o,q,colors.a,5)+label(q[0]+(theta<90?25:-25),q[1]-29,V('a'),colors.a,32)+circle(o,colors.muted)+label(o[0]-18,o[1]+70,'O',colors.muted,24);
 return svg(s,'Vector a with chosen direction b. Its parallel component c and perpendicular component p add to a.');
}
function draw(kind){
 if(kind==='cover')return projection({theta:55,perp:true,dark:true});
 if(kind==='acute')return projection({theta:55});
 if(kind==='key')return projection({theta:55,perp:true});
 if(kind==='decompose')return projection({theta:55,perp:true,staged:true});
 if(kind==='recall')return svg(arrow([100,325],[460,325],C.c,7)+arrow([460,325],[460,85],C.p,5)+arrow([100,325],[460,85],C.a,5)+right([460,325])+label(255,185,V('a'),C.a,35)+label(280,370,'3'+V('i'),C.c,35)+label(515,205,'2'+V('j'),C.p,35),'The vector a is 3i plus 2j.',620,420);
 if(kind==='negative'){
  const o=[290,165],a=[370,365],b=[210,45],h=[290+40*38/13,165+40*57/13];
  return svg(path([195,22],[450,405],C.rule,1.5,'stroke-dasharray="5 5"')+arrow(o,b,C.muted,4)+path(a,h,C.rule,2,'stroke-dasharray="5 5"')+arrow(o,h,C.c,7)+arrow(o,a,C.a,4)+arc(o,53,Math.atan2(3,-2),Math.atan2(-5,2)+2*Math.PI)+label(213,205,'\\theta>90^\\circ',C.p,28)+label(125,65,V('b')+'=(-2,3)',C.muted,29)+label(280,313,V('a')+'=(2,-5)',C.a,29)+label(435,255,V('c'),C.c,33)+label(325,147,'O',C.ink,25),'Actual vectors a=(2,-5), b=(-2,3). The projection points opposite to b.',620,430);
 }
 if(kind==='application'||kind==='triangle'){
  const A=[90,320],B=[630,320],H=[360,320],P=[360,65],tri=kind==='triangle';
  let s=path(A,B,C.rule,2)+arrow(A,P,C.a,5)+arrow(A,H,C.c,7)+arrow(H,P,C.p,5)+right(H);
  if(tri)s+=path(P,B,C.rule,2)+label(95,370,'A(1,1,1)',C.ink,29)+label(615,370,'B(5,5,3)',C.ink,29)+label(360,25,'C(4,1,4)',C.ink,29)+label(410,195,'h',C.p,30);
  else s+=label(75,365,'A',C.ink,30)+label(365,28,'P',C.ink,30)+label(220,370,'\\overrightarrow{AH}',C.c,32)+label(410,190,'\\overrightarrow{HP}',C.p,32)+label(180,180,'\\overrightarrow{AP}',C.a,32);
  s+=label(375,363,'H',C.ink,29)+[A,H,P].map(p=>circle(p)).join('');
  return svg(s,tri?'Triangle ABC with H the foot of the perpendicular from C to AB.':'Vector AP is the sum of AH along the line and HP perpendicular to the line.');
 }
 if(kind==='distance'){
  const p=[350,65],h=[350,325];let s=path([40,325],[670,325],C.ink,3);
  for(const [x,n]of[[80,'A'],[200,'B'],[490,'C'],[610,'D']])s+=path(p,[x,325],C.rule,2)+label(x,365,n,C.muted,27);
  s+=path(p,h,C.p,5)+right(h)+label(380,190,'d',C.p,35)+label(350,25,'P',C.ink,32)+label(350,365,'H',C.ink,30)+label(675,303,'\\ell',C.ink,30);
  return svg(s,'The perpendicular PH is shorter than every sloping segment from P to the line.');
 }
 if(kind==='line'){
  const o=[100,340],p=[180,100],h=[260,260];
  let s=arrow([50,340],[585,340],C.rule,2)+arrow([100,380],[100,35],C.rule,2)+path(o,[555,112.5],C.ink,3)+arrow(o,p,C.a,4)+arrow(o,h,C.c,6)+arrow(h,p,C.p,4);
  // Orthogonal unit directions along the line and towards P.
  s+='<path d="M245.69 267.16 L238.53 252.85 L252.84 245.69" fill="none" stroke="'+C.muted+'" stroke-width="2"/>';
  s+=label(590,365,'x',C.muted,29)+label(75,35,'y',C.muted,29)+label(80,367,'O',C.ink,27)+label(195,65,'P(1,3)',C.a,29)+label(280,285,'H',C.ink,29)+label(475,95,'\\ell:\\ y=\\tfrac12x',C.ink,28)+circle(p)+circle(h);
  return svg(s,'The line y=x/2, P=(1,3), and perpendicular foot H=(2,1), drawn to scale.',640,420);
 }
 return '';
}
function initInteractive(el){
 const math=window.MathsLesson.math;
 el.innerHTML=`<div class="pr-controls"><label>Angle ${math('\\theta')} <input type="range" min="0" max="180" step="1" value="60" aria-label="Angle in degrees"><output class="pr-angle"></output></label><label>Length ${math('|'+V('a')+'|')} <input type="range" min="1" max="5" step="0.5" value="4" aria-label="Length of vector a"><output class="pr-length"></output></label></div><div class="pr-preset-row"><button data-preset="0">0°</button><button data-preset="90">90°</button><button data-preset="120">120°</button><button data-preset="180">180°</button><button class="pr-reset">Reset</button></div><div class="pr-live-figure"></div><div class="pr-reveal-controls"><button data-part="drop" aria-pressed="false">Show perpendicular drop</button><button data-part="parallel" aria-pressed="false">Show parallel component</button><button data-part="perp" aria-pressed="false">Show perpendicular component</button></div><div class="pr-result" aria-live="polite"></div>`;
 const angle=el.querySelector('[aria-label="Angle in degrees"]'),length=el.querySelector('[aria-label="Length of vector a"]');
 const state={drop:false,parallel:false,perp:false};
 const update=()=>{const theta=Number(angle.value),len=Number(length.value),value=theta===90?0:len*Math.cos(theta*Math.PI/180);el.querySelector('.pr-angle').textContent=theta+'°';el.querySelector('.pr-length').textContent=String(len);el.querySelector('.pr-live-figure').innerHTML=projection({theta,length:len,...state,numeric:true});el.dataset.theta=theta;el.dataset.scalar=String(value);el.querySelector('.pr-result').innerHTML=state.parallel?`Scalar projection ${math('=|'+V('a')+'|\\cos\\theta'+(Math.abs(value-Number(value.toFixed(2)))<1e-9?'=':'\\approx')+Number(value.toFixed(2)))} <span class="pr-sign">${value>0?'along the chosen direction':value<0?'opposite the chosen direction':'zero parallel component'}</span>`:'';};
 angle.addEventListener('input',update);length.addEventListener('input',update);
 el.querySelectorAll('[data-preset]').forEach(button=>button.addEventListener('click',()=>{angle.value=button.dataset.preset;update();}));
 el.querySelectorAll('[data-part]').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.part;state[key]=!state[key];button.setAttribute('aria-pressed',String(state[key]));button.textContent=button.textContent.replace(/^(Show|Hide)/,state[key]?'Hide':'Show');update();}));
 el.querySelector('.pr-reset').addEventListener('click',()=>{angle.value=60;length.value=4;Object.keys(state).forEach(k=>state[k]=false);el.querySelectorAll('[data-part]').forEach(button=>{button.setAttribute('aria-pressed','false');button.textContent=button.textContent.replace(/^Hide/,'Show');});update();});
 update();
}
function sync(){const slide=document.getElementById('iv7-decompose');if(!slide)return;const el=slide.querySelector('[data-projection="decompose"]');if(el)el.dataset.stage=String([...slide.querySelectorAll('[data-projection-stage].visible')].reduce((n,x)=>Math.max(n,Number(x.dataset.projectionStage)),0));}
function init(){if(!window.MathsLesson||!window.VectorDiagramMath?.ready){setTimeout(init,30);return;}document.querySelectorAll('[data-projection]:not([data-projection-ready])').forEach(el=>{el.dataset.projectionReady='true';if(el.dataset.projection==='interactive')initInteractive(el);else el.innerHTML=draw(el.dataset.projection);});window.MathsLesson.typeset(document);sync();if(window.Reveal)['ready','fragmentshown','fragmenthidden','slidechanged'].forEach(e=>window.Reveal.on(e,sync));}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
