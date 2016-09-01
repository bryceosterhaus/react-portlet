"use strict";

var _ = require("underscore");
var assert = require("assert");
var utils = require("../utils.js");
var misc = require("../misc.js");

function compileCallMatcher(args) {
  /* jshint validthis:true */

  var groups = args.map(function (arg) {
    if (typeof arg === "string" && arg.substr(0, 2) === "??") {
      return {
        type: "multi",
        name: arg.substr(2),
      };
    } else {
      return {
        type: "single",
        matcher: this.matcher(arg),
      };
    }
  }, this);

  var minArgumentsCount = 0;
  var multiGroupsCount = 0;
  for (var i = 0; i < groups.length; i++) {
    if (groups[i].type === "single") {
      minArgumentsCount += 1;
    } else {
      multiGroupsCount += 1;
    }
  }

  return {
    groups: groups,
    minArgumentsCount: minArgumentsCount,
    multiGroupsCount: multiGroupsCount,
  };
}

/**
  #### (call callee arg0...argn)

  Matches `CallExpression`.

  `(call fun arg1 arg2)` matches exact amount of arguments,
  for arbitrary arguments use
  `(call fun ??params)`

  #### (new class arg0...argn)

  Matches `NewExpression`.
*/
function callMatcher(callnew, callee) {
  /* jshint validthis:true */
  callee = callee || "?";

  var calleeMatcher = this.matcher(callee);
  var args = _.toArray(arguments).slice(2);

  var compiled = compileCallMatcher.call(this, args);

  // destruct
  var groups = compiled.groups;
  var groupsCount = groups.length;
  var multiGroupsCount = compiled.multiGroupsCount;
  var minArgumentsCount = compiled.minArgumentsCount;
  var variableArguments = multiGroupsCount !== 0;

  if (variableArguments) {
    assert(minArgumentsCount < groupsCount, "variable arguments: minArgumentsCount should be less than groupsCount");
    assert(multiGroupsCount > 0, "groups count should be greater than zero");

    return misc.nodeMatcher(callnew ? "CallExpression" : "NewExpression", function (node) {
      // Check the length of arguments list
      if (node.arguments.length < minArgumentsCount) { return undefined; }

      // callee
      var calleeM = calleeMatcher(node.callee);
      if (calleeM === undefined) { return undefined; }

      // arguments
      var argumentsLength = node.arguments.length;
      var parts = utils.partitions(argumentsLength - minArgumentsCount, multiGroupsCount);
      var argumentsM = utils.some(parts, function (part) {
        // console.log("part", part);
        var resultM = {};
        var argumentIdx = 0;
        var multiIdx = 0;
        for (var groupIdx = 0; groupIdx < groupsCount; groupIdx++) {
          var group = groups[groupIdx];
          // console.log("LOOP", groupIdx, group.type, argumentIdx, multiIdx);
          if (group.type === "single") {
            var groupM = group.matcher(node.arguments[argumentIdx]);
            if (groupM === undefined) { return undefined; }
            _.extend(resultM, groupM);
            argumentIdx += 1;
          } else {
            var mgSize = part[multiIdx];
            if (group.name !== "") {
              resultM[group.name] = node.arguments.slice(argumentIdx, argumentIdx + mgSize);
            }
            argumentIdx += mgSize;
            multiIdx += 1;
          }
        }
        return resultM;
      });

      if (argumentsM === undefined) { return undefined; }

      return _.extend(calleeM, argumentsM);
    });
  } else {
    assert(minArgumentsCount === groupsCount, "no variable arguments: minArgumentsCount should equal groupsCount");
    return misc.nodeMatcher(callnew ? "CallExpression" : "NewExpression", function (node) {
      // Check the length of arguments list
      if (node.arguments.length !== minArgumentsCount) { return undefined; }

      // callee
      var calleeM = calleeMatcher(node.callee);
      if (calleeM === undefined) { return undefined; }

      // arguments
      for (var i = 0; i < groupsCount; i++) {
        var group = groups[i];
        assert(group.type === "single");
        var groupM = group.matcher(node.arguments[i]);
        if (groupM === undefined) { return undefined; }
        _.extend(calleeM, groupM);
      }

      return calleeM;
    });
  }
}

module.exports = {
  "call": _.partial(callMatcher, true),
  "new": _.partial(callMatcher, false),
};
