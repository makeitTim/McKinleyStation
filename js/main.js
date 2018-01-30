/*
 *   main.js
 *   Created Jan. 25, 2018 by Tim
 *
 *   .    .  __  . . . .   . .    __ .  .    ________ . _____ .  __  .  .
 *   |\  /| /    |/  | | \ | |   /__ \__|   (__   |  /_\  |   | /  \ |\ |
 *   | \/ | \__  | \ | |  \| |__ \__  __/   ___\  | /   \ |   | \__/ | \|
 *   
 *   Setup Vue-based user interface.
 */

// ______________________________________________________________________
// COMPONENTS

/// Field containing basic text input
Vue.component('field-text', {
  props: ['field', 'x', 'value'],
  template: `
    <div class="field">
      <label>{{ field.label }}</label>
      <input type="text" :value="value" v-on:input="$emit('input', $event.target.value)" />
      <button v-if="x" class="close">&times;</button>
    </div>
  `
})

/// Field containing larger text area
Vue.component('field-textarea', {
  props: ['field', 'x', 'value'],
  template: `
    <div class="field field-column">
      <div class="field-row">
        <label>{{ field.label }}</label>
        <button v-if="x" class="close">&times;</button>
      </div>
      <textarea rows="4" :value="value" v-on:input="$emit('input', $event.target.value)">
      </textarea>
    </div>
  `
})

/// Field containing dropdown select
Vue.component('field-select', {
  props: ['field', 'x', 'value'],
  template: `
    <div class="field">
      <label>{{ field.label }}</label>
      <select :value="value" v-on:input="$emit('input', $event.target.value)">
        <option v-for="(v, k) in field.options" :value="v"> {{v}} </option>
      </select>
      <button v-if="x" class="close">&times;</button>
    </div>
  `
})

/// Smart field wrapper. Displays correct field panel.
Vue.component('field-smart', {
  props: ['index', 'x', 'value'],
  computed: {
    field() {
      var fieldDef = fields[this.index];
      if (fieldDef === null) { fieldDef = createDefaultField(this.index); }
      return fieldDef;
    }
  },
  template: `
    <transition>
      <field-text v-if="field.panel === 'TEXT'" :field="field" :x="x" v-model="value[index]">
      </field-text>
      <field-textarea v-if="field.panel === 'TEXTAREA'" :field="field" :x="x" v-model="value[index]">
      </field-textarea>
      <field-select v-if="field.panel === 'SELECT'" :field="field" :x="x" v-model="value[index]">
      </field-select>
    </transition>
  `
})


// ______________________________________________________________________
// VUE APP

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
      saveCanvas(event.target, "test");
    }
  },
  data: {
    // -------
    // Card data stored here, with initial values
    "card": {
      "type": "event",
      "name": "Red Alert!",
      "info": "DC",
      "lore": "The state of maximum crew and systems readiness aboard starships.",
      "gametext": `Plays on table. In place of your normal card play, you may report
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
  //    console.log("Card data changed");
  //  }
  //}

})