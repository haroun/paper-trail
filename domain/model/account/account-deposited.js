const event = require('./../event')

const TYPE = 'account-deposited'

const accountDeposited = ({version, number, date, amount, description}) => Object.freeze(
  Object.assign(
    {},
    event({version, type: TYPE, occurredAt: date}),
    {
      attributes: {
        number,
        amount,
        description
      }
    }
  )
)

module.exports = accountDeposited
module.exports.TYPE = TYPE
