import { equal, deepEqual } from 'assert'
import template from '../lib/template.js'
import { describe, it } from 'mocha'

describe('test template', () => {
  it('should replace variable in string if present', () => {
    const world = 'underworld'
    const expected = `hello ${world}`
    const actual = template('hello $world', { world })
    equal(expected, actual)
  })

  it('should not replace variable in string if not present', () => {
    const expected = 'hello $world'
    const actual = template('hello $world', { other: 'underworld' })
    equal(expected, actual)
  })

  it('should return string as is with no matching variables', () => {
    const expected = 'hello world'
    const actual = template(expected, { other: 'underworld' })
    equal(expected, actual)
  })

  it('should return string as is without any variables', () => {
    const expected = 'hello world'
    const actual = template(expected, {})
    equal(expected, actual)
  })

  it('should replace multiple variables in string if present', () => {
    const world = 'underworld'
    const home = 'back'
    const expected = `hello ${world}, welcome ${home}`
    const actual = template('hello $world, welcome $home', {
      world,
      home
    })
    equal(expected, actual)
  })

  it('should replace multiple identical variables in string', () => {
    const world = 'underworld'
    const expected = `hello ${world}, hello ${world}`
    const actual = template('hello $world, hello $world', { world })
    equal(expected, actual)
  })

  it('should replace variable in list', () => {
    const expected = 'underworld'
    const actual = template(['$world'], { world: expected })
    equal(expected, actual)
  })

  it('should replace multiple variables in list', () => {
    const expected = ['underworld', 'goodbye']
    const actual = template(['$world', '$hello'], {
      world: expected[0],
      hello: expected[1]
    })
    deepEqual(expected, actual)
  })

  it('should replace variable in object', () => {
    const expected = { hello: 'underworld' }
    const actual = template({ hello: '$world' }, { world: expected.hello })
    deepEqual(expected, actual)
  })

  it('should replace multiple variables in object', () => {
    const world = 'underworld'
    const home = 'back'
    const expected = { hello: `${world}, welcome ${home}` }
    const actual = template({ hello: '$world, welcome $home' }, { world, home })
    deepEqual(expected, actual)
  })

  it('should replace variables only if present', () => {
    const world = 'underworld'
    const home = 'back'
    const noVariables = 'there are no variables here'
    const expected = {
      hello: `${world}, welcome ${home}`,
      dimension: `${noVariables}`
    }
    const actual = template(
      { hello: '$world, welcome $home', dimension: `${noVariables}` },
      { world, home }
    )
    deepEqual(expected, actual)
  })

  it('should replace variables in all entries', () => {
    const world = 'underworld'
    const nothing = 'everything'
    const expected = {
      hello: `${world}`,
      own: `${nothing}`
    }
    const actual = template(
      { hello: '$world', own: '$nothing' },
      { world, nothing }
    )
    deepEqual(expected, actual)
  })

  it('should return default if neither string or object', () => {
    const expected = 123
    const actual = template(expected)
    equal(expected, actual)
  })
})
