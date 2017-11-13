const transaction = require('./transaction')

const account = {
  number: null,
  balance: 0,
  owner: null,
  transactions: [],

  withdraw: event => {
    this.transactions = this.transactions.concat(transaction(event.attributes || {}))
    this.balance += Math.abs(event.amount || 0)
  },

  deposit: event => {
    this.transactions = this.transactions.concat(transaction(event.attributes || {}))
    this.balance -= Math.abs(event.amount || 0)
  },

  handle: event => {
    const {name = ''} = event

    if (name === 'account-deposited') {
      return this.deposit(event)
    } else if (name === 'account-withdrawn') {
      return this.withdraw(event)
    }
  }
}

module.exports.account = account
