"use strict";

var misc = require("../misc.js");

/**
  #### (object)

  Matches `ObjectExpression`.
*/
function objectExprMatcher() {
  return misc.nodeMatcher("ObjectExpression", function () {
    return {};
  });
}

module.exports = {
  "object": objectExprMatcher,
};
