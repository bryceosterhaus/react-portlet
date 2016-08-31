'use strict';

var suite = require('benchmark').Suite,
	cycle = function (event) {
		console.log(String(event.target));
	},
	complete = function () {
		console.log('Fastest:', this.filter('fastest').pluck('name').join());
		console.log('Slowest:', this.filter('slowest').pluck('name').join());
		console.log('---');
	};

module.exports = function (done) {
	return suite()
		.on('cycle', cycle)
		.on('complete', complete)
		.on('complete', done.bind(null, null));
};
