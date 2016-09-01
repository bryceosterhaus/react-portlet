"use strict";

var jsstana = require("../lib/jsstana.js");

module.exports = jsstana.eslintRule("(call (property (call (property ? sortBy)) uniq) ??params)", function(context, node, m) {
  if (m.params.length === 0 || !jsstana.match("(true)", m.params[0])) {
    context.report(node, "Pass `true` as second argument to _.uniq, when uniq-ing result of _.sortBy");
  }
});
