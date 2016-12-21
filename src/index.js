import combineAnnotations from './combine-annotations';

export const combinedAnnotationsForLanguage = (language) => {
	const cldrAnnotations = require(`../res/cldr/${language}.json`); // eslint-disable-line
	const communityAnnotations = require(`../res/community/${language}.json`); // eslint-disable-line
	const globalCommunityAnnotations = require('../res/community/global.json'); // eslint-disable-line
	return combineAnnotations(cldrAnnotations, communityAnnotations, globalCommunityAnnotations);
};

export const cldrAnnotations = {
	de: require('../res/cldr/de.json'), // eslint-disable-line global-require
	en: require('../res/cldr/en.json'), // eslint-disable-line global-require
};

export const communityAnnotations = {
	global: require('../res/community/global.json'), // eslint-disable-line global-require
	de: require('../res/community/de.json'), // eslint-disable-line global-require
	en: require('../res/community/en.json'), // eslint-disable-line global-require
};
