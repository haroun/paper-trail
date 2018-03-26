const TYPE = 'account-withdrawn'

const accountWithdrawn = ({number, amount}) => Object.freeze(
  {
    type: TYPE,
    attributes: {
      number,
      amount
    }
  }
)

module.exports = accountWithdrawn
module.exports.TYPE = TYPE
