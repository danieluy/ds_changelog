import React, { Component } from 'react';
import './todos-list.css'
import ToDoView from '../todo-view/todo-view';
import EntriesTitle from '../entries-title/entries-title';

class TodosList extends Component {

  setEntries(entries) {
    if (entries.hasOwnProperty('ToDo')) {
      const aux = [];
      let id = 0;
      aux.push(<EntriesTitle key={'ToDo'} title={'ToDo'} />)
      let group = entries.ToDo;
      for (let i = 0; i < group.length; i++) {
        aux.push(<ToDoView key={++id} parentMethods={this.props.parentMethods} values={{
          id: group[i].id,
          version: group[i].version,
          type: group[i].type,
          date: group[i].date,
          message: group[i].message,
          status: group[i].status
        }} />)
      }
      return aux;
    }
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

export default TodosList;