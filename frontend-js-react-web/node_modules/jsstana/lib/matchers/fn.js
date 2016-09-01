"use strict";

var misc = require("../misc.js");

/**
  #### (fn-expr)

  Matches `FunctionExpression`.
*/
function fnExprMatcher() {
  return misc.nodeMatcher("FunctionExpression", function () {
    return {};
  });
}

module.exports = {
  "fn-expr": fnExprMatcher,
};
