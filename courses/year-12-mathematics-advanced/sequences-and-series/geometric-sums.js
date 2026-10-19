/* Lesson 6: compare a term with its accumulated total. No network or stored data. */
(() => {
  'use strict';
  function init() {
    const helpers = window.MathsLesson;
    if (!helpers) return;
    const {math, typeset} = helpers;
    document.querySelectorAll('[data-module="rice-totals"]').forEach(m => {
      if (m.dataset.ready) return;
      m.dataset.ready = 'true';
      let count = 1, totalsVisible = false;
      m.innerHTML = '<div class="toolbar"><button class="gs-next-square primary">Next square</button><button class="gs-first-ten">First ten</button><button class="gs-show-totals" aria-pressed="false">Reveal totals</button><button class="gs-rice-reset">Reset</button></div><div class="gs-rice-table" aria-live="polite"></div><p class="gs-rice-caption"></p>';
      const $ = selector => m.querySelector(selector);
      function draw() {
        const cells = Array.from({length:10}, (_, i) => i+1);
        const cell = (n, value, visible) => `<td class="${n===count?'gs-current-square':''}">${visible?math(value):'<span class="gs-unknown">?</span>'}</td>`;
        $('.gs-rice-table').innerHTML = `<table aria-label="Grains on each square and the running total"><thead><tr><th scope="col">${math('n')}</th>${cells.map(n=>`<th scope="col">${n}</th>`).join('')}</tr></thead><tbody><tr><th scope="row">${math('a_n')}</th>${cells.map(n=>cell(n,String(2**(n-1)),n<=count)).join('')}</tr><tr><th scope="row">${math('S_n')}</th>${cells.map(n=>cell(n,String(2**n-1),n<=count&&totalsVisible)).join('')}</tr></tbody></table>`;
        $('.gs-next-square').disabled = count===10;
        $('.gs-first-ten').disabled = count===10;
        $('.gs-show-totals').textContent = totalsVisible?'Hide totals':'Reveal totals';
        $('.gs-show-totals').setAttribute('aria-pressed',String(totalsVisible));
        $('.gs-rice-caption').innerHTML = `${count} ${count===1?'square':'squares'} shown. ${math('a_n')}: on that square. ${math('S_n')}: across the first ${math('n')} squares.`;
        m.dataset.count=String(count);
        m.dataset.totalsVisible=String(totalsVisible);
        typeset(m);
      }
      $('.gs-next-square').addEventListener('click',()=>{count=Math.min(10,count+1);draw();});
      $('.gs-first-ten').addEventListener('click',()=>{count=10;draw();});
      $('.gs-show-totals').addEventListener('click',()=>{totalsVisible=!totalsVisible;draw();});
      $('.gs-rice-reset').addEventListener('click',()=>{count=1;totalsVisible=false;draw();});
      draw();
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
