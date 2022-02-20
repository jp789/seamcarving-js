
const { Canvas, Image, ImageData } = require('canvas');
const { JSDOM } = require('jsdom');

module.exports = {
  // Load opencv.js just like before but using Promise instead of callbacks:
  loadOpenCV: function () {
    return new Promise(resolve => {
      global.Module = {
        onRuntimeInitialized: resolve
      };
      global.cv = require('./opencv.js');
    });
  },
  // Using jsdom and node-canvas we define some global variables to emulate HTML DOM.
  // Although a complete emulation can be archived, here we only define those globals used
  // by cv.imread() and cv.imshow().
  installDOM : function () {
    const dom = new JSDOM();
    global.document = dom.window.document;
    // The rest enables DOM image and canvas and is provided by node-canvas
    global.Image = Image;
    global.HTMLCanvasElement = Canvas;
    global.ImageData = ImageData;
    global.HTMLImageElement = Image;
  }
}