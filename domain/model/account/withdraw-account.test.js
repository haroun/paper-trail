const test = require('tape')
const withdrawAccount = require('./withdraw-account')

test('withdraw-account command', assert => {
  const message = 'should be valid'

  const version = 9
  const number = '123'
  const date = Date.now()
  const amount = 12000
  const description = 'income'
  const author = 'test'

  const actual = withdrawAccount({version, number, date, amount, description, author})
  const expected = {
    version,
    type: withdrawAccount.TYPE,
    number,
    date,
    amount,
    description,
    author
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})
