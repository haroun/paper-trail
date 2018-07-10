const test = require('tape')
const entry = require('./entry')

test('entry', assert => {
  const message = 'should be valid'

  const type = entry.TYPE_WITHDRAWAL
  const tag = '123'
  const amount = 12000
  const description = 'income'
  const date = Date.now()

  const actual = entry({type, tag, amount, description, date})
  const expected = {
    type,
    tag,
    amount,
    description,
    date
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('invalid entry type', assert => {
  const message = 'must provide valid entry type'

  const type = 'invalid'
  const tag = '123'
  const amount = 12000
  const description = 'income'
  const date = Date.now()

  try {
    entry({type, tag, amount, description, date})

    assert.fail(message)
  } catch (err) {
    const actual = err.message
    const expected = 'invalid entry type'

    assert.equal(actual, expected, message)

    assert.end()
  }
})
