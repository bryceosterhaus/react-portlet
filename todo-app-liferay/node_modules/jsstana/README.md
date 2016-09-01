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

## Pattern syntax

#### (?name pattern)

Gives pattern a name, so matching node is also captured.

```js
jsstana.match("(binary ?op ?lhs (?rhs (or (literal) (ident))))");
```

#### (not pattern)

Matches when `pattern` doesn't match.

#### (or pattern1 pattern2...)

Matches if any pattern matches, returns first match.

#### (and pattern1 pattern2...)

Matches if all pattern matches, returns combined match.

### (nor pattern) and (nand pattern)

Are the same as `(not (or pattern))` and `(not (and pattern))` respectively.

#### (call callee arg0...argn)

Matches `CallExpression`.

`(call fun arg1 arg2)` matches exact amount of arguments,
for arbitrary arguments use
`(call fun ??params)`

#### (new class arg0...argn)

Matches `NewExpression`.

#### (ident name)

Matches `Identifier`.

#### (var name init)

Matches `VariableDeclarator`.

#### (null-node)

Matches `undefined` node.

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

#### (this)

Matches `ThisExpression`.

#### (return value)

Matches `ReturnStatement`.

#### (expression expr)

Matches expression statement, `ExpressionStatement`.

#### (throw ex)

Matches `ThrowStatement`.

#### (break)

Matches `BreakStatement`.

#### (continue)

Matches `ContinueStatement`.

#### (member object property)

Matches `MemberExpression`.

- (property object property) matches non computed expressions, i.e. `foo.bar`.
- (subscript object property) matches computed expressions i.e. `foo[bar]`.

#### (lookup var.sub.name)

Helper macro for nested variable access.
`(lookup foo.bar.baz)` is equivalent to `(property (property foo bar) baz)`.

The atom `foo.bar.baz` works as `(lookup foo.bar.baz)`.

#### (binary op lhs rhs)

Matches `BinaryExpression`.

Also shorthand syntax is supported, `(+ a b)` is the same as `(binary + a b)`.

#### (logical op lhs rhs)

Matches `LogicalExpression`. ie. `&&` and `||` operators.

#### (unary op value)

Matches `UnaryExpression`.

Also shorthand version works for `!` and `~`: `(~ ?foo)` is the same as `(unary ~ ?foo)`.

#### (update op value)

Matches `UpdateExpression`.

You might want to use `postfix` and `prefix` though.

#### (assign op var value)

Matches `AssignmentExpression`.

#### (ternary test con alt)

Matches `ConditionalExpression`.

#### (fn-expr)

Matches `FunctionExpression`.

#### (object)

Matches `ObjectExpression`.

## API

### match(pattern, node)

Match `node` against `pattern`.
If pattern matches returns an object with match captures.
Otherwise returns `undefined`.

This function is autocurried ie. when one argument is passed, returns function `node -> matchresult`.

This function is also memoized on the pattern, ie each pattern is compiled only once.

### createMatcher(pattern, [posMatcher])

Create matcher. With one argument, `matcher(pattern) === match(pattern)`.
With additional arguments, you can add `$0`, `$1`... additional anonymous matchers.

```js
var matcher = jsstana.createMatcher("(expr (= a $0))", function (node) {
  return node.type === "ObjectExpression" && node.properties.length === 0 ? {} : undefined;
});
```

### eslintRule(pattern, f)

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

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.

- Add unit tests for any new or changed functionality.
- Lint and test your code using [Grunt](http://gruntjs.com/).
- Use `istanbul cover grunt simplemocha` to run tests with coverage with [istanbul](http://gotwarlost.github.io/istanbul/).
- Create a pull request

## Release History

- 0.1.6 &mdash; *2015-08-28* &mdash; Depdenency update
- 0.1.5 &mdash; *2014-02-25* &mdash; Dependency bump
- 0.1.4 &mdash; *2014-11-09* &ndash; jsstana.eslintRule
    - `(object)` matcher
- 0.1.3 Multiple multi-param matching groups in `(call)`

    Example: `(call ? ?? 0 ??)` checks whether function has zero as any argument.

- 0.1.2 Fix bug, identifier could start with underscore: `_`
- 0.1.1 New (call) syntax
    - `(call ?fun ?param ?params ?last-one)`
- 0.0.22 dependency updates
- 0.0.21 Use commander
- 0.0.20 dependency update
- 0.0.19 dependency updates
- 0.0.18 null checks
    - Also updated dependencies
- 0.0.17 this, break &amp; continue
    - Added forementioned matchers
- 0.0.16 Updates
    - Dependencies updated
    - `fn-expr` matches function expressions
- 0.0.15 Updates
    - Dependencies updated
        - Introduce eslint
        - Fix logical expressions: `&&` and `||`
- 0.0.14 Better cli experience
    - Strip shebang by default
    - Truncate long output lines
    - Fancier colorize of jsgrep output
    - Catch parse errors and unexisting files
- 0.0.13 nand, nor and ?
    - node capturing
    - nand and nor
    - instanceof, typeof, delete and void operators
- 0.0.12 Code reogranization
- 0.0.11 User-provided patterns
    - fixed installing on Windows
    - assignment pattern
    - anonymous matchers
- 0.0.10 ident pattern
- 0.0.9 Boolean patterns
- 0.0.8 Even more rands
    - unary and update expressions
    - drop `literal-` prefix (eg plain `string` now)
    - shorthand binary op syntax `(+ a b)`
- shorthand lookup syntax
- 0.0.7 jsgrep, third try
- 0.0.6 jsgrep, second try
- 0.0.5 jsgrep
    - also new expression
- 0.0.4 Binary and throw
- 0.0.3 More rands
    - call dotted syntax
    - literals
    - expr - expression statement
    - use grunt-literate to generate README.md
- 0.0.2 Dev setup
- 0.0.1 Preview release

Copyright Oleg Grenrus 2013

All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.

    * Redistributions in binary form must reproduce the above
      copyright notice, this list of conditions and the following
      disclaimer in the documentation and/or other materials provided
      with the distribution.

    * Neither the name of Oleg Grenrus nor the names of other
      contributors may be used to endorse or promote products derived
      from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
