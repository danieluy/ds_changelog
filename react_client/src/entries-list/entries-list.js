import React, { Component } from 'react';
import './entries-list.css'


class EntriesList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.entries}
        </ul>
      </div>
    );
  }
}

export default EntriesList;