const event = require('./../event')

const TYPE = 'account-withdrawn'

const accountWithdrawn = ({version, number, date, amount, description}) => Object.freeze(
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

module.exports = accountWithdrawn
module.exports.TYPE = TYPE
