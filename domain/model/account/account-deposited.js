const event = require('./../event')

const accountDeposited = Object.assign(
  {},
  event,
  {
    name: 'account-deposited',
    attributes: {
      accountNumber: null,
      owner: null,
      amount: null
    }
  }
)

module.exports.accountDeposited = accountDeposited
