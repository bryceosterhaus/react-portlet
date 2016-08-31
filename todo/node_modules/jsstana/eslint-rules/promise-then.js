"use strict";

var jsstana = require("../lib/jsstana.js");

module.exports = jsstana.eslintRule("(expr (call ?.then ??))", function(context, node, m) {
   context.report(node, "Return .then promise, or use .done");
});
