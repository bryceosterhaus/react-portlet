"use strict";

var jsstana = require("../lib/jsstana.js");

module.exports = jsstana.eslintRule("(return (call ?.done ??))", function(context, node, m) {
   context.report(node, "Don't return promise.done, use promise.then or omit return");
});
