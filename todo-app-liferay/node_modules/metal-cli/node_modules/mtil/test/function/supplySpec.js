'use strict';

var supply = require('../../function/supply'),
	expect = require('expect.js');

describe('function/supply', function () {
	it('should supply nothing', function () {
		var next = supply();

		expect(next()).to.be(undefined);
		expect(next()).to.be(undefined);
	});

	it('should supply one argument per invocation', function () {
		var next = supply(
			'a', 'b', 'c',
			1, 2, 3,
			['foo', 'bar'],
			{ hello: 'world' }
		);

		expect(next()).to.be('a');
		expect(next()).to.be('b');
		expect(next()).to.be('c');
		expect(next()).to.be(1);
		expect(next()).to.be(2);
		expect(next()).to.be(3);
		expect(next()).to.eql(['foo', 'bar']);
		expect(next()).to.eql({ hello: 'world' });
		expect(next()).to.be(undefined);
		expect(next()).to.be(undefined);
	});

	it('should supply function return values', function () {
		var next = supply(
			function (val) {
				return 'a' + val;
			},
			function (val) {
				return 1 + val;
			},
			function (val) {
				return val;
			}
		);

		expect(next(1)).to.be('a1');
		expect(next(1)).to.be(2);
		expect(next(1)).to.be(1);
		expect(next(1)).to.be(undefined);
		expect(next(1)).to.be(undefined);
	});

	it('should supply mixed values', function () {
		var next = supply(
			'foo',
			123,
			function (val) {
				return 1 + val;
			}
		);

		expect(next(1)).to.be('foo');
		expect(next(1)).to.be(123);
		expect(next(1)).to.be(2);
		expect(next(1)).to.be(undefined);
	});
});
