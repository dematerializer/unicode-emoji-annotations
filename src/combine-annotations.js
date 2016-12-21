import { groupArrayOfObjectsByKey } from './utils';

export default function combineAnnotations(cldrAnnotations, communityAnnotations, globalCommunityAnnotations) {
	const cldrAnnotationForSequence = groupArrayOfObjectsByKey(cldrAnnotations, 'sequence');
	const communityAnnotationForSequence = groupArrayOfObjectsByKey(communityAnnotations, 'sequence');
	const globalCommunityAnnotationForSequence = groupArrayOfObjectsByKey(globalCommunityAnnotations, 'sequence');
	const newAnnotations = Object.keys(communityAnnotationForSequence)
	.filter(communitySequence => cldrAnnotationForSequence[communitySequence] == null)
	.map(communitySequence => communityAnnotationForSequence[communitySequence]);
	return cldrAnnotations.map((cldrAnnotation) => {
		const communityAnnotation = communityAnnotationForSequence[cldrAnnotation.sequence] || {};
		const globalCommunityAnnotation = globalCommunityAnnotationForSequence[cldrAnnotation.sequence] || {};
		// Keep sequence, override tts, concatenate keywords:
		return {
			sequence: cldrAnnotation.sequence,
			tts: communityAnnotation.tts || cldrAnnotation.tts,
			keywords: cldrAnnotation.keywords.concat(
				communityAnnotation.keywords || [],
				globalCommunityAnnotation.keywords || [],
			),
		};
	}).concat(newAnnotations);
}
