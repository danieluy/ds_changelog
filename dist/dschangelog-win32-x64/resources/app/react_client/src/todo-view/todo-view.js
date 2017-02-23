import React, { Component } from 'react';
import './todo-view.css'
import todo_icon from '../assets/todo_icon.svg'
import todo_done_icon from '../assets/todo_done_icon.svg'


class ToDoView extends Component {

  render() {

    this.parentMethods = this.props.parentMethods;

    const values = this.props.values;

    // this.parentMethods = this.props.parentMethods;

    let icon = (function setIcon() {
      if (values.status === 'checked')
        return { src: todo_done_icon, alt: 'ToDo entry icon', title: 'Something to do' };
      return { src: todo_icon, alt: 'ToDo entry icon', title: 'Something to do' };
    })()

    return (
      <li onClick={() => { this.parentMethods.toggleToDoDone(values.id) }} className={`t ${values.status}`}>
        <div>
          <img className="type-icon" src={icon.src} alt={icon.alt} title={icon.title} />
          {values.message}
        </div>
      </li>
    );
  }
}

export default ToDoView;