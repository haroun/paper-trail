const command = require('../command')

const TYPE = 'deposit-account'

const depositAccount = ({version, number, date, amount, description, author}) => Object.freeze(
  Object.assign(
    {},
    command({version, type: TYPE}),
    {
      number,
      date,
      amount,
      description,
      author
    }
  )
)

module.exports = depositAccount
module.exports.TYPE = TYPE
