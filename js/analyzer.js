let cvReady = false;

function onOpenCvReady() {
  cvReady = true;
}

function analyzeImage() {
  if (!cvReady) {
    console.error('OpenCV.js is not ready yet!');
    return;
  }

  // Get the canvas element
  const canvas = document.getElementById('resultCanvas');

  // Read the image data from the canvas
  let src = cv.imread(canvas);

  // Convert to grayscale
  let gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

  // Detect keypoints using ORB
  const nfeatures = 5000;
  let orb = new cv.ORB(nfeatures);
  let keypoints = new cv.KeyPointVector();

  orb.detect(gray, keypoints);

  // Get the number of keypoints
  let numKeypoints = keypoints.size();

  // Update the header with the number of features
  let resultHeader = document.getElementById('resultHeader');
  resultHeader.innerText = `Result - Features Detected: ${numKeypoints === 5000 ? numKeypoints+'+' : numKeypoints}`;

  // Clean up
  src.delete();
  gray.delete();
  orb.delete();
  keypoints.delete();
}

// Define Module for OpenCV.js
if (typeof Module === 'undefined') {
  Module = {};
}

Module.onRuntimeInitialized = function() {
  onOpenCvReady();
};
