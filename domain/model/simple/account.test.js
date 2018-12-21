const test = require('tape')
const account = require('./account')

test('account happy path', assert => {
  const message = 'should return a account'

  const actual = account({
    number: 1,
    owner: 'test',
    balance: 10
  })
  const expected = {
    number: 1,
    owner: 'test',
    balance: 10,
    transactions: []
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('account with empty number', assert => {
  const message = 'should return a number is empty error'

  try {
    account({
      number: null,
      owner: 'test',
      balance: 10
    })

    assert.fail(message)
  } catch (error) {
    const actual = error.message
    const expected = 'number is empty'

    assert.equal(actual, expected, message)
  }

  assert.end()
})

test('account with invalid owner', assert => {
  const message = 'should return an invalid owner error'

  try {
    account({
      number: 1,
      owner: null,
      balance: 10
    })

    assert.fail(message)
  } catch (error) {
    const actual = error.message
    const expected = 'Invalid owner, received null'

    assert.equal(actual, expected, message)
  }

  assert.end()
})

test('account with owner must be a string', assert => {
  const message = 'should return an owner must be a string error'

  try {
    account({
      number: 1,
      owner: [],
      balance: 10
    })

    assert.fail(message)
  } catch (error) {
    const actual = error.message
    const expected = 'owner must be a string'

    assert.equal(actual, expected, message)
  }

  assert.end()
})

test('account with invalid balance', assert => {
  const message = 'should return an invalid balance error'

  try {
    account({
      number: 1,
      owner: 'test',
      balance: 'invalid'
    })

    assert.fail(message)
  } catch (error) {
    const actual = error.message
    const expected = 'balance invalid, received invalid'

    assert.equal(actual, expected, message)
  }

  assert.end()
})

test('account add transaction', assert => {
  const message = 'should return account with new transactions'

  const testAccount = account({
    number: 1,
    owner: 'test',
    balance: 10
  })
  const action = {type: account.ADD_TRANSACTION, data: 'test'}

  const actual = account.update({state: testAccount, action})
  const expected = {
    number: 1,
    owner: 'test',
    balance: 10,
    transactions: ['test']
  }

  assert.deepEqual(actual, expected, message)
  assert.notDeepEqual(testAccount, actual, 'should not mutate original account')

  assert.end()
})
