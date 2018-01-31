/*
 *   fields.js
 *   Created Jan. 27, 2018 by Tim
 *
 *   .    .  __  . . . .   . .    __ .  .    ________ . _____ .  __  .  .
 *   |\  /| /    |/  | | \ | |   /__ \__|   (__   |  /_\  |   | /  \ |\ |
 *   | \/ | \__  | \ | |  \| |__ \__  __/   ___\  | /   \ |   | \__/ | \|
 *   
 *   All fields are defined here in javascript objects.
 *   Each field is represented as an input in the panel, and drawn to
 *   the actual canvas. These are organised by card type, which will
 *   define when they are available.
 * 
 *   Field names will patch the property in the card json object that
 *   stores the corresponding values. So use camelCase for field names.
 * 
 *   Fields are collected arrays grouped by card type.
 * 
 *   Note, Card Type is not included here. It's hardcoded in index.html
 *   and directly wired in.
 */

/* ______________________________________________________________________
 * Field Lists
 */

/// Fields the cards must have (always shown) indexed by type or all
var fieldList = [];

/// Fields the cards may have (closable x) indexed by type or all
var fieldListOptional = [];

fieldList['all'] = [ 'name', 'info' ];
fieldListOptional['all'] = [ 'icon1', 'icon2', 'icon3' ];

fieldList['personnel'] = [ 'property', 'lore', 'skills' ];
fieldListOptional['personnel'] = [ 'personnelTemplate' ];

fieldList['verb'] = [ 'verbType', 'property', 'lore', 'gametext' ];
fieldListOptional['verb'] = [ 'verbTemplate' ];

/* ______________________________________________________________________
 * Field Definitions
 */

 // The x, y, and w (line width) units are in inches.
 // No w means could be multi line.
 // No align means left align.

/**
 * A default field definition used by the field component
 * if none of these match the above list
 * @param index   field index used for label
 * @return created field definition.
 */
function createDefaultField(index) {
  return { label: field, panel: 'TEXT' };
}

/// This array contains all the field definitions.
var fields = [];

// Card Name. verbs and nouns are different, and it's fundamental enough
// to just hardcode how it's drawn in the canvas code.
fields['name'] = {
  label: 'Card Name',
  panel: 'TEXT'
}

// verb card types, verbs are grouped together
fields['verbType'] = {
  label: 'Verb Card Type',
  panel: 'SELECT',
  options: [
    'artifact', 'dilemma_both', 'dilemma_planet', 'dilemma_space',
    'doorway', 'equipment', 'event', 'incident', 'interrupt', 'objective'
  ],
  default: 'artifact',
  render: 'IMG',
  path: 'templates/type_'
};

// verb text box
fields['verbTemplate'] = {
  label: 'Template',
  panel: 'SELECT',
  options: [ 'verb', 'verb_full', 'verb_4lines', 'verb_5lines' ],
  default: 'verb',
  render: 'IMG',
  path: 'templates/text_'
};

fields['property'] = {
  label: 'Property',
  panel: 'SELECT',
  options: [
    'tng', 'ds9', 'tos', 'voy', 'ds9', 'ent', 'starm', 'stccg',
    'st01', 'st02', 'st03', 'st04', 'st05', 'st06', 'st07', 'st08', 'st09', 'st10',
  ],
  default: 'tng',
  render: 'IMG',
  path: 'property/'
};

fields['info'] = {
  label: 'Collecter\'s Info',
  panel: 'TEXT',
  font: kFontInfo,
  x: 3.4, y: 2.3, align: 'center'
}

fields['icon1'] = {
  label: 'Icon 1',
  panel: 'TEXT'
}
fields['icon2'] = {
  label: 'Icon 2',
  panel: 'TEXT'
}
fields['icon3'] = {
  label: 'Icon 3',
  panel: 'TEXT'
}

fields['lore'] = {
  label: 'Lore',
  panel: 'TEXTAREA',
  font: kFontLore,
  x: 0.41, y: 2.4, w: 1.73, line: kFontLoreLineHeight
}
fields['gametext'] = {
  label: 'Gametext',
  panel: 'TEXTAREA',
  font: kFontGametext,
  x: 0.41, y: 2.95, w: 1.73, line: kFontGametextLineHeight
}
fields['skills'] = {
  label: 'Skills',
  panel: 'TEXTAREA',
  font: kFontSkills,
  x: 0.39, y: 2.95, w: 1.75, line: kFontSkillsLineHeight
}