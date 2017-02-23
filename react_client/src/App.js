import React, { Component } from 'react';
import './App.css';
import Navbar from './navbar/navbar';
import MainContent from './main-content/main-content';
import NewAllForm from './new-all-form/new-all-form';

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
      entries: [],
      versions: [],
      displayNewAllForm: false
    };
  }

  openFile(e) {
    ipcRenderer.send('openFile');
  }

  openFileRes(data) {
    this.open_file = new File({
      path: data.path,
      content: data.content
    })
    this.setState({
      entries: this.sortEntries('version'),
      versions: this.open_file.getVersions()
    });
  }

  saveFile() {
    ipcRenderer.send('saveFile', {path: this.open_file.path, content: this.open_file.toSave()}, function (res) {
      console.log(res)
    });
  }

  deleteEntry(id) {
    console.log('Entry id =', id)
    this.open_file.deleteEntry(id);
    this.setState({
      entries: this.sortEntries('version'),
      versions: this.open_file.getVersions()
    });
  }

  toggleToDoDone(id) {
    console.log('Entry id =', id)
    this.open_file.toggleToDoDone(id);
    this.setState({ entries: this.sortEntries('version') });
  }

  sortEntries(sort_criteria) {
    if (this.open_file)
      switch (sort_criteria) {
        case 'version':
          return this.open_file.entriesByVersion();
        case 'date':
          return this.open_file.entriesByDate();
        default:
          return [];
      }
    return [];
  }

  newEntry(values) {
    this.open_file.newEntry(values)
    this.setState({
      entries: this.sortEntries('version'),
      versions: this.open_file.getVersions()
    });
  }

  toggleDisplayNewAllForm(evt) {
    if (evt)
      evt.preventDefault();
    if (this.state.displayNewAllForm)
      this.setState({ displayNewAllForm: false })
    else
      this.setState({ displayNewAllForm: true })
  }

  render() {
    return (
      <div>
        <Navbar parentMethods={{
          openFile: this.openFile,
          saveFile: this.saveFile.bind(this),
          toggleDisplayNewAllForm: this.toggleDisplayNewAllForm.bind(this)
        }} />
        <MainContent entries={this.state.entries} parentMethods={{
          deleteEntry: this.deleteEntry.bind(this),
          toggleToDoDone: this.toggleToDoDone.bind(this)
        }} />
        { this.state.displayNewAllForm && <NewAllForm versions={this.state.versions} parentMethods={{
          newEntry: this.newEntry.bind(this),
          toggleDisplayNewAllForm: this.toggleDisplayNewAllForm.bind(this)
        }} />}
      </div>
    );
  }
}

export default App;
