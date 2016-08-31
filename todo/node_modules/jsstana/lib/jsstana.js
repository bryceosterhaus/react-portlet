/**
  # jsstana

  > s-expression match patterns for [Mozilla Parser AST](https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API)

  [jsstana](oleg.fi/jsstana) will help you to find exactly the code snippet you are searching for.
  It's much more precise than using grep.

  [![Build Status](https://secure.travis-ci.org/phadej/jsstana.svg?branch=master)](http://travis-ci.org/phadej/jsstana)
  [![NPM version](https://badge.fury.io/js/jsstana.svg)](http://badge.fury.io/js/jsstana)
  [![Dependency Status](https://gemnasium.com/phadej/jsstana.svg)](https://gemnasium.com/phadej/jsstana)
  [![Code Climate](https://img.shields.io/codeclimate/github/phadej/jsstana.svg)](https://codeclimate.com/github/phadej/jsstana)

  ## Synopsis

  ```javascript
  var jsstana = require("jsstana");
  var esprima = require("esprima");

  var contents = // ...
  var syntax = esprima.parse(contents);

  jsstana.traverse(syntax, function (node) {
    var m = jsstana.match("(call alert ?argument)", node);
    if (m) {
      console.log("alert called with argument", m.argument);
    }
  });
  ```

  ## jsgrep

  The jsgrep example utility is provided

  ```bash
  # find assertArguments calls with 4 arguments
  % jsgrep '(call ?.assertArguments ? ? ? ?)' lib
  matchers/literal.js:25:   this.assertArguments("true/false/null/infinity/nan/undefined", 0, arguments, 1);
  matchers/literal.js:111:   this.assertArguments("literal", 1, arguments, 1);
  matchers/member.js:18:   that.assertArguments("member/property/subscript", 2, arguments, 1);
  matchers/operator.js:63:   that.assertArguments(ratorName, 3, arguments, 3);
  matchers/operator.js:98:   that.assertArguments("unary", 2, arguments, 1);
  matchers/operator.js:128:   that.assertArguments("update/postfix/prefix", 2, arguments, 1);
  matchers/simple.js:7:   this.assertArguments(rator, 1, arguments, 3);
  ```
*/

"use strict";

var _ = require("underscore");
var assert = require("assert");
var sexprParse = require("./sexpr.js").parse;
var Levenshtein = require("levenshtein");
var misc = require("./misc.js");
var literal = require("./matchers/literal.js");

// Generic traversing function
function traverse(object, visitor) {
  if (visitor.call(null, object) === false) { // eslint-disable-line no-useless-call
    return;
  }

  _.each(object, function (child, key) {
    if (key === "loc" || key === "range") {
      // skip loc and range elements
      return;
    }

    // subelements are either "map" objects or arrays
    if (_.isArray(child)) {
      child.forEach(function (c) {
        traverse(c, visitor);
      });
    } else if (_.isObject(child) && !_.isRegExp(child)) {
      traverse(child, visitor);
    }
  });
}

var builtInMatchers = {};
_.extend(builtInMatchers, require("./matchers/logic.js"));
_.extend(builtInMatchers, require("./matchers/literal.js"));
_.extend(builtInMatchers, require("./matchers/operator.js"));
_.extend(builtInMatchers, require("./matchers/simple.js"));
_.extend(builtInMatchers, require("./matchers/call.js"));
_.extend(builtInMatchers, require("./matchers/ident.js"));
_.extend(builtInMatchers, require("./matchers/member.js"));
_.extend(builtInMatchers, require("./matchers/null.js"));
_.extend(builtInMatchers, require("./matchers/ternary.js"));
_.extend(builtInMatchers, require("./matchers/fn.js"));
_.extend(builtInMatchers, require("./matchers/object.js"));

