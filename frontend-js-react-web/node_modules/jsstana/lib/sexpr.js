"use strict";

var p = require("packrattle");
var _ = require("underscore");

var whitespaceP = p.regex(/\s*/);

function lexemeP(parser) {
  return p.seq(parser, whitespaceP).onMatch(function (m) {
    return m[0];
  });
}

function unquote(m) {
  return m[1].replace(/\\(.)/g, function (unused, c) {
    return c;
  });
}

function quote(str) {
  return str.replace(/(['\\])/g, function (unused, c) {
    return "\\" + c;
  });
}

var sexprP = p.alt(
  p.seq(lexemeP("("), p.repeat(function () { return sexprP; }), lexemeP(")")).onMatch(function (m) { return m[1]; }),
  lexemeP(p.regex(/[a-zA-Z\?\.\-\/*+<>=!%,~\$_][a-zA-Z0-9_\?\.\-\/*+<>=+!%,~\$]*/)).onMatch(function (m) { return m[0]; }),
  lexemeP(p.regex(/"((?:[^"]|\\.)*?)"/)).onMatch(unquote),
  lexemeP(p.regex(/'((?:[^']|\\.)*?)'/)).onMatch(unquote),
  lexemeP(p.regex(/[0-9]+/)).onMatch(function (m) { return parseInt(m[0], 10); })
);

function parse(input) {
  var parser = p.seq(sexprP, p.end).onMatch(function (m) {
    return m[0];
  });
  return parser.consume().run(input);
}

function stringifyString(sexpr) {
  if (sexpr === "") {
    return "''";
  } else if (sexpr.match(/[ '"]/) || sexpr.match(/^\d*$/)) {
    return "'" + quote(sexpr) + "'";
  } else {
    return sexpr;
  }
}

function stringify(sexpr) {
  if (_.isString(sexpr)) {
    return stringifyString(sexpr);
  } else if (_.isNumber(sexpr)) {
    return "" + sexpr;
  } else if (_.isArray(sexpr)) {
    return "(" + sexpr.map(stringify).join(" ") + ")";
  }

  throw new Error("sexpr should be an array, a number or a string");
}

module.exports = {
  parse: parse,
  stringify: stringify,
};
