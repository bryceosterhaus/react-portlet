"use strict";

var misc = require("../misc.js");

/**
  #### (ternary test con alt)

  Matches `ConditionalExpression`.
*/
function ternaryMatcher(test, con, alt) {
  /* jshint validthis:true */
  var that = this;

  that.assertArguments("ternary", 3, arguments);
  test = test || "?";
  con = con || "?";
  alt = alt || "?";

  var testMatcher = that.matcher(test);
  var consequentMatcher = that.matcher(con);
  var alternateMatcher = that.matcher(alt);

  return misc.nodeMatcher("ConditionalExpression", function (node) {
    var testM = testMatcher(node.test);
    var consequentM = consequentMatcher(node.consequent);
    var alternateM = alternateMatcher(node.alternate);

    return that.combineMatches(testM, consequentM, alternateM);
  });
}

module.exports = {
  "ternary": ternaryMatcher,
};
