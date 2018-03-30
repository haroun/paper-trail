const TYPE = 'account-withdrawn'

const accountWithdrawn = ({number, date, amount, description}) => Object.freeze(
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

module.exports = accountWithdrawn
module.exports.TYPE = TYPE
