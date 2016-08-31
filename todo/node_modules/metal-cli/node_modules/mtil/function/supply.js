'use strict';

/**
 * Creates a function that will supply one of the original arguments, per
 * invocation, in order. Useful for mocking functions that will be called
 * multiple times in a test and need to return a specific value each time.
 *
 * @example
 *     var next = supply(
 *         'foo',
 *         123,
 *         function (val) {
 *             return 1 + val;
 *         }
 *     );
 *
 *     next();  // 'foo'
 *     next();  // 123
 *     next(2); // 3
 *     next();  // undefined
 *
 *
 * @type {Function}
 * @param {Any...} values
 * @return {Any}
 */
function supply() {
	var args = arguments,
		i = 0;

	return function () {
		var arg = args[i++];

		if (typeof arg !== 'function') {
			return arg;
		}

		return arg.apply(this, arguments);
	};
}

module.exports = supply;
