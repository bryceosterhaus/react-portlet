'use strict';

/**
 * Adds properties of objects to a target object, if the target object doesn't
 * already have that property.
 *
 * @type {Function}
 * @param {Object} target Target object.
 * @param {String} object... One or more other objects.
 * @return {Object} The updated target object.
 */
function fill(target) {
	var arg, key,
		len = arguments.length,
		i = 1;

	for (; i < len; i++) {
		arg = arguments[i];

		if (!arg) {
			continue;
		}

		for (key in arg) {
			if (!target.hasOwnProperty(key) && arg.hasOwnProperty(key)) {
				target[key] = arg[key];
			}
		}
	}

	return target;
}

module.exports = fill;
