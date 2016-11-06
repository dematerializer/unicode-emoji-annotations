import logUpdate from 'log-update';
import 'isomorphic-fetch';
import promisify from 'es6-promisify';
import xm2js from 'xml2js';
import punycode from 'punycode';
import leftPad from 'left-pad';

const parseXml = promisify(xm2js.parseString);
const defaultBaseUrl = 'http://unicode.org/repos/cldr/tags/latest/common/annotations';
const defaultLanguages = ['af', 'am', 'ar', 'as', 'az', 'bg', 'bn', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fa', 'fi', 'fil', 'fr', 'ga', 'gu', 'he', 'hi', 'hr', 'hu', 'hy', 'id', 'is', 'it', 'ja', 'ka', 'kk', 'km', 'kn', 'ko', 'ky', 'lo', 'lt', 'lv', 'mk', 'ml', 'mn', 'mr', 'ms', 'my', 'nb', 'ne', 'nl', 'or', 'pa', 'pl', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'sq', 'sr', 'sv', 'sw', 'ta', 'te', 'th', 'tr', 'uk', 'ur', 'uz', 'vi', 'zh'];

function buildAnnotationsV29(data) {
	const matchBrackets = /[[]\{}]/g;
	return data.ldml.annotations[0].annotation.map((annotation) => {
		const emoji = annotation.$.cp.replace(matchBrackets, '');
		const seq = punycode.ucs2.decode(emoji);
		const seqHex = seq.map(cp => leftPad(cp.toString(16), 4, 0).toUpperCase()).join(' ');
		return {
			sequence: seqHex,
			tts: annotation.$.tts == null ? undefined : annotation.$.tts,
			keywords: annotation._ == null ? undefined : annotation._.split(';').map(kw => kw.trim()),
		};
	}, []);
}

// From the CLDR 30 Release Notes (http://cldr.unicode.org/index/downloads/cldr-30):
// "The structure for annotations has changed to make processing simpler"
function buildAnnotationsV30(data) {
	const annotationForSequence = data.ldml.annotations[0].annotation.reduce((annotationForSeq, annotation) => {
		const extAnnotationForSeq = annotationForSeq;
		const emoji = annotation.$.cp;
		const seq = punycode.ucs2.decode(emoji);
		const seqHex = seq.map(cp => leftPad(cp.toString(16), 4, 0).toUpperCase()).join(' ');
		if (extAnnotationForSeq[seqHex] == null) {
			extAnnotationForSeq[seqHex] = {};
		}
		if (annotation.$.type) {
			extAnnotationForSeq[seqHex].tts = annotation._;
		} else {
			extAnnotationForSeq[seqHex].keywords = annotation._.split('|').map(kw => kw.trim());
		}
		if (extAnnotationForSeq[seqHex].tts && extAnnotationForSeq[seqHex].keywords) {
			extAnnotationForSeq[seqHex] = {
				// reorder props:
				tts: extAnnotationForSeq[seqHex].tts,
				keywords: extAnnotationForSeq[seqHex].keywords,
			};
		}
		return extAnnotationForSeq;
	}, {});
	// convert to array:
	return Object.keys(annotationForSequence).map(sequence => ({
		sequence,
		...annotationForSequence[sequence],
	}));
}

export const internals = {
	defaultBaseUrl,
	defaultLanguages,
	buildAnnotationsV29,
	buildAnnotationsV30,
};

export default function* CldrAnnotations({ baseUrl = defaultBaseUrl, version = 29, languages = defaultLanguages }) {
	const annotationsForLanguage = {};
	for (let i = 0; i < languages.length; i += 1) {
		const language = languages[i];
		logUpdate(`⇣ cldr-annotations ${language}`);
		const content = yield fetch(`${baseUrl}/${language}.xml`).then(res => res.text());
		const data = yield parseXml(content);
		if (version === 29) {
			annotationsForLanguage[language] = buildAnnotationsV29(data);
		} else if (version === 30) {
			annotationsForLanguage[language] = buildAnnotationsV30(data);
		} else {
			logUpdate(`x cldr-annotations: unsupported cldr version ${version}`);
			logUpdate.done();
		}
		logUpdate(`✓ cldr-annotations ${language}`);
		logUpdate.done();
	}
	logUpdate(`✓ cldr-annotations: ${languages.length} languages processed`);
	logUpdate.done();
	return { // API
		annotationsForLanguage,
	};
}
