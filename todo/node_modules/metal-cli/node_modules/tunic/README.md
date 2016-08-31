**NOTE: This project is under active development. APIs subject to change.**

# `tunic`

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url] [![Chat][gitter-img]][gitter-url] [![Tip][amazon-img]][amazon-url]

A base parser for [Toga](http://togajs.github.io) documentation. Generates an abstract syntax tree based on a customizable regular-expression grammar. Defaults to C-style comment blocks, so it supports JavaScript, PHP, C++, and even CSS right out of the box.

Tags are parsed greedily. If it looks like a tag, it's a tag. What you do with them is completely up to you. Render something human-readable, perhaps?

## Install

    $ npm install --save tunic

## Documentation Blocks

Documentation blocks follow the conventions of other standard tools such as JSDoc, Google Closure, YUIDoc, PHPDoc, JavaDoc, etc. The primary difference is that nothing is inferred from the code. If you want it documented, you must document it. This is why you can use tunic to parse inline documentation out of almost any language that supports multi-line comments.

## AST

- Root
  - `type` `{String}` - Always `"Document"`.
  - `blocks` `{Array.<Code|Comment>}`
- Code
  - `type` `{String}` - Always `"Code"`.
  - `body` `{String}`
- Comment
  - `type` `{String}` - Always `"Comment"`.
  - `description` `{String}`
  - `tags` `{Array.<Tag>}`
- Tag
  - `tag` `{String}`
  - `type` `{String}`
  - `name` `{String}`
  - `description` `{String}`

## API

### `new Tunic([options])`

- `options` `{Object}` - Optional grammar overrides.
  - `property` `{RegExp}` - Name of property that the AST should be assigned to on Vinyl files. _Default: `"ast"`._
  - `extension` `{RegExp}` - Matches the file extension or extensions which are handled by this parser.
  - `blockIndent` `{RegExp}` - Matches any leading characters that are valid as DocBlock indentation, such as whitespace or asterisks. Used for normalization.
  - `blockParse` `{RegExp}` - Matches the content of a DocBlock, where the first capturing group is the content without the start and end comment characters. Used for normalization.
  - `blockSplit` `{RegExp}` - Splits code and docblocks into alternating chunks.
  - `tagParse` `{RegExp}` - Matches the various parts of a tag where parts are captured in the following order:
    - 1: `tag`
    - 2: `type`
    - 3: `name`
    - 4: `description`
  - `tagSplit` `{RegExp}` - Matches characters used to split description and tags from each other.
  - `namedTags` `{Array.<String>}` - Which tags should be considered "named" tags. Non-named tags will have their name prepended to the description and set to `undefined`.

Creates a reusable parser based on the given options. Defaults to parsing C-style comment blocks.

### `#parse(block) : AST`

- `block` `{String}` - Block of code containing comments to parse.

Generates a sensible syntax tree format of doc-blocks and surrounding code.

### `#pipe(stream) : Stream.Readable`

- `stream` `{Stream.Writable}` - Writable stream.

Tunic is a [Transform Stream](http://nodejs.org/api/stream.html#stream_class_stream_transform), working in object mode, compatible with `String`, `Buffer`, and [Vinyl](https://github.com/wearefractal/vinyl). Strings and buffers are parsed and the resulting AST is emitted as data. Vinyl objects are augmented with the AST stored as the `.ast` property.

## Example

### Default Options

```js
var Tunic = require('tunic'),
    ast = new Tunic().parse('/** ... */');
```

### Custom Options

```js
var Tunic = require('tunic'),

    hbs = new Tunic({
        extension: /\.(hbs|html?)$/,
        blockIndent: /^[\t !]/gm,
        blockParse: /^[\t ]*\{\{!---(?!-)([\s\S]*?)\s*--\}\}/m,
        blockSplit: /(^[\t ]*\{\{!---(?!-)[\s\S]*?\s*--\}\})/m,
        namedTags: ['arg', 'argument', 'data', 'prop', 'property']
    }),

    handlebarsAst = hbs.parse('{{!--- ... --}}\n<div> ...'),

    pod = new Tunic({
        extension: /\.(pl|pm)$/,
        blockParse: /^=pod\n([\s\S]*?)\n=cut$/m,
        blockSplit: /(^=pod\n[\s\S]*?\n=cut$)/m,
        namedTags: ['arg', 'argument', 'data', 'prop', 'property']
    }),

    perlAst = pod.parse('=pod\n ... \n=cut');
```

### Streams

```js
var toga = require('toga'),
    Tunic = require('tunic');

toga.src('./lib/**/*.js')
    .pipe(new Tunic()) // generates and adds `.ast` property to `file` objects
    // ... formatter(s)
    // ... copmiler(s)
    .pipe(toga.dest('./docs'));
```

## Test

    $ npm test

## Contribute

[![Tasks][waffle-img]][waffle-url]

Standards for this project, including tests, code coverage, and semantics are enforced with a build tool. Pull requests must include passing tests with 100% code coverage and no linting errors.

----

© 2015 Shannon Moeller <me@shannonmoeller.com>

Licensed under [MIT](http://shannonmoeller.com/mit.txt)

[amazon-img]:    https://img.shields.io/badge/amazon-tip_jar-yellow.svg?style=flat-square
[amazon-url]:    https://www.amazon.com/gp/registry/wishlist/1VQM9ID04YPC5?sort=universal-price
[coveralls-img]: http://img.shields.io/coveralls/togajs/tunic/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/togajs/tunic
[downloads-img]: http://img.shields.io/npm/dm/tunic.svg?style=flat-square
[gitter-img]:    http://img.shields.io/badge/gitter-join_chat-1dce73.svg?style=flat-square
[gitter-url]:    https://gitter.im/togajs/toga
[npm-img]:       http://img.shields.io/npm/v/tunic.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/tunic
[travis-img]:    http://img.shields.io/travis/togajs/tunic.svg?style=flat-square
[travis-url]:    https://travis-ci.org/togajs/tunic
[waffle-img]:    http://img.shields.io/github/issues/togajs/tunic.svg?style=flat-square
[waffle-url]:    http://waffle.io/togajs/tunic
