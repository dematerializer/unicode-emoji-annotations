import { expandEmojiData, emojiData as emojiDataImport } from 'unicode-emoji-data';
import countries from 'i18n-iso-countries';
import fs from 'fs';
import presetStable from './preset-stable';
import combineAnnotations from './combine-annotations';
import { groupArrayOfObjectsByKey } from './utils';

presetStable.cldrAnnotationsLanguages.forEach((language) => {
	const cldrAnnotations = require(`../res/cldr/${language}.json`); // eslint-disable-line
	const communityAnnotations = require(`../res/community/${language}.json`); // eslint-disable-line
	const globalCommunityAnnotations = require('../res/community/global.json'); // eslint-disable-line

	const annotations = combineAnnotations(cldrAnnotations, communityAnnotations, globalCommunityAnnotations);
	const annotationForSequence = groupArrayOfObjectsByKey(annotations, 'sequence');
	const matchAnyVariationSelectorOrModifier = /\s(FE0E|FE0F|1F3FB|1F3FC|1F3FD|1F3FE|1F3FF)/g;

	const emojiDataMissingAnnotations = expandEmojiData(emojiDataImport)
	.map((datum) => {
		// Prefer explicit emoji presentation variation sequence:
		const sequence = datum.presentation.variation ? datum.presentation.variation.emoji : datum.presentation.default;
		return {
			sequence: sequence.replace(matchAnyVariationSelectorOrModifier, ''), // normalize sequence
			name: datum.name,
			output: datum.output,
		};
	})
	.filter(datum => annotationForSequence[datum.sequence] == null);

	const regionalIndicatorBaseName = 'REGIONAL INDICATOR SYMBOL LETTER';

	const emojiAnnotationSuggestions = emojiDataMissingAnnotations.map((datum) => {
		// Prefer explicit emoji presentation variation sequence:
		const sequence = datum.presentation.variation ? datum.presentation.variation.emoji : datum.presentation.default;
		if (datum.name.includes(regionalIndicatorBaseName)) {
			const isoCode = datum.name
			.split(',')
			.map(part => part.replace(regionalIndicatorBaseName, '').trim())
			.join('');
			const tts = countries.getName(isoCode, language);
			return {
				sequence,
				name: datum.name,
				output: datum.output,
				tts: tts || `TODO: translate iso code '${isoCode}'`,
				keywords: ['flag'],
			};
		}
		return {
			sequence,
			name: datum.name,
			output: datum.output,
			tts: 'TODO',
			keywords: ['TODO'],
		};
	});

	fs.writeFileSync(`res/community/_TODO/${language}.TODO.json`, JSON.stringify(emojiAnnotationSuggestions, null, 2));
});
