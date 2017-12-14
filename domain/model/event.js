const uuid = require('./uuid')

const eventMixin = ({
  id = null,
  version = -1,
  type = null,
  accountNumber = null,
  occuredAt = null
} = {}) => {
  if (id === null) {
    id = uuid.generate()
  }

  if (version === -1) {
    throw new TypeError('version cannot be null')
  }

  if (type === null) {
    throw new TypeError('type cannot be null')
  }

  if (accountNumber === null) {
    throw new TypeError('accountNumber cannot be null')
  }

  if (occuredAt === null) {
    throw new TypeError('occuredAt cannot be null')
  }

  const noticedAt = Date.now()

  return {
    id: () => id,
    type: () => type,
    version: () => version,
    accountNumber: () => accountNumber,
    occuredAt: () => occuredAt,
    noticedAt: () => noticedAt
  }
}

module.exports.event = eventMixin
