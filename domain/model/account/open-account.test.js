const test = require('tape')
const openAccount = require('./open-account')

test('open-account command', assert => {
  const message = 'should be valid'

  const version = 9
  const number = '123'
  const date = Date.now()
  const owner = 'test'
  const initialBalance = 12000

  const actual = openAccount({version, number, date, owner, initialBalance})
  const expected = {
    version,
    type: openAccount.TYPE,
    number,
    date,
    owner,
    initialBalance
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})
