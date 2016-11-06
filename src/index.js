import combineAnnotations from './combine-annotations';

const combineAnnotationsForVersionAndLanguage = (version, language) => {
	const cldrAnnotations = require(`./cldr-annotations/${version}/${language}.json`); // eslint-disable-line
	const communityAnnotations = require(`./community-annotations/${language}.json`); // eslint-disable-line
	const globalCommunityAnnotations = require('./community-annotations/global.json'); // eslint-disable-line
	return combineAnnotations(cldrAnnotations, communityAnnotations, globalCommunityAnnotations);
};

export default {
	combined: combineAnnotationsForVersionAndLanguage,
	cldr: {
		v29: {
			de: require('./cldr-annotations/v29/de.json'), // eslint-disable-line global-require
			en: require('./cldr-annotations/v29/en.json'), // eslint-disable-line global-require
		},
		v30: {
			de: require('./cldr-annotations/v30/de.json'), // eslint-disable-line global-require
			en: require('./cldr-annotations/v30/en.json'), // eslint-disable-line global-require
		},
	},
	community: {
		global: require('./community-annotations/global.json'), // eslint-disable-line global-require
		de: require('./community-annotations/de.json'), // eslint-disable-line global-require
		en: require('./community-annotations/en.json'), // eslint-disable-line global-require
	},
};
