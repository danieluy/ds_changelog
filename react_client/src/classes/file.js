// const Todo = require('./todo');
// const Plus = require('./plus');
// const Minus = require('./minus');
// const Refactoring = require('./refactoring');
// const Bug = require('./bug');
// const Fix = require('./fix');
const Entry = require('./entry');

const File = function (values) {
  this.path = values.path;
  this.content = values.content;
  this.title = null;
  // this.versions = [];
  this.entryId = 0;
  this.entries = this.parseContent(values.content);
  this.state = {
    history: []
  };
}
File.prototype.getVersions = function () {
  return Object.keys(this.entriesByVersion()).splice(1);
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
#   F - bug fix       #

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
    if (aux.hasOwnProperty(key)) {
      if (key !== 'ToDo' && aux[key].length)
        str_data += `${key}\n`;
      str_data += filterDeleted(aux[key])
    }
  }

  function filterDeleted(entries) {
    let aux = '';
    entries.forEach(entry => {
      if (entry.status !== 'deleted' && entry.status !== 'checked')
        aux += entry.toString();
    })
    return aux;
  }

  return str_data
}
File.prototype.parseContent = function (str_content) {
  let version = 'ToDo';
  const entries = [];
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
          entries.push(new Entry({
            id: ++this.entryId,
            version: version,
            date: line_data[0].trim(),
            type: line_data[1].trim().charAt(0),
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
    if (this.entries[i].id === id) {
      this.entries[i].status = 'deleted';
      deleted = true;
    }
    i++;
  }
  return;
}
File.prototype.toggleToDoDone = function (id) {
  this.setHistory();
  let found = false, i = 0;
  while (!found && i < this.entries.length) {
    if (this.entries[i].id === id) {
      this.entries[i].status = this.entries[i].status === 'checked' ? 'unchecked' : 'checked';
      found = true;
    }
    i++;
  }
  return;
}
File.prototype.setHistory = function () {
  const aux = this.entries.map(entry => new Entry({
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
  this.checkNewEntryInput(values);
  if (!values.date) {
    const aux_date = new Date();
    values.date = `${aux_date.getFullYear()}${this.twoDigits(aux_date.getMonth() + 1)}${this.twoDigits(aux_date.getDate())}`
  }
  const entry = new Entry({
    id: ++this.entryId,
    version: values.version,
    date: values.date,
    type: values.type,
    message: values.message
  });
  this.setHistory();
  this.entries.push(entry);
  return;
}
File.prototype.checkNewEntryInput = function (values) {
  if (!values || !values.version || !values.type || !values.message)
    throw new Error('Expected parameter { version: string, type: string, message: string [, date: string] }')
  if (!values.version.match(/v\d+\.\d+\.\d+/))
    throw new Error('Expected parameter <version: string> to match "v0.0.0" pattern')
  if (!values.type.match(/T|P|M|B|F|R/))
    throw new Error('Expected parameter <type: string> to be "T", "P", "M", "B", "F" or "R"')
  if (values.date && !values.date.match(/\d{8}/))
    throw new Error('Expected parameter <date: string> to match "yyyyMMdd" pattern')
}
File.prototype.twoDigits = function (value) {
  return value.toString().length > 1 ? value.toString() : `0${value}`;
}

module.exports = File;