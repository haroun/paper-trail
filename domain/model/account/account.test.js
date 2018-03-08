const test = require('tape')
const uuid = require('./../uuid')
const account = require('./account')

test('open an account', assert => {
  const message = 'account-opened event'

  const accountNumber = uuid.generate()
  const owner = 'test'
  const balance = 10
  const openAccount = {
    number: accountNumber,
    owner,
    initialBalance: balance
  }

  const actual = account().open(openAccount)
  const expected = {
    type: 'account-opened',
    attributes: {
      number: accountNumber,
      owner,
      balance
    }
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})
