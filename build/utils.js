// NOTE: need to use ES5 here because this file will be included in the npm package!

/* eslint-disable */

module.exports = function groupArrayOfObjectsByKey(array, key) {
	return array.reduce(function (curr, obj) {
		curr[typeof key === 'function' ? key(obj) : obj[key]] = obj;
		return curr;
	}, {});
};
