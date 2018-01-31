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


/// Images stored here
var images = {};

/// Keeps track of images being loaded. when returns to 0, attempt redraw.
var imageLoadingCount = 0;

/// When imageLoadingCount is reset, this is called.
/// Will be set by the drawing method itself.
var imageLoadingDone = null;

/**
 * Returns image if already stored. Otherwise, loads it and returns null.
 * 
 * @param src       img path, well be appended kImagePath + src + '.png'
 * @return image object for the src.
 */
function fetchImageFor(src) {
  // src is a path, ie. 'templates/bb.png', so to clean to use as index.
  let index = src.replace('/', '_');


  if (images.hasOwnProperty(index)) {
    //console.log('*** IMG Found: ' + index);
    return images[index]
  }

  // not there? load it
  images[index] = new Image();
  imageLoadingCount++;
  images[index].onload = function () {
    if (--imageLoadingCount <= 0) {
      imageLoadingCount = 0; // just incase something weird.
      // callback method if exists
      if (imageLoadingDone !== null) { imageLoadingDone() }
    }
  };
  images[index].src = kImagePath + src + '.png';

  //console.log('*** IMG loading: ' + kImagePath + src + '.png');
  return null;
}
