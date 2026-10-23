/* Exact mathematical diagrams and deliberate reveals for the approved Lesson 1. */
(() => {
  'use strict';
  const PI = Math.PI;
  const C = {ink:'#152e3b', teal:'#007f78', blue:'#3b66a8', orange:'#b55224', grey:'#a3aaa9', rule:'#d7d8ce'};
  let serial = 0;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const frac = (num,den) => den===1?String(num):`\\frac{${num}}{${den}}`;
  function piTex(value) {
    if (Math.abs(value)<1e-8) return '0';
    const sign=value<0?'-':'';
    const ratio=Math.abs(value/PI);
    for(let den=1;den<=24;den++) {
      const num=Math.round(ratio*den);
      if(Math.abs(num/den-ratio)<1e-7) {
        const top=num===1?'\\pi':`${num}\\pi`;
        return sign+(den===1?top:`\\frac{${top}}{${den}}`);
      }
    }
    return value.toFixed(2);
  }
  function numberTex(value) {
    if(Number.isInteger(value)) return String(value);
    const sign=value<0?'-':'';
    for(let den=2;den<=12;den++) {
      const num=Math.round(Math.abs(value)*den);
      if(Math.abs(num/den-Math.abs(value))<1e-8) return sign+frac(num,den);
    }
    return value.toFixed(2);
  }
  function ticks(lo,hi,step) {
    const values=[];
    for(let k=Math.ceil((lo-1e-8)/step);k<=Math.floor((hi+1e-8)/step);k++) values.push(k*step);
    return values;
  }
  function plot(config, options={}) {
    const {math}=window.MathsLesson;
    const w=config.width||900, h=config.height||390;
    const m={l:65,r:30,t:30,b:54};
    const X=x=>m.l+(x-config.xmin)/(config.xmax-config.xmin)*(w-m.l-m.r);
    const Y=y=>h-m.b-(y-config.ymin)/(config.ymax-config.ymin)*(h-m.t-m.b);
    const clip=`trig-clip-${++serial}`;
    const inside=[];
    const outside=[];
    const line=(x1,y1,x2,y2,colour=C.ink,dash='',width=2)=>`<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" stroke="${colour}" stroke-width="${width}"${dash?` stroke-dasharray="${dash}"`:''}/>`;
    const label=(tex,x,y,width=76,height=37,colour=C.ink)=>`<foreignObject x="${x-width/2}" y="${y-height/2}" width="${width}" height="${height}"><div xmlns="http://www.w3.org/1999/xhtml" class="trig-axis-math" style="color:${colour}">${math(tex)}</div></foreignObject>`;
    if(options.highlight) {
      const [a,b]=options.highlight;
      inside.push(`<rect x="${X(a)}" y="${m.t}" width="${X(b)-X(a)}" height="${h-m.t-m.b}" fill="#e8f1ed"/>`);
    }
    if(options.bounds) options.bounds.forEach(y=>inside.push(line(config.xmin,y,config.xmax,y,C.grey,'5 6',1.6)));
    if(options.midline!==undefined) inside.push(line(config.xmin,options.midline,config.xmax,options.midline,C.blue,'8 5',2));
    if(options.asymptotes) options.asymptotes.forEach(x=>inside.push(line(x,config.ymin,x,config.ymax,C.orange,'8 6',2.3)));
    inside.push(line(config.xmin,0,config.xmax,0,C.ink,'',1.8));
    if(config.xmin<=0&&config.xmax>=0) inside.push(line(0,config.ymin,0,config.ymax,C.ink,'',1.8));
    const xt=options.xticks||[], yt=options.yticks||[];
    const zeroY=Y(0), zeroX=X(0);
    xt.forEach(x=>{
      inside.push(`<line x1="${X(x)}" y1="${zeroY-5}" x2="${X(x)}" y2="${zeroY+5}" stroke="${C.ink}" stroke-width="1.6"/>`);
      outside.push(label(piTex(x),X(x),zeroY+27,66,40));
    });
    yt.filter(y=>Math.abs(y)>1e-9).forEach(y=>{
      inside.push(`<line x1="${zeroX-5}" y1="${Y(y)}" x2="${zeroX+5}" y2="${Y(y)}" stroke="${C.ink}" stroke-width="1.6"/>`);
      outside.push(label(numberTex(y),zeroX-28,Y(y),49,38));
    });
    outside.push(label('x',w-14,zeroY-17,25,30));
    outside.push(label('y',zeroX+18,15,25,30));
    function curve(fn,colour=C.teal,dash='',intervals=[[config.xmin,config.xmax]],opacity=1) {
      for(const [left,right] of intervals) {
        const a=Math.max(left,config.xmin),b=Math.min(right,config.xmax);
        if(b<=a) continue;
        let d='',pen=false;
        const count=Math.max(160,Math.ceil(750*(b-a)/(config.xmax-config.xmin)));
        for(let k=0;k<=count;k++) {
          const x=a+(b-a)*k/count, y=fn(x);
          if(!Number.isFinite(y)||Math.abs(y)>1000) {pen=false;continue;}
          d+=`${pen?'L':'M'}${X(x).toFixed(3)},${Y(y).toFixed(3)} `;pen=true;
        }
        inside.push(`<path data-role="curve" d="${d}" fill="none" stroke="${colour}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}"${dash?` stroke-dasharray="${dash}"`:''}/>`);
      }
    }
    function points(list,colour=C.teal) {
      list.forEach(([x,y])=>{
        if(x<config.xmin-1e-8||x>config.xmax+1e-8) return;
        inside.push(`<circle data-role="key-point" data-x="${x}" data-y="${y}" cx="${X(x)}" cy="${Y(y)}" r="5" fill="${colour}" stroke="white" stroke-width="1.4"/>`);
      });
    }
    function bracket(x1,x2,y,tex) {
      inside.push(line(x1,y,x2,y,C.blue,'',2.3));
      [x1,x2].forEach(x=>inside.push(line(x,y-.12,x,y+.12,C.blue,'',2.3)));
      outside.push(label(tex,(X(x1)+X(x2))/2,Y(y)-22,100,40,C.blue));
    }
    function amplitude(x,y1,y2) {
      const px=X(x), py1=Y(y1),py2=Y(y2);
      inside.push(line(x,y1,x,y2,C.orange,'',3));
      inside.push(`<path d="M${px-6},${py2+9} L${px},${py2} L${px+6},${py2+9} M${px-6},${py1-9} L${px},${py1} L${px+6},${py1-9}" fill="none" stroke="${C.orange}" stroke-width="2.5"/>`);
      outside.push(label('2',px+22,(py1+py2)/2,35,35,C.orange));
    }
    function shiftArrow(x1,x2,y) {
      const px=X(x2),py=Y(y)-9;
      inside.push(`<path data-role="shift-arrow" d="M${X(x1)},${py} L${px},${py} M${px-10},${py-6} L${px},${py} L${px-10},${py+6}" fill="none" stroke="${C.orange}" stroke-width="2.4"/>`);
    }
    function finish(title) {
      return `<svg class="trig-plot" viewBox="0 0 ${w} ${h}" role="img" aria-label="${escape(title)}"><title>${escape(title)}</title><defs><clipPath id="${clip}"><rect x="${m.l-6}" y="${m.t}" width="${w-m.l-m.r+12}" height="${h-m.t-m.b}"/></clipPath></defs><g clip-path="url(#${clip})">${inside.join('')}</g>${outside.join('')}</svg>`;
    }
    return {curve,points,bracket,amplitude,shiftArrow,finish};
  }
  function controls(m, steps, draw) {
    let stage=0;
    const controls=document.createElement('div');
    controls.className='trig-controls';
    controls.innerHTML='<button class="trig-next primary"></button><button class="trig-back">Previous step</button><button class="trig-reset">Reset graph</button><span class="trig-step" aria-live="polite"></span>';
    m.append(controls);
    const next=controls.querySelector('.trig-next'),back=controls.querySelector('.trig-back');
    function render(){
      m.dataset.stage=String(stage);m.dataset.stageCount=String(steps.length);
      draw(stage);
      next.textContent=steps[stage]||'Complete';next.disabled=stage===steps.length;
      back.disabled=stage===0;
      controls.querySelector('.trig-step').textContent=`${stage} / ${steps.length}`;
      window.MathsLesson.typeset(m);
    }
    next.addEventListener('click',e=>{e.stopPropagation();if(stage<steps.length){stage++;render();}});
    back.addEventListener('click',e=>{e.stopPropagation();if(stage>0){stage--;render();}});
    controls.querySelector('.trig-reset').addEventListener('click',e=>{e.stopPropagation();stage=0;render();});
    render();
  }
  function recap(m) {
    const {math}=window.MathsLesson;
    const a=[-1.5*PI,-.5*PI,.5*PI,1.5*PI];
    const intervals=[[-2*PI,a[0]-1e-6],...a.slice(0,-1).map((x,k)=>[x+1e-6,a[k+1]-1e-6]),[a[3]+1e-6,2*PI]];
    m.innerHTML=['sin','cos','tan'].map(name=>{
      const tan=name==='tan';
      const p=plot({xmin:-2*PI,xmax:2*PI,ymin:tan?-3:-1.6,ymax:tan?3:1.6,width:430,height:315},{xticks:[-2*PI,-PI,0,PI,2*PI],yticks:tan?[-2,2]:[-1,1],asymptotes:tan?a:[]});
      p.curve(Math[name],C.teal,'',tan?intervals:[[-2*PI,2*PI]]);
      return `<div class="trig-mini"><h3>${math(`y=\\${name} x`)}</h3>${p.finish(`Basic ${name} graph from minus two pi to two pi in radians`)}</div>`;
    }).join('');
  }
  function amplitudeDemo(m) {
    const {math}=window.MathsLesson;
    const p=plot(
      {xmin:0,xmax:2*PI,ymin:-1.7,ymax:3.7},
      {xticks:ticks(0,2*PI,PI/2),yticks:[-1,1,3],midline:1}
    );
    p.curve(x=>2*Math.sin(x)+1);
    p.amplitude(PI/2,1,3);
    m.innerHTML='<div class="trig-chart-layout"><div class="trig-canvas">'+
      p.finish('The graph y equals two sine x plus one, with a dashed midline at y equals one and a vertical double-headed arrow from the midline to the peak at y equals three, showing amplitude two')+
      '</div><div class="trig-reading">'+
      '<p>'+math('y=2\\sin x+1')+'</p>'+
      '<p>Midline '+math('y=1')+'</p>'+
      '<p>Amplitude '+math('2')+'</p>'+
      '<p class="trig-hint">The arrow marks the vertical distance from the midline to a peak.</p>'+
      '</div></div>';
  }
  function periodDemo(m) {
    const {math}=window.MathsLesson;
    m.innerHTML='<div class="trig-pair"></div><div class="trig-period-reading" aria-live="polite"></div>';
    controls(m,['Reveal one cycle','Reveal the period rule'],stage=>{
      m.querySelector('.trig-pair').innerHTML=[1,2].map(n=>{
        const T=2*PI/n;
        const p=plot({xmin:0,xmax:2*PI,ymin:-1.6,ymax:2,width:610,height:285},{xticks:ticks(0,2*PI,PI/2),yticks:[-1,1],highlight:stage>=1?[0,T]:undefined});
        p.curve(x=>Math.sin(n*x));
        if(stage>=1)p.bracket(0,T,1.3,`T=${piTex(T)}`);
        return `<div><h3>${math(`y=\\sin ${n===1?'':n}x`)}</h3>${p.finish(`Sine ${n}x, with ${stage?'one full cycle marked':'cycle length to be identified'}`)}</div>`;
      }).join('');
      const readings=[
        '<p>How far along the horizontal axis before the whole pattern repeats?</p>',
        `<p>The horizontal factor ${math('\\tfrac12')} halves the period: ${math('2\\pi\\div2=\\pi')}.</p>`,
        `<p>Sine and cosine: ${math('T=\\dfrac{2\\pi}{|n|}')} &nbsp; Tangent: ${math('T=\\dfrac{\\pi}{|n|}')}</p><p class="small-note">The basic tangent graph repeats every ${math('\\pi')}.</p>`
      ];
      m.querySelector('.trig-period-reading').innerHTML=readings[stage];
    });
  }
  const examples={
    '1.8':{xmin:0,xmax:2*PI,ymin:-.35,ymax:1.95,a:.5,b:1,n:2,fn:x=>.5*Math.sin(2*x)+1,range:'[\\tfrac12,\\tfrac32]',name:'sine'},
    '1.9':{xmin:-PI,xmax:PI,ymin:-2.1,ymax:6,a:-3,b:2,n:2,fn:x=>2-3*Math.cos(2*x),range:'[-1,5]',name:'cosine'},
    '1.15':{xmin:-3*PI,xmax:3*PI,ymin:-6,ymax:6,a:2,b:0,n:.5,fn:x=>2*Math.tan(x/2),name:'tangent'},
    '1.19':{xmin:0,xmax:2*PI,ymin:-4.1,ymax:4.3,a:3,b:0,n:2,c:PI/3,fn:x=>3*Math.sin(2*x-2*PI/3),range:'[-3,3]',name:'shifted sine'}
  };
  function sketch(m) {
    const {math}=window.MathsLesson;
    const cfg=examples[m.dataset.example];
    if(!cfg) return;
    const tan=cfg.name==='tangent',shift=!!cfg.c;
    const T=(tan?PI:2*PI)/Math.abs(cfg.n), step=T/4;
    const steps=shift?['Sketch without the shift','Shift the key points','Complete the shifted graph']:tan?['Reveal scale and asymptotes','Reveal centres and guide points','Reveal the branches']:['Reveal vertical features','Reveal the horizontal scale','Reveal key points','Reveal the curve'];
    m.innerHTML='<div class="trig-chart-layout"><div class="trig-canvas"></div><div class="trig-reading" aria-live="polite"></div></div>';
    controls(m,steps,stage=>{
      const grid=ticks(cfg.xmin,cfg.xmax,step);
      const options={xticks:stage>=(tan||shift?1:2)?grid:[],yticks:stage>=1?(tan?[-2,2]:[cfg.b-Math.abs(cfg.a),cfg.b,cfg.b+Math.abs(cfg.a)]):[],midline:!tan&&stage>=1?cfg.b:undefined};
      if(!tan&&stage>=1) options.bounds=[cfg.b-Math.abs(cfg.a),cfg.b+Math.abs(cfg.a)];
      const asym=[-3*PI,-PI,PI,3*PI];
      if(tan&&stage>=1)options.asymptotes=asym;
      let shiftedPoints=[];
      if(shift&&stage>=2) {
        for(let k=Math.ceil((cfg.xmin-cfg.c)/step);k<=Math.floor((cfg.xmax-cfg.c)/step);k++) {
          const x=cfg.c+k*step;shiftedPoints.push([x,cfg.fn(x)]);
        }
        options.xticks=[0,...shiftedPoints.map(p=>p[0]),2*PI];
      }
      const p=plot({...cfg,width:shift?1190:900,height:shift?350:390},options);
      let lines=[];
      if(stage===0)lines=['<p class="trig-hint">Choose the key features and scale before sketching.</p>'];
      if(shift) {
        if(stage===1) {
          p.curve(x=>3*Math.sin(2*x));p.points(grid.map(x=>[x,3*Math.sin(2*x)]));
          lines=[`<p>First: ${math('y=3\\sin2x')}. Amplitude ${math('3')}; period ${math('\\pi')}; step ${math('\\pi/4')}.</p>`];
        }
        if(stage===2) {
          p.curve(x=>3*Math.sin(2*x),C.grey,'7 6',undefined,.65);
          p.points(shiftedPoints,C.orange);p.shiftArrow(0,PI/3,0);p.shiftArrow(PI/4,7*PI/12,3);
          lines=[`<p>Shift right ${math('\\pi/3')}: ${math('(0,0)\\mapsto(\\pi/3,0)')} and ${math('(\\pi/4,3)\\mapsto(7\\pi/12,3)')}.</p>`];
        }
        if(stage===3) {
          p.curve(cfg.fn);p.points(shiftedPoints);p.points([[0,cfg.fn(0)],[2*PI,cfg.fn(2*PI)]],C.blue);
          lines=[`<p>Keep ${math('0\\le x\\le2\\pi')}. Range ${math('[-3,3]')}. At both endpoints, ${math('y=-3\\sqrt3/2')}.</p>`];
        }
      } else if(tan) {
        if(stage>=1)lines=[`<p>Period ${math('T=2\\pi')}<br>Step ${math('T/4=\\pi/2')}</p><p>Asymptotes<br>${math('x=-3\\pi,-\\pi,\\pi,3\\pi')}</p>`];
        if(stage>=2) {
          p.points([-2*PI,0,2*PI].flatMap(x=>[[x-step,-2],[x,0],[x+step,2]]));
          lines.push(`<p>Centres at<br>${math('x=-2\\pi,0,2\\pi')}</p>`);
        }
        if(stage>=3) {
          const gaps=asym.slice(0,-1).map((x,k)=>[x+1e-6,asym[k+1]-1e-6]);
          p.curve(cfg.fn,C.teal,'',gaps);
          lines=[`<p>Period ${math('2\\pi')}</p><p>Exclude all four asymptote values.</p><p>Range ${math('\\mathbb R')}<br>No amplitude</p>`];
        }
      } else {
        if(stage>=1)lines=[`<p>Amplitude ${math(numberTex(Math.abs(cfg.a)))}<br>Midline ${math(`y=${cfg.b}`)}</p><p>Maximum ${math(numberTex(cfg.b+Math.abs(cfg.a)))}<br>Minimum ${math(numberTex(cfg.b-Math.abs(cfg.a)))}</p>`];
        if(stage>=2)lines.push(`<p>Period ${math(`T=${piTex(T)}`)}<br>Step ${math(`T/4=${piTex(step)}`)}</p>`);
        if(stage>=3)p.points(grid.map(x=>[x,cfg.fn(x)]));
        if(stage>=4){p.curve(cfg.fn);lines=[`<p>Amplitude ${math(numberTex(Math.abs(cfg.a)))}<br>Period ${math(piTex(T))}</p><p>Range ${math(cfg.range)}</p><p class="trig-hint">${cfg.b===1?'Two full cycles. No horizontal-axis crossings.':'Check the four horizontal-axis crossings.'}</p>`];}
      }
      m.querySelector('.trig-canvas').innerHTML=p.finish(`Example ${m.dataset.example}, ${cfg.name} graph, construction stage ${stage} of ${steps.length}`);
      m.querySelector('.trig-reading').innerHTML=lines.join('');
    });
  }
  function init(){
    if(!window.MathsLesson){setTimeout(init,30);return;}
    document.querySelectorAll('[data-trig]').forEach(m=>{
      if(m.dataset.trigReady)return;
      m.dataset.trigReady='true';
      ({recap,amplitude:amplitudeDemo,period:periodDemo,sketch}[m.dataset.trig])?.(m);
    });
    window.MathsLesson.typeset(document);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
