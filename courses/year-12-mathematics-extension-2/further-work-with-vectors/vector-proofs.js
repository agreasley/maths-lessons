/* Lesson 2: native SVG diagrams, stepped constructions and Cauchy–Schwarz. */
(() => {
  'use strict';
  const C={ink:'#152e3b',muted:'#7c8e93',a:'#217864',b:'#ad6e32',c:'#315985',purple:'#80579a'};
  const v=x=>`\\underset{\\sim}{${x}}`;
  const add=(a,b)=>a.map((x,i)=>x+b[i]), sub=(a,b)=>a.map((x,i)=>x-b[i]), mul=(a,k)=>a.map(x=>x*k), mid=(a,b)=>mul(add(a,b),.5);
  const norm=a=>Math.hypot(...a), dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
  window.MathJax.startup.promise.then(()=>{
    const M=window.VectorDiagramMath, {math}=window.MathsLesson;
    let uid=0;
    function figure(build) {
      const id=`proof-${uid++}`, parts=[];
      let animateLines=false;
      const colours=Object.values(C);
      const defs=colours.map((colour,i)=>`<marker id="${id}-${i}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="${colour}"/></marker>`).join('');
      const line=(P,Q,colour=C.ink,arrow=false,dash=false,width=2.5)=>{
        const from=`M${P.join(' ')}L${P.join(' ')}`,to=`M${P.join(' ')}L${Q.join(' ')}`;
        parts.push(`<path d="${to}" fill="none" stroke="${colour}" stroke-width="${width}" ${dash?'stroke-dasharray="6 5"':''} ${arrow?`marker-end="url(#${id}-${colours.indexOf(colour)})"`:''}>${animateLines?`<animate attributeName="d" from="${from}" to="${to}" dur="0.55s" fill="freeze"/>`:''}</path>`);
      };
      const poly=(pts,colour=C.ink)=>{for(let i=0;i<pts.length;i++)line(pts[i],pts[(i+1)%pts.length],colour);};
      const label=(P,tex,colour=C.ink,size=24)=>parts.push(M.label(P[0],P[1],tex,colour,size));
      const point=(P,name,offset=[0,-18])=>{parts.push(`<circle cx="${P[0]}" cy="${P[1]}" r="3.5" fill="${C.ink}"/>`);if(name)label(add(P,offset),name);};
      const right=(P,U,V)=>{const u=mul(sub(U,P),12/norm(sub(U,P))),w=mul(sub(V,P),12/norm(sub(V,P)));line(add(P,u),add(add(P,u),w),C.muted);line(add(add(P,u),w),add(P,w),C.muted);};
      const path=(d,colour=C.ink,fill='none')=>parts.push(`<path d="${d}" fill="${fill}" stroke="${colour}" stroke-width="2.5"/>`);
      const group=(animate,draw)=>{const previous=animateLines;animateLines=animate;draw();animateLines=previous;};
      const face=(pts,fill)=>parts.push(`<polygon points="${pts.map(P=>P.join(',')).join(' ')}" fill="${fill}"/>`);
      build({line,poly,label,point,right,path,group,face});
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 340" aria-hidden="true"><defs>${defs}</defs>${parts.join('')}</svg>`;
    }
    function triangle(key,F) {
      const {line,poly,label,point,right,path}=F;
      const A=[65,270],B=[460,270],D=[245,45],midBC=mid(B,D),d=sub(D,B),h=sub(sub(B,A),mul(d,dot(sub(B,A),d)/dot(d,d))),H=add(A,h);
      poly([A,B,D],C.muted);point(A,'A',[-14,16]);point(B,'B',[14,16]);point(D,'C',[0,-20]);
      if(key==='median') {line(A,B,C.a,true);line(A,D,C.b,true);line(A,midBC,C.c,true);point(midBC,'M',[20,0]);label([250,307],v('a'),C.a);label([126,135],v('b'),C.b);}
      if(key==='altitude'||key==='altitude-components'){line(A,B,C.a,true);line(A,H,C.c,true);point(H,'H',[17,-7]);right(H,A,B);if(key==='altitude-components'){line(H,B,C.b,true);label([270,308],v('a'),C.a);label([85,175],'\\overrightarrow{AH}',C.c);label([420,150],'\\overrightarrow{HB}',C.b);}}
      if(key==='perp-bisector'){line(A,H,C.c,false,true);point(H,'H',[16,-8]);const u=mul(h,170/norm(h));line(sub(midBC,u),add(midBC,u),C.purple);point(midBC,'M',[18,6]);right(midBC,add(midBC,u),B);label([470,65],'\\ell',C.purple);}
      if(key==='angle-bisector'||key==='unit-bisector'){
        const av=sub(B,A),bv=sub(D,A),u=mul(av,120/norm(av)),w=mul(bv,120/norm(bv));
        const E=add(A,u),G=add(A,w),W=add(E,w),T=mul(add(mul(B,norm(bv)),mul(D,norm(av))),1/(norm(av)+norm(bv)));
        line(A,T,C.c,true);point(T,'D',[18,-2]);
        if(key==='unit-bisector'){line(A,E,C.a,true);line(A,G,C.b,true);line(E,W,C.muted,false,true);line(G,W,C.muted,false,true);label(add(mid(A,E),[0,25]),`\\widehat{${v('a')}}`,C.a);label(add(mid(A,G),[-25,0]),`\\widehat{${v('b')}}`,C.b);}
        else {const ang=Math.atan2(T[1]-A[1],T[0]-A[0]),ang2=Math.atan2(D[1]-A[1],D[0]-A[0]);const arc=(t0,t1,r)=>path(`M${A[0]+r*Math.cos(t0)} ${A[1]+r*Math.sin(t0)} A${r} ${r} 0 0 0 ${A[0]+r*Math.cos(t1)} ${A[1]+r*Math.sin(t1)}`,C.c);arc(0,ang,50);arc(ang,ang2,55);label([134,252],'\\theta',C.c,19);label([115,214],'\\theta',C.c,19);}
      }
    }
    const builders={
      'centroid':F=>medianDiagram(F,true), 'median-example':F=>medianDiagram(F,false),
      'orthocentre-acute':F=>orthocentreDiagram(F,'acute'),
      'orthocentre-right':F=>orthocentreDiagram(F,'right'),
      'orthocentre-obtuse':F=>orthocentreDiagram(F,'obtuse'),
      'trapezium-triangles':({poly,line,point,label})=>{const O=[45,270],A=[145,96.795],B=[245,270],D=[445,270],Cpt=[345,96.795],Mpt=mid(Cpt,D);poly([O,A,Cpt,D]);line(A,B);line(B,Cpt);line(B,Mpt,C.c);line(O,A,C.a,true);line(O,B,C.b,true);[[O,'O',[-16,15]],[A,'A',[0,-20]],[B,'B',[0,20]],[Cpt,'C',[0,-20]],[D,'D',[16,15]],[Mpt,'M',[20,-3]]].forEach(([P,n,o])=>point(P,n,o));label([75,175],v('a'),C.a);label([135,305],v('b'),C.b);},
      'rhombus-coordinates':F=>rhombus(F,false), 'rhombus-vectors':F=>rhombus(F,true),
      'midpoint-triangle':({poly,line,point})=>{const O=[90,55],A=[60,270],B=[460,270],Mpt=mid(O,A),N=mid(O,B);poly([O,A,B]);line(Mpt,N,C.c,true);[[O,'O',[0,-20]],[A,'A',[-12,18]],[B,'B',[12,18]],[Mpt,'M',[-20,0]],[N,'N',[15,-15]]].forEach(([P,n,o])=>point(P,n,o));},
      'square-properties':F=>squareDiagram(F,true), 'square-proof':F=>squareDiagram(F,false),
      'pyramid':({line,point,face})=>{
        const A=[230,35],B=[65,255],Cpt=[355,295],D=[440,140],L=mid(A,B),Mpt=mid(A,Cpt),N=mid(A,D),P=mid(Cpt,D),Q=mid(B,D),R=mid(B,Cpt);
        face([A,B,Cpt],'#e6efeb');face([A,Cpt,D],'#dde7ee');
        line(B,D,C.muted,false,true,2);line(B,Cpt);line(Cpt,D);
        line(A,B,C.a,true);line(A,Cpt,C.b,true);line(A,D,C.c,true);
        line(L,P,C.purple,true,false,3);
        [[A,'A',[0,-19]],[B,'B',[-16,8]],[Cpt,'C',[10,23]],[D,'D',[18,0]],[L,'L',[-18,-4]],[Mpt,'M',[-18,-5]],[N,'N',[0,-20]],[P,'P',[20,0]],[Q,'Q',[-3,22]],[R,'R',[0,23]]].forEach(([pt,n,o])=>point(pt,n,o));
      },
      'parallelogram-midpoints':F=>paraDiagram(F,'midpoints'), 'parallelogram-extended':F=>paraDiagram(F,'extended'), 'parallelogram-centre':F=>paraDiagram(F,'centre'), 'parallelogram-law':F=>paraDiagram(F,'law'),
      'ratio-triangle':({poly,line,point})=>{const O=[70,275],A=[170,50],B=[465,275],P=mid(O,A),Q=mid(O,B),X=add(P,mul(sub(B,P),1/3));poly([O,A,B]);line(P,B,C.muted);line(Q,A,C.c);[[O,'O',[-15,15]],[A,'A',[0,-18]],[B,'B',[15,15]],[P,'P',[-20,0]],[Q,'Q',[0,22]],[X,'X',[20,2]]].forEach(([pt,n,o])=>point(pt,n,o));},
      'midpoint-parallelogram':F=>midpointPara(F,false), 'midpoint-parallelogram-n':F=>midpointPara(F,true),
      'pythagoras':({line,point,label,right})=>{const A=[70,70],B=[430,275],Cpt=[70,275];line(A,Cpt,C.c,true);line(Cpt,B,C.b,true);line(A,B);right(Cpt,A,B);point(A,'A',[-15,-15]);point(B,'B',[15,15]);point(Cpt,'C',[-15,15]);label([35,175],v('c'),C.c);label([260,310],v('b'),C.b);},
      'semicircle':({path,line,point,label,right})=>{const O=[260,275],A=[60,275],B=[460,275],theta=55*Math.PI/180,Cpt=[260+200*Math.cos(theta),275-200*Math.sin(theta)];path('M60 275A200 200 0 0 1 460 275');line(A,B);line(A,Cpt);line(B,Cpt);line(O,A,C.a,true);line(O,B,C.b,true);line(O,Cpt,C.c,true);point(A,'A',[-14,18]);point(B,'B',[14,18]);point(O,'O',[0,25]);point(Cpt,'C',[10,-20]);label([155,305],v('a'),C.a);label([365,305],v('b'),C.b);label([290,175],v('c'),C.c);},
      'trapezium-diagonals':({poly,line,point,label})=>{const A=[65,270],B=[165,100],Cpt=[355,100],D=[455,270];poly([A,B,Cpt,D]);line(A,Cpt,C.c);line(B,D,C.purple);[[A,'A',[-15,10]],[B,'B',[-10,-20]],[Cpt,'C',[10,-20]],[D,'D',[15,10]]].forEach(([P,n,o])=>point(P,n,o));label([260,320],'\\text{NOT TO SCALE}',C.muted,19);}
    };
    function squareDiagram({line,poly,point,right,label},properties){
      const A=[140,275],B=[380,275],Cpt=[380,35],D=[140,35],O=mid(A,Cpt);
      poly([A,B,Cpt,D]);
      if(properties){
        line(A,Cpt,C.c);line(B,D,C.purple);point(O,'O',[0,24]);
        [[A,B,D],[B,A,Cpt],[Cpt,B,D],[D,A,Cpt]].forEach(([P,U,V])=>right(P,U,V));
        [[A,B],[B,Cpt],[Cpt,D],[D,A]].forEach(([P,Q])=>{const m=mid(P,Q),d=sub(Q,P),n=mul([-d[1],d[0]],6/norm(d));line(sub(m,n),add(m,n),C.a);});
        label([260,312],'s',C.a);
      }else{
        line(A,B,C.a,true);line(A,D,C.b,true);
        label([260,312],v('a'),C.a);label([110,155],v('b'),C.b);
      }
      [[A,'A',[-16,16]],[B,'B',[16,16]],[Cpt,'C',[16,-12]],[D,'D',[-16,-12]]].forEach(([P,n,o])=>point(P,n,o));
    }
    function medianDiagram({poly,line,point,label},centre){
      const A=[175,45],B=[55,275],Cpt=[455,275],D=mid(B,Cpt),E=mid(Cpt,A),F=mid(A,B),G=mul(add(add(A,B),Cpt),1/3);
      poly([A,B,Cpt]);line(A,D,C.c);line(B,E,C.purple);line(Cpt,F,centre?C.a:C.muted);[[A,'A',[0,-20]],[B,'B',[-15,12]],[Cpt,'C',[15,12]],[D,'D',[0,22]],[E,'E',[20,-4]],[F,'F',[-20,-4]],[G,centre?'G':'M',centre?[36,34]:[22,-7]]].forEach(([P,n,o])=>point(P,n,o));
      if(!centre){line(A,B,C.a,true);line(A,Cpt,C.b,true);label([80,155],v('a'),C.a);label([345,135],v('b'),C.b);}else{label([176,130],'2k',C.c);label([226,239],'k',C.c);}
    }
    function orthocentreDiagram({poly,line,point,label,right},kind){
      const vertices=kind==='right'?[[100,50],[100,290],[440,290]]:
        [[235,kind==='acute'?50:145],[90,290],[450,290]];
      const [A,B,Cpt]=vertices,d1=sub(Cpt,B),d2=sub(A,Cpt);
      const q1=dot(A,d1),q2=dot(B,d2),det=d1[0]*d2[1]-d1[1]*d2[0];
      const H=[(q1*d2[1]-d1[1]*q2)/det,(d1[0]*q2-q1*d2[0])/det];
      const feet=vertices.map((P,i)=>{
        const U=vertices[(i+1)%3],V=vertices[(i+2)%3],side=sub(V,U);
        const t=dot(sub(P,U),side)/dot(side,side),foot=add(U,mul(side,t));
        if(t<0)line(foot,U,C.muted,false,true,2);
        if(t>1)line(V,foot,C.muted,false,true,2);
        return {P,U,V,foot};
      });
      poly(vertices);
      feet.forEach(({P,U,V,foot},i)=>{
        const colour=[C.c,C.a,C.b][i],alt=sub(foot,P),t=dot(sub(H,P),alt)/dot(alt,alt);
        line(P,foot,colour,false,false,3.5);
        if(t>1+1e-9)line(foot,H,colour,false,true,3.5);
        if(t< -1e-9)line(P,H,colour,false,true,3.5);
        // At a right-angle vertex, choose the other endpoint to avoid a zero direction.
        if(!(kind==='right'&&i===2))right(foot,P,norm(sub(U,foot))>1e-9?U:V);
      });
      vertices.forEach((P,i)=>{
        point(P);
        const name=kind==='right'&&i===1?'B=H':['A','B','C'][i];
        const offset=i===0?(kind==='obtuse'?[-28,9]:[0,-23]):(kind==='right'&&i===1?[0,27]:(i===1?[-22,15]:[22,15]));
        label(add(P,offset),name,C.ink,29);
      });
      if(kind!=='right'){point(H);label(add(H,kind==='acute'?[45,0]:[25,-14]),'H',C.ink,30);}
    }
    function rhombus({poly,line,point,label},vectors){const O=[110,280],A=[110,120],Cpt=[248.564,200],B=[248.564,40];poly([O,A,B,Cpt]);line(O,B,C.c);line(A,Cpt,C.purple);point(O,vectors?'O':'O(0,0)',[-15,25]);point(A,vectors?'A':'A(0,a)',[-30,-18]);point(B,'B',[15,-18]);point(Cpt,'C',[20,8]);if(vectors){line(O,A,C.a,true);line(O,Cpt,C.b,true);label([75,200],v('a'),C.a);label([200,267],v('c'),C.b);}}
    function paraDiagram({poly,line,point,label},kind){
      let A=[70,280],B=[365,280],D=[150,140],Cpt=add(B,sub(D,A));
      if(kind==='extended'){A=[60,300];B=[350,300];D=[145,175];Cpt=add(B,sub(D,A));}
      const E=mid(A,Cpt),Mpt=mid(D,Cpt);poly([A,B,Cpt,D]);line(A,Cpt,C.c);line(B,D,C.purple);
      const names=kind==='centre'?['O','P','Q','R']:['A','B','C','D'];[[A,names[0],[-15,12]],[B,names[1],[15,12]],[Cpt,names[2],[16,-6]],[D,names[3],[-15,-10]]].forEach(([P,n,o])=>point(P,n,o));
      if(kind==='midpoints'||kind==='extended'){point(E,'E',[15,15]);point(Mpt,'M',[0,-20]);line(A,B,C.a,true);line(A,D,C.b,true);label(add(mid(A,B),[0,28]),v('p'),C.a);label(add(mid(A,D),[-25,0]),v('q'),C.b);}
      if(kind==='extended'){const N=add(D,sub(D,A));line(D,N,C.muted,false,true);line(N,B,C.c);point(N,'N',[-10,-18]);}
      if(kind==='centre'){point(E,'M',[0,22]);label(add(mid(A,B),[0,28]),'2'+v('p'),C.a);label(add(mid(A,D),[-25,0]),'2'+v('r'),C.b);}
      if(kind==='law'){line(A,B,C.a,true);line(A,D,C.b,true);label(add(mid(A,B),[0,28]),v('a'),C.a);label(add(mid(A,D),[-25,0]),v('b'),C.b);}
    }
    function midpointPara({poly,line,point},showN){const O=[60,280],A=[160,50],B=[460,280],Mpt=mid(O,A),Q=mid(A,B),N=mid(O,B);poly([O,A,B]);[[O,'O',[-14,15]],[A,'A',[0,-18]],[B,'B',[14,15]],[Mpt,'M',[-20,0]],[Q,'Q',[18,-8]]].forEach(([P,n,o])=>point(P,n,o));if(showN){point(N,'N',[0,23]);poly([Mpt,N,Q,A],C.c);}}
    document.querySelectorAll('[data-proof-diagram]').forEach(el=>{const key=el.dataset.proofDiagram;el.innerHTML=figure(F=>builders[key]?builders[key](F):triangle(key,F));});
    document.querySelectorAll('[data-vector-construction]').forEach(el=>{
      const kind=el.dataset.vectorConstruction, steps=[...el.querySelectorAll('.construction-steps>li')];
      const diagram=el.querySelector('.construction-diagram'),controls=el.querySelector('.construction-controls');
      controls.innerHTML='<button type="button" data-construction-action="back">Previous step</button><button type="button" data-construction-action="next">Next step</button><button type="button" data-construction-action="reset">Reset construction</button><output aria-live="polite" aria-atomic="true"></output>';
      const back=controls.querySelector('[data-construction-action="back"]'),next=controls.querySelector('[data-construction-action="next"]'),reset=controls.querySelector('[data-construction-action="reset"]');
      let step=0;
      const draw=(forward=false)=>{
        el.dataset.step=String(step);
        steps.forEach((row,i)=>{row.hidden=i>=step;row.classList.toggle('is-current',i===step-1);row.classList.toggle('construction-new',forward&&i===step-1);});
        back.disabled=step===0;next.disabled=step===steps.length;reset.disabled=step===0;
        controls.querySelector('output').textContent=`Step ${step} of ${steps.length}${step===0?' · '+el.dataset.initialText:''}`;
        diagram.setAttribute('aria-label',`Triangle ABC, a = AB and b = AC. ${step?steps[step-1].dataset.stepText:el.dataset.initialText}`);
        const animate=forward&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        diagram.innerHTML=figure(F=>{
          const {line,poly,label,point,right,path,group}=F;
          const A=[65,270],B=[460,270],Cpt=[245,45],Mpt=mid(B,Cpt),a=sub(B,A),b=sub(Cpt,A),d=sub(Cpt,B);
          const h=sub(a,mul(d,dot(a,d)/dot(d,d))),H=add(A,h);
          const stage=(n,fn)=>{if(step>=n)group(animate&&step===n,fn);};
          const arrow=(P,Q,colour)=>line(P,Q,colour,true,false,3.5);
          const ticks=()=>{const t=mul(h,6/norm(h));[mid(Cpt,Mpt),mid(Mpt,B)].forEach(P=>line(sub(P,t),add(P,t),C.purple));};
          poly([A,B,Cpt],C.muted);
          const reverseSide=(kind==='median'||kind==='perp')&&step===1;
          arrow(A,B,C.a);if(!reverseSide)arrow(A,Cpt,C.b);
          label([250,307],v('a'),C.a);label([126,135],(reverseSide?'-':'')+v('b'),C.b);
          point(A,'A',[-14,16]);point(B,'B',[14,16]);point(Cpt,'C',[0,-20]);
          if(kind==='median'||kind==='perp'){
            stage(1,()=>{
              if(step===1){arrow(Cpt,A,C.b);arrow(A,B,C.a);}
              if(kind!=='perp'||step<5)arrow(Cpt,B,C.purple);
              if(step<3)label([402,122],`${v('a')}-${v('b')}`,C.purple,22);
            });
            stage(2,()=>{if(kind!=='perp'||step<5)arrow(Cpt,Mpt,C.purple);ticks();point(Mpt,'M',[23,1]);});
            stage(3,()=>{if(kind==='perp'&&step===5){line(A,Mpt,C.c,false,true);}else{arrow(A,Cpt,C.b);arrow(Cpt,Mpt,C.purple);arrow(A,Mpt,C.c);}});
            if(kind==='median'){
              stage(5,()=>{arrow(A,Mpt,C.c);label([242,249],`\\tfrac12(${v('a')}+${v('b')})`,C.c,22);});
            }else{
              stage(4,()=>{arrow(A,H,C.c);point(H,'H',[7,-21]);right(H,A,B);label([125,184],v('h'),C.c);});
              stage(5,()=>{const u=mul(h,125/norm(h));line(sub(Mpt,u),add(Mpt,u),C.purple,false,false,3.5);right(Mpt,add(Mpt,u),B);label([468,57],'\\ell',C.purple);});
            }
          }else if(kind==='altitude'){
            stage(1,()=>{if(step===1){arrow(B,Cpt,C.purple);label([405,120],v('d'),C.purple);}});
            stage(2,()=>{arrow(H,B,C.purple);label([412,151],v('p'),C.purple);});
            stage(3,()=>{point(H,'H',[8,-21]);arrow(A,H,C.c);label([85,175],'\\overrightarrow{AH}',C.c);});
            stage(4,()=>right(H,A,B));
          }else if(kind==='angle'){
            const u=mul(a,120/norm(a)),vb=mul(b,120/norm(b)),U=add(A,u),V=add(A,vb),W=add(U,vb);
            const D=mul(add(mul(B,norm(b)),mul(Cpt,norm(a))),1/(norm(a)+norm(b)));
            stage(1,()=>{arrow(A,U,C.a);point(U);label(add(mid(A,U),[0,25]),v('u'),C.a);});
            stage(2,()=>{arrow(A,V,C.b);point(V);label(add(mid(A,V),[-25,0]),v('v'),C.b);});
            stage(3,()=>{arrow(U,W,C.b);line(V,W,C.a,true,true);arrow(A,W,C.c);point(W);label(add(W,[32,18]),`${v('u')}+${v('v')}`,C.c,20);});
            stage(4,()=>{
              line(W,D,C.c,true,false,3.5);point(D,'D',[21,0]);
              const ang=Math.atan2(D[1]-A[1],D[0]-A[0]),ang2=Math.atan2(b[1],b[0]);
              const arc=(t0,t1,r)=>path(`M${A[0]+r*Math.cos(t0)} ${A[1]+r*Math.sin(t0)} A${r} ${r} 0 0 0 ${A[0]+r*Math.cos(t1)} ${A[1]+r*Math.sin(t1)}`,C.c);
              arc(0,ang,42);arc(ang,ang2,46);
              label([127,256],'\\theta',C.c,18);label([109,215],'\\theta',C.c,18);
            });
          }
        });
        // Keep snapshots and later visits at the completed geometry, without replaying SMIL.
        const svg=diagram.querySelector('svg');
        if(animate)window.setTimeout(()=>svg.querySelectorAll('animate').forEach(node=>node.remove()),600);
      };
      back.addEventListener('click',()=>{step=Math.max(0,step-1);draw();});
      next.addEventListener('click',()=>{step=Math.min(steps.length,step+1);draw(true);});
      reset.addEventListener('click',()=>{step=0;draw();});
      draw();
    });
    document.querySelectorAll('[data-cauchy-visual]').forEach(el=>{
      const id=`cauchy-${uid++}`;
      el.innerHTML=`<div class="proof-split"><div class="cauchy-diagram" role="img"></div><div><p><strong>Predict the largest and smallest dot products.</strong></p><label for="${id}">Angle ${math('\\theta')} <output></output></label><input id="${id}" type="range" min="0" max="180" step="1" value="60" aria-label="Angle between vectors"><div class="cauchy-buttons"><button type="button" data-angle="0">0°</button><button type="button" data-angle="90">90°</button><button type="button" data-angle="180">180°</button></div><div class="cauchy-values" aria-live="polite"></div></div></div>`;
      const input=el.querySelector('input');
      const draw=()=>{const theta=+input.value,t=theta*Math.PI/180,prod=6*Math.cos(t),signed=Math.abs(prod)<1e-10?0:prod;
        const fmt=x=>x.toFixed(2).replace(/\.00$/,'');
        el.querySelector('output').textContent=`${theta}°`;
        el.querySelector('.cauchy-diagram').innerHTML=figure(({line,label,point,path})=>{const O=[260,270],A=[390,270],B=[260+195*Math.cos(t),270-195*Math.sin(t)];line(O,A,C.a,true,false,4);line(O,B,C.b,true,false,4);point(O,'O',[0,25]);label([325,305],v('a'),C.a);label([B[0],B[1]-25],v('b'),C.b);if(theta>0&&theta<180){path(`M305 270 A45 45 0 0 0 ${260+45*Math.cos(t)} ${270-45*Math.sin(t)}`,C.muted);label([260+65*Math.cos(t/2),270-65*Math.sin(t/2)],'\\theta',C.muted,22);}});
        el.querySelector('.cauchy-diagram').setAttribute('aria-label',`Vectors of lengths 2 and 3 with angle ${theta} degrees; dot product ${fmt(signed)}.`);
        el.querySelector('.cauchy-values').innerHTML=`${math(`${v('a')}\\cdot${v('b')}=6\\cos${theta}^\\circ=${fmt(signed)}`)}<br>${math(`|${v('a')}\\cdot${v('b')}|=${fmt(Math.abs(signed))}\\leq6`)}<p>${theta===0||theta===180?'Equality: parallel vectors.':'The absolute dot product is below the bound.'}</p>`;
      };
      input.addEventListener('input',draw);el.querySelectorAll('[data-angle]').forEach(btn=>btn.addEventListener('click',()=>{input.value=btn.dataset.angle;draw();}));draw();
    });
  });
})();
