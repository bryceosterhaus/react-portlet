"use strict";

var _ = require("underscore");
var misc = require("../misc.js");

function simpleMatcher(rator, statement, prop, expr) {
  /* jshint validthis:true */
  this.assertArguments(rator, 1, arguments, 3);
  expr = expr || "?";

  var exprMatcher = this.matcher(expr);

  return misc.nodeMatcher(statement, function (node) {
    return exprMatcher(node[prop]);
  });
}

function singleMatcher(rator, statement) {
  /* jshint validthis:true */
  this.assertArguments(rator, 0, arguments, 2);

  return misc.nodeMatcher(statement, function (/* node */) {
    return {};
  });
}

/**
  #### (return value)

  Matches `ReturnStatement`.
*/
var returnMatcher = _.partial(simpleMatcher, "return", "ReturnStatement", "argument");

/**
  #### (expression expr)

  Matches expression statement, `ExpressionStatement`.
*/
var expressionMatcher = _.partial(simpleMatcher, "expr", "ExpressionStatement", "expression");

/**
  #### (throw ex)

  Matches `ThrowStatement`.
*/
var throwMatcher = _.partial(simpleMatcher, "throw", "ThrowStatement", "argument");

/**
  #### (break)

  Matches `BreakStatement`.
*/
var breakMatcher = _.partial(singleMatcher, "break", "BreakStatement");

/**
  #### (continue)

  Matches `ContinueStatement`.
*/
var continueMatcher = _.partial(singleMatcher, "continue", "ContinueStatement");

module.exports = {
  "return": returnMatcher,
  "expr": expressionMatcher,
  "throw": throwMatcher,
  "break": breakMatcher,
  "continue": continueMatcher,
};
