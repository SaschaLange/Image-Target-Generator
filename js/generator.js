// Event Listeners
document.addEventListener("DOMContentLoaded", generateImage);

document
  .getElementById("generateButton")
  .addEventListener("click", generateImage);

document
  .getElementById("downloadButton")
  .addEventListener("click", downloadImage);

/**
 * Generates 5 shades of a given base color in hexadecimal format.
 *
 * @param {string} colorHex - The color in hexadecimal format.
 * @returns {string[]} An array of shades in hexadecimal format.
 */
function generateShades(colorHex) {
  const shades = [];
  const hsl = HEXtoHSL(colorHex);

  // Two darker shades
  for (let i = 1; i <= 2; i++) {
    let l = Math.max(0, hsl.l - i * 10);
    shades.push(HSLtoHEX(hsl.h, hsl.s, l));
  }

  // Original color
  shades.push(colorHex);

  // Two lighter tints
  for (let i = 1; i <= 2; i++) {
    let l = Math.min(100, hsl.l + i * 10);
    shades.push(HSLtoHEX(hsl.h, hsl.s, l));
  }

  return shades;
}


/**
 * Converts a hexadecimal color value to HSL (Hue, Saturation, Lightness) format.
 * @param {string} H - The hexadecimal color value to convert.
 * @returns {Object} An object containing the HSL values.
 */
function HEXtoHSL(H) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length === 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length === 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  return { h, s: s * 100, l: l * 100 };
}

/**
 * Converts HSL (Hue, Saturation, Lightness) color values to HEX color format.
 *
 * @param {number} h - The hue value (0-360).
 * @param {number} s - The saturation value (0-100).
 * @param {number} l - The lightness value (0-100).
 * @returns {string} The HEX color representation.
 */
