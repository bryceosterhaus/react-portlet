"use strict";

var jsstana = require("../lib/jsstana.js");

module.exports = jsstana.eslintRule("(expr (call _.extend ?? (object) (object) ??))", function(context, node, m) {
   context.report(node, "Merge consecutive object expressions in _.extend");
});
