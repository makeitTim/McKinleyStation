/*
 *   app.js
 *   Created Jan. 25, 2018 by Tim
 *
 *   .    .  __  . . . .   . .    __ .  .    ________ . _____ .  __  .  .
 *   |\  /| /    |/  | | \ | |   /__ \__|   (__   |  /_\  |   | /  \ |\ |
 *   | \/ | \__  | \ | |  \| |__ \__  __/   ___\  | /   \ |   | \__/ | \|
 *   
 *   Setup Vue-based user interface.
 */

var app = new Vue({
  el: '#app',
  methods: {
    fields(type) {
      return fieldList[type]
    },
    optionals(type) {
      return fieldListOptional[type]
    },
    input(event) {
      inputArt(event.target);
    },
    save(event) {
      saveCanvas(event.target, 'test');
    }
  },
  data: {
    // -------
    // Card data stored here, with initial values
    'card': {
      'type': 'verb',
      'verbType': 'event',
      'property': 'tng',
      'name': 'Red Alert!',
      'info': 'DC',
      'lore': 'The state of maximum crew and systems readiness aboard starships.',
      'gametext': `Plays on table. In place of your normal card play, you may report
for duty any number of Ship, Personnel, and Equipment cards.`
    }
    // -------
  },
  directives: {
    drawCard: function (canvasElement, binding) {
      redraw(canvasElement, binding.value);
    }
  },
  //watch: {
  //  card: function () {
  //    console.log('Card data changed');
  //  }
  //}

})