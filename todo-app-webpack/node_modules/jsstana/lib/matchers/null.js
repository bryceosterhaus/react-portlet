"use strict";

/**
  #### (null-node)

  Matches `undefined` node.
*/
function nullNodeMatcher() {
  /* jshint validthis:true */
  var that = this;
  that.assertArguments("null-node", 0, arguments);

  var f = function (node) {
    return node === null ? {} : undefined;
  };
  f.nodeTypes = [];
  return f;
}

module.exports = {
  "null-node": nullNodeMatcher,
};
