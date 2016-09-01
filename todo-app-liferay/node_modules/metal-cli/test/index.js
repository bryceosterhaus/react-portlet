'use strict';

var assert = require('assert');
var del = require('del');
var fs = require('fs');
var childProcess = require('child_process');

describe('Metal CLI', function() {
  beforeEach(function(done) {
    del([
      'test/fixtures/src/**/*.soy.js',
      'test/fixtures/build'
    ]).then(function() {
      done();
    });
  });

  it('should exit with error when invalid command is given', function(done) {
    runMetal(['invalid']).on('close', function(code) {
      assert.strictEqual(1, code);
      done();
    });
  });

  describe('Soy', function() {
    it('should compile soy files when "soy" command is run', function(done) {
      runMetal([
        'soy',
        '-s',
        'test/fixtures/src/**/*.soy',
        '-d',
        'test/fixtures/src'
      ]).on('close', function(code) {
        assert.strictEqual(0, code);
        assert.ok(fs.existsSync('test/fixtures/src/Foo.soy.js'));

        var contents = fs.readFileSync('test/fixtures/src/Foo.soy.js');
        assert.notStrictEqual(-1, contents.indexOf('extends Component'));
        done();
      });
    });
  });

  describe('Build', function() {
    it('should build js files to "globals" format when "build" command is run', function(done) {
      runMetal([
        'build',
        '-s',
        'test/fixtures/src/**/*.js',
        '-d',
        'test/fixtures/build/globals'
      ]).on('close', function(code) {
        assert.strictEqual(0, code);
        assert.ok(fs.existsSync('test/fixtures/build/globals/metal.js'));
        assert.ok(fs.existsSync('test/fixtures/build/globals/metal.js.map'));
        done();
      });
    });

    it('should build js files to "amd" format when "build" command is run for it', function(done) {
      runMetal([
        'build',
        '-f',
        'amd',
        '-s',
        'test/fixtures/src/**/*.js',
        '-d',
        'test/fixtures/build/amd'
      ]).on('close', function(code) {
        assert.strictEqual(0, code);
        assert.ok(fs.existsSync('test/fixtures/build/amd/metal/test/fixtures/src/Foo.js'));
        assert.ok(fs.existsSync('test/fixtures/build/amd/metal/test/fixtures/src/Foo.js.map'));
        done();
      });
    });

    it('should build js files to "amd-jquery" format when "build" command is run for it', function(done) {
      runMetal([
        'build',
        '-f',
        'amd-jquery',
        '-s',
        'test/fixtures/src/**/*.js',
        '-d',
        'test/fixtures/build/amd-jquery'
      ]).on('close', function(code) {
        assert.strictEqual(0, code);
        assert.ok(fs.existsSync('test/fixtures/build/amd-jquery/metal/test/fixtures/src/Foo.js'));
        assert.ok(fs.existsSync('test/fixtures/build/amd-jquery/metal/test/fixtures/src/Foo.js.map'));

        var contents = fs.readFileSync('test/fixtures/build/amd-jquery/metal/test/fixtures/src/Foo.js', 'utf8');
        assert.notStrictEqual(-1, contents.indexOf('_JQueryAdapter2.default.register(\'foo\', Foo);'));
        done();
      });
    });

    it('should build js files to "jquery" format when "build" command is run for it', function(done) {
      runMetal([
        'build',
        '-f',
        'jquery',
        '-s',
        'test/fixtures/src/**/*.js',
        '-d',
        'test/fixtures/build/jquery'
      ]).on('close', function(code) {
        assert.strictEqual(0, code);
        assert.ok(fs.existsSync('test/fixtures/build/jquery/metal.js'));
        assert.ok(fs.existsSync('test/fixtures/build/jquery/metal.js.map'));

        var contents = fs.readFileSync('test/fixtures/build/jquery/metal.js', 'utf8');
        assert.notStrictEqual(-1, contents.indexOf('JQueryAdapter.register(\'foo\', Foo);'));
        done();
      });
    });

    it('should build js files to multiple formats when "build" command requests it', function(done) {
      runMetal([
        'build',
        '-f',
        'globals',
        'amd',
        '-s',
        'test/fixtures/src/**/*.js',
        '-d',
        'test/fixtures/build/globals',
        'test/fixtures/build/amd'
      ]).on('close', function(code) {
        assert.strictEqual(0, code);
        assert.ok(fs.existsSync('test/fixtures/build/globals/metal.js'));
        assert.ok(fs.existsSync('test/fixtures/build/globals/metal.js.map'));
        assert.ok(fs.existsSync('test/fixtures/build/amd/metal/test/fixtures/src/Foo.js'));
        assert.ok(fs.existsSync('test/fixtures/build/amd/metal/test/fixtures/src/Foo.js.map'));
        done();
      });
    });

    it('should build js files without generating source maps when --sourceMaps is set to false', function(done) {
      runMetal([
        'build',
        '-f',
        'globals',
        'amd',
        '-s',
        'test/fixtures/src/**/*.js',
        '-d',
        'test/fixtures/build/globals',
        'test/fixtures/build/amd',
        '--sourceMaps',
        'false'
      ]).on('close', function(code) {
        assert.strictEqual(0, code);
        assert.ok(fs.existsSync('test/fixtures/build/globals/metal.js'));
        assert.ok(!fs.existsSync('test/fixtures/build/globals/metal.js.map'));
        assert.ok(fs.existsSync('test/fixtures/build/amd/metal/test/fixtures/src/Foo.js'));
        assert.ok(!fs.existsSync('test/fixtures/build/amd/metal/test/fixtures/src/Foo.js.map'));
        done();
      });
    });

    it('should build soy files when "build" command is run', function(done) {
      runMetal([
        'build',
        '--src',
        'test/fixtures/src/**/*.js',
        '--dest',
        'test/fixtures/build/globals',
        '--soySrc',
        'test/fixtures/src/**/*.soy',
        '--soyDest',
        'test/fixtures/src'
      ]).on('close', function(code) {
        assert.strictEqual(0, code);
        assert.ok(fs.existsSync('test/fixtures/src/Foo.soy.js'));

        var contents = fs.readFileSync('test/fixtures/src/Foo.soy.js', 'utf8');
        assert.notStrictEqual(-1, contents.indexOf('extends Component'));
        done();
      });
    });

    it('should build soy files without generating component when soySkipMetalGeneration is passed', function(done) {
      runMetal([
        'build',
        '--src',
        'test/fixtures/src/**/*.js',
        '--dest',
        'test/fixtures/build/globals',
        '--soySrc',
        'test/fixtures/src/**/*.soy',
        '--soyDest',
        'test/fixtures/src',
        '--soySkipMetalGeneration'
      ]).on('close', function(code) {
        assert.strictEqual(0, code);
        assert.ok(fs.existsSync('test/fixtures/src/Foo.soy.js'));

        var contents = fs.readFileSync('test/fixtures/src/Foo.soy.js', 'utf8');
        assert.strictEqual(-1, contents.indexOf('extends Component'));
        done();
      });
    });
  });
});

function runMetal(args) {
  return childProcess.spawn('node', ['index.js'].concat(args));
}
