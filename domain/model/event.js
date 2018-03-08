const uuid = require('./uuid')

const eventMixin = ({
  id = null,
  version = -1,
  type = null,
  occuredAt = null
} = {}) => {
  if (version === -1) {
    throw new TypeError('version cannot be null')
  }
  if (type === null) {
    throw new TypeError('type cannot be null')
  }
  if (occuredAt === null) {
    throw new TypeError('occuredAt cannot be null')
  }

  id = id || uuid.generate()
  const noticedAt = Date.now()

  return Object.freeze({
    id: () => id,
    type: () => type,
    version: () => version,
    occuredAt: () => occuredAt,
    noticedAt: () => noticedAt
  })
}

module.exports = eventMixin
