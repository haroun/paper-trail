const test = require('tape')
const accountWithdrawn = require('./account-withdrawn')

test('account-withdrawn event', assert => {
  const message = 'should be valid'

  const version = 9
  const number = '123'
  const date = Date.now()
  const amount = 12000
  const description = 'income'

  const actual = accountWithdrawn({version, number, date, amount, description})
  const expected = {
    version,
    type: accountWithdrawn.TYPE,
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
