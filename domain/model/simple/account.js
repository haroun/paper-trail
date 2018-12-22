const assert = require('assert').strict

const ADD_TRANSACTION = 'ACCOUNT::ADD_TRANSACTION'

const accountMixin = ({number, owner, initialBalance = 0}) => {
  const state = {
    number,
    owner,
    initialBalance: Number.parseInt(initialBalance, 10),
    transactions: []
  }

  assert.ok(state.number, 'number is empty')
  assert.ok(state.owner, `Invalid owner, received ${owner}`)
  assert.ok(typeof state.owner === 'string', 'owner must be a string')
  assert.notEqual(NaN, state.initialBalance, `initialBalance invalid, received ${initialBalance}`)

  return Object.freeze(state)
}

const update = ({state, action = {}}) => {
  const {type, data} = action
  switch (type) {
    case ADD_TRANSACTION:
      return Object.freeze({
        ...state,
        transactions: state.transactions.concat(data)
      })
    default:
      return Object.freeze({...state})
  }
}

const balance = state => {
  return state.transactions.reduce(
    (accumulator, current) => {
      return accumulator + ((current.amount || 0) * (current.type === 'DEPOSIT' ? 1 : -1))
    },
    state.initialBalance
  )
}

module.exports = accountMixin
module.exports.update = update
module.exports.balance = balance
module.exports.ADD_TRANSACTION = ADD_TRANSACTION
