const Entry = function (values) {
    this.id = values.id;
    this.version = values.version;
    this.type = values.type;
    this.date = values.date;
    this.message = values.message;
    this.status = values.status || 'created'; // created, edited, deleted
}

Entry.prototype.toString = function () {
    return `\t${this.date} | ${this.type} | ${this.message}\n`;
}

module.exports = Entry;