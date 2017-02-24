import React, { Component } from 'react';
import './new-all-form.css'
import VersionPicker from './version-picker/version-picker';


class NewAllForm extends Component {

  submit(evt) {
    evt.preventDefault();

    let date = null;
    if (evt.target.date.value !== '') {
      const aux = evt.target.date.value.split('-');
      date = `${aux[0]}${aux[1]}${aux[2]}`
    }

    this.parentMethods.newEntry({
      type: evt.target.type.value,
      version: evt.target.type.value === 'T' ? 'ToDo' : evt.target.version.value,
      date: date,
      message: evt.target.message.value
    })
  }

  twoDigits(value) {
    return value.toString().length > 1 ? value.toString() : `0${value}`;
  }

  render() {

    this.parentMethods = this.props.parentMethods;

    return (
      <div className="form-wrapper hidden">
        <form onSubmit={this.submit.bind(this)} id="form-add-log-entry">

          <h2>New log entry</h2>

          <label htmlFor="new-entry-type">Type *</label>
          <select name="type" id="new-entry-type">
            <option value="T" defaultValue>ToDo</option>
            <option value="P">Add</option>
            <option value="M">Remove</option>
            <option value="B">Bug</option>
            <option value="F">Bug fix</option>
            <option value="R">Refactoring</option>
          </select>

          <VersionPicker versions={this.props.versions} />

          <label htmlFor="new-entry-message">Message *</label>
          <input name="message" id="new-entry-message" type="text" placeholder="Whats up..." required />

          <label htmlFor="new-entry-date">Date</label>
          <input name="date" id="new-entry-date" type="date" />

          <div className="form-actions">
            <button type="submit" id="btn-new-log-entry" className="btn-form btn-ok">Add</button>
            <button onClick={this.parentMethods.toggleDisplayNewAllForm} id="btn-cancel-log-entry" className="btn-form btn-cancel">Cancel</button>
          </div>

        </form>
      </div>
    );
  }
}

export default NewAllForm;