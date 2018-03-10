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
  const balance = 1000

  const actual = account().handle({
    command: openAccount({
      number,
      owner,
      initialBalance: balance
    })
  })
  const expected = {
    type: accountOpened.TYPE,
    attributes: {
      number,
      owner,
      balance
    }
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('can not deposit a non opened account', assert => {
  const message = 'must open account first before deposit'

  const number = uuid.generate()
  const author = 'test'
  const amount = 12000

  try {
    account().handle({
      command: depositAccount({
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

test('deposit an account', assert => {
  const message = 'account-deposited event'

  const number = uuid.generate()
  const author = 'test'
  const amount = 12000
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
      amount
    })
  })
  const expected = {
    type: accountDeposited.TYPE,
    attributes: {
      number,
      amount
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
      amount
    })
  })
  const expected = {
    type: accountWithdrawn.TYPE,
    attributes: {
      number,
      amount
    }
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})
