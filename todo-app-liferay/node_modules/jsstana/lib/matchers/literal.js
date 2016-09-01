"use strict";

var _ = require("underscore");
var misc = require("../misc.js");
var assert = require("assert");

/**
  #### (literal value)

  Matches `Literal`.

  There are some additional version::

  - `(string value)` - string values
  - `(number value)` - number values
  - `(bool value)` - boolean values
  - `(regexp value)` - regular expressions
  - `(true)` - matches `true`
  - `(false)` - matches `false`
  - `(null)` - matches `null`
  - `(infinity)` - matches `Infinity`
  - `(nan)` - matches `NaN`, also `(NaN)` is supported
  - `(undefined)` - matches `undefined`, also `(Infinity)` is supported
*/

function literalBuiltinMatcher(type) {
  /* jshint validthis:true */
  this.assertArguments(type, 0, arguments, 1);
  assert(_.has(misc.LITERALS, type), "Unknown built-in literal");

  if (_.has(misc.CONSTANTS, type)) {
    var value = misc.CONSTANTS[type];
    return misc.nodeMatcher("Literal", function (node) {
      return node.value === value ? {} : undefined;
    });
  } else {
    var ident = misc.LITERALS[type];
    return misc.nodeMatcher("Identifier", function (node) {
      return node.name === ident ? {} : undefined;
    });
  }
}

/**
  #### (this)

  Matches `ThisExpression`.
*/
function thisMatcher() {
  /* jshint validthis:true */
  this.assertArguments("this", 0, arguments);

  return misc.nodeMatcher("ThisExpression", function (/* node */) {
    return {};
  });
}

function literalCaptureMatcher(type, value) {
  var valueCheck = {
    any: function () { return true; },
    string: _.isString,
    number: _.isNumber,
    regexp: _.isRegExp,
    bool: _.isBoolean,
  }[type];

  var valueCapture;

  if (value === "?") {
    valueCapture = function () { return {}; };
  } else {
    value = value.substr(1);
    valueCapture = function (v) {
      var res = {};
      res[value] = v;
      return res;
    };
  }

  return misc.nodeMatcher("Literal", function (node) {
    if (!valueCheck(node.value)) { return undefined; }
    return valueCapture(node.value);
  });
}

function literalValue(type, value) {
  return {
    any: _.identity,
    string: _.identity,
    number: function (v) {
      v = parseFloat(v);
      if (isNaN(v)) {
        // TODO: improve check, regexp?
        throw new Error("invalid number value");
      } else {
        return v;
      }
    },
    bool: function (v) {
      if (v === "true") {
        return true;
      } else if (v === "false") {
        return false;
      } else {
        throw new Error("bool values are true and false");
      }
    },
  }[type](value);
}

function literalMatcher(type, value) {
  /* jshint validthis:true */
  this.assertArguments("literal", 1, arguments, 1);

  value = value || "?";

  if (value[0] === "?") {
    return literalCaptureMatcher(type, value);
  } else if (type === "regexp") {
    return misc.nodeMatcher("Literal", function (node) {
      if (!_.isRegExp(node.value)) { return undefined; }
      return node.value.toString() === value ? {} : undefined;
    });
  } else {
    value = literalValue(type, value);

    return misc.nodeMatcher("Literal", function (node) {
      return node.value === value ? {} : undefined;
    });
  }
}

var builtinLiterals = {};
_.chain(misc.LITERALS).keys().each(function (literal) {
  builtinLiterals[literal] = _.partial(literalBuiltinMatcher, literal);
});

module.exports = _.extend({
  "literal": _.partial(literalMatcher, "any"),
  "string": _.partial(literalMatcher, "string"),
  "number": _.partial(literalMatcher, "number"),
  "bool": _.partial(literalMatcher, "bool"),
  "regexp": _.partial(literalMatcher, "regexp"),
  "this": thisMatcher,
}, builtinLiterals);
