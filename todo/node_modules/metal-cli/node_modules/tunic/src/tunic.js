/**
 * # Tunic
 *
 * A base parser for [Toga](http://togajs.con) documentation. Generates an
 * abstract syntax tree based on a customizable regular-expression grammar.
 *
 * @title Tunic
 * @name tunic
 */

import contains from 'mout/array/contains';
import flatten from 'mout/array/flatten';
import toString from 'mout/lang/toString';
import { Transform } from 'stream';

const AST_TYPE_DOCUMENTATION = 'Documentation',
	AST_TYPE_BLOCK = 'CommentBlock',
	AST_TYPE_TAG = 'CommentBlockTag';

/**
 * @class Tunic
 * @extends Stream.Transform
 */
export default class Tunic extends Transform {
	/**
	 * @property {Object} options
	 */
	options = null;

	/**
	 * Default options.
	 *
	 * @property {Object} defaults
	 * @static
	 */
	static defaults = {
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
		namedTags: [
			'arg',
			'argument',
			'class',
			'exports',
			'extends',
			'imports',
			'method',
			'module',
			'param',
			'parameter',
			'prop',
			'property'
		]
	};

	/**
	 * Line matching patterns.
	 *
	 * @property {Object} matchLines
	 */
	static matchLines = {
		/** Matches any newline. */
		any: /^/gm,

		/** Matches empty lines. */
		empty: /^$/gm,

		/** Matches any trailing whitespace including newlines. */
		trailing: /^\s*[\r\n]+|[\r\n]+\s*$/g,

		/** Matches outermost whitespace including first and last newlines. */
		edge: /^[\t ]*[\r\n]|[\r\n][\t ]*$/g
	};

	/**
	 * @constructor
	 * @param {Object} options
	 */
	constructor(options) {
		super({ objectMode: true });

		var { defaults } = Tunic,
			namedTags = defaults.namedTags.slice();

		this.options = {
			...defaults,
			namedTags,
			...options
		};
	}

	/**
	 * Splits a chunk into blocks and generates the root AST node.
	 *
	 * @method parse
	 * @param {String} chunk
	 * @return {Object}
	 */
	parse(chunk) {
		chunk = toString(chunk);

		var { blockSplit } = this.options,
			[firstCodeBlock, ...blocks] = chunk.split(blockSplit);

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
	parseBlocks() {
		var retval = [],
			blocks = flatten(arguments),
			length = blocks.length,
			i = 0;

		for (; i < length; i += 2) {
			retval.push(this.parseComment(
				blocks[i],    // comment block
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
	parseComment(commentBlock, codeBlock) {
		commentBlock = toString(commentBlock);
		codeBlock = toString(codeBlock);

		var { tagSplit } = this.options,
			{ matchLines } = Tunic,

			[description, ...tags] = this
				.unwrap(commentBlock)
				.split(tagSplit),

			trailingCode = codeBlock
				.replace(matchLines.trailing, '');

		return {
			type: AST_TYPE_BLOCK,
			description, trailingCode,
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
	parseTag(tagBlock) {
		tagBlock = toString(tagBlock);

		var { namedTags, tagParse } = this.options,
			tagBlockSegments = tagBlock.match(tagParse) || [],
			[, tag, kind, name, delimiter, description] = tagBlockSegments;

		/**
		 * The regular expression has no way to know if a tag is supposed to
		 * have a name segment, so we have to help it out. In some cases the
		 * name is really just the first word of the description.
		 */
		if (name && !delimiter && !contains(namedTags, tag)) {
			description = [name, description]
				.filter(x => x && x.trim())
				.join(' ')
				.trim();

			name = undefined;
		}

		return {
			type: AST_TYPE_TAG,
			tag, kind, name, description
		};
	}

	/**
	 * Strips open- and close-comment markers and unindents the content.
	 *
	 * @method unwrap
	 * @param {String} block
	 * @return {Object}
	 */
	unwrap(block) {
		block = toString(block);

		var lines,
			emptyLines,
			indentedLines,
			{ blockIndent, blockParse } = this.options,
			{ matchLines } = Tunic;

		// Trim comment wrappers
		block = block
			.replace(blockParse, '$1')
			.replace(matchLines.edge, '');

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
	_transform(file, encoding, next) {
		var { extension, property } = this.options;

		if (!file || file.isAsset || !extension.test(file.path)) {
			this.push(file);
			return next();
		}

		file[property] = this.parse(file.contents);

		this.push(file);
		next();
	}
}
