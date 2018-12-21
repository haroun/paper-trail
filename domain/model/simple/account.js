const assert = require('assert').strict

const ADD_TRANSACTION = 'ADD:TRANSACTION'

const accountMixin = ({number, owner, balance = 0}) => {
  const state = {
    number,
    owner,
    balance: Number.parseInt(balance, 10),
    transactions: []
  }

  assert.ok(state.number, 'number is empty')
  assert.ok(state.owner, `Invalid owner, received ${owner}`)
  assert.ok(typeof state.owner === 'string', 'owner must be a string')
  assert.notEqual(NaN, state.balance, `balance invalid, received ${balance}`)

  return Object.freeze(state)
}

const update = ({state, action = {}}) => {
  const {type, data} = action
  switch (type) {
    case ADD_TRANSACTION:
      return Object.freeze({...state, transactions: state.transactions.concat(data)})
    default:
      return Object.freeze({...state})
  }
}

module.exports = accountMixin
module.exports.update = update
module.exports.ADD_TRANSACTION = ADD_TRANSACTION
