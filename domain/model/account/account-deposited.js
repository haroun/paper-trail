const TYPE = 'account-deposited'

const accountDeposited = ({number, date, amount, description}) => Object.freeze(
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

module.exports = accountDeposited
module.exports.TYPE = TYPE
