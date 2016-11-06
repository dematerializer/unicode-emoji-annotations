/* eslint-disable no-unused-vars */

import { internals } from '../cldr-annotations';

const {
	defaultBaseUrl,
	defaultLanguages,
	buildAnnotationForSequenceV29,
	buildAnnotationForSequenceV30,
} = internals;

describe('cldr-annotations', () => {
	it('should use a reasonable default base url', () => {
		expect(defaultBaseUrl).to.equal('http://unicode.org/repos/cldr/tags/latest/common/annotations');
	});
});
