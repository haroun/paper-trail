const assert = require('assert').strict

const TYPE_DEPOSIT = 'deposit'
const TYPE_WITHDRAWAL = 'withdrawal'
const PAYMENT_METHOD_CARD = 'card'
const PAYMENT_METHOD_CASH = 'cash'
const PAYMENT_METHOD_CHECK = 'check'
const PAYMENT_METHOD_TRANSFER = 'transfer'

const transactionMixin = ({number, type, date, amount, description = '', paymentMethod}) => {
  const state = {
    number,
    type,
    date: Date.parse(date),
    amount: Math.abs(Number.parseInt(amount, 10)),
    description,
    paymentMethod
  }

  assert.ok(state.number, 'number is empty')
  assert.notEqual(-1, [TYPE_DEPOSIT, TYPE_WITHDRAWAL].indexOf(state.type), `Invalid type, expected ${TYPE_DEPOSIT}|${TYPE_WITHDRAWAL}, received ${type}`)
  assert.notEqual(NaN, state.date, `date invalid, received ${date}`)
  assert.notEqual(NaN, state.amount, `amount invalid, received ${amount}`)
  assert.notEqual(-1, [PAYMENT_METHOD_CARD, PAYMENT_METHOD_CASH, PAYMENT_METHOD_CHECK, PAYMENT_METHOD_TRANSFER].indexOf(state.paymentMethod), `Invalid paymentMethod, expected ${PAYMENT_METHOD_CARD}|${PAYMENT_METHOD_CASH}|${PAYMENT_METHOD_CHECK}|${PAYMENT_METHOD_TRANSFER}, received ${paymentMethod}`)

  return Object.freeze(state)
}

module.exports = transactionMixin
module.exports.TYPE_DEPOSIT = TYPE_DEPOSIT
module.exports.TYPE_WITHDRAWAL = TYPE_WITHDRAWAL
module.exports.PAYMENT_METHOD_CARD = PAYMENT_METHOD_CARD
module.exports.PAYMENT_METHOD_CASH = PAYMENT_METHOD_CASH
module.exports.PAYMENT_METHOD_CHECK = PAYMENT_METHOD_CHECK
module.exports.PAYMENT_METHOD_TRANSFER = PAYMENT_METHOD_TRANSFER