function HSLtoHEX(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255)
    .toString(16)
    .padStart(2, "0");
  g = Math.round((g + m) * 255)
    .toString(16)
    .padStart(2, "0");
  b = Math.round((b + m) * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${r}${g}${b}`;
}

// Define columns and rows for different aspect ratios
const columsAndRows = {
  "4:3": [16, 12],
  "16:9": [20, 12],
  "1:1": [12, 12],
};

/**
 * Draws a 'Mazzanti' pattern using triangles and ellipses on a canvas context.
 * 
 * This function is inspired and uses parts of the work by Dario Mazzanti (darmaz@gmail.com), 2014
 * https://www.dariomazzanti.com/uncategorized/ar-image-target-generation-vuforia/
 *
 * @param {number} aspectRatioValue - The aspect ratio value.
 * @param {number} width - The width of the canvas.
 * @param {number} height - The height of the canvas.
 * @param {string} markerBackground - The background color of the marker.
 * @param {string[]} colors - An array of colors to be used for drawing.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 */
function drawPatternMazzanti(
  aspectRatioValue,
  width,
  height,
  markerBackground,
  colors,
  ctx
) {
  // Background color
  ctx.fillStyle = markerBackground;
  ctx.fillRect(0, 0, width, height);

  const columns = columsAndRows[aspectRatioValue][0];
  const rows = columsAndRows[aspectRatioValue][1];

  const xIncr = width / columns;
  const yIncr = height / rows;

  // Draw triangles
  for (let xPos = 0; xPos < width; xPos += xIncr * 2) {
    for (let yPos = 0; yPos < height; yPos += yIncr * 2) {
      // Triangles 1 to 4
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.beginPath();

        switch (i) {
          case 0:
            ctx.moveTo(xPos, yPos);
            ctx.lineTo(xPos + xIncr, yPos);
            ctx.lineTo(xPos + xIncr, yPos + yIncr);
            break;
          case 1:
            ctx.moveTo(xPos, yPos);
            ctx.lineTo(xPos, yPos + yIncr);
            ctx.lineTo(xPos + xIncr, yPos + yIncr);
            break;
          case 2:
            ctx.moveTo(xPos + xIncr, yPos);
            ctx.lineTo(xPos + 2 * xIncr, yPos);
            ctx.lineTo(xPos + xIncr, yPos + yIncr);
            break;
          case 3:
            ctx.moveTo(xPos + 2 * xIncr, yPos);
            ctx.lineTo(xPos + xIncr, yPos + yIncr);
            ctx.lineTo(xPos + 2 * xIncr, yPos + yIncr);
            break;
        }

        ctx.closePath();
        ctx.fill();
      }

      // Triangles 5 to 8
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.beginPath();

        switch (i) {
          case 0:
            ctx.moveTo(xPos, yPos + yIncr);
            ctx.lineTo(xPos, yPos + 2 * yIncr);
            ctx.lineTo(xPos + xIncr, yPos + yIncr);
            break;
          case 1:
            ctx.moveTo(xPos, yPos + 2 * yIncr);
            ctx.lineTo(xPos + xIncr, yPos + 2 * yIncr);
            ctx.lineTo(xPos + xIncr, yPos + yIncr);
            break;
          case 2:
            ctx.moveTo(xPos + xIncr, yPos + yIncr);
            ctx.lineTo(xPos + 2 * xIncr, yPos + yIncr);
            ctx.lineTo(xPos + 2 * xIncr, yPos + 2 * yIncr);
            break;
          case 3:
            ctx.moveTo(xPos + xIncr, yPos + yIncr);
            ctx.lineTo(xPos + xIncr, yPos + 2 * yIncr);
            ctx.lineTo(xPos + 2 * xIncr, yPos + 2 * yIncr);
            break;
        }

        ctx.closePath();
        ctx.fill();
      }
    }
  }

  // Draw random ellipses
  const totalShapes = Math.floor(1.5 * columns * rows);
  for (let i = 0; i < totalShapes; i++) {
    const size = Math.random() * (xIncr - xIncr / 10) + xIncr / 10;
    const col = colors[Math.floor(Math.random() * colors.length)] + "D2"; // Adding alpha

    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.ellipse(
      Math.random() * width,
      Math.random() * height,
      size / 2,
      size / 2,
      0,
      0,
      2 * Math.PI
    );
    ctx.closePath();
    ctx.fill();
  }
}

/**
 * Draws a chaotic pattern on the canvas using triangles, circles and rectangles.
 *
 * @param {number} aspectRatioValue - The aspect ratio value.
 * @param {number} width - The width of the canvas.
 * @param {number} height - The height of the canvas.
 * @param {string} markerBackground - The background color of the canvas.
 * @param {string[]} colors - An array of colors to choose from.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 */
function drawPatternChaos(
  aspectRatioValue,
  width,
  height,
  markerBackground,
  colors,
  ctx
) {
  // Background color
  ctx.fillStyle = markerBackground;
  ctx.fillRect(0, 0, width, height);

  const columns = columsAndRows[aspectRatioValue][0];
  const rows = columsAndRows[aspectRatioValue][1];

  const totalShapes = columns * rows * 2; // Adjust the multiplier for density
  const maxSize = Math.min(width, height) / 10;

  for (let i = 0; i < totalShapes; i++) {
    // Randomly choose shape type: circle, rectangle, triangle
    const shapeType = Math.floor(Math.random() * 3);
    const size = Math.random() * maxSize;
    const x = Math.random() * width;
    const y = Math.random() * height;
    const color = colors[Math.floor(Math.random() * colors.length)];

    ctx.fillStyle = color;

    switch (shapeType) {
      case 0: // Circle
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        break;
      case 1: // Rectangle
        ctx.fillRect(x, y, size, size);
        break;
      case 2: // Triangle
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size / 2, y - size);
        ctx.closePath();
        ctx.fill();
        break;
    }
  }
}


/**
 * Draws a dot matrix pattern on the canvas using squares.
 *
 * @param {number} aspectRatioValue - The aspect ratio value.
 * @param {number} width - The width of the canvas.
 * @param {number} height - The height of the canvas.
 * @param {string} markerBackground - The background color of the marker.
 * @param {string[]} colors - An array of colors to choose from.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 */
function drawPatternDotMatrix(
  aspectRatioValue,
  width,
  height,
  markerBackground,
  colors,
  ctx
) {
  // Background color
  ctx.fillStyle = markerBackground;
  ctx.fillRect(0, 0, width, height);

  const columns = columsAndRows[aspectRatioValue][0];
  const rows = columsAndRows[aspectRatioValue][1];

  const xIncr = width / columns;
  const yIncr = height / rows;
  const rectLength = Math.min(xIncr, yIncr) / 2;
  const offset = rectLength / 2;

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * xIncr + xIncr / 2;
      const y = j * yIncr + yIncr / 2;

      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillRect(x - offset, y - offset, rectLength, rectLength);
      ctx.fill();
    }
  }
}


/**
 * Draws a border around a canvas context.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {number} width - The width of the canvas.
 * @param {number} height - The height of the canvas.
 * @param {string} borderColor - The color of the border.
 */
function drawBorder(ctx, width, height, borderColor) {
  // Calculate border width as 7% of the shortest side
  const borderWidth = Math.min(width, height) * 0.07;

  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = borderColor;

  // Draw the border rectangle
  ctx.strokeRect(
    borderWidth / 2,
    borderWidth / 2,
    width - borderWidth,
    height - borderWidth
  );
}

/**
 * Generates the image marker based on user inputs.
 */
function generateImage() {
  // Get user inputs
  const dimensionSelection = document.getElementById(
    "dimension-selection"
  ).value;
  const dimensionValue = parseInt(
    document.getElementById("dimension-value").value
  );
  const aspectRatioValue = document.getElementById("aspect-ratio").value;
  const borderSelection = document.getElementById("border-selection").value;
  const patternStyle = document.getElementById("pattern-style").value;
  const markerbackground = document.getElementById("marker-background").value;
  const color1 =
    document.getElementById("color-1-picker-input").value || "#ff0000";
  const color2 =
    document.getElementById("color-2-picker-input").value || "#00ff00";
  const color3 =
    document.getElementById("color-3-picker-input").value || "#0000ff";

  // Validate hex codes
  const validHex = /^#([0-9A-F]{6})$/i;
  if (
    !validHex.test(color1) ||
    !validHex.test(color2) ||
    !validHex.test(color3)
  ) {
    alert("Please enter valid 6-digit hex color codes.");
    return;
  }

  // Calculate width and height based on aspect ratio and dimension selection
  let width, height;
  let [ratioWidth, ratioHeight] = aspectRatioValue.split(":").map(Number);

  if (dimensionSelection === "width") {
    width = dimensionValue;
    height = Math.round((dimensionValue * ratioHeight) / ratioWidth);
  } else {
    height = dimensionValue;
    width = Math.round((dimensionValue * ratioWidth) / ratioHeight);
  }

  // Set up canvas
  const canvas = document.getElementById("resultCanvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Generate shades and tints for each color
  const colorArray = [
    ...generateShades(color1),
    ...generateShades(color2),
    ...generateShades(color3),
  ];

  // Choose the pattern function based on patternStyle
  switch (patternStyle) {
    case "chaos":
      drawPatternChaos(
        aspectRatioValue,
        width,
        height,
        markerbackground,
        colorArray,
        ctx
      );
      break;
    case "dotmatrix":
      drawPatternDotMatrix(
        aspectRatioValue,
        width,
        height,
        markerbackground,
        colorArray,
        ctx
      );
      break;
    default:
      drawPatternMazzanti(
        aspectRatioValue,
        width,
        height,
        markerbackground,
        colorArray,
        ctx
      );
      break;
  }

  // Add border if selected
  if (borderSelection === "white" || borderSelection === "black") {
    drawBorder(ctx, width, height, borderSelection);
  }
  // Wait until OpenCV.js is ready
  function waitForOpenCV() {
    if (typeof cv !== "undefined" && cvReady) {
      analyzeImage();
    } else {
      setTimeout(waitForOpenCV, 50);
    }
  }

  waitForOpenCV();
}

/**
 * Downloads the image generated on the canvas as a PNG file.
 */
function downloadImage() {
  const canvas = document.getElementById("resultCanvas");
  const link = document.createElement("a");
  link.download = "ar_image_target.png";
  link.href = canvas.toDataURL();
  link.click();
}
