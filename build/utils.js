export default function groupArrayOfObjectsByKey(array, key) {
	return array.reduce((curr, obj) => {
		const next = curr;
		next[typeof key === 'function' ? key(obj) : obj[key]] = obj;
		return next;
	}, {});
}
