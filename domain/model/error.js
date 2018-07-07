const errorMixin = (name, message) => {
  const error = new Error(message)
  error.name = name

  return error
}

const accountNotOpen = message => errorMixin('account-not-open', message)
const entryInvalidType = message => errorMixin('entry-invalid-type', message)
const eventInvalidVersion = message => errorMixin('event-invalid-version', message)
const eventInvalidType = message => errorMixin('event-invalid-type', message)
const eventInvalidOccuredAt = message => errorMixin('event-invalid-occured-at', message)

module.exports.accountNotOpen = accountNotOpen
module.exports.entryInvalidType = entryInvalidType
module.exports.eventInvalidVersion = eventInvalidVersion
module.exports.eventInvalidType = eventInvalidType
module.exports.eventInvalidOccuredAt = eventInvalidOccuredAt
