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
 */

/* ______________________________________________________________________
 * Field Lists
 */

/// Fields the cards must have (always shown) indexed by type or all
var fieldList = [];

/// Fields the cards may have (closable x) indexed by type or all
var fieldListOptional = [];

fieldList['all'] = [ 'type', 'name', 'info' ];
fieldListOptional['all'] = [ 'icon1', 'icon2', 'icon3' ];

fieldList['personnel'] = [ 'lore', 'skills' ];
fieldListOptional['personnel'] = [ 'personnelTemplate' ];

fieldList['artifact'] = [ 'lore', 'gametext' ];
fieldListOptional['artifact'] = [ 'template' ];

// verbs with lore + gametext are all like artifact
fieldList['dilemma'] = fieldList['artifact'];
fieldListOptional['dilemma'] = fieldListOptional['artifact'];
fieldList['doorway'] = fieldList['artifact'];
fieldListOptional['doorway'] = fieldListOptional['artifact'];
fieldList['equipment'] = fieldList['artifact'];
fieldListOptional['equipment'] = fieldListOptional['artifact'];
fieldList['event'] = fieldList['artifact'];
fieldListOptional['event'] = fieldListOptional['artifact'];
fieldList['interrupt'] = fieldList['artifact'];
fieldListOptional['interrupt'] = fieldListOptional['artifact'];

// indicent and object are the same too
fieldList['incident'] = [ 'gametext' ];
fieldListOptional['incident'] = []; // no optional fields?
fieldList['objective'] = fieldList['incident'];
fieldListOptional['objective'] = fieldListOptional['incident'];

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

/// Card type. The option values match the field lists above!
fields['type'] = {
  label: 'Card Type',
  panel: 'SELECT',
  options: [ 'artifact', 'dilemma', 'doorway', 'equipment', 'event', 'incident',
            'interrupt', 'objective', 'personnel' ],
  default: 'artifact'
};

// verb template
fields['template'] = {
  label: 'Template',
  panel: 'SELECT',
  options: [ 'verb', 'verb_4lines', 'verb_5lines' ],
  default: 'verb'
};

// Card Name. verbs and nouns are different, and it's fundamental enough
// to just hardcode how it's drawn in the canvas code.
fields['name'] = {
  label: 'Card Name',
  panel: 'TEXT'
}

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
  font: kFontLore, line: kFontLoreLineHeight,
  x: 0.37, y: 2.4, w: 1.8
}
fields['gametext'] = {
  label: 'Gametext',
  panel: 'TEXTAREA',
  font: kFontGametext, line: kFontGametextLineHeight,
  x: 0.39, y: 2.95, w: 1.75
}
fields['skills'] = {
  label: 'Skills',
  panel: 'TEXTAREA',
  font: kFontSkills, line: kFontSkillsLineHeight,
  x: 0.39, y: 2.95, w: 1.75
}