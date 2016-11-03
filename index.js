// NOTE: need to use ES5 here because this file will be included in the npm package!

/* eslint-disable */

function groupArrayOfObjectsByKey(array, key) {
	return array.reduce((curr, obj) => {
		const next = curr;
		next[typeof key === 'function' ? key(obj) : obj[key]] = obj;
		return next;
	}, {});
}

function combineAnnotations(version, language) {
	var cldrAnnotations = require('./lib/cldr/' + version + '/' + language + '.json');
	var communityAnnotations = require('./lib/community/' + language + '.json');
	var globalCommunityAnnotations = require('./lib/community/global.json');
	if (communityAnnotations == null) {
		return cldrAnnotations;
	}
	var cldrAnnotationForSequence = groupArrayOfObjectsByKey(cldrAnnotations, 'sequence');
	var communityAnnotationForSequence = groupArrayOfObjectsByKey(communityAnnotations, 'sequence');
	var globalCommunityAnnotationForSequence = groupArrayOfObjectsByKey(globalCommunityAnnotations, 'sequence');
	var newAnnotations = Object.keys(communityAnnotationForSequence)
	.filter(communitySequence => cldrAnnotationForSequence[communitySequence] == null)
	.map(communitySequence => communityAnnotationForSequence[communitySequence]);
	return cldrAnnotations.map((cldrAnnotation) => {
		const globalCommunityAnnotation = globalCommunityAnnotationForSequence[cldrAnnotation.sequence] || {};
		const communityAnnotation = communityAnnotationForSequence[cldrAnnotation.sequence] || {};
		// Keep sequence, override tts, concatenate keywords:
		return {
			sequence: cldrAnnotation.sequence,
			tts: communityAnnotation.tts || cldrAnnotation.tts,
			keywords: cldrAnnotation.keywords.concat(
				communityAnnotation.keywords || [],
				globalCommunityAnnotation.keywords || []
			)
		};
	}).concat(newAnnotations);
}

module.exports = {
	combined: combineAnnotations,
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
