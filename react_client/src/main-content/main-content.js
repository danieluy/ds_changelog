import React, { Component } from 'react';
import './main-content.css'

import EntriesList from '../entries-list/entries-list'
import TodosList from '../todos-list/todos-list'


class Content extends Component {

  render() {

    return (
      <div className="wrapper">

        <EntriesList entries={this.props.entries} parentMethods={this.props.parentMethods} ></EntriesList>

        <TodosList entries={this.props.entries} parentMethods={this.props.parentMethods} ></TodosList>

      </div>
    );
  }
}

export default Content;