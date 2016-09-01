<a href="http://militiajs.github.io/"><img alt="MilitiaJS" src="http://militiajs.github.io/assets/media/militia.svg" width="128" /></a>

# mtil [![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url]

Supporting native JavaScript functionality since 2014, `mtil` is a collection of utility functions. It's similar to, and inspired by, the illustrious [Underscore][underscore], [Lo-Dash][lodash], and [MOUT][mout]. The big difference being `mtil` assumes you're using the latest and greatest JavaScript features (or [polyfills][shims] thereof).

Each utility is in its own file so you only add what you need to your code. No monolithic includes or build configurators here, thank you. Modules are available to use in ES6, CommonJS, and AMD formats.

## Install

With [Node.js](http://nodejs.org):

    $ npm install mtil

With [Bower](http://bower.io):

    $ bower install militiajs/mtil

## API Documentation

_TODO: add api docs here_

## Compatibility

It's assumed that you're using the new shiny by including shims as needed for features that browsers and Node.js have not yet fully implemented. The tests used to create the support graph are generated atop [community ES shims][shims].

_TODO: insert compatibility graph here_

## Contribute

Standards for this project, including tests, code coverage, and semantics are enforced with a build tool. Pull requests must include passing tests with 100% code coverage and no linting errors. Now drop and give me 20!

[![Stories in Ready][waffle-img]][waffle-url]

### Setup

Make sure you've installed [Node.js](http://nodejs.org), which ships with [npm](http://npmjs.org).

```sh
# Clone the repository
$ git clone git://github.com/militiajs/mtil
$ cd mtil

# Install the dependencies
$ npm install
```

### Test

Simply run `gulp`.

```sh
# Install Gulp globally
$ npm install -g gulp

# Run
$ gulp
```

## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

[coveralls-img]: http://img.shields.io/coveralls/militiajs/mtil/master.svg?style=flat
[coveralls-url]: https://coveralls.io/r/militiajs/mtil
[downloads-img]: http://img.shields.io/npm/dm/mtil.svg?style=flat
[npm-img]:       http://img.shields.io/npm/v/mtil.svg?style=flat
[npm-url]:       https://npmjs.org/package/mtil
[travis-img]:    http://img.shields.io/travis/militiajs/mtil.svg?style=flat
[travis-url]:    https://travis-ci.org/militiajs/mtil
[waffle-img]:    https://badge.waffle.io/militiajs/mtil.png?label=ready&title=Ready
[waffle-url]:    http://waffle.io/militiajs/mtil

[lodash]:     http://lodash.com/
[mout]:       http://moutjs.com/
[shims]:      https://github.com/es-shims/
[underscore]: http://underscorejs.org/
