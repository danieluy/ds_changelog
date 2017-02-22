import React, { Component } from 'react';
import './entries-title.css'

class EntriesTitle extends Component {
  render() {
    return (
      <li>{this.props.title}</li>
    );
  }
}

export default EntriesTitle;