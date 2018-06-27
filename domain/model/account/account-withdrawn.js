const event = require('./../event')

const TYPE = 'account-withdrawn'

const accountWithdrawn = ({number, date, amount, description}) => Object.freeze(
  Object.assign(
    {},
    event,
    {
      type: TYPE,
      attributes: {
        number,
        date,
        amount,
        description
      }
    }
  )
)

module.exports = accountWithdrawn
module.exports.TYPE = TYPE
