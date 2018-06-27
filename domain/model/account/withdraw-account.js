const type = 'withdraw-account'

const withdrawAccount = ({number, author, amount, date}) => Object.freeze(
  {
    type,
    number,
    author,
    amount,
    date
  }
)

module.exports = withdrawAccount
module.exports.TYPE = type
