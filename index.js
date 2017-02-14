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
    this.input_file = document.getElementById('input-file');
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
    this.input_file.addEventListener('change', this.openFile.bind(this));
    this.btn_save.addEventListener('click', this.saveFile.bind(this));
  },
  displaylogEntryForm() {
    this.form_add_log_entry.parentNode.classList.remove('hidden');
    this.new_log_entry_date.value = new Date("2017-01-25");
  },
  addlogEntry: function () {

  },
  openFile: function (evt) {
    this.open_file = new File({
      lastModified: evt.target.files[0].lastModified,
      name: evt.target.files[0].name,
      path: evt.target.files[0].path,
      size: evt.target.files[0].size,
      type: evt.target.files[0].type,
      content: fs.readFileSync(evt.target.files[0].path, 'UTF-8')
    })
    console.log(this.open_file)
    this.render.logEntries.call(this);
  },
  saveFile: function () {
    if (this.open_file) {
      const content = this.open_file.toSave();
      console.log('' + this.open_file.origin.path)
      fs.writeFileSync(this.open_file.origin.path + '_1', content, 'UTF-8')
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
      for (var i = 0; i < entries.length; i++)
        if (entries[i].type !== 'T')
          ul_entries.appendChild(entries[i].view(i));
        else
          ul_todos.appendChild(entries[i].view(i));
      this.todos_list.appendChild(ul_todos);
      this.entries_list.appendChild(ul_entries);
    }
  },
  sortEntries: function () {
    switch (this.sort_criteria) {
      case 'type':
        return this.open_file.entriesByType();
      default:
        return this.open_file.entriesByDate();
    }
  }
}

app.init();