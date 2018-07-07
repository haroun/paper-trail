const error = require('./error')

const eventMixin = ({
  version = -1,
  type = null,
  occuredAt = null
} = {}) => {
  const isProcessed = false

  if (!Number.isInteger(version) || version === -1) {
    throw error.eventInvalidVersion('version MUST be a number')
  }
  if (type === null) {
    throw error.eventInvalidType('type cannot be null')
  }
  if (occuredAt === null) {
    throw error.eventInvalidOccuredAt('occuredAt cannot be null')
  }

  const noticedAt = Date.now()

  return Object.freeze({
    version,
    type,
    occuredAt,
    noticedAt,
    isProcessed: () => isProcessed
  })
}

module.exports = eventMixin
