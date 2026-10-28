# MathJax SVG renderer

`tex-svg.js` is the unmodified MathJax 3.2.2 combined browser component from the npm `mathjax@3.2.2` package (`es5/tex-svg.js`). License: Apache 2.0; see LICENSE.

This pinned self-contained component supplies native SVG paths for the vector diagrams only. Version 3.2.2 includes its glyph data, avoiding runtime font downloads. Slide prose and controls continue to use Quarto's embedded KaTeX. The topic's `diagram-math.js` disables automatic page typesetting and uses a bounded cache of label geometry. No CDN connection is required when presenting.

Upstream: https://github.com/mathjax/MathJax/tree/3.2.2
Documentation: https://docs.mathjax.org/en/v3.2/output/svg.html
