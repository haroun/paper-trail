const aggregate = require('./../aggregate')
const accountOpened = require('./account-opened')
const accountDeposited = require('./account-deposited')
const accountWithdrawn = require('./account-withdrawn')
const openAccount = require('./open-account')
const depositAccount = require('./deposit-account')
const withdrawAccount = require('./withdraw-account')
const error = require('./../error')
const entry = require('./entry')

const accountMixin = () => {
  const entries = []
  let number = null
  let owner = null
  let balance = 0
  let isOpen = false

  const open = ({version = -1, number = '', date, owner = '', initialBalance = null}) => {
    if (version === '') {
      throw new TypeError('version MUST be filled')
    }
    if (number === '') {
      throw new TypeError('number MUST be filled')
    }
    if (!date) {
      throw new TypeError('date MUST be filled')
    }
    if (owner === '') {
      throw new TypeError('owner MUST be filled')
    }
    if (!Number.isInteger(initialBalance)) {
      throw new TypeError('initialBalance MUST be a number')
    }

    return accountOpened({version, number, date, owner, balance: initialBalance})
  }

  const deposit = ({version = -1, date, amount = 0, description = null, author}) => {
    if (version === '') {
      throw new TypeError('version MUST be filled')
    }
    if (!isOpen) {
      throw error.accountNotOpen('account MUST be opened to make a deposit')
    }
    if (!date) {
      throw new TypeError('date MUST be filled')
    }
    if (owner !== author) {
      throw new TypeError('owner MUST match')
    }
    if (!Number.isInteger(amount) || amount < 1) {
      throw new TypeError('amount MUST be a positive integer')
    }

    return accountDeposited({version, number, date, amount: Math.abs(amount), description})
  }

  const withdraw = ({version = -1, date, amount = 0, description = null, author}) => {
    if (version === '') {
      throw new TypeError('version MUST be filled')
    }
    if (!isOpen) {
      throw error.accountNotOpen('account MUST be opened to make a withdrawal')
    }
    if (!date) {
      throw new TypeError('date MUST be filled')
    }
    if (owner !== author) {
      throw new TypeError('owner MUST match')
    }
    if (!Number.isInteger(amount) || amount < 1) {
      throw new TypeError('amount MUST be a positive integer')
    }

    return accountWithdrawn({version, number, date, amount: Math.abs(amount), description})
  }

  const addEntry = ({type, amount, description, date}) => {
    const newEntry = entry({type, amount, description, date})

    entries.push(newEntry)

    return newEntry
  }

  const applyAccountOpened = event => {
    isOpen = true
    number = event.attributes && event.attributes.number
    owner = event.attributes && event.attributes.owner
    balance = event.attributes && event.attributes.balance

    return addEntry({
      type: entry.TYPE_DEPOSIT,
      amount: event.attributes.balance,
      description: accountOpened.TYPE,
      date: event.occurredAt
    })
  }
  const applyAccountDeposited = event => {
    balance += event.attributes && event.attributes.amount

    return addEntry({
      type: entry.TYPE_DEPOSIT,
      amount: event.attributes.amount,
      description: event.attributes.description,
      date: event.occurredAt
    })
  }
  const applyAccountWithdrawn = event => {
    balance -= event.attributes && event.attributes.amount

    return addEntry({
      type: entry.TYPE_WITHDRAWAL,
      amount: event.attributes.amount,
      description: event.attributes.description,
      date: event.occurredAt
    })
  }

  return Object.freeze(
    Object.assign(
      {},
      aggregate,
      {
        number: () => number,
        owner: () => owner,
        balance: () => balance,
        entries: () => entries,

        handle: ({command}) => {
          const {type = ''} = command

          return (type === openAccount.TYPE && open(command))
            || (type === depositAccount.TYPE && deposit(command))
            || (type === withdrawAccount.TYPE && withdraw(command))
            || (() => {
              throw new TypeError(`Unknown "${type}" command`)
            })()
        },

        apply: ({event}) => {
          const {type = ''} = event

          return (type === accountOpened.TYPE && applyAccountOpened(event))
            || (type === accountDeposited.TYPE && applyAccountDeposited(event))
            || (type === accountWithdrawn.TYPE && applyAccountWithdrawn(event))
            || (() => {
              throw new TypeError(`Unknown "${type}" event`)
            })
        },

        toJSON: () => ({
          number,
          owner,
          balance,
          entries,
          isOpen
        })
      }
    )
  )
}

module.exports = accountMixin
