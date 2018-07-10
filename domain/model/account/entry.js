const error = require('./../error')

const TYPE_WITHDRAWAL = 'withdrawal'
const TYPE_DEPOSIT = 'deposit'

const entryMixin = ({type, tag, amount, description, date}) => {
  if (type !== TYPE_WITHDRAWAL && type !== TYPE_DEPOSIT) {
    throw error.entryInvalidType('invalid entry type')
  }

  return Object.freeze({
    type,
    tag,
    amount,
    description,
    date
  })
}

module.exports = entryMixin
module.exports.TYPE_WITHDRAWAL = TYPE_WITHDRAWAL
module.exports.TYPE_DEPOSIT = TYPE_DEPOSIT
