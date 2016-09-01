"use strict";

var _ = require("underscore");

var obj = { foo: 1 };
_.extend(obj, { bar: 2 }, { bar: 3});

var arr = [1, 2, 3];

_.chain(arr)
  .sortBy()
  .uniq()
  .value();

_.uniq(_.sortBy(arr));

var funkyArr = [ {foo: 1}, { foo: 2} ];
var getFoo = function (x) { return x.foo; };
var getBar = function (x) { return x.foo; };

_.uniq(_.sortBy(funkyArr, getFoo), true);
_.uniq(_.sortBy(funkyArr, getFoo), true, function (x) { return x.foo; });
_.uniq(_.sortBy(funkyArr, getFoo), true, getBar);
