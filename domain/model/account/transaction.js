const transaction = {
  id: null,
  version: null,
  label: null,
  tag: null,
  amount: 0,
  at: null
}

const mixin = target => {
  const entry = Object.assign({}, transaction, target)

  if (entry.amount === 0 || typeof entry.amount !== 'number') {
    throw new Error('Invalid amount', entry)
  }

  return [entry]
}

module.exports.transaction = mixin
