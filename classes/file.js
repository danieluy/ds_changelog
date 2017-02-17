"use strict";

const Todo = require('./todo');
const Plus = require('./plus');
const Minus = require('./minus');
const Refactoring = require('./refactoring');
const Bug = require('./bug');
const Fix = require('./fix');

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
  this.state = {
    history: []
  };
}
File.prototype.toSave = function () {
  let str_data =
    `[${this.title}]

#   ${new Date().toString()}

#   T - todo          #
#   P - plus          #
#   M - minus         #
#   R - refactoring   #
#   B - bug           #
#   F - fix           #

`

  for (let key in this.entries) {
    this.entries[key].forEach(entry => {
      str_data += entry.toString();
    })
  }

  return str_data
}
File.prototype.parseContent = function (str_content) {
  let json = {};
  let version = undefined;
  const entries = [];
  let id = 0;
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
          entries.push(this.newEntry({ id: ++id, version: version, date: data[0].trim(), type: data[1].trim(), message: data[2].trim() }))
        }
      }
    });
  return entries;
}
File.prototype.entriesByVersion = function () {
  const ret = {};
  this.entries.forEach(entry => {
    console.log('entry.version', entry.version)
    if (!ret.hasOwnProperty(entry.version))
      ret[entry.version] = [];
    ret[entry.version].push(entry);
  })
  return ret;
}
File.prototype.entriesByType = function () {
  // const ret = [];
  // for (let key in this.entries) {
  //   for (let i = 0; i < this.entries[key].length; i++)
  //     ret.push(this.entries[key][i]);
  // }
  // return ret;
}
File.prototype.entriesByDate = function () {
  // const ret = [];
  // for (let key in this.entries) {
  //   for (let i = 0; i < this.entries[key].length; i++)
  //     ret.push(this.entries[key][i]);
  //   ret.sort(entry => {
  //     return parseInt(entry.date)
  //   })
  // }
  // return ret;
}
File.prototype.deleteEntry = function (index) {
  // this.setHistory();
  // let deleted = false;
  // for (let key in this.entries) {
  //   if (deleted)
  //     break;
  //   let i = 0;
  //   while (!deleted && i < this.entries[key].length) {
  //     if (this.entries[key][i].id === index) {
  //       this.entries[key][i].status = 0;
  //       deleted = true;
  //     }
  //     i++
  //   }
  // }
}
File.prototype.setHistory = function () {
  // const aux = { T: [], P: [], M: [], R: [], B: [], F: [] };
  // for (let key in this.entries) {
  //   this.entries[key].forEach(entry => {
  //     aux[key].push(this.newEntry({
  //       id: entry.id,
  //       version: entry.version,
  //       type: entry.type,
  //       date: entry.date,
  //       message: entry.message,
  //       status: entry.status
  //     }))
  //   })
  // }
  // this.state.history.push(aux);
  // return this.state.history.length;
}
File.prototype.newEntry = function (values) {
  if (values.type === 'T')
    return new Todo(values);
  if (values.type === 'P')
    return new Plus(values);
  if (values.type === 'M')
    return new Minus(values);
  if (values.type === 'R')
    return new Refactoring(values);
  if (values.type === 'B')
    return new Bug(values);
  if (values.type === 'F')
    return new Fix(values);
}

module.exports = File;