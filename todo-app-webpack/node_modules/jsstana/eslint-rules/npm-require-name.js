"use strict";

var jsstana = require("../lib/jsstana.js");
var path = require("path");

module.exports = jsstana.eslintRule("(var ?name (call require ?param))", function(context, node, m) {
  var n = jsstana.match("(string ?paramname)", m.param);
  if (!n) {
    context.report(m.param, "require argument isn't string");
  }

  if (m.name.toLowerCase() === n.paramname.toLowerCase()) { return; }
  if (m.name === "_" && (n.paramname === "underscore" || n.paramname === "lodash")) { return; }
  if (m.name === "p" && n.paramname === "packrattle") { return; }
  if (m.name === "program" && n.paramname === "commander") { return; }
  if (m.name === "jsc" && n.paramname === "jsverify") { return; }
  if (m.name === "walk" && n.paramname === "walkdir") { return; }
  if (n.paramname[0] === ".") {
    var fileName = path.basename(n.paramname).replace(/\.js$/, "");
    if (m.name == fileName) { return; }
  }

  context.report(node, "require assignment variable name and required module name doesn't match");
});
