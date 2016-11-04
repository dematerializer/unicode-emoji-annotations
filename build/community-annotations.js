import unicodeEmojiData from 'unicode-emoji-data';
import countries from 'i18n-iso-countries';
import fs from 'fs';
import combineAnnotations from './combine-annotations';
import groupArrayOfObjectsByKey from './utils';

const languages = ['en', 'de'];

languages.forEach((language) => {
	const cldrAnnotations = require(`../lib/cldr/v30/${language}.json`); // eslint-disable-line
	const communityAnnotations = require(`../lib/community/${language}.json`); // eslint-disable-line
	const globalCommunityAnnotations = require('../lib/community/global.json'); // eslint-disable-line

	const annotations = combineAnnotations(cldrAnnotations, communityAnnotations, globalCommunityAnnotations);
	const annotationForSequence = groupArrayOfObjectsByKey(annotations, 'sequence');
	const matchAnyVariationSelectorOrModifier = /\s(FE0E|FE0F|1F3FB|1F3FC|1F3FD|1F3FE|1F3FF)/g;

	const emojiDataMissingAnnotations = unicodeEmojiData.v4.expanded
	.map(datum => ({
		sequence: datum.sequence.replace(matchAnyVariationSelectorOrModifier, ''), // normalize sequence
		name: datum.name,
		output: datum.output,
	}))
	.filter(datum => annotationForSequence[datum.sequence] == null);

	const regionalIndicatorBaseName = 'REGIONAL INDICATOR SYMBOL LETTER';

	const emojiAnnotationSuggestions = emojiDataMissingAnnotations.map((datum) => {
		if (datum.name.includes(regionalIndicatorBaseName)) {
			const isoCode = datum.name
			.split(',')
			.map(part => part.replace(regionalIndicatorBaseName, '').trim())
			.join('');
			const tts = countries.getName(isoCode, language);
			return {
				sequence: datum.sequence,
				name: datum.name,
				output: datum.output,
				tts: tts || `TODO: translate iso code '${isoCode}'`,
				keywords: ['flag'],
			};
		}
		return {
			sequence: datum.sequence,
			name: datum.name,
			output: datum.output,
			tts: 'TODO',
			keywords: ['TODO'],
		};
	});

	fs.writeFileSync(`community-annotations/${language}.TODO.json`, JSON.stringify(emojiAnnotationSuggestions, null, 2));
});
