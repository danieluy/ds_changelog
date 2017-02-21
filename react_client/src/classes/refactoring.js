const inherits = require('./inheritance');
const Entry = require('./entry');

import React from 'react';
import EntryView from '../entry-view/entry-view';

const Refactoring = function (values) {

    Refactoring.super_.call(this, values);

}

inherits(Refactoring, Entry)

Refactoring.prototype.view = function (index) {
    // let li = document.createElement('li');
    // li.classList.add(`list-item`);
    // li.classList.add(`${this.type.toLowerCase()}`);
    // li.innerHTML = this.message;
    // li.classList.add(this.status);

    // if (this.status !== 'deleted') {
    //     let actions = document.createElement('div');
    //     actions.classList.add('actions-wrapper');

    //     let close = document.createElement('button');
    //     close.innerHTML = '&#10006';
    //     close.classList.add('btn-close');
    //     close.setAttribute('onclick', `app.deleteEntry(${this.id})`);
    //     actions.appendChild(close);
        
    //     li.appendChild(actions);
    // }

    // return li;

    return <EntryView key={index} values={{
        id: this.id,
        version: this.version,
        type: this.type,
        date: this.date,
        message: this.message,
        status: this.status
    }} />
}

module.exports = Refactoring;