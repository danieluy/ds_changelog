"use strict";

const inherits = require('./inheritance');
const Entry = require('./entry');

const Todo = function (values) {

    Todo.super_.call(this, values);

}

inherits(Todo, Entry)

Todo.prototype.view = function (index) {

    let li = document.createElement('li');
    li.classList.add(`list-item`);
    li.classList.add(`${this.type.toLowerCase()}`);
    li.classList.add(`${this.status}`);
    li.innerHTML = this.message;

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


module.exports = Todo;