import { groupArrayOfObjectsByKey } from '../utils';

describe('utils', () => {
	it('should group an array of objects by values of one specified key', () => {
		const arrayOfObjects = [
			{ key1: 'a', key2: 1 },
			{ key1: 'b', key2: 2 },
			{ key1: 'c', key2: 3 },
			{ key1: 'd', key2: 4 },
		];
		const expected = {
			a: { key1: 'a', key2: 1 },
			b: { key1: 'b', key2: 2 },
			c: { key1: 'c', key2: 3 },
			d: { key1: 'd', key2: 4 },
		};
		expect(groupArrayOfObjectsByKey(arrayOfObjects, 'key1')).to.deep.equal(expected);
		expect(groupArrayOfObjectsByKey(arrayOfObjects, obj => obj.key1)).to.deep.equal(expected);
	});
});
