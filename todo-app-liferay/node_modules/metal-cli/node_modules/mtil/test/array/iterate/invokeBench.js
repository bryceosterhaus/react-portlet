'use strict';

var benchmark = require('../../benchmark'),
	lodash = require('lodash').invoke,
	mout = require('mout/array/invoke'),
	mtil = require('mtil/array/iterate/invoke');

describe('array/iterate/invoke', function () {
	var fixture;

	beforeEach(function() {
		fixture = [
			[1, 5, 9],
			[7, 5, 3],
			[2, 1, 3]
		];
	});

	it('benchmarks', function (done) {
		benchmark(done)
			.add('lodash.invoke', function () {
				lodash(fixture, 'sort');
			})
			.add('mout.array.invoke', function () {
				mout(fixture, 'sort');
			})
			.add('mtil.array.iterate.invoke', function () {
				fixture.map(mtil('sort'));
			})
			.run();
	});
});
