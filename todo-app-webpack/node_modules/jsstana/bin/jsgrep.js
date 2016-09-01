#!/usr/bin/env node
/* eslint-disable no-sync */

"use strict";

var program = require("commander");
var fs = require("fs");
var walk = require("walkdir");
var _ = require("underscore");
var path = require("path");
var esprima = require("esprima");
var estraverse = require("estraverse");
var chalk = require("chalk");

var jsstana = require("../lib/jsstana.js");

var LONG_LINE_LENGTH = 120;

var pkgJson = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json")).toString());

program.usage("[options] pattern file.js [file2.js] [dir]");
program.version(pkgJson.version);
/* eslint-disable no-multi-spaces */
program.option("-n, --line-number",   "Each output line is preceded by its relative line number in the file.", false);
program.option("-H, --file-name",     "Always print filename headers with output lines.", false);
program.option("-l, --long-lines",    "Print long (over " + LONG_LINE_LENGTH + " characters long) lines.", true);
program.option("-s, --strip-shebang", "Strip shebang from input files", false);
/* eslint-enable no-multi-spaces */

function beautifyPath(p) {
  var parts = p.split(path.sep).reverse();

  var ret = parts[0];

  for (var i = 1; i < parts.length; i++) {
    var newret = path.join(parts[i], ret);

    if (newret.length > 30) {
      return path.join("...", ret);
    } else {
      ret = newret;
    }
  }

  return ret;
}

function colorizeLine(line, steps) {
  steps = _.sortBy(steps, "pos");

  var prevPos = 0;
  var currVal = 0;
  var buf = "";

  _.each(steps, function (step) {
    var currPos = step.pos;
    var part = line.substr(prevPos, currPos - prevPos);

    switch (currVal) {
      case 0:
        break;
      case 1:
        part = chalk.red(part);
        break;
      case 2:
        part = chalk.yellow(part);
        break;
      case 3:
        part = chalk.green(part);
        break;
      default:
        part = chalk.blue(part);
    }

    buf += part;

    currVal += step.val;
    prevPos = currPos;
  });

  return buf;
}

function cli(argv) {
  program.parse(argv);
  if (program.stripShebang === undefined) { program.stripShebang = true; }
  if (program.lineNumber === undefined) { program.lineNumber = true; }
  if (program.fileName === undefined) { program.fileName = true; }
  if (program.longLines === undefined) { program.longLines = false; }

  if (program.rawArgs.length < 1) {
    console.error("Error: pattern is required");
    console.log(program.help());
    return 0;
  }

  var pattern = program.args[0];
  var files = program.args.slice(1);
  if (files.length === 0) {
    files = ["."];
  }

  try {
    pattern = jsstana.match(pattern);
  } catch (e) {
    console.error(chalk.red("Error: ") + "invalid pattern -- " + e.message);
    return 1;
  }

  _.each(files, function (file) {
    var absfile = path.resolve(file);

    if (!fs.existsSync(absfile)) {
      console.log(chalk.red("Error: ") + " file not exists -- " + file);
      return;
    }

    walk.sync(absfile, { "no_return": true }, function (p) { // eslint-disable-line quote-props
      p = path.resolve(p);

      if (p === absfile || p.match(/\.js$/)) {
        var relpath = p === absfile ? file : p.replace(absfile, "");
        relpath = beautifyPath(relpath);

        var contents = fs.readFileSync(p);

        // strip shebang
        if (program["strip-shebang"]) {
          contents = contents.toString();
          var m = contents.match(/^#![^\n]*\n/);
          if (m) {
            contents = contents.substr(m[0].length - 1);
          }
        }

        var syntax;
        try {
          syntax = esprima.parse(contents, { tolerant: true, range: true, loc: true });
        } catch (e) {
          console.log(chalk.red("Error: ") + "cannot parse " + relpath.bold + " -- " + e.message);
        }
        var lines;

        estraverse.traverse(syntax, {
          enter: function (node /* , parent */) {
            var match = pattern(node);
            if (match) {
              if (!lines) {
                lines = contents.toString().split(/\n/);
              }

              var lineNumber = node.loc.start.line;
              var line = lines[lineNumber - 1];

              var prefix;
              if (program.lineNumber && program.fileName) {
                prefix = relpath + ":" + lineNumber + ":";
              } else if (program.fileName) {
                prefix = relpath + ":";
              } else if (program.lineNumber) {
                prefix = lineNumber + ":";
              } else {
                prefix = "";
              }

              // Gather steps for colorize
              var steps = [{ val: 1, pos: node.loc.start.column }];
              if (node.loc.start.line === node.loc.end.line) {
                steps.push({ val: -1, pos: node.loc.end.column });
              }

              _.each(match, function (matchNode) {
                if (matchNode && matchNode.loc) {
                  steps.push({ val: 1, pos: matchNode.loc.start.column });
                  steps.push({ val: -1, pos: matchNode.loc.end.column });
                }
              });
              steps.push({ val: -1, pos: line.length });

              // truncate line if it's too long
              if (line.length > LONG_LINE_LENGTH && !program.longLines) {
                var start = Math.max(0, steps[0].pos - 10);
                var linePrefix = (start === 0 ? "" : "...");
                var lineSuffix = (start + LONG_LINE_LENGTH < line.length ? "..." : "");

                _.each(steps, function (s) {
                  s.pos = s.pos - start + (start === 0 ? 0 : 3);
                });

                line = linePrefix + line.substr(start, LONG_LINE_LENGTH) + lineSuffix;
              }

              // print match
              console.log(chalk.bold(prefix) + " " + colorizeLine(line, steps));
            }
          },
        });
      }
    });
  });
}

var returnCode = cli(process.argv);
/* eslint-disable no-process-exit */
process.exit(returnCode);
/* eslint-enable no-process-exit */
