/* A static labelled triangle, using the existing native SVG maths renderer. */
(() => {
  'use strict';
  const draw = () => {
    const M = window.VectorDiagramMath;
    document.querySelectorAll('.fv-triangle-diagram').forEach(el => {
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 320" aria-hidden="true"><defs><marker id="fv-arrow-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#217864"/></marker><marker id="fv-arrow-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#ad6e32"/></marker><marker id="fv-arrow-sum" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#315985"/></marker></defs><path d="M50 250L300 250" stroke="#217864" stroke-width="4" marker-end="url(#fv-arrow-a)"/><path d="M300 250L430 65" stroke="#ad6e32" stroke-width="4" marker-end="url(#fv-arrow-b)"/><path d="M50 250L430 65" stroke="#315985" stroke-width="4" marker-end="url(#fv-arrow-sum)"/>${M.label(175,280,'\\underset{\\sim}{a}','#217864',30)}${M.label(395,170,'\\underset{\\sim}{b}','#ad6e32',30)}${M.label(215,130,'\\underset{\\sim}{a}+\\underset{\\sim}{b}','#315985',30)}</svg>`;
    });

    document.querySelectorAll('.fv-lower-diagram').forEach(el => {
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 320" aria-hidden="true"><defs><marker id="fv-lower-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#217864"/></marker><marker id="fv-lower-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#ad6e32"/></marker><marker id="fv-lower-sum" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#315985"/></marker></defs><path d="M60 105V250 M210 165V250 M450 105V175" fill="none" stroke="#aab8bb" stroke-width="1.5" stroke-dasharray="5 5"/><path d="M60 105H450" stroke="#217864" stroke-width="4" marker-end="url(#fv-lower-a)"/><path d="M450 165H210" stroke="#ad6e32" stroke-width="4" marker-end="url(#fv-lower-b)"/><path d="M60 240H210" stroke="#315985" stroke-width="4" marker-end="url(#fv-lower-sum)"/>${M.label(255,75,'\\underset{\\sim}{a}','#217864',30)}${M.label(330,195,'\\underset{\\sim}{b}','#ad6e32',30)}${M.label(135,278,'\\underset{\\sim}{a}+\\underset{\\sim}{b}','#315985',30)}</svg>`;
    });
  };
  window.MathJax.startup.promise.then(draw);
})();
