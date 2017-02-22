import React, { Component } from 'react';
import './entries-title.css'

class EntriesTitle extends Component {
  render() {
    return (
      <li className="list-title">{this.props.title}</li>
    );
  }
}

export default EntriesTitle;