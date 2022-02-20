
// https://stackoverflow.com/a/64744763 how to blur, take image gradient w/ soble, and normalize

const { createCanvas, loadImage } = require('canvas');
const { writeFileSync,} = require("fs");
const {loadOpenCV, installDOM} = require("./utils");

(async () => {

  // before loading opencv.js we emulate a minimal HTML DOM. See the function declaration below.
  installDOM();
  await loadOpenCV();

  // use node-canvas to load an image file to an object compatible with HTML DOM Image (and cv.imread())
  const image = await loadImage('./images/wide_castle.jpg');
  const src = cv.imread(image);
  const dstx = new cv.Mat();
  const dsty = new cv.Mat();

  cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);

  // TODO add Gaussian blur before sobeling, and normalize after if needed

  cv.Sobel(src, dstx, cv.CV_8U, 1, 0, 3, 1, 0, cv.BORDER_DEFAULT);
  cv.Sobel(src, dsty, cv.CV_8U, 0, 1, 3, 1, 0, cv.BORDER_DEFAULT);
  
  const canvasOutputx = createCanvas(300, 300);
  const canvasOutputy = createCanvas(300, 300);

  cv.imshow(canvasOutputx, dstx);
  cv.imshow(canvasOutputy, dsty);

  // TODO write files to output folder
  // e.g. https://stackoverflow.com/questions/16316330/
  writeFileSync('outputX.jpg', canvasOutputx.toBuffer('image/jpeg'));
  writeFileSync('outputY.jpg', canvasOutputy.toBuffer('image/jpeg'));

  src.delete(); 
  dstx.delete();
  dsty.delete();
})();

