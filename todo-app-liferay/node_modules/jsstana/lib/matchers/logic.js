"use strict";

var _ = require("underscore");
var misc = require("../misc.js");

function notMatch(matcher) {
  var types = _.difference(misc.NODETYPES, matcher.nodetypes);

  return misc.nodeMatcher(types, function (node) {
    return matcher(node) ? undefined : {};
  });
}

/**
  #### (not pattern)

  Matches when `pattern` doesn't match.
*/
function notMatcher(pattern) {
  /* jshint validthis:true */
  this.assertArguments("not", 1, arguments);
  pattern = pattern || "?";

  return notMatch(this.matcher(pattern));
}

/**
  #### (or pattern1 pattern2...)

  Matches if any pattern matches, returns first match.
*/
function orMatcher() {
  /* jshint validthis:true */
  var args = _.toArray(arguments);
  var argsMatchers = args.map(this.matcher, this);

  var types = _.chain(argsMatchers)
    .pluck("nodeTypes")
    .flatten()
    .sortBy()
    .uniq(true)
    .value();

  return misc.nodeMatcher(types, function (node) {
    for (var i = 0; i < argsMatchers.length; i++) {
      var m = argsMatchers[i](node);
      if (m) {
        return m;
      }
    }

    return undefined;
  });
}

/**
  #### (and pattern1 pattern2...)

  Matches if all pattern matches, returns combined match.
*/
function andMatcher() {
  /* jshint validthis:true */
  var args = _.toArray(arguments);
  var argsMatchers = args.map(this.matcher, this);

  var types = _.chain(argsMatchers)
    .pluck("nodeTypes")
    .reduce(function (a, b) { return _.intersection(a, b); }, misc.NODETYPES)
    .value();

  return misc.nodeMatcher(types, function (node) {
    var res = {};

    for (var i = 0; i < argsMatchers.length; i++) {
      var m = argsMatchers[i](node);
      if (m === undefined) {
        return undefined;
      }

      res = _.extend(res, m);
    }

    return res;
  });
}

/**
  ### (nor pattern) and (nand pattern)

  Are the same as `(not (or pattern))` and `(not (and pattern))` respectively.
*/
function norMatcher() {
  /* jshint validthis:true */
  return notMatch(orMatcher.apply(this, arguments));
}

function nandMatcher() {
  /* jshint validthis:true */
  return notMatch(andMatcher.apply(this, arguments));
}

module.exports = {
  "not": notMatcher,
  "or": orMatcher,
  "and": andMatcher,
  "nor": norMatcher,
  "nand": nandMatcher,
};
