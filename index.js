
// https://stackoverflow.com/a/64744763 how to blur, take image gradient w/ soble, and normalize

const { createCanvas, loadImage } = require('canvas');
const { writeFile, stat, mkdir} = require("fs");
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

  // TODO don't think blur is needed, or normalization for that matter

  cv.Sobel(src, dstx, cv.CV_8U, 1, 0, 3, 1, 0, cv.BORDER_DEFAULT);
  cv.Sobel(src, dsty, cv.CV_8U, 0, 1, 3, 1, 0, cv.BORDER_DEFAULT);

  let sobelx2 = new cv.Mat();
  let sobely2 = new cv.Mat();
  cv.multiply(dstx, dstx, sobelx2);
  cv.multiply(dsty, dsty, sobely2);

  // TODO take magnitude or sqrt of sobelx2 + sobelxy 
  // learn about matrix operations in opencv js here 
  // https://docs.opencv.org/3.4/dd/d4d/tutorial_js_image_arithmetics.html

  
  const canvasOutputx = createCanvas(300, 300);
  const canvasOutputy = createCanvas(300, 300);

  cv.imshow(canvasOutputx, dstx);
  cv.imshow(canvasOutputy, dsty);

  // move file utils below to separate file/function
  // https://stackoverflow.com/a/26815894/16952248
  // writeFile('outputX.jpg', canvasOutputx.toBuffer('image/jpeg'), (err) => {
  //   console.log("done writing outputx");
  // });
  
  // writeFile('outputY.jpg', canvasOutputy.toBuffer('image/jpeg'), (err) => {
  //   console.log("done writing outputy");
  // });

  src.delete(); 
  dstx.delete();
  dsty.delete();
  sobelx2.delete();
  sobely2.delete();
})();

