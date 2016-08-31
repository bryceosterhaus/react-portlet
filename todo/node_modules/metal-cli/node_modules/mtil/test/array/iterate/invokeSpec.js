'use strict';

var invoke = require('../../../array/iterate/invoke'),
	expect = require('expect.js');

describe('array/iterate/invoke', function () {
	it('should return a list of invoked method return values', function () {
		var fixture = [
			[1, 5, 9],
			[7, 5, 3],
			[2, 1, 3]
		];

		expect(fixture.map(invoke('sort'))).to.eql([
			[1, 5, 9],
			[3, 5, 7],
			[1, 2, 3]
		]);
	});
});
