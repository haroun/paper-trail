const command = require('../command')

const TYPE = 'withdraw-account'

const withdrawAccount = ({version, number, date, amount, description, author}) => Object.freeze(
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

module.exports = withdrawAccount
module.exports.TYPE = TYPE
