"use strict";

var jsstana = require("../lib/jsstana.js");

var message = "_.uniq called on _.sortBy with iterator requires the same iterator - give it the same name";

module.exports = jsstana.eslintRule("(call _.uniq (call _.sortBy ? ?sortIter) ??params)", function(context, node, m) {
  if (m.params.length !== 2) {
    context.report(node, message);
    return;
  }

  var sortIter = jsstana.match("(ident ?name)", m.sortIter);
  var uniqIter = jsstana.match("(ident ?name)", m.params[1]);

  if (!sortIter || !uniqIter) {
    context.report(node, message);
    return;
  }

  if (sortIter.name !== uniqIter.name) {
    context.report(node, message);
    return;
  }
});
