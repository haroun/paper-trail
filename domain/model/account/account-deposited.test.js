const test = require('tape')
const accountDeposited = require('./account-deposited')

test('account-deposited event', assert => {
  const message = 'should be valid'

  const version = 9
  const number = '123'
  const date = Date.now()
  const amount = 12000
  const description = 'expense'

  const actual = accountDeposited({version, number, date, amount, description})
  const expected = {
    version,
    type: accountDeposited.TYPE,
    occurredAt: date,
    noticedAt: actual.noticedAt,
    isProcessed: actual.isProcessed,
    attributes: {
      number,
      amount,
      description
    }
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})
