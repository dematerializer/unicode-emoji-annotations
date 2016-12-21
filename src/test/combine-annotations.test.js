import combineAnnotations from '../combine-annotations';

describe('combine-annotations', () => {
	it('should combine cldr, community and global community annotations', () => {
		const cldrAnnotations = [
			{
				sequence: 'UNTOUCHED',
				tts: 'foo',
				keywords: [
					'bar',
				],
			},
			{
				sequence: '1F4A9',
				tts: 'pile of poo',
				keywords: [
					'comic',
					'dung',
					'face',
					'monster',
					'poo',
					'poop',
				],
			},
		];
		const communityAnnotations = [
			{
				sequence: 'XXXXX',
				tts: 'totally not in cldr',
				keywords: [
					'totally',
					'not',
					'cldr',
				],
			},
			{
				sequence: '1F4A9',
				tts: 'pile of shit', // correction
				keywords: [
					'dump', // addition
				],
			},
		];
		const globalCommunityAnnotations = [
			{
				sequence: '1F4A9',
				tts: 'try me', // global community annotations cannot set tts
				keywords: [
					'shit', // addition
				],
			},
		];
		const expected = [
			cldrAnnotations[0],
			{
				sequence: '1F4A9',
				tts: 'pile of shit',
				keywords: [
					'comic',
					'dung',
					'face',
					'monster',
					'poo',
					'poop',
					'dump',
					'shit',
				],
			},
			communityAnnotations[0],
		];
		expect(combineAnnotations(
			cldrAnnotations,
			communityAnnotations,
			globalCommunityAnnotations,
		)).to.deep.equal(expected);
	});
});
