"use strict";

const Plus = require('../classes/plus');
// const Entry = require('../classes/entry');
const expect = require('chai').expect;

describe('Instantiation', function () {
  it('should instantiate a Plus', function () {
    const plus = Object.create(Plus);
    console.log(plus)
    console.log(Plus.isPrototypeOf(plus))
  })
})