import fs from 'fs';
import punycode from 'punycode';
import { expandEmojiData, emojiData as emojiDataImport } from 'unicode-emoji-data';
import { cldrAnnotations, communityAnnotations, combinedAnnotationsForLanguage } from '.';
import { groupArrayOfObjectsByKey } from './utils';
import mainPreset from './preset';

process.on('uncaughtException', (err) => { throw err; });
process.on('unhandledRejection', (err) => { throw err; });

const matchAnyVariationSelectorOrModifier = /\s(FE0E|FE0F|1F3FB|1F3FC|1F3FD|1F3FE|1F3FF)/g;

const buildForPreset = (preset) => {
	const emojiData = expandEmojiData(emojiDataImport);
	const englishCldrAnnotationForSequence = groupArrayOfObjectsByKey(cldrAnnotations.en, 'sequence');
	const englishCommunityAnnotationForSequence = groupArrayOfObjectsByKey(communityAnnotations.en, 'sequence');
	const globalCommunityAnnotationForSequence = groupArrayOfObjectsByKey(communityAnnotations.global, 'sequence');
	const combinedAnnotationForSequence = groupArrayOfObjectsByKey(combinedAnnotationsForLanguage('en'), 'sequence');

	const tableRows = emojiData.map((datum, index) => {
		// Prefer explicit emoji presentation variation sequence:
		let exampleOutputSequence = datum.presentation.variation ? datum.presentation.variation.emoji : datum.presentation.default;
		// Make keycaps look nice in Google Chrome:
		if (datum.name.includes('KEYCAP')) {
			exampleOutputSequence = datum.presentation.default;
		}
		const exampleOutput = punycode.ucs2.encode(exampleOutputSequence.split(' ').map(cp => parseInt(cp, 16)));
		const normalizedSequence = exampleOutputSequence.replace(matchAnyVariationSelectorOrModifier, '');
		const englishCldrAnnotation = englishCldrAnnotationForSequence[normalizedSequence];
		const englishCommunityAnnotation = englishCommunityAnnotationForSequence[normalizedSequence];
		const globalCommunityAnnotation = globalCommunityAnnotationForSequence[normalizedSequence];
		const combinedAnnotation = combinedAnnotationForSequence[normalizedSequence];
		return `
			<tr>
				<td><a name="${index + 1}"><pre>${index + 1}</pre></a></td>
				<td><pre>${exampleOutput}</pre></td>
				<td><pre>${datum.name}</pre></td>
				<td><pre>${englishCldrAnnotation ? JSON.stringify(englishCldrAnnotation, null, 2) : ''}</pre></td>
				<td><pre>${englishCommunityAnnotation ? JSON.stringify(englishCommunityAnnotation, null, 2) : ''}</pre></td>
				<td><pre>${globalCommunityAnnotation ? JSON.stringify(globalCommunityAnnotation, null, 2) : ''}</pre></td>
				<td><pre>${combinedAnnotation ? JSON.stringify(combinedAnnotation, null, 2) : ''}</pre></td>
			</tr>`;
	}).join('');

	const html = `
		<!DOCTYPE html>
		<html>
			<head>
			<meta charset="utf-8">
			<title>emoji annotations for unicode ${preset.unicodeVersion}, cldr ${preset.cldrVersion} (${preset.tag}) for emoji ${preset.emojiVersion}</title>
			<style>
				table {
					border-collapse: collapse;
				}
				th, td {
					vertical-align: top;
					text-align: left;
					white-space: nowrap;
					border: 1px solid black;
				}
				td:last-child {
					white-space: normal;
				}
			</style>
			<body>
				<table>
					<thead>
						<th>#</th>
						<th>Example Output</th>
						<th>Name</th>
						<th>English CLDR Annotation</th>
						<th>English Community Annotation</th>
						<th>Global Community Annotation</th>
						<th>Combined Annotation</th>
					</thead>
					<tbody>
						${tableRows}
					</tbody>
				</table>
			</body>
		</html>
	`;

	fs.writeFileSync(`docs/emoji-annotations.${preset.tag}.html`, html);
};

buildForPreset(mainPreset);
