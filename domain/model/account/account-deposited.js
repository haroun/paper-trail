const event = require('./../event')

const TYPE = 'account-deposited'

const accountDeposited = ({number, date, amount, description}) => Object.freeze(
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

module.exports = accountDeposited
module.exports.TYPE = TYPE
