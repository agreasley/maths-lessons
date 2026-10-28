/* SVG labels must remain in the diagram's coordinate system on Safari/iPad. */
window.MathJax = {
  startup: {typeset: false},
  svg: {fontCache: 'none'},
  options: {enableMenu: false, enableAssistiveMml: false},
  tex: {packages: ['base', 'ams', 'newcommand', 'textmacros']}
};
