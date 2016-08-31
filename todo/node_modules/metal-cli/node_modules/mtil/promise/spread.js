'use strict';

/**
 * @example
 *     Promise.all([a, b]).then(spread(function (a, b) {
 *         ...
 *	   });
 */
function spread(fn) {
	return function (args) {
		return fn.apply(this, args);
	};
}

module.exports = spread;
