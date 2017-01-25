const { ipcRenderer } = require('electron');
const fs = require('fs');
const File = require('./file.class.js');
const LogEntry = require('./log-entry.class.js');
// const files = require('./files.js');

document.addEventListener('DOMContentLoaded', function () {
  app.init();
});

const app = {
  init: function () {
    this.DOMCache();
  },
  DOMCache: function () {
    this.input_file = document.getElementById('input-file');
    this.log_entries_list = document.getElementById('log-entries-list');
    this.DOMListeners();
  },
  DOMListeners: function () {
    this.input_file.addEventListener('change', this.openFile.bind(this));
  },
  openFile: function (evt) {
    if (!this.open_file) {
      if (evt.target.files[0].type === 'text/plain') {
        this.open_file = new File({
          lastModified: evt.target.files[0].lastModified,
          name: evt.target.files[0].name,
          path: evt.target.files[0].path,
          size: evt.target.files[0].size,
          type: evt.target.files[0].type,
          content: fs.readFileSync(evt.target.files[0].path, 'UTF-8')
        })
        console.log(this.open_file.content)
        this.log_entries = this.open_file.logEntries();
        this.render.logEntriesByVersion.call(this)
      }
      else {
        alert('Unsupported file type')
      }
    }
    else {
      alert('A file is already open')
    }
  },
  render: {
    logEntriesByVersion: function () {
      this.log_entries_list.innerHTML = '';
      let ul = document.createElement('ul');
      ul.setAttribute('class', 'entry-list');
      let version = this.log_entries[0].version;
      let li = document.createElement('li');
      li.setAttribute('class', 'list-title');
      li.innerHTML = version;
      ul.appendChild(li);
      for (let i = 0; i < this.log_entries.length; i++) {
        if (this.log_entries[i].version !== version) {
          let li = document.createElement('li');
          li.setAttribute('class', 'list-title');
          version = this.log_entries[i].version;
          li.innerHTML = version;
          ul.appendChild(li);
        }
        let li = document.createElement('li');
        if (this.log_entries[i].type === 'TODO')
          li.setAttribute('class', 'list-item');
        if (this.log_entries[i].type === '+')
          li.setAttribute('class', 'list-item plus');
        if (this.log_entries[i].type === '-')
          li.setAttribute('class', 'list-item minus');
        li.innerHTML = this.log_entries[i].view();
        ul.appendChild(li);
      }
      this.log_entries_list.appendChild(ul);
    }
  }
}

