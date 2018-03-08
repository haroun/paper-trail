const uuid = require('./../uuid')
const accountOpened = require('./account-opened')
const accountDeposited = require('./account-deposited')
const accountWithdrawn = require('./account-withdrawn')

const accountMixin = () => {
  let number = null
  let owner = null
  let balance = 0
  const events = []

  let version = -1

  const load = (events, handler) => {
    events.reduce((acc, event) => {
      handler(event)
      version = event.version

      return null
    }, null)
  }

  return {
    number: () => number,
    owner: () => owner,
    balance: () => balance,
    version: () => version,
    events: () => events,

    open: ({number = '', owner = '', initialBalance = 0}) => {
      if (number === '') {
        throw new TypeError('number MUST be filled')
      }
      if (owner === '') {
        throw new TypeError('owner MUST be filled')
      }
      if (!Number.isInteger(initialBalance)) {
        throw new TypeError('initialBalance MUST be a number')
      }

      return accountOpened({number, owner, balance: initialBalance})
    },

    withdraw: ({author, amount = 0}) => {
      if (owner !== author) {
        throw new TypeError('owner MUST match')
      }
      if (!Number.isInteger(amount) || amount < 1) {
        throw new TypeError('amount MUST be a positive integer')
      }

      return accountWithdrawn({amount: Math.abs(amount)})
    },

    deposit: ({author, amount = 0}) => {
      if (owner !== author) {
        throw new TypeError('owner MUST match')
      }
      if (!Number.isInteger(amount) || amount < 1) {
        throw new TypeError('amount MUST be a positive integer')
      }

      return accountDeposited({amount: Math.abs(amount)})
    },

    apply: ({event}) => {
      const {type = ''} = event

      if (type === 'account-opened') {
        number = event.number
        owner = event.owner
        balance = event.initialBalance
      } else if (type === 'account-deposited') {
        balance += event.amount
      } else if (type === 'account-withdrawn') {
        balance -= event.amount
      }
    }
  }
}

module.exports = accountMixin
