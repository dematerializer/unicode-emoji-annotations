// NOTE: need to use ES5 here because this file will be included in the npm package!

/* eslint-disable */

var groupArrayOfObjectsByKey = require('./utils');

module.exports = function combineAnnotations(cldrAnnotations, communityAnnotations, globalCommunityAnnotations) {
	if (communityAnnotations == null) {
		// TODO: return cldrAnnotations merged with globalCommunityAnnotations
		return cldrAnnotations;
	}
	var cldrAnnotationForSequence = groupArrayOfObjectsByKey(cldrAnnotations, 'sequence');
	var communityAnnotationForSequence = groupArrayOfObjectsByKey(communityAnnotations, 'sequence');
	var globalCommunityAnnotationForSequence = groupArrayOfObjectsByKey(globalCommunityAnnotations, 'sequence');
	var newAnnotations = Object.keys(communityAnnotationForSequence)
	.filter(function (communitySequence) {
		return cldrAnnotationForSequence[communitySequence] == null;
	})
	.map(function (communitySequence) {
		return communityAnnotationForSequence[communitySequence];
	});
	return cldrAnnotations.map(function (cldrAnnotation) {
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
