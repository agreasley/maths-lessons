(() => {
  'use strict';
  function init() {
    document.querySelectorAll('[data-dc-steps]').forEach(panel => {
      const steps = Array.from(panel.querySelectorAll('.dc-step'));
      const next = panel.querySelector('.dc-step-next');
      const back = panel.querySelector('.dc-step-back');
      const reset = panel.querySelector('.dc-step-reset');
      const count = panel.querySelector('.dc-step-count');
      let visible = 0;
      function draw() {
        steps.forEach((step, i) => { step.hidden = i >= visible; });
        next.disabled = visible === steps.length;
        next.textContent = visible === steps.length ? 'All steps shown' : 'Reveal next step';
        back.disabled = visible === 0;
        reset.disabled = visible === 0;
        count.textContent = `${visible} of ${steps.length} steps shown`;
        panel.dataset.visibleSteps = String(visible);
      }
      next.addEventListener('click', () => { visible = Math.min(steps.length, visible + 1); draw(); });
      back.addEventListener('click', () => { visible = Math.max(0, visible - 1); draw(); });
      reset.addEventListener('click', () => { visible = 0; draw(); });
      draw();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
