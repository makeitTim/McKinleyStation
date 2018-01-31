/*
 *   images.js
 *   Created Jan. 25, 2018 by Tim
 *
 *   .    .  __  . . . .   . .    __ .  .    ________ . _____ .  __  .  .
 *   |\  /| /    |/  | | \ | |   /__ \__|   (__   |  /_\  |   | /  \ |\ |
 *   | \/ | \__  | \ | |  \| |__ \__  __/   ___\  | /   \ |   | \__/ | \|
 *   
 *   The image caching and drawing code.
 */


 // http://fragged.org/preloading-images-using-javascript-the-right-way-and-without-frameworks_744.html



/* ______________________________________________________________________
 * Image assets preloader
 */

var images = {};
var sources = {
  bg: 'templates/bb.png',
  bgNeutral: 'templates/bg_neutral.png',
  border: 'templates/border.png',
  artBorder: 'templates/border_art.png',
  verbTitle: 'templates/title_verb.png',
  verbText: 'templates/text_verb.png'
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

    // fixed 'tainted' error when saving, but moced CORS issue to here.
    //images[src].crossOrigin = 'Anonymous';

    images[src].src = kImagePath + sources[src];
  }
}
loadImages(sources);
