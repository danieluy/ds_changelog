import React, { Component } from 'react';
import './App.css';
import Navbar from './navbar/navbar';
import MainContent from './main-content/main-content';

const File = require('./classes/file');

const electron = window.require('electron');
// const fs = electron.remote.require('fs');
const ipcRenderer = electron.ipcRenderer;

class App extends Component {

  constructor() {
    super();
    ipcRenderer.on('openFile', (evt, data) => { this.openFile.call(this) })
    ipcRenderer.on('saveFile', (evt, data) => { this.saveFile.call(this) })
    ipcRenderer.on('openFileRes', (evt, data) => { this.openFileRes.call(this, data) })
    ipcRenderer.on('saveFileRes', (evt, result) => { result.err ? console.error(result.err.stack ? result.err.stack : result.err) : console.log('File saved') })
    this.state = {
      entries: []
    }
  }

  openFile(e) {
    ipcRenderer.send('openFile');
  }

  openFileRes(data) {
    this.open_file = new File({
      path: data.path,
      content: data.content
    })
    this.setState({ entries: this.sortEntries('version') });
  }

  saveFile() {
    ipcRenderer.send('saveFile', {path: this.open_file.path, content: this.open_file.toSave()}, function (res) {
      console.log(res)
    });
  }

  deleteEntry(id) {
    console.log('Entry id =', id)
    this.open_file.deleteEntry(id);
    this.setState({ entries: this.sortEntries('version') });
  }

  toggleToDoDone(id) {
    console.log('Entry id =', id)
    this.open_file.toggleToDoDone(id);
    this.setState({ entries: this.sortEntries('version') });
  }

  sortEntries(sort_criteria) {
    switch (sort_criteria) {
      case 'date':
        return this.open_file.entriesByDate();
      default:
        return this.open_file.entriesByVersion();
    }
  }

  render() {
    return (
      <div>
        <Navbar parentMethods={{
          openFile: this.openFile,
          saveFile: this.saveFile.bind(this)
        }} />
        <MainContent entries={this.state.entries} parentMethods={{
          deleteEntry: this.deleteEntry.bind(this),
          toggleToDoDone: this.toggleToDoDone.bind(this)
        }} />
      </div>
    );
  }
}

export default App;
