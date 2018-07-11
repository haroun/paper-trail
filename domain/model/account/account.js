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

  const addEntry = ({type, amount, description, date}) => entries.push(
    entry({type, amount, description, date})
  )

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

          if (type === openAccount.TYPE) {
            return open(command)
          }
          if (type === depositAccount.TYPE) {
            return deposit(command)
          }
          if (type === withdrawAccount.TYPE) {
            return withdraw(command)
          }

          throw new TypeError(`Unknown "${type}" command`)
        },

        apply: ({event}) => {
          const {type = ''} = event
          let entryType

          if (type === accountOpened.TYPE) {
            isOpen = true
            number = event.attributes && event.attributes.number
            owner = event.attributes && event.attributes.owner
            balance = event.attributes && event.attributes.balance
            entryType = entry.TYPE_DEPOSIT
          } else if (type === accountDeposited.TYPE) {
            balance += event.attributes && event.attributes.amount
            entryType = entry.TYPE_DEPOSIT
          } else if (type === accountWithdrawn.TYPE) {
            balance -= event.attributes && event.attributes.amount
            entryType = entry.TYPE_WITHDRAWAL
          } else {
            throw new TypeError(`Unknown "${type}" event`)
          }

          addEntry({
            type: entryType,
            amount: event.attributes.amount,
            description: event.attributes.description,
            date: event.attributes.date
          })
        }
      }
    )
  )
}

module.exports = accountMixin
