const TYPE = 'account-deposited'

const accountDeposited = ({number, amount}) => Object.freeze(
  {
    type: TYPE,
    attributes: {
      number,
      amount
    }
  }
)

module.exports = accountDeposited
module.exports.TYPE = TYPE
