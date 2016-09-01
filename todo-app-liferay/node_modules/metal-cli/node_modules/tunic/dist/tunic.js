/**
 * # Tunic
 *
 * A base parser for [Toga](http://togajs.con) documentation. Generates an
 * abstract syntax tree based on a customizable regular-expression grammar.
 *
 * @title Tunic
 * @name tunic
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _moutArrayContains = require('mout/array/contains');

var _moutArrayContains2 = _interopRequireDefault(_moutArrayContains);

var _moutArrayFlatten = require('mout/array/flatten');

var _moutArrayFlatten2 = _interopRequireDefault(_moutArrayFlatten);

var _moutLangToString = require('mout/lang/toString');

var _moutLangToString2 = _interopRequireDefault(_moutLangToString);

var _stream = require('stream');

var AST_TYPE_DOCUMENTATION = 'Documentation',
    AST_TYPE_BLOCK = 'CommentBlock',
    AST_TYPE_TAG = 'CommentBlockTag';

/**
 * @class Tunic
 * @extends Stream.Transform
 */

var Tunic = (function (_Transform) {
	_inherits(Tunic, _Transform);

	_createClass(Tunic, null, [{
		key: 'defaults',

		/**
   * Default options.
   *
   * @property {Object} defaults
   * @static
   */
		value: {
			/** The name of the property in which to store the documentation AST. */
			property: 'docAst',

			/** Matches any file extension. */
			extension: /.\w+$/,

			/** Matches allowed indention characters. */
			blockIndent: /^[\t \*]/gm,

			/** Splits code blocks from documentation blocks. */
			blockSplit: /(^[\t ]*\/\*\*(?!\/)[\s\S]*?\s*\*\/)/m,

			/** Parses documentation blocks. */
			blockParse: /^[\t ]*\/\*\*(?!\/)([\s\S]*?)\s*\*\//m,

			/** Splits tags on leading `@` symbols. */
			tagSplit: /^[\t ]*@/m,

			/** Parses `@tag {kind} name - description` chunks. */
			tagParse: /^(\w+)[\t \-]*(?:\{([^\}]+)\})?[\t \-]*(\[[^\]]*\]\*?|\S*)?[\t ]*(-?)[\t ]*([\s\S]+)?$/m,

			/** Which tags have a `name` in addition to a `description`. */
			namedTags: ['arg', 'argument', 'class', 'exports', 'extends', 'imports', 'method', 'module', 'param', 'parameter', 'prop', 'property']
		},

		/**
   * Line matching patterns.
   *
   * @property {Object} matchLines
   */
		enumerable: true
	}, {
		key: 'matchLines',
		value: {
			/** Matches any newline. */
			any: /^/gm,

			/** Matches empty lines. */
			empty: /^$/gm,

			/** Matches any trailing whitespace including newlines. */
			trailing: /^\s*[\r\n]+|[\r\n]+\s*$/g,

			/** Matches outermost whitespace including first and last newlines. */
			edge: /^[\t ]*[\r\n]|[\r\n][\t ]*$/g
		},

		/**
   * @constructor
   * @param {Object} options
   */
		enumerable: true
	}]);

	function Tunic(options) {
		_classCallCheck(this, Tunic);

		_get(Object.getPrototypeOf(Tunic.prototype), 'constructor', this).call(this, { objectMode: true });

		this.options = null;
		var defaults = Tunic.defaults;
		var namedTags = defaults.namedTags.slice();

		this.options = _extends({}, defaults, {
			namedTags: namedTags
		}, options);
	}

	/**
  * Splits a chunk into blocks and generates the root AST node.
  *
  * @method parse
  * @param {String} chunk
  * @return {Object}
  */

	_createClass(Tunic, [{
		key: 'parse',
		value: function parse(chunk) {
			chunk = (0, _moutLangToString2['default'])(chunk);

			var blockSplit = this.options.blockSplit;

			var _chunk$split = chunk.split(blockSplit);

			var _chunk$split2 = _toArray(_chunk$split);

			var firstCodeBlock = _chunk$split2[0];

			var blocks = _chunk$split2.slice(1);

			/**
    * The blocks array will always start with a code block. If that block
    * is empty, we can skip it. Otherwise we need an empty comment block
    * to own it as trailing code.
    */
			if (firstCodeBlock && firstCodeBlock.trim()) {
				blocks.unshift('', firstCodeBlock);
			}

			/**
    * The blocks array is guaranteed to start with a comment now, so we
    * can proceed with processing and generate the root AST node.
    */
			return {
				type: AST_TYPE_DOCUMENTATION,
				body: this.parseBlocks(blocks)
			};
		}

		/**
   * @method parseBlocks
   * @param {Array.<String>} blocks
   * @return {Array}
   */
	}, {
		key: 'parseBlocks',
		value: function parseBlocks() {
			var retval = [],
			    blocks = (0, _moutArrayFlatten2['default'])(arguments),
			    length = blocks.length,
			    i = 0;

			for (; i < length; i += 2) {
				retval.push(this.parseComment(blocks[i], // comment block
				blocks[i + 1] // code block
				));
			}

			return retval;
		}

		/**
   * Splits a comment block by tag and generates a comment AST node.
   *
   * @method parseComment
   * @param {String} commentBlock
   * @param {String} codeBlock
   * @return {Object}
   */
	}, {
		key: 'parseComment',
		value: function parseComment(commentBlock, codeBlock) {
			commentBlock = (0, _moutLangToString2['default'])(commentBlock);
			codeBlock = (0, _moutLangToString2['default'])(codeBlock);

			var tagSplit = this.options.tagSplit;
			var matchLines = Tunic.matchLines;

			var _unwrap$split = this.unwrap(commentBlock).split(tagSplit);

			var _unwrap$split2 = _toArray(_unwrap$split);

			var description = _unwrap$split2[0];
			var tags = _unwrap$split2.slice(1);

			var trailingCode = codeBlock.replace(matchLines.trailing, '');

			return {
				type: AST_TYPE_BLOCK,
				description: description, trailingCode: trailingCode,
				tags: tags.map(this.parseTag, this)
			};
		}

		/**
   * Splits a tag into its various bits and generates a tag AST node.
   *
   * @method parseTag
   * @param {String} tagBlock
   * @return {Object}
   */
	}, {
		key: 'parseTag',
		value: function parseTag(tagBlock) {
			tagBlock = (0, _moutLangToString2['default'])(tagBlock);

			var _options = this.options;
			var namedTags = _options.namedTags;
			var tagParse = _options.tagParse;
			var tagBlockSegments = tagBlock.match(tagParse) || [];

			var _tagBlockSegments = _slicedToArray(tagBlockSegments, 6);

			var tag = _tagBlockSegments[1];
			var kind = _tagBlockSegments[2];
			var name = _tagBlockSegments[3];
			var delimiter = _tagBlockSegments[4];
			var description = _tagBlockSegments[5];

			/**
    * The regular expression has no way to know if a tag is supposed to
    * have a name segment, so we have to help it out. In some cases the
    * name is really just the first word of the description.
    */
			if (name && !delimiter && !(0, _moutArrayContains2['default'])(namedTags, tag)) {
				description = [name, description].filter(function (x) {
					return x && x.trim();
				}).join(' ').trim();

				name = undefined;
			}

			return {
				type: AST_TYPE_TAG,
				tag: tag, kind: kind, name: name, description: description
			};
		}

		/**
   * Strips open- and close-comment markers and unindents the content.
   *
   * @method unwrap
   * @param {String} block
   * @return {Object}
   */
	}, {
		key: 'unwrap',
		value: function unwrap(block) {
			block = (0, _moutLangToString2['default'])(block);

			var lines;
			var emptyLines;
			var indentedLines;
			var _options2 = this.options;
			var blockIndent = _options2.blockIndent;
			var blockParse = _options2.blockParse;
			var matchLines = Tunic.matchLines;

			// Trim comment wrappers
			block = block.replace(blockParse, '$1').replace(matchLines.edge, '');

			// Total line count
			lines = block.match(matchLines.any).length;

			// Attempt to unindent
			while (lines > 0) {
				// Empty line count
				emptyLines = (block.match(matchLines.empty) || []).length;

				// Indented line count
				indentedLines = (block.match(blockIndent) || []).length;

				// Only continue if every line is still indented
				if (!indentedLines || emptyLines + indentedLines !== lines) {
					break;
				}

				// Strip leading indent characters
				block = block.replace(blockIndent, '');
			}

			return block;
		}

		/**
   * @method _transform
   * @param {String} file
   * @param {String} encoding
   * @param {Function} next
   */
	}, {
		key: '_transform',
		value: function _transform(file, encoding, next) {
			var _options3 = this.options;
			var extension = _options3.extension;
			var property = _options3.property;

			if (!file || file.isAsset || !extension.test(file.path)) {
				this.push(file);
				return next();
			}

			file[property] = this.parse(file.contents);

			this.push(file);
			next();
		}
	}]);

	return Tunic;
})(_stream.Transform);

exports['default'] = Tunic;
module.exports = exports['default'];

/**
 * @property {Object} options
 */