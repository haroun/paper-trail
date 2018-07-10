const test = require('tape')
const accountOpened = require('./account-opened')

test('account-opened event', assert => {
  const message = 'should be valid'

  const version = 9
  const number = '123'
  const date = Date.now()
  const owner = {}
  const balance = 1200

  const actual = accountOpened({version, number, date, owner, balance})
  const expected = {
    version,
    type: accountOpened.TYPE,
    occuredAt: date,
    noticedAt: actual.noticedAt,
    isProcessed: actual.isProcessed,
    attributes: {
      number,
      owner,
      balance
    }
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})
