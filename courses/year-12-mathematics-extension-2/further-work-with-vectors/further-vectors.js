/* Head-to-tail triangle inequality; labels and arrows share SVG coordinates. */
(() => {
  'use strict';
  const vector = name => `\\underset{\\sim}{${name}}`;
  const fmt = x => (Math.abs(x) < 1e-9 ? 0 : x).toFixed(2).replace(/\.00$/, '');
  window.MathJax.startup.promise.then(() => {
    const M = window.VectorDiagramMath;
    const {math} = window.MathsLesson;
    document.querySelectorAll('[data-fv-triangle]').forEach((el, index) => {
      const lower = el.dataset.fvTriangle === 'lower';
      const initial = lower ? 140 : 60;
      const prefix = `fv-triangle-${index}`;
      el.innerHTML = `<div class="fv-interactive-grid"><div><div class="fv-live-diagram" role="img"></div><div class="fv-live-values" aria-live="polite"></div></div><div class="fv-triangle-controls"><p class="fv-interpretation">${lower ? 'The most cancellation occurs when vectors point in opposite directions.' : 'The shortest distance between two points is a straight line.'}</p>
        <label for="${prefix}-a">${math(`|${vector('a')}|`)} <output data-output="a"></output></label><input id="${prefix}-a" aria-label="Magnitude of vector a" data-value="a" type="range" min="0" max="6" step="0.5" value="4">
        <label for="${prefix}-b">${math(`|${vector('b')}|`)} <output data-output="b"></output></label><input id="${prefix}-b" aria-label="Magnitude of vector b" data-value="b" type="range" min="0" max="6" step="0.5" value="3">
        <label for="${prefix}-angle">${math('\\theta')} <output data-output="angle"></output></label><input id="${prefix}-angle" aria-label="Angle between vectors" data-value="angle" type="range" min="0" max="180" step="1" value="${initial}">
        <div class="fv-triangle-buttons"><button type="button" data-preset="0">Same direction</button><button type="button" data-preset="180">Opposite directions</button><button type="button" data-reset>Reset</button></div><p class="fv-equality-status"></p></div></div>`;
      const inputs = Object.fromEntries([...el.querySelectorAll('[data-value]')].map(x => [x.dataset.value, x]));
      function draw() {
        const a = +inputs.a.value, b = +inputs.b.value, angle = +inputs.angle.value;
        const theta = angle * Math.PI / 180, dx = b * Math.cos(theta), dy = b * Math.sin(theta);
        const sum = Math.hypot(a + dx, dy), lo = Math.abs(a - b), hi = a + b;
        const zero = a === 0 || b === 0, collinear = angle === 0 || angle === 180 || zero;
        const xMin = Math.min(0, a - b), span = a + b - xMin;
        const scale = Math.min(440 / (span || 1), 190 / (b || 1));
        const O = [(520 - span * scale) / 2 - xMin * scale, 250];
        const A = [O[0] + a * scale, O[1]], B = [A[0] + dx * scale, O[1] - dy * scale];
        const colours = ['#217864','#ad6e32','#315985'];
        const defs = colours.map((c, i) => `<marker id="${prefix}-arrow-${i}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="${c}"/></marker>`).join('');
        const line = (P, Q, i, width) => Math.hypot(P[0]-Q[0],P[1]-Q[1]) < 1e-8 ? '' : `<path d="M${P[0]} ${P[1]}L${Q[0]} ${Q[1]}" fill="none" stroke="${colours[i]}" stroke-width="${width}" ${i === 2 ? 'stroke-dasharray="8 5"' : ''} marker-end="url(#${prefix}-arrow-${i})"/>`;
        let labels = '';
        if (a) labels += M.label((O[0]+A[0])/2, O[1]+30, vector('a'), colours[0], 27);
        if (b) labels += M.label((A[0]+B[0])/2 + (collinear ? 0 : 20*Math.sin(theta)), (A[1]+B[1])/2 + (collinear ? -30 : 20*Math.cos(theta)), vector('b'), colours[1], 27);
        if (sum > 1e-8) {
          const nx = (B[1]-O[1]) / (sum*scale), ny = -(B[0]-O[0]) / (sum*scale);
          labels += M.label((O[0]+B[0])/2 + (collinear ? 0 : 25*nx), (O[1]+B[1])/2 + (collinear ? -65 : 25*ny), `${vector('a')}+${vector('b')}`, colours[2], 27);
        } else labels += M.label(O[0], O[1]-65, `${vector('a')}+${vector('b')}=${vector('0')}`, colours[2], 27);
        const diagram = el.querySelector('.fv-live-diagram');
        diagram.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 320" aria-hidden="true"><defs>${defs}</defs>${line(O,A,0,9)}${line(A,B,1,6)}${line(O,B,2,3)}<circle cx="${O[0]}" cy="${O[1]}" r="4" fill="#152e3b"/>${labels}</svg>`;
        diagram.setAttribute('aria-label', `Head-to-tail vectors with magnitudes ${a} and ${b}. ${zero ? 'One or both vectors are zero.' : `Angle ${angle} degrees.`} Resultant magnitude ${fmt(sum)}.`);
        el.querySelector('[data-output="a"]').textContent = fmt(a);
        el.querySelector('[data-output="b"]').textContent = fmt(b);
        el.querySelector('[data-output="angle"]').textContent = zero ? 'undefined (zero vector)' : `${angle}°`;
        inputs.angle.disabled = zero;
        el.querySelectorAll('[data-preset]').forEach(btn => { btn.disabled = zero; });
        const expression = lower ? `\\bigl||${vector('a')}|-|${vector('b')}|\\bigr|=${fmt(lo)}` : `|${vector('a')}|+|${vector('b')}|=${fmt(hi)}`;
        el.querySelector('.fv-live-values').innerHTML = `<div class="fv-resultant">${math(`|${vector('a')}+${vector('b')}|=${fmt(sum)}`)}</div><div>${math(expression)}</div>`;
        const equal = zero || (lower ? angle === 180 : angle === 0);
        el.querySelector('.fv-equality-status').textContent = zero ? 'A zero vector gives equality in both bounds.' : equal ? `${lower ? 'Lower' : 'Upper'} bound reached.` : lower ? 'Turn towards 180° to see the greatest cancellation.' : 'Turn towards 0° to see the longest resultant.';
      }
      Object.values(inputs).forEach(input => input.addEventListener('input', draw));
      el.querySelectorAll('[data-preset]').forEach(btn => btn.addEventListener('click', () => { inputs.angle.value = btn.dataset.preset; draw(); }));
      el.querySelector('[data-reset]').addEventListener('click', () => {inputs.a.value = 4; inputs.b.value = 3; inputs.angle.value = initial; draw();});
      draw();
    });
  });
})();
