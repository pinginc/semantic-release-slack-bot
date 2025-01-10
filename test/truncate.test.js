import { equal } from 'assert'
import truncate from '../lib/truncate'

describe('test truncate', () => {
  it('should not fail with empty message', () => {
    const expected = ''
    const actual = truncate(expected, expected.length)
    equal(expected, actual)
  })

  it('should not truncate when length <= maxLength', () => {
    const expected = 'hello world'
    const actual = truncate(expected, expected.length)
    equal(expected, actual)
  })

  it('should not remove last element when no newline', () => {
    const expected = 'hello wor*[...]*'
    const actual = truncate('hello world and good morning', 9)
    equal(expected, actual)
  })

  it('should remove last element when newline', () => {
    const expected = 'hello\nworld*[...]*'
    const actual = truncate('hello\nworld\nand\ngood\nmorning', 14)
    equal(expected, actual)
  })
})
