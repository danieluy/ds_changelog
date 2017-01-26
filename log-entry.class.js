"use strict";

const LogEntry = function (values) {
    this.version = values.version;
    this.type = values.type;
    this.date = values.date;
    this.message = values.message;
}
LogEntry.prototype.view = function (index) {
    let li = document.createElement('li');
    li.setAttribute('class', this.classList());
    li.innerHTML = this.message;
    li.setAttribute('data-i', index);
    return li;
}
LogEntry.prototype.classList = function () {
    let class_list = 'list-item';
    switch (this.type) {
        case '+':
            class_list += ' plus';
            break;
        case '-':
            class_list += ' minus';
            break;
        case 'TODO':
            class_list += '';
            break;
        case 'BUG':
            class_list += '';
            break;
        case 'BUG FIX':
            class_list += '';
            break;
        default:
            break;
    }
    return class_list;
}

module.exports = LogEntry;