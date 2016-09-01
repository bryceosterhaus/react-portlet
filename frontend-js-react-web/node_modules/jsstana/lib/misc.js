"use strict";
/* eslint-disable quote-props */

var _ = require("underscore");

var CONSTANTS = {
  "true": true,
  "false": false,
  "null": null,
};

var LITERALS = {
  "true": "true",
  "false": "false",
  "null": "null",
  "infinity": "Infinity",
  "Infinity": "Infinity",
  "nan": "NaN",
  "NaN": "NaN",
  "undefined": "undefined",
};

/* Fetched on 2014-11-09 */
var NODETYPES = [
  "Program",
  "EmptyStatement",
  "BlockStatement",
  "ExpressionStatement",
  "IfStatement",
  "LabeledStatement",
  "BreakStatement",
  "ContinueStatement",
  "WithStatement",
  "SwitchStatement",
  "ReturnStatement",
  "ThrowStatement",
  "TryStatement",
  "WhileStatement",
  "DoWhileStatement",
  "ForStatement",
  "ForInStatement",
  "ForOfStatement",
  "LetStatement",
  "DebuggerStatement",
  "FunctionDeclaration",
  "VariableDeclaration",
  "VariableDeclarator",
  "ThisExpression",
  "ArrayExpression",
  "ObjectExpression",
  "Property",
  "FunctionExpression",
  "ArrowExpression",
  "SequenceExpression",
  "UnaryExpression",
  "BinaryExpression",
  "AssignmentExpression",
  "UpdateExpression",
  "LogicalExpression",
  "ConditionalExpression",
  "NewExpression",
  "CallExpression",
  "MemberExpression",
  "YieldExpression",
  "ComprehensionExpression",
  "GeneratorExpression",
  "ObjectPattern",
  "ArrayPattern",
  "SwitchCase",
  "CatchClause",
  "ComprehensionBlock",
  "Identifier",
  "Literal",
];

function nodeMatcher(nodeTypes, matcher) {
  if (typeof nodeTypes === "string") {
    nodeTypes = [nodeTypes];
  }

  var f = function (node) {
    if (!node || !_.contains(nodeTypes, node.type)) { return undefined; }
    return matcher(node);
  };

  f.nodeTypes = nodeTypes;
  return f;
}

module.exports = {
  CONSTANTS: CONSTANTS,
  LITERALS: LITERALS,
  NODETYPES: NODETYPES,
  nodeMatcher: nodeMatcher,
};
