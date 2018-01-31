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

function redraw(canvas, card) {
  if (isUndef(card)) { return }

  if (isUndef(card['verbType'])) {
    draw(canvas, card);
    return;
  }
  // TODO: multiple image caching system
  // preload...
  images['verbType'] = new Image();
  images['verbType'].onload = function () {
    draw(canvas, card);
  };
  // handle failure
  images['verbType'].onerror = function(){

  };
  var imageSrc = kImagePath + fields['verbType'].path + card['verbType'] + '.png';
  console.log('****  imageSrc: ' + imageSrc);
  images['verbType'].src = imageSrc;

  // run... if loading will run again.
  draw(canvas, card);
}

function draw(canvas, card) {
  if (canvas == null) {
    console.log('CANVAS NULL');
    return;
  }

  let can = canvas;
  let ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, can.width, can.height);

  //
  //fillTemplate(ctx)
  drawArt(ctx);
  drawImageFull(ctx, images.bg);
  drawImage(ctx, images.border);
  drawImage(ctx, images.artBorder);

  var cardType = card['type'];

  if (isDef(cardType)) {
    if (cardType === 'verb') {
      drawImage(ctx, images.bgNeutral);
      drawImage(ctx, images.verbTitle);
      drawImage(ctx, images.verbText);

      var verbType = card['verbType'];
      if (isDef(verbType)) {
        drawImage(ctx, images.verbType);
      }
    }
  }

  //


  ctx.fillStyle = 'black';

  // loop through card data using index/property
  // which we use to determine the field
  for (var prop in card) {
    if (card.hasOwnProperty(prop)) {

      if (prop === 'name') {
        textLine(ctx, card[prop].toUpperCase(), unit(1.25), unit(2.23),
          kFontVerbTitle, 'center');
        continue;
      }

      drawField(ctx, fields[prop], card[prop])
    }
  }

  /*
  textLine(ctx, string, unit(1.2), unit(2.24),
    kFontVerbTitle, 'center');

  textFormatted(ctx, string, unit(0.37), unit(2.4), unit(1.8),
    kFontLoreLineHeight, kFontLore);

  textFormatted(ctx, string, unit(0.39), unit(2.95), unit(1.75),
    kFontGametextLineHeight, kFontGametext);
  */

}



/**
 * Draws a field
 * @param ctx     Current context to draw with.
 * @param field   The field definition being drawn.
 * @param value   The value this card has, ie. text or image.
 */
function drawField(ctx, field, value) {
  if (isUndef(field)) { return }
  var font = safeValue(field.font, kFontGametext);
  var align = safeValue(field.align, 'left');

  if (field.w === null) {
    // no .w means just text
    textLine(ctx, value, unit(field.x), unit(field.y), font, align);

  } else {
    // has .w means it's a multiline formatted field.
    var lineHeight = field.line;
    if (lineHeight === null) { lineHeight = kFontGametextLineHeight; }

    textFormatted(ctx, value, unit(field.x), unit(field.y),
      unit(field.w), lineHeight, font, align);

  }

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
  ctx.drawImage(img, 0, 0, kCanvasWidth, kCanvasHeight);
}

/**
 * Draws image centered on point. If x,y aren't given it centers
 * on the canvas.
 * @param ctx     Current context to draw with.
 * @param img     Image object to draw.
 * @param x       Center point x to draw at, pixels.
 * @param y       Center point y to draw at, pixels.
 */
function drawImage(ctx, img, x, y) {
  if (isUndef(img)) { return }
  if (isUndef(x)) { x = kCanvasWidth / 2; }
  if (isUndef(y)) { y = kCanvasHeight / 2; }
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
function inputArt(input) {
  var reader = new FileReader();
  reader.onload = function (e) {
    artImage = new Image();
    artImage.src = reader.result;

    // need to wait for image to load as well
    artImage.onload = function (e) {
      sizeArt();
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
  } catch (e) { alert(e + '\n\nCannot save when run from local file://') }
}
