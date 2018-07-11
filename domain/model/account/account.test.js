const test = require('tape')
const account = require('./account')
const accountOpened = require('./account-opened')
const openAccount = require('./open-account')
const accountDeposited = require('./account-deposited')
const depositAccount = require('./deposit-account')
const accountWithdrawn = require('./account-withdrawn')
const withdrawAccount = require('./withdraw-account')

test('open an account', assert => {
  const message = 'account-opened event'

  const version = 1
  const number = '1234'
  const date = Date.now()
  const owner = 'test'
  const initialBalance = 1000

  const actual = account().handle({
    command: openAccount({
      version,
      number,
      date,
      owner,
      initialBalance
    })
  })
  const expected = {
    version,
    type: accountOpened.TYPE,
    occurredAt: date,
    noticedAt: actual.noticedAt,
    isProcessed: actual.isProcessed,
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

  const version = 1
  const number = '1234'
  const date = Date.now()
  const owner = 'test'
  const initialBalance = null

  try {
    account().handle({
      command: openAccount({
        version,
        number,
        date,
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

  const version = 1
  const number = '1234'
  const date = Date.now()
  const amount = 12000
  const description = 'income'
  const author = 'test'

  try {
    account().handle({
      command: depositAccount({
        version,
        number,
        date,
        amount,
        description,
        author
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

  const version = 1
  const number = '1234'
  const date = Date.now()
  const amount = 12000
  const description = 'income'
  const author = 'test'

  const ownerAccount = account()
  ownerAccount.apply({
    event: accountOpened({
      version: 1,
      number,
      date,
      owner: author,
      balance: 0
    })
  })

  const actual = ownerAccount.handle({
    command: depositAccount({
      version,
      number,
      date,
      amount,
      description,
      author
    })
  })
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

test('can not withdraw a non opened account', assert => {
  const message = 'must open account first before withdraw'

  const version = 1
  const number = '1234'
  const date = Date.now()
  const amount = 12000
  const description = 'expense'
  const author = 'test'

  try {
    account().handle({
      command: withdrawAccount({
        version,
        number,
        date,
        amount,
        description,
        author
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

  const version = 1
  const number = '1234'
  const date = Date.now()
  const amount = 999
  const description = 'expense'
  const author = 'test'

  const ownerAccount = account()
  ownerAccount.apply({
    event: accountOpened({
      version: 1,
      number,
      date,
      owner: author,
      balance: 0
    })
  })

  const actual = ownerAccount.handle({
    command: withdrawAccount({
      version,
      number,
      date,
      amount,
      description,
      author
    })
  })
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

test('account initial balance', assert => {
  const ownerAccount = account()

  ownerAccount.apply({event: accountOpened({
    version: 1,
    number: 12345,
    date: Date.now(),
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
    version: 1,
    number: 12345,
    date: Date.now(),
    owner: {},
    balance: 10
  })})
  ownerAccount.apply({event: accountDeposited({
    version: 1,
    number: 123,
    date: Date.now(),
    amount: 100,
    description: 'income'
  })})
  ownerAccount.apply({event: accountDeposited({
    version: 2,
    number: 456,
    date: Date.now(),
    amount: 20,
    description: 'cash'
  })})
  ownerAccount.apply({event: accountWithdrawn({
    version: 1,
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
