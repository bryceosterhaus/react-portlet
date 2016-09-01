"use strict";

var jsstana = require("../lib/jsstana.js");

module.exports = jsstana.eslintRule("(throw (?e nor (new ?exc . ?) (ident ?var) (property)))", function(context, node, m) {
  if (jsstana.match("(string)", m.e)) {
    context.report(node, "Don't throw string");
  }
});
