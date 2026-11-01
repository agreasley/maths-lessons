/* Lesson 6: native SVG geometry and a Reveal-controlled collinearity animation. */
(()=>{'use strict';
const C={ink:'#152e3b',teal:'#007f78',blue:'#3b66a8',orange:'#b55224',muted:'#607078'};
const V=s=>'\\underset{\\sim}{'+s+'}';
const label=(x,y,t,c=C.ink,size=25)=>window.VectorDiagramMath.label(x,y,t,c,size);
const line=(p,q,c=C.ink,w=3)=>`<path d="M${p.join(' ')} L${q.join(' ')}" stroke="${c}" stroke-width="${w}" fill="none"/>`;
const arrow=(p,q,c=C.teal,w=4)=>{const dx=q[0]-p[0],dy=q[1]-p[1],l=Math.hypot(dx,dy),u=dx/l,v=dy/l,h=13,k=6;return line(p,[q[0]-u*h*.7,q[1]-v*h*.7],c,w)+`<path d="M${q.join(' ')} L${[q[0]-u*h-v*k,q[1]-v*h+u*k].join(' ')} L${[q[0]-u*h+v*k,q[1]-v*h-u*k].join(' ')} Z" fill="${c}"/>`;};
const arc=(o,r,s,e,c=C.orange)=>{const p=t=>[o[0]+r*Math.cos(t),o[1]-r*Math.sin(t)];return `<path d="M${p(s).join(' ')} A${r} ${r} 0 0 0 ${p(e).join(' ')}" stroke="${c}" stroke-width="2.5" fill="none"/>`;};
const svg=(body,desc,w=560,h=320)=>`<svg class="a-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${desc}"><title>${desc}</title>${body}</svg>`;
function draw(kind){
 if(kind==='cover'||kind==='angle'){const dark=kind==='cover',a=dark?'#8cddd0':C.teal,b=dark?'#9ebff0':C.blue,c=dark?'#e9b78e':C.orange,o=[95,265];return svg(arrow(o,[480,265],a)+arrow(o,[270,45],b)+arc(o,60,0,Math.atan2(220,175),c)+label(310,305,V('a'),a,31)+label(140,140,V('b'),b,31)+label(185,224,'\\theta',c,30),'Two vectors with a common tail and angle theta.');}
 if(kind==='unit'){let s='';for(const [ox,scale,hat] of [[65,1,false],[340,.5,true]]){const o=[ox,240],t=Math.PI/3;s+=arrow(o,[ox+(hat?90:150),240],C.teal)+arrow(o,[ox+(hat?90:190)*Math.cos(t),240-(hat?90:190)*Math.sin(t)],C.blue)+arc(o,28,0,t)+label(ox+45,210,'\\theta',C.orange,23)+label(ox+(hat?45:85),274,hat?'\\hat{'+V('a')+'}':V('a'),C.teal,26)+label(ox+12,hat?162:110,hat?'\\hat{'+V('b')+'}':V('b'),C.blue,26);if(hat)s+=label(ox+45,310,'|\\hat{'+V('a')+'}|=|\\hat{'+V('b')+'}|=1',C.ink,21);}return svg(s,'Normalising both vectors preserves their directions and the angle. Both unit vectors have length one.',560,335);}
 if(kind==='perpendicular')return svg(arrow([120,250],[470,250])+arrow([120,250],[120,50],C.blue)+'<path d="M120 222h28v28" fill="none" stroke="'+C.orange+'" stroke-width="3"/>'+label(300,290,V('a'),C.teal,31)+label(80,140,V('b'),C.blue,31)+label(220,180,'90^\\circ',C.orange,31),'Two non-zero perpendicular vectors.');
 if(kind==='same')return svg(arrow([75,85],[480,85],C.teal,6)+arrow([75,85],[290,85],C.blue,4)+label(385,50,V('a'),C.teal,28)+label(180,122,V('b'),C.blue,28),'Parallel vectors in the same direction.',560,145);
 if(kind==='opposite')return svg(arrow([280,85],[490,85])+arrow([280,85],[70,85],C.blue)+label(395,50,V('a'),C.teal,28)+label(160,122,V('b'),C.blue,28),'Parallel vectors in opposite directions.',560,145);
 if(kind==='turns'){const o=[260,235],v=[440,175],u=[200,55],w=[320,415],t=Math.atan2(60,180);return svg(arrow(o,v)+arrow(o,u,C.blue)+arrow(o,w,C.orange)+arc(o,40,t,t+Math.PI/2,C.blue)+arc(o,55,t-Math.PI/2,t,C.orange)+label(420,140,V('v')+'=(a,b)',C.teal,38)+label(175,24,V('u')+'=(-b,a)',C.blue,38)+label(355,450,V('w')+'=(b,-a)',C.orange,38)+label(304,173,'90^\\circ',C.blue,23)+label(340,274,'90^\\circ',C.orange,23),'The vectors (a,b), (-b,a) and (b,-a) have equal lengths. The latter two are quarter turns in opposite directions.',580,480);}
 if(kind==='triangle'){const point=(x,y)=>[95+(x+1)*34,320-(y-4)*34],P=point(7,10),Q=point(3,12),R=point(-1,4),S=point(3,7);return svg(line(P,Q,C.teal)+line(Q,R,C.teal)+line(R,P,C.teal)+line(Q,S,C.blue)+[P,Q,R,S].map(t=>`<circle cx="${t[0]}" cy="${t[1]}" r="5" fill="${C.ink}"/>`).join('')+label(P[0]+35,P[1]+4,'P')+label(Q[0],Q[1]-25,'Q')+label(R[0]-30,R[1]+8,'R')+label(S[0]+30,S[1]+8,'S'),'Triangle PQR with S the midpoint of PR, drawn to the given coordinates.',470,360);}
 if(kind==='collinear'){
  const A=[110,270],B=[480,170],D=[850,70];
  const animatedArrow=(p,q,c,w)=>{
   const dx=q[0]-p[0],dy=q[1]-p[1],length=Math.hypot(dx,dy),u=dx/length,v=dy/length,h=22,k=10;
   const shaft=line(p,[q[0]-u*h*.65,q[1]-v*h*.65],c,w).replace('<path','<path class="a-draw-stroke" pathLength="1"');
   return shaft+`<path d="M${q.join(' ')} L${[q[0]-u*h-v*k,q[1]-v*h+u*k].join(' ')} L${[q[0]-u*h+v*k,q[1]-v*h-u*k].join(' ')} Z" fill="${c}"/>`;
  };
  const straight='<g class="a-collinear-line"><path class="a-draw-stroke" pathLength="1" d="M55 284.865 L905 55.135" fill="none" stroke="'+C.orange+'" stroke-width="14" opacity=".25"/></g>';
  const vectors='<g class="a-collinear-vectors"><g>'+animatedArrow(A,D,C.blue,6)+'</g><g>'+animatedArrow(A,B,C.teal,4)+'</g><g class="a-vector-labels">'+label(270,182,'\\overrightarrow{AB}',C.teal,34)+label(650,90,'\\overrightarrow{AC}',C.blue,34)+'</g></g>';
  const shared='<circle class="a-collinear-shared" cx="110" cy="270" r="17" fill="none" stroke="'+C.orange+'" stroke-width="4"/>';
  const points=[A,B,D].map(t=>`<circle cx="${t[0]}" cy="${t[1]}" r="6" fill="${C.ink}"/>`).join('');
  return svg(straight+vectors+shared+points+label(100,315,'A',C.ink,34)+label(480,215,'B',C.ink,34)+label(860,115,'C',C.ink,34),'Three labelled points. Reveal vectors AB and AC, then their common straight line.',960,355);
 }
 return '';
}
function syncCollinear(){
 const slide=document.getElementById('iv6-collinear');if(!slide)return;
 const diagram=slide.querySelector('[data-angles="collinear"]');if(!diagram)return;
 const visible=[...slide.querySelectorAll('[data-collinear-stage].visible')];
 diagram.dataset.stage=String(visible.reduce((stage,el)=>Math.max(stage,Number(el.dataset.collinearStage)),0));
}
function init(){if(!window.MathsLesson||!window.VectorDiagramMath?.ready){setTimeout(init,30);return;}document.querySelectorAll('[data-angles]:not([data-angles-ready])').forEach(el=>{el.dataset.anglesReady='true';el.innerHTML=draw(el.dataset.angles);});window.MathsLesson.typeset(document);syncCollinear();if(window.Reveal){['ready','fragmentshown','fragmenthidden','slidechanged'].forEach(event=>window.Reveal.on(event,syncCollinear));}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
