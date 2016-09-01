"use strict";

function promiseOperation() {}

function foo() {
  return promiseOperation().done(function (result) {
    console.log(result);
  }, console.error);
}

function bar() {
  promiseOperation().done(function (result) {
    console.log(result);
  });
}

function baz() {
  promiseOperation().then();
}

module.exports = {
  foo: foo,
  bar: bar,
  baz: baz,
};
