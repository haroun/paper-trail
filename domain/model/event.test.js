const test = require('tape')
const event = require('./event')

test('event', assert => {
  const message = 'should be valid'

  const version = 9
  const type = 'test'
  const occuredAt = Date.now()

  const actual = event({version, type, occuredAt})
  const expected = {
    version,
    type,
    occuredAt,
    noticedAt: actual.noticedAt,
    isProcessed: actual.isProcessed
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('invalid version', assert => {
  const message = 'must set version'

  const version = null
  const type = 'test'
  const occuredAt = Date.now()

  try {
    event({version, type, occuredAt})

    assert.fail(message)
  } catch (err) {
    const actual = err.name
    const expected = 'event-invalid-version'

    assert.equal(actual, expected, message)

    assert.end()
  }
})

test('invalid type', assert => {
  const message = 'must set type'

  const version = 9
  const type = null
  const occuredAt = Date.now()

  try {
    event({version, type, occuredAt})

    assert.fail(message)
  } catch (err) {
    const actual = err.name
    const expected = 'event-invalid-type'

    assert.equal(actual, expected, message)

    assert.end()
  }
})

test('invalid occuredAt', assert => {
  const message = 'must set occuredAt'

  const version = 9
  const type = 'test'
  const occuredAt = null

  try {
    event({version, type, occuredAt})

    assert.fail(message)
  } catch (err) {
    const actual = err.name
    const expected = 'event-invalid-occured-at'

    assert.equal(actual, expected, message)

    assert.end()
  }
})
