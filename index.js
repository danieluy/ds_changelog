const { ipcRenderer } = require('electron');
const fs = require('fs');
const File = require('./classes/file');
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
    this.btn_new_entry = document.getElementById('btn-new-entry');
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
  },
  displaylogEntryForm() {
    this.form_add_log_entry.parentNode.classList.remove('hidden');
    this.new_log_entry_date.value = new Date("2017-01-25");
  },
  addlogEntry: function () {

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
        console.log(this.open_file)
        this.render.logEntries.call(this);
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
    logEntries: function () {
      this.log_entries_list.innerHTML = '';
      let ul = document.createElement('ul');
      ul.setAttribute('class', 'entry-list');
      ul.classList.add('entry-list');
      for (let key in this.open_file.entries) {
        for (let i = 0; i < this.open_file.entries[key].length; i++)
          ul.appendChild(this.open_file.entries[key][i].view(i));
      }
      this.log_entries_list.appendChild(ul);
    }
  }
}