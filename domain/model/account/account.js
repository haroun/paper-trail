const account = {
  id: null,
  balance: 0,

  withdraw: event => {
    this.balance += Math.abs(event.amount || 0)
  },

  deposit: event => {
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
