"use strict";

const expect = require('chai').expect;
const Todo = require('../classes/todo');
const Entry = require('../classes/entry');

describe('Instantiation', function () {
  it('should instantiate a Todo', function () {
    const todo = new Todo({
      id: 'id',
      version: 'version',
      type: 'type',
      date: 'date',
      message: 'message',
      status: 1
    })
    expect(Todo.prototype.isPrototypeOf(todo)).be.true;
    expect(Entry.prototype.isPrototypeOf(todo)).be.true;
  })
})