function unknownNodeType(rator) {
  /* jshint validthis:true */
  var suggest = [];
  function findClose(key) {
    var d = new Levenshtein(rator, key).distance;

    if (d <= 2) {
      suggest.push(key);
    }
  }

  _.chain(this.matchers).keys().each(findClose);
  _.chain(builtInMatchers).keys().each(findClose);

  if (suggest.length === 0) {
    throw new Error("unknown node type: " + rator);
  } else {
    throw new Error("unknown node type: " + rator + ". Did you mean one of: " + suggest.join(" "));
  }
}

function matcherString(sexpr) {
  /* jshint validthis:true */
  var that = this;

  if (sexpr.indexOf(".") !== -1) {
    sexpr = sexpr.split(".").reduce(function (prev, next) {
      return ["property", prev, next];
    });
    return that.matcher(sexpr);
  } else if (sexpr === "?") {
    return function () {
      return {};
    };
  } else if (sexpr[0] === "?") {
    sexpr = sexpr.substr(1);
    return function (node) {
      var res = {};
      res[sexpr] = node;
      return res;
    };
  } else if (sexpr.match(/^\$\d+$/)) {
    sexpr = parseInt(sexpr.substr(1), 10);
    assert(sexpr < that.positionalMatchers.length,
      "there is only " + that.positionalMatchers.length + " positional matchers, required " + sexpr);
    return that.positionalMatchers[sexpr];
  } else if (sexpr === "this") {
    return literal.this.call(that);
  } else if (_.has(misc.CONSTANTS, sexpr)) {
    return literal[sexpr].call(that);
  } else {
    return function (node) {
      return node.type === "Identifier" && node.name === sexpr ? {} : undefined;
    };
  }
}

function matcherNumber(sexpr) {
  return function (node) {
    return node.type === "Literal" && node.value === sexpr ? {} : undefined;
  };
}

function matcherArray(sexpr) {
  /* jshint validthis:true */
  var that = this;
  var rator = _.first(sexpr);
  var rands = _.rest(sexpr);

  // Capture
  if (rator === "?") {
    return matcherArray.call(this, rands);
  } else if (rator[0] === "?") {
    rator = rator.substr(1);
    var nonCapturingMatcher = matcherArray.call(this, rands);
    return function (node) {
      var m = nonCapturingMatcher(node);
      if (m !== undefined) {
        var res = {};
        res[rator] = node;
        return _.extend(res, m);
      }
    };
  }

  if (_.has(that.matchers, rator)) {
    return that.matchers[rator].apply(that, rands);
  } else if (_.has(builtInMatchers, rator)) {
    return builtInMatchers[rator].apply(that, rands);
  } else {
    return unknownNodeType.call(that, rator);
  }
}

function matcher(sexpr) {
  /* jshint validthis:true */
  /* eslint no-use-before-define: 0 */
  // JsstancaContext is used here, even defined later

  assert(_.isString(sexpr) || _.isNumber(sexpr) || _.isArray(sexpr),
    "expression should be a number, a string or an array -- " + sexpr);

  var that = this instanceof JsstanaContext ? this : new JsstanaContext();
  var args = _.toArray(arguments).slice(1);
  if (args.length !== 0) {
    that = new JsstanaContext(that);
    that.positionalMatchers = args;
  }

  if (_.isString(sexpr)) {
    return matcherString.call(that, sexpr);
  } else if (_.isNumber(sexpr)) {
    return matcherNumber.call(that, sexpr);
  } else { /* if (_.isArray(sexpr)) */
    return matcherArray.call(that, sexpr);
  }
}

function assertArguments(rator, n, rands, m) {
  m = m || 0;
  assert(rands.length <= n + m, rator + " -- takes at most " + n + " argument(s)");
}

function combineMatches() {
  var args = _.toArray(arguments);
  if (args.some(_.isUndefined)) { return undefined; }
  return _.extend.apply(undefined, args);
}

