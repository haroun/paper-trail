const test = require('tape')
const event = require('./event')

test('event', assert => {
  const message = 'should be valid'

  const version = 9
  const type = 'test'
  const occurredAt = Date.now()

  const actual = event({version, type, occurredAt})
  const expected = {
    version,
    type,
    occurredAt,
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
  const occurredAt = Date.now()

  try {
    event({version, type, occurredAt})

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
  const occurredAt = Date.now()

  try {
    event({version, type, occurredAt})

    assert.fail(message)
  } catch (err) {
    const actual = err.name
    const expected = 'event-invalid-type'

    assert.equal(actual, expected, message)

    assert.end()
  }
})

test('invalid occurredAt', assert => {
  const message = 'must set occurredAt'

  const version = 9
  const type = 'test'
  const occurredAt = null

  try {
    event({version, type, occurredAt})

    assert.fail(message)
  } catch (err) {
    const actual = err.name
    const expected = 'event-invalid-occurred-at'

    assert.equal(actual, expected, message)

    assert.end()
  }
})
