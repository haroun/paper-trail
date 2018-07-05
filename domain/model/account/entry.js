const entryMixin = ({tag, amount, description, date}) => Object.freeze({
  tag: () => tag,
  amount: () => amount,
  description: () => description,
  date: () => date
})

module.exports = entryMixin
