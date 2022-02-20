
// https://stackoverflow.com/a/64744763 how to blur, take image gradient w/ soble, and normalize

const { createCanvas, loadImage } = require('canvas');
const { writeFileSync,} = require("fs");
const {loadOpenCV, installDOM} = require("./utils");

(async () => {
  // before loading opencv.js we emulate a minimal HTML DOM. See the function declaration below.
  installDOM();
  await loadOpenCV();
  // using node-canvas, we an image file to an object compatible with HTML DOM Image and therefore with cv.imread()
  const image = await loadImage('./images/wide_castle.jpg');
  const src = cv.imread(image);
  const dst = new cv.Mat();
  const M = cv.Mat.ones(5, 5, cv.CV_8U);
  const anchor = new cv.Point(-1, -1);
  cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
  // we create an object compatible HTMLCanvasElement
  const canvas = createCanvas(300, 300);
  cv.imshow(canvas, dst);
  writeFileSync('output.jpg', canvas.toBuffer('image/jpeg'));
  src.delete();
  dst.delete();
})();

