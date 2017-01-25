"use strict";

const LogEntry = function (values) {
    this.version = values.version;
    this.type = values.type;
    this.date = values.date;
    this.message = values.message;
}
LogEntry.prototype.view = function () {
    return `<div>${this.message}</div>`
}

module.exports = LogEntry;