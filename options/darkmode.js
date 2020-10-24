

//"Identifier 'dark_look' has already been declared"... on second time of checkbox
//b/c script was already injected into html
const dark_look = `
  .darkmode-layer {
    position: fixed;
    pointer-events: none;
    backgroundColor: '#fff',
    transition: all '0.3s' ease;
    mix-blend-mode: difference;
  }

  .darkmode-layer--simple {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transform: scale(1) !important;
  }

  .darkmode-layer--expanded {
    transform: scale(100);
    border-radius: 0;
  }

  .darkmode-layer--no-transition {
    transition: none;
  }

  .darkmode-background {
    backgroundColor: '#fff',
    position: fixed;
    pointer-events: none;
    z-index: -10;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  img, .darkmode-ignore {
    isolation: isolate;
    display: inline-block;
  }

  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    .darkmode-toggle {display: none !important}
  }

  @supports (-ms-ime-align:auto), (-ms-accelerator:true) {
    .darkmode-toggle {display: none !important}
  }
`;

function addStyle(css) {
  const linkElement = document.createElement('link');

  linkElement.setAttribute('rel', 'stylesheet');
  linkElement.setAttribute('type', 'text/css');
  linkElement.setAttribute(
    'href',
    'data:text/css;charset=UTF-8,' + encodeURIComponent(css)
  );
  document.head.appendChild(linkElement);
}

this.addStyle(dark_look);

/*
background: ${options.mixColor};
transition: all ${options.time} ease;

.darkmode-background
    background: ${options.backgroundColor};
*/
