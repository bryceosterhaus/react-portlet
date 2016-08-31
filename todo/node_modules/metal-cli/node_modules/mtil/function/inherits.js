'use strict';

/**
 * Sets up prototype inheritance from one constructor to another.
 *
 * @type {Function}
 * @param {Function} child
 * @param {Function} parent
 * @return {Object}
 */
function inherits(child, parent) {
	var proto = Object.create(parent.prototype);

	proto.constructor = child;
	child.prototype = proto;

	return proto;
}

module.exports = inherits;
