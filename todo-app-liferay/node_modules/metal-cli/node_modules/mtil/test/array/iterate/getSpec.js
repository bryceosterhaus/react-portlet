'use strict';

var get = require('../../../array/iterate/get'),
	expect = require('expect.js');

describe('array/iterate/get', function () {
	it('should return a list of properties', function () {
		var fixture = [
			{ foo: 'a', bar: 'd', baz: 'g' },
			{ foo: 'b', bar: 'e', baz: 'h' },
			{ foo: 'c', bar: 'f', baz: 'i' }
		];

		expect(fixture.map(get('foo'))).to.eql(['a', 'b', 'c']);
		expect(fixture.map(get('bar'))).to.eql(['d', 'e', 'f']);
		expect(fixture.map(get('baz'))).to.eql(['g', 'h', 'i']);
	});
});
