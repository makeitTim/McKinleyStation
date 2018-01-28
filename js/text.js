/*
 *   text.js
 *   Created Jan. 28, 2018 by Tim
 *
 *   .    .  __  . . . .   . .    __ .  .    ________ . _____ .  __  .  .
 *   |\  /| /    |/  | | \ | |   /__ \__|   (__   |  /_\  |   | /  \ |\ |
 *   | \/ | \__  | \ | |  \| |__ \__  __/   ___\  | /   \ |   | \__/ | \|
 *   
 *   Tools for drawing text in the canvas, one of the most complicated
 *   parts of this app. We require multiline text in various rectangles
 *   with built in formatting and icons.
 * 
 *   These methods should only work in pixels
 */

// TODO: letter spacing/kerning
//    ctx.canvas.style.letterSpacing = spacing + 'px';

/**
 * Draws single line plain text from point. All units in pixels.
 * @param ctx     Current context to draw text in.
 * @param text    String to draw.
 * @param x       Origin point x on canvas in pixels.
 * @param y       Origin y in pixels, baseline is middle.
 * @param font    Font with sizing.
 * @param align   left, center, right from point, default: left
 */
function textLine(ctx, text, x, y, font, align = 'left') {
  if (ctx == null) { return }
  if (text == null) { return }
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.font = font;
  ctx.fillText(text, x, y);
}

/**
 * Draws multiline formatted text. All units in pixels.
 * @param ctx     Current context to draw text in.
 * @param text    String to draw.
 * @param x       Origin point x on canvas in pixels.
 * @param y       Origin y in pixels, baseline is middle.
 * @param w       Maximum width of line before going to next.
 * @param line    Line height, y added for each new line.
 * @param font    Font with sizing.
 * @param align   left, center, right from point, default: left
 */
function textFormatted(ctx, text, x, y, w, line, font, align = 'left') {
  if (ctx == null) { return }
  if (text == null) { return }

  // x, y will be added to as we draw words

  // defines the left and right margins of the text
  var origX = x;
  var max = origX + w;

  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.font = font;

  var space = ctx.measureText(' ').width;

  var word = text.split(' ');
  var width = 0;
  for (var i = 0, len = word.length; i < len; i++) {
    width = ctx.measureText(word[i]).width;
    if (x !== origX && (x + width) > max) {
      // this word will go beyond line width, so go to next
      x = origX;
      y += line;
    }
    ctx.fillText(word[i], x, y);
    x += width + space;
  }

}


//
//
//
//

/**
 * @param canvas : The canvas object where to draw . 
 *                 This object is usually obtained by doing:
 *                 canvas = document.getElementById('canvasId');
 * @param x     :  The x position of the rectangle.
 * @param y     :  The y position of the rectangle.
 * @param w     :  The width of the rectangle.
 * @param h     :  The height of the rectangle.
 * @param text  :  The text we are going to centralize.
 * @param fh    :  The font height (in pixels).
 * @param spl   :  Vertical space between lines
 */
paint_centered_wrap = function(canvas, x, y, w, h, text, fh, spl) {
  // The painting properties 
  // Normally I would write this as an input parameter
  var Paint = {
      RECTANGLE_STROKE_STYLE : 'black',
      RECTANGLE_LINE_WIDTH : 1,
      VALUE_FONT : '12px Arial',
      VALUE_FILL_STYLE : 'red'
  }
  /*
   * @param ctx   : The 2d context 
   * @param mw    : The max width of the text accepted
   * @param font  : The font used to draw the text
   * @param text  : The text to be splitted   into 
   */
  var split_lines = function(ctx, mw, font, text) {
      // We give a little "padding"
      // This should probably be an input param
      // but for the sake of simplicity we will keep it
      // this way
      mw = mw - 10;
      // We setup the text font to the context (if not already)
      ctx2d.font = font;
      // We split the text by words 
      var words = text.split(' ');
      var new_line = words[0];
      var lines = [];
      for(var i = 1; i < words.length; ++i) {
         if (ctx.measureText(new_line + " " + words[i]).width < mw) {
             new_line += " " + words[i];
         } else {
             lines.push(new_line);
             new_line = words[i];
         }
      }
      lines.push(new_line);
      // DEBUG 
      // for(var j = 0; j < lines.length; ++j) {
      //    console.log("line[" + j + "]=" + lines[j]);
      // }
      return lines;
  }
  // Obtains the context 2d of the canvas 
  // It may return null
  var ctx2d = canvas.getContext('2d');
  if (ctx2d) {
      // draw rectangular
      ctx2d.strokeStyle=Paint.RECTANGLE_STROKE_STYLE;
      ctx2d.lineWidth = Paint.RECTANGLE_LINE_WIDTH;
      ctx2d.strokeRect(x, y, w, h);
      // Paint text
      var lines = split_lines(ctx2d, w, Paint.VALUE_FONT, text);
      // Block of text height
      var both = lines.length * (fh + spl);
      if (both >= h) {
          // We won't be able to wrap the text inside the area
          // the area is too small. We should inform the user 
          // about this in a meaningful way
      } else {
          // We determine the y of the first line
          var ly = (h - both)/2 + y + spl*lines.length;
          var lx = 0;
          for (var j = 0, ly; j < lines.length; ++j, ly+=fh+spl) {
              // We continue to centralize the lines
              lx = x+w/2-ctx2d.measureText(lines[j]).width/2;
              // DEBUG 
              console.log("ctx2d.fillText('"+ lines[j] +"', "+ lx +", " + ly + ")");
              ctx2d.fillText(lines[j], lx, ly);
          }
      }
  } else {
  // Do something meaningful
  }
}