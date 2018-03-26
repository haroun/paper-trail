const accountOpened = require('./account-opened')
const accountDeposited = require('./account-deposited')
const accountWithdrawn = require('./account-withdrawn')
const openAccount = require('./open-account')
const depositAccount = require('./deposit-account')
const withdrawAccount = require('./withdraw-account')
const error = require('./error')

const accountMixin = () => {
  let number = null
  let owner = null
  let balance = 0
  let isOpen = false

  const events = []
  let version = -1

  const load = (events, handler) => {
    events.reduce((acc, event) => {
      handler(event)
      version = event.version

      return null
    }, null)
  }

  const open = ({number = '', owner = '', initialBalance = 0}) => {
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
  }

  const deposit = ({author, amount = 0}) => {
    if (!isOpen) {
      throw error.accountNotOpen('account MUST be opened to make a deposit')
    }
    if (owner !== author) {
      throw new TypeError('owner MUST match')
    }
    if (!Number.isInteger(amount) || amount < 1) {
      throw new TypeError('amount MUST be a positive integer')
    }

    return accountDeposited({number, amount: Math.abs(amount)})
  }

  const withdraw = ({author, amount = 0}) => {
    if (!isOpen) {
      throw error.accountNotOpen('account MUST be opened to make a withdrawal')
    }
    if (owner !== author) {
      throw new TypeError('owner MUST match')
    }
    if (!Number.isInteger(amount) || amount < 1) {
      throw new TypeError('amount MUST be a positive integer')
    }

    return accountWithdrawn({number, amount: Math.abs(amount)})
  }

  return Object.freeze({
    number: () => number,
    owner: () => owner,
    balance: () => balance,
    version: () => version,
    events: () => events,
    load,

    handle: ({command}) => {
      const {type = ''} = command

      if (type === openAccount.TYPE) {
        return open(command)
      } else if (type === depositAccount.TYPE) {
        return deposit(command)
      } else if (type === withdrawAccount.TYPE) {
        return withdraw(command)
      }

      throw new TypeError(`Unknown "${type}" command`)
    },

    apply: ({event}) => {
      const {type = ''} = event

      if (type === accountOpened.TYPE) {
        isOpen = true
        number = event.attributes && event.attributes.number
        owner = event.attributes && event.attributes.owner
        balance = event.attributes && event.attributes.initialBalance
      } else if (type === accountDeposited.TYPE) {
        balance += event.attributes && event.attributes.amount
      } else if (type === accountWithdrawn.TYPE) {
        balance -= event.attributes && event.attributes.amount
      } else {
        throw new TypeError(`Unknown "${type}" event`)
      }
    }
  })
}

module.exports = accountMixin
