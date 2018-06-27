const event = require('./../event')

const TYPE = 'account-opened'

const accountOpened = ({number, owner, balance}) => Object.freeze(
  Object.assign(
    {},
    event,
    {
      type: TYPE,
      attributes: {
        number,
        owner,
        balance
      }
    }
  )
)

module.exports = accountOpened
module.exports.TYPE = TYPE
