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
 *   Note, Card Type is not included here. It's hardcoded in index.html
 *   and directly wired in.
 * 
 *   The x, y, and w (line width) units are in inches.
 *   No w means could be multi line.
 *   No align means left align.
 */

/**
 * Fetches the field definition for the index/property. If none found,
 * returns a default TEXT field.
 * 
 * @param index     field index/property.
 * @return corresponding field definition, or a default one.
 */
function fetchFieldDefinition(index) {
  var fieldDef = fields[index];
  if (isDef(fieldDef)) { return fieldDef }
  return { label: index, panel: 'TEXT' };
}





/// This array contains all the field definitions.
var fields = [];

// Card Name. verbs and nouns are different, and it's fundamental enough
// to just hardcode how it's drawn in the canvas code.
fields['name'] = {
  label: 'Card Name',
  panel: 'TEXT',
  modifier: function (value) {
    return value.toUpperCase();
  },
  draw: function (type, card) {
    if (type === 'personnel') {
      return { r: 'TEXT', font: kFontNounTitle, x: 0.6, y: 0.4, align: 'left', prop: 'name' }
    } else { // verb
      return { r: 'TEXT', font: kFontVerbTitle, x: 1.25, y: 2.23, align: 'center', prop: 'name' }
    }
  }
}


// verb text box - IDEA: Maybe should be automatic based on gametext length?
fields['verbTemplate'] = {
  label: 'Template',
  panel: 'SELECT',
  options: ['verb', 'verb_full', 'verb_4lines', 'verb_5lines'],
  default: 'verb'
};

// personnel text box - IDEA: Maybe should be automatic based on length, restriction?
fields['personnelTemplate'] = {
  label: 'Template',
  panel: 'SELECT',
  options: ['personnel', 'personnel_3lines', 'personnel_restrict'],
  default: 'personnel',
  draw: function (type, card) {
    return { r: 'IMG', path: 'templates/text_', prop: 'personnelTemplate' };
  }
};

fields['property'] = {
  label: 'Property',
  panel: 'SELECT',
  options: [
    'tng', 'ds9', 'tos', 'voy', 'ds9', 'ent', 'starm', 'stccg',
    'st01', 'st02', 'st03', 'st04', 'st05', 'st06', 'st07', 'st08', 'st09', 'st10',
  ],
  default: 'tng',
  draw: function (type, card) {
    return { r: 'IMG', path: 'property/', x: 1.82, y: 0.4, prop: 'property' };
  }
};

fields['missionType'] = {
  label: 'Mission/Dilemma Type',
  panel: 'SELECT',
  options: ['both', 'planet', 'space'],
  default: 'both'
};

fields['info'] = {
  label: 'Collecter\'s Info',
  panel: 'TEXT',
  draw: function (type, card) {
    return { r: 'TEXT', font: kFontInfo, x: 2.9, y: 2.0, align: 'center', prop: 'info' }
  }
}

fields['icon1'] = {
  label: 'Icon 1',
  panel: 'TEXT',
  draw: function (type, card) {
    return { r: 'IMG', path: 'icons/', prop: 'icon1' };
  }
}
fields['icon2'] = {
  label: 'Icon 2',
  panel: 'TEXT',
  draw: function (type, card) {
    return { r: 'IMG', path: 'icons/', prop: 'icon2' };
  }
}
fields['icon3'] = {
  label: 'Icon 3',
  panel: 'TEXT',
  draw: function (type, card) {
    return { r: 'IMG', path: 'icons/', prop: 'icon3' };
  }
}

fields['lore'] = {
  label: 'Lore',
  panel: 'TEXTAREA',
  draw: function (type, card) {
    return { r: 'FORMAT', font: kFontLore, x: 0.41, y: 2.4, w: 1.73, line: kFontLoreLineHeight, prop: 'lore' }
  }
}
fields['gametext'] = {
  label: 'Gametext',
  panel: 'TEXTAREA',
  draw: function (type, card) {
    switch (type) {
      case 'doorway':
      case 'incident':
      case 'objective':
        return {
          r: 'FORMAT', font: kFontGametext, x: 0.41, y: 2.42, w: 1.73, line: kFontGametextLineHeight, prop: 'gametext'
        }
      default:
        return {
          r: 'FORMAT', font: kFontGametext, x: 0.41, y: 2.95, w: 1.73, line: kFontGametextLineHeight, prop: 'gametext'
        }
    }
  }
}
fields['skills'] = {
  label: 'Skills',
  panel: 'TEXTAREA',
  draw: function (type, card) {
    return { r: 'FORMAT', font: kFontSkills, x: 0.39, y: 2.95, w: 1.75, line: kFontSkillsLineHeight, prop: 'skills' }
  }
}

fields['affiliation'] = {
  label: 'Affiliation',
  panel: 'SELECT',
  options: [
    'bajoran', 'borg', 'cardassian', 'dominion', 'federation', 'ferengi', 'hirogen',
    'kazon', 'klingon', 'neutral', 'non_aligned', 'romulan', 'starfleet', 'vidiian'
  ],
  default: 'bajoran',
  draw: function (type, card) {
    return { r: 'IMG', path: 'templates/bg_', prop: 'affiliation' };
  }
}