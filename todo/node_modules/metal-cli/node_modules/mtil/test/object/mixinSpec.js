'use strict';

var mixin = require('../../object/mixin'),
	expect = require('expect.js');

describe('object/mixin', function () {
	it('should copy all properties to an object', function () {
		var a = { foo: 1, bar: 2 },
			b = { bar: 3, baz: 4 },
			c = mixin(a, b);

		expect(c).to.be(a);
		expect(c).to.eql({ foo: 1, bar: 3, baz: 4 });
	});
});
