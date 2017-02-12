"use strict";

const Entry = function (values) {
    this.version = values.version;
    this.type = values.type;
    this.date = values.date;
    this.message = values.message;
}
Entry.prototype.view = function (index) {
    let li = document.createElement('li');
    li.classList.add(`list-item`);
    li.classList.add(`${this.type.toLowerCase()}`);
    li.innerHTML = this.message;
    li.setAttribute('data-i', index);
    return li;
}

module.exports = Entry;