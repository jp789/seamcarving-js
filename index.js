
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
  console.log('image width: ' + src.cols + '\n' +
  'image height: ' + src.rows + '\n' +
  'image size: ' + src.size().width + '*' + src.size().height + '\n' +
  'image depth: ' + src.depth() + '\n' +
  'image channels ' + src.channels() + '\n' +
  'image type: ' + src.type() + '\n');
  cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
  // console.log('image width: ' + src.cols + '\n' +
  //           'image height: ' + src.rows + '\n' +
  //           'image size: ' + src.size().width + '*' + src.size().height + '\n' +
  //           'image depth: ' + src.depth() + '\n' +
  //           'image channels ' + src.channels() + '\n' +
  //           'image type: ' + src.type() + '\n');
  exit()
  // missing a normalization step at some point, because final output is overexposed
  cv.Sobel(src, dstx, cv.CV_64F, 1, 0, 3, 1, 0, cv.BORDER_DEFAULT);
  cv.Sobel(src, dsty, cv.CV_64F, 0, 1, 3, 1, 0, cv.BORDER_DEFAULT);

  let sobelx2 = new cv.Mat();
  let sobely2 = new cv.Mat();
  cv.multiply(dstx, dstx, sobelx2);
  cv.multiply(dsty, dsty, sobely2);

  
  let sobel_sq_sum = new cv.Mat();
  cv.add(sobelx2, sobely2, sobel_sq_sum);

  let sobel_mag = new cv.Mat()
  cv.sqrt(sobel_sq_sum, sobel_mag);

  // const canvasOutputx = createCanvas(300, 300);
  // const canvasOutputy = createCanvas(300, 300);
  const canvasOutput = createCanvas(300, 300);

  // cv.imshow(canvasOutputx, dstx);
  // cv.imshow(canvasOutputy, dsty);
  cv.imshow(canvasOutput, sobel_sq_sum);

  // move file utils below to separate file/function
  // https://stackoverflow.com/a/26815894/16952248
 
  // writeFile('output.jpg', canvasOutput.toBuffer('image/jpeg'), (err) => {
  //   console.log("done writing sobelmag");
  // });

  src.delete(); 
  dstx.delete();
  dsty.delete();
  sobelx2.delete();
  sobely2.delete();
  sobel_sq_sum.delete();
  sobel_mag.delete();
  // mask.delete();
})();

