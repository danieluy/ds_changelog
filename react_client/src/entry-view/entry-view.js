import React, { Component } from 'react';
import './entry-view.css'
import plus_icon from '../assets/plus_icon.svg'
import minus_icon from '../assets/minus_icon.svg'
import refactor_icon from '../assets/refactor_icon.svg'
import todo_icon from '../assets/todo_icon.svg'
import fix_icon from '../assets/fix_icon.svg'
import bug_icon from '../assets/bug_icon.svg'


class EntryView extends Component {

  render() {

    const values = this.props.values;

    // this.parentMethods = this.props.parentMethods;

    let icon = (function setIcon() {
      switch (values.type) {
        case 'P':
          return {src: plus_icon, alt: 'Plus entry icon', title: 'Added something'};
        case 'M':
          return {src: minus_icon, alt: 'Minus entry icon', title: 'Removed something'};
        case 'R':
          return {src: refactor_icon, alt: 'Rafactor entry icon', title: 'Refactored something'};
        case 'F':
          return {src: fix_icon, alt: 'Fix entry icon', title: 'Fixed something'};
        case 'B':
          return {src: bug_icon, alt: 'Bug entry icon', title: 'Bug found'};
        default:
          return {src: todo_icon, alt: 'ToDo entry icon', title: 'Something to do'};
      }
    })()

    return (
      <li className={`list-item ${values.type.toLowerCase()} ${values.status}`}>
        <div>
          <img className="type-icon" src={icon.src} alt={icon.alt} title={icon.title} />
          {values.message}
        </div>
        <div className="actions-wrapper">
          <button onClick={() => console.log(`Delete id ${values.id}`)} className="btn-close">&#x2716;</button>
        </div>
      </li>
    );
  }
}

export default EntryView;