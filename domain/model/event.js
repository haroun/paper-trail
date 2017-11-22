const eventMixin = ({
  version = null,
  occuredAt = null,
  accountNumber = null,
  type = null
}) => {
  if (version === null) {
    throw new TypeError('version cannot be null')
  }

  if (occuredAt === null) {
    throw new TypeError('occuredAt cannot be null')
  }

  if (accountNumber === null) {
    throw new TypeError('accountNumber cannot be null')
  }

  if (type === null) {
    throw new TypeError('type cannot be null')
  }

  const id = null
  const noticedAt = null

  return {
    id: () => id,
    version: () => version,
    occuredAt: () => occuredAt,
    noticedAt: () => noticedAt,
    accountNumber: () => accountNumber,
    type: () => type
  }
}

module.exports.event = eventMixin