/**
  ## Pattern syntax

  #### (?name pattern)

  Gives pattern a name, so matching node is also captured.

  ```js
  jsstana.match("(binary ?op ?lhs (?rhs (or (literal) (ident))))");
  ```
*/
/// include matchers/logic.js
/// include matchers/call.js
/// include matchers/ident.js
/// include matchers/null.js
/// include matchers/literal.js
/// include matchers/simple.js
/// include matchers/member.js
/// include matchers/operator.js
/// include matchers/ternary.js
/// include matchers/fn.js
/// include matchers/object.js

/**
  ## API
*/

// memoized patterns
var matchPatterns = {};

/**
    ### match(pattern, node)

    Match `node` against `pattern`.
    If pattern matches returns an object with match captures.
    Otherwise returns `undefined`.

    This function is autocurried ie. when one argument is passed, returns function `node -> matchresult`.

    This function is also memoized on the pattern, ie each pattern is compiled only once.
*/
function match(pattern, node) {
  /* jshint validthis:true */
  assert(arguments.length === 1 || arguments.length === 2, "match takes one or two arguments");
  var that = this instanceof JsstanaContext ? this : new JsstanaContext();

  if (!_.has(matchPatterns, pattern)) {
    matchPatterns[pattern] = that.matcher(sexprParse(pattern));
  }

  var m = matchPatterns[pattern];

  if (arguments.length === 1) {
    return m;
  } else {
    return m(node);
  }
}

/**
    ### createMatcher(pattern, [posMatcher])

    Create matcher. With one argument, `matcher(pattern) === match(pattern)`.
    With additional arguments, you can add `$0`, `$1`... additional anonymous matchers.

    ```js
    var matcher = jsstana.createMatcher("(expr (= a $0))", function (node) {
      return node.type === "ObjectExpression" && node.properties.length === 0 ? {} : undefined;
    });
    ```
*/
function createMatcher() {
  /* jshint validthis:true */
  var args = _.toArray(arguments);
  args[0] = sexprParse(args[0]);
  return matcher.apply(this, args);
}

/**
  ### eslintRule(pattern, f)
*/
function eslintRule(pattern, f) {
  /* jshint validthis:true */
  var compiled = this.match(pattern);
  return function (context) {
    var ruleCheck = function (node) {
      var m = compiled(node);
      if (m) {
        f(context, node, m);
      }
    };

    var res = {};
    _.each(compiled.nodeTypes, function (nodeType) {
      res[nodeType] = ruleCheck;
    });
    return res;
  };
}

/**
  ### new jsstana()

  Create new jsstana context. You can add new operations to this one.

  ```js
  var ctx = new jsstana();
  ctx.addMatchers("empty-object", function () {
    this.assertArguments("empty-object", 0, arguments);
    return function (node) {
      return node.type === "ObjectExpression" && node.properties.length === 0 ? {} : undefined;
    };
  });
  ctx.match("(empty-object", node);
  ```

  You may compile submatchers with `this.matcher(sexpr)` and combine their results with `this.combineMatches`.
  `this.assertArguments` checks argument (rator) count, to help validate pattern grammar.
*/
function JsstanaContext(context) {
  this.matchers = context instanceof JsstanaContext ? context.matchers : {};
  this.positionalMatchers = [];
}

// matcher utilities
JsstanaContext.prototype.combineMatches = combineMatches;
JsstanaContext.prototype.assertArguments = assertArguments;
JsstanaContext.prototype.matcher = matcher;

// public api
JsstanaContext.prototype.match = match;
JsstanaContext.prototype.eslintRule = eslintRule;
JsstanaContext.prototype.createMatcher = createMatcher;
JsstanaContext.prototype.addMatcher = function (name, f) {
  assert(!_.has(this.matchers, name), "matcher names should be unique: " + name);
  this.matchers[name] = f;
};

// Exports
JsstanaContext.traverse = traverse;
JsstanaContext.match = match;
JsstanaContext.eslintRule = eslintRule;
JsstanaContext.createMatcher = createMatcher;

module.exports = JsstanaContext;

/// plain ../CONTRIBUTING.md
/// plain ../CHANGELOG.md
/// plain ../LICENSE
