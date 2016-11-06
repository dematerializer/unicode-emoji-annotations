export const groupArrayOfObjectsByKey = (array, key) => // eslint-disable-line import/prefer-default-export
	array.reduce((curr, obj) => {
		const next = curr;
		next[typeof key === 'function' ? key(obj) : obj[key]] = obj;
		return next;
	}, {});
