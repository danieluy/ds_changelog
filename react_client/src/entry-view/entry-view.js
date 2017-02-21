import React, { Component } from 'react';
import './entry-view.css'


class EntryView extends Component {

  render() {
    const values = this.props.values;
    return (
      <li className={`list-item ${values.type.toLowerCase()} ${values.status}`}>
        {values.message}
        <div>
          <button onClick={() => console.log(`Delete id ${values.id}`)} className="btn-close">

          </button>
        </div>
      </li>
    );
  }
}

export default EntryView;