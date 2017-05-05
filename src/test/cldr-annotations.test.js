import promisify from 'es6-promisify';
import xm2js from 'xml2js';
import fetchMock from 'fetch-mock';
import buildCldrAnnotations, { internals } from '../cldr-annotations';

const parseXml = promisify(xm2js.parseString);

const {
	defaultBaseUrl,
	defaultLanguages,
	buildAnnotations,
} = internals;

const xmlContentMock = `
	<?xml version="1.0" encoding="UTF-8" ?>
	<ldml>
		<annotations>
			<annotation cp="🏍">racing</annotation>
			<annotation cp="🏍" type="tts">motorcycle</annotation>
			<annotation cp="😾">cat | face | pouting</annotation>
			<annotation cp="😾" type="tts">pouting cat face</annotation>
		</annotations>
	</ldml>
`;

const expectedAnnotations = [
	{
		sequence: '1F3CD',
		tts: 'motorcycle',
		keywords: ['racing'],
	},
	{
		sequence: '1F63E',
		tts: 'pouting cat face',
		keywords: ['cat', 'face', 'pouting'],
	},
];

describe('cldr-annotations', () => {
	it('should use a reasonable default base url', () => {
		expect(defaultBaseUrl).to.equal('http://unicode.org/repos/cldr/tags/release-30/common/annotations');
	});

	it('should use a reasonable set of default languages', () => {
		expect(defaultLanguages).to.deep.equal(['en', 'de']);
	});

	it('should build annotations', () => {
		parseXml(xmlContentMock).then((data) => {
			expect(buildAnnotations(data)).to.deep.equal(expectedAnnotations);
		});
	});

	it('should generate an API', (done) => {
		fetchMock.get('*', xmlContentMock);
		const step = buildCldrAnnotations({});
		step.next().value
		.then(enContent => step.next(enContent).value)
		.then(enData => step.next(enData).value)
		.then(deContent => step.next(deContent).value)
		.then((deData) => {
			const api = step.next(deData).value;
			expect(api).to.have.all.keys('annotationsForLanguage');
			expect(api.annotationsForLanguage).to.deep.equal({
				en: expectedAnnotations,
				de: expectedAnnotations,
			});
			done();
		});
	});
});
