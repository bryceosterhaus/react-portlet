/* eslint-env mocha */

import Tunic from '../src/tunic';
import expect from 'expect';

describe('tunic spec', function () {
	var tunic;

	beforeEach(function () {
		tunic = new Tunic();
	});

	it('should create a duplex stream', function () {
		expect(tunic).toBeA(Tunic);
		expect(tunic.pipe).toBeA(Function);
		expect(tunic.readable).toBe(true);
		expect(tunic.writable).toBe(true);
	});

	describe('#parse', function () {
		it('should parse an empty string', function () {
			expect(tunic.parse('')).toEqual({
				type: 'Documentation',
				body: []
			});
		});

		it('should parse text', function () {
			expect(tunic.parse('var a = 1;\n/**\nFoo\n*/\nvar b = 2;\n/**\nBaz\n*/\nvar c = 3;')).toEqual({
				type: 'Documentation',
				body: [
					{
						type: 'CommentBlock',
						description: '',
						trailingCode: 'var a = 1;',
						tags: []
					},
					{
						type: 'CommentBlock',
						description: 'Foo',
						trailingCode: 'var b = 2;',
						tags: []
					},
					{
						type: 'CommentBlock',
						description: 'Baz',
						trailingCode: 'var c = 3;',
						tags: []
					}
				]
			});
		});
	});

	describe('#parseBlocks', function () {
		it('should parse an empty arrays', function () {
			expect(tunic.parseBlocks()).toEqual([]);
			expect(tunic.parseBlocks([])).toEqual([]);
		});

		it('should parse blocks', function () {
			expect(tunic.parseBlocks([''])).toEqual([{
				type: 'CommentBlock',
				description: '',
				trailingCode: '',
				tags: []
			}]);

			expect(tunic.parseBlocks([
				'/** Foo */',
				'var foo = "bar";'
			])).toEqual([{
				type: 'CommentBlock',
				description: 'Foo',
				trailingCode: 'var foo = "bar";',
				tags: []
			}]);

			expect(tunic.parseBlocks([
				'/** Foo */',
				'var foo = "bar";',
				'/** Baz */',
				'var baz = "bat";'
			])).toEqual([
				{
					type: 'CommentBlock',
					description: 'Foo',
					trailingCode: 'var foo = "bar";',
					tags: []
				},
				{
					type: 'CommentBlock',
					description: 'Baz',
					trailingCode: 'var baz = "bat";',
					tags: []
				}
			]);
		});
	});

	describe('#parseComment', function () {
		it('should parse an empty string', function () {
			expect(tunic.parseComment()).toEqual({
				type: 'CommentBlock',
				description: '',
				trailingCode: '',
				tags: []
			});

			expect(tunic.parseComment('')).toEqual({
				type: 'CommentBlock',
				description: '',
				trailingCode: '',
				tags: []
			});
		});

		it('should parse a comment', function () {
			expect(tunic.parseComment('Foo')).toEqual({
				type: 'CommentBlock',
				description: 'Foo',
				trailingCode: '',
				tags: []
			});

			expect(tunic.parseComment('/** Foo */', 'var foo = "bar";')).toEqual({
				type: 'CommentBlock',
				description: 'Foo',
				trailingCode: 'var foo = "bar";',
				tags: []
			});

			expect(tunic.parseComment('/**\nFoo\n@tag description\n@return\n*/', 'var foo = "bar";')).toEqual({
				type: 'CommentBlock',
				description: 'Foo\n',
				trailingCode: 'var foo = "bar";',
				tags: [
					{
						type: 'CommentBlockTag',
						tag: 'tag',
						kind: undefined,
						name: undefined,
						description: 'description'
					},
					{
						type: 'CommentBlockTag',
						tag: 'return',
						kind: undefined,
						name: undefined,
						description: undefined
					}
				]
			});
		});
	});

	describe('#parseTag', function () {
		it('should parse an empty tag', function () {
			expect(tunic.parseTag()).toEqual({
				type: 'CommentBlockTag',
				tag: undefined,
				kind: undefined,
				name: undefined,
				description: undefined
			});

			expect(tunic.parseTag('')).toEqual({
				type: 'CommentBlockTag',
				tag: undefined,
				kind: undefined,
				name: undefined,
				description: undefined
			});
		});

		it('should parse a tag', function () {
			expect(tunic.parseTag('tag description')).toEqual({
				type: 'CommentBlockTag',
				tag: 'tag',
				kind: undefined,
				name: undefined,
				description: 'description'
			});

			expect(tunic.parseTag('tag name - description')).toEqual({
				type: 'CommentBlockTag',
				tag: 'tag',
				kind: undefined,
				name: 'name',
				description: 'description'
			});

			expect(tunic.parseTag('tag {kind} name - description')).toEqual({
				type: 'CommentBlockTag',
				tag: 'tag',
				kind: 'kind',
				name: 'name',
				description: 'description'
			});

			expect(tunic.parseTag('param {kind} name description')).toEqual({
				type: 'CommentBlockTag',
				tag: 'param',
				kind: 'kind',
				name: 'name',
				description: 'description'
			});

			expect(tunic.parseTag('return {kind} description')).toEqual({
				type: 'CommentBlockTag',
				tag: 'return',
				kind: 'kind',
				name: undefined,
				description: 'description'
			});
		});
	});

	describe('#unwrap', function () {
		it('should unwrap an empty comment', function () {
			expect(tunic.unwrap('')).toBe('');
			expect(tunic.unwrap('/** */')).toBe('');
			expect(tunic.unwrap('/**\n *\n */')).toBe('');
		});

		it('should unwrap a comment', function () {
			expect(tunic.unwrap('Hello')).toBe('Hello');
			expect(tunic.unwrap('/** Hello */')).toBe('Hello');
			expect(tunic.unwrap('/**\nHello\n*/')).toBe('Hello');
			expect(tunic.unwrap('/**\n * Hello\n */')).toBe('Hello');
			expect(tunic.unwrap('\t/**\n\t * Hello\n\t */')).toBe('Hello');
		});
	});
});
