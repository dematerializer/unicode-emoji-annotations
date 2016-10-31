import co from 'co';
import fs from 'fs';
import logUpdate from 'log-update';

import buildCldrAnnotations from './cldr-annotations';

import presetUnicode9Cldr29 from './preset-unicode-9-cldr-29';
import presetUnicode9Cldr30 from './preset-unicode-9-cldr-30';

process.on('uncaughtException', (err) => { throw err; });
process.on('unhandledRejection', (err) => { throw err; });

function* buildForPreset(preset) {
	logUpdate(`using unicode v${preset.unicodeVersion}, cldr v${preset.cldrVersion} for emoji v${preset.emojiVersion}`);
	logUpdate.done();

	// Render annotation files:

	logUpdate('⇣ write annotation files');

	const cldrAnnotations = yield buildCldrAnnotations({
		baseUrl: preset.cldrAnnotationsUrl,
		version: preset.cldrVersion,
		languages: preset.cldrAnnotationsLanguages,
	});

	Object.keys(cldrAnnotations.annotationsForLanguage).forEach((language) => {
		const data = cldrAnnotations.annotationsForLanguage[language];
		fs.writeFileSync(`lib/unicode-${preset.unicodeVersion}-cldr-${preset.cldrVersion}/${language}.json`, JSON.stringify(data, null, 2));
	});

	const communityAnnotationsForLanguage = preset.communityAnnotationsLanguages
	.reduce((prevAnnotations, language) => {
		const nextAnnotations = prevAnnotations;
		nextAnnotations[language] = require(`../community-annotations/${language}.json`); // eslint-disable-line global-require
		return nextAnnotations;
	}, {});

	Object.keys(communityAnnotationsForLanguage).forEach((language) => {
		const data = communityAnnotationsForLanguage[language];
		fs.writeFileSync(`lib/community/${language}.json`, JSON.stringify(data, null, 2));
	});

	logUpdate('✓ write annotation files');
	logUpdate.done();
}

co(function* main() {
	yield buildForPreset(presetUnicode9Cldr29);
	yield buildForPreset(presetUnicode9Cldr30);
});
