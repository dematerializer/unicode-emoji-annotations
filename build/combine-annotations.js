import { groupArrayOfObjectsByKey } from './utils';

export default function combineAnnotations({ cldrAnnotationsForLanguage, communityAnnotationsForLanguage }) {
	const globalCommunityAnnotations = communityAnnotationsForLanguage.global;
	const globalCommunityAnnotationForSequence = groupArrayOfObjectsByKey(globalCommunityAnnotations, 'sequence');
	return Object.keys(cldrAnnotationsForLanguage).reduce((prevCombinedAnnotationsForLanguage, language) => {
		const nextCombinedAnnotationsForLanguage = prevCombinedAnnotationsForLanguage;
		const cldrAnnotations = cldrAnnotationsForLanguage[language];
		const communityAnnotations = communityAnnotationsForLanguage[language];
		if (communityAnnotations == null) {
			nextCombinedAnnotationsForLanguage[language] = cldrAnnotations;
		} else {
			const communityAnnotationForSequence = groupArrayOfObjectsByKey(communityAnnotations, 'sequence');
			const cldrAnnotationForSequence = groupArrayOfObjectsByKey(cldrAnnotations, 'sequence');
			const newAnnotations = Object.keys(communityAnnotationForSequence)
			.filter(communitySequence => cldrAnnotationForSequence[communitySequence] == null)
			.map(communitySequence => communityAnnotationForSequence[communitySequence]);
			nextCombinedAnnotationsForLanguage[language] = cldrAnnotations
			.map((cldrAnnotation) => {
				const globalCommunityAnnotation = globalCommunityAnnotationForSequence[cldrAnnotation.sequence] || {};
				const communityAnnotation = communityAnnotationForSequence[cldrAnnotation.sequence] || {};
				// Override tts, extend keywords:
				return {
					...cldrAnnotation,
					tts: communityAnnotation.tts || cldrAnnotation.tts,
					keywords: cldrAnnotation.keywords.concat(
						communityAnnotation.keywords || [],
						globalCommunityAnnotation.keywords || []
					),
				};
			})
			.concat(newAnnotations);
		}
		return nextCombinedAnnotationsForLanguage;
	}, {});
}
