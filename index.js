const { ipcRenderer } = require('electron');
const fs = require('fs');
const File = require('./classes/file');
// const files = require('./files.js');

// document.addEventListener('DOMContentLoaded', function () {
//   app.init();
// });

const app = {
  sort_criteria: undefined,
  init: function () {
    this.DOMCache();
  },
  DOMCache: function () {
    this.btn_open_file = document.getElementById('btn-open-file');
    this.entries_list = document.getElementById('entries-list');
    this.btn_new_entry = document.getElementById('btn-new-entry');
    this.btn_save = document.getElementById('btn-save');
    this.todos_list = document.getElementById('todos-list');
    // Form add log entry
    this.form_add_log_entry = document.getElementById('form-add-log-entry');
    this.new_log_entry_type = document.getElementById('new-log-entry-type');
    this.new_log_entry_message = document.getElementById('new-log-entry-message');
    this.new_log_entry_date = document.getElementById('new-log-entry-date');
    this.btn_new_log_entry = document.getElementById('btn-new-log-entry');
    this.btn_cancel_log_entry = document.getElementById('btn-cancel-log-entry');
    this.DOMListeners();
  },
  DOMListeners: function () {
    this.btn_new_entry.addEventListener('click', this.displaylogEntryForm.bind(this));
    this.btn_open_file.addEventListener('click', this.callOpenFile);
    this.btn_save.addEventListener('click', this.saveFile.bind(this));
  },
  displaylogEntryForm() {
    this.form_add_log_entry.parentNode.classList.remove('hidden');
    this.new_log_entry_date.value = new Date("2017-01-25");
  },
  addlogEntry: function () {

  },
  callOpenFile: function () {
    ipcRenderer.send('openFile');
  },
  openFile: function (path) {
    this.open_file = new File({
      path: path,
      content: fs.readFileSync(path, 'UTF-8')
    })
    this.render.logEntries.call(this);
  },
  saveFile: function () {
    if (this.open_file) {
      fs.writeFileSync(this.open_file.origin.path + '_1', this.open_file.toSave(), 'UTF-8');
      alert('File successfully saved');
    }
  },
  deleteEntry: function (index) {
    this.open_file.deleteEntry(index);
    this.render.logEntries.call(this);
  },
  render: {
    logEntries: function () {
      this.todos_list.innerHTML = '';
      this.entries_list.innerHTML = '';
      let ul_entries = document.createElement('ul');
      ul_entries.classList.add('entry-list');
      let ul_todos = document.createElement('ul');
      ul_todos.classList.add('todos-list');
      let entries = this.sortEntries();
      console.log('this.sortEntries();', entries)
      for (var key in entries) {
        if (key === 'ToDo')
          for (let i = 0; i < entries[key].length; i++)
            ul_todos.appendChild(entries[key][i].view(i));
        else {
          let group = document.createElement('div');
          group.innerHTML = key;
          ul_entries.appendChild(group);
          for (let i = 0; i < entries[key].length; i++) {
            ul_entries.appendChild(entries[key][i].view(i));
          }
        }
      }
      this.todos_list.appendChild(ul_todos);
      this.entries_list.appendChild(ul_entries);
    }
    // logEntries: function () {
    //   this.todos_list.innerHTML = '';
    //   this.entries_list.innerHTML = '';
    //   let ul_entries = document.createElement('ul');
    //   ul_entries.classList.add('entry-list');
    //   let ul_todos = document.createElement('ul');
    //   ul_todos.classList.add('todos-list');
    //   let entries = this.sortEntries();
    //   for (var i = 0; i < entries.length; i++)
    //     if (entries[i].type !== 'T')
    //       ul_entries.appendChild(entries[i].view(i));
    //     else
    //       ul_todos.appendChild(entries[i].view(i));
    //   this.todos_list.appendChild(ul_todos);
    //   this.entries_list.appendChild(ul_entries);
    // }
  },
  sortEntries: function () {
    switch (this.sort_criteria) {
      case 'type':
        return this.open_file.entriesByType();
      case 'date':
        return this.open_file.entriesByDate();
      default:
        return this.open_file.entriesByVersion();
    }
  }
}

app.init();

ipcRenderer.on('openFile', (event, path) => {
  console.log('path', path)
  app.openFile(path);
});