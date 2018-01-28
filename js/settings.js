/*
 *   settings.js
 *   Created Jan. 26, 2018 by Tim
 *
 *   .    .  __  . . . .   . .    __ .  .    ________ . _____ .  __  .  .
 *   |\  /| /    |/  | | \ | |   /__ \__|   (__   |  /_\  |   | /  \ |\ |
 *   | \/ | \__  | \ | |  \| |__ \__  __/   ___\  | /   \ |   | \__/ | \|
 *   
 *   Global settngs in one place
 */

/* ______________________________________________________________________
 * Units
 */

// Will be working at 354 x 494 pixels, this is ~141 DPI
// for 2.5 x 3.5 inches.
const kCanvasWidth = 354.0;
const kCanvasHeight = 494.0;

const kCanvasPPI = kCanvasHeight / 3.5;
const kCanvasPoint = kCanvasHeight / (3.5 * 72.0); 

const kImagePath = 'img/141/';

/**
 * Converts inch units to current canvas PPI.
 * @param inch  unit in inches
 * @return converted to canvas pixels
 */
function unit(inch) {
  return Math.round(inch * kCanvasPPI);
}

/** 
 * Converts font size points to current canvas PPI.
 * @param point  font size in points
 * @return converted to canvas pixels
 */
function fontPx(point) {
  return Math.round(point * kCanvasPoint);
}

/* ______________________________________________________________________
 * Fonts
 */

const kFontNounTitle = 'italic ' + fontPx(10) + 'px Gametext';
const kFontVerbTitle = fontPx(8) + 'px VerbSpacing';

const kFontLore = fontPx(7) + 'px Lore';
const kFontLoreLineHeight = fontPx(8);
const kFontGametext = fontPx(7) + 'px Gametext';
const kFontGametextLineHeight = fontPx(8);

const kFontInfo = fontPx(4.5) + 'px Gametext';