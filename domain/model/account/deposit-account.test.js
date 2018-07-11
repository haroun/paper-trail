const test = require('tape')
const depositAccount = require('./deposit-account')

test('deposit-account command', assert => {
  const message = 'should be valid'

  const version = 9
  const number = '123'
  const date = Date.now()
  const amount = 12000
  const description = 'expense'
  const author = 'test'

  const actual = depositAccount({version, number, date, amount, description, author})
  const expected = {
    version,
    type: depositAccount.TYPE,
    number,
    date,
    amount,
    description,
    author
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})
