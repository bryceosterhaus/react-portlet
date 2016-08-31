'use strict';

var bind = require('../../object/bind'),
	expect = require('expect.js');

describe('object/bind', function () {
	it('should enforce the context of object methods', function () {
		var foo, a, b, c;

		function Foo() {
			bind(this, 'a', 'b');
		}

		Foo.prototype.a = function () {
			return this;
		};

		Foo.prototype.b = function () {
			return this;
		};

		Foo.prototype.c = function () {
			return this;
		};

		foo = new Foo();
		a = foo.a;
		b = foo.b;
		c = foo.c;

		expect(foo.a()).to.be(foo);
		expect(a()).to.be(foo);

		expect(foo.b()).to.be(foo);
		expect(b()).to.be(foo);

		expect(foo.c()).to.be(foo);
		expect(c()).not.to.be(foo);
	});
});
