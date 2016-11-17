import combineAnnotations from './combine-annotations';

const combineAnnotationsForVersionAndLanguage = (version, language) => {
	const cldrAnnotations = require(`../res/cldr-annotations/${version}/${language}.json`); // eslint-disable-line
	const communityAnnotations = require(`../res/community-annotations/${language}.json`); // eslint-disable-line
	const globalCommunityAnnotations = require('../res/community-annotations/global.json'); // eslint-disable-line
	return combineAnnotations(cldrAnnotations, communityAnnotations, globalCommunityAnnotations);
};

export default {
	combined: combineAnnotationsForVersionAndLanguage,
	cldr: {
		v29: {
			de: require('../res/cldr-annotations/v29/de.json'), // eslint-disable-line global-require
			en: require('../res/cldr-annotations/v29/en.json'), // eslint-disable-line global-require
		},
		v30: {
			de: require('../res/cldr-annotations/v30/de.json'), // eslint-disable-line global-require
			en: require('../res/cldr-annotations/v30/en.json'), // eslint-disable-line global-require
		},
	},
	community: {
		global: require('../res/community-annotations/global.json'), // eslint-disable-line global-require
		de: require('../res/community-annotations/de.json'), // eslint-disable-line global-require
		en: require('../res/community-annotations/en.json'), // eslint-disable-line global-require
	},
};
