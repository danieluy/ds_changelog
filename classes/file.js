"use strict";

const Entry = require('./entry');

const File = function (values) {
  this.origin = {
    lastModified: values.lastModified,
    name: values.name,
    path: values.path,
    size: values.size,
    type: values.type,
    content: values.content
  }
  this.title = null;
  this.versions = [];
  this.entries = this.parseContent(values.content);
}
File.prototype.parseContent = function (str_content) {
  let json = {};
  let version = undefined;
  const entries = { T: [], P: [], M: [], R: [], B: [], F: [] };
  str_content.split('\n')
    .map(line => line.trim())
    .forEach(line => {
      if (line !== '' && line.charAt(0) !== '#') {
        if (line.match(/\[.+\]/))
          this.title = line.slice(1).slice(0, -1);
        else if (line.match(/v\d+\.\d+\.\d+/)) {
          version = line.trim();
          this.versions.push(version);
        }
        else {
          let data = line.split('|')
          const entry = new Entry({ version: version, date: data[0].trim(), type: data[1].trim(), message: data[2].trim() });
          entries[entry.type].push(entry)
        }
      }
    });
  return entries;
}
File.prototype.entriesByType = function () {
  const ret = [];
  for (let key in this.entries) {
    for (let i = 0; i < this.entries[key].length; i++)
      ret.push(this.entries[key][i]);
  }
  return ret;
}
File.prototype.entriesByDate = function () {
  const ret = [];
  for (let key in this.entries) {
    for (let i = 0; i < this.entries[key].length; i++)
      ret.push(this.entries[key][i]);
    ret.sort(entry => {
      return parseInt(entry.date)
    })
  }
  return ret;
}

module.exports = File;