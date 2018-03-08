const accountOpened = ({number, owner, balance}) => {
  return Object.freeze(
    {
      type: 'account-opened',
      attributes: {
        number,
        owner,
        balance
      }
    }
  )
}

module.exports = accountOpened
