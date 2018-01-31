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
