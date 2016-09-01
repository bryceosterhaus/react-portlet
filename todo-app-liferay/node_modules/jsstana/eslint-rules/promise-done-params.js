"use strict";

var jsstana = require("../lib/jsstana.js");

module.exports = jsstana.eslintRule("(call ?.done ??params)", function(context, node, m) {
  if (m.params.length !== 2) {
    context.report(node, "Promise#done requires two arguments");
  }
});
