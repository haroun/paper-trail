const accountNotOpen = message => {
  const error = new Error(message)
  error.name = 'account-not-open'

  return error
}

module.exports.accountNotOpen = accountNotOpen
