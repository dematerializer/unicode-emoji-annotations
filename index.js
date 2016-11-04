// NOTE: need to use ES5 here because this file will be included in the npm package!

/* eslint-disable */

var combineAnnotations = require('./build/combine-annotations');

function combineAnnotationsForVersionAndLanguage(version, language) {
	var cldrAnnotations = require('./lib/cldr/' + version + '/' + language + '.json');
	var communityAnnotations = require('./lib/community/' + language + '.json');
	var globalCommunityAnnotations = require('./lib/community/global.json');
	return combineAnnotations(cldrAnnotations, communityAnnotations, globalCommunityAnnotations);
};

module.exports = {
	combined: combineAnnotationsForVersionAndLanguage,
	cldr: {
		v29: {
			de: require('./lib/cldr/v29/de.json'),
			en: require('./lib/cldr/v29/en.json')
		},
		v30: {
			de: require('./lib/cldr/v30/de.json'),
			en: require('./lib/cldr/v30/en.json')
		}
	},
	community: {
		global: require('./lib/community/global.json'),
		de: require('./lib/community/de.json'),
		en: require('./lib/community/en.json')
	}
};
