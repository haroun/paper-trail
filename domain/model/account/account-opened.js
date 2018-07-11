const event = require('./../event')

const TYPE = 'account-opened'

const accountOpened = ({version, number, date, owner, balance}) => Object.freeze(
  Object.assign(
    {},
    event({version, type: TYPE, occurredAt: date}),
    {
      attributes: {
        number,
        owner,
        balance
      }
    }
  )
)

module.exports = accountOpened
module.exports.TYPE = TYPE
