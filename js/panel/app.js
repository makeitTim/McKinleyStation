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
  computed: {
    cardTypes() {
      return cardTypeList;
    },
    panelFields() {
      return fetchPanelFor(this.card.type)
    }
  },
  methods: {
    input(event) {
      var canvasRef = this.$refs.canvas;
      var cardRef = this.card;
      inputArt(event.target, function() {
        // and redraw, TODO: is this the right way to call?
        // I know there is a caching issue where onload doesn;t call if exists
        cacheImagesAndDraw(canvasRef, cardRef);
      });
    },
    save(event) {
      saveCanvas(event.target, 'test');
    }
  },
  data: {
    // -------
    // Card data stored here. Given initial values
    'card': {
      'type': 'event',
      'property': 'tng',
      'name': 'RED ALERT!',
      'info': 'DC',
      'lore': 'The state of maximum crew and systems readiness aboard starships.',
      'gametext': `Plays on table. In place of your normal card play, you may report
for duty any number of Ship, Personnel, and Equipment cards.`
    }
    // -------
  },
  directives: {
    drawCard: function (canvasElement, binding) {
      cacheImagesAndDraw(canvasElement, binding.value);
    }
  },
  watch: {
    //card: function (newCard, oldCard) {
      // console.log('Card data changed');
      // TODO: when type has changed, reset data?
      // or should type changes be events?
    //}
  }

})