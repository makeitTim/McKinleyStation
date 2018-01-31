/*
 *   fields.js
 *   Created Jan. 31, 2018 by Tim
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

// var cardTypeList = [ 'verb', 'personnel' ];

var cardTypeList = [
  'artifact',
  'dilemma',
  'doorway',
  'equipment',
  'event',
  'incident',
  'interrupt',
  'objective',
  'personnel'
];

/**
 * Fetches panel list for card type.
 * TODO: allow grouping, turning off optional fields.
 * @param type     card type name
 * @return list of fields displayed in panel.
 */
function fetchPanelFor(type) {
  if (cardType.hasOwnProperty(type)) {
    return cardType[type].panel;
  }
  return verbCardTypePanel(type);
}

/**
 * Fetches the drawing info for the corresponding card type. If type name
 * not found defaults to verb artifact.
 * @param type     card type name
 * @param card     the card data being drawn, used in some cases
 * @return card type drawing info used by canvas. defaults to verb/artifact.
 */
function fetchDrawFor(type, card) {
  if (cardType.hasOwnProperty(type)) {
    return cardType[type].draw(type, card);
  }
  return verbCardTypeDraw(type, card);
}


/// 
var cardType = [];

/// TODO: Some panel fields are used by all card types, these will be appended
// var allPanels = ['name', 'info'];  

/// Card Drawing list for Personnel
cardType['personnel'] = {
  panel: [
    'name', 'info', 'property', 'affiliation', 'lore', 'skills',
    'personnelTemplate', 'icon1', 'icon2', 'icon3'
  ],
  draw: function (type, card) {
    return [
      fields['affiliation'].draw(type, card),
      { r: 'IMG', img: 'templates/border' },
      { r: 'IMG', img: 'templates/border_art' },
      { r: 'IMG', img: 'templates/title_affil1' },
      fields['property'].draw(type, card),
      fields['personnelTemplate'].draw(type, card),
      { r: 'IMG', img: 'templates/stats_personnel' },
      fields['name'].draw(type, card),
      fields['lore'].draw(type, card),
      fields['skills'].draw(type, card)
    ];
  }
};


/* ______________________________________________________________________
 * Verbs  --- all basically same except some logic, so share methods.
 */

/**
 * Creates panel field list for verb types.
 * @param type     card type name
 * @return list of fields displayed in panel.
 */
function verbCardTypePanel(type) {
  switch (type) {
    case 'doorway':
    case 'incident':
    case 'objective':
      return ['name', 'info', 'property', 'gametext'];
    default:
      return ['name', 'info', 'property', 'lore', 'gametext', 'verbTemplate'];
  }
}

/**
 * Creates draw render list for verb types.
 * @param type     card type name
 * @param card     the card data being drawn, used in some cases
 * @return card type drawing info used by canvas. 
 */
function verbCardTypeDraw(type, card) {
  var isFull = (type === 'doorway' || type === 'incident' || type === 'objective');
  var typeImage = 'templates/type_' + type;
  if (isDef(card['missionType']) && type === 'dilemma') {
    typeImage += '_' + card['missionType'];
  }

  var textImage;
  if (isFull) {
    textImage = 'templates/text_verb_full';
  } else if (isDef(card['verbTemplate'])) {
    textImage = 'templates/text_' + card['verbTemplate'];
  } else {
    textImage = 'templates/text_verb';
  }

  var renders = [
    { r: 'IMG', img: 'templates/bg_neutral' },
    { r: 'IMG', img: 'templates/border' },
    { r: 'IMG', img: 'templates/border_art' },
    { r: 'IMG', img: 'templates/title_verb' },
    fields['property'].draw(type, card),
    { r: 'IMG', img: typeImage },
    { r: 'IMG', img: textImage },
    fields['name'].draw(type, card),
    fields['gametext'].draw(type, card)
  ];

  if (!isFull) {
    renders.push(fields['lore'].draw(type, card));
  }

  return renders;

}
