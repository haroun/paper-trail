const event = require('./../event')

const accountWithdrawn = Object.assign(
  {},
  event,
  {
    name: 'account-withdrawn',
    attributes: {
      author: null,
      amount: null
    }
  }
)

module.exports.accountWithdrawn = accountWithdrawn
