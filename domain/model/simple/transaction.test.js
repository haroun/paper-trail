const test = require('tape')
const transaction = require('./transaction')

test('transaction happy path', assert => {
  const message = 'should return a transaction'

  const actual = transaction({
    number: 1,
    type: transaction.TYPE_DEPOSIT,
    date: '1970-01-01T00:00:00.001Z',
    amount: 10,
    description: 'first',
    paymentMethod: transaction.PAYMENT_METHOD_TRANSFER
  })
  const expected = {
    number: 1,
    type: transaction.TYPE_DEPOSIT,
    date: 1,
    amount: 10,
    description: 'first',
    paymentMethod: transaction.PAYMENT_METHOD_TRANSFER
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('transaction with empty number', assert => {
  const message = 'should return a number is empty error'

  try {
    transaction({
      number: null,
      type: transaction.TYPE_DEPOSIT,
      date: '1970-01-01T00:00:00.001Z',
      amount: 10,
      description: 'first',
      paymentMethod: transaction.PAYMENT_METHOD_TRANSFER
    })

    assert.fail(message)
  } catch (error) {
    const actual = error.message
    const expected = 'number is empty'

    assert.equal(actual, expected, message)
  }

  assert.end()
})

test('transaction with invalid type', assert => {
  const message = 'should return an invalid type error'

  try {
    transaction({
      number: 1,
      type: 'invalid',
      date: '1970-01-01T00:00:00.001Z',
      amount: 10,
      description: 'first',
      paymentMethod: transaction.PAYMENT_METHOD_TRANSFER
    })

    assert.fail(message)
  } catch (error) {
    const actual = error.message
    const expected = 'Invalid type, expected deposit|withdrawal, received invalid'

    assert.equal(actual, expected, message)
  }

  assert.end()
})

test('transaction with invalid date', assert => {
  const message = 'should return an invalid date error'

  try {
    transaction({
      number: 1,
      type: transaction.TYPE_DEPOSIT,
      date: 'invalid',
      amount: 10,
      description: 'first',
      paymentMethod: transaction.PAYMENT_METHOD_TRANSFER
    })

    assert.fail(message)
  } catch (error) {
    const actual = error.message
    const expected = 'date invalid, received invalid'

    assert.equal(actual, expected, message)
  }

  assert.end()
})

test('transaction with invalid amount', assert => {
  const message = 'should return an invalid amount error'

  try {
    transaction({
      number: 1,
      type: transaction.TYPE_DEPOSIT,
      date: '1970-01-01T00:00:00.001Z',
      amount: 'invalid',
      description: 'first',
      paymentMethod: transaction.PAYMENT_METHOD_TRANSFER
    })

    assert.fail(message)
  } catch (error) {
    const actual = error.message
    const expected = 'amount invalid, received invalid'

    assert.equal(actual, expected, message)
  }

  assert.end()
})

test('transaction with invalid paymentMethod', assert => {
  const message = 'should return an invalid paymentMethod error'

  try {
    transaction({
      number: 1,
      type: transaction.TYPE_DEPOSIT,
      date: '1970-01-01T00:00:00.001Z',
      amount: 10,
      description: 'first',
      paymentMethod: 'invalid'
    })

    assert.fail(message)
  } catch (error) {
    const actual = error.message

    const expected = 'Invalid paymentMethod, expected card|cash|check|transfer, received invalid'

    assert.equal(actual, expected, message)
  }

  assert.end()
})
