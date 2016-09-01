/* eslint-env mocha */

import Tunic from '../src/tunic';
import expect from 'expect';
import toga from 'toga';
import { join } from 'path';
import { readFileSync } from 'fs';

var config = {
	fixtures: join(__dirname, '/fixtures'),
	expected: join(__dirname, '/expected'),
	actual: join(__dirname, '/actual')
};

describe('tunic e2e', function () {
	function testWithFile(filename, stream, done) {
		var fixture = join(config.fixtures, filename),
			expected = join(config.expected, filename + '.json');

		function expectFile(file) {
			var actual = JSON.stringify(file.docAst, null, 2) + '\n';

			expect(actual).toEqual(String(readFileSync(expected)));
			// file.contents = new Buffer(actual);
		}

		toga
			.src(fixture)
			.pipe(stream)
			.on('data', expectFile)
			// .pipe(toga.dest(config.actual))
			.on('error', done)
			.on('end', done);
	}

	it('should parse arguments', function (done) {
		testWithFile('arg.js', new Tunic(), done);
	});

	it('should parse descriptions', function (done) {
		testWithFile('desc.js', new Tunic(), done);
	});

	it('should parse empty blocks', function (done) {
		testWithFile('empty.js', new Tunic(), done);
	});

	it('should ignore malformed blocks', function (done) {
		testWithFile('ignore.js', new Tunic(), done);
	});

	it('should parse indents', function (done) {
		testWithFile('indents.js', new Tunic(), done);
	});

	it('should parse names', function (done) {
		testWithFile('name.js', new Tunic(), done);
	});

	it('should parse tags', function (done) {
		testWithFile('tag.js', new Tunic(), done);
	});

	it('should parse types', function (done) {
		testWithFile('type.js', new Tunic(), done);
	});

	it('should parse handlebars files', function (done) {
		var stream = new Tunic({
			blockIndent: /^[\t \!]/gm,
			blockParse: /^[\t ]*\{\{!---(?!-)([\s\S]*?)\s*--\}\}/m,
			blockSplit: /(^[\t ]*\{\{!---(?!-)[\s\S]*?\s*--\}\})/m,
			namedTags: ['arg', 'argument', 'data', 'prop', 'property']
		});

		testWithFile('custom.hbs', stream, done);
	});

	it('should parse perlish files', function (done) {
		var stream = new Tunic({
			blockParse: /^=pod([\s\S]*?)\n=cut$/m,
			blockSplit: /(^=pod[\s\S]*?\n=cut$)/m,
			namedTags: ['arg', 'argument', 'data', 'prop', 'property']
		});

		testWithFile('custom.pl', stream, done);
	});

	it('should ignore unknown files', function (done) {
		var stream = new Tunic({
			extension: /\.js$/
		});

		function expectFile(file) {
			expect(file.docAst).toBe(undefined);
		}

		toga
			.src(join(config.fixtures, 'unused.coffee'))
			.pipe(stream)
			.on('data', expectFile)
			.on('error', done)
			.on('end', done);
	});
});
