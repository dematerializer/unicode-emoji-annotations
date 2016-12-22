import {
	combinedAnnotationsForLanguage,
	cldrAnnotations,
	communityAnnotations,
} from '../';

describe('unicode-emoji-annotations', () => {
	it('should offer a conservative node API', () => {
		const unicodeEmojiAnnotations = require('../'); // eslint-disable-line global-require
		expect(unicodeEmojiAnnotations).to.have.all.keys(
			'combinedAnnotationsForLanguage',
			'cldrAnnotations',
			'communityAnnotations',
		);
	});

	it('should export a function for combining language specific cldr and community annotations', () => {
		expect(combinedAnnotationsForLanguage).to.be.a('function');
		expect(combinedAnnotationsForLanguage('de')).to.be.instanceof(Array);
		expect(combinedAnnotationsForLanguage('en')).to.be.instanceof(Array);
	});

	it('should export cldr annotations for each supported language', () => {
		expect(cldrAnnotations).to.have.all.keys('de', 'en');
		Object.keys(cldrAnnotations).forEach((language) => {
			expect(cldrAnnotations[language]).to.be.instanceof(Array);
		});
	});

	it('should export community annotations for each supported language', () => {
		expect(communityAnnotations).to.have.all.keys('global', 'de', 'en');
		Object.keys(communityAnnotations).forEach((language) => {
			expect(communityAnnotations[language]).to.be.instanceof(Array);
		});
	});
});
