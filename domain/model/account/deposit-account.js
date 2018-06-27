const type = 'deposit-account'

const depositAccount = ({number, author, amount, date}) => Object.freeze(
  {
    type,
    number,
    author,
    amount,
    date
  }
)

module.exports = depositAccount
module.exports.TYPE = type
