'use strict';

var merge = require('merge');
var Tunic = require('tunic');

function extractNamespace(text) {
  var match = /{namespace (.*)}/.exec(text);
  if (!match) {
    throw new Error('Invalid soy. No namespace declared.');
  }
  return match[1];
}

function extractParams(text) {
  var params = [];
  var paramRegex = /{@param(\??) \s*(\S*)\s*:\s*(\S*)\s*\/?}/g;
  var currentMatch = paramRegex.exec(text);
  while (currentMatch) {
    params.push({
      name: currentMatch[2],
      optional: !!currentMatch[1],
      type: currentMatch[3]
    });
    currentMatch = paramRegex.exec(text);
  }
  return params;
}

function extractTemplateAttributes(text) {
  text = text || '';
  var attrs = {};
  var attrTexts = text.trim().split(/\s+/);
  attrTexts.forEach(function(attrText) {
    var split = attrText.split('=');
    if (split.length === 2) {
      attrs[split[0]] = split[1].substr(1, split[1].length - 2);
    }
  });
  return attrs;
}

function extractTemplateInfo(text) {
  var match = /{(template|deltemplate) (\S+)(.*)?}/.exec(text);
  if (match) {
    var deltemplate = match[1] === 'deltemplate';
    return {
      deltemplate: deltemplate,
      name: deltemplate ? match[2] : match[2].substr(1),
      attributes: extractTemplateAttributes(match[3])
    };
  }
}

function extractTemplates(templates, block) {
  var templateInfo = extractTemplateInfo(block.trailingCode);
  if (templateInfo) {
    var info = merge(
      {
        contents: block.trailingCode,
        docTags: block.tags,
        params: getAllParams(extractParams(block.trailingCode), block.tags)
      },
      templateInfo
    );
    templates.push(info);
  }
}

function getAllParams(extractedParams, docTags) {
  var params = extractedParams.concat();
  docTags.forEach(function(tag) {
    if (tag.tag === 'param' || tag.tag === 'param?') {
      params.push({
        name: tag.name,
        optional: tag.tag === 'param?',
        type: 'any'
      });
    }
  });
  return params;
}

function soyparser(text) {
  var parsed = {
    namespace: extractNamespace(text),
    templates: []
  };
  var ast = new Tunic({
    namedTags: ['param', 'param?'],
    tagParse: /^([\w|?]+)[\t \-]*(?:\{([^\}]+)\})?[\t \-]*(\[[^\]]*\]\*?|\S*)?[\t ]*(-?)[\t ]*([\s\S]+)?$/m,
  }).parse(text);
  ast.body.forEach(extractTemplates.bind(null, parsed.templates));
  return parsed;
}

module.exports = soyparser;
