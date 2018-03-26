const TYPE = 'account-opened'

const accountOpened = ({number, owner, balance}) => Object.freeze(
  {
    type: TYPE,
    attributes: {
      number,
      owner,
      balance
    }
  }
)

module.exports = accountOpened
module.exports.TYPE = TYPE
