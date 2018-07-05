const aggregate = require('./../aggregate')
const accountOpened = require('./account-opened')
const accountDeposited = require('./account-deposited')
const accountWithdrawn = require('./account-withdrawn')
const openAccount = require('./open-account')
const depositAccount = require('./deposit-account')
const withdrawAccount = require('./withdraw-account')
const error = require('./error')
const entry = require('./entry')

const accountMixin = () => {
  const entries = []
  let number = null
  let owner = null
  let balance = 0
  let isOpen = false

  const open = ({number = '', owner = '', initialBalance = null}) => {
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

  const deposit = ({author, amount = 0, date, description = null}) => {
    if (!isOpen) {
      throw error.accountNotOpen('account MUST be opened to make a deposit')
    }
    if (owner !== author) {
      throw new TypeError('owner MUST match')
    }
    if (!Number.isInteger(amount) || amount < 1) {
      throw new TypeError('amount MUST be a positive integer')
    }
    if (!date) {
      throw new TypeError('date MUST be filled')
    }

    return accountDeposited({number, date, amount: Math.abs(amount), description})
  }

  const withdraw = ({author, amount = 0, date, description = null}) => {
    if (!isOpen) {
      throw error.accountNotOpen('account MUST be opened to make a withdrawal')
    }
    if (owner !== author) {
      throw new TypeError('owner MUST match')
    }
    if (!Number.isInteger(amount) || amount < 1) {
      throw new TypeError('amount MUST be a positive integer')
    }
    if (!date) {
      throw new TypeError('date MUST be filled')
    }

    return accountWithdrawn({number, date, amount: Math.abs(amount), description})
  }

  const addEntry = ({amount, description, date}) => entries.push(entry({amount, description, date}))

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

          if (type === accountOpened.TYPE) {
            isOpen = true
            number = event.attributes && event.attributes.number
            owner = event.attributes && event.attributes.owner
            balance = event.attributes && event.attributes.balance
          } else if (type === accountDeposited.TYPE) {
            balance += event.attributes && event.attributes.amount
          } else if (type === accountWithdrawn.TYPE) {
            balance -= event.attributes && event.attributes.amount
          } else {
            throw new TypeError(`Unknown "${type}" event`)
          }

          addEntry({
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
