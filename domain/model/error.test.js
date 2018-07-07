const test = require('tape')
const error = require('./error')

test('account-not-open', assert => {
  const message = 'should return an account-not-open error'

  const errorMessage = 'invalid'
  const err = error.accountNotOpen(errorMessage)

  const actual = {
    name: err.name,
    message: err.message
  }
  const expected = {
    name: 'account-not-open',
    message: errorMessage
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('entry-invalid-type', assert => {
  const message = 'should return an entry-invalid-type error'

  const errorMessage = 'invalid'
  const err = error.entryInvalidType(errorMessage)

  const actual = {
    name: err.name,
    message: err.message
  }
  const expected = {
    name: 'entry-invalid-type',
    message: errorMessage
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('event-invalid-version', assert => {
  const message = 'should return an event-invalid-version error'

  const errorMessage = 'invalid'
  const err = error.eventInvalidVersion(errorMessage)

  const actual = {
    name: err.name,
    message: err.message
  }
  const expected = {
    name: 'event-invalid-version',
    message: errorMessage
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('event-invalid-type', assert => {
  const message = 'should return an event-invalid-type error'

  const errorMessage = 'invalid'
  const err = error.eventInvalidType(errorMessage)

  const actual = {
    name: err.name,
    message: err.message
  }
  const expected = {
    name: 'event-invalid-type',
    message: errorMessage
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('event-invalid-occured-at', assert => {
  const message = 'should return an event-invalid-occured-at error'

  const errorMessage = 'invalid'
  const err = error.eventInvalidOccuredAt(errorMessage)

  const actual = {
    name: err.name,
    message: err.message
  }
  const expected = {
    name: 'event-invalid-occured-at',
    message: errorMessage
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})
