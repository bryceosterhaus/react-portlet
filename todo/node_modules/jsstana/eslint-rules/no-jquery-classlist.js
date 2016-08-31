"use strict";

var jsstana = require("../lib/jsstana.js");

module.exports = jsstana.eslintRule("(property ? (or addClass removeClass toggleClass))", function(context, node, m) {
   context.report(node, "Don't use jQuery classList methods");
});
