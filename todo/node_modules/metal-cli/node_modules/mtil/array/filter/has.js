'use strict';

function has(prop) {
	return function (item) {
		return item.hasOwnProperty(prop);
	};
}

module.exports = has;
