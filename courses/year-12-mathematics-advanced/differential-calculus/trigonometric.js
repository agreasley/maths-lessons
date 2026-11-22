/* Lesson 3: native SVG diagrams; all mathematical labels share the geometry's coordinates. */
(() => {
  'use strict';
  const TAU = 2 * Math.PI;
  const colour = {ink: '#152e3b', muted: '#607078', rule: '#d7d8ce', teal: '#007f78', orange: '#b55224', blue: '#3b66a8'};
  const clean = n => Math.abs(n) < 1e-10 ? 0 : n;
  const label = (x, y, tex, c = colour.ink, size = 23) => window.VectorDiagramMath.label(x, y, tex, c, size);
  const line = (x1, y1, x2, y2, c, width = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${width}" ${extra}/>`;
  function arrow(x1, y, x2, c) {
    if (Math.abs(x2 - x1) < 0.01) return `<circle cx="${x1}" cy="${y}" r="4" fill="${c}"/>`;
    const sign = Math.sign(x2 - x1);
    return line(x1, y, x2, y, c, 4) + `<path d="M${x2 - sign * 10} ${y - 6}L${x2} ${y}L${x2 - sign * 10} ${y + 6}" fill="none" stroke="${c}" stroke-width="3"/>`;
  }
  function initSpring(root) {
    const svg = root.querySelector('svg'), slider = root.querySelector('input'), play = root.querySelector('.dc-shm-play');
    const fragment = root.querySelector('.dc-shm-result'), section = root.closest('section');
    let phase = 0, running = false, frame = 0, last = null;
    function draw() {
      const x = clean(Math.cos(phase)), v = clean(-Math.sin(phase)), a = -x;
      const centre = 370, mass = centre + 135 * x, revealed = fragment.classList.contains('visible');
      root.dataset.revealed = String(revealed);
      svg.dataset.displacement = String(x); svg.dataset.velocity = String(v); svg.dataset.acceleration = String(a);
      const start = 55, end = mass - 30;
      let coil = `M${start} 105L${start + 14} 105`;
      for (let i = 0; i < 20; i++) coil += `L${start + 14 + (end - start - 28) * (i + 1) / 21} ${105 + (i % 2 ? 14 : -14)}`;
      coil += `L${end - 14} 105L${end} 105`;
      svg.innerHTML = `<path d="M45 58V142M30 58L45 73M30 78L45 93M30 98L45 113M30 118L45 133" stroke="${colour.muted}" stroke-width="3" fill="none"/>
        ${line(centre, 52, centre, 302, colour.rule, 2, 'stroke-dasharray="6 5"')}
        <text x="${centre}" y="30" text-anchor="middle" fill="${colour.muted}" font-size="21">Equilibrium</text>
        <path d="${coil}" fill="none" stroke="${colour.teal}" stroke-width="4"/>
        <rect x="${mass - 30}" y="77" width="60" height="56" rx="5" fill="${colour.teal}"/>
        ${line(50, 137, 620, 137, colour.rule)}
        ${arrow(centre, 166, mass, colour.teal)}${label(95, 168, 'x(t)', colour.teal)}
        <g class="dc-shm-arrows" visibility="${revealed ? 'visible' : 'hidden'}">
          ${arrow(mass, 218, mass + 95 * v, colour.blue)}${label(95, 218, 'v(t)', colour.blue)}
          ${arrow(mass, 268, mass + 95 * a, colour.orange)}${label(95, 268, 'a(t)', colour.orange)}
        </g>
        ${line(210, 309, 535, 309, colour.muted)}
        ${[[-1, '-A'], [0, '0'], [1, 'A']].map(([p, tex]) => line(centre + 135 * p, 304, centre + 135 * p, 314, colour.muted) + label(centre + 135 * p, 335, tex)).join('')}
        ${label(562, 309, 'x')}`;
      slider.value = String(phase / TAU * 1000);
      root.querySelectorAll('[data-phase]').forEach(button => button.setAttribute('aria-pressed', String(Math.abs(phase / TAU - Number(button.dataset.phase)) < 1e-8)));
    }
    function pause() {
      running = false; cancelAnimationFrame(frame); last = null;
      play.textContent = 'Play'; play.setAttribute('aria-pressed', 'false');
    }
    function tick(now) {
      if (!running) return;
      if (last !== null) phase = (phase + Math.min(now - last, 80) * 0.0007) % TAU;
      last = now; draw(); frame = requestAnimationFrame(tick);
    }
    play.addEventListener('click', () => {
      if (running) { pause(); return; }
      running = true; last = null; play.textContent = 'Pause'; play.setAttribute('aria-pressed', 'true'); frame = requestAnimationFrame(tick);
    });
    root.querySelector('.dc-shm-reset').addEventListener('click', () => {pause(); phase = 0; draw();});
    slider.addEventListener('input', () => {pause(); phase = Number(slider.value) / 1000 * TAU; draw();});
    root.querySelectorAll('[data-phase]').forEach(button => button.addEventListener('click', () => {pause(); phase = Number(button.dataset.phase) * TAU; draw();}));
    const refresh = () => draw();
    Reveal.on('fragmentshown', refresh); Reveal.on('fragmenthidden', refresh);
    Reveal.on('slidechanged', () => {if (Reveal.getCurrentSlide() !== section) pause();});
    Reveal.on('overviewshown', pause);
    // The shared Slide map is an accessible custom overlay, separate from Reveal's overview.
    document.addEventListener('click', event => {if (event.target.closest('#lesson-navigation .overview')) pause();});
    const map = document.getElementById('lesson-slide-map');
    if (map) new MutationObserver(() => {if (map.open) pause();}).observe(map, {attributes: true, attributeFilter: ['open']});
    document.addEventListener('visibilitychange', () => {if (document.hidden) pause();});
    draw();
  }
  function initGraph(root) {
    const kind = root.dataset.dcTrig, svg = root.querySelector('svg'), slider = root.querySelector('input');
    const original = kind === 'sin' ? Math.sin : Math.cos;
    const derivative = kind === 'sin' ? Math.cos : x => -Math.sin(x);
    const result = root.querySelector('.dc-graph-result');
    const unit = 64, baseY = 143, leftX = 70, rightX = 660;
    const ticks = ['0', '\\frac{\\pi}{2}', '\\pi', '\\frac{3\\pi}{2}', '2\\pi'];
    let x = 0;
    function axes(origin) {
      let out = line(origin - 16, baseY, origin + TAU * unit + 28, baseY, colour.muted) + line(origin, 40, origin, 228, colour.muted);
      for (const y of [-1, 1]) out += line(origin, baseY - unit * y, origin + TAU * unit, baseY - unit * y, colour.rule, 1, 'stroke-dasharray="4 4"') + label(origin - 22, baseY - unit * y, String(y), colour.muted, 20);
      ticks.forEach((tex, i) => {const px = origin + i * Math.PI / 2 * unit; out += line(px, baseY - 4, px, baseY + 4, colour.muted) + label(px, baseY + 24, tex, colour.ink, 22);});
      return out + label(origin + TAU * unit + 46, baseY, 'x', colour.muted, 22);
    }
    function curve(origin, f, c) {
      let path = '';
      for (let i = 0; i <= 160; i++) {const t = TAU * i / 160; path += `${i ? 'L' : 'M'}${origin + unit * t} ${baseY - unit * f(t)}`;}
      return `<path d="${path}" fill="none" stroke="${c}" stroke-width="3"/>`;
    }
    const staticGraph = axes(leftX) + axes(rightX) + curve(leftX, original, colour.teal) + label(270, 20, `y=\\${kind} x`, colour.teal, 25) + '<text x="860" y="27" text-anchor="middle" fill="#3b66a8" font-size="24">Gradient</text>';
    const derivedCurve = curve(rightX, derivative, colour.blue) + ticks.map((_, i) => `<circle cx="${rightX + i * Math.PI / 2 * unit}" cy="${baseY - unit * derivative(i * Math.PI / 2)}" r="5" fill="${colour.blue}"/>`).join('');
    function draw() {
      const y = clean(original(x)), slope = clean(derivative(x)), px = leftX + x * unit, py = baseY - y * unit;
      const shown = result.classList.contains('visible');
      svg.dataset.x = String(x); svg.dataset.slope = String(slope); root.dataset.revealed = String(shown);
      svg.innerHTML = staticGraph + line(px, baseY, px, py, colour.orange, 1.5, 'stroke-dasharray="5 4"') +
        line(px - 42, py + slope * 42, px + 42, py - slope * 42, colour.orange, 4) + `<circle cx="${px}" cy="${py}" r="5" fill="${colour.orange}"/>` +
        `<g class="dc-derived-graph" visibility="${shown ? 'visible' : 'hidden'}">${derivedCurve}${line(rightX + x * unit, baseY, rightX + x * unit, baseY - slope * unit, colour.orange, 1.5, 'stroke-dasharray="5 4"')}<circle cx="${rightX + x * unit}" cy="${baseY - slope * unit}" r="7" fill="${colour.orange}"/></g>`;
      root.querySelectorAll('[data-position]').forEach(button => button.setAttribute('aria-pressed', String(Math.abs(x / TAU - Number(button.dataset.position)) < 1e-8)));
    }
    slider.addEventListener('input', () => {x = Number(slider.value) / 1000 * TAU; draw();});
    root.querySelectorAll('[data-position]').forEach(button => button.addEventListener('click', () => {x = Number(button.dataset.position) * TAU; slider.value = String(Number(button.dataset.position) * 1000); draw();}));
    Reveal.on('fragmentshown', draw); Reveal.on('fragmenthidden', draw); draw();
  }
  function boot() {
    if (!window.VectorDiagramMath?.ready || !window.Reveal?.isReady()) {setTimeout(boot, 40); return;}
    document.querySelectorAll('.slides [data-dc-shm]').forEach(initSpring);
    document.querySelectorAll('.slides [data-dc-trig]').forEach(initGraph);
  }
  boot();
})();
