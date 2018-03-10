const type = 'open-account'

const openAccount = ({number, owner, initialBalance}) => Object.freeze(
  {
    type,
    number,
    owner,
    initialBalance
  }
)

module.exports = openAccount
module.exports.TYPE = type
