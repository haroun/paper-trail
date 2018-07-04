const test = require('tape')
const uuid = require('./../uuid')
const account = require('./account')
const accountOpened = require('./account-opened')
const openAccount = require('./open-account')
const accountDeposited = require('./account-deposited')
const depositAccount = require('./deposit-account')
const accountWithdrawn = require('./account-withdrawn')
const withdrawAccount = require('./withdraw-account')

test('open an account', assert => {
  const message = 'account-opened event'

  const number = uuid.generate()
  const owner = 'test'
  const initialBalance = 1000

  const actual = account().handle({
    command: openAccount({
      number,
      owner,
      initialBalance
    })
  })
  const expected = {
    type: accountOpened.TYPE,
    attributes: {
      number,
      owner,
      balance: initialBalance
    }
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('can not open an account without initialBalance', assert => {
  const message = 'must provide initalBalance'

  const number = uuid.generate()
  const owner = 'test'
  const initialBalance = null

  try {
    account().handle({
      command: openAccount({
        number,
        owner,
        initialBalance
      })
    })

    assert.fail(message)
  } catch (err) {
    const actual = err.message
    const expected = 'initialBalance MUST be a number'

    assert.equal(actual, expected, message)

    assert.end()
  }
})

test('can not deposit a non opened account', assert => {
  const message = 'must open account first before deposit'

  const number = uuid.generate()
  const author = 'test'
  const amount = 12000
  const date = '1234567890'

  try {
    account().handle({
      command: depositAccount({
        number,
        author,
        amount,
        date
      })
    })

    assert.fail(message)
  } catch (err) {
    const actual = err.name
    const expected = 'account-not-open'

    assert.equal(actual, expected, message)

    assert.end()
  }
})

test('deposit an account', assert => {
  const message = 'account-deposited event'

  const number = uuid.generate()
  const author = 'test'
  const amount = 12000
  const date = '1234567890'
  const ownerAccount = account()
  ownerAccount.apply({
    event: accountOpened({
      number,
      owner: author,
      balance: 0
    })
  })

  const actual = ownerAccount.handle({
    command: depositAccount({
      number,
      author,
      amount,
      date
    })
  })
  const expected = {
    type: accountDeposited.TYPE,
    attributes: {
      number,
      date,
      amount,
      description: null
    }
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('can not withdraw a non opened account', assert => {
  const message = 'must open account first before withdraw'

  const number = uuid.generate()
  const author = 'test'
  const amount = 12000

  try {
    account().handle({
      command: withdrawAccount({
        number,
        author,
        amount
      })
    })

    assert.fail(message)
  } catch (err) {
    const actual = err.name
    const expected = 'account-not-open'

    assert.equal(actual, expected, message)

    assert.end()
  }
})

test('withdraw an account', assert => {
  const message = 'account-withdrawn event'

  const number = uuid.generate()
  const author = 'test'
  const amount = 999
  const date = '123456790'
  const ownerAccount = account()
  ownerAccount.apply({
    event: accountOpened({
      number,
      owner: author,
      balance: 0
    })
  })

  const actual = ownerAccount.handle({
    command: withdrawAccount({
      number,
      author,
      amount,
      date
    })
  })
  const expected = {
    type: accountWithdrawn.TYPE,
    attributes: {
      number,
      amount,
      date,
      description: null
    }
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('What component aspect are you testing?', assert => {
  const ownerAccount = account()

  ownerAccount.apply({event: accountOpened({
    number: 12345,
    owner: {},
    balance: 10
  })})

  const message = 'balance should be 10'

  const actual = ownerAccount.balance()
  const expected = 10

  assert.equal(actual, expected, message)

  assert.end()
})

test('account balance after initialBalance, deposit and withdrawal', assert => {
  const ownerAccount = account()

  ownerAccount.apply({event: accountOpened({
    number: 12345,
    owner: {},
    balance: 10
  })})
  ownerAccount.apply({event: accountDeposited({
    number: 123,
    date: Date.now(),
    amount: 100,
    description: 'income'
  })})
  ownerAccount.apply({event: accountDeposited({
    number: 456,
    date: Date.now(),
    amount: 20,
    description: 'cash'
  })})
  ownerAccount.apply({event: accountWithdrawn({
    number: 789,
    date: Date.now(),
    amount: 30,
    description: 'cash'
  })})

  const message = 'balance should be 100'

  const actual = ownerAccount.balance()
  const expected = 100

  assert.equal(actual, expected, message)

  assert.end()
})
