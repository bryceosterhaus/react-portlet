"use strict";

var _ = require("underscore");
var assert = require("assert");
var misc = require("../misc.js");

/**
  #### (member object property)

  Matches `MemberExpression`.

  - (property object property) matches non computed expressions, i.e. `foo.bar`.
  - (subscript object property) matches computed expressions i.e. `foo[bar]`.
*/
function memberMatcher(computed, object, property) {
  /* jshint validthis:true */
  var that = this;

  that.assertArguments("member/property/subscript", 2, arguments, 1);
  object = object || "?";
  property = property || "?";

  var objectMatcher = that.matcher(object);
  var propertyMatcher = that.matcher(property);

  return misc.nodeMatcher("MemberExpression", function (node) {
    if (computed !== undefined && node.computed !== computed) { return undefined; }

    var objectM = objectMatcher(node.object);
    var propertyM = propertyMatcher(node.property);

    return that.combineMatches(objectM, propertyM);
  });
}

/**
  #### (lookup var.sub.name)

  Helper macro for nested variable access.
  `(lookup foo.bar.baz)` is equivalent to `(property (property foo bar) baz)`.

  The atom `foo.bar.baz` works as `(lookup foo.bar.baz)`.
*/
function lookupMatcher(varname) {
  /* jshint validthis:true */
  var that = this;
  assert(_.isString(varname), "lookup -- takes one string argument");

  // split into parts and build an s-expression
  var parts = varname.split(".");
  var sexpr = parts.reduce(function (prev, next) {
    return ["property", prev, next];
  });

  return that.matcher(sexpr);
}

module.exports = {
  "member": _.partial(memberMatcher, undefined),
  "property": _.partial(memberMatcher, false),
  "subscript": _.partial(memberMatcher, true),
  "lookup": lookupMatcher,
};
