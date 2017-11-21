const withdrawMixin = target => {
  const id = target.id || null
  const amount = target.amount || 0

  return {
    getId: () => id,
    getAmount: () => amount
  }
}

module.exports.withdraw = withdrawMixin
