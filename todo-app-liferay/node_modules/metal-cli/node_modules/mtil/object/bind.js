'use strict';

/**
 * Enforces the context of an object's methods.
 *
 * @type {Function}
 * @param {Object} context Target object.
 * @param {String} method... One or more method names.
 * @return {Object} The updated context object.
 */
function bind(context) {
	var method,
		len = arguments.length,
		i = 1;

	for (; i < len; i++) {
		method = arguments[i];
		context[method] = context[method].bind(context);
	}

	return context;
}

module.exports = bind;
