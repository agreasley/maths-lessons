/* Native SVG mathematics: no HTML foreignObject, font layout, or viewport offsets. */
(() => {
  'use strict';
  const cache = new Map();
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  const api = {ready: false, label};
  function geometry(tex) {
    if (cache.has(tex)) return cache.get(tex);
    const node = window.MathJax.tex2svg(tex, {display: false});
    const svg = node.querySelector('svg');
    if (!svg || svg.querySelector('[data-mml-node="merror"]')) throw new Error('Invalid diagram label: ' + tex);
    const [left, top, width, height] = svg.getAttribute('viewBox').split(/\s+/).map(Number);
    const result = {left, top, width, height, paths: svg.innerHTML};
    // Slider-generated labels should not grow the cache indefinitely.
    if (cache.size >= 512) cache.delete(cache.keys().next().value);
    cache.set(tex, result);
    return result;
  }
  function label(x, y, tex, colour, size = 24) {
    const g = geometry(tex), scale = size / 1000;
    const left = x - g.width * scale / 2, top = y - g.height * scale / 2;
    // All placement and glyph outlines use SVG transforms, including a moved parent g.
    return `<g class="vector-svg-label" data-tex="${esc(tex)}" data-label-x="${x}" data-label-y="${y}" style="color:${colour}" fill="${colour}" pointer-events="none" transform="translate(${left} ${top})"><title>${esc(tex)}</title><g transform="scale(${scale}) translate(${-g.left} ${-g.top})">${g.paths}</g></g>`;
  }
  window.VectorDiagramMath = api;
  window.MathJax.startup.promise.then(() => {api.ready = true;});
})();
