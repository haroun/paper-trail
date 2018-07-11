const command = require('../command')

const TYPE = 'open-account'

const openAccount = ({version, number, date, owner, initialBalance}) => Object.freeze(
  Object.assign(
    {},
    command({version, type: TYPE}),
    {
      number,
      date,
      owner,
      initialBalance
    }
  )
)

module.exports = openAccount
module.exports.TYPE = TYPE
