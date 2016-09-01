'use strict';

/**
 * Creates a function that will invoke a method on the given item. Useful when
 * used in conjunction with `Array#map` and `Array#forEach`.
 *
 * @example
 *     [[3,2,1], [9,5,2]].map(invoke('sort')); // [[1,2,3], [2,5,9]]
 *
 * @type {Function}
 * @param {String} name
 * @return {Function(Any)}
 */
function invoke(name, args) {
	if (!args || !args.length) {
		return function (item) {
			return item[name]();
		};
	}

	return function (item) {
		return item[name].apply(this, args);
	};
}

module.exports = invoke;
