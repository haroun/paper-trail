const test = require('tape')
const tag = require('./tag')

test('tag happy path', assert => {
  const message = 'should return a tag'

  const actual = tag({name: 'first'})
  const expected = {name: 'first'}

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('tag with empty name', assert => {
  const message = 'should return a name is empty error'

  try {
    tag({name: ''})

    assert.fail(message)
  } catch (error) {
    const actual = error.message
    const expected = 'name is empty'

    assert.equal(actual, expected, message)
  }

  assert.end()
})

test('tag with invalid name type', assert => {
  const message = 'should return a name must be a string error'

  try {
    tag({name: []})

    assert.fail(message)
  } catch (error) {
    const actual = error.message
    const expected = 'name must be a string'

    assert.equal(actual, expected, message)
  }

  assert.end()
})
