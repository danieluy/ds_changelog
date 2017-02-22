import React, { Component } from 'react';
import './App.css';
import Navbar from './navbar/navbar';
import MainContent from './main-content/main-content';

const File = require('./classes/file');

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const ipcRenderer = electron.ipcRenderer;

class App extends Component {

  constructor() {
    super();
    ipcRenderer.on('openFile', (evt, path) => { this.openFile.call(this, path) })
    this.state = {
      entries: []
    }
  }

  callOpenFile(e) {
    ipcRenderer.send('openFile');
  }

  openFile(path) {
    const open_file = new File({
      path: path,
      content: fs.readFileSync(path, 'UTF-8')
    })
    this.setState({ entries: this.sortEntries(open_file, 'version') });
  }

  sortEntries(open_file, sort_criteria) {
    switch (sort_criteria) {
      case 'date':
        return open_file.entriesByDate();
      default:
        return open_file.entriesByVersion();
    }
  }

  render() {
    return (
      <div>
        <Navbar parentMethods={{
          callOpenFile: this.callOpenFile
        }} />
        <MainContent entries={this.state.entries} />
      </div>
    );
  }
}

export default App;
