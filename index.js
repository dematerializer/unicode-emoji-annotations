// NOTE: need to use ES5 here because this file will be included in the npm package!

/* eslint-disable */

var annotations = {
	'unicode-9-cldr-29': {
		de: require('./lib/unicode-9-cldr-29/de.json'),
		en: require('./lib/unicode-9-cldr-29/en.json'),
	},
	'unicode-9-cldr-30': {
		de: require('./lib/unicode-9-cldr-30/de.json'),
		en: require('./lib/unicode-9-cldr-30/en.json'),
	},
	'community': {
		global: require('./lib/community/global.json'),
		de: require('./lib/community/de.json'),
		en: require('./lib/community/en.json'),
	},
};

module.exports = {
	presets: Object.keys(emojiData),
	annotations: annotations,
};
