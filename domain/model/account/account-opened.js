const event = require('./../event')

const accountOpened = Object.assign(
  {},
  event,
  {
    name: 'account-opened',
    attributes: {
      accountNumber: null,
      owner: null
    }
  }
)

module.exports.accountOpened = accountOpened
