'use strict';

var inherits = require('../../function/inherits'),
	expect = require('expect.js');

describe('function/inherits', function () {
	it('should properly extend a constructor', function () {
		var inst, proto;

		function Foo() {}
		function Bar() {}

		proto = inherits(Bar, Foo);
		inst = new Bar();

		expect(proto.constructor).to.be(Bar);
		expect(inst).to.be.a(Bar);
		expect(inst).to.be.a(Foo);
	});
});
