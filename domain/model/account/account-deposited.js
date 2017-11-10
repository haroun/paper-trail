const event = require('./../event')

const accountDeposited = Object.assign(
  {},
  event,
  {
    name: 'account-deposited',
    attributes: {
      author: null,
      amount: null
    }
  }
)

module.exports.accountDeposited = accountDeposited
