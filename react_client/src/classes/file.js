const Todo = require('./todo');
const Plus = require('./plus');
const Minus = require('./minus');
const Refactoring = require('./refactoring');
const Bug = require('./bug');
const Fix = require('./fix');

const File = function (values) {
  this.path = values.path;
  this.content = values.content;
  this.title = null;
  // this.versions = [];
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

# ToDo
`

  const aux = {};
  this.entries.forEach(entry => {
    if (!aux.hasOwnProperty(entry.version))
      aux[entry.version] = [];
    if (entry.status !== 'deleted')
      aux[entry.version].push(entry);
  })

  for (let key in aux) {
    console.log(key, aux[key].length)
    if (key !== 'ToDo' && aux[key].length)
      str_data += `${key}\n`;
    aux[key].forEach(entry => {
      if (entry.status !== 'deleted')
        str_data += entry.toString();
    })
  }

  return str_data
}
File.prototype.parseContent = function (str_content) {
  let json = {};
  let version = 'ToDo';
  const entries = [];
  let id = 0;
  str_content.split('\n')
    .map(line => line.trim())
    .forEach(line => {
      if (line !== '' && line.charAt(0) !== '#') {
        if (line.match(/\[.+\]/))
          this.title = line.slice(1).slice(0, -1);
        else if (line.match(/v\d+\.\d+\.\d+/))
          version = line.trim();
        else {
          let line_data = line.split('|')
          entries.push(this.newEntry({
            id: ++id,
            version: version,
            date: line_data[0].trim(),
            type: line_data[1].trim(),
            message: line_data[2].trim()
          }))
        }
      }
    });
  return entries;
}
File.prototype.entriesByVersion = function () {
  const ret = {};
  this.entries.forEach(entry => {
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
File.prototype.deleteEntry = function (id) {
  this.setHistory();
  let deleted = false, i = 0;
  while (!deleted && i < this.entries.length) {
    console.log(this.entries[i].id === id)
    if (this.entries[i].id === id) {
      this.entries[i].status = 'deleted';
      deleted = true;
    }
    i++;
  }
  return;
}
File.prototype.setHistory = function () {
  const aux = this.entries.map(entry => this.newEntry({
    id: entry.id,
    version: entry.version,
    type: entry.type,
    date: entry.date,
    message: entry.message,
    status: entry.status
  }))
  this.state.history.push(aux);
  return this.state.history.length;
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