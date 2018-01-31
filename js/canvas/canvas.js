/*
 *   canvas.js
 *   Created Jan. 25, 2018 by Tim
 *
 *   .    .  __  . . . .   . .    __ .  .    ________ . _____ .  __  .  .
 *   |\  /| /    |/  | | \ | |   /__ \__|   (__   |  /_\  |   | /  \ |\ |
 *   | \/ | \__  | \ | |  \| |__ \__  __/   ___\  | /   \ |   | \__/ | \|
 *   
 *   Canvas functionality. Art also managed here.
 */

function cacheImagesAndDraw(canvas, card) {
  if (isUndef(canvas)) { return }
  if (isUndef(card)) { return }

  imageLoadingDone = function () {
    draw(canvas, card);
  }

  // draw
  draw(canvas, card);
}

function draw(canvas, card) {
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, kCanvasWidth, kCanvasHeight);

  // all text is default black.
  ctx.fillStyle = 'black';

  var cardType = safeValue(card['type'], 'event');

  // draw the art, if exists.
  drawArt(ctx);

  // draw the black border. TODO: border options
  drawImageFull(ctx, fetchImageFor('templates/bb'));

  var renders = fetchDrawFor(cardType, card);

  for (var i = 0, len = renders.length; i < len; i++) {
    let render = renders[i];

    if (render.hasOwnProperty('r')) {
      // load corresponding value from card object, if exists
      var value;
      if (render.hasOwnProperty('prop')) {
        value = card[render.prop];
      }

      if (render.r === 'IMG') {
        drawImageWithRender(ctx, render, value);

      } else if (render.r === 'TEXT') {
        drawTextWithRender(ctx, render, value);

      } else if (render.r === 'FORMAT') {
        drawFormattedTextWithRender(ctx, render, value);

      }
    }
  }

}

/* ______________________________________________________________________
 * Text Drawing Helpers
 */

/**
 * Draws single line text with parameters from render.
 * @param ctx     Current context to draw with.
 * @param render  Render drawing parameters
 * @param value   Text to draw
 */
function drawTextWithRender(ctx, render, value) {
  var font = safeValue(render.font, kFontGametext);
  var align = safeValue(render.align, 'left');

  textLine(ctx, value, unit(render.x), unit(render.y), font, align);
}

/**
 * Draws multiline text using format with parameters from render.
 * @param ctx     Current context to draw with.
 * @param render  Render drawing parameters
 * @param value   Text to draw
 */
function drawFormattedTextWithRender(ctx, render, value) {
  var font = safeValue(render.font, kFontGametext);
  var align = safeValue(render.align, 'left');
  var lineHeight = safeValue(render.line, kFontGametextLineHeight);

  textFormatted(ctx, value, unit(render.x), unit(render.y),
      unit(render.w), lineHeight, font, align);
}



/* ______________________________________________________________________
 * Image Drawing Helpers
 */

/**
 * Draws image over entire canvas.
 * @param ctx     Current context to draw with.
 * @param img     Image object to draw.
 */
function drawImageFull(ctx, img) {
  if (isUndef(img)) { return }
  ctx.drawImage(img, 0, 0, kCanvasWidth, kCanvasHeight);
}

/**
 * Uses below drawImage() method with parameters from render.
 * @param ctx     Current context to draw with.
 * @param render  Render drawing parameters
 * @param value   Value if set, used to find image name
 */
function drawImageWithRender(ctx, render, value) {
  var src = '';
  if (render.hasOwnProperty('path')) {
    src += render.path;
  }
  if (render.hasOwnProperty('img')) {
    src += render.img;
  } else {
    if (isUndef(value)) { return }
    src += value;
  }

  drawImage(ctx, fetchImageFor(src), render.x, render.y);
}

/**
 * Draws image centered on point. If x,y aren't given it centers
 * on the canvas.
 * @param ctx     Current context to draw with.
 * @param img     Image object to draw.
 * @param x       Center point x to draw at, in inches.
 * @param y       Center point y to draw at, in inches.
 */
function drawImage(ctx, img, x, y) {
  if (isUndef(img)) { return }
  if (isUndef(x)) { x = kCanvasWidth / 2; }
  else { x = unit(x) }
  if (isUndef(y)) { y = kCanvasHeight / 2; }
  else { y = unit(y) }
  x -= img.width / 2;
  y -= img.height / 2;
  ctx.drawImage(img, x, y);
}


/* ______________________________________________________________________
 * Art
 */

var artImage = null;
var artX = 0, artY = 0, artW = 0, artH = 0;
function drawArt(context) {
  if (artImage == null) { return; }
  // TODO: aspect ratio and center ahead of time.
  context.drawImage(artImage, artX, artY, artW, artH);
}
function inputArt(input, completion) {
  var reader = new FileReader();
  reader.onload = function (e) {
    artImage = new Image();
    artImage.src = reader.result;

    // need to wait for image to load as well
    artImage.onload = function (e) {
      sizeArt();
      if (isDef(completion)) { completion() }
    }

  }
  reader.readAsDataURL(input.files[0]);
}

function sizeArt() {
  // calculate placement, for now just fit with aspect ratio.
  // TODO: more advanced art placement options, missions, etc.
  var frameX = unit(0.35);
  var frameY = unit(0.68);
  var frameW = unit(1.8);
  var frameH = unit(1.3);

  //console.log('PHOTO FRAME: ' + frameX + ', ' + frameY + ', ' + frameW + ', ' + frameH);
  // 49, 96, 254, 183

  var frameRatio = frameW / frameH;
  var artRatio = artImage.width / artImage.height;

  //console.log('PHOTO Src: ' + artImage.width + ', ' + artImage.height);
  //console.log('frameRatio: ' + frameRatio + '   artRatio: ' + artRatio);

  if (artRatio > frameRatio) {
    // art image is wider
    artY = frameY;
    artH = frameH;
    artW = frameH * artRatio;
    artX = frameX - ((artW - frameW) * 0.5);

  } else if (artRatio < frameRatio) {
    // art image is taller
    artX = frameX;
    artW = frameW;
    artH = frameW * (artImage.height / artImage.width);
    artY = frameY - ((artH - frameH) * 0.5);

  } else { // correct ratio unlikely, just for reference
    artX = frameX;
    artY = frameY;
    artW = frameW;
    artH = frameH;
  }
}

/* ______________________________________________________________________
 * Saving
 */

/**
 * Saves contents of canvas to download parameter of link.
 * @param el    link pressed to download image
 * @param name  filename for image without extension.
 */
function saveCanvas(el, name) {
  var canvas = document.querySelector('canvas');
  el.removeAttribute('download');
  try {
    el.href = canvas.toDataURL('image/png');
    el.download = name + '.png';
    //el.href = canvas.toDataURL('image/jpeg', 0.92);
    //el.download = name + '.jpg';
  } catch (e) { alert(e + '\n\nCannot save when run from local file://\nCORS. Could load images from web server or dev with cli/node.') }
}
