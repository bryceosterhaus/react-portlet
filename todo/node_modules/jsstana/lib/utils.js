"use strict";

var assert = require("assert");

// Split n into m buckets
// m >= 1
// n >= 0
function partitions(n, m) {
  assert(n >= 0, "partitions: split value should be >= 0");
  assert(m >= 1, "partitions: there should be >= 1 buckets");

  if (m === 1) {
    return [[n]];
  }

  var res = [];
  for (var i = 0; i <= n; i++) {
    var bs = partitions(n - i, m - 1);
    for (var j = 0; j < bs.length; j++) {
      res.push([i].concat(bs[j]));
    }
  }
  return [].concat(res);
}

function some(array, f) {
  var len = array.length;
  var value;
  for (var i = 0; i < len; i++) {
    value = f(array[i]);
    if (value) {
      return value;
    }
  }
  return value;
}

module.exports = {
  partitions: partitions,
  some: some,
};
