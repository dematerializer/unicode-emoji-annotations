import combineAnnotations from './combine-annotations';

const combineAnnotationsForLanguage = (language) => {
	const cldrAnnotations = require(`../res/cldr/stable/${language}.json`); // eslint-disable-line
	const communityAnnotations = require(`../res/community/${language}.json`); // eslint-disable-line
	const globalCommunityAnnotations = require('../res/community/global.json'); // eslint-disable-line
	return combineAnnotations(cldrAnnotations, communityAnnotations, globalCommunityAnnotations);
};

export default {
	combined: combineAnnotationsForLanguage,
	cldr: {
		de: require('../res/cldr/de.json'), // eslint-disable-line global-require
		en: require('../res/cldr/en.json'), // eslint-disable-line global-require
	},
	community: {
		global: require('../res/community/global.json'), // eslint-disable-line global-require
		de: require('../res/community/de.json'), // eslint-disable-line global-require
		en: require('../res/community/en.json'), // eslint-disable-line global-require
	},
};
