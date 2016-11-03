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

	const cldrAnnotations = yield buildCldrAnnotations({
		baseUrl: preset.cldrAnnotationsUrl,
		version: preset.cldrVersion,
		languages: preset.cldrAnnotationsLanguages,
	});

	logUpdate('⇣ write annotation files');

	// Write CLDR annotation files to lib:
	preset.cldrAnnotationsLanguages.forEach((language) => {
		const data = cldrAnnotations.annotationsForLanguage[language];
		fs.writeFileSync(`lib/cldr/v${preset.cldrVersion}/${language}.json`, JSON.stringify(data, null, 2));
	});

	// Copy community annotation files to lib:
	preset.communityAnnotationsLanguages.forEach((language) => {
		const source = require(`../community-annotations/${language}.json`); // eslint-disable-line
		fs.writeFileSync(`lib/community/${language}.json`, JSON.stringify(source, null, 2));
	});

	logUpdate('✓ write annotation files');
	logUpdate.done();
}

co(function* main() {
	yield buildForPreset(presetUnicode9Cldr29);
	yield buildForPreset(presetUnicode9Cldr30);
});
