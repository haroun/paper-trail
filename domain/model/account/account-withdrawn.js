const event = require('./../event')

const accountWithdrawn = Object.assign(
  {},
  event,
  {
    name: 'account-withdrawn',
    attributes: {
      accountNumber: null,
      owner: null,
      amount: null
    }
  }
)

module.exports.accountWithdrawn = accountWithdrawn
