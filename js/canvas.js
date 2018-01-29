/*
 *   canvas.js
 *   Created Jan. 25, 2018 by Tim
 *
 *   .    .  __  . . . .   . .    __ .  .    ________ . _____ .  __  .  .
 *   |\  /| /    |/  | | \ | |   /__ \__|   (__   |  /_\  |   | /  \ |\ |
 *   | \/ | \__  | \ | |  \| |__ \__  __/   ___\  | /   \ |   | \__/ | \|
 *   
 *   Canvas functionality.
 */


// example of vue and canvas
// https://jsfiddle.net/mani04/r4mbh6nu/1/

var can = document.querySelector('canvas');

// can.width = can.offsetWidth;

can.width = kCanvasWidth;
can.height = kCanvasHeight;

// set width if controls below canvas, just in case content wider
var controls = document.getElementById('controls');
controls.style.width = kCanvasWidth + 'px';


/* ______________________________________________________________________
 * Image assets preloader
 */

var images = {};
var sources = {
  bg: "templates/bb.png",
  bgNeutral: "templates/bg_neutral.png",
  border: "templates/border.png",
  artBorder: "templates/border_art.png",
  verbTitle: "templates/title_verb.png",
  verbText: "templates/text_verb.png"
};
function loadImages(sources) {  // , callback) {
  var loadedImages = 0;
  var numImages = 0;
  // get num of sources
  for (var src in sources) {
    numImages++;
  }
  for (var src in sources) {
    images[src] = new Image();

    images[src].onload = function () {
      if (++loadedImages >= numImages) {
        redraw(can);
      }
    };

    // fixed "tainted" error when saving, but moced CORS issue to here.
    //images[src].crossOrigin = "Anonymous";

    images[src].src = kImagePath + sources[src];
  }
}
loadImages(sources);


//[].forEach.call(inp,function(inp){ inp.addEventListener('input', redraw, false) });

/* ______________________________________________________________________
 * Redraw convas method
 */

function redraw(canvas, card) {
  if (canvas == null) {
    console.log("CANVAS NULL");
    return;
  }

  let can = canvas;
  let ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, can.width, can.height);

  //
  //fillTemplate(ctx)
  drawArt(ctx);
  drawFull(ctx, images.bg);
  drawTemplate(ctx, images.bgNeutral);
  drawTemplate(ctx, images.border);
  drawTemplate(ctx, images.artBorder);
  drawTemplate(ctx, images.verbTitle);
  drawTemplate(ctx, images.verbText);
  //


  ctx.fillStyle = "black";

  // loop through card data using index/property
  // which we use to determine the field
  for (var prop in card) {
    if (card.hasOwnProperty(prop)) {

      if (prop === "name") {
        textLine(ctx, card[prop], unit(1.2), unit(2.24),
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
 * Draws image over entire canvas
 * @param ctx     Current context to draw with.
 * @param field   The field definition being drawn.
 * @param value   The value this card has, ie. text or image.
 */
function drawField(ctx, field, value) {

  var font = field.font;
  if (font === null) { font = kFontGametext; }

  var align = field.align;
  if (align === null) { align = 'left'; }

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
 * Draws image over entire canvas
 * @param ctx    Current context to draw with.
 * @param img    Image object to draw.
 */
function drawFull(ctx, img) {
  ctx.drawImage(img, 0, 0, kCanvasWidth, kCanvasHeight);
}

/**
 * Draws image inside a 0.11 inch margin
 * @param ctx    Current context to draw with.
 * @param img    Image object to draw.
 */
function drawTemplate(ctx, img) {
  let m = unit(0.11);
  ctx.drawImage(img, m, m);
}

/**
 * Fills template area with black rect, for verb cards.
 * @param ctx    Current context to draw with.
 */
function fillTemplate(ctx) {
  let m = unit(0.14); // margin little larger
  ctx.fillRect(m, m, kCanvasWidth - (m * 2), kCanvasHeight - (m * 2));
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

  //console.log("PHOTO FRAME: " + frameX + ", " + frameY + ", " + frameW + ", " + frameH);
  // 49, 96, 254, 183

  var frameRatio = frameW / frameH;
  var artRatio = artImage.width / artImage.height;

  //console.log("PHOTO Src: " + artImage.width + ", " + artImage.height);
  //console.log("frameRatio: " + frameRatio + "   artRatio: " + artRatio);

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
  } catch (e) { alert(e + "\n\nCannot save when run from local file://") }
}
