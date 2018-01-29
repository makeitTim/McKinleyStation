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
// Vuex

const store = new Vuex.Store({
  state: {
    count: 0,
    template: 0,
    image: 0,
    text: 0
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--
  }
})

// ______________________________________________________________________
// COMPONENTS

/// Field containing basic text input
var FieldText = Vue.extend({
  props: ['field', 'x'], // <input type="text" v-model="value" />
  template: `
    <div class="field">
      <label>{{ field.label }}</label>
      <input type="text" />
      <button v-if="x" class="close">&times;</button>
    </div>`
})
Vue.component('field-text', FieldText)

/// Field containing larger text area
var FieldTextArea = Vue.extend({
  props: ['field', 'x'], // <textarea rows="4" v-model="value"></textarea>
  template: `
    <div class="field field-column">
      <div class="field-row">
        <label>{{ field.label }}</label>
        <button v-if="x" class="close">&times;</button>
      </div>
      <textarea rows="4"></textarea>
    </div>`
})
Vue.component('field-textarea', FieldTextArea)

/// Field containing dropdown select
var FieldSelect = Vue.extend({
  props: ['field', 'x'], // <select v-model="value">
  template: `
    <div class="field">
    <label>{{ field.label }}</label>
    <select>
      <option v-for="(v, k) in field.options" :value="k"> {{v}} </option>
    </select>
    <button v-if="x" class="close">&times;</button>
  </div>`
})
Vue.component('field-select', FieldSelect)

/// Smart field wrapper. Displays correct field type.
var FieldSmart = Vue.extend({
  props: ['index', 'x'],
  computed: {
    field() {
      var fieldDef = fields[this.index];
      if (fieldDef === null) { fieldDef = createDefaultField(this.index); }
      return fieldDef;
    }
  },
  template: `
    <transition>
      <field-text v-if="field.panel === 'TEXT'" :field="field" :x="x">
      </field-text>
      <field-textarea v-if="field.panel === 'TEXTAREA'" :field="field" :x="x">
      </field-textarea>
      <field-select v-if="field.panel === 'SELECT'" :field="field" :x="x">
      </field-select>
    </transition>
  `
})
Vue.component('field-smart', FieldSmart)


// Extend Vue to get a reusable constructor
var MyComponent = Vue.extend({
  methods: {
    inputFor(item) {
      return item === store.state.count
    }
  },
  template: `
    <div>
    <transition>
      <div class="test one" v-if="inputFor(1)">1</div>
    </transition><transition>
      <div class="test two" v-if="inputFor(2)">2</div>
    </transition><transition>
      <div class="test three" v-if="inputFor(3)">3</div>
    </transition>

    </div>
  `
})
// Register the constructor with id: my-component
Vue.component('my-component', MyComponent)

// ______________________________________________________________________
// VUE APP

var app = new Vue({
  el: '#app',
  computed: {
    count() {
      return store.state.count
    }
  },
  methods: {
    fields(type) {
      return fieldList[type]
    },
    optionals(type) {
      return fieldListOptional[type]
    },
    increment() {
      store.commit('increment')
    },
    decrement() {
      store.commit('decrement')
    },
    input(event) {
      inputPhoto(event.target);
    },
    save(event) {
      saveCanvas(event.target, "test");
    }
  },


  data: {
    "exampleContent": "This is TEXT",
    "spacing": 0
  },
  directives: {
    insertMessage: function(canvasElement, binding) {
      redraw(canvasElement, binding.value, 1);
    }
  },
  watch: {
    exampleContent: function() {
      console.log("exampleContent changed to " + this.exampleContent);
    }
  }

})