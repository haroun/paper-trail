const type = 'withdraw-account'

const withdrawAccount = ({number, author, amount}) => Object.freeze(
  {
    type,
    number,
    author,
    amount
  }
)

module.exports = withdrawAccount
module.exports.TYPE = type
