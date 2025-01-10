/* Copyright © Time By Ping, Inc. 2024. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.’s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.*/
const assert = require('assert');
const truncate = require('../lib/truncate');

describe('test truncate', () => {
  it('should not fail with empty message', () => {
    const expected = '';
    const actual = truncate(expected, expected.length);
    assert.equal(expected, actual);
  });

  it('should not truncate when length <= maxLength', () => {
    const expected = 'hello world';
    const actual = truncate(expected, expected.length);
    assert.equal(expected, actual);
  });

  it('should not remove last element when no newline', () => {
    const expected = 'hello wor*[...]*';
    const actual = truncate('hello world and good morning', 9);
    assert.equal(expected, actual);
  });

  it('should remove last element when newline', () => {
    const expected = 'hello\nworld*[...]*';
    const actual = truncate('hello\nworld\nand\ngood\nmorning', 14);
    assert.equal(expected, actual);
  });
});
