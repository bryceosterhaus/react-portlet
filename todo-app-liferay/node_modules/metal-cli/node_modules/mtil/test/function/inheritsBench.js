'use strict';

var benchmark = require('../benchmark'),
	lodash = require('lodash').create,
	mout = require('mout/lang/inheritPrototype'),
	mtil = require('mtil/function/inherits');

describe('function/inherits', function() {
	it('benchmarks', function (done) {
		benchmark(done)
			.add('lodash.create', function () {
				var inst;

				function Foo() {}
				function Bar() {}

				lodash(Foo.prototype, { constructor: Bar });
				inst = new Bar();
			})
			.add('mout.lang.inheritsPrototype', function () {
				var inst;

				function Foo() {}
				function Bar() {}

				mout(Bar, Foo);
				inst = new Bar();
			})
			.add('mtil.function.inherits', function () {
				var inst;

				function Foo() {}
				function Bar() {}

				mtil(Bar, Foo);
				inst = new Bar();
			})
			.run();
	});
});
