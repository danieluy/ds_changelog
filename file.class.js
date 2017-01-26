"use strict";
const LogEntry = require('./log-entry.class.js');


const File = function (values) {
  this.lastModified = values.lastModified;
  this.name = values.name;
  this.path = values.path;
  this.size = values.size;
  this.type = values.type;
  this.content = this.parseContent(values.content);
}
File.prototype.parseContent = function (str_content) {
  let json = {};
  let v = undefined;
  str_content.split('\n')
    // .map(line => line.trim())
    .forEach(line => {
      if (line !== '' && line.charAt(0) !== '#') {
        if (line.match(/v\d+\.\d+\.\d+/)) {
          v = line;
          json[line] = [];
        }
        else {
          let data = line.split('|')
          json[v].push({ date: data[0].trim(), type: data[1].trim(), message: data[2].trim() })
        }
      }
    });
  return json;
}
File.prototype.logEntries = function () {
  const log_entries = [];
  for (var version in this.content) {
    this.content[version].forEach((line) => {
      log_entries.push(new LogEntry({
        version: version,
        type: line.type,
        date: line.date,
        message: line.message
      }))
    })
  }
  return log_entries;
}

module.exports = File;