const type = 'deposit-account'

const depositAccount = ({number, author, amount}) => Object.freeze(
  {
    type,
    number,
    author,
    amount
  }
)

module.exports = depositAccount
module.exports.TYPE = type
