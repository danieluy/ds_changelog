import React, { Component } from 'react';
import './entries-list.css'
import EntryView from '../entry-view/entry-view';
import EntriesTitle from '../entries-title/entries-title';

class EntriesList extends Component {

  setEntries(entries) {
    const aux = [];
    let id = 0;
    for (let key in entries) {
      if (entries.hasOwnProperty(key)) {
        if (key !== 'ToDo') {
          aux.push(<EntriesTitle key={key} title={key} />)
          let group = entries[key];
          for (let i = 0; i < group.length; i++) {
            aux.push(<EntryView key={++id} values={{
              id: group[i].id,
              version: group[i].version,
              type: group[i].type,
              date: group[i].date,
              message: group[i].message,
              status: group[i].status
            }} />)
          }
        }
      }
    }
    return aux;
  }

  render() {

    this.entries = this.setEntries(this.props.entries);

    return (
      <ul>
        {this.entries}
      </ul>
    );
  }
}

export default EntriesList;