"use strict";

const inherits = require('./inheritance');
const Entry = require('./entry');

const Bug = function (values) {

    Bug.super_.call(this, values);

}

inherits(Bug, Entry)

Bug.prototype.view = function (index) {
    let li = document.createElement('li');
    li.classList.add(`list-item`);
    li.classList.add(`${this.type.toLowerCase()}`);
    li.innerHTML = this.message;
    li.classList.add(this.status);

    if (this.status !== 'deleted') {
        let actions = document.createElement('div');
        actions.classList.add('actions-wrapper');

        let close = document.createElement('button');
        close.innerHTML = '&#10006';
        close.classList.add('btn-close');
        close.setAttribute('onclick', `app.deleteEntry(${this.id})`);
        actions.appendChild(close);
        
        li.appendChild(actions);
    }

    return li;
}

module.exports = Bug;