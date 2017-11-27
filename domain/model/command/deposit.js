const depositMixin = ({id = null, amount = 0}) => {
  if (id === null) {
    throw new TypeError('id cannot be null')
  }

  if (amount <= 0) {
    throw new TypeError('amount must be positive')
  }

  return {
    getId: () => id,
    getAmount: () => amount
  }
}

module.exports.deposit = depositMixin
