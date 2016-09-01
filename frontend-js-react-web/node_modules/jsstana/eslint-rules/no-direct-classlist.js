"use strict";

var jsstana = require("../lib/jsstana.js");

module.exports = jsstana.eslintRule("(property ?.classList (or remove add toggle contains))", function(context, node, m) {
   context.report(node, "Don't use DOMNode#classList methods");
});
