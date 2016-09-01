'use strict';

var fill = require('../../object/fill'),
	expect = require('expect.js');

describe('object/fill', function () {
	it('should copy new properties to an object', function () {
		var a = { foo: 1, bar: 2 },
			b = { bar: 3, baz: 4 },
			c = fill(a, b);

		expect(c).to.be(a);
		expect(c).to.eql({ foo: 1, bar: 2, baz: 4 });
	});
});
