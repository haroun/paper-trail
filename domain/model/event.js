const error = require('./error')

const eventMixin = ({
  version = -1,
  type = null,
  occurredAt = null
} = {}) => {
  const isProcessed = false

  if (!Number.isInteger(version) || version === -1) {
    throw error.eventInvalidVersion('version MUST be a number')
  }
  if (type === null) {
    throw error.eventInvalidType('type cannot be null')
  }
  if (occurredAt === null) {
    throw error.eventInvalidOccurredAt('occurredAt cannot be null')
  }

  const noticedAt = Date.now()

  return Object.freeze({
    version,
    type,
    occurredAt,
    noticedAt,
    isProcessed: () => isProcessed
  })
}

module.exports = eventMixin
