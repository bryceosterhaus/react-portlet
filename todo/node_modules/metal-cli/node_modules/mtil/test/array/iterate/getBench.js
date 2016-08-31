'use strict';

var benchmark = require('../../benchmark'),
	lodash = require('lodash').pluck,
	mout = require('mout/array/pluck'),
	mtil = require('mtil/array/iterate/get');

describe('array/iterate/get', function () {
	var fixture;

	beforeEach(function() {
		fixture = [
			{ foo: 'a', bar: 'd', baz: 'g' },
			{ foo: 'b', bar: 'e', baz: 'h' },
			{ foo: 'c', bar: 'f', baz: 'i' }
		];
	});

	it('benchmarks', function (done) {
		benchmark(done)
			.add('lodash.pluck', function () {
				lodash(fixture, 'bar');
			})
			.add('mout.array.pluck', function () {
				mout(fixture, 'bar');
			})
			.add('mtil.array.iterate.get', function () {
				fixture.map(mtil('bar'));
			})
			.run();
	});
});
