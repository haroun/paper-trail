const withdrawMixin = ({id = null, amount = 0}) => {
  if (id === null) {
    throw new TypeError('id cannot be null')
  }

  if (amount >= 0) {
    throw new TypeError('amount must be negative')
  }

  return {
    getId: () => id,
    getAmount: () => amount
  }
}

module.exports.withdraw = withdrawMixin
