/* eslint-disable no-unused-vars */

import { internals } from '../cldr-annotations';

const {
	defaultBaseUrl,
	defaultLanguages,
	buildAnnotations,
} = internals;

describe('cldr-annotations', () => {
	it('should use a reasonable default base url', () => {
		expect(defaultBaseUrl).to.equal('http://unicode.org/repos/cldr/tags/release-30/common/annotations');
	});
});
