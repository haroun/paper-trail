const accountOpened = require('./account-opened')
const accountDeposited = require('./account-deposited')
const accountWithdrawn = require('./account-withdrawn')

const accountMixin = () => {
  const number = null
  const owner = null
  const balance = 0
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

    open: command => {
      const number = 'FIXME: generate unique id'
      const owner = command.owner || ''
      const initialBalance = Math.abs(command.initialBalance || 0)
      const event = accountOpened(number, owner, initialBalance)

      if (owner === '') {
        throw new TypeError('owner MUST be filled')
      }

      return event
    },

    withdraw: command => {
      const amount = Math.abs(command.amount || 0)
      const event = accountWithdrawn(amount)

      if (amount === 0) {
        throw new TypeError('amount MUST be different than 0')
      }

      return event
    },

    deposit: command => {
      const amount = Math.abs(command.amount || 0)
      const event = accountDeposited(amount)

      if (amount === 0) {
        throw new TypeError('amount MUST be different than 0')
      }

      return event
    },

    handle: event => {
      const {name = ''} = event

      if (name === 'account-opened') {
        this.number = event.number
        this.owner = event.owner
        this.balance = event.initialBalance
      } else if (name === 'account-deposited') {
        this.balance += event.amount
      } else if (name === 'account-withdrawn') {
        this.balance -= event.amount
      }
    }
  }
}

module.exports.account = accountMixin